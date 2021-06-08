<template>
  <div class="todo-add">
    <div class="footer fixed-bottom d-flex align-items-center justify-content-center">
      <div class="container-fluid">
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-lg btn-success w-100"
          data-bs-toggle="modal"
          data-bs-target="#AddNewTodoModal">
          Add new task
        </button>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="AddNewTodoModal"
      tabindex="-1"
      aria-labelledby="AddNewTodoModalLabel"
      aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="AddNewTodoModalLabel">Add new task</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-group mb-4">
              <input
                type="text"
                class="form-control"
                id="newTodoTitle"
                v-model="task.title"
                placeholder="Title">
            </div>
            <div class="form-group mb-4">
              <textarea
                rows="2"
                class="form-control"
                id="newTodoText"
                v-model="task.note"
                placeholder="Text...">
              </textarea>
            </div>
            <div
              class="btn-group justify-content-between colors"
              role="group"
              aria-label="Colors radiobox toggle button group">
              <div
                v-for="color in colors"
                :key="color.value">
                <input
                  type="radio"
                  class="btn-check"
                  :id="color.value"
                  :value="color.value"
                  v-model="colorChecked"
                  :checked="color.checked">
                <label
                  :class="'btn btn-' + color.value"
                  :for="color.value">
                    {{ color.value }}
                </label>
              </div>

              {{ colorChecked }}
            </div>
          </div>
          <div class="modal-footer d-block">
            <button
              type="button"
              class="btn btn-lg btn-success w-100 m-0 my-3"
              data-bs-dismiss="modal"
              v-on:click="onSubmit">Save changes</button>
            <button
              type="button"
              class="btn btn-lg btn-outline-success w-100 m-0"
              data-bs-dismiss="modal"
              v-on:click="onReset">Close</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <form
      class="form"
      v-on:submit="onSubmit"
      v-on:reset="onReset">
      <div class="form-group mb-4">
        <label for="newTodo" class="form-label">Add task name</label>
        <input
          type="text"
          class="form-control"
          id="newTodo"
          v-model="title">
      </div>
      <button type="submit" class="btn btn-primary me-4">Add</button>
      <button type="reset" class="btn btn-danger">Reset</button>
    </form> -->

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoAdd',
  data () {
    return {
      task: {
        title: '',
        note: '',
        color: this.$store.state.colorChecked
      },
      colors: this.$store.state.colors,
      colorChecked: this.$store.state.colorChecked
    }
  },
  methods: {
    ...mapActions(['addTodo', 'fetchColorChecked']),
    onSubmit (e) {
      e.preventDefault()

      this.addTodo(this.task)
      this.task.title = ''
      this.task.note = ''
      this.task.color = this.$store.state.colorChecked
    },
    onReset () {
      this.task.title = ''
      this.task.note = ''
      this.task.color = this.$store.state.colorChecked
    }
  },
  watch: {
    colorChecked (value) {
      this.fetchColorChecked(value)
    }
  }
}
</script>
