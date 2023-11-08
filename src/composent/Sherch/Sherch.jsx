import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import "./style.scss";
import BookCard from "../BookCard/BookCard";
import Spinner from "../Spinner/Spinner";
import NoFund from "../noFund/noFund";

import dayjs from "dayjs";

function Sherch() {
  const [searchValue, setSearchValue] = useState("");
  

  const location = useLocation();

  const extractSearchValueFromURL = (search) => {
    const searchParams = new URLSearchParams(search);
    const searchValue = searchParams.get("q") || "";
    return { search: searchValue };
  };

  // Mettre à jour le state de la valeur de recherche lors du changement d'URL
  useEffect(() => {
    const query = extractSearchValueFromURL(location.search);
    setSearchValue(query.search);
    
  }, [location.search]);

  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["search", searchValue],
    async () => {
      const data = await request.sherch(searchValue);
      return data;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 0,
      cacheTime: 0,
      refetchInterval: 0,
    }
  );

  if (isLoading) return <Spinner/>;

  if (error) return "An error has occurred: " + error.message;

  if (data.length == 0) {
 
  }

  const dateDuJour = dayjs(); // Crée une instance Day.js pour la date et l'heure actuelles

  return (
    <>

    <div className="sherch">
      
      {data.length == 0 && <NoFund/>}
      {data.length > 0 && (
        <>
          <div className="sherch-title">{searchValue}</div>
          <div className="sherch-grid-container">
            {data.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </>
      )}
    </div>
    </> );
}

export default Sherch;
