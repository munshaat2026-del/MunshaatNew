"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { GripVertical, User } from "lucide-react"; // Better visual cues

import { MemberOrder } from "@/types";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export type Member = {
  id: string;
  name_en: string | null;
  image?: string | null;
  display_order: number | null;
};

type Props = {
  action: (data: MemberOrder[]) => Promise<{ success: boolean; status: number; message: string }>;
  initialMembers?: Member[];
  saving?: boolean;
};

function SortableItem({ member }: { member: Member }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <motion.li
      ref={setNodeRef}
      style={style}
      layout
      className={cn(
        "relative flex items-center gap-4 p-3 bg-white border rounded-xl transition-shadow",
        isDragging ? "shadow-xl z-50 ring-2 ring-primary/20 cursor-grabbing" : "shadow-sm hover:shadow-md cursor-grab"
      )}
      {...attributes}
      {...listeners}
    >
      {/* Grab Handle Icon */}
      <div className="text-muted-foreground/50">
        <GripVertical size={20} />
      </div>

      {/* Avatar Wrapper */}
      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted border shrink-0">
        {member.image ? (
          <img
            src={member.image}
            alt={member.name_en ?? ""}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-muted-foreground">
            <User size={20} />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold truncate text-foreground">
          {member.name_en || "Unnamed Member"}
        </p>
        <p className="text-xs text-muted-foreground font-mono">
          Order: {member.display_order ?? "—"}
        </p>
      </div>

      {/* Visual Badge */}
      <div className="hidden sm:block px-2 py-1 bg-secondary text-secondary-foreground text-[10px] font-bold uppercase rounded tracking-wider">
        Move
      </div>
    </motion.li>
  );
}

export default function MemberReorder({
  initialMembers = [],
  action,
  saving: externalSaving,
}: Props) {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);
  const [members, setMembers] = useState<Member[]>(() =>
    [...initialMembers].sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
  );
  const originalRef = useRef<Member[]>(members);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } })
  );

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over || active.id === over.id) return;

    setMembers((items) => {
      const oldIndex = items.findIndex((m) => m.id === active.id);
      const newIndex = items.findIndex((m) => m.id === over.id);
      const newList = arrayMove(items, oldIndex, newIndex);
      return newList.map((m, i) => ({ ...m, display_order: i + 1 }));
    });
  };

  const handleSaveOrder = async () => {
    const payload = members.map((m) => ({ id: m.id, display_order: m.display_order ?? 0 }));
    setIsSaving(true);
    try {
      const res = await action(payload);
      if (res.success) {
        toast.success(res.message || "Order updated successfully");
        router.refresh(); 
        router.push("/admin/dashboard/ourTeam");
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save order");
      setMembers(originalRef.current);
    } finally {
      setIsSaving(false);
    }
  };

  const saving = externalSaving || isSaving;

  return (
    <div className="max-w-4xl mx-auto p-4 lg:p-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div className="space-y-1">
          <h3 className="text-3xl font-bold tracking-tight">Team Structure</h3>
          <p className="text-muted-foreground">
            Arrange the order of team members as they appear on the public site.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => router.back()} disabled={saving} className="text-gray-800">
            Cancel
          </Button>
          <Button onClick={handleSaveOrder} disabled={saving} className="min-w-25">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </header>

      <div className="bg-muted/30 rounded-2xl border p-4 sm:p-6">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={members.map((m) => m.id)} strategy={rectSortingStrategy}>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <AnimatePresence>
                {members.map((member) => (
                  <SortableItem key={member.id} member={member} />
                ))}
              </AnimatePresence>
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      <footer className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        Changes will not be public until you click Save Changes.
      </footer>
    </div>
  );
}