import React from 'react';
import { Text } from 'react-native';

import { Container, Box, ImageLogo, TextTitle, ButtonNext } from './styles';

import StoreIcon from '../../../assets/store.png';

import { useNavigation } from '@react-navigation/native';

function Store() {
  const navigation = useNavigation();

  function handleNext() {
    navigation.navigate('SelectCategory');
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