import {
  require_react
} from "./chunk-32EALFBN.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@restart/hooks/esm/useEventCallback.js
var import_react2 = __toESM(require_react());

// node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react = __toESM(require_react());
function useCommittedRef(value) {
  const ref = (0, import_react.useRef)(value);
  (0, import_react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default = useCommittedRef;

// node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback(fn) {
  const ref = useCommittedRef_default(fn);
  return (0, import_react2.useCallback)(function(...args) {
    return ref.current && ref.current(...args);
  }, [ref]);
}

// node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js
var import_react4 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCommittedRef.js
var import_react3 = __toESM(require_react());
function useCommittedRef2(value) {
  const ref = (0, import_react3.useRef)(value);
  (0, import_react3.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref;
}
var useCommittedRef_default2 = useCommittedRef2;

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventCallback.js
function useEventCallback2(fn) {
  const ref = useCommittedRef_default2(fn);
  return (0, import_react4.useCallback)(function(...args) {
    return ref.current && ref.current(...args);
  }, [ref]);
}

// node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
    return t2.__proto__ = e2, t2;
  }, _setPrototypeOf(t, e);
}

// node_modules/@babel/runtime/helpers/esm/inheritsLoose.js
function _inheritsLoose(t, o) {
  t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o);
}

export {
  _objectWithoutPropertiesLoose,
  _inheritsLoose,
  useEventCallback,
  useEventCallback2
};
//# sourceMappingURL=chunk-DXK4ILMT.js.map
