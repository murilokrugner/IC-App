import React from 'react';
import { View } from 'react-native';
import { Container } from '../Services/styles';
import Slider from '@react-native-community/slider';
import { Container, BoxDistance, NameFilter, BoxSlider, DistanceSlider } from './styles';

const Filters = () => {
  return (
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
    </Container>
  );
}

export default Filters;