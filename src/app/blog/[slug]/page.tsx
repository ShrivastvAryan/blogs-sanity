import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { client } from "@/sanity/lib/client";
import { singlePostQuery } from "@/sanity/lib/queries";

interface Props {
  params: { slug: string };
}

export default async function PostPage({ params }: Props) {
  const post = await client.fetch(singlePostQuery(params.slug));

  if (!post) return <p>Post not found</p>;

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.mainImage?.asset?.url && (
        <Image
          src={post.mainImage.asset.url}
          alt={post.mainImage.alt || post.title}
          width={800}
          height={400}
          className="w-full object-cover rounded-lg mb-6"
        />
      )}
      <p className="text-sm text-gray-500 mb-4">
        By {post.author?.name} | {new Date(post.publishedAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-full">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
