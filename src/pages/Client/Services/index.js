import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';

import { Container, LoadingLocation, BoxFilters, BoxLocation, Icon, Location, 
  ButtonFilter, TitleButtonFilter, BoxPicker, Line,
  BoxServices, Service, ImageService, NameService, Stars, ButtonView} from './styles';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import {Picker} from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
import Ecanador from '../../../assets/encanador.jpg';
import Startss from '../../../assets/starts.png';

Geocoder.init('AIzaSyBIuZDy_cKsPTBfD2VG5XNV6Ty_SlsNlwk');

const Services = () => {
  const navigation = useNavigation();
  
  const [latitude, setLatitude] = useState('');
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [longitude, setLongitude] = useState('');
  const [coordinates, setCoordinates] = useState({});
  const [location, setLocation] = useState();

  const [order, setOrder] = useState('Ordenar por: ');

  useEffect(() => {
    Geolocation.getCurrentPosition(
      async ({coords}) => {
        setCoordinates(coords);
        setLatitude(coords.latitude);
        setLongitude(coords.longitude);
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
    );
    Geolocation.getCurrentPosition(
      async ({coords: {latitude, longitude}}) => {
        const response = await Geocoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        //const location = address.substring(0, address.indexOf(','));

        setLocation(address);    
        setLoadingLocation(false);        
      },
      (error) => {
        console.log(error);
      },
      {enableHighAccuracy: true, maximumAge: 10000, timeout: 10000},
    );
  }, []);

  function handleFilters() {
    navigation.navigate('Filters');
  }
  
  function handleViewService() {
    navigation.navigate('ViewService');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>        
          <Container>    
            {loadingLocation ? (
              <LoadingLocation>
                <ActivityIndicator color="#000" size="small"/>
              </LoadingLocation>
            ) : (
              <BoxLocation>
                <Icon name="map-pin" size={20}/>
                <Location>{location}</Location>
              </BoxLocation> 
            )}                                            
              <BoxFilters>                                          
              <BoxPicker>
                <Picker
                    selectedValue={order}
                    style={{height: 20, width: 158, color: '#235A5C'}}
                    onValueChange={(itemValue, itemIndex) =>
                      setOrder(itemValue)
                  }>
                <Picker.Item key={"Ordenar por: "} label={"Ordenar por: "} value={"Ordenar por: "}/>  
                <Picker.Item key={"Nome"} label={"Nome"} value={"Nome"}/>                                 
                <Picker.Item key={"Avaliação"} label={"Avaliação"} value={"Avaliação"}/>                                 
                <Picker.Item key={"Preço"} label={"Preço"} value={"Preço"}/>                                 
                </Picker>
              </BoxPicker> 
              <ButtonFilter onPress={handleFilters}>
                  <TitleButtonFilter>Filtros</TitleButtonFilter>
              </ButtonFilter>                                          
            </BoxFilters> 
            <Line />   
            <BoxServices>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView onPress={handleViewService}>Ver</ButtonView>
                  </Service>
            </BoxServices>                                                    
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Services;