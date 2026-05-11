import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative w-24 h-24 animate-pulse">
        <Image 
          src="/logo-symbol.svg" 
          alt="Sayed Elghanam Logo" 
          fill 
          className="object-contain" 
          priority
        />
      </div>
    </div>
  );
}
