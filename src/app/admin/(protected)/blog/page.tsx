"use client";

import { api, type RouterOutputs, type RouterInputs } from "@/trpc/react";
import { useState } from "react";

export default function AdminBlogListPage() {
  const utils = api.useUtils();
  const { data: blogs, isLoading } = api.blog.getBlogs.useQuery();
  const updateBlog = api.blog.update.useMutation().mutateAsync as (
    input: RouterInputs["blog"]["update"],
  ) => Promise<RouterOutputs["blog"]["update"]>;
  const deleteBlog = api.blog.delete.useMutation().mutateAsync as (
    input: RouterInputs["blog"]["delete"],
  ) => Promise<RouterOutputs["blog"]["delete"]>;
  const [editingId, setEditingId] = useState<string | null>(null);
  type BlogListItem = RouterOutputs["blog"]["getBlogs"][number];
  type BlogForm = Partial<
    Pick<BlogListItem, "title" | "src" | "curtesy"> & {
      summaryPoints: Record<string, string>;
      description: Record<string, string>;
    }
  >;
  const [form, setForm] = useState<BlogForm>({});

  const startEdit = (b: BlogListItem) => {
    setEditingId(b.id);
    setForm({
      title: b.title,
      src: b.src,
      curtesy: b.curtesy,
      summaryPoints: (b.summaryPoints ?? {}) as Record<string, string>,
      description: (b.description ?? {}) as Record<string, string>,
    });
  };

  const save = async (id: string) => {
    await updateBlog({ id, data: form });
    setEditingId(null);
    setForm({});
    await utils.blog.getBlogs.invalidate();
  };

  const remove = async (id: string) => {
    await deleteBlog({ id });
    await utils.blog.getBlogs.invalidate();
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Manage Blogs</h1>
      <div className="space-y-4">
        {blogs?.map((b) => (
          <div key={b.id} className="border border-neutral-800 rounded p-4">
            {editingId === b.id ? (
              <div className="space-y-2">
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.title ?? ""} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.src ?? ""} onChange={(e) => setForm((f) => ({ ...f, src: e.target.value }))} />
                <input className="w-full rounded border border-neutral-700 bg-black p-2" value={form.curtesy ?? ""} onChange={(e) => setForm((f) => ({ ...f, curtesy: e.target.value }))} />
                <fieldset className="border border-neutral-800 rounded p-3">
                  <legend className="px-1 text-sm">Summary Points</legend>
                  <KeyValueEditor
                    value={(form.summaryPoints ?? {})}
                    onAdd={(k, v) => setForm((f) => ({ ...f, summaryPoints: { ...(f.summaryPoints ?? {}), [k]: v } }))}
                    onRemove={(k) => {
                      setForm((f) => {
                        const next: Record<string, string> = { ...(f.summaryPoints ?? {}) };
                        delete next[k];
                        return { ...f, summaryPoints: next };
                      });
                    }}
                  />
                </fieldset>
                <fieldset className="border border-neutral-800 rounded p-3">
                  <legend className="px-1 text-sm">Description</legend>
                  <KeyValueEditor
                    value={(form.description ?? {})}
                    onAdd={(k, v) => setForm((f) => ({ ...f, description: { ...(f.description ?? {}), [k]: v } }))}
                    onRemove={(k) => {
                      setForm((f) => {
                        const next: Record<string, string> = { ...(f.description ?? {}) };
                        delete next[k];
                        return { ...f, description: next };
                      });
                    }}
                  />
                </fieldset>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded bg-white text-black" onClick={() => save(b.id)}>Save</button>
                  <button className="px-3 py-2 rounded border border-neutral-700" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.title}</p>
                  <p className="text-sm text-neutral-400">{b.curtesy}</p>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded border border-neutral-700" onClick={() => startEdit(b)}>Edit</button>
                  <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={() => remove(b.id)}>Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function KeyValueEditor({
  value,
  onAdd,
  onRemove,
}: {
  value: Record<string, string>;
  onAdd: (key: string, value: string) => void;
  onRemove: (key: string) => void;
}) {
  const [keyInput, setKeyInput] = useState("");
  const [valInput, setValInput] = useState("");

  const add = () => {
    if (!keyInput.trim()) return;
    onAdd(keyInput.trim(), valInput);
    setKeyInput("");
    setValInput("");
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 rounded border border-neutral-700 bg-black p-2"
          placeholder="Key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
        />
        <input
          className="flex-1 rounded border border-neutral-700 bg-black p-2"
          placeholder="Value"
          value={valInput}
          onChange={(e) => setValInput(e.target.value)}
        />
        <button type="button" onClick={add} className="px-3 rounded border border-neutral-700">Add</button>
      </div>
      <ul className="space-y-1">
        {Object.entries(value).map(([k, v]) => (
          <li key={k} className="flex items-center justify-between">
            <div>
              <span className="text-sm text-neutral-300">{k}</span>
              <span className="text-sm text-neutral-500 ml-2">{v}</span>
            </div>
            <button type="button" className="px-2 py-1 rounded border border-neutral-700" onClick={() => onRemove(k)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}



