import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';
import axios from 'axios';

export default function App() {
  const API_URL = 'http://63d8f155219e.ngrok.io/';

  const [currentNumber, setCurrentNumber] = useState();
  var newNumber = Math.ceil(Math.random() * (9999 - 1) + 1);

  const loadCurrent = () => {
    axios.get(API_URL + 'api/config').then((result) => {
      setCurrentNumber(result.data.data.config)
    })
  }

  const setNewValue = () => {
    let form = new FormData();
    form.append("config", newNumber);


    axios.post(
      API_URL + 'api/config',
        form
      ).then((result) => {
      setCurrentNumber(result.data.data.config)
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      Current Number {currentNumber} <br />
      New Random Number {newNumber}
      <Button
        title={`Get current value from backend`}
        onPress={loadCurrent}
      ></Button>
      <br />
      <Button
        title={`Set new value ${newNumber}`}
        onPress={setNewValue}
      ></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
