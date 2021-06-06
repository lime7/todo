<template>
  <div class="todo">
    <div class="container-fluid">
      <div class="todo-top">
        <div class="d-flex align-items-center justify-content-between">
          <h6 class="todo-title m-0">Todo list</h6>
          <button
            type="button"
            class="btn btn-link p-0"
            v-on:click="clearTodos">
            Clear all
          </button>
        </div>
      </div>

      <transition-group name="list">
        <div
          v-for="todo in getTodosFilter"
          :key="todo.id" >
          <TodoItem :todo="todo" />
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import TodoItem from '@/components/TodoItem'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'TodoList',
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters(['getTodosFilter'])
  },
  methods: {
    ...mapActions(['clearTodos'])
  }
  // methods: {
  //   ...mapActions(['fetchTodos'])
  // },
  // mounted () {
  //   this.fetchTodos()
  // }
}
</script>

<style>
  .list-move,
  .list-leave-active,
  .list-enter-active {
    transition: 1s;
  }
  .list-enter,
  .list-leave-active {
    transform: translateY(30px);
    opacity: 0;
  }
</style>
