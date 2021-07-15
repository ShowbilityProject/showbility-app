
import * as React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TextInput } from 'react-native';

const styles = StyleSheet.create({
    fontStyle: {
      fontFamily: "JejuGothicOTF"
    },
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    centerContaier: {
      flex: 9,
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'JejuGothicOTF'
      // backgroundColor: 'yellow'
    },
    buttonsContainer: {
      flex: 1.3,
      flexDirection: "row",
      justifyContent: 'center',
      // backgroundColor: 'green'
    },
    accountContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'red'
    },
    joinContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      fontSize: 30
    },
    footerContainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      // backgroundColor: 'blue',
      fontSize: 10
    },
    button: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FFFFFF",
      padding: 10,
      width: "90%",
      height: "80%",
      borderWidth: 1,
      borderRadius: 5,
      borderColor: "#DDDDDD"
    },
    flexCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
    joinScreen: {
      flex: 2,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: "#FFFFFF",
      paddingTop: 30
    },
    textinput: {
      fontFamily: 'JejuGothicOTF',
      width: "90%",
      height: 60,
      borderBottomColor: "#DDDDDD",
      borderBottomWidth: 1,
      marginBottom: 20,
      fontSize: 17
    },
    circle: {
      height: 26,
      width: 26,
      borderRadius: 26/2,
      borderColor: "#DDDDDD",
      borderWidth: 1,
      marginRight: 10
    }
  })



  function EmailLoginScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start', backgroundColor: "#FFFFFF" }}>
        <TextInput
          style={styles.textinput}
          placeholder="이메일"
          keyboardType="email-address"
        />
        <TextInput 
          style={styles.textinput}
          placeholder="비밀번호"
          secureTextEntry={ true }
        />
        <TouchableHighlight
          style={[styles.flexCenter, styles.fontStyle, { width: '90%', height: 52, backgroundColor: "#F7F7F7"}]}>
            <Text styles={{ color: "#D8D8D8" }}>로그인</Text>
        </TouchableHighlight>
      </View>
    );
  }

export default EmailLoginScreen;