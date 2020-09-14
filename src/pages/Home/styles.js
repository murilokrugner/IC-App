import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import {Image, Dimensions } from 'react-native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TitlePage = styled.Text`
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
`;

export const BoxServices = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled(RectButton).attrs({
  borderless: false,
})`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  margin-bottom: 10px;
`;

export const TitleBox = styled.Text`
  font-size: 20px;
  margin-bottom: 5px;
`;

export const ImageBox = styled(Image)`
  /*Dimensions.get('window').width;*/
  width: 355px;
  height: 110px;
  border-radius: 10px;
`;


