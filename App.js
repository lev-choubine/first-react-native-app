import {Card, Title, Button, Divider} from 'react-native-paper'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {Logo, ImageBackground}from 'react-native'
import {Header, Icon} from 'react-native-elements'

import AudioRecorderPlayer, {
 AVEncoderAudioQualityIOSType,
 AVEncodingOption,
 AudioEncoderAndroidType,
 AudioSet,
 AudioSourceAndroidType,
} 
from 'react-native-audio-recorder-player';
import React,{ Component } from 'react';


class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoggingIn: false,
        recordSecs: 0,
        recordTime: '00:00:00',
        currentPositionSec: 0,
        currentDurationSec: 0,
        playTime: '00:00:00',
        duration: '00:00:00',
      };
      this.audioRecorderPlayer = new AudioRecorderPlayer();
      this.audioRecorderPlayer.setSubscriptionDuration(0.09); // optional. Default is 0.
    }
    render(){
    return (
      <SafeAreaProvider>
            <Card style={{ flex: 1, flexDirection: 'row', alignItems: 'center', alignContent: 'center', alignSelf: 'center' }}>

              <ImageBackground source={require('./beb1d9ed51eb350ea29881d39d410b54.jpg')}
              style={{width: '100%', height: '100%'}}
              >
                <Icon />
                <Header>InstaPlayer</Header>
                <Title>{this.state.recordTime}</Title>
                <Button mode="contained" icon="record" onPress={() => this.onStartRecord()}>
                  RECORD
              </Button>
                <Button
                  icon="stop"
                  mode="outlined"
                  onPress={() => this.onStopRecord()}
                >
                  STOP
          </Button>
                <Divider />
                <Title>{this.state.playTime} / {this.state.duration}</Title>
                <Button mode="contained" icon="play" onPress={() => this.onStartPlay()}>
                  PLAY
              </Button>
                <Button
                  icon="pause"
                  mode="contained"
                  onPress={() => this.onPausePlay()}
                >
                  PAUSE
          </Button>
                <Button
                  icon="stop"
                  mode="outlined"
                  onPress={() => this.onStopPlay()}
                >
                  STOP
          </Button>
              </ImageBackground>
            </Card>
            </SafeAreaProvider>
    )     
    }
  }

  export default App;
