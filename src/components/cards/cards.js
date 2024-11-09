import React, { useEffect, useState } from 'react';
import { Pagination, Alert } from 'antd';
import './cards.css';

import Search from '../input';
import Tab from '../tabs';
import Card from '../card/card';
import SwapiService from '../../service/swapi-service';

export default function Cards() {
    const [title, setTitle] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);
    const [guestSessionId, setGuestSessionId] = useState(null);
    const [search, setSearch] = useState('return');
    const [tabRatedMovies, setTabRatedMovies] = useState(false);
    const [stars, setStars] = useState({});
    const swapi = new SwapiService();

    useEffect(() => {
        const storageGuestSessionId = localStorage.getItem('guestSessionId');

        if (storageGuestSessionId) {
            setGuestSessionId(storageGuestSessionId);
        } else {
            swapi.guestSession()
                .then(data => {
                    localStorage.setItem('guestSessionId', data.guest_session_id);
                    setGuestSessionId(data.guest_session_id);
                })
                .catch((err) => {
                    console.error(`GuestSessionId: ${err}`);
                });
        }
    }, []);

    function upDateMovie() {
        setLoading(true);
        if (tabRatedMovies) {
            swapi.getRatedMovies(guestSessionId, currentPage)
                .then((res) => {
                    setTitle(res.results);
                    setTotalResults(res.total_results);
                    setLoading(false);
                }).catch((err) => {
                    setLoading(false);
                    setError(true);
                });
        } else {
            swapi.searchMovies(search, currentPage)
                .then((res) => {
                    setTitle(res.results);
                    setTotalResults(res.total_results);
                    setLoading(false);
                }).catch((err) => {
                    setLoading(false);
                    setError(true);
                });
        }
    }

    useEffect(() => {
        if (guestSessionId) {
            if (tabRatedMovies) {
                swapi.getRatedMovies(guestSessionId, currentPage)
                    .then((res) => {
                        setTitle(res.results);
                        setTotalResults(res.total_results);
                        setLoading(false);
                    }).catch((err) => {
                        setLoading(false);
                        setError(true);
                    });
            } else {
                swapi.searchMovies(search, currentPage)
                    .then((res) => {
                        setTitle(res.results);
                        setTotalResults(res.total_results);
                        setLoading(false);
                    }).catch((err) => {
                        setLoading(false);
                        setError(true);
                    });
            }
        }
    }, [search, currentPage, guestSessionId, tabRatedMovies]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const onSearch = (value) => {
        if (value === '') {
            setCurrentPage(1);
            upDateMovie();
        } else {
            setCurrentPage(1);
            setSearch(value);
        }
    }

    const handleRateChange = (movieId, rating) => {
        setLoading(true);
        setStars((prevRatings) => ({
            ...prevRatings,
            [movieId]: rating
        }));
        swapi.getMovieRating(movieId, guestSessionId, rating)
        setLoading(false);
    }

    const hundleTabsClick = (key) => {
        if (key === '2') {
            setTabRatedMovies(true);
            setCurrentPage(1)
            upDateMovie(); 
        } else {
            setTabRatedMovies(false);
            setCurrentPage(1);
        }
    }

    return (
        <>
            {error === true && <Alert message='Error' description='Произошла ошибка, проверьте интернет соединение' type="error" closable />}
            <Tab hundleTabsClick={hundleTabsClick} />
            {tabRatedMovies === false && <Search className='search' onSearch={onSearch} />}
            <Card loading={loading} title={title} error={error} handleRateChange={handleRateChange} stars={stars}/>
            <Pagination current={currentPage} total={totalResults} onChange={handlePageChange} className='pagination' />
        </>
    );
}