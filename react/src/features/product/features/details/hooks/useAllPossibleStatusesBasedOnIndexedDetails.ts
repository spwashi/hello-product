import {IndexedDetailAggregate} from '../packages/indexing/reducer';
import {isDetailError} from './useProductDetailIndex';
import {useMemo} from 'react';

/**
 * Select all of the statuses that are represented by the details in the index
 *
 * @param index
 */
export function useAllPossibleStatusesBasedOnIndexedDetails(index: IndexedDetailAggregate | Error): Set<string> {
    const indexHasError = isDetailError(index);
    const details        = !indexHasError ? index.details : null;
    return useMemo(() => !indexHasError
                         ? new Set(Object.values(details ?? {}).map(detail => detail.status))
                         : new Set(),
                   [details, indexHasError]);
}