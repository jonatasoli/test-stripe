# Vue Components

Coding

## Naming

### Component

* Use `PascalCase` for their instances.
* Component should have a clear name, so anyone with a quick look can understand its intent.
* Try append at end of the component namespace name.
  ** Examples: `User/UserCard.vue`, `common/navs/MenuNav.vue`
* Always look to put in subfolders to help organize.
* To call a component, use kebab-cased name over other styles when using it in a template.
* Always create the follow structure in your componens:

```
components
├── ...
├── <component-type>                          // fields, buttons, etc
│   ├── <ComponentName>                
│   │   ├── __snapshots__
│   │   ├── mockData
│   │   ├── <ComponentName>.vue
│   │   ├── <ComponentName>.spec.ts
```

### Importing

* Always add an `index.js` file in the same folder, dealing with **named exports**. In this way, it will improve imports
  organization and tree shaking.
* Remember to always updated `index.js` file when new components are added to the same folder.
* Avoid importing `.vue` directly to components, unless it is in the same folder.

**Note:**

If you face circular imports problem, probably you approach for the component (or view) needs to be revisited.

Webpack is able to resolve imports in the best possible way, but Jest/Cypress use node to deal with imports using NodeJS strategy.

```js
// index.js
export { default as UserCard } from './UserCard.vue'
```

```html
<script>
// BAD
// ...
import UserCard from '@/components/User/UserCard.vue'
// ....
</script>
```

```html
<script>
// GOOD
// ...
import { UserCard } from '@/components/User'
// ....
</script>
```

### Props Naming

* Avoid using DOM component prop names.
* Use kebab-case instead of camelCase to provide props in templates.
* Prop definitions should be as detailed as possible.

```html
<!-- bad -->
<exampleComponent myProp="prop" />

<!-- good -->
<example-component my-prop="prop" />
```

### Computed

* Complex computed properties should be split into as many simpler properties as possible.

### Methods

* For events, use `handle` prefix.
    * Example: `handleClick`, `handleUser`, `handleSubmit`,.
* For boolean methods, prefix with basic **auxiliary verbs** or **modal verbs**: `is`, `are`, `have`, `has`, `had`, `was`, `were`, `can`, etc
    * Example: `isActive`, `canAccessAdmin`, `hasAdminStatus`.
    * Try to stick with the basic naming when prefixing with these verbs.
* For methods, use imperative grammar, with the intent explicit in the name. So others users can easily understand what the methods do just looking at the name.
    * Example: `saveUser`, `changeStatus`, `doLogin`


### Quotes

**Always use** double quotes `"` inside templates and single quotes `'` for all other JS.

### Props definition

* Naming must be **concise**, since it will act as html attribute when binding data from templates.
* Props **must be** declared as an object.
* For important props, use `required: true`.
* Default key should be provided if the prop is not required. **Always assume a default value**, to help checkings and avoid side-effects.
* To set default value for scalar types (Boolean, String, Number), just use `default: value`. Case default value is an array or object, you should use `default` key as function.
* There is some cases a `validator()` callback is need to enforce property correct usage.
* Props are immutable, **avoid changing it directly**. Mutating a prop locally is now considered an anti-pattern.
* As we are using the composition API and TypeScript, we must type out props using them.

```vue
<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'

interface User {
  name: String,
}

withDefaults(
  defineProps<{
    name: string
    label?: string  // Optional prop defined by using `?`
    hint?: string,
    options?: Array<string>,
    userData?: User
  }>(),
  {
    label: '',     // Adding the default value for the optional label prop
    hint: '',
    options: () => [],
    userData: () => {}
  }
)
</script>
```

### Data

* Data property should always be a function that returns an object with available mutating variables.
* Case you need to mutate something that came from a `prop` declaration, create a data variable to clone property data (by value).
* Props must be in **camelCase**.
* Try to order props alphabetically
* Avoid setting data using external variables/imports. This is **bad** practice.


```js
// bad
export default {
  name: 'ExampleComponent',
  // ...
  data: {
    name: '',
    lastName: '',
    foo: 'bar',
    emailRegex: emailValidator // bad: setting prop using external variable/import
  }
}
```

```js
// good
export default {
  name: 'ExampleComponent',
  // ...
  data() {
    return {
      foo: 'bar',
      lastName: '',
      name: ''
    }
  }
  // ...
}
```

### Ordering

#### Single File Component (.vue)

* Follow Vue suggested tags ordering (template/script/style/i18n).

```vue
<!-- bad -->
<i18n>

</i18n>

<script [lang]>
  //...
</script>

<template [lang]>
  <!-- -->
</template>

<style [lang][scoped]>
  /* ... */
</style>
```

```vue
<!-- good -->
<template [lang]>
  // ...
</template>

<script [lang]>
  // ...
</script>

// We don't use scoped styles but there are few instances of this
<style [lang][scoped]>
  // ...
</style>

<i18n>

</i18n>
```

#### Import Order

* `Sort Imports` [plugin](https://www.npmjs.com/package/import-sort) is active for this project. There is a git pre-hook to force sorting imports.
* VSCode Sort Imports [extension](https://marketplace.visualstudio.com/items?itemName=amatiasq.sort-imports) is recommended for this project.


#### Properties in Component

It is suggested to follow the ordering enforced by `vue/order-in-components` (https://github.com/vuejs/eslint-plugin-vue/blob/master/docs/rules/order-in-components.md) linter rule.

Please refer to [STRUCTURE.md](STRUCTURE.md) file to understand the correct properties ordering.

Further reading: https://vuejs.org/v2/style-guide/#Component-instance-options-order-recommended

### Templates

#### Attributes/Props Order

Recommended order:

1. Unique identifier: `ref`, `key`, `slot`
2. bindings
3. static props
4. DOM attributes
5. Events
6. definitions/list-rendering/conditionals/other `v-` directives. Examples:
    * `v-if/v-else/v-else-if` (use at very end of the element)
    * `v-for` (use at very end of the element)
    * `v-is`/`:is`
    * `v-once`
    * `v-*`

This helps readability and eases understanding how an element will behave.

```html
// bad
<template>
  <div class="foo">
    <list-items class="list-users" list-title="Users" :items="users" />
    <div v-if="isSomething" class="list-details">
      Lorem ipsum sit amet
    </div>
    <div class="another-list">
      <ul class="list">
        <li v-for="item in list" :key="item-${item.id}" class="item">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

// good
<template>
  <div class="foo">
    <list-items :items="users" list-title="Users" class="list-users" />
  </div>
  <div class="list-details" v-if="isSomething">
    Lorem ipsum sit amet
  </div>
  <div class="another-list">
    <ul class="list">
      <li :key="item-${item.id}" class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>
```

**Note:** this is going in the **wrong-way** of the linter rule [vue/attributes-order](https://eslint.vuejs.org/rules/attributes-order.html) dictates. But for this guide, it is advised to group attributes by its intent/meaning instead.

**Use `<template>` tag to use conditional group elements whenever possible**

```html
<template>
  <template v-if="ok">
    <h1>Title</h1>
    <!-- //... -->
  </template>
  <template v-else>
    <h2>Fallback Title</h2>
    <!-- //... -->
  </template>
</template>
```

Further reading: https://vuejs.org/v2/guide/conditional.html#Conditional-Groups-with-v-if-on-lt-template-gt

#### Loops

Using `:key` attribute is *mandatory* to help provide a unique identifier for the element being iterated.

* always try to use a concise (and short) name for the key
* If object being iterated is an array, try to use a unique identifier of the object. 

```html
// bad
<template>
  <div class="list">
    <ul>
      <li class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good (arrays)
<template>
  <div class="list">
    <ul>
      <li :key="`item-${i}`" class="item" v-for="(item, i) in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good (objects)
<template>
  <div class="list">
    <ul>
      <li :key="`item-${item.id}`" class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good (no unique id available to use)
<template>
  <div class="list">
    <ul>
      <li :key="`item-${generateId()}`" class="item" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
//...
import { v1 as uuid } from 'uuid'
//...

export default {
  //...
  methods: {
    generateId() {
      return uuid()
    }
  }
  //...
}
</script>
```

Use `v-for` syntax at end of the element, to help better readability.

```html
// bad
<template>
  <div class="list">
    <ul>
      <li v-for="item in list" class="item" :key="`item-${item.id}`">{{ item.name }}</li>
    </ul>
  </div>
</template>

// good
<template>
  <div class="list">
    <ul>
      <li :key="`item-${item.id}`" v-for="item in list" v-for="item in list">{{ item.name }}</li>
    </ul>
  </div>
</template>
```

Note: **Do not** use `v-for` and `v-if` [together](https://vuejs.org/v2/guide/list.html#v-for-with-v-if).

#### Events

**Use `@` shorthand instead `v-on:`**

This will help readability and write less.

```html
// bad
<template>
  <div class="foo">
    <foo v-on:click="handleClick" />
  </div>
</template>

// good
<template>
  <div class="foo">
    <foo @click="handleClick" />
  </div>
</template>
```

**Note:** if you need to route events from `parent => child`, you can use `v-on` directive with `$listeners` internal prop.

```html
<template>
  <div class="foo">
    <foo v-on="$listeners" />
  </div>
</template>
```

**Use colon `(:)` to keep event naming separated, case is using multiple words**

* Avoid using `kebab-case` events.
* Max 3 words per event.

```html
<!-- good -->
<template>
  <div class="foo">
    <foo @project:update="handleSaveInfo" />
  </div>
</template>

<!-- good -->
<template>
  <div class="foo">
    <foo @project:note-add="handleSaveInfo" />
  </div>
</template>

<!-- good -->
<template>
  <div class="foo">
    <foo @project:notes:add="handleSaveInfo" />
  </div>
</template>

<!-- bad -->
<template>
  <div class="foo">
    <foo @project:notes:user:add="handleSaveInfo" />
  </div>
</template>
```

**Use concise event names for custom events**

```html
<!-- good -->
<template>
  <div class="foo">
    <foo @save:info="handleSaveInfo" />
  </div>
</template>

<-- bad -->
<template>
  <div class="foo">
    <foo @handle:save="handleSaveInfo" />
  </div>
</template>
```

**Events: for native DOM events, always use `.prevent` event modifier.**

Even if there is no need, it is good to use to avoid side-effects.

Example: `click`, `submit`

```html
<template>
  <div class="foo">
    <button @click.prevent="handleSaveInfo">Save</button>
  </div>
</template>
```

**Note:** For other event modifies, use with caution. If you need to use them a lot, something is wrong with your logic...

Further reading: https://vuejs.org/v2/guide/events.html#Event-Modifiers

## Documentation

### JSDoc

Due project complexity, documenting API core methods is essential to help team to understand and make use of the correct method.

To make sure of it, there is a set of `ESLint` rules to help team to write the necessary documentation and use the right syntax.

JSDoc docs: https://jsdoc.app/

#### Summary

* JSDoc is **mandatory** for classes and methods
* Method/Class description are **mandatory**

#### Basic JSDoc comment block

##### Classes

```js
/**
 * Class Description, something concise.
 *
 * @augments {type} Cases class extends another class
 * @todo Case something else needs to be done later
 */
```

##### Methods

```js
/**
 * Method description goes here. Something succinct and practical.
 *
 * @example is optional, case method is complex and it would be good to have valid example. You can use markdown.
 * @todo Case something else needs to be done later
 * @param {type} paramName Description is optional
 * @param {type | type2} [anotherParam=default value]
 * @returns {type} Description is optional
 */
```
