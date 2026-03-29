"use client";

import { useFormContext } from "react-hook-form";
import z from "zod";

import { RealEstateSchema } from "@/app/server/real_estates/validators";
import { pricePeriodOptions, realEstateOptions } from "@/lib/constants/dashboardData";

import FormSelect from "@/components/inputs/SelectorInput";
import FormCheckbox from "@/components/inputs/CheckBoxInput";
import MultiInputForm from "@/components/inputs/MultiInput";
import { Globe } from "lucide-react";

type RealEstatesFormValues = z.infer<typeof RealEstateSchema>;

function SpecsAndStatus() {
  const {
    formState: { errors },
    watch,
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
                    placeholder="مثال: كراج، واي فاي عالي السرعة"
        
                   
                  />
                </div>

        {/* Row 3: Availability Toggle */}
      <div className="col-span-1 md:col-span-2 flex flex-col items-start sm:flex-row sm:items-center w-full justify-between gap-4 p-5 border-y md:border border-slate-200 bg-slate-50/30">
  <div className="flex items-center gap-4">
    <div className={`p-2 rounded-lg ${watch('is_available') ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
      <Globe className="w-5 h-5" /> {/* Or any icon library you use */}
    </div>
    <div>
      <h3 className="text-sm font-bold text-slate-900">Visible on Website</h3>
      <p className="text-xs text-slate-500">Visibility depends on the "Available" status.</p>
    </div>
  </div>

  <div className="flex flex-col items-center gap-2 ">
   
    <FormCheckbox
      name="is_available"
      control={control}
      label="Available"
      className="font-bold text-slate-900"
    />
     <p className="text-[11px] font-medium text-slate-400 italic">
      {watch('is_available') ? "Visible to public" : "Hidden from site"}
    </p>
  </div>
  
</div>
      </div>
  );
}

export default SpecsAndStatus;