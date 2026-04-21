import BlogForm from "./BlogForm";

export const dynamic = "force-dynamic";

export default function NewBlogPostPage() {
  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">New blog post</h1>
      <p className="text-ink-400 text-sm mb-8">
        Upload a cover image, write the post, save as draft. Publish when ready.
      </p>
      <BlogForm />
    </div>
  );
}
