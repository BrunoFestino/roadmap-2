(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))s(c);new MutationObserver(c=>{for(const d of c)if(d.type==="childList")for(const p of d.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&s(p)}).observe(document,{childList:!0,subtree:!0});function l(c){const d={};return c.integrity&&(d.integrity=c.integrity),c.referrerPolicy&&(d.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?d.credentials="include":c.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(c){if(c.ep)return;c.ep=!0;const d=l(c);fetch(c.href,d)}})();window.Vaadin=window.Vaadin||{};window.Vaadin.featureFlags=window.Vaadin.featureFlags||{};Object.keys(window.Vaadin.featureFlags).length===0&&(window.Vaadin.featureFlags.exampleFeatureFlag=!1,window.Vaadin.featureFlags.collaborationEngineBackend=!1,window.Vaadin.featureFlags.formFillerAddon=!1,window.Vaadin.featureFlags.fullstackSignals=!1,window.Vaadin.featureFlags.flowFullstackSignals=!1,window.Vaadin.featureFlags.copilotExperimentalFeatures=!1,window.Vaadin.featureFlags.masterDetailLayoutComponent=!1,window.Vaadin.featureFlags.react19=!1,window.Vaadin.featureFlags.accessibleDisabledButtons=!1,window.Vaadin.featureFlags.layoutComponentImprovements=!1,window.Vaadin.featureFlags.defaultAutoResponsiveFormLayout=!1);if(window.Vaadin.featureFlagsUpdaters){const r=o=>window.Vaadin.featureFlags[o]=!0;window.Vaadin.featureFlagsUpdaters.forEach(o=>o(r)),delete window.Vaadin.featureFlagsUpdaters}var Us={exports:{}},Re={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var df;function Zh(){if(df)return Re;df=1;var r=Symbol.for("react.element"),o=Symbol.for("react.portal"),l=Symbol.for("react.fragment"),s=Symbol.for("react.strict_mode"),c=Symbol.for("react.profiler"),d=Symbol.for("react.provider"),p=Symbol.for("react.context"),h=Symbol.for("react.forward_ref"),m=Symbol.for("react.suspense"),g=Symbol.for("react.memo"),S=Symbol.for("react.lazy"),E=Symbol.iterator;function x(C){return C===null||typeof C!="object"?null:(C=E&&C[E]||C["@@iterator"],typeof C=="function"?C:null)}var N={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},L=Object.assign,O={};function I(C,F,ue){this.props=C,this.context=F,this.refs=O,this.updater=ue||N}I.prototype.isReactComponent={},I.prototype.setState=function(C,F){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,F,"setState")},I.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function D(){}D.prototype=I.prototype;function te(C,F,ue){this.props=C,this.context=F,this.refs=O,this.updater=ue||N}var A=te.prototype=new D;A.constructor=te,L(A,I.prototype),A.isPureReactComponent=!0;var Y=Array.isArray,ae=Object.prototype.hasOwnProperty,z={current:null},fe={key:!0,ref:!0,__self:!0,__source:!0};function he(C,F,ue){var ve,Ee={},ke=null,$e=null;if(F!=null)for(ve in F.ref!==void 0&&($e=F.ref),F.key!==void 0&&(ke=""+F.key),F)ae.call(F,ve)&&!fe.hasOwnProperty(ve)&&(Ee[ve]=F[ve]);var M=arguments.length-2;if(M===1)Ee.children=ue;else if(1<M){for(var V=Array(M),X=0;X<M;X++)V[X]=arguments[X+2];Ee.children=V}if(C&&C.defaultProps)for(ve in M=C.defaultProps,M)Ee[ve]===void 0&&(Ee[ve]=M[ve]);return{$$typeof:r,type:C,key:ke,ref:$e,props:Ee,_owner:z.current}}function ce(C,F){return{$$typeof:r,type:C.type,key:F,ref:C.ref,props:C.props,_owner:C._owner}}function Pe(C){return typeof C=="object"&&C!==null&&C.$$typeof===r}function Ge(C){var F={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(ue){return F[ue]})}var He=/\/+/g;function Se(C,F){return typeof C=="object"&&C!==null&&C.key!=null?Ge(""+C.key):F.toString(36)}function _e(C,F,ue,ve,Ee){var ke=typeof C;(ke==="undefined"||ke==="boolean")&&(C=null);var $e=!1;if(C===null)$e=!0;else switch(ke){case"string":case"number":$e=!0;break;case"object":switch(C.$$typeof){case r:case o:$e=!0}}if($e)return $e=C,Ee=Ee($e),C=ve===""?"."+Se($e,0):ve,Y(Ee)?(ue="",C!=null&&(ue=C.replace(He,"$&/")+"/"),_e(Ee,F,ue,"",function(X){return X})):Ee!=null&&(Pe(Ee)&&(Ee=ce(Ee,ue+(!Ee.key||$e&&$e.key===Ee.key?"":(""+Ee.key).replace(He,"$&/")+"/")+C)),F.push(Ee)),1;if($e=0,ve=ve===""?".":ve+":",Y(C))for(var M=0;M<C.length;M++){ke=C[M];var V=ve+Se(ke,M);$e+=_e(ke,F,ue,V,Ee)}else if(V=x(C),typeof V=="function")for(C=V.call(C),M=0;!(ke=C.next()).done;)ke=ke.value,V=ve+Se(ke,M++),$e+=_e(ke,F,ue,V,Ee);else if(ke==="object")throw F=String(C),Error("Objects are not valid as a React child (found: "+(F==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":F)+"). If you meant to render a collection of children, use an array instead.");return $e}function Oe(C,F,ue){if(C==null)return C;var ve=[],Ee=0;return _e(C,ve,"","",function(ke){return F.call(ue,ke,Ee++)}),ve}function ge(C){if(C._status===-1){var F=C._result;F=F(),F.then(function(ue){(C._status===0||C._status===-1)&&(C._status=1,C._result=ue)},function(ue){(C._status===0||C._status===-1)&&(C._status=2,C._result=ue)}),C._status===-1&&(C._status=0,C._result=F)}if(C._status===1)return C._result.default;throw C._result}var be={current:null},W={transition:null},J={ReactCurrentDispatcher:be,ReactCurrentBatchConfig:W,ReactCurrentOwner:z};function K(){throw Error("act(...) is not supported in production builds of React.")}return Re.Children={map:Oe,forEach:function(C,F,ue){Oe(C,function(){F.apply(this,arguments)},ue)},count:function(C){var F=0;return Oe(C,function(){F++}),F},toArray:function(C){return Oe(C,function(F){return F})||[]},only:function(C){if(!Pe(C))throw Error("React.Children.only expected to receive a single React element child.");return C}},Re.Component=I,Re.Fragment=l,Re.Profiler=c,Re.PureComponent=te,Re.StrictMode=s,Re.Suspense=m,Re.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=J,Re.act=K,Re.cloneElement=function(C,F,ue){if(C==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+C+".");var ve=L({},C.props),Ee=C.key,ke=C.ref,$e=C._owner;if(F!=null){if(F.ref!==void 0&&(ke=F.ref,$e=z.current),F.key!==void 0&&(Ee=""+F.key),C.type&&C.type.defaultProps)var M=C.type.defaultProps;for(V in F)ae.call(F,V)&&!fe.hasOwnProperty(V)&&(ve[V]=F[V]===void 0&&M!==void 0?M[V]:F[V])}var V=arguments.length-2;if(V===1)ve.children=ue;else if(1<V){M=Array(V);for(var X=0;X<V;X++)M[X]=arguments[X+2];ve.children=M}return{$$typeof:r,type:C.type,key:Ee,ref:ke,props:ve,_owner:$e}},Re.createContext=function(C){return C={$$typeof:p,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},C.Provider={$$typeof:d,_context:C},C.Consumer=C},Re.createElement=he,Re.createFactory=function(C){var F=he.bind(null,C);return F.type=C,F},Re.createRef=function(){return{current:null}},Re.forwardRef=function(C){return{$$typeof:h,render:C}},Re.isValidElement=Pe,Re.lazy=function(C){return{$$typeof:S,_payload:{_status:-1,_result:C},_init:ge}},Re.memo=function(C,F){return{$$typeof:g,type:C,compare:F===void 0?null:F}},Re.startTransition=function(C){var F=W.transition;W.transition={};try{C()}finally{W.transition=F}},Re.unstable_act=K,Re.useCallback=function(C,F){return be.current.useCallback(C,F)},Re.useContext=function(C){return be.current.useContext(C)},Re.useDebugValue=function(){},Re.useDeferredValue=function(C){return be.current.useDeferredValue(C)},Re.useEffect=function(C,F){return be.current.useEffect(C,F)},Re.useId=function(){return be.current.useId()},Re.useImperativeHandle=function(C,F,ue){return be.current.useImperativeHandle(C,F,ue)},Re.useInsertionEffect=function(C,F){return be.current.useInsertionEffect(C,F)},Re.useLayoutEffect=function(C,F){return be.current.useLayoutEffect(C,F)},Re.useMemo=function(C,F){return be.current.useMemo(C,F)},Re.useReducer=function(C,F,ue){return be.current.useReducer(C,F,ue)},Re.useRef=function(C){return be.current.useRef(C)},Re.useState=function(C){return be.current.useState(C)},Re.useSyncExternalStore=function(C,F,ue){return be.current.useSyncExternalStore(C,F,ue)},Re.useTransition=function(){return be.current.useTransition()},Re.version="18.3.1",Re}var ff;function Zl(){return ff||(ff=1,Us.exports=Zh()),Us.exports}var R=Zl(),Ol={},js={exports:{}},Mt={},Vs={exports:{}},Hs={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pf;function ev(){return pf||(pf=1,(function(r){function o(W,J){var K=W.length;W.push(J);e:for(;0<K;){var C=K-1>>>1,F=W[C];if(0<c(F,J))W[C]=J,W[K]=F,K=C;else break e}}function l(W){return W.length===0?null:W[0]}function s(W){if(W.length===0)return null;var J=W[0],K=W.pop();if(K!==J){W[0]=K;e:for(var C=0,F=W.length,ue=F>>>1;C<ue;){var ve=2*(C+1)-1,Ee=W[ve],ke=ve+1,$e=W[ke];if(0>c(Ee,K))ke<F&&0>c($e,Ee)?(W[C]=$e,W[ke]=K,C=ke):(W[C]=Ee,W[ve]=K,C=ve);else if(ke<F&&0>c($e,K))W[C]=$e,W[ke]=K,C=ke;else break e}}return J}function c(W,J){var K=W.sortIndex-J.sortIndex;return K!==0?K:W.id-J.id}if(typeof performance=="object"&&typeof performance.now=="function"){var d=performance;r.unstable_now=function(){return d.now()}}else{var p=Date,h=p.now();r.unstable_now=function(){return p.now()-h}}var m=[],g=[],S=1,E=null,x=3,N=!1,L=!1,O=!1,I=typeof setTimeout=="function"?setTimeout:null,D=typeof clearTimeout=="function"?clearTimeout:null,te=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function A(W){for(var J=l(g);J!==null;){if(J.callback===null)s(g);else if(J.startTime<=W)s(g),J.sortIndex=J.expirationTime,o(m,J);else break;J=l(g)}}function Y(W){if(O=!1,A(W),!L)if(l(m)!==null)L=!0,ge(ae);else{var J=l(g);J!==null&&be(Y,J.startTime-W)}}function ae(W,J){L=!1,O&&(O=!1,D(he),he=-1),N=!0;var K=x;try{for(A(J),E=l(m);E!==null&&(!(E.expirationTime>J)||W&&!Ge());){var C=E.callback;if(typeof C=="function"){E.callback=null,x=E.priorityLevel;var F=C(E.expirationTime<=J);J=r.unstable_now(),typeof F=="function"?E.callback=F:E===l(m)&&s(m),A(J)}else s(m);E=l(m)}if(E!==null)var ue=!0;else{var ve=l(g);ve!==null&&be(Y,ve.startTime-J),ue=!1}return ue}finally{E=null,x=K,N=!1}}var z=!1,fe=null,he=-1,ce=5,Pe=-1;function Ge(){return!(r.unstable_now()-Pe<ce)}function He(){if(fe!==null){var W=r.unstable_now();Pe=W;var J=!0;try{J=fe(!0,W)}finally{J?Se():(z=!1,fe=null)}}else z=!1}var Se;if(typeof te=="function")Se=function(){te(He)};else if(typeof MessageChannel<"u"){var _e=new MessageChannel,Oe=_e.port2;_e.port1.onmessage=He,Se=function(){Oe.postMessage(null)}}else Se=function(){I(He,0)};function ge(W){fe=W,z||(z=!0,Se())}function be(W,J){he=I(function(){W(r.unstable_now())},J)}r.unstable_IdlePriority=5,r.unstable_ImmediatePriority=1,r.unstable_LowPriority=4,r.unstable_NormalPriority=3,r.unstable_Profiling=null,r.unstable_UserBlockingPriority=2,r.unstable_cancelCallback=function(W){W.callback=null},r.unstable_continueExecution=function(){L||N||(L=!0,ge(ae))},r.unstable_forceFrameRate=function(W){0>W||125<W?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):ce=0<W?Math.floor(1e3/W):5},r.unstable_getCurrentPriorityLevel=function(){return x},r.unstable_getFirstCallbackNode=function(){return l(m)},r.unstable_next=function(W){switch(x){case 1:case 2:case 3:var J=3;break;default:J=x}var K=x;x=J;try{return W()}finally{x=K}},r.unstable_pauseExecution=function(){},r.unstable_requestPaint=function(){},r.unstable_runWithPriority=function(W,J){switch(W){case 1:case 2:case 3:case 4:case 5:break;default:W=3}var K=x;x=W;try{return J()}finally{x=K}},r.unstable_scheduleCallback=function(W,J,K){var C=r.unstable_now();switch(typeof K=="object"&&K!==null?(K=K.delay,K=typeof K=="number"&&0<K?C+K:C):K=C,W){case 1:var F=-1;break;case 2:F=250;break;case 5:F=1073741823;break;case 4:F=1e4;break;default:F=5e3}return F=K+F,W={id:S++,callback:J,priorityLevel:W,startTime:K,expirationTime:F,sortIndex:-1},K>C?(W.sortIndex=K,o(g,W),l(m)===null&&W===l(g)&&(O?(D(he),he=-1):O=!0,be(Y,K-C))):(W.sortIndex=F,o(m,W),L||N||(L=!0,ge(ae))),W},r.unstable_shouldYield=Ge,r.unstable_wrapCallback=function(W){var J=x;return function(){var K=x;x=J;try{return W.apply(this,arguments)}finally{x=K}}}})(Hs)),Hs}var mf;function tv(){return mf||(mf=1,Vs.exports=ev()),Vs.exports}/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var hf;function nv(){if(hf)return Mt;hf=1;var r=Zl(),o=tv();function l(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var s=new Set,c={};function d(e,t){p(e,t),p(e+"Capture",t)}function p(e,t){for(c[e]=t,e=0;e<t.length;e++)s.add(t[e])}var h=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),m=Object.prototype.hasOwnProperty,g=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,S={},E={};function x(e){return m.call(E,e)?!0:m.call(S,e)?!1:g.test(e)?E[e]=!0:(S[e]=!0,!1)}function N(e,t,n,i){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return i?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function L(e,t,n,i){if(t===null||typeof t>"u"||N(e,t,n,i))return!0;if(i)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function O(e,t,n,i,a,u,f){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=i,this.attributeNamespace=a,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=u,this.removeEmptyString=f}var I={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){I[e]=new O(e,0,!1,e,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];I[t]=new O(t,1,!1,e[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(e){I[e]=new O(e,2,!1,e.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){I[e]=new O(e,2,!1,e,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){I[e]=new O(e,3,!1,e.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(e){I[e]=new O(e,3,!0,e,null,!1,!1)}),["capture","download"].forEach(function(e){I[e]=new O(e,4,!1,e,null,!1,!1)}),["cols","rows","size","span"].forEach(function(e){I[e]=new O(e,6,!1,e,null,!1,!1)}),["rowSpan","start"].forEach(function(e){I[e]=new O(e,5,!1,e.toLowerCase(),null,!1,!1)});var D=/[\-:]([a-z])/g;function te(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(D,te);I[t]=new O(t,1,!1,e,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(D,te);I[t]=new O(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(D,te);I[t]=new O(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(e){I[e]=new O(e,1,!1,e.toLowerCase(),null,!1,!1)}),I.xlinkHref=new O("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(e){I[e]=new O(e,1,!1,e.toLowerCase(),null,!0,!0)});function A(e,t,n,i){var a=I.hasOwnProperty(t)?I[t]:null;(a!==null?a.type!==0:i||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(L(t,n,a,i)&&(n=null),i||a===null?x(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):a.mustUseProperty?e[a.propertyName]=n===null?a.type===3?!1:"":n:(t=a.attributeName,i=a.attributeNamespace,n===null?e.removeAttribute(t):(a=a.type,n=a===3||a===4&&n===!0?"":""+n,i?e.setAttributeNS(i,t,n):e.setAttribute(t,n))))}var Y=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ae=Symbol.for("react.element"),z=Symbol.for("react.portal"),fe=Symbol.for("react.fragment"),he=Symbol.for("react.strict_mode"),ce=Symbol.for("react.profiler"),Pe=Symbol.for("react.provider"),Ge=Symbol.for("react.context"),He=Symbol.for("react.forward_ref"),Se=Symbol.for("react.suspense"),_e=Symbol.for("react.suspense_list"),Oe=Symbol.for("react.memo"),ge=Symbol.for("react.lazy"),be=Symbol.for("react.offscreen"),W=Symbol.iterator;function J(e){return e===null||typeof e!="object"?null:(e=W&&e[W]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,C;function F(e){if(C===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);C=t&&t[1]||""}return`
`+C+e}var ue=!1;function ve(e,t){if(!e||ue)return"";ue=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(T){var i=T}Reflect.construct(e,[],t)}else{try{t.call()}catch(T){i=T}e.call(t.prototype)}else{try{throw Error()}catch(T){i=T}e()}}catch(T){if(T&&i&&typeof T.stack=="string"){for(var a=T.stack.split(`
`),u=i.stack.split(`
`),f=a.length-1,v=u.length-1;1<=f&&0<=v&&a[f]!==u[v];)v--;for(;1<=f&&0<=v;f--,v--)if(a[f]!==u[v]){if(f!==1||v!==1)do if(f--,v--,0>v||a[f]!==u[v]){var w=`
`+a[f].replace(" at new "," at ");return e.displayName&&w.includes("<anonymous>")&&(w=w.replace("<anonymous>",e.displayName)),w}while(1<=f&&0<=v);break}}}finally{ue=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?F(e):""}function Ee(e){switch(e.tag){case 5:return F(e.type);case 16:return F("Lazy");case 13:return F("Suspense");case 19:return F("SuspenseList");case 0:case 2:case 15:return e=ve(e.type,!1),e;case 11:return e=ve(e.type.render,!1),e;case 1:return e=ve(e.type,!0),e;default:return""}}function ke(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case fe:return"Fragment";case z:return"Portal";case ce:return"Profiler";case he:return"StrictMode";case Se:return"Suspense";case _e:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ge:return(e.displayName||"Context")+".Consumer";case Pe:return(e._context.displayName||"Context")+".Provider";case He:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Oe:return t=e.displayName||null,t!==null?t:ke(e.type)||"Memo";case ge:t=e._payload,e=e._init;try{return ke(e(t))}catch{}}return null}function $e(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ke(t);case 8:return t===he?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function M(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function V(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function X(e){var t=V(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),i=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var a=n.get,u=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return a.call(this)},set:function(f){i=""+f,u.call(this,f)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return i},setValue:function(f){i=""+f},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function Ue(e){e._valueTracker||(e._valueTracker=X(e))}function nt(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),i="";return e&&(i=V(e)?e.checked?"true":"false":e.value),e=i,e!==n?(t.setValue(e),!0):!1}function Qe(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function ut(e,t){var n=t.checked;return K({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function _i(e,t){var n=t.defaultValue==null?"":t.defaultValue,i=t.checked!=null?t.checked:t.defaultChecked;n=M(t.value!=null?t.value:n),e._wrapperState={initialChecked:i,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ri(e,t){t=t.checked,t!=null&&A(e,"checked",t,!1)}function Fr(e,t){Ri(e,t);var n=M(t.value),i=t.type;if(n!=null)i==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(i==="submit"||i==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Eo(e,t.type,n):t.hasOwnProperty("defaultValue")&&Eo(e,t.type,M(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Pi(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var i=t.type;if(!(i!=="submit"&&i!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function Eo(e,t,n){(t!=="number"||Qe(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var sr=Array.isArray;function Tn(e,t,n,i){if(e=e.options,t){t={};for(var a=0;a<n.length;a++)t["$"+n[a]]=!0;for(n=0;n<e.length;n++)a=t.hasOwnProperty("$"+e[n].value),e[n].selected!==a&&(e[n].selected=a),a&&i&&(e[n].defaultSelected=!0)}else{for(n=""+M(n),t=null,a=0;a<e.length;a++){if(e[a].value===n){e[a].selected=!0,i&&(e[a].defaultSelected=!0);return}t!==null||e[a].disabled||(t=e[a])}t!==null&&(t.selected=!0)}}function Zt(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(l(91));return K({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function $n(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(l(92));if(sr(n)){if(1<n.length)throw Error(l(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:M(n)}}function ko(e,t){var n=M(t.value),i=M(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),i!=null&&(e.defaultValue=""+i)}function Ir(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function en(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function At(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?en(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var ur,Ur=(function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,i,a){MSApp.execUnsafeLocalFunction(function(){return e(t,n,i,a)})}:e})(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(ur=ur||document.createElement("div"),ur.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=ur.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function cr(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var _t={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},zi=["Webkit","ms","Moz","O"];Object.keys(_t).forEach(function(e){zi.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),_t[t]=_t[e]})});function Co(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||_t.hasOwnProperty(e)&&_t[e]?(""+t).trim():t+"px"}function bo(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var i=n.indexOf("--")===0,a=Co(n,t[n],i);n==="float"&&(n="cssFloat"),i?e.setProperty(n,a):e[n]=a}}var ia=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function jr(e,t){if(t){if(ia[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(l(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(l(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(l(61))}if(t.style!=null&&typeof t.style!="object")throw Error(l(62))}}function Nn(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Vr=null;function dr(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var _o=null,wn=null,Dn=null;function Ro(e){if(e=Ko(e)){if(typeof _o!="function")throw Error(l(280));var t=e.stateNode;t&&(t=Xi(t),_o(e.stateNode,e.type,t))}}function fr(e){wn?Dn?Dn.push(e):Dn=[e]:wn=e}function pr(){if(wn){var e=wn,t=Dn;if(Dn=wn=null,Ro(e),t)for(e=0;e<t.length;e++)Ro(t[e])}}function Li(e,t){return e(t)}function Ti(){}var y=!1;function b(e,t,n){if(y)return e(t,n);y=!0;try{return Li(e,t,n)}finally{y=!1,(wn!==null||Dn!==null)&&(Ti(),pr())}}function $(e,t){var n=e.stateNode;if(n===null)return null;var i=Xi(n);if(i===null)return null;n=i[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(i=!i.disabled)||(e=e.type,i=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!i;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(l(231,t,typeof n));return n}var B=!1;if(h)try{var G={};Object.defineProperty(G,"passive",{get:function(){B=!0}}),window.addEventListener("test",G,G),window.removeEventListener("test",G,G)}catch{B=!1}function se(e,t,n,i,a,u,f,v,w){var T=Array.prototype.slice.call(arguments,3);try{t.apply(n,T)}catch(j){this.onError(j)}}var de=!1,Z=null,le=!1,re=null,xe={onError:function(e){de=!0,Z=e}};function we(e,t,n,i,a,u,f,v,w){de=!1,Z=null,se.apply(xe,arguments)}function Ce(e,t,n,i,a,u,f,v,w){if(we.apply(this,arguments),de){if(de){var T=Z;de=!1,Z=null}else throw Error(l(198));le||(le=!0,re=T)}}function Te(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,(t.flags&4098)!==0&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function Xe(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function it(e){if(Te(e)!==e)throw Error(l(188))}function Et(e){var t=e.alternate;if(!t){if(t=Te(e),t===null)throw Error(l(188));return t!==e?null:e}for(var n=e,i=t;;){var a=n.return;if(a===null)break;var u=a.alternate;if(u===null){if(i=a.return,i!==null){n=i;continue}break}if(a.child===u.child){for(u=a.child;u;){if(u===n)return it(a),e;if(u===i)return it(a),t;u=u.sibling}throw Error(l(188))}if(n.return!==i.return)n=a,i=u;else{for(var f=!1,v=a.child;v;){if(v===n){f=!0,n=a,i=u;break}if(v===i){f=!0,i=a,n=u;break}v=v.sibling}if(!f){for(v=u.child;v;){if(v===n){f=!0,n=u,i=a;break}if(v===i){f=!0,i=u,n=a;break}v=v.sibling}if(!f)throw Error(l(189))}}if(n.alternate!==i)throw Error(l(190))}if(n.tag!==3)throw Error(l(188));return n.stateNode.current===n?e:t}function Le(e){return e=Et(e),e!==null?Mn(e):null}function Mn(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Mn(e);if(t!==null)return t;e=e.sibling}return null}var dn=o.unstable_scheduleCallback,On=o.unstable_cancelCallback,Rt=o.unstable_shouldYield,mr=o.unstable_requestPaint,je=o.unstable_now,Po=o.unstable_getCurrentPriorityLevel,tn=o.unstable_ImmediatePriority,hr=o.unstable_UserBlockingPriority,Ne=o.unstable_NormalPriority,Pt=o.unstable_LowPriority,nn=o.unstable_IdlePriority,xn=null,zt=null;function Je(e){if(zt&&typeof zt.onCommitFiberRoot=="function")try{zt.onCommitFiberRoot(xn,e,void 0,(e.current.flags&128)===128)}catch{}}var ct=Math.clz32?Math.clz32:gm,$i=Math.log,la=Math.LN2;function gm(e){return e>>>=0,e===0?32:31-($i(e)/la|0)|0}var Ni=64,Di=4194304;function zo(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Mi(e,t){var n=e.pendingLanes;if(n===0)return 0;var i=0,a=e.suspendedLanes,u=e.pingedLanes,f=n&268435455;if(f!==0){var v=f&~a;v!==0?i=zo(v):(u&=f,u!==0&&(i=zo(u)))}else f=n&~a,f!==0?i=zo(f):u!==0&&(i=zo(u));if(i===0)return 0;if(t!==0&&t!==i&&(t&a)===0&&(a=i&-i,u=t&-t,a>=u||a===16&&(u&4194240)!==0))return t;if((i&4)!==0&&(i|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=i;0<t;)n=31-ct(t),a=1<<n,i|=e[n],t&=~a;return i}function ym(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function wm(e,t){for(var n=e.suspendedLanes,i=e.pingedLanes,a=e.expirationTimes,u=e.pendingLanes;0<u;){var f=31-ct(u),v=1<<f,w=a[f];w===-1?((v&n)===0||(v&i)!==0)&&(a[f]=ym(v,t)):w<=t&&(e.expiredLanes|=v),u&=~v}}function aa(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function ju(){var e=Ni;return Ni<<=1,(Ni&4194240)===0&&(Ni=64),e}function sa(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function Lo(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-ct(t),e[t]=n}function xm(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var i=e.eventTimes;for(e=e.expirationTimes;0<n;){var a=31-ct(n),u=1<<a;t[a]=0,i[a]=-1,e[a]=-1,n&=~u}}function ua(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var i=31-ct(n),a=1<<i;a&t|e[i]&t&&(e[i]|=t),n&=~a}}var Ie=0;function Vu(e){return e&=-e,1<e?4<e?(e&268435455)!==0?16:536870912:4:1}var Hu,ca,Bu,Wu,Qu,da=!1,Oi=[],An=null,Fn=null,In=null,To=new Map,$o=new Map,Un=[],Sm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ku(e,t){switch(e){case"focusin":case"focusout":An=null;break;case"dragenter":case"dragleave":Fn=null;break;case"mouseover":case"mouseout":In=null;break;case"pointerover":case"pointerout":To.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":$o.delete(t.pointerId)}}function No(e,t,n,i,a,u){return e===null||e.nativeEvent!==u?(e={blockedOn:t,domEventName:n,eventSystemFlags:i,nativeEvent:u,targetContainers:[a]},t!==null&&(t=Ko(t),t!==null&&ca(t)),e):(e.eventSystemFlags|=i,t=e.targetContainers,a!==null&&t.indexOf(a)===-1&&t.push(a),e)}function Em(e,t,n,i,a){switch(t){case"focusin":return An=No(An,e,t,n,i,a),!0;case"dragenter":return Fn=No(Fn,e,t,n,i,a),!0;case"mouseover":return In=No(In,e,t,n,i,a),!0;case"pointerover":var u=a.pointerId;return To.set(u,No(To.get(u)||null,e,t,n,i,a)),!0;case"gotpointercapture":return u=a.pointerId,$o.set(u,No($o.get(u)||null,e,t,n,i,a)),!0}return!1}function Gu(e){var t=vr(e.target);if(t!==null){var n=Te(t);if(n!==null){if(t=n.tag,t===13){if(t=Xe(n),t!==null){e.blockedOn=t,Qu(e.priority,function(){Bu(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ai(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=pa(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var i=new n.constructor(n.type,n);Vr=i,n.target.dispatchEvent(i),Vr=null}else return t=Ko(n),t!==null&&ca(t),e.blockedOn=n,!1;t.shift()}return!0}function Yu(e,t,n){Ai(e)&&n.delete(t)}function km(){da=!1,An!==null&&Ai(An)&&(An=null),Fn!==null&&Ai(Fn)&&(Fn=null),In!==null&&Ai(In)&&(In=null),To.forEach(Yu),$o.forEach(Yu)}function Do(e,t){e.blockedOn===t&&(e.blockedOn=null,da||(da=!0,o.unstable_scheduleCallback(o.unstable_NormalPriority,km)))}function Mo(e){function t(a){return Do(a,e)}if(0<Oi.length){Do(Oi[0],e);for(var n=1;n<Oi.length;n++){var i=Oi[n];i.blockedOn===e&&(i.blockedOn=null)}}for(An!==null&&Do(An,e),Fn!==null&&Do(Fn,e),In!==null&&Do(In,e),To.forEach(t),$o.forEach(t),n=0;n<Un.length;n++)i=Un[n],i.blockedOn===e&&(i.blockedOn=null);for(;0<Un.length&&(n=Un[0],n.blockedOn===null);)Gu(n),n.blockedOn===null&&Un.shift()}var Hr=Y.ReactCurrentBatchConfig,Fi=!0;function Cm(e,t,n,i){var a=Ie,u=Hr.transition;Hr.transition=null;try{Ie=1,fa(e,t,n,i)}finally{Ie=a,Hr.transition=u}}function bm(e,t,n,i){var a=Ie,u=Hr.transition;Hr.transition=null;try{Ie=4,fa(e,t,n,i)}finally{Ie=a,Hr.transition=u}}function fa(e,t,n,i){if(Fi){var a=pa(e,t,n,i);if(a===null)La(e,t,i,Ii,n),Ku(e,i);else if(Em(a,e,t,n,i))i.stopPropagation();else if(Ku(e,i),t&4&&-1<Sm.indexOf(e)){for(;a!==null;){var u=Ko(a);if(u!==null&&Hu(u),u=pa(e,t,n,i),u===null&&La(e,t,i,Ii,n),u===a)break;a=u}a!==null&&i.stopPropagation()}else La(e,t,i,null,n)}}var Ii=null;function pa(e,t,n,i){if(Ii=null,e=dr(i),e=vr(e),e!==null)if(t=Te(e),t===null)e=null;else if(n=t.tag,n===13){if(e=Xe(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return Ii=e,null}function qu(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(Po()){case tn:return 1;case hr:return 4;case Ne:case Pt:return 16;case nn:return 536870912;default:return 16}default:return 16}}var jn=null,ma=null,Ui=null;function Xu(){if(Ui)return Ui;var e,t=ma,n=t.length,i,a="value"in jn?jn.value:jn.textContent,u=a.length;for(e=0;e<n&&t[e]===a[e];e++);var f=n-e;for(i=1;i<=f&&t[n-i]===a[u-i];i++);return Ui=a.slice(e,1<i?1-i:void 0)}function ji(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Vi(){return!0}function Ju(){return!1}function Ft(e){function t(n,i,a,u,f){this._reactName=n,this._targetInst=a,this.type=i,this.nativeEvent=u,this.target=f,this.currentTarget=null;for(var v in e)e.hasOwnProperty(v)&&(n=e[v],this[v]=n?n(u):u[v]);return this.isDefaultPrevented=(u.defaultPrevented!=null?u.defaultPrevented:u.returnValue===!1)?Vi:Ju,this.isPropagationStopped=Ju,this}return K(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Vi)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Vi)},persist:function(){},isPersistent:Vi}),t}var Br={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ha=Ft(Br),Oo=K({},Br,{view:0,detail:0}),_m=Ft(Oo),va,ga,Ao,Hi=K({},Oo,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:wa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ao&&(Ao&&e.type==="mousemove"?(va=e.screenX-Ao.screenX,ga=e.screenY-Ao.screenY):ga=va=0,Ao=e),va)},movementY:function(e){return"movementY"in e?e.movementY:ga}}),Zu=Ft(Hi),Rm=K({},Hi,{dataTransfer:0}),Pm=Ft(Rm),zm=K({},Oo,{relatedTarget:0}),ya=Ft(zm),Lm=K({},Br,{animationName:0,elapsedTime:0,pseudoElement:0}),Tm=Ft(Lm),$m=K({},Br,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Nm=Ft($m),Dm=K({},Br,{data:0}),ec=Ft(Dm),Mm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Om={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Am={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Fm(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Am[e])?!!t[e]:!1}function wa(){return Fm}var Im=K({},Oo,{key:function(e){if(e.key){var t=Mm[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=ji(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Om[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:wa,charCode:function(e){return e.type==="keypress"?ji(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?ji(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Um=Ft(Im),jm=K({},Hi,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),tc=Ft(jm),Vm=K({},Oo,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:wa}),Hm=Ft(Vm),Bm=K({},Br,{propertyName:0,elapsedTime:0,pseudoElement:0}),Wm=Ft(Bm),Qm=K({},Hi,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Km=Ft(Qm),Gm=[9,13,27,32],xa=h&&"CompositionEvent"in window,Fo=null;h&&"documentMode"in document&&(Fo=document.documentMode);var Ym=h&&"TextEvent"in window&&!Fo,nc=h&&(!xa||Fo&&8<Fo&&11>=Fo),rc=" ",oc=!1;function ic(e,t){switch(e){case"keyup":return Gm.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function lc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Wr=!1;function qm(e,t){switch(e){case"compositionend":return lc(t);case"keypress":return t.which!==32?null:(oc=!0,rc);case"textInput":return e=t.data,e===rc&&oc?null:e;default:return null}}function Xm(e,t){if(Wr)return e==="compositionend"||!xa&&ic(e,t)?(e=Xu(),Ui=ma=jn=null,Wr=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return nc&&t.locale!=="ko"?null:t.data;default:return null}}var Jm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function ac(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Jm[e.type]:t==="textarea"}function sc(e,t,n,i){fr(i),t=Gi(t,"onChange"),0<t.length&&(n=new ha("onChange","change",null,n,i),e.push({event:n,listeners:t}))}var Io=null,Uo=null;function Zm(e){_c(e,0)}function Bi(e){var t=qr(e);if(nt(t))return e}function eh(e,t){if(e==="change")return t}var uc=!1;if(h){var Sa;if(h){var Ea="oninput"in document;if(!Ea){var cc=document.createElement("div");cc.setAttribute("oninput","return;"),Ea=typeof cc.oninput=="function"}Sa=Ea}else Sa=!1;uc=Sa&&(!document.documentMode||9<document.documentMode)}function dc(){Io&&(Io.detachEvent("onpropertychange",fc),Uo=Io=null)}function fc(e){if(e.propertyName==="value"&&Bi(Uo)){var t=[];sc(t,Uo,e,dr(e)),b(Zm,t)}}function th(e,t,n){e==="focusin"?(dc(),Io=t,Uo=n,Io.attachEvent("onpropertychange",fc)):e==="focusout"&&dc()}function nh(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Bi(Uo)}function rh(e,t){if(e==="click")return Bi(t)}function oh(e,t){if(e==="input"||e==="change")return Bi(t)}function ih(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var rn=typeof Object.is=="function"?Object.is:ih;function jo(e,t){if(rn(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),i=Object.keys(t);if(n.length!==i.length)return!1;for(i=0;i<n.length;i++){var a=n[i];if(!m.call(t,a)||!rn(e[a],t[a]))return!1}return!0}function pc(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function mc(e,t){var n=pc(e);e=0;for(var i;n;){if(n.nodeType===3){if(i=e+n.textContent.length,e<=t&&i>=t)return{node:n,offset:t-e};e=i}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=pc(n)}}function hc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?hc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function vc(){for(var e=window,t=Qe();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Qe(e.document)}return t}function ka(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function lh(e){var t=vc(),n=e.focusedElem,i=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&hc(n.ownerDocument.documentElement,n)){if(i!==null&&ka(n)){if(t=i.start,e=i.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var a=n.textContent.length,u=Math.min(i.start,a);i=i.end===void 0?u:Math.min(i.end,a),!e.extend&&u>i&&(a=i,i=u,u=a),a=mc(n,u);var f=mc(n,i);a&&f&&(e.rangeCount!==1||e.anchorNode!==a.node||e.anchorOffset!==a.offset||e.focusNode!==f.node||e.focusOffset!==f.offset)&&(t=t.createRange(),t.setStart(a.node,a.offset),e.removeAllRanges(),u>i?(e.addRange(t),e.extend(f.node,f.offset)):(t.setEnd(f.node,f.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var ah=h&&"documentMode"in document&&11>=document.documentMode,Qr=null,Ca=null,Vo=null,ba=!1;function gc(e,t,n){var i=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ba||Qr==null||Qr!==Qe(i)||(i=Qr,"selectionStart"in i&&ka(i)?i={start:i.selectionStart,end:i.selectionEnd}:(i=(i.ownerDocument&&i.ownerDocument.defaultView||window).getSelection(),i={anchorNode:i.anchorNode,anchorOffset:i.anchorOffset,focusNode:i.focusNode,focusOffset:i.focusOffset}),Vo&&jo(Vo,i)||(Vo=i,i=Gi(Ca,"onSelect"),0<i.length&&(t=new ha("onSelect","select",null,t,n),e.push({event:t,listeners:i}),t.target=Qr)))}function Wi(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var Kr={animationend:Wi("Animation","AnimationEnd"),animationiteration:Wi("Animation","AnimationIteration"),animationstart:Wi("Animation","AnimationStart"),transitionend:Wi("Transition","TransitionEnd")},_a={},yc={};h&&(yc=document.createElement("div").style,"AnimationEvent"in window||(delete Kr.animationend.animation,delete Kr.animationiteration.animation,delete Kr.animationstart.animation),"TransitionEvent"in window||delete Kr.transitionend.transition);function Qi(e){if(_a[e])return _a[e];if(!Kr[e])return e;var t=Kr[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in yc)return _a[e]=t[n];return e}var wc=Qi("animationend"),xc=Qi("animationiteration"),Sc=Qi("animationstart"),Ec=Qi("transitionend"),kc=new Map,Cc="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Vn(e,t){kc.set(e,t),d(t,[e])}for(var Ra=0;Ra<Cc.length;Ra++){var Pa=Cc[Ra],sh=Pa.toLowerCase(),uh=Pa[0].toUpperCase()+Pa.slice(1);Vn(sh,"on"+uh)}Vn(wc,"onAnimationEnd"),Vn(xc,"onAnimationIteration"),Vn(Sc,"onAnimationStart"),Vn("dblclick","onDoubleClick"),Vn("focusin","onFocus"),Vn("focusout","onBlur"),Vn(Ec,"onTransitionEnd"),p("onMouseEnter",["mouseout","mouseover"]),p("onMouseLeave",["mouseout","mouseover"]),p("onPointerEnter",["pointerout","pointerover"]),p("onPointerLeave",["pointerout","pointerover"]),d("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),d("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),d("onBeforeInput",["compositionend","keypress","textInput","paste"]),d("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),d("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),d("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ho="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),ch=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ho));function bc(e,t,n){var i=e.type||"unknown-event";e.currentTarget=n,Ce(i,t,void 0,e),e.currentTarget=null}function _c(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var i=e[n],a=i.event;i=i.listeners;e:{var u=void 0;if(t)for(var f=i.length-1;0<=f;f--){var v=i[f],w=v.instance,T=v.currentTarget;if(v=v.listener,w!==u&&a.isPropagationStopped())break e;bc(a,v,T),u=w}else for(f=0;f<i.length;f++){if(v=i[f],w=v.instance,T=v.currentTarget,v=v.listener,w!==u&&a.isPropagationStopped())break e;bc(a,v,T),u=w}}}if(le)throw e=re,le=!1,re=null,e}function Be(e,t){var n=t[Oa];n===void 0&&(n=t[Oa]=new Set);var i=e+"__bubble";n.has(i)||(Rc(t,e,2,!1),n.add(i))}function za(e,t,n){var i=0;t&&(i|=4),Rc(n,e,i,t)}var Ki="_reactListening"+Math.random().toString(36).slice(2);function Bo(e){if(!e[Ki]){e[Ki]=!0,s.forEach(function(n){n!=="selectionchange"&&(ch.has(n)||za(n,!1,e),za(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Ki]||(t[Ki]=!0,za("selectionchange",!1,t))}}function Rc(e,t,n,i){switch(qu(t)){case 1:var a=Cm;break;case 4:a=bm;break;default:a=fa}n=a.bind(null,t,n,e),a=void 0,!B||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(a=!0),i?a!==void 0?e.addEventListener(t,n,{capture:!0,passive:a}):e.addEventListener(t,n,!0):a!==void 0?e.addEventListener(t,n,{passive:a}):e.addEventListener(t,n,!1)}function La(e,t,n,i,a){var u=i;if((t&1)===0&&(t&2)===0&&i!==null)e:for(;;){if(i===null)return;var f=i.tag;if(f===3||f===4){var v=i.stateNode.containerInfo;if(v===a||v.nodeType===8&&v.parentNode===a)break;if(f===4)for(f=i.return;f!==null;){var w=f.tag;if((w===3||w===4)&&(w=f.stateNode.containerInfo,w===a||w.nodeType===8&&w.parentNode===a))return;f=f.return}for(;v!==null;){if(f=vr(v),f===null)return;if(w=f.tag,w===5||w===6){i=u=f;continue e}v=v.parentNode}}i=i.return}b(function(){var T=u,j=dr(n),H=[];e:{var U=kc.get(e);if(U!==void 0){var q=ha,ne=e;switch(e){case"keypress":if(ji(n)===0)break e;case"keydown":case"keyup":q=Um;break;case"focusin":ne="focus",q=ya;break;case"focusout":ne="blur",q=ya;break;case"beforeblur":case"afterblur":q=ya;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":q=Zu;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":q=Pm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":q=Hm;break;case wc:case xc:case Sc:q=Tm;break;case Ec:q=Wm;break;case"scroll":q=_m;break;case"wheel":q=Km;break;case"copy":case"cut":case"paste":q=Nm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":q=tc}var oe=(t&4)!==0,tt=!oe&&e==="scroll",_=oe?U!==null?U+"Capture":null:U;oe=[];for(var k=T,P;k!==null;){P=k;var Q=P.stateNode;if(P.tag===5&&Q!==null&&(P=Q,_!==null&&(Q=$(k,_),Q!=null&&oe.push(Wo(k,Q,P)))),tt)break;k=k.return}0<oe.length&&(U=new q(U,ne,null,n,j),H.push({event:U,listeners:oe}))}}if((t&7)===0){e:{if(U=e==="mouseover"||e==="pointerover",q=e==="mouseout"||e==="pointerout",U&&n!==Vr&&(ne=n.relatedTarget||n.fromElement)&&(vr(ne)||ne[Sn]))break e;if((q||U)&&(U=j.window===j?j:(U=j.ownerDocument)?U.defaultView||U.parentWindow:window,q?(ne=n.relatedTarget||n.toElement,q=T,ne=ne?vr(ne):null,ne!==null&&(tt=Te(ne),ne!==tt||ne.tag!==5&&ne.tag!==6)&&(ne=null)):(q=null,ne=T),q!==ne)){if(oe=Zu,Q="onMouseLeave",_="onMouseEnter",k="mouse",(e==="pointerout"||e==="pointerover")&&(oe=tc,Q="onPointerLeave",_="onPointerEnter",k="pointer"),tt=q==null?U:qr(q),P=ne==null?U:qr(ne),U=new oe(Q,k+"leave",q,n,j),U.target=tt,U.relatedTarget=P,Q=null,vr(j)===T&&(oe=new oe(_,k+"enter",ne,n,j),oe.target=P,oe.relatedTarget=tt,Q=oe),tt=Q,q&&ne)t:{for(oe=q,_=ne,k=0,P=oe;P;P=Gr(P))k++;for(P=0,Q=_;Q;Q=Gr(Q))P++;for(;0<k-P;)oe=Gr(oe),k--;for(;0<P-k;)_=Gr(_),P--;for(;k--;){if(oe===_||_!==null&&oe===_.alternate)break t;oe=Gr(oe),_=Gr(_)}oe=null}else oe=null;q!==null&&Pc(H,U,q,oe,!1),ne!==null&&tt!==null&&Pc(H,tt,ne,oe,!0)}}e:{if(U=T?qr(T):window,q=U.nodeName&&U.nodeName.toLowerCase(),q==="select"||q==="input"&&U.type==="file")var ie=eh;else if(ac(U))if(uc)ie=oh;else{ie=nh;var pe=th}else(q=U.nodeName)&&q.toLowerCase()==="input"&&(U.type==="checkbox"||U.type==="radio")&&(ie=rh);if(ie&&(ie=ie(e,T))){sc(H,ie,n,j);break e}pe&&pe(e,U,T),e==="focusout"&&(pe=U._wrapperState)&&pe.controlled&&U.type==="number"&&Eo(U,"number",U.value)}switch(pe=T?qr(T):window,e){case"focusin":(ac(pe)||pe.contentEditable==="true")&&(Qr=pe,Ca=T,Vo=null);break;case"focusout":Vo=Ca=Qr=null;break;case"mousedown":ba=!0;break;case"contextmenu":case"mouseup":case"dragend":ba=!1,gc(H,n,j);break;case"selectionchange":if(ah)break;case"keydown":case"keyup":gc(H,n,j)}var me;if(xa)e:{switch(e){case"compositionstart":var ye="onCompositionStart";break e;case"compositionend":ye="onCompositionEnd";break e;case"compositionupdate":ye="onCompositionUpdate";break e}ye=void 0}else Wr?ic(e,n)&&(ye="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(ye="onCompositionStart");ye&&(nc&&n.locale!=="ko"&&(Wr||ye!=="onCompositionStart"?ye==="onCompositionEnd"&&Wr&&(me=Xu()):(jn=j,ma="value"in jn?jn.value:jn.textContent,Wr=!0)),pe=Gi(T,ye),0<pe.length&&(ye=new ec(ye,e,null,n,j),H.push({event:ye,listeners:pe}),me?ye.data=me:(me=lc(n),me!==null&&(ye.data=me)))),(me=Ym?qm(e,n):Xm(e,n))&&(T=Gi(T,"onBeforeInput"),0<T.length&&(j=new ec("onBeforeInput","beforeinput",null,n,j),H.push({event:j,listeners:T}),j.data=me))}_c(H,t)})}function Wo(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Gi(e,t){for(var n=t+"Capture",i=[];e!==null;){var a=e,u=a.stateNode;a.tag===5&&u!==null&&(a=u,u=$(e,n),u!=null&&i.unshift(Wo(e,u,a)),u=$(e,t),u!=null&&i.push(Wo(e,u,a))),e=e.return}return i}function Gr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Pc(e,t,n,i,a){for(var u=t._reactName,f=[];n!==null&&n!==i;){var v=n,w=v.alternate,T=v.stateNode;if(w!==null&&w===i)break;v.tag===5&&T!==null&&(v=T,a?(w=$(n,u),w!=null&&f.unshift(Wo(n,w,v))):a||(w=$(n,u),w!=null&&f.push(Wo(n,w,v)))),n=n.return}f.length!==0&&e.push({event:t,listeners:f})}var dh=/\r\n?/g,fh=/\u0000|\uFFFD/g;function zc(e){return(typeof e=="string"?e:""+e).replace(dh,`
`).replace(fh,"")}function Yi(e,t,n){if(t=zc(t),zc(e)!==t&&n)throw Error(l(425))}function qi(){}var Ta=null,$a=null;function Na(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Da=typeof setTimeout=="function"?setTimeout:void 0,ph=typeof clearTimeout=="function"?clearTimeout:void 0,Lc=typeof Promise=="function"?Promise:void 0,mh=typeof queueMicrotask=="function"?queueMicrotask:typeof Lc<"u"?function(e){return Lc.resolve(null).then(e).catch(hh)}:Da;function hh(e){setTimeout(function(){throw e})}function Ma(e,t){var n=t,i=0;do{var a=n.nextSibling;if(e.removeChild(n),a&&a.nodeType===8)if(n=a.data,n==="/$"){if(i===0){e.removeChild(a),Mo(t);return}i--}else n!=="$"&&n!=="$?"&&n!=="$!"||i++;n=a}while(n);Mo(t)}function Hn(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Tc(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var Yr=Math.random().toString(36).slice(2),fn="__reactFiber$"+Yr,Qo="__reactProps$"+Yr,Sn="__reactContainer$"+Yr,Oa="__reactEvents$"+Yr,vh="__reactListeners$"+Yr,gh="__reactHandles$"+Yr;function vr(e){var t=e[fn];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Sn]||n[fn]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=Tc(e);e!==null;){if(n=e[fn])return n;e=Tc(e)}return t}e=n,n=e.parentNode}return null}function Ko(e){return e=e[fn]||e[Sn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function qr(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(l(33))}function Xi(e){return e[Qo]||null}var Aa=[],Xr=-1;function Bn(e){return{current:e}}function We(e){0>Xr||(e.current=Aa[Xr],Aa[Xr]=null,Xr--)}function Ve(e,t){Xr++,Aa[Xr]=e.current,e.current=t}var Wn={},yt=Bn(Wn),Lt=Bn(!1),gr=Wn;function Jr(e,t){var n=e.type.contextTypes;if(!n)return Wn;var i=e.stateNode;if(i&&i.__reactInternalMemoizedUnmaskedChildContext===t)return i.__reactInternalMemoizedMaskedChildContext;var a={},u;for(u in n)a[u]=t[u];return i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=a),a}function Tt(e){return e=e.childContextTypes,e!=null}function Ji(){We(Lt),We(yt)}function $c(e,t,n){if(yt.current!==Wn)throw Error(l(168));Ve(yt,t),Ve(Lt,n)}function Nc(e,t,n){var i=e.stateNode;if(t=t.childContextTypes,typeof i.getChildContext!="function")return n;i=i.getChildContext();for(var a in i)if(!(a in t))throw Error(l(108,$e(e)||"Unknown",a));return K({},n,i)}function Zi(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Wn,gr=yt.current,Ve(yt,e),Ve(Lt,Lt.current),!0}function Dc(e,t,n){var i=e.stateNode;if(!i)throw Error(l(169));n?(e=Nc(e,t,gr),i.__reactInternalMemoizedMergedChildContext=e,We(Lt),We(yt),Ve(yt,e)):We(Lt),Ve(Lt,n)}var En=null,el=!1,Fa=!1;function Mc(e){En===null?En=[e]:En.push(e)}function yh(e){el=!0,Mc(e)}function Qn(){if(!Fa&&En!==null){Fa=!0;var e=0,t=Ie;try{var n=En;for(Ie=1;e<n.length;e++){var i=n[e];do i=i(!0);while(i!==null)}En=null,el=!1}catch(a){throw En!==null&&(En=En.slice(e+1)),dn(tn,Qn),a}finally{Ie=t,Fa=!1}}return null}var Zr=[],eo=0,tl=null,nl=0,Qt=[],Kt=0,yr=null,kn=1,Cn="";function wr(e,t){Zr[eo++]=nl,Zr[eo++]=tl,tl=e,nl=t}function Oc(e,t,n){Qt[Kt++]=kn,Qt[Kt++]=Cn,Qt[Kt++]=yr,yr=e;var i=kn;e=Cn;var a=32-ct(i)-1;i&=~(1<<a),n+=1;var u=32-ct(t)+a;if(30<u){var f=a-a%5;u=(i&(1<<f)-1).toString(32),i>>=f,a-=f,kn=1<<32-ct(t)+a|n<<a|i,Cn=u+e}else kn=1<<u|n<<a|i,Cn=e}function Ia(e){e.return!==null&&(wr(e,1),Oc(e,1,0))}function Ua(e){for(;e===tl;)tl=Zr[--eo],Zr[eo]=null,nl=Zr[--eo],Zr[eo]=null;for(;e===yr;)yr=Qt[--Kt],Qt[Kt]=null,Cn=Qt[--Kt],Qt[Kt]=null,kn=Qt[--Kt],Qt[Kt]=null}var It=null,Ut=null,Ke=!1,on=null;function Ac(e,t){var n=Xt(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Fc(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,It=e,Ut=Hn(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,It=e,Ut=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=yr!==null?{id:kn,overflow:Cn}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Xt(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,It=e,Ut=null,!0):!1;default:return!1}}function ja(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Va(e){if(Ke){var t=Ut;if(t){var n=t;if(!Fc(e,t)){if(ja(e))throw Error(l(418));t=Hn(n.nextSibling);var i=It;t&&Fc(e,t)?Ac(i,n):(e.flags=e.flags&-4097|2,Ke=!1,It=e)}}else{if(ja(e))throw Error(l(418));e.flags=e.flags&-4097|2,Ke=!1,It=e}}}function Ic(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;It=e}function rl(e){if(e!==It)return!1;if(!Ke)return Ic(e),Ke=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Na(e.type,e.memoizedProps)),t&&(t=Ut)){if(ja(e))throw Uc(),Error(l(418));for(;t;)Ac(e,t),t=Hn(t.nextSibling)}if(Ic(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(l(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Ut=Hn(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Ut=null}}else Ut=It?Hn(e.stateNode.nextSibling):null;return!0}function Uc(){for(var e=Ut;e;)e=Hn(e.nextSibling)}function to(){Ut=It=null,Ke=!1}function Ha(e){on===null?on=[e]:on.push(e)}var wh=Y.ReactCurrentBatchConfig;function Go(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(l(309));var i=n.stateNode}if(!i)throw Error(l(147,e));var a=i,u=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===u?t.ref:(t=function(f){var v=a.refs;f===null?delete v[u]:v[u]=f},t._stringRef=u,t)}if(typeof e!="string")throw Error(l(284));if(!n._owner)throw Error(l(290,e))}return e}function ol(e,t){throw e=Object.prototype.toString.call(t),Error(l(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function jc(e){var t=e._init;return t(e._payload)}function Vc(e){function t(_,k){if(e){var P=_.deletions;P===null?(_.deletions=[k],_.flags|=16):P.push(k)}}function n(_,k){if(!e)return null;for(;k!==null;)t(_,k),k=k.sibling;return null}function i(_,k){for(_=new Map;k!==null;)k.key!==null?_.set(k.key,k):_.set(k.index,k),k=k.sibling;return _}function a(_,k){return _=er(_,k),_.index=0,_.sibling=null,_}function u(_,k,P){return _.index=P,e?(P=_.alternate,P!==null?(P=P.index,P<k?(_.flags|=2,k):P):(_.flags|=2,k)):(_.flags|=1048576,k)}function f(_){return e&&_.alternate===null&&(_.flags|=2),_}function v(_,k,P,Q){return k===null||k.tag!==6?(k=Ds(P,_.mode,Q),k.return=_,k):(k=a(k,P),k.return=_,k)}function w(_,k,P,Q){var ie=P.type;return ie===fe?j(_,k,P.props.children,Q,P.key):k!==null&&(k.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===ge&&jc(ie)===k.type)?(Q=a(k,P.props),Q.ref=Go(_,k,P),Q.return=_,Q):(Q=Pl(P.type,P.key,P.props,null,_.mode,Q),Q.ref=Go(_,k,P),Q.return=_,Q)}function T(_,k,P,Q){return k===null||k.tag!==4||k.stateNode.containerInfo!==P.containerInfo||k.stateNode.implementation!==P.implementation?(k=Ms(P,_.mode,Q),k.return=_,k):(k=a(k,P.children||[]),k.return=_,k)}function j(_,k,P,Q,ie){return k===null||k.tag!==7?(k=Rr(P,_.mode,Q,ie),k.return=_,k):(k=a(k,P),k.return=_,k)}function H(_,k,P){if(typeof k=="string"&&k!==""||typeof k=="number")return k=Ds(""+k,_.mode,P),k.return=_,k;if(typeof k=="object"&&k!==null){switch(k.$$typeof){case ae:return P=Pl(k.type,k.key,k.props,null,_.mode,P),P.ref=Go(_,null,k),P.return=_,P;case z:return k=Ms(k,_.mode,P),k.return=_,k;case ge:var Q=k._init;return H(_,Q(k._payload),P)}if(sr(k)||J(k))return k=Rr(k,_.mode,P,null),k.return=_,k;ol(_,k)}return null}function U(_,k,P,Q){var ie=k!==null?k.key:null;if(typeof P=="string"&&P!==""||typeof P=="number")return ie!==null?null:v(_,k,""+P,Q);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case ae:return P.key===ie?w(_,k,P,Q):null;case z:return P.key===ie?T(_,k,P,Q):null;case ge:return ie=P._init,U(_,k,ie(P._payload),Q)}if(sr(P)||J(P))return ie!==null?null:j(_,k,P,Q,null);ol(_,P)}return null}function q(_,k,P,Q,ie){if(typeof Q=="string"&&Q!==""||typeof Q=="number")return _=_.get(P)||null,v(k,_,""+Q,ie);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case ae:return _=_.get(Q.key===null?P:Q.key)||null,w(k,_,Q,ie);case z:return _=_.get(Q.key===null?P:Q.key)||null,T(k,_,Q,ie);case ge:var pe=Q._init;return q(_,k,P,pe(Q._payload),ie)}if(sr(Q)||J(Q))return _=_.get(P)||null,j(k,_,Q,ie,null);ol(k,Q)}return null}function ne(_,k,P,Q){for(var ie=null,pe=null,me=k,ye=k=0,pt=null;me!==null&&ye<P.length;ye++){me.index>ye?(pt=me,me=null):pt=me.sibling;var Me=U(_,me,P[ye],Q);if(Me===null){me===null&&(me=pt);break}e&&me&&Me.alternate===null&&t(_,me),k=u(Me,k,ye),pe===null?ie=Me:pe.sibling=Me,pe=Me,me=pt}if(ye===P.length)return n(_,me),Ke&&wr(_,ye),ie;if(me===null){for(;ye<P.length;ye++)me=H(_,P[ye],Q),me!==null&&(k=u(me,k,ye),pe===null?ie=me:pe.sibling=me,pe=me);return Ke&&wr(_,ye),ie}for(me=i(_,me);ye<P.length;ye++)pt=q(me,_,ye,P[ye],Q),pt!==null&&(e&&pt.alternate!==null&&me.delete(pt.key===null?ye:pt.key),k=u(pt,k,ye),pe===null?ie=pt:pe.sibling=pt,pe=pt);return e&&me.forEach(function(tr){return t(_,tr)}),Ke&&wr(_,ye),ie}function oe(_,k,P,Q){var ie=J(P);if(typeof ie!="function")throw Error(l(150));if(P=ie.call(P),P==null)throw Error(l(151));for(var pe=ie=null,me=k,ye=k=0,pt=null,Me=P.next();me!==null&&!Me.done;ye++,Me=P.next()){me.index>ye?(pt=me,me=null):pt=me.sibling;var tr=U(_,me,Me.value,Q);if(tr===null){me===null&&(me=pt);break}e&&me&&tr.alternate===null&&t(_,me),k=u(tr,k,ye),pe===null?ie=tr:pe.sibling=tr,pe=tr,me=pt}if(Me.done)return n(_,me),Ke&&wr(_,ye),ie;if(me===null){for(;!Me.done;ye++,Me=P.next())Me=H(_,Me.value,Q),Me!==null&&(k=u(Me,k,ye),pe===null?ie=Me:pe.sibling=Me,pe=Me);return Ke&&wr(_,ye),ie}for(me=i(_,me);!Me.done;ye++,Me=P.next())Me=q(me,_,ye,Me.value,Q),Me!==null&&(e&&Me.alternate!==null&&me.delete(Me.key===null?ye:Me.key),k=u(Me,k,ye),pe===null?ie=Me:pe.sibling=Me,pe=Me);return e&&me.forEach(function(Jh){return t(_,Jh)}),Ke&&wr(_,ye),ie}function tt(_,k,P,Q){if(typeof P=="object"&&P!==null&&P.type===fe&&P.key===null&&(P=P.props.children),typeof P=="object"&&P!==null){switch(P.$$typeof){case ae:e:{for(var ie=P.key,pe=k;pe!==null;){if(pe.key===ie){if(ie=P.type,ie===fe){if(pe.tag===7){n(_,pe.sibling),k=a(pe,P.props.children),k.return=_,_=k;break e}}else if(pe.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===ge&&jc(ie)===pe.type){n(_,pe.sibling),k=a(pe,P.props),k.ref=Go(_,pe,P),k.return=_,_=k;break e}n(_,pe);break}else t(_,pe);pe=pe.sibling}P.type===fe?(k=Rr(P.props.children,_.mode,Q,P.key),k.return=_,_=k):(Q=Pl(P.type,P.key,P.props,null,_.mode,Q),Q.ref=Go(_,k,P),Q.return=_,_=Q)}return f(_);case z:e:{for(pe=P.key;k!==null;){if(k.key===pe)if(k.tag===4&&k.stateNode.containerInfo===P.containerInfo&&k.stateNode.implementation===P.implementation){n(_,k.sibling),k=a(k,P.children||[]),k.return=_,_=k;break e}else{n(_,k);break}else t(_,k);k=k.sibling}k=Ms(P,_.mode,Q),k.return=_,_=k}return f(_);case ge:return pe=P._init,tt(_,k,pe(P._payload),Q)}if(sr(P))return ne(_,k,P,Q);if(J(P))return oe(_,k,P,Q);ol(_,P)}return typeof P=="string"&&P!==""||typeof P=="number"?(P=""+P,k!==null&&k.tag===6?(n(_,k.sibling),k=a(k,P),k.return=_,_=k):(n(_,k),k=Ds(P,_.mode,Q),k.return=_,_=k),f(_)):n(_,k)}return tt}var no=Vc(!0),Hc=Vc(!1),il=Bn(null),ll=null,ro=null,Ba=null;function Wa(){Ba=ro=ll=null}function Qa(e){var t=il.current;We(il),e._currentValue=t}function Ka(e,t,n){for(;e!==null;){var i=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,i!==null&&(i.childLanes|=t)):i!==null&&(i.childLanes&t)!==t&&(i.childLanes|=t),e===n)break;e=e.return}}function oo(e,t){ll=e,Ba=ro=null,e=e.dependencies,e!==null&&e.firstContext!==null&&((e.lanes&t)!==0&&($t=!0),e.firstContext=null)}function Gt(e){var t=e._currentValue;if(Ba!==e)if(e={context:e,memoizedValue:t,next:null},ro===null){if(ll===null)throw Error(l(308));ro=e,ll.dependencies={lanes:0,firstContext:e}}else ro=ro.next=e;return t}var xr=null;function Ga(e){xr===null?xr=[e]:xr.push(e)}function Bc(e,t,n,i){var a=t.interleaved;return a===null?(n.next=n,Ga(t)):(n.next=a.next,a.next=n),t.interleaved=n,bn(e,i)}function bn(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var Kn=!1;function Ya(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function _n(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Gn(e,t,n){var i=e.updateQueue;if(i===null)return null;if(i=i.shared,(De&2)!==0){var a=i.pending;return a===null?t.next=t:(t.next=a.next,a.next=t),i.pending=t,bn(e,n)}return a=i.interleaved,a===null?(t.next=t,Ga(i)):(t.next=a.next,a.next=t),i.interleaved=t,bn(e,n)}function al(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,ua(e,n)}}function Qc(e,t){var n=e.updateQueue,i=e.alternate;if(i!==null&&(i=i.updateQueue,n===i)){var a=null,u=null;if(n=n.firstBaseUpdate,n!==null){do{var f={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};u===null?a=u=f:u=u.next=f,n=n.next}while(n!==null);u===null?a=u=t:u=u.next=t}else a=u=t;n={baseState:i.baseState,firstBaseUpdate:a,lastBaseUpdate:u,shared:i.shared,effects:i.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function sl(e,t,n,i){var a=e.updateQueue;Kn=!1;var u=a.firstBaseUpdate,f=a.lastBaseUpdate,v=a.shared.pending;if(v!==null){a.shared.pending=null;var w=v,T=w.next;w.next=null,f===null?u=T:f.next=T,f=w;var j=e.alternate;j!==null&&(j=j.updateQueue,v=j.lastBaseUpdate,v!==f&&(v===null?j.firstBaseUpdate=T:v.next=T,j.lastBaseUpdate=w))}if(u!==null){var H=a.baseState;f=0,j=T=w=null,v=u;do{var U=v.lane,q=v.eventTime;if((i&U)===U){j!==null&&(j=j.next={eventTime:q,lane:0,tag:v.tag,payload:v.payload,callback:v.callback,next:null});e:{var ne=e,oe=v;switch(U=t,q=n,oe.tag){case 1:if(ne=oe.payload,typeof ne=="function"){H=ne.call(q,H,U);break e}H=ne;break e;case 3:ne.flags=ne.flags&-65537|128;case 0:if(ne=oe.payload,U=typeof ne=="function"?ne.call(q,H,U):ne,U==null)break e;H=K({},H,U);break e;case 2:Kn=!0}}v.callback!==null&&v.lane!==0&&(e.flags|=64,U=a.effects,U===null?a.effects=[v]:U.push(v))}else q={eventTime:q,lane:U,tag:v.tag,payload:v.payload,callback:v.callback,next:null},j===null?(T=j=q,w=H):j=j.next=q,f|=U;if(v=v.next,v===null){if(v=a.shared.pending,v===null)break;U=v,v=U.next,U.next=null,a.lastBaseUpdate=U,a.shared.pending=null}}while(!0);if(j===null&&(w=H),a.baseState=w,a.firstBaseUpdate=T,a.lastBaseUpdate=j,t=a.shared.interleaved,t!==null){a=t;do f|=a.lane,a=a.next;while(a!==t)}else u===null&&(a.shared.lanes=0);kr|=f,e.lanes=f,e.memoizedState=H}}function Kc(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var i=e[t],a=i.callback;if(a!==null){if(i.callback=null,i=n,typeof a!="function")throw Error(l(191,a));a.call(i)}}}var Yo={},pn=Bn(Yo),qo=Bn(Yo),Xo=Bn(Yo);function Sr(e){if(e===Yo)throw Error(l(174));return e}function qa(e,t){switch(Ve(Xo,t),Ve(qo,e),Ve(pn,Yo),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:At(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=At(t,e)}We(pn),Ve(pn,t)}function io(){We(pn),We(qo),We(Xo)}function Gc(e){Sr(Xo.current);var t=Sr(pn.current),n=At(t,e.type);t!==n&&(Ve(qo,e),Ve(pn,n))}function Xa(e){qo.current===e&&(We(pn),We(qo))}var Ye=Bn(0);function ul(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if((t.flags&128)!==0)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ja=[];function Za(){for(var e=0;e<Ja.length;e++)Ja[e]._workInProgressVersionPrimary=null;Ja.length=0}var cl=Y.ReactCurrentDispatcher,es=Y.ReactCurrentBatchConfig,Er=0,qe=null,lt=null,dt=null,dl=!1,Jo=!1,Zo=0,xh=0;function wt(){throw Error(l(321))}function ts(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!rn(e[n],t[n]))return!1;return!0}function ns(e,t,n,i,a,u){if(Er=u,qe=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,cl.current=e===null||e.memoizedState===null?Ch:bh,e=n(i,a),Jo){u=0;do{if(Jo=!1,Zo=0,25<=u)throw Error(l(301));u+=1,dt=lt=null,t.updateQueue=null,cl.current=_h,e=n(i,a)}while(Jo)}if(cl.current=ml,t=lt!==null&&lt.next!==null,Er=0,dt=lt=qe=null,dl=!1,t)throw Error(l(300));return e}function rs(){var e=Zo!==0;return Zo=0,e}function mn(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return dt===null?qe.memoizedState=dt=e:dt=dt.next=e,dt}function Yt(){if(lt===null){var e=qe.alternate;e=e!==null?e.memoizedState:null}else e=lt.next;var t=dt===null?qe.memoizedState:dt.next;if(t!==null)dt=t,lt=e;else{if(e===null)throw Error(l(310));lt=e,e={memoizedState:lt.memoizedState,baseState:lt.baseState,baseQueue:lt.baseQueue,queue:lt.queue,next:null},dt===null?qe.memoizedState=dt=e:dt=dt.next=e}return dt}function ei(e,t){return typeof t=="function"?t(e):t}function os(e){var t=Yt(),n=t.queue;if(n===null)throw Error(l(311));n.lastRenderedReducer=e;var i=lt,a=i.baseQueue,u=n.pending;if(u!==null){if(a!==null){var f=a.next;a.next=u.next,u.next=f}i.baseQueue=a=u,n.pending=null}if(a!==null){u=a.next,i=i.baseState;var v=f=null,w=null,T=u;do{var j=T.lane;if((Er&j)===j)w!==null&&(w=w.next={lane:0,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null}),i=T.hasEagerState?T.eagerState:e(i,T.action);else{var H={lane:j,action:T.action,hasEagerState:T.hasEagerState,eagerState:T.eagerState,next:null};w===null?(v=w=H,f=i):w=w.next=H,qe.lanes|=j,kr|=j}T=T.next}while(T!==null&&T!==u);w===null?f=i:w.next=v,rn(i,t.memoizedState)||($t=!0),t.memoizedState=i,t.baseState=f,t.baseQueue=w,n.lastRenderedState=i}if(e=n.interleaved,e!==null){a=e;do u=a.lane,qe.lanes|=u,kr|=u,a=a.next;while(a!==e)}else a===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function is(e){var t=Yt(),n=t.queue;if(n===null)throw Error(l(311));n.lastRenderedReducer=e;var i=n.dispatch,a=n.pending,u=t.memoizedState;if(a!==null){n.pending=null;var f=a=a.next;do u=e(u,f.action),f=f.next;while(f!==a);rn(u,t.memoizedState)||($t=!0),t.memoizedState=u,t.baseQueue===null&&(t.baseState=u),n.lastRenderedState=u}return[u,i]}function Yc(){}function qc(e,t){var n=qe,i=Yt(),a=t(),u=!rn(i.memoizedState,a);if(u&&(i.memoizedState=a,$t=!0),i=i.queue,ls(Zc.bind(null,n,i,e),[e]),i.getSnapshot!==t||u||dt!==null&&dt.memoizedState.tag&1){if(n.flags|=2048,ti(9,Jc.bind(null,n,i,a,t),void 0,null),ft===null)throw Error(l(349));(Er&30)!==0||Xc(n,t,a)}return a}function Xc(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=qe.updateQueue,t===null?(t={lastEffect:null,stores:null},qe.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Jc(e,t,n,i){t.value=n,t.getSnapshot=i,ed(t)&&td(e)}function Zc(e,t,n){return n(function(){ed(t)&&td(e)})}function ed(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!rn(e,n)}catch{return!0}}function td(e){var t=bn(e,1);t!==null&&un(t,e,1,-1)}function nd(e){var t=mn();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ei,lastRenderedState:e},t.queue=e,e=e.dispatch=kh.bind(null,qe,e),[t.memoizedState,e]}function ti(e,t,n,i){return e={tag:e,create:t,destroy:n,deps:i,next:null},t=qe.updateQueue,t===null?(t={lastEffect:null,stores:null},qe.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(i=n.next,n.next=e,e.next=i,t.lastEffect=e)),e}function rd(){return Yt().memoizedState}function fl(e,t,n,i){var a=mn();qe.flags|=e,a.memoizedState=ti(1|t,n,void 0,i===void 0?null:i)}function pl(e,t,n,i){var a=Yt();i=i===void 0?null:i;var u=void 0;if(lt!==null){var f=lt.memoizedState;if(u=f.destroy,i!==null&&ts(i,f.deps)){a.memoizedState=ti(t,n,u,i);return}}qe.flags|=e,a.memoizedState=ti(1|t,n,u,i)}function od(e,t){return fl(8390656,8,e,t)}function ls(e,t){return pl(2048,8,e,t)}function id(e,t){return pl(4,2,e,t)}function ld(e,t){return pl(4,4,e,t)}function ad(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function sd(e,t,n){return n=n!=null?n.concat([e]):null,pl(4,4,ad.bind(null,t,e),n)}function as(){}function ud(e,t){var n=Yt();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&ts(t,i[1])?i[0]:(n.memoizedState=[e,t],e)}function cd(e,t){var n=Yt();t=t===void 0?null:t;var i=n.memoizedState;return i!==null&&t!==null&&ts(t,i[1])?i[0]:(e=e(),n.memoizedState=[e,t],e)}function dd(e,t,n){return(Er&21)===0?(e.baseState&&(e.baseState=!1,$t=!0),e.memoizedState=n):(rn(n,t)||(n=ju(),qe.lanes|=n,kr|=n,e.baseState=!0),t)}function Sh(e,t){var n=Ie;Ie=n!==0&&4>n?n:4,e(!0);var i=es.transition;es.transition={};try{e(!1),t()}finally{Ie=n,es.transition=i}}function fd(){return Yt().memoizedState}function Eh(e,t,n){var i=Jn(e);if(n={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null},pd(e))md(t,n);else if(n=Bc(e,t,n,i),n!==null){var a=Ct();un(n,e,i,a),hd(n,t,i)}}function kh(e,t,n){var i=Jn(e),a={lane:i,action:n,hasEagerState:!1,eagerState:null,next:null};if(pd(e))md(t,a);else{var u=e.alternate;if(e.lanes===0&&(u===null||u.lanes===0)&&(u=t.lastRenderedReducer,u!==null))try{var f=t.lastRenderedState,v=u(f,n);if(a.hasEagerState=!0,a.eagerState=v,rn(v,f)){var w=t.interleaved;w===null?(a.next=a,Ga(t)):(a.next=w.next,w.next=a),t.interleaved=a;return}}catch{}finally{}n=Bc(e,t,a,i),n!==null&&(a=Ct(),un(n,e,i,a),hd(n,t,i))}}function pd(e){var t=e.alternate;return e===qe||t!==null&&t===qe}function md(e,t){Jo=dl=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function hd(e,t,n){if((n&4194240)!==0){var i=t.lanes;i&=e.pendingLanes,n|=i,t.lanes=n,ua(e,n)}}var ml={readContext:Gt,useCallback:wt,useContext:wt,useEffect:wt,useImperativeHandle:wt,useInsertionEffect:wt,useLayoutEffect:wt,useMemo:wt,useReducer:wt,useRef:wt,useState:wt,useDebugValue:wt,useDeferredValue:wt,useTransition:wt,useMutableSource:wt,useSyncExternalStore:wt,useId:wt,unstable_isNewReconciler:!1},Ch={readContext:Gt,useCallback:function(e,t){return mn().memoizedState=[e,t===void 0?null:t],e},useContext:Gt,useEffect:od,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,fl(4194308,4,ad.bind(null,t,e),n)},useLayoutEffect:function(e,t){return fl(4194308,4,e,t)},useInsertionEffect:function(e,t){return fl(4,2,e,t)},useMemo:function(e,t){var n=mn();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var i=mn();return t=n!==void 0?n(t):t,i.memoizedState=i.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},i.queue=e,e=e.dispatch=Eh.bind(null,qe,e),[i.memoizedState,e]},useRef:function(e){var t=mn();return e={current:e},t.memoizedState=e},useState:nd,useDebugValue:as,useDeferredValue:function(e){return mn().memoizedState=e},useTransition:function(){var e=nd(!1),t=e[0];return e=Sh.bind(null,e[1]),mn().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var i=qe,a=mn();if(Ke){if(n===void 0)throw Error(l(407));n=n()}else{if(n=t(),ft===null)throw Error(l(349));(Er&30)!==0||Xc(i,t,n)}a.memoizedState=n;var u={value:n,getSnapshot:t};return a.queue=u,od(Zc.bind(null,i,u,e),[e]),i.flags|=2048,ti(9,Jc.bind(null,i,u,n,t),void 0,null),n},useId:function(){var e=mn(),t=ft.identifierPrefix;if(Ke){var n=Cn,i=kn;n=(i&~(1<<32-ct(i)-1)).toString(32)+n,t=":"+t+"R"+n,n=Zo++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=xh++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},bh={readContext:Gt,useCallback:ud,useContext:Gt,useEffect:ls,useImperativeHandle:sd,useInsertionEffect:id,useLayoutEffect:ld,useMemo:cd,useReducer:os,useRef:rd,useState:function(){return os(ei)},useDebugValue:as,useDeferredValue:function(e){var t=Yt();return dd(t,lt.memoizedState,e)},useTransition:function(){var e=os(ei)[0],t=Yt().memoizedState;return[e,t]},useMutableSource:Yc,useSyncExternalStore:qc,useId:fd,unstable_isNewReconciler:!1},_h={readContext:Gt,useCallback:ud,useContext:Gt,useEffect:ls,useImperativeHandle:sd,useInsertionEffect:id,useLayoutEffect:ld,useMemo:cd,useReducer:is,useRef:rd,useState:function(){return is(ei)},useDebugValue:as,useDeferredValue:function(e){var t=Yt();return lt===null?t.memoizedState=e:dd(t,lt.memoizedState,e)},useTransition:function(){var e=is(ei)[0],t=Yt().memoizedState;return[e,t]},useMutableSource:Yc,useSyncExternalStore:qc,useId:fd,unstable_isNewReconciler:!1};function ln(e,t){if(e&&e.defaultProps){t=K({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function ss(e,t,n,i){t=e.memoizedState,n=n(i,t),n=n==null?t:K({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var hl={isMounted:function(e){return(e=e._reactInternals)?Te(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var i=Ct(),a=Jn(e),u=_n(i,a);u.payload=t,n!=null&&(u.callback=n),t=Gn(e,u,a),t!==null&&(un(t,e,a,i),al(t,e,a))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var i=Ct(),a=Jn(e),u=_n(i,a);u.tag=1,u.payload=t,n!=null&&(u.callback=n),t=Gn(e,u,a),t!==null&&(un(t,e,a,i),al(t,e,a))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ct(),i=Jn(e),a=_n(n,i);a.tag=2,t!=null&&(a.callback=t),t=Gn(e,a,i),t!==null&&(un(t,e,i,n),al(t,e,i))}};function vd(e,t,n,i,a,u,f){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(i,u,f):t.prototype&&t.prototype.isPureReactComponent?!jo(n,i)||!jo(a,u):!0}function gd(e,t,n){var i=!1,a=Wn,u=t.contextType;return typeof u=="object"&&u!==null?u=Gt(u):(a=Tt(t)?gr:yt.current,i=t.contextTypes,u=(i=i!=null)?Jr(e,a):Wn),t=new t(n,u),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=hl,e.stateNode=t,t._reactInternals=e,i&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=a,e.__reactInternalMemoizedMaskedChildContext=u),t}function yd(e,t,n,i){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,i),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,i),t.state!==e&&hl.enqueueReplaceState(t,t.state,null)}function us(e,t,n,i){var a=e.stateNode;a.props=n,a.state=e.memoizedState,a.refs={},Ya(e);var u=t.contextType;typeof u=="object"&&u!==null?a.context=Gt(u):(u=Tt(t)?gr:yt.current,a.context=Jr(e,u)),a.state=e.memoizedState,u=t.getDerivedStateFromProps,typeof u=="function"&&(ss(e,t,u,n),a.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof a.getSnapshotBeforeUpdate=="function"||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(t=a.state,typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount(),t!==a.state&&hl.enqueueReplaceState(a,a.state,null),sl(e,n,a,i),a.state=e.memoizedState),typeof a.componentDidMount=="function"&&(e.flags|=4194308)}function lo(e,t){try{var n="",i=t;do n+=Ee(i),i=i.return;while(i);var a=n}catch(u){a=`
Error generating stack: `+u.message+`
`+u.stack}return{value:e,source:t,stack:a,digest:null}}function cs(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function ds(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var Rh=typeof WeakMap=="function"?WeakMap:Map;function wd(e,t,n){n=_n(-1,n),n.tag=3,n.payload={element:null};var i=t.value;return n.callback=function(){El||(El=!0,_s=i),ds(e,t)},n}function xd(e,t,n){n=_n(-1,n),n.tag=3;var i=e.type.getDerivedStateFromError;if(typeof i=="function"){var a=t.value;n.payload=function(){return i(a)},n.callback=function(){ds(e,t)}}var u=e.stateNode;return u!==null&&typeof u.componentDidCatch=="function"&&(n.callback=function(){ds(e,t),typeof i!="function"&&(qn===null?qn=new Set([this]):qn.add(this));var f=t.stack;this.componentDidCatch(t.value,{componentStack:f!==null?f:""})}),n}function Sd(e,t,n){var i=e.pingCache;if(i===null){i=e.pingCache=new Rh;var a=new Set;i.set(t,a)}else a=i.get(t),a===void 0&&(a=new Set,i.set(t,a));a.has(n)||(a.add(n),e=jh.bind(null,e,t,n),t.then(e,e))}function Ed(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function kd(e,t,n,i,a){return(e.mode&1)===0?(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=_n(-1,1),t.tag=2,Gn(n,t,1))),n.lanes|=1),e):(e.flags|=65536,e.lanes=a,e)}var Ph=Y.ReactCurrentOwner,$t=!1;function kt(e,t,n,i){t.child=e===null?Hc(t,null,n,i):no(t,e.child,n,i)}function Cd(e,t,n,i,a){n=n.render;var u=t.ref;return oo(t,a),i=ns(e,t,n,i,u,a),n=rs(),e!==null&&!$t?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Rn(e,t,a)):(Ke&&n&&Ia(t),t.flags|=1,kt(e,t,i,a),t.child)}function bd(e,t,n,i,a){if(e===null){var u=n.type;return typeof u=="function"&&!Ns(u)&&u.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=u,_d(e,t,u,i,a)):(e=Pl(n.type,null,i,t,t.mode,a),e.ref=t.ref,e.return=t,t.child=e)}if(u=e.child,(e.lanes&a)===0){var f=u.memoizedProps;if(n=n.compare,n=n!==null?n:jo,n(f,i)&&e.ref===t.ref)return Rn(e,t,a)}return t.flags|=1,e=er(u,i),e.ref=t.ref,e.return=t,t.child=e}function _d(e,t,n,i,a){if(e!==null){var u=e.memoizedProps;if(jo(u,i)&&e.ref===t.ref)if($t=!1,t.pendingProps=i=u,(e.lanes&a)!==0)(e.flags&131072)!==0&&($t=!0);else return t.lanes=e.lanes,Rn(e,t,a)}return fs(e,t,n,i,a)}function Rd(e,t,n){var i=t.pendingProps,a=i.children,u=e!==null?e.memoizedState:null;if(i.mode==="hidden")if((t.mode&1)===0)t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ve(so,jt),jt|=n;else{if((n&1073741824)===0)return e=u!==null?u.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Ve(so,jt),jt|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},i=u!==null?u.baseLanes:n,Ve(so,jt),jt|=i}else u!==null?(i=u.baseLanes|n,t.memoizedState=null):i=n,Ve(so,jt),jt|=i;return kt(e,t,a,n),t.child}function Pd(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function fs(e,t,n,i,a){var u=Tt(n)?gr:yt.current;return u=Jr(t,u),oo(t,a),n=ns(e,t,n,i,u,a),i=rs(),e!==null&&!$t?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~a,Rn(e,t,a)):(Ke&&i&&Ia(t),t.flags|=1,kt(e,t,n,a),t.child)}function zd(e,t,n,i,a){if(Tt(n)){var u=!0;Zi(t)}else u=!1;if(oo(t,a),t.stateNode===null)gl(e,t),gd(t,n,i),us(t,n,i,a),i=!0;else if(e===null){var f=t.stateNode,v=t.memoizedProps;f.props=v;var w=f.context,T=n.contextType;typeof T=="object"&&T!==null?T=Gt(T):(T=Tt(n)?gr:yt.current,T=Jr(t,T));var j=n.getDerivedStateFromProps,H=typeof j=="function"||typeof f.getSnapshotBeforeUpdate=="function";H||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(v!==i||w!==T)&&yd(t,f,i,T),Kn=!1;var U=t.memoizedState;f.state=U,sl(t,i,f,a),w=t.memoizedState,v!==i||U!==w||Lt.current||Kn?(typeof j=="function"&&(ss(t,n,j,i),w=t.memoizedState),(v=Kn||vd(t,n,v,i,U,w,T))?(H||typeof f.UNSAFE_componentWillMount!="function"&&typeof f.componentWillMount!="function"||(typeof f.componentWillMount=="function"&&f.componentWillMount(),typeof f.UNSAFE_componentWillMount=="function"&&f.UNSAFE_componentWillMount()),typeof f.componentDidMount=="function"&&(t.flags|=4194308)):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=i,t.memoizedState=w),f.props=i,f.state=w,f.context=T,i=v):(typeof f.componentDidMount=="function"&&(t.flags|=4194308),i=!1)}else{f=t.stateNode,Wc(e,t),v=t.memoizedProps,T=t.type===t.elementType?v:ln(t.type,v),f.props=T,H=t.pendingProps,U=f.context,w=n.contextType,typeof w=="object"&&w!==null?w=Gt(w):(w=Tt(n)?gr:yt.current,w=Jr(t,w));var q=n.getDerivedStateFromProps;(j=typeof q=="function"||typeof f.getSnapshotBeforeUpdate=="function")||typeof f.UNSAFE_componentWillReceiveProps!="function"&&typeof f.componentWillReceiveProps!="function"||(v!==H||U!==w)&&yd(t,f,i,w),Kn=!1,U=t.memoizedState,f.state=U,sl(t,i,f,a);var ne=t.memoizedState;v!==H||U!==ne||Lt.current||Kn?(typeof q=="function"&&(ss(t,n,q,i),ne=t.memoizedState),(T=Kn||vd(t,n,T,i,U,ne,w)||!1)?(j||typeof f.UNSAFE_componentWillUpdate!="function"&&typeof f.componentWillUpdate!="function"||(typeof f.componentWillUpdate=="function"&&f.componentWillUpdate(i,ne,w),typeof f.UNSAFE_componentWillUpdate=="function"&&f.UNSAFE_componentWillUpdate(i,ne,w)),typeof f.componentDidUpdate=="function"&&(t.flags|=4),typeof f.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof f.componentDidUpdate!="function"||v===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),t.memoizedProps=i,t.memoizedState=ne),f.props=i,f.state=ne,f.context=w,i=T):(typeof f.componentDidUpdate!="function"||v===e.memoizedProps&&U===e.memoizedState||(t.flags|=4),typeof f.getSnapshotBeforeUpdate!="function"||v===e.memoizedProps&&U===e.memoizedState||(t.flags|=1024),i=!1)}return ps(e,t,n,i,u,a)}function ps(e,t,n,i,a,u){Pd(e,t);var f=(t.flags&128)!==0;if(!i&&!f)return a&&Dc(t,n,!1),Rn(e,t,u);i=t.stateNode,Ph.current=t;var v=f&&typeof n.getDerivedStateFromError!="function"?null:i.render();return t.flags|=1,e!==null&&f?(t.child=no(t,e.child,null,u),t.child=no(t,null,v,u)):kt(e,t,v,u),t.memoizedState=i.state,a&&Dc(t,n,!0),t.child}function Ld(e){var t=e.stateNode;t.pendingContext?$c(e,t.pendingContext,t.pendingContext!==t.context):t.context&&$c(e,t.context,!1),qa(e,t.containerInfo)}function Td(e,t,n,i,a){return to(),Ha(a),t.flags|=256,kt(e,t,n,i),t.child}var ms={dehydrated:null,treeContext:null,retryLane:0};function hs(e){return{baseLanes:e,cachePool:null,transitions:null}}function $d(e,t,n){var i=t.pendingProps,a=Ye.current,u=!1,f=(t.flags&128)!==0,v;if((v=f)||(v=e!==null&&e.memoizedState===null?!1:(a&2)!==0),v?(u=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(a|=1),Ve(Ye,a&1),e===null)return Va(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?((t.mode&1)===0?t.lanes=1:e.data==="$!"?t.lanes=8:t.lanes=1073741824,null):(f=i.children,e=i.fallback,u?(i=t.mode,u=t.child,f={mode:"hidden",children:f},(i&1)===0&&u!==null?(u.childLanes=0,u.pendingProps=f):u=zl(f,i,0,null),e=Rr(e,i,n,null),u.return=t,e.return=t,u.sibling=e,t.child=u,t.child.memoizedState=hs(n),t.memoizedState=ms,e):vs(t,f));if(a=e.memoizedState,a!==null&&(v=a.dehydrated,v!==null))return zh(e,t,f,i,v,a,n);if(u){u=i.fallback,f=t.mode,a=e.child,v=a.sibling;var w={mode:"hidden",children:i.children};return(f&1)===0&&t.child!==a?(i=t.child,i.childLanes=0,i.pendingProps=w,t.deletions=null):(i=er(a,w),i.subtreeFlags=a.subtreeFlags&14680064),v!==null?u=er(v,u):(u=Rr(u,f,n,null),u.flags|=2),u.return=t,i.return=t,i.sibling=u,t.child=i,i=u,u=t.child,f=e.child.memoizedState,f=f===null?hs(n):{baseLanes:f.baseLanes|n,cachePool:null,transitions:f.transitions},u.memoizedState=f,u.childLanes=e.childLanes&~n,t.memoizedState=ms,i}return u=e.child,e=u.sibling,i=er(u,{mode:"visible",children:i.children}),(t.mode&1)===0&&(i.lanes=n),i.return=t,i.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=i,t.memoizedState=null,i}function vs(e,t){return t=zl({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function vl(e,t,n,i){return i!==null&&Ha(i),no(t,e.child,null,n),e=vs(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function zh(e,t,n,i,a,u,f){if(n)return t.flags&256?(t.flags&=-257,i=cs(Error(l(422))),vl(e,t,f,i)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(u=i.fallback,a=t.mode,i=zl({mode:"visible",children:i.children},a,0,null),u=Rr(u,a,f,null),u.flags|=2,i.return=t,u.return=t,i.sibling=u,t.child=i,(t.mode&1)!==0&&no(t,e.child,null,f),t.child.memoizedState=hs(f),t.memoizedState=ms,u);if((t.mode&1)===0)return vl(e,t,f,null);if(a.data==="$!"){if(i=a.nextSibling&&a.nextSibling.dataset,i)var v=i.dgst;return i=v,u=Error(l(419)),i=cs(u,i,void 0),vl(e,t,f,i)}if(v=(f&e.childLanes)!==0,$t||v){if(i=ft,i!==null){switch(f&-f){case 4:a=2;break;case 16:a=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:a=32;break;case 536870912:a=268435456;break;default:a=0}a=(a&(i.suspendedLanes|f))!==0?0:a,a!==0&&a!==u.retryLane&&(u.retryLane=a,bn(e,a),un(i,e,a,-1))}return $s(),i=cs(Error(l(421))),vl(e,t,f,i)}return a.data==="$?"?(t.flags|=128,t.child=e.child,t=Vh.bind(null,e),a._reactRetry=t,null):(e=u.treeContext,Ut=Hn(a.nextSibling),It=t,Ke=!0,on=null,e!==null&&(Qt[Kt++]=kn,Qt[Kt++]=Cn,Qt[Kt++]=yr,kn=e.id,Cn=e.overflow,yr=t),t=vs(t,i.children),t.flags|=4096,t)}function Nd(e,t,n){e.lanes|=t;var i=e.alternate;i!==null&&(i.lanes|=t),Ka(e.return,t,n)}function gs(e,t,n,i,a){var u=e.memoizedState;u===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:i,tail:n,tailMode:a}:(u.isBackwards=t,u.rendering=null,u.renderingStartTime=0,u.last=i,u.tail=n,u.tailMode=a)}function Dd(e,t,n){var i=t.pendingProps,a=i.revealOrder,u=i.tail;if(kt(e,t,i.children,n),i=Ye.current,(i&2)!==0)i=i&1|2,t.flags|=128;else{if(e!==null&&(e.flags&128)!==0)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Nd(e,n,t);else if(e.tag===19)Nd(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}i&=1}if(Ve(Ye,i),(t.mode&1)===0)t.memoizedState=null;else switch(a){case"forwards":for(n=t.child,a=null;n!==null;)e=n.alternate,e!==null&&ul(e)===null&&(a=n),n=n.sibling;n=a,n===null?(a=t.child,t.child=null):(a=n.sibling,n.sibling=null),gs(t,!1,a,n,u);break;case"backwards":for(n=null,a=t.child,t.child=null;a!==null;){if(e=a.alternate,e!==null&&ul(e)===null){t.child=a;break}e=a.sibling,a.sibling=n,n=a,a=e}gs(t,!0,n,null,u);break;case"together":gs(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function gl(e,t){(t.mode&1)===0&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function Rn(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),kr|=t.lanes,(n&t.childLanes)===0)return null;if(e!==null&&t.child!==e.child)throw Error(l(153));if(t.child!==null){for(e=t.child,n=er(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=er(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Lh(e,t,n){switch(t.tag){case 3:Ld(t),to();break;case 5:Gc(t);break;case 1:Tt(t.type)&&Zi(t);break;case 4:qa(t,t.stateNode.containerInfo);break;case 10:var i=t.type._context,a=t.memoizedProps.value;Ve(il,i._currentValue),i._currentValue=a;break;case 13:if(i=t.memoizedState,i!==null)return i.dehydrated!==null?(Ve(Ye,Ye.current&1),t.flags|=128,null):(n&t.child.childLanes)!==0?$d(e,t,n):(Ve(Ye,Ye.current&1),e=Rn(e,t,n),e!==null?e.sibling:null);Ve(Ye,Ye.current&1);break;case 19:if(i=(n&t.childLanes)!==0,(e.flags&128)!==0){if(i)return Dd(e,t,n);t.flags|=128}if(a=t.memoizedState,a!==null&&(a.rendering=null,a.tail=null,a.lastEffect=null),Ve(Ye,Ye.current),i)break;return null;case 22:case 23:return t.lanes=0,Rd(e,t,n)}return Rn(e,t,n)}var Md,ys,Od,Ad;Md=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}},ys=function(){},Od=function(e,t,n,i){var a=e.memoizedProps;if(a!==i){e=t.stateNode,Sr(pn.current);var u=null;switch(n){case"input":a=ut(e,a),i=ut(e,i),u=[];break;case"select":a=K({},a,{value:void 0}),i=K({},i,{value:void 0}),u=[];break;case"textarea":a=Zt(e,a),i=Zt(e,i),u=[];break;default:typeof a.onClick!="function"&&typeof i.onClick=="function"&&(e.onclick=qi)}jr(n,i);var f;n=null;for(T in a)if(!i.hasOwnProperty(T)&&a.hasOwnProperty(T)&&a[T]!=null)if(T==="style"){var v=a[T];for(f in v)v.hasOwnProperty(f)&&(n||(n={}),n[f]="")}else T!=="dangerouslySetInnerHTML"&&T!=="children"&&T!=="suppressContentEditableWarning"&&T!=="suppressHydrationWarning"&&T!=="autoFocus"&&(c.hasOwnProperty(T)?u||(u=[]):(u=u||[]).push(T,null));for(T in i){var w=i[T];if(v=a?.[T],i.hasOwnProperty(T)&&w!==v&&(w!=null||v!=null))if(T==="style")if(v){for(f in v)!v.hasOwnProperty(f)||w&&w.hasOwnProperty(f)||(n||(n={}),n[f]="");for(f in w)w.hasOwnProperty(f)&&v[f]!==w[f]&&(n||(n={}),n[f]=w[f])}else n||(u||(u=[]),u.push(T,n)),n=w;else T==="dangerouslySetInnerHTML"?(w=w?w.__html:void 0,v=v?v.__html:void 0,w!=null&&v!==w&&(u=u||[]).push(T,w)):T==="children"?typeof w!="string"&&typeof w!="number"||(u=u||[]).push(T,""+w):T!=="suppressContentEditableWarning"&&T!=="suppressHydrationWarning"&&(c.hasOwnProperty(T)?(w!=null&&T==="onScroll"&&Be("scroll",e),u||v===w||(u=[])):(u=u||[]).push(T,w))}n&&(u=u||[]).push("style",n);var T=u;(t.updateQueue=T)&&(t.flags|=4)}},Ad=function(e,t,n,i){n!==i&&(t.flags|=4)};function ni(e,t){if(!Ke)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var i=null;n!==null;)n.alternate!==null&&(i=n),n=n.sibling;i===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:i.sibling=null}}function xt(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,i=0;if(t)for(var a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags&14680064,i|=a.flags&14680064,a.return=e,a=a.sibling;else for(a=e.child;a!==null;)n|=a.lanes|a.childLanes,i|=a.subtreeFlags,i|=a.flags,a.return=e,a=a.sibling;return e.subtreeFlags|=i,e.childLanes=n,t}function Th(e,t,n){var i=t.pendingProps;switch(Ua(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return xt(t),null;case 1:return Tt(t.type)&&Ji(),xt(t),null;case 3:return i=t.stateNode,io(),We(Lt),We(yt),Za(),i.pendingContext&&(i.context=i.pendingContext,i.pendingContext=null),(e===null||e.child===null)&&(rl(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&(t.flags&256)===0||(t.flags|=1024,on!==null&&(zs(on),on=null))),ys(e,t),xt(t),null;case 5:Xa(t);var a=Sr(Xo.current);if(n=t.type,e!==null&&t.stateNode!=null)Od(e,t,n,i,a),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!i){if(t.stateNode===null)throw Error(l(166));return xt(t),null}if(e=Sr(pn.current),rl(t)){i=t.stateNode,n=t.type;var u=t.memoizedProps;switch(i[fn]=t,i[Qo]=u,e=(t.mode&1)!==0,n){case"dialog":Be("cancel",i),Be("close",i);break;case"iframe":case"object":case"embed":Be("load",i);break;case"video":case"audio":for(a=0;a<Ho.length;a++)Be(Ho[a],i);break;case"source":Be("error",i);break;case"img":case"image":case"link":Be("error",i),Be("load",i);break;case"details":Be("toggle",i);break;case"input":_i(i,u),Be("invalid",i);break;case"select":i._wrapperState={wasMultiple:!!u.multiple},Be("invalid",i);break;case"textarea":$n(i,u),Be("invalid",i)}jr(n,u),a=null;for(var f in u)if(u.hasOwnProperty(f)){var v=u[f];f==="children"?typeof v=="string"?i.textContent!==v&&(u.suppressHydrationWarning!==!0&&Yi(i.textContent,v,e),a=["children",v]):typeof v=="number"&&i.textContent!==""+v&&(u.suppressHydrationWarning!==!0&&Yi(i.textContent,v,e),a=["children",""+v]):c.hasOwnProperty(f)&&v!=null&&f==="onScroll"&&Be("scroll",i)}switch(n){case"input":Ue(i),Pi(i,u,!0);break;case"textarea":Ue(i),Ir(i);break;case"select":case"option":break;default:typeof u.onClick=="function"&&(i.onclick=qi)}i=a,t.updateQueue=i,i!==null&&(t.flags|=4)}else{f=a.nodeType===9?a:a.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=en(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=f.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof i.is=="string"?e=f.createElement(n,{is:i.is}):(e=f.createElement(n),n==="select"&&(f=e,i.multiple?f.multiple=!0:i.size&&(f.size=i.size))):e=f.createElementNS(e,n),e[fn]=t,e[Qo]=i,Md(e,t,!1,!1),t.stateNode=e;e:{switch(f=Nn(n,i),n){case"dialog":Be("cancel",e),Be("close",e),a=i;break;case"iframe":case"object":case"embed":Be("load",e),a=i;break;case"video":case"audio":for(a=0;a<Ho.length;a++)Be(Ho[a],e);a=i;break;case"source":Be("error",e),a=i;break;case"img":case"image":case"link":Be("error",e),Be("load",e),a=i;break;case"details":Be("toggle",e),a=i;break;case"input":_i(e,i),a=ut(e,i),Be("invalid",e);break;case"option":a=i;break;case"select":e._wrapperState={wasMultiple:!!i.multiple},a=K({},i,{value:void 0}),Be("invalid",e);break;case"textarea":$n(e,i),a=Zt(e,i),Be("invalid",e);break;default:a=i}jr(n,a),v=a;for(u in v)if(v.hasOwnProperty(u)){var w=v[u];u==="style"?bo(e,w):u==="dangerouslySetInnerHTML"?(w=w?w.__html:void 0,w!=null&&Ur(e,w)):u==="children"?typeof w=="string"?(n!=="textarea"||w!=="")&&cr(e,w):typeof w=="number"&&cr(e,""+w):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(c.hasOwnProperty(u)?w!=null&&u==="onScroll"&&Be("scroll",e):w!=null&&A(e,u,w,f))}switch(n){case"input":Ue(e),Pi(e,i,!1);break;case"textarea":Ue(e),Ir(e);break;case"option":i.value!=null&&e.setAttribute("value",""+M(i.value));break;case"select":e.multiple=!!i.multiple,u=i.value,u!=null?Tn(e,!!i.multiple,u,!1):i.defaultValue!=null&&Tn(e,!!i.multiple,i.defaultValue,!0);break;default:typeof a.onClick=="function"&&(e.onclick=qi)}switch(n){case"button":case"input":case"select":case"textarea":i=!!i.autoFocus;break e;case"img":i=!0;break e;default:i=!1}}i&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return xt(t),null;case 6:if(e&&t.stateNode!=null)Ad(e,t,e.memoizedProps,i);else{if(typeof i!="string"&&t.stateNode===null)throw Error(l(166));if(n=Sr(Xo.current),Sr(pn.current),rl(t)){if(i=t.stateNode,n=t.memoizedProps,i[fn]=t,(u=i.nodeValue!==n)&&(e=It,e!==null))switch(e.tag){case 3:Yi(i.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Yi(i.nodeValue,n,(e.mode&1)!==0)}u&&(t.flags|=4)}else i=(n.nodeType===9?n:n.ownerDocument).createTextNode(i),i[fn]=t,t.stateNode=i}return xt(t),null;case 13:if(We(Ye),i=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(Ke&&Ut!==null&&(t.mode&1)!==0&&(t.flags&128)===0)Uc(),to(),t.flags|=98560,u=!1;else if(u=rl(t),i!==null&&i.dehydrated!==null){if(e===null){if(!u)throw Error(l(318));if(u=t.memoizedState,u=u!==null?u.dehydrated:null,!u)throw Error(l(317));u[fn]=t}else to(),(t.flags&128)===0&&(t.memoizedState=null),t.flags|=4;xt(t),u=!1}else on!==null&&(zs(on),on=null),u=!0;if(!u)return t.flags&65536?t:null}return(t.flags&128)!==0?(t.lanes=n,t):(i=i!==null,i!==(e!==null&&e.memoizedState!==null)&&i&&(t.child.flags|=8192,(t.mode&1)!==0&&(e===null||(Ye.current&1)!==0?at===0&&(at=3):$s())),t.updateQueue!==null&&(t.flags|=4),xt(t),null);case 4:return io(),ys(e,t),e===null&&Bo(t.stateNode.containerInfo),xt(t),null;case 10:return Qa(t.type._context),xt(t),null;case 17:return Tt(t.type)&&Ji(),xt(t),null;case 19:if(We(Ye),u=t.memoizedState,u===null)return xt(t),null;if(i=(t.flags&128)!==0,f=u.rendering,f===null)if(i)ni(u,!1);else{if(at!==0||e!==null&&(e.flags&128)!==0)for(e=t.child;e!==null;){if(f=ul(e),f!==null){for(t.flags|=128,ni(u,!1),i=f.updateQueue,i!==null&&(t.updateQueue=i,t.flags|=4),t.subtreeFlags=0,i=n,n=t.child;n!==null;)u=n,e=i,u.flags&=14680066,f=u.alternate,f===null?(u.childLanes=0,u.lanes=e,u.child=null,u.subtreeFlags=0,u.memoizedProps=null,u.memoizedState=null,u.updateQueue=null,u.dependencies=null,u.stateNode=null):(u.childLanes=f.childLanes,u.lanes=f.lanes,u.child=f.child,u.subtreeFlags=0,u.deletions=null,u.memoizedProps=f.memoizedProps,u.memoizedState=f.memoizedState,u.updateQueue=f.updateQueue,u.type=f.type,e=f.dependencies,u.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return Ve(Ye,Ye.current&1|2),t.child}e=e.sibling}u.tail!==null&&je()>uo&&(t.flags|=128,i=!0,ni(u,!1),t.lanes=4194304)}else{if(!i)if(e=ul(f),e!==null){if(t.flags|=128,i=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),ni(u,!0),u.tail===null&&u.tailMode==="hidden"&&!f.alternate&&!Ke)return xt(t),null}else 2*je()-u.renderingStartTime>uo&&n!==1073741824&&(t.flags|=128,i=!0,ni(u,!1),t.lanes=4194304);u.isBackwards?(f.sibling=t.child,t.child=f):(n=u.last,n!==null?n.sibling=f:t.child=f,u.last=f)}return u.tail!==null?(t=u.tail,u.rendering=t,u.tail=t.sibling,u.renderingStartTime=je(),t.sibling=null,n=Ye.current,Ve(Ye,i?n&1|2:n&1),t):(xt(t),null);case 22:case 23:return Ts(),i=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==i&&(t.flags|=8192),i&&(t.mode&1)!==0?(jt&1073741824)!==0&&(xt(t),t.subtreeFlags&6&&(t.flags|=8192)):xt(t),null;case 24:return null;case 25:return null}throw Error(l(156,t.tag))}function $h(e,t){switch(Ua(t),t.tag){case 1:return Tt(t.type)&&Ji(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return io(),We(Lt),We(yt),Za(),e=t.flags,(e&65536)!==0&&(e&128)===0?(t.flags=e&-65537|128,t):null;case 5:return Xa(t),null;case 13:if(We(Ye),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(l(340));to()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return We(Ye),null;case 4:return io(),null;case 10:return Qa(t.type._context),null;case 22:case 23:return Ts(),null;case 24:return null;default:return null}}var yl=!1,St=!1,Nh=typeof WeakSet=="function"?WeakSet:Set,ee=null;function ao(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(i){Ze(e,t,i)}else n.current=null}function ws(e,t,n){try{n()}catch(i){Ze(e,t,i)}}var Fd=!1;function Dh(e,t){if(Ta=Fi,e=vc(),ka(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var i=n.getSelection&&n.getSelection();if(i&&i.rangeCount!==0){n=i.anchorNode;var a=i.anchorOffset,u=i.focusNode;i=i.focusOffset;try{n.nodeType,u.nodeType}catch{n=null;break e}var f=0,v=-1,w=-1,T=0,j=0,H=e,U=null;t:for(;;){for(var q;H!==n||a!==0&&H.nodeType!==3||(v=f+a),H!==u||i!==0&&H.nodeType!==3||(w=f+i),H.nodeType===3&&(f+=H.nodeValue.length),(q=H.firstChild)!==null;)U=H,H=q;for(;;){if(H===e)break t;if(U===n&&++T===a&&(v=f),U===u&&++j===i&&(w=f),(q=H.nextSibling)!==null)break;H=U,U=H.parentNode}H=q}n=v===-1||w===-1?null:{start:v,end:w}}else n=null}n=n||{start:0,end:0}}else n=null;for($a={focusedElem:e,selectionRange:n},Fi=!1,ee=t;ee!==null;)if(t=ee,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,ee=e;else for(;ee!==null;){t=ee;try{var ne=t.alternate;if((t.flags&1024)!==0)switch(t.tag){case 0:case 11:case 15:break;case 1:if(ne!==null){var oe=ne.memoizedProps,tt=ne.memoizedState,_=t.stateNode,k=_.getSnapshotBeforeUpdate(t.elementType===t.type?oe:ln(t.type,oe),tt);_.__reactInternalSnapshotBeforeUpdate=k}break;case 3:var P=t.stateNode.containerInfo;P.nodeType===1?P.textContent="":P.nodeType===9&&P.documentElement&&P.removeChild(P.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(l(163))}}catch(Q){Ze(t,t.return,Q)}if(e=t.sibling,e!==null){e.return=t.return,ee=e;break}ee=t.return}return ne=Fd,Fd=!1,ne}function ri(e,t,n){var i=t.updateQueue;if(i=i!==null?i.lastEffect:null,i!==null){var a=i=i.next;do{if((a.tag&e)===e){var u=a.destroy;a.destroy=void 0,u!==void 0&&ws(t,n,u)}a=a.next}while(a!==i)}}function wl(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var i=n.create;n.destroy=i()}n=n.next}while(n!==t)}}function xs(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function Id(e){var t=e.alternate;t!==null&&(e.alternate=null,Id(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[fn],delete t[Qo],delete t[Oa],delete t[vh],delete t[gh])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Ud(e){return e.tag===5||e.tag===3||e.tag===4}function jd(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Ud(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ss(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=qi));else if(i!==4&&(e=e.child,e!==null))for(Ss(e,t,n),e=e.sibling;e!==null;)Ss(e,t,n),e=e.sibling}function Es(e,t,n){var i=e.tag;if(i===5||i===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(i!==4&&(e=e.child,e!==null))for(Es(e,t,n),e=e.sibling;e!==null;)Es(e,t,n),e=e.sibling}var vt=null,an=!1;function Yn(e,t,n){for(n=n.child;n!==null;)Vd(e,t,n),n=n.sibling}function Vd(e,t,n){if(zt&&typeof zt.onCommitFiberUnmount=="function")try{zt.onCommitFiberUnmount(xn,n)}catch{}switch(n.tag){case 5:St||ao(n,t);case 6:var i=vt,a=an;vt=null,Yn(e,t,n),vt=i,an=a,vt!==null&&(an?(e=vt,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):vt.removeChild(n.stateNode));break;case 18:vt!==null&&(an?(e=vt,n=n.stateNode,e.nodeType===8?Ma(e.parentNode,n):e.nodeType===1&&Ma(e,n),Mo(e)):Ma(vt,n.stateNode));break;case 4:i=vt,a=an,vt=n.stateNode.containerInfo,an=!0,Yn(e,t,n),vt=i,an=a;break;case 0:case 11:case 14:case 15:if(!St&&(i=n.updateQueue,i!==null&&(i=i.lastEffect,i!==null))){a=i=i.next;do{var u=a,f=u.destroy;u=u.tag,f!==void 0&&((u&2)!==0||(u&4)!==0)&&ws(n,t,f),a=a.next}while(a!==i)}Yn(e,t,n);break;case 1:if(!St&&(ao(n,t),i=n.stateNode,typeof i.componentWillUnmount=="function"))try{i.props=n.memoizedProps,i.state=n.memoizedState,i.componentWillUnmount()}catch(v){Ze(n,t,v)}Yn(e,t,n);break;case 21:Yn(e,t,n);break;case 22:n.mode&1?(St=(i=St)||n.memoizedState!==null,Yn(e,t,n),St=i):Yn(e,t,n);break;default:Yn(e,t,n)}}function Hd(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new Nh),t.forEach(function(i){var a=Hh.bind(null,e,i);n.has(i)||(n.add(i),i.then(a,a))})}}function sn(e,t){var n=t.deletions;if(n!==null)for(var i=0;i<n.length;i++){var a=n[i];try{var u=e,f=t,v=f;e:for(;v!==null;){switch(v.tag){case 5:vt=v.stateNode,an=!1;break e;case 3:vt=v.stateNode.containerInfo,an=!0;break e;case 4:vt=v.stateNode.containerInfo,an=!0;break e}v=v.return}if(vt===null)throw Error(l(160));Vd(u,f,a),vt=null,an=!1;var w=a.alternate;w!==null&&(w.return=null),a.return=null}catch(T){Ze(a,t,T)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Bd(t,e),t=t.sibling}function Bd(e,t){var n=e.alternate,i=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(sn(t,e),hn(e),i&4){try{ri(3,e,e.return),wl(3,e)}catch(oe){Ze(e,e.return,oe)}try{ri(5,e,e.return)}catch(oe){Ze(e,e.return,oe)}}break;case 1:sn(t,e),hn(e),i&512&&n!==null&&ao(n,n.return);break;case 5:if(sn(t,e),hn(e),i&512&&n!==null&&ao(n,n.return),e.flags&32){var a=e.stateNode;try{cr(a,"")}catch(oe){Ze(e,e.return,oe)}}if(i&4&&(a=e.stateNode,a!=null)){var u=e.memoizedProps,f=n!==null?n.memoizedProps:u,v=e.type,w=e.updateQueue;if(e.updateQueue=null,w!==null)try{v==="input"&&u.type==="radio"&&u.name!=null&&Ri(a,u),Nn(v,f);var T=Nn(v,u);for(f=0;f<w.length;f+=2){var j=w[f],H=w[f+1];j==="style"?bo(a,H):j==="dangerouslySetInnerHTML"?Ur(a,H):j==="children"?cr(a,H):A(a,j,H,T)}switch(v){case"input":Fr(a,u);break;case"textarea":ko(a,u);break;case"select":var U=a._wrapperState.wasMultiple;a._wrapperState.wasMultiple=!!u.multiple;var q=u.value;q!=null?Tn(a,!!u.multiple,q,!1):U!==!!u.multiple&&(u.defaultValue!=null?Tn(a,!!u.multiple,u.defaultValue,!0):Tn(a,!!u.multiple,u.multiple?[]:"",!1))}a[Qo]=u}catch(oe){Ze(e,e.return,oe)}}break;case 6:if(sn(t,e),hn(e),i&4){if(e.stateNode===null)throw Error(l(162));a=e.stateNode,u=e.memoizedProps;try{a.nodeValue=u}catch(oe){Ze(e,e.return,oe)}}break;case 3:if(sn(t,e),hn(e),i&4&&n!==null&&n.memoizedState.isDehydrated)try{Mo(t.containerInfo)}catch(oe){Ze(e,e.return,oe)}break;case 4:sn(t,e),hn(e);break;case 13:sn(t,e),hn(e),a=e.child,a.flags&8192&&(u=a.memoizedState!==null,a.stateNode.isHidden=u,!u||a.alternate!==null&&a.alternate.memoizedState!==null||(bs=je())),i&4&&Hd(e);break;case 22:if(j=n!==null&&n.memoizedState!==null,e.mode&1?(St=(T=St)||j,sn(t,e),St=T):sn(t,e),hn(e),i&8192){if(T=e.memoizedState!==null,(e.stateNode.isHidden=T)&&!j&&(e.mode&1)!==0)for(ee=e,j=e.child;j!==null;){for(H=ee=j;ee!==null;){switch(U=ee,q=U.child,U.tag){case 0:case 11:case 14:case 15:ri(4,U,U.return);break;case 1:ao(U,U.return);var ne=U.stateNode;if(typeof ne.componentWillUnmount=="function"){i=U,n=U.return;try{t=i,ne.props=t.memoizedProps,ne.state=t.memoizedState,ne.componentWillUnmount()}catch(oe){Ze(i,n,oe)}}break;case 5:ao(U,U.return);break;case 22:if(U.memoizedState!==null){Kd(H);continue}}q!==null?(q.return=U,ee=q):Kd(H)}j=j.sibling}e:for(j=null,H=e;;){if(H.tag===5){if(j===null){j=H;try{a=H.stateNode,T?(u=a.style,typeof u.setProperty=="function"?u.setProperty("display","none","important"):u.display="none"):(v=H.stateNode,w=H.memoizedProps.style,f=w!=null&&w.hasOwnProperty("display")?w.display:null,v.style.display=Co("display",f))}catch(oe){Ze(e,e.return,oe)}}}else if(H.tag===6){if(j===null)try{H.stateNode.nodeValue=T?"":H.memoizedProps}catch(oe){Ze(e,e.return,oe)}}else if((H.tag!==22&&H.tag!==23||H.memoizedState===null||H===e)&&H.child!==null){H.child.return=H,H=H.child;continue}if(H===e)break e;for(;H.sibling===null;){if(H.return===null||H.return===e)break e;j===H&&(j=null),H=H.return}j===H&&(j=null),H.sibling.return=H.return,H=H.sibling}}break;case 19:sn(t,e),hn(e),i&4&&Hd(e);break;case 21:break;default:sn(t,e),hn(e)}}function hn(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(Ud(n)){var i=n;break e}n=n.return}throw Error(l(160))}switch(i.tag){case 5:var a=i.stateNode;i.flags&32&&(cr(a,""),i.flags&=-33);var u=jd(e);Es(e,u,a);break;case 3:case 4:var f=i.stateNode.containerInfo,v=jd(e);Ss(e,v,f);break;default:throw Error(l(161))}}catch(w){Ze(e,e.return,w)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mh(e,t,n){ee=e,Wd(e)}function Wd(e,t,n){for(var i=(e.mode&1)!==0;ee!==null;){var a=ee,u=a.child;if(a.tag===22&&i){var f=a.memoizedState!==null||yl;if(!f){var v=a.alternate,w=v!==null&&v.memoizedState!==null||St;v=yl;var T=St;if(yl=f,(St=w)&&!T)for(ee=a;ee!==null;)f=ee,w=f.child,f.tag===22&&f.memoizedState!==null?Gd(a):w!==null?(w.return=f,ee=w):Gd(a);for(;u!==null;)ee=u,Wd(u),u=u.sibling;ee=a,yl=v,St=T}Qd(e)}else(a.subtreeFlags&8772)!==0&&u!==null?(u.return=a,ee=u):Qd(e)}}function Qd(e){for(;ee!==null;){var t=ee;if((t.flags&8772)!==0){var n=t.alternate;try{if((t.flags&8772)!==0)switch(t.tag){case 0:case 11:case 15:St||wl(5,t);break;case 1:var i=t.stateNode;if(t.flags&4&&!St)if(n===null)i.componentDidMount();else{var a=t.elementType===t.type?n.memoizedProps:ln(t.type,n.memoizedProps);i.componentDidUpdate(a,n.memoizedState,i.__reactInternalSnapshotBeforeUpdate)}var u=t.updateQueue;u!==null&&Kc(t,u,i);break;case 3:var f=t.updateQueue;if(f!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Kc(t,f,n)}break;case 5:var v=t.stateNode;if(n===null&&t.flags&4){n=v;var w=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":w.autoFocus&&n.focus();break;case"img":w.src&&(n.src=w.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var T=t.alternate;if(T!==null){var j=T.memoizedState;if(j!==null){var H=j.dehydrated;H!==null&&Mo(H)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(l(163))}St||t.flags&512&&xs(t)}catch(U){Ze(t,t.return,U)}}if(t===e){ee=null;break}if(n=t.sibling,n!==null){n.return=t.return,ee=n;break}ee=t.return}}function Kd(e){for(;ee!==null;){var t=ee;if(t===e){ee=null;break}var n=t.sibling;if(n!==null){n.return=t.return,ee=n;break}ee=t.return}}function Gd(e){for(;ee!==null;){var t=ee;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{wl(4,t)}catch(w){Ze(t,n,w)}break;case 1:var i=t.stateNode;if(typeof i.componentDidMount=="function"){var a=t.return;try{i.componentDidMount()}catch(w){Ze(t,a,w)}}var u=t.return;try{xs(t)}catch(w){Ze(t,u,w)}break;case 5:var f=t.return;try{xs(t)}catch(w){Ze(t,f,w)}}}catch(w){Ze(t,t.return,w)}if(t===e){ee=null;break}var v=t.sibling;if(v!==null){v.return=t.return,ee=v;break}ee=t.return}}var Oh=Math.ceil,xl=Y.ReactCurrentDispatcher,ks=Y.ReactCurrentOwner,qt=Y.ReactCurrentBatchConfig,De=0,ft=null,rt=null,gt=0,jt=0,so=Bn(0),at=0,oi=null,kr=0,Sl=0,Cs=0,ii=null,Nt=null,bs=0,uo=1/0,Pn=null,El=!1,_s=null,qn=null,kl=!1,Xn=null,Cl=0,li=0,Rs=null,bl=-1,_l=0;function Ct(){return(De&6)!==0?je():bl!==-1?bl:bl=je()}function Jn(e){return(e.mode&1)===0?1:(De&2)!==0&&gt!==0?gt&-gt:wh.transition!==null?(_l===0&&(_l=ju()),_l):(e=Ie,e!==0||(e=window.event,e=e===void 0?16:qu(e.type)),e)}function un(e,t,n,i){if(50<li)throw li=0,Rs=null,Error(l(185));Lo(e,n,i),((De&2)===0||e!==ft)&&(e===ft&&((De&2)===0&&(Sl|=n),at===4&&Zn(e,gt)),Dt(e,i),n===1&&De===0&&(t.mode&1)===0&&(uo=je()+500,el&&Qn()))}function Dt(e,t){var n=e.callbackNode;wm(e,t);var i=Mi(e,e===ft?gt:0);if(i===0)n!==null&&On(n),e.callbackNode=null,e.callbackPriority=0;else if(t=i&-i,e.callbackPriority!==t){if(n!=null&&On(n),t===1)e.tag===0?yh(qd.bind(null,e)):Mc(qd.bind(null,e)),mh(function(){(De&6)===0&&Qn()}),n=null;else{switch(Vu(i)){case 1:n=tn;break;case 4:n=hr;break;case 16:n=Ne;break;case 536870912:n=nn;break;default:n=Ne}n=of(n,Yd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function Yd(e,t){if(bl=-1,_l=0,(De&6)!==0)throw Error(l(327));var n=e.callbackNode;if(co()&&e.callbackNode!==n)return null;var i=Mi(e,e===ft?gt:0);if(i===0)return null;if((i&30)!==0||(i&e.expiredLanes)!==0||t)t=Rl(e,i);else{t=i;var a=De;De|=2;var u=Jd();(ft!==e||gt!==t)&&(Pn=null,uo=je()+500,br(e,t));do try{Ih();break}catch(v){Xd(e,v)}while(!0);Wa(),xl.current=u,De=a,rt!==null?t=0:(ft=null,gt=0,t=at)}if(t!==0){if(t===2&&(a=aa(e),a!==0&&(i=a,t=Ps(e,a))),t===1)throw n=oi,br(e,0),Zn(e,i),Dt(e,je()),n;if(t===6)Zn(e,i);else{if(a=e.current.alternate,(i&30)===0&&!Ah(a)&&(t=Rl(e,i),t===2&&(u=aa(e),u!==0&&(i=u,t=Ps(e,u))),t===1))throw n=oi,br(e,0),Zn(e,i),Dt(e,je()),n;switch(e.finishedWork=a,e.finishedLanes=i,t){case 0:case 1:throw Error(l(345));case 2:_r(e,Nt,Pn);break;case 3:if(Zn(e,i),(i&130023424)===i&&(t=bs+500-je(),10<t)){if(Mi(e,0)!==0)break;if(a=e.suspendedLanes,(a&i)!==i){Ct(),e.pingedLanes|=e.suspendedLanes&a;break}e.timeoutHandle=Da(_r.bind(null,e,Nt,Pn),t);break}_r(e,Nt,Pn);break;case 4:if(Zn(e,i),(i&4194240)===i)break;for(t=e.eventTimes,a=-1;0<i;){var f=31-ct(i);u=1<<f,f=t[f],f>a&&(a=f),i&=~u}if(i=a,i=je()-i,i=(120>i?120:480>i?480:1080>i?1080:1920>i?1920:3e3>i?3e3:4320>i?4320:1960*Oh(i/1960))-i,10<i){e.timeoutHandle=Da(_r.bind(null,e,Nt,Pn),i);break}_r(e,Nt,Pn);break;case 5:_r(e,Nt,Pn);break;default:throw Error(l(329))}}}return Dt(e,je()),e.callbackNode===n?Yd.bind(null,e):null}function Ps(e,t){var n=ii;return e.current.memoizedState.isDehydrated&&(br(e,t).flags|=256),e=Rl(e,t),e!==2&&(t=Nt,Nt=n,t!==null&&zs(t)),e}function zs(e){Nt===null?Nt=e:Nt.push.apply(Nt,e)}function Ah(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var i=0;i<n.length;i++){var a=n[i],u=a.getSnapshot;a=a.value;try{if(!rn(u(),a))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Zn(e,t){for(t&=~Cs,t&=~Sl,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-ct(t),i=1<<n;e[n]=-1,t&=~i}}function qd(e){if((De&6)!==0)throw Error(l(327));co();var t=Mi(e,0);if((t&1)===0)return Dt(e,je()),null;var n=Rl(e,t);if(e.tag!==0&&n===2){var i=aa(e);i!==0&&(t=i,n=Ps(e,i))}if(n===1)throw n=oi,br(e,0),Zn(e,t),Dt(e,je()),n;if(n===6)throw Error(l(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,_r(e,Nt,Pn),Dt(e,je()),null}function Ls(e,t){var n=De;De|=1;try{return e(t)}finally{De=n,De===0&&(uo=je()+500,el&&Qn())}}function Cr(e){Xn!==null&&Xn.tag===0&&(De&6)===0&&co();var t=De;De|=1;var n=qt.transition,i=Ie;try{if(qt.transition=null,Ie=1,e)return e()}finally{Ie=i,qt.transition=n,De=t,(De&6)===0&&Qn()}}function Ts(){jt=so.current,We(so)}function br(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,ph(n)),rt!==null)for(n=rt.return;n!==null;){var i=n;switch(Ua(i),i.tag){case 1:i=i.type.childContextTypes,i!=null&&Ji();break;case 3:io(),We(Lt),We(yt),Za();break;case 5:Xa(i);break;case 4:io();break;case 13:We(Ye);break;case 19:We(Ye);break;case 10:Qa(i.type._context);break;case 22:case 23:Ts()}n=n.return}if(ft=e,rt=e=er(e.current,null),gt=jt=t,at=0,oi=null,Cs=Sl=kr=0,Nt=ii=null,xr!==null){for(t=0;t<xr.length;t++)if(n=xr[t],i=n.interleaved,i!==null){n.interleaved=null;var a=i.next,u=n.pending;if(u!==null){var f=u.next;u.next=a,i.next=f}n.pending=i}xr=null}return e}function Xd(e,t){do{var n=rt;try{if(Wa(),cl.current=ml,dl){for(var i=qe.memoizedState;i!==null;){var a=i.queue;a!==null&&(a.pending=null),i=i.next}dl=!1}if(Er=0,dt=lt=qe=null,Jo=!1,Zo=0,ks.current=null,n===null||n.return===null){at=1,oi=t,rt=null;break}e:{var u=e,f=n.return,v=n,w=t;if(t=gt,v.flags|=32768,w!==null&&typeof w=="object"&&typeof w.then=="function"){var T=w,j=v,H=j.tag;if((j.mode&1)===0&&(H===0||H===11||H===15)){var U=j.alternate;U?(j.updateQueue=U.updateQueue,j.memoizedState=U.memoizedState,j.lanes=U.lanes):(j.updateQueue=null,j.memoizedState=null)}var q=Ed(f);if(q!==null){q.flags&=-257,kd(q,f,v,u,t),q.mode&1&&Sd(u,T,t),t=q,w=T;var ne=t.updateQueue;if(ne===null){var oe=new Set;oe.add(w),t.updateQueue=oe}else ne.add(w);break e}else{if((t&1)===0){Sd(u,T,t),$s();break e}w=Error(l(426))}}else if(Ke&&v.mode&1){var tt=Ed(f);if(tt!==null){(tt.flags&65536)===0&&(tt.flags|=256),kd(tt,f,v,u,t),Ha(lo(w,v));break e}}u=w=lo(w,v),at!==4&&(at=2),ii===null?ii=[u]:ii.push(u),u=f;do{switch(u.tag){case 3:u.flags|=65536,t&=-t,u.lanes|=t;var _=wd(u,w,t);Qc(u,_);break e;case 1:v=w;var k=u.type,P=u.stateNode;if((u.flags&128)===0&&(typeof k.getDerivedStateFromError=="function"||P!==null&&typeof P.componentDidCatch=="function"&&(qn===null||!qn.has(P)))){u.flags|=65536,t&=-t,u.lanes|=t;var Q=xd(u,v,t);Qc(u,Q);break e}}u=u.return}while(u!==null)}ef(n)}catch(ie){t=ie,rt===n&&n!==null&&(rt=n=n.return);continue}break}while(!0)}function Jd(){var e=xl.current;return xl.current=ml,e===null?ml:e}function $s(){(at===0||at===3||at===2)&&(at=4),ft===null||(kr&268435455)===0&&(Sl&268435455)===0||Zn(ft,gt)}function Rl(e,t){var n=De;De|=2;var i=Jd();(ft!==e||gt!==t)&&(Pn=null,br(e,t));do try{Fh();break}catch(a){Xd(e,a)}while(!0);if(Wa(),De=n,xl.current=i,rt!==null)throw Error(l(261));return ft=null,gt=0,at}function Fh(){for(;rt!==null;)Zd(rt)}function Ih(){for(;rt!==null&&!Rt();)Zd(rt)}function Zd(e){var t=rf(e.alternate,e,jt);e.memoizedProps=e.pendingProps,t===null?ef(e):rt=t,ks.current=null}function ef(e){var t=e;do{var n=t.alternate;if(e=t.return,(t.flags&32768)===0){if(n=Th(n,t,jt),n!==null){rt=n;return}}else{if(n=$h(n,t),n!==null){n.flags&=32767,rt=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{at=6,rt=null;return}}if(t=t.sibling,t!==null){rt=t;return}rt=t=e}while(t!==null);at===0&&(at=5)}function _r(e,t,n){var i=Ie,a=qt.transition;try{qt.transition=null,Ie=1,Uh(e,t,n,i)}finally{qt.transition=a,Ie=i}return null}function Uh(e,t,n,i){do co();while(Xn!==null);if((De&6)!==0)throw Error(l(327));n=e.finishedWork;var a=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(l(177));e.callbackNode=null,e.callbackPriority=0;var u=n.lanes|n.childLanes;if(xm(e,u),e===ft&&(rt=ft=null,gt=0),(n.subtreeFlags&2064)===0&&(n.flags&2064)===0||kl||(kl=!0,of(Ne,function(){return co(),null})),u=(n.flags&15990)!==0,(n.subtreeFlags&15990)!==0||u){u=qt.transition,qt.transition=null;var f=Ie;Ie=1;var v=De;De|=4,ks.current=null,Dh(e,n),Bd(n,e),lh($a),Fi=!!Ta,$a=Ta=null,e.current=n,Mh(n),mr(),De=v,Ie=f,qt.transition=u}else e.current=n;if(kl&&(kl=!1,Xn=e,Cl=a),u=e.pendingLanes,u===0&&(qn=null),Je(n.stateNode),Dt(e,je()),t!==null)for(i=e.onRecoverableError,n=0;n<t.length;n++)a=t[n],i(a.value,{componentStack:a.stack,digest:a.digest});if(El)throw El=!1,e=_s,_s=null,e;return(Cl&1)!==0&&e.tag!==0&&co(),u=e.pendingLanes,(u&1)!==0?e===Rs?li++:(li=0,Rs=e):li=0,Qn(),null}function co(){if(Xn!==null){var e=Vu(Cl),t=qt.transition,n=Ie;try{if(qt.transition=null,Ie=16>e?16:e,Xn===null)var i=!1;else{if(e=Xn,Xn=null,Cl=0,(De&6)!==0)throw Error(l(331));var a=De;for(De|=4,ee=e.current;ee!==null;){var u=ee,f=u.child;if((ee.flags&16)!==0){var v=u.deletions;if(v!==null){for(var w=0;w<v.length;w++){var T=v[w];for(ee=T;ee!==null;){var j=ee;switch(j.tag){case 0:case 11:case 15:ri(8,j,u)}var H=j.child;if(H!==null)H.return=j,ee=H;else for(;ee!==null;){j=ee;var U=j.sibling,q=j.return;if(Id(j),j===T){ee=null;break}if(U!==null){U.return=q,ee=U;break}ee=q}}}var ne=u.alternate;if(ne!==null){var oe=ne.child;if(oe!==null){ne.child=null;do{var tt=oe.sibling;oe.sibling=null,oe=tt}while(oe!==null)}}ee=u}}if((u.subtreeFlags&2064)!==0&&f!==null)f.return=u,ee=f;else e:for(;ee!==null;){if(u=ee,(u.flags&2048)!==0)switch(u.tag){case 0:case 11:case 15:ri(9,u,u.return)}var _=u.sibling;if(_!==null){_.return=u.return,ee=_;break e}ee=u.return}}var k=e.current;for(ee=k;ee!==null;){f=ee;var P=f.child;if((f.subtreeFlags&2064)!==0&&P!==null)P.return=f,ee=P;else e:for(f=k;ee!==null;){if(v=ee,(v.flags&2048)!==0)try{switch(v.tag){case 0:case 11:case 15:wl(9,v)}}catch(ie){Ze(v,v.return,ie)}if(v===f){ee=null;break e}var Q=v.sibling;if(Q!==null){Q.return=v.return,ee=Q;break e}ee=v.return}}if(De=a,Qn(),zt&&typeof zt.onPostCommitFiberRoot=="function")try{zt.onPostCommitFiberRoot(xn,e)}catch{}i=!0}return i}finally{Ie=n,qt.transition=t}}return!1}function tf(e,t,n){t=lo(n,t),t=wd(e,t,1),e=Gn(e,t,1),t=Ct(),e!==null&&(Lo(e,1,t),Dt(e,t))}function Ze(e,t,n){if(e.tag===3)tf(e,e,n);else for(;t!==null;){if(t.tag===3){tf(t,e,n);break}else if(t.tag===1){var i=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof i.componentDidCatch=="function"&&(qn===null||!qn.has(i))){e=lo(n,e),e=xd(t,e,1),t=Gn(t,e,1),e=Ct(),t!==null&&(Lo(t,1,e),Dt(t,e));break}}t=t.return}}function jh(e,t,n){var i=e.pingCache;i!==null&&i.delete(t),t=Ct(),e.pingedLanes|=e.suspendedLanes&n,ft===e&&(gt&n)===n&&(at===4||at===3&&(gt&130023424)===gt&&500>je()-bs?br(e,0):Cs|=n),Dt(e,t)}function nf(e,t){t===0&&((e.mode&1)===0?t=1:(t=Di,Di<<=1,(Di&130023424)===0&&(Di=4194304)));var n=Ct();e=bn(e,t),e!==null&&(Lo(e,t,n),Dt(e,n))}function Vh(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),nf(e,n)}function Hh(e,t){var n=0;switch(e.tag){case 13:var i=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:i=e.stateNode;break;default:throw Error(l(314))}i!==null&&i.delete(t),nf(e,n)}var rf;rf=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||Lt.current)$t=!0;else{if((e.lanes&n)===0&&(t.flags&128)===0)return $t=!1,Lh(e,t,n);$t=(e.flags&131072)!==0}else $t=!1,Ke&&(t.flags&1048576)!==0&&Oc(t,nl,t.index);switch(t.lanes=0,t.tag){case 2:var i=t.type;gl(e,t),e=t.pendingProps;var a=Jr(t,yt.current);oo(t,n),a=ns(null,t,i,e,a,n);var u=rs();return t.flags|=1,typeof a=="object"&&a!==null&&typeof a.render=="function"&&a.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Tt(i)?(u=!0,Zi(t)):u=!1,t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,Ya(t),a.updater=hl,t.stateNode=a,a._reactInternals=t,us(t,i,e,n),t=ps(null,t,i,!0,u,n)):(t.tag=0,Ke&&u&&Ia(t),kt(null,t,a,n),t=t.child),t;case 16:i=t.elementType;e:{switch(gl(e,t),e=t.pendingProps,a=i._init,i=a(i._payload),t.type=i,a=t.tag=Wh(i),e=ln(i,e),a){case 0:t=fs(null,t,i,e,n);break e;case 1:t=zd(null,t,i,e,n);break e;case 11:t=Cd(null,t,i,e,n);break e;case 14:t=bd(null,t,i,ln(i.type,e),n);break e}throw Error(l(306,i,""))}return t;case 0:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:ln(i,a),fs(e,t,i,a,n);case 1:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:ln(i,a),zd(e,t,i,a,n);case 3:e:{if(Ld(t),e===null)throw Error(l(387));i=t.pendingProps,u=t.memoizedState,a=u.element,Wc(e,t),sl(t,i,null,n);var f=t.memoizedState;if(i=f.element,u.isDehydrated)if(u={element:i,isDehydrated:!1,cache:f.cache,pendingSuspenseBoundaries:f.pendingSuspenseBoundaries,transitions:f.transitions},t.updateQueue.baseState=u,t.memoizedState=u,t.flags&256){a=lo(Error(l(423)),t),t=Td(e,t,i,n,a);break e}else if(i!==a){a=lo(Error(l(424)),t),t=Td(e,t,i,n,a);break e}else for(Ut=Hn(t.stateNode.containerInfo.firstChild),It=t,Ke=!0,on=null,n=Hc(t,null,i,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(to(),i===a){t=Rn(e,t,n);break e}kt(e,t,i,n)}t=t.child}return t;case 5:return Gc(t),e===null&&Va(t),i=t.type,a=t.pendingProps,u=e!==null?e.memoizedProps:null,f=a.children,Na(i,a)?f=null:u!==null&&Na(i,u)&&(t.flags|=32),Pd(e,t),kt(e,t,f,n),t.child;case 6:return e===null&&Va(t),null;case 13:return $d(e,t,n);case 4:return qa(t,t.stateNode.containerInfo),i=t.pendingProps,e===null?t.child=no(t,null,i,n):kt(e,t,i,n),t.child;case 11:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:ln(i,a),Cd(e,t,i,a,n);case 7:return kt(e,t,t.pendingProps,n),t.child;case 8:return kt(e,t,t.pendingProps.children,n),t.child;case 12:return kt(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(i=t.type._context,a=t.pendingProps,u=t.memoizedProps,f=a.value,Ve(il,i._currentValue),i._currentValue=f,u!==null)if(rn(u.value,f)){if(u.children===a.children&&!Lt.current){t=Rn(e,t,n);break e}}else for(u=t.child,u!==null&&(u.return=t);u!==null;){var v=u.dependencies;if(v!==null){f=u.child;for(var w=v.firstContext;w!==null;){if(w.context===i){if(u.tag===1){w=_n(-1,n&-n),w.tag=2;var T=u.updateQueue;if(T!==null){T=T.shared;var j=T.pending;j===null?w.next=w:(w.next=j.next,j.next=w),T.pending=w}}u.lanes|=n,w=u.alternate,w!==null&&(w.lanes|=n),Ka(u.return,n,t),v.lanes|=n;break}w=w.next}}else if(u.tag===10)f=u.type===t.type?null:u.child;else if(u.tag===18){if(f=u.return,f===null)throw Error(l(341));f.lanes|=n,v=f.alternate,v!==null&&(v.lanes|=n),Ka(f,n,t),f=u.sibling}else f=u.child;if(f!==null)f.return=u;else for(f=u;f!==null;){if(f===t){f=null;break}if(u=f.sibling,u!==null){u.return=f.return,f=u;break}f=f.return}u=f}kt(e,t,a.children,n),t=t.child}return t;case 9:return a=t.type,i=t.pendingProps.children,oo(t,n),a=Gt(a),i=i(a),t.flags|=1,kt(e,t,i,n),t.child;case 14:return i=t.type,a=ln(i,t.pendingProps),a=ln(i.type,a),bd(e,t,i,a,n);case 15:return _d(e,t,t.type,t.pendingProps,n);case 17:return i=t.type,a=t.pendingProps,a=t.elementType===i?a:ln(i,a),gl(e,t),t.tag=1,Tt(i)?(e=!0,Zi(t)):e=!1,oo(t,n),gd(t,i,a),us(t,i,a,n),ps(null,t,i,!0,e,n);case 19:return Dd(e,t,n);case 22:return Rd(e,t,n)}throw Error(l(156,t.tag))};function of(e,t){return dn(e,t)}function Bh(e,t,n,i){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=i,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Xt(e,t,n,i){return new Bh(e,t,n,i)}function Ns(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Wh(e){if(typeof e=="function")return Ns(e)?1:0;if(e!=null){if(e=e.$$typeof,e===He)return 11;if(e===Oe)return 14}return 2}function er(e,t){var n=e.alternate;return n===null?(n=Xt(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Pl(e,t,n,i,a,u){var f=2;if(i=e,typeof e=="function")Ns(e)&&(f=1);else if(typeof e=="string")f=5;else e:switch(e){case fe:return Rr(n.children,a,u,t);case he:f=8,a|=8;break;case ce:return e=Xt(12,n,t,a|2),e.elementType=ce,e.lanes=u,e;case Se:return e=Xt(13,n,t,a),e.elementType=Se,e.lanes=u,e;case _e:return e=Xt(19,n,t,a),e.elementType=_e,e.lanes=u,e;case be:return zl(n,a,u,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Pe:f=10;break e;case Ge:f=9;break e;case He:f=11;break e;case Oe:f=14;break e;case ge:f=16,i=null;break e}throw Error(l(130,e==null?e:typeof e,""))}return t=Xt(f,n,t,a),t.elementType=e,t.type=i,t.lanes=u,t}function Rr(e,t,n,i){return e=Xt(7,e,i,t),e.lanes=n,e}function zl(e,t,n,i){return e=Xt(22,e,i,t),e.elementType=be,e.lanes=n,e.stateNode={isHidden:!1},e}function Ds(e,t,n){return e=Xt(6,e,null,t),e.lanes=n,e}function Ms(e,t,n){return t=Xt(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function Qh(e,t,n,i,a){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=sa(0),this.expirationTimes=sa(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=sa(0),this.identifierPrefix=i,this.onRecoverableError=a,this.mutableSourceEagerHydrationData=null}function Os(e,t,n,i,a,u,f,v,w){return e=new Qh(e,t,n,v,w),t===1?(t=1,u===!0&&(t|=8)):t=0,u=Xt(3,null,null,t),e.current=u,u.stateNode=e,u.memoizedState={element:i,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ya(u),e}function Kh(e,t,n){var i=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:z,key:i==null?null:""+i,children:e,containerInfo:t,implementation:n}}function lf(e){if(!e)return Wn;e=e._reactInternals;e:{if(Te(e)!==e||e.tag!==1)throw Error(l(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Tt(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(l(171))}if(e.tag===1){var n=e.type;if(Tt(n))return Nc(e,n,t)}return t}function af(e,t,n,i,a,u,f,v,w){return e=Os(n,i,!0,e,a,u,f,v,w),e.context=lf(null),n=e.current,i=Ct(),a=Jn(n),u=_n(i,a),u.callback=t??null,Gn(n,u,a),e.current.lanes=a,Lo(e,a,i),Dt(e,i),e}function Ll(e,t,n,i){var a=t.current,u=Ct(),f=Jn(a);return n=lf(n),t.context===null?t.context=n:t.pendingContext=n,t=_n(u,f),t.payload={element:e},i=i===void 0?null:i,i!==null&&(t.callback=i),e=Gn(a,t,f),e!==null&&(un(e,a,f,u),al(e,a,f)),f}function Tl(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function sf(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function As(e,t){sf(e,t),(e=e.alternate)&&sf(e,t)}function Gh(){return null}var uf=typeof reportError=="function"?reportError:function(e){console.error(e)};function Fs(e){this._internalRoot=e}$l.prototype.render=Fs.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(l(409));Ll(e,t,null,null)},$l.prototype.unmount=Fs.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Cr(function(){Ll(null,e,null,null)}),t[Sn]=null}};function $l(e){this._internalRoot=e}$l.prototype.unstable_scheduleHydration=function(e){if(e){var t=Wu();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Un.length&&t!==0&&t<Un[n].priority;n++);Un.splice(n,0,e),n===0&&Gu(e)}};function Is(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Nl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function cf(){}function Yh(e,t,n,i,a){if(a){if(typeof i=="function"){var u=i;i=function(){var T=Tl(f);u.call(T)}}var f=af(t,i,e,0,null,!1,!1,"",cf);return e._reactRootContainer=f,e[Sn]=f.current,Bo(e.nodeType===8?e.parentNode:e),Cr(),f}for(;a=e.lastChild;)e.removeChild(a);if(typeof i=="function"){var v=i;i=function(){var T=Tl(w);v.call(T)}}var w=Os(e,0,!1,null,null,!1,!1,"",cf);return e._reactRootContainer=w,e[Sn]=w.current,Bo(e.nodeType===8?e.parentNode:e),Cr(function(){Ll(t,w,n,i)}),w}function Dl(e,t,n,i,a){var u=n._reactRootContainer;if(u){var f=u;if(typeof a=="function"){var v=a;a=function(){var w=Tl(f);v.call(w)}}Ll(t,f,e,a)}else f=Yh(n,t,e,a,i);return Tl(f)}Hu=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=zo(t.pendingLanes);n!==0&&(ua(t,n|1),Dt(t,je()),(De&6)===0&&(uo=je()+500,Qn()))}break;case 13:Cr(function(){var i=bn(e,1);if(i!==null){var a=Ct();un(i,e,1,a)}}),As(e,1)}},ca=function(e){if(e.tag===13){var t=bn(e,134217728);if(t!==null){var n=Ct();un(t,e,134217728,n)}As(e,134217728)}},Bu=function(e){if(e.tag===13){var t=Jn(e),n=bn(e,t);if(n!==null){var i=Ct();un(n,e,t,i)}As(e,t)}},Wu=function(){return Ie},Qu=function(e,t){var n=Ie;try{return Ie=e,t()}finally{Ie=n}},_o=function(e,t,n){switch(t){case"input":if(Fr(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var i=n[t];if(i!==e&&i.form===e.form){var a=Xi(i);if(!a)throw Error(l(90));nt(i),Fr(i,a)}}}break;case"textarea":ko(e,n);break;case"select":t=n.value,t!=null&&Tn(e,!!n.multiple,t,!1)}},Li=Ls,Ti=Cr;var qh={usingClientEntryPoint:!1,Events:[Ko,qr,Xi,fr,pr,Ls]},ai={findFiberByHostInstance:vr,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Xh={bundleType:ai.bundleType,version:ai.version,rendererPackageName:ai.rendererPackageName,rendererConfig:ai.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Y.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Le(e),e===null?null:e.stateNode},findFiberByHostInstance:ai.findFiberByHostInstance||Gh,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Ml=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Ml.isDisabled&&Ml.supportsFiber)try{xn=Ml.inject(Xh),zt=Ml}catch{}}return Mt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=qh,Mt.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Is(t))throw Error(l(200));return Kh(e,t,null,n)},Mt.createRoot=function(e,t){if(!Is(e))throw Error(l(299));var n=!1,i="",a=uf;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(i=t.identifierPrefix),t.onRecoverableError!==void 0&&(a=t.onRecoverableError)),t=Os(e,1,!1,null,null,n,!1,i,a),e[Sn]=t.current,Bo(e.nodeType===8?e.parentNode:e),new Fs(t)},Mt.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(l(188)):(e=Object.keys(e).join(","),Error(l(268,e)));return e=Le(t),e=e===null?null:e.stateNode,e},Mt.flushSync=function(e){return Cr(e)},Mt.hydrate=function(e,t,n){if(!Nl(t))throw Error(l(200));return Dl(null,e,t,!0,n)},Mt.hydrateRoot=function(e,t,n){if(!Is(e))throw Error(l(405));var i=n!=null&&n.hydratedSources||null,a=!1,u="",f=uf;if(n!=null&&(n.unstable_strictMode===!0&&(a=!0),n.identifierPrefix!==void 0&&(u=n.identifierPrefix),n.onRecoverableError!==void 0&&(f=n.onRecoverableError)),t=af(t,null,e,1,n??null,a,!1,u,f),e[Sn]=t.current,Bo(e),i)for(e=0;e<i.length;e++)n=i[e],a=n._getVersion,a=a(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,a]:t.mutableSourceEagerHydrationData.push(n,a);return new $l(t)},Mt.render=function(e,t,n){if(!Nl(t))throw Error(l(200));return Dl(null,e,t,!1,n)},Mt.unmountComponentAtNode=function(e){if(!Nl(e))throw Error(l(40));return e._reactRootContainer?(Cr(function(){Dl(null,null,e,!1,function(){e._reactRootContainer=null,e[Sn]=null})}),!0):!1},Mt.unstable_batchedUpdates=Ls,Mt.unstable_renderSubtreeIntoContainer=function(e,t,n,i){if(!Nl(n))throw Error(l(200));if(e==null||e._reactInternals===void 0)throw Error(l(38));return Dl(e,t,n,!1,i)},Mt.version="18.3.1-next-f1338f8080-20240426",Mt}var vf;function dp(){if(vf)return js.exports;vf=1;function r(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r)}catch(o){console.error(o)}}return r(),js.exports=nv(),js.exports}var gf;function rv(){if(gf)return Ol;gf=1;var r=dp();return Ol.createRoot=r.createRoot,Ol.hydrateRoot=r.hydrateRoot,Ol}var ov=rv(),si={},yf;function iv(){if(yf)return si;yf=1,Object.defineProperty(si,"__esModule",{value:!0}),si.parse=p,si.serialize=g;const r=/^[\u0021-\u003A\u003C\u003E-\u007E]+$/,o=/^[\u0021-\u003A\u003C-\u007E]*$/,l=/^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,s=/^[\u0020-\u003A\u003D-\u007E]*$/,c=Object.prototype.toString,d=(()=>{const x=function(){};return x.prototype=Object.create(null),x})();function p(x,N){const L=new d,O=x.length;if(O<2)return L;const I=N?.decode||S;let D=0;do{const te=x.indexOf("=",D);if(te===-1)break;const A=x.indexOf(";",D),Y=A===-1?O:A;if(te>Y){D=x.lastIndexOf(";",te-1)+1;continue}const ae=h(x,D,te),z=m(x,te,ae),fe=x.slice(ae,z);if(L[fe]===void 0){let he=h(x,te+1,Y),ce=m(x,Y,he);const Pe=I(x.slice(he,ce));L[fe]=Pe}D=Y+1}while(D<O);return L}function h(x,N,L){do{const O=x.charCodeAt(N);if(O!==32&&O!==9)return N}while(++N<L);return L}function m(x,N,L){for(;N>L;){const O=x.charCodeAt(--N);if(O!==32&&O!==9)return N+1}return L}function g(x,N,L){const O=L?.encode||encodeURIComponent;if(!r.test(x))throw new TypeError(`argument name is invalid: ${x}`);const I=O(N);if(!o.test(I))throw new TypeError(`argument val is invalid: ${N}`);let D=x+"="+I;if(!L)return D;if(L.maxAge!==void 0){if(!Number.isInteger(L.maxAge))throw new TypeError(`option maxAge is invalid: ${L.maxAge}`);D+="; Max-Age="+L.maxAge}if(L.domain){if(!l.test(L.domain))throw new TypeError(`option domain is invalid: ${L.domain}`);D+="; Domain="+L.domain}if(L.path){if(!s.test(L.path))throw new TypeError(`option path is invalid: ${L.path}`);D+="; Path="+L.path}if(L.expires){if(!E(L.expires)||!Number.isFinite(L.expires.valueOf()))throw new TypeError(`option expires is invalid: ${L.expires}`);D+="; Expires="+L.expires.toUTCString()}if(L.httpOnly&&(D+="; HttpOnly"),L.secure&&(D+="; Secure"),L.partitioned&&(D+="; Partitioned"),L.priority)switch(typeof L.priority=="string"?L.priority.toLowerCase():void 0){case"low":D+="; Priority=Low";break;case"medium":D+="; Priority=Medium";break;case"high":D+="; Priority=High";break;default:throw new TypeError(`option priority is invalid: ${L.priority}`)}if(L.sameSite)switch(typeof L.sameSite=="string"?L.sameSite.toLowerCase():L.sameSite){case!0:case"strict":D+="; SameSite=Strict";break;case"lax":D+="; SameSite=Lax";break;case"none":D+="; SameSite=None";break;default:throw new TypeError(`option sameSite is invalid: ${L.sameSite}`)}return D}function S(x){if(x.indexOf("%")===-1)return x;try{return decodeURIComponent(x)}catch{return x}}function E(x){return c.call(x)==="[object Date]"}return si}iv();/**
 * react-router v7.6.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */var fp=r=>{throw TypeError(r)},lv=(r,o,l)=>o.has(r)||fp("Cannot "+l),Bs=(r,o,l)=>(lv(r,o,"read from private field"),l?l.call(r):o.get(r)),av=(r,o,l)=>o.has(r)?fp("Cannot add the same private member more than once"):o instanceof WeakSet?o.add(r):o.set(r,l),wf="popstate";function sv(r={}){function o(s,c){let{pathname:d,search:p,hash:h}=s.location;return gi("",{pathname:d,search:p,hash:h},c.state&&c.state.usr||null,c.state&&c.state.key||"default")}function l(s,c){return typeof c=="string"?c:or(c)}return cv(o,l,null,r)}function ze(r,o){if(r===!1||r===null||typeof r>"u")throw new Error(o)}function ot(r,o){if(!r){typeof console<"u"&&console.warn(o);try{throw new Error(o)}catch{}}}function uv(){return Math.random().toString(36).substring(2,10)}function xf(r,o){return{usr:r.state,key:r.key,idx:o}}function gi(r,o,l=null,s){return{pathname:typeof r=="string"?r:r.pathname,search:"",hash:"",...typeof o=="string"?ir(o):o,state:l,key:o&&o.key||s||uv()}}function or({pathname:r="/",search:o="",hash:l=""}){return o&&o!=="?"&&(r+=o.charAt(0)==="?"?o:"?"+o),l&&l!=="#"&&(r+=l.charAt(0)==="#"?l:"#"+l),r}function ir(r){let o={};if(r){let l=r.indexOf("#");l>=0&&(o.hash=r.substring(l),r=r.substring(0,l));let s=r.indexOf("?");s>=0&&(o.search=r.substring(s),r=r.substring(0,s)),r&&(o.pathname=r)}return o}function cv(r,o,l,s={}){let{window:c=document.defaultView,v5Compat:d=!1}=s,p=c.history,h="POP",m=null,g=S();g==null&&(g=0,p.replaceState({...p.state,idx:g},""));function S(){return(p.state||{idx:null}).idx}function E(){h="POP";let I=S(),D=I==null?null:I-g;g=I,m&&m({action:h,location:O.location,delta:D})}function x(I,D){h="PUSH";let te=gi(O.location,I,D);g=S()+1;let A=xf(te,g),Y=O.createHref(te);try{p.pushState(A,"",Y)}catch(ae){if(ae instanceof DOMException&&ae.name==="DataCloneError")throw ae;c.location.assign(Y)}d&&m&&m({action:h,location:O.location,delta:1})}function N(I,D){h="REPLACE";let te=gi(O.location,I,D);g=S();let A=xf(te,g),Y=O.createHref(te);p.replaceState(A,"",Y),d&&m&&m({action:h,location:O.location,delta:0})}function L(I){return pp(I)}let O={get action(){return h},get location(){return r(c,p)},listen(I){if(m)throw new Error("A history only accepts one active listener");return c.addEventListener(wf,E),m=I,()=>{c.removeEventListener(wf,E),m=null}},createHref(I){return o(c,I)},createURL:L,encodeLocation(I){let D=L(I);return{pathname:D.pathname,search:D.search,hash:D.hash}},push:x,replace:N,go(I){return p.go(I)}};return O}function pp(r,o=!1){let l="http://localhost";typeof window<"u"&&(l=window.location.origin!=="null"?window.location.origin:window.location.href),ze(l,"No window.location.(origin|href) available to create URL");let s=typeof r=="string"?r:or(r);return s=s.replace(/ $/,"%20"),!o&&s.startsWith("//")&&(s=l+s),new URL(s,l)}var pi,Sf=class{constructor(r){if(av(this,pi,new Map),r)for(let[o,l]of r)this.set(o,l)}get(r){if(Bs(this,pi).has(r))return Bs(this,pi).get(r);if(r.defaultValue!==void 0)return r.defaultValue;throw new Error("No value found for context")}set(r,o){Bs(this,pi).set(r,o)}};pi=new WeakMap;var dv=new Set(["lazy","caseSensitive","path","id","index","children"]);function fv(r){return dv.has(r)}var pv=new Set(["lazy","caseSensitive","path","id","index","unstable_middleware","children"]);function mv(r){return pv.has(r)}function hv(r){return r.index===!0}function Bl(r,o,l=[],s={}){return r.map((c,d)=>{let p=[...l,String(d)],h=typeof c.id=="string"?c.id:p.join("-");if(ze(c.index!==!0||!c.children,"Cannot specify children on an index route"),ze(!s[h],`Found a route id collision on id "${h}".  Route id's must be globally unique within Data Router usages`),hv(c)){let m={...c,...o(c),id:h};return s[h]=m,m}else{let m={...c,...o(c),id:h,children:void 0};return s[h]=m,c.children&&(m.children=Bl(c.children,o,p,s)),m}})}function Ln(r,o,l="/"){return Ul(r,o,l,!1)}function Ul(r,o,l,s){let c=typeof o=="string"?ir(o):o,d=Ot(c.pathname||"/",l);if(d==null)return null;let p=mp(r);gv(p);let h=null;for(let m=0;h==null&&m<p.length;++m){let g=Pv(d);h=_v(p[m],g,s)}return h}function vv(r,o){let{route:l,pathname:s,params:c}=r;return{id:l.id,pathname:s,params:c,data:o[l.id],handle:l.handle}}function mp(r,o=[],l=[],s=""){let c=(d,p,h)=>{let m={relativePath:h===void 0?d.path||"":h,caseSensitive:d.caseSensitive===!0,childrenIndex:p,route:d};m.relativePath.startsWith("/")&&(ze(m.relativePath.startsWith(s),`Absolute route path "${m.relativePath}" nested under path "${s}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),m.relativePath=m.relativePath.slice(s.length));let g=vn([s,m.relativePath]),S=l.concat(m);d.children&&d.children.length>0&&(ze(d.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${g}".`),mp(d.children,o,S,g)),!(d.path==null&&!d.index)&&o.push({path:g,score:Cv(g,d.index),routesMeta:S})};return r.forEach((d,p)=>{if(d.path===""||!d.path?.includes("?"))c(d,p);else for(let h of hp(d.path))c(d,p,h)}),o}function hp(r){let o=r.split("/");if(o.length===0)return[];let[l,...s]=o,c=l.endsWith("?"),d=l.replace(/\?$/,"");if(s.length===0)return c?[d,""]:[d];let p=hp(s.join("/")),h=[];return h.push(...p.map(m=>m===""?d:[d,m].join("/"))),c&&h.push(...p),h.map(m=>r.startsWith("/")&&m===""?"/":m)}function gv(r){r.sort((o,l)=>o.score!==l.score?l.score-o.score:bv(o.routesMeta.map(s=>s.childrenIndex),l.routesMeta.map(s=>s.childrenIndex)))}var yv=/^:[\w-]+$/,wv=3,xv=2,Sv=1,Ev=10,kv=-2,Ef=r=>r==="*";function Cv(r,o){let l=r.split("/"),s=l.length;return l.some(Ef)&&(s+=kv),o&&(s+=xv),l.filter(c=>!Ef(c)).reduce((c,d)=>c+(yv.test(d)?wv:d===""?Sv:Ev),s)}function bv(r,o){return r.length===o.length&&r.slice(0,-1).every((s,c)=>s===o[c])?r[r.length-1]-o[o.length-1]:0}function _v(r,o,l=!1){let{routesMeta:s}=r,c={},d="/",p=[];for(let h=0;h<s.length;++h){let m=s[h],g=h===s.length-1,S=d==="/"?o:o.slice(d.length)||"/",E=Wl({path:m.relativePath,caseSensitive:m.caseSensitive,end:g},S),x=m.route;if(!E&&g&&l&&!s[s.length-1].route.index&&(E=Wl({path:m.relativePath,caseSensitive:m.caseSensitive,end:!1},S)),!E)return null;Object.assign(c,E.params),p.push({params:c,pathname:vn([d,E.pathname]),pathnameBase:Tv(vn([d,E.pathnameBase])),route:x}),E.pathnameBase!=="/"&&(d=vn([d,E.pathnameBase]))}return p}function Wl(r,o){typeof r=="string"&&(r={path:r,caseSensitive:!1,end:!0});let[l,s]=Rv(r.path,r.caseSensitive,r.end),c=o.match(l);if(!c)return null;let d=c[0],p=d.replace(/(.)\/+$/,"$1"),h=c.slice(1);return{params:s.reduce((g,{paramName:S,isOptional:E},x)=>{if(S==="*"){let L=h[x]||"";p=d.slice(0,d.length-L.length).replace(/(.)\/+$/,"$1")}const N=h[x];return E&&!N?g[S]=void 0:g[S]=(N||"").replace(/%2F/g,"/"),g},{}),pathname:d,pathnameBase:p,pattern:r}}function Rv(r,o=!1,l=!0){ot(r==="*"||!r.endsWith("*")||r.endsWith("/*"),`Route path "${r}" will be treated as if it were "${r.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${r.replace(/\*$/,"/*")}".`);let s=[],c="^"+r.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(p,h,m)=>(s.push({paramName:h,isOptional:m!=null}),m?"/?([^\\/]+)?":"/([^\\/]+)"));return r.endsWith("*")?(s.push({paramName:"*"}),c+=r==="*"||r==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):l?c+="\\/*$":r!==""&&r!=="/"&&(c+="(?:(?=\\/|$))"),[new RegExp(c,o?void 0:"i"),s]}function Pv(r){try{return r.split("/").map(o=>decodeURIComponent(o).replace(/\//g,"%2F")).join("/")}catch(o){return ot(!1,`The URL path "${r}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${o}).`),r}}function Ot(r,o){if(o==="/")return r;if(!r.toLowerCase().startsWith(o.toLowerCase()))return null;let l=o.endsWith("/")?o.length-1:o.length,s=r.charAt(l);return s&&s!=="/"?null:r.slice(l)||"/"}function zv(r,o="/"){let{pathname:l,search:s="",hash:c=""}=typeof r=="string"?ir(r):r;return{pathname:l?l.startsWith("/")?l:Lv(l,o):o,search:$v(s),hash:Nv(c)}}function Lv(r,o){let l=o.replace(/\/+$/,"").split("/");return r.split("/").forEach(c=>{c===".."?l.length>1&&l.pop():c!=="."&&l.push(c)}),l.length>1?l.join("/"):"/"}function Ws(r,o,l,s){return`Cannot include a '${r}' character in a manually specified \`to.${o}\` field [${JSON.stringify(s)}].  Please separate it out to the \`to.${l}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function vp(r){return r.filter((o,l)=>l===0||o.route.path&&o.route.path.length>0)}function hu(r){let o=vp(r);return o.map((l,s)=>s===o.length-1?l.pathname:l.pathnameBase)}function vu(r,o,l,s=!1){let c;typeof r=="string"?c=ir(r):(c={...r},ze(!c.pathname||!c.pathname.includes("?"),Ws("?","pathname","search",c)),ze(!c.pathname||!c.pathname.includes("#"),Ws("#","pathname","hash",c)),ze(!c.search||!c.search.includes("#"),Ws("#","search","hash",c)));let d=r===""||c.pathname==="",p=d?"/":c.pathname,h;if(p==null)h=l;else{let E=o.length-1;if(!s&&p.startsWith("..")){let x=p.split("/");for(;x[0]==="..";)x.shift(),E-=1;c.pathname=x.join("/")}h=E>=0?o[E]:"/"}let m=zv(c,h),g=p&&p!=="/"&&p.endsWith("/"),S=(d||p===".")&&l.endsWith("/");return!m.pathname.endsWith("/")&&(g||S)&&(m.pathname+="/"),m}var vn=r=>r.join("/").replace(/\/\/+/g,"/"),Tv=r=>r.replace(/\/+$/,"").replace(/^\/*/,"/"),$v=r=>!r||r==="?"?"":r.startsWith("?")?r:"?"+r,Nv=r=>!r||r==="#"?"":r.startsWith("#")?r:"#"+r,Ql=class{constructor(r,o,l,s=!1){this.status=r,this.statusText=o||"",this.internal=s,l instanceof Error?(this.data=l.toString(),this.error=l):this.data=l}};function yi(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.internal=="boolean"&&"data"in r}var gp=["POST","PUT","PATCH","DELETE"],Dv=new Set(gp),Mv=["GET",...gp],Ov=new Set(Mv),Av=new Set([301,302,303,307,308]),Fv=new Set([307,308]),Qs={state:"idle",location:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},Iv={state:"idle",data:void 0,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0},po={state:"unblocked",proceed:void 0,reset:void 0,location:void 0},gu=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Uv=r=>({hasErrorBoundary:!!r.hasErrorBoundary}),yp="remix-router-transitions",wp=Symbol("ResetLoaderData");function jv(r){const o=r.window?r.window:typeof window<"u"?window:void 0,l=typeof o<"u"&&typeof o.document<"u"&&typeof o.document.createElement<"u";ze(r.routes.length>0,"You must provide a non-empty routes array to createRouter");let s=r.hydrationRouteProperties||[],c=r.mapRouteProperties||Uv,d={},p=Bl(r.routes,c,void 0,d),h,m=r.basename||"/",g=r.dataStrategy||Qv,S={unstable_middleware:!1,...r.future},E=null,x=new Set,N=null,L=null,O=null,I=r.hydrationData!=null,D=Ln(p,r.history.location,m),te=!1,A=null,Y;if(D==null&&!r.patchRoutesOnNavigation){let y=Jt(404,{pathname:r.history.location.pathname}),{matches:b,route:$}=Df(p);Y=!0,D=b,A={[$.id]:y}}else if(D&&!r.hydrationData&&fr(D,p,r.history.location.pathname).active&&(D=null),D)if(D.some(y=>y.route.lazy))Y=!1;else if(!D.some(y=>y.route.loader))Y=!0;else{let y=r.hydrationData?r.hydrationData.loaderData:null,b=r.hydrationData?r.hydrationData.errors:null;if(b){let $=D.findIndex(B=>b[B.route.id]!==void 0);Y=D.slice(0,$+1).every(B=>!iu(B.route,y,b))}else Y=D.every($=>!iu($.route,y,b))}else{Y=!1,D=[];let y=fr(null,p,r.history.location.pathname);y.active&&y.matches&&(te=!0,D=y.matches)}let ae,z={historyAction:r.history.action,location:r.history.location,matches:D,initialized:Y,navigation:Qs,restoreScrollPosition:r.hydrationData!=null?!1:null,preventScrollReset:!1,revalidation:"idle",loaderData:r.hydrationData&&r.hydrationData.loaderData||{},actionData:r.hydrationData&&r.hydrationData.actionData||null,errors:r.hydrationData&&r.hydrationData.errors||A,fetchers:new Map,blockers:new Map},fe="POP",he=!1,ce,Pe=!1,Ge=new Map,He=null,Se=!1,_e=!1,Oe=new Set,ge=new Map,be=0,W=-1,J=new Map,K=new Set,C=new Map,F=new Map,ue=new Set,ve=new Map,Ee,ke=null;function $e(){if(E=r.history.listen(({action:y,location:b,delta:$})=>{if(Ee){Ee(),Ee=void 0;return}ot(ve.size===0||$!=null,"You are trying to use a blocker on a POP navigation to a location that was not created by @remix-run/router. This will fail silently in production. This can happen if you are navigating outside the router via `window.history.pushState`/`window.location.hash` instead of using router navigation APIs.  This can also happen if you are using createHashRouter and the user manually changes the URL.");let B=Vr({currentLocation:z.location,nextLocation:b,historyAction:y});if(B&&$!=null){let G=new Promise(se=>{Ee=se});r.history.go($*-1),Nn(B,{state:"blocked",location:b,proceed(){Nn(B,{state:"proceeding",proceed:void 0,reset:void 0,location:b}),G.then(()=>r.history.go($))},reset(){let se=new Map(z.blockers);se.set(B,po),X({blockers:se})}});return}return ut(y,b)}),l){rg(o,Ge);let y=()=>og(o,Ge);o.addEventListener("pagehide",y),He=()=>o.removeEventListener("pagehide",y)}return z.initialized||ut("POP",z.location,{initialHydration:!0}),ae}function M(){E&&E(),He&&He(),x.clear(),ce&&ce.abort(),z.fetchers.forEach((y,b)=>Ur(b)),z.blockers.forEach((y,b)=>jr(b))}function V(y){return x.add(y),()=>x.delete(y)}function X(y,b={}){z={...z,...y};let $=[],B=[];z.fetchers.forEach((G,se)=>{G.state==="idle"&&(ue.has(se)?$.push(se):B.push(se))}),ue.forEach(G=>{!z.fetchers.has(G)&&!ge.has(G)&&$.push(G)}),[...x].forEach(G=>G(z,{deletedFetchers:$,viewTransitionOpts:b.viewTransitionOpts,flushSync:b.flushSync===!0})),$.forEach(G=>Ur(G)),B.forEach(G=>z.fetchers.delete(G))}function Ue(y,b,{flushSync:$}={}){let B=z.actionData!=null&&z.navigation.formMethod!=null&&Ht(z.navigation.formMethod)&&z.navigation.state==="loading"&&y.state?._isRedirect!==!0,G;b.actionData?Object.keys(b.actionData).length>0?G=b.actionData:G=null:B?G=z.actionData:G=null;let se=b.loaderData?$f(z.loaderData,b.loaderData,b.matches||[],b.errors):z.loaderData,de=z.blockers;de.size>0&&(de=new Map(de),de.forEach((re,xe)=>de.set(xe,po)));let Z=he===!0||z.navigation.formMethod!=null&&Ht(z.navigation.formMethod)&&y.state?._isRedirect!==!0;h&&(p=h,h=void 0),Se||fe==="POP"||(fe==="PUSH"?r.history.push(y,y.state):fe==="REPLACE"&&r.history.replace(y,y.state));let le;if(fe==="POP"){let re=Ge.get(z.location.pathname);re&&re.has(y.pathname)?le={currentLocation:z.location,nextLocation:y}:Ge.has(y.pathname)&&(le={currentLocation:y,nextLocation:z.location})}else if(Pe){let re=Ge.get(z.location.pathname);re?re.add(y.pathname):(re=new Set([y.pathname]),Ge.set(z.location.pathname,re)),le={currentLocation:z.location,nextLocation:y}}X({...b,actionData:G,loaderData:se,historyAction:fe,location:y,initialized:!0,navigation:Qs,revalidation:"idle",restoreScrollPosition:Ro(y,b.matches||z.matches),preventScrollReset:Z,blockers:de},{viewTransitionOpts:le,flushSync:$===!0}),fe="POP",he=!1,Pe=!1,Se=!1,_e=!1,ke?.resolve(),ke=null}async function nt(y,b){if(typeof y=="number"){r.history.go(y);return}let $=ou(z.location,z.matches,m,y,b?.fromRouteId,b?.relative),{path:B,submission:G,error:se}=kf(!1,$,b),de=z.location,Z=gi(z.location,B,b&&b.state);Z={...Z,...r.history.encodeLocation(Z)};let le=b&&b.replace!=null?b.replace:void 0,re="PUSH";le===!0?re="REPLACE":le===!1||G!=null&&Ht(G.formMethod)&&G.formAction===z.location.pathname+z.location.search&&(re="REPLACE");let xe=b&&"preventScrollReset"in b?b.preventScrollReset===!0:void 0,we=(b&&b.flushSync)===!0,Ce=Vr({currentLocation:de,nextLocation:Z,historyAction:re});if(Ce){Nn(Ce,{state:"blocked",location:Z,proceed(){Nn(Ce,{state:"proceeding",proceed:void 0,reset:void 0,location:Z}),nt(y,b)},reset(){let Te=new Map(z.blockers);Te.set(Ce,po),X({blockers:Te})}});return}await ut(re,Z,{submission:G,pendingError:se,preventScrollReset:xe,replace:b&&b.replace,enableViewTransition:b&&b.viewTransition,flushSync:we})}function Qe(){ke||(ke=ig()),Ir(),X({revalidation:"loading"});let y=ke.promise;return z.navigation.state==="submitting"?y:z.navigation.state==="idle"?(ut(z.historyAction,z.location,{startUninterruptedRevalidation:!0}),y):(ut(fe||z.historyAction,z.navigation.location,{overrideNavigation:z.navigation,enableViewTransition:Pe===!0}),y)}async function ut(y,b,$){ce&&ce.abort(),ce=null,fe=y,Se=($&&$.startUninterruptedRevalidation)===!0,Dn(z.location,z.matches),he=($&&$.preventScrollReset)===!0,Pe=($&&$.enableViewTransition)===!0;let B=h||p,G=$&&$.overrideNavigation,se=$?.initialHydration&&z.matches&&z.matches.length>0&&!te?z.matches:Ln(B,b,m),de=($&&$.flushSync)===!0;if(se&&z.initialized&&!_e&&Jv(z.location,b)&&!($&&$.submission&&Ht($.submission.formMethod))){Ue(b,{matches:se},{flushSync:de});return}let Z=fr(se,B,b.pathname);if(Z.active&&Z.matches&&(se=Z.matches),!se){let{error:it,notFoundMatches:Et,route:Le}=dr(b.pathname);Ue(b,{matches:Et,loaderData:{},errors:{[Le.id]:it}},{flushSync:de});return}ce=new AbortController;let le=mo(r.history,b,ce.signal,$&&$.submission),re=new Sf(r.unstable_getContext?await r.unstable_getContext():void 0),xe;if($&&$.pendingError)xe=[zr(se).route.id,{type:"error",error:$.pendingError}];else if($&&$.submission&&Ht($.submission.formMethod)){let it=await _i(le,b,$.submission,se,re,Z.active,$&&$.initialHydration===!0,{replace:$.replace,flushSync:de});if(it.shortCircuited)return;if(it.pendingActionResult){let[Et,Le]=it.pendingActionResult;if(Vt(Le)&&yi(Le.error)&&Le.error.status===404){ce=null,Ue(b,{matches:it.matches,loaderData:{},errors:{[Et]:Le.error}});return}}se=it.matches||se,xe=it.pendingActionResult,G=Ks(b,$.submission),de=!1,Z.active=!1,le=mo(r.history,le.url,le.signal)}let{shortCircuited:we,matches:Ce,loaderData:Te,errors:Xe}=await Ri(le,b,se,re,Z.active,G,$&&$.submission,$&&$.fetcherSubmission,$&&$.replace,$&&$.initialHydration===!0,de,xe);we||(ce=null,Ue(b,{matches:Ce||se,...Nf(xe),loaderData:Te,errors:Xe}))}async function _i(y,b,$,B,G,se,de,Z={}){Ir();let le=tg(b,$);if(X({navigation:le},{flushSync:Z.flushSync===!0}),se){let we=await pr(B,b.pathname,y.signal);if(we.type==="aborted")return{shortCircuited:!0};if(we.type==="error"){let Ce=zr(we.partialMatches).route.id;return{matches:we.partialMatches,pendingActionResult:[Ce,{type:"error",error:we.error}]}}else if(we.matches)B=we.matches;else{let{notFoundMatches:Ce,error:Te,route:Xe}=dr(b.pathname);return{matches:Ce,pendingActionResult:[Xe.id,{type:"error",error:Te}]}}}let re,xe=mi(B,b);if(!xe.route.action&&!xe.route.lazy)re={type:"error",error:Jt(405,{method:y.method,pathname:b.pathname,routeId:xe.route.id})};else{let we=go(c,d,y,B,xe,de?[]:s,G),Ce=await $n(y,we,G,null);if(re=Ce[xe.route.id],!re){for(let Te of B)if(Ce[Te.route.id]){re=Ce[Te.route.id];break}}if(y.signal.aborted)return{shortCircuited:!0}}if(Tr(re)){let we;return Z&&Z.replace!=null?we=Z.replace:we=zf(re.response.headers.get("Location"),new URL(y.url),m)===z.location.pathname+z.location.search,await Zt(y,re,!0,{submission:$,replace:we}),{shortCircuited:!0}}if(Vt(re)){let we=zr(B,xe.route.id);return(Z&&Z.replace)!==!0&&(fe="PUSH"),{matches:B,pendingActionResult:[we.route.id,re,xe.route.id]}}return{matches:B,pendingActionResult:[xe.route.id,re]}}async function Ri(y,b,$,B,G,se,de,Z,le,re,xe,we){let Ce=se||Ks(b,de),Te=de||Z||Of(Ce),Xe=!Se&&!re;if(G){if(Xe){let Pt=Fr(we);X({navigation:Ce,...Pt!==void 0?{actionData:Pt}:{}},{flushSync:xe})}let Ne=await pr($,b.pathname,y.signal);if(Ne.type==="aborted")return{shortCircuited:!0};if(Ne.type==="error"){let Pt=zr(Ne.partialMatches).route.id;return{matches:Ne.partialMatches,loaderData:{},errors:{[Pt]:Ne.error}}}else if(Ne.matches)$=Ne.matches;else{let{error:Pt,notFoundMatches:nn,route:xn}=dr(b.pathname);return{matches:nn,loaderData:{},errors:{[xn.id]:Pt}}}}let it=h||p,{dsMatches:Et,revalidatingFetchers:Le}=Cf(y,B,c,d,r.history,z,$,Te,b,re?[]:s,re===!0,_e,Oe,ue,C,K,it,m,r.patchRoutesOnNavigation!=null,we);if(W=++be,!r.dataStrategy&&!Et.some(Ne=>Ne.shouldLoad)&&Le.length===0){let Ne=Co();return Ue(b,{matches:$,loaderData:{},errors:we&&Vt(we[1])?{[we[0]]:we[1].error}:null,...Nf(we),...Ne?{fetchers:new Map(z.fetchers)}:{}},{flushSync:xe}),{shortCircuited:!0}}if(Xe){let Ne={};if(!G){Ne.navigation=Ce;let Pt=Fr(we);Pt!==void 0&&(Ne.actionData=Pt)}Le.length>0&&(Ne.fetchers=Pi(Le)),X(Ne,{flushSync:xe})}Le.forEach(Ne=>{_t(Ne.key),Ne.controller&&ge.set(Ne.key,Ne.controller)});let Mn=()=>Le.forEach(Ne=>_t(Ne.key));ce&&ce.signal.addEventListener("abort",Mn);let{loaderResults:dn,fetcherResults:On}=await ko(Et,Le,y,B);if(y.signal.aborted)return{shortCircuited:!0};ce&&ce.signal.removeEventListener("abort",Mn),Le.forEach(Ne=>ge.delete(Ne.key));let Rt=Al(dn);if(Rt)return await Zt(y,Rt.result,!0,{replace:le}),{shortCircuited:!0};if(Rt=Al(On),Rt)return K.add(Rt.key),await Zt(y,Rt.result,!0,{replace:le}),{shortCircuited:!0};let{loaderData:mr,errors:je}=Tf(z,$,dn,we,Le,On);re&&z.errors&&(je={...z.errors,...je});let Po=Co(),tn=bo(W),hr=Po||tn||Le.length>0;return{matches:$,loaderData:mr,errors:je,...hr?{fetchers:new Map(z.fetchers)}:{}}}function Fr(y){if(y&&!Vt(y[1]))return{[y[0]]:y[1].data};if(z.actionData)return Object.keys(z.actionData).length===0?null:z.actionData}function Pi(y){return y.forEach(b=>{let $=z.fetchers.get(b.key),B=ui(void 0,$?$.data:void 0);z.fetchers.set(b.key,B)}),new Map(z.fetchers)}async function Eo(y,b,$,B){_t(y);let G=(B&&B.flushSync)===!0,se=h||p,de=ou(z.location,z.matches,m,$,b,B?.relative),Z=Ln(se,de,m),le=fr(Z,se,de);if(le.active&&le.matches&&(Z=le.matches),!Z){At(y,b,Jt(404,{pathname:de}),{flushSync:G});return}let{path:re,submission:xe,error:we}=kf(!0,de,B);if(we){At(y,b,we,{flushSync:G});return}let Ce=mi(Z,re),Te=new Sf(r.unstable_getContext?await r.unstable_getContext():void 0),Xe=(B&&B.preventScrollReset)===!0;if(xe&&Ht(xe.formMethod)){await sr(y,b,re,Ce,Z,Te,le.active,G,Xe,xe);return}C.set(y,{routeId:b,path:re}),await Tn(y,b,re,Ce,Z,Te,le.active,G,Xe,xe)}async function sr(y,b,$,B,G,se,de,Z,le,re){Ir(),C.delete(y);function xe(Je){if(!Je.route.action&&!Je.route.lazy){let ct=Jt(405,{method:re.formMethod,pathname:$,routeId:b});return At(y,b,ct,{flushSync:Z}),!0}return!1}if(!de&&xe(B))return;let we=z.fetchers.get(y);en(y,ng(re,we),{flushSync:Z});let Ce=new AbortController,Te=mo(r.history,$,Ce.signal,re);if(de){let Je=await pr(G,$,Te.signal,y);if(Je.type==="aborted")return;if(Je.type==="error"){At(y,b,Je.error,{flushSync:Z});return}else if(Je.matches){if(G=Je.matches,B=mi(G,$),xe(B))return}else{At(y,b,Jt(404,{pathname:$}),{flushSync:Z});return}}ge.set(y,Ce);let Xe=be,it=go(c,d,Te,G,B,s,se),Le=(await $n(Te,it,se,y))[B.route.id];if(Te.signal.aborted){ge.get(y)===Ce&&ge.delete(y);return}if(ue.has(y)){if(Tr(Le)||Vt(Le)){en(y,nr(void 0));return}}else{if(Tr(Le))if(ge.delete(y),W>Xe){en(y,nr(void 0));return}else return K.add(y),en(y,ui(re)),Zt(Te,Le,!1,{fetcherSubmission:re,preventScrollReset:le});if(Vt(Le)){At(y,b,Le.error);return}}let Mn=z.navigation.location||z.location,dn=mo(r.history,Mn,Ce.signal),On=h||p,Rt=z.navigation.state!=="idle"?Ln(On,z.navigation.location,m):z.matches;ze(Rt,"Didn't find any matches after fetcher action");let mr=++be;J.set(y,mr);let je=ui(re,Le.data);z.fetchers.set(y,je);let{dsMatches:Po,revalidatingFetchers:tn}=Cf(dn,se,c,d,r.history,z,Rt,re,Mn,s,!1,_e,Oe,ue,C,K,On,m,r.patchRoutesOnNavigation!=null,[B.route.id,Le]);tn.filter(Je=>Je.key!==y).forEach(Je=>{let ct=Je.key,$i=z.fetchers.get(ct),la=ui(void 0,$i?$i.data:void 0);z.fetchers.set(ct,la),_t(ct),Je.controller&&ge.set(ct,Je.controller)}),X({fetchers:new Map(z.fetchers)});let hr=()=>tn.forEach(Je=>_t(Je.key));Ce.signal.addEventListener("abort",hr);let{loaderResults:Ne,fetcherResults:Pt}=await ko(Po,tn,dn,se);if(Ce.signal.aborted)return;if(Ce.signal.removeEventListener("abort",hr),J.delete(y),ge.delete(y),tn.forEach(Je=>ge.delete(Je.key)),z.fetchers.has(y)){let Je=nr(Le.data);z.fetchers.set(y,Je)}let nn=Al(Ne);if(nn)return Zt(dn,nn.result,!1,{preventScrollReset:le});if(nn=Al(Pt),nn)return K.add(nn.key),Zt(dn,nn.result,!1,{preventScrollReset:le});let{loaderData:xn,errors:zt}=Tf(z,Rt,Ne,void 0,tn,Pt);bo(mr),z.navigation.state==="loading"&&mr>W?(ze(fe,"Expected pending action"),ce&&ce.abort(),Ue(z.navigation.location,{matches:Rt,loaderData:xn,errors:zt,fetchers:new Map(z.fetchers)})):(X({errors:zt,loaderData:$f(z.loaderData,xn,Rt,zt),fetchers:new Map(z.fetchers)}),_e=!1)}async function Tn(y,b,$,B,G,se,de,Z,le,re){let xe=z.fetchers.get(y);en(y,ui(re,xe?xe.data:void 0),{flushSync:Z});let we=new AbortController,Ce=mo(r.history,$,we.signal);if(de){let Le=await pr(G,$,Ce.signal,y);if(Le.type==="aborted")return;if(Le.type==="error"){At(y,b,Le.error,{flushSync:Z});return}else if(Le.matches)G=Le.matches,B=mi(G,$);else{At(y,b,Jt(404,{pathname:$}),{flushSync:Z});return}}ge.set(y,we);let Te=be,Xe=go(c,d,Ce,G,B,s,se),Et=(await $n(Ce,Xe,se,y))[B.route.id];if(ge.get(y)===we&&ge.delete(y),!Ce.signal.aborted){if(ue.has(y)){en(y,nr(void 0));return}if(Tr(Et))if(W>Te){en(y,nr(void 0));return}else{K.add(y),await Zt(Ce,Et,!1,{preventScrollReset:le});return}if(Vt(Et)){At(y,b,Et.error);return}en(y,nr(Et.data))}}async function Zt(y,b,$,{submission:B,fetcherSubmission:G,preventScrollReset:se,replace:de}={}){b.response.headers.has("X-Remix-Revalidate")&&(_e=!0);let Z=b.response.headers.get("Location");ze(Z,"Expected a Location header on the redirect Response"),Z=zf(Z,new URL(y.url),m);let le=gi(z.location,Z,{_isRedirect:!0});if(l){let Xe=!1;if(b.response.headers.has("X-Remix-Reload-Document"))Xe=!0;else if(gu.test(Z)){const it=pp(Z,!0);Xe=it.origin!==o.location.origin||Ot(it.pathname,m)==null}if(Xe){de?o.location.replace(Z):o.location.assign(Z);return}}ce=null;let re=de===!0||b.response.headers.has("X-Remix-Replace")?"REPLACE":"PUSH",{formMethod:xe,formAction:we,formEncType:Ce}=z.navigation;!B&&!G&&xe&&we&&Ce&&(B=Of(z.navigation));let Te=B||G;if(Fv.has(b.response.status)&&Te&&Ht(Te.formMethod))await ut(re,le,{submission:{...Te,formAction:Z},preventScrollReset:se||he,enableViewTransition:$?Pe:void 0});else{let Xe=Ks(le,B);await ut(re,le,{overrideNavigation:Xe,fetcherSubmission:G,preventScrollReset:se||he,enableViewTransition:$?Pe:void 0})}}async function $n(y,b,$,B){let G,se={};try{G=await Kv(g,y,b,B,$,!1)}catch(de){return b.filter(Z=>Z.shouldLoad).forEach(Z=>{se[Z.route.id]={type:"error",error:de}}),se}if(y.signal.aborted)return se;for(let[de,Z]of Object.entries(G))if(Zv(Z)){let le=Z.result;se[de]={type:"redirect",response:qv(le,y,de,b,m)}}else se[de]=await Yv(Z);return se}async function ko(y,b,$,B){let G=$n($,y,B,null),se=Promise.all(b.map(async le=>{if(le.matches&&le.match&&le.request&&le.controller){let xe=(await $n(le.request,le.matches,B,le.key))[le.match.route.id];return{[le.key]:xe}}else return Promise.resolve({[le.key]:{type:"error",error:Jt(404,{pathname:le.path})}})})),de=await G,Z=(await se).reduce((le,re)=>Object.assign(le,re),{});return{loaderResults:de,fetcherResults:Z}}function Ir(){_e=!0,C.forEach((y,b)=>{ge.has(b)&&Oe.add(b),_t(b)})}function en(y,b,$={}){z.fetchers.set(y,b),X({fetchers:new Map(z.fetchers)},{flushSync:($&&$.flushSync)===!0})}function At(y,b,$,B={}){let G=zr(z.matches,b);Ur(y),X({errors:{[G.route.id]:$},fetchers:new Map(z.fetchers)},{flushSync:(B&&B.flushSync)===!0})}function ur(y){return F.set(y,(F.get(y)||0)+1),ue.has(y)&&ue.delete(y),z.fetchers.get(y)||Iv}function Ur(y){let b=z.fetchers.get(y);ge.has(y)&&!(b&&b.state==="loading"&&J.has(y))&&_t(y),C.delete(y),J.delete(y),K.delete(y),ue.delete(y),Oe.delete(y),z.fetchers.delete(y)}function cr(y){let b=(F.get(y)||0)-1;b<=0?(F.delete(y),ue.add(y)):F.set(y,b),X({fetchers:new Map(z.fetchers)})}function _t(y){let b=ge.get(y);b&&(b.abort(),ge.delete(y))}function zi(y){for(let b of y){let $=ur(b),B=nr($.data);z.fetchers.set(b,B)}}function Co(){let y=[],b=!1;for(let $ of K){let B=z.fetchers.get($);ze(B,`Expected fetcher: ${$}`),B.state==="loading"&&(K.delete($),y.push($),b=!0)}return zi(y),b}function bo(y){let b=[];for(let[$,B]of J)if(B<y){let G=z.fetchers.get($);ze(G,`Expected fetcher: ${$}`),G.state==="loading"&&(_t($),J.delete($),b.push($))}return zi(b),b.length>0}function ia(y,b){let $=z.blockers.get(y)||po;return ve.get(y)!==b&&ve.set(y,b),$}function jr(y){z.blockers.delete(y),ve.delete(y)}function Nn(y,b){let $=z.blockers.get(y)||po;ze($.state==="unblocked"&&b.state==="blocked"||$.state==="blocked"&&b.state==="blocked"||$.state==="blocked"&&b.state==="proceeding"||$.state==="blocked"&&b.state==="unblocked"||$.state==="proceeding"&&b.state==="unblocked",`Invalid blocker state transition: ${$.state} -> ${b.state}`);let B=new Map(z.blockers);B.set(y,b),X({blockers:B})}function Vr({currentLocation:y,nextLocation:b,historyAction:$}){if(ve.size===0)return;ve.size>1&&ot(!1,"A router only supports one blocker at a time");let B=Array.from(ve.entries()),[G,se]=B[B.length-1],de=z.blockers.get(G);if(!(de&&de.state==="proceeding")&&se({currentLocation:y,nextLocation:b,historyAction:$}))return G}function dr(y){let b=Jt(404,{pathname:y}),$=h||p,{matches:B,route:G}=Df($);return{notFoundMatches:B,route:G,error:b}}function _o(y,b,$){if(N=y,O=b,L=$||null,!I&&z.navigation===Qs){I=!0;let B=Ro(z.location,z.matches);B!=null&&X({restoreScrollPosition:B})}return()=>{N=null,O=null,L=null}}function wn(y,b){return L&&L(y,b.map(B=>vv(B,z.loaderData)))||y.key}function Dn(y,b){if(N&&O){let $=wn(y,b);N[$]=O()}}function Ro(y,b){if(N){let $=wn(y,b),B=N[$];if(typeof B=="number")return B}return null}function fr(y,b,$){if(r.patchRoutesOnNavigation)if(y){if(Object.keys(y[0].params).length>0)return{active:!0,matches:Ul(b,$,m,!0)}}else return{active:!0,matches:Ul(b,$,m,!0)||[]};return{active:!1,matches:null}}async function pr(y,b,$,B){if(!r.patchRoutesOnNavigation)return{type:"success",matches:y};let G=y;for(;;){let se=h==null,de=h||p,Z=d;try{await r.patchRoutesOnNavigation({signal:$,path:b,matches:G,fetcherKey:B,patch:(xe,we)=>{$.aborted||bf(xe,we,de,Z,c)}})}catch(xe){return{type:"error",error:xe,partialMatches:G}}finally{se&&!$.aborted&&(p=[...p])}if($.aborted)return{type:"aborted"};let le=Ln(de,b,m);if(le)return{type:"success",matches:le};let re=Ul(de,b,m,!0);if(!re||G.length===re.length&&G.every((xe,we)=>xe.route.id===re[we].route.id))return{type:"success",matches:null};G=re}}function Li(y){d={},h=Bl(y,c,void 0,d)}function Ti(y,b){let $=h==null;bf(y,b,h||p,d,c),$&&(p=[...p],X({}))}return ae={get basename(){return m},get future(){return S},get state(){return z},get routes(){return p},get window(){return o},initialize:$e,subscribe:V,enableScrollRestoration:_o,navigate:nt,fetch:Eo,revalidate:Qe,createHref:y=>r.history.createHref(y),encodeLocation:y=>r.history.encodeLocation(y),getFetcher:ur,deleteFetcher:cr,dispose:M,getBlocker:ia,deleteBlocker:jr,patchRoutes:Ti,_internalFetchControllers:ge,_internalSetRoutes:Li},ae}function Vv(r){return r!=null&&("formData"in r&&r.formData!=null||"body"in r&&r.body!==void 0)}function ou(r,o,l,s,c,d){let p,h;if(c){p=[];for(let g of o)if(p.push(g),g.route.id===c){h=g;break}}else p=o,h=o[o.length-1];let m=vu(s||".",hu(p),Ot(r.pathname,l)||r.pathname,d==="path");if(s==null&&(m.search=r.search,m.hash=r.hash),(s==null||s===""||s===".")&&h){let g=yu(m.search);if(h.route.index&&!g)m.search=m.search?m.search.replace(/^\?/,"?index&"):"?index";else if(!h.route.index&&g){let S=new URLSearchParams(m.search),E=S.getAll("index");S.delete("index"),E.filter(N=>N).forEach(N=>S.append("index",N));let x=S.toString();m.search=x?`?${x}`:""}}return l!=="/"&&(m.pathname=m.pathname==="/"?l:vn([l,m.pathname])),or(m)}function kf(r,o,l){if(!l||!Vv(l))return{path:o};if(l.formMethod&&!eg(l.formMethod))return{path:o,error:Jt(405,{method:l.formMethod})};let s=()=>({path:o,error:Jt(400,{type:"invalid-body"})}),d=(l.formMethod||"get").toUpperCase(),p=bp(o);if(l.body!==void 0){if(l.formEncType==="text/plain"){if(!Ht(d))return s();let E=typeof l.body=="string"?l.body:l.body instanceof FormData||l.body instanceof URLSearchParams?Array.from(l.body.entries()).reduce((x,[N,L])=>`${x}${N}=${L}
`,""):String(l.body);return{path:o,submission:{formMethod:d,formAction:p,formEncType:l.formEncType,formData:void 0,json:void 0,text:E}}}else if(l.formEncType==="application/json"){if(!Ht(d))return s();try{let E=typeof l.body=="string"?JSON.parse(l.body):l.body;return{path:o,submission:{formMethod:d,formAction:p,formEncType:l.formEncType,formData:void 0,json:E,text:void 0}}}catch{return s()}}}ze(typeof FormData=="function","FormData is not available in this environment");let h,m;if(l.formData)h=au(l.formData),m=l.formData;else if(l.body instanceof FormData)h=au(l.body),m=l.body;else if(l.body instanceof URLSearchParams)h=l.body,m=Lf(h);else if(l.body==null)h=new URLSearchParams,m=new FormData;else try{h=new URLSearchParams(l.body),m=Lf(h)}catch{return s()}let g={formMethod:d,formAction:p,formEncType:l&&l.formEncType||"application/x-www-form-urlencoded",formData:m,json:void 0,text:void 0};if(Ht(g.formMethod))return{path:o,submission:g};let S=ir(o);return r&&S.search&&yu(S.search)&&h.append("index",""),S.search=`?${h}`,{path:or(S),submission:g}}function Cf(r,o,l,s,c,d,p,h,m,g,S,E,x,N,L,O,I,D,te,A){let Y=A?Vt(A[1])?A[1].error:A[1].data:void 0,ae=c.createURL(d.location),z=c.createURL(m),fe;if(S&&d.errors){let Se=Object.keys(d.errors)[0];fe=p.findIndex(_e=>_e.route.id===Se)}else if(A&&Vt(A[1])){let Se=A[0];fe=p.findIndex(_e=>_e.route.id===Se)-1}let he=A?A[1].statusCode:void 0,ce=he&&he>=400,Pe={currentUrl:ae,currentParams:d.matches[0]?.params||{},nextUrl:z,nextParams:p[0].params,...h,actionResult:Y,actionStatus:he},Ge=p.map((Se,_e)=>{let{route:Oe}=Se,ge=null;if(fe!=null&&_e>fe?ge=!1:Oe.lazy?ge=!0:Oe.loader==null?ge=!1:S?ge=iu(Oe,d.loaderData,d.errors):Hv(d.loaderData,d.matches[_e],Se)&&(ge=!0),ge!==null)return lu(l,s,r,Se,g,o,ge);let be=ce?!1:E||ae.pathname+ae.search===z.pathname+z.search||ae.search!==z.search||Bv(d.matches[_e],Se),W={...Pe,defaultShouldRevalidate:be},J=Kl(Se,W);return lu(l,s,r,Se,g,o,J,W)}),He=[];return L.forEach((Se,_e)=>{if(S||!p.some(F=>F.route.id===Se.routeId)||N.has(_e))return;let Oe=d.fetchers.get(_e),ge=Oe&&Oe.state!=="idle"&&Oe.data===void 0,be=Ln(I,Se.path,D);if(!be){if(te&&ge)return;He.push({key:_e,routeId:Se.routeId,path:Se.path,matches:null,match:null,request:null,controller:null});return}if(O.has(_e))return;let W=mi(be,Se.path),J=new AbortController,K=mo(c,Se.path,J.signal),C=null;if(x.has(_e))x.delete(_e),C=go(l,s,K,be,W,g,o);else if(ge)E&&(C=go(l,s,K,be,W,g,o));else{let F={...Pe,defaultShouldRevalidate:ce?!1:E};Kl(W,F)&&(C=go(l,s,K,be,W,g,o,F))}C&&He.push({key:_e,routeId:Se.routeId,path:Se.path,matches:C,match:W,request:K,controller:J})}),{dsMatches:Ge,revalidatingFetchers:He}}function iu(r,o,l){if(r.lazy)return!0;if(!r.loader)return!1;let s=o!=null&&r.id in o,c=l!=null&&l[r.id]!==void 0;return!s&&c?!1:typeof r.loader=="function"&&r.loader.hydrate===!0?!0:!s&&!c}function Hv(r,o,l){let s=!o||l.route.id!==o.route.id,c=!r.hasOwnProperty(l.route.id);return s||c}function Bv(r,o){let l=r.route.path;return r.pathname!==o.pathname||l!=null&&l.endsWith("*")&&r.params["*"]!==o.params["*"]}function Kl(r,o){if(r.route.shouldRevalidate){let l=r.route.shouldRevalidate(o);if(typeof l=="boolean")return l}return o.defaultShouldRevalidate}function bf(r,o,l,s,c){let d;if(r){let m=s[r];ze(m,`No route found to patch children into: routeId = ${r}`),m.children||(m.children=[]),d=m.children}else d=l;let p=o.filter(m=>!d.some(g=>xp(m,g))),h=Bl(p,c,[r||"_","patch",String(d?.length||"0")],s);d.push(...h)}function xp(r,o){return"id"in r&&"id"in o&&r.id===o.id?!0:r.index===o.index&&r.path===o.path&&r.caseSensitive===o.caseSensitive?(!r.children||r.children.length===0)&&(!o.children||o.children.length===0)?!0:r.children.every((l,s)=>o.children?.some(c=>xp(l,c))):!1}var _f=new WeakMap,Sp=({key:r,route:o,manifest:l,mapRouteProperties:s})=>{let c=l[o.id];if(ze(c,"No route found in manifest"),!c.lazy||typeof c.lazy!="object")return;let d=c.lazy[r];if(!d)return;let p=_f.get(c);p||(p={},_f.set(c,p));let h=p[r];if(h)return h;let m=(async()=>{let g=fv(r),E=c[r]!==void 0&&r!=="hasErrorBoundary";if(g)ot(!g,"Route property "+r+" is not a supported lazy route property. This property will be ignored."),p[r]=Promise.resolve();else if(E)ot(!1,`Route "${c.id}" has a static property "${r}" defined. The lazy property will be ignored.`);else{let x=await d();x!=null&&(Object.assign(c,{[r]:x}),Object.assign(c,s(c)))}typeof c.lazy=="object"&&(c.lazy[r]=void 0,Object.values(c.lazy).every(x=>x===void 0)&&(c.lazy=void 0))})();return p[r]=m,m},Rf=new WeakMap;function Wv(r,o,l,s,c){let d=l[r.id];if(ze(d,"No route found in manifest"),!r.lazy)return{lazyRoutePromise:void 0,lazyHandlerPromise:void 0};if(typeof r.lazy=="function"){let S=Rf.get(d);if(S)return{lazyRoutePromise:S,lazyHandlerPromise:S};let E=(async()=>{ze(typeof r.lazy=="function","No lazy route function found");let x=await r.lazy(),N={};for(let L in x){let O=x[L];if(O===void 0)continue;let I=mv(L),te=d[L]!==void 0&&L!=="hasErrorBoundary";I?ot(!I,"Route property "+L+" is not a supported property to be returned from a lazy route function. This property will be ignored."):te?ot(!te,`Route "${d.id}" has a static property "${L}" defined but its lazy function is also returning a value for this property. The lazy route property "${L}" will be ignored.`):N[L]=O}Object.assign(d,N),Object.assign(d,{...s(d),lazy:void 0})})();return Rf.set(d,E),E.catch(()=>{}),{lazyRoutePromise:E,lazyHandlerPromise:E}}let p=Object.keys(r.lazy),h=[],m;for(let S of p){if(c&&c.includes(S))continue;let E=Sp({key:S,route:r,manifest:l,mapRouteProperties:s});E&&(h.push(E),S===o&&(m=E))}let g=h.length>0?Promise.all(h).then(()=>{}):void 0;return g?.catch(()=>{}),m?.catch(()=>{}),{lazyRoutePromise:g,lazyHandlerPromise:m}}async function Pf(r){let o=r.matches.filter(c=>c.shouldLoad),l={};return(await Promise.all(o.map(c=>c.resolve()))).forEach((c,d)=>{l[o[d].route.id]=c}),l}async function Qv(r){return r.matches.some(o=>o.route.unstable_middleware)?Ep(r,!1,()=>Pf(r),(o,l)=>({[l]:{type:"error",result:o}})):Pf(r)}async function Ep(r,o,l,s){let{matches:c,request:d,params:p,context:h}=r,m={handlerResult:void 0};try{let g=c.flatMap(E=>E.route.unstable_middleware?E.route.unstable_middleware.map(x=>[E.route.id,x]):[]),S=await kp({request:d,params:p,context:h},g,o,m,l);return o?S:m.handlerResult}catch(g){if(!m.middlewareError)throw g;let S=await s(m.middlewareError.error,m.middlewareError.routeId);return m.handlerResult?Object.assign(m.handlerResult,S):S}}async function kp(r,o,l,s,c,d=0){let{request:p}=r;if(p.signal.aborted)throw p.signal.reason?p.signal.reason:new Error(`Request aborted without an \`AbortSignal.reason\`: ${p.method} ${p.url}`);let h=o[d];if(!h)return s.handlerResult=await c(),s.handlerResult;let[m,g]=h,S=!1,E,x=async()=>{if(S)throw new Error("You may only call `next()` once per middleware");S=!0,await kp(r,o,l,s,c,d+1)};try{let N=await g({request:r.request,params:r.params,context:r.context},x);return S?N===void 0?E:N:x()}catch(N){throw s.middlewareError?s.middlewareError.error!==N&&(s.middlewareError={routeId:m,error:N}):s.middlewareError={routeId:m,error:N},N}}function Cp(r,o,l,s,c){let d=Sp({key:"unstable_middleware",route:s.route,manifest:o,mapRouteProperties:r}),p=Wv(s.route,Ht(l.method)?"action":"loader",o,r,c);return{middleware:d,route:p.lazyRoutePromise,handler:p.lazyHandlerPromise}}function lu(r,o,l,s,c,d,p,h=null){let m=!1,g=Cp(r,o,l,s,c);return{...s,_lazyPromises:g,shouldLoad:p,unstable_shouldRevalidateArgs:h,unstable_shouldCallHandler(S){return m=!0,h?typeof S=="boolean"?Kl(s,{...h,defaultShouldRevalidate:S}):Kl(s,h):p},resolve(S){return m||p||S&&l.method==="GET"&&(s.route.lazy||s.route.loader)?Gv({request:l,match:s,lazyHandlerPromise:g?.handler,lazyRoutePromise:g?.route,handlerOverride:S,scopedContext:d}):Promise.resolve({type:"data",result:void 0})}}}function go(r,o,l,s,c,d,p,h=null){return s.map(m=>m.route.id!==c.route.id?{...m,shouldLoad:!1,unstable_shouldRevalidateArgs:h,unstable_shouldCallHandler:()=>!1,_lazyPromises:Cp(r,o,l,m,d),resolve:()=>Promise.resolve({type:"data",result:void 0})}:lu(r,o,l,m,d,p,!0,h))}async function Kv(r,o,l,s,c,d){l.some(g=>g._lazyPromises?.middleware)&&await Promise.all(l.map(g=>g._lazyPromises?.middleware));let p={request:o,params:l[0].params,context:c,matches:l},m=await r({...p,fetcherKey:s,unstable_runClientMiddleware:g=>{let S=p;return Ep(S,!1,()=>g({...S,fetcherKey:s,unstable_runClientMiddleware:()=>{throw new Error("Cannot call `unstable_runClientMiddleware()` from within an `unstable_runClientMiddleware` handler")}}),(E,x)=>({[x]:{type:"error",result:E}}))}});try{await Promise.all(l.flatMap(g=>[g._lazyPromises?.handler,g._lazyPromises?.route]))}catch{}return m}async function Gv({request:r,match:o,lazyHandlerPromise:l,lazyRoutePromise:s,handlerOverride:c,scopedContext:d}){let p,h,m=Ht(r.method),g=m?"action":"loader",S=E=>{let x,N=new Promise((I,D)=>x=D);h=()=>x(),r.signal.addEventListener("abort",h);let L=I=>typeof E!="function"?Promise.reject(new Error(`You cannot call the handler for a route which defines a boolean "${g}" [routeId: ${o.route.id}]`)):E({request:r,params:o.params,context:d},...I!==void 0?[I]:[]),O=(async()=>{try{return{type:"data",result:await(c?c(D=>L(D)):L())}}catch(I){return{type:"error",result:I}}})();return Promise.race([O,N])};try{let E=m?o.route.action:o.route.loader;if(l||s)if(E){let x,[N]=await Promise.all([S(E).catch(L=>{x=L}),l,s]);if(x!==void 0)throw x;p=N}else{await l;let x=m?o.route.action:o.route.loader;if(x)[p]=await Promise.all([S(x),s]);else if(g==="action"){let N=new URL(r.url),L=N.pathname+N.search;throw Jt(405,{method:r.method,pathname:L,routeId:o.route.id})}else return{type:"data",result:void 0}}else if(E)p=await S(E);else{let x=new URL(r.url),N=x.pathname+x.search;throw Jt(404,{pathname:N})}}catch(E){return{type:"error",result:E}}finally{h&&r.signal.removeEventListener("abort",h)}return p}async function Yv(r){let{result:o,type:l}=r;if(_p(o)){let s;try{let c=o.headers.get("Content-Type");c&&/\bapplication\/json\b/.test(c)?o.body==null?s=null:s=await o.json():s=await o.text()}catch(c){return{type:"error",error:c}}return l==="error"?{type:"error",error:new Ql(o.status,o.statusText,s),statusCode:o.status,headers:o.headers}:{type:"data",data:s,statusCode:o.status,headers:o.headers}}return l==="error"?Mf(o)?o.data instanceof Error?{type:"error",error:o.data,statusCode:o.init?.status,headers:o.init?.headers?new Headers(o.init.headers):void 0}:{type:"error",error:new Ql(o.init?.status||500,void 0,o.data),statusCode:yi(o)?o.status:void 0,headers:o.init?.headers?new Headers(o.init.headers):void 0}:{type:"error",error:o,statusCode:yi(o)?o.status:void 0}:Mf(o)?{type:"data",data:o.data,statusCode:o.init?.status,headers:o.init?.headers?new Headers(o.init.headers):void 0}:{type:"data",data:o}}function qv(r,o,l,s,c){let d=r.headers.get("Location");if(ze(d,"Redirects returned/thrown from loaders/actions must have a Location header"),!gu.test(d)){let p=s.slice(0,s.findIndex(h=>h.route.id===l)+1);d=ou(new URL(o.url),p,c,d),r.headers.set("Location",d)}return r}function zf(r,o,l){if(gu.test(r)){let s=r,c=s.startsWith("//")?new URL(o.protocol+s):new URL(s),d=Ot(c.pathname,l)!=null;if(c.origin===o.origin&&d)return c.pathname+c.search+c.hash}return r}function mo(r,o,l,s){let c=r.createURL(bp(o)).toString(),d={signal:l};if(s&&Ht(s.formMethod)){let{formMethod:p,formEncType:h}=s;d.method=p.toUpperCase(),h==="application/json"?(d.headers=new Headers({"Content-Type":h}),d.body=JSON.stringify(s.json)):h==="text/plain"?d.body=s.text:h==="application/x-www-form-urlencoded"&&s.formData?d.body=au(s.formData):d.body=s.formData}return new Request(c,d)}function au(r){let o=new URLSearchParams;for(let[l,s]of r.entries())o.append(l,typeof s=="string"?s:s.name);return o}function Lf(r){let o=new FormData;for(let[l,s]of r.entries())o.append(l,s);return o}function Xv(r,o,l,s=!1,c=!1){let d={},p=null,h,m=!1,g={},S=l&&Vt(l[1])?l[1].error:void 0;return r.forEach(E=>{if(!(E.route.id in o))return;let x=E.route.id,N=o[x];if(ze(!Tr(N),"Cannot handle redirect results in processLoaderData"),Vt(N)){let L=N.error;if(S!==void 0&&(L=S,S=void 0),p=p||{},c)p[x]=L;else{let O=zr(r,x);p[O.route.id]==null&&(p[O.route.id]=L)}s||(d[x]=wp),m||(m=!0,h=yi(N.error)?N.error.status:500),N.headers&&(g[x]=N.headers)}else d[x]=N.data,N.statusCode&&N.statusCode!==200&&!m&&(h=N.statusCode),N.headers&&(g[x]=N.headers)}),S!==void 0&&l&&(p={[l[0]]:S},l[2]&&(d[l[2]]=void 0)),{loaderData:d,errors:p,statusCode:h||200,loaderHeaders:g}}function Tf(r,o,l,s,c,d){let{loaderData:p,errors:h}=Xv(o,l,s);return c.filter(m=>!m.matches||m.matches.some(g=>g.shouldLoad)).forEach(m=>{let{key:g,match:S,controller:E}=m,x=d[g];if(ze(x,"Did not find corresponding fetcher result"),!(E&&E.signal.aborted))if(Vt(x)){let N=zr(r.matches,S?.route.id);h&&h[N.route.id]||(h={...h,[N.route.id]:x.error}),r.fetchers.delete(g)}else if(Tr(x))ze(!1,"Unhandled fetcher revalidation redirect");else{let N=nr(x.data);r.fetchers.set(g,N)}}),{loaderData:p,errors:h}}function $f(r,o,l,s){let c=Object.entries(o).filter(([,d])=>d!==wp).reduce((d,[p,h])=>(d[p]=h,d),{});for(let d of l){let p=d.route.id;if(!o.hasOwnProperty(p)&&r.hasOwnProperty(p)&&d.route.loader&&(c[p]=r[p]),s&&s.hasOwnProperty(p))break}return c}function Nf(r){return r?Vt(r[1])?{actionData:{}}:{actionData:{[r[0]]:r[1].data}}:{}}function zr(r,o){return(o?r.slice(0,r.findIndex(s=>s.route.id===o)+1):[...r]).reverse().find(s=>s.route.hasErrorBoundary===!0)||r[0]}function Df(r){let o=r.length===1?r[0]:r.find(l=>l.index||!l.path||l.path==="/")||{id:"__shim-error-route__"};return{matches:[{params:{},pathname:"",pathnameBase:"",route:o}],route:o}}function Jt(r,{pathname:o,routeId:l,method:s,type:c,message:d}={}){let p="Unknown Server Error",h="Unknown @remix-run/router error";return r===400?(p="Bad Request",s&&o&&l?h=`You made a ${s} request to "${o}" but did not provide a \`loader\` for route "${l}", so there is no way to handle the request.`:c==="invalid-body"&&(h="Unable to encode submission body")):r===403?(p="Forbidden",h=`Route "${l}" does not match URL "${o}"`):r===404?(p="Not Found",h=`No route matches URL "${o}"`):r===405&&(p="Method Not Allowed",s&&o&&l?h=`You made a ${s.toUpperCase()} request to "${o}" but did not provide an \`action\` for route "${l}", so there is no way to handle the request.`:s&&(h=`Invalid request method "${s.toUpperCase()}"`)),new Ql(r||500,p,new Error(h),!0)}function Al(r){let o=Object.entries(r);for(let l=o.length-1;l>=0;l--){let[s,c]=o[l];if(Tr(c))return{key:s,result:c}}}function bp(r){let o=typeof r=="string"?ir(r):r;return or({...o,hash:""})}function Jv(r,o){return r.pathname!==o.pathname||r.search!==o.search?!1:r.hash===""?o.hash!=="":r.hash===o.hash?!0:o.hash!==""}function Zv(r){return _p(r.result)&&Av.has(r.result.status)}function Vt(r){return r.type==="error"}function Tr(r){return(r&&r.type)==="redirect"}function Mf(r){return typeof r=="object"&&r!=null&&"type"in r&&"data"in r&&"init"in r&&r.type==="DataWithResponseInit"}function _p(r){return r!=null&&typeof r.status=="number"&&typeof r.statusText=="string"&&typeof r.headers=="object"&&typeof r.body<"u"}function eg(r){return Ov.has(r.toUpperCase())}function Ht(r){return Dv.has(r.toUpperCase())}function yu(r){return new URLSearchParams(r).getAll("index").some(o=>o==="")}function mi(r,o){let l=typeof o=="string"?ir(o).search:o.search;if(r[r.length-1].route.index&&yu(l||""))return r[r.length-1];let s=vp(r);return s[s.length-1]}function Of(r){let{formMethod:o,formAction:l,formEncType:s,text:c,formData:d,json:p}=r;if(!(!o||!l||!s)){if(c!=null)return{formMethod:o,formAction:l,formEncType:s,formData:void 0,json:void 0,text:c};if(d!=null)return{formMethod:o,formAction:l,formEncType:s,formData:d,json:void 0,text:void 0};if(p!==void 0)return{formMethod:o,formAction:l,formEncType:s,formData:void 0,json:p,text:void 0}}}function Ks(r,o){return o?{state:"loading",location:r,formMethod:o.formMethod,formAction:o.formAction,formEncType:o.formEncType,formData:o.formData,json:o.json,text:o.text}:{state:"loading",location:r,formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0}}function tg(r,o){return{state:"submitting",location:r,formMethod:o.formMethod,formAction:o.formAction,formEncType:o.formEncType,formData:o.formData,json:o.json,text:o.text}}function ui(r,o){return r?{state:"loading",formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text,data:o}:{state:"loading",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:o}}function ng(r,o){return{state:"submitting",formMethod:r.formMethod,formAction:r.formAction,formEncType:r.formEncType,formData:r.formData,json:r.json,text:r.text,data:o?o.data:void 0}}function nr(r){return{state:"idle",formMethod:void 0,formAction:void 0,formEncType:void 0,formData:void 0,json:void 0,text:void 0,data:r}}function rg(r,o){try{let l=r.sessionStorage.getItem(yp);if(l){let s=JSON.parse(l);for(let[c,d]of Object.entries(s||{}))d&&Array.isArray(d)&&o.set(c,new Set(d||[]))}}catch{}}function og(r,o){if(o.size>0){let l={};for(let[s,c]of o)l[s]=[...c];try{r.sessionStorage.setItem(yp,JSON.stringify(l))}catch(s){ot(!1,`Failed to save applied view transitions in sessionStorage (${s}).`)}}}function ig(){let r,o,l=new Promise((s,c)=>{r=async d=>{s(d);try{await l}catch{}},o=async d=>{c(d);try{await l}catch{}}});return{promise:l,resolve:r,reject:o}}var Ar=R.createContext(null);Ar.displayName="DataRouter";var Ei=R.createContext(null);Ei.displayName="DataRouterState";var wu=R.createContext({isTransitioning:!1});wu.displayName="ViewTransition";var Rp=R.createContext(new Map);Rp.displayName="Fetchers";var lg=R.createContext(null);lg.displayName="Await";var gn=R.createContext(null);gn.displayName="Navigation";var ea=R.createContext(null);ea.displayName="Location";var yn=R.createContext({outlet:null,matches:[],isDataRoute:!1});yn.displayName="Route";var xu=R.createContext(null);xu.displayName="RouteError";function Pp(r,{relative:o}={}){ze(ki(),"useHref() may be used only in the context of a <Router> component.");let{basename:l,navigator:s}=R.useContext(gn),{hash:c,pathname:d,search:p}=Ci(r,{relative:o}),h=d;return l!=="/"&&(h=d==="/"?l:vn([l,d])),s.createHref({pathname:h,search:p,hash:c})}function ki(){return R.useContext(ea)!=null}function lr(){return ze(ki(),"useLocation() may be used only in the context of a <Router> component."),R.useContext(ea).location}var zp="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function Lp(r){R.useContext(gn).static||R.useLayoutEffect(r)}function Su(){let{isDataRoute:r}=R.useContext(yn);return r?Sg():ag()}function ag(){ze(ki(),"useNavigate() may be used only in the context of a <Router> component.");let r=R.useContext(Ar),{basename:o,navigator:l}=R.useContext(gn),{matches:s}=R.useContext(yn),{pathname:c}=lr(),d=JSON.stringify(hu(s)),p=R.useRef(!1);return Lp(()=>{p.current=!0}),R.useCallback((m,g={})=>{if(ot(p.current,zp),!p.current)return;if(typeof m=="number"){l.go(m);return}let S=vu(m,JSON.parse(d),c,g.relative==="path");r==null&&o!=="/"&&(S.pathname=S.pathname==="/"?o:vn([o,S.pathname])),(g.replace?l.replace:l.push)(S,g.state,g)},[o,l,d,c,r])}var sg=R.createContext(null);function ug(r){let o=R.useContext(yn).outlet;return o&&R.createElement(sg.Provider,{value:r},o)}function Ci(r,{relative:o}={}){let{matches:l}=R.useContext(yn),{pathname:s}=lr(),c=JSON.stringify(hu(l));return R.useMemo(()=>vu(r,JSON.parse(c),s,o==="path"),[r,c,s,o])}function cg(r,o,l,s){ze(ki(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:c}=R.useContext(gn),{matches:d}=R.useContext(yn),p=d[d.length-1],h=p?p.params:{},m=p?p.pathname:"/",g=p?p.pathnameBase:"/",S=p&&p.route;{let D=S&&S.path||"";Np(m,!S||D.endsWith("*")||D.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${D}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${D}"> to <Route path="${D==="/"?"*":`${D}/*`}">.`)}let E=lr(),x;x=E;let N=x.pathname||"/",L=N;if(g!=="/"){let D=g.replace(/^\//,"").split("/");L="/"+N.replace(/^\//,"").split("/").slice(D.length).join("/")}let O=Ln(r,{pathname:L});return ot(S||O!=null,`No routes matched location "${x.pathname}${x.search}${x.hash}" `),ot(O==null||O[O.length-1].route.element!==void 0||O[O.length-1].route.Component!==void 0||O[O.length-1].route.lazy!==void 0,`Matched leaf route at location "${x.pathname}${x.search}${x.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`),hg(O&&O.map(D=>Object.assign({},D,{params:Object.assign({},h,D.params),pathname:vn([g,c.encodeLocation?c.encodeLocation(D.pathname).pathname:D.pathname]),pathnameBase:D.pathnameBase==="/"?g:vn([g,c.encodeLocation?c.encodeLocation(D.pathnameBase).pathname:D.pathnameBase])})),d,l,s)}function dg(){let r=yg(),o=yi(r)?`${r.status} ${r.statusText}`:r instanceof Error?r.message:JSON.stringify(r),l=r instanceof Error?r.stack:null,s="rgba(200,200,200, 0.5)",c={padding:"0.5rem",backgroundColor:s},d={padding:"2px 4px",backgroundColor:s},p=null;return console.error("Error handled by React Router default ErrorBoundary:",r),p=R.createElement(R.Fragment,null,R.createElement("p",null,"💿 Hey developer 👋"),R.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",R.createElement("code",{style:d},"ErrorBoundary")," or"," ",R.createElement("code",{style:d},"errorElement")," prop on your route.")),R.createElement(R.Fragment,null,R.createElement("h2",null,"Unexpected Application Error!"),R.createElement("h3",{style:{fontStyle:"italic"}},o),l?R.createElement("pre",{style:c},l):null,p)}var fg=R.createElement(dg,null),pg=class extends R.Component{constructor(r){super(r),this.state={location:r.location,revalidation:r.revalidation,error:r.error}}static getDerivedStateFromError(r){return{error:r}}static getDerivedStateFromProps(r,o){return o.location!==r.location||o.revalidation!=="idle"&&r.revalidation==="idle"?{error:r.error,location:r.location,revalidation:r.revalidation}:{error:r.error!==void 0?r.error:o.error,location:o.location,revalidation:r.revalidation||o.revalidation}}componentDidCatch(r,o){console.error("React Router caught the following error during render",r,o)}render(){return this.state.error!==void 0?R.createElement(yn.Provider,{value:this.props.routeContext},R.createElement(xu.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function mg({routeContext:r,match:o,children:l}){let s=R.useContext(Ar);return s&&s.static&&s.staticContext&&(o.route.errorElement||o.route.ErrorBoundary)&&(s.staticContext._deepestRenderedBoundaryId=o.route.id),R.createElement(yn.Provider,{value:r},l)}function hg(r,o=[],l=null,s=null){if(r==null){if(!l)return null;if(l.errors)r=l.matches;else if(o.length===0&&!l.initialized&&l.matches.length>0)r=l.matches;else return null}let c=r,d=l?.errors;if(d!=null){let m=c.findIndex(g=>g.route.id&&d?.[g.route.id]!==void 0);ze(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(d).join(",")}`),c=c.slice(0,Math.min(c.length,m+1))}let p=!1,h=-1;if(l)for(let m=0;m<c.length;m++){let g=c[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(h=m),g.route.id){let{loaderData:S,errors:E}=l,x=g.route.loader&&!S.hasOwnProperty(g.route.id)&&(!E||E[g.route.id]===void 0);if(g.route.lazy||x){p=!0,h>=0?c=c.slice(0,h+1):c=[c[0]];break}}}return c.reduceRight((m,g,S)=>{let E,x=!1,N=null,L=null;l&&(E=d&&g.route.id?d[g.route.id]:void 0,N=g.route.errorElement||fg,p&&(h<0&&S===0?(Np("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),x=!0,L=null):h===S&&(x=!0,L=g.route.hydrateFallbackElement||null)));let O=o.concat(c.slice(0,S+1)),I=()=>{let D;return E?D=N:x?D=L:g.route.Component?D=R.createElement(g.route.Component,null):g.route.element?D=g.route.element:D=m,R.createElement(mg,{match:g,routeContext:{outlet:m,matches:O,isDataRoute:l!=null},children:D})};return l&&(g.route.ErrorBoundary||g.route.errorElement||S===0)?R.createElement(pg,{location:l.location,revalidation:l.revalidation,component:N,error:E,children:I(),routeContext:{outlet:null,matches:O,isDataRoute:!0}}):I()},null)}function Eu(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Tp(r){let o=R.useContext(Ar);return ze(o,Eu(r)),o}function $p(r){let o=R.useContext(Ei);return ze(o,Eu(r)),o}function vg(r){let o=R.useContext(yn);return ze(o,Eu(r)),o}function ku(r){let o=vg(r),l=o.matches[o.matches.length-1];return ze(l.route.id,`${r} can only be used on routes that contain a unique "id"`),l.route.id}function gg(){return ku("useRouteId")}function yg(){let r=R.useContext(xu),o=$p("useRouteError"),l=ku("useRouteError");return r!==void 0?r:o.errors?.[l]}var wg=0;function xg(r){let{router:o,basename:l}=Tp("useBlocker"),s=$p("useBlocker"),[c,d]=R.useState(""),p=R.useCallback(h=>{if(typeof r!="function")return!!r;if(l==="/")return r(h);let{currentLocation:m,nextLocation:g,historyAction:S}=h;return r({currentLocation:{...m,pathname:Ot(m.pathname,l)||m.pathname},nextLocation:{...g,pathname:Ot(g.pathname,l)||g.pathname},historyAction:S})},[l,r]);return R.useEffect(()=>{let h=String(++wg);return d(h),()=>o.deleteBlocker(h)},[o]),R.useEffect(()=>{c!==""&&o.getBlocker(c,p)},[o,c,p]),c&&s.blockers.has(c)?s.blockers.get(c):po}function Sg(){let{router:r}=Tp("useNavigate"),o=ku("useNavigate"),l=R.useRef(!1);return Lp(()=>{l.current=!0}),R.useCallback(async(c,d={})=>{ot(l.current,zp),l.current&&(typeof c=="number"?r.navigate(c):await r.navigate(c,{fromRouteId:o,...d}))},[r,o])}var Af={};function Np(r,o,l){!o&&!Af[r]&&(Af[r]=!0,ot(!1,l))}var Ff={};function If(r,o){!r&&!Ff[o]&&(Ff[o]=!0,console.warn(o))}function Eg(r){let o={hasErrorBoundary:r.hasErrorBoundary||r.ErrorBoundary!=null||r.errorElement!=null};return r.Component&&(r.element&&ot(!1,"You should not include both `Component` and `element` on your route - `Component` will be used."),Object.assign(o,{element:R.createElement(r.Component),Component:void 0})),r.HydrateFallback&&(r.hydrateFallbackElement&&ot(!1,"You should not include both `HydrateFallback` and `hydrateFallbackElement` on your route - `HydrateFallback` will be used."),Object.assign(o,{hydrateFallbackElement:R.createElement(r.HydrateFallback),HydrateFallback:void 0})),r.ErrorBoundary&&(r.errorElement&&ot(!1,"You should not include both `ErrorBoundary` and `errorElement` on your route - `ErrorBoundary` will be used."),Object.assign(o,{errorElement:R.createElement(r.ErrorBoundary),ErrorBoundary:void 0})),o}var kg=["HydrateFallback","hydrateFallbackElement"],Cg=class{constructor(){this.status="pending",this.promise=new Promise((r,o)=>{this.resolve=l=>{this.status==="pending"&&(this.status="resolved",r(l))},this.reject=l=>{this.status==="pending"&&(this.status="rejected",o(l))}})}};function bg({router:r,flushSync:o}){let[l,s]=R.useState(r.state),[c,d]=R.useState(),[p,h]=R.useState({isTransitioning:!1}),[m,g]=R.useState(),[S,E]=R.useState(),[x,N]=R.useState(),L=R.useRef(new Map),O=R.useCallback((A,{deletedFetchers:Y,flushSync:ae,viewTransitionOpts:z})=>{A.fetchers.forEach((he,ce)=>{he.data!==void 0&&L.current.set(ce,he.data)}),Y.forEach(he=>L.current.delete(he)),If(ae===!1||o!=null,'You provided the `flushSync` option to a router update, but you are not using the `<RouterProvider>` from `react-router/dom` so `ReactDOM.flushSync()` is unavailable.  Please update your app to `import { RouterProvider } from "react-router/dom"` and ensure you have `react-dom` installed as a dependency to use the `flushSync` option.');let fe=r.window!=null&&r.window.document!=null&&typeof r.window.document.startViewTransition=="function";if(If(z==null||fe,"You provided the `viewTransition` option to a router update, but you do not appear to be running in a DOM environment as `window.startViewTransition` is not available."),!z||!fe){o&&ae?o(()=>s(A)):R.startTransition(()=>s(A));return}if(o&&ae){o(()=>{S&&(m&&m.resolve(),S.skipTransition()),h({isTransitioning:!0,flushSync:!0,currentLocation:z.currentLocation,nextLocation:z.nextLocation})});let he=r.window.document.startViewTransition(()=>{o(()=>s(A))});he.finished.finally(()=>{o(()=>{g(void 0),E(void 0),d(void 0),h({isTransitioning:!1})})}),o(()=>E(he));return}S?(m&&m.resolve(),S.skipTransition(),N({state:A,currentLocation:z.currentLocation,nextLocation:z.nextLocation})):(d(A),h({isTransitioning:!0,flushSync:!1,currentLocation:z.currentLocation,nextLocation:z.nextLocation}))},[r.window,o,S,m]);R.useLayoutEffect(()=>r.subscribe(O),[r,O]),R.useEffect(()=>{p.isTransitioning&&!p.flushSync&&g(new Cg)},[p]),R.useEffect(()=>{if(m&&c&&r.window){let A=c,Y=m.promise,ae=r.window.document.startViewTransition(async()=>{R.startTransition(()=>s(A)),await Y});ae.finished.finally(()=>{g(void 0),E(void 0),d(void 0),h({isTransitioning:!1})}),E(ae)}},[c,m,r.window]),R.useEffect(()=>{m&&c&&l.location.key===c.location.key&&m.resolve()},[m,S,l.location,c]),R.useEffect(()=>{!p.isTransitioning&&x&&(d(x.state),h({isTransitioning:!0,flushSync:!1,currentLocation:x.currentLocation,nextLocation:x.nextLocation}),N(void 0))},[p.isTransitioning,x]);let I=R.useMemo(()=>({createHref:r.createHref,encodeLocation:r.encodeLocation,go:A=>r.navigate(A),push:(A,Y,ae)=>r.navigate(A,{state:Y,preventScrollReset:ae?.preventScrollReset}),replace:(A,Y,ae)=>r.navigate(A,{replace:!0,state:Y,preventScrollReset:ae?.preventScrollReset})}),[r]),D=r.basename||"/",te=R.useMemo(()=>({router:r,navigator:I,static:!1,basename:D}),[r,I,D]);return R.createElement(R.Fragment,null,R.createElement(Ar.Provider,{value:te},R.createElement(Ei.Provider,{value:l},R.createElement(Rp.Provider,{value:L.current},R.createElement(wu.Provider,{value:p},R.createElement(Pg,{basename:D,location:l.location,navigationType:l.historyAction,navigator:I},R.createElement(_g,{routes:r.routes,future:r.future,state:l})))))),null)}var _g=R.memo(Rg);function Rg({routes:r,future:o,state:l}){return cg(r,void 0,l,o)}function lw(r){return ug(r.context)}function Pg({basename:r="/",children:o=null,location:l,navigationType:s="POP",navigator:c,static:d=!1}){ze(!ki(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let p=r.replace(/^\/*/,"/"),h=R.useMemo(()=>({basename:p,navigator:c,static:d,future:{}}),[p,c,d]);typeof l=="string"&&(l=ir(l));let{pathname:m="/",search:g="",hash:S="",state:E=null,key:x="default"}=l,N=R.useMemo(()=>{let L=Ot(m,p);return L==null?null:{location:{pathname:L,search:g,hash:S,state:E,key:x},navigationType:s}},[p,m,g,S,E,x,s]);return ot(N!=null,`<Router basename="${p}"> is not able to match the URL "${m}${g}${S}" because it does not start with the basename, so the <Router> won't render anything.`),N==null?null:R.createElement(gn.Provider,{value:h},R.createElement(ea.Provider,{children:o,value:N}))}var jl="get",Vl="application/x-www-form-urlencoded";function ta(r){return r!=null&&typeof r.tagName=="string"}function zg(r){return ta(r)&&r.tagName.toLowerCase()==="button"}function Lg(r){return ta(r)&&r.tagName.toLowerCase()==="form"}function Tg(r){return ta(r)&&r.tagName.toLowerCase()==="input"}function $g(r){return!!(r.metaKey||r.altKey||r.ctrlKey||r.shiftKey)}function Ng(r,o){return r.button===0&&(!o||o==="_self")&&!$g(r)}var Fl=null;function Dg(){if(Fl===null)try{new FormData(document.createElement("form"),0),Fl=!1}catch{Fl=!0}return Fl}var Mg=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function Gs(r){return r!=null&&!Mg.has(r)?(ot(!1,`"${r}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Vl}"`),null):r}function Og(r,o){let l,s,c,d,p;if(Lg(r)){let h=r.getAttribute("action");s=h?Ot(h,o):null,l=r.getAttribute("method")||jl,c=Gs(r.getAttribute("enctype"))||Vl,d=new FormData(r)}else if(zg(r)||Tg(r)&&(r.type==="submit"||r.type==="image")){let h=r.form;if(h==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let m=r.getAttribute("formaction")||h.getAttribute("action");if(s=m?Ot(m,o):null,l=r.getAttribute("formmethod")||h.getAttribute("method")||jl,c=Gs(r.getAttribute("formenctype"))||Gs(h.getAttribute("enctype"))||Vl,d=new FormData(h,r),!Dg()){let{name:g,type:S,value:E}=r;if(S==="image"){let x=g?`${g}.`:"";d.append(`${x}x`,"0"),d.append(`${x}y`,"0")}else g&&d.append(g,E)}}else{if(ta(r))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');l=jl,s=null,c=Vl,p=r}return d&&c==="text/plain"&&(p=d,d=void 0),{action:s,method:l.toLowerCase(),encType:c,formData:d,body:p}}function Cu(r,o){if(r===!1||r===null||typeof r>"u")throw new Error(o)}async function Ag(r,o){if(r.id in o)return o[r.id];try{let l=await import(r.module);return o[r.id]=l,l}catch(l){return console.error(`Error loading route module \`${r.module}\`, reloading page...`),console.error(l),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function Fg(r){return r==null?!1:r.href==null?r.rel==="preload"&&typeof r.imageSrcSet=="string"&&typeof r.imageSizes=="string":typeof r.rel=="string"&&typeof r.href=="string"}async function Ig(r,o,l){let s=await Promise.all(r.map(async c=>{let d=o.routes[c.route.id];if(d){let p=await Ag(d,l);return p.links?p.links():[]}return[]}));return Hg(s.flat(1).filter(Fg).filter(c=>c.rel==="stylesheet"||c.rel==="preload").map(c=>c.rel==="stylesheet"?{...c,rel:"prefetch",as:"style"}:{...c,rel:"prefetch"}))}function Uf(r,o,l,s,c,d){let p=(m,g)=>l[g]?m.route.id!==l[g].route.id:!0,h=(m,g)=>l[g].pathname!==m.pathname||l[g].route.path?.endsWith("*")&&l[g].params["*"]!==m.params["*"];return d==="assets"?o.filter((m,g)=>p(m,g)||h(m,g)):d==="data"?o.filter((m,g)=>{let S=s.routes[m.route.id];if(!S||!S.hasLoader)return!1;if(p(m,g)||h(m,g))return!0;if(m.route.shouldRevalidate){let E=m.route.shouldRevalidate({currentUrl:new URL(c.pathname+c.search+c.hash,window.origin),currentParams:l[0]?.params||{},nextUrl:new URL(r,window.origin),nextParams:m.params,defaultShouldRevalidate:!0});if(typeof E=="boolean")return E}return!0}):[]}function Ug(r,o,{includeHydrateFallback:l}={}){return jg(r.map(s=>{let c=o.routes[s.route.id];if(!c)return[];let d=[c.module];return c.clientActionModule&&(d=d.concat(c.clientActionModule)),c.clientLoaderModule&&(d=d.concat(c.clientLoaderModule)),l&&c.hydrateFallbackModule&&(d=d.concat(c.hydrateFallbackModule)),c.imports&&(d=d.concat(c.imports)),d}).flat(1))}function jg(r){return[...new Set(r)]}function Vg(r){let o={},l=Object.keys(r).sort();for(let s of l)o[s]=r[s];return o}function Hg(r,o){let l=new Set;return new Set(o),r.reduce((s,c)=>{let d=JSON.stringify(Vg(c));return l.has(d)||(l.add(d),s.push({key:d,link:c})),s},[])}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var Bg=new Set([100,101,204,205]);function Wg(r,o){let l=typeof r=="string"?new URL(r,typeof window>"u"?"server://singlefetch/":window.location.origin):r;return l.pathname==="/"?l.pathname="_root.data":o&&Ot(l.pathname,o)==="/"?l.pathname=`${o.replace(/\/$/,"")}/_root.data`:l.pathname=`${l.pathname.replace(/\/$/,"")}.data`,l}function Dp(){let r=R.useContext(Ar);return Cu(r,"You must render this element inside a <DataRouterContext.Provider> element"),r}function Qg(){let r=R.useContext(Ei);return Cu(r,"You must render this element inside a <DataRouterStateContext.Provider> element"),r}var bu=R.createContext(void 0);bu.displayName="FrameworkContext";function Mp(){let r=R.useContext(bu);return Cu(r,"You must render this element inside a <HydratedRouter> element"),r}function Kg(r,o){let l=R.useContext(bu),[s,c]=R.useState(!1),[d,p]=R.useState(!1),{onFocus:h,onBlur:m,onMouseEnter:g,onMouseLeave:S,onTouchStart:E}=o,x=R.useRef(null);R.useEffect(()=>{if(r==="render"&&p(!0),r==="viewport"){let O=D=>{D.forEach(te=>{p(te.isIntersecting)})},I=new IntersectionObserver(O,{threshold:.5});return x.current&&I.observe(x.current),()=>{I.disconnect()}}},[r]),R.useEffect(()=>{if(s){let O=setTimeout(()=>{p(!0)},100);return()=>{clearTimeout(O)}}},[s]);let N=()=>{c(!0)},L=()=>{c(!1),p(!1)};return l?r!=="intent"?[d,x,{}]:[d,x,{onFocus:ci(h,N),onBlur:ci(m,L),onMouseEnter:ci(g,N),onMouseLeave:ci(S,L),onTouchStart:ci(E,N)}]:[!1,x,{}]}function ci(r,o){return l=>{r&&r(l),l.defaultPrevented||o(l)}}function Gg({page:r,...o}){let{router:l}=Dp(),s=R.useMemo(()=>Ln(l.routes,r,l.basename),[l.routes,r,l.basename]);return s?R.createElement(qg,{page:r,matches:s,...o}):null}function Yg(r){let{manifest:o,routeModules:l}=Mp(),[s,c]=R.useState([]);return R.useEffect(()=>{let d=!1;return Ig(r,o,l).then(p=>{d||c(p)}),()=>{d=!0}},[r,o,l]),s}function qg({page:r,matches:o,...l}){let s=lr(),{manifest:c,routeModules:d}=Mp(),{basename:p}=Dp(),{loaderData:h,matches:m}=Qg(),g=R.useMemo(()=>Uf(r,o,m,c,s,"data"),[r,o,m,c,s]),S=R.useMemo(()=>Uf(r,o,m,c,s,"assets"),[r,o,m,c,s]),E=R.useMemo(()=>{if(r===s.pathname+s.search+s.hash)return[];let L=new Set,O=!1;if(o.forEach(D=>{let te=c.routes[D.route.id];!te||!te.hasLoader||(!g.some(A=>A.route.id===D.route.id)&&D.route.id in h&&d[D.route.id]?.shouldRevalidate||te.hasClientLoader?O=!0:L.add(D.route.id))}),L.size===0)return[];let I=Wg(r,p);return O&&L.size>0&&I.searchParams.set("_routes",o.filter(D=>L.has(D.route.id)).map(D=>D.route.id).join(",")),[I.pathname+I.search]},[p,h,s,c,g,o,r,d]),x=R.useMemo(()=>Ug(S,c),[S,c]),N=Yg(S);return R.createElement(R.Fragment,null,E.map(L=>R.createElement("link",{key:L,rel:"prefetch",as:"fetch",href:L,...l})),x.map(L=>R.createElement("link",{key:L,rel:"modulepreload",href:L,...l})),N.map(({key:L,link:O})=>R.createElement("link",{key:L,...O})))}function Xg(...r){return o=>{r.forEach(l=>{typeof l=="function"?l(o):l!=null&&(l.current=o)})}}var Op=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{Op&&(window.__reactRouterVersion="7.6.3")}catch{}function Jg(r,o){return jv({basename:o?.basename,unstable_getContext:o?.unstable_getContext,future:o?.future,history:sv({window:o?.window}),hydrationData:o?.hydrationData||Zg(),routes:r,mapRouteProperties:Eg,hydrationRouteProperties:kg,dataStrategy:o?.dataStrategy,patchRoutesOnNavigation:o?.patchRoutesOnNavigation,window:o?.window}).initialize()}function Zg(){let r=window?.__staticRouterHydrationData;return r&&r.errors&&(r={...r,errors:ey(r.errors)}),r}function ey(r){if(!r)return null;let o=Object.entries(r),l={};for(let[s,c]of o)if(c&&c.__type==="RouteErrorResponse")l[s]=new Ql(c.status,c.statusText,c.data,c.internal===!0);else if(c&&c.__type==="Error"){if(c.__subType){let d=window[c.__subType];if(typeof d=="function")try{let p=new d(c.message);p.stack="",l[s]=p}catch{}}if(l[s]==null){let d=new Error(c.message);d.stack="",l[s]=d}}else l[s]=c;return l}var Ap=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Fp=R.forwardRef(function({onClick:o,discover:l="render",prefetch:s="none",relative:c,reloadDocument:d,replace:p,state:h,target:m,to:g,preventScrollReset:S,viewTransition:E,...x},N){let{basename:L}=R.useContext(gn),O=typeof g=="string"&&Ap.test(g),I,D=!1;if(typeof g=="string"&&O&&(I=g,Op))try{let ce=new URL(window.location.href),Pe=g.startsWith("//")?new URL(ce.protocol+g):new URL(g),Ge=Ot(Pe.pathname,L);Pe.origin===ce.origin&&Ge!=null?g=Ge+Pe.search+Pe.hash:D=!0}catch{ot(!1,`<Link to="${g}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let te=Pp(g,{relative:c}),[A,Y,ae]=Kg(s,x),z=oy(g,{replace:p,state:h,target:m,preventScrollReset:S,relative:c,viewTransition:E});function fe(ce){o&&o(ce),ce.defaultPrevented||z(ce)}let he=R.createElement("a",{...x,...ae,href:I||te,onClick:D||d?o:fe,ref:Xg(N,Y),target:m,"data-discover":!O&&l==="render"?"true":void 0});return A&&!O?R.createElement(R.Fragment,null,he,R.createElement(Gg,{page:te})):he});Fp.displayName="Link";var ty=R.forwardRef(function({"aria-current":o="page",caseSensitive:l=!1,className:s="",end:c=!1,style:d,to:p,viewTransition:h,children:m,...g},S){let E=Ci(p,{relative:g.relative}),x=lr(),N=R.useContext(Ei),{navigator:L,basename:O}=R.useContext(gn),I=N!=null&&uy(E)&&h===!0,D=L.encodeLocation?L.encodeLocation(E).pathname:E.pathname,te=x.pathname,A=N&&N.navigation&&N.navigation.location?N.navigation.location.pathname:null;l||(te=te.toLowerCase(),A=A?A.toLowerCase():null,D=D.toLowerCase()),A&&O&&(A=Ot(A,O)||A);const Y=D!=="/"&&D.endsWith("/")?D.length-1:D.length;let ae=te===D||!c&&te.startsWith(D)&&te.charAt(Y)==="/",z=A!=null&&(A===D||!c&&A.startsWith(D)&&A.charAt(D.length)==="/"),fe={isActive:ae,isPending:z,isTransitioning:I},he=ae?o:void 0,ce;typeof s=="function"?ce=s(fe):ce=[s,ae?"active":null,z?"pending":null,I?"transitioning":null].filter(Boolean).join(" ");let Pe=typeof d=="function"?d(fe):d;return R.createElement(Fp,{...g,"aria-current":he,className:ce,ref:S,style:Pe,to:p,viewTransition:h},typeof m=="function"?m(fe):m)});ty.displayName="NavLink";var ny=R.forwardRef(({discover:r="render",fetcherKey:o,navigate:l,reloadDocument:s,replace:c,state:d,method:p=jl,action:h,onSubmit:m,relative:g,preventScrollReset:S,viewTransition:E,...x},N)=>{let L=ay(),O=sy(h,{relative:g}),I=p.toLowerCase()==="get"?"get":"post",D=typeof h=="string"&&Ap.test(h),te=A=>{if(m&&m(A),A.defaultPrevented)return;A.preventDefault();let Y=A.nativeEvent.submitter,ae=Y?.getAttribute("formmethod")||p;L(Y||A.currentTarget,{fetcherKey:o,method:ae,navigate:l,replace:c,state:d,relative:g,preventScrollReset:S,viewTransition:E})};return R.createElement("form",{ref:N,method:I,action:O,onSubmit:s?m:te,...x,"data-discover":!D&&r==="render"?"true":void 0})});ny.displayName="Form";function ry(r){return`${r} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function Ip(r){let o=R.useContext(Ar);return ze(o,ry(r)),o}function oy(r,{target:o,replace:l,state:s,preventScrollReset:c,relative:d,viewTransition:p}={}){let h=Su(),m=lr(),g=Ci(r,{relative:d});return R.useCallback(S=>{if(Ng(S,o)){S.preventDefault();let E=l!==void 0?l:or(m)===or(g);h(r,{replace:E,state:s,preventScrollReset:c,relative:d,viewTransition:p})}},[m,h,g,l,s,o,r,c,d,p])}var iy=0,ly=()=>`__${String(++iy)}__`;function ay(){let{router:r}=Ip("useSubmit"),{basename:o}=R.useContext(gn),l=gg();return R.useCallback(async(s,c={})=>{let{action:d,method:p,encType:h,formData:m,body:g}=Og(s,o);if(c.navigate===!1){let S=c.fetcherKey||ly();await r.fetch(S,l,c.action||d,{preventScrollReset:c.preventScrollReset,formData:m,body:g,formMethod:c.method||p,formEncType:c.encType||h,flushSync:c.flushSync})}else await r.navigate(c.action||d,{preventScrollReset:c.preventScrollReset,formData:m,body:g,formMethod:c.method||p,formEncType:c.encType||h,replace:c.replace,state:c.state,fromRouteId:l,flushSync:c.flushSync,viewTransition:c.viewTransition})},[r,o,l])}function sy(r,{relative:o}={}){let{basename:l}=R.useContext(gn),s=R.useContext(yn);ze(s,"useFormAction must be used inside a RouteContext");let[c]=s.matches.slice(-1),d={...Ci(r||".",{relative:o})},p=lr();if(r==null){d.search=p.search;let h=new URLSearchParams(d.search),m=h.getAll("index");if(m.some(S=>S==="")){h.delete("index"),m.filter(E=>E).forEach(E=>h.append("index",E));let S=h.toString();d.search=S?`?${S}`:""}}return(!r||r===".")&&c.route.index&&(d.search=d.search?d.search.replace(/^\?/,"?index&"):"?index"),l!=="/"&&(d.pathname=d.pathname==="/"?l:vn([l,d.pathname])),or(d)}function uy(r,o={}){let l=R.useContext(wu);ze(l!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:s}=Ip("useViewTransitionState"),c=Ci(r,{relative:o.relative});if(!l.isTransitioning)return!1;let d=Ot(l.currentLocation.pathname,s)||l.currentLocation.pathname,p=Ot(l.nextLocation.pathname,s)||l.nextLocation.pathname;return Wl(c.pathname,p)!=null||Wl(c.pathname,d)!=null}[...Bg];const cy="modulepreload",dy=function(r,o){return new URL(r,o).href},jf={},su=function(o,l,s){let c=Promise.resolve();if(l&&l.length>0){let p=function(S){return Promise.all(S.map(E=>Promise.resolve(E).then(x=>({status:"fulfilled",value:x}),x=>({status:"rejected",reason:x}))))};const h=document.getElementsByTagName("link"),m=document.querySelector("meta[property=csp-nonce]"),g=m?.nonce||m?.getAttribute("nonce");c=p(l.map(S=>{if(S=dy(S,s),S in jf)return;jf[S]=!0;const E=S.endsWith(".css"),x=E?'[rel="stylesheet"]':"";if(!!s)for(let O=h.length-1;O>=0;O--){const I=h[O];if(I.href===S&&(!E||I.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${S}"]${x}`))return;const L=document.createElement("link");if(L.rel=E?"stylesheet":cy,E||(L.as="script"),L.crossOrigin="",L.href=S,g&&L.setAttribute("nonce",g),document.head.appendChild(L),E)return new Promise((O,I)=>{L.addEventListener("load",O),L.addEventListener("error",()=>I(new Error(`Unable to preload CSS for ${S}`)))})}))}function d(p){const h=new Event("vite:preloadError",{cancelable:!0});if(h.payload=p,window.dispatchEvent(h),!h.defaultPrevented)throw p}return c.then(p=>{for(const h of p||[])h.status==="rejected"&&d(h.reason);return o().catch(d)})};var Ys,st;(function(r){r.CONNECTED="connected",r.LOADING="loading",r.RECONNECTING="reconnecting",r.CONNECTION_LOST="connection-lost"})(st||(st={}));class fy{constructor(o){this.stateChangeListeners=new Set,this.loadingCount=0,this.connectionState=o,this.serviceWorkerMessageListener=this.serviceWorkerMessageListener.bind(this),navigator.serviceWorker&&(navigator.serviceWorker.addEventListener("message",this.serviceWorkerMessageListener),navigator.serviceWorker.ready.then(l=>{var s;(s=l.active)===null||s===void 0||s.postMessage({method:"Vaadin.ServiceWorker.isConnectionLost",id:"Vaadin.ServiceWorker.isConnectionLost"})}))}addStateChangeListener(o){this.stateChangeListeners.add(o)}removeStateChangeListener(o){this.stateChangeListeners.delete(o)}loadingStarted(){this.state=st.LOADING,this.loadingCount+=1}loadingFinished(){this.decreaseLoadingCount(st.CONNECTED)}loadingFailed(){this.decreaseLoadingCount(st.CONNECTION_LOST)}decreaseLoadingCount(o){this.loadingCount>0&&(this.loadingCount-=1,this.loadingCount===0&&(this.state=o))}get state(){return this.connectionState}set state(o){if(o!==this.connectionState){const l=this.connectionState;this.connectionState=o,this.loadingCount=0;for(const s of this.stateChangeListeners)s(l,this.connectionState)}}get online(){return this.connectionState===st.CONNECTED||this.connectionState===st.LOADING}get offline(){return!this.online}serviceWorkerMessageListener(o){typeof o.data=="object"&&o.data.id==="Vaadin.ServiceWorker.isConnectionLost"&&(o.data.result===!0&&(this.state=st.CONNECTION_LOST),navigator.serviceWorker.removeEventListener("message",this.serviceWorkerMessageListener))}}const py=r=>!!(r==="localhost"||r==="[::1]"||/^127\.\d+\.\d+\.\d+$/u.exec(r)),Il=window;if(!(!((Ys=Il.Vaadin)===null||Ys===void 0)&&Ys.connectionState)){let r;py(window.location.hostname)?r=!0:r=navigator.onLine,Il.Vaadin||(Il.Vaadin={}),Il.Vaadin.connectionState=new fy(r?st.CONNECTED:st.CONNECTION_LOST)}function Bt(r,o,l,s){var c=arguments.length,d=c<3?o:s===null?s=Object.getOwnPropertyDescriptor(o,l):s,p;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")d=Reflect.decorate(r,o,l,s);else for(var h=r.length-1;h>=0;h--)(p=r[h])&&(d=(c<3?p(d):c>3?p(o,l,d):p(o,l))||d);return c>3&&d&&Object.defineProperty(o,l,d),d}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Hl=globalThis,_u=Hl.ShadowRoot&&(Hl.ShadyCSS===void 0||Hl.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ru=Symbol(),Vf=new WeakMap;let Pu=class{constructor(o,l,s){if(this._$cssResult$=!0,s!==Ru)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=o,this.t=l}get styleSheet(){let o=this.o;const l=this.t;if(_u&&o===void 0){const s=l!==void 0&&l.length===1;s&&(o=Vf.get(l)),o===void 0&&((this.o=o=new CSSStyleSheet).replaceSync(this.cssText),s&&Vf.set(l,o))}return o}toString(){return this.cssText}};const Up=r=>new Pu(typeof r=="string"?r:r+"",void 0,Ru),et=(r,...o)=>{const l=r.length===1?r[0]:o.reduce(((s,c,d)=>s+(p=>{if(p._$cssResult$===!0)return p.cssText;if(typeof p=="number")return p;throw Error("Value passed to 'css' function must be a 'css' function result: "+p+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(c)+r[d+1]),r[0]);return new Pu(l,r,Ru)},jp=(r,o)=>{if(_u)r.adoptedStyleSheets=o.map((l=>l instanceof CSSStyleSheet?l:l.styleSheet));else for(const l of o){const s=document.createElement("style"),c=Hl.litNonce;c!==void 0&&s.setAttribute("nonce",c),s.textContent=l.cssText,r.appendChild(s)}},Hf=_u?r=>r:r=>r instanceof CSSStyleSheet?(o=>{let l="";for(const s of o.cssRules)l+=s.cssText;return Up(l)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:my,defineProperty:hy,getOwnPropertyDescriptor:vy,getOwnPropertyNames:gy,getOwnPropertySymbols:yy,getPrototypeOf:wy}=Object,na=globalThis,Bf=na.trustedTypes,xy=Bf?Bf.emptyScript:"",Sy=na.reactiveElementPolyfillSupport,hi=(r,o)=>r,Gl={toAttribute(r,o){switch(o){case Boolean:r=r?xy:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,o){let l=r;switch(o){case Boolean:l=r!==null;break;case Number:l=r===null?null:Number(r);break;case Object:case Array:try{l=JSON.parse(r)}catch{l=null}}return l}},zu=(r,o)=>!my(r,o),Wf={attribute:!0,type:String,converter:Gl,reflect:!1,useDefault:!1,hasChanged:zu};Symbol.metadata??=Symbol("metadata"),na.litPropertyMetadata??=new WeakMap;let ho=class extends HTMLElement{static addInitializer(o){this._$Ei(),(this.l??=[]).push(o)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(o,l=Wf){if(l.state&&(l.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(o)&&((l=Object.create(l)).wrapped=!0),this.elementProperties.set(o,l),!l.noAccessor){const s=Symbol(),c=this.getPropertyDescriptor(o,s,l);c!==void 0&&hy(this.prototype,o,c)}}static getPropertyDescriptor(o,l,s){const{get:c,set:d}=vy(this.prototype,o)??{get(){return this[l]},set(p){this[l]=p}};return{get:c,set(p){const h=c?.call(this);d?.call(this,p),this.requestUpdate(o,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(o){return this.elementProperties.get(o)??Wf}static _$Ei(){if(this.hasOwnProperty(hi("elementProperties")))return;const o=wy(this);o.finalize(),o.l!==void 0&&(this.l=[...o.l]),this.elementProperties=new Map(o.elementProperties)}static finalize(){if(this.hasOwnProperty(hi("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(hi("properties"))){const l=this.properties,s=[...gy(l),...yy(l)];for(const c of s)this.createProperty(c,l[c])}const o=this[Symbol.metadata];if(o!==null){const l=litPropertyMetadata.get(o);if(l!==void 0)for(const[s,c]of l)this.elementProperties.set(s,c)}this._$Eh=new Map;for(const[l,s]of this.elementProperties){const c=this._$Eu(l,s);c!==void 0&&this._$Eh.set(c,l)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(o){const l=[];if(Array.isArray(o)){const s=new Set(o.flat(1/0).reverse());for(const c of s)l.unshift(Hf(c))}else o!==void 0&&l.push(Hf(o));return l}static _$Eu(o,l){const s=l.attribute;return s===!1?void 0:typeof s=="string"?s:typeof o=="string"?o.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((o=>this.enableUpdating=o)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((o=>o(this)))}addController(o){(this._$EO??=new Set).add(o),this.renderRoot!==void 0&&this.isConnected&&o.hostConnected?.()}removeController(o){this._$EO?.delete(o)}_$E_(){const o=new Map,l=this.constructor.elementProperties;for(const s of l.keys())this.hasOwnProperty(s)&&(o.set(s,this[s]),delete this[s]);o.size>0&&(this._$Ep=o)}createRenderRoot(){const o=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return jp(o,this.constructor.elementStyles),o}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((o=>o.hostConnected?.()))}enableUpdating(o){}disconnectedCallback(){this._$EO?.forEach((o=>o.hostDisconnected?.()))}attributeChangedCallback(o,l,s){this._$AK(o,s)}_$ET(o,l){const s=this.constructor.elementProperties.get(o),c=this.constructor._$Eu(o,s);if(c!==void 0&&s.reflect===!0){const d=(s.converter?.toAttribute!==void 0?s.converter:Gl).toAttribute(l,s.type);this._$Em=o,d==null?this.removeAttribute(c):this.setAttribute(c,d),this._$Em=null}}_$AK(o,l){const s=this.constructor,c=s._$Eh.get(o);if(c!==void 0&&this._$Em!==c){const d=s.getPropertyOptions(c),p=typeof d.converter=="function"?{fromAttribute:d.converter}:d.converter?.fromAttribute!==void 0?d.converter:Gl;this._$Em=c;const h=p.fromAttribute(l,d.type);this[c]=h??this._$Ej?.get(c)??h,this._$Em=null}}requestUpdate(o,l,s){if(o!==void 0){const c=this.constructor,d=this[o];if(s??=c.getPropertyOptions(o),!((s.hasChanged??zu)(d,l)||s.useDefault&&s.reflect&&d===this._$Ej?.get(o)&&!this.hasAttribute(c._$Eu(o,s))))return;this.C(o,l,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(o,l,{useDefault:s,reflect:c,wrapped:d},p){s&&!(this._$Ej??=new Map).has(o)&&(this._$Ej.set(o,p??l??this[o]),d!==!0||p!==void 0)||(this._$AL.has(o)||(this.hasUpdated||s||(l=void 0),this._$AL.set(o,l)),c===!0&&this._$Em!==o&&(this._$Eq??=new Set).add(o))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(l){Promise.reject(l)}const o=this.scheduleUpdate();return o!=null&&await o,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[c,d]of this._$Ep)this[c]=d;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[c,d]of s){const{wrapped:p}=d,h=this[c];p!==!0||this._$AL.has(c)||h===void 0||this.C(c,void 0,d,h)}}let o=!1;const l=this._$AL;try{o=this.shouldUpdate(l),o?(this.willUpdate(l),this._$EO?.forEach((s=>s.hostUpdate?.())),this.update(l)):this._$EM()}catch(s){throw o=!1,this._$EM(),s}o&&this._$AE(l)}willUpdate(o){}_$AE(o){this._$EO?.forEach((l=>l.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(o)),this.updated(o)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(o){return!0}update(o){this._$Eq&&=this._$Eq.forEach((l=>this._$ET(l,this[l]))),this._$EM()}updated(o){}firstUpdated(o){}};ho.elementStyles=[],ho.shadowRootOptions={mode:"open"},ho[hi("elementProperties")]=new Map,ho[hi("finalized")]=new Map,Sy?.({ReactiveElement:ho}),(na.reactiveElementVersions??=[]).push("2.1.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lu=globalThis,Yl=Lu.trustedTypes,Qf=Yl?Yl.createPolicy("lit-html",{createHTML:r=>r}):void 0,Vp="$lit$",rr=`lit$${Math.random().toFixed(9).slice(2)}$`,Hp="?"+rr,Ey=`<${Hp}>`,Mr=document,wi=()=>Mr.createComment(""),xi=r=>r===null||typeof r!="object"&&typeof r!="function",Tu=Array.isArray,ky=r=>Tu(r)||typeof r?.[Symbol.iterator]=="function",qs=`[ 	
\f\r]`,di=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Kf=/-->/g,Gf=/>/g,Pr=RegExp(`>|${qs}(?:([^\\s"'>=/]+)(${qs}*=${qs}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yf=/'/g,qf=/"/g,Bp=/^(?:script|style|textarea|title)$/i,Wp=r=>(o,...l)=>({_$litType$:r,strings:o,values:l}),Cy=Wp(1),uw=Wp(2),Or=Symbol.for("lit-noChange"),mt=Symbol.for("lit-nothing"),Xf=new WeakMap,$r=Mr.createTreeWalker(Mr,129);function Qp(r,o){if(!Tu(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return Qf!==void 0?Qf.createHTML(o):o}const by=(r,o)=>{const l=r.length-1,s=[];let c,d=o===2?"<svg>":o===3?"<math>":"",p=di;for(let h=0;h<l;h++){const m=r[h];let g,S,E=-1,x=0;for(;x<m.length&&(p.lastIndex=x,S=p.exec(m),S!==null);)x=p.lastIndex,p===di?S[1]==="!--"?p=Kf:S[1]!==void 0?p=Gf:S[2]!==void 0?(Bp.test(S[2])&&(c=RegExp("</"+S[2],"g")),p=Pr):S[3]!==void 0&&(p=Pr):p===Pr?S[0]===">"?(p=c??di,E=-1):S[1]===void 0?E=-2:(E=p.lastIndex-S[2].length,g=S[1],p=S[3]===void 0?Pr:S[3]==='"'?qf:Yf):p===qf||p===Yf?p=Pr:p===Kf||p===Gf?p=di:(p=Pr,c=void 0);const N=p===Pr&&r[h+1].startsWith("/>")?" ":"";d+=p===di?m+Ey:E>=0?(s.push(g),m.slice(0,E)+Vp+m.slice(E)+rr+N):m+rr+(E===-2?h:N)}return[Qp(r,d+(r[l]||"<?>")+(o===2?"</svg>":o===3?"</math>":"")),s]};class Si{constructor({strings:o,_$litType$:l},s){let c;this.parts=[];let d=0,p=0;const h=o.length-1,m=this.parts,[g,S]=by(o,l);if(this.el=Si.createElement(g,s),$r.currentNode=this.el.content,l===2||l===3){const E=this.el.content.firstChild;E.replaceWith(...E.childNodes)}for(;(c=$r.nextNode())!==null&&m.length<h;){if(c.nodeType===1){if(c.hasAttributes())for(const E of c.getAttributeNames())if(E.endsWith(Vp)){const x=S[p++],N=c.getAttribute(E).split(rr),L=/([.?@])?(.*)/.exec(x);m.push({type:1,index:d,name:L[2],strings:N,ctor:L[1]==="."?Ry:L[1]==="?"?Py:L[1]==="@"?zy:ra}),c.removeAttribute(E)}else E.startsWith(rr)&&(m.push({type:6,index:d}),c.removeAttribute(E));if(Bp.test(c.tagName)){const E=c.textContent.split(rr),x=E.length-1;if(x>0){c.textContent=Yl?Yl.emptyScript:"";for(let N=0;N<x;N++)c.append(E[N],wi()),$r.nextNode(),m.push({type:2,index:++d});c.append(E[x],wi())}}}else if(c.nodeType===8)if(c.data===Hp)m.push({type:2,index:d});else{let E=-1;for(;(E=c.data.indexOf(rr,E+1))!==-1;)m.push({type:7,index:d}),E+=rr.length-1}d++}}static createElement(o,l){const s=Mr.createElement("template");return s.innerHTML=o,s}}function wo(r,o,l=r,s){if(o===Or)return o;let c=s!==void 0?l._$Co?.[s]:l._$Cl;const d=xi(o)?void 0:o._$litDirective$;return c?.constructor!==d&&(c?._$AO?.(!1),d===void 0?c=void 0:(c=new d(r),c._$AT(r,l,s)),s!==void 0?(l._$Co??=[])[s]=c:l._$Cl=c),c!==void 0&&(o=wo(r,c._$AS(r,o.values),c,s)),o}class _y{constructor(o,l){this._$AV=[],this._$AN=void 0,this._$AD=o,this._$AM=l}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(o){const{el:{content:l},parts:s}=this._$AD,c=(o?.creationScope??Mr).importNode(l,!0);$r.currentNode=c;let d=$r.nextNode(),p=0,h=0,m=s[0];for(;m!==void 0;){if(p===m.index){let g;m.type===2?g=new bi(d,d.nextSibling,this,o):m.type===1?g=new m.ctor(d,m.name,m.strings,this,o):m.type===6&&(g=new Ly(d,this,o)),this._$AV.push(g),m=s[++h]}p!==m?.index&&(d=$r.nextNode(),p++)}return $r.currentNode=Mr,c}p(o){let l=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(o,s,l),l+=s.strings.length-2):s._$AI(o[l])),l++}}class bi{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(o,l,s,c){this.type=2,this._$AH=mt,this._$AN=void 0,this._$AA=o,this._$AB=l,this._$AM=s,this.options=c,this._$Cv=c?.isConnected??!0}get parentNode(){let o=this._$AA.parentNode;const l=this._$AM;return l!==void 0&&o?.nodeType===11&&(o=l.parentNode),o}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(o,l=this){o=wo(this,o,l),xi(o)?o===mt||o==null||o===""?(this._$AH!==mt&&this._$AR(),this._$AH=mt):o!==this._$AH&&o!==Or&&this._(o):o._$litType$!==void 0?this.$(o):o.nodeType!==void 0?this.T(o):ky(o)?this.k(o):this._(o)}O(o){return this._$AA.parentNode.insertBefore(o,this._$AB)}T(o){this._$AH!==o&&(this._$AR(),this._$AH=this.O(o))}_(o){this._$AH!==mt&&xi(this._$AH)?this._$AA.nextSibling.data=o:this.T(Mr.createTextNode(o)),this._$AH=o}$(o){const{values:l,_$litType$:s}=o,c=typeof s=="number"?this._$AC(o):(s.el===void 0&&(s.el=Si.createElement(Qp(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===c)this._$AH.p(l);else{const d=new _y(c,this),p=d.u(this.options);d.p(l),this.T(p),this._$AH=d}}_$AC(o){let l=Xf.get(o.strings);return l===void 0&&Xf.set(o.strings,l=new Si(o)),l}k(o){Tu(this._$AH)||(this._$AH=[],this._$AR());const l=this._$AH;let s,c=0;for(const d of o)c===l.length?l.push(s=new bi(this.O(wi()),this.O(wi()),this,this.options)):s=l[c],s._$AI(d),c++;c<l.length&&(this._$AR(s&&s._$AB.nextSibling,c),l.length=c)}_$AR(o=this._$AA.nextSibling,l){for(this._$AP?.(!1,!0,l);o!==this._$AB;){const s=o.nextSibling;o.remove(),o=s}}setConnected(o){this._$AM===void 0&&(this._$Cv=o,this._$AP?.(o))}}let ra=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(o,l,s,c,d){this.type=1,this._$AH=mt,this._$AN=void 0,this.element=o,this.name=l,this._$AM=c,this.options=d,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=mt}_$AI(o,l=this,s,c){const d=this.strings;let p=!1;if(d===void 0)o=wo(this,o,l,0),p=!xi(o)||o!==this._$AH&&o!==Or,p&&(this._$AH=o);else{const h=o;let m,g;for(o=d[0],m=0;m<d.length-1;m++)g=wo(this,h[s+m],l,m),g===Or&&(g=this._$AH[m]),p||=!xi(g)||g!==this._$AH[m],g===mt?o=mt:o!==mt&&(o+=(g??"")+d[m+1]),this._$AH[m]=g}p&&!c&&this.j(o)}j(o){o===mt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,o??"")}};class Ry extends ra{constructor(){super(...arguments),this.type=3}j(o){this.element[this.name]=o===mt?void 0:o}}class Py extends ra{constructor(){super(...arguments),this.type=4}j(o){this.element.toggleAttribute(this.name,!!o&&o!==mt)}}class zy extends ra{constructor(o,l,s,c,d){super(o,l,s,c,d),this.type=5}_$AI(o,l=this){if((o=wo(this,o,l,0)??mt)===Or)return;const s=this._$AH,c=o===mt&&s!==mt||o.capture!==s.capture||o.once!==s.once||o.passive!==s.passive,d=o!==mt&&(s===mt||c);c&&this.element.removeEventListener(this.name,this,s),d&&this.element.addEventListener(this.name,this,o),this._$AH=o}handleEvent(o){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,o):this._$AH.handleEvent(o)}}class Ly{constructor(o,l,s){this.element=o,this.type=6,this._$AN=void 0,this._$AM=l,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(o){wo(this,o)}}const Ty=Lu.litHtmlPolyfillSupport;Ty?.(Si,bi),(Lu.litHtmlVersions??=[]).push("3.3.1");const $y=(r,o,l)=>{const s=l?.renderBefore??o;let c=s._$litPart$;if(c===void 0){const d=l?.renderBefore??null;s._$litPart$=c=new bi(o.insertBefore(wi(),d),d,void 0,l??{})}return c._$AI(r),c};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $u=globalThis;let Dr=class extends ho{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const o=super.createRenderRoot();return this.renderOptions.renderBefore??=o.firstChild,o}update(o){const l=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(o),this._$Do=$y(l,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return Or}};Dr._$litElement$=!0,Dr.finalized=!0,$u.litElementHydrateSupport?.({LitElement:Dr});const Ny=$u.litElementPolyfillSupport;Ny?.({LitElement:Dr});($u.litElementVersions??=[]).push("4.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Dy={attribute:!0,type:String,converter:Gl,reflect:!1,hasChanged:zu},My=(r=Dy,o,l)=>{const{kind:s,metadata:c}=l;let d=globalThis.litPropertyMetadata.get(c);if(d===void 0&&globalThis.litPropertyMetadata.set(c,d=new Map),s==="setter"&&((r=Object.create(r)).wrapped=!0),d.set(l.name,r),s==="accessor"){const{name:p}=l;return{set(h){const m=o.get.call(this);o.set.call(this,h),this.requestUpdate(p,m,r)},init(h){return h!==void 0&&this.C(p,void 0,r,h),h}}}if(s==="setter"){const{name:p}=l;return function(h){const m=this[p];o.call(this,h),this.requestUpdate(p,m,r)}}throw Error("Unsupported decorator location: "+s)};function Wt(r){return(o,l)=>typeof l=="object"?My(r,o,l):((s,c,d)=>{const p=c.hasOwnProperty(d);return c.constructor.createProperty(d,s),p?Object.getOwnPropertyDescriptor(c,d):void 0})(r,o,l)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Oy={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4},Ay=r=>(...o)=>({_$litDirective$:r,values:o});let Fy=class{constructor(o){}get _$AU(){return this._$AM._$AU}_$AT(o,l,s){this._$Ct=o,this._$AM=l,this._$Ci=s}_$AS(o,l){return this.update(o,l)}update(o,l){return this.render(...l)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Iy=Ay(class extends Fy{constructor(r){if(super(r),r.type!==Oy.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter((o=>r[o])).join(" ")+" "}update(r,[o]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter((s=>s!==""))));for(const s in o)o[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(o)}const l=r.element.classList;for(const s of this.st)s in o||(l.remove(s),this.st.delete(s));for(const s in o){const c=!!o[s];c===this.st.has(s)||this.nt?.has(s)||(c?(l.add(s),this.st.add(s)):(l.remove(s),this.st.delete(s)))}return Or}}),Xs="css-loading-indicator";var cn;(function(r){r.IDLE="",r.FIRST="first",r.SECOND="second",r.THIRD="third"})(cn||(cn={}));class ht extends Dr{static create(){var o,l;const s=window;return!((o=s.Vaadin)===null||o===void 0)&&o.connectionIndicator||(s.Vaadin||(s.Vaadin={}),s.Vaadin.connectionIndicator=document.createElement("vaadin-connection-indicator"),document.body.appendChild(s.Vaadin.connectionIndicator)),(l=s.Vaadin)===null||l===void 0?void 0:l.connectionIndicator}constructor(){super(),this.firstDelay=450,this.secondDelay=1500,this.thirdDelay=5e3,this.expandedDuration=2e3,this.onlineText="Online",this.offlineText="Connection lost",this.reconnectingText="Connection lost, trying to reconnect...",this.offline=!1,this.reconnecting=!1,this.expanded=!1,this.loading=!1,this.loadingBarState=cn.IDLE,this.applyDefaultThemeState=!0,this.firstTimeout=0,this.secondTimeout=0,this.thirdTimeout=0,this.expandedTimeout=0,this.lastMessageState=st.CONNECTED,this.connectionStateListener=()=>{this.expanded=this.updateConnectionState(),this.expandedTimeout=this.timeoutFor(this.expandedTimeout,this.expanded,()=>{this.expanded=!1},this.expandedDuration)}}render(){return Cy`
      <div class="v-loading-indicator ${this.loadingBarState}" style=${this.getLoadingBarStyle()}></div>

      <div
        class="v-status-message ${Iy({active:this.reconnecting})}"
      >
        <span class="text"> ${this.renderMessage()} </span>
      </div>
    `}connectedCallback(){var o;super.connectedCallback();const l=window;!((o=l.Vaadin)===null||o===void 0)&&o.connectionState&&(this.connectionStateStore=l.Vaadin.connectionState,this.connectionStateStore.addStateChangeListener(this.connectionStateListener),this.updateConnectionState()),this.updateTheme()}disconnectedCallback(){super.disconnectedCallback(),this.connectionStateStore&&this.connectionStateStore.removeStateChangeListener(this.connectionStateListener),this.updateTheme()}get applyDefaultTheme(){return this.applyDefaultThemeState}set applyDefaultTheme(o){o!==this.applyDefaultThemeState&&(this.applyDefaultThemeState=o,this.updateTheme())}createRenderRoot(){return this}updateConnectionState(){var o;const l=(o=this.connectionStateStore)===null||o===void 0?void 0:o.state;return this.offline=l===st.CONNECTION_LOST,this.reconnecting=l===st.RECONNECTING,this.updateLoading(l===st.LOADING),this.loading?!1:l!==this.lastMessageState?(this.lastMessageState=l,!0):!1}updateLoading(o){this.loading=o,this.loadingBarState=cn.IDLE,this.firstTimeout=this.timeoutFor(this.firstTimeout,o,()=>{this.loadingBarState=cn.FIRST},this.firstDelay),this.secondTimeout=this.timeoutFor(this.secondTimeout,o,()=>{this.loadingBarState=cn.SECOND},this.secondDelay),this.thirdTimeout=this.timeoutFor(this.thirdTimeout,o,()=>{this.loadingBarState=cn.THIRD},this.thirdDelay)}renderMessage(){return this.reconnecting?this.reconnectingText:this.offline?this.offlineText:this.onlineText}updateTheme(){if(this.applyDefaultThemeState&&this.isConnected){if(!document.getElementById(Xs)){const o=document.createElement("style");o.id=Xs,o.textContent=this.getDefaultStyle(),document.head.appendChild(o)}}else{const o=document.getElementById(Xs);o&&document.head.removeChild(o)}}getDefaultStyle(){return`
      @keyframes v-progress-start {
        0% {
          width: 0%;
        }
        100% {
          width: 50%;
        }
      }
      @keyframes v-progress-delay {
        0% {
          width: 50%;
        }
        100% {
          width: 90%;
        }
      }
      @keyframes v-progress-wait {
        0% {
          width: 90%;
          height: 4px;
        }
        3% {
          width: 91%;
          height: 7px;
        }
        100% {
          width: 96%;
          height: 7px;
        }
      }
      @keyframes v-progress-wait-pulse {
        0% {
          opacity: 1;
        }
        50% {
          opacity: 0.1;
        }
        100% {
          opacity: 1;
        }
      }
      .v-loading-indicator,
      .v-status-message {
        position: fixed;
        z-index: 251;
        left: 0;
        right: auto;
        top: 0;
        background-color: var(--lumo-primary-color, var(--material-primary-color, blue));
        transition: none;
      }
      .v-loading-indicator {
        width: 50%;
        height: 4px;
        opacity: 1;
        pointer-events: none;
        animation: v-progress-start 1000ms 200ms both;
      }
      .v-loading-indicator[style*='none'] {
        display: block !important;
        width: 100%;
        opacity: 0;
        animation: none;
        transition: opacity 500ms 300ms, width 300ms;
      }
      .v-loading-indicator.second {
        width: 90%;
        animation: v-progress-delay 3.8s forwards;
      }
      .v-loading-indicator.third {
        width: 96%;
        animation: v-progress-wait 5s forwards, v-progress-wait-pulse 1s 4s infinite backwards;
      }

      vaadin-connection-indicator[offline] .v-loading-indicator,
      vaadin-connection-indicator[reconnecting] .v-loading-indicator {
        display: none;
      }

      .v-status-message {
        opacity: 0;
        width: 100%;
        max-height: var(--status-height-collapsed, 8px);
        overflow: hidden;
        background-color: var(--status-bg-color-online, var(--lumo-primary-color, var(--material-primary-color, blue)));
        color: var(
          --status-text-color-online,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        font-size: 0.75rem;
        font-weight: 600;
        line-height: 1;
        transition: all 0.5s;
        padding: 0 0.5em;
      }

      vaadin-connection-indicator[offline] .v-status-message,
      vaadin-connection-indicator[reconnecting] .v-status-message {
        opacity: 1;
        background-color: var(--status-bg-color-offline, var(--lumo-shade, #333));
        color: var(
          --status-text-color-offline,
          var(--lumo-primary-contrast-color, var(--material-primary-contrast-color, #fff))
        );
        background-image: repeating-linear-gradient(
          45deg,
          rgba(255, 255, 255, 0),
          rgba(255, 255, 255, 0) 10px,
          rgba(255, 255, 255, 0.1) 10px,
          rgba(255, 255, 255, 0.1) 20px
        );
      }

      vaadin-connection-indicator[reconnecting] .v-status-message {
        animation: show-reconnecting-status 2s;
      }

      vaadin-connection-indicator[offline] .v-status-message:hover,
      vaadin-connection-indicator[reconnecting] .v-status-message:hover,
      vaadin-connection-indicator[expanded] .v-status-message {
        max-height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[expanded] .v-status-message {
        opacity: 1;
      }

      .v-status-message span {
        display: flex;
        align-items: center;
        justify-content: center;
        height: var(--status-height, 1.75rem);
      }

      vaadin-connection-indicator[reconnecting] .v-status-message span::before {
        content: '';
        width: 1em;
        height: 1em;
        border-top: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-left: 2px solid
          var(--status-spinner-color, var(--lumo-primary-color, var(--material-primary-color, blue)));
        border-right: 2px solid transparent;
        border-bottom: 2px solid transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: v-spin 0.4s linear infinite;
        margin: 0 0.5em;
      }

      @keyframes v-spin {
        100% {
          transform: rotate(360deg);
        }
      }
    `}getLoadingBarStyle(){switch(this.loadingBarState){case cn.IDLE:return"display: none";case cn.FIRST:case cn.SECOND:case cn.THIRD:return"display: block";default:return""}}timeoutFor(o,l,s,c){return o!==0&&window.clearTimeout(o),l?window.setTimeout(s,c):0}static get instance(){return ht.create()}}Bt([Wt({type:Number})],ht.prototype,"firstDelay",void 0);Bt([Wt({type:Number})],ht.prototype,"secondDelay",void 0);Bt([Wt({type:Number})],ht.prototype,"thirdDelay",void 0);Bt([Wt({type:Number})],ht.prototype,"expandedDuration",void 0);Bt([Wt({type:String})],ht.prototype,"onlineText",void 0);Bt([Wt({type:String})],ht.prototype,"offlineText",void 0);Bt([Wt({type:String})],ht.prototype,"reconnectingText",void 0);Bt([Wt({type:Boolean,reflect:!0})],ht.prototype,"offline",void 0);Bt([Wt({type:Boolean,reflect:!0})],ht.prototype,"reconnecting",void 0);Bt([Wt({type:Boolean,reflect:!0})],ht.prototype,"expanded",void 0);Bt([Wt({type:Boolean,reflect:!0})],ht.prototype,"loading",void 0);Bt([Wt({type:String})],ht.prototype,"loadingBarState",void 0);Bt([Wt({type:Boolean})],ht.prototype,"applyDefaultTheme",null);customElements.get("vaadin-connection-indicator")===void 0&&customElements.define("vaadin-connection-indicator",ht);ht.instance;var Jf;const ql=window;ql.Vaadin||(ql.Vaadin={});(Jf=ql.Vaadin).registrations||(Jf.registrations=[]);ql.Vaadin.registrations.push({is:"@vaadin/common-frontend",version:"0.0.18"});class Zf extends Error{}const Js=window.document.body,Ae=window,Uy=1;function Kp(){return Object.keys(Ae.Vaadin.Flow.clients).filter(r=>r!=="TypeScript").map(r=>Ae.Vaadin.Flow.clients[r])}function ep(r,o){Kp().forEach(l=>l.sendEventMessage(Uy,r,o))}function jy(r){return r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}let Vy=class{constructor(o){this.response=void 0,this.pathname="",this.isActive=!1,this.baseRegex=/^\//,this.navigation="",Js.$=Js.$||[],this.config=o||{},Ae.Vaadin=Ae.Vaadin||{},Ae.Vaadin.Flow=Ae.Vaadin.Flow||{},Ae.Vaadin.Flow.clients={TypeScript:{isActive:()=>this.isActive}};const l=document.head.querySelector("base");this.baseRegex=new RegExp(`^${jy(decodeURIComponent((document.baseURI||l&&l.href||"/").replace(/^https?:\/\/[^/]+/i,"")))}`),this.appShellTitle=document.title,this.addConnectionIndicator()}get serverSideRoutes(){return[{path:"(.*)",action:this.action}]}loadingStarted(){this.isActive=!0,Ae.Vaadin.connectionState.loadingStarted()}loadingFinished(){this.isActive=!1,Ae.Vaadin.connectionState.loadingFinished(),!Ae.Vaadin.listener&&(Ae.Vaadin.listener={},document.addEventListener("click",o=>{o.target&&(o.target.hasAttribute("router-link")?this.navigation="link":o.composedPath().some(l=>l.nodeName==="A")&&(this.navigation="client"))},{capture:!0}))}get action(){return async o=>{if(this.pathname=o.pathname,Ae.Vaadin.connectionState.online)try{await this.flowInit()}catch(l){if(l instanceof Zf)return Ae.Vaadin.connectionState.state=st.CONNECTION_LOST,this.offlineStubAction();throw l}else return this.offlineStubAction();return this.container.onBeforeEnter=(l,s)=>this.flowNavigate(l,s),this.container.onBeforeLeave=(l,s)=>this.flowLeave(l,s),this.container}}async flowLeave(o,l){const{connectionState:s}=Ae.Vaadin;return this.pathname===o.pathname||!this.isFlowClientLoaded()||s.offline?Promise.resolve({}):new Promise(c=>{this.loadingStarted(),this.container.serverConnected=d=>{var p;c(l&&d?l.prevent():(p=l?.continue)===null||p===void 0?void 0:p.call(l)),this.loadingFinished()},ep("ui-leave-navigation",{route:this.getFlowRoutePath(o),query:this.getFlowRouteQuery(o)})})}async flowNavigate(o,l){return this.response?new Promise(s=>{this.loadingStarted(),this.container.serverConnected=(c,d)=>{var p;l&&c?s(l.prevent()):l&&l.redirect&&d?s(l.redirect(d.pathname)):((p=l?.continue)===null||p===void 0||p.call(l),this.container.style.display="",s(this.container)),this.loadingFinished()},this.container.serverPaused=()=>{this.loadingFinished()},ep("ui-navigate",{route:this.getFlowRoutePath(o),query:this.getFlowRouteQuery(o),appShellTitle:this.appShellTitle,historyState:history.state,trigger:this.navigation}),this.navigation="history"}):Promise.resolve(this.container)}getFlowRoutePath(o){return decodeURIComponent(o.pathname).replace(this.baseRegex,"")}getFlowRouteQuery(o){return o.search&&o.search.substring(1)||""}async flowInit(){if(!this.isFlowClientLoaded()){Ae.Vaadin.Flow.nonce=this.findNonce(),this.loadingStarted(),this.response=await this.flowInitUi();const{pushScript:o,appConfig:l}=this.response;typeof o=="string"&&await this.loadScript(o);const{appId:s}=l,c=`flow-container-${s.toLowerCase()}`,d=document.querySelector(c);d?this.container=d:(this.container=document.createElement(c),this.container.id=s),Js.$[s]=this.container,(await su(()=>import("./FlowBootstrap-BRNFttkU.js"),[],import.meta.url)).init(this.response),typeof this.config.imports=="function"&&(this.injectAppIdScript(s),await this.config.imports());const h=await su(()=>import("./FlowClient-uurKp1x-.js"),[],import.meta.url);await this.flowInitClient(h),this.loadingFinished()}return this.container&&!this.container.isConnected&&(this.container.style.display="none",document.body.appendChild(this.container)),this.response}async loadScript(o){return new Promise((l,s)=>{const c=document.createElement("script");c.onload=()=>l(),c.onerror=s,c.src=o;const{nonce:d}=Ae.Vaadin.Flow;d!==void 0&&c.setAttribute("nonce",d),document.body.appendChild(c)})}findNonce(){let o;const l=document.head.getElementsByTagName("script");for(const s of l)if(s.nonce){o=s.nonce;break}return o}injectAppIdScript(o){const l=o.substring(0,o.lastIndexOf("-")),s=document.createElement("script");s.type="module",s.setAttribute("data-app-id",l);const{nonce:c}=Ae.Vaadin.Flow;c!==void 0&&s.setAttribute("nonce",c),document.body.append(s)}async flowInitClient(o){return o.init(),new Promise(l=>{const s=setInterval(()=>{Kp().reduce((d,p)=>d||p.isActive(),!1)||(clearInterval(s),l())},5)})}async flowInitUi(){const o=Ae.Vaadin&&Ae.Vaadin.TypeScript&&Ae.Vaadin.TypeScript.initial;return o?(Ae.Vaadin.TypeScript.initial=void 0,Promise.resolve(o)):new Promise((l,s)=>{const d=new XMLHttpRequest,p=`?v-r=init&location=${encodeURIComponent(this.getFlowRoutePath(location))}&query=${encodeURIComponent(this.getFlowRouteQuery(location))}`;d.open("GET",p),d.onerror=()=>s(new Zf(`Invalid server response when initializing Flow UI.
        ${d.status}
        ${d.responseText}`)),d.onload=()=>{const h=d.getResponseHeader("content-type");h&&h.indexOf("application/json")!==-1?l(JSON.parse(d.responseText)):d.onerror()},d.send()})}addConnectionIndicator(){ht.create(),Ae.addEventListener("online",()=>{if(!this.isFlowClientLoaded()){Ae.Vaadin.connectionState.state=st.RECONNECTING;const o=new XMLHttpRequest;o.open("HEAD","sw.js"),o.onload=()=>{Ae.Vaadin.connectionState.state=st.CONNECTED},o.onerror=()=>{Ae.Vaadin.connectionState.state=st.CONNECTION_LOST},setTimeout(()=>o.send(),50)}}),Ae.addEventListener("offline",()=>{this.isFlowClientLoaded()||(Ae.Vaadin.connectionState.state=st.CONNECTION_LOST)})}async offlineStubAction(){const o=document.createElement("iframe");o.setAttribute("src","./offline-stub.html"),o.setAttribute("style","width: 100%; height: 100%; border: 0"),this.response=void 0;let s;const c=()=>{s!==void 0&&(Ae.Vaadin.connectionState.removeStateChangeListener(s),s=void 0)};return o.onBeforeEnter=(d,p,h)=>{s=()=>{Ae.Vaadin.connectionState.online&&(c(),h.render(d,!1))},Ae.Vaadin.connectionState.addStateChangeListener(s)},o.onBeforeLeave=(d,p,h)=>{c()},o}isFlowClientLoaded(){return this.response!==void 0}};var Hy=dp(),Zs={exports:{}},fi={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var tp;function By(){if(tp)return fi;tp=1;var r=Zl(),o=Symbol.for("react.element"),l=Symbol.for("react.fragment"),s=Object.prototype.hasOwnProperty,c=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function p(h,m,g){var S,E={},x=null,N=null;g!==void 0&&(x=""+g),m.key!==void 0&&(x=""+m.key),m.ref!==void 0&&(N=m.ref);for(S in m)s.call(m,S)&&!d.hasOwnProperty(S)&&(E[S]=m[S]);if(h&&h.defaultProps)for(S in m=h.defaultProps,m)E[S]===void 0&&(E[S]=m[S]);return{$$typeof:o,type:h,key:x,ref:N,props:E,_owner:c.current}}return fi.Fragment=l,fi.jsx=p,fi.jsxs=p,fi}var np;function Wy(){return np||(np=1,Zs.exports=By()),Zs.exports}var vo=Wy(),Qy=Symbol.for("preact-signals");function Nu(){if(yo>1)yo--;else{for(var r,o=!1;vi!==void 0;){var l=vi;for(vi=void 0,uu++;l!==void 0;){var s=l.o;if(l.o=void 0,l.f&=-3,!(8&l.f)&&qp(l))try{l.c()}catch(c){o||(r=c,o=!0)}l=s}}if(uu=0,yo--,o)throw r}}var Fe=void 0;function Gp(r){var o=Fe;Fe=void 0;try{return r()}finally{Fe=o}}var vi=void 0,yo=0,uu=0,Xl=0;function Yp(r){if(Fe!==void 0){var o=r.n;if(o===void 0||o.t!==Fe)return o={i:0,S:r,p:Fe.s,n:void 0,t:Fe,e:void 0,x:void 0,r:o},Fe.s!==void 0&&(Fe.s.n=o),Fe.s=o,r.n=o,32&Fe.f&&r.S(o),o;if(o.i===-1)return o.i=0,o.n!==void 0&&(o.n.p=o.p,o.p!==void 0&&(o.p.n=o.n),o.p=Fe.s,o.n=void 0,Fe.s.n=o,Fe.s=o),o}}function bt(r,o){this.v=r,this.i=0,this.n=void 0,this.t=void 0,this.W=o?.watched,this.Z=o?.unwatched,this.name=o?.name}bt.prototype.brand=Qy;bt.prototype.h=function(){return!0};bt.prototype.S=function(r){var o=this,l=this.t;l!==r&&r.e===void 0&&(r.x=l,this.t=r,l!==void 0?l.e=r:Gp(function(){var s;(s=o.W)==null||s.call(o)}))};bt.prototype.U=function(r){var o=this;if(this.t!==void 0){var l=r.e,s=r.x;l!==void 0&&(l.x=s,r.e=void 0),s!==void 0&&(s.e=l,r.x=void 0),r===this.t&&(this.t=s,s===void 0&&Gp(function(){var c;(c=o.Z)==null||c.call(o)}))}};bt.prototype.subscribe=function(r){var o=this;return em(function(){var l=o.value,s=Fe;Fe=void 0;try{r(l)}finally{Fe=s}},{name:"sub"})};bt.prototype.valueOf=function(){return this.value};bt.prototype.toString=function(){return this.value+""};bt.prototype.toJSON=function(){return this.value};bt.prototype.peek=function(){var r=Fe;Fe=void 0;try{return this.value}finally{Fe=r}};Object.defineProperty(bt.prototype,"value",{get:function(){var r=Yp(this);return r!==void 0&&(r.i=this.i),this.v},set:function(r){if(r!==this.v){if(uu>100)throw new Error("Cycle detected");this.v=r,this.i++,Xl++,yo++;try{for(var o=this.t;o!==void 0;o=o.x)o.t.N()}finally{Nu()}}}});function qp(r){for(var o=r.s;o!==void 0;o=o.n)if(o.S.i!==o.i||!o.S.h()||o.S.i!==o.i)return!0;return!1}function Xp(r){for(var o=r.s;o!==void 0;o=o.n){var l=o.S.n;if(l!==void 0&&(o.r=l),o.S.n=o,o.i=-1,o.n===void 0){r.s=o;break}}}function Jp(r){for(var o=r.s,l=void 0;o!==void 0;){var s=o.p;o.i===-1?(o.S.U(o),s!==void 0&&(s.n=o.n),o.n!==void 0&&(o.n.p=s)):l=o,o.S.n=o.r,o.r!==void 0&&(o.r=void 0),o=s}r.s=l}function xo(r,o){bt.call(this,void 0),this.x=r,this.s=void 0,this.g=Xl-1,this.f=4,this.W=o?.watched,this.Z=o?.unwatched,this.name=o?.name}xo.prototype=new bt;xo.prototype.h=function(){if(this.f&=-3,1&this.f)return!1;if((36&this.f)==32||(this.f&=-5,this.g===Xl))return!0;if(this.g=Xl,this.f|=1,this.i>0&&!qp(this))return this.f&=-2,!0;var r=Fe;try{Xp(this),Fe=this;var o=this.x();(16&this.f||this.v!==o||this.i===0)&&(this.v=o,this.f&=-17,this.i++)}catch(l){this.v=l,this.f|=16,this.i++}return Fe=r,Jp(this),this.f&=-2,!0};xo.prototype.S=function(r){if(this.t===void 0){this.f|=36;for(var o=this.s;o!==void 0;o=o.n)o.S.S(o)}bt.prototype.S.call(this,r)};xo.prototype.U=function(r){if(this.t!==void 0&&(bt.prototype.U.call(this,r),this.t===void 0)){this.f&=-33;for(var o=this.s;o!==void 0;o=o.n)o.S.U(o)}};xo.prototype.N=function(){if(!(2&this.f)){this.f|=6;for(var r=this.t;r!==void 0;r=r.x)r.t.N()}};Object.defineProperty(xo.prototype,"value",{get:function(){if(1&this.f)throw new Error("Cycle detected");var r=Yp(this);if(this.h(),r!==void 0&&(r.i=this.i),16&this.f)throw this.v;return this.v}});function Zp(r){var o=r.u;if(r.u=void 0,typeof o=="function"){yo++;var l=Fe;Fe=void 0;try{o()}catch(s){throw r.f&=-2,r.f|=8,Du(r),s}finally{Fe=l,Nu()}}}function Du(r){for(var o=r.s;o!==void 0;o=o.n)o.S.U(o);r.x=void 0,r.s=void 0,Zp(r)}function Ky(r){if(Fe!==this)throw new Error("Out-of-order effect");Jp(this),Fe=r,this.f&=-2,8&this.f&&Du(this),Nu()}function So(r,o){this.x=r,this.u=void 0,this.s=void 0,this.o=void 0,this.f=32,this.name=o?.name}So.prototype.c=function(){var r=this.S();try{if(8&this.f||this.x===void 0)return;var o=this.x();typeof o=="function"&&(this.u=o)}finally{r()}};So.prototype.S=function(){if(1&this.f)throw new Error("Cycle detected");this.f|=1,this.f&=-9,Zp(this),Xp(this),yo++;var r=Fe;return Fe=this,Ky.bind(this,r)};So.prototype.N=function(){2&this.f||(this.f|=2,this.o=vi,vi=this)};So.prototype.d=function(){this.f|=8,1&this.f||Du(this)};So.prototype.dispose=function(){this.d()};function em(r,o){var l=new So(r,o);try{l.c()}catch(c){throw l.d(),c}var s=l.d.bind(l);return s[Symbol.dispose]=s,s}var eu={exports:{}},tu={};/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var rp;function Gy(){if(rp)return tu;rp=1;var r=Zl();function o(E,x){return E===x&&(E!==0||1/E===1/x)||E!==E&&x!==x}var l=typeof Object.is=="function"?Object.is:o,s=r.useState,c=r.useEffect,d=r.useLayoutEffect,p=r.useDebugValue;function h(E,x){var N=x(),L=s({inst:{value:N,getSnapshot:x}}),O=L[0].inst,I=L[1];return d(function(){O.value=N,O.getSnapshot=x,m(O)&&I({inst:O})},[E,N,x]),c(function(){return m(O)&&I({inst:O}),E(function(){m(O)&&I({inst:O})})},[E]),p(N),N}function m(E){var x=E.getSnapshot;E=E.value;try{var N=x();return!l(E,N)}catch{return!0}}function g(E,x){return x()}var S=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?g:h;return tu.useSyncExternalStore=r.useSyncExternalStore!==void 0?r.useSyncExternalStore:S,tu}var op;function Yy(){return op||(op=1,eu.exports=Gy()),eu.exports}var qy=Yy(),Xy=R.version.split(".").map(Number)[0],Jy=Symbol.for(Xy>=19?"react.transitional.element":"react.element"),Nr,tm=Symbol.dispose||Symbol.for("Symbol.dispose");function nu(r,o){var l=o.effect.S();return Nr=o,Zy.bind(o,r,l)}function Zy(r,o){o(),Nr=r}var ip,cu,lp=function(){},e0=((ip={o:0,effect:{s:void 0,c:function(){},S:function(){return lp},d:function(){}},subscribe:function(){return lp},getSnapshot:function(){return 0},S:function(){},f:function(){}})[tm]=function(){},ip),t0=Promise.prototype.then.bind(Promise.resolve());function n0(){cu||(cu=t0(r0))}function r0(){var r;cu=void 0,(r=Nr)==null||r.f()}function nm(r){n0();var o=R.useRef();o.current==null&&(typeof window>"u"?o.current=e0:o.current=(function(s){var c,d,p,h,m=0,g=em(function(){d=this});return d.c=function(){m=m+1|0,h&&h()},(c={o:s,effect:d,subscribe:function(S){return h=S,function(){m=m+1|0,h=void 0,g()}},getSnapshot:function(){return m},S:function(){if(Nr!=null){var S=Nr.o,E=this.o;S==0&&E==0||S==0&&E==1?(Nr.f(),p=nu(void 0,this)):S==1&&E==0||S==2&&E==0||(p=nu(Nr,this))}else p=nu(void 0,this)},f:function(){var S=p;p=void 0,S?.()}})[tm]=function(){this.f()},c})(r));var l=o.current;return qy.useSyncExternalStore(l.subscribe,l.getSnapshot,l.getSnapshot),l.S(),l}Object.defineProperties(bt.prototype,{$$typeof:{configurable:!0,value:Jy},type:{configurable:!0,value:function(r){var o=r.data,l=nm(1);try{return o.value}finally{l.f()}}},props:{configurable:!0,get:function(){return{data:this}}},ref:{configurable:!0,value:null}});function rm(r){return nm(r)}const o0=new Vy({imports:()=>su(()=>import("./generated-flow-imports-BA8sRTHB.js").then(r=>r.aq),[],import.meta.url)}),ru={render(){return Promise.resolve()}},du={active:!1};function i0(r){const o=r.port,l=r.protocol,d=l==="http:"&&o==="80"||l==="https:"&&o==="443"?r.hostname:r.host;return`${l}//${d}`}function om(r){if(r.href.startsWith(document.baseURI))return"/"+r.href.slice(document.baseURI.length)}function im(r){if(r.defaultPrevented||r.button!==0||r.shiftKey||r.ctrlKey||r.altKey||r.metaKey)return;let o=r.target;const l=r.composedPath?r.composedPath():r.path||[];for(let d=0;d<l.length;d++){const p=l[d];if(p.nodeName&&p.nodeName.toLowerCase()==="a"){o=p;break}}for(;o&&o.nodeName.toLowerCase()!=="a";)o=o.parentNode;if(!o||o.nodeName.toLowerCase()!=="a")return;const s=o;if(s.target&&s.target.toLowerCase()!=="_self"||s.hasAttribute("download")||s.hasAttribute("router-ignore"))return;if(s.pathname===window.location.pathname&&s.hash!==""){window.location.hash=s.hash;return}if((s.origin||i0(s))===window.location.origin)return new URL(s.href,s.baseURI)}function l0(r){const o=im(r);if(o)return om(o)}const a0=()=>{window.addEventListener("click",r=>{if(du.active)return;const o=im(r);if(!o||!o.href.startsWith(document.baseURI))return;r&&r.preventDefault&&r.preventDefault();const l=o.pathname+o.search+o.hash,s={...window.history.state};s.idx!==void 0&&(s.idx=s.idx+1),window.history.pushState(s,"",l),window.dispatchEvent(new PopStateEvent("popstate"))},{capture:!1})};function ap(r,o){setTimeout(()=>{window.dispatchEvent(new CustomEvent("vaadin-navigated",{detail:{pathname:r,search:o}})),delete window.Vaadin.Flow.navigation})}function lm(){}const sp=()=>lm;function s0({children:r,domNode:o,onRemove:l}){return R.useEffect(()=>{o.addEventListener("flow-portal-remove",s=>{s.preventDefault(),l()},{once:!0})},[]),Hy.createPortal(r,o)}const am="ADD_FLOW_PORTAL";function u0(r){return{type:am,portal:r}}const sm="REMOVE_FLOW_PORTAL";function c0(r){return{type:sm,key:r}}function d0(r,o){switch(o.type){case am:return[...r,o.portal];case sm:return r.filter(({key:l})=>l!==o.key);default:return r}}let Lr=!1;function f0(r,o){const l=Su(),s=R.useRef([]).current,[c,d]=R.useState(0),p=R.useCallback(()=>{if(Lr){h();return}const g=s.shift();if(g===void 0)return;(async()=>{r.current&&(await r.current,r.current=void 0),o.current=!g.callback,Lr=!0,l(g.to,g.opts),d(s.length)})()},[l,d]),h=R.useCallback(()=>{setTimeout(p,0)},[p]),m=R.useCallback((g,S,E)=>{s.push({to:g,callback:S,opts:E}),d(s.length),s.length===1&&h()},[d,h]);return R.useEffect(()=>()=>{h()},[c,h]),m}const up=()=>{window.Vaadin.Flow.navigation=!0};function Mu(){var r=rm(1);try{const o=R.useRef(null),l=Su(),s=xg(({currentLocation:A,nextLocation:Y})=>(d.current=d.current||Y.pathname===A.pathname&&Y.search===A.search&&Y.hash===A.hash,!0)),c=lr(),d=R.useRef(!1),p=R.useRef(!1),h=R.useRef(!1),m=R.useRef(void 0),g=R.useRef(void 0),S=f0(g,d),E=Pp("/"),[x,N]=R.useReducer(d0,[]),L=R.useCallback(A=>{A.preventDefault();const Y=Math.random().toString(36).slice(2);N(u0(vo.jsx(s0,{domNode:A.detail.domNode,onRemove:()=>N(c0(Y)),children:A.detail.children},Y)))},[N]),O=R.useCallback(A=>{const Y=l0(A);Y&&(A&&A.preventDefault&&A.preventDefault(),d.current=!1,h.current=!0,window.Vaadin.Flow.navigation=!0,l(Y),window.dispatchEvent(new CustomEvent("close-overlay-drawer")))},[l]),I=R.useCallback(A=>{const Y=A.detail,ae=om(Y);ae&&(A.preventDefault(),l(ae))},[l]),D=R.useCallback(A=>{window.Vaadin.Flow.navigation=!0;const Y=A.detail.url.startsWith(document.baseURI)?"/"+A.detail.url.slice(document.baseURI.length):"/"+A.detail.url;h.current=!1,S(Y,A.detail.callback,{state:A.detail.state,replace:A.detail.replace})},[l]),te=R.useCallback(A=>()=>{l(A,{replace:!0})},[l]);return R.useEffect(()=>(window.addEventListener("vaadin-router-go",I),window.addEventListener("vaadin-navigate",D),()=>{window.removeEventListener("vaadin-router-go",I),window.removeEventListener("vaadin-navigate",D)}),[I,D]),R.useEffect(()=>(window.addEventListener("popstate",up),window.addEventListener("click",O),du.active=!0,()=>{m.current?.parentNode?.removeChild(m.current),m.current?.removeEventListener("flow-portal-add",L),m.current=void 0,window.removeEventListener("popstate",up),window.removeEventListener("click",O),du.active=!1}),[]),R.useEffect(()=>{if(s.state==="blocked"){if(p.current){const{pathname:he,state:ce}=s.location,Pe=he.substring(E.length);S(Pe.startsWith("/")?Pe:"/"+Pe,!0,{state:ce,replace:!0});return}p.current=!0;let A;if(g.current=new Promise((he,ce)=>A={resolve:he,reject:ce}),g.current.then(()=>p.current=!1,()=>p.current=!1),d.current&&!h.current){s.proceed(),A.resolve(),Lr=!1;return}h.current=!1;const{pathname:Y,search:ae}=s.location,z=window?.Vaadin?.routesConfig||[];let fe=Ln(Array.from(z),Y);fe&&fe.filter(he=>he.route?.element?.type?.name===Mu.name).length!=0?(m.current?.onBeforeEnter?.call(m?.current,{pathname:Y,search:ae},{prevent(){s.reset(),A.resolve(),Lr=!1,d.current=!1},redirect:te,continue(){s.proceed(),A.resolve(),Lr=!1}},ru),d.current=!0):Promise.resolve(m.current?.onBeforeLeave?.call(m?.current,{pathname:Y,search:ae},{prevent:sp},ru)).then(he=>{he===lm&&m.current?m.current.serverConnected=ce=>{ce?s.reset():s.proceed(),A.resolve(),Lr=!1}:(s.proceed(),A.resolve(),Lr=!1)})}},[s.state,s.location]),R.useEffect(()=>{if(s.state!=="blocked"){if(d.current){d.current=!1,ap(c.pathname,c.search);return}o0.serverSideRoutes[0].action({pathname:c.pathname,search:c.search}).then(A=>{const Y=o.current?.parentNode;return Y&&Y!==A.parentNode&&(Y.append(A),A.addEventListener("flow-portal-add",L),m.current=A),A.onBeforeEnter?.call(A,{pathname:c.pathname,search:c.search},{prevent:sp,redirect:te,continue(){ap(c.pathname,c.search)}},ru)}).then(A=>{typeof A=="function"&&A()})}},[c]),vo.jsxs(vo.Fragment,{children:[vo.jsx("output",{ref:o,style:{display:"none"}}),x]})}finally{r.f()}}Mu.type="FlowContainer";const p0=[{path:"/*",element:vo.jsx(Mu,{})}];function m0(){const r=[...p0];return{router:Jg([...r],{basename:new URL(document.baseURI).pathname}),routes:r}}const{router:h0,routes:v0}=m0();function g0(){var r=rm(1);try{return vo.jsx(bg,{router:h0})}finally{r.f()}}const fu=document.getElementById("outlet");let um=fu._root??ov.createRoot(fu);fu._root=um;um.render(R.createElement(g0));window.Vaadin??={};window.Vaadin.routesConfig=v0;a0();/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function y0(r){const o=r.constructor,l=r.__cssInjectorStyleSheet;return l?[...o.baseStyles,l,...o.themeStyles]:o.elementStyles}function w0(r){[...r.shadowRoot.querySelectorAll("style")].forEach(o=>o.remove()),jp(r.shadowRoot,y0(r))}/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const x0=r=>class extends r{static get properties(){return{_theme:{type:String,readOnly:!0}}}static get observedAttributes(){return[...super.observedAttributes,"theme"]}attributeChangedCallback(l,s,c){super.attributeChangedCallback(l,s,c),l==="theme"&&this._set_theme(c)}};/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const cm=[],pu=new Set,Ou=new Set;function dm(r){return r&&Object.prototype.hasOwnProperty.call(r,"__themes")}function S0(r){return dm(customElements.get(r))}function E0(r=[]){return[r].flat(1/0).filter(o=>o instanceof Pu?!0:(console.warn("An item in styles is not of type CSSResult. Use `unsafeCSS` or `css`."),!1))}function fm(r,o){return(r||"").split(" ").some(l=>new RegExp(`^${l.split("*").join(".*")}$`,"u").test(o))}function pm(r){return r.map(o=>o.cssText).join(`
`)}const Jl="vaadin-themable-mixin-style";function k0(r,o){const l=document.createElement("style");l.id=Jl,l.textContent=pm(r),o.content.appendChild(l)}function C0(r){if(!r.shadowRoot)return;const o=r.constructor;if(r instanceof Dr)w0(r);else{const l=r.shadowRoot.getElementById(Jl),s=o.prototype._template;l.textContent=s.content.getElementById(Jl).textContent}}function b0(r){pu.forEach(o=>{const l=o.deref();l instanceof r?C0(l):l||pu.delete(o)})}function mm(r){if(r.prototype instanceof Dr)r.elementStyles=r.finalizeStyles(r.styles);else{const o=r.prototype._template;o.content.getElementById(Jl).textContent=pm(r.getStylesForThis())}Ou.forEach(o=>{const l=customElements.get(o);l!==r&&l.prototype instanceof r&&mm(l)})}function _0(r,o){const l=r.__themes;return!l||!o?!1:l.some(s=>s.styles.some(c=>o.some(d=>d.cssText===c.cssText)))}function oa(r,o,l={}){o=E0(o),window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.registerStyles(r,o,l):cm.push({themeFor:r,styles:o,include:l.include,moduleId:l.moduleId}),r&&Ou.forEach(s=>{if(fm(r,s)&&S0(s)){const c=customElements.get(s);_0(c,o)?console.warn(`Registering styles that already exist for ${s}`):(!window.Vaadin||!window.Vaadin.suppressPostFinalizeStylesWarning)&&console.warn(`The custom element definition for "${s}" was finalized before a style module was registered. Ideally, import component specific style modules before importing the corresponding custom element. This warning can be suppressed by setting "window.Vaadin.suppressPostFinalizeStylesWarning = true".`),mm(c),b0(c)}})}function mu(){return window.Vaadin&&window.Vaadin.styleModules?window.Vaadin.styleModules.getAllThemes():cm}function R0(r=""){let o=0;return r.startsWith("lumo-")||r.startsWith("material-")?o=1:r.startsWith("vaadin-")&&(o=2),o}function hm(r){const o=[];return r.include&&[].concat(r.include).forEach(l=>{const s=mu().find(c=>c.moduleId===l);s?o.push(...hm(s),...s.styles):console.warn(`Included moduleId ${l} not found in style registry`)},r.styles),o}function P0(r){const o=`${r}-default-theme`,l=mu().filter(s=>s.moduleId!==o&&fm(s.themeFor,r)).map(s=>({...s,styles:[...hm(s),...s.styles],includePriority:R0(s.moduleId)})).sort((s,c)=>c.includePriority-s.includePriority);return l.length>0?l:mu().filter(s=>s.moduleId===o)}const hw=r=>class extends x0(r){constructor(){super(),pu.add(new WeakRef(this))}static finalize(){if(super.finalize(),this.is&&Ou.add(this.is),this.elementStyles)return;const l=this.prototype._template;!l||dm(this)||k0(this.getStylesForThis(),l)}static finalizeStyles(l){return this.baseStyles=l?[l].flat(1/0):[],this.themeStyles=this.getStylesForThis(),[...this.baseStyles,...this.themeStyles]}static getStylesForThis(){const l=r.__themes||[],s=Object.getPrototypeOf(this.prototype),c=(s?s.constructor.__themes:[])||[];this.__themes=[...l,...c,...P0(this.is)];const d=this.__themes.flatMap(p=>p.styles);return d.filter((p,h)=>h===d.lastIndexOf(p))}};/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const z0=(r,...o)=>{const l=document.createElement("style");l.id=r,l.textContent=o.map(s=>s.toString()).join(`
`).replace(":host","html"),document.head.insertAdjacentElement("afterbegin",l)},ar=(r,...o)=>{z0(`lumo-${r}`,o)};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */window.Vaadin||={};window.Vaadin.featureFlags||={};function L0(r){return r.replace(/-[a-z]/gu,o=>o[1].toUpperCase())}const zn={};function T0(r,o="24.9.5"){if(Object.defineProperty(r,"version",{get(){return o}}),r.experimental){const s=typeof r.experimental=="string"?r.experimental:`${L0(r.is.split("-").slice(1).join("-"))}Component`;if(!window.Vaadin.featureFlags[s]&&!zn[s]){zn[s]=new Set,zn[s].add(r),Object.defineProperty(window.Vaadin.featureFlags,s,{get(){return zn[s].size===0},set(c){c&&zn[s].size>0&&(zn[s].forEach(d=>{customElements.define(d.is,d)}),zn[s].clear())}});return}else if(zn[s]){zn[s].add(r);return}}const l=customElements.get(r.is);if(!l)customElements.define(r.is,r);else{const s=l.version;s&&r.version&&s===r.version?console.warn(`The component ${r.is} has been loaded twice`):console.error(`Tried to define ${r.is} version ${r.version} when version ${l.version} is already in use. Something will probably break.`)}}/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class $0 extends HTMLElement{static get is(){return"vaadin-lumo-styles"}}T0($0);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const N0=et`
  :host {
    /* prettier-ignore */
    --lumo-font-family: -apple-system, BlinkMacSystemFont, 'Roboto', 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';

    /* Font sizes */
    --lumo-font-size-xxs: 0.75rem;
    --lumo-font-size-xs: 0.8125rem;
    --lumo-font-size-s: 0.875rem;
    --lumo-font-size-m: 1rem;
    --lumo-font-size-l: 1.125rem;
    --lumo-font-size-xl: 1.375rem;
    --lumo-font-size-xxl: 1.75rem;
    --lumo-font-size-xxxl: 2.5rem;

    /* Line heights */
    --lumo-line-height-xs: 1.25;
    --lumo-line-height-s: 1.375;
    --lumo-line-height-m: 1.625;
  }
`,Au=et`
  body,
  :host {
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-m);
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  small,
  [theme~='font-size-s'] {
    font-size: var(--lumo-font-size-s);
    line-height: var(--lumo-line-height-s);
  }

  [theme~='font-size-xs'] {
    font-size: var(--lumo-font-size-xs);
    line-height: var(--lumo-line-height-xs);
  }

  :where(h1, h2, h3, h4, h5, h6) {
    font-weight: 600;
    line-height: var(--lumo-line-height-xs);
    margin-block: 0;
  }

  :where(h1) {
    font-size: var(--lumo-font-size-xxxl);
  }

  :where(h2) {
    font-size: var(--lumo-font-size-xxl);
  }

  :where(h3) {
    font-size: var(--lumo-font-size-xl);
  }

  :where(h4) {
    font-size: var(--lumo-font-size-l);
  }

  :where(h5) {
    font-size: var(--lumo-font-size-m);
  }

  :where(h6) {
    font-size: var(--lumo-font-size-xs);
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }

  p,
  blockquote {
    margin-top: 0.5em;
    margin-bottom: 0.75em;
  }

  a {
    text-decoration: none;
  }

  a:where(:any-link):hover {
    text-decoration: underline;
  }

  hr {
    display: block;
    align-self: stretch;
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) calc(var(--lumo-border-radius-m) / 2);
    background-color: var(--lumo-contrast-10pct);
  }

  blockquote {
    border-left: 2px solid var(--lumo-contrast-30pct);
  }

  b,
  strong {
    font-weight: 600;
  }

  /* RTL specific styles */
  blockquote[dir='rtl'] {
    border-left: none;
    border-right: 2px solid var(--lumo-contrast-30pct);
  }
`;oa("",Au,{moduleId:"lumo-typography"});ar("typography-props",N0);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const D0=et`
  ${Up(Au.cssText.replace(/,\s*:host/su,""))}
`;ar("typography",D0);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const M0=et`
  :host {
    /* Base (background) */
    --lumo-base-color: #fff;

    /* Tint */
    --lumo-tint-5pct: hsla(0, 0%, 100%, 0.3);
    --lumo-tint-10pct: hsla(0, 0%, 100%, 0.37);
    --lumo-tint-20pct: hsla(0, 0%, 100%, 0.44);
    --lumo-tint-30pct: hsla(0, 0%, 100%, 0.5);
    --lumo-tint-40pct: hsla(0, 0%, 100%, 0.57);
    --lumo-tint-50pct: hsla(0, 0%, 100%, 0.64);
    --lumo-tint-60pct: hsla(0, 0%, 100%, 0.7);
    --lumo-tint-70pct: hsla(0, 0%, 100%, 0.77);
    --lumo-tint-80pct: hsla(0, 0%, 100%, 0.84);
    --lumo-tint-90pct: hsla(0, 0%, 100%, 0.9);
    --lumo-tint: #fff;

    /* Shade */
    --lumo-shade-5pct: hsla(214, 61%, 25%, 0.05);
    --lumo-shade-10pct: hsla(214, 57%, 24%, 0.1);
    --lumo-shade-20pct: hsla(214, 53%, 23%, 0.16);
    --lumo-shade-30pct: hsla(214, 50%, 22%, 0.26);
    --lumo-shade-40pct: hsla(214, 47%, 21%, 0.38);
    --lumo-shade-50pct: hsla(214, 45%, 20%, 0.52);
    --lumo-shade-60pct: hsla(214, 43%, 19%, 0.6);
    --lumo-shade-70pct: hsla(214, 42%, 18%, 0.69);
    --lumo-shade-80pct: hsla(214, 41%, 17%, 0.83);
    --lumo-shade-90pct: hsla(214, 40%, 16%, 0.94);
    --lumo-shade: hsl(214, 35%, 15%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-shade-5pct);
    --lumo-contrast-10pct: var(--lumo-shade-10pct);
    --lumo-contrast-20pct: var(--lumo-shade-20pct);
    --lumo-contrast-30pct: var(--lumo-shade-30pct);
    --lumo-contrast-40pct: var(--lumo-shade-40pct);
    --lumo-contrast-50pct: var(--lumo-shade-50pct);
    --lumo-contrast-60pct: var(--lumo-shade-60pct);
    --lumo-contrast-70pct: var(--lumo-shade-70pct);
    --lumo-contrast-80pct: var(--lumo-shade-80pct);
    --lumo-contrast-90pct: var(--lumo-shade-90pct);
    --lumo-contrast: var(--lumo-shade);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 100%, 48%);
    --lumo-primary-color-50pct: hsla(214, 100%, 49%, 0.76);
    --lumo-primary-color-10pct: hsla(214, 100%, 60%, 0.13);
    --lumo-primary-text-color: hsl(214, 100%, 43%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 85%, 48%);
    --lumo-error-color-50pct: hsla(3, 85%, 49%, 0.5);
    --lumo-error-color-10pct: hsla(3, 85%, 49%, 0.1);
    --lumo-error-text-color: hsl(3, 89%, 42%);
    --lumo-error-contrast-color: #fff;

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 72%, 31%, 0.5);
    --lumo-success-color-10pct: hsla(145, 72%, 31%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 25%);
    --lumo-success-contrast-color: #fff;

    /* Warning */
    --lumo-warning-color: hsl(48, 100%, 50%);
    --lumo-warning-color-10pct: hsla(48, 100%, 50%, 0.25);
    --lumo-warning-text-color: hsl(32, 100%, 30%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  /* forced-colors mode adjustments */
  @media (forced-colors: active) {
    html {
      --lumo-disabled-text-color: GrayText;
    }
  }
`;ar("color-props",M0);const Fu=et`
  [theme~='dark'] {
    /* Base (background) */
    --lumo-base-color: hsl(214, 35%, 21%);

    /* Tint */
    --lumo-tint-5pct: hsla(214, 65%, 85%, 0.06);
    --lumo-tint-10pct: hsla(214, 60%, 80%, 0.14);
    --lumo-tint-20pct: hsla(214, 64%, 82%, 0.23);
    --lumo-tint-30pct: hsla(214, 69%, 84%, 0.32);
    --lumo-tint-40pct: hsla(214, 73%, 86%, 0.41);
    --lumo-tint-50pct: hsla(214, 78%, 88%, 0.5);
    --lumo-tint-60pct: hsla(214, 82%, 90%, 0.58);
    --lumo-tint-70pct: hsla(214, 87%, 92%, 0.69);
    --lumo-tint-80pct: hsla(214, 91%, 94%, 0.8);
    --lumo-tint-90pct: hsla(214, 96%, 96%, 0.9);
    --lumo-tint: hsl(214, 100%, 98%);

    /* Shade */
    --lumo-shade-5pct: hsla(214, 0%, 0%, 0.07);
    --lumo-shade-10pct: hsla(214, 4%, 2%, 0.15);
    --lumo-shade-20pct: hsla(214, 8%, 4%, 0.23);
    --lumo-shade-30pct: hsla(214, 12%, 6%, 0.32);
    --lumo-shade-40pct: hsla(214, 16%, 8%, 0.41);
    --lumo-shade-50pct: hsla(214, 20%, 10%, 0.5);
    --lumo-shade-60pct: hsla(214, 24%, 12%, 0.6);
    --lumo-shade-70pct: hsla(214, 28%, 13%, 0.7);
    --lumo-shade-80pct: hsla(214, 32%, 13%, 0.8);
    --lumo-shade-90pct: hsla(214, 33%, 13%, 0.9);
    --lumo-shade: hsl(214, 33%, 13%);

    /* Contrast */
    --lumo-contrast-5pct: var(--lumo-tint-5pct);
    --lumo-contrast-10pct: var(--lumo-tint-10pct);
    --lumo-contrast-20pct: var(--lumo-tint-20pct);
    --lumo-contrast-30pct: var(--lumo-tint-30pct);
    --lumo-contrast-40pct: var(--lumo-tint-40pct);
    --lumo-contrast-50pct: var(--lumo-tint-50pct);
    --lumo-contrast-60pct: var(--lumo-tint-60pct);
    --lumo-contrast-70pct: var(--lumo-tint-70pct);
    --lumo-contrast-80pct: var(--lumo-tint-80pct);
    --lumo-contrast-90pct: var(--lumo-tint-90pct);
    --lumo-contrast: var(--lumo-tint);

    /* Text */
    --lumo-header-text-color: var(--lumo-contrast);
    --lumo-body-text-color: var(--lumo-contrast-90pct);
    --lumo-secondary-text-color: var(--lumo-contrast-70pct);
    --lumo-tertiary-text-color: var(--lumo-contrast-50pct);
    --lumo-disabled-text-color: var(--lumo-contrast-30pct);

    /* Primary */
    --lumo-primary-color: hsl(214, 90%, 48%);
    --lumo-primary-color-50pct: hsla(214, 90%, 70%, 0.69);
    --lumo-primary-color-10pct: hsla(214, 90%, 55%, 0.13);
    --lumo-primary-text-color: hsl(214, 90%, 77%);
    --lumo-primary-contrast-color: #fff;

    /* Error */
    --lumo-error-color: hsl(3, 79%, 49%);
    --lumo-error-color-50pct: hsla(3, 75%, 62%, 0.5);
    --lumo-error-color-10pct: hsla(3, 75%, 62%, 0.14);
    --lumo-error-text-color: hsl(3, 100%, 80%);

    /* Success */
    --lumo-success-color: hsl(145, 72%, 30%);
    --lumo-success-color-50pct: hsla(145, 92%, 51%, 0.5);
    --lumo-success-color-10pct: hsla(145, 92%, 51%, 0.1);
    --lumo-success-text-color: hsl(145, 85%, 46%);

    /* Warning */
    --lumo-warning-color: hsl(43, 100%, 48%);
    --lumo-warning-color-10pct: hsla(40, 100%, 50%, 0.2);
    --lumo-warning-text-color: hsl(45, 100%, 60%);
    --lumo-warning-contrast-color: var(--lumo-shade-90pct);
  }

  html {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: light;
  }

  [theme~='dark'] {
    color: var(--lumo-body-text-color);
    background-color: var(--lumo-base-color);
    color-scheme: dark;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: var(--lumo-header-text-color);
  }

  a:where(:any-link) {
    color: var(--lumo-primary-text-color);
  }

  a:not(:any-link) {
    color: var(--lumo-disabled-text-color);
  }

  blockquote {
    color: var(--lumo-secondary-text-color);
  }

  code,
  pre {
    background-color: var(--lumo-contrast-10pct);
    border-radius: var(--lumo-border-radius-m);
  }
  pre code {
    background: transparent;
  }
`;oa("",Fu,{moduleId:"lumo-color"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ar("color",Fu);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const O0=et`
  :host {
    /* Border radius */
    --lumo-border-radius-s: 0.25em; /* Checkbox, badge, date-picker year indicator, etc */
    --lumo-border-radius-m: var(--lumo-border-radius, 0.25em); /* Button, text field, menu overlay, etc */
    --lumo-border-radius-l: 0.5em; /* Dialog, notification, etc */

    /* Shadow */
    --lumo-box-shadow-xs: 0 1px 4px -1px var(--lumo-shade-50pct);
    --lumo-box-shadow-s: 0 2px 4px -1px var(--lumo-shade-20pct), 0 3px 12px -1px var(--lumo-shade-30pct);
    --lumo-box-shadow-m: 0 2px 6px -1px var(--lumo-shade-20pct), 0 8px 24px -4px var(--lumo-shade-40pct);
    --lumo-box-shadow-l: 0 3px 18px -2px var(--lumo-shade-20pct), 0 12px 48px -6px var(--lumo-shade-40pct);
    --lumo-box-shadow-xl: 0 4px 24px -3px var(--lumo-shade-20pct), 0 18px 64px -8px var(--lumo-shade-40pct);

    /* Clickable element cursor */
    --lumo-clickable-cursor: default;
  }
`;et`
  html {
    /* Button */
    --vaadin-button-background: var(--lumo-contrast-5pct);
    --vaadin-button-border: none;
    --vaadin-button-border-radius: var(--lumo-border-radius-m);
    --vaadin-button-font-size: var(--lumo-font-size-m);
    --vaadin-button-font-weight: 500;
    --vaadin-button-height: var(--lumo-size-m);
    --vaadin-button-margin: var(--lumo-space-xs) 0;
    --vaadin-button-min-width: calc(var(--vaadin-button-height) * 2);
    --vaadin-button-padding: 0 calc(var(--vaadin-button-height) / 3 + var(--lumo-border-radius-m) / 2);
    --vaadin-button-text-color: var(--lumo-primary-text-color);
    --vaadin-button-primary-background: var(--lumo-primary-color);
    --vaadin-button-primary-border: none;
    --vaadin-button-primary-font-weight: 600;
    --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    --vaadin-button-tertiary-background: transparent !important;
    --vaadin-button-tertiary-text-color: var(--lumo-primary-text-color);
    --vaadin-button-tertiary-font-weight: 500;
    --vaadin-button-tertiary-padding: 0 calc(var(--vaadin-button-height) / 6);
    /* Checkbox */
    --vaadin-checkbox-background: var(--lumo-contrast-20pct);
    --vaadin-checkbox-background-hover: var(--lumo-contrast-30pct);
    --vaadin-checkbox-border-radius: var(--lumo-border-radius-s);
    --vaadin-checkbox-checkmark-char: var(--lumo-icons-checkmark);
    --vaadin-checkbox-checkmark-char-indeterminate: '';
    --vaadin-checkbox-checkmark-color: var(--lumo-primary-contrast-color);
    --vaadin-checkbox-checkmark-size: calc(var(--vaadin-checkbox-size) + 2px);
    --vaadin-checkbox-label-color: var(--lumo-body-text-color);
    --vaadin-checkbox-label-font-size: var(--lumo-font-size-m);
    --vaadin-checkbox-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs);
    --vaadin-checkbox-size: calc(var(--lumo-size-m) / 2);
    --vaadin-checkbox-disabled-checkmark-color: var(--lumo-contrast-30pct);
    --vaadin-checkbox-disabled-background: var(--lumo-contrast-10pct);
    /* Radio button */
    --vaadin-radio-button-background: var(--lumo-contrast-20pct);
    --vaadin-radio-button-background-hover: var(--lumo-contrast-30pct);
    --vaadin-radio-button-dot-color: var(--lumo-primary-contrast-color);
    --vaadin-radio-button-dot-size: 3px;
    --vaadin-radio-button-label-color: var(--lumo-body-text-color);
    --vaadin-radio-button-label-font-size: var(--lumo-font-size-m);
    --vaadin-radio-button-label-padding: var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs)
      var(--lumo-space-xs);
    --vaadin-radio-button-size: calc(var(--lumo-size-m) / 2);
    --vaadin-radio-button-disabled-background: var(--lumo-contrast-10pct);
    --vaadin-radio-button-disabled-dot-color: var(--lumo-contrast-30pct);
    --vaadin-selection-color: var(--lumo-primary-color);
    --vaadin-selection-color-text: var(--lumo-primary-text-color);
    --vaadin-input-field-border-radius: var(--lumo-border-radius-m);
    --vaadin-focus-ring-color: var(--lumo-primary-color-50pct);
    --vaadin-focus-ring-width: 2px;
    /* Label */
    --vaadin-input-field-label-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-focused-label-color: var(--lumo-primary-text-color);
    --vaadin-input-field-hovered-label-color: var(--lumo-body-text-color);
    --vaadin-input-field-label-font-size: var(--lumo-font-size-s);
    --vaadin-input-field-label-font-weight: 500;
    /* Helper */
    --vaadin-input-field-helper-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-helper-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-helper-font-weight: 400;
    --vaadin-input-field-helper-spacing: 0.4em;
    /* Error message */
    --vaadin-input-field-error-color: var(--lumo-error-text-color);
    --vaadin-input-field-error-font-size: var(--lumo-font-size-xs);
    --vaadin-input-field-error-font-weight: 400;
    /* Input field */
    --vaadin-input-field-background: var(--lumo-contrast-10pct);
    --vaadin-input-field-icon-color: var(--lumo-contrast-60pct);
    --vaadin-input-field-icon-size: var(--lumo-icon-size-m);
    --vaadin-input-field-invalid-background: var(--lumo-error-color-10pct);
    --vaadin-input-field-invalid-hover-highlight: var(--lumo-error-color-50pct);
    --vaadin-input-field-disabled-background: var(--lumo-contrast-5pct);
    --vaadin-input-field-disabled-value-color: var(--lumo-disabled-text-color);
    --vaadin-input-field-height: var(--lumo-size-m);
    --vaadin-input-field-hover-highlight: var(--lumo-contrast-50pct);
    --vaadin-input-field-placeholder-color: var(--lumo-secondary-text-color);
    --vaadin-input-field-readonly-border: 1px dashed var(--lumo-contrast-30pct);
    --vaadin-input-field-value-color: var(--lumo-body-text-color);
    --vaadin-input-field-value-font-size: var(--lumo-font-size-m);
    --vaadin-input-field-value-font-weight: 500;
  }
`;ar("style-props",O0);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Iu=et`
  [theme~='badge'] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    padding: 0.4em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-primary-text-color);
    background-color: var(--lumo-primary-color-10pct);
    border-radius: var(--lumo-border-radius-s);
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-s);
    line-height: 1;
    font-weight: 500;
    text-transform: initial;
    letter-spacing: initial;
    min-width: calc(var(--lumo-line-height-xs) * 1em + 0.45em);
    flex-shrink: 0;
  }

  /* Ensure proper vertical alignment */
  [theme~='badge']::before {
    display: inline-block;
    content: '\\2003';
    width: 0;
  }

  [theme~='badge'][theme~='small'] {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
  }

  /* Colors */

  [theme~='badge'][theme~='success'] {
    color: var(--lumo-success-text-color);
    background-color: var(--lumo-success-color-10pct);
  }

  [theme~='badge'][theme~='error'] {
    color: var(--lumo-error-text-color);
    background-color: var(--lumo-error-color-10pct);
  }

  [theme~='badge'][theme~='warning'] {
    color: var(--lumo-warning-text-color);
    background-color: var(--lumo-warning-color-10pct);
  }

  [theme~='badge'][theme~='contrast'] {
    color: var(--lumo-contrast-80pct);
    background-color: var(--lumo-contrast-5pct);
  }

  /* Primary */

  [theme~='badge'][theme~='primary'] {
    color: var(--lumo-primary-contrast-color);
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='success'][theme~='primary'] {
    color: var(--lumo-success-contrast-color);
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error'][theme~='primary'] {
    color: var(--lumo-error-contrast-color);
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning'][theme~='primary'] {
    color: var(--lumo-warning-contrast-color);
    background-color: var(--lumo-warning-color);
  }

  [theme~='badge'][theme~='contrast'][theme~='primary'] {
    color: var(--lumo-base-color);
    background-color: var(--lumo-contrast);
  }

  /* Links */

  [theme~='badge'][href]:hover {
    text-decoration: none;
  }

  /* Icon */

  [theme~='badge'] > vaadin-icon {
    margin: -0.25em 0;
  }

  [theme~='badge'] > vaadin-icon:first-child {
    margin-left: -0.375em;
  }

  [theme~='badge'] > vaadin-icon:last-child {
    margin-right: -0.375em;
  }

  vaadin-icon[theme~='badge'][icon] {
    min-width: 0;
    padding: 0;
    font-size: 1rem;
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }

  vaadin-icon[theme~='badge'][icon][theme~='small'] {
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
  }

  /* Empty */

  [theme~='badge']:not([icon]):empty {
    min-width: 0;
    width: 1em;
    height: 1em;
    padding: 0;
    border-radius: 50%;
    background-color: var(--lumo-primary-color);
  }

  [theme~='badge'][theme~='small']:not([icon]):empty {
    width: 0.75em;
    height: 0.75em;
  }

  [theme~='badge'][theme~='contrast']:not([icon]):empty {
    background-color: var(--lumo-contrast);
  }

  [theme~='badge'][theme~='success']:not([icon]):empty {
    background-color: var(--lumo-success-color);
  }

  [theme~='badge'][theme~='error']:not([icon]):empty {
    background-color: var(--lumo-error-color);
  }

  [theme~='badge'][theme~='warning']:not([icon]):empty {
    background-color: var(--lumo-warning-color);
  }

  /* Pill */

  [theme~='badge'][theme~='pill'] {
    --lumo-border-radius-s: 1em;
  }

  /* RTL specific styles */

  [dir='rtl'][theme~='badge'] vaadin-icon:first-child {
    margin-right: -0.375em;
    margin-left: 0;
  }

  [dir='rtl'][theme~='badge'] vaadin-icon:last-child {
    margin-left: -0.375em;
    margin-right: 0;
  }
`;oa("",Iu,{moduleId:"lumo-badge"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ar("badge",Iu);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const A0=et`
  /* === Screen readers === */
  .sr-only {
    border-width: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const F0=et`
  /* === Background color === */
  .bg-base {
    background-color: var(--lumo-base-color);
  }

  .bg-transparent {
    background-color: transparent;
  }

  .bg-tint {
    background-color: var(--lumo-tint);
  }
  .bg-tint-90 {
    background-color: var(--lumo-tint-90pct);
  }
  .bg-tint-80 {
    background-color: var(--lumo-tint-80pct);
  }
  .bg-tint-70 {
    background-color: var(--lumo-tint-70pct);
  }
  .bg-tint-60 {
    background-color: var(--lumo-tint-60pct);
  }
  .bg-tint-50 {
    background-color: var(--lumo-tint-50pct);
  }
  .bg-tint-40 {
    background-color: var(--lumo-tint-40pct);
  }
  .bg-tint-30 {
    background-color: var(--lumo-tint-30pct);
  }
  .bg-tint-20 {
    background-color: var(--lumo-tint-20pct);
  }
  .bg-tint-10 {
    background-color: var(--lumo-tint-10pct);
  }
  .bg-tint-5 {
    background-color: var(--lumo-tint-5pct);
  }

  .bg-shade {
    background-color: var(--lumo-shade);
  }
  .bg-shade-90 {
    background-color: var(--lumo-shade-90pct);
  }
  .bg-shade-80 {
    background-color: var(--lumo-shade-80pct);
  }
  .bg-shade-70 {
    background-color: var(--lumo-shade-70pct);
  }
  .bg-shade-60 {
    background-color: var(--lumo-shade-60pct);
  }
  .bg-shade-50 {
    background-color: var(--lumo-shade-50pct);
  }
  .bg-shade-40 {
    background-color: var(--lumo-shade-40pct);
  }
  .bg-shade-30 {
    background-color: var(--lumo-shade-30pct);
  }
  .bg-shade-20 {
    background-color: var(--lumo-shade-20pct);
  }
  .bg-shade-10 {
    background-color: var(--lumo-shade-10pct);
  }
  .bg-shade-5 {
    background-color: var(--lumo-shade-5pct);
  }

  .bg-contrast {
    background-color: var(--lumo-contrast);
  }
  .bg-contrast-90 {
    background-color: var(--lumo-contrast-90pct);
  }
  .bg-contrast-80 {
    background-color: var(--lumo-contrast-80pct);
  }
  .bg-contrast-70 {
    background-color: var(--lumo-contrast-70pct);
  }
  .bg-contrast-60 {
    background-color: var(--lumo-contrast-60pct);
  }
  .bg-contrast-50 {
    background-color: var(--lumo-contrast-50pct);
  }
  .bg-contrast-40 {
    background-color: var(--lumo-contrast-40pct);
  }
  .bg-contrast-30 {
    background-color: var(--lumo-contrast-30pct);
  }
  .bg-contrast-20 {
    background-color: var(--lumo-contrast-20pct);
  }
  .bg-contrast-10 {
    background-color: var(--lumo-contrast-10pct);
  }
  .bg-contrast-5 {
    background-color: var(--lumo-contrast-5pct);
  }

  .bg-primary {
    background-color: var(--lumo-primary-color);
  }
  .bg-primary-50 {
    background-color: var(--lumo-primary-color-50pct);
  }
  .bg-primary-10 {
    background-color: var(--lumo-primary-color-10pct);
  }

  .bg-error {
    background-color: var(--lumo-error-color);
  }
  .bg-error-50 {
    background-color: var(--lumo-error-color-50pct);
  }
  .bg-error-10 {
    background-color: var(--lumo-error-color-10pct);
  }

  .bg-success {
    background-color: var(--lumo-success-color);
  }
  .bg-success-50 {
    background-color: var(--lumo-success-color-50pct);
  }
  .bg-success-10 {
    background-color: var(--lumo-success-color-10pct);
  }

  .bg-warning {
    background-color: var(--lumo-warning-color);
  }
  .bg-warning-10 {
    background-color: var(--lumo-warning-color-10pct);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const I0=et`
  /* === Border === */
  .border-0 {
    border: none;
  }
  .border-dashed {
    --lumo-utility-border-style: dashed;
  }
  .border-dotted {
    --lumo-utility-border-style: dotted;
  }
  .border {
    border: 1px var(--lumo-utility-border-style, solid) var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-b {
    border-bottom: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-e {
    border-inline-end: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-l {
    border-left: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-r {
    border-right: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-s {
    border-inline-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .border-t {
    border-top: 1px var(--lumo-utility-border-style, solid) var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }

  /* === Border color === */
  .border-contrast {
    --lumo-utility-border-color: var(--lumo-contrast);
  }
  .border-contrast-90 {
    --lumo-utility-border-color: var(--lumo-contrast-90pct);
  }
  .border-contrast-80 {
    --lumo-utility-border-color: var(--lumo-contrast-80pct);
  }
  .border-contrast-70 {
    --lumo-utility-border-color: var(--lumo-contrast-70pct);
  }
  .border-contrast-60 {
    --lumo-utility-border-color: var(--lumo-contrast-60pct);
  }
  .border-contrast-50 {
    --lumo-utility-border-color: var(--lumo-contrast-50pct);
  }
  .border-contrast-40 {
    --lumo-utility-border-color: var(--lumo-contrast-40pct);
  }
  .border-contrast-30 {
    --lumo-utility-border-color: var(--lumo-contrast-30pct);
  }
  .border-contrast-20 {
    --lumo-utility-border-color: var(--lumo-contrast-20pct);
  }
  .border-contrast-10 {
    --lumo-utility-border-color: var(--lumo-contrast-10pct);
  }
  .border-contrast-5 {
    --lumo-utility-border-color: var(--lumo-contrast-5pct);
  }

  .border-primary {
    --lumo-utility-border-color: var(--lumo-primary-color);
  }
  .border-primary-50 {
    --lumo-utility-border-color: var(--lumo-primary-color-50pct);
  }
  .border-primary-10 {
    --lumo-utility-border-color: var(--lumo-primary-color-10pct);
  }

  .border-error {
    --lumo-utility-border-color: var(--lumo-error-color);
  }
  .border-error-50 {
    --lumo-utility-border-color: var(--lumo-error-color-50pct);
  }
  .border-error-10 {
    --lumo-utility-border-color: var(--lumo-error-color-10pct);
  }

  .border-success {
    --lumo-utility-border-color: var(--lumo-success-color);
  }
  .border-success-50 {
    --lumo-utility-border-color: var(--lumo-success-color-50pct);
  }
  .border-success-10 {
    --lumo-utility-border-color: var(--lumo-success-color-10pct);
  }

  .border-warning {
    --lumo-utility-border-color: var(--lumo-warning-color);
  }
  .border-warning-strong {
    --lumo-utility-border-color: var(--lumo-warning-text-color);
  }
  .border-warning-10 {
    --lumo-utility-border-color: var(--lumo-warning-color-10pct);
  }

  /* === Border radius === */
  .rounded-none {
    border-radius: 0;
  }
  .rounded-s {
    border-radius: var(--lumo-border-radius-s);
  }
  .rounded-m {
    border-radius: var(--lumo-border-radius-m);
  }
  .rounded-l {
    border-radius: var(--lumo-border-radius-l);
  }
  .rounded-full {
    border-radius: 9999px;
  }

  /* === Divide === */
  .divide-x > * + * {
    border-inline-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
  .divide-y > * + * {
    border-block-start: 1px var(--lumo-utility-border-style, solid)
      var(--lumo-utility-border-color, var(--lumo-contrast-10pct));
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const U0=et`
  /* === Backdrop filter === */
  .backdrop-blur-none {
    backdrop-filter: blur(0);
  }
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
  .backdrop-blur {
    backdrop-filter: blur(8px);
  }
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
  }
  .backdrop-blur-xl {
    backdrop-filter: blur(24px);
  }
  .backdrop-blur-2xl {
    backdrop-filter: blur(40px);
  }
  .backdrop-blur-3xl {
    backdrop-filter: blur(64px);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const j0=et`
  /* === Align content === */
  .content-center {
    align-content: center;
  }
  .content-end {
    align-content: flex-end;
  }
  .content-start {
    align-content: flex-start;
  }
  .content-around {
    align-content: space-around;
  }
  .content-between {
    align-content: space-between;
  }
  .content-evenly {
    align-content: space-evenly;
  }
  .content-stretch {
    align-content: stretch;
  }

  /* === Align items === */
  .items-baseline {
    align-items: baseline;
  }
  .items-center {
    align-items: center;
  }
  .items-end {
    align-items: flex-end;
  }
  .items-start {
    align-items: flex-start;
  }
  .items-stretch {
    align-items: stretch;
  }

  /* === Align self === */
  .self-auto {
    align-self: auto;
  }
  .self-baseline {
    align-self: baseline;
  }
  .self-center {
    align-self: center;
  }
  .self-end {
    align-self: flex-end;
  }
  .self-start {
    align-self: flex-start;
  }
  .self-stretch {
    align-self: stretch;
  }

  /* === Flex === */
  .flex-1 {
    flex: 1 1 0%;
  }
  .flex-auto {
    flex: 1 1 auto;
  }
  .flex-none {
    flex: none;
  }

  /* === Flex direction === */
  .flex-col {
    flex-direction: column;
  }
  .flex-col-reverse {
    flex-direction: column-reverse;
  }
  .flex-row {
    flex-direction: row;
  }
  .flex-row-reverse {
    flex-direction: row-reverse;
  }

  /* === Flex grow === */
  .flex-grow {
    flex-grow: 1;
  }
  .flex-grow-0 {
    flex-grow: 0;
  }

  /* === Flex shrink === */
  .flex-shrink {
    flex-shrink: 1;
  }
  .flex-shrink-0 {
    flex-shrink: 0;
  }

  /* === Flex wrap === */
  .flex-nowrap {
    flex-wrap: nowrap;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flex-wrap-reverse {
    flex-wrap: wrap-reverse;
  }

  /* === Gap === */
  .gap-xs {
    gap: var(--lumo-space-xs);
  }
  .gap-s {
    gap: var(--lumo-space-s);
  }
  .gap-m {
    gap: var(--lumo-space-m);
  }
  .gap-l {
    gap: var(--lumo-space-l);
  }
  .gap-xl {
    gap: var(--lumo-space-xl);
  }

  /* === Gap (column) === */
  .gap-x-xs {
    column-gap: var(--lumo-space-xs);
  }
  .gap-x-s {
    column-gap: var(--lumo-space-s);
  }
  .gap-x-m {
    column-gap: var(--lumo-space-m);
  }
  .gap-x-l {
    column-gap: var(--lumo-space-l);
  }
  .gap-x-xl {
    column-gap: var(--lumo-space-xl);
  }

  /* === Gap (row) === */
  .gap-y-xs {
    row-gap: var(--lumo-space-xs);
  }
  .gap-y-s {
    row-gap: var(--lumo-space-s);
  }
  .gap-y-m {
    row-gap: var(--lumo-space-m);
  }
  .gap-y-l {
    row-gap: var(--lumo-space-l);
  }
  .gap-y-xl {
    row-gap: var(--lumo-space-xl);
  }

  /* === Grid auto flow === */
  .grid-flow-col {
    grid-auto-flow: column;
  }
  .grid-flow-row {
    grid-auto-flow: row;
  }

  /* === Grid columns === */
  .grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
  .grid-cols-5 {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
  .grid-cols-6 {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
  .grid-cols-7 {
    grid-template-columns: repeat(7, minmax(0, 1fr));
  }
  .grid-cols-8 {
    grid-template-columns: repeat(8, minmax(0, 1fr));
  }
  .grid-cols-9 {
    grid-template-columns: repeat(9, minmax(0, 1fr));
  }
  .grid-cols-10 {
    grid-template-columns: repeat(10, minmax(0, 1fr));
  }
  .grid-cols-11 {
    grid-template-columns: repeat(11, minmax(0, 1fr));
  }
  .grid-cols-12 {
    grid-template-columns: repeat(12, minmax(0, 1fr));
  }

  /* === Grid rows === */
  .grid-rows-1 {
    grid-template-rows: repeat(1, minmax(0, 1fr));
  }
  .grid-rows-2 {
    grid-template-rows: repeat(2, minmax(0, 1fr));
  }
  .grid-rows-3 {
    grid-template-rows: repeat(3, minmax(0, 1fr));
  }
  .grid-rows-4 {
    grid-template-rows: repeat(4, minmax(0, 1fr));
  }
  .grid-rows-5 {
    grid-template-rows: repeat(5, minmax(0, 1fr));
  }
  .grid-rows-6 {
    grid-template-rows: repeat(6, minmax(0, 1fr));
  }

  /* === Justify content === */
  .justify-center {
    justify-content: center;
  }
  .justify-end {
    justify-content: flex-end;
  }
  .justify-start {
    justify-content: flex-start;
  }
  .justify-around {
    justify-content: space-around;
  }
  .justify-between {
    justify-content: space-between;
  }
  .justify-evenly {
    justify-content: space-evenly;
  }

  /* === Span (column) === */
  .col-span-1 {
    grid-column: span 1 / span 1;
  }
  .col-span-2 {
    grid-column: span 2 / span 2;
  }
  .col-span-3 {
    grid-column: span 3 / span 3;
  }
  .col-span-4 {
    grid-column: span 4 / span 4;
  }
  .col-span-5 {
    grid-column: span 5 / span 5;
  }
  .col-span-6 {
    grid-column: span 6 / span 6;
  }
  .col-span-7 {
    grid-column: span 7 / span 7;
  }
  .col-span-8 {
    grid-column: span 8 / span 8;
  }
  .col-span-9 {
    grid-column: span 9 / span 9;
  }
  .col-span-10 {
    grid-column: span 10 / span 10;
  }
  .col-span-11 {
    grid-column: span 11 / span 11;
  }
  .col-span-12 {
    grid-column: span 12 / span 12;
  }
  .col-span-full {
    grid-column: 1 / -1;
  }

  /* === Span (row) === */
  .row-span-1 {
    grid-row: span 1 / span 1;
  }
  .row-span-2 {
    grid-row: span 2 / span 2;
  }
  .row-span-3 {
    grid-row: span 3 / span 3;
  }
  .row-span-4 {
    grid-row: span 4 / span 4;
  }
  .row-span-5 {
    grid-row: span 5 / span 5;
  }
  .row-span-6 {
    grid-row: span 6 / span 6;
  }
  .row-span-full {
    grid-row: 1 / -1;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:items-baseline {
      align-items: baseline;
    }
    .sm\\:items-center {
      align-items: center;
    }
    .sm\\:items-end {
      align-items: flex-end;
    }
    .sm\\:items-start {
      align-items: flex-start;
    }
    .sm\\:items-stretch {
      align-items: stretch;
    }
    .sm\\:flex-col {
      flex-direction: column;
    }
    .sm\\:flex-row {
      flex-direction: row;
    }
    .sm\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .sm\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .sm\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .sm\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .sm\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .sm\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .sm\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .sm\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .sm\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .sm\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .sm\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .sm\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .md\\:items-baseline {
      align-items: baseline;
    }
    .md\\:items-center {
      align-items: center;
    }
    .md\\:items-end {
      align-items: flex-end;
    }
    .md\\:items-start {
      align-items: flex-start;
    }
    .md\\:items-stretch {
      align-items: stretch;
    }
    .md\\:flex-col {
      flex-direction: column;
    }
    .md\\:flex-row {
      flex-direction: row;
    }
    .md\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .md\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .md\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .md\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .md\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .md\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .md\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .md\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .md\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .md\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .md\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .md\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1024px) {
    .lg\\:items-baseline {
      align-items: baseline;
    }
    .lg\\:items-center {
      align-items: center;
    }
    .lg\\:items-end {
      align-items: flex-end;
    }
    .lg\\:items-start {
      align-items: flex-start;
    }
    .lg\\:items-stretch {
      align-items: stretch;
    }
    .lg\\:flex-col {
      flex-direction: column;
    }
    .lg\\:flex-row {
      flex-direction: row;
    }
    .lg\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .lg\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .lg\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .lg\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .lg\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .lg\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .lg\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .lg\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .lg\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .lg\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .lg\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .lg\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1280px) {
    .xl\\:items-baseline {
      align-items: baseline;
    }
    .xl\\:items-center {
      align-items: center;
    }
    .xl\\:items-end {
      align-items: flex-end;
    }
    .xl\\:items-start {
      align-items: flex-start;
    }
    .xl\\:items-stretch {
      align-items: stretch;
    }
    .xl\\:flex-col {
      flex-direction: column;
    }
    .xl\\:flex-row {
      flex-direction: row;
    }
    .xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:items-baseline {
      align-items: baseline;
    }
    .\\32xl\\:items-center {
      align-items: center;
    }
    .\\32xl\\:items-end {
      align-items: flex-end;
    }
    .\\32xl\\:items-start {
      align-items: flex-start;
    }
    .\\32xl\\:items-stretch {
      align-items: stretch;
    }
    .\\32xl\\:flex-col {
      flex-direction: column;
    }
    .\\32xl\\:flex-row {
      flex-direction: row;
    }
    .\\32xl\\:grid-cols-1 {
      grid-template-columns: repeat(1, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-2 {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-3 {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-4 {
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-5 {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-6 {
      grid-template-columns: repeat(6, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-7 {
      grid-template-columns: repeat(7, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-8 {
      grid-template-columns: repeat(8, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-9 {
      grid-template-columns: repeat(9, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-10 {
      grid-template-columns: repeat(10, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-11 {
      grid-template-columns: repeat(11, minmax(0, 1fr));
    }
    .\\32xl\\:grid-cols-12 {
      grid-template-columns: repeat(12, minmax(0, 1fr));
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const V0=et`
  /* === Aspect ratio === */
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  .aspect-video {
    aspect-ratio: 16 / 9;
  }

  /* === Box sizing === */
  .box-border {
    box-sizing: border-box;
  }
  .box-content {
    box-sizing: content-box;
  }

  /* === Display === */
  .block {
    display: block;
  }
  .flex {
    display: flex;
  }
  .grid {
    display: grid;
  }
  .hidden {
    display: none;
  }
  .inline {
    display: inline;
  }
  .inline-block {
    display: inline-block;
  }
  .inline-flex {
    display: inline-flex;
  }
  .inline-grid {
    display: inline-grid;
  }

  /* === Overflow === */
  .overflow-auto {
    overflow: auto;
  }
  .overflow-hidden {
    overflow: hidden;
  }
  .overflow-scroll {
    overflow: scroll;
  }

  /* === Position === */
  .absolute {
    position: absolute;
  }
  .fixed {
    position: fixed;
  }
  .static {
    position: static;
  }
  .sticky {
    position: sticky;
  }
  .relative {
    position: relative;
  }

  /* === Top, end, bottom, start === */
  .-bottom-xs {
    bottom: calc(var(--lumo-space-xs) / -1);
  }
  .-bottom-s {
    bottom: calc(var(--lumo-space-s) / -1);
  }
  .-bottom-m {
    bottom: calc(var(--lumo-space-m) / -1);
  }
  .-bottom-l {
    bottom: calc(var(--lumo-space-l) / -1);
  }
  .-bottom-xl {
    bottom: calc(var(--lumo-space-xl) / -1);
  }
  .-bottom-full {
    bottom: -100%;
  }
  .bottom-0 {
    bottom: 0;
  }
  .bottom-xs {
    bottom: var(--lumo-space-xs);
  }
  .bottom-s {
    bottom: var(--lumo-space-s);
  }
  .bottom-m {
    bottom: var(--lumo-space-m);
  }
  .bottom-l {
    bottom: var(--lumo-space-l);
  }
  .bottom-xl {
    bottom: var(--lumo-space-xl);
  }
  .bottom-auto {
    bottom: auto;
  }
  .bottom-full {
    bottom: 100%;
  }

  .-end-xs {
    inset-inline-end: calc(var(--lumo-space-xs) / -1);
  }
  .-end-s {
    inset-inline-end: calc(var(--lumo-space-s) / -1);
  }
  .-end-m {
    inset-inline-end: calc(var(--lumo-space-m) / -1);
  }
  .-end-l {
    inset-inline-end: calc(var(--lumo-space-l) / -1);
  }
  .-end-xl {
    inset-inline-end: calc(var(--lumo-space-xl) / -1);
  }
  .-end-full {
    inset-inline-end: -100%;
  }
  .end-0 {
    inset-inline-end: 0;
  }
  .end-xs {
    inset-inline-end: var(--lumo-space-xs);
  }
  .end-s {
    inset-inline-end: var(--lumo-space-s);
  }
  .end-m {
    inset-inline-end: var(--lumo-space-m);
  }
  .end-l {
    inset-inline-end: var(--lumo-space-l);
  }
  .end-xl {
    inset-inline-end: var(--lumo-space-xl);
  }
  .end-auto {
    inset-inline-end: auto;
  }
  .end-full {
    inset-inline-end: 100%;
  }

  .-start-xs {
    inset-inline-start: calc(var(--lumo-space-xs) / -1);
  }
  .-start-s {
    inset-inline-start: calc(var(--lumo-space-s) / -1);
  }
  .-start-m {
    inset-inline-start: calc(var(--lumo-space-m) / -1);
  }
  .-start-l {
    inset-inline-start: calc(var(--lumo-space-l) / -1);
  }
  .-start-xl {
    inset-inline-start: calc(var(--lumo-space-xl) / -1);
  }
  .-start-full {
    inset-inline-start: -100%;
  }
  .start-0 {
    inset-inline-start: 0;
  }
  .start-xs {
    inset-inline-start: var(--lumo-space-xs);
  }
  .start-s {
    inset-inline-start: var(--lumo-space-s);
  }
  .start-m {
    inset-inline-start: var(--lumo-space-m);
  }
  .start-l {
    inset-inline-start: var(--lumo-space-l);
  }
  .start-xl {
    inset-inline-start: var(--lumo-space-xl);
  }
  .start-auto {
    inset-inline-start: auto;
  }
  .start-full {
    inset-inline-start: 100%;
  }

  .-top-xs {
    top: calc(var(--lumo-space-xs) / -1);
  }
  .-top-s {
    top: calc(var(--lumo-space-s) / -1);
  }
  .-top-m {
    top: calc(var(--lumo-space-m) / -1);
  }
  .-top-l {
    top: calc(var(--lumo-space-l) / -1);
  }
  .-top-xl {
    top: calc(var(--lumo-space-xl) / -1);
  }
  .-top-full {
    top: -100%;
  }
  .top-0 {
    top: 0;
  }
  .top-xs {
    top: var(--lumo-space-xs);
  }
  .top-s {
    top: var(--lumo-space-s);
  }
  .top-m {
    top: var(--lumo-space-m);
  }
  .top-l {
    top: var(--lumo-space-l);
  }
  .top-xl {
    top: var(--lumo-space-xl);
  }
  .top-auto {
    top: auto;
  }
  .top-full {
    top: 100%;
  }

  /* === Visibility === */
  .invisible {
    visibility: hidden;
  }
  .visible {
    visibility: visible;
  }

  /* === Z-index === */
  .z-0 {
    z-index: 0;
  }
  .z-10 {
    z-index: 10;
  }
  .z-20 {
    z-index: 20;
  }
  .z-30 {
    z-index: 30;
  }
  .z-40 {
    z-index: 40;
  }
  .z-50 {
    z-index: 50;
  }
  .z-auto {
    z-index: auto;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    /* Display */
    .sm\\:block {
      display: block;
    }
    .sm\\:flex {
      display: flex;
    }
    .sm\\:grid {
      display: grid;
    }
    .sm\\:hidden {
      display: none;
    }
    .sm\\:inline {
      display: inline;
    }
    .sm\\:inline-block {
      display: inline-block;
    }
    .sm\\:inline-flex {
      display: inline-flex;
    }
    .sm\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .sm\\:absolute {
      position: absolute;
    }
    .sm\\:fixed {
      position: fixed;
    }
    .sm\\:relative {
      position: relative;
    }
    .sm\\:static {
      position: static;
    }
    .sm\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 768px) {
    /* Display */
    .md\\:block {
      display: block;
    }
    .md\\:flex {
      display: flex;
    }
    .md\\:grid {
      display: grid;
    }
    .md\\:hidden {
      display: none;
    }
    .md\\:inline {
      display: inline;
    }
    .md\\:inline-block {
      display: inline-block;
    }
    .md\\:inline-flex {
      display: inline-flex;
    }
    .md\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .md\\:absolute {
      position: absolute;
    }
    .md\\:fixed {
      position: fixed;
    }
    .md\\:relative {
      position: relative;
    }
    .md\\:static {
      position: static;
    }
    .md\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1024px) {
    /* Display */
    .lg\\:block {
      display: block;
    }
    .lg\\:flex {
      display: flex;
    }
    .lg\\:grid {
      display: grid;
    }
    .lg\\:hidden {
      display: none;
    }
    .lg\\:inline {
      display: inline;
    }
    .lg\\:inline-block {
      display: inline-block;
    }
    .lg\\:inline-flex {
      display: inline-flex;
    }
    .lg\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .lg\\:absolute {
      position: absolute;
    }
    .lg\\:fixed {
      position: fixed;
    }
    .lg\\:relative {
      position: relative;
    }
    .lg\\:static {
      position: static;
    }
    .lg\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1280px) {
    /* Display */
    .xl\\:block {
      display: block;
    }
    .xl\\:flex {
      display: flex;
    }
    .xl\\:grid {
      display: grid;
    }
    .xl\\:hidden {
      display: none;
    }
    .xl\\:inline {
      display: inline;
    }
    .xl\\:inline-block {
      display: inline-block;
    }
    .xl\\:inline-flex {
      display: inline-flex;
    }
    .xl\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .xl\\:absolute {
      position: absolute;
    }
    .xl\\:fixed {
      position: fixed;
    }
    .xl\\:relative {
      position: relative;
    }
    .xl\\:static {
      position: static;
    }
    .xl\\:sticky {
      position: sticky;
    }
  }
  @media (min-width: 1536px) {
    /* Display */
    .\\32xl\\:block {
      display: block;
    }
    .\\32xl\\:flex {
      display: flex;
    }
    .\\32xl\\:grid {
      display: grid;
    }
    .\\32xl\\:hidden {
      display: none;
    }
    .\\32xl\\:inline {
      display: inline;
    }
    .\\32xl\\:inline-block {
      display: inline-block;
    }
    .\\32xl\\:inline-flex {
      display: inline-flex;
    }
    .\\32xl\\:inline-grid {
      display: inline-grid;
    }

    /* Position */
    .\\32xl\\:absolute {
      position: absolute;
    }
    .\\32xl\\:fixed {
      position: fixed;
    }
    .\\32xl\\:relative {
      position: relative;
    }
    .\\32xl\\:static {
      position: static;
    }
    .\\32xl\\:sticky {
      position: sticky;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const H0=et`
  /* === Box shadow === */
  .shadow-none {
    box-shadow: none;
  }
  .shadow-xs {
    box-shadow: var(--lumo-box-shadow-xs);
  }
  .shadow-s {
    box-shadow: var(--lumo-box-shadow-s);
  }
  .shadow-m {
    box-shadow: var(--lumo-box-shadow-m);
  }
  .shadow-l {
    box-shadow: var(--lumo-box-shadow-l);
  }
  .shadow-xl {
    box-shadow: var(--lumo-box-shadow-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const B0=et`
  /* === Height === */
  .h-0 {
    height: 0;
  }
  .h-xs {
    height: var(--lumo-size-xs);
  }
  .h-s {
    height: var(--lumo-size-s);
  }
  .h-m {
    height: var(--lumo-size-m);
  }
  .h-l {
    height: var(--lumo-size-l);
  }
  .h-xl {
    height: var(--lumo-size-xl);
  }
  .h-auto {
    height: auto;
  }
  .h-full {
    height: 100%;
  }
  .h-screen {
    height: 100vh;
  }

  /* === Height (max) === */
  .max-h-full {
    max-height: 100%;
  }
  .max-h-screen {
    max-height: 100vh;
  }

  /* === Height (min) === */
  .min-h-0 {
    min-height: 0;
  }
  .min-h-full {
    min-height: 100%;
  }
  .min-h-screen {
    min-height: 100vh;
  }

  /* === Icon sizing === */
  .icon-s {
    height: var(--lumo-icon-size-s);
    width: var(--lumo-icon-size-s);
  }
  .icon-m {
    height: var(--lumo-icon-size-m);
    width: var(--lumo-icon-size-m);
  }
  .icon-l {
    height: var(--lumo-icon-size-l);
    width: var(--lumo-icon-size-l);
  }

  /* === Width === */
  .w-xs {
    width: var(--lumo-size-xs);
  }
  .w-s {
    width: var(--lumo-size-s);
  }
  .w-m {
    width: var(--lumo-size-m);
  }
  .w-l {
    width: var(--lumo-size-l);
  }
  .w-xl {
    width: var(--lumo-size-xl);
  }
  .w-auto {
    width: auto;
  }
  .w-full {
    width: 100%;
  }

  /* === Width (max) === */
  .max-w-full {
    max-width: 100%;
  }
  .max-w-screen-sm {
    max-width: 640px;
  }
  .max-w-screen-md {
    max-width: 768px;
  }
  .max-w-screen-lg {
    max-width: 1024px;
  }
  .max-w-screen-xl {
    max-width: 1280px;
  }
  .max-w-screen-2xl {
    max-width: 1536px;
  }

  /* === Width (min) === */
  .min-w-0 {
    min-width: 0;
  }
  .min-w-full {
    min-width: 100%;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const W0=et`
  /* === Margin === */
  .-m-xs {
    margin: calc(var(--lumo-space-xs) / -1);
  }
  .-m-s {
    margin: calc(var(--lumo-space-s) / -1);
  }
  .-m-m {
    margin: calc(var(--lumo-space-m) / -1);
  }
  .-m-l {
    margin: calc(var(--lumo-space-l) / -1);
  }
  .-m-xl {
    margin: calc(var(--lumo-space-xl) / -1);
  }
  .m-0 {
    margin: 0;
  }
  .m-xs {
    margin: var(--lumo-space-xs);
  }
  .m-s {
    margin: var(--lumo-space-s);
  }
  .m-m {
    margin: var(--lumo-space-m);
  }
  .m-l {
    margin: var(--lumo-space-l);
  }
  .m-xl {
    margin: var(--lumo-space-xl);
  }
  .m-auto {
    margin: auto;
  }

  /* === Margin (bottom) === */
  .-mb-xs {
    margin-bottom: calc(var(--lumo-space-xs) / -1);
  }
  .-mb-s {
    margin-bottom: calc(var(--lumo-space-s) / -1);
  }
  .-mb-m {
    margin-bottom: calc(var(--lumo-space-m) / -1);
  }
  .-mb-l {
    margin-bottom: calc(var(--lumo-space-l) / -1);
  }
  .-mb-xl {
    margin-bottom: calc(var(--lumo-space-xl) / -1);
  }
  .mb-0 {
    margin-bottom: 0;
  }
  .mb-xs {
    margin-bottom: var(--lumo-space-xs);
  }
  .mb-s {
    margin-bottom: var(--lumo-space-s);
  }
  .mb-m {
    margin-bottom: var(--lumo-space-m);
  }
  .mb-l {
    margin-bottom: var(--lumo-space-l);
  }
  .mb-xl {
    margin-bottom: var(--lumo-space-xl);
  }
  .mb-auto {
    margin-bottom: auto;
  }

  /* === Margin (end) === */
  .-me-xs {
    margin-inline-end: calc(var(--lumo-space-xs) / -1);
  }
  .-me-s {
    margin-inline-end: calc(var(--lumo-space-s) / -1);
  }
  .-me-m {
    margin-inline-end: calc(var(--lumo-space-m) / -1);
  }
  .-me-l {
    margin-inline-end: calc(var(--lumo-space-l) / -1);
  }
  .-me-xl {
    margin-inline-end: calc(var(--lumo-space-xl) / -1);
  }
  .me-0 {
    margin-inline-end: 0;
  }
  .me-xs {
    margin-inline-end: var(--lumo-space-xs);
  }
  .me-s {
    margin-inline-end: var(--lumo-space-s);
  }
  .me-m {
    margin-inline-end: var(--lumo-space-m);
  }
  .me-l {
    margin-inline-end: var(--lumo-space-l);
  }
  .me-xl {
    margin-inline-end: var(--lumo-space-xl);
  }
  .me-auto {
    margin-inline-end: auto;
  }

  /* === Margin (horizontal) === */
  .-mx-xs {
    margin-inline: calc(var(--lumo-space-xs) / -1);
  }
  .-mx-s {
    margin-inline: calc(var(--lumo-space-s) / -1);
  }
  .-mx-m {
    margin-inline: calc(var(--lumo-space-m) / -1);
  }
  .-mx-l {
    margin-inline: calc(var(--lumo-space-l) / -1);
  }
  .-mx-xl {
    margin-inline: calc(var(--lumo-space-xl) / -1);
  }
  .mx-0 {
    margin-inline: 0;
  }
  .mx-xs {
    margin-inline: var(--lumo-space-xs);
  }
  .mx-s {
    margin-inline: var(--lumo-space-s);
  }
  .mx-m {
    margin-inline: var(--lumo-space-m);
  }
  .mx-l {
    margin-inline: var(--lumo-space-l);
  }
  .mx-xl {
    margin-inline: var(--lumo-space-xl);
  }
  .mx-auto {
    margin-inline: auto;
  }

  /* === Margin (left) === */
  .-ml-xs {
    margin-left: calc(var(--lumo-space-xs) / -1);
  }
  .-ml-s {
    margin-left: calc(var(--lumo-space-s) / -1);
  }
  .-ml-m {
    margin-left: calc(var(--lumo-space-m) / -1);
  }
  .-ml-l {
    margin-left: calc(var(--lumo-space-l) / -1);
  }
  .-ml-xl {
    margin-left: calc(var(--lumo-space-xl) / -1);
  }
  .ml-0 {
    margin-left: 0;
  }
  .ml-xs {
    margin-left: var(--lumo-space-xs);
  }
  .ml-s {
    margin-left: var(--lumo-space-s);
  }
  .ml-m {
    margin-left: var(--lumo-space-m);
  }
  .ml-l {
    margin-left: var(--lumo-space-l);
  }
  .ml-xl {
    margin-left: var(--lumo-space-xl);
  }
  .ml-auto {
    margin-left: auto;
  }

  /* === Margin (right) === */
  .-mr-xs {
    margin-right: calc(var(--lumo-space-xs) / -1);
  }
  .-mr-s {
    margin-right: calc(var(--lumo-space-s) / -1);
  }
  .-mr-m {
    margin-right: calc(var(--lumo-space-m) / -1);
  }
  .-mr-l {
    margin-right: calc(var(--lumo-space-l) / -1);
  }
  .-mr-xl {
    margin-right: calc(var(--lumo-space-xl) / -1);
  }
  .mr-0 {
    margin-right: 0;
  }
  .mr-xs {
    margin-right: var(--lumo-space-xs);
  }
  .mr-s {
    margin-right: var(--lumo-space-s);
  }
  .mr-m {
    margin-right: var(--lumo-space-m);
  }
  .mr-l {
    margin-right: var(--lumo-space-l);
  }
  .mr-xl {
    margin-right: var(--lumo-space-xl);
  }
  .mr-auto {
    margin-right: auto;
  }

  /* === Margin (start) === */
  .-ms-xs {
    margin-inline-start: calc(var(--lumo-space-xs) / -1);
  }
  .-ms-s {
    margin-inline-start: calc(var(--lumo-space-s) / -1);
  }
  .-ms-m {
    margin-inline-start: calc(var(--lumo-space-m) / -1);
  }
  .-ms-l {
    margin-inline-start: calc(var(--lumo-space-l) / -1);
  }
  .-ms-xl {
    margin-inline-start: calc(var(--lumo-space-xl) / -1);
  }
  .ms-0 {
    margin-inline-start: 0;
  }
  .ms-xs {
    margin-inline-start: var(--lumo-space-xs);
  }
  .ms-s {
    margin-inline-start: var(--lumo-space-s);
  }
  .ms-m {
    margin-inline-start: var(--lumo-space-m);
  }
  .ms-l {
    margin-inline-start: var(--lumo-space-l);
  }
  .ms-xl {
    margin-inline-start: var(--lumo-space-xl);
  }
  .ms-auto {
    margin-inline-start: auto;
  }

  /* === Margin (top) === */
  .-mt-xs {
    margin-top: calc(var(--lumo-space-xs) / -1);
  }
  .-mt-s {
    margin-top: calc(var(--lumo-space-s) / -1);
  }
  .-mt-m {
    margin-top: calc(var(--lumo-space-m) / -1);
  }
  .-mt-l {
    margin-top: calc(var(--lumo-space-l) / -1);
  }
  .-mt-xl {
    margin-top: calc(var(--lumo-space-xl) / -1);
  }
  .mt-0 {
    margin-top: 0;
  }
  .mt-xs {
    margin-top: var(--lumo-space-xs);
  }
  .mt-s {
    margin-top: var(--lumo-space-s);
  }
  .mt-m {
    margin-top: var(--lumo-space-m);
  }
  .mt-l {
    margin-top: var(--lumo-space-l);
  }
  .mt-xl {
    margin-top: var(--lumo-space-xl);
  }
  .mt-auto {
    margin-top: auto;
  }

  /* === Margin (vertical) === */
  .-my-xs {
    margin-block: calc(var(--lumo-space-xs) / -1);
  }
  .-my-s {
    margin-block: calc(var(--lumo-space-s) / -1);
  }
  .-my-m {
    margin-block: calc(var(--lumo-space-m) / -1);
  }
  .-my-l {
    margin-block: calc(var(--lumo-space-l) / -1);
  }
  .-my-xl {
    margin-block: calc(var(--lumo-space-xl) / -1);
  }
  .my-0 {
    margin-block: 0;
  }
  .my-xs {
    margin-block: var(--lumo-space-xs);
  }
  .my-s {
    margin-block: var(--lumo-space-s);
  }
  .my-m {
    margin-block: var(--lumo-space-m);
  }
  .my-l {
    margin-block: var(--lumo-space-l);
  }
  .my-xl {
    margin-block: var(--lumo-space-xl);
  }
  .my-auto {
    margin-block: auto;
  }

  /* === Padding === */
  .p-0 {
    padding: 0;
  }
  .p-xs {
    padding: var(--lumo-space-xs);
  }
  .p-s {
    padding: var(--lumo-space-s);
  }
  .p-m {
    padding: var(--lumo-space-m);
  }
  .p-l {
    padding: var(--lumo-space-l);
  }
  .p-xl {
    padding: var(--lumo-space-xl);
  }

  /* === Padding (bottom) === */
  .pb-0 {
    padding-bottom: 0;
  }
  .pb-xs {
    padding-bottom: var(--lumo-space-xs);
  }
  .pb-s {
    padding-bottom: var(--lumo-space-s);
  }
  .pb-m {
    padding-bottom: var(--lumo-space-m);
  }
  .pb-l {
    padding-bottom: var(--lumo-space-l);
  }
  .pb-xl {
    padding-bottom: var(--lumo-space-xl);
  }

  /* === Padding (end) === */
  .pe-0 {
    padding-inline-end: 0;
  }
  .pe-xs {
    padding-inline-end: var(--lumo-space-xs);
  }
  .pe-s {
    padding-inline-end: var(--lumo-space-s);
  }
  .pe-m {
    padding-inline-end: var(--lumo-space-m);
  }
  .pe-l {
    padding-inline-end: var(--lumo-space-l);
  }
  .pe-xl {
    padding-inline-end: var(--lumo-space-xl);
  }

  /* === Padding (horizontal) === */
  .px-0 {
    padding-left: 0;
    padding-right: 0;
  }
  .px-xs {
    padding-left: var(--lumo-space-xs);
    padding-right: var(--lumo-space-xs);
  }
  .px-s {
    padding-left: var(--lumo-space-s);
    padding-right: var(--lumo-space-s);
  }
  .px-m {
    padding-left: var(--lumo-space-m);
    padding-right: var(--lumo-space-m);
  }
  .px-l {
    padding-left: var(--lumo-space-l);
    padding-right: var(--lumo-space-l);
  }
  .px-xl {
    padding-left: var(--lumo-space-xl);
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (left) === */
  .pl-0 {
    padding-left: 0;
  }
  .pl-xs {
    padding-left: var(--lumo-space-xs);
  }
  .pl-s {
    padding-left: var(--lumo-space-s);
  }
  .pl-m {
    padding-left: var(--lumo-space-m);
  }
  .pl-l {
    padding-left: var(--lumo-space-l);
  }
  .pl-xl {
    padding-left: var(--lumo-space-xl);
  }

  /* === Padding (right) === */
  .pr-0 {
    padding-right: 0;
  }
  .pr-xs {
    padding-right: var(--lumo-space-xs);
  }
  .pr-s {
    padding-right: var(--lumo-space-s);
  }
  .pr-m {
    padding-right: var(--lumo-space-m);
  }
  .pr-l {
    padding-right: var(--lumo-space-l);
  }
  .pr-xl {
    padding-right: var(--lumo-space-xl);
  }

  /* === Padding (start) === */
  .ps-0 {
    padding-inline-start: 0;
  }
  .ps-xs {
    padding-inline-start: var(--lumo-space-xs);
  }
  .ps-s {
    padding-inline-start: var(--lumo-space-s);
  }
  .ps-m {
    padding-inline-start: var(--lumo-space-m);
  }
  .ps-l {
    padding-inline-start: var(--lumo-space-l);
  }
  .ps-xl {
    padding-inline-start: var(--lumo-space-xl);
  }

  /* === Padding (top) === */
  .pt-0 {
    padding-top: 0;
  }
  .pt-xs {
    padding-top: var(--lumo-space-xs);
  }
  .pt-s {
    padding-top: var(--lumo-space-s);
  }
  .pt-m {
    padding-top: var(--lumo-space-m);
  }
  .pt-l {
    padding-top: var(--lumo-space-l);
  }
  .pt-xl {
    padding-top: var(--lumo-space-xl);
  }

  /* === Padding (vertical) === */
  .py-0 {
    padding-bottom: 0;
    padding-top: 0;
  }
  .py-xs {
    padding-bottom: var(--lumo-space-xs);
    padding-top: var(--lumo-space-xs);
  }
  .py-s {
    padding-bottom: var(--lumo-space-s);
    padding-top: var(--lumo-space-s);
  }
  .py-m {
    padding-bottom: var(--lumo-space-m);
    padding-top: var(--lumo-space-m);
  }
  .py-l {
    padding-bottom: var(--lumo-space-l);
    padding-top: var(--lumo-space-l);
  }
  .py-xl {
    padding-bottom: var(--lumo-space-xl);
    padding-top: var(--lumo-space-xl);
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Q0=et`
  .transition {
    transition-property: -webkit-backdrop-filter, backdrop-filter, background-color, border-color, box-shadow, color,
      fill, filter, opacity, rotate, scale, stroke, text-decoration-color, transform, translate;
    transition-timing-function: var(--lumo-utility-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
    transition-duration: var(--lumo-utility-transition-duration, 150ms);
  }

  .transition-all {
    transition-property: all;
    transition-timing-function: var(--lumo-utility-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
    transition-duration: var(--lumo-utility-transition-duration, 150ms);
  }

  .transition-colors {
    transition-property: background-color, border-color, color, fill, stroke, text-decoration-color;
    transition-timing-function: var(--lumo-utility-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
    transition-duration: var(--lumo-utility-transition-duration, 150ms);
  }

  .transition-opacity {
    transition-property: opacity;
    transition-timing-function: var(--lumo-utility-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
    transition-duration: var(--lumo-utility-transition-duration, 150ms);
  }

  .transition-shadow {
    transition-property: box-shadow;
    transition-timing-function: var(--lumo-utility-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
    transition-duration: var(--lumo-utility-transition-duration, 150ms);
  }

  .transition-transform {
    transition-property: rotate, scale, transform, translate;
    transition-timing-function: var(--lumo-utility-transition-timing-function, cubic-bezier(0.4, 0, 0.2, 1));
    transition-duration: var(--lumo-utility-transition-duration, 150ms);
  }

  .transition-none {
    transition-property: none;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const K0=et`
  /* === Font size === */
  .text-2xs {
    font-size: var(--lumo-font-size-xxs);
  }
  .text-xs {
    font-size: var(--lumo-font-size-xs);
  }
  .text-s {
    font-size: var(--lumo-font-size-s);
  }
  .text-m {
    font-size: var(--lumo-font-size-m);
  }
  .text-l {
    font-size: var(--lumo-font-size-l);
  }
  .text-xl {
    font-size: var(--lumo-font-size-xl);
  }
  .text-2xl {
    font-size: var(--lumo-font-size-xxl);
  }
  .text-3xl {
    font-size: var(--lumo-font-size-xxxl);
  }

  /* === Font weight === */
  .font-thin {
    font-weight: 100;
  }
  .font-extralight {
    font-weight: 200;
  }
  .font-light {
    font-weight: 300;
  }
  .font-normal {
    font-weight: 400;
  }
  .font-medium {
    font-weight: 500;
  }
  .font-semibold {
    font-weight: 600;
  }
  .font-bold {
    font-weight: 700;
  }
  .font-extrabold {
    font-weight: 800;
  }
  .font-black {
    font-weight: 900;
  }

  /* === Line clamp === */
  [class*='line-clamp-'] {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
  }
  .line-clamp-1 {
    -webkit-line-clamp: 1;
  }
  .line-clamp-2 {
    -webkit-line-clamp: 2;
  }
  .line-clamp-3 {
    -webkit-line-clamp: 3;
  }
  .line-clamp-4 {
    -webkit-line-clamp: 4;
  }
  .line-clamp-5 {
    -webkit-line-clamp: 5;
  }
  .line-clamp-6 {
    -webkit-line-clamp: 6;
  }

  /* === Line height === */
  .leading-none {
    line-height: 1;
  }
  .leading-xs {
    line-height: var(--lumo-line-height-xs);
  }
  .leading-s {
    line-height: var(--lumo-line-height-s);
  }
  .leading-m {
    line-height: var(--lumo-line-height-m);
  }

  /* === List style type === */
  .list-none {
    list-style-type: none;
  }

  /* === Text alignment === */
  .text-left {
    text-align: left;
  }
  .text-center {
    text-align: center;
  }
  .text-right {
    text-align: right;
  }
  .text-justify {
    text-align: justify;
  }

  /* === Text color === */
  .text-header {
    color: var(--lumo-header-text-color);
  }
  .text-body {
    color: var(--lumo-body-text-color);
  }
  .text-secondary {
    color: var(--lumo-secondary-text-color);
  }
  .text-tertiary {
    color: var(--lumo-tertiary-text-color);
  }
  .text-disabled {
    color: var(--lumo-disabled-text-color);
  }
  .text-primary {
    color: var(--lumo-primary-text-color);
  }
  .text-primary-contrast {
    color: var(--lumo-primary-contrast-color);
  }
  .text-error {
    color: var(--lumo-error-text-color);
  }
  .text-error-contrast {
    color: var(--lumo-error-contrast-color);
  }
  .text-success {
    color: var(--lumo-success-text-color);
  }
  .text-success-contrast {
    color: var(--lumo-success-contrast-color);
  }
  .text-warning {
    color: var(--lumo-warning-text-color);
  }
  .text-warning-contrast {
    color: var(--lumo-warning-contrast-color);
  }

  /* == Text decoration === */
  .line-through {
    text-decoration-line: line-through;
  }
  .no-underline {
    text-decoration-line: none;
  }
  .underline {
    text-decoration-line: underline;
  }

  /* === Text overflow === */
  .overflow-clip {
    text-overflow: clip;
  }
  .overflow-ellipsis {
    text-overflow: ellipsis;
  }

  /* === Text transform === */
  .capitalize {
    text-transform: capitalize;
  }
  .lowercase {
    text-transform: lowercase;
  }
  .uppercase {
    text-transform: uppercase;
  }

  /* === Whitespace === */
  .whitespace-normal {
    white-space: normal;
  }
  .whitespace-break-spaces {
    white-space: normal;
  }
  .whitespace-nowrap {
    white-space: nowrap;
  }
  .whitespace-pre {
    white-space: pre;
  }
  .whitespace-pre-line {
    white-space: pre-line;
  }
  .whitespace-pre-wrap {
    white-space: pre-wrap;
  }

  /* === Responsive design === */
  @media (min-width: 640px) {
    .sm\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .sm\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .sm\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .sm\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .sm\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .sm\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .sm\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .sm\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 768px) {
    .md\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .md\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .md\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .md\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .md\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .md\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .md\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .md\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1024px) {
    .lg\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .lg\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .lg\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .lg\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .lg\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .lg\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .lg\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .lg\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1280px) {
    .xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
  @media (min-width: 1536px) {
    .\\32xl\\:text-2xs {
      font-size: var(--lumo-font-size-xxs);
    }
    .\\32xl\\:text-xs {
      font-size: var(--lumo-font-size-xs);
    }
    .\\32xl\\:text-s {
      font-size: var(--lumo-font-size-s);
    }
    .\\32xl\\:text-m {
      font-size: var(--lumo-font-size-m);
    }
    .\\32xl\\:text-l {
      font-size: var(--lumo-font-size-l);
    }
    .\\32xl\\:text-xl {
      font-size: var(--lumo-font-size-xl);
    }
    .\\32xl\\:text-2xl {
      font-size: var(--lumo-font-size-xxl);
    }
    .\\32xl\\:text-3xl {
      font-size: var(--lumo-font-size-xxxl);
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Uu=et`
${A0}
${F0}
${I0}
${U0}
${j0}
${V0}
${H0}
${B0}
${W0}
${Q0}
${K0}
`;oa("",Uu,{moduleId:"lumo-utility"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */ar("utility",Uu);(function(){if(typeof document>"u"||"adoptedStyleSheets"in document)return;var r="ShadyCSS"in window&&!ShadyCSS.nativeShadow,o=document.implementation.createHTMLDocument(""),l=new WeakMap,s=typeof DOMException=="object"?Error:DOMException,c=Object.defineProperty,d=Array.prototype.forEach,p=/@import.+?;?$/gm;function h(M){var V=M.replace(p,"");return V!==M&&console.warn("@import rules are not allowed here. See https://github.com/WICG/construct-stylesheets/issues/119#issuecomment-588352418"),V.trim()}function m(M){return"isConnected"in M?M.isConnected:document.contains(M)}function g(M){return M.filter(function(V,X){return M.indexOf(V)===X})}function S(M,V){return M.filter(function(X){return V.indexOf(X)===-1})}function E(M){M.parentNode.removeChild(M)}function x(M){return M.shadowRoot||l.get(M)}var N=["addRule","deleteRule","insertRule","removeRule"],L=CSSStyleSheet,O=L.prototype;O.replace=function(){return Promise.reject(new s("Can't call replace on non-constructed CSSStyleSheets."))},O.replaceSync=function(){throw new s("Failed to execute 'replaceSync' on 'CSSStyleSheet': Can't call replaceSync on non-constructed CSSStyleSheets.")};function I(M){return typeof M=="object"?He.isPrototypeOf(M)||O.isPrototypeOf(M):!1}function D(M){return typeof M=="object"?O.isPrototypeOf(M):!1}var te=new WeakMap,A=new WeakMap,Y=new WeakMap,ae=new WeakMap;function z(M,V){var X=document.createElement("style");return Y.get(M).set(V,X),A.get(M).push(V),X}function fe(M,V){return Y.get(M).get(V)}function he(M,V){Y.get(M).delete(V),A.set(M,A.get(M).filter(function(X){return X!==V}))}function ce(M,V){requestAnimationFrame(function(){V.textContent=te.get(M).textContent,ae.get(M).forEach(function(X){return V.sheet[X.method].apply(V.sheet,X.args)})})}function Pe(M){if(!te.has(M))throw new TypeError("Illegal invocation")}function Ge(){var M=this,V=document.createElement("style");o.body.appendChild(V),te.set(M,V),A.set(M,[]),Y.set(M,new WeakMap),ae.set(M,[])}var He=Ge.prototype;He.replace=function(V){try{return this.replaceSync(V),Promise.resolve(this)}catch(X){return Promise.reject(X)}},He.replaceSync=function(V){if(Pe(this),typeof V=="string"){var X=this;te.get(X).textContent=h(V),ae.set(X,[]),A.get(X).forEach(function(Ue){Ue.isConnected()&&ce(X,fe(X,Ue))})}},c(He,"cssRules",{configurable:!0,enumerable:!0,get:function(){return Pe(this),te.get(this).sheet.cssRules}}),c(He,"media",{configurable:!0,enumerable:!0,get:function(){return Pe(this),te.get(this).sheet.media}}),N.forEach(function(M){He[M]=function(){var V=this;Pe(V);var X=arguments;ae.get(V).push({method:M,args:X}),A.get(V).forEach(function(nt){if(nt.isConnected()){var Qe=fe(V,nt).sheet;Qe[M].apply(Qe,X)}});var Ue=te.get(V).sheet;return Ue[M].apply(Ue,X)}}),c(Ge,Symbol.hasInstance,{configurable:!0,value:I});var Se={childList:!0,subtree:!0},_e=new WeakMap;function Oe(M){var V=_e.get(M);return V||(V=new ve(M),_e.set(M,V)),V}function ge(M){c(M.prototype,"adoptedStyleSheets",{configurable:!0,enumerable:!0,get:function(){return Oe(this).sheets},set:function(V){Oe(this).update(V)}})}function be(M,V){for(var X=document.createNodeIterator(M,NodeFilter.SHOW_ELEMENT,function(nt){return x(nt)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT},null,!1),Ue=void 0;Ue=X.nextNode();)V(x(Ue))}var W=new WeakMap,J=new WeakMap,K=new WeakMap;function C(M,V){return V instanceof HTMLStyleElement&&J.get(M).some(function(X){return fe(X,M)})}function F(M){var V=W.get(M);return V instanceof Document?V.body:V}function ue(M){var V=document.createDocumentFragment(),X=J.get(M),Ue=K.get(M),nt=F(M);Ue.disconnect(),X.forEach(function(Qe){V.appendChild(fe(Qe,M)||z(Qe,M))}),nt.insertBefore(V,null),Ue.observe(nt,Se),X.forEach(function(Qe){ce(Qe,fe(Qe,M))})}function ve(M){var V=this;V.sheets=[],W.set(V,M),J.set(V,[]),K.set(V,new MutationObserver(function(X,Ue){if(!document){Ue.disconnect();return}X.forEach(function(nt){r||d.call(nt.addedNodes,function(Qe){Qe instanceof Element&&be(Qe,function(ut){Oe(ut).connect()})}),d.call(nt.removedNodes,function(Qe){Qe instanceof Element&&(C(V,Qe)&&ue(V),r||be(Qe,function(ut){Oe(ut).disconnect()}))})})}))}if(ve.prototype={isConnected:function(){var M=W.get(this);return M instanceof Document?M.readyState!=="loading":m(M.host)},connect:function(){var M=F(this);K.get(this).observe(M,Se),J.get(this).length>0&&ue(this),be(M,function(V){Oe(V).connect()})},disconnect:function(){K.get(this).disconnect()},update:function(M){var V=this,X=W.get(V)===document?"Document":"ShadowRoot";if(!Array.isArray(M))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+X+": Iterator getter is not callable.");if(!M.every(I))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+X+": Failed to convert value to 'CSSStyleSheet'");if(M.some(D))throw new TypeError("Failed to set the 'adoptedStyleSheets' property on "+X+": Can't adopt non-constructed stylesheets");V.sheets=M;var Ue=J.get(V),nt=g(M),Qe=S(Ue,nt);Qe.forEach(function(ut){E(fe(ut,V)),he(ut,V)}),J.set(V,nt),V.isConnected()&&nt.length>0&&ue(V)}},window.CSSStyleSheet=Ge,ge(Document),"ShadowRoot"in window){ge(ShadowRoot);var Ee=Element.prototype,ke=Ee.attachShadow;Ee.attachShadow=function(V){var X=ke.call(this,V);return V.mode==="closed"&&l.set(this,X),X}}var $e=Oe(document);$e.isConnected()?$e.connect():document.addEventListener("DOMContentLoaded",$e.connect.bind($e))})();const{toString:G0}=Object.prototype;function Y0(r){return G0.call(r)==="[object RegExp]"}function q0(r,{preserve:o=!0,whitespace:l=!0,all:s}={}){if(s)throw new Error("The `all` option is no longer supported. Use the `preserve` option instead.");let c=o,d;typeof o=="function"?(c=!1,d=o):Y0(o)&&(c=!1,d=S=>o.test(S));let p=!1,h="",m="",g="";for(let S=0;S<r.length;S++){if(h=r[S],r[S-1]!=="\\"&&(h==='"'||h==="'")&&(p===h?p=!1:p||(p=h)),!p&&h==="/"&&r[S+1]==="*"){const E=r[S+2]==="!";let x=S+2;for(;x<r.length;x++){if(r[x]==="*"&&r[x+1]==="/"){c&&E||d&&d(m)?g+=`/*${m}*/`:l||(r[x+2]===`
`?x++:r[x+2]+r[x+3]===`\r
`&&(x+=2)),m="";break}m+=r[x]}S=x+1;continue}g+=h}return g}const X0=CSSStyleSheet.toString().includes("document.createElement"),J0=(r,o)=>{const l=/(?:@media\s(.+?))?(?:\s{)?\@import\s*(?:url\(\s*['"]?(.+?)['"]?\s*\)|(["'])((?:\\.|[^\\])*?)\3)([^;]*);(?:})?/g;/\/\*(.|[\r\n])*?\*\//gm.exec(r)!=null&&(r=q0(r));for(var s,c=r;(s=l.exec(r))!==null;){c=c.replace(s[0],"");const d=document.createElement("link");d.rel="stylesheet",d.href=s[2]||s[4];const p=s[1]||s[5];p&&(d.media=p),o===document?document.head.appendChild(d):o.appendChild(d)}return c},Z0=(r,o,l)=>(l?o.adoptedStyleSheets=[r,...o.adoptedStyleSheets]:o.adoptedStyleSheets=[...o.adoptedStyleSheets,r],()=>{o.adoptedStyleSheets=o.adoptedStyleSheets.filter(s=>s!==r)}),ew=(r,o,l)=>{const s=new CSSStyleSheet;return s.replaceSync(r),X0?Z0(s,o,l):(l?o.adoptedStyleSheets.splice(0,0,s):o.adoptedStyleSheets.push(s),()=>{o.adoptedStyleSheets.splice(o.adoptedStyleSheets.indexOf(s),1)})},tw=(r,o)=>{const l=document.createElement("style");return l.type="text/css",l.textContent=r,document.head.insertBefore(l,void 0),()=>{l.remove()}},fo=(r,o,l,s)=>{if(l===document){const d=nw(r);if(window.Vaadin.theme.injectedGlobalCss.indexOf(d)!==-1)return;window.Vaadin.theme.injectedGlobalCss.push(d)}const c=J0(r,l);return l===document?tw(c):ew(c,l,s)};window.Vaadin=window.Vaadin||{};window.Vaadin.theme=window.Vaadin.theme||{};window.Vaadin.theme.injectedGlobalCss=[];function cp(r){let o,l,s=2166136261;for(o=0,l=r.length;o<l;o++)s^=r.charCodeAt(o),s+=(s<<1)+(s<<4)+(s<<7)+(s<<8)+(s<<24);return("0000000"+(s>>>0).toString(16)).substr(-8)}function nw(r){let o=cp(r);return o+cp(o+r)}document._vaadintheme_roadmap_componentCss||(document._vaadintheme_roadmap_componentCss=!0);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const vm=et`
  :host {
    /* Square */
    --lumo-space-xs: 0.25rem;
    --lumo-space-s: 0.5rem;
    --lumo-space-m: 1rem;
    --lumo-space-l: 1.5rem;
    --lumo-space-xl: 2.5rem;

    /* Wide */
    --lumo-space-wide-xs: calc(var(--lumo-space-xs) / 2) var(--lumo-space-xs);
    --lumo-space-wide-s: calc(var(--lumo-space-s) / 2) var(--lumo-space-s);
    --lumo-space-wide-m: calc(var(--lumo-space-m) / 2) var(--lumo-space-m);
    --lumo-space-wide-l: calc(var(--lumo-space-l) / 2) var(--lumo-space-l);
    --lumo-space-wide-xl: calc(var(--lumo-space-xl) / 2) var(--lumo-space-xl);

    /* Tall */
    --lumo-space-tall-xs: var(--lumo-space-xs) calc(var(--lumo-space-xs) / 2);
    --lumo-space-tall-s: var(--lumo-space-s) calc(var(--lumo-space-s) / 2);
    --lumo-space-tall-m: var(--lumo-space-m) calc(var(--lumo-space-m) / 2);
    --lumo-space-tall-l: var(--lumo-space-l) calc(var(--lumo-space-l) / 2);
    --lumo-space-tall-xl: var(--lumo-space-xl) calc(var(--lumo-space-xl) / 2);
  }
`;ar("spacing-props",vm);const rw=et``,ow=r=>{const o=[];r!==document&&(o.push(fo(Au.cssText,"",r,!0)),o.push(fo(Fu.cssText,"",r,!0)),o.push(fo(vm.cssText,"",r,!0)),o.push(fo(Iu.cssText,"",r,!0)),o.push(fo(Uu.cssText,"",r,!0)),o.push(fo(rw.toString(),"",r)))},iw=ow;iw(document);export{$y as B,mt as E,lw as O,hw as T,su as _,Up as a,ar as b,Dr as c,T0 as d,x0 as e,zu as f,Fy as g,Oy as h,et as i,Or as j,Ay as k,uw as l,R as m,ov as n,vo as o,oa as r,cm as t,Cy as x};
