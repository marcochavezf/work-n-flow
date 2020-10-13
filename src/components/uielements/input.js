import { Input } from 'antd';
import {
  InputWrapper,
  InputGroupWrapper,
  InputSearchWrapper,
  TextAreaWrapper,
} from './styles/input.style';
import WithDirection from '../../config/withDirection';
import WithRef from '../../config/withRef';

const { Search, TextArea, Group } = Input;

const WDStyledInput = InputWrapper(Input);
const StyledInput = WithDirection(WDStyledInput);

const WDInputGroup = InputGroupWrapper(Group);
const InputGroup = WithDirection(WDInputGroup);

const WDInputSearch = InputSearchWrapper(Search);
const InputSearch = WithDirection(WDInputSearch);

const WDTextarea = TextAreaWrapper(TextArea);
const Textarea = WithDirection(WDTextarea);

export default WithRef(StyledInput);
export { InputSearch, InputGroup, Textarea };
