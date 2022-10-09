(()=>{var e={758:function(){var e,t=this&&this.__extends||(e=function(t,n){return e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},e(t,n)},function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function o(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(o.prototype=n.prototype,new o)}),n=function(e){function n(t,n){var o=e.call(this,t,n)||this;return o.onCreacionContextualMenuItem=o.onCreacionContextualMenuItem.bind(o),Autodesk.Viewing.Extension.call(o,t,n),o}return t(n,e),n.prototype.load=function(){this.viewer.registerContextMenuCallback(this.menuId,this.onCreacionContextualMenuItem);var e=new Autodesk.Viewing.UI.ControlGroup("LateralToolbar.ControlGroup");this.createPanelButton(e);var t=new Autodesk.Viewing.UI.ToolBar("toolbar-extension");t.addControl(e);var n=document.createElement("div");return n.setAttribute("style","top: calc(50% + 25px); left: 0%; z-index: 100; position: absolute;"),n.id="divToolbar",this.viewer.container.appendChild(n),document.querySelector("#divToolbar").appendChild(t.container),!0},n.prototype.unload=function(){var e;return null===(e=document.querySelector("#LateralToolbar.ControlGroup"))||void 0===e||e.remove(),!0},Object.defineProperty(n.prototype,"menuId",{get:function(){return"ItemMenuContextual"},enumerable:!1,configurable:!0}),n.prototype.onCreacionContextualMenuItem=function(e,t){var n=this;e.push({title:"Borrar selección de color",target:function(){return n.viewer.clearThemingColors(n.viewer.model)}})},n.prototype.createPanelButton=function(e){var t=this,n=new Autodesk.Viewing.UI.Button("showInformacion");n.onClick=function(){return t.customizeColor(n)},e.addControl(n),n.setToolTip("Elejir un color para esta opción"),n.setIcon("adsk-icon-box")},n.prototype.customizeColor=function(e){var t=this,n=this.viewer.getSelection();if(0!=n.length){this.viewer.clearSelection();var o=document.createElement("input");o.type="color";var r=e.container;r.parentElement.appendChild(o),r.parentElement.classList.add("select"),o.onblur=function(){o.remove(),r.parentElement.classList.remove("select")},o.oninput=function(e){for(var r=new THREE.Color(o.value),i=new THREE.Vector4(r.r,r.g,r.b,1),a=0,u=n;a<u.length;a++){var c=u[a];t.viewer.setThemingColor(c,i)}}}},n}(Autodesk.Viewing.Extension);Autodesk.Viewing.theExtensionManager.registerExtension("CustomColor",n)},721:function(e,t,n){"use strict";var o=this&&this.__awaiter||function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function a(e){try{c(o.next(e))}catch(e){i(e)}}function u(e){try{c(o.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}c((o=o.apply(e,t||[])).next())}))},r=this&&this.__generator||function(e,t){var n,o,r,i,a={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,o&&(r=2&i[0]?o.return:i[0]?o.throw||((r=o.return)&&r.call(o),0):o.next)&&!(r=r.call(o,i[1])).done)return r;switch(o=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,o=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!((r=(r=a.trys).length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){a=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){a.label=i[1];break}if(6===i[0]&&a.label<r[1]){a.label=r[1],r=i;break}if(r&&a.label<r[2]){a.label=r[2],a.ops.push(i);break}r[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(e){i=[6,e],o=0}finally{n=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};function i(e){return o(this,void 0,void 0,(function(){var t,n,o,i,a,u;return r(this,(function(r){switch(r.label){case 0:return r.trys.push([0,5,,6]),[4,fetch("/auth/token")];case 1:return(t=r.sent()).ok?[3,3]:(n=Error.bind,[4,t.text()]);case 2:throw new(n.apply(Error,[void 0,r.sent()]));case 3:return[4,t.json()];case 4:return o=r.sent(),i=o.access_token,a=o.expires_in,e(i,a),[3,6];case 5:return u=r.sent(),alert("Could not obtain access token. See the console for more details."),console.error(u),[3,6];case 6:return[2]}}))}))}Object.defineProperty(t,"__esModule",{value:!0}),t.loadModel=t.initViewer=void 0,n(758),t.initViewer=function(e){return new Promise((function(t,n){Autodesk.Viewing.Initializer({getAccessToken:i},(function(){var n=new Autodesk.Viewing.GuiViewer3D(e,{extensions:["Autodesk.DocumentBrowser","GoogleMapsLocator","CustomColor"]});n.start(),n.setBackgroundColor(255,255,255,255,255,255),n.setTheme("light-theme"),t(n)}))}))},t.loadModel=function(e,t){return new Promise((function(n,o){Autodesk.Viewing.Document.load("urn:"+t,(function(t){n(e.loadDocumentNode(t,t.getRoot().getDefaultGeometry())),e.setBackgroundColor(255,255,255,255,255,255),e.setTheme("light-theme"),e.loadExtension("TransformationExtension")}),(function(e,t,n){alert("Código de error: ".concat(e,", mensaje: ").concat(t)),o({code:e,message:t,errors:n})}))}))}}},t={};!function n(o){var r=t[o];if(void 0!==r)return r.exports;var i=t[o]={exports:{}};return e[o].call(i.exports,i,i.exports,n),i.exports}(721)})();