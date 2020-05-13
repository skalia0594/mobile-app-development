import React from 'react';
import { View,Text,TextInput, StyleSheet, FlatList} from 'react-native';
import { search } from '../mockData';
import Row from './Row';
import { fetchMovies } from '../api'


const {Search} = search; // mock data

export default class Home extends React.Component {
    state ={
        searchBox: '',
        list: []  //Search // mockdata
    }
    getData = async (keyword) => {
        const data = await fetchMovies(keyword);
        return data;
        // console.log(data);
    }
    handleSearchBox = async (val) => {
        this.setState({ searchBox : val});
        let suggesionList = [] //Search; //   mock data
        if(val.length > 2){
            const regex = new RegExp(`^${val}`,'i');
            const data = await this.getData(val);
            if(typeof data === 'object'){
                suggesionList = data;
            }    
        }
        this.setState({ list : [...suggesionList ] });
    }
    renderItem = ( obj ) => (
        <Row  {...obj.item} navigation={this.props.navigation} />
    )

    render(){
        // console.log(this.state.list);
        return(
            <View style={styles.container}>
                <TextInput 
                    style={styles.searchBox} 
                    value={this.state.searchBox} 
                    onChangeText = {this.handleSearchBox} 
                    placeholder = 'Search' 
                />
                {this.state.list.length>0 ? <FlatList 
                    data = {this.state.list}
                    renderItem = {this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    /> : <View style={styles.noresult}><Text>No results</Text></View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
    searchBox:{
        // borderColor: 'red',
        borderWidth: 2,
        // width: 300,
        marginHorizontal:20,
        marginVertical: 20,
        paddingLeft: 5
    },  
    noresult: {
        alignItems:'center'
    },
});
