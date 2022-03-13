import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigations/router';
import {Colors, Sizes} from '../../styles/index';
import {fetchPokemonById} from '../../services/api/pokemon';
import {makeAudio, activeSoundInBG} from '../../utils/audio';

type TProps = {
  navigation: StackNavigationProp<RootStackParamList, 'SecondaryScreen'>;
  route: RouteProp<RootStackParamList, 'SecondaryScreen'>;
};

const CRY_SIZE = 120;

const SecondaryScreen = (props: TProps) => {
  const audio = React.useRef(makeAudio(props.route.params.id!));
  const [height, setHeight] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const {color} = props.route.params;

  React.useEffect(() => {
    activeSoundInBG();
    fetchPokemonById(props.route.params.id!)
      .then(res => {
        return res.json();
      })
      .then(json => {
        setIsLoading(false);
        setHeight(json.height);
        setWeight(json.weight);
      });

    return () => {
      audio.current.release();
    };
  }, []);

  const playCry = () => {
    audio.current.play((success: boolean) => {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    });
  };

  const renderData = () => {
    return (
      <>
        <TouchableOpacity style={Style.cryBtn} onPress={playCry}>
          <Text style={{color, fontSize: Sizes.fontSize3X}}>Cry</Text>
        </TouchableOpacity>
        <View style={Style.dataContainer}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <Text style={[Style.nameTxt, {color}]}>
              {props.route.params.name.toUpperCase()}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text>HEIGHT: {height}</Text>
            </View>
            <View>
              <Text>WEIGHT: {weight}</Text>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <SafeAreaView style={[Style.container, {backgroundColor: color}]}>
      {isLoading && (
        <ActivityIndicator size="large" animating style={Style.loader} />
      )}
      {!isLoading && renderData()}
    </SafeAreaView>
  );
};
const Style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  cryBtn: {
    width: CRY_SIZE,
    height: CRY_SIZE,
    borderRadius: CRY_SIZE / 2,
    backgroundColor: Colors.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  dataContainer: {
    backgroundColor: Colors.WHITE_GREY,
    borderRadius: Sizes.border1X,
    padding: 10,
    width: Dimensions.get('screen').width - 20,
    marginTop: 20,
  },
  nameTxt: {
    fontSize: Sizes.fontSize2X,
    fontWeight: '900',

    marginBottom: Sizes.margin4X,
  },
  loader: {alignSelf: 'center', flex: 1},
});

export default SecondaryScreen;
