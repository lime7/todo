<template>
  <div class="filter">
    <div class="d-flex align-items-center justify-content-center h-100">

      <input
        v-for="option in options"
        :key="option.value"
        class="btn-check"
        type="radio"
        :id="option.value"
        v-model="selected"
        :value="option.value"
        name="ItemTodosFilter">
      <div
        v-for="option in options"
        :key="option.value"
        class="form-check m-0">
        <label
          class="form-check-label filter-label"
          :for="option.value">
          {{ option.text }}
        </label>
      </div>

      <span class="filter-trigger"></span>
    </div>

    <!-- <select
      class="form-select"
      v-model="selected">
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value">
          {{ option.text }}
      </option>
    </select> -->
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'TodoFilter',
  data () {
    return {
      options: [
        { value: 'all', text: 'All', checked: true },
        { value: 'completed', text: 'Completed', checked: false },
        { value: 'not_completed', text: 'Not completed', checked: false }
      ],
      selected: this.$store.state.selected
    }
  },
  methods: {
    ...mapActions(['fetchFilter'])
  },
  watch: {
    selected (value) {
      this.fetchFilter(value)
    }
  }
}
</script>
