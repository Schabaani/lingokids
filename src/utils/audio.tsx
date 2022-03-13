import Sound from 'react-native-sound';
import {makeCryPath} from '../services/api/pokemon';

function makeAudio(id: number) {
  return new Sound(makeCryPath(id), undefined, (error: string) => {
    if (error) {
      console.log('failed to load the sound', error);
      return;
    }
  });
}

function activeSoundInBG() {
  Sound.setCategory('Playback');
}

export {makeAudio, activeSoundInBG};
