"use client";
import React, { useState, ReactNode } from "react";

interface ModelLoaderMiddlewareProps {
  children: ReactNode;
  onLoad?: () => void;
}

const ModelLoad: React.FC<ModelLoaderMiddlewareProps> = ({ children, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <>
      {React.Children.map(children, (child) =>
        React.cloneElement(child as React.ReactElement, {
          onLoad: handleLoad,
        })
      )}
      {isLoaded && <>{children}</>}
    </>
  );
};

export default ModelLoad;
