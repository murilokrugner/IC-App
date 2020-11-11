import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    width: 100%;
    height: 500px;
`;

export const ImageCaption = styled.Image`
    margin-top: 40px;
    width: 200px;
    height: 200px;
`;

export const TextTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: #235a5c;
`;

export const BoxTextCaptions = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: center;

    padding: 20px;
`;

export const TextCaptions = styled.Text`
    font-size: 16px;
    text-align: justify;
`;

export const ButtonNext = styled(Button)`
    width: 200px;
    height: 40px;
`;
