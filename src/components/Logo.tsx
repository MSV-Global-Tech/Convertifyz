import React from "react";

export default function Logo({ size = 32 }: { size?: number }) {
  return (
    <div 
      className="flex-shrink-0 flex items-center justify-center overflow-hidden rounded-lg"
      style={{ width: size, height: size }}
    >
      <img 
        src="/logo.png" 
        alt="Convertifyz Logo" 
        className="w-full h-full object-contain transform hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
}
