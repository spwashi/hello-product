import {I_Product} from '../../../../core/types/models';
import styles from './styles/productCardList.module.scss';
import ProductCard from '../item/card/Card';
import React, {useContext} from 'react';
import {useIsMobile} from '../../../../util/hooks/useWindowWidth';
import {ActivationContextState} from '../../../../context/activation/context';
import {ConnectedProductDetailList} from '../../features/details/features/detail-list/control/ConnectedProductDetailList';

const List = React.memo(
    ({products}: { products: I_Product[] | null }) => {
        const isMobile        = useIsMobile();
        const {activeProduct} = useContext(ActivationContextState)
        if (!products) return <>Loading...</>;
        const listItems =
                  products.map(
                      product => {
                          const displayDetails = isMobile && activeProduct === product;
                          return (
                              <li key={product.id}>
                                  <ProductCard product={product}/>
                                  {displayDetails ? <ConnectedProductDetailList/> : null}
                              </li>
                          );
                      },
                  );
        return <ul className={styles.productCardList}>{listItems}</ul>;
    },
);
export default List;
