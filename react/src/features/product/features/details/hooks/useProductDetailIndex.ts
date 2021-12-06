import {I_Product, I_Product_Detail} from '../../../../../core/types/models';
import {IndexedDetailAggregate, detailIndexReducer} from '../packages/indexing/reducer';
import {findEndpoint} from '../../../../../core/endpoints';
import {useEndpointData} from '../../../../../core/endpoints/hooks/useEndpointData';
import {useMemo} from 'react';
import {getEmptyDetailAggregator} from '../data/records/selectors';

/**
 * Returns whether a variable is an error we know how to handle
 * @param e
 */
export const isDetailError = (e: any): e is Error => e?.message && e?.stack;

/**
 * Fetches information about a product's details
 *
 * @param product
 */
export function useProductDetailIndex(product: Pick<I_Product, 'id'> & Partial<I_Product>): IndexedDetailAggregate | Error {
    const endpoint         = product ? findEndpoint({route: 'products/:id/details', id: product.id}) : null;
    const rawDetailInfo     = useEndpointData<I_Product_Detail[]>(endpoint);
    const indexedDetailInfo = useMemo(() => rawDetailInfo?.reduce(detailIndexReducer, getEmptyDetailAggregator()), [rawDetailInfo]);

    if (isDetailError(rawDetailInfo) || !rawDetailInfo) {
        const emptyDetailInfo: IndexedDetailAggregate = {
            details:   {},
            relatedProducts: {},
        };
        return rawDetailInfo ?? emptyDetailInfo;
    }

    return indexedDetailInfo as IndexedDetailAggregate;
}