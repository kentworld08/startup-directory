// app/startup/[id]/page.tsx

import { notFound } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_ID_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Views } from "@/components/Views";

type Props = {
  params: Promise<{ id: string }>;
};

interface StartupData {
  _id: number;
  _createdAt: string;
  author: {
    name: string;
    _id: number;
    bio: string;
    image: string;
    username: string;
  };
  image: string;
  category: string;
  description: string;
  pitch: string;
  slug: number;
  views: number;
  title: string;
}

export default async function StartupPage({ params }: Props) {
  const { id } = await params;

  const post: StartupData = await client.fetch(STARTUPS_BY_ID_QUERY, { id });

  if (!post) return notFound();
  const created = format(new Date(post._createdAt), "MMM d, yyyy");

  return (
    <>
      <section className="purple-container min-h-[230px] pattern">
        <p className="tag">{created}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading max-w-5xl">{post.description}</p>
      </section>
      <section className="section-container">
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div
            className=" thumbnail"
            style={{ backgroundImage: `url(${post.image})` }}
          />
          <div className="flex justify-between items-center gap-5">
            <Link
              href={`/user/${post.author._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={urlFor(post.author.image).url()}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20 font-medium">{post.author.name}</p>
                <p className="text-16 font-medium text-black-300">
                  {post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30 font-bold">Pitch Details</h3>
          <p>{post.pitch}</p>
          <hr className="divider" />
          <Suspense fallback={<Skeleton />}>
            <Views id={id} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
