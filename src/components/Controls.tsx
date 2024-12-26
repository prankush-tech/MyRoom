'use client';
import { Leva } from 'leva';
import React, { useEffect, useState } from 'react';

const Controls = () => {
  const [fill, setFill] = useState(false);

  useEffect(() => {
    const updateFill = () => {
      setFill(window.innerWidth < 640);
    };

    updateFill();

    let resizeTimer: any;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(updateFill, 200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='sm:w-0 sm:h-0 w-full h-[100%] mt-[60vh] sm:mt-0 bg-black -z-0 sm:z-[20] py-4 px-2'>
      <Leva fill={fill} flat={false} titleBar={{drag:false,title:"ROOM EDITOR"}} />
    </div>
  );
};

export default Controls;
