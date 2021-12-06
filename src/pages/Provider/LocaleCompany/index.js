import React, {useState, useEffect, Fragment} from 'react';
import {View, ActivityIndicator, StyleSheet, Image, Alert} from 'react-native';
import Search from './Search';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

import {
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
  Back,
  ContainerDetails,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
} from './styles';

import markerImage from '../../../assets/marker.png';
import backImage from '../../../assets/back.png';

import {getPixelSize} from '../../../util/utils';

import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

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

function LocaleCompany() {
  const { dataAuth } = useAuth();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState({});
  const [destination, setDestination] = useState(null);
  const [mapView, setMapView] = useState();
  const [duration, setDuration] = useState();
  const [location, setLocation] = useState();

  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
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

    Geolocation.getCurrentPosition(
      async ({coords}) => {
        setCoordinates(coords);
      },
      (error) => {
        console.log('Map' + error);
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
    );
  }, []);

  function handleBack() {
    setDestination(null);
  }

  function handleLocationSelected(data, {geometry}) {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    const title = data.structured_formatting.main_text;
    setDestination({latitude, longitude, title});
  }

  async function handleSaveLocation() {
    setLoadingLocation(true);
    try {
      const response = await api.put('user-location', {
        id: dataAuth.id,
        location_x: destination.latitude,
        location_y: destination.longitude,
      });

      Alert.alert('Localização salva');
      setLoadingLocation(false);

      navigation.navigate('CompleteRegister');

    } catch (error) {
      Alert.alert('Não foi possivel salvar sua localização, tente novamente mais tarde');
      setLoadingLocation(false);
    }
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFF" />
      ) : (
        <>
          {destination ? (
            <>
            <MapView
              initialRegion={{
                latitude: destination.latitude,
                longitude: destination.longitude,
                latitudeDelta: 0.0068,
                longitudeDelta: 0.0068,
              }}
              style={styles.map}
              showsUserLocation
              ref={(el) => setMapView(el)}
              loadingEnabled>
              {destination && (
                <Fragment>
                  <Marker
                    coordinate={destination}
                    anchor={{x: 0, y: 0}}
                    image={markerImage}>
                    <LocationBox>
                      <LocationText>{destination.title}</LocationText>
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
                <ContainerDetails>
                  <TypeTitle>{destination.title}</TypeTitle>
                  <RequestButton onPress={handleSaveLocation}>
                    {loadingLocation ? (
                      <ActivityIndicator color="#000" size="small" />
                    ) : (
                      <RequestButtonText>Salvar</RequestButtonText>
                    )}
                  </RequestButton>
                </ContainerDetails>
              </Fragment>
            ) : (
              <></>
            )}
          </>
          ) : (
            <Search onLocationSelected={handleLocationSelected} />
          )}
        </>
      )}
    </View>
  );
}

export default LocaleCompany;

