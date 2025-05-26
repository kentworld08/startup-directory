import { getToken } from "next-auth/jwt"; // or your auth lib
import { writeClient } from "@/sanity/lib/write-client";

const secret = process.env.AUTH_SECRET;

export async function POST(request: Request) {
  const token = await getToken({ req: request, secret });

  if (!token?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const data = await request.json();

  // Lookup author document by email in Sanity
  const authorQuery = `*[_type == "author" && email == $email][0]`;
  const author = await writeClient.fetch(authorQuery, { email: token.email });

  if (!author?._id) {
    return new Response(JSON.stringify({ error: "Author not found" }), {
      status: 404,
    });
  }

  // Create startup document with author reference
  const created = await writeClient.create({
    _type: "startup",
    title: data.title,
    description: data.description,
    category: data.category,
    image: data.link,
    pitch: data.pitch,
    views: 0,
    author: {
      _type: "reference",
      _ref: author._id,
    },
    slug: {
      _type: "slug",
      current: data.title.toLowerCase().replace(/\s+/g, "-"),
    },
  });

  return new Response(JSON.stringify({ success: true, created }), {
    status: 201,
  });
}
