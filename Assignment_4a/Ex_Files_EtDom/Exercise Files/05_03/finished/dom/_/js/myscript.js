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

		} // target is an image

	}, false); //image is clicked

})(); //self executing function