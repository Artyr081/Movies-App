import React from 'react';
import Input from 'antd/es/input/Input';
import './input.css';
import debounce from 'lodash.debounce';

export default function Search({ onSearch }) {

    function onSearchInput(event) {
        const searchBar = event.target.value;
        onSearch(searchBar);
    }

    return (
        <Input placeholder="Type to search..."  className='input' onChange={debounce(onSearchInput, 500)}/>
    )
}