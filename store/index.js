import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    movies: [],
    currentCategory: '',
    currentSearch: 'trending',
    pages: {
      current: 0,
      total: 0
    },
  },
  mutations: {
    setMovies (state, movies) {
      state.movies = movies
    },
    setCategory (state, category) {
      state.currentCategory = category;
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
          .get(`https://api.themoviedb.org/3/${this.state.currentCategory}/${id}?api_key=49f6cce872dedfb45746781479e03ce5`);

        movies = [response.data];
      } else {
        response = await axios
          .get(`https://api.themoviedb.org/3/trending/${this.state.currentCategory}/week?api_key=49f6cce872dedfb45746781479e03ce5`);

        movies = response.data.results
          .filter(({vote_average}) => vote_average > 0);
      }
  
      commit('setMovies', movies);
      commit('setPages', {current: 1, total: 1});
      commit('setCurrentSearch', 'trending')

    },
    async fetchSearch({commit}, {search}) {
      let movies;
      let tv;

      const responseMovies = await axios
        .get(`https://api.themoviedb.org/3/search/movie?api_key=49f6cce872dedfb45746781479e03ce5&query=${search}&page=1`);

      movies = responseMovies.data.results
        .filter(({vote_average, poster_path}) => {
          return (vote_average > 0 && poster_path !== null)
        })
        .map((item) => {return {...item, type: 'movie'}});

      const responseTv = await axios
        .get(`https://api.themoviedb.org/3/search/tv?api_key=49f6cce872dedfb45746781479e03ce5&query=${search}&page=1`);


      tv = responseTv.data.results
      .filter(({vote_average, poster_path}) => {
        return (vote_average > 0 && poster_path !== null)
      })
      .map((item) => {return {...item, type: 'tv'}});

      commit('setMovies', [...movies, ...tv]);
      commit('setCurrentSearch', `Search : ${search}`);
      commit('setPages', {current: 1, total: 1});

    },
    async getMovieBy({commit}, {request, page}) {
      const response = await axios
        .get(`https://api.themoviedb.org/3/${this.state.currentCategory}/${request}?api_key=49f6cce872dedfb45746781479e03ce5&page=${page}`);

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