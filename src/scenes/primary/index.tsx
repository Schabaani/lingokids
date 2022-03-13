import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Sizes} from '../../styles/index';
import {RootStackParamList} from '../../navigations/router';
import {fetchPokemonList, imagePath} from '../../services/api/pokemon';
import {LIMIT} from '../../config/constants';
import {paintCardColor} from '../../utils/helper';

interface IProps {
  navigation: NativeStackNavigationProp<RootStackParamList, 'PrimaryScreen'>;
}

type TPokeChar = {
  name: string;
  id: number;
  url: string;
};

const NUM_COLUMNS = 3;

export default function PrimaryScreen({navigation}: IProps) {
  const [pokeChars, setPokeChars] = React.useState<TPokeChar[]>([]);
  const [count, setCount] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const onEndReached = () => {
    if (isLoading) return;
    if (offset + pokeChars.length >= count) return;
    loadPokes();
  };

  const RenderPoke = ({item, index}) => {
    const splitURL = item.url.split('/');
    const id = splitURL[splitURL.length - 2];
    const color = paintCardColor(index);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SecondaryScreen', {id, color, name: item.name});
        }}
        style={[Style.card, {backgroundColor: color}]}>
        <Image
          source={{
            uri: imagePath(id),
          }}
          style={Style.spriteImage}
          resizeMode="contain"
        />
        <Text style={Style.txt}>#{id}</Text>
        <Text style={Style.txt}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const loadPokes = () => {
    setIsLoading(true);
    fetchPokemonList(offset)
      .then(res => {
        return res.json();
      })
      .then(json => {
        setCount(json.count);
        setOffset(offset + LIMIT);
        setPokeChars([...pokeChars, ...json.results]);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    loadPokes();
  }, []);

  return (
    <SafeAreaView style={Style.container}>
      <FlatList
        data={pokeChars}
        renderItem={RenderPoke}
        numColumns={NUM_COLUMNS}
        onEndReached={onEndReached}
        keyExtractor={(item: TPokeChar, index: number) =>
          `${item.name}-${index}`
        }
      />
    </SafeAreaView>
  );
}

const Style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('screen').width / NUM_COLUMNS - Sizes.margin2X,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: Sizes.border3X,
    borderBottomStartRadius: Sizes.border3X,
    marginBottom: Sizes.margin2X,
  },
  spriteImage: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    marginBottom: 10,
  },
  txt: {color: Colors.WHITE},
});
