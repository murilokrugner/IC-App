import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
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
  color: #235A5C;
`;

export const ButtonSubmit = styled(Button)``;