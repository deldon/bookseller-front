import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import { useQuery } from "react-query";
import request from "../../request/query/request";
import "swiper/css";
import "swiper/css/pagination";

import BookCard from "../BookCard/BookCard";
import Spinner from "../Spinner/Spinner";

function LatestArrival() {
  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["LatestArrival"],
    async () => {
      const data = await request.LatestArrival();
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

  return (
    <div className="latest-arrival">
      <div className="latest-arrival-title">Nouveau sur PressLivre</div>

      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          400: {
            slidesPerView: 2,
          },
          639: {
            slidesPerView: 3,
          },
          865: {
            slidesPerView: 4,
          },
          1000: {
            slidesPerView: 6,
          },
          1500: {
            slidesPerView: 8,
          },
          1700: {
            slidesPerView: 8,
          },
        }}
        spaceBetween={30}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Navigation, Autoplay, Pagination, Navigation]}
        className="swiper"
      >
        {data.map((book) => (
          <SwiperSlide key={book.book_id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default LatestArrival;
