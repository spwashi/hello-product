import {APP_STATE_KEY} from '../core/constants';

/**
 * A function that adds a prefix to a string.
 * The prefix defaults to the "app state key"
 *
 * @param str
 * @param pre
 */
export const prefix = (str: string, pre: string = APP_STATE_KEY) => `${pre}--${str}`;
