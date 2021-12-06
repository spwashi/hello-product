import {RelatedProduct, HydratedRelatedProduct, HydratedDetail, I_Product_Detail} from '../../../../../../core/types/models';

/**
 * Given a RelatedProduct object that has only been deserialized,
 *  return a new object with runtime-specific products
 *
 * @param relatedProduct
 * @param name
 */
export function hydrateRelatedProduct(relatedProduct: RelatedProduct, name: string): HydratedRelatedProduct {
    return Object.assign(
        {},
        relatedProduct,
        {
            name,
            tags: new Set(relatedProduct.tags),
        },
    );
}

/**
 * Given a Detail object that has only been deserialized,
 *  return an object with runtime-specific products
 *
 * @param detail
 */
export function hydrateDetail(detail: I_Product_Detail): HydratedDetail {
    return Object.assign({}, detail, {relatedProducts: [] as string[]});
}