import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { allPostsQuery } from "@/sanity/lib/queries";

export default async function BlogPage() {
  const posts = await client.fetch(allPostsQuery);

  return (
    <main className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900">
        Our Blog
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group block rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <div className="relative h-64 w-full">
              {post.mainImage?.asset?.url && (
                <Image
                  src={post.mainImage.asset.url}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              )}
            </div>

            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-900 group-hover:text-indigo-600 transition-colors">
                {post.title}
              </h2>

              {post.author?.name && (
                <p className="text-sm text-gray-500 mb-2">
                  By {post.author.name}
                </p>
              )}

              {post.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {post.categories.map((c: any) => (
                    <span
                      key={c.title}
                      className="text-xs font-medium bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full"
                    >
                      {c.title}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
