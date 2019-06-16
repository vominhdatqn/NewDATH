import Home from '../Components/Home/Home';
import Transplants from '../Components/Transplants.js';
import Nearby from '../Components/Nearby.js';
import Message from '../Components/Message.js';
import Account from '../Components/Account/Account';
import Register from '../Components/Account/Register';
import Profile from '../Components/Profile';
import Splash from '../Components/Splash';
import PostLocation from '../Components/PostNews/PostLocation';
import PostInfo from '../Components/PostNews/PostInfo';
import PostUtility from '../Components/PostNews/PostUtility';
import PostConfirm from '../Components/PostNews/PostConfirm';
import {createStackNavigator,createAppContainer,createMaterialTopTabNavigator,createSwitchNavigator} from 'react-navigation';
import React from 'react';
import DetailHouse from '../Components/DetailHouse/DetailHouse'
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

const StackHome = createStackNavigator({
      Home:{
        screen:Home,
        navigationOptions:{
          header:null
        }
      },
      
      DetailHouse:{
        screen:DetailHouse,
        navigationOptions:{
          header:null
        }
      },
      PostLocation:{
        screen:PostLocation,
        navigationOptions:{
          header:null
        }
      },
      PostInfo:{
        screen:PostInfo,
        navigationOptions:{
          header:null
        }
      },
      PostUtility:{
        screen:PostUtility,
        navigationOptions:{
          header:null
        }
      },
      PostConfirm:{
        screen:PostConfirm,
        navigationOptions:{
          header:null
        }
      },

}) 
let HomeStack = createAppContainer(StackHome);
const StackPost = createStackNavigator({
  Transplants:{
    screen:Transplants,
    navigationOptions:{
      header:null
    }
  },
}) 
let TranStack = createAppContainer(StackPost);
const StackAuth = createStackNavigator({
 
  // HomeSearch:{
  //   screen:HomeSearch,
  //   navigationOptions:{
  //     header:null
  //   }
  // },
  Account:{
    screen:Account,
    navigationOptions:{
      header:null
    }
  },
  Register:{
    screen:Register,
    navigationOptions:{
      header:null
    }
  },


}) 
let AuthStack = createAppContainer(StackAuth);

const TabBottom = createMaterialTopTabNavigator(
{
    Home:HomeStack,
    Transplants:TranStack,
    Nearby:Nearby,
    Message:Message,
    Account:Profile,
},{ 
    defaultNavigationOptions: ({navigation}) => ({  
        tabBarIcon: ({ focused, tintColor,horizontal }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'Home') {
              iconName = `home-city${focused ? '' : '-outline'}`;
            } else if (routeName === 'Transplants') {
              iconName = `account-group${focused ? '' : '-outline'}`;
            } else if (routeName === 'Nearby') {
              iconName = `google-nearby${focused ? '' : ''}`;
            } else if (routeName ==='Message'){
              iconName = `facebook-messenger${focused ? '' : ''}`;
            }else if (routeName ==='Account'){
                iconName = `account-card-details${focused ? '' : ''}`;
              }
             return <Ionicons name={iconName} size={25} color={tintColor} />;
          },
        }),
       // tabBarLabel: 'Trang Chủ'.toLowerCase(),
       tabBarOptions: {
        activeTintColor: '#ffffff',
        indicatorStyle: {
          height: '100%',
          backgroundColor: '#089cfb'
        },
        // inactiveTintColor: '#ffffff',
        showIcon: true,
        showlabel: true,
        upperCaseLabel: false,
        labelStyle: {
          fontSize: 10,
          margin: 0,
          padding: 0,
        },

        style: {
          backgroundColor: '#004C7E',
        },
      },
      tabBarPosition: 'bottom',
      swipeEnabled: false,
      animationEnabled: false,
            });
 const  StackBottomApp = createAppContainer(TabBottom);

const AppNavigation = createSwitchNavigator({
  AuthLoading: Splash,
  Auth: AuthStack,
  Main: StackBottomApp
}, {
  initialRouteName: 'AuthLoading',
})

export default Root = createAppContainer(AppNavigation)
