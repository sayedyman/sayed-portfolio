import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { CtaButton } from "@/components/ui/CtaButton";

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] pt-32 pb-24 flex items-center justify-center overflow-hidden bg-background">
      {/* Cinematic Gradient Background */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <Container className="relative z-10 text-center flex flex-col items-center">
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col items-center justify-center">
            <span className="text-primary font-heading font-bold text-8xl md:text-[12rem] leading-none tracking-tighter opacity-20 mb-8">
              404
            </span>
            
            <h1 className="text-4xl md:text-6xl font-heading font-medium tracking-tight mb-6 uppercase text-foreground">
              Lost in the journey?
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto mb-12 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or may have moved.
            </p>
            
            <CtaButton variant="primary" href="/" className="mx-auto">
              Back to Home
            </CtaButton>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
