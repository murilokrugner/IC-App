import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    align-items: center;

    height: 100%;
`;

export const BoxTitleService = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const BoxForm = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const TitleService = styled.Text`
    margin-top: 20px;
    font-size: 18px;
    font-weight: bold;
`;

export const TextTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 10px;
`;

export const Line = styled.View`
    margin-top: 40px;
    background-color: #000;
    height: 1px;
`;

export const BoxTextImage = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 30px;

`;

export const TextImage = styled.Text`
    font-size: 18px;
`;

export const BoxAddImage = styled.View`
    flex-direction: row;
    justify-content: center;

    margin-top: 30px;
`;

export const ButtonAddImage = styled(RectButton)`
    width: 45px;
    height: 45px;
`;

export const ImageAdd = styled.Image`
    width: 45px;
    height: 45px;
`;

export const ContainerImage = styled.View`
    width: 175px;
    height: 195px; 
`;

export const BoxImages = styled.View`
    height: auto;
    width: 100%;
    margin-top: 40px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
`;

export const ImageService = styled.Image`
    width: 170px;
    height: 170px;

    margin-bottom: 20px;

`;

export const BoxButtonSave = styled.View`
    margin-top: 40px;
    flex-direction: row;
    justify-content: center;

    margin-bottom: 30px;
`;

export const ButtonSave = styled(Button)`
    width: 180px;

`;

export const BoxPositionDelete = styled.View`      
    flex-direction: row;
    width: 177px;
    height: 195px; 
    align-items: flex-start;
    justify-content: flex-end;    
    position: absolute;  
`;

export const BoxDelete = styled(RectButton)`
    width: 32px;
    height: 32px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center; 
    border-radius: 100px;

    background-color: #fff;
`;

export const ImageDelete = styled.Image`
    width: 32px;
    height: 32px;
`;