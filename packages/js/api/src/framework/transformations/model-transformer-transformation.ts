/**
 * Internal dependencies
 */
import {
	ModelTransformation,
	ModelTransformer,
	TransformationOrder,
} from '../model-transformer';
import { Model, ModelConstructor } from '../../models';

/**
 * A model transformation that applies another transformer to a property.
 *
 * @template T
 */
export class ModelTransformerTransformation< T extends Model >
	implements ModelTransformation
{
	public readonly fromModelOrder = TransformationOrder.Normal;

	/**
	 * The property that the transformation should be applied to.
	 *
	 * @type {string}
	 * @private
	 */
	private readonly property: string;

	/**
	 * The model class we want to transform into.
	 *
	 * @type {Function.<T>}
	 * @private
	 * @template T
	 */
	private readonly modelClass: ModelConstructor< T >;

	/**
	 * The transformer that should be used.
	 *
	 * @type {ModelTransformer}
	 * @private
	 */
	private readonly transformer: ModelTransformer< T >;

	/**
	 * Creates a new transformation.
	 *
	 * @param {string}               property    The property we want to apply the transformer to.
	 * @param {ModelConstructor.<T>} modelClass  The model to transform into.
	 * @param {ModelTransformer}     transformer The transformer we want to apply.
	 * @template T
	 */
	public constructor(
		property: string,
		modelClass: ModelConstructor< T >,
		transformer: ModelTransformer< T >
	) {
		// Developer-friendly error to make sure this doesn't go unnoticed.
		if ( property.includes( '_' ) ) {
			throw new Error( 'The property must be camelCase' );
		}
		this.property = property;
		this.modelClass = modelClass;
		this.transformer = transformer;
	}

	/**
	 * Performs a transformation from model properties to raw properties.
	 *
	 * @param {*} properties The properties to transform.
	 * @return {*} The transformed properties.
	 */
	public fromModel( properties: any ): any {
		const val = properties[ this.property ];
		if ( val ) {
			if ( Array.isArray( val ) ) {
				properties[ this.property ] = val.map( ( v ) =>
					this.transformer.fromModel( v )
				);
			} else {
				properties[ this.property ] = this.transformer.fromModel( val );
			}
		}

		return properties;
	}

	/**
	 * Performs a transformation from raw properties to model properties.
	 *
	 * @param {*} properties The properties to transform.
	 * @return {*} The transformed properties.
	 */
	public toModel( properties: any ): any {
		const val = properties[ this.property ];
		if ( val ) {
			if ( Array.isArray( val ) ) {
				properties[ this.property ] = val.map( ( v ) =>
					this.transformer.toModel( this.modelClass, v )
				);
			} else {
				properties[ this.property ] = this.transformer.toModel(
					this.modelClass,
					val
				);
			}
		}

		return properties;
	}
}
