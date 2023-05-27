type BaseComponent = {
	id: string;
	plugin_id: string;
	order: number;
};

type FieldProperties = {
	name: string;
	label: string;
};

export type ProductFormField = BaseComponent & {
	type: string;
	section: string;
	properties: FieldProperties;
};

export type ProductFormSection = BaseComponent & {
	title: string;
	description: string;
	location: string;
};

export type Subsection = BaseComponent;

export type Tabs = BaseComponent & {
	name: string;
	title: string;
};

export type ProductForm = {
	fields: ProductFormField[];
	sections: ProductFormSection[];
	subsections: Subsection[];
	tabs: Tabs[];
};

export type ProductFormState = ProductForm & {
	errors: {
		[ key: string ]: unknown;
	};
};
