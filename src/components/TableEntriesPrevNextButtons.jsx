import { MAX_ROWS_PER_PAGE } from "../assets/data/constants";
import leftCaret from "../assets/icons/leftCaret.svg";
import rightCaret from "../assets/icons/rightCaret.svg";

const TableEntriesPrevNextButtons = ({
  startingIndex,
  setStartingIndex,
  filteredDataLength,
}) => {
  const handlePrevNext = (type) => {
    if (type === "prev") {
      setStartingIndex((prev) => Math.max(0, prev - MAX_ROWS_PER_PAGE));
    } else {
      setStartingIndex((prev) =>
        Math.min(prev + MAX_ROWS_PER_PAGE, filteredDataLength)
      );
    }
  };

  return (
    <div className="flex items-center justify-end   gap-3 mt-3">
      <p className="font-lato font-semibold text-grey opacity-60 text-[14px]">
        Showing {startingIndex + 1} to{" "}
        {Math.min(startingIndex + MAX_ROWS_PER_PAGE, filteredDataLength)} of{" "}
        {filteredDataLength}
      </p>
      <div className="border-borderColor  join ">
        <button
          disabled={startingIndex === 0}
          className="border-[0.6px] rounded-l-lg  p-2  px-3 bg-smoke opacity-90 disabled:opacity-40"
          onClick={() => handlePrevNext("prev")}
        >
          <img src={leftCaret} />
        </button>
        <button
          disabled={startingIndex + MAX_ROWS_PER_PAGE >= filteredDataLength}
          className="border-[0.6px] rounded-r-lg p-2 px-3 bg-smoke opacity-90 disabled:opacity-40"
          onClick={() => handlePrevNext("next")}
        >
          <img src={rightCaret} alt="" />
        </button>
      </div>
    </div>
  );
};
export default TableEntriesPrevNextButtons;
