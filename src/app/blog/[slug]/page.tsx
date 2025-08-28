import Image from "next/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function toTitle(slug: string): string {
  return slug
    .split("-")
    .map((s) => (s ? s[0]!.toUpperCase() + s.slice(1) : s))
    .join(" ");
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const title = toTitle(slug);
  const HERO = "/blog/blog.jpg"; // placeholder hero image

  return (
    <main className="bg-black text-white">
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-20 sm:pt-24 md:max-w-4xl">
        <header className="mb-8">
          <div className="mb-2 text-[10px] tracking-[0.4em] text-white/60 sm:text-xs">
            PROMPTS AND PIXELS
          </div>
          <h1 className="text-2xl font-light italic sm:text-3xl md:text-4xl">{title}</h1>
          <div className="mt-3 text-[11px] text-white/60 sm:text-xs">
            Published • {new Date().toLocaleDateString()} • 6 min read
          </div>
        </header>

        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-md">
          <Image
            src={HERO}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
        </div>

        <section className="space-y-6 text-sm leading-7 text-white/70 sm:text-base">
          <p>
            This is a placeholder article page rendered in the same dark theme as the site. Replace the
            content with your actual blog post markdown or rich text. The layout keeps text compact and
            highly readable on dark backgrounds.
          </p>
          <p>
            You can enhance this page later to fetch content from a CMS or files. For now, all images are
            using a shared placeholder located at <code className="text-white/80">/blog/blog.jpg</code>.
          </p>
          <h2 className="pt-4 text-base font-semibold text-white sm:text-lg">Design Principles</h2>
          <p>
            Consistency, contrast, and rhythm guide the visual system. Typography remains modest to allow
            imagery and motion to shine while preserving clarity.
          </p>
          <blockquote className="border-l-2 border-white/20 pl-4 text-white/80">
            “Simplicity is not the goal. It is the by-product of a good idea and modest expectations.”
          </blockquote>
          <p>
            Continue building out sections, embed media, or add call‑outs as needed. The foundation here
            keeps spacing generous and the palette restrained.
          </p>
        </section>
      </article>
    </main>
  );
}


