<template>
  <default-layout>
    <TodoFilter />

    <Loader v-if="loading"/>

    <TodoList v-else-if="getTodosFilter.length" />

    <div v-else class="container-fluid">
      <h6 class="todo-title text-center"> {{ msg }} </h6>
    </div>

    <TodoAdd />
  </default-layout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout'
import Loader from '@/components/Loader'
import TodoList from '@/components/TodoList'
import TodoAdd from '@/components/TodoAdd'
import TodoFilter from '@/components/TodoFilter'

import { mapGetters } from 'vuex'

export default {
  name: 'Todos',
  components: {
    DefaultLayout,
    Loader,
    TodoList,
    TodoAdd,
    TodoFilter
  },
  data () {
    return {
      loading: true,
      msg: 'You don\'t have any tasks yet.'
    }
  },
  computed: {
    ...mapGetters(['getTodosFilter'])
  },
  // methods: {
  //   ...mapActions(['fetchTodos'])
  // },
  // async mounted () {
  //   setTimeout(() => {
  //     this.fetchTodos()
  //     this.loading = false
  //   }, 1000)
  // }
  async mounted () {
    setTimeout(() => {
      this.loading = false
    }, 1000)
  }
}
</script>
