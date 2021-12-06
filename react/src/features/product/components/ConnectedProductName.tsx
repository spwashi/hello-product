import {useContext} from 'react';
import {ProductContext} from '../context/context';

export function ConnectedProductName() {
    const {product} = useContext(ProductContext)
    if (!product) return null;
    return <span className="product-name">{product.name}</span>
}