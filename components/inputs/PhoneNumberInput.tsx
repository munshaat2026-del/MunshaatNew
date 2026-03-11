"use client";

import { AlertCircle } from "lucide-react";
import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PhoneInputProps {
  label?: string;
  register: UseFormRegisterReturn;
  error?: FieldError | undefined;
  placeholder?: string;
  className?: string;
  description?: string;
  intialValue?: string; 
  initialValue?: string;
  dir?: string;
  countryCode?: string; 
  showCountryCode?: boolean;
  maxLength?: number;
}

export default function PhoneInput({
  label,
  register,
  error,
  placeholder,
  className = "",
  description,
  intialValue,
  initialValue,
  dir,
  countryCode = "+966",
  showCountryCode = true,
  maxLength = 20,
}: PhoneInputProps) {
  const id =
    register?.name ?? `input-${label ?? "".replace(/\s+/g, "-").toLowerCase()}`;
  const errorId = `${id}-error`;
  const defaultVal = initialValue ?? intialValue ?? undefined;

  return (
    <div className={`mb-4 ${className} text-gray-600`}>
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
          {label}
        </label>
      )}

      <div
        dir={dir}
        className={`w-full flex items-center rounded-md bg-white shadow-sm transition
          ${error ? "ring-1 ring-red-600" : "ring-0"} border ${error ? "border-red-600" : "border-gray-200"}`}
      >
       

        <input
          id={id}
          {...register}
          type="tel"
          inputMode="tel"
          defaultValue={defaultVal}
          placeholder={placeholder}
          maxLength={maxLength}
          aria-invalid={!!error}
          dir={dir}
          aria-describedby={error ? errorId : description ? `${id}-desc` : undefined}
          className={`w-full pl-3 pr-3 py-2 border rounded-md bg-white shadow-sm transition
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:scale-101
          ${error ? "border-red-600 focus:ring-red-500" : "border-gray-200"}`}
        />
      </div>

      {description && (
        <p id={`${id}-desc`} className="mt-1 text-xs text-gray-500 ml-3">
          {description}
        </p>
      )}

      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2">
          <AlertCircle size={12} className="text-red-600" />
          <span>{error.message}</span>
        </p>
      )}
    </div>
  );
}