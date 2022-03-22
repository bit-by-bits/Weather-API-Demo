let form = document.forms['form'];
let input = form['input'];
let search = document.getElementById('submit');
let temp = document.getElementById('temp');
let city = document.getElementById('city');
let state = document.getElementById('state');
let time = document.getElementById('time');
let feels = document.getElementById('feels');
let cloud = document.getElementById('cloud');
let humid = document.getElementById('humid');
let wind = document.getElementById('wind');
let rain = document.getElementById('rain');
let link = Array.from(document.getElementsByClassName('link'));

search.addEventListener('click', () => submit())

form.addEventListener('submit', element => {
    element.preventDefault();
    submit();
})

function submit() {
    fetch('https://api.weatherapi.com/v1/search.json?q=' + input.value + '&key=37d6c36ac75e4292a71141551222203').then(response => response.json()).then(data => {
        if (data.length != 0) {
            for (let i = 0; i < link.length; i++) {
                link[i].innerHTML = data[i].name;
            }
        } else alert('Enter A Valid City');
    });
}

link.forEach(element => {
    element.addEventListener('click', () => {

        fetch('https://api.weatherapi.com/v1/current.json?key=37d6c36ac75e4292a71141551222203&q=' + element.innerHTML).then(response => response.json()).then(data => {
            temp.innerHTML = data.current.temp_c + 'C / ' + data.current.temp_f + 'F';
            city.innerHTML = data.location.name;
            state.innerHTML = data.location.region + ', ' + data.location.country;
            time.innerHTML = data.location.localtime;
            feels.innerHTML = data.current.feelslike_c + 'C / ' + data.current.feelslike_f + 'F';
            cloud.innerHTML = data.current.cloud + ' %';
            humid.innerHTML = data.current.humidity + ' %';
            wind.innerHTML = data.current.wind_kph + ' k/hr';
            rain.innerHTML = data.current.precip_mm + ' mm';
        });
    })
});
