<template>
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoComplete',
  props: ['todo'],
  data () {
    return {
      status: this.todo.completed
    }
  },
  methods: {
    ...mapActions(['toggleStatus']),
    handleStatus (e) {
      this.$emit('change', e.target.value, this.status)
    }
  }
}
</script>
