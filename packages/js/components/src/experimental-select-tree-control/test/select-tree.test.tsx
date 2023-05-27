import { render } from '@testing-library/react';
import React, { createElement } from '@wordpress/element';
import { SelectTree } from '../select-tree';
import { Item } from '../../experimental-tree-control';

const mockItems: Item[] = [
	{
		label: 'Item 1',
		value: 'item-1',
	},
	{
		label: 'Item 2',
		value: 'item-2',
		parent: 'item-1',
	},
	{
		label: 'Item 3',
		value: 'item-3',
	},
];

const DEFAULT_PROPS = {
	id: 'select-tree',
	items: mockItems,
	label: 'Select Tree',
	placeholder: 'Type here',
};

describe( 'SelectTree', () => {
	beforeEach( () => {
		jest.clearAllMocks();
	} );

	it( 'should show the popover only when focused', () => {
		const { queryByPlaceholderText, queryByText } = render(
			<SelectTree { ...DEFAULT_PROPS } />
		);
		expect( queryByText( 'Item 1' ) ).not.toBeInTheDocument();
		queryByPlaceholderText( 'Type here' )?.focus();
		expect( queryByText( 'Item 1' ) ).toBeInTheDocument();
	} );

	it( 'should show create button when callback is true ', () => {
		const { queryByText, queryByPlaceholderText } = render(
			<SelectTree
				{ ...DEFAULT_PROPS }
				shouldShowCreateButton={ () => true }
			/>
		);
		queryByPlaceholderText( 'Type here' )?.focus();
		expect( queryByText( 'Create new' ) ).toBeInTheDocument();
	} );
	it( 'should not show create button when callback is false or no callback', () => {
		const { queryByText, queryByPlaceholderText } = render(
			<SelectTree { ...DEFAULT_PROPS } />
		);
		queryByPlaceholderText( 'Type here' )?.focus();
		expect( queryByText( 'Create new' ) ).not.toBeInTheDocument();
	} );
	it( 'should show a root item when focused and child when expand button is clicked', () => {
		const { queryByText, queryByLabelText, queryByPlaceholderText } =
			render( <SelectTree { ...DEFAULT_PROPS } /> );
		queryByPlaceholderText( 'Type here' )?.focus();
		expect( queryByText( 'Item 1' ) ).toBeInTheDocument();

		expect( queryByText( 'Item 2' ) ).not.toBeInTheDocument();
		queryByLabelText( 'Expand' )?.click();
		expect( queryByText( 'Item 2' ) ).toBeInTheDocument();
	} );

	it( 'should show selected items', () => {
		const { queryAllByRole, queryByPlaceholderText } = render(
			<SelectTree { ...DEFAULT_PROPS } selected={ [ mockItems[ 0 ] ] } />
		);
		queryByPlaceholderText( 'Type here' )?.focus();
		expect( queryAllByRole( 'treeitem' )[ 0 ] ).toHaveAttribute(
			'aria-selected',
			'true'
		);
	} );

	it( 'should show Create "<createValue>" button', () => {
		const { queryByPlaceholderText, queryByText } = render(
			<SelectTree
				{ ...DEFAULT_PROPS }
				createValue="new item"
				shouldShowCreateButton={ () => true }
			/>
		);
		queryByPlaceholderText( 'Type here' )?.focus();
		expect( queryByText( 'Create "new item"' ) ).toBeInTheDocument();
	} );
	it( 'should call onCreateNew when Create "<createValue>" button is clicked', () => {
		const mockFn = jest.fn();
		const { queryByPlaceholderText, queryByText } = render(
			<SelectTree
				{ ...DEFAULT_PROPS }
				createValue="new item"
				shouldShowCreateButton={ () => true }
				onCreateNew={ mockFn }
			/>
		);
		queryByPlaceholderText( 'Type here' )?.focus();
		queryByText( 'Create "new item"' )?.click();
		expect( mockFn ).toBeCalledTimes( 1 );
	} );
} );
