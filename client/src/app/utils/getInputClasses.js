export default function getInputClasses(selector, error) {
  return selector + (error ? ' is-invalid' : '')
}
