import React from 'react'
import { Pagination } from 'antd'
import './movies-card.css'

const PaginationControl = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination
            current={currentPage}
            total={totalPages * 10}
            onChange={onPageChange}
            style={{ marginTop: '24px', textAlign: 'center' }}
        />
    )
}

export default PaginationControl
