/**
 * Internal dependencies
 */
import TYPES from './action-types';
import { ProductFormField, ProductForm } from './types';

export function getFieldsSuccess( fields: ProductFormField[] ) {
	return {
		type: TYPES.GET_FIELDS_SUCCESS as const,
		fields,
	};
}

export function getFieldsError( error: unknown ) {
	return {
		type: TYPES.GET_FIELDS_ERROR as const,
		error,
	};
}

export function getProductFormSuccess( productForm: ProductForm ) {
	return {
		type: TYPES.GET_PRODUCT_FORM_SUCCESS as const,
		fields: productForm.fields,
		sections: productForm.sections,
		subsections: productForm.subsections,
		tabs: productForm.tabs,
	};
}

export function getProductFormError( error: unknown ) {
	return {
		type: TYPES.GET_PRODUCT_FORM_ERROR as const,
		error,
	};
}

export type Action = ReturnType<
	| typeof getFieldsSuccess
	| typeof getFieldsError
	| typeof getProductFormSuccess
	| typeof getProductFormError
>;
