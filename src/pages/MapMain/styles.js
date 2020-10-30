import styled, {css} from 'styled-components/native';
import {Platform, Button} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

export const Box = styled.View`
  flex-direction: column;
  align-items: center;
`;

export const LocationBox = styled.View`
  flex-direction: column;
  align-items: center;
  background: #fff;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.1;
  elevation: 1;
  border: 1px solid #ddd;
  border-radius: 3px;
  flex-direction: row;
  ${Platform.select({
    ios: css`
      margin-top: 20px;
    `,
    android: css`
      margin-top: 15px;
      margin-left: 15px;
    `,
  })}
`;

export const LocationText = styled.Text`
  margin: 8px 10px;
  font-size: 14px;
  color: #333;
  width: 100px;
  flex-wrap: wrap;
`;

export const LocationTimeBox = styled.View`
  background: #222;
  padding: 3px 8px;
`;

export const LocationTimeText = styled.Text`
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

export const LocationTimeTextSmall = styled.Text`
  color: #fff;
  font-size: 10px;
  text-align: center;
`;

export const Back = styled.TouchableOpacity`
  position: absolute;
  top: ${Platform.select({ios: 60, android: 40})};
  left: 20px;
`;

export const ContainerDetails = styled.View`
  background: #fff;
  height: 300px;
  width: 100%;
  position: absolute;
  bottom: 0;
  shadow-color: #000;
  shadow-offset: 0 0;
  shadow-opacity: 0.2;
  /*shadow-radius: 10;*/
  elevation: 3;
  border: 1px solid #ddd;
  align-items: center;
  padding: 3px;
`;

export const TypeTitle = styled.Text`
  font-size: 20px;
  color: #222;
  margin-top: 5px;
`;

export const TypeDescription = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const TypeImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
  margin-top: 5px;
  
`;

export const RequestButton = styled.TouchableOpacity`
  background: #222;
  justify-content: center;
  align-items: center;
  height: 44px;
  align-self: stretch;
  margin-top: 20px;
`;

export const RequestButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 18px;
`;

export const BoxDetails = styled.View`
  margin-top: 15px;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;

  position: absolute;
  margin-left: 15px; 
`;

export const BoxButtonExit = styled(RectButton)`
  width: 50px;
  height: 50px;

`;

export const ButtonExitImage = styled.Image`
  width: 20px;
  height: 20px;

`;