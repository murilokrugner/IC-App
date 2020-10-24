import styled from 'styled-components/native';

export const BoxSearch = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const BoxButtonFilter = styled.View`
  width: 32px;
  height: 32px;
`;

export const ButtonFilter = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
   width: 32px;
  height: 32px;
`;

export const ImageButtonFilter = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: 10px;
`;