import { Pagination } from 'antd'
import React from 'react'

const App = () => {
    render () {
        return (
            <section className ='movies-app'>
                <header className='header'>
                <Header/>
                </header>
                <section className='main'
            <SearchInput/>
            <MoviesCard/>
            <Pagination/>
            </section>

        )
    }
}