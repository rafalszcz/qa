import * as React from 'react';
import styles from './PekaoQa.module.scss';
import { IPekaoQaProps } from './IPekaoQaProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IPekaoQaState } from './IPekaoQaState';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { IPekaoQaItem } from './IPekaoQaItem';
import { DisplayMode } from '@microsoft/sp-core-library';
import PekaoQaSearchBox from './searchBox/PekaoQaSearchBox';
import PekaoQaItemsList from './items/PekaoQaItemsList';
import PekaoQaPager from './items/PekaoQaPager';
import { ICellValue } from './ICellValue';
export default class PekaoQa extends React.Component<IPekaoQaProps, IPekaoQaState> {
  constructor(props: IPekaoQaProps, state: IPekaoQaState) {
    super(props);
    this.state = {
      isLoading: false,
      listItems: [],
      currentPageNo: 1,
      items: []
    };
  }
  componentDidMount() {
    this.loadItems();
  }
  private hasCategory = (): boolean => {
    if (this.props.categoryField !== undefined
      && this.props.categoryField != '') {
      return true;
    }
    return false;
  }
  private loadItemsFromWeb(): void {
    if (!this.stringEmpty(this.props.listName)) {

      let orderBy = '';
      let filterActive = '';



      if (this.props.orderField !== undefined
        && this.props.orderField != '') {
        orderBy = `&$orderby=${this.props.orderField}`;
      }


      if (this.props.activeField !== undefined
        && this.props.activeField != '') {
        filterActive = `&$filter=${this.props.activeField} eq 1`;

      }
      let restApiURL = this.props.siteUrl + `/_api/Web/Lists/getbytitle('${this.props.listName}')/items?$select=ID,${this.props.questionField},${this.props.answerField}${(this.hasCategory() ? ',' + this.props.categoryField : '')}${orderBy}${filterActive}`;
      this.props.spHttpClient.get(restApiURL, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      }).then((response: SPHttpClientResponse) => {
        return response.json();
      }).then((response: { value: any[] }): void => {
        let listItems: IPekaoQaItem[] = [];
        if (response.value !== undefined
          || response.value.length > 0) {
          for (let i = 0; i < response.value.length; i++) {
            let item = response.value[i];
            listItems.push({
              id: item.ID,
              question: item[this.props.questionField],
              answer: item[this.props.answerField],
              isOpen: this.props.itemsExpanded,
              category: this.hasCategory() ? item[this.props.categoryField] : ''
            });
          }
        }

        this.setState({
          listItems: listItems,
          isLoading: false,
          currentPageNo: 0,
          items: listItems
        });
      }, (error: any): void => {
        this.setState({
          items: [],
          listItems: [],
          isLoading: false,
          currentPageNo: 0

        });
      });
    }
  }
  private loadItemsFromSearch(): void {
    if (!this.stringEmpty(this.props.searchQuery)) {

      let orderBy = '';

      let querytext = ``;

      if (this.props.orderField !== undefined
        && this.props.orderField != '') {
        orderBy = `&sortlist='${this.props.orderField}:ascending'`;
      }

      let searchApiURL = this.props.siteUrl + `/_api/search/query?querytext='${this.props.searchQuery}'&selectproperties='ListItemID,${this.props.questionField},${this.props.answerField}${(this.hasCategory() ? ',' + this.props.categoryField : '')}'${orderBy}&rowlimit=${this.props.searchRowLimit}`;
      this.props.spHttpClient.get(searchApiURL, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      }).then((response) => {
        return response.json();
      }).then((response: any): void => {
        let listItems: IPekaoQaItem[] = [];
        if (response.PrimaryQueryResult !== undefined &&
          response.PrimaryQueryResult.RelevantResults !== undefined &&
          response.PrimaryQueryResult.RelevantResults.Table !== undefined &&
          response.PrimaryQueryResult.RelevantResults.Table.Rows !== undefined &&
          response.PrimaryQueryResult.RelevantResults.Table.Rows.length > 0) {
          var results = response.PrimaryQueryResult.RelevantResults.Table.Rows;
          let hasCat = this.hasCategory();
          for (let i = 0; i < results.length; i++) {
            let cells = results[i].Cells;

            let id, question, answer, category;


            cells.forEach((cell: ICellValue) => {
              if (cell.Key == 'ListItemID') {
                id = cell.Value;
              }
              if (cell.Key == this.props.questionField) {
                question = cell.Value;
              }
              if (cell.Key == this.props.answerField) {
                answer = cell.Value;
              }
              if (hasCat) {
                if (cell.Key == this.props.categoryField) {
                  category = cell.Value;
                }
              }
            });
            if (id !== undefined && id !== null) {
              listItems.push({
                id: id,
                question: question,
                answer: answer,
                isOpen: this.props.itemsExpanded,
                category: this.hasCategory() ? category : ''
              });
            }
          }


          this.setState({
            listItems: listItems,
            isLoading: false,
            currentPageNo: 0,
            items: listItems
          });
        }
      }, (error: any): void => {
        this.setState({
          items: [],
          listItems: [],
          isLoading: false,
          currentPageNo: 0

        });
      });
    }
  }
  private loadItems(): void {
    //currentWeb
    if (this.props.contentSourceType == 0) {
      this.loadItemsFromWeb();
    }
    else {
      this.loadItemsFromSearch();
    }
    // if (this.props.displayMode == DisplayMode.Read) {
    //   //  alert('Read');
    // }

  }
  public filterResults = (filter: string): void => {

    if (filter === undefined ||
      filter === null ||
      filter === "") {

      let listItems: IPekaoQaItem[] = [...this.state.listItems];
      this.setState({ ...this.state, items: listItems, currentPageNo: 0 });
    }
    else {
      let listItems = [...this.state.listItems];
      listItems = listItems.filter((item) => {
        return item.question.toLowerCase().search(filter.toLowerCase()) !== -1 ||
          item.answer.toLowerCase().search(filter.toLowerCase()) !== -1;
      });
      this.setState({ ...this.state, items: listItems, currentPageNo: 0 });
      console.log(this.state.items);
    }
  }


  private stringEmpty(test: string): boolean {
    return test === undefined ||
      test === null ||
      test.length === 0;
  }
  private getCategories = (): string[] => {
    let categories: string[] = [];
    for (let i = 0; i < this.state.items.length; i++) {
      let item = this.state.items[i];
      if (categories.indexOf(item.category) === -1) {
        categories.push(item.category);
      }

    }
    categories.sort((a, b) => {
      if (a > b) {
        return 1;
      }
      if (b > a) {
        return -1;
      }
      return 0;
    })
    return categories;
  }
  public render(): React.ReactElement<IPekaoQaProps> {
    let qaContainer = [];
    let style = `<style>
    button.ms-Toggle-background
{
min-width: auto !important;
}
    </style>`;
    if (this.hasCategory) {
      this.getCategories().forEach(element => {
        let categoryItems = [...this.state.items];
        categoryItems = categoryItems.filter((item) => { return item.category == element });
        qaContainer.push(
          <div className="qa-category">
            <div className="qa-category-title">{element}</div>
            <PekaoQaItemsList items={categoryItems} isLoading={this.state.isLoading}
              pageLength={this.props.pageLength}
              showPager={this.props.showPager} toggleCloseRemining={this.props.toggleCloseRemining} />
          </div>

        )
      });
    }
    else {
      qaContainer.push(
        <div className="qa-category">
          <PekaoQaItemsList items={this.state.items} isLoading={this.state.isLoading}
            pageLength={this.props.pageLength}
            showPager={this.props.showPager} toggleCloseRemining={this.props.toggleCloseRemining} />
        </div>);
    }
    return (
      <div>
        <div dangerouslySetInnerHTML={{ __html: style }}></div>
        <div dangerouslySetInnerHTML={{ __html: `<style>${this.props.cssStyles}</style>` }}></div>
        <div className="qa-container">
          {this.props.showSearchBox &&
            <PekaoQaSearchBox clickFunction={this.filterResults} />}
          {qaContainer}
        </div>
      </div >
    );

  }


}
