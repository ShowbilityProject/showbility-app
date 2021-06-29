import * as React from 'react';
import { FlatList, SafeAreaView, Button, View, Text, StyleSheet, TextInput, Image, Dimensions } from 'react-native';
import { StatusBar } from 'react-native';
import { thisExpression } from '@babel/types';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    flexCenter: {
      alignItems: "center",
      justifyContent: "center",
    },
    tobBar: {
      marginLeft: 10,
      height: 52,
      width: "100%",
      flexDirection: 'row'
    },
    tobBarText: {
      fontFamily: "JejuGothicOTF",
      padding: 10,
      fontSize: 18,
      color: '#D5D5D6'
    },
    tobBarTextFocused: {
      color: '#000000',
      fontSize: 20
    },
    main: {
      flex:1,
      height: "100%",
      width: '100%'
    }
  })

class ShowbilityHome extends React.Component {

  constructor(props) {
    super(props);
    this.st = true;
    this.state = {
      'showbility': true,
      'ability': false,
      'group': false
    };
  }

  onPressTobText = (key) => {
    let st = this.state;
    if(!st[key]) {
      for(let k in st){
        if(k === key) {
          st[k] = true;
        }else {
          st[k] = false;
        }
        console.log(k, st[k])
      }
    }
    this.setState(st);
  } 

  render() {
    return (
      <SafeAreaView style={[styles.flexCenter, styles.container]}>
        <View style={ styles.tobBar }>
          <Text 
            style={ [styles.tobBarText, this.state['showbility'] ? styles.tobBarTextFocused : {} ] }
            onPress={() => this.onPressTobText('showbility')}
          >쇼빌리티</Text>
          <Text 
            style={ [styles.tobBarText, this.state['ability'] ? styles.tobBarTextFocused : {} ] }
            onPress={() => this.onPressTobText('ability')}
          >어빌리티</Text>
          <Text 
            style={ [styles.tobBarText, this.state['group'] ? styles.tobBarTextFocused : {} ] }
            onPress={() => this.onPressTobText('group')}
          >그룹</Text>
        </View>
        <FlatList style={ styles.main }>
          <Text>ShowbilityMain</Text>
        </FlatList>
      </SafeAreaView>
    )
  }
}

export default ShowbilityHome;