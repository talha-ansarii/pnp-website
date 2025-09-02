"use client";

import { api, type RouterInputs, type RouterOutputs } from "@/trpc/react";
import { useState } from "react";

export default function AdminVideoListPage() {
  const utils = api.useUtils();
  const { data: videos, isLoading } = api.video.getVideos.useQuery();

  const updateVideo = api.video.update.useMutation().mutateAsync as (
    input: RouterInputs["video"]["update"],
  ) => Promise<RouterOutputs["video"]["update"]>;
  const deleteVideo = api.video.delete.useMutation().mutateAsync as (
    input: RouterInputs["video"]["delete"],
  ) => Promise<RouterOutputs["video"]["delete"]>;
  const [editingId, setEditingId] = useState<string | null>(null);
  type VideoListItem = RouterOutputs["video"]["getVideos"][number];
  type VideoForm = Partial<Pick<VideoListItem, "src" | "link" | "title" | "timeUploaded" | "description">>;
  const [form, setForm] = useState<VideoForm>({});

  const startEdit = (v: VideoListItem) => {
    setEditingId(v.id);
    setForm({
      src: v.src,
      link: v.link,
      title: v.title,
      timeUploaded: v.timeUploaded,
      description: v.description,
    });
  };

  const save = async (id: string) => {
    await updateVideo({ id, data: form });
    setEditingId(null);
    setForm({});
    try { await utils?.video?.getVideos?.invalidate?.(); } catch {}
  };

  const remove = async (id: string) => {
    await deleteVideo({ id });
    await utils.video.getVideos.invalidate();
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Videos</h1>
      <div className="space-y-4">
        {videos?.map((v) => (
          <div key={v.id} className="border border-neutral-800 rounded p-4">
            {editingId === v.id ? (
              <div className="space-y-2">
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.src ?? ""} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} />
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.link ?? ""} onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))} />
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.timeUploaded ?? ""} onChange={(e) => setForm((f) => ({ ...f, timeUploaded: e.target.value }))} />
                <textarea className="w-full rounded border border-neutral-700 bg-black p-2" value={form.description ?? ""} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded bg-white text-black" onClick={() => save(v.id)}>Save</button>
                  <button className="px-3 py-2 rounded border border-neutral-700" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{v.title}</p>
                  <p className="text-sm text-neutral-400">{v.link}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded border border-neutral-700" onClick={() => startEdit(v)}>Edit</button>
                  <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={() => remove(v.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


