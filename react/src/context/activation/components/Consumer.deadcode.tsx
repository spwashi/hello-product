import {ActivationContextDispatch, ActivationContextState, I_ActivationContextDispatch, I_ActivationContextState} from '../context';

export default function ActivationContextConsumer({children}: { children: (context: { state: I_ActivationContextState | null, dispatch: I_ActivationContextDispatch | null }) => any }) {
    return <ActivationContextState.Consumer>{
        (state) => {
            return (
                <ActivationContextDispatch.Consumer>{
                    (dispatch) => {
                        return children({state, dispatch})
                    }
                }</ActivationContextDispatch.Consumer>
            )
        }
    }</ActivationContextState.Consumer>
}