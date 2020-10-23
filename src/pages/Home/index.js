import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {Container, BoxTitle, Hello, Name, BoxSearch, 
  BoxButtonFilter, ButtonFilter, ImageButtonFilter, 
  BoxMsg, Msg, BoxServices, BoxServicesMain, ButtonServiceMain, ServiceMain,
  ButtonService, Service, BoxMsgFilter, BoxPicker} from './styles';
import {Picker} from '@react-native-community/picker';
import InputSearch from '../../components/InputSearch';
import ElectrialIcon from '../../assets/electrical.jpg';
import CelularesIcon from '../../assets/celulares.jpg';
import DiaristaIcon from '../../assets/diarista.jpg';
import EncanadorIcon from '../../assets/encanador.jpg';
import FretesIcon from '../../assets/fretes.jpg';
import InformaticaIcon from '../../assets/informatica.jpg';
import JardineiroIcon from '../../assets/jardineiro.jpg';
import PedreiroIcon from '../../assets/pedreiro.jpg';
import PintorIcon from '../../assets/pintor.jpg';

import FilterIcon from '../../assets/filter.png';

function Home() {
  const [search, setSearch] = useState();
  const [filters, setFilters] = useState();

  return (
    <Container>
      <ScrollView>     
      <BoxTitle>
        <Hello>Olá</Hello>
        <Name>Murilo</Name>
      </BoxTitle>
      <BoxSearch>
        <InputSearch name="search" icon="search" placeholder="Procure um serviço" returnKeyType="send"
          autoCorrect={true}
          autoCapitalize="none"
          value={search}
          onChangeText={setSearch}
        />
        <BoxButtonFilter>
          <ButtonFilter>
            <ImageButtonFilter source={FilterIcon}/>
          </ButtonFilter>
        </BoxButtonFilter>
      </BoxSearch>
      <BoxMsg>
        <Msg>Os mais populares</Msg>
      </BoxMsg>
      <BoxServices> 
        <ScrollView style={{flex: 1 }} horizontal={true}
            showsHorizontalScrollIndicator={false}>
          <ButtonService>
            <Service>

            </Service>
          </ButtonService>
          <ButtonService>
            <Service>

            </Service>
          </ButtonService>
          <ButtonService>
            <Service>

            </Service>
          </ButtonService>
          <ButtonService>
            <Service>

            </Service>
          </ButtonService>
        </ScrollView>        
      </BoxServices>
      <BoxMsgFilter>
        <Msg>Serviços para você</Msg>
        <BoxPicker>
           <Picker
               selectedValue={filters}
               style={{height: 20, width: 120, color: '#235A5C'}}
               onValueChange={(itemValue, itemIndex) =>
                   setFilters(itemValue)
            }>
               <Picker.Item key={"Popular"} label={"Popular"} value={"Popular"}/>                                 
              </Picker>
            </BoxPicker>
      </BoxMsgFilter>
      <BoxServicesMain>
        <ButtonServiceMain>
          <ServiceMain>

          </ServiceMain>
        </ButtonServiceMain>
        <ButtonServiceMain>
          <ServiceMain>

          </ServiceMain>
        </ButtonServiceMain>
      </BoxServicesMain>
      </ScrollView>
    </Container>
  )
}

export default Home;