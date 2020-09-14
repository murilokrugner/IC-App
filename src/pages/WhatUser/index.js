import React from 'react';

import {Container, BoxSelect, BoxBorder, BoxButton, ImageBox, TitleBox} from './styles';

import { useNavigation } from '@react-navigation/native';

import Client from '../../assets/client.png';
import Worker from '../../assets/worker.png';

function WhatUser() {
  const navigation = useNavigation();

  return(
    <Container>
      <BoxSelect>
        <BoxBorder>        
          <BoxButton onPress={() => { navigation.navigate('SignUp') }}>
              <ImageBox source={Client}/>
              <TitleBox>Cliente</TitleBox>
            </BoxButton> 
          </BoxBorder>
          <BoxBorder>  
            <BoxButton onPress={() => { navigation.navigate('SignUpProvider') }}>
              <ImageBox source={Worker}/>
              <TitleBox>Prestador</TitleBox>
            </BoxButton> 
          </BoxBorder>
      </BoxSelect>
    </Container>
  )
}

export default WhatUser;