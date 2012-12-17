/*global curl:true*/
(function(curl) {

	var config = {

		baseUrl: '',
		pluginPath: 'curl/plugin',

		paths: {
			underscore: 'components/lodash/lodash'
		},

		packages: [
			{ name: 'cola', location: 'components/cola', main: './cola' },
			{ name: 'curl', location: 'components/curl/src/curl', main: '../curl' },
			{ name: 'meld', location: 'components/meld', main: './meld' },
			{ name: 'poly', location: 'components/poly', main: './poly' },
			{ name: 'when', location: 'components/when', main: './when' },
			{ name: 'wire', location: 'components/wire', main: './wire' }
		],

		preloads: ['poly/all']
	};

	curl(config, ['wire!app/spec']);

})(curl);