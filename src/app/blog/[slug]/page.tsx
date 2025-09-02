import { api } from "@/trpc/server";
import Image from "next/image";


type PageProps = {
  params: Promise<{ slug: string }>;
};

interface Blog {
  description: Record<string, string>;
  summaryPoints: Record<string, string>;
  src: string;
  curtesy: string;
  title: string;
  slug: string;
}

function calculateReadTime(blog: Blog): number {
  // Flatten description + summaryPoints text
  const descriptionText = Object.values(blog.description).join(" ");
  const summaryText = Object.values(blog.summaryPoints).join(" ");

  const allText = descriptionText + " " + summaryText;

  // Count words
  const wordCount = allText.trim().split(/\s+/).length;

  // Average 200 words per minute
  return Math.max(1, Math.ceil(wordCount / 200));
}



// removed unused toTitle

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const blogs = await api.blog.getBlogs(); 
  const blog = blogs?.find((blog) => blog.slug === slug);
  const readTime = calculateReadTime(blog as unknown as Blog);

  if (!blog) {
    return (
      <main className="bg-black text-white">
        <div className="mx-auto max-w-3xl px-6 pt-20">
          <h1 className="text-2xl font-light">Blog post not found</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-black text-white">
      <article className="mx-auto max-w-3xl px-6 pt-8 sm:pt-24 md:pt-16 pb-24 md:max-w-4xl">
        <header className="mb-8">
          <div className="mb-2 text-[10px] tracking-[0.4em] text-white/60 sm:text-xs">
            PROMPTS AND PIXELS
          </div>
          <h1 className="text-2xl font-light italic sm:text-3xl md:text-4xl">
            {blog.title}
          </h1>
          <div className="mt-3 text-[11px] text-white/60 sm:text-xs">
            Published • {new Date().toLocaleDateString()} • {readTime} min read
          </div>
        </header>

        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-md">
          <Image
            src={blog.src}
            alt={blog.title}
            fill
            unoptimized
            className="object-cover"
          />
          {blog.curtesy && (
            <div className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-[10px] text-white/70">
              Image courtesy: {blog.curtesy}
            </div>
          )}
        </div>

        {/* Summary Points Section */}
        <section className="mb-10 rounded-lg border border-white/10 bg-white/5 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">Key Points</h2>
          <div className="space-y-3">
            {Object.entries(blog.summaryPoints as Record<string, string>).map(([key, value]) => (
              <div key={key} className="border-l-2 border-white/20 pl-4">
                <h3 className="mb-1 text-sm font-medium text-white/90">
                  {key}
                </h3>
                <p className="text-sm text-white/70">{value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content */}
        <section className="space-y-8 text-sm leading-7 text-white/70 sm:text-base">
          {Object.entries(blog.description as Record<string, string>  ).map(([sectionTitle, content]) => (
            <div key={sectionTitle} className="space-y-4">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {sectionTitle}
              </h2>
              <div className="space-y-4">
                {(content).split(". ").map((sentence: string, index: number, array: string[]) => {
                  // Group sentences into paragraphs (roughly 3-4 sentences each)
                  const isStartOfParagraph = index % 4 === 0;

                  if (isStartOfParagraph) {
                    const paragraphSentences = array.slice(
                      index,
                      Math.min(index + 4, array.length),
                    );
                    const paragraphText =
                      paragraphSentences.join(". ") +
                      (paragraphSentences[
                        paragraphSentences.length - 1
                      ]?.endsWith(".")
                        ? ""
                        : ".");

                    return (
                      <p key={index} className="leading-relaxed">
                        {paragraphText}
                      </p>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          ))}
        </section>
      </article>
    </main>
  );
}
