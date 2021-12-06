import {I_Product} from '../../../core/types/models';

export const product_selectTitle     = (product: I_Product) => [product.primaryTitle, product.secondaryTitle];
export const product_selectBasePrice = (product: I_Product) => product.basePrice ?? '$ xx.xx';
export const product_selectLb        = (product: I_Product) => Math.round(100 * product.weight) / 100;

export const product_selectBasePriceNumber_mut       =
                 (product: I_Product & any & { basePriceNumber?: number }) => {
                     if (product.basePriceNumber != null) {
                         return product.basePriceNumber;
                     }

                     return product.basePriceNumber = Math.round(100 * +product_selectBasePrice(product).replace((/[$,]/g), '')) / 100;
                 };
export const product_selectPricePerPoundPerYear_mut  =
                 (product: I_Product & any & { annualWeightPrice?: number }) => {
                     if (product.annualWeightPrice != null) {
                         return product.annualWeightPrice;
                     }
                     const lb    = product_selectLb(product);
                     const price = +product_selectBasePrice(product).replace((/[$,]/g), '') || 1;
                     return product.annualWeightPrice = Math.round(100 * price / lb) / 100;
                 };
export const product_selectPricePerPoundPerMonth_mut = (product: I_Product & any & { monthlyWeightPrice?: number }) => {
    if (product.monthlyWeightPrice != null) {
        return product.monthlyWeightPrice;
    }
    const lbPricePerYear = product_selectPricePerPoundPerYear_mut(product);
    return product.monthlyWeightPrice = Math.round(100 * lbPricePerYear / 12) / 100;
}
