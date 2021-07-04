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
    },
    flatListImage: {
      width:"90%",
      aspectRatio: 1,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10
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

    this.data = [
      {
        id: 0,
        url: "https://i.pinimg.com/564x/08/94/75/089475365c284288406baf7e5616dd64.jpg",
      },
      {
        id: 1,
        url: "https://i.pinimg.com/236x/4b/ee/eb/4beeebb760923f65d559e3486f1233c1.jpg",
      },
      {
        id: 2,
        url: "https://i.pinimg.com/564x/b7/a5/a8/b7a5a801d8b9476bad5906ad88347445.jpg"
      }
    ]
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

  renderItem = (item) => {
    console.log(item);
    console.log(item.item.url);
    return (
      <Image source={{uri:item.item.url}} style={ styles.flatListImage } />
    )
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
        <View style={ styles.main }>
          <FlatList
            data={this.data}
            renderItem={this.renderItem}
            style={{ display: this.state['showbility'] ? "" : "none" }}>
          </FlatList>
          <FlatList
            // data={this.data}
            // renderItem={this.renderItem}
            style={{ display: this.state['ability'] ? "" : "none" }}>
          </FlatList>
          <FlatList
            // data={this.data}
            // renderItem={this.renderItem}
            style={{ display: this.state['group'] ? "" : "none" }}>
          </FlatList>
        </View>
      </SafeAreaView>
    )
  }
}

export default ShowbilityHome;