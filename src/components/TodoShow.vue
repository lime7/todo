<template>
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
</template>

<script>
export default {
  name: 'TodoShow',
  props: ['todo']
}
</script>
