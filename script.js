window.addEventListener("DOMContentLoaded", () => {
	
	document.getElementById("webview").addEventListener("dom-ready", ()=>{
	  webview.openDevTools();
	});
	
	document.getElementById("prompt_button").addEventListener("click", myFunction);
	function myFunction()
	{
		let response = window.prompt('Prompt');
		console.log(response);
	}
});


