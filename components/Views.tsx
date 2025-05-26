import { client } from "@/sanity/lib/client";
import { STARTUPS_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";

export async function Views({ id }: { id: string }) {
  const { views: totalViews } = await client
    .withConfig({ useCdn: false })
    .fetch(STARTUPS_VIEWS_QUERY, { id });

  await writeClient
    .patch(id)
    .set({ views: totalViews + 1 })
    .commit();

  return (
    <div className="fixed bottom-5 right-5">
      <div className="relative inline-block">
        <p className="py-2 px-4 text-center rounded-xl bg-pink-200">
          <span className="font-black flex gap-2">
            {totalViews > 1 ? <span>views</span> : <span>view:</span>}{" "}
            {totalViews}
          </span>
        </p>

        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white animate-ping" />
        <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
      </div>
    </div>
  );
}
