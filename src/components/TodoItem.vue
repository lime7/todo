<template>
  <div>
    <div
      class="card mb-3 flex-row align-items-center justify-content-between"
      v-bind:class="{'editing' : settings }">

      <span class="visually-hidden">{{ todo.id }}</span>
      <span class="visually-hidden">{{ todo.completed }}</span>

      <div class="form-check" >
        <input
          class="form-check-input"
          type="checkbox"
          :id="todo.id"
          v-model="self.completed"
          v-on:click="$event.preventDefault()"
          data-bs-toggle="modal"
          :data-bs-target="'#ToggleStatusTodoModal-' + todo.id">
        <label
          class="form-check-label"
          :for="todo.id"
          ></label>
      </div>

      <div
        :class="['card-body text-white bg-gradient bg-' + todo.color , { 'active' : todo.completed }]">
        <div
          class="card-inner"
          type="button"
          data-bs-toggle="modal"
          :data-bs-target="'#ShowTodoModal-'+ todo.id">
          <h6 class="card-title">{{ todo.title }}</h6>
          <p class="card-text">
            {{ todo.note }}
          </p>
        </div>

        <button
          class="card-settings-trigger btn btn-link"
          v-on:click="isSettings">
          <i class="fas fa-ellipsis-v"></i>
        </button>
      </div>

      <div
        class="card-settings d-flex align-items-center justify-content-between flex-grow-0 flex-shrink-0"
        v-if="settings">
        <!-- Button trigger Edit modal -->
        <button
          type="button"
          class="btn btn-light btn-circle"
          data-bs-toggle="modal"
          :data-bs-target="'#EditTodoModal-'+ todo.id"
          v-on:click="editTodo(todo)">
          <i class="fas fa-pencil-alt"></i>
        </button>

        <!-- Button trigger Remove modal -->
        <button
          type="button"
          class="btn btn-light btn-circle"
          data-bs-toggle="modal"
          :data-bs-target="'#RemoveTodoModal-' + todo.id">
          <i class="far fa-trash-alt"></i>
        </button>
      </div>
    </div>

    <TodoShow :todo="todo" />
    <TodoEdit :todo="todo" />
    <TodoRemove :todo="todo" />
    <TodoComplete :todo="todo" />
  </div>
</template>

<script>
import TodoShow from '@/components/TodoShow'
import TodoEdit from '@/components/TodoEdit'
import TodoRemove from '@/components/TodoRemove'
import TodoComplete from '@/components/TodoComplete'

import { mapState, mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: ['todo'],
  components: {
    TodoShow,
    TodoEdit,
    TodoRemove,
    TodoComplete
  },
  data () {
    return {
      self: this.todo
    }
  },
  computed: mapState(['settings']),
  methods: {
    ...mapActions(['editTodo', 'toggleSettings']),
    isSettings () {
      this.toggleSettings()
    }
  }
}
</script>
