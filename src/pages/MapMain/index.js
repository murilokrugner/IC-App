import React, {useState, useEffect, Fragment} from 'react';
import {View, ActivityIndicator, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Directions from '../../components/Directions';
import Geolocation from '@react-native-community/geolocation';
import Details from '../../components/Details';

import {
  Box,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from './styles';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import serviceIcon from '../../assets/customer-support.png';

import {getPixelSize} from '../../util/utils';

import api from '../../services/api';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    backgroundColor: '#235A5C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
});

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

function MapMain() {
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [destination, setDestination] = useState(null);
  const [cityLocation, setCityLocation] = useState(null);
  const [mapView, setMapView] = useState();
  const [duration, setDuration] = useState();
  const [location, setLocation] = useState();
  const [viewService, setViewService] = useState(false);


  useEffect(() => {    
    Geolocation.getCurrentPosition(
      async ({coords}) => {
        setCoordinates(coords);
      },
      (error) => {
        console.log('Map' + error);
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
    );
    Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        const response = await Geocoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        const city = response.results[5].formatted_address.split('-')[0];
        const location = address.substring(0, address.indexOf(','));

        setCityLocation(city);
        setLocation(location);        
      },
      (error) => {
        console.log('Map' + error);
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
    );    
    
  }, []);

  useEffect(() => {
    if (cityLocation !== null) {
      async function loadServices() {
        const responseServices = await api.get(`services-providers?city=${'Dois Córregos'}`);     
        
        setDestination(responseServices.data);
        
        setLoading(false);
      }

      loadServices();
    }
  }, [cityLocation])

  function handleViewService() {
    setViewService(true);
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <>
          <MapView
            initialRegion={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
              latitudeDelta: 0.0068,
              longitudeDelta: 0.0068,
            }}
            style={styles.map}
            showsUserLocation
            showsMyLocationButton={true}
            ref={(el) => setMapView(el)}
            loadingEnabled>
            {destination && (
              <>               
                  {destination.map(item => (                                      
                    <Fragment>                                        
                    <Marker
                        onPress={handleViewService}
                        coordinate={item}
                        anchor={{x: 0, y: 0}}
                        image={serviceIcon}>
                        <LocationBox>
                          <Box>
                            <LocationText>{item.title}</LocationText>                                                     
                          </Box>
                        </LocationBox>                        
                      </Marker>                                                                                                                    
                    </Fragment>                    
                  ))}
                    <Marker coordinate={coordinates} anchor={{x: 0, y: 0}}>
                        <LocationBox>                       
                          <LocationText>Você</LocationText>
                        </LocationBox>
                      </Marker>             
              </>
            )}
          </MapView> 
          {viewService && (
            <Fragment>
              <Details />
            </Fragment>
          )}            
        </>
      )}
    </View>
  );
}

export default MapMain;

