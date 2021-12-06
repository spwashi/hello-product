import {I_Product} from '../../../../../../../core/types/models';
import '../../../styles/detailInfo.scss';
import {isDetailError, useProductDetailIndex} from '../../../hooks/useProductDetailIndex';
import {ProductRecordInfo} from '../../record/features/body/components/ProductRecordInfo';
import {Heading} from '../../record/features/heading/components/Heading';
import {StatusLegend} from './StatusLegend';
import {useAllPossibleStatusesBasedOnIndexedDetails} from '../../../hooks/useAllPossibleStatusesBasedOnIndexedDetails';
import {useProductRecordIndexers} from '../../../hooks/useProductRecordIndexers';

/**
 * Widget that displays information about a product's details
 *
 * @param product
 * @constructor
 */
export function ProductDetailList({product}: { product: Pick<I_Product, 'id'> & Partial<I_Product> }) {
    const index               = useProductDetailIndex(product);
    const indexHasError       = isDetailError(index);
    const indexers            = useProductRecordIndexers(!indexHasError ? index : undefined);
    const representedStatuses = useAllPossibleStatusesBasedOnIndexedDetails(index);

    if (indexHasError) {
        return <div>
            <pre>{JSON.stringify(index)}</pre>
        </div>
    }

    const headElements = indexers.map(indexer => <Heading
        key={indexer[0].className}
        head={indexer[0]}
    />);

    const bodyElements = Object.values(index.relatedProducts).map(record => <ProductRecordInfo
        key={record.relatedProduct.id}
        record={record}
        indexers={indexers}
    />).filter(Boolean);

    const legendTitle = `legendTitle--product__${product.id}`;

    return (
        <div className="detailInfoList byProductRecord">
            <div className="legendContainer">
                <div className="legend" aria-labelledby={legendTitle}>
                    <StatusLegend statuses={representedStatuses}/>
                </div>
                <div className="title" id={legendTitle}>Legend</div>
            </div>
            <div className="head">{headElements}</div>
            <div className="body">{bodyElements.length ? bodyElements : null}</div>
        </div>
    )
}