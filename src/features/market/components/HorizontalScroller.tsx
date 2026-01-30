// import { ChevronsLeft, ChevronsRight } from "lucide-react";
// import { useRef } from "react";

// export default function HorizontalScroller({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const ref = useRef<HTMLDivElement>(null);

//   const scroll = (dir: "left" | "right") => {
//     if (!ref.current) return;
//     ref.current.scrollBy({
//       left: dir === "left" ? -300 : 300,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <div className="relative w-full">
//       {/* LEFT ARROW */}
//       <button
//         onClick={() => scroll("left")}
//         className="
//           absolute left-1 top-1/2 -translate-y-1/2
//           z-20
//           bg-white/90 backdrop-blur
//           shadow-md
//           rounded-full
//           p-2
//           md:p-2
//         "
//       >
//         <ChevronsLeft size={18} />
//       </button>

//       {/* SCROLL AREA */}
//       <div
//         ref={ref}
//         className="
//           flex gap-4
//           overflow-x-auto
//           scrollbar-hide
//           px-10
//           scroll-smooth
//         "
//       >
//         {children}
//       </div>

//       {/* RIGHT ARROW */}
//       <button
//         onClick={() => scroll("right")}
//         className="
//           absolute right-1 top-1/2 -translate-y-1/2
//           z-20
//           bg-white/90 backdrop-blur
//           shadow-md
//           rounded-full
//           p-2
//           md:p-2
//         "
//       >
//         <ChevronsRight size={18} />
//       </button>
//     </div>
//   );
// }

import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

const HorizontalScroller = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);

  // check overflow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const checkOverflow = () => {
      setShowArrows(el.scrollWidth > el.clientWidth);
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => window.removeEventListener("resize", checkOverflow);
  }, [children]);

  // scroll handler
  const scroll = (dir: "left" | "right") => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* LEFT ARROW */}
      {showArrows && (
        <button
          onClick={() => scroll("left")}
          className="
            absolute left-1 top-1/2 -translate-y-1/2
            z-20
            bg-white/90 backdrop-blur
            shadow-md
            rounded-full
            p-2
          "
        >
          <ChevronsLeft size={18} />
        </button>
      )}

      {/* SCROLL AREA */}
      <div
        ref={ref}
        className="
          flex gap-4
          overflow-x-auto
          scroll-smooth
          no-scrollbar
          px-10
        "
      >
        {children}
      </div>

      {/* RIGHT ARROW */}
      {showArrows && (
        <button
          onClick={() => scroll("right")}
          className="
            absolute right-1 top-1/2 -translate-y-1/2
            z-20
            bg-white/90 backdrop-blur
            shadow-md
            rounded-full
            p-2
          "
        >
          <ChevronsRight size={18} />
        </button>
      )}
    </div>
  );
};

export default HorizontalScroller;
