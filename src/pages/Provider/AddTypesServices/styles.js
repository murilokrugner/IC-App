import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';

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
    margin-top: 330px;
`;

export const BoxServices = styled.View`
    margin-top: 70px;

`;

export const Service = styled.Text``;

export const ButtonNext = styled(Button)`
    width: 200px;

`;