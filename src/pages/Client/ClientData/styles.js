import styled from 'styled-components/native';
import Button from '../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    padding: 20px;
`;

export const BoxLoading = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BoxForm = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

export const TitleInput = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const BoxPicker = styled.View`
  margin-top: 30px;
  flex-direction: row;
  justify-content: flex-start;
  margin-bottom: 30px;

`;

export const ButtonSave = styled(Button)`
  margin-top: 40px;
  width: 250px;
`;

export const Line = styled.View`
  width: 100%;
  height: 1px;
  background-color: #235A5C;

  margin-top: 30px;
`;