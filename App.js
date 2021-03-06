import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loading from "./Loading";
import * as Location from "expo-location";
import {Alert} from "react-native";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = "139108818f625343a28b54b7894b8844";

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getWeather = async(latitude, longitude) => {
    const {data: {main: {temp}, weather } } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    )
    console.log(this.data);
    this.setState({
      isLoading:false,
      temp,
      condition: weather[0].main
    });
  }

  getLocation = async() => {
    try {
      await Location.requestPermissionsAsync();
      const { coords: { latitude, longitude}} = await Location.getCurrentPositionAsync();
    this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("can't find you", "So sad");
    }
  }
  componentDidMount() {
    this.getLocation();
  }
  render() {
    const {isLoading, temp, condition } = this.state;
    return isLoading ? <Loading/> : <Weather temp = {Math.round(temp)} condition = {condition}/>;
  }
}

