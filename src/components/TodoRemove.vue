<template>
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
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoRemove',
  props: ['todo'],
  methods: {
    ...mapActions(['removeTodo'])
  }
}
</script>
