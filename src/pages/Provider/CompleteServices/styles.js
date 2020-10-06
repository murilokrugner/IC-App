import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  padding: 30px;
`;

export const BoxLoading = styled.View`
    flex: 1;
    flex-direction: row;

    justify-content: center;
    align-items: center;
`;

export const Box = styled.View`
    flex-direction: column;
    align-items: center;
    height: auto;
`;

export const BoxService = styled.View`
    border: 1px;
    border-radius: 20px;
    justify-content: center;
    width: 330px;
    height: 70px;
    margin-top: 20px;
`;

export const Service = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`;

export const NameService = styled.Text`
    font-size: 20px;
`;

export const ButtonEdit = styled(RectButton)`
    justify-content: center;
    align-items: center;
`;

export const ImageEdit = styled.Image`
    width: 24px;
    height: 24px;
`;

export const BoxButtonFinished = styled.View`
    flex-direction: row;
    justify-content: center;

    margin-top: 40px;
`;

export const ButtonFinished = styled(Button)`
    width: 200px;
`;