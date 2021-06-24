import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, TextInput, Image, Dimensions } from 'react-native';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    flexCenter: {
      alignItems: "center",
      justifyContent: "center",
    }
  })

function ShowbilityHome() {
    return (
      <View style={[styles.flexCenter, styles.container]}>
        <Text>ShobilityMain</Text>
      </View>
    )
}

export default ShowbilityHome;