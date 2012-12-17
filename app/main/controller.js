define(['underscore'], function (_) {

	function _fileLoaded(event) {
		this.imgNode.src = event.target.result;
	}

	function _updateCounts(color, counts) {
		if (counts[color]) {
			counts[color]++;
		} else {
			counts[color] = 1;
		}
	}

	function _mostFrequent(counts) {
		var pair =  _.max(_.pairs(counts), function(pair) {
			return pair[1];
		});
		console.log(pair);
		return pair[0];
	}

	function _sortCounts(counts) {
		return _.sortBy(counts, function(count) {
			return count[1] * -1;
		});
	}

	function _isDistinctColor(color1, color2) {
		var abs = Math.abs;
		var threshold = 0.3;
		return (abs(color1[0] - color2[0]) > threshold || abs(color1[1] - color2[1]) > threshold || abs(color1[2] - color2[2]) > threshold);
	}

	return {

		displayImage: function(image) {
			var reader = new FileReader();
			reader.onload = _fileLoaded.bind(this);
			reader.readAsDataURL(event.target.files[0]);
		},

		matchImage: function(promise) {
			console.log(this.imgNode.width + ' x ' + this.imgNode.height);

			var canvas = document.createElement("canvas");
			canvas.width = this.imgNode.width;
			canvas.height = this.imgNode.height;

			var context = canvas.getContext("2d");
			context.drawImage(this.imgNode, 0, 0);

			var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			counts = {};
			leftEdgeCounts = {};

			for (y = 0; y < imageData.height; y++) {
				for (x = 0; x < imageData.width; x++) {
					var i =  ((y * imageData.width) + x) * 4;
					var red = imageData.data[i];
					var green = imageData.data[i + 1];
					var blue = imageData.data[i + 2];
					var color = red + ',' + green + ',' + blue;

					_updateCounts(color, counts);

					if (x === 0) {
						_updateCounts(color, leftEdgeCounts);
					}
				}
			}

			var backgroundColor = _mostFrequent(leftEdgeCounts);
			var primaryColor = _mostFrequent(counts);

			counts = _.pairs(counts);
			counts = _sortCounts(counts);

			console.log(backgroundColor);
			console.log(primaryColor);
			console.log(_isDistinctColor(backgroundColor.split(','), primaryColor.split(',')));

			this.resultNode.style.backgroundColor = 'rgb(' + backgroundColor + ')';

		}
	}
});