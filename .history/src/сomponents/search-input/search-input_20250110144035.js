
import React, { Component } from 'react';
import { debounce } from 'lodash';
import MovieServices from '../../services/services';

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    // Инициализация состояния
    this.state = {
      searchValue: '',
    };

    // Создаем экземпляр MovieServices
    this.movieServices = new MovieServices();

    // Привязываем методы к контексту класса
    this.handleSearch = this.handleSearch.bind(this);

    // Дебаунсированная версия performSearch
    this.performSearch = debounce(this.performSearch.bind(this), 00);
  }

  // Метод для выполнения поиска
  performSearch(query) {
    this.movieServices.fetchMovies(query)
      .then((response) => console.log(response))
      .catch((error) => console.error('Ошибка при поиске фильмов:', error));
  }

  // Обработчик изменения значения ввода
  handleSearch(event) {
    const value = event.target.value;
    this.setState({ searchValue: value }); // Обновляем состояние
    this.performSearch(value); // Вызываем дебаунсированную функцию
  }

  render() {
    const { searchValue } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Введите текст для поиска"
          value={searchValue}
          onChange={this.handleSearch}
        />
      </div>
    );
  }
}
