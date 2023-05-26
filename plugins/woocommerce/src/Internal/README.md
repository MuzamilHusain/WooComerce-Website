# The internal namespace

All the code in this directory (and hence in the `Automattic\WooCommerce\Internal` namespace) is internal WooCommerce infrastructure code and not intended to be used by plugins. The important thing that this implies is that **backwards compatibility of the public surface for classes in this namespace is not guaranteed in future releases of WooCommerce**.

Therefore **plugin developers should never use classes in this namespace directly in their code**. See [the README file for the src folder](https://github.com/woocommerce/woocommerce/blob/trunk/plugins/woocommerce/src/README.md#the-internal-namespace) for more detailed guidance.
