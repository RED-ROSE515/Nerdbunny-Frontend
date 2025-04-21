import React, { useEffect, useState } from 'react';

import Image from 'next/image';
import DarkNerdNuggets from 'public/NerdNuggets-dark.png';
import LightNerdNuggets from 'public/NerdNuggets-light.png';
import DarkNobleblocks from 'public/NOBLEBLOCKS-dark.png';
import LightNobleblocks from 'public/NOBLEBLOCKS-light.png';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { useTheme } from 'next-themes';
// import required modules
import { Autoplay, EffectCoverflow, Mousewheel, Pagination } from 'swiper/modules';

export default function AdPlayer() {
  const { resolvedTheme } = useTheme();
  const [ads, setAds] = useState<any>([]);
  const [isMounted, setIsMounted] = useState(false);
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + '</span>';
    }
  };

  useEffect(() => {
    if (resolvedTheme === 'dark') {
      setAds([
        { image: LightNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: LightNerdNuggets, link: 'https://nerdnuggets.org/' },
        { image: LightNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: LightNerdNuggets, link: 'https://nerdnuggets.org/' },
        { image: LightNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: LightNerdNuggets, link: 'https://nerdnuggets.org/' }
      ]);
    } else {
      setAds([
        { image: DarkNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: DarkNerdNuggets, link: 'https://nerdnuggets.org/' },
        { image: DarkNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: DarkNerdNuggets, link: 'https://nerdnuggets.org/' },
        { image: DarkNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: DarkNerdNuggets, link: 'https://nerdnuggets.org/' }
      ]);
    }
  }, [resolvedTheme]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 60000,
          disableOnInteraction: false
        }}
        mousewheel={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 75,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false
        }}
        pagination={pagination}
        modules={[Autoplay, EffectCoverflow, Pagination, Mousewheel]}
        className='mySwiper'
      >
        {ads.map((ad: any) => {
          return (
            <SwiperSlide className='swiper-slide flex flex-col items-center justify-center'>
              <Image
                priority
                onClick={() => window.open(ad.link, '_blank')}
                alt='NERDBUNNY LOGO'
                className='cursor-pointer rounded-lg'
                src={ad.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
