import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const blogRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: adminProcedure
    .input(z.object({ 
      title: z.string().min(1),
      src: z.string().min(1),
      curtesy: z.string().min(1),
      summaryPoints: z.record(z.string()),
      description: z.record(z.string()),
    }))
    .mutation(async ({ ctx, input }) => {
      const { title, src, curtesy, summaryPoints, description } = input;
      const slug = title.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-");
      const blog = await ctx.db.blog.create({
        data: {
          title,
          slug,
          src,
          curtesy,
          summaryPoints,
          description,
        },
      });

      return blog;
    }),

  getBlogs: publicProcedure.query(async ({ ctx }) => {
    const blogs = await ctx.db.blog.findMany();
    return blogs;
  }),
});
