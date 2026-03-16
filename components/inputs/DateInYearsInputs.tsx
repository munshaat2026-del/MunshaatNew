"use client";

import { Control, Controller, FieldError } from "react-hook-form";
import { Calendar as CalendarIcon, AlertCircle, ChevronLeft, ChevronRight } from "lucide-react";
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

export default function DateInYearsInputs({
  name,
  label,
  control,
  error,
  description,
  placeholder = "Select your birth date",
  className = "",
  isArabic = false,
}: FormDateInputProps) {
  const id = name;
  const errorId = `${id}-error`;

  // Define logical year range for Date of Birth
  const currentYear = new Date().getFullYear();
  const fromYear = currentYear - 100; // 100 years ago
  const toYear = currentYear;

  return (
    <div className={cn("mb-4 flex flex-col gap-1.5", className)}>
      {/* Label & Description Section */}
      <div className="flex flex-col mb-1">
        <label
          htmlFor={id}
          className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]"
        >
          {label}
        </label>
        {description && (
          <p id={`${id}-desc`} className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
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
                  "w-full h-12 justify-start text-left font-sans border-slate-200 rounded-2xl hover:bg-slate-50 transition-all shadow-sm",
                  !field.value && "text-slate-400",
                  error && "border-red-500 ring-1 ring-red-500/10",
                  isArabic && "text-right flex-row-reverse"
                )}
                aria-invalid={!!error}
                aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
              >
                <CalendarIcon className={cn("mr-2 h-4 w-4 text-[#0c479a]", isArabic && "ml-2 mr-0")} />
                {field.value ? (
                  <span className="text-sm font-bold text-slate-700">
                    {format(field.value, "PPP")}
                  </span>
                ) : (
                  <span className="text-sm font-medium">{placeholder}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent 
              className="w-auto p-2 rounded-3xl border-slate-200 shadow-2xl overflow-hidden" 
              align={isArabic ? "end" : "start"}
            >
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
                // Crucial props for Date of Birth:
                captionLayout="dropdown" 
                fromYear={fromYear}
                toYear={toYear}
                className="p-4"
                classNames={{
                  caption_label: "hidden", // Hide static label when dropdowns are active
                  dropdown_month: "flex items-center font-bold text-sm bg-slate-50 rounded-lg px-2 py-1 mr-1",
                  dropdown_year: "flex items-center font-bold text-sm bg-slate-50 rounded-lg px-2 py-1",
                  dropdown: "p-1 focus:bg-white transition-colors cursor-pointer outline-none",
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />

      {/* Error Message Logic */}
      {error && (
        <div 
          id={errorId} 
          className="flex items-center gap-1.5 mt-1.5 animate-in fade-in slide-in-from-top-1"
        >
          <div className="p-0.5 bg-red-50 rounded-md">
            <AlertCircle size={12} className="text-red-600" />
          </div>
          <p className="text-[11px]  text-red-600  tracking-tight">
            {error.message}
          </p>
        </div>
      )}
    </div>
  );
}