<template>
  <div style="width: 100%" class="screen">
    <h1 class="title">{{ screen.name }}</h1>
    <div :key="i" v-for="(section, i) in screen.sections">
      <h1 class="subtitle">
        {{ section.title }}
      </h1>
      <div :key="containerIndex" v-for="(container, containerIndex) in section.containers">
        <form :container="container"></form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Page'
}
</script>
