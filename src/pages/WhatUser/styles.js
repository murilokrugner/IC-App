import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

import Button from '../../components/ButtonAuth';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;

  justify-content: flex-start;
  align-items: center;
`;

export const Box = styled.View`
  margin-top: 100px;
  width: 370px;
  height: 400px;

  border: 1px;
  border-color: #CFD1D0;
  border-radius: 20px;

  background-color: #fff;

  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const BoxTitle = styled.Text`
  margin-top: 10px;
  font-size: 22px;

`;

export const Line = styled.View`
  margin-top: 10px;
  width: 100%;
  height: 0.5px;

  background-color: #235A5C;

`;

export const BoxImages = styled.View`
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  width: 370px;
  height: 300px;
`;

export const ButtonProvider = styled(RectButton)`

`;

export const ImageProvider = styled.Image`
  width: 350px;
`;

export const ButtonClient = styled(RectButton)`
  width: 350px;

`;

export const ImageClient = styled.Image`
  width: 350px;
`;