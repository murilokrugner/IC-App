import styled from 'styled-components/native';
import {Dimensions} from 'react-native'
import Button from '../../../components/ButtonAuth';

const heightPerf = Math.trunc(parseInt(Dimensions.get('window').height));

console.log(heightPerf);

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;        
`;

export const BoxDistance = styled.View`   
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;    
    
`;

export const NameFilter = styled.Text`
    font-size: 18px;
    color: #235A5C;

    margin-top: 30px;
    
`;

export const BoxSlider = styled.View`
    flex-direction: column;
    align-items: center;
    height: 40px;
    
`;

export const DistanceSlider = styled.Text`
    font-size: 18px;
    color: #235A5C;
    
`;
export const ButtonApply = styled(Button)`
    width: 250px;
    height: 40px;

    margin-bottom: 20px;
`;