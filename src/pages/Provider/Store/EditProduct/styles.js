import styled from 'styled-components/native';
import Button from '../../../../components/ButtonAuth';

export const Container = styled.View`
    flex: 1;
`;

export const BoxLoading = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;

`;

export const BoxForm = styled.View`
    padding: 20px;
    height: 100%;
`;

export const TitleInput = styled.Text`
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
`;

export const BoxPicker = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 20px;

  width: 100%;
  height: 50px;


`;

export const BoxButtons = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;

`;

export const ButtonSave = styled(Button)`
    width: 250px;
    margin-top: 20px;
`;

export const ButtonDelete = styled(Button)`
    width: 250px;
    background-color: #FA251F;

    margin-top: 20px;
`;