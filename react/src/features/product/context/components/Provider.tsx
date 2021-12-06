import {I_Product} from '../../../../core/types/models';
import {useContext, useMemo} from 'react';
import {ActivationContextState} from '../../../../context/activation/context';
import {ProductContext} from '../context';


export function ProductContextProvider({product, children}: { product?: I_Product, children: any }) {
    const {activeProduct} = useContext(ActivationContextState);
    const productState    = useMemo(() => ({
        product: product ?? activeProduct ?? undefined,
        active:   activeProduct === product,
    }), [product, activeProduct]);
    return (<ProductContext.Provider value={productState} key={activeProduct?.id}>{
        children
    }</ProductContext.Provider>)
}
