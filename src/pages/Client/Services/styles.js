import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {RectButton} from 'react-native-gesture-handler';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
`;

export const LoadingLocation = styled.View`
    flex-direction: row;
    justify-content: center;
    width: 100%;

    margin-top: 10px;
`;

export const BoxLocation = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 35px;
    margin-top: 10px;
    margin-left: 10px;
    width: 100%;
`;

export const Icon = styled(FeatherIcon)`
    color: #235A5C;
    margin-left: 10px;
    margin-right: 10px;
`;

export const Location = styled.Text`
    font-size: 18px;
    color: #235A5C;

`;

export const BoxFilters = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 50px;
    width: 350px;

`;

export const BoxPicker = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 20px;
`;

export const ButtonFilter = styled(RectButton)`
    width: 57px;
    height: 20px;

    margin-top: 20px;
`;

export const TitleButtonFilter = styled.Text`
    font-size: 16px;

    color: #235A5C;
`;

export const Line = styled.View`
    background-color: #235A5C;
    width: 100%;
    height: 1px;
    margin-top: 15px;
`;

export const BoxServices = styled.View`
    margin-top: 20px;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 400px;

`;

export const Service = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    background-color: #C2BCB8;
    width: 320px;
    height: 240px;

    border-radius: 20px;

    margin-bottom: 20px;
`;

export const ImageService = styled.Image`
    margin-top: 20px;
    width: 120px;
    height: 120px;
    border-radius: 50px;
`;

export const NameService = styled.Text`
    font-size: 20px;
    margin-top: 30px;
`;

export const Stars = styled.Image`
    width: 100px;
    height: 100px;
`;

export const ButtonView = styled(Button)`
    width: 150px;
    height: 40px;

    margin-bottom: 22px;
`;

