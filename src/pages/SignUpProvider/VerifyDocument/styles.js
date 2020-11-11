import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
`;

export const Photo = styled.Image`
    width: 350px;
    height: 450px;

    border-radius: 15px;
`;

export const TextTitle = styled.Text`
    font-size: 22px;
    font-weight: bold;
    text-align: center;
`;

export const ButtonCancel = styled(Button)`
    width: 200px;
    height: 40px;

    background-color: #f04835;
`;

export const ButtonNext = styled(Button)`
    width: 200px;
    height: 40px;
`;
