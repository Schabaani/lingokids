import React from 'react';
import {I18nManager} from 'react-native';

import AppNavigation from './navigations';

I18nManager.allowRTL(false);

const App = () => <AppNavigation />;

export default App;
