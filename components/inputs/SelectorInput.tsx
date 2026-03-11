"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle } from "lucide-react";
import { Control, Controller, FieldError } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface FormSelectProps {
  name: string;
  label?: string;
  control: Control<any>;
  options: Option[];
  error?: FieldError;
  placeholder?: string;
  className?: string;
  description?: string;
  triggerClassName?: string;
  dir?: "rtl" | "ltr";
}

export default function FormSelect({
  name,
  label,
  control,
  options,
  error,
  placeholder = "Select option",
  className = "",
  description,
  triggerClassName = "w-full",
  dir = "ltr",
}: FormSelectProps) {
  const id = name;
  const errorId = `${id}-error`;

  const isRTL = dir === "rtl";

  return (
    <div dir={dir} className={`mb-4 ${className}`}>
      
      {label && (
        <label
          htmlFor={id}
          className={`block text-sm font-semibold text-gray-700 mb-1 ${
            isRTL ? "mr-2 text-right" : "ml-2 text-left"
          }`}
        >
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} value={field.value}>
            
            <SelectTrigger
              id={id}
              dir={dir}
              aria-invalid={!!error}
              aria-describedby={
                error ? errorId : description ? `${id}-desc` : undefined
              }
              className={`
                bg-white shadow-sm transition
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${triggerClassName}
                ${isRTL ? "text-right" : "text-left"}
                ${
                  error
                    ? "border-red-600 focus:ring-red-500"
                    : "border-gray-200"
                }
              `}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            {/* FIXED: Using valid Tailwind syntax for CSS variables */}
            <SelectContent
              className="w-(--radix-select-trigger-width) min-w-(--radix-select-trigger-width) max-h-60 overflow-y-auto"
            >
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className={`${isRTL ? "text-right" : "text-left"} w-full`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>

          </Select>
        )}
      />

      {description && (
        <p
          id={`${id}-desc`}
          className={`mt-1 text-xs text-gray-500 ${
            isRTL ? "mr-2 text-right" : "ml-2 text-left"
          }`}
        >
          {description}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className={`mt-1 text-xs text-red-600 ${
            isRTL ? "mr-2 text-right" : "ml-2 text-left"
          }`}
        >
          <AlertCircle size={12} className="text-red-600" />
          {error.message}
        </p>
      )}
    </div>
  );
}