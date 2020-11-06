import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;

    height: 100%;
`;

export const BoxTextServices = styled.View`
      
    margin-top: 20px;   

    width: 100%;
    height: 50px;   

    flex-direction: row;
    justify-content: center; 

    align-items: center;
    
`;

export const TextServices = styled.Text`
    font-size: 21px;

    font-weight: bold;
`;

export const BoxButtonAdd = styled(RectButton)`
    width: 35px;
    height: 35px;
    justify-content: center;
    align-items: center;
    margin-top: 4px;
    margin-left: 40px;
`;

export const ButtonAdd = styled.Image`
    width: 35px;
    height: 35px;
`;

export const BoxContainerServices = styled.View`
    margin-top: 20px;
    margin-bottom: 30px;
    height: auto;
`;

export const BoxLoading = styled.View`
    flex: 1;
    flex-direction: row;

    justify-content: center;
    align-items: center;
`;


export const BoxContainerService = styled.View`
    flex-direction: column;
    align-items: center;
    height: auto;
`;

export const BoxService = styled.View`
    border: 1px;
    border-radius: 20px;
    justify-content: center;
    width: 330px;
    height: 70px;
    margin-top: 20px;
`;

export const Service = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

export const NameService = styled.Text`
    font-size: 20px;
`;

export const ButtonEdit = styled(RectButton)`
    justify-content: center;
    align-items: center;
`;

export const ImageEdit = styled.Image`
    width: 24px;
    height: 24px;
`;