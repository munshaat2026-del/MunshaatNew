import { useFormContext } from "react-hook-form";
import { TenderSchema } from "@/app/server/tenders/validators";
import FileUploader from "@/components/FileUploader";

import z from "zod";

type TenderFormValues = z.infer<typeof TenderSchema>;
function MediaSection() {
  const {
    formState: { errors },
    control,
    watch,
  } = useFormContext<TenderFormValues>();

  return (
    <div className="grid grid-cols-1 gap-6 w-full lg:w-[95%]">
      <div className="w-full">
        <FileUploader
              label="Atached File"
              name="pdf_file"
              control={control}
              required
              error={errors.pdf_file}
             
              
            />
       
      </div>
    </div>
  );
}

export default MediaSection;
