import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const videoRouter = createTRPCRouter({
  create: adminProcedure
    .input(z.object({
      src: z.string().min(1),
      link: z.string().min(1),
      title: z.string().min(1),
      timeUploaded: z.string().min(1),
      description: z.string().min(1),
    }))
    .mutation(async ({ ctx, input }) => {
      const { src, link, title, timeUploaded, description } = input;
      const created = await ctx.db.video.create({
        data: { src, link, title, timeUploaded, description },
      });
      return created;
    }),

  getVideos: publicProcedure.query(async ({ ctx }) => {
    const videos = await ctx.db.video.findMany({ orderBy: { createdAt: "desc" } });
    return videos;
  }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        data: z.object({
          src: z.string().min(1).optional(),
          link: z.string().min(1).optional(),
          title: z.string().min(1).optional(),
          timeUploaded: z.string().min(1).optional(),
          description: z.string().min(1).optional(),
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input;
      const updated = await ctx.db.video.update({ where: { id }, data });
      return updated;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.video.delete({ where: { id: input.id } });
      return { success: true };
    }),
});


