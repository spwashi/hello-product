import {useCallback, useContext, useMemo} from 'react';
import {ProductContext} from '../../context/context';
import {ActivationContextDispatch, ActivationContextState} from '../../../../context/activation/context';
import {product_selectBasePriceNumber_mut, product_selectLb, product_selectPricePerPoundPerMonth_mut, product_selectPricePerPoundPerYear_mut, product_selectTitle} from '../../data/selectors';
import classnames from 'classnames';

// Create our number formatter.
const moneyFormatter = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'});
const toMoney        = (n: number) => moneyFormatter.format(n);

/**
 * Displays information about a product
 */
export default function Body() {
    const {product}            = useContext(ProductContext)
    const isActive             = useContext(ActivationContextState).activeProduct === product;
    const dispatch             = useContext(ActivationContextDispatch);
    const advanceActivityState = useCallback(() => {
        if (!(product && dispatch)) return;
        dispatch({type: isActive ? 'deactivate' : 'activate', payload: product})
    }, [isActive, dispatch, product]);

    const lbPriceMonth = useMemo(() => !product ? null : toMoney(product_selectPricePerPoundPerMonth_mut(product)),
                                 [product]);
    const lbPriceYear  = useMemo(() => !product ? null : toMoney(product_selectPricePerPoundPerYear_mut(product)),
                                 [product]);

    if (!product) return null;
    const {wasSold}     = product;
    const bodyClassName =
              classnames(
                  'product-body',
                  {
                      wasSold: wasSold,
                      active:  isActive,
                  },
              );
    return (
        <div id={`product--${product.id}--body`} className={bodyClassName}>
            <button onClick={advanceActivityState}>View Product Details</button>
            <div className="head">
                <div className="title">{product.name}</div>
            </div>
            <div className="body">
                <div className="infoGroup title_rent">
                    <div className="title">{
                        product_selectTitle(product)
                            .map(line => <div key={line}>{line}</div>)
                    }</div>
                    <div className="basePrice">{toMoney(product_selectBasePriceNumber_mut(product))}</div>
                </div>
                <div className="infoGroup weightMetrics">
                    <div
                        className="lb"
                        data-unit="lbs."
                    >
                        {product_selectLb(product)}
                    </div>
                    <div
                        className="price-lb-month"
                        data-currency="$"
                        data-unit="/lb/mo"
                    >
                        {lbPriceMonth}
                    </div>
                    <div
                        className="price-lb-year"
                        data-currency="$"
                        data-unit="/lb/yr"
                    >
                        {lbPriceYear}
                    </div>
                </div>
            </div>
        </div>
    )
}