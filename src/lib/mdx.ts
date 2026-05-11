import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export function getMdxFiles(dir: string) {
  return fs.readdirSync(path.join(contentDirectory, dir)).filter((file) => file.endsWith(".mdx"));
}

export function getMdxContent(dir: string, slug: string) {
  const filePath = path.join(contentDirectory, dir, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);
  return { metadata: data, content };
}

export function getAllMdxMetadata(dir: string) {
  const files = getMdxFiles(dir);
  return files.map((file) => {
    const slug = file.replace(/\.mdx$/, "");
    const { metadata } = getMdxContent(dir, slug);
    return { slug, ...metadata };
  });
}
