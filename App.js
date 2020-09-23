import React,{Component} from "react";
import { View, Text } from "react-native";
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Cart from './Components/Cart'
import List from './Components/List'
export default class App extends Component{
  render(){
    return(
   
          <AppContainer/>
 
    )
  }

}

const AppNavigator=createStackNavigator({
  List: {
    screen: List
  }
  ,
  Cart: {
    screen: Cart
  }
},
{
headerMode:"screen",


}
);

const AppContainer=createAppContainer(AppNavigator)