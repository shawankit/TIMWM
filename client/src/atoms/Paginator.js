import { useEffect, useRef, useState } from "react";

const Paginator = ({ pages, pageLimit, handleSkipChange }) => {
  const didMount = useRef(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (didMount.current) {
      handleSkipChange(currentPage - 1);
    }
    didMount.current = true;
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pages]);

  const goToNextPage = () => {
    setCurrentPage((page) => page + 1);
  };

  const goToPreviousPage = () => {
    setCurrentPage((page) => page - 1);
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    const arr = [];
    for (let idx = start; idx < start + pageLimit; idx += 1) {
      if (idx + 1 > pages) {
        break;
      }
      arr.push(idx + 1);
    }
    return arr;
  };

  return (
    <div className="flex justify-center items-center gap-2">
      {/* previous button */}
      <button
        onClick={goToPreviousPage}
        className={` text-Gray-500 border border-Gray-200 cursor-pointer rounded-l
                ${currentPage === 1 ? "pointer-events-none " : ""}`}
      >
        <div className="flex justify-center items-center w-10 h-10">
          <img src="/images/Lessthan.svg" />
          <img src="/images/Lessthan.svg" />
        </div>
      </button>
      <button
        onClick={goToPreviousPage}
        className={` text-Gray-500 border border-Gray-200 cursor-pointer rounded-l
                ${currentPage === 1 ? "pointer-events-none " : ""}`}
      >
        <div className="flex justify-center items-center w-10 h-10">
          <img src="/images/Lessthan.svg" />
        </div>
      </button>

      {/* show page numbers */}
      {getPaginationGroup().map((item, index) => (
        <button
          key={index}
          onClick={changePage}
          className={` border p-2 w-10 border-Gray-200
                    ${
                      currentPage === item
                        ? "pointer-events-none bg-primary-500 text-white"
                        : "text-Gray-500"
                    }`}
        >
          <span>{item}</span>
        </button>
      ))}

      {/* next button */}
      <button
        onClick={goToNextPage}
        className={` text-Gray-500 border border-Gray-200 cursor-pointer rounded-r
                ${currentPage === pages ? "pointer-events-none " : ""}`}
      >
        <div className="flex justify-center items-center w-10 h-10 ">
          <img src="/images/greater-than.svg" />
        </div>
      </button>
      <button
        onClick={goToNextPage}
        className={` text-Gray-500 border cursor-pointer border-Gray-200 rounded-r
                ${currentPage === pages ? "pointer-events-none " : ""}`}
      >
        <div className="flex justify-center items-center w-10 h-10 ">
          <img src="/images/greater-than.svg" />
          <img src="/images/greater-than.svg" />
        </div>
      </button>
    </div>
  );
};

export default Paginator;
