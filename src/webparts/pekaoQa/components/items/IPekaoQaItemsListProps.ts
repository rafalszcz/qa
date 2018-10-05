import { IPekaoQaItem } from '../IPekaoQaItem'
export interface IPekaoQaItemsListProps {
    items: IPekaoQaItem[];
    listItems?: IPekaoQaItem[];
    isLoading: boolean;
    currentPageNo?: number;
    pageLength:number;
    setCurrentPage?:(currentPageNo)=>void;
    showPager:boolean;
    toggleCloseRemining:boolean
}