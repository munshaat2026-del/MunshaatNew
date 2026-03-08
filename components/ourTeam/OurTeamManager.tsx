"use client";
import MemberReorder, { Member } from "./MemberReorder";
import { MemberOrder } from "@/types";
import { reorderMemberyAction } from "@/app/[locale]/admin/dashboard/ourTeam/(actions)/reorderMember";

export default function OurTeamManager({ initialMembers }: { initialMembers: Member[] }) {
  const handleReorder = (order: MemberOrder[]) => {
  return reorderMemberyAction(order);
};

  return <MemberReorder initialMembers={initialMembers} action={handleReorder} />;
}
