import * as React from 'react';
import { IPekaoQaPagerProps } from './IPekaoQaPagerProps';


export default class PekaoQaPager extends React.Component<IPekaoQaPagerProps, void> {
    public setCurrentPageNo = (pageNo: number) => {

        this.props.setCurrentPage(pageNo);
    }
    public render(): React.ReactElement<IPekaoQaPagerProps> {

        if (this.props.itemsCount > 0 && (this.props.pageLength !== null && this.props.pageLength > 0)) {
            let pageCount = Math.ceil(this.props.itemsCount / this.props.pageLength);
            let pages = [];
            for (let i = 0; i < pageCount; i++) {
                if (this.props.currentPageNo == i) {
                    pages.push(<li className="qa-pager-active">{i + 1}</li >);
                }
                else {
                    pages.push(<li><a href="javascript:void(0)" onClick={() => this.setCurrentPageNo(i)}> {i + 1}</a></li>);
                }
            }
            let prev = [];
            if (this.props.currentPageNo == 0) {
                prev.push(<li>
                    <span aria-hidden="true">&laquo;</span>
                </li>);
            }
            else {
                prev.push(<li>
                    <a href="javascript:void(0)" onClick={() => this.setCurrentPageNo(0)} aria-label="Previous" >
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>);
            }
            let next = [];
            if (this.props.currentPageNo == pageCount - 1) {
                next.push(<li>
                    <span aria-hidden="true">&raquo;</span>
                </li>);
            }
            else {
                next.push(<li>
                    <a href="javascript:void(0)" onClick={() => this.setCurrentPageNo(pageCount - 1)} >
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>);
            }
            return (<div className="qa-pager">
                <ul >
                    {prev}
                    {pages}
                    {next}

                </ul>

            </div>);
        }
        else {
            return (<div></div>);
        }

    }
}