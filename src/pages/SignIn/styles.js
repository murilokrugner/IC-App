import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    height: 100%; 
    flex-direction: column;

    justify-content: center;
    align-items: center;

    padding: 30px;
`;

export const TitleBox = styled.Text`
  font-family: "";

  font-size: 30px;

  margin-top: 20px;

`;

export const BoxForm = styled.View`
    flex: 1;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    margin-top: 20px;

    
`;

export const BoxPassword = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;

`;

export const ClickPassword = styled.Text`
  color: #235A5C;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const CreateAccountButton = styled.TouchableOpacity`
  flex: 1;
  margin-top: 25px;
  width: 100%;
  height: 30px;
  left: 0;
  bottom: 0;
  right: 0;
  background: #fff;
  border-top-width: 1px;
  border-color: #fff;
  padding: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
    color: #235A5C;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;