import "./style.css";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import request from "../../request/query/request";
import { Link } from "react-router-dom";
import he from 'he';
import { instance } from "../../request/axios";


function Book() {
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

  if (isLoading) return <>Loading</>;

  if (error) return "An error has occurred: " + error.message;

  console.log(data);

  let price = null;
  if (data.price < 5) {
    price = 1;
  }
  if (data.price >= 5 && data.price < 8) {
    price = 2;
  }
  if (data.price >= 8) {
    price = "";
  }

  //let history = useHistory();

  const handleGoBack = () => {
    console.log("back");
    window.history.back();
  };

  const cartHandell = ()=>{
     // Récupérez le panier depuis Local Storage (s'il existe)
  const panier = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Ajoutez le produit au panier
  panier.push(data);
  
  // Mettez à jour Local Storage avec le nouveau panier
  localStorage.setItem('cart', JSON.stringify(panier));
  }



  return (
    <div className="book">
      <div onClick={handleGoBack} className="book-return">
        <img
          src="https://api.iconify.design/ic:sharp-arrow-back-ios.svg"
          alt=""
          className="src"
        />
        <p>Retour</p>
      </div>
      <div className="book-grid">
        <div className="book-col-img">
          <img
            className="book-img"
            src={`${url}/books/${data.thumbnail}.jpg`}
            alt=""
          />
        </div>
        <div className="book-col-info">
          <div className="book-title">{data.title}</div>
          <div className="book-author">
            <Link to={`/search?type=author&search=${data.name}`}>
              {data.name}
            </Link>
          </div>
          {data.description && (
            <div className="book-resumer">
              <div className="book-resumer-title">Résumé</div>
              <p className="book-resumer-text">{he.decode(data.description)}</p>
            </div>
          )}

          <div className="book-info">
            <div className="book-resumer-title">Caractéristiques</div>
            <table class="table">
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
              </tbody>
            </table>
          </div>
        </div>
        <div className="book-col-price">
          <div className="book-pricecard">
            <div className="book-pricecard-price">{price}€</div>
            <div className="book-pricecard-stock">Stock: {data.stock}</div>
            <div onClick={cartHandell} className="book-pricecard-achat">Ajouter au panier</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
