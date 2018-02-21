import { Map } from 'immutable';
import config, {
  getCurrentLanguage
} from '../../containers/LanguageSwitcher/config';

import actions from './actions';

const initState = new Map({
  isActivated: false,
  language: getCurrentLanguage(config.defaultLanguage || 'english')
});

export default function(state = initState, action) {
  switch (action.type) {
    case actions.ACTIVATE_LANG_MODAL:
      return state.set('isActivated', !state.get('isActivated'));
    case actions.CHANGE_LANGUAGE:
      return state.set('language', action.language);
    default:
      return state;
  }
}
