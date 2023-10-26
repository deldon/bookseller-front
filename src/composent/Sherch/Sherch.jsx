import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import "./style.css";
import BookCard from '../BookCard/BookCard'

import dayjs from "dayjs";

function Sherch() {
  const [searchValue, setSearchValue] = useState("");
  const [typeValue, setTypeValue] = useState("");

  const location = useLocation();

  const extractSearchValueFromURL = (search) => {
    const searchParams = new URLSearchParams(search);
    const type = searchParams.get("type") || "";
    const searchValue = searchParams.get("search") || "";
    return { type, search: searchValue };
  };

  // Mettre à jour le state de la valeur de recherche lors du changement d'URL
  useEffect(() => {
    const query = extractSearchValueFromURL(location.search);
    console.log(query);
    setSearchValue(query.search);
    setTypeValue(query.type);
  }, [location.search]);

  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["search", searchValue, typeValue],
    async () => {
      const data = await request.sherch(searchValue, typeValue);
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

  if (data.length == 0) {
    console.log("404");
  }

  const dateDuJour = dayjs(); // Crée une instance Day.js pour la date et l'heure actuelles

  return (
    <div className="sherch">
      {data.length == 0 && <div className="404">Pas de livre disponible</div>}
      {data.length > 0 && (
        <>
        <div className="search-title">Recherche: {searchValue}</div>
        <div className="grid-container">
          {data.map((book) => (<BookCard book={book}/>))}
        </div>
        </>
      )}
    </div>
  );
}

export default Sherch;
