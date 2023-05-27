/**
 * External dependencies
 */
import React, { useEffect } from 'react';
import { Slot, Fill } from '@wordpress/components';
import { createElement, Children, Fragment } from '@wordpress/element';
import deprecated from '@wordpress/deprecated';

/**
 * Internal dependencies
 */
import { createOrderedChildren, sortFillsByOrder } from '../utils';
import { useSlotContext, SlotContextHelpersType } from '../slot-context';
import { ProductFillLocationType } from '../woo-product-tab-item';

type WooProductFieldItemProps = {
	id: string;
	sections: ProductFillLocationType[];
	pluginId: string;
};

type WooProductFieldSlotProps = {
	section: string;
};

type WooProductFieldFillProps = {
	fieldName: string;
	sectionName: string;
	order: number;
	children?: React.ReactNode;
};

const DEFAULT_FIELD_ORDER = 20;

const WooProductFieldFill: React.FC< WooProductFieldFillProps > = ( {
	fieldName,
	sectionName,
	order,
	children,
} ) => {
	const { registerFill, getFillHelpers } = useSlotContext();

	const fieldId = `product_field/${ sectionName }/${ fieldName }`;

	deprecated( `__experimentalWooProductFieldItem`, {
		version: '13.0.0',
		plugin: '@woocommerce/components',
		hint: 'Moved to @woocommerce/product-editor package: import { __experimentalWooProductFieldItem } from @woocommerce/product-editor',
	} );

	useEffect( () => {
		registerFill( fieldId );
	}, [] );

	return (
		<Fill
			name={ `woocommerce_product_field_${ sectionName }` }
			key={ fieldId }
		>
			{ ( fillProps: Fill.Props ) =>
				createOrderedChildren<
					Fill.Props &
						SlotContextHelpersType & {
							sectionName: string;
						},
					{ _id: string }
				>(
					children,
					order,
					{
						sectionName,
						...fillProps,
						...getFillHelpers(),
					},
					{ _id: fieldId }
				)
			}
		</Fill>
	);
};

export const WooProductFieldItem: React.FC< WooProductFieldItemProps > & {
	Slot: React.FC< Slot.Props & WooProductFieldSlotProps >;
} = ( { children, sections, id } ) => {
	return (
		<>
			{ sections.map(
				( { name: sectionName, order = DEFAULT_FIELD_ORDER } ) => (
					<WooProductFieldFill
						fieldName={ id }
						sectionName={ sectionName }
						order={ order }
						key={ sectionName }
					>
						{ children }
					</WooProductFieldFill>
				)
			) }
		</>
	);
};

WooProductFieldItem.Slot = ( { fillProps, section } ) => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { filterRegisteredFills } = useSlotContext();

	return (
		<Slot
			name={ `woocommerce_product_field_${ section }` }
			fillProps={ fillProps }
		>
			{ ( fills ) => {
				if ( ! sortFillsByOrder ) {
					return null;
				}

				return Children.map(
					sortFillsByOrder( filterRegisteredFills( fills ) )?.props
						.children,
					( child ) => (
						<div className="woocommerce-product-form__field">
							{ child }
						</div>
					)
				);
			} }
		</Slot>
	);
};
