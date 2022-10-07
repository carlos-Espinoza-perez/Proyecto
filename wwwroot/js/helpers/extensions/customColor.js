/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./Src/typescript/helpers/extensions/customColor.ts":
/*!**********************************************************!*\
  !*** ./Src/typescript/helpers/extensions/customColor.ts ***!
  \**********************************************************/
/***/ (function() {

eval("var __extends = (this && this.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\nvar CustomColor = /** @class */ (function (_super) {\r\n    __extends(CustomColor, _super);\r\n    function CustomColor(viewer, options) {\r\n        var _this = _super.call(this, viewer, options) || this;\r\n        _this.onCreacionContextualMenuItem = _this.onCreacionContextualMenuItem.bind(_this);\r\n        Autodesk.Viewing.Extension.call(_this, viewer, options);\r\n        return _this;\r\n    }\r\n    CustomColor.prototype.load = function () {\r\n        this.viewer.registerContextMenuCallback(this.menuId, this.onCreacionContextualMenuItem);\r\n        var ctrlGroup = new Autodesk.Viewing.UI.ControlGroup('LateralToolbar.ControlGroup');\r\n        this.createPanelButton(ctrlGroup);\r\n        var toolbar = new Autodesk.Viewing.UI.ToolBar('toolbar-extension');\r\n        toolbar.addControl(ctrlGroup);\r\n        var element = document.createElement('div');\r\n        element.setAttribute(\"style\", \"top: calc(50% + 25px); left: 0%; z-index: 100; position: absolute;\");\r\n        element.id = \"divToolbar\";\r\n        //Añado el contenedor al viewer\r\n        this.viewer.container.appendChild(element);\r\n        document.querySelector('#divToolbar').appendChild(toolbar.container);\r\n        return true;\r\n    };\r\n    CustomColor.prototype.unload = function () {\r\n        var _a;\r\n        (_a = document.querySelector('#LateralToolbar.ControlGroup')) === null || _a === void 0 ? void 0 : _a.remove();\r\n        return true;\r\n    };\r\n    Object.defineProperty(CustomColor.prototype, \"menuId\", {\r\n        get: function () {\r\n            return 'ItemMenuContextual';\r\n        },\r\n        enumerable: false,\r\n        configurable: true\r\n    });\r\n    CustomColor.prototype.onCreacionContextualMenuItem = function (menu, status) {\r\n        var _this = this;\r\n        menu.push({\r\n            title: \"Borrar selección de color\",\r\n            target: function () { return _this.viewer.clearThemingColors(_this.viewer.model); }\r\n        });\r\n    };\r\n    CustomColor.prototype.createPanelButton = function (ctrl) {\r\n        var _this = this;\r\n        var buttonInspecion = new Autodesk.Viewing.UI.Button('showInformacion');\r\n        buttonInspecion.onClick = function () { return _this.customizeColor(buttonInspecion); };\r\n        ctrl.addControl(buttonInspecion);\r\n        buttonInspecion.setToolTip('Elejir un color para esta opción');\r\n        buttonInspecion.setIcon('adsk-icon-box');\r\n    };\r\n    CustomColor.prototype.customizeColor = function (element) {\r\n        var _this = this;\r\n        var listElementSelect = this.viewer.getSelection();\r\n        if (listElementSelect.length == 0)\r\n            return;\r\n        this.viewer.clearSelection();\r\n        var newContent = document.createElement('input');\r\n        newContent.type = 'color';\r\n        var container = element.container;\r\n        container.parentElement.appendChild(newContent);\r\n        container.parentElement.classList.add(\"select\");\r\n        newContent.onblur = function () {\r\n            newContent.remove();\r\n            container.parentElement.classList.remove('select');\r\n        };\r\n        newContent.oninput = function (e) {\r\n            var color = new THREE.Color(newContent.value);\r\n            var outputColor = new THREE.Vector4(color.r, color.g, color.b, 1);\r\n            for (var _i = 0, listElementSelect_1 = listElementSelect; _i < listElementSelect_1.length; _i++) {\r\n                var item = listElementSelect_1[_i];\r\n                _this.viewer.setThemingColor(item, outputColor);\r\n            }\r\n        };\r\n    };\r\n    return CustomColor;\r\n}(Autodesk.Viewing.Extension));\r\nAutodesk.Viewing.theExtensionManager.registerExtension('CustomColor', CustomColor);\r\nfunction BuscarNombreImagen(callback) {\r\n    console.log(callback);\r\n}\r\nfunction CrearPanel(imageName) {\r\n    console.log(imageName);\r\n}\r\n\n\n//# sourceURL=webpack://proyecto/./Src/typescript/helpers/extensions/customColor.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./Src/typescript/helpers/extensions/customColor.ts"]();
/******/ 	
/******/ })()
;