import { useState, useEffect } from "react";

function useWindowWidth() {
  const [windowWidth, setWindwoWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindwoWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

export default useWindowWidth;
