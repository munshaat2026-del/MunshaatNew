export default function LogosSection() {
  return (
    <section className="py-16 border-b border-slate-50 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 font-bold uppercase text-[10px] tracking-[0.5em] mb-12">
          Trusted by Industry Leaders
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
          <div className="text-2xl font-black">MALL ARCADE</div>
          <div className="text-2xl font-black">URBAN TOWER</div>
          <div className="text-2xl font-black">METRO HUB</div>
          <div className="text-2xl font-black">ELITE PLAZA</div>
        </div>
      </div>
    </section>
  );
}