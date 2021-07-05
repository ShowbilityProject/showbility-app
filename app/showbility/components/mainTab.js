import * as React from 'react';
import { FlatList, SafeAreaView, View, Text, StyleSheet, Image, Modal, Button } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';

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
      width: "100%"
    },
    flatListImage: {
      width:"90%",
      aspectRatio: 1,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10
    },
    modalCloseButton: {
      position: "absolute",
      right: 10,
      top: 60,
      width: 24,
      height: 24,
      flex: 1,
      backgroundColor: "#F85B02",
      borderRadius: 24,
      justifyContent: 'center'
    }
  })


class SHome extends React.Component {

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
      }
    }
    this.setState(st);
  } 

  showModalOnShowbilityItemPressed = (item) => {
    this.props.navigation.navigate('ContentsModal', item)
  }

  renderItem = (itemObject) => {
    let item = itemObject.item;
    return (
      <TouchableOpacity onPress={() => this.showModalOnShowbilityItemPressed(item)}>
        <Image source={{uri:item.url}} style={ styles.flatListImage } />
      </TouchableOpacity>
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

const MainHomeStack = createStackNavigator();

function ContentsModal({route, navigation}) {
  const item = route.params;
  const data = [item];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={(itemObject) => {
          let item = itemObject.item;
          return (
            <Image source={{uri:item.url}} style={{ width:"100%", aspectRatio: 1, marginBottom: 10 }} />
          )
        }}
      />
        <View
          style={styles.modalCloseButton}>
          <Text onPress={() => navigation.goBack()} style={{ color: 'white', alignSelf: 'center' }}>&#10005;</Text>
        </View>
    </SafeAreaView>
  )
}

function ShowbilityHome() {
  return (
    <MainHomeStack.Navigator mode="modal">
        <MainHomeStack.Screen
          name="Main"
          component={SHome}
          options={{ headerShown: false }}
        />
        <MainHomeStack.Screen
          name="ContentsModal"
          component={ContentsModal}
          options={{ headerShown: false }}
        />
      </MainHomeStack.Navigator>
  )
}

export default ShowbilityHome;