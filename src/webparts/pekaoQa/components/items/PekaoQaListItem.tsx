import * as React from 'react'
import { IPekaoQaListItemProps } from './IPekaoQaListItemProps'
import { IPekaoQaListItemState } from './IPekaoQaListItemState'
import { escape } from '@microsoft/sp-lodash-subset';
import styles from '../PekaoQa.module.scss';

export default class PekaoQaListItem extends React.Component<IPekaoQaListItemProps, IPekaoQaListItemState> {
    constructor(props: IPekaoQaListItemProps, state: IPekaoQaListItemState) {
        super(props);
        this.state = {
            isOpen: false
        }
    }
    public openItem = (id) => {
        this.props.openItem(id);
    }
    public render(): React.ReactElement<IPekaoQaListItemProps> {

        return (
            <div className="qa-item">
                <div className="qa-question"><a href="javascript:void(0)" onClick={() => this.openItem(this.props.item.id)}><div dangerouslySetInnerHTML={{ __html: this.props.item.question }}></div></a></div>
                {this.props.item.isOpen &&
                    <div className="qa-answer"><div dangerouslySetInnerHTML={{ __html: this.props.item.answer }} /></div>
                }
            </div>
        );
    }
}
