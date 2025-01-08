import { Pagination } from 'antd'
import React from 'react'

const App = () => {
    render () {
        return (
            <section className ='movies-app'></section>
            <Header/>
            <SearchInput/>
            <MoviesCard/>
            <Pagination/>

        )
    }
}