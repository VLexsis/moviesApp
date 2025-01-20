import React from 'react'
import { Input } from 'antd'

const SearchForm = ({ query, onSearchChange }) => {
    return (
        <Input
            placeholder="Type to search..."
            value={query}
            onChange={onSearchChange}
            className="movies-container__search"
        />
    )
}

export default SearchForm
