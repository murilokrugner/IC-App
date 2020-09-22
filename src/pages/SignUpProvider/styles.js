import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'
import FeatherIcon from 'react-native-vector-icons/Feather';

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
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
  color: #fff;
  background-color: #fff;
  margin-right: 20px;
`;

export const ClickPassword = styled.Text`
  flex-direction: row;
  justify-content: center;
  color: #f08080;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const BoxInputMask = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;  

`;

export const Icon = styled(FeatherIcon)`
  position: absolute;
  margin-left: 16px; 
  margin-bottom: 34px;
  left: 0;
  bottom: 0%;
  color: #f08080;
`;

export const BoxPicker = styled.View`
  width: 313px;
  height: 58px;

  background-color: #ECF6FF;
  border-radius: 10px;
  justify-content: center;
  align-items: center;

  margin-top: 5px;
  margin-bottom: 16px;  

`;