const key = "e0283766cee7e7e70be7e75409ae8042";

function pesquisar() {
    let cidade = document.querySelector('.input-cidade').value;
    dados(cidade);
}
let relogio;
async function dados(cidade) {
    let dadosWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(Response => Response.json());
    console.log(dadosWeather);
    if (dadosWeather.name != undefined ){
        inserirDados(dadosWeather);
        clearInterval(relogio);
        relogio = setInterval(function time() {
        const dataAtual = new Date();
        const timezoneOffset = dadosWeather.timezone / 3600;
        const localTime = new Date(dataAtual.getTime() + timezoneOffset * 60 * 60 * 1000);

        let horasElement = document.getElementById('horas');
        let minutosElement = document.getElementById('minutos');
        let segundosElement = document.getElementById('segundos');

        let horas = (localTime.getHours())+3;
        let minutos = localTime.getMinutes();
        let segundos = localTime.getSeconds();

        if(horas>24)
        {
            horas = horas - 24
            
        }

        horasElement.innerHTML = "Horas: " + horas;
        minutosElement.innerHTML = "Minutos: " + minutos;
        segundosElement.innerHTML = "Segundos: " + segundos; 
    })
    }else{
        alert("Por favor digite uma cidade valida!");
    }
    
    
}

function inserirDados(dados) {

    document.querySelector('.selectedCity').innerHTML = "Cidade: " + dados.name;
    document.querySelector('.selectedCountry').innerHTML = "País: " + dados.sys.country;
    document.querySelector('.selectedTimeZone').innerHTML = "Fuso horário: " + (dados.timezone/3600);
    document.querySelector('.weatherDescription').innerHTML = "Descrição: " + dados.weather[0].description;
    document.querySelector('.img-previsao').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}@2x.png`;
    document.querySelector('.temp').innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C";    
    document.querySelector('.temp-Min').innerHTML = "Temperatura minima: " + Math.floor(dados.main.temp_min) + "°C";    
    document.querySelector('.temp-Max').innerHTML = "Temperatura maxima: " + Math.floor(dados.main.temp_max) + "°C";    
    document.querySelector('.humidity').innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector('.tempFeeling').innerHTML = "Sensação termica: " + Math.floor(dados.main.feels_like) + "°C";
    document.querySelector('.cloudAmount').innerHTML = "Nuvens: " + dados.clouds.all + "%";
    document.querySelector('.windSpeed').innerHTML = "Velocidade: " + dados.wind.speed + "m/s";
    document.querySelector('.windDirection').innerHTML = "Direção: " + dados.wind.deg + "°";

    document.body.style.background = `url(https://source.unsplash.com/1600x900/?${dados.weather[0].main})`;
    document.body.style.backgroundSize = 'cover';
}
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const btn = document.querySelector(".btn");
        btn.click();
    }
});
