import React, { useContext } from "react";
import "./Header.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { StoreContext } from "../../context/StoreContext";

const Header = () => {
  const { food_list, addToCart, cartItems } = useContext(StoreContext);

  return (
    <div className="header">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
        spaceBetween={0}
        slidesPerView={1}
      >
        {food_list.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="header-slide">
              <img
                src={item.image ? item.image : "/images/default.jpg"}
                alt={item.name}
                className="header-image"
              />
              <div className="header-slide-overlay">
                <h3>{item.name}</h3>
                <p>${Number(item.price).toFixed(2)}</p>
                {!cartItems?.[item._id] ? (
                  <button onClick={() => addToCart(item._id)}>Add to Cart</button>
                ) : (
                  <div className="header-slide-counter">
                    <button onClick={() => addToCart(item._id)}>+</button>
                    <p>{cartItems[item._id]}</p>
                    <button onClick={() => addToCart(item._id, -1)}>-</button>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="header-contents">
        <h2>Order your favourite food here</h2>
        <p>
          Welcome to our food ordering platform! Browse our diverse menu, from
          tantalizing appetizers to mouthwatering entrees. Order your favorites
          with ease and convenience. Enjoy delicious meals delivered right to
          your doorstep!
        </p>
        <button>View Menu</button>
      </div>
    </div>
  );
};

export default Header;





