import React, {useState, useEffect} from 'react';
import { SafeAreaView, Alert, ActivityIndicator } from 'react-native';

import { Container, Box, TitleBox, BoxPicker, BoxButton, BoxAlignServices, BoxServices, BoxSelectService, 
  Service, BoxDelService, DelService, ButtonNext } from './styles';

import {Picker} from '@react-native-community/picker';
import { showMessage } from "react-native-flash-message";
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import api from '../../../services/api';

import Delete from '../../../assets/delete.png';

const AddTypesServices = () => {
  const { dataAuth } = useAuth();
  const navigation = useNavigation();

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
    showMessage({
      message: "Adicione os serviços :)",
      type: "info",
      duration: 5000,        
      titleStyle: {
          fontSize: 17,
          fontWeight: 'bold',
      },
      backgroundColor: '#f08080',
    });

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
        Alert.alert('Não foi possível carregar os items, tente novamente mais tarde');  
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
      try {
        setLoadingServices(true);

        if (countServices === 5) {
          showMessage({
            message: "Você já adicionou 5 serviços",
            type: "info",
            duration: 5000,        
            titleStyle: {
                fontSize: 17,
                fontWeight: 'bold',
            },
            backgroundColor: '#4D90F0',
          });
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
        });

      
        setLoadingServices(false);
        setSelectService('        Selecione um serviço');
        loadAddServices();
        getCountServices();  
      } catch (error) {
        showMessage({
          message: "O serviço selecionado já foi adicionado",
          type: "info",
          duration: 5000,        
          titleStyle: {
              fontSize: 17,
              fontWeight: 'bold',
          },
          backgroundColor: '#F03124',
        });
        setLoadingServices(false);
        setSelectService('        Selecione um serviço');
      }      
    }

    if (selectService !== '        Selecione um serviço') {
      addService();          
    }    
  }, [selectService]);

  async function handleDelete(id) {
    async function loadAddServices() {
      try {
        setLoadingServices(true);   
        const response = await api.get(`/serviceProvider?provider=${dataAuth.id}`);    
              
        setAddServices(response.data);

        setLoadingServices(false);  
      } catch (error) {      
        Alert.alert('Não foi possível carregar os items, tente novamente mais tarde');  
        setAddServices();
        setLoadingServices(false);
        return;
      }       
    }

    async function getCountServices() {
      const response = await api.get(`/servicesProviderRoutes?provider=${dataAuth.id}`);

      setCountServices(response.data.count);
    }

    try {
      setLoadingServices(true);
      const response = await api.delete(`serviceProvider?id=${id}`);

      loadAddServices();
      getCountServices();

      setLoadingServices(false);
    } catch (error) {
      showMessage({
        message: "Não foi possível excluir o serviço, tente novamente mais tarde",
        type: "info",
        duration: 5000,        
        titleStyle: {
            fontSize: 17,
            fontWeight: 'bold',
        },
        backgroundColor: '#F03124',
      });
      setLoadingServices(false); 
    }
  }

  function handleNext() {
    if (countServices === 0) {
      showMessage({
        message: "Adicione pelo menos um serviço",
        type: "info",
        duration: 5000,        
        titleStyle: {
            fontSize: 17,
            fontWeight: 'bold',
        },
        backgroundColor: '#4D90F0',
      });

      return;
    } else {
      navigation.navigate('CompleteServices');
    }
  }

  return (
    <SafeAreaView>
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
                          <BoxDelService onPress={() => {handleDelete(item.id)}}>
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
            <ButtonNext onPress={handleNext}>Avançar</ButtonNext>
          </BoxButton>   
        </Box>  
      </Container>
    </SafeAreaView>
  )
}

export default AddTypesServices;