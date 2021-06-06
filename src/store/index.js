import { createStore } from 'vuex'
// import axios from 'axios'
import lS from './localStorage'

export default createStore({
  state: {
    todos: lS.fetch(),
    // todos: [],
    limit: 3,
    selected: 'all',
    editedTodo: null,
    searchTodo: ''
  },
  getters: {
    getTodos (state) {
      return state.todos
    },
    getTodosFilter (state) {
      let res = state.todos

      if (state.searchTodo) {
        res = res.filter((todo) => todo.title.toUpperCase().includes(state.searchTodo.toLowerCase()))
      }

      if (state.selected === 'all') {
        return res
      }

      if (state.selected === 'completed') {
        return res.filter((todo) => (todo = todo.completed))
      }

      if (state.selected === 'not_completed') {
        return res.filter((todo) => (todo = !todo.completed))
      }
    }
  },
  mutations: {
    setTodos (state, payload) {
      state.todos = payload

      lS.save(payload || [])
    },
    setStatus (state, payload) {
      payload.completed = !payload.completed

      lS.save(state.todos || [])
    },
    setFilter (state, payload) {
      state.selected = payload
    },
    setRemoveTodo (state, payload) {
      state.todos = state.todos.filter((todo) => todo.id !== payload)

      lS.save(state.todos || [])
    },
    setAddTodo (state, payload) {
      const newTodo = {
        id: state.limit + 1,
        title: payload.title,
        note: payload.note,
        completed: false
      }

      state.limit++
      state.todos.push(newTodo)

      lS.save(state.todos || [])
    },
    setEditTodo (state, payload) {
      state.editedTodo = payload
    },
    setSaveEditTodo (state, payload) {
      state.editedTodo.title = payload.title
      state.editedTodo.note = payload.note
    },
    setSearch (state, payload) {
      state.searchTodo = payload
    },
    setClearTodos (state, payload) {
      state.todos = []
    }
  },
  actions: {
    // async fetchTodos ({ commit }) {
    //   axios
    //     .get('https://jsonplaceholder.typicode.com/todos/?_limit=3')
    //     .then((response) => {
    //       this.commit('setTodos', response.data)
    //     })
    //     .catch((err) => {
    //       console.log(err)
    //     })
    // },
    async toggleStatus ({ commit }, todo) {
      this.commit('setStatus', todo)
    },
    fetchFilter ({ commit }, value) {
      this.commit('setFilter', value)
    },
    removeTodo ({ commit }, id) {
      this.commit('setRemoveTodo', id)
    },
    addTodo ({ commit }, payload) {
      this.commit('setAddTodo', payload)
    },
    editTodo ({ commit }, todo) {
      this.commit('setEditTodo', todo)
    },
    saveEditTodo ({ commit }, payload) {
      this.commit('setSaveEditTodo', payload)
    },
    fetchSearch ({ commit }, value) {
      this.commit('setSearch', value)
    },
    clearTodos ({ commit }) {
      this.commit('setClearTodos')
      lS.clear()
    }
  },
  modules: {
  }
})
