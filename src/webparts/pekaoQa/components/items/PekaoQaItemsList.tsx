import * as React from 'react'
import { IPekaoQaItemsListProps } from './IPekaoQaItemsListProps'
import PekaoQaBootstrapListItem from './PekaoQaListItem'
import PekaoQaPager from './PekaoQaPager'
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { IPekaoQaItemsListState } from './IPekaoQaItemsListState'
import { each } from '@microsoft/sp-lodash-subset';
export default class PekaoQaItemsList extends React.Component<IPekaoQaItemsListProps, IPekaoQaItemsListState> {
    /**
     *
     */
    constructor(props: IPekaoQaItemsListProps, state: IPekaoQaItemsListState) {
        super(props);
        this.state = {
            currentPageNo: 0,
            items: []
        }

    }
    componentDidMount()
    {
        this.setState({ ...this.state, items: this.props.items });
    }
    componentWillReceiveProps(nextProps: IPekaoQaItemsListProps) {
        if (nextProps.items !== this.state.items) {
            this.setState({ ...this.state, items: nextProps.items });
        }
    }
    public getItemsCount = (): number => {
        if (this.props.items === undefined ||
            this.props.items.length == 0) {
            return 0;
        }
        else {
            return this.props.items.length;
        }
    }
    public openItem = (id: number): void => {
        let itemsAfterUpdate = [...this.state.items];
        itemsAfterUpdate.forEach(element => {
            if (element.id == id) {
                element.isOpen = !element.isOpen;
            }
            else if(this.props.toggleCloseRemining)
            {
                element.isOpen=false;
            }
        });
        this.setState({ ...this.state, items: itemsAfterUpdate });
    }
    public setCurrentPage = (currentPageNo: number) => {
        this.setState({ ...this.state, currentPageNo: currentPageNo });
    }
    public render(): React.ReactElement<IPekaoQaItemsListProps> {
        const { isLoading } = this.props;
        const { items } = this.state;
        if (!isLoading) {
            if (items.length > 0) {
                let itemsToDisplay = [...items];

                if (this.props.showPager) {
                    itemsToDisplay = itemsToDisplay.splice(this.state.currentPageNo * this.props.pageLength, this.props.pageLength);
                }

                return (<div className="qa-list-container">

                    <div className="qa-list">

                        {itemsToDisplay.map((item) => {
                            return <PekaoQaBootstrapListItem key={item.id} item={item} openItem={this.openItem} />

                        })}
                    </div>
                    {this.props.showPager &&
                        <PekaoQaPager currentPageNo={this.state.currentPageNo} pageLength={this.props.pageLength} itemsCount={this.getItemsCount()}
                            setCurrentPage={this.setCurrentPage} />
                    }
                </div>);
            }
            else {
                return (<div>
                    Zapytanie nie zwróciło wyników
                </div>)
            }

        }
        else {
            return (
                <div>
                    <Spinner size={SpinnerSize.large} label="Wczytywanie..." />
                </div>
            );
        }
    }
}
