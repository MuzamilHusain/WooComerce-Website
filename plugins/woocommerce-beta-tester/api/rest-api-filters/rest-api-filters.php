<?php

register_woocommerce_admin_test_helper_rest_route(
	'/rest-api-filters',
	array( WCA_Test_Helper_Rest_Api_Filters::class, 'create' ),
	array(
		'methods' => 'POST',
		'args'    => array(
			'endpoint'     => array(
				'description'       => 'Rest API endpoint.',
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			),
			'dot_notation' => array(
				'description'       => 'Dot notation of the target field.',
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			),
			'replacement'  => array(
				'description'       => 'Replacement value for the target field.',
				'type'              => 'string',
				'required'          => true,
				'sanitize_callback' => 'sanitize_text_field',
			),
		),
	)
);

register_woocommerce_admin_test_helper_rest_route(
	'/rest-api-filters',
	array( WCA_Test_Helper_Rest_Api_Filters::class, 'delete' ),
	array(
		'methods' => 'DELETE',
		'args'    => array(
			'index' => array(
				'description' => 'Rest API endpoint.',
				'type'        => 'integer',
				'required'    => true,
			),
		),
	)
);


register_woocommerce_admin_test_helper_rest_route(
	'/rest-api-filters/(?P<index>\d+)/toggle',
	array( WCA_Test_Helper_Rest_Api_Filters::class, 'toggle' ),
	array(
		'methods' => 'POST',
	)
);


class WCA_Test_Helper_Rest_Api_Filters {
	const WC_ADMIN_TEST_HELPER_REST_API_FILTER_OPTION = 'wc-admin-test-helper-rest-api-filters';

	/**
	 * Create a filter.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public static function create( $request ) {
		$endpoint     = $request->get_param( 'endpoint' );
		$dot_notation = $request->get_param( 'dot_notation' );
		$replacement  = $request->get_param( 'replacement' );

		if ( 'false' === $replacement ) {
			$replacement = false;
		} elseif ( 'true' === $replacement ) {
			$replacement = true;
		}

		self::update(
			function ( $filters ) use (
				$endpoint,
				$dot_notation,
				$replacement
			) {
				$filters[] = array(
					'endpoint'     => $endpoint,
					'dot_notation' => $dot_notation,
					'replacement'  => $replacement,
					'enabled'      => true,
				);
				return $filters;
			}
		);
		return new WP_REST_RESPONSE( null, 204 );
	}

	/**
	 * Update the filters.
	 *
	 * @param callable $callback Callback to update the filters.
	 * @return bool
	 */
	public static function update( callable $callback ) {
		$filters = get_option( self::WC_ADMIN_TEST_HELPER_REST_API_FILTER_OPTION, array() );
		$filters = $callback( $filters );
		return update_option( self::WC_ADMIN_TEST_HELPER_REST_API_FILTER_OPTION, $filters );
	}

	/**
	 * Delete a filter.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public static function delete( $request ) {
		self::update(
			function ( $filters ) use ( $request ) {
				array_splice( $filters, $request->get_param( 'index' ), 1 );
				return $filters;
			}
		);

		return new WP_REST_RESPONSE( null, 204 );
	}

	/**
	 * Toggle a filter on or off.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public static function toggle( $request ) {
		self::update(
			function ( $filters ) use ( $request ) {
				$index                        = $request->get_param( 'index' );
				$filters[ $index ]['enabled'] = ! $filters[ $index ]['enabled'];
				return $filters;
			}
		);
		return new WP_REST_RESPONSE( null, 204 );
	}
}
