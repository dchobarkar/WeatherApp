# Weather App

A hybrid app to give you a weather forecast to plan out your days and weeks. The app predicts the best day to sell an umbrella and a jacket. It also gives advice on which days should you wear a hat.

### Technology Stack

- HTML
- CSS
- JavaScript
- React Native
- Expo

### Installation

    $ npm install
    $ expo start

    Nevigate to `http://localhost:19002` and select the platform of your choice to launch the app.

### Working

- The app uses Open weather map's api since it provides most weather data for free. There are 3 apis implemented.

  1. [Geocoding](https://openweathermap.org/api/geocoding-api): To get the longitude and latitude of the input city. In case there are more than one cities for given name it returns the an array of details of all such cities.
  2. [Current weather data](https://openweathermap.org/current): To get the weather data of given city for current time.
     - Response data is in JSON format and the important details are shown in the Weather Details screen.
  3. [5 day weather forecast](https://openweathermap.org/forecast5): To get the weather prediction of given city for upcoming 5 days
     - Response data is in JSON format and comprise of an array of 40 "list" elements. Each array element is for 3 hours duration.(8 for a day) and thus 40 elements for 5 days.
     - The maximum and the minimum temperature is calculated by iterating through the list array and storing the max value for temp_max field and the min value for temp_min field of a particular day.
     - The weather icon and the weather name are of the exact time slot as the current time. (For ex. If you search at 9, then it will show the icon and name for next 5 days at 9)
     - The last column shows the average cloud precentage and average wind speed for a particular day.

- Once a city name has been entered, the app shows dropdown of all available cities with same name along with country code, longitude and latitude.

- Select city from the dropdown and click "Get weather" button. if current weather is rain, drizzle or thunderstorm, the app will send push notification for with alert message.

- Best day to sell an umbrella and a jacket is predicted based on few parameters from the response data. Each parameter has some weight assigned to it based on the scope and the degree of impact. The summation of all parameter’s weight is considered to evaluate the best day.

  1. In all cases, the time slots of 9,12,15,18 are considered to evaluate the best day. Remaining slots are excluded from evaluation since market activities are conducted in daytime only and hats are generally used in daytime.
  2. Umbrella: The best time to sell an umbrella is while raining. Hence, the app selects the day with highest weightage for rainy conditions.
     - The parameters used to evaluate the rainy condition are weather id, probability of precipitation and wind speed.
  3. Jacket (Winter Jacket): The best time to sell a winter jacket is in cold. Hence, the app selects the day with highest weightage for low temperature conditions.
     - The parameters used to evaluate the low temperature are Weather id and temperature
  4. Hat (For cold and hot temperatures): The best time wear a hat is in cold or in high temperature. Hence, the app selects the day with highest weightage for high temperature or low temperature.
     - The parameters used to evaluate the temperature are Weather id, wind speed and temperature

- Since the api response consists of time slots from the current time, (For ex If you search at 9, the response will contain the data for time slots after 9 that day. i.e., 9,12,15,18,21 - 5 slots for current day, 8 slots each for next 4 days and remaining 3 slots for 5th day.) Once the weightage for each time slot is calculated, the app takes average value of each weight for a particular day.

- The day having highest weightage for umbrella weightage is considered to be the best day to sell an umbrella. Likewies, the day with highest weightage for jacket weightage is considered to be the best day to sell jacket. And hat is advised to wear on days having weightage value about 20.

### Credits

- Author - [Darshan Chobarkar](https://www.linkedin.com/in/dchobarkar/)
