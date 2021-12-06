import {Indexer} from '../../../../../../../../../util/types/indexers';
import classNames from 'classnames';
import classes from '../styles/recordHeading.module.scss';

/**
 * Represents the concept of whichever indexer is referenced
 * @param head
 * @constructor
 */
export function Heading({head}: { head: Indexer[0] }) {
    const className = classNames(
        [
            head.className,
            classes.recordInfoColumnHead,
        ],
    );
    return (
        <div key={head.className} className={className}>
            <span className="title">{head.title}</span>
            <span className="subtitle">{head.subtitle}</span>
        </div>
    );
}