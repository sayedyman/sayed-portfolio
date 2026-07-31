"use client";

import { useEffect } from "react";
import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { CtaButton } from "@/components/ui/CtaButton";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime Error:", error);
  }, [error]);

  return (
    <div className="relative min-h-[100dvh] pt-32 pb-24 flex items-center justify-center overflow-hidden bg-background">
      {/* Cinematic Gradient Background */}
      <div className="absolute top-0 inset-x-0 h-[50vh] bg-gradient-to-b from-destructive/5 via-transparent to-transparent opacity-50 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-destructive/5 blur-[120px] rounded-full pointer-events-none opacity-50" />
      
      <Container className="relative z-10 text-center flex flex-col items-center">
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
              Something interrupted the experience
            </h2>
            
            <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto">
              An unexpected error occurred while loading this page. Please try again
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <CtaButton variant="primary" onClick={() => reset()} className="w-full sm:w-auto">
                Try Again
              </CtaButton>
              
              <CtaButton variant="secondary" href="/" className="w-full sm:w-auto">
                Back to Home
              </CtaButton>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
