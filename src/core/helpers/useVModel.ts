import { Ref, ref, watch } from 'vue'

/**
 * Helper function used to replicate the logic needed to enable two-way data-binding for most components.
 *
 * @param props    Properties map (as returned from withDefaults or defineProps)
 * @param emit     Emit function (as returned from defineEmits)
 * @param propName Name of property to bind with (default as modelValue)
 * @returns reactive copy of the property
 */
export function useVModel<T, K extends string>(
  props: { [key in K]: T },
  emit: (_event: `update:${K}`, value: T) => void,
  propName = 'modelValue' as K
) {
  // Copy property initial value
  const value = <Ref<T>>ref(props[propName])

  // Watch for any property change and updates the copy
  watch(
    () => props[propName],
    newValue => (value.value = newValue)
  )

  // Watch for any changes on the copy and propagates to parent
  watch(value, () => emit(`update:${propName}`, value.value))

  return value
}
