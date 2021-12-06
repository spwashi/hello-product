import styles from '../../../../../../../components/app/styles/App.module.scss';
import {Helmet} from 'react-helmet';
import {ProductDetailList} from '../components/ProductDetailList';
import {ProductContext} from '../../../../../context/context';
import {useContext} from 'react';

/**
 * Context-Sensitive Product Detail List.
 *
 * Effects:
 *  - Updates the Page title upon render.
 *
 * @param titleComponent
 * @constructor
 */
export function ConnectedProductDetailList({title: titleComponent}: { title?: any }) {
    const {product} = useContext(ProductContext)
    if (!product) return null;
    return (
        <>
            <Helmet><title>{`${product.name} Details`}</title></Helmet>
            <details className={styles.productDetailListContainer} open>
                <summary>{titleComponent}</summary>
                <ProductDetailList key={product.id} product={product}/>
            </details>
        </>
    );
}