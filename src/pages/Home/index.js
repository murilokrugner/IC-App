import React from 'react';
import {ScrollView} from 'react-native';
import {Container, TitlePage, BoxServices, Box, TitleBox, ImageBox} from './styles';

import ElectrialIcon from '../../assets/electrical.jpg';
import CelularesIcon from '../../assets/celulares.jpg';
import DiaristaIcon from '../../assets/diarista.jpg';
import EncanadorIcon from '../../assets/encanador.jpg';
import FretesIcon from '../../assets/fretes.jpg';
import InformaticaIcon from '../../assets/informatica.jpg';
import JardineiroIcon from '../../assets/jardineiro.jpg';
import PedreiroIcon from '../../assets/pedreiro.jpg';
import PintorIcon from '../../assets/pintor.jpg';

function Home() {
  return(
    <Container>
      <TitlePage>Serviços</TitlePage>
      <BoxServices>
        <ScrollView style={{flex: 1}}>       
          <Box>
            <TitleBox>Eletricista</TitleBox>
            <ImageBox source={ElectrialIcon} />
          </Box>
          <Box>
            <TitleBox>Encanador</TitleBox>
            <ImageBox source={EncanadorIcon} />
          </Box>
          <Box>
            <TitleBox>Fretes</TitleBox>
            <ImageBox source={FretesIcon} />
          </Box>          
          <Box>
            <TitleBox>Pintor</TitleBox>
            <ImageBox source={PintorIcon} />
          </Box>
          <Box>
            <TitleBox>Diarista/Faxineira</TitleBox>
            <ImageBox source={DiaristaIcon} />
          </Box>
          <Box>
            <TitleBox>Pedreiro</TitleBox>
            <ImageBox source={PedreiroIcon} />
          </Box>
          <Box>
            <TitleBox>Jardineiro</TitleBox>
            <ImageBox source={JardineiroIcon} />
          </Box>
          <Box>
            <TitleBox>Informatíca</TitleBox>
            <ImageBox source={InformaticaIcon} />
          </Box>
          <Box>
            <TitleBox>Manutenção de Celulares</TitleBox>
            <ImageBox source={CelularesIcon} />
          </Box>
          </ScrollView>
        </BoxServices>     
    </Container>
  )
}

export default Home;