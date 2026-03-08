"use client"
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
function FormActions() {
    const {formState:{isDirty,isSubmitting}} = useFormContext()
    const router= useRouter()
  return (
    <div>
         <div className="flex flex-row justify-center gap-4 mt-10 mb-5">
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="bg-gray-800"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
              <Button
                disabled={isSubmitting}
                className="bg-gray-800"
                type="button"
                onClick={() => {
                  router.push("/admin/dashboard/ourTeam");
                }}
              >
                Cancel
              </Button>
            </div>
    </div>
  )
}

export default FormActions