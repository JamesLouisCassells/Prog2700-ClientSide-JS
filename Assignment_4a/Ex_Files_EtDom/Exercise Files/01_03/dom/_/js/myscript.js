

console.profile();

	console.group("Page Links");
	console.dir(document.querySelectorAll('a'));
	console.groupEnd();

	console.groupCollapsed("Paragraphs");
	console.dir(document.querySelectorAll('p'));
	console.groupEnd();


	console.groupCollapsed("Loop");
		for (var i = 1000000; i >= 0; i--) {
		};
	console.groupEnd();


console.profileEnd();
