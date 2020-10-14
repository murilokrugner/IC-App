import React from 'react';
import { Text } from 'react-native';

import { Container, Box, ImageLogo, TextTitle, ButtonNext } from './styles';

import StoreIcon from '../../../assets/store.png';
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';

import api from '../../../services/api';

function Store() {
  const navigation = useNavigation();

  const { dataAuth } = useAuth();

  async function handleNext() {
    const response = await api.put(`store?id=${dataAuth.id}`);

    navigation.navigate('CreateProduct');
  }
  return (
    <Container>
        <Box>
        <ImageLogo source={StoreIcon}/>
        <TextTitle>Monte sua loja</TextTitle>   
        <ButtonNext onPress={handleNext}>Começar</ButtonNext>
        </Box>
    </Container>
  );
}

export default Store;