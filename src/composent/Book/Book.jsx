import "./style.scss";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { Link } from "react-router-dom";
import he from "he";
import { instance } from "../../request/axios";
import Spinner from "../Spinner/Spinner";

function Book({addCart}) {
  const { id } = useParams();

  const url = instance.defaults.baseURL;

  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["book", id],
    async () => {
      const data = await request.bookById(id);
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




const cartHandell = ()=>{
  addCart(data)
}

  return (
    <div className="book">
      <div
        onClick={() => {
          window.history.back();
        }}
        className="book-return"
      >
        <img
          src="https://api.iconify.design/ic:sharp-arrow-back-ios.svg"
          alt=""
          className="src"
        />
        <p>Retour</p>
      </div>

      <div className="book-col">
        <div className="book-col-img">
          <img
            src={`${url}/books/${data.thumbnail}.jpg`}
            alt=""
          />
        </div>

        <div className="book-col-info">
          <div className="book-col-info-title">{data.title}</div>
          <div className="book-col-info-author">
            <Link to={`/search?q=${data.name}`}>
              {data.name}
            </Link>
          </div>
          {data.description && (
            <div className="book-col-info-resumer">
              <div className="book-col-info-resumer-title">Résumé</div>
              <p className="book-col-info-resumer-text">{he.decode(data.description)}</p>
            </div>
          )}

          <div className="book-col-info-car">
            <div className="book-col-info-car-title">Caractéristiques</div>
            <table className="book-col-info-car-table">
              <tbody>
                {data.editor && (
                  <tr>
                    <td>Editeur</td>
                    <td>{data.editor}</td>
                  </tr>
                )}
                {data.format && (
                  <tr>
                    <td>format</td>
                    <td>{data.format}</td>
                  </tr>
                )}
                {data.Pages && (
                  <tr>
                    <td>Pages</td>
                    <td>{data.Pages}</td>
                  </tr>
                )}
                {data.isbn && (
                  <tr>
                    <td>isbn</td>
                    <td>{data.isbn}</td>
                  </tr>
                )}
                {data.published_date && (
                  <tr>
                    <td>Date</td>
                    <td>{data.published_date}</td>
                  </tr>
                )}

                <tr>
                  <td>N°</td>
                  <td>
                    {data.library.map((book) => (
                      <p key={book.id}>
                       
                        #{book.id}RC{book.box}
                      </p>
                    ))}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="book-col-price">
          <div className="book-col-price-pricecard">
            <div className="book-col-price-pricecard-price">{data.price}€</div>
            <div className="book-col-price-pricecard-stock">Stock: {data.stock}</div>
            <div onClick={cartHandell} className="book-col-price-pricecard-achat">
              Ajouter au panier
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
