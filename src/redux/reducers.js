import Auth from './auth/reducer';
import App from './app/reducer';
import Todos from './todos/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import DevReducers from '../customApp/redux/reducers';

export default {
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Todos,
  ...DevReducers
};
