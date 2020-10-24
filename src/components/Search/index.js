import React from 'react';
//import { View } from 'react-native';
import InputSearch from '../InputSearch';
import { BoxSearch, BoxButtonFilter, ButtonFilter, ImageButtonFilter } from './styles';

const Search = () => {
  return (
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
  );
}

export default Search;