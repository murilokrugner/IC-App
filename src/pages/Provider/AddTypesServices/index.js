import React, {useState, useEffect} from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Box, TitleBox, BoxPicker, BoxButton, BoxServices, Service, ButtonNext } from './styles';

import {Picker} from '@react-native-community/picker';

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

const AddTypesServices = () => {
  const { dataAuth } = useAuth();

  const [selectService, setSelectService] = useState('        Selecione um serviço');
  const [loading, setLoading] = useState(false);
  const [loadingServices, setLoadingServices] = useState(false);
  const [services, setServices] = useState([
    {
      description : "Carregando...",
    },
  ]);

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      const response = await api.get('/services');

      setServices(response.data);

      setLoading(false);
    }

    loadServices();

  }, []);

  useEffect(() => {
    async function addService() {
      setLoadingServices(true);

      const response = await api.post('/serviceProvider', {
        "description": "",
        "id_provider": dataAuth.id,
        "service": selectService,
        "price": 0,
        "time": 0
      })
    
      setLoadingServices(false);
    }
  }, [selectService]);

  return (
    <Container>
      <Box>
        <TitleBox>Selecione os serviços que você ou sua empresa irá prestar</TitleBox>
        <TitleBox>Selecione até cinco serviços: </TitleBox>
        {loading ? (
          <ActivityIndicator color="#000" size="small" />
        ) : (
          <BoxPicker>         
            <Picker
              selectedValue={selectService}
              style={{height: 20, width: 300, color: '#666360'}}
              onValueChange={(itemValue, itemIndex) =>
                  setSelectService(itemValue)
              }>
                <Picker.Item key={"Estado"} label={"        Selecione um serviço"} value={"Estado"}/>                                 
                {services.map(item => (
                      <Picker.Item key={item.description} label={item.description} value={item.description}/>  
                ))}
            </Picker> 
          </BoxPicker>
        )} 
        <BoxServices>
          {loadingServices ? (
            <ActivityIndicator color="#000" size="small" />  
          ) : (
            <Service>Serviço selecionado</Service>
          )}          
        </BoxServices>
        <BoxButton>             
          <ButtonNext>Avançar</ButtonNext>
        </BoxButton>   
      </Box>  
    </Container>
  )
}

export default AddTypesServices;