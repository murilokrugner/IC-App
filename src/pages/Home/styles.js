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
 flex-direction: column;
 justify-content: flex-start;
 align-items: center;
 background-color: #E8E6E3;
 margin: 10px;
 width: 180px;
 height: 180px;

 border-radius: 20px;

`;


export const ImageService = styled.Image`
  width: 130px;
  height: 120px;

  margin-top: 15px;

  border-radius: 50px;

`;

export const TitleService = styled.Text`
  font-size: 19px;
  font-weight: bold;
  margin-top: 10px;

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
    align-items: center;
`;

export const ButtonServiceMain = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #E8E6E3;
  margin: 10px;
  width: 360px;
  height: 100px;

  border-radius: 20px;
`;

export const ServiceMain = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #E8E6E3;
  margin: 10px;
  width: 300px;
  height: 100px;

  border-radius: 20px;

`;

export const BoxTextServiceMain = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;


  width: 150px;
`;

export const ImageServiceMain = styled.Image`
  width: 90px;
  height: 90px;

  border-radius: 50px;

`;

export const NameProvider = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const TitleServiceMain = styled.Text`
  font-size: 14px;
`;

export const PriceServiceMain = styled.Text`
  font-weight: bold;
`;


