"use client";

import { useFormContext } from "react-hook-form";
import z from "zod";

import { RealEstateSchema } from "@/app/server/real_estates/validators";
import { pricePeriodOptions, realEstateOptions } from "@/lib/constants/dashboardData";

import FormSelect from "@/components/inputs/SelectorInput";
import FormCheckbox from "@/components/inputs/CheckBoxInput";
import MultiInputForm from "@/components/inputs/MultiInput";

type RealEstatesFormValues = z.infer<typeof RealEstateSchema>;

function SpecsAndStatus() {
  const {
    formState: { errors },
    control,
  } = useFormContext<RealEstatesFormValues>();

  return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-[95%]">
        {/* Row 1: Selectors */}
        
        <FormSelect
          control={control}
          name="price_period"
          label="Price Period"
          options={pricePeriodOptions}
          error={errors.price_period}
          triggerClassName="w-full"
        />
        <FormSelect
          control={control}
          name="real_estates_type"
          label="Real Estate Type"
          options={realEstateOptions}
          error={errors.real_estates_type}
          triggerClassName="w-full "
        />

        {/* Row 2: Multi-Input (Spans full width for better UX) */}
        <div className="md:col-span-1 ">
                  <MultiInputForm
                    label="Features (EN)"
                    name="features_en"
                    error={errors.features_en}
                    control={control}
                    placeholder="e.g. Garage, High-speed Wi-Fi"
        
                   
                  />
                </div>
                <div className="md:col-span-1 ">
                  <MultiInputForm
                    label="Features (AR)"
                    name="features_ar"
                    error={errors.features_ar}
                    control={control}
                    placeholder="e.g. Garage, High-speed Wi-Fi"
        
                   
                  />
                </div>

        {/* Row 3: Availability Toggle */}
        <div className="md:col-span-2 flex items-center justify-between rounded-lg border p-4 bg-muted/30">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Listing Availability</label>
            <p className="text-xs text-muted-foreground">
              Toggle whether this property is currently visible to the public.
            </p>
          </div>
          <FormCheckbox
            name="is_available"
            control={control}
            label="Is Available"
            error={errors.is_available}
            className="mb-0 ml-0" 
          />
        </div>
      </div>
  );
}

export default SpecsAndStatus;