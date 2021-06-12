<template>
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
              <div
                v-for="color in colors"
                :key="color.value">
                <input
                  type="radio"
                  class="btn-check"
                  :id="'edit-' + color.value"
                  :value="color.value"
                  v-model="task.color"
                  :checked="color.checked">
                <label
                  :class="'btn btn-' + color.value"
                  :for="'edit-' + color.value">
                    {{ color.value }}
                </label>
              </div>

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
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TodoEdit',
  props: ['todo'],
  data () {
    return {
      task: {
        title: this.todo.title,
        note: this.todo.note,
        color: this.todo.color
      },
      colors: this.$store.state.colors
    }
  },
  computed: mapState(['settings']),
  methods: {
    ...mapActions(['saveEditTodo', 'toggleSettings']),
    onInputTitle (e) {
      this.task.title = e.target.value
    },
    onInputNote (e) {
      this.task.note = e.target.value
    },
    saveEdit () {
      this.saveEditTodo(this.task)
      this.toggleSettings()
    }
  }
}
</script>
