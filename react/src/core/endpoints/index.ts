import {prefix} from '../../util';
import {EndpointDescription, EndpointName} from './types';
import {ENV} from '../env';


/**
 * Returns the ID of an endpoint. Usually a Url.
 *
 * @param urlDescriptor
 */
export function findEndpoint(urlDescriptor: EndpointDescription): EndpointName {
    const ROUTE_ERROR_PREFIX = 'Cannot Handle Route: '
    switch (urlDescriptor.route) {
        case 'products/':
            switch (ENV.environment) {
                case 'dev':
                    return 'http://localhost:4095/server/products';
                case 'test':
                    return `https://hello-product.spwashi.com/server/products/?secret=${ENV.api_secret}`
                case 'prod':
                    return `https://hello-product.spwashi.com/server/products/?secret=${ENV.api_secret}`
                default:
                    return ''
            }
        case 'products/:id/details':
            let id = urlDescriptor.id;
            if (!id) throw new Error(prefix('missing ID', ROUTE_ERROR_PREFIX))
            switch (ENV.environment) {
                case 'dev':
                    return `http://localhost:4095/server/product-details/?product=${id}`;
                case 'test':
                    return `https://hello-product.spwashi.com/server/product-details/?product=${id}&secret=${ENV.api_secret}`
                case 'prod':
                    return `https://hello-product.spwashi.com/server/product-details/?product=${id}&secret=${ENV.api_secret}`
                default:
                    return ''
            }

        default:
            throw new Error(prefix('unknown route', ROUTE_ERROR_PREFIX))
    }
}