import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Button from '../../../../components/ButtonAuth';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export const BoxLoading = styled.View`
  margin: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Box = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

export const TitleProduct = styled.Text`
  font-size: 20px;

  margin-top: 20px;
`;

export const TitleText = styled.Text`
  font-size: 18px;

  margin-top: 20px;
`;

export const BoxButtonAdd = styled.View`
    margin-top: 20px;
  
`;

export const ButtonAdd = styled(RectButton)`
  
`;

export const ButtonAddImage = styled.Image`
    width: 45px;
    height: 45px;
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

export const ContainerImage = styled.View`  
    width: 175px;
    height: 195px; 
    justify-content: center;
    align-items: center;
`;

export const ImageService = styled.Image`
    width: 170px;
    height: 170px;

    margin-bottom: 20px;

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

export const BoxButtonSave = styled.View`
  width: 200px;

  margin-top: 20px;
`;

export const ButtonSave = styled(Button)`
  width: 200px;
`;

export const BoxButtonCancel = styled.View`
  width: 200px;

  margin-top: 20px;
`;

export const ButtonCancel = styled(Button)`
  width: 200px;

  background-color: #EB1D0F;
`;