import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/blog";
import EditForm from "./EditForm";

export const dynamic = "force-dynamic";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();
  return (
    <div className="container-wide py-8 max-w-3xl">
      <h1 className="font-display text-3xl font-bold text-white mb-1">Edit: {post.title}</h1>
      <p className="text-ink-400 text-sm mb-8">Changes commit to git for full history.</p>
      <EditForm initial={post} />
    </div>
  );
}
