import styled from 'styled-components/native';
import ButtonAuth from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 40px;
`;

export const BoxRadioTitle = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TextTitleRadio = styled.Text`
    font-size: 17px;
    margin-top: 10px;
`;

export const BoxRadio = styled.View`
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 330px;

    margin-top: 20px;
    margin-bottom: 20px;
`;

export const TextRadio = styled.Text`
    font-size: 16px;
`;

export const ButtonNext = styled(ButtonAuth)`
    width: 200px;
    height: 40px;
`;
