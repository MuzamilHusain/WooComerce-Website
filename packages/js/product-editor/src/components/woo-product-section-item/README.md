# WooProductSectionItem Slot & Fill

A Slotfill component that will allow you to add a new section to the product editor.

## Usage

```jsx
<WooProductSectionItem id={ key } location="tab/general" order={ 2 } pluginId="test-plugin" >
  { () => {
    return (
      <ProductSectionLayout
        title={ __( 'Product test section', 'woocommerce' ) }
        description={ __(
          'In this area you can describe the section.',
          'woocommerce'
        ) }
      >
        <Card>
          <CardBody>{ /* Section content */ }</CardBody>
        </Card>
		  </ProductSectionLayout>
    );
} }
</WooProductSectionItem>

<WooProductSectionItem.Slot location="tab/general" />
```

### WooProductSectionItem (fill)

This is the fill component. You must provide the `id` prop to identify your section fill with a unique string. This component will accept a series of props:

| Prop       | Type   | Description                                                                                        |
| ---------- | ------ | -------------------------------------------------------------------------------------------------- |
| `id`       | String | A unique string to identify your fill. Used for configuration management.                          |
| `tabs`     | Array  | Contains an array of name and order of which slots it should be rendered in.                       |
| `pluginId` | String | A unique plugin ID to identify the plugin/extension that this fill is associated with.             |
| `order`    | Number | (optional) This number will dictate the order that the sections rendered by a Slot will be appear. |

### WooProductSectionItem.Slot (slot)

This is the slot component. This will render all the registered fills that match the `tab` prop.

| Name  | Type   | Description                                                                                          |
| ----- | ------ | ---------------------------------------------------------------------------------------------------- |
| `tab` | String | Unique to the location that the Slot appears, and must be the same as the one provided to any fills. |
