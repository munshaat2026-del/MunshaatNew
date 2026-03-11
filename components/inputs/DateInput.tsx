"use client";
import { Control, Controller, FieldError } from "react-hook-form";
import { Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { format } from "date-fns"; 
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormDateInputProps {
  name: string;
  label: string;
  control: Control<any>;
  error?: FieldError;
  description?: string;
  placeholder?: string;
  className?: string;
  isArabic?: boolean;
}

export default function FormDateInput({
  name,
  label,
  control,
  error,
  description,
  placeholder = "Select a date",
  className = "",
  isArabic = false,
}: FormDateInputProps) {
  const id = name;
  const errorId = `${id}-error`;

  return (
    <div className={cn("mb-4 flex flex-col gap-1.5", className)}>
      {/* Label & Description Section */}
      <div className="flex flex-col mb-1">
        <label
          htmlFor={id}
          className="text-[11px] font-bold text-slate-500 uppercase tracking-widest"
        >
          {label}
        </label>
        {description && (
          <p id={`${id}-desc`} className="text-[10px] text-slate-400 font-medium italic">
            {description}
          </p>
        )}
      </div>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full h-11 justify-start text-left font-sans border-slate-200 rounded-xl hover:bg-slate-50 transition-all",
                  !field.value && "text-slate-400",
                  error && "border-red-500 ring-1 ring-red-500/10",
                  isArabic && "text-right flex-row-reverse"
                )}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
              >
                <CalendarIcon className={cn("mr-2 h-4 w-4 text-slate-400", isArabic && "ml-2 mr-0")} />
                {field.value ? (
                  <span className="text-sm font-semibold text-slate-700">
                    {format(field.value, "PPP")}
                  </span>
                ) : (
                  <span className="text-sm">{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 rounded-2xl border-slate-200 shadow-2xl" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                
                className="rounded-2xl"
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Error Message Logic */}
      {error && (
        <div 
          id={errorId} 
          className="flex items-center gap-1.5 mt-1 animate-in fade-in slide-in-from-top-1"
        >
          <AlertCircle size={12} className="text-red-600" />
          <p className="text-[11px]  text-red-600 ">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
}