import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    movies: [],
    currentSearch: "",
    pages: {
      current: 0,
      total: 0
    },
  },
  mutations: {
    setMovies (state, movies) {
      state.movies = movies
    },
    setPages (state, pages) {
      state.pages = pages;
    },
    setCurrentSearch (state, currentSearch) {
      state.currentSearch = currentSearch;
    },
    showMoreMovies (state, movies) {
      state.movies = [...state.movies, ...movies];
    }
  },
  actions: {
    async fetchMovies({commit}, {id}) {
      let response;
      let movies;
      
      if(id) {
        response = await axios
          .get(`https://api.themoviedb.org/3/movie/${id}?api_key=49f6cce872dedfb45746781479e03ce5`);

        movies = [response.data];
      } else {
        response = await axios
          .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=49f6cce872dedfb45746781479e03ce5`);

        movies = response.data.results
          .filter(({vote_average}) => vote_average > 0);
      }
  
      commit('setMovies', movies);
      commit('setPages', {current: 1, total: 1});
      commit('setCurrentSearch', '')

    },
    async fetchSearch({commit}, {search}) {
      let movies;

      if(search.length > 2) {
        const response = await axios
          .get(`https://api.themoviedb.org/3/search/movie?api_key=49f6cce872dedfb45746781479e03ce5&query=${search}&page=1`);

        movies = response.data.results
          .filter(({vote_average, poster_path}) => {
            return (vote_average > 0 && poster_path !== null)
          });
      } else {
        movies = [];
      }

      commit('setMovies', movies);
      commit('setCurrentSearch', '');
      commit('setPages', {current: 1, total: 1});

    },
    async getMovieBy({commit}, {request, page}) {
      const response = await axios
        .get(`https://api.themoviedb.org/3/movie/${request}?api_key=49f6cce872dedfb45746781479e03ce5&page=${page}`);

      const movies = response.data.results;
      const pages = {
        current: page,
        total: response.data.total_pages
      }
      const currentSearch = request

      commit('setPages', pages);

      if (page === 1) {
        commit('setMovies', movies);
        commit('setCurrentSearch', currentSearch)
      } else {
        commit('showMoreMovies', movies)
      }
  
    }
  }
});

export default store;