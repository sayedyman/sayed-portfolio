"use client";

import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/design-system/motion";

const audiences = [
  {
    num: "01",
    title: "SaaS & Startups",
    headline: "Have a product worth explaining?",
    description:
      "I design websites that clearly explain what your product does, why it matters, and how it helps users — so visitors understand the value and know what to do next",
    tags: ["SaaS Websites", "Product Pages", "Conversion UX"],
  },
  {
    num: "02",
    title: "Agencies",
    headline: "Need a website that represents your agency?",
    description:
      "I design websites that showcase your services, work, and value while making it easy for potential clients to take the next step",
    tags: ["Agency Websites", "Service Pages", "Case Study Pages"],
  },
  {
    num: "03",
    title: "Businesses",
    headline: "Need a digital presence that works for your business?",
    description:
      "I design websites that clearly explain what your business offers, build trust with potential customers, and guide them toward the right next step",
    tags: ["Business Websites", "Landing Pages", "Service Websites"],
  },
];

export function WhoIWorkWithSection() {
  return (
    <Section
      id="who-i-work-with"
      padding="xl"
      className="bg-background relative border-t border-border/10"
    >
      <Container>
        <Grid>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 mb-10 md:mb-14">
            <SectionHeader
              title="Who I Work With"
              subtitle="Not every business needs the same website. I design around what your business needs to achieve"
              className="mb-4 md:mb-6"
              titleClassName="uppercase tracking-tighter leading-[0.9] !mb-3 md:!mb-4"
              subtitleClassName="max-w-2xl"
            />
          </div>
        </Grid>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 lg:gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px" }}
        >
          {audiences.map((audience) => (
            <motion.div
              key={audience.num}
              variants={staggerItem}
              className="group relative flex flex-col border border-border/20 rounded-sm bg-secondary/20 p-5 md:px-6 md:py-8 transition-colors duration-300 hover:bg-secondary/40"
            >
              {/* Number */}
              <span className="text-xl md:text-2xl font-heading text-muted-foreground/50 mb-6">
                {audience.num}
              </span>

              {/* Category title */}
              <h3 className="text-xl md:text-2xl font-heading font-medium mb-3">
                {audience.title}
              </h3>

              {/* Problem / question */}
              <p className="text-lg md:text-xl font-heading font-medium text-primary mb-4 leading-snug md:min-h-[3.5rem]">
                {audience.headline}
              </p>

              {/* How I help */}
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1 md:min-h-[6.5rem]">
                {audience.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {audience.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full border border-border/30 bg-secondary/30 text-sm text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
