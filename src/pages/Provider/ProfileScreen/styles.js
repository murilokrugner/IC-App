import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';


export const Container = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;

    height: 100%;

`;

export const Box = styled.View`
    flex-direction: column;
    align-items: center;
    height: 390px;
`;

export const BoxImageCover = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    
`;

export const ImageCover = styled.Image`
    width: 395px;
    height: 260px;
    border-radius: 20px;
`;


export const BoxPositionSelectPhoto = styled.View`
    flex: 1;
    flex-direction: column;
    width: 220px;
    height: 220px;
    align-items: flex-end;
    justify-content: flex-end;
    position: absolute;
`;

export const BoxSelectPhoto = styled(Button)`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;    
    background-color: #DED9DD;
    border-radius: 20px;

    margin: 10px;
`;

export const BoxImageSelectPhoto = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 30px;
    height: 30px; 
`;

export const SelectPhoto = styled.Image`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px; 
`;

export const BoxPhoto = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    flex-direction: column;
    align-items: center;
    margin-top: 150px;
`;

export const ImagePhoto = styled.Image`
    width: 220px;
    height: 220px;
    border-radius: 220px;

`;

export const BoxName = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;   

`;

export const Name = styled.Text`
    font-size: 28px;
`;


export const BoxStars = styled.View`  
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
    height: 55px;    

    margin-top: 10px;

`;

export const ImageStar = styled.Image`
    height: 40px;
    width: 90px; 
`;

export const ButtonNext = styled(Button)`
    width: 200px;
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

export const BoxContainerServices = styled.View`
    margin-top: 20px;
    margin-bottom: 30px;
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

export const BoxButtonExit = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const ButtonExit = styled(Button)`
    width: 250px;
    height: 40px;
    background-color: #FA251F;
    margin-top: 30px;
    margin-bottom: 10px;
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

export const Icon = styled(FeatherIcon)`
    color: #fff;
`;

export const Line = styled.View`
    height: 1px;
    background-color: #fff;
    width: 100%;
    margin-top: 10px;
`;
