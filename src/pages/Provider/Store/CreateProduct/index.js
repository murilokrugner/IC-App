import React, {useRef, useState, useEffect} from 'react';
import {KeyboardAvoidingView, ScrollView, Alert, ActivityIndicator} from 'react-native';

import { Container, BoxForm, BoxPicker, BoxButtonSave, ButtonSave } from './styles';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import Input from '../../../../components/Input';
import {TextInputMask} from 'react-native-masked-text';
import {Picker} from '@react-native-community/picker';

import api from '../../../../services/api';

function CreateProduct() {
  const navigation = useNavigation();

  const route = useRoute();

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

    const response = await api.updade('products', {
      description: description,
      forward_price: forwardPrice,
      cash_price: cashPrice,
      unit: selectUnit,      
      brand: brand,
      comment: comments,
    });

    setLoadingSave(false);
  }

  return (
      <Container>
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
      </Container>
  );
}

export default CreateProduct;