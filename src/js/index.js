const keyAPI = "7916510dd05e4cf0888181753240502";
const btnSearch = document.querySelector(".btn-search");
const inputSearch = document.getElementById("search-input")

btnSearch.addEventListener("click", async () => {
    const city = inputSearch.value;
    
    if(!city) {
        fillTheInput();
    } else { 

        const data = await searchCityData(city);

        if(data) {
            fillData(data, city);
        } else {
            fillWithValidCity();
        }
    }
});

inputSearch.addEventListener("keyup", async (event) => {
    const key = event.which || event.keyCode
    const isEnterKeyPressed = key === 13

    if (isEnterKeyPressed){ 

        const city = inputSearch.value;
    
        if(!city) {
            fillTheInput();
        } else { 
    
            const data = await searchCityData(city);
    
            if(data) {
                fillData(data, city);
            } else {
                fillWithValidCity();
            }
        }
    }

})


async function searchCityData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${keyAPI}&q=${city}&aqi=no&lang=pt`;
    
    const response = await fetch(apiUrl);

    if(response.status !== 200) return;

    const data = response.json();

    return data;
}

function fillData(data, city) {
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const humidity = data.current.humidity;
    const wind = data.current.wind_kph;
    const iconCondition = data.current.condition.icon;

    document.getElementById("city").textContent = city;
    document.getElementById("temperature").textContent = `${temperature}°C`;
    document.getElementById("condition").textContent = condition;
    document.getElementById("humidity").textContent = `${humidity}%`;
    document.getElementById("wind").textContent = `${wind} km/h`;
    document.getElementById("condition-icon").setAttribute("src", iconCondition);
}

function fillTheInput() {
    document.getElementById("city").textContent = "Digite uma cidade";
}

function fillWithValidCity() {
    document.getElementById("city").textContent = "Cidade não encontrada"; 
}