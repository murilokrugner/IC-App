import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    background-color: #235a5c;
    height: 100%;
    width: 100%;
`;

export const Preview = styled.View`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
`;

export const Capture = styled.TouchableOpacity`
    background-color: #fff;
    border-radius: 50px;
    padding: 15px;
    align-self: center;
    margin: 20px;
`;
export const Flash = styled.TouchableOpacity`
    background-color: #235a5c;
    border-radius: 50px;
    padding: 15px;
    align-self: center;
    margin: 20px;
`;

export const BoxButtons = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
    margin-left: 15px;
`;

export const ImageCapture = styled.Image`
    width: 32px;
    height: 32px;
`;
export const ImageFlash = styled.Image`
    width: 32px;
    height: 32px;
`;

export const BoxCapture = styled.View`
    width: 260px;
    flex-direction: row;
    justify-content: center;
`;

export const BoxFlash = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: flex-end;
    position: absolute;
`;

export const Box = styled.View`
    position: absolute;
    width: 350px;
    height: 500px;
    border: 5px;
    border-color: #235a5c;
    flex-direction: row;
    justify-content: center;
    margin-top: 50px;
    margin-left: 30px;
`;

export const TextBox = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-top: 10px;
    color: #fff;
`;

export const BoxLoading = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

export const ContainerTypeCamera = styled.View`

`;

export const ButtonTypeCamera = styled.TouchableOpacity`
    flex-direction: row;

    width: 36px;
    height: 36px;
`;

export const IconTypeCamera = styled.Image`
    width: 36px;
    height: 36px;
`;
