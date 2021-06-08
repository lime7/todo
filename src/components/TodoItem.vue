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

    <!-- Modal Show -->
    <div
      class="modal fade"
      :id="'ShowTodoModal-'+ todo.id"
      tabindex="-1"
      aria-labelledby="ShowTodoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <h3 class="modal-title">{{ todo.title }}</h3>

              <div class="modal-text mb-4">
                {{ todo.note }}
              </div>

              <div class="text-secondary">
                id: {{ todo.id }} | completed: {{ todo.completed }} | color: {{ todo.color }}
              </div>
            </div>
          </div>
          <div class="modal-footer d-block">
            <button
              type="button"
              class="btn btn-lg btn-success w-100 m-0 mb-3"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              :data-bs-target="'#EditTodoModal-'+ todo.id"
              v-on:click="editTodo(todo)">
              <i class="fas fa-pencil-alt me-3"></i>
              <span>Edit</span>
            </button>

            <button
              type="button"
              class="btn btn-lg btn-outline-success w-100 m-0"
              data-bs-toggle="modal"
              data-bs-dismiss="modal"
              :data-bs-target="'#RemoveTodoModal-' + todo.id">
              <i class="far fa-trash-alt me-3"></i>
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Edit -->
    <div
      class="modal fade"
      :id="'EditTodoModal-'+ todo.id"
      tabindex="-1"
      aria-labelledby="EditTodoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <h3 class="modal-title">Edit task {{ todo.id }}</h3>
              <div class="form-group mb-3">
                <!-- <input
                  type="text"
                  class="form-control"
                  v-model="self.title"> -->
                  <input
                    type="text"
                    class="form-control"
                    :value="task.title"
                    v-on:input="onInputTitle">
              </div>
              <div class="form-group mb-3">
                  <input
                    type="text"
                    class="form-control"
                    :value="task.note"
                    v-on:input="onInputNote">
              </div>
              <div
                class="btn-group justify-content-between colors"
                role="group"
                aria-label="Colors radiobox toggle button group">
                <!-- <div
                  v-for="color in colors"
                  :key="color.value">
                  <input
                    type="radio"
                    class="btn-check"
                    :id="color.value"
                    :value="color.value"
                    v-model="task.color">
                  <label
                    :class="'btn btn-' + color.value"
                    :for="color.value">
                      {{ color.value }}
                  </label>
                </div> -->

                {{ task.color }}
              </div>
            </div>
          </div>
          <div class="modal-footer d-block">
            <button
              type="button"
              class="btn btn-lg btn-success w-100 m-0 mb-3"
              data-bs-dismiss="modal"
              v-on:click="saveEdit">Save</button>
            <button
              type="button"
              class="btn btn-lg btn-outline-success w-100 m-0"
              data-bs-dismiss="modal"
              v-on:click="settings = false">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Remove -->
    <div
      class="modal modal-confirm modal-confirm_red fade"
      :id="'RemoveTodoModal-' + todo.id"
      tabindex="-1"
      aria-labelledby="RemoveTodoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <div class="modal-icon">
                <i class="far fa-trash-alt"></i>
              </div>
              <h3 class="modal-title">Delete</h3>
              <p class="modal-text">
                Are you shure?
              </p>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button
              type="button"
              class="btn btn-lg btn-outline-success"
              data-bs-dismiss="modal"
              v-on:click="settings = false">No</button>
            <button
              type="button"
              class="btn btn-lg btn-success"
              data-bs-dismiss="modal"
              v-on:click="removeTodo(todo.id)">Yes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Complete -->
    <div
      class="modal modal-confirm modal-confirm_blue fade"
      :id="'ToggleStatusTodoModal-' + todo.id"
      tabindex="-1"
      aria-labelledby="ToggleStatusTodoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header justify-content-center">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="text-center">
              <div class="modal-icon">
                <i class="fas fa-check"></i>
              </div>
              <h3 class="modal-title">Complete</h3>
              <p class="modal-text">
                Are you shure?
              </p>
            </div>
          </div>
          <div class="modal-footer justify-content-between">
            <button
              type="button"
              class="btn btn-lg btn-outline-success"
              data-bs-dismiss="modal">No</button>
            <button
              type="button"
              class="btn btn-lg btn-success"
              data-bs-dismiss="modal"
              v-on:click="toggleStatus(todo)">Yes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoItem',
  props: ['todo'],
  data () {
    return {
      status: this.todo.completed,
      self: this.todo,
      settings: false,
      task: {
        title: this.todo.title,
        note: this.todo.note,
        color: this.$store.state.colorChecked
      }
      // colors: this.$store.state.colors,
      // colorChecked: this.$store.state.colorChecked
    }
  },
  methods: {
    ...mapActions(['toggleStatus', 'removeTodo', 'editTodo', 'saveEditTodo', 'fetchColorChecked']),
    handleStatus (e) {
      this.$emit('change', e.target.value, this.status)
    },
    isSettings () {
      this.settings = !this.settings
    },
    onInputTitle (e) {
      this.task.title = e.target.value
    },
    onInputNote (e) {
      this.task.note = e.target.value
    },
    saveEdit () {
      this.saveEditTodo(this.task)
      this.settings = false
    }
  },
  watch: {
    colorChecked (value) {
      this.fetchColorChecked(value)
    }
  }
}
</script>
