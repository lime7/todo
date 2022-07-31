<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top">
      <div class="container-fluid">
        <a
          class="btn btn-circle btn-light"
          data-bs-toggle="offcanvas"
          href="#offcanvasMenu"
          role="button"
          aria-controls="offcanvasMenu">
          <i class="fas fa-bars"></i>
        </a>

        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasMenu" aria-labelledby="offcanvasMenuLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
            <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body">
            <div id="nav" class="nav flex-column">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
            </div>

            <div class="info my-4">
              Total task: <strong>{{ getTodosFilter.length }}</strong>
            </div>

            <div class="copyright">
              Made with <span class="text-danger"><i class="fas fa-heart"></i></span>
            </div>
          </div>
        </div>

        <h1 class="h4 navbar-brand mx-auto">{{ appTitle }}</h1>

        <transition name="slide">
          <TodoSearch
            v-if="triggerSearch"
            v-on:close-search="closeSearch"
            v-bind:class="{'search-active': triggerSearch}" />
        </transition>

        <a
          class="btn btn-circle btn-light search-trigger"
          role="button"
          v-on:click="openSearch">
          <i class="fas fa-search"></i>
        </a>
      </div>
    </nav>

    <slot />
  </div>
</template>

<script>
import TodoSearch from '@/components/TodoSearch'

import { mapGetters } from 'vuex'

export default {
  name: 'DefaultLayout',
  components: {
    TodoSearch
  },
  data () {
    return {
      appTitle: 'My Task',
      triggerSearch: false
    }
  },
  computed: {
    ...mapGetters(['getTodosFilter'])
  },
  methods: {
    openSearch () {
      this.triggerSearch = true
    },
    closeSearch () {
      this.triggerSearch = false
    }
  }
}
</script>

<style>
  .search-active {
    width: calc(100% - 1.5rem);
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: all 1s;
  }

  .slide-enter-to,
  .slide-leave-from {
    width: calc(100% - 1.5rem);
    z-index: 5;
  }

  .slide-enter-from,
  .slide-leave-to {
    width: 0;
    z-index: 1;
  }
</style>
