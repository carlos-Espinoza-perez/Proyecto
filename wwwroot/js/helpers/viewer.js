/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./Src/typescript/helpers/viewer.ts":
/*!******************************************!*\
  !*** ./Src/typescript/helpers/viewer.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, exports) {

eval("\r\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\nvar __generator = (this && this.__generator) || function (thisArg, body) {\r\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\r\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\r\n    function verb(n) { return function (v) { return step([n, v]); }; }\r\n    function step(op) {\r\n        if (f) throw new TypeError(\"Generator is already executing.\");\r\n        while (_) try {\r\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\r\n            if (y = 0, t) op = [op[0] & 2, t.value];\r\n            switch (op[0]) {\r\n                case 0: case 1: t = op; break;\r\n                case 4: _.label++; return { value: op[1], done: false };\r\n                case 5: _.label++; y = op[1]; op = [0]; continue;\r\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\r\n                default:\r\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\r\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\r\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\r\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\r\n                    if (t[2]) _.ops.pop();\r\n                    _.trys.pop(); continue;\r\n            }\r\n            op = body.call(thisArg, _);\r\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\r\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\r\n    }\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.loadModel = exports.initViewer = void 0;\r\nfunction getAccessToken(callback) {\r\n    return __awaiter(this, void 0, void 0, function () {\r\n        var resp, _a, _b, access_token, expires_in, err_1;\r\n        return __generator(this, function (_c) {\r\n            switch (_c.label) {\r\n                case 0:\r\n                    _c.trys.push([0, 5, , 6]);\r\n                    return [4 /*yield*/, fetch('/auth/token')];\r\n                case 1:\r\n                    resp = _c.sent();\r\n                    if (!!resp.ok) return [3 /*break*/, 3];\r\n                    _a = Error.bind;\r\n                    return [4 /*yield*/, resp.text()];\r\n                case 2: throw new (_a.apply(Error, [void 0, _c.sent()]))();\r\n                case 3: return [4 /*yield*/, resp.json()];\r\n                case 4:\r\n                    _b = _c.sent(), access_token = _b.access_token, expires_in = _b.expires_in;\r\n                    callback(access_token, expires_in);\r\n                    return [3 /*break*/, 6];\r\n                case 5:\r\n                    err_1 = _c.sent();\r\n                    alert('Could not obtain access token. See the console for more details.');\r\n                    console.error(err_1);\r\n                    return [3 /*break*/, 6];\r\n                case 6: return [2 /*return*/];\r\n            }\r\n        });\r\n    });\r\n}\r\nfunction initViewer(container) {\r\n    return new Promise(function (resolve, reject) {\r\n        Autodesk.Viewing.Initializer({ getAccessToken: getAccessToken }, function () {\r\n            var config = {\r\n                extensions: ['Autodesk.DocumentBrowser'],\r\n            };\r\n            var viewer = new Autodesk.Viewing.GuiViewer3D(container, config);\r\n            viewer.start();\r\n            viewer.setBackgroundColor(255, 255, 255, 255, 255, 255);\r\n            viewer.setTheme('light-theme');\r\n            resolve(viewer);\r\n        });\r\n    });\r\n}\r\nexports.initViewer = initViewer;\r\nfunction loadModel(viewer, urn) {\r\n    return new Promise(function (resolve, reject) {\r\n        function onDocumentLoadSuccess(doc) {\r\n            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));\r\n        }\r\n        function onDocumentLoadFailure(code, message, errors) {\r\n            alert(\"C\\u00F3digo de error: \".concat(code, \", mensaje: \").concat(message));\r\n            reject({ code: code, message: message, errors: errors });\r\n        }\r\n        viewer.setLightPreset(0);\r\n        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);\r\n    });\r\n}\r\nexports.loadModel = loadModel;\r\n\n\n//# sourceURL=webpack://proyecto/./Src/typescript/helpers/viewer.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./Src/typescript/helpers/viewer.ts"](0, __webpack_exports__);
/******/ 	
/******/ })()
;