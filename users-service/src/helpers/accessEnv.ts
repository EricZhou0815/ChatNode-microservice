// access a varaiable inside of proces.env, throwing an error if not found
// always run it before (ie upon initialisation) so that the error is thrown asap
// caching values to improve performance -- accessing process.env many times damage the performance

const cache: { [key: string]: string } = {}

const accessEnv = (key: string, defaultValue: string) => {
  if (!(key in process.env) || typeof process.env[key] === "undefined") {
    if (defaultValue) return defaultValue
    throw new Error(`${key} not found in the process.env!`)
  }

  if (!(key in cache)) {
    cache[key] = <string>process.env[key]
  }
  return cache[key]
}

export default accessEnv