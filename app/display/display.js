define(['when'], function(when) {
	function _fileLoaded(event) {
		this.imgNode.src = event.target.result;
	}

	return {
		displayImage: function(image) {
			var reader = new FileReader();
			reader.onload = _fileLoaded.bind(this);
			reader.readAsDataURL(event.target.files[0]);
		}
	}
});