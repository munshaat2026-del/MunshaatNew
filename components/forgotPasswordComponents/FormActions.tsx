import { useFormContext } from "react-hook-form";
import { Loader2, Send } from "lucide-react";
function FormActions() {
  const {
    formState: { isSubmitting },
  } = useFormContext();
  return (
    <div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="relative overflow-hidden group w-full py-5 bg-[#0c479a] text-white font-black uppercase  text-[12px] flex items-center justify-center gap-3 transition-all duration-500 hover: active:scale-[0.98] disabled:opacity-50"
      >
        <div className="absolute inset-0 bg-slate-900 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

        <div className="relative z-10 flex items-center gap-3">
          {isSubmitting ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <span>Send Recovery Link</span>
              <Send
                size={16}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </>
          )}
        </div>
      </button>
    </div>
  );
}

export default FormActions;
