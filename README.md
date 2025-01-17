# App Name: 2-hour Singapore Weather Forecast

## About
The app shows the weather forecast in Singapore with name and forecast with the latitude and longitude of the location in each cards. The app feteches data from an API on the website [data.gov.sg](https://data.gov.sg/) where the user are able to filter out the any location using the Search box function that they want to know about the forecast of that specific area in Singapore.

-----------
## How does it work?
```
const [areaMetaData, setAreaData] = useState([]);
const [forecastData, setForecastData] = useState([]);

useEffect(() => {
  fetch('https://api-open.data.gov.sg/v2/real-time/api/two-hr-forecast')
      .then((res) => { return res.json(); })
      .then((myJSON) => {
        if (oriAreaData.length < 1) {
            oriAreaData = myJSON.data.area_metadata;
            setAreaData(oriAreaData);
        }

        if (oriForecastData < 1) {
            oriForecastData = myJSON.data.items[0].forecasts;
            setForecastData(oriForecastData);
        }
      })
}, []);
```
It uses both ```useState()``` ```useEffect()``` and ```fetch()``` functions to gather the data from the url. It uses the  ```useState()``` function to store the JSON array into the state called ```areaMetaData``` & ```forecastData``` when it's receives the extracted data from the response where will be set as a value of the state. We use the ```useEffect()``` function to render the data once and only re-run the data has any changes/

```
let oriAreaData = [];
let oriForecastData = [];

if (oriAreaData.length < 1) {
    oriAreaData = myJSON.data.area_metadata;
    setAreaData(oriAreaData);
}

if (oriForecastData < 1) {
    oriForecastData = myJSON.data.items[0].forecasts;
    setForecastData(oriForecastData);
}
```

```
const FilterData = (text) => {
  if (text != '') {
    let filteredAreaData = oriAreaData.filter((item) => item.name.includes(text));
    setAreaData(filteredAreaData);
  } else {
    setAreaData(oriAreaData);
  }
}
```
We create a variable called ```oriAreaData``` & ```oriForecastData``` to store the orignal data that we loaded from the API. If ```oriAreaData``` & ```oriForecastData``` are still an empty array, it will set the value of ```areaMetaData``` & ```forecastData``` as a value that has been fetched from the API and set it into ```oriAreaData``` & ```oriForecastData``` to store it once. To filter out a specific area/location of Singapore, we implemneted a ```FilterData()``` function into the Search input textbox which will be called by the onChangeText event. Once the ```FilterData()``` takes the text argumentfrom the search textbox, if the text is not an empty string, it'll filter out each of the item based on the text that has been keyed in where it sets the value of the list will be temporary filtered into the variable name ```filteredAreaData``` then it'll set the value of ```areaMetaData``` as that variable else it'll set the data backto the original JSON data loaded from the fetched URL.

-----------

## Screenshots

[<img src="https://github.com/user-attachments/assets/5c997c7c-b18e-4898-8991-ddd94526d795" width="265" height="572">](https://github.com/user-attachments/assets/5c997c7c-b18e-4898-8991-ddd94526d795)
[<img src="https://github.com/user-attachments/assets/8553b58f-77c0-47b7-8cf3-4f5a07c50462" width="265" height="572">](https://github.com/user-attachments/assets/8553b58f-77c0-47b7-8cf3-4f5a07c50462)
[<img src="https://github.com/user-attachments/assets/e674ddc1-fe64-4e57-8371-f54e72c113b7" width="265" height="572">](https://github.com/user-attachments/assets/e674ddc1-fe64-4e57-8371-f54e72c113b7)

-----------

## Video walkthorugh

[![Demo Recording w Voiceover](https://img.youtube.com/vi/9h5KLOIC8g8/0.jpg)](https://www.youtube.com/watch?v=9h5KLOIC8g8)
