import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Button from '../../../../components/ButtonAuth';

export const Container = styled.View`
  width: 100%;
  height: 100%;

`;

export const BoxLoading = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxTitle = styled.View`
  background-color: #235A5C;
  width: 100%;
  height: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;    
`;

export const TitleText = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  color: #fff;
`;

export const BoxFilters = styled.View`
  flex-direction: row;
  background-color: #fff;
  justify-content: space-around;
  align-items: center;    
  height: 55px;
`;

export const BoxOrder = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px;
  border-radius: 20px;
  border-color: #235A5C;
  width: 120px;
  height: 37px;
  
`;


export const OrderFilterTitle = styled.Text`
  font-size: 16px;
  color: #235A5C;
  
`;

export const Filters = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px;
  border-radius: 20px;
  border-color: #235A5C;
  width: 120px;
  height: 37px;

`;

export const ButtonFilters = styled(RectButton)`
    width: 120px;
    height: 37px;
    justify-content: center;
    align-items: center;
    border: 1px;
    border-radius: 20px;
    border-color: #235A5C;
`;

export const FilterTitle = styled.Text`
    font-size: 16px;
   color: #235A5C;
`;

export const BoxSelectFilters = styled.View`
    width: 100%;    
    height: 70px;

    padding: 10px;

`;

export const BoxButtonFilter = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px;
  border-radius: 20px;
  border-color: #235A5C;
  width: 120px;
  height: 37px;
  margin: 5px;
`;

export const ButtonFilter = styled.Text`
    font-size: 15px;
  color: #235A5C;
`;

export const Line = styled.View`
    width: 100%;
    height: 1px;
    background-color: #235A5C;
`;

export const ContainerProducts = styled.View`         
    flex-direction: row;
    margin-top: 15px;
    width: 100%;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    height: auto;

    margin-bottom: 160px;

`;

export const Product = styled.View`
    border: 5px;
    border-color: #fff;
    justify-content: flex-start;
    align-items: center;
    margin: 3px;
    width: 320px;
    height: 370px;
`;

export const ImageProduct = styled.Image`
    margin-top: 5px;
    width: 260px;
    height: 220px;
`;

export const ProductDescription = styled.Text`
    margin-top: 5px;
    padding: 10px;
    font-size: 14px;
`;

export const ProductPrice = styled.Text`    
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const ButtonViewProduct = styled(Button)`
    margin-top: 5px;
    height: 30px;
    width: 130px;
`;

export const BoxButtonAdd = styled.View`
  width: 35px;
  height: 35px;

  margin-right: 20px;
`;

export const ButtonAdd = styled(RectButton)`
  width: 35px;
  height: 35px;
`;

export const ButtonAddImage = styled.Image`
  width: 35px;
  height: 35px;

`;