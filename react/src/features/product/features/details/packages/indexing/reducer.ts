import {HydratedDetail, HydratedRelatedProduct, I_Product_Detail} from '../../../../../../core/types/models';
import {detail_selectPrimaryKey, relatedProduct_selectPrimaryKey} from './selectors';
import {hydrateDetail, hydrateRelatedProduct} from './hydration';

export type I_ProductRecord = {
    relatedProduct: HydratedRelatedProduct,
    detail: HydratedDetail,
};
export type IndexedDetailAggregate = {
    // todo remove this if a person cannot have more than one detail
    details: {
        [k: string]: HydratedDetail
    },
    relatedProducts: {
        [k: string]: I_ProductRecord
    }
};
/**
 * Adds the data about one detail to an aggregate object
 *
 * @param all
 * @param detail
 */
export function detailIndexReducer(all: IndexedDetailAggregate, detail: I_Product_Detail) {
    const detailid = detail_selectPrimaryKey(detail);

    all.details[detailid]                = hydrateDetail(detail);
    const hydratedDetail: HydratedDetail = all.details[detailid];

    Object
        .entries(detail.relatedProducts)
        .forEach(([name, relatedProduct]) => {
            const relatedProductid = relatedProduct_selectPrimaryKey(relatedProduct);
            const namedetailid     = `${relatedProductid}--${detailid}`;

            const hydratedRelatedProduct: HydratedRelatedProduct = Object.assign({}, all.relatedProducts[namedetailid] ?? {}, hydrateRelatedProduct(relatedProduct, name));

            if (hydratedRelatedProduct.tags.has('PRIMARY')) hydratedDetail.primaryRelatedProduct = namedetailid;
            if (hydratedRelatedProduct.tags.has('SECONDARY')) hydratedDetail.secondaryRelatedProduct = namedetailid;

            all.relatedProducts[namedetailid] =
                {
                    relatedProduct: hydratedRelatedProduct,
                    detail:         hydratedDetail,
                };

            hydratedDetail.relatedProducts.push(namedetailid);
        })

    return all
}