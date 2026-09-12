import{o as N,h as g,D as P,P as b,a as te,i as ie,b as q,O as R,g as se,c as S,d as oe,C as re,F as ne,K as ae,e as le,f as de,j as L,k as ue,E as A,T as O,l as he,t as ce,m as pe,R as me,S as _e}from"./generated-flow-imports-BU4ooIrJ.js";import{i as W,m as G,a as B,V as fe,I as ve,D as ge,b as be,c as ye,p as j,d as Ce,e as T,f as z,g as F,L as k,h as Ie,j as E}from"./chunk-cf8ead0a6bc68cbed5a573f9beec28811afc0aa448ebd4089740cfa553c9031a-dOiMUXNN.js";import{i as m,r as _,d as v,T as C}from"./indexhtml-BPZ0FBOF.js";const U=m`
  :host {
    transition: background-color 100ms;
    overflow: hidden;
    --_lumo-item-selected-icon-display: block;
    --_focus-ring-color: var(--vaadin-focus-ring-color, var(--lumo-primary-color-50pct));
    --_focus-ring-width: var(--vaadin-focus-ring-width, 2px);
  }

  :host([focused]:not([disabled])) {
    box-shadow: inset 0 0 0 var(--_focus-ring-width) var(--_focus-ring-color);
  }
`;_("vaadin-combo-box-item",[W,U],{moduleId:"lumo-combo-box-item"});/**
 * @license
 * Copyright (c) 2022 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const H=m`
  [part~='loader'] {
    box-sizing: border-box;
    width: var(--lumo-icon-size-s);
    height: var(--lumo-icon-size-s);
    border: 2px solid transparent;
    border-color: var(--lumo-primary-color-10pct) var(--lumo-primary-color-10pct) var(--lumo-primary-color)
      var(--lumo-primary-color);
    border-radius: calc(0.5 * var(--lumo-icon-size-s));
    opacity: 0;
    pointer-events: none;
  }

  :host(:not([loading])) [part~='loader'] {
    display: none;
  }

  :host([loading]) [part~='loader'] {
    animation:
      1s linear infinite lumo-loader-rotate,
      0.3s 0.1s lumo-loader-fade-in both;
  }

  @keyframes lumo-loader-fade-in {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes lumo-loader-rotate {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`,K=m`
  [part='content'] {
    padding: 0;
  }

  /* When items are empty, the spinner needs some room */
  :host(:not([closing])) [part~='content'] {
    min-height: calc(2 * var(--lumo-space-s) + var(--lumo-icon-size-s));
  }

  [part~='overlay'] {
    position: relative;
  }

  :host([top-aligned]) [part~='overlay'] {
    margin-top: var(--lumo-space-xs);
  }

  :host([bottom-aligned]) [part~='overlay'] {
    margin-bottom: var(--lumo-space-xs);
  }
`,Y=m`
  [part~='loader'] {
    position: absolute;
    z-index: 1;
    inset-inline: var(--lumo-space-s);
    top: var(--lumo-space-s);
    margin-inline: auto 0;
  }
`;_("vaadin-combo-box-overlay",[N,G,K,H,Y,m`
      :host {
        --_vaadin-combo-box-items-container-border-width: var(--lumo-space-xs);
        --_vaadin-combo-box-items-container-border-style: solid;
      }
    `],{moduleId:"lumo-combo-box-overlay"});const xe=m`
  [part='toggle-button']::before {
    content: var(--lumo-icons-dropdown);
  }
`;_("vaadin-combo-box",[B,xe],{moduleId:"lumo-combo-box"});/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const J=s=>class extends s{static get properties(){return{index:{type:Number},item:{type:Object},label:{type:String},selected:{type:Boolean,value:!1,reflectToAttribute:!0},focused:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:{type:Function}}}static get observers(){return["__rendererOrItemChanged(renderer, index, item, selected, focused)","__updateLabel(label, renderer)"]}static get observedAttributes(){return[...super.observedAttributes,"hidden"]}attributeChangedCallback(e,t,i){e==="hidden"&&i!==null?this.index=void 0:super.attributeChangedCallback(e,t,i)}connectedCallback(){super.connectedCallback(),this._owner=this.parentNode.owner;const e=this._owner.getAttribute("dir");e&&this.setAttribute("dir",e)}requestContentUpdate(){if(!this.renderer||this.hidden)return;const e={index:this.index,item:this.item,focused:this.focused,selected:this.selected};this.renderer(this,this._owner,e)}__rendererOrItemChanged(e,t,i){i===void 0||t===void 0||(this._oldRenderer!==e&&(this.innerHTML="",delete this._$litPart$),e&&(this._oldRenderer=e,this.requestContentUpdate()))}__updateLabel(e,t){t||(this.textContent=e)}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class we extends J(C(P(b))){static get template(){return g`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}static get is(){return"vaadin-combo-box-item"}}v(we);/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Q=s=>class extends te(s){static get observers(){return["_setOverlayWidth(positionTarget, opened)"]}constructor(){super(),this.requiredVerticalSpace=200}connectedCallback(){super.connectedCallback();const e=this._comboBox,t=e&&e.getAttribute("dir");t&&this.setAttribute("dir",t)}_shouldCloseOnOutsideClick(e){const t=e.composedPath();return!t.includes(this.positionTarget)&&!t.includes(this)}_mouseDownListener(e){super._mouseDownListener(e),this._shouldCloseOnOutsideClick(e)&&!ie(e.composedPath()[0])&&e.preventDefault()}_updateOverlayWidth(){const e=this.localName;this.style.setProperty(`--_${e}-default-width`,`${this.positionTarget.offsetWidth}px`);const t=getComputedStyle(this._comboBox).getPropertyValue(`--${e}-width`);t===""?this.style.removeProperty(`--${e}-width`):this.style.setProperty(`--${e}-width`,t)}_setOverlayWidth(e,t){e&&t&&(this._updateOverlayWidth(),this._updatePosition())}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Se=m`
  #overlay {
    width: var(--vaadin-combo-box-overlay-width, var(--_vaadin-combo-box-overlay-default-width, auto));
  }

  [part='content'] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;_("vaadin-combo-box-overlay",[q,Se],{moduleId:"vaadin-combo-box-overlay-styles"});class Pe extends Q(R(P(C(b)))){static get is(){return"vaadin-combo-box-overlay"}static get template(){return g`
      <div id="backdrop" part="backdrop" hidden></div>
      <div part="overlay" id="overlay">
        <div part="loader"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `}}v(Pe);/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const y=class{toString(){return""}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const X=s=>class extends s{static get properties(){return{items:{type:Array,sync:!0,observer:"__itemsChanged"},focusedIndex:{type:Number,sync:!0,observer:"__focusedIndexChanged"},loading:{type:Boolean,sync:!0,observer:"__loadingChanged"},opened:{type:Boolean,sync:!0,observer:"__openedChanged"},selectedItem:{type:Object,sync:!0,observer:"__selectedItemChanged"},itemClassNameGenerator:{type:Object,observer:"__itemClassNameGeneratorChanged"},itemIdPath:{type:String},owner:{type:Object},getItemLabel:{type:Object},renderer:{type:Object,sync:!0,observer:"__rendererChanged"},theme:{type:String}}}constructor(){super(),this.__boundOnItemClick=this.__onItemClick.bind(this)}get _viewportTotalPaddingBottom(){if(this._cachedViewportTotalPaddingBottom===void 0){const e=window.getComputedStyle(this.$.selector);this._cachedViewportTotalPaddingBottom=[e.paddingBottom,e.borderBottomWidth].map(t=>parseInt(t,10)).reduce((t,i)=>t+i)}return this._cachedViewportTotalPaddingBottom}ready(){super.ready(),this.setAttribute("role","listbox"),this.id=`${this.localName}-${se()}`,this.__hostTagName=this.constructor.is.replace("-scroller",""),this.addEventListener("click",e=>e.stopPropagation()),this.__patchWheelOverScrolling()}requestContentUpdate(){this.__virtualizer&&(this.items&&(this.__virtualizer.size=this.items.length),this.opened&&this.__virtualizer.update())}scrollIntoView(e){if(!this.__virtualizer||!(this.opened&&e>=0))return;const t=this._visibleItemsCount();let i=e;e>this.__virtualizer.lastVisibleIndex-1?(this.__virtualizer.scrollToIndex(e),i=e-t+1):e>this.__virtualizer.firstVisibleIndex&&(i=this.__virtualizer.firstVisibleIndex),this.__virtualizer.scrollToIndex(Math.max(0,i));const o=[...this.children].find(r=>!r.hidden&&r.index===this.__virtualizer.lastVisibleIndex);if(!o||e!==o.index)return;const l=o.getBoundingClientRect(),u=this.getBoundingClientRect(),f=l.bottom-u.bottom+this._viewportTotalPaddingBottom;f>0&&(this.scrollTop+=f)}_isItemSelected(e,t,i){return e instanceof y?!1:i&&e!==void 0&&t!==void 0?S(i,e)===S(i,t):e===t}__initVirtualizer(){this.__virtualizer=new fe({createElements:this.__createElements.bind(this),updateElement:this._updateElement.bind(this),elementsContainer:this,scrollTarget:this,scrollContainer:this.$.selector,reorderElements:!0})}__itemsChanged(e){e&&this.__virtualizer&&this.requestContentUpdate()}__loadingChanged(){this.requestContentUpdate()}__openedChanged(e){e&&(this.__virtualizer||this.__initVirtualizer(),this.requestContentUpdate())}__selectedItemChanged(){this.requestContentUpdate()}__itemClassNameGeneratorChanged(e,t){(e||t)&&this.requestContentUpdate()}__focusedIndexChanged(e,t){e!==t&&this.requestContentUpdate(),e>=0&&!this.loading&&this.scrollIntoView(e)}__rendererChanged(e,t){(e||t)&&this.requestContentUpdate()}__createElements(e){return[...Array(e)].map(()=>{const t=document.createElement(`${this.__hostTagName}-item`);return t.addEventListener("click",this.__boundOnItemClick),t.tabIndex="-1",t.style.width="100%",t})}_updateElement(e,t){const i=this.items[t],o=this.focusedIndex,l=this._isItemSelected(i,this.selectedItem,this.itemIdPath);e.setProperties({item:i,index:t,label:this.getItemLabel(i),selected:l,renderer:this.renderer,focused:!this.loading&&o===t}),typeof this.itemClassNameGenerator=="function"?e.className=this.itemClassNameGenerator(i):e.className!==""&&(e.className=""),e.id=`${this.__hostTagName}-item-${t}`,e.setAttribute("role",t!==void 0?"option":!1),e.setAttribute("aria-selected",l.toString()),e.setAttribute("aria-posinset",t+1),e.setAttribute("aria-setsize",this.items.length),this.theme?e.setAttribute("theme",this.theme):e.removeAttribute("theme"),i instanceof y&&this.__requestItemByIndex(t)}__onItemClick(e){this.dispatchEvent(new CustomEvent("selection-changed",{detail:{item:e.currentTarget.item}}))}__patchWheelOverScrolling(){this.$.selector.addEventListener("wheel",e=>{const t=this.scrollTop===0,i=this.scrollHeight-this.scrollTop-this.clientHeight<=1;(t&&e.deltaY<0||i&&e.deltaY>0)&&e.preventDefault()})}__requestItemByIndex(e){requestAnimationFrame(()=>{this.dispatchEvent(new CustomEvent("index-requested",{detail:{index:e}}))})}_visibleItemsCount(){return this.__virtualizer.scrollToIndex(this.__virtualizer.firstVisibleIndex),this.__virtualizer.size>0?this.__virtualizer.lastVisibleIndex-this.__virtualizer.firstVisibleIndex+1:0}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ve extends X(b){static get is(){return"vaadin-combo-box-scroller"}static get template(){return g`
      <style>
        :host {
          display: block;
          min-height: 1px;
          overflow: auto;

          /* Fixes item background from getting on top of scrollbars on Safari */
          transform: translate3d(0, 0, 0);

          /* Enable momentum scrolling on iOS */
          -webkit-overflow-scrolling: touch;

          /* Fixes scrollbar disappearing when 'Show scroll bars: Always' enabled in Safari */
          box-shadow: 0 0 0 white;
        }

        #selector {
          border-width: var(--_vaadin-combo-box-items-container-border-width);
          border-style: var(--_vaadin-combo-box-items-container-border-style);
          border-color: var(--_vaadin-combo-box-items-container-border-color, transparent);
          position: relative;
        }
      </style>
      <div id="selector">
        <slot></slot>
      </div>
    `}}v(Ve);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ee=s=>class extends ve(s){static get properties(){return{pattern:{type:String}}}static get delegateAttrs(){return[...super.delegateAttrs,"pattern"]}static get constraints(){return[...super.constraints,"pattern"]}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Z=s=>class extends s{static get properties(){return{pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},size:{type:Number,observer:"_sizeChanged",sync:!0},dataProvider:{type:Object,observer:"_dataProviderChanged",sync:!0},__dataProviderInitialized:{type:Boolean,value:!1},__previousDataProviderFilter:{type:String}}}static get observers(){return["_dataProviderFilterChanged(filter)","_warnDataProviderValue(dataProvider, value)","_ensureFirstPage(opened)"]}constructor(){super(),this.__dataProviderController=new ge(this,{placeholder:new y,isPlaceholder:e=>e instanceof y,dataProviderParams:()=>({filter:this.filter})}),this.__dataProviderController.addEventListener("page-requested",this.__onDataProviderPageRequested.bind(this)),this.__dataProviderController.addEventListener("page-loaded",this.__onDataProviderPageLoaded.bind(this))}ready(){super.ready(),this._scroller.addEventListener("index-requested",e=>{if(!this._shouldFetchData())return;const t=e.detail.index;t!==void 0&&this.__dataProviderController.ensureFlatIndexLoaded(t)}),this.__dataProviderInitialized=!0,this.dataProvider&&this.__synchronizeControllerState()}_dataProviderFilterChanged(e){if(this.__previousDataProviderFilter===void 0&&e===""){this.__previousDataProviderFilter=e;return}this.__previousDataProviderFilter!==e&&(this.__previousDataProviderFilter=e,this.__keepOverlayOpened=!0,this.size=void 0,this.clearCache(),this.__keepOverlayOpened=!1)}_shouldFetchData(){return this.dataProvider?this.opened||this.filter&&this.filter.length:!1}_ensureFirstPage(e){!this._shouldFetchData()||!e||(this._forceNextRequest||this.size===void 0?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this.size>0&&this.__dataProviderController.ensureFlatIndexLoaded(0))}__onDataProviderPageRequested(){this.loading=!0}__onDataProviderPageLoaded(){const{rootCache:e}=this.__dataProviderController;e.items=[...e.items],this.__synchronizeControllerState(),!this.opened&&!this._isInputFocused()&&this._commitValue()}clearCache(){this.dataProvider&&(this.__dataProviderController.clearCache(),this.__synchronizeControllerState(),this._shouldFetchData()?(this._forceNextRequest=!1,this.__dataProviderController.loadFirstPage()):this._forceNextRequest=!0)}_sizeChanged(e){const{rootCache:t}=this.__dataProviderController;t.size!==e&&(t.size=e,t.items=[...t.items],this.__synchronizeControllerState())}_filteredItemsChanged(e){if(super._filteredItemsChanged(e),this.dataProvider&&e){const{rootCache:t}=this.__dataProviderController;t.items!==e&&(t.items=e,this.__synchronizeControllerState())}}__synchronizeControllerState(){if(this.__dataProviderInitialized&&this.dataProvider){const{rootCache:e}=this.__dataProviderController;this.size=e.size,this.filteredItems=e.items,this.loading=this.__dataProviderController.isLoading()}}_pageSizeChanged(e,t){if(Math.floor(e)!==e||e<1)throw this.pageSize=t,new Error("`pageSize` value must be an integer > 0");this.__dataProviderController.setPageSize(e),this.clearCache()}_dataProviderChanged(e,t){this._ensureItemsOrDataProvider(()=>{this.dataProvider=t}),this.__dataProviderController.setDataProvider(e),this.clearCache()}_ensureItemsOrDataProvider(e){if(this.items!==void 0&&this.dataProvider!==void 0)throw e(),new Error("Using `items` and `dataProvider` together is not supported")}_warnDataProviderValue(e,t){if(e&&t!==""&&(this.selectedItem===void 0||this.selectedItem===null)){const i=this.__getItemIndexByValue(this.filteredItems,t);(i<0||!this._getItemLabel(this.filteredItems[i]))&&console.warn("Warning: unable to determine the label for the provided `value`. Nothing to display in the text field. This usually happens when setting an initial `value` before any items are returned from the `dataProvider` callback. Consider setting `selectedItem` instead of `value`")}}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */function $(s){return s!=null}function M(s,n){return s.findIndex(e=>e instanceof y?!1:n(e))}const ee=s=>class extends oe(re(be(ne(ae(ye(le(s))))))){static get properties(){return{opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,sync:!0,observer:"_openedChanged"},autoOpenDisabled:{type:Boolean,sync:!0},readonly:{type:Boolean,value:!1,reflectToAttribute:!0},renderer:{type:Object,sync:!0},items:{type:Array,sync:!0,observer:"_itemsChanged"},allowCustomValue:{type:Boolean,value:!1},filteredItems:{type:Array,observer:"_filteredItemsChanged",sync:!0},_lastCommittedValue:String,loading:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},_focusedIndex:{type:Number,observer:"_focusedIndexChanged",value:-1,sync:!0},filter:{type:String,value:"",notify:!0,sync:!0},selectedItem:{type:Object,notify:!0,sync:!0},itemClassNameGenerator:{type:Object},itemLabelPath:{type:String,value:"label",observer:"_itemLabelPathChanged",sync:!0},itemValuePath:{type:String,value:"value",sync:!0},itemIdPath:{type:String,sync:!0},_toggleElement:{type:Object,observer:"_toggleElementChanged"},_dropdownItems:{type:Array,sync:!0},_closeOnBlurIsPrevented:Boolean,_scroller:{type:Object,sync:!0},_overlayOpened:{type:Boolean,sync:!0,observer:"_overlayOpenedChanged"},__keepOverlayOpened:{type:Boolean,sync:!0}}}static get observers(){return["_selectedItemChanged(selectedItem, itemValuePath, itemLabelPath)","_openedOrItemsChanged(opened, _dropdownItems, loading, __keepOverlayOpened)","_updateScroller(_scroller, _dropdownItems, opened, loading, selectedItem, itemIdPath, _focusedIndex, renderer, _theme, itemClassNameGenerator)"]}constructor(){super(),this._boundOverlaySelectedItemChanged=this._overlaySelectedItemChanged.bind(this),this._boundOnClearButtonMouseDown=this.__onClearButtonMouseDown.bind(this),this._boundOnClick=this._onClick.bind(this),this._boundOnOverlayTouchAction=this._onOverlayTouchAction.bind(this),this._boundOnTouchend=this._onTouchend.bind(this)}get _tagNamePrefix(){return"vaadin-combo-box"}get _nativeInput(){return this.inputElement}_inputElementChanged(e){super._inputElementChanged(e);const t=this._nativeInput;t&&(t.autocomplete="off",t.autocapitalize="off",t.setAttribute("role","combobox"),t.setAttribute("aria-autocomplete","list"),t.setAttribute("aria-expanded",!!this.opened),t.setAttribute("spellcheck","false"),t.setAttribute("autocorrect","off"),this._revertInputValueToValue(),this.clearElement&&this.clearElement.addEventListener("mousedown",this._boundOnClearButtonMouseDown))}ready(){super.ready(),this._initOverlay(),this._initScroller(),this._lastCommittedValue=this.value,this.addEventListener("click",this._boundOnClick),this.addEventListener("touchend",this._boundOnTouchend);const e=()=>{requestAnimationFrame(()=>{this._overlayElement.bringToFront()})};this.addEventListener("mousedown",e),this.addEventListener("touchstart",e),j(this),this.addController(new Ce(this))}disconnectedCallback(){super.disconnectedCallback(),this.close()}requestContentUpdate(){this._scroller&&(this._scroller.requestContentUpdate(),this._getItemElements().forEach(e=>{e.requestContentUpdate()}))}open(){!this.disabled&&!this.readonly&&(this.opened=!0)}close(){this.opened=!1}_propertiesChanged(e,t,i){super._propertiesChanged(e,t,i),t.filter!==void 0&&this._filterChanged(t.filter)}updated(e){super.updated(e),e.has("filter")&&this._filterChanged(this.filter)}_initOverlay(){const e=this.$.overlay;e._comboBox=this,e.addEventListener("touchend",this._boundOnOverlayTouchAction),e.addEventListener("touchmove",this._boundOnOverlayTouchAction),e.addEventListener("mousedown",t=>t.preventDefault()),e.addEventListener("opened-changed",t=>{this._overlayOpened=t.detail.value}),this._overlayElement=e}_initScroller(e){const t=document.createElement(`${this._tagNamePrefix}-scroller`);t.owner=e||this,t.getItemLabel=this._getItemLabel.bind(this),t.addEventListener("selection-changed",this._boundOverlaySelectedItemChanged);const i=this._overlayElement;i.renderer=o=>{o.innerHTML||o.appendChild(t)},i.requestContentUpdate(),this._scroller=t}_updateScroller(e,t,i,o,l,u,f,r,a,d){e&&(i&&(e.style.maxHeight=getComputedStyle(this).getPropertyValue(`--${this._tagNamePrefix}-overlay-max-height`)||"65vh"),e.setProperties({items:i?t:[],opened:i,loading:o,selectedItem:l,itemIdPath:u,focusedIndex:f,renderer:r,theme:a,itemClassNameGenerator:d}))}_openedOrItemsChanged(e,t,i,o){this._overlayOpened=e&&(o||i||!!(t&&t.length))}_overlayOpenedChanged(e,t){e?(this.dispatchEvent(new CustomEvent("vaadin-combo-box-dropdown-opened",{bubbles:!0,composed:!0})),this._onOpened()):t&&this._dropdownItems&&this._dropdownItems.length&&(this.close(),this.dispatchEvent(new CustomEvent("vaadin-combo-box-dropdown-closed",{bubbles:!0,composed:!0})))}_focusedIndexChanged(e,t){t!==void 0&&this._updateActiveDescendant(e)}_isInputFocused(){return this.inputElement&&de(this.inputElement)}_updateActiveDescendant(e){const t=this._nativeInput;if(!t)return;const i=this._getItemElements().find(o=>o.index===e);i?t.setAttribute("aria-activedescendant",i.id):t.removeAttribute("aria-activedescendant")}_openedChanged(e,t){if(t===void 0)return;e?!this._isInputFocused()&&!L&&this.inputElement&&this.inputElement.focus():this._onClosed();const i=this._nativeInput;i&&(i.setAttribute("aria-expanded",!!e),e?i.setAttribute("aria-controls",this._scroller.id):i.removeAttribute("aria-controls"))}_onOverlayTouchAction(){this._closeOnBlurIsPrevented=!0,this.inputElement.blur(),this._closeOnBlurIsPrevented=!1}_isClearButton(e){return e.composedPath()[0]===this.clearElement}__onClearButtonMouseDown(e){e.preventDefault(),this.inputElement.focus()}_onClearButtonClick(e){e.preventDefault(),this._onClearAction(),this.opened&&this.requestContentUpdate()}_onToggleButtonClick(e){e.preventDefault(),this.opened?this.close():this.open()}_onHostClick(e){this.autoOpenDisabled||(e.preventDefault(),this.open())}_onClick(e){this._isClearButton(e)?this._onClearButtonClick(e):e.composedPath().includes(this._toggleElement)?this._onToggleButtonClick(e):this._onHostClick(e)}_onKeyDown(e){super._onKeyDown(e),e.key==="ArrowDown"?(this._onArrowDown(),e.preventDefault()):e.key==="ArrowUp"&&(this._onArrowUp(),e.preventDefault())}_getItemLabel(e){let t=e&&this.itemLabelPath?S(this.itemLabelPath,e):void 0;return t==null&&(t=e?e.toString():""),t}_getItemValue(e){let t=e&&this.itemValuePath?S(this.itemValuePath,e):void 0;return t===void 0&&(t=e?e.toString():""),t}_onArrowDown(){if(this.opened){const e=this._dropdownItems;e&&(this._focusedIndex=Math.min(e.length-1,this._focusedIndex+1),this._prefillFocusedItemLabel())}else this.open()}_onArrowUp(){if(this.opened){if(this._focusedIndex>-1)this._focusedIndex=Math.max(0,this._focusedIndex-1);else{const e=this._dropdownItems;e&&(this._focusedIndex=e.length-1)}this._prefillFocusedItemLabel()}else this.open()}_prefillFocusedItemLabel(){if(this._focusedIndex>-1){const e=this._dropdownItems[this._focusedIndex];this._inputElementValue=this._getItemLabel(e),this._markAllSelectionRange()}}_setSelectionRange(e,t){this._isInputFocused()&&this.inputElement.setSelectionRange&&this.inputElement.setSelectionRange(e,t)}_markAllSelectionRange(){this._inputElementValue!==void 0&&this._setSelectionRange(0,this._inputElementValue.length)}_clearSelectionRange(){if(this._inputElementValue!==void 0){const e=this._inputElementValue?this._inputElementValue.length:0;this._setSelectionRange(e,e)}}_closeOrCommit(){!this.opened&&!this.loading?this._commitValue():this.close()}_onEnter(e){if(!this._hasValidInputValue()){e.preventDefault(),e.stopPropagation();return}this.opened&&(e.preventDefault(),e.stopPropagation()),this._closeOrCommit()}_hasValidInputValue(){const e=this._focusedIndex<0&&this._inputElementValue!==""&&this._getItemLabel(this.selectedItem)!==this._inputElementValue;return this.allowCustomValue||!e}_onEscape(e){this.autoOpenDisabled&&(this.opened||this.value!==this._inputElementValue&&this._inputElementValue.length>0)?(e.stopPropagation(),this._focusedIndex=-1,this.cancel()):this.opened?(e.stopPropagation(),this._focusedIndex>-1?(this._focusedIndex=-1,this._revertInputValue()):this.cancel()):this.clearButtonVisible&&this.value&&!this.readonly&&(e.stopPropagation(),this._onClearAction())}_toggleElementChanged(e){e&&(e.addEventListener("mousedown",t=>t.preventDefault()),e.addEventListener("click",()=>{L&&!this._isInputFocused()&&document.activeElement.blur()}))}_onClearAction(){this.selectedItem=null,this.allowCustomValue&&(this.value=""),this._detectAndDispatchChange()}_clearFilter(){this.filter=""}cancel(){this._revertInputValueToValue(),this._lastCommittedValue=this.value,this._closeOrCommit()}_onOpened(){this._lastCommittedValue=this.value}_onClosed(){(!this.loading||this.allowCustomValue)&&this._commitValue()}_commitValue(){if(this._focusedIndex>-1){const e=this._dropdownItems[this._focusedIndex];this.selectedItem!==e&&(this.selectedItem=e),this._inputElementValue=this._getItemLabel(this.selectedItem),this._focusedIndex=-1}else if(this._inputElementValue===""||this._inputElementValue===void 0)this.selectedItem=null,this.allowCustomValue&&(this.value="");else{const e=[this.selectedItem,...this._dropdownItems||[]],t=e[this.__getItemIndexByLabel(e,this._inputElementValue)];if(this.allowCustomValue&&!t){const i=this._inputElementValue;this._lastCustomValue=i;const o=new CustomEvent("custom-value-set",{detail:i,composed:!0,cancelable:!0,bubbles:!0});this.dispatchEvent(o),o.defaultPrevented||(this.value=i)}else!this.allowCustomValue&&!this.opened&&t?this.value=this._getItemValue(t):this._revertInputValueToValue()}this._detectAndDispatchChange(),this._clearSelectionRange(),this._clearFilter()}_onInput(e){const t=this._inputElementValue,i={};this.filter===t?this._filterChanged(this.filter):i.filter=t,!this.opened&&!this._isClearButton(e)&&!this.autoOpenDisabled&&(i.opened=!0),this.setProperties(i)}_onChange(e){e.stopPropagation()}_itemLabelPathChanged(e){typeof e!="string"&&console.error("You should set itemLabelPath to a valid string")}_filterChanged(e){this._scrollIntoView(0),this._focusedIndex=-1,this.items?this.filteredItems=this._filterItems(this.items,e):this._filteredItemsChanged(this.filteredItems)}_revertInputValue(){this.filter!==""?this._inputElementValue=this.filter:this._revertInputValueToValue(),this._clearSelectionRange()}_revertInputValueToValue(){this.allowCustomValue&&!this.selectedItem?this._inputElementValue=this.value:this._inputElementValue=this._getItemLabel(this.selectedItem)}_selectedItemChanged(e){if(e==null)this.filteredItems&&(this.allowCustomValue||(this.value=""),this._toggleHasValue(this._hasValue),this._inputElementValue=this.value);else{const t=this._getItemValue(e);if(this.value!==t&&(this.value=t,this.value!==t))return;this._toggleHasValue(!0),this._inputElementValue=this._getItemLabel(e)}}_valueChanged(e,t){e===""&&t===void 0||($(e)?(this._getItemValue(this.selectedItem)!==e&&this._selectItemForValue(e),!this.selectedItem&&this.allowCustomValue&&(this._inputElementValue=e),this._toggleHasValue(this._hasValue)):this.selectedItem=null,this._clearFilter(),this._lastCommittedValue=void 0)}_detectAndDispatchChange(){document.hasFocus()&&this._requestValidation(),this.value!==this._lastCommittedValue&&(this.dispatchEvent(new CustomEvent("change",{bubbles:!0})),this._lastCommittedValue=this.value)}_itemsChanged(e,t){this._ensureItemsOrDataProvider(()=>{this.items=t}),e?this.filteredItems=e.slice(0):t&&(this.filteredItems=null)}_filteredItemsChanged(e){this._setDropdownItems(e)}_filterItems(e,t){return e&&e.filter(o=>(t=t?t.toString().toLowerCase():"",this._getItemLabel(o).toString().toLowerCase().indexOf(t)>-1))}_selectItemForValue(e){const t=this.__getItemIndexByValue(this.filteredItems,e),i=this.selectedItem;t>=0?this.selectedItem=this.filteredItems[t]:this.dataProvider&&this.selectedItem===void 0?this.selectedItem=void 0:this.selectedItem=null,this.selectedItem===null&&i===null&&this._selectedItemChanged(this.selectedItem)}_setDropdownItems(e){const t=this._dropdownItems;this._dropdownItems=e;const i=t?t[this._focusedIndex]:null,o=this.__getItemIndexByValue(e,this.value);(this.selectedItem===null||this.selectedItem===void 0)&&o>=0&&(this.selectedItem=e[o]);const l=this.__getItemIndexByValue(e,this._getItemValue(i));l>-1?this._focusedIndex=l:this._focusedIndex=this.__getItemIndexByLabel(e,this.filter)}_getItemElements(){return Array.from(this._scroller.querySelectorAll(`${this._tagNamePrefix}-item`))}_scrollIntoView(e){this._scroller&&this._scroller.scrollIntoView(e)}__getItemIndexByValue(e,t){return!e||!$(t)?-1:M(e,i=>this._getItemValue(i)===t)}__getItemIndexByLabel(e,t){return!e||!t?-1:M(e,i=>this._getItemLabel(i).toString().toLowerCase()===t.toString().toLowerCase())}_overlaySelectedItemChanged(e){e.stopPropagation(),!(e.detail.item instanceof y)&&this.opened&&(this._focusedIndex=this.filteredItems.indexOf(e.detail.item),this.close())}_setFocused(e){if(super._setFocused(e),!e&&!this.readonly&&!this._closeOnBlurIsPrevented){if(!this.opened&&this.allowCustomValue&&this._inputElementValue===this._lastCustomValue){delete this._lastCustomValue;return}if(ue()){this._closeOrCommit();return}this.opened?this._overlayOpened||this.close():this._commitValue()}}_shouldRemoveFocus(e){return e.relatedTarget&&e.relatedTarget.localName===`${this._tagNamePrefix}-item`?!1:e.relatedTarget===this._overlayElement?(e.composedPath()[0].focus(),!1):!0}_onTouchend(e){!this.clearElement||e.composedPath()[0]!==this.clearElement||(e.preventDefault(),this._onClearAction())}};/**
 * @license
 * Copyright (c) 2015 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */_("vaadin-combo-box",T,{moduleId:"vaadin-combo-box-styles"});class Ae extends Z(ee(Ee(z(C(A(b)))))){static get is(){return"vaadin-combo-box"}static get template(){return g`
      <style>
        :host([opened]) {
          pointer-events: auto;
        }
      </style>

      <div class="vaadin-combo-box-container">
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
          <div id="toggleButton" part="toggle-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>

      <vaadin-combo-box-overlay
        id="overlay"
        opened="[[_overlayOpened]]"
        loading$="[[loading]]"
        theme$="[[_theme]]"
        position-target="[[_positionTarget]]"
        no-vertical-overlap
      ></vaadin-combo-box-overlay>
    `}static get properties(){return{_positionTarget:{type:Object}}}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new F(this,n=>{this._setInputElement(n),this._setFocusElement(n),this.stateTarget=n,this.ariaTarget=n})),this.addController(new k(this.inputElement,this._labelController)),this._tooltipController=new O(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(n=>!n.opened),this._positionTarget=this.shadowRoot.querySelector('[part="input-field"]'),this._toggleElement=this.$.toggleButton}_onClearButtonClick(n){n.stopPropagation(),super._onClearButtonClick(n)}_onHostClick(n){const e=n.composedPath();(e.includes(this._labelNode)||e.includes(this._positionTarget))&&super._onHostClick(n)}}v(Ae);window.Vaadin.Flow.comboBoxConnector={};window.Vaadin.Flow.comboBoxConnector.initLazy=s=>{if(s.$connector)return;s.$connector={};const n={};let e={},t="";const i=new window.Vaadin.ComboBoxPlaceholder,o=(()=>{let r="",a=!1;return{needsDataCommunicatorReset:()=>a=!0,getLastFilterSentToServer:()=>r,requestData:(p,I,x)=>{const V=I-p,D=x.filter;s.$server.setViewportRange(p,V,D),r=D,a&&(s.$server.resetDataCommunicator(),a=!1)}}})(),l=(r=Object.keys(n))=>{r.forEach(a=>{n[a]([],s.size),delete n[a];const d=parseInt(a)*s.pageSize,h=d+s.pageSize,c=Math.min(h,s.filteredItems.length);for(let p=d;p<c;p++)s.filteredItems[p]=i})};s.dataProvider=function(r,a){if(r.pageSize!=s.pageSize)throw"Invalid pageSize";if(s._clientSideFilter)if(e[0]){f(e[0],r.filter,a);return}else r.filter="";if(r.filter!==t){e={},t=r.filter,this._filterDebouncer=he.debounce(this._filterDebouncer,ce.after(500),()=>{if(o.getLastFilterSentToServer()===r.filter&&o.needsDataCommunicatorReset(),r.filter!==t)throw new Error("Expected params.filter to be '"+t+"' but was '"+r.filter+"'");this._filterDebouncer=void 0,l(),s.dataProvider(r,a)});return}if(this._filterDebouncer){n[r.page]=a;return}if(e[r.page])u(r.page,a);else{n[r.page]=a;const h=Math.max(r.pageSize*2,500),c=Object.keys(n).map(x=>parseInt(x)),p=Math.min(...c),I=Math.max(...c);if(c.length*r.pageSize>h)r.page===p?l([String(I)]):l([String(p)]),s.dataProvider(r,a);else if(I-p+1!==c.length)l();else{const x=r.pageSize*p,V=r.pageSize*(I+1);o.requestData(x,V,r)}}},s.$connector.clear=(r,a)=>{const d=Math.floor(r/s.pageSize),h=Math.ceil(a/s.pageSize);for(let c=d;c<d+h;c++)delete e[c]},s.$connector.filter=(r,a)=>(a=a?a.toString().toLowerCase():"",s._getItemLabel(r,s.itemLabelPath).toString().toLowerCase().indexOf(a)>-1),s.$connector.set=(r,a,d)=>{if(d!=o.getLastFilterSentToServer())return;if(r%s.pageSize!=0)throw"Got new data to index "+r+" which is not aligned with the page size of "+s.pageSize;if(r===0&&a.length===0&&n[0]){e[0]=[];return}const h=r/s.pageSize,c=Math.ceil(a.length/s.pageSize);for(let p=0;p<c;p++){let I=h+p,x=a.slice(p*s.pageSize,(p+1)*s.pageSize);e[I]=x}},s.$connector.updateData=r=>{const a=new Map(r.map(d=>[d.key,d]));s.filteredItems=s.filteredItems.map(d=>a.get(d.key)||d)},s.$connector.updateSize=function(r){s._clientSideFilter||(s.size=r)},s.$connector.reset=function(){l(),e={},s.clearCache()},s.$connector.confirm=function(r,a){if(a!=o.getLastFilterSentToServer())return;let d=Object.getOwnPropertyNames(n);for(let h=0;h<d.length;h++){let c=d[h];e[c]&&u(c,n[c])}s.$server.confirmUpdate(r)};const u=function(r,a){let d=e[r];s._clientSideFilter?f(d,s.filter,a):(delete e[r],a(d,s.size))},f=function(r,a,d){let h=r;a&&(h=r.filter(c=>s.$connector.filter(c,a))),d(h,h.length)};s.addEventListener("custom-value-set",r=>r.preventDefault()),s.itemClassNameGenerator=function(r){return r.className||""}};window.Vaadin.ComboBoxPlaceholder=y;/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Oe=m`
  :host {
    font-size: var(--lumo-font-size-xxs);
    line-height: 1;
    color: var(--lumo-body-text-color);
    border-radius: var(--lumo-border-radius-s);
    background-color: var(--lumo-contrast-20pct);
    cursor: var(--lumo-clickable-cursor);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  :host([disabled]) {
    background-color: var(--lumo-contrast-10pct);
  }

  :host([focused]) [part='remove-button'] {
    color: inherit;
  }

  :host([slot='overflow']) {
    position: relative;
    min-width: var(--lumo-size-xxs);
    margin-inline-start: var(--lumo-space-s);
  }

  :host([slot='overflow'])::before,
  :host([slot='overflow'])::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 100%;
    border-left: calc(var(--lumo-space-s) / 4) solid;
    border-radius: var(--lumo-border-radius-s);
    border-color: var(--lumo-contrast-30pct);
  }

  :host([slot='overflow'])::before {
    left: calc(-1 * var(--lumo-space-s) / 2);
  }

  :host([slot='overflow'])::after {
    left: calc(-1 * var(--lumo-space-s));
  }

  :host([count='2']) {
    margin-inline-start: calc(var(--lumo-space-s) / 2);
  }

  :host([count='2'])::after {
    display: none;
  }

  :host([count='1']) {
    margin-inline-start: 0;
  }

  :host([count='1'])::before,
  :host([count='1'])::after {
    display: none;
  }

  [part='label'] {
    font-weight: 500;
    line-height: 1.25;
  }

  [part='remove-button'] {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: -0.3125em;
    margin-bottom: -0.3125em;
    margin-inline-start: auto;
    width: 1.25em;
    height: 1.25em;
    font-size: 1.5em;
    transition: none;
  }

  [part='remove-button']::before {
    content: var(--lumo-icons-cross);
  }

  :host([disabled]) [part='label'] {
    color: var(--lumo-disabled-text-color);
    -webkit-text-fill-color: var(--lumo-disabled-text-color);
    pointer-events: none;
  }
`;_("vaadin-multi-select-combo-box-chip",[pe,Oe],{moduleId:"lumo-multi-select-combo-box-chip"});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Be=m`
  @media (any-hover: hover) {
    :host(:hover[readonly]) {
      background-color: transparent;
      cursor: default;
    }
  }
`;_("vaadin-multi-select-combo-box-item",[W,U,Be],{moduleId:"lumo-multi-select-combo-box-item"});_("vaadin-multi-select-combo-box-overlay",[N,G,K,H,Y,m`
      :host {
        --_vaadin-multi-select-combo-box-items-container-border-width: var(--lumo-space-xs);
        --_vaadin-multi-select-combo-box-items-container-border-style: solid;
      }
    `],{moduleId:"lumo-multi-select-combo-box-overlay"});_("vaadin-multi-select-combo-box-container",m`
    :host([auto-expand-vertically]) {
      padding-block: var(--lumo-space-xs);
    }
  `,{moduleId:"lumo-multi-select-combo-box-container"});const Te=m`
  :host([has-value]) {
    padding-inline-start: 0;
  }

  :host([has-value]) ::slotted(input:placeholder-shown) {
    caret-color: var(--lumo-body-text-color) !important;
  }

  [part='label'] {
    flex-shrink: 0;
  }

  /* Override input-container styles */
  [part='input-field'] ::slotted([slot='chip']),
  [part='input-field'] ::slotted([slot='overflow']) {
    min-height: auto;
    padding: 0.3125em calc(0.5em + var(--lumo-border-radius-s) / 4);
    color: var(--lumo-body-text-color);
    -webkit-mask-image: none;
    mask-image: none;
  }

  :host([auto-expand-vertically]) ::slotted([slot='chip']) {
    margin-block: calc(var(--lumo-space-xs) / 2);
  }

  ::slotted([slot='chip']:not([readonly]):not([disabled])) {
    padding-inline-end: 0;
  }

  :host([auto-expand-vertically]) ::slotted([slot='input']) {
    min-height: calc(var(--lumo-text-field-size, var(--lumo-size-m)) - 2 * var(--lumo-space-xs));
  }

  ::slotted([slot='chip']:not(:last-of-type)),
  ::slotted([slot='overflow']:not(:last-of-type)) {
    margin-inline-end: var(--lumo-space-xs);
  }

  ::slotted([slot='chip'][focused]) {
    background-color: var(--vaadin-selection-color, var(--lumo-primary-color));
    color: var(--lumo-primary-contrast-color);
  }

  [part='toggle-button']::before {
    content: var(--lumo-icons-dropdown);
  }

  :host([readonly][has-value]) [part='toggle-button'] {
    color: var(--lumo-contrast-60pct);
    cursor: var(--lumo-clickable-cursor);
  }
`;_("vaadin-multi-select-combo-box",[B,Te],{moduleId:"lumo-multi-select-combo-box"});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const ze=m`
  :host {
    max-width: 100%;
    --input-min-width: var(--vaadin-multi-select-combo-box-input-min-width, 4em);
    --_chip-min-width: var(--vaadin-multi-select-combo-box-chip-min-width, 50px);
  }

  #chips {
    display: flex;
    align-items: center;
  }

  ::slotted(input) {
    box-sizing: border-box;
    flex: 1 0 var(--input-min-width);
  }

  ::slotted([slot='chip']),
  ::slotted([slot='overflow']) {
    flex: 0 1 auto;
  }

  ::slotted([slot='chip']) {
    overflow: hidden;
  }

  :host(:is([readonly], [disabled])) ::slotted(input) {
    flex-grow: 0;
    flex-basis: 0;
    padding: 0;
  }

  :host([auto-expand-vertically]) #chips {
    display: contents;
  }

  :host([auto-expand-horizontally]) [class$='container'] {
    width: auto;
  }
`,Fe=m`
  :host {
    display: inline-flex;
    align-items: center;
    align-self: center;
    white-space: nowrap;
    box-sizing: border-box;
  }

  [part='label'] {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([hidden]),
  :host(:is([readonly], [disabled], [slot='overflow'])) [part='remove-button'] {
    display: none !important;
  }

  @media (forced-colors: active) {
    :host {
      outline: 1px solid;
      outline-offset: -1px;
    }
  }
`;/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */_("vaadin-multi-select-combo-box-chip",Fe,{moduleId:"vaadin-multi-select-combo-box-chip"});class ke extends C(b){static get is(){return"vaadin-multi-select-combo-box-chip"}static get properties(){return{disabled:{type:Boolean,reflectToAttribute:!0},readonly:{type:Boolean,reflectToAttribute:!0},label:{type:String},item:{type:Object}}}static get template(){return g`
      <div part="label">[[label]]</div>
      <div part="remove-button" on-click="_onRemoveClick"></div>
    `}_onRemoveClick(n){n.stopPropagation(),this.dispatchEvent(new CustomEvent("item-removed",{detail:{item:this.item},bubbles:!0,composed:!0}))}}v(ke);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */_("vaadin-multi-select-combo-box-container",m`
    #wrapper {
      display: flex;
      width: 100%;
      min-width: 0;
    }

    :host([auto-expand-vertically]) #wrapper {
      flex-wrap: wrap;
    }
  `,{moduleId:"vaadin-multi-select-combo-box-container-styles"});let w;class De extends Ie{static get is(){return"vaadin-multi-select-combo-box-container"}static get template(){if(!w){w=super.template.cloneNode(!0);const n=w.content,e=n.querySelectorAll("slot"),t=document.createElement("div");t.setAttribute("id","wrapper"),n.insertBefore(t,e[2]),t.appendChild(e[0]),t.appendChild(e[1])}return w}static get properties(){return{autoExpandVertically:{type:Boolean,reflectToAttribute:!0}}}}v(De);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Le extends J(C(P(b))){static get is(){return"vaadin-multi-select-combo-box-item"}static get template(){return g`
      <style>
        :host {
          display: block;
        }

        :host([hidden]) {
          display: none !important;
        }
      </style>
      <span part="checkmark" aria-hidden="true"></span>
      <div part="content">
        <slot></slot>
      </div>
    `}}v(Le);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const $e=m`
  #overlay {
    width: var(
      --vaadin-multi-select-combo-box-overlay-width,
      var(--_vaadin-multi-select-combo-box-overlay-default-width, auto)
    );
  }

  [part='content'] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;_("vaadin-multi-select-combo-box-overlay",[q,$e],{moduleId:"vaadin-multi-select-combo-box-overlay-styles"});class Me extends Q(R(P(C(b)))){static get is(){return"vaadin-multi-select-combo-box-overlay"}static get template(){return g`
      <div id="backdrop" part="backdrop" hidden></div>
      <div part="overlay" id="overlay">
        <div part="loader"></div>
        <div part="content" id="content"><slot></slot></div>
      </div>
    `}}v(Me);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Ne extends X(b){static get is(){return"vaadin-multi-select-combo-box-scroller"}static get template(){return g`
      <style>
        :host {
          display: block;
          min-height: 1px;
          overflow: auto;

          /* Fixes item background from getting on top of scrollbars on Safari */
          transform: translate3d(0, 0, 0);

          /* Enable momentum scrolling on iOS */
          -webkit-overflow-scrolling: touch;

          /* Fixes scrollbar disappearing when 'Show scroll bars: Always' enabled in Safari */
          box-shadow: 0 0 0 white;
        }

        #selector {
          border-width: var(--_vaadin-multi-select-combo-box-items-container-border-width);
          border-style: var(--_vaadin-multi-select-combo-box-items-container-border-style);
          border-color: var(--_vaadin-multi-select-combo-box-items-container-border-color, transparent);
          position: relative;
        }
      </style>
      <div id="selector">
        <slot></slot>
      </div>
    `}ready(){super.ready(),this.setAttribute("aria-multiselectable","true")}_isItemSelected(n,e,t){return n instanceof y||this.owner.readonly?!1:this.owner._findIndex(n,this.owner.selectedItems,t)>-1}_updateElement(n,e){super._updateElement(n,e),n.toggleAttribute("readonly",this.owner.readonly)}}v(Ne);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const qe=s=>class extends Z(ee(s)){static get properties(){return{filteredItems:{type:Array,notify:!0,sync:!0},keepFilter:{type:Boolean,value:!1},loading:{type:Boolean,notify:!0,sync:!0},size:{type:Number,notify:!0,observer:"_sizeChanged",sync:!0},selectedItems:{type:Array,value:()=>[]},selectedItemsOnTop:{type:Boolean,value:!1,sync:!0},lastFilter:{type:String,notify:!0,sync:!0},topGroup:{type:Array,observer:"_topGroupChanged",sync:!0},_target:{type:Object}}}static get observers(){return["_readonlyChanged(readonly)"]}get clearElement(){return this.querySelector('[part="clear-button"]')}get _tagNamePrefix(){return"vaadin-multi-select-combo-box"}constructor(){super(),this.addEventListener("custom-value-set",this.__onCustomValueSet.bind(this))}open(){!this.disabled&&!(this.readonly&&this.selectedItems.length===0)&&(this.opened=!0)}ready(){super.ready(),this._target=this,this._toggleElement=this.querySelector(".toggle-button")}_updateOverlayWidth(){this.$.overlay._updateOverlayWidth()}_readonlyChanged(){this._setDropdownItems(this.filteredItems)}_setDropdownItems(e){if(this.readonly){super._setDropdownItems(this.selectedItems);return}if(this.filter||!this.selectedItemsOnTop){super._setDropdownItems(e);return}if(e&&e.length&&this.topGroup&&this.topGroup.length){const t=e.filter(i=>this._comboBox._findIndex(i,this.topGroup,this.itemIdPath)===-1);super._setDropdownItems(this.topGroup.concat(t));return}super._setDropdownItems(e)}_topGroupChanged(e){e&&this._setDropdownItems(this.filteredItems)}_initScroller(){const e=this.getRootNode().host;this._comboBox=e,super._initScroller(e)}_onEnter(e){if(this.opened){if(e.preventDefault(),e.stopPropagation(),this.readonly)this.close();else if(this._hasValidInputValue()){const t=this._dropdownItems[this._focusedIndex];this._commitValue(),this._focusedIndex=this._dropdownItems.indexOf(t)}return}super._onEnter(e)}_onEscape(e){if(this.readonly){e.stopPropagation(),this.opened&&this.close();return}super._onEscape(e)}_clearFilter(){(!this.keepFilter||!this.opened)&&super._clearFilter()}_revertInputValueToValue(){super._revertInputValueToValue(),this.filter=""}_commitValue(){this.lastFilter=this.filter,super._commitValue()}_onArrowDown(){this.readonly?this.opened||this.open():super._onArrowDown()}_onArrowUp(){this.readonly?this.opened||this.open():super._onArrowUp()}_setFocused(e){e||(this._ignoreCommitValue=!0),super._setFocused(e),!e&&this.readonly&&!this._closeOnBlurIsPrevented&&this.close()}_onClosed(){this._ignoreCommitValue=!0,super._onClosed()}_detectAndDispatchChange(){if(this._ignoreCommitValue){this._ignoreCommitValue=!1,this.clear(),this._inputElementValue="";return}super._detectAndDispatchChange()}_overlaySelectedItemChanged(e){e.stopPropagation(),!this.readonly&&(e.detail.item instanceof y||this.opened&&(this.lastFilter=this.filter,this.dispatchEvent(new CustomEvent("combo-box-item-selected",{detail:{item:e.detail.item}}))))}_shouldFetchData(){return this.readonly?!1:super._shouldFetchData()}clearCache(){this.readonly||super.clearCache()}__onCustomValueSet(e){this._ignoreCommitValue&&e.stopImmediatePropagation()}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */class Re extends qe(C(b)){static get is(){return"vaadin-multi-select-combo-box-internal"}static get template(){return g`
      <style>
        :host([opened]) {
          pointer-events: auto;
        }
      </style>

      <slot></slot>

      <vaadin-multi-select-combo-box-overlay
        id="overlay"
        opened="[[_overlayOpened]]"
        loading$="[[loading]]"
        theme$="[[_theme]]"
        position-target="[[_target]]"
        no-vertical-overlap
        restore-focus-node="[[inputElement]]"
      ></vaadin-multi-select-combo-box-overlay>
    `}}v(Re);/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const We=s=>class extends z(me(s)){static get properties(){return{autoExpandHorizontally:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_autoExpandHorizontallyChanged",sync:!0},autoExpandVertically:{type:Boolean,value:!1,reflectToAttribute:!0,observer:"_autoExpandVerticallyChanged",sync:!0},autoOpenDisabled:{type:Boolean,sync:!0},clearButtonVisible:{type:Boolean,reflectToAttribute:!0,observer:"_clearButtonVisibleChanged",value:!1,sync:!0},items:{type:Array,sync:!0},itemClassNameGenerator:{type:Object,observer:"__itemClassNameGeneratorChanged",sync:!0},itemLabelPath:{type:String,value:"label",sync:!0},itemValuePath:{type:String,value:"value",sync:!0},itemIdPath:{type:String,sync:!0},i18n:{type:Object,value:()=>({cleared:"Selection cleared",focused:"focused. Press Backspace to remove",selected:"added to selection",deselected:"removed from selection",total:"{count} items selected"})},keepFilter:{type:Boolean,value:!1},loading:{type:Boolean,value:!1,reflectToAttribute:!0,sync:!0},overlayClass:{type:String,sync:!0},readonly:{type:Boolean,value:!1,observer:"_readonlyChanged",reflectToAttribute:!0,sync:!0},selectedItems:{type:Array,value:()=>[],notify:!0,sync:!0},opened:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0,sync:!0},size:{type:Number,sync:!0},pageSize:{type:Number,value:50,observer:"_pageSizeChanged",sync:!0},dataProvider:{type:Object,sync:!0},allowCustomValue:{type:Boolean,value:!1},placeholder:{type:String,observer:"_placeholderChanged",sync:!0},renderer:{type:Function,sync:!0},filter:{type:String,value:"",notify:!0,sync:!0},filteredItems:{type:Array,sync:!0},selectedItemsOnTop:{type:Boolean,value:!1,sync:!0},value:{type:String},_overflowItems:{type:Array,value:()=>[],sync:!0},_focusedChipIndex:{type:Number,value:-1,observer:"_focusedChipIndexChanged"},_lastFilter:{type:String,sync:!0},_topGroup:{type:Array}}}static get observers(){return["_selectedItemsChanged(selectedItems)","__updateOverflowChip(_overflow, _overflowItems, disabled, readonly)","__updateTopGroup(selectedItemsOnTop, selectedItems, opened)"]}get slotStyles(){const e=this.localName;return[...super.slotStyles,`
        ${e}[has-value] input::placeholder {
          color: transparent !important;
          forced-color-adjust: none;
        }
      `]}get clearElement(){return this.$.clearButton}get _chips(){return[...this.querySelectorAll('[slot="chip"]')]}get _hasValue(){return this.selectedItems&&this.selectedItems.length>0}ready(){super.ready(),this.addController(new F(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new k(this.inputElement,this._labelController)),this._tooltipController=new O(this),this.addController(this._tooltipController),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this._tooltipController.setShouldShow(e=>!e.opened),this._inputField=this.shadowRoot.querySelector('[part="input-field"]'),this._overflowController=new _e(this,"overflow","vaadin-multi-select-combo-box-chip",{initializer:e=>{e.addEventListener("mousedown",t=>this._preventBlur(t)),this._overflow=e}}),this.addController(this._overflowController),this.__updateChips(),j(this)}checkValidity(){return this.required&&!this.readonly?this._hasValue:!0}clear(){this.__updateSelection([]),E(this.i18n.cleared)}clearCache(){this.$&&this.$.comboBox&&this.$.comboBox.clearCache()}requestContentUpdate(){this.$&&this.$.comboBox&&this.$.comboBox.requestContentUpdate()}_disabledChanged(e,t){super._disabledChanged(e,t),(e||t)&&this.__updateChips()}_inputElementChanged(e){super._inputElementChanged(e),e&&this.$.comboBox._setInputElement(e)}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&(this._focusedChipIndex=-1,this._requestValidation())}_onResize(){this.__updateChips()}_delegateAttribute(e,t){if(this.stateTarget){if(e==="required"){this._delegateAttribute("aria-required",t?"true":!1);return}super._delegateAttribute(e,t)}}_autoExpandHorizontallyChanged(e,t){(e||t)&&this.__updateChips()}_autoExpandVerticallyChanged(e,t){(e||t)&&this.__updateChips()}_clearButtonVisibleChanged(e,t){(e||t)&&this.__updateChips()}_onFilteredItemsChanged(e){const{value:t}=e.detail;(Array.isArray(t)||t==null)&&(this.filteredItems=t)}_readonlyChanged(e,t){(e||t)&&this.__updateChips(),this.dataProvider&&this.clearCache()}__itemClassNameGeneratorChanged(e,t){(e||t)&&this.__updateChips()}_pageSizeChanged(e,t){(Math.floor(e)!==e||e<=0)&&(this.pageSize=t,console.error('"pageSize" value must be an integer > 0')),this.$.comboBox.pageSize=this.pageSize}_placeholderChanged(e){const t=this.__tmpA11yPlaceholder;t!==e&&(this.__savedPlaceholder=e,t&&(this.placeholder=t))}_selectedItemsChanged(e){if(this._toggleHasValue(this._hasValue),this._hasValue){const t=this._mergeItemLabels(e);this.__tmpA11yPlaceholder===void 0&&(this.__savedPlaceholder=this.placeholder),this.__tmpA11yPlaceholder=t,this.placeholder=t}else this.__tmpA11yPlaceholder!==void 0&&(delete this.__tmpA11yPlaceholder,this.placeholder=this.__savedPlaceholder);this.__updateChips(),this.requestContentUpdate(),this.opened&&this.$.comboBox._updateOverlayWidth()}_getItemLabel(e){return this.$.comboBox._getItemLabel(e)}_mergeItemLabels(e){return e.map(t=>this._getItemLabel(t)).join(", ")}_findIndex(e,t,i){if(i&&e){for(let o=0;o<t.length;o++)if(t[o]&&t[o][i]===e[i])return o;return-1}return t.indexOf(e)}__clearInternalValue(e=!1){!this.keepFilter||e?(this.filter="",this.$.comboBox.clear()):(this.$.comboBox.clear(),this._inputElementValue=this.filter)}__announceItem(e,t,i){const o=t?"selected":"deselected",l=this.i18n.total.replace("{count}",i||0);E(`${e} ${this.i18n[o]} ${l}`)}__removeItem(e){const t=[...this.selectedItems];t.splice(t.indexOf(e),1),this.__updateSelection(t);const i=this._getItemLabel(e);this.__announceItem(i,!1,t.length)}__selectItem(e){const t=[...this.selectedItems],i=this._findIndex(e,t,this.itemIdPath),o=this._getItemLabel(e);let l=!1;if(i!==-1){const u=this._lastFilter;if(u&&u.toLowerCase()===o.toLowerCase()){this.__clearInternalValue();return}t.splice(i,1)}else t.push(e),l=!0;this.__updateSelection(t),this.__clearInternalValue(),this.__announceItem(o,l,t.length)}__updateSelection(e){this.selectedItems=e,this._requestValidation(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0}))}__updateTopGroup(e,t,i){e?(!i||this.__needToSyncTopGroup())&&(this._topGroup=[...t]):this._topGroup=[]}__needToSyncTopGroup(){return this.itemIdPath?this._topGroup&&this._topGroup.some(e=>{const t=this.selectedItems[this._findIndex(e,this.selectedItems,this.itemIdPath)];return t&&e!==t}):!1}__createChip(e){const t=document.createElement("vaadin-multi-select-combo-box-chip");t.setAttribute("slot","chip"),t.item=e,t.disabled=this.disabled,t.readonly=this.readonly;const i=this._getItemLabel(e);return t.label=i,t.setAttribute("title",i),typeof this.itemClassNameGenerator=="function"&&(t.className=this.itemClassNameGenerator(e)),t.addEventListener("item-removed",o=>this._onItemRemoved(o)),t.addEventListener("mousedown",o=>this._preventBlur(o)),t}__getOverflowWidth(){const e=this._overflow;e.style.visibility="hidden",e.removeAttribute("hidden");const t=e.getAttribute("count");e.setAttribute("count","99");const i=getComputedStyle(e),o=e.clientWidth+parseInt(i.marginInlineStart);return e.setAttribute("count",t),e.setAttribute("hidden",""),e.style.visibility="",o}__updateChips(){if(!this._inputField||!this.inputElement)return;this._chips.forEach(u=>{u.remove()});const e=[...this.selectedItems],t=this._inputField.$.wrapper.clientWidth,i=parseInt(getComputedStyle(this.inputElement).flexBasis);let o=t-i;e.length>1&&(o-=this.__getOverflowWidth());const l=parseInt(getComputedStyle(this).getPropertyValue("--_chip-min-width"));if(this.autoExpandHorizontally){const u=[];for(let a=e.length-1,d=null;a>=0;a--){const h=this.__createChip(e[a]);this.insertBefore(h,d),d=h,u.unshift(h)}const f=[],r=this._inputField.$.wrapper.clientWidth-this.$.chips.clientWidth;if(!this.autoExpandVertically&&r<i){for(;u.length>1;){u.pop().remove(),f.unshift(e.pop());const d=f.length>0?i+this.__getOverflowWidth():i;if(this._inputField.$.wrapper.clientWidth-this.$.chips.clientWidth>=d)break}u.length===1&&(u[0].style.maxWidth=`${Math.max(l,o)}px`)}this._overflowItems=f;return}for(let u=e.length-1,f=null;u>=0;u--){const r=this.__createChip(e[u]);if(this.insertBefore(r,f),!this.autoExpandVertically){if(this.$.chips.clientWidth>o&&(o<l||f!==null)){r.remove();break}r.style.maxWidth=`${o}px`}e.pop(),f=r}this._overflowItems=e}__updateOverflowChip(e,t,i,o){if(e){const l=t.length;e.label=`${l}`,e.setAttribute("count",`${l}`),e.setAttribute("title",this._mergeItemLabels(t)),e.toggleAttribute("hidden",l===0),e.disabled=i,e.readonly=o}}_onClearButtonTouchend(e){e.preventDefault(),e.stopPropagation(),this.clear()}_onClearButtonClick(e){e.stopPropagation(),this.clear()}_onChange(e){e.stopPropagation()}_onEscape(e){this.clearButtonVisible&&this.selectedItems&&this.selectedItems.length&&(e.stopPropagation(),this.selectedItems=[])}_onKeyDown(e){super._onKeyDown(e);const t=this._chips;if(!this.readonly&&t.length>0)switch(e.key){case"Backspace":this._onBackSpace(t);break;case"ArrowLeft":this._onArrowLeft(t,e);break;case"ArrowRight":this._onArrowRight(t,e);break;default:this._focusedChipIndex=-1;break}}_onArrowLeft(e,t){if(this.inputElement.selectionStart!==0)return;const i=this._focusedChipIndex;i!==-1&&t.preventDefault();let o;this.__isRTL?i===e.length-1?o=-1:i>-1&&(o=i+1):i===-1?o=e.length-1:i>0&&(o=i-1),o!==void 0&&(this._focusedChipIndex=o)}_onArrowRight(e,t){if(this.inputElement.selectionStart!==0)return;const i=this._focusedChipIndex;i!==-1&&t.preventDefault();let o;this.__isRTL?i===-1?o=e.length-1:i>0&&(o=i-1):i===e.length-1?o=-1:i>-1&&(o=i+1),o!==void 0&&(this._focusedChipIndex=o)}_onBackSpace(e){if(this.inputElement.selectionStart!==0)return;const t=this._focusedChipIndex;t===-1?this._focusedChipIndex=e.length-1:(this.__removeItem(e[t].item),this._focusedChipIndex=-1)}_focusedChipIndexChanged(e,t){if(e>-1||t>-1){const i=this._chips;if(i.forEach((o,l)=>{o.toggleAttribute("focused",l===e)}),e>-1){const o=i[e].item,l=this._getItemLabel(o);E(`${l} ${this.i18n.focused}`)}}}_onComboBoxChange(){const e=this.$.comboBox.selectedItem;e&&this.__selectItem(e)}_onComboBoxItemSelected(e){this.__selectItem(e.detail.item)}_onCustomValueSet(e){e.preventDefault(),e.stopPropagation(),this.__clearInternalValue(!0),this.dispatchEvent(new CustomEvent("custom-value-set",{detail:e.detail,composed:!0,bubbles:!0}))}_onItemRemoved(e){this.__removeItem(e.detail.item)}_preventBlur(e){e.preventDefault()}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */_("vaadin-multi-select-combo-box",[T,ze],{moduleId:"vaadin-multi-select-combo-box-styles"});class Ge extends We(C(A(b))){static get is(){return"vaadin-multi-select-combo-box"}static get template(){return g`
      <div class="vaadin-multi-select-combo-box-container">
        <div part="label">
          <slot name="label"></slot>
          <span part="required-indicator" aria-hidden="true" on-click="focus"></span>
        </div>

        <vaadin-multi-select-combo-box-internal
          id="comboBox"
          items="[[items]]"
          item-id-path="[[itemIdPath]]"
          item-label-path="[[itemLabelPath]]"
          item-value-path="[[itemValuePath]]"
          disabled="[[disabled]]"
          readonly="[[readonly]]"
          auto-open-disabled="[[autoOpenDisabled]]"
          allow-custom-value="[[allowCustomValue]]"
          overlay-class="[[overlayClass]]"
          data-provider="[[dataProvider]]"
          filter="{{filter}}"
          last-filter="{{_lastFilter}}"
          loading="{{loading}}"
          size="{{size}}"
          filtered-items="[[filteredItems]]"
          selected-items="[[selectedItems]]"
          selected-items-on-top="[[selectedItemsOnTop]]"
          item-class-name-generator="[[itemClassNameGenerator]]"
          top-group="[[_topGroup]]"
          opened="{{opened}}"
          renderer="[[renderer]]"
          keep-filter="[[keepFilter]]"
          theme$="[[_theme]]"
          on-combo-box-item-selected="_onComboBoxItemSelected"
          on-change="_onComboBoxChange"
          on-custom-value-set="_onCustomValueSet"
          on-filtered-items-changed="_onFilteredItemsChanged"
        >
          <vaadin-multi-select-combo-box-container
            part="input-field"
            auto-expand-vertically="[[autoExpandVertically]]"
            readonly="[[readonly]]"
            disabled="[[disabled]]"
            invalid="[[invalid]]"
            theme$="[[_theme]]"
          >
            <slot name="overflow" slot="prefix"></slot>
            <div id="chips" part="chips" slot="prefix">
              <slot name="chip"></slot>
            </div>
            <slot name="input"></slot>
            <div
              id="clearButton"
              part="clear-button"
              slot="suffix"
              on-touchend="_onClearButtonTouchend"
              aria-hidden="true"
            ></div>
            <div id="toggleButton" class="toggle-button" part="toggle-button" slot="suffix" aria-hidden="true"></div>
          </vaadin-multi-select-combo-box-container>
        </vaadin-multi-select-combo-box-internal>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>
    `}}v(Ge);/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */_("vaadin-text-field",B,{moduleId:"lumo-text-field-styles"});/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const je=s=>class extends z(s){static get properties(){return{autocomplete:{type:String},autocorrect:{type:String,reflectToAttribute:!0},autocapitalize:{type:String,reflectToAttribute:!0}}}static get delegateAttrs(){return[...super.delegateAttrs,"autocapitalize","autocomplete","autocorrect"]}get __data(){return this.__dataValue||{}}set __data(e){this.__dataValue=e}_inputElementChanged(e){super._inputElementChanged(e),e&&(e.value&&e.value!==this.value&&(console.warn(`Please define value on the <${this.localName}> component!`),e.value=""),this.value&&(e.value=this.value))}_setFocused(e){super._setFocused(e),!e&&document.hasFocus()&&this._requestValidation()}_onInput(e){super._onInput(e),this.invalid&&this._requestValidation()}_valueChanged(e,t){super._valueChanged(e,t),t!==void 0&&this.invalid&&this._requestValidation()}};/**
 * @license
 * Copyright (c) 2021 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */const Ue=s=>class extends je(s){static get properties(){return{maxlength:{type:Number},minlength:{type:Number},pattern:{type:String}}}static get delegateAttrs(){return[...super.delegateAttrs,"maxlength","minlength","pattern"]}static get constraints(){return[...super.constraints,"maxlength","minlength","pattern"]}constructor(){super(),this._setType("text")}get clearElement(){return this.$.clearButton}ready(){super.ready(),this.addController(new F(this,e=>{this._setInputElement(e),this._setFocusElement(e),this.stateTarget=e,this.ariaTarget=e})),this.addController(new k(this.inputElement,this._labelController))}};/**
 * @license
 * Copyright (c) 2017 - 2025 Vaadin Ltd.
 * This program is available under Apache License Version 2.0, available at https://vaadin.com/license/
 */_("vaadin-text-field",T,{moduleId:"vaadin-text-field-styles"});class He extends Ue(C(A(b))){static get is(){return"vaadin-text-field"}static get template(){return g`
      <div class="vaadin-field-container">
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
          <slot name="suffix" slot="suffix"></slot>
          <div id="clearButton" part="clear-button" slot="suffix" aria-hidden="true"></div>
        </vaadin-input-container>

        <div part="helper-text">
          <slot name="helper"></slot>
        </div>

        <div part="error-message">
          <slot name="error-message"></slot>
        </div>

        <slot name="tooltip"></slot>
      </div>
    `}ready(){super.ready(),this._tooltipController=new O(this),this._tooltipController.setPosition("top"),this._tooltipController.setAriaTarget(this.inputElement),this.addController(this._tooltipController)}}v(He);
