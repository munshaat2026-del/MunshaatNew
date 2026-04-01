"use client";

export default function Loading() {
  const primaryColor = "#0c479a";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center overflow-hidden relative">
      {/* Small glowing background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full blur-[80px] opacity-20" style={{ backgroundColor: primaryColor }} />
      </div>

      {/* Loader */}
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full animate-spin"
          style={{
            border: `3px solid ${primaryColor}33`,
            borderTopColor: primaryColor,
            borderRightColor: `${primaryColor}80`,
          }}
        />

        {/* Inner rotating square */}
        <div className="absolute inset-6 flex items-center justify-center">
          <div
            className="w-8 h-8 rotate-45 animate-spin"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}80)`,
              borderRadius: "8px",
              boxShadow: `0 0 20px ${primaryColor}55`,
            }}
          />
        </div>

        {/* Orbiting dot */}
        <div className="absolute inset-0 rounded-full animate-spin" style={{ animationDuration: "2s" }}>
          <div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: primaryColor, boxShadow: `0 0 15px ${primaryColor}` }}
          />
        </div>
      </div>

      <style jsx>{`
        .animate-spin {
          animation: spin 1.5s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}