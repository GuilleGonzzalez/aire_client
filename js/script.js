const aire_base_url = "http://192.168.0.48/"
let timer = 0;
let temp_set = 20;
let tmr = 0;
let active_timer = false;
let timer_times = [0, 10, 60, 300, 600, 1200, 1800, 3600, 7200, 10800, 14400];
let timer_curr = 0;

document.addEventListener("DOMContentLoaded", function(){
	request("update");
});

document.getElementById('btn_on').onclick = function (e) {
	request("on");
}

document.getElementById('btn_off').onclick = function (e) {
	request("off");
}

document.getElementById('btn_auto').onclick = function (e) {
	request("fauto");
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
	if (timer_curr >= 1) {
		timer = timer_times[--timer_curr];
	}
	set_timer_text(timer);
}

document.getElementById('btn_timer_p').onclick = function (e) {
	if (timer_curr < timer_times.length - 1) {
		timer = timer_times[++timer_curr];
	}
	set_timer_text(timer);
}

document.getElementById('btn_temp_set_m').onclick = function (e) {
	temp_set--;
	set_temp_set_text(temp_set);
	request("d" + temp_set);
}

document.getElementById('btn_temp_set_p').onclick = function (e) {
	temp_set++;
	set_temp_set_text(temp_set);
	request("d" + temp_set);
}

document.getElementById('btn_timer_start').onclick = function (e) {
	if (!active_timer) {
		tmr = window.setInterval(update_timer, 1000);
	}
	active_timer = true;
}

document.getElementById('btn_settings').onclick = function (e) {
	request("settings?all=true");
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

function set_temp_set_text(t) {
	document.getElementById("txt_temp_set").innerHTML = t;
	request("t" + temp_set);
}

function leading_zeroes(num, len) {
	num = num.toString();
	while (num.length < len) num = "0" + num;
	return num;
}

let response;

function request(a) {
	fetch(aire_base_url + a, {})
		.then(
			response => response.text()
		).then(
			(text) => {
				console.log(text);
				id = text.split(",")[0];
				if (id == 1) {
					status = text.split(",")[1];
					temp = text.split(",")[2];
					txt_temp.innerHTML = temp;
				} else {
					txt_settings.innerHTML = text;
				}
			}
		);
}
