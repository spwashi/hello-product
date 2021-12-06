import {createContext} from 'react';
import {I_Product} from '../../core/types/models';


export interface I_ActivationContextState {
    activeProduct: I_Product | null;
    exists: boolean
}

export type I_ActivationAction =
    | { type: 'activate', payload: I_Product }
    | { type: 'deactivate', payload: I_Product }

export interface I_ActivationContextDispatch {
    (action: I_ActivationAction): void
}


export function createInitialActivationContextState(): I_ActivationContextState {
    return {activeProduct: null, exists: false};
}

const initialState                     = createInitialActivationContextState();
export const ActivationContextState    = createContext(initialState);
export const ActivationContextDispatch = createContext((() => {}) as I_ActivationContextDispatch | null);