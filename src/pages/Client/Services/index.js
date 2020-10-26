import React from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

import { Container, BoxFilters, BoxLocation, Icon, Location } from './styles';

const Services = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <Container>
          <BoxFilters>
            <BoxLocation>
              <Icon name="map-pin" />
              <Location>Dois Córregos - SP</Location>
            </BoxLocation>
          </BoxFilters>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Services;