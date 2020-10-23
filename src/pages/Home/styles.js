import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import {Image, Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`;

export const BoxTitle = styled.View`
  width: 140px;
  padding: 20px;
  margin-left: 20px;

`;

export const Hello = styled.Text`
  font-size: 22px;
  color: #C2BCB8;
  font-weight: bold;
`;

export const Name = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #235A5C;
`;

export const BoxSearch = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const BoxButtonFilter = styled.View`
  width: 32px;
  height: 32px;
`;

export const ButtonFilter = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
   width: 32px;
  height: 32px;
`;

export const ImageButtonFilter = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: 10px;
`;

export const BoxMsg = styled.View`
  padding: 20px;
`;

export const Msg = styled.Text`
  font-size: 22px;
  font-weight: bold;  

  color: #235A5C;
`;

export const BoxServices = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 200px;

`;

export const ButtonService = styled(RectButton)`
  width: 200px;
  height: 200px;

  border-radius: 20px;
`;

export const Service = styled.View`
 background-color: #E3DCD0;
 margin: 10px;
 width: 180px;
 height: 180px;

 border-radius: 20px;

`;


export const BoxMsgFilter = styled.View`
  padding: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const BoxPicker = styled.View``;

export const BoxServicesMain = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;

`;

export const ButtonServiceMain = styled(RectButton)`
  width: 380px;
  height: 80px;
  border-radius: 20px;

  margin-bottom: 20px;
`;

export const ServiceMain = styled.View`
  background-color: #E3DCD0;
  margin: 10px;
  width: 360px;
  height: 70px;

  border-radius: 20px;

`;