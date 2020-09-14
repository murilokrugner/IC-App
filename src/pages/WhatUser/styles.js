import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`;

export const BoxSelect = styled.View`
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`;

export const BoxBorder = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: 0.5px;
  width: 160px;
  height: 150px;
  border-radius: 20px;

`;

export const BoxButton = styled(RectButton)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 150px;
`;

export const ImageBox = styled.Image`
  width: 64px;
  height: 64px;
`;

export const TitleBox = styled.Text`
  margin-top: 5px;
  font-size:  18px;
`;