import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { format } from "date-fns";

interface StartupData {
  _id: number;
  _createdAt: string;
  author: {
    name: string;
    image: string;
  };
  image: string;
  category: string;
  description: string;
  views: number;
  title: string;
}

export const Startups = async ({ query }: { query: string }) => {
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY });

  if (!posts) notFound();

  const filteredStartups = posts.filter((startup: StartupData) => {
    const term = query?.toLowerCase();
    const titleMatch = startup?.title.toLowerCase().includes(term);
    const descriptionMatch = startup?.description?.toLowerCase().includes(term);
    const industryMatch = startup?.category?.toLowerCase().includes(term);
    const yearMatch = startup?._createdAt?.toString().includes(term);
    const authorName = startup?.author?.name
      .toString()
      .toLowerCase()
      .includes(term);
    return (
      titleMatch || descriptionMatch || industryMatch || yearMatch || authorName
    );
  });
  return (
    <>
      {filteredStartups.map((startup: StartupData) => (
        <Card key={startup._id}>
          <CardHeader>
            <div className="flex justify-between ">
              <p title="Founded">
                {format(new Date(startup._createdAt), "MMM d, yyyy")}
              </p>
              <span className="flex items-center gap-2">
                <Eye className="text-red-400" size={20} />
                {startup.views}
              </span>
            </div>
            <h1>{startup.author.name}</h1>

            <CardTitle className="flex justify-between items-center">
              <h2
                className="line-clamp-1 leading-10
            "
              >
                {startup.title}
              </h2>

              {startup.author.image && (
                <Image
                  src={
                    urlFor(startup.author.image).url() ||
                    "https://cdn.sanity.io/images/8whb86ev/production/78b04f9f0f2614f22eb12dae71cbd5014c9298f8-440x440.jpg"
                  }
                  alt="author"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              )}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {startup.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative w-full h-46">
              <Image
                src={startup.image}
                alt={startup.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <p>{startup.title.split(" ")[0]}</p>
            <Link href={`/startup/${startup._id}`}>
              <Button type="button" className="rounded-full cursor-pointer">
                Details
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </>
  );
};
