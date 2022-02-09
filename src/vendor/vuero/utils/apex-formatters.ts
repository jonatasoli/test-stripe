// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import dayjs from 'dayjs'

/**
 * @param val
 */
export function toString(val: number): string {
  return `${val}`
}
/**
 * @param val
 */
export function perSession(val: number): string {
  return `${val} per session`
}
/**
 * @param val
 */
export function asMinutes(val: number): string {
  return `${val} (mins)`
}
/**
 * @param val
 */
export function asDollar(val: number): string {
  return `$ ${val}`
}
/**
 * @param val
 */
export function asKDollar(val: number): string {
  return `$ ${val}K`
}
/**
 * @param val
 */
export function asPercent(val: number): string {
  return `${val} %`
}

type WithOptions = (val: number, timestamp: number) => string
type WithTimeOptions = (val: number, timestamp: number) => string

/**
 * @param format
 */
export function toDate(format: string): WithTimeOptions {
  return (val, timestamp) => dayjs(timestamp).format(format)
}

/**
 * @param fractionDigit
 * @param divider
 */
export function toFixed(fractionDigit: number, divider = 1): WithOptions {
  return val => (val / divider).toFixed(fractionDigit)
}
