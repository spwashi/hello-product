import {LOCAL_CACHE_TIME} from '../../core/constants';
import {useCallback, useMemo, useRef} from 'react';
import {useLocalStorage} from './useLocalStorage';
import {prefix} from '../index';

export type CacheableData = { lastFetched: number | null; payload: any }


export function useCache() {
    const getInitialState               = () => ({} as { [key: string]: CacheableData & { [k: string]: any } });
    const validateCachedState           = (cachedState: CacheableData) => {
        if (!cachedState?.lastFetched) return false;
        return Date.now() - cachedState.lastFetched < LOCAL_CACHE_TIME;
    };
    const initialState                  = useMemo(getInitialState, []);
    const [cachedState, setCachedState] = useLocalStorage(prefix('product-data'), initialState);
    const cachedStateRef                = useRef(cachedState);
    cachedStateRef.current              = cachedState;
    const validateCache                 = useCallback(validateCachedState, []);
    const cacheKey                      = useCallback((key: string, payload: any) => {
        setCachedState(
            {
                ...cachedStateRef.current,
                [key]: {
                    lastFetched: Date.now(),
                    payload:     payload,
                },
            },
        );
    }, [setCachedState]);
    return useMemo(() => ({ref: cachedStateRef, validate: validateCache, add: cacheKey}),
                   [
                       cachedStateRef,
                       validateCache,
                       cacheKey,
                   ]);
    ;
}