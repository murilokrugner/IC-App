
import React, {useState, useEffect, Fragment} from 'react';
import {View, ActivityIndicator, StyleSheet, Image} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Directions from '../../components/Directions';
import Geolocation from '@react-native-community/geolocation';
import Details from '../../components/Details';
import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
} from './styles';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import {getPixelSize} from '../../util/utils';

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

const MapMain = () => {
  const { dataAuth } = useAuth();

  const [loading, setLoading] = useState(true);

  const [locale, setLocale] = useState({});

  const [coordinates, setCoordinates] = useState({});
  const [destination, setDestination] = useState(null);
  const [destination2, setDestination2] = useState(null);
  const [mapView, setMapView] = useState();
  const [duration, setDuration] = useState();
  const [location, setLocation] = useState();


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
        const location = address.substring(0, address.indexOf(','));

        setLocation(location);
        setLoading(false);
      },
      (error) => {
        console.log('Map' + error);
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
    );    
    
    //aqui vai pegar a localização do cliente;
    const latitude = -22.3709947;
      const longitude = -48.3870517;
      const title = 'SIMBOLUS';
      
      setDestination({latitude, longitude, title});

      function teste() {
        const latitude = -22.3637372;
      const longitude = -48.3873279;
      const title = 'MINATEL';
      
      setDestination2({latitude, longitude, title});
      }

      teste();

  }, []);

  function handleBack() {
    setDestination(null);
  }

  
  /*useEffect(() => {
    async function loadProviders() {
      const user = await api.get(`users?id=${dataAuth.id}`);

      const response = await api.get('services-providers', {
        city: user.city,
      });

      const latitude = user.latitude;
      const longitude = user.longitude;
      const title = user.name;

      setLocale({latitude, longitude, title});

      setLoading(false);
    }

    //loadProviders();
  })*/


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
            ref={(el) => setMapView(el)}
            loadingEnabled>
            {destination && (
              <Fragment>
                <Directions
                  origin={coordinates}
                  destination={destination}
                  onReady={(result) => {
                    setDuration(Math.floor(result.duration)),
                      mapView.fitToCoordinates(result.coordinates, {
                        edgePadding: {
                          right: getPixelSize(50),
                          left: getPixelSize(50),
                          top: getPixelSize(50),
                          bottom: getPixelSize(350),
                        },
                      });
                  }}
                />
                <Marker
                  coordinate={destination}
                  anchor={{x: 0, y: 0}}
                  image={markerImage}>
                  <LocationBox>
                    <LocationText>{destination.title}</LocationText>
                  </LocationBox>
                </Marker>
                <Marker
                  coordinate={destination2}
                  anchor={{x: 0, y: 0}}
                  image={markerImage}>
                  <LocationBox>
                    <LocationText>{destination2.title}</LocationText>
                  </LocationBox>
                </Marker>
                <Marker coordinate={coordinates} anchor={{x: 0, y: 0}}>
                  <LocationBox>
                    <LocationTimeBox>
                      <LocationTimeText>{duration}</LocationTimeText>
                      <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                    </LocationTimeBox>
                    <LocationText>{location}</LocationText>
                  </LocationBox>
                </Marker>
              </Fragment>
            )}
          </MapView>

          {destination ? (
            <Fragment>
              <Back onPress={handleBack}>
                <Image source={backImage} />
              </Back>
              <Details />
            </Fragment>
          ) : (        
            <></>
          )}
        </>
      )}
    </View>
  );
}

export default MapMain;