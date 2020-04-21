import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import vibrate from './utils/vibrate';

const styles = StyleSheet.create({
    position: {     
        alignItems : 'center'
    },
    timerSize: {
        fontSize : 100
    },
    constantSize: {
        fontSize : 50
    }
});

class PomodoroTimer extends React.Component{
    constructor(props){
        super(props);
        this.state={
            workTime: props.details[0].workTime,
            breakTime: props.details[0].breakTime,
            pauseWorkFlag: false,
            pauseBreakFlag: false,
            showTimer: 'work',
        };
    }
    componentDidMount(){
        this.workInterval = setInterval(this.decWork,1000);
    }
    shouldComponentUpdate(nextProps,nextState){
        
        this.pause(nextProps, nextState);
        this.toggleTimer(nextProps, nextState);
        
        return true;
    }
    
    componentWillUnmount(){
        clearInterval(this.workInterval);
        clearInterval(this.pauseWorkInterval);
        clearInterval(this.breakInterval);
        clearInterval(this.pauseBreakInterval);
        console.log('clear interval');
    }
    
    pause = (nextProps, nextState) => {
        if(nextProps.pause === true && this.state.showTimer === 'work'){
            clearInterval(this.workInterval);
            clearInterval(this.pauseWorkInterval);
            clearInterval(this.breakInterval);
            clearInterval(this.pauseBreakInterval);
            console.log('Work-pause')
            nextState.pauseWorkFlag = true;
            return false;
        }
        if(this.state.pauseWorkFlag){
            clearInterval(this.workInterval);
            clearInterval(this.breakInterval);
            clearInterval(this.pauseBreakInterval);
            this.pauseWorkInterval = setInterval(this.decWork,1000);
            nextState.pauseWorkFlag= false;
            console.log('Work-unpause');
        }
        if(nextProps.pause === true && this.state.showTimer === 'break'){
            clearInterval(this.breakInterval);
            clearInterval(this.pauseBreakInterval);
            clearInterval(this.workInterval);
            clearInterval(this.pauseWorkInterval);
            console.log('Break-pause')
            nextState.pauseBreakFlag = true;
            return false;
        }
        if(this.state.pauseBreakFlag){
            clearInterval(this.workInterval);
            clearInterval(this.breakInterval);
            clearInterval(this.pauseWorkInterval);
            this.pauseBreakInterval = setInterval(this.decBreak,1000);
            nextState.pauseBreakFlag= false;
            console.log('Break-unpause');
        }
    }
    toggleTimer = (nextProps, nextState) => {
        if(nextState.workTime === 0 || nextState.breakTime === 0) vibrate();
        if(nextState.workTime === -1){
            clearInterval(this.workInterval);
            clearInterval(this.pauseBreakInterval);
            clearInterval(this.pauseWorkInterval);
            this.breakInterval = setInterval(this.decBreak,1000);
            nextState.showTimer = 'break';
            nextState.workTime = this.props.details[0].workTime;
        }
        if(nextState.breakTime === -1){
            clearInterval(this.breakInterval);
            clearInterval(this.pauseBreakInterval);
            clearInterval(this.pauseWorkInterval);
            this.workInterval = setInterval(this.decWork,1000);
            nextState.showTimer = 'work';
            nextState.breakTime = this.props.details[0].breakTime;
        }
    }
    decWork = () =>{
        this.setState(prevState => ({workTime : prevState.workTime =0 ? 0 : prevState.workTime -1 }));
    }
    decBreak = () =>{
        this.setState(prevState => ({breakTime : prevState.breakTime =0 ? 0 : prevState.breakTime -1 }));
    }
    
    render(){
        let title , minutes, seconds;
        if(this.state.showTimer === 'work'){
            title = 'Work Timer'
            minutes = Math.floor(this.state.workTime / 60);
            seconds = this.state.workTime % 60;  
        }
        if(this.state.showTimer === 'break'){
            title = 'Break Timer'
            minutes = Math.floor(this.state.breakTime / 60);
            seconds = this.state.breakTime % 60;  
        }
        if(minutes<0 && seconds< 0){
            minutes=0;
            seconds=0;
        }
        minutes = minutes > 9 ? ''+minutes : "0"+ minutes;
        seconds = seconds > 9 ? ''+seconds : "0"+ seconds;
        return(
            <View style={styles.position} >
                <Text style={styles.constantSize}>{title}</Text>
                    <Text style={styles.timerSize}>{minutes}<Text style={styles.constantSize}>m</Text>
                    :
                    {seconds}<Text style={styles.constantSize}>s</Text>
                </Text>   
            </View>           
        );
        
         
       
        
    }
}

export default PomodoroTimer