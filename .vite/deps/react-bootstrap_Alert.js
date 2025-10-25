"use client";
import {
  useUncontrolled
} from "./chunk-VYELHZER.js";
import {
  CloseButton_default,
  Fade_default,
  divWithClassName_default
} from "./chunk-UL43K3HH.js";
import {
  useEventCallback,
  useEventCallback2
} from "./chunk-DXK4ILMT.js";
import "./chunk-FYGYNQUM.js";
import "./chunk-X3MDYGI3.js";
import {
  useButtonProps
} from "./chunk-YEDONGHT.js";
import {
  require_classnames,
  require_jsx_runtime,
  useBootstrapPrefix
} from "./chunk-2DXGAYRR.js";
import {
  require_react
} from "./chunk-32EALFBN.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/react-bootstrap/esm/Alert.js
var import_classnames3 = __toESM(require_classnames());
var React4 = __toESM(require_react());

// node_modules/react-bootstrap/esm/AlertHeading.js
var React = __toESM(require_react());
var import_classnames = __toESM(require_classnames());
var import_jsx_runtime = __toESM(require_jsx_runtime());
var DivStyledAsH4 = divWithClassName_default("h4");
DivStyledAsH4.displayName = "DivStyledAsH4";
var AlertHeading = React.forwardRef(({
  className,
  bsPrefix,
  as: Component = DivStyledAsH4,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-heading");
  return (0, import_jsx_runtime.jsx)(Component, {
    ref,
    className: (0, import_classnames.default)(className, bsPrefix),
    ...props
  });
});
AlertHeading.displayName = "AlertHeading";
var AlertHeading_default = AlertHeading;

// node_modules/react-bootstrap/esm/AlertLink.js
var React3 = __toESM(require_react());
var import_classnames2 = __toESM(require_classnames());

// node_modules/@restart/ui/esm/Anchor.js
var React2 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useCallbackRef.js
var import_react = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useEventListener.js
var import_react2 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useGlobalListener.js
var import_react3 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useInterval.js
var import_react4 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useRafInterval.js
var import_react5 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useMergeState.js
var import_react6 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useImage.js
var import_react7 = __toESM(require_react());

// node_modules/@restart/ui/node_modules/@restart/hooks/esm/useResizeObserver.js
var import_react8 = __toESM(require_react());

// node_modules/@restart/ui/esm/Anchor.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime());
var _excluded = ["onKeyDown"];
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (e.indexOf(n) >= 0) continue;
    t[n] = r[n];
  }
  return t;
}
function isTrivialHref(href) {
  return !href || href.trim() === "#";
}
var Anchor = React2.forwardRef((_ref, ref) => {
  let {
    onKeyDown
  } = _ref, props = _objectWithoutPropertiesLoose(_ref, _excluded);
  const [buttonProps] = useButtonProps(Object.assign({
    tagName: "a"
  }, props));
  const handleKeyDown = useEventCallback2((e) => {
    buttonProps.onKeyDown(e);
    onKeyDown == null ? void 0 : onKeyDown(e);
  });
  if (isTrivialHref(props.href) || props.role === "button") {
    return (0, import_jsx_runtime2.jsx)("a", Object.assign({
      ref
    }, props, buttonProps, {
      onKeyDown: handleKeyDown
    }));
  }
  return (0, import_jsx_runtime2.jsx)("a", Object.assign({
    ref
  }, props, {
    onKeyDown
  }));
});
Anchor.displayName = "Anchor";
var Anchor_default = Anchor;

// node_modules/react-bootstrap/esm/AlertLink.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime());
var AlertLink = React3.forwardRef(({
  className,
  bsPrefix,
  as: Component = Anchor_default,
  ...props
}, ref) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, "alert-link");
  return (0, import_jsx_runtime3.jsx)(Component, {
    ref,
    className: (0, import_classnames2.default)(className, bsPrefix),
    ...props
  });
});
AlertLink.displayName = "AlertLink";
var AlertLink_default = AlertLink;

// node_modules/react-bootstrap/esm/Alert.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime());
var import_jsx_runtime5 = __toESM(require_jsx_runtime());
var Alert = React4.forwardRef((uncontrolledProps, ref) => {
  const {
    bsPrefix,
    show = true,
    closeLabel = "Close alert",
    closeVariant,
    className,
    children,
    variant = "primary",
    onClose,
    dismissible,
    transition = Fade_default,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    show: "onClose"
  });
  const prefix = useBootstrapPrefix(bsPrefix, "alert");
  const handleClose = useEventCallback((e) => {
    if (onClose) {
      onClose(false, e);
    }
  });
  const Transition = transition === true ? Fade_default : transition;
  const alert = (0, import_jsx_runtime5.jsxs)("div", {
    role: "alert",
    ...!Transition ? props : void 0,
    ref,
    className: (0, import_classnames3.default)(className, prefix, variant && `${prefix}-${variant}`, dismissible && `${prefix}-dismissible`),
    children: [dismissible && (0, import_jsx_runtime4.jsx)(CloseButton_default, {
      onClick: handleClose,
      "aria-label": closeLabel,
      variant: closeVariant
    }), children]
  });
  if (!Transition) return show ? alert : null;
  return (0, import_jsx_runtime4.jsx)(Transition, {
    unmountOnExit: true,
    ...props,
    ref: void 0,
    in: show,
    children: alert
  });
});
Alert.displayName = "Alert";
var Alert_default = Object.assign(Alert, {
  Link: AlertLink_default,
  Heading: AlertHeading_default
});
export {
  Alert_default as default
};
//# sourceMappingURL=react-bootstrap_Alert.js.map
