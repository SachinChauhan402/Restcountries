document.addEventListener('DOMContentLoaded', () => {
  const countryListContainer = document.getElementById('countryList');

  // Fetch countries data from the REST Countries API
  fetch('https://restcountries.com/v2/all')
    .then(response => response.json())
    .then(data => {
      // Loop through each country
      data.forEach(country => {
        const { name, capital, region, flags, alpha2Code, latlng } = country;

        // Create a Bootstrap card for each country
        const card = document.createElement('div');
        card.classList.add('card', 'mb-3', 'border-dark'); // Add 'border-dark' class for black border
        card.style.width = '18rem';
        card.style.color = "white";
        card.style.marginLeft = '13px';
        
        card.style.background = 'linear-gradient(#c4b797, #495958)';

        // Create card header
        const cardHeader = document.createElement('div');
        cardHeader.classList.add('card-header');
        cardHeader.style.backgroundColor = 'black';
        cardHeader.style.width = '100%';
        const cardTitle = document.createElement('h6');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = name;
        cardTitle.style.marginLeft = '60px';
        cardTitle.style.color = 'white';
        // cardTitle.style.fontWeight = 'bold'; // Example styling: setting font weight to bold
        cardHeader.appendChild(cardTitle);
       

        

        // Create card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // Create card image
        const cardImage = document.createElement('img');
        cardImage.src = flags.svg;
        cardImage.classList.add('card-img-top');

        // Create card text with country capital, region, latitude, and longitude
        const cardText = document.createElement('p');
        cardText.classList.add('card-text');
        cardText.innerHTML = `Capital: ${capital}<br>Region: ${region}<br>Latitude: ${latlng[0]}<br>Longitude: ${latlng[1]}`;

        // Create weather button
        const weatherButton = document.createElement('a');
        weatherButton.href = '#';
        weatherButton.classList.add('btn', 'btn-primary');
        weatherButton.style.backgroundColor = "transparent";
        weatherButton.style.color = "white";
        weatherButton.textContent = 'Show Weather';

        // Add event listener to fetch weather data on button click
        weatherButton.addEventListener('click', () => {
          // Fetch weather data from OpenWeatherMap API
          fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital},${alpha2Code}&appid=9f888235b03f695b12f7800f9bdc5ad0`)
            .then(response => response.json())
            .then(weatherData => {
              // Display weather information
              alert(`Weather in ${capital}, ${alpha2Code}:\nTemperature: ${weatherData.main.temp}°C\nHumidity: ${weatherData.main.humidity}%`);
            })
            .catch(error => {
              console.log('Error fetching weather data:', error);
            });
        });

        // Append elements to the card body
        cardBody.appendChild(cardImage);
        cardBody.appendChild(cardText);
        cardBody.appendChild(weatherButton);

        // Append card header and body to the card
        card.appendChild(cardHeader);
        card.appendChild(cardBody);

        // Append card to the country list container
        countryListContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.log('Error fetching countries data:', error);
    });
});
