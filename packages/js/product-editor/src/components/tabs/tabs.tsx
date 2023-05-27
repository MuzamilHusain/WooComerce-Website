/**
 * External dependencies
 */
import { createElement, useEffect, useState } from '@wordpress/element';
import { ReactElement } from 'react';
import { NavigableMenu, Slot } from '@wordpress/components';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore No types for this exist yet.
// eslint-disable-next-line @woocommerce/dependency-group
import { navigateTo, getNewPath, getQuery } from '@woocommerce/navigation';

/**
 * Internal dependencies
 */
import { sortFillsByOrder } from '../../utils';
import { TABS_SLOT_NAME } from './constants';

type TabsProps = {
	onChange?: ( tabId: string | null ) => void;
};

export type TabsFillProps = {
	onClick: ( tabId: string ) => void;
};

export function Tabs( { onChange = () => {} }: TabsProps ) {
	const [ selected, setSelected ] = useState< string | null >( null );
	const query = getQuery() as Record< string, string >;

	useEffect( () => {
		onChange( selected );
	}, [ selected ] );

	useEffect( () => {
		if ( query.tab ) {
			setSelected( query.tab );
		}
	}, [ query.tab ] );

	function maybeSetSelected( fills: readonly ( readonly ReactElement[] )[] ) {
		if ( selected ) {
			return;
		}

		for ( let i = 0; i < fills.length; i++ ) {
			if ( fills[ i ][ 0 ].props.disabled ) {
				continue;
			}
			const tabId = fills[ i ][ 0 ].props?.children?.key || null;
			setSelected( tabId );
			return;
		}
	}

	function selectTabOnNavigate(
		_childIndex: number,
		child: HTMLButtonElement
	) {
		child.click();
	}

	return (
		<NavigableMenu
			role="tablist"
			onNavigate={ selectTabOnNavigate }
			className="woocommerce-product-tabs"
			orientation="horizontal"
		>
			<Slot
				fillProps={
					{
						onClick: ( tabId ) =>
							navigateTo( {
								url: getNewPath( { tab: tabId } ),
							} ),
					} as TabsFillProps
				}
				name={ TABS_SLOT_NAME }
			>
				{ ( fills ) => {
					if ( ! sortFillsByOrder ) {
						return null;
					}

					maybeSetSelected( fills );
					return sortFillsByOrder( fills );
				} }
			</Slot>
		</NavigableMenu>
	);
}
