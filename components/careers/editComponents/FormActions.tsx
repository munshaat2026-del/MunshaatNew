"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
function FormActions() {
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();
  const router = useRouter();
  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-12">
        <Button
          type="submit"
          disabled={!isDirty || isSubmitting}
          className="bg-gray-800 sm:w-auto"
          aria-disabled={!isDirty || isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Course"}
        </Button>
        <Button
          disabled={isSubmitting}
          type="button"
          onClick={() => router.push("/admin/dashboard/careers")}
          className="bg-gray-800 sm:w-auto"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default FormActions;
