import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    height: 100%;
`;

export const Box = styled.View`
    flex-direction: column;
    align-items: center;
    height: 440px;
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

    margin-bottom: 20px;
`;

export const Name = styled.Text`
    font-size: 28px;
`;

export const Stars = styled.Image`
    width: 5px;
    height: 5px;
`;

export const TitleService = styled.Text`
    font-size: 20px;
    margin-left: 20px;
`;

export const BoxInformation = styled.View`
    margin-top: 10px;
    flex-direction: column;
    width: 350px;
    align-items: flex-start;

    padding: 20px;
`;

export const Price = styled.Text`
    font-size: 18px;
    margin-bottom: 10px;
`;

export const Time = styled.Text`
    font-size: 18px;

    margin-top: 10px;
`;

export const Line = styled.View`
    height: 1px;
    background-color: #235a5c;
    width: 100%;

    margin-bottom: 20px;
`;

export const Images = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: center;
    height: auto;

`;

export const BoxImages = styled.View`
    width: 350px;
    height: auto;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

`;

export const ImageService = styled.Image`
    width: 170px;
    height: auto;
    margin-left: 2px;
    margin-right: 3px;
    margin-bottom: 6px;
`;

export const BoxButtonMap = styled.View`
    flex-direction: row;
    justify-content: center;
`;

export const ButtonMap = styled(Button)`
    margin-top: 40px;
    width: 250px;
    height: 40px;
`;
