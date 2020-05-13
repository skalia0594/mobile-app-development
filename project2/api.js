export const fetchMovies = async (keyword) => {
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=905aaa6e&s=${keyword}`, {
        method : 'GET'
        });
        const result = await response.json();
        if(result.Search){
            return result.Search;
        }
        else if(result.Error){
            return result.Error;
        }
        
    }catch(err){
        console.log(err => err.message);
    }
}

export const fetchMovieDetails = async (imdbid) => {
    try{
        const response = await fetch(`http://www.omdbapi.com/?apikey=905aaa6e&i=${imdbid}`, {
        method : 'GET'
        });
        const result = await response.json();
        
        if(result.Response === 'false'){
            return result.Error;
        }
        return result;
    }catch(err){
        console.log(err => err.message);
    }
}