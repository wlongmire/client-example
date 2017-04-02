function flatten (obj, prefix, current) {
  prefix = prefix || []
  current = current || {}

  // Remember kids, null is also an object!
  if (typeof (obj) === 'object' && obj !== null) {
    Object.keys(obj).forEach(key => {
      flatten(obj[key], key, current)
    })
  } else {
    current[prefix] = obj
  }

  return current
}

export default flatten