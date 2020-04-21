import React from 'react';
import { StyleSheet, Text, View , Button, TextInput} from 'react-native';
import PomodoroTimer from './PomodoroTimer'

export default class App extends React.Component {
  constructor(){
    super();
    this.state={
      showTimer: false,
      pause: false,
      workTimeMinutes:'',
      workTimeSeconds:'',
      breakTimeMinutes:'',
      breakTimeSeconds:'',
      details : [],
    }
  }
  handleChange = (name,val) => {
      this.setState({
        [name] : val,
      });
  }
  start = () => {
      let workTime = (this.state.workTimeMinutes !== "" ? String(Number(this.state.workTimeMinutes) * 60) : 0 )
                    + (this.state.workTimeSeconds !== "" ? Number(this.state.workTimeSeconds) : 0) ;
      
      let breakTime = (this.state.breakTimeMinutes !== "" ? String(Number(this.state.breakTimeMinutes) * 60) : 0 )
                    + (this.state.breakTimeSeconds !== "" ? Number(this.state.breakTimeSeconds) : 0) ;
      
      if( workTime === 0) workTime = 20; // default
      if( breakTime === 0) breakTime = 10; // default
      
      const details = [{workTime : workTime, breakTime: breakTime}]
      this.setState({ details : details, showTimer: true});
  }
 
  stop = () => {
    this.setState(prevState => ({
        showTimer : !prevState.showTimer
    }))
  }  
  pause = () => {
    this.setState(prevState => ({
      pause : !prevState.pause
  }))
  }
  render(){



    return (
      <View style={styles.container}>
        {
            this.state.showTimer && 
                            <View>
                                  <PomodoroTimer 
                                      pause={this.state.pause} 
                                      details={this.state.details}
                                    /> 
                                    <View style= {styles.displayRow}>
                                        {this.state.pause? <Button title='Resume' onPress={this.pause} /> : <Button title='Pause' onPress={this.pause} />}
                                         <Button title='Stop' onPress={this.stop} />
                                    </View>
                            </View>
        
        }

        {
          !this.state.showTimer &&  
            <View>
                <Text style= {[styles.constantSize, styles.position]}>Pomodoro Timer</Text>
                <View style= {styles.displayRow}>
                    <Text>Work Time:</Text>
                    <TextInput keyboardType="numeric" value={this.state.workTimeMinutes} onChangeText={(val) => this.handleChange('workTimeMinutes',val)} placeholder='minutes' maxLength={3}/>
                    <TextInput keyboardType="numeric" value={this.state.workTimeSeconds} onChangeText={(val) => this.handleChange('workTimeSeconds',val)} placeholder='seconds(default:20)' maxLength={2}/>
                </View>    
                <View style= {styles.displayRow}>
                    <Text>Break Time:</Text>
                    <TextInput keyboardType="numeric" value={this.state.breakTimeMinutes} onChangeText={(val) => this.handleChange('breakTimeMinutes',val)} placeholder='minutes' maxLength={3}/>
                    <TextInput keyboardType="numeric" value={this.state.breakTimeSeconds} onChangeText={(val) => this.handleChange('breakTimeSeconds',val)} placeholder='seconds(default:10)' maxLength={2} />
                </View> 
                <Button title='Start' onPress={this.start} />
            </View>
        }

      </View>

    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  displayRow: {
    flexDirection : 'row',
    justifyContent : "space-evenly",
    paddingBottom: 20,
  },
  constantSize: {
    fontSize : 40
  },
  position: {     
    textAlign : 'center',
  },
});
