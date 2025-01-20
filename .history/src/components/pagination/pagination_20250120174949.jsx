import React from 'react'
import { Pagination } from 'antd'

const PaginationControl = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination
        className="movies-app"
            current={currentPage}
            total={totalPages * 10}
            onChange={onPageChange}
            style={{ marginTop: '24px', textAlign: 'center' }}
        />
    )
}

export default PaginationControl
