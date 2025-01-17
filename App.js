import {StyleSheet, Text, View, FlatList, TextInput, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useState, useEffect } from 'react';

let oriAreaData = [];
let oriForecastData = [];
export default function App() {
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

  const FilterData = (text) => {
    if (text != '') {
      let filteredAreaData = oriAreaData.filter((item) => item.name.includes(text));
      setAreaData(filteredAreaData);
    } else {
      setAreaData(oriAreaData);
    }
  }

  const renderItem = ({ item, index }) => {
    const forecastInfo = forecastData.find((forecast) => forecast.area === item.name);
    const iconCloudy =
        forecastInfo.forecast === 'Partly Cloudy (Day)' ? <Icon name={'weather-partly-cloudy'} size={15}/> :
        forecastInfo.forecast === 'Showers' ? <Icon name={'weather-pouring'} size={15}/> : <Icon name={'weather-sunny'} size={15}/> ;

    return (
      <View style={styles.container}>
        <Text style={styles.textInfo}>
            <Icon name={'map-marker-outline'} size={15}/> {item.name}, {'\n'}
            {iconCloudy} {forecastInfo.forecast} {'\n'}
            <Icon name={'latitude'}/>{item.label_location.latitude}, <Icon name={'longitude'}/>{item.label_location.longitude}
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{marginTop: 30, marginBottom: 110, backgroundColor: 'ivory'}}>
        <View style={{backgroundColor: 'lavender'}}>
            <Text style={styles.header}>2-hour Weather Forecast</Text>
            <Text style={{fontWeight: 'bold'}}>Search:</Text>
            <TextInput style={styles.searchBox} onChangeText={(text) => {FilterData(text)}} placeholder={'Search a region in Singapore'}/>
        </View>
        <FlatList data={areaMetaData} renderItem={renderItem} numColumns={3}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 6,
        marginVertical: 5,
    },

    textInfo: {
        borderWidth: .2,
        borderRadius: 5,
        textAlign: 'center',
        width: 125,
        backgroundColor: 'snow',
        height: 100,
        elevation: 4,
        textAlignVertical: 'center'
    },

    searchBox: {
        borderWidth: .9,
        marginHorizontal: 10,
        marginBottom: 5,
        borderRadius: 5,
        backgroundColor: 'whitesmoke',
    },

    header: {
        fontSize: 30,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});
