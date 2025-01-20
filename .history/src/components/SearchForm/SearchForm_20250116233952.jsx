import React from 'react'
import { Input } from 'antd'
import './searchForm.css'

const SearchForm = ({ query, onSearchChange }) => {
    return (
        <Input placeholder="Type to search..." value={query} onChange={onSearchChange} className="movies-app__search" />
    )
}

export default SearchForm
