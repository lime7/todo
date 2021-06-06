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
        note: ''
      }
    }
  },
  methods: {
    ...mapActions(['addTodo']),
    onSubmit (e) {
      e.preventDefault()

      this.addTodo(this.task)
      this.task.title = ''
      this.task.note = ''
    },
    onReset () {
      this.task.title = ''
      this.task.note = ''
    }
  }
}
</script>
