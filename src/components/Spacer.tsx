import React from 'react';
import { View } from 'react-native';

type TProps = {
	size?: number;
};
const Spacer = ({ size = 1 }: TProps) => <View style={{ flex: size }} />;
export { Spacer };
