import { SearchForm } from "@/components/SearchForm";
import { Startups } from "@/components/Startups";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="purple-container pattern">
        <h1 className="heading justify-self-center">
          Pitch Your Startup, <br />
          Connect with Enterprenures
        </h1>
        <p className="sub-heading max-w-3xl">
          Submit Ideas, Vote on Pitches, and get Noted in virtual Competitions.
        </p>
        <SearchForm query={query ?? ""} />
      </section>
      <section className="section-container">
        <p className="text-2xl font-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="card-grid mt-7 text-black">
          <Startups query={query ?? ""} />
        </ul>
      </section>
    </>
  );
}
