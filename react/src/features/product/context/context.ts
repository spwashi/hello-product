import {I_Product} from '../../../core/types/models';
import {createContext} from 'react';

export type I_ProductContextState = { product?: I_Product, active?: boolean };
export const ProductContext = createContext({} as I_ProductContextState);
