import {I_ProductRecord, IndexedDetailAggregate} from '../packages/indexing/reducer';
import {useCallback} from 'react';
import {record_selectCreationDate, record_selectDateUpdated, record_selectDetailStatus, record_selectName, record_selectPrimaryRelatedProduct} from '../data/records/selectors';
import {Indexer} from '../../../../../util/types/indexers';
import {useIsMobile} from '../../../../../util/hooks/useWindowWidth';

/**
 * Returns an array of Indexers, which can select information about a record
 *
 * @param indexedDetailInfo
 */
export function useProductRecordIndexers(indexedDetailInfo: IndexedDetailAggregate | undefined) {
    const isMobile                     = useIsMobile();
    const _selectPrimaryRelatedProduct =
              useCallback((record: I_ProductRecord) => record_selectPrimaryRelatedProduct(record, indexedDetailInfo),
                          [indexedDetailInfo]);

    const record_nameIndexer: Indexer =
              [
                  {title: 'Product', className: 'record', attrName: 'record'},
                  record_selectName,
              ];

    const record_creationDateIndexer: Indexer =
              [
                  {title: 'Creation Date', subtitle: 'yy-MM-DD', className: 'creationDate', attrName: 'creationDate'},
                  record_selectCreationDate,
              ];

    const record_dateUpdatedIndexer: Indexer =
              [
                  {title: 'Last Update Date', subtitle: 'yy-MM-DD', className: 'dateUpdated', attrName: 'dateUpdated'},
                  record_selectDateUpdated,
              ];

    const record_detailStatusIndexer: Indexer =
              [
                  {title: 'Status', className: 'status', attrName: 'status'},
                  record_selectDetailStatus,
              ];

    const record_primaryRelatedProductIndexer: Indexer =
              [
                  {title:        'Most Similar Product',
                      className: 'primaryRelatedProduct',
                      attrName:  'primaryRelatedProduct',
                  },
                  _selectPrimaryRelatedProduct,
              ];

    return [
        record_nameIndexer,
        record_creationDateIndexer,
        record_dateUpdatedIndexer,
        !isMobile && record_detailStatusIndexer,
        record_primaryRelatedProductIndexer,
    ].filter(Boolean) as Indexer[];
}