
document.getElementById('btn_on').onclick = function (e) {
	send2("on");
}

document.getElementById('btn_off').onclick = function (e) {
	send2("off");
}

function send(action) {
	const http = new XMLHttpRequest();
	const url='http://192.168.0.48/' + action;
	http.open("GET", url);
	http.send();
	http.onreadystatechange = (e) => {
	  console.log("R: " + http.responseText)
	}
}

function send2(action) {
	fetch("http://192.168.0.48/" + action)
		.then(
			response => response.text()
		).then(
			text => console.log(text)
		);
}
