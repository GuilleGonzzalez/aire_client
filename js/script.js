const aire_base_url = "http://192.168.0.48/"
let timer = 0;
let tmr = 0;
let active_timer = false;

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

document.getElementById('btn_timer_m').onclick = function (e) {
	if (timer >= 10) {
		timer -= 10;
	}
	set_timer_text(timer);
}

document.getElementById('btn_timer_p').onclick = function (e) {
	timer += 10;
	set_timer_text(timer);
}

document.getElementById('btn_timer_start').onclick = function (e) {
	if (!active_timer) {
		tmr = window.setInterval(update_timer, 1000);
	}
	active_timer = true;
}

function update_timer() {
	timer--;
	set_timer_text(timer);
	if (timer == 0) {
		active_timer = false;
		clearInterval(tmr);
		request("off");
	}
}

function set_timer_text(v) {
	let h = Math.floor((v % (60 * 60 * 24)) / (60 * 60));
	let m = Math.floor((v % (60 * 60)) / (60));
	let s = Math.floor(v % 60);

	h = leading_zeroes(h, 2);
	m = leading_zeroes(m, 2);
	s = leading_zeroes(s, 2);

	document.getElementById("txt_timer").innerHTML = h + ":" + m + ":" + s;
}

function leading_zeroes(num, len) {
	num = num.toString();
	while (num.length < len) num = "0" + num;
	return num;
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
