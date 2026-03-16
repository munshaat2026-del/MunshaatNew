"use client"
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Button1 } from '@/components/ui/Button1';
import { Button2 } from '@/components/ui/Button2';
function FormActions() {
    const {formState:{isDirty,isSubmitting}} = useFormContext()
    const router= useRouter()
  return (
    <div>
         <div className="flex flex-row justify-center gap-4 mt-10 mb-5">
              <Button1
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button1>
              <Button2
                disabled={isSubmitting}
                type="button"
                onClick={() => {
                  router.push("/admin/dashboard/ourClients");
                }}
              >
                Cancel
              </Button2>
            </div>
    </div>
  )
}

export default FormActions