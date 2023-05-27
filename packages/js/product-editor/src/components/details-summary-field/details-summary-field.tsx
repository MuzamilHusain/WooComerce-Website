/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useFormContext,
	__experimentalRichTextEditor as RichTextEditor,
} from '@woocommerce/components';
import { Product } from '@woocommerce/data';
import { BlockInstance, serialize, parse } from '@wordpress/blocks';
import { useState, createElement } from '@wordpress/element';

export const DetailsSummaryField = () => {
	const { setValue, values } = useFormContext< Product >();
	const [ summaryBlocks, setSummaryBlocks ] = useState< BlockInstance[] >(
		parse( values.short_description || '' )
	);

	return (
		<RichTextEditor
			label={ __( 'Summary', 'woocommerce' ) }
			blocks={ summaryBlocks }
			onChange={ ( blocks ) => {
				setSummaryBlocks( blocks );
				if ( ! summaryBlocks.length ) {
					return;
				}
				setValue( 'short_description', serialize( blocks ) );
			} }
			placeholder={ __(
				"Summarize this product in 1-2 short sentences. We'll show it at the top of the page.",
				'woocommerce'
			) }
		/>
	);
};
