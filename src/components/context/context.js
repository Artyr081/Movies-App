import React, {useState, createContext, useEffect} from 'react';

import './context.css';
import SwapiService from '../../service/swapi-service';

const swapi = new SwapiService();
const GenreContext = createContext();
function GenreProvider({children}) {
    const [genres, setGenres] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const data = await swapi.getMovieList();
            const genreMap = {};
            // eslint-disable-next-line array-callback-return
            data.genres.map(item => {
                genreMap[item.id]= item.name;
            })
            setGenres(genreMap);
        }
        fetchData();
    }, []);

    return (
        <GenreContext.Provider value={genres}>{children}</GenreContext.Provider>
    )
}

export {GenreContext, GenreProvider};