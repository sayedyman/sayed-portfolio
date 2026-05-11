import { Container } from "@/components/layout/Container";
import { Grid } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { getMdxContent, getMdxFiles } from "@/lib/mdx";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const files = getMdxFiles("work");
  return files.map((file) => ({
    slug: file.replace(/\.mdx$/, ""),
  }));
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { metadata, content } = getMdxContent("work", slug);

  return (
    <>
      {/* Case Study Hero */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 border-b border-border/50">
        <Container>
          <Grid>
            <div className="col-span-4 md:col-span-8 lg:col-span-10">
              <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-heading font-medium tracking-tighter uppercase mb-6 leading-none">
                {metadata.title}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12">
                {metadata.summary}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-border/50">
                <div>
                  <h4 className="text-sm tracking-widest text-muted-foreground uppercase mb-2">Role</h4>
                  <p className="font-medium">{metadata.role}</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest text-muted-foreground uppercase mb-2">Timeline</h4>
                  <p className="font-medium">{metadata.timeline}</p>
                </div>
                <div>
                  <h4 className="text-sm tracking-widest text-muted-foreground uppercase mb-2">Client</h4>
                  <p className="font-medium">{metadata.client}</p>
                </div>
              </div>
            </div>
          </Grid>
        </Container>
      </section>

      {/* Case Study Content */}
      <Section padding="lg">
        <Container size="editorial">
          <article className="prose prose-invert prose-lg prose-headings:font-heading prose-headings:font-medium prose-headings:tracking-tighter prose-p:text-muted-foreground prose-a:text-primary max-w-none">
            <MDXRemote source={content} />
          </article>
        </Container>
      </Section>
    </>
  );
}
