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
    const blogs = await ctx.db.blog.findMany({ orderBy: { createdAt: "desc" } });
    return blogs;
  }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        data: z.object({
          title: z.string().min(1).optional(),
          src: z.string().min(1).optional(),
          curtesy: z.string().min(1).optional(),
          summaryPoints: z.record(z.string()).optional(),
          description: z.record(z.string()).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const updateData: Record<string, unknown> = { ...data };
      if (data.title) {
        updateData.slug = data.title
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9\s-]/g, "")
          .replace(/\s+/g, "-");
      }
      const updated = await ctx.db.blog.update({
        where: { id },
        data: updateData,
      });
      return updated;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.blog.delete({ where: { id: input.id } });
      return { success: true };
    }),
});
