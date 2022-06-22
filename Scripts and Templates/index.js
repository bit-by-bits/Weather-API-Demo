let form = document.forms['searchbar'];
let input = form['input'];
let search = document.querySelector('.fa-dragon');
let temp = document.querySelector('.temp');
let city = document.querySelector('.city');
let state = document.querySelector('.state');
let time = document.querySelector('.time');
let feels = document.querySelector('.feels');
let cloud = document.querySelector('.cloud');
let humid = document.querySelector('.humid');
let wind = document.querySelector('.wind');
let rain = document.querySelector('.rain');
let result = Array.from(document.getElementsByClassName('result'));

search.addEventListener('click', () => submit())

form.addEventListener('submit', element => {
    element.preventDefault();
    submit();
})

function submit() {
    fetch('https://api.weatherapi.com/v1/search.json?q=' + input.value + '&key=37d6c36ac75e4292a71141551222203').then(response => response.json()).then(data => {
        if (data.length != 0) {
            for (let i = 0; i < result.length; i++) {
                result[i].innerHTML = data[i].name;
            }
        } else alert('Enter A Valid City');
    });
}

result.forEach(element => {
    element.addEventListener('click', () => {

        fetch('https://api.weatherapi.com/v1/current.json?key=37d6c36ac75e4292a71141551222203&q=' + element.innerHTML).then(response => response.json()).then(data => {

            console.log(data);

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
