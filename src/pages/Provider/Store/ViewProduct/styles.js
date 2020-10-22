import styled from 'styled-components/native';
import Button from '../../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
`;


export const BoxLoading = styled.View`
    flex-direction: row;
    justify-content: center;

    margin-top: 40px;
`;

export const BoxDescription = styled.View`
    margin: 10px;
    height: auto;
    width: 100%;
`;

export const Description = styled.Text`
    font-size: 25px;
    font-weight: bold;
`;

export const BoxPrice = styled.View`
    margin: 10px;
    height: auto;
    width: 100%;
`;

export const Price = styled.Text`
    font-size: 22px;    
`;

export const ForwardPrice = styled.Text`
    margin-top: 10px;
    font-size: 20px;
`;

export const BoxBrand = styled.View`
    margin: 10px;
    height: auto;
    width: 100%;
`;

export const Brand = styled.Text`
     font-size: 18px; 
`;

export const BoxNote = styled.View`
    margin: 10px;
    height: auto;
    width: auto;

    border: 1px;

    padding: 5px;
`;

export const TitleNote = styled.Text`
     font-size: 18px; 
     font-weight: bold;
`;

export const Note = styled.Text`
     font-size: 18px; 
`;

export const BoxEdit = styled.View`
   flex-direction: row;
   justify-content: center;
    padding: 10px;
`;

export const ButtonEdit = styled(Button)`
    width: 250px;
`;