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
} from 'react-native-audio-recorder-player';
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

    onStartRecord = async () => {
          const path = 'hello.m4a';
          const audioSet = {
            AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
            AudioSourceAndroid: AudioSourceAndroidType.MIC,
            AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
            AVNumberOfChannelsKeyIOS: 2,
            AVFormatIDKeyIOS: AVEncodingOption.aac,
          };
          console.log('audioSet', audioSet);
          const uri = await this.audioRecorderPlayer.startRecorder(path, audioSet);
          this.audioRecorderPlayer.addRecordBackListener((e) => {
            this.setState({
              recordSecs: e.current_position,
              recordTime: this.audioRecorderPlayer.mmssss(
                Math.floor(e.current_position),
              ),
            });
          });
          console.log(`uri: ${uri}`);
        };

    onStopRecord = async () => {
            const result = await this.audioRecorderPlayer.stopRecorder();
            this.audioRecorderPlayer.removeRecordBackListener();
            this.setState({
              recordSecs: 0,
            });
            console.log(result);
          };

          onStartPlay = async (e) => {
                console.log('onStartPlay');
                const path = 'hello.m4a'
                const msg = await this.audioRecorderPlayer.startPlayer(path);
                this.audioRecorderPlayer.setVolume(1.0);
                console.log(msg);
                this.audioRecorderPlayer.addPlayBackListener((e) => {
                  if (e.current_position === e.duration) {
                    console.log('finished');
                    this.audioRecorderPlayer.stopPlayer();
                  }
                  this.setState({
                    currentPositionSec: e.current_position,
                    currentDurationSec: e.duration,
                    playTime: this.audioRecorderPlayer.mmssss(
                      Math.floor(e.current_position),
                    ),
                    duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
                  });
                });
                onStopPlay = async (e) => {
                   console.log('onStopPlay');
                   this.audioRecorderPlayer.stopPlayer();
                   this.audioRecorderPlayer.removePlayBackListener();
                   };
          
onPausePlay = async (e) => {
   await this.audioRecorderPlayer.pausePlayer();
  };

              };
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
