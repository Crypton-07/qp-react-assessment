import React from "react";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { ITEMS_PER__PAGE } from "../TodoService";
interface PropTypes {
  page: number;
  totalItemCount: number;
  handlePagination: (arg: number) => void;
}

const Pagination: React.FC<PropTypes> = ({
  page,
  totalItemCount,
  handlePagination,
}) => {
  const totalPages = Math.ceil(totalItemCount / ITEMS_PER__PAGE);
  return (
    <div className="w-full flex items-center justify-between border-t border-gray-900 bg-white px-0 py-3 sm:px-6">
      <div className="flex flex-1 justify-between items-center">
        <div
          title="prev"
          role="button"
          onClick={() => handlePagination(page > 1 ? page - 1 : page)}
          className="relative inline-flex items-center rounded-md border border-gray-800 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 cursor-pointer tracking-wide"
        >
          Previous
        </div>
        <>
          <p className="text-sm text-gray-700 mx-1 capitalize">
            Showing
            <span className="font-medium mx-1">
              {(page - 1) * ITEMS_PER__PAGE + 1}
            </span>
            to
            <span className="font-medium mx-1">
              {page * ITEMS_PER__PAGE > totalItemCount
                ? totalItemCount
                : page * ITEMS_PER__PAGE}
            </span>
            of <span className="font-medium mx-1">{totalItemCount}</span>
            results
          </p>
        </>
        <div
          title="next"
          role="button"
          onClick={() => handlePagination(page < totalPages ? page + 1 : page)}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-800 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer tracking-wide"
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default Pagination;
