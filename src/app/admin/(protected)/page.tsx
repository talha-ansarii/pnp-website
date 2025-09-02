"use client";

import { useState } from "react";
import type { KeyboardEventHandler } from "react";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"blog" | "video">("blog");
  // Blog state
  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");
  const [curtesy, setCurtesy] = useState("");
  const [summaryPoints, setSummaryPoints] = useState<Record<string, string>>({});
  const [description, setDescription] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const createMutation = api.blog.create.useMutation();
  // Video state
  const [vSrc, setVSrc] = useState("");
  const [vLink, setVLink] = useState("");
  const [vTitle, setVTitle] = useState("");
  const [vTimeUploaded, setVTimeUploaded] = useState("");
  const [vDescription, setVDescription] = useState("");
  const createVideo = api.video.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await createMutation.mutateAsync({ title, src, curtesy, summaryPoints, description });
      setStatus("Blog created successfully.");
      setTitle("");
      setSrc("");
      setCurtesy("");
      setSummaryPoints({});
      setDescription({});
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyValueChange = (
    setter: React.Dispatch<React.SetStateAction<Record<string, string>>>,
    key: string,
    value: string,
  ) => {
    setter((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await createVideo.mutateAsync({
        src: vSrc,
        link: vLink,
        title: vTitle,
        timeUploaded: vTimeUploaded,
        description: vDescription,
      });
      setStatus("Video created successfully.");
      setVSrc("");
      setVLink("");
      setVTitle("");
      setVTimeUploaded("");
      setVDescription("");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setStatus(message);
    } finally {
      setLoading(false);
    }
  };

  const router = useRouter();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <header className="flex gap-3 mb-4 mt-10">
        <h1 className="text-2xl font-semibold mb-4">Admin</h1>
        <Button
          type="button"
          onClick={() => router.replace("/admin/blog")}
            className={` rounded border border-neutral-700 cursor-pointer`}
        >
          View Blogs
        </Button>
        <Button
          type="button"
          onClick={() => router.replace("/admin/video")}
          className={`rounded border border-neutral-700 cursor-pointer`}
        >
          View Videos
        </Button>
      </header>

      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("blog")}
          className={`px-4 py-2 rounded border ${activeTab === "blog" ? "bg-white text-black" : "border-neutral-700"}`}
        >
          Add Blog
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("video")}
          className={`px-4 py-2 rounded border ${activeTab === "video" ? "bg-white text-black" : "border-neutral-700"}`}
        >
          Add Video
        </button>
      </div>

      {activeTab === "blog" && (
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Image URL (src)</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Courtesy</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={curtesy}
            onChange={(e) => setCurtesy(e.target.value)}
            required
          />
        </div>

        <fieldset className="border border-neutral-800 rounded p-4">
          <legend className="px-1 text-sm">Summary Points</legend>
          <KeyValueEditor
            value={summaryPoints}
            onChange={(k, v) => handleKeyValueChange(setSummaryPoints, k, v)}
          />
        </fieldset>

        <fieldset className="border border-neutral-800 rounded p-4">
          <legend className="px-1 text-sm">Description</legend>
          <KeyValueEditor
            value={description}
            onChange={(k, v) => handleKeyValueChange(setDescription, k, v)}
          />
        </fieldset>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-white text-black disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      )}

      {activeTab === "video" && (
      <form className="space-y-4" onSubmit={handleSubmitVideo}>
        <div>
          <label className="block text-sm mb-1">Source (src)</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={vSrc}
            onChange={(e) => setVSrc(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">External Link</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={vLink}
            onChange={(e) => setVLink(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Title</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={vTitle}
            onChange={(e) => setVTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Time Uploaded</label>
          <input
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={vTimeUploaded}
            onChange={(e) => setVTimeUploaded(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            className="w-full rounded border border-neutral-700 bg-black p-2"
            value={vDescription}
            onChange={(e) => setVDescription(e.target.value)}
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded bg-white text-black disabled:opacity-60"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
      )}

      {status && (
        <p className="mt-4 text-sm text-neutral-300" role="status">{status}</p>
      )}
    </div>
  );
}

function KeyValueEditor({
  value,
  onChange,
}: {
  value: Record<string, string>;
  onChange: (key: string, value: string) => void;
}) {
  const [keyInput, setKeyInput] = useState("");
  const [valInput, setValInput] = useState("");

  const addPair = () => {
    if (!keyInput.trim()) return;
    onChange(keyInput.trim(), valInput);
    setKeyInput("");
    setValInput("");
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addPair();
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-2">
        <input
          className="flex-1 rounded border border-neutral-700 bg-black p-2"
          placeholder="Key"
          value={keyInput}
          onChange={(e) => setKeyInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <input
          className="flex-1 rounded border border-neutral-700 bg-black p-2"
          placeholder="Value"
          value={valInput}
          onChange={(e) => setValInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          type="button"
          onClick={addPair}
          className="px-3 rounded border border-neutral-700"
        >
          Add
        </button>
      </div>
      <ul className="space-y-1">
        {Object.entries(value).map(([k, v]) => (
          <li key={k} className="flex items-center justify-between">
            <span className="text-sm text-neutral-300">{k}</span>
            <span className="text-sm text-neutral-500">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}


