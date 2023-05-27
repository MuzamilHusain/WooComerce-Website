/**
 * External dependencies
 */
import { addQueryArgs } from '@wordpress/url';
import apiFetch from '@wordpress/api-fetch';
import { createElement } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { computeSuggestionMatch } from './utils';
import { AutoCompleter } from './types';

const completer: AutoCompleter = {
	name: 'usernames',
	className: 'woocommerce-search__usernames-result',
	options( search ) {
		const query = search
			? {
					search,
					searchby: 'username',
					per_page: 10,
			  }
			: {};
		return apiFetch( {
			path: addQueryArgs( '/wc-analytics/customers', query ),
		} );
	},
	isDebounced: true,
	getOptionIdentifier( customer ) {
		return customer.id;
	},
	getOptionKeywords( customer ) {
		return [ customer.username ];
	},
	getOptionLabel( customer, query ) {
		const match = computeSuggestionMatch( customer.username, query );
		return (
			<span
				key="name"
				className="woocommerce-search__result-name"
				aria-label={ customer.username }
			>
				{ match?.suggestionBeforeMatch }
				<strong className="components-form-token-field__suggestion-match">
					{ match?.suggestionMatch }
				</strong>
				{ match?.suggestionAfterMatch }
			</span>
		);
	},
	// This is slightly different than gutenberg/Autocomplete, we don't support different methods
	// of replace/insertion, so we can just return the value.
	getOptionCompletion( customer ) {
		return {
			key: customer.id,
			label: customer.username,
		};
	},
};

export default completer;
