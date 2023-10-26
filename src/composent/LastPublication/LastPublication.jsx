import "./style.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { useQuery } from "react-query";
import request from "../../request/query/request";
import 'swiper/css';
import 'swiper/css/pagination';

import BookCard from '../BookCard/BookCard'

function LastPublication() {

  const { isLoading, error, data, isPreviousData, refetch } = useQuery(
    ["LastPublication"],
    async () => {
      const data = await request.LastPublication()
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
    <div className="latest-arrival">
      <div className="latest-arrival-title">
      Publications récentes
      </div>
       
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          400:{
            slidesPerView:2,
          },
          639: {
            slidesPerView: 3,
          },
          865:{
            slidesPerView:4
          },
          1000:{
            slidesPerView:6
          },
          1500:{
            slidesPerView:8
          },
          1700:{
            slidesPerView:8
          }
        }}
        spaceBetween={30}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={true}
 
        
        modules={[Navigation, Autoplay, Pagination, Navigation]}
        className="swiper"
      >{data.map((book)=>(
        <SwiperSlide><BookCard book={book}/></SwiperSlide>
      ))}

      </Swiper>
    
    </div>
  );
}

export default LastPublication;


