<template>
  <div class="container">
    <FixedHeader />
    <main role="main">
      <section class="title">
        <h1>Vue3 Rhythm Clock</h1>
      </section>
      <RhythmClock />
    </main>
    <footer class="footer">
      <div class="footer__inner">
        <h3>
          By
          <a
            href="https://antoine-turquois.com"
            target="_blank"
            rel="noreferrer"
          >Antoine Turquois
          </a>
        </h3>
        <h4>
          <a
            href="https://github.com/deltantoine/vue3-rhythm-clock"
            target="_blank"
          >Github
          </a>
        </h4>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import FixedHeader from '@/components/FixedHeader.vue'
import RhythmClock from '@/components/RhythmClock.vue'
</script>
