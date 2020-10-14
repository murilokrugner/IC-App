import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert, ActivityIndicator} from 'react-native';

import { Container, BoxForm, BoxPicker, BoxButtonSave, ButtonSave } from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import Input from '../../../../components/Input';
import {TextInputMask} from 'react-native-masked-text';
import {Picker} from '@react-native-community/picker';
import { useAuth } from '../../../../hooks/auth';
import api from '../../../../services/api';

function CreateProduct() {
  const navigation = useNavigation();

  const route = useRoute();

  const { dataAuth } = useAuth();

  const formRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);

  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [comments, setComments] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [forwardPrice, setForwardPrice] = useState('');

  const [units, setUnits] = useState();
  const [selectUnit, setSelectUnit] = useState("        Selecione uma unidade");

  const [categories, setCategories] = useState();
  const [selectCategory, setSelectCategory] = useState("        Selecione uma Categoria");

  useEffect(() => {
    async function loadunits() {
      const response = await api.get('productunits');

      setUnits(response.data);

    }

    async function loadCategories() {
      const response = await api.get('productcategory');

      setCategories(response.data);

      setLoading(false);
    }

    loadunits();
    loadCategories();
  }, []);

  async function handleSave() {
    setLoadingSave(true);

    if (description === '') {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    if (forwardPrice === '') {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    if (cashPrice === '') {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    if (selectUnit === "        Selecione uma unidade") {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    if (selectCategory === "        Selecione uma Categoria") {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    if (brand === '') {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    if (comments === '') {
      Alert.alert('Por favor informe uma descrição');
      return;
    }

    const forwardPriceFormatted = forwardPrice.slice(2);
    const cashPriceFormatted = cashPrice.slice(2);

    const response = await api.post('products', {
      id_provider: dataAuth.id,
      description: description,
      forward_price: parseFloat(forwardPriceFormatted).toFixed(2),
      cash_price: parseFloat(cashPriceFormatted).toFixed(2),
      unit: selectUnit,      
      category: selectCategory,
      brand: brand,
      comments: comments,
    });

    setLoadingSave(false);

    const idProduct = response.data;

    navigation.navigate('AddImagesProduct', {idProduct});
  }

  return (
      <Container>
        <KeyboardAvoidingView>
          <ScrollView>          
            <BoxForm>
              <Form ref={formRef} onSubmit={handleSave}>
                <Input name="description" placeholder="Descrição" returnKeyType="next"                                 
                  value={description}
                  onChangeText={setDescription}
              />

                <TextInputMask
                  type={'money'}
                  value={cashPrice}
                  onChangeText={text => {
                    setCashPrice(text);
                  }}
                  options={{
                      precision: 2,
                      separator: '.',
                      delimiter: '.',
                      unit: 'R$',
                      suffixUnit: '',
                  }}
                  style={{
                      backgroundColor: '#ECF6FF',
                      width: '100%',
                      borderRadius: 10,
                      padding: 15,
                      fontSize: 16,
                      color: '#000',
                      marginTop: 5,
                      marginBottom: 16,
                  }}
                  placeholder={'Preço a vista R$'}
                  placeholderTextColor={'#666360'}         c       

                  /> 

                <TextInputMask
                  type={'money'}
                  value={forwardPrice}
                  onChangeText={text => {
                    setForwardPrice(text);
                  }}
                  options={{
                      precision: 2,
                      separator: '.',
                      delimiter: '.',
                      unit: 'R$',
                      suffixUnit: '',
                  }}
                  style={{
                      backgroundColor: '#ECF6FF',
                      width: '100%',
                      borderRadius: 10,
                      padding: 15,
                      fontSize: 16,
                      color: '#000',
                      marginTop: 5,
                      marginBottom: 16,
                  }}
                  placeholder={'Preço a prazo R$'}
                  placeholderTextColor={'#666360'}         c       

                  /> 
              
              <Input name="Brand"  placeholder="Marca" returnKeyType="next"                                 
                  value={brand}
                  onChangeText={setBrand}
              />
              <Input name="comments" placeholder="Observações" returnKeyType="next"                                 
                  value={comments}
                  onChangeText={setComments}
              />
              {loading ? (
                <ActivityIndicator color="#000" size="small" />
              ) : (
                <>
                  {units !== undefined && (
                    <>
                      <BoxPicker>
                  <Picker
                  selectedValue={selectUnit}
                  style={{height: 20, width: 300, color: '#666360'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectUnit(itemValue)
                  }>
                    <Picker.Item key={"        Selecione uma unidade"} label={"        Selecione uma unidade"} value={"        Selecione uma unidade"}/>                                 
                    {units.map(item => (
                          <Picker.Item key={item.description} label={item.description} value={item.description} />  
                    ))}
                  </Picker> 
                  </BoxPicker>
                  <BoxPicker>
                  <Picker
                  selectedValue={selectCategory}
                  style={{height: 20, width: 300, color: '#666360'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectCategory(itemValue)
                  }>
                    <Picker.Item key={"        Selecione uma categoria"} label={"        Selecione uma categoria"} value={"        Selecione uma categoria"}/>                                 
                    {categories.map(item => (
                          <Picker.Item key={item.description} label={item.description} value={item.description} />  
                    ))}
                  </Picker> 
                  </BoxPicker>
                    </>
                )}
                </>
              )}
              
              <BoxButtonSave>
                  <ButtonSave loading={loadingSave} onPress={() => {formRef.current.submitForm()}}>Salvar</ButtonSave>
              </BoxButtonSave>
              </Form>
            </BoxForm>
          </ScrollView>
        </KeyboardAvoidingView>
      </Container>
  );
}

export default CreateProduct;