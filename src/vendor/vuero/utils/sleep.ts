/**
 * Resolve after `time` has been spent.
 *
 * @param {number} time Time in milliseconds to wait
 * @returns {Promise<any>}
 */
export default function sleep(time = 1000): Promise<null> {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
