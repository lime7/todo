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
                  v-model="task.color"
                  :checked="color.checked">
                <label
                  :class="'btn btn-' + color.value"
                  :for="color.value">
                    {{ color.value }}
                </label>
              </div>

              {{ task.color }}
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
        color: ''
      },
      colors: this.$store.state.colors,
      colorChecked: this.$store.state.colorChecked
    }
  },
  methods: {
    ...mapActions(['addTodo']),
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
  }
}
</script>
