"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
function AgentConsole() {
    var _a = react_1.useState('Say hello as a caring reading coach.'), prompt = _a[0], setPrompt = _a[1];
    var _b = react_1.useState(''), output = _b[0], setOutput = _b[1];
    var _c = react_1.useState(false), loading = _c[0], setLoading = _c[1];
    function run() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var res, data;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        setLoading(true);
                        setOutput('');
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, , 4, 5]);
                        return [4 /*yield*/, fetch('/api/agent', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ provider: 'openai', prompt: prompt })
                            })];
                    case 2:
                        res = _c.sent();
                        return [4 /*yield*/, res.json()];
                    case 3:
                        data = _c.sent();
                        setOutput((_b = (_a = data.output) !== null && _a !== void 0 ? _a : data.error) !== null && _b !== void 0 ? _b : 'No output');
                        return [3 /*break*/, 5];
                    case 4:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement("section", { className: "space-y-4 max-w-2xl" },
        React.createElement("h2", { className: "text-2xl font-bold" }, "Agent Console"),
        React.createElement("div", { className: "space-y-1" },
            React.createElement("label", { htmlFor: "prompt", className: "text-sm text-white/70" }, "Prompt"),
            React.createElement("textarea", { id: "prompt", placeholder: "Type your instruction or question...", className: "w-full h-40 rounded bg-white/5 border border-white/10 p-2", value: prompt, onChange: function (e) { return setPrompt(e.target.value); } })),
        React.createElement("div", { className: "flex gap-3" },
            React.createElement("button", { onClick: run, disabled: loading, className: "px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50" }, loading ? 'Running…' : 'Run'),
            React.createElement("a", { className: "text-sm", href: "/" }, "Back")),
        output && (React.createElement("pre", { className: "whitespace-pre-wrap rounded bg-black/40 border border-white/10 p-3 text-white/90" }, output))));
}
exports["default"] = AgentConsole;
