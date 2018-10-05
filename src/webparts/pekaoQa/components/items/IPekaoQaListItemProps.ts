import { IPekaoQaItem } from '../IPekaoQaItem'
export interface IPekaoQaListItemProps {
    item: IPekaoQaItem,
    openItem: (id:number) => void;
}