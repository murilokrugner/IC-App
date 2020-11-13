import React, { useState } from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import {
    Container,
    BoxTitle,
    Hello,
    Name,
    BoxMsg,
    Msg,
    BoxServices,
    BoxServicesMain,
    ButtonServiceMain,
    ServiceMain,
    ButtonService,
    ImageService,
    TitleService,
    Service,
    BoxMsgFilter,
    BoxPicker,
    ImageServiceMain,
    BoxTextServiceMain,
    NameProvider,
    TitleServiceMain,
    PriceServiceMain,
} from './styles';
import { Picker } from '@react-native-community/picker';
import { useNavigation } from '@react-navigation/native';
//import Icon from 'react-native-vector-icons/Ionicons';
//import ActionButton from 'react-native-action-button';
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
    const navigation = useNavigation();

    const [search, setSearch] = useState();
    const [filters, setFilters] = useState();

    function handleServices(type) {
        navigation.navigate('Services', { type });
    }

    return (
        <Container>
            <ScrollView>
                <BoxTitle>
                    <Hello>Olá</Hello>
                    <Name>Murilo</Name>
                </BoxTitle>
                <BoxMsg>
                    <Msg>Os mais populares</Msg>
                </BoxMsg>
                <BoxServices>
                    <ScrollView
                        style={{ flex: 1 }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <ButtonService
                            onPress={() => {
                                handleServices('Eletrecista');
                            }}
                        >
                            <Service>
                                <ImageService source={ElectrialIcon} />
                                <TitleService>Eletrecista</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Concertos');
                            }}
                        >
                            <Service>
                                <ImageService source={CelularesIcon} />
                                <TitleService>Concertos</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Diarista');
                            }}
                        >
                            <Service>
                                <ImageService source={DiaristaIcon} />
                                <TitleService>Diarista</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService>
                            <Service>
                                <ImageService source={EncanadorIcon} />
                                <TitleService>Encanador</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Fretes');
                            }}
                        >
                            <Service>
                                <ImageService source={FretesIcon} />
                                <TitleService>Fretes</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Informatica');
                            }}
                        >
                            <Service>
                                <ImageService source={InformaticaIcon} />
                                <TitleService>Informatica</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Jardineiro');
                            }}
                        >
                            <Service>
                                <ImageService source={JardineiroIcon} />
                                <TitleService>Jardineiro</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Pedreiro');
                            }}
                        >
                            <Service>
                                <ImageService source={PedreiroIcon} />
                                <TitleService>Pedreiro</TitleService>
                            </Service>
                        </ButtonService>
                        <ButtonService
                            onPress={() => {
                                handleServices('Pintor');
                            }}
                        >
                            <Service>
                                <ImageService source={PintorIcon} />
                                <TitleService>Pintor</TitleService>
                            </Service>
                        </ButtonService>
                    </ScrollView>
                </BoxServices>
                <BoxMsgFilter>
                    <Msg>Promoções</Msg>
                    <BoxPicker>
                        <Picker
                            selectedValue={filters}
                            style={{ height: 20, width: 120, color: '#235A5C' }}
                            onValueChange={(itemValue, itemIndex) =>
                                setFilters(itemValue)
                            }
                        >
                            <Picker.Item
                                key={'Popular'}
                                label={'Popular'}
                                value={'Popular'}
                            />
                        </Picker>
                    </BoxPicker>
                </BoxMsgFilter>
                <BoxServicesMain>
                    <ButtonServiceMain>
                        <ServiceMain>
                            <ImageServiceMain source={PedreiroIcon} />
                            <BoxTextServiceMain>
                                <NameProvider>
                                    Marfhs empresa empreitera
                                </NameProvider>
                                <TitleServiceMain>
                                    Cimento extra
                                </TitleServiceMain>
                                <PriceServiceMain>R$ 20,00</PriceServiceMain>
                            </BoxTextServiceMain>
                        </ServiceMain>
                    </ButtonServiceMain>
                    <ButtonServiceMain>
                        <ServiceMain>
                            <ImageServiceMain source={PedreiroIcon} />
                            <BoxTextServiceMain>
                                <NameProvider>
                                    Marfhs empresa empreitera
                                </NameProvider>
                                <TitleServiceMain>
                                    Cimento extra
                                </TitleServiceMain>
                                <PriceServiceMain>R$ 20,00</PriceServiceMain>
                            </BoxTextServiceMain>
                        </ServiceMain>
                    </ButtonServiceMain>
                    <ButtonServiceMain>
                        <ServiceMain>
                            <ImageServiceMain source={PedreiroIcon} />
                            <BoxTextServiceMain>
                                <NameProvider>
                                    Marfhs empresa empreitera
                                </NameProvider>
                                <TitleServiceMain>
                                    Cimento extra
                                </TitleServiceMain>
                                <PriceServiceMain>R$ 20,00</PriceServiceMain>
                            </BoxTextServiceMain>
                        </ServiceMain>
                    </ButtonServiceMain>
                </BoxServicesMain>
            </ScrollView>
        </Container>
    );
}

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default Home;
