<template>
  <div class="search">
    <form class="d-flex">
      <input
        class="form-control me-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
        v-model="search">
      <button
        class="btn btn-circle btn-light"
        type="button"
        v-on:click="closeSearch">
        <i class="fas fa-times"></i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoSearch',
  data () {
    return {
      search: this.$store.state.searchTodo
    }
  },
  methods: {
    ...mapActions(['fetchSearch']),
    closeSearch () {
      this.$emit('close-search')
    }
  },
  watch: {
    search (value) {
      this.fetchSearch(value)
    }
  }
}
</script>
