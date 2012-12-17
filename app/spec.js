define({

	theme: { module: 'css!theme.css' },

	container: {
		render: { template: { module: 'text!app/container/template.html' } },
		insert: { last: { $ref: 'dom.first!body' } }
	},

	fileChooser: {
		render: { template: { module: 'text!app/file-chooser/template.html' } },
		insert: { first: {$ref: 'container' } }
	},

	result: {
		render: {
			template: { module: 'text!app/display/template.html' },
			css: { module: 'css!app/display/structure.css' }
		},
		insert: { last: {$ref: 'container' } }
	},

	image : {
		render: { template: {module: 'text!app/image/template.html' } },
		insert: { first: {$ref: 'result' } }
	},

	controller: {
		create: 'app/main/controller',
		properties: {
			imgNode: { $ref: 'image' },
			resultNode: { $ref: 'result' }
		},
		on: {
			fileChooser: { 'change:#image': 'displayImage' },
			image: { 'load': 'matchImage' }
		}
	},

	plugins: [
		{ module: 'wire/debug' },
		{ module: 'wire/dom' },
		{ module: 'wire/dom/render' },
		{ module: 'wire/on' }
	]
});