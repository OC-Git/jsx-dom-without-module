const keys = Object.keys
function identity(value) {
  return value
}
function isBoolean(val) {
  return typeof val === "boolean"
}
function isElement(val) {
  return val && typeof val.nodeType === "number"
}
function isString(val) {
  return typeof val === "string"
}
function isNumber(val) {
  return typeof val === "number"
}
function isObject(val) {
  return typeof val === "object" ? val !== null : isFunction(val)
}
function isFunction(val) {
  return typeof val === "function"
}
function isComponentClass(Component) {
  const prototype = Component.prototype
  return !!(prototype && prototype.isReactComponent)
}
function isArrayLike(obj) {
  return isObject(obj) && typeof obj.length === "number" && typeof obj.nodeType !== "number"
}
function forEach(value, fn) {
  if (!value) return

  for (const key of keys(value)) {
    fn(value[key], key)
  }
}

function createRef() {
  return Object.seal({
    current: null,
  })
}
function isRef(maybeRef) {
  return isObject(maybeRef) && "current" in maybeRef
}
function useMemo(factory) {
  return factory()
}

const SVGNamespace = "http://www.w3.org/2000/svg"

function isVisibleChild(value) {
  return !isBoolean(value) && value != null
}

function className(value) {
  if (Array.isArray(value)) {
    return value.map(className).filter(Boolean).join(" ")
  } else if (isObject(value)) {
    return keys(value)
      .filter(k => value[k])
      .join(" ")
  } else if (isVisibleChild(value)) {
    return "" + value
  } else {
    return ""
  }
}
function createFactory(tag) {
  return createElement.bind(null, tag)
}
function Fragment(attr) {
  const fragment = document.createDocumentFragment()
  appendChild(attr.children, fragment)
  return fragment
}
function Component(props) {
  this.props = props
}
Object.defineProperties(Component.prototype, {
  isReactComponent: {
    value: true,
  },
  render: {
    value() {
      return null
    },
  },
})
function jsx(tag, { children, ...attr }) {
  let node

  if (isString(tag)) {
    node = attr.namespaceURI
      ? document.createElementNS(attr.namespaceURI, tag)
      : document.createElement(tag)
    attributes(attr, node)
    appendChild(children, node)
  } else if (isFunction(tag)) {
    if (isObject(tag.defaultProps)) {
      attr = { ...tag.defaultProps, ...attr }
    }

    node = isComponentClass(tag)
      ? new tag({ ...tag.defaultProps, ...attr, children }).render()
      : tag({ ...attr, children })
  }

  if (isRef(attr.ref)) {
    attr.ref.current = node
  } else if (isFunction(attr.ref)) {
    attr.ref(node)
  }

  return node
}
function createElement(tag, attr, ...children) {
  if (isString(attr) || Array.isArray(attr)) {
    children.unshift(attr)
    attr = {}
  }

  attr = attr || {}

  if (attr.children != null && !children.length) {
    ;({ children, ...attr } = attr)
  }

  return jsx(tag, { ...attr, children }, attr.key)
}

function appendChild(child, node) {
  if (isArrayLike(child)) {
    appendChildren(child, node)
  } else if (isString(child) || isNumber(child)) {
    appendChildToNode(document.createTextNode(child), node)
  } else if (child === null) {
    appendChildToNode(document.createComment(""), node)
  } else if (isElement(child)) {
    appendChildToNode(child, node)
  }
}

function appendChildren(children, node) {
  for (const child of [...children]) {
    appendChild(child, node)
  }

  return node
}

function appendChildToNode(child, node) {
  if (node instanceof window.HTMLTemplateElement) {
    node.content.appendChild(child)
  } else {
    node.appendChild(child)
  }
}

function attribute(key, value, node) {
  switch (key) {
    case "htmlFor":
      attr(node, "for", value)
      return

    case "dataset":
      forEach(value, (dataValue, dataKey) => {
        if (dataValue != null) {
          node.dataset[dataKey] = dataValue
        }
      })
      return

    case "innerHTML":
    case "innerText":
    case "textContent":
      node[key] = value
      return

    case "dangerouslySetInnerHTML":
      if (isObject(value)) {
        node.innerHTML = value["__html"]
      }

      return

    case "spellCheck":
      node.spellcheck = value
      return

    case "class":
    case "className":
      if (isFunction(value)) {
        value(node)
      } else {
        attr(node, "class", className(value))
      }

      return

    case "ref":
    case "namespaceURI":
      return

    case "style":
      if (isObject(value)) {
        forEach(value, (val, key) => {
          node.style[key] = val
        })
        return
      }
  }

  if (isFunction(value)) {
    if (key[0] === "o" && key[1] === "n") {
      const attribute = key.toLowerCase()

      if (node[attribute] == null) {
        node[attribute] = value
      } else {
        node.addEventListener(key, value)
      }
    }
  } else if (isObject(value)) {
    node[key] = value
  } else if (isBoolean(value)) {
    if (value === true) {
      attr(node, key, "")
    }

    node[key] = value
  } else if (value != null) {
    attr(node, key, value)
  }
}

function attr(node, key, value) {
  node.setAttribute(key, value)
}

function attributes(attr, node) {
  for (const key of keys(attr)) {
    attribute(key, attr[key], node)
  }

  return node
}

function useText(initialValue) {
  const text = new Text()
  Object.defineProperty(text, "toString", {
    value() {
      return this.textContent
    },
  })

  function setText(value) {
    text.textContent = value
  }

  if (initialValue != null) {
    setText(initialValue)
  }

  return [text, setText]
}
function useClassList(initialValue) {
  const div = document.createElement("div")

  if (initialValue != null) {
    div.className = className(initialValue)
  }

  let list = div.classList

  function ClassList(value) {
    value.setAttribute("class", list.value)
    list = value.classList
  }

  Object.defineProperties(
    ClassList,
    Object.getOwnPropertyDescriptors({
      get size() {
        return list.length
      },

      get value() {
        return list.value
      },

      add(...tokens) {
        list.add(...tokens)
      },

      remove(...tokens) {
        list.remove(...tokens)
      },

      toggle(token, force) {
        list.toggle(token, force)
      },

      contains(token) {
        return list.contains(token)
      },
    })
  )
  return ClassList
}

var index = {
  createElement,
  Fragment,
  Component,
}
function preventDefault(event) {
  event.preventDefault()
  return event
}
function stopPropagation(event) {
  event.stopPropagation()
  return event
}

export {
  Component,
  Fragment,
  SVGNamespace,
  className,
  createElement,
  createFactory,
  createRef,
  index as default,
  createElement as h,
  isRef,
  jsx,
  jsx as jsxs,
  identity as memo,
  preventDefault,
  stopPropagation,
  identity as useCallback,
  useClassList,
  useMemo,
  createRef as useRef,
  useText,
}
