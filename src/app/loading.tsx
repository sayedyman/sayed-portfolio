import { Logo } from "@/components/ui/Logo";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative w-24 h-24 animate-pulse mb-8 flex justify-center items-center">
        <Logo type="symbol" className="w-full h-full" />
      </div>
      <div className="text-center">
        <p className="text-foreground font-heading font-medium text-lg uppercase tracking-widest mb-2">
          Preparing the experience...
        </p>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Loading content and getting everything ready
        </p>
      </div>
    </div>
  );
}
