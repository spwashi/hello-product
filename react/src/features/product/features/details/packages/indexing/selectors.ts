import {RelatedProduct, I_Product_Detail} from '../../../../../../core/types/models';

export const relatedProduct_selectPrimaryKey = (relatedProduct: RelatedProduct) => relatedProduct.id;
export const detail_selectPrimaryKey   = (detail: I_Product_Detail) => detail.id;