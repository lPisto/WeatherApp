import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TextInput, RefreshControl, SafeAreaView, ScrollView } from "react-native";
import React from "react";

var ubicacionURL =
  "https://api.freegeoip.app/json/?apikey=495cc340-a0da-11ec-996e-cd8a70e26bb8";

var CWeatherURL =
  "http://api.weatherapi.com/v1/current.json?key=a9e96160908f492d966202548220703 &q=Buenos Aires&aqi=no";

var FWeatherURL =
  "http://api.weatherapi.com/v1/forecast.json?key=a9e96160908f492d966202548220703 &q=Buenos Aires&days=3&aqi=no&alerts=no";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

const App = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [ubicacion, setUbicacion] = useState([]);
  const [sinput, setSInput] = useState();
  const [inputstate, setInputState] = useState(false);
  const [location, setLocation] = useState([]);
  const [time, setTime] = useState([]);
  const [condition, setCondition] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [state, setState] = useState(false);

  const loadData = async () => {
    await fetch(ubicacionURL)
      .then((response) => response.json())
      .then((json) => {
        setUbicacion(json);
      })
      .catch((error) => alert(error));

    await fetch(CWeatherURL)
      .then((response) => response.json())
      .then((json) => {
        setLocation(json.location);
        setTime(json.current);
        setCondition(json.current.condition);
      })
      .catch((error) => alert(error));

    await fetch(FWeatherURL)
      .then((response) => response.json())
      .then((json) => {
        setForecast(json.forecast.forecastday);
      })
      .catch((error) => alert(error));
  };

  useEffect(() => {
    loadData();
    return () => {
      setState(true);
    };
  }, []);

  var cityDetect = ubicacion.city;
  var searchInput = sinput;
  var input;

  if (state == true) {
    var change = () => {
      if (inputstate == false) {
        input = cityDetect;
      } else if (inputstate == true) {
        input = searchInput;
      }
    };

    var changeLocation = () => {
      change(),
        (CWeatherURL = CWeatherURL.replace("Buenos Aires", input)),
        (FWeatherURL = FWeatherURL.replace("Buenos Aires", input));
    };
    changeLocation();
  }
  // console.log(input)

  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor = "#ffffff"
          onSubmitEditing={(value) => {
            setSInput(value.nativeEvent.text), setInputState(true), onRefresh();
          }}/>
        <Text style={styles.text}>{location.name}</Text>
        <Text style={styles.text}>{condition.text}</Text>
        <Text style={styles.text}>{time.temp_c}°</Text>
      </ScrollView>
    </SafeAreaView>

    // <View style={styles.container}>
    //   <TextInput
    //     style={styles.searchInput}
    //     placeholder="Search"
    //     onSubmitEditing={(value) => {
    //       setSInput(value.nativeEvent.text), setInputState(true);
    //     }}
    //   />
    //   <Text style={styles.text}>{location.name}</Text>
    //   <Text style={styles.text}>{condition.text}</Text>
    //   <Text style={styles.text}>{time.temp_c}°</Text>
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
    color: '#ffffff',
    borderColor: "gray",
    width: "50%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 9,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
