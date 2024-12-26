import { useEffect, useState } from "react";

export const useResizeHandler = (breakpoints:any) => {
  const [value, setValue] = useState(
    typeof window !== "undefined" && window.innerWidth < breakpoints.mobile
      ? breakpoints.mobileValue
      : breakpoints.defaultValue
  );

  useEffect(() => {
    const handleResize = () => {
      setValue(
        window.innerWidth < breakpoints.mobile
          ? breakpoints.mobileValue
          : breakpoints.defaultValue
      );
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoints]);

  return value;
};
