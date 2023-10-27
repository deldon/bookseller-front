import "./style.css";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { Link } from "react-router-dom";
import { useState } from "react";
import Spinner from "../Spinner/Spinner";

function Aside({ mobile }) {
  const [toggle, setToggel] = useState(false);

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
    <aside>
      <div
        onClick={() => {
          setToggel(!toggle);
        }}
        className="aside-top-author"
      >
        <div>Top Auteur</div>

        {toggle
          ? mobile && (
              <img
                src="https://api.iconify.design/ic:round-keyboard-arrow-up.svg"
                alt="Mon Image Retournée"
                style={{ transform: "scaleX(-1)" }}
              />
            )
          : mobile && (
              <img
                src="https://api.iconify.design/ic:round-keyboard-arrow-down.svg"
                alt="Mon Image"
              />
            )}
      </div>

      {(!mobile || toggle) && (
        <div className="aside-author">
          {data.map((author) => (
            <div key={author.id} className="aside-author-cell">
              <Link to={`/search?type=author&search=${author.name}`}>
                {author.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </aside>
  );
}

export default Aside;
