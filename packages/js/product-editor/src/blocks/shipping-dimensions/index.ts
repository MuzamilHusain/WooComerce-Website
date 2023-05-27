/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';
import { BlockConfiguration } from '@wordpress/blocks';

/**
 * Internal dependencies
 */
import { initBlock } from '../../utils/init-blocks';
import blockConfiguration from './block.json';
import { Edit } from './edit';
import { ShippingDimensionsBlockAttributes } from './types';

const { name, ...metadata } =
	blockConfiguration as BlockConfiguration< ShippingDimensionsBlockAttributes >;

export { metadata, name };

export const settings: Partial<
	BlockConfiguration< ShippingDimensionsBlockAttributes >
> = {
	example: {},
	edit: Edit,
};

export function init() {
	return initBlock( { name, metadata, settings } );
}
