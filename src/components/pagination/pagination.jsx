import React from 'react'
import { Pagination } from 'antd'
import './pagination.css'

const PaginationControl = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination
            className="movies-app__pagination"
            current={currentPage}
            total={totalPages * 10}
            onChange={onPageChange}
        />
    )
}

export default PaginationControl
