const aire_base_url = "http://192.168.0.48/"

document.getElementById('btn_on').onclick = function (e) {
	request("on");
}

document.getElementById('btn_off').onclick = function (e) {
	request("off");
}

document.getElementById('btn_1').onclick = function (e) {
	request("f1");
}

document.getElementById('btn_2').onclick = function (e) {
	request("f2");
}

document.getElementById('btn_3').onclick = function (e) {
	request("f3");
}

function request(a) {
	fetch(aire_base_url + a, {
		method: 'GET',
		headers: new Headers({
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
		}),
	})
		.then(
			response => response.text()
		).then(
			text => console.log(text)
		);
}
