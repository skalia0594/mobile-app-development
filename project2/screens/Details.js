import React from 'react';
import { View,Image,Text,StyleSheet,ScrollView } from 'react-native';
// import { movie } from '../mockData';

import {fetchMovieDetails, fetchMovies} from '../api'

export default class Details extends React.Component {
    state = {
        noDetails: false,
        data : [],
        isLoading : true
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const id = this.props.route.params.imdbID;
        const data = await fetchMovieDetails(id);
        if (typeof data === 'object'){
            this.setState({ data : data ,isLoading: false})
        }
        else{
            this.setState({ noDetails : true});
        }
        // console.log(movie)
    }
    render(){
         return(
            <View style={styles.container}>
                {!this.state.isLoading ? <Display movie={this.state.data} /> : <Text>Loading...</Text>}
                {this.state.noDetails && <Text style={{ padding:140 }}>Details not present!!!</Text>}
            </View>
        );
    }
}

const Display = ({movie}) => (
    <ScrollView >
        <View style={styles.image}>
            <Image style={styles.imageDimensions} source={{uri : movie.Poster}}/>
        </View>
         <View style={styles.detail}>
            <View><Text style={styles.title}>{movie.Title} ({movie.Year})</Text></View>
            <View><Text style={styles.padding}>{movie.Rated}, {movie.Runtime}</Text></View>
            <View><Text style={styles.padding}>{movie.Actors}</Text></View>
            <View><Text style={styles.padding}>{movie.Plot}</Text></View>
            <View>{movie.Ratings.map((obj,index) => <View key={index} ><Text style={styles.padding}>{obj.Source} ({obj.Value})</Text></View>)}</View>
        </View>
    </ScrollView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    detail: {
        padding: 10,
    },
    image: {
        alignItems:'center',
        padding: 5
    },
    imageDimensions: {
        height: 400,
        width: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 25,
        padding: 5
    },
    padding: {
        padding: 5
    },
});