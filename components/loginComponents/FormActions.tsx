"use client"
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
function FormActions() {
    const {formState:{isDirty,isSubmitting}} = useFormContext()
    const router= useRouter()
  return (
    <div>
         <button
              disabled={isSubmitting}
              type="submit"
              className="relative overflow-hidden group w-full py-5 bg-[#0c479a] text-white font-black uppercase tracking-[0.5em] text-[12px] flex items-center justify-center gap-3 transition-all duration-500 hover:tracking-[0.7em] active:scale-[0.98] disabled:opacity-50"
            >
              <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              
              <div className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <span className="animate-pulse italic">Logging in...</span>
                ) : (
                  <>
                    <span>Login</span>
                    <LogIn size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </div>
            </button>
    </div>
  )
}

export default FormActions