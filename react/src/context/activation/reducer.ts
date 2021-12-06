import {I_ActivationAction, I_ActivationContextState} from './context';

/**
 * Reducer for managing the state of Product Card Activation
 *
 * @param state
 * @param action
 */
export function activationReducer(state: I_ActivationContextState, action: I_ActivationAction): I_ActivationContextState {
    switch (action.type) {
        case 'activate':
            return {
                ...state,
                activeProduct: action.payload,
            };
        case 'deactivate':
            return {
                ...state,
                activeProduct:
                    action.payload === state.activeProduct
                    ? null
                    : state.activeProduct,
            }
        default:
            return state;
    }
}