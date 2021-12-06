import {I_ProductRecord} from '../../../../../packages/indexing/reducer';
import {Indexer} from '../../../../../../../../../util/types/indexers';
import {useCallback} from 'react';
import '../../../styles/productRecord.scss';
import {record_selectDetailStatus} from '../../../../../data/records/selectors';
import ProductRecordInfoRenderer from './switch';

/**
 * Renders a record with products arranged by an "Indexer"
 * @param record
 * @param indexers
 * @constructor
 */
export function ProductRecordInfo({record, indexers}: { record: I_ProductRecord, indexers: Indexer[] }) {
    const mapper = useCallback(([{className, attrName}, selector]: Indexer) => (
        <div className={className} key={className}>
            <ProductRecordInfoRenderer attr={attrName}>{selector(record)}</ProductRecordInfoRenderer>
        </div>
    ), [record]);

    const elements        = indexers.map(mapper);
    const status          = record_selectDetailStatus(record);
    const statusClassName = `status--${status?.toLowerCase()}`;
    return <div className={`detailInfo byProductRecord ${statusClassName}`}>{elements}</div>;
}