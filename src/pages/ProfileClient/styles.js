import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';


export const Container = styled.View`
    flex: 1;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`;

export const ButtonExit = styled(RectButton)`
    width: 100px;
    height: 100px;

`;

export const TitleButtonExit = styled.Text`
    font-size: 16px;
`;