import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';
import { Dimensions } from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
const widthPerf = Math.trunc(parseInt(Dimensions.get('window').width));
//const heightPerf = Math.trunc(parseInt(Dimensions.get('window').height));

export const Container = styled.View`
    flex:1;
    flex-direction: column;

    align-items: center;
`;

export const Box = styled.View`
    margin-top: 40px;
    flex-direction: column;
    align-items: center;

    height: 600px;   
`;

export const TitleBox = styled.Text`    
    margin: 20px;
    font-size: 20px;
    font-weight: bold;
`;

export const BoxPicker = styled.View`
    margin-top: 20px;
`;

export const BoxButton = styled.View`
    margin-top: 150px;
`;

export const BoxAlignServices = styled.View`
    width: ${widthPerf};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;    
`;

export const BoxServices = styled.View`
    margin-top: 70px;

`;

export const BoxSelectService = styled.View`
    width: 175;
    height: 45px;
    border-radius: 50px;
    background-color: #235A5C;

    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    padding: 20px;
    margin: 10px;
`;

export const BoxDelService = styled(RectButton)`
    justify-content: center;
    align-items: center;
    width: 25px;
    height: 25px;
`; 

export const DelService = styled.Image`
    width: 22px;
    height: 22px;
`;

export const Service = styled.Text`
    font-size: 16px;
    font-weight: bold;
    color: #fff;
`;

export const ButtonNext = styled(Button)`
    width: 200px;

`;