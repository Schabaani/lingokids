import React, {useRef, useState} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {ThemeContext} from '../utils/useTheme';
import AppNavigator from './app-navigator';

export default function AppNavigation() {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);
  const routeNameRef = useRef<string | undefined>();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const onReady = () => {
    routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
  };

  const onStateChange = () => {
    if (__DEV__) {
      const previousRouteName = routeNameRef.current;
      const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

      if (previousRouteName !== currentRouteName) {
        console.log('currentRouteName', currentRouteName);
      }

      // Save the current route name for later comparison
      routeNameRef.current = currentRouteName;
    }
  };

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <NavigationContainer
        ref={navigationRef}
        onReady={onReady}
        onStateChange={onStateChange}>
        <AppNavigator />
      </NavigationContainer>
    </ThemeContext.Provider>
  );
}
