import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";

var input = "";

const App = () => {
  var ubicacionURL =
  "https://api.freegeoip.app/json/?apikey=495cc340-a0da-11ec-996e-cd8a70e26bb8";

  const [weather, setWeather] = useState(input);
  const [sinput, setSInput] = useState(input);
  const [city, setCity] = useState(input);

  const [name, setName] = useState(input);

  const loadData = async () => {
    const Ubicacion = await fetch(ubicacionURL);
    const ubi = await Ubicacion.json().catch((err) => console.error(err));
    
    if (sinput == input){
      setCity(ubi.city);
    } 

    var weatherURL = `http://api.weatherapi.com/v1/forecast.json?key=a9e96160908f492d966202548220703&q=${city}&days=3&aqi=no&alerts=no`;

    const Weather = await fetch(weatherURL);
    const wea = await Weather.json().catch((err) => console.error(err));
    setWeather(wea)
    // console.log(weather.forecast.forecastday[0].day.maxtemp_c)
    console.log(weather.location.name)
  };
  
  useEffect(() => {
    loadData();
    setSInput(input);
    setName(weather.location.name);
  }, [city, weather]);
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        onSubmitEditing={(value) => {
          var searchInput = value.nativeEvent.text;
          setCity(searchInput);
        }}
      />
      <Text style={styles.text}>{name}</Text>
      {/* <Text style={styles.text}>{weather.current.condition.text}</Text> */}
      {/* <Text style={styles.text}>{weather.current.temp_c}°</Text> */}
    </View>

    // <View style={styles.container}>
    //   <TextInput
    //     style={styles.searchInput}
    //     placeholder="Search"
    //     onSubmitEditing={(value) => {
    //       setSInput(value.nativeEvent.text), setInputState(true);
    //     }}
    //   />
    //   {/* <Text style={styles.text}>{forecast[1].day.maxtemp_c}</Text> */}
    // </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "blue",
    fontSize: 20,
    fontWeight: "bold",
  },
  searchInput: {
    color: "#000000",
    borderColor: "gray",
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 9,
  },
  container: {
    flex: 1,
  },
});
