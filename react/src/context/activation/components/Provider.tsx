import {useCallback, useState} from 'react';
import {ActivationContextDispatch, ActivationContextState, I_ActivationAction} from '../context';
import {activationReducer} from '../reducer';
import {useActivationContextInitialState} from '../hooks/useActivationContextInitialState';

export default function ActivationProvider({children}: { children: any }) {
    const initialState      = useActivationContextInitialState();
    const [state, setState] = useState(initialState);

    const dispatch = useCallback((action: I_ActivationAction) => setState(activationReducer(state, action)), [state]);

    return (
        <ActivationContextState.Provider value={state}>
            <ActivationContextDispatch.Provider value={dispatch}>
                {children}
            </ActivationContextDispatch.Provider>
        </ActivationContextState.Provider>
    )
}

