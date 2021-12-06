import {useMemo} from 'react';
import {createInitialActivationContextState} from '../context';

export function useActivationContextInitialState() {
    return useMemo(
        () =>
            Object.assign(
                {},
                createInitialActivationContextState(),
                {exists: true},
            ),
        [],
    );
}