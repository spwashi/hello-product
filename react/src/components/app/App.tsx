import styles from './styles/App.module.scss';
import {useEndpointData} from '../../core/endpoints/hooks/useEndpointData';
import {I_Product} from '../../core/types/models';
import {findEndpoint} from '../../core/endpoints';
import ActivationProvider from '../../context/activation/components/Provider';
import {ProductContextProvider} from '../../features/product/context/components/Provider';
import {ProductSection} from './pages/ProductSection';
import {ProductList} from '../../features/product/import';

function App() {
    const products = useEndpointData<I_Product[] | null>(findEndpoint({route: 'products/'}));

    return (
        <div className={styles.app}>
            <main>
                <h1>Products</h1>
                <p>Select a product for more information.</p>
                <ActivationProvider>
                    <ProductContextProvider>
                        <section className={styles.productCardListContainer}>
                            <ProductList products={products}/>
                        </section>
                        <ProductSection/>
                    </ProductContextProvider>
                </ActivationProvider>
            </main>
        </div>
    );
}

export default App;
