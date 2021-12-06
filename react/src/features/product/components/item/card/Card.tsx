import {I_Product} from '../../../../../core/types/models';
import {ProductContextProvider} from '../../../context/components/Provider';
import ProductBody from '../Body';
import './styles/productCard.scss';
import {useContext} from 'react';
import {ActivationContextState} from '../../../../../context/activation/context';
import classNames from 'classnames';
import classes from './styles/states/active.module.scss';

/**
 * Card version of a Product
 *
 * @param product
 * @constructor
 */
export default function Card({product}: { product: I_Product }) {
    const isActive  = useContext(ActivationContextState).activeProduct === product;
    const className = classNames({[classes.active]: isActive});
    return (
        <ProductContextProvider product={product}>
            <div className={`cardContext ${className}`} aria-selected={isActive ? 'true' : 'false'}>
                <ProductBody/>
            </div>
        </ProductContextProvider>
    );
}