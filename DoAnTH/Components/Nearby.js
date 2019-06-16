import React, { Component } from 'react'
import { Text, StyleSheet, View ,PermissionsAndroid,Platform,Image,Dimensions} from 'react-native'
import MapView,{PROVIDER_GOOGLE,Marker,Polyline } from "react-native-maps";
const locations = require('../locations.json');
var polyline = require('@mapbox/polyline');
const {width,height} = Dimensions.get('window');

export default class Nearby extends Component {
  constructor(props){
    super(props);
    this.state={
        latitude: 10.802033,
        longitude: 106.714659,
        locations: locations,
      
    }
    
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => this.setState({ latitude, longitude }, this.mergeCoords),
      (error) => console.log('Error:', error)
    )
    
    const { locations: [ sampleLocation ] } = this.state

    this.setState({
      desLatitude: sampleLocation.coords.latitude,
      desLongitude: sampleLocation.coords.longitude
    }, this.mergeCoords)
  }
 
  
   
    async getDirections(startLoc, desLoc) {
      try {
        const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM`)
        const respJson = await resp.json();
        const response = respJson.routes[0]
        const distanceTime = response.legs[0]
        const distance = distanceTime.distance.text
        const time = distanceTime.duration.text
        const points = polyline.decode(respJson.routes[0].overview_polyline.points);
        const coords = points.map(point => {
          return {
            latitude: point[0],
            longitude: point[1]
          }
        }
       
        )
        this.setState({ coords, distance, time })
      } catch(error) {
        console.log('Error: ', error)
      }
  }

   
  mergeCoords = () => {
    const {
      latitude,
      longitude,
      desLatitude,
      desLongitude
    } = this.state

    const hasStartAndEnd = latitude !== null && desLatitude !== null

    if (hasStartAndEnd) {
      const concatStart = `${latitude},${longitude}`
      const concatEnd = `${desLatitude},${desLongitude}`
      this.getDirections(concatStart, concatEnd)
    }
  }

  onMarkerPress = location => () => {
    const { coords: { latitude, longitude } } = location;
    console.log("Detination::::",location)
    this.setState({
      destination: location,
      desLatitude: latitude,
      desLongitude: longitude
    }, this.mergeCoords)
  }

  renderMarkers = () => {
    const { locations } = this.state
    return (
      <View>
        {
          locations.map((location, idx) => {
            const {
              coords: { latitude, longitude }
            } = location
            return (
              <Marker
                key={idx}
                coordinate={{ latitude, longitude }}
                onPress={this.onMarkerPress(location)}
              />
            )
          })
        }
      </View>
    )
  }
    render() {
      const {
        time,
        coords,
        distance,
        latitude,
        longitude,
        destination
      } = this.state
        if(latitude){

            return (
             <View style={{flex:1}}>
                <View style={{flex:1,flexDirection:'row'}}>
                <View
          style={{
           flex:1,
            paddingTop: 10,
            alignSelf: 'center',
            alignItems: 'center',
            height: height * 0.15,
            backgroundColor: 'white',
            justifyContent: 'flex-end',
          }}>
          <Text style={{ fontWeight: 'bold' }}>Estimated Time: {time}</Text>
          <Text style={{ fontWeight: 'bold' }}>Estimated Distance: {distance}</Text>
        </View>
        <View style={{flex:1}}>
        <Image
          source={{ uri: destination && destination.image_url }}
          style={{
            flex: 1,
            width:"100%",
            height: "100%",
          }}
        />
        </View>

                </View>
                
                <View style={{flex:3}}>
                <MapView
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
            style={{flex: 1}}
            initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1
          }}>
           
           
             {this.renderMarkers()}
                <Polyline 
                  strokeColor="red"
                  strokeWidth={2}
                coordinates = {coords}
                />
             
           </MapView>
             </View>
             </View>
                
          
          
            );
        }
        return (
            <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                <Text>We need your permission!</Text>
                {/* <Text>latitude:{latitude}</Text>
                <Text>longitude:{longitude}</Text> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    map: {
        flex: 1,
    }
});
// import React, { Component } from 'react'
// import { Text, StyleSheet, View ,PermissionsAndroid,Platform} from 'react-native'
// import MapView,{PROVIDER_GOOGLE,Marker,Polyline } from "react-native-maps";
// const locations = require('../locations.json');
// var polyline = require('@mapbox/polyline');


// export default class Nearby extends Component {
//   constructor(props){
//     super(props);
//     this.state={
//       region:{
//         latitude: 10.802112,
//         longitude: 106.714681,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//     },
//     marker:{
//         latitude: 10.802112,
//         longitude:106.714681,
//     },
//     locations:locations,
//     places:null,
//     keySearch:'Gong Cha Việt Nam',
//     radius:10000,
//     typeMap:'standard',
//     itemHotShop: null,
//     }
//   }
//   componentWillMount(){
//     this.MyLocation();
//     const {locations: [sampleLocation]} = this.state;
    
//     this.setState({
//       desLatitude: sampleLocation.coords.latitude,
//       desLongitude: sampleLocation.coords.longitude
    
//     },this.mergeCoords)
   
//   }
 
//     //https://maps.googleapis.com/maps/api/directions/json?origin=10.8671779,106.8012878&destination=10.780060,106.693410&key=AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM
//     async getDirections(startLoc, desLoc) {
//       try {
//         const resp = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM`)
//         const respJson = await resp.json();
//         console.log(`https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${desLoc}&key=AIzaSyAjL_doMA-BBX1S-Lx_BJXrPAjQCFh3UrM`)
//         const points = polyline.decode(respJson.routes[0].overview_polyline.points);
//         const coords = points.map(point => {
         
//           console.log("point 12 :"+point)
//           return {
//             latitude: point[0],
           
//             longitude: point[1]
//           }
          
//         }
       
//         )
//         this.setState({ coords })
//       } catch(error) {
//         console.log('Error: ', error)
//       }
//   }

//     MyLocation(){//giai quyet truoc khi tim vi tri cua ban
//       navigator.geolocation.getCurrentPosition((position)=>{
//           this.setState({
//               region:{
//                   latitude: position.coords.latitude,
//                   longitude: position.coords.longitude,
//                   latitudeDelta: 0.5,
//                   longitudeDelta: 0.5,
//               },
//               marker:{
//                   latitude: position.coords.latitude,
//                   longitude:position.coords.longitude,
//               }
//           },this.mergeCoords);
//           // this._map.animateToCoordinate(this.state.marker, 1000);
//           }
//       )
        
//      };
 
// mergeCoords = () => {
//   const {region,desLatitude,desLongitude} = this.state;
//   const hasStartAndEnd = region.latitude !== null && desLatitude !== null
//   if (hasStartAndEnd) {
//     const concatStart = `${region.latitude},${region.longitude}`
//     console.log(`concatStart:${region.latitude},${region.longitude}`);
//     console.log(`concatEnd:${desLatitude},${desLongitude}`)
//     const concatEnd = `${desLatitude},${desLongitude}`
//     this.getDirections(concatStart, concatEnd)
// }
// }

//     render() {
//       console.log("market:"+ this.state.marker.latitude)
//       console.log("market:"+ this.state.marker.longitude)
//         if(this.state.region.latitude){

//             return (
//                 <MapView
//                 // provider={PROVIDER_GOOGLE}
//                 showsUserLocation={true}
//             style={{flex: 1}}
//             initialRegion={this.state.region}>
            
//                 <Marker  coordinate={this.state.marker} />
//                 {/* <Polyline 
//                   strokeColor="red"
//                   strokeWidth={2}
//                 coordinates = {this.state.coords}
//                 /> */}
             
//            </MapView>
         
//             );
//         }
//         return (
//             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
//                 <Text>We need your permission!</Text>
//                 {/* <Text>latitude:{latitude}</Text>
//                 <Text>longitude:{longitude}</Text> */}
//             </View>
//         )
//     }
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#F5FCFF"
//     },
//     map: {
//         flex: 1,
//     }
// });

