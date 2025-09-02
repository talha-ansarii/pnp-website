import { PrismaClient, type Prisma } from "@prisma/client";
import { blogs } from "../src/data/blog";
import { videos } from "../src/data/videos";

const prisma = new PrismaClient();

async function seedBlogs() {
  for (const blog of blogs) {
    await prisma.blog.upsert({
      where: { slug: blog.slug },
      update: {
        title: blog.title,
        src: blog.src,
        curtesy: blog.curtesy,
        summaryPoints: blog.summaryPoints as unknown as Prisma.InputJsonValue,
        description: blog.description as unknown as Prisma.InputJsonValue,
      },
      create: {
        title: blog.title,
        slug: blog.slug,
        src: blog.src,
        curtesy: blog.curtesy,
        summaryPoints: blog.summaryPoints as unknown as Prisma.InputJsonValue,
        description: blog.description as unknown as Prisma.InputJsonValue,
      },
    });
  }
}

async function seedVideos() {
  // Replace all videos to keep things simple and idempotent
  await prisma.video.deleteMany({});
  await prisma.video.createMany({
    data: videos.map((v) => ({
      src: v.src,
      link: v.link,
      title: v.title,
      timeUploaded: v.timeUploaded,
      description: v.description,
    })),
  });
}

async function main() {
  await seedBlogs();
  await seedVideos();
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log("Seeding completed");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


