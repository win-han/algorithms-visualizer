! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.CodeHS = t()
    }
}(function() {
    var define, module, exports;
    return function t(e, i, n) {
        function o(r, a) {
            if (!i[r]) {
                if (!e[r]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(r, !0);
                    if (s) return s(r, !0);
                    var h = new Error("Cannot find module '" + r + "'");
                    throw h.code = "MODULE_NOT_FOUND", h
                }
                var u = i[r] = {
                    exports: {}
                };
                e[r][0].call(u.exports, function(t) {
                    var i = e[r][1][t];
                    return o(i ? i : t)
                }, u, u.exports, t, e, i, n)
            }
            return i[r].exports
        }
        for (var s = "function" == typeof require && require, r = 0; r < n.length; r++) o(n[r]);
        return o
    }({
        1: [function(require, module, exports) {
            "use strict";
            var graphicsModule = require("codehs-graphics"),
                dataStructuresModule = require("codehs-datastructures"),
                consoleModule = require("codehs-console"),
                randomizerModule = graphicsModule.Randomizer,
                keyboardModule = require("codehs-keyboard"),
                CodeHSGraphics = graphicsModule.CodeHSGraphics,
                CodeHSConsole = consoleModule.CodeHSConsole,
                CodeHSDatastructures = dataStructuresModule,
                domready = require("domready"),
                PUBLIC_METHODS = {},
                PUBLIC_CONSTRUCTORS = {};
            PUBLIC_METHODS.__graphics__ = graphicsModule.PUBLIC_METHODS, PUBLIC_METHODS.__console__ = consoleModule.PUBLIC_METHODS, PUBLIC_CONSTRUCTORS.__graphics__ = graphicsModule.PUBLIC_CONSTRUCTORS, PUBLIC_CONSTRUCTORS.__datastructs__ = dataStructuresModule.PUBLIC_CONSTRUCTORS;
            var makeNamespaceWrap = function() {
                    var t, e, i, n = "";
                    for (t in PUBLIC_METHODS)
                        if (PUBLIC_METHODS.hasOwnProperty(t))
                            for (i = 0; i < PUBLIC_METHODS[t].length; i++) e = PUBLIC_METHODS[t][i], n += "window." + e + " = function(){\n	return " + t + "." + e + ".apply(" + t + ", arguments);\n}\n";
                    var o;
                    for (t in PUBLIC_CONSTRUCTORS)
                        if (PUBLIC_CONSTRUCTORS.hasOwnProperty(t))
                            for (i = 0; i < PUBLIC_CONSTRUCTORS[t].length; i++) o = PUBLIC_CONSTRUCTORS[t][i], n += "window." + o + " = " + t + "." + o + ";\n";
                    return n += "Text.giveDefaultContext(__graphics__);\n"
                },
                setup = function() {
                    window.__graphics__ = new CodeHSGraphics, window.__console__ = new CodeHSConsole, window.__datastructs__ = CodeHSDatastructures, window.CodeHSGraphics = CodeHSGraphics, window.Randomizer = randomizerModule, window.Color = graphicsModule.Color, window.Keyboard = keyboardModule;
                    var wrap = makeNamespaceWrap();
                    eval(wrap)
                };
            domready(function() {
                setup()
            }), module.exports = {
                CodeHSGraphics: CodeHSGraphics,
                CodeHSConsole: CodeHSConsole,
                CodeHSDatastructures: CodeHSDatastructures
            }
        }, {
            "codehs-console": 2,
            "codehs-datastructures": 3,
            "codehs-graphics": 13,
            "codehs-keyboard": 27,
            domready: 28
        }],
        2: [function(t, e, i) {
            "use strict";

            function n() {}
            var o = t("codehs-js-utils").safeEval,
                s = t("codehs-js-utils").testInfiniteLoops,
                r = [],
                a = null,
                l = "#tester-message",
                h = [];
            n.registerPublicMethod = function(t) {
                h.push(t)
            }, n.getNamespaceModifcationString = function() {
                for (var t = "", e = 0; e < h.length; e++) {
                    var i = h[e];
                    t += "function " + i + "(){\n	return __console__." + i + ".apply(__console__, arguments);\n}\n"
                }
                return t
            }, n.getStubString = function() {
                var t = "";
                return _.each(h, function(e) {
                    t += "function " + e + "(){\n	return 0;\n}\n"
                }), t
            }, n.setSolution = function(t) {
                a = t
            }, n.prototype.checkOutput = function() {
                if (a) {
                    var t = {
                        success: !0,
                        message: "<strong>Nice job!</strong> You got it!"
                    };
                    if (0 === $("#console").html().length) t.success = !1, t.message = "You didn't print anything.";
                    else if (r.length != a.length) t.success = !1, t.message = "<strong>Not quite.</strong> Take a look at the example output in the exercise tab.";
                    else
                        for (var e = 0; e < r.length; e++) {
                            var i = r[e],
                                n = a[e],
                                o = new RegExp(n);
                            0 !== i.search(o) && (t.success = !1, t.message = "<strong>Not quite.</strong> Take a look at the example output in the exercise tab.")
                        }
                    return $(l).html(t.message), t.success ? $(l).removeClass("gone").removeClass("alert-error").addClass("alert-info") : $(l).removeClass("gone").removeClass("alert-info").addClass("alert-error"), t
                }
            }, n.getOutput = function() {
                return $("#console").text()
            }, n.exists = function() {
                return $("#console").exists()
            }, n.clear = function() {
                r = [], $("#console").html(""), $(l).addClass("gone")
            }, n.prototype.readLinePrivate = function(t, e) {
                "undefined" != typeof e && e || this.print(t), $("#console").css("margin-top", "180px");
                var i = prompt(t);
                return $("#console").css("margin-top", "0px"), "undefined" != typeof e && e || this.println(i), i
            }, n.prototype.runCode = function(t, e) {
                e = e || {};
                var i = n.getNamespaceModifcationString(),
                    r = n.getStubString();
                if (!e.overrideInfiniteLoops) try {
                    if (!this.hasUserinput()) {
                        var a = s(r + t);
                        if (a) return window.CHS && window.CHS.PubSub.trigger("editorError:handle", "", "infinite_loop"), {
                            hasError: !0
                        }
                    }
                } catch (l) {
                    console.log("infinite loop checker did not run.")
                }
                var h = ";var console = {}; console.log = println;\n",
                    u = "";
                return u += i, u += h, u += t, u += "\n\nif(typeof start == 'function') {start();} ", u += "__console__.checkOutput();", o(u, this, "__console__")
            }, n.prototype.hasUserinput = function(t) {
                return t.match(new RegExp("readLine|readInt|readFloat|readBoolean|readNumber"))
            }, n.prototype.print = function(t) {
                if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to print");
                var e = $("#console");
                e.length ? (e.html($("#console").html() + t), e.scrollTop($("#console")[0].scrollHeight), r = e.html().split("\n"), r.splice(r.length - 1, 1)) : window.console.log(t)
            }, n.registerPublicMethod("print"), n.prototype.println = function(t) {
                if (0 === arguments.length) t = "";
                else {
                    if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to println");
                    this.print(t + "\n");
                    $("#console").scrollTop()
                }
            }, n.registerPublicMethod("println"), n.prototype.readNumber = function(t, e, i) {
                for (var n = 0, o = 100, s = t, r = !1, a = 0;;) {
                    var l = this.readLinePrivate(s, r);
                    if (null === l) return null;
                    if (l = e(l), !isNaN(l)) return l;
                    if (null === l) return n;
                    if (a > o) return n;
                    s = "That was not " + i + ". Please try again. " + t, r = !0, a++
                }
            }, n.registerPublicMethod("readNumber"), n.prototype.readLine = function(t) {
                if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readLine");
                return this.readLinePrivate(t, !1)
            }, n.registerPublicMethod("readLine"), n.prototype.readBoolean = function(t) {
                if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readBoolean");
                return this.readNumber(t, function(t) {
                    return null === t ? NaN : (t = t.toLowerCase(), "true" == t || "yes" == t ? !0 : "false" == t || "no" == t ? !1 : NaN)
                }, "a boolean (true/false)")
            }, n.registerPublicMethod("readBoolean"), n.prototype.readInt = function(t) {
                if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readInt");
                return this.readNumber(t, function(t) {
                    var e = parseInt(t),
                        i = parseFloat(t);
                    return e == i ? e : NaN
                }, "an integer")
            }, n.registerPublicMethod("readInt"), n.prototype.readFloat = function(t) {
                if (1 !== arguments.length) throw new Error("You should pass exactly 1 argument to readFloat");
                return this.readNumber(t, parseFloat, "a float")
            }, n.registerPublicMethod("readFloat"), e.exports = {
                CodeHSConsole: n,
                PUBLIC_METHODS: h
            }
        }, {
            "codehs-js-utils": 26
        }],
        3: [function(t, e, i) {
            "use strict";
            var n = (t("./queue.js"), t("./set.js")),
                o = t("./stack.js"),
                s = ["Queue", "Set", "Stack"];
            e.exports = {
                PUBLIC_CONSTRUCTORS: s,
                Set: n,
                Stack: o
            }
        }, {
            "./queue.js": 4,
            "./set.js": 5,
            "./stack.js": 6
        }],
        4: [function(t, e, i) {
            "use strict";

            function n() {
                this.q = []
            }
            n.prototype.size = function() {
                return this.q.length
            }, n.prototype.clear = function() {
                this.q = []
            }, n.prototype.enqueue = function(t) {
                this.q.push(t)
            }, n.prototype.dequeue = function() {
                var t = this.q[0];
                return this.q.splice(0, 1), t
            }, n.prototype.peek = function() {
                var t = this.q[0];
                return t
            }, n.prototype.hasNext = function() {
                return 0 !== this.q.length
            }, n.prototype.isEmpty = function() {
                return 0 === this.q.length
            }, e.exports = n
        }, {}],
        5: [function(t, e, i) {
            "use strict";

            function n() {
                this.set = {}, this.numElems = 0
            }
            n.prototype.size = function() {
                return this.numElems
            }, n.prototype.isEmpty = function() {
                return 0 === this.numElems
            }, n.prototype.clear = function() {
                this.set = {}, this.numElems = 0
            }, n.prototype.getKey = function(t) {
                var e = t;
                return "object" == typeof t && (e = t.toString()), e
            }, n.prototype.add = function(t) {
                if (null === t) throw new TypeError("Cannot add a null to a set.");
                var e = this.getKey(t);
                this.containsKey(e) || this.numElems++, this.set[e] = t
            }, n.prototype.remove = function(t) {
                if (null === t) throw new TypeError("Cannot remove null from a set.");
                var e = this.getKey(t);
                if (!this.containsKey(e)) throw new Error("Set does not contain " + e);
                delete this.set[e], this.numElems--
            }, n.prototype.containsKey = function(t) {
                return "undefined" != typeof this.set[t]
            }, n.prototype.contains = function(t) {
                return "undefined" != typeof this.find(t)
            }, n.prototype.elems = function() {
                return this.set
            }, n.prototype.find = function(t) {
                var e = this.getKey(t);
                return this.set[e]
            }, n.prototype.union = function(t) {
                for (var e in t.elems()) this.add(t.find(e))
            }, n.prototype.intersect = function(t) {
                var e = {},
                    i = 0;
                for (var n in t.elems()) this.containsKey(n) && (i++, e[n] = this.find(n));
                this.set = e, this.numElems = i
            }, n.prototype.toString = function() {
                var t = "Set: {",
                    e = 0;
                for (var i in this.set) {
                    var n = this.set[i];
                    t += n, e < this.size() - 1 && (t += ", "), e++
                }
                return t += "}"
            }, e.exports = n
        }, {}],
        6: [function(t, e, i) {
            "use strict";

            function n() {
                this.stack = []
            }
            n.prototype.size = function() {
                return this.stack.length
            }, n.prototype.clear = function() {
                this.stack = []
            }, n.prototype.push = function(t) {
                this.stack.push(t)
            }, n.prototype.pop = function() {
                var t = this.stack.length,
                    e = this.stack[t - 1];
                return this.stack.splice(t - 1, 1), e
            }, n.prototype.peek = function() {
                var t = this.stack.length,
                    e = this.stack[t - 1];
                return e
            }, n.prototype.hasNext = function() {
                return 0 !== this.stack.length
            }, n.prototype.isEmpty = function() {
                return 0 === this.stack.length
            }, e.exports = n
        }, {}],
        7: [function(t, e, i) {
            "use strict";

            function n(t, e, i, s) {
                if (4 !== arguments.length) throw new Error('You should pass exactly 4 arguments to <span class="code">new Arc(raduis, startAngle, endAngle, angleUnit)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">radius</span>. Make sure you are passing finite numbers to <span class="code">new Arc(raduis, startAngle, endAngle, angleUnit)</span>');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">startAngle</span>. Make sure you are passing finite numbers to <span class="code">new Arc(raduis, startAngle, endAngle, angleUnit)</span>');
                if ("number" != typeof i || !isFinite(i)) throw new TypeError('Invalid value for <span class="code">endAngle</span>. Make sure you are passing finite numbers to <span class="code">new Arc(raduis, startAngle, endAngle, angleUnit)</span>');
                if ("number" != typeof s || !isFinite(s)) throw new TypeError('Invalid value for <span class="code">angleUnit</span>. Make sure you are passing finite numbers to <span class="code">new Arc(raduis, startAngle, endAngle, angleUnit)</span>');
                o.call(this), this.radius = t, this.angleUnit = s == n.DEGREES ? n.DEGREES : n.RADIANS, this.counterclockwise = n.COUNTER_CLOCKWISE, this.type = "Arc", this.angleUnit == n.DEGREES && (e = a(e), i = a(i)), this.startAngle = e, this.endAngle = i
            }
            var o = t("./thing.js"),
                s = t("./graphics-utils.js");
            n.prototype = new o, n.prototype.constructor = n, n.COUNTER_CLOCKWISE = !0, n.CLOCKWISE = !1, n.DEGREES = 0, n.RADIANS = 1, n.prototype.draw = function(t) {
                var e = t.getContext();
                e.save(), e.beginPath(), e.translate(this.x, this.y), e.rotate(this.rotation), e.arc(0, 0, this.radius, r(this.startAngle), r(this.endAngle), this.counterclockwise), e.lineTo(0, 0), this.hasBorder && (e.lineWidth = this.lineWidth, e.strokeStyle = this.stroke.toString(), e.stroke()), e.fillStyle = this.color.toString(), e.fill(), e.restore()
            }, n.prototype.setStartAngle = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setStartAngle</span>');
                if ("number" != typeof t || !isFinite(t)) throw new Error('Invalid value passed to <span class="code">setStartAngle</span>. Make sure you are passing a finite number.');
                this.angleUnit == n.DEGREES && (t = a(t)), this.startAngle = t
            }, n.prototype.setEndAngle = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setEndAngle</span>');
                if ("number" != typeof t || !isFinite(t)) throw new Error('Invalid value passed to <span class="code">setEndAngle</span>. Make sure you are passing a finite number.');
                this.angleUnit == n.DEGREES && (t = a(t)), this.endAngle = t
            }, n.prototype.getStartAngle = function() {
                var t = this.startAngle;
                return this.angleUnit == n.DEGREES && (t = l(this.startAngle)), Math.round(t)
            }, n.prototype.getEndAngle = function() {
                var t = this.endAngle;
                return this.angleUnit == n.DEGREES && (t = l(this.endAngle)), Math.round(t)
            }, n.prototype.setDirection = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setDirection</span>');
                if ("boolean" != typeof t) throw new Error('Invalid value passed to <span class="code">setDirection</span>. Make sure you are passing a boolean value. true for counterclockwise, false for clockwise.');
                this.counterclockwise = t
            }, n.prototype.containsPoint = function(t, e) {
                var i = s.getDistance(this.x, this.y, t, e);
                if (i > this.radius) return !1;
                var n = t - this.x,
                    o = this.y - e,
                    r = Math.atan(o / n);
                0 > n ? r += Math.PI : 0 > o && (r += 2 * Math.PI);
                var a = r >= this.startAngle && r <= this.endAngle;
                return this.counterclockwise ? a : !a
            };
            var r = function(t) {
                    return t = l(t), t = Math.round(t), t = (360 - t) % 360, t = a(t)
                },
                a = function(t) {
                    return t / 180 * Math.PI
                },
                l = function(t) {
                    return t / Math.PI * 180
                };
            e.exports = n
        }, {
            "./graphics-utils.js": 11,
            "./thing.js": 23
        }],
        8: [function(t, e, i) {
            "use strict";

            function n() {
                var t = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.oAudioContext || window.msAudioContext;
                if (!t) return console.log("Web Audio is not supported in this browser. Please use the most up to date version of Chrome, Firefox, or Safari."), 0;
                try {
                    return new t
                } catch (e) {
                    return console.log("Too many AudioContexts are in use. Please close all browser windows and retry."), 0
                }
            }
            e.exports = n
        }, {}],
        9: [function(t, e, i) {
            "use strict";

            function n(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">new Circle(radius)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('You must pass a finite number to <span class="code">new Circle(radius)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                o.call(this), this.radius = Math.max(0, t), this.color = s.black, this.lineWidth = 3, this.type = "Circle"
            }
            var o = t("./thing.js"),
                s = t("./color.js"),
                r = t("./graphics-utils.js");
            n.prototype = new o, n.prototype.constructor = n, n.prototype.draw = function(t) {
                var e = t.getContext();
                e.beginPath(), this.hasBorder && (e.strokeStyle = this.stroke.toString(), e.lineWidth = this.lineWidth), e.fillStyle = this.color.toString(), e.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, !0), e.closePath(), this.hasBorder && e.stroke(), e.fill()
            }, n.prototype.getRadius = function() {
                return this.radius
            }, n.prototype.getHeight = function() {
                return 2 * this.radius
            }, n.prototype.getWidth = function() {
                return 2 * this.radius
            }, n.prototype.setRadius = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setRadius(radius)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('You must pass a finite number to <span class="code">setRadius(radius)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.radius = Math.max(0, t)
            }, n.prototype.containsPoint = function(t, e) {
                var i = this.radius;
                this.hasBorder && (i += this.lineWidth);
                var n = r.getDistance(this.x, this.y, t, e);
                return i > n
            }, e.exports = n
        }, {
            "./color.js": 10,
            "./graphics-utils.js": 11,
            "./thing.js": 23
        }],
        10: [function(t, e, i) {
            "use strict";

            function n(t, e, i) {
                this.r = t, this.g = e, this.b = i
            }

            function o(t, e, i) {
                if (t = Math.floor(t), e = Math.floor(e), i = Math.floor(i), t > 255 || e > 255 || i > 255) throw "Invalid color component";
                return (t << 16 | e << 8 | i).toString(16)
            }

            function s(t, e, i) {
                return "#" + ("000000" + o(t, e, i)).slice(-6)
            }

            function r(t, e, i) {
                return 0 > i && (i += 1), i > 1 && (i -= 1), 1 / 6 > i ? t + 6 * (e - t) * i : .5 > i ? e : 2 / 3 > i ? t + (e - t) * (2 / 3 - i) * 6 : t
            }
            var a = t("./randomizer.js");
            n.prototype.toString = function() {
                return n.createFromRGB(this.r, this.g, this.b)
            }, n.random = a.nextColor, n.constants = {
                red: "#FF0000",
                RED: "#FF0000",
                green: "#00FF00",
                GREEN: "#00FF00",
                blue: "#0000FF",
                BLUE: "#0000FF",
                yellow: "#FFFF00",
                YELLOW: "#FFFF00",
                cyan: "#00FFFF",
                CYAN: "#00FFFF",
                orange: "#FFA500",
                ORANGE: "#FFA500",
                white: "#FFFFFF",
                WHITE: "#FFFFFF",
                black: "#000000",
                BLACK: "#000000",
                gray: "#cccccc",
                GRAY: "#CCCCCC",
                grey: "#cccccc",
                GREY: "#CCCCCC",
                purple: "#9B30FF",
                PURPLE: "#9B30FF"
            };
            var l;
            for (l in n.constants) n[l] = n.constants[l];
            n.createFromRGB = function(t, e, i) {
                return s(t, e, i)
            }, n.randomRed = function() {
                var t = a.nextInt(50, 255);
                return n.createFromRGB(t, 0, 0)
            }, n.randomGreen = function() {
                var t = a.nextInt(50, 255);
                return n.createFromRGB(0, t, 0)
            }, n.randomBlue = function() {
                var t = a.nextInt(50, 255);
                return n.createFromRGB(0, 0, t)
            }, n.createFromRGBL = function(t, e, i, o) {
                var s = n.rgbToHsl(t, e, i);
                0 > o && (o = 0), o > 1 && (o = 1);
                var r = n.hslToRgb(s[0], s[1], o);
                return n.createFromRGB(r[0], r[1], r[2])
            }, n.rgbToHsl = function(t, e, i) {
                t /= 255, e /= 255, i /= 255;
                var n, o, s = Math.max(t, e, i),
                    r = Math.min(t, e, i),
                    a = (s + r) / 2;
                if (s == r) n = o = 0;
                else {
                    var l = s - r;
                    switch (o = a > .5 ? l / (2 - s - r) : l / (s + r), s) {
                        case t:
                            n = (e - i) / l + (i > e ? 6 : 0);
                            break;
                        case e:
                            n = (i - t) / l + 2;
                            break;
                        case i:
                            n = (t - e) / l + 4
                    }
                    n /= 6
                }
                return [n, o, a]
            }, n.hslToRgb = function(t, e, i) {
                var n, o, s;
                if (0 === e) n = o = s = i;
                else {
                    var a = .5 > i ? i * (1 + e) : i + e - i * e,
                        l = 2 * i - a;
                    n = r(l, a, t + 1 / 3), o = r(l, a, t), s = r(l, a, t - 1 / 3)
                }
                return [255 * n, 255 * o, 255 * s]
            }, n.average = function(t, e) {
                function i(t) {
                    return t.toString(16)
                }

                function n(t) {
                    return parseInt(t, 16)
                }
                for (var o, s, r, a, l = /[\da-z]{2}/gi, h = t.match(l), u = e.match(l), c = "#", p = 0; p < h.length; p++) o = n(h[p]), s = n(u[p]), r = Math.floor(o + s >> 1), a = i(r), 1 == a.length && (a = "0" + a), c += a;
                return c
            }, n.getColor = function(t) {
                return n.constants[t]
            }, n.getHexColor = function(t) {
                return t
            }, e.exports = n
        }, {
            "./randomizer.js": 19
        }],
        11: [function(t, e, i) {
            "use strict";
            var n = function(t, e, i, n) {
                return Math.sqrt(Math.pow(t - i, 2) + Math.pow(e - n, 2))
            };
            e.exports = {
                getDistance: n
            }
        }, {}],
        12: [function(t, e, i) {
            "use strict";

            function n(t) {
                t = t || {}, this.resetAllState(), this.globalTimer = !0, this.currentCanvas = null, this.setCurrentCanvas(t.canvas), this.debugMode = t.debug || !1, this.fullscreenMode = !1, this.instanceId = _, _++;
                var e = this.canvasHasInstance(t.canvas);
                if (null !== e) {
                    var i = y[e];
                    i.stopTimer("MAIN_TIMER"), y[e] = this
                } else y.push(this)
            }
            Array.prototype.remove = function(t) {
                return this.splice(t, 1)[0]
            };
            var o, s, r, a = t("codehs-js-utils"),
                l = t("./graphics-utils.js"),
                h = t("./audioContext.js"),
                u = 40,
                c = 5,
                p = [],
                d = [],
                f = [],
                y = [],
                _ = 0,
                m = 0;
            n.registerPublicMethod = function(t) {
                p.push(t)
            }, n.registerConstructorMethod = function(t) {
                d.push(t)
            }, n.getNamespaceModifcationString = function() {
                for (var t = "\n", e = 0; e < p.length; e++) {
                    var i = p[e];
                    t += "function " + i + "(){\n	return __graphics__." + i + ".apply(__graphics__, arguments);\n}\n"
                }
                return t
            }, n.getConstructorModificationString = function() {
                for (var t = "", e = 0; e < d.length; e++) {
                    var i = d[e];
                    t += "var " + i + " = __graphics__." + i + ";\n"
                }
                return t
            }, n.prototype.add = function(t) {
                this.elements.push(t)
            }, n.registerPublicMethod("add"), window.oldAudio = window.Audio, n.prototype.Audio = function(t) {
                var e = new oldAudio(t);
                return e.crossOrigin = "anonymous", this.audioElements.push(e), e
            }, n.prototype.Audio.constructor = window.oldAudio, n.registerPublicMethod("Audio");
            var g = t("./sound.js");
            n.prototype.Sound = function(t, e) {
                t = t || 440, e = e || "sine";
                var i = new g(t, e);
                return this.soundElements.push(i), i
            }, n.prototype.Sound.constructor = g, n.registerPublicMethod("Sound"), n.prototype.waitForClick = function() {
                this.clickCount++
            }, n.registerPublicMethod("waitForClick"), n.prototype.mouseClickMethod = function(t) {
                this.clickCallback = a.safeCallback(t)
            }, n.registerPublicMethod("mouseClickMethod"), n.prototype.mouseMoveMethod = function(t) {
                this.moveCallback = a.safeCallback(t)
            }, n.registerPublicMethod("mouseMoveMethod"), n.prototype.mouseDownMethod = function(t) {
                this.mouseDownCallback = a.safeCallback(t)
            }, n.registerPublicMethod("mouseDownMethod"), n.prototype.mouseUpMethod = function(t) {
                this.mouseUpCallback = a.safeCallback(t)
            }, n.registerPublicMethod("mouseUpMethod"), n.prototype.mouseDragMethod = function(t) {
                this.dragCallback = a.safeCallback(t)
            }, n.registerPublicMethod("mouseDragMethod"), n.prototype.keyDownMethod = function(t) {
                this.keyDownCallback = a.safeCallback(t)
            }, n.registerPublicMethod("keyDownMethod"), n.prototype.keyUpMethod = function(t) {
                this.keyUpCallback = a.safeCallback(t)
            }, n.registerPublicMethod("keyUpMethod"), n.prototype.deviceOrientationMethod = function(t) {
                this.deviceOrientationCallback = a.safeCallback(t)
            }, n.registerPublicMethod("deviceOrientationMethod"), n.prototype.deviceMotionMethod = function(t) {
                this.deviceMotionCallback = a.safeCallback(t)
            }, n.registerPublicMethod("deviceMotionMethod"), n.prototype.audioChangeMethod = function(t, e) {
                if (m = h()) {
                    o = m.createAnalyser(), o.fftSize = 128;
                    var i = o.frequencyBinCount;
                    s = new Uint8Array(i), r = m.createMediaElementSource(t), r.crossOrigin = "anonymous", r.connect(o);
                    var n = m.createGain();
                    r.connect(n), n.connect(m.destination), this.audioChangeCallback = a.safeCallback(e), this.setGraphicsTimer(this.updateAudio.bind(this), u, null, "updateAudio")
                }
            }, n.registerPublicMethod("audioChangeMethod"), n.prototype.isKeyPressed = function(t) {
                return -1 != f.indexOf(t)
            }, n.registerPublicMethod("isKeyPressed"), n.prototype.getWidth = function() {
                var t = this.getCanvas();
                return parseFloat(t.getAttribute("width"))
            }, n.registerPublicMethod("getWidth"), n.prototype.getHeight = function() {
                var t = this.getCanvas();
                return parseFloat(t.getAttribute("height"))
            }, n.registerPublicMethod("getHeight"), n.prototype.stopTimer = function(t) {
                var e = "function" == typeof t ? t.name : t;
                clearInterval(this.timers[e])
            }, n.registerPublicMethod("stopTimer"), n.prototype.stopAllTimers = function() {
                for (var t = 1; 99999 > t; t++) window.clearInterval(t);
                this.setMainTimer()
            }, n.registerPublicMethod("stopAllTimers"), n.prototype.setTimer = function(t, e, i, n) {
                if (arguments.length < 2) throw new Error('2 parameters required for <span class="code">setTimer</span>, ' + arguments.length + ' found. You must provide a callback function and a number representing the time delay to <span class="code">setTimer</span>');
                if ("function" != typeof t) throw new TypeError('Invalid callback function. Make sure you are passing an actual function to <span class="code">setTimer</span>.');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for time delay. Make sure you are passing a finite number to <span class="code">setTimer</span> for the delay.');
                var o = this;
                (isNaN(e) || 15 > e) && (e = 15), this.waitingForClick() ? this.delayedTimers.push({
                    fn: t,
                    time: e,
                    data: i,
                    clicks: o.clickCount,
                    name: n
                }) : this.setGraphicsTimer(t, e, i, n)
            }, n.registerPublicMethod("setTimer"), n.prototype.setBackgroundColor = function(t) {
                this.backgroundColor = t
            }, n.registerPublicMethod("setBackgroundColor"), n.prototype.clear = function(t) {
                var e = t || this.getContext();
                e.clearRect(0, 0, this.getWidth(), this.getHeight())
            }, n.registerPublicMethod("clear"), n.prototype.getElementAt = function(t, e) {
                for (var i = this.elements.length - 1; i >= 0; i--)
                    if (this.elements[i].containsPoint(t, e, this)) return this.elements[i];
                return null
            }, n.registerPublicMethod("getElementAt"), n.prototype.elementExistsWithParameters = function(t) {
                for (var e = this.elements.length - 1; e >= 0; e--) {
                    var i = this.elements[e];
                    try {
                        if (void 0 !== t.x && this.runCode("return " + t.x).result.toFixed(0) != i.getX().toFixed(0)) continue;
                        if (void 0 !== t.y && this.runCode("return " + t.y).result.toFixed(0) != i.getY().toFixed(0)) continue;
                        if (void 0 !== t.width && this.runCode("return " + t.width).result.toFixed(0) != i.getWidth().toFixed(0)) continue;
                        if (void 0 !== t.height && this.runCode("return " + t.height).result.toFixed(0) != i.getHeight().toFixed(0)) continue;
                        if (void 0 !== t.radius && this.runCode("return " + t.radius).result.toFixed(0) != i.getRadius().toFixed(0)) continue;
                        if (void 0 !== t.color && this.runCode("return " + t.color).result != i.getColor()) continue;
                        if (void 0 !== t.label && t.label != i.getLabel()) continue;
                        if (void 0 !== t.type && t.type != i.getType()) continue
                    } catch (n) {
                        continue
                    }
                    return !0
                }
                return !1
            }, n.registerPublicMethod("elementExistsWithParameters"), n.prototype.removeAll = function() {
                this.stopAllVideo(), this.elements = []
            }, n.registerPublicMethod("removeAll"), n.prototype.remove = function(t) {
                for (var e = 0; e < this.elements.length; e++) this.elements[e] == t && ("WebVideo" == this.elements[e].type && this.elements[e].stop(), this.elements.splice(e, 1))
            }, n.registerPublicMethod("remove"), n.prototype.setSize = function(t, e) {
                this.fullscreenMode = !1;
                var i = this.getCanvas();
                i.width = t, i.height = e, $(i).css({
                    "max-height": e,
                    "max-width": t
                })
            }, n.registerPublicMethod("setSize"), n.prototype.setFullscreen = function() {
                var t = this;
                t.fullscreenMode = !0;
                var e = this.getCanvas();
                e.width = e.parentElement.offsetWidth - c, e.height = e.parentElement.offsetHeight - c, $(e).css({
                    "max-height": e.height,
                    "max-width": e.width
                })
            }, n.registerPublicMethod("setFullscreen"), n.prototype.Rectangle = t("./rectangle.js"), n.registerConstructorMethod("Rectangle"), n.prototype.Circle = t("./circle.js"), n.registerConstructorMethod("Circle"), n.prototype.Line = t("./line.js"), n.registerConstructorMethod("Line"), n.prototype.Grid = t("./grid.js"), n.registerConstructorMethod("Grid"), n.prototype.Line = t("./line.js"), n.registerConstructorMethod("Line"), n.prototype.Polygon = t("./polygon.js"), n.registerConstructorMethod("Polygon"), n.prototype.Text = t("./text.js"), n.registerConstructorMethod("Text"), n.prototype.Oval = t("./oval.js"), n.registerConstructorMethod("Oval"), n.prototype.Arc = t("./arc.js"), n.registerConstructorMethod("Arc"), n.prototype.Color = t("./color.js"), n.registerConstructorMethod("Color"), n.prototype.WebImage = t("./webimage.js"), n.registerConstructorMethod("WebImage"), n.prototype.WebVideo = t("./webvideo.js"), n.registerConstructorMethod("WebVideo"), n.prototype.ImageLibrary = t("./imagelibrary.js"), n.registerConstructorMethod("ImageLibrary"), n.prototype.runCode = function(t) {
                var e = n.getNamespaceModifcationString(),
                    i = n.getConstructorModificationString(),
                    o = "";
                return o += e, o += i, o += "\nText.giveDefaultContext(__graphics__);\n", o += t, o += "\n\nif(typeof start == 'function') {start();} ", a.safeEval(o, this, "__graphics__")
            }, n.prototype.resetAllTimers = function() {
                for (var t in this.timers) clearInterval(this.timers[t])
            }, n.prototype.stopAllAudio = function() {
                this.audioElements.forEach(function(t) {
                    t.pause()
                }), this.soundElements.forEach(function(t) {
                    t.stop(), t.disconnect()
                })
            }, n.prototype.stopAllVideo = function() {
                for (var t = 0; t < this.elements.length; t++) "WebVideo" == this.elements[t].type && this.elements[t].stop()
            }, n.prototype.resetAllState = function() {
                this.backgroundColor = null, this.elements = [], this.audioElements = [], this.soundElements = [], this.clickCallback = null, this.moveCallback = null, this.mouseDownCallback = null, this.mouseUpCallback = null, this.dragCallback = null, this.keyDownCallback = null, this.keyUpCallback = null, this.deviceOrientationCallback = null, this.deviceMotionCallback = null, this.audioChangeCallback = null, r && (r.disconnect(), r = 0), this.timers = {}, this.timersList = [], this.clickCount = 0, this.delayedTimers = [], m && (m.close(), m = 0), this.fullscreenMode = !1
            }, n.prototype.fullReset = function() {
                this.stopAllAudio(), this.stopAllVideo(), this.resetAllTimers(), this.resetAllState(), this.setMainTimer()
            }, n.prototype.canvasExists = function() {
                return null !== this.getCanvas()
            }, n.prototype.getCanvas = function() {
                return this.currentCanvas
            }, n.prototype.setCurrentCanvas = function(t) {
                t ? this.currentCanvas = $(t)[0] : this.currentCanvas = document.getElementsByTagName("canvas")[0], this.currentCanvas || (this.currentCanvas = null), this.fullReset(), this.setup()
            }, n.prototype.stopGlobalTimer = function() {
                this.globalTimer = !1
            }, n.prototype.drawBackground = function() {
                if (this.backgroundColor) {
                    var t = this.getContext();
                    t.fillStyle = this.backgroundColor, t.beginPath(), t.rect(0, 0, this.getWidth(), this.getHeight()), t.closePath(), t.fill()
                }
            }, n.prototype.getContext = function() {
                var t = this.getCanvas();
                if (t && t.getContext) {
                    var e = t.getContext("2d");
                    return e
                }
                return null
            }, n.prototype.redraw = function() {
                this.clear(), this.drawBackground();
                for (var t = 0; t < this.elements.length; t++) this.elements[t].draw(this)
            }, n.prototype.setMainTimer = function() {
                var t = this;
                this.globalTimer && this.setTimer(function() {
                    t.redraw()
                }, u, null, "MAIN_TIMER")
            }, n.prototype.waitingForClick = function() {
                return 0 !== this.clickCount
            }, n.prototype.canvasHasInstance = function(t) {
                for (var e, i = 0; i < y.length; i++)
                    if (e = y[i], e.instanceId !== this.instanceId && e.getCanvas() === t) return e.instanceId;
                return null
            }, n.prototype.getDistance = function(t, e, i, n) {
                return l.getDistance(t, e, i, n)
            }, n.prototype.setup = function() {
                var t = this,
                    e = this.getCanvas();
                e.onclick = function(e) {
                    if (t.waitingForClick()) {
                        t.clickCount--;
                        for (var i = 0; i < t.delayedTimers.length; i++) {
                            var n = t.delayedTimers[i];
                            n.clicks--, 0 === n.clicks && t.setGraphicsTimer(n.fn, n.time, n.data)
                        }
                    } else t.clickCallback && t.clickCallback(e)
                };
                var i = !1;
                e.onmousemove = function(e) {
                    t.moveCallback && t.moveCallback(e), i && t.dragCallback && t.dragCallback(e)
                }, e.onmousedown = function(e) {
                    i = !0, t.mouseDownCallback && t.mouseDownCallback(e)
                }, e.onmouseup = function(e) {
                    i = !1, t.mouseUpCallback && t.mouseUpCallback(e)
                }, e.ontouchmove = function(e) {
                    e.preventDefault(), t.dragCallback ? t.dragCallback(e) : t.moveCallback && t.moveCallback(e)
                }, e.ontouchstart = function(e) {
                    if (e.preventDefault(), t.mouseDownCallback ? t.mouseDownCallback(e) : t.clickCallback && t.clickCallback(e), t.waitingForClick()) {
                        t.clickCount--;
                        for (var i = 0; i < t.delayedTimers.length; i++) {
                            var n = t.delayedTimers[i];
                            n.clicks--, 0 === n.clicks && t.setGraphicsTimer(n.fn, n.time, n.data)
                        }
                    } else;
                }, e.ontouchend = function(e) {
                    e.preventDefault(), t.mouseUpCallback && t.mouseUpCallback(e)
                }
            }, n.prototype.setGraphicsTimer = function(t, e, i, n) {
                "undefined" == typeof n && (n = t.name), this.timers[n] = a.safeSetInterval(t, i, e), this.timersList.push({
                    name: n,
                    fn: t,
                    data: i,
                    time: e
                })
            }, n.prototype.updateAudio = function() {
                if (o.getByteFrequencyData(s), this.audioChangeCallback) {
                    var t = 46;
                    this.audioChangeCallback(s.slice(0, t))
                }
            }, window.onkeydown = function(t) {
                var e = f.indexOf(t.keyCode); - 1 === e && f.push(t.keyCode);
                for (var i, n = 0; n < y.length; n++) {
                    var o = y[n];
                    o.keyDownCallback && (o.keyDownCallback(t), i = !0, t.keyCode == Keyboard.SPACE && (i = !1), t.keyCode >= Keyboard.LEFT && t.keyCode <= Keyboard.DOWN && (i = !1))
                }
                return i
            }, window.onkeyup = function(t) {
                var e = f.indexOf(t.keyCode); - 1 !== e && f.splice(e, 1);
                for (var i = 0; i < y.length; i++) {
                    var n = y[i];
                    n.keyUpCallback && n.keyUpCallback(t)
                }
            };
            var v;
            window.onresize = function(t) {
                v || (v = setTimeout(function() {
                    v = null;
                    for (var t = 0; t < y.length; t++) {
                        var e = y[t];
                        e.fullscreenMode && e.setFullscreen()
                    }
                }, u))
            }, window.DeviceOrientationEvent && (window.ondeviceorientation = function(t) {
                for (var e = 0; e < y.length; e++) {
                    var i = y[e];
                    i.deviceOrientationCallback && i.deviceOrientationCallback(t)
                }
            }), window.DeviceMotionEvent && (window.ondevicemotion = function(t) {
                for (var e = 0; e < y.length; e++) {
                    var i = y[e];
                    i.deviceMotionCallback && i.deviceMotionCallback(t)
                }
            }), n.getBaseCoordinates = function(t, e) {
                var i, n;
                t.pageX || t.pageY ? (i = t.pageX, n = t.pageY) : (i = t.clientX + document.body.scrollLeft + document.documentElement.scrollLeft, n = t.clientY + document.body.scrollTop + document.documentElement.scrollTop);
                var o = e.offset();
                return i -= o.left, n -= o.top, {
                    x: i,
                    y: n
                }
            }, n.getMouseCoordinates = function(t) {
                var e = n.getBaseCoordinates(t, $(t.currentTarget)),
                    i = e.x,
                    o = e.y;
                return i = Math.round(i), o = Math.round(o), {
                    x: i,
                    y: o
                }
            }, n.getTouchCoordinates = function(t) {
                var e = n.getBaseCoordinates(t, $(t.target)),
                    i = e.x,
                    o = e.y,
                    s = $("#game").width(),
                    r = $("#game").attr("width"),
                    a = r / s;
                return i *= a, o *= a, i = Math.round(i), o = Math.round(o), {
                    x: i,
                    y: o
                }
            }, MouseEvent.prototype.getX = function() {
                return n.getMouseCoordinates(this).x
            }, MouseEvent.prototype.getY = function() {
                return n.getMouseCoordinates(this).y
            }, "undefined" != typeof TouchEvent && (TouchEvent.prototype.getX = function() {
                return n.getTouchCoordinates(this.touches[0]).x
            }, TouchEvent.prototype.getY = function() {
                return n.getTouchCoordinates(this.touches[0]).y
            }), e.exports = {
                CodeHSGraphics: n,
                PUBLIC_METHODS: p,
                PUBLIC_CONSTRUCTORS: d
            }
        }, {
            "./arc.js": 7,
            "./audioContext.js": 8,
            "./circle.js": 9,
            "./color.js": 10,
            "./graphics-utils.js": 11,
            "./grid.js": 14,
            "./imagelibrary.js": 15,
            "./line.js": 16,
            "./oval.js": 17,
            "./polygon.js": 18,
            "./rectangle.js": 20,
            "./sound.js": 21,
            "./text.js": 22,
            "./webimage.js": 24,
            "./webvideo.js": 25,
            "codehs-js-utils": 26
        }],
        13: [function(t, e, i) {
            "use strict";
            var n = t("./graphics.js"),
                o = n.CodeHSGraphics,
                s = n.PUBLIC_CONSTRUCTORS,
                r = n.PUBLIC_METHODS,
                a = t("./webimage.js"),
                l = t("./webvideo.js"),
                h = t("./polygon.js"),
                u = t("./color.js"),
                c = t("./randomizer.js"),
                p = t("./text.js"),
                d = t("./grid.js"),
                f = t("./circle.js"),
                y = t("./line.js"),
                _ = t("./rectangle.js"),
                m = t("./imagelibrary.js"),
                g = t("./sound.js");
            e.exports = {
                CodeHSGraphics: o,
                PUBLIC_METHODS: r,
                PUBLIC_CONSTRUCTORS: s,
                WebImage: a,
                WebVideo: l,
                ImageLibrary: m,
                Polygon: h,
                Color: u,
                Randomizer: c,
                Text: p,
                Grid: d,
                Circle: f,
                Line: y,
                Rectangle: _,
                Sound: g
            }
        }, {
            "./circle.js": 9,
            "./color.js": 10,
            "./graphics.js": 12,
            "./grid.js": 14,
            "./imagelibrary.js": 15,
            "./line.js": 16,
            "./polygon.js": 18,
            "./randomizer.js": 19,
            "./rectangle.js": 20,
            "./sound.js": 21,
            "./text.js": 22,
            "./webimage.js": 24,
            "./webvideo.js": 25
        }],
        14: [function(t, e, i) {
            "use strict";

            function n(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">new Grid(rows, cols)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">rows</span>. Make sure you are passing finite numbers to <span class="code">new Grid(rows, cols)</span>.');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">cols</span>. Make sure you are passing finite numbers to <span class="code">new Grid(rows, cols)</span>.');
                t = Math.max(0, t), e = Math.max(0, e), this.grid = new Array(t);
                for (var i = 0; t > i; i++) this.grid[i] = new Array(e)
            }
            n.prototype.initFromArray = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">initFromArray</span>');
                if (!Array.isArray(t)) throw new Error('Invalid value passed to <span class="code">initFromArray</span>. Make sure you are passing an array.');
                for (var e = 0; e < t.length; e++)
                    for (var i = 0; i < t[0].length; i++) this.inBounds(e, i) && this.set(e, i, t[e][i])
            }, n.prototype.init = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">init</span>');
                if ("boolean" != typeof t && "number" != typeof t && "string" != typeof t && "object" != typeof t) throw new TypeError('Invalid value passed to <span class="code">init</span>. You passed a value of type ' + typeof t + ". Make sure you are passing a number, string, object, or boolean value.");
                if ("number" == typeof t && !isFinite(t)) throw new TypeError('Non finite number passed to <span class="code">init</span>. If you are passing a number, make sure it is a finite number.');
                for (var e = 0; e < this.numRows(); e++)
                    for (var i = 0; i < this.numCols(); i++) this.grid[e][i] = t
            }, n.prototype.get = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">get(row, col)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">row</span>. Make sure you are passing finite numbers to <span class="code">get(row, col)</span>.');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">col</span>. Make sure you are passing finite numbers to <span class="code">get(row, col)</span>.');
                return this.grid[t][e]
            }, n.prototype.set = function(t, e, i) {
                if (3 !== arguments.length) throw new Error('You should pass exactly 3 arguments to <span class="code">set(row, col, value)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">row</span>. You passed a value of type ' + typeof t + ". Make sure you are passing a number.");
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">col</span>. You passed a value of type ' + typeof e + ". Make sure you are passing a number.");
                if ("boolean" != typeof i && "number" != typeof i && "string" != typeof i && "object" != typeof i) throw new TypeError('Invalid value passed to <span class="code">set</span>. You passed a value of type ' + typeof i + ". Make sure you are passing a number, string, object, or boolean value.");
                if ("number" == typeof i && !isFinite(i)) throw new TypeError('Non finite value passed to <span class="code">set</span>. If you are passing a number, make sure it is a finite number.');
                this.grid[t][e] = i
            }, n.prototype.numRows = function() {
                return this.grid.length
            }, n.prototype.numCols = function() {
                return this.grid[0].length
            }, n.prototype.inBounds = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">inBounds(row, col)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">row</span>. Make sure you are passing finite numbers to <span class="code">inBounds(row, col)</span>.');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">col</span>. Make sure you are passing finite numbers to <span class="code">inBounds(row, col)</span>.');
                return 0 > t || 0 > e ? !1 : t >= this.numRows() || e >= this.numCols() ? !1 : !0
            }, n.prototype.toList = function() {
                for (var t = [], e = 0; e < this.grid.length; e++)
                    for (var i = 0; i < this.grid[0].length; i++) {
                        var n = this.grid[e][i];
                        n && 0 !== n && t.push([e, i, n])
                    }
                return t
            }, n.prototype.toString = function() {
                for (var t = "", e = 0; e < this.numRows(); e++) {
                    for (var i = 0; i < this.numCols(); i++) t += this.get(e, i) + " ";
                    t += "<br/>"
                }
                return t
            }, e.exports = n
        }, {}],
        15: [function(t, e, i) {
            e.exports = {
                Characters: {
                    penguin: "https://codehs.com/static/img/library/characters/penguin.png",
                    monkey: "https://codehs.com/static/img/library/characters/monkey.jpg",
                    leopard: "https://codehs.com/static/img/library/characters/leopard.jpg",
                    chameleon: "https://codehs.com/static/img/library/characters/chameleon.jpg",
                    lizard: "https://codehs.com/static/img/library/characters/lizard.jpg",
                    butterfly: "https://codehs.com/static/img/library/characters/butterfly.jpg",
                    secretMessage: "https://codehs.com/static/img/library/characters/secretMessage.png"
                },
                Objects: {
                    icicle: "https://codehs.com/static/img/library/objects/icicle.png",
                    helicopter: "https://codehs.com/static/img/library/objects/helicopter.png",
                    asteroid: "https://codehs.com/static/img/library/objects/asteroid.png",
                    soccerBall: "https://codehs.com/static/img/library/objects/soccerBall.png"
                },
                Landscapes: {
                    flowers: "https://codehs.com/static/img/library/landscapes/flowers.jpg"
                }
            }
        }, {}],
        16: [function(t, e, i) {
            "use strict";

            function n(t, e, i, n) {
                if (4 !== arguments.length) throw new Error('You should pass exactly 4 argument to <span class="code">new Line(x1, y1, x2, y2)</span>');
                if ("number" != typeof t || "number" != typeof e || "number" != typeof i || "number" != typeof n) throw new TypeError('You must pass 4 numbers to <span class="code">new Line(x1, y1, x2, y2)</span>. Make sure each parameter youare passing is a number.');
                if (!(isFinite(t) && isFinite(e) && isFinite(i) && isFinite(n))) throw new TypeError('One or more of the values you passed to <span class="code">new Line(x1, y1, x2, y2)</span> is an illegal number. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                o.call(this), this.x1 = t, this.y1 = e, this.x2 = i, this.y2 = n, this.lineWidth = 2, this.type = "Line"
            }
            var o = t("./thing.js");
            n.prototype = new o, n.prototype.constructor = n, n.prototype.setColor = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setColor(color)</span>.');
                if (void 0 === t) throw new TypeError("Invalid color");
                this.stroke = t
            }, n.prototype.getColor = function() {
                return this.stroke
            }, n.prototype.draw = function(t) {
                var e = t.getContext();
                e.save(), e.fillStyle = this.color.toString(), e.beginPath(), e.strokeStyle = this.stroke.toString(), e.lineWidth = this.lineWidth;
                var i = s(this.x1, this.y1, this.x2, this.y2, this.rotation);
                e.moveTo(i[0], i[1]), e.lineTo(i[2], i[3]), e.closePath(), e.stroke(), e.restore()
            };
            var s = function(t, e, i, n, o) {
                var s, r, a = (t + i) / 2,
                    l = (e + n) / 2,
                    h = Math.sin(o),
                    u = Math.cos(o);
                return t -= a, e -= l, s = t * u - e * h, r = t * h + e * u, t = s + a, e = r + l, i -= a, n -= l, s = i * u - n * h, r = i * h + n * u, i = s + a, n = r + l, [t, e, i, n]
            };
            n.prototype.containsPoint = function(t, e) {
                var i = this.x1 <= t && t <= this.x2 || this.x2 <= t && t <= this.x1,
                    n = this.y1 <= e && e <= this.y2 || this.y2 <= e && e <= this.y1;
                if (this.x1 == this.x2) return this.x1 == t && n;
                var o = (this.y2 - this.y1) / (this.x2 - this.x1);
                return Math.abs(o * (t - this.x1) - (e - this.y1)) <= this.lineWidth && i && n
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.getHeight = function() {
                return this.height
            }, n.prototype.setLineWidth = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setLineWidth</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('You must pass a finite number to <span class="code">setLineWidth(width)</span>. Did you perform a calculation on a variable that is not a number?');
                this.lineWidth = t
            }, n.prototype.setStartpoint = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">setStartpoint(x, y)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for x-coordinate. Make sure you are passing finite numbers to <span class="code">setStartpoint(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for y-coordinate. Make sure you are passing finite numbers to <span class="code">setStartpoint(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.setPosition(t, e)
            }, n.prototype.setPosition = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">setPosition(x, y)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for x-coordinate. Make sure you are passing finite numbers to <span class="code">setPosition(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for y-coordinate. Make sure you are passing finite numbers to <span class="code">setPosition(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.x1 = t, this.y1 = e
            }, n.prototype.setEndpoint = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">setEndpoint(x, y)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for x-coordinate. Make sure you are passing finite numbers to <span class="code">setEndpoint(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for y-coordinate. Make sure you are passing finite numbers to <span class="code">setEndpoint(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.x2 = t, this.y2 = e
            }, n.prototype.move = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">move</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid number passed for <span class="code">dx</span>. Make sure you are passing finite numbers to <span class="code">move(dx, dy)</span>');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid number passed for <span class="code">dy</span>. Make sure you are passing finite numbers to <span class="code">move(dx, dy)</span>');
                this.x1 += t, this.y1 += e, this.x2 += t, this.y2 += e
            }, n.prototype.getX = function() {
                return this.x1
            }, n.prototype.getY = function() {
                return this.y1
            }, n.prototype.getStartX = function() {
                return this.x1
            }, n.prototype.getStartY = function() {
                return this.y1
            }, n.prototype.getEndX = function() {
                return this.x2
            }, n.prototype.getEndY = function() {
                return this.y2
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        17: [function(t, e, i) {
            "use strict";

            function n(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">new Oval(width, height)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">width</span>. Make sure you are passing finite numbers to <span class="code">new Oval(width, height)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">height</span>. Make sure you are passing finite numbers to <span class="code">new Oval(width, height)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                o.call(this), this.width = Math.max(0, t), this.height = Math.max(0, e), this.type = "Oval"
            }
            var o = t("./thing.js");
            n.prototype = new o, n.prototype.constructor = n, n.prototype.draw = function(t) {
                var e = t.getContext();
                e.save(), e.translate(this.x, this.y), e.rotate(this.rotation);
                var i = this.width,
                    n = this.height,
                    o = -i / 2,
                    s = -n / 2,
                    r = .5522848,
                    a = i / 2 * r,
                    l = n / 2 * r,
                    h = o + i,
                    u = s + n,
                    c = o + i / 2,
                    p = s + n / 2;
                e.beginPath(), e.moveTo(o, p), e.bezierCurveTo(o, p - l, c - a, s, c, s), e.bezierCurveTo(c + a, s, h, p - l, h, p), e.bezierCurveTo(h, p + l, c + a, u, c, u), e.bezierCurveTo(c - a, u, o, p + l, o, p), e.fillStyle = this.color.toString(), e.fill(), this.hasBorder && (e.strokeStyle = this.stroke.toString(), e.lineWidth = this.lineWidth, e.stroke()), e.closePath(), e.restore()
            }, n.prototype.getHeight = function() {
                return this.height
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.setWidth = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setWidth(width)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('You must pass a finite number to <span class="code">setWidth(width)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.width = Math.max(0, t)
            }, n.prototype.setHeight = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setHeight(height)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('You must pass a finite number to <span class="code">setHeight(height)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.height = Math.max(0, t)
            }, n.prototype.containsPoint = function(t, e) {
                var i = Math.pow(this.width / 2, 2),
                    n = Math.pow(this.height / 2, 2),
                    o = Math.pow(t - this.x, 2),
                    s = Math.pow(e - this.y, 2),
                    r = o / i + s / n;
                return 1 >= r
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        18: [function(t, e, i) {
            "use strict";

            function n() {
                if (0 !== arguments.length) throw new Error('You should pass exactly 0 arguments to <span class="code">new Polygon()</span>');
                o.call(this), this.points = [], this.width = 0, this.height = 0, this.type = "Polygon"
            }
            var o = t("./thing.js");
            n.prototype = new o, n.prototype.constructor = n, n.prototype.draw = function(t) {
                if (0 !== this.points.length) {
                    var e = t.getContext();
                    e.fillStyle = this.color.toString(), e.beginPath();
                    var i = this.points[0];
                    e.moveTo(i.x, i.y);
                    for (var n = 1; n < this.points.length; n++) {
                        var o = this.points[n];
                        e.lineTo(o.x, o.y)
                    }
                    e.closePath(), e.fill()
                }
            }, n.prototype.containsPoint = function(t, e) {
                for (var i = 0; i < this.points.length; i++)
                    if (t == this.points[i].x && e == this.points[i].y) return !0;
                for (var n = [], i = 1; i < this.points.length; i++) {
                    var o = {
                        x1: this.points[i - 1].x,
                        y1: this.points[i - 1].y,
                        x2: this.points[i].x,
                        y2: this.points[i].y
                    };
                    n.push(o), i == this.points.length - 1 && (o = {
                        x1: this.points[i].x,
                        y1: this.points[i].y,
                        x2: this.points[0].x,
                        y2: this.points[0].y
                    }, n.push(o))
                }
                for (var s = 0, i = 0; i < n.length; i++) {
                    var r = n[i].y1 <= e && e <= n[i].y2 || n[i].y2 <= e && e <= n[i].y1;
                    if (n[i].x1 == n[i].x2) return r && n[i].x1 >= t;
                    var a = (n[i].y2 - n[i].y1) / (n[i].x2 - n[i].x1),
                        l = (e - n[i].y1) / a + n[i].x1;
                    r && l >= t && s++
                }
                return s % 2 == 1
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.getHeight = function() {
                return this.height
            }, n.prototype.addPoint = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">addPoint(x, y)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for x-coordinate. Make sure you are passing finite numbers to <span class="code">addPoint(x, y)</span>.');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for y-coordinate. Make sure you are passing finite numbers to <span class="code">addPoint(x, y)</span>.');
                for (var i = 0; i < this.points.length; i++) Math.abs(t - this.points[i].x) > this.width && (this.width = Math.abs(t - this.points[i].x)), Math.abs(e - this.points[i].y) > this.height && (this.height = Math.abs(e - this.points[i].y));
                this.points.push({
                    x: t,
                    y: e
                })
            }, n.prototype.move = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">move</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid number passed for <span class="code">dx</span>. Make sure you are passing finite numbers to <span class="code">move(dx, dy)</span>');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid number passed for <span class="code">dy</span>. Make sure you are passing finite numbers to <span class="code">move(dx, dy)</span>');
                for (var i = 0; i < this.points.length; i++) this.points[i].x += t, this.points[i].y += e
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        19: [function(t, e, i) {
            "use strict";
            var n = function(t, e) {
                    "undefined" == typeof e && (e = t - 1, t = 0), t = Math.floor(t);
                    var i = Math.random();
                    return t + Math.floor(i * (e - t + 1))
                },
                o = function(t, e) {
                    return "undefined" == typeof e && (e = t, t = 0), t + (e - t) * Math.random()
                },
                s = function() {
                    var t = n(0, 255);
                    return 16 > t ? "0" + t.toString(16) : t.toString(16)
                },
                r = function() {
                    var t = s(),
                        e = s(),
                        i = s();
                    return "#" + t + e + i
                },
                a = function(t) {
                    return "undefined" == typeof t && (t = .5), Math.random() < t
                };
            e.exports = {
                nextInt: n,
                nextFloat: o,
                nextHex: s,
                nextColor: r,
                nextBoolean: a
            }
        }, {}],
        20: [function(t, e, i) {
            "use strict";

            function n(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">new Rectange(width, height)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for <span class="code">width</span>. Make sure you are passing finite numbers to <span class="code">new Rectangle(width, height)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">height</span>. Make sure you are passing finite numbers to <span class="code">new Rectangle(width, height)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                o.call(this), this.width = Math.max(0, t), this.height = Math.max(0, e), this.type = "Rectangle"
            }
            var o = t("./thing.js");
            n.prototype = new o, n.prototype.constructor = n, n.prototype.draw = function(t) {
                var e = t.getContext();
                e.save(), e.fillStyle = this.color.toString(), this.hasBorder && (e.lineWidth = this.lineWidth, e.strokeStyle = this.stroke.toString()), e.beginPath(), e.translate(this.x + this.width / 2, this.y + this.height / 2), e.rotate(this.rotation), e.rect(-this.width / 2, -this.height / 2, this.width, this.height), e.closePath(), this.hasBorder && e.stroke(), e.fill(), e.restore()
            }, n.prototype.containsPoint = function(t, e) {
                return t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.getHeight = function() {
                return this.height
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        21: [function(t, e, i) {
            "use strict";
            var n, o = t("./audioContext.js"),
                s = !1;
            try {
                if (window.TONE_SILENCE_VERSION_LOGGING = !0, n = t("tone"), !n.supported) throw new Error("Tone library not supported");
                s = !0, n.setContext(o()), window.Tone = n
            } catch (r) {
                console.log("Tone.js is not supported in this browser, you may not be able to make audio javascript programs. Please use the most up to date version of Chrome, Firefox, or Safari.")
            }
            var a;
            s ? (a = function(t, e) {
                t = t || 440, e = e || "sine", this.oscillator = new n.Oscillator(t, e).toMaster()
            }, a.prototype.setFrequency = function(t) {
                this.oscillator.frequency.value = t
            }, a.prototype.setVolume = function(t) {
                this.oscillator.volume.value = t
            }, a.prototype.getFrequency = function() {
                return this.oscillator.frequency.value
            }, a.prototype.getVolume = function() {
                return this.oscillator.volume.value
            }, a.prototype.setOscillatorType = function(t) {
                this.oscillator.type = t
            }, a.prototype.getOscillatorType = function() {
                return this.oscillator.type
            }, a.prototype.play = function() {
                this.oscillator.start()
            }, a.prototype.playFor = function(t) {
                this.oscillator.start(), this.oscillator.stop("+" + t)
            }, a.prototype.stop = function() {
                this.oscillator.stop()
            }, a.prototype.disconnect = function() {
                this.oscillator.disconnect()
            }, a.prototype.setEffect = function(t, e) {
                switch (t) {
                    case "distortion":
                        var i = new n.Distortion(e).toMaster();
                        return void this.oscillator.connect(i);
                    case "chebyshev":
                        var o = new n.Chebyshev(100 * e).toMaster();
                        return void this.oscillator.connect(o);
                    case "reverb":
                        var s = (new n.Freeverb).toMaster();
                        return s.wet.value = e, void this.oscillator.connect(s);
                    case "tremolo":
                        var r = (new n.Tremolo).toMaster().start();
                        return r.wet.value = e, void this.oscillator.connect(r);
                    case "vibrato":
                        var a = (new n.Vibrato).toMaster();
                        return a.wet.value = e, void this.oscillator.connect(a);
                    default:
                        return
                }
            }) : (a = function(t, e) {}, a.prototype.setFrequency = function(t) {}, a.prototype.setVolume = function(t) {}, a.prototype.getFrequency = function() {
                return 0
            }, a.prototype.getVolume = function() {
                return 0
            }, a.prototype.setOscillatorType = function(t) {}, a.prototype.getOscillatorType = function() {
                return "none"
            }, a.prototype.play = function() {}, a.prototype.playFor = function(t) {}, a.prototype.stop = function() {}, a.prototype.setEffect = function(t, e) {}, a.prototype.disconnect = function() {}), e.exports = a
        }, {
            "./audioContext.js": 8,
            tone: 29
        }],
        22: [function(t, e, i) {
            "use strict";

            function n(t, e) {
                if (arguments.length < 1) throw new Error('You should pass at least one argument to <span class="code">new Text(label, font)</span>. <span class="code">label</span> is a required parameter.');
                if ("string" != typeof t && "number" != typeof t) throw new TypeError('Invalid value for <span class="code">label</span>. You passed a value of type ' + typeof t + " but a string or number is required.");
                if (e = void 0 === e ? "20pt Arial" : e, "string" != typeof e) throw new TypeError('Invalid value for <span class="code">font</span>. You passed a value of type ' + typeof t + " but a string is required.");
                o.call(this), this.label = t, this.type = "Text", this.font = e, this.context = null, this.resetDimensions()
            }
            var o = t("./thing.js");
            n.prototype = new o, n.prototype.constructor = n, n.defaultContext = null, n.giveDefaultContext = function(t) {
                n.defaultContext = t.getContext()
            }, n.prototype.resetDimensions = function() {
                var t = this.context || n.defaultContext;
                t.font = this.font, this.width = t.measureText(this.label).width, this.height = 1.2 * t.measureText("m").width
            }, n.prototype.draw = function(t) {
                var e = t.getContext();
                this.context = e, e.save(), e.fillStyle = this.color.toString(), e.beginPath(), e.font = this.font, this.resetDimensions(), e.translate(this.x, this.y), e.rotate(this.rotation), e.fillText(this.label, 0, 0), e.closePath(), e.fill(), e.restore()
            }, n.prototype.setFont = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setFont</span>');
                if ("string" != typeof t) throw new TypeError('Invalid value passed to <span class="code">setFont</span>. You passed a value of type ' + typeof label + ", but a string is required.");
                this.font = t, this.resetDimensions()
            }, n.prototype.setLabel = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setLabel</span>');
                if ("string" != typeof t && "number" != typeof t) throw new TypeError('Invalid value passed to <span class="code">setLabel</span>. You passed a value of type ' + typeof t + ", but a string or number is required.");
                this.label = t, this.resetDimensions()
            }, n.prototype.setText = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setText</span>');
                if ("string" != typeof t && "number" != typeof t) throw new TypeError('Invalid value passed to <span class="code">setText</span>. You passed a value of type ' + typeof t + ", but a string or number is required.");
                this.label = t, this.resetDimensions()
            }, n.prototype.getLabel = function() {
                return this.label
            }, n.prototype.getText = function() {
                return this.label
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.getHeight = function() {
                return this.height
            }, n.prototype.containsPoint = function(t, e) {
                return t >= this.x && t <= this.x + this.width && e <= this.y && e >= this.y - this.height
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        23: [function(t, e, i) {
            "use strict";

            function n() {
                this.x = 0, this.y = 0, this.color = "#000000", this.stroke = "#000000", this.type = "Thing", this.lineWidth = 1, this.filled = !0, this.hasBorder = !1, this.rotation = 0
            }
            n.DEGREES = 0, n.RADIANS = 1, n.prototype.setFilled = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setFilled</span>');
                if ("boolean" != typeof t) throw new Error('Invalid value passed to <span class="code">setFilled</span>. Make sure you are passing a boolean value.');
                this.filled = t
            }, n.prototype.isFilled = function() {
                return this.filled
            }, n.prototype.setBorder = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setBorder</span>');
                if ("boolean" != typeof t) throw new Error('Invalid value passed to <span class="code">setBorder</span>. Make sure you are passing a boolean value.');
                this.hasBorder = t
            }, n.prototype.hasBorder = function() {
                return this.hasBorder
            }, n.prototype.setType = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setType</span>');
                this.type = t
            }, n.prototype.getType = function() {
                return this.type
            }, n.prototype.setPosition = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">setPosition(x, y)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for x-coordinate. Make sure you are passing finite numbers to <span class="code">setPosition(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for y-coordinate. Make sure you are passing finite numbers to <span class="code">setPosition(x, y)</span>. Did you forget the parentheses in <span class="code">getWidth()</span> or <span class="code">getHeight()</span>? Or did you perform a calculation on a variable that is not a number?');
                this.x = t, this.y = e
            }, n.prototype.setRotation = function(t, e) {
                if (arguments.length < 1 || arguments.length > 2) throw new Error('You should pass 1 or 2 arguments to <span class="code">setRotation(degrees, angleUnit)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for degrees. Make sure you are passing finite numbers to <span class="code">setRotation(degrees, angleUnit)</span>. Did you perform a calculation on a variable that is not a number?');
                if (e || (e = n.DEGREES), "number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">angleUnit</span>. Make sure you are passing finite numbers to <span class="code">setRotation(degrees, angleUnit)</span>');
                e == n.DEGREES ? this.rotation = t * Math.PI / 180 : this.rotation = t
            }, n.prototype.rotate = function(t, e) {
                if (arguments.length < 1 || arguments.length > 2) throw new Error('You should pass exactly 1 argument to <span class="code">rotate(degrees, angleUnit)</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid value for degrees. Make sure you are passing finite numbers to <span class="code">rotate(degrees, angleUnit)</span>. Did you perform a calculation on a variable that is not a number?');
                if (e || (e = n.DEGREES), "number" != typeof e || !isFinite(e)) throw new TypeError('Invalid value for <span class="code">angleUnit</span>. Make sure you are passing finite numbers to <span class="code">rotate(degrees, angleUnit)</span>');
                e == n.DEGREES ? this.rotation += t * Math.PI / 180 : this.rotation += t
            }, n.prototype.setColor = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setColor</span>');
                if (void 0 === t) throw new TypeError("Invalid color");
                this.color = t
            }, n.prototype.getColor = function() {
                return this.color
            }, n.prototype.setBorderColor = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setBorderColor</span>');
                if (void 0 === t) throw new TypeError("Invalid color.");
                this.stroke = t, this.hasBorder = !0
            }, n.prototype.getBorderColor = function() {
                return this.stroke
            }, n.prototype.setBorderWidth = function(t) {
                if (1 !== arguments.length) throw new Error('You should pass exactly 1 argument to <span class="code">setBorderWidth</span>');
                if ("number" != typeof t || !isFinite(t)) throw new Error('Invalid value for border width. Make sure you are passing a finite number to <span class="code">setBorderWidth</span>');
                this.lineWidth = t, this.hasBorder = !0
            }, n.prototype.getBorderWidth = function() {
                return this.lineWidth
            }, n.prototype.move = function(t, e) {
                if (2 !== arguments.length) throw new Error('You should pass exactly 2 arguments to <span class="code">move</span>');
                if ("number" != typeof t || !isFinite(t)) throw new TypeError('Invalid number passed for <span class="code">dx</span>. Make sure you are passing finite numbers to <span class="code">move(dx, dy)</span>');
                if ("number" != typeof e || !isFinite(e)) throw new TypeError('Invalid number passed for <span class="code">dy</span>. Make sure you are passing finite numbers to <span class="code">move(dx, dy)</span>');
                this.x += t, this.y += e
            }, n.prototype.getX = function() {
                return this.x
            }, n.prototype.getY = function() {
                return this.y
            }, n.prototype.draw = function() {}, n.prototype.containsPoint = function(t, e) {
                return !1
            }, e.exports = n
        }, {}],
        24: [function(t, e, i) {
            "use strict";

            function n(t) {
                if ("string" != typeof t) throw new TypeError('You must pass a string to <span class="code">new WebImage(filename)</span> that has the image\'s location.');
                o.call(this);
                var e = this;
                this.image = new Image, this.image.crossOrigin = "Anonymous", this.image.src = t, this.filename = t, this.width = r, this.height = r, this.image.onload = function() {
                    e.checkDimensions(), e.loadfn && e.loadfn()
                }, this.set = 0, this.type = "WebImage", this.displayFromData = !1, this.isCrossOrigin = !1, this.data = r
            }
            var o = t("./thing.js"),
                s = -1,
                r = 1,
                a = 4,
                l = 0,
                h = 1,
                u = 2,
                c = 3;
            n.prototype = new o, n.prototype.constructor = n, n.prototype.loaded = function(t) {
                this.loadfn = t
            }, n.prototype.setImage = function(t) {
                var e = this;
                this.image = new Image, this.image.crossOrigin = "Anonymous", this.image.src = t, this.filename = t, this.width = r, this.height = r, this.image.onload = function() {
                    e.checkDimensions(), e.loadfn && e.loadfn()
                }, this.set = 0, this.displayFromData = !1, this.isCrossOrigin = !1, this.data = r
            }, n.prototype.checkDimensions = function() {
                this.width == r && (this.width = this.image.width, this.height = this.image.height)
            }, n.prototype.draw = function(t) {
                this.checkDimensions();
                var e = t.getContext("2d");
                e.save(), e.beginPath(), e.translate(this.x + this.width / 2, this.y + this.height / 2), e.rotate(this.rotation), this.displayFromData && this.data !== r ? e.putImageData(this.data, this.x, this.y) : e.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
                try {
                    this.data !== r || this.isCrossOrigin || (this.data = e.getImageData(this.x, this.y, this.width, this.height))
                } catch (i) {
                    this.data = r, this.isCrossOrigin = !0
                }
                e.closePath(), e.restore()
            }, n.prototype.getData = function(t) {
                var e = t.getContext();
                this.data = e.getImageData(this.x, this.y, this.width, this.height)
            }, n.prototype.containsPoint = function(t, e) {
                return t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.getHeight = function() {
                return this.height
            }, n.prototype.setSize = function(t, e) {
                this.width = t, this.height = e
            }, n.prototype.getPixel = function(t, e) {
                if (this.data === r || t > this.width || 0 > t || e > this.height || 0 > e) {
                    var i = [s, s, s, s];
                    return i;
                }
                var n = a * (e * this.width + t),
                    o = [this.data.data[n + l], this.data.data[n + h], this.data.data[n + u], this.data.data[n + c]];
                return o
            }, n.prototype.getRed = function(t, e) {
                return this.getPixel(t, e)[l]
            }, n.prototype.getGreen = function(t, e) {
                return this.getPixel(t, e)[h]
            }, n.prototype.getBlue = function(t, e) {
                return this.getPixel(t, e)[u]
            }, n.prototype.getAlpha = function(t, e) {
                return this.getPixel(t, e)[c]
            }, n.prototype.setPixel = function(t, e, i, n) {
                if (this.data !== r && !(0 > t || 0 > e || t > this.width || e > this.height)) {
                    var o = a * (e * this.width + t);
                    this.data.data[o + i] = n, this.displayFromData = !0
                }
            }, n.prototype.setRed = function(t, e, i) {
                this.setPixel(t, e, l, i)
            }, n.prototype.setGreen = function(t, e, i) {
                this.setPixel(t, e, h, i)
            }, n.prototype.setBlue = function(t, e, i) {
                this.setPixel(t, e, u, i)
            }, n.prototype.setAlpha = function(t, e, i) {
                this.setPixel(t, e, c, i)
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        25: [function(t, e, i) {
            "use strict";

            function n(t) {
                if ("string" != typeof t) throw new TypeError('You must pass a string to <span class="code">new WebVideo(filename)</span> that has the video\'s location.');
                o.call(this);
                var e = document.createElement("video");
                this.width = s, this.height = r, this.type = "WebVideo", this.browserSupportsVideo = !!e.canPlayType, this.browserSupportsVideo && (this.video = e, this.video.src = t, this.filename = t, this.video.autoplay = !0, this.video.loop = !1, this.video.crossOrigin = "anonymous")
            }
            var o = t("./thing.js"),
                s = 150,
                r = 150;
            n.prototype = new o, n.prototype.constructor = n, n.prototype.draw = function(t) {
                if (this.browserSupportsVideo) {
                    var e = t.getContext("2d");
                    e.drawImage(this.video, this.x, this.y, this.width, this.height)
                }
            }, n.prototype.containsPoint = function(t, e) {
                return this.browserSupportsVideo ? t >= this.x && t <= this.x + this.width && e >= this.y && e <= this.y + this.height : !1
            }, n.prototype.getWidth = function() {
                return this.width
            }, n.prototype.getHeight = function() {
                return this.height
            }, n.prototype.setSize = function(t, e) {
                this.width = t, this.height = e
            }, n.prototype.setAutoplay = function(t) {
                this.browserSupportsVideo && (this.video.autoplay = t)
            }, n.prototype.setLoop = function(t) {
                this.browserSupportsVideo && (this.video.loop = t)
            }, n.prototype.setMuted = function(t) {
                this.browserSupportsVideo && (this.video.muted = t)
            }, n.prototype.play = function() {
                this.browserSupportsVideo && this.video.play()
            }, n.prototype.pause = function() {
                this.browserSupportsVideo && this.video.pause()
            }, n.prototype.stop = function() {
                this.browserSupportsVideo && (this.video.pause(), this.video.currentTime = 0)
            }, n.prototype.isPlaying = function() {
                return this.browserSupportsVideo ? !(this.video.paused || this.video.ended) : !1
            }, n.prototype.isMuted = function() {
                return this.browserSupportsVideo ? this.video.muted : !1
            }, n.prototype.onReadyToPlay = function(t) {
                this.browserSupportsVideo && (this.video.oncanplay = t)
            }, e.exports = n
        }, {
            "./thing.js": 23
        }],
        26: [function(require, module, exports) {
            "use strict";

            function linesWithoutSemicolons(t) {
                var e = window.jslint(t),
                    i = e.warnings,
                    n = [];
                return i && i.length && _.each(i, function(t) {
                    t && "expected_a_b" == t.code && ";" == t.a && n.push(t.line + 1)
                }), n
            }

            function removeComments(t) {
                t = t.split("");
                for (var e = {
                    singleQuote: !1,
                    doubleQuote: !1,
                    blockComment: !1,
                    lineComment: !1,
                    condComp: !1
                }, i = 0, n = t.length; n > i; i++)
                    if (e.singleQuote) "'" === t[i] && "\\" !== t[i - 1] && (e.singleQuote = !1);
                    else if (e.doubleQuote) '"' === t[i] && "\\" !== t[i - 1] && (e.doubleQuote = !1);
                    else if (e.blockComment) "*" === t[i] && "/" === t[i + 1] && ("\n" !== t[i + 1] && (t[i + 1] = ""), e.blockComment = !1), "\n" !== t[i] && (t[i] = "");
                    else if (e.lineComment)("\n" === t[i + 1] || "\r" === t[i + 1]) && (e.lineComment = !1), "\n" !== t[i] && (t[i] = "");
                    else if (e.condComp) "@" === t[i - 2] && "*" === t[i - 1] && "/" === t[i] && (e.condComp = !1);
                    else if (e.doubleQuote = '"' === t[i], e.singleQuote = "'" === t[i], "/" === t[i]) {
                        if ("*" === t[i + 1] && "@" === t[i + 2]) {
                            e.condComp = !0;
                            continue
                        }
                        if ("*" === t[i + 1]) {
                            "\n" !== t[i] && (t[i] = ""), e.blockComment = !0;
                            continue
                        }
                        if ("/" === t[i + 1]) {
                            "\n" !== t[i] && (t[i] = ""), e.lineComment = !0;
                            continue
                        }
                    }
                return t.join("")
            }

            function lineNumberFromError(t) {
                var e = -1;
                t.stack.replace(/<anonymous>:(.*):/gm, function(t, i, n, o) {
                    -1 == e && (e = parseInt(i))
                });
                return e
            }

            function generateCodeArray(t) {
                var e = t.split("\n");
                return e
            }

            function safeEditorCode(t, e) {
                e = e || {};
                var i = e.fnOnError || function() {},
                    n = e.toTryArgs || [],
                    o = e.errorType || "eval";
                try {
                    return t.apply(null, n)
                } catch (s) {
                    return window.CHS && window.CHS.PubSub.trigger("editorError:handle", s, o), i()
                }
            }

            function safeEval(code, context, contextName) {
                var __context__ = context;
                code = "(function(" + contextName + "){" + code, code += "})(__context__);";
                var fnToTry = function() {
                        return {
                            result: eval(code),
                            hasError: !1
                        }
                    },
                    fnOnError = function() {
                        return {
                            hasError: !0
                        }
                    };
                return safeEditorCode(fnToTry, {
                    fnOnError: fnOnError,
                    errorType: "eval"
                })
            }

            function testInfiniteLoops(t) {
                try {
                    t = "function start(){}\n" + t, t += "\nstart();";
                    for (var e = new Interpreter(t), i = 2e4, n = 0; !e.paused_ && e.step() && i >= n;) n++;
                    if (n >= i) return !0
                } catch (o) {
                    return !1
                }
            }

            function safeSkulpt() {
                safeEditorCode(window.Sk.importMainWithBody, {
                    errorType: "skulpt",
                    toTryArgs: arguments
                })
            }

            function safeCallback(t, e) {
                return function() {
                    var i = {};
                    return i.fnOnError = e, i.toTryArgs = arguments, safeEditorCode(t, i)
                }
            }

            function safeSetInterval(t, e, i) {
                var n = function() {
                        clearInterval(s)
                    },
                    o = safeCallback(t, n),
                    s = setInterval(o, i, e);
                return s
            }
            module.exports = {
                linesWithoutSemicolons: linesWithoutSemicolons,
                removeComments: removeComments,
                lineNumberFromError: lineNumberFromError,
                generateCodeArray: generateCodeArray,
                safeSkulpt: safeSkulpt,
                safeEval: safeEval,
                safeCallback: safeCallback,
                safeSetInterval: safeSetInterval,
                testInfiniteLoops: testInfiniteLoops
            }
        }, {}],
        27: [function(t, e, i) {
            "use strict";
            var n = {};
            n = {
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                ENTER: 13,
                SHIFT: 16,
                SPACE: 32,
                BACKSPACE: 8,
                TAB: 9,
                CTRL: 17,
                ALT: 18,
                CAPS_LOCK: 20,
                LEFT_COMMAND: 91,
                LEFT_WINDOW: 91,
                RIGHT_WINDOW: 92,
                RIGHT_COMMAND: 93,
                SELECT: 93
            }, n.digit = function(t) {
                return t %= 10, t + 48
            }, n.letter = function(t) {
                return 0 === t.length ? null : t.toUpperCase().charCodeAt(0)
            }, n.nonEditingKeys = [n.LEFT, n.RIGHT, n.UP, n.DOWN, n.CTRL, n.SHIFT, n.ALT, n.CAPS_LOCK, n.LEFT_COMMAND, n.RIGHT_COMMAND, n.SELECT, n.LEFT_WINDOW, n.RIGHT_WINDOW], n.isEditingKey = function(t) {
                return -1 === n.nonEditingKeys.indexOf(t)
            }, e.exports = n
        }, {}],
        28: [function(t, e, i) {
            ! function(t, i) {
                "undefined" != typeof e ? e.exports = i() : "function" == typeof define && "object" == typeof define.amd ? define(i) : this[t] = i()
            }("domready", function() {
                var t, e = [],
                    i = document,
                    n = i.documentElement.doScroll,
                    o = "DOMContentLoaded",
                    s = (n ? /^loaded|^c/ : /^loaded|^i|^c/).test(i.readyState);
                return s || i.addEventListener(o, t = function() {
                    for (i.removeEventListener(o, t), s = 1; t = e.shift();) t()
                }),
                    function(t) {
                        s ? setTimeout(t, 0) : e.push(t)
                    }
            })
        }, {}],
        29: [function(t, e, i) {
            ! function(t, i) {
                "function" == typeof define && define.amd ? define(function() {
                    return i()
                }) : "object" == typeof e ? e.exports = i() : t.Tone = i()
            }(this, function() {
                "use strict";

                function t(t) {
                    i = t()
                }

                function e(t) {
                    t(i)
                }
                var i;
                return t(function() {
                    var t = function() {
                        if (!(this instanceof t)) throw new Error("constructor needs to be called with the 'new' keyword")
                    };
                    t.prototype.toString = function() {
                        for (var e in t) {
                            var i = e[0].match(/^[A-Z]$/),
                                n = t[e] === this.constructor;
                            if (t.isFunction(t[e]) && i && n) return e
                        }
                        return "Tone"
                    }, t.prototype.dispose = function() {
                        return this
                    }, t.prototype.set = function(e, i, n) {
                        if (t.isObject(e)) n = i;
                        else if (t.isString(e)) {
                            var o = {};
                            o[e] = i, e = o
                        }
                        t: for (var s in e) {
                            i = e[s];
                            var r = this;
                            if (-1 !== s.indexOf(".")) {
                                for (var a = s.split("."), l = 0; l < a.length - 1; l++)
                                    if (r = r[a[l]], r instanceof t) {
                                        a.splice(0, l + 1);
                                        var h = a.join(".");
                                        r.set(h, i);
                                        continue t
                                    } s = a[a.length - 1]
                            }
                            var u = r[s];
                            t.isUndef(u) || (t.Signal && u instanceof t.Signal || t.Param && u instanceof t.Param ? u.value !== i && (t.isUndef(n) ? u.value = i : u.rampTo(i, n)) : u instanceof AudioParam ? u.value !== i && (u.value = i) : t.TimeBase && u instanceof t.TimeBase ? r[s] = i : u instanceof t ? u.set(i) : u !== i && (r[s] = i))
                        }
                        return this
                    }, t.prototype.get = function(e) {
                        t.isUndef(e) ? e = this._collectDefaults(this.constructor) : t.isString(e) && (e = [e]);
                        for (var i = {}, n = 0; n < e.length; n++) {
                            var o = e[n],
                                s = this,
                                r = i;
                            if (-1 !== o.indexOf(".")) {
                                for (var a = o.split("."), l = 0; l < a.length - 1; l++) {
                                    var h = a[l];
                                    r[h] = r[h] || {}, r = r[h], s = s[h]
                                }
                                o = a[a.length - 1]
                            }
                            var u = s[o];
                            t.isObject(e[o]) ? r[o] = u.get() : t.Signal && u instanceof t.Signal ? r[o] = u.value : t.Param && u instanceof t.Param ? r[o] = u.value : u instanceof AudioParam ? r[o] = u.value : u instanceof t ? r[o] = u.get() : !t.isFunction(u) && t.isDefined(u) && (r[o] = u)
                        }
                        return i
                    }, t.prototype._collectDefaults = function(e) {
                        var i = [];
                        if (t.isDefined(e.defaults) && (i = Object.keys(e.defaults)), t.isDefined(e._super))
                            for (var n = this._collectDefaults(e._super), o = 0; o < n.length; o++) - 1 === i.indexOf(n[o]) && i.push(n[o]);
                        return i
                    }, t.defaults = function(e, i, n) {
                        var o = {};
                        if (1 === e.length && t.isObject(e[0])) o = e[0];
                        else
                            for (var s = 0; s < i.length; s++) o[i[s]] = e[s];
                        return t.isDefined(n.defaults) ? t.defaultArg(o, n.defaults) : t.isObject(n) ? t.defaultArg(o, n) : o
                    }, t.defaultArg = function(e, i) {
                        if (t.isObject(e) && t.isObject(i)) {
                            var n = {};
                            for (var o in e) n[o] = t.defaultArg(i[o], e[o]);
                            for (var s in i) n[s] = t.defaultArg(e[s], i[s]);
                            return n
                        }
                        return t.isUndef(e) ? i : e
                    }, t.connectSeries = function() {
                        for (var e = arguments[0], i = 1; i < arguments.length; i++) {
                            var n = arguments[i];
                            e.connect(n), e = n
                        }
                        return t
                    }, t.isUndef = function(t) {
                        return "undefined" == typeof t
                    }, t.isDefined = function(e) {
                        return !t.isUndef(e)
                    }, t.isFunction = function(t) {
                        return "function" == typeof t
                    }, t.isNumber = function(t) {
                        return "number" == typeof t
                    }, t.isObject = function(t) {
                        return "[object Object]" === Object.prototype.toString.call(t) && t.constructor === Object
                    }, t.isBoolean = function(t) {
                        return "boolean" == typeof t
                    }, t.isArray = function(t) {
                        return Array.isArray(t)
                    }, t.isString = function(t) {
                        return "string" == typeof t
                    }, t.isNote = function(e) {
                        return t.isString(e) && /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(e)
                    }, t.noOp = function() {}, t.prototype._readOnly = function(t) {
                        if (Array.isArray(t))
                            for (var e = 0; e < t.length; e++) this._readOnly(t[e]);
                        else Object.defineProperty(this, t, {
                            writable: !1,
                            enumerable: !0
                        })
                    }, t.prototype._writable = function(t) {
                        if (Array.isArray(t))
                            for (var e = 0; e < t.length; e++) this._writable(t[e]);
                        else Object.defineProperty(this, t, {
                            writable: !0
                        })
                    }, t.State = {
                        Started: "started",
                        Stopped: "stopped",
                        Paused: "paused"
                    }, t.equalPowerScale = function(t) {
                        var e = .5 * Math.PI;
                        return Math.sin(t * e)
                    }, t.dbToGain = function(t) {
                        return Math.pow(10, t / 20)
                    }, t.gainToDb = function(t) {
                        return 20 * (Math.log(t) / Math.LN10)
                    }, t.intervalToFrequencyRatio = function(t) {
                        return Math.pow(2, t / 12)
                    }, t.prototype.now = function() {
                        return t.context.now()
                    }, t.now = function() {
                        return t.context.now()
                    }, t.extend = function(e, i) {
                        function n() {}
                        t.isUndef(i) && (i = t), n.prototype = i.prototype, e.prototype = new n, e.prototype.constructor = e, e._super = i
                    };
                    var e = null;
                    return Object.defineProperty(t, "context", {
                        get: function() {
                            return e
                        },
                        set: function(i) {
                            e = t.Context && i instanceof t.Context ? i : new t.Context(i), t.Context.emit("init", e)
                        }
                    }), Object.defineProperty(t.prototype, "context", {
                        get: function() {
                            return t.context
                        }
                    }), t.setContext = function(e) {
                        t.context = e
                    }, Object.defineProperty(t.prototype, "blockTime", {
                        get: function() {
                            return 128 / this.context.sampleRate
                        }
                    }), Object.defineProperty(t.prototype, "sampleTime", {
                        get: function() {
                            return 1 / this.context.sampleRate
                        }
                    }), Object.defineProperty(t, "supported", {
                        get: function() {
                            var t = window.hasOwnProperty("AudioContext") || window.hasOwnProperty("webkitAudioContext"),
                                e = window.hasOwnProperty("Promise"),
                                i = window.hasOwnProperty("Worker");
                            return t && e && i
                        }
                    }), Object.defineProperty(t, "initialized", {
                        get: function() {
                            return null !== e
                        }
                    }), t.getContext = function(e) {
                        if (t.initialized) e(t.context);
                        else {
                            var i = function() {
                                e(t.context), t.Context.off("init", i)
                            };
                            t.Context.on("init", i)
                        }
                        return t
                    }, t.version = "r12", t
                }), e(function(t) {
                    return t.Emitter = function() {
                        t.call(this), this._events = {}
                    }, t.extend(t.Emitter), t.Emitter.prototype.on = function(t, e) {
                        for (var i = t.split(/\W+/), n = 0; n < i.length; n++) {
                            var o = i[n];
                            this._events.hasOwnProperty(o) || (this._events[o] = []), this._events[o].push(e)
                        }
                        return this
                    }, t.Emitter.prototype.once = function(t, e) {
                        var i = function() {
                            e.apply(this, arguments), this.off(t, i)
                        }.bind(this);
                        return this.on(t, i), this
                    }, t.Emitter.prototype.off = function(e, i) {
                        for (var n = e.split(/\W+/), o = 0; o < n.length; o++)
                            if (e = n[o], this._events.hasOwnProperty(e))
                                if (t.isUndef(i)) this._events[e] = [];
                                else
                                    for (var s = this._events[e], r = 0; r < s.length; r++) s[r] === i && s.splice(r, 1);
                        return this
                    }, t.Emitter.prototype.emit = function(t) {
                        if (this._events) {
                            var e = Array.apply(null, arguments).slice(1);
                            if (this._events.hasOwnProperty(t))
                                for (var i = this._events[t].slice(0), n = 0, o = i.length; o > n; n++) i[n].apply(this, e)
                        }
                        return this
                    }, t.Emitter.mixin = function(e) {
                        var i = ["on", "once", "off", "emit"];
                        e._events = {};
                        for (var n = 0; n < i.length; n++) {
                            var o = i[n],
                                s = t.Emitter.prototype[o];
                            e[o] = s
                        }
                        return t.Emitter
                    }, t.Emitter.prototype.dispose = function() {
                        return t.prototype.dispose.call(this), this._events = null, this
                    }, t.Emitter
                }), e(function(t) {
                    return t.Timeline = function() {
                        var e = t.defaults(arguments, ["memory"], t.Timeline);
                        t.call(this), this._timeline = [], this.memory = e.memory
                    }, t.extend(t.Timeline), t.Timeline.defaults = {
                        memory: 1 / 0
                    }, Object.defineProperty(t.Timeline.prototype, "length", {
                        get: function() {
                            return this._timeline.length
                        }
                    }), t.Timeline.prototype.add = function(e) {
                        if (t.isUndef(e.time)) throw new Error("Tone.Timeline: events must have a time attribute");
                        e.time = e.time.valueOf();
                        var i = this._search(e.time);
                        if (this._timeline.splice(i + 1, 0, e), this.length > this.memory) {
                            var n = this.length - this.memory;
                            this._timeline.splice(0, n)
                        }
                        return this
                    }, t.Timeline.prototype.remove = function(t) {
                        var e = this._timeline.indexOf(t);
                        return -1 !== e && this._timeline.splice(e, 1), this
                    }, t.Timeline.prototype.get = function(e, i) {
                        i = t.defaultArg(i, "time");
                        var n = this._search(e, i);
                        return -1 !== n ? this._timeline[n] : null
                    }, t.Timeline.prototype.peek = function() {
                        return this._timeline[0]
                    }, t.Timeline.prototype.shift = function() {
                        return this._timeline.shift()
                    }, t.Timeline.prototype.getAfter = function(e, i) {
                        i = t.defaultArg(i, "time");
                        var n = this._search(e, i);
                        return n + 1 < this._timeline.length ? this._timeline[n + 1] : null
                    }, t.Timeline.prototype.getBefore = function(e, i) {
                        i = t.defaultArg(i, "time");
                        var n = this._timeline.length;
                        if (n > 0 && this._timeline[n - 1][i] < e) return this._timeline[n - 1];
                        var o = this._search(e, i);
                        return o - 1 >= 0 ? this._timeline[o - 1] : null
                    }, t.Timeline.prototype.cancel = function(t) {
                        if (this._timeline.length > 1) {
                            var e = this._search(t);
                            if (e >= 0)
                                if (this._timeline[e].time === t) {
                                    for (var i = e; i >= 0 && this._timeline[i].time === t; i--) e = i;
                                    this._timeline = this._timeline.slice(0, e)
                                } else this._timeline = this._timeline.slice(0, e + 1);
                            else this._timeline = []
                        } else 1 === this._timeline.length && this._timeline[0].time >= t && (this._timeline = []);
                        return this
                    }, t.Timeline.prototype.cancelBefore = function(t) {
                        var e = this._search(t);
                        return e >= 0 && (this._timeline = this._timeline.slice(e + 1)), this
                    }, t.Timeline.prototype.previousEvent = function(t) {
                        var e = this._timeline.indexOf(t);
                        return e > 0 ? this._timeline[e - 1] : null
                    }, t.Timeline.prototype._search = function(e, i) {
                        if (0 === this._timeline.length) return -1;
                        i = t.defaultArg(i, "time");
                        var n = 0,
                            o = this._timeline.length,
                            s = o;
                        if (o > 0 && this._timeline[o - 1][i] <= e) return o - 1;
                        for (; s > n;) {
                            var r = Math.floor(n + (s - n) / 2),
                                a = this._timeline[r],
                                l = this._timeline[r + 1];
                            if (a[i] === e) {
                                for (var h = r; h < this._timeline.length; h++) {
                                    var u = this._timeline[h];
                                    u[i] === e && (r = h)
                                }
                                return r
                            }
                            if (a[i] < e && l[i] > e) return r;
                            a[i] > e ? s = r : n = r + 1
                        }
                        return -1
                    }, t.Timeline.prototype._iterate = function(e, i, n) {
                        i = t.defaultArg(i, 0), n = t.defaultArg(n, this._timeline.length - 1), this._timeline.slice(i, n + 1).forEach(function(t) {
                            e.call(this, t)
                        }.bind(this))
                    }, t.Timeline.prototype.forEach = function(t) {
                        return this._iterate(t), this
                    }, t.Timeline.prototype.forEachBefore = function(t, e) {
                        var i = this._search(t);
                        return -1 !== i && this._iterate(e, 0, i), this
                    }, t.Timeline.prototype.forEachAfter = function(t, e) {
                        var i = this._search(t);
                        return this._iterate(e, i + 1), this
                    }, t.Timeline.prototype.forEachBetween = function(t, e, i) {
                        var n = this._search(t),
                            o = this._search(e);
                        return -1 !== n && -1 !== o ? (this._timeline[n].time !== t && (n += 1), this._timeline[o].time === e && (o -= 1), this._iterate(i, n, o)) : -1 === n && this._iterate(i, 0, o), this
                    }, t.Timeline.prototype.forEachFrom = function(t, e) {
                        for (var i = this._search(t); i >= 0 && this._timeline[i].time >= t;) i--;
                        return this._iterate(e, i + 1), this
                    }, t.Timeline.prototype.forEachAtTime = function(t, e) {
                        var i = this._search(t);
                        return -1 !== i && this._iterate(function(i) {
                            i.time === t && e.call(this, i)
                        }, 0, i), this
                    }, t.Timeline.prototype.dispose = function() {
                        return t.prototype.dispose.call(this), this._timeline = null, this
                    }, t.Timeline
                }), e(function(t) {
                    if (t.supported) {
                        !window.hasOwnProperty("OfflineAudioContext") && window.hasOwnProperty("webkitOfflineAudioContext") && (window.OfflineAudioContext = window.webkitOfflineAudioContext);
                        var e = new OfflineAudioContext(1, 1, 44100),
                            i = e.startRendering();
                        i instanceof Promise || (OfflineAudioContext.prototype._native_startRendering = OfflineAudioContext.prototype.startRendering, OfflineAudioContext.prototype.startRendering = function() {
                            return new Promise(function(t) {
                                this.oncomplete = function(e) {
                                    t(e.renderedBuffer)
                                }, this._native_startRendering()
                            }.bind(this))
                        })
                    }
                }), e(function(t) {
                    if (t.supported) {
                        !window.hasOwnProperty("AudioContext") && window.hasOwnProperty("webkitAudioContext") && (window.AudioContext = window.webkitAudioContext), AudioContext.prototype.close || (AudioContext.prototype.close = function() {
                            return t.isFunction(this.suspend) && this.suspend(), Promise.resolve()
                        }), AudioContext.prototype.resume || (AudioContext.prototype.resume = function() {
                            return Promise.resolve()
                        }), !AudioContext.prototype.createGain && AudioContext.prototype.createGainNode && (AudioContext.prototype.createGain = AudioContext.prototype.createGainNode), !AudioContext.prototype.createDelay && AudioContext.prototype.createDelayNode && (AudioContext.prototype.createDelay = AudioContext.prototype.createDelayNode);
                        var e = !1,
                            i = new OfflineAudioContext(1, 1, 44100),
                            n = new Uint32Array([1179011410, 48, 1163280727, 544501094, 16, 131073, 44100, 176400, 1048580, 1635017060, 8, 0, 0, 0, 0]).buffer;
                        try {
                            var o = i.decodeAudioData(n);
                            o instanceof Promise && (e = !0)
                        } catch (s) {
                            e = !1
                        }
                        e || (AudioContext.prototype._native_decodeAudioData = AudioContext.prototype.decodeAudioData, AudioContext.prototype.decodeAudioData = function(t) {
                            return new Promise(function(e, i) {
                                this._native_decodeAudioData(t, e, i)
                            }.bind(this))
                        })
                    }
                }), e(function(t) {
                    t.Context = function() {
                        t.Emitter.call(this);
                        var i = t.defaults(arguments, ["context"], t.Context);
                        if (!i.context && (i.context = new window.AudioContext, !i.context)) throw new Error("could not create AudioContext. Possibly too many AudioContexts running already.");
                        this._context = i.context;
                        for (var n in this._context) this._defineProperty(this._context, n);
                        this._latencyHint = i.latencyHint, this._constants = {}, this.lookAhead = i.lookAhead, this._computedUpdateInterval = 0, this._ticker = new e(this.emit.bind(this, "tick"), i.clockSource, i.updateInterval), this._timeouts = new t.Timeline, this._timeoutIds = 0, this.on("tick", this._timeoutLoop.bind(this))
                    }, t.extend(t.Context, t.Emitter), t.Emitter.mixin(t.Context), t.Context.defaults = {
                        clockSource: "worker",
                        latencyHint: "interactive",
                        lookAhead: .1,
                        updateInterval: .03
                    }, t.Context.prototype._defineProperty = function(e, i) {
                        t.isUndef(this[i]) && Object.defineProperty(this, i, {
                            get: function() {
                                return "function" == typeof e[i] ? e[i].bind(e) : e[i]
                            },
                            set: function(t) {
                                e[i] = t
                            }
                        })
                    }, t.Context.prototype.now = function() {
                        return this._context.currentTime + this.lookAhead
                    }, t.Context.prototype.ready = function() {
                        return new Promise(function(t) {
                            "running" === this._context.state ? t() : this._context.resume().then(function() {
                                t()
                            })
                        }.bind(this))
                    }, t.Context.prototype.close = function() {
                        return this._context.close().then(function() {
                            t.Context.emit("close", this)
                        }.bind(this))
                    }, t.Context.prototype.getConstant = function(t) {
                        if (this._constants[t]) return this._constants[t];
                        for (var e = this._context.createBuffer(1, 128, this._context.sampleRate), i = e.getChannelData(0), n = 0; n < i.length; n++) i[n] = t;
                        var o = this._context.createBufferSource();
                        return o.channelCount = 1, o.channelCountMode = "explicit", o.buffer = e, o.loop = !0, o.start(0), this._constants[t] = o, o
                    }, t.Context.prototype._timeoutLoop = function() {
                        for (var t = this.now(); this._timeouts && this._timeouts.length && this._timeouts.peek().time <= t;) this._timeouts.shift().callback()
                    }, t.Context.prototype.setTimeout = function(t, e) {
                        this._timeoutIds++;
                        var i = this.now();
                        return this._timeouts.add({
                            callback: t,
                            time: i + e,
                            id: this._timeoutIds
                        }), this._timeoutIds
                    }, t.Context.prototype.clearTimeout = function(t) {
                        return this._timeouts.forEach(function(e) {
                            e.id === t && this.remove(e)
                        }), this
                    }, Object.defineProperty(t.Context.prototype, "updateInterval", {
                        get: function() {
                            return this._ticker.updateInterval
                        },
                        set: function(t) {
                            this._ticker.updateInterval = t
                        }
                    }), Object.defineProperty(t.Context.prototype, "clockSource", {
                        get: function() {
                            return this._ticker.type
                        },
                        set: function(t) {
                            this._ticker.type = t
                        }
                    }), Object.defineProperty(t.Context.prototype, "latencyHint", {
                        get: function() {
                            return this._latencyHint
                        },
                        set: function(e) {
                            var i = e;
                            if (this._latencyHint = e, t.isString(e)) switch (e) {
                                case "interactive":
                                    i = .1, this._context.latencyHint = e;
                                    break;
                                case "playback":
                                    i = .8, this._context.latencyHint = e;
                                    break;
                                case "balanced":
                                    i = .25, this._context.latencyHint = e;
                                    break;
                                case "fastest":
                                    this._context.latencyHint = "interactive", i = .01
                            }
                            this.lookAhead = i, this.updateInterval = i / 3
                        }
                    }), t.Context.prototype.dispose = function() {
                        return this.close().then(function() {
                            t.Emitter.prototype.dispose.call(this), this._ticker.dispose(), this._ticker = null, this._timeouts.dispose(), this._timeouts = null;
                            for (var e in this._constants) this._constants[e].disconnect();
                            this._constants = null
                        }.bind(this))
                    };
                    var e = function(e, i, n) {
                        this._type = i, this._updateInterval = n, this._callback = t.defaultArg(e, t.noOp), this._createClock()
                    };
                    return e.Type = {
                        Worker: "worker",
                        Timeout: "timeout",
                        Offline: "offline"
                    }, e.prototype._createWorker = function() {
                        window.URL = window.URL || window.webkitURL;
                        var t = new Blob(["var timeoutTime = " + (1e3 * this._updateInterval).toFixed(1) + ";self.onmessage = function(msg){	timeoutTime = parseInt(msg.data);};function tick(){	setTimeout(tick, timeoutTime);	self.postMessage('tick');}tick();"]),
                            e = URL.createObjectURL(t),
                            i = new Worker(e);
                        i.onmessage = this._callback.bind(this), this._worker = i
                    }, e.prototype._createTimeout = function() {
                        this._timeout = setTimeout(function() {
                            this._createTimeout(), this._callback()
                        }.bind(this), 1e3 * this._updateInterval)
                    }, e.prototype._createClock = function() {
                        if (this._type === e.Type.Worker) try {
                            this._createWorker()
                        } catch (t) {
                            this._type = e.Type.Timeout, this._createClock()
                        } else this._type === e.Type.Timeout && this._createTimeout()
                    }, Object.defineProperty(e.prototype, "updateInterval", {
                        get: function() {
                            return this._updateInterval
                        },
                        set: function(t) {
                            this._updateInterval = Math.max(t, 128 / 44100), this._type === e.Type.Worker && this._worker.postMessage(Math.max(1e3 * t, 1))
                        }
                    }), Object.defineProperty(e.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(t) {
                            this._disposeClock(), this._type = t, this._createClock()
                        }
                    }), e.prototype._disposeClock = function() {
                        this._timeout && (clearTimeout(this._timeout), this._timeout = null), this._worker && (this._worker.terminate(), this._worker.onmessage = null, this._worker = null)
                    }, e.prototype.dispose = function() {
                        this._disposeClock(), this._callback = null
                    }, t.getContext(function() {
                        function e(e, i, o) {
                            if (e.input) return o = t.defaultArg(o, 0), t.isArray(e.input) ? this.connect(e.input[o]) : this.connect(e.input, i, o);
                            try {
                                return e instanceof AudioNode ? (n.call(this, e, i, o), e) : (n.call(this, e, i), e)
                            } catch (s) {
                                throw new Error("error connecting to node: " + e + "\n" + s)
                            }
                        }

                        function i(e, i, n) {
                            if (e && e.input && t.isArray(e.input)) n = t.defaultArg(n, 0), this.disconnect(e.input[n], i, 0);
                            else if (e && e.input) this.disconnect(e.input, i, n);
                            else try {
                                    o.apply(this, arguments)
                                } catch (s) {
                                    throw new Error("error disconnecting node: " + e + "\n" + s)
                                }
                        }
                        var n = AudioNode.prototype.connect,
                            o = AudioNode.prototype.disconnect;
                        AudioNode.prototype.connect !== e && (AudioNode.prototype.connect = e, AudioNode.prototype.disconnect = i)
                    }), t.supported && !t.initialized ? (t.context = new t.Context, window.TONE_SILENCE_VERSION_LOGGING || console.log("%c * Tone.js " + t.version + " * ", "background: #000; color: #fff")) : t.supported || console.warn("This browser does not support Tone.js"), t.Context
                }), e(function(t) {
                    return t.AudioNode = function() {
                        t.call(this);
                        var e = t.defaults(arguments, ["context"], {
                            context: t.context
                        });
                        this._context = e.context
                    }, t.extend(t.AudioNode), Object.defineProperty(t.AudioNode.prototype, "context", {
                        get: function() {
                            return this._context
                        }
                    }), t.AudioNode.prototype.createInsOuts = function(t, e) {
                        1 === t ? this.input = this.context.createGain() : t > 1 && (this.input = new Array(t)), 1 === e ? this.output = this.context.createGain() : e > 1 && (this.output = new Array(e))
                    }, Object.defineProperty(t.AudioNode.prototype, "channelCount", {
                        get: function() {
                            return this.output.channelCount
                        },
                        set: function(t) {
                            return this.output.channelCount = t
                        }
                    }), Object.defineProperty(t.AudioNode.prototype, "channelCountMode", {
                        get: function() {
                            return this.output.channelCountMode
                        },
                        set: function(t) {
                            return this.output.channelCountMode = t
                        }
                    }), Object.defineProperty(t.AudioNode.prototype, "channelInterpretation", {
                        get: function() {
                            return this.output.channelInterpretation
                        },
                        set: function(t) {
                            return this.output.channelInterpretation = t
                        }
                    }), Object.defineProperty(t.AudioNode.prototype, "numberOfInputs", {
                        get: function() {
                            return this.input ? t.isArray(this.input) ? this.input.length : 1 : 0
                        }
                    }), Object.defineProperty(t.AudioNode.prototype, "numberOfOutputs", {
                        get: function() {
                            return this.output ? t.isArray(this.output) ? this.output.length : 1 : 0
                        }
                    }), t.AudioNode.prototype._onConnect = function() {}, t.AudioNode.prototype.connect = function(e, i, n) {
                        return e._onConnect && e._onConnect(this), t.isArray(this.output) ? (i = t.defaultArg(i, 0), this.output[i].connect(e, 0, n)) : this.output.connect(e, i, n), this
                    }, t.AudioNode.prototype.disconnect = function(e, i, n) {
                        t.isArray(this.output) ? t.isNumber(e) ? this.output[e].disconnect() : (i = t.defaultArg(i, 0), this.output[i].disconnect(e, 0, n)) : this.output.disconnect.apply(this.output, arguments)
                    }, t.AudioNode.prototype.chain = function() {
                        for (var t = this, e = 0; e < arguments.length; e++) {
                            var i = arguments[e];
                            t.connect(i), t = i
                        }
                        return this
                    }, t.AudioNode.prototype.fan = function() {
                        for (var t = 0; t < arguments.length; t++) this.connect(arguments[t]);
                        return this
                    }, window.AudioNode && (AudioNode.prototype.chain = t.AudioNode.prototype.chain, AudioNode.prototype.fan = t.AudioNode.prototype.fan), t.AudioNode.prototype.dispose = function() {
                        return t.isDefined(this.input) && (this.input instanceof AudioNode && this.input.disconnect(), this.input = null), t.isDefined(this.output) && (this.output instanceof AudioNode && this.output.disconnect(), this.output = null), this._context = null, this
                    }, t.AudioNode
                }), e(function(t) {
                    return t.SignalBase = function() {
                        t.AudioNode.call(this)
                    }, t.extend(t.SignalBase, t.AudioNode), t.SignalBase.prototype.connect = function(e, i, n) {
                        return t.Signal && t.Signal === e.constructor || t.Param && t.Param === e.constructor ? (e._param.cancelScheduledValues(0), e._param.value = 0, e.overridden = !0) : e instanceof AudioParam && (e.cancelScheduledValues(0), e.value = 0), t.AudioNode.prototype.connect.call(this, e, i, n), this
                    }, t.SignalBase
                }), e(function(t) {
                    if (t.supported) {
                        var e = navigator.userAgent.toLowerCase(),
                            i = e.includes("safari") && !e.includes("chrome");
                        if (i) {
                            var n = function(t) {
                                this._internalNode = this.input = this.output = t._native_createWaveShaper(), this._curve = null;
                                for (var e in this._internalNode) this._defineProperty(this._internalNode, e)
                            };
                            Object.defineProperty(n.prototype, "curve", {
                                get: function() {
                                    return this._curve
                                },
                                set: function(t) {
                                    this._curve = t;
                                    var e = new Float32Array(t.length + 1);
                                    e.set(t, 1), e[0] = t[0], this._internalNode.curve = e
                                }
                            }), n.prototype._defineProperty = function(e, i) {
                                t.isUndef(this[i]) && Object.defineProperty(this, i, {
                                    get: function() {
                                        return "function" == typeof e[i] ? e[i].bind(e) : e[i]
                                    },
                                    set: function(t) {
                                        e[i] = t
                                    }
                                })
                            }, AudioContext.prototype._native_createWaveShaper = AudioContext.prototype.createWaveShaper, AudioContext.prototype.createWaveShaper = function() {
                                return new n(this)
                            }
                        }
                    }
                }), e(function(t) {
                    return t.WaveShaper = function(e, i) {
                        t.SignalBase.call(this), this._shaper = this.input = this.output = this.context.createWaveShaper(), this._curve = null, Array.isArray(e) ? this.curve = e : isFinite(e) || t.isUndef(e) ? this._curve = new Float32Array(t.defaultArg(e, 1024)) : t.isFunction(e) && (this._curve = new Float32Array(t.defaultArg(i, 1024)), this.setMap(e))
                    }, t.extend(t.WaveShaper, t.SignalBase), t.WaveShaper.prototype.setMap = function(t) {
                        for (var e = new Array(this._curve.length), i = 0, n = this._curve.length; n > i; i++) {
                            var o = i / (n - 1) * 2 - 1;
                            e[i] = t(o, i)
                        }
                        return this.curve = e, this
                    }, Object.defineProperty(t.WaveShaper.prototype, "curve", {
                        get: function() {
                            return this._shaper.curve
                        },
                        set: function(t) {
                            this._curve = new Float32Array(t), this._shaper.curve = this._curve
                        }
                    }), Object.defineProperty(t.WaveShaper.prototype, "oversample", {
                        get: function() {
                            return this._shaper.oversample
                        },
                        set: function(t) {
                            if (!["none", "2x", "4x"].includes(t)) throw new RangeError("Tone.WaveShaper: oversampling must be either 'none', '2x', or '4x'");
                            this._shaper.oversample = t
                        }
                    }), t.WaveShaper.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._shaper.disconnect(), this._shaper = null, this._curve = null, this
                    }, t.WaveShaper
                }), e(function(t) {
                    return t.TimeBase = function(e, i) {
                        if (!(this instanceof t.TimeBase)) return new t.TimeBase(e, i);
                        if (this._val = e, this._units = i, t.isUndef(this._units) && t.isString(this._val) && parseFloat(this._val) == this._val && "+" !== this._val.charAt(0)) this._val = parseFloat(this._val), this._units = this._defaultUnits;
                        else if (e && e.constructor === this.constructor) this._val = e._val, this._units = e._units;
                        else if (e instanceof t.TimeBase) switch (this._defaultUnits) {
                            case "s":
                                this._val = e.toSeconds();
                                break;
                            case "i":
                                this._val = e.toTicks();
                                break;
                            case "hz":
                                this._val = e.toFrequency();
                                break;
                            case "midi":
                                this._val = e.toMidi();
                                break;
                            default:
                                throw new Error("Unrecognized default units " + this._defaultUnits)
                        }
                    }, t.extend(t.TimeBase), t.TimeBase.prototype._expressions = {
                        n: {
                            regexp: /^(\d+)n(\.?)$/i,
                            method: function(t, e) {
                                t = parseInt(t);
                                var i = "." === e ? 1.5 : 1;
                                return 1 === t ? this._beatsToUnits(this._getTimeSignature()) * i : this._beatsToUnits(4 / t) * i
                            }
                        },
                        t: {
                            regexp: /^(\d+)t$/i,
                            method: function(t) {
                                return t = parseInt(t), this._beatsToUnits(8 / (3 * parseInt(t)))
                            }
                        },
                        m: {
                            regexp: /^(\d+)m$/i,
                            method: function(t) {
                                return this._beatsToUnits(parseInt(t) * this._getTimeSignature())
                            }
                        },
                        i: {
                            regexp: /^(\d+)i$/i,
                            method: function(t) {
                                return this._ticksToUnits(parseInt(t))
                            }
                        },
                        hz: {
                            regexp: /^(\d+(?:\.\d+)?)hz$/i,
                            method: function(t) {
                                return this._frequencyToUnits(parseFloat(t))
                            }
                        },
                        tr: {
                            regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/,
                            method: function(t, e, i) {
                                var n = 0;
                                return t && "0" !== t && (n += this._beatsToUnits(this._getTimeSignature() * parseFloat(t))), e && "0" !== e && (n += this._beatsToUnits(parseFloat(e))), i && "0" !== i && (n += this._beatsToUnits(parseFloat(i) / 4)), n
                            }
                        },
                        s: {
                            regexp: /^(\d+(?:\.\d+)?)s$/,
                            method: function(t) {
                                return this._secondsToUnits(parseFloat(t))
                            }
                        },
                        samples: {
                            regexp: /^(\d+)samples$/,
                            method: function(t) {
                                return parseInt(t) / this.context.sampleRate
                            }
                        },
                        "default": {
                            regexp: /^(\d+(?:\.\d+)?)$/,
                            method: function(t) {
                                return this._expressions[this._defaultUnits].method.call(this, t)
                            }
                        }
                    }, t.TimeBase.prototype._defaultUnits = "s", t.TimeBase.prototype._getBpm = function() {
                        return t.Transport ? t.Transport.bpm.value : 120
                    }, t.TimeBase.prototype._getTimeSignature = function() {
                        return t.Transport ? t.Transport.timeSignature : 4
                    }, t.TimeBase.prototype._getPPQ = function() {
                        return t.Transport ? t.Transport.PPQ : 192
                    }, t.TimeBase.prototype._now = function() {
                        return this.now()
                    }, t.TimeBase.prototype._frequencyToUnits = function(t) {
                        return 1 / t
                    }, t.TimeBase.prototype._beatsToUnits = function(t) {
                        return 60 / this._getBpm() * t
                    }, t.TimeBase.prototype._secondsToUnits = function(t) {
                        return t
                    }, t.TimeBase.prototype._ticksToUnits = function(t) {
                        return t * (this._beatsToUnits(1) / this._getPPQ())
                    }, t.TimeBase.prototype._noArg = function() {
                        return this._now()
                    }, t.TimeBase.prototype.valueOf = function() {
                        if (t.isUndef(this._val)) return this._noArg();
                        if (t.isString(this._val) && t.isUndef(this._units))
                            for (var e in this._expressions)
                                if (this._expressions[e].regexp.test(this._val.trim())) {
                                    this._units = e;
                                    break
                                } if (t.isDefined(this._units)) {
                            var i = this._expressions[this._units],
                                n = this._val.toString().trim().match(i.regexp);
                            return n ? i.method.apply(this, n.slice(1)) : i.method.call(this, parseFloat(this._val))
                        }
                        return this._val
                    }, t.TimeBase.prototype.toSeconds = function() {
                        return this.valueOf()
                    }, t.TimeBase.prototype.toFrequency = function() {
                        return 1 / this.toSeconds()
                    }, t.TimeBase.prototype.toSamples = function() {
                        return this.toSeconds() * this.context.sampleRate
                    }, t.TimeBase.prototype.toMilliseconds = function() {
                        return 1e3 * this.toSeconds()
                    }, t.TimeBase.prototype.dispose = function() {
                        this._val = null, this._units = null
                    }, t.TimeBase
                }), e(function(t) {
                    t.Frequency = function(e, i) {
                        return this instanceof t.Frequency ? void t.TimeBase.call(this, e, i) : new t.Frequency(e, i)
                    }, t.extend(t.Frequency, t.TimeBase), t.Frequency.prototype._expressions = Object.assign({}, t.TimeBase.prototype._expressions, {
                        midi: {
                            regexp: /^(\d+(?:\.\d+)?midi)/,
                            method: function(e) {
                                return "midi" === this._defaultUnits ? e : t.Frequency.mtof(e)
                            }
                        },
                        note: {
                            regexp: /^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,
                            method: function(i, n) {
                                var o = e[i.toLowerCase()],
                                    s = o + 12 * (parseInt(n) + 1);
                                return "midi" === this._defaultUnits ? s : t.Frequency.mtof(s)
                            }
                        },
                        tr: {
                            regexp: /^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,
                            method: function(t, e, i) {
                                var n = 1;
                                return t && "0" !== t && (n *= this._beatsToUnits(this._getTimeSignature() * parseFloat(t))), e && "0" !== e && (n *= this._beatsToUnits(parseFloat(e))), i && "0" !== i && (n *= this._beatsToUnits(parseFloat(i) / 4)), n
                            }
                        }
                    }), t.Frequency.prototype.transpose = function(e) {
                        return new this.constructor(this.valueOf() * t.intervalToFrequencyRatio(e))
                    }, t.Frequency.prototype.harmonize = function(t) {
                        return t.map(function(t) {
                            return this.transpose(t)
                        }.bind(this))
                    }, t.Frequency.prototype.toMidi = function() {
                        return t.Frequency.ftom(this.valueOf())
                    }, t.Frequency.prototype.toNote = function() {
                        var e = this.toFrequency(),
                            n = Math.log2(e / t.Frequency.A4),
                            o = Math.round(12 * n) + 57,
                            s = Math.floor(o / 12);
                        0 > s && (o += -12 * s);
                        var r = i[o % 12];
                        return r + s.toString()
                    }, t.Frequency.prototype.toSeconds = function() {
                        return 1 / t.TimeBase.prototype.toSeconds.call(this)
                    }, t.Frequency.prototype.toFrequency = function() {
                        return t.TimeBase.prototype.toFrequency.call(this)
                    }, t.Frequency.prototype.toTicks = function() {
                        var e = this._beatsToUnits(1),
                            i = this.valueOf() / e;
                        return Math.floor(i * t.Transport.PPQ)
                    }, t.Frequency.prototype._noArg = function() {
                        return 0
                    }, t.Frequency.prototype._frequencyToUnits = function(t) {
                        return t
                    }, t.Frequency.prototype._ticksToUnits = function(e) {
                        return 1 / (60 * e / (t.Transport.bpm.value * t.Transport.PPQ))
                    }, t.Frequency.prototype._beatsToUnits = function(e) {
                        return 1 / t.TimeBase.prototype._beatsToUnits.call(this, e)
                    }, t.Frequency.prototype._secondsToUnits = function(t) {
                        return 1 / t
                    }, t.Frequency.prototype._defaultUnits = "hz";
                    var e = {
                            cbb: -2,
                            cb: -1,
                            c: 0,
                            "c#": 1,
                            cx: 2,
                            dbb: 0,
                            db: 1,
                            d: 2,
                            "d#": 3,
                            dx: 4,
                            ebb: 2,
                            eb: 3,
                            e: 4,
                            "e#": 5,
                            ex: 6,
                            fbb: 3,
                            fb: 4,
                            f: 5,
                            "f#": 6,
                            fx: 7,
                            gbb: 5,
                            gb: 6,
                            g: 7,
                            "g#": 8,
                            gx: 9,
                            abb: 7,
                            ab: 8,
                            a: 9,
                            "a#": 10,
                            ax: 11,
                            bbb: 9,
                            bb: 10,
                            b: 11,
                            "b#": 12,
                            bx: 13
                        },
                        i = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
                    return t.Frequency.A4 = 440, t.Frequency.mtof = function(e) {
                        return t.Frequency.A4 * Math.pow(2, (e - 69) / 12)
                    }, t.Frequency.ftom = function(e) {
                        return 69 + Math.round(12 * Math.log2(e / t.Frequency.A4))
                    }, t.Frequency
                }), e(function(t) {
                    return t.Time = function(e, i) {
                        return this instanceof t.Time ? void t.TimeBase.call(this, e, i) : new t.Time(e, i)
                    }, t.extend(t.Time, t.TimeBase), t.Time.prototype._expressions = Object.assign({}, t.TimeBase.prototype._expressions, {
                        quantize: {
                            regexp: /^@(.+)/,
                            method: function(e) {
                                if (t.Transport) {
                                    var i = new this.constructor(e);
                                    return t.Transport.nextSubdivision(i)
                                }
                                return 0
                            }
                        },
                        now: {
                            regexp: /^\+(.+)/,
                            method: function(t) {
                                return this._now() + new this.constructor(t)
                            }
                        }
                    }), t.Time.prototype.quantize = function(e, i) {
                        i = t.defaultArg(i, 1);
                        var n = new this.constructor(e),
                            o = this.valueOf(),
                            s = Math.round(o / n),
                            r = s * n,
                            a = r - o;
                        return o + a * i
                    }, t.Time.prototype.toNotation = function() {
                        for (var e = this.toSeconds(), i = ["1m"], n = 1; 8 > n; n++) {
                            var o = Math.pow(2, n);
                            i.push(o + "n."), i.push(o + "n"), i.push(o + "t")
                        }
                        i.push("0");
                        var s = i[0],
                            r = t.Time(i[0]).toSeconds();
                        return i.forEach(function(i) {
                            var n = t.Time(i).toSeconds();
                            Math.abs(n - e) < Math.abs(r - e) && (s = i, r = n)
                        }), s
                    }, t.Time.prototype.toBarsBeatsSixteenths = function() {
                        var t = this._beatsToUnits(1),
                            e = this.valueOf() / t,
                            i = Math.floor(e / this._getTimeSignature()),
                            n = e % 1 * 4;
                        e = Math.floor(e) % this._getTimeSignature(), n = n.toString(), n.length > 3 && (n = parseFloat(parseFloat(n).toFixed(3)));
                        var o = [i, e, n];
                        return o.join(":")
                    }, t.Time.prototype.toTicks = function() {
                        var t = this._beatsToUnits(1),
                            e = this.valueOf() / t;
                        return Math.round(e * this._getPPQ())
                    }, t.Time.prototype.toSeconds = function() {
                        return this.valueOf()
                    }, t.Time.prototype.toMidi = function() {
                        return t.Frequency.ftom(this.toFrequency())
                    }, t.Time
                }), e(function(t) {
                    return t.TransportTime = function(e, i) {
                        return this instanceof t.TransportTime ? void t.Time.call(this, e, i) : new t.TransportTime(e, i)
                    }, t.extend(t.TransportTime, t.Time), t.TransportTime.prototype._now = function() {
                        return t.Transport.seconds
                    }, t.TransportTime
                }), e(function(t) {
                    return t.Type = {
                        Default: "number",
                        Time: "time",
                        Frequency: "frequency",
                        TransportTime: "transportTime",
                        Ticks: "ticks",
                        NormalRange: "normalRange",
                        AudioRange: "audioRange",
                        Decibels: "db",
                        Interval: "interval",
                        BPM: "bpm",
                        Positive: "positive",
                        Gain: "gain",
                        Cents: "cents",
                        Degrees: "degrees",
                        MIDI: "midi",
                        BarsBeatsSixteenths: "barsBeatsSixteenths",
                        Samples: "samples",
                        Hertz: "hertz",
                        Note: "note",
                        Milliseconds: "milliseconds",
                        Seconds: "seconds",
                        Notation: "notation"
                    }, t.prototype.toSeconds = function(e) {
                        return t.isNumber(e) ? e : t.isUndef(e) ? this.now() : t.isString(e) ? new t.Time(e).toSeconds() : e instanceof t.TimeBase ? e.toSeconds() : void 0
                    }, t.prototype.toFrequency = function(e) {
                        return t.isNumber(e) ? e : t.isString(e) || t.isUndef(e) ? new t.Frequency(e).valueOf() : e instanceof t.TimeBase ? e.toFrequency() : void 0
                    }, t.prototype.toTicks = function(e) {
                        return t.isNumber(e) || t.isString(e) ? new t.TransportTime(e).toTicks() : t.isUndef(e) ? t.Transport.ticks : e instanceof t.TimeBase ? e.toTicks() : void 0
                    }, t
                }), e(function(t) {
                    return t.Param = function() {
                        var e = t.defaults(arguments, ["param", "units", "convert"], t.Param);
                        t.AudioNode.call(this), this._param = this.input = e.param, this.units = e.units, this.convert = e.convert, this.overridden = !1, this._events = new t.Timeline(1e3), t.isDefined(e.value) && this._param && (this.value = e.value)
                    }, t.extend(t.Param, t.AudioNode), t.Param.defaults = {
                        units: t.Type.Default,
                        convert: !0,
                        param: void 0
                    }, Object.defineProperty(t.Param.prototype, "value", {
                        get: function() {
                            var t = this.now();
                            return this._toUnits(this.getValueAtTime(t))
                        },
                        set: function(t) {
                            this._initialValue = this._fromUnits(t), this.cancelScheduledValues(this.context.currentTime), this.setValueAtTime(t, this.context.currentTime)
                        }
                    }), Object.defineProperty(t.Param.prototype, "minValue", {
                        get: function() {
                            return this.units === t.Type.Time || this.units === t.Type.Frequency || this.units === t.Type.NormalRange || this.units === t.Type.Positive || this.units === t.Type.BPM ? 0 : this.units === t.Type.AudioRange ? -1 : this.units === t.Type.Decibels ? -(1 / 0) : this._param.minValue
                        }
                    }), Object.defineProperty(t.Param.prototype, "maxValue", {
                        get: function() {
                            return this.units === t.Type.NormalRange || this.units === t.Type.AudioRange ? 1 : this._param.maxValue
                        }
                    }), t.Param.prototype._fromUnits = function(e) {
                        if (!this.convert && !t.isUndef(this.convert) || this.overridden) return e;
                        switch (this.units) {
                            case t.Type.Time:
                                return this.toSeconds(e);
                            case t.Type.Frequency:
                                return this.toFrequency(e);
                            case t.Type.Decibels:
                                return t.dbToGain(e);
                            case t.Type.NormalRange:
                                return Math.min(Math.max(e, 0), 1);
                            case t.Type.AudioRange:
                                return Math.min(Math.max(e, -1), 1);
                            case t.Type.Positive:
                                return Math.max(e, 0);
                            default:
                                return e
                        }
                    }, t.Param.prototype._toUnits = function(e) {
                        if (!this.convert && !t.isUndef(this.convert)) return e;
                        switch (this.units) {
                            case t.Type.Decibels:
                                return t.gainToDb(e);
                            default:
                                return e
                        }
                    }, t.Param.prototype._minOutput = 1e-5, t.Param.AutomationType = {
                        Linear: "linearRampToValueAtTime",
                        Exponential: "exponentialRampToValueAtTime",
                        Target: "setTargetAtTime",
                        SetValue: "setValueAtTime"
                    }, t.Param.prototype.setValueAtTime = function(e, i) {
                        return i = this.toSeconds(i), e = this._fromUnits(e), this._events.add({
                            type: t.Param.AutomationType.SetValue,
                            value: e,
                            time: i
                        }), this._param.setValueAtTime(e, i), this
                    }, t.Param.prototype.getValueAtTime = function(e) {
                        e = this.toSeconds(e);
                        var i = this._events.getAfter(e),
                            n = this._events.get(e),
                            o = t.defaultArg(this._initialValue, this._param.defaultValue),
                            s = o;
                        if (null === n) s = o;
                        else if (n.type === t.Param.AutomationType.Target) {
                            var r, a = this._events.getBefore(n.time);
                            r = null === a ? o : a.value, s = this._exponentialApproach(n.time, r, n.value, n.constant, e)
                        } else s = null === i ? n.value : i.type === t.Param.AutomationType.Linear ? this._linearInterpolate(n.time, n.value, i.time, i.value, e) : i.type === t.Param.AutomationType.Exponential ? this._exponentialInterpolate(n.time, n.value, i.time, i.value, e) : n.value;
                        return s
                    }, t.Param.prototype.setRampPoint = function(t) {
                        t = this.toSeconds(t);
                        var e = this.getValueAtTime(t);
                        return this.cancelAndHoldAtTime(t), 0 === e && (e = this._minOutput), this.setValueAtTime(this._toUnits(e), t), this
                    }, t.Param.prototype.linearRampToValueAtTime = function(e, i) {
                        return e = this._fromUnits(e), i = this.toSeconds(i), this._events.add({
                            type: t.Param.AutomationType.Linear,
                            value: e,
                            time: i
                        }), this._param.linearRampToValueAtTime(e, i), this
                    }, t.Param.prototype.exponentialRampToValueAtTime = function(e, i) {
                        return e = this._fromUnits(e), e = Math.max(this._minOutput, e), i = this.toSeconds(i), this._events.add({
                            type: t.Param.AutomationType.Exponential,
                            time: i,
                            value: e
                        }), this._param.exponentialRampToValueAtTime(e, i), this
                    }, t.Param.prototype.exponentialRampTo = function(t, e, i) {
                        return i = this.toSeconds(i), this.setRampPoint(i), this.exponentialRampToValueAtTime(t, i + this.toSeconds(e)), this
                    }, t.Param.prototype.linearRampTo = function(t, e, i) {
                        return i = this.toSeconds(i), this.setRampPoint(i), this.linearRampToValueAtTime(t, i + this.toSeconds(e)), this
                    }, t.Param.prototype.targetRampTo = function(t, e, i) {
                        return i = this.toSeconds(i), this.setRampPoint(i), this.exponentialApproachValueAtTime(t, i, e), this
                    }, t.Param.prototype.exponentialApproachValueAtTime = function(t, e, i) {
                        var n = Math.log(this.toSeconds(i) + 1) / Math.log(200);
                        return e = this.toSeconds(e), this.setTargetAtTime(t, e, n)
                    }, t.Param.prototype.setTargetAtTime = function(e, i, n) {
                        if (e = this._fromUnits(e), 0 >= n) throw new Error("timeConstant must be greater than 0");
                        return i = this.toSeconds(i), this._events.add({
                            type: t.Param.AutomationType.Target,
                            value: e,
                            time: i,
                            constant: n
                        }), this._param.setTargetAtTime(e, i, n), this
                    }, t.Param.prototype.setValueCurveAtTime = function(e, i, n, o) {
                        o = t.defaultArg(o, 1), n = this.toSeconds(n), i = this.toSeconds(i), this.setValueAtTime(e[0] * o, i);
                        for (var s = n / (e.length - 1), r = 1; r < e.length; r++) this.linearRampToValueAtTime(e[r] * o, i + r * s);
                        return this
                    }, t.Param.prototype.cancelScheduledValues = function(t) {
                        return t = this.toSeconds(t), this._events.cancel(t), this._param.cancelScheduledValues(t), this
                    }, t.Param.prototype.cancelAndHoldAtTime = function(e) {
                        var i = this.getValueAtTime(e),
                            n = this._events.get(e),
                            o = this._events.getAfter(e);
                        return n && n.time === e ? o ? this._events.cancel(o.time) : this._events.cancel(e + 1e-6) : o && (this._events.cancel(o.time), this._param.cancelAndHoldAtTime || this._param.cancelScheduledValues(e), o.type === t.Param.AutomationType.Linear ? this._param.cancelAndHoldAtTime ? this._events.add({
                            type: t.Param.AutomationType.Linear,
                            value: i,
                            time: e
                        }) : this.linearRampToValueAtTime(i, e) : o.type === t.Param.AutomationType.Exponential && (this._param.cancelAndHoldAtTime ? this._events.add({
                            type: t.Param.AutomationType.Exponential,
                            value: i,
                            time: e
                        }) : this.exponentialRampToValueAtTime(i, e))), this._events.add({
                            type: t.Param.AutomationType.SetValue,
                            value: i,
                            time: e
                        }), this._param.cancelAndHoldAtTime ? this._param.cancelAndHoldAtTime(e) : this._param.setValueAtTime(i, e), this
                    }, t.Param.prototype.rampTo = function(e, i, n) {
                        return i = t.defaultArg(i, .1), this.units === t.Type.Frequency || this.units === t.Type.BPM || this.units === t.Type.Decibels ? this.exponentialRampTo(e, i, n) : this.linearRampTo(e, i, n), this
                    }, t.Param.prototype._exponentialApproach = function(t, e, i, n, o) {
                        return i + (e - i) * Math.exp(-(o - t) / n)
                    }, t.Param.prototype._linearInterpolate = function(t, e, i, n, o) {
                        return e + (n - e) * ((o - t) / (i - t))
                    }, t.Param.prototype._exponentialInterpolate = function(t, e, i, n, o) {
                        return e * Math.pow(n / e, (o - t) / (i - t))
                    }, t.Param.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._param = null, this._events = null, this
                    }, t.Param
                }), e(function(t) {
                    return t.OfflineContext = function(e, i, n) {
                        var o = new OfflineAudioContext(e, i * n, n);
                        t.Context.call(this, {
                            context: o,
                            clockSource: "offline",
                            lookAhead: 0,
                            updateInterval: 128 / n
                        }), this._duration = i, this._currentTime = 0
                    }, t.extend(t.OfflineContext, t.Context), t.OfflineContext.prototype.now = function() {
                        return this._currentTime
                    }, t.OfflineContext.prototype.render = function() {
                        for (; this._duration - this._currentTime >= 0;) this.emit("tick"), this._currentTime += this.blockTime;
                        return this._context.startRendering()
                    }, t.OfflineContext.prototype.close = function() {
                        return this._context = null, Promise.resolve()
                    }, t.OfflineContext
                }), e(function(t) {
                    if (t.supported) {
                        var e = navigator.userAgent.toLowerCase(),
                            i = e.includes("safari") && !e.includes("chrome") && e.includes("mobile");
                        i && (t.OfflineContext.prototype.createBufferSource = function() {
                            var t = this._context.createBufferSource(),
                                e = t.start;
                            return t.start = function(i) {
                                this.setTimeout(function() {
                                    e.call(t, i)
                                }.bind(this), 0)
                            }.bind(this), t
                        })
                    }
                }), e(function(t) {
                    return t.Gain = function() {
                        var e = t.defaults(arguments, ["gain", "units"], t.Gain);
                        t.AudioNode.call(this), this.input = this.output = this._gainNode = this.context.createGain(), this.gain = new t.Param({
                            param: this._gainNode.gain,
                            units: e.units,
                            value: e.gain,
                            convert: e.convert
                        }), this._readOnly("gain")
                    }, t.extend(t.Gain, t.AudioNode), t.Gain.defaults = {
                        gain: 1,
                        convert: !0
                    }, t.Gain.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this), this._gainNode.disconnect(), this._gainNode = null, this._writable("gain"), this.gain.dispose(), this.gain = null
                    }, t.Gain
                }), e(function(t) {
                    if (t.supported && !AudioContext.prototype.createConstantSource) {
                        var e = function(t) {
                            this.context = t;
                            for (var e = t.createBuffer(1, 128, t.sampleRate), i = e.getChannelData(0), n = 0; n < i.length; n++) i[n] = 1;
                            this._bufferSource = t.createBufferSource(), this._bufferSource.channelCount = 1, this._bufferSource.channelCountMode = "explicit", this._bufferSource.buffer = e, this._bufferSource.loop = !0;
                            var o = this._output = t.createGain();
                            this.offset = o.gain, this._bufferSource.connect(o)
                        };
                        e.prototype.start = function(t) {
                            return this._bufferSource.start(t), this
                        }, e.prototype.stop = function(t) {
                            return this._bufferSource.stop(t), this
                        }, e.prototype.connect = function() {
                            return this._output.connect.apply(this._output, arguments), this
                        }, e.prototype.disconnect = function() {
                            return this._output.disconnect.apply(this._output, arguments), this
                        }, AudioContext.prototype.createConstantSource = function() {
                            return new e(this)
                        }, t.Context.prototype.createConstantSource = function() {
                            return new e(this)
                        }
                    }
                }), e(function(t) {
                    return t.Signal = function() {
                        var e = t.defaults(arguments, ["value", "units"], t.Signal);
                        t.Param.call(this, e), this._proxies = [], this._sourceStarted = !1, this._constantSource = this.context.createConstantSource(), this._param = this._constantSource.offset, this.value = e.value, this.output = this._constantSource, this.input = this._param = this.output.offset
                    }, t.extend(t.Signal, t.Param), t.Signal.defaults = {
                        value: 0,
                        units: t.Type.Default,
                        convert: !0
                    }, t.Signal.prototype.connect = function(e) {
                        return this._isParam(e) && !this._sourceStarted ? (this._proxies.push(e), e.overridden = !0, this._applyAutomations(e)) : (t.SignalBase.prototype.connect.apply(this, arguments), this._sourceStarted || (this._sourceStarted = !0, this._constantSource.start(0))), this
                    }, t.Signal.prototype._isParam = function(e) {
                        return t.Param && t.Param === e.constructor || e instanceof AudioParam
                    }, t.Signal.prototype._connectProxies = function() {
                        this._sourceStarted || (this._sourceStarted = !0, this._constantSource.start(0)), this._proxies.forEach(function(e) {
                            t.SignalBase.prototype.connect.call(this, e), e._proxies && e._connectProxies()
                        }.bind(this))
                    }, t.Signal.prototype._onConnect = function(t) {
                        this._isParam(t) || this._connectProxies()
                    }, t.Signal.prototype._applyAutomations = function(t) {
                        var e = this.context.currentTime;
                        t.cancelScheduledValues(e);
                        var i = this.getValueAtTime(e);
                        t.setValueAtTime(i, e), this._events.forEachFrom(e, function(e) {
                            t[e.type](e.value, e.time, e.constant)
                        })
                    }, t.Signal.prototype.disconnect = function(e) {
                        if (this._proxies.includes(e)) {
                            var i = this._proxies.indexOf(e);
                            this._proxies.splice(i, 1)
                        } else e || (this._proxies = []);
                        return t.SignalBase.prototype.disconnect.apply(this, arguments)
                    }, t.Signal.prototype.getValueAtTime = function(e) {
                        return this._param.getValueAtTime ? this._param.getValueAtTime(e) : t.Param.prototype.getValueAtTime.call(this, e)
                    }, ["setValueAtTime", "linearRampToValueAtTime", "exponentialRampToValueAtTime", "setTargetAtTime"].forEach(function(e) {
                        var i = t.Signal.prototype[e];
                        t.Signal.prototype[e] = function() {
                            var t = arguments;
                            i.apply(this, arguments), t[0] = this._fromUnits(t[0]), t[1] = this.toSeconds(t[1]), this._proxies.forEach(function(i) {
                                i[e].apply(i, t)
                            })
                        }
                    }), ["cancelScheduledValues", "cancelAndHoldAtTime"].forEach(function(e) {
                        var i = t.Signal.prototype[e];
                        t.Signal.prototype[e] = function() {
                            var t = arguments;
                            i.apply(this, arguments), t[0] = this.toSeconds(t[0]), this._proxies.forEach(function(i) {
                                i[e].apply(i, t)
                            })
                        }
                    }), t.Signal.prototype.dispose = function() {
                        return t.Param.prototype.dispose.call(this), this._constantSource.disconnect(), this._constantSource = null, this._proxies = null, this
                    }, t.Signal
                }), e(function(t) {
                    return t.Pow = function(e) {
                        t.SignalBase.call(this), this._exp = t.defaultArg(e, 1), this._expScaler = this.input = this.output = new t.WaveShaper(this._expFunc(this._exp), 8192)
                    }, t.extend(t.Pow, t.SignalBase), Object.defineProperty(t.Pow.prototype, "value", {
                        get: function() {
                            return this._exp
                        },
                        set: function(t) {
                            this._exp = t, this._expScaler.setMap(this._expFunc(this._exp))
                        }
                    }), t.Pow.prototype._expFunc = function(t) {
                        return function(e) {
                            return Math.pow(Math.abs(e), t)
                        }
                    }, t.Pow.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._expScaler.dispose(), this._expScaler = null, this
                    }, t.Pow
                }), e(function(t) {
                    return t.Envelope = function() {
                        var e = t.defaults(arguments, ["attack", "decay", "sustain", "release"], t.Envelope);
                        t.AudioNode.call(this), this.attack = e.attack, this.decay = e.decay, this.sustain = e.sustain, this.release = e.release, this._attackCurve = "linear", this._releaseCurve = "exponential", this._sig = this.output = new t.Signal(0), this.attackCurve = e.attackCurve, this.releaseCurve = e.releaseCurve
                    }, t.extend(t.Envelope, t.AudioNode), t.Envelope.defaults = {
                        attack: .01,
                        decay: .1,
                        sustain: .5,
                        release: 1,
                        attackCurve: "linear",
                        releaseCurve: "exponential"
                    }, Object.defineProperty(t.Envelope.prototype, "value", {
                        get: function() {
                            return this.getValueAtTime(this.now())
                        }
                    }), Object.defineProperty(t.Envelope.prototype, "attackCurve", {
                        get: function() {
                            if (t.isString(this._attackCurve)) return this._attackCurve;
                            if (t.isArray(this._attackCurve)) {
                                for (var e in t.Envelope.Type)
                                    if (t.Envelope.Type[e].In === this._attackCurve) return e;
                                return this._attackCurve
                            }
                        },
                        set: function(e) {
                            if (t.Envelope.Type.hasOwnProperty(e)) {
                                var i = t.Envelope.Type[e];
                                t.isObject(i) ? this._attackCurve = i.In : this._attackCurve = i
                            } else {
                                if (!t.isArray(e)) throw new Error("Tone.Envelope: invalid curve: " + e);
                                this._attackCurve = e
                            }
                        }
                    }), Object.defineProperty(t.Envelope.prototype, "releaseCurve", {
                        get: function() {
                            if (t.isString(this._releaseCurve)) return this._releaseCurve;
                            if (t.isArray(this._releaseCurve)) {
                                for (var e in t.Envelope.Type)
                                    if (t.Envelope.Type[e].Out === this._releaseCurve) return e;
                                return this._releaseCurve
                            }
                        },
                        set: function(e) {
                            if (t.Envelope.Type.hasOwnProperty(e)) {
                                var i = t.Envelope.Type[e];
                                t.isObject(i) ? this._releaseCurve = i.Out : this._releaseCurve = i
                            } else {
                                if (!t.isArray(e)) throw new Error("Tone.Envelope: invalid curve: " + e);
                                this._releaseCurve = e
                            }
                        }
                    }), t.Envelope.prototype.triggerAttack = function(e, i) {
                        e = this.toSeconds(e);
                        var n = this.toSeconds(this.attack),
                            o = n,
                            s = this.toSeconds(this.decay);
                        i = t.defaultArg(i, 1);
                        var r = this.getValueAtTime(e);
                        if (r > 0) {
                            var a = 1 / o,
                                l = 1 - r;
                            o = l / a
                        }
                        if ("linear" === this._attackCurve) this._sig.linearRampTo(i, o, e);
                        else if ("exponential" === this._attackCurve) this._sig.targetRampTo(i, o, e);
                        else if (o > 0) {
                            this._sig.cancelAndHoldAtTime(e);
                            var h = this._attackCurve;
                            if (n > o) {
                                var u = 1 - o / n,
                                    c = Math.floor(u * this._attackCurve.length);
                                h = this._attackCurve.slice(c), h[0] = r
                            }
                            this._sig.setValueCurveAtTime(h, e, o, i)
                        }
                        return s && this._sig.targetRampTo(i * this.sustain, s, o + e), this
                    }, t.Envelope.prototype.triggerRelease = function(e) {
                        e = this.toSeconds(e);
                        var i = this.getValueAtTime(e);
                        if (i > 0) {
                            var n = this.toSeconds(this.release);
                            if ("linear" === this._releaseCurve) this._sig.linearRampTo(0, n, e);
                            else if ("exponential" === this._releaseCurve) this._sig.targetRampTo(0, n, e);
                            else {
                                var o = this._releaseCurve;
                                t.isArray(o) && (this._sig.cancelAndHoldAtTime(e), this._sig.setValueCurveAtTime(o, e, n, i))
                            }
                        }
                        return this
                    }, t.Envelope.prototype.getValueAtTime = function(t) {
                        return this._sig.getValueAtTime(t)
                    }, t.Envelope.prototype.triggerAttackRelease = function(t, e, i) {
                        return e = this.toSeconds(e), this.triggerAttack(e, i), this.triggerRelease(e + this.toSeconds(t)), this
                    }, t.Envelope.prototype.cancel = function(t) {
                        return this._sig.cancelScheduledValues(t), this
                    }, t.Envelope.prototype.connect = t.SignalBase.prototype.connect,
                        function() {
                            function e(t) {
                                for (var e = new Array(t.length), i = 0; i < t.length; i++) e[i] = 1 - t[i];
                                return e
                            }

                            function i(t) {
                                return t.slice(0).reverse()
                            }
                            var n, o, s = 128,
                                r = [];
                            for (n = 0; s > n; n++) r[n] = Math.sin(n / (s - 1) * (Math.PI / 2));
                            var a = [],
                                l = 6.4;
                            for (n = 0; s - 1 > n; n++) {
                                o = n / (s - 1);
                                var h = Math.sin(o * (2 * Math.PI) * l - Math.PI / 2) + 1;
                                a[n] = h / 10 + .83 * o
                            }
                            a[s - 1] = 1;
                            var u = [],
                                c = 5;
                            for (n = 0; s > n; n++) u[n] = Math.ceil(n / (s - 1) * c) / c;
                            var p = [];
                            for (n = 0; s > n; n++) o = n / (s - 1), p[n] = .5 * (1 - Math.cos(Math.PI * o));
                            var d = [];
                            for (n = 0; s > n; n++) {
                                o = n / (s - 1);
                                var f = 4 * Math.pow(o, 3) + .2,
                                    y = Math.cos(f * Math.PI * 2 * o);
                                d[n] = Math.abs(y * (1 - o))
                            }
                            t.Envelope.Type = {
                                linear: "linear",
                                exponential: "exponential",
                                bounce: {
                                    In: e(d),
                                    Out: d
                                },
                                cosine: {
                                    In: r,
                                    Out: i(r)
                                },
                                step: {
                                    In: u,
                                    Out: e(u)
                                },
                                ripple: {
                                    In: a,
                                    Out: e(a)
                                },
                                sine: {
                                    In: p,
                                    Out: e(p)
                                }
                            }
                        }(), t.Envelope.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._sig.dispose(), this._sig = null, this._attackCurve = null, this._releaseCurve = null, this
                    }, t.Envelope
                }), e(function(t) {
                    return t.AmplitudeEnvelope = function() {
                        t.Envelope.apply(this, arguments), this.input = this.output = new t.Gain, this._sig.connect(this.output.gain)
                    }, t.extend(t.AmplitudeEnvelope, t.Envelope), t.AmplitudeEnvelope.prototype.dispose = function() {
                        return t.Envelope.prototype.dispose.call(this), this
                    }, t.AmplitudeEnvelope
                }), e(function(t) {
                    t.supported && (AnalyserNode.prototype.getFloatTimeDomainData || (AnalyserNode.prototype.getFloatTimeDomainData = function(t) {
                        var e = new Uint8Array(t.length);
                        this.getByteTimeDomainData(e);
                        for (var i = 0; i < e.length; i++) t[i] = (e[i] - 128) / 128
                    }))
                }), e(function(t) {
                    return t.Analyser = function() {
                        var e = t.defaults(arguments, ["type", "size"], t.Analyser);
                        t.AudioNode.call(this), this._analyser = this.input = this.output = this.context.createAnalyser(), this._type = e.type, this._buffer = null, this.size = e.size, this.type = e.type
                    }, t.extend(t.Analyser, t.AudioNode), t.Analyser.defaults = {
                        size: 1024,
                        type: "fft",
                        smoothing: .8
                    }, t.Analyser.Type = {
                        Waveform: "waveform",
                        FFT: "fft"
                    }, t.Analyser.prototype.getValue = function() {
                        return this._type === t.Analyser.Type.FFT ? this._analyser.getFloatFrequencyData(this._buffer) : this._type === t.Analyser.Type.Waveform && this._analyser.getFloatTimeDomainData(this._buffer), this._buffer
                    }, Object.defineProperty(t.Analyser.prototype, "size", {
                        get: function() {
                            return this._analyser.frequencyBinCount
                        },
                        set: function(t) {
                            this._analyser.fftSize = 2 * t, this._buffer = new Float32Array(t)
                        }
                    }), Object.defineProperty(t.Analyser.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(e) {
                            if (e !== t.Analyser.Type.Waveform && e !== t.Analyser.Type.FFT) throw new TypeError("Tone.Analyser: invalid type: " + e);
                            this._type = e
                        }
                    }), Object.defineProperty(t.Analyser.prototype, "smoothing", {
                        get: function() {
                            return this._analyser.smoothingTimeConstant
                        },
                        set: function(t) {
                            this._analyser.smoothingTimeConstant = t
                        }
                    }), t.Analyser.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this), this._analyser.disconnect(), this._analyser = null, this._buffer = null
                    }, t.Analyser
                }), e(function(t) {
                    return t.Compressor = function() {
                        var e = t.defaults(arguments, ["threshold", "ratio"], t.Compressor);
                        t.AudioNode.call(this), this._compressor = this.input = this.output = this.context.createDynamicsCompressor(), this.threshold = new t.Param({
                            param: this._compressor.threshold,
                            units: t.Type.Decibels,
                            convert: !1
                        }), this.attack = new t.Param(this._compressor.attack, t.Type.Time), this.release = new t.Param(this._compressor.release, t.Type.Time), this.knee = new t.Param({
                            param: this._compressor.knee,
                            units: t.Type.Decibels,
                            convert: !1
                        }), this.ratio = new t.Param({
                            param: this._compressor.ratio,
                            convert: !1
                        }), this._readOnly(["knee", "release", "attack", "ratio", "threshold"]), this.set(e)
                    }, t.extend(t.Compressor, t.AudioNode), t.Compressor.defaults = {
                        ratio: 12,
                        threshold: -24,
                        release: .25,
                        attack: .003,
                        knee: 30
                    }, t.Compressor.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["knee", "release", "attack", "ratio", "threshold"]), this._compressor.disconnect(), this._compressor = null, this.attack.dispose(), this.attack = null, this.release.dispose(), this.release = null, this.threshold.dispose(), this.threshold = null, this.ratio.dispose(), this.ratio = null, this.knee.dispose(), this.knee = null, this
                    }, t.Compressor
                }), e(function(t) {
                    return t.Add = function(e) {
                        t.Signal.call(this), this.createInsOuts(2, 0), this._sum = this.input[0] = this.input[1] = this.output = new t.Gain, this._param = this.input[1] = new t.Signal(e), this._param.connect(this._sum)
                    }, t.extend(t.Add, t.Signal), t.Add.prototype.dispose = function() {
                        return t.Signal.prototype.dispose.call(this), this._sum.dispose(), this._sum = null, this
                    }, t.Add
                }), e(function(t) {
                    return t.Multiply = function(e) {
                        t.Signal.call(this), this.createInsOuts(2, 0), this._mult = this.input[0] = this.output = new t.Gain, this._param = this.input[1] = this.output.gain, this.value = t.defaultArg(e, 0)
                    }, t.extend(t.Multiply, t.Signal), t.Multiply.prototype.dispose = function() {
                        return t.Signal.prototype.dispose.call(this), this._mult.dispose(), this._mult = null, this._param = null, this
                    }, t.Multiply
                }), e(function(t) {
                    return t.Negate = function() {
                        t.SignalBase.call(this), this._multiply = this.input = this.output = new t.Multiply(-1)
                    }, t.extend(t.Negate, t.SignalBase), t.Negate.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._multiply.dispose(), this._multiply = null, this
                    }, t.Negate
                }), e(function(t) {
                    return t.Subtract = function(e) {
                        t.Signal.call(this), this.createInsOuts(2, 0), this._sum = this.input[0] = this.output = new t.Gain, this._neg = new t.Negate, this._param = this.input[1] = new t.Signal(e), this._param.chain(this._neg, this._sum)
                    }, t.extend(t.Subtract, t.Signal), t.Subtract.prototype.dispose = function() {
                        return t.Signal.prototype.dispose.call(this), this._neg.dispose(), this._neg = null, this._sum.disconnect(), this._sum = null, this
                    }, t.Subtract
                }), e(function(t) {
                    return t.EqualPowerGain = function() {
                        t.SignalBase.call(this), this._eqPower = this.input = this.output = new t.WaveShaper(function(e) {
                            return Math.abs(e) < .001 ? 0 : t.equalPowerScale(e)
                        }.bind(this), 4096)
                    }, t.extend(t.EqualPowerGain, t.SignalBase), t.EqualPowerGain.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._eqPower.dispose(), this._eqPower = null, this
                    }, t.EqualPowerGain
                }), e(function(t) {
                    return t.CrossFade = function(e) {
                        t.AudioNode.call(this), this.createInsOuts(2, 1), this.a = this.input[0] = new t.Gain, this.b = this.input[1] = new t.Gain, this.fade = new t.Signal(t.defaultArg(e, .5), t.Type.NormalRange), this._equalPowerA = new t.EqualPowerGain, this._equalPowerB = new t.EqualPowerGain, this._one = this.context.getConstant(1), this._invert = new t.Subtract, this.a.connect(this.output), this.b.connect(this.output), this.fade.chain(this._equalPowerB, this.b.gain), this._one.connect(this._invert, 0, 0), this.fade.connect(this._invert, 0, 1), this._invert.chain(this._equalPowerA, this.a.gain), this._readOnly("fade")
                    }, t.extend(t.CrossFade, t.AudioNode), t.CrossFade.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable("fade"), this._equalPowerA.dispose(), this._equalPowerA = null, this._equalPowerB.dispose(), this._equalPowerB = null, this.fade.dispose(), this.fade = null, this._invert.dispose(), this._invert = null, this._one = null, this.a.dispose(), this.a = null, this.b.dispose(), this.b = null, this
                    }, t.CrossFade
                }), e(function(t) {
                    return t.Filter = function() {
                        var e = t.defaults(arguments, ["frequency", "type", "rolloff"], t.Filter);
                        t.AudioNode.call(this), this.createInsOuts(1, 1), this._filters = [], this.frequency = new t.Signal(e.frequency, t.Type.Frequency), this.detune = new t.Signal(0, t.Type.Cents), this.gain = new t.Signal({
                            value: e.gain,
                            convert: !1
                        }), this.Q = new t.Signal(e.Q), this._type = e.type, this._rolloff = e.rolloff, this.rolloff = e.rolloff, this._readOnly(["detune", "frequency", "gain", "Q"])
                    }, t.extend(t.Filter, t.AudioNode), t.Filter.defaults = {
                        type: "lowpass",
                        frequency: 350,
                        rolloff: -12,
                        Q: 1,
                        gain: 0
                    }, Object.defineProperty(t.Filter.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(t) {
                            var e = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "notch", "allpass", "peaking"];
                            if (-1 === e.indexOf(t)) throw new TypeError("Tone.Filter: invalid type " + t);
                            this._type = t;
                            for (var i = 0; i < this._filters.length; i++) this._filters[i].type = t
                        }
                    }), Object.defineProperty(t.Filter.prototype, "rolloff", {
                        get: function() {
                            return this._rolloff
                        },
                        set: function(e) {
                            e = parseInt(e, 10);
                            var i = [-12, -24, -48, -96],
                                n = i.indexOf(e);
                            if (-1 === n) throw new RangeError("Tone.Filter: rolloff can only be -12, -24, -48 or -96");
                            n += 1, this._rolloff = e, this.input.disconnect();
                            for (var o = 0; o < this._filters.length; o++) this._filters[o].disconnect(), this._filters[o] = null;
                            this._filters = new Array(n);
                            for (var s = 0; n > s; s++) {
                                var r = this.context.createBiquadFilter();
                                r.type = this._type, this.frequency.connect(r.frequency), this.detune.connect(r.detune), this.Q.connect(r.Q), this.gain.connect(r.gain), this._filters[s] = r
                            }
                            var a = [this.input].concat(this._filters).concat([this.output]);
                            t.connectSeries.apply(t, a)
                        }
                    }), t.Filter.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this);
                        for (var e = 0; e < this._filters.length; e++) this._filters[e].disconnect(), this._filters[e] = null;
                        return this._filters = null, this._writable(["detune", "frequency", "gain", "Q"]), this.frequency.dispose(), this.Q.dispose(), this.frequency = null, this.Q = null, this.detune.dispose(), this.detune = null, this.gain.dispose(), this.gain = null, this
                    }, t.Filter
                }), e(function(t) {
                    return t.MultibandSplit = function() {
                        var e = t.defaults(arguments, ["lowFrequency", "highFrequency"], t.MultibandSplit);
                        t.AudioNode.call(this), this.input = new t.Gain, this.output = new Array(3), this.low = this.output[0] = new t.Filter(0, "lowpass"), this._lowMidFilter = new t.Filter(0, "highpass"), this.mid = this.output[1] = new t.Filter(0, "lowpass"), this.high = this.output[2] = new t.Filter(0, "highpass"), this.lowFrequency = new t.Signal(e.lowFrequency, t.Type.Frequency), this.highFrequency = new t.Signal(e.highFrequency, t.Type.Frequency), this.Q = new t.Signal(e.Q), this.input.fan(this.low, this.high), this.input.chain(this._lowMidFilter, this.mid), this.lowFrequency.connect(this.low.frequency), this.lowFrequency.connect(this._lowMidFilter.frequency), this.highFrequency.connect(this.mid.frequency), this.highFrequency.connect(this.high.frequency), this.Q.connect(this.low.Q), this.Q.connect(this._lowMidFilter.Q), this.Q.connect(this.mid.Q), this.Q.connect(this.high.Q), this._readOnly(["high", "mid", "low", "highFrequency", "lowFrequency"])
                    }, t.extend(t.MultibandSplit, t.AudioNode), t.MultibandSplit.defaults = {
                        lowFrequency: 400,
                        highFrequency: 2500,
                        Q: 1
                    }, t.MultibandSplit.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["high", "mid", "low", "highFrequency", "lowFrequency"]), this.low.dispose(), this.low = null, this._lowMidFilter.dispose(), this._lowMidFilter = null, this.mid.dispose(), this.mid = null, this.high.dispose(), this.high = null, this.lowFrequency.dispose(), this.lowFrequency = null, this.highFrequency.dispose(), this.highFrequency = null, this.Q.dispose(), this.Q = null, this
                    }, t.MultibandSplit
                }), e(function(t) {
                    return t.EQ3 = function() {
                        var e = t.defaults(arguments, ["low", "mid", "high"], t.EQ3);
                        t.AudioNode.call(this), this.output = new t.Gain, this._multibandSplit = this.input = new t.MultibandSplit({
                            lowFrequency: e.lowFrequency,
                            highFrequency: e.highFrequency
                        }), this._lowGain = new t.Gain(e.low, t.Type.Decibels), this._midGain = new t.Gain(e.mid, t.Type.Decibels), this._highGain = new t.Gain(e.high, t.Type.Decibels), this.low = this._lowGain.gain, this.mid = this._midGain.gain, this.high = this._highGain.gain, this.Q = this._multibandSplit.Q, this.lowFrequency = this._multibandSplit.lowFrequency, this.highFrequency = this._multibandSplit.highFrequency, this._multibandSplit.low.chain(this._lowGain, this.output), this._multibandSplit.mid.chain(this._midGain, this.output), this._multibandSplit.high.chain(this._highGain, this.output), this._readOnly(["low", "mid", "high", "lowFrequency", "highFrequency"])
                    }, t.extend(t.EQ3, t.AudioNode), t.EQ3.defaults = {
                        low: 0,
                        mid: 0,
                        high: 0,
                        lowFrequency: 400,
                        highFrequency: 2500
                    }, t.EQ3.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["low", "mid", "high", "lowFrequency", "highFrequency"]), this._multibandSplit.dispose(), this._multibandSplit = null, this.lowFrequency = null, this.highFrequency = null, this._lowGain.dispose(), this._lowGain = null, this._midGain.dispose(), this._midGain = null, this._highGain.dispose(), this._highGain = null, this.low = null, this.mid = null, this.high = null, this.Q = null, this
                    }, t.EQ3
                }), e(function(t) {
                    return t.Scale = function(e, i) {
                        t.SignalBase.call(this), this._outputMin = t.defaultArg(e, 0), this._outputMax = t.defaultArg(i, 1), this._scale = this.input = new t.Multiply(1), this._add = this.output = new t.Add(0),
                            this._scale.connect(this._add), this._setRange()
                    }, t.extend(t.Scale, t.SignalBase), Object.defineProperty(t.Scale.prototype, "min", {
                        get: function() {
                            return this._outputMin
                        },
                        set: function(t) {
                            this._outputMin = t, this._setRange()
                        }
                    }), Object.defineProperty(t.Scale.prototype, "max", {
                        get: function() {
                            return this._outputMax
                        },
                        set: function(t) {
                            this._outputMax = t, this._setRange()
                        }
                    }), t.Scale.prototype._setRange = function() {
                        this._add.value = this._outputMin, this._scale.value = this._outputMax - this._outputMin
                    }, t.Scale.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._add.dispose(), this._add = null, this._scale.dispose(), this._scale = null, this
                    }, t.Scale
                }), e(function(t) {
                    return t.ScaleExp = function(e, i, n) {
                        t.SignalBase.call(this), this._scale = this.output = new t.Scale(e, i), this._exp = this.input = new t.Pow(t.defaultArg(n, 2)), this._exp.connect(this._scale)
                    }, t.extend(t.ScaleExp, t.SignalBase), Object.defineProperty(t.ScaleExp.prototype, "exponent", {
                        get: function() {
                            return this._exp.value
                        },
                        set: function(t) {
                            this._exp.value = t
                        }
                    }), Object.defineProperty(t.ScaleExp.prototype, "min", {
                        get: function() {
                            return this._scale.min
                        },
                        set: function(t) {
                            this._scale.min = t
                        }
                    }), Object.defineProperty(t.ScaleExp.prototype, "max", {
                        get: function() {
                            return this._scale.max
                        },
                        set: function(t) {
                            this._scale.max = t
                        }
                    }), t.ScaleExp.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._exp.dispose(), this._exp = null, this
                    }, t.ScaleExp
                }), e(function(t) {
                    return t.Delay = function() {
                        var e = t.defaults(arguments, ["delayTime", "maxDelay"], t.Delay);
                        t.AudioNode.call(this), this._maxDelay = Math.max(this.toSeconds(e.maxDelay), this.toSeconds(e.delayTime)), this._delayNode = this.input = this.output = this.context.createDelay(this._maxDelay), this.delayTime = new t.Param({
                            param: this._delayNode.delayTime,
                            units: t.Type.Time,
                            value: e.delayTime
                        }), this._readOnly("delayTime")
                    }, t.extend(t.Delay, t.AudioNode), t.Delay.defaults = {
                        maxDelay: 1,
                        delayTime: 0
                    }, Object.defineProperty(t.Delay.prototype, "maxDelay", {
                        get: function() {
                            return this._maxDelay
                        }
                    }), t.Delay.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._delayNode.disconnect(), this._delayNode = null, this._writable("delayTime"), this.delayTime = null, this
                    }, t.Delay
                }), e(function(t) {
                    return t.FeedbackCombFilter = function() {
                        var e = t.defaults(arguments, ["delayTime", "resonance"], t.FeedbackCombFilter);
                        t.AudioNode.call(this), this._delay = this.input = this.output = new t.Delay(e.delayTime), this.delayTime = this._delay.delayTime, this._feedback = new t.Gain(e.resonance, t.Type.NormalRange), this.resonance = this._feedback.gain, this._delay.chain(this._feedback, this._delay), this._readOnly(["resonance", "delayTime"])
                    }, t.extend(t.FeedbackCombFilter, t.AudioNode), t.FeedbackCombFilter.defaults = {
                        delayTime: .1,
                        resonance: .5
                    }, t.FeedbackCombFilter.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["resonance", "delayTime"]), this._delay.dispose(), this._delay = null, this.delayTime = null, this._feedback.dispose(), this._feedback = null, this.resonance = null, this
                    }, t.FeedbackCombFilter
                }), e(function(t) {
                    return t.FFT = function() {
                        var e = t.defaults(arguments, ["size"], t.FFT);
                        e.type = t.Analyser.Type.FFT, t.AudioNode.call(this), this._analyser = this.input = this.output = new t.Analyser(e)
                    }, t.extend(t.FFT, t.AudioNode), t.FFT.defaults = {
                        size: 1024
                    }, t.FFT.prototype.getValue = function() {
                        return this._analyser.getValue()
                    }, Object.defineProperty(t.FFT.prototype, "size", {
                        get: function() {
                            return this._analyser.size
                        },
                        set: function(t) {
                            this._analyser.size = t
                        }
                    }), t.FFT.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this), this._analyser.dispose(), this._analyser = null
                    }, t.FFT
                }), e(function(t) {
                    return t.Abs = function() {
                        t.SignalBase.call(this), this._abs = this.input = this.output = new t.WaveShaper(function(t) {
                            return Math.abs(t) < .001 ? 0 : Math.abs(t)
                        }, 1024)
                    }, t.extend(t.Abs, t.SignalBase), t.Abs.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._abs.dispose(), this._abs = null, this
                    }, t.Abs
                }), e(function(t) {
                    return t.Follower = function() {
                        var e = t.defaults(arguments, ["attack", "release"], t.Follower);
                        t.AudioNode.call(this), this.createInsOuts(1, 1), this._abs = new t.Abs, this._filter = this.context.createBiquadFilter(), this._filter.type = "lowpass", this._filter.frequency.value = 0, this._filter.Q.value = -100, this._frequencyValues = new t.WaveShaper, this._sub = new t.Subtract, this._delay = new t.Delay(this.blockTime), this._mult = new t.Multiply(1e4), this._attack = e.attack, this._release = e.release, this.input.chain(this._abs, this._filter, this.output), this._abs.connect(this._sub, 0, 1), this._filter.chain(this._delay, this._sub), this._sub.chain(this._mult, this._frequencyValues, this._filter.frequency), this._setAttackRelease(this._attack, this._release)
                    }, t.extend(t.Follower, t.AudioNode), t.Follower.defaults = {
                        attack: .05,
                        release: .5
                    }, t.Follower.prototype._setAttackRelease = function(e, i) {
                        var n = this.blockTime;
                        e = t.Time(e).toFrequency(), i = t.Time(i).toFrequency(), e = Math.max(e, n), i = Math.max(i, n), this._frequencyValues.setMap(function(t) {
                            return 0 >= t ? e : i
                        })
                    }, Object.defineProperty(t.Follower.prototype, "attack", {
                        get: function() {
                            return this._attack
                        },
                        set: function(t) {
                            this._attack = t, this._setAttackRelease(this._attack, this._release)
                        }
                    }), Object.defineProperty(t.Follower.prototype, "release", {
                        get: function() {
                            return this._release
                        },
                        set: function(t) {
                            this._release = t, this._setAttackRelease(this._attack, this._release)
                        }
                    }), t.Follower.prototype.connect = t.SignalBase.prototype.connect, t.Follower.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._filter.disconnect(), this._filter = null, this._frequencyValues.disconnect(), this._frequencyValues = null, this._delay.dispose(), this._delay = null, this._sub.disconnect(), this._sub = null, this._abs.dispose(), this._abs = null, this._mult.dispose(), this._mult = null, this._curve = null, this
                    }, t.Follower
                }), e(function(t) {
                    return t.ScaledEnvelope = function() {
                        var e = t.defaults(arguments, ["attack", "decay", "sustain", "release"], t.Envelope);
                        t.Envelope.call(this, e), e = t.defaultArg(e, t.ScaledEnvelope.defaults), this._exp = this.output = new t.Pow(e.exponent), this._scale = this.output = new t.Scale(e.min, e.max), this._sig.chain(this._exp, this._scale)
                    }, t.extend(t.ScaledEnvelope, t.Envelope), t.ScaledEnvelope.defaults = {
                        min: 0,
                        max: 1,
                        exponent: 1
                    }, Object.defineProperty(t.ScaledEnvelope.prototype, "min", {
                        get: function() {
                            return this._scale.min
                        },
                        set: function(t) {
                            this._scale.min = t
                        }
                    }), Object.defineProperty(t.ScaledEnvelope.prototype, "max", {
                        get: function() {
                            return this._scale.max
                        },
                        set: function(t) {
                            this._scale.max = t
                        }
                    }), Object.defineProperty(t.ScaledEnvelope.prototype, "exponent", {
                        get: function() {
                            return this._exp.value
                        },
                        set: function(t) {
                            this._exp.value = t
                        }
                    }), t.ScaledEnvelope.prototype.dispose = function() {
                        return t.Envelope.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._exp.dispose(), this._exp = null, this
                    }, t.ScaledEnvelope
                }), e(function(t) {
                    return t.FrequencyEnvelope = function() {
                        var e = t.defaults(arguments, ["attack", "decay", "sustain", "release"], t.Envelope);
                        t.ScaledEnvelope.call(this, e), e = t.defaultArg(e, t.FrequencyEnvelope.defaults), this._octaves = e.octaves, this.baseFrequency = e.baseFrequency, this.octaves = e.octaves
                    }, t.extend(t.FrequencyEnvelope, t.Envelope), t.FrequencyEnvelope.defaults = {
                        baseFrequency: 200,
                        octaves: 4,
                        exponent: 2
                    }, Object.defineProperty(t.FrequencyEnvelope.prototype, "baseFrequency", {
                        get: function() {
                            return this._scale.min
                        },
                        set: function(t) {
                            this._scale.min = this.toFrequency(t), this.octaves = this._octaves
                        }
                    }), Object.defineProperty(t.FrequencyEnvelope.prototype, "octaves", {
                        get: function() {
                            return this._octaves
                        },
                        set: function(t) {
                            this._octaves = t, this._scale.max = this.baseFrequency * Math.pow(2, t)
                        }
                    }), Object.defineProperty(t.FrequencyEnvelope.prototype, "exponent", {
                        get: function() {
                            return this._exp.value
                        },
                        set: function(t) {
                            this._exp.value = t
                        }
                    }), t.FrequencyEnvelope.prototype.dispose = function() {
                        return t.ScaledEnvelope.prototype.dispose.call(this), this
                    }, t.FrequencyEnvelope
                }), e(function(t) {
                    return t.GreaterThanZero = function() {
                        t.SignalBase.call(this), this._thresh = this.output = new t.WaveShaper(function(t) {
                            return 0 >= t ? 0 : 1
                        }, 127), this._scale = this.input = new t.Multiply(1e4), this._scale.connect(this._thresh)
                    }, t.extend(t.GreaterThanZero, t.SignalBase), t.GreaterThanZero.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._scale.dispose(), this._scale = null, this._thresh.dispose(), this._thresh = null, this
                    }, t.GreaterThanZero
                }), e(function(t) {
                    return t.GreaterThan = function(e) {
                        t.Signal.call(this), this.createInsOuts(2, 0), this._param = this.input[0] = new t.Subtract(e), this.input[1] = this._param.input[1], this._gtz = this.output = new t.GreaterThanZero, this._param.connect(this._gtz)
                    }, t.extend(t.GreaterThan, t.Signal), t.GreaterThan.prototype.dispose = function() {
                        return t.Signal.prototype.dispose.call(this), this._gtz.dispose(), this._gtz = null, this
                    }, t.GreaterThan
                }), e(function(t) {
                    return t.Gate = function() {
                        var e = t.defaults(arguments, ["threshold", "attack", "release"], t.Gate);
                        t.AudioNode.call(this), this.createInsOuts(1, 1), this._follower = new t.Follower(e.attack, e.release), this._gt = new t.GreaterThan(t.dbToGain(e.threshold)), this.input.connect(this.output), this.input.chain(this._gt, this._follower, this.output.gain)
                    }, t.extend(t.Gate, t.AudioNode), t.Gate.defaults = {
                        attack: .1,
                        release: .1,
                        threshold: -40
                    }, Object.defineProperty(t.Gate.prototype, "threshold", {
                        get: function() {
                            return t.gainToDb(this._gt.value)
                        },
                        set: function(e) {
                            this._gt.value = t.dbToGain(e)
                        }
                    }), Object.defineProperty(t.Gate.prototype, "attack", {
                        get: function() {
                            return this._follower.attack
                        },
                        set: function(t) {
                            this._follower.attack = t
                        }
                    }), Object.defineProperty(t.Gate.prototype, "release", {
                        get: function() {
                            return this._follower.release
                        },
                        set: function(t) {
                            this._follower.release = t
                        }
                    }), t.Gate.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._follower.dispose(), this._gt.dispose(), this._follower = null, this._gt = null, this
                    }, t.Gate
                }), e(function(t) {
                    function e(t) {
                        return function(e, i) {
                            i = this.toSeconds(i), t.apply(this, arguments);
                            var n = this._events.get(i),
                                o = this._events.previousEvent(n),
                                s = this._getTicksUntilEvent(o, i);
                            return n.ticks = Math.max(s, 0), this
                        }
                    }
                    return t.TickSignal = function(e) {
                        e = t.defaultArg(e, 1), t.Signal.call(this, {
                            units: t.Type.Ticks,
                            value: e
                        }), this._events.memory = 1 / 0, this.cancelScheduledValues(0), this._events.add({
                            type: t.Param.AutomationType.SetValue,
                            time: 0,
                            value: e
                        })
                    }, t.extend(t.TickSignal, t.Signal), t.TickSignal.prototype.setValueAtTime = e(t.Signal.prototype.setValueAtTime), t.TickSignal.prototype.linearRampToValueAtTime = e(t.Signal.prototype.linearRampToValueAtTime), t.TickSignal.prototype.setTargetAtTime = function(t, e, i) {
                        e = this.toSeconds(e), this.setRampPoint(e), t = this._fromUnits(t);
                        for (var n = this._events.get(e), o = Math.round(Math.max(1 / i, 1)), s = 0; o >= s; s++) {
                            var r = i * s + e,
                                a = this._exponentialApproach(n.time, n.value, t, i, r);
                            this.linearRampToValueAtTime(this._toUnits(a), r)
                        }
                        return this
                    }, t.TickSignal.prototype.exponentialRampToValueAtTime = function(t, e) {
                        e = this.toSeconds(e), t = this._fromUnits(t);
                        var i = this._events.get(e);
                        null === i && (i = {
                            value: this._initialValue,
                            time: 0
                        });
                        for (var n = Math.round(Math.max(10 * (e - i.time), 1)), o = (e - i.time) / n, s = 0; n >= s; s++) {
                            var r = o * s + i.time,
                                a = this._exponentialInterpolate(i.time, i.value, e, t, r);
                            this.linearRampToValueAtTime(this._toUnits(a), r)
                        }
                        return this
                    }, t.TickSignal.prototype._getTicksUntilEvent = function(e, i) {
                        if (null === e) e = {
                            ticks: 0,
                            time: 0
                        };
                        else if (t.isUndef(e.ticks)) {
                            var n = this._events.previousEvent(e);
                            e.ticks = this._getTicksUntilEvent(n, e.time)
                        }
                        var o = this.getValueAtTime(e.time),
                            s = this.getValueAtTime(i);
                        return this._events.get(i).time === i && this._events.get(i).type === t.Param.AutomationType.SetValue && (s = this.getValueAtTime(i - this.sampleTime)), .5 * (i - e.time) * (o + s) + e.ticks
                    }, t.TickSignal.prototype.getTicksAtTime = function(t) {
                        t = this.toSeconds(t);
                        var e = this._events.get(t);
                        return Math.max(this._getTicksUntilEvent(e, t), 0)
                    }, t.TickSignal.prototype.getDurationOfTicks = function(t, e) {
                        e = this.toSeconds(e);
                        var i = this.getTicksAtTime(e);
                        return this.getTimeOfTick(i + t) - e
                    }, t.TickSignal.prototype.getTimeOfTick = function(e) {
                        var i = this._events.get(e, "ticks"),
                            n = this._events.getAfter(e, "ticks");
                        if (i && i.ticks === e) return i.time;
                        if (i && n && n.type === t.Param.AutomationType.Linear && i.value !== n.value) {
                            var o = this.getValueAtTime(i.time),
                                s = this.getValueAtTime(n.time),
                                r = (s - o) / (n.time - i.time),
                                a = Math.sqrt(Math.pow(o, 2) - 2 * r * (i.ticks - e)),
                                l = (-o + a) / r,
                                h = (-o - a) / r;
                            return (l > 0 ? l : h) + i.time
                        }
                        return i ? 0 === i.value ? 1 / 0 : i.time + (e - i.ticks) / i.value : e / this._initialValue
                    }, t.TickSignal.prototype.ticksToTime = function(e, i) {
                        return i = this.toSeconds(i), new t.Time(this.getDurationOfTicks(e, i))
                    }, t.TickSignal.prototype.timeToTicks = function(e, i) {
                        i = this.toSeconds(i), e = this.toSeconds(e);
                        var n = this.getTicksAtTime(i),
                            o = this.getTicksAtTime(i + e);
                        return new t.Ticks(o - n)
                    }, t.TickSignal
                }), e(function(t) {
                    return t.TimelineState = function(e) {
                        t.Timeline.call(this), this._initial = e
                    }, t.extend(t.TimelineState, t.Timeline), t.TimelineState.prototype.getValueAtTime = function(t) {
                        var e = this.get(t);
                        return null !== e ? e.state : this._initial
                    }, t.TimelineState.prototype.setStateAtTime = function(t, e) {
                        return this.add({
                            state: t,
                            time: e
                        }), this
                    }, t.TimelineState.prototype.getLastState = function(t, e) {
                        e = this.toSeconds(e);
                        for (var i = this._search(e), n = i; n >= 0; n--) {
                            var o = this._timeline[n];
                            if (o.state === t) return o
                        }
                    }, t.TimelineState.prototype.getNextState = function(t, e) {
                        e = this.toSeconds(e);
                        var i = this._search(e);
                        if (-1 !== i)
                            for (var n = i; n < this._timeline.length; n++) {
                                var o = this._timeline[n];
                                if (o.state === t) return o
                            }
                    }, t.TimelineState
                }), e(function(t) {
                    return t.TickSource = function() {
                        var e = t.defaults(arguments, ["frequency"], t.TickSource);
                        this.frequency = new t.TickSignal(e.frequency, t.Type.Frequency), this._readOnly("frequency"), this._state = new t.TimelineState(t.State.Stopped), this._state.setStateAtTime(t.State.Stopped, 0), this._tickOffset = new t.Timeline, this.setTicksAtTime(0, 0)
                    }, t.extend(t.TickSource), t.TickSource.defaults = {
                        frequency: 1
                    }, Object.defineProperty(t.TickSource.prototype, "state", {
                        get: function() {
                            return this._state.getValueAtTime(this.now())
                        }
                    }), t.TickSource.prototype.start = function(e, i) {
                        return e = this.toSeconds(e), this._state.getValueAtTime(e) !== t.State.Started && (this._state.setStateAtTime(t.State.Started, e), t.isDefined(i) && this.setTicksAtTime(i, e)), this
                    }, t.TickSource.prototype.stop = function(e) {
                        if (e = this.toSeconds(e), this._state.getValueAtTime(e) === t.State.Stopped) {
                            var i = this._state.get(e);
                            i.time > 0 && (this._tickOffset.cancel(i.time), this._state.cancel(i.time))
                        }
                        return this._state.cancel(e), this._state.setStateAtTime(t.State.Stopped, e), this.setTicksAtTime(0, e), this
                    }, t.TickSource.prototype.pause = function(e) {
                        return e = this.toSeconds(e), this._state.getValueAtTime(e) === t.State.Started && this._state.setStateAtTime(t.State.Paused, e), this
                    }, t.TickSource.prototype.cancel = function(t) {
                        return t = this.toSeconds(t), this._state.cancel(t), this._tickOffset.cancel(t), this
                    }, t.TickSource.prototype.getTicksAtTime = function(e) {
                        e = this.toSeconds(e);
                        var i = this._state.getLastState(t.State.Stopped, e),
                            n = {
                                state: t.State.Paused,
                                time: e
                            };
                        this._state.add(n);
                        var o = i,
                            s = 0;
                        return this._state.forEachBetween(i.time, e + this.sampleTime, function(e) {
                            var i = o.time,
                                n = this._tickOffset.get(e.time);
                            n.time >= o.time && (s = n.ticks, i = n.time), o.state === t.State.Started && e.state !== t.State.Started && (s += this.frequency.getTicksAtTime(e.time) - this.frequency.getTicksAtTime(i)), o = e
                        }.bind(this)), this._state.remove(n), s
                    }, Object.defineProperty(t.TickSource.prototype, "ticks", {
                        get: function() {
                            return this.getTicksAtTime(this.now())
                        },
                        set: function(t) {
                            this.setTicksAtTime(t, this.now())
                        }
                    }), Object.defineProperty(t.TickSource.prototype, "seconds", {
                        get: function() {
                            return this.getSecondsAtTime(this.now())
                        },
                        set: function(t) {
                            var e = this.now(),
                                i = this.frequency.timeToTicks(t, e);
                            this.setTicksAtTime(i, e)
                        }
                    }), t.TickSource.prototype.getSecondsAtTime = function(e) {
                        e = this.toSeconds(e);
                        var i = this._state.getLastState(t.State.Stopped, e),
                            n = {
                                state: t.State.Paused,
                                time: e
                            };
                        this._state.add(n);
                        var o = i,
                            s = 0;
                        return this._state.forEachBetween(i.time, e + this.sampleTime, function(e) {
                            var i = o.time,
                                n = this._tickOffset.get(e.time);
                            n.time >= o.time && (s = n.seconds, i = n.time), o.state === t.State.Started && e.state !== t.State.Started && (s += e.time - i), o = e
                        }.bind(this)), this._state.remove(n), s
                    }, t.TickSource.prototype.setTicksAtTime = function(t, e) {
                        return e = this.toSeconds(e), this._tickOffset.cancel(e), this._tickOffset.add({
                            time: e,
                            ticks: t,
                            seconds: this.frequency.getDurationOfTicks(t, e)
                        }), this
                    }, t.TickSource.prototype.getStateAtTime = function(t) {
                        return t = this.toSeconds(t), this._state.getValueAtTime(t)
                    }, t.TickSource.prototype.getTimeOfTick = function(e, i) {
                        i = t.defaultArg(i, this.now());
                        var n = this._tickOffset.get(i),
                            o = this._state.get(i),
                            s = Math.max(n.time, o.time),
                            r = this.frequency.getTicksAtTime(s) + e - n.ticks;
                        return this.frequency.getTimeOfTick(r)
                    }, t.TickSource.prototype.forEachTickBetween = function(e, i, n) {
                        var o = this._state.get(e);
                        if (this._state.forEachBetween(e, i, function(i) {
                            o.state === t.State.Started && i.state !== t.State.Started && this.forEachTickBetween(Math.max(o.time, e), i.time - this.sampleTime, n), o = i
                        }.bind(this)), e = Math.max(o.time, e), o.state === t.State.Started && this._state) {
                            var s = this.frequency.getTicksAtTime(e),
                                r = this.frequency.getTicksAtTime(o.time),
                                a = s - r,
                                l = a % 1;
                            0 !== l && (l = 1 - l);
                            for (var h = this.frequency.getTimeOfTick(s + l), u = null; i > h && this._state;) {
                                try {
                                    n(h, Math.round(this.getTicksAtTime(h)))
                                } catch (c) {
                                    u = c;
                                    break
                                }
                                this._state && (h += this.frequency.getDurationOfTicks(1, h))
                            }
                        }
                        if (u) throw u;
                        return this
                    }, t.TickSource.prototype.dispose = function() {
                        return t.Param.prototype.dispose.call(this), this._state.dispose(), this._state = null, this._tickOffset.dispose(), this._tickOffset = null, this._writable("frequency"), this.frequency.dispose(), this.frequency = null, this
                    }, t.TickSource
                }), e(function(t) {
                    return t.Clock = function() {
                        var e = t.defaults(arguments, ["callback", "frequency"], t.Clock);
                        t.Emitter.call(this), this.callback = e.callback, this._nextTick = 0, this._tickSource = new t.TickSource(e.frequency), this._lastUpdate = 0, this.frequency = this._tickSource.frequency, this._readOnly("frequency"), this._state = new t.TimelineState(t.State.Stopped), this._state.setStateAtTime(t.State.Stopped, 0), this._boundLoop = this._loop.bind(this), this.context.on("tick", this._boundLoop)
                    }, t.extend(t.Clock, t.Emitter), t.Clock.defaults = {
                        callback: t.noOp,
                        frequency: 1
                    }, Object.defineProperty(t.Clock.prototype, "state", {
                        get: function() {
                            return this._state.getValueAtTime(this.now())
                        }
                    }), t.Clock.prototype.start = function(e, i) {
                        return e = this.toSeconds(e), this._state.getValueAtTime(e) !== t.State.Started && (this._state.setStateAtTime(t.State.Started, e), this._tickSource.start(e, i), e < this._lastUpdate && this.emit("start", e, i)), this
                    }, t.Clock.prototype.stop = function(e) {
                        return e = this.toSeconds(e), this._state.cancel(e), this._state.setStateAtTime(t.State.Stopped, e), this._tickSource.stop(e), e < this._lastUpdate && this.emit("stop", e), this
                    }, t.Clock.prototype.pause = function(e) {
                        return e = this.toSeconds(e), this._state.getValueAtTime(e) === t.State.Started && (this._state.setStateAtTime(t.State.Paused, e), this._tickSource.pause(e), e < this._lastUpdate && this.emit("pause", e)), this
                    }, Object.defineProperty(t.Clock.prototype, "ticks", {
                        get: function() {
                            return Math.ceil(this.getTicksAtTime(this.now()))
                        },
                        set: function(t) {
                            this._tickSource.ticks = t
                        }
                    }), Object.defineProperty(t.Clock.prototype, "seconds", {
                        get: function() {
                            return this._tickSource.seconds
                        },
                        set: function(t) {
                            this._tickSource.seconds = t
                        }
                    }), t.Clock.prototype.getSecondsAtTime = function(t) {
                        return this._tickSource.getSecondsAtTime(t)
                    }, t.Clock.prototype.setTicksAtTime = function(t, e) {
                        return this._tickSource.setTicksAtTime(t, e), this
                    }, t.Clock.prototype.getTicksAtTime = function(t) {
                        return this._tickSource.getTicksAtTime(t)
                    }, t.Clock.prototype.nextTickTime = function(t, e) {
                        e = this.toSeconds(e);
                        var i = this.getTicksAtTime(e);
                        return this._tickSource.getTimeOfTick(i + t, e)
                    }, t.Clock.prototype._loop = function() {
                        var e = this._lastUpdate,
                            i = this.now();
                        this._lastUpdate = i, e !== i && (this._state.forEachBetween(e, i, function(e) {
                            switch (e.state) {
                                case t.State.Started:
                                    var i = this._tickSource.getTicksAtTime(e.time);
                                    this.emit("start", e.time, i);
                                    break;
                                case t.State.Stopped:
                                    0 !== e.time && this.emit("stop", e.time);
                                    break;
                                case t.State.Paused:
                                    this.emit("pause", e.time)
                            }
                        }.bind(this)), this._tickSource.forEachTickBetween(e, i, function(t, e) {
                            this.callback(t, e)
                        }.bind(this)))
                    }, t.Clock.prototype.getStateAtTime = function(t) {
                        return t = this.toSeconds(t), this._state.getValueAtTime(t)
                    }, t.Clock.prototype.dispose = function() {
                        t.Emitter.prototype.dispose.call(this), this.context.off("tick", this._boundLoop), this._writable("frequency"), this._tickSource.dispose(), this._tickSource = null, this.frequency = null, this._boundLoop = null, this._nextTick = 1 / 0, this.callback = null, this._state.dispose(), this._state = null
                    }, t.Clock
                }), e(function(t) {
                    t.IntervalTimeline = function() {
                        t.call(this), this._root = null, this._length = 0
                    }, t.extend(t.IntervalTimeline), t.IntervalTimeline.prototype.add = function(i) {
                        if (t.isUndef(i.time) || t.isUndef(i.duration)) throw new Error("Tone.IntervalTimeline: events must have time and duration parameters");
                        i.time = i.time.valueOf();
                        var n = new e(i.time, i.time + i.duration, i);
                        for (null === this._root ? this._root = n : this._root.insert(n), this._length++; null !== n;) n.updateHeight(), n.updateMax(), this._rebalance(n), n = n.parent;
                        return this
                    }, t.IntervalTimeline.prototype.remove = function(t) {
                        if (null !== this._root) {
                            var e = [];
                            this._root.search(t.time, e);
                            for (var i = 0; i < e.length; i++) {
                                var n = e[i];
                                if (n.event === t) {
                                    this._removeNode(n), this._length--;
                                    break
                                }
                            }
                        }
                        return this
                    }, Object.defineProperty(t.IntervalTimeline.prototype, "length", {
                        get: function() {
                            return this._length
                        }
                    }), t.IntervalTimeline.prototype.cancel = function(t) {
                        return this.forEachFrom(t, function(t) {
                            this.remove(t)
                        }.bind(this)), this
                    }, t.IntervalTimeline.prototype._setRoot = function(t) {
                        this._root = t, null !== this._root && (this._root.parent = null)
                    }, t.IntervalTimeline.prototype._replaceNodeInParent = function(t, e) {
                        null !== t.parent ? (t.isLeftChild() ? t.parent.left = e : t.parent.right = e, this._rebalance(t.parent)) : this._setRoot(e)
                    }, t.IntervalTimeline.prototype._removeNode = function(t) {
                        if (null === t.left && null === t.right) this._replaceNodeInParent(t, null);
                        else if (null === t.right) this._replaceNodeInParent(t, t.left);
                        else if (null === t.left) this._replaceNodeInParent(t, t.right);
                        else {
                            var e, i, n = t.getBalance();
                            if (n > 0)
                                if (null === t.left.right) e = t.left, e.right = t.right, i = e;
                                else {
                                    for (e = t.left.right; null !== e.right;) e = e.right;
                                    e.parent.right = e.left, i = e.parent, e.left = t.left, e.right = t.right
                                }
                            else if (null === t.right.left) e = t.right, e.left = t.left, i = e;
                            else {
                                for (e = t.right.left; null !== e.left;) e = e.left;
                                e.parent = e.parent, e.parent.left = e.right, i = e.parent, e.left = t.left, e.right = t.right
                            }
                            null !== t.parent ? t.isLeftChild() ? t.parent.left = e : t.parent.right = e : this._setRoot(e), this._rebalance(i)
                        }
                        t.dispose()
                    }, t.IntervalTimeline.prototype._rotateLeft = function(t) {
                        var e = t.parent,
                            i = t.isLeftChild(),
                            n = t.right;
                        t.right = n.left, n.left = t, null !== e ? i ? e.left = n : e.right = n : this._setRoot(n)
                    }, t.IntervalTimeline.prototype._rotateRight = function(t) {
                        var e = t.parent,
                            i = t.isLeftChild(),
                            n = t.left;
                        t.left = n.right, n.right = t, null !== e ? i ? e.left = n : e.right = n : this._setRoot(n)
                    }, t.IntervalTimeline.prototype._rebalance = function(t) {
                        var e = t.getBalance();
                        e > 1 ? t.left.getBalance() < 0 ? this._rotateLeft(t.left) : this._rotateRight(t) : -1 > e && (t.right.getBalance() > 0 ? this._rotateRight(t.right) : this._rotateLeft(t))
                    }, t.IntervalTimeline.prototype.get = function(t) {
                        if (null !== this._root) {
                            var e = [];
                            if (this._root.search(t, e), e.length > 0) {
                                for (var i = e[0], n = 1; n < e.length; n++) e[n].low > i.low && (i = e[n]);
                                return i.event
                            }
                        }
                        return null
                    }, t.IntervalTimeline.prototype.forEach = function(t) {
                        if (null !== this._root) {
                            var e = [];
                            this._root.traverse(function(t) {
                                e.push(t)
                            });
                            for (var i = 0; i < e.length; i++) {
                                var n = e[i].event;
                                n && t(n)
                            }
                        }
                        return this
                    }, t.IntervalTimeline.prototype.forEachAtTime = function(t, e) {
                        if (null !== this._root) {
                            var i = [];
                            this._root.search(t, i);
                            for (var n = i.length - 1; n >= 0; n--) {
                                var o = i[n].event;
                                o && e(o)
                            }
                        }
                        return this
                    }, t.IntervalTimeline.prototype.forEachFrom = function(t, e) {
                        if (null !== this._root) {
                            var i = [];
                            this._root.searchAfter(t, i);
                            for (var n = i.length - 1; n >= 0; n--) {
                                var o = i[n].event;
                                e(o)
                            }
                        }
                        return this
                    }, t.IntervalTimeline.prototype.dispose = function() {
                        var t = [];
                        null !== this._root && this._root.traverse(function(e) {
                            t.push(e)
                        });
                        for (var e = 0; e < t.length; e++) t[e].dispose();
                        return t = null, this._root = null, this
                    };
                    var e = function(t, e, i) {
                        this.event = i, this.low = t, this.high = e, this.max = this.high, this._left = null, this._right = null, this.parent = null, this.height = 0
                    };
                    return e.prototype.insert = function(t) {
                        t.low <= this.low ? null === this.left ? this.left = t : this.left.insert(t) : null === this.right ? this.right = t : this.right.insert(t)
                    }, e.prototype.search = function(t, e) {
                        t > this.max || (null !== this.left && this.left.search(t, e), this.low <= t && this.high > t && e.push(this), this.low > t || null !== this.right && this.right.search(t, e))
                    }, e.prototype.searchAfter = function(t, e) {
                        this.low >= t && (e.push(this), null !== this.left && this.left.searchAfter(t, e)), null !== this.right && this.right.searchAfter(t, e)
                    }, e.prototype.traverse = function(t) {
                        t(this), null !== this.left && this.left.traverse(t), null !== this.right && this.right.traverse(t)
                    }, e.prototype.updateHeight = function() {
                        null !== this.left && null !== this.right ? this.height = Math.max(this.left.height, this.right.height) + 1 : null !== this.right ? this.height = this.right.height + 1 : null !== this.left ? this.height = this.left.height + 1 : this.height = 0
                    }, e.prototype.updateMax = function() {
                        this.max = this.high, null !== this.left && (this.max = Math.max(this.max, this.left.max)), null !== this.right && (this.max = Math.max(this.max, this.right.max))
                    }, e.prototype.getBalance = function() {
                        var t = 0;
                        return null !== this.left && null !== this.right ? t = this.left.height - this.right.height : null !== this.left ? t = this.left.height + 1 : null !== this.right && (t = -(this.right.height + 1)), t
                    }, e.prototype.isLeftChild = function() {
                        return null !== this.parent && this.parent.left === this
                    }, Object.defineProperty(e.prototype, "left", {
                        get: function() {
                            return this._left
                        },
                        set: function(t) {
                            this._left = t, null !== t && (t.parent = this), this.updateHeight(), this.updateMax()
                        }
                    }), Object.defineProperty(e.prototype, "right", {
                        get: function() {
                            return this._right
                        },
                        set: function(t) {
                            this._right = t, null !== t && (t.parent = this), this.updateHeight(), this.updateMax()
                        }
                    }), e.prototype.dispose = function() {
                        this.parent = null, this._left = null, this._right = null, this.event = null
                    }, t.IntervalTimeline
                }), e(function(t) {
                    return t.Ticks = function(e, i) {
                        return this instanceof t.Ticks ? void t.TransportTime.call(this, e, i) : new t.Ticks(e, i)
                    }, t.extend(t.Ticks, t.TransportTime), t.Ticks.prototype._defaultUnits = "i", t.Ticks.prototype._now = function() {
                        return t.Transport.ticks
                    }, t.Ticks.prototype._beatsToUnits = function(t) {
                        return this._getPPQ() * t
                    }, t.Ticks.prototype._secondsToUnits = function(t) {
                        return t / (60 / this._getBpm()) * this._getPPQ()
                    }, t.Ticks.prototype._ticksToUnits = function(t) {
                        return t
                    }, t.Ticks.prototype.toTicks = function() {
                        return this.valueOf()
                    }, t.Ticks.prototype.toSeconds = function() {
                        return this.valueOf() / this._getPPQ() * (60 / this._getBpm())
                    }, t.Ticks
                }), e(function(t) {
                    return t.TransportEvent = function(e, i) {
                        i = t.defaultArg(i, t.TransportEvent.defaults), t.call(this), this.Transport = e, this.id = t.TransportEvent._eventId++, this.time = t.Ticks(i.time), this.callback = i.callback, this._once = i.once
                    }, t.extend(t.TransportEvent), t.TransportEvent.defaults = {
                        once: !1,
                        callback: t.noOp
                    }, t.TransportEvent._eventId = 0, t.TransportEvent.prototype.invoke = function(t) {
                        this.callback && (this.callback(t), this._once && this.Transport && this.Transport.clear(this.id))
                    }, t.TransportEvent.prototype.dispose = function() {
                        return t.prototype.dispose.call(this), this.Transport = null, this.callback = null, this.time = null, this
                    }, t.TransportEvent
                }), e(function(t) {
                    return t.TransportRepeatEvent = function(e, i) {
                        t.TransportEvent.call(this, e, i), i = t.defaultArg(i, t.TransportRepeatEvent.defaults), this.duration = t.Ticks(i.duration), this._interval = t.Ticks(i.interval), this._currentId = -1, this._nextId = -1, this._nextTick = this.time, this._boundRestart = this._restart.bind(this), this.Transport.on("start loopStart", this._boundRestart), this._restart()
                    }, t.extend(t.TransportRepeatEvent, t.TransportEvent), t.TransportRepeatEvent.defaults = {
                        duration: 1 / 0,
                        interval: 1
                    }, t.TransportRepeatEvent.prototype.invoke = function(e) {
                        this._createEvents(e), t.TransportEvent.prototype.invoke.call(this, e)
                    }, t.TransportRepeatEvent.prototype._createEvents = function(e) {
                        var i = this.Transport.getTicksAtTime(e);
                        i >= this.time && i >= this._nextTick && this._nextTick + this._interval < this.time + this.duration && (this._nextTick += this._interval, this._currentId = this._nextId, this._nextId = this.Transport.scheduleOnce(this.invoke.bind(this), t.Ticks(this._nextTick)))
                    }, t.TransportRepeatEvent.prototype._restart = function(e) {
                        this.Transport.clear(this._currentId), this.Transport.clear(this._nextId), this._nextTick = this.time;
                        var i = this.Transport.getTicksAtTime(e);
                        i > this.time && (this._nextTick = this.time + Math.ceil((i - this.time) / this._interval) * this._interval), this._currentId = this.Transport.scheduleOnce(this.invoke.bind(this), t.Ticks(this._nextTick)), this._nextTick += this._interval, this._nextId = this.Transport.scheduleOnce(this.invoke.bind(this), t.Ticks(this._nextTick))
                    }, t.TransportRepeatEvent.prototype.dispose = function() {
                        return this.Transport.clear(this._currentId), this.Transport.clear(this._nextId), this.Transport.off("start loopStart", this._boundRestart), this._boundCreateEvents = null, t.TransportEvent.prototype.dispose.call(this), this.duration = null, this._interval = null, this
                    }, t.TransportRepeatEvent
                }), e(function(t) {
                    t.Transport = function() {
                        t.Emitter.call(this), t.getContext(function() {
                            this.loop = !1, this._loopStart = 0, this._loopEnd = 0, this._ppq = e.defaults.PPQ, this._clock = new t.Clock({
                                callback: this._processTick.bind(this),
                                frequency: 0
                            }), this._bindClockEvents(), this.bpm = this._clock.frequency, this.bpm._toUnits = this._toUnits.bind(this), this.bpm._fromUnits = this._fromUnits.bind(this), this.bpm.units = t.Type.BPM, this.bpm.value = e.defaults.bpm, this._readOnly("bpm"), this._timeSignature = e.defaults.timeSignature, this._scheduledEvents = {}, this._timeline = new t.Timeline, this._repeatedEvents = new t.IntervalTimeline, this._syncedSignals = [], this._swingTicks = e.defaults.PPQ / 2, this._swingAmount = 0
                        }.bind(this))
                    }, t.extend(t.Transport, t.Emitter), t.Transport.defaults = {
                        bpm: 120,
                        swing: 0,
                        swingSubdivision: "8n",
                        timeSignature: 4,
                        loopStart: 0,
                        loopEnd: "4m",
                        PPQ: 192
                    }, t.Transport.prototype._processTick = function(e, i) {
                        if (this._swingAmount > 0 && i % this._ppq !== 0 && i % (2 * this._swingTicks) !== 0) {
                            var n = i % (2 * this._swingTicks) / (2 * this._swingTicks),
                                o = Math.sin(n * Math.PI) * this._swingAmount;
                            e += t.Ticks(2 * this._swingTicks / 3).toSeconds() * o
                        }
                        this.loop && i >= this._loopEnd && (this.emit("loopEnd", e), this._clock.setTicksAtTime(this._loopStart, e), i = this._loopStart, this.emit("loopStart", e, this._clock.getSecondsAtTime(e)), this.emit("loop", e)), this._timeline.forEachAtTime(i, function(t) {
                            t.invoke(e)
                        })
                    }, t.Transport.prototype.schedule = function(e, i) {
                        var n = new t.TransportEvent(this, {
                            time: t.TransportTime(i),
                            callback: e
                        });
                        return this._addEvent(n, this._timeline)
                    }, t.Transport.prototype.scheduleRepeat = function(e, i, n, o) {
                        var s = new t.TransportRepeatEvent(this, {
                            callback: e,
                            interval: t.Time(i),
                            time: t.TransportTime(n),
                            duration: t.Time(t.defaultArg(o, 1 / 0))
                        });
                        return this._addEvent(s, this._repeatedEvents)
                    }, t.Transport.prototype.scheduleOnce = function(e, i) {
                        var n = new t.TransportEvent(this, {
                            time: t.TransportTime(i),
                            callback: e,
                            once: !0
                        });
                        return this._addEvent(n, this._timeline)
                    }, t.Transport.prototype.clear = function(t) {
                        if (this._scheduledEvents.hasOwnProperty(t)) {
                            var e = this._scheduledEvents[t.toString()];
                            e.timeline.remove(e.event), e.event.dispose(), delete this._scheduledEvents[t.toString()]
                        }
                        return this
                    }, t.Transport.prototype._addEvent = function(t, e) {
                        return this._scheduledEvents[t.id.toString()] = {
                            event: t,
                            timeline: e
                        }, e.add(t), t.id
                    }, t.Transport.prototype.cancel = function(e) {
                        return e = t.defaultArg(e, 0), e = this.toTicks(e), this._timeline.forEachFrom(e, function(t) {
                            this.clear(t.id)
                        }.bind(this)), this._repeatedEvents.forEachFrom(e, function(t) {
                            this.clear(t.id)
                        }.bind(this)), this
                    }, t.Transport.prototype._bindClockEvents = function() {
                        this._clock.on("start", function(e, i) {
                            i = t.Ticks(i).toSeconds(), this.emit("start", e, i)
                        }.bind(this)), this._clock.on("stop", function(t) {
                            this.emit("stop", t)
                        }.bind(this)), this._clock.on("pause", function(t) {
                            this.emit("pause", t)
                        }.bind(this))
                    }, Object.defineProperty(t.Transport.prototype, "state", {
                        get: function() {
                            return this._clock.getStateAtTime(this.now())
                        }
                    }), t.Transport.prototype.start = function(e, i) {
                        return t.isDefined(i) && (i = this.toTicks(i)), this._clock.start(e, i), this
                    }, t.Transport.prototype.stop = function(t) {
                        return this._clock.stop(t), this
                    }, t.Transport.prototype.pause = function(t) {
                        return this._clock.pause(t), this
                    }, t.Transport.prototype.toggle = function(e) {
                        return e = this.toSeconds(e), this._clock.getStateAtTime(e) !== t.State.Started ? this.start(e) : this.stop(e), this
                    }, Object.defineProperty(t.Transport.prototype, "timeSignature", {
                        get: function() {
                            return this._timeSignature
                        },
                        set: function(e) {
                            t.isArray(e) && (e = e[0] / e[1] * 4), this._timeSignature = e
                        }
                    }), Object.defineProperty(t.Transport.prototype, "loopStart", {
                        get: function() {
                            return t.Ticks(this._loopStart).toSeconds()
                        },
                        set: function(t) {
                            this._loopStart = this.toTicks(t)
                        }
                    }), Object.defineProperty(t.Transport.prototype, "loopEnd", {
                        get: function() {
                            return t.Ticks(this._loopEnd).toSeconds()
                        },
                        set: function(t) {
                            this._loopEnd = this.toTicks(t)
                        }
                    }), t.Transport.prototype.setLoopPoints = function(t, e) {
                        return this.loopStart = t, this.loopEnd = e, this
                    }, Object.defineProperty(t.Transport.prototype, "swing", {
                        get: function() {
                            return this._swingAmount
                        },
                        set: function(t) {
                            this._swingAmount = t
                        }
                    }), Object.defineProperty(t.Transport.prototype, "swingSubdivision", {
                        get: function() {
                            return t.Ticks(this._swingTicks).toNotation()
                        },
                        set: function(t) {
                            this._swingTicks = this.toTicks(t)
                        }
                    }), Object.defineProperty(t.Transport.prototype, "position", {
                        get: function() {
                            var e = this.now(),
                                i = this._clock.getTicksAtTime(e);
                            return t.Ticks(i).toBarsBeatsSixteenths()
                        },
                        set: function(t) {
                            var e = this.toTicks(t);
                            this.ticks = e
                        }
                    }), Object.defineProperty(t.Transport.prototype, "seconds", {
                        get: function() {
                            return this._clock.seconds
                        },
                        set: function(t) {
                            var e = this.now(),
                                i = this.bpm.timeToTicks(t, e);
                            this.ticks = i
                        }
                    }), Object.defineProperty(t.Transport.prototype, "progress", {
                        get: function() {
                            if (this.loop) {
                                var t = this.now(),
                                    e = this._clock.getTicksAtTime(t);
                                return (e - this._loopStart) / (this._loopEnd - this._loopStart)
                            }
                            return 0
                        }
                    }), Object.defineProperty(t.Transport.prototype, "ticks", {
                        get: function() {
                            return this._clock.ticks
                        },
                        set: function(e) {
                            if (this._clock.ticks !== e) {
                                var i = this.now();
                                this.state === t.State.Started ? (this.emit("stop", i), this._clock.setTicksAtTime(e, i), this.emit("start", i, this.seconds)) : this._clock.setTicksAtTime(e, i)
                            }
                        }
                    }), t.Transport.prototype.getTicksAtTime = function(t) {
                        return Math.round(this._clock.getTicksAtTime(t))
                    }, t.Transport.prototype.getSecondsAtTime = function(t) {
                        return this._clock.getSecondsAtTime(t)
                    }, Object.defineProperty(t.Transport.prototype, "PPQ", {
                        get: function() {
                            return this._ppq
                        },
                        set: function(t) {
                            var e = this.bpm.value;
                            this._ppq = t, this.bpm.value = e
                        }
                    }), t.Transport.prototype._fromUnits = function(t) {
                        return 1 / (60 / t / this.PPQ)
                    }, t.Transport.prototype._toUnits = function(t) {
                        return t / this.PPQ * 60
                    }, t.Transport.prototype.nextSubdivision = function(e) {
                        if (e = this.toTicks(e), this.state !== t.State.Started) return 0;
                        var i = this.now(),
                            n = this.getTicksAtTime(i),
                            o = e - n % e;
                        return this._clock.nextTickTime(o, i)
                    }, t.Transport.prototype.syncSignal = function(e, i) {
                        if (!i) {
                            var n = this.now();
                            i = 0 !== e.getValueAtTime(n) ? e.getValueAtTime(n) / this.bpm.getValueAtTime(n) : 0
                        }
                        var o = new t.Gain(i);
                        return this.bpm.chain(o, e._param), this._syncedSignals.push({
                            ratio: o,
                            signal: e,
                            initial: e.value
                        }), e.value = 0, this
                    }, t.Transport.prototype.unsyncSignal = function(t) {
                        for (var e = this._syncedSignals.length - 1; e >= 0; e--) {
                            var i = this._syncedSignals[e];
                            i.signal === t && (i.ratio.dispose(), i.signal.value = i.initial, this._syncedSignals.splice(e, 1))
                        }
                        return this
                    }, t.Transport.prototype.dispose = function() {
                        return t.Emitter.prototype.dispose.call(this), this._clock.dispose(), this._clock = null, this._writable("bpm"), this.bpm = null, this._timeline.dispose(), this._timeline = null, this._repeatedEvents.dispose(), this._repeatedEvents = null, this
                    };
                    var e = t.Transport;
                    return t.Transport = new e, t.Context.on("init", function(i) {
                        i.Transport instanceof e ? t.Transport = i.Transport : t.Transport = new e, i.Transport = t.Transport
                    }), t.Context.on("close", function(t) {
                        t.Transport instanceof e && t.Transport.dispose()
                    }), t.Transport
                }), e(function(t) {
                    return t.Volume = function() {
                        var e = t.defaults(arguments, ["volume"], t.Volume);
                        t.AudioNode.call(this), this.output = this.input = new t.Gain(e.volume, t.Type.Decibels), this._unmutedVolume = e.volume, this.volume = this.output.gain, this._readOnly("volume"), this.mute = e.mute
                    }, t.extend(t.Volume, t.AudioNode), t.Volume.defaults = {
                        volume: 0,
                        mute: !1
                    }, Object.defineProperty(t.Volume.prototype, "mute", {
                        get: function() {
                            return this.volume.value === -(1 / 0)
                        },
                        set: function(t) {
                            !this.mute && t ? (this._unmutedVolume = this.volume.value, this.volume.value = -(1 / 0)) : this.mute && !t && (this.volume.value = this._unmutedVolume)
                        }
                    }), t.Volume.prototype.dispose = function() {
                        return this.input.dispose(), t.AudioNode.prototype.dispose.call(this), this._writable("volume"), this.volume.dispose(), this.volume = null, this
                    }, t.Volume
                }), e(function(t) {
                    t.Master = function() {
                        t.AudioNode.call(this), t.getContext(function() {
                            this.createInsOuts(1, 0), this._volume = this.output = new t.Volume, this.volume = this._volume.volume, this._readOnly("volume"), this.input.chain(this.output, this.context.destination)
                        }.bind(this))
                    }, t.extend(t.Master, t.AudioNode), t.Master.defaults = {
                        volume: 0,
                        mute: !1
                    }, Object.defineProperty(t.Master.prototype, "mute", {
                        get: function() {
                            return this._volume.mute
                        },
                        set: function(t) {
                            this._volume.mute = t
                        }
                    }), t.Master.prototype.chain = function() {
                        this.input.disconnect(), this.input.chain.apply(this.input, arguments), arguments[arguments.length - 1].connect(this.output)
                    }, t.Master.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this), this._writable("volume"), this._volume.dispose(), this._volume = null, this.volume = null
                    }, t.AudioNode.prototype.toMaster = function() {
                        return this.connect(t.Master), this
                    }, window.AudioNode && (AudioNode.prototype.toMaster = function() {
                        return this.connect(t.Master), this
                    });
                    var e = t.Master;
                    return t.Master = new e, t.Context.on("init", function(i) {
                        i.Master instanceof e ? t.Master = i.Master : t.Master = new e, i.Master = t.Master
                    }), t.Context.on("close", function(t) {
                        t.Master instanceof e && t.Master.dispose()
                    }), t.Master
                }), e(function(t) {
                    return t.Source = function(e) {
                        e = t.defaultArg(e, t.Source.defaults), t.AudioNode.call(this), this._volume = this.output = new t.Volume(e.volume), this.volume = this._volume.volume, this._readOnly("volume"), this._state = new t.TimelineState(t.State.Stopped), this._state.memory = 100, this._synced = !1, this._scheduled = [], this._volume.output.output.channelCount = 2, this._volume.output.output.channelCountMode = "explicit", this.mute = e.mute
                    }, t.extend(t.Source, t.AudioNode), t.Source.defaults = {
                        volume: 0,
                        mute: !1
                    }, Object.defineProperty(t.Source.prototype, "state", {
                        get: function() {
                            return this._synced ? t.Transport.state === t.State.Started ? this._state.getValueAtTime(t.Transport.seconds) : t.State.Stopped : this._state.getValueAtTime(this.now())
                        }
                    }), Object.defineProperty(t.Source.prototype, "mute", {
                        get: function() {
                            return this._volume.mute
                        },
                        set: function(t) {
                            this._volume.mute = t
                        }
                    }), t.Source.prototype._start = t.noOp, t.Source.prototype.restart = t.noOp, t.Source.prototype._stop = t.noOp, t.Source.prototype.start = function(e, i, n) {
                        if (e = t.isUndef(e) && this._synced ? t.Transport.seconds : this.toSeconds(e), this._state.getValueAtTime(e) === t.State.Started) this._state.cancel(e), this._state.setStateAtTime(t.State.Started, e), this.restart(e, i, n);
                        else if (this._state.setStateAtTime(t.State.Started, e), this._synced) {
                            var o = this._state.get(e);
                            o.offset = t.defaultArg(i, 0), o.duration = n;
                            var s = t.Transport.schedule(function(t) {
                                this._start(t, i, n)
                            }.bind(this), e);
                            this._scheduled.push(s), t.Transport.state === t.State.Started && this._syncedStart(this.now(), t.Transport.seconds)
                        } else this._start.apply(this, arguments);
                        return this
                    }, t.Source.prototype.stop = function(e) {
                        if (e = t.isUndef(e) && this._synced ? t.Transport.seconds : this.toSeconds(e), this._synced) {
                            var i = t.Transport.schedule(this._stop.bind(this), e);
                            this._scheduled.push(i)
                        } else this._stop.apply(this, arguments);
                        return this._state.cancel(e), this._state.setStateAtTime(t.State.Stopped, e), this
                    }, t.Source.prototype.sync = function() {
                        return this._synced = !0, this._syncedStart = function(e, i) {
                            if (i > 0) {
                                var n = this._state.get(i);
                                if (n && n.state === t.State.Started && n.time !== i) {
                                    var o, s = i - this.toSeconds(n.time);
                                    n.duration && (o = this.toSeconds(n.duration) - s), this._start(e, this.toSeconds(n.offset) + s, o)
                                }
                            }
                        }.bind(this), this._syncedStop = function(e) {
                            var i = t.Transport.getSecondsAtTime(Math.max(e - this.sampleTime, 0));
                            this._state.getValueAtTime(i) === t.State.Started && this._stop(e)
                        }.bind(this), t.Transport.on("start loopStart", this._syncedStart), t.Transport.on("stop pause loopEnd", this._syncedStop), this
                    }, t.Source.prototype.unsync = function() {
                        this._synced && (t.Transport.off("stop pause loopEnd", this._syncedStop), t.Transport.off("start loopStart", this._syncedStart)), this._synced = !1;
                        for (var e = 0; e < this._scheduled.length; e++) {
                            var i = this._scheduled[e];
                            t.Transport.clear(i)
                        }
                        return this._scheduled = [], this._state.cancel(0), this
                    }, t.Source.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this), this.unsync(), this._scheduled = null, this._writable("volume"), this._volume.dispose(), this._volume = null, this.volume = null, this._state.dispose(), this._state = null
                    }, t.Source
                }), e(function(t) {
                    t.supported && (AudioBuffer.prototype.copyToChannel || (AudioBuffer.prototype.copyToChannel = function(t, e, i) {
                        var n = this.getChannelData(e);
                        i = i || 0;
                        for (var o = 0; o < n.length; o++) n[o + i] = t[o]
                    }, AudioBuffer.prototype.copyFromChannel = function(t, e, i) {
                        var n = this.getChannelData(e);
                        i = i || 0;
                        for (var o = 0; o < t.length; o++) t[o] = n[o + i]
                    }))
                }), e(function(t) {
                    return t.Buffer = function() {
                        var e = t.defaults(arguments, ["url", "onload", "onerror"], t.Buffer);
                        t.call(this), this._buffer = null, this._reversed = e.reverse, this._xhr = null, this._onload = t.noOp, e.url instanceof AudioBuffer || e.url instanceof t.Buffer ? (this.set(e.url), e.onload && (this.loaded ? e.onload(this) : this._onload = e.onload)) : t.isString(e.url) && this.load(e.url).then(e.onload)["catch"](e.onerror)
                    }, t.extend(t.Buffer), t.Buffer.defaults = {
                        url: void 0,
                        reverse: !1,
                        onload: t.noOp,
                        onerror: t.noOp
                    }, t.Buffer.prototype.set = function(e) {
                        return e instanceof t.Buffer ? e.loaded ? this._buffer = e.get() : e._onload = function() {
                            this.set(e), this._onload(this)
                        }.bind(this) : this._buffer = e, this
                    }, t.Buffer.prototype.get = function() {
                        return this._buffer
                    }, t.Buffer.prototype.load = function(e, i, n) {
                        var o = new Promise(function(o, s) {
                            this._xhr = t.Buffer.load(e, function(t) {
                                this._xhr = null, this.set(t), o(this), this._onload(this), i && i(this)
                            }.bind(this), function(t) {
                                this._xhr = null, s(t), n && n(t)
                            }.bind(this))
                        }.bind(this));
                        return o
                    }, t.Buffer.prototype.dispose = function() {
                        return t.prototype.dispose.call(this), this._buffer = null, this._xhr && (t.Buffer._removeFromDownloadQueue(this._xhr), this._xhr.abort(), this._xhr = null), this
                    }, Object.defineProperty(t.Buffer.prototype, "loaded", {
                        get: function() {
                            return this.length > 0
                        }
                    }), Object.defineProperty(t.Buffer.prototype, "duration", {
                        get: function() {
                            return this._buffer ? this._buffer.duration : 0
                        }
                    }), Object.defineProperty(t.Buffer.prototype, "length", {
                        get: function() {
                            return this._buffer ? this._buffer.length : 0
                        }
                    }), Object.defineProperty(t.Buffer.prototype, "numberOfChannels", {
                        get: function() {
                            return this._buffer ? this._buffer.numberOfChannels : 0
                        }
                    }), t.Buffer.prototype.fromArray = function(t) {
                        var e = t[0].length > 0,
                            i = e ? t.length : 1,
                            n = e ? t[0].length : t.length,
                            o = this.context.createBuffer(i, n, this.context.sampleRate);
                        e || 1 !== i || (t = [t]);
                        for (var s = 0; i > s; s++) o.copyToChannel(t[s], s);
                        return this._buffer = o, this
                    }, t.Buffer.prototype.toMono = function(e) {
                        if (t.isNumber(e)) this.fromArray(this.toArray(e));
                        else {
                            for (var i = new Float32Array(this.length), n = this.numberOfChannels, o = 0; n > o; o++)
                                for (var s = this.toArray(o), r = 0; r < s.length; r++) i[r] += s[r];
                            i = i.map(function(t) {
                                return t / n
                            }), this.fromArray(i)
                        }
                        return this
                    }, t.Buffer.prototype.toArray = function(e) {
                        if (t.isNumber(e)) return this.getChannelData(e);
                        if (1 === this.numberOfChannels) return this.toArray(0);
                        for (var i = [], n = 0; n < this.numberOfChannels; n++) i[n] = this.getChannelData(n);
                        return i
                    }, t.Buffer.prototype.getChannelData = function(t) {
                        return this._buffer.getChannelData(t)
                    }, t.Buffer.prototype.slice = function(e, i) {
                        i = t.defaultArg(i, this.duration);
                        for (var n = Math.floor(this.context.sampleRate * this.toSeconds(e)), o = Math.floor(this.context.sampleRate * this.toSeconds(i)), s = [], r = 0; r < this.numberOfChannels; r++) s[r] = this.toArray(r).slice(n, o);
                        var a = (new t.Buffer).fromArray(s);
                        return a
                    }, t.Buffer.prototype._reverse = function() {
                        if (this.loaded)
                            for (var t = 0; t < this.numberOfChannels; t++) Array.prototype.reverse.call(this.getChannelData(t));
                        return this
                    }, Object.defineProperty(t.Buffer.prototype, "reverse", {
                        get: function() {
                            return this._reversed
                        },
                        set: function(t) {
                            this._reversed !== t && (this._reversed = t, this._reverse())
                        }
                    }), t.Emitter.mixin(t.Buffer), t.Buffer._downloadQueue = [], t.Buffer.baseUrl = "", t.Buffer.fromArray = function(e) {
                        return (new t.Buffer).fromArray(e)
                    }, t.Buffer.fromUrl = function(e) {
                        var i = new t.Buffer;
                        return i.load(e).then(function() {
                            return i
                        })
                    }, t.Buffer._removeFromDownloadQueue = function(e) {
                        var i = t.Buffer._downloadQueue.indexOf(e); - 1 !== i && t.Buffer._downloadQueue.splice(i, 1)
                    }, t.Buffer.load = function(e, i, n) {
                        function o(e) {
                            if (t.Buffer._removeFromDownloadQueue(u), t.Buffer.emit("error", e), !n) throw e;
                            n(e)
                        }

                        function s() {
                            for (var e = 0, i = 0; i < t.Buffer._downloadQueue.length; i++) e += t.Buffer._downloadQueue[i].progress;
                            t.Buffer.emit("progress", e / t.Buffer._downloadQueue.length)
                        }
                        i = t.defaultArg(i, t.noOp);
                        var r = e.match(/\[(.+\|?)+\]$/);
                        if (r) {
                            for (var a = r[1].split("|"), l = a[0], h = 0; h < a.length; h++)
                                if (t.Buffer.supportsType(a[h])) {
                                    l = a[h];
                                    break
                                } e = e.replace(r[0], l)
                        }
                        var u = new XMLHttpRequest;
                        return u.open("GET", t.Buffer.baseUrl + e, !0), u.responseType = "arraybuffer", u.progress = 0, t.Buffer._downloadQueue.push(u), u.addEventListener("load", function() {
                            200 === u.status ? t.context.decodeAudioData(u.response).then(function(e) {
                                u.progress = 1, s(), i(e), t.Buffer._removeFromDownloadQueue(u), 0 === t.Buffer._downloadQueue.length && t.Buffer.emit("load")
                            })["catch"](function() {
                                t.Buffer._removeFromDownloadQueue(u), o("Tone.Buffer: could not decode audio data: " + e)
                            }) : o("Tone.Buffer: could not locate file: " + e)
                        }), u.addEventListener("error", o), u.addEventListener("progress", function(t) {
                            t.lengthComputable && (u.progress = t.loaded / t.total * .95, s())
                        }), u.send(), u
                    }, t.Buffer.cancelDownloads = function() {
                        return t.Buffer._downloadQueue.slice().forEach(function(e) {
                            t.Buffer._removeFromDownloadQueue(e), e.abort()
                        }), t.Buffer
                    }, t.Buffer.supportsType = function(t) {
                        var e = t.split(".");
                        e = e[e.length - 1];
                        var i = document.createElement("audio").canPlayType("audio/" + e);
                        return "" !== i
                    }, t.loaded = function() {
                        function e() {
                            t.Buffer.off("load", i), t.Buffer.off("error", n)
                        }
                        var i, n;
                        return new Promise(function(e, o) {
                            i = function() {
                                e()
                            }, n = function() {
                                o()
                            }, t.Buffer.on("load", i), t.Buffer.on("error", n)
                        }).then(e)["catch"](function(t) {
                            throw e(), new Error(t)
                        })
                    }, t.Buffer
                }), e(function(t) {
                    return t.OscillatorNode = function() {
                        var e = t.defaults(arguments, ["frequency", "type"], t.OscillatorNode);
                        t.AudioNode.call(this, e), this.onended = e.onended, this._startTime = -1, this._stopTime = -1, this._gainNode = this.output = new t.Gain, this._gainNode.gain.setValueAtTime(0, this.context.currentTime), this._oscillator = this.context.createOscillator(), this._oscillator.connect(this._gainNode), this.type = e.type, this.frequency = new t.Param(this._oscillator.frequency, t.Type.Frequency), this.frequency.value = e.frequency, this.detune = new t.Param(this._oscillator.detune, t.Type.Cents), this.detune.value = e.detune, this._gain = 1
                    }, t.extend(t.OscillatorNode, t.AudioNode), t.OscillatorNode.defaults = {
                        frequency: 440,
                        detune: 0,
                        type: "sine",
                        onended: t.noOp
                    }, Object.defineProperty(t.OscillatorNode.prototype, "state", {
                        get: function() {
                            return this.getStateAtTime(this.now())
                        }
                    }), t.OscillatorNode.prototype.getStateAtTime = function(e) {
                        return e = this.toSeconds(e), -1 !== this._startTime && e >= this._startTime && (-1 === this._stopTime || e <= this._stopTime) ? t.State.Started : t.State.Stopped
                    }, t.OscillatorNode.prototype.start = function(t) {
                        if (-1 !== this._startTime) throw new Error("cannot call OscillatorNode.start more than once");
                        this._startTime = this.toSeconds(t), this._oscillator.start(this._startTime);
                        var e = this.context.currentTime;
                        return this._gainNode.gain.cancelScheduledValues(e), this._gainNode.gain.setValueAtTime(0, e), this._gainNode.gain.setValueAtTime(1, this._startTime), this
                    }, t.OscillatorNode.prototype.setPeriodicWave = function(t) {
                        return this._oscillator.setPeriodicWave(t), this
                    }, t.OscillatorNode.prototype.stop = function(t) {
                        return this.cancelStop(), this._stopTime = this.toSeconds(t), this._gainNode.gain.setValueAtTime(0, this._stopTime), this.context.clearTimeout(this._timeout), this._timeout = this.context.setTimeout(function() {
                            this._oscillator.stop(this.now()), this.onended()
                        }.bind(this), this._stopTime - this.now()), this
                    }, t.OscillatorNode.prototype.cancelStop = function() {
                        return -1 !== this._startTime && (this._gainNode.gain.cancelScheduledValues(this._startTime + this.sampleTime), this._gainNode.gain.setValueAtTime(1, Math.max(this.now(), this._startTime)), this.context.clearTimeout(this._timeout), this._stopTime = -1), this
                    }, Object.defineProperty(t.OscillatorNode.prototype, "type", {
                        get: function() {
                            return this._oscillator.type
                        },
                        set: function(t) {
                            this._oscillator.type = t
                        }
                    }), t.OscillatorNode.prototype.dispose = function() {
                        return this.context.clearTimeout(this._timeout), t.AudioNode.prototype.dispose.call(this), this.onended = null, this._oscillator.disconnect(), this._oscillator = null, this._gainNode.dispose(), this._gainNode = null, this.frequency.dispose(), this.frequency = null, this.detune.dispose(), this.detune = null, this
                    }, t.OscillatorNode
                }), e(function(t) {
                    return t.Oscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "type"], t.Oscillator);
                        t.Source.call(this, e), this._oscillator = null, this.frequency = new t.Signal(e.frequency, t.Type.Frequency), this.detune = new t.Signal(e.detune, t.Type.Cents), this._wave = null, this._partials = t.defaultArg(e.partials, [1]), this._phase = e.phase, this._type = null, this.type = e.type, this.phase = this._phase, this._readOnly(["frequency", "detune"])
                    }, t.extend(t.Oscillator, t.Source), t.Oscillator.defaults = {
                        type: "sine",
                        frequency: 440,
                        detune: 0,
                        phase: 0,
                        partials: []
                    }, t.Oscillator.Type = {
                        Sine: "sine",
                        Triangle: "triangle",
                        Sawtooth: "sawtooth",
                        Square: "square",
                        Custom: "custom"
                    }, t.Oscillator.prototype._start = function(e) {
                        this._oscillator = new t.OscillatorNode, this._wave ? this._oscillator.setPeriodicWave(this._wave) : this._oscillator.type = this._type, this._oscillator.connect(this.output), this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), e = this.toSeconds(e), this._oscillator.start(e)
                    }, t.Oscillator.prototype._stop = function(t) {
                        return this._oscillator && (t = this.toSeconds(t), this._oscillator.stop(t)), this
                    }, t.Oscillator.prototype.restart = function(t) {
                        return this._oscillator.cancelStop(), this._state.cancel(this.toSeconds(t)), this
                    }, t.Oscillator.prototype.syncFrequency = function() {
                        return t.Transport.syncSignal(this.frequency), this
                    }, t.Oscillator.prototype.unsyncFrequency = function() {
                        return t.Transport.unsyncSignal(this.frequency), this
                    }, Object.defineProperty(t.Oscillator.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(e) {
                            var i = [t.Oscillator.Type.Sine, t.Oscillator.Type.Square, t.Oscillator.Type.Triangle, t.Oscillator.Type.Sawtooth].includes(e);
                            if (0 === this._phase && i) this._wave = null, null !== this._oscillator && this._oscillator.type === e;
                            else {
                                var n = this._getRealImaginary(e, this._phase),
                                    o = this.context.createPeriodicWave(n[0], n[1]);
                                this._wave = o, null !== this._oscillator && this._oscillator.setPeriodicWave(this._wave)
                            }
                            this._type = e
                        }
                    }), t.Oscillator.prototype._getRealImaginary = function(e, i) {
                        var n = 4096,
                            o = n / 2,
                            s = new Float32Array(o),
                            r = new Float32Array(o),
                            a = 1;
                        if (e === t.Oscillator.Type.Custom) a = this._partials.length + 1, o = a;
                        else {
                            var l = /^(sine|triangle|square|sawtooth)(\d+)$/.exec(e);
                            l && (a = parseInt(l[2]) + 1, e = l[1], a = Math.max(a, 2), o = a)
                        }
                        for (var h = 1; o > h; ++h) {
                            var u, c = 2 / (h * Math.PI);
                            switch (e) {
                                case t.Oscillator.Type.Sine:
                                    u = a >= h ? 1 : 0;
                                    break;
                                case t.Oscillator.Type.Square:
                                    u = 1 & h ? 2 * c : 0;
                                    break;
                                case t.Oscillator.Type.Sawtooth:
                                    u = c * (1 & h ? 1 : -1);
                                    break;
                                case t.Oscillator.Type.Triangle:
                                    u = 1 & h ? 2 * (c * c) * (h - 1 >> 1 & 1 ? -1 : 1) : 0;
                                    break;
                                case t.Oscillator.Type.Custom:
                                    u = this._partials[h - 1];
                                    break;
                                default:
                                    throw new TypeError("Tone.Oscillator: invalid type: " + e)
                            }
                            0 !== u ? (s[h] = -u * Math.sin(i * h), r[h] = u * Math.cos(i * h)) : (s[h] = 0, r[h] = 0)
                        }
                        return [s, r]
                    }, t.Oscillator.prototype._inverseFFT = function(t, e, i) {
                        for (var n = 0, o = t.length, s = 0; o > s; s++) n += t[s] * Math.cos(s * i) + e[s] * Math.sin(s * i);
                        return n
                    }, t.Oscillator.prototype._getInitialValue = function() {
                        for (var t = this._getRealImaginary(this._type, 0), e = t[0], i = t[1], n = 0, o = 2 * Math.PI, s = 0; 8 > s; s++) n = Math.max(this._inverseFFT(e, i, s / 8 * o), n);
                        return -this._inverseFFT(e, i, this._phase) / n
                    }, Object.defineProperty(t.Oscillator.prototype, "partials", {
                        get: function() {
                            return this._type !== t.Oscillator.Type.Custom ? [] : this._partials
                        },
                        set: function(e) {
                            this._partials = e, this.type = t.Oscillator.Type.Custom
                        }
                    }), Object.defineProperty(t.Oscillator.prototype, "phase", {
                        get: function() {
                            return this._phase * (180 / Math.PI)
                        },
                        set: function(t) {
                            this._phase = t * Math.PI / 180, this.type = this._type
                        }
                    }), t.Oscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), null !== this._oscillator && (this._oscillator.dispose(), this._oscillator = null), this._wave = null, this._writable(["frequency", "detune"]), this.frequency.dispose(), this.frequency = null, this.detune.dispose(), this.detune = null, this._partials = null, this
                    }, t.Oscillator
                }), e(function(t) {
                    return t.AudioToGain = function() {
                        t.SignalBase.call(this), this._norm = this.input = this.output = new t.WaveShaper(function(t) {
                            return (t + 1) / 2
                        })
                    }, t.extend(t.AudioToGain, t.SignalBase), t.AudioToGain.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._norm.dispose(), this._norm = null, this
                    }, t.AudioToGain
                }), e(function(t) {
                    return t.Zero = function() {
                        t.SignalBase.call(this), this._gain = this.input = this.output = new t.Gain, this.context.getConstant(0).connect(this._gain)
                    }, t.extend(t.Zero, t.SignalBase), t.Zero.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._gain.dispose(), this._gain = null, this
                    }, t.Zero
                }), e(function(t) {
                    return t.LFO = function() {
                        var e = t.defaults(arguments, ["frequency", "min", "max"], t.LFO);
                        t.AudioNode.call(this), this._oscillator = new t.Oscillator({
                            frequency: e.frequency,
                            type: e.type
                        }), this.frequency = this._oscillator.frequency, this.amplitude = this._oscillator.volume, this.amplitude.units = t.Type.NormalRange, this.amplitude.value = e.amplitude, this._stoppedSignal = new t.Signal(0, t.Type.AudioRange), this._zeros = new t.Zero, this._stoppedValue = 0, this._a2g = new t.AudioToGain, this._scaler = this.output = new t.Scale(e.min, e.max), this._units = t.Type.Default, this.units = e.units, this._oscillator.chain(this._a2g, this._scaler), this._zeros.connect(this._a2g), this._stoppedSignal.connect(this._a2g), this._readOnly(["amplitude", "frequency"]), this.phase = e.phase
                    }, t.extend(t.LFO, t.AudioNode), t.LFO.defaults = {
                        type: "sine",
                        min: 0,
                        max: 1,
                        phase: 0,
                        frequency: "4n",
                        amplitude: 1,
                        units: t.Type.Default
                    }, t.LFO.prototype.start = function(t) {
                        return t = this.toSeconds(t), this._stoppedSignal.setValueAtTime(0, t), this._oscillator.start(t), this
                    }, t.LFO.prototype.stop = function(t) {
                        return t = this.toSeconds(t), this._stoppedSignal.setValueAtTime(this._stoppedValue, t), this._oscillator.stop(t), this
                    }, t.LFO.prototype.sync = function() {
                        return this._oscillator.sync(), this._oscillator.syncFrequency(), this
                    }, t.LFO.prototype.unsync = function() {
                        return this._oscillator.unsync(), this._oscillator.unsyncFrequency(), this
                    }, Object.defineProperty(t.LFO.prototype, "min", {
                        get: function() {
                            return this._toUnits(this._scaler.min)
                        },
                        set: function(t) {
                            t = this._fromUnits(t), this._scaler.min = t
                        }
                    }), Object.defineProperty(t.LFO.prototype, "max", {
                        get: function() {
                            return this._toUnits(this._scaler.max)
                        },
                        set: function(t) {
                            t = this._fromUnits(t), this._scaler.max = t
                        }
                    }), Object.defineProperty(t.LFO.prototype, "type", {
                        get: function() {
                            return this._oscillator.type
                        },
                        set: function(t) {
                            this._oscillator.type = t, this._stoppedValue = this._oscillator._getInitialValue(), this._stoppedSignal.value = this._stoppedValue
                        }
                    }), Object.defineProperty(t.LFO.prototype, "phase", {
                        get: function() {
                            return this._oscillator.phase
                        },
                        set: function(t) {
                            this._oscillator.phase = t, this._stoppedValue = this._oscillator._getInitialValue(), this._stoppedSignal.value = this._stoppedValue
                        }
                    }), Object.defineProperty(t.LFO.prototype, "units", {
                        get: function() {
                            return this._units
                        },
                        set: function(t) {
                            var e = this.min,
                                i = this.max;
                            this._units = t, this.min = e, this.max = i
                        }
                    }), Object.defineProperty(t.LFO.prototype, "mute", {
                        get: function() {
                            return this._oscillator.mute
                        },
                        set: function(t) {
                            this._oscillator.mute = t
                        }
                    }), Object.defineProperty(t.LFO.prototype, "state", {
                        get: function() {
                            return this._oscillator.state
                        }
                    }), t.LFO.prototype.connect = function(e) {
                        return (e.constructor === t.Signal || e.constructor === t.Param) && (this.convert = e.convert, this.units = e.units), t.SignalBase.prototype.connect.apply(this, arguments), this
                    }, t.LFO.prototype._fromUnits = t.Param.prototype._fromUnits, t.LFO.prototype._toUnits = t.Param.prototype._toUnits, t.LFO.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["amplitude", "frequency"]), this._oscillator.dispose(), this._oscillator = null, this._stoppedSignal.dispose(), this._stoppedSignal = null, this._zeros.dispose(), this._zeros = null, this._scaler.dispose(), this._scaler = null, this._a2g.dispose(), this._a2g = null, this.frequency = null, this.amplitude = null, this
                    }, t.LFO
                }), e(function(t) {
                    return t.Limiter = function() {
                        var e = t.defaults(arguments, ["threshold"], t.Limiter);
                        t.AudioNode.call(this), this._compressor = this.input = this.output = new t.Compressor({
                            attack: .001,
                            decay: .001,
                            threshold: e.threshold
                        }), this.threshold = this._compressor.threshold, this._readOnly("threshold")
                    }, t.extend(t.Limiter, t.AudioNode), t.Limiter.defaults = {
                        threshold: -12
                    }, t.Limiter.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._compressor.dispose(), this._compressor = null, this._writable("threshold"), this.threshold = null, this
                    }, t.Limiter
                }), e(function(t) {
                    return t.LowpassCombFilter = function() {
                        var e = t.defaults(arguments, ["delayTime", "resonance", "dampening"], t.LowpassCombFilter);
                        t.AudioNode.call(this), this.createInsOuts(1, 1), this._delay = this.input = new t.Delay(e.delayTime), this.delayTime = this._delay.delayTime, this._lowpass = this.output = this.context.createBiquadFilter(), this._lowpass.Q.value = -3.0102999566398125, this._lowpass.type = "lowpass", this.dampening = new t.Param({
                            param: this._lowpass.frequency,
                            units: t.Type.Frequency,
                            value: e.dampening
                        }), this._feedback = new t.Gain(e.resonance, t.Type.NormalRange), this.resonance = this._feedback.gain, this._delay.chain(this._lowpass, this._feedback, this._delay), this._readOnly(["dampening", "resonance", "delayTime"])
                    }, t.extend(t.LowpassCombFilter, t.AudioNode), t.LowpassCombFilter.defaults = {
                        delayTime: .1,
                        resonance: .5,
                        dampening: 3e3
                    }, t.LowpassCombFilter.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["dampening", "resonance", "delayTime"]), this.dampening.dispose(), this.dampening = null, this.resonance.dispose(), this.resonance = null, this._delay.dispose(), this._delay = null, this.delayTime = null, this._lowpass.disconnect(), this._lowpass = null, this._feedback.disconnect(), this._feedback = null, this
                    }, t.LowpassCombFilter
                }), e(function(t) {
                    return t.Merge = function() {
                        t.AudioNode.call(this), this.createInsOuts(2, 0), this.left = this.input[0] = new t.Gain, this.right = this.input[1] = new t.Gain, this._merger = this.output = this.context.createChannelMerger(2), this.left.connect(this._merger, 0, 0), this.right.connect(this._merger, 0, 1), this.left.channelCount = 1, this.right.channelCount = 1, this.left.channelCountMode = "explicit", this.right.channelCountMode = "explicit"
                    }, t.extend(t.Merge, t.AudioNode), t.Merge.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this.left.dispose(), this.left = null, this.right.dispose(), this.right = null, this._merger.disconnect(), this._merger = null, this
                    }, t.Merge
                }), e(function(t) {
                    return t.Meter = function() {
                        var e = t.defaults(arguments, ["smoothing"], t.Meter);
                        t.AudioNode.call(this), this.input = this.output = this._analyser = new t.Analyser("waveform", 1024), this.smoothing = e.smoothing
                    }, t.extend(t.Meter, t.AudioNode), t.Meter.defaults = {
                        smoothing: .8
                    }, t.Meter.prototype.getLevel = function() {
                        this._analyser.type = "fft";
                        var t = this._analyser.getValue(),
                            e = 28;
                        return Math.max.apply(this, t) + e
                    }, t.Meter.prototype.getValue = function() {
                        this._analyser.type = "waveform";
                        var t = this._analyser.getValue();
                        return t[0]
                    }, Object.defineProperty(t.Meter.prototype, "smoothing", {
                        get: function() {
                            return this._analyser.smoothing
                        },
                        set: function(t) {
                            this._analyser.smoothing = t
                        }
                    }), t.Meter.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._analyser.dispose(), this._analyser = null, this
                    }, t.Meter
                }), e(function(t) {
                    return t.Split = function() {
                        t.AudioNode.call(this), this.createInsOuts(0, 2), this._splitter = this.input = this.context.createChannelSplitter(2), this._splitter.channelCount = 2, this._splitter.channelCountMode = "explicit", this.left = this.output[0] = new t.Gain, this.right = this.output[1] = new t.Gain, this._splitter.connect(this.left, 0, 0), this._splitter.connect(this.right, 1, 0)
                    }, t.extend(t.Split, t.AudioNode), t.Split.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._splitter.disconnect(), this.left.dispose(), this.left = null, this.right.dispose(), this.right = null, this._splitter = null, this
                    }, t.Split
                }), e(function(t) {
                    return t.MidSideSplit = function() {
                        t.AudioNode.call(this), this.createInsOuts(0, 2), this._split = this.input = new t.Split, this._midAdd = new t.Add, this.mid = this.output[0] = new t.Multiply(Math.SQRT1_2), this._sideSubtract = new t.Subtract, this.side = this.output[1] = new t.Multiply(Math.SQRT1_2), this._split.connect(this._midAdd, 0, 0), this._split.connect(this._midAdd, 1, 1), this._split.connect(this._sideSubtract, 0, 0), this._split.connect(this._sideSubtract, 1, 1), this._midAdd.connect(this.mid), this._sideSubtract.connect(this.side)
                    }, t.extend(t.MidSideSplit, t.AudioNode), t.MidSideSplit.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this.mid.dispose(), this.mid = null, this.side.dispose(), this.side = null, this._midAdd.dispose(), this._midAdd = null, this._sideSubtract.dispose(), this._sideSubtract = null, this._split.dispose(), this._split = null, this
                    }, t.MidSideSplit
                }), e(function(t) {
                    return t.MidSideMerge = function() {
                        t.AudioNode.call(this), this.createInsOuts(2, 0), this.mid = this.input[0] = new t.Gain, this._left = new t.Add, this._timesTwoLeft = new t.Multiply(Math.SQRT1_2), this.side = this.input[1] = new t.Gain, this._right = new t.Subtract, this._timesTwoRight = new t.Multiply(Math.SQRT1_2), this._merge = this.output = new t.Merge, this.mid.connect(this._left, 0, 0), this.side.connect(this._left, 0, 1), this.mid.connect(this._right, 0, 0), this.side.connect(this._right, 0, 1), this._left.connect(this._timesTwoLeft), this._right.connect(this._timesTwoRight), this._timesTwoLeft.connect(this._merge, 0, 0), this._timesTwoRight.connect(this._merge, 0, 1)
                    }, t.extend(t.MidSideMerge, t.AudioNode), t.MidSideMerge.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this.mid.dispose(), this.mid = null, this.side.dispose(), this.side = null, this._left.dispose(), this._left = null, this._timesTwoLeft.dispose(), this._timesTwoLeft = null, this._right.dispose(), this._right = null, this._timesTwoRight.dispose(), this._timesTwoRight = null, this._merge.dispose(), this._merge = null, this
                    }, t.MidSideMerge
                }), e(function(t) {
                    return t.MidSideCompressor = function(e) {
                        t.AudioNode.call(this), e = t.defaultArg(e, t.MidSideCompressor.defaults), this._midSideSplit = this.input = new t.MidSideSplit, this._midSideMerge = this.output = new t.MidSideMerge, this.mid = new t.Compressor(e.mid), this.side = new t.Compressor(e.side), this._midSideSplit.mid.chain(this.mid, this._midSideMerge.mid), this._midSideSplit.side.chain(this.side, this._midSideMerge.side), this._readOnly(["mid", "side"])
                    }, t.extend(t.MidSideCompressor, t.AudioNode), t.MidSideCompressor.defaults = {
                        mid: {
                            ratio: 3,
                            threshold: -24,
                            release: .03,
                            attack: .02,
                            knee: 16
                        },
                        side: {
                            ratio: 6,
                            threshold: -30,
                            release: .25,
                            attack: .03,
                            knee: 10
                        }
                    }, t.MidSideCompressor.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["mid", "side"]), this.mid.dispose(), this.mid = null, this.side.dispose(), this.side = null, this._midSideSplit.dispose(), this._midSideSplit = null, this._midSideMerge.dispose(), this._midSideMerge = null, this
                    }, t.MidSideCompressor
                }), e(function(t) {
                    return t.Mono = function() {
                        t.AudioNode.call(this), this.createInsOuts(1, 0), this._merge = this.output = new t.Merge, this.input.connect(this._merge, 0, 0), this.input.connect(this._merge, 0, 1)
                    }, t.extend(t.Mono, t.AudioNode), t.Mono.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._merge.dispose(), this._merge = null, this
                    }, t.Mono
                }), e(function(t) {
                    return t.MultibandCompressor = function(e) {
                        t.AudioNode.call(this), e = t.defaultArg(arguments, t.MultibandCompressor.defaults), this._splitter = this.input = new t.MultibandSplit({
                            lowFrequency: e.lowFrequency,
                            highFrequency: e.highFrequency
                        }), this.lowFrequency = this._splitter.lowFrequency, this.highFrequency = this._splitter.highFrequency, this.output = new t.Gain, this.low = new t.Compressor(e.low), this.mid = new t.Compressor(e.mid), this.high = new t.Compressor(e.high), this._splitter.low.chain(this.low, this.output), this._splitter.mid.chain(this.mid, this.output), this._splitter.high.chain(this.high, this.output), this._readOnly(["high", "mid", "low", "highFrequency", "lowFrequency"])
                    }, t.extend(t.MultibandCompressor, t.AudioNode), t.MultibandCompressor.defaults = {
                        low: t.Compressor.defaults,
                        mid: t.Compressor.defaults,
                        high: t.Compressor.defaults,
                        lowFrequency: 250,
                        highFrequency: 2e3
                    }, t.MultibandCompressor.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._splitter.dispose(), this._writable(["high", "mid", "low", "highFrequency", "lowFrequency"]), this.low.dispose(), this.mid.dispose(), this.high.dispose(), this._splitter = null, this.low = null, this.mid = null, this.high = null, this.lowFrequency = null, this.highFrequency = null, this
                    }, t.MultibandCompressor
                }), e(function(t) {
                    if (t.supported && !window.StereoPannerNode) {
                        var e = function(e) {
                            this.context = e, this.pan = new t.Signal(0, t.Type.AudioRange);
                            var i = new t.WaveShaper(function(e) {
                                    return t.equalPowerScale((e + 1) / 2)
                                }, 4096),
                                n = new t.WaveShaper(function(e) {
                                    return t.equalPowerScale(1 - (e + 1) / 2)
                                }, 4096),
                                o = new t.Gain,
                                s = new t.Gain,
                                r = this.input = new t.Split,
                                a = new t.Zero;
                            a.fan(i, n);
                            var l = this.output = new t.Merge;
                            r.left.chain(o, l.left), r.right.chain(s, l.right), this.pan.chain(n, o.gain), this.pan.chain(i, s.gain)
                        };
                        e.prototype.disconnect = function() {
                            this.output.disconnect.apply(this.output, arguments)
                        }, e.prototype.connect = function() {
                            this.output.connect.apply(this.output, arguments)
                        }, AudioContext.prototype.createStereoPanner = function() {
                            return new e(this)
                        }, t.Context.prototype.createStereoPanner = function() {
                            return new e(this)
                        }
                    }
                }), e(function(t) {
                    return t.Panner = function(e) {
                        t.AudioNode.call(this), this._panner = this.input = this.output = this.context.createStereoPanner(), this.pan = this._panner.pan, this.pan.value = t.defaultArg(e, 0), this._readOnly("pan")
                    }, t.extend(t.Panner, t.AudioNode), t.Panner.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable("pan"), this._panner.disconnect(), this._panner = null, this.pan = null, this
                    }, t.Panner
                }), e(function(t) {
                    return t.Panner3D = function() {
                        var e = t.defaults(arguments, ["positionX", "positionY", "positionZ"], t.Panner3D);
                        t.AudioNode.call(this), this._panner = this.input = this.output = this.context.createPanner(), this._panner.panningModel = e.panningModel, this._panner.maxDistance = e.maxDistance, this._panner.distanceModel = e.distanceModel, this._panner.coneOuterGain = e.coneOuterGain, this._panner.coneOuterAngle = e.coneOuterAngle, this._panner.coneInnerAngle = e.coneInnerAngle, this._panner.refDistance = e.refDistance, this._panner.rolloffFactor = e.rolloffFactor, this._orientation = [e.orientationX, e.orientationY, e.orientationZ], this._position = [e.positionX, e.positionY, e.positionZ], this.orientationX = e.orientationX, this.orientationY = e.orientationY, this.orientationZ = e.orientationZ, this.positionX = e.positionX, this.positionY = e.positionY, this.positionZ = e.positionZ
                    }, t.extend(t.Panner3D, t.AudioNode), t.Panner3D.defaults = {
                        positionX: 0,
                        positionY: 0,
                        positionZ: 0,
                        orientationX: 0,
                        orientationY: 0,
                        orientationZ: 0,
                        panningModel: "equalpower",
                        maxDistance: 1e4,
                        distanceModel: "inverse",
                        coneOuterGain: 0,
                        coneOuterAngle: 360,
                        coneInnerAngle: 360,
                        refDistance: 1,
                        rolloffFactor: 1
                    }, t.Panner3D.prototype._rampTimeConstant = .01, t.Panner3D.prototype.setPosition = function(t, e, i) {
                        if (this._panner.positionX) {
                            var n = this.now();
                            this._panner.positionX.setTargetAtTime(t, n, this._rampTimeConstant), this._panner.positionY.setTargetAtTime(e, n, this._rampTimeConstant), this._panner.positionZ.setTargetAtTime(i, n, this._rampTimeConstant)
                        } else this._panner.setPosition(t, e, i);
                        return this._position = Array.prototype.slice.call(arguments), this
                    }, t.Panner3D.prototype.setOrientation = function(t, e, i) {
                        if (this._panner.orientationX) {
                            var n = this.now();
                            this._panner.orientationX.setTargetAtTime(t, n, this._rampTimeConstant), this._panner.orientationY.setTargetAtTime(e, n, this._rampTimeConstant), this._panner.orientationZ.setTargetAtTime(i, n, this._rampTimeConstant)
                        } else this._panner.setOrientation(t, e, i);
                        return this._orientation = Array.prototype.slice.call(arguments), this
                    }, Object.defineProperty(t.Panner3D.prototype, "positionX", {
                        set: function(t) {
                            this._position[0] = t, this.setPosition.apply(this, this._position)
                        },
                        get: function() {
                            return this._position[0]
                        }
                    }), Object.defineProperty(t.Panner3D.prototype, "positionY", {
                        set: function(t) {
                            this._position[1] = t, this.setPosition.apply(this, this._position)
                        },
                        get: function() {
                            return this._position[1]
                        }
                    }), Object.defineProperty(t.Panner3D.prototype, "positionZ", {
                        set: function(t) {
                            this._position[2] = t, this.setPosition.apply(this, this._position)
                        },
                        get: function() {
                            return this._position[2]
                        }
                    }), Object.defineProperty(t.Panner3D.prototype, "orientationX", {
                        set: function(t) {
                            this._orientation[0] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[0]
                        }
                    }), Object.defineProperty(t.Panner3D.prototype, "orientationY", {
                        set: function(t) {
                            this._orientation[1] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[1]
                        }
                    }), Object.defineProperty(t.Panner3D.prototype, "orientationZ", {
                        set: function(t) {
                            this._orientation[2] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[2]
                        }
                    }), t.Panner3D._aliasProperty = function(e) {
                        Object.defineProperty(t.Panner3D.prototype, e, {
                            set: function(t) {
                                this._panner[e] = t
                            },
                            get: function() {
                                return this._panner[e]
                            }
                        })
                    }, t.Panner3D._aliasProperty("panningModel"), t.Panner3D._aliasProperty("refDistance"), t.Panner3D._aliasProperty("rolloffFactor"), t.Panner3D._aliasProperty("distanceModel"), t.Panner3D._aliasProperty("coneInnerAngle"), t.Panner3D._aliasProperty("coneOuterAngle"), t.Panner3D._aliasProperty("coneOuterGain"), t.Panner3D._aliasProperty("maxDistance"), t.Panner3D.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._panner.disconnect(), this._panner = null, this._orientation = null, this._position = null, this
                    }, t.Panner3D
                }), e(function(t) {
                    return t.PanVol = function() {
                        var e = t.defaults(arguments, ["pan", "volume"], t.PanVol);
                        t.AudioNode.call(this), this._panner = this.input = new t.Panner(e.pan), this.pan = this._panner.pan, this._volume = this.output = new t.Volume(e.volume), this.volume = this._volume.volume, this._panner.connect(this._volume), this.mute = e.mute, this._readOnly(["pan", "volume"])
                    }, t.extend(t.PanVol, t.AudioNode), t.PanVol.defaults = {
                        pan: 0,
                        volume: 0,
                        mute: !1
                    }, Object.defineProperty(t.PanVol.prototype, "mute", {
                        get: function() {
                            return this._volume.mute
                        },
                        set: function(t) {
                            this._volume.mute = t
                        }
                    }), t.PanVol.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._writable(["pan", "volume"]), this._panner.dispose(), this._panner = null, this.pan = null, this._volume.dispose(), this._volume = null, this.volume = null, this
                    }, t.PanVol
                }), e(function(t) {
                    return t.Solo = function() {
                        var e = t.defaults(arguments, ["solo"], t.Solo);
                        t.AudioNode.call(this), this.input = this.output = new t.Gain, this._soloBind = this._soloed.bind(this), this.context.on("solo", this._soloBind), this.solo = e.solo
                    }, t.extend(t.Solo, t.AudioNode), t.Solo.defaults = {
                        solo: !1
                    }, Object.defineProperty(t.Solo.prototype, "solo", {
                        get: function() {
                            return this._isSoloed()
                        },
                        set: function(t) {
                            t ? this._addSolo() : this._removeSolo(), this.context.emit("solo", this)
                        }
                    }), Object.defineProperty(t.Solo.prototype, "muted", {
                        get: function() {
                            return 0 === this.input.gain.value
                        }
                    }), t.Solo.prototype._addSolo = function() {
                        t.isArray(this.context._currentSolo) || (this.context._currentSolo = []), this._isSoloed() || this.context._currentSolo.push(this)
                    }, t.Solo.prototype._removeSolo = function() {
                        if (this._isSoloed()) {
                            var t = this.context._currentSolo.indexOf(this);
                            this.context._currentSolo.splice(t, 1)
                        }
                    }, t.Solo.prototype._isSoloed = function() {
                        return t.isArray(this.context._currentSolo) ? 0 !== this.context._currentSolo.length && -1 !== this.context._currentSolo.indexOf(this) : !1
                    }, t.Solo.prototype._noSolos = function() {
                        return !t.isArray(this.context._currentSolo) || 0 === this.context._currentSolo.length
                    }, t.Solo.prototype._soloed = function() {
                        this._isSoloed() ? this.input.gain.value = 1 : this._noSolos() ? this.input.gain.value = 1 : this.input.gain.value = 0
                    }, t.Solo.prototype.dispose = function() {
                        return this.context.off("solo", this._soloBind), this._removeSolo(), this._soloBind = null, t.AudioNode.prototype.dispose.call(this), this
                    }, t.Solo
                }), e(function(t) {
                    return t.Waveform = function() {
                        var e = t.defaults(arguments, ["size"], t.Waveform);
                        e.type = t.Analyser.Type.Waveform, t.AudioNode.call(this), this._analyser = this.input = this.output = new t.Analyser(e)
                    }, t.extend(t.Waveform, t.AudioNode), t.Waveform.defaults = {
                        size: 1024
                    }, t.Waveform.prototype.getValue = function() {
                        return this._analyser.getValue()
                    }, Object.defineProperty(t.Waveform.prototype, "size", {
                        get: function() {
                            return this._analyser.size
                        },
                        set: function(t) {
                            this._analyser.size = t
                        }
                    }), t.Waveform.prototype.dispose = function() {
                        t.AudioNode.prototype.dispose.call(this), this._analyser.dispose(), this._analyser = null
                    }, t.Waveform
                }), e(function(t) {
                    return t.CtrlInterpolate = function() {
                        var e = t.defaults(arguments, ["values", "index"], t.CtrlInterpolate);
                        t.call(this), this.values = e.values, this.index = e.index
                    }, t.extend(t.CtrlInterpolate), t.CtrlInterpolate.defaults = {
                        index: 0,
                        values: []
                    }, Object.defineProperty(t.CtrlInterpolate.prototype, "value", {
                        get: function() {
                            var t = this.index;
                            t = Math.min(t, this.values.length - 1);
                            var e = Math.floor(t),
                                i = this.values[e],
                                n = this.values[Math.ceil(t)];
                            return this._interpolate(t - e, i, n)
                        }
                    }), t.CtrlInterpolate.prototype._interpolate = function(e, i, n) {
                        if (t.isArray(i)) {
                            for (var o = [], s = 0; s < i.length; s++) o[s] = this._interpolate(e, i[s], n[s]);
                            return o
                        }
                        if (t.isObject(i)) {
                            var r = {};
                            for (var a in i) r[a] = this._interpolate(e, i[a], n[a]);
                            return r
                        }
                        return i = this._toNumber(i), n = this._toNumber(n), (1 - e) * i + e * n
                    }, t.CtrlInterpolate.prototype._toNumber = function(e) {
                        return t.isNumber(e) ? e : this.toSeconds(e)
                    }, t.CtrlInterpolate.prototype.dispose = function() {
                        this.values = null
                    }, t.CtrlInterpolate
                }), e(function(t) {
                    return t.CtrlMarkov = function(e, i) {
                        t.call(this), this.values = t.defaultArg(e, {}), this.value = t.defaultArg(i, Object.keys(this.values)[0])
                    }, t.extend(t.CtrlMarkov), t.CtrlMarkov.prototype.next = function() {
                        if (this.values.hasOwnProperty(this.value)) {
                            var e = this.values[this.value];
                            if (t.isArray(e))
                                for (var i = this._getProbDistribution(e), n = Math.random(), o = 0, s = 0; s < i.length; s++) {
                                    var r = i[s];
                                    if (n > o && o + r > n) {
                                        var a = e[s];
                                        t.isObject(a) ? this.value = a.value : this.value = a
                                    }
                                    o += r
                                } else this.value = e
                        }
                        return this.value
                    }, t.CtrlMarkov.prototype._getProbDistribution = function(e) {
                        for (var i = [], n = 0, o = !1, s = 0; s < e.length; s++) {
                            var r = e[s];
                            t.isObject(r) ? (o = !0, i[s] = r.probability) : i[s] = 1 / e.length, n += i[s]
                        }
                        if (o)
                            for (var a = 0; a < i.length; a++) i[a] = i[a] / n;
                        return i
                    }, t.CtrlMarkov.prototype.dispose = function() {
                        this.values = null
                    }, t.CtrlMarkov
                }), e(function(t) {
                    return t.CtrlPattern = function() {
                        var e = t.defaults(arguments, ["values", "type"], t.CtrlPattern);
                        t.call(this), this.values = e.values, this.index = 0, this._type = null, this._shuffled = null, this._direction = null, this.type = e.type
                    }, t.extend(t.CtrlPattern), t.CtrlPattern.Type = {
                        Up: "up",
                        Down: "down",
                        UpDown: "upDown",
                        DownUp: "downUp",
                        AlternateUp: "alternateUp",
                        AlternateDown: "alternateDown",
                        Random: "random",
                        RandomWalk: "randomWalk",
                        RandomOnce: "randomOnce"
                    }, t.CtrlPattern.defaults = {
                        type: t.CtrlPattern.Type.Up,
                        values: []
                    }, Object.defineProperty(t.CtrlPattern.prototype, "value", {
                        get: function() {
                            if (0 !== this.values.length) {
                                if (1 === this.values.length) return this.values[0];
                                this.index = Math.min(this.index, this.values.length - 1);
                                var e = this.values[this.index];
                                return this.type === t.CtrlPattern.Type.RandomOnce && (this.values.length !== this._shuffled.length && this._shuffleValues(), e = this.values[this._shuffled[this.index]]), e
                            }
                        }
                    }), Object.defineProperty(t.CtrlPattern.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(e) {
                            this._type = e, this._shuffled = null, this._type === t.CtrlPattern.Type.Up || this._type === t.CtrlPattern.Type.UpDown || this._type === t.CtrlPattern.Type.RandomOnce || this._type === t.CtrlPattern.Type.AlternateUp ? this.index = 0 : (this._type === t.CtrlPattern.Type.Down || this._type === t.CtrlPattern.Type.DownUp || this._type === t.CtrlPattern.Type.AlternateDown) && (this.index = this.values.length - 1), this._type === t.CtrlPattern.Type.UpDown || this._type === t.CtrlPattern.Type.AlternateUp ? this._direction = t.CtrlPattern.Type.Up : (this._type === t.CtrlPattern.Type.DownUp || this._type === t.CtrlPattern.Type.AlternateDown) && (this._direction = t.CtrlPattern.Type.Down), this._type === t.CtrlPattern.Type.RandomOnce ? this._shuffleValues() : this._type === t.CtrlPattern.Random && (this.index = Math.floor(Math.random() * this.values.length))
                        }
                    }), t.CtrlPattern.prototype.next = function() {
                        var e = this.type;
                        return e === t.CtrlPattern.Type.Up ? (this.index++, this.index >= this.values.length && (this.index = 0)) : e === t.CtrlPattern.Type.Down ? (this.index--, this.index < 0 && (this.index = this.values.length - 1)) : e === t.CtrlPattern.Type.UpDown || e === t.CtrlPattern.Type.DownUp ? (this._direction === t.CtrlPattern.Type.Up ? this.index++ : this.index--, this.index < 0 ? (this.index = 1, this._direction = t.CtrlPattern.Type.Up) : this.index >= this.values.length && (this.index = this.values.length - 2, this._direction = t.CtrlPattern.Type.Down)) : e === t.CtrlPattern.Type.Random ? this.index = Math.floor(Math.random() * this.values.length) : e === t.CtrlPattern.Type.RandomWalk ? Math.random() < .5 ? (this.index--, this.index = Math.max(this.index, 0)) : (this.index++, this.index = Math.min(this.index, this.values.length - 1)) : e === t.CtrlPattern.Type.RandomOnce ? (this.index++, this.index >= this.values.length && (this.index = 0, this._shuffleValues())) : e === t.CtrlPattern.Type.AlternateUp ? (this._direction === t.CtrlPattern.Type.Up ? (this.index += 2, this._direction = t.CtrlPattern.Type.Down) : (this.index -= 1, this._direction = t.CtrlPattern.Type.Up), this.index >= this.values.length && (this.index = 0, this._direction = t.CtrlPattern.Type.Up)) : e === t.CtrlPattern.Type.AlternateDown && (this._direction === t.CtrlPattern.Type.Up ? (this.index += 1, this._direction = t.CtrlPattern.Type.Down) : (this.index -= 2, this._direction = t.CtrlPattern.Type.Up), this.index < 0 && (this.index = this.values.length - 1, this._direction = t.CtrlPattern.Type.Down)), this.value
                    }, t.CtrlPattern.prototype._shuffleValues = function() {
                        var t = [];
                        this._shuffled = [];
                        for (var e = 0; e < this.values.length; e++) t[e] = e;
                        for (; t.length > 0;) {
                            var i = t.splice(Math.floor(t.length * Math.random()), 1);
                            this._shuffled.push(i[0])
                        }
                    }, t.CtrlPattern.prototype.dispose = function() {
                        this._shuffled = null, this.values = null
                    }, t.CtrlPattern
                }), e(function(t) {
                    return t.CtrlRandom = function() {
                        var e = t.defaults(arguments, ["min", "max"], t.CtrlRandom);
                        t.call(this), this.min = e.min, this.max = e.max, this.integer = e.integer
                    }, t.extend(t.CtrlRandom), t.CtrlRandom.defaults = {
                        min: 0,
                        max: 1,
                        integer: !1
                    }, Object.defineProperty(t.CtrlRandom.prototype, "value", {
                        get: function() {
                            var t = this.toSeconds(this.min),
                                e = this.toSeconds(this.max),
                                i = Math.random(),
                                n = i * t + (1 - i) * e;
                            return this.integer && (n = Math.floor(n)), n
                        }
                    }), t.CtrlRandom
                }), e(function(t) {
                    return t.Buffers = function(e) {
                        var i = Array.prototype.slice.call(arguments);
                        i.shift();
                        var n = t.defaults(i, ["onload", "baseUrl"], t.Buffers);
                        t.call(this), this._buffers = {}, this.baseUrl = n.baseUrl, this._loadingCount = 0;
                        for (var o in e) this._loadingCount++, this.add(o, e[o], this._bufferLoaded.bind(this, n.onload))
                    }, t.extend(t.Buffers), t.Buffers.defaults = {
                        onload: t.noOp,
                        baseUrl: ""
                    }, t.Buffers.prototype.has = function(t) {
                        return this._buffers.hasOwnProperty(t)
                    }, t.Buffers.prototype.get = function(t) {
                        if (this.has(t)) return this._buffers[t];
                        throw new Error("Tone.Buffers: no buffer named " + t)
                    }, t.Buffers.prototype._bufferLoaded = function(t) {
                        this._loadingCount--, 0 === this._loadingCount && t && t(this)
                    }, Object.defineProperty(t.Buffers.prototype, "loaded", {
                        get: function() {
                            var t = !0;
                            for (var e in this._buffers) {
                                var i = this.get(e);
                                t = t && i.loaded
                            }
                            return t
                        }
                    }), t.Buffers.prototype.add = function(e, i, n) {
                        return n = t.defaultArg(n, t.noOp), i instanceof t.Buffer ? (this._buffers[e] = i, n(this)) : i instanceof AudioBuffer ? (this._buffers[e] = new t.Buffer(i), n(this)) : t.isString(i) && (this._buffers[e] = new t.Buffer(this.baseUrl + i, n)), this
                    }, t.Buffers.prototype.dispose = function() {
                        t.prototype.dispose.call(this);
                        for (var e in this._buffers) this._buffers[e].dispose();
                        return this._buffers = null, this
                    }, t.Buffers
                }), e(function(t) {
                    var e = {};
                    return t.prototype.send = function(i, n) {
                        e.hasOwnProperty(i) || (e[i] = this.context.createGain()), n = t.defaultArg(n, 0);
                        var o = new t.Gain(n, t.Type.Decibels);
                        return this.connect(o), o.connect(e[i]), o
                    }, t.prototype.receive = function(t, i) {
                        return e.hasOwnProperty(t) || (e[t] = this.context.createGain()), e[t].connect(this, 0, i), this
                    }, t.Context.on("init", function(t) {
                        t.Buses ? e = t.Buses : (e = {}, t.Buses = e)
                    }), t
                }), e(function(t) {
                    return t.Draw = function() {
                        t.call(this), this._events = new t.Timeline, this.expiration = .25, this.anticipation = .008, this._boundDrawLoop = this._drawLoop.bind(this)
                    }, t.extend(t.Draw), t.Draw.prototype.schedule = function(t, e) {
                        return this._events.add({
                            callback: t,
                            time: this.toSeconds(e)
                        }), 1 === this._events.length && requestAnimationFrame(this._boundDrawLoop), this
                    }, t.Draw.prototype.cancel = function(t) {
                        return this._events.cancel(this.toSeconds(t)), this
                    }, t.Draw.prototype._drawLoop = function() {
                        for (var e = t.now(); this._events.length && this._events.peek().time - this.anticipation <= e;) {
                            var i = this._events.shift();
                            e - i.time <= this.expiration && i.callback()
                        }
                        this._events.length > 0 && requestAnimationFrame(this._boundDrawLoop)
                    }, t.Draw = new t.Draw, t.Draw
                }), e(function(t) {
                    t.Listener = function() {
                        t.call(this), this._orientation = [0, 0, 0, 0, 0, 0], this._position = [0, 0, 0], t.getContext(function() {
                            this.set(e.defaults)
                        }.bind(this))
                    }, t.extend(t.Listener), t.Listener.defaults = {
                        positionX: 0,
                        positionY: 0,
                        positionZ: 0,
                        forwardX: 0,
                        forwardY: 0,
                        forwardZ: 1,
                        upX: 0,
                        upY: 1,
                        upZ: 0
                    }, t.Listener.prototype._rampTimeConstant = .01, t.Listener.prototype.setPosition = function(t, e, i) {
                        if (this.context.listener.positionX) {
                            var n = this.now();
                            this.context.listener.positionX.setTargetAtTime(t, n, this._rampTimeConstant), this.context.listener.positionY.setTargetAtTime(e, n, this._rampTimeConstant), this.context.listener.positionZ.setTargetAtTime(i, n, this._rampTimeConstant)
                        } else this.context.listener.setPosition(t, e, i);
                        return this._position = Array.prototype.slice.call(arguments), this
                    }, t.Listener.prototype.setOrientation = function(t, e, i, n, o, s) {
                        if (this.context.listener.forwardX) {
                            var r = this.now();
                            this.context.listener.forwardX.setTargetAtTime(t, r, this._rampTimeConstant), this.context.listener.forwardY.setTargetAtTime(e, r, this._rampTimeConstant), this.context.listener.forwardZ.setTargetAtTime(i, r, this._rampTimeConstant), this.context.listener.upX.setTargetAtTime(n, r, this._rampTimeConstant), this.context.listener.upY.setTargetAtTime(o, r, this._rampTimeConstant), this.context.listener.upZ.setTargetAtTime(s, r, this._rampTimeConstant)
                        } else this.context.listener.setOrientation(t, e, i, n, o, s);
                        return this._orientation = Array.prototype.slice.call(arguments), this
                    }, Object.defineProperty(t.Listener.prototype, "positionX", {
                        set: function(t) {
                            this._position[0] = t, this.setPosition.apply(this, this._position)
                        },
                        get: function() {
                            return this._position[0]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "positionY", {
                        set: function(t) {
                            this._position[1] = t, this.setPosition.apply(this, this._position)
                        },
                        get: function() {
                            return this._position[1]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "positionZ", {
                        set: function(t) {
                            this._position[2] = t, this.setPosition.apply(this, this._position)
                        },
                        get: function() {
                            return this._position[2]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "forwardX", {
                        set: function(t) {
                            this._orientation[0] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[0]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "forwardY", {
                        set: function(t) {
                            this._orientation[1] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[1]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "forwardZ", {
                        set: function(t) {
                            this._orientation[2] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[2]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "upX", {
                        set: function(t) {
                            this._orientation[3] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[3]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "upY", {
                        set: function(t) {
                            this._orientation[4] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[4]
                        }
                    }), Object.defineProperty(t.Listener.prototype, "upZ", {
                        set: function(t) {
                            this._orientation[5] = t, this.setOrientation.apply(this, this._orientation)
                        },
                        get: function() {
                            return this._orientation[5]
                        }
                    }), t.Listener.prototype.dispose = function() {
                        return this._orientation = null, this._position = null, this
                    };
                    var e = t.Listener;
                    return t.Listener = new e, t.Context.on("init", function(i) {
                        i.Listener instanceof e ? t.Listener = i.Listener : t.Listener = new e, i.Listener = t.Listener
                    }), t.Listener
                }), e(function(t) {
                    function e(i, n, o, s) {
                        s = t.defaultArg(s, 0);
                        var r = new t.OfflineContext(2, n, o);
                        t.context = r;
                        var a = i(t.Transport);
                        return r.currentTime > 0 && 1e3 > s ? e(i, n, o, ++s) : {
                            response: a,
                            context: r
                        }
                    }
                    return t.Offline = function(i, n) {
                        var o, s = t.context.sampleRate,
                            r = t.context,
                            a = e(i, n, s),
                            l = a.response,
                            h = a.context;
                        return o = l instanceof Promise ? l.then(function() {
                            return h.render()
                        }) : h.render(), t.context = r, o.then(function(e) {
                            return new t.Buffer(e)
                        })
                    }, t.Offline
                }), e(function(t) {
                    return t.Effect = function() {
                        var e = t.defaults(arguments, ["wet"], t.Effect);
                        t.AudioNode.call(this), this.createInsOuts(1, 1), this._dryWet = new t.CrossFade(e.wet), this.wet = this._dryWet.fade, this.effectSend = new t.Gain, this.effectReturn = new t.Gain, this.input.connect(this._dryWet.a), this.input.connect(this.effectSend), this.effectReturn.connect(this._dryWet.b), this._dryWet.connect(this.output), this._readOnly(["wet"])
                    }, t.extend(t.Effect, t.AudioNode), t.Effect.defaults = {
                        wet: 1
                    }, t.Effect.prototype.connectEffect = function(t) {
                        return this.effectSend.chain(t, this.effectReturn), this
                    }, t.Effect.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._dryWet.dispose(), this._dryWet = null, this.effectSend.dispose(), this.effectSend = null, this.effectReturn.dispose(), this.effectReturn = null, this._writable(["wet"]), this.wet = null, this
                    }, t.Effect
                }), e(function(t) {
                    return t.AutoFilter = function() {
                        var e = t.defaults(arguments, ["frequency", "baseFrequency", "octaves"], t.AutoFilter);
                        t.Effect.call(this, e), this._lfo = new t.LFO({
                            frequency: e.frequency,
                            amplitude: e.depth
                        }), this.depth = this._lfo.amplitude, this.frequency = this._lfo.frequency, this.filter = new t.Filter(e.filter), this._octaves = 0, this.connectEffect(this.filter), this._lfo.connect(this.filter.frequency), this.type = e.type, this._readOnly(["frequency", "depth"]), this.octaves = e.octaves, this.baseFrequency = e.baseFrequency
                    }, t.extend(t.AutoFilter, t.Effect), t.AutoFilter.defaults = {
                        frequency: 1,
                        type: "sine",
                        depth: 1,
                        baseFrequency: 200,
                        octaves: 2.6,
                        filter: {
                            type: "lowpass",
                            rolloff: -12,
                            Q: 1
                        }
                    }, t.AutoFilter.prototype.start = function(t) {
                        return this._lfo.start(t), this
                    }, t.AutoFilter.prototype.stop = function(t) {
                        return this._lfo.stop(t), this
                    }, t.AutoFilter.prototype.sync = function(t) {
                        return this._lfo.sync(t), this
                    }, t.AutoFilter.prototype.unsync = function() {
                        return this._lfo.unsync(), this
                    }, Object.defineProperty(t.AutoFilter.prototype, "type", {
                        get: function() {
                            return this._lfo.type
                        },
                        set: function(t) {
                            this._lfo.type = t
                        }
                    }), Object.defineProperty(t.AutoFilter.prototype, "baseFrequency", {
                        get: function() {
                            return this._lfo.min
                        },
                        set: function(t) {
                            this._lfo.min = this.toFrequency(t), this.octaves = this._octaves
                        }
                    }), Object.defineProperty(t.AutoFilter.prototype, "octaves", {
                        get: function() {
                            return this._octaves
                        },
                        set: function(t) {
                            this._octaves = t, this._lfo.max = this.baseFrequency * Math.pow(2, t)
                        }
                    }), t.AutoFilter.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._lfo.dispose(), this._lfo = null, this.filter.dispose(), this.filter = null, this._writable(["frequency", "depth"]), this.frequency = null, this.depth = null, this
                    }, t.AutoFilter
                }), e(function(t) {
                    return t.AutoPanner = function() {
                        var e = t.defaults(arguments, ["frequency"], t.AutoPanner);
                        t.Effect.call(this, e), this._lfo = new t.LFO({
                            frequency: e.frequency,
                            amplitude: e.depth,
                            min: -1,
                            max: 1
                        }), this.depth = this._lfo.amplitude, this._panner = new t.Panner, this.frequency = this._lfo.frequency, this.connectEffect(this._panner), this._lfo.connect(this._panner.pan), this.type = e.type, this._readOnly(["depth", "frequency"])
                    }, t.extend(t.AutoPanner, t.Effect), t.AutoPanner.defaults = {
                        frequency: 1,
                        type: "sine",
                        depth: 1
                    }, t.AutoPanner.prototype.start = function(t) {
                        return this._lfo.start(t), this
                    }, t.AutoPanner.prototype.stop = function(t) {
                        return this._lfo.stop(t), this
                    }, t.AutoPanner.prototype.sync = function(t) {
                        return this._lfo.sync(t), this
                    }, t.AutoPanner.prototype.unsync = function() {
                        return this._lfo.unsync(), this
                    }, Object.defineProperty(t.AutoPanner.prototype, "type", {
                        get: function() {
                            return this._lfo.type
                        },
                        set: function(t) {
                            this._lfo.type = t
                        }
                    }), t.AutoPanner.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._lfo.dispose(), this._lfo = null, this._panner.dispose(), this._panner = null, this._writable(["depth", "frequency"]), this.frequency = null, this.depth = null, this
                    }, t.AutoPanner
                }), e(function(t) {
                    return t.AutoWah = function() {
                        var e = t.defaults(arguments, ["baseFrequency", "octaves", "sensitivity"], t.AutoWah);
                        t.Effect.call(this, e), this.follower = new t.Follower(e.follower), this._sweepRange = new t.ScaleExp(0, 1, .5), this._baseFrequency = e.baseFrequency, this._octaves = e.octaves, this._inputBoost = new t.Gain, this._bandpass = new t.Filter({
                            rolloff: -48,
                            frequency: 0,
                            Q: e.Q
                        }), this._peaking = new t.Filter(0, "peaking"), this._peaking.gain.value = e.gain, this.gain = this._peaking.gain, this.Q = this._bandpass.Q, this.effectSend.chain(this._inputBoost, this.follower, this._sweepRange), this._sweepRange.connect(this._bandpass.frequency), this._sweepRange.connect(this._peaking.frequency), this.effectSend.chain(this._bandpass, this._peaking, this.effectReturn), this._setSweepRange(), this.sensitivity = e.sensitivity, this._readOnly(["gain", "Q"])
                    }, t.extend(t.AutoWah, t.Effect), t.AutoWah.defaults = {
                        baseFrequency: 100,
                        octaves: 6,
                        sensitivity: 0,
                        Q: 2,
                        gain: 2,
                        follower: {
                            attack: .3,
                            release: .5
                        }
                    }, Object.defineProperty(t.AutoWah.prototype, "octaves", {
                        get: function() {
                            return this._octaves
                        },
                        set: function(t) {
                            this._octaves = t, this._setSweepRange()
                        }
                    }), Object.defineProperty(t.AutoWah.prototype, "baseFrequency", {
                        get: function() {
                            return this._baseFrequency
                        },
                        set: function(t) {
                            this._baseFrequency = t, this._setSweepRange()
                        }
                    }), Object.defineProperty(t.AutoWah.prototype, "sensitivity", {
                        get: function() {
                            return t.gainToDb(1 / this._inputBoost.gain.value)
                        },
                        set: function(e) {
                            this._inputBoost.gain.value = 1 / t.dbToGain(e)
                        }
                    }), t.AutoWah.prototype._setSweepRange = function() {
                        this._sweepRange.min = this._baseFrequency, this._sweepRange.max = Math.min(this._baseFrequency * Math.pow(2, this._octaves), this.context.sampleRate / 2)
                    }, t.AutoWah.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this.follower.dispose(), this.follower = null, this._sweepRange.dispose(), this._sweepRange = null, this._bandpass.dispose(), this._bandpass = null, this._peaking.dispose(), this._peaking = null, this._inputBoost.dispose(), this._inputBoost = null, this._writable(["gain", "Q"]), this.gain = null, this.Q = null, this
                    }, t.AutoWah
                }), e(function(t) {
                    return t.Modulo = function(e) {
                        t.SignalBase.call(this), this.createInsOuts(1, 0), this._shaper = new t.WaveShaper(Math.pow(2, 16)), this._multiply = new t.Multiply, this._subtract = this.output = new t.Subtract, this._modSignal = new t.Signal(e), this.input.fan(this._shaper, this._subtract), this._modSignal.connect(this._multiply, 0, 0), this._shaper.connect(this._multiply, 0, 1), this._multiply.connect(this._subtract, 0, 1), this._setWaveShaper(e)
                    }, t.extend(t.Modulo, t.SignalBase), t.Modulo.prototype._setWaveShaper = function(t) {
                        this._shaper.setMap(function(e) {
                            var i = Math.floor((e + 1e-4) / t);
                            return i
                        })
                    }, Object.defineProperty(t.Modulo.prototype, "value", {
                        get: function() {
                            return this._modSignal.value
                        },
                        set: function(t) {
                            this._modSignal.value = t, this._setWaveShaper(t)
                        }
                    }), t.Modulo.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null, this._multiply.dispose(), this._multiply = null, this._subtract.dispose(), this._subtract = null, this._modSignal.dispose(), this._modSignal = null, this
                    }, t.Modulo
                }), e(function(t) {
                    return t.BitCrusher = function() {
                        var e = t.defaults(arguments, ["bits"], t.BitCrusher);
                        t.Effect.call(this, e);
                        var i = 1 / Math.pow(2, e.bits - 1);
                        this._subtract = new t.Subtract, this._modulo = new t.Modulo(i), this._bits = e.bits, this.effectSend.fan(this._subtract, this._modulo), this._modulo.connect(this._subtract, 0, 1), this._subtract.connect(this.effectReturn)
                    }, t.extend(t.BitCrusher, t.Effect), t.BitCrusher.defaults = {
                        bits: 4
                    }, Object.defineProperty(t.BitCrusher.prototype, "bits", {
                        get: function() {
                            return this._bits
                        },
                        set: function(t) {
                            this._bits = t;
                            var e = 1 / Math.pow(2, t - 1);
                            this._modulo.value = e
                        }
                    }), t.BitCrusher.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._subtract.dispose(), this._subtract = null, this._modulo.dispose(), this._modulo = null, this
                    }, t.BitCrusher
                }), e(function(t) {
                    return t.Chebyshev = function() {
                        var e = t.defaults(arguments, ["order"], t.Chebyshev);
                        t.Effect.call(this, e), this._shaper = new t.WaveShaper(4096), this._order = e.order, this.connectEffect(this._shaper), this.order = e.order, this.oversample = e.oversample
                    }, t.extend(t.Chebyshev, t.Effect), t.Chebyshev.defaults = {
                        order: 1,
                        oversample: "none"
                    }, t.Chebyshev.prototype._getCoefficient = function(t, e, i) {
                        return i.hasOwnProperty(e) ? i[e] : (0 === e ? i[e] = 0 : 1 === e ? i[e] = t : i[e] = 2 * t * this._getCoefficient(t, e - 1, i) - this._getCoefficient(t, e - 2, i), i[e])
                    }, Object.defineProperty(t.Chebyshev.prototype, "order", {
                        get: function() {
                            return this._order
                        },
                        set: function(t) {
                            this._order = t;
                            for (var e = new Array(4096), i = e.length, n = 0; i > n; ++n) {
                                var o = 2 * n / i - 1;
                                0 === o ? e[n] = 0 : e[n] = this._getCoefficient(o, t, {})
                            }
                            this._shaper.curve = e
                        }
                    }), Object.defineProperty(t.Chebyshev.prototype, "oversample", {
                        get: function() {
                            return this._shaper.oversample
                        },
                        set: function(t) {
                            this._shaper.oversample = t
                        }
                    }), t.Chebyshev.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null, this
                    }, t.Chebyshev
                }), e(function(t) {
                    return t.StereoEffect = function() {
                        t.AudioNode.call(this);
                        var e = t.defaults(arguments, ["wet"], t.Effect);
                        this.createInsOuts(1, 1), this._dryWet = new t.CrossFade(e.wet), this.wet = this._dryWet.fade, this._split = new t.Split, this.effectSendL = this._split.left, this.effectSendR = this._split.right, this._merge = new t.Merge, this.effectReturnL = this._merge.left, this.effectReturnR = this._merge.right, this.input.connect(this._split), this.input.connect(this._dryWet, 0, 0), this._merge.connect(this._dryWet, 0, 1), this._dryWet.connect(this.output), this._readOnly(["wet"])
                    }, t.extend(t.StereoEffect, t.Effect), t.StereoEffect.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._dryWet.dispose(), this._dryWet = null, this._split.dispose(), this._split = null, this._merge.dispose(), this._merge = null, this.effectSendL = null, this.effectSendR = null, this.effectReturnL = null, this.effectReturnR = null, this._writable(["wet"]), this.wet = null, this
                    }, t.StereoEffect
                }), e(function(t) {
                    return t.Chorus = function() {
                        var e = t.defaults(arguments, ["frequency", "delayTime", "depth"], t.Chorus);
                        t.StereoEffect.call(this, e), this._depth = e.depth, this._delayTime = e.delayTime / 1e3, this._lfoL = new t.LFO({
                            frequency: e.frequency,
                            min: 0,
                            max: 1
                        }), this._lfoR = new t.LFO({
                            frequency: e.frequency,
                            min: 0,
                            max: 1,
                            phase: 180
                        }), this._delayNodeL = new t.Delay, this._delayNodeR = new t.Delay, this.frequency = this._lfoL.frequency, this.effectSendL.chain(this._delayNodeL, this.effectReturnL), this.effectSendR.chain(this._delayNodeR, this.effectReturnR), this.effectSendL.connect(this.effectReturnL), this.effectSendR.connect(this.effectReturnR), this._lfoL.connect(this._delayNodeL.delayTime), this._lfoR.connect(this._delayNodeR.delayTime), this._lfoL.start(), this._lfoR.start(), this._lfoL.frequency.connect(this._lfoR.frequency), this.depth = this._depth, this.frequency.value = e.frequency, this.type = e.type, this._readOnly(["frequency"]), this.spread = e.spread
                    }, t.extend(t.Chorus, t.StereoEffect), t.Chorus.defaults = {
                        frequency: 1.5,
                        delayTime: 3.5,
                        depth: .7,
                        type: "sine",
                        spread: 180
                    }, Object.defineProperty(t.Chorus.prototype, "depth", {
                        get: function() {
                            return this._depth
                        },
                        set: function(t) {
                            this._depth = t;
                            var e = this._delayTime * t;
                            this._lfoL.min = Math.max(this._delayTime - e, 0), this._lfoL.max = this._delayTime + e, this._lfoR.min = Math.max(this._delayTime - e, 0), this._lfoR.max = this._delayTime + e
                        }
                    }), Object.defineProperty(t.Chorus.prototype, "delayTime", {
                        get: function() {
                            return 1e3 * this._delayTime
                        },
                        set: function(t) {
                            this._delayTime = t / 1e3, this.depth = this._depth
                        }
                    }), Object.defineProperty(t.Chorus.prototype, "type", {
                        get: function() {
                            return this._lfoL.type
                        },
                        set: function(t) {
                            this._lfoL.type = t, this._lfoR.type = t
                        }
                    }), Object.defineProperty(t.Chorus.prototype, "spread", {
                        get: function() {
                            return this._lfoR.phase - this._lfoL.phase
                        },
                        set: function(t) {
                            this._lfoL.phase = 90 - t / 2, this._lfoR.phase = t / 2 + 90
                        }
                    }), t.Chorus.prototype.dispose = function() {
                        return t.StereoEffect.prototype.dispose.call(this), this._lfoL.dispose(), this._lfoL = null, this._lfoR.dispose(), this._lfoR = null, this._delayNodeL.dispose(), this._delayNodeL = null, this._delayNodeR.dispose(), this._delayNodeR = null, this._writable("frequency"), this.frequency = null, this
                    }, t.Chorus
                }), e(function(t) {
                    return t.Convolver = function() {
                        var e = t.defaults(arguments, ["url", "onload"], t.Convolver);
                        t.Effect.call(this, e), this._convolver = this.context.createConvolver(), this._buffer = new t.Buffer(e.url, function(t) {
                            this._convolver.buffer = t.get(), e.onload()
                        }.bind(this)), this.connectEffect(this._convolver)
                    }, t.extend(t.Convolver, t.Effect), t.Convolver.defaults = {
                        onload: t.noOp
                    }, Object.defineProperty(t.Convolver.prototype, "buffer", {
                        get: function() {
                            return this._buffer.get()
                        },
                        set: function(t) {
                            this._buffer.set(t), this._convolver.buffer = this._buffer.get()
                        }
                    }), t.Convolver.prototype.load = function(t, e) {
                        return this._buffer.load(t, function(t) {
                            this.buffer = t, e && e()
                        }.bind(this))
                    }, t.Convolver.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._convolver.disconnect(), this._convolver = null, this._buffer.dispose(), this._buffer = null, this
                    }, t.Convolver
                }), e(function(t) {
                    return t.Distortion = function() {
                        var e = t.defaults(arguments, ["distortion"], t.Distortion);
                        t.Effect.call(this, e), this._shaper = new t.WaveShaper(4096), this._distortion = e.distortion, this.connectEffect(this._shaper), this.distortion = e.distortion, this.oversample = e.oversample
                    }, t.extend(t.Distortion, t.Effect), t.Distortion.defaults = {
                        distortion: .4,
                        oversample: "none"
                    }, Object.defineProperty(t.Distortion.prototype, "distortion", {
                        get: function() {
                            return this._distortion
                        },
                        set: function(t) {
                            this._distortion = t;
                            var e = 100 * t,
                                i = Math.PI / 180;
                            this._shaper.setMap(function(t) {
                                return Math.abs(t) < .001 ? 0 : (3 + e) * t * 20 * i / (Math.PI + e * Math.abs(t))
                            })
                        }
                    }), Object.defineProperty(t.Distortion.prototype, "oversample", {
                        get: function() {
                            return this._shaper.oversample
                        },
                        set: function(t) {
                            this._shaper.oversample = t
                        }
                    }), t.Distortion.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._shaper.dispose(), this._shaper = null, this
                    }, t.Distortion
                }), e(function(t) {
                    return t.FeedbackEffect = function() {
                        var e = t.defaults(arguments, ["feedback"], t.FeedbackEffect);
                        t.Effect.call(this, e), this._feedbackGain = new t.Gain(e.feedback, t.Type.NormalRange), this.feedback = this._feedbackGain.gain, this.effectReturn.chain(this._feedbackGain, this.effectSend), this._readOnly(["feedback"])
                    }, t.extend(t.FeedbackEffect, t.Effect), t.FeedbackEffect.defaults = {
                        feedback: .125
                    }, t.FeedbackEffect.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._writable(["feedback"]), this._feedbackGain.dispose(), this._feedbackGain = null, this.feedback = null, this
                    }, t.FeedbackEffect
                }), e(function(t) {
                    return t.FeedbackDelay = function() {
                        var e = t.defaults(arguments, ["delayTime", "feedback"], t.FeedbackDelay);
                        t.FeedbackEffect.call(this, e), this._delayNode = new t.Delay(e.delayTime, e.maxDelay), this.delayTime = this._delayNode.delayTime, this.connectEffect(this._delayNode), this._readOnly(["delayTime"])
                    }, t.extend(t.FeedbackDelay, t.FeedbackEffect), t.FeedbackDelay.defaults = {
                        delayTime: .25,
                        maxDelay: 1
                    }, t.FeedbackDelay.prototype.dispose = function() {
                        return t.FeedbackEffect.prototype.dispose.call(this), this._delayNode.dispose(), this._delayNode = null, this._writable(["delayTime"]), this.delayTime = null, this
                    }, t.FeedbackDelay
                }), e(function(t) {
                    var e = [1557 / 44100, 1617 / 44100, 1491 / 44100, 1422 / 44100, 1277 / 44100, 1356 / 44100, 1188 / 44100, 1116 / 44100],
                        i = [225, 556, 441, 341];
                    return t.Freeverb = function() {
                        var n = t.defaults(arguments, ["roomSize", "dampening"], t.Freeverb);
                        t.StereoEffect.call(this, n), this.roomSize = new t.Signal(n.roomSize, t.Type.NormalRange), this.dampening = new t.Signal(n.dampening, t.Type.Frequency), this._combFilters = [], this._allpassFiltersL = [], this._allpassFiltersR = [];
                        for (var o = 0; o < i.length; o++) {
                            var s = this.context.createBiquadFilter();
                            s.type = "allpass", s.frequency.value = i[o], this._allpassFiltersL.push(s)
                        }
                        for (var r = 0; r < i.length; r++) {
                            var a = this.context.createBiquadFilter();
                            a.type = "allpass", a.frequency.value = i[r], this._allpassFiltersR.push(a)
                        }
                        for (var l = 0; l < e.length; l++) {
                            var h = new t.LowpassCombFilter(e[l]);
                            l < e.length / 2 ? this.effectSendL.chain(h, this._allpassFiltersL[0]) : this.effectSendR.chain(h, this._allpassFiltersR[0]), this.roomSize.connect(h.resonance), this.dampening.connect(h.dampening), this._combFilters.push(h)
                        }
                        t.connectSeries.apply(t, this._allpassFiltersL), t.connectSeries.apply(t, this._allpassFiltersR), this._allpassFiltersL[this._allpassFiltersL.length - 1].connect(this.effectReturnL), this._allpassFiltersR[this._allpassFiltersR.length - 1].connect(this.effectReturnR), this._readOnly(["roomSize", "dampening"])
                    }, t.extend(t.Freeverb, t.StereoEffect), t.Freeverb.defaults = {
                        roomSize: .7,
                        dampening: 3e3
                    }, t.Freeverb.prototype.dispose = function() {
                        t.StereoEffect.prototype.dispose.call(this);
                        for (var e = 0; e < this._allpassFiltersL.length; e++) this._allpassFiltersL[e].disconnect(), this._allpassFiltersL[e] = null;
                        this._allpassFiltersL = null;
                        for (var i = 0; i < this._allpassFiltersR.length; i++) this._allpassFiltersR[i].disconnect(), this._allpassFiltersR[i] = null;
                        this._allpassFiltersR = null;
                        for (var n = 0; n < this._combFilters.length; n++) this._combFilters[n].dispose(), this._combFilters[n] = null;
                        return this._combFilters = null, this._writable(["roomSize", "dampening"]), this.roomSize.dispose(), this.roomSize = null, this.dampening.dispose(), this.dampening = null, this
                    }, t.Freeverb
                }), e(function(t) {
                    var e = [.06748, .06404, .08212, .09004],
                        i = [.773, .802, .753, .733],
                        n = [347, 113, 37];
                    return t.JCReverb = function() {
                        var o = t.defaults(arguments, ["roomSize"], t.JCReverb);
                        t.StereoEffect.call(this, o), this.roomSize = new t.Signal(o.roomSize, t.Type.NormalRange), this._scaleRoomSize = new t.Scale(-.733, .197), this._allpassFilters = [], this._feedbackCombFilters = [];
                        for (var s = 0; s < n.length; s++) {
                            var r = this.context.createBiquadFilter();
                            r.type = "allpass", r.frequency.value = n[s], this._allpassFilters.push(r)
                        }
                        for (var a = 0; a < e.length; a++) {
                            var l = new t.FeedbackCombFilter(e[a], .1);
                            this._scaleRoomSize.connect(l.resonance), l.resonance.value = i[a], this._allpassFilters[this._allpassFilters.length - 1].connect(l), a < e.length / 2 ? l.connect(this.effectReturnL) : l.connect(this.effectReturnR), this._feedbackCombFilters.push(l)
                        }
                        this.roomSize.connect(this._scaleRoomSize), t.connectSeries.apply(t, this._allpassFilters), this.effectSendL.connect(this._allpassFilters[0]), this.effectSendR.connect(this._allpassFilters[0]), this._readOnly(["roomSize"])
                    }, t.extend(t.JCReverb, t.StereoEffect), t.JCReverb.defaults = {
                        roomSize: .5
                    }, t.JCReverb.prototype.dispose = function() {
                        t.StereoEffect.prototype.dispose.call(this);
                        for (var e = 0; e < this._allpassFilters.length; e++) this._allpassFilters[e].disconnect(), this._allpassFilters[e] = null;
                        this._allpassFilters = null;
                        for (var i = 0; i < this._feedbackCombFilters.length; i++) this._feedbackCombFilters[i].dispose(), this._feedbackCombFilters[i] = null;
                        return this._feedbackCombFilters = null, this._writable(["roomSize"]), this.roomSize.dispose(), this.roomSize = null, this._scaleRoomSize.dispose(), this._scaleRoomSize = null, this
                    }, t.JCReverb
                }), e(function(t) {
                    return t.MidSideEffect = function() {
                        t.Effect.apply(this, arguments), this._midSideSplit = new t.MidSideSplit, this._midSideMerge = new t.MidSideMerge, this.midSend = this._midSideSplit.mid, this.sideSend = this._midSideSplit.side, this.midReturn = this._midSideMerge.mid, this.sideReturn = this._midSideMerge.side, this.effectSend.connect(this._midSideSplit), this._midSideMerge.connect(this.effectReturn)
                    }, t.extend(t.MidSideEffect, t.Effect), t.MidSideEffect.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._midSideSplit.dispose(), this._midSideSplit = null, this._midSideMerge.dispose(), this._midSideMerge = null, this.midSend = null, this.sideSend = null, this.midReturn = null, this.sideReturn = null, this
                    }, t.MidSideEffect
                }), e(function(t) {
                    return t.Phaser = function() {
                        var e = t.defaults(arguments, ["frequency", "octaves", "baseFrequency"], t.Phaser);
                        t.StereoEffect.call(this, e), this._lfoL = new t.LFO(e.frequency, 0, 1), this._lfoR = new t.LFO(e.frequency, 0, 1), this._lfoR.phase = 180, this._baseFrequency = e.baseFrequency, this._octaves = e.octaves, this.Q = new t.Signal(e.Q, t.Type.Positive), this._filtersL = this._makeFilters(e.stages, this._lfoL, this.Q), this._filtersR = this._makeFilters(e.stages, this._lfoR, this.Q), this.frequency = this._lfoL.frequency, this.frequency.value = e.frequency, this.effectSendL.connect(this._filtersL[0]), this.effectSendR.connect(this._filtersR[0]), this._filtersL[e.stages - 1].connect(this.effectReturnL), this._filtersR[e.stages - 1].connect(this.effectReturnR), this._lfoL.frequency.connect(this._lfoR.frequency), this.baseFrequency = e.baseFrequency, this.octaves = e.octaves, this._lfoL.start(), this._lfoR.start(), this._readOnly(["frequency", "Q"])
                    }, t.extend(t.Phaser, t.StereoEffect), t.Phaser.defaults = {
                        frequency: .5,
                        octaves: 3,
                        stages: 10,
                        Q: 10,
                        baseFrequency: 350
                    }, t.Phaser.prototype._makeFilters = function(e, i, n) {
                        for (var o = new Array(e), s = 0; e > s; s++) {
                            var r = this.context.createBiquadFilter();
                            r.type = "allpass", n.connect(r.Q), i.connect(r.frequency), o[s] = r
                        }
                        return t.connectSeries.apply(t, o), o
                    }, Object.defineProperty(t.Phaser.prototype, "octaves", {
                        get: function() {
                            return this._octaves
                        },
                        set: function(t) {
                            this._octaves = t;
                            var e = this._baseFrequency * Math.pow(2, t);
                            this._lfoL.max = e, this._lfoR.max = e
                        }
                    }), Object.defineProperty(t.Phaser.prototype, "baseFrequency", {
                        get: function() {
                            return this._baseFrequency
                        },
                        set: function(t) {
                            this._baseFrequency = t, this._lfoL.min = t, this._lfoR.min = t, this.octaves = this._octaves
                        }
                    }), t.Phaser.prototype.dispose = function() {
                        t.StereoEffect.prototype.dispose.call(this), this._writable(["frequency", "Q"]), this.Q.dispose(), this.Q = null, this._lfoL.dispose(), this._lfoL = null, this._lfoR.dispose(), this._lfoR = null;
                        for (var e = 0; e < this._filtersL.length; e++) this._filtersL[e].disconnect(), this._filtersL[e] = null;
                        this._filtersL = null;
                        for (var i = 0; i < this._filtersR.length; i++) this._filtersR[i].disconnect(), this._filtersR[i] = null;
                        return this._filtersR = null, this.frequency = null, this
                    }, t.Phaser
                }), e(function(t) {
                    return t.StereoXFeedbackEffect = function() {
                        var e = t.defaults(arguments, ["feedback"], t.FeedbackEffect);
                        t.StereoEffect.call(this, e), this.feedback = new t.Signal(e.feedback, t.Type.NormalRange), this._feedbackLR = new t.Gain, this._feedbackRL = new t.Gain, this.effectReturnL.chain(this._feedbackLR, this.effectSendR), this.effectReturnR.chain(this._feedbackRL, this.effectSendL), this.feedback.fan(this._feedbackLR.gain, this._feedbackRL.gain), this._readOnly(["feedback"])
                    }, t.extend(t.StereoXFeedbackEffect, t.StereoEffect), t.StereoXFeedbackEffect.prototype.dispose = function() {
                        return t.StereoEffect.prototype.dispose.call(this), this._writable(["feedback"]), this.feedback.dispose(), this.feedback = null, this._feedbackLR.dispose(), this._feedbackLR = null, this._feedbackRL.dispose(), this._feedbackRL = null, this
                    }, t.StereoXFeedbackEffect
                }), e(function(t) {
                    return t.PingPongDelay = function() {
                        var e = t.defaults(arguments, ["delayTime", "feedback"], t.PingPongDelay);
                        t.StereoXFeedbackEffect.call(this, e), this._leftDelay = new t.Delay(0, e.maxDelayTime), this._rightDelay = new t.Delay(0, e.maxDelayTime), this._rightPreDelay = new t.Delay(0, e.maxDelayTime), this.delayTime = new t.Signal(e.delayTime, t.Type.Time), this.effectSendL.chain(this._leftDelay, this.effectReturnL), this.effectSendR.chain(this._rightPreDelay, this._rightDelay, this.effectReturnR), this.delayTime.fan(this._leftDelay.delayTime, this._rightDelay.delayTime, this._rightPreDelay.delayTime), this._feedbackLR.disconnect(), this._feedbackLR.connect(this._rightDelay), this._readOnly(["delayTime"])
                    }, t.extend(t.PingPongDelay, t.StereoXFeedbackEffect), t.PingPongDelay.defaults = {
                        delayTime: .25,
                        maxDelayTime: 1
                    }, t.PingPongDelay.prototype.dispose = function() {
                        return t.StereoXFeedbackEffect.prototype.dispose.call(this), this._leftDelay.dispose(), this._leftDelay = null, this._rightDelay.dispose(), this._rightDelay = null, this._rightPreDelay.dispose(), this._rightPreDelay = null, this._writable(["delayTime"]), this.delayTime.dispose(), this.delayTime = null, this
                    }, t.PingPongDelay
                }), e(function(t) {
                    return t.PitchShift = function() {
                        var e = t.defaults(arguments, ["pitch"], t.PitchShift);
                        t.FeedbackEffect.call(this, e), this._frequency = new t.Signal(0), this._delayA = new t.Delay(0, 1), this._lfoA = new t.LFO({
                            min: 0,
                            max: .1,
                            type: "sawtooth"
                        }).connect(this._delayA.delayTime), this._delayB = new t.Delay(0, 1), this._lfoB = new t.LFO({
                            min: 0,
                            max: .1,
                            type: "sawtooth",
                            phase: 180
                        }).connect(this._delayB.delayTime), this._crossFade = new t.CrossFade, this._crossFadeLFO = new t.LFO({
                            min: 0,
                            max: 1,
                            type: "triangle",
                            phase: 90
                        }).connect(this._crossFade.fade), this._feedbackDelay = new t.Delay(e.delayTime), this.delayTime = this._feedbackDelay.delayTime, this._readOnly("delayTime"), this._pitch = e.pitch, this._windowSize = e.windowSize, this._delayA.connect(this._crossFade.a), this._delayB.connect(this._crossFade.b), this._frequency.fan(this._lfoA.frequency, this._lfoB.frequency, this._crossFadeLFO.frequency), this.effectSend.fan(this._delayA, this._delayB), this._crossFade.chain(this._feedbackDelay, this.effectReturn);
                        var i = this.now();
                        this._lfoA.start(i), this._lfoB.start(i), this._crossFadeLFO.start(i), this.windowSize = this._windowSize
                    }, t.extend(t.PitchShift, t.FeedbackEffect), t.PitchShift.defaults = {
                        pitch: 0,
                        windowSize: .1,
                        delayTime: 0,
                        feedback: 0
                    }, Object.defineProperty(t.PitchShift.prototype, "pitch", {
                        get: function() {
                            return this._pitch
                        },
                        set: function(e) {
                            this._pitch = e;
                            var i = 0;
                            0 > e ? (this._lfoA.min = 0, this._lfoA.max = this._windowSize, this._lfoB.min = 0, this._lfoB.max = this._windowSize, i = t.intervalToFrequencyRatio(e - 1) + 1) : (this._lfoA.min = this._windowSize, this._lfoA.max = 0, this._lfoB.min = this._windowSize, this._lfoB.max = 0, i = t.intervalToFrequencyRatio(e) - 1), this._frequency.value = i * (1.2 / this._windowSize)
                        }
                    }), Object.defineProperty(t.PitchShift.prototype, "windowSize", {
                        get: function() {
                            return this._windowSize
                        },
                        set: function(t) {
                            this._windowSize = this.toSeconds(t), this.pitch = this._pitch
                        }
                    }), t.PitchShift.prototype.dispose = function() {
                        return t.FeedbackEffect.prototype.dispose.call(this), this._frequency.dispose(), this._frequency = null, this._delayA.disconnect(), this._delayA = null, this._delayB.disconnect(), this._delayB = null, this._lfoA.dispose(), this._lfoA = null, this._lfoB.dispose(), this._lfoB = null, this._crossFade.dispose(), this._crossFade = null, this._crossFadeLFO.dispose(), this._crossFadeLFO = null, this._writable("delayTime"), this._feedbackDelay.dispose(), this._feedbackDelay = null, this.delayTime = null, this
                    }, t.PitchShift
                }), e(function(t) {
                    return t.BufferSource = function() {
                        var e = t.defaults(arguments, ["buffer", "onload"], t.BufferSource);
                        t.AudioNode.call(this, e), this.onended = e.onended, this._startTime = -1, this._sourceStarted = !1, this._sourceStopped = !1, this._stopTime = -1, this._gainNode = this.output = new t.Gain, this._source = this.context.createBufferSource(), this._source.connect(this._gainNode), this._source.onended = this._onended.bind(this), this._buffer = new t.Buffer(e.buffer, e.onload), this.playbackRate = new t.Param(this._source.playbackRate, t.Type.Positive), this.fadeIn = e.fadeIn, this.fadeOut = e.fadeOut, this.curve = e.curve, this._gain = 1, this._onendedTimeout = -1, this.loop = e.loop, this.loopStart = e.loopStart, this.loopEnd = e.loopEnd, this.playbackRate.value = e.playbackRate
                    }, t.extend(t.BufferSource, t.AudioNode), t.BufferSource.defaults = {
                        onended: t.noOp,
                        onload: t.noOp,
                        loop: !1,
                        loopStart: 0,
                        loopEnd: 0,
                        fadeIn: 0,
                        fadeOut: 0,
                        curve: "linear",
                        playbackRate: 1
                    }, Object.defineProperty(t.BufferSource.prototype, "state", {
                        get: function() {
                            return this.getStateAtTime(this.now())
                        }
                    }), t.BufferSource.prototype.getStateAtTime = function(e) {
                        return e = this.toSeconds(e), -1 !== this._startTime && e >= this._startTime && !this._sourceStopped ? t.State.Started : t.State.Stopped
                    }, t.BufferSource.prototype.start = function(e, i, n, o, s) {
                        if (-1 !== this._startTime) throw new Error("Tone.BufferSource can only be started once.");
                        if (!this.buffer.loaded) throw new Error("Tone.BufferSource: buffer is either not set or not loaded.");
                        e = this.toSeconds(e), i = this.loop ? t.defaultArg(i, this.loopStart) : t.defaultArg(i, 0), i = this.toSeconds(i), o = t.defaultArg(o, 1), this._gain = o, s = this.toSeconds(t.defaultArg(s, this.fadeIn)), this.fadeIn = s, s > 0 ? (this._gainNode.gain.setValueAtTime(0, e), "linear" === this.curve ? this._gainNode.gain.linearRampToValueAtTime(this._gain, e + s) : this._gainNode.gain.exponentialApproachValueAtTime(this._gain, e, s)) : this._gainNode.gain.setValueAtTime(o, e), this._startTime = e;
                        var r = this.toSeconds(t.defaultArg(n, this.buffer.duration - i % this.buffer.duration));
                        if (r = Math.max(r, 0), t.isDefined(n) && (this.loop || (r = Math.min(r, this.buffer.duration - i % this.buffer.duration)), this.stop(e + r, this.fadeOut)), this.loop) {
                            var a = this.loopEnd || this.buffer.duration,
                                l = this.loopStart,
                                h = a - l;
                            i >= a && (i = (i - l) % h + l)
                        }
                        return this._source.buffer = this.buffer.get(), this._source.loopEnd = this.loopEnd || this.buffer.duration, i < this.buffer.duration && (this._sourceStarted = !0, this._source.start(e, i)), this
                    }, t.BufferSource.prototype.stop = function(e, i) {
                        if (!this.buffer.loaded) throw new Error("Tone.BufferSource: buffer is either not set or not loaded.");
                        if (!this._sourceStopped) {
                            if (e = this.toSeconds(e), -1 !== this._stopTime && this.cancelStop(), e <= this._startTime) return this._gainNode.gain.cancelScheduledValues(e), this._gainNode.gain.value = 0, this;
                            e = Math.max(this._startTime + this.fadeIn + this.sampleTime, e), this._gainNode.gain.cancelScheduledValues(e), this._stopTime = e, i = this.toSeconds(t.defaultArg(i, this.fadeOut));
                            var n = e - this._startTime - this.fadeIn - this.sampleTime;
                            this.loop || (n = Math.min(n, this.buffer.duration)), i = Math.min(n, i);
                            var o = e - i;
                            return i > this.sampleTime ? (this._gainNode.gain.setValueAtTime(this._gain, o), "linear" === this.curve ? this._gainNode.gain.linearRampToValueAtTime(0, e) : this._gainNode.gain.exponentialApproachValueAtTime(0, o, i)) : this._gainNode.gain.setValueAtTime(0, e), t.context.clearTimeout(this._onendedTimeout), this._onendedTimeout = t.context.setTimeout(this._onended.bind(this), this._stopTime - this.now()), this
                        }
                    }, t.BufferSource.prototype.cancelStop = function() {
                        if (-1 !== this._startTime && !this._sourceStopped) {
                            var t = this.toSeconds(this.fadeIn);
                            this._gainNode.gain.cancelScheduledValues(this._startTime + t + this.sampleTime), this._gainNode.gain.setValueAtTime(1, Math.max(this.now(), this._startTime + t + this.sampleTime)), this.context.clearTimeout(this._onendedTimeout), this._stopTime = -1
                        }
                        return this
                    }, t.BufferSource.prototype._onended = function() {
                        if (!this._sourceStopped) {
                            this._sourceStopped = !0;
                            var t = "exponential" === this.curve ? 2 * this.fadeOut : 0;
                            this._sourceStarted && -1 !== this._stopTime && this._source.stop(this._stopTime + t), this.onended(this)
                        }
                    }, Object.defineProperty(t.BufferSource.prototype, "loopStart", {
                        get: function() {
                            return this._source.loopStart
                        },
                        set: function(t) {
                            this._source.loopStart = this.toSeconds(t)
                        }
                    }), Object.defineProperty(t.BufferSource.prototype, "loopEnd", {
                        get: function() {
                            return this._source.loopEnd
                        },
                        set: function(t) {
                            this._source.loopEnd = this.toSeconds(t)
                        }
                    }), Object.defineProperty(t.BufferSource.prototype, "buffer", {
                        get: function() {
                            return this._buffer
                        },
                        set: function(t) {
                            this._buffer.set(t)
                        }
                    }), Object.defineProperty(t.BufferSource.prototype, "loop", {
                        get: function() {
                            return this._source.loop
                        },
                        set: function(t) {
                            this._source.loop = t, this.cancelStop()
                        }
                    }), t.BufferSource.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this.onended = null, this._source.onended = null, this._source.disconnect(), this._source = null, this._gainNode.dispose(), this._gainNode = null, this._buffer.dispose(), this._buffer = null, this._startTime = -1, this.playbackRate = null, t.context.clearTimeout(this._onendedTimeout), this
                    }, t.BufferSource
                }), e(function(t) {
                    function e() {
                        for (var e in o) s[e] = (new t.Buffer).fromArray(o[e])
                    }
                    t.Noise = function() {
                        var e = t.defaults(arguments, ["type"], t.Noise);
                        t.Source.call(this, e), this._source = null, this._type = e.type, this._playbackRate = e.playbackRate
                    }, t.extend(t.Noise, t.Source), t.Noise.defaults = {
                        type: "white",
                        playbackRate: 1
                    }, Object.defineProperty(t.Noise.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(e) {
                            if (this._type !== e) {
                                if (!(e in s)) throw new TypeError("Tone.Noise: invalid type: " + e);
                                if (this._type = e, this.state === t.State.Started) {
                                    var i = this.now();
                                    this._stop(i), this._start(i)
                                }
                            }
                        }
                    }), Object.defineProperty(t.Noise.prototype, "playbackRate", {
                        get: function() {
                            return this._playbackRate
                        },
                        set: function(t) {
                            this._playbackRate = t, this._source && (this._source.playbackRate.value = t)
                        }
                    }), t.Noise.prototype._start = function(e) {
                        var i = s[this._type];
                        this._source = new t.BufferSource(i).connect(this.output), this._source.loop = !0, this._source.playbackRate.value = this._playbackRate, this._source.start(this.toSeconds(e), Math.random() * (i.duration - .001))
                    }, t.Noise.prototype._stop = function(t) {
                        this._source && (this._source.stop(this.toSeconds(t)), this._source = null)
                    }, t.Noise.prototype.restart = function(t) {
                        this._stop(t), this._start(t)
                    }, t.Noise.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), null !== this._source && (this._source.disconnect(), this._source = null), this._buffer = null, this
                    };
                    var i = 220500,
                        n = 2,
                        o = {
                            pink: function() {
                                for (var t = [], e = 0; n > e; e++) {
                                    var o = new Float32Array(i);
                                    t[e] = o;
                                    var s, r, a, l, h, u, c;
                                    s = r = a = l = h = u = c = 0;
                                    for (var p = 0; i > p; p++) {
                                        var d = 2 * Math.random() - 1;
                                        s = .99886 * s + .0555179 * d, r = .99332 * r + .0750759 * d, a = .969 * a + .153852 * d, l = .8665 * l + .3104856 * d, h = .55 * h + .5329522 * d, u = -.7616 * u - .016898 * d, o[p] = s + r + a + l + h + u + c + .5362 * d, o[p] *= .11, c = .115926 * d
                                    }
                                }
                                return t
                            }(),
                            brown: function() {
                                for (var t = [], e = 0; n > e; e++) {
                                    var o = new Float32Array(i);
                                    t[e] = o;
                                    for (var s = 0, r = 0; i > r; r++) {
                                        var a = 2 * Math.random() - 1;
                                        o[r] = (s + .02 * a) / 1.02, s = o[r], o[r] *= 3.5
                                    }
                                }
                                return t
                            }(),
                            white: function() {
                                for (var t = [], e = 0; n > e; e++) {
                                    var o = new Float32Array(i);
                                    t[e] = o;
                                    for (var s = 0; i > s; s++) o[s] = 2 * Math.random() - 1
                                }
                                return t
                            }()
                        },
                        s = {};
                    return t.getContext(e), t.Context.on("init", e), t.Noise
                }), e(function(t) {
                    return t.Reverb = function() {
                        var e = t.defaults(arguments, ["decay"], t.Reverb);
                        t.Effect.call(this, e), this._convolver = this.context.createConvolver(), this.decay = e.decay, this.preDelay = e.preDelay, this.connectEffect(this._convolver)
                    }, t.extend(t.Reverb, t.Effect), t.Reverb.defaults = {
                        decay: 1.5,
                        preDelay: .01
                    }, t.Reverb.prototype.generate = function() {
                        return t.Offline(function() {
                            var e = new t.Noise,
                                i = new t.Noise,
                                n = new t.Merge;
                            e.connect(n.left), i.connect(n.right);
                            var o = (new t.Gain).toMaster();
                            n.connect(o), e.start(0), i.start(0), o.gain.setValueAtTime(0, 0), o.gain.linearRampToValueAtTime(1, this.preDelay), o.gain.exponentialApproachValueAtTime(0, this.preDelay, this.decay - this.preDelay)
                        }.bind(this), this.decay).then(function(t) {
                            return this._convolver.buffer = t.get(), this
                        }.bind(this))
                    }, t.Reverb.prototype.dispose = function() {
                        return t.Effect.prototype.dispose.call(this), this._convolver.disconnect(), this._convolver = null, this
                    }, t.Reverb
                }), e(function(t) {
                    return t.StereoFeedbackEffect = function() {
                        var e = t.defaults(arguments, ["feedback"], t.FeedbackEffect);
                        t.StereoEffect.call(this, e), this.feedback = new t.Signal(e.feedback, t.Type.NormalRange), this._feedbackL = new t.Gain, this._feedbackR = new t.Gain, this.effectReturnL.chain(this._feedbackL, this.effectSendL), this.effectReturnR.chain(this._feedbackR, this.effectSendR), this.feedback.fan(this._feedbackL.gain, this._feedbackR.gain), this._readOnly(["feedback"])
                    }, t.extend(t.StereoFeedbackEffect, t.StereoEffect), t.StereoFeedbackEffect.prototype.dispose = function() {
                        return t.StereoEffect.prototype.dispose.call(this), this._writable(["feedback"]), this.feedback.dispose(), this.feedback = null, this._feedbackL.dispose(), this._feedbackL = null, this._feedbackR.dispose(), this._feedbackR = null, this
                    }, t.StereoFeedbackEffect
                }), e(function(t) {
                    return t.StereoWidener = function() {
                        var e = t.defaults(arguments, ["width"], t.StereoWidener);
                        t.MidSideEffect.call(this, e), this.width = new t.Signal(e.width, t.Type.NormalRange), this._readOnly(["width"]), this._twoTimesWidthMid = new t.Multiply(2), this._twoTimesWidthSide = new t.Multiply(2), this._midMult = new t.Multiply, this._twoTimesWidthMid.connect(this._midMult, 0, 1), this.midSend.chain(this._midMult, this.midReturn), this._oneMinusWidth = new t.Subtract, this._oneMinusWidth.connect(this._twoTimesWidthMid), this.context.getConstant(1).connect(this._oneMinusWidth, 0, 0), this.width.connect(this._oneMinusWidth, 0, 1), this._sideMult = new t.Multiply, this.width.connect(this._twoTimesWidthSide), this._twoTimesWidthSide.connect(this._sideMult, 0, 1), this.sideSend.chain(this._sideMult, this.sideReturn)
                    }, t.extend(t.StereoWidener, t.MidSideEffect), t.StereoWidener.defaults = {
                        width: .5
                    }, t.StereoWidener.prototype.dispose = function() {
                        return t.MidSideEffect.prototype.dispose.call(this), this._writable(["width"]), this.width.dispose(), this.width = null, this._midMult.dispose(), this._midMult = null, this._sideMult.dispose(), this._sideMult = null, this._twoTimesWidthMid.dispose(), this._twoTimesWidthMid = null, this._twoTimesWidthSide.dispose(), this._twoTimesWidthSide = null, this._oneMinusWidth.dispose(), this._oneMinusWidth = null, this
                    }, t.StereoWidener
                }), e(function(t) {
                    return t.Tremolo = function() {
                        var e = t.defaults(arguments, ["frequency", "depth"], t.Tremolo);
                        t.StereoEffect.call(this, e), this._lfoL = new t.LFO({
                            phase: e.spread,
                            min: 1,
                            max: 0
                        }), this._lfoR = new t.LFO({
                            phase: e.spread,
                            min: 1,
                            max: 0
                        }), this._amplitudeL = new t.Gain, this._amplitudeR = new t.Gain, this.frequency = new t.Signal(e.frequency, t.Type.Frequency), this.depth = new t.Signal(e.depth, t.Type.NormalRange), this._readOnly(["frequency", "depth"]), this.effectSendL.chain(this._amplitudeL, this.effectReturnL), this.effectSendR.chain(this._amplitudeR, this.effectReturnR), this._lfoL.connect(this._amplitudeL.gain), this._lfoR.connect(this._amplitudeR.gain), this.frequency.fan(this._lfoL.frequency, this._lfoR.frequency), this.depth.fan(this._lfoR.amplitude, this._lfoL.amplitude), this.type = e.type, this.spread = e.spread
                    }, t.extend(t.Tremolo, t.StereoEffect), t.Tremolo.defaults = {
                        frequency: 10,
                        type: "sine",
                        depth: .5,
                        spread: 180
                    }, t.Tremolo.prototype.start = function(t) {
                        return this._lfoL.start(t), this._lfoR.start(t), this
                    }, t.Tremolo.prototype.stop = function(t) {
                        return this._lfoL.stop(t), this._lfoR.stop(t), this
                    }, t.Tremolo.prototype.sync = function(e) {
                        return this._lfoL.sync(e), this._lfoR.sync(e), t.Transport.syncSignal(this.frequency), this
                    }, t.Tremolo.prototype.unsync = function() {
                        return this._lfoL.unsync(), this._lfoR.unsync(), t.Transport.unsyncSignal(this.frequency), this
                    }, Object.defineProperty(t.Tremolo.prototype, "type", {
                        get: function() {
                            return this._lfoL.type
                        },
                        set: function(t) {
                            this._lfoL.type = t, this._lfoR.type = t
                        }
                    }), Object.defineProperty(t.Tremolo.prototype, "spread", {
                        get: function() {
                            return this._lfoR.phase - this._lfoL.phase
                        },
                        set: function(t) {
                            this._lfoL.phase = 90 - t / 2, this._lfoR.phase = t / 2 + 90
                        }
                    }), t.Tremolo.prototype.dispose = function() {
                        return t.StereoEffect.prototype.dispose.call(this), this._writable(["frequency", "depth"]), this._lfoL.dispose(), this._lfoL = null, this._lfoR.dispose(), this._lfoR = null, this._amplitudeL.dispose(), this._amplitudeL = null, this._amplitudeR.dispose(), this._amplitudeR = null, this.frequency = null, this.depth = null, this
                    }, t.Tremolo
                }), e(function(t) {
                    return t.Vibrato = function() {
                        var e = t.defaults(arguments, ["frequency", "depth"], t.Vibrato);
                        t.Effect.call(this, e), this._delayNode = new t.Delay(0, e.maxDelay), this._lfo = new t.LFO({
                            type: e.type,
                            min: 0,
                            max: e.maxDelay,
                            frequency: e.frequency,
                            phase: -90
                        }).start().connect(this._delayNode.delayTime), this.frequency = this._lfo.frequency, this.depth = this._lfo.amplitude, this.depth.value = e.depth, this._readOnly(["frequency", "depth"]), this.effectSend.chain(this._delayNode, this.effectReturn)
                    }, t.extend(t.Vibrato, t.Effect), t.Vibrato.defaults = {
                        maxDelay: .005,
                        frequency: 5,
                        depth: .1,
                        type: "sine"
                    }, Object.defineProperty(t.Vibrato.prototype, "type", {
                        get: function() {
                            return this._lfo.type
                        },
                        set: function(t) {
                            this._lfo.type = t
                        }
                    }), t.Vibrato.prototype.dispose = function() {
                        t.Effect.prototype.dispose.call(this), this._delayNode.dispose(), this._delayNode = null, this._lfo.dispose(), this._lfo = null, this._writable(["frequency", "depth"]), this.frequency = null, this.depth = null
                    }, t.Vibrato
                }), e(function(t) {
                    return t.Event = function() {
                        var e = t.defaults(arguments, ["callback", "value"], t.Event);
                        t.call(this), this._loop = e.loop, this.callback = e.callback, this.value = e.value, this._loopStart = this.toTicks(e.loopStart), this._loopEnd = this.toTicks(e.loopEnd), this._state = new t.TimelineState(t.State.Stopped), this._playbackRate = 1, this._startOffset = 0, this._probability = e.probability, this._humanize = e.humanize, this.mute = e.mute, this.playbackRate = e.playbackRate
                    }, t.extend(t.Event), t.Event.defaults = {
                        callback: t.noOp,
                        loop: !1,
                        loopEnd: "1m",
                        loopStart: 0,
                        playbackRate: 1,
                        value: null,
                        probability: 1,
                        mute: !1,
                        humanize: !1
                    }, t.Event.prototype._rescheduleEvents = function(e) {
                        return e = t.defaultArg(e, -1), this._state.forEachFrom(e, function(e) {
                            var i;
                            if (e.state === t.State.Started) {
                                t.isDefined(e.id) && t.Transport.clear(e.id);
                                var n = e.time + Math.round(this.startOffset / this._playbackRate);
                                if (this._loop) {
                                    i = 1 / 0, t.isNumber(this._loop) && (i = this._loop * this._getLoopDuration());
                                    var o = this._state.getAfter(n);
                                    null !== o && (i = Math.min(i, o.time - n)), i !== 1 / 0 && (this._state.setStateAtTime(t.State.Stopped, n + i + 1), i = t.Ticks(i));
                                    var s = t.Ticks(this._getLoopDuration());
                                    e.id = t.Transport.scheduleRepeat(this._tick.bind(this), s, t.Ticks(n), i)
                                } else e.id = t.Transport.schedule(this._tick.bind(this), t.Ticks(n))
                            }
                        }.bind(this)), this
                    }, Object.defineProperty(t.Event.prototype, "state", {
                        get: function() {
                            return this._state.getValueAtTime(t.Transport.ticks)
                        }
                    }), Object.defineProperty(t.Event.prototype, "startOffset", {
                        get: function() {
                            return this._startOffset
                        },
                        set: function(t) {
                            this._startOffset = t
                        }
                    }), Object.defineProperty(t.Event.prototype, "probability", {
                        get: function() {
                            return this._probability
                        },
                        set: function(t) {
                            this._probability = t
                        }
                    }), Object.defineProperty(t.Event.prototype, "humanize", {
                        get: function() {
                            return this._humanize
                        },
                        set: function(t) {
                            this._humanize = t
                        }
                    }), t.Event.prototype.start = function(e) {
                        return e = this.toTicks(e), this._state.getValueAtTime(e) === t.State.Stopped && (this._state.add({
                            state: t.State.Started,
                            time: e,
                            id: void 0
                        }), this._rescheduleEvents(e)), this
                    }, t.Event.prototype.stop = function(e) {
                        if (this.cancel(e), e = this.toTicks(e), this._state.getValueAtTime(e) === t.State.Started) {
                            this._state.setStateAtTime(t.State.Stopped, e);
                            var i = this._state.getBefore(e),
                                n = e;
                            null !== i && (n = i.time), this._rescheduleEvents(n)
                        }
                        return this
                    }, t.Event.prototype.cancel = function(e) {
                        return e = t.defaultArg(e, -(1 / 0)), e = this.toTicks(e), this._state.forEachFrom(e, function(e) {
                            t.Transport.clear(e.id)
                        }), this._state.cancel(e), this
                    }, t.Event.prototype._tick = function(e) {
                        var i = t.Transport.getTicksAtTime(e);
                        if (!this.mute && this._state.getValueAtTime(i) === t.State.Started) {
                            if (this.probability < 1 && Math.random() > this.probability) return;
                            if (this.humanize) {
                                var n = .02;
                                t.isBoolean(this.humanize) || (n = this.toSeconds(this.humanize)), e += (2 * Math.random() - 1) * n
                            }
                            this.callback(e, this.value)
                        }
                    }, t.Event.prototype._getLoopDuration = function() {
                        return Math.round((this._loopEnd - this._loopStart) / this._playbackRate)
                    }, Object.defineProperty(t.Event.prototype, "loop", {
                        get: function() {
                            return this._loop
                        },
                        set: function(t) {
                            this._loop = t, this._rescheduleEvents()
                        }
                    }), Object.defineProperty(t.Event.prototype, "playbackRate", {
                        get: function() {
                            return this._playbackRate
                        },
                        set: function(t) {
                            this._playbackRate = t, this._rescheduleEvents()
                        }
                    }), Object.defineProperty(t.Event.prototype, "loopEnd", {
                        get: function() {
                            return t.Ticks(this._loopEnd).toSeconds()
                        },
                        set: function(t) {
                            this._loopEnd = this.toTicks(t), this._loop && this._rescheduleEvents()
                        }
                    }), Object.defineProperty(t.Event.prototype, "loopStart", {
                        get: function() {
                            return t.Ticks(this._loopStart).toSeconds()
                        },
                        set: function(t) {
                            this._loopStart = this.toTicks(t), this._loop && this._rescheduleEvents()
                        }
                    }), Object.defineProperty(t.Event.prototype, "progress", {
                        get: function() {
                            if (this._loop) {
                                var e = t.Transport.ticks,
                                    i = this._state.get(e);
                                if (null !== i && i.state === t.State.Started) {
                                    var n = this._getLoopDuration(),
                                        o = (e - i.time) % n;
                                    return o / n
                                }
                                return 0
                            }
                            return 0
                        }
                    }), t.Event.prototype.dispose = function() {
                        this.cancel(), this._state.dispose(), this._state = null, this.callback = null, this.value = null
                    }, t.Event
                }), e(function(t) {
                    return t.Loop = function() {
                        var e = t.defaults(arguments, ["callback", "interval"], t.Loop);
                        t.call(this), this._event = new t.Event({
                            callback: this._tick.bind(this),
                            loop: !0,
                            loopEnd: e.interval,
                            playbackRate: e.playbackRate,
                            probability: e.probability
                        }), this.callback = e.callback, this.iterations = e.iterations;
                    }, t.extend(t.Loop), t.Loop.defaults = {
                        interval: "4n",
                        callback: t.noOp,
                        playbackRate: 1,
                        iterations: 1 / 0,
                        probability: !0,
                        mute: !1
                    }, t.Loop.prototype.start = function(t) {
                        return this._event.start(t), this
                    }, t.Loop.prototype.stop = function(t) {
                        return this._event.stop(t), this
                    }, t.Loop.prototype.cancel = function(t) {
                        return this._event.cancel(t), this
                    }, t.Loop.prototype._tick = function(t) {
                        this.callback(t)
                    }, Object.defineProperty(t.Loop.prototype, "state", {
                        get: function() {
                            return this._event.state
                        }
                    }), Object.defineProperty(t.Loop.prototype, "progress", {
                        get: function() {
                            return this._event.progress
                        }
                    }), Object.defineProperty(t.Loop.prototype, "interval", {
                        get: function() {
                            return this._event.loopEnd
                        },
                        set: function(t) {
                            this._event.loopEnd = t
                        }
                    }), Object.defineProperty(t.Loop.prototype, "playbackRate", {
                        get: function() {
                            return this._event.playbackRate
                        },
                        set: function(t) {
                            this._event.playbackRate = t
                        }
                    }), Object.defineProperty(t.Loop.prototype, "humanize", {
                        get: function() {
                            return this._event.humanize
                        },
                        set: function(t) {
                            this._event.humanize = t
                        }
                    }), Object.defineProperty(t.Loop.prototype, "probability", {
                        get: function() {
                            return this._event.probability
                        },
                        set: function(t) {
                            this._event.probability = t
                        }
                    }), Object.defineProperty(t.Loop.prototype, "mute", {
                        get: function() {
                            return this._event.mute
                        },
                        set: function(t) {
                            this._event.mute = t
                        }
                    }), Object.defineProperty(t.Loop.prototype, "iterations", {
                        get: function() {
                            return this._event.loop === !0 ? 1 / 0 : this._event.loop
                        },
                        set: function(t) {
                            t === 1 / 0 ? this._event.loop = !0 : this._event.loop = t
                        }
                    }), t.Loop.prototype.dispose = function() {
                        this._event.dispose(), this._event = null, this.callback = null
                    }, t.Loop
                }), e(function(t) {
                    return t.Part = function() {
                        var e = t.defaults(arguments, ["callback", "events"], t.Part);
                        t.Event.call(this, e), this._events = [];
                        for (var i = 0; i < e.events.length; i++) Array.isArray(e.events[i]) ? this.add(e.events[i][0], e.events[i][1]) : this.add(e.events[i])
                    }, t.extend(t.Part, t.Event), t.Part.defaults = {
                        callback: t.noOp,
                        loop: !1,
                        loopEnd: "1m",
                        loopStart: 0,
                        playbackRate: 1,
                        probability: 1,
                        humanize: !1,
                        mute: !1,
                        events: []
                    }, t.Part.prototype.start = function(e, i) {
                        var n = this.toTicks(e);
                        return this._state.getValueAtTime(n) !== t.State.Started && (i = this._loop ? t.defaultArg(i, this._loopStart) : t.defaultArg(i, 0), i = this.toTicks(i), this._state.add({
                            state: t.State.Started,
                            time: n,
                            offset: i
                        }), this._forEach(function(t) {
                            this._startNote(t, n, i)
                        })), this
                    }, t.Part.prototype._startNote = function(e, i, n) {
                        i -= n, this._loop ? e.startOffset >= this._loopStart && e.startOffset < this._loopEnd ? (e.startOffset < n && (i += this._getLoopDuration()), e.start(t.Ticks(i))) : e.startOffset < this._loopStart && e.startOffset >= n && (e.loop = !1, e.start(t.Ticks(i))) : e.startOffset >= n && e.start(t.Ticks(i))
                    }, Object.defineProperty(t.Part.prototype, "startOffset", {
                        get: function() {
                            return this._startOffset
                        },
                        set: function(t) {
                            this._startOffset = t, this._forEach(function(t) {
                                t.startOffset += this._startOffset
                            })
                        }
                    }), t.Part.prototype.stop = function(e) {
                        var i = this.toTicks(e);
                        return this._state.cancel(i), this._state.setStateAtTime(t.State.Stopped, i), this._forEach(function(t) {
                            t.stop(e)
                        }), this
                    }, t.Part.prototype.at = function(e, i) {
                        e = t.TransportTime(e);
                        for (var n = t.Ticks(1).toSeconds(), o = 0; o < this._events.length; o++) {
                            var s = this._events[o];
                            if (Math.abs(e.toTicks() - s.startOffset) < n) return t.isDefined(i) && (s.value = i), s
                        }
                        return t.isDefined(i) ? (this.add(e, i), this._events[this._events.length - 1]) : null
                    }, t.Part.prototype.add = function(e, i) {
                        e.hasOwnProperty("time") && (i = e, e = i.time), e = this.toTicks(e);
                        var n;
                        return i instanceof t.Event ? (n = i, n.callback = this._tick.bind(this)) : n = new t.Event({
                            callback: this._tick.bind(this),
                            value: i
                        }), n.startOffset = e, n.set({
                            loopEnd: this.loopEnd,
                            loopStart: this.loopStart,
                            loop: this.loop,
                            humanize: this.humanize,
                            playbackRate: this.playbackRate,
                            probability: this.probability
                        }), this._events.push(n), this._restartEvent(n), this
                    }, t.Part.prototype._restartEvent = function(e) {
                        this._state.forEach(function(i) {
                            i.state === t.State.Started ? this._startNote(e, i.time, i.offset) : e.stop(t.Ticks(i.time))
                        }.bind(this))
                    }, t.Part.prototype.remove = function(e, i) {
                        e.hasOwnProperty("time") && (i = e, e = i.time), e = this.toTicks(e);
                        for (var n = this._events.length - 1; n >= 0; n--) {
                            var o = this._events[n];
                            o instanceof t.Part ? o.remove(e, i) : o.startOffset === e && (t.isUndef(i) || t.isDefined(i) && o.value === i) && (this._events.splice(n, 1), o.dispose())
                        }
                        return this
                    }, t.Part.prototype.removeAll = function() {
                        return this._forEach(function(t) {
                            t.dispose()
                        }), this._events = [], this
                    }, t.Part.prototype.cancel = function(t) {
                        return this._forEach(function(e) {
                            e.cancel(t)
                        }), this._state.cancel(this.toTicks(t)), this
                    }, t.Part.prototype._forEach = function(e, i) {
                        if (this._events) {
                            i = t.defaultArg(i, this);
                            for (var n = this._events.length - 1; n >= 0; n--) {
                                var o = this._events[n];
                                o instanceof t.Part ? o._forEach(e, i) : e.call(i, o)
                            }
                        }
                        return this
                    }, t.Part.prototype._setAll = function(t, e) {
                        this._forEach(function(i) {
                            i[t] = e
                        })
                    }, t.Part.prototype._tick = function(t, e) {
                        this.mute || this.callback(t, e)
                    }, t.Part.prototype._testLoopBoundries = function(e) {
                        e.startOffset < this._loopStart || e.startOffset >= this._loopEnd ? e.cancel(0) : e.state === t.State.Stopped && this._restartEvent(e)
                    }, Object.defineProperty(t.Part.prototype, "probability", {
                        get: function() {
                            return this._probability
                        },
                        set: function(t) {
                            this._probability = t, this._setAll("probability", t)
                        }
                    }), Object.defineProperty(t.Part.prototype, "humanize", {
                        get: function() {
                            return this._humanize
                        },
                        set: function(t) {
                            this._humanize = t, this._setAll("humanize", t)
                        }
                    }), Object.defineProperty(t.Part.prototype, "loop", {
                        get: function() {
                            return this._loop
                        },
                        set: function(t) {
                            this._loop = t, this._forEach(function(e) {
                                e._loopStart = this._loopStart, e._loopEnd = this._loopEnd, e.loop = t, this._testLoopBoundries(e)
                            })
                        }
                    }), Object.defineProperty(t.Part.prototype, "loopEnd", {
                        get: function() {
                            return t.Ticks(this._loopEnd).toSeconds()
                        },
                        set: function(t) {
                            this._loopEnd = this.toTicks(t), this._loop && this._forEach(function(e) {
                                e.loopEnd = t, this._testLoopBoundries(e)
                            })
                        }
                    }), Object.defineProperty(t.Part.prototype, "loopStart", {
                        get: function() {
                            return t.Ticks(this._loopStart).toSeconds()
                        },
                        set: function(t) {
                            this._loopStart = this.toTicks(t), this._loop && this._forEach(function(t) {
                                t.loopStart = this.loopStart, this._testLoopBoundries(t)
                            })
                        }
                    }), Object.defineProperty(t.Part.prototype, "playbackRate", {
                        get: function() {
                            return this._playbackRate
                        },
                        set: function(t) {
                            this._playbackRate = t, this._setAll("playbackRate", t)
                        }
                    }), Object.defineProperty(t.Part.prototype, "length", {
                        get: function() {
                            return this._events.length
                        }
                    }), t.Part.prototype.dispose = function() {
                        return this.removeAll(), this._state.dispose(), this._state = null, this.callback = null, this._events = null, this
                    }, t.Part
                }), e(function(t) {
                    return t.Pattern = function() {
                        var e = t.defaults(arguments, ["callback", "values", "pattern"], t.Pattern);
                        t.Loop.call(this, e), this._pattern = new t.CtrlPattern({
                            values: e.values,
                            type: e.pattern,
                            index: e.index
                        })
                    }, t.extend(t.Pattern, t.Loop), t.Pattern.defaults = {
                        pattern: t.CtrlPattern.Type.Up,
                        callback: t.noOp,
                        values: []
                    }, t.Pattern.prototype._tick = function(t) {
                        this.callback(t, this._pattern.value), this._pattern.next()
                    }, Object.defineProperty(t.Pattern.prototype, "index", {
                        get: function() {
                            return this._pattern.index
                        },
                        set: function(t) {
                            this._pattern.index = t
                        }
                    }), Object.defineProperty(t.Pattern.prototype, "values", {
                        get: function() {
                            return this._pattern.values
                        },
                        set: function(t) {
                            this._pattern.values = t
                        }
                    }), Object.defineProperty(t.Pattern.prototype, "value", {
                        get: function() {
                            return this._pattern.value
                        }
                    }), Object.defineProperty(t.Pattern.prototype, "pattern", {
                        get: function() {
                            return this._pattern.type
                        },
                        set: function(t) {
                            this._pattern.type = t
                        }
                    }), t.Pattern.prototype.dispose = function() {
                        t.Loop.prototype.dispose.call(this), this._pattern.dispose(), this._pattern = null
                    }, t.Pattern
                }), e(function(t) {
                    return t.Sequence = function() {
                        var e = t.defaults(arguments, ["callback", "events", "subdivision"], t.Sequence),
                            i = e.events;
                        if (delete e.events, t.Part.call(this, e), this._subdivision = this.toTicks(e.subdivision), t.isUndef(e.loopEnd) && t.isDefined(i) && (this._loopEnd = i.length * this._subdivision), this._loop = !0, t.isDefined(i))
                            for (var n = 0; n < i.length; n++) this.add(n, i[n])
                    }, t.extend(t.Sequence, t.Part), t.Sequence.defaults = {
                        subdivision: "4n"
                    }, Object.defineProperty(t.Sequence.prototype, "subdivision", {
                        get: function() {
                            return t.Ticks(this._subdivision).toSeconds()
                        }
                    }), t.Sequence.prototype.at = function(e, i) {
                        return t.isArray(i) && this.remove(e), t.Part.prototype.at.call(this, this._indexTime(e), i)
                    }, t.Sequence.prototype.add = function(e, i) {
                        if (null === i) return this;
                        if (t.isArray(i)) {
                            var n = Math.round(this._subdivision / i.length);
                            i = new t.Sequence(this._tick.bind(this), i, t.Ticks(n))
                        }
                        return t.Part.prototype.add.call(this, this._indexTime(e), i), this
                    }, t.Sequence.prototype.remove = function(e, i) {
                        return t.Part.prototype.remove.call(this, this._indexTime(e), i), this
                    }, t.Sequence.prototype._indexTime = function(e) {
                        return e instanceof t.TransportTime ? e : t.Ticks(e * this._subdivision + this.startOffset).toSeconds()
                    }, t.Sequence.prototype.dispose = function() {
                        return t.Part.prototype.dispose.call(this), this
                    }, t.Sequence
                }), e(function(t) {
                    return t.PulseOscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "width"], t.Oscillator);
                        t.Source.call(this, e), this.width = new t.Signal(e.width, t.Type.NormalRange), this._widthGate = new t.Gain, this._sawtooth = new t.Oscillator({
                            frequency: e.frequency,
                            detune: e.detune,
                            type: "sawtooth",
                            phase: e.phase
                        }), this.frequency = this._sawtooth.frequency, this.detune = this._sawtooth.detune, this._thresh = new t.WaveShaper(function(t) {
                            return 0 > t ? -1 : 1
                        }), this._sawtooth.chain(this._thresh, this.output), this.width.chain(this._widthGate, this._thresh), this._readOnly(["width", "frequency", "detune"])
                    }, t.extend(t.PulseOscillator, t.Source), t.PulseOscillator.defaults = {
                        frequency: 440,
                        detune: 0,
                        phase: 0,
                        width: .2
                    }, t.PulseOscillator.prototype._start = function(t) {
                        t = this.toSeconds(t), this._sawtooth.start(t), this._widthGate.gain.setValueAtTime(1, t)
                    }, t.PulseOscillator.prototype._stop = function(t) {
                        t = this.toSeconds(t), this._sawtooth.stop(t), this._widthGate.gain.setValueAtTime(0, t)
                    }, t.PulseOscillator.prototype.restart = function(t) {
                        this._sawtooth.restart(t)
                    }, Object.defineProperty(t.PulseOscillator.prototype, "phase", {
                        get: function() {
                            return this._sawtooth.phase
                        },
                        set: function(t) {
                            this._sawtooth.phase = t
                        }
                    }), Object.defineProperty(t.PulseOscillator.prototype, "type", {
                        get: function() {
                            return "pulse"
                        }
                    }), Object.defineProperty(t.PulseOscillator.prototype, "partials", {
                        get: function() {
                            return []
                        }
                    }), t.PulseOscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this._sawtooth.dispose(), this._sawtooth = null, this._writable(["width", "frequency", "detune"]), this.width.dispose(), this.width = null, this._widthGate.dispose(), this._widthGate = null, this._thresh.dispose(), this._thresh = null, this.frequency = null, this.detune = null, this
                    }, t.PulseOscillator
                }), e(function(t) {
                    return t.PWMOscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "modulationFrequency"], t.PWMOscillator);
                        t.Source.call(this, e), this._pulse = new t.PulseOscillator(e.modulationFrequency), this._pulse._sawtooth.type = "sine", this._modulator = new t.Oscillator({
                            frequency: e.frequency,
                            detune: e.detune,
                            phase: e.phase
                        }), this._scale = new t.Multiply(2), this.frequency = this._modulator.frequency, this.detune = this._modulator.detune, this.modulationFrequency = this._pulse.frequency, this._modulator.chain(this._scale, this._pulse.width), this._pulse.connect(this.output), this._readOnly(["modulationFrequency", "frequency", "detune"])
                    }, t.extend(t.PWMOscillator, t.Source), t.PWMOscillator.defaults = {
                        frequency: 440,
                        detune: 0,
                        phase: 0,
                        modulationFrequency: .4
                    }, t.PWMOscillator.prototype._start = function(t) {
                        t = this.toSeconds(t), this._modulator.start(t), this._pulse.start(t)
                    }, t.PWMOscillator.prototype._stop = function(t) {
                        t = this.toSeconds(t), this._modulator.stop(t), this._pulse.stop(t)
                    }, t.PWMOscillator.prototype.restart = function(t) {
                        this._modulator.restart(t), this._pulse.restart(t)
                    }, Object.defineProperty(t.PWMOscillator.prototype, "type", {
                        get: function() {
                            return "pwm"
                        }
                    }), Object.defineProperty(t.PWMOscillator.prototype, "partials", {
                        get: function() {
                            return []
                        }
                    }), Object.defineProperty(t.PWMOscillator.prototype, "phase", {
                        get: function() {
                            return this._modulator.phase
                        },
                        set: function(t) {
                            this._modulator.phase = t
                        }
                    }), t.PWMOscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this._pulse.dispose(), this._pulse = null, this._scale.dispose(), this._scale = null, this._modulator.dispose(), this._modulator = null, this._writable(["modulationFrequency", "frequency", "detune"]), this.frequency = null, this.detune = null, this.modulationFrequency = null, this
                    }, t.PWMOscillator
                }), e(function(t) {
                    return t.FMOscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "type", "modulationType"], t.FMOscillator);
                        t.Source.call(this, e), this._carrier = new t.Oscillator(e.frequency, e.type), this.frequency = new t.Signal(e.frequency, t.Type.Frequency), this.detune = this._carrier.detune, this.detune.value = e.detune, this.modulationIndex = new t.Multiply(e.modulationIndex), this.modulationIndex.units = t.Type.Positive, this._modulator = new t.Oscillator(e.frequency, e.modulationType), this.harmonicity = new t.Multiply(e.harmonicity), this.harmonicity.units = t.Type.Positive, this._modulationNode = new t.Gain(0), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output), this.detune.connect(this._modulator.detune), this.phase = e.phase, this._readOnly(["modulationIndex", "frequency", "detune", "harmonicity"])
                    }, t.extend(t.FMOscillator, t.Source), t.FMOscillator.defaults = {
                        frequency: 440,
                        detune: 0,
                        phase: 0,
                        modulationIndex: 2,
                        modulationType: "square",
                        harmonicity: 1
                    }, t.FMOscillator.prototype._start = function(t) {
                        this._modulator.start(t), this._carrier.start(t)
                    }, t.FMOscillator.prototype._stop = function(t) {
                        this._modulator.stop(t), this._carrier.stop(t)
                    }, t.FMOscillator.prototype.restart = function(t) {
                        this._modulator.restart(t), this._carrier.restart(t)
                    }, Object.defineProperty(t.FMOscillator.prototype, "type", {
                        get: function() {
                            return this._carrier.type
                        },
                        set: function(t) {
                            this._carrier.type = t
                        }
                    }), Object.defineProperty(t.FMOscillator.prototype, "modulationType", {
                        get: function() {
                            return this._modulator.type
                        },
                        set: function(t) {
                            this._modulator.type = t
                        }
                    }), Object.defineProperty(t.FMOscillator.prototype, "phase", {
                        get: function() {
                            return this._carrier.phase
                        },
                        set: function(t) {
                            this._carrier.phase = t, this._modulator.phase = t
                        }
                    }), Object.defineProperty(t.FMOscillator.prototype, "partials", {
                        get: function() {
                            return this._carrier.partials
                        },
                        set: function(t) {
                            this._carrier.partials = t
                        }
                    }), t.FMOscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this._writable(["modulationIndex", "frequency", "detune", "harmonicity"]), this.frequency.dispose(), this.frequency = null, this.detune = null, this.harmonicity.dispose(), this.harmonicity = null, this._carrier.dispose(), this._carrier = null, this._modulator.dispose(), this._modulator = null, this._modulationNode.dispose(), this._modulationNode = null, this.modulationIndex.dispose(), this.modulationIndex = null, this
                    }, t.FMOscillator
                }), e(function(t) {
                    return t.AMOscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "type", "modulationType"], t.AMOscillator);
                        t.Source.call(this, e), this._carrier = new t.Oscillator(e.frequency, e.type), this.frequency = this._carrier.frequency, this.detune = this._carrier.detune, this.detune.value = e.detune, this._modulator = new t.Oscillator(e.frequency, e.modulationType), this._modulationScale = new t.AudioToGain, this.harmonicity = new t.Multiply(e.harmonicity), this.harmonicity.units = t.Type.Positive, this._modulationNode = new t.Gain(0), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.detune.connect(this._modulator.detune), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output), this.phase = e.phase, this._readOnly(["frequency", "detune", "harmonicity"])
                    }, t.extend(t.AMOscillator, t.Oscillator), t.AMOscillator.defaults = {
                        frequency: 440,
                        detune: 0,
                        phase: 0,
                        modulationType: "square",
                        harmonicity: 1
                    }, t.AMOscillator.prototype._start = function(t) {
                        this._modulator.start(t), this._carrier.start(t)
                    }, t.AMOscillator.prototype._stop = function(t) {
                        this._modulator.stop(t), this._carrier.stop(t)
                    }, t.AMOscillator.prototype.restart = function(t) {
                        this._modulator.restart(t), this._carrier.restart(t)
                    }, Object.defineProperty(t.AMOscillator.prototype, "type", {
                        get: function() {
                            return this._carrier.type
                        },
                        set: function(t) {
                            this._carrier.type = t
                        }
                    }), Object.defineProperty(t.AMOscillator.prototype, "modulationType", {
                        get: function() {
                            return this._modulator.type
                        },
                        set: function(t) {
                            this._modulator.type = t
                        }
                    }), Object.defineProperty(t.AMOscillator.prototype, "phase", {
                        get: function() {
                            return this._carrier.phase
                        },
                        set: function(t) {
                            this._carrier.phase = t, this._modulator.phase = t
                        }
                    }), Object.defineProperty(t.AMOscillator.prototype, "partials", {
                        get: function() {
                            return this._carrier.partials
                        },
                        set: function(t) {
                            this._carrier.partials = t
                        }
                    }), t.AMOscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this._writable(["frequency", "detune", "harmonicity"]), this.frequency = null, this.detune = null, this.harmonicity.dispose(), this.harmonicity = null, this._carrier.dispose(), this._carrier = null, this._modulator.dispose(), this._modulator = null, this._modulationNode.dispose(), this._modulationNode = null, this._modulationScale.dispose(), this._modulationScale = null, this
                    }, t.AMOscillator
                }), e(function(t) {
                    return t.FatOscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "type", "spread"], t.FatOscillator);
                        t.Source.call(this, e), this.frequency = new t.Signal(e.frequency, t.Type.Frequency), this.detune = new t.Signal(e.detune, t.Type.Cents), this._oscillators = [], this._spread = e.spread, this._type = e.type, this._phase = e.phase, this._partials = t.defaultArg(e.partials, []), this.count = e.count, this._readOnly(["frequency", "detune"])
                    }, t.extend(t.FatOscillator, t.Source), t.FatOscillator.defaults = {
                        frequency: 440,
                        detune: 0,
                        phase: 0,
                        spread: 20,
                        count: 3,
                        type: "sawtooth"
                    }, t.FatOscillator.prototype._start = function(t) {
                        t = this.toSeconds(t), this._forEach(function(e) {
                            e.start(t)
                        })
                    }, t.FatOscillator.prototype._stop = function(t) {
                        t = this.toSeconds(t), this._forEach(function(e) {
                            e.stop(t)
                        })
                    }, t.FatOscillator.prototype.restart = function(t) {
                        t = this.toSeconds(t), this._forEach(function(e) {
                            e.restart(t)
                        })
                    }, t.FatOscillator.prototype._forEach = function(t) {
                        for (var e = 0; e < this._oscillators.length; e++) t.call(this, this._oscillators[e], e)
                    }, Object.defineProperty(t.FatOscillator.prototype, "type", {
                        get: function() {
                            return this._type
                        },
                        set: function(t) {
                            this._type = t, this._forEach(function(e) {
                                e.type = t
                            })
                        }
                    }), Object.defineProperty(t.FatOscillator.prototype, "spread", {
                        get: function() {
                            return this._spread
                        },
                        set: function(t) {
                            if (this._spread = t, this._oscillators.length > 1) {
                                var e = -t / 2,
                                    i = t / (this._oscillators.length - 1);
                                this._forEach(function(t, n) {
                                    t.detune.value = e + i * n
                                })
                            }
                        }
                    }), Object.defineProperty(t.FatOscillator.prototype, "count", {
                        get: function() {
                            return this._oscillators.length
                        },
                        set: function(e) {
                            if (e = Math.max(e, 1), this._oscillators.length !== e) {
                                this._forEach(function(t) {
                                    t.dispose()
                                }), this._oscillators = [];
                                for (var i = 0; e > i; i++) {
                                    var n = new t.Oscillator;
                                    this.type === t.Oscillator.Type.Custom ? n.partials = this._partials : n.type = this._type, n.phase = this._phase, n.volume.value = -6 - 1.1 * e, this.frequency.connect(n.frequency), this.detune.connect(n.detune), n.connect(this.output), this._oscillators[i] = n
                                }
                                this.spread = this._spread, this.state === t.State.Started && this._forEach(function(t) {
                                    t.start()
                                })
                            }
                        }
                    }), Object.defineProperty(t.FatOscillator.prototype, "phase", {
                        get: function() {
                            return this._phase
                        },
                        set: function(t) {
                            this._phase = t, this._forEach(function(e) {
                                e.phase = t
                            })
                        }
                    }), Object.defineProperty(t.FatOscillator.prototype, "partials", {
                        get: function() {
                            return this._partials
                        },
                        set: function(e) {
                            this._partials = e, this._type = t.Oscillator.Type.Custom, this._forEach(function(t) {
                                t.partials = e
                            })
                        }
                    }), t.FatOscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this._writable(["frequency", "detune"]), this.frequency.dispose(), this.frequency = null, this.detune.dispose(), this.detune = null, this._forEach(function(t) {
                            t.dispose()
                        }), this._oscillators = null, this._partials = null, this
                    }, t.FatOscillator
                }), e(function(t) {
                    t.OmniOscillator = function() {
                        var e = t.defaults(arguments, ["frequency", "type"], t.OmniOscillator);
                        t.Source.call(this, e), this.frequency = new t.Signal(e.frequency, t.Type.Frequency), this.detune = new t.Signal(e.detune, t.Type.Cents), this._sourceType = void 0, this._oscillator = null, this.type = e.type, this._readOnly(["frequency", "detune"]), this.set(e)
                    }, t.extend(t.OmniOscillator, t.Source), t.OmniOscillator.defaults = {
                        frequency: 440,
                        detune: 0,
                        type: "sine",
                        phase: 0
                    };
                    var e = {
                        Pulse: "PulseOscillator",
                        PWM: "PWMOscillator",
                        Osc: "Oscillator",
                        FM: "FMOscillator",
                        AM: "AMOscillator",
                        Fat: "FatOscillator"
                    };
                    return t.OmniOscillator.prototype._start = function(t) {
                        this._oscillator.start(t)
                    }, t.OmniOscillator.prototype._stop = function(t) {
                        this._oscillator.stop(t)
                    }, t.OmniOscillator.prototype.restart = function(t) {
                        this._oscillator.restart(t)
                    }, Object.defineProperty(t.OmniOscillator.prototype, "type", {
                        get: function() {
                            var t = "";
                            return this._sourceType === e.FM ? t = "fm" : this._sourceType === e.AM ? t = "am" : this._sourceType === e.Fat && (t = "fat"), t + this._oscillator.type
                        },
                        set: function(t) {
                            "fm" === t.substr(0, 2) ? (this._createNewOscillator(e.FM), this._oscillator.type = t.substr(2)) : "am" === t.substr(0, 2) ? (this._createNewOscillator(e.AM), this._oscillator.type = t.substr(2)) : "fat" === t.substr(0, 3) ? (this._createNewOscillator(e.Fat), this._oscillator.type = t.substr(3)) : "pwm" === t ? this._createNewOscillator(e.PWM) : "pulse" === t ? this._createNewOscillator(e.Pulse) : (this._createNewOscillator(e.Osc), this._oscillator.type = t)
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "partials", {
                        get: function() {
                            return this._oscillator.partials
                        },
                        set: function(t) {
                            this._oscillator.partials = t
                        }
                    }), t.OmniOscillator.prototype.set = function(e, i) {
                        return "type" === e ? this.type = i : t.isObject(e) && e.hasOwnProperty("type") && (this.type = e.type), t.prototype.set.apply(this, arguments), this
                    }, t.OmniOscillator.prototype._createNewOscillator = function(e) {
                        if (e !== this._sourceType) {
                            this._sourceType = e;
                            var i = t[e],
                                n = this.now();
                            if (null !== this._oscillator) {
                                var o = this._oscillator;
                                o.stop(n), this.context.setTimeout(function() {
                                    o.dispose(), o = null
                                }, this.blockTime)
                            }
                            this._oscillator = new i, this.frequency.connect(this._oscillator.frequency), this.detune.connect(this._oscillator.detune), this._oscillator.connect(this.output), this.state === t.State.Started && this._oscillator.start(n)
                        }
                    }, Object.defineProperty(t.OmniOscillator.prototype, "phase", {
                        get: function() {
                            return this._oscillator.phase
                        },
                        set: function(t) {
                            this._oscillator.phase = t
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "width", {
                        get: function() {
                            return this._sourceType === e.Pulse ? this._oscillator.width : void 0
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "count", {
                        get: function() {
                            return this._sourceType === e.Fat ? this._oscillator.count : void 0
                        },
                        set: function(t) {
                            this._sourceType === e.Fat && (this._oscillator.count = t)
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "spread", {
                        get: function() {
                            return this._sourceType === e.Fat ? this._oscillator.spread : void 0
                        },
                        set: function(t) {
                            this._sourceType === e.Fat && (this._oscillator.spread = t)
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "modulationType", {
                        get: function() {
                            return this._sourceType === e.FM || this._sourceType === e.AM ? this._oscillator.modulationType : void 0
                        },
                        set: function(t) {
                            (this._sourceType === e.FM || this._sourceType === e.AM) && (this._oscillator.modulationType = t)
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "modulationIndex", {
                        get: function() {
                            return this._sourceType === e.FM ? this._oscillator.modulationIndex : void 0
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "harmonicity", {
                        get: function() {
                            return this._sourceType === e.FM || this._sourceType === e.AM ? this._oscillator.harmonicity : void 0
                        }
                    }), Object.defineProperty(t.OmniOscillator.prototype, "modulationFrequency", {
                        get: function() {
                            return this._sourceType === e.PWM ? this._oscillator.modulationFrequency : void 0
                        }
                    }), t.OmniOscillator.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this._writable(["frequency", "detune"]), this.detune.dispose(), this.detune = null, this.frequency.dispose(), this.frequency = null, this._oscillator.dispose(), this._oscillator = null, this._sourceType = null, this
                    }, t.OmniOscillator
                }), e(function(t) {
                    return t.Instrument = function(e) {
                        e = t.defaultArg(e, t.Instrument.defaults), t.AudioNode.call(this), this._volume = this.output = new t.Volume(e.volume), this.volume = this._volume.volume, this._readOnly("volume"), this._scheduledEvents = []
                    }, t.extend(t.Instrument, t.AudioNode), t.Instrument.defaults = {
                        volume: 0
                    }, t.Instrument.prototype.triggerAttack = t.noOp, t.Instrument.prototype.triggerRelease = t.noOp, t.Instrument.prototype.sync = function() {
                        return this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 0), this
                    }, t.Instrument.prototype._syncMethod = function(e, i) {
                        var n = this["_original_" + e] = this[e];
                        this[e] = function() {
                            var e = Array.prototype.slice.call(arguments),
                                o = e[i],
                                s = t.Transport.schedule(function(t) {
                                    e[i] = t, n.apply(this, e)
                                }.bind(this), o);
                            this._scheduledEvents.push(s)
                        }.bind(this)
                    }, t.Instrument.prototype.unsync = function() {
                        return this._scheduledEvents.forEach(function(e) {
                            t.Transport.clear(e)
                        }), this._scheduledEvents = [], this._original_triggerAttack && (this.triggerAttack = this._original_triggerAttack, this.triggerRelease = this._original_triggerRelease), this
                    }, t.Instrument.prototype.triggerAttackRelease = function(t, e, i, n) {
                        return i = this.toSeconds(i), e = this.toSeconds(e), this.triggerAttack(t, i, n), this.triggerRelease(i + e), this
                    }, t.Instrument.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._volume.dispose(), this._volume = null, this._writable(["volume"]), this.volume = null, this.unsync(), this._scheduledEvents = null, this
                    }, t.Instrument
                }), e(function(t) {
                    return t.Monophonic = function(e) {
                        e = t.defaultArg(e, t.Monophonic.defaults), t.Instrument.call(this, e), this.portamento = e.portamento
                    }, t.extend(t.Monophonic, t.Instrument), t.Monophonic.defaults = {
                        portamento: 0
                    }, t.Monophonic.prototype.triggerAttack = function(t, e, i) {
                        return e = this.toSeconds(e), this._triggerEnvelopeAttack(e, i), this.setNote(t, e), this
                    }, t.Monophonic.prototype.triggerRelease = function(t) {
                        return t = this.toSeconds(t), this._triggerEnvelopeRelease(t), this
                    }, t.Monophonic.prototype._triggerEnvelopeAttack = function() {}, t.Monophonic.prototype._triggerEnvelopeRelease = function() {}, t.Monophonic.prototype.getLevelAtTime = function(t) {
                        return t = this.toSeconds(t), this.envelope.getValueAtTime(t)
                    }, t.Monophonic.prototype.setNote = function(t, e) {
                        if (e = this.toSeconds(e), this.portamento > 0 && this.getLevelAtTime(e) > .05) {
                            var i = this.toSeconds(this.portamento);
                            this.frequency.exponentialRampTo(t, i, e)
                        } else this.frequency.setValueAtTime(t, e);
                        return this
                    }, t.Monophonic
                }), e(function(t) {
                    return t.Synth = function(e) {
                        e = t.defaultArg(e, t.Synth.defaults), t.Monophonic.call(this, e), this.oscillator = new t.OmniOscillator(e.oscillator), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.envelope = new t.AmplitudeEnvelope(e.envelope), this.oscillator.chain(this.envelope, this.output), this._readOnly(["oscillator", "frequency", "detune", "envelope"])
                    }, t.extend(t.Synth, t.Monophonic), t.Synth.defaults = {
                        oscillator: {
                            type: "triangle"
                        },
                        envelope: {
                            attack: .005,
                            decay: .1,
                            sustain: .3,
                            release: 1
                        }
                    }, t.Synth.prototype._triggerEnvelopeAttack = function(t, e) {
                        return this.envelope.triggerAttack(t, e), this.oscillator.start(t), 0 === this.envelope.sustain && this.oscillator.stop(t + this.envelope.attack + this.envelope.decay), this
                    }, t.Synth.prototype._triggerEnvelopeRelease = function(t) {
                        return t = this.toSeconds(t), this.envelope.triggerRelease(t), this.oscillator.stop(t + this.envelope.release), this
                    }, t.Synth.prototype.dispose = function() {
                        return t.Monophonic.prototype.dispose.call(this), this._writable(["oscillator", "frequency", "detune", "envelope"]), this.oscillator.dispose(), this.oscillator = null, this.envelope.dispose(), this.envelope = null, this.frequency = null, this.detune = null, this
                    }, t.Synth
                }), e(function(t) {
                    return t.AMSynth = function(e) {
                        e = t.defaultArg(e, t.AMSynth.defaults), t.Monophonic.call(this, e), this._carrier = new t.Synth, this._carrier.volume.value = -10, this.oscillator = this._carrier.oscillator, this.envelope = this._carrier.envelope.set(e.envelope), this._modulator = new t.Synth, this._modulator.volume.value = -10, this.modulation = this._modulator.oscillator.set(e.modulation), this.modulationEnvelope = this._modulator.envelope.set(e.modulationEnvelope), this.frequency = new t.Signal(440, t.Type.Frequency), this.detune = new t.Signal(e.detune, t.Type.Cents), this.harmonicity = new t.Multiply(e.harmonicity), this.harmonicity.units = t.Type.Positive, this._modulationScale = new t.AudioToGain, this._modulationNode = new t.Gain, this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.chain(this._modulationScale, this._modulationNode.gain), this._carrier.chain(this._modulationNode, this.output), this._readOnly(["frequency", "harmonicity", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"])
                    }, t.extend(t.AMSynth, t.Monophonic), t.AMSynth.defaults = {
                        harmonicity: 3,
                        detune: 0,
                        oscillator: {
                            type: "sine"
                        },
                        envelope: {
                            attack: .01,
                            decay: .01,
                            sustain: 1,
                            release: .5
                        },
                        modulation: {
                            type: "square"
                        },
                        modulationEnvelope: {
                            attack: .5,
                            decay: 0,
                            sustain: 1,
                            release: .5
                        }
                    }, t.AMSynth.prototype._triggerEnvelopeAttack = function(t, e) {
                        return t = this.toSeconds(t), this._carrier._triggerEnvelopeAttack(t, e), this._modulator._triggerEnvelopeAttack(t), this
                    }, t.AMSynth.prototype._triggerEnvelopeRelease = function(t) {
                        return this._carrier._triggerEnvelopeRelease(t), this._modulator._triggerEnvelopeRelease(t), this
                    }, t.AMSynth.prototype.dispose = function() {
                        return t.Monophonic.prototype.dispose.call(this), this._writable(["frequency", "harmonicity", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"]), this._carrier.dispose(), this._carrier = null, this._modulator.dispose(), this._modulator = null, this.frequency.dispose(), this.frequency = null, this.detune.dispose(), this.detune = null, this.harmonicity.dispose(), this.harmonicity = null, this._modulationScale.dispose(), this._modulationScale = null, this._modulationNode.dispose(), this._modulationNode = null, this.oscillator = null, this.envelope = null, this.modulationEnvelope = null, this.modulation = null, this
                    }, t.AMSynth
                }), e(function(t) {
                    return t.MonoSynth = function(e) {
                        e = t.defaultArg(e, t.MonoSynth.defaults), t.Monophonic.call(this, e), this.oscillator = new t.OmniOscillator(e.oscillator), this.frequency = this.oscillator.frequency, this.detune = this.oscillator.detune, this.filter = new t.Filter(e.filter), this.filterEnvelope = new t.FrequencyEnvelope(e.filterEnvelope), this.envelope = new t.AmplitudeEnvelope(e.envelope), this.oscillator.chain(this.filter, this.envelope, this.output), this.filterEnvelope.connect(this.filter.frequency), this._readOnly(["oscillator", "frequency", "detune", "filter", "filterEnvelope", "envelope"])
                    }, t.extend(t.MonoSynth, t.Monophonic), t.MonoSynth.defaults = {
                        frequency: "C4",
                        detune: 0,
                        oscillator: {
                            type: "square"
                        },
                        filter: {
                            Q: 6,
                            type: "lowpass",
                            rolloff: -24
                        },
                        envelope: {
                            attack: .005,
                            decay: .1,
                            sustain: .9,
                            release: 1
                        },
                        filterEnvelope: {
                            attack: .06,
                            decay: .2,
                            sustain: .5,
                            release: 2,
                            baseFrequency: 200,
                            octaves: 7,
                            exponent: 2
                        }
                    }, t.MonoSynth.prototype._triggerEnvelopeAttack = function(t, e) {
                        return t = this.toSeconds(t), this.envelope.triggerAttack(t, e), this.filterEnvelope.triggerAttack(t), this.oscillator.start(t), 0 === this.envelope.sustain && this.oscillator.stop(t + this.envelope.attack + this.envelope.decay), this
                    }, t.MonoSynth.prototype._triggerEnvelopeRelease = function(t) {
                        return this.envelope.triggerRelease(t), this.filterEnvelope.triggerRelease(t), this.oscillator.stop(t + this.envelope.release), this
                    }, t.MonoSynth.prototype.dispose = function() {
                        return t.Monophonic.prototype.dispose.call(this), this._writable(["oscillator", "frequency", "detune", "filter", "filterEnvelope", "envelope"]), this.oscillator.dispose(), this.oscillator = null, this.envelope.dispose(), this.envelope = null, this.filterEnvelope.dispose(), this.filterEnvelope = null, this.filter.dispose(), this.filter = null, this.frequency = null, this.detune = null, this
                    }, t.MonoSynth
                }), e(function(t) {
                    return t.DuoSynth = function(e) {
                        e = t.defaultArg(e, t.DuoSynth.defaults), t.Monophonic.call(this, e), this.voice0 = new t.MonoSynth(e.voice0), this.voice0.volume.value = -10, this.voice1 = new t.MonoSynth(e.voice1), this.voice1.volume.value = -10, this._vibrato = new t.LFO(e.vibratoRate, -50, 50), this._vibrato.start(), this.vibratoRate = this._vibrato.frequency, this._vibratoGain = new t.Gain(e.vibratoAmount, t.Type.Positive),
                            this.vibratoAmount = this._vibratoGain.gain, this.frequency = new t.Signal(440, t.Type.Frequency), this.harmonicity = new t.Multiply(e.harmonicity), this.harmonicity.units = t.Type.Positive, this.frequency.connect(this.voice0.frequency), this.frequency.chain(this.harmonicity, this.voice1.frequency), this._vibrato.connect(this._vibratoGain), this._vibratoGain.fan(this.voice0.detune, this.voice1.detune), this.voice0.connect(this.output), this.voice1.connect(this.output), this._readOnly(["voice0", "voice1", "frequency", "vibratoAmount", "vibratoRate"])
                    }, t.extend(t.DuoSynth, t.Monophonic), t.DuoSynth.defaults = {
                        vibratoAmount: .5,
                        vibratoRate: 5,
                        harmonicity: 1.5,
                        voice0: {
                            volume: -10,
                            portamento: 0,
                            oscillator: {
                                type: "sine"
                            },
                            filterEnvelope: {
                                attack: .01,
                                decay: 0,
                                sustain: 1,
                                release: .5
                            },
                            envelope: {
                                attack: .01,
                                decay: 0,
                                sustain: 1,
                                release: .5
                            }
                        },
                        voice1: {
                            volume: -10,
                            portamento: 0,
                            oscillator: {
                                type: "sine"
                            },
                            filterEnvelope: {
                                attack: .01,
                                decay: 0,
                                sustain: 1,
                                release: .5
                            },
                            envelope: {
                                attack: .01,
                                decay: 0,
                                sustain: 1,
                                release: .5
                            }
                        }
                    }, t.DuoSynth.prototype._triggerEnvelopeAttack = function(t, e) {
                        return t = this.toSeconds(t), this.voice0._triggerEnvelopeAttack(t, e), this.voice1._triggerEnvelopeAttack(t, e), this
                    }, t.DuoSynth.prototype._triggerEnvelopeRelease = function(t) {
                        return this.voice0._triggerEnvelopeRelease(t), this.voice1._triggerEnvelopeRelease(t), this
                    }, t.DuoSynth.prototype.getLevelAtTime = function(t) {
                        return (this.voice0.getLevelAtTime(t) + this.voice1.getLevelAtTime(t)) / 2
                    }, t.DuoSynth.prototype.dispose = function() {
                        return t.Monophonic.prototype.dispose.call(this), this._writable(["voice0", "voice1", "frequency", "vibratoAmount", "vibratoRate"]), this.voice0.dispose(), this.voice0 = null, this.voice1.dispose(), this.voice1 = null, this.frequency.dispose(), this.frequency = null, this._vibratoGain.dispose(), this._vibratoGain = null, this._vibrato = null, this.harmonicity.dispose(), this.harmonicity = null, this.vibratoAmount.dispose(), this.vibratoAmount = null, this.vibratoRate = null, this
                    }, t.DuoSynth
                }), e(function(t) {
                    return t.FMSynth = function(e) {
                        e = t.defaultArg(e, t.FMSynth.defaults), t.Monophonic.call(this, e), this._carrier = new t.Synth(e.carrier), this._carrier.volume.value = -10, this.oscillator = this._carrier.oscillator, this.envelope = this._carrier.envelope.set(e.envelope), this._modulator = new t.Synth(e.modulator), this._modulator.volume.value = -10, this.modulation = this._modulator.oscillator.set(e.modulation), this.modulationEnvelope = this._modulator.envelope.set(e.modulationEnvelope), this.frequency = new t.Signal(440, t.Type.Frequency), this.detune = new t.Signal(e.detune, t.Type.Cents), this.harmonicity = new t.Multiply(e.harmonicity), this.harmonicity.units = t.Type.Positive, this.modulationIndex = new t.Multiply(e.modulationIndex), this.modulationIndex.units = t.Type.Positive, this._modulationNode = new t.Gain(0), this.frequency.connect(this._carrier.frequency), this.frequency.chain(this.harmonicity, this._modulator.frequency), this.frequency.chain(this.modulationIndex, this._modulationNode), this.detune.fan(this._carrier.detune, this._modulator.detune), this._modulator.connect(this._modulationNode.gain), this._modulationNode.connect(this._carrier.frequency), this._carrier.connect(this.output), this._readOnly(["frequency", "harmonicity", "modulationIndex", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"])
                    }, t.extend(t.FMSynth, t.Monophonic), t.FMSynth.defaults = {
                        harmonicity: 3,
                        modulationIndex: 10,
                        detune: 0,
                        oscillator: {
                            type: "sine"
                        },
                        envelope: {
                            attack: .01,
                            decay: .01,
                            sustain: 1,
                            release: .5
                        },
                        modulation: {
                            type: "square"
                        },
                        modulationEnvelope: {
                            attack: .5,
                            decay: 0,
                            sustain: 1,
                            release: .5
                        }
                    }, t.FMSynth.prototype._triggerEnvelopeAttack = function(t, e) {
                        return t = this.toSeconds(t), this._carrier._triggerEnvelopeAttack(t, e), this._modulator._triggerEnvelopeAttack(t), this
                    }, t.FMSynth.prototype._triggerEnvelopeRelease = function(t) {
                        return t = this.toSeconds(t), this._carrier._triggerEnvelopeRelease(t), this._modulator._triggerEnvelopeRelease(t), this
                    }, t.FMSynth.prototype.dispose = function() {
                        return t.Monophonic.prototype.dispose.call(this), this._writable(["frequency", "harmonicity", "modulationIndex", "oscillator", "envelope", "modulation", "modulationEnvelope", "detune"]), this._carrier.dispose(), this._carrier = null, this._modulator.dispose(), this._modulator = null, this.frequency.dispose(), this.frequency = null, this.detune.dispose(), this.detune = null, this.modulationIndex.dispose(), this.modulationIndex = null, this.harmonicity.dispose(), this.harmonicity = null, this._modulationNode.dispose(), this._modulationNode = null, this.oscillator = null, this.envelope = null, this.modulationEnvelope = null, this.modulation = null, this
                    }, t.FMSynth
                }), e(function(t) {
                    return t.MembraneSynth = function(e) {
                        e = t.defaultArg(e, t.MembraneSynth.defaults), t.Instrument.call(this, e), this.oscillator = new t.OmniOscillator(e.oscillator), this.envelope = new t.AmplitudeEnvelope(e.envelope), this.octaves = e.octaves, this.pitchDecay = e.pitchDecay, this.oscillator.chain(this.envelope, this.output), this._readOnly(["oscillator", "envelope"])
                    }, t.extend(t.MembraneSynth, t.Instrument), t.MembraneSynth.defaults = {
                        pitchDecay: .05,
                        octaves: 10,
                        oscillator: {
                            type: "sine"
                        },
                        envelope: {
                            attack: .001,
                            decay: .4,
                            sustain: .01,
                            release: 1.4,
                            attackCurve: "exponential"
                        }
                    }, t.MembraneSynth.prototype.triggerAttack = function(t, e, i) {
                        e = this.toSeconds(e), t = this.toFrequency(t);
                        var n = t * this.octaves;
                        return this.oscillator.frequency.setValueAtTime(n, e), this.oscillator.frequency.exponentialRampToValueAtTime(t, e + this.toSeconds(this.pitchDecay)), this.envelope.triggerAttack(e, i), this.oscillator.start(e), this
                    }, t.MembraneSynth.prototype.triggerRelease = function(t) {
                        return t = this.toSeconds(t), this.envelope.triggerRelease(t), this.oscillator.stop(t + this.envelope.release), this
                    }, t.MembraneSynth.prototype.dispose = function() {
                        return t.Instrument.prototype.dispose.call(this), this._writable(["oscillator", "envelope"]), this.oscillator.dispose(), this.oscillator = null, this.envelope.dispose(), this.envelope = null, this
                    }, t.MembraneSynth
                }), e(function(t) {
                    var e = [1, 1.483, 1.932, 2.546, 2.63, 3.897];
                    return t.MetalSynth = function(i) {
                        i = t.defaultArg(i, t.MetalSynth.defaults), t.Instrument.call(this, i), this.frequency = new t.Signal(i.frequency, t.Type.Frequency), this._oscillators = [], this._freqMultipliers = [], this._amplitue = new t.Gain(0).connect(this.output), this._highpass = new t.Filter({
                            type: "highpass",
                            Q: -3.0102999566398125
                        }).connect(this._amplitue), this._octaves = i.octaves, this._filterFreqScaler = new t.Scale(i.resonance, 7e3), this.envelope = new t.Envelope({
                            attack: i.envelope.attack,
                            attackCurve: "linear",
                            decay: i.envelope.decay,
                            sustain: 0,
                            release: i.envelope.release
                        }).chain(this._filterFreqScaler, this._highpass.frequency), this.envelope.connect(this._amplitue.gain);
                        for (var n = 0; n < e.length; n++) {
                            var o = new t.FMOscillator({
                                type: "square",
                                modulationType: "square",
                                harmonicity: i.harmonicity,
                                modulationIndex: i.modulationIndex
                            });
                            o.connect(this._highpass), this._oscillators[n] = o;
                            var s = new t.Multiply(e[n]);
                            this._freqMultipliers[n] = s, this.frequency.chain(s, o.frequency)
                        }
                        this.octaves = i.octaves
                    }, t.extend(t.MetalSynth, t.Instrument), t.MetalSynth.defaults = {
                        frequency: 200,
                        envelope: {
                            attack: .001,
                            decay: 1.4,
                            release: .2
                        },
                        harmonicity: 5.1,
                        modulationIndex: 32,
                        resonance: 4e3,
                        octaves: 1.5
                    }, t.MetalSynth.prototype.triggerAttack = function(e, i) {
                        return e = this.toSeconds(e), i = t.defaultArg(i, 1), this.envelope.triggerAttack(e, i), this._oscillators.forEach(function(t) {
                            t.start(e)
                        }), 0 === this.envelope.sustain && this._oscillators.forEach(function(t) {
                            t.stop(e + this.envelope.attack + this.envelope.decay)
                        }.bind(this)), this
                    }, t.MetalSynth.prototype.triggerRelease = function(t) {
                        return t = this.toSeconds(t), this.envelope.triggerRelease(t), this._oscillators.forEach(function(e) {
                            e.stop(t + this.envelope.release)
                        }.bind(this)), this
                    }, t.MetalSynth.prototype.sync = function() {
                        return this._syncMethod("triggerAttack", 0), this._syncMethod("triggerRelease", 0), this
                    }, t.MetalSynth.prototype.triggerAttackRelease = function(t, e, i) {
                        return e = this.toSeconds(e), t = this.toSeconds(t), this.triggerAttack(e, i), this.triggerRelease(e + t), this
                    }, Object.defineProperty(t.MetalSynth.prototype, "modulationIndex", {
                        get: function() {
                            return this._oscillators[0].modulationIndex.value
                        },
                        set: function(t) {
                            for (var e = 0; e < this._oscillators.length; e++) this._oscillators[e].modulationIndex.value = t
                        }
                    }), Object.defineProperty(t.MetalSynth.prototype, "harmonicity", {
                        get: function() {
                            return this._oscillators[0].harmonicity.value
                        },
                        set: function(t) {
                            for (var e = 0; e < this._oscillators.length; e++) this._oscillators[e].harmonicity.value = t
                        }
                    }), Object.defineProperty(t.MetalSynth.prototype, "resonance", {
                        get: function() {
                            return this._filterFreqScaler.min
                        },
                        set: function(t) {
                            this._filterFreqScaler.min = t, this.octaves = this._octaves
                        }
                    }), Object.defineProperty(t.MetalSynth.prototype, "octaves", {
                        get: function() {
                            return this._octaves
                        },
                        set: function(t) {
                            this._octaves = t, this._filterFreqScaler.max = this._filterFreqScaler.min * Math.pow(2, t)
                        }
                    }), t.MetalSynth.prototype.dispose = function() {
                        t.Instrument.prototype.dispose.call(this);
                        for (var e = 0; e < this._oscillators.length; e++) this._oscillators[e].dispose(), this._freqMultipliers[e].dispose();
                        this._oscillators = null, this._freqMultipliers = null, this.frequency.dispose(), this.frequency = null, this._filterFreqScaler.dispose(), this._filterFreqScaler = null, this._amplitue.dispose(), this._amplitue = null, this.envelope.dispose(), this.envelope = null, this._highpass.dispose(), this._highpass = null
                    }, t.MetalSynth
                }), e(function(t) {
                    return t.NoiseSynth = function(e) {
                        e = t.defaultArg(e, t.NoiseSynth.defaults), t.Instrument.call(this, e), this.noise = new t.Noise, this.envelope = new t.AmplitudeEnvelope(e.envelope), this.noise.chain(this.envelope, this.output), this._readOnly(["noise", "envelope"])
                    }, t.extend(t.NoiseSynth, t.Instrument), t.NoiseSynth.defaults = {
                        noise: {
                            type: "white"
                        },
                        envelope: {
                            attack: .005,
                            decay: .1,
                            sustain: 0
                        }
                    }, t.NoiseSynth.prototype.triggerAttack = function(t, e) {
                        return this.envelope.triggerAttack(t, e), this.noise.start(t), 0 === this.envelope.sustain && this.noise.stop(t = this.envelope.attack + this.envelope.decay), this
                    }, t.NoiseSynth.prototype.triggerRelease = function(t) {
                        return this.envelope.triggerRelease(t), this.noise.stop(t + this.envelope.release), this
                    }, t.NoiseSynth.prototype.sync = function() {
                        return this._syncMethod("triggerAttack", 0), this._syncMethod("triggerRelease", 0), this
                    }, t.NoiseSynth.prototype.triggerAttackRelease = function(t, e, i) {
                        return e = this.toSeconds(e), t = this.toSeconds(t), this.triggerAttack(e, i), this.triggerRelease(e + t), this
                    }, t.NoiseSynth.prototype.dispose = function() {
                        return t.Instrument.prototype.dispose.call(this), this._writable(["noise", "envelope"]), this.noise.dispose(), this.noise = null, this.envelope.dispose(), this.envelope = null, this
                    }, t.NoiseSynth
                }), e(function(t) {
                    return t.PluckSynth = function(e) {
                        e = t.defaultArg(e, t.PluckSynth.defaults), t.Instrument.call(this, e), this._noise = new t.Noise("pink"), this.attackNoise = e.attackNoise, this._lfcf = new t.LowpassCombFilter({
                            resonance: e.resonance,
                            dampening: e.dampening
                        }), this.resonance = this._lfcf.resonance, this.dampening = this._lfcf.dampening, this._noise.connect(this._lfcf), this._lfcf.connect(this.output), this._readOnly(["resonance", "dampening"])
                    }, t.extend(t.PluckSynth, t.Instrument), t.PluckSynth.defaults = {
                        attackNoise: 1,
                        dampening: 4e3,
                        resonance: .7
                    }, t.PluckSynth.prototype.triggerAttack = function(t, e) {
                        t = this.toFrequency(t), e = this.toSeconds(e);
                        var i = 1 / t;
                        return this._lfcf.delayTime.setValueAtTime(i, e), this._noise.start(e), this._noise.stop(e + i * this.attackNoise), this
                    }, t.PluckSynth.prototype.dispose = function() {
                        return t.Instrument.prototype.dispose.call(this), this._noise.dispose(), this._lfcf.dispose(), this._noise = null, this._lfcf = null, this._writable(["resonance", "dampening"]), this.dampening = null, this.resonance = null, this
                    }, t.PluckSynth
                }), e(function(t) {
                    return t.PolySynth = function() {
                        var e = t.defaults(arguments, ["polyphony", "voice"], t.PolySynth);
                        t.Instrument.call(this, e), e = t.defaultArg(e, t.Instrument.defaults), e.polyphony = Math.min(t.PolySynth.MAX_POLYPHONY, e.polyphony), this.voices = new Array(e.polyphony), this._triggers = new Array(e.polyphony), this.detune = new t.Signal(e.detune, t.Type.Cents), this._readOnly("detune");
                        for (var i = 0; i < e.polyphony; i++) {
                            var n = new e.voice(arguments[2], arguments[3]);
                            if (!(n instanceof t.Monophonic)) throw new Error("Synth constructor must be instance of Tone.Monophonic");
                            this.voices[i] = n, n.connect(this.output), n.hasOwnProperty("detune") && this.detune.connect(n.detune), this._triggers[i] = {
                                release: -1,
                                note: null,
                                voice: n
                            }
                        }
                    }, t.extend(t.PolySynth, t.Instrument), t.PolySynth.defaults = {
                        polyphony: 4,
                        volume: 0,
                        detune: 0,
                        voice: t.Synth
                    }, t.PolySynth.prototype.triggerAttack = function(t, e, i) {
                        Array.isArray(t) || (t = [t]), e = this.toSeconds(e);
                        for (var n = 0; n < t.length; n++) {
                            for (var o = t[n], s = this._triggers[0], r = 1; r < this._triggers.length; r++) this._triggers[r].release < s.release && (s = this._triggers[r]);
                            s.release = 1 / 0, s.note = JSON.stringify(o), s.voice.triggerAttack(o, e, i)
                        }
                        return this
                    }, t.PolySynth.prototype.triggerAttackRelease = function(e, i, n, o) {
                        if (n = this.toSeconds(n), this.triggerAttack(e, n, o), t.isArray(i) && t.isArray(e))
                            for (var s = 0; s < e.length; s++) {
                                var r = i[Math.min(s, i.length - 1)];
                                this.triggerRelease(e[s], n + this.toSeconds(r))
                            } else this.triggerRelease(e, n + this.toSeconds(i));
                        return this
                    }, t.PolySynth.prototype.triggerRelease = function(t, e) {
                        Array.isArray(t) || (t = [t]), e = this.toSeconds(e);
                        for (var i = 0; i < t.length; i++)
                            for (var n = JSON.stringify(t[i]), o = 0; o < this._triggers.length; o++) {
                                var s = this._triggers[o];
                                s.note === n && s.release > e && (s.voice.triggerRelease(e), s.release = e)
                            }
                        return this
                    }, t.PolySynth.prototype.sync = function() {
                        return this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1), this
                    }, t.PolySynth.prototype.set = function(t, e, i) {
                        for (var n = 0; n < this.voices.length; n++) this.voices[n].set(t, e, i);
                        return this
                    }, t.PolySynth.prototype.get = function(t) {
                        return this.voices[0].get(t)
                    }, t.PolySynth.prototype.releaseAll = function(t) {
                        t = this.toSeconds(t);
                        for (var e = 0; e < this._triggers.length; e++) {
                            var i = this._triggers[e];
                            i.release > t && (i.release = t, i.voice.triggerRelease(t))
                        }
                        return this
                    }, t.PolySynth.prototype.dispose = function() {
                        t.Instrument.prototype.dispose.call(this);
                        for (var e = 0; e < this.voices.length; e++) this.voices[e].dispose(), this.voices[e] = null;
                        return this._writable("detune"), this.detune.dispose(), this.detune = null, this.voices = null, this._triggers = null, this
                    }, t.PolySynth.MAX_POLYPHONY = 20, t.PolySynth
                }), e(function(t) {
                    return t.Sampler = function(e) {
                        var i = Array.prototype.slice.call(arguments);
                        i.shift();
                        var n = t.defaults(i, ["onload", "baseUrl"], t.Sampler);
                        t.Instrument.call(this, n);
                        var o = {};
                        for (var s in e)
                            if (t.isNote(s)) {
                                var r = t.Frequency(s).toMidi();
                                o[r] = e[s]
                            } else {
                                if (isNaN(parseFloat(s))) throw new Error("Tone.Sampler: url keys must be the note's pitch");
                                o[s] = e[s]
                            } this._buffers = new t.Buffers(o, n.onload, n.baseUrl), this._activeSources = {}, this.attack = n.attack, this.release = n.release
                    }, t.extend(t.Sampler, t.Instrument), t.Sampler.defaults = {
                        attack: 0,
                        release: .1,
                        onload: t.noOp,
                        baseUrl: ""
                    }, t.Sampler.prototype._findClosest = function(t) {
                        for (var e = 96, i = 0; e > i;) {
                            if (this._buffers.has(t + i)) return -i;
                            if (this._buffers.has(t - i)) return i;
                            i++
                        }
                        return null
                    }, t.Sampler.prototype.triggerAttack = function(e, i, n) {
                        var o = t.Frequency(e).toMidi(),
                            s = this._findClosest(o);
                        if (null !== s) {
                            var r = o - s,
                                a = this._buffers.get(r),
                                l = new t.BufferSource({
                                    buffer: a,
                                    playbackRate: t.intervalToFrequencyRatio(s),
                                    fadeIn: this.attack,
                                    fadeOut: this.release,
                                    curve: "exponential"
                                }).connect(this.output);
                            l.start(i, 0, a.duration, n), t.isArray(this._activeSources[o]) || (this._activeSources[o] = []), this._activeSources[o].push({
                                note: o,
                                source: l
                            })
                        }
                        return this
                    }, t.Sampler.prototype.triggerRelease = function(e, i) {
                        var n = t.Frequency(e).toMidi();
                        if (this._activeSources[n] && this._activeSources[n].length) {
                            var o = this._activeSources[n].shift().source;
                            i = this.toSeconds(i), o.stop(i + this.release, this.release)
                        }
                        return this
                    }, t.Sampler.prototype.releaseAll = function(t) {
                        t = this.toSeconds(t);
                        for (var e in this._activeSources)
                            for (var i = this._activeSources[e]; i.length;) {
                                var n = i.shift().source;
                                n.stop(t + this.release, this.release)
                            }
                        return this
                    }, t.Sampler.prototype.sync = function() {
                        return this._syncMethod("triggerAttack", 1), this._syncMethod("triggerRelease", 1), this
                    }, t.Sampler.prototype.triggerAttackRelease = function(t, e, i, n) {
                        return i = this.toSeconds(i), e = this.toSeconds(e), this.triggerAttack(t, i, n), this.triggerRelease(t, i + e), this
                    }, t.Sampler.prototype.add = function(e, i, n) {
                        if (t.isNote(e)) {
                            var o = t.Frequency(e).toMidi();
                            this._buffers.add(o, i, n)
                        } else {
                            if (isNaN(parseFloat(e))) throw new Error("Tone.Sampler: note must be the note's pitch. Instead got " + e);
                            this._buffers.add(e, i, n)
                        }
                    }, Object.defineProperty(t.Sampler.prototype, "loaded", {
                        get: function() {
                            return this._buffers.loaded
                        }
                    }), t.Sampler.prototype.dispose = function() {
                        t.Instrument.prototype.dispose.call(this), this._buffers.dispose(), this._buffers = null;
                        for (var e in this._activeSources) this._activeSources[e].forEach(function(t) {
                            t.source.dispose()
                        });
                        return this._activeSources = null, this
                    }, t.Sampler
                }), e(function(t) {
                    t.supported && (OscillatorNode.prototype.setPeriodicWave || (OscillatorNode.prototype.setPeriodicWave = OscillatorNode.prototype.setWaveTable), AudioContext.prototype.createPeriodicWave || (AudioContext.prototype.createPeriodicWave = AudioContext.prototype.createWaveTable))
                }), e(function(t) {
                    return t.GainToAudio = function() {
                        t.SignalBase.call(this), this._norm = this.input = this.output = new t.WaveShaper(function(t) {
                            return 2 * Math.abs(t) - 1
                        })
                    }, t.extend(t.GainToAudio, t.SignalBase), t.GainToAudio.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._norm.dispose(), this._norm = null, this
                    }, t.GainToAudio
                }), e(function(t) {
                    return t.Normalize = function(e, i) {
                        t.SignalBase.call(this), this._inputMin = t.defaultArg(e, 0), this._inputMax = t.defaultArg(i, 1), this._sub = this.input = new t.Add(0), this._div = this.output = new t.Multiply(1), this._sub.connect(this._div), this._setRange()
                    }, t.extend(t.Normalize, t.SignalBase), Object.defineProperty(t.Normalize.prototype, "min", {
                        get: function() {
                            return this._inputMin
                        },
                        set: function(t) {
                            this._inputMin = t, this._setRange()
                        }
                    }), Object.defineProperty(t.Normalize.prototype, "max", {
                        get: function() {
                            return this._inputMax
                        },
                        set: function(t) {
                            this._inputMax = t, this._setRange()
                        }
                    }), t.Normalize.prototype._setRange = function() {
                        this._sub.value = -this._inputMin, this._div.value = 1 / (this._inputMax - this._inputMin)
                    }, t.Normalize.prototype.dispose = function() {
                        return t.SignalBase.prototype.dispose.call(this), this._sub.dispose(), this._sub = null, this._div.dispose(), this._div = null, this
                    }, t.Normalize
                }), e(function(t) {
                    return t.TransportTimelineSignal = function() {
                        t.Signal.apply(this, arguments), this.output = this._outputSig = new t.Signal(this._initialValue), this._lastVal = this.value, this._synced = t.Transport.scheduleRepeat(this._onTick.bind(this), "1i"), this._bindAnchorValue = this._anchorValue.bind(this), t.Transport.on("start stop pause", this._bindAnchorValue), this._events.memory = 1 / 0
                    }, t.extend(t.TransportTimelineSignal, t.Signal), t.TransportTimelineSignal.prototype._onTick = function(e) {
                        var i = this.getValueAtTime(t.Transport.seconds);
                        this._lastVal !== i && (this._lastVal = i, this._outputSig.linearRampToValueAtTime(i, e))
                    }, t.TransportTimelineSignal.prototype._anchorValue = function(e) {
                        var i = this.getValueAtTime(t.Transport.seconds);
                        return this._lastVal = i, this._outputSig.cancelScheduledValues(e), this._outputSig.setValueAtTime(i, e), this
                    }, t.TransportTimelineSignal.prototype.getValueAtTime = function(e) {
                        return e = t.TransportTime(e), t.Signal.prototype.getValueAtTime.call(this, e)
                    }, t.TransportTimelineSignal.prototype.setValueAtTime = function(e, i) {
                        return i = t.TransportTime(i), t.Signal.prototype.setValueAtTime.call(this, e, i), this
                    }, t.TransportTimelineSignal.prototype.linearRampToValueAtTime = function(e, i) {
                        return i = t.TransportTime(i), t.Signal.prototype.linearRampToValueAtTime.call(this, e, i), this
                    }, t.TransportTimelineSignal.prototype.exponentialRampToValueAtTime = function(e, i) {
                        return i = t.TransportTime(i), t.Signal.prototype.exponentialRampToValueAtTime.call(this, e, i), this
                    }, t.TransportTimelineSignal.prototype.setTargetAtTime = function(e, i, n) {
                        return i = t.TransportTime(i), t.Signal.prototype.setTargetAtTime.call(this, e, i, n), this
                    }, t.TransportTimelineSignal.prototype.cancelScheduledValues = function(e) {
                        return e = t.TransportTime(e), t.Signal.prototype.cancelScheduledValues.call(this, e), this
                    }, t.TransportTimelineSignal.prototype.setValueCurveAtTime = function(e, i, n, o) {
                        return i = t.TransportTime(i), n = t.TransportTime(n), t.Signal.prototype.setValueCurveAtTime.call(this, e, i, n, o), this
                    }, t.TransportTimelineSignal.prototype.cancelAndHoldAtTime = function(e) {
                        return t.Signal.prototype.cancelAndHoldAtTime.call(this, t.TransportTime(e))
                    }, t.TransportTimelineSignal.prototype.dispose = function() {
                        t.Transport.clear(this._synced), t.Transport.off("start stop pause", this._syncedCallback), this._events.cancel(0), t.Signal.prototype.dispose.call(this), this._outputSig.dispose(), this._outputSig = null
                    }, t.TransportTimelineSignal
                }), e(function(t) {
                    return t.GrainPlayer = function() {
                        var e = t.defaults(arguments, ["url", "onload"], t.GrainPlayer);
                        t.Source.call(this, e), this.buffer = new t.Buffer(e.url, e.onload), this._clock = new t.Clock(this._tick.bind(this), e.grainSize), this._loopStart = 0, this._loopEnd = 0, this._activeSources = [], this._playbackRate = e.playbackRate, this._grainSize = e.grainSize, this._overlap = e.overlap, this.detune = e.detune, this.overlap = e.overlap, this.loop = e.loop, this.playbackRate = e.playbackRate, this.grainSize = e.grainSize, this.loopStart = e.loopStart, this.loopEnd = e.loopEnd, this.reverse = e.reverse, this._clock.on("stop", this._onstop.bind(this))
                    }, t.extend(t.GrainPlayer, t.Source), t.GrainPlayer.defaults = {
                        onload: t.noOp,
                        overlap: .1,
                        grainSize: .2,
                        playbackRate: 1,
                        detune: 0,
                        loop: !1,
                        loopStart: 0,
                        loopEnd: 0,
                        reverse: !1
                    }, t.GrainPlayer.prototype._start = function(e, i, n) {
                        i = t.defaultArg(i, 0), i = this.toSeconds(i), e = this.toSeconds(e), this._offset = i, this._clock.start(e), n && this.stop(e + this.toSeconds(n))
                    }, t.GrainPlayer.prototype._stop = function(t) {
                        this._clock.stop(t)
                    }, t.GrainPlayer.prototype._onstop = function(t) {
                        this._activeSources.forEach(function(e) {
                            e.stop(t, 0)
                        })
                    }, t.GrainPlayer.prototype._tick = function(e) {
                        var i = this._offset < this._overlap ? 0 : this._overlap,
                            n = new t.BufferSource({
                                buffer: this.buffer,
                                fadeIn: i,
                                fadeOut: this._overlap,
                                loop: this.loop,
                                loopStart: this._loopStart,
                                loopEnd: this._loopEnd,
                                playbackRate: t.intervalToFrequencyRatio(this.detune / 100)
                            }).connect(this.output);
                        n.start(e, this._offset), this._offset += this.grainSize, n.stop(e + this.grainSize), this._activeSources.push(n), n.onended = function() {
                            var t = this._activeSources.indexOf(n); - 1 !== t && this._activeSources.splice(t, 1)
                        }.bind(this)
                    }, t.GrainPlayer.prototype.seek = function(t, e) {
                        return this._offset = this.toSeconds(t), this._tick(this.toSeconds(e)), this
                    }, Object.defineProperty(t.GrainPlayer.prototype, "playbackRate", {
                        get: function() {
                            return this._playbackRate
                        },
                        set: function(t) {
                            this._playbackRate = t, this.grainSize = this._grainSize
                        }
                    }), Object.defineProperty(t.GrainPlayer.prototype, "loopStart", {
                        get: function() {
                            return this._loopStart
                        },
                        set: function(t) {
                            this._loopStart = this.toSeconds(t)
                        }
                    }), Object.defineProperty(t.GrainPlayer.prototype, "loopEnd", {
                        get: function() {
                            return this._loopEnd
                        },
                        set: function(t) {
                            this._loopEnd = this.toSeconds(t)
                        }
                    }), Object.defineProperty(t.GrainPlayer.prototype, "reverse", {
                        get: function() {
                            return this.buffer.reverse
                        },
                        set: function(t) {
                            this.buffer.reverse = t
                        }
                    }), Object.defineProperty(t.GrainPlayer.prototype, "grainSize", {
                        get: function() {
                            return this._grainSize
                        },
                        set: function(t) {
                            this._grainSize = this.toSeconds(t), this._clock.frequency.value = this._playbackRate / this._grainSize
                        }
                    }), Object.defineProperty(t.GrainPlayer.prototype, "overlap", {
                        get: function() {
                            return this._overlap
                        },
                        set: function(t) {
                            this._overlap = this.toSeconds(t)
                        }
                    }), t.GrainPlayer.prototype.dispose = function() {
                        return t.Source.prototype.dispose.call(this), this.buffer.dispose(), this.buffer = null, this._clock.dispose(), this._clock = null, this._activeSources.forEach(function(t) {
                            t.dispose()
                        }), this._activeSources = null, this
                    }, t.GrainPlayer
                }), e(function(t) {
                    return t.Player = function(e) {
                        var i;
                        e instanceof t.Buffer && e.loaded ? (e = e.get(), i = t.Player.defaults) : i = t.defaults(arguments, ["url", "onload"], t.Player), t.Source.call(this, i), this.autostart = i.autostart, this._buffer = new t.Buffer({
                            url: i.url,
                            onload: this._onload.bind(this, i.onload),
                            reverse: i.reverse
                        }), e instanceof AudioBuffer && this._buffer.set(e), this._loop = i.loop, this._loopStart = i.loopStart, this._loopEnd = i.loopEnd, this._playbackRate = i.playbackRate, this._activeSources = [], this._elapsedTime = new t.TickSource(i.playbackRate), this.fadeIn = i.fadeIn, this.fadeOut = i.fadeOut
                    }, t.extend(t.Player, t.Source), t.Player.defaults = {
                        onload: t.noOp,
                        playbackRate: 1,
                        loop: !1,
                        autostart: !1,
                        loopStart: 0,
                        loopEnd: 0,
                        retrigger: !1,
                        reverse: !1,
                        fadeIn: 0,
                        fadeOut: 0
                    }, t.Player.prototype.load = function(t, e) {
                        return this._buffer.load(t, this._onload.bind(this, e))
                    }, t.Player.prototype._onload = function(e) {
                        e = t.defaultArg(e, t.noOp), e(this), this.autostart && this.start()
                    }, t.Player.prototype._onSourceEnd = function(t) {
                        var e = this._activeSources.indexOf(t);
                        this._activeSources.splice(e, 1)
                    }, t.Player.prototype._start = function(e, i, n) {
                        i = this._loop ? t.defaultArg(i, this._loopStart) : t.defaultArg(i, 0), i = this.toSeconds(i);
                        var o = t.defaultArg(n, Math.max(this._buffer.duration - i, 0));
                        o = this.toSeconds(o), e = this.toSeconds(e), this._elapsedTime.start(e, i);
                        var s = new t.BufferSource({
                            buffer: this._buffer,
                            loop: this._loop,
                            loopStart: this._loopStart,
                            loopEnd: this._loopEnd,
                            onended: this._onSourceEnd.bind(this),
                            playbackRate: this._playbackRate,
                            fadeIn: this.fadeIn,
                            fadeOut: this.fadeOut
                        }).connect(this.output);
                        return this._loop || this._synced || this._state.setStateAtTime(t.State.Stopped, e + o / this._playbackRate), this._activeSources.push(s), this._loop && t.isUndef(n) ? s.start(e, i) : s.start(e, i, o), this
                    }, t.Player.prototype._stop = function(t) {
                        return t = this.toSeconds(t), this._elapsedTime.stop(t), this._activeSources.forEach(function(e) {
                            e.stop(t)
                        }), this
                    }, t.Player.prototype.restart = function(t, e, i) {
                        return this._stop(t), this._start(t, e, i), this
                    }, t.Player.prototype.seek = function(e, i) {
                        return i = this.toSeconds(i), this._state.getValueAtTime(i) === t.State.Started && (e = this.toSeconds(e), this._stop(i), this._start(i, e)), this
                    }, t.Player.prototype.setLoopPoints = function(t, e) {
                        return this.loopStart = t, this.loopEnd = e, this
                    }, Object.defineProperty(t.Player.prototype, "loopStart", {
                        get: function() {
                            return this._loopStart
                        },
                        set: function(t) {
                            this._loopStart = t, this._activeSources.forEach(function(e) {
                                e.loopStart = t
                            })
                        }
                    }), Object.defineProperty(t.Player.prototype, "loopEnd", {
                        get: function() {
                            return this._loopEnd
                        },
                        set: function(t) {
                            this._loopEnd = t, this._activeSources.forEach(function(e) {
                                e.loopEnd = t
                            })
                        }
                    }), Object.defineProperty(t.Player.prototype, "buffer", {
                        get: function() {
                            return this._buffer
                        },
                        set: function(t) {
                            this._buffer.set(t)
                        }
                    }), Object.defineProperty(t.Player.prototype, "loop", {
                        get: function() {
                            return this._loop
                        },
                        set: function(e) {
                            if (this._loop !== e) {
                                this._loop = e;
                                var i = this.now();
                                if (e) {
                                    var n = this._state.getNextState(t.State.Stopped, i);
                                    n && (this._activeSources.forEach(function(t) {
                                        t.loop = e
                                    }), this._state.cancel(n.time), this._elapsedTime.cancel(n.time))
                                } else this._stopAtNextIteration(i)
                            }
                        }
                    }), t.Player.prototype._stopAtNextIteration = function(e) {
                        if (this._state.getValueAtTime(e) === t.State.Started) {
                            var i = this._state.getNextState(t.State.Stopped, e),
                                n = this._elapsedTime.getTicksAtTime(e),
                                o = Math.max(Math.ceil(n / this.buffer.duration), 1),
                                s = this._elapsedTime.getTimeOfTick(o * this.buffer.duration, i ? i.time - this.sampleTime : 1 / 0);
                            this.stop(s)
                        }
                    }, Object.defineProperty(t.Player.prototype, "playbackRate", {
                        get: function() {
                            return this._playbackRate
                        },
                        set: function(t) {
                            this._playbackRate = t;
                            var e = this.now();
                            this._elapsedTime.frequency.setValueAtTime(t, e), this._loop || this._stopAtNextIteration(e), this._activeSources.forEach(function(i) {
                                i.playbackRate.setValueAtTime(t, e)
                            })
                        }
                    }), Object.defineProperty(t.Player.prototype, "position", {
                        get: function() {
                            var e = this.now();
                            if (this._state.getValueAtTime(e) === t.State.Started && this.loaded) {
                                var i = this.buffer.duration,
                                    n = this._elapsedTime.getTicksAtTime(e);
                                return n % i
                            }
                            return 0
                        }
                    }), Object.defineProperty(t.Player.prototype, "reverse", {
                        get: function() {
                            return this._buffer.reverse
                        },
                        set: function(t) {
                            this._buffer.reverse = t
                        }
                    }), Object.defineProperty(t.Player.prototype, "loaded", {
                        get: function() {
                            return this._buffer.loaded
                        }
                    }), t.Player.prototype.dispose = function() {
                        return this._activeSources.forEach(function(t) {
                            t.dispose()
                        }), this._activeSources = null, t.Source.prototype.dispose.call(this), this._buffer.dispose(), this._buffer = null, this._elapsedTime.dispose(), this._elapsedTime = null, this
                    }, t.Player
                }), e(function(t) {
                    return t.Players = function(e) {
                        var i = Array.prototype.slice.call(arguments);
                        i.shift();
                        var n = t.defaults(i, ["onload"], t.Players);
                        t.call(this), this._volume = this.output = new t.Volume(n.volume), this.volume = this._volume.volume, this._readOnly("volume"), this._volume.output.output.channelCount = 2, this._volume.output.output.channelCountMode = "explicit", this.mute = n.mute, this._players = {}, this._loadingCount = 0, this._fadeIn = n.fadeIn, this._fadeOut = n.fadeOut;
                        for (var o in e) this._loadingCount++, this.add(o, e[o], this._bufferLoaded.bind(this, n.onload))
                    }, t.extend(t.Players, t.AudioNode), t.Players.defaults = {
                        volume: 0,
                        mute: !1,
                        onload: t.noOp,
                        fadeIn: 0,
                        fadeOut: 0
                    }, t.Players.prototype._bufferLoaded = function(t) {
                        this._loadingCount--, 0 === this._loadingCount && t && t(this)
                    }, Object.defineProperty(t.Players.prototype, "mute", {
                        get: function() {
                            return this._volume.mute
                        },
                        set: function(t) {
                            this._volume.mute = t
                        }
                    }), Object.defineProperty(t.Players.prototype, "fadeIn", {
                        get: function() {
                            return this._fadeIn
                        },
                        set: function(t) {
                            this._fadeIn = t, this._forEach(function(e) {
                                e.fadeIn = t
                            })
                        }
                    }), Object.defineProperty(t.Players.prototype, "fadeOut", {
                        get: function() {
                            return this._fadeOut
                        },
                        set: function(t) {
                            this._fadeOut = t, this._forEach(function(e) {
                                e.fadeOut = t
                            })
                        }
                    }), Object.defineProperty(t.Players.prototype, "state", {
                        get: function() {
                            var e = !1;
                            return this._forEach(function(i) {
                                e = e || i.state === t.State.Started
                            }), e ? t.State.Started : t.State.Stopped
                        }
                    }), t.Players.prototype.has = function(t) {
                        return this._players.hasOwnProperty(t)
                    }, t.Players.prototype.get = function(t) {
                        if (this.has(t)) return this._players[t];
                        throw new Error("Tone.Players: no player named " + t)
                    }, t.Players.prototype._forEach = function(t) {
                        for (var e in this._players) t(this._players[e], e);
                        return this
                    }, Object.defineProperty(t.Players.prototype, "loaded", {
                        get: function() {
                            var t = !0;
                            return this._forEach(function(e) {
                                t = t && e.loaded
                            }), t
                        }
                    }), t.Players.prototype.add = function(e, i, n) {
                        return this._players[e] = new t.Player(i, n).connect(this.output), this._players[e].fadeIn = this._fadeIn, this._players[e].fadeOut = this._fadeOut, this
                    }, t.Players.prototype.stopAll = function(t) {
                        this._forEach(function(e) {
                            e.stop(t)
                        })
                    }, t.Players.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this._volume.dispose(), this._volume = null, this._writable("volume"), this.volume = null, this.output = null, this._forEach(function(t) {
                            t.dispose()
                        }), this._players = null, this
                    }, t.Players
                }), e(function(t) {
                    return t.UserMedia = function() {
                        var e = t.defaults(arguments, ["volume"], t.UserMedia);
                        t.AudioNode.call(this), this._mediaStream = null, this._stream = null, this._device = null, this._volume = this.output = new t.Volume(e.volume), this.volume = this._volume.volume, this._readOnly("volume"), this.mute = e.mute
                    }, t.extend(t.UserMedia, t.AudioNode), t.UserMedia.defaults = {
                        volume: 0,
                        mute: !1
                    }, t.UserMedia.prototype.open = function(e) {
                        return t.UserMedia.enumerateDevices().then(function(i) {
                            var n;
                            if (t.isNumber(e)) n = i[e];
                            else if (n = i.find(function(t) {
                                return t.label === e || t.deviceId === e
                            }), !n && i.length > 0) n = i[0];
                            else if (!n && t.isDefined(e)) throw new Error("Tone.UserMedia: no matching device: " + e);
                            this._device = n;
                            var o = {
                                audio: {
                                    echoCancellation: !1,
                                    sampleRate: this.context.sampleRate
                                }
                            };
                            return n && (o.audio.deviceId = n.deviceId), navigator.mediaDevices.getUserMedia(o).then(function(t) {
                                return this._stream || (this._stream = t, this._mediaStream = this.context.createMediaStreamSource(t), this._mediaStream.connect(this.output)), this
                            }.bind(this))
                        }.bind(this))
                    }, t.UserMedia.prototype.close = function() {
                        return this._stream && (this._stream.getAudioTracks().forEach(function(t) {
                            t.stop()
                        }), this._stream = null, this._mediaStream.disconnect(), this._mediaStream = null), this._device = null, this
                    }, t.UserMedia.enumerateDevices = function() {
                        return navigator.mediaDevices.enumerateDevices().then(function(t) {
                            return t.filter(function(t) {
                                return "audioinput" === t.kind
                            })
                        })
                    }, Object.defineProperty(t.UserMedia.prototype, "state", {
                        get: function() {
                            return this._stream && this._stream.active ? t.State.Started : t.State.Stopped
                        }
                    }), Object.defineProperty(t.UserMedia.prototype, "deviceId", {
                        get: function() {
                            return this._device ? this._device.deviceId : void 0
                        }
                    }), Object.defineProperty(t.UserMedia.prototype, "groupId", {
                        get: function() {
                            return this._device ? this._device.groupId : void 0;
                        }
                    }), Object.defineProperty(t.UserMedia.prototype, "label", {
                        get: function() {
                            return this._device ? this._device.label : void 0
                        }
                    }), Object.defineProperty(t.UserMedia.prototype, "mute", {
                        get: function() {
                            return this._volume.mute
                        },
                        set: function(t) {
                            this._volume.mute = t
                        }
                    }), t.UserMedia.prototype.dispose = function() {
                        return t.AudioNode.prototype.dispose.call(this), this.close(), this._writable("volume"), this._volume.dispose(), this._volume = null, this.volume = null, this
                    }, Object.defineProperty(t.UserMedia, "supported", {
                        get: function() {
                            return t.isDefined(navigator.mediaDevices) && t.isFunction(navigator.mediaDevices.getUserMedia)
                        }
                    }), t.UserMedia
                }), e(function(t) {
                    return t.Midi = function(e, i) {
                        return this instanceof t.Midi ? void t.Frequency.call(this, e, i) : new t.Midi(e, i)
                    }, t.extend(t.Midi, t.Frequency), t.Midi.prototype._defaultUnits = "midi", t.Midi.prototype._frequencyToUnits = function(e) {
                        return t.Frequency.ftom(t.Frequency.prototype._frequencyToUnits.call(this, e))
                    }, t.Midi.prototype._ticksToUnits = function(e) {
                        return t.Frequency.ftom(t.Frequency.prototype._ticksToUnits.call(this, e))
                    }, t.Midi.prototype._beatsToUnits = function(e) {
                        return t.Frequency.ftom(t.Frequency.prototype._beatsToUnits.call(this, e))
                    }, t.Midi.prototype._secondsToUnits = function(e) {
                        return t.Frequency.ftom(t.Frequency.prototype._secondsToUnits.call(this, e))
                    }, t.Midi.prototype.toMidi = function() {
                        return this.valueOf()
                    }, t.Midi.prototype.toFrequency = function() {
                        return t.Frequency.mtof(this.toMidi())
                    }, t.Midi.prototype.transpose = function(t) {
                        return new this.constructor(this.toMidi() + t)
                    }, t.Midi
                }), i
            })
        }, {}]
    }, {}, [1])(1)
});