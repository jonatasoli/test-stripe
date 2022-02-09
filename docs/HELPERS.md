# Helpers

## useVModel

The `useVModel` helper is used to create a `v-model` directive that syncs data with a child component.

For example, our `SwitchField` component must be in sync with its child `VSwitchBlock` component from Vuero, otherwise it will have these wierd bugs:
- A SwitchField starting with a true value, but the VSwitchBlock is set to false.
- When the VSwitchBlock changes its value, it visually works, but it doesn't update the SwitchField.
- When a custom script changes the SwitchField value, it doesn't update the VSwitchBlock.

As this two-way data binding problem is common in our components, we created a helper to solve it.

The usage goes as following:

```ts
interface Props {
  modelValue: string  // 1. Declare a `modelValue` in the Props type, set the type correctly
  // other props
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',  // 2. Set the default value for `modelValue`, if needed
  // other props
})

const emit = defineEmits<{
  (_event: 'update:modelValue', _value: string): void  // 3. Declare an `update:modelValue` event, be sure to set the types correctly
}>()

const value = useVModel(props, emit)  // 4. Call `useVModel` just like this. Here we get a reactive `value` to use in the child component
```

**IMPORTANT:** There is no need to listen to child events, as the `useVModel` helper will do it for you. In the child component just use `v-model="value"`.


## showToastMessage

The `showToastMessage` helper is used to show a toast containing some text in the screen. It can be called in all the project.
The usage goes as following:

```ts
import { showToastMessage } from '@/core/helpers/message'

showToastMessage('success', 'Your changes have been successfully saved!')
```

```ts
import { showToastMessage } from '@/core/helpers/message'

showToastMessage('error', 'Something wrong has happened!')
```
