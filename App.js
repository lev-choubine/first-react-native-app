import React from 'react';
import { StyleSheet, Text, FlatList} from 'react-native';

export default function App() {
  const countriesData = [{"name":"Afghanistan"},{"name":"Åland Islands"},{"name":"Albania"},{"name":"Algeria"}]

  return (
    <FlatList
      data={countriesData}
      contentContainerStyle={styles.container}
      keyExtractor={item => item.name}
      renderItem={({item})=> <Text style={styles.text}>{item.name}</Text>}
    />
  );
}

const styles = StyleSheet.create({
    container: {
    paddingTop: 30,
  },
    text: {
      fontSize: 20,
      margin: 10
    },
});
