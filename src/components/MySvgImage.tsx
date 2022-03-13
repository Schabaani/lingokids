import React, {memo} from 'react';
import {View, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {SvgProps} from 'react-native-svg';
import SVGImages from '../assets/images/svg';

export type TSvgImgName = keyof typeof SVGImages;

type TProps = {
  source:
    | keyof typeof SVGImages
    | React.FC<
        SvgProps & {
          fillSecond?: string;
        }
      >;
  style?: StyleProp<ViewStyle>;
  fill?: string;
  fillSecond?: string;
  height?: string | number;
  width?: string | number;
};

function MySvgImage(props: TProps) {
  const {
    source,
    style,
    width = '100%',
    height = '100%',
    fill = '#2e4057',
    fillSecond = '#ffa300',
  } = props;
  const SVGComponent = typeof source == 'string' ? SVGImages[source] : source;
  const imageStyle = StyleSheet.flatten(style) || {};
  const imgWidth = width || imageStyle.width;
  const imgHeight = height || imageStyle.height;
  return (
    <View style={[style, {width: imgWidth, height: imgHeight}]}>
      <SVGComponent
        width="100%"
        height="100%"
        fill={fill}
        fillSecond={fillSecond}
      />
    </View>
  );
}

export default memo(MySvgImage);
