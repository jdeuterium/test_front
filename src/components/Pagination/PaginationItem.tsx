import React from 'react';

interface Props {
    pageNumber: number;
    onSelectPageNumber: (pageNumber: number) => void;
}
export const PaginationItem = (props: Props) => {
    const {pageNumber, onSelectPageNumber} = props;
    const onClickPaginationItem = () => onSelectPageNumber(pageNumber);

    return <span className={`pagination_item ${pageNumber}`} onClick={onClickPaginationItem}>{pageNumber}</span>;
};