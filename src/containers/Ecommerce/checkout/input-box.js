import React from 'react';
import Input from '../../../components/uielements/input';
import { InputBoxWrapper } from './checkout.style';

class InputBox extends React.Component {
  render() {
    const { label, placeholder } = this.props;
    return (
      <InputBoxWrapper className="isoInputBox">
        <label>
          {label}
          {this.props.important ? <span className="asterisk">*</span> : null}
        </label>
        <Input size="large" placeholder={placeholder} />
      </InputBoxWrapper>
    );
  }
}
export default InputBox;
