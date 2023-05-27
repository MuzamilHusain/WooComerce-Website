/**
 * External dependencies
 */
import { registerStore } from '@wordpress/data';
import { controls } from '@wordpress/data-controls';
import { SelectFromMap, DispatchFromMap } from '@automattic/data-stores';
import { Reducer, AnyAction } from 'redux';

/**
 * Internal dependencies
 */
import { STORE_NAME } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import reducer, { State } from './reducer';
import * as resolvers from './resolvers';
import initDispatchers from './dispatchers';
import { WPDataActions, WPDataSelectors } from '../types';

registerStore< State >( STORE_NAME, {
	reducer: reducer as Reducer< State, AnyAction >,
	actions,
	controls,
	resolvers,
	selectors,
} );

initDispatchers();
export const NAVIGATION_STORE_NAME = STORE_NAME;

declare module '@wordpress/data' {
	function dispatch(
		key: typeof STORE_NAME
	): DispatchFromMap< typeof actions & WPDataActions >;
	function select(
		key: typeof STORE_NAME
	): SelectFromMap< typeof selectors > & WPDataSelectors;
}
