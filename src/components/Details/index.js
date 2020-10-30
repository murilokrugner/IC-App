import React from 'react';
import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButton,
  RequestButtonText,
  Box,
  BoxButtonExit,
  ButtonExitImage
} from './styles';

import unisagrado from '../../assets/unisagrado.png';
import exitIcon from '../../assets/cancel.png';

export default function Details() {
  return (
    <Container>
      <TypeTitle>Faculdade Unisagrado</TypeTitle>
      <TypeDescription>Invista no seu futuro</TypeDescription>

      <TypeImage source={unisagrado} />
      <TypeTitle>Parcelas a partir de </TypeTitle>
      <TypeDescription>R$350 reais</TypeDescription>

      <RequestButton onPress={() => {}}>
        <RequestButtonText>SOLICITAR ORÇAMENTO</RequestButtonText>
      </RequestButton>
      <Box>
        <BoxButtonExit>
          <ButtonExitImage source={exitIcon}/>
        </BoxButtonExit>
      </Box>
    </Container>
  );
}