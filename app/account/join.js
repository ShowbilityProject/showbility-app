
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

function JoinScreen({navigation}) {
    return (
      <View style={styles.container}>
        <View style={styles.joinScreen}>
          <TextInput style={styles.textinput} placeholder="이름"/>
          <TextInput style={styles.textinput} placeholder="이메일" />
          <TextInput style={styles.textinput} placeholder="(영문+숫자+특수문자 10자 이상" />
          <TextInput style={styles.textinput} placeholder="출생년도 (ex. 1990)" />
        </View>
        <View style={{ flex:0.5, padding: 20, flexDirection: 'row', alignItems: 'flex-end', borderBottomColor: "#DDDDDD", borderBottomWidth: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
            <View style={styles.circle}></View>
            <Text style={{ fontSize: 18 }}>서비스 이용약관 전체 동의</Text>
          </View>
        </View>
        <View style={{ flex:0.7, padding: 20 }}>
          <View style={{ flex:1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={[styles.circle]}></View>
            <Text style={{ fontSize: 15 }}>[필수] 이용약관 및 개인정보 처리방침</Text>
          </View>
          <View style={{ flex:1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.circle}></View>
            <Text style={{ fontSize: 15 }}>[선택] 마케팅 정보 수집 및 수신 동의</Text>
          </View>
        </View>
        <View style={{ flex:1.5, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableHighlight
            style={{ borderRadius: 5, backgroundColor: "#F7F7F7", width: "90%", alignItems: 'center', height: 52, justifyContent: 'center' }}>
              <Text>회원가입</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

export default JoinScreen;