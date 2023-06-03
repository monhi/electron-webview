window.addEventListener("DOMContentLoaded", () => {
	/*
	//Uncomment this block to see the dev tools of webview component
	document.getElementById("webview").addEventListener("dom-ready", ()=>{
	  webview.openDevTools();
	});
	*/
	
	document.getElementById("prompt_button").addEventListener("click", myFunction);
	function myFunction()
	{
		let response = window.prompt('Prompt');
		console.log(response);
	}
});


