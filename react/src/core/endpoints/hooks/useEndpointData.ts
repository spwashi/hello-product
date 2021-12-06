import {useCallback, useEffect, useRef, useState} from 'react';
import {useCache} from '../../../util/hooks/useCache';
import {useEnvironmentVariable} from '../../env';
import {useToggleCallbacks} from '../../../util/hooks/useToggleCallbacks';
import {EndpointName} from '../types';

/**
 * Immediately attempt to fetch an endpoint, if it exists
 *
 * @param endpoint
 */
export function useEndpointData<Return = any>(endpoint: EndpointName | null): Return | null {
    const token                           = useEnvironmentVariable('token');
    const [endpointData, setEndpointData] = useState(null as Return | null);
    const cache                           = useCache();
    const fetching                        = useToggleCallbacks();
    const errorRef                        = useRef(null as any | null);

    const fetchEndpoint =
              useCallback(async (endpoint: string) => {
                  const method  = 'POST';
                  const headers = {'Content-Type': 'application/json'};
                  const body    = JSON.stringify({token});

                  fetching.markTrue(endpoint);
                  return fetch(endpoint, {method, headers, body})
                      .then(r => r.json())
                      .catch(error => {
                          throw (errorRef.current = error)
                      });
              }, [token, fetching]);

    useEffect(
        () => {
            if (!endpoint) return;
            if (fetching.isTrue(endpoint)) return;

            let cacheIsValid: boolean;
            let payload;
            {
                const cachedEndpointState = cache.ref.current[endpoint];
                cacheIsValid              = cache.validate(cachedEndpointState);
                payload                   = cachedEndpointState?.payload;
            }

            // if there's a cache hit, return the cached payload
            if (cacheIsValid && payload) {
                setEndpointData(payload);
                return;
            }

            let doIgnoreResponse = false;
            let fetchedData;
            {
                fetching.markTrue(endpoint);
                fetchedData = fetchEndpoint(endpoint);
            }

            // if the component is unmounted before the fetch is finished
            if (doIgnoreResponse || errorRef.current) return;

            // Fetch the response
            {
                const handleSuccess    = () => fetching.markFalse(endpoint);
                const handleFailure    = () => fetching.markFalse(endpoint);
                const cacheEndpointAnd = (payload: any) => {
                    cache.add(endpoint, payload);
                    return payload;
                };
                fetchedData
                    .then(cacheEndpointAnd)
                    .then(setEndpointData)
                    .then(handleSuccess)
                    .catch(handleFailure);
            }

            return () => { doIgnoreResponse = true };
        },
        [
            endpoint,
            setEndpointData,
            cache,
            fetching,
            fetchEndpoint,
        ],
    );

    return errorRef.current ?? endpointData as Return;
}