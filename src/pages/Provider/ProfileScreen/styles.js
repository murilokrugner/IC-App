import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    flex-direction: column;

`;

export const Box = styled.View`
    flex-direction: column;
    align-items: center;
    height: 560px;
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
    height: 95px;    

    margin-bottom: 40px;
`;

export const ImageStar = styled.Image`
    height: 40px;
    width: 90px; 
`;

export const ButtonNext = styled(Button)`
    width: 200px;
`;