import "./style.scss";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

function TopAuthors() {
  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["topAuthor"],
    async () => {
      const data = await request.topAuthors();
      return data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    }
  );

  if (isLoading) return <Spinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="top_authors">
      <div className="top_authors-grid">
        {data.map((author) => (
          <Link key={author.id} to={`/search?q=${author.name}`}>
            {author.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default TopAuthors;
