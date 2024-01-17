const key = "e0283766cee7e7e70be7e75409ae8042";

function pesquisar() {
    let cidade = document.querySelector('.input-cidade').value;
    dados(cidade);
}
let relogio;
async function dados(cidade) {
    let dadosWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(Response => Response.json());
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

        horasElement.innerHTML = horas;
        minutosElement.innerHTML = minutos;
        segundosElement.innerHTML = segundos; 
            

    })

}

function inserirDados(dados) {

    document.querySelector('.titulo-previsao').innerHTML = "Cidade: " + dados.name;
    document.querySelector('.graus').innerHTML = "Temperatura: " + Math.floor(dados.main.temp) + "°C";
    document.querySelector('.texto-previsao').innerHTML = "Clima: " + dados.weather[0].description;
    document.querySelector('.umidade').innerHTML = "Umidade: " + dados.main.humidity + "%";
    document.querySelector('.img-previsao').src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    document.body.style.background = `url(https://source.unsplash.com/1600x900/?${dados.weather[0].main})`;
    document.body.style.backgroundSize = 'cover';
}
document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        const btn = document.querySelector(".btn");
        btn.click();
    }
});
