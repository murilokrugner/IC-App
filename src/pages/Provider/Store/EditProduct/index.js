import React, {useRef, useState, useEffect} from 'react';
import { Alert, ScrollView, ActivityIndicator } from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import { Form } from '@unform/mobile';
import { Container, BoxLoading, BoxForm, TitleInput, BoxPicker, BoxButtons, ButtonSave, ButtonDelete } from './styles';
import { useAuth } from '../../../../hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import Input from '../../../../components/Input'
import {Picker} from '@react-native-community/picker';
import api from '../../../../services/api';

const EditProduct = () => {
  const formRef = useRef(null);
  const descriptionRef = useRef();
  const cashPriceRef = useRef();
  const forwardPriceRef = useRef();
  const brandRef = useRef();
  const commentsRef = useRef();
  const categoryRef = useRef();
  const unitRef = useRef();

    const navigation = useNavigation();

    const { dataAuth } = useAuth();

    const route = useRoute();

    const id = route.params.idProduct;

  const [loading, setLoading] = useState(true);
  const [loadingSave, setLoadingSave] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
 
  const [description, setDescription] = useState('');
  const [cashPrice, setCashPrice] = useState('');
  const [forwardPrice, setForwardPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [comments, setComments] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState('');
  const [unit, setUnit] = useState('');
  const [units, setUnits] = useState('');

  const [selectCategory, setSelectCategory] = useState();
  const [selectUnit, setSelectUnit] = useState();

  useEffect(() => {
    async function loadProduct() {
      const response = await api.get(`productId?id=${id}`);

      setDescription(response.data.description);
      setCashPrice(response.data.cash_price);
      setForwardPrice(response.data.forward_price);
      setBrand(response.data.brand);
      setComments(response.data.comments);
      setCategory(response.data.category.description);
      setUnit(response.data.unit.description);      

      const responseUnits = await api.get('productunits');

      setUnits(responseUnits.data);
      setSelectUnit(responseUnits.data);

      const responseCategories = await api.get('productcategory');

      setSelectCategory(responseCategories.data);
      setCategories(responseCategories.data);

      setLoading(false);
    
    }

    loadProduct();
  }, []);

  async function handleSubmit() {
    setLoadingSave(true);

    try {
      const response = await api.put('products', {
        id: id,
        description: description,
        forward_price: forwardPrice,
        cash_price: cashPrice,
        id_provider: dataAuth.id,
        unit: selectUnit,
        category: selectCategory,
        brand: brand,
        comments: comments,
      });
  
      setLoadingSave(false);
      Alert.alert('As alterações para o produto foram salvas');
      navigation.goBack();
    } catch (error) {
      setLoadingSave(false);
      Alert.alert('Ocorreu um erro ao tentar salvar as alterações, tente novamente mais tarde');
    }
  }

  async function handleDelete() {
    setLoadingDelete(true);

    Alert.alert(
      'Excluir Produto',
      'Deseja realmente excluir o produto?',
      [
        {
          text: 'Não',
          onPress: () => {
              return;
          },
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            try {
              async function deleteProduct() {
                const response = await api.delete(`products?id=${id}`);
        
                setLoadingDelete(false);
                Alert.alert('o Produto foi excluido');
                navigation.goBack();
                navigation.goBack();
              }

              deleteProduct();
              
            } catch (error) {
              setLoadingDelete(false);
              Alert.alert('Ocorreu um erro ao tentar salvar as alterações, tente novamente mais tarde');
            }
          }
        },
      ],
    )    
  }

  return (
    <ScrollView>
    <Container>
      {loading ? (
        <BoxLoading>
          <ActivityIndicator color="#000" size="small" />
        </BoxLoading>
      ) : (
        <BoxForm>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <TitleInput>Descrição do produto:</TitleInput>
            <Input name="description" placeholder="Descrição do produto" returnKeyType="next"                                 
              onSubmitEditing={() => cashPriceRef.current.focus()}
              value={description}
              onChangeText={setDescription}
            />
            <TitleInput>Preço a vista:</TitleInput>
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
                <TitleInput>Preço a prazo:</TitleInput>
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
                  placeholderTextColor={'#666360'}               

                  />
                <TitleInput>Marca:</TitleInput>
                <Input name="Brand"  placeholder="Marca" returnKeyType="next"                                 
                  value={brand}
                  onChangeText={setBrand}
              />
              <TitleInput>Observações:</TitleInput>
              <Input name="comments" placeholder="Observações" returnKeyType="next"                                 
                  value={comments}
                  onChangeText={setComments}
              />
                <BoxPicker>
                <TitleInput>Unidade:</TitleInput>
                  <Picker
                  selectedValue={selectUnit}
                  style={{height: 20, width: 300, color: '#666360'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectUnit(itemValue)
                  }>
                    <Picker.Item key={unit} label={'Selecionado: ' + unit} value={unit}/>                                 
                    {units.map(item => (
                          <Picker.Item key={item.description} label={item.description} value={item.description} />  
                    ))}
                  </Picker> 
                  </BoxPicker>
                  <BoxPicker>
                  <TitleInput>Categoria:</TitleInput>
                  <Picker
                  selectedValue={selectCategory}
                  style={{height: 20, width: 300, color: '#666360'}}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectCategory(itemValue)
                  }>
                    <Picker.Item key={category} label={'Selecionado: ' + category} value={category}/>                                 
                    {categories.map(item => (
                          <Picker.Item key={item.description} label={item.description} value={item.description} />  
                    ))}
                  </Picker> 
                </BoxPicker>
                <BoxButtons>
                  <ButtonSave loading={loadingSave} onPress={() => {formRef.current.submitForm()}} >Salvar</ButtonSave>
                  <ButtonDelete loading ={loadingDelete} onPress={handleDelete}>Excluir Produto</ButtonDelete>
                </BoxButtons>
          </Form>
        </BoxForm>
      )}
    </Container>
    </ScrollView>                      
  );
}

export default EditProduct;