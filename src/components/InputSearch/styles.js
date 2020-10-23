import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 290px;
  height: 50px;
  padding: 0 16px;
  background: #ECF6FF;
  border-radius: 20px;
  margin-top: 5px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-family: 'Roboto-Regular';
`;

export const Icon = styled(FeatherIcon)`
  color: #235A5C;
`;