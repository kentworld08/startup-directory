import Form from "next/form";
import { SearchFormResetBtn } from "./SearchFormResetBtn";
import { Button } from "./ui/button";
import { Search } from "lucide-react";

export const SearchForm = ({ query }: { query: string }) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        type="text"
        name="query"
        autoFocus
        defaultValue={query}
        placeholder="Search Startups"
        className="search-input"
      />
      <div className="flex gap-2">
        {query && <SearchFormResetBtn />}
        <Button type="submit" className="search-btn">
          <Search className="size-5" />
        </Button>
      </div>
    </Form>
  );
};
