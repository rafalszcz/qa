export interface IPekaoQaPagerProps {
    currentPageNo: number;
    pageLength: number;
    itemsCount: number
    setCurrentPage:(currentPageNo)=>void;
}