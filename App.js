import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, FlatList, Pressable, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
export default function App() {
  const [countriesData, setCountriesData] = useState([])
  function fetchCountriesData() {
    fetch('https://restcountries.eu/rest/v2/region/africa?fields=name;capital')
      .then((response) => response.json())
      .then((json) => setCountriesData(json))
      .catch((error) => console.error(error))
  }
  useEffect(()=> {
    fetchCountriesData();
  })
  return (
    <>
      <StatusBar style='light'/>
      <FlatList
        data={countriesData}
        contentContainerStyle={styles.container}
        keyExtractor={item => item.name}
        renderItem={({item})=> <Text onPress={() => {Alert.alert(`The Capital of ${item.name} is ${item.capital}`)}} style={styles.text}>{item.name}</Text>}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: '#483D8B'
  },
  text: {
    fontSize: 18,
    margin: 5,
    color: '#fff'
  },
});
