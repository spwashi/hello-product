import {I_Product} from '../../../../core/types/models';
import {useContext} from 'react';
import {ActivationContextState} from '../../../../context/activation/context';
import {ProductContext} from '../context';


export function ProductContextConsumer({children}: { children: (args: { product?: I_Product }) => any }) {
    const {activeProduct} = useContext(ActivationContextState);
    return (<ProductContext.Consumer key={activeProduct?.id}>{
        children
    }</ProductContext.Consumer>)
}
