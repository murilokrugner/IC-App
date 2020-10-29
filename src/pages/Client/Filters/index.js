import React, {useState} from 'react';
import { SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Container, BoxDistance, NameFilter, BoxSlider, DistanceSlider, ButtonApply } from './styles';

const Filters = () => {
  const [distance, setDistance] = useState(20);

  return (
    <SafeAreaView style={{flex: 1}}>
    <Container>
      <BoxDistance>
                <NameFilter>Distância:</NameFilter>
                <BoxSlider>
                  <Slider
                    style={{width: 200, height: 40}}
                    minimumValue={20}
                    maximumValue={200}
                    minimumTrackTintColor="#235A5C"
                    maximumTrackTintColor="#000000"
                    value={distance}
                    onValueChange={setDistance}
                  />
                  <DistanceSlider>{distance} km</DistanceSlider>
                </BoxSlider>              
              </BoxDistance>
            <ButtonApply>Aplicar Filtro</ButtonApply>
    </Container>
    </SafeAreaView>
  );
}

export default Filters;