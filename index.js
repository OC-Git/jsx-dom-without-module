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

const isUnitlessNumber = {
  animationIterationCount: 0,
  borderImageOutset: 0,
  borderImageSlice: 0,
  borderImageWidth: 0,
  boxFlex: 0,
  boxFlexGroup: 0,
  boxOrdinalGroup: 0,
  columnCount: 0,
  columns: 0,
  flex: 0,
  flexGrow: 0,
  flexPositive: 0,
  flexShrink: 0,
  flexNegative: 0,
  flexOrder: 0,
  gridArea: 0,
  gridRow: 0,
  gridRowEnd: 0,
  gridRowSpan: 0,
  gridRowStart: 0,
  gridColumn: 0,
  gridColumnEnd: 0,
  gridColumnSpan: 0,
  gridColumnStart: 0,
  fontWeight: 0,
  lineClamp: 0,
  lineHeight: 0,
  opacity: 0,
  order: 0,
  orphans: 0,
  tabSize: 0,
  widows: 0,
  zIndex: 0,
  zoom: 0,
  fillOpacity: 0,
  floodOpacity: 0,
  stopOpacity: 0,
  strokeDasharray: 0,
  strokeDashoffset: 0,
  strokeMiterlimit: 0,
  strokeOpacity: 0,
  strokeWidth: 0,
}

function prefixKey(prefix, key) {
  return prefix + key.charAt(0).toUpperCase() + key.substring(1)
}

const prefixes = ["Webkit", "ms", "Moz", "O"]
keys(isUnitlessNumber).forEach(prop => {
  prefixes.forEach(prefix => {
    isUnitlessNumber[prefixKey(prefix, prop)] = 0
  })
})

const SVGNamespace = "http://www.w3.org/2000/svg"
const XLinkNamespace = "http://www.w3.org/1999/xlink"
const XMLNamespace = "http://www.w3.org/XML/1998/namespace"

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
const svg = {
  animate: 0,
  circle: 0,
  clipPath: 0,
  defs: 0,
  desc: 0,
  ellipse: 0,
  feBlend: 0,
  feColorMatrix: 0,
  feComponentTransfer: 0,
  feComposite: 0,
  feConvolveMatrix: 0,
  feDiffuseLighting: 0,
  feDisplacementMap: 0,
  feDistantLight: 0,
  feFlood: 0,
  feFuncA: 0,
  feFuncB: 0,
  feFuncG: 0,
  feFuncR: 0,
  feGaussianBlur: 0,
  feImage: 0,
  feMerge: 0,
  feMergeNode: 0,
  feMorphology: 0,
  feOffset: 0,
  fePointLight: 0,
  feSpecularLighting: 0,
  feSpotLight: 0,
  feTile: 0,
  feTurbulence: 0,
  filter: 0,
  foreignObject: 0,
  g: 0,
  image: 0,
  line: 0,
  linearGradient: 0,
  marker: 0,
  mask: 0,
  metadata: 0,
  path: 0,
  pattern: 0,
  polygon: 0,
  polyline: 0,
  radialGradient: 0,
  rect: 0,
  stop: 0,
  svg: 0,
  switch: 0,
  symbol: 0,
  text: 0,
  textPath: 0,
  tspan: 0,
  use: 0,
  view: 0,
}
const nonPresentationSVGAttributes =
  /^(a(ll|t|u)|base[FP]|c(al|lipPathU|on)|di|ed|ex|filter[RU]|g(lyphR|r)|ke|l(en|im)|ma(rker[HUW]|s)|n|pat|pr|point[^e]|re[^n]|s[puy]|st[^or]|ta|textL|vi|xC|y|z)/
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
  if (!attr.namespaceURI && svg[tag] === 0) {
    attr = { ...attr, namespaceURI: SVGNamespace }
  }

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

function normalizeAttribute(s, separator) {
  return s.replace(/[A-Z\d]/g, match => separator + match.toLowerCase())
}

function attribute(key, value, node) {
  switch (key) {
    case "xlinkActuate":
    case "xlinkArcrole":
    case "xlinkHref":
    case "xlinkRole":
    case "xlinkShow":
    case "xlinkTitle":
    case "xlinkType":
      attrNS(node, XLinkNamespace, normalizeAttribute(key, ":"), value)
      return

    case "xmlnsXlink":
      attr(node, normalizeAttribute(key, ":"), value)
      return

    case "xmlBase":
    case "xmlLang":
    case "xmlSpace":
      attrNS(node, XMLNamespace, normalizeAttribute(key, ":"), value)
      return
  }

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
          if (isNumber(val) && isUnitlessNumber[key] !== 0) {
            node.style[key] = val + "px"
          } else {
            node.style[key] = val
          }
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
    if (node instanceof SVGElement && !nonPresentationSVGAttributes.test(key)) {
      attr(node, normalizeAttribute(key, "-"), value)
    } else {
      attr(node, key, value)
    }
  }
}

function attr(node, key, value) {
  node.setAttribute(key, value)
}

function attrNS(node, namespace, key, value) {
  node.setAttributeNS(namespace, key, value)
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
