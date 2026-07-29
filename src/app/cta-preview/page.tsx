import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CtaButton } from "@/components/ui/CtaButton";

export default function CtaPreviewPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <Container>
        <SectionHeader
          title="CTA System Preview"
          subtitle="All Button Variants"
          className="mb-16"
        />

        <Grid className="gap-y-16">
          <div className="col-span-12">
            <h3 className="text-xl font-heading mb-8 pb-4 border-b border-border">Sizes (Primary Variant)</h3>
            <div className="flex flex-wrap items-end gap-8">
              <CtaButton size="sm">Small CTA</CtaButton>
              <CtaButton size="md">Medium CTA</CtaButton>
              <CtaButton size="lg">Large CTA</CtaButton>
            </div>
          </div>

          <div className="col-span-12">
            <h3 className="text-xl font-heading mb-8 pb-4 border-b border-border">Variants (Medium Size)</h3>
            <div className="flex flex-wrap items-center gap-8">
              <CtaButton variant="primary">Primary Variant</CtaButton>
              <CtaButton variant="secondary">Secondary Variant</CtaButton>
              <CtaButton variant="ghost">Ghost Variant</CtaButton>
            </div>
          </div>

          <div className="col-span-12">
            <h3 className="text-xl font-heading mb-8 pb-4 border-b border-border">States</h3>
            <div className="flex flex-wrap items-center gap-8">
              <CtaButton variant="primary" loading>Loading Primary</CtaButton>
              <CtaButton variant="secondary" disabled>Disabled Secondary</CtaButton>
              <CtaButton variant="ghost" showArrow={false}>No Arrow Ghost</CtaButton>
            </div>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
