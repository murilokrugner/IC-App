import React, {useState, useEffect} from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import { Container, Box, TitleBox, BoxPicker, BoxButton, BoxAlignServices, BoxServices, BoxSelectService, 
  Service, BoxDelService, DelService, ButtonNext } from './styles';

import {Picker} from '@react-native-community/picker';

import { useAuth } from '../../../hooks/auth';

import api from '../../../services/api';

import Delete from '../../../assets/delete.png';

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
  const [addServices, setAddServices] = useState();
  const [countServices, setCountServices] = useState();

  useEffect(() => {
    async function loadServices() {
      setLoading(true);
      const response = await api.get('/services');

      setServices(response.data);

      setLoading(false);
    }
  
    async function loadAddServices() {
      setLoadingServices(true);
      const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);

      setAddServices(response.data);

      setLoadingServices(false);

    }

    async function getCountServices() {
      const response = await api.get(`/servicesProviderRoutes?provider=${dataAuth.id}`);

      setCountServices(response.data.count);
    }

    loadServices();
    loadAddServices();
    getCountServices();

  }, []);

  useEffect(() => {
    async function loadAddServices() {
      try {
        setLoadingServices(true);   
        const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);    
              
        setAddServices(response.data);

        setLoadingServices(false);  
      } catch (error) {        
        setAddServices();
        setLoadingServices(false);
        return;
      }       
    }

    async function getCountServices() {
      const response = await api.get(`/servicesProviderRoutes?provider=${dataAuth.id}`);

      setCountServices(response.data.count);
    }

    async function addService() {
      setLoadingServices(true);

      if (countServices === 5) {
        Alert.alert('Você já adicionou 5 serviços');
        setSelectService('        Selecione um serviço');
        setLoadingServices(false);
        return;
      }

      const response = await api.post('/serviceProvider', {
        "description": "nda",
        "id_provider": dataAuth.id,
        "service": selectService,
        "price": 0,
        "time": 0
      })

      if (response.data.error === 'Esse serviço já existe cadastrado') {
        Alert.alert('O serviço selecionado já foi adicionado');
        setLoadingServices(false);
        setSelectService('        Selecione um serviço');
        return;
      }
    
      setLoadingServices(false);
      setSelectService('        Selecione um serviço');
      loadAddServices();
      getCountServices();
    }

    if (selectService !== '        Selecione um serviço') {
      addService();          
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
            <>
              {addServices === undefined ? (
                <></>
              ) : (
                <BoxAlignServices>
                  {addServices.map(item => (
                      <BoxSelectService key={item.id}>
                        <Service>{item.service.description}</Service>
                        <BoxDelService>
                          <DelService source={Delete}/>
                        </BoxDelService>                      
                      </BoxSelectService>                 
                  ))}
                </BoxAlignServices>
              )}  
            </>          
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