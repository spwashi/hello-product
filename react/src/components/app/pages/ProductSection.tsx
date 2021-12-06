import {useIsMobile} from '../../../util/hooks/useWindowWidth';
import {ProductContextConsumer} from '../../../features/product/context/components/Consumer';
import {ConnectedProductName} from '../../../features/product/components/ConnectedProductName';
import {ConnectedProductDetailList} from '../../../features/product/features/details/features/detail-list/control/ConnectedProductDetailList';

export function ProductSection() {
    const isMobile = useIsMobile();
    return <>
        {
            !isMobile
            ? (
                <>
                    <ProductContextConsumer>
                        {({product}) => {
                            if (!product) return null;
                            return (
                                <>
                                    <h2><ConnectedProductName/> Details</h2>
                                    <ConnectedProductDetailList title={<h3>Details</h3>}/>
                                </>
                            )
                        }}
                    </ProductContextConsumer>
                </>
            )
            : null
        }
    </>;
}