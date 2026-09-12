import{n as Pr,r as si,l as D,p as fe,q as se,c as ai,D as we,P as L,s as Ws,u as qe,v as Ys,t as Z,w as li,i as ci,x as Fe,y as ne,j as Er,z as Oo,k as Ze,A as Io,B as Us,K as Tr,f as Po,G as Qe,R as qs,H as js,I as Br,J as Eo,L as Le,M as To,T as ui,N as Gs,E as Te,C as Ae,h as G,Q as et,U as Ao,e as Ks,V as di,S as je,W as Do,X as hi,Y as ko,Z as Qs,_ as Xs,$ as Ro,a0 as $o,a1 as H,a2 as Mo,a3 as Zs,a4 as Js,a5 as zo,a6 as Fo,a7 as Vr,a8 as Lo,a9 as ea,aa as ta,o as ra,ab as na,ac as Ai,F as No,ad as ia,a as Ho,b as Bo,O as Vo,ae as Bt,af as Wo,ag as oa,d as fi,m as sa,g as aa,ah as la,ai as ca,aj as ua,ak as da,al as ha,am as fa,an as _a,ao as pa,ap as ma}from"./generated-flow-imports-BA8sRTHB.js";import{r as T,i as O,d as W,T as J,g as Yo,h as ge,k as Uo,j as Ge,B as _i,x as qo,E as ga,e as jo}from"./indexhtml-6DNj1Wan.js";T("vaadin-grid",O`
    :host {
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      line-height: var(--lumo-line-height-s);
      color: var(--lumo-body-text-color);
      background-color: var(--lumo-base-color);
      box-sizing: border-box;
      -webkit-text-size-adjust: 100%;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      /* For internal use only */
      --_lumo-grid-border-color: var(--lumo-contrast-20pct);
      --_lumo-grid-secondary-border-color: var(--lumo-contrast-10pct);
      --_lumo-grid-border-width: 1px;
      --_lumo-grid-selected-row-color: var(--lumo-primary-color-10pct);
    }

    /* No (outer) border */

    :host(:not([theme~='no-border'])) {
      border: var(--_lumo-grid-border-width) solid var(--_lumo-grid-border-color);
    }

    :host([disabled]) {
      opacity: 0.7;
    }

    /* Cell styles */

    [part~='cell'] {
      min-height: var(--lumo-size-m);
      background-color: var(--vaadin-grid-cell-background, var(--lumo-base-color));
      cursor: default;
      --_cell-padding: var(--vaadin-grid-cell-padding, var(--_cell-default-padding));
      --_cell-default-padding: var(--lumo-space-xs) var(--lumo-space-m);
    }

    [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      cursor: inherit;
      padding: var(--_cell-padding);
    }

    /* Apply row borders by default and introduce the "no-row-borders" variant */
    :host(:not([theme~='no-row-borders'])) [part~='cell']:not([part~='details-cell']) {
      border-top: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Hide first body row top border */
    :host(:not([theme~='no-row-borders'])) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      border-top: 0;
      min-height: calc(var(--lumo-size-m) - var(--_lumo-grid-border-width));
    }

    /* Focus-ring */

    [part~='row'] {
      position: relative;
    }

    [part~='row']:focus,
    [part~='focused-cell']:focus {
      outline: none;
    }

    :host([navigating]) [part~='row']:focus::before,
    :host([navigating]) [part~='focused-cell']:focus::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
    }

    :host([navigating]) [part~='row']:focus::before {
      transform: translateX(calc(-1 * var(--_grid-horizontal-scroll-position)));
      z-index: 3;
    }

    /* Empty state */
    [part~='empty-state'] {
      padding: var(--lumo-space-m);
      color: var(--lumo-secondary-text-color);
    }

    /* Drag and Drop styles */
    :host([dragover])::after {
      content: '';
      position: absolute;
      z-index: 100;
      inset: 0;
      pointer-events: none;
      box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
    }

    [part~='row'][dragover] {
      z-index: 100 !important;
    }

    [part~='row'][dragover] [part~='cell'] {
      overflow: visible;
    }

    [part~='row'][dragover] [part~='cell']::after {
      content: '';
      position: absolute;
      inset: 0;
      height: calc(var(--_lumo-grid-border-width) + 2px);
      pointer-events: none;
      background: var(--lumo-primary-color-50pct);
    }

    [part~='row'][dragover] [part~='cell'][last-frozen]::after {
      right: -1px;
    }

    :host([theme~='no-row-borders']) [dragover] [part~='cell']::after {
      height: 2px;
    }

    [part~='row'][dragover='below'] [part~='cell']::after {
      top: 100%;
      bottom: auto;
      margin-top: -1px;
    }

    :host([all-rows-visible]) [part~='last-row'][dragover='below'] [part~='cell']::after {
      height: 1px;
    }

    [part~='row'][dragover='above'] [part~='cell']::after {
      top: auto;
      bottom: 100%;
      margin-bottom: -1px;
    }

    [part~='row'][details-opened][dragover='below'] [part~='cell']:not([part~='details-cell'])::after,
    [part~='row'][details-opened][dragover='above'] [part~='details-cell']::after {
      display: none;
    }

    [part~='row'][dragover][dragover='on-top'] [part~='cell']::after {
      height: 100%;
      opacity: 0.5;
    }

    [part~='row'][dragstart] [part~='cell'] {
      border: none !important;
      box-shadow: none !important;
    }

    [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    #scroller [part~='row'][dragstart]:not([dragstart=''])::after {
      display: block;
      position: absolute;
      left: var(--_grid-drag-start-x);
      top: var(--_grid-drag-start-y);
      z-index: 100;
      content: attr(dragstart);
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      padding: calc(var(--lumo-space-xs) * 0.8);
      color: var(--lumo-error-contrast-color);
      background-color: var(--lumo-error-color);
      border-radius: var(--lumo-border-radius-m);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
      font-weight: 500;
      text-transform: initial;
      letter-spacing: initial;
      min-width: calc(var(--lumo-size-s) * 0.7);
      text-align: center;
    }

    /* Headers and footers */

    [part~='header-cell'],
    [part~='footer-cell'],
    [part~='reorder-ghost'] {
      font-size: var(--lumo-font-size-s);
      font-weight: 500;
    }

    [part~='footer-cell'] {
      font-weight: 400;
    }

    [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-xl);
    }

    /* Header borders */

    /* Hide first header row top border */
    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='header-cell'] {
      border-top: 0;
    }

    /* Hide header row top border if previous row is hidden */
    [part~='row'][hidden] + [part~='row'] [part~='header-cell'] {
      border-top: 0;
    }

    [part~='row']:last-child [part~='header-cell'] {
      border-bottom: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='top']) [part~='row']:last-child [part~='header-cell'] {
      border-bottom-color: var(--_lumo-grid-border-color);
    }

    /* Footer borders */

    [part~='row']:first-child [part~='footer-cell'] {
      border-top: var(--_lumo-grid-border-width) solid transparent;
    }

    :host(:not([theme~='no-row-borders'])) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-secondary-border-color);
    }

    /* Overflow uses a stronger border color */
    :host([overflow~='bottom']) [part~='row']:first-child [part~='footer-cell'] {
      border-top-color: var(--_lumo-grid-border-color);
    }

    /* Column reordering */

    :host([reordering]) [part~='cell'] {
      background: linear-gradient(var(--lumo-shade-20pct), var(--lumo-shade-20pct)) var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='allowed'] {
      background: var(--lumo-base-color);
    }

    :host([reordering]) [part~='cell'][reorder-status='dragging'] {
      background: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct)) var(--lumo-base-color);
    }

    [part~='reorder-ghost'] {
      opacity: 0.85;
      box-shadow: var(--lumo-box-shadow-s);
      /* TODO Use the same styles as for the cell element (reorder-ghost copies styles from the cell element) */
      padding: var(--lumo-space-s) var(--lumo-space-m) !important;
    }

    /* Column resizing */

    [part='resize-handle'] {
      --_resize-handle-width: 3px;
      width: var(--_resize-handle-width);
      background-color: var(--lumo-primary-color-50pct);
      opacity: 0;
      transition: opacity 0.2s;
    }

    [part='resize-handle']::before {
      transform: translateX(calc(-50% + var(--_resize-handle-width) / 2));
      width: var(--lumo-size-s);
    }

    :host(:not([reordering])) *:not([column-resizing]) [part~='cell']:hover [part='resize-handle'],
    [part='resize-handle']:active {
      opacity: 1;
      transition-delay: 0.15s;
    }

    /* Column borders */

    :host([theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    /* Frozen columns */

    [last-frozen] {
      border-right: var(--_lumo-grid-border-width) solid transparent;
      overflow: hidden;
    }

    :host([overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }

    [first-frozen-to-end] {
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    /* Row stripes */

    :host([theme~='row-stripes']) [part~='even-row'] [part~='body-cell'],
    :host([theme~='row-stripes']) [part~='even-row'] [part~='details-cell'] {
      background-image: linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      background-repeat: repeat-x;
    }

    /* Selected row */

    /* Raise the selected rows above unselected rows (so that box-shadow can cover unselected rows) */
    :host(:not([reordering])) [part~='row'][selected] {
      z-index: 1;
    }

    :host(:not([reordering])) [part~='row'][selected] [part~='body-cell']:not([part~='details-cell']) {
      background-image: linear-gradient(var(--_lumo-grid-selected-row-color), var(--_lumo-grid-selected-row-color));
      background-repeat: repeat;
    }

    /* Cover the border of an unselected row */
    :host(:not([theme~='no-row-borders'])) [part~='row'][selected] [part~='cell']:not([part~='details-cell']) {
      box-shadow: 0 var(--_lumo-grid-border-width) 0 0 var(--_lumo-grid-selected-row-color);
    }

    /* Compact */

    :host([theme~='compact']) [part~='row']:only-child [part~='header-cell'] {
      min-height: var(--lumo-size-m);
    }

    :host([theme~='compact']) [part~='cell'] {
      min-height: var(--lumo-size-s);
      --_cell-default-padding: var(--lumo-space-xs) var(--lumo-space-s);
    }

    :host([theme~='compact']) [part~='first-row'] [part~='cell']:not([part~='details-cell']) {
      min-height: calc(var(--lumo-size-s) - var(--_lumo-grid-border-width));
    }

    :host([theme~='compact']) [part~='empty-state'] {
      padding: var(--lumo-space-s);
    }

    /* Wrap cell contents */

    :host([theme~='wrap-cell-content']) [part~='cell'] ::slotted(vaadin-grid-cell-content) {
      white-space: normal;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][last-column] {
      border-radius: var(--lumo-border-radius-s) 0 0 var(--lumo-border-radius-s);
    }

    :host([dir='rtl']) [part~='row'][dragstart] [part~='cell'][first-column] {
      border-radius: 0 var(--lumo-border-radius-s) var(--lumo-border-radius-s) 0;
    }

    :host([dir='rtl'][theme~='column-borders']) [part~='cell']:not([last-column]):not([part~='details-cell']) {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid var(--_lumo-grid-secondary-border-color);
    }

    :host([dir='rtl']) [last-frozen] {
      border-right: none;
      border-left: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl']) [first-frozen-to-end] {
      border-left: none;
      border-right: var(--_lumo-grid-border-width) solid transparent;
    }

    :host([dir='rtl'][overflow~='start']) [part~='cell'][last-frozen]:not([part~='details-cell']) {
      border-left-color: var(--_lumo-grid-border-color);
    }

    :host([dir='rtl'][overflow~='end']) [part~='cell'][first-frozen-to-end]:not([part~='details-cell']) {
      border-right-color: var(--_lumo-grid-border-color);
    }
  `,{moduleId:"lumo-grid"});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Ar(n){if(window.Vaadin&&window.Vaadin.templateRendererCallback){window.Vaadin.templateRendererCallback(n);return}n.querySelector("template")&&console.warn(`WARNING: <template> inside <${n.localName}> is no longer supported. Import @vaadin/polymer-legacy-adapter/template-renderer.js to enable compatibility.`)}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Pe(n){return n.__cells||Array.from(n.querySelectorAll('[part~="cell"]:not([part~="details-cell"])'))}function te(n,t){[...n.children].forEach(t)}function Ne(n,t){Pe(n).forEach(t),n.__detailsCell&&t(n.__detailsCell)}function Go(n,t,e){let r=1;n.forEach(i=>{r%10===0&&(r+=1),i._order=e+r*t,r+=1})}function Dr(n,t,e){switch(typeof e){case"boolean":n.toggleAttribute(t,e);break;case"string":n.setAttribute(t,e);break;default:n.removeAttribute(t);break}}function ve(n,t,e){t||t===""?Pr(n,"part",e):si(n,"part",e)}function ye(n,t,e){n.forEach(r=>{ve(r,e,t)})}function $e(n,t){const e=Pe(n);Object.entries(t).forEach(([r,i])=>{Dr(n,r,i);const o=`${r}-row`;ve(n,i,o),ye(e,`${o}-cell`,i)})}function Di(n,t){const e=Pe(n);Object.entries(t).forEach(([r,i])=>{const o=n.getAttribute(r);if(Dr(n,r,i),o){const s=`${r}-${o}-row`;ve(n,!1,s),ye(e,`${s}-cell`,!1)}if(i){const s=`${r}-${i}-row`;ve(n,i,s),ye(e,`${s}-cell`,i)}})}function Oe(n,t,e,r,i){Dr(n,t,e),i&&ve(n,!1,i),ve(n,e,r||`${t}-cell`)}function ya(n){return Pe(n).find(t=>t._content.querySelector("vaadin-grid-tree-toggle"))}class be{constructor(t,e){this.__host=t,this.__callback=e,this.__currentSlots=[],this.__onMutation=this.__onMutation.bind(this),this.__observer=new MutationObserver(this.__onMutation),this.__observer.observe(t,{childList:!0}),this.__initialCallDebouncer=D.debounce(this.__initialCallDebouncer,fe,()=>this.__onMutation())}disconnect(){this.__observer.disconnect(),this.__initialCallDebouncer.cancel(),this.__toggleSlotChangeListeners(!1)}flush(){this.__onMutation()}__toggleSlotChangeListeners(t){this.__currentSlots.forEach(e=>{t?e.addEventListener("slotchange",this.__onMutation):e.removeEventListener("slotchange",this.__onMutation)})}__onMutation(){const t=!this.__currentColumns;this.__currentColumns=this.__currentColumns||[];const e=be.getColumns(this.__host),r=e.filter(a=>!this.__currentColumns.includes(a)),i=this.__currentColumns.filter(a=>!e.includes(a)),o=this.__currentColumns.some((a,l)=>a!==e[l]);this.__currentColumns=e,this.__toggleSlotChangeListeners(!1),this.__currentSlots=[...this.__host.children].filter(a=>a instanceof HTMLSlotElement),this.__toggleSlotChangeListeners(!0),(t||r.length||i.length||o)&&this.__callback(r,i)}static __isColumnElement(t){return t.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(t.localName)}static getColumns(t){const e=[],r=t._isColumnElement||be.__isColumnElement;return[...t.children].forEach(i=>{r(i)?e.push(i):i instanceof HTMLSlotElement&&[...i.assignedElements({flatten:!0})].filter(o=>r(o)).forEach(o=>e.push(o))}),e}}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ko=n=>class extends n{static get properties(){return{resizable:{type:Boolean,sync:!0,value(){if(this.localName==="vaadin-grid-column-group")return;const e=this.parentNode;return e&&e.localName==="vaadin-grid-column-group"&&e.resizable||!1}},frozen:{type:Boolean,value:!1,sync:!0},frozenToEnd:{type:Boolean,value:!1,sync:!0},rowHeader:{type:Boolean,value:!1,sync:!0},hidden:{type:Boolean,value:!1,sync:!0},header:{type:String,sync:!0},textAlign:{type:String,sync:!0},headerPartName:{type:String,sync:!0},footerPartName:{type:String,sync:!0},_lastFrozen:{type:Boolean,value:!1,sync:!0},_bodyContentHidden:{type:Boolean,value:!1,sync:!0},_firstFrozenToEnd:{type:Boolean,value:!1,sync:!0},_order:{type:Number,sync:!0},_reorderStatus:{type:Boolean,sync:!0},_emptyCells:Array,_headerCell:{type:Object,sync:!0},_footerCell:{type:Object,sync:!0},_grid:Object,__initialized:{type:Boolean,value:!0},headerRenderer:{type:Function,sync:!0},_headerRenderer:{type:Function,computed:"_computeHeaderRenderer(headerRenderer, header, __initialized)"},footerRenderer:{type:Function,sync:!0},_footerRenderer:{type:Function,computed:"_computeFooterRenderer(footerRenderer, __initialized)"},__gridColumnElement:{type:Boolean,value:!0}}}static get observers(){return["_widthChanged(width, _headerCell, _footerCell, _cells)","_frozenChanged(frozen, _headerCell, _footerCell, _cells)","_frozenToEndChanged(frozenToEnd, _headerCell, _footerCell, _cells)","_flexGrowChanged(flexGrow, _headerCell, _footerCell, _cells)","_textAlignChanged(textAlign, _cells, _headerCell, _footerCell)","_orderChanged(_order, _headerCell, _footerCell, _cells)","_lastFrozenChanged(_lastFrozen)","_firstFrozenToEndChanged(_firstFrozenToEnd)","_onRendererOrBindingChanged(_renderer, _cells, _bodyContentHidden, path)","_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header)","_onFooterRendererOrBindingChanged(_footerRenderer, _footerCell)","_resizableChanged(resizable, _headerCell)","_reorderStatusChanged(_reorderStatus, _headerCell, _footerCell, _cells)","_hiddenChanged(hidden, _headerCell, _footerCell, _cells)","_rowHeaderChanged(rowHeader, _cells)","__headerFooterPartNameChanged(_headerCell, _footerCell, headerPartName, footerPartName)"]}get _grid(){return this._gridValue||(this._gridValue=this._findHostGrid()),this._gridValue}get _allCells(){return[].concat(this._cells||[]).concat(this._emptyCells||[]).concat(this._headerCell).concat(this._footerCell).filter(e=>e)}connectedCallback(){super.connectedCallback(),requestAnimationFrame(()=>{this._grid&&this._allCells.forEach(e=>{e._content.parentNode||this._grid.appendChild(e._content)})})}disconnectedCallback(){super.disconnectedCallback(),requestAnimationFrame(()=>{this._grid||this._allCells.forEach(e=>{e._content.parentNode&&e._content.parentNode.removeChild(e._content)})}),this._gridValue=void 0}ready(){super.ready(),Ar(this)}_findHostGrid(){let e=this;for(;e&&!/^vaadin.*grid(-pro)?$/u.test(e.localName);)e=e.assignedSlot?e.assignedSlot.parentNode:e.parentNode;return e||void 0}_renderHeaderAndFooter(){this._renderHeaderCellContent(this._headerRenderer,this._headerCell),this._renderFooterCellContent(this._footerRenderer,this._footerCell)}_flexGrowChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("flexGrow"),this._allCells.forEach(r=>{r.style.flexGrow=e})}_orderChanged(e){this._allCells.forEach(r=>{r.style.order=e})}_widthChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("width"),this._allCells.forEach(r=>{r.style.width=e})}_frozenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozen",e),this._allCells.forEach(r=>{Oe(r,"frozen",e)}),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_frozenToEndChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("frozenToEnd",e),this._allCells.forEach(r=>{this._grid&&r.parentElement===this._grid.$.sizer||Oe(r,"frozen-to-end",e)}),this._grid&&this._grid._frozenCellsChanged&&this._grid._frozenCellsChanged()}_lastFrozenChanged(e){this._allCells.forEach(r=>{Oe(r,"last-frozen",e)}),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._lastFrozen=e)}_firstFrozenToEndChanged(e){this._allCells.forEach(r=>{this._grid&&r.parentElement===this._grid.$.sizer||Oe(r,"first-frozen-to-end",e)}),this.parentElement&&this.parentElement._columnPropChanged&&(this.parentElement._firstFrozenToEnd=e)}_rowHeaderChanged(e,r){r&&r.forEach(i=>{i.setAttribute("role",e?"rowheader":"gridcell")})}_generateHeader(e){return e.substr(e.lastIndexOf(".")+1).replace(/([A-Z])/gu,"-$1").toLowerCase().replace(/-/gu," ").replace(/^./u,r=>r.toUpperCase())}_reorderStatusChanged(e){const r=this.__previousReorderStatus,i=r?`reorder-${r}-cell`:"",o=`reorder-${e}-cell`;this._allCells.forEach(s=>{Oe(s,"reorder-status",e,o,i)}),this.__previousReorderStatus=e}_resizableChanged(e,r){e===void 0||r===void 0||r&&[r].concat(this._emptyCells).forEach(i=>{if(i){const o=i.querySelector('[part~="resize-handle"]');if(o&&i.removeChild(o),e){const s=document.createElement("div");s.setAttribute("part","resize-handle"),i.appendChild(s)}}})}_textAlignChanged(e){if(e===void 0||this._grid===void 0)return;if(["start","end","center"].indexOf(e)===-1){console.warn('textAlign can only be set as "start", "end" or "center"');return}let r;getComputedStyle(this._grid).direction==="ltr"?e==="start"?r="left":e==="end"&&(r="right"):e==="start"?r="right":e==="end"&&(r="left"),this._allCells.forEach(i=>{i._content.style.textAlign=e,getComputedStyle(i._content).textAlign!==e&&(i._content.style.textAlign=r)})}_hiddenChanged(e){this.parentElement&&this.parentElement._columnPropChanged&&this.parentElement._columnPropChanged("hidden",e),!!e!=!!this._previousHidden&&this._grid&&(e===!0&&this._allCells.forEach(r=>{r._content.parentNode&&r._content.parentNode.removeChild(r._content)}),this._grid._debouncerHiddenChanged=D.debounce(this._grid._debouncerHiddenChanged,se,()=>{this._grid&&this._grid._renderColumnTree&&this._grid._renderColumnTree(this._grid._columnTree)}),this._grid._debounceUpdateFrozenColumn&&this._grid._debounceUpdateFrozenColumn(),this._grid._resetKeyboardNavigation&&this._grid._resetKeyboardNavigation()),this._previousHidden=e}_runRenderer(e,r,i){const o=i&&i.item&&!r.parentElement.hidden;if(!(o||e===this._headerRenderer||e===this._footerRenderer))return;const a=[r._content,this];o&&a.push(i),e.apply(this,a)}__renderCellsContent(e,r){this.hidden||!this._grid||r.forEach(i=>{if(!i.parentElement)return;const o=this._grid.__getRowModel(i.parentElement);e&&(i._renderer!==e&&this._clearCellContent(i),i._renderer=e,this._runRenderer(e,i,o))})}_clearCellContent(e){e._content.innerHTML="",delete e._content._$litPart$}_renderHeaderCellContent(e,r){!r||!e||(this.__renderCellsContent(e,[r]),this._grid&&r.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(r.parentElement))}_onHeaderRendererOrBindingChanged(e,r,...i){this._renderHeaderCellContent(e,r)}__headerFooterPartNameChanged(e,r,i,o){[{cell:e,partName:i},{cell:r,partName:o}].forEach(({cell:s,partName:a})=>{if(s){const l=s.__customParts||[];s.part.remove(...l),s.__customParts=a?a.trim().split(" "):[],s.part.add(...s.__customParts)}})}_renderBodyCellsContent(e,r){!r||!e||this.__renderCellsContent(e,r)}_onRendererOrBindingChanged(e,r,...i){this._renderBodyCellsContent(e,r)}_renderFooterCellContent(e,r){!r||!e||(this.__renderCellsContent(e,[r]),this._grid&&r.parentElement&&this._grid.__debounceUpdateHeaderFooterRowVisibility(r.parentElement))}_onFooterRendererOrBindingChanged(e,r){this._renderFooterCellContent(e,r)}__setTextContent(e,r){e.textContent!==r&&(e.textContent=r)}__textHeaderRenderer(){this.__setTextContent(this._headerCell._content,this.header)}_defaultHeaderRenderer(){this.path&&this.__setTextContent(this._headerCell._content,this._generateHeader(this.path))}_defaultRenderer(e,r,{item:i}){this.path&&this.__setTextContent(e,ai(this.path,i))}_defaultFooterRenderer(){}_computeHeaderRenderer(e,r){return e||(r!=null?this.__textHeaderRenderer:this._defaultHeaderRenderer)}_computeRenderer(e){return e||this._defaultRenderer}_computeFooterRenderer(e){return e||this._defaultFooterRenderer}},ba=n=>class extends Ko(we(n)){static get properties(){return{width:{type:String,value:"100px",sync:!0},flexGrow:{type:Number,value:1,sync:!0},renderer:{type:Function,sync:!0},_renderer:{type:Function,computed:"_computeRenderer(renderer, __initialized)"},path:{type:String,sync:!0},autoWidth:{type:Boolean,value:!1},_focusButtonMode:{type:Boolean,value:!1},_cells:{type:Array,sync:!0}}}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Qo extends ba(L){static get is(){return"vaadin-grid-column"}}W(Qo);/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */const ki=navigator.userAgent.match(/iP(?:hone|ad;(?: U;)? CPU) OS (\d+)/u),va=ki&&ki[1]>=8,Ri=3,wa={_ratio:.5,_scrollerPaddingTop:0,_scrollPosition:0,_physicalSize:0,_physicalAverage:0,_physicalAverageCount:0,_physicalTop:0,_virtualCount:0,_estScrollHeight:0,_scrollHeight:0,_viewportHeight:0,_viewportWidth:0,_physicalItems:null,_physicalSizes:null,_firstVisibleIndexVal:null,_lastVisibleIndexVal:null,_maxPages:2,_templateCost:0,get _physicalBottom(){return this._physicalTop+this._physicalSize},get _scrollBottom(){return this._scrollPosition+this._viewportHeight},get _virtualEnd(){return this._virtualStart+this._physicalCount-1},get _hiddenContentSize(){return this._physicalSize-this._viewportHeight},get _maxScrollTop(){return this._estScrollHeight-this._viewportHeight+this._scrollOffset},get _maxVirtualStart(){const n=this._virtualCount;return Math.max(0,n-this._physicalCount)},get _virtualStart(){return this._virtualStartVal||0},set _virtualStart(n){n=this._clamp(n,0,this._maxVirtualStart),this._virtualStartVal=n},get _physicalStart(){return this._physicalStartVal||0},set _physicalStart(n){n%=this._physicalCount,n<0&&(n=this._physicalCount+n),this._physicalStartVal=n},get _physicalEnd(){return(this._physicalStart+this._physicalCount-1)%this._physicalCount},get _physicalCount(){return this._physicalCountVal||0},set _physicalCount(n){this._physicalCountVal=n},get _optPhysicalSize(){return this._viewportHeight===0?1/0:this._viewportHeight*this._maxPages},get _isVisible(){return!!(this.offsetWidth||this.offsetHeight)},get firstVisibleIndex(){let n=this._firstVisibleIndexVal;if(n==null){let t=this._physicalTop+this._scrollOffset;n=this._iterateItems((e,r)=>{if(t+=this._getPhysicalSizeIncrement(e),t>this._scrollPosition)return r})||0,this._firstVisibleIndexVal=n}return n},get lastVisibleIndex(){let n=this._lastVisibleIndexVal;if(n==null){let t=this._physicalTop+this._scrollOffset;this._iterateItems((e,r)=>{t<this._scrollBottom&&(n=r),t+=this._getPhysicalSizeIncrement(e)}),this._lastVisibleIndexVal=n}return n},get _scrollOffset(){return this._scrollerPaddingTop+this.scrollOffset},_scrollHandler(){const n=Math.max(0,Math.min(this._maxScrollTop,this._scrollTop));let t=n-this._scrollPosition;const e=t>=0;if(this._scrollPosition=n,this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,Math.abs(t)>this._physicalSize&&this._physicalSize>0){t-=this._scrollOffset;const r=Math.round(t/this._physicalAverage);this._virtualStart+=r,this._physicalStart+=r,this._physicalTop=Math.min(Math.floor(this._virtualStart)*this._physicalAverage,this._scrollPosition),this._update()}else if(this._physicalCount>0){const r=this._getReusables(e);e?(this._physicalTop=r.physicalTop,this._virtualStart+=r.indexes.length,this._physicalStart+=r.indexes.length):(this._virtualStart-=r.indexes.length,this._physicalStart-=r.indexes.length),this._update(r.indexes,e?null:r.indexes),this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,0),fe)}},_getReusables(n){let t,e,r;const i=[],o=this._hiddenContentSize*this._ratio,s=this._virtualStart,a=this._virtualEnd,l=this._physicalCount;let u=this._physicalTop+this._scrollOffset;const f=this._physicalBottom+this._scrollOffset,p=this._scrollPosition,m=this._scrollBottom;for(n?(t=this._physicalStart,e=p-u):(t=this._physicalEnd,e=f-m);r=this._getPhysicalSizeIncrement(t),e-=r,!(i.length>=l||e<=o);)if(n){if(a+i.length+1>=this._virtualCount||u+r>=p-this._scrollOffset)break;i.push(t),u+=r,t=(t+1)%l}else{if(s-i.length<=0||u+this._physicalSize-r<=m)break;i.push(t),u-=r,t=t===0?l-1:t-1}return{indexes:i,physicalTop:u-this._scrollOffset}},_update(n,t){if(!(n&&n.length===0||this._physicalCount===0)){if(this._assignModels(n),this._updateMetrics(n),t)for(;t.length;){const e=t.pop();this._physicalTop-=this._getPhysicalSizeIncrement(e)}this._positionItems(),this._updateScrollerSize()}},_isClientFull(){return this._scrollBottom!==0&&this._physicalBottom-1>=this._scrollBottom&&this._physicalTop<=this._scrollPosition},_increasePoolIfNeeded(n){const e=this._clamp(this._physicalCount+n,Ri,this._virtualCount-this._virtualStart)-this._physicalCount;let r=Math.round(this._physicalCount*.5);if(!(e<0)){if(e>0){const i=window.performance.now();[].push.apply(this._physicalItems,this._createPool(e));for(let o=0;o<e;o++)this._physicalSizes.push(0);this._physicalCount+=e,this._physicalStart>this._physicalEnd&&this._isIndexRendered(this._focusedVirtualIndex)&&this._getPhysicalIndex(this._focusedVirtualIndex)<this._physicalEnd&&(this._physicalStart+=e),this._update(),this._templateCost=(window.performance.now()-i)/e,r=Math.round(this._physicalCount*.5)}this._virtualEnd>=this._virtualCount-1||r===0||(this._isClientFull()?this._physicalSize<this._optPhysicalSize&&this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,this._clamp(Math.round(50/this._templateCost),1,r)),Ys):this._debounce("_increasePoolIfNeeded",this._increasePoolIfNeeded.bind(this,r),fe))}},_render(){if(!(!this.isAttached||!this._isVisible))if(this._physicalCount!==0){const n=this._getReusables(!0);this._physicalTop=n.physicalTop,this._virtualStart+=n.indexes.length,this._physicalStart+=n.indexes.length,this._update(n.indexes),this._update(),this._increasePoolIfNeeded(0)}else this._virtualCount>0&&(this.updateViewportBoundaries(),this._increasePoolIfNeeded(Ri))},_itemsChanged(n){n.path==="items"&&(this._virtualStart=0,this._physicalTop=0,this._virtualCount=this.items?this.items.length:0,this._physicalIndexForKey={},this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._physicalItems||(this._physicalItems=[]),this._physicalSizes||(this._physicalSizes=[]),this._physicalStart=0,this._scrollTop>this._scrollOffset&&this._resetScrollPosition(0),this._debounce("_render",this._render,se))},_iterateItems(n,t){let e,r,i,o;if(arguments.length===2&&t){for(o=0;o<t.length;o++)if(e=t[o],r=this._computeVidx(e),(i=n.call(this,e,r))!=null)return i}else{for(e=this._physicalStart,r=this._virtualStart;e<this._physicalCount;e++,r++)if((i=n.call(this,e,r))!=null)return i;for(e=0;e<this._physicalStart;e++,r++)if((i=n.call(this,e,r))!=null)return i}},_computeVidx(n){return n>=this._physicalStart?this._virtualStart+(n-this._physicalStart):this._virtualStart+(this._physicalCount-this._physicalStart)+n},_positionItems(){this._adjustScrollPosition();let n=this._physicalTop;this._iterateItems(t=>{this.translate3d(0,`${n}px`,0,this._physicalItems[t]),n+=this._physicalSizes[t]})},_getPhysicalSizeIncrement(n){return this._physicalSizes[n]},_adjustScrollPosition(){const n=this._virtualStart===0?this._physicalTop:Math.min(this._scrollPosition+this._physicalTop,0);if(n!==0){this._physicalTop-=n;const t=this._scrollPosition;!va&&t>0&&this._resetScrollPosition(t-n)}},_resetScrollPosition(n){this.scrollTarget&&n>=0&&(this._scrollTop=n,this._scrollPosition=this._scrollTop)},_updateScrollerSize(n){const t=this._physicalBottom+Math.max(this._virtualCount-this._physicalCount-this._virtualStart,0)*this._physicalAverage;this._estScrollHeight=t,(n||this._scrollHeight===0||this._scrollPosition>=t-this._physicalSize||Math.abs(t-this._scrollHeight)>=this._viewportHeight)&&(this.$.items.style.height=`${t}px`,this._scrollHeight=t)},scrollToIndex(n){if(typeof n!="number"||n<0||n>this.items.length-1||(qe(),this._physicalCount===0))return;n=this._clamp(n,0,this._virtualCount-1),(!this._isIndexRendered(n)||n>=this._maxVirtualStart)&&(this._virtualStart=n-1),this._assignModels(),this._updateMetrics(),this._physicalTop=this._virtualStart*this._physicalAverage;let t=this._physicalStart,e=this._virtualStart,r=0;const i=this._hiddenContentSize;for(;e<n&&r<=i;)r+=this._getPhysicalSizeIncrement(t),t=(t+1)%this._physicalCount,e+=1;this._updateScrollerSize(!0),this._positionItems(),this._resetScrollPosition(this._physicalTop+this._scrollOffset+r),this._increasePoolIfNeeded(0),this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null},_resetAverage(){this._physicalAverage=0,this._physicalAverageCount=0},_resizeHandler(){this._debounce("_render",()=>{this._firstVisibleIndexVal=null,this._lastVisibleIndexVal=null,this._isVisible?(this.updateViewportBoundaries(),this.toggleScrollListener(!0),this._resetAverage(),this._render()):this.toggleScrollListener(!1)},se)},_isIndexRendered(n){return n>=this._virtualStart&&n<=this._virtualEnd},_getPhysicalIndex(n){return(this._physicalStart+(n-this._virtualStart))%this._physicalCount},_clamp(n,t,e){return Math.min(e,Math.max(t,n))},_debounce(n,t,e){this._debouncers||(this._debouncers={}),this._debouncers[n]=D.debounce(this._debouncers[n],e,t.bind(this)),Ws(this._debouncers[n])}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ca=1e5,Mr=1e3;class Xo{constructor({createElements:t,updateElement:e,scrollTarget:r,scrollContainer:i,elementsContainer:o,reorderElements:s}){this.isAttached=!0,this._vidxOffset=0,this.createElements=t,this.updateElement=e,this.scrollTarget=r,this.scrollContainer=i,this.elementsContainer=o||i,this.reorderElements=s,this._maxPages=1.3,this.__placeholderHeight=200,this.__elementHeightQueue=Array(10),this.timeouts={SCROLL_REORDER:500,IGNORE_WHEEL:500,FIX_INVALID_ITEM_POSITIONING:100},this.__resizeObserver=new ResizeObserver(()=>this._resizeHandler()),getComputedStyle(this.scrollTarget).overflow==="visible"&&(this.scrollTarget.style.overflow="auto"),getComputedStyle(this.scrollContainer).position==="static"&&(this.scrollContainer.style.position="relative"),this.__resizeObserver.observe(this.scrollTarget),this.scrollTarget.addEventListener("scroll",()=>this._scrollHandler()),new ResizeObserver(([{contentRect:l}])=>{const u=l.width===0&&l.height===0;!u&&this.__scrollTargetHidden&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition),this.__scrollTargetHidden=u}).observe(this.scrollTarget),this._scrollLineHeight=this._getScrollLineHeight(),this.scrollTarget.addEventListener("wheel",l=>this.__onWheel(l)),this.scrollTarget.addEventListener("virtualizer-element-focused",l=>this.__onElementFocused(l)),this.elementsContainer.addEventListener("focusin",()=>{this.scrollTarget.dispatchEvent(new CustomEvent("virtualizer-element-focused",{detail:{element:this.__getFocusedElement()}}))}),this.reorderElements&&(this.scrollTarget.addEventListener("mousedown",()=>{this.__mouseDown=!0}),this.scrollTarget.addEventListener("mouseup",()=>{this.__mouseDown=!1,this.__pendingReorder&&this.__reorderElements()}))}get scrollOffset(){return 0}get adjustedFirstVisibleIndex(){return this.firstVisibleIndex+this._vidxOffset}get adjustedLastVisibleIndex(){return this.lastVisibleIndex+this._vidxOffset}get _maxVirtualIndexOffset(){return this.size-this._virtualCount}__hasPlaceholders(){return this.__getVisibleElements().some(t=>t.__virtualizerPlaceholder)}scrollToIndex(t){if(typeof t!="number"||isNaN(t)||this.size===0||!this.scrollTarget.offsetHeight)return;delete this.__pendingScrollToIndex,this._physicalCount<=3&&this.flush(),t=this._clamp(t,0,this.size-1);const e=this.__getVisibleElements().length;let r=Math.floor(t/this.size*this._virtualCount);this._virtualCount-r<e?(r=this._virtualCount-(this.size-t),this._vidxOffset=this._maxVirtualIndexOffset):r<e?t<Mr?(r=t,this._vidxOffset=0):(r=Mr,this._vidxOffset=t-r):this._vidxOffset=t-r,this.__skipNextVirtualIndexAdjust=!0,super.scrollToIndex(r),this.adjustedFirstVisibleIndex!==t&&this._scrollTop<this._maxScrollTop&&!this.grid&&(this._scrollTop-=this.__getIndexScrollOffset(t)||0),this._scrollHandler(),this.__hasPlaceholders()&&(this.__pendingScrollToIndex=t)}flush(){this.scrollTarget.offsetHeight!==0&&(this._resizeHandler(),qe(),this._scrollHandler(),this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.flush(),this.__scrollReorderDebouncer&&this.__scrollReorderDebouncer.flush(),this.__debouncerWheelAnimationFrame&&this.__debouncerWheelAnimationFrame.flush())}hostConnected(){this.scrollTarget.offsetParent&&this.scrollTarget.scrollTop!==this._scrollPosition&&(this.scrollTarget.scrollTop=this._scrollPosition)}update(t=0,e=this.size-1){const r=[];this.__getVisibleElements().forEach(i=>{i.__virtualIndex>=t&&i.__virtualIndex<=e&&(this.__updateElement(i,i.__virtualIndex,!0),r.push(i))}),this.__afterElementsUpdated(r)}_updateMetrics(t){qe();let e=0,r=0;const i=this._physicalAverageCount,o=this._physicalAverage;this._iterateItems((s,a)=>{r+=this._physicalSizes[s];const l=this._physicalSizes[s];this._physicalSizes[s]=Math.ceil(this.__getBorderBoxHeight(this._physicalItems[s])),this._physicalSizes[s]!==l&&(this.__resizeObserver.unobserve(this._physicalItems[s]),this.__resizeObserver.observe(this._physicalItems[s])),e+=this._physicalSizes[s],this._physicalAverageCount+=this._physicalSizes[s]?1:0},t),this._physicalSize=this._physicalSize+e-r,this._physicalAverageCount!==i&&(this._physicalAverage=Math.round((o*i+e)/this._physicalAverageCount))}__getBorderBoxHeight(t){const e=getComputedStyle(t),r=parseFloat(e.height)||0;if(e.boxSizing==="border-box")return r;const i=parseFloat(e.paddingBottom)||0,o=parseFloat(e.paddingTop)||0,s=parseFloat(e.borderBottomWidth)||0,a=parseFloat(e.borderTopWidth)||0;return r+i+o+s+a}__updateElement(t,e,r){t.__virtualizerPlaceholder&&(t.style.paddingTop="",t.style.opacity="",t.__virtualizerPlaceholder=!1),!this.__preventElementUpdates&&(t.__lastUpdatedIndex!==e||r)&&(this.updateElement(t,e),t.__lastUpdatedIndex=e)}__afterElementsUpdated(t){t.forEach(e=>{const r=e.offsetHeight;if(r===0)e.style.paddingTop=`${this.__placeholderHeight}px`,e.style.opacity="0",e.__virtualizerPlaceholder=!0,this.__placeholderClearDebouncer=D.debounce(this.__placeholderClearDebouncer,se,()=>this._resizeHandler());else{this.__elementHeightQueue.push(r),this.__elementHeightQueue.shift();const i=this.__elementHeightQueue.filter(o=>o!==void 0);this.__placeholderHeight=Math.round(i.reduce((o,s)=>o+s,0)/i.length)}}),this.__pendingScrollToIndex!==void 0&&!this.__hasPlaceholders()&&this.scrollToIndex(this.__pendingScrollToIndex)}__getIndexScrollOffset(t){const e=this.__getVisibleElements().find(r=>r.__virtualIndex===t);return e?this.scrollTarget.getBoundingClientRect().top-e.getBoundingClientRect().top:void 0}get size(){return this.__size}set size(t){if(t===this.size)return;this.__fixInvalidItemPositioningDebouncer&&this.__fixInvalidItemPositioningDebouncer.cancel(),this._debouncers&&this._debouncers._increasePoolIfNeeded&&this._debouncers._increasePoolIfNeeded.cancel(),this.__preventElementUpdates=!0;let e,r;if(t>0&&(e=this.adjustedFirstVisibleIndex,r=this.__getIndexScrollOffset(e)),this.__size=t,this._itemsChanged({path:"items"}),qe(),t>0){e=Math.min(e,t-1),this.scrollToIndex(e);const i=this.__getIndexScrollOffset(e);r!==void 0&&i!==void 0&&(this._scrollTop+=r-i)}this.__preventElementUpdates=!1,this._isVisible||this._assignModels(),this.elementsContainer.children.length||requestAnimationFrame(()=>this._resizeHandler()),this._resizeHandler(),qe(),this._debounce("_update",this._update,fe)}get _scrollTop(){return this.scrollTarget.scrollTop}set _scrollTop(t){this.scrollTarget.scrollTop=t}get items(){return{length:Math.min(this.size,Ca)}}get offsetHeight(){return this.scrollTarget.offsetHeight}get $(){return{items:this.scrollContainer}}updateViewportBoundaries(){const t=window.getComputedStyle(this.scrollTarget);this._scrollerPaddingTop=this.scrollTarget===this?0:parseInt(t["padding-top"],10),this._isRTL=t.direction==="rtl",this._viewportWidth=this.elementsContainer.offsetWidth,this._viewportHeight=this.scrollTarget.offsetHeight,this._scrollPageHeight=this._viewportHeight-this._scrollLineHeight,this.grid&&this._updateGridMetrics()}setAttribute(){}_createPool(t){const e=this.createElements(t),r=document.createDocumentFragment();return e.forEach(i=>{i.style.position="absolute",r.appendChild(i),this.__resizeObserver.observe(i)}),this.elementsContainer.appendChild(r),e}_assignModels(t){const e=[];this._iterateItems((r,i)=>{const o=this._physicalItems[r];o.hidden=i>=this.size,o.hidden?delete o.__lastUpdatedIndex:(o.__virtualIndex=i+(this._vidxOffset||0),this.__updateElement(o,o.__virtualIndex),e.push(o))},t),this.__afterElementsUpdated(e)}_isClientFull(){return setTimeout(()=>{this.__clientFull=!0}),this.__clientFull||super._isClientFull()}translate3d(t,e,r,i){i.style.transform=`translateY(${e})`}toggleScrollListener(){}__getFocusedElement(t=this.__getVisibleElements()){return t.find(e=>e.contains(this.elementsContainer.getRootNode().activeElement)||e.contains(this.scrollTarget.getRootNode().activeElement))}__nextFocusableSiblingMissing(t,e){return e.indexOf(t)===e.length-1&&this.size>t.__virtualIndex+1}__previousFocusableSiblingMissing(t,e){return e.indexOf(t)===0&&t.__virtualIndex>0}__onElementFocused(t){if(!this.reorderElements)return;const e=t.detail.element;if(!e)return;const r=this.__getVisibleElements();(this.__previousFocusableSiblingMissing(e,r)||this.__nextFocusableSiblingMissing(e,r))&&this.flush();const i=this.__getVisibleElements();this.__nextFocusableSiblingMissing(e,i)?(this._scrollTop+=Math.ceil(e.getBoundingClientRect().bottom)-Math.floor(this.scrollTarget.getBoundingClientRect().bottom-1),this.flush()):this.__previousFocusableSiblingMissing(e,i)&&(this._scrollTop-=Math.ceil(this.scrollTarget.getBoundingClientRect().top+1)-Math.floor(e.getBoundingClientRect().top),this.flush())}_scrollHandler(){if(this.scrollTarget.offsetHeight===0)return;this._adjustVirtualIndexOffset(this._scrollTop-(this.__previousScrollTop||0));const t=this.scrollTarget.scrollTop-this._scrollPosition;if(super._scrollHandler(),this._physicalCount!==0){const e=t>=0,r=this._getReusables(!e);r.indexes.length&&(this._physicalTop=r.physicalTop,e?(this._virtualStart-=r.indexes.length,this._physicalStart-=r.indexes.length):(this._virtualStart+=r.indexes.length,this._physicalStart+=r.indexes.length),this._resizeHandler())}t&&(this.__fixInvalidItemPositioningDebouncer=D.debounce(this.__fixInvalidItemPositioningDebouncer,Z.after(this.timeouts.FIX_INVALID_ITEM_POSITIONING),()=>this.__fixInvalidItemPositioning())),this.reorderElements&&(this.__scrollReorderDebouncer=D.debounce(this.__scrollReorderDebouncer,Z.after(this.timeouts.SCROLL_REORDER),()=>this.__reorderElements())),this.__previousScrollTop=this._scrollTop,this._scrollTop===0&&this.firstVisibleIndex!==0&&Math.abs(t)>0&&this.scrollToIndex(0)}_resizeHandler(){super._resizeHandler();const t=this.adjustedLastVisibleIndex===this.size-1,e=this._physicalTop-this._scrollPosition;if(t&&e>0){const r=Math.ceil(e/this._physicalAverage);this._virtualStart=Math.max(0,this._virtualStart-r),this._physicalStart=Math.max(0,this._physicalStart-r),super.scrollToIndex(this._virtualCount-1),this.scrollTarget.scrollTop=this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight}}__fixInvalidItemPositioning(){if(!this.scrollTarget.isConnected)return;const t=this._physicalTop>this._scrollTop,e=this._physicalBottom<this._scrollBottom,r=this.adjustedFirstVisibleIndex===0,i=this.adjustedLastVisibleIndex===this.size-1;if(t&&!r||e&&!i){const o=e,s=this._ratio;this._ratio=0,this._scrollPosition=this._scrollTop+(o?-1:1),this._scrollHandler(),this._ratio=s}}__onWheel(t){if(t.ctrlKey||this._hasScrolledAncestor(t.target,t.deltaX,t.deltaY))return;let e=t.deltaY;if(t.deltaMode===WheelEvent.DOM_DELTA_LINE?e*=this._scrollLineHeight:t.deltaMode===WheelEvent.DOM_DELTA_PAGE&&(e*=this._scrollPageHeight),this._deltaYAcc||(this._deltaYAcc=0),this._wheelAnimationFrame){this._deltaYAcc+=e,t.preventDefault();return}e+=this._deltaYAcc,this._deltaYAcc=0,this._wheelAnimationFrame=!0,this.__debouncerWheelAnimationFrame=D.debounce(this.__debouncerWheelAnimationFrame,se,()=>{this._wheelAnimationFrame=!1});const r=Math.abs(t.deltaX)+Math.abs(e);this._canScroll(this.scrollTarget,t.deltaX,e)?(t.preventDefault(),this.scrollTarget.scrollTop+=e,this.scrollTarget.scrollLeft+=t.deltaX,this._hasResidualMomentum=!0,this._ignoreNewWheel=!0,this._debouncerIgnoreNewWheel=D.debounce(this._debouncerIgnoreNewWheel,Z.after(this.timeouts.IGNORE_WHEEL),()=>{this._ignoreNewWheel=!1})):this._hasResidualMomentum&&r<=this._previousMomentum||this._ignoreNewWheel?t.preventDefault():r>this._previousMomentum&&(this._hasResidualMomentum=!1),this._previousMomentum=r}_hasScrolledAncestor(t,e,r){if(t===this.scrollTarget||t===this.scrollTarget.getRootNode().host)return!1;if(this._canScroll(t,e,r)&&["auto","scroll"].indexOf(getComputedStyle(t).overflow)!==-1)return!0;if(t!==this&&t.parentElement)return this._hasScrolledAncestor(t.parentElement,e,r)}_canScroll(t,e,r){return r>0&&t.scrollTop<t.scrollHeight-t.offsetHeight||r<0&&t.scrollTop>0||e>0&&t.scrollLeft<t.scrollWidth-t.offsetWidth||e<0&&t.scrollLeft>0}_increasePoolIfNeeded(t){if(this._physicalCount>2&&t){const r=Math.ceil(this._optPhysicalSize/this._physicalAverage)-this._physicalCount;super._increasePoolIfNeeded(Math.max(t,Math.min(100,r)))}else super._increasePoolIfNeeded(t)}get _optPhysicalSize(){const t=super._optPhysicalSize;return t<=0||this.__hasPlaceholders()?t:t+this.__getItemHeightBuffer()}__getItemHeightBuffer(){if(this._physicalCount===0)return 0;const t=Math.ceil(this._viewportHeight*(this._maxPages-1)/2),e=Math.max(...this._physicalSizes);return e>Math.min(...this._physicalSizes)?Math.max(0,e-t):0}_getScrollLineHeight(){const t=document.createElement("div");t.style.fontSize="initial",t.style.display="none",document.body.appendChild(t);const e=window.getComputedStyle(t).fontSize;return document.body.removeChild(t),e?window.parseInt(e):void 0}__getVisibleElements(){return Array.from(this.elementsContainer.children).filter(t=>!t.hidden)}__reorderElements(){if(this.__mouseDown){this.__pendingReorder=!0;return}this.__pendingReorder=!1;const t=this._virtualStart+(this._vidxOffset||0),e=this.__getVisibleElements(),r=this.__getFocusedElement(e)||e[0];if(!r)return;const i=r.__virtualIndex-t,o=e.indexOf(r)-i;if(o>0)for(let s=0;s<o;s++)this.elementsContainer.appendChild(e[s]);else if(o<0)for(let s=e.length+o;s<e.length;s++)this.elementsContainer.insertBefore(e[s],e[0]);if(li){const{transform:s}=this.scrollTarget.style;this.scrollTarget.style.transform="translateZ(0)",setTimeout(()=>{this.scrollTarget.style.transform=s})}}_adjustVirtualIndexOffset(t){const e=this._maxVirtualIndexOffset;if(this._virtualCount>=this.size)this._vidxOffset=0;else if(this.__skipNextVirtualIndexAdjust)this.__skipNextVirtualIndexAdjust=!1;else if(Math.abs(t)>1e4){const r=this._scrollTop/(this.scrollTarget.scrollHeight-this.scrollTarget.clientHeight);this._vidxOffset=Math.round(r*e)}else{const r=this._vidxOffset,i=Mr,o=100;this._scrollTop===0?(this._vidxOffset=0,r!==this._vidxOffset&&super.scrollToIndex(0)):this.firstVisibleIndex<i&&this._vidxOffset>0&&(this._vidxOffset-=Math.min(this._vidxOffset,o),super.scrollToIndex(this.firstVisibleIndex+(r-this._vidxOffset))),this._scrollTop>=this._maxScrollTop&&this._maxScrollTop>0?(this._vidxOffset=e,r!==this._vidxOffset&&super.scrollToIndex(this._virtualCount-1)):this.firstVisibleIndex>this._virtualCount-i&&this._vidxOffset<e&&(this._vidxOffset+=Math.min(e-this._vidxOffset,o),super.scrollToIndex(this.firstVisibleIndex-(this._vidxOffset-r)))}}}Object.setPrototypeOf(Xo.prototype,wa);class xa{constructor(t){this.__adapter=new Xo(t)}get firstVisibleIndex(){return this.__adapter.adjustedFirstVisibleIndex}get lastVisibleIndex(){return this.__adapter.adjustedLastVisibleIndex}get size(){return this.__adapter.size}set size(t){this.__adapter.size=t}scrollToIndex(t){this.__adapter.scrollToIndex(t)}update(t=0,e=this.size-1){this.__adapter.update(t,e)}flush(){this.__adapter.flush()}hostConnected(){this.__adapter.hostConnected()}}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Sa=n=>class extends n{static get properties(){return{accessibleName:{type:String}}}static get observers(){return["_a11yUpdateGridSize(size, _columnTree, __emptyState)"]}_a11yGetHeaderRowCount(e){return e.filter(r=>r.some(i=>i.headerRenderer||i.path&&i.header!==null||i.header)).length}_a11yGetFooterRowCount(e){return e.filter(r=>r.some(i=>i.footerRenderer)).length}_a11yUpdateGridSize(e,r,i){if(e===void 0||r===void 0)return;const o=this._a11yGetHeaderRowCount(r),s=this._a11yGetFooterRowCount(r),l=(i?1:e)+o+s;this.$.table.setAttribute("aria-rowcount",l);const u=r[r.length-1],f=i?1:l&&u&&u.length||0;this.$.table.setAttribute("aria-colcount",f),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows()}_a11yUpdateHeaderRows(){te(this.$.header,(e,r)=>{e.setAttribute("aria-rowindex",r+1)})}_a11yUpdateFooterRows(){te(this.$.footer,(e,r)=>{e.setAttribute("aria-rowindex",this._a11yGetHeaderRowCount(this._columnTree)+this.size+r+1)})}_a11yUpdateRowRowindex(e,r){e.setAttribute("aria-rowindex",r+this._a11yGetHeaderRowCount(this._columnTree)+1)}_a11yUpdateRowSelected(e,r){e.setAttribute("aria-selected",!!r),Ne(e,i=>{i.setAttribute("aria-selected",!!r)})}_a11yUpdateRowExpanded(e){const r=ya(e);this.__isRowExpandable(e)?(e.setAttribute("aria-expanded","false"),r&&r.setAttribute("aria-expanded","false")):this.__isRowCollapsible(e)?(e.setAttribute("aria-expanded","true"),r&&r.setAttribute("aria-expanded","true")):(e.removeAttribute("aria-expanded"),r&&r.removeAttribute("aria-expanded"))}_a11yUpdateRowLevel(e,r){r>0||this.__isRowCollapsible(e)||this.__isRowExpandable(e)?e.setAttribute("aria-level",r+1):e.removeAttribute("aria-level")}_a11ySetRowDetailsCell(e,r){Ne(e,i=>{i!==r&&i.setAttribute("aria-controls",r.id)})}_a11yUpdateCellColspan(e,r){e.setAttribute("aria-colspan",Number(r))}_a11yUpdateSorters(){Array.from(this.querySelectorAll("vaadin-grid-sorter")).forEach(e=>{let r=e.parentNode;for(;r&&r.localName!=="vaadin-grid-cell-content";)r=r.parentNode;r&&r.assignedSlot&&r.assignedSlot.parentNode.setAttribute("aria-sort",{asc:"ascending",desc:"descending"}[String(e.direction)]||"none")})}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Zo=n=>n.offsetParent&&!n.part.contains("body-cell")&&ci(n)&&getComputedStyle(n).visibility!=="hidden",Oa=n=>class extends n{static get properties(){return{activeItem:{type:Object,notify:!0,value:null,sync:!0}}}ready(){super.ready(),this.$.scroller.addEventListener("click",this._onClick.bind(this)),this.addEventListener("cell-activate",this._activateItem.bind(this)),this.addEventListener("row-activate",this._activateItem.bind(this))}_activateItem(e){const r=e.detail.model,i=r?r.item:null;i&&(this.activeItem=this._itemsEqual(this.activeItem,i)?null:i)}_shouldPreventCellActivationOnClick(e){const{cell:r}=this._getGridEventLocation(e);return e.defaultPrevented||!r||r.getAttribute("part").includes("details-cell")||r===this.$.emptystatecell||r._content.contains(this.getRootNode().activeElement)||this._isFocusable(e.target)||e.target instanceof HTMLLabelElement}_onClick(e){if(this._shouldPreventCellActivationOnClick(e))return;const{cell:r}=this._getGridEventLocation(e);r&&this.dispatchEvent(new CustomEvent("cell-activate",{detail:{model:this.__getRowModel(r.parentElement)}}))}_isFocusable(e){return Zo(e)}};function Me(n,t){return n.split(".").reduce((e,r)=>e[r],t)}function $i(n,t,e){if(e.length===0)return!1;let r=!0;return n.forEach(({path:i})=>{if(!i||i.indexOf(".")===-1)return;const o=i.replace(/\.[^.]*$/u,"");Me(o,e[0])===void 0&&(console.warn(`Path "${i}" used for ${t} does not exist in all of the items, ${t} is disabled.`),r=!1)}),r}function Vt(n){return[void 0,null].indexOf(n)>=0?"":isNaN(n)?n.toString():n}function Mi(n,t){return n=Vt(n),t=Vt(t),n<t?-1:n>t?1:0}function Ia(n,t){return n.sort((e,r)=>t.map(i=>i.direction==="asc"?Mi(Me(i.path,e),Me(i.path,r)):i.direction==="desc"?Mi(Me(i.path,r),Me(i.path,e)):0).reduce((i,o)=>i!==0?i:o,0))}function Pa(n,t){return n.filter(e=>t.every(r=>{const i=Vt(Me(r.path,e)),o=Vt(r.value).toString().toLowerCase();return i.toString().toLowerCase().includes(o)}))}const Ea=n=>(t,e)=>{let r=n?[...n]:[];t.filters&&$i(t.filters,"filtering",r)&&(r=Pa(r,t.filters)),Array.isArray(t.sortOrders)&&t.sortOrders.length&&$i(t.sortOrders,"sorting",r)&&(r=Ia(r,t.sortOrders));const i=Math.min(r.length,t.pageSize),o=t.page*i,s=o+i,a=r.slice(o,s);e(a,r.length)};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ta=n=>class extends n{static get properties(){return{items:{type:Array,sync:!0}}}static get observers(){return["__dataProviderOrItemsChanged(dataProvider, items, isAttached, items.*)"]}__setArrayDataProvider(e){const r=Ea(this.items);r.__items=e,this._arrayDataProvider=r,this.size=e.length,this.dataProvider=r}_onDataProviderPageReceived(){super._onDataProviderPageReceived(),this._arrayDataProvider&&(this.size=this._flatSize)}__dataProviderOrItemsChanged(e,r,i){i&&(this._arrayDataProvider?e!==this._arrayDataProvider?(this._arrayDataProvider=void 0,this.items=void 0):r?this._arrayDataProvider.__items===r?this.clearCache():this.__setArrayDataProvider(r):(this._arrayDataProvider=void 0,this.dataProvider=void 0,this.size=0,this.clearCache()):r&&this.__setArrayDataProvider(r))}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Aa=n=>class extends n{static get properties(){return{__pendingRecalculateColumnWidths:{type:Boolean,value:!0}}}static get observers(){return["__dataProviderChangedAutoWidth(dataProvider)","__columnTreeChangedAutoWidth(_columnTree)","__flatSizeChangedAutoWidth(_flatSize)"]}constructor(){super(),this.addEventListener("animationend",this.__onAnimationEndAutoWidth)}__onAnimationEndAutoWidth(t){t.animationName.indexOf("vaadin-grid-appear")===0&&this.__tryToRecalculateColumnWidthsIfPending()}__dataProviderChangedAutoWidth(t){this.__hasHadRenderedRowsForColumnWidthCalculation||this.recalculateColumnWidths()}__columnTreeChangedAutoWidth(t){queueMicrotask(()=>this.recalculateColumnWidths())}__flatSizeChangedAutoWidth(t){requestAnimationFrame(()=>{t&&!this.__hasHadRenderedRowsForColumnWidthCalculation?this.recalculateColumnWidths():this.__tryToRecalculateColumnWidthsIfPending()})}_onDataProviderPageLoaded(){super._onDataProviderPageLoaded(),this.__tryToRecalculateColumnWidthsIfPending()}_updateFrozenColumn(){super._updateFrozenColumn(),this.__tryToRecalculateColumnWidthsIfPending()}__getIntrinsicWidth(t){return this.__intrinsicWidthCache.has(t)||this.__calculateAndCacheIntrinsicWidths([t]),this.__intrinsicWidthCache.get(t)}__getDistributedWidth(t,e){if(t==null||t===this)return 0;const r=Math.max(this.__getIntrinsicWidth(t),this.__getDistributedWidth(this.__getParentColumnGroup(t),t));if(!e)return r;const i=t,o=r,s=i._visibleChildColumns.map(f=>this.__getIntrinsicWidth(f)).reduce((f,p)=>f+p,0),a=Math.max(0,o-s),u=this.__getIntrinsicWidth(e)/s*a;return this.__getIntrinsicWidth(e)+u}_recalculateColumnWidths(){this.__virtualizer.flush(),[...this.$.header.children,...this.$.footer.children].forEach(o=>{o.__debounceUpdateHeaderFooterRowVisibility&&o.__debounceUpdateHeaderFooterRowVisibility.flush()}),this.__hasHadRenderedRowsForColumnWidthCalculation=this.__hasHadRenderedRowsForColumnWidthCalculation||this._getRenderedRows().length>0,this.__intrinsicWidthCache=new Map;const t=this._firstVisibleIndex,e=this._lastVisibleIndex;this.__viewportRowsCache=this._getRenderedRows().filter(o=>o.index>=t&&o.index<=e);const r=this.__getAutoWidthColumns(),i=new Set;for(const o of r){let s=this.__getParentColumnGroup(o);for(;s&&!i.has(s);)i.add(s),s=this.__getParentColumnGroup(s)}this.__calculateAndCacheIntrinsicWidths([...r,...i]),r.forEach(o=>{o.width=`${this.__getDistributedWidth(o)}px`}),this.__intrinsicWidthCache.clear()}__getParentColumnGroup(t){const e=(t.assignedSlot||t).parentElement;return e&&e!==this?e:null}__setVisibleCellContentAutoWidth(t,e){t._allCells.filter(r=>this.$.items.contains(r)?this.__viewportRowsCache.includes(r.parentElement):!0).forEach(r=>{r.__measuringAutoWidth=e,r.__measuringAutoWidth?(r.__originalWidth=r.style.width,r.style.width="auto",r.style.position="absolute"):(r.style.width=r.__originalWidth,delete r.__originalWidth,r.style.position="")}),e?this.$.scroller.setAttribute("measuring-auto-width",""):this.$.scroller.removeAttribute("measuring-auto-width")}__getAutoWidthCellsMaxWidth(t){return t._allCells.reduce((e,r)=>r.__measuringAutoWidth?Math.max(e,r.offsetWidth+1):e,0)}__calculateAndCacheIntrinsicWidths(t){t.forEach(e=>this.__setVisibleCellContentAutoWidth(e,!0)),t.forEach(e=>{const r=this.__getAutoWidthCellsMaxWidth(e);this.__intrinsicWidthCache.set(e,r)}),t.forEach(e=>this.__setVisibleCellContentAutoWidth(e,!1))}recalculateColumnWidths(){if(!this.__isReadyForColumnWidthCalculation()){this.__pendingRecalculateColumnWidths=!0;return}this._recalculateColumnWidths()}__tryToRecalculateColumnWidthsIfPending(){this.__pendingRecalculateColumnWidths&&(this.__pendingRecalculateColumnWidths=!1,this.recalculateColumnWidths())}__getAutoWidthColumns(){return this._getColumns().filter(t=>!t.hidden&&t.autoWidth)}__isReadyForColumnWidthCalculation(){if(!this._columnTree)return!1;const t=this.__getAutoWidthColumns().filter(s=>!customElements.get(s.localName));if(t.length)return Promise.all(t.map(s=>customElements.whenDefined(s.localName))).then(()=>{this.__tryToRecalculateColumnWidthsIfPending()}),!1;const e=[...this.$.items.children].some(s=>s.index===void 0),r=this._debouncerHiddenChanged&&this._debouncerHiddenChanged.isActive(),i=this.__debounceUpdateFrozenColumn&&this.__debounceUpdateFrozenColumn.isActive(),o=this.clientHeight>0;return!this._dataProviderController.isLoading()&&!e&&!Fe(this)&&!r&&!i&&o}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Da=n=>class extends n{static get properties(){return{columnReorderingAllowed:{type:Boolean,value:!1},_orderBaseScope:{type:Number,value:1e7}}}static get observers(){return["_updateOrders(_columnTree)"]}ready(){super.ready(),ne(this,"track",this._onTrackEvent),this._reorderGhost=this.shadowRoot.querySelector('[part="reorder-ghost"]'),this.addEventListener("touchstart",this._onTouchStart.bind(this)),this.addEventListener("touchmove",this._onTouchMove.bind(this)),this.addEventListener("touchend",this._onTouchEnd.bind(this)),this.addEventListener("contextmenu",this._onContextMenu.bind(this))}_onContextMenu(e){this.hasAttribute("reordering")&&(e.preventDefault(),Er||this._onTrackEnd())}_onTouchStart(e){this._startTouchReorderTimeout=setTimeout(()=>{this._onTrackStart({detail:{x:e.touches[0].clientX,y:e.touches[0].clientY}})},100)}_onTouchMove(e){this._draggedColumn&&e.preventDefault(),clearTimeout(this._startTouchReorderTimeout)}_onTouchEnd(){clearTimeout(this._startTouchReorderTimeout),this._onTrackEnd()}_onTrackEvent(e){if(e.detail.state==="start"){const r=e.composedPath(),i=r[r.indexOf(this.$.header)-2];if(!i||!i._content||i._content.contains(this.getRootNode().activeElement)||this.$.scroller.hasAttribute("column-resizing"))return;this._touchDevice||this._onTrackStart(e)}else e.detail.state==="track"?this._onTrack(e):e.detail.state==="end"&&this._onTrackEnd(e)}_onTrackStart(e){if(!this.columnReorderingAllowed)return;const r=e.composedPath&&e.composedPath();if(r&&r.slice(0,Math.max(0,r.indexOf(this))).some(o=>o.draggable))return;const i=this._cellFromPoint(e.detail.x,e.detail.y);if(!(!i||!i.getAttribute("part").includes("header-cell"))){for(this.toggleAttribute("reordering",!0),this._draggedColumn=i._column;this._draggedColumn.parentElement.childElementCount===1;)this._draggedColumn=this._draggedColumn.parentElement;this._setSiblingsReorderStatus(this._draggedColumn,"allowed"),this._draggedColumn._reorderStatus="dragging",this._updateGhost(i),this._reorderGhost.style.visibility="visible",this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._autoScroller()}}_onTrack(e){if(!this._draggedColumn)return;const r=this._cellFromPoint(e.detail.x,e.detail.y);if(!r)return;const i=this._getTargetColumn(r,this._draggedColumn);if(this._isSwapAllowed(this._draggedColumn,i)&&this._isSwappableByPosition(i,e.detail.x)){const o=this._columnTree.findIndex(f=>f.includes(i)),s=this._getColumnsInOrder(o),a=s.indexOf(this._draggedColumn),l=s.indexOf(i),u=a<l?1:-1;for(let f=a;f!==l;f+=u)this._swapColumnOrders(this._draggedColumn,s[f+u])}this._updateGhostPosition(e.detail.x,this._touchDevice?e.detail.y-50:e.detail.y),this._lastDragClientX=e.detail.x}_onTrackEnd(){this._draggedColumn&&(this.toggleAttribute("reordering",!1),this._draggedColumn._reorderStatus="",this._setSiblingsReorderStatus(this._draggedColumn,""),this._draggedColumn=null,this._lastDragClientX=null,this._reorderGhost.style.visibility="hidden",this.dispatchEvent(new CustomEvent("column-reorder",{detail:{columns:this._getColumnsInOrder()}})))}_getColumnsInOrder(e=this._columnTree.length-1){return this._columnTree[e].filter(r=>!r.hidden).sort((r,i)=>r._order-i._order)}_cellFromPoint(e=0,r=0){this._draggedColumn||this.$.scroller.toggleAttribute("no-content-pointer-events",!0);const i=this.shadowRoot.elementFromPoint(e,r);return this.$.scroller.toggleAttribute("no-content-pointer-events",!1),this._getCellFromElement(i)}_getCellFromElement(e){if(e){if(e._column)return e;const{parentElement:r}=e;if(r&&r._focusButton===e)return r}return null}_updateGhostPosition(e,r){const i=this._reorderGhost.getBoundingClientRect(),o=e-i.width/2,s=r-i.height/2,a=parseInt(this._reorderGhost._left||0),l=parseInt(this._reorderGhost._top||0);this._reorderGhost._left=a-(i.left-o),this._reorderGhost._top=l-(i.top-s),this._reorderGhost.style.transform=`translate(${this._reorderGhost._left}px, ${this._reorderGhost._top}px)`}_updateGhost(e){const r=this._reorderGhost;r.textContent=e._content.innerText;const i=window.getComputedStyle(e);return["boxSizing","display","width","height","background","alignItems","padding","border","flex-direction","overflow"].forEach(o=>{r.style[o]=i[o]}),r}_updateOrders(e){e!==void 0&&(e[0].forEach(r=>{r._order=0}),Go(e[0],this._orderBaseScope,0))}_setSiblingsReorderStatus(e,r){te(e.parentNode,i=>{/column/u.test(i.localName)&&this._isSwapAllowed(i,e)&&(i._reorderStatus=r)})}_autoScroller(){if(this._lastDragClientX){const e=this._lastDragClientX-this.getBoundingClientRect().right+50,r=this.getBoundingClientRect().left-this._lastDragClientX+50;e>0?this.$.table.scrollLeft+=e/10:r>0&&(this.$.table.scrollLeft-=r/10)}this._draggedColumn&&setTimeout(()=>this._autoScroller(),10)}_isSwapAllowed(e,r){if(e&&r){const i=e!==r,o=e.parentElement===r.parentElement,s=e.frozen&&r.frozen||e.frozenToEnd&&r.frozenToEnd||!e.frozen&&!e.frozenToEnd&&!r.frozen&&!r.frozenToEnd;return i&&o&&s}}_isSwappableByPosition(e,r){const i=Array.from(this.$.header.querySelectorAll('tr:not([hidden]) [part~="cell"]')).find(a=>e.contains(a._column)),o=this.$.header.querySelector("tr:not([hidden]) [reorder-status=dragging]").getBoundingClientRect(),s=i.getBoundingClientRect();return s.left>o.left?r>s.right-o.width:r<s.left+o.width}_swapColumnOrders(e,r){[e._order,r._order]=[r._order,e._order],this._debounceUpdateFrozenColumn(),this._updateFirstAndLastColumn()}_getTargetColumn(e,r){if(e&&r){let i=e._column;for(;i.parentElement!==r.parentElement&&i!==this;)i=i.parentElement;return i.parentElement===r.parentElement?i:e._column}}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ka=n=>class extends n{ready(){super.ready();const e=this.$.scroller;ne(e,"track",this._onHeaderTrack.bind(this)),e.addEventListener("touchmove",r=>e.hasAttribute("column-resizing")&&r.preventDefault()),e.addEventListener("contextmenu",r=>r.target.getAttribute("part")==="resize-handle"&&r.preventDefault()),e.addEventListener("mousedown",r=>r.target.getAttribute("part")==="resize-handle"&&r.preventDefault())}_onHeaderTrack(e){const r=e.target;if(r.getAttribute("part")==="resize-handle"){let o=r.parentElement._column;for(this.$.scroller.toggleAttribute("column-resizing",!0);o.localName==="vaadin-grid-column-group";)o=o._childColumns.slice(0).sort((p,m)=>p._order-m._order).filter(p=>!p.hidden).pop();const s=this.__isRTL,a=e.detail.x,l=Array.from(this.$.header.querySelectorAll('[part~="row"]:last-child [part~="cell"]')),u=l.find(p=>p._column===o);if(u.offsetWidth){const p=getComputedStyle(u._content),m=10+parseInt(p.paddingLeft)+parseInt(p.paddingRight)+parseInt(p.borderLeftWidth)+parseInt(p.borderRightWidth)+parseInt(p.marginLeft)+parseInt(p.marginRight);let g;const b=u.offsetWidth,w=u.getBoundingClientRect();u.hasAttribute("frozen-to-end")?g=b+(s?a-w.right:w.left-a):g=b+(s?w.left-a:a-w.right),o.width=`${Math.max(m,g)}px`,o.flexGrow=0}l.sort((p,m)=>p._column._order-m._column._order).forEach((p,m,g)=>{m<g.indexOf(u)&&(p._column.width=`${p.offsetWidth}px`,p._column.flexGrow=0)});const f=this._frozenToEndCells[0];if(f&&this.$.table.scrollWidth>this.$.table.offsetWidth){const p=f.getBoundingClientRect(),m=a-(s?p.right:p.left);(s&&m<=0||!s&&m>=0)&&(this.$.table.scrollLeft+=m)}e.detail.state==="end"&&(this.$.scroller.toggleAttribute("column-resizing",!1),this.dispatchEvent(new CustomEvent("column-resize",{detail:{resizedColumn:o}}))),this._resizeHandler()}}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Wt(n,t,e=0){let r=t;for(const i of n.subCaches){const o=i.parentCacheIndex;if(r<=o)break;if(r<=o+i.flatSize)return Wt(i,r-o-1,e+1);r-=i.flatSize}return{cache:n,item:n.items[r],index:r,page:Math.floor(r/n.pageSize),level:e}}function Jo({getItemId:n},t,e,r=0,i=0){for(let o=0;o<t.items.length;o++){const s=t.items[o];if(s&&n(s)===n(e))return{cache:t,level:r,item:s,index:o,page:Math.floor(o/t.pageSize),subCache:t.getSubCache(o),flatIndex:i+t.getFlatIndex(o)}}for(const o of t.subCaches){const s=i+t.getFlatIndex(o.parentCacheIndex),a=Jo({getItemId:n},o,e,r+1,s+1);if(a)return a}}function es(n,[t,...e],r=0){t===1/0&&(t=n.size-1);const i=n.getFlatIndex(t),o=n.getSubCache(t);return o&&o.flatSize>0&&e.length?es(o,e,r+i+1):r+i}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class pi{context;pageSize;items=[];pendingRequests={};__subCacheByIndex={};__size=0;__flatSize=0;constructor(t,e,r,i,o){this.context=t,this.pageSize=e,this.size=r,this.parentCache=i,this.parentCacheIndex=o,this.__flatSize=r||0}get parentItem(){return this.parentCache&&this.parentCache.items[this.parentCacheIndex]}get subCaches(){return Object.values(this.__subCacheByIndex)}get isLoading(){return Object.keys(this.pendingRequests).length>0?!0:this.subCaches.some(t=>t.isLoading)}get flatSize(){return this.__flatSize}get effectiveSize(){return console.warn("<vaadin-grid> The `effectiveSize` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.flatSize}get size(){return this.__size}set size(t){if(this.__size!==t){if(this.__size=t,this.context.placeholder!==void 0){this.items.length=t||0;for(let r=0;r<t;r++)this.items[r]||=this.context.placeholder}Object.keys(this.pendingRequests).forEach(r=>{parseInt(r)*this.pageSize>=this.size&&delete this.pendingRequests[r]})}}recalculateFlatSize(){this.__flatSize=!this.parentItem||this.context.isExpanded(this.parentItem)?this.size+this.subCaches.reduce((t,e)=>(e.recalculateFlatSize(),t+e.flatSize),0):0}setPage(t,e){const r=t*this.pageSize;e.forEach((i,o)=>{const s=r+o;(this.size===void 0||s<this.size)&&(this.items[s]=i)})}getSubCache(t){return this.__subCacheByIndex[t]}removeSubCache(t){delete this.__subCacheByIndex[t]}removeSubCaches(){this.__subCacheByIndex={}}createSubCache(t){const e=new pi(this.context,this.pageSize,0,this,t);return this.__subCacheByIndex[t]=e,e}getFlatIndex(t){const e=Math.max(0,Math.min(this.size-1,t));return this.subCaches.reduce((r,i)=>{const o=i.parentCacheIndex;return e>o?r+i.flatSize:r},e)}getItemForIndex(t){console.warn("<vaadin-grid> The `getItemForIndex` method of ItemCache is deprecated and will be removed in Vaadin 25.");const{item:e}=Wt(this,t);return e}getCacheAndIndex(t){console.warn("<vaadin-grid> The `getCacheAndIndex` method of ItemCache is deprecated and will be removed in Vaadin 25.");const{cache:e,index:r}=Wt(this,t);return{cache:e,scaledIndex:r}}updateSize(){console.warn("<vaadin-grid> The `updateSize` method of ItemCache is deprecated and will be removed in Vaadin 25."),this.recalculateFlatSize()}ensureSubCacheForScaledIndex(t){if(console.warn("<vaadin-grid> The `ensureSubCacheForScaledIndex` method of ItemCache is deprecated and will be removed in Vaadin 25."),!this.getSubCache(t)){const e=this.createSubCache(t);this.context.__controller.__loadCachePage(e,0)}}get grid(){return console.warn("<vaadin-grid> The `grid` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.context.__controller.host}get itemCaches(){return console.warn("<vaadin-grid> The `itemCaches` property of ItemCache is deprecated and will be removed in Vaadin 25."),this.__subCacheByIndex}}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ra extends EventTarget{host;dataProvider;dataProviderParams;pageSize;isExpanded;getItemId;rootCache;placeholder;isPlaceholder;constructor(t,{size:e,pageSize:r,isExpanded:i,getItemId:o,isPlaceholder:s,placeholder:a,dataProvider:l,dataProviderParams:u}){super(),this.host=t,this.pageSize=r,this.getItemId=o,this.isExpanded=i,this.placeholder=a,this.isPlaceholder=s,this.dataProvider=l,this.dataProviderParams=u,this.rootCache=this.__createRootCache(e)}get flatSize(){return this.rootCache.flatSize}get __cacheContext(){return{isExpanded:this.isExpanded,placeholder:this.placeholder,__controller:this}}isLoading(){return this.rootCache.isLoading}setPageSize(t){this.pageSize=t,this.clearCache()}setDataProvider(t){this.dataProvider=t,this.clearCache()}recalculateFlatSize(){this.rootCache.recalculateFlatSize()}clearCache(){this.rootCache=this.__createRootCache(this.rootCache.size)}getFlatIndexContext(t){return Wt(this.rootCache,t)}getItemContext(t){return Jo({getItemId:this.getItemId},this.rootCache,t)}getFlatIndexByPath(t){return es(this.rootCache,t)}ensureFlatIndexLoaded(t){const{cache:e,page:r,item:i}=this.getFlatIndexContext(t);this.__isItemLoaded(i)||this.__loadCachePage(e,r)}ensureFlatIndexHierarchy(t){const{cache:e,item:r,index:i}=this.getFlatIndexContext(t);if(this.__isItemLoaded(r)&&this.isExpanded(r)&&!e.getSubCache(i)){const o=e.createSubCache(i);this.__loadCachePage(o,0)}}loadFirstPage(){this.__loadCachePage(this.rootCache,0)}__createRootCache(t){return new pi(this.__cacheContext,this.pageSize,t)}__loadCachePage(t,e){if(!this.dataProvider||t.pendingRequests[e])return;let r={page:e,pageSize:this.pageSize,parentItem:t.parentItem};this.dataProviderParams&&(r={...r,...this.dataProviderParams()});const i=(o,s)=>{t.pendingRequests[e]===i&&(s!==void 0?t.size=s:r.parentItem&&(t.size=o.length),t.setPage(e,o),this.recalculateFlatSize(),this.dispatchEvent(new CustomEvent("page-received")),delete t.pendingRequests[e],this.dispatchEvent(new CustomEvent("page-loaded")))};t.pendingRequests[e]=i,this.dispatchEvent(new CustomEvent("page-requested")),this.dataProvider(r,i)}__isItemLoaded(t){return this.isPlaceholder?!this.isPlaceholder(t):this.placeholder?t!==this.placeholder:!!t}}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const $a=n=>class extends n{static get properties(){return{size:{type:Number,notify:!0,sync:!0},_flatSize:{type:Number,sync:!0},pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},dataProvider:{type:Object,notify:!0,observer:"_dataProviderChanged",sync:!0},loading:{type:Boolean,notify:!0,readOnly:!0,reflectToAttribute:!0},_hasData:{type:Boolean,value:!1,sync:!0},itemHasChildrenPath:{type:String,value:"children",observer:"__itemHasChildrenPathChanged",sync:!0},itemIdPath:{type:String,value:null,sync:!0},expandedItems:{type:Object,notify:!0,value:()=>[],sync:!0},__expandedKeys:{type:Object,computed:"__computeExpandedKeys(itemIdPath, expandedItems)"}}}static get observers(){return["_sizeChanged(size)","_expandedItemsChanged(expandedItems)"]}constructor(){super(),this._dataProviderController=new Ra(this,{size:this.size||0,pageSize:this.pageSize,getItemId:this.getItemId.bind(this),isExpanded:this._isExpanded.bind(this),dataProvider:this.dataProvider?this.dataProvider.bind(this):null,dataProviderParams:()=>({sortOrders:this._mapSorters(),filters:this._mapFilters()})}),this._dataProviderController.addEventListener("page-requested",this._onDataProviderPageRequested.bind(this)),this._dataProviderController.addEventListener("page-received",this._onDataProviderPageReceived.bind(this)),this._dataProviderController.addEventListener("page-loaded",this._onDataProviderPageLoaded.bind(this))}get _cache(){return console.warn("<vaadin-grid> The `_cache` property is deprecated and will be removed in Vaadin 25."),this._dataProviderController.rootCache}get _effectiveSize(){return console.warn("<vaadin-grid> The `_effectiveSize` property is deprecated and will be removed in Vaadin 25."),this._flatSize}_sizeChanged(e){this._dataProviderController.rootCache.size=e,this._dataProviderController.recalculateFlatSize(),this._flatSize=this._dataProviderController.flatSize}__itemHasChildrenPathChanged(e,r){!r&&e==="children"||this.requestContentUpdate()}_getItem(e,r){r.index=e;const{item:i}=this._dataProviderController.getFlatIndexContext(e);i?(this.__updateLoading(r,!1),this._updateItem(r,i),this._isExpanded(i)&&this._dataProviderController.ensureFlatIndexHierarchy(e)):(this.__updateLoading(r,!0),this._dataProviderController.ensureFlatIndexLoaded(e))}__updateLoading(e,r){const i=Pe(e);Dr(e,"loading",r),ye(i,"loading-row-cell",r),r&&(this._generateCellClassNames(e),this._generateCellPartNames(e))}getItemId(e){return this.itemIdPath?ai(this.itemIdPath,e):e}_isExpanded(e){return this.__expandedKeys&&this.__expandedKeys.has(this.getItemId(e))}_expandedItemsChanged(){this._dataProviderController.recalculateFlatSize(),this._flatSize=this._dataProviderController.flatSize,this.__updateVisibleRows()}__computeExpandedKeys(e,r){const i=r||[],o=new Set;return i.forEach(s=>{o.add(this.getItemId(s))}),o}expandItem(e){this._isExpanded(e)||(this.expandedItems=[...this.expandedItems,e])}collapseItem(e){this._isExpanded(e)&&(this.expandedItems=this.expandedItems.filter(r=>!this._itemsEqual(r,e)))}_getIndexLevel(e=0){const{level:r}=this._dataProviderController.getFlatIndexContext(e);return r}_loadPage(e,r){console.warn("<vaadin-grid> The `_loadPage` method is deprecated and will be removed in Vaadin 25."),this._dataProviderController.__loadCachePage(r,e)}_onDataProviderPageRequested(){this._setLoading(!0)}_onDataProviderPageReceived(){this._flatSize!==this._dataProviderController.flatSize&&(this._shouldUpdateAllRenderedRowsAfterPageLoad=!0,this._flatSize=this._dataProviderController.flatSize),this._getRenderedRows().forEach(e=>{this._dataProviderController.ensureFlatIndexHierarchy(e.index)}),this._hasData=!0}_onDataProviderPageLoaded(){this._debouncerApplyCachedData=D.debounce(this._debouncerApplyCachedData,Z.after(0),()=>{this._setLoading(!1);const e=this._shouldUpdateAllRenderedRowsAfterPageLoad;this._shouldUpdateAllRenderedRowsAfterPageLoad=!1,this._getRenderedRows().forEach(r=>{const{item:i}=this._dataProviderController.getFlatIndexContext(r.index);(i||e)&&this._getItem(r.index,r)}),this.__scrollToPendingIndexes(),this.__dispatchPendingBodyCellFocus()}),this._dataProviderController.isLoading()||this._debouncerApplyCachedData.flush()}__debounceClearCache(){this.__clearCacheDebouncer=D.debounce(this.__clearCacheDebouncer,fe,()=>this.clearCache())}clearCache(){this._dataProviderController.clearCache(),this._dataProviderController.rootCache.size=this.size||0,this._dataProviderController.recalculateFlatSize(),this._hasData=!1,this.__updateVisibleRows(),(!this.__virtualizer||!this.__virtualizer.size)&&this._dataProviderController.loadFirstPage()}_pageSizeChanged(e,r){this._dataProviderController.setPageSize(e),r!==void 0&&e!==r&&this.clearCache()}_checkSize(){this.size===void 0&&this._flatSize===0&&console.warn("The <vaadin-grid> needs the total number of items in order to display rows, which you can specify either by setting the `size` property, or by providing it to the second argument of the `dataProvider` function `callback` call.")}_dataProviderChanged(e,r){this._dataProviderController.setDataProvider(e?e.bind(this):null),r!==void 0&&this.clearCache(),this._ensureFirstPageLoaded(),this._debouncerCheckSize=D.debounce(this._debouncerCheckSize,Z.after(2e3),this._checkSize.bind(this))}_ensureFirstPageLoaded(){this._hasData||this._dataProviderController.loadFirstPage()}_itemsEqual(e,r){return this.getItemId(e)===this.getItemId(r)}_getItemIndexInArray(e,r){let i=-1;return r.forEach((o,s)=>{this._itemsEqual(o,e)&&(i=s)}),i}scrollToIndex(...e){if(!this.__virtualizer||!this.clientHeight||!this._columnTree){this.__pendingScrollToIndexes=e;return}let r;for(;r!==(r=this._dataProviderController.getFlatIndexByPath(e));)this._scrollToFlatIndex(r);this._dataProviderController.isLoading()&&(this.__pendingScrollToIndexes=e)}__scrollToPendingIndexes(){if(this.__pendingScrollToIndexes&&this.$.items.children.length){const e=this.__pendingScrollToIndexes;delete this.__pendingScrollToIndexes,this.scrollToIndex(...e)}}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const We={BETWEEN:"between",ON_TOP_OR_BETWEEN:"on-top-or-between",ON_GRID:"on-grid"},pe={ON_TOP:"on-top",ABOVE:"above",BELOW:"below",EMPTY:"empty"},Ma=n=>class extends n{static get properties(){return{dropMode:{type:String,sync:!0},rowsDraggable:{type:Boolean,sync:!0},dragFilter:{type:Function,sync:!0},dropFilter:{type:Function,sync:!0},__dndAutoScrollThreshold:{value:50},__draggedItems:{value:()=>[]}}}static get observers(){return["_dragDropAccessChanged(rowsDraggable, dropMode, dragFilter, dropFilter, loading)"]}constructor(){super(),this.__onDocumentDragStart=this.__onDocumentDragStart.bind(this)}ready(){super.ready(),this.$.table.addEventListener("dragstart",this._onDragStart.bind(this)),this.$.table.addEventListener("dragend",this._onDragEnd.bind(this)),this.$.table.addEventListener("dragover",this._onDragOver.bind(this)),this.$.table.addEventListener("dragleave",this._onDragLeave.bind(this)),this.$.table.addEventListener("drop",this._onDrop.bind(this)),this.$.table.addEventListener("dragenter",e=>{this.dropMode&&(e.preventDefault(),e.stopPropagation())})}connectedCallback(){super.connectedCallback(),document.addEventListener("dragstart",this.__onDocumentDragStart,{capture:!0})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("dragstart",this.__onDocumentDragStart,{capture:!0})}_onDragStart(e){if(this.rowsDraggable){let r=e.target;if(r.localName==="vaadin-grid-cell-content"&&(r=r.assignedSlot.parentNode.parentNode),r.parentNode!==this.$.items)return;if(e.stopPropagation(),this.toggleAttribute("dragging-rows",!0),this._safari){const a=r.style.transform;r.style.top=/translateY\((.*)\)/u.exec(a)[1],r.style.transform="none",requestAnimationFrame(()=>{r.style.top="",r.style.transform=a})}const i=r.getBoundingClientRect();e.dataTransfer.setDragImage(r,e.clientX-i.left,e.clientY-i.top);let o=[r];this._isSelected(r._item)&&(o=this.__getViewportRows().filter(a=>this._isSelected(a._item)).filter(a=>!this.dragFilter||this.dragFilter(this.__getRowModel(a)))),this.__draggedItems=o.map(a=>a._item),e.dataTransfer.setData("text",this.__formatDefaultTransferData(o)),$e(r,{dragstart:o.length>1?`${o.length}`:""}),this.style.setProperty("--_grid-drag-start-x",`${e.clientX-i.left+20}px`),this.style.setProperty("--_grid-drag-start-y",`${e.clientY-i.top+10}px`),requestAnimationFrame(()=>{$e(r,{dragstart:!1}),this.style.setProperty("--_grid-drag-start-x",""),this.style.setProperty("--_grid-drag-start-y",""),this.requestContentUpdate()});const s=new CustomEvent("grid-dragstart",{detail:{draggedItems:[...this.__draggedItems],setDragData:(a,l)=>e.dataTransfer.setData(a,l),setDraggedItemsCount:a=>r.setAttribute("dragstart",a)}});s.originalEvent=e,this.dispatchEvent(s)}}_onDragEnd(e){this.toggleAttribute("dragging-rows",!1),e.stopPropagation();const r=new CustomEvent("grid-dragend");r.originalEvent=e,this.dispatchEvent(r),this.__draggedItems=[],this.requestContentUpdate()}_onDragLeave(e){this.dropMode&&(e.stopPropagation(),this._clearDragStyles())}_onDragOver(e){if(this.dropMode){if(this._dropLocation=void 0,this._dragOverItem=void 0,this.__dndAutoScroll(e.clientY)){this._clearDragStyles();return}let r=e.composedPath().find(i=>i.localName==="tr");if(!this._flatSize||this.dropMode===We.ON_GRID)this._dropLocation=pe.EMPTY;else if(!r||r.parentNode!==this.$.items){if(r)return;if(this.dropMode===We.BETWEEN||this.dropMode===We.ON_TOP_OR_BETWEEN)r=Array.from(this.$.items.children).filter(i=>!i.hidden).pop(),this._dropLocation=pe.BELOW;else return}else{const i=r.getBoundingClientRect();if(this._dropLocation=pe.ON_TOP,this.dropMode===We.BETWEEN){const o=e.clientY-i.top<i.bottom-e.clientY;this._dropLocation=o?pe.ABOVE:pe.BELOW}else this.dropMode===We.ON_TOP_OR_BETWEEN&&(e.clientY-i.top<i.height/3?this._dropLocation=pe.ABOVE:e.clientY-i.top>i.height/3*2&&(this._dropLocation=pe.BELOW))}if(r&&r.hasAttribute("drop-disabled")){this._dropLocation=void 0;return}e.stopPropagation(),e.preventDefault(),this._dropLocation===pe.EMPTY?this.toggleAttribute("dragover",!0):r?(this._dragOverItem=r._item,r.getAttribute("dragover")!==this._dropLocation&&Di(r,{dragover:this._dropLocation})):this._clearDragStyles()}}__onDocumentDragStart(e){if(e.target.contains(this)){const r=[e.target,this.$.items,this.$.scroller],i=r.map(o=>o.style.cssText);this.$.table.scrollHeight>2e4&&(this.$.scroller.style.display="none"),Oo&&(e.target.style.willChange="transform"),li&&(this.$.items.style.flexShrink=1),requestAnimationFrame(()=>{r.forEach((o,s)=>{o.style.cssText=i[s]})})}}__dndAutoScroll(e){if(this.__dndAutoScrolling)return!0;const r=this.$.header.getBoundingClientRect().bottom,i=this.$.footer.getBoundingClientRect().top,o=r-e+this.__dndAutoScrollThreshold,s=e-i+this.__dndAutoScrollThreshold;let a=0;if(s>0?a=s*2:o>0&&(a=-o*2),a){const l=this.$.table.scrollTop;if(this.$.table.scrollTop+=a,l!==this.$.table.scrollTop)return this.__dndAutoScrolling=!0,setTimeout(()=>{this.__dndAutoScrolling=!1},20),!0}}__getViewportRows(){const e=this.$.header.getBoundingClientRect().bottom,r=this.$.footer.getBoundingClientRect().top;return Array.from(this.$.items.children).filter(i=>{const o=i.getBoundingClientRect();return o.bottom>e&&o.top<r})}_clearDragStyles(){this.removeAttribute("dragover"),te(this.$.items,e=>{Di(e,{dragover:null})})}__updateDragSourceParts(e,r){$e(e,{"drag-source":this.__draggedItems.includes(r.item)})}_onDrop(e){if(this.dropMode&&this._dropLocation){e.stopPropagation(),e.preventDefault();const r=e.dataTransfer.types&&Array.from(e.dataTransfer.types).map(o=>({type:o,data:e.dataTransfer.getData(o)}));this._clearDragStyles();const i=new CustomEvent("grid-drop",{bubbles:e.bubbles,cancelable:e.cancelable,detail:{dropTargetItem:this._dragOverItem,dropLocation:this._dropLocation,dragData:r}});i.originalEvent=e,this.dispatchEvent(i)}}__formatDefaultTransferData(e){return e.map(r=>Array.from(r.children).filter(i=>!i.hidden&&i.getAttribute("part").indexOf("details-cell")===-1).sort((i,o)=>i._column._order>o._column._order?1:-1).map(i=>i._content.textContent.trim()).filter(i=>i).join("	")).join(`
`)}_dragDropAccessChanged(){this.filterDragAndDrop()}filterDragAndDrop(){te(this.$.items,e=>{e.hidden||this._filterDragAndDrop(e,this.__getRowModel(e))})}_filterDragAndDrop(e,r){const i=this.loading||e.hasAttribute("loading"),o=!this.rowsDraggable||i||this.dragFilter&&!this.dragFilter(r),s=!this.dropMode||i||this.dropFilter&&!this.dropFilter(r);Ne(e,a=>{o?a._content.removeAttribute("draggable"):a._content.setAttribute("draggable",!0)}),$e(e,{"drag-disabled":!!o,"drop-disabled":!!s})}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function ts(n,t){if(!n||!t||n.length!==t.length)return!1;for(let e=0,r=n.length;e<r;e++)if(n[e]instanceof Array&&t[e]instanceof Array){if(!ts(n[e],t[e]))return!1}else if(n[e]!==t[e])return!1;return!0}const za=n=>class extends n{static get properties(){return{_columnTree:{type:Object,sync:!0}}}ready(){super.ready(),this._addNodeObserver()}_hasColumnGroups(e){return e.some(r=>r.localName==="vaadin-grid-column-group")}_getChildColumns(e){return be.getColumns(e)}_flattenColumnGroups(e){return e.map(r=>r.localName==="vaadin-grid-column-group"?this._getChildColumns(r):[r]).reduce((r,i)=>r.concat(i),[])}_getColumnTree(){const e=be.getColumns(this),r=[e];let i=e;for(;this._hasColumnGroups(i);)i=this._flattenColumnGroups(i),r.push(i);return r}_debounceUpdateColumnTree(){this.__updateColumnTreeDebouncer=D.debounce(this.__updateColumnTreeDebouncer,fe,()=>this._updateColumnTree())}_updateColumnTree(){const e=this._getColumnTree();ts(e,this._columnTree)||(this._columnTree=e)}_addNodeObserver(){this._observer=new be(this,(e,r)=>{const i=r.flatMap(s=>s._allCells),o=s=>i.filter(a=>a&&a._content.contains(s)).length;this.__removeSorters(this._sorters.filter(o)),this.__removeFilters(this._filters.filter(o)),this._debounceUpdateColumnTree(),this._debouncerCheckImports=D.debounce(this._debouncerCheckImports,Z.after(2e3),this._checkImports.bind(this)),this._ensureFirstPageLoaded()})}_checkImports(){["vaadin-grid-column-group","vaadin-grid-filter","vaadin-grid-filter-column","vaadin-grid-tree-toggle","vaadin-grid-selection-column","vaadin-grid-sort-column","vaadin-grid-sorter"].forEach(e=>{this.querySelector(e)&&!customElements.get(e)&&console.warn(`Make sure you have imported the required module for <${e}> element.`)})}_updateFirstAndLastColumn(){Array.from(this.shadowRoot.querySelectorAll("tr")).forEach(e=>this._updateFirstAndLastColumnForRow(e))}_updateFirstAndLastColumnForRow(e){Array.from(e.querySelectorAll('[part~="cell"]:not([part~="details-cell"])')).sort((r,i)=>r._column._order-i._column._order).forEach((r,i,o)=>{Oe(r,"first-column",i===0),Oe(r,"last-column",i===o.length-1)})}_isColumnElement(e){return e.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(e.localName)}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Fa=n=>class extends n{getEventContext(e){const r={},{cell:i}=this._getGridEventLocation(e);return i&&(r.section=["body","header","footer","details"].find(o=>i.getAttribute("part").indexOf(o)>-1),i._column&&(r.column=i._column),(r.section==="body"||r.section==="details")&&Object.assign(r,this.__getRowModel(i.parentElement))),r}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const La=n=>class extends n{static get properties(){return{_filters:{type:Array,value:()=>[]}}}constructor(){super(),this._filterChanged=this._filterChanged.bind(this),this.addEventListener("filter-changed",this._filterChanged)}_filterChanged(e){e.stopPropagation(),this.__addFilter(e.target),this.__applyFilters()}__removeFilters(e){e.length!==0&&(this._filters=this._filters.filter(r=>e.indexOf(r)<0),this.__applyFilters())}__addFilter(e){this._filters.indexOf(e)===-1&&this._filters.push(e)}__applyFilters(){this.dataProvider&&this.isAttached&&this.clearCache()}_mapFilters(){return this._filters.map(e=>({path:e.path,value:e.value}))}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function tt(n){return n instanceof HTMLTableRowElement}function rt(n){return n instanceof HTMLTableCellElement}function xe(n){return n.matches('[part~="details-cell"]')}const Na=n=>class extends n{static get properties(){return{_headerFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_itemsFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_footerFocusable:{type:Object,observer:"_focusableChanged",sync:!0},_navigatingIsHidden:Boolean,_focusedItemIndex:{type:Number,value:0},_focusedColumnOrder:Number,_focusedCell:{type:Object,observer:"_focusedCellChanged",sync:!0},interacting:{type:Boolean,value:!1,reflectToAttribute:!0,readOnly:!0,observer:"_interactingChanged"}}}get __rowFocusMode(){return[this._headerFocusable,this._itemsFocusable,this._footerFocusable].some(tt)}set __rowFocusMode(e){["_itemsFocusable","_footerFocusable","_headerFocusable"].forEach(r=>{const i=this[r];if(e){const o=i&&i.parentElement;rt(i)?this[r]=o:rt(o)&&(this[r]=o.parentElement)}else if(!e&&tt(i)){const o=i.firstElementChild;this[r]=o._focusButton||o}})}get _visibleItemsCount(){return this._lastVisibleIndex-this._firstVisibleIndex-1}ready(){super.ready(),!(this._ios||this._android)&&(this.addEventListener("keydown",this._onKeyDown),this.addEventListener("keyup",this._onKeyUp),this.addEventListener("focusin",this._onFocusIn),this.addEventListener("focusout",this._onFocusOut),this.$.table.addEventListener("focusin",this._onContentFocusIn.bind(this)),this.addEventListener("mousedown",()=>{this.toggleAttribute("navigating",!1),this._isMousedown=!0,this._focusedColumnOrder=void 0}),this.addEventListener("mouseup",()=>{this._isMousedown=!1}))}_focusableChanged(e,r){r&&r.setAttribute("tabindex","-1"),e&&this._updateGridSectionFocusTarget(e)}_focusedCellChanged(e,r){r&&si(r,"part","focused-cell"),e&&Pr(e,"part","focused-cell")}_interactingChanged(){this._updateGridSectionFocusTarget(this._headerFocusable),this._updateGridSectionFocusTarget(this._itemsFocusable),this._updateGridSectionFocusTarget(this._footerFocusable)}__updateItemsFocusable(){if(!this._itemsFocusable)return;const e=this.shadowRoot.activeElement===this._itemsFocusable;this._getRenderedRows().forEach(r=>{if(r.index===this._focusedItemIndex)if(this.__rowFocusMode)this._itemsFocusable=r;else{let i=this._itemsFocusable.parentElement,o=this._itemsFocusable;if(i){rt(i)&&(o=i,i=i.parentElement);const s=[...i.children].indexOf(o);this._itemsFocusable=this.__getFocusable(r,r.children[s])}}}),e&&this._itemsFocusable.focus()}_onKeyDown(e){const r=e.key;let i;switch(r){case"ArrowUp":case"ArrowDown":case"ArrowLeft":case"ArrowRight":case"PageUp":case"PageDown":case"Home":case"End":i="Navigation";break;case"Enter":case"Escape":case"F2":i="Interaction";break;case"Tab":i="Tab";break;case" ":i="Space";break}this._detectInteracting(e),this.interacting&&i!=="Interaction"&&(i=void 0),i&&this[`_on${i}KeyDown`](e,r)}__ensureFlatIndexInViewport(e){const r=[...this.$.items.children].find(i=>i.index===e);r?this.__scrollIntoViewport(r):this._scrollToFlatIndex(e)}__isRowExpandable(e){if(this.itemHasChildrenPath){const r=e._item;return!!(r&&ai(this.itemHasChildrenPath,r)&&!this._isExpanded(r))}}__isRowCollapsible(e){return this._isExpanded(e._item)}_onNavigationKeyDown(e,r){e.preventDefault();const i=this.__isRTL,o=e.composedPath().find(tt),s=e.composedPath().find(rt);let a=0,l=0;switch(r){case"ArrowRight":a=i?-1:1;break;case"ArrowLeft":a=i?1:-1;break;case"Home":this.__rowFocusMode||e.ctrlKey?l=-1/0:a=-1/0;break;case"End":this.__rowFocusMode||e.ctrlKey?l=1/0:a=1/0;break;case"ArrowDown":l=1;break;case"ArrowUp":l=-1;break;case"PageDown":if(this.$.items.contains(o)){const p=this.__getIndexInGroup(o,this._focusedItemIndex);this._scrollToFlatIndex(p)}l=this._visibleItemsCount;break;case"PageUp":l=-this._visibleItemsCount;break}if(this.__rowFocusMode&&!o||!this.__rowFocusMode&&!s)return;const u=i?"ArrowLeft":"ArrowRight",f=i?"ArrowRight":"ArrowLeft";if(r===u){if(this.__rowFocusMode){if(this.__isRowExpandable(o)){this.expandItem(o._item);return}this.__rowFocusMode=!1,this._onCellNavigation(o.firstElementChild,0,0);return}}else if(r===f)if(this.__rowFocusMode){if(this.__isRowCollapsible(o)){this.collapseItem(o._item);return}}else{const p=[...o.children].sort((m,g)=>m._order-g._order);if(s===p[0]||xe(s)){this.__rowFocusMode=!0,this._onRowNavigation(o,0);return}}this.__rowFocusMode?this._onRowNavigation(o,l):this._onCellNavigation(s,a,l)}_onRowNavigation(e,r){const{dstRow:i}=this.__navigateRows(r,e);i&&i.focus()}__getIndexInGroup(e,r){const i=e.parentNode;return i===this.$.items?r!==void 0?r:e.index:[...i.children].indexOf(e)}__navigateRows(e,r,i){const o=this.__getIndexInGroup(r,this._focusedItemIndex),s=r.parentNode,a=(s===this.$.items?this._flatSize:s.children.length)-1;let l=Math.max(0,Math.min(o+e,a));if(s!==this.$.items){if(l>o)for(;l<a&&s.children[l].hidden;)l+=1;else if(l<o)for(;l>0&&s.children[l].hidden;)l-=1;return this.toggleAttribute("navigating",!0),{dstRow:s.children[l]}}let u=!1;if(i){const f=xe(i);if(s===this.$.items){const p=r._item,{item:m}=this._dataProviderController.getFlatIndexContext(l);f?u=e===0:u=e===1&&this._isDetailsOpened(p)||e===-1&&l!==o&&this._isDetailsOpened(m),u!==f&&(e===1&&u||e===-1&&!u)&&(l=o)}}return this.__ensureFlatIndexInViewport(l),this._focusedItemIndex=l,this.toggleAttribute("navigating",!0),{dstRow:[...s.children].find(f=>!f.hidden&&f.index===l),dstIsRowDetails:u}}_onCellNavigation(e,r,i){const o=e.parentNode,{dstRow:s,dstIsRowDetails:a}=this.__navigateRows(i,o,e);if(!s)return;let l=[...o.children].indexOf(e);this.$.items.contains(e)&&(l=[...this.$.sizer.children].findIndex(m=>m._column===e._column));const u=xe(e),f=o.parentNode,p=this.__getIndexInGroup(o,this._focusedItemIndex);if(this._focusedColumnOrder===void 0&&(u?this._focusedColumnOrder=0:this._focusedColumnOrder=this._getColumns(f,p).filter(m=>!m.hidden)[l]._order),a)[...s.children].find(xe).focus();else{const m=this.__getIndexInGroup(s,this._focusedItemIndex),g=this._getColumns(f,m).filter($=>!$.hidden),b=g.map($=>$._order).sort(($,Y)=>$-Y),w=b.length-1,C=b.indexOf(b.slice(0).sort(($,Y)=>Math.abs($-this._focusedColumnOrder)-Math.abs(Y-this._focusedColumnOrder))[0]),I=i===0&&u?C:Math.max(0,Math.min(C+r,w));I!==C&&(this._focusedColumnOrder=void 0);const K=g.reduce(($,Y,ae)=>($[Y._order]=ae,$),{})[b[I]];let j;if(this.$.items.contains(e)){const $=this.$.sizer.children[K];this._lazyColumns&&(this.__isColumnInViewport($._column)||$.scrollIntoView(),this.__updateColumnsBodyContentHidden(),this.__updateHorizontalScrollPosition()),j=[...s.children].find(Y=>Y._column===$._column),this._scrollHorizontallyToCell(j)}else j=s.children[K],this._scrollHorizontallyToCell(j);j.focus()}}_onInteractionKeyDown(e,r){const i=e.composedPath()[0],o=i.localName==="input"&&!/^(button|checkbox|color|file|image|radio|range|reset|submit)$/iu.test(i.type);let s;switch(r){case"Enter":s=this.interacting?!o:!0;break;case"Escape":s=!1;break;case"F2":s=!this.interacting;break}const{cell:a}=this._getGridEventLocation(e);if(this.interacting!==s&&a!==null)if(s){const l=a._content.querySelector("[focus-target]")||[...a._content.querySelectorAll("*")].find(u=>this._isFocusable(u));l&&(e.preventDefault(),l.focus(),this._setInteracting(!0),this.toggleAttribute("navigating",!1))}else e.preventDefault(),this._focusedColumnOrder=void 0,a.focus(),this._setInteracting(!1),this.toggleAttribute("navigating",!0);r==="Escape"&&this._hideTooltip(!0)}_predictFocusStepTarget(e,r){const i=[this.$.table,this._headerFocusable,this.__emptyState?this.$.emptystatecell:this._itemsFocusable,this._footerFocusable,this.$.focusexit];let o=i.indexOf(e);for(o+=r;o>=0&&o<=i.length-1;){let a=i[o];if(a&&!this.__rowFocusMode&&(a=i[o].parentNode),!a||a.hidden)o+=r;else break}let s=i[o];if(s&&!this.__isHorizontallyInViewport(s)){const a=this._getColumnsInOrder().find(l=>this.__isColumnInViewport(l));if(a)if(s===this._headerFocusable)s=a._headerCell;else if(s===this._itemsFocusable){const l=s._column._cells.indexOf(s);s=a._cells[l]}else s===this._footerFocusable&&(s=a._footerCell)}return s}_onTabKeyDown(e){let r=this._predictFocusStepTarget(e.composedPath()[0],e.shiftKey?-1:1);r&&(e.stopPropagation(),r===this._itemsFocusable&&(this.__ensureFlatIndexInViewport(this._focusedItemIndex),this.__updateItemsFocusable(),r=this._itemsFocusable),r.focus(),r!==this.$.table&&r!==this.$.focusexit&&e.preventDefault(),this.toggleAttribute("navigating",!0))}_onSpaceKeyDown(e){e.preventDefault();const r=e.composedPath()[0],i=tt(r);(i||!r._content||!r._content.firstElementChild)&&this.dispatchEvent(new CustomEvent(i?"row-activate":"cell-activate",{detail:{model:this.__getRowModel(i?r:r.parentElement)}}))}_onKeyUp(e){if(!/^( |SpaceBar)$/u.test(e.key)||this.interacting)return;e.preventDefault();const r=e.composedPath()[0];if(r._content&&r._content.firstElementChild){const i=this.hasAttribute("navigating");r._content.firstElementChild.dispatchEvent(new MouseEvent("click",{shiftKey:e.shiftKey,bubbles:!0,composed:!0,cancelable:!0})),this.toggleAttribute("navigating",i)}}_onFocusIn(e){this._isMousedown||this.toggleAttribute("navigating",!0);const r=e.composedPath()[0];r===this.$.table||r===this.$.focusexit?(this._isMousedown||this._predictFocusStepTarget(r,r===this.$.table?1:-1).focus(),this._setInteracting(!1)):this._detectInteracting(e)}_onFocusOut(e){this.toggleAttribute("navigating",!1),this._detectInteracting(e),this._hideTooltip(),this._focusedCell=null}_onContentFocusIn(e){const{section:r,cell:i,row:o}=this._getGridEventLocation(e);if(!(!i&&!this.__rowFocusMode)&&(this._detectInteracting(e),r&&(i||o)))if(this._activeRowGroup=r,r===this.$.header?this._headerFocusable=this.__getFocusable(o,i):r===this.$.items?(this._itemsFocusable=this.__getFocusable(o,i),this._focusedItemIndex=o.index):r===this.$.footer&&(this._footerFocusable=this.__getFocusable(o,i)),i){const s=this.getEventContext(e);this.__pendingBodyCellFocus=this.loading&&s.section==="body",!this.__pendingBodyCellFocus&&i!==this.$.emptystatecell&&i.dispatchEvent(new CustomEvent("cell-focus",{bubbles:!0,composed:!0,detail:{context:s}})),this._focusedCell=i._focusButton||i,Ze()&&e.target===i&&this._showTooltip(e)}else this._focusedCell=null}__dispatchPendingBodyCellFocus(){this.__pendingBodyCellFocus&&this.shadowRoot.activeElement===this._itemsFocusable&&this._itemsFocusable.dispatchEvent(new Event("focusin",{bubbles:!0,composed:!0}))}__getFocusable(e,r){return this.__rowFocusMode?e:r._focusButton||r}_detectInteracting(e){const r=e.composedPath().some(i=>i.localName==="slot"&&this.shadowRoot.contains(i));this._setInteracting(r),this.__updateHorizontalScrollPosition()}_updateGridSectionFocusTarget(e){if(!e)return;const r=this._getGridSectionFromFocusTarget(e),i=this.interacting&&r===this._activeRowGroup;e.tabIndex=i?-1:0}_preventScrollerRotatingCellFocus(){this._activeRowGroup===this.$.items&&(this.__preventScrollerRotatingCellFocusDebouncer=D.debounce(this.__preventScrollerRotatingCellFocusDebouncer,se,()=>{const e=this._activeRowGroup===this.$.items;this._getRenderedRows().some(i=>i.index===this._focusedItemIndex)?(this.__updateItemsFocusable(),e&&!this.__rowFocusMode&&(this._focusedCell=this._itemsFocusable),this._navigatingIsHidden&&(this.toggleAttribute("navigating",!0),this._navigatingIsHidden=!1)):e&&(this._focusedCell=null,this.hasAttribute("navigating")&&(this._navigatingIsHidden=!0,this.toggleAttribute("navigating",!1)))}))}_getColumns(e,r){let i=this._columnTree.length-1;return e===this.$.header?i=r:e===this.$.footer&&(i=this._columnTree.length-1-r),this._columnTree[i]}__isValidFocusable(e){return this.$.table.contains(e)&&e.offsetHeight}_resetKeyboardNavigation(){if(["header","footer"].forEach(e=>{if(!this.__isValidFocusable(this[`_${e}Focusable`])){const r=[...this.$[e].children].find(o=>o.offsetHeight),i=r?[...r.children].find(o=>!o.hidden):null;r&&i&&(this[`_${e}Focusable`]=this.__getFocusable(r,i))}}),!this.__isValidFocusable(this._itemsFocusable)&&this.$.items.firstElementChild){const e=this.__getFirstVisibleItem(),r=e?[...e.children].find(i=>!i.hidden):null;r&&e&&(this._focusedColumnOrder=void 0,this._itemsFocusable=this.__getFocusable(e,r))}else this.__updateItemsFocusable()}_scrollHorizontallyToCell(e){if(e.hasAttribute("frozen")||e.hasAttribute("frozen-to-end")||xe(e))return;const r=e.getBoundingClientRect(),i=e.parentNode,o=Array.from(i.children).indexOf(e),s=this.$.table.getBoundingClientRect();let a=s.left,l=s.right;for(let u=o-1;u>=0;u--){const f=i.children[u];if(!(f.hasAttribute("hidden")||xe(f))&&(f.hasAttribute("frozen")||f.hasAttribute("frozen-to-end"))){a=f.getBoundingClientRect().right;break}}for(let u=o+1;u<i.children.length;u++){const f=i.children[u];if(!(f.hasAttribute("hidden")||xe(f))&&(f.hasAttribute("frozen")||f.hasAttribute("frozen-to-end"))){l=f.getBoundingClientRect().left;break}}r.left<a&&(this.$.table.scrollLeft+=Math.round(r.left-a)),r.right>l&&(this.$.table.scrollLeft+=Math.round(r.right-l))}_getGridEventLocation(e){const r=e.__composedPath||e.composedPath(),i=r.indexOf(this.$.table),o=i>=1?r[i-1]:null,s=i>=2?r[i-2]:null,a=i>=3?r[i-3]:null;return{section:o,row:s,cell:a}}_getGridSectionFromFocusTarget(e){return e===this._headerFocusable?this.$.header:e===this._itemsFocusable?this.$.items:e===this._footerFocusable?this.$.footer:null}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ha=n=>class extends n{static get properties(){return{detailsOpenedItems:{type:Array,value:()=>[],sync:!0},rowDetailsRenderer:{type:Function,sync:!0},_detailsCells:{type:Array}}}static get observers(){return["_detailsOpenedItemsChanged(detailsOpenedItems, rowDetailsRenderer)","_rowDetailsRendererChanged(rowDetailsRenderer)"]}ready(){super.ready(),this._detailsCellResizeObserver=new ResizeObserver(e=>{e.forEach(({target:r})=>{this._updateDetailsCellHeight(r.parentElement)}),this.__virtualizer.__adapter._resizeHandler()})}_rowDetailsRendererChanged(e){e&&this._columnTree&&te(this.$.items,r=>{if(!r.querySelector("[part~=details-cell]")){this._updateRow(r,this._columnTree[this._columnTree.length-1]);const i=this._isDetailsOpened(r._item);this._toggleDetailsCell(r,i)}})}_detailsOpenedItemsChanged(e,r){te(this.$.items,i=>{if(i.hasAttribute("details-opened")){this._updateItem(i,i._item);return}r&&this._isDetailsOpened(i._item)&&this._updateItem(i,i._item)})}_configureDetailsCell(e){e.setAttribute("part","cell details-cell"),e.toggleAttribute("frozen",!0),this._detailsCellResizeObserver.observe(e)}_toggleDetailsCell(e,r){const i=e.querySelector('[part~="details-cell"]');i&&(i.hidden=!r,!i.hidden&&this.rowDetailsRenderer&&(i._renderer=this.rowDetailsRenderer))}_updateDetailsCellHeight(e){const r=e.querySelector('[part~="details-cell"]');r&&(this.__updateDetailsRowPadding(e,r),requestAnimationFrame(()=>this.__updateDetailsRowPadding(e,r)))}__updateDetailsRowPadding(e,r){r.hidden?e.style.removeProperty("padding-bottom"):e.style.setProperty("padding-bottom",`${r.offsetHeight}px`)}_updateDetailsCellHeights(){te(this.$.items,e=>{this._updateDetailsCellHeight(e)})}_isDetailsOpened(e){return this.detailsOpenedItems&&this._getItemIndexInArray(e,this.detailsOpenedItems)!==-1}openItemDetails(e){this._isDetailsOpened(e)||(this.detailsOpenedItems=[...this.detailsOpenedItems,e])}closeItemDetails(e){this._isDetailsOpened(e)&&(this.detailsOpenedItems=this.detailsOpenedItems.filter(r=>!this._itemsEqual(r,e)))}};/**
 * @license
 * Copyright (c) 2022 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const oe=document.createElement("div");oe.style.position="fixed";oe.style.clip="rect(0px, 0px, 0px, 0px)";oe.setAttribute("aria-live","polite");document.body.appendChild(oe);let nt;function Ba(n,t={}){const e=t.mode||"polite",r=t.timeout===void 0?150:t.timeout;e==="alert"?(oe.removeAttribute("aria-live"),oe.removeAttribute("role"),nt=D.debounce(nt,se,()=>{oe.setAttribute("role","alert")})):(nt&&nt.cancel(),oe.removeAttribute("role"),oe.setAttribute("aria-live",e)),oe.textContent="",setTimeout(()=>{oe.textContent=n},r)}/**
 * @license
 * Copyright (c) 2023 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const zr=new Map;function mi(n){return zr.has(n)||zr.set(n,new WeakMap),zr.get(n)}function rs(n,t){n&&n.removeAttribute(t)}function ns(n,t){if(!n||!t)return;const e=mi(t);if(e.has(n))return;const r=Us(n.getAttribute(t));e.set(n,new Set(r))}function Va(n,t){if(!n||!t)return;const e=mi(t),r=e.get(n);!r||r.size===0?n.removeAttribute(t):Pr(n,t,Io(r)),e.delete(n)}function Fr(n,t,e={newId:null,oldId:null,fromUser:!1}){if(!n||!t)return;const{newId:r,oldId:i,fromUser:o}=e,s=mi(t),a=s.get(n);if(!o&&a){i&&a.delete(i),r&&a.add(r);return}o&&(a?r||s.delete(n):ns(n,t),rs(n,t)),si(n,t,i);const l=r||Io(a);l&&Pr(n,t,l)}function Wa(n,t){ns(n,t),rs(n,t)}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ya{constructor(t){this.host=t,this.__required=!1}setTarget(t){this.__target=t,this.__setAriaRequiredAttribute(this.__required),this.__setLabelIdToAriaAttribute(this.__labelId,this.__labelId),this.__labelIdFromUser!=null&&this.__setLabelIdToAriaAttribute(this.__labelIdFromUser,this.__labelIdFromUser,!0),this.__setErrorIdToAriaAttribute(this.__errorId),this.__setHelperIdToAriaAttribute(this.__helperId),this.setAriaLabel(this.__label)}setRequired(t){this.__setAriaRequiredAttribute(t),this.__required=t}setAriaLabel(t){this.__setAriaLabelToAttribute(t),this.__label=t}setLabelId(t,e=!1){const r=e?this.__labelIdFromUser:this.__labelId;this.__setLabelIdToAriaAttribute(t,r,e),e?this.__labelIdFromUser=t:this.__labelId=t}setErrorId(t){this.__setErrorIdToAriaAttribute(t,this.__errorId),this.__errorId=t}setHelperId(t){this.__setHelperIdToAriaAttribute(t,this.__helperId),this.__helperId=t}__setAriaLabelToAttribute(t){this.__target&&(t?(Wa(this.__target,"aria-labelledby"),this.__target.setAttribute("aria-label",t)):this.__label&&(Va(this.__target,"aria-labelledby"),this.__target.removeAttribute("aria-label")))}__setLabelIdToAriaAttribute(t,e,r){Fr(this.__target,"aria-labelledby",{newId:t,oldId:e,fromUser:r})}__setErrorIdToAriaAttribute(t,e){Fr(this.__target,"aria-describedby",{newId:t,oldId:e,fromUser:!1})}__setHelperIdToAriaAttribute(t,e){Fr(this.__target,"aria-describedby",{newId:t,oldId:e,fromUser:!1})}__setAriaRequiredAttribute(t){this.__target&&(["input","textarea"].includes(this.__target.localName)||(t?this.__target.setAttribute("aria-required","true"):this.__target.removeAttribute("aria-required")))}}/**
 * @license
 * Copyright (c) 2022 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ua=n=>class extends Tr(n){get focused(){return(this._getItems()||[]).find(Po)}get _vertical(){return!0}get _tabNavigation(){return!1}focus(e){const r=this._getFocusableIndex();r>=0&&this._focus(r,e)}_getFocusableIndex(){const e=this._getItems();return Array.isArray(e)?this._getAvailableIndex(e,0,null,r=>!Fe(r)):-1}_getItems(){return Array.from(this.children)}_onKeyDown(e){if(super._onKeyDown(e),e.metaKey||e.ctrlKey)return;const{key:r,shiftKey:i}=e,o=this._getItems()||[],s=o.indexOf(this.focused);let a,l;const f=!this._vertical&&this.getAttribute("dir")==="rtl"?-1:1;this.__isPrevKeyPressed(r,i)?(l=-f,a=s-f):this.__isNextKeyPressed(r,i)?(l=f,a=s+f):r==="Home"?(l=1,a=0):r==="End"&&(l=-1,a=o.length-1),a=this._getAvailableIndex(o,a,l,p=>!Fe(p)),!(this._tabNavigation&&r==="Tab"&&(a>s&&e.shiftKey||a<s&&!e.shiftKey||a===s))&&a>=0&&(e.preventDefault(),this._focus(a,{focusVisible:!0},!0))}__isPrevKeyPressed(e,r){return this._vertical?e==="ArrowUp":e==="ArrowLeft"||this._tabNavigation&&e==="Tab"&&r}__isNextKeyPressed(e,r){return this._vertical?e==="ArrowDown":e==="ArrowRight"||this._tabNavigation&&e==="Tab"&&!r}_focus(e,r,i=!1){const o=this._getItems();this._focusItem(o[e],r,i)}_focusItem(e,r){e&&e.focus(r)}_getAvailableIndex(e,r,i,o){const s=e.length;let a=r;for(let l=0;typeof a=="number"&&l<s;l+=1,a+=i||1){a<0?a=s-1:a>=s&&(a=0);const u=e[a];if(this._isItemFocusable(u)&&this.__isMatchingItem(u,o))return a}return-1}__isMatchingItem(e,r){return typeof r=="function"?r(e):!0}_isItemFocusable(e){return!e.hasAttribute("disabled")}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function Wr(n,t){const{scrollLeft:e}=n;return t!=="rtl"?e:n.scrollWidth-n.clientWidth+e}function qa(n,t,e){t!=="rtl"?n.scrollLeft=e:n.scrollLeft=n.clientWidth-n.scrollWidth+e}/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ja=n=>class extends Ua(n){static get properties(){return{disabled:{type:Boolean,value:!1,reflectToAttribute:!0},selected:{type:Number,reflectToAttribute:!0,notify:!0,sync:!0},orientation:{type:String,reflectToAttribute:!0,value:""},items:{type:Array,readOnly:!0,notify:!0},_searchBuf:{type:String,value:""}}}static get observers(){return["_enhanceItems(items, orientation, selected, disabled)"]}get _isRTL(){return!this._vertical&&this.getAttribute("dir")==="rtl"}get _scrollerElement(){return console.warn(`Please implement the '_scrollerElement' property in <${this.localName}>`),this}get _vertical(){return this.orientation!=="horizontal"}focus(e){this._observer&&this._observer.flush();const r=Array.isArray(this.items)?this.items:[],i=this._getAvailableIndex(r,0,null,o=>o.tabIndex===0&&!Fe(o));i>=0?this._focus(i,e):super.focus(e)}ready(){super.ready(),this.addEventListener("click",r=>this._onClick(r));const e=this.shadowRoot.querySelector("slot:not([name])");this._observer=new Qe(e,()=>{this._setItems(this._filterItems([...this.children]))})}_getItems(){return this.items}_enhanceItems(e,r,i,o){if(!o&&e){this.setAttribute("aria-orientation",r||"vertical"),e.forEach(a=>{r?a.setAttribute("orientation",r):a.removeAttribute("orientation")}),this._setFocusable(i<0||!i?0:i);const s=e[i];e.forEach(a=>{a.selected=a===s}),s&&!s.disabled&&this._scrollToItem(i)}}_filterItems(e){return e.filter(r=>r._hasVaadinItemMixin)}_onClick(e){if(e.metaKey||e.shiftKey||e.ctrlKey||e.defaultPrevented)return;const r=this._filterItems(e.composedPath())[0];let i;r&&!r.disabled&&(i=this.items.indexOf(r))>=0&&(this.selected=i)}_searchKey(e,r){this._searchReset=D.debounce(this._searchReset,Z.after(500),()=>{this._searchBuf=""}),this._searchBuf+=r.toLowerCase(),this.items.some(o=>this.__isMatchingKey(o))||(this._searchBuf=r.toLowerCase());const i=this._searchBuf.length===1?e+1:e;return this._getAvailableIndex(this.items,i,1,o=>this.__isMatchingKey(o)&&getComputedStyle(o).display!=="none")}__isMatchingKey(e){return e.textContent.replace(/[^\p{L}\p{Nd}]/gu,"").toLowerCase().startsWith(this._searchBuf)}_onKeyDown(e){if(e.metaKey||e.ctrlKey)return;const r=e.key,i=this.items.indexOf(this.focused);if(/[\p{L}\p{Nd}]/u.test(r)&&r.length===1){const o=this._searchKey(i,r);o>=0&&this._focus(o);return}super._onKeyDown(e)}_setFocusable(e){e=this._getAvailableIndex(this.items,e,1);const r=this.items[e];this.items.forEach(i=>{i.tabIndex=i===r?0:-1})}_focus(e,r){this.items.forEach((i,o)=>{i.focused=o===e}),this._setFocusable(e),this._scrollToItem(e),super._focus(e,r)}_scrollToItem(e){const r=this.items[e];if(!r)return;const i=this._vertical?["top","bottom"]:this._isRTL?["right","left"]:["left","right"],o=this._scrollerElement.getBoundingClientRect(),s=(this.items[e+1]||r).getBoundingClientRect(),a=(this.items[e-1]||r).getBoundingClientRect();let l=0;!this._isRTL&&s[i[1]]>=o[i[1]]||this._isRTL&&s[i[1]]<=o[i[1]]?l=s[i[1]]-o[i[1]]:(!this._isRTL&&a[i[0]]<=o[i[0]]||this._isRTL&&a[i[0]]>=o[i[0]])&&(l=a[i[0]]-o[i[0]]),this._scroll(l)}_scroll(e){if(this._vertical)this._scrollerElement.scrollTop+=e;else{const r=this.getAttribute("dir")||"ltr",i=Wr(this._scrollerElement,r)+e;qa(this._scrollerElement,r,i)}}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const zi={SCROLLING:500,UPDATE_CONTENT_VISIBILITY:100},Ga=n=>class extends qs(n){static get properties(){return{columnRendering:{type:String,value:"eager",sync:!0},_frozenCells:{type:Array,value:()=>[]},_frozenToEndCells:{type:Array,value:()=>[]}}}static get observers(){return["__columnRenderingChanged(_columnTree, columnRendering)"]}get _scrollLeft(){return this.$.table.scrollLeft}get _scrollTop(){return this.$.table.scrollTop}set _scrollTop(e){this.$.table.scrollTop=e}get _lazyColumns(){return this.columnRendering==="lazy"}ready(){super.ready(),this.scrollTarget=this.$.table,this.$.items.addEventListener("focusin",e=>{const r=e.composedPath(),i=r[r.indexOf(this.$.items)-1];if(i){if(!this._isMousedown){const o=this.$.table.clientHeight,s=this.$.header.clientHeight,a=this.$.footer.clientHeight,l=o-s-a,f=i.clientHeight>l?e.target:i;this.__scrollIntoViewport(f)}this.$.table.contains(e.relatedTarget)||this.$.table.dispatchEvent(new CustomEvent("virtualizer-element-focused",{detail:{element:i}}))}}),this.$.table.addEventListener("scroll",()=>this._afterScroll())}_onResize(){if(this._updateOverflow(),this.__updateHorizontalScrollPosition(),this._firefox){const e=!Fe(this);e&&this.__previousVisible===!1&&(this._scrollTop=this.__memorizedScrollTop||0),this.__previousVisible=e}}_scrollToFlatIndex(e){e=Math.min(this._flatSize-1,Math.max(0,e)),this.__virtualizer.scrollToIndex(e);const r=[...this.$.items.children].find(i=>i.index===e);this.__scrollIntoViewport(r)}__scrollIntoViewport(e){if(!e)return;const r=e.getBoundingClientRect(),i=this.$.footer.getBoundingClientRect().top,o=this.$.header.getBoundingClientRect().bottom;r.bottom>i?this.$.table.scrollTop+=r.bottom-i:r.top<o&&(this.$.table.scrollTop-=o-r.top)}_scheduleScrolling(){this._scrollingFrame||(this._scrollingFrame=requestAnimationFrame(()=>this.$.scroller.toggleAttribute("scrolling",!0))),this._debounceScrolling=D.debounce(this._debounceScrolling,Z.after(zi.SCROLLING),()=>{cancelAnimationFrame(this._scrollingFrame),delete this._scrollingFrame,this.$.scroller.toggleAttribute("scrolling",!1)})}_afterScroll(){this.__updateHorizontalScrollPosition(),this.hasAttribute("reordering")||this._scheduleScrolling(),this.hasAttribute("navigating")||this._hideTooltip(!0),this._updateOverflow(),this._debounceColumnContentVisibility=D.debounce(this._debounceColumnContentVisibility,Z.after(zi.UPDATE_CONTENT_VISIBILITY),()=>{this._lazyColumns&&this.__cachedScrollLeft!==this._scrollLeft&&(this.__cachedScrollLeft=this._scrollLeft,this.__updateColumnsBodyContentHidden())}),this._firefox&&!Fe(this)&&this.__previousVisible!==!1&&(this.__memorizedScrollTop=this._scrollTop)}__updateColumnsBodyContentHidden(){if(!this._columnTree||!this._areSizerCellsAssigned())return;const e=this._getColumnsInOrder();let r=!1;if(e.forEach(i=>{const o=this._lazyColumns&&!this.__isColumnInViewport(i);i._bodyContentHidden!==o&&(r=!0,i._cells.forEach(s=>{if(s!==i._sizerCell){if(o)s.remove();else if(s.__parentRow){const a=[...s.__parentRow.children].find(l=>e.indexOf(l._column)>e.indexOf(i));s.__parentRow.insertBefore(s,a)}}})),i._bodyContentHidden=o}),r&&this._frozenCellsChanged(),this._lazyColumns){const i=[...e].reverse().find(a=>a.frozen),o=this.__getColumnEnd(i),s=e.find(a=>!a.frozen&&!a._bodyContentHidden);this.__lazyColumnsStart=this.__getColumnStart(s)-o,this.$.items.style.setProperty("--_grid-lazy-columns-start",`${this.__lazyColumnsStart}px`),this._resetKeyboardNavigation()}}__getColumnEnd(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?0:e._sizerCell.offsetWidth):this.__isRTL?this.$.table.clientWidth:0}__getColumnStart(e){return e?e._sizerCell.offsetLeft+(this.__isRTL?e._sizerCell.offsetWidth:0):this.__isRTL?this.$.table.clientWidth:0}__isColumnInViewport(e){return e.frozen||e.frozenToEnd?!0:this.__isHorizontallyInViewport(e._sizerCell)}__isHorizontallyInViewport(e){return e.offsetLeft+e.offsetWidth>=this._scrollLeft&&e.offsetLeft<=this._scrollLeft+this.clientWidth}__columnRenderingChanged(e,r){r==="eager"?this.$.scroller.removeAttribute("column-rendering"):this.$.scroller.setAttribute("column-rendering",r),this.__updateColumnsBodyContentHidden()}_updateOverflow(){this._debounceOverflow=D.debounce(this._debounceOverflow,se,()=>{this.__doUpdateOverflow()})}__doUpdateOverflow(){let e="";const r=this.$.table;r.scrollTop<r.scrollHeight-r.clientHeight&&(e+=" bottom"),r.scrollTop>0&&(e+=" top");const i=Wr(r,this.getAttribute("dir"));i>0&&(e+=" start"),i<r.scrollWidth-r.clientWidth&&(e+=" end"),this.__isRTL&&(e=e.replace(/start|end/giu,s=>s==="start"?"end":"start")),r.scrollLeft<r.scrollWidth-r.clientWidth&&(e+=" right"),r.scrollLeft>0&&(e+=" left");const o=e.trim();o.length>0&&this.getAttribute("overflow")!==o?this.setAttribute("overflow",o):o.length===0&&this.hasAttribute("overflow")&&this.removeAttribute("overflow")}_frozenCellsChanged(){this._debouncerCacheElements=D.debounce(this._debouncerCacheElements,fe,()=>{Array.from(this.shadowRoot.querySelectorAll('[part~="cell"]')).forEach(e=>{e.style.transform=""}),this._frozenCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen]")),this._frozenToEndCells=Array.prototype.slice.call(this.$.table.querySelectorAll("[frozen-to-end]")),this.__updateHorizontalScrollPosition()}),this._debounceUpdateFrozenColumn()}_debounceUpdateFrozenColumn(){this.__debounceUpdateFrozenColumn=D.debounce(this.__debounceUpdateFrozenColumn,fe,()=>this._updateFrozenColumn())}_updateFrozenColumn(){if(!this._columnTree)return;const e=this._columnTree[this._columnTree.length-1].slice(0);e.sort((o,s)=>o._order-s._order);let r,i;for(let o=0;o<e.length;o++){const s=e[o];s._lastFrozen=!1,s._firstFrozenToEnd=!1,i===void 0&&s.frozenToEnd&&!s.hidden&&(i=o),s.frozen&&!s.hidden&&(r=o)}r!==void 0&&(e[r]._lastFrozen=!0),i!==void 0&&(e[i]._firstFrozenToEnd=!0),this.__updateColumnsBodyContentHidden()}__updateHorizontalScrollPosition(){if(!this._columnTree)return;const e=this.$.table.scrollWidth,r=this.$.table.clientWidth,i=Math.max(0,this.$.table.scrollLeft),o=Wr(this.$.table,this.getAttribute("dir")),s=`translate(${-i}px, 0)`;this.$.header.style.transform=s,this.$.footer.style.transform=s,this.$.items.style.transform=s;const a=this.__isRTL?o+r-e:i,l=`translate(${a}px, 0)`;this._frozenCells.forEach(m=>{m.style.transform=l});const u=this.__isRTL?o:i+r-e,f=`translate(${u}px, 0)`;let p=f;if(this._lazyColumns&&this._areSizerCellsAssigned()){const m=this._getColumnsInOrder(),g=[...m].reverse().find(M=>!M.frozenToEnd&&!M._bodyContentHidden),b=this.__getColumnEnd(g),w=m.find(M=>M.frozenToEnd),C=this.__getColumnStart(w);p=`translate(${u+(C-b)+this.__lazyColumnsStart}px, 0)`}this._frozenToEndCells.forEach(m=>{this.$.items.contains(m)?m.style.transform=p:m.style.transform=f}),this.hasAttribute("navigating")&&this.__rowFocusMode&&this.$.table.style.setProperty("--_grid-horizontal-scroll-position",`${-a}px`)}_areSizerCellsAssigned(){return this._getColumnsInOrder().every(e=>e._sizerCell)}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ka=n=>class extends n{static get properties(){return{selectedItems:{type:Object,notify:!0,value:()=>[],sync:!0},isItemSelectable:{type:Function,notify:!0},__selectedKeys:{type:Object,computed:"__computeSelectedKeys(itemIdPath, selectedItems)"}}}static get observers(){return["__selectedItemsChanged(itemIdPath, selectedItems, isItemSelectable)"]}_isSelected(e){return this.__selectedKeys.has(this.getItemId(e))}__isItemSelectable(e){return!this.isItemSelectable||!e?!0:this.isItemSelectable(e)}selectItem(e){this._isSelected(e)||(this.selectedItems=[...this.selectedItems,e])}deselectItem(e){this._isSelected(e)&&(this.selectedItems=this.selectedItems.filter(r=>!this._itemsEqual(r,e)))}__selectedItemsChanged(){this.requestContentUpdate()}__computeSelectedKeys(e,r){const i=r||[],o=new Set;return i.forEach(s=>{o.add(this.getItemId(s))}),o}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */let Fi="prepend";const Qa=n=>class extends n{static get properties(){return{multiSort:{type:Boolean,value:!1},multiSortPriority:{type:String,value:()=>Fi},multiSortOnShiftClick:{type:Boolean,value:!1},_sorters:{type:Array,value:()=>[]},_previousSorters:{type:Array,value:()=>[]}}}static setDefaultMultiSortPriority(e){Fi=["append","prepend"].includes(e)?e:"prepend"}ready(){super.ready(),this.addEventListener("sorter-changed",this._onSorterChanged)}_onSorterChanged(e){const r=e.target;e.stopPropagation(),r._grid=this,this.__updateSorter(r,e.detail.shiftClick,e.detail.fromSorterClick),this.__applySorters()}__removeSorters(e){e.length!==0&&(this._sorters=this._sorters.filter(r=>!e.includes(r)),this.__applySorters())}__updateSortOrders(){this._sorters.forEach(r=>{r._order=null});const e=this._getActiveSorters();e.length>1&&e.forEach((r,i)=>{r._order=i})}__updateSorter(e,r,i){if(!e.direction&&!this._sorters.includes(e))return;e._order=null;const o=this._sorters.filter(s=>s!==e);this.multiSort&&(!this.multiSortOnShiftClick||!i)||this.multiSortOnShiftClick&&r?this.multiSortPriority==="append"?this._sorters=[...o,e]:this._sorters=[e,...o]:(e.direction||this.multiSortOnShiftClick)&&(this._sorters=e.direction?[e]:[],o.forEach(s=>{s._order=null,s.direction=null}))}__applySorters(){this.__updateSortOrders(),this.dataProvider&&this.isAttached&&JSON.stringify(this._previousSorters)!==JSON.stringify(this._mapSorters())&&this.__debounceClearCache(),this._a11yUpdateSorters(),this._previousSorters=this._mapSorters()}_getActiveSorters(){return this._sorters.filter(e=>e.direction&&e.isConnected)}_mapSorters(){return this._getActiveSorters().map(e=>({path:e.path,direction:e.direction}))}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Xa=n=>class extends n{static get properties(){return{cellClassNameGenerator:{type:Function,sync:!0},cellPartNameGenerator:{type:Function,sync:!0}}}static get observers(){return["__cellClassNameGeneratorChanged(cellClassNameGenerator)","__cellPartNameGeneratorChanged(cellPartNameGenerator)"]}__cellClassNameGeneratorChanged(){this.generateCellClassNames()}__cellPartNameGeneratorChanged(){this.generateCellPartNames()}generateCellClassNames(){te(this.$.items,e=>{e.hidden||this._generateCellClassNames(e,this.__getRowModel(e))})}generateCellPartNames(){te(this.$.items,e=>{e.hidden||this._generateCellPartNames(e,this.__getRowModel(e))})}_generateCellClassNames(e,r){Ne(e,i=>{if(i.__generatedClasses&&i.__generatedClasses.forEach(o=>i.classList.remove(o)),this.cellClassNameGenerator&&!e.hasAttribute("loading")){const o=this.cellClassNameGenerator(i._column,r);i.__generatedClasses=o&&o.split(" ").filter(s=>s.length>0),i.__generatedClasses&&i.__generatedClasses.forEach(s=>i.classList.add(s))}})}_generateCellPartNames(e,r){Ne(e,i=>{if(i.__generatedParts&&i.__generatedParts.forEach(o=>{ve(i,null,o)}),this.cellPartNameGenerator&&!e.hasAttribute("loading")){const o=this.cellPartNameGenerator(i._column,r);i.__generatedParts=o&&o.split(" ").filter(s=>s.length>0),i.__generatedParts&&i.__generatedParts.forEach(s=>{ve(i,!0,s)})}})}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Za=n=>class extends Aa(Ta($a(za(Oa(Ga(Ka(Qa(Ha(Na(Sa(La(Da(ka(Fa(Ma(Xa(js(n)))))))))))))))))){static get observers(){return["_columnTreeChanged(_columnTree)","_flatSizeChanged(_flatSize, __virtualizer, _hasData, _columnTree)"]}static get properties(){return{_safari:{type:Boolean,value:li},_ios:{type:Boolean,value:Le},_firefox:{type:Boolean,value:Eo},_android:{type:Boolean,value:Br},_touchDevice:{type:Boolean,value:Er},allRowsVisible:{type:Boolean,value:!1,reflectToAttribute:!0},isAttached:{value:!1},__gridElement:{type:Boolean,value:!0},__hasEmptyStateContent:{type:Boolean,value:!1},__emptyState:{type:Boolean,computed:"__computeEmptyState(_flatSize, __hasEmptyStateContent)"}}}constructor(){super(),this.addEventListener("animationend",this._onAnimationEnd)}get _firstVisibleIndex(){const t=this.__getFirstVisibleItem();return t?t.index:void 0}get _lastVisibleIndex(){const t=this.__getLastVisibleItem();return t?t.index:void 0}connectedCallback(){super.connectedCallback(),this.isAttached=!0,this.__virtualizer.hostConnected()}disconnectedCallback(){super.disconnectedCallback(),this.isAttached=!1,this._hideTooltip(!0)}__getFirstVisibleItem(){return this._getRenderedRows().find(t=>this._isInViewport(t))}__getLastVisibleItem(){return this._getRenderedRows().reverse().find(t=>this._isInViewport(t))}_isInViewport(t){const e=this.$.table.getBoundingClientRect(),r=t.getBoundingClientRect(),i=this.$.header.getBoundingClientRect().height,o=this.$.footer.getBoundingClientRect().height;return r.bottom>e.top+i&&r.top<e.bottom-o}_getRenderedRows(){return Array.from(this.$.items.children).filter(t=>!t.hidden).sort((t,e)=>t.index-e.index)}_getRowContainingNode(t){const e=To("vaadin-grid-cell-content",t);return e?e.assignedSlot.parentElement.parentElement:void 0}_isItemAssignedToRow(t,e){const r=this.__getRowModel(e);return this.getItemId(t)===this.getItemId(r.item)}ready(){super.ready(),this.__virtualizer=new xa({createElements:this._createScrollerRows.bind(this),updateElement:this._updateScrollerItem.bind(this),scrollContainer:this.$.items,scrollTarget:this.$.table,reorderElements:!0}),new ResizeObserver(()=>{setTimeout(()=>{this.__updateColumnsBodyContentHidden()}),this.__updateHorizontalScrollPosition()}).observe(this.$.table);const t=new ResizeObserver(()=>setTimeout(()=>{this.__updateMinHeight()}));t.observe(this.$.header),t.observe(this.$.items),t.observe(this.$.footer),Ar(this),this._tooltipController=new ui(this),this.addController(this._tooltipController),this._tooltipController.setManual(!0),this.__emptyStateContentObserver=new Qe(this.$.emptystateslot,({currentNodes:e})=>{this.$.emptystatecell._content=e[0],this.__hasEmptyStateContent=!!this.$.emptystatecell._content})}__getBodyCellCoordinates(t){if(this.$.items.contains(t)&&t.localName==="td")return{item:t.parentElement._item,column:t._column}}__focusBodyCell({item:t,column:e}){const r=this._getRenderedRows().find(o=>o._item===t),i=r&&[...r.children].find(o=>o._column===e);i&&i.focus()}_focusFirstVisibleRow(){const t=this.__getFirstVisibleItem();this.__rowFocusMode=!0,t.focus()}_flatSizeChanged(t,e,r,i){if(e&&r&&i){const o=this.shadowRoot.activeElement,s=this.__getBodyCellCoordinates(o),a=e.size||0;e.size=t,e.update(a-1,a-1),t<a&&e.update(t-1,t-1),s&&o.parentElement.hidden&&this.__focusBodyCell(s),this._resetKeyboardNavigation()}}_createScrollerRows(t){const e=[];for(let r=0;r<t;r++){const i=document.createElement("tr");i.setAttribute("part","row body-row"),i.setAttribute("role","row"),i.setAttribute("tabindex","-1"),this._columnTree&&this._updateRow(i,this._columnTree[this._columnTree.length-1],"body",!1,!0),e.push(i)}return this._columnTree&&this._columnTree[this._columnTree.length-1].forEach(r=>{r.isConnected&&r._cells&&(r._cells=[...r._cells])}),this.__afterCreateScrollerRowsDebouncer=D.debounce(this.__afterCreateScrollerRowsDebouncer,se,()=>{this._afterScroll()}),e}_createCell(t,e){const i=`vaadin-grid-cell-content-${this._contentIndex=this._contentIndex+1||0}`,o=document.createElement("vaadin-grid-cell-content");o.setAttribute("slot",i);const s=document.createElement(t);s.id=i.replace("-content-","-"),s.setAttribute("role",t==="td"?"gridcell":"columnheader"),!Br&&!Le&&(s.addEventListener("mouseenter",l=>{this.$.scroller.hasAttribute("scrolling")||this._showTooltip(l)}),s.addEventListener("mouseleave",()=>{this._hideTooltip()}),s.addEventListener("mousedown",()=>{this._hideTooltip(!0)}));const a=document.createElement("slot");if(a.setAttribute("name",i),e&&e._focusButtonMode){const l=document.createElement("div");l.setAttribute("role","button"),l.setAttribute("tabindex","-1"),s.appendChild(l),s._focusButton=l,s.focus=function(u){s._focusButton.focus(u)},l.appendChild(a)}else s.setAttribute("tabindex","-1"),s.appendChild(a);return s._content=o,o.addEventListener("mousedown",()=>{if(Oo){const l=u=>{const f=o.contains(this.getRootNode().activeElement),p=u.composedPath().includes(o);!f&&p&&s.focus({preventScroll:!0}),document.removeEventListener("mouseup",l,!0)};document.addEventListener("mouseup",l,!0)}else setTimeout(()=>{o.contains(this.getRootNode().activeElement)||s.focus({preventScroll:!0})})}),s}_updateRow(t,e,r="body",i=!1,o=!1){const s=document.createDocumentFragment();Ne(t,a=>{a._vacant=!0}),t.innerHTML="",r==="body"&&(t.__cells=[],t.__detailsCell=null),e.filter(a=>!a.hidden).forEach((a,l,u)=>{let f;if(r==="body"){a._cells||(a._cells=[]),f=a._cells.find(m=>m._vacant),f||(f=this._createCell("td",a),a._onCellKeyDown&&f.addEventListener("keydown",a._onCellKeyDown.bind(a)),a._cells.push(f)),f.setAttribute("part","cell body-cell"),f.__parentRow=t,t.__cells.push(f);const p=t===this.$.sizer;if((!a._bodyContentHidden||p)&&t.appendChild(f),p&&(a._sizerCell=f),l===u.length-1&&this.rowDetailsRenderer){this._detailsCells||(this._detailsCells=[]);const m=this._detailsCells.find(g=>g._vacant)||this._createCell("td");this._detailsCells.indexOf(m)===-1&&this._detailsCells.push(m),m._content.parentElement||s.appendChild(m._content),this._configureDetailsCell(m),t.appendChild(m),t.__detailsCell=m,this._a11ySetRowDetailsCell(t,m),m._vacant=!1}o||(a._cells=[...a._cells])}else{const p=r==="header"?"th":"td";i||a.localName==="vaadin-grid-column-group"?(f=a[`_${r}Cell`],f||(f=this._createCell(p),a._onCellKeyDown&&f.addEventListener("keydown",a._onCellKeyDown.bind(a))),f._column=a,t.appendChild(f),a[`_${r}Cell`]=f):(a._emptyCells||(a._emptyCells=[]),f=a._emptyCells.find(m=>m._vacant)||this._createCell(p),f._column=a,t.appendChild(f),a._emptyCells.indexOf(f)===-1&&a._emptyCells.push(f)),f.part.add("cell",`${r}-cell`)}f._content.parentElement||s.appendChild(f._content),f._vacant=!1,f._column=a}),r!=="body"&&this.__debounceUpdateHeaderFooterRowVisibility(t),this.appendChild(s),this._frozenCellsChanged(),this._updateFirstAndLastColumnForRow(t)}__debounceUpdateHeaderFooterRowVisibility(t){t.__debounceUpdateHeaderFooterRowVisibility=D.debounce(t.__debounceUpdateHeaderFooterRowVisibility,fe,()=>this.__updateHeaderFooterRowVisibility(t))}__updateHeaderFooterRowVisibility(t){if(!t)return;const e=Array.from(t.children).filter(r=>{const i=r._column;if(i._emptyCells&&i._emptyCells.indexOf(r)>-1)return!1;if(t.parentElement===this.$.header){if(i.headerRenderer)return!0;if(i.header===null)return!1;if(i.path||i.header!==void 0)return!0}else if(i.footerRenderer)return!0;return!1});t.hidden!==!e.length&&(t.hidden=!e.length),this._resetKeyboardNavigation(),this._a11yUpdateGridSize(this.size,this._columnTree,this.__emptyState)}_updateScrollerItem(t,e){this._preventScrollerRotatingCellFocus(t,e),this._columnTree&&(this._updateRowOrderParts(t,e),this._a11yUpdateRowRowindex(t,e),this._getItem(e,t))}_columnTreeChanged(t){this._renderColumnTree(t),this.__updateColumnsBodyContentHidden()}_updateRowOrderParts(t,e=t.index){$e(t,{first:e===0,last:e===this._flatSize-1,odd:e%2!==0,even:e%2===0})}_updateRowStateParts(t,{item:e,expanded:r,selected:i,detailsOpened:o}){$e(t,{expanded:r,collapsed:this.__isRowExpandable(t),selected:i,nonselectable:this.__isItemSelectable(e)===!1,"details-opened":o})}__computeEmptyState(t,e){return t===0&&e}_renderColumnTree(t){for(te(this.$.items,e=>{this._updateRow(e,t[t.length-1],"body",!1,!0);const r=this.__getRowModel(e);this._updateRowOrderParts(e),this._updateRowStateParts(e,r),this._filterDragAndDrop(e,r)});this.$.header.children.length<t.length;){const e=document.createElement("tr");e.setAttribute("part","row"),e.setAttribute("role","row"),e.setAttribute("tabindex","-1"),this.$.header.appendChild(e);const r=document.createElement("tr");r.setAttribute("part","row"),r.setAttribute("role","row"),r.setAttribute("tabindex","-1"),this.$.footer.appendChild(r)}for(;this.$.header.children.length>t.length;)this.$.header.removeChild(this.$.header.firstElementChild),this.$.footer.removeChild(this.$.footer.firstElementChild);te(this.$.header,(e,r,i)=>{this._updateRow(e,t[r],"header",r===t.length-1);const o=Pe(e);ye(o,"first-header-row-cell",r===0),ye(o,"last-header-row-cell",r===i.length-1)}),te(this.$.footer,(e,r,i)=>{this._updateRow(e,t[t.length-1-r],"footer",r===0);const o=Pe(e);ye(o,"first-footer-row-cell",r===0),ye(o,"last-footer-row-cell",r===i.length-1)}),this._updateRow(this.$.sizer,t[t.length-1]),this._resizeHandler(),this._frozenCellsChanged(),this._updateFirstAndLastColumn(),this._resetKeyboardNavigation(),this._a11yUpdateHeaderRows(),this._a11yUpdateFooterRows(),this.generateCellClassNames(),this.generateCellPartNames(),this.__updateHeaderAndFooter()}_updateItem(t,e){t._item=e;const r=this.__getRowModel(t);this._toggleDetailsCell(t,r.detailsOpened),this._a11yUpdateRowLevel(t,r.level),this._a11yUpdateRowSelected(t,r.selected),this._updateRowStateParts(t,r),this._generateCellClassNames(t,r),this._generateCellPartNames(t,r),this._filterDragAndDrop(t,r),this.__updateDragSourceParts(t,r),te(t,i=>{if(!(i._column&&!i._column.isConnected)&&i._renderer){const o=i._column||this;i._renderer.call(o,i._content,o,r)}}),this._updateDetailsCellHeight(t),this._a11yUpdateRowExpanded(t,r.expanded)}_resizeHandler(){this._updateDetailsCellHeights(),this.__updateHorizontalScrollPosition()}_onAnimationEnd(t){t.animationName.indexOf("vaadin-grid-appear")===0&&(t.stopPropagation(),this._resetKeyboardNavigation(),requestAnimationFrame(()=>{this.__scrollToPendingIndexes()}))}__getRowModel(t){return{index:t.index,item:t._item,level:this._getIndexLevel(t.index),expanded:this._isExpanded(t._item),selected:this._isSelected(t._item),detailsOpened:!!this.rowDetailsRenderer&&this._isDetailsOpened(t._item)}}_showTooltip(t){const e=this._tooltipController.node;if(e&&e.isConnected){const r=t.target;if(!this.__isCellFullyVisible(r))return;this._tooltipController.setTarget(r),this._tooltipController.setContext(this.getEventContext(t)),e._stateController.open({focus:t.type==="focusin",hover:t.type==="mouseenter"})}}__isCellFullyVisible(t){if(t.hasAttribute("frozen")||t.hasAttribute("frozen-to-end"))return!0;let{left:e,right:r}=this.getBoundingClientRect();const i=[...t.parentNode.children].find(a=>a.hasAttribute("last-frozen"));if(i){const a=i.getBoundingClientRect();e=this.__isRTL?e:a.right,r=this.__isRTL?a.left:r}const o=[...t.parentNode.children].find(a=>a.hasAttribute("first-frozen-to-end"));if(o){const a=o.getBoundingClientRect();e=this.__isRTL?a.right:e,r=this.__isRTL?r:a.left}const s=t.getBoundingClientRect();return s.left>=e&&s.right<=r}_hideTooltip(t){const e=this._tooltipController&&this._tooltipController.node;e&&e._stateController.close(t)}requestContentUpdate(){this.__updateHeaderAndFooter(),this.__updateVisibleRows()}__updateHeaderAndFooter(){(this._columnTree||[]).forEach(t=>{t.forEach(e=>{e._renderHeaderAndFooter&&e._renderHeaderAndFooter()})})}__updateVisibleRows(t,e){this.__virtualizer&&this.__virtualizer.update(t,e)}__updateMinHeight(){const e=this.$.header.clientHeight,r=this.$.footer.clientHeight,i=this.$.table.offsetHeight-this.$.table.clientHeight,o=e+36+r+i;!this.__minHeightStyleSheet&&Gs&&(this.__minHeightStyleSheet=new CSSStyleSheet,this.shadowRoot.adoptedStyleSheets=[...this.shadowRoot.adoptedStyleSheets,this.__minHeightStyleSheet]),this.__minHeightStyleSheet?this.__minHeightStyleSheet.replaceSync(`:host { --_grid-min-height: ${o}px; }`):this.style.setProperty("--_grid-min-height",`${o}px`)}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ja=O`
  @keyframes vaadin-grid-appear {
    to {
      opacity: 1;
    }
  }

  :host {
    display: flex;
    flex-direction: column;
    animation: 1ms vaadin-grid-appear;
    height: 400px;
    min-height: var(--_grid-min-height, 0);
    flex: 1 1 auto;
    align-self: stretch;
    position: relative;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  #scroller {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    transform: translateY(0);
    width: auto;
    height: auto;
    position: absolute;
    inset: 0;
  }

  :host([all-rows-visible]) {
    height: auto;
    align-self: flex-start;
    min-height: auto;
    flex-grow: 0;
    width: 100%;
  }

  :host([all-rows-visible]) #scroller {
    width: 100%;
    height: 100%;
    position: relative;
  }

  :host([all-rows-visible]) #items {
    min-height: 1px;
  }

  #table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: auto;
    position: relative;
    outline: none;
    /* Workaround for a Desktop Safari bug: new stacking context here prevents the scrollbar from getting hidden */
    z-index: 0;
  }

  #header,
  #footer {
    display: block;
    position: -webkit-sticky;
    position: sticky;
    left: 0;
    overflow: visible;
    width: 100%;
    z-index: 1;
  }

  #header {
    top: 0;
  }

  th {
    text-align: inherit;
  }

  /* Safari doesn't work with "inherit" */
  [safari] th {
    text-align: initial;
  }

  #footer {
    bottom: 0;
  }

  #items {
    flex-grow: 1;
    flex-shrink: 0;
    display: block;
    position: -webkit-sticky;
    position: sticky;
    width: 100%;
    left: 0;
    overflow: visible;
  }

  [part~='row'] {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    margin: 0;
  }

  [part~='row'][loading] [part~='body-cell'] ::slotted(vaadin-grid-cell-content) {
    visibility: hidden;
  }

  [column-rendering='lazy'] [part~='body-cell']:not([frozen]):not([frozen-to-end]) {
    transform: translateX(var(--_grid-lazy-columns-start));
  }

  #items [part~='row'] {
    position: absolute;
  }

  #items [part~='row']:empty {
    height: 100%;
  }

  [part~='cell']:not([part~='details-cell']) {
    flex-shrink: 0;
    flex-grow: 1;
    box-sizing: border-box;
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
    padding: 0;
    white-space: nowrap;
  }

  [part~='cell'] {
    outline: none;
  }

  [part~='cell'] > [tabindex] {
    display: flex;
    align-items: inherit;
    outline: none;
    position: absolute;
    inset: 0;
  }

  /* Switch the focusButtonMode wrapping element to "position: static" temporarily
     when measuring real width of the cells in the auto-width columns. */
  [measuring-auto-width] [part~='cell'] > [tabindex] {
    position: static;
  }

  [part~='details-cell'] {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
  }

  [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    display: block;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  [hidden] {
    display: none !important;
  }

  [frozen],
  [frozen-to-end] {
    z-index: 2;
    will-change: transform;
  }

  [no-scrollbars][safari] #table,
  [no-scrollbars][firefox] #table {
    overflow: hidden;
  }

  /* Empty state */

  #scroller:not([empty-state]) #emptystatebody,
  #scroller[empty-state] #items {
    display: none;
  }

  #emptystatebody {
    display: flex;
    position: sticky;
    inset: 0;
    flex: 1;
    overflow: hidden;
  }

  #emptystaterow {
    display: flex;
    flex: 1;
  }

  #emptystatecell {
    display: block;
    flex: 1;
    overflow: auto;
  }

  /* Reordering styles */
  :host([reordering]) [part~='cell'] ::slotted(vaadin-grid-cell-content),
  :host([reordering]) [part~='resize-handle'],
  #scroller[no-content-pointer-events] [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    pointer-events: none;
  }

  [part~='reorder-ghost'] {
    visibility: hidden;
    position: fixed;
    pointer-events: none;
    opacity: 0.5;

    /* Prevent overflowing the grid in Firefox */
    top: 0;
    left: 0;
  }

  :host([reordering]) {
    -webkit-user-select: none;
    user-select: none;
  }

  /* Resizing styles */
  [part~='resize-handle'] {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    cursor: col-resize;
    z-index: 1;
  }

  [part~='resize-handle']::before {
    position: absolute;
    content: '';
    height: 100%;
    width: 35px;
    transform: translateX(-50%);
  }

  [last-column] [part~='resize-handle']::before,
  [last-frozen] [part~='resize-handle']::before {
    width: 18px;
    transform: none;
    right: 0;
  }

  [frozen-to-end] [part~='resize-handle'] {
    left: 0;
    right: auto;
  }

  [frozen-to-end] [part~='resize-handle']::before {
    left: 0;
    right: auto;
  }

  [first-frozen-to-end] [part~='resize-handle']::before {
    width: 18px;
    transform: none;
  }

  [first-frozen-to-end] {
    margin-inline-start: auto;
  }

  /* Hide resize handle if scrolled to end */
  :host(:not([overflow~='end'])) [first-frozen-to-end] [part~='resize-handle'] {
    display: none;
  }

  #scroller[column-resizing],
  #scroller[range-selecting] {
    -webkit-user-select: none;
    user-select: none;
  }

  /* Sizer styles */
  #sizer {
    display: flex;
    position: absolute;
    visibility: hidden;
  }

  #sizer [part~='details-cell'] {
    display: none !important;
  }

  #sizer [part~='cell'][hidden] {
    display: none !important;
  }

  #sizer [part~='cell'] {
    display: block;
    flex-shrink: 0;
    line-height: 0;
    height: 0 !important;
    min-height: 0 !important;
    max-height: 0 !important;
    padding: 0 !important;
    border: none !important;
  }

  #sizer [part~='cell']::before {
    content: '-';
  }

  #sizer [part~='cell'] ::slotted(vaadin-grid-cell-content) {
    display: none !important;
  }

  /* RTL specific styles */

  :host([dir='rtl']) #items,
  :host([dir='rtl']) #header,
  :host([dir='rtl']) #footer {
    left: auto;
  }

  :host([dir='rtl']) [part~='reorder-ghost'] {
    left: auto;
    right: 0;
  }

  :host([dir='rtl']) [part~='resize-handle'] {
    left: 0;
    right: auto;
  }

  :host([dir='rtl']) [part~='resize-handle']::before {
    transform: translateX(50%);
  }

  :host([dir='rtl']) [last-column] [part~='resize-handle']::before,
  :host([dir='rtl']) [last-frozen] [part~='resize-handle']::before {
    left: 0;
    right: auto;
  }

  :host([dir='rtl']) [frozen-to-end] [part~='resize-handle'] {
    right: 0;
    left: auto;
  }

  :host([dir='rtl']) [frozen-to-end] [part~='resize-handle']::before {
    right: 0;
    left: auto;
  }

  @media (forced-colors: active) {
    [part~='selected-row'] [part~='first-column-cell']::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      border: 2px solid;
    }

    [part~='focused-cell']::before {
      outline: 2px solid !important;
      outline-offset: -1px;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-grid",Ja,{moduleId:"vaadin-grid-styles"});class Ke extends Za(Te(J(Ae(L)))){static get template(){return G`
      <div
        id="scroller"
        safari$="[[_safari]]"
        ios$="[[_ios]]"
        loading$="[[loading]]"
        column-reordering-allowed$="[[columnReorderingAllowed]]"
        empty-state$="[[__emptyState]]"
      >
        <table id="table" role="treegrid" aria-multiselectable="true" tabindex="0" aria-label$="[[accessibleName]]">
          <caption id="sizer" part="row"></caption>
          <thead id="header" role="rowgroup"></thead>
          <tbody id="items" role="rowgroup"></tbody>
          <tbody id="emptystatebody">
            <tr id="emptystaterow">
              <td part="empty-state" id="emptystatecell" tabindex="0">
                <slot name="empty-state" id="emptystateslot"></slot>
              </td>
            </tr>
          </tbody>
          <tfoot id="footer" role="rowgroup"></tfoot>
        </table>

        <div part="reorder-ghost"></div>
      </div>

      <slot name="tooltip"></slot>

      <div id="focusexit" tabindex="0"></div>
    `}static get is(){return"vaadin-grid"}}W(Ke);T("vaadin-grid-sorter",O`
    :host {
      justify-content: flex-start;
      align-items: baseline;
      -webkit-user-select: none;
      user-select: none;
      cursor: var(--lumo-clickable-cursor);
    }

    [part='content'] {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    [part='indicators'] {
      margin-left: var(--lumo-space-s);
    }

    [part='indicators']::before {
      transform: scale(0.8);
    }

    :host(:not([direction]):not(:hover)) [part='indicators'] {
      color: var(--lumo-tertiary-text-color);
    }

    :host([direction]) {
      color: var(--vaadin-selection-color-text, var(--lumo-primary-text-color));
    }

    [part='order'] {
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
    }

    /* RTL specific styles */

    :host([dir='rtl']) [part='indicators'] {
      margin-right: var(--lumo-space-s);
      margin-left: 0;
    }
  `,{moduleId:"lumo-grid-sorter"});/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const is=document.createElement("template");is.innerHTML=`
  <style>
    @font-face {
      font-family: 'vaadin-grid-sorter-icons';
      src: url(data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAQwAA0AAAAABuwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABGRlRNAAAEFAAAABkAAAAcfep+mUdERUYAAAP4AAAAHAAAAB4AJwAOT1MvMgAAAZgAAAA/AAAAYA8TBPpjbWFwAAAB7AAAAFUAAAFeF1fZ4mdhc3AAAAPwAAAACAAAAAgAAAAQZ2x5ZgAAAlgAAABcAAAAnMvguMloZWFkAAABMAAAAC8AAAA2C5Ap72hoZWEAAAFgAAAAHQAAACQGbQPHaG10eAAAAdgAAAAUAAAAHAoAAABsb2NhAAACRAAAABIAAAASAIwAYG1heHAAAAGAAAAAFgAAACAACwAKbmFtZQAAArQAAAECAAACZxWCgKhwb3N0AAADuAAAADUAAABZCrApUXicY2BkYGAA4rDECVrx/DZfGbhZGEDgyqNPOxH0/wNMq5kPALkcDEwgUQBWRA0dAHicY2BkYGA+8P8AAwMLAwgwrWZgZEAFbABY4QM8AAAAeJxjYGRgYOAAQiYGEICQSAAAAi8AFgAAeJxjYGY6yziBgZWBgWkm0xkGBoZ+CM34msGYkZMBFTAKoAkwODAwvmRiPvD/AIMDMxCD1CDJKjAwAgBktQsXAHicY2GAAMZQCM0EwqshbAALxAEKeJxjYGBgZoBgGQZGBhCIAPIYwXwWBhsgzcXAwcAEhIwMCi+Z/v/9/x+sSuElA4T9/4k4K1gHFwMMMILMY2QDYmaoABOQYGJABUA7WBiGNwAAJd4NIQAAAAAAAAAACAAIABAAGAAmAEAATgAAeJyNjLENgDAMBP9tIURJwQCMQccSZgk2i5fIYBDAidJjycXr7x5EPwE2wY8si7jmyBNXGo/bNBerxJNrpxhbO3/fEFpx8ZICpV+ghxJ74fAMe+h7Ox14AbrsHB14nK2QQWrDMBRER4mTkhQK3ZRQKOgCNk7oGQqhhEIX2WSlWEI1BAlkJ5CDdNsj5Ey9Rncdi38ES+jzNJo/HwTgATcoDEthhY3wBHc4CE+pfwsX5F/hGe7Vo/AcK/UhvMSz+mGXKhZU6pww8ISz3oWn1BvhgnwTnuEJf8Jz1OpFeIlX9YULDLdFi4ASHolkSR0iuYdjLak1vAequBhj21D61Nqyi6l3qWybGPjySbPHGScGJl6dP58MYcQRI0bts7mjebBqrFENH7t3qWtj0OuqHnXcW7b0HOTZFnKryRGW2hFX1m0O2vEM3opNMfTau+CS6Z3Vx6veNnEXY6jwDxhsc2gAAHicY2BiwA84GBgYmRiYGJkZmBlZGFkZ2djScyoLMgzZS/MyDQwMwLSrpYEBlIbxjQDrzgsuAAAAAAEAAf//AA94nGNgZGBg4AFiMSBmYmAEQnYgZgHzGAAD6wA2eJxjYGBgZACCKyoz1cD0o087YTQATOcIewAAAA==) format('woff');
      font-weight: normal;
      font-style: normal;
    }
  </style>
`;document.head.appendChild(is.content);T("vaadin-grid-sorter",O`
    :host {
      display: inline-flex;
      cursor: pointer;
      max-width: 100%;
    }

    [part='content'] {
      flex: 1 1 auto;
    }

    [part='indicators'] {
      position: relative;
      align-self: center;
      flex: none;
    }

    [part='order'] {
      display: inline;
      vertical-align: super;
    }

    [part='indicators']::before {
      font-family: 'vaadin-grid-sorter-icons';
      display: inline-block;
    }

    :host(:not([direction])) [part='indicators']::before {
      content: '\\e901';
    }

    :host([direction='asc']) [part='indicators']::before {
      content: '\\e900';
    }

    :host([direction='desc']) [part='indicators']::before {
      content: '\\e902';
    }
  `,{moduleId:"vaadin-grid-sorter-styles"});const el=n=>class extends n{static get properties(){return{path:String,direction:{type:String,reflectToAttribute:!0,notify:!0,value:null,sync:!0},_order:{type:Number,value:null,sync:!0}}}static get observers(){return["_pathOrDirectionChanged(path, direction)"]}ready(){super.ready(),this.addEventListener("click",this._onClick.bind(this))}connectedCallback(){super.connectedCallback(),this._grid?this._grid.__applySorters():this.__dispatchSorterChangedEvenIfPossible()}disconnectedCallback(){super.disconnectedCallback(),!this.parentNode&&this._grid?this._grid.__removeSorters([this]):this._grid&&this._grid.__applySorters()}_pathOrDirectionChanged(){this.__dispatchSorterChangedEvenIfPossible()}__dispatchSorterChangedEvenIfPossible(){this.path===void 0||this.direction===void 0||!this.isConnected||(this.dispatchEvent(new CustomEvent("sorter-changed",{detail:{shiftClick:!!this._shiftClick,fromSorterClick:!!this._fromSorterClick},bubbles:!0,composed:!0})),this._fromSorterClick=!1,this._shiftClick=!1)}_getDisplayOrder(e){return e===null?"":e+1}_onClick(e){if(e.defaultPrevented)return;const r=this.getRootNode().activeElement;this!==r&&this.contains(r)||(e.preventDefault(),this._shiftClick=e.shiftKey,this._fromSorterClick=!0,this.direction==="asc"?this.direction="desc":this.direction==="desc"?this.direction=null:this.direction="asc")}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class tl extends el(J(we(L))){static get template(){return G`
      <div part="content">
        <slot></slot>
      </div>
      <div part="indicators">
        <span part="order">[[_getDisplayOrder(_order)]]</span>
      </div>
    `}static get is(){return"vaadin-grid-sorter"}}W(tl);T("vaadin-checkbox",O`
    :host {
      color: var(--vaadin-checkbox-label-color, var(--lumo-body-text-color));
      font-size: var(--vaadin-checkbox-label-font-size, var(--lumo-font-size-m));
      font-family: var(--lumo-font-family);
      line-height: var(--lumo-line-height-s);
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      cursor: default;
      outline: none;
      --_checkbox-size: var(--vaadin-checkbox-size, calc(var(--lumo-size-m) / 2));
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      --_selection-color: var(--vaadin-selection-color, var(--lumo-primary-color));
      --_invalid-background: var(--vaadin-input-field-invalid-background, var(--lumo-error-color-10pct));
      --_disabled-checkmark-color: var(--vaadin-checkbox-disabled-checkmark-color, var(--lumo-contrast-30pct));
    }

    [part='label'] {
      display: flex;
      position: relative;
      max-width: max-content;
    }

    :host([has-label]) ::slotted(label) {
      padding: var(
        --vaadin-checkbox-label-padding,
        var(--lumo-space-xs) var(--lumo-space-s) var(--lumo-space-xs) var(--lumo-space-xs)
      );
    }

    :host([dir='rtl'][has-label]) ::slotted(label) {
      padding: var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-xs) var(--lumo-space-s);
    }

    :host([has-label][required]) ::slotted(label) {
      padding-inline-end: var(--lumo-space-m);
    }

    [part='checkbox'] {
      width: var(--_checkbox-size);
      height: var(--_checkbox-size);
      margin: var(--lumo-space-xs);
      position: relative;
      border-radius: var(--vaadin-checkbox-border-radius, var(--lumo-border-radius-s));
      background: var(--vaadin-checkbox-background, var(--lumo-contrast-20pct));
      transition:
        transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
        background-color 0.15s;
      cursor: var(--lumo-clickable-cursor);
      /* Default field border color */
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
    }

    :host([indeterminate]),
    :host([checked]) {
      --vaadin-input-field-border-color: transparent;
    }

    :host([indeterminate]) [part='checkbox'],
    :host([checked]) [part='checkbox'] {
      background-color: var(--_selection-color);
    }

    /* Checkmark */
    [part='checkbox']::after {
      pointer-events: none;
      font-family: 'lumo-icons';
      content: var(--vaadin-checkbox-checkmark-char, var(--lumo-icons-checkmark));
      color: var(--vaadin-checkbox-checkmark-color, var(--lumo-primary-contrast-color));
      font-size: var(--vaadin-checkbox-checkmark-size, calc(var(--_checkbox-size) + 2px));
      line-height: 1;
      position: absolute;
      top: -1px;
      left: -1px;
      contain: content;
      opacity: 0;
    }

    :host([checked]) [part='checkbox']::after {
      opacity: 1;
    }

    :host([readonly]:not([checked]):not([indeterminate])) {
      color: var(--lumo-secondary-text-color);
    }

    :host([readonly]:not([checked]):not([indeterminate])) [part='checkbox'] {
      background: transparent;
      box-shadow: none;
    }

    :host([readonly]:not([checked]):not([indeterminate])) [part='checkbox']::after {
      content: '';
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      top: 0;
      left: 0;
      opacity: 1;
      border: var(--vaadin-input-field-readonly-border, 1px dashed var(--lumo-contrast-50pct));
    }

    /* Indeterminate checkmark */
    :host([indeterminate]) [part='checkbox']::after {
      content: var(--vaadin-checkbox-checkmark-char-indeterminate, '');
      opacity: 1;
      top: 45%;
      height: 10%;
      left: 22%;
      right: 22%;
      width: auto;
      border: 0;
      background-color: var(--lumo-primary-contrast-color);
    }

    /* Focus ring */
    :host([focus-ring]) [part='checkbox'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color),
        inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
    }

    :host([focus-ring][readonly]:not([checked]):not([indeterminate])) [part='checkbox'] {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color);
    }

    /* Disabled */
    :host([disabled]) {
      pointer-events: none;
      --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
    }

    :host([disabled]) ::slotted(label) {
      color: inherit;
    }

    :host([disabled]) [part='checkbox'] {
      background-color: var(--vaadin-checkbox-disabled-background, var(--lumo-contrast-10pct));
    }

    :host([disabled]) [part='checkbox']::after {
      color: var(--_disabled-checkmark-color);
    }

    :host([disabled]) [part='label'],
    :host([disabled]) [part='helper-text'] {
      color: var(--lumo-disabled-text-color);
      -webkit-text-fill-color: var(--lumo-disabled-text-color);
    }

    :host([indeterminate][disabled]) [part='checkbox']::after {
      background-color: var(--_disabled-checkmark-color);
    }

    :host([readonly][checked]:not([disabled])) [part='checkbox'],
    :host([readonly][indeterminate]:not([disabled])) [part='checkbox'] {
      background-color: var(--vaadin-checkbox-readonly-checked-background, var(--lumo-contrast-70pct));
    }

    /* Used for activation "halo" */
    [part='checkbox']::before {
      pointer-events: none;
      color: transparent;
      width: 100%;
      height: 100%;
      line-height: var(--_checkbox-size);
      border-radius: inherit;
      background-color: inherit;
      transform: scale(1.4);
      opacity: 0;
      transition:
        transform 0.1s,
        opacity 0.8s;
    }

    /* Hover */
    :host(:not([checked]):not([indeterminate]):not([disabled]):not([readonly]):not([invalid]):hover) [part='checkbox'] {
      background: var(--vaadin-checkbox-background-hover, var(--lumo-contrast-30pct));
    }

    /* Disable hover for touch devices */
    @media (pointer: coarse) {
      /* prettier-ignore */
      :host(:not([checked]):not([indeterminate]):not([disabled]):not([readonly]):not([invalid]):hover) [part='checkbox'] {
        background: var(--vaadin-checkbox-background, var(--lumo-contrast-20pct));
      }
    }

    /* Active */
    :host([active]) [part='checkbox'] {
      transform: scale(0.9);
      transition-duration: 0.05s;
    }

    :host([active][checked]) [part='checkbox'] {
      transform: scale(1.1);
    }

    :host([active]:not([checked])) [part='checkbox']::before {
      transition-duration: 0.01s, 0.01s;
      transform: scale(0);
      opacity: 0.4;
    }

    /* Required */
    :host([required]) [part='required-indicator'] {
      position: absolute;
      top: var(--lumo-space-xs);
      right: var(--lumo-space-xs);
    }

    :host([required][dir='rtl']) [part='required-indicator'] {
      right: auto;
      left: var(--lumo-space-xs);
    }

    :host([required]) [part='required-indicator']::after {
      content: var(--lumo-required-field-indicator, '\\2022');
      transition: opacity 0.2s;
      color: var(--lumo-required-field-indicator-color, var(--lumo-primary-text-color));
      width: 1em;
      text-align: center;
    }

    :host(:not([has-label])) [part='required-indicator'] {
      display: none;
    }

    /* Invalid */
    :host([invalid]) {
      --vaadin-input-field-border-color: var(--lumo-error-color);
    }

    :host([invalid]) [part='checkbox'] {
      background: var(--_invalid-background);
      background-image: linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%);
    }

    :host([invalid]:hover) [part='checkbox'] {
      background-image: linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%),
        linear-gradient(var(--_invalid-background) 0%, var(--_invalid-background) 100%);
    }

    :host([invalid][focus-ring]) {
      --_focus-ring-color: var(--lumo-error-color-50pct);
    }

    :host([invalid]) [part='required-indicator']::after {
      color: var(--lumo-required-field-indicator-color, var(--lumo-error-text-color));
    }

    /* Error message */
    [part='error-message'] {
      font-size: var(--vaadin-input-field-error-font-size, var(--lumo-font-size-xs));
      line-height: var(--lumo-line-height-xs);
      font-weight: var(--vaadin-input-field-error-font-weight, 400);
      color: var(--vaadin-input-field-error-color, var(--lumo-error-text-color));
      will-change: max-height;
      transition: 0.4s max-height;
      max-height: 5em;
      padding-inline-start: var(--lumo-space-xs);
    }

    :host([has-error-message]) [part='error-message']::after,
    :host([has-helper]) [part='helper-text']::after {
      content: '';
      display: block;
      height: 0.4em;
    }

    :host(:not([invalid])) [part='error-message'] {
      max-height: 0;
      overflow: hidden;
    }

    /* Helper */
    [part='helper-text'] {
      display: block;
      color: var(--vaadin-input-field-helper-color, var(--lumo-secondary-text-color));
      font-size: var(--vaadin-input-field-helper-font-size, var(--lumo-font-size-xs));
      line-height: var(--lumo-line-height-xs);
      font-weight: var(--vaadin-input-field-helper-font-weight, 400);
      margin-left: calc(var(--lumo-border-radius-m) / 4);
      transition: color 0.2s;
      padding-inline-start: var(--lumo-space-xs);
    }

    :host(:hover:not([readonly])) [part='helper-text'] {
      color: var(--lumo-body-text-color);
    }

    :host([has-error-message]) ::slotted(label),
    :host([has-helper]) ::slotted(label) {
      padding-bottom: 0;
    }
  `,{moduleId:"lumo-checkbox"});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const gi=et(n=>class extends n{static get properties(){return{inputElement:{type:Object,readOnly:!0,observer:"_inputElementChanged",sync:!0},type:{type:String,readOnly:!0},value:{type:String,value:"",observer:"_valueChanged",notify:!0,sync:!0}}}constructor(){super(),this._boundOnInput=this._onInput.bind(this),this._boundOnChange=this._onChange.bind(this)}get _hasValue(){return this.value!=null&&this.value!==""}get _inputElementValueProperty(){return"value"}get _inputElementValue(){return this.inputElement?this.inputElement[this._inputElementValueProperty]:void 0}set _inputElementValue(e){this.inputElement&&(this.inputElement[this._inputElementValueProperty]=e)}clear(){this.value="",this._inputElementValue=""}_addInputListeners(e){e.addEventListener("input",this._boundOnInput),e.addEventListener("change",this._boundOnChange)}_removeInputListeners(e){e.removeEventListener("input",this._boundOnInput),e.removeEventListener("change",this._boundOnChange)}_forwardInputValue(e){this.inputElement&&(this._inputElementValue=e??"")}_inputElementChanged(e,r){e?this._addInputListeners(e):r&&this._removeInputListeners(r)}_onInput(e){const r=e.composedPath()[0];this.__userInput=e.isTrusted,this.value=r.value,this.__userInput=!1}_onChange(e){}_toggleHasValue(e){this.toggleAttribute("has-value",e)}_valueChanged(e,r){this._toggleHasValue(this._hasValue),!(e===""&&r===void 0)&&(this.__userInput||this._forwardInputValue(e))}});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const rl=et(n=>class extends Ao(Ks(gi(n))){static get properties(){return{checked:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0,sync:!0}}}static get delegateProps(){return[...super.delegateProps,"checked"]}_onChange(e){const r=e.target;this._toggleChecked(r.checked)}_toggleChecked(e){this.checked=e}});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class nl extends di{constructor(t){super(t,"error-message","div")}setErrorMessage(t){this.errorMessage=t,this.updateDefaultNode(this.node)}setInvalid(t){this.invalid=t,this.updateDefaultNode(this.node)}initAddedNode(t){t!==this.defaultNode&&this.initCustomNode(t)}initNode(t){this.updateDefaultNode(t)}initCustomNode(t){t.textContent&&!this.errorMessage&&(this.errorMessage=t.textContent.trim()),super.initCustomNode(t)}restoreDefaultNode(){this.attachDefaultNode()}updateDefaultNode(t){const{errorMessage:e,invalid:r}=this,i=!!(r&&e&&e.trim()!=="");t&&(t.textContent=i?e:"",t.hidden=!i,i&&Ba(e,{mode:"assertive"})),super.updateDefaultNode(t)}}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class il extends di{constructor(t){super(t,"helper",null)}setHelperText(t){this.helperText=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{helperText:t}=this;if(t&&t.trim()!==""){this.tagName="div";const e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(t){t&&(t.textContent=this.helperText),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ol extends di{constructor(t){super(t,"label","label")}setLabel(t){this.label=t,this.getSlotChild()||this.restoreDefaultNode(),this.node===this.defaultNode&&this.updateDefaultNode(this.node)}restoreDefaultNode(){const{label:t}=this;if(t&&t.trim()!==""){const e=this.attachDefaultNode();this.observeNode(e)}}updateDefaultNode(t){t&&(t.textContent=this.label),super.updateDefaultNode(t)}initCustomNode(t){super.initCustomNode(t),this.observeNode(t)}}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const sl=et(n=>class extends Ae(n){static get properties(){return{label:{type:String,observer:"_labelChanged"}}}constructor(){super(),this._labelController=new ol(this),this._labelController.addEventListener("slot-content-changed",e=>{this.toggleAttribute("has-label",e.detail.hasContent)})}get _labelId(){const e=this._labelNode;return e&&e.id}get _labelNode(){return this._labelController.node}ready(){super.ready(),this.addController(this._labelController)}_labelChanged(e){this._labelController.setLabel(e)}});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const os=et(n=>class extends n{static get properties(){return{invalid:{type:Boolean,reflectToAttribute:!0,notify:!0,value:!1,sync:!0},manualValidation:{type:Boolean,value:!1},required:{type:Boolean,reflectToAttribute:!0,sync:!0}}}validate(){const e=this.checkValidity();return this._setInvalid(!e),this.dispatchEvent(new CustomEvent("validated",{detail:{valid:e}})),e}checkValidity(){return!this.required||!!this.value}_setInvalid(e){this._shouldSetInvalid(e)&&(this.invalid=e)}_shouldSetInvalid(e){return!0}_requestValidation(){this.manualValidation||this.validate()}});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ss=n=>class extends os(sl(Ae(n))){static get properties(){return{ariaTarget:{type:Object,observer:"_ariaTargetChanged"},errorMessage:{type:String,observer:"_errorMessageChanged"},helperText:{type:String,observer:"_helperTextChanged"},accessibleName:{type:String,observer:"_accessibleNameChanged"},accessibleNameRef:{type:String,observer:"_accessibleNameRefChanged"}}}static get observers(){return["_invalidChanged(invalid)","_requiredChanged(required)"]}constructor(){super(),this._fieldAriaController=new Ya(this),this._helperController=new il(this),this._errorController=new nl(this),this._errorController.addEventListener("slot-content-changed",e=>{this.toggleAttribute("has-error-message",e.detail.hasContent)}),this._labelController.addEventListener("slot-content-changed",e=>{const{hasContent:r,node:i}=e.detail;this.__labelChanged(r,i)}),this._helperController.addEventListener("slot-content-changed",e=>{const{hasContent:r,node:i}=e.detail;this.toggleAttribute("has-helper",r),this.__helperChanged(r,i)})}get _errorNode(){return this._errorController.node}get _helperNode(){return this._helperController.node}ready(){super.ready(),this.addController(this._fieldAriaController),this.addController(this._helperController),this.addController(this._errorController)}__helperChanged(e,r){e?this._fieldAriaController.setHelperId(r.id):this._fieldAriaController.setHelperId(null)}_accessibleNameChanged(e){this._fieldAriaController.setAriaLabel(e)}_accessibleNameRefChanged(e){this._fieldAriaController.setLabelId(e,!0)}__labelChanged(e,r){e?this._fieldAriaController.setLabelId(r.id):this._fieldAriaController.setLabelId(null)}_errorMessageChanged(e){this._errorController.setErrorMessage(e)}_helperTextChanged(e){this._helperController.setHelperText(e)}_ariaTargetChanged(e){e&&this._fieldAriaController.setTarget(e)}_requiredChanged(e){this._fieldAriaController.setRequired(e)}_invalidChanged(e){this._errorController.setInvalid(e),setTimeout(()=>{if(e){const r=this._errorNode;this._fieldAriaController.setErrorId(r&&r.id)}else this._fieldAriaController.setErrorId(null)})}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class as extends je{constructor(t,e,r={}){const{uniqueIdPrefix:i}=r;super(t,"input","input",{initializer:(o,s)=>{s.value&&(o.value=s.value),s.type&&o.setAttribute("type",s.type),o.id=this.defaultId,typeof e=="function"&&e(o)},useUniqueId:!0,uniqueIdPrefix:i})}}/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class ls{constructor(t,e){this.input=t,this.__preventDuplicateLabelClick=this.__preventDuplicateLabelClick.bind(this),e.addEventListener("slot-content-changed",r=>{this.__initLabel(r.detail.node)}),this.__initLabel(e.node)}__initLabel(t){t&&(t.addEventListener("click",this.__preventDuplicateLabelClick),this.input&&t.setAttribute("for",this.input.id))}__preventDuplicateLabelClick(){const t=e=>{e.stopImmediatePropagation(),this.input.removeEventListener("click",t)};this.input.addEventListener("click",t)}}/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const al=n=>class extends Do(ss(rl(hi(ko(n))))){static get properties(){return{indeterminate:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},name:{type:String,value:""},readonly:{type:Boolean,value:!1,reflectToAttribute:!0}}}static get observers(){return["__readonlyChanged(readonly, inputElement)"]}static get delegateProps(){return[...super.delegateProps,"indeterminate"]}static get delegateAttrs(){return[...super.delegateAttrs,"name","invalid","required"]}constructor(){super(),this._setType("checkbox"),this._boundOnInputClick=this._onInputClick.bind(this),this.value="on",this.tabindex=0}get slotStyles(){return[`
          ${this.localName} > input[slot='input'] {
            opacity: 0;
          }
        `]}ready(){super.ready(),this.addController(new as(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new ls(this.inputElement,this._labelController)),this._createMethodObserver("_checkedChanged(checked)")}_shouldSetActive(e){return this.readonly||e.target.localName==="a"||e.target===this._helperNode||e.target===this._errorNode?!1:super._shouldSetActive(e)}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("click",this._boundOnInputClick)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("click",this._boundOnInputClick)}_onInputClick(e){this.readonly&&e.preventDefault()}__readonlyChanged(e,r){r&&(e?r.setAttribute("aria-readonly","true"):r.removeAttribute("aria-readonly"))}_toggleChecked(e){this.indeterminate&&(this.indeterminate=!1),super._toggleChecked(e)}checkValidity(){return!this.required||!!this.checked}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_checkedChanged(e){(e||this.__oldChecked)&&this._requestValidation(),this.__oldChecked=e}_requiredChanged(e){super._requiredChanged(e),e===!1&&this._requestValidation()}_onRequiredIndicatorClick(){this._labelNode.click()}};/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ll=O`
  :host {
    display: inline-block;
  }

  :host([hidden]) {
    display: none !important;
  }

  :host([disabled]) {
    -webkit-tap-highlight-color: transparent;
  }

  .vaadin-checkbox-container {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: baseline;
  }

  [part='checkbox'],
  ::slotted(input),
  [part='label'] {
    grid-row: 1;
  }

  [part='checkbox'],
  ::slotted(input) {
    grid-column: 1;
  }

  [part='helper-text'],
  [part='error-message'] {
    grid-column: 2;
  }

  :host(:not([has-helper])) [part='helper-text'],
  :host(:not([has-error-message])) [part='error-message'] {
    display: none;
  }

  [part='checkbox'] {
    width: var(--vaadin-checkbox-size, 1em);
    height: var(--vaadin-checkbox-size, 1em);
    --_input-border-width: var(--vaadin-input-field-border-width, 0);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  [part='checkbox']::before {
    display: block;
    content: '\\202F';
    line-height: var(--vaadin-checkbox-size, 1em);
    contain: paint;
  }

  /* visually hidden */
  ::slotted(input) {
    cursor: inherit;
    margin: 0;
    align-self: stretch;
    -webkit-appearance: none;
    width: initial;
    height: initial;
  }

  @media (forced-colors: active) {
    [part='checkbox'] {
      outline: 1px solid;
      outline-offset: -1px;
    }

    :host([disabled]) [part='checkbox'],
    :host([disabled]) [part='checkbox']::after {
      outline-color: GrayText;
    }

    :host(:is([checked], [indeterminate])) [part='checkbox']::after {
      outline: 1px solid;
      outline-offset: -1px;
      border-radius: inherit;
    }

    :host([focused]) [part='checkbox'],
    :host([focused]) [part='checkbox']::after {
      outline-width: 2px;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-checkbox",ll,{moduleId:"vaadin-checkbox-styles"});class cl extends al(Te(J(L))){static get is(){return"vaadin-checkbox"}static get template(){return G`
      <div class="vaadin-checkbox-container">
        <div part="checkbox" aria-hidden="true"></div>
        <slot name="input"></slot>
        <div part="label">
          <slot name="label"></slot>
          <div part="required-indicator" on-click="_onRequiredIndicatorClick"></div>
        </div>
        <div part="helper-text">
          <slot name="helper"></slot>
        </div>
        <div part="error-message">
          <slot name="error-message"></slot>
        </div>
      </div>
      <slot name="tooltip"></slot>
    `}ready(){super.ready(),this._tooltipController=new ui(this),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}}W(cl);/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class He{constructor(){this._asyncModule=null,this._callback=null,this._timer=null}setConfig(t,e){this._asyncModule=t,this._callback=e,this._timer=this._asyncModule.run(()=>{this._timer=null,Je.delete(this),this._callback()})}cancel(){this.isActive()&&(this._cancelAsync(),Je.delete(this))}_cancelAsync(){this.isActive()&&(this._asyncModule.cancel(this._timer),this._timer=null)}flush(){this.isActive()&&(this.cancel(),this._callback())}isActive(){return this._timer!=null}static debounce(t,e,r){return t instanceof He?t._cancelAsync():t=new He,t.setConfig(e,r),t}}let Je=new Set;const cs=function(n){Je.add(n)},ul=function(){const n=!!Je.size;return Je.forEach(t=>{try{t.flush()}catch(e){setTimeout(()=>{throw e})}}),n};/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const kr=function(){let n,t;do n=window.ShadyDOM&&ShadyDOM.flush(),window.ShadyCSS&&window.ShadyCSS.ScopingShim&&window.ShadyCSS.ScopingShim.flush(),t=ul();while(n||t)};/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let Li=!1;function us(){if(Qs&&!Xs){if(!Li){Li=!0;const n=document.createElement("style");n.textContent="dom-bind,dom-if,dom-repeat{display:none;}",document.head.appendChild(n)}return!0}return!1}/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/function yi(n,t,e,r,i){let o;i&&(o=typeof e=="object"&&e!==null,o&&(r=n.__dataTemp[t]));let s=r!==e&&(r===r||e===e);return o&&s&&(n.__dataTemp[t]=e),s}const bi=Ro(n=>{class t extends n{_shouldPropertyChange(r,i,o){return yi(this,r,i,o,!0)}}return t}),dl=Ro(n=>{class t extends n{static get properties(){return{mutableData:Boolean}}_shouldPropertyChange(r,i,o){return yi(this,r,i,o,this.mutableData)}}return t});bi._mutablePropertyChange=yi;/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/let Yr=null;function Ur(){return Yr}Ur.prototype=Object.create(HTMLTemplateElement.prototype,{constructor:{value:Ur,writable:!0}});const ds=$o(Ur),hl=bi(ds);function fl(n,t){Yr=n,Object.setPrototypeOf(n,t.prototype),new t,Yr=null}const _l=$o(class{});function hs(n,t){for(let e=0;e<t.length;e++){let r=t[e];if(!!n!=!!r.__hideTemplateChildren__)if(r.nodeType===Node.TEXT_NODE)n?(r.__polymerTextContent__=r.textContent,r.textContent=""):r.textContent=r.__polymerTextContent__;else if(r.localName==="slot")if(n)r.__polymerReplaced__=document.createComment("hidden-slot"),H(H(r).parentNode).replaceChild(r.__polymerReplaced__,r);else{const i=r.__polymerReplaced__;i&&H(H(i).parentNode).replaceChild(r,i)}else r.style&&(n?(r.__polymerDisplay__=r.style.display,r.style.display="none"):r.style.display=r.__polymerDisplay__);r.__hideTemplateChildren__=n,r._showHideChildren&&r._showHideChildren(n)}}class Ce extends _l{constructor(t){super(),this._configureProperties(t),this.root=this._stampTemplate(this.__dataHost);let e=[];this.children=e;for(let i=this.root.firstChild;i;i=i.nextSibling)e.push(i),i.__templatizeInstance=this;this.__templatizeOwner&&this.__templatizeOwner.__hideTemplateChildren__&&this._showHideChildren(!0);let r=this.__templatizeOptions;(t&&r.instanceProps||!r.instanceProps)&&this._enableProperties()}_configureProperties(t){if(this.__templatizeOptions.forwardHostProp)for(let r in this.__hostProps)this._setPendingProperty(r,this.__dataHost["_host_"+r]);for(let r in t)this._setPendingProperty(r,t[r])}forwardHostProp(t,e){this._setPendingPropertyOrPath(t,e,!1,!0)&&this.__dataHost._enqueueClient(this)}_addEventListenerToNode(t,e,r){if(this._methodHost&&this.__templatizeOptions.parentModel)this._methodHost._addEventListenerToNode(t,e,i=>{i.model=this,r(i)});else{let i=this.__dataHost.__dataHost;i&&i._addEventListenerToNode(t,e,r)}}_showHideChildren(t){hs(t,this.children)}_setUnmanagedPropertyToNode(t,e,r){t.__hideTemplateChildren__&&t.nodeType==Node.TEXT_NODE&&e=="textContent"?t.__polymerTextContent__=r:super._setUnmanagedPropertyToNode(t,e,r)}get parentModel(){let t=this.__parentModel;if(!t){let e;t=this;do t=t.__dataHost.__dataHost;while((e=t.__templatizeOptions)&&!e.parentModel);this.__parentModel=t}return t}dispatchEvent(t){return!0}}Ce.prototype.__dataHost;Ce.prototype.__templatizeOptions;Ce.prototype._methodHost;Ce.prototype.__templatizeOwner;Ce.prototype.__hostProps;const pl=bi(Ce);function Ni(n){let t=n.__dataHost;return t&&t._methodHost||t}function ml(n,t,e){let r=e.mutableData?pl:Ce;Yt.mixin&&(r=Yt.mixin(r));let i=class extends r{};return i.prototype.__templatizeOptions=e,i.prototype._bindTemplate(n),bl(i,n,t,e),i}function gl(n,t,e,r){let i=e.forwardHostProp;if(i&&t.hasHostProps){const o=n.localName=="template";let s=t.templatizeTemplateClass;if(!s){if(o){let l=e.mutableData?hl:ds;class u extends l{}s=t.templatizeTemplateClass=u}else{const l=n.constructor;class u extends l{}s=t.templatizeTemplateClass=u}let a=t.hostProps;for(let l in a)s.prototype._addPropertyEffect("_host_"+l,s.prototype.PROPERTY_EFFECT_TYPES.PROPAGATE,{fn:yl(l,i)}),s.prototype._createNotifyingProperty("_host_"+l);Zs&&r&&Cl(t,e,r)}if(n.__dataProto&&Object.assign(n.__data,n.__dataProto),o)fl(n,s),n.__dataTemp={},n.__dataPending=null,n.__dataOld=null,n._enableProperties();else{Object.setPrototypeOf(n,s.prototype);const a=t.hostProps;for(let l in a)if(l="_host_"+l,l in n){const u=n[l];delete n[l],n.__data[l]=u}}}}function yl(n,t){return function(r,i,o){t.call(r.__templatizeOwner,i.substring(6),o[i])}}function bl(n,t,e,r){let i=e.hostProps||{};for(let o in r.instanceProps){delete i[o];let s=r.notifyInstanceProp;s&&n.prototype._addPropertyEffect(o,n.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:vl(o,s)})}if(r.forwardHostProp&&t.__dataHost)for(let o in i)e.hasHostProps||(e.hasHostProps=!0),n.prototype._addPropertyEffect(o,n.prototype.PROPERTY_EFFECT_TYPES.NOTIFY,{fn:wl()})}function vl(n,t){return function(r,i,o){t.call(r.__templatizeOwner,r,i,o[i])}}function wl(){return function(t,e,r){t.__dataHost._setPendingPropertyOrPath("_host_"+e,r[e],!0,!0)}}function Yt(n,t,e){if(Mo&&!Ni(n))throw new Error("strictTemplatePolicy: template owner not trusted");if(e=e||{},n.__templatizeOwner)throw new Error("A <template> can only be templatized once");n.__templatizeOwner=t;let i=(t?t.constructor:Ce)._parseTemplate(n),o=i.templatizeInstanceClass;o||(o=ml(n,i,e),i.templatizeInstanceClass=o);const s=Ni(n);gl(n,i,e,s);let a=class extends o{};return a.prototype._methodHost=s,a.prototype.__dataHost=n,a.prototype.__templatizeOwner=t,a.prototype.__hostProps=i.hostProps,a=a,a}function Cl(n,t,e){const r=e.constructor._properties,{propertyEffects:i}=n,{instanceProps:o}=t;for(let s in i)if(!r[s]&&!(o&&o[s])){const a=i[s];for(let l=0;l<a.length;l++){const{part:u}=a[l].info;if(!(u.signature&&u.signature.static)){console.warn(`Property '${s}' used in template but not declared in 'properties'; attribute will not be observed.`);break}}}}function xl(n,t){let e;for(;t;)if(e=t.__dataHost?t:t.__templatizeInstance)if(e.__dataHost!=n)t=e.__dataHost;else return e;else t=H(t).parentNode;return null}/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/class fs extends L{static get is(){return"dom-if"}static get template(){return null}static get properties(){return{if:{type:Boolean,observer:"__debounceRender"},restamp:{type:Boolean,observer:"__debounceRender"},notifyDomChange:{type:Boolean}}}constructor(){super(),this.__renderDebouncer=null,this._lastIf=!1,this.__hideTemplateChildren__=!1,this.__template,this._templateInfo}__debounceRender(){this.__renderDebouncer=He.debounce(this.__renderDebouncer,Fo,()=>this.__render()),cs(this.__renderDebouncer)}disconnectedCallback(){super.disconnectedCallback();const t=H(this).parentNode;(!t||t.nodeType==Node.DOCUMENT_FRAGMENT_NODE&&!H(t).host)&&this.__teardownInstance()}connectedCallback(){super.connectedCallback(),us()||(this.style.display="none"),this.if&&this.__debounceRender()}__ensureTemplate(){if(!this.__template){const t=this;let e=t._templateInfo?t:H(t).querySelector("template");if(!e){let r=new MutationObserver(()=>{if(H(this).querySelector("template"))r.disconnect(),this.__render();else throw new Error("dom-if requires a <template> child")});return r.observe(this,{childList:!0}),!1}this.__template=e}return!0}__ensureInstance(){let t=H(this).parentNode;if(this.__hasInstance()){let e=this.__getInstanceNodes();if(e&&e.length&&H(this).previousSibling!==e[e.length-1])for(let i=0,o;i<e.length&&(o=e[i]);i++)H(t).insertBefore(o,this)}else{if(!t||!this.__ensureTemplate())return!1;this.__createAndInsertInstance(t)}return!0}render(){kr()}__render(){if(this.if){if(!this.__ensureInstance())return}else this.restamp&&this.__teardownInstance();this._showHideChildren(),(!Vr||this.notifyDomChange)&&this.if!=this._lastIf&&(this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0})),this._lastIf=this.if)}__hasInstance(){}__getInstanceNodes(){}__createAndInsertInstance(t){}__teardownInstance(){}_showHideChildren(){}}class Sl extends fs{constructor(){super(),this.__instance=null,this.__syncInfo=null}__hasInstance(){return!!this.__instance}__getInstanceNodes(){return this.__instance.templateInfo.childNodes}__createAndInsertInstance(t){const e=this.__dataHost||this;if(Mo&&!this.__dataHost)throw new Error("strictTemplatePolicy: template owner not trusted");const r=e._bindTemplate(this.__template,!0);r.runEffects=(i,o,s)=>{let a=this.__syncInfo;if(this.if)a&&(this.__syncInfo=null,this._showHideChildren(),o=Object.assign(a.changedProps,o)),i(o,s);else if(this.__instance)if(a||(a=this.__syncInfo={runEffects:i,changedProps:{}}),s)for(const l in o){const u=zo(l);a.changedProps[u]=this.__dataHost[u]}else Object.assign(a.changedProps,o)},this.__instance=e._stampTemplate(this.__template,r),H(t).insertBefore(this.__instance,this)}__syncHostProperties(){const t=this.__syncInfo;t&&(this.__syncInfo=null,t.runEffects(t.changedProps,!1))}__teardownInstance(){const t=this.__dataHost||this;this.__instance&&(t._removeBoundDom(this.__instance),this.__instance=null,this.__syncInfo=null)}_showHideChildren(){const t=this.__hideTemplateChildren__||!this.if;this.__instance&&!!this.__instance.__hidden!==t&&(this.__instance.__hidden=t,hs(t,this.__instance.templateInfo.childNodes)),t||this.__syncHostProperties()}}class Ol extends fs{constructor(){super(),this.__ctor=null,this.__instance=null,this.__invalidProps=null}__hasInstance(){return!!this.__instance}__getInstanceNodes(){return this.__instance.children}__createAndInsertInstance(t){this.__ctor||(this.__ctor=Yt(this.__template,this,{mutableData:!0,forwardHostProp:function(e,r){this.__instance&&(this.if?this.__instance.forwardHostProp(e,r):(this.__invalidProps=this.__invalidProps||Object.create(null),this.__invalidProps[zo(e)]=!0))}})),this.__instance=new this.__ctor,H(t).insertBefore(this.__instance.root,this)}__teardownInstance(){if(this.__instance){let t=this.__instance.children;if(t&&t.length){let e=H(t[0]).parentNode;if(e){e=H(e);for(let r=0,i;r<t.length&&(i=t[r]);r++)e.removeChild(i)}}this.__invalidProps=null,this.__instance=null}}__syncHostProperties(){let t=this.__invalidProps;if(t){this.__invalidProps=null;for(let e in t)this.__instance._setPendingProperty(e,this.__dataHost[e]);this.__instance._flushProperties()}}_showHideChildren(){const t=this.__hideTemplateChildren__||!this.if;this.__instance&&!!this.__instance.__hidden!==t&&(this.__instance.__hidden=t,this.__instance._showHideChildren(t)),t||this.__syncHostProperties()}}const Hi=Js?Sl:Ol;customElements.define(Hi.is,Hi);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Xe=(n,t)=>{const e=n._$AN;if(e===void 0)return!1;for(const r of e)r._$AO?.(t,!1),Xe(r,t);return!0},Ut=n=>{let t,e;do{if((t=n._$AM)===void 0)break;e=t._$AN,e.delete(n),n=t}while(e?.size===0)},_s=n=>{for(let t;t=n._$AM;n=t){let e=t._$AN;if(e===void 0)t._$AN=e=new Set;else if(e.has(n))break;e.add(n),El(t)}};function Il(n){this._$AN!==void 0?(Ut(this),this._$AM=n,_s(this)):this._$AM=n}function Pl(n,t=!1,e=0){const r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(t)if(Array.isArray(r))for(let o=e;o<r.length;o++)Xe(r[o],!1),Ut(r[o]);else r!=null&&(Xe(r,!1),Ut(r));else Xe(this,n)}const El=n=>{n.type==ge.CHILD&&(n._$AP??=Pl,n._$AQ??=Il)};class Tl extends Yo{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,r){super._$AT(t,e,r),_s(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(Xe(this,t),Ut(this))}setValue(t){if(Lo(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}class Al extends Tl{constructor(t){if(super(t),t.type!==ge.CHILD)throw new Error(`${this.constructor.directiveName}() can only be used in child bindings`)}update(t,[e,r]){return this.updateContent(t,e,r),Ge}updateContent(t,e,r){const{parentNode:i,startNode:o}=t;this.__parentNode=i;const s=r!=null,a=s?this.getNewNode(e,r):null,l=this.getOldNode(t);if(clearTimeout(this.__parentNode.__nodeRetryTimeout),s&&!a)this.__parentNode.__nodeRetryTimeout=setTimeout(()=>this.updateContent(t,e,r));else{if(l===a)return;l&&a?i.replaceChild(a,l):l?i.removeChild(l):a&&o.after(a)}}getNewNode(t,e){return window.Vaadin.Flow.clients[t].getByNodeId(e)}getOldNode(t){const{startNode:e,endNode:r}=t;if(e.nextSibling!==r)return e.nextSibling}disconnected(){clearTimeout(this.__parentNode.__nodeRetryTimeout)}}const ps=Uo(Al);function Dl(n,t){return ps(n,t)}function kl(n,t,e){_i(qo`${t.map(r=>ps(n,r))}`,e)}function Rl(n){const t=n.insertBefore;n.insertBefore=function(e,r){return r&&r.parentNode===this?t.call(this,e,r):t.call(this,e,null)}}window.Vaadin||={};window.Vaadin.FlowComponentHost||={patchVirtualContainer:Rl,getNode:Dl,setChildNodes:kl};class Bi extends L{static get template(){return G`
      <style>
        :host {
          animation: 1ms flow-component-renderer-appear;
        }

        @keyframes flow-component-renderer-appear {
          to {
            opacity: 1;
          }
        }
      </style>
      <slot></slot>
    `}static get is(){return"flow-component-renderer"}static get properties(){return{nodeid:Number,appid:String}}static get observers(){return["_attachRenderedComponentIfAble(appid, nodeid)"]}ready(){super.ready(),this.addEventListener("click",function(t){this.firstChild&&typeof this.firstChild.click=="function"&&t.target===this&&(t.stopPropagation(),this.firstChild.click())}),this.addEventListener("animationend",this._onAnimationEnd)}_asyncAttachRenderedComponentIfAble(){this._debouncer=He.debounce(this._debouncer,ea,()=>this._attachRenderedComponentIfAble())}_attachRenderedComponentIfAble(){if(this.appid==null)return;if(this.nodeid==null){this.firstChild&&this.removeChild(this.firstChild);return}const t=this._getRenderedComponent();this.firstChild?t?this.firstChild!==t?(this.replaceChild(t,this.firstChild),this._defineFocusTarget(),this.onComponentRendered()):(this._defineFocusTarget(),this.onComponentRendered()):this._asyncAttachRenderedComponentIfAble():t?(this.appendChild(t),this._defineFocusTarget(),this.onComponentRendered()):this._asyncAttachRenderedComponentIfAble()}_getRenderedComponent(){try{return window.Vaadin.Flow.clients[this.appid].getByNodeId(this.nodeid)}catch(t){console.error("Could not get node %s from app %s",this.nodeid,this.appid),console.error(t)}return null}onComponentRendered(){}_defineFocusTarget(){var t=this._getFirstFocusableDescendant(this.firstChild);t!==null&&t.setAttribute("focus-target","true")}_getFirstFocusableDescendant(t){if(this._isFocusable(t))return t;if(t.hasAttribute&&(t.hasAttribute("disabled")||t.hasAttribute("hidden"))||!t.children)return null;for(var e=0;e<t.children.length;e++){var r=this._getFirstFocusableDescendant(t.children[e]);if(r!==null)return r}return null}_isFocusable(t){return t.hasAttribute&&typeof t.hasAttribute=="function"&&(t.hasAttribute("disabled")||t.hasAttribute("hidden"))?!1:t.tabIndex===0}_onAnimationEnd(t){t.animationName.indexOf("flow-component-renderer-appear")===0&&this._attachRenderedComponentIfAble()}}window.customElements.define(Bi.is,Bi);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const $l=n=>class extends n{static get properties(){return{width:{type:String,value:"58px",sync:!0},autoWidth:{type:Boolean,value:!0},flexGrow:{type:Number,value:0,sync:!0},selectAll:{type:Boolean,value:!1,notify:!0,sync:!0},autoSelect:{type:Boolean,value:!1,sync:!0},dragSelect:{type:Boolean,value:!1,sync:!0},_indeterminate:{type:Boolean,sync:!0},_selectAllHidden:Boolean,_shiftKeyDown:{type:Boolean,value:!1}}}static get observers(){return["_onHeaderRendererOrBindingChanged(_headerRenderer, _headerCell, path, header, selectAll, _indeterminate, _selectAllHidden)"]}constructor(){super(),this.__onCellTrack=this.__onCellTrack.bind(this),this.__onCellClick=this.__onCellClick.bind(this),this.__onCellMouseDown=this.__onCellMouseDown.bind(this),this.__onGridInteraction=this.__onGridInteraction.bind(this),this.__onActiveItemChanged=this.__onActiveItemChanged.bind(this),this.__onSelectRowCheckboxChange=this.__onSelectRowCheckboxChange.bind(this),this.__onSelectAllCheckboxChange=this.__onSelectAllCheckboxChange.bind(this)}connectedCallback(){super.connectedCallback(),this._grid&&(this._grid.addEventListener("keyup",this.__onGridInteraction),this._grid.addEventListener("keydown",this.__onGridInteraction,{capture:!0}),this._grid.addEventListener("mousedown",this.__onGridInteraction),this._grid.addEventListener("active-item-changed",this.__onActiveItemChanged))}disconnectedCallback(){super.disconnectedCallback(),this._grid&&(this._grid.removeEventListener("keyup",this.__onGridInteraction),this._grid.removeEventListener("keydown",this.__onGridInteraction,{capture:!0}),this._grid.removeEventListener("mousedown",this.__onGridInteraction),this._grid.removeEventListener("active-item-changed",this.__onActiveItemChanged))}_defaultHeaderRenderer(e,r){let i=e.firstElementChild;i||(i=document.createElement("vaadin-checkbox"),i.setAttribute("aria-label","Select All"),i.classList.add("vaadin-grid-select-all-checkbox"),i.addEventListener("change",this.__onSelectAllCheckboxChange),e.appendChild(i));const o=this.__isChecked(this.selectAll,this._indeterminate);i.checked=o,i.hidden=this._selectAllHidden,i.indeterminate=this._indeterminate}_defaultRenderer(e,r,{item:i,selected:o}){let s=e.firstElementChild;s||(s=document.createElement("vaadin-checkbox"),s.setAttribute("aria-label","Select Row"),s.addEventListener("change",this.__onSelectRowCheckboxChange),e.appendChild(s),ne(e,"track",this.__onCellTrack),e.addEventListener("mousedown",this.__onCellMouseDown),e.addEventListener("click",this.__onCellClick)),s.__item=i,s.checked=o;const a=this._grid.__isItemSelectable(i);s.readonly=!a,s.hidden=!a&&!o}__onSelectAllCheckboxChange(e){this._indeterminate||e.currentTarget.checked?this._selectAll():this._deselectAll()}__onGridInteraction(e){this._shiftKeyDown=e.shiftKey,this.autoSelect&&this._grid.$.scroller.toggleAttribute("range-selecting",this._shiftKeyDown)}__onSelectRowCheckboxChange(e){this.__toggleItem(e.currentTarget.__item,e.currentTarget.checked)}__onCellTrack(e){if(this.dragSelect)if(this.__dragCurrentY=e.detail.y,this.__dragDy=e.detail.dy,e.detail.state==="start"){const i=this._grid._getRenderedRows().find(o=>o.contains(e.currentTarget.assignedSlot));this.__selectOnDrag=!this._grid._isSelected(i._item),this.__dragStartIndex=i.index,this.__dragStartItem=i._item,this.__dragAutoScroller()}else e.detail.state==="end"&&(this.__dragStartItem&&this.__toggleItem(this.__dragStartItem,this.__selectOnDrag),setTimeout(()=>{this.__dragStartIndex=void 0}))}__onCellMouseDown(e){this.dragSelect&&e.preventDefault()}__onCellClick(e){this.__dragStartIndex!==void 0&&e.preventDefault()}_onCellKeyDown(e){const r=e.composedPath()[0];if(e.keyCode===32){if(r===this._headerCell)this.selectAll?this._deselectAll():this._selectAll();else if(this._cells.includes(r)&&!this.autoSelect){const i=r._content.firstElementChild;this.__toggleItem(i.__item)}}}__onActiveItemChanged(e){const r=e.detail.value;if(this.autoSelect){const i=r||this.__previousActiveItem;i&&this.__toggleItem(i)}this.__previousActiveItem=r}__dragAutoScroller(){if(this.__dragStartIndex===void 0)return;const e=this._grid._getRenderedRows(),r=e.find(l=>{const u=l.getBoundingClientRect();return this.__dragCurrentY>=u.top&&this.__dragCurrentY<=u.bottom});let i=r?r.index:void 0;const o=this.__getScrollableArea();this.__dragCurrentY<o.top?i=this._grid._firstVisibleIndex:this.__dragCurrentY>o.bottom&&(i=this._grid._lastVisibleIndex),i!==void 0&&e.forEach(l=>{(i>this.__dragStartIndex&&l.index>=this.__dragStartIndex&&l.index<=i||i<this.__dragStartIndex&&l.index<=this.__dragStartIndex&&l.index>=i)&&(this.__toggleItem(l._item,this.__selectOnDrag),this.__dragStartItem=void 0)});const s=o.height*.15,a=10;if(this.__dragDy<0&&this.__dragCurrentY<o.top+s){const l=o.top+s-this.__dragCurrentY,u=Math.min(1,l/s);this._grid.$.table.scrollTop-=u*a}if(this.__dragDy>0&&this.__dragCurrentY>o.bottom-s){const l=this.__dragCurrentY-(o.bottom-s),u=Math.min(1,l/s);this._grid.$.table.scrollTop+=u*a}setTimeout(()=>this.__dragAutoScroller(),10)}__getScrollableArea(){const e=this._grid.$.table.getBoundingClientRect(),r=this._grid.$.header.getBoundingClientRect(),i=this._grid.$.footer.getBoundingClientRect();return{top:e.top+r.height,bottom:e.bottom-i.height,left:e.left,right:e.right,height:e.height-r.height-i.height,width:e.width}}_selectAll(){}_deselectAll(){}_selectItem(e){}_deselectItem(e){}__toggleItem(e,r=!this._grid._isSelected(e)){r!==this._grid._isSelected(e)&&(r?this._selectItem(e):this._deselectItem(e))}__isChecked(e,r){return r||e}};class qr extends $l(Qo){static get is(){return"vaadin-grid-flow-selection-column"}static get properties(){return{autoWidth:{type:Boolean,value:!0},width:{type:String,value:"56px"}}}_defaultHeaderRenderer(t,e){super._defaultHeaderRenderer(t,e);const r=t.firstElementChild;r&&(r.id="selectAllCheckbox")}_selectAll(){this.selectAll=!0,this.$server.selectAll()}_deselectAll(){this.selectAll=!1,this.$server.deselectAll()}_selectItem(t){this.$server.setShiftKeyDown(this._shiftKeyDown),this._grid.$connector.doSelection([t],!0)}_deselectItem(t){this.$server.setShiftKeyDown(this._shiftKeyDown),this._grid.$connector.doDeselection([t],!0),this.selectAll=!1}}customElements.define(qr.is,qr);window.Vaadin.Flow.gridConnector={};window.Vaadin.Flow.gridConnector.initLazy=n=>{if(n.$connector)return;const t=n._dataProviderController;t.ensureFlatIndexHierarchyOriginal=t.ensureFlatIndexHierarchy,t.ensureFlatIndexHierarchy=function(c){const{item:d}=this.getFlatIndexContext(c);if(!d||!this.isExpanded(d))return;n.$connector.hasCacheForParentKey(n.getItemId(d))?this.ensureFlatIndexHierarchyOriginal(c):n.$connector.beforeEnsureFlatIndexHierarchy(c,d)},t.isLoadingOriginal=t.isLoading,t.isLoading=function(){return n.$connector.hasEnsureSubCacheQueue()||this.isLoadingOriginal()},t.getItemSubCache=function(c){return this.getItemContext(c)?.subCache};let e={};const r=50,i=20;let o=[],s,a=[],l;const u=150;let f,p={};const m="null";p[m]=[0,0];let g=null,b=null;const w=["SINGLE","NONE","MULTI"];let C={},I="SINGLE",M=!1;n.size=0,n.itemIdPath="key";function K(c){return{[n.itemIdPath]:c}}n.$connector={},n.$connector.hasCacheForParentKey=c=>e[c]?.size!==void 0,n.$connector.hasEnsureSubCacheQueue=()=>a.length>0,n.$connector.hasParentRequestQueue=()=>o.length>0,n.$connector.hasRootRequestQueue=()=>{const{pendingRequests:c}=t.rootCache;return Object.keys(c).length>0||!!f?.isActive()},n.$connector.beforeEnsureFlatIndexHierarchy=function(c,d){a.push({flatIndex:c,itemkey:n.getItemId(d)}),l=D.debounce(l,se,()=>{for(;a.length;)n.$connector.flushEnsureSubCache()})},n.$connector.doSelection=function(c,d){if(I==="NONE"||!c.length||d&&n.hasAttribute("disabled"))return;I==="SINGLE"&&(C={});let h=!1;c.forEach(_=>{const y=!d||n.isItemSelectable(_);h=h||y,_&&y&&(C[_.key]=_,_.selected=!0,d&&n.$server.select(_.key));const v=!n.activeItem||!_||_.key!=n.activeItem.key;!d&&I==="SINGLE"&&v&&(n.activeItem=_)}),h&&(n.selectedItems=Object.values(C))},n.$connector.doDeselection=function(c,d){if(I==="NONE"||!c.length||d&&n.hasAttribute("disabled"))return;const h=n.selectedItems.slice();for(;c.length;){const _=c.shift();if(!d||n.isItemSelectable(_)){for(let v=0;v<h.length;v++){const S=h[v];if(_?.key===S.key){h.splice(v,1);break}}_&&(delete C[_.key],delete _.selected,d&&n.$server.deselect(_.key))}}n.selectedItems=h},n.__activeItemChanged=function(c,d){I=="SINGLE"&&(c?C[c.key]||n.$connector.doSelection([c],!0):d&&C[d.key]&&(n.__deselectDisallowed?n.activeItem=d:(d=t.getItemContext(d).item,n.$connector.doDeselection([d],!0))))},n._createPropertyObserver("activeItem","__activeItemChanged",!0),n.__activeItemChangedDetails=function(c,d){n.__disallowDetailsOnClick||c==null&&d===void 0||(c&&!c.detailsOpened?n.$server.setDetailsVisible(c.key):n.$server.setDetailsVisible(null))},n._createPropertyObserver("activeItem","__activeItemChangedDetails",!0),n.$connector._getSameLevelPage=function(c,d,h){if((d.parentItem?n.getItemId(d.parentItem):m)===c)return Math.floor(h/n.pageSize);const{parentCache:y,parentCacheIndex:v}=d;return y?this._getSameLevelPage(c,y,v):null},n.$connector.flushEnsureSubCache=function(){const c=a.shift();return c?(t.ensureFlatIndexHierarchyOriginal(c.flatIndex),!0):!1},n.$connector.debounceRootRequest=function(c){const d=n._hasData?u:0;f=D.debounce(f,Z.after(d),()=>{n.$connector.fetchPage((h,_)=>n.$server.setViewportRange(h,_),c,m)})},n.$connector.flushParentRequests=function(){const c=[];o.splice(0,i).forEach(({parentKey:d,page:h})=>{n.$connector.fetchPage((_,y)=>c.push({parentKey:d,firstIndex:_,size:y}),h,d)}),c.length&&n.$server.setParentRequestedRanges(c)},n.$connector.debounceParentRequest=function(c,d){o=o.filter(h=>h.parentKey!==c),o.push({parentKey:c,page:d}),s=D.debounce(s,Z.after(r),()=>{for(;o.length;)n.$connector.flushParentRequests()})},n.$connector.fetchPage=function(c,d,h){h===m&&(d=Math.min(d,Math.floor((n.size-1)/n.pageSize)));const _=n._getRenderedRows();let y=_.length>0?_[0].index:0,v=_.length>0?_[_.length-1].index:0,S=v-y,N=Math.max(0,y-S),P=Math.min(v+S,n._flatSize),A=[null,null];for(let x=N;x<=P;x++){const{cache:ee,index:ke}=t.getFlatIndexContext(x),_e=n.$connector._getSameLevelPage(h,ee,ke);_e!==null&&(A[0]=Math.min(A[0]??_e,_e),A[1]=Math.max(A[1]??_e,_e))}(A.some(x=>x===null)||d<A[0]||d>A[1])&&(A=[d,d]);let E=p[h]||[-1,-1];if(E[0]!=A[0]||E[1]!=A[1]){p[h]=A;let x=A[1]-A[0]+1;c(A[0]*n.pageSize,x*n.pageSize)}},n.dataProvider=function(c,d){if(c.pageSize!=n.pageSize)throw"Invalid pageSize";let h=c.page;if(c.parentItem){let _=n.getItemId(c.parentItem);const y=t.getItemSubCache(c.parentItem);e[_]?.[h]&&y?(a=[],d(e[_][h],e[_].size)):n.$connector.debounceParentRequest(_,h)}else{if(n.size===0){d([],0);return}e[m]?.[h]?d(e[m][h]):n.$connector.debounceRootRequest(h)}},n.$connector.setSorterDirections=function(c){M=!0,setTimeout(()=>{try{const d=Array.from(n.querySelectorAll("vaadin-grid-sorter"));n._sorters.forEach(h=>{d.includes(h)||d.push(h)}),d.forEach(h=>{h.direction=null}),n.multiSortPriority!=="append"&&(c=c.reverse()),c.forEach(({column:h,direction:_})=>{d.forEach(y=>{y.getAttribute("path")===h&&(y.direction=_)})}),n.__applySorters()}finally{M=!1}})},n._updateItem=function(c,d){Ke.prototype._updateItem.call(n,c,d),c.hidden||Array.from(c.children).forEach(h=>{Array.from(h?._content?.__templateInstance?.children||[]).forEach(_=>{_._attachRenderedComponentIfAble&&_._attachRenderedComponentIfAble(),Array.from(_?.children||[]).forEach(y=>{y._attachRenderedComponentIfAble&&y._attachRenderedComponentIfAble()})})}),I===w[1]&&(c.removeAttribute("aria-selected"),Array.from(c.children).forEach(h=>h.removeAttribute("aria-selected")))};const j=function(c,d){if(c==null||n.$server.updateExpandedState==null)return;let h=n.getItemId(c);n.$server.updateExpandedState(h,d)};n.expandItem=function(c){j(c,!0),Ke.prototype.expandItem.call(n,c)},n.collapseItem=function(c){j(c,!1),Ke.prototype.collapseItem.call(n,c)};const $=function(c){if(!c||!Array.isArray(c))throw"Attempted to call itemsUpdated with an invalid value: "+JSON.stringify(c);let d=Array.from(n.detailsOpenedItems);for(let h=0;h<c.length;++h){const _=c[h];_&&(_.detailsOpened?n._getItemIndexInArray(_,d)<0&&d.push(_):n._getItemIndexInArray(_,d)>=0&&d.splice(n._getItemIndexInArray(_,d),1))}n.detailsOpenedItems=d},Y=function(c,d=m){const h=e[d][c],_=K(d);let y=d===m?t.rootCache:t.getItemSubCache(_);return y&&!y.pendingRequests[c]&&y.setPage(c,h||Array.from({length:n.pageSize})),h},ae=function(){he(),n.__updateVisibleRows()},he=function(){t.recalculateFlatSize(),n._flatSize=t.flatSize},le=function(c){if(!c||!n.$||n.$.items.childElementCount===0)return;const d=c.map(_=>_.key),h=n._getRenderedRows().filter(_=>_._item&&d.includes(_._item.key)).map(_=>_.index);h.length>0&&n.__updateVisibleRows(h[0],h[h.length-1])};n.$connector.set=function(c,d,h){if(c%n.pageSize!=0)throw"Got new data to index "+c+" which is not aligned with the page size of "+n.pageSize;let _=h||m;const y=c/n.pageSize,v=Math.ceil(d.length/n.pageSize);_===m&&(b=[y,y+v-1]);for(let S=0;S<v;S++){let N=y+S,P=d.slice(S*n.pageSize,(S+1)*n.pageSize);e[_]||(e[_]={}),e[_][N]=P,n.$connector.doSelection(P.filter(E=>E.selected)),n.$connector.doDeselection(P.filter(E=>!E.selected&&C[E.key]));const A=Y(N,_);A&&($(A),le(A))}};const De=function(c){let d=c.parentUniqueKey||m;if(e[d]){for(let h in e[d])for(let _ in e[d][h])if(n.getItemId(e[d][h][_])===n.getItemId(c))return{page:h,index:_,parentKey:d}}return null};n.$connector.updateHierarchicalData=function(c){let d=[];for(let _=0;_<c.length;_++){let y=De(c[_]);if(y){e[y.parentKey][y.page][y.index]=c[_];let v=y.parentKey+":"+y.page;d[v]||(d[v]={parentKey:y.parentKey,page:y.page})}}let h=Object.keys(d);for(let _=0;_<h.length;_++){let y=d[h[_]];const v=Y(y.page,y.parentKey);v&&($(v),le(v))}},n.$connector.updateFlatData=function(c){for(let d=0;d<c.length;d++){let h=De(c[d]);if(h){e[h.parentKey][h.page][h.index]=c[d];const _=parseInt(h.page)*n.pageSize+parseInt(h.index),{rootCache:y}=t;y.items[_]&&(y.items[_]=c[d])}}$(c),le(c)},n.$connector.clearExpanded=function(){n.expandedItems=[],a=[],o=[]};const q=function(){const c=p[m];if(!c||!g)return;const d=g[1]-g[0]+1,h=Array.from({length:d},(_,y)=>g[0]+y);if(b){const[_,y]=b;for(let v=_;v<=y;v++){const S=h.indexOf(v);S>=0&&h.splice(S,1)}}h.some(_=>_>=c[0]&&_<=c[1])&&(c[0]=-1,c[1]=-1)};n.$connector.clear=function(c,d,h){let _=h||m;if(!e[_]||Object.keys(e[_]).length===0)return;if(c%n.pageSize!=0)throw"Got cleared data for index "+c+" which is not aligned with the page size of "+n.pageSize;let y=Math.floor(c/n.pageSize),v=Math.ceil(d/n.pageSize);_===m&&(g=[y,y+v-1]);for(let P=0;P<v;P++){let A=y+P,E=e[_][A];n.$connector.doDeselection(E.filter(x=>C[x.key])),E.forEach(x=>n.closeItemDetails(x)),delete e[_][A],Y(A,h),le(E)}let S=t.rootCache;if(h){const P=K(_);S=t.getItemSubCache(P)}const N=c+v*n.pageSize;for(let P=c;P<N;P++)delete S.items[P],S.removeSubCache(P);he()},n.$connector.reset=function(){e={},t.clearCache(),p={},l?.cancel(),s?.cancel(),f?.cancel(),a=[],o=[],ae()},n.$connector.updateSize=c=>n.size=c,n.$connector.updateUniqueItemIdPath=c=>n.itemIdPath=c,n.$connector.expandItems=function(c){let d=Array.from(n.expandedItems);c.filter(h=>!n._isExpanded(h)).forEach(h=>d.push(h)),n.expandedItems=d},n.$connector.collapseItems=function(c){let d=Array.from(n.expandedItems);c.forEach(h=>{let _=n._getItemIndexInArray(h,d);_>=0&&d.splice(_,1)}),n.expandedItems=d,c.forEach(h=>n.$connector.removeFromQueue(h))},n.$connector.removeFromQueue=function(c){const d=t.getItemSubCache(c);Object.values(d?.pendingRequests||{}).forEach(_=>_([]));const h=n.getItemId(c);a=a.filter(_=>_.itemkey!==h),o=o.filter(_=>_.parentKey!==h)},n.$connector.confirmParent=function(c,d,h){e[d]||(e[d]={});const _=e[d].size!==h;e[d].size=h,h===0&&(e[d][0]=[]);const y=K(d),v=t.getItemSubCache(y);if(v){const{pendingRequests:S}=v;Object.entries(S).forEach(([N,P])=>{let A=p[d]||[0,0];if(e[d]&&e[d][N]||N<A[0]||N>A[1]){let E=e[d][N]||new Array(h);P(E,h)}else P&&h===0&&P([],h)}),_&&Object.keys(S).length===0&&(v.size=h,he())}n.$server.confirmParentUpdate(c,d)},n.$connector.confirm=function(c){const{pendingRequests:d}=t.rootCache;Object.entries(d).forEach(([h,_])=>{const y=p[m]||[0,0],v=n.size?Math.ceil(n.size/n.pageSize)-1:0,S=Math.min(y[1],v);e[m]?.[h]?_(e[m][h]):h<y[0]||+h>S?(_(new Array(n.pageSize)),n.requestContentUpdate()):_&&n.size===0&&_([])}),q(),b=null,g=null,n.$server.confirmUpdate(c)},n.$connector.ensureHierarchy=function(){for(let c in e)c!==m&&delete e[c];p={},t.rootCache.removeSubCaches(),ae()},n.$connector.setSelectionMode=function(c){if((typeof c=="string"||c instanceof String)&&w.indexOf(c)>=0)I=c,C={},n.selectedItems=[],n.$connector.updateMultiSelectable();else throw"Attempted to set an invalid selection mode"},n.$connector.updateMultiSelectable=function(){n.$&&(I===w[0]?n.$.table.setAttribute("aria-multiselectable",!1):I===w[1]?n.$.table.removeAttribute("aria-multiselectable"):n.$.table.setAttribute("aria-multiselectable",!0))},n._createPropertyObserver("isAttached",()=>n.$connector.updateMultiSelectable());const Q=c=>d=>{c&&(c(d),c=null)};n.$connector.setHeaderRenderer=function(c,d){const{content:h,showSorter:_,sorterPath:y}=d;if(h===null){c.headerRenderer=null;return}c.headerRenderer=Q(v=>{v.innerHTML="";let S=v;if(_){const N=document.createElement("vaadin-grid-sorter");N.setAttribute("path",y);const P=h instanceof Node?h.textContent:h;P&&N.setAttribute("aria-label",`Sort by ${P}`),v.appendChild(N),S=N}h instanceof Node?S.appendChild(h):S.textContent=h})},n._getActiveSorters=function(){return this._sorters.filter(c=>c.direction)},n.__applySorters=()=>{const c=n._mapSorters(),d=JSON.stringify(n._previousSorters)!==JSON.stringify(c);n._previousSorters=c,Ke.prototype.__applySorters.call(n),d&&!M&&n.$server.sortersChanged(c)},n.$connector.setFooterRenderer=function(c,d){const{content:h}=d;if(h===null){c.footerRenderer=null;return}c.footerRenderer=Q(_=>{_.innerHTML="",h instanceof Node?_.appendChild(h):_.textContent=h})},n.addEventListener("vaadin-context-menu-before-open",function(c){const{key:d,columnId:h}=c.detail;n.$server.updateContextMenuTargetItem(d,h)}),n.getContextMenuBeforeOpenDetail=function(c){const d=c.detail.sourceEvent||c,h=n.getEventContext(d),_=h.item?.key||"",y=h.column?.id||"";return{key:_,columnId:y}},n.preventContextMenu=function(c){const d=c.type==="click",{column:h}=n.getEventContext(c);return d&&h instanceof qr},n.addEventListener("click",c=>ce(c,"item-click")),n.addEventListener("dblclick",c=>ce(c,"item-double-click")),n.addEventListener("column-resize",c=>{n._getColumnsInOrder().filter(h=>!h.hidden).forEach(h=>{h.dispatchEvent(new CustomEvent("column-drag-resize"))}),n.dispatchEvent(new CustomEvent("column-drag-resize",{detail:{resizedColumnKey:c.detail.resizedColumn._flowId}}))}),n.addEventListener("column-reorder",c=>{const d=n._columnTree.slice(0).pop().filter(h=>h._flowId).sort((h,_)=>h._order-_._order).map(h=>h._flowId);n.dispatchEvent(new CustomEvent("column-reorder-all-columns",{detail:{columns:d}}))}),n.addEventListener("cell-focus",c=>{const d=n.getEventContext(c);["header","body","footer"].indexOf(d.section)!==-1&&n.dispatchEvent(new CustomEvent("grid-cell-focus",{detail:{itemKey:d.item?d.item.key:null,internalColumnId:d.column?d.column._flowId:null,section:d.section}}))});function ce(c,d){if(c.defaultPrevented)return;const h=c.composedPath(),_=h.findIndex(P=>P.localName==="td"||P.localName==="th"),y=h[_];if(h.slice(0,_).some(P=>y?._focusButton!==P&&Zo(P)||P instanceof HTMLLabelElement))return;const S=n.getEventContext(c),N=S.section;S.item&&N!=="details"&&(c.itemKey=S.item.key,S.column&&(c.internalColumnId=S.column._flowId),n.dispatchEvent(new CustomEvent(d,{detail:c})))}n.cellClassNameGenerator=function(c,d){const h=d.item.style;if(h)return(h.row||"")+" "+(c&&h[c._flowId]||"")},n.cellPartNameGenerator=function(c,d){const h=d.item.part;if(h)return(h.row||"")+" "+(c&&h[c._flowId]||"")},n.dropFilter=c=>c.item&&!c.item.dropDisabled,n.dragFilter=c=>c.item&&!c.item.dragDisabled,n.addEventListener("grid-dragstart",c=>{n._isSelected(c.detail.draggedItems[0])?(n.__selectionDragData?Object.keys(n.__selectionDragData).forEach(d=>{c.detail.setDragData(d,n.__selectionDragData[d])}):(n.__dragDataTypes||[]).forEach(d=>{c.detail.setDragData(d,c.detail.draggedItems.map(h=>h.dragData[d]).join(`
`))}),n.__selectionDraggedItemsCount>1&&c.detail.setDraggedItemsCount(n.__selectionDraggedItemsCount)):(n.__dragDataTypes||[]).forEach(d=>{c.detail.setDragData(d,c.detail.draggedItems[0].dragData[d])})}),n.isItemSelectable=c=>c?.selectable===void 0||c.selectable};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ml=n=>class extends Ko(n){static get properties(){return{_childColumns:{value(){return this._getChildColumns(this)}},flexGrow:{type:Number,readOnly:!0,sync:!0},width:{type:String,readOnly:!0,sync:!0},_visibleChildColumns:Array,_colSpan:Number,_rootColumns:Array}}static get observers(){return["_groupFrozenChanged(frozen, _rootColumns)","_groupFrozenToEndChanged(frozenToEnd, _rootColumns)","_groupHiddenChanged(hidden)","_colSpanChanged(_colSpan, _headerCell, _footerCell)","_groupOrderChanged(_order, _rootColumns)","_groupReorderStatusChanged(_reorderStatus, _rootColumns)","_groupResizableChanged(resizable, _rootColumns)"]}connectedCallback(){super.connectedCallback(),this._addNodeObserver(),this._updateFlexAndWidth()}disconnectedCallback(){super.disconnectedCallback(),this._observer&&this._observer.disconnect()}_columnPropChanged(t,e){t==="hidden"&&(this._preventHiddenSynchronization=!0,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1),/flexGrow|width|hidden|_childColumns/u.test(t)&&this._updateFlexAndWidth(),t==="frozen"&&!this.frozen&&(this.frozen=e),t==="lastFrozen"&&!this._lastFrozen&&(this._lastFrozen=e),t==="frozenToEnd"&&!this.frozenToEnd&&(this.frozenToEnd=e),t==="firstFrozenToEnd"&&!this._firstFrozenToEnd&&(this._firstFrozenToEnd=e)}_groupOrderChanged(t,e){if(e){const r=e.slice(0);if(!t){r.forEach(a=>{a._order=0});return}const i=/(0+)$/u.exec(t).pop().length,o=~~(Math.log(e.length)/Math.LN10)+1,s=10**(i-o);r[0]&&r[0]._order&&r.sort((a,l)=>a._order-l._order),Go(r,s,t)}}_groupReorderStatusChanged(t,e){t===void 0||e===void 0||e.forEach(r=>{r._reorderStatus=t})}_groupResizableChanged(t,e){t===void 0||e===void 0||e.forEach(r=>{r.resizable=t})}_updateVisibleChildColumns(t){this._visibleChildColumns=Array.prototype.filter.call(t,e=>!e.hidden),this._colSpan=this._visibleChildColumns.length,this._updateAutoHidden()}_updateFlexAndWidth(){if(this._visibleChildColumns){if(this._visibleChildColumns.length>0){const t=this._visibleChildColumns.reduce((e,r)=>(e+=` + ${(r.width||"0px").replace("calc","")}`,e),"").substring(3);this._setWidth(`calc(${t})`)}else this._setWidth("0px");this._setFlexGrow(Array.prototype.reduce.call(this._visibleChildColumns,(t,e)=>t+e.flexGrow,0))}}__scheduleAutoFreezeWarning(t,e){if(this._grid){const r=e.replace(/([A-Z])/gu,"-$1").toLowerCase(),i=t[0][e]||t[0].hasAttribute(r);t.every(s=>(s[e]||s.hasAttribute(r))===i)||(this._grid.__autoFreezeWarningDebouncer=D.debounce(this._grid.__autoFreezeWarningDebouncer,se,()=>{console.warn(`WARNING: Joining ${e} and non-${e} Grid columns inside the same column group! This will automatically freeze all the joined columns to avoid rendering issues. If this was intentional, consider marking each joined column explicitly as ${e}. Otherwise, exclude the ${e} columns from the joined group.`)}))}}_groupFrozenChanged(t,e){e===void 0||t===void 0||t!==!1&&(this.__scheduleAutoFreezeWarning(e,"frozen"),Array.from(e).forEach(r=>{r.frozen=t}))}_groupFrozenToEndChanged(t,e){e===void 0||t===void 0||t!==!1&&(this.__scheduleAutoFreezeWarning(e,"frozenToEnd"),Array.from(e).forEach(r=>{r.frozenToEnd=t}))}_groupHiddenChanged(t){(t||this.__groupHiddenInitialized)&&this._synchronizeHidden(),this.__groupHiddenInitialized=!0}_updateAutoHidden(){const t=this._autoHidden;this._autoHidden=(this._visibleChildColumns||[]).length===0,(t||this._autoHidden)&&(this.hidden=this._autoHidden)}_synchronizeHidden(){this._childColumns&&!this._preventHiddenSynchronization&&this._childColumns.forEach(t=>{t.hidden=this.hidden})}_colSpanChanged(t,e,r){e&&(e.setAttribute("colspan",t),this._grid&&this._grid._a11yUpdateCellColspan(e,t)),r&&(r.setAttribute("colspan",t),this._grid&&this._grid._a11yUpdateCellColspan(r,t))}_getChildColumns(t){return be.getColumns(t)}_addNodeObserver(){this._observer=new be(this,()=>{this._preventHiddenSynchronization=!0,this._rootColumns=this._getChildColumns(this),this._childColumns=this._rootColumns,this._updateVisibleChildColumns(this._childColumns),this._preventHiddenSynchronization=!1,this._grid&&this._grid._debounceUpdateColumnTree&&this._grid._debounceUpdateColumnTree()}),this._observer.flush()}_isColumnElement(t){return t.nodeType===Node.ELEMENT_NODE&&/\bcolumn\b/u.test(t.localName)}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class zl extends Ml(L){static get is(){return"vaadin-grid-column-group"}}W(zl);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Fl=Uo(class extends Yo{constructor(n){if(super(n),n.type!==ge.PROPERTY&&n.type!==ge.ATTRIBUTE&&n.type!==ge.BOOLEAN_ATTRIBUTE)throw Error("The `live` directive is not allowed on child or event bindings");if(!Lo(n))throw Error("`live` bindings can only contain a single expression")}render(n){return n}update(n,[t]){if(t===Ge||t===ga)return t;const e=n.element,r=n.name;if(n.type===ge.PROPERTY){if(t===e[r])return Ge}else if(n.type===ge.BOOLEAN_ATTRIBUTE){if(!!t===e.hasAttribute(r))return Ge}else if(n.type===ge.ATTRIBUTE&&e.getAttribute(r)===t+"")return Ge;return ta(n),t}}),qt=window;qt.Vaadin=qt.Vaadin||{};qt.Vaadin.setLitRenderer=(n,t,e,r,i,o,s)=>{const a=m=>i.map(g=>(...b)=>{m!==void 0&&r(g,m,b[0]instanceof Event?[]:[...b])}),l=["html","root","live","appId","itemKey","model","item","index",...i,`return html\`${e}\``],u=new Function(...l),f=(m,g,b)=>{const{item:w,index:C}=g;_i(u(qo,m,Fl,s,b,g,w,C,...a(b)),m)},p=(m,g,b)=>{const{item:w}=b;m.__litRenderer!==p&&(m.innerHTML="",delete m._$litPart$,m.__litRenderer=p);const C={};for(const I in w)I.startsWith(o)&&(C[I.replace(o,"")]=w[I]);f(m,{...b,item:C},w.key)};p.__rendererId=o,n[t]=p};qt.Vaadin.unsetLitRenderer=(n,t,e)=>{n[t]?.__rendererId===e&&(n[t]=void 0)};const ms=O`
  :host {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-family: var(--lumo-font-family);
    font-size: var(--lumo-font-size-m);
    line-height: var(--lumo-line-height-xs);
    padding: 0.5em calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4) 0.5em
      var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius-m) / 4));
    min-height: var(--lumo-size-m);
    outline: none;
    border-radius: var(--lumo-border-radius-m);
    cursor: var(--lumo-clickable-cursor);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
    --_selection-color-text: var(--vaadin-selection-color-text, var(--lumo-primary-text-color));
  }

  /* Checkmark */
  [part='checkmark']::before {
    display: var(--_lumo-item-selected-icon-display, none);
    content: var(--lumo-icons-checkmark);
    font-family: lumo-icons;
    font-size: var(--lumo-icon-size-m);
    line-height: 1;
    font-weight: normal;
    width: 1em;
    height: 1em;
    margin: calc((1 - var(--lumo-line-height-xs)) * var(--lumo-font-size-m) / 2) 0;
    color: var(--_selection-color-text);
    flex: none;
    opacity: 0;
    transition:
      transform 0.2s cubic-bezier(0.12, 0.32, 0.54, 2),
      opacity 0.1s;
  }

  :host([selected]) [part='checkmark']::before {
    opacity: 1;
  }

  :host([active]:not([selected])) [part='checkmark']::before {
    transform: scale(0.8);
    opacity: 0;
    transition-duration: 0s;
  }

  [part='content'] {
    flex: auto;
  }

  /* Disabled */
  :host([disabled]) {
    color: var(--lumo-disabled-text-color);
    cursor: default;
    pointer-events: none;
  }

  /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */
  @media (any-hover: hover) {
    :host(:hover:not([disabled])) {
      background-color: var(--lumo-primary-color-10pct);
    }
  }

  :host([focus-ring]:not([disabled])) {
    box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }

  /* RTL specific styles */
  :host([dir='rtl']) {
    padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    padding-right: var(--_lumo-list-box-item-padding-left, calc(var(--lumo-border-radius-m) / 4));
  }

  /* Slotted icons */
  :host ::slotted(vaadin-icon) {
    width: var(--lumo-icon-size-m);
    height: var(--lumo-icon-size-m);
  }
`;T("vaadin-item",ms,{moduleId:"lumo-item"});const Ll=O`
  /* :hover needed to workaround https://github.com/vaadin/web-components/issues/3133 */
  :host(:hover) {
    user-select: none;
    -webkit-user-select: none;
  }

  :host([role='menuitem'][menu-item-checked]) [part='checkmark']::before {
    opacity: 1;
  }

  :host([aria-haspopup='true'])::after {
    font-family: lumo-icons;
    font-size: var(--lumo-icon-size-xs);
    content: var(--lumo-icons-angle-right);
    color: var(--lumo-tertiary-text-color);
  }

  :host(:not([dir='rtl'])[aria-haspopup='true'])::after {
    margin-right: calc(var(--lumo-space-m) * -1);
    padding-left: var(--lumo-space-m);
  }

  :host([expanded]) {
    background-color: var(--lumo-primary-color-10pct);
  }

  /* RTL styles */
  :host([dir='rtl'][aria-haspopup='true'])::after {
    content: var(--lumo-icons-angle-left);
    margin-left: calc(var(--lumo-space-m) * -1);
    padding-right: var(--lumo-space-m);
  }
`;T("vaadin-context-menu-item",[ms,Ll],{moduleId:"lumo-context-menu-item"});const gs=O`
  :host {
    -webkit-tap-highlight-color: transparent;
    --_lumo-item-selected-icon-display: var(--_lumo-list-box-item-selected-icon-display, block);
  }

  /* Dividers */
  [part='items'] ::slotted(hr) {
    height: 1px;
    border: 0;
    padding: 0;
    margin: var(--lumo-space-s) var(--lumo-border-radius-m);
    background-color: var(--lumo-contrast-10pct);
  }
`;T("vaadin-list-box",gs,{moduleId:"lumo-list-box"});const Nl=O`
  :host {
    --_lumo-list-box-item-selected-icon-display: block;
  }

  /* Normal item */
  [part='items'] ::slotted([role='menuitem']) {
    -webkit-tap-highlight-color: var(--lumo-primary-color-10pct);
    cursor: default;
    outline: none;
    border-radius: var(--lumo-border-radius-m);
    padding-left: calc(var(--lumo-border-radius-m) / 4);
    padding-right: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
  }

  /* Hovered item */
  /* TODO a workaround until we have "focus-follows-mouse". After that, use the hover style for focus-ring as well */
  [part='items'] ::slotted([role='menuitem']:hover:not([disabled])),
  [part='items'] ::slotted([role='menuitem'][expanded]:not([disabled])) {
    background-color: var(--lumo-primary-color-10pct);
  }

  /* RTL styles */
  :host([dir='rtl']) [part='items'] ::slotted([role='menuitem']) {
    padding-left: calc(var(--lumo-space-l) + var(--lumo-border-radius-m) / 4);
    padding-right: calc(var(--lumo-border-radius-m) / 4);
  }

  /* Focused item */
  @media (pointer: coarse) {
    [part='items'] ::slotted([role='menuitem']:hover:not([expanded]):not([disabled])) {
      background-color: transparent;
    }
  }
`;T("vaadin-context-menu-list-box",[gs,Nl],{moduleId:"lumo-context-menu-list-box"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ys=O`
  :host([opening]),
  :host([closing]) {
    animation: 0.14s lumo-overlay-dummy-animation;
  }

  [part='overlay'] {
    will-change: opacity, transform;
  }

  :host([opening]) [part='overlay'] {
    animation: 0.1s lumo-menu-overlay-enter ease-out both;
  }

  @keyframes lumo-menu-overlay-enter {
    0% {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  :host([closing]) [part='overlay'] {
    animation: 0.1s lumo-menu-overlay-exit both;
  }

  @keyframes lumo-menu-overlay-exit {
    100% {
      opacity: 0;
    }
  }
`;T("",ys,{moduleId:"lumo-menu-overlay-core"});const Hl=O`
  /* Small viewport (bottom sheet) styles */
  /* Use direct media queries instead of the state attributes ([phone] and [fullscreen]) provided by the elements */
  @media (max-width: 450px), (max-height: 450px) {
    :host {
      top: 0 !important;
      right: 0 !important;
      bottom: var(--vaadin-overlay-viewport-bottom, 0) !important;
      left: 0 !important;
      align-items: stretch !important;
      justify-content: flex-end !important;
    }

    [part='overlay'] {
      max-height: 50vh;
      width: 100vw;
      border-radius: 0;
      box-shadow: var(--lumo-box-shadow-xl);
    }

    /* The content part scrolls instead of the overlay part, because of the gradient fade-out */
    [part='content'] {
      padding: 30px var(--lumo-space-m);
      max-height: inherit;
      box-sizing: border-box;
      -webkit-overflow-scrolling: touch;
      overflow: auto;
      -webkit-mask-image: linear-gradient(transparent, #000 40px, #000 calc(100% - 40px), transparent);
      mask-image: linear-gradient(transparent, #000 40px, #000 calc(100% - 40px), transparent);
    }

    [part='backdrop'] {
      display: block;
    }

    /* Animations */

    :host([opening]) [part='overlay'] {
      animation: 0.2s lumo-mobile-menu-overlay-enter cubic-bezier(0.215, 0.61, 0.355, 1) both;
    }

    :host([closing]),
    :host([closing]) [part='backdrop'] {
      animation-delay: 0.14s;
    }

    :host([closing]) [part='overlay'] {
      animation: 0.14s 0.14s lumo-mobile-menu-overlay-exit cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
    }
  }

  @keyframes lumo-mobile-menu-overlay-enter {
    0% {
      transform: translateY(150%);
    }
  }

  @keyframes lumo-mobile-menu-overlay-exit {
    100% {
      transform: translateY(150%);
    }
  }
`,vi=[ra,ys,Hl];T("",vi,{moduleId:"lumo-menu-overlay"});const Bl=O`
  :host([phone]) {
    /* stylelint-disable declaration-block-no-redundant-longhand-properties */
    top: 0 !important;
    right: 0 !important;
    bottom: var(--vaadin-overlay-viewport-bottom) !important;
    left: 0 !important;
    /* stylelint-enable declaration-block-no-redundant-longhand-properties */
    align-items: stretch;
    justify-content: flex-end;
  }

  /* TODO These style overrides should not be needed.
   We should instead offer a way to have non-selectable items inside the context menu. */

  :host {
    --_lumo-list-box-item-selected-icon-display: none;
    --_lumo-list-box-item-padding-left: calc(var(--lumo-space-m) + var(--lumo-border-radius-m) / 4);
  }

  [part='overlay'] {
    outline: none;
  }
`;T("vaadin-context-menu-overlay",[vi,Bl],{moduleId:"lumo-context-menu-overlay"});/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */na({name:"vaadin-contextmenu",deps:["touchstart","touchmove","touchend","contextmenu"],flow:{start:["touchstart","contextmenu"],end:["contextmenu"]},emits:["vaadin-contextmenu"],info:{sourceEvent:null},reset(){this.info.sourceEvent=null,this._cancelTimer(),this.info.touchJob=null,this.info.touchStartCoords=null},_cancelTimer(){this._timerId&&(clearTimeout(this._timerId),delete this._fired)},_setSourceEvent(n){this.info.sourceEvent=n;const t=n.composedPath();this.info.sourceEvent.__composedPath=t},touchstart(n){this._setSourceEvent(n),this.info.touchStartCoords={x:n.changedTouches[0].clientX,y:n.changedTouches[0].clientY};const t=n.composedPath()[0]||n.target;this._timerId=setTimeout(()=>{const e=n.changedTouches[0];n.shiftKey||(Le&&(this._fired=!0,this.fire(t,e.clientX,e.clientY)),Ai("tap"))},500)},touchmove(n){const e=this.info.touchStartCoords;(Math.abs(e.x-n.changedTouches[0].clientX)>15||Math.abs(e.y-n.changedTouches[0].clientY)>15)&&this._cancelTimer()},touchend(n){this._fired&&n.preventDefault(),this._cancelTimer()},contextmenu(n){if(!n.shiftKey){if(this._setSourceEvent(n),Eo&&Ze()){const t=n.composedPath()[0],e=t.getBoundingClientRect();this.fire(t,e.left,e.bottom)}else this.fire(n.target,n.clientX,n.clientY);Ai("tap")}},fire(n,t,e){const r=this.info.sourceEvent,i=new Event("vaadin-contextmenu",{bubbles:!0,cancelable:!0,composed:!0});i.detail={x:t,y:e,sourceEvent:r},n.dispatchEvent(i),i.defaultPrevented&&r&&r.preventDefault&&r.preventDefault()}});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Vl=n=>class extends ko(No(n)){static get properties(){return{_hasVaadinItemMixin:{value:!0},selected:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_selectedChanged",sync:!0},_value:String}}get _activeKeys(){return["Enter"," "]}get value(){return this._value!==void 0?this._value:this.textContent.trim()}set value(e){this._value=e}ready(){super.ready();const e=this.getAttribute("value");e!==null&&(this.value=e)}focus(e){this.disabled||super.focus(e)}_shouldSetActive(e){return!this.disabled&&!(e.type==="keydown"&&e.defaultPrevented)}_selectedChanged(e){this.setAttribute("aria-selected",e)}_disabledChanged(e){super._disabledChanged(e),e&&(this.selected=!1,this.blur())}_onKeyDown(e){super._onKeyDown(e),this._activeKeys.includes(e.key)&&!e.defaultPrevented&&(e.preventDefault(),this.click())}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Wl extends Vl(J(we(L))){static get is(){return"vaadin-context-menu-item"}static get template(){return G`
      <style>
        :host {
          display: inline-block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("role","menuitem")}}W(Wl);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Yl extends ja(J(we(Ae(L)))){static get is(){return"vaadin-context-menu-list-box"}static get template(){return G`
      <style>
        :host {
          display: flex;
        }

        :host([hidden]) {
          display: none !important;
        }

        [part='items'] {
          height: 100%;
          width: 100%;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
      </style>
      <div part="items">
        <slot></slot>
      </div>
    `}static get properties(){return{orientation:{readOnly:!0}}}get _scrollerElement(){return this.shadowRoot.querySelector('[part="items"]')}ready(){super.ready(),this.setAttribute("role","menu")}}W(Yl);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ul=n=>class extends ia(Ho(n)){static get properties(){return{parentOverlay:{type:Object,readOnly:!0},_theme:{type:String,readOnly:!0,sync:!0}}}static get observers(){return["_themeChanged(_theme)"]}ready(){super.ready(),this.restoreFocusOnClose=!0,this.addEventListener("keydown",e=>{if(!e.defaultPrevented&&e.composedPath()[0]===this.$.overlay&&[38,40].indexOf(e.keyCode)>-1){const r=this.getFirstChild();r&&Array.isArray(r.items)&&r.items.length&&(e.preventDefault(),e.keyCode===38?r.items[r.items.length-1].focus():r.focus())}})}getFirstChild(){return this.querySelector(":not(style):not(slot)")}_themeChanged(){this.close()}getBoundaries(){const e=this.getBoundingClientRect(),r=this.$.overlay.getBoundingClientRect();let i=e.bottom-r.height;const o=this.parentOverlay;if(o&&o.hasAttribute("bottom-aligned")){const s=getComputedStyle(o);i=i-parseFloat(s.bottom)-parseFloat(s.height)}return{xMax:e.right-r.width,xMin:e.left+r.width,yMax:i}}_updatePosition(){if(super._updatePosition(),this.positionTarget&&this.parentOverlay){const e=this.$.content,r=getComputedStyle(e);!!this.style.left?this.style.left=`${parseFloat(this.style.left)+parseFloat(r.paddingLeft)}px`:this.style.right=`${parseFloat(this.style.right)+parseFloat(r.paddingRight)}px`,!!this.style.bottom?this.style.bottom=`${parseFloat(this.style.bottom)-parseFloat(r.paddingBottom)}px`:this.style.top=`${parseFloat(this.style.top)-parseFloat(r.paddingTop)}px`}}_shouldRestoreFocus(){return this.parentOverlay?!1:super._shouldRestoreFocus()}_deepContains(e){let r=To(this.localName,e);for(;r;){if(r===this)return!0;r=r.parentOverlay}return!1}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ql=O`
  :host {
    align-items: flex-start;
    justify-content: flex-start;
  }

  :host([right-aligned]),
  :host([end-aligned]) {
    align-items: flex-end;
  }

  :host([bottom-aligned]) {
    justify-content: flex-end;
  }

  [part='overlay'] {
    background-color: #fff;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid !important;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-context-menu-overlay",[Bo,ql],{moduleId:"vaadin-context-menu-overlay-styles"});class jl extends Ul(Vo(we(J(L)))){static get is(){return"vaadin-context-menu-overlay"}static get template(){return G`
      <div id="backdrop" part="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay" tabindex="0">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}}W(jl);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class wi{constructor(t,e){this.query=t,this.callback=e,this._boundQueryHandler=this._queryHandler.bind(this)}hostConnected(){this._removeListener(),this._mediaQuery=window.matchMedia(this.query),this._addListener(),this._queryHandler(this._mediaQuery)}hostDisconnected(){this._removeListener()}_addListener(){this._mediaQuery&&this._mediaQuery.addListener(this._boundQueryHandler)}_removeListener(){this._mediaQuery&&this._mediaQuery.removeListener(this._boundQueryHandler),this._mediaQuery=null}_queryHandler(t){typeof this.callback=="function"&&this.callback(t.matches)}}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Gl=n=>class extends n{static get properties(){return{items:{type:Array,sync:!0}}}constructor(){super(),this.__itemsOutsideClickListener=e=>{this._shouldCloseOnOutsideClick(e)&&this.dispatchEvent(new CustomEvent("items-outside-click"))},this.addEventListener("items-outside-click",()=>{this.items&&this.close()})}get _tagNamePrefix(){return"vaadin-context-menu"}connectedCallback(){super.connectedCallback(),document.documentElement.addEventListener("click",this.__itemsOutsideClickListener)}disconnectedCallback(){super.disconnectedCallback(),document.documentElement.removeEventListener("click",this.__itemsOutsideClickListener)}_shouldCloseOnOutsideClick(e){return!e.composedPath().some(r=>r.localName===`${this._tagNamePrefix}-overlay`)}__forwardFocus(){const e=this._overlayElement,r=e.getFirstChild();if(e.parentOverlay){const i=e.parentOverlay.querySelector("[expanded]");i&&i.hasAttribute("focused")&&r?r.focus():e.$.overlay.focus()}else r&&r.focus()}__openSubMenu(e,r,i){this.__updateSubMenuForItem(e,r),e.overlayClass=i;const o=this._overlayElement,s=e._overlayElement;s.noHorizontalOverlap=!0,s._setParentOverlay(o),o.hasAttribute("theme")?e.setAttribute("theme",o.getAttribute("theme")):e.removeAttribute("theme");const a=s.$.content;a.style.minWidth="",r.dispatchEvent(new CustomEvent("opensubmenu",{detail:{children:r._item.children}}))}__updateSubMenuForItem(e,r){e.items=r._item.children,e.listenOn=r,e._overlayElement.positionTarget=r}__createComponent(e){let r;return e.component instanceof HTMLElement?r=e.component:r=document.createElement(e.component||`${this._tagNamePrefix}-item`),r._hasVaadinItemMixin&&(r.setAttribute("role","menuitem"),r.tabIndex=-1),r.localName==="hr"?r.setAttribute("role","separator"):r.setAttribute("aria-haspopup","false"),this._setMenuItemTheme(r,e,this._theme),r._item=e,e.text&&(r.textContent=e.text),e.className&&r.setAttribute("class",e.className),this.__toggleMenuComponentAttribute(r,"menu-item-checked",e.checked),this.__toggleMenuComponentAttribute(r,"disabled",e.disabled),e.children&&e.children.length&&(this.__updateExpanded(r,!1),r.setAttribute("aria-haspopup","true")),r}__initListBox(){const e=document.createElement(`${this._tagNamePrefix}-list-box`);return this._theme&&e.setAttribute("theme",this._theme),e.addEventListener("selected-changed",r=>{const{value:i}=r.detail;if(typeof i=="number"){const o=e.items[i]._item;e.selected=null,o.children||this.dispatchEvent(new CustomEvent("item-selected",{detail:{value:o}}))}}),e}__initOverlay(){const e=this._overlayElement;e.$.backdrop.addEventListener("click",()=>{this.close()}),e.addEventListener(Er?"click":"mouseover",r=>{this.__showSubMenu(r)}),e.addEventListener("keydown",r=>{const{key:i}=r,o=this.__isRTL,s=i==="ArrowRight",a=i==="ArrowLeft";!o&&s||o&&a||i==="Enter"||i===" "?this.__showSubMenu(r):!o&&a||o&&s||i==="Escape"?(i==="Escape"&&r.stopPropagation(),this.close(),this.listenOn.focus()):i==="Tab"&&!r.defaultPrevented&&this.dispatchEvent(new CustomEvent("close-all-menus"))})}__initSubMenu(){const e=document.createElement(this.constructor.is);return e._modeless=!0,e.openOn="opensubmenu",e.setAttribute("hidden",""),this.addEventListener("opened-changed",r=>{r.detail.value||this._subMenu.close()}),e.addEventListener("close-all-menus",()=>{this.dispatchEvent(new CustomEvent("close-all-menus"))}),e.addEventListener("item-selected",r=>{const{detail:i}=r;this.dispatchEvent(new CustomEvent("item-selected",{detail:i}))}),this.addEventListener("close-all-menus",()=>{this._overlayElement.close()}),this.addEventListener("item-selected",r=>{const i=r.target,o=r.detail.value,s=i.items.indexOf(o);o.keepOpen&&s>-1&&i.opened?(i.__selectedIndex=s,i.requestContentUpdate()):o.keepOpen||this.close()}),e.addEventListener("opened-changed",r=>{if(!r.detail.value){const i=this._listBox.querySelector("[expanded]");i&&this.__updateExpanded(i,!1)}}),e}__showSubMenu(e,r=e.composedPath().find(i=>i.localName===`${this._tagNamePrefix}-item`)){if(!this.__openListenerActive)return;if(this._overlayElement.hasAttribute("opening")){requestAnimationFrame(()=>{this.__showSubMenu(e,r)});return}const i=this._subMenu;if(r){const{children:o}=r._item,s=i._overlayElement.getFirstChild(),a=s&&s.focused;if(i.items!==o&&i.close(),!this.opened)return;if(o&&o.length){this.__updateExpanded(r,!0);const{overlayClass:l}=this;this.__openSubMenu(i,r,l)}else a?i.listenOn.focus():this._listBox.focused||this._overlayElement.$.overlay.focus()}}__getListBox(){return this._overlayElement.querySelector(`${this._tagNamePrefix}-list-box`)}__itemsRenderer(e,r){this.__initMenu(e,r);const i=e.querySelector(this.constructor.is);i.closeOn=r.closeOn;const o=this.__getListBox();o.innerHTML="",r.items.forEach(s=>{const a=this.__createComponent(s);o.appendChild(a)})}_setMenuItemTheme(e,r,i){let o=e.getAttribute("theme")||i;r.theme!=null&&(o=Array.isArray(r.theme)?r.theme.join(" "):r.theme),this.__updateTheme(e,o)}__toggleMenuComponentAttribute(e,r,i){i?(e.setAttribute(r,""),e[`__has-${r}`]=!0):e[`__has-${r}`]&&(e.removeAttribute(r),e[`__has-${r}`]=!1)}__initMenu(e,r){if(e.firstElementChild)this.__updateTheme(this._listBox,this._theme);else{this.__initOverlay();const i=this.__initListBox();this._listBox=i,e.appendChild(i);const o=this.__initSubMenu();this._subMenu=o,e.appendChild(o),requestAnimationFrame(()=>{this.__openListenerActive=!0})}}__updateExpanded(e,r){e.setAttribute("aria-expanded",r.toString()),e.toggleAttribute("expanded",r)}__updateTheme(e,r){r?e.setAttribute("theme",r):e.removeAttribute("theme")}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Kl=n=>class extends Gl(n){static get properties(){return{selector:{type:String},opened:{type:Boolean,value:!1,notify:!0,readOnly:!0},openOn:{type:String,value:"vaadin-contextmenu",sync:!0},listenOn:{type:Object,sync:!0,value(){return this}},closeOn:{type:String,value:"click",observer:"_closeOnChanged",sync:!0},renderer:{type:Function,sync:!0},_modeless:{type:Boolean,sync:!0},_context:{type:Object,sync:!0},_phone:{type:Boolean},_fullscreen:{type:Boolean},_fullscreenMediaQuery:{type:String,value:"(max-width: 450px), (max-height: 450px)"}}}static get observers(){return["_openedChanged(opened)","_targetOrOpenOnChanged(listenOn, openOn)","_rendererChanged(renderer, items)","_fullscreenChanged(_fullscreen)","_overlayContextChanged(_overlayElement, _context)","_overlayModelessChanged(_overlayElement, _modeless)","_overlayPhoneChanged(_overlayElement, _phone)","_overlayThemeChanged(_overlayElement, _theme)"]}constructor(){super(),this._createOverlay(),this._boundOpen=this.open.bind(this),this._boundClose=this.close.bind(this),this._boundPreventDefault=this._preventDefault.bind(this),this._boundOnGlobalContextMenu=this._onGlobalContextMenu.bind(this)}connectedCallback(){super.connectedCallback(),this.__boundOnScroll=this.__onScroll.bind(this),window.addEventListener("scroll",this.__boundOnScroll,!0),this.__restoreOpened&&this._setOpened(!0)}disconnectedCallback(){super.disconnectedCallback(),window.removeEventListener("scroll",this.__boundOnScroll,!0),this.__restoreOpened=this.opened,this.close()}ready(){super.ready(),this.addController(new wi(this._fullscreenMediaQuery,e=>{this._fullscreen=e}))}_createOverlay(){const e=document.createElement(`${this._tagNamePrefix}-overlay`);e.owner=this,e.addEventListener("opened-changed",r=>{this._onOverlayOpened(r)}),e.addEventListener("vaadin-overlay-open",r=>{this._onVaadinOverlayOpen(r)}),this._overlayElement=e}_onOverlayOpened(e){const r=e.detail.value;this._setOpened(r),r&&this.__alignOverlayPosition()}_onVaadinOverlayOpen(){this.__alignOverlayPosition(),this._overlayElement.style.visibility="",this.__forwardFocus()}_overlayContextChanged(e,r){e&&(e.model=r)}_overlayModelessChanged(e,r){e&&(e.modeless=r)}_overlayPhoneChanged(e,r){e&&(e.toggleAttribute("phone",r),e.withBackdrop=r)}_overlayThemeChanged(e,r){e&&(r?e.setAttribute("theme",r):e.removeAttribute("theme"))}_targetOrOpenOnChanged(e,r){this._oldListenOn&&this._oldOpenOn&&(this._unlisten(this._oldListenOn,this._oldOpenOn,this._boundOpen),this._oldListenOn.style.webkitTouchCallout="",this._oldListenOn.style.webkitUserSelect="",this._oldListenOn.style.userSelect="",this._oldListenOn=null,this._oldOpenOn=null),e&&r&&(this._listen(e,r,this._boundOpen),this._oldListenOn=e,this._oldOpenOn=r)}_fullscreenChanged(e){this._phone=e}__setListenOnUserSelect(e){const r=e?"none":"";this.listenOn.style.webkitTouchCallout=r,this.listenOn.style.webkitUserSelect=r,this.listenOn.style.userSelect=r,e&&document.getSelection().removeAllRanges()}_closeOnChanged(e,r){const i="vaadin-overlay-outside-click",o=this._overlayElement;r&&this._unlisten(o,r,this._boundClose),e?(this._listen(o,e,this._boundClose),o.removeEventListener(i,this._boundPreventDefault)):o.addEventListener(i,this._boundPreventDefault)}_preventDefault(e){e.preventDefault()}_openedChanged(e){e?document.documentElement.addEventListener("contextmenu",this._boundOnGlobalContextMenu,!0):document.documentElement.removeEventListener("contextmenu",this._boundOnGlobalContextMenu,!0),this.__setListenOnUserSelect(e),this._overlayElement.opened=e}requestContentUpdate(){this._overlayElement&&(this.__preserveMenuState(),this._overlayElement.requestContentUpdate(),this.__restoreMenuState())}_rendererChanged(e,r){if(r){if(e)throw new Error("The items API cannot be used together with a renderer");this.closeOn==="click"&&(this.closeOn=""),e=this.__itemsRenderer}this._overlayElement.renderer=e}close(){this._setOpened(!1)}_contextTarget(e){if(this.selector){const r=this.listenOn.querySelectorAll(this.selector);return Array.prototype.filter.call(r,i=>e.composedPath().indexOf(i)>-1)[0]}return e.target}open(e){e&&!this.opened&&(this._context={detail:e.detail,target:this._contextTarget(e)},this._context.target&&(e.preventDefault(),e.stopPropagation(),this.__x=this._getEventCoordinate(e,"x"),this.__pageXOffset=window.pageXOffset,this.__y=this._getEventCoordinate(e,"y"),this.__pageYOffset=window.pageYOffset,this._overlayElement.style.visibility="hidden",this._setOpened(!0)))}__preserveMenuState(){const e=this.__getListBox();e&&(this.__focusedIndex=e.items.indexOf(e.focused),this._subMenu&&this._subMenu.opened&&(this.__subMenuIndex=e.items.indexOf(this._subMenu.listenOn)))}__restoreMenuState(){const e=this.__focusedIndex,r=this.__subMenuIndex,i=this.__selectedIndex,o=this.__getListBox();if(o){if(o._observer.flush(),r>-1){const s=o.items[r];s?Array.isArray(s._item.children)&&s._item.children.length?(this.__updateSubMenuForItem(this._subMenu,s),this._subMenu.requestContentUpdate()):(this._subMenu.close(),this.__focusItem(s)):o.focus()}this.__focusItem(i>-1?o.children[i]:o.items[e])}this.__focusedIndex=void 0,this.__subMenuIndex=void 0,this.__selectedIndex=void 0}__focusItem(e){e&&e.focus({focusVisible:Ze()})}__onScroll(){if(!this.opened)return;const e=window.pageYOffset-this.__pageYOffset,r=window.pageXOffset-this.__pageXOffset;this.__adjustPosition("left",-r),this.__adjustPosition("right",r),this.__adjustPosition("top",-e),this.__adjustPosition("bottom",e),this.__pageYOffset+=e,this.__pageXOffset+=r}__adjustPosition(e,r){const o=this._overlayElement.style;o[e]=`${(parseInt(o[e])||0)+r}px`}__alignOverlayPosition(){const e=this._overlayElement;if(e.positionTarget)return;const r=e.style;["top","right","bottom","left"].forEach(p=>r.removeProperty(p)),["right-aligned","end-aligned","bottom-aligned"].forEach(p=>e.removeAttribute(p));const{xMax:i,xMin:o,yMax:s}=e.getBoundaries(),a=this.__x,l=this.__y,u=document.documentElement.clientWidth,f=document.documentElement.clientHeight;this.__isRTL?a>u/2||a>o?r.right=`${Math.max(0,u-a)}px`:(r.left=`${a}px`,this._setEndAligned(e)):a<u/2||a<i?r.left=`${a}px`:(r.right=`${Math.max(0,u-a)}px`,this._setEndAligned(e)),l<f/2||l<s?r.top=`${l}px`:(r.bottom=`${Math.max(0,f-l)}px`,e.setAttribute("bottom-aligned",""))}_setEndAligned(e){e.setAttribute("end-aligned",""),this.__isRTL||e.setAttribute("right-aligned","")}_getEventCoordinate(e,r){if(e.detail instanceof Object){if(e.detail[r])return e.detail[r];if(e.detail.sourceEvent)return this._getEventCoordinate(e.detail.sourceEvent,r)}else{const i=`client${r.toUpperCase()}`,o=e.changedTouches?e.changedTouches[0][i]:e[i];if(o===0){const s=e.target.getBoundingClientRect();return r==="x"?s.left:s.top+s.height}return o}}_listen(e,r,i){Bt[r]?ne(e,r,i):e.addEventListener(r,i)}_unlisten(e,r,i){Bt[r]?Wo(e,r,i):e.removeEventListener(r,i)}__createMouseEvent(e,r,i){return new MouseEvent(e,{bubbles:!0,composed:!0,cancelable:!0,clientX:r,clientY:i})}__focusClosestFocusable(e){let r=e;for(;r;){if(r instanceof HTMLElement&&ci(r)){r.focus();return}r=r.parentNode||r.host}}__contextMenuAt(e,r){const i=oa(e,r);i&&queueMicrotask(()=>{i.dispatchEvent(this.__createMouseEvent("mousedown",e,r)),i.dispatchEvent(this.__createMouseEvent("mouseup",e,r)),this.__focusClosestFocusable(i),i.dispatchEvent(this.__createMouseEvent("contextmenu",e,r))})}_onGlobalContextMenu(e){e.shiftKey||(Br||Le||(e.stopPropagation(),this._overlayElement.__focusRestorationController.focusNode=null,this._overlayElement.addEventListener("vaadin-overlay-closed",()=>this.__contextMenuAt(e.clientX,e.clientY),{once:!0})),e.preventDefault(),this.close())}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ql extends Kl(fi(Ae(Te(jo(L))))){static get template(){return G`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>

      <slot id="slot"></slot>
    `}static get is(){return"vaadin-context-menu"}ready(){super.ready(),Ar(this)}_attachDom(t){const e=this.attachShadow({mode:"open"});return e.appendChild(t),e.appendChild(this._overlayElement),e}}W(Ql);function Xl(n,t){try{return window.Vaadin.Flow.clients[n].getByNodeId(t)}catch(e){console.error("Could not get node %s from app %s",t,n),console.error(e)}}function Zl(n,t){n.$connector||(n.$connector={generateItems(e){const r=Ci(t,e);n.items=r}})}function Ci(n,t){const e=Xl(n,t);if(e)return Array.from(e.children).map(r=>{const i={component:r,checked:r._checked,keepOpen:r._keepOpen,className:r.className,theme:r.__theme};return r._hasVaadinItemMixin&&r._containerNodeId&&(i.children=Ci(n,r._containerNodeId)),r._item=i,i})}function Jl(n,t){n._item&&(n._item.checked=t,n._item.keepOpen&&n.toggleAttribute("menu-item-checked",t))}function ec(n,t){n._item&&(n._item.keepOpen=t)}function tc(n,t){n._item&&(n._item.theme=t)}window.Vaadin.Flow.contextMenuConnector={initLazy:Zl,generateItemsTree:Ci,setChecked:Jl,setKeepOpen:ec,setTheme:tc};function rc(n){n.$contextMenuTargetConnector||(n.$contextMenuTargetConnector={openOnHandler(t){if(n.preventContextMenu&&n.preventContextMenu(t))return;t.preventDefault(),t.stopPropagation(),this.$contextMenuTargetConnector.openEvent=t;let e={};n.getContextMenuBeforeOpenDetail&&(e=n.getContextMenuBeforeOpenDetail(t)),n.dispatchEvent(new CustomEvent("vaadin-context-menu-before-open",{detail:e}))},updateOpenOn(t){this.removeListener(),this.openOnEventType=t,customElements.whenDefined("vaadin-context-menu").then(()=>{Bt[t]?ne(n,t,this.openOnHandler):n.addEventListener(t,this.openOnHandler)})},removeListener(){this.openOnEventType&&(Bt[this.openOnEventType]?Wo(n,this.openOnEventType,this.openOnHandler):n.removeEventListener(this.openOnEventType,this.openOnHandler))},openMenu(t){t.open(this.openEvent)},removeConnector(){this.removeListener(),n.$contextMenuTargetConnector=void 0}})}window.Vaadin.Flow.contextMenuTargetConnector={init:rc};const nc=O`
  [part='overlay'] {
    /*
  Width:
      date cell widths
    + month calendar side padding
    + year scroller width
  */
    /* prettier-ignore */
    width:
    calc(
        var(--lumo-size-m) * 7
      + var(--lumo-space-xs) * 2
      + 57px
    );
    height: 100%;
    max-height: calc(var(--lumo-size-m) * 14);
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;
    flex-direction: column;
  }

  [part='content'] {
    padding: 0;
    height: 100%;
    overflow: hidden;
    -webkit-mask-image: none;
    mask-image: none;
  }

  :host([top-aligned]) [part~='overlay'] {
    margin-top: var(--lumo-space-xs);
  }

  :host([bottom-aligned]) [part~='overlay'] {
    margin-bottom: var(--lumo-space-xs);
  }

  @media (max-width: 450px), (max-height: 450px) {
    [part='overlay'] {
      width: 100vw;
      height: 70vh;
      max-height: 70vh;
    }
  }
`;T("vaadin-date-picker-overlay",[vi,nc],{moduleId:"lumo-date-picker-overlay"});T("vaadin-date-picker-year",O`
    :host([current]) [part='year-number'] {
      color: var(--lumo-primary-text-color);
    }

    :host(:not([current])) [part='year-number'],
    [part='year-separator'] {
      opacity: var(--_lumo-date-picker-year-opacity, 0.7);
      transition: 0.2s opacity;
    }

    [part='year-number'],
    [part='year-separator'] {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50%;
      transform: translateY(-50%);
    }

    [part='year-separator']::after {
      color: var(--lumo-disabled-text-color);
      content: '\\2022';
    }
  `,{moduleId:"lumo-date-picker-year"});T("vaadin-date-picker-overlay-content",O`
    :host {
      position: relative;
      /* Background for the year scroller, placed here as we are using a mask image on the actual years part */
      background-image: linear-gradient(var(--lumo-shade-5pct), var(--lumo-shade-5pct));
      background-size: 57px 100%;
      background-position: top right;
      background-repeat: no-repeat;
      cursor: default;
    }

    ::slotted([slot='months']) {
      /* Month calendar height:
              header height + margin-bottom
            + weekdays height + margin-bottom
            + date cell heights
            + small margin between month calendars
        */
      /* prettier-ignore */
      --vaadin-infinite-scroller-item-height:
          calc(
              var(--lumo-font-size-l) + var(--lumo-space-m)
            + var(--lumo-font-size-xs) + var(--lumo-space-s)
            + var(--lumo-size-m) * 6
            + var(--lumo-space-s)
          );
      --vaadin-infinite-scroller-buffer-offset: 10%;
      -webkit-mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);
      mask-image: linear-gradient(transparent, #000 10%, #000 85%, transparent);
      position: relative;
      margin-right: 57px;
    }

    ::slotted([slot='years']) {
      /* TODO get rid of fixed magic number */
      --vaadin-infinite-scroller-buffer-width: 97px;
      width: 57px;
      height: auto;
      top: 0;
      bottom: 0;
      font-size: var(--lumo-font-size-s);
      box-shadow: inset 2px 0 4px 0 var(--lumo-shade-5pct);
      -webkit-mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);
      mask-image: linear-gradient(transparent, #000 35%, #000 65%, transparent);
      cursor: var(--lumo-clickable-cursor);
    }

    ::slotted([slot='years']:hover) {
      --_lumo-date-picker-year-opacity: 1;
    }

    /* TODO unsupported selector */
    #scrollers {
      position: static;
      display: block;
    }

    /* TODO fix this in vaadin-date-picker that it adapts to the width of the year scroller */
    :host([desktop]) ::slotted([slot='months']) {
      right: auto;
    }

    /* Year scroller position indicator */
    ::slotted([slot='years'])::before {
      border: none;
      width: 1em;
      height: 1em;
      background-color: var(--lumo-base-color);
      background-image: linear-gradient(var(--lumo-tint-5pct), var(--lumo-tint-5pct));
      transform: translate(-75%, -50%) rotate(45deg);
      border-top-right-radius: var(--lumo-border-radius-s);
      box-shadow: 2px -2px 6px 0 var(--lumo-shade-5pct);
      z-index: 1;
    }

    [part='toolbar'] {
      padding: var(--lumo-space-s);
      border-bottom-left-radius: var(--lumo-border-radius-l);
      margin-right: 57px;
    }

    [part='toolbar'] ::slotted(vaadin-button) {
      margin: 0;
    }

    /* Narrow viewport mode (fullscreen) */

    :host([fullscreen]) [part='toolbar'] {
      order: -1;
      background-color: var(--lumo-base-color);
    }

    :host([fullscreen]) [part='overlay-header'] {
      order: -2;
      height: var(--lumo-size-m);
      padding: var(--lumo-space-s);
      position: absolute;
      left: 0;
      right: 0;
      justify-content: center;
    }

    :host([fullscreen]) [part='toggle-button'],
    :host([fullscreen]) [part='clear-button'],
    [part='overlay-header'] [part='label'] {
      display: none;
    }

    /* Very narrow screen (year scroller initially hidden) */

    [part='years-toggle-button'] {
      display: flex;
      align-items: center;
      height: var(--lumo-size-s);
      padding: 0 0.5em;
      border-radius: var(--lumo-border-radius-m);
      z-index: 3;
      color: var(--lumo-primary-text-color);
      font-weight: 500;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    :host([years-visible]) [part='years-toggle-button'] {
      background-color: var(--lumo-primary-color);
      color: var(--lumo-primary-contrast-color);
    }

    /* TODO magic number (same as used for media-query in vaadin-date-picker-overlay-content) */
    @media screen and (max-width: 374px) {
      :host {
        background-image: none;
      }

      [part='toolbar'],
      ::slotted([slot='months']) {
        margin-right: 0;
      }

      /* TODO make date-picker adapt to the width of the years part */
      ::slotted([slot='years']) {
        --vaadin-infinite-scroller-buffer-width: 90px;
        width: 50px;
        background-color: var(--lumo-shade-5pct);
      }

      :host([years-visible]) ::slotted([slot='months']) {
        padding-left: 50px;
      }
    }
  `,{moduleId:"lumo-date-picker-overlay-content"});T("vaadin-month-calendar",O`
    :host {
      -webkit-user-select: none;
      -webkit-tap-highlight-color: transparent;
      user-select: none;
      font-size: var(--lumo-font-size-m);
      color: var(--lumo-body-text-color);
      text-align: center;
      padding: 0 var(--lumo-space-xs);
      --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
      --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
      --_selection-color: var(--vaadin-selection-color, var(--lumo-primary-color));
      --_selection-color-text: var(--vaadin-selection-color-text, var(--lumo-primary-text-color));
    }

    /* Month header */

    [part='month-header'] {
      color: var(--lumo-header-text-color);
      font-size: var(--lumo-font-size-l);
      line-height: 1;
      font-weight: 500;
      margin-bottom: var(--lumo-space-m);
    }

    /* Week days and numbers */

    [part='weekdays'],
    [part='weekday'],
    [part='week-number'] {
      font-size: var(--lumo-font-size-xxs);
      line-height: 1;
      color: var(--lumo-secondary-text-color);
    }

    [part='weekdays'] {
      margin-bottom: var(--lumo-space-s);
    }

    [part='weekday']:empty,
    [part='week-number'] {
      width: var(--lumo-size-xs);
    }

    /* Date and week number cells */

    [part~='date'],
    [part='week-number'] {
      box-sizing: border-box;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: var(--lumo-size-m);
      position: relative;
    }

    [part~='date'] {
      transition: color 0.1s;
    }

    [part~='date']:not(:empty) {
      cursor: var(--lumo-clickable-cursor);
    }

    :host([week-numbers]) [part='weekday']:not(:empty),
    :host([week-numbers]) [part~='date'] {
      width: calc((100% - var(--lumo-size-xs)) / 7);
    }

    /* Today date */

    [part~='date'][part~='today'] {
      color: var(--_selection-color-text);
    }

    /* Focused date */

    [part~='date']::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      min-width: 2em;
      min-height: 2em;
      width: 80%;
      height: 80%;
      max-height: 100%;
      max-width: 100%;
      border-radius: var(--lumo-border-radius-m);
    }

    [part~='date'][part~='focused']::before {
      box-shadow:
        0 0 0 1px var(--lumo-base-color),
        0 0 0 calc(var(--_focus-ring-width) + 1px) var(--_focus-ring-color);
    }

    :host(:not([focused])) [part~='date'][part~='focused']::before {
      animation: vaadin-date-picker-month-calendar-focus-date 1.4s infinite;
    }

    @keyframes vaadin-date-picker-month-calendar-focus-date {
      50% {
        box-shadow:
          0 0 0 1px var(--lumo-base-color),
          0 0 0 calc(var(--_focus-ring-width) + 1px) transparent;
      }
    }

    [part~='date']:not(:empty):not([part~='disabled']):not([part~='selected']):hover::before {
      background-color: var(--lumo-primary-color-10pct);
    }

    [part~='date'][part~='selected'] {
      color: var(--lumo-primary-contrast-color);
    }

    [part~='date'][part~='selected']::before {
      background-color: var(--_selection-color);
    }

    [part~='date'][part~='disabled'] {
      color: var(--lumo-disabled-text-color);
    }

    @media (pointer: coarse) {
      [part~='date']:hover:not([part~='selected'])::before,
      :host(:not([focus-ring])) [part~='focused']:not([part~='selected'])::before {
        display: none;
      }

      [part~='date']:not(:empty):not([part~='disabled']):active::before {
        display: block;
      }

      :host(:not([focus-ring])) [part~='date'][part~='selected']::before {
        box-shadow: none;
      }
    }
    /* Disabled */

    :host([disabled]) * {
      color: var(--lumo-disabled-text-color) !important;
    }
  `,{moduleId:"lumo-month-calendar"});T("vaadin-input-container",O`
    :host {
      background: var(--_background);
      padding: 0 calc(0.375em + var(--_input-container-radius) / 4 - 1px);
      font-weight: var(--vaadin-input-field-value-font-weight, 500);
      line-height: 1;
      position: relative;
      cursor: text;
      box-sizing: border-box;
      border-radius:
        /* See https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius#syntax */
        var(--vaadin-input-field-top-start-radius, var(--_input-container-radius))
        var(--vaadin-input-field-top-end-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-end-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-start-radius, var(--_input-container-radius));
      /* Fallback */
      --_input-container-radius: var(--vaadin-input-field-border-radius, var(--lumo-border-radius-m));
      --_input-height: var(--lumo-text-field-size, var(--lumo-size-m));
      /* Default values */
      --_background: var(--vaadin-input-field-background, var(--lumo-contrast-10pct));
      --_hover-highlight: var(--vaadin-input-field-hover-highlight, var(--lumo-contrast-50pct));
      --_input-border-color: var(--vaadin-input-field-border-color, var(--lumo-contrast-50pct));
      --_icon-color: var(--vaadin-input-field-icon-color, var(--lumo-contrast-60pct));
      --_icon-size: var(--vaadin-input-field-icon-size, var(--lumo-icon-size-m));
      --_invalid-background: var(--vaadin-input-field-invalid-background, var(--lumo-error-color-10pct));
      --_invalid-hover-highlight: var(--vaadin-input-field-invalid-hover-highlight, var(--lumo-error-color-50pct));
      --_disabled-background: var(--vaadin-input-field-disabled-background, var(--lumo-contrast-5pct));
      --_disabled-value-color: var(--vaadin-input-field-disabled-value-color, var(--lumo-disabled-text-color));
    }

    :host([dir='rtl']) {
      border-radius:
        /* Don't use logical props, see https://github.com/vaadin/vaadin-time-picker/issues/145 */
        var(--vaadin-input-field-top-end-radius, var(--_input-container-radius))
        var(--vaadin-input-field-top-start-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-start-radius, var(--_input-container-radius))
        var(--vaadin-input-field-bottom-end-radius, var(--_input-container-radius));
    }

    /* Used for hover and activation effects */
    :host::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      pointer-events: none;
      background: var(--_hover-highlight);
      opacity: 0;
      transition:
        transform 0.15s,
        opacity 0.2s;
      transform-origin: 100% 0;
    }

    ::slotted(:not([slot$='fix'])) {
      cursor: inherit;
      min-height: var(--vaadin-input-field-height, var(--_input-height));
      padding: 0 0.25em;
      --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
      -webkit-mask-image: var(--_lumo-text-field-overflow-mask-image);
      mask-image: var(--_lumo-text-field-overflow-mask-image);
    }

    /* Read-only */
    :host([readonly]) {
      color: var(--lumo-secondary-text-color);
      background-color: transparent;
      cursor: default;
    }

    :host([readonly])::after {
      background-color: transparent;
      opacity: 1;
      border: var(--vaadin-input-field-readonly-border, 1px dashed var(--lumo-contrast-30pct));
    }

    /* Disabled */
    :host([disabled]) {
      background: var(--_disabled-background);
    }

    :host([disabled]) ::slotted(:not([slot$='fix'])) {
      -webkit-text-fill-color: var(--_disabled-value-color);
      color: var(--_disabled-value-color);
    }

    /* Invalid */
    :host([invalid]) {
      background: var(--_invalid-background);
    }

    :host([invalid]:not([readonly]))::after {
      background: var(--_invalid-hover-highlight);
    }

    /* Slotted icons */
    ::slotted(vaadin-icon) {
      color: var(--_icon-color);
      width: var(--_icon-size);
      height: var(--_icon-size);
    }

    /* Vaadin icons are based on a 16x16 grid (unlike Lumo and Material icons with 24x24), so they look too big by default */
    ::slotted(vaadin-icon[icon^='vaadin:']) {
      padding: 0.25em;
      box-sizing: border-box !important;
    }

    /* Text align */
    :host([dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent, #000 1.25em);
    }

    @-moz-document url-prefix() {
      :host([dir='rtl']) ::slotted(:not([slot$='fix'])) {
        mask-image: var(--_lumo-text-field-overflow-mask-image);
      }
    }

    :host([theme~='align-left']) ::slotted(:not([slot$='fix'])) {
      text-align: start;
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-center']) ::slotted(:not([slot$='fix'])) {
      text-align: center;
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-right']) ::slotted(:not([slot$='fix'])) {
      text-align: end;
      --_lumo-text-field-overflow-mask-image: none;
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-right']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
      }
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-left']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent 0.25em, #000 1.5em);
      }
    }

    /* RTL specific styles */
    :host([dir='rtl'])::after {
      transform-origin: 0% 0;
    }

    :host([theme~='align-left'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-center'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: none;
    }

    :host([theme~='align-right'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
      --_lumo-text-field-overflow-mask-image: none;
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-right'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to right, transparent 0.25em, #000 1.5em);
      }
    }

    @-moz-document url-prefix() {
      /* Firefox is smart enough to align overflowing text to right */
      :host([theme~='align-left'][dir='rtl']) ::slotted(:not([slot$='fix'])) {
        --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent 0.25em, #000 1.5em);
      }
    }
  `,{moduleId:"lumo-input-container"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ic=O`
  :host {
    --_helper-spacing: var(--vaadin-input-field-helper-spacing, 0.4em);
  }

  :host([has-helper]) [part='helper-text']::before {
    content: '';
    display: block;
    height: var(--_helper-spacing);
  }

  [part='helper-text'] {
    display: block;
    color: var(--vaadin-input-field-helper-color, var(--lumo-secondary-text-color));
    font-size: var(--vaadin-input-field-helper-font-size, var(--lumo-font-size-xs));
    line-height: var(--lumo-line-height-xs);
    font-weight: var(--vaadin-input-field-helper-font-weight, 400);
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    transition: color 0.2s;
  }

  :host(:hover:not([readonly])) [part='helper-text'] {
    color: var(--lumo-body-text-color);
  }

  :host([disabled]) [part='helper-text'] {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
  }

  :host([has-helper][theme~='helper-above-field']) [part='helper-text']::before {
    display: none;
  }

  :host([has-helper][theme~='helper-above-field']) [part='helper-text']::after {
    content: '';
    display: block;
    height: var(--_helper-spacing);
  }

  :host([has-helper][theme~='helper-above-field']) [part='label'] {
    order: 0;
    padding-bottom: var(--_helper-spacing);
  }

  :host([has-helper][theme~='helper-above-field']) [part='helper-text'] {
    order: 1;
  }

  :host([has-helper][theme~='helper-above-field']) [part='label'] + * {
    order: 2;
  }

  :host([has-helper][theme~='helper-above-field']) [part='error-message'] {
    order: 3;
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const bs=O`
  [part='label'] {
    align-self: flex-start;
    color: var(--vaadin-input-field-label-color, var(--lumo-secondary-text-color));
    font-weight: var(--vaadin-input-field-label-font-weight, 500);
    font-size: var(--vaadin-input-field-label-font-size, var(--lumo-font-size-s));
    transition: color 0.2s;
    line-height: 1;
    padding-inline-start: calc(var(--lumo-border-radius-m) / 4);
    padding-inline-end: 1em;
    padding-bottom: 0.5em;
    /* As a workaround for diacritics being cut off, add a top padding and a
    negative margin to compensate */
    padding-top: 0.25em;
    margin-top: -0.25em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    position: relative;
    max-width: 100%;
    box-sizing: border-box;
  }

  :host([focused]:not([readonly])) [part='label'] {
    color: var(--vaadin-input-field-focused-label-color, var(--lumo-primary-text-color));
  }

  :host(:hover:not([readonly]):not([focused])) [part='label'] {
    color: var(--vaadin-input-field-hovered-label-color, var(--lumo-body-text-color));
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused])) [part='label'] {
      color: var(--vaadin-input-field-label-color, var(--lumo-secondary-text-color));
    }
  }

  :host([has-label])::before {
    margin-top: calc(var(--lumo-font-size-s) * 1.5);
  }

  :host([has-label][theme~='small'])::before {
    margin-top: calc(var(--lumo-font-size-xs) * 1.5);
  }

  :host([has-label]) {
    padding-top: var(--lumo-space-m);
  }

  :host([has-label]) ::slotted([slot='tooltip']) {
    --vaadin-tooltip-offset-bottom: calc((var(--lumo-space-m) - var(--lumo-space-xs)) * -1);
  }

  :host([required]) [part='required-indicator']::after {
    content: var(--lumo-required-field-indicator, '\\2022');
    transition: opacity 0.2s;
    color: var(--lumo-required-field-indicator-color, var(--lumo-primary-text-color));
    position: absolute;
    right: 0;
    width: 1em;
    text-align: center;
  }

  :host([invalid]) [part='required-indicator']::after {
    color: var(--lumo-required-field-indicator-color, var(--lumo-error-text-color));
  }

  [part='error-message'] {
    margin-left: calc(var(--lumo-border-radius-m) / 4);
    font-size: var(--vaadin-input-field-error-font-size, var(--lumo-font-size-xs));
    line-height: var(--lumo-line-height-xs);
    font-weight: var(--vaadin-input-field-error-font-weight, 400);
    color: var(--vaadin-input-field-error-color, var(--lumo-error-text-color));
    will-change: max-height;
    transition: 0.4s max-height;
    max-height: 5em;
  }

  :host([has-error-message]) [part='error-message']::before,
  :host([has-error-message]) [part='error-message']::after {
    content: '';
    display: block;
    height: 0.4em;
  }

  :host(:not([invalid])) [part='error-message'] {
    max-height: 0;
    overflow: hidden;
  }

  /* RTL specific styles */

  :host([dir='rtl']) [part='required-indicator']::after {
    right: auto;
    left: 0;
  }

  :host([dir='rtl']) [part='error-message'] {
    margin-left: 0;
    margin-right: calc(var(--lumo-border-radius-m) / 4);
  }
`;T("",bs,{moduleId:"lumo-required-field"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const oc=O`
  :host {
    --lumo-text-field-size: var(--lumo-size-m);
    color: var(--vaadin-input-field-value-color, var(--lumo-body-text-color));
    font-size: var(--vaadin-input-field-value-font-size, var(--lumo-font-size-m));
    font-family: var(--lumo-font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    padding: var(--lumo-space-xs) 0;
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
    --_input-height: var(--vaadin-input-field-height, var(--lumo-text-field-size));
    --_disabled-value-color: var(--vaadin-input-field-disabled-value-color, var(--lumo-disabled-text-color));
  }

  :host::before {
    height: var(--_input-height);
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
  }

  :host([focused]) [part='input-field'] ::slotted(:is(input, textarea)) {
    -webkit-mask-image: none;
    mask-image: none;
  }

  ::slotted(:is(input, textarea):placeholder-shown) {
    color: var(--vaadin-input-field-placeholder-color, var(--lumo-secondary-text-color));
  }

  /* Hover */
  :host(:hover:not([readonly]):not([focused]):not([disabled])) [part='input-field']::after {
    opacity: var(--vaadin-input-field-hover-highlight-opacity, 0.1);
  }

  /* Touch device adjustment */
  @media (pointer: coarse) {
    :host(:hover:not([readonly]):not([focused]):not([disabled])) [part='input-field']::after {
      opacity: 0;
    }

    :host(:active:not([readonly]):not([focused]):not([disabled])) [part='input-field']::after {
      opacity: 0.2;
    }
  }

  /* Trigger when not focusing using the keyboard */
  :host([focused]:not([focus-ring]):not([readonly])) [part='input-field']::after {
    transform: scaleX(0);
    transition-duration: 0.15s, 1s;
  }

  /* Opt-in focus-ring when using pointer devices */
  /* This applies a focus-ring as box-shadow when the element is focused, but
     the ring is only visible / has a width when the respective CSS property is
     "enabled" using a value of 1 */
  :host([focused]) [part='input-field'] {
    /* Borders are implemented using box-shadows as well. To avoid overriding 
       the border on focus, even if the pointer focus-ring is disabled, we need to:
       - Duplicate the border box shadow for this rule
       - Remove the border (by using width of 0) when the focus-ring is visible,
         which is the same behavior as for the keyboard focus-ring below
       - Apply the border when the focus ring is not visible
    */
    --_pointer-focus-visible: clamp(0, var(--lumo-input-field-pointer-focus-visible, 0), 1);
    --_conditional-border-width: calc(calc(1 - var(--_pointer-focus-visible)) * var(--_input-border-width));
    --_conditional-focus-ring-width: calc(var(--_pointer-focus-visible) * var(--_focus-ring-width));
    box-shadow:
      inset 0 0 0 var(--_conditional-border-width) var(--_input-border-color),
      0 0 0 var(--_conditional-focus-ring-width) var(--_focus-ring-color);
  }

  /* Focus-ring when using keyboard navigation */
  :host([focus-ring]) [part='input-field'] {
    box-shadow: 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }

  /* Read-only and disabled */
  :host(:is([readonly], [disabled])) ::slotted(:is(input, textarea):placeholder-shown) {
    opacity: 0;
  }

  /* Read-only style */
  :host([readonly]) {
    --vaadin-input-field-border-color: transparent;
  }

  /* Disabled style */
  :host([disabled]) {
    pointer-events: none;
    --vaadin-input-field-border-color: var(--lumo-contrast-20pct);
  }

  :host([disabled]) [part='label'],
  :host([disabled]) [part='input-field'] ::slotted([slot$='fix']) {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
  }

  :host([disabled]) [part='input-field'] ::slotted(:not([slot$='fix'])) {
    color: var(--_disabled-value-color);
    -webkit-text-fill-color: var(--_disabled-value-color);
  }

  /* Invalid style */
  :host([invalid]) {
    --vaadin-input-field-border-color: var(--lumo-error-color);
    --_focus-ring-color: var(--lumo-error-color-50pct);
  }

  :host([input-prevented]) [part='input-field'] {
    animation: shake 0.15s infinite;
  }

  @keyframes shake {
    25% {
      transform: translateX(4px);
    }
    75% {
      transform: translateX(-4px);
    }
  }

  /* Small theme */
  :host([theme~='small']) {
    font-size: var(--lumo-font-size-s);
    --lumo-text-field-size: var(--lumo-size-s);
  }

  :host([theme~='small']) [part='label'] {
    font-size: var(--lumo-font-size-xs);
  }

  :host([theme~='small']) [part='error-message'] {
    font-size: var(--lumo-font-size-xxs);
  }

  /* Slotted content */
  [part='input-field'] ::slotted(:not(vaadin-icon):not(input):not(textarea)) {
    color: var(--lumo-secondary-text-color);
    font-weight: 400;
  }

  [part='clear-button']::before {
    content: var(--lumo-icons-cross);
  }
`,vs=[bs,sa,ic,oc];T("",vs,{moduleId:"lumo-input-field-shared-styles"});const sc=O`
  [part='toggle-button']::before {
    content: var(--lumo-icons-calendar);
  }

  [part='clear-button']::before {
    content: var(--lumo-icons-cross);
  }

  @media (max-width: 450px), (max-height: 450px) {
    [part='overlay-content'] {
      height: 70vh;
    }
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input) {
    --_lumo-text-field-overflow-mask-image: linear-gradient(to left, transparent, #000 1.25em);
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input:placeholder-shown) {
    --_lumo-text-field-overflow-mask-image: none;
  }
`;T("vaadin-date-picker",[vs,sc],{moduleId:"lumo-date-picker"});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ac=O`
  :host {
    display: flex;
    align-items: center;
    flex: 0 1 auto;
    border-radius:
            /* See https://developer.mozilla.org/en-US/docs/Web/CSS/border-radius */
      var(--vaadin-input-field-top-start-radius, var(--__border-radius))
      var(--vaadin-input-field-top-end-radius, var(--__border-radius))
      var(--vaadin-input-field-bottom-end-radius, var(--__border-radius))
      var(--vaadin-input-field-bottom-start-radius, var(--__border-radius));
    --_border-radius: var(--vaadin-input-field-border-radius, 0);
    --_input-border-width: var(--vaadin-input-field-border-width, 0px);
    --_input-border-color: var(--vaadin-input-field-border-color, transparent);
    /* stylelint-disable-next-line length-zero-no-unit */
    box-shadow: inset 0 0 0 var(--_input-border-width, 0) var(--_input-border-color);
  }

  :host([dir='rtl']) {
    border-radius:
            /* Don't use logical props, see https://github.com/vaadin/vaadin-time-picker/issues/145 */
      var(--vaadin-input-field-top-end-radius, var(--_border-radius))
      var(--vaadin-input-field-top-start-radius, var(--_border-radius))
      var(--vaadin-input-field-bottom-start-radius, var(--_border-radius))
      var(--vaadin-input-field-bottom-end-radius, var(--_border-radius));
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Reset the native input styles */
  ::slotted(input) {
    -webkit-appearance: none;
    -moz-appearance: none;
    flex: auto;
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: none;
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: 0;
    min-width: 0;
    font: inherit;
    line-height: normal;
    color: inherit;
    background-color: transparent;
    /* Disable default invalid style in Firefox */
    box-shadow: none;
  }

  ::slotted(*) {
    flex: none;
  }

  ::slotted(:is(input, textarea))::placeholder {
    /* Use ::slotted(input:placeholder-shown) in themes to style the placeholder. */
    /* because ::slotted(...)::placeholder does not work in Safari. */
    font: inherit;
    color: inherit;
    /* Override default opacity in Firefox */
    opacity: 1;
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const lc=n=>class extends n{static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},invalid:{type:Boolean,reflectToAttribute:!0}}}ready(){super.ready(),this.addEventListener("pointerdown",e=>{e.target===this&&e.preventDefault()}),this.addEventListener("click",e=>{e.target===this&&this.shadowRoot.querySelector("slot:not([name])").assignedNodes({flatten:!0}).forEach(r=>r.focus&&r.focus())})}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-input-container",ac,{moduleId:"vaadin-input-container-styles"});class cc extends lc(J(we(L))){static get is(){return"vaadin-input-container"}static get template(){return G`
      <slot name="prefix"></slot>
      <slot></slot>
      <slot name="suffix"></slot>
    `}}W(cc);/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const uc=n=>class extends Ho(Vo(n)){_shouldCloseOnOutsideClick(e){return!e.composedPath().includes(this.positionTarget)}_mouseDownListener(e){super._mouseDownListener(e),this._shouldCloseOnOutsideClick(e)&&!ci(e.composedPath()[0])&&e.preventDefault()}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const dc=O`
  [part='overlay'] {
    display: flex;
    flex: auto;
  }

  [part~='content'] {
    flex: auto;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-date-picker-overlay",[Bo,dc],{moduleId:"vaadin-date-picker-overlay-styles"});class hc extends uc(we(J(L))){static get is(){return"vaadin-date-picker-overlay"}static get template(){return G`
      <div id="backdrop" part="backdrop" hidden$="[[!withBackdrop]]"></div>
      <div part="overlay" id="overlay">
        <div part="content" id="content">
          <slot></slot>
        </div>
      </div>
    `}}W(hc);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function fc(n){let t=n.getDay();t===0&&(t=7);const e=4-t,r=new Date(n.getTime()+e*24*3600*1e3),i=new Date(0,0);i.setFullYear(r.getFullYear());const o=r.getTime()-i.getTime(),s=Math.round(o/(24*3600*1e3));return Math.floor(s/7+1)}function jr(n){const t=new Date(n);return t.setHours(0,0,0,0),t}function ie(n,t,e=jr){return n instanceof Date&&t instanceof Date&&e(n).getTime()===e(t).getTime()}function Rr(n){return{day:n.getDate(),month:n.getMonth(),year:n.getFullYear()}}function ze(n,t,e,r){let i=!1;if(typeof r=="function"&&n){const o=Rr(n);i=r(o)}return(!t||n>=t)&&(!e||n<=e)&&!i}function ws(n,t){return t.filter(e=>e!==void 0).reduce((e,r)=>{if(!r)return e;if(!e)return r;const i=Math.abs(n.getTime()-r.getTime()),o=Math.abs(e.getTime()-n.getTime());return i<o?r:e})}function Cs(n){const t=new Date,e=new Date(t);return e.setDate(1),e.setMonth(parseInt(n)+t.getMonth()),e}function _c(n,t,e=0,r=1){if(t>99)throw new Error("The provided year cannot have more than 2 digits.");if(t<0)throw new Error("The provided year cannot be negative.");let i=t+Math.floor(n.getFullYear()/100)*100;return n<new Date(i-50,e,r)?i-=100:n>new Date(i+50,e,r)&&(i+=100),i}function Ie(n){const t=/^([-+]\d{1}|\d{2,4}|[-+]\d{6})-(\d{1,2})-(\d{1,2})$/u.exec(n);if(!t)return;const e=new Date(0,0);return e.setFullYear(parseInt(t[1],10)),e.setMonth(parseInt(t[2],10)-1),e.setDate(parseInt(t[3],10)),e}function pc(n){const t=(l,u="00")=>(u+l).substr((u+l).length-u.length);let e="",r="0000",i=n.year;i<0?(i=-i,e="-",r="000000"):n.year>=1e4&&(e="+",r="000000");const o=e+t(i,r),s=t(n.month+1),a=t(n.day);return[o,s,a].join("-")}function mc(n){return n instanceof Date?pc({year:n.getFullYear(),month:n.getMonth(),day:n.getDate()}):""}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const xs=document.createElement("template");xs.innerHTML=`
  <style>
    :host {
      display: block;
      overflow: hidden;
      height: 500px;
    }

    #scroller {
      position: relative;
      height: 100%;
      overflow: auto;
      outline: none;
      margin-right: -40px;
      -webkit-overflow-scrolling: touch;
      overflow-x: hidden;
    }

    #scroller.notouchscroll {
      -webkit-overflow-scrolling: auto;
    }

    #scroller::-webkit-scrollbar {
      display: none;
    }

    .buffer {
      position: absolute;
      width: var(--vaadin-infinite-scroller-buffer-width, 100%);
      box-sizing: border-box;
      padding-right: 40px;
      top: var(--vaadin-infinite-scroller-buffer-offset, 0);
    }
  </style>

  <div id="scroller" tabindex="-1">
    <div class="buffer"></div>
    <div class="buffer"></div>
    <div id="fullHeight"></div>
  </div>
`;class Ss extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}).appendChild(xs.content.cloneNode(!0)),this.bufferSize=20,this._initialScroll=5e5,this._initialIndex=0,this._activated=!1}get active(){return this._activated}set active(t){t&&!this._activated&&(this._createPool(),this._activated=!0)}get bufferOffset(){return this._buffers[0].offsetTop}get itemHeight(){if(!this._itemHeightVal){const t=getComputedStyle(this).getPropertyValue("--vaadin-infinite-scroller-item-height"),e="background-position";this.$.fullHeight.style.setProperty(e,t);const r=getComputedStyle(this.$.fullHeight).getPropertyValue(e);this.$.fullHeight.style.removeProperty(e),this._itemHeightVal=parseFloat(r)}return this._itemHeightVal}get _bufferHeight(){return this.itemHeight*this.bufferSize}get position(){return(this.$.scroller.scrollTop-this._buffers[0].translateY)/this.itemHeight+this._firstIndex}set position(t){this._preventScrollEvent=!0,t>this._firstIndex&&t<this._firstIndex+this.bufferSize*2?this.$.scroller.scrollTop=this.itemHeight*(t-this._firstIndex)+this._buffers[0].translateY:(this._initialIndex=~~t,this._reset(),this._scrollDisabled=!0,this.$.scroller.scrollTop+=t%1*this.itemHeight,this._scrollDisabled=!1),this._mayHaveMomentum&&(this.$.scroller.classList.add("notouchscroll"),this._mayHaveMomentum=!1,setTimeout(()=>{this.$.scroller.classList.remove("notouchscroll")},10))}connectedCallback(){this._ready||(this._ready=!0,this.$={},this.shadowRoot.querySelectorAll("[id]").forEach(t=>{this.$[t.id]=t}),this.$.scroller.addEventListener("scroll",()=>this._scroll()),this._buffers=[...this.shadowRoot.querySelectorAll(".buffer")],this.$.fullHeight.style.height=`${this._initialScroll*2}px`)}disconnectedCallback(){this._debouncerScrollFinish&&this._debouncerScrollFinish.cancel(),this._debouncerUpdateClones&&this._debouncerUpdateClones.cancel(),this.__pendingFinishInit&&cancelAnimationFrame(this.__pendingFinishInit)}forceUpdate(){this._debouncerScrollFinish&&this._debouncerScrollFinish.flush(),this._debouncerUpdateClones&&(this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones(),this._debouncerUpdateClones.cancel()),kr()}_createElement(){}_updateElement(t,e){}_finishInit(){this._initDone||(this._buffers.forEach(t=>{[...t.children].forEach(e=>{this._ensureStampedInstance(e._itemWrapper)})}),this._buffers[0].translateY||this._reset(),this._initDone=!0,this.dispatchEvent(new CustomEvent("init-done")))}_translateBuffer(t){const e=t?1:0;this._buffers[e].translateY=this._buffers[e?0:1].translateY+this._bufferHeight*(e?-1:1),this._buffers[e].style.transform=`translate3d(0, ${this._buffers[e].translateY}px, 0)`,this._buffers[e].updated=!1,this._buffers.reverse()}_scroll(){if(this._scrollDisabled)return;const t=this.$.scroller.scrollTop;(t<this._bufferHeight||t>this._initialScroll*2-this._bufferHeight)&&(this._initialIndex=~~this.position,this._reset());const e=this.itemHeight+this.bufferOffset,r=t>this._buffers[1].translateY+e,i=t<this._buffers[0].translateY+e;(r||i)&&(this._translateBuffer(i),this._updateClones()),this._preventScrollEvent||(this.dispatchEvent(new CustomEvent("custom-scroll",{bubbles:!1,composed:!0})),this._mayHaveMomentum=!0),this._preventScrollEvent=!1,this._debouncerScrollFinish=D.debounce(this._debouncerScrollFinish,Z.after(200),()=>{const o=this.$.scroller.getBoundingClientRect();!this._isVisible(this._buffers[0],o)&&!this._isVisible(this._buffers[1],o)&&(this.position=this.position)})}_reset(){this._scrollDisabled=!0,this.$.scroller.scrollTop=this._initialScroll,this._buffers[0].translateY=this._initialScroll-this._bufferHeight,this._buffers[1].translateY=this._initialScroll,this._buffers.forEach(t=>{t.style.transform=`translate3d(0, ${t.translateY}px, 0)`}),this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones(!0),this._debouncerUpdateClones=D.debounce(this._debouncerUpdateClones,Z.after(200),()=>{this._buffers[0].updated=this._buffers[1].updated=!1,this._updateClones()}),this._scrollDisabled=!1}_createPool(){const t=this.innerHeight;this._buffers.forEach(e=>{for(let r=0;r<this.bufferSize;r++){const i=document.createElement("div");i.style.height=`${this.itemHeight}px`,i.instance={};const o=`vaadin-infinite-scroller-item-content-${aa()}`,s=document.createElement("slot");s.setAttribute("name",o),s._itemWrapper=i,e.appendChild(s),i.setAttribute("slot",o),this.appendChild(i),this.itemHeight*r<=t&&this._ensureStampedInstance(i)}}),this.__pendingFinishInit=requestAnimationFrame(()=>{this._finishInit(),this.__pendingFinishInit=null})}_ensureStampedInstance(t){if(t.firstElementChild)return;const e=t.instance;t.instance=this._createElement(),t.appendChild(t.instance),Object.keys(e).forEach(r=>{t.instance[r]=e[r]})}_updateClones(t){this._firstIndex=Math.round((this._buffers[0].translateY-this._initialScroll)/this.itemHeight)+this._initialIndex;const e=t?this.$.scroller.getBoundingClientRect():void 0;this._buffers.forEach((r,i)=>{if(!r.updated){const o=this._firstIndex+this.bufferSize*i;[...r.children].forEach((s,a)=>{const l=s._itemWrapper;(!t||this._isVisible(l,e))&&this._updateElement(l.instance,o+a)}),r.updated=!0}})}_isVisible(t,e){const r=t.getBoundingClientRect();return r.bottom>e.top&&r.top<e.bottom}}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Os=document.createElement("template");Os.innerHTML=`
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 270px;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }
  </style>
`;class gc extends Ss{static get is(){return"vaadin-date-picker-month-scroller"}constructor(){super(),this.bufferSize=3,this.shadowRoot.appendChild(Os.content.cloneNode(!0))}_createElement(){return document.createElement("vaadin-month-calendar")}_updateElement(t,e){t.month=Cs(e)}}W(gc);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Is=document.createElement("template");Is.innerHTML=`
  <style>
    :host {
      --vaadin-infinite-scroller-item-height: 80px;
      width: 50px;
      display: block;
      height: 100%;
      position: absolute;
      right: 0;
      transform: translateX(100%);
      -webkit-tap-highlight-color: transparent;
      -webkit-user-select: none;
      user-select: none;
      /* Center the year scroller position. */
      --vaadin-infinite-scroller-buffer-offset: 50%;
    }

    :host::before {
      content: '';
      display: block;
      background: transparent;
      width: 0;
      height: 0;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      border-width: 6px;
      border-style: solid;
      border-color: transparent;
      border-left-color: #000;
    }
  </style>
`;class yc extends Ss{static get is(){return"vaadin-date-picker-year-scroller"}constructor(){super(),this.bufferSize=12,this.shadowRoot.appendChild(Is.content.cloneNode(!0))}_createElement(){return document.createElement("vaadin-date-picker-year")}_updateElement(t,e){t.year=this._yearAfterXYears(e)}_yearAfterXYears(t){const e=new Date,r=new Date(e);return r.setFullYear(parseInt(t)+e.getFullYear()),r.getFullYear()}}W(yc);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const bc=n=>class extends n{static get properties(){return{year:{type:String,sync:!0},selectedDate:{type:Object,sync:!0}}}static get observers(){return["__updateSelected(year, selectedDate)"]}__updateSelected(e,r){this.toggleAttribute("selected",r&&r.getFullYear()===e),this.toggleAttribute("current",e===new Date().getFullYear())}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class vc extends J(bc(L)){static get is(){return"vaadin-date-picker-year"}static get template(){return G`
      <style>
        :host {
          display: block;
          height: 100%;
        }
      </style>
      <div part="year-number">[[year]]</div>
      <div part="year-separator" aria-hidden="true"></div>
    `}}W(vc);/**
@license
Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/const wc=dl(L);class Vi extends wc{static get is(){return"dom-repeat"}static get template(){return null}static get properties(){return{items:{type:Array},as:{type:String,value:"item"},indexAs:{type:String,value:"index"},itemsIndexAs:{type:String,value:"itemsIndex"},sort:{type:Function,observer:"__sortChanged"},filter:{type:Function,observer:"__filterChanged"},observe:{type:String,observer:"__observeChanged"},delay:Number,renderedItemCount:{type:Number,notify:!Vr,readOnly:!0},initialCount:{type:Number},targetFramerate:{type:Number,value:20},_targetFrameTime:{type:Number,computed:"__computeFrameTime(targetFramerate)"},notifyDomChange:{type:Boolean},reuseChunkedInstances:{type:Boolean}}}static get observers(){return["__itemsChanged(items.*)"]}constructor(){super(),this.__instances=[],this.__renderDebouncer=null,this.__itemsIdxToInstIdx={},this.__chunkCount=null,this.__renderStartTime=null,this.__itemsArrayChanged=!1,this.__shouldMeasureChunk=!1,this.__shouldContinueChunking=!1,this.__chunkingId=0,this.__sortFn=null,this.__filterFn=null,this.__observePaths=null,this.__ctor=null,this.__isDetached=!0,this.template=null,this._templateInfo}disconnectedCallback(){super.disconnectedCallback(),this.__isDetached=!0;for(let t=0;t<this.__instances.length;t++)this.__detachInstance(t);this.__chunkingId&&cancelAnimationFrame(this.__chunkingId)}connectedCallback(){if(super.connectedCallback(),us()||(this.style.display="none"),this.__isDetached){this.__isDetached=!1;let t=H(H(this).parentNode);for(let e=0;e<this.__instances.length;e++)this.__attachInstance(e,t);this.__chunkingId&&this.__render()}}__ensureTemplatized(){if(!this.__ctor){const t=this;let e=this.template=t._templateInfo?t:this.querySelector("template");if(!e){let i=new MutationObserver(()=>{if(this.querySelector("template"))i.disconnect(),this.__render();else throw new Error("dom-repeat requires a <template> child")});return i.observe(this,{childList:!0}),!1}let r={};r[this.as]=!0,r[this.indexAs]=!0,r[this.itemsIndexAs]=!0,this.__ctor=Yt(e,this,{mutableData:this.mutableData,parentModel:!0,instanceProps:r,forwardHostProp:function(i,o){let s=this.__instances;for(let a=0,l;a<s.length&&(l=s[a]);a++)l.forwardHostProp(i,o)},notifyInstanceProp:function(i,o,s){if(ca(this.as,o)){let a=i[this.itemsIndexAs];o==this.as&&(this.items[a]=s);let l=ua(this.as,`${JSCompiler_renameProperty("items",this)}.${a}`,o);this.notifyPath(l,s)}}})}return!0}__getMethodHost(){return this.__dataHost._methodHost||this.__dataHost}__functionFromPropertyValue(t){if(typeof t=="string"){let e=t,r=this.__getMethodHost();return function(){return r[e].apply(r,arguments)}}return t}__sortChanged(t){this.__sortFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__filterChanged(t){this.__filterFn=this.__functionFromPropertyValue(t),this.items&&this.__debounceRender(this.__render)}__computeFrameTime(t){return Math.ceil(1e3/t)}__observeChanged(){this.__observePaths=this.observe&&this.observe.replace(".*",".").split(" ")}__handleObservedPaths(t){if(this.__sortFn||this.__filterFn){if(!t)this.__debounceRender(this.__render,this.delay);else if(this.__observePaths){let e=this.__observePaths;for(let r=0;r<e.length;r++)t.indexOf(e[r])===0&&this.__debounceRender(this.__render,this.delay)}}}__itemsChanged(t){this.items&&!Array.isArray(this.items)&&console.warn("dom-repeat expected array for `items`, found",this.items),this.__handleItemPath(t.path,t.value)||(t.path==="items"&&(this.__itemsArrayChanged=!0),this.__debounceRender(this.__render))}__debounceRender(t,e=0){this.__renderDebouncer=He.debounce(this.__renderDebouncer,e>0?la.after(e):Fo,t.bind(this)),cs(this.__renderDebouncer)}render(){this.__debounceRender(this.__render),kr()}__render(){if(!this.__ensureTemplatized())return;let t=this.items||[];const e=this.__sortAndFilterItems(t),r=this.__calculateLimit(e.length);this.__updateInstances(t,r,e),this.initialCount&&(this.__shouldMeasureChunk||this.__shouldContinueChunking)&&(cancelAnimationFrame(this.__chunkingId),this.__chunkingId=requestAnimationFrame(()=>{this.__chunkingId=null,this.__continueChunking()})),this._setRenderedItemCount(this.__instances.length),(!Vr||this.notifyDomChange)&&this.dispatchEvent(new CustomEvent("dom-change",{bubbles:!0,composed:!0}))}__sortAndFilterItems(t){let e=new Array(t.length);for(let r=0;r<t.length;r++)e[r]=r;return this.__filterFn&&(e=e.filter((r,i,o)=>this.__filterFn(t[r],i,o))),this.__sortFn&&e.sort((r,i)=>this.__sortFn(t[r],t[i])),e}__calculateLimit(t){let e=t;const r=this.__instances.length;if(this.initialCount){let i;!this.__chunkCount||this.__itemsArrayChanged&&!this.reuseChunkedInstances?(e=Math.min(t,this.initialCount),i=Math.max(e-r,0),this.__chunkCount=i||1):(i=Math.min(Math.max(t-r,0),this.__chunkCount),e=Math.min(r+i,t)),this.__shouldMeasureChunk=i===this.__chunkCount,this.__shouldContinueChunking=e<t,this.__renderStartTime=performance.now()}return this.__itemsArrayChanged=!1,e}__continueChunking(){if(this.__shouldMeasureChunk){const t=performance.now()-this.__renderStartTime,e=this._targetFrameTime/t;this.__chunkCount=Math.round(this.__chunkCount*e)||1}this.__shouldContinueChunking&&this.__debounceRender(this.__render)}__updateInstances(t,e,r){const i=this.__itemsIdxToInstIdx={};let o;for(o=0;o<e;o++){let s=this.__instances[o],a=r[o],l=t[a];i[a]=o,s?(s._setPendingProperty(this.as,l),s._setPendingProperty(this.indexAs,o),s._setPendingProperty(this.itemsIndexAs,a),s._flushProperties()):this.__insertInstance(l,o,a)}for(let s=this.__instances.length-1;s>=o;s--)this.__detachAndRemoveInstance(s)}__detachInstance(t){let e=this.__instances[t];const r=H(e.root);for(let i=0;i<e.children.length;i++){let o=e.children[i];r.appendChild(o)}return e}__attachInstance(t,e){let r=this.__instances[t];e.insertBefore(r.root,this)}__detachAndRemoveInstance(t){this.__detachInstance(t),this.__instances.splice(t,1)}__stampInstance(t,e,r){let i={};return i[this.as]=t,i[this.indexAs]=e,i[this.itemsIndexAs]=r,new this.__ctor(i)}__insertInstance(t,e,r){const i=this.__stampInstance(t,e,r);let o=this.__instances[e+1],s=o?o.children[0]:this;return H(H(this).parentNode).insertBefore(i.root,s),this.__instances[e]=i,i}_showHideChildren(t){for(let e=0;e<this.__instances.length;e++)this.__instances[e]._showHideChildren(t)}__handleItemPath(t,e){let r=t.slice(6),i=r.indexOf("."),o=i<0?r:r.substring(0,i);if(o==parseInt(o,10)){let s=i<0?"":r.substring(i+1);this.__handleObservedPaths(s);let a=this.__itemsIdxToInstIdx[o],l=this.__instances[a];if(l){let u=this.as+(s?"."+s:"");l._setPendingPropertyOrPath(u,e,!1,!0),l._flushProperties()}return!0}}itemForElement(t){let e=this.modelForElement(t);return e&&e[this.as]}indexForElement(t){let e=this.modelForElement(t);return e&&e[this.indexAs]}modelForElement(t){return xl(this.template,t)}}customElements.define(Vi.is,Vi);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Cc=n=>class extends No(n){static get properties(){return{month:{type:Object,value:new Date,sync:!0},selectedDate:{type:Object,notify:!0,sync:!0},focusedDate:{type:Object},showWeekNumbers:{type:Boolean,value:!1},i18n:{type:Object},ignoreTaps:{type:Boolean},minDate:{type:Date,value:null,sync:!0},maxDate:{type:Date,value:null,sync:!0},isDateDisabled:{type:Function,value:()=>!1},enteredDate:{type:Date},disabled:{type:Boolean,reflectToAttribute:!0,computed:"__computeDisabled(month, minDate, maxDate)"},_days:{type:Array,computed:"__computeDays(month, i18n, minDate, maxDate, isDateDisabled)"},_weeks:{type:Array,computed:"__computeWeeks(_days)"},_notTapping:{type:Boolean},__hasFocus:{type:Boolean}}}static get observers(){return["__focusedDateChanged(focusedDate, _days)","_showWeekNumbersChanged(showWeekNumbers, i18n)"]}get focusableDateElement(){return[...this.shadowRoot.querySelectorAll("[part~=date]")].find(e=>ie(e.date,this.focusedDate))}ready(){super.ready(),ne(this.$.monthGrid,"tap",this._handleTap.bind(this))}_setFocused(e){super._setFocused(e),this.__hasFocus=e}__computeDisabled(e,r,i){const o=new Date(0,0);o.setFullYear(e.getFullYear()),o.setMonth(e.getMonth()),o.setDate(1);const s=new Date(0,0);return s.setFullYear(e.getFullYear()),s.setMonth(e.getMonth()+1),s.setDate(0),r&&i&&r.getMonth()===i.getMonth()&&r.getMonth()===e.getMonth()&&i.getDate()-r.getDate()>=0?!1:!ze(o,r,i)&&!ze(s,r,i)}_getTitle(e,r){if(!(e===void 0||r===void 0))return r.formatTitle(r.monthNames[e.getMonth()],e.getFullYear())}_onMonthGridTouchStart(){this._notTapping=!1,setTimeout(()=>{this._notTapping=!0},300)}_dateAdd(e,r){e.setDate(e.getDate()+r)}_applyFirstDayOfWeek(e,r){if(!(e===void 0||r===void 0))return e.slice(r).concat(e.slice(0,r))}__computeWeekDayNames(e,r){if(e===void 0||r===void 0)return[];const{weekdays:i,weekdaysShort:o,firstDayOfWeek:s}=e,a=this._applyFirstDayOfWeek(o,s);return this._applyFirstDayOfWeek(i,s).map((u,f)=>({weekDay:u,weekDayShort:a[f]})).slice(0,7)}__focusedDateChanged(e,r){Array.isArray(r)&&r.some(i=>ie(i,e))?this.removeAttribute("aria-hidden"):this.setAttribute("aria-hidden","true")}_getDate(e){return e?e.getDate():""}__computeShowWeekSeparator(e,r){return e&&r&&r.firstDayOfWeek===1}_isToday(e){return ie(new Date,e)}__computeDays(e,r){if(e===void 0||r===void 0)return[];const i=new Date(0,0);for(i.setFullYear(e.getFullYear()),i.setMonth(e.getMonth()),i.setDate(1);i.getDay()!==r.firstDayOfWeek;)this._dateAdd(i,-1);const o=[],s=i.getMonth(),a=e.getMonth();for(;i.getMonth()===a||i.getMonth()===s;)o.push(i.getMonth()===a?new Date(i.getTime()):null),this._dateAdd(i,1);return o}__computeWeeks(e){return e.reduce((r,i,o)=>(o%7===0&&r.push([]),r[r.length-1].push(i),r),[])}_handleTap(e){!this.ignoreTaps&&!this._notTapping&&e.target.date&&!e.target.hasAttribute("disabled")&&(this.selectedDate=e.target.date,this.dispatchEvent(new CustomEvent("date-tap",{detail:{date:e.target.date},bubbles:!0,composed:!0})))}_preventDefault(e){e.preventDefault()}__computeWeekNumber(e){const r=e.reduce((i,o)=>!i&&o?o:i);return fc(r)}__computeDayAriaLabel(e){if(!e)return"";let r=`${this._getDate(e)} ${this.i18n.monthNames[e.getMonth()]} ${e.getFullYear()}, ${this.i18n.weekdays[e.getDay()]}`;return this._isToday(e)&&(r+=`, ${this.i18n.today}`),r}_showWeekNumbersChanged(e,r){this.__computeShowWeekSeparator(e,r)?this.setAttribute("week-numbers",""):this.removeAttribute("week-numbers")}__computeDatePart(e,r,i,o,s,a,l,u){const f=["date"];return this.__isDayDisabled(e,o,s,a)&&f.push("disabled"),ie(e,r)&&(u||ie(e,l))&&f.push("focused"),this.__isDaySelected(e,i)&&f.push("selected"),this._isToday(e)&&f.push("today"),e<jr(new Date)&&f.push("past"),e>jr(new Date)&&f.push("future"),f.join(" ")}__isDaySelected(e,r){return ie(e,r)}__computeDayAriaSelected(e,r){return String(this.__isDaySelected(e,r))}__isDayDisabled(e,r,i,o){return!ze(e,r,i,o)}__computeDayAriaDisabled(e,r,i,o){return e===void 0||r===void 0&&i===void 0&&o===void 0?"false":String(this.__isDayDisabled(e,r,i,o))}__computeDayTabIndex(e,r){return ie(e,r)?"0":"-1"}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const xc=O`
  :host {
    display: block;
  }

  #monthGrid {
    width: 100%;
    border-collapse: collapse;
  }

  #days-container tr,
  #weekdays-container tr {
    display: flex;
  }

  [part~='date'] {
    outline: none;
  }

  [part~='disabled'] {
    pointer-events: none;
  }

  [part='week-number'][hidden],
  [part='weekday'][hidden] {
    display: none;
  }

  [part='weekday'],
  [part~='date'] {
    width: calc(100% / 7);
    padding: 0;
    font-weight: normal;
  }

  [part='weekday']:empty,
  [part='week-number'] {
    width: 12.5%;
    flex-shrink: 0;
    padding: 0;
  }

  :host([week-numbers]) [part='weekday']:not(:empty),
  :host([week-numbers]) [part~='date'] {
    width: 12.5%;
  }

  @media (forced-colors: active) {
    [part~='date'][part~='focused'] {
      outline: 1px solid;
    }

    [part~='date'][part~='selected'] {
      outline: 3px solid;
    }
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-month-calendar",xc,{moduleId:"vaadin-month-calendar-styles"});class Sc extends Cc(J(L)){static get template(){return G`
      <div part="month-header" id="month-header" aria-hidden="true">[[_getTitle(month, i18n)]]</div>
      <table
        id="monthGrid"
        role="grid"
        aria-labelledby="month-header"
        on-touchend="_preventDefault"
        on-touchstart="_onMonthGridTouchStart"
      >
        <thead id="weekdays-container">
          <tr role="row" part="weekdays">
            <th part="weekday" aria-hidden="true" hidden$="[[!__computeShowWeekSeparator(showWeekNumbers, i18n)]]"></th>
            <template is="dom-repeat" items="[[__computeWeekDayNames(i18n, showWeekNumbers)]]">
              <th role="columnheader" part="weekday" scope="col" abbr$="[[item.weekDay]]" aria-hidden="true">
                [[item.weekDayShort]]
              </th>
            </template>
          </tr>
        </thead>
        <tbody id="days-container">
          <template is="dom-repeat" items="[[_weeks]]" as="week">
            <tr role="row">
              <td
                part="week-number"
                aria-hidden="true"
                hidden$="[[!__computeShowWeekSeparator(showWeekNumbers, i18n)]]"
              >
                [[__computeWeekNumber(week)]]
              </td>
              <template is="dom-repeat" items="[[week]]">
                <td
                  role="gridcell"
                  part$="[[__computeDatePart(item, focusedDate, selectedDate, minDate, maxDate, isDateDisabled, enteredDate, __hasFocus)]]"
                  date="[[item]]"
                  tabindex$="[[__computeDayTabIndex(item, focusedDate)]]"
                  disabled$="[[__isDayDisabled(item, minDate, maxDate, isDateDisabled)]]"
                  aria-selected$="[[__computeDayAriaSelected(item, selectedDate)]]"
                  aria-disabled$="[[__computeDayAriaDisabled(item, minDate, maxDate, isDateDisabled)]]"
                  aria-label$="[[__computeDayAriaLabel(item)]]"
                  >[[_getDate(item)]]</td
                >
              </template>
            </tr>
          </template>
        </tbody>
      </table>
    `}static get is(){return"vaadin-month-calendar"}}W(Sc);/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Oc=n=>class extends n{static get properties(){return{scrollDuration:{type:Number,value:300},selectedDate:{type:Object,value:null,sync:!0},focusedDate:{type:Object,notify:!0,observer:"_focusedDateChanged",sync:!0},_focusedMonthDate:Number,initialPosition:{type:Object,observer:"_initialPositionChanged",sync:!0},_originDate:{type:Object,value:new Date},_visibleMonthIndex:Number,_desktopMode:{type:Boolean,observer:"_desktopModeChanged"},_desktopMediaQuery:{type:String,value:"(min-width: 375px)"},_translateX:{observer:"_translateXChanged"},_yearScrollerWidth:{value:50},i18n:{type:Object},showWeekNumbers:{type:Boolean,value:!1},_ignoreTaps:Boolean,_notTapping:Boolean,minDate:{type:Object,sync:!0},maxDate:{type:Object,sync:!0},isDateDisabled:{type:Function},enteredDate:{type:Date,sync:!0},label:String,_cancelButton:{type:Object},_todayButton:{type:Object},calendars:{type:Array,value:()=>[]},years:{type:Array,value:()=>[]}}}static get observers(){return["__updateCalendars(calendars, i18n, minDate, maxDate, selectedDate, focusedDate, showWeekNumbers, _ignoreTaps, _theme, isDateDisabled, enteredDate)","__updateCancelButton(_cancelButton, i18n)","__updateTodayButton(_todayButton, i18n, minDate, maxDate, isDateDisabled)","__updateYears(years, selectedDate, _theme)"]}get __useSubMonthScrolling(){return this._monthScroller.clientHeight<this._monthScroller.itemHeight+this._monthScroller.bufferOffset}get focusableDateElement(){return this.calendars.map(e=>e.focusableDateElement).find(Boolean)}_addListeners(){da(this.$.scrollers,"pan-y"),ne(this.$.scrollers,"track",this._track.bind(this)),ne(this.shadowRoot.querySelector('[part="clear-button"]'),"tap",this._clear.bind(this)),ne(this.shadowRoot.querySelector('[part="toggle-button"]'),"tap",this._cancel.bind(this)),ne(this.shadowRoot.querySelector('[part="years-toggle-button"]'),"tap",this._toggleYearScroller.bind(this))}_initControllers(){this.addController(new wi(this._desktopMediaQuery,e=>{this._desktopMode=e})),this.addController(new je(this,"today-button","vaadin-button",{observe:!1,initializer:e=>{e.setAttribute("theme","tertiary"),e.addEventListener("keydown",r=>this.__onTodayButtonKeyDown(r)),ne(e,"tap",this._onTodayTap.bind(this)),this._todayButton=e}})),this.addController(new je(this,"cancel-button","vaadin-button",{observe:!1,initializer:e=>{e.setAttribute("theme","tertiary"),e.addEventListener("keydown",r=>this.__onCancelButtonKeyDown(r)),ne(e,"tap",this._cancel.bind(this)),this._cancelButton=e}})),this.__initMonthScroller(),this.__initYearScroller()}reset(){this._closeYearScroller(),this._toggleAnimateClass(!0)}focusCancel(){this._cancelButton.focus()}scrollToDate(e,r){const i=this.__useSubMonthScrolling?this._calculateWeekScrollOffset(e):0;this._scrollToPosition(this._differenceInMonths(e,this._originDate)+i,r),this._monthScroller.forceUpdate()}__initMonthScroller(){this.addController(new je(this,"months","vaadin-date-picker-month-scroller",{observe:!1,initializer:e=>{e.addEventListener("custom-scroll",()=>{this._onMonthScroll()}),e.addEventListener("touchstart",()=>{this._onMonthScrollTouchStart()}),e.addEventListener("keydown",r=>{this.__onMonthCalendarKeyDown(r)}),e.addEventListener("init-done",()=>{const r=[...this.querySelectorAll("vaadin-month-calendar")];r.forEach(i=>{i.addEventListener("selected-date-changed",o=>{this.selectedDate=o.detail.value})}),this.calendars=r}),this._monthScroller=e}}))}__initYearScroller(){this.addController(new je(this,"years","vaadin-date-picker-year-scroller",{observe:!1,initializer:e=>{e.setAttribute("aria-hidden","true"),ne(e,"tap",r=>{this._onYearTap(r)}),e.addEventListener("custom-scroll",()=>{this._onYearScroll()}),e.addEventListener("touchstart",()=>{this._onYearScrollTouchStart()}),e.addEventListener("init-done",()=>{this.years=[...this.querySelectorAll("vaadin-date-picker-year")]}),this._yearScroller=e}}))}__updateCancelButton(e,r){e&&(e.textContent=r&&r.cancel)}__updateTodayButton(e,r,i,o,s){e&&(e.textContent=r&&r.today,e.disabled=!this._isTodayAllowed(i,o,s))}__updateCalendars(e,r,i,o,s,a,l,u,f,p,m){e&&e.length&&e.forEach(g=>{g.i18n=r,g.minDate=i,g.maxDate=o,g.isDateDisabled=p,g.focusedDate=a,g.selectedDate=s,g.showWeekNumbers=l,g.ignoreTaps=u,g.enteredDate=m,f?g.setAttribute("theme",f):g.removeAttribute("theme")})}__updateYears(e,r,i){e&&e.length&&e.forEach(o=>{o.selectedDate=r,i?o.setAttribute("theme",i):o.removeAttribute("theme")})}_selectDate(e){return this._dateAllowed(e)?(this.selectedDate=e,this.dispatchEvent(new CustomEvent("date-selected",{detail:{date:e},bubbles:!0,composed:!0})),!0):!1}_desktopModeChanged(e){this.toggleAttribute("desktop",e)}_focusedDateChanged(e){this.revealDate(e)}revealDate(e,r=!0){if(!e)return;const i=this._differenceInMonths(e,this._originDate);if(this.__useSubMonthScrolling){const u=this._calculateWeekScrollOffset(e);this._scrollToPosition(i+u,r);return}const o=this._monthScroller.position>i,a=Math.max(this._monthScroller.itemHeight,this._monthScroller.clientHeight-this._monthScroller.bufferOffset*2)/this._monthScroller.itemHeight,l=this._monthScroller.position+a-1<i;o?this._scrollToPosition(i,r):l&&this._scrollToPosition(i-a+1,r)}_calculateWeekScrollOffset(e){const r=new Date(0,0);r.setFullYear(e.getFullYear()),r.setMonth(e.getMonth()),r.setDate(1);let i=0;for(;r.getDate()<e.getDate();)r.setDate(r.getDate()+1),r.getDay()===this.i18n.firstDayOfWeek&&(i+=1);return i/6}_initialPositionChanged(e){this._monthScroller&&this._yearScroller&&(this._monthScroller.active=!0,this._yearScroller.active=!0),this.scrollToDate(e)}_repositionYearScroller(){const e=this._monthScroller.position;this._visibleMonthIndex=Math.floor(e),this._yearScroller.position=(e+this._originDate.getMonth())/12}_repositionMonthScroller(){this._monthScroller.position=this._yearScroller.position*12-this._originDate.getMonth(),this._visibleMonthIndex=Math.floor(this._monthScroller.position)}_onMonthScroll(){this._repositionYearScroller(),this._doIgnoreTaps()}_onYearScroll(){this._repositionMonthScroller(),this._doIgnoreTaps()}_onYearScrollTouchStart(){this._notTapping=!1,setTimeout(()=>{this._notTapping=!0},300),this._repositionMonthScroller()}_onMonthScrollTouchStart(){this._repositionYearScroller()}_doIgnoreTaps(){this._ignoreTaps=!0,this._debouncer=D.debounce(this._debouncer,Z.after(300),()=>{this._ignoreTaps=!1})}_formatDisplayed(e,r,i){return e&&r&&typeof r.formatDate=="function"?r.formatDate(Rr(e)):i}_onTodayTap(){const e=this._getTodayMidnight();Math.abs(this._monthScroller.position-this._differenceInMonths(e,this._originDate))<.001?(this._selectDate(e),this._close()):this._scrollToCurrentMonth()}_scrollToCurrentMonth(){this.focusedDate&&(this.focusedDate=new Date),this.scrollToDate(new Date,!0)}_onYearTap(e){if(!this._ignoreTaps&&!this._notTapping){const i=(e.detail.y-(this._yearScroller.getBoundingClientRect().top+this._yearScroller.clientHeight/2))/this._yearScroller.itemHeight;this._scrollToPosition(this._monthScroller.position+i*12,!0)}}_scrollToPosition(e,r){if(this._targetPosition!==void 0){this._targetPosition=e;return}if(!r){this._monthScroller.position=e,this._monthScroller.forceUpdate(),this._targetPosition=void 0,this._repositionYearScroller(),this.__tryFocusDate();return}this._targetPosition=e;let i;this._revealPromise=new Promise(u=>{i=u});const o=(u,f,p,m)=>(u/=m/2,u<1?p/2*u*u+f:(u-=1,-p/2*(u*(u-2)-1)+f));let s=0;const a=this._monthScroller.position,l=u=>{s||(s=u);const f=u-s;if(f<this.scrollDuration){const p=o(f,a,this._targetPosition-a,this.scrollDuration);this._monthScroller.position=p,window.requestAnimationFrame(l)}else this.dispatchEvent(new CustomEvent("scroll-animation-finished",{bubbles:!0,composed:!0,detail:{position:this._targetPosition,oldPosition:a}})),this._monthScroller.position=this._targetPosition,this._monthScroller.forceUpdate(),this._targetPosition=void 0,i(),this._revealPromise=void 0;setTimeout(this._repositionYearScroller.bind(this),1)};window.requestAnimationFrame(l)}_limit(e,r){return Math.min(r.max,Math.max(r.min,e))}_handleTrack(e){if(Math.abs(e.detail.dx)<10||Math.abs(e.detail.ddy)>10)return;Math.abs(e.detail.ddx)>this._yearScrollerWidth/3&&this._toggleAnimateClass(!0);const r=this._translateX+e.detail.ddx;this._translateX=this._limit(r,{min:0,max:this._yearScrollerWidth})}_track(e){if(!this._desktopMode)switch(e.detail.state){case"start":this._toggleAnimateClass(!1);break;case"track":this._handleTrack(e);break;case"end":this._toggleAnimateClass(!0),this._translateX>=this._yearScrollerWidth/2?this._closeYearScroller():this._openYearScroller();break}}_toggleAnimateClass(e){e?this.classList.add("animate"):this.classList.remove("animate")}_toggleYearScroller(){this._isYearScrollerVisible()?this._closeYearScroller():this._openYearScroller()}_openYearScroller(){this._translateX=0,this.setAttribute("years-visible","")}_closeYearScroller(){this.removeAttribute("years-visible"),this._translateX=this._yearScrollerWidth}_isYearScrollerVisible(){return this._translateX<this._yearScrollerWidth/2}_translateXChanged(e){this._desktopMode||(this._monthScroller.style.transform=`translateX(${e-this._yearScrollerWidth}px)`,this._yearScroller.style.transform=`translateX(${e}px)`)}_yearAfterXMonths(e){return Cs(e).getFullYear()}_differenceInMonths(e,r){return(e.getFullYear()-r.getFullYear())*12-r.getMonth()+e.getMonth()}_clear(){this._selectDate("")}_close(){this.dispatchEvent(new CustomEvent("close",{bubbles:!0,composed:!0}))}_cancel(){this.focusedDate=this.selectedDate,this._close()}_preventDefault(e){e.preventDefault()}__toggleDate(e){ie(e,this.selectedDate)?(this._clear(),this.focusedDate=e):this._selectDate(e)}__onMonthCalendarKeyDown(e){let r=!1;switch(e.key){case"ArrowDown":this._moveFocusByDays(7),r=!0;break;case"ArrowUp":this._moveFocusByDays(-7),r=!0;break;case"ArrowRight":this._moveFocusByDays(this.__isRTL?-1:1),r=!0;break;case"ArrowLeft":this._moveFocusByDays(this.__isRTL?1:-1),r=!0;break;case"Enter":this._selectDate(this.focusedDate)&&(this._close(),r=!0);break;case" ":this.__toggleDate(this.focusedDate),r=!0;break;case"Home":this._moveFocusInsideMonth(this.focusedDate,"minDate"),r=!0;break;case"End":this._moveFocusInsideMonth(this.focusedDate,"maxDate"),r=!0;break;case"PageDown":this._moveFocusByMonths(e.shiftKey?12:1),r=!0;break;case"PageUp":this._moveFocusByMonths(e.shiftKey?-12:-1),r=!0;break;case"Tab":this._onTabKeyDown(e,"calendar");break}r&&(e.preventDefault(),e.stopPropagation())}_onTabKeyDown(e,r){switch(e.stopPropagation(),r){case"calendar":e.shiftKey&&(e.preventDefault(),this.hasAttribute("fullscreen")?this.focusCancel():this.__focusInput());break;case"today":e.shiftKey&&(e.preventDefault(),this.focusDateElement());break;case"cancel":e.shiftKey||(e.preventDefault(),this.hasAttribute("fullscreen")?this.focusDateElement():this.__focusInput());break}}__onTodayButtonKeyDown(e){e.key==="Tab"&&this._onTabKeyDown(e,"today")}__onCancelButtonKeyDown(e){e.key==="Tab"&&this._onTabKeyDown(e,"cancel")}__focusInput(){this.dispatchEvent(new CustomEvent("focus-input",{bubbles:!0,composed:!0}))}__tryFocusDate(){if(this.__pendingDateFocus){const r=this.focusableDateElement;r&&ie(r.date,this.__pendingDateFocus)&&(delete this.__pendingDateFocus,r.focus())}}async focusDate(e,r){const i=e||this.selectedDate||this.initialPosition||new Date;this.focusedDate=i,r||(this._focusedMonthDate=i.getDate()),await this.focusDateElement(!1)}async focusDateElement(e=!0){this.__pendingDateFocus=this.focusedDate,this.calendars.length||await new Promise(r=>{requestAnimationFrame(()=>{setTimeout(()=>{kr(),r()})})}),e&&this.revealDate(this.focusedDate),this._revealPromise&&await this._revealPromise,this.__tryFocusDate()}_focusClosestDate(e){this.focusDate(ws(e,[this.minDate,this.maxDate]))}_focusAllowedDate(e,r,i){this._dateAllowed(e,void 0,void 0,()=>!1)?this.focusDate(e,i):this._dateAllowed(this.focusedDate)?r>0?this.focusDate(this.maxDate):this.focusDate(this.minDate):this._focusClosestDate(this.focusedDate)}_getDateDiff(e,r){const i=new Date(0,0);return i.setFullYear(this.focusedDate.getFullYear()),i.setMonth(this.focusedDate.getMonth()+e),r&&i.setDate(this.focusedDate.getDate()+r),i}_moveFocusByDays(e){const r=this._getDateDiff(0,e);this._focusAllowedDate(r,e,!1)}_moveFocusByMonths(e){const r=this._getDateDiff(e),i=r.getMonth();this._focusedMonthDate||(this._focusedMonthDate=this.focusedDate.getDate()),r.setDate(this._focusedMonthDate),r.getMonth()!==i&&r.setDate(0),this._focusAllowedDate(r,e,!0)}_moveFocusInsideMonth(e,r){const i=new Date(0,0);i.setFullYear(e.getFullYear()),r==="minDate"?(i.setMonth(e.getMonth()),i.setDate(1)):(i.setMonth(e.getMonth()+1),i.setDate(0)),this._dateAllowed(i)?this.focusDate(i):this._dateAllowed(e)?this.focusDate(this[r]):this._focusClosestDate(e)}_dateAllowed(e,r=this.minDate,i=this.maxDate,o=this.isDateDisabled){return ze(e,r,i,o)}_isTodayAllowed(e,r,i){return this._dateAllowed(this._getTodayMidnight(),e,r,i)}_getTodayMidnight(){const e=new Date,r=new Date(0,0);return r.setFullYear(e.getFullYear()),r.setMonth(e.getMonth()),r.setDate(e.getDate()),r}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ic=O`
  :host {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    outline: none;
  }

  [part='overlay-header'] {
    display: flex;
    flex-shrink: 0;
    flex-wrap: nowrap;
    align-items: center;
  }

  :host(:not([fullscreen])) [part='overlay-header'] {
    display: none;
  }

  [part='label'] {
    flex-grow: 1;
  }

  [hidden] {
    display: none !important;
  }

  [part='years-toggle-button'] {
    display: flex;
  }

  #scrollers {
    display: flex;
    height: 100%;
    width: 100%;
    position: relative;
    overflow: hidden;
  }

  :host([desktop]) ::slotted([slot='months']) {
    right: 50px;
    transform: none !important;
  }

  :host([desktop]) ::slotted([slot='years']) {
    transform: none !important;
  }

  :host(.animate) ::slotted([slot='months']),
  :host(.animate) ::slotted([slot='years']) {
    transition: all 200ms;
  }

  [part='toolbar'] {
    display: flex;
    justify-content: space-between;
    z-index: 2;
    flex-shrink: 0;
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-date-picker-overlay-content",Ic,{moduleId:"vaadin-date-picker-overlay-content-styles"});class Pc extends Oc(Ae(J(we(L)))){static get template(){return G`
      <div part="overlay-header" on-touchend="_preventDefault" aria-hidden="true">
        <div part="label">[[_formatDisplayed(selectedDate, i18n, label)]]</div>
        <div part="clear-button" hidden$="[[!selectedDate]]"></div>
        <div part="toggle-button"></div>

        <div part="years-toggle-button" hidden$="[[_desktopMode]]" aria-hidden="true">
          [[_yearAfterXMonths(_visibleMonthIndex)]]
        </div>
      </div>

      <div id="scrollers">
        <slot name="months"></slot>
        <slot name="years"></slot>
      </div>

      <div on-touchend="_preventDefault" role="toolbar" part="toolbar">
        <slot name="today-button"></slot>
        <slot name="cancel-button"></slot>
      </div>
    `}static get is(){return"vaadin-date-picker-overlay-content"}ready(){super.ready(),this.setAttribute("role","dialog"),this._addListeners(),this._initControllers()}}W(Pc);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ec=n=>class extends gi(Tr(n)){static get properties(){return{clearButtonVisible:{type:Boolean,reflectToAttribute:!0,value:!1}}}get clearElement(){return console.warn(`Please implement the 'clearElement' property in <${this.localName}>`),null}ready(){super.ready(),this.clearElement&&(this.clearElement.addEventListener("mousedown",e=>this._onClearButtonMouseDown(e)),this.clearElement.addEventListener("click",e=>this._onClearButtonClick(e)))}_onClearButtonClick(e){e.preventDefault(),this._onClearAction()}_onClearButtonMouseDown(e){this._shouldKeepFocusOnClearMousedown()&&e.preventDefault(),Er||this.inputElement.focus()}_onEscape(e){super._onEscape(e),this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_onClearAction(){this._inputElementValue="",this.inputElement.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.inputElement.dispatchEvent(new Event("change",{bubbles:!0}))}_shouldKeepFocusOnClearMousedown(){return Po(this.inputElement)}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ps=et(n=>class extends Ao(os(gi(n))){static get constraints(){return["required"]}static get delegateAttrs(){return[...super.delegateAttrs,"required"]}ready(){super.ready(),this._createConstraintsObserver()}checkValidity(){return this.inputElement&&this._hasValidConstraints(this.constructor.constraints.map(e=>this[e]))?this.inputElement.checkValidity():!this.invalid}_hasValidConstraints(e){return e.some(r=>this.__isValidConstraint(r))}_createConstraintsObserver(){this._createMethodObserver(`_constraintsChanged(stateTarget, ${this.constructor.constraints.join(", ")})`)}_constraintsChanged(e,...r){if(!e)return;const i=this._hasValidConstraints(r),o=this.__previousHasConstraints&&!i;(this._hasValue||this.invalid)&&i?this._requestValidation():o&&!this.manualValidation&&this._setInvalid(!1),this.__previousHasConstraints=i}_onChange(e){e.stopPropagation(),this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{detail:{sourceEvent:e},bubbles:e.bubbles,cancelable:e.cancelable}))}__isValidConstraint(e){return!!e||e===0}});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Tc=n=>class extends Do(hi(Ps(ss(Ec(Tr(n)))))){static get properties(){return{allowedCharPattern:{type:String,observer:"_allowedCharPatternChanged"},autoselect:{type:Boolean,value:!1},name:{type:String,reflectToAttribute:!0},placeholder:{type:String,reflectToAttribute:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},title:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"name","type","placeholder","readonly","invalid","title"]}constructor(){super(),this._boundOnPaste=this._onPaste.bind(this),this._boundOnDrop=this._onDrop.bind(this),this._boundOnBeforeInput=this._onBeforeInput.bind(this)}get slotStyles(){return[`
          :is(input[slot='input'], textarea[slot='textarea'])::placeholder {
            font: inherit;
            color: inherit;
          }
        `]}_onFocus(e){super._onFocus(e),this.autoselect&&this.inputElement&&this.inputElement.select()}_addInputListeners(e){super._addInputListeners(e),e.addEventListener("paste",this._boundOnPaste),e.addEventListener("drop",this._boundOnDrop),e.addEventListener("beforeinput",this._boundOnBeforeInput)}_removeInputListeners(e){super._removeInputListeners(e),e.removeEventListener("paste",this._boundOnPaste),e.removeEventListener("drop",this._boundOnDrop),e.removeEventListener("beforeinput",this._boundOnBeforeInput)}_onKeyDown(e){super._onKeyDown(e),this.allowedCharPattern&&!this.__shouldAcceptKey(e)&&e.target===this.inputElement&&(e.preventDefault(),this._markInputPrevented())}_markInputPrevented(){this.setAttribute("input-prevented",""),this._preventInputDebouncer=D.debounce(this._preventInputDebouncer,Z.after(200),()=>{this.removeAttribute("input-prevented")})}__shouldAcceptKey(e){return e.metaKey||e.ctrlKey||!e.key||e.key.length!==1||this.__allowedCharRegExp.test(e.key)}_onPaste(e){if(this.allowedCharPattern){const r=e.clipboardData.getData("text");this.__allowedTextRegExp.test(r)||(e.preventDefault(),this._markInputPrevented())}}_onDrop(e){if(this.allowedCharPattern){const r=e.dataTransfer.getData("text");this.__allowedTextRegExp.test(r)||(e.preventDefault(),this._markInputPrevented())}}_onBeforeInput(e){this.allowedCharPattern&&e.data&&!this.__allowedTextRegExp.test(e.data)&&(e.preventDefault(),this._markInputPrevented())}_allowedCharPatternChanged(e){if(e)try{this.__allowedCharRegExp=new RegExp(`^${e}$`,"u"),this.__allowedTextRegExp=new RegExp(`^${e}*$`,"u")}catch(r){console.error(r)}}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ac=O`
  [part='clear-button'] {
    display: none;
    cursor: default;
  }

  [part='clear-button']::before {
    content: '\\2715';
  }

  :host([clear-button-visible][has-value]:not([disabled]):not([readonly])) [part='clear-button'] {
    display: block;
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Dc=O`
  [class$='container'] {
    display: flex;
    flex-direction: column;
    min-width: 100%;
    max-width: 100%;
    width: var(--vaadin-field-default-width, 12em);
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const kc=O`
  :host {
    display: inline-flex;
    outline: none;
  }

  :host::before {
    content: '\\2003';
    width: 0;
    display: inline-block;
    /* Size and position this element on the same vertical position as the input-field element
          to make vertical align for the host element work as expected */
  }

  :host([hidden]) {
    display: none !important;
  }

  :host(:not([has-label])) [part='label'] {
    display: none;
  }

  @media (forced-colors: active) {
    :host(:not([readonly])) [part='input-field'] {
      outline: 1px solid;
      outline-offset: -1px;
    }
    :host([focused]) [part='input-field'] {
      outline-width: 2px;
    }
    :host([disabled]) [part='input-field'] {
      outline-color: GrayText;
    }
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Rc=[kc,Dc,Ac];/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class $c{constructor(t){this.host=t,t.addEventListener("opened-changed",()=>{t.opened||this.__setVirtualKeyboardEnabled(!1)}),t.addEventListener("blur",()=>this.__setVirtualKeyboardEnabled(!0)),t.addEventListener("touchstart",()=>this.__setVirtualKeyboardEnabled(!0))}__setVirtualKeyboardEnabled(t){this.host.inputElement&&(this.host.inputElement.inputMode=t?"":"none")}}/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Mc=Object.freeze({monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],weekdays:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],weekdaysShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],firstDayOfWeek:0,today:"Today",cancel:"Cancel",referenceDate:"",formatDate(n){const t=String(n.year).replace(/\d+/u,e=>"0000".substr(e.length)+e);return[n.month+1,n.day,t].join("/")},parseDate(n){const t=n.split("/"),e=new Date;let r,i=e.getMonth(),o=e.getFullYear();if(t.length===3){if(i=parseInt(t[0])-1,r=parseInt(t[1]),o=parseInt(t[2]),t[2].length<3&&o>=0){const s=this.referenceDate?Ie(this.referenceDate):new Date;o=_c(s,o,i,r)}}else t.length===2?(i=parseInt(t[0])-1,r=parseInt(t[1])):t.length===1&&(r=parseInt(t[0]));if(r!==void 0)return{day:r,month:i,year:o}},formatTitle:(n,t)=>`${n} ${t}`}),zc=n=>class extends ha(Mc,fi(Ae(hi(Ps(Tr(n)))))){static get properties(){return{_selectedDate:{type:Object,sync:!0},_focusedDate:{type:Object,sync:!0},value:{type:String,notify:!0,value:"",sync:!0},initialPosition:String,opened:{type:Boolean,reflectToAttribute:!0,notify:!0,observer:"_openedChanged",sync:!0},autoOpenDisabled:{type:Boolean,sync:!0},showWeekNumbers:{type:Boolean,value:!1,sync:!0},_fullscreen:{type:Boolean,value:!1,sync:!0},_fullscreenMediaQuery:{value:"(max-width: 450px), (max-height: 450px)"},min:{type:String,sync:!0},max:{type:String,sync:!0},isDateDisabled:{type:Function},_minDate:{type:Date,computed:"__computeMinOrMaxDate(min)"},_maxDate:{type:Date,computed:"__computeMinOrMaxDate(max)"},_noInput:{type:Boolean,computed:"_isNoInput(inputElement, _fullscreen, _ios, __effectiveI18n, opened, autoOpenDisabled)"},_ios:{type:Boolean,value:Le},_focusOverlayOnOpen:Boolean,_overlayContent:{type:Object,sync:!0},__enteredDate:{type:Date,sync:!0}}}static get observers(){return["_selectedDateChanged(_selectedDate, __effectiveI18n)","_focusedDateChanged(_focusedDate, __effectiveI18n)","__updateOverlayContent(_overlayContent, __effectiveI18n, label, _minDate, _maxDate, _focusedDate, _selectedDate, showWeekNumbers, isDateDisabled, __enteredDate)","__updateOverlayContentTheme(_overlayContent, _theme)","__updateOverlayContentFullScreen(_overlayContent, _fullscreen)"]}static get constraints(){return[...super.constraints,"min","max"]}constructor(){super(),this._boundOnClick=this._onClick.bind(this),this._boundOnScroll=this._onScroll.bind(this),this._boundOverlayRenderer=this._overlayRenderer.bind(this)}get i18n(){return super.i18n}set i18n(e){super.i18n=e}get _inputElementValue(){return super._inputElementValue}set _inputElementValue(e){super._inputElementValue=e;const r=this.__parseDate(e);this.__setEnteredDate(r)}get clearElement(){return null}get _nativeInput(){return this.inputElement?this.inputElement.focusElement||this.inputElement:null}get __unparsableValue(){return!this._inputElementValue||this.__parseDate(this._inputElementValue)?"":this._inputElementValue}_onFocus(e){super._onFocus(e),this._noInput&&!Ze()&&e.target.blur()}_onBlur(e){super._onBlur(e),this.opened||(this.__commitParsedOrFocusedDate(),document.hasFocus()&&this._requestValidation())}ready(){super.ready(),this.addEventListener("click",this._boundOnClick),this.addController(new wi(this._fullscreenMediaQuery,r=>{this._fullscreen=r})),this.addController(new $c(this));const e=this.$.overlay;this._overlayElement=e,e.renderer=this._boundOverlayRenderer,this.addEventListener("mousedown",()=>this.__bringToFront()),this.addEventListener("touchstart",()=>this.__bringToFront())}disconnectedCallback(){super.disconnectedCallback(),this.opened=!1}focus(e){this._noInput&&!Ze()?this.open():super.focus(e)}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.$.overlay.close()}_overlayRenderer(e){if(e.firstChild)return;const r=document.createElement("vaadin-date-picker-overlay-content");e.appendChild(r),this._overlayContent=r,r.addEventListener("close",()=>{this._close()}),r.addEventListener("focus-input",this._focusAndSelect.bind(this)),r.addEventListener("date-tap",i=>{this.__commitDate(i.detail.date),this._close()}),r.addEventListener("date-selected",i=>{this.__commitDate(i.detail.date)}),r.addEventListener("focusin",()=>{this._keyboardActive&&this._setFocused(!0)}),r.addEventListener("focusout",i=>{this._shouldRemoveFocus(i)&&this._setFocused(!1)}),r.addEventListener("focused-date-changed",i=>{this._focusedDate=i.detail.value}),r.addEventListener("click",i=>i.stopPropagation())}__parseDate(e){if(!this.__effectiveI18n.parseDate)return;let r=this.__effectiveI18n.parseDate(e);if(r&&(r=Ie(`${r.year}-${r.month+1}-${r.day}`)),r&&!isNaN(r.getTime()))return r}__formatDate(e){if(this.__effectiveI18n.formatDate)return this.__effectiveI18n.formatDate(Rr(e))}checkValidity(){const e=this._inputElementValue,r=!e||!!this._selectedDate&&e===this.__formatDate(this._selectedDate),i=!this._selectedDate||ze(this._selectedDate,this._minDate,this._maxDate,this.isDateDisabled);let o=!0;return this.inputElement&&this.inputElement.checkValidity&&(o=this.inputElement.checkValidity()),r&&i&&o}_shouldSetFocus(e){return!this._shouldKeepFocusRing}_shouldKeepFocusOnClearMousedown(){return this.opened?!0:super._shouldKeepFocusOnClearMousedown()}_shouldRemoveFocus(e){const{relatedTarget:r}=e;return this.opened&&r!==null&&r!==document.body&&!this.contains(r)&&!this._overlayContent.contains(r)?!0:!this.opened}_setFocused(e){super._setFocused(e),this._shouldKeepFocusRing=e&&this._keyboardActive}__commitValueChange(){const e=this.__unparsableValue;this.__committedValue!==this.value?(this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))):this.__committedUnparsableValue!==e&&(this._requestValidation(),this.dispatchEvent(new CustomEvent("unparsable-change"))),this.__committedValue=this.value,this.__committedUnparsableValue=e}__commitDate(e){this.__keepCommittedValue=!0,this._selectedDate=e,this.__keepCommittedValue=!1,this.__commitValueChange()}_close(){this._focus(),this.close()}__bringToFront(){requestAnimationFrame(()=>{this.$.overlay.bringToFront()})}_isNoInput(e,r,i,o,s,a){return!e||r&&(!a||s)||i&&s||!o.parseDate}_formatISO(e){return mc(e)}_inputElementChanged(e){super._inputElementChanged(e),e&&(e.autocomplete="off",e.setAttribute("role","combobox"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded",!!this.opened),this._applyInputValue(this._selectedDate))}_openedChanged(e){this.inputElement&&this.inputElement.setAttribute("aria-expanded",e)}_selectedDateChanged(e,r){e===void 0||r===void 0||(this.__keepInputValue||this._applyInputValue(e),this.value=this._formatISO(e),this._ignoreFocusedDateChange=!0,this._focusedDate=e,this._ignoreFocusedDateChange=!1)}_focusedDateChanged(e,r){e===void 0||r===void 0||!this._ignoreFocusedDateChange&&!this._noInput&&this._applyInputValue(e)}_valueChanged(e,r){const i=Ie(e);if(e&&!i){this.value=r;return}e?ie(this._selectedDate,i)||(this._selectedDate=i,r!==void 0&&this._requestValidation()):this._selectedDate=null,this.__keepCommittedValue||(this.__committedValue=this.value,this.__committedUnparsableValue=""),this._toggleHasValue(this._hasValue)}__updateOverlayContent(e,r,i,o,s,a,l,u,f,p){e&&(e.i18n=r,e.label=i,e.minDate=o,e.maxDate=s,e.focusedDate=a,e.selectedDate=l,e.showWeekNumbers=u,e.isDateDisabled=f,e.enteredDate=p)}__updateOverlayContentTheme(e,r){e&&(r?e.setAttribute("theme",r):e.removeAttribute("theme"))}__updateOverlayContentFullScreen(e,r){e&&e.toggleAttribute("fullscreen",r)}_onOverlayEscapePress(){this._focusedDate=this._selectedDate,this._closedByEscape=!0,this._close(),this._closedByEscape=!1}_onOverlayOpened(){const e=this._overlayContent;e.reset();const r=this._getInitialPosition();e.initialPosition=r;const i=e.focusedDate||r;e.scrollToDate(i),this._ignoreFocusedDateChange=!0,e.focusedDate=i,this._ignoreFocusedDateChange=!1,window.addEventListener("scroll",this._boundOnScroll,!0),this._focusOverlayOnOpen?(e.focusDateElement(),this._focusOverlayOnOpen=!1):this._focus();const o=this._nativeInput;this._noInput&&o&&(o.blur(),this._overlayContent.focusDateElement());const s=this._noInput?e:[o,e];this.__showOthers=fa(s)}_getInitialPosition(){const e=Ie(this.initialPosition),r=this._selectedDate||this._overlayContent.initialPosition||e||new Date;return e||ze(r,this._minDate,this._maxDate,this.isDateDisabled)?r:this._minDate||this._maxDate?ws(r,[this._minDate,this._maxDate]):new Date}__commitParsedOrFocusedDate(){if(this._ignoreFocusedDateChange=!0,this.__effectiveI18n.parseDate){const e=this._inputElementValue||"",r=this.__parseDate(e);r?this.__commitDate(r):(this.__keepInputValue=!0,this.__commitDate(null),this.__keepInputValue=!1)}else this._focusedDate&&this.__commitDate(this._focusedDate);this._ignoreFocusedDateChange=!1}_onOverlayClosed(){this.__showOthers&&(this.__showOthers(),this.__showOthers=null),window.removeEventListener("scroll",this._boundOnScroll,!0),this._closedByEscape&&this._applyInputValue(this._selectedDate),this.__commitParsedOrFocusedDate(),this._nativeInput&&this._nativeInput.selectionStart&&(this._nativeInput.selectionStart=this._nativeInput.selectionEnd),!this.value&&!this._keyboardActive&&this._requestValidation()}_onScroll(e){(e.target===window||!this._overlayContent.contains(e.target))&&this._overlayContent._repositionYearScroller()}_focus(){this._noInput||this.inputElement.focus()}_focusAndSelect(){this._focus(),this._setSelectionRange(0,this._inputElementValue.length)}_applyInputValue(e){this._inputElementValue=e?this.__formatDate(e):""}_setSelectionRange(e,r){this._nativeInput&&this._nativeInput.setSelectionRange&&this._nativeInput.setSelectionRange(e,r)}_onChange(e){e.stopPropagation()}_onClick(e){this._isClearButton(e)||this._onHostClick(e)}_onHostClick(e){(!this.autoOpenDisabled||this._noInput)&&(e.preventDefault(),this.open())}_onClearButtonClick(e){e.preventDefault(),this.__commitDate(null)}_onKeyDown(e){switch(super._onKeyDown(e),this._noInput&&["Tab","Escape"].indexOf(e.key)===-1&&e.preventDefault(),e.key){case"ArrowDown":case"ArrowUp":e.preventDefault(),this.opened?this._overlayContent.focusDateElement():(this._focusOverlayOnOpen=!0,this.open());break;case"Tab":this.opened&&(e.preventDefault(),e.stopPropagation(),this._setSelectionRange(0,0),e.shiftKey?this._overlayContent.focusCancel():this._overlayContent.focusDateElement());break}}_onEnter(e){this.opened?this.close():this.__commitParsedOrFocusedDate()}_onEscape(e){if(!this.opened){if(this.clearButtonVisible&&this.value&&!this.readonly){e.stopPropagation(),this._onClearButtonClick(e);return}this.inputElement.value===""?this.__commitDate(null):this._applyInputValue(this._selectedDate)}}_isClearButton(e){return e.composedPath()[0]===this.clearElement}_onInput(){!this.opened&&this._inputElementValue&&!this.autoOpenDisabled&&this.open();const e=this.__parseDate(this._inputElementValue||"");e&&(this._ignoreFocusedDateChange=!0,ie(e,this._focusedDate)||(this._focusedDate=e),this._ignoreFocusedDateChange=!1),this.__setEnteredDate(e)}__setEnteredDate(e){e?ie(this.__enteredDate,e)||(this.__enteredDate=e):this.__enteredDate=null}__computeMinOrMaxDate(e){return Ie(e)}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Fc=O`
  :host([opened]) {
    pointer-events: auto;
  }

  :host([dir='rtl']) [part='input-field'] {
    direction: ltr;
  }

  :host([dir='rtl']) [part='input-field'] ::slotted(input)::placeholder {
    direction: rtl;
    text-align: left;
  }
`;/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-date-picker",[Rc,Fc],{moduleId:"vaadin-date-picker-styles"});class Lc extends zc(Tc(J(Te(L)))){static get is(){return"vaadin-date-picker"}static get template(){return G`
      <div class="vaadin-date-picker-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-input-container
          part="input-field"
          readonly="[[readonly]]"
          disabled="[[disabled]]"
          invalid="[[invalid]]"
          theme$="[[_theme]]"
        >
          <slot name="prefix" slot="prefix"></slot>
          <slot name="input"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
          <div part="toggle-button" slot="suffix" aria-hidden="true" on-click="_toggle"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-date-picker-overlay
        id="overlay"
        fullscreen$="[[_fullscreen]]"
        theme$="[[_theme]]"
        opened="{{opened}}"
        on-vaadin-overlay-escape-press="_onOverlayEscapePress"
        on-vaadin-overlay-open="_onOverlayOpened"
        on-vaadin-overlay-closing="_onOverlayClosed"
        restore-focus-on-close
        restore-focus-node="[[inputElement]]"
      ></vaadin-date-picker-overlay>
    `}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new as(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e},{uniqueIdPrefix:"search-input"})),this.addController(new ls(this.inputElement,this._labelController)),this._tooltipController=new ui(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(e=>!e.opened),this.shadowRoot.querySelector('[part="toggle-button"]').addEventListener("mousedown",e=>e.preventDefault()),this.$.overlay.addEventListener("vaadin-overlay-close",this._onVaadinOverlayClose.bind(this))}_onVaadinOverlayClose(t){t.detail.sourceEvent&&t.detail.sourceEvent.composedPath().includes(this)&&t.preventDefault()}_toggle(t){t.stopPropagation(),this.$.overlay.opened?this.close():this.open()}_openedChanged(t){super._openedChanged(t),this.$.overlay.positionTarget=this.shadowRoot.querySelector('[part="input-field"]'),this.$.overlay.noVerticalOverlap=!0}}W(Lc);function U(n,t){if(t.length<n)throw new TypeError(n+" argument"+(n>1?"s":"")+" required, but only "+t.length+" present")}function it(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?it=function(e){return typeof e}:it=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},it(n)}function Nc(n){return U(1,arguments),n instanceof Date||it(n)==="object"&&Object.prototype.toString.call(n)==="[object Date]"}function ot(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ot=function(e){return typeof e}:ot=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ot(n)}function X(n){U(1,arguments);var t=Object.prototype.toString.call(n);return n instanceof Date||ot(n)==="object"&&t==="[object Date]"?new Date(n.getTime()):typeof n=="number"||t==="[object Number]"?new Date(n):((typeof n=="string"||t==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}function Gr(n){if(U(1,arguments),!Nc(n)&&typeof n!="number")return!1;var t=X(n);return!isNaN(Number(t))}function re(n){if(n===null||n===!0||n===!1)return NaN;var t=Number(n);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function Hc(n,t){U(2,arguments);var e=X(n).getTime(),r=re(t);return new Date(e+r)}function Es(n,t){U(2,arguments);var e=re(t);return Hc(n,-e)}var Bc=864e5;function Vc(n){U(1,arguments);var t=X(n),e=t.getTime();t.setUTCMonth(0,1),t.setUTCHours(0,0,0,0);var r=t.getTime(),i=e-r;return Math.floor(i/Bc)+1}function Be(n){U(1,arguments);var t=1,e=X(n),r=e.getUTCDay(),i=(r<t?7:0)+r-t;return e.setUTCDate(e.getUTCDate()-i),e.setUTCHours(0,0,0,0),e}function Ts(n){U(1,arguments);var t=X(n),e=t.getUTCFullYear(),r=new Date(0);r.setUTCFullYear(e+1,0,4),r.setUTCHours(0,0,0,0);var i=Be(r),o=new Date(0);o.setUTCFullYear(e,0,4),o.setUTCHours(0,0,0,0);var s=Be(o);return t.getTime()>=i.getTime()?e+1:t.getTime()>=s.getTime()?e:e-1}function Wc(n){U(1,arguments);var t=Ts(n),e=new Date(0);e.setUTCFullYear(t,0,4),e.setUTCHours(0,0,0,0);var r=Be(e);return r}var Yc=6048e5;function As(n){U(1,arguments);var t=X(n),e=Be(t).getTime()-Wc(t).getTime();return Math.round(e/Yc)+1}var Uc={};function Ve(){return Uc}function Ee(n,t){var e,r,i,o,s,a,l,u;U(1,arguments);var f=Ve(),p=re((e=(r=(i=(o=t?.weekStartsOn)!==null&&o!==void 0?o:t==null||(s=t.locale)===null||s===void 0||(a=s.options)===null||a===void 0?void 0:a.weekStartsOn)!==null&&i!==void 0?i:f.weekStartsOn)!==null&&r!==void 0?r:(l=f.locale)===null||l===void 0||(u=l.options)===null||u===void 0?void 0:u.weekStartsOn)!==null&&e!==void 0?e:0);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var m=X(n),g=m.getUTCDay(),b=(g<p?7:0)+g-p;return m.setUTCDate(m.getUTCDate()-b),m.setUTCHours(0,0,0,0),m}function xi(n,t){var e,r,i,o,s,a,l,u;U(1,arguments);var f=X(n),p=f.getUTCFullYear(),m=Ve(),g=re((e=(r=(i=(o=t?.firstWeekContainsDate)!==null&&o!==void 0?o:t==null||(s=t.locale)===null||s===void 0||(a=s.options)===null||a===void 0?void 0:a.firstWeekContainsDate)!==null&&i!==void 0?i:m.firstWeekContainsDate)!==null&&r!==void 0?r:(l=m.locale)===null||l===void 0||(u=l.options)===null||u===void 0?void 0:u.firstWeekContainsDate)!==null&&e!==void 0?e:1);if(!(g>=1&&g<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var b=new Date(0);b.setUTCFullYear(p+1,0,g),b.setUTCHours(0,0,0,0);var w=Ee(b,t),C=new Date(0);C.setUTCFullYear(p,0,g),C.setUTCHours(0,0,0,0);var I=Ee(C,t);return f.getTime()>=w.getTime()?p+1:f.getTime()>=I.getTime()?p:p-1}function qc(n,t){var e,r,i,o,s,a,l,u;U(1,arguments);var f=Ve(),p=re((e=(r=(i=(o=t?.firstWeekContainsDate)!==null&&o!==void 0?o:t==null||(s=t.locale)===null||s===void 0||(a=s.options)===null||a===void 0?void 0:a.firstWeekContainsDate)!==null&&i!==void 0?i:f.firstWeekContainsDate)!==null&&r!==void 0?r:(l=f.locale)===null||l===void 0||(u=l.options)===null||u===void 0?void 0:u.firstWeekContainsDate)!==null&&e!==void 0?e:1),m=xi(n,t),g=new Date(0);g.setUTCFullYear(m,0,p),g.setUTCHours(0,0,0,0);var b=Ee(g,t);return b}var jc=6048e5;function Ds(n,t){U(1,arguments);var e=X(n),r=Ee(e,t).getTime()-qc(e,t).getTime();return Math.round(r/jc)+1}function R(n,t){for(var e=n<0?"-":"",r=Math.abs(n).toString();r.length<t;)r="0"+r;return e+r}var me={y:function(t,e){var r=t.getUTCFullYear(),i=r>0?r:1-r;return R(e==="yy"?i%100:i,e.length)},M:function(t,e){var r=t.getUTCMonth();return e==="M"?String(r+1):R(r+1,2)},d:function(t,e){return R(t.getUTCDate(),e.length)},a:function(t,e){var r=t.getUTCHours()/12>=1?"pm":"am";switch(e){case"a":case"aa":return r.toUpperCase();case"aaa":return r;case"aaaaa":return r[0];case"aaaa":default:return r==="am"?"a.m.":"p.m."}},h:function(t,e){return R(t.getUTCHours()%12||12,e.length)},H:function(t,e){return R(t.getUTCHours(),e.length)},m:function(t,e){return R(t.getUTCMinutes(),e.length)},s:function(t,e){return R(t.getUTCSeconds(),e.length)},S:function(t,e){var r=e.length,i=t.getUTCMilliseconds(),o=Math.floor(i*Math.pow(10,r-3));return R(o,e.length)}},Re={midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},Gc={G:function(t,e,r){var i=t.getUTCFullYear()>0?1:0;switch(e){case"G":case"GG":case"GGG":return r.era(i,{width:"abbreviated"});case"GGGGG":return r.era(i,{width:"narrow"});case"GGGG":default:return r.era(i,{width:"wide"})}},y:function(t,e,r){if(e==="yo"){var i=t.getUTCFullYear(),o=i>0?i:1-i;return r.ordinalNumber(o,{unit:"year"})}return me.y(t,e)},Y:function(t,e,r,i){var o=xi(t,i),s=o>0?o:1-o;if(e==="YY"){var a=s%100;return R(a,2)}return e==="Yo"?r.ordinalNumber(s,{unit:"year"}):R(s,e.length)},R:function(t,e){var r=Ts(t);return R(r,e.length)},u:function(t,e){var r=t.getUTCFullYear();return R(r,e.length)},Q:function(t,e,r){var i=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"Q":return String(i);case"QQ":return R(i,2);case"Qo":return r.ordinalNumber(i,{unit:"quarter"});case"QQQ":return r.quarter(i,{width:"abbreviated",context:"formatting"});case"QQQQQ":return r.quarter(i,{width:"narrow",context:"formatting"});case"QQQQ":default:return r.quarter(i,{width:"wide",context:"formatting"})}},q:function(t,e,r){var i=Math.ceil((t.getUTCMonth()+1)/3);switch(e){case"q":return String(i);case"qq":return R(i,2);case"qo":return r.ordinalNumber(i,{unit:"quarter"});case"qqq":return r.quarter(i,{width:"abbreviated",context:"standalone"});case"qqqqq":return r.quarter(i,{width:"narrow",context:"standalone"});case"qqqq":default:return r.quarter(i,{width:"wide",context:"standalone"})}},M:function(t,e,r){var i=t.getUTCMonth();switch(e){case"M":case"MM":return me.M(t,e);case"Mo":return r.ordinalNumber(i+1,{unit:"month"});case"MMM":return r.month(i,{width:"abbreviated",context:"formatting"});case"MMMMM":return r.month(i,{width:"narrow",context:"formatting"});case"MMMM":default:return r.month(i,{width:"wide",context:"formatting"})}},L:function(t,e,r){var i=t.getUTCMonth();switch(e){case"L":return String(i+1);case"LL":return R(i+1,2);case"Lo":return r.ordinalNumber(i+1,{unit:"month"});case"LLL":return r.month(i,{width:"abbreviated",context:"standalone"});case"LLLLL":return r.month(i,{width:"narrow",context:"standalone"});case"LLLL":default:return r.month(i,{width:"wide",context:"standalone"})}},w:function(t,e,r,i){var o=Ds(t,i);return e==="wo"?r.ordinalNumber(o,{unit:"week"}):R(o,e.length)},I:function(t,e,r){var i=As(t);return e==="Io"?r.ordinalNumber(i,{unit:"week"}):R(i,e.length)},d:function(t,e,r){return e==="do"?r.ordinalNumber(t.getUTCDate(),{unit:"date"}):me.d(t,e)},D:function(t,e,r){var i=Vc(t);return e==="Do"?r.ordinalNumber(i,{unit:"dayOfYear"}):R(i,e.length)},E:function(t,e,r){var i=t.getUTCDay();switch(e){case"E":case"EE":case"EEE":return r.day(i,{width:"abbreviated",context:"formatting"});case"EEEEE":return r.day(i,{width:"narrow",context:"formatting"});case"EEEEEE":return r.day(i,{width:"short",context:"formatting"});case"EEEE":default:return r.day(i,{width:"wide",context:"formatting"})}},e:function(t,e,r,i){var o=t.getUTCDay(),s=(o-i.weekStartsOn+8)%7||7;switch(e){case"e":return String(s);case"ee":return R(s,2);case"eo":return r.ordinalNumber(s,{unit:"day"});case"eee":return r.day(o,{width:"abbreviated",context:"formatting"});case"eeeee":return r.day(o,{width:"narrow",context:"formatting"});case"eeeeee":return r.day(o,{width:"short",context:"formatting"});case"eeee":default:return r.day(o,{width:"wide",context:"formatting"})}},c:function(t,e,r,i){var o=t.getUTCDay(),s=(o-i.weekStartsOn+8)%7||7;switch(e){case"c":return String(s);case"cc":return R(s,e.length);case"co":return r.ordinalNumber(s,{unit:"day"});case"ccc":return r.day(o,{width:"abbreviated",context:"standalone"});case"ccccc":return r.day(o,{width:"narrow",context:"standalone"});case"cccccc":return r.day(o,{width:"short",context:"standalone"});case"cccc":default:return r.day(o,{width:"wide",context:"standalone"})}},i:function(t,e,r){var i=t.getUTCDay(),o=i===0?7:i;switch(e){case"i":return String(o);case"ii":return R(o,e.length);case"io":return r.ordinalNumber(o,{unit:"day"});case"iii":return r.day(i,{width:"abbreviated",context:"formatting"});case"iiiii":return r.day(i,{width:"narrow",context:"formatting"});case"iiiiii":return r.day(i,{width:"short",context:"formatting"});case"iiii":default:return r.day(i,{width:"wide",context:"formatting"})}},a:function(t,e,r){var i=t.getUTCHours(),o=i/12>=1?"pm":"am";switch(e){case"a":case"aa":return r.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"aaa":return r.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return r.dayPeriod(o,{width:"narrow",context:"formatting"});case"aaaa":default:return r.dayPeriod(o,{width:"wide",context:"formatting"})}},b:function(t,e,r){var i=t.getUTCHours(),o;switch(i===12?o=Re.noon:i===0?o=Re.midnight:o=i/12>=1?"pm":"am",e){case"b":case"bb":return r.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"bbb":return r.dayPeriod(o,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return r.dayPeriod(o,{width:"narrow",context:"formatting"});case"bbbb":default:return r.dayPeriod(o,{width:"wide",context:"formatting"})}},B:function(t,e,r){var i=t.getUTCHours(),o;switch(i>=17?o=Re.evening:i>=12?o=Re.afternoon:i>=4?o=Re.morning:o=Re.night,e){case"B":case"BB":case"BBB":return r.dayPeriod(o,{width:"abbreviated",context:"formatting"});case"BBBBB":return r.dayPeriod(o,{width:"narrow",context:"formatting"});case"BBBB":default:return r.dayPeriod(o,{width:"wide",context:"formatting"})}},h:function(t,e,r){if(e==="ho"){var i=t.getUTCHours()%12;return i===0&&(i=12),r.ordinalNumber(i,{unit:"hour"})}return me.h(t,e)},H:function(t,e,r){return e==="Ho"?r.ordinalNumber(t.getUTCHours(),{unit:"hour"}):me.H(t,e)},K:function(t,e,r){var i=t.getUTCHours()%12;return e==="Ko"?r.ordinalNumber(i,{unit:"hour"}):R(i,e.length)},k:function(t,e,r){var i=t.getUTCHours();return i===0&&(i=24),e==="ko"?r.ordinalNumber(i,{unit:"hour"}):R(i,e.length)},m:function(t,e,r){return e==="mo"?r.ordinalNumber(t.getUTCMinutes(),{unit:"minute"}):me.m(t,e)},s:function(t,e,r){return e==="so"?r.ordinalNumber(t.getUTCSeconds(),{unit:"second"}):me.s(t,e)},S:function(t,e){return me.S(t,e)},X:function(t,e,r,i){var o=i._originalDate||t,s=o.getTimezoneOffset();if(s===0)return"Z";switch(e){case"X":return Yi(s);case"XXXX":case"XX":return Se(s);case"XXXXX":case"XXX":default:return Se(s,":")}},x:function(t,e,r,i){var o=i._originalDate||t,s=o.getTimezoneOffset();switch(e){case"x":return Yi(s);case"xxxx":case"xx":return Se(s);case"xxxxx":case"xxx":default:return Se(s,":")}},O:function(t,e,r,i){var o=i._originalDate||t,s=o.getTimezoneOffset();switch(e){case"O":case"OO":case"OOO":return"GMT"+Wi(s,":");case"OOOO":default:return"GMT"+Se(s,":")}},z:function(t,e,r,i){var o=i._originalDate||t,s=o.getTimezoneOffset();switch(e){case"z":case"zz":case"zzz":return"GMT"+Wi(s,":");case"zzzz":default:return"GMT"+Se(s,":")}},t:function(t,e,r,i){var o=i._originalDate||t,s=Math.floor(o.getTime()/1e3);return R(s,e.length)},T:function(t,e,r,i){var o=i._originalDate||t,s=o.getTime();return R(s,e.length)}};function Wi(n,t){var e=n>0?"-":"+",r=Math.abs(n),i=Math.floor(r/60),o=r%60;if(o===0)return e+String(i);var s=t;return e+String(i)+s+R(o,2)}function Yi(n,t){if(n%60===0){var e=n>0?"-":"+";return e+R(Math.abs(n)/60,2)}return Se(n,t)}function Se(n,t){var e=t||"",r=n>0?"-":"+",i=Math.abs(n),o=R(Math.floor(i/60),2),s=R(i%60,2);return r+o+e+s}var Ui=function(t,e){switch(t){case"P":return e.date({width:"short"});case"PP":return e.date({width:"medium"});case"PPP":return e.date({width:"long"});case"PPPP":default:return e.date({width:"full"})}},ks=function(t,e){switch(t){case"p":return e.time({width:"short"});case"pp":return e.time({width:"medium"});case"ppp":return e.time({width:"long"});case"pppp":default:return e.time({width:"full"})}},Kc=function(t,e){var r=t.match(/(P+)(p+)?/)||[],i=r[1],o=r[2];if(!o)return Ui(t,e);var s;switch(i){case"P":s=e.dateTime({width:"short"});break;case"PP":s=e.dateTime({width:"medium"});break;case"PPP":s=e.dateTime({width:"long"});break;case"PPPP":default:s=e.dateTime({width:"full"});break}return s.replace("{{date}}",Ui(i,e)).replace("{{time}}",ks(o,e))},Kr={p:ks,P:Kc};function Rs(n){var t=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return t.setUTCFullYear(n.getFullYear()),n.getTime()-t.getTime()}var Qc=["D","DD"],Xc=["YY","YYYY"];function $s(n){return Qc.indexOf(n)!==-1}function Ms(n){return Xc.indexOf(n)!==-1}function jt(n,t,e){if(n==="YYYY")throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(n==="YY")throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(n==="D")throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(n==="DD")throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(e,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var Zc={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},Jc=function(t,e,r){var i,o=Zc[t];return typeof o=="string"?i=o:e===1?i=o.one:i=o.other.replace("{{count}}",e.toString()),r!=null&&r.addSuffix?r.comparison&&r.comparison>0?"in "+i:i+" ago":i};function Lr(n){return function(){var t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},e=t.width?String(t.width):n.defaultWidth,r=n.formats[e]||n.formats[n.defaultWidth];return r}}var eu={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},tu={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},ru={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},nu={date:Lr({formats:eu,defaultWidth:"full"}),time:Lr({formats:tu,defaultWidth:"full"}),dateTime:Lr({formats:ru,defaultWidth:"full"})},iu={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},ou=function(t,e,r,i){return iu[t]};function Ye(n){return function(t,e){var r=e!=null&&e.context?String(e.context):"standalone",i;if(r==="formatting"&&n.formattingValues){var o=n.defaultFormattingWidth||n.defaultWidth,s=e!=null&&e.width?String(e.width):o;i=n.formattingValues[s]||n.formattingValues[o]}else{var a=n.defaultWidth,l=e!=null&&e.width?String(e.width):n.defaultWidth;i=n.values[l]||n.values[a]}var u=n.argumentCallback?n.argumentCallback(t):t;return i[u]}}var su={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},au={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},lu={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},cu={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},uu={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},du={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},hu=function(t,e){var r=Number(t),i=r%100;if(i>20||i<10)switch(i%10){case 1:return r+"st";case 2:return r+"nd";case 3:return r+"rd"}return r+"th"},fu={ordinalNumber:hu,era:Ye({values:su,defaultWidth:"wide"}),quarter:Ye({values:au,defaultWidth:"wide",argumentCallback:function(t){return t-1}}),month:Ye({values:lu,defaultWidth:"wide"}),day:Ye({values:cu,defaultWidth:"wide"}),dayPeriod:Ye({values:uu,defaultWidth:"wide",formattingValues:du,defaultFormattingWidth:"wide"})};function Ue(n){return function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=e.width,i=r&&n.matchPatterns[r]||n.matchPatterns[n.defaultMatchWidth],o=t.match(i);if(!o)return null;var s=o[0],a=r&&n.parsePatterns[r]||n.parsePatterns[n.defaultParseWidth],l=Array.isArray(a)?pu(a,function(p){return p.test(s)}):_u(a,function(p){return p.test(s)}),u;u=n.valueCallback?n.valueCallback(l):l,u=e.valueCallback?e.valueCallback(u):u;var f=t.slice(s.length);return{value:u,rest:f}}}function _u(n,t){for(var e in n)if(n.hasOwnProperty(e)&&t(n[e]))return e}function pu(n,t){for(var e=0;e<n.length;e++)if(t(n[e]))return e}function mu(n){return function(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},r=t.match(n.matchPattern);if(!r)return null;var i=r[0],o=t.match(n.parsePattern);if(!o)return null;var s=n.valueCallback?n.valueCallback(o[0]):o[0];s=e.valueCallback?e.valueCallback(s):s;var a=t.slice(i.length);return{value:s,rest:a}}}var gu=/^(\d+)(th|st|nd|rd)?/i,yu=/\d+/i,bu={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},vu={any:[/^b/i,/^(a|c)/i]},wu={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Cu={any:[/1/i,/2/i,/3/i,/4/i]},xu={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Su={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Ou={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},Iu={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},Pu={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},Eu={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},Tu={ordinalNumber:mu({matchPattern:gu,parsePattern:yu,valueCallback:function(t){return parseInt(t,10)}}),era:Ue({matchPatterns:bu,defaultMatchWidth:"wide",parsePatterns:vu,defaultParseWidth:"any"}),quarter:Ue({matchPatterns:wu,defaultMatchWidth:"wide",parsePatterns:Cu,defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:Ue({matchPatterns:xu,defaultMatchWidth:"wide",parsePatterns:Su,defaultParseWidth:"any"}),day:Ue({matchPatterns:Ou,defaultMatchWidth:"wide",parsePatterns:Iu,defaultParseWidth:"any"}),dayPeriod:Ue({matchPatterns:Pu,defaultMatchWidth:"any",parsePatterns:Eu,defaultParseWidth:"any"})},zs={code:"en-US",formatDistance:Jc,formatLong:nu,formatRelative:ou,localize:fu,match:Tu,options:{weekStartsOn:0,firstWeekContainsDate:1}},Au=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Du=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,ku=/^'([^]*?)'?$/,Ru=/''/g,$u=/[a-zA-Z]/;function Mu(n,t,e){var r,i,o,s,a,l,u,f,p,m,g,b,w,C;U(2,arguments);var I=String(t),M=Ve(),K=(r=(i=void 0)!==null&&i!==void 0?i:M.locale)!==null&&r!==void 0?r:zs,j=re((o=(s=(a=(l=void 0)!==null&&l!==void 0?l:void 0)!==null&&a!==void 0?a:M.firstWeekContainsDate)!==null&&s!==void 0?s:(u=M.locale)===null||u===void 0||(f=u.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&o!==void 0?o:1);if(!(j>=1&&j<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var $=re((p=(m=(g=(b=void 0)!==null&&b!==void 0?b:void 0)!==null&&g!==void 0?g:M.weekStartsOn)!==null&&m!==void 0?m:(w=M.locale)===null||w===void 0||(C=w.options)===null||C===void 0?void 0:C.weekStartsOn)!==null&&p!==void 0?p:0);if(!($>=0&&$<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!K.localize)throw new RangeError("locale must contain localize property");if(!K.formatLong)throw new RangeError("locale must contain formatLong property");var Y=X(n);if(!Gr(Y))throw new RangeError("Invalid time value");var ae=Rs(Y),he=Es(Y,ae),le={firstWeekContainsDate:j,weekStartsOn:$,locale:K,_originalDate:Y},De=I.match(Du).map(function(q){var Q=q[0];if(Q==="p"||Q==="P"){var ce=Kr[Q];return ce(q,K.formatLong)}return q}).join("").match(Au).map(function(q){if(q==="''")return"'";var Q=q[0];if(Q==="'")return zu(q);var ce=Gc[Q];if(ce)return Ms(q)&&jt(q,t,String(n)),$s(q)&&jt(q,t,String(n)),ce(he,q,K.localize,le);if(Q.match($u))throw new RangeError("Format string contains an unescaped latin alphabet character `"+Q+"`");return q}).join("");return De}function zu(n){var t=n.match(ku);return t?t[1].replace(Ru,"'"):n}function Fu(n,t){if(n==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(n[e]=t[e]);return n}function st(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?st=function(e){return typeof e}:st=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},st(n)}function Fs(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Qr(n,t)}function Qr(n,t){return Qr=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Qr(n,t)}function Ls(n){var t=Nu();return function(){var r=Gt(n),i;if(t){var o=Gt(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Lu(this,i)}}function Lu(n,t){return t&&(st(t)==="object"||typeof t=="function")?t:Xr(n)}function Xr(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Nu(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Gt(n){return Gt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Gt(n)}function Si(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Hu(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Oi(n,t,e){return t&&Hu(n.prototype,t),n}function Zr(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Bu=10,Ns=(function(){function n(){Si(this,n),Zr(this,"subPriority",0)}return Oi(n,[{key:"validate",value:function(e,r){return!0}}]),n})(),Vu=(function(n){Fs(e,n);var t=Ls(e);function e(r,i,o,s,a){var l;return Si(this,e),l=t.call(this),l.value=r,l.validateValue=i,l.setValue=o,l.priority=s,a&&(l.subPriority=a),l}return Oi(e,[{key:"validate",value:function(i,o){return this.validateValue(i,this.value,o)}},{key:"set",value:function(i,o,s){return this.setValue(i,o,this.value,s)}}]),e})(Ns),Wu=(function(n){Fs(e,n);var t=Ls(e);function e(){var r;Si(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Zr(Xr(r),"priority",Bu),Zr(Xr(r),"subPriority",-1),r}return Oi(e,[{key:"set",value:function(i,o){if(o.timestampIsSet)return i;var s=new Date(0);return s.setFullYear(i.getUTCFullYear(),i.getUTCMonth(),i.getUTCDate()),s.setHours(i.getUTCHours(),i.getUTCMinutes(),i.getUTCSeconds(),i.getUTCMilliseconds()),s}}]),e})(Ns);function Yu(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Uu(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function qu(n,t,e){return t&&Uu(n.prototype,t),n}var k=(function(){function n(){Yu(this,n)}return qu(n,[{key:"run",value:function(e,r,i,o){var s=this.parse(e,r,i,o);return s?{setter:new Vu(s.value,this.validate,this.set,this.priority,this.subPriority),rest:s.rest}:null}},{key:"validate",value:function(e,r,i){return!0}}]),n})();function at(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?at=function(e){return typeof e}:at=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},at(n)}function ju(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Gu(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Ku(n,t,e){return t&&Gu(n.prototype,t),n}function Qu(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Jr(n,t)}function Jr(n,t){return Jr=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Jr(n,t)}function Xu(n){var t=Ju();return function(){var r=Kt(n),i;if(t){var o=Kt(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Zu(this,i)}}function Zu(n,t){return t&&(at(t)==="object"||typeof t=="function")?t:en(n)}function en(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Ju(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Kt(n){return Kt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Kt(n)}function qi(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var ed=(function(n){Qu(e,n);var t=Xu(e);function e(){var r;ju(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),qi(en(r),"priority",140),qi(en(r),"incompatibleTokens",["R","u","t","T"]),r}return Ku(e,[{key:"parse",value:function(i,o,s){switch(o){case"G":case"GG":case"GGG":return s.era(i,{width:"abbreviated"})||s.era(i,{width:"narrow"});case"GGGGG":return s.era(i,{width:"narrow"});case"GGGG":default:return s.era(i,{width:"wide"})||s.era(i,{width:"abbreviated"})||s.era(i,{width:"narrow"})}}},{key:"set",value:function(i,o,s){return o.era=s,i.setUTCFullYear(s,0,1),i.setUTCHours(0,0,0,0),i}}]),e})(k),td=6e4,rd=36e5,nd=1e3,B={month:/^(1[0-2]|0?\d)/,date:/^(3[0-1]|[0-2]?\d)/,dayOfYear:/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,week:/^(5[0-3]|[0-4]?\d)/,hour23h:/^(2[0-3]|[0-1]?\d)/,hour24h:/^(2[0-4]|[0-1]?\d)/,hour11h:/^(1[0-1]|0?\d)/,hour12h:/^(1[0-2]|0?\d)/,minute:/^[0-5]?\d/,second:/^[0-5]?\d/,singleDigit:/^\d/,twoDigits:/^\d{1,2}/,threeDigits:/^\d{1,3}/,fourDigits:/^\d{1,4}/,anyDigitsSigned:/^-?\d+/,singleDigitSigned:/^-?\d/,twoDigitsSigned:/^-?\d{1,2}/,threeDigitsSigned:/^-?\d{1,3}/,fourDigitsSigned:/^-?\d{1,4}/},ue={basicOptionalMinutes:/^([+-])(\d{2})(\d{2})?|Z/,basic:/^([+-])(\d{2})(\d{2})|Z/,basicOptionalSeconds:/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,extended:/^([+-])(\d{2}):(\d{2})|Z/,extendedOptionalSeconds:/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/};function V(n,t){return n&&{value:t(n.value),rest:n.rest}}function z(n,t){var e=t.match(n);return e?{value:parseInt(e[0],10),rest:t.slice(e[0].length)}:null}function de(n,t){var e=t.match(n);if(!e)return null;if(e[0]==="Z")return{value:0,rest:t.slice(1)};var r=e[1]==="+"?1:-1,i=e[2]?parseInt(e[2],10):0,o=e[3]?parseInt(e[3],10):0,s=e[5]?parseInt(e[5],10):0;return{value:r*(i*rd+o*td+s*nd),rest:t.slice(e[0].length)}}function Hs(n){return z(B.anyDigitsSigned,n)}function F(n,t){switch(n){case 1:return z(B.singleDigit,t);case 2:return z(B.twoDigits,t);case 3:return z(B.threeDigits,t);case 4:return z(B.fourDigits,t);default:return z(new RegExp("^\\d{1,"+n+"}"),t)}}function Qt(n,t){switch(n){case 1:return z(B.singleDigitSigned,t);case 2:return z(B.twoDigitsSigned,t);case 3:return z(B.threeDigitsSigned,t);case 4:return z(B.fourDigitsSigned,t);default:return z(new RegExp("^-?\\d{1,"+n+"}"),t)}}function Ii(n){switch(n){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;case"am":case"midnight":case"night":default:return 0}}function Bs(n,t){var e=t>0,r=e?t:1-t,i;if(r<=50)i=n||100;else{var o=r+50,s=Math.floor(o/100)*100,a=n>=o%100;i=n+s-(a?100:0)}return e?i:1-i}function Vs(n){return n%400===0||n%4===0&&n%100!==0}function lt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?lt=function(e){return typeof e}:lt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},lt(n)}function id(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function od(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function sd(n,t,e){return t&&od(n.prototype,t),n}function ad(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&tn(n,t)}function tn(n,t){return tn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},tn(n,t)}function ld(n){var t=ud();return function(){var r=Xt(n),i;if(t){var o=Xt(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return cd(this,i)}}function cd(n,t){return t&&(lt(t)==="object"||typeof t=="function")?t:rn(n)}function rn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ud(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Xt(n){return Xt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Xt(n)}function ji(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var dd=(function(n){ad(e,n);var t=ld(e);function e(){var r;id(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),ji(rn(r),"priority",130),ji(rn(r),"incompatibleTokens",["Y","R","u","w","I","i","e","c","t","T"]),r}return sd(e,[{key:"parse",value:function(i,o,s){var a=function(u){return{year:u,isTwoDigitYear:o==="yy"}};switch(o){case"y":return V(F(4,i),a);case"yo":return V(s.ordinalNumber(i,{unit:"year"}),a);default:return V(F(o.length,i),a)}}},{key:"validate",value:function(i,o){return o.isTwoDigitYear||o.year>0}},{key:"set",value:function(i,o,s){var a=i.getUTCFullYear();if(s.isTwoDigitYear){var l=Bs(s.year,a);return i.setUTCFullYear(l,0,1),i.setUTCHours(0,0,0,0),i}var u=!("era"in o)||o.era===1?s.year:1-s.year;return i.setUTCFullYear(u,0,1),i.setUTCHours(0,0,0,0),i}}]),e})(k);function ct(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ct=function(e){return typeof e}:ct=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ct(n)}function hd(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function fd(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function _d(n,t,e){return t&&fd(n.prototype,t),n}function pd(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&nn(n,t)}function nn(n,t){return nn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},nn(n,t)}function md(n){var t=yd();return function(){var r=Zt(n),i;if(t){var o=Zt(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return gd(this,i)}}function gd(n,t){return t&&(ct(t)==="object"||typeof t=="function")?t:on(n)}function on(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function yd(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Zt(n){return Zt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Zt(n)}function Gi(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var bd=(function(n){pd(e,n);var t=md(e);function e(){var r;hd(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Gi(on(r),"priority",130),Gi(on(r),"incompatibleTokens",["y","R","u","Q","q","M","L","I","d","D","i","t","T"]),r}return _d(e,[{key:"parse",value:function(i,o,s){var a=function(u){return{year:u,isTwoDigitYear:o==="YY"}};switch(o){case"Y":return V(F(4,i),a);case"Yo":return V(s.ordinalNumber(i,{unit:"year"}),a);default:return V(F(o.length,i),a)}}},{key:"validate",value:function(i,o){return o.isTwoDigitYear||o.year>0}},{key:"set",value:function(i,o,s,a){var l=xi(i,a);if(s.isTwoDigitYear){var u=Bs(s.year,l);return i.setUTCFullYear(u,0,a.firstWeekContainsDate),i.setUTCHours(0,0,0,0),Ee(i,a)}var f=!("era"in o)||o.era===1?s.year:1-s.year;return i.setUTCFullYear(f,0,a.firstWeekContainsDate),i.setUTCHours(0,0,0,0),Ee(i,a)}}]),e})(k);function ut(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ut=function(e){return typeof e}:ut=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ut(n)}function vd(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function wd(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Cd(n,t,e){return t&&wd(n.prototype,t),n}function xd(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&sn(n,t)}function sn(n,t){return sn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},sn(n,t)}function Sd(n){var t=Id();return function(){var r=Jt(n),i;if(t){var o=Jt(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Od(this,i)}}function Od(n,t){return t&&(ut(t)==="object"||typeof t=="function")?t:an(n)}function an(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Id(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Jt(n){return Jt=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Jt(n)}function Ki(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Pd=(function(n){xd(e,n);var t=Sd(e);function e(){var r;vd(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Ki(an(r),"priority",130),Ki(an(r),"incompatibleTokens",["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"]),r}return Cd(e,[{key:"parse",value:function(i,o){return Qt(o==="R"?4:o.length,i)}},{key:"set",value:function(i,o,s){var a=new Date(0);return a.setUTCFullYear(s,0,4),a.setUTCHours(0,0,0,0),Be(a)}}]),e})(k);function dt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?dt=function(e){return typeof e}:dt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},dt(n)}function Ed(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Td(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Ad(n,t,e){return t&&Td(n.prototype,t),n}function Dd(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&ln(n,t)}function ln(n,t){return ln=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},ln(n,t)}function kd(n){var t=$d();return function(){var r=er(n),i;if(t){var o=er(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Rd(this,i)}}function Rd(n,t){return t&&(dt(t)==="object"||typeof t=="function")?t:cn(n)}function cn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function $d(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function er(n){return er=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},er(n)}function Qi(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Md=(function(n){Dd(e,n);var t=kd(e);function e(){var r;Ed(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Qi(cn(r),"priority",130),Qi(cn(r),"incompatibleTokens",["G","y","Y","R","w","I","i","e","c","t","T"]),r}return Ad(e,[{key:"parse",value:function(i,o){return Qt(o==="u"?4:o.length,i)}},{key:"set",value:function(i,o,s){return i.setUTCFullYear(s,0,1),i.setUTCHours(0,0,0,0),i}}]),e})(k);function ht(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ht=function(e){return typeof e}:ht=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ht(n)}function zd(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Fd(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Ld(n,t,e){return t&&Fd(n.prototype,t),n}function Nd(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&un(n,t)}function un(n,t){return un=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},un(n,t)}function Hd(n){var t=Vd();return function(){var r=tr(n),i;if(t){var o=tr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Bd(this,i)}}function Bd(n,t){return t&&(ht(t)==="object"||typeof t=="function")?t:dn(n)}function dn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Vd(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function tr(n){return tr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},tr(n)}function Xi(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Wd=(function(n){Nd(e,n);var t=Hd(e);function e(){var r;zd(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Xi(dn(r),"priority",120),Xi(dn(r),"incompatibleTokens",["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"]),r}return Ld(e,[{key:"parse",value:function(i,o,s){switch(o){case"Q":case"QQ":return F(o.length,i);case"Qo":return s.ordinalNumber(i,{unit:"quarter"});case"QQQ":return s.quarter(i,{width:"abbreviated",context:"formatting"})||s.quarter(i,{width:"narrow",context:"formatting"});case"QQQQQ":return s.quarter(i,{width:"narrow",context:"formatting"});case"QQQQ":default:return s.quarter(i,{width:"wide",context:"formatting"})||s.quarter(i,{width:"abbreviated",context:"formatting"})||s.quarter(i,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(i,o){return o>=1&&o<=4}},{key:"set",value:function(i,o,s){return i.setUTCMonth((s-1)*3,1),i.setUTCHours(0,0,0,0),i}}]),e})(k);function ft(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?ft=function(e){return typeof e}:ft=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ft(n)}function Yd(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Ud(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function qd(n,t,e){return t&&Ud(n.prototype,t),n}function jd(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&hn(n,t)}function hn(n,t){return hn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},hn(n,t)}function Gd(n){var t=Qd();return function(){var r=rr(n),i;if(t){var o=rr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Kd(this,i)}}function Kd(n,t){return t&&(ft(t)==="object"||typeof t=="function")?t:fn(n)}function fn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Qd(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function rr(n){return rr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},rr(n)}function Zi(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Xd=(function(n){jd(e,n);var t=Gd(e);function e(){var r;Yd(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Zi(fn(r),"priority",120),Zi(fn(r),"incompatibleTokens",["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"]),r}return qd(e,[{key:"parse",value:function(i,o,s){switch(o){case"q":case"qq":return F(o.length,i);case"qo":return s.ordinalNumber(i,{unit:"quarter"});case"qqq":return s.quarter(i,{width:"abbreviated",context:"standalone"})||s.quarter(i,{width:"narrow",context:"standalone"});case"qqqqq":return s.quarter(i,{width:"narrow",context:"standalone"});case"qqqq":default:return s.quarter(i,{width:"wide",context:"standalone"})||s.quarter(i,{width:"abbreviated",context:"standalone"})||s.quarter(i,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(i,o){return o>=1&&o<=4}},{key:"set",value:function(i,o,s){return i.setUTCMonth((s-1)*3,1),i.setUTCHours(0,0,0,0),i}}]),e})(k);function _t(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?_t=function(e){return typeof e}:_t=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_t(n)}function Zd(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Jd(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function eh(n,t,e){return t&&Jd(n.prototype,t),n}function th(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&_n(n,t)}function _n(n,t){return _n=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},_n(n,t)}function rh(n){var t=ih();return function(){var r=nr(n),i;if(t){var o=nr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return nh(this,i)}}function nh(n,t){return t&&(_t(t)==="object"||typeof t=="function")?t:pn(n)}function pn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ih(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function nr(n){return nr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},nr(n)}function Ji(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var oh=(function(n){th(e,n);var t=rh(e);function e(){var r;Zd(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Ji(pn(r),"incompatibleTokens",["Y","R","q","Q","L","w","I","D","i","e","c","t","T"]),Ji(pn(r),"priority",110),r}return eh(e,[{key:"parse",value:function(i,o,s){var a=function(u){return u-1};switch(o){case"M":return V(z(B.month,i),a);case"MM":return V(F(2,i),a);case"Mo":return V(s.ordinalNumber(i,{unit:"month"}),a);case"MMM":return s.month(i,{width:"abbreviated",context:"formatting"})||s.month(i,{width:"narrow",context:"formatting"});case"MMMMM":return s.month(i,{width:"narrow",context:"formatting"});case"MMMM":default:return s.month(i,{width:"wide",context:"formatting"})||s.month(i,{width:"abbreviated",context:"formatting"})||s.month(i,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(i,o){return o>=0&&o<=11}},{key:"set",value:function(i,o,s){return i.setUTCMonth(s,1),i.setUTCHours(0,0,0,0),i}}]),e})(k);function pt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?pt=function(e){return typeof e}:pt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},pt(n)}function sh(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function ah(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function lh(n,t,e){return t&&ah(n.prototype,t),n}function ch(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&mn(n,t)}function mn(n,t){return mn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},mn(n,t)}function uh(n){var t=hh();return function(){var r=ir(n),i;if(t){var o=ir(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return dh(this,i)}}function dh(n,t){return t&&(pt(t)==="object"||typeof t=="function")?t:gn(n)}function gn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function hh(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ir(n){return ir=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},ir(n)}function eo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var fh=(function(n){ch(e,n);var t=uh(e);function e(){var r;sh(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),eo(gn(r),"priority",110),eo(gn(r),"incompatibleTokens",["Y","R","q","Q","M","w","I","D","i","e","c","t","T"]),r}return lh(e,[{key:"parse",value:function(i,o,s){var a=function(u){return u-1};switch(o){case"L":return V(z(B.month,i),a);case"LL":return V(F(2,i),a);case"Lo":return V(s.ordinalNumber(i,{unit:"month"}),a);case"LLL":return s.month(i,{width:"abbreviated",context:"standalone"})||s.month(i,{width:"narrow",context:"standalone"});case"LLLLL":return s.month(i,{width:"narrow",context:"standalone"});case"LLLL":default:return s.month(i,{width:"wide",context:"standalone"})||s.month(i,{width:"abbreviated",context:"standalone"})||s.month(i,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(i,o){return o>=0&&o<=11}},{key:"set",value:function(i,o,s){return i.setUTCMonth(s,1),i.setUTCHours(0,0,0,0),i}}]),e})(k);function _h(n,t,e){U(2,arguments);var r=X(n),i=re(t),o=Ds(r,e)-i;return r.setUTCDate(r.getUTCDate()-o*7),r}function mt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?mt=function(e){return typeof e}:mt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},mt(n)}function ph(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function mh(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function gh(n,t,e){return t&&mh(n.prototype,t),n}function yh(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&yn(n,t)}function yn(n,t){return yn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},yn(n,t)}function bh(n){var t=wh();return function(){var r=or(n),i;if(t){var o=or(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return vh(this,i)}}function vh(n,t){return t&&(mt(t)==="object"||typeof t=="function")?t:bn(n)}function bn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function wh(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function or(n){return or=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},or(n)}function to(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Ch=(function(n){yh(e,n);var t=bh(e);function e(){var r;ph(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),to(bn(r),"priority",100),to(bn(r),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","i","t","T"]),r}return gh(e,[{key:"parse",value:function(i,o,s){switch(o){case"w":return z(B.week,i);case"wo":return s.ordinalNumber(i,{unit:"week"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=1&&o<=53}},{key:"set",value:function(i,o,s,a){return Ee(_h(i,s,a),a)}}]),e})(k);function xh(n,t){U(2,arguments);var e=X(n),r=re(t),i=As(e)-r;return e.setUTCDate(e.getUTCDate()-i*7),e}function gt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?gt=function(e){return typeof e}:gt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},gt(n)}function Sh(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Oh(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Ih(n,t,e){return t&&Oh(n.prototype,t),n}function Ph(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&vn(n,t)}function vn(n,t){return vn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},vn(n,t)}function Eh(n){var t=Ah();return function(){var r=sr(n),i;if(t){var o=sr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Th(this,i)}}function Th(n,t){return t&&(gt(t)==="object"||typeof t=="function")?t:wn(n)}function wn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Ah(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function sr(n){return sr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},sr(n)}function ro(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Dh=(function(n){Ph(e,n);var t=Eh(e);function e(){var r;Sh(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),ro(wn(r),"priority",100),ro(wn(r),"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"]),r}return Ih(e,[{key:"parse",value:function(i,o,s){switch(o){case"I":return z(B.week,i);case"Io":return s.ordinalNumber(i,{unit:"week"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=1&&o<=53}},{key:"set",value:function(i,o,s){return Be(xh(i,s))}}]),e})(k);function yt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?yt=function(e){return typeof e}:yt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},yt(n)}function kh(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Rh(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function $h(n,t,e){return t&&Rh(n.prototype,t),n}function Mh(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Cn(n,t)}function Cn(n,t){return Cn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Cn(n,t)}function zh(n){var t=Lh();return function(){var r=ar(n),i;if(t){var o=ar(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Fh(this,i)}}function Fh(n,t){return t&&(yt(t)==="object"||typeof t=="function")?t:bt(n)}function bt(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Lh(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ar(n){return ar=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},ar(n)}function Nr(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Nh=[31,28,31,30,31,30,31,31,30,31,30,31],Hh=[31,29,31,30,31,30,31,31,30,31,30,31],Bh=(function(n){Mh(e,n);var t=zh(e);function e(){var r;kh(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Nr(bt(r),"priority",90),Nr(bt(r),"subPriority",1),Nr(bt(r),"incompatibleTokens",["Y","R","q","Q","w","I","D","i","e","c","t","T"]),r}return $h(e,[{key:"parse",value:function(i,o,s){switch(o){case"d":return z(B.date,i);case"do":return s.ordinalNumber(i,{unit:"date"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){var s=i.getUTCFullYear(),a=Vs(s),l=i.getUTCMonth();return a?o>=1&&o<=Hh[l]:o>=1&&o<=Nh[l]}},{key:"set",value:function(i,o,s){return i.setUTCDate(s),i.setUTCHours(0,0,0,0),i}}]),e})(k);function vt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?vt=function(e){return typeof e}:vt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},vt(n)}function Vh(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Wh(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Yh(n,t,e){return t&&Wh(n.prototype,t),n}function Uh(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&xn(n,t)}function xn(n,t){return xn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},xn(n,t)}function qh(n){var t=Gh();return function(){var r=lr(n),i;if(t){var o=lr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return jh(this,i)}}function jh(n,t){return t&&(vt(t)==="object"||typeof t=="function")?t:wt(n)}function wt(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Gh(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function lr(n){return lr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},lr(n)}function Hr(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Kh=(function(n){Uh(e,n);var t=qh(e);function e(){var r;Vh(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),Hr(wt(r),"priority",90),Hr(wt(r),"subpriority",1),Hr(wt(r),"incompatibleTokens",["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"]),r}return Yh(e,[{key:"parse",value:function(i,o,s){switch(o){case"D":case"DD":return z(B.dayOfYear,i);case"Do":return s.ordinalNumber(i,{unit:"date"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){var s=i.getUTCFullYear(),a=Vs(s);return a?o>=1&&o<=366:o>=1&&o<=365}},{key:"set",value:function(i,o,s){return i.setUTCMonth(0,s),i.setUTCHours(0,0,0,0),i}}]),e})(k);function Pi(n,t,e){var r,i,o,s,a,l,u,f;U(2,arguments);var p=Ve(),m=re((r=(i=(o=(s=e?.weekStartsOn)!==null&&s!==void 0?s:e==null||(a=e.locale)===null||a===void 0||(l=a.options)===null||l===void 0?void 0:l.weekStartsOn)!==null&&o!==void 0?o:p.weekStartsOn)!==null&&i!==void 0?i:(u=p.locale)===null||u===void 0||(f=u.options)===null||f===void 0?void 0:f.weekStartsOn)!==null&&r!==void 0?r:0);if(!(m>=0&&m<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var g=X(n),b=re(t),w=g.getUTCDay(),C=b%7,I=(C+7)%7,M=(I<m?7:0)+b-w;return g.setUTCDate(g.getUTCDate()+M),g}function Ct(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ct=function(e){return typeof e}:Ct=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ct(n)}function Qh(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Xh(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Zh(n,t,e){return t&&Xh(n.prototype,t),n}function Jh(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Sn(n,t)}function Sn(n,t){return Sn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Sn(n,t)}function ef(n){var t=rf();return function(){var r=cr(n),i;if(t){var o=cr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return tf(this,i)}}function tf(n,t){return t&&(Ct(t)==="object"||typeof t=="function")?t:On(n)}function On(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function rf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function cr(n){return cr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},cr(n)}function no(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var nf=(function(n){Jh(e,n);var t=ef(e);function e(){var r;Qh(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),no(On(r),"priority",90),no(On(r),"incompatibleTokens",["D","i","e","c","t","T"]),r}return Zh(e,[{key:"parse",value:function(i,o,s){switch(o){case"E":case"EE":case"EEE":return s.day(i,{width:"abbreviated",context:"formatting"})||s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"});case"EEEEE":return s.day(i,{width:"narrow",context:"formatting"});case"EEEEEE":return s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"});case"EEEE":default:return s.day(i,{width:"wide",context:"formatting"})||s.day(i,{width:"abbreviated",context:"formatting"})||s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(i,o){return o>=0&&o<=6}},{key:"set",value:function(i,o,s,a){return i=Pi(i,s,a),i.setUTCHours(0,0,0,0),i}}]),e})(k);function xt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?xt=function(e){return typeof e}:xt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},xt(n)}function of(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function sf(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function af(n,t,e){return t&&sf(n.prototype,t),n}function lf(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&In(n,t)}function In(n,t){return In=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},In(n,t)}function cf(n){var t=df();return function(){var r=ur(n),i;if(t){var o=ur(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return uf(this,i)}}function uf(n,t){return t&&(xt(t)==="object"||typeof t=="function")?t:Pn(n)}function Pn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function df(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function ur(n){return ur=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},ur(n)}function io(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var hf=(function(n){lf(e,n);var t=cf(e);function e(){var r;of(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),io(Pn(r),"priority",90),io(Pn(r),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"]),r}return af(e,[{key:"parse",value:function(i,o,s,a){var l=function(f){var p=Math.floor((f-1)/7)*7;return(f+a.weekStartsOn+6)%7+p};switch(o){case"e":case"ee":return V(F(o.length,i),l);case"eo":return V(s.ordinalNumber(i,{unit:"day"}),l);case"eee":return s.day(i,{width:"abbreviated",context:"formatting"})||s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"});case"eeeee":return s.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"});case"eeee":default:return s.day(i,{width:"wide",context:"formatting"})||s.day(i,{width:"abbreviated",context:"formatting"})||s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(i,o){return o>=0&&o<=6}},{key:"set",value:function(i,o,s,a){return i=Pi(i,s,a),i.setUTCHours(0,0,0,0),i}}]),e})(k);function St(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?St=function(e){return typeof e}:St=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},St(n)}function ff(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _f(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function pf(n,t,e){return t&&_f(n.prototype,t),n}function mf(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&En(n,t)}function En(n,t){return En=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},En(n,t)}function gf(n){var t=bf();return function(){var r=dr(n),i;if(t){var o=dr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return yf(this,i)}}function yf(n,t){return t&&(St(t)==="object"||typeof t=="function")?t:Tn(n)}function Tn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function bf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function dr(n){return dr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},dr(n)}function oo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var vf=(function(n){mf(e,n);var t=gf(e);function e(){var r;ff(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),oo(Tn(r),"priority",90),oo(Tn(r),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"]),r}return pf(e,[{key:"parse",value:function(i,o,s,a){var l=function(f){var p=Math.floor((f-1)/7)*7;return(f+a.weekStartsOn+6)%7+p};switch(o){case"c":case"cc":return V(F(o.length,i),l);case"co":return V(s.ordinalNumber(i,{unit:"day"}),l);case"ccc":return s.day(i,{width:"abbreviated",context:"standalone"})||s.day(i,{width:"short",context:"standalone"})||s.day(i,{width:"narrow",context:"standalone"});case"ccccc":return s.day(i,{width:"narrow",context:"standalone"});case"cccccc":return s.day(i,{width:"short",context:"standalone"})||s.day(i,{width:"narrow",context:"standalone"});case"cccc":default:return s.day(i,{width:"wide",context:"standalone"})||s.day(i,{width:"abbreviated",context:"standalone"})||s.day(i,{width:"short",context:"standalone"})||s.day(i,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(i,o){return o>=0&&o<=6}},{key:"set",value:function(i,o,s,a){return i=Pi(i,s,a),i.setUTCHours(0,0,0,0),i}}]),e})(k);function wf(n,t){U(2,arguments);var e=re(t);e%7===0&&(e=e-7);var r=1,i=X(n),o=i.getUTCDay(),s=e%7,a=(s+7)%7,l=(a<r?7:0)+e-o;return i.setUTCDate(i.getUTCDate()+l),i}function Ot(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ot=function(e){return typeof e}:Ot=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ot(n)}function Cf(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function xf(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Sf(n,t,e){return t&&xf(n.prototype,t),n}function Of(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&An(n,t)}function An(n,t){return An=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},An(n,t)}function If(n){var t=Ef();return function(){var r=hr(n),i;if(t){var o=hr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Pf(this,i)}}function Pf(n,t){return t&&(Ot(t)==="object"||typeof t=="function")?t:Dn(n)}function Dn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Ef(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function hr(n){return hr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},hr(n)}function so(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Tf=(function(n){Of(e,n);var t=If(e);function e(){var r;Cf(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),so(Dn(r),"priority",90),so(Dn(r),"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"]),r}return Sf(e,[{key:"parse",value:function(i,o,s){var a=function(u){return u===0?7:u};switch(o){case"i":case"ii":return F(o.length,i);case"io":return s.ordinalNumber(i,{unit:"day"});case"iii":return V(s.day(i,{width:"abbreviated",context:"formatting"})||s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"}),a);case"iiiii":return V(s.day(i,{width:"narrow",context:"formatting"}),a);case"iiiiii":return V(s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"}),a);case"iiii":default:return V(s.day(i,{width:"wide",context:"formatting"})||s.day(i,{width:"abbreviated",context:"formatting"})||s.day(i,{width:"short",context:"formatting"})||s.day(i,{width:"narrow",context:"formatting"}),a)}}},{key:"validate",value:function(i,o){return o>=1&&o<=7}},{key:"set",value:function(i,o,s){return i=wf(i,s),i.setUTCHours(0,0,0,0),i}}]),e})(k);function It(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?It=function(e){return typeof e}:It=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},It(n)}function Af(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Df(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function kf(n,t,e){return t&&Df(n.prototype,t),n}function Rf(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&kn(n,t)}function kn(n,t){return kn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},kn(n,t)}function $f(n){var t=zf();return function(){var r=fr(n),i;if(t){var o=fr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Mf(this,i)}}function Mf(n,t){return t&&(It(t)==="object"||typeof t=="function")?t:Rn(n)}function Rn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function zf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function fr(n){return fr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},fr(n)}function ao(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Ff=(function(n){Rf(e,n);var t=$f(e);function e(){var r;Af(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),ao(Rn(r),"priority",80),ao(Rn(r),"incompatibleTokens",["b","B","H","k","t","T"]),r}return kf(e,[{key:"parse",value:function(i,o,s){switch(o){case"a":case"aa":case"aaa":return s.dayPeriod(i,{width:"abbreviated",context:"formatting"})||s.dayPeriod(i,{width:"narrow",context:"formatting"});case"aaaaa":return s.dayPeriod(i,{width:"narrow",context:"formatting"});case"aaaa":default:return s.dayPeriod(i,{width:"wide",context:"formatting"})||s.dayPeriod(i,{width:"abbreviated",context:"formatting"})||s.dayPeriod(i,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(i,o,s){return i.setUTCHours(Ii(s),0,0,0),i}}]),e})(k);function Pt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Pt=function(e){return typeof e}:Pt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Pt(n)}function Lf(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Nf(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Hf(n,t,e){return t&&Nf(n.prototype,t),n}function Bf(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&$n(n,t)}function $n(n,t){return $n=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},$n(n,t)}function Vf(n){var t=Yf();return function(){var r=_r(n),i;if(t){var o=_r(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Wf(this,i)}}function Wf(n,t){return t&&(Pt(t)==="object"||typeof t=="function")?t:Mn(n)}function Mn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Yf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function _r(n){return _r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},_r(n)}function lo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Uf=(function(n){Bf(e,n);var t=Vf(e);function e(){var r;Lf(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),lo(Mn(r),"priority",80),lo(Mn(r),"incompatibleTokens",["a","B","H","k","t","T"]),r}return Hf(e,[{key:"parse",value:function(i,o,s){switch(o){case"b":case"bb":case"bbb":return s.dayPeriod(i,{width:"abbreviated",context:"formatting"})||s.dayPeriod(i,{width:"narrow",context:"formatting"});case"bbbbb":return s.dayPeriod(i,{width:"narrow",context:"formatting"});case"bbbb":default:return s.dayPeriod(i,{width:"wide",context:"formatting"})||s.dayPeriod(i,{width:"abbreviated",context:"formatting"})||s.dayPeriod(i,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(i,o,s){return i.setUTCHours(Ii(s),0,0,0),i}}]),e})(k);function Et(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Et=function(e){return typeof e}:Et=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Et(n)}function qf(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function jf(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Gf(n,t,e){return t&&jf(n.prototype,t),n}function Kf(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&zn(n,t)}function zn(n,t){return zn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},zn(n,t)}function Qf(n){var t=Zf();return function(){var r=pr(n),i;if(t){var o=pr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Xf(this,i)}}function Xf(n,t){return t&&(Et(t)==="object"||typeof t=="function")?t:Fn(n)}function Fn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Zf(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function pr(n){return pr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},pr(n)}function co(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Jf=(function(n){Kf(e,n);var t=Qf(e);function e(){var r;qf(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),co(Fn(r),"priority",80),co(Fn(r),"incompatibleTokens",["a","b","t","T"]),r}return Gf(e,[{key:"parse",value:function(i,o,s){switch(o){case"B":case"BB":case"BBB":return s.dayPeriod(i,{width:"abbreviated",context:"formatting"})||s.dayPeriod(i,{width:"narrow",context:"formatting"});case"BBBBB":return s.dayPeriod(i,{width:"narrow",context:"formatting"});case"BBBB":default:return s.dayPeriod(i,{width:"wide",context:"formatting"})||s.dayPeriod(i,{width:"abbreviated",context:"formatting"})||s.dayPeriod(i,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(i,o,s){return i.setUTCHours(Ii(s),0,0,0),i}}]),e})(k);function Tt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Tt=function(e){return typeof e}:Tt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Tt(n)}function e_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function r_(n,t,e){return t&&t_(n.prototype,t),n}function n_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Ln(n,t)}function Ln(n,t){return Ln=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Ln(n,t)}function i_(n){var t=s_();return function(){var r=mr(n),i;if(t){var o=mr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return o_(this,i)}}function o_(n,t){return t&&(Tt(t)==="object"||typeof t=="function")?t:Nn(n)}function Nn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function s_(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function mr(n){return mr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},mr(n)}function uo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var a_=(function(n){n_(e,n);var t=i_(e);function e(){var r;e_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),uo(Nn(r),"priority",70),uo(Nn(r),"incompatibleTokens",["H","K","k","t","T"]),r}return r_(e,[{key:"parse",value:function(i,o,s){switch(o){case"h":return z(B.hour12h,i);case"ho":return s.ordinalNumber(i,{unit:"hour"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=1&&o<=12}},{key:"set",value:function(i,o,s){var a=i.getUTCHours()>=12;return a&&s<12?i.setUTCHours(s+12,0,0,0):!a&&s===12?i.setUTCHours(0,0,0,0):i.setUTCHours(s,0,0,0),i}}]),e})(k);function At(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?At=function(e){return typeof e}:At=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},At(n)}function l_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function c_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function u_(n,t,e){return t&&c_(n.prototype,t),n}function d_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Hn(n,t)}function Hn(n,t){return Hn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Hn(n,t)}function h_(n){var t=__();return function(){var r=gr(n),i;if(t){var o=gr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return f_(this,i)}}function f_(n,t){return t&&(At(t)==="object"||typeof t=="function")?t:Bn(n)}function Bn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function __(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function gr(n){return gr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},gr(n)}function ho(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var p_=(function(n){d_(e,n);var t=h_(e);function e(){var r;l_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),ho(Bn(r),"priority",70),ho(Bn(r),"incompatibleTokens",["a","b","h","K","k","t","T"]),r}return u_(e,[{key:"parse",value:function(i,o,s){switch(o){case"H":return z(B.hour23h,i);case"Ho":return s.ordinalNumber(i,{unit:"hour"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=0&&o<=23}},{key:"set",value:function(i,o,s){return i.setUTCHours(s,0,0,0),i}}]),e})(k);function Dt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Dt=function(e){return typeof e}:Dt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Dt(n)}function m_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function g_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function y_(n,t,e){return t&&g_(n.prototype,t),n}function b_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Vn(n,t)}function Vn(n,t){return Vn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Vn(n,t)}function v_(n){var t=C_();return function(){var r=yr(n),i;if(t){var o=yr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return w_(this,i)}}function w_(n,t){return t&&(Dt(t)==="object"||typeof t=="function")?t:Wn(n)}function Wn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function C_(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function yr(n){return yr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},yr(n)}function fo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var x_=(function(n){b_(e,n);var t=v_(e);function e(){var r;m_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),fo(Wn(r),"priority",70),fo(Wn(r),"incompatibleTokens",["h","H","k","t","T"]),r}return y_(e,[{key:"parse",value:function(i,o,s){switch(o){case"K":return z(B.hour11h,i);case"Ko":return s.ordinalNumber(i,{unit:"hour"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=0&&o<=11}},{key:"set",value:function(i,o,s){var a=i.getUTCHours()>=12;return a&&s<12?i.setUTCHours(s+12,0,0,0):i.setUTCHours(s,0,0,0),i}}]),e})(k);function kt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?kt=function(e){return typeof e}:kt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},kt(n)}function S_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function O_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function I_(n,t,e){return t&&O_(n.prototype,t),n}function P_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Yn(n,t)}function Yn(n,t){return Yn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Yn(n,t)}function E_(n){var t=A_();return function(){var r=br(n),i;if(t){var o=br(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return T_(this,i)}}function T_(n,t){return t&&(kt(t)==="object"||typeof t=="function")?t:Un(n)}function Un(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function A_(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function br(n){return br=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},br(n)}function _o(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var D_=(function(n){P_(e,n);var t=E_(e);function e(){var r;S_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),_o(Un(r),"priority",70),_o(Un(r),"incompatibleTokens",["a","b","h","H","K","t","T"]),r}return I_(e,[{key:"parse",value:function(i,o,s){switch(o){case"k":return z(B.hour24h,i);case"ko":return s.ordinalNumber(i,{unit:"hour"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=1&&o<=24}},{key:"set",value:function(i,o,s){var a=s<=24?s%24:s;return i.setUTCHours(a,0,0,0),i}}]),e})(k);function Rt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Rt=function(e){return typeof e}:Rt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Rt(n)}function k_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function R_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function $_(n,t,e){return t&&R_(n.prototype,t),n}function M_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&qn(n,t)}function qn(n,t){return qn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},qn(n,t)}function z_(n){var t=L_();return function(){var r=vr(n),i;if(t){var o=vr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return F_(this,i)}}function F_(n,t){return t&&(Rt(t)==="object"||typeof t=="function")?t:jn(n)}function jn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function L_(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function vr(n){return vr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},vr(n)}function po(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var N_=(function(n){M_(e,n);var t=z_(e);function e(){var r;k_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),po(jn(r),"priority",60),po(jn(r),"incompatibleTokens",["t","T"]),r}return $_(e,[{key:"parse",value:function(i,o,s){switch(o){case"m":return z(B.minute,i);case"mo":return s.ordinalNumber(i,{unit:"minute"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=0&&o<=59}},{key:"set",value:function(i,o,s){return i.setUTCMinutes(s,0,0),i}}]),e})(k);function $t(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?$t=function(e){return typeof e}:$t=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},$t(n)}function H_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function B_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function V_(n,t,e){return t&&B_(n.prototype,t),n}function W_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Gn(n,t)}function Gn(n,t){return Gn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Gn(n,t)}function Y_(n){var t=q_();return function(){var r=wr(n),i;if(t){var o=wr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return U_(this,i)}}function U_(n,t){return t&&($t(t)==="object"||typeof t=="function")?t:Kn(n)}function Kn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function q_(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function wr(n){return wr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},wr(n)}function mo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var j_=(function(n){W_(e,n);var t=Y_(e);function e(){var r;H_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),mo(Kn(r),"priority",50),mo(Kn(r),"incompatibleTokens",["t","T"]),r}return V_(e,[{key:"parse",value:function(i,o,s){switch(o){case"s":return z(B.second,i);case"so":return s.ordinalNumber(i,{unit:"second"});default:return F(o.length,i)}}},{key:"validate",value:function(i,o){return o>=0&&o<=59}},{key:"set",value:function(i,o,s){return i.setUTCSeconds(s,0),i}}]),e})(k);function Mt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Mt=function(e){return typeof e}:Mt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Mt(n)}function G_(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function K_(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Q_(n,t,e){return t&&K_(n.prototype,t),n}function X_(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Qn(n,t)}function Qn(n,t){return Qn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Qn(n,t)}function Z_(n){var t=ep();return function(){var r=Cr(n),i;if(t){var o=Cr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return J_(this,i)}}function J_(n,t){return t&&(Mt(t)==="object"||typeof t=="function")?t:Xn(n)}function Xn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function ep(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Cr(n){return Cr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Cr(n)}function go(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var tp=(function(n){X_(e,n);var t=Z_(e);function e(){var r;G_(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),go(Xn(r),"priority",30),go(Xn(r),"incompatibleTokens",["t","T"]),r}return Q_(e,[{key:"parse",value:function(i,o){var s=function(l){return Math.floor(l*Math.pow(10,-o.length+3))};return V(F(o.length,i),s)}},{key:"set",value:function(i,o,s){return i.setUTCMilliseconds(s),i}}]),e})(k);function zt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?zt=function(e){return typeof e}:zt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},zt(n)}function rp(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function np(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function ip(n,t,e){return t&&np(n.prototype,t),n}function op(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&Zn(n,t)}function Zn(n,t){return Zn=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},Zn(n,t)}function sp(n){var t=lp();return function(){var r=xr(n),i;if(t){var o=xr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return ap(this,i)}}function ap(n,t){return t&&(zt(t)==="object"||typeof t=="function")?t:Jn(n)}function Jn(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function lp(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function xr(n){return xr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},xr(n)}function yo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var cp=(function(n){op(e,n);var t=sp(e);function e(){var r;rp(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),yo(Jn(r),"priority",10),yo(Jn(r),"incompatibleTokens",["t","T","x"]),r}return ip(e,[{key:"parse",value:function(i,o){switch(o){case"X":return de(ue.basicOptionalMinutes,i);case"XX":return de(ue.basic,i);case"XXXX":return de(ue.basicOptionalSeconds,i);case"XXXXX":return de(ue.extendedOptionalSeconds,i);case"XXX":default:return de(ue.extended,i)}}},{key:"set",value:function(i,o,s){return o.timestampIsSet?i:new Date(i.getTime()-s)}}]),e})(k);function Ft(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ft=function(e){return typeof e}:Ft=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ft(n)}function up(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function dp(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function hp(n,t,e){return t&&dp(n.prototype,t),n}function fp(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&ei(n,t)}function ei(n,t){return ei=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},ei(n,t)}function _p(n){var t=mp();return function(){var r=Sr(n),i;if(t){var o=Sr(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return pp(this,i)}}function pp(n,t){return t&&(Ft(t)==="object"||typeof t=="function")?t:ti(n)}function ti(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function mp(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Sr(n){return Sr=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Sr(n)}function bo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var gp=(function(n){fp(e,n);var t=_p(e);function e(){var r;up(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),bo(ti(r),"priority",10),bo(ti(r),"incompatibleTokens",["t","T","X"]),r}return hp(e,[{key:"parse",value:function(i,o){switch(o){case"x":return de(ue.basicOptionalMinutes,i);case"xx":return de(ue.basic,i);case"xxxx":return de(ue.basicOptionalSeconds,i);case"xxxxx":return de(ue.extendedOptionalSeconds,i);case"xxx":default:return de(ue.extended,i)}}},{key:"set",value:function(i,o,s){return o.timestampIsSet?i:new Date(i.getTime()-s)}}]),e})(k);function Lt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Lt=function(e){return typeof e}:Lt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Lt(n)}function yp(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function bp(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function vp(n,t,e){return t&&bp(n.prototype,t),n}function wp(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&ri(n,t)}function ri(n,t){return ri=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},ri(n,t)}function Cp(n){var t=Sp();return function(){var r=Or(n),i;if(t){var o=Or(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return xp(this,i)}}function xp(n,t){return t&&(Lt(t)==="object"||typeof t=="function")?t:ni(n)}function ni(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function Sp(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Or(n){return Or=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Or(n)}function vo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Op=(function(n){wp(e,n);var t=Cp(e);function e(){var r;yp(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),vo(ni(r),"priority",40),vo(ni(r),"incompatibleTokens","*"),r}return vp(e,[{key:"parse",value:function(i){return Hs(i)}},{key:"set",value:function(i,o,s){return[new Date(s*1e3),{timestampIsSet:!0}]}}]),e})(k);function Nt(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Nt=function(e){return typeof e}:Nt=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Nt(n)}function Ip(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function Pp(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}function Ep(n,t,e){return t&&Pp(n.prototype,t),n}function Tp(n,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");n.prototype=Object.create(t&&t.prototype,{constructor:{value:n,writable:!0,configurable:!0}}),t&&ii(n,t)}function ii(n,t){return ii=Object.setPrototypeOf||function(r,i){return r.__proto__=i,r},ii(n,t)}function Ap(n){var t=kp();return function(){var r=Ir(n),i;if(t){var o=Ir(this).constructor;i=Reflect.construct(r,arguments,o)}else i=r.apply(this,arguments);return Dp(this,i)}}function Dp(n,t){return t&&(Nt(t)==="object"||typeof t=="function")?t:oi(n)}function oi(n){if(n===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return n}function kp(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function Ir(n){return Ir=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},Ir(n)}function wo(n,t,e){return t in n?Object.defineProperty(n,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):n[t]=e,n}var Rp=(function(n){Tp(e,n);var t=Ap(e);function e(){var r;Ip(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return r=t.call.apply(t,[this].concat(o)),wo(oi(r),"priority",20),wo(oi(r),"incompatibleTokens","*"),r}return Ep(e,[{key:"parse",value:function(i){return Hs(i)}},{key:"set",value:function(i,o,s){return[new Date(s),{timestampIsSet:!0}]}}]),e})(k),$p={G:new ed,y:new dd,Y:new bd,R:new Pd,u:new Md,Q:new Wd,q:new Xd,M:new oh,L:new fh,w:new Ch,I:new Dh,d:new Bh,D:new Kh,E:new nf,e:new hf,c:new vf,i:new Tf,a:new Ff,b:new Uf,B:new Jf,h:new a_,H:new p_,K:new x_,k:new D_,m:new N_,s:new j_,S:new tp,X:new cp,x:new gp,t:new Op,T:new Rp};function Ht(n){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?Ht=function(e){return typeof e}:Ht=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},Ht(n)}function Co(n,t){var e;if(typeof Symbol>"u"||n[Symbol.iterator]==null){if(Array.isArray(n)||(e=Mp(n))||t){e&&(n=e);var r=0,i=function(){};return{s:i,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(u){throw u},f:i}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var o=!0,s=!1,a;return{s:function(){e=n[Symbol.iterator]()},n:function(){var u=e.next();return o=u.done,u},e:function(u){s=!0,a=u},f:function(){try{!o&&e.return!=null&&e.return()}finally{if(s)throw a}}}}function Mp(n,t){if(n){if(typeof n=="string")return xo(n,t);var e=Object.prototype.toString.call(n).slice(8,-1);if(e==="Object"&&n.constructor&&(e=n.constructor.name),e==="Map"||e==="Set")return Array.from(n);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return xo(n,t)}}function xo(n,t){(t==null||t>n.length)&&(t=n.length);for(var e=0,r=new Array(t);e<t;e++)r[e]=n[e];return r}var zp=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,Fp=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Lp=/^'([^]*?)'?$/,Np=/''/g,Hp=/\S/,Bp=/[a-zA-Z]/;function Vp(n,t,e,r){var i,o,s,a,l,u,f,p,m,g,b,w,C,I;U(3,arguments);var M=String(n),K=String(t),j=Ve(),$=(i=(o=void 0)!==null&&o!==void 0?o:j.locale)!==null&&i!==void 0?i:zs;if(!$.match)throw new RangeError("locale must contain match property");var Y=re((s=(a=(l=(u=void 0)!==null&&u!==void 0?u:void 0)!==null&&l!==void 0?l:j.firstWeekContainsDate)!==null&&a!==void 0?a:(f=j.locale)===null||f===void 0||(p=f.options)===null||p===void 0?void 0:p.firstWeekContainsDate)!==null&&s!==void 0?s:1);if(!(Y>=1&&Y<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var ae=re((m=(g=(b=(w=void 0)!==null&&w!==void 0?w:void 0)!==null&&b!==void 0?b:j.weekStartsOn)!==null&&g!==void 0?g:(C=j.locale)===null||C===void 0||(I=C.options)===null||I===void 0?void 0:I.weekStartsOn)!==null&&m!==void 0?m:0);if(!(ae>=0&&ae<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(K==="")return M===""?X(e):new Date(NaN);var he={firstWeekContainsDate:Y,weekStartsOn:ae,locale:$},le=[new Wu],De=K.match(Fp).map(function(E){var x=E[0];if(x in Kr){var ee=Kr[x];return ee(E,$.formatLong)}return E}).join("").match(zp),q=[],Q=Co(De),ce;try{var c=function(){var x=ce.value;!(r!=null&&r.useAdditionalWeekYearTokens)&&Ms(x)&&jt(x,K,n),!(r!=null&&r.useAdditionalDayOfYearTokens)&&$s(x)&&jt(x,K,n);var ee=x[0],ke=$p[ee];if(ke){var _e=ke.incompatibleTokens;if(Array.isArray(_e)){var Ei=q.find(function(Ti){return _e.includes(Ti.token)||Ti.token===ee});if(Ei)throw new RangeError("The format string mustn't contain `".concat(Ei.fullToken,"` and `").concat(x,"` at the same time"))}else if(ke.incompatibleTokens==="*"&&q.length>0)throw new RangeError("The format string mustn't contain `".concat(x,"` and any other token at the same time"));q.push({token:ee,fullToken:x});var $r=ke.run(M,x,$.match,he);if(!$r)return{v:new Date(NaN)};le.push($r.setter),M=$r.rest}else{if(ee.match(Bp))throw new RangeError("Format string contains an unescaped latin alphabet character `"+ee+"`");if(x==="''"?x="'":ee==="'"&&(x=Wp(x)),M.indexOf(x)===0)M=M.slice(x.length);else return{v:new Date(NaN)}}};for(Q.s();!(ce=Q.n()).done;){var d=c();if(Ht(d)==="object")return d.v}}catch(E){Q.e(E)}finally{Q.f()}if(M.length>0&&Hp.test(M))return new Date(NaN);var h=le.map(function(E){return E.priority}).sort(function(E,x){return x-E}).filter(function(E,x,ee){return ee.indexOf(E)===x}).map(function(E){return le.filter(function(x){return x.priority===E}).sort(function(x,ee){return ee.subPriority-x.subPriority})}).map(function(E){return E[0]}),_=X(e);if(isNaN(_.getTime()))return new Date(NaN);var y=Es(_,Rs(_)),v={},S=Co(h),N;try{for(S.s();!(N=S.n()).done;){var P=N.value;if(!P.validate(y,he))return new Date(NaN);var A=P.set(y,v,he);Array.isArray(A)?(y=A[0],Fu(v,A[1])):y=A}}catch(E){S.e(E)}finally{S.f()}return y}function Wp(n){return n.match(Lp)[1].replace(Np,"'")}window.Vaadin.Flow.datepickerConnector={};window.Vaadin.Flow.datepickerConnector.initLazy=n=>{if(n.$connector)return;n.$connector={};const t=function(i){try{new Date().toLocaleDateString(i)}catch{return console.warn("The locale is not supported, using default format setting (ISO 8601)."),"yyyy-MM-dd"}let s=new Date(Date.UTC(1234,4,6)).toLocaleDateString(i,{timeZone:"UTC"});return s=s.replace(/([a-zA-Z]+)/g,"'$1'").replace("06","dd").replace("6","d").replace("05","MM").replace("5","M").replace("1234","yyyy"),s.includes("d")&&s.includes("M")&&s.includes("y")?s:(console.warn("The locale is not supported, using default format setting (ISO 8601)."),"yyyy-MM-dd")};function e(i){if(!i||i.length===0)throw new Error("Array of custom date formats is null or empty");function o(g){if(g.includes("yyyy")&&!g.includes("yyyyy"))return g.replace("yyyy","yy");if(g.includes("YYYY")&&!g.includes("YYYYY"))return g.replace("YYYY","YY")}function s(g){return g.includes("y")||g.includes("Y")}function a(g){return!g.includes("yyyy")&&!g.includes("YYYY")}function l(g){return g.reduce((b,w)=>(s(w)&&!a(w)&&b.push(o(w)),b.push(w),b),[])}function u(g){if(n.$connector._lastParseStatus==="error")return;if(n.$connector._lastParseStatus==="successful"){n.$connector._lastParsedDate.day===g.getDate()&&n.$connector._lastParsedDate.month===g.getMonth()&&n.$connector._lastParsedDate.year%100===g.getFullYear()%100&&g.setFullYear(n.$connector._lastParsedDate.year);return}const b=Ie(n.value);Gr(b)&&b.getDate()===g.getDate()&&b.getMonth()===g.getMonth()&&b.getFullYear()%100===g.getFullYear()%100&&g.setFullYear(b.getFullYear())}function f(g){const b=i[0],w=Ie(`${g.year}-${g.month+1}-${g.day}`);return Mu(w,b)}function p(g,b,w){const C=s(b)?w:new Date,I=Vp(g,b,C);if(Gr(I))return s(b)&&a(b)&&u(I),{day:I.getDate(),month:I.getMonth(),year:I.getFullYear()}}function m(g){const b=r();for(let w of l(i)){const C=p(g,w,b);if(C)return n.$connector._lastParseStatus="successful",n.$connector._lastParsedDate=C,C}return n.$connector._lastParseStatus="error",!1}return{formatDate:f,parseDate:m}}function r(){const{referenceDate:i}=n.i18n;return i?new Date(i.year,i.month,i.day):new Date}n.$connector.updateI18n=(i,o)=>{const s=o&&o.dateFormats&&o.dateFormats.length>0;o&&o.referenceDate&&(o.referenceDate=Rr(new Date(o.referenceDate)));const a=s?o.dateFormats:[t(i)],l=e(a);n.i18n=Object.assign({},n.i18n,o,l)},n.addEventListener("opened-changed",()=>n.$connector._lastParseStatus=void 0)};const Yp=O`
  :host([theme~='margin']) {
    margin: var(--lumo-space-m);
  }

  :host([theme~='padding']) {
    padding: var(--lumo-space-m);
  }

  :host([theme~='spacing-xs']) {
    gap: var(--lumo-space-xs);
  }

  :host([theme~='spacing-s']) {
    gap: var(--lumo-space-s);
  }

  :host([theme~='spacing']) {
    gap: var(--lumo-space-m);
  }

  :host([theme~='spacing-l']) {
    gap: var(--lumo-space-l);
  }

  :host([theme~='spacing-xl']) {
    gap: var(--lumo-space-xl);
  }

  :host([theme~='wrap']) {
    flex-wrap: wrap;
  }
`;T("vaadin-horizontal-layout",Yp,{moduleId:"lumo-horizontal-layout"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Up=n=>class extends n{ready(){super.ready();const t=this.shadowRoot.querySelector("slot:not([name])");this.__startSlotObserver=new Qe(t,({currentNodes:i,removedNodes:o})=>{o.length&&this.__clearAttribute(o,"last-start-child");const s=i.filter(l=>l.nodeType===Node.ELEMENT_NODE);this.__updateAttributes(s,"start",!1,!0);const a=i.filter(l=>!_a(l));this.toggleAttribute("has-start",a.length>0)});const e=this.shadowRoot.querySelector('[name="end"]');this.__endSlotObserver=new Qe(e,({currentNodes:i,removedNodes:o})=>{o.length&&this.__clearAttribute(o,"first-end-child"),this.__updateAttributes(i,"end",!0,!1),this.toggleAttribute("has-end",i.length>0)});const r=this.shadowRoot.querySelector('[name="middle"]');this.__middleSlotObserver=new Qe(r,({currentNodes:i,removedNodes:o})=>{o.length&&(this.__clearAttribute(o,"first-middle-child"),this.__clearAttribute(o,"last-middle-child")),this.__updateAttributes(i,"middle",!0,!0),this.toggleAttribute("has-middle",i.length>0)})}__clearAttribute(t,e){const r=t.find(i=>i.nodeType===Node.ELEMENT_NODE&&i.hasAttribute(e));r&&r.removeAttribute(e)}__updateAttributes(t,e,r,i){t.forEach((o,s)=>{if(r){const a=`first-${e}-child`;s===0?o.setAttribute(a,""):o.hasAttribute(a)&&o.removeAttribute(a)}if(i){const a=`last-${e}-child`;s===t.length-1?o.setAttribute(a,""):o.hasAttribute(a)&&o.removeAttribute(a)}})}};/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const So=O`
  :host {
    display: flex;
    box-sizing: border-box;
  }

  :host([hidden]) {
    display: none !important;
  }

  /* Theme variations */
  :host([theme~='margin']) {
    margin: 1em;
  }

  :host([theme~='padding']) {
    padding: 1em;
  }

  :host([theme~='spacing']) {
    gap: 1em;
  }

  :host([has-end]:not([has-middle])) ::slotted([last-start-child]) {
    margin-inline-end: auto;
  }

  ::slotted([first-middle-child]) {
    margin-inline-start: auto;
  }

  ::slotted([last-middle-child]) {
    margin-inline-end: auto;
  }

  :host(:not([has-middle])) ::slotted([first-end-child]) {
    margin-inline-start: auto;
  }
`,qp=window.Vaadin.featureFlags.layoutComponentImprovements,jp=O`
  ::slotted([data-width-full]) {
    flex: 1;
  }

  ::slotted(vaadin-horizontal-layout[data-width-full]),
  ::slotted(vaadin-vertical-layout[data-width-full]) {
    min-width: 0;
  }
`,Gp=qp?[So,jp]:[So];/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-horizontal-layout",Gp,{moduleId:"vaadin-horizontal-layout-styles"});class Kp extends Up(Te(J(L))){static get template(){return G`
      <slot></slot>
      <slot name="middle"></slot>
      <slot name="end"></slot>
    `}static get is(){return"vaadin-horizontal-layout"}}W(Kp);T("vaadin-notification-card",O`
    :host {
      position: relative;
      margin: var(--lumo-space-s);
    }

    [part='overlay'] {
      background: var(--lumo-base-color) linear-gradient(var(--lumo-contrast-5pct), var(--lumo-contrast-5pct));
      border-radius: var(--lumo-border-radius-l);
      box-shadow:
        0 0 0 1px var(--lumo-contrast-10pct),
        var(--lumo-box-shadow-l);
      font-family: var(--lumo-font-family);
      font-size: var(--lumo-font-size-m);
      font-weight: 400;
      line-height: var(--lumo-line-height-s);
      letter-spacing: 0;
      text-transform: none;
      -webkit-text-size-adjust: 100%;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    [part='content'] {
      padding: var(--lumo-space-wide-l);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    [part='content'] ::slotted(vaadin-button) {
      flex: none;
      margin: 0 calc(var(--lumo-space-s) * -1) 0 var(--lumo-space-m);
    }

    :host([slot^='middle']) {
      max-width: 80vw;
      margin: var(--lumo-space-s) auto;
    }

    :host([slot$='stretch']) {
      margin: 0;
    }

    :host([slot$='stretch']) [part='overlay'] {
      border-radius: 0;
    }

    @media (min-width: 421px) {
      :host(:not([slot$='stretch'])) {
        display: flex;
      }

      :host([slot$='end']) {
        justify-content: flex-end;
      }

      :host([slot^='middle']),
      :host([slot$='center']) {
        display: flex;
        justify-content: center;
      }
    }

    @keyframes lumo-notification-exit-fade-out {
      100% {
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-fade-in {
      0% {
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-slide-down {
      0% {
        transform: translateY(-200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-exit-slide-up {
      100% {
        transform: translateY(-200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-enter-slide-up {
      0% {
        transform: translateY(200%);
        opacity: 0;
      }
    }

    @keyframes lumo-notification-exit-slide-down {
      100% {
        transform: translateY(200%);
        opacity: 0;
      }
    }

    :host([slot='middle'][opening]) {
      animation: lumo-notification-enter-fade-in 300ms;
    }

    :host([slot='middle'][closing]) {
      animation: lumo-notification-exit-fade-out 300ms;
    }

    :host([slot^='top'][opening]) {
      animation: lumo-notification-enter-slide-down 300ms;
    }

    :host([slot^='top'][closing]) {
      animation: lumo-notification-exit-slide-up 300ms;
    }

    :host([slot^='bottom'][opening]) {
      animation: lumo-notification-enter-slide-up 300ms;
    }

    :host([slot^='bottom'][closing]) {
      animation: lumo-notification-exit-slide-down 300ms;
    }

    :host([theme='success']) {
      --_focus-ring-gap-color: var(--lumo-success-color);
      --vaadin-focus-ring-color: var(--lumo-success-contrast-color);
    }

    :host([theme='warning']) {
      --_focus-ring-gap-color: var(--lumo-warning-color);
      --vaadin-focus-ring-color: var(--lumo-warning-contrast-color);
    }

    :host([theme='error']) {
      --_focus-ring-gap-color: var(--lumo-error-color);
      --vaadin-focus-ring-color: var(--lumo-error-contrast-color);
    }

    :host([theme='primary']) {
      --_focus-ring-gap-color: var(--lumo-primary-color);
      --vaadin-focus-ring-color: var(--lumo-primary-contrast-color);
    }

    :host([theme~='primary']) [part='overlay'] {
      background: var(--lumo-primary-color);
      color: var(--lumo-primary-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='primary']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-primary-contrast-color);
      --vaadin-button-primary-background: var(--lumo-primary-contrast-color);
      --vaadin-button-primary-text-color: var(--lumo-primary-text-color);
    }

    :host([theme~='contrast']) [part='overlay'] {
      background: var(--lumo-contrast);
      color: var(--lumo-base-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='contrast']) {
      --vaadin-button-background: var(--lumo-contrast-20pct);
      --vaadin-button-text-color: var(--lumo-base-color);
      --vaadin-button-primary-background: var(--lumo-base-color);
      --vaadin-button-primary-text-color: var(--lumo-contrast);
    }

    :host([theme~='success']) [part='overlay'] {
      background: var(--lumo-success-color);
      color: var(--lumo-success-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='success']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-success-contrast-color);
      --vaadin-button-primary-background: var(--lumo-success-contrast-color);
      --vaadin-button-primary-text-color: var(--lumo-success-text-color);
    }

    :host([theme~='error']) [part='overlay'] {
      background: var(--lumo-error-color);
      color: var(--lumo-error-contrast-color);
      box-shadow: var(--lumo-box-shadow-l);
    }

    :host([theme~='error']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-error-contrast-color);
      --vaadin-button-primary-background: var(--lumo-error-contrast-color);
      --vaadin-button-primary-text-color: var(--lumo-error-text-color);
    }

    :host([theme~='warning']) [part='overlay'] {
      background: var(--lumo-warning-color);
      color: var(--lumo-warning-contrast-color);
      box-shadow:
        inset 0 0 0 1px var(--lumo-contrast-20pct),
        var(--lumo-box-shadow-l);
    }

    :host([theme~='warning']) {
      --vaadin-button-background: var(--lumo-shade-20pct);
      --vaadin-button-text-color: var(--lumo-warning-contrast-color);
      --vaadin-button-primary-background: var(--lumo-shade-50pct);
      --vaadin-button-primary-text-color: var(--lumo-primary-contrast-color);
    }
  `,{moduleId:"lumo-notification-card"});/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Qp=n=>class extends pa(n){static get properties(){return{opened:{type:Boolean,value:!1,sync:!0,observer:"_openedChanged"}}}constructor(){super(),this._boundVaadinOverlayClose=this._onVaadinOverlayClose.bind(this),Le&&(this._boundIosResizeListener=()=>this._detectIosNavbar())}_openedChanged(t){t?(document.body.appendChild(this),document.addEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&(this._detectIosNavbar(),window.addEventListener("resize",this._boundIosResizeListener))):(document.body.removeChild(this),document.removeEventListener("vaadin-overlay-close",this._boundVaadinOverlayClose),this._boundIosResizeListener&&window.removeEventListener("resize",this._boundIosResizeListener))}_detectIosNavbar(){const t=window.innerHeight,r=window.innerWidth>t,i=document.documentElement.clientHeight;r&&i>t?this.style.bottom=`${i-t}px`:this.style.bottom="0"}_onVaadinOverlayClose(t){const e=t.detail.sourceEvent;e&&e.composedPath().indexOf(this)>=0&&t.preventDefault()}},Xp=n=>class extends jo(fi(n)){static get properties(){return{assertive:{type:Boolean,value:!1,sync:!0},duration:{type:Number,value:5e3,sync:!0},opened:{type:Boolean,value:!1,notify:!0,sync:!0,observer:"_openedChanged"},position:{type:String,value:"bottom-start",observer:"_positionChanged",sync:!0},renderer:{type:Function,sync:!0}}}static get observers(){return["_durationChanged(duration, opened)","_rendererChanged(renderer, opened, _overlayElement)"]}static show(t,e){const r=customElements.get("vaadin-notification");return ma(t)?r._createAndShowNotification(i=>{_i(t,i)},e):r._createAndShowNotification(i=>{i.innerText=t},e)}static _createAndShowNotification(t,e){const r=document.createElement("vaadin-notification");return e&&Number.isFinite(e.duration)&&(r.duration=e.duration),e&&e.position&&(r.position=e.position),e&&e.assertive&&(r.assertive=e.assertive),e&&e.theme&&r.setAttribute("theme",e.theme),r.renderer=t,document.body.appendChild(r),r.opened=!0,r.addEventListener("opened-changed",i=>{i.detail.value||r.remove()}),r}get _container(){const t=customElements.get("vaadin-notification");return t._container||(t._container=document.createElement("vaadin-notification-container"),document.body.appendChild(t._container)),t._container}get _card(){return this._overlayElement}ready(){super.ready(),this._overlayElement=this.shadowRoot.querySelector("vaadin-notification-card"),Ar(this)}disconnectedCallback(){super.disconnectedCallback(),queueMicrotask(()=>{this.isConnected||(this.opened=!1)})}requestContentUpdate(){!this.renderer||!this._card||this.renderer(this._card,this)}__computeAriaLive(t){return t?"assertive":"polite"}_rendererChanged(t,e,r){if(!r)return;const i=this._oldRenderer!==t;this._oldRenderer=t,i&&(r.innerHTML="",delete r._$litPart$),e&&(this._didAnimateNotificationAppend||this._animatedAppendNotificationCard(),this.requestContentUpdate())}open(){this.opened=!0}close(){this.opened=!1}_openedChanged(t){t?(this._container.opened=!0,this._animatedAppendNotificationCard()):this._card&&this._closeNotificationCard()}__cleanUpOpeningClosingState(){this._card.removeAttribute("opening"),this._card.removeAttribute("closing"),this._card.removeEventListener("animationend",this.__animationEndListener)}_animatedAppendNotificationCard(){this._card?(this.__cleanUpOpeningClosingState(),this._card.setAttribute("opening",""),this._appendNotificationCard(),this.__animationEndListener=()=>this.__cleanUpOpeningClosingState(),this._card.addEventListener("animationend",this.__animationEndListener),this._didAnimateNotificationAppend=!0):this._didAnimateNotificationAppend=!1}_appendNotificationCard(){if(this._card){if(!this._container.shadowRoot.querySelector(`slot[name="${this.position}"]`)){console.warn(`Invalid alignment parameter provided: position=${this.position}`);return}this._container.bringToFront(),this._card.slot=this.position,this._container.firstElementChild&&/top/u.test(this.position)?this._container.insertBefore(this._card,this._container.firstElementChild):this._container.appendChild(this._card)}}_removeNotificationCard(){this._card&&(this._card.parentNode&&this._card.parentNode.removeChild(this._card),this._card.removeAttribute("closing"),this._container.opened=!!this._container.firstElementChild,this.dispatchEvent(new CustomEvent("closed")))}_closeNotificationCard(){this._durationTimeoutId&&clearTimeout(this._durationTimeoutId),this._animatedRemoveNotificationCard()}_animatedRemoveNotificationCard(){this.__cleanUpOpeningClosingState(),this._card.setAttribute("closing","");const t=getComputedStyle(this._card).getPropertyValue("animation-name");t&&t!=="none"?(this.__animationEndListener=()=>{this._removeNotificationCard(),this.__cleanUpOpeningClosingState()},this._card.addEventListener("animationend",this.__animationEndListener)):this._removeNotificationCard()}_positionChanged(){this.opened&&this._animatedAppendNotificationCard()}_durationChanged(t,e){e&&(clearTimeout(this._durationTimeoutId),t>0&&(this._durationTimeoutId=setTimeout(()=>this.close(),t)))}};/**
 * @license
 * Copyright (c) 2016 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Zp=O`
  :host {
    position: fixed;
    z-index: 1000;
    inset: 0;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    pointer-events: none;
  }

  [region-group] {
    flex: 1 1 0%;
    display: flex;
  }

  [region-group='top'] {
    align-items: flex-start;
  }

  [region-group='bottom'] {
    align-items: flex-end;
  }

  [region-group] > [region] {
    flex: 1 1 0%;
  }

  @media (max-width: 420px) {
    [region-group] {
      flex-direction: column;
      align-items: stretch;
    }

    [region-group='top'] {
      justify-content: flex-start;
    }

    [region-group='bottom'] {
      justify-content: flex-end;
    }

    [region-group] > [region] {
      flex: initial;
    }
  }
`,Jp=O`
  :host {
    display: block;
  }

  [part='overlay'] {
    pointer-events: auto;
  }

  @media (forced-colors: active) {
    [part='overlay'] {
      outline: 3px solid;
    }
  }
`;/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */T("vaadin-notification-container",Zp,{moduleId:"vaadin-notification-container-styles"});T("vaadin-notification-card",Jp,{moduleId:"vaadin-notification-card-styles"});class em extends Qp(J(Te(L))){static get template(){return G`
      <div region="top-stretch"><slot name="top-stretch"></slot></div>
      <div region-group="top">
        <div region="top-start"><slot name="top-start"></slot></div>
        <div region="top-center"><slot name="top-center"></slot></div>
        <div region="top-end"><slot name="top-end"></slot></div>
      </div>
      <div region="middle"><slot name="middle"></slot></div>
      <div region-group="bottom">
        <div region="bottom-start"><slot name="bottom-start"></slot></div>
        <div region="bottom-center"><slot name="bottom-center"></slot></div>
        <div region="bottom-end"><slot name="bottom-end"></slot></div>
      </div>
      <div region="bottom-stretch"><slot name="bottom-stretch"></slot></div>
    `}static get is(){return"vaadin-notification-container"}}class tm extends J(L){static get template(){return G`
      <div part="overlay">
        <div part="content">
          <slot></slot>
        </div>
      </div>
    `}static get is(){return"vaadin-notification-card"}ready(){super.ready(),this.setAttribute("role","alert")}}class rm extends Xp(Te(L)){static get template(){return G`
      <style>
        :host {
          display: none !important;
        }
      </style>
      <vaadin-notification-card
        theme$="[[_theme]]"
        aria-live$="[[__computeAriaLive(assertive)]]"
      ></vaadin-notification-card>
    `}static get is(){return"vaadin-notification"}}W(em);W(tm);W(rm);const qm=Object.freeze(Object.defineProperty({__proto__:null},Symbol.toStringTag,{value:"Module"}));export{Ra as D,Ps as I,ls as L,xa as V,vs as a,os as b,gi as c,$c as d,Rc as e,Tc as f,as as g,cc as h,ms as i,Ba as j,qm as k,ys as m,Ar as p};
