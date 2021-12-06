import {ENV} from './env';

export const IS_DEV           = ENV['isDev'];
export const APP_STATE_KEY    = ENV['appName'];
export const LOCAL_CACHE_TIME =
                 IS_DEV ? 100 * 30
                        : 100 * 60 * 5


