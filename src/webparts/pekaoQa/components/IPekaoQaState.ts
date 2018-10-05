import { IPekaoQaItem } from './IPekaoQaItem'
export interface IPekaoQaState {
    isLoading: boolean;
    items: IPekaoQaItem[];
    listItems: IPekaoQaItem[];
    currentPageNo:number

}