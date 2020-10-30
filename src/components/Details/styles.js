import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  background: #fff;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  /*shadow-radius: 10;*/
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 10px;
`;

export const TypeTitle = styled.Text`
  font-size: 20px;
  color: #222;
`;

export const TypeDescription = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const TypeImage = styled.Image`
  height: 80px;
  width: 300px;
  border-radius: 10px;
  margin: 10px 0;
`;

export const RequestButton = styled.TouchableOpacity`
  background: #222;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 10px;
`;

export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const Box = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;

  position: absolute;
  margin-left: 15px; 
`;

export const BoxButtonExit = styled(RectButton)`
  width: 50px;
  height: 50px;

`;

export const ButtonExitImage = styled.Image`
  width: 20px;
  height: 20px;

`;