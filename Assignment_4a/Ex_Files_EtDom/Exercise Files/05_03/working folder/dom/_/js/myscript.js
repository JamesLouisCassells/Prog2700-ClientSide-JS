(function() {

	//Selecting our node
	var myNode = document.querySelector('#artlist .pixgrid ul');

	myNode.addEventListener("click", function(e) {

		if(e.target.tagName === 'IMG') {

			console.log(e);

		} // target is an image

	}, false); //image is clicked

})(); //self executing function