import "./style.css";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { Link } from "react-router-dom";

function Aside() {
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

  if (isLoading) return <>Loading</>;

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  return (
    <div className="aside">
      <div className="aside-top-author">Top Auteur</div>
      <div className="aside-author">
        {data.map((author) => (
          <div className="aside-author-cell">
            <Link to={`/search?type=author&search=${author.name}`}>
              {author.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aside;
