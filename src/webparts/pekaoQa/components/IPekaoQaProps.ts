import { SPHttpClient } from '@microsoft/sp-http';
import { DisplayMode } from '@microsoft/sp-core-library';

export interface IPekaoQaProps {
  listName: string;
  categoryField: string;
  orderField: string;
  questionField: string;
  answerField: string;
  activeField: string;
  pageLength: number;
  showSearchBox: boolean;
  showPager: boolean;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  displayMode: DisplayMode;
  itemsExpanded: boolean;
  toggleCloseRemining:boolean;
  contentSourceType:number;
  searchQuery:string;
  searchRowLimit:number;
  cssStyles:string
}
