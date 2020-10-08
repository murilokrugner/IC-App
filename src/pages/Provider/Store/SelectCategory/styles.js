import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import Button from '../../../../components/ButtonAuth';
import {RectButton} from 'react-native-gesture-handler';
const widthPerf = Math.trunc(parseInt(Dimensions.get('window').width));
//const heightPerf = Math.trunc(parseInt(Dimensions.get('window').height));

export const Container = styled.View`
  align-items: center;
  height: 600px;
`;

export const BoxPicker = styled.View`
  flex-direction: column;
  align-items: center;

  margin-top: 60px;

  width: 100px;
  height: 100px;

`;

export const BoxLoading = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxCategories = styled.View`
  position: absolute;

`;

export const BoxAlignServices = styled.View`
    width: ${widthPerf};
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;    
`;


export const BoxSelectService = styled.View`
    width: 175;
    height: 45px;
    border-radius: 50px;
    background-color: #f08080;

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

export const BoxTextCategory = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const TextCategory = styled.Text`
  font-size: 18px;

  margin: 30px;
`;

export const BoxButtonNext = styled.View`
  margin-top: 200px;

`;

export const ButtonNext = styled(Button)`
  width: 150px;
`;

export const ContainerBox = styled.View`
  flex-direction: column;
  align-items: center;
  width: 300px;
`;