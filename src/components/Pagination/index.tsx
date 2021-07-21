import React from 'react';
import './index.css';
import {PaginationItem} from "./PaginationItem";

interface Props {
    count: number | null;
    onSelectPage: (pageId: number) => void;
}
export const Pagination = (props: Props) => {
    const {count, onSelectPage} = props;
    const totalPages = count ? Math.ceil(count / 3) : 0;

    return (count
        ? <div className="pagination">
            {Array.from({length: totalPages}).map((_, index) => {
                const pageNumber = index + 1;

                return <PaginationItem key={index} pageNumber={pageNumber} onSelectPageNumber={onSelectPage}/>
            })}
        </div>
        : null)
}