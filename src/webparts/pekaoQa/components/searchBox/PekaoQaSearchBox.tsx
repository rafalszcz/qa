import * as React from 'react';
import { IPekaoQaSearchBoxProps } from './IPekaoQaSearchBoxProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';


export default class PekaoQaSearchBox extends React.Component<IPekaoQaSearchBoxProps, void> {
    private onSearchTextChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.props.clickFunction(event.currentTarget.value);
    }
    private onSearchTextChange2 = (filter) => {
        console.log(filter);
        this.props.clickFunction(filter);
    }
    public render(): React.ReactElement<IPekaoQaSearchBoxProps> {
        //console.log(this.props);
        return (<div className="qa-searchbox">
            {/* <input type="text" className="form-control" placeholder="Szukaj" onChange={this.onSearchTextChange}></input> */}
            <SearchBox
                onChange={this.onSearchTextChange2}
              />

        </div>);

    }
}