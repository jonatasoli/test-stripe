# Vue Components

## Structure

Nowadays, makes more sense do use SFC structure (https://vuejs.org/v2/guide/single-file-components.html) instead of *old school* Vue component syntax.

## Naming

* **Concise:** not over specific, not overly abstract.
* Short: 1 to 3 words.
* Pronounceable: we want to be able to talk about them.
* Component names should prefer full words over abbreviations.
* Avoid naming using `html` tags as component names.
    * Bad: `<form :data="data" />`
    * Good: `<user-form :data="data" />`
* Component name should be in `PascalCase`.
* File name and component name needs to have the same name. This will help find it easily.

### Ordering

Follow default Vue recommendation.

```vue
<template>
  <!--... -->
</template>

<script lang="ts" setup>
  // ...
</script>

<style lang="scss" scoped>
  //  ...
</style>

<i18n>
</i18n>
```

```vue

<template>
  <!-- templating goes here -->
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'

withDefaults(
  defineProps<{
    // your props types goes here  
  }>(),
  {
    // your props default values goes here  
  }
)
</script>

<!-- Use "scoped" attribute to limit SCSS to this component only -->
<style lang="scss" scoped>
/* CSS Rules Goes Here */
</style>
```

### Recommended use:

* CSS Scoped **only**
* It is **mandatory** to wrap template with a class that describes component name (root element).
* If you need to change child component/third party structure, use `::v-deep` selector (https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors).
* In order to make easier the `e2e` tests development, is mandatory to let a [`data-cy`](https://docs.cypress.io/guides/references/best-practices) attribute in the root element

```vue
// HelloWorld.vue

<template>
  <div class="hello-world" data-cy="hello-world-component">
    <p>Hello World!</p>
    <child-component />
  </div>
</template>

<script lang="ts" setup>
import ChildComponent from './ChildComponent.vue'

export default {}
</script>

<!-- Use "scoped" attribute to limit SASS to this component only -->
<style lang="scss" scoped>
.hello-world {
  position: relative;

  /* Component Scoped SCSS goes here **/
  ::v-deep {
    .child-component {}
    .third-party-content {}
  }
}
</style>

```

### Template

* Self-closing components: components with no content should be self-closing in DOM templates.
* Component names should always be `PascalCase` in single-file components and string templates - but `kebab-case` in DOM templates.
* Prop names should always use `camelCase` during declaration, but `kebab-case` in templates.
* Elements with multiple props/attributes should span multiple lines, with one attribute per line.
    * Exception: if props/attributes are a short, you can keep in the same line.
* Component templates should only include simple expressions, with more complex expressions refactored into computed properties or methods.
    * Complex expressions in your templates make them less declarative.
    * Use a computed property or method instead.
* Non-empty HTML attribute values should always be inside quotes.
* Directive shorthands (`:` for `v-bind:`, `@` for `v-on:` and `#` for `v-slot`) should be used always.
* HTML classes: case element posses static classes and dynamic classes, use `class=""` HTML attribute for static and `:class=""` binding for dynamic classes.
    * Use Object syntax to define dynamic classes https://vuejs.org/v2/guide/class-and-style.html#Object-Syntax

### Module based development

*text adapted from: https://github.com/pablohpsilva/vuejs-component-style-guide*

* Always build your app out of small modules which do one thing and do it well.
* A module is a small self-contained part of an application. The Vue.js library is specifically designed to help you create `view-logic` modules.
* Small modules are easier to learn, understand, maintain, reuse and debug. Both by you and other developers.
* Each Vue component (like any module) must be `FIRST`: **Focused** (single responsibility), **Independent**, **Reusable**, **Small** and **Testable**.
* If your component does too much or gets too big, split it up into smaller components which each do just **one thing**.
* Try to keep each component file less than 100 lines of code.
* Ensure your Vue component works in isolation. This will help to improve `DRY` (Don't repeat yourself).
