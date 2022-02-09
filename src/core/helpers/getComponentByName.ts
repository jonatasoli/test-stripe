import Calendar from '@/components/widgets/Calendar/Calendar.vue'
import { Component } from 'vue'

type ComponentName = 'calendar'

const COMPONENTS: Record<ComponentName, Component> = {
  calendar: Calendar
}

/**
 * Defines what component will be rendered and throw an error if none are selected.
 *
 * @param componentType The component to be rendered
 * @returns {Component} Returns the chosen component
 * @throws Error Throws error when no component is specified or none that match the ones available
 */
export function getComponentByType(componentType: string): Component {
  const component = COMPONENTS[componentType]

  if (!component) {
    throw new Error(componentType ? `${componentType} is not a valid component.` : `No component was specified.`)
  }

  return component
}
