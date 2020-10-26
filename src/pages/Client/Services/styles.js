import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const BoxLocation = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const BoxFilters = styled.View`   
    width: 100%;
    height: 120px;

    
`;

export const Icon = styled(FeatherIcon)``;

export const Location = styled.Text`
    font-size: 20px;
`;