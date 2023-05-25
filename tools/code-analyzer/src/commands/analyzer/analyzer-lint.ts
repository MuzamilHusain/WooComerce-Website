/**
 * External dependencies
 */
import { Command } from '@commander-js/extra-typings';
import { Logger } from '@woocommerce/monorepo-utils/src/core/logger';
import { join } from 'path';

/**
 * Internal dependencies
 */
import { scanForChanges } from '../../lib/scan-changes';
import {
	printDatabaseUpdates,
	printHookResults,
	printSchemaChange,
	printTemplateResults,
} from '../../print';

const program = new Command()
	.command( 'lint' )
	.argument(
		'<compare>',
		'GitHub branch/tag/commit hash to compare against the base branch/tag/commit hash.'
	)
	.argument(
		'<sinceVersion>',
		'Specify the version used to determine which changes are included (version listed in @since code doc).'
	)
	.option(
		'-b, --base <base>',
		'GitHub base branch/tag/commit hash.',
		'trunk'
	)
	.option(
		'-s, --source <source>',
		'Git repo url or local path to a git repo.',
		join( process.cwd(), '../../' )
	)
	.option(
		'-o, --outputStyle <outputStyle>',
		'Output style for the results. Options: github, cli. Github output will set the results as an output variable for Github actions.',
		'cli'
	)
	.option(
		'-ss, --skipSchemaCheck',
		'Skip the schema check, enable this if you are not analyzing WooCommerce'
	)
	.action( async ( compare, sinceVersion, options ) => {
		const { skipSchemaCheck = false, source, base, outputStyle } = options;

		const changes = await scanForChanges(
			compare,
			sinceVersion,
			skipSchemaCheck,
			source,
			base,
			outputStyle
		);

		if ( changes.templates.size ) {
			printTemplateResults(
				Array.from( changes.templates.values() ),
				outputStyle,
				'TEMPLATES',
				Logger.notice
			);
		} else {
			Logger.notice( '\n\n## TEMPLATE CHANGES' );
			Logger.notice(
				'---------------------------------------------------'
			);
			Logger.notice( 'No template changes found.' );
			Logger.notice(
				'---------------------------------------------------'
			);
		}

		if ( changes.hooks.size ) {
			printHookResults(
				Array.from( changes.hooks.values() ),
				outputStyle,
				'HOOKS',
				Logger.notice
			);
		} else {
			Logger.notice( '\n\n## HOOK CHANGES' );
			Logger.notice(
				'---------------------------------------------------'
			);
			Logger.notice( 'No hook changes found.' );
			Logger.notice(
				'---------------------------------------------------'
			);
		}

		if ( changes.schema.filter( ( s ) => ! s.areEqual ).length ) {
			printSchemaChange(
				changes.schema,
				sinceVersion,
				outputStyle,
				Logger.notice
			);
		} else {
			Logger.notice( '\n\n## SCHEMA CHANGES' );
			Logger.notice(
				'---------------------------------------------------'
			);
			Logger.notice( 'No schema changes found.' );
			Logger.notice(
				'---------------------------------------------------'
			);
		}

		if ( changes.db ) {
			printDatabaseUpdates( changes.db, outputStyle, Logger.notice );
		} else {
			Logger.notice( '\n\n## DB CHANGES' );
			Logger.notice(
				'---------------------------------------------------'
			);
			Logger.notice( 'No db changes found.' );
			Logger.notice(
				'---------------------------------------------------'
			);
		}
	} );

program.parse( process.argv );
