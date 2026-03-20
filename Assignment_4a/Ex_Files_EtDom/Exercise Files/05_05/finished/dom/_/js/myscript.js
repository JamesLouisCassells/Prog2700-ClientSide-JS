(function() {

	//Selecting our node
	var myNode = document.querySelector('#artlist .pixgrid ul');

	myNode.addEventListener("click", function(e) {

		if(e.target.tagName === 'IMG') {

			var myOverlay = document.createElement('div');
			myOverlay.id = 'overlay';
			document.body.appendChild(myOverlay);

			//set up overlay styles
			myOverlay.style.position = 'absolute';
			myOverlay.style.top = 0;
			myOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
			myOverlay.style.cursor = 'pointer';

			//resize and position overlay
			myOverlay.style.width = window.innerWidth + 'px';
			myOverlay.style.height = window.innerHeight + 'px';
			myOverlay.style.top = window.pageYOffset + 'px';
			myOverlay.style.left = window.pageXOffset + 'px';

			//Create image element
			var imageSrc = e.target.src;
			var largeImage = document.createElement('img');
			largeImage.id = 'largeImage';
			largeImage.src = imageSrc.substr(0, imageSrc.length-7) + '.jpg';
			largeImage.style.display = 'block';
			largeImage.style.position = 'absolute';
			
			//wait until the image has loaded
			largeImage.addEventListener('load', function() {

				//Resize if taller
				if (this.height > window.innerHeight) {
					this.ratio = window.innerHeight / this.height;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				//Resize if wider
				if (this.width > window.innerWidth) {
					this.ratio = window.innerWidth / this.width;
					this.height = this.height * this.ratio;
					this.width = this.width * this.ratio;
				}

				myOverlay.appendChild(largeImage);

			}); //image has loaded


		} // target is an image

	}, false); //image is clicked

})(); //self executing function