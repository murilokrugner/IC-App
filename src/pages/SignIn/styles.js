import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    height: 100%; 
    flex-direction: column;

    justify-content: center;
    align-items: center;

    padding: 40px;
`;

export const BoxForm = styled.View`
    flex: 1;

    flex-direction: column;

    justify-content: center;
    align-items: center;

    
`;

export const BoxPassword = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: 30px;

`;

export const ClickPassword = styled.Text`
  color: #f08080;
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
    color: #f08080;
    font-size: 16px;
    font-family: 'RobotoSlab-Regular';
    margin-left: 16px;
`;