import s from "../../ui/Todolists/Todolist/Tasks/TasksPagination/TasksPagination.module.css";
import { Button } from "common/components/Button/Button";
import { getPages } from "../utils/getPages";
import { useState } from "react";

export type PaginationPropsType = {
  totalCount: number
  page?: number
  onChange: (page: number) => void
}
export const usePagination = ({ totalCount, page = 4, onChange }: PaginationPropsType) => {
  const [currentPage, setCurrentPage] = useState(1);

  const pages = getPages(Math.ceil(totalCount / page));

  const paginationContainer = <div className={s.paginationContainer}>
    {pages.map((item, i) => {
      const isFirst = item === 1;
      const isLast = item === pages[pages.length - 1];
      const isNear = Math.abs(item - currentPage) <= 2;
      if (isFirst || isLast || isNear) {
        return (
          <Button key={i} onClick={() => {
            onChange(item);
            setCurrentPage(item);
          }} className={`${s.page} ${currentPage === item ? s.active : ""}`}>{item}</Button>
        );
      }
      if (
        (item === currentPage - 3 || item === currentPage + 3) &&
        Math.abs(item - currentPage) > 2
      ) {
        return <span key={i} className={s.dots}>...</span>;
      }
      return null;
    })
    }
  </div>;
  return { paginationContainer };
};
