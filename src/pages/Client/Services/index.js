import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Container, BoxFilters, BoxLocation, Icon, Location, 
  ButtonFilter, TitleButtonFilter, BoxPicker, Line,
  BoxServices, Service, ImageService, NameService, Stars, ButtonView} from './styles';


import {Picker} from '@react-native-community/picker';

import Ecanador from '../../../assets/encanador.jpg';
import Startss from '../../../assets/starts.png';

const Services = () => {
  const [distance, setDistance] = useState(20);
  const [order, setOrder] = useState('Ordenar por: ');
  

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>        
          <Container>                              
              <BoxLocation>
                <Icon name="map-pin" size={20}/>
                <Location>Dois Córregos - SP</Location>
              </BoxLocation>     

              <BoxFilters>                                          
              <BoxPicker>
                <Picker
                    selectedValue={order}
                    style={{height: 20, width: 158, color: '#235A5C'}}
                    onValueChange={(itemValue, itemIndex) =>
                        setFilters(setOrder)
                  }>
                <Picker.Item key={"Ordenar por: "} label={"Ordenar por: "} value={"Ordenar por: "}/>  
                <Picker.Item key={"Nome"} label={"Nome"} value={"Nome"}/>                                 
                <Picker.Item key={"Avaliação"} label={"Avaliação"} value={"Avaliação"}/>                                 
                <Picker.Item key={"Preço"} label={"Preço"} value={"Preço"}/>                                 
                </Picker>
              </BoxPicker> 
              <ButtonFilter>
                  <TitleButtonFilter>Filtros</TitleButtonFilter>
              </ButtonFilter>                                          
            </BoxFilters> 
            <Line />   
            <BoxServices>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView>Ver</ButtonView>
                  </Service>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView>Ver</ButtonView>
                  </Service>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView>Ver</ButtonView>
                  </Service>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView>Ver</ButtonView>
                  </Service>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView>Ver</ButtonView>
                  </Service>
                  <Service>
                    <ImageService source={Ecanador}/>
                    <NameService>nome da empresa aqui</NameService>
                    <Stars source={Startss}/>
                    <ButtonView>Ver</ButtonView>
                  </Service>
            </BoxServices>                                                    
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Services;