/**
 * Internal dependencies
 */
import {
	IgnorePropertyTransformation,
	KeyChangeTransformation,
	ModelTransformer,
	ModelTransformerTransformation,
	PropertyType,
	PropertyTypeTransformation,
} from '../../../framework';
import {
	Order,
	BillingOrderAddress,
	ShippingOrderAddress,
	OrderCouponLine,
	OrderFeeLine,
	OrderLineItem,
	OrderRefundLine,
	OrderShippingLine,
	OrderTaxRate,
	MetaData,
} from '../../../models';
import { createMetaDataTransformer } from '../shared';

/**
 * Creates a transformer for an order object.
 *
 * @return {ModelTransformer} The created transformer.
 */
export function createOrderTransformer(): ModelTransformer< Order > {
	return new ModelTransformer( [
		new IgnorePropertyTransformation( [ 'date_created', 'date_modified' ] ),
		new ModelTransformerTransformation(
			'billing',
			BillingOrderAddress,
			createBillingAddressTransformer()
		),
		new ModelTransformerTransformation(
			'shipping',
			ShippingOrderAddress,
			createShippingAddressTransformer()
		),
		new ModelTransformerTransformation(
			'taxLines',
			OrderTaxRate,
			createOrderTaxRateTransformer()
		),
		new ModelTransformerTransformation(
			'refunds',
			OrderRefundLine,
			createOrderRefundLineTransformer()
		),
		new ModelTransformerTransformation(
			'couponLines',
			OrderCouponLine,
			createOrdeCouponLineTransformer()
		),
		new ModelTransformerTransformation(
			'feeLines',
			OrderFeeLine,
			createOrderFeeLineTransformer()
		),
		new ModelTransformerTransformation(
			'lineItems',
			OrderLineItem,
			createOrderLineItemTransformer()
		),
		new ModelTransformerTransformation(
			'shippingLines',
			OrderShippingLine,
			createOrderShippingItemTransformer()
		),
		new ModelTransformerTransformation(
			'metaData',
			MetaData,
			createMetaDataTransformer()
		),

		new PropertyTypeTransformation( {
			status: PropertyType.String,
			currency: PropertyType.String,
			discountTotal: PropertyType.String,
			discountTax: PropertyType.String,
			shippingTotal: PropertyType.String,
			shippingTax: PropertyType.String,
			cartTax: PropertyType.String,
			total: PropertyType.String,
			totalTax: PropertyType.String,
			pricesIncludeTax: PropertyType.Boolean,
			customerId: PropertyType.Integer,
			customerNote: PropertyType.String,
			paymentMethod: PropertyType.String,
			transactionId: PropertyType.String,
			setPaid: PropertyType.Boolean,
		} ),
		new KeyChangeTransformation< Order >( {
			discountTotal: 'discount_total',
			discountTax: 'discount_tax',
			shippingTotal: 'shipping_total',
			shippingTax: 'shipping_tax',
			cartTax: 'cart_tax',
			totalTax: 'total_tax',
			pricesIncludeTax: 'prices_include_tax',
			customerId: 'customer_id',
			customerNote: 'customer_note',
			paymentMethod: 'payment_method',
			transactionId: 'transaction_id',
			setPaid: 'set_paid',
			lineItems: 'line_items',
			taxLines: 'tax_lines',
			shippingLines: 'shipping_lines',
			feeLines: 'fee_lines',
			couponLines: 'coupon_lines',
			metaData: 'meta_data',
		} ),
	] );
}

/**
 * Creates a transformer for an order address object.
 *
 * @return {ModelTransformer} The created transformer.
 */
export function createBillingAddressTransformer(): ModelTransformer< BillingOrderAddress > {
	return new ModelTransformer( [
		new PropertyTypeTransformation( {
			firstName: PropertyType.String,
			lastName: PropertyType.String,
			company: PropertyType.String,
			address1: PropertyType.String,
			address2: PropertyType.String,
			city: PropertyType.String,
			state: PropertyType.String,
			postCode: PropertyType.String,
			country: PropertyType.String,
			phone: PropertyType.String,
			email: PropertyType.String,
		} ),
		new KeyChangeTransformation< BillingOrderAddress >( {
			firstName: 'first_name',
			lastName: 'last_name',
			address1: 'address_1',
			address2: 'address_2',
			postCode: 'postcode',
		} ),
	] );
}

/**
 * Creates a transformer for an order address object.
 *
 * @return {ModelTransformer} The created transformer.
 */
export function createShippingAddressTransformer(): ModelTransformer< ShippingOrderAddress > {
	return new ModelTransformer( [
		new PropertyTypeTransformation( {
			firstName: PropertyType.String,
			lastName: PropertyType.String,
			company: PropertyType.String,
			address1: PropertyType.String,
			address2: PropertyType.String,
			city: PropertyType.String,
			state: PropertyType.String,
			postCode: PropertyType.String,
			country: PropertyType.String,
		} ),
		new KeyChangeTransformation< ShippingOrderAddress >( {
			firstName: 'first_name',
			lastName: 'last_name',
			address1: 'address_1',
			address2: 'address_2',
			postCode: 'postcode',
		} ),
	] );
}

/**
 * Creates a transformer for an order tax rate object.
 *
 * @return {ModelTransformer} The created transformer.
 */
function createOrderTaxRateTransformer(): ModelTransformer< OrderTaxRate > {
	return new ModelTransformer( [
		new PropertyTypeTransformation( {
			rateCode: PropertyType.String,
			rateId: PropertyType.Integer,
			label: PropertyType.String,
			compoundRate: PropertyType.Boolean,
			taxTotal: PropertyType.String,
			shippingTaxTotal: PropertyType.String,
			ratePercent: PropertyType.Integer,
		} ),
		new KeyChangeTransformation< OrderTaxRate >( {
			rateCode: 'rate_code',
			ratePercent: 'rate_percent',
			rateId: 'rate_id',
			compoundRate: 'compound',
			taxTotal: 'tax_total',
			shippingTaxTotal: 'shipping_tax_total',
		} ),
	] );
}

/**
 * Creates a transformer for an order refund line object.
 *
 * @return {ModelTransformer} The created transformer.
 */
function createOrderRefundLineTransformer(): ModelTransformer< OrderRefundLine > {
	return new ModelTransformer( [
		new PropertyTypeTransformation( {
			reason: PropertyType.String,
			total: PropertyType.String,
		} ),
	] );
}

/**
 * Creates a transformer for an order coupon line object.
 *
 * @return {ModelTransformer} The created transformer.
 */
function createOrdeCouponLineTransformer(): ModelTransformer< OrderCouponLine > {
	return new ModelTransformer( [
		new ModelTransformerTransformation(
			'metaData',
			MetaData,
			createMetaDataTransformer()
		),
		new PropertyTypeTransformation( {
			code: PropertyType.String,
			discount: PropertyType.String,
			discountTax: PropertyType.String,
		} ),
		new KeyChangeTransformation< OrderCouponLine >( {
			discountTax: 'discount_tax',
			metaData: 'meta_data',
		} ),
	] );
}

/**
 * Creates a transformer for an order fee line object.
 *
 * @return {ModelTransformer} The created transformer.
 */
function createOrderFeeLineTransformer(): ModelTransformer< OrderFeeLine > {
	return new ModelTransformer( [
		new ModelTransformerTransformation(
			'taxes',
			OrderTaxRate,
			createOrderTaxRateTransformer()
		),
		new PropertyTypeTransformation( {
			name: PropertyType.String,
			taxClass: PropertyType.String,
			taxStatus: PropertyType.String,
			total: PropertyType.String,
			totalTax: PropertyType.String,
		} ),
		new KeyChangeTransformation< OrderFeeLine >( {
			taxClass: 'tax_class',
			taxStatus: 'tax_status',
			totalTax: 'total_tax',
		} ),
	] );
}

/**
 * Creates a transformer for an order line item object.
 *
 * @return {ModelTransformer} The created transformer.
 */
function createOrderLineItemTransformer(): ModelTransformer< OrderLineItem > {
	return new ModelTransformer( [
		new ModelTransformerTransformation(
			'taxes',
			OrderTaxRate,
			createOrderTaxRateTransformer()
		),
		new PropertyTypeTransformation( {
			name: PropertyType.String,
			productId: PropertyType.Integer,
			variationId: PropertyType.Integer,
			quantity: PropertyType.Integer,
			taxClass: PropertyType.String,
			subtotal: PropertyType.String,
			subtotalTax: PropertyType.String,
			total: PropertyType.String,
			totalTax: PropertyType.String,
			sku: PropertyType.String,
			price: PropertyType.Integer,
			parentName: PropertyType.String,
		} ),
		new KeyChangeTransformation< OrderLineItem >( {
			productId: 'product_id',
			variationId: 'variation_id',
			taxClass: 'tax_class',
			subtotalTax: 'subtotal_tax',
			totalTax: 'total_tax',
		} ),
	] );
}

/**
 * Creates a transformer for an order shipping line item object.
 *
 * @return {ModelTransformer} The created transformer.
 */
function createOrderShippingItemTransformer(): ModelTransformer< OrderShippingLine > {
	return new ModelTransformer( [
		new ModelTransformerTransformation(
			'taxes',
			OrderTaxRate,
			createOrderTaxRateTransformer()
		),
		new PropertyTypeTransformation( {
			methodTitle: PropertyType.String,
			methodId: PropertyType.Integer,
			total: PropertyType.String,
			totalTax: PropertyType.String,
		} ),
		new KeyChangeTransformation< OrderShippingLine >( {
			methodTitle: 'method_title',
			methodId: 'method_id',
			totalTax: 'total_tax',
		} ),
	] );
}
