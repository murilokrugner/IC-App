import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  flex: 1;

  align-items: center;
  justify-content: center;

`;

export const ImageLogo = styled.Image`    
    justify-content: center;
    align-items: center;

    width: 150px;
    height: 150px;
`;

export const TextTitle = styled.Text`
    margin-top: 20px;
    font-size: 25px;
    font-weight: bold;
`;

export const ButtonNext = styled(Button)`
    width: 150px;
    margin-top: 20px;
`;