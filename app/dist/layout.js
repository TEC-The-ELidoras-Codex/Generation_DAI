"use strict";
exports.__esModule = true;
exports.metadata = void 0;
require("./globals.css");
exports.metadata = {
    title: 'Parent Agent',
    description: 'A parent-first learning & safety companion'
};
function RootLayout(_a) {
    var children = _a.children;
    return (React.createElement("html", { lang: "en" },
        React.createElement("body", { className: "min-h-dvh" },
            React.createElement("header", { className: "border-b border-white/10" },
                React.createElement("div", { className: "mx-auto max-w-5xl px-4 py-4 flex items-center justify-between" },
                    React.createElement("h1", { className: "text-lg font-semibold" }, "Parent Agent"),
                    React.createElement("nav", { className: "text-sm space-x-4" },
                        React.createElement("a", { href: "/" }, "Home"),
                        React.createElement("a", { href: "/wiki" }, "Wiki"),
                        React.createElement("a", { href: "/reading/minecraft" }, "Reading"),
                        React.createElement("a", { href: "/math/minecraft" }, "Math"),
                        React.createElement("a", { href: "/agent" }, "Agent")))),
            React.createElement("main", { className: "mx-auto max-w-5xl px-4 py-8" }, children),
            React.createElement("footer", { className: "border-t border-white/10 mt-16" },
                React.createElement("div", { className: "mx-auto max-w-5xl px-4 py-6 text-xs text-white/60" }, "Built with Next.js \u2022 Tailwind \u2022 MDX \u2022 Vitest")))));
}
exports["default"] = RootLayout;
