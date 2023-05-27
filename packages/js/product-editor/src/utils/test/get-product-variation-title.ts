/**
 * Internal dependencies
 */
import {
	getProductVariationTitle,
	getTruncatedProductVariationTitle,
} from '../get-product-variation-title';

describe( 'getProductVariationTitle', () => {
	it( 'should return the product variation options in a comma separated list', () => {
		const title = getProductVariationTitle( {
			id: 123,
			attributes: [
				{
					id: 0,
					name: 'Color',
					option: 'Red',
				},
				{
					id: 0,
					name: 'Size',
					option: 'Medium',
				},
			],
		} );
		expect( title ).toBe( 'Red, Medium' );
	} );

	it( 'should return the only product variation attribute option name', () => {
		const title = getProductVariationTitle( {
			id: 123,
			attributes: [
				{
					id: 0,
					name: 'Color',
					option: 'Blue',
				},
			],
		} );
		expect( title ).toBe( 'Blue' );
	} );

	it( 'should return the product variation id when no attributes exist', () => {
		const title = getProductVariationTitle( {
			id: 123,
			attributes: [],
		} );
		expect( title ).toBe( '#123' );
	} );
} );

describe( 'getTruncatedProductVariationTitle', () => {
	it( 'should return the default product variation title when the limit is not met', () => {
		const truncatedTitle = getTruncatedProductVariationTitle( {
			id: 123,
			attributes: [
				{
					id: 0,
					name: 'Color',
					option: 'Red',
				},
				{
					id: 0,
					name: 'Size',
					option: 'Medium',
				},
			],
		} );
		expect( truncatedTitle ).toBe( 'Red, Medium' );
	} );

	it( 'should return the truncated product title when the limit is reached', () => {
		const truncatedTitle = getTruncatedProductVariationTitle( {
			id: 123,
			attributes: [
				{
					id: 0,
					name: 'Color',
					option: 'Reddish',
				},
				{
					id: 0,
					name: 'Size',
					option: 'MediumLargeSmallishTypeOfSize',
				},
			],
		} );
		expect( truncatedTitle ).toBe( 'Reddish, MediumLargeSmallishType…' );
	} );
} );
