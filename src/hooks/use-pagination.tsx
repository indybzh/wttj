import { useState, useEffect } from "react";

const usePagination = (
  items: Array<any>,
  perPage: number = 10
): [
  number,
  number,
  number,
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [beginIndex, setBeginIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(10);

  useEffect(() => {
    if (items.length > perPage) {
      setCurrentPage(1);
      setPageCount(Math.ceil(items.length / perPage));
    } else {
      setCurrentPage(1);
      setPageCount(0);
    }
  }, [items, perPage]);

  useEffect(() => {
    setBeginIndex((currentPage - 1) * perPage);
    setEndIndex(currentPage * 10);
  }, [currentPage, perPage]);

  return [currentPage, pageCount, beginIndex, endIndex, setCurrentPage];
};

export default usePagination;
