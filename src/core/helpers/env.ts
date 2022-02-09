/**
 * Looks for the environment variable by name.
 *
 * @param name
 */
export default function useEnv(name: string): string {
  const value = import.meta.env?.[name]

  if (!value) {
    throw new Error(`Environment variable ${name} is not set`)
  }

  return String(value)
}
