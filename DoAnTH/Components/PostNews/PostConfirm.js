import React, { Component } from 'react'
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Alert,
  TextInput,
  AsyncStorage,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar
} from 'react-native';
// import pick from '../api/pick.js';
import TextField from '../../src/mobile/TextField';
import Button from '../../src/mobile/Button';
import Icon from 'react-native-vector-icons/MaterialIcons'
import axios from 'axios';
const { height } = Dimensions.get('window');
export default class PostConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
     phone: '',
     houseName: ``,
     note: '',
    }

  }

 componentDidMount() {
   this.onProcessHouseName();
 }


 onProcessHouseName = () => {
  const { location } = this.props.navigation.state.params;
   this.setState({
    houseName: `${location.township}, ${location.city}`,
   })
 }
 async uploadImageToServer() {
    const { uriImage, location } = this.props.navigation.state.params;
    const { URI, TYPE, NAME } = uriImage;
    const { township, city } = location;
    const formData = new FormData();

    formData.append('imgFile', {
      uri: URI.uri,
      type: TYPE.type,
      name: NAME.name,
    });
    fetch('http://192.168.1.252:3001/upload', {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    },
    body: formData
  })
  .then(response => console.log(response.json()))
      //  const response = await fetch('http://192.168.1.252:3001/upload', {
      // // const response = await fetch('http://192.168.1.15:3001/upload', {
      // // const response = await fetch('http://192.168.1.28:3001/upload', {
      //  method: 'POST',headers: {  
      //   "Content-Type": "multipart/form-data",
      //   } , body: data })
      // // const responseJson = await response.json();
      // // console.log(responseJson);

  }
  render() {
    const {
      phone, houseName, note,
    } = this.state;
    const { uriImage, location, infomation } = this.props.navigation.state.params;
    console.log(location);
    console.log(infomation);
    console.log(uriImage);
    console.log(houseName);
   
   
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={{ height: height * 0.1, flexDirection: 'row',backgroundColor: 'white', borderBottomWidth: 1, borderBottomColor: '#dddddd' }}>
        <View style={{ flex: 1,justifyContent:'center',alignItems: 'center' }}>
            <Icon  name="chevron-left" size={30} onPress={() => this.props.navigation.goBack()} />
            </View>
          <View style={{ flex: 3,justifyContent:'center' }}>
                <Text style={{ fontSize: 14,fontFamily:'Rotobo',fontWeight:'400',textAlign:'center'}}>Đăng phòng</Text>
            </View>
            <View style={{ flex: 1,justifyContent:'center' }}>
                <Text style={{ fontSize: 14,fontFamily:'Rotobo',fontWeight:'400',textAlign:'center'}}>Hủy</Text>
            </View>
        </View>
        <View style={{ height: height * 0.1, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#dddddd',alignItems:'center' }}>
          <View style={{flex:1,alignItems:'center',flexDirection:'row'}}>
            <View style={{flex: 1, justifyContent:'space-around'}}> 
                <View style={{height: 28,width:28,borderRadius:28,borderWidth:1}}>
                  <Icon  name="location-on" size={25} />
                </View>
                  <Text style={{fontSize:13}}>Vị trí</Text>
            </View>
            <View style={{flex: 1,borderTopWidth:1,borderColor:'blue'}}> 

            </View>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
          <View style={{height: 28,width:28,borderRadius:28,borderWidth:1}}>
              <Icon  name="info-outline" size={25} />
            </View>
              <Text style={{fontSize:13}}>Thông tin</Text>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
          <View style={{height: 28,width:28,borderRadius:28,borderWidth:1}}>
              <Icon  name="home" size={25} />
            </View>
              <Text style={{fontSize:13}}>Tiện ích</Text>
          </View>
          <View style={{flex:1,alignItems:'center'}}>
          <View style={{height: 28,width:28,borderRadius:28,borderWidth:1}}>
              <Icon  name="confirmation-number" size={25} />
            </View>
              <Text style={{fontSize:13}}>Xác nhận</Text>
          </View>
          
        </View>
          <ScrollView 
          keyboardShouldPersistTaps={'always'}
          style={{ height: height * 0.8, marginHorizontal:20}}
          showsVerticalScrollIndicator={false}
          >
            
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "position" : null}

              style={{ flex: 1 }}>
                
                <Text style={{ fontSize: 14, fontFamily: 'Rotobo', fontWeight: 'bold' }}>Xác nhận thông tin</Text>
                  <TextField
                    label="Số Điện Thoại"
                    inputProps={{
                      placeholder: 'Nhập số điện thoại của bạn!',
                      placeholderTextColor: '#b3b3b3',
                      value: phone,
                      onChangeText: phone => {
                        // this._onProcessEmailChange(email);
                        this.setState({ phone });
                      },
                    }}
                  />
                  <TextField
                    label="Tiêu Đề Bài Đăng"
                    inputProps={{
                      placeholder: `${location.township}, ${location.city}`,
                      placeholderTextColor: '#b3b3b3',
                      value: houseName,
                      onChangeText: houseName => {
                        // this._onProcessEmailChange(email);
                        this.setState({ houseName });
                      },
                    }}
                  />
                  <TextField
                    label="Nội Dung Mô Tả"
                    inputProps={{
                      placeholder: 'Ví dụ : Môi trường sống sạch an ninh...',
                      placeholderTextColor: '#b3b3b3',
                      value: note,
                      onChangeText: note => {
                        // this._onProcessEmailChange(email);
                        this.setState({ note });
                      },
                    }}
                  />
                  <View style={{marginBottom: 20}}>
                  <Button onPress={this.uploadImageToServer.bind(this)}>
                    Đăng phòng
                  </Button>
                  </View>
                  
            </KeyboardAvoidingView>
          </ScrollView>
</SafeAreaView>
        /* <TouchableOpacity onPress={this.show.bind(this)}>
            <Text>Select Image</Text>
          </TouchableOpacity> */
        /* {img} */

        



        /* <TouchableOpacity onPress={this.onProcessIn.bind(this)} style={{ height: 50, width: 50 }}>
            <Text>check</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.uploadImageToServer.bind(this)} style={{ height: 50, width: 50 }}>
            <Text>Upload Server</Text>
          </TouchableOpacity> */




      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
