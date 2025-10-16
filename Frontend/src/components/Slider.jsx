import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { slider_images } from "../../assets/assets"; // import your images
import "./Slice.css";

const Slice = () => {
  return (
    <div className="slice-container">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {slider_images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="slide-wrapper">
              <img src={img} alt={`slide-${index}`} className="slide-image" />
              {/* Optional overlay text */}
              <div className="slide-content">
                <h2>Delicious Food Awaits</h2>
                <p>Order your favourite meals and enjoy at home!</p>
                <button>View Menu</button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slice;

