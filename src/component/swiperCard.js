import React from 'react';
import { Swiper } from 'swiper/react';
import { Mousewheel, EffectCards, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import './swiperCard.css';

// Reusable react componet to perform swiping operation on cards
const SwiperCard = ({children, ...props}) => {

  return (
    <div className="swiper-container">
      <Swiper
        rewind={true}
        navigation={true}
        mousewheel={true}
        cardsEffect={{
          rotate: 0,
        }}
        modules={[Navigation, Mousewheel, EffectCards]}
        effect={'cards'}
        {...props}
      >
        {children}
      </Swiper>
    </div>
  );
};

export default SwiperCard;