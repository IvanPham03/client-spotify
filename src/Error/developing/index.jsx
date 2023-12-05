import React, { useEffect, useRef } from "react";
import meomeo from "../../utilities/ass/meomeo.jpg";
import { gsap } from "gsap";
import "./style.css"
const index = () => {
  const textRef = useRef(null);

  useEffect(() => {
    const chars = textRef.current.textContent.trim().split("");
    textRef.current.textContent = "";
    chars.forEach((char, index) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.opacity = 0;
      textRef.current.appendChild(span);

      gsap.to(span, {
        opacity: 1,
        duration: 1,
        delay: index * 0.1,
        repeat: -1, // số lần lặp, -1 để lặp vô hạn
        yoyo: true, // lặp lại đi lại (hiển thị và ẩn)
      });
    });
  }, []);

  return (
    <div className="h-full w-full">
      <img src={meomeo} alt="" srcset="" className="h-[400px] w-[400px] rounded-full mt-10 mx-auto contains animate-image"/>
      <p className="text-[60px] text-center mt-6" ref={textRef}> Five men is developing...</p>
    </div>
  );
};

export default index;
