import { Pagination } from 'antd'
import React from 'react'

const App = () => {
    render () {
        return (
            <section className ='movies-app'>
                <header></header>
            <Header/>
            <SearchInput/>
            <MoviesCard/>
            <Pagination/>
            </section>

        )
    }
}