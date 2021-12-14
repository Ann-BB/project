import React, { useState } from 'react';

import { View, Text, TextInput, StyleSheet, Button } from 'react-native';

export default function App() {

  const Apikey = 'a2cfc81dcf75e395088366c2a75b4ddd';
  const [weatherData, setWeatherData] = useState([{}]);
  const [city, setCity] = useState("");
  
  const getWeather = (event) => {
    if (event.charCode === 13) {
      fetch(`api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=7&mode=json&APPID=${Apikey}`)
      .then(response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          setCity("")
        }
      )
    }
  }

    return (
      <View style={styles.container}>
        <TextInput style={styles.input}
          underlineColorAndroid="transparent"
          placeholder="Enter City...."
          placeholderTextColor="#9a73ef"
          onChange={e => setCity(e.target.value)}
          value={city} 
          onKeyPress={getWeather}/>
          
          {typeof weatherData.main === 'undefined' ? (
            <View>
              <Text>Welcome to weather app! </Text>
            </View>
          ) : (
            <View>
              <Text>{city}</Text>
              <Text>{weatherData.name}</Text>
              <Text>{weatherData.main.temp}F</Text>
              <Text>{weatherData.weather[0].main}</Text>
            </View>
          )}

        {weatherData.cod === "404" ? (
          <Text>Ooops... City not Found!</Text>
        ) : (
          <>
          </>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 23
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    marginTop: 20
  },
  submitButtonText: {
    color: 'white'
  },
  container1: {
    // flex: 1,
    // borderWidth: 1,
    alignItems: "center",
    justifyContent: "center"
    // paddingBottom: 20,
    // flexDirection: 'row'
  },
})