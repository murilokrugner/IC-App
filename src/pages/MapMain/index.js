import React, {useState, useEffect, Fragment} from 'react';
import {View, ActivityIndicator, StyleSheet, Button, Alert} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Directions from '../../components/Directions';
import Geolocation from '@react-native-community/geolocation';
import Details from '../../components/Details';

import JardineiroIcon from '../../assets/agriculture.png';

import {
  Box,
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
  BoxDetails,
  BoxButtonExit,
  ButtonExitImage
} from './styles';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';

import serviceIcon from '../../assets/customer-support.png';

import {getPixelSize} from '../../util/utils';

import api from '../../services/api';

import unisagrado from '../../assets/unisagrado.png';
import exitIcon from '../../assets/cancel.png';

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

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [numberAddress, setNumberAddress] = useState('');
  const [neighborhoodAddress, setNeighborhoodAddress] = useState('');
  const [price, setPrice] = useState('');
  const [time, setTime] = useState('');
  const [image, setImage] = useState('');



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

  async function handleViewService(id) {
    if (viewService === false) {
      setViewService(true);

      const response = await api.get(`usersMap?id=${id}`);

      console.log(response.data);

      setName(response.data.provider.name);
      setAddress(response.data.provider.address);
      setNumberAddress(response.data.provider.number_address);
      setNeighborhoodAddress(response.data.provider.neighborhood_address);
      setPrice(response.data.price);
      setTime(response.data.time);
      setImage(response.data.provider.avatar.url);

    } else {
      setViewService(false);
      setName();
      setAddress();
      setNumberAddress();
      setNeighborhoodAddress();
      setPrice();
      setTime();
      setImage();
    }
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
                        onPress={() => {handleViewService(item.provider.id)}}
                        coordinate={item.provider}
                        anchor={{x: 0, y: 0}}
                        image={item.service.description === 'Jardineiro' && JardineiroIcon}>
                        <LocationBox>
                          <Box>
                            <LocationText>{item.provider.title}</LocationText> 
                            <LocationText>{item.service.description}</LocationText>                                                      
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
            <ContainerDetails>
              <TypeTitle>{name}</TypeTitle>
              <TypeDescription>{address} {numberAddress}</TypeDescription>
              <TypeDescription>{neighborhoodAddress}</TypeDescription>
        
              <TypeImage source={{uri: image}} />
              <TypeTitle>Preço Médio: R$ {price}</TypeTitle>
              <TypeDescription>Tempo médio: {time} minutos</TypeDescription>
        
              <RequestButton onPress={() => {}}>
                <RequestButtonText>SOLICITAR ORÇAMENTO</RequestButtonText>
              </RequestButton>
              <BoxDetails>
                <BoxButtonExit onPress={handleViewService}>
                  <ButtonExitImage source={exitIcon}/>
                </BoxButtonExit>
              </BoxDetails>
            </ContainerDetails>
          )}            
        </>
      )}
    </View>
  );
}

export default MapMain;
