/**
 * External dependencies
 */
import { Octokit } from '@octokit/rest';
import shuffle from 'lodash.shuffle';
import { getEnvVar } from '@woocommerce/monorepo-utils/src/core/environment';

export type ContributorData = {
	totalCommits: number;
	contributors: Record< string, unknown >[];
	org: string;
	repo: string;
	baseRef: string;
	headRef: string;
};

const filterUniqBy = ( arr: Record< string, unknown >[], key: string ) => {
	const seen = new Set();
	return arr.filter( ( item ) => {
		const k = item[ key ];
		if ( seen.has( k ) ) {
			return false;
		}
		seen.add( k );
		return true;
	} );
};

const PAGE_SIZE = 100;

export const getContributorData = async (
	orgName: string,
	repoName: string,
	baseRef: string,
	headRef: string
) => {
	const octokit = new Octokit( {
		auth: getEnvVar( 'GITHUB_ACCESS_TOKEN', true ),
	} );

	const {
		data: { total_commits, commits },
	} = await octokit.repos.compareCommitsWithBasehead( {
		owner: orgName,
		repo: repoName,
		basehead: `${ baseRef }...${ headRef }`,
		per_page: PAGE_SIZE,
	} );

	const pages = Math.ceil( total_commits / PAGE_SIZE );
	const allAuthors = [];

	// add page 1 commits
	allAuthors.push(
		...commits
			.filter( ( commit ) => {
				return (
					!! commit.author && ! commit.author.login.includes( 'bot' )
				);
			} )
			.map( ( commit ) => commit.author )
	);

	for ( let i = 2; i <= pages; i++ ) {
		const {
			data: { commits: pageCommits },
		} = await octokit.repos.compareCommitsWithBasehead( {
			owner: orgName,
			repo: repoName,
			basehead: `${ baseRef }...${ headRef }`,
			per_page: PAGE_SIZE,
			page: i,
		} );

		allAuthors.push(
			...pageCommits
				.filter( ( commit ) => {
					return (
						!! commit.author &&
						! commit.author.login.includes( 'bot' )
					);
				} )
				.map( ( commit ) => commit.author )
		);
	}

	return {
		totalCommits: total_commits,
		contributors: shuffle(
			filterUniqBy(
				allAuthors as Array< Record< string, unknown > >,
				'login'
			)
		),
		org: orgName,
		repo: repoName,
		baseRef,
		headRef,
	} as ContributorData;
};

export const getMostRecentFinal = async () => {
	const octokit = new Octokit( {
		auth: getEnvVar( 'GITHUB_ACCESS_TOKEN', true ),
	} );

	const release = await octokit.repos.getLatestRelease( {
		owner: 'woocommerce',
		repo: 'woocommerce',
	} );

	return release.data;
};

export const getMostRecentBeta = async () => {
	const octokit = new Octokit( {
		auth: getEnvVar( 'GITHUB_ACCESS_TOKEN', true ),
	} );

	const { data: releases } = await octokit.repos.listReleases( {
		owner: 'woocommerce',
		repo: 'woocommerce',
	} );

	const betaReleases = releases.filter(
		( release ) =>
			release?.name && release.name.toLowerCase().includes( 'beta' )
	);

	if ( betaReleases.length === 0 ) {
		throw new Error( 'No beta releases found' );
	}

	const latestBetaRelease = betaReleases.reduce( ( latest, current ) => {
		const latestDate = new Date( latest.created_at );
		const currentDate = new Date( current.created_at );
		return currentDate > latestDate ? current : latest;
	} );

	return latestBetaRelease;
};
