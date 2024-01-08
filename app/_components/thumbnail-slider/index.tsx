import React, { useRef, useEffect } from 'react';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import { Options } from '@splidejs/splide';
import "@splidejs/react-splide/css";
import "./index.scss";

const ThumbnailsExample = ({photos, startIndex} : {photos: any, startIndex: number}) => {
  const mainRef = useRef<any>(null);
  const thumbsRef = useRef<any>(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  const renderSlides = () => {
    return photos.map((photo: any) => (
      <SplideSlide key={photo.id}>
        <img src={photo.baseUrl} alt={photo.filename} />
      </SplideSlide>
    ));
  };

  const mainOptions: Options = {
    type: 'slide',
    focus: 'center',
    gap: '10px',
    width: '90%',
    height: '100%',
    perMove: 1,
    perPage: 4,
    start: startIndex,
    pagination: false,
    isNavigation: true,
    trimSpace: false
  };
  
  const thumbsOptions: Options = {
    type: 'slide',
    focus: 'center',
    gap: '1rem',
    width: '75%',
    fixedWidth: 100,
    fixedHeight: 100,
    start: startIndex,
    cover: true,
    rewind: false,
    pagination: false,
    isNavigation: true,
  };

  return (
    <div className="flex flex-col justify-items-center items-center gap-2">
      <Splide
        options={mainOptions}
        ref={mainRef}
        aria-labelledby="Main slider"
      >
        {renderSlides()}
      </Splide>

      <Splide
        options={thumbsOptions}
        ref={thumbsRef}
        aria-label="Thumbnail slider"
      >
        {renderSlides()}
      </Splide>
    </div>
  );
};

export default ThumbnailsExample;
