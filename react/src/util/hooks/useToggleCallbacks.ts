import {useCallback, useMemo, useState} from 'react';

/**
 * Use callbacks that mutate and describe the status of something toggleable
 */
export function useToggleCallbacks() {
    const [fetching, setFetching] = useState({} as { [endpoint: string]: boolean });
    const isTrue                  = useCallback((endpoint: string) => fetching[endpoint], [fetching]);

    const markTrue =
              useCallback(
                  (endpoint: string) =>
                      setFetching(fetching => ({...fetching, [endpoint]: true})),
                  [setFetching],
              );

    const markFalse =
              useCallback(
                  (endpoint: string) =>
                      setFetching(fetching => ({...fetching, [endpoint]: false})),
                  [setFetching],
              );

    return useMemo(() => ({isTrue, markTrue, markFalse}), [isTrue, markTrue, markFalse]);
}