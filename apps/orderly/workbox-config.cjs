module.exports = {
	globDirectory: 'src/',
	globPatterns: [
		'**/*.{tsx,svg,ts,css}'
	],
	swDest: 'src/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};