import AsyncStorage from '@react-native-community/async-storage';
import { createContext, useContext } from 'react';

export type Theme = {
	colors: {
		background: string;
		secondary: string;
		text: string;
	};
	styles: {
		btn: {
			borderWidth: number;
			borderColor: string;
			backgroundColor: string;
		};
	};
};

export const LightTheme = {
	colors: {
		background: '#f6f8fb',
		secondary: '#fff',
		text: '#424d69'
	},
	styles: {
		btn: {
			borderWidth: 1,
			borderColor: '#e8e8e8',
			backgroundColor: '#fff'
		}
	}
};

export const DarkTheme = {
	colors: {
		background: '#2a2f35',
		secondary: '#1f2229',
		text: '#fff'
	},
	styles: {
		btn: {
			borderWidth: 0,
			borderColor: '#1f2229',
			backgroundColor: '#1f2229'
		}
	}
};

export const ThemeContext = createContext<{
	theme: 'light' | 'dark';
	setTheme: (theme: 'light' | 'dark') => void;
}>({
	theme: 'light',
	setTheme: () => {}
});

const useTheme = () => {
	const { theme, setTheme } = useContext(ThemeContext);

	const changeTheme = (str: 'dark' | 'light') => {
		const newTheme = str == 'dark' ? 'dark' : 'light';
		setTheme(newTheme);
		AsyncStorage.setItem('theme', newTheme);
	};

	return {
		name: theme,
		isDark: theme == 'dark',
		colors: theme == 'dark' ? DarkTheme.colors : LightTheme.colors,
		styles: theme == 'dark' ? DarkTheme.styles : LightTheme.styles,
		setTheme: changeTheme
	};
};

export type ThemeState = ReturnType<typeof useTheme>;

export default useTheme;
