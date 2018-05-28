import Auth from './auth/reducer';
import App from './app/reducer';
import Box from './box/reducer';
import Todos from './todos/reducer';
import DynamicChartComponent from './dynamicEchart/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import DevReducers from '../customApp/redux/reducers';

export default {
  Auth,
  App,
  ThemeSwitcher,
  LanguageSwitcher,
  Box,
  Todos,
  DynamicChartComponent,
  ...DevReducers
};
