import React from 'react';
import { TouchableOpacity, Text, View, Image, StyleSheet } from 'react-native';

export default class Row extends React.Component {

    render() {
        return(
            <TouchableOpacity style={styles.record}
                onPress={() => this.props.navigation.push('Details', {imdbID: this.props.imdbID, Title: this.props.Title})}
            >
                <Image style={styles.tinyLogo} source={{ uri : this.props.Poster }}/>
                <View style={styles.content}>
                    <Text style={styles.title}>{this.props.Title}</Text>
                    <Text>{this.props.Type}</Text>
                    <Text>{this.props.Year}</Text>
                </View>
                
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    
    record:{
        padding : 20,
        flexDirection: 'row',
        // marginHorizontal:2,
        // backgroundColor: '#f9c2ff',
        // marginVertical: 8,
    },
    tinyLogo: {
        width: 70,
        height: 70,
    },
    content:{
        justifyContent:'center',
        paddingLeft: 5,
        
    },
    title:{
        fontWeight:'bold',
    }
});