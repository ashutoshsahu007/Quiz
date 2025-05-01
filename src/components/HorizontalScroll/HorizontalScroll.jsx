import React from "react";
import Card from "../Card/Card";

const HorizontalScroll = () => {
  const scrollRef = React.useRef(null);

  const handleWheel = (e) => {
    const container = scrollRef.current;
    if (!container) return;

    const isScrollable = container.scrollWidth > container.clientWidth;
    if (!isScrollable || !container.matches(":hover")) return;

    const atStart = container.scrollLeft === 0;
    const atEnd =
      container.scrollLeft + container.clientWidth >= container.scrollWidth;

    // If scrolling left and not at start, OR scrolling right and not at end
    const scrollingLeft = e.deltaY < 0;
    const scrollingRight = e.deltaY > 0;

    const canScrollHorizontally = (scrollingLeft && !atStart)(
      scrollingRight && !atEnd
    );

    if (canScrollHorizontally) {
      e.preventDefault(); // block vertical scroll
      container.scrollLeft += e.deltaY;
    }
    // else: let vertical page scroll happen
  };

  React.useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);
  return (
    <div className="w-[90%] m-auto overflow-x-hidden ">
      <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-4">
        Computer Quiz
      </h1>
      <div
        ref={scrollRef}
        // onWheel={handleWheel}
        className="flex space-x-5 md:space-x-10 overflow-x-auto hide-scrollbar px-4 py-2"
      >
        {[...Array(5)].map((_, index) => (
          <Card index={index} />
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
