import React, {forwardRef} from 'react';
import { Container, TextInput, Icon } from './styles';

function InputSearch({ name, icon, ...rest }, ref)  {
  return(
    <Container>
      <Icon name={icon} size={20} color="#666360" />
        <TextInput keyboardAppearance="dark"
          placeholderTextColor="#666360"
          ref={ref}
          {...rest}
        />
    </Container>
  )
};

export default forwardRef(InputSearch);