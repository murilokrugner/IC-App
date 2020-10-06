import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;

  height: 100%;
`;

export const Box = styled.View`
  flex: 1;
  justify-content: flex-start;

  height: 100%;
`;

export const BoxComment = styled.View`
    flex-direction: row;
    justify-content: space-between;
    
    margin-top: 20px;

    width: 370px;
    height: 150px;
`;

export const UserAvatar = styled.Image`
  width: 80px;
  height: 80px;

  border-radius: 50px;
`;

export const BoxName = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

`;

export const Name = styled.Text`
  font-size: 20px;

  font-weight: bold;
`;

export const Comment = styled.View`
    background-color: #B8CAE3;
    margin-top: 5px;
    width: 275px;
    height: 140px;

    border-radius: 20px;

`;

export const Line = styled.View`
  height: 1px;
  background-color: #000;

  margin-top: 40px;
`;

export const ComentsText = styled.Text`
  margin: 10px;

  font-size: 16px;
  text-decoration: underline;
`;