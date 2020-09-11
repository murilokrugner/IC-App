import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 40px;
`;

export const BoxForm = styled.View`
    flex: 1;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    margin-top: 10px;
`;

export const BoxPassword = styled(RectButton)`
  margin-top: 20px;
  color: #fff;
  background-color: #fff;
`;

export const ClickPassword = styled.Text`
  color: #f08080;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;