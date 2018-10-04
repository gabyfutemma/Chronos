$(document).ready(function(){ // jquery
//Efeitos de abertura do site
	$('.first-page').fadeIn(2000).delay(3000).fadeOut(2500);

	
fetch("https://api.openweathermap.org/data/2.5/weather?q=bahia,br&mode=json&APPID=a9d6e04c9d61e00669defb70b6cefd7e&units=metric")
.then(response => response.json())
.then(data => {
	console.log(data);
createAll(data)
});// deve-se chamar a funcao aqui dentro para funcionar


});

function createAll(data){// é dentro dessa funcao que vamos trbalhar as coisas
	console.log(data.main)

	var temp = data.main.temp;
	var min = data.main.temp_min;
	var max = data.main.temp_max;	

	$("#root").append(`
<h1>${temp}°C atual</h1>
<h1>${min}°C min</h1>
<h1>${max}°C max</h1>
		`)
}

	