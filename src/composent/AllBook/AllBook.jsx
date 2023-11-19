import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import request from "../../request/query/request";
import "./style.scss";
import BookCard from "../BookCard/BookCard";
import Spinner from "../Spinner/Spinner";

function AllBooks() {
  const { page } = useParams();

  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["AllBooks", page],
    async () => {
      const data = await request.AllBooks(page);
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
    <>
      <div className="all_books">
        <div className="all_books-title"></div>
        <div className="all_books-grid-container">
          {data.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="all_books-button">
          {page != 0 && (
            <Link to={`/books/${Number(page) - 1}`}>Précédent</Link>
          )}

          <Link to={`/books/${Number(page) + 1}`}>Suivant</Link>
        </div>
      </div>
    </>
  );
}

export default AllBooks;
