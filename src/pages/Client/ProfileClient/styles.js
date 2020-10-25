import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`;

export const BoxMenu = styled.View`
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: #235A5C;

    height: 200px;
    width: 350px;

    border-radius: 10px;

    margin-bottom: 20px;
`;

export const BoxOption = styled(RectButton)`
    
    margin-top: 10px;
    width: 320px;
    height: 30px;
`;

export const BoxSelect = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-left: 20px;
    width: 300px;
`;

export const TitleOption = styled.Text`
    font-size: 20px;
    color: #fff;

`;

export const Line = styled.View`
    height: 1px;
    background-color: #fff;
    width: 100%;
    margin-top: 10px;
`;

export const Icon = styled(FeatherIcon)`
    color: #fff;
`;

