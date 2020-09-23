import React, {useState, useEffect} from 'react';
import { Text } from 'react-native';

import { Container, Box, TitleBox, ButtonNext } from './styles';

import {Picker} from '@react-native-community/picker';

import api from '../../../services/api';

const AddTypesServices = () => {
  const [selectService, setSelectService] = useState('        Selecione um serviço');
  const [services, setServices] = useState({});

  useEffect(() => {
    async function loadServices() {
      const response = await api.get('/services');

      setServices(response.data);
    }

    loadServices();

  }, []);


  return (
    <Container>
      <Box>
        <TitleBox>Selecione os serviços que você ou sua empresa irá prestar</TitleBox>
        <TitleBox>Selecione até cinco serviços: </TitleBox>

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

        <ButtonNext>Avançar</ButtonNext>   
      </Box>  
    </Container>
  )
}

export default AddTypesServices;