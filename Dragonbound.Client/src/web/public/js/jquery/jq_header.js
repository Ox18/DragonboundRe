(function() {
    !function(e, t) {
        "use strict";
        "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
            if (!e.document)
                throw new Error("jQuery requires a window with a document");
            return t(e)
        }
        : t(e)
    }("undefined" != typeof window ? window : this, function(C, e) {
        "use strict";
        var t = []
          , r = Object.getPrototypeOf
          , s = t.slice
          , g = t.flat ? function(e) {
            return t.flat.call(e)
        }
        : function(e) {
            return t.concat.apply([], e)
        }
          , u = t.push
          , i = t.indexOf
          , n = {}
          , o = n.toString
          , v = n.hasOwnProperty
          , a = v.toString
          , l = a.call(Object)
          , y = {}
          , m = function(e) {
            return "function" == typeof e && "number" != typeof e.nodeType
        }
          , x = function(e) {
            return null != e && e === e.window
        }
          , E = C.document
          , c = {
            type: !0,
            src: !0,
            nonce: !0,
            noModule: !0
        };
        function b(e, t, n) {
            var r, i, o = (n = n || E).createElement("script");
            if (o.text = e,
            t)
                for (r in c)
                    (i = t[r] || t.getAttribute && t.getAttribute(r)) && o.setAttribute(r, i);
            n.head.appendChild(o).parentNode.removeChild(o)
        }
        function w(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
        }
        var f = "3.5.0"
          , S = function(e, t) {
            return new S.fn.init(e,t)
        };
        function p(e) {
            var t = !!e && "length"in e && e.length
              , n = w(e);
            return !m(e) && !x(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
        }
        S.fn = S.prototype = {
            jquery: f,
            constructor: S,
            length: 0,
            toArray: function() {
                return s.call(this)
            },
            get: function(e) {
                return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
            },
            pushStack: function(e) {
                var t = S.merge(this.constructor(), e);
                return t.prevObject = this,
                t
            },
            each: function(e) {
                return S.each(this, e)
            },
            map: function(n) {
                return this.pushStack(S.map(this, function(e, t) {
                    return n.call(e, t, e)
                }))
            },
            slice: function() {
                return this.pushStack(s.apply(this, arguments))
            },
            first: function() {
                return this.eq(0)
            },
            last: function() {
                return this.eq(-1)
            },
            even: function() {
                return this.pushStack(S.grep(this, function(e, t) {
                    return (t + 1) % 2
                }))
            },
            odd: function() {
                return this.pushStack(S.grep(this, function(e, t) {
                    return t % 2
                }))
            },
            eq: function(e) {
                var t = this.length
                  , n = +e + (e < 0 ? t : 0);
                return this.pushStack(0 <= n && n < t ? [this[n]] : [])
            },
            end: function() {
                return this.prevObject || this.constructor()
            },
            push: u,
            sort: t.sort,
            splice: t.splice
        },
        S.extend = S.fn.extend = function() {
            var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, u = arguments.length, l = !1;
            for ("boolean" == typeof a && (l = a,
            a = arguments[s] || {},
            s++),
            "object" == typeof a || m(a) || (a = {}),
            s === u && (a = this,
            s--); s < u; s++)
                if (null != (e = arguments[s]))
                    for (t in e)
                        r = e[t],
                        "__proto__" !== t && a !== r && (l && r && (S.isPlainObject(r) || (i = Array.isArray(r))) ? (n = a[t],
                        o = i && !Array.isArray(n) ? [] : i || S.isPlainObject(n) ? n : {},
                        i = !1,
                        a[t] = S.extend(l, o, r)) : void 0 !== r && (a[t] = r));
            return a
        }
        ,
        S.extend({
            expando: "jQuery" + (f + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function(e) {
                throw new Error(e)
            },
            noop: function() {},
            isPlainObject: function(e) {
                var t, n;
                return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = v.call(t, "constructor") && t.constructor) && a.call(n) === l)
            },
            isEmptyObject: function(e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            globalEval: function(e, t, n) {
                b(e, {
                    nonce: t && t.nonce
                }, n)
            },
            each: function(e, t) {
                var n, r = 0;
                if (p(e)) {
                    for (n = e.length; r < n; r++)
                        if (!1 === t.call(e[r], r, e[r]))
                            break
                } else
                    for (r in e)
                        if (!1 === t.call(e[r], r, e[r]))
                            break;
                return e
            },
            makeArray: function(e, t) {
                var n = t || [];
                return null != e && (p(Object(e)) ? S.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)),
                n
            },
            inArray: function(e, t, n) {
                return null == t ? -1 : i.call(t, e, n)
            },
            merge: function(e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                    e[i++] = t[r];
                return e.length = i,
                e
            },
            grep: function(e, t, n) {
                for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                    !t(e[i], i) !== a && r.push(e[i]);
                return r
            },
            map: function(e, t, n) {
                var r, i, o = 0, a = [];
                if (p(e))
                    for (r = e.length; o < r; o++)
                        null != (i = t(e[o], o, n)) && a.push(i);
                else
                    for (o in e)
                        null != (i = t(e[o], o, n)) && a.push(i);
                return g(a)
            },
            guid: 1,
            support: y
        }),
        "function" == typeof Symbol && (S.fn[Symbol.iterator] = t[Symbol.iterator]),
        S.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
            n["[object " + t + "]"] = t.toLowerCase()
        });
        var d = function(n) {
            var e, d, b, o, i, h, f, g, w, u, l, T, C, a, E, v, s, c, y, S = "sizzle" + 1 * new Date, p = n.document, k = 0, r = 0, m = ue(), x = ue(), A = ue(), N = ue(), D = function(e, t) {
                return e === t && (l = !0),
                0
            }, j = {}.hasOwnProperty, t = [], q = t.pop, L = t.push, H = t.push, O = t.slice, P = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t)
                        return n;
                return -1
            }, R = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", M = "[\\x20\\t\\r\\n\\f]", I = "(?:\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", W = "\\[" + M + "*(" + I + ")(?:" + M + "*([*^$|!~]?=)" + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + I + "))|)" + M + "*\\]", F = ":(" + I + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + W + ")*)|.*)\\)|)", B = new RegExp(M + "+","g"), $ = new RegExp("^" + M + "+|((?:^|[^\\\\])(?:\\\\.)*)" + M + "+$","g"), _ = new RegExp("^" + M + "*," + M + "*"), z = new RegExp("^" + M + "*([>+~]|" + M + ")" + M + "*"), U = new RegExp(M + "|>"), X = new RegExp(F), V = new RegExp("^" + I + "$"), G = {
                ID: new RegExp("^#(" + I + ")"),
                CLASS: new RegExp("^\\.(" + I + ")"),
                TAG: new RegExp("^(" + I + "|[*])"),
                ATTR: new RegExp("^" + W),
                PSEUDO: new RegExp("^" + F),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + M + "*(even|odd|(([+-]|)(\\d*)n|)" + M + "*(?:([+-]|)" + M + "*(\\d+)|))" + M + "*\\)|)","i"),
                bool: new RegExp("^(?:" + R + ")$","i"),
                needsContext: new RegExp("^" + M + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + M + "*((?:-\\d)?\\d*)" + M + "*\\)|)(?=[^-]|$)","i")
            }, Y = /HTML$/i, Q = /^(?:input|select|textarea|button)$/i, J = /^h\d$/i, K = /^[^{]+\{\s*\[native \w/, Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ee = /[+~]/, te = new RegExp("\\\\[\\da-fA-F]{1,6}" + M + "?|\\\\([^\\r\\n\\f])","g"), ne = function(e, t) {
                var n = "0x" + e.slice(1) - 65536;
                return t || (n < 0 ? String.fromCharCode(n + 65536) : String.fromCharCode(n >> 10 | 55296, 1023 & n | 56320))
            }, re = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, ie = function(e, t) {
                return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            }, oe = function() {
                T()
            }, ae = be(function(e) {
                return !0 === e.disabled && "fieldset" === e.nodeName.toLowerCase()
            }, {
                dir: "parentNode",
                next: "legend"
            });
            try {
                H.apply(t = O.call(p.childNodes), p.childNodes),
                t[p.childNodes.length].nodeType
            } catch (e) {
                H = {
                    apply: t.length ? function(e, t) {
                        L.apply(e, O.call(t))
                    }
                    : function(e, t) {
                        var n = e.length
                          , r = 0;
                        while (e[n++] = t[r++])
                            ;
                        e.length = n - 1
                    }
                }
            }
            function se(t, e, n, r) {
                var i, o, a, s, u, l, c, f = e && e.ownerDocument, p = e ? e.nodeType : 9;
                if (n = n || [],
                "string" != typeof t || !t || 1 !== p && 9 !== p && 11 !== p)
                    return n;
                if (!r && (T(e),
                e = e || C,
                E)) {
                    if (11 !== p && (u = Z.exec(t)))
                        if (i = u[1]) {
                            if (9 === p) {
                                if (!(a = e.getElementById(i)))
                                    return n;
                                if (a.id === i)
                                    return n.push(a),
                                    n
                            } else if (f && (a = f.getElementById(i)) && y(e, a) && a.id === i)
                                return n.push(a),
                                n
                        } else {
                            if (u[2])
                                return H.apply(n, e.getElementsByTagName(t)),
                                n;
                            if ((i = u[3]) && d.getElementsByClassName && e.getElementsByClassName)
                                return H.apply(n, e.getElementsByClassName(i)),
                                n
                        }
                    if (d.qsa && !N[t + " "] && (!v || !v.test(t)) && (1 !== p || "object" !== e.nodeName.toLowerCase())) {
                        if (c = t,
                        f = e,
                        1 === p && (U.test(t) || z.test(t))) {
                            (f = ee.test(t) && ye(e.parentNode) || e) === e && d.scope || ((s = e.getAttribute("id")) ? s = s.replace(re, ie) : e.setAttribute("id", s = S)),
                            o = (l = h(t)).length;
                            while (o--)
                                l[o] = (s ? "#" + s : ":scope") + " " + xe(l[o]);
                            c = l.join(",")
                        }
                        try {
                            return H.apply(n, f.querySelectorAll(c)),
                            n
                        } catch (e) {
                            N(t, !0)
                        } finally {
                            s === S && e.removeAttribute("id")
                        }
                    }
                }
                return g(t.replace($, "$1"), e, n, r)
            }
            function ue() {
                var r = [];
                return function e(t, n) {
                    return r.push(t + " ") > b.cacheLength && delete e[r.shift()],
                    e[t + " "] = n
                }
            }
            function le(e) {
                return e[S] = !0,
                e
            }
            function ce(e) {
                var t = C.createElement("fieldset");
                try {
                    return !!e(t)
                } catch (e) {
                    return !1
                } finally {
                    t.parentNode && t.parentNode.removeChild(t),
                    t = null
                }
            }
            function fe(e, t) {
                var n = e.split("|")
                  , r = n.length;
                while (r--)
                    b.attrHandle[n[r]] = t
            }
            function pe(e, t) {
                var n = t && e
                  , r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
                if (r)
                    return r;
                if (n)
                    while (n = n.nextSibling)
                        if (n === t)
                            return -1;
                return e ? 1 : -1
            }
            function de(t) {
                return function(e) {
                    return "input" === e.nodeName.toLowerCase() && e.type === t
                }
            }
            function he(n) {
                return function(e) {
                    var t = e.nodeName.toLowerCase();
                    return ("input" === t || "button" === t) && e.type === n
                }
            }
            function ge(t) {
                return function(e) {
                    return "form"in e ? e.parentNode && !1 === e.disabled ? "label"in e ? "label"in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ae(e) === t : e.disabled === t : "label"in e && e.disabled === t
                }
            }
            function ve(a) {
                return le(function(o) {
                    return o = +o,
                    le(function(e, t) {
                        var n, r = a([], e.length, o), i = r.length;
                        while (i--)
                            e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                    })
                })
            }
            function ye(e) {
                return e && "undefined" != typeof e.getElementsByTagName && e
            }
            for (e in d = se.support = {},
            i = se.isXML = function(e) {
                var t = e.namespaceURI
                  , n = (e.ownerDocument || e).documentElement;
                return !Y.test(t || n && n.nodeName || "HTML")
            }
            ,
            T = se.setDocument = function(e) {
                var t, n, r = e ? e.ownerDocument || e : p;
                return r != C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement,
                E = !i(C),
                p != C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", oe, !1) : n.attachEvent && n.attachEvent("onunload", oe)),
                d.scope = ce(function(e) {
                    return a.appendChild(e).appendChild(C.createElement("div")),
                    "undefined" != typeof e.querySelectorAll && !e.querySelectorAll(":scope fieldset div").length
                }),
                d.attributes = ce(function(e) {
                    return e.className = "i",
                    !e.getAttribute("className")
                }),
                d.getElementsByTagName = ce(function(e) {
                    return e.appendChild(C.createComment("")),
                    !e.getElementsByTagName("*").length
                }),
                d.getElementsByClassName = K.test(C.getElementsByClassName),
                d.getById = ce(function(e) {
                    return a.appendChild(e).id = S,
                    !C.getElementsByName || !C.getElementsByName(S).length
                }),
                d.getById ? (b.filter.ID = function(e) {
                    var t = e.replace(te, ne);
                    return function(e) {
                        return e.getAttribute("id") === t
                    }
                }
                ,
                b.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && E) {
                        var n = t.getElementById(e);
                        return n ? [n] : []
                    }
                }
                ) : (b.filter.ID = function(e) {
                    var n = e.replace(te, ne);
                    return function(e) {
                        var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                        return t && t.value === n
                    }
                }
                ,
                b.find.ID = function(e, t) {
                    if ("undefined" != typeof t.getElementById && E) {
                        var n, r, i, o = t.getElementById(e);
                        if (o) {
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o];
                            i = t.getElementsByName(e),
                            r = 0;
                            while (o = i[r++])
                                if ((n = o.getAttributeNode("id")) && n.value === e)
                                    return [o]
                        }
                        return []
                    }
                }
                ),
                b.find.TAG = d.getElementsByTagName ? function(e, t) {
                    return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : d.qsa ? t.querySelectorAll(e) : void 0
                }
                : function(e, t) {
                    var n, r = [], i = 0, o = t.getElementsByTagName(e);
                    if ("*" === e) {
                        while (n = o[i++])
                            1 === n.nodeType && r.push(n);
                        return r
                    }
                    return o
                }
                ,
                b.find.CLASS = d.getElementsByClassName && function(e, t) {
                    if ("undefined" != typeof t.getElementsByClassName && E)
                        return t.getElementsByClassName(e)
                }
                ,
                s = [],
                v = [],
                (d.qsa = K.test(C.querySelectorAll)) && (ce(function(e) {
                    var t;
                    a.appendChild(e).innerHTML = "<a id='" + S + "'></a><select id='" + S + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                    e.querySelectorAll("[msallowcapture^='']").length && v.push("[*^$]=" + M + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length || v.push("\\[" + M + "*(?:value|" + R + ")"),
                    e.querySelectorAll("[id~=" + S + "-]").length || v.push("~="),
                    (t = C.createElement("input")).setAttribute("name", ""),
                    e.appendChild(t),
                    e.querySelectorAll("[name='']").length || v.push("\\[" + M + "*name" + M + "*=" + M + "*(?:''|\"\")"),
                    e.querySelectorAll(":checked").length || v.push(":checked"),
                    e.querySelectorAll("a#" + S + "+*").length || v.push(".#.+[+~]"),
                    e.querySelectorAll("\\\f"),
                    v.push("[\\r\\n\\f]")
                }),
                ce(function(e) {
                    e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                    var t = C.createElement("input");
                    t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length && v.push("name" + M + "*[*^$|!~]?="),
                    2 !== e.querySelectorAll(":enabled").length && v.push(":enabled", ":disabled"),
                    a.appendChild(e).disabled = !0,
                    2 !== e.querySelectorAll(":disabled").length && v.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    v.push(",.*:")
                })),
                (d.matchesSelector = K.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ce(function(e) {
                    d.disconnectedMatch = c.call(e, "*"),
                    c.call(e, "[s!='']:x"),
                    s.push("!=", F)
                }),
                v = v.length && new RegExp(v.join("|")),
                s = s.length && new RegExp(s.join("|")),
                t = K.test(a.compareDocumentPosition),
                y = t || K.test(a.contains) ? function(e, t) {
                    var n = 9 === e.nodeType ? e.documentElement : e
                      , r = t && t.parentNode;
                    return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                }
                : function(e, t) {
                    if (t)
                        while (t = t.parentNode)
                            if (t === e)
                                return !0;
                    return !1
                }
                ,
                D = t ? function(e, t) {
                    if (e === t)
                        return l = !0,
                        0;
                    var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return n || (1 & (n = (e.ownerDocument || e) == (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !d.sortDetached && t.compareDocumentPosition(e) === n ? e == C || e.ownerDocument == p && y(p, e) ? -1 : t == C || t.ownerDocument == p && y(p, t) ? 1 : u ? P(u, e) - P(u, t) : 0 : 4 & n ? -1 : 1)
                }
                : function(e, t) {
                    if (e === t)
                        return l = !0,
                        0;
                    var n, r = 0, i = e.parentNode, o = t.parentNode, a = [e], s = [t];
                    if (!i || !o)
                        return e == C ? -1 : t == C ? 1 : i ? -1 : o ? 1 : u ? P(u, e) - P(u, t) : 0;
                    if (i === o)
                        return pe(e, t);
                    n = e;
                    while (n = n.parentNode)
                        a.unshift(n);
                    n = t;
                    while (n = n.parentNode)
                        s.unshift(n);
                    while (a[r] === s[r])
                        r++;
                    return r ? pe(a[r], s[r]) : a[r] == p ? -1 : s[r] == p ? 1 : 0
                }
                ),
                C
            }
            ,
            se.matches = function(e, t) {
                return se(e, null, null, t)
            }
            ,
            se.matchesSelector = function(e, t) {
                if (T(e),
                d.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!v || !v.test(t)))
                    try {
                        var n = c.call(e, t);
                        if (n || d.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                            return n
                    } catch (e) {
                        N(t, !0)
                    }
                return 0 < se(t, C, null, [e]).length
            }
            ,
            se.contains = function(e, t) {
                return (e.ownerDocument || e) != C && T(e),
                y(e, t)
            }
            ,
            se.attr = function(e, t) {
                (e.ownerDocument || e) != C && T(e);
                var n = b.attrHandle[t.toLowerCase()]
                  , r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : void 0;
                return void 0 !== r ? r : d.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }
            ,
            se.escape = function(e) {
                return (e + "").replace(re, ie)
            }
            ,
            se.error = function(e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }
            ,
            se.uniqueSort = function(e) {
                var t, n = [], r = 0, i = 0;
                if (l = !d.detectDuplicates,
                u = !d.sortStable && e.slice(0),
                e.sort(D),
                l) {
                    while (t = e[i++])
                        t === e[i] && (r = n.push(i));
                    while (r--)
                        e.splice(n[r], 1)
                }
                return u = null,
                e
            }
            ,
            o = se.getText = function(e) {
                var t, n = "", r = 0, i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += o(e)
                    } else if (3 === i || 4 === i)
                        return e.nodeValue
                } else
                    while (t = e[r++])
                        n += o(t);
                return n
            }
            ,
            (b = se.selectors = {
                cacheLength: 50,
                createPseudo: le,
                match: G,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function(e) {
                        return e[1] = e[1].replace(te, ne),
                        e[3] = (e[3] || e[4] || e[5] || "").replace(te, ne),
                        "~=" === e[2] && (e[3] = " " + e[3] + " "),
                        e.slice(0, 4)
                    },
                    CHILD: function(e) {
                        return e[1] = e[1].toLowerCase(),
                        "nth" === e[1].slice(0, 3) ? (e[3] || se.error(e[0]),
                        e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                        e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && se.error(e[0]),
                        e
                    },
                    PSEUDO: function(e) {
                        var t, n = !e[6] && e[2];
                        return G.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = h(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                        e[2] = n.slice(0, t)),
                        e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function(e) {
                        var t = e.replace(te, ne).toLowerCase();
                        return "*" === e ? function() {
                            return !0
                        }
                        : function(e) {
                            return e.nodeName && e.nodeName.toLowerCase() === t
                        }
                    },
                    CLASS: function(e) {
                        var t = m[e + " "];
                        return t || (t = new RegExp("(^|" + M + ")" + e + "(" + M + "|$)")) && m(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                    },
                    ATTR: function(n, r, i) {
                        return function(e) {
                            var t = se.attr(e, n);
                            return null == t ? "!=" === r : !r || (t += "",
                            "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(B, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                        }
                    },
                    CHILD: function(h, e, t, g, v) {
                        var y = "nth" !== h.slice(0, 3)
                          , m = "last" !== h.slice(-4)
                          , x = "of-type" === e;
                        return 1 === g && 0 === v ? function(e) {
                            return !!e.parentNode
                        }
                        : function(e, t, n) {
                            var r, i, o, a, s, u, l = y !== m ? "nextSibling" : "previousSibling", c = e.parentNode, f = x && e.nodeName.toLowerCase(), p = !n && !x, d = !1;
                            if (c) {
                                if (y) {
                                    while (l) {
                                        a = e;
                                        while (a = a[l])
                                            if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType)
                                                return !1;
                                        u = l = "only" === h && !u && "nextSibling"
                                    }
                                    return !0
                                }
                                if (u = [m ? c.firstChild : c.lastChild],
                                m && p) {
                                    d = (s = (r = (i = (o = (a = c)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]) && r[2],
                                    a = s && c.childNodes[s];
                                    while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                        if (1 === a.nodeType && ++d && a === e) {
                                            i[h] = [k, s, d];
                                            break
                                        }
                                } else if (p && (d = s = (r = (i = (o = (a = e)[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === k && r[1]),
                                !1 === d)
                                    while (a = ++s && a && a[l] || (d = s = 0) || u.pop())
                                        if ((x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType) && ++d && (p && ((i = (o = a[S] || (a[S] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [k, d]),
                                        a === e))
                                            break;
                                return (d -= v) === g || d % g == 0 && 0 <= d / g
                            }
                        }
                    },
                    PSEUDO: function(e, o) {
                        var t, a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || se.error("unsupported pseudo: " + e);
                        return a[S] ? a(o) : 1 < a.length ? (t = [e, e, "", o],
                        b.setFilters.hasOwnProperty(e.toLowerCase()) ? le(function(e, t) {
                            var n, r = a(e, o), i = r.length;
                            while (i--)
                                e[n = P(e, r[i])] = !(t[n] = r[i])
                        }) : function(e) {
                            return a(e, 0, t)
                        }
                        ) : a
                    }
                },
                pseudos: {
                    not: le(function(e) {
                        var r = []
                          , i = []
                          , s = f(e.replace($, "$1"));
                        return s[S] ? le(function(e, t, n, r) {
                            var i, o = s(e, null, r, []), a = e.length;
                            while (a--)
                                (i = o[a]) && (e[a] = !(t[a] = i))
                        }) : function(e, t, n) {
                            return r[0] = e,
                            s(r, null, n, i),
                            r[0] = null,
                            !i.pop()
                        }
                    }),
                    has: le(function(t) {
                        return function(e) {
                            return 0 < se(t, e).length
                        }
                    }),
                    contains: le(function(t) {
                        return t = t.replace(te, ne),
                        function(e) {
                            return -1 < (e.textContent || o(e)).indexOf(t)
                        }
                    }),
                    lang: le(function(n) {
                        return V.test(n || "") || se.error("unsupported lang: " + n),
                        n = n.replace(te, ne).toLowerCase(),
                        function(e) {
                            var t;
                            do {
                                if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                    return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                            } while ((e = e.parentNode) && 1 === e.nodeType);
                            return !1
                        }
                    }),
                    target: function(e) {
                        var t = n.location && n.location.hash;
                        return t && t.slice(1) === e.id
                    },
                    root: function(e) {
                        return e === a
                    },
                    focus: function(e) {
                        return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: ge(!1),
                    disabled: ge(!0),
                    checked: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function(e) {
                        return e.parentNode && e.parentNode.selectedIndex,
                        !0 === e.selected
                    },
                    empty: function(e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function(e) {
                        return !b.pseudos.empty(e)
                    },
                    header: function(e) {
                        return J.test(e.nodeName)
                    },
                    input: function(e) {
                        return Q.test(e.nodeName)
                    },
                    button: function(e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function(e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: ve(function() {
                        return [0]
                    }),
                    last: ve(function(e, t) {
                        return [t - 1]
                    }),
                    eq: ve(function(e, t, n) {
                        return [n < 0 ? n + t : n]
                    }),
                    even: ve(function(e, t) {
                        for (var n = 0; n < t; n += 2)
                            e.push(n);
                        return e
                    }),
                    odd: ve(function(e, t) {
                        for (var n = 1; n < t; n += 2)
                            e.push(n);
                        return e
                    }),
                    lt: ve(function(e, t, n) {
                        for (var r = n < 0 ? n + t : t < n ? t : n; 0 <= --r; )
                            e.push(r);
                        return e
                    }),
                    gt: ve(function(e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t; )
                            e.push(r);
                        return e
                    })
                }
            }).pseudos.nth = b.pseudos.eq,
            {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            })
                b.pseudos[e] = de(e);
            for (e in {
                submit: !0,
                reset: !0
            })
                b.pseudos[e] = he(e);
            function me() {}
            function xe(e) {
                for (var t = 0, n = e.length, r = ""; t < n; t++)
                    r += e[t].value;
                return r
            }
            function be(s, e, t) {
                var u = e.dir
                  , l = e.next
                  , c = l || u
                  , f = t && "parentNode" === c
                  , p = r++;
                return e.first ? function(e, t, n) {
                    while (e = e[u])
                        if (1 === e.nodeType || f)
                            return s(e, t, n);
                    return !1
                }
                : function(e, t, n) {
                    var r, i, o, a = [k, p];
                    if (n) {
                        while (e = e[u])
                            if ((1 === e.nodeType || f) && s(e, t, n))
                                return !0
                    } else
                        while (e = e[u])
                            if (1 === e.nodeType || f)
                                if (i = (o = e[S] || (e[S] = {}))[e.uniqueID] || (o[e.uniqueID] = {}),
                                l && l === e.nodeName.toLowerCase())
                                    e = e[u] || e;
                                else {
                                    if ((r = i[c]) && r[0] === k && r[1] === p)
                                        return a[2] = r[2];
                                    if ((i[c] = a)[2] = s(e, t, n))
                                        return !0
                                }
                    return !1
                }
            }
            function we(i) {
                return 1 < i.length ? function(e, t, n) {
                    var r = i.length;
                    while (r--)
                        if (!i[r](e, t, n))
                            return !1;
                    return !0
                }
                : i[0]
            }
            function Te(e, t, n, r, i) {
                for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                    (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                    l && t.push(s)));
                return a
            }
            function Ce(d, h, g, v, y, e) {
                return v && !v[S] && (v = Ce(v)),
                y && !y[S] && (y = Ce(y, e)),
                le(function(e, t, n, r) {
                    var i, o, a, s = [], u = [], l = t.length, c = e || function(e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++)
                            se(e, t[r], n);
                        return n
                    }(h || "*", n.nodeType ? [n] : n, []), f = !d || !e && h ? c : Te(c, s, d, n, r), p = g ? y || (e ? d : l || v) ? [] : t : f;
                    if (g && g(f, p, n, r),
                    v) {
                        i = Te(p, u),
                        v(i, [], n, r),
                        o = i.length;
                        while (o--)
                            (a = i[o]) && (p[u[o]] = !(f[u[o]] = a))
                    }
                    if (e) {
                        if (y || d) {
                            if (y) {
                                i = [],
                                o = p.length;
                                while (o--)
                                    (a = p[o]) && i.push(f[o] = a);
                                y(null, p = [], i, r)
                            }
                            o = p.length;
                            while (o--)
                                (a = p[o]) && -1 < (i = y ? P(e, a) : s[o]) && (e[i] = !(t[i] = a))
                        }
                    } else
                        p = Te(p === t ? p.splice(l, p.length) : p),
                        y ? y(null, t, p, r) : H.apply(t, p)
                })
            }
            function Ee(e) {
                for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = be(function(e) {
                    return e === i
                }, a, !0), l = be(function(e) {
                    return -1 < P(i, e)
                }, a, !0), c = [function(e, t, n) {
                    var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                    return i = null,
                    r
                }
                ]; s < r; s++)
                    if (t = b.relative[e[s].type])
                        c = [be(we(c), t)];
                    else {
                        if ((t = b.filter[e[s].type].apply(null, e[s].matches))[S]) {
                            for (n = ++s; n < r; n++)
                                if (b.relative[e[n].type])
                                    break;
                            return Ce(1 < s && we(c), 1 < s && xe(e.slice(0, s - 1).concat({
                                value: " " === e[s - 2].type ? "*" : ""
                            })).replace($, "$1"), t, s < n && Ee(e.slice(s, n)), n < r && Ee(e = e.slice(n)), n < r && xe(e))
                        }
                        c.push(t)
                    }
                return we(c)
            }
            return me.prototype = b.filters = b.pseudos,
            b.setFilters = new me,
            h = se.tokenize = function(e, t) {
                var n, r, i, o, a, s, u, l = x[e + " "];
                if (l)
                    return t ? 0 : l.slice(0);
                a = e,
                s = [],
                u = b.preFilter;
                while (a) {
                    for (o in n && !(r = _.exec(a)) || (r && (a = a.slice(r[0].length) || a),
                    s.push(i = [])),
                    n = !1,
                    (r = z.exec(a)) && (n = r.shift(),
                    i.push({
                        value: n,
                        type: r[0].replace($, " ")
                    }),
                    a = a.slice(n.length)),
                    b.filter)
                        !(r = G[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(),
                        i.push({
                            value: n,
                            type: o,
                            matches: r
                        }),
                        a = a.slice(n.length));
                    if (!n)
                        break
                }
                return t ? a.length : a ? se.error(e) : x(e, s).slice(0)
            }
            ,
            f = se.compile = function(e, t) {
                var n, v, y, m, x, r, i = [], o = [], a = A[e + " "];
                if (!a) {
                    t || (t = h(e)),
                    n = t.length;
                    while (n--)
                        (a = Ee(t[n]))[S] ? i.push(a) : o.push(a);
                    (a = A(e, (v = o,
                    m = 0 < (y = i).length,
                    x = 0 < v.length,
                    r = function(e, t, n, r, i) {
                        var o, a, s, u = 0, l = "0", c = e && [], f = [], p = w, d = e || x && b.find.TAG("*", i), h = k += null == p ? 1 : Math.random() || .1, g = d.length;
                        for (i && (w = t == C || t || i); l !== g && null != (o = d[l]); l++) {
                            if (x && o) {
                                a = 0,
                                t || o.ownerDocument == C || (T(o),
                                n = !E);
                                while (s = v[a++])
                                    if (s(o, t || C, n)) {
                                        r.push(o);
                                        break
                                    }
                                i && (k = h)
                            }
                            m && ((o = !s && o) && u--,
                            e && c.push(o))
                        }
                        if (u += l,
                        m && l !== u) {
                            a = 0;
                            while (s = y[a++])
                                s(c, f, t, n);
                            if (e) {
                                if (0 < u)
                                    while (l--)
                                        c[l] || f[l] || (f[l] = q.call(r));
                                f = Te(f)
                            }
                            H.apply(r, f),
                            i && !e && 0 < f.length && 1 < u + y.length && se.uniqueSort(r)
                        }
                        return i && (k = h,
                        w = p),
                        c
                    }
                    ,
                    m ? le(r) : r))).selector = e
                }
                return a
            }
            ,
            g = se.select = function(e, t, n, r) {
                var i, o, a, s, u, l = "function" == typeof e && e, c = !r && h(e = l.selector || e);
                if (n = n || [],
                1 === c.length) {
                    if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                        if (!(t = (b.find.ID(a.matches[0].replace(te, ne), t) || [])[0]))
                            return n;
                        l && (t = t.parentNode),
                        e = e.slice(o.shift().value.length)
                    }
                    i = G.needsContext.test(e) ? 0 : o.length;
                    while (i--) {
                        if (a = o[i],
                        b.relative[s = a.type])
                            break;
                        if ((u = b.find[s]) && (r = u(a.matches[0].replace(te, ne), ee.test(o[0].type) && ye(t.parentNode) || t))) {
                            if (o.splice(i, 1),
                            !(e = r.length && xe(o)))
                                return H.apply(n, r),
                                n;
                            break
                        }
                    }
                }
                return (l || f(e, c))(r, t, !E, n, !t || ee.test(e) && ye(t.parentNode) || t),
                n
            }
            ,
            d.sortStable = S.split("").sort(D).join("") === S,
            d.detectDuplicates = !!l,
            T(),
            d.sortDetached = ce(function(e) {
                return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
            }),
            ce(function(e) {
                return e.innerHTML = "<a href='#'></a>",
                "#" === e.firstChild.getAttribute("href")
            }) || fe("type|href|height|width", function(e, t, n) {
                if (!n)
                    return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }),
            d.attributes && ce(function(e) {
                return e.innerHTML = "<input/>",
                e.firstChild.setAttribute("value", ""),
                "" === e.firstChild.getAttribute("value")
            }) || fe("value", function(e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue
            }),
            ce(function(e) {
                return null == e.getAttribute("disabled")
            }) || fe(R, function(e, t, n) {
                var r;
                if (!n)
                    return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }),
            se
        }(C);
        S.find = d,
        S.expr = d.selectors,
        S.expr[":"] = S.expr.pseudos,
        S.uniqueSort = S.unique = d.uniqueSort,
        S.text = d.getText,
        S.isXMLDoc = d.isXML,
        S.contains = d.contains,
        S.escapeSelector = d.escape;
        var h = function(e, t, n) {
            var r = []
              , i = void 0 !== n;
            while ((e = e[t]) && 9 !== e.nodeType)
                if (1 === e.nodeType) {
                    if (i && S(e).is(n))
                        break;
                    r.push(e)
                }
            return r
        }
          , T = function(e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        }
          , k = S.expr.match.needsContext;
        function A(e, t) {
            return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
        }
        var N = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
        function D(e, n, r) {
            return m(n) ? S.grep(e, function(e, t) {
                return !!n.call(e, t, e) !== r
            }) : n.nodeType ? S.grep(e, function(e) {
                return e === n !== r
            }) : "string" != typeof n ? S.grep(e, function(e) {
                return -1 < i.call(n, e) !== r
            }) : S.filter(n, e, r)
        }
        S.filter = function(e, t, n) {
            var r = t[0];
            return n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === r.nodeType ? S.find.matchesSelector(r, e) ? [r] : [] : S.find.matches(e, S.grep(t, function(e) {
                return 1 === e.nodeType
            }))
        }
        ,
        S.fn.extend({
            find: function(e) {
                var t, n, r = this.length, i = this;
                if ("string" != typeof e)
                    return this.pushStack(S(e).filter(function() {
                        for (t = 0; t < r; t++)
                            if (S.contains(i[t], this))
                                return !0
                    }));
                for (n = this.pushStack([]),
                t = 0; t < r; t++)
                    S.find(e, i[t], n);
                return 1 < r ? S.uniqueSort(n) : n
            },
            filter: function(e) {
                return this.pushStack(D(this, e || [], !1))
            },
            not: function(e) {
                return this.pushStack(D(this, e || [], !0))
            },
            is: function(e) {
                return !!D(this, "string" == typeof e && k.test(e) ? S(e) : e || [], !1).length
            }
        });
        var j, q = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
        (S.fn.init = function(e, t, n) {
            var r, i;
            if (!e)
                return this;
            if (n = n || j,
            "string" == typeof e) {
                if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : q.exec(e)) || !r[1] && t)
                    return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
                if (r[1]) {
                    if (t = t instanceof S ? t[0] : t,
                    S.merge(this, S.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : E, !0)),
                    N.test(r[1]) && S.isPlainObject(t))
                        for (r in t)
                            m(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                    return this
                }
                return (i = E.getElementById(r[2])) && (this[0] = i,
                this.length = 1),
                this
            }
            return e.nodeType ? (this[0] = e,
            this.length = 1,
            this) : m(e) ? void 0 !== n.ready ? n.ready(e) : e(S) : S.makeArray(e, this)
        }
        ).prototype = S.fn,
        j = S(E);
        var L = /^(?:parents|prev(?:Until|All))/
          , H = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
        function O(e, t) {
            while ((e = e[t]) && 1 !== e.nodeType)
                ;
            return e
        }
        S.fn.extend({
            has: function(e) {
                var t = S(e, this)
                  , n = t.length;
                return this.filter(function() {
                    for (var e = 0; e < n; e++)
                        if (S.contains(this, t[e]))
                            return !0
                })
            },
            closest: function(e, t) {
                var n, r = 0, i = this.length, o = [], a = "string" != typeof e && S(e);
                if (!k.test(e))
                    for (; r < i; r++)
                        for (n = this[r]; n && n !== t; n = n.parentNode)
                            if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && S.find.matchesSelector(n, e))) {
                                o.push(n);
                                break
                            }
                return this.pushStack(1 < o.length ? S.uniqueSort(o) : o)
            },
            index: function(e) {
                return e ? "string" == typeof e ? i.call(S(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(e, t) {
                return this.pushStack(S.uniqueSort(S.merge(this.get(), S(e, t))))
            },
            addBack: function(e) {
                return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
            }
        }),
        S.each({
            parent: function(e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function(e) {
                return h(e, "parentNode")
            },
            parentsUntil: function(e, t, n) {
                return h(e, "parentNode", n)
            },
            next: function(e) {
                return O(e, "nextSibling")
            },
            prev: function(e) {
                return O(e, "previousSibling")
            },
            nextAll: function(e) {
                return h(e, "nextSibling")
            },
            prevAll: function(e) {
                return h(e, "previousSibling")
            },
            nextUntil: function(e, t, n) {
                return h(e, "nextSibling", n)
            },
            prevUntil: function(e, t, n) {
                return h(e, "previousSibling", n)
            },
            siblings: function(e) {
                return T((e.parentNode || {}).firstChild, e)
            },
            children: function(e) {
                return T(e.firstChild)
            },
            contents: function(e) {
                return null != e.contentDocument && r(e.contentDocument) ? e.contentDocument : (A(e, "template") && (e = e.content || e),
                S.merge([], e.childNodes))
            }
        }, function(r, i) {
            S.fn[r] = function(e, t) {
                var n = S.map(this, i, e);
                return "Until" !== r.slice(-5) && (t = e),
                t && "string" == typeof t && (n = S.filter(t, n)),
                1 < this.length && (H[r] || S.uniqueSort(n),
                L.test(r) && n.reverse()),
                this.pushStack(n)
            }
        });
        var P = /[^\x20\t\r\n\f]+/g;
        function R(e) {
            return e
        }
        function M(e) {
            throw e
        }
        function I(e, t, n, r) {
            var i;
            try {
                e && m(i = e.promise) ? i.call(e).done(t).fail(n) : e && m(i = e.then) ? i.call(e, t, n) : t.apply(void 0, [e].slice(r))
            } catch (e) {
                n.apply(void 0, [e])
            }
        }
        S.Callbacks = function(r) {
            var e, n;
            r = "string" == typeof r ? (e = r,
            n = {},
            S.each(e.match(P) || [], function(e, t) {
                n[t] = !0
            }),
            n) : S.extend({}, r);
            var i, t, o, a, s = [], u = [], l = -1, c = function() {
                for (a = a || r.once,
                o = i = !0; u.length; l = -1) {
                    t = u.shift();
                    while (++l < s.length)
                        !1 === s[l].apply(t[0], t[1]) && r.stopOnFalse && (l = s.length,
                        t = !1)
                }
                r.memory || (t = !1),
                i = !1,
                a && (s = t ? [] : "")
            }, f = {
                add: function() {
                    return s && (t && !i && (l = s.length - 1,
                    u.push(t)),
                    function n(e) {
                        S.each(e, function(e, t) {
                            m(t) ? r.unique && f.has(t) || s.push(t) : t && t.length && "string" !== w(t) && n(t)
                        })
                    }(arguments),
                    t && !i && c()),
                    this
                },
                remove: function() {
                    return S.each(arguments, function(e, t) {
                        var n;
                        while (-1 < (n = S.inArray(t, s, n)))
                            s.splice(n, 1),
                            n <= l && l--
                    }),
                    this
                },
                has: function(e) {
                    return e ? -1 < S.inArray(e, s) : 0 < s.length
                },
                empty: function() {
                    return s && (s = []),
                    this
                },
                disable: function() {
                    return a = u = [],
                    s = t = "",
                    this
                },
                disabled: function() {
                    return !s
                },
                lock: function() {
                    return a = u = [],
                    t || i || (s = t = ""),
                    this
                },
                locked: function() {
                    return !!a
                },
                fireWith: function(e, t) {
                    return a || (t = [e, (t = t || []).slice ? t.slice() : t],
                    u.push(t),
                    i || c()),
                    this
                },
                fire: function() {
                    return f.fireWith(this, arguments),
                    this
                },
                fired: function() {
                    return !!o
                }
            };
            return f
        }
        ,
        S.extend({
            Deferred: function(e) {
                var o = [["notify", "progress", S.Callbacks("memory"), S.Callbacks("memory"), 2], ["resolve", "done", S.Callbacks("once memory"), S.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", S.Callbacks("once memory"), S.Callbacks("once memory"), 1, "rejected"]]
                  , i = "pending"
                  , a = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments),
                        this
                    },
                    "catch": function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var i = arguments;
                        return S.Deferred(function(r) {
                            S.each(o, function(e, t) {
                                var n = m(i[t[4]]) && i[t[4]];
                                s[t[1]](function() {
                                    var e = n && n.apply(this, arguments);
                                    e && m(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }),
                            i = null
                        }).promise()
                    },
                    then: function(t, n, r) {
                        var u = 0;
                        function l(i, o, a, s) {
                            return function() {
                                var n = this
                                  , r = arguments
                                  , e = function() {
                                    var e, t;
                                    if (!(i < u)) {
                                        if ((e = a.apply(n, r)) === o.promise())
                                            throw new TypeError("Thenable self-resolution");
                                        t = e && ("object" == typeof e || "function" == typeof e) && e.then,
                                        m(t) ? s ? t.call(e, l(u, o, R, s), l(u, o, M, s)) : (u++,
                                        t.call(e, l(u, o, R, s), l(u, o, M, s), l(u, o, R, o.notifyWith))) : (a !== R && (n = void 0,
                                        r = [e]),
                                        (s || o.resolveWith)(n, r))
                                    }
                                }
                                  , t = s ? e : function() {
                                    try {
                                        e()
                                    } catch (e) {
                                        S.Deferred.exceptionHook && S.Deferred.exceptionHook(e, t.stackTrace),
                                        u <= i + 1 && (a !== M && (n = void 0,
                                        r = [e]),
                                        o.rejectWith(n, r))
                                    }
                                }
                                ;
                                i ? t() : (S.Deferred.getStackHook && (t.stackTrace = S.Deferred.getStackHook()),
                                C.setTimeout(t))
                            }
                        }
                        return S.Deferred(function(e) {
                            o[0][3].add(l(0, e, m(r) ? r : R, e.notifyWith)),
                            o[1][3].add(l(0, e, m(t) ? t : R)),
                            o[2][3].add(l(0, e, m(n) ? n : M))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? S.extend(e, a) : a
                    }
                }
                  , s = {};
                return S.each(o, function(e, t) {
                    var n = t[2]
                      , r = t[5];
                    a[t[1]] = n.add,
                    r && n.add(function() {
                        i = r
                    }, o[3 - e][2].disable, o[3 - e][3].disable, o[0][2].lock, o[0][3].lock),
                    n.add(t[3].fire),
                    s[t[0]] = function() {
                        return s[t[0] + "With"](this === s ? void 0 : this, arguments),
                        this
                    }
                    ,
                    s[t[0] + "With"] = n.fireWith
                }),
                a.promise(s),
                e && e.call(s, s),
                s
            },
            when: function(e) {
                var n = arguments.length
                  , t = n
                  , r = Array(t)
                  , i = s.call(arguments)
                  , o = S.Deferred()
                  , a = function(t) {
                    return function(e) {
                        r[t] = this,
                        i[t] = 1 < arguments.length ? s.call(arguments) : e,
                        --n || o.resolveWith(r, i)
                    }
                };
                if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n),
                "pending" === o.state() || m(i[t] && i[t].then)))
                    return o.then();
                while (t--)
                    I(i[t], a(t), o.reject);
                return o.promise()
            }
        });
        var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
        S.Deferred.exceptionHook = function(e, t) {
            C.console && C.console.warn && e && W.test(e.name) && C.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
        }
        ,
        S.readyException = function(e) {
            C.setTimeout(function() {
                throw e
            })
        }
        ;
        var F = S.Deferred();
        function B() {
            E.removeEventListener("DOMContentLoaded", B),
            C.removeEventListener("load", B),
            S.ready()
        }
        S.fn.ready = function(e) {
            return F.then(e)["catch"](function(e) {
                S.readyException(e)
            }),
            this
        }
        ,
        S.extend({
            isReady: !1,
            readyWait: 1,
            ready: function(e) {
                (!0 === e ? --S.readyWait : S.isReady) || (S.isReady = !0) !== e && 0 < --S.readyWait || F.resolveWith(E, [S])
            }
        }),
        S.ready.then = F.then,
        "complete" === E.readyState || "loading" !== E.readyState && !E.documentElement.doScroll ? C.setTimeout(S.ready) : (E.addEventListener("DOMContentLoaded", B),
        C.addEventListener("load", B));
        var $ = function(e, t, n, r, i, o, a) {
            var s = 0
              , u = e.length
              , l = null == n;
            if ("object" === w(n))
                for (s in i = !0,
                n)
                    $(e, t, s, n[s], !0, o, a);
            else if (void 0 !== r && (i = !0,
            m(r) || (a = !0),
            l && (a ? (t.call(e, r),
            t = null) : (l = t,
            t = function(e, t, n) {
                return l.call(S(e), n)
            }
            )),
            t))
                for (; s < u; s++)
                    t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        }
          , _ = /^-ms-/
          , z = /-([a-z])/g;
        function U(e, t) {
            return t.toUpperCase()
        }
        function X(e) {
            return e.replace(_, "ms-").replace(z, U)
        }
        var V = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
        function G() {
            this.expando = S.expando + G.uid++
        }
        G.uid = 1,
        G.prototype = {
            cache: function(e) {
                var t = e[this.expando];
                return t || (t = Object.create(null),
                V(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                    value: t,
                    configurable: !0
                }))),
                t
            },
            set: function(e, t, n) {
                var r, i = this.cache(e);
                if ("string" == typeof t)
                    i[X(t)] = n;
                else
                    for (r in t)
                        i[X(r)] = t[r];
                return i
            },
            get: function(e, t) {
                return void 0 === t ? this.cache(e) : e[this.expando] && e[this.expando][X(t)]
            },
            access: function(e, t, n) {
                return void 0 === t || t && "string" == typeof t && void 0 === n ? this.get(e, t) : (this.set(e, t, n),
                void 0 !== n ? n : t)
            },
            remove: function(e, t) {
                var n, r = e[this.expando];
                if (void 0 !== r) {
                    if (void 0 !== t) {
                        n = (t = Array.isArray(t) ? t.map(X) : (t = X(t))in r ? [t] : t.match(P) || []).length;
                        while (n--)
                            delete r[t[n]]
                    }
                    (void 0 === t || S.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = void 0 : delete e[this.expando])
                }
            },
            hasData: function(e) {
                var t = e[this.expando];
                return void 0 !== t && !S.isEmptyObject(t)
            }
        };
        var Y = new G
          , Q = new G
          , J = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/
          , K = /[A-Z]/g;
        function Z(e, t, n) {
            var r, i;
            if (void 0 === n && 1 === e.nodeType)
                if (r = "data-" + t.replace(K, "-$&").toLowerCase(),
                "string" == typeof (n = e.getAttribute(r))) {
                    try {
                        n = "true" === (i = n) || "false" !== i && ("null" === i ? null : i === +i + "" ? +i : J.test(i) ? JSON.parse(i) : i)
                    } catch (e) {}
                    Q.set(e, t, n)
                } else
                    n = void 0;
            return n
        }
        S.extend({
            hasData: function(e) {
                return Q.hasData(e) || Y.hasData(e)
            },
            data: function(e, t, n) {
                return Q.access(e, t, n)
            },
            removeData: function(e, t) {
                Q.remove(e, t)
            },
            _data: function(e, t, n) {
                return Y.access(e, t, n)
            },
            _removeData: function(e, t) {
                Y.remove(e, t)
            }
        }),
        S.fn.extend({
            data: function(n, e) {
                var t, r, i, o = this[0], a = o && o.attributes;
                if (void 0 === n) {
                    if (this.length && (i = Q.get(o),
                    1 === o.nodeType && !Y.get(o, "hasDataAttrs"))) {
                        t = a.length;
                        while (t--)
                            a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = X(r.slice(5)),
                            Z(o, r, i[r]));
                        Y.set(o, "hasDataAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof n ? this.each(function() {
                    Q.set(this, n)
                }) : $(this, function(e) {
                    var t;
                    if (o && void 0 === e)
                        return void 0 !== (t = Q.get(o, n)) ? t : void 0 !== (t = Z(o, n)) ? t : void 0;
                    this.each(function() {
                        Q.set(this, n, e)
                    })
                }, null, e, 1 < arguments.length, null, !0)
            },
            removeData: function(e) {
                return this.each(function() {
                    Q.remove(this, e)
                })
            }
        }),
        S.extend({
            queue: function(e, t, n) {
                var r;
                if (e)
                    return t = (t || "fx") + "queue",
                    r = Y.get(e, t),
                    n && (!r || Array.isArray(n) ? r = Y.access(e, t, S.makeArray(n)) : r.push(n)),
                    r || []
            },
            dequeue: function(e, t) {
                t = t || "fx";
                var n = S.queue(e, t)
                  , r = n.length
                  , i = n.shift()
                  , o = S._queueHooks(e, t);
                "inprogress" === i && (i = n.shift(),
                r--),
                i && ("fx" === t && n.unshift("inprogress"),
                delete o.stop,
                i.call(e, function() {
                    S.dequeue(e, t)
                }, o)),
                !r && o && o.empty.fire()
            },
            _queueHooks: function(e, t) {
                var n = t + "queueHooks";
                return Y.get(e, n) || Y.access(e, n, {
                    empty: S.Callbacks("once memory").add(function() {
                        Y.remove(e, [t + "queue", n])
                    })
                })
            }
        }),
        S.fn.extend({
            queue: function(t, n) {
                var e = 2;
                return "string" != typeof t && (n = t,
                t = "fx",
                e--),
                arguments.length < e ? S.queue(this[0], t) : void 0 === n ? this : this.each(function() {
                    var e = S.queue(this, t, n);
                    S._queueHooks(this, t),
                    "fx" === t && "inprogress" !== e[0] && S.dequeue(this, t)
                })
            },
            dequeue: function(e) {
                return this.each(function() {
                    S.dequeue(this, e)
                })
            },
            clearQueue: function(e) {
                return this.queue(e || "fx", [])
            },
            promise: function(e, t) {
                var n, r = 1, i = S.Deferred(), o = this, a = this.length, s = function() {
                    --r || i.resolveWith(o, [o])
                };
                "string" != typeof e && (t = e,
                e = void 0),
                e = e || "fx";
                while (a--)
                    (n = Y.get(o[a], e + "queueHooks")) && n.empty && (r++,
                    n.empty.add(s));
                return s(),
                i.promise(t)
            }
        });
        var ee = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source
          , te = new RegExp("^(?:([+-])=|)(" + ee + ")([a-z%]*)$","i")
          , ne = ["Top", "Right", "Bottom", "Left"]
          , re = E.documentElement
          , ie = function(e) {
            return S.contains(e.ownerDocument, e)
        }
          , oe = {
            composed: !0
        };
        re.getRootNode && (ie = function(e) {
            return S.contains(e.ownerDocument, e) || e.getRootNode(oe) === e.ownerDocument
        }
        );
        var ae = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && ie(e) && "none" === S.css(e, "display")
        };
        function se(e, t, n, r) {
            var i, o, a = 20, s = r ? function() {
                return r.cur()
            }
            : function() {
                return S.css(e, t, "")
            }
            , u = s(), l = n && n[3] || (S.cssNumber[t] ? "" : "px"), c = e.nodeType && (S.cssNumber[t] || "px" !== l && +u) && te.exec(S.css(e, t));
            if (c && c[3] !== l) {
                u /= 2,
                l = l || c[3],
                c = +u || 1;
                while (a--)
                    S.style(e, t, c + l),
                    (1 - o) * (1 - (o = s() / u || .5)) <= 0 && (a = 0),
                    c /= o;
                c *= 2,
                S.style(e, t, c + l),
                n = n || []
            }
            return n && (c = +c || +u || 0,
            i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
            r && (r.unit = l,
            r.start = c,
            r.end = i)),
            i
        }
        var ue = {};
        function le(e, t) {
            for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
                (r = e[c]).style && (n = r.style.display,
                t ? ("none" === n && (l[c] = Y.get(r, "display") || null,
                l[c] || (r.style.display = "")),
                "" === r.style.display && ae(r) && (l[c] = (u = a = o = void 0,
                a = (i = r).ownerDocument,
                s = i.nodeName,
                (u = ue[s]) || (o = a.body.appendChild(a.createElement(s)),
                u = S.css(o, "display"),
                o.parentNode.removeChild(o),
                "none" === u && (u = "block"),
                ue[s] = u)))) : "none" !== n && (l[c] = "none",
                Y.set(r, "display", n)));
            for (c = 0; c < f; c++)
                null != l[c] && (e[c].style.display = l[c]);
            return e
        }
        S.fn.extend({
            show: function() {
                return le(this, !0)
            },
            hide: function() {
                return le(this)
            },
            toggle: function(e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                    ae(this) ? S(this).show() : S(this).hide()
                })
            }
        });
        var ce, fe, pe = /^(?:checkbox|radio)$/i, de = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i, he = /^$|^module$|\/(?:java|ecma)script/i;
        ce = E.createDocumentFragment().appendChild(E.createElement("div")),
        (fe = E.createElement("input")).setAttribute("type", "radio"),
        fe.setAttribute("checked", "checked"),
        fe.setAttribute("name", "t"),
        ce.appendChild(fe),
        y.checkClone = ce.cloneNode(!0).cloneNode(!0).lastChild.checked,
        ce.innerHTML = "<textarea>x</textarea>",
        y.noCloneChecked = !!ce.cloneNode(!0).lastChild.defaultValue,
        ce.innerHTML = "<option></option>",
        y.option = !!ce.lastChild;
        var ge = {
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
        function ve(e, t) {
            var n;
            return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [],
            void 0 === t || t && A(e, t) ? S.merge([e], n) : n
        }
        function ye(e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                Y.set(e[n], "globalEval", !t || Y.get(t[n], "globalEval"))
        }
        ge.tbody = ge.tfoot = ge.colgroup = ge.caption = ge.thead,
        ge.th = ge.td,
        y.option || (ge.optgroup = ge.option = [1, "<select multiple='multiple'>", "</select>"]);
        var me = /<|&#?\w+;/;
        function xe(e, t, n, r, i) {
            for (var o, a, s, u, l, c, f = t.createDocumentFragment(), p = [], d = 0, h = e.length; d < h; d++)
                if ((o = e[d]) || 0 === o)
                    if ("object" === w(o))
                        S.merge(p, o.nodeType ? [o] : o);
                    else if (me.test(o)) {
                        a = a || f.appendChild(t.createElement("div")),
                        s = (de.exec(o) || ["", ""])[1].toLowerCase(),
                        u = ge[s] || ge._default,
                        a.innerHTML = u[1] + S.htmlPrefilter(o) + u[2],
                        c = u[0];
                        while (c--)
                            a = a.lastChild;
                        S.merge(p, a.childNodes),
                        (a = f.firstChild).textContent = ""
                    } else
                        p.push(t.createTextNode(o));
            f.textContent = "",
            d = 0;
            while (o = p[d++])
                if (r && -1 < S.inArray(o, r))
                    i && i.push(o);
                else if (l = ie(o),
                a = ve(f.appendChild(o), "script"),
                l && ye(a),
                n) {
                    c = 0;
                    while (o = a[c++])
                        he.test(o.type || "") && n.push(o)
                }
            return f
        }
        var be = /^key/
          , we = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
          , Te = /^([^.]*)(?:\.(.+)|)/;
        function Ce() {
            return !0
        }
        function Ee() {
            return !1
        }
        function Se(e, t) {
            return e === function() {
                try {
                    return E.activeElement
                } catch (e) {}
            }() == ("focus" === t)
        }
        function ke(e, t, n, r, i, o) {
            var a, s;
            if ("object" == typeof t) {
                for (s in "string" != typeof n && (r = r || n,
                n = void 0),
                t)
                    ke(e, s, n, r, t[s], o);
                return e
            }
            if (null == r && null == i ? (i = n,
            r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
            r = void 0) : (i = r,
            r = n,
            n = void 0)),
            !1 === i)
                i = Ee;
            else if (!i)
                return e;
            return 1 === o && (a = i,
            (i = function(e) {
                return S().off(e),
                a.apply(this, arguments)
            }
            ).guid = a.guid || (a.guid = S.guid++)),
            e.each(function() {
                S.event.add(this, t, i, r, n)
            })
        }
        function Ae(e, i, o) {
            o ? (Y.set(e, i, !1),
            S.event.add(e, i, {
                namespace: !1,
                handler: function(e) {
                    var t, n, r = Y.get(this, i);
                    if (1 & e.isTrigger && this[i]) {
                        if (r.length)
                            (S.event.special[i] || {}).delegateType && e.stopPropagation();
                        else if (r = s.call(arguments),
                        Y.set(this, i, r),
                        t = o(this, i),
                        this[i](),
                        r !== (n = Y.get(this, i)) || t ? Y.set(this, i, !1) : n = {},
                        r !== n)
                            return e.stopImmediatePropagation(),
                            e.preventDefault(),
                            n.value
                    } else
                        r.length && (Y.set(this, i, {
                            value: S.event.trigger(S.extend(r[0], S.Event.prototype), r.slice(1), this)
                        }),
                        e.stopImmediatePropagation())
                }
            })) : void 0 === Y.get(e, i) && S.event.add(e, i, Ce)
        }
        S.event = {
            global: {},
            add: function(t, e, n, r, i) {
                var o, a, s, u, l, c, f, p, d, h, g, v = Y.get(t);
                if (V(t)) {
                    n.handler && (n = (o = n).handler,
                    i = o.selector),
                    i && S.find.matchesSelector(re, i),
                    n.guid || (n.guid = S.guid++),
                    (u = v.events) || (u = v.events = Object.create(null)),
                    (a = v.handle) || (a = v.handle = function(e) {
                        return "undefined" != typeof S && S.event.triggered !== e.type ? S.event.dispatch.apply(t, arguments) : void 0
                    }
                    ),
                    l = (e = (e || "").match(P) || [""]).length;
                    while (l--)
                        d = g = (s = Te.exec(e[l]) || [])[1],
                        h = (s[2] || "").split(".").sort(),
                        d && (f = S.event.special[d] || {},
                        d = (i ? f.delegateType : f.bindType) || d,
                        f = S.event.special[d] || {},
                        c = S.extend({
                            type: d,
                            origType: g,
                            data: r,
                            handler: n,
                            guid: n.guid,
                            selector: i,
                            needsContext: i && S.expr.match.needsContext.test(i),
                            namespace: h.join(".")
                        }, o),
                        (p = u[d]) || ((p = u[d] = []).delegateCount = 0,
                        f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(d, a)),
                        f.add && (f.add.call(t, c),
                        c.handler.guid || (c.handler.guid = n.guid)),
                        i ? p.splice(p.delegateCount++, 0, c) : p.push(c),
                        S.event.global[d] = !0)
                }
            },
            remove: function(e, t, n, r, i) {
                var o, a, s, u, l, c, f, p, d, h, g, v = Y.hasData(e) && Y.get(e);
                if (v && (u = v.events)) {
                    l = (t = (t || "").match(P) || [""]).length;
                    while (l--)
                        if (d = g = (s = Te.exec(t[l]) || [])[1],
                        h = (s[2] || "").split(".").sort(),
                        d) {
                            f = S.event.special[d] || {},
                            p = u[d = (r ? f.delegateType : f.bindType) || d] || [],
                            s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            a = o = p.length;
                            while (o--)
                                c = p[o],
                                !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (p.splice(o, 1),
                                c.selector && p.delegateCount--,
                                f.remove && f.remove.call(e, c));
                            a && !p.length && (f.teardown && !1 !== f.teardown.call(e, h, v.handle) || S.removeEvent(e, d, v.handle),
                            delete u[d])
                        } else
                            for (d in u)
                                S.event.remove(e, d + t[l], n, r, !0);
                    S.isEmptyObject(u) && Y.remove(e, "handle events")
                }
            },
            dispatch: function(e) {
                var t, n, r, i, o, a, s = new Array(arguments.length), u = S.event.fix(e), l = (Y.get(this, "events") || Object.create(null))[u.type] || [], c = S.event.special[u.type] || {};
                for (s[0] = u,
                t = 1; t < arguments.length; t++)
                    s[t] = arguments[t];
                if (u.delegateTarget = this,
                !c.preDispatch || !1 !== c.preDispatch.call(this, u)) {
                    a = S.event.handlers.call(this, u, l),
                    t = 0;
                    while ((i = a[t++]) && !u.isPropagationStopped()) {
                        u.currentTarget = i.elem,
                        n = 0;
                        while ((o = i.handlers[n++]) && !u.isImmediatePropagationStopped())
                            u.rnamespace && !1 !== o.namespace && !u.rnamespace.test(o.namespace) || (u.handleObj = o,
                            u.data = o.data,
                            void 0 !== (r = ((S.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (u.result = r) && (u.preventDefault(),
                            u.stopPropagation()))
                    }
                    return c.postDispatch && c.postDispatch.call(this, u),
                    u.result
                }
            },
            handlers: function(e, t) {
                var n, r, i, o, a, s = [], u = t.delegateCount, l = e.target;
                if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                    for (; l !== this; l = l.parentNode || this)
                        if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                            for (o = [],
                            a = {},
                            n = 0; n < u; n++)
                                void 0 === a[i = (r = t[n]).selector + " "] && (a[i] = r.needsContext ? -1 < S(i, this).index(l) : S.find(i, this, null, [l]).length),
                                a[i] && o.push(r);
                            o.length && s.push({
                                elem: l,
                                handlers: o
                            })
                        }
                return l = this,
                u < t.length && s.push({
                    elem: l,
                    handlers: t.slice(u)
                }),
                s
            },
            addProp: function(t, e) {
                Object.defineProperty(S.Event.prototype, t, {
                    enumerable: !0,
                    configurable: !0,
                    get: m(e) ? function() {
                        if (this.originalEvent)
                            return e(this.originalEvent)
                    }
                    : function() {
                        if (this.originalEvent)
                            return this.originalEvent[t]
                    }
                    ,
                    set: function(e) {
                        Object.defineProperty(this, t, {
                            enumerable: !0,
                            configurable: !0,
                            writable: !0,
                            value: e
                        })
                    }
                })
            },
            fix: function(e) {
                return e[S.expando] ? e : new S.Event(e)
            },
            special: {
                load: {
                    noBubble: !0
                },
                click: {
                    setup: function(e) {
                        var t = this || e;
                        return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click", Ce),
                        !1
                    },
                    trigger: function(e) {
                        var t = this || e;
                        return pe.test(t.type) && t.click && A(t, "input") && Ae(t, "click"),
                        !0
                    },
                    _default: function(e) {
                        var t = e.target;
                        return pe.test(t.type) && t.click && A(t, "input") && Y.get(t, "click") || A(t, "a")
                    }
                },
                beforeunload: {
                    postDispatch: function(e) {
                        void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                    }
                }
            }
        },
        S.removeEvent = function(e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }
        ,
        S.Event = function(e, t) {
            if (!(this instanceof S.Event))
                return new S.Event(e,t);
            e && e.type ? (this.originalEvent = e,
            this.type = e.type,
            this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? Ce : Ee,
            this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target,
            this.currentTarget = e.currentTarget,
            this.relatedTarget = e.relatedTarget) : this.type = e,
            t && S.extend(this, t),
            this.timeStamp = e && e.timeStamp || Date.now(),
            this[S.expando] = !0
        }
        ,
        S.Event.prototype = {
            constructor: S.Event,
            isDefaultPrevented: Ee,
            isPropagationStopped: Ee,
            isImmediatePropagationStopped: Ee,
            isSimulated: !1,
            preventDefault: function() {
                var e = this.originalEvent;
                this.isDefaultPrevented = Ce,
                e && !this.isSimulated && e.preventDefault()
            },
            stopPropagation: function() {
                var e = this.originalEvent;
                this.isPropagationStopped = Ce,
                e && !this.isSimulated && e.stopPropagation()
            },
            stopImmediatePropagation: function() {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = Ce,
                e && !this.isSimulated && e.stopImmediatePropagation(),
                this.stopPropagation()
            }
        },
        S.each({
            altKey: !0,
            bubbles: !0,
            cancelable: !0,
            changedTouches: !0,
            ctrlKey: !0,
            detail: !0,
            eventPhase: !0,
            metaKey: !0,
            pageX: !0,
            pageY: !0,
            shiftKey: !0,
            view: !0,
            "char": !0,
            code: !0,
            charCode: !0,
            key: !0,
            keyCode: !0,
            button: !0,
            buttons: !0,
            clientX: !0,
            clientY: !0,
            offsetX: !0,
            offsetY: !0,
            pointerId: !0,
            pointerType: !0,
            screenX: !0,
            screenY: !0,
            targetTouches: !0,
            toElement: !0,
            touches: !0,
            which: function(e) {
                var t = e.button;
                return null == e.which && be.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && void 0 !== t && we.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
            }
        }, S.event.addProp),
        S.each({
            focus: "focusin",
            blur: "focusout"
        }, function(e, t) {
            S.event.special[e] = {
                setup: function() {
                    return Ae(this, e, Se),
                    !1
                },
                trigger: function() {
                    return Ae(this, e),
                    !0
                },
                delegateType: t
            }
        }),
        S.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, function(e, i) {
            S.event.special[e] = {
                delegateType: i,
                bindType: i,
                handle: function(e) {
                    var t, n = e.relatedTarget, r = e.handleObj;
                    return n && (n === this || S.contains(this, n)) || (e.type = r.origType,
                    t = r.handler.apply(this, arguments),
                    e.type = i),
                    t
                }
            }
        }),
        S.fn.extend({
            on: function(e, t, n, r) {
                return ke(this, e, t, n, r)
            },
            one: function(e, t, n, r) {
                return ke(this, e, t, n, r, 1)
            },
            off: function(e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)
                    return r = e.handleObj,
                    S(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                    this;
                if ("object" == typeof e) {
                    for (i in e)
                        this.off(i, t, e[i]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (n = t,
                t = void 0),
                !1 === n && (n = Ee),
                this.each(function() {
                    S.event.remove(this, e, n, t)
                })
            }
        });
        var Ne = /<script|<style|<link/i
          , De = /checked\s*(?:[^=]|=\s*.checked.)/i
          , je = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
        function qe(e, t) {
            return A(e, "table") && A(11 !== t.nodeType ? t : t.firstChild, "tr") && S(e).children("tbody")[0] || e
        }
        function Le(e) {
            return e.type = (null !== e.getAttribute("type")) + "/" + e.type,
            e
        }
        function He(e) {
            return "true/" === (e.type || "").slice(0, 5) ? e.type = e.type.slice(5) : e.removeAttribute("type"),
            e
        }
        function Oe(e, t) {
            var n, r, i, o, a, s;
            if (1 === t.nodeType) {
                if (Y.hasData(e) && (s = Y.get(e).events))
                    for (i in Y.remove(t, "handle events"),
                    s)
                        for (n = 0,
                        r = s[i].length; n < r; n++)
                            S.event.add(t, i, s[i][n]);
                Q.hasData(e) && (o = Q.access(e),
                a = S.extend({}, o),
                Q.set(t, a))
            }
        }
        function Pe(n, r, i, o) {
            r = g(r);
            var e, t, a, s, u, l, c = 0, f = n.length, p = f - 1, d = r[0], h = m(d);
            if (h || 1 < f && "string" == typeof d && !y.checkClone && De.test(d))
                return n.each(function(e) {
                    var t = n.eq(e);
                    h && (r[0] = d.call(this, e, t.html())),
                    Pe(t, r, i, o)
                });
            if (f && (t = (e = xe(r, n[0].ownerDocument, !1, n, o)).firstChild,
            1 === e.childNodes.length && (e = t),
            t || o)) {
                for (s = (a = S.map(ve(e, "script"), Le)).length; c < f; c++)
                    u = e,
                    c !== p && (u = S.clone(u, !0, !0),
                    s && S.merge(a, ve(u, "script"))),
                    i.call(n[c], u, c);
                if (s)
                    for (l = a[a.length - 1].ownerDocument,
                    S.map(a, He),
                    c = 0; c < s; c++)
                        u = a[c],
                        he.test(u.type || "") && !Y.access(u, "globalEval") && S.contains(l, u) && (u.src && "module" !== (u.type || "").toLowerCase() ? S._evalUrl && !u.noModule && S._evalUrl(u.src, {
                            nonce: u.nonce || u.getAttribute("nonce")
                        }, l) : b(u.textContent.replace(je, ""), u, l))
            }
            return n
        }
        function Re(e, t, n) {
            for (var r, i = t ? S.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
                n || 1 !== r.nodeType || S.cleanData(ve(r)),
                r.parentNode && (n && ie(r) && ye(ve(r, "script")),
                r.parentNode.removeChild(r));
            return e
        }
        S.extend({
            htmlPrefilter: function(e) {
                return e
            },
            clone: function(e, t, n) {
                var r, i, o, a, s, u, l, c = e.cloneNode(!0), f = ie(e);
                if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || S.isXMLDoc(e)))
                    for (a = ve(c),
                    r = 0,
                    i = (o = ve(e)).length; r < i; r++)
                        s = o[r],
                        u = a[r],
                        void 0,
                        "input" === (l = u.nodeName.toLowerCase()) && pe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
                if (t)
                    if (n)
                        for (o = o || ve(e),
                        a = a || ve(c),
                        r = 0,
                        i = o.length; r < i; r++)
                            Oe(o[r], a[r]);
                    else
                        Oe(e, c);
                return 0 < (a = ve(c, "script")).length && ye(a, !f && ve(e, "script")),
                c
            },
            cleanData: function(e) {
                for (var t, n, r, i = S.event.special, o = 0; void 0 !== (n = e[o]); o++)
                    if (V(n)) {
                        if (t = n[Y.expando]) {
                            if (t.events)
                                for (r in t.events)
                                    i[r] ? S.event.remove(n, r) : S.removeEvent(n, r, t.handle);
                            n[Y.expando] = void 0
                        }
                        n[Q.expando] && (n[Q.expando] = void 0)
                    }
            }
        }),
        S.fn.extend({
            detach: function(e) {
                return Re(this, e, !0)
            },
            remove: function(e) {
                return Re(this, e)
            },
            text: function(e) {
                return $(this, function(e) {
                    return void 0 === e ? S.text(this) : this.empty().each(function() {
                        1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                    })
                }, null, e, arguments.length)
            },
            append: function() {
                return Pe(this, arguments, function(e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || qe(this, e).appendChild(e)
                })
            },
            prepend: function() {
                return Pe(this, arguments, function(e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = qe(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                })
            },
            before: function() {
                return Pe(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                })
            },
            after: function() {
                return Pe(this, arguments, function(e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                })
            },
            empty: function() {
                for (var e, t = 0; null != (e = this[t]); t++)
                    1 === e.nodeType && (S.cleanData(ve(e, !1)),
                    e.textContent = "");
                return this
            },
            clone: function(e, t) {
                return e = null != e && e,
                t = null == t ? e : t,
                this.map(function() {
                    return S.clone(this, e, t)
                })
            },
            html: function(e) {
                return $(this, function(e) {
                    var t = this[0] || {}
                      , n = 0
                      , r = this.length;
                    if (void 0 === e && 1 === t.nodeType)
                        return t.innerHTML;
                    if ("string" == typeof e && !Ne.test(e) && !ge[(de.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = S.htmlPrefilter(e);
                        try {
                            for (; n < r; n++)
                                1 === (t = this[n] || {}).nodeType && (S.cleanData(ve(t, !1)),
                                t.innerHTML = e);
                            t = 0
                        } catch (e) {}
                    }
                    t && this.empty().append(e)
                }, null, e, arguments.length)
            },
            replaceWith: function() {
                var n = [];
                return Pe(this, arguments, function(e) {
                    var t = this.parentNode;
                    S.inArray(this, n) < 0 && (S.cleanData(ve(this)),
                    t && t.replaceChild(e, this))
                }, n)
            }
        }),
        S.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(e, a) {
            S.fn[e] = function(e) {
                for (var t, n = [], r = S(e), i = r.length - 1, o = 0; o <= i; o++)
                    t = o === i ? this : this.clone(!0),
                    S(r[o])[a](t),
                    u.apply(n, t.get());
                return this.pushStack(n)
            }
        });
        var Me = new RegExp("^(" + ee + ")(?!px)[a-z%]+$","i")
          , Ie = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = C),
            t.getComputedStyle(e)
        }
          , We = function(e, t, n) {
            var r, i, o = {};
            for (i in t)
                o[i] = e.style[i],
                e.style[i] = t[i];
            for (i in r = n.call(e),
            t)
                e.style[i] = o[i];
            return r
        }
          , Fe = new RegExp(ne.join("|"),"i");
        function Be(e, t, n) {
            var r, i, o, a, s = e.style;
            return (n = n || Ie(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || ie(e) || (a = S.style(e, t)),
            !y.pixelBoxStyles() && Me.test(a) && Fe.test(t) && (r = s.width,
            i = s.minWidth,
            o = s.maxWidth,
            s.minWidth = s.maxWidth = s.width = a,
            a = n.width,
            s.width = r,
            s.minWidth = i,
            s.maxWidth = o)),
            void 0 !== a ? a + "" : a
        }
        function $e(e, t) {
            return {
                get: function() {
                    if (!e())
                        return (this.get = t).apply(this, arguments);
                    delete this.get
                }
            }
        }
        !function() {
            function e() {
                if (l) {
                    u.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0",
                    l.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%",
                    re.appendChild(u).appendChild(l);
                    var e = C.getComputedStyle(l);
                    n = "1%" !== e.top,
                    s = 12 === t(e.marginLeft),
                    l.style.right = "60%",
                    o = 36 === t(e.right),
                    r = 36 === t(e.width),
                    l.style.position = "absolute",
                    i = 12 === t(l.offsetWidth / 3),
                    re.removeChild(u),
                    l = null
                }
            }
            function t(e) {
                return Math.round(parseFloat(e))
            }
            var n, r, i, o, a, s, u = E.createElement("div"), l = E.createElement("div");
            l.style && (l.style.backgroundClip = "content-box",
            l.cloneNode(!0).style.backgroundClip = "",
            y.clearCloneStyle = "content-box" === l.style.backgroundClip,
            S.extend(y, {
                boxSizingReliable: function() {
                    return e(),
                    r
                },
                pixelBoxStyles: function() {
                    return e(),
                    o
                },
                pixelPosition: function() {
                    return e(),
                    n
                },
                reliableMarginLeft: function() {
                    return e(),
                    s
                },
                scrollboxSize: function() {
                    return e(),
                    i
                },
                reliableTrDimensions: function() {
                    var e, t, n, r;
                    return null == a && (e = E.createElement("table"),
                    t = E.createElement("tr"),
                    n = E.createElement("div"),
                    e.style.cssText = "position:absolute;left:-11111px",
                    t.style.height = "1px",
                    n.style.height = "9px",
                    re.appendChild(e).appendChild(t).appendChild(n),
                    r = C.getComputedStyle(t),
                    a = 3 < parseInt(r.height),
                    re.removeChild(e)),
                    a
                }
            }))
        }();
        var _e = ["Webkit", "Moz", "ms"]
          , ze = E.createElement("div").style
          , Ue = {};
        function Xe(e) {
            var t = S.cssProps[e] || Ue[e];
            return t || (e in ze ? e : Ue[e] = function(e) {
                var t = e[0].toUpperCase() + e.slice(1)
                  , n = _e.length;
                while (n--)
                    if ((e = _e[n] + t)in ze)
                        return e
            }(e) || e)
        }
        var Ve = /^(none|table(?!-c[ea]).+)/
          , Ge = /^--/
          , Ye = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
          , Qe = {
            letterSpacing: "0",
            fontWeight: "400"
        };
        function Je(e, t, n) {
            var r = te.exec(t);
            return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
        }
        function Ke(e, t, n, r, i, o) {
            var a = "width" === t ? 1 : 0
              , s = 0
              , u = 0;
            if (n === (r ? "border" : "content"))
                return 0;
            for (; a < 4; a += 2)
                "margin" === n && (u += S.css(e, n + ne[a], !0, i)),
                r ? ("content" === n && (u -= S.css(e, "padding" + ne[a], !0, i)),
                "margin" !== n && (u -= S.css(e, "border" + ne[a] + "Width", !0, i))) : (u += S.css(e, "padding" + ne[a], !0, i),
                "padding" !== n ? u += S.css(e, "border" + ne[a] + "Width", !0, i) : s += S.css(e, "border" + ne[a] + "Width", !0, i));
            return !r && 0 <= o && (u += Math.max(0, Math.ceil(e["offset" + t[0].toUpperCase() + t.slice(1)] - o - u - s - .5)) || 0),
            u
        }
        function Ze(e, t, n) {
            var r = Ie(e)
              , i = (!y.boxSizingReliable() || n) && "border-box" === S.css(e, "boxSizing", !1, r)
              , o = i
              , a = Be(e, t, r)
              , s = "offset" + t[0].toUpperCase() + t.slice(1);
            if (Me.test(a)) {
                if (!n)
                    return a;
                a = "auto"
            }
            return (!y.boxSizingReliable() && i || !y.reliableTrDimensions() && A(e, "tr") || "auto" === a || !parseFloat(a) && "inline" === S.css(e, "display", !1, r)) && e.getClientRects().length && (i = "border-box" === S.css(e, "boxSizing", !1, r),
            (o = s in e) && (a = e[s])),
            (a = parseFloat(a) || 0) + Ke(e, t, n || (i ? "border" : "content"), o, r, a) + "px"
        }
        function et(e, t, n, r, i) {
            return new et.prototype.init(e,t,n,r,i)
        }
        S.extend({
            cssHooks: {
                opacity: {
                    get: function(e, t) {
                        if (t) {
                            var n = Be(e, "opacity");
                            return "" === n ? "1" : n
                        }
                    }
                }
            },
            cssNumber: {
                animationIterationCount: !0,
                columnCount: !0,
                fillOpacity: !0,
                flexGrow: !0,
                flexShrink: !0,
                fontWeight: !0,
                gridArea: !0,
                gridColumn: !0,
                gridColumnEnd: !0,
                gridColumnStart: !0,
                gridRow: !0,
                gridRowEnd: !0,
                gridRowStart: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {},
            style: function(e, t, n, r) {
                if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                    var i, o, a, s = X(t), u = Ge.test(t), l = e.style;
                    if (u || (t = Xe(s)),
                    a = S.cssHooks[t] || S.cssHooks[s],
                    void 0 === n)
                        return a && "get"in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                    "string" === (o = typeof n) && (i = te.exec(n)) && i[1] && (n = se(e, t, i),
                    o = "number"),
                    null != n && n == n && ("number" !== o || u || (n += i && i[3] || (S.cssNumber[s] ? "" : "px")),
                    y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                    a && "set"in a && void 0 === (n = a.set(e, n, r)) || (u ? l.setProperty(t, n) : l[t] = n))
                }
            },
            css: function(e, t, n, r) {
                var i, o, a, s = X(t);
                return Ge.test(t) || (t = Xe(s)),
                (a = S.cssHooks[t] || S.cssHooks[s]) && "get"in a && (i = a.get(e, !0, n)),
                void 0 === i && (i = Be(e, t, r)),
                "normal" === i && t in Qe && (i = Qe[t]),
                "" === n || n ? (o = parseFloat(i),
                !0 === n || isFinite(o) ? o || 0 : i) : i
            }
        }),
        S.each(["height", "width"], function(e, u) {
            S.cssHooks[u] = {
                get: function(e, t, n) {
                    if (t)
                        return !Ve.test(S.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ze(e, u, n) : We(e, Ye, function() {
                            return Ze(e, u, n)
                        })
                },
                set: function(e, t, n) {
                    var r, i = Ie(e), o = !y.scrollboxSize() && "absolute" === i.position, a = (o || n) && "border-box" === S.css(e, "boxSizing", !1, i), s = n ? Ke(e, u, n, a, i) : 0;
                    return a && o && (s -= Math.ceil(e["offset" + u[0].toUpperCase() + u.slice(1)] - parseFloat(i[u]) - Ke(e, u, "border", !1, i) - .5)),
                    s && (r = te.exec(t)) && "px" !== (r[3] || "px") && (e.style[u] = t,
                    t = S.css(e, u)),
                    Je(0, t, s)
                }
            }
        }),
        S.cssHooks.marginLeft = $e(y.reliableMarginLeft, function(e, t) {
            if (t)
                return (parseFloat(Be(e, "marginLeft")) || e.getBoundingClientRect().left - We(e, {
                    marginLeft: 0
                }, function() {
                    return e.getBoundingClientRect().left
                })) + "px"
        }),
        S.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(i, o) {
            S.cssHooks[i + o] = {
                expand: function(e) {
                    for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                        n[i + ne[t] + o] = r[t] || r[t - 2] || r[0];
                    return n
                }
            },
            "margin" !== i && (S.cssHooks[i + o].set = Je)
        }),
        S.fn.extend({
            css: function(e, t) {
                return $(this, function(e, t, n) {
                    var r, i, o = {}, a = 0;
                    if (Array.isArray(t)) {
                        for (r = Ie(e),
                        i = t.length; a < i; a++)
                            o[t[a]] = S.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? S.style(e, t, n) : S.css(e, t)
                }, e, t, 1 < arguments.length)
            }
        }),
        ((S.Tween = et).prototype = {
            constructor: et,
            init: function(e, t, n, r, i, o) {
                this.elem = e,
                this.prop = n,
                this.easing = i || S.easing._default,
                this.options = t,
                this.start = this.now = this.cur(),
                this.end = r,
                this.unit = o || (S.cssNumber[n] ? "" : "px")
            },
            cur: function() {
                var e = et.propHooks[this.prop];
                return e && e.get ? e.get(this) : et.propHooks._default.get(this)
            },
            run: function(e) {
                var t, n = et.propHooks[this.prop];
                return this.options.duration ? this.pos = t = S.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                this.now = (this.end - this.start) * t + this.start,
                this.options.step && this.options.step.call(this.elem, this.now, this),
                n && n.set ? n.set(this) : et.propHooks._default.set(this),
                this
            }
        }).init.prototype = et.prototype,
        (et.propHooks = {
            _default: {
                get: function(e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = S.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function(e) {
                    S.fx.step[e.prop] ? S.fx.step[e.prop](e) : 1 !== e.elem.nodeType || !S.cssHooks[e.prop] && null == e.elem.style[Xe(e.prop)] ? e.elem[e.prop] = e.now : S.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        }).scrollTop = et.propHooks.scrollLeft = {
            set: function(e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        S.easing = {
            linear: function(e) {
                return e
            },
            swing: function(e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        },
        S.fx = et.prototype.init,
        S.fx.step = {};
        var tt, nt, rt, it, ot = /^(?:toggle|show|hide)$/, at = /queueHooks$/;
        function st() {
            nt && (!1 === E.hidden && C.requestAnimationFrame ? C.requestAnimationFrame(st) : C.setTimeout(st, S.fx.interval),
            S.fx.tick())
        }
        function ut() {
            return C.setTimeout(function() {
                tt = void 0
            }),
            tt = Date.now()
        }
        function lt(e, t) {
            var n, r = 0, i = {
                height: e
            };
            for (t = t ? 1 : 0; r < 4; r += 2 - t)
                i["margin" + (n = ne[r])] = i["padding" + n] = e;
            return t && (i.opacity = i.width = e),
            i
        }
        function ct(e, t, n) {
            for (var r, i = (ft.tweeners[t] || []).concat(ft.tweeners["*"]), o = 0, a = i.length; o < a; o++)
                if (r = i[o].call(n, t, e))
                    return r
        }
        function ft(o, e, t) {
            var n, a, r = 0, i = ft.prefilters.length, s = S.Deferred().always(function() {
                delete u.elem
            }), u = function() {
                if (a)
                    return !1;
                for (var e = tt || ut(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++)
                    l.tweens[r].run(n);
                return s.notifyWith(o, [l, n, t]),
                n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]),
                s.resolveWith(o, [l]),
                !1)
            }, l = s.promise({
                elem: o,
                props: S.extend({}, e),
                opts: S.extend(!0, {
                    specialEasing: {},
                    easing: S.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: tt || ut(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    var n = S.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(n),
                    n
                },
                stop: function(e) {
                    var t = 0
                      , n = e ? l.tweens.length : 0;
                    if (a)
                        return this;
                    for (a = !0; t < n; t++)
                        l.tweens[t].run(1);
                    return e ? (s.notifyWith(o, [l, 1, 0]),
                    s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]),
                    this
                }
            }), c = l.props;
            for (!function(e, t) {
                var n, r, i, o, a;
                for (n in e)
                    if (i = t[r = X(n)],
                    o = e[n],
                    Array.isArray(o) && (i = o[1],
                    o = e[n] = o[0]),
                    n !== r && (e[r] = o,
                    delete e[n]),
                    (a = S.cssHooks[r]) && "expand"in a)
                        for (n in o = a.expand(o),
                        delete e[r],
                        o)
                            n in e || (e[n] = o[n],
                            t[n] = i);
                    else
                        t[r] = i
            }(c, l.opts.specialEasing); r < i; r++)
                if (n = ft.prefilters[r].call(l, o, c, l.opts))
                    return m(n.stop) && (S._queueHooks(l.elem, l.opts.queue).stop = n.stop.bind(n)),
                    n;
            return S.map(c, ct, l),
            m(l.opts.start) && l.opts.start.call(o, l),
            l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always),
            S.fx.timer(S.extend(u, {
                elem: o,
                anim: l,
                queue: l.opts.queue
            })),
            l
        }
        S.Animation = S.extend(ft, {
            tweeners: {
                "*": [function(e, t) {
                    var n = this.createTween(e, t);
                    return se(n.elem, e, te.exec(t), n),
                    n
                }
                ]
            },
            tweener: function(e, t) {
                m(e) ? (t = e,
                e = ["*"]) : e = e.match(P);
                for (var n, r = 0, i = e.length; r < i; r++)
                    n = e[r],
                    ft.tweeners[n] = ft.tweeners[n] || [],
                    ft.tweeners[n].unshift(t)
            },
            prefilters: [function(e, t, n) {
                var r, i, o, a, s, u, l, c, f = "width"in t || "height"in t, p = this, d = {}, h = e.style, g = e.nodeType && ae(e), v = Y.get(e, "fxshow");
                for (r in n.queue || (null == (a = S._queueHooks(e, "fx")).unqueued && (a.unqueued = 0,
                s = a.empty.fire,
                a.empty.fire = function() {
                    a.unqueued || s()
                }
                ),
                a.unqueued++,
                p.always(function() {
                    p.always(function() {
                        a.unqueued--,
                        S.queue(e, "fx").length || a.empty.fire()
                    })
                })),
                t)
                    if (i = t[r],
                    ot.test(i)) {
                        if (delete t[r],
                        o = o || "toggle" === i,
                        i === (g ? "hide" : "show")) {
                            if ("show" !== i || !v || void 0 === v[r])
                                continue;
                            g = !0
                        }
                        d[r] = v && v[r] || S.style(e, r)
                    }
                if ((u = !S.isEmptyObject(t)) || !S.isEmptyObject(d))
                    for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY],
                    null == (l = v && v.display) && (l = Y.get(e, "display")),
                    "none" === (c = S.css(e, "display")) && (l ? c = l : (le([e], !0),
                    l = e.style.display || l,
                    c = S.css(e, "display"),
                    le([e]))),
                    ("inline" === c || "inline-block" === c && null != l) && "none" === S.css(e, "float") && (u || (p.done(function() {
                        h.display = l
                    }),
                    null == l && (c = h.display,
                    l = "none" === c ? "" : c)),
                    h.display = "inline-block")),
                    n.overflow && (h.overflow = "hidden",
                    p.always(function() {
                        h.overflow = n.overflow[0],
                        h.overflowX = n.overflow[1],
                        h.overflowY = n.overflow[2]
                    })),
                    u = !1,
                    d)
                        u || (v ? "hidden"in v && (g = v.hidden) : v = Y.access(e, "fxshow", {
                            display: l
                        }),
                        o && (v.hidden = !g),
                        g && le([e], !0),
                        p.done(function() {
                            for (r in g || le([e]),
                            Y.remove(e, "fxshow"),
                            d)
                                S.style(e, r, d[r])
                        })),
                        u = ct(g ? v[r] : 0, r, p),
                        r in v || (v[r] = u.start,
                        g && (u.end = u.start,
                        u.start = 0))
            }
            ],
            prefilter: function(e, t) {
                t ? ft.prefilters.unshift(e) : ft.prefilters.push(e)
            }
        }),
        S.speed = function(e, t, n) {
            var r = e && "object" == typeof e ? S.extend({}, e) : {
                complete: n || !n && t || m(e) && e,
                duration: e,
                easing: n && t || t && !m(t) && t
            };
            return S.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in S.fx.speeds ? r.duration = S.fx.speeds[r.duration] : r.duration = S.fx.speeds._default),
            null != r.queue && !0 !== r.queue || (r.queue = "fx"),
            r.old = r.complete,
            r.complete = function() {
                m(r.old) && r.old.call(this),
                r.queue && S.dequeue(this, r.queue)
            }
            ,
            r
        }
        ,
        S.fn.extend({
            fadeTo: function(e, t, n, r) {
                return this.filter(ae).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function(t, e, n, r) {
                var i = S.isEmptyObject(t)
                  , o = S.speed(e, n, r)
                  , a = function() {
                    var e = ft(this, S.extend({}, t), o);
                    (i || Y.get(this, "finish")) && e.stop(!0)
                };
                return a.finish = a,
                i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function(i, e, o) {
                var a = function(e) {
                    var t = e.stop;
                    delete e.stop,
                    t(o)
                };
                return "string" != typeof i && (o = e,
                e = i,
                i = void 0),
                e && this.queue(i || "fx", []),
                this.each(function() {
                    var e = !0
                      , t = null != i && i + "queueHooks"
                      , n = S.timers
                      , r = Y.get(this);
                    if (t)
                        r[t] && r[t].stop && a(r[t]);
                    else
                        for (t in r)
                            r[t] && r[t].stop && at.test(t) && a(r[t]);
                    for (t = n.length; t--; )
                        n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o),
                        e = !1,
                        n.splice(t, 1));
                    !e && o || S.dequeue(this, i)
                })
            },
            finish: function(a) {
                return !1 !== a && (a = a || "fx"),
                this.each(function() {
                    var e, t = Y.get(this), n = t[a + "queue"], r = t[a + "queueHooks"], i = S.timers, o = n ? n.length : 0;
                    for (t.finish = !0,
                    S.queue(this, a, []),
                    r && r.stop && r.stop.call(this, !0),
                    e = i.length; e--; )
                        i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0),
                        i.splice(e, 1));
                    for (e = 0; e < o; e++)
                        n[e] && n[e].finish && n[e].finish.call(this);
                    delete t.finish
                })
            }
        }),
        S.each(["toggle", "show", "hide"], function(e, r) {
            var i = S.fn[r];
            S.fn[r] = function(e, t, n) {
                return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(lt(r, !0), e, t, n)
            }
        }),
        S.each({
            slideDown: lt("show"),
            slideUp: lt("hide"),
            slideToggle: lt("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(e, r) {
            S.fn[e] = function(e, t, n) {
                return this.animate(r, e, t, n)
            }
        }),
        S.timers = [],
        S.fx.tick = function() {
            var e, t = 0, n = S.timers;
            for (tt = Date.now(); t < n.length; t++)
                (e = n[t])() || n[t] !== e || n.splice(t--, 1);
            n.length || S.fx.stop(),
            tt = void 0
        }
        ,
        S.fx.timer = function(e) {
            S.timers.push(e),
            S.fx.start()
        }
        ,
        S.fx.interval = 13,
        S.fx.start = function() {
            nt || (nt = !0,
            st())
        }
        ,
        S.fx.stop = function() {
            nt = null
        }
        ,
        S.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        S.fn.delay = function(r, e) {
            return r = S.fx && S.fx.speeds[r] || r,
            e = e || "fx",
            this.queue(e, function(e, t) {
                var n = C.setTimeout(e, r);
                t.stop = function() {
                    C.clearTimeout(n)
                }
            })
        }
        ,
        rt = E.createElement("input"),
        it = E.createElement("select").appendChild(E.createElement("option")),
        rt.type = "checkbox",
        y.checkOn = "" !== rt.value,
        y.optSelected = it.selected,
        (rt = E.createElement("input")).value = "t",
        rt.type = "radio",
        y.radioValue = "t" === rt.value;
        var pt, dt = S.expr.attrHandle;
        S.fn.extend({
            attr: function(e, t) {
                return $(this, S.attr, e, t, 1 < arguments.length)
            },
            removeAttr: function(e) {
                return this.each(function() {
                    S.removeAttr(this, e)
                })
            }
        }),
        S.extend({
            attr: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return "undefined" == typeof e.getAttribute ? S.prop(e, t, n) : (1 === o && S.isXMLDoc(e) || (i = S.attrHooks[t.toLowerCase()] || (S.expr.match.bool.test(t) ? pt : void 0)),
                    void 0 !== n ? null === n ? void S.removeAttr(e, t) : i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                    n) : i && "get"in i && null !== (r = i.get(e, t)) ? r : null == (r = S.find.attr(e, t)) ? void 0 : r)
            },
            attrHooks: {
                type: {
                    set: function(e, t) {
                        if (!y.radioValue && "radio" === t && A(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                            n && (e.value = n),
                            t
                        }
                    }
                }
            },
            removeAttr: function(e, t) {
                var n, r = 0, i = t && t.match(P);
                if (i && 1 === e.nodeType)
                    while (n = i[r++])
                        e.removeAttribute(n)
            }
        }),
        pt = {
            set: function(e, t, n) {
                return !1 === t ? S.removeAttr(e, n) : e.setAttribute(n, n),
                n
            }
        },
        S.each(S.expr.match.bool.source.match(/\w+/g), function(e, t) {
            var a = dt[t] || S.find.attr;
            dt[t] = function(e, t, n) {
                var r, i, o = t.toLowerCase();
                return n || (i = dt[o],
                dt[o] = r,
                r = null != a(e, t, n) ? o : null,
                dt[o] = i),
                r
            }
        });
        var ht = /^(?:input|select|textarea|button)$/i
          , gt = /^(?:a|area)$/i;
        function vt(e) {
            return (e.match(P) || []).join(" ")
        }
        function yt(e) {
            return e.getAttribute && e.getAttribute("class") || ""
        }
        function mt(e) {
            return Array.isArray(e) ? e : "string" == typeof e && e.match(P) || []
        }
        S.fn.extend({
            prop: function(e, t) {
                return $(this, S.prop, e, t, 1 < arguments.length)
            },
            removeProp: function(e) {
                return this.each(function() {
                    delete this[S.propFix[e] || e]
                })
            }
        }),
        S.extend({
            prop: function(e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return 1 === o && S.isXMLDoc(e) || (t = S.propFix[t] || t,
                    i = S.propHooks[t]),
                    void 0 !== n ? i && "set"in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get"in i && null !== (r = i.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function(e) {
                        var t = S.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : ht.test(e.nodeName) || gt.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            }
        }),
        y.optSelected || (S.propHooks.selected = {
            get: function(e) {
                var t = e.parentNode;
                return t && t.parentNode && t.parentNode.selectedIndex,
                null
            },
            set: function(e) {
                var t = e.parentNode;
                t && (t.selectedIndex,
                t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        S.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            S.propFix[this.toLowerCase()] = this
        }),
        S.fn.extend({
            addClass: function(t) {
                var e, n, r, i, o, a, s, u = 0;
                if (m(t))
                    return this.each(function(e) {
                        S(this).addClass(t.call(this, e, yt(this)))
                    });
                if ((e = mt(t)).length)
                    while (n = this[u++])
                        if (i = yt(n),
                        r = 1 === n.nodeType && " " + vt(i) + " ") {
                            a = 0;
                            while (o = e[a++])
                                r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                            i !== (s = vt(r)) && n.setAttribute("class", s)
                        }
                return this
            },
            removeClass: function(t) {
                var e, n, r, i, o, a, s, u = 0;
                if (m(t))
                    return this.each(function(e) {
                        S(this).removeClass(t.call(this, e, yt(this)))
                    });
                if (!arguments.length)
                    return this.attr("class", "");
                if ((e = mt(t)).length)
                    while (n = this[u++])
                        if (i = yt(n),
                        r = 1 === n.nodeType && " " + vt(i) + " ") {
                            a = 0;
                            while (o = e[a++])
                                while (-1 < r.indexOf(" " + o + " "))
                                    r = r.replace(" " + o + " ", " ");
                            i !== (s = vt(r)) && n.setAttribute("class", s)
                        }
                return this
            },
            toggleClass: function(i, t) {
                var o = typeof i
                  , a = "string" === o || Array.isArray(i);
                return "boolean" == typeof t && a ? t ? this.addClass(i) : this.removeClass(i) : m(i) ? this.each(function(e) {
                    S(this).toggleClass(i.call(this, e, yt(this), t), t)
                }) : this.each(function() {
                    var e, t, n, r;
                    if (a) {
                        t = 0,
                        n = S(this),
                        r = mt(i);
                        while (e = r[t++])
                            n.hasClass(e) ? n.removeClass(e) : n.addClass(e)
                    } else
                        void 0 !== i && "boolean" !== o || ((e = yt(this)) && Y.set(this, "__className__", e),
                        this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : Y.get(this, "__className__") || ""))
                })
            },
            hasClass: function(e) {
                var t, n, r = 0;
                t = " " + e + " ";
                while (n = this[r++])
                    if (1 === n.nodeType && -1 < (" " + vt(yt(n)) + " ").indexOf(t))
                        return !0;
                return !1
            }
        });
        var xt = /\r/g;
        S.fn.extend({
            val: function(n) {
                var r, e, i, t = this[0];
                return arguments.length ? (i = m(n),
                this.each(function(e) {
                    var t;
                    1 === this.nodeType && (null == (t = i ? n.call(this, e, S(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = S.map(t, function(e) {
                        return null == e ? "" : e + ""
                    })),
                    (r = S.valHooks[this.type] || S.valHooks[this.nodeName.toLowerCase()]) && "set"in r && void 0 !== r.set(this, t, "value") || (this.value = t))
                })) : t ? (r = S.valHooks[t.type] || S.valHooks[t.nodeName.toLowerCase()]) && "get"in r && void 0 !== (e = r.get(t, "value")) ? e : "string" == typeof (e = t.value) ? e.replace(xt, "") : null == e ? "" : e : void 0
            }
        }),
        S.extend({
            valHooks: {
                option: {
                    get: function(e) {
                        var t = S.find.attr(e, "value");
                        return null != t ? t : vt(S.text(e))
                    }
                },
                select: {
                    get: function(e) {
                        var t, n, r, i = e.options, o = e.selectedIndex, a = "select-one" === e.type, s = a ? null : [], u = a ? o + 1 : i.length;
                        for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                            if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !A(n.parentNode, "optgroup"))) {
                                if (t = S(n).val(),
                                a)
                                    return t;
                                s.push(t)
                            }
                        return s
                    },
                    set: function(e, t) {
                        var n, r, i = e.options, o = S.makeArray(t), a = i.length;
                        while (a--)
                            ((r = i[a]).selected = -1 < S.inArray(S.valHooks.option.get(r), o)) && (n = !0);
                        return n || (e.selectedIndex = -1),
                        o
                    }
                }
            }
        }),
        S.each(["radio", "checkbox"], function() {
            S.valHooks[this] = {
                set: function(e, t) {
                    if (Array.isArray(t))
                        return e.checked = -1 < S.inArray(S(e).val(), t)
                }
            },
            y.checkOn || (S.valHooks[this].get = function(e) {
                return null === e.getAttribute("value") ? "on" : e.value
            }
            )
        }),
        y.focusin = "onfocusin"in C;
        var bt = /^(?:focusinfocus|focusoutblur)$/
          , wt = function(e) {
            e.stopPropagation()
        };
        S.extend(S.event, {
            trigger: function(e, t, n, r) {
                var i, o, a, s, u, l, c, f, p = [n || E], d = v.call(e, "type") ? e.type : e, h = v.call(e, "namespace") ? e.namespace.split(".") : [];
                if (o = f = a = n = n || E,
                3 !== n.nodeType && 8 !== n.nodeType && !bt.test(d + S.event.triggered) && (-1 < d.indexOf(".") && (d = (h = d.split(".")).shift(),
                h.sort()),
                u = d.indexOf(":") < 0 && "on" + d,
                (e = e[S.expando] ? e : new S.Event(d,"object" == typeof e && e)).isTrigger = r ? 2 : 3,
                e.namespace = h.join("."),
                e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                e.result = void 0,
                e.target || (e.target = n),
                t = null == t ? [e] : S.makeArray(t, [e]),
                c = S.event.special[d] || {},
                r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                    if (!r && !c.noBubble && !x(n)) {
                        for (s = c.delegateType || d,
                        bt.test(s + d) || (o = o.parentNode); o; o = o.parentNode)
                            p.push(o),
                            a = o;
                        a === (n.ownerDocument || E) && p.push(a.defaultView || a.parentWindow || C)
                    }
                    i = 0;
                    while ((o = p[i++]) && !e.isPropagationStopped())
                        f = o,
                        e.type = 1 < i ? s : c.bindType || d,
                        (l = (Y.get(o, "events") || Object.create(null))[e.type] && Y.get(o, "handle")) && l.apply(o, t),
                        (l = u && o[u]) && l.apply && V(o) && (e.result = l.apply(o, t),
                        !1 === e.result && e.preventDefault());
                    return e.type = d,
                    r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(p.pop(), t) || !V(n) || u && m(n[d]) && !x(n) && ((a = n[u]) && (n[u] = null),
                    S.event.triggered = d,
                    e.isPropagationStopped() && f.addEventListener(d, wt),
                    n[d](),
                    e.isPropagationStopped() && f.removeEventListener(d, wt),
                    S.event.triggered = void 0,
                    a && (n[u] = a)),
                    e.result
                }
            },
            simulate: function(e, t, n) {
                var r = S.extend(new S.Event, n, {
                    type: e,
                    isSimulated: !0
                });
                S.event.trigger(r, null, t)
            }
        }),
        S.fn.extend({
            trigger: function(e, t) {
                return this.each(function() {
                    S.event.trigger(e, t, this)
                })
            },
            triggerHandler: function(e, t) {
                var n = this[0];
                if (n)
                    return S.event.trigger(e, t, n, !0)
            }
        }),
        y.focusin || S.each({
            focus: "focusin",
            blur: "focusout"
        }, function(n, r) {
            var i = function(e) {
                S.event.simulate(r, e.target, S.event.fix(e))
            };
            S.event.special[r] = {
                setup: function() {
                    var e = this.ownerDocument || this.document || this
                      , t = Y.access(e, r);
                    t || e.addEventListener(n, i, !0),
                    Y.access(e, r, (t || 0) + 1)
                },
                teardown: function() {
                    var e = this.ownerDocument || this.document || this
                      , t = Y.access(e, r) - 1;
                    t ? Y.access(e, r, t) : (e.removeEventListener(n, i, !0),
                    Y.remove(e, r))
                }
            }
        });
        var Tt = C.location
          , Ct = {
            guid: Date.now()
        }
          , Et = /\?/;
        S.parseXML = function(e) {
            var t;
            if (!e || "string" != typeof e)
                return null;
            try {
                t = (new C.DOMParser).parseFromString(e, "text/xml")
            } catch (e) {
                t = void 0
            }
            return t && !t.getElementsByTagName("parsererror").length || S.error("Invalid XML: " + e),
            t
        }
        ;
        var St = /\[\]$/
          , kt = /\r?\n/g
          , At = /^(?:submit|button|image|reset|file)$/i
          , Nt = /^(?:input|select|textarea|keygen)/i;
        function Dt(n, e, r, i) {
            var t;
            if (Array.isArray(e))
                S.each(e, function(e, t) {
                    r || St.test(n) ? i(n, t) : Dt(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
                });
            else if (r || "object" !== w(e))
                i(n, e);
            else
                for (t in e)
                    Dt(n + "[" + t + "]", e[t], r, i)
        }
        S.param = function(e, t) {
            var n, r = [], i = function(e, t) {
                var n = m(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
            if (null == e)
                return "";
            if (Array.isArray(e) || e.jquery && !S.isPlainObject(e))
                S.each(e, function() {
                    i(this.name, this.value)
                });
            else
                for (n in e)
                    Dt(n, e[n], t, i);
            return r.join("&")
        }
        ,
        S.fn.extend({
            serialize: function() {
                return S.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var e = S.prop(this, "elements");
                    return e ? S.makeArray(e) : this
                }).filter(function() {
                    var e = this.type;
                    return this.name && !S(this).is(":disabled") && Nt.test(this.nodeName) && !At.test(e) && (this.checked || !pe.test(e))
                }).map(function(e, t) {
                    var n = S(this).val();
                    return null == n ? null : Array.isArray(n) ? S.map(n, function(e) {
                        return {
                            name: t.name,
                            value: e.replace(kt, "\r\n")
                        }
                    }) : {
                        name: t.name,
                        value: n.replace(kt, "\r\n")
                    }
                }).get()
            }
        });
        var jt = /%20/g
          , qt = /#.*$/
          , Lt = /([?&])_=[^&]*/
          , Ht = /^(.*?):[ \t]*([^\r\n]*)$/gm
          , Ot = /^(?:GET|HEAD)$/
          , Pt = /^\/\//
          , Rt = {}
          , Mt = {}
          , It = "*/".concat("*")
          , Wt = E.createElement("a");
        function Ft(o) {
            return function(e, t) {
                "string" != typeof e && (t = e,
                e = "*");
                var n, r = 0, i = e.toLowerCase().match(P) || [];
                if (m(t))
                    while (n = i[r++])
                        "+" === n[0] ? (n = n.slice(1) || "*",
                        (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
            }
        }
        function Bt(t, i, o, a) {
            var s = {}
              , u = t === Mt;
            function l(e) {
                var r;
                return s[e] = !0,
                S.each(t[e] || [], function(e, t) {
                    var n = t(i, o, a);
                    return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n),
                    l(n),
                    !1)
                }),
                r
            }
            return l(i.dataTypes[0]) || !s["*"] && l("*")
        }
        function $t(e, t) {
            var n, r, i = S.ajaxSettings.flatOptions || {};
            for (n in t)
                void 0 !== t[n] && ((i[n] ? e : r || (r = {}))[n] = t[n]);
            return r && S.extend(!0, e, r),
            e
        }
        Wt.href = Tt.href,
        S.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Tt.href,
                type: "GET",
                isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Tt.protocol),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": It,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /\bxml\b/,
                    html: /\bhtml/,
                    json: /\bjson\b/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": JSON.parse,
                    "text xml": S.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(e, t) {
                return t ? $t($t(e, S.ajaxSettings), t) : $t(S.ajaxSettings, e)
            },
            ajaxPrefilter: Ft(Rt),
            ajaxTransport: Ft(Mt),
            ajax: function(e, t) {
                "object" == typeof e && (t = e,
                e = void 0),
                t = t || {};
                var c, f, p, n, d, r, h, g, i, o, v = S.ajaxSetup({}, t), y = v.context || v, m = v.context && (y.nodeType || y.jquery) ? S(y) : S.event, x = S.Deferred(), b = S.Callbacks("once memory"), w = v.statusCode || {}, a = {}, s = {}, u = "canceled", T = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (h) {
                            if (!n) {
                                n = {};
                                while (t = Ht.exec(p))
                                    n[t[1].toLowerCase() + " "] = (n[t[1].toLowerCase() + " "] || []).concat(t[2])
                            }
                            t = n[e.toLowerCase() + " "]
                        }
                        return null == t ? null : t.join(", ")
                    },
                    getAllResponseHeaders: function() {
                        return h ? p : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == h && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e,
                        a[e] = t),
                        this
                    },
                    overrideMimeType: function(e) {
                        return null == h && (v.mimeType = e),
                        this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (h)
                                T.always(e[T.status]);
                            else
                                for (t in e)
                                    w[t] = [w[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || u;
                        return c && c.abort(t),
                        l(0, t),
                        this
                    }
                };
                if (x.promise(T),
                v.url = ((e || v.url || Tt.href) + "").replace(Pt, Tt.protocol + "//"),
                v.type = t.method || t.type || v.method || v.type,
                v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""],
                null == v.crossDomain) {
                    r = E.createElement("a");
                    try {
                        r.href = v.url,
                        r.href = r.href,
                        v.crossDomain = Wt.protocol + "//" + Wt.host != r.protocol + "//" + r.host
                    } catch (e) {
                        v.crossDomain = !0
                    }
                }
                if (v.data && v.processData && "string" != typeof v.data && (v.data = S.param(v.data, v.traditional)),
                Bt(Rt, v, t, T),
                h)
                    return T;
                for (i in (g = S.event && v.global) && 0 == S.active++ && S.event.trigger("ajaxStart"),
                v.type = v.type.toUpperCase(),
                v.hasContent = !Ot.test(v.type),
                f = v.url.replace(qt, ""),
                v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(jt, "+")) : (o = v.url.slice(f.length),
                v.data && (v.processData || "string" == typeof v.data) && (f += (Et.test(f) ? "&" : "?") + v.data,
                delete v.data),
                !1 === v.cache && (f = f.replace(Lt, "$1"),
                o = (Et.test(f) ? "&" : "?") + "_=" + Ct.guid++ + o),
                v.url = f + o),
                v.ifModified && (S.lastModified[f] && T.setRequestHeader("If-Modified-Since", S.lastModified[f]),
                S.etag[f] && T.setRequestHeader("If-None-Match", S.etag[f])),
                (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && T.setRequestHeader("Content-Type", v.contentType),
                T.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + It + "; q=0.01" : "") : v.accepts["*"]),
                v.headers)
                    T.setRequestHeader(i, v.headers[i]);
                if (v.beforeSend && (!1 === v.beforeSend.call(y, T, v) || h))
                    return T.abort();
                if (u = "abort",
                b.add(v.complete),
                T.done(v.success),
                T.fail(v.error),
                c = Bt(Mt, v, t, T)) {
                    if (T.readyState = 1,
                    g && m.trigger("ajaxSend", [T, v]),
                    h)
                        return T;
                    v.async && 0 < v.timeout && (d = C.setTimeout(function() {
                        T.abort("timeout")
                    }, v.timeout));
                    try {
                        h = !1,
                        c.send(a, l)
                    } catch (e) {
                        if (h)
                            throw e;
                        l(-1, e)
                    }
                } else
                    l(-1, "No Transport");
                function l(e, t, n, r) {
                    var i, o, a, s, u, l = t;
                    h || (h = !0,
                    d && C.clearTimeout(d),
                    c = void 0,
                    p = r || "",
                    T.readyState = 0 < e ? 4 : 0,
                    i = 200 <= e && e < 300 || 304 === e,
                    n && (s = function(e, t, n) {
                        var r, i, o, a, s = e.contents, u = e.dataTypes;
                        while ("*" === u[0])
                            u.shift(),
                            void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                        if (r)
                            for (i in s)
                                if (s[i] && s[i].test(r)) {
                                    u.unshift(i);
                                    break
                                }
                        if (u[0]in n)
                            o = u[0];
                        else {
                            for (i in n) {
                                if (!u[0] || e.converters[i + " " + u[0]]) {
                                    o = i;
                                    break
                                }
                                a || (a = i)
                            }
                            o = o || a
                        }
                        if (o)
                            return o !== u[0] && u.unshift(o),
                            n[o]
                    }(v, T, n)),
                    !i && -1 < S.inArray("script", v.dataTypes) && (v.converters["text script"] = function() {}
                    ),
                    s = function(e, t, n, r) {
                        var i, o, a, s, u, l = {}, c = e.dataTypes.slice();
                        if (c[1])
                            for (a in e.converters)
                                l[a.toLowerCase()] = e.converters[a];
                        o = c.shift();
                        while (o)
                            if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                            !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                            u = o,
                            o = c.shift())
                                if ("*" === o)
                                    o = u;
                                else if ("*" !== u && u !== o) {
                                    if (!(a = l[u + " " + o] || l["* " + o]))
                                        for (i in l)
                                            if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                                !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0],
                                                c.unshift(s[1]));
                                                break
                                            }
                                    if (!0 !== a)
                                        if (a && e["throws"])
                                            t = a(t);
                                        else
                                            try {
                                                t = a(t)
                                            } catch (e) {
                                                return {
                                                    state: "parsererror",
                                                    error: a ? e : "No conversion from " + u + " to " + o
                                                }
                                            }
                                }
                        return {
                            state: "success",
                            data: t
                        }
                    }(v, s, T, i),
                    i ? (v.ifModified && ((u = T.getResponseHeader("Last-Modified")) && (S.lastModified[f] = u),
                    (u = T.getResponseHeader("etag")) && (S.etag[f] = u)),
                    204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state,
                    o = s.data,
                    i = !(a = s.error))) : (a = l,
                    !e && l || (l = "error",
                    e < 0 && (e = 0))),
                    T.status = e,
                    T.statusText = (t || l) + "",
                    i ? x.resolveWith(y, [o, l, T]) : x.rejectWith(y, [T, l, a]),
                    T.statusCode(w),
                    w = void 0,
                    g && m.trigger(i ? "ajaxSuccess" : "ajaxError", [T, v, i ? o : a]),
                    b.fireWith(y, [T, l]),
                    g && (m.trigger("ajaxComplete", [T, v]),
                    --S.active || S.event.trigger("ajaxStop")))
                }
                return T
            },
            getJSON: function(e, t, n) {
                return S.get(e, t, n, "json")
            },
            getScript: function(e, t) {
                return S.get(e, void 0, t, "script")
            }
        }),
        S.each(["get", "post"], function(e, i) {
            S[i] = function(e, t, n, r) {
                return m(t) && (r = r || n,
                n = t,
                t = void 0),
                S.ajax(S.extend({
                    url: e,
                    type: i,
                    dataType: r,
                    data: t,
                    success: n
                }, S.isPlainObject(e) && e))
            }
        }),
        S.ajaxPrefilter(function(e) {
            var t;
            for (t in e.headers)
                "content-type" === t.toLowerCase() && (e.contentType = e.headers[t] || "")
        }),
        S._evalUrl = function(e, t, n) {
            return S.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                converters: {
                    "text script": function() {}
                },
                dataFilter: function(e) {
                    S.globalEval(e, t, n)
                }
            })
        }
        ,
        S.fn.extend({
            wrapAll: function(e) {
                var t;
                return this[0] && (m(e) && (e = e.call(this[0])),
                t = S(e, this[0].ownerDocument).eq(0).clone(!0),
                this[0].parentNode && t.insertBefore(this[0]),
                t.map(function() {
                    var e = this;
                    while (e.firstElementChild)
                        e = e.firstElementChild;
                    return e
                }).append(this)),
                this
            },
            wrapInner: function(n) {
                return m(n) ? this.each(function(e) {
                    S(this).wrapInner(n.call(this, e))
                }) : this.each(function() {
                    var e = S(this)
                      , t = e.contents();
                    t.length ? t.wrapAll(n) : e.append(n)
                })
            },
            wrap: function(t) {
                var n = m(t);
                return this.each(function(e) {
                    S(this).wrapAll(n ? t.call(this, e) : t)
                })
            },
            unwrap: function(e) {
                return this.parent(e).not("body").each(function() {
                    S(this).replaceWith(this.childNodes)
                }),
                this
            }
        }),
        S.expr.pseudos.hidden = function(e) {
            return !S.expr.pseudos.visible(e)
        }
        ,
        S.expr.pseudos.visible = function(e) {
            return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
        }
        ,
        S.ajaxSettings.xhr = function() {
            try {
                return new C.XMLHttpRequest
            } catch (e) {}
        }
        ;
        var _t = {
            0: 200,
            1223: 204
        }
          , zt = S.ajaxSettings.xhr();
        y.cors = !!zt && "withCredentials"in zt,
        y.ajax = zt = !!zt,
        S.ajaxTransport(function(i) {
            var o, a;
            if (y.cors || zt && !i.crossDomain)
                return {
                    send: function(e, t) {
                        var n, r = i.xhr();
                        if (r.open(i.type, i.url, i.async, i.username, i.password),
                        i.xhrFields)
                            for (n in i.xhrFields)
                                r[n] = i.xhrFields[n];
                        for (n in i.mimeType && r.overrideMimeType && r.overrideMimeType(i.mimeType),
                        i.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"),
                        e)
                            r.setRequestHeader(n, e[n]);
                        o = function(e) {
                            return function() {
                                o && (o = a = r.onload = r.onerror = r.onabort = r.ontimeout = r.onreadystatechange = null,
                                "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(_t[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                    binary: r.response
                                } : {
                                    text: r.responseText
                                }, r.getAllResponseHeaders()))
                            }
                        }
                        ,
                        r.onload = o(),
                        a = r.onerror = r.ontimeout = o("error"),
                        void 0 !== r.onabort ? r.onabort = a : r.onreadystatechange = function() {
                            4 === r.readyState && C.setTimeout(function() {
                                o && a()
                            })
                        }
                        ,
                        o = o("abort");
                        try {
                            r.send(i.hasContent && i.data || null)
                        } catch (e) {
                            if (o)
                                throw e
                        }
                    },
                    abort: function() {
                        o && o()
                    }
                }
        }),
        S.ajaxPrefilter(function(e) {
            e.crossDomain && (e.contents.script = !1)
        }),
        S.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function(e) {
                    return S.globalEval(e),
                    e
                }
            }
        }),
        S.ajaxPrefilter("script", function(e) {
            void 0 === e.cache && (e.cache = !1),
            e.crossDomain && (e.type = "GET")
        }),
        S.ajaxTransport("script", function(n) {
            var r, i;
            if (n.crossDomain || n.scriptAttrs)
                return {
                    send: function(e, t) {
                        r = S("<script>").attr(n.scriptAttrs || {}).prop({
                            charset: n.scriptCharset,
                            src: n.url
                        }).on("load error", i = function(e) {
                            r.remove(),
                            i = null,
                            e && t("error" === e.type ? 404 : 200, e.type)
                        }
                        ),
                        E.head.appendChild(r[0])
                    },
                    abort: function() {
                        i && i()
                    }
                }
        });
        var Ut, Xt = [], Vt = /(=)\?(?=&|$)|\?\?/;
        S.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var e = Xt.pop() || S.expando + "_" + Ct.guid++;
                return this[e] = !0,
                e
            }
        }),
        S.ajaxPrefilter("json jsonp", function(e, t, n) {
            var r, i, o, a = !1 !== e.jsonp && (Vt.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && Vt.test(e.data) && "data");
            if (a || "jsonp" === e.dataTypes[0])
                return r = e.jsonpCallback = m(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback,
                a ? e[a] = e[a].replace(Vt, "$1" + r) : !1 !== e.jsonp && (e.url += (Et.test(e.url) ? "&" : "?") + e.jsonp + "=" + r),
                e.converters["script json"] = function() {
                    return o || S.error(r + " was not called"),
                    o[0]
                }
                ,
                e.dataTypes[0] = "json",
                i = C[r],
                C[r] = function() {
                    o = arguments
                }
                ,
                n.always(function() {
                    void 0 === i ? S(C).removeProp(r) : C[r] = i,
                    e[r] && (e.jsonpCallback = t.jsonpCallback,
                    Xt.push(r)),
                    o && m(i) && i(o[0]),
                    o = i = void 0
                }),
                "script"
        }),
        y.createHTMLDocument = ((Ut = E.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>",
        2 === Ut.childNodes.length),
        S.parseHTML = function(e, t, n) {
            return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t,
            t = !1),
            t || (y.createHTMLDocument ? ((r = (t = E.implementation.createHTMLDocument("")).createElement("base")).href = E.location.href,
            t.head.appendChild(r)) : t = E),
            o = !n && [],
            (i = N.exec(e)) ? [t.createElement(i[1])] : (i = xe([e], t, o),
            o && o.length && S(o).remove(),
            S.merge([], i.childNodes)));
            var r, i, o
        }
        ,
        S.fn.load = function(e, t, n) {
            var r, i, o, a = this, s = e.indexOf(" ");
            return -1 < s && (r = vt(e.slice(s)),
            e = e.slice(0, s)),
            m(t) ? (n = t,
            t = void 0) : t && "object" == typeof t && (i = "POST"),
            0 < a.length && S.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done(function(e) {
                o = arguments,
                a.html(r ? S("<div>").append(S.parseHTML(e)).find(r) : e)
            }).always(n && function(e, t) {
                a.each(function() {
                    n.apply(this, o || [e.responseText, t, e])
                })
            }
            ),
            this
        }
        ,
        S.expr.pseudos.animated = function(t) {
            return S.grep(S.timers, function(e) {
                return t === e.elem
            }).length
        }
        ,
        S.offset = {
            setOffset: function(e, t, n) {
                var r, i, o, a, s, u, l = S.css(e, "position"), c = S(e), f = {};
                "static" === l && (e.style.position = "relative"),
                s = c.offset(),
                o = S.css(e, "top"),
                u = S.css(e, "left"),
                ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top,
                i = r.left) : (a = parseFloat(o) || 0,
                i = parseFloat(u) || 0),
                m(t) && (t = t.call(e, n, S.extend({}, s))),
                null != t.top && (f.top = t.top - s.top + a),
                null != t.left && (f.left = t.left - s.left + i),
                "using"in t ? t.using.call(e, f) : ("number" == typeof f.top && (f.top += "px"),
                "number" == typeof f.left && (f.left += "px"),
                c.css(f))
            }
        },
        S.fn.extend({
            offset: function(t) {
                if (arguments.length)
                    return void 0 === t ? this : this.each(function(e) {
                        S.offset.setOffset(this, t, e)
                    });
                var e, n, r = this[0];
                return r ? r.getClientRects().length ? (e = r.getBoundingClientRect(),
                n = r.ownerDocument.defaultView,
                {
                    top: e.top + n.pageYOffset,
                    left: e.left + n.pageXOffset
                }) : {
                    top: 0,
                    left: 0
                } : void 0
            },
            position: function() {
                if (this[0]) {
                    var e, t, n, r = this[0], i = {
                        top: 0,
                        left: 0
                    };
                    if ("fixed" === S.css(r, "position"))
                        t = r.getBoundingClientRect();
                    else {
                        t = this.offset(),
                        n = r.ownerDocument,
                        e = r.offsetParent || n.documentElement;
                        while (e && (e === n.body || e === n.documentElement) && "static" === S.css(e, "position"))
                            e = e.parentNode;
                        e && e !== r && 1 === e.nodeType && ((i = S(e).offset()).top += S.css(e, "borderTopWidth", !0),
                        i.left += S.css(e, "borderLeftWidth", !0))
                    }
                    return {
                        top: t.top - i.top - S.css(r, "marginTop", !0),
                        left: t.left - i.left - S.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    var e = this.offsetParent;
                    while (e && "static" === S.css(e, "position"))
                        e = e.offsetParent;
                    return e || re
                })
            }
        }),
        S.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, i) {
            var o = "pageYOffset" === i;
            S.fn[t] = function(e) {
                return $(this, function(e, t, n) {
                    var r;
                    if (x(e) ? r = e : 9 === e.nodeType && (r = e.defaultView),
                    void 0 === n)
                        return r ? r[i] : e[t];
                    r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
                }, t, e, arguments.length)
            }
        }),
        S.each(["top", "left"], function(e, n) {
            S.cssHooks[n] = $e(y.pixelPosition, function(e, t) {
                if (t)
                    return t = Be(e, n),
                    Me.test(t) ? S(e).position()[n] + "px" : t
            })
        }),
        S.each({
            Height: "height",
            Width: "width"
        }, function(a, s) {
            S.each({
                padding: "inner" + a,
                content: s,
                "": "outer" + a
            }, function(r, o) {
                S.fn[o] = function(e, t) {
                    var n = arguments.length && (r || "boolean" != typeof e)
                      , i = r || (!0 === e || !0 === t ? "margin" : "border");
                    return $(this, function(e, t, n) {
                        var r;
                        return x(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement,
                        Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : void 0 === n ? S.css(e, t, i) : S.style(e, t, n, i)
                    }, s, n ? e : void 0, n)
                }
            })
        }),
        S.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
            S.fn[t] = function(e) {
                return this.on(t, e)
            }
        }),
        S.fn.extend({
            bind: function(e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function(e, t) {
                return this.off(e, null, t)
            },
            delegate: function(e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function(e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            },
            hover: function(e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        }),
        S.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
            S.fn[n] = function(e, t) {
                return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
            }
        });
        var Gt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        S.proxy = function(e, t) {
            var n, r, i;
            if ("string" == typeof t && (n = e[t],
            t = e,
            e = n),
            m(e))
                return r = s.call(arguments, 2),
                (i = function() {
                    return e.apply(t || this, r.concat(s.call(arguments)))
                }
                ).guid = e.guid = e.guid || S.guid++,
                i
        }
        ,
        S.holdReady = function(e) {
            e ? S.readyWait++ : S.ready(!0)
        }
        ,
        S.isArray = Array.isArray,
        S.parseJSON = JSON.parse,
        S.nodeName = A,
        S.isFunction = m,
        S.isWindow = x,
        S.camelCase = X,
        S.type = w,
        S.now = Date.now,
        S.isNumeric = function(e) {
            var t = S.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        }
        ,
        S.trim = function(e) {
            return null == e ? "" : (e + "").replace(Gt, "")
        }
        ,
        "function" == typeof define && define.amd && define("jquery", [], function() {
            return S
        });
        var Yt = C.jQuery
          , Qt = C.$;
        return S.noConflict = function(e) {
            return C.$ === S && (C.$ = Qt),
            e && C.jQuery === S && (C.jQuery = Yt),
            S
        }
        ,
        "undefined" == typeof e && (C.jQuery = C.$ = S),
        S
    });

    (function(t, e) {
        "use strict";
        var n, i = t.document;
        n = function() {
            var n, s, r, o, a, l, c, u, f, d, h, p, y = {}, b = {}, m = !1, v = {
                ENTER: 13,
                ESC: 27,
                SPACE: 32
            }, g = [];
            return b = {
                buttons: {
                    holder: '<nav class="alertify-buttons">{{buttons}}</nav>',
                    submit: '<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
                    ok: '<a href="#" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</a>',
                    cancel: '<a href="#" class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</a>'
                },
                input: '<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',
                message: '<p class="alertify-message">{{message}}</p>',
                log: '<article class="alertify-log{{class}}">{{message}}</article>'
            },
            p = function() {
                var t, n, s = !1, r = i.createElement("fakeelement"), o = {
                    WebkitTransition: "webkitTransitionEnd",
                    MozTransition: "transitionend",
                    OTransition: "otransitionend",
                    transition: "transitionend"
                };
                for (t in o)
                    if (r.style[t] !== e) {
                        n = o[t],
                        s = !0;
                        break
                    }
                return {
                    type: n,
                    supported: s
                }
            }
            ,
            n = function(t) {
                return i.getElementById(t)
            }
            ,
            y = {
                labels: {
                    ok: "OK",
                    cancel: "Cancel"
                },
                delay: 5e3,
                buttonReverse: !1,
                buttonFocus: "ok",
                transition: e,
                addListeners: function(t) {
                    var n, a, l, c, u, f = r !== e, p = s !== e, y = h !== e, b = "", m = this;
                    n = function(n) {
                        return n.preventDefault !== e && n.preventDefault(),
                        l(n),
                        h !== e && (b = h.value),
                        "function" == typeof t && (h !== e ? t(!0, b) : t(!0)),
                        !1
                    }
                    ,
                    a = function(n) {
                        return n.preventDefault !== e && n.preventDefault(),
                        l(n),
                        "function" == typeof t && t(!1),
                        !1
                    }
                    ,
                    l = function() {
                        m.hide(),
                        m.unbind(i.body, "keyup", c),
                        m.unbind(o, "focus", u),
                        y && m.unbind(d, "submit", n),
                        f && m.unbind(r, "click", n),
                        p && m.unbind(s, "click", a)
                    }
                    ,
                    c = function(t) {
                        var e = t.keyCode;
                        e !== v.SPACE || y || n(t),
                        e === v.ESC && p && a(t)
                    }
                    ,
                    u = function() {
                        y ? h.focus() : !p || m.buttonReverse ? r.focus() : s.focus()
                    }
                    ,
                    this.bind(o, "focus", u),
                    f && this.bind(r, "click", n),
                    p && this.bind(s, "click", a),
                    this.bind(i.body, "keyup", c),
                    y && this.bind(d, "submit", n),
                    this.transition.supported || this.setFocus()
                },
                bind: function(t, e, n) {
                    "function" == typeof t.addEventListener ? t.addEventListener(e, n, !1) : t.attachEvent && t.attachEvent("on" + e, n)
                },
                handleErrors: function() {
                    if (t.onerror !== e) {
                        var n = this;
                        return t.onerror = function(t, e, i) {
                            n.error("[" + t + " on line " + i + " of " + e + "]", 0)
                        }
                        ,
                        !0
                    }
                    return !1
                },
                appendButtons: function(t, e) {
                    return this.buttonReverse ? e + t : t + e
                },
                build: function(t) {
                    var e = ""
                      , n = t.type
                      , i = t.message
                      , s = t.cssClass || "";
                    switch (e += '<div class="alertify-dialog">',
                    "none" === y.buttonFocus && (e += '<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'),
                    "prompt" === n && (e += '<form id="alertify-form">'),
                    e += '<article class="alertify-inner">',
                    e += b.message.replace("{{message}}", i),
                    "prompt" === n && (e += b.input),
                    e += b.buttons.holder,
                    e += "</article>",
                    "prompt" === n && (e += "</form>"),
                    e += '<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>',
                    e += "</div>",
                    n) {
                    case "confirm":
                        e = e.replace("{{buttons}}", this.appendButtons(b.buttons.cancel, b.buttons.ok)),
                        e = e.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case "prompt":
                        e = e.replace("{{buttons}}", this.appendButtons(b.buttons.cancel, b.buttons.submit)),
                        e = e.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
                        break;
                    case "alert":
                        e = e.replace("{{buttons}}", b.buttons.ok),
                        e = e.replace("{{ok}}", this.labels.ok);
                        break;
                    default:
                    }
                    return u.className = "alertify alertify-" + n + " " + s,
                    c.className = "alertify-cover",
                    e
                },
                close: function(t, n) {
                    var i, s, r = n && !isNaN(n) ? +n : this.delay, o = this;
                    this.bind(t, "click", function() {
                        i(t)
                    }),
                    s = function(t) {
                        t.stopPropagation(),
                        o.unbind(this, o.transition.type, s),
                        f.removeChild(this),
                        f.hasChildNodes() || (f.className += " alertify-logs-hidden")
                    }
                    ,
                    i = function(t) {
                        t !== e && t.parentNode === f && (o.transition.supported ? (o.bind(t, o.transition.type, s),
                        t.className += " alertify-log-hide") : (f.removeChild(t),
                        f.hasChildNodes() || (f.className += " alertify-logs-hidden")))
                    }
                    ,
                    0 !== n && setTimeout(function() {
                        i(t)
                    }, r)
                },
                dialog: function(t, n, s, r, o) {
                    l = i.activeElement;
                    var a = function() {
                        f && null !== f.scrollTop && c && null !== c.scrollTop || a()
                    };
                    if ("string" != typeof t)
                        throw Error("message must be a string");
                    if ("string" != typeof n)
                        throw Error("type must be a string");
                    if (s !== e && "function" != typeof s)
                        throw Error("fn must be a function");
                    return "function" == typeof this.init && (this.init(),
                    a()),
                    g.push({
                        type: n,
                        message: t,
                        callback: s,
                        placeholder: r,
                        cssClass: o
                    }),
                    m || this.setup(),
                    this
                },
                extend: function(t) {
                    if ("string" != typeof t)
                        throw Error("extend method must have exactly one paramter");
                    return function(e, n) {
                        return this.log(e, t, n),
                        this
                    }
                },
                hide: function() {
                    var t, e = this;
                    g.splice(0, 1),
                    g.length > 0 ? this.setup(!0) : (m = !1,
                    t = function(n) {
                        n.stopPropagation(),
                        u.className += " alertify-isHidden",
                        e.unbind(u, e.transition.type, t)
                    }
                    ,
                    this.transition.supported ? (this.bind(u, this.transition.type, t),
                    u.className = "alertify alertify-hide alertify-hidden") : u.className = "alertify alertify-hide alertify-hidden alertify-isHidden",
                    c.className = "alertify-cover alertify-cover-hidden",
                    l.focus())
                },
                init: function() {
                    i.createElement("nav"),
                    i.createElement("article"),
                    i.createElement("section"),
                    c = i.createElement("div"),
                    c.setAttribute("id", "alertify-cover"),
                    c.className = "alertify-cover alertify-cover-hidden",
                    i.body.appendChild(c),
                    u = i.createElement("section"),
                    u.setAttribute("id", "alertify"),
                    u.className = "alertify alertify-hidden",
                    i.body.appendChild(u),
                    f = i.createElement("section"),
                    f.setAttribute("id", "alertify-logs"),
                    f.className = "alertify-logs alertify-logs-hidden",
                    i.body.appendChild(f),
                    i.body.setAttribute("tabindex", "0"),
                    this.transition = p(),
                    delete this.init
                },
                log: function(t, e, n) {
                    var i = function() {
                        f && null !== f.scrollTop || i()
                    };
                    return "function" == typeof this.init && (this.init(),
                    i()),
                    f.className = "alertify-logs",
                    this.notify(t, e, n),
                    this
                },
                notify: function(t, e, n) {
                    var s = i.createElement("article");
                    s.className = "alertify-log" + ("string" == typeof e && "" !== e ? " alertify-log-" + e : ""),
                    s.innerHTML = t,
                    f.appendChild(s),
                    setTimeout(function() {
                        s.className = s.className + " alertify-log-show"
                    }, 50),
                    this.close(s, n)
                },
                set: function(t) {
                    var e;
                    if ("object" != typeof t && t instanceof Array)
                        throw Error("args must be an object");
                    for (e in t)
                        t.hasOwnProperty(e) && (this[e] = t[e])
                },
                setFocus: function() {
                    h ? (h.focus(),
                    h.select()) : a.focus()
                },
                setup: function(t) {
                    var i, l = g[0], c = this;
                    m = !0,
                    i = function(t) {
                        t.stopPropagation(),
                        c.setFocus(),
                        c.unbind(u, c.transition.type, i)
                    }
                    ,
                    this.transition.supported && !t && this.bind(u, this.transition.type, i),
                    u.innerHTML = this.build(l),
                    o = n("alertify-resetFocus"),
                    r = n("alertify-ok") || e,
                    s = n("alertify-cancel") || e,
                    a = "cancel" === y.buttonFocus ? s : "none" === y.buttonFocus ? n("alertify-noneFocus") : r,
                    h = n("alertify-text") || e,
                    d = n("alertify-form") || e,
                    "string" == typeof l.placeholder && "" !== l.placeholder && (h.value = l.placeholder),
                    t && this.setFocus(),
                    this.addListeners(l.callback)
                },
                unbind: function(t, e, n) {
                    "function" == typeof t.removeEventListener ? t.removeEventListener(e, n, !1) : t.detachEvent && t.detachEvent("on" + e, n)
                }
            },
            {
                alert: function(t, e, n) {
                    return y.dialog(t, "alert", e, "", n),
                    this
                },
                confirm: function(t, e, n) {
                    return y.dialog(t, "confirm", e, "", n),
                    this
                },
                extend: y.extend,
                init: y.init,
                log: function(t, e, n) {
                    return y.log(t, e, n),
                    this
                },
                prompt: function(t, e, n, i) {
                    return y.dialog(t, "prompt", e, n, i),
                    this
                },
                success: function(t, e) {
                    return y.log(t, "success", e),
                    this
                },
                error: function(t, e) {
                    return y.log(t, "error", e),
                    this
                },
                set: function(t) {
                    y.set(t)
                },
                labels: y.labels,
                debug: y.handleErrors
            }
        }
        ,
        "function" == typeof define ? define([], function() {
            return new n
        }) : t.alertify === e && (t.alertify = new n)
    }
    )(this);
    (function() {
        var a = this
          , b = b || {};
        b.WEBGL_RENDERER = 0,
        b.CANVAS_RENDERER = 1,
        b.VERSION = "v1.6.1",
        b.blendModes = {
            NORMAL: 0,
            ADD: 1,
            MULTIPLY: 2,
            SCREEN: 3,
            OVERLAY: 4,
            DARKEN: 5,
            LIGHTEN: 6,
            COLOR_DODGE: 7,
            COLOR_BURN: 8,
            HARD_LIGHT: 9,
            SOFT_LIGHT: 10,
            DIFFERENCE: 11,
            EXCLUSION: 12,
            HUE: 13,
            SATURATION: 14,
            COLOR: 15,
            LUMINOSITY: 16
        },
        b.scaleModes = {
            DEFAULT: 0,
            LINEAR: 0,
            NEAREST: 1
        },
        b._UID = 0,
        "undefined" != typeof Float32Array ? (b.Float32Array = Float32Array,
        b.Uint16Array = Uint16Array) : (b.Float32Array = Array,
        b.Uint16Array = Array),
        b.INTERACTION_FREQUENCY = 30,
        b.AUTO_PREVENT_DEFAULT = !0,
        b.RAD_TO_DEG = 180 / Math.PI,
        b.DEG_TO_RAD = Math.PI / 180,
        b.dontSayHello = !1,
        b.sayHello = function(a) {
            if (!b.dontSayHello) {
                if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                    var c = ["%c %c %c Pixi.js " + b.VERSION + " - " + a + "  %c  %c  http://www.pixijs.com/  %c %c â™¥%câ™¥%câ™¥ ", "background: #ff66a5", "background: #ff66a5", "color: #ff66a5; background: #030307;", "background: #ff66a5", "background: #ffc3dc", "background: #ff66a5", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff", "color: #ff2424; background: #fff"];
                    console.log.apply(console, c)
                } else
                    window.console && console.log("Pixi.js " + b.VERSION + " - http://www.pixijs.com/");
                b.dontSayHello = !0
            }
        }
        ,
        b.Point = function(a, b) {
            this.x = a || 0,
            this.y = b || 0
        }
        ,
        b.Point.prototype.clone = function() {
            return new b.Point(this.x,this.y)
        }
        ,
        b.Point.prototype.set = function(a, b) {
            this.x = a || 0,
            this.y = b || (0 !== b ? this.x : 0)
        }
        ,
        b.Point.prototype.constructor = b.Point,
        b.Rectangle = function(a, b, c, d) {
            this.x = a || 0,
            this.y = b || 0,
            this.width = c || 0,
            this.height = d || 0
        }
        ,
        b.Rectangle.prototype.clone = function() {
            return new b.Rectangle(this.x,this.y,this.width,this.height)
        }
        ,
        b.Rectangle.prototype.contains = function(a, b) {
            if (this.width <= 0 || this.height <= 0)
                return !1;
            var c = this.x;
            if (a >= c && a <= c + this.width) {
                var d = this.y;
                if (b >= d && b <= d + this.height)
                    return !0
            }
            return !1
        }
        ,
        b.Rectangle.prototype.constructor = b.Rectangle,
        b.EmptyRectangle = new b.Rectangle(0,0,0,0),
        b.Polygon = function(a) {
            if (a instanceof Array || (a = Array.prototype.slice.call(arguments)),
            "number" == typeof a[0]) {
                for (var c = [], d = 0, e = a.length; e > d; d += 2)
                    c.push(new b.Point(a[d],a[d + 1]));
                a = c
            }
            this.points = a
        }
        ,
        b.Polygon.prototype.clone = function() {
            for (var a = [], c = 0; c < this.points.length; c++)
                a.push(this.points[c].clone());
            return new b.Polygon(a)
        }
        ,
        b.Polygon.prototype.contains = function(a, b) {
            for (var c = !1, d = 0, e = this.points.length - 1; d < this.points.length; e = d++) {
                var f = this.points[d].x
                  , g = this.points[d].y
                  , h = this.points[e].x
                  , i = this.points[e].y
                  , j = g > b != i > b && (h - f) * (b - g) / (i - g) + f > a;
                j && (c = !c)
            }
            return c
        }
        ,
        b.Polygon.prototype.constructor = b.Polygon,
        b.Circle = function(a, b, c) {
            this.x = a || 0,
            this.y = b || 0,
            this.radius = c || 0
        }
        ,
        b.Circle.prototype.clone = function() {
            return new b.Circle(this.x,this.y,this.radius)
        }
        ,
        b.Circle.prototype.contains = function(a, b) {
            if (this.radius <= 0)
                return !1;
            var c = this.x - a
              , d = this.y - b
              , e = this.radius * this.radius;
            return c *= c,
            d *= d,
            e >= c + d
        }
        ,
        b.Circle.prototype.getBounds = function() {
            return new b.Rectangle(this.x - this.radius,this.y - this.radius,this.width,this.height)
        }
        ,
        b.Circle.prototype.constructor = b.Circle,
        b.Ellipse = function(a, b, c, d) {
            this.x = a || 0,
            this.y = b || 0,
            this.width = c || 0,
            this.height = d || 0
        }
        ,
        b.Ellipse.prototype.clone = function() {
            return new b.Ellipse(this.x,this.y,this.width,this.height)
        }
        ,
        b.Ellipse.prototype.contains = function(a, b) {
            if (this.width <= 0 || this.height <= 0)
                return !1;
            var c = (a - this.x) / this.width
              , d = (b - this.y) / this.height;
            return c *= c,
            d *= d,
            1 >= c + d
        }
        ,
        b.Ellipse.prototype.getBounds = function() {
            return new b.Rectangle(this.x - this.width,this.y - this.height,this.width,this.height)
        }
        ,
        b.Ellipse.prototype.constructor = b.Ellipse,
        b.Matrix = function() {
            this.a = 1,
            this.b = 0,
            this.c = 0,
            this.d = 1,
            this.tx = 0,
            this.ty = 0
        }
        ,
        b.Matrix.prototype.fromArray = function(a) {
            this.a = a[0],
            this.b = a[1],
            this.c = a[3],
            this.d = a[4],
            this.tx = a[2],
            this.ty = a[5]
        }
        ,
        b.Matrix.prototype.toArray = function(a) {
            this.array || (this.array = new Float32Array(9));
            var b = this.array;
            return a ? (b[0] = this.a,
            b[1] = this.c,
            b[2] = 0,
            b[3] = this.b,
            b[4] = this.d,
            b[5] = 0,
            b[6] = this.tx,
            b[7] = this.ty,
            b[8] = 1) : (b[0] = this.a,
            b[1] = this.b,
            b[2] = this.tx,
            b[3] = this.c,
            b[4] = this.d,
            b[5] = this.ty,
            b[6] = 0,
            b[7] = 0,
            b[8] = 1),
            b
        }
        ,
        b.identityMatrix = new b.Matrix,
        b.determineMatrixArrayType = function() {
            return "undefined" != typeof Float32Array ? Float32Array : Array
        }
        ,
        b.Matrix2 = b.determineMatrixArrayType(),
        b.DisplayObject = function() {
            this.position = new b.Point,
            this.scale = new b.Point(1,1),
            this.pivot = new b.Point(0,0),
            this.rotation = 0,
            this.alpha = 1,
            this.visible = !0,
            this.hitArea = null,
            this.buttonMode = !1,
            this.renderable = !1,
            this.parent = null,
            this.stage = null,
            this.worldAlpha = 1,
            this._interactive = !1,
            this.defaultCursor = "pointer",
            this.worldTransform = new b.Matrix,
            this.color = [],
            this.dynamic = !0,
            this._sr = 0,
            this._cr = 1,
            this.filterArea = null,
            this._bounds = new b.Rectangle(0,0,1,1),
            this._currentBounds = null,
            this._mask = null,
            this._cacheAsBitmap = !1,
            this._cacheIsDirty = !1
        }
        ,
        b.DisplayObject.prototype.constructor = b.DisplayObject,
        b.DisplayObject.prototype.setInteractive = function(a) {
            this.interactive = a
        }
        ,
        Object.defineProperty(b.DisplayObject.prototype, "interactive", {
            get: function() {
                return this._interactive
            },
            set: function(a) {
                this._interactive = a,
                this.stage && (this.stage.dirty = !0)
            }
        }),
        Object.defineProperty(b.DisplayObject.prototype, "worldVisible", {
            get: function() {
                var a = this;
                do {
                    if (!a.visible)
                        return !1;
                    a = a.parent
                } while (a);
                return !0
            }
        }),
        Object.defineProperty(b.DisplayObject.prototype, "mask", {
            get: function() {
                return this._mask
            },
            set: function(a) {
                this._mask && (this._mask.isMask = !1),
                this._mask = a,
                this._mask && (this._mask.isMask = !0)
            }
        }),
        Object.defineProperty(b.DisplayObject.prototype, "filters", {
            get: function() {
                return this._filters
            },
            set: function(a) {
                if (a) {
                    for (var b = [], c = 0; c < a.length; c++)
                        for (var d = a[c].passes, e = 0; e < d.length; e++)
                            b.push(d[e]);
                    this._filterBlock = {
                        target: this,
                        filterPasses: b
                    }
                }
                this._filters = a
            }
        }),
        Object.defineProperty(b.DisplayObject.prototype, "cacheAsBitmap", {
            get: function() {
                return this._cacheAsBitmap
            },
            set: function(a) {
                this._cacheAsBitmap !== a && (a ? this._generateCachedSprite() : this._destroyCachedSprite(),
                this._cacheAsBitmap = a)
            }
        }),
        b.DisplayObject.prototype.updateTransform = function() {
            this.rotation !== this.rotationCache && (this.rotationCache = this.rotation,
            this._sr = Math.sin(this.rotation),
            this._cr = Math.cos(this.rotation));
            var a = this.parent.worldTransform
              , b = this.worldTransform
              , c = this.pivot.x
              , d = this.pivot.y
              , e = this._cr * this.scale.x
              , f = -this._sr * this.scale.y
              , g = this._sr * this.scale.x
              , h = this._cr * this.scale.y
              , i = this.position.x - e * c - d * f
              , j = this.position.y - h * d - c * g
              , k = a.a
              , l = a.b
              , m = a.c
              , n = a.d;
            b.a = k * e + l * g,
            b.b = k * f + l * h,
            b.tx = k * i + l * j + a.tx,
            b.c = m * e + n * g,
            b.d = m * f + n * h,
            b.ty = m * i + n * j + a.ty,
            this.worldAlpha = this.alpha * this.parent.worldAlpha
        }
        ,
        b.DisplayObject.prototype.getBounds = function(a) {
            return a = a,
            b.EmptyRectangle
        }
        ,
        b.DisplayObject.prototype.getLocalBounds = function() {
            return this.getBounds(b.identityMatrix)
        }
        ,
        b.DisplayObject.prototype.setStageReference = function(a) {
            this.stage = a,
            this._interactive && (this.stage.dirty = !0)
        }
        ,
        b.DisplayObject.prototype.generateTexture = function(a) {
            var c = this.getLocalBounds()
              , d = new b.RenderTexture(0 | c.width,0 | c.height,a);
            return d.render(this, new b.Point(-c.x,-c.y)),
            d
        }
        ,
        b.DisplayObject.prototype.updateCache = function() {
            this._generateCachedSprite()
        }
        ,
        b.DisplayObject.prototype._renderCachedSprite = function(a) {
            this._cachedSprite.worldAlpha = this.worldAlpha,
            a.gl ? b.Sprite.prototype._renderWebGL.call(this._cachedSprite, a) : b.Sprite.prototype._renderCanvas.call(this._cachedSprite, a)
        }
        ,
        b.DisplayObject.prototype._generateCachedSprite = function() {
            this._cacheAsBitmap = !1;
            var a = this.getLocalBounds();
            if (this._cachedSprite)
                this._cachedSprite.texture.resize(0 | a.width, 0 | a.height);
            else {
                var c = new b.RenderTexture(0 | a.width,0 | a.height);
                this._cachedSprite = new b.Sprite(c),
                this._cachedSprite.worldTransform = this.worldTransform
            }
            var d = this._filters;
            this._filters = null,
            this._cachedSprite.filters = d,
            this._cachedSprite.texture.render(this, new b.Point(-a.x,-a.y)),
            this._cachedSprite.anchor.x = -(a.x / a.width),
            this._cachedSprite.anchor.y = -(a.y / a.height),
            this._filters = d,
            this._cacheAsBitmap = !0
        }
        ,
        b.DisplayObject.prototype._destroyCachedSprite = function() {
            this._cachedSprite && (this._cachedSprite.texture.destroy(!0),
            this._cachedSprite = null)
        }
        ,
        b.DisplayObject.prototype._renderWebGL = function(a) {
            a = a
        }
        ,
        b.DisplayObject.prototype._renderCanvas = function(a) {
            a = a
        }
        ,
        Object.defineProperty(b.DisplayObject.prototype, "x", {
            get: function() {
                return this.position.x
            },
            set: function(a) {
                this.position.x = a
            }
        }),
        Object.defineProperty(b.DisplayObject.prototype, "y", {
            get: function() {
                return this.position.y
            },
            set: function(a) {
                this.position.y = a
            }
        }),
        b.DisplayObjectContainer = function() {
            b.DisplayObject.call(this),
            this.children = []
        }
        ,
        b.DisplayObjectContainer.prototype = Object.create(b.DisplayObject.prototype),
        b.DisplayObjectContainer.prototype.constructor = b.DisplayObjectContainer,
        Object.defineProperty(b.DisplayObjectContainer.prototype, "width", {
            get: function() {
                return this.scale.x * this.getLocalBounds().width
            },
            set: function(a) {
                var b = this.getLocalBounds().width;
                this.scale.x = 0 !== b ? a / (b / this.scale.x) : 1,
                this._width = a
            }
        }),
        Object.defineProperty(b.DisplayObjectContainer.prototype, "height", {
            get: function() {
                return this.scale.y * this.getLocalBounds().height
            },
            set: function(a) {
                var b = this.getLocalBounds().height;
                this.scale.y = 0 !== b ? a / (b / this.scale.y) : 1,
                this._height = a
            }
        }),
        b.DisplayObjectContainer.prototype.addChild = function(a) {
            return this.addChildAt(a, this.children.length)
        }
        ,
        b.DisplayObjectContainer.prototype.addChildAt = function(a, b) {
            if (b >= 0 && b <= this.children.length)
                return a.parent && a.parent.removeChild(a),
                a.parent = this,
                this.children.splice(b, 0, a),
                this.stage && a.setStageReference(this.stage),
                a;
            throw new Error(a + " The index " + b + " supplied is out of bounds " + this.children.length)
        }
        ,
        b.DisplayObjectContainer.prototype.swapChildren = function(a, b) {
            if (a !== b) {
                var c = this.children.indexOf(a)
                  , d = this.children.indexOf(b);
                if (0 > c || 0 > d)
                    throw new Error("swapChildren: Both the supplied DisplayObjects must be a child of the caller.");
                this.children[c] = b,
                this.children[d] = a
            }
        }
        ,
        b.DisplayObjectContainer.prototype.getChildAt = function(a) {
            if (a >= 0 && a < this.children.length)
                return this.children[a];
            throw new Error("Supplied index does not exist in the child list, or the supplied DisplayObject must be a child of the caller")
        }
        ,
        b.DisplayObjectContainer.prototype.removeChild = function(a) {
            return this.removeChildAt(this.children.indexOf(a))
        }
        ,
        b.DisplayObjectContainer.prototype.removeChildAt = function(a) {
            var b = this.getChildAt(a);
            return this.stage && b.removeStageReference(),
            b.parent = void 0,
            this.children.splice(a, 1),
            b
        }
        ,
        b.DisplayObjectContainer.prototype.removeChildren = function(a, b) {
            var c = a || 0
              , d = "number" == typeof b ? b : this.children.length
              , e = d - c;
            if (e > 0 && d >= e) {
                for (var f = this.children.splice(c, e), g = 0; g < f.length; g++) {
                    var h = f[g];
                    this.stage && h.removeStageReference(),
                    h.parent = void 0
                }
                return f
            }
            throw new Error("Range Error, numeric values are outside the acceptable range")
        }
        ,
        b.DisplayObjectContainer.prototype.updateTransform = function() {
            if (this.visible && (b.DisplayObject.prototype.updateTransform.call(this),
            !this._cacheAsBitmap))
                for (var a = 0, c = this.children.length; c > a; a++)
                    this.children[a].updateTransform()
        }
        ,
        b.DisplayObjectContainer.prototype.getBounds = function(a) {
            if (0 === this.children.length)
                return b.EmptyRectangle;
            if (a) {
                var c = this.worldTransform;
                this.worldTransform = a,
                this.updateTransform(),
                this.worldTransform = c
            }
            for (var d, e, f, g = 1 / 0, h = 1 / 0, i = -1 / 0, j = -1 / 0, k = !1, l = 0, m = this.children.length; m > l; l++) {
                var n = this.children[l];
                n.visible && (k = !0,
                d = this.children[l].getBounds(a),
                g = g < d.x ? g : d.x,
                h = h < d.y ? h : d.y,
                e = d.width + d.x,
                f = d.height + d.y,
                i = i > e ? i : e,
                j = j > f ? j : f)
            }
            if (!k)
                return b.EmptyRectangle;
            var o = this._bounds;
            return o.x = g,
            o.y = h,
            o.width = i - g,
            o.height = j - h,
            o
        }
        ,
        b.DisplayObjectContainer.prototype.getLocalBounds = function() {
            var a = this.worldTransform;
            this.worldTransform = b.identityMatrix;
            for (var c = 0, d = this.children.length; d > c; c++)
                this.children[c].updateTransform();
            var e = this.getBounds();
            return this.worldTransform = a,
            e
        }
        ,
        b.DisplayObjectContainer.prototype.setStageReference = function(a) {
            this.stage = a,
            this._interactive && (this.stage.dirty = !0);
            for (var b = 0, c = this.children.length; c > b; b++) {
                var d = this.children[b];
                d.setStageReference(a)
            }
        }
        ,
        b.DisplayObjectContainer.prototype.removeStageReference = function() {
            for (var a = 0, b = this.children.length; b > a; a++) {
                var c = this.children[a];
                c.removeStageReference()
            }
            this._interactive && (this.stage.dirty = !0),
            this.stage = null
        }
        ,
        b.DisplayObjectContainer.prototype._renderWebGL = function(a) {
            if (this.visible && !(this.alpha <= 0)) {
                if (this._cacheAsBitmap)
                    return this._renderCachedSprite(a),
                    void 0;
                var b, c;
                if (this._mask || this._filters) {
                    for (this._filters && (a.spriteBatch.flush(),
                    a.filterManager.pushFilter(this._filterBlock)),
                    this._mask && (a.spriteBatch.stop(),
                    a.maskManager.pushMask(this.mask, a),
                    a.spriteBatch.start()),
                    b = 0,
                    c = this.children.length; c > b; b++)
                        this.children[b]._renderWebGL(a);
                    a.spriteBatch.stop(),
                    this._mask && a.maskManager.popMask(this._mask, a),
                    this._filters && a.filterManager.popFilter(),
                    a.spriteBatch.start()
                } else
                    for (b = 0,
                    c = this.children.length; c > b; b++)
                        this.children[b]._renderWebGL(a)
            }
        }
        ,
        b.DisplayObjectContainer.prototype._renderCanvas = function(a) {
            if (this.visible !== !1 && 0 !== this.alpha) {
                if (this._cacheAsBitmap)
                    return this._renderCachedSprite(a),
                    void 0;
                this._mask && a.maskManager.pushMask(this._mask, a.context);
                for (var b = 0, c = this.children.length; c > b; b++) {
                    var d = this.children[b];
                    d._renderCanvas(a)
                }
                this._mask && a.maskManager.popMask(a.context)
            }
        }
        ,
        b.Sprite = function(a) {
            b.DisplayObjectContainer.call(this),
            this.anchor = new b.Point,
            this.texture = a,
            this._width = 0,
            this._height = 0,
            this.tint = 16777215,
            this.blendMode = b.blendModes.NORMAL,
            a.baseTexture.hasLoaded ? this.onTextureUpdate() : (this.onTextureUpdateBind = this.onTextureUpdate.bind(this),
            this.texture.addEventListener("update", this.onTextureUpdateBind)),
            this.renderable = !0
        }
        ,
        b.Sprite.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.Sprite.prototype.constructor = b.Sprite,
        Object.defineProperty(b.Sprite.prototype, "width", {
            get: function() {
                return this.scale.x * this.texture.frame.width
            },
            set: function(a) {
                this.scale.x = a / this.texture.frame.width,
                this._width = a
            }
        }),
        Object.defineProperty(b.Sprite.prototype, "height", {
            get: function() {
                return this.scale.y * this.texture.frame.height
            },
            set: function(a) {
                this.scale.y = a / this.texture.frame.height,
                this._height = a
            }
        }),
        b.Sprite.prototype.setTexture = function(a) {
            this.texture = a,
            this.cachedTint = 16777215
        }
        ,
        b.Sprite.prototype.onTextureUpdate = function() {
            this._width && (this.scale.x = this._width / this.texture.frame.width),
            this._height && (this.scale.y = this._height / this.texture.frame.height)
        }
        ,
        b.Sprite.prototype.getBounds = function(a) {
            var b = this.texture.frame.width
              , c = this.texture.frame.height
              , d = b * (1 - this.anchor.x)
              , e = b * -this.anchor.x
              , f = c * (1 - this.anchor.y)
              , g = c * -this.anchor.y
              , h = a || this.worldTransform
              , i = h.a
              , j = h.c
              , k = h.b
              , l = h.d
              , m = h.tx
              , n = h.ty
              , o = i * e + k * g + m
              , p = l * g + j * e + n
              , q = i * d + k * g + m
              , r = l * g + j * d + n
              , s = i * d + k * f + m
              , t = l * f + j * d + n
              , u = i * e + k * f + m
              , v = l * f + j * e + n
              , w = -1 / 0
              , x = -1 / 0
              , y = 1 / 0
              , z = 1 / 0;
            y = y > o ? o : y,
            y = y > q ? q : y,
            y = y > s ? s : y,
            y = y > u ? u : y,
            z = z > p ? p : z,
            z = z > r ? r : z,
            z = z > t ? t : z,
            z = z > v ? v : z,
            w = o > w ? o : w,
            w = q > w ? q : w,
            w = s > w ? s : w,
            w = u > w ? u : w,
            x = p > x ? p : x,
            x = r > x ? r : x,
            x = t > x ? t : x,
            x = v > x ? v : x;
            var A = this._bounds;
            return A.x = y,
            A.width = w - y,
            A.y = z,
            A.height = x - z,
            this._currentBounds = A,
            A
        }
        ,
        b.Sprite.prototype._renderWebGL = function(a) {
            if (this.visible && !(this.alpha <= 0)) {
                var b, c;
                if (this._mask || this._filters) {
                    var d = a.spriteBatch;
                    for (this._filters && (d.flush(),
                    a.filterManager.pushFilter(this._filterBlock)),
                    this._mask && (d.stop(),
                    a.maskManager.pushMask(this.mask, a),
                    d.start()),
                    d.render(this),
                    b = 0,
                    c = this.children.length; c > b; b++)
                        this.children[b]._renderWebGL(a);
                    d.stop(),
                    this._mask && a.maskManager.popMask(this._mask, a),
                    this._filters && a.filterManager.popFilter(),
                    d.start()
                } else
                    for (a.spriteBatch.render(this),
                    b = 0,
                    c = this.children.length; c > b; b++)
                        this.children[b]._renderWebGL(a)
            }
        }
        ,
        b.Sprite.prototype._renderCanvas = function(a) {
            if (this.visible !== !1 && 0 !== this.alpha) {
                if (this.blendMode !== a.currentBlendMode && (a.currentBlendMode = this.blendMode,
                a.context.globalCompositeOperation = b.blendModesCanvas[a.currentBlendMode]),
                this._mask && a.maskManager.pushMask(this._mask, a.context),
                this.texture.valid) {
                    a.context.globalAlpha = this.worldAlpha,
                    a.roundPixels ? a.context.setTransform(this.worldTransform.a, this.worldTransform.c, this.worldTransform.b, this.worldTransform.d, 0 | this.worldTransform.tx, 0 | this.worldTransform.ty) : a.context.setTransform(this.worldTransform.a, this.worldTransform.c, this.worldTransform.b, this.worldTransform.d, this.worldTransform.tx, this.worldTransform.ty),
                    a.smoothProperty && a.scaleMode !== this.texture.baseTexture.scaleMode && (a.scaleMode = this.texture.baseTexture.scaleMode,
                    a.context[a.smoothProperty] = a.scaleMode === b.scaleModes.LINEAR);
                    var c = this.texture.trim ? this.texture.trim.x - this.anchor.x * this.texture.trim.width : this.anchor.x * -this.texture.frame.width
                      , d = this.texture.trim ? this.texture.trim.y - this.anchor.y * this.texture.trim.height : this.anchor.y * -this.texture.frame.height;
                    16777215 !== this.tint ? (this.cachedTint !== this.tint && (this.cachedTint = this.tint,
                    this.tintedTexture = b.CanvasTinter.getTintedTexture(this, this.tint)),
                    a.context.drawImage(this.tintedTexture, 0, 0, this.texture.crop.width, this.texture.crop.height, c, d, this.texture.crop.width, this.texture.crop.height)) : a.context.drawImage(this.texture.baseTexture.source, this.texture.crop.x, this.texture.crop.y, this.texture.crop.width, this.texture.crop.height, c, d, this.texture.crop.width, this.texture.crop.height)
                }
                for (var e = 0, f = this.children.length; f > e; e++)
                    this.children[e]._renderCanvas(a);
                this._mask && a.maskManager.popMask(a.context)
            }
        }
        ,
        b.Sprite.fromFrame = function(a) {
            var c = b.TextureCache[a];
            if (!c)
                throw new Error('The frameId "' + a + '" does not exist in the texture cache' + this);
            return new b.Sprite(c)
        }
        ,
        b.Sprite.fromImage = function(a, c, d) {
            var e = b.Texture.fromImage(a, c, d);
            return new b.Sprite(e)
        }
        ,
        b.SpriteBatch = function(a) {
            b.DisplayObjectContainer.call(this),
            this.textureThing = a,
            this.ready = !1
        }
        ,
        b.SpriteBatch.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.SpriteBatch.constructor = b.SpriteBatch,
        b.SpriteBatch.prototype.initWebGL = function(a) {
            this.fastSpriteBatch = new b.WebGLFastSpriteBatch(a),
            this.ready = !0
        }
        ,
        b.SpriteBatch.prototype.updateTransform = function() {
            b.DisplayObject.prototype.updateTransform.call(this)
        }
        ,
        b.SpriteBatch.prototype._renderWebGL = function(a) {
            !this.visible || this.alpha <= 0 || !this.children.length || (this.ready || this.initWebGL(a.gl),
            a.spriteBatch.stop(),
            a.shaderManager.setShader(a.shaderManager.fastShader),
            this.fastSpriteBatch.begin(this, a),
            this.fastSpriteBatch.render(this),
            a.spriteBatch.start())
        }
        ,
        b.SpriteBatch.prototype._renderCanvas = function(a) {
            var c = a.context;
            c.globalAlpha = this.worldAlpha,
            b.DisplayObject.prototype.updateTransform.call(this);
            for (var d = this.worldTransform, e = !0, f = 0; f < this.children.length; f++) {
                var g = this.children[f];
                if (g.visible) {
                    var h = g.texture
                      , i = h.frame;
                    if (c.globalAlpha = this.worldAlpha * g.alpha,
                    g.rotation % (2 * Math.PI) === 0)
                        e && (c.setTransform(d.a, d.c, d.b, d.d, d.tx, d.ty),
                        e = !1),
                        c.drawImage(h.baseTexture.source, i.x, i.y, i.width, i.height, g.anchor.x * -i.width * g.scale.x + g.position.x + .5 | 0, g.anchor.y * -i.height * g.scale.y + g.position.y + .5 | 0, i.width * g.scale.x, i.height * g.scale.y);
                    else {
                        e || (e = !0),
                        b.DisplayObject.prototype.updateTransform.call(g);
                        var j = g.worldTransform;
                        a.roundPixels ? c.setTransform(j.a, j.c, j.b, j.d, 0 | j.tx, 0 | j.ty) : c.setTransform(j.a, j.c, j.b, j.d, j.tx, j.ty),
                        c.drawImage(h.baseTexture.source, i.x, i.y, i.width, i.height, g.anchor.x * -i.width + .5 | 0, g.anchor.y * -i.height + .5 | 0, i.width, i.height)
                    }
                }
            }
        }
        ,
        b.MovieClip = function(a) {
            b.Sprite.call(this, a[0]),
            this.textures = a,
            this.animationSpeed = 1,
            this.loop = !0,
            this.onComplete = null,
            this.currentFrame = 0,
            this.playing = !1
        }
        ,
        b.MovieClip.prototype = Object.create(b.Sprite.prototype),
        b.MovieClip.prototype.constructor = b.MovieClip,
        Object.defineProperty(b.MovieClip.prototype, "totalFrames", {
            get: function() {
                return this.textures.length
            }
        }),
        b.MovieClip.prototype.stop = function() {
            this.playing = !1
        }
        ,
        b.MovieClip.prototype.play = function() {
            this.playing = !0
        }
        ,
        b.MovieClip.prototype.gotoAndStop = function(a) {
            this.playing = !1,
            this.currentFrame = a;
            var b = this.currentFrame + .5 | 0;
            this.setTexture(this.textures[b % this.textures.length])
        }
        ,
        b.MovieClip.prototype.gotoAndPlay = function(a) {
            this.currentFrame = a,
            this.playing = !0
        }
        ,
        b.MovieClip.prototype.updateTransform = function() {
            if (b.Sprite.prototype.updateTransform.call(this),
            this.playing) {
                this.currentFrame += this.animationSpeed;
                var a = this.currentFrame + .5 | 0;
                this.currentFrame = this.currentFrame % this.textures.length,
                this.loop || a < this.textures.length ? this.setTexture(this.textures[a % this.textures.length]) : a >= this.textures.length && (this.gotoAndStop(this.textures.length - 1),
                this.onComplete && this.onComplete())
            }
        }
        ,
        b.MovieClip.fromFrames = function(a) {
            for (var c = [], d = 0; d < a.length; d++)
                c.push(new b.Texture.fromFrame(a[d]));
            return new b.MovieClip(c)
        }
        ,
        b.MovieClip.fromImages = function(a) {
            for (var c = [], d = 0; d < a.length; d++)
                c.push(new b.Texture.fromImage(a[d]));
            return new b.MovieClip(c)
        }
        ,
        b.FilterBlock = function() {
            this.visible = !0,
            this.renderable = !0
        }
        ,
        b.Text = function(a, c) {
            this.canvas = document.createElement("canvas"),
            this.context = this.canvas.getContext("2d"),
            b.Sprite.call(this, b.Texture.fromCanvas(this.canvas)),
            this.setText(a),
            this.setStyle(c)
        }
        ,
        b.Text.prototype = Object.create(b.Sprite.prototype),
        b.Text.prototype.constructor = b.Text,
        Object.defineProperty(b.Text.prototype, "width", {
            get: function() {
                return this.dirty && (this.updateText(),
                this.dirty = !1),
                this.scale.x * this.texture.frame.width
            },
            set: function(a) {
                this.scale.x = a / this.texture.frame.width,
                this._width = a
            }
        }),
        Object.defineProperty(b.Text.prototype, "height", {
            get: function() {
                return this.dirty && (this.updateText(),
                this.dirty = !1),
                this.scale.y * this.texture.frame.height
            },
            set: function(a) {
                this.scale.y = a / this.texture.frame.height,
                this._height = a
            }
        }),
        b.Text.prototype.setStyle = function(a) {
            a = a || {},
            a.font = a.font || "bold 20pt Arial",
            a.fill = a.fill || "black",
            a.align = a.align || "left",
            a.stroke = a.stroke || "black",
            a.strokeThickness = a.strokeThickness || 0,
            a.wordWrap = a.wordWrap || !1,
            a.wordWrapWidth = a.wordWrapWidth || 100,
            a.wordWrapWidth = a.wordWrapWidth || 100,
            a.dropShadow = a.dropShadow || !1,
            a.dropShadowAngle = a.dropShadowAngle || Math.PI / 6,
            a.dropShadowDistance = a.dropShadowDistance || 4,
            a.dropShadowColor = a.dropShadowColor || "black",
            this.style = a,
            this.dirty = !0
        }
        ,
        b.Text.prototype.setText = function(a) {
            this.text = a.toString() || " ",
            this.dirty = !0
        }
        ,
        b.Text.prototype.updateText = function() {
            this.context.font = this.style.font;
            var a = this.text;
            this.style.wordWrap && (a = this.wordWrap(this.text));
            for (var b = a.split(/(?:\r\n|\r|\n)/), c = [], d = 0, e = 0; e < b.length; e++) {
                var f = this.context.measureText(b[e]).width;
                c[e] = f,
                d = Math.max(d, f)
            }
            var g = d + this.style.strokeThickness;
            this.style.dropShadow && (g += this.style.dropShadowDistance),
            this.canvas.width = g + this.context.lineWidth;
            var h = this.determineFontHeight("font: " + this.style.font + ";") + this.style.strokeThickness
              , i = h * b.length;
            this.style.dropShadow && (i += this.style.dropShadowDistance),
            this.canvas.height = i,
            navigator.isCocoonJS && this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
            this.context.font = this.style.font,
            this.context.strokeStyle = this.style.stroke,
            this.context.lineWidth = this.style.strokeThickness,
            this.context.textBaseline = "top";
            var j, k;
            if (this.style.dropShadow) {
                this.context.fillStyle = this.style.dropShadowColor;
                var l = Math.sin(this.style.dropShadowAngle) * this.style.dropShadowDistance
                  , m = Math.cos(this.style.dropShadowAngle) * this.style.dropShadowDistance;
                for (e = 0; e < b.length; e++)
                    j = this.style.strokeThickness / 2,
                    k = this.style.strokeThickness / 2 + e * h,
                    "right" === this.style.align ? j += d - c[e] : "center" === this.style.align && (j += (d - c[e]) / 2),
                    this.style.fill && this.context.fillText(b[e], j + l, k + m)
            }
            for (this.context.fillStyle = this.style.fill,
            e = 0; e < b.length; e++)
                j = this.style.strokeThickness / 2,
                k = this.style.strokeThickness / 2 + e * h,
                "right" === this.style.align ? j += d - c[e] : "center" === this.style.align && (j += (d - c[e]) / 2),
                this.style.stroke && this.style.strokeThickness && this.context.strokeText(b[e], j, k),
                this.style.fill && this.context.fillText(b[e], j, k);
            this.updateTexture()
        }
        ,
        b.Text.prototype.updateTexture = function() {
            this.texture.baseTexture.width = this.canvas.width,
            this.texture.baseTexture.height = this.canvas.height,
            this.texture.crop.width = this.texture.frame.width = this.canvas.width,
            this.texture.crop.height = this.texture.frame.height = this.canvas.height,
            this._width = this.canvas.width,
            this._height = this.canvas.height,
            this.requiresUpdate = !0
        }
        ,
        b.Text.prototype._renderWebGL = function(a) {
            this.requiresUpdate && (this.requiresUpdate = !1,
            b.updateWebGLTexture(this.texture.baseTexture, a.gl)),
            b.Sprite.prototype._renderWebGL.call(this, a)
        }
        ,
        b.Text.prototype.updateTransform = function() {
            this.dirty && (this.updateText(),
            this.dirty = !1),
            b.Sprite.prototype.updateTransform.call(this)
        }
        ,
        b.Text.prototype.determineFontHeight = function(a) {
            var c = b.Text.heightCache[a];
            if (!c) {
                var d = document.getElementsByTagName("body")[0]
                  , e = document.createElement("div")
                  , f = document.createTextNode("M");
                e.appendChild(f),
                e.setAttribute("style", a + ";position:absolute;top:0;left:0"),
                d.appendChild(e),
                c = e.offsetHeight,
                b.Text.heightCache[a] = c,
                d.removeChild(e)
            }
            return c
        }
        ,
        b.Text.prototype.wordWrap = function(a) {
            for (var b = "", c = a.split("\n"), d = 0; d < c.length; d++) {
                for (var e = this.style.wordWrapWidth, f = c[d].split(" "), g = 0; g < f.length; g++) {
                    var h = this.context.measureText(f[g]).width
                      , i = h + this.context.measureText(" ").width;
                    0 === g || i > e ? (g > 0 && (b += "\n"),
                    b += f[g],
                    e = this.style.wordWrapWidth - h) : (e -= i,
                    b += " " + f[g])
                }
                d < c.length - 1 && (b += "\n")
            }
            return b
        }
        ,
        b.Text.prototype.destroy = function(a) {
            this.context = null,
            this.canvas = null,
            this.texture.destroy(void 0 === a ? !0 : a)
        }
        ,
        b.Text.heightCache = {},
        b.BitmapText = function(a, c) {
            b.DisplayObjectContainer.call(this),
            this._pool = [],
            this.setText(a),
            this.setStyle(c),
            this.updateText(),
            this.dirty = !1
        }
        ,
        b.BitmapText.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.BitmapText.prototype.constructor = b.BitmapText,
        b.BitmapText.prototype.setText = function(a) {
            this.text = a || " ",
            this.dirty = !0
        }
        ,
        b.BitmapText.prototype.setStyle = function(a) {
            a = a || {},
            a.align = a.align || "left",
            this.style = a;
            var c = a.font.split(" ");
            this.fontName = c[c.length - 1],
            this.fontSize = c.length >= 2 ? parseInt(c[c.length - 2], 10) : b.BitmapText.fonts[this.fontName].size,
            this.dirty = !0,
            this.tint = a.tint
        }
        ,
        b.BitmapText.prototype.updateText = function() {
            for (var a = b.BitmapText.fonts[this.fontName], c = new b.Point, d = null, e = [], f = 0, g = [], h = 0, i = this.fontSize / a.size, j = 0; j < this.text.length; j++) {
                var k = this.text.charCodeAt(j);
                if (/(?:\r\n|\r|\n)/.test(this.text.charAt(j)))
                    g.push(c.x),
                    f = Math.max(f, c.x),
                    h++,
                    c.x = 0,
                    c.y += a.lineHeight,
                    d = null;
                else {
                    var l = a.chars[k];
                    l && (d && l[d] && (c.x += l.kerning[d]),
                    e.push({
                        texture: l.texture,
                        line: h,
                        charCode: k,
                        position: new b.Point(c.x + l.xOffset,c.y + l.yOffset)
                    }),
                    c.x += l.xAdvance,
                    d = k)
                }
            }
            g.push(c.x),
            f = Math.max(f, c.x);
            var m = [];
            for (j = 0; h >= j; j++) {
                var n = 0;
                "right" === this.style.align ? n = f - g[j] : "center" === this.style.align && (n = (f - g[j]) / 2),
                m.push(n)
            }
            var o = this.children.length
              , p = e.length
              , q = this.tint || 16777215;
            for (j = 0; p > j; j++) {
                var r = o > j ? this.children[j] : this._pool.pop();
                r ? r.setTexture(e[j].texture) : r = new b.Sprite(e[j].texture),
                r.position.x = (e[j].position.x + m[e[j].line]) * i,
                r.position.y = e[j].position.y * i,
                r.scale.x = r.scale.y = i,
                r.tint = q,
                r.parent || this.addChild(r)
            }
            for (; this.children.length > p; ) {
                var s = this.getChildAt(this.children.length - 1);
                this._pool.push(s),
                this.removeChild(s)
            }
            this.textWidth = f * i,
            this.textHeight = (c.y + a.lineHeight) * i
        }
        ,
        b.BitmapText.prototype.updateTransform = function() {
            this.dirty && (this.updateText(),
            this.dirty = !1),
            b.DisplayObjectContainer.prototype.updateTransform.call(this)
        }
        ,
        b.BitmapText.fonts = {},
        b.InteractionData = function() {
            this.global = new b.Point,
            this.target = null,
            this.originalEvent = null
        }
        ,
        b.InteractionData.prototype.getLocalPosition = function(a) {
            var c = a.worldTransform
              , d = this.global
              , e = c.a
              , f = c.b
              , g = c.tx
              , h = c.c
              , i = c.d
              , j = c.ty
              , k = 1 / (e * i + f * -h);
            return new b.Point(i * k * d.x + -f * k * d.y + (j * f - g * i) * k,e * k * d.y + -h * k * d.x + (-j * e + g * h) * k)
        }
        ,
        b.InteractionData.prototype.constructor = b.InteractionData,
        b.InteractionManager = function(a) {
            this.stage = a,
            this.mouse = new b.InteractionData,
            this.touchs = {},
            this.tempPoint = new b.Point,
            this.mouseoverEnabled = !0,
            this.pool = [],
            this.interactiveItems = [],
            this.interactionDOMElement = null,
            this.onMouseMove = this.onMouseMove.bind(this),
            this.onMouseDown = this.onMouseDown.bind(this),
            this.onMouseOut = this.onMouseOut.bind(this),
            this.onMouseUp = this.onMouseUp.bind(this),
            this.onTouchStart = this.onTouchStart.bind(this),
            this.onTouchEnd = this.onTouchEnd.bind(this),
            this.onTouchMove = this.onTouchMove.bind(this),
            this.last = 0,
            this.currentCursorStyle = "inherit",
            this.mouseOut = !1
        }
        ,
        b.InteractionManager.prototype.constructor = b.InteractionManager,
        b.InteractionManager.prototype.collectInteractiveSprite = function(a, b) {
            for (var c = a.children, d = c.length, e = d - 1; e >= 0; e--) {
                var f = c[e];
                f._interactive ? (b.interactiveChildren = !0,
                this.interactiveItems.push(f),
                f.children.length > 0 && this.collectInteractiveSprite(f, f)) : (f.__iParent = null,
                f.children.length > 0 && this.collectInteractiveSprite(f, b))
            }
        }
        ,
        b.InteractionManager.prototype.setTarget = function(a) {
            this.target = a,
            null === this.interactionDOMElement && this.setTargetDomElement(a.view)
        }
        ,
        b.InteractionManager.prototype.setTargetDomElement = function(a) {
            this.removeEvents(),
            window.navigator.msPointerEnabled && (a.style["-ms-content-zooming"] = "none",
            a.style["-ms-touch-action"] = "none"),
            this.interactionDOMElement = a,
            a.addEventListener("mousemove", this.onMouseMove, !0),
            a.addEventListener("mousedown", this.onMouseDown, !0),
            a.addEventListener("mouseout", this.onMouseOut, !0),
            a.addEventListener("touchstart", this.onTouchStart, !0),
            a.addEventListener("touchend", this.onTouchEnd, !0),
            a.addEventListener("touchmove", this.onTouchMove, !0),
            window.addEventListener("mouseup", this.onMouseUp, !0)
        }
        ,
        b.InteractionManager.prototype.removeEvents = function() {
            this.interactionDOMElement && (this.interactionDOMElement.style["-ms-content-zooming"] = "",
            this.interactionDOMElement.style["-ms-touch-action"] = "",
            this.interactionDOMElement.removeEventListener("mousemove", this.onMouseMove, !0),
            this.interactionDOMElement.removeEventListener("mousedown", this.onMouseDown, !0),
            this.interactionDOMElement.removeEventListener("mouseout", this.onMouseOut, !0),
            this.interactionDOMElement.removeEventListener("touchstart", this.onTouchStart, !0),
            this.interactionDOMElement.removeEventListener("touchend", this.onTouchEnd, !0),
            this.interactionDOMElement.removeEventListener("touchmove", this.onTouchMove, !0),
            this.interactionDOMElement = null,
            window.removeEventListener("mouseup", this.onMouseUp, !0))
        }
        ,
        b.InteractionManager.prototype.update = function() {
            if (this.target) {
                var a = Date.now()
                  , c = a - this.last;
                if (c = c * b.INTERACTION_FREQUENCY / 1e3,
                !(1 > c)) {
                    this.last = a;
                    var d = 0;
                    this.dirty && this.rebuildInteractiveGraph();
                    var e = this.interactiveItems.length
                      , f = "inherit"
                      , g = !1;
                    for (d = 0; e > d; d++) {
                        var h = this.interactiveItems[d];
                        h.__hit = this.hitTest(h, this.mouse),
                        this.mouse.target = h,
                        h.__hit && !g ? (h.buttonMode && (f = h.defaultCursor),
                        h.interactiveChildren || (g = !0),
                        h.__isOver || (h.mouseover && h.mouseover(this.mouse),
                        h.__isOver = !0)) : h.__isOver && (h.mouseout && h.mouseout(this.mouse),
                        h.__isOver = !1)
                    }
                    this.currentCursorStyle !== f && (this.currentCursorStyle = f,
                    this.interactionDOMElement.style.cursor = f)
                }
            }
        }
        ,
        b.InteractionManager.prototype.rebuildInteractiveGraph = function() {
            this.dirty = !1;
            for (var a = this.interactiveItems.length, b = 0; a > b; b++)
                this.interactiveItems[b].interactiveChildren = !1;
            this.interactiveItems = [],
            this.stage.interactive && this.interactiveItems.push(this.stage),
            this.collectInteractiveSprite(this.stage, this.stage)
        }
        ,
        b.InteractionManager.prototype.onMouseMove = function(a) {
            this.dirty && this.rebuildInteractiveGraph(),
            this.mouse.originalEvent = a || window.event;
            var b = this.interactionDOMElement.getBoundingClientRect();
            this.mouse.global.x = (a.clientX - b.left) * (this.target.width / b.width),
            this.mouse.global.y = (a.clientY - b.top) * (this.target.height / b.height);
            for (var c = this.interactiveItems.length, d = 0; c > d; d++) {
                var e = this.interactiveItems[d];
                e.mousemove && e.mousemove(this.mouse)
            }
        }
        ,
        b.InteractionManager.prototype.onMouseDown = function(a) {
            this.dirty && this.rebuildInteractiveGraph(),
            this.mouse.originalEvent = a || window.event,
            b.AUTO_PREVENT_DEFAULT && this.mouse.originalEvent.preventDefault();
            for (var c = this.interactiveItems.length, d = 0; c > d; d++) {
                var e = this.interactiveItems[d];
                if ((e.mousedown || e.click) && (e.__mouseIsDown = !0,
                e.__hit = this.hitTest(e, this.mouse),
                e.__hit && (e.mousedown && e.mousedown(this.mouse),
                e.__isDown = !0,
                !e.interactiveChildren)))
                    break
            }
        }
        ,
        b.InteractionManager.prototype.onMouseOut = function() {
            this.dirty && this.rebuildInteractiveGraph();
            var a = this.interactiveItems.length;
            this.interactionDOMElement.style.cursor = "inherit";
            for (var b = 0; a > b; b++) {
                var c = this.interactiveItems[b];
                c.__isOver && (this.mouse.target = c,
                c.mouseout && c.mouseout(this.mouse),
                c.__isOver = !1)
            }
            this.mouseOut = !0,
            this.mouse.global.x = -1e4,
            this.mouse.global.y = -1e4
        }
        ,
        b.InteractionManager.prototype.onMouseUp = function(a) {
            this.dirty && this.rebuildInteractiveGraph(),
            this.mouse.originalEvent = a || window.event;
            for (var b = this.interactiveItems.length, c = !1, d = 0; b > d; d++) {
                var e = this.interactiveItems[d];
                e.__hit = this.hitTest(e, this.mouse),
                e.__hit && !c ? (e.mouseup && e.mouseup(this.mouse),
                e.__isDown && e.click && e.click(this.mouse),
                e.interactiveChildren || (c = !0)) : e.__isDown && e.mouseupoutside && e.mouseupoutside(this.mouse),
                e.__isDown = !1
            }
        }
        ,
        b.InteractionManager.prototype.hitTest = function(a, c) {
            var d = c.global;
            if (!a.worldVisible)
                return !1;
            var e = a instanceof b.Sprite
              , f = a.worldTransform
              , g = f.a
              , h = f.b
              , i = f.tx
              , j = f.c
              , k = f.d
              , l = f.ty
              , m = 1 / (g * k + h * -j)
              , n = k * m * d.x + -h * m * d.y + (l * h - i * k) * m
              , o = g * m * d.y + -j * m * d.x + (-l * g + i * j) * m;
            if (c.target = a,
            a.hitArea && a.hitArea.contains)
                return a.hitArea.contains(n, o) ? (c.target = a,
                !0) : !1;
            if (e) {
                var p, q = a.texture.frame.width, r = a.texture.frame.height, s = -q * a.anchor.x;
                if (n > s && s + q > n && (p = -r * a.anchor.y,
                o > p && p + r > o))
                    return c.target = a,
                    !0
            }
            for (var t = a.children.length, u = 0; t > u; u++) {
                var v = a.children[u]
                  , w = this.hitTest(v, c);
                if (w)
                    return c.target = a,
                    !0
            }
            return !1
        }
        ,
        b.InteractionManager.prototype.onTouchMove = function(a) {
            this.dirty && this.rebuildInteractiveGraph();
            var b, c = this.interactionDOMElement.getBoundingClientRect(), d = a.changedTouches, e = 0;
            for (e = 0; e < d.length; e++) {
                var f = d[e];
                b = this.touchs[f.identifier],
                b.originalEvent = a || window.event,
                b.global.x = (f.clientX - c.left) * (this.target.width / c.width),
                b.global.y = (f.clientY - c.top) * (this.target.height / c.height),
                navigator.isCocoonJS && (b.global.x = f.clientX,
                b.global.y = f.clientY);
                for (var g = 0; g < this.interactiveItems.length; g++) {
                    var h = this.interactiveItems[g];
                    h.touchmove && h.__touchData && h.__touchData[f.identifier] && h.touchmove(b)
                }
            }
        }
        ,
        b.InteractionManager.prototype.onTouchStart = function(a) {
            this.dirty && this.rebuildInteractiveGraph();
            var c = this.interactionDOMElement.getBoundingClientRect();
            b.AUTO_PREVENT_DEFAULT && a.preventDefault();
            for (var d = a.changedTouches, e = 0; e < d.length; e++) {
                var f = d[e]
                  , g = this.pool.pop();
                g || (g = new b.InteractionData),
                g.originalEvent = a || window.event,
                this.touchs[f.identifier] = g,
                g.global.x = (f.clientX - c.left) * (this.target.width / c.width),
                g.global.y = (f.clientY - c.top) * (this.target.height / c.height),
                navigator.isCocoonJS && (g.global.x = f.clientX,
                g.global.y = f.clientY);
                for (var h = this.interactiveItems.length, i = 0; h > i; i++) {
                    var j = this.interactiveItems[i];
                    if ((j.touchstart || j.tap) && (j.__hit = this.hitTest(j, g),
                    j.__hit && (j.touchstart && j.touchstart(g),
                    j.__isDown = !0,
                    j.__touchData = j.__touchData || {},
                    j.__touchData[f.identifier] = g,
                    !j.interactiveChildren)))
                        break
                }
            }
        }
        ,
        b.InteractionManager.prototype.onTouchEnd = function(a) {
            this.dirty && this.rebuildInteractiveGraph();
            for (var b = this.interactionDOMElement.getBoundingClientRect(), c = a.changedTouches, d = 0; d < c.length; d++) {
                var e = c[d]
                  , f = this.touchs[e.identifier]
                  , g = !1;
                f.global.x = (e.clientX - b.left) * (this.target.width / b.width),
                f.global.y = (e.clientY - b.top) * (this.target.height / b.height),
                navigator.isCocoonJS && (f.global.x = e.clientX,
                f.global.y = e.clientY);
                for (var h = this.interactiveItems.length, i = 0; h > i; i++) {
                    var j = this.interactiveItems[i];
                    j.__touchData && j.__touchData[e.identifier] && (j.__hit = this.hitTest(j, j.__touchData[e.identifier]),
                    f.originalEvent = a || window.event,
                    (j.touchend || j.tap) && (j.__hit && !g ? (j.touchend && j.touchend(f),
                    j.__isDown && j.tap && j.tap(f),
                    j.interactiveChildren || (g = !0)) : j.__isDown && j.touchendoutside && j.touchendoutside(f),
                    j.__isDown = !1),
                    j.__touchData[e.identifier] = null)
                }
                this.pool.push(f),
                this.touchs[e.identifier] = null
            }
        }
        ,
        b.Stage = function(a) {
            b.DisplayObjectContainer.call(this),
            this.worldTransform = new b.Matrix,
            this.interactive = !0,
            this.interactionManager = new b.InteractionManager(this),
            this.dirty = !0,
            this.stage = this,
            this.stage.hitArea = new b.Rectangle(0,0,1e5,1e5),
            this.setBackgroundColor(a)
        }
        ,
        b.Stage.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.Stage.prototype.constructor = b.Stage,
        b.Stage.prototype.setInteractionDelegate = function(a) {
            this.interactionManager.setTargetDomElement(a)
        }
        ,
        b.Stage.prototype.updateTransform = function() {
            this.worldAlpha = 1;
            for (var a = 0, b = this.children.length; b > a; a++)
                this.children[a].updateTransform();
            this.dirty && (this.dirty = !1,
            this.interactionManager.dirty = !0),
            this.interactive && this.interactionManager.update()
        }
        ,
        b.Stage.prototype.setBackgroundColor = function(a) {
            this.backgroundColor = a || 0,
            this.backgroundColorSplit = b.hex2rgb(this.backgroundColor);
            var c = this.backgroundColor.toString(16);
            c = "000000".substr(0, 6 - c.length) + c,
            this.backgroundColorString = "#" + c
        }
        ,
        b.Stage.prototype.getMousePosition = function() {
            return this.interactionManager.mouse.global
        }
        ;
        for (var c = 0, d = ["ms", "moz", "webkit", "o"], e = 0; e < d.length && !window.requestAnimationFrame; ++e)
            window.requestAnimationFrame = window[d[e] + "RequestAnimationFrame"],
            window.cancelAnimationFrame = window[d[e] + "CancelAnimationFrame"] || window[d[e] + "CancelRequestAnimationFrame"];
        window.requestAnimationFrame || (window.requestAnimationFrame = function(a) {
            var b = (new Date).getTime()
              , d = Math.max(0, 16 - (b - c))
              , e = window.setTimeout(function() {
                a(b + d)
            }, d);
            return c = b + d,
            e
        }
        ),
        window.cancelAnimationFrame || (window.cancelAnimationFrame = function(a) {
            clearTimeout(a)
        }
        ),
        window.requestAnimFrame = window.requestAnimationFrame,
        b.hex2rgb = function(a) {
            return [(a >> 16 & 255) / 255, (a >> 8 & 255) / 255, (255 & a) / 255]
        }
        ,
        b.rgb2hex = function(a) {
            return (255 * a[0] << 16) + (255 * a[1] << 8) + 255 * a[2]
        }
        ,
        "function" != typeof Function.prototype.bind && (Function.prototype.bind = function() {
            var a = Array.prototype.slice;
            return function(b) {
                function c() {
                    var f = e.concat(a.call(arguments));
                    d.apply(this instanceof c ? this : b, f)
                }
                var d = this
                  , e = a.call(arguments, 1);
                if ("function" != typeof d)
                    throw new TypeError;
                return c.prototype = function f(a) {
                    return a && (f.prototype = a),
                    this instanceof f ? void 0 : new f
                }(d.prototype),
                c
            }
        }()),
        b.AjaxRequest = function() {
            var a = ["Msxml2.XMLHTTP.6.0", "Msxml2.XMLHTTP.3.0", "Microsoft.XMLHTTP"];
            if (!window.ActiveXObject)
                return window.XMLHttpRequest ? new window.XMLHttpRequest : !1;
            for (var b = 0; b < a.length; b++)
                try {
                    return new window.ActiveXObject(a[b])
                } catch (c) {}
        }
        ,
        b.canUseNewCanvasBlendModes = function() {
            var a = document.createElement("canvas");
            a.width = 1,
            a.height = 1;
            var b = a.getContext("2d");
            return b.fillStyle = "#000",
            b.fillRect(0, 0, 1, 1),
            b.globalCompositeOperation = "multiply",
            b.fillStyle = "#fff",
            b.fillRect(0, 0, 1, 1),
            0 === b.getImageData(0, 0, 1, 1).data[0]
        }
        ,
        b.getNextPowerOfTwo = function(a) {
            if (a > 0 && 0 === (a & a - 1))
                return a;
            for (var b = 1; a > b; )
                b <<= 1;
            return b
        }
        ,
        b.EventTarget = function() {
            var a = {};
            this.addEventListener = this.on = function(b, c) {
                void 0 === a[b] && (a[b] = []),
                -1 === a[b].indexOf(c) && a[b].unshift(c)
            }
            ,
            this.dispatchEvent = this.emit = function(b) {
                if (a[b.type] && a[b.type].length)
                    for (var c = a[b.type].length - 1; c >= 0; c--)
                        a[b.type][c](b)
            }
            ,
            this.removeEventListener = this.off = function(b, c) {
                if (void 0 !== a[b]) {
                    var d = a[b].indexOf(c);
                    -1 !== d && a[b].splice(d, 1)
                }
            }
            ,
            this.removeAllEventListeners = function(b) {
                var c = a[b];
                c && (c.length = 0)
            }
        }
        ,
        b.autoDetectRenderer = function(a, c, d, e, f) {
            a || (a = 800),
            c || (c = 600);
            var g = function() {
                try {
                    var a = document.createElement("canvas");
                    return !!window.WebGLRenderingContext && (a.getContext("webgl") || a.getContext("experimental-webgl"))
                } catch (b) {
                    return !1
                }
            }();
            return g ? new b.WebGLRenderer(a,c,d,e,f) : new b.CanvasRenderer(a,c,d,e)
        }
        ,
        b.autoDetectRecommendedRenderer = function(a, c, d, e, f) {
            a || (a = 800),
            c || (c = 600);
            var g = function() {
                try {
                    var a = document.createElement("canvas");
                    return !!window.WebGLRenderingContext && (a.getContext("webgl") || a.getContext("experimental-webgl"))
                } catch (b) {
                    return !1
                }
            }()
              , h = /Android/i.test(navigator.userAgent);
            return g && !h ? new b.WebGLRenderer(a,c,d,e,f) : new b.CanvasRenderer(a,c,d,e)
        }
        ,
        b.PolyK = {},
        b.PolyK.Triangulate = function(a) {
            var c = !0
              , d = a.length >> 1;
            if (3 > d)
                return [];
            for (var e = [], f = [], g = 0; d > g; g++)
                f.push(g);
            g = 0;
            for (var h = d; h > 3; ) {
                var i = f[(g + 0) % h]
                  , j = f[(g + 1) % h]
                  , k = f[(g + 2) % h]
                  , l = a[2 * i]
                  , m = a[2 * i + 1]
                  , n = a[2 * j]
                  , o = a[2 * j + 1]
                  , p = a[2 * k]
                  , q = a[2 * k + 1]
                  , r = !1;
                if (b.PolyK._convex(l, m, n, o, p, q, c)) {
                    r = !0;
                    for (var s = 0; h > s; s++) {
                        var t = f[s];
                        if (t !== i && t !== j && t !== k && b.PolyK._PointInTriangle(a[2 * t], a[2 * t + 1], l, m, n, o, p, q)) {
                            r = !1;
                            break
                        }
                    }
                }
                if (r)
                    e.push(i, j, k),
                    f.splice((g + 1) % h, 1),
                    h--,
                    g = 0;
                else if (g++ > 3 * h) {
                    if (!c)
                        return window.console.log("PIXI Warning: shape too complex to fill"),
                        [];
                    for (e = [],
                    f = [],
                    g = 0; d > g; g++)
                        f.push(g);
                    g = 0,
                    h = d,
                    c = !1
                }
            }
            return e.push(f[0], f[1], f[2]),
            e
        }
        ,
        b.PolyK._PointInTriangle = function(a, b, c, d, e, f, g, h) {
            var i = g - c
              , j = h - d
              , k = e - c
              , l = f - d
              , m = a - c
              , n = b - d
              , o = i * i + j * j
              , p = i * k + j * l
              , q = i * m + j * n
              , r = k * k + l * l
              , s = k * m + l * n
              , t = 1 / (o * r - p * p)
              , u = (r * q - p * s) * t
              , v = (o * s - p * q) * t;
            return u >= 0 && v >= 0 && 1 > u + v
        }
        ,
        b.PolyK._convex = function(a, b, c, d, e, f, g) {
            return (b - d) * (e - c) + (c - a) * (f - d) >= 0 === g
        }
        ,
        b.initDefaultShaders = function() {}
        ,
        b.CompileVertexShader = function(a, c) {
            return b._CompileShader(a, c, a.VERTEX_SHADER)
        }
        ,
        b.CompileFragmentShader = function(a, c) {
            return b._CompileShader(a, c, a.FRAGMENT_SHADER)
        }
        ,
        b._CompileShader = function(a, b, c) {
            var d = b.join("\n")
              , e = a.createShader(c);
            return a.shaderSource(e, d),
            a.compileShader(e),
            a.getShaderParameter(e, a.COMPILE_STATUS) ? e : (window.console.log(a.getShaderInfoLog(e)),
            null)
        }
        ,
        b.compileProgram = function(a, c, d) {
            var e = b.CompileFragmentShader(a, d)
              , f = b.CompileVertexShader(a, c)
              , g = a.createProgram();
            return a.attachShader(g, f),
            a.attachShader(g, e),
            a.linkProgram(g),
            a.getProgramParameter(g, a.LINK_STATUS) || window.console.log("Could not initialise shaders"),
            g
        }
        ,
        b.PixiShader = function(a) {
            this._UID = b._UID++,
            this.gl = a,
            this.program = null,
            this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"],
            this.textureCount = 0,
            this.attributes = [],
            this.init()
        }
        ,
        b.PixiShader.prototype.init = function() {
            var a = this.gl
              , c = b.compileProgram(a, this.vertexSrc || b.PixiShader.defaultVertexSrc, this.fragmentSrc);
            a.useProgram(c),
            this.uSampler = a.getUniformLocation(c, "uSampler"),
            this.projectionVector = a.getUniformLocation(c, "projectionVector"),
            this.offsetVector = a.getUniformLocation(c, "offsetVector"),
            this.dimensions = a.getUniformLocation(c, "dimensions"),
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition"),
            this.aTextureCoord = a.getAttribLocation(c, "aTextureCoord"),
            this.colorAttribute = a.getAttribLocation(c, "aColor"),
            -1 === this.colorAttribute && (this.colorAttribute = 2),
            this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
            for (var d in this.uniforms)
                this.uniforms[d].uniformLocation = a.getUniformLocation(c, d);
            this.initUniforms(),
            this.program = c
        }
        ,
        b.PixiShader.prototype.initUniforms = function() {
            this.textureCount = 1;
            var a, b = this.gl;
            for (var c in this.uniforms) {
                a = this.uniforms[c];
                var d = a.type;
                "sampler2D" === d ? (a._init = !1,
                null !== a.value && this.initSampler2D(a)) : "mat2" === d || "mat3" === d || "mat4" === d ? (a.glMatrix = !0,
                a.glValueLength = 1,
                "mat2" === d ? a.glFunc = b.uniformMatrix2fv : "mat3" === d ? a.glFunc = b.uniformMatrix3fv : "mat4" === d && (a.glFunc = b.uniformMatrix4fv)) : (a.glFunc = b["uniform" + d],
                a.glValueLength = "2f" === d || "2i" === d ? 2 : "3f" === d || "3i" === d ? 3 : "4f" === d || "4i" === d ? 4 : 1)
            }
        }
        ,
        b.PixiShader.prototype.initSampler2D = function(a) {
            if (a.value && a.value.baseTexture && a.value.baseTexture.hasLoaded) {
                var b = this.gl;
                if (b.activeTexture(b["TEXTURE" + this.textureCount]),
                b.bindTexture(b.TEXTURE_2D, a.value.baseTexture._glTextures[b.id]),
                a.textureData) {
                    var c = a.textureData
                      , d = c.magFilter ? c.magFilter : b.LINEAR
                      , e = c.minFilter ? c.minFilter : b.LINEAR
                      , f = c.wrapS ? c.wrapS : b.CLAMP_TO_EDGE
                      , g = c.wrapT ? c.wrapT : b.CLAMP_TO_EDGE
                      , h = c.luminance ? b.LUMINANCE : b.RGBA;
                    if (c.repeat && (f = b.REPEAT,
                    g = b.REPEAT),
                    b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL, !!c.flipY),
                    c.width) {
                        var i = c.width ? c.width : 512
                          , j = c.height ? c.height : 2
                          , k = c.border ? c.border : 0;
                        b.texImage2D(b.TEXTURE_2D, 0, h, i, j, k, h, b.UNSIGNED_BYTE, null)
                    } else
                        b.texImage2D(b.TEXTURE_2D, 0, h, b.RGBA, b.UNSIGNED_BYTE, a.value.baseTexture.source);
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, d),
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, e),
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, f),
                    b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, g)
                }
                b.uniform1i(a.uniformLocation, this.textureCount),
                a._init = !0,
                this.textureCount++
            }
        }
        ,
        b.PixiShader.prototype.syncUniforms = function() {
            this.textureCount = 1;
            var a, c = this.gl;
            for (var d in this.uniforms)
                a = this.uniforms[d],
                1 === a.glValueLength ? a.glMatrix === !0 ? a.glFunc.call(c, a.uniformLocation, a.transpose, a.value) : a.glFunc.call(c, a.uniformLocation, a.value) : 2 === a.glValueLength ? a.glFunc.call(c, a.uniformLocation, a.value.x, a.value.y) : 3 === a.glValueLength ? a.glFunc.call(c, a.uniformLocation, a.value.x, a.value.y, a.value.z) : 4 === a.glValueLength ? a.glFunc.call(c, a.uniformLocation, a.value.x, a.value.y, a.value.z, a.value.w) : "sampler2D" === a.type && (a._init ? (c.activeTexture(c["TEXTURE" + this.textureCount]),
                c.bindTexture(c.TEXTURE_2D, a.value.baseTexture._glTextures[c.id] || b.createWebGLTexture(a.value.baseTexture, c)),
                c.uniform1i(a.uniformLocation, this.textureCount),
                this.textureCount++) : this.initSampler2D(a))
        }
        ,
        b.PixiShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program),
            this.uniforms = null,
            this.gl = null,
            this.attributes = null
        }
        ,
        b.PixiShader.defaultVertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "attribute vec2 aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;", "   vColor = vec4(color * aColor.x, aColor.x);", "}"],
        b.PixiFastShader = function(a) {
            this._UID = b._UID++,
            this.gl = a,
            this.program = null,
            this.fragmentSrc = ["precision lowp float;", "varying vec2 vTextureCoord;", "varying float vColor;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;", "}"],
            this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aPositionCoord;", "attribute vec2 aScale;", "attribute float aRotation;", "attribute vec2 aTextureCoord;", "attribute float aColor;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform mat3 uMatrix;", "varying vec2 vTextureCoord;", "varying float vColor;", "const vec2 center = vec2(-1.0, 1.0);", "void main(void) {", "   vec2 v;", "   vec2 sv = aVertexPosition * aScale;", "   v.x = (sv.x) * cos(aRotation) - (sv.y) * sin(aRotation);", "   v.y = (sv.x) * sin(aRotation) + (sv.y) * cos(aRotation);", "   v = ( uMatrix * vec3(v + aPositionCoord , 1.0) ).xy ;", "   gl_Position = vec4( ( v / projectionVector) + center , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "   vColor = aColor;", "}"],
            this.textureCount = 0,
            this.init()
        }
        ,
        b.PixiFastShader.prototype.init = function() {
            var a = this.gl
              , c = b.compileProgram(a, this.vertexSrc, this.fragmentSrc);
            a.useProgram(c),
            this.uSampler = a.getUniformLocation(c, "uSampler"),
            this.projectionVector = a.getUniformLocation(c, "projectionVector"),
            this.offsetVector = a.getUniformLocation(c, "offsetVector"),
            this.dimensions = a.getUniformLocation(c, "dimensions"),
            this.uMatrix = a.getUniformLocation(c, "uMatrix"),
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition"),
            this.aPositionCoord = a.getAttribLocation(c, "aPositionCoord"),
            this.aScale = a.getAttribLocation(c, "aScale"),
            this.aRotation = a.getAttribLocation(c, "aRotation"),
            this.aTextureCoord = a.getAttribLocation(c, "aTextureCoord"),
            this.colorAttribute = a.getAttribLocation(c, "aColor"),
            -1 === this.colorAttribute && (this.colorAttribute = 2),
            this.attributes = [this.aVertexPosition, this.aPositionCoord, this.aScale, this.aRotation, this.aTextureCoord, this.colorAttribute],
            this.program = c
        }
        ,
        b.PixiFastShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program),
            this.uniforms = null,
            this.gl = null,
            this.attributes = null
        }
        ,
        b.StripShader = function(a) {
            this._UID = b._UID++,
            this.gl = a,
            this.program = null,
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "uniform float alpha;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y));", "}"],
            this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec2 aTextureCoord;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "varying vec2 vTextureCoord;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vTextureCoord = aTextureCoord;", "}"],
            this.init()
        }
        ,
        b.StripShader.prototype.init = function() {
            var a = this.gl
              , c = b.compileProgram(a, this.vertexSrc, this.fragmentSrc);
            a.useProgram(c),
            this.uSampler = a.getUniformLocation(c, "uSampler"),
            this.projectionVector = a.getUniformLocation(c, "projectionVector"),
            this.offsetVector = a.getUniformLocation(c, "offsetVector"),
            this.colorAttribute = a.getAttribLocation(c, "aColor"),
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition"),
            this.aTextureCoord = a.getAttribLocation(c, "aTextureCoord"),
            this.attributes = [this.aVertexPosition, this.aTextureCoord],
            this.translationMatrix = a.getUniformLocation(c, "translationMatrix"),
            this.alpha = a.getUniformLocation(c, "alpha"),
            this.program = c
        }
        ,
        b.PrimitiveShader = function(a) {
            this._UID = b._UID++,
            this.gl = a,
            this.program = null,
            this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"],
            this.vertexSrc = ["attribute vec2 aVertexPosition;", "attribute vec4 aColor;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform float alpha;", "uniform vec3 tint;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = aColor * vec4(tint * alpha, alpha);", "}"],
            this.init()
        }
        ,
        b.PrimitiveShader.prototype.init = function() {
            var a = this.gl
              , c = b.compileProgram(a, this.vertexSrc, this.fragmentSrc);
            a.useProgram(c),
            this.projectionVector = a.getUniformLocation(c, "projectionVector"),
            this.offsetVector = a.getUniformLocation(c, "offsetVector"),
            this.tintColor = a.getUniformLocation(c, "tint"),
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition"),
            this.colorAttribute = a.getAttribLocation(c, "aColor"),
            this.attributes = [this.aVertexPosition, this.colorAttribute],
            this.translationMatrix = a.getUniformLocation(c, "translationMatrix"),
            this.alpha = a.getUniformLocation(c, "alpha"),
            this.program = c
        }
        ,
        b.PrimitiveShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program),
            this.uniforms = null,
            this.gl = null,
            this.attribute = null
        }
        ,
        b.ComplexPrimitiveShader = function(a) {
            this._UID = b._UID++,
            this.gl = a,
            this.program = null,
            this.fragmentSrc = ["precision mediump float;", "varying vec4 vColor;", "void main(void) {", "   gl_FragColor = vColor;", "}"],
            this.vertexSrc = ["attribute vec2 aVertexPosition;", "uniform mat3 translationMatrix;", "uniform vec2 projectionVector;", "uniform vec2 offsetVector;", "uniform vec3 tint;", "uniform float alpha;", "uniform vec3 color;", "varying vec4 vColor;", "void main(void) {", "   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);", "   v -= offsetVector.xyx;", "   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);", "   vColor = vec4(color * alpha * tint, alpha);", "}"],
            this.init()
        }
        ,
        b.ComplexPrimitiveShader.prototype.init = function() {
            var a = this.gl
              , c = b.compileProgram(a, this.vertexSrc, this.fragmentSrc);
            a.useProgram(c),
            this.projectionVector = a.getUniformLocation(c, "projectionVector"),
            this.offsetVector = a.getUniformLocation(c, "offsetVector"),
            this.tintColor = a.getUniformLocation(c, "tint"),
            this.color = a.getUniformLocation(c, "color"),
            this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition"),
            this.attributes = [this.aVertexPosition, this.colorAttribute],
            this.translationMatrix = a.getUniformLocation(c, "translationMatrix"),
            this.alpha = a.getUniformLocation(c, "alpha"),
            this.program = c
        }
        ,
        b.ComplexPrimitiveShader.prototype.destroy = function() {
            this.gl.deleteProgram(this.program),
            this.uniforms = null,
            this.gl = null,
            this.attribute = null
        }
        ,
        b.WebGLGraphics = function() {}
        ,
        b.WebGLGraphics.renderGraphics = function(a, c) {
            var d, e = c.gl, f = c.projection, g = c.offset, h = c.shaderManager.primitiveShader;
            a.dirty && b.WebGLGraphics.updateGraphics(a, e);
            for (var i = a._webGL[e.id], j = 0; j < i.data.length; j++)
                1 === i.data[j].mode ? (d = i.data[j],
                c.stencilManager.pushStencil(a, d, c),
                e.drawElements(e.TRIANGLE_FAN, 4, e.UNSIGNED_SHORT, 2 * (d.indices.length - 4)),
                c.stencilManager.popStencil(a, d, c),
                this.last = d.mode) : (d = i.data[j],
                c.shaderManager.setShader(h),
                h = c.shaderManager.primitiveShader,
                e.uniformMatrix3fv(h.translationMatrix, !1, a.worldTransform.toArray(!0)),
                e.uniform2f(h.projectionVector, f.x, -f.y),
                e.uniform2f(h.offsetVector, -g.x, -g.y),
                e.uniform3fv(h.tintColor, b.hex2rgb(a.tint)),
                e.uniform1f(h.alpha, a.worldAlpha),
                e.bindBuffer(e.ARRAY_BUFFER, d.buffer),
                e.vertexAttribPointer(h.aVertexPosition, 2, e.FLOAT, !1, 24, 0),
                e.vertexAttribPointer(h.colorAttribute, 4, e.FLOAT, !1, 24, 8),
                e.bindBuffer(e.ELEMENT_ARRAY_BUFFER, d.indexBuffer),
                e.drawElements(e.TRIANGLE_STRIP, d.indices.length, e.UNSIGNED_SHORT, 0))
        }
        ,
        b.WebGLGraphics.updateGraphics = function(a, c) {
            var d = a._webGL[c.id];
            d || (d = a._webGL[c.id] = {
                lastIndex: 0,
                data: [],
                gl: c
            }),
            a.dirty = !1;
            var e;
            if (a.clearDirty) {
                for (a.clearDirty = !1,
                e = 0; e < d.data.length; e++) {
                    var f = d.data[e];
                    f.reset(),
                    b.WebGLGraphics.graphicsDataPool.push(f)
                }
                d.data = [],
                d.lastIndex = 0
            }
            var g;
            for (e = d.lastIndex; e < a.graphicsData.length; e++) {
                var h = a.graphicsData[e];
                h.type === b.Graphics.POLY ? (h.fill && h.points.length > 6 && (h.points.length > 10 ? (g = b.WebGLGraphics.switchMode(d, 1),
                b.WebGLGraphics.buildComplexPoly(h, g)) : (g = b.WebGLGraphics.switchMode(d, 0),
                b.WebGLGraphics.buildPoly(h, g))),
                h.lineWidth > 0 && (g = b.WebGLGraphics.switchMode(d, 0),
                b.WebGLGraphics.buildLine(h, g))) : (g = b.WebGLGraphics.switchMode(d, 0),
                h.type === b.Graphics.RECT ? b.WebGLGraphics.buildRectangle(h, g) : h.type === b.Graphics.CIRC || h.type === b.Graphics.ELIP ? b.WebGLGraphics.buildCircle(h, g) : h.type === b.Graphics.RREC && b.WebGLGraphics.buildRoundedRectangle(h, g)),
                d.lastIndex++
            }
            for (e = 0; e < d.data.length; e++)
                g = d.data[e],
                g.dirty && g.upload()
        }
        ,
        b.WebGLGraphics.switchMode = function(a, c) {
            var d;
            return a.data.length ? (d = a.data[a.data.length - 1],
            (d.mode !== c || 1 === c) && (d = b.WebGLGraphics.graphicsDataPool.pop() || new b.WebGLGraphicsData(a.gl),
            d.mode = c,
            a.data.push(d))) : (d = b.WebGLGraphics.graphicsDataPool.pop() || new b.WebGLGraphicsData(a.gl),
            d.mode = c,
            a.data.push(d)),
            d.dirty = !0,
            d
        }
        ,
        b.WebGLGraphics.buildRectangle = function(a, c) {
            var d = a.points
              , e = d[0]
              , f = d[1]
              , g = d[2]
              , h = d[3];
            if (a.fill) {
                var i = b.hex2rgb(a.fillColor)
                  , j = a.fillAlpha
                  , k = i[0] * j
                  , l = i[1] * j
                  , m = i[2] * j
                  , n = c.points
                  , o = c.indices
                  , p = n.length / 6;
                n.push(e, f),
                n.push(k, l, m, j),
                n.push(e + g, f),
                n.push(k, l, m, j),
                n.push(e, f + h),
                n.push(k, l, m, j),
                n.push(e + g, f + h),
                n.push(k, l, m, j),
                o.push(p, p, p + 1, p + 2, p + 3, p + 3)
            }
            if (a.lineWidth) {
                var q = a.points;
                a.points = [e, f, e + g, f, e + g, f + h, e, f + h, e, f],
                b.WebGLGraphics.buildLine(a, c),
                a.points = q
            }
        }
        ,
        b.WebGLGraphics.buildRoundedRectangle = function(a, c) {
            var d = a.points
              , e = d[0]
              , f = d[1]
              , g = d[2]
              , h = d[3]
              , i = d[4]
              , j = [];
            if (j.push(e, f + i),
            j = j.concat(b.WebGLGraphics.quadraticBezierCurve(e, f + h - i, e, f + h, e + i, f + h)),
            j = j.concat(b.WebGLGraphics.quadraticBezierCurve(e + g - i, f + h, e + g, f + h, e + g, f + h - i)),
            j = j.concat(b.WebGLGraphics.quadraticBezierCurve(e + g, f + i, e + g, f, e + g - i, f)),
            j = j.concat(b.WebGLGraphics.quadraticBezierCurve(e + i, f, e, f, e, f + i)),
            a.fill) {
                var k = b.hex2rgb(a.fillColor)
                  , l = a.fillAlpha
                  , m = k[0] * l
                  , n = k[1] * l
                  , o = k[2] * l
                  , p = c.points
                  , q = c.indices
                  , r = p.length / 6
                  , s = b.PolyK.Triangulate(j)
                  , t = 0;
                for (t = 0; t < s.length; t += 3)
                    q.push(s[t] + r),
                    q.push(s[t] + r),
                    q.push(s[t + 1] + r),
                    q.push(s[t + 2] + r),
                    q.push(s[t + 2] + r);
                for (t = 0; t < j.length; t++)
                    p.push(j[t], j[++t], m, n, o, l)
            }
            if (a.lineWidth) {
                var u = a.points;
                a.points = j,
                b.WebGLGraphics.buildLine(a, c),
                a.points = u
            }
        }
        ,
        b.WebGLGraphics.quadraticBezierCurve = function(a, b, c, d, e, f) {
            function g(a, b, c) {
                var d = b - a;
                return a + d * c
            }
            for (var h, i, j, k, l, m, n = 20, o = [], p = 0, q = 0; n >= q; q++)
                p = q / n,
                h = g(a, c, p),
                i = g(b, d, p),
                j = g(c, e, p),
                k = g(d, f, p),
                l = g(h, j, p),
                m = g(i, k, p),
                o.push(l, m);
            return o
        }
        ,
        b.WebGLGraphics.buildCircle = function(a, c) {
            var d = a.points
              , e = d[0]
              , f = d[1]
              , g = d[2]
              , h = d[3]
              , i = 40
              , j = 2 * Math.PI / i
              , k = 0;
            if (a.fill) {
                var l = b.hex2rgb(a.fillColor)
                  , m = a.fillAlpha
                  , n = l[0] * m
                  , o = l[1] * m
                  , p = l[2] * m
                  , q = c.points
                  , r = c.indices
                  , s = q.length / 6;
                for (r.push(s),
                k = 0; i + 1 > k; k++)
                    q.push(e, f, n, o, p, m),
                    q.push(e + Math.sin(j * k) * g, f + Math.cos(j * k) * h, n, o, p, m),
                    r.push(s++, s++);
                r.push(s - 1)
            }
            if (a.lineWidth) {
                var t = a.points;
                for (a.points = [],
                k = 0; i + 1 > k; k++)
                    a.points.push(e + Math.sin(j * k) * g, f + Math.cos(j * k) * h);
                b.WebGLGraphics.buildLine(a, c),
                a.points = t
            }
        }
        ,
        b.WebGLGraphics.buildLine = function(a, c) {
            var d = 0
              , e = a.points;
            if (0 !== e.length) {
                if (a.lineWidth % 2)
                    for (d = 0; d < e.length; d++)
                        e[d] += .5;
                var f = new b.Point(e[0],e[1])
                  , g = new b.Point(e[e.length - 2],e[e.length - 1]);
                if (f.x === g.x && f.y === g.y) {
                    e = e.slice(),
                    e.pop(),
                    e.pop(),
                    g = new b.Point(e[e.length - 2],e[e.length - 1]);
                    var h = g.x + .5 * (f.x - g.x)
                      , i = g.y + .5 * (f.y - g.y);
                    e.unshift(h, i),
                    e.push(h, i)
                }
                var j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G = c.points, H = c.indices, I = e.length / 2, J = e.length, K = G.length / 6, L = a.lineWidth / 2, M = b.hex2rgb(a.lineColor), N = a.lineAlpha, O = M[0] * N, P = M[1] * N, Q = M[2] * N;
                for (l = e[0],
                m = e[1],
                n = e[2],
                o = e[3],
                r = -(m - o),
                s = l - n,
                F = Math.sqrt(r * r + s * s),
                r /= F,
                s /= F,
                r *= L,
                s *= L,
                G.push(l - r, m - s, O, P, Q, N),
                G.push(l + r, m + s, O, P, Q, N),
                d = 1; I - 1 > d; d++)
                    l = e[2 * (d - 1)],
                    m = e[2 * (d - 1) + 1],
                    n = e[2 * d],
                    o = e[2 * d + 1],
                    p = e[2 * (d + 1)],
                    q = e[2 * (d + 1) + 1],
                    r = -(m - o),
                    s = l - n,
                    F = Math.sqrt(r * r + s * s),
                    r /= F,
                    s /= F,
                    r *= L,
                    s *= L,
                    t = -(o - q),
                    u = n - p,
                    F = Math.sqrt(t * t + u * u),
                    t /= F,
                    u /= F,
                    t *= L,
                    u *= L,
                    x = -s + m - (-s + o),
                    y = -r + n - (-r + l),
                    z = (-r + l) * (-s + o) - (-r + n) * (-s + m),
                    A = -u + q - (-u + o),
                    B = -t + n - (-t + p),
                    C = (-t + p) * (-u + o) - (-t + n) * (-u + q),
                    D = x * B - A * y,
                    Math.abs(D) < .1 ? (D += 10.1,
                    G.push(n - r, o - s, O, P, Q, N),
                    G.push(n + r, o + s, O, P, Q, N)) : (j = (y * C - B * z) / D,
                    k = (A * z - x * C) / D,
                    E = (j - n) * (j - n) + (k - o) + (k - o),
                    E > 19600 ? (v = r - t,
                    w = s - u,
                    F = Math.sqrt(v * v + w * w),
                    v /= F,
                    w /= F,
                    v *= L,
                    w *= L,
                    G.push(n - v, o - w),
                    G.push(O, P, Q, N),
                    G.push(n + v, o + w),
                    G.push(O, P, Q, N),
                    G.push(n - v, o - w),
                    G.push(O, P, Q, N),
                    J++) : (G.push(j, k),
                    G.push(O, P, Q, N),
                    G.push(n - (j - n), o - (k - o)),
                    G.push(O, P, Q, N)));
                for (l = e[2 * (I - 2)],
                m = e[2 * (I - 2) + 1],
                n = e[2 * (I - 1)],
                o = e[2 * (I - 1) + 1],
                r = -(m - o),
                s = l - n,
                F = Math.sqrt(r * r + s * s),
                r /= F,
                s /= F,
                r *= L,
                s *= L,
                G.push(n - r, o - s),
                G.push(O, P, Q, N),
                G.push(n + r, o + s),
                G.push(O, P, Q, N),
                H.push(K),
                d = 0; J > d; d++)
                    H.push(K++);
                H.push(K - 1)
            }
        }
        ,
        b.WebGLGraphics.buildComplexPoly = function(a, c) {
            var d = a.points.slice();
            if (!(d.length < 6)) {
                var e = c.indices;
                c.points = d,
                c.alpha = a.fillAlpha,
                c.color = b.hex2rgb(a.fillColor);
                for (var f, g, h = 1 / 0, i = -1 / 0, j = 1 / 0, k = -1 / 0, l = 0; l < d.length; l += 2)
                    f = d[l],
                    g = d[l + 1],
                    h = h > f ? f : h,
                    i = f > i ? f : i,
                    j = j > g ? g : j,
                    k = g > k ? g : k;
                d.push(h, j, i, j, i, k, h, k);
                var m = d.length / 2;
                for (l = 0; m > l; l++)
                    e.push(l)
            }
        }
        ,
        b.WebGLGraphics.buildPoly = function(a, c) {
            var d = a.points;
            if (!(d.length < 6)) {
                var e = c.points
                  , f = c.indices
                  , g = d.length / 2
                  , h = b.hex2rgb(a.fillColor)
                  , i = a.fillAlpha
                  , j = h[0] * i
                  , k = h[1] * i
                  , l = h[2] * i
                  , m = b.PolyK.Triangulate(d)
                  , n = e.length / 6
                  , o = 0;
                for (o = 0; o < m.length; o += 3)
                    f.push(m[o] + n),
                    f.push(m[o] + n),
                    f.push(m[o + 1] + n),
                    f.push(m[o + 2] + n),
                    f.push(m[o + 2] + n);
                for (o = 0; g > o; o++)
                    e.push(d[2 * o], d[2 * o + 1], j, k, l, i)
            }
        }
        ,
        b.WebGLGraphics.graphicsDataPool = [],
        b.WebGLGraphicsData = function(a) {
            this.gl = a,
            this.color = [0, 0, 0],
            this.points = [],
            this.indices = [],
            this.lastIndex = 0,
            this.buffer = a.createBuffer(),
            this.indexBuffer = a.createBuffer(),
            this.mode = 1,
            this.alpha = 1,
            this.dirty = !0
        }
        ,
        b.WebGLGraphicsData.prototype.reset = function() {
            this.points = [],
            this.indices = [],
            this.lastIndex = 0
        }
        ,
        b.WebGLGraphicsData.prototype.upload = function() {
            var a = this.gl;
            this.glPoints = new Float32Array(this.points),
            a.bindBuffer(a.ARRAY_BUFFER, this.buffer),
            a.bufferData(a.ARRAY_BUFFER, this.glPoints, a.STATIC_DRAW),
            this.glIndicies = new Uint16Array(this.indices),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.glIndicies, a.STATIC_DRAW),
            this.dirty = !1
        }
        ,
        b.glContexts = [],
        b.WebGLRenderer = function(a, c, d, e, f, g) {
            b.defaultRenderer || (b.sayHello("webGL"),
            b.defaultRenderer = this),
            this.type = b.WEBGL_RENDERER,
            this.transparent = !!e,
            this.preserveDrawingBuffer = g,
            this.width = a || 800,
            this.height = c || 600,
            this.view = d || document.createElement("canvas"),
            this.view.width = this.width,
            this.view.height = this.height,
            this.contextLost = this.handleContextLost.bind(this),
            this.contextRestoredLost = this.handleContextRestored.bind(this),
            this.view.addEventListener("webglcontextlost", this.contextLost, !1),
            this.view.addEventListener("webglcontextrestored", this.contextRestoredLost, !1),
            this.options = {
                alpha: this.transparent,
                antialias: !!f,
                premultipliedAlpha: !!e,
                stencil: !0,
                preserveDrawingBuffer: g
            };
            var h = null;
            if (["experimental-webgl", "webgl"].forEach(function(a) {
                try {
                    h = h || this.view.getContext(a, this.options)
                } catch (b) {}
            }, this),
            !h)
                throw new Error("This browser does not support webGL. Try using the canvas renderer" + this);
            this.gl = h,
            this.glContextId = h.id = b.WebGLRenderer.glContextId++,
            b.glContexts[this.glContextId] = h,
            b.blendModesWebGL || (b.blendModesWebGL = [],
            b.blendModesWebGL[b.blendModes.NORMAL] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.ADD] = [h.SRC_ALPHA, h.DST_ALPHA],
            b.blendModesWebGL[b.blendModes.MULTIPLY] = [h.DST_COLOR, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.SCREEN] = [h.SRC_ALPHA, h.ONE],
            b.blendModesWebGL[b.blendModes.OVERLAY] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.DARKEN] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.LIGHTEN] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.COLOR_DODGE] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.COLOR_BURN] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.HARD_LIGHT] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.SOFT_LIGHT] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.DIFFERENCE] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.EXCLUSION] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.HUE] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.SATURATION] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.COLOR] = [h.ONE, h.ONE_MINUS_SRC_ALPHA],
            b.blendModesWebGL[b.blendModes.LUMINOSITY] = [h.ONE, h.ONE_MINUS_SRC_ALPHA]),
            this.projection = new b.Point,
            this.projection.x = this.width / 2,
            this.projection.y = -this.height / 2,
            this.offset = new b.Point(0,0),
            this.resize(this.width, this.height),
            this.contextLost = !1,
            this.shaderManager = new b.WebGLShaderManager(h),
            this.spriteBatch = new b.WebGLSpriteBatch(h),
            this.maskManager = new b.WebGLMaskManager(h),
            this.filterManager = new b.WebGLFilterManager(h,this.transparent),
            this.stencilManager = new b.WebGLStencilManager(h),
            this.blendModeManager = new b.WebGLBlendModeManager(h),
            this.renderSession = {},
            this.renderSession.gl = this.gl,
            this.renderSession.drawCount = 0,
            this.renderSession.shaderManager = this.shaderManager,
            this.renderSession.maskManager = this.maskManager,
            this.renderSession.filterManager = this.filterManager,
            this.renderSession.blendModeManager = this.blendModeManager,
            this.renderSession.spriteBatch = this.spriteBatch,
            this.renderSession.stencilManager = this.stencilManager,
            this.renderSession.renderer = this,
            h.useProgram(this.shaderManager.defaultShader.program),
            h.disable(h.DEPTH_TEST),
            h.disable(h.CULL_FACE),
            h.enable(h.BLEND),
            h.colorMask(!0, !0, !0, this.transparent)
        }
        ,
        b.WebGLRenderer.prototype.constructor = b.WebGLRenderer,
        b.WebGLRenderer.prototype.render = function(a) {
            if (!this.contextLost) {
                this.__stage !== a && (a.interactive && a.interactionManager.removeEvents(),
                this.__stage = a),
                b.WebGLRenderer.updateTextures(),
                a.updateTransform(),
                a._interactive && (a._interactiveEventsAdded || (a._interactiveEventsAdded = !0,
                a.interactionManager.setTarget(this)));
                var c = this.gl;
                c.viewport(0, 0, this.width, this.height),
                c.bindFramebuffer(c.FRAMEBUFFER, null),
                this.transparent ? c.clearColor(0, 0, 0, 0) : c.clearColor(a.backgroundColorSplit[0], a.backgroundColorSplit[1], a.backgroundColorSplit[2], 1),
                c.clear(c.COLOR_BUFFER_BIT),
                this.renderDisplayObject(a, this.projection),
                a.interactive ? a._interactiveEventsAdded || (a._interactiveEventsAdded = !0,
                a.interactionManager.setTarget(this)) : a._interactiveEventsAdded && (a._interactiveEventsAdded = !1,
                a.interactionManager.setTarget(this))
            }
        }
        ,
        b.WebGLRenderer.prototype.renderDisplayObject = function(a, c, d) {
            this.renderSession.blendModeManager.setBlendMode(b.blendModes.NORMAL),
            this.renderSession.drawCount = 0,
            this.renderSession.currentBlendMode = 9999,
            this.renderSession.projection = c,
            this.renderSession.offset = this.offset,
            this.spriteBatch.begin(this.renderSession),
            this.filterManager.begin(this.renderSession, d),
            a._renderWebGL(this.renderSession),
            this.spriteBatch.end()
        }
        ,
        b.WebGLRenderer.updateTextures = function() {
            var a = 0;
            for (a = 0; a < b.Texture.frameUpdates.length; a++)
                b.WebGLRenderer.updateTextureFrame(b.Texture.frameUpdates[a]);
            for (a = 0; a < b.texturesToDestroy.length; a++)
                b.WebGLRenderer.destroyTexture(b.texturesToDestroy[a]);
            b.texturesToUpdate.length = 0,
            b.texturesToDestroy.length = 0,
            b.Texture.frameUpdates.length = 0
        }
        ,
        b.WebGLRenderer.destroyTexture = function(a) {
            for (var c = a._glTextures.length - 1; c >= 0; c--) {
                var d = a._glTextures[c]
                  , e = b.glContexts[c];
                e && d && e.deleteTexture(d)
            }
            a._glTextures.length = 0
        }
        ,
        b.WebGLRenderer.updateTextureFrame = function(a) {
            a._updateWebGLuvs()
        }
        ,
        b.WebGLRenderer.prototype.resize = function(a, b) {
            this.width = a,
            this.height = b,
            this.view.width = a,
            this.view.height = b,
            this.gl.viewport(0, 0, this.width, this.height),
            this.projection.x = this.width / 2,
            this.projection.y = -this.height / 2
        }
        ,
        b.createWebGLTexture = function(a, c) {
            return a.hasLoaded && (a._glTextures[c.id] = c.createTexture(),
            c.bindTexture(c.TEXTURE_2D, a._glTextures[c.id]),
            c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultipliedAlpha),
            c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, a.source),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, a.scaleMode === b.scaleModes.LINEAR ? c.LINEAR : c.NEAREST),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, a.scaleMode === b.scaleModes.LINEAR ? c.LINEAR : c.NEAREST),
            a._powerOf2 ? (c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.REPEAT),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.REPEAT)) : (c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE)),
            c.bindTexture(c.TEXTURE_2D, null),
            a._dirty[c.id] = !1),
            a._glTextures[c.id]
        }
        ,
        b.updateWebGLTexture = function(a, c) {
            a._glTextures[c.id] && (c.bindTexture(c.TEXTURE_2D, a._glTextures[c.id]),
            c.pixelStorei(c.UNPACK_PREMULTIPLY_ALPHA_WEBGL, a.premultipliedAlpha),
            c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, c.RGBA, c.UNSIGNED_BYTE, a.source),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, a.scaleMode === b.scaleModes.LINEAR ? c.LINEAR : c.NEAREST),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, a.scaleMode === b.scaleModes.LINEAR ? c.LINEAR : c.NEAREST),
            a._powerOf2 ? (c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.REPEAT),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.REPEAT)) : (c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.CLAMP_TO_EDGE),
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.CLAMP_TO_EDGE)),
            a._dirty[c.id] = !1)
        }
        ,
        b.WebGLRenderer.prototype.handleContextLost = function(a) {
            a.preventDefault(),
            this.contextLost = !0
        }
        ,
        b.WebGLRenderer.prototype.handleContextRestored = function() {
            try {
                this.gl = this.view.getContext("experimental-webgl", this.options)
            } catch (a) {
                try {
                    this.gl = this.view.getContext("webgl", this.options)
                } catch (c) {
                    throw new Error(" This browser does not support webGL. Try using the canvas renderer" + this)
                }
            }
            var d = this.gl;
            d.id = b.WebGLRenderer.glContextId++,
            this.shaderManager.setContext(d),
            this.spriteBatch.setContext(d),
            this.primitiveBatch.setContext(d),
            this.maskManager.setContext(d),
            this.filterManager.setContext(d),
            this.renderSession.gl = this.gl,
            d.disable(d.DEPTH_TEST),
            d.disable(d.CULL_FACE),
            d.enable(d.BLEND),
            d.colorMask(!0, !0, !0, this.transparent),
            this.gl.viewport(0, 0, this.width, this.height);
            for (var e in b.TextureCache) {
                var f = b.TextureCache[e].baseTexture;
                f._glTextures = []
            }
            this.contextLost = !1
        }
        ,
        b.WebGLRenderer.prototype.destroy = function() {
            this.view.removeEventListener("webglcontextlost", this.contextLost),
            this.view.removeEventListener("webglcontextrestored", this.contextRestoredLost),
            b.glContexts[this.glContextId] = null,
            this.projection = null,
            this.offset = null,
            this.shaderManager.destroy(),
            this.spriteBatch.destroy(),
            this.primitiveBatch.destroy(),
            this.maskManager.destroy(),
            this.filterManager.destroy(),
            this.shaderManager = null,
            this.spriteBatch = null,
            this.maskManager = null,
            this.filterManager = null,
            this.gl = null,
            this.renderSession = null
        }
        ,
        b.WebGLRenderer.glContextId = 0,
        b.WebGLBlendModeManager = function(a) {
            this.gl = a,
            this.currentBlendMode = 99999
        }
        ,
        b.WebGLBlendModeManager.prototype.setBlendMode = function(a) {
            if (this.currentBlendMode === a)
                return !1;
            this.currentBlendMode = a;
            var c = b.blendModesWebGL[this.currentBlendMode];
            return this.gl.blendFunc(c[0], c[1]),
            !0
        }
        ,
        b.WebGLBlendModeManager.prototype.destroy = function() {
            this.gl = null
        }
        ,
        b.WebGLMaskManager = function(a) {
            this.maskStack = [],
            this.maskPosition = 0,
            this.setContext(a),
            this.reverse = !1,
            this.count = 0
        }
        ,
        b.WebGLMaskManager.prototype.setContext = function(a) {
            this.gl = a
        }
        ,
        b.WebGLMaskManager.prototype.pushMask = function(a, c) {
            var d = c.gl;
            a.dirty && b.WebGLGraphics.updateGraphics(a, d),
            a._webGL[d.id].data.length && c.stencilManager.pushStencil(a, a._webGL[d.id].data[0], c)
        }
        ,
        b.WebGLMaskManager.prototype.popMask = function(a, b) {
            var c = this.gl;
            b.stencilManager.popStencil(a, a._webGL[c.id].data[0], b)
        }
        ,
        b.WebGLMaskManager.prototype.destroy = function() {
            this.maskStack = null,
            this.gl = null
        }
        ,
        b.WebGLStencilManager = function(a) {
            this.stencilStack = [],
            this.setContext(a),
            this.reverse = !0,
            this.count = 0
        }
        ,
        b.WebGLStencilManager.prototype.setContext = function(a) {
            this.gl = a
        }
        ,
        b.WebGLStencilManager.prototype.pushStencil = function(a, b, c) {
            var d = this.gl;
            this.bindGraphics(a, b, c),
            0 === this.stencilStack.length && (d.enable(d.STENCIL_TEST),
            d.clear(d.STENCIL_BUFFER_BIT),
            this.reverse = !0,
            this.count = 0),
            this.stencilStack.push(b);
            var e = this.count;
            d.colorMask(!1, !1, !1, !1),
            d.stencilFunc(d.ALWAYS, 0, 255),
            d.stencilOp(d.KEEP, d.KEEP, d.INVERT),
            1 === b.mode ? (d.drawElements(d.TRIANGLE_FAN, b.indices.length - 4, d.UNSIGNED_SHORT, 0),
            this.reverse ? (d.stencilFunc(d.EQUAL, 255 - e, 255),
            d.stencilOp(d.KEEP, d.KEEP, d.DECR)) : (d.stencilFunc(d.EQUAL, e, 255),
            d.stencilOp(d.KEEP, d.KEEP, d.INCR)),
            d.drawElements(d.TRIANGLE_FAN, 4, d.UNSIGNED_SHORT, 2 * (b.indices.length - 4)),
            this.reverse ? d.stencilFunc(d.EQUAL, 255 - (e + 1), 255) : d.stencilFunc(d.EQUAL, e + 1, 255),
            this.reverse = !this.reverse) : (this.reverse ? (d.stencilFunc(d.EQUAL, e, 255),
            d.stencilOp(d.KEEP, d.KEEP, d.INCR)) : (d.stencilFunc(d.EQUAL, 255 - e, 255),
            d.stencilOp(d.KEEP, d.KEEP, d.DECR)),
            d.drawElements(d.TRIANGLE_STRIP, b.indices.length, d.UNSIGNED_SHORT, 0),
            this.reverse ? d.stencilFunc(d.EQUAL, e + 1, 255) : d.stencilFunc(d.EQUAL, 255 - (e + 1), 255)),
            d.colorMask(!0, !0, !0, !0),
            d.stencilOp(d.KEEP, d.KEEP, d.KEEP),
            this.count++
        }
        ,
        b.WebGLStencilManager.prototype.bindGraphics = function(a, c, d) {
            this._currentGraphics = a;
            var e, f = this.gl, g = d.projection, h = d.offset;
            1 === c.mode ? (e = d.shaderManager.complexPrimativeShader,
            d.shaderManager.setShader(e),
            f.uniformMatrix3fv(e.translationMatrix, !1, a.worldTransform.toArray(!0)),
            f.uniform2f(e.projectionVector, g.x, -g.y),
            f.uniform2f(e.offsetVector, -h.x, -h.y),
            f.uniform3fv(e.tintColor, b.hex2rgb(a.tint)),
            f.uniform3fv(e.color, c.color),
            f.uniform1f(e.alpha, a.worldAlpha * c.alpha),
            f.bindBuffer(f.ARRAY_BUFFER, c.buffer),
            f.vertexAttribPointer(e.aVertexPosition, 2, f.FLOAT, !1, 8, 0),
            f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, c.indexBuffer)) : (e = d.shaderManager.primitiveShader,
            d.shaderManager.setShader(e),
            f.uniformMatrix3fv(e.translationMatrix, !1, a.worldTransform.toArray(!0)),
            f.uniform2f(e.projectionVector, g.x, -g.y),
            f.uniform2f(e.offsetVector, -h.x, -h.y),
            f.uniform3fv(e.tintColor, b.hex2rgb(a.tint)),
            f.uniform1f(e.alpha, a.worldAlpha),
            f.bindBuffer(f.ARRAY_BUFFER, c.buffer),
            f.vertexAttribPointer(e.aVertexPosition, 2, f.FLOAT, !1, 24, 0),
            f.vertexAttribPointer(e.colorAttribute, 4, f.FLOAT, !1, 24, 8),
            f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, c.indexBuffer))
        }
        ,
        b.WebGLStencilManager.prototype.popStencil = function(a, b, c) {
            var d = this.gl;
            if (this.stencilStack.pop(),
            this.count--,
            0 === this.stencilStack.length)
                d.disable(d.STENCIL_TEST);
            else {
                var e = this.count;
                this.bindGraphics(a, b, c),
                d.colorMask(!1, !1, !1, !1),
                1 === b.mode ? (this.reverse = !this.reverse,
                this.reverse ? (d.stencilFunc(d.EQUAL, 255 - (e + 1), 255),
                d.stencilOp(d.KEEP, d.KEEP, d.INCR)) : (d.stencilFunc(d.EQUAL, e + 1, 255),
                d.stencilOp(d.KEEP, d.KEEP, d.DECR)),
                d.drawElements(d.TRIANGLE_FAN, 4, d.UNSIGNED_SHORT, 2 * (b.indices.length - 4)),
                d.stencilFunc(d.ALWAYS, 0, 255),
                d.stencilOp(d.KEEP, d.KEEP, d.INVERT),
                d.drawElements(d.TRIANGLE_FAN, b.indices.length - 4, d.UNSIGNED_SHORT, 0),
                this.reverse ? d.stencilFunc(d.EQUAL, e, 255) : d.stencilFunc(d.EQUAL, 255 - e, 255)) : (this.reverse ? (d.stencilFunc(d.EQUAL, e + 1, 255),
                d.stencilOp(d.KEEP, d.KEEP, d.DECR)) : (d.stencilFunc(d.EQUAL, 255 - (e + 1), 255),
                d.stencilOp(d.KEEP, d.KEEP, d.INCR)),
                d.drawElements(d.TRIANGLE_STRIP, b.indices.length, d.UNSIGNED_SHORT, 0),
                this.reverse ? d.stencilFunc(d.EQUAL, e, 255) : d.stencilFunc(d.EQUAL, 255 - e, 255)),
                d.colorMask(!0, !0, !0, !0),
                d.stencilOp(d.KEEP, d.KEEP, d.KEEP)
            }
        }
        ,
        b.WebGLStencilManager.prototype.destroy = function() {
            this.maskStack = null,
            this.gl = null
        }
        ,
        b.WebGLShaderManager = function(a) {
            this.maxAttibs = 10,
            this.attribState = [],
            this.tempAttribState = [],
            this.shaderMap = [];
            for (var b = 0; b < this.maxAttibs; b++)
                this.attribState[b] = !1;
            this.setContext(a)
        }
        ,
        b.WebGLShaderManager.prototype.setContext = function(a) {
            this.gl = a,
            this.primitiveShader = new b.PrimitiveShader(a),
            this.complexPrimativeShader = new b.ComplexPrimitiveShader(a),
            this.defaultShader = new b.PixiShader(a),
            this.fastShader = new b.PixiFastShader(a),
            this.stripShader = new b.StripShader(a),
            this.setShader(this.defaultShader)
        }
        ,
        b.WebGLShaderManager.prototype.setAttribs = function(a) {
            var b;
            for (b = 0; b < this.tempAttribState.length; b++)
                this.tempAttribState[b] = !1;
            for (b = 0; b < a.length; b++) {
                var c = a[b];
                this.tempAttribState[c] = !0
            }
            var d = this.gl;
            for (b = 0; b < this.attribState.length; b++)
                this.attribState[b] !== this.tempAttribState[b] && (this.attribState[b] = this.tempAttribState[b],
                this.tempAttribState[b] ? d.enableVertexAttribArray(b) : d.disableVertexAttribArray(b))
        }
        ,
        b.WebGLShaderManager.prototype.setShader = function(a) {
            return this._currentId === a._UID ? !1 : (this._currentId = a._UID,
            this.currentShader = a,
            this.gl.useProgram(a.program),
            this.setAttribs(a.attributes),
            !0)
        }
        ,
        b.WebGLShaderManager.prototype.destroy = function() {
            this.attribState = null,
            this.tempAttribState = null,
            this.primitiveShader.destroy(),
            this.defaultShader.destroy(),
            this.fastShader.destroy(),
            this.stripShader.destroy(),
            this.gl = null
        }
        ,
        b.WebGLSpriteBatch = function(a) {
            this.vertSize = 6,
            this.size = 2e3;
            var b = 4 * this.size * this.vertSize
              , c = 6 * this.size;
            this.vertices = new Float32Array(b),
            this.indices = new Uint16Array(c),
            this.lastIndexCount = 0;
            for (var d = 0, e = 0; c > d; d += 6,
            e += 4)
                this.indices[d + 0] = e + 0,
                this.indices[d + 1] = e + 1,
                this.indices[d + 2] = e + 2,
                this.indices[d + 3] = e + 0,
                this.indices[d + 4] = e + 2,
                this.indices[d + 5] = e + 3;
            this.drawing = !1,
            this.currentBatchSize = 0,
            this.currentBaseTexture = null,
            this.setContext(a),
            this.dirty = !0,
            this.textures = [],
            this.blendModes = []
        }
        ,
        b.WebGLSpriteBatch.prototype.setContext = function(a) {
            this.gl = a,
            this.vertexBuffer = a.createBuffer(),
            this.indexBuffer = a.createBuffer(),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW),
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW),
            this.currentBlendMode = 99999
        }
        ,
        b.WebGLSpriteBatch.prototype.begin = function(a) {
            this.renderSession = a,
            this.shader = this.renderSession.shaderManager.defaultShader,
            this.start()
        }
        ,
        b.WebGLSpriteBatch.prototype.end = function() {
            this.flush()
        }
        ,
        b.WebGLSpriteBatch.prototype.render = function(a) {
            var b = a.texture;
            this.currentBatchSize >= this.size && (this.flush(),
            this.currentBaseTexture = b.baseTexture);
            var c = b._uvs;
            if (c) {
                var d, e, f, g, h = a.worldAlpha, i = a.tint, j = this.vertices, k = a.anchor.x, l = a.anchor.y;
                if (b.trim) {
                    var m = b.trim;
                    e = m.x - k * m.width,
                    d = e + b.crop.width,
                    g = m.y - l * m.height,
                    f = g + b.crop.height
                } else
                    d = b.frame.width * (1 - k),
                    e = b.frame.width * -k,
                    f = b.frame.height * (1 - l),
                    g = b.frame.height * -l;
                var n = 4 * this.currentBatchSize * this.vertSize
                  , o = a.worldTransform
                  , p = o.a
                  , q = o.c
                  , r = o.b
                  , s = o.d
                  , t = o.tx
                  , u = o.ty;
                j[n++] = p * e + r * g + t,
                j[n++] = s * g + q * e + u,
                j[n++] = c.x0,
                j[n++] = c.y0,
                j[n++] = h,
                j[n++] = i,
                j[n++] = p * d + r * g + t,
                j[n++] = s * g + q * d + u,
                j[n++] = c.x1,
                j[n++] = c.y1,
                j[n++] = h,
                j[n++] = i,
                j[n++] = p * d + r * f + t,
                j[n++] = s * f + q * d + u,
                j[n++] = c.x2,
                j[n++] = c.y2,
                j[n++] = h,
                j[n++] = i,
                j[n++] = p * e + r * f + t,
                j[n++] = s * f + q * e + u,
                j[n++] = c.x3,
                j[n++] = c.y3,
                j[n++] = h,
                j[n++] = i,
                this.textures[this.currentBatchSize] = a.texture.baseTexture,
                this.blendModes[this.currentBatchSize] = a.blendMode,
                this.currentBatchSize++
            }
        }
        ,
        b.WebGLSpriteBatch.prototype.renderTilingSprite = function(a) {
            var c = a.tilingTexture;
            this.currentBatchSize >= this.size && (this.flush(),
            this.currentBaseTexture = c.baseTexture),
            a._uvs || (a._uvs = new b.TextureUvs);
            var d = a._uvs;
            a.tilePosition.x %= c.baseTexture.width * a.tileScaleOffset.x,
            a.tilePosition.y %= c.baseTexture.height * a.tileScaleOffset.y;
            var e = a.tilePosition.x / (c.baseTexture.width * a.tileScaleOffset.x)
              , f = a.tilePosition.y / (c.baseTexture.height * a.tileScaleOffset.y)
              , g = a.width / c.baseTexture.width / (a.tileScale.x * a.tileScaleOffset.x)
              , h = a.height / c.baseTexture.height / (a.tileScale.y * a.tileScaleOffset.y);
            d.x0 = 0 - e,
            d.y0 = 0 - f,
            d.x1 = 1 * g - e,
            d.y1 = 0 - f,
            d.x2 = 1 * g - e,
            d.y2 = 1 * h - f,
            d.x3 = 0 - e,
            d.y3 = 1 * h - f;
            var i = a.worldAlpha
              , j = a.tint
              , k = this.vertices
              , l = a.width
              , m = a.height
              , n = a.anchor.x
              , o = a.anchor.y
              , p = l * (1 - n)
              , q = l * -n
              , r = m * (1 - o)
              , s = m * -o
              , t = 4 * this.currentBatchSize * this.vertSize
              , u = a.worldTransform
              , v = u.a
              , w = u.c
              , x = u.b
              , y = u.d
              , z = u.tx
              , A = u.ty;
            k[t++] = v * q + x * s + z,
            k[t++] = y * s + w * q + A,
            k[t++] = d.x0,
            k[t++] = d.y0,
            k[t++] = i,
            k[t++] = j,
            k[t++] = v * p + x * s + z,
            k[t++] = y * s + w * p + A,
            k[t++] = d.x1,
            k[t++] = d.y1,
            k[t++] = i,
            k[t++] = j,
            k[t++] = v * p + x * r + z,
            k[t++] = y * r + w * p + A,
            k[t++] = d.x2,
            k[t++] = d.y2,
            k[t++] = i,
            k[t++] = j,
            k[t++] = v * q + x * r + z,
            k[t++] = y * r + w * q + A,
            k[t++] = d.x3,
            k[t++] = d.y3,
            k[t++] = i,
            k[t++] = j,
            this.textures[this.currentBatchSize] = c.baseTexture,
            this.blendModes[this.currentBatchSize] = a.blendMode,
            this.currentBatchSize++
        }
        ,
        b.WebGLSpriteBatch.prototype.flush = function() {
            if (0 !== this.currentBatchSize) {
                var a = this.gl;
                if (this.renderSession.shaderManager.setShader(this.renderSession.shaderManager.defaultShader),
                this.dirty) {
                    this.dirty = !1,
                    a.activeTexture(a.TEXTURE0),
                    a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
                    a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                    var b = this.renderSession.projection;
                    a.uniform2f(this.shader.projectionVector, b.x, b.y);
                    var c = 4 * this.vertSize;
                    a.vertexAttribPointer(this.shader.aVertexPosition, 2, a.FLOAT, !1, c, 0),
                    a.vertexAttribPointer(this.shader.aTextureCoord, 2, a.FLOAT, !1, c, 8),
                    a.vertexAttribPointer(this.shader.colorAttribute, 2, a.FLOAT, !1, c, 16)
                }
                if (this.currentBatchSize > .5 * this.size)
                    a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertices);
                else {
                    var d = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                    a.bufferSubData(a.ARRAY_BUFFER, 0, d)
                }
                for (var e, f, g = 0, h = 0, i = null, j = this.renderSession.blendModeManager.currentBlendMode, k = 0, l = this.currentBatchSize; l > k; k++)
                    e = this.textures[k],
                    f = this.blendModes[k],
                    (i !== e || j !== f) && (this.renderBatch(i, g, h),
                    h = k,
                    g = 0,
                    i = e,
                    j = f,
                    this.renderSession.blendModeManager.setBlendMode(j)),
                    g++;
                this.renderBatch(i, g, h),
                this.currentBatchSize = 0
            }
        }
        ,
        b.WebGLSpriteBatch.prototype.renderBatch = function(a, c, d) {
            if (0 !== c) {
                var e = this.gl;
                e.bindTexture(e.TEXTURE_2D, a._glTextures[e.id] || b.createWebGLTexture(a, e)),
                a._dirty[e.id] && b.updateWebGLTexture(this.currentBaseTexture, e),
                e.drawElements(e.TRIANGLES, 6 * c, e.UNSIGNED_SHORT, 6 * d * 2),
                this.renderSession.drawCount++
            }
        }
        ,
        b.WebGLSpriteBatch.prototype.stop = function() {
            this.flush()
        }
        ,
        b.WebGLSpriteBatch.prototype.start = function() {
            this.dirty = !0
        }
        ,
        b.WebGLSpriteBatch.prototype.destroy = function() {
            this.vertices = null,
            this.indices = null,
            this.gl.deleteBuffer(this.vertexBuffer),
            this.gl.deleteBuffer(this.indexBuffer),
            this.currentBaseTexture = null,
            this.gl = null
        }
        ,
        b.WebGLFastSpriteBatch = function(a) {
            this.vertSize = 10,
            this.maxSize = 6e3,
            this.size = this.maxSize;
            var b = 4 * this.size * this.vertSize
              , c = 6 * this.maxSize;
            this.vertices = new Float32Array(b),
            this.indices = new Uint16Array(c),
            this.vertexBuffer = null,
            this.indexBuffer = null,
            this.lastIndexCount = 0;
            for (var d = 0, e = 0; c > d; d += 6,
            e += 4)
                this.indices[d + 0] = e + 0,
                this.indices[d + 1] = e + 1,
                this.indices[d + 2] = e + 2,
                this.indices[d + 3] = e + 0,
                this.indices[d + 4] = e + 2,
                this.indices[d + 5] = e + 3;
            this.drawing = !1,
            this.currentBatchSize = 0,
            this.currentBaseTexture = null,
            this.currentBlendMode = 0,
            this.renderSession = null,
            this.shader = null,
            this.matrix = null,
            this.setContext(a)
        }
        ,
        b.WebGLFastSpriteBatch.prototype.setContext = function(a) {
            this.gl = a,
            this.vertexBuffer = a.createBuffer(),
            this.indexBuffer = a.createBuffer(),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW),
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW)
        }
        ,
        b.WebGLFastSpriteBatch.prototype.begin = function(a, b) {
            this.renderSession = b,
            this.shader = this.renderSession.shaderManager.fastShader,
            this.matrix = a.worldTransform.toArray(!0),
            this.start()
        }
        ,
        b.WebGLFastSpriteBatch.prototype.end = function() {
            this.flush()
        }
        ,
        b.WebGLFastSpriteBatch.prototype.render = function(a) {
            var b = a.children
              , c = b[0];
            if (c.texture._uvs) {
                this.currentBaseTexture = c.texture.baseTexture,
                c.blendMode !== this.renderSession.blendModeManager.currentBlendMode && (this.flush(),
                this.renderSession.blendModeManager.setBlendMode(c.blendMode));
                for (var d = 0, e = b.length; e > d; d++)
                    this.renderSprite(b[d]);
                this.flush()
            }
        }
        ,
        b.WebGLFastSpriteBatch.prototype.renderSprite = function(a) {
            if (a.visible && (a.texture.baseTexture === this.currentBaseTexture || (this.flush(),
            this.currentBaseTexture = a.texture.baseTexture,
            a.texture._uvs))) {
                var b, c, d, e, f, g, h, i, j = this.vertices;
                if (b = a.texture._uvs,
                c = a.texture.frame.width,
                d = a.texture.frame.height,
                a.texture.trim) {
                    var k = a.texture.trim;
                    f = k.x - a.anchor.x * k.width,
                    e = f + a.texture.crop.width,
                    h = k.y - a.anchor.y * k.height,
                    g = h + a.texture.crop.height
                } else
                    e = a.texture.frame.width * (1 - a.anchor.x),
                    f = a.texture.frame.width * -a.anchor.x,
                    g = a.texture.frame.height * (1 - a.anchor.y),
                    h = a.texture.frame.height * -a.anchor.y;
                i = 4 * this.currentBatchSize * this.vertSize,
                j[i++] = f,
                j[i++] = h,
                j[i++] = a.position.x,
                j[i++] = a.position.y,
                j[i++] = a.scale.x,
                j[i++] = a.scale.y,
                j[i++] = a.rotation,
                j[i++] = b.x0,
                j[i++] = b.y1,
                j[i++] = a.alpha,
                j[i++] = e,
                j[i++] = h,
                j[i++] = a.position.x,
                j[i++] = a.position.y,
                j[i++] = a.scale.x,
                j[i++] = a.scale.y,
                j[i++] = a.rotation,
                j[i++] = b.x1,
                j[i++] = b.y1,
                j[i++] = a.alpha,
                j[i++] = e,
                j[i++] = g,
                j[i++] = a.position.x,
                j[i++] = a.position.y,
                j[i++] = a.scale.x,
                j[i++] = a.scale.y,
                j[i++] = a.rotation,
                j[i++] = b.x2,
                j[i++] = b.y2,
                j[i++] = a.alpha,
                j[i++] = f,
                j[i++] = g,
                j[i++] = a.position.x,
                j[i++] = a.position.y,
                j[i++] = a.scale.x,
                j[i++] = a.scale.y,
                j[i++] = a.rotation,
                j[i++] = b.x3,
                j[i++] = b.y3,
                j[i++] = a.alpha,
                this.currentBatchSize++,
                this.currentBatchSize >= this.size && this.flush()
            }
        }
        ,
        b.WebGLFastSpriteBatch.prototype.flush = function() {
            if (0 !== this.currentBatchSize) {
                var a = this.gl;
                if (this.currentBaseTexture._glTextures[a.id] || b.createWebGLTexture(this.currentBaseTexture, a),
                a.bindTexture(a.TEXTURE_2D, this.currentBaseTexture._glTextures[a.id]),
                this.currentBatchSize > .5 * this.size)
                    a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertices);
                else {
                    var c = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
                    a.bufferSubData(a.ARRAY_BUFFER, 0, c)
                }
                a.drawElements(a.TRIANGLES, 6 * this.currentBatchSize, a.UNSIGNED_SHORT, 0),
                this.currentBatchSize = 0,
                this.renderSession.drawCount++
            }
        }
        ,
        b.WebGLFastSpriteBatch.prototype.stop = function() {
            this.flush()
        }
        ,
        b.WebGLFastSpriteBatch.prototype.start = function() {
            var a = this.gl;
            a.activeTexture(a.TEXTURE0),
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            var b = this.renderSession.projection;
            a.uniform2f(this.shader.projectionVector, b.x, b.y),
            a.uniformMatrix3fv(this.shader.uMatrix, !1, this.matrix);
            var c = 4 * this.vertSize;
            a.vertexAttribPointer(this.shader.aVertexPosition, 2, a.FLOAT, !1, c, 0),
            a.vertexAttribPointer(this.shader.aPositionCoord, 2, a.FLOAT, !1, c, 8),
            a.vertexAttribPointer(this.shader.aScale, 2, a.FLOAT, !1, c, 16),
            a.vertexAttribPointer(this.shader.aRotation, 1, a.FLOAT, !1, c, 24),
            a.vertexAttribPointer(this.shader.aTextureCoord, 2, a.FLOAT, !1, c, 28),
            a.vertexAttribPointer(this.shader.colorAttribute, 1, a.FLOAT, !1, c, 36)
        }
        ,
        b.WebGLFilterManager = function(a, b) {
            this.transparent = b,
            this.filterStack = [],
            this.offsetX = 0,
            this.offsetY = 0,
            this.setContext(a)
        }
        ,
        b.WebGLFilterManager.prototype.setContext = function(a) {
            this.gl = a,
            this.texturePool = [],
            this.initShaderBuffers()
        }
        ,
        b.WebGLFilterManager.prototype.begin = function(a, b) {
            this.renderSession = a,
            this.defaultShader = a.shaderManager.defaultShader;
            var c = this.renderSession.projection;
            this.width = 2 * c.x,
            this.height = 2 * -c.y,
            this.buffer = b
        }
        ,
        b.WebGLFilterManager.prototype.pushFilter = function(a) {
            var c = this.gl
              , d = this.renderSession.projection
              , e = this.renderSession.offset;
            a._filterArea = a.target.filterArea || a.target.getBounds(),
            this.filterStack.push(a);
            var f = a.filterPasses[0];
            this.offsetX += a._filterArea.x,
            this.offsetY += a._filterArea.y;
            var g = this.texturePool.pop();
            g ? g.resize(this.width, this.height) : g = new b.FilterTexture(this.gl,this.width,this.height),
            c.bindTexture(c.TEXTURE_2D, g.texture);
            var h = a._filterArea
              , i = f.padding;
            h.x -= i,
            h.y -= i,
            h.width += 2 * i,
            h.height += 2 * i,
            h.x < 0 && (h.x = 0),
            h.width > this.width && (h.width = this.width),
            h.y < 0 && (h.y = 0),
            h.height > this.height && (h.height = this.height),
            c.bindFramebuffer(c.FRAMEBUFFER, g.frameBuffer),
            c.viewport(0, 0, h.width, h.height),
            d.x = h.width / 2,
            d.y = -h.height / 2,
            e.x = -h.x,
            e.y = -h.y,
            this.renderSession.shaderManager.setShader(this.defaultShader),
            c.uniform2f(this.defaultShader.projectionVector, h.width / 2, -h.height / 2),
            c.uniform2f(this.defaultShader.offsetVector, -h.x, -h.y),
            c.colorMask(!0, !0, !0, !0),
            c.clearColor(0, 0, 0, 0),
            c.clear(c.COLOR_BUFFER_BIT),
            a._glFilterTexture = g
        }
        ,
        b.WebGLFilterManager.prototype.popFilter = function() {
            var a = this.gl
              , c = this.filterStack.pop()
              , d = c._filterArea
              , e = c._glFilterTexture
              , f = this.renderSession.projection
              , g = this.renderSession.offset;
            if (c.filterPasses.length > 1) {
                a.viewport(0, 0, d.width, d.height),
                a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
                this.vertexArray[0] = 0,
                this.vertexArray[1] = d.height,
                this.vertexArray[2] = d.width,
                this.vertexArray[3] = d.height,
                this.vertexArray[4] = 0,
                this.vertexArray[5] = 0,
                this.vertexArray[6] = d.width,
                this.vertexArray[7] = 0,
                a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertexArray),
                a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
                this.uvArray[2] = d.width / this.width,
                this.uvArray[5] = d.height / this.height,
                this.uvArray[6] = d.width / this.width,
                this.uvArray[7] = d.height / this.height,
                a.bufferSubData(a.ARRAY_BUFFER, 0, this.uvArray);
                var h = e
                  , i = this.texturePool.pop();
                i || (i = new b.FilterTexture(this.gl,this.width,this.height)),
                i.resize(this.width, this.height),
                a.bindFramebuffer(a.FRAMEBUFFER, i.frameBuffer),
                a.clear(a.COLOR_BUFFER_BIT),
                a.disable(a.BLEND);
                for (var j = 0; j < c.filterPasses.length - 1; j++) {
                    var k = c.filterPasses[j];
                    a.bindFramebuffer(a.FRAMEBUFFER, i.frameBuffer),
                    a.activeTexture(a.TEXTURE0),
                    a.bindTexture(a.TEXTURE_2D, h.texture),
                    this.applyFilterPass(k, d, d.width, d.height);
                    var l = h;
                    h = i,
                    i = l
                }
                a.enable(a.BLEND),
                e = h,
                this.texturePool.push(i)
            }
            var m = c.filterPasses[c.filterPasses.length - 1];
            this.offsetX -= d.x,
            this.offsetY -= d.y;
            var n = this.width
              , o = this.height
              , p = 0
              , q = 0
              , r = this.buffer;
            if (0 === this.filterStack.length)
                a.colorMask(!0, !0, !0, !0);
            else {
                var s = this.filterStack[this.filterStack.length - 1];
                d = s._filterArea,
                n = d.width,
                o = d.height,
                p = d.x,
                q = d.y,
                r = s._glFilterTexture.frameBuffer
            }
            f.x = n / 2,
            f.y = -o / 2,
            g.x = p,
            g.y = q,
            d = c._filterArea;
            var t = d.x - p
              , u = d.y - q;
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            this.vertexArray[0] = t,
            this.vertexArray[1] = u + d.height,
            this.vertexArray[2] = t + d.width,
            this.vertexArray[3] = u + d.height,
            this.vertexArray[4] = t,
            this.vertexArray[5] = u,
            this.vertexArray[6] = t + d.width,
            this.vertexArray[7] = u,
            a.bufferSubData(a.ARRAY_BUFFER, 0, this.vertexArray),
            a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
            this.uvArray[2] = d.width / this.width,
            this.uvArray[5] = d.height / this.height,
            this.uvArray[6] = d.width / this.width,
            this.uvArray[7] = d.height / this.height,
            a.bufferSubData(a.ARRAY_BUFFER, 0, this.uvArray),
            a.viewport(0, 0, n, o),
            a.bindFramebuffer(a.FRAMEBUFFER, r),
            a.activeTexture(a.TEXTURE0),
            a.bindTexture(a.TEXTURE_2D, e.texture),
            this.applyFilterPass(m, d, n, o),
            this.renderSession.shaderManager.setShader(this.defaultShader),
            a.uniform2f(this.defaultShader.projectionVector, n / 2, -o / 2),
            a.uniform2f(this.defaultShader.offsetVector, -p, -q),
            this.texturePool.push(e),
            c._glFilterTexture = null
        }
        ,
        b.WebGLFilterManager.prototype.applyFilterPass = function(a, c, d, e) {
            var f = this.gl
              , g = a.shaders[f.id];
            g || (g = new b.PixiShader(f),
            g.fragmentSrc = a.fragmentSrc,
            g.uniforms = a.uniforms,
            g.init(),
            a.shaders[f.id] = g),
            this.renderSession.shaderManager.setShader(g),
            f.uniform2f(g.projectionVector, d / 2, -e / 2),
            f.uniform2f(g.offsetVector, 0, 0),
            a.uniforms.dimensions && (a.uniforms.dimensions.value[0] = this.width,
            a.uniforms.dimensions.value[1] = this.height,
            a.uniforms.dimensions.value[2] = this.vertexArray[0],
            a.uniforms.dimensions.value[3] = this.vertexArray[5]),
            g.syncUniforms(),
            f.bindBuffer(f.ARRAY_BUFFER, this.vertexBuffer),
            f.vertexAttribPointer(g.aVertexPosition, 2, f.FLOAT, !1, 0, 0),
            f.bindBuffer(f.ARRAY_BUFFER, this.uvBuffer),
            f.vertexAttribPointer(g.aTextureCoord, 2, f.FLOAT, !1, 0, 0),
            f.bindBuffer(f.ARRAY_BUFFER, this.colorBuffer),
            f.vertexAttribPointer(g.colorAttribute, 2, f.FLOAT, !1, 0, 0),
            f.bindBuffer(f.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            f.drawElements(f.TRIANGLES, 6, f.UNSIGNED_SHORT, 0),
            this.renderSession.drawCount++
        }
        ,
        b.WebGLFilterManager.prototype.initShaderBuffers = function() {
            var a = this.gl;
            this.vertexBuffer = a.createBuffer(),
            this.uvBuffer = a.createBuffer(),
            this.colorBuffer = a.createBuffer(),
            this.indexBuffer = a.createBuffer(),
            this.vertexArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
            a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.vertexArray, a.STATIC_DRAW),
            this.uvArray = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1]),
            a.bindBuffer(a.ARRAY_BUFFER, this.uvBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.uvArray, a.STATIC_DRAW),
            this.colorArray = new Float32Array([1, 16777215, 1, 16777215, 1, 16777215, 1, 16777215]),
            a.bindBuffer(a.ARRAY_BUFFER, this.colorBuffer),
            a.bufferData(a.ARRAY_BUFFER, this.colorArray, a.STATIC_DRAW),
            a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer),
            a.bufferData(a.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 1, 3, 2]), a.STATIC_DRAW)
        }
        ,
        b.WebGLFilterManager.prototype.destroy = function() {
            var a = this.gl;
            this.filterStack = null,
            this.offsetX = 0,
            this.offsetY = 0;
            for (var b = 0; b < this.texturePool.length; b++)
                this.texturePool[b].destroy();
            this.texturePool = null,
            a.deleteBuffer(this.vertexBuffer),
            a.deleteBuffer(this.uvBuffer),
            a.deleteBuffer(this.colorBuffer),
            a.deleteBuffer(this.indexBuffer)
        }
        ,
        b.FilterTexture = function(a, c, d, e) {
            this.gl = a,
            this.frameBuffer = a.createFramebuffer(),
            this.texture = a.createTexture(),
            e = e || b.scaleModes.DEFAULT,
            a.bindTexture(a.TEXTURE_2D, this.texture),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, e === b.scaleModes.LINEAR ? a.LINEAR : a.NEAREST),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, e === b.scaleModes.LINEAR ? a.LINEAR : a.NEAREST),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE),
            a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE),
            a.bindFramebuffer(a.FRAMEBUFFER, this.framebuffer),
            a.bindFramebuffer(a.FRAMEBUFFER, this.frameBuffer),
            a.framebufferTexture2D(a.FRAMEBUFFER, a.COLOR_ATTACHMENT0, a.TEXTURE_2D, this.texture, 0),
            this.renderBuffer = a.createRenderbuffer(),
            a.bindRenderbuffer(a.RENDERBUFFER, this.renderBuffer),
            a.framebufferRenderbuffer(a.FRAMEBUFFER, a.DEPTH_STENCIL_ATTACHMENT, a.RENDERBUFFER, this.renderBuffer),
            this.resize(c, d)
        }
        ,
        b.FilterTexture.prototype.clear = function() {
            var a = this.gl;
            a.clearColor(0, 0, 0, 0),
            a.clear(a.COLOR_BUFFER_BIT)
        }
        ,
        b.FilterTexture.prototype.resize = function(a, b) {
            if (this.width !== a || this.height !== b) {
                this.width = a,
                this.height = b;
                var c = this.gl;
                c.bindTexture(c.TEXTURE_2D, this.texture),
                c.texImage2D(c.TEXTURE_2D, 0, c.RGBA, a, b, 0, c.RGBA, c.UNSIGNED_BYTE, null),
                c.bindRenderbuffer(c.RENDERBUFFER, this.renderBuffer),
                c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_STENCIL, a, b)
            }
        }
        ,
        b.FilterTexture.prototype.destroy = function() {
            var a = this.gl;
            a.deleteFramebuffer(this.frameBuffer),
            a.deleteTexture(this.texture),
            this.frameBuffer = null,
            this.texture = null
        }
        ,
        b.CanvasMaskManager = function() {}
        ,
        b.CanvasMaskManager.prototype.pushMask = function(a, c) {
            c.save();
            var d = a.alpha
              , e = a.worldTransform;
            c.setTransform(e.a, e.c, e.b, e.d, e.tx, e.ty),
            b.CanvasGraphics.renderGraphicsMask(a, c),
            c.clip(),
            a.worldAlpha = d
        }
        ,
        b.CanvasMaskManager.prototype.popMask = function(a) {
            a.restore()
        }
        ,
        b.CanvasTinter = function() {}
        ,
        b.CanvasTinter.getTintedTexture = function(a, c) {
            var d = a.texture;
            c = b.CanvasTinter.roundColor(c);
            var e = "#" + ("00000" + (0 | c).toString(16)).substr(-6);
            if (d.tintCache = d.tintCache || {},
            d.tintCache[e])
                return d.tintCache[e];
            var f = b.CanvasTinter.canvas || document.createElement("canvas");
            if (b.CanvasTinter.tintMethod(d, c, f),
            b.CanvasTinter.convertTintToImage) {
                var g = new Image;
                g.src = f.toDataURL(),
                d.tintCache[e] = g
            } else
                d.tintCache[e] = f,
                b.CanvasTinter.canvas = null;
            return f
        }
        ,
        b.CanvasTinter.tintWithMultiply = function(a, b, c) {
            var d = c.getContext("2d")
              , e = a.frame;
            c.width = e.width,
            c.height = e.height,
            d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6),
            d.fillRect(0, 0, e.width, e.height),
            d.globalCompositeOperation = "multiply",
            d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height),
            d.globalCompositeOperation = "destination-atop",
            d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height)
        }
        ,
        b.CanvasTinter.tintWithOverlay = function(a, b, c) {
            var d = c.getContext("2d")
              , e = a.frame;
            c.width = e.width,
            c.height = e.height,
            d.globalCompositeOperation = "copy",
            d.fillStyle = "#" + ("00000" + (0 | b).toString(16)).substr(-6),
            d.fillRect(0, 0, e.width, e.height),
            d.globalCompositeOperation = "destination-atop",
            d.drawImage(a.baseTexture.source, e.x, e.y, e.width, e.height, 0, 0, e.width, e.height)
        }
        ,
        b.CanvasTinter.tintWithPerPixel = function(a, c, d) {
            var e = d.getContext("2d")
              , f = a.frame;
            d.width = f.width,
            d.height = f.height,
            e.globalCompositeOperation = "copy",
            e.drawImage(a.baseTexture.source, f.x, f.y, f.width, f.height, 0, 0, f.width, f.height);
            for (var g = b.hex2rgb(c), h = g[0], i = g[1], j = g[2], k = e.getImageData(0, 0, f.width, f.height), l = k.data, m = 0; m < l.length; m += 4)
                l[m + 0] *= h,
                l[m + 1] *= i,
                l[m + 2] *= j;
            e.putImageData(k, 0, 0)
        }
        ,
        b.CanvasTinter.roundColor = function(a) {
            var c = b.CanvasTinter.cacheStepsPerColorChannel
              , d = b.hex2rgb(a);
            return d[0] = Math.min(255, d[0] / c * c),
            d[1] = Math.min(255, d[1] / c * c),
            d[2] = Math.min(255, d[2] / c * c),
            b.rgb2hex(d)
        }
        ,
        b.CanvasTinter.cacheStepsPerColorChannel = 8,
        b.CanvasTinter.convertTintToImage = !1,
        b.CanvasTinter.canUseMultiply = b.canUseNewCanvasBlendModes(),
        b.CanvasTinter.tintMethod = b.CanvasTinter.canUseMultiply ? b.CanvasTinter.tintWithMultiply : b.CanvasTinter.tintWithPerPixel,
        b.CanvasRenderer = function(a, c, d, e) {
            b.defaultRenderer || (b.sayHello("Canvas"),
            b.defaultRenderer = this),
            this.type = b.CANVAS_RENDERER,
            this.clearBeforeRender = !0,
            this.transparent = !!e,
            b.blendModesCanvas || (b.blendModesCanvas = [],
            b.canUseNewCanvasBlendModes() ? (b.blendModesCanvas[b.blendModes.NORMAL] = "source-over",
            b.blendModesCanvas[b.blendModes.ADD] = "lighter",
            b.blendModesCanvas[b.blendModes.MULTIPLY] = "multiply",
            b.blendModesCanvas[b.blendModes.SCREEN] = "screen",
            b.blendModesCanvas[b.blendModes.OVERLAY] = "overlay",
            b.blendModesCanvas[b.blendModes.DARKEN] = "darken",
            b.blendModesCanvas[b.blendModes.LIGHTEN] = "lighten",
            b.blendModesCanvas[b.blendModes.COLOR_DODGE] = "color-dodge",
            b.blendModesCanvas[b.blendModes.COLOR_BURN] = "color-burn",
            b.blendModesCanvas[b.blendModes.HARD_LIGHT] = "hard-light",
            b.blendModesCanvas[b.blendModes.SOFT_LIGHT] = "soft-light",
            b.blendModesCanvas[b.blendModes.DIFFERENCE] = "difference",
            b.blendModesCanvas[b.blendModes.EXCLUSION] = "exclusion",
            b.blendModesCanvas[b.blendModes.HUE] = "hue",
            b.blendModesCanvas[b.blendModes.SATURATION] = "saturation",
            b.blendModesCanvas[b.blendModes.COLOR] = "color",
            b.blendModesCanvas[b.blendModes.LUMINOSITY] = "luminosity") : (b.blendModesCanvas[b.blendModes.NORMAL] = "source-over",
            b.blendModesCanvas[b.blendModes.ADD] = "lighter",
            b.blendModesCanvas[b.blendModes.MULTIPLY] = "source-over",
            b.blendModesCanvas[b.blendModes.SCREEN] = "source-over",
            b.blendModesCanvas[b.blendModes.OVERLAY] = "source-over",
            b.blendModesCanvas[b.blendModes.DARKEN] = "source-over",
            b.blendModesCanvas[b.blendModes.LIGHTEN] = "source-over",
            b.blendModesCanvas[b.blendModes.COLOR_DODGE] = "source-over",
            b.blendModesCanvas[b.blendModes.COLOR_BURN] = "source-over",
            b.blendModesCanvas[b.blendModes.HARD_LIGHT] = "source-over",
            b.blendModesCanvas[b.blendModes.SOFT_LIGHT] = "source-over",
            b.blendModesCanvas[b.blendModes.DIFFERENCE] = "source-over",
            b.blendModesCanvas[b.blendModes.EXCLUSION] = "source-over",
            b.blendModesCanvas[b.blendModes.HUE] = "source-over",
            b.blendModesCanvas[b.blendModes.SATURATION] = "source-over",
            b.blendModesCanvas[b.blendModes.COLOR] = "source-over",
            b.blendModesCanvas[b.blendModes.LUMINOSITY] = "source-over")),
            this.width = a || 800,
            this.height = c || 600,
            this.view = d || document.createElement("canvas"),
            this.context = this.view.getContext("2d", {
                alpha: this.transparent
            }),
            this.refresh = !0,
            this.view.width = this.width,
            this.view.height = this.height,
            this.count = 0,
            this.maskManager = new b.CanvasMaskManager,
            this.renderSession = {
                context: this.context,
                maskManager: this.maskManager,
                scaleMode: null,
                smoothProperty: null,
                roundPixels: !1
            },
            "imageSmoothingEnabled"in this.context ? this.renderSession.smoothProperty = "imageSmoothingEnabled" : "webkitImageSmoothingEnabled"in this.context ? this.renderSession.smoothProperty = "webkitImageSmoothingEnabled" : "mozImageSmoothingEnabled"in this.context ? this.renderSession.smoothProperty = "mozImageSmoothingEnabled" : "oImageSmoothingEnabled"in this.context && (this.renderSession.smoothProperty = "oImageSmoothingEnabled")
        }
        ,
        b.CanvasRenderer.prototype.constructor = b.CanvasRenderer,
        b.CanvasRenderer.prototype.render = function(a) {
            b.texturesToUpdate.length = 0,
            b.texturesToDestroy.length = 0,
            a.updateTransform(),
            this.context.setTransform(1, 0, 0, 1, 0, 0),
            this.context.globalAlpha = 1,
            navigator.isCocoonJS && this.view.screencanvas && (this.context.fillStyle = "black",
            this.context.clear()),
            !this.transparent && this.clearBeforeRender ? (this.context.fillStyle = a.backgroundColorString,
            this.context.fillRect(0, 0, this.width, this.height)) : this.transparent && this.clearBeforeRender && this.context.clearRect(0, 0, this.width, this.height),
            this.renderDisplayObject(a),
            a.interactive && (a._interactiveEventsAdded || (a._interactiveEventsAdded = !0,
            a.interactionManager.setTarget(this))),
            b.Texture.frameUpdates.length > 0 && (b.Texture.frameUpdates.length = 0)
        }
        ,
        b.CanvasRenderer.prototype.resize = function(a, b) {
            this.width = a,
            this.height = b,
            this.view.width = a,
            this.view.height = b
        }
        ,
        b.CanvasRenderer.prototype.renderDisplayObject = function(a, b) {
            this.renderSession.context = b || this.context,
            a._renderCanvas(this.renderSession)
        }
        ,
        b.CanvasRenderer.prototype.renderStripFlat = function(a) {
            var b = this.context
              , c = a.verticies
              , d = c.length / 2;
            this.count++,
            b.beginPath();
            for (var e = 1; d - 2 > e; e++) {
                var f = 2 * e
                  , g = c[f]
                  , h = c[f + 2]
                  , i = c[f + 4]
                  , j = c[f + 1]
                  , k = c[f + 3]
                  , l = c[f + 5];
                b.moveTo(g, j),
                b.lineTo(h, k),
                b.lineTo(i, l)
            }
            b.fillStyle = "#FF0000",
            b.fill(),
            b.closePath()
        }
        ,
        b.CanvasRenderer.prototype.renderStrip = function(a) {
            var b = this.context
              , c = a.verticies
              , d = a.uvs
              , e = c.length / 2;
            this.count++;
            for (var f = 1; e - 2 > f; f++) {
                var g = 2 * f
                  , h = c[g]
                  , i = c[g + 2]
                  , j = c[g + 4]
                  , k = c[g + 1]
                  , l = c[g + 3]
                  , m = c[g + 5]
                  , n = d[g] * a.texture.width
                  , o = d[g + 2] * a.texture.width
                  , p = d[g + 4] * a.texture.width
                  , q = d[g + 1] * a.texture.height
                  , r = d[g + 3] * a.texture.height
                  , s = d[g + 5] * a.texture.height;
                b.save(),
                b.beginPath(),
                b.moveTo(h, k),
                b.lineTo(i, l),
                b.lineTo(j, m),
                b.closePath(),
                b.clip();
                var t = n * r + q * p + o * s - r * p - q * o - n * s
                  , u = h * r + q * j + i * s - r * j - q * i - h * s
                  , v = n * i + h * p + o * j - i * p - h * o - n * j
                  , w = n * r * j + q * i * p + h * o * s - h * r * p - q * o * j - n * i * s
                  , x = k * r + q * m + l * s - r * m - q * l - k * s
                  , y = n * l + k * p + o * m - l * p - k * o - n * m
                  , z = n * r * m + q * l * p + k * o * s - k * r * p - q * o * m - n * l * s;
                b.transform(u / t, x / t, v / t, y / t, w / t, z / t),
                b.drawImage(a.texture.baseTexture.source, 0, 0),
                b.restore()
            }
        }
        ,
        b.CanvasBuffer = function(a, b) {
            this.width = a,
            this.height = b,
            this.canvas = document.createElement("canvas"),
            this.context = this.canvas.getContext("2d"),
            this.canvas.width = a,
            this.canvas.height = b
        }
        ,
        b.CanvasBuffer.prototype.clear = function() {
            this.context.clearRect(0, 0, this.width, this.height)
        }
        ,
        b.CanvasBuffer.prototype.resize = function(a, b) {
            this.width = this.canvas.width = a,
            this.height = this.canvas.height = b
        }
        ,
        b.CanvasGraphics = function() {}
        ,
        b.CanvasGraphics.renderGraphics = function(a, c) {
            for (var d = a.worldAlpha, e = "", f = 0; f < a.graphicsData.length; f++) {
                var g = a.graphicsData[f]
                  , h = g.points;
                if (c.strokeStyle = e = "#" + ("00000" + (0 | g.lineColor).toString(16)).substr(-6),
                c.lineWidth = g.lineWidth,
                g.type === b.Graphics.POLY) {
                    c.beginPath(),
                    c.moveTo(h[0], h[1]);
                    for (var i = 1; i < h.length / 2; i++)
                        c.lineTo(h[2 * i], h[2 * i + 1]);
                    h[0] === h[h.length - 2] && h[1] === h[h.length - 1] && c.closePath(),
                    g.fill && (c.globalAlpha = g.fillAlpha * d,
                    c.fillStyle = e = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6),
                    c.fill()),
                    g.lineWidth && (c.globalAlpha = g.lineAlpha * d,
                    c.stroke())
                } else if (g.type === b.Graphics.RECT)
                    (g.fillColor || 0 === g.fillColor) && (c.globalAlpha = g.fillAlpha * d,
                    c.fillStyle = e = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6),
                    c.fillRect(h[0], h[1], h[2], h[3])),
                    g.lineWidth && (c.globalAlpha = g.lineAlpha * d,
                    c.strokeRect(h[0], h[1], h[2], h[3]));
                else if (g.type === b.Graphics.CIRC)
                    c.beginPath(),
                    c.arc(h[0], h[1], h[2], 0, 2 * Math.PI),
                    c.closePath(),
                    g.fill && (c.globalAlpha = g.fillAlpha * d,
                    c.fillStyle = e = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6),
                    c.fill()),
                    g.lineWidth && (c.globalAlpha = g.lineAlpha * d,
                    c.stroke());
                else if (g.type === b.Graphics.ELIP) {
                    var j = g.points
                      , k = 2 * j[2]
                      , l = 2 * j[3]
                      , m = j[0] - k / 2
                      , n = j[1] - l / 2;
                    c.beginPath();
                    var o = .5522848
                      , p = k / 2 * o
                      , q = l / 2 * o
                      , r = m + k
                      , s = n + l
                      , t = m + k / 2
                      , u = n + l / 2;
                    c.moveTo(m, u),
                    c.bezierCurveTo(m, u - q, t - p, n, t, n),
                    c.bezierCurveTo(t + p, n, r, u - q, r, u),
                    c.bezierCurveTo(r, u + q, t + p, s, t, s),
                    c.bezierCurveTo(t - p, s, m, u + q, m, u),
                    c.closePath(),
                    g.fill && (c.globalAlpha = g.fillAlpha * d,
                    c.fillStyle = e = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6),
                    c.fill()),
                    g.lineWidth && (c.globalAlpha = g.lineAlpha * d,
                    c.stroke())
                } else if (g.type === b.Graphics.RREC) {
                    var v = h[0]
                      , w = h[1]
                      , x = h[2]
                      , y = h[3]
                      , z = h[4]
                      , A = Math.min(x, y) / 2 | 0;
                    z = z > A ? A : z,
                    c.beginPath(),
                    c.moveTo(v, w + z),
                    c.lineTo(v, w + y - z),
                    c.quadraticCurveTo(v, w + y, v + z, w + y),
                    c.lineTo(v + x - z, w + y),
                    c.quadraticCurveTo(v + x, w + y, v + x, w + y - z),
                    c.lineTo(v + x, w + z),
                    c.quadraticCurveTo(v + x, w, v + x - z, w),
                    c.lineTo(v + z, w),
                    c.quadraticCurveTo(v, w, v, w + z),
                    c.closePath(),
                    (g.fillColor || 0 === g.fillColor) && (c.globalAlpha = g.fillAlpha * d,
                    c.fillStyle = e = "#" + ("00000" + (0 | g.fillColor).toString(16)).substr(-6),
                    c.fill()),
                    g.lineWidth && (c.globalAlpha = g.lineAlpha * d,
                    c.stroke())
                }
            }
        }
        ,
        b.CanvasGraphics.renderGraphicsMask = function(a, c) {
            var d = a.graphicsData.length;
            if (0 !== d) {
                d > 1 && (d = 1,
                window.console.log("Pixi.js warning: masks in canvas can only mask using the first path in the graphics object"));
                for (var e = 0; 1 > e; e++) {
                    var f = a.graphicsData[e]
                      , g = f.points;
                    if (f.type === b.Graphics.POLY) {
                        c.beginPath(),
                        c.moveTo(g[0], g[1]);
                        for (var h = 1; h < g.length / 2; h++)
                            c.lineTo(g[2 * h], g[2 * h + 1]);
                        g[0] === g[g.length - 2] && g[1] === g[g.length - 1] && c.closePath()
                    } else if (f.type === b.Graphics.RECT)
                        c.beginPath(),
                        c.rect(g[0], g[1], g[2], g[3]),
                        c.closePath();
                    else if (f.type === b.Graphics.CIRC)
                        c.beginPath(),
                        c.arc(g[0], g[1], g[2], 0, 2 * Math.PI),
                        c.closePath();
                    else if (f.type === b.Graphics.ELIP) {
                        var i = f.points
                          , j = 2 * i[2]
                          , k = 2 * i[3]
                          , l = i[0] - j / 2
                          , m = i[1] - k / 2;
                        c.beginPath();
                        var n = .5522848
                          , o = j / 2 * n
                          , p = k / 2 * n
                          , q = l + j
                          , r = m + k
                          , s = l + j / 2
                          , t = m + k / 2;
                        c.moveTo(l, t),
                        c.bezierCurveTo(l, t - p, s - o, m, s, m),
                        c.bezierCurveTo(s + o, m, q, t - p, q, t),
                        c.bezierCurveTo(q, t + p, s + o, r, s, r),
                        c.bezierCurveTo(s - o, r, l, t + p, l, t),
                        c.closePath()
                    } else if (f.type === b.Graphics.RREC) {
                        var u = g[0]
                          , v = g[1]
                          , w = g[2]
                          , x = g[3]
                          , y = g[4]
                          , z = Math.min(w, x) / 2 | 0;
                        y = y > z ? z : y,
                        c.beginPath(),
                        c.moveTo(u, v + y),
                        c.lineTo(u, v + x - y),
                        c.quadraticCurveTo(u, v + x, u + y, v + x),
                        c.lineTo(u + w - y, v + x),
                        c.quadraticCurveTo(u + w, v + x, u + w, v + x - y),
                        c.lineTo(u + w, v + y),
                        c.quadraticCurveTo(u + w, v, u + w - y, v),
                        c.lineTo(u + y, v),
                        c.quadraticCurveTo(u, v, u, v + y),
                        c.closePath()
                    }
                }
            }
        }
        ,
        b.Graphics = function() {
            b.DisplayObjectContainer.call(this),
            this.renderable = !0,
            this.fillAlpha = 1,
            this.lineWidth = 0,
            this.lineColor = "black",
            this.graphicsData = [],
            this.tint = 16777215,
            this.blendMode = b.blendModes.NORMAL,
            this.currentPath = {
                points: []
            },
            this._webGL = [],
            this.isMask = !1,
            this.bounds = null,
            this.boundsPadding = 10,
            this.dirty = !0
        }
        ,
        b.Graphics.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.Graphics.prototype.constructor = b.Graphics,
        Object.defineProperty(b.Graphics.prototype, "cacheAsBitmap", {
            get: function() {
                return this._cacheAsBitmap
            },
            set: function(a) {
                this._cacheAsBitmap = a,
                this._cacheAsBitmap ? this._generateCachedSprite() : (this.destroyCachedSprite(),
                this.dirty = !0)
            }
        }),
        b.Graphics.prototype.lineStyle = function(a, c, d) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.lineWidth = a || 0,
            this.lineColor = c || 0,
            this.lineAlpha = arguments.length < 3 ? 1 : d,
            this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [],
                type: b.Graphics.POLY
            },
            this.graphicsData.push(this.currentPath),
            this
        }
        ,
        b.Graphics.prototype.moveTo = function(a, c) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.currentPath = this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [],
                type: b.Graphics.POLY
            },
            this.currentPath.points.push(a, c),
            this.graphicsData.push(this.currentPath),
            this
        }
        ,
        b.Graphics.prototype.lineTo = function(a, b) {
            return this.currentPath.points.push(a, b),
            this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.quadraticCurveTo = function(a, b, c, d) {
            0 === this.currentPath.points.length && this.moveTo(0, 0);
            var e, f, g = 20, h = this.currentPath.points;
            0 === h.length && this.moveTo(0, 0);
            for (var i = h[h.length - 2], j = h[h.length - 1], k = 0, l = 1; g >= l; l++)
                k = l / g,
                e = i + (a - i) * k,
                f = j + (b - j) * k,
                h.push(e + (a + (c - a) * k - e) * k, f + (b + (d - b) * k - f) * k);
            return this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.bezierCurveTo = function(a, b, c, d, e, f) {
            0 === this.currentPath.points.length && this.moveTo(0, 0);
            for (var g, h, i, j, k, l = 20, m = this.currentPath.points, n = m[m.length - 2], o = m[m.length - 1], p = 0, q = 1; l > q; q++)
                p = q / l,
                g = 1 - p,
                h = g * g,
                i = h * g,
                j = p * p,
                k = j * p,
                m.push(i * n + 3 * h * p * a + 3 * g * j * c + k * e, i * o + 3 * h * p * b + 3 * g * j * d + k * f);
            return this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.arcTo = function(a, b, c, d, e) {
            0 === this.currentPath.points.length && this.moveTo(a, b);
            var f = this.currentPath.points
              , g = f[f.length - 2]
              , h = f[f.length - 1]
              , i = h - b
              , j = g - a
              , k = d - b
              , l = c - a
              , m = Math.abs(i * l - j * k);
            if (1e-8 > m || 0 === e)
                f.push(a, b);
            else {
                var n = i * i + j * j
                  , o = k * k + l * l
                  , p = i * k + j * l
                  , q = e * Math.sqrt(n) / m
                  , r = e * Math.sqrt(o) / m
                  , s = q * p / n
                  , t = r * p / o
                  , u = q * l + r * j
                  , v = q * k + r * i
                  , w = j * (r + s)
                  , x = i * (r + s)
                  , y = l * (q + t)
                  , z = k * (q + t)
                  , A = Math.atan2(x - v, w - u)
                  , B = Math.atan2(z - v, y - u);
                this.arc(u + a, v + b, e, A, B, j * k > l * i)
            }
            return this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.arc = function(a, b, c, d, e, f) {
            var g = a + Math.cos(d) * c
              , h = b + Math.sin(d) * c
              , i = this.currentPath.points;
            if ((0 !== i.length && i[i.length - 2] !== g || i[i.length - 1] !== h) && (this.moveTo(g, h),
            i = this.currentPath.points),
            d === e)
                return this;
            !f && d >= e ? e += 2 * Math.PI : f && e >= d && (d += 2 * Math.PI);
            var j = f ? -1 * (d - e) : e - d
              , k = Math.abs(j) / (2 * Math.PI) * 40;
            if (0 === j)
                return this;
            for (var l = j / (2 * k), m = 2 * l, n = Math.cos(l), o = Math.sin(l), p = k - 1, q = p % 1 / p, r = 0; p >= r; r++) {
                var s = r + q * r
                  , t = l + d + m * s
                  , u = Math.cos(t)
                  , v = -Math.sin(t);
                i.push((n * u + o * v) * c + a, (n * -v + o * u) * c + b)
            }
            return this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.drawPath = function(a) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.currentPath = this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [],
                type: b.Graphics.POLY
            },
            this.graphicsData.push(this.currentPath),
            this.currentPath.points = this.currentPath.points.concat(a),
            this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.beginFill = function(a, b) {
            return this.filling = !0,
            this.fillColor = a || 0,
            this.fillAlpha = arguments.length < 2 ? 1 : b,
            this
        }
        ,
        b.Graphics.prototype.endFill = function() {
            return this.filling = !1,
            this.fillColor = null,
            this.fillAlpha = 1,
            this
        }
        ,
        b.Graphics.prototype.drawRect = function(a, c, d, e) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [a, c, d, e],
                type: b.Graphics.RECT
            },
            this.graphicsData.push(this.currentPath),
            this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.drawRoundedRect = function(a, c, d, e, f) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [a, c, d, e, f],
                type: b.Graphics.RREC
            },
            this.graphicsData.push(this.currentPath),
            this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.drawCircle = function(a, c, d) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [a, c, d, d],
                type: b.Graphics.CIRC
            },
            this.graphicsData.push(this.currentPath),
            this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.drawEllipse = function(a, c, d, e) {
            return this.currentPath.points.length || this.graphicsData.pop(),
            this.currentPath = {
                lineWidth: this.lineWidth,
                lineColor: this.lineColor,
                lineAlpha: this.lineAlpha,
                fillColor: this.fillColor,
                fillAlpha: this.fillAlpha,
                fill: this.filling,
                points: [a, c, d, e],
                type: b.Graphics.ELIP
            },
            this.graphicsData.push(this.currentPath),
            this.dirty = !0,
            this
        }
        ,
        b.Graphics.prototype.clear = function() {
            return this.lineWidth = 0,
            this.filling = !1,
            this.dirty = !0,
            this.clearDirty = !0,
            this.graphicsData = [],
            this.bounds = null,
            this
        }
        ,
        b.Graphics.prototype.generateTexture = function() {
            var a = this.getBounds()
              , c = new b.CanvasBuffer(a.width,a.height)
              , d = b.Texture.fromCanvas(c.canvas);
            return c.context.translate(-a.x, -a.y),
            b.CanvasGraphics.renderGraphics(this, c.context),
            d
        }
        ,
        b.Graphics.prototype._renderWebGL = function(a) {
            if (this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
                if (this._cacheAsBitmap)
                    return this.dirty && (this._generateCachedSprite(),
                    b.updateWebGLTexture(this._cachedSprite.texture.baseTexture, a.gl),
                    this.dirty = !1),
                    this._cachedSprite.alpha = this.alpha,
                    b.Sprite.prototype._renderWebGL.call(this._cachedSprite, a),
                    void 0;
                if (a.spriteBatch.stop(),
                a.blendModeManager.setBlendMode(this.blendMode),
                this._mask && a.maskManager.pushMask(this._mask, a),
                this._filters && a.filterManager.pushFilter(this._filterBlock),
                this.blendMode !== a.spriteBatch.currentBlendMode) {
                    a.spriteBatch.currentBlendMode = this.blendMode;
                    var c = b.blendModesWebGL[a.spriteBatch.currentBlendMode];
                    a.spriteBatch.gl.blendFunc(c[0], c[1])
                }
                if (b.WebGLGraphics.renderGraphics(this, a),
                this.children.length) {
                    a.spriteBatch.start();
                    for (var d = 0, e = this.children.length; e > d; d++)
                        this.children[d]._renderWebGL(a);
                    a.spriteBatch.stop()
                }
                this._filters && a.filterManager.popFilter(),
                this._mask && a.maskManager.popMask(this.mask, a),
                a.drawCount++,
                a.spriteBatch.start()
            }
        }
        ,
        b.Graphics.prototype._renderCanvas = function(a) {
            if (this.visible !== !1 && 0 !== this.alpha && this.isMask !== !0) {
                var c = a.context
                  , d = this.worldTransform;
                this.blendMode !== a.currentBlendMode && (a.currentBlendMode = this.blendMode,
                c.globalCompositeOperation = b.blendModesCanvas[a.currentBlendMode]),
                this._mask && a.maskManager.pushMask(this._mask, a.context),
                c.setTransform(d.a, d.c, d.b, d.d, d.tx, d.ty),
                b.CanvasGraphics.renderGraphics(this, c);
                for (var e = 0, f = this.children.length; f > e; e++)
                    this.children[e]._renderCanvas(a);
                this._mask && a.maskManager.popMask(a.context)
            }
        }
        ,
        b.Graphics.prototype.getBounds = function(a) {
            this.bounds || this.updateBounds();
            var b = this.bounds.x
              , c = this.bounds.width + this.bounds.x
              , d = this.bounds.y
              , e = this.bounds.height + this.bounds.y
              , f = a || this.worldTransform
              , g = f.a
              , h = f.c
              , i = f.b
              , j = f.d
              , k = f.tx
              , l = f.ty
              , m = g * c + i * e + k
              , n = j * e + h * c + l
              , o = g * b + i * e + k
              , p = j * e + h * b + l
              , q = g * b + i * d + k
              , r = j * d + h * b + l
              , s = g * c + i * d + k
              , t = j * d + h * c + l
              , u = m
              , v = n
              , w = m
              , x = n;
            w = w > o ? o : w,
            w = w > q ? q : w,
            w = w > s ? s : w,
            x = x > p ? p : x,
            x = x > r ? r : x,
            x = x > t ? t : x,
            u = o > u ? o : u,
            u = q > u ? q : u,
            u = s > u ? s : u,
            v = p > v ? p : v,
            v = r > v ? r : v,
            v = t > v ? t : v;
            var y = this._bounds;
            return y.x = w,
            y.width = u - w,
            y.y = x,
            y.height = v - x,
            y
        }
        ,
        b.Graphics.prototype.updateBounds = function() {
            for (var a, c, d, e, f, g = 1 / 0, h = -1 / 0, i = 1 / 0, j = -1 / 0, k = 0; k < this.graphicsData.length; k++) {
                var l = this.graphicsData[k]
                  , m = l.type
                  , n = l.lineWidth;
                if (a = l.points,
                m === b.Graphics.RECT)
                    c = a[0] - n / 2,
                    d = a[1] - n / 2,
                    e = a[2] + n,
                    f = a[3] + n,
                    g = g > c ? c : g,
                    h = c + e > h ? c + e : h,
                    i = i > d ? c : i,
                    j = d + f > j ? d + f : j;
                else if (m === b.Graphics.CIRC || m === b.Graphics.ELIP)
                    c = a[0],
                    d = a[1],
                    e = a[2] + n / 2,
                    f = a[3] + n / 2,
                    g = g > c - e ? c - e : g,
                    h = c + e > h ? c + e : h,
                    i = i > d - f ? d - f : i,
                    j = d + f > j ? d + f : j;
                else
                    for (var o = 0; o < a.length; o += 2)
                        c = a[o],
                        d = a[o + 1],
                        g = g > c - n ? c - n : g,
                        h = c + n > h ? c + n : h,
                        i = i > d - n ? d - n : i,
                        j = d + n > j ? d + n : j
            }
            var p = this.boundsPadding;
            this.bounds = new b.Rectangle(g - p,i - p,h - g + 2 * p,j - i + 2 * p)
        }
        ,
        b.Graphics.prototype._generateCachedSprite = function() {
            var a = this.getLocalBounds();
            if (this._cachedSprite)
                this._cachedSprite.buffer.resize(a.width, a.height);
            else {
                var c = new b.CanvasBuffer(a.width,a.height)
                  , d = b.Texture.fromCanvas(c.canvas);
                this._cachedSprite = new b.Sprite(d),
                this._cachedSprite.buffer = c,
                this._cachedSprite.worldTransform = this.worldTransform
            }
            this._cachedSprite.anchor.x = -(a.x / a.width),
            this._cachedSprite.anchor.y = -(a.y / a.height),
            this._cachedSprite.buffer.context.translate(-a.x, -a.y),
            b.CanvasGraphics.renderGraphics(this, this._cachedSprite.buffer.context),
            this._cachedSprite.alpha = this.alpha
        }
        ,
        b.Graphics.prototype.destroyCachedSprite = function() {
            this._cachedSprite.texture.destroy(!0),
            this._cachedSprite = null
        }
        ,
        b.Graphics.POLY = 0,
        b.Graphics.RECT = 1,
        b.Graphics.CIRC = 2,
        b.Graphics.ELIP = 3,
        b.Graphics.RREC = 4,
        b.Strip = function(a) {
            b.DisplayObjectContainer.call(this),
            this.texture = a,
            this.uvs = new b.Float32Array([0, 1, 1, 1, 1, 0, 0, 1]),
            this.verticies = new b.Float32Array([0, 0, 100, 0, 100, 100, 0, 100]),
            this.colors = new b.Float32Array([1, 1, 1, 1]),
            this.indices = new b.Uint16Array([0, 1, 2, 3]),
            this.dirty = !0
        }
        ,
        b.Strip.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.Strip.prototype.constructor = b.Strip,
        b.Strip.prototype._renderWebGL = function(a) {
            !this.visible || this.alpha <= 0 || (a.spriteBatch.stop(),
            this._vertexBuffer || this._initWebGL(a),
            a.shaderManager.setShader(a.shaderManager.stripShader),
            this._renderStrip(a),
            a.spriteBatch.start())
        }
        ,
        b.Strip.prototype._initWebGL = function(a) {
            var b = a.gl;
            this._vertexBuffer = b.createBuffer(),
            this._indexBuffer = b.createBuffer(),
            this._uvBuffer = b.createBuffer(),
            this._colorBuffer = b.createBuffer(),
            b.bindBuffer(b.ARRAY_BUFFER, this._vertexBuffer),
            b.bufferData(b.ARRAY_BUFFER, this.verticies, b.DYNAMIC_DRAW),
            b.bindBuffer(b.ARRAY_BUFFER, this._uvBuffer),
            b.bufferData(b.ARRAY_BUFFER, this.uvs, b.STATIC_DRAW),
            b.bindBuffer(b.ARRAY_BUFFER, this._colorBuffer),
            b.bufferData(b.ARRAY_BUFFER, this.colors, b.STATIC_DRAW),
            b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
            b.bufferData(b.ELEMENT_ARRAY_BUFFER, this.indices, b.STATIC_DRAW)
        }
        ,
        b.Strip.prototype._renderStrip = function(a) {
            var c = a.gl
              , d = a.projection
              , e = a.offset
              , f = a.shaderManager.stripShader;
            c.blendFunc(c.ONE, c.ONE_MINUS_SRC_ALPHA),
            c.uniformMatrix3fv(f.translationMatrix, !1, this.worldTransform.toArray(!0)),
            c.uniform2f(f.projectionVector, d.x, -d.y),
            c.uniform2f(f.offsetVector, -e.x, -e.y),
            c.uniform1f(f.alpha, 1),
            this.dirty ? (this.dirty = !1,
            c.bindBuffer(c.ARRAY_BUFFER, this._vertexBuffer),
            c.bufferData(c.ARRAY_BUFFER, this.verticies, c.STATIC_DRAW),
            c.vertexAttribPointer(f.aVertexPosition, 2, c.FLOAT, !1, 0, 0),
            c.bindBuffer(c.ARRAY_BUFFER, this._uvBuffer),
            c.bufferData(c.ARRAY_BUFFER, this.uvs, c.STATIC_DRAW),
            c.vertexAttribPointer(f.aTextureCoord, 2, c.FLOAT, !1, 0, 0),
            c.activeTexture(c.TEXTURE0),
            c.bindTexture(c.TEXTURE_2D, this.texture.baseTexture._glTextures[c.id] || b.createWebGLTexture(this.texture.baseTexture, c)),
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this._indexBuffer),
            c.bufferData(c.ELEMENT_ARRAY_BUFFER, this.indices, c.STATIC_DRAW)) : (c.bindBuffer(c.ARRAY_BUFFER, this._vertexBuffer),
            c.bufferSubData(c.ARRAY_BUFFER, 0, this.verticies),
            c.vertexAttribPointer(f.aVertexPosition, 2, c.FLOAT, !1, 0, 0),
            c.bindBuffer(c.ARRAY_BUFFER, this._uvBuffer),
            c.vertexAttribPointer(f.aTextureCoord, 2, c.FLOAT, !1, 0, 0),
            c.activeTexture(c.TEXTURE0),
            c.bindTexture(c.TEXTURE_2D, this.texture.baseTexture._glTextures[c.id] || b.createWebGLTexture(this.texture.baseTexture, c)),
            c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, this._indexBuffer)),
            c.drawElements(c.TRIANGLE_STRIP, this.indices.length, c.UNSIGNED_SHORT, 0)
        }
        ,
        b.Strip.prototype._renderCanvas = function(a) {
            var b = a.context
              , c = this.worldTransform;
            a.roundPixels ? b.setTransform(c.a, c.c, c.b, c.d, 0 | c.tx, 0 | c.ty) : b.setTransform(c.a, c.c, c.b, c.d, c.tx, c.ty);
            var d = this
              , e = d.verticies
              , f = d.uvs
              , g = e.length / 2;
            this.count++;
            for (var h = 0; g - 2 > h; h++) {
                var i = 2 * h
                  , j = e[i]
                  , k = e[i + 2]
                  , l = e[i + 4]
                  , m = e[i + 1]
                  , n = e[i + 3]
                  , o = e[i + 5]
                  , p = (j + k + l) / 3
                  , q = (m + n + o) / 3
                  , r = j - p
                  , s = m - q
                  , t = Math.sqrt(r * r + s * s);
                j = p + r / t * (t + 3),
                m = q + s / t * (t + 3),
                r = k - p,
                s = n - q,
                t = Math.sqrt(r * r + s * s),
                k = p + r / t * (t + 3),
                n = q + s / t * (t + 3),
                r = l - p,
                s = o - q,
                t = Math.sqrt(r * r + s * s),
                l = p + r / t * (t + 3),
                o = q + s / t * (t + 3);
                var u = f[i] * d.texture.width
                  , v = f[i + 2] * d.texture.width
                  , w = f[i + 4] * d.texture.width
                  , x = f[i + 1] * d.texture.height
                  , y = f[i + 3] * d.texture.height
                  , z = f[i + 5] * d.texture.height;
                b.save(),
                b.beginPath(),
                b.moveTo(j, m),
                b.lineTo(k, n),
                b.lineTo(l, o),
                b.closePath(),
                b.clip();
                var A = u * y + x * w + v * z - y * w - x * v - u * z
                  , B = j * y + x * l + k * z - y * l - x * k - j * z
                  , C = u * k + j * w + v * l - k * w - j * v - u * l
                  , D = u * y * l + x * k * w + j * v * z - j * y * w - x * v * l - u * k * z
                  , E = m * y + x * o + n * z - y * o - x * n - m * z
                  , F = u * n + m * w + v * o - n * w - m * v - u * o
                  , G = u * y * o + x * n * w + m * v * z - m * y * w - x * v * o - u * n * z;
                b.transform(B / A, E / A, C / A, F / A, D / A, G / A),
                b.drawImage(d.texture.baseTexture.source, 0, 0),
                b.restore()
            }
        }
        ,
        b.Strip.prototype.onTextureUpdate = function() {
            this.updateFrame = !0
        }
        ,
        b.Rope = function(a, c) {
            b.Strip.call(this, a),
            this.points = c,
            this.verticies = new b.Float32Array(4 * c.length),
            this.uvs = new b.Float32Array(4 * c.length),
            this.colors = new b.Float32Array(2 * c.length),
            this.indices = new b.Uint16Array(2 * c.length),
            this.refresh()
        }
        ,
        b.Rope.prototype = Object.create(b.Strip.prototype),
        b.Rope.prototype.constructor = b.Rope,
        b.Rope.prototype.refresh = function() {
            var a = this.points;
            if (!(a.length < 1)) {
                var b = this.uvs
                  , c = a[0]
                  , d = this.indices
                  , e = this.colors;
                this.count -= .2,
                b[0] = 0,
                b[1] = 0,
                b[2] = 0,
                b[3] = 1,
                e[0] = 1,
                e[1] = 1,
                d[0] = 0,
                d[1] = 1;
                for (var f, g, h, i = a.length, j = 1; i > j; j++)
                    f = a[j],
                    g = 4 * j,
                    h = j / (i - 1),
                    j % 2 ? (b[g] = h,
                    b[g + 1] = 0,
                    b[g + 2] = h,
                    b[g + 3] = 1) : (b[g] = h,
                    b[g + 1] = 0,
                    b[g + 2] = h,
                    b[g + 3] = 1),
                    g = 2 * j,
                    e[g] = 1,
                    e[g + 1] = 1,
                    g = 2 * j,
                    d[g] = g,
                    d[g + 1] = g + 1,
                    c = f
            }
        }
        ,
        b.Rope.prototype.updateTransform = function() {
            var a = this.points;
            if (!(a.length < 1)) {
                var c, d = a[0], e = {
                    x: 0,
                    y: 0
                };
                this.count -= .2;
                for (var f, g, h, i, j, k = this.verticies, l = a.length, m = 0; l > m; m++)
                    f = a[m],
                    g = 4 * m,
                    c = m < a.length - 1 ? a[m + 1] : f,
                    e.y = -(c.x - d.x),
                    e.x = c.y - d.y,
                    h = 10 * (1 - m / (l - 1)),
                    h > 1 && (h = 1),
                    i = Math.sqrt(e.x * e.x + e.y * e.y),
                    j = this.texture.height / 2,
                    e.x /= i,
                    e.y /= i,
                    e.x *= j,
                    e.y *= j,
                    k[g] = f.x + e.x,
                    k[g + 1] = f.y + e.y,
                    k[g + 2] = f.x - e.x,
                    k[g + 3] = f.y - e.y,
                    d = f;
                b.DisplayObjectContainer.prototype.updateTransform.call(this)
            }
        }
        ,
        b.Rope.prototype.setTexture = function(a) {
            this.texture = a
        }
        ,
        b.TilingSprite = function(a, c, d) {
            b.Sprite.call(this, a),
            this._width = c || 100,
            this._height = d || 100,
            this.tileScale = new b.Point(1,1),
            this.tileScaleOffset = new b.Point(1,1),
            this.tilePosition = new b.Point(0,0),
            this.renderable = !0,
            this.tint = 16777215,
            this.blendMode = b.blendModes.NORMAL
        }
        ,
        b.TilingSprite.prototype = Object.create(b.Sprite.prototype),
        b.TilingSprite.prototype.constructor = b.TilingSprite,
        Object.defineProperty(b.TilingSprite.prototype, "width", {
            get: function() {
                return this._width
            },
            set: function(a) {
                this._width = a
            }
        }),
        Object.defineProperty(b.TilingSprite.prototype, "height", {
            get: function() {
                return this._height
            },
            set: function(a) {
                this._height = a
            }
        }),
        b.TilingSprite.prototype.setTexture = function(a) {
            this.texture !== a && (this.texture = a,
            this.refreshTexture = !0,
            this.cachedTint = 16777215)
        }
        ,
        b.TilingSprite.prototype._renderWebGL = function(a) {
            if (this.visible !== !1 && 0 !== this.alpha) {
                var c, d;
                for (this._mask && (a.spriteBatch.stop(),
                a.maskManager.pushMask(this.mask, a),
                a.spriteBatch.start()),
                this._filters && (a.spriteBatch.flush(),
                a.filterManager.pushFilter(this._filterBlock)),
                !this.tilingTexture || this.refreshTexture ? (this.generateTilingTexture(!0),
                this.tilingTexture && this.tilingTexture.needsUpdate && (b.updateWebGLTexture(this.tilingTexture.baseTexture, a.gl),
                this.tilingTexture.needsUpdate = !1)) : a.spriteBatch.renderTilingSprite(this),
                c = 0,
                d = this.children.length; d > c; c++)
                    this.children[c]._renderWebGL(a);
                a.spriteBatch.stop(),
                this._filters && a.filterManager.popFilter(),
                this._mask && a.maskManager.popMask(a),
                a.spriteBatch.start()
            }
        }
        ,
        b.TilingSprite.prototype._renderCanvas = function(a) {
            if (this.visible !== !1 && 0 !== this.alpha) {
                var c = a.context;
                this._mask && a.maskManager.pushMask(this._mask, c),
                c.globalAlpha = this.worldAlpha;
                var d, e, f = this.worldTransform;
                if (c.setTransform(f.a, f.c, f.b, f.d, f.tx, f.ty),
                !this.__tilePattern || this.refreshTexture) {
                    if (this.generateTilingTexture(!1),
                    !this.tilingTexture)
                        return;
                    this.__tilePattern = c.createPattern(this.tilingTexture.baseTexture.source, "repeat")
                }
                this.blendMode !== a.currentBlendMode && (a.currentBlendMode = this.blendMode,
                c.globalCompositeOperation = b.blendModesCanvas[a.currentBlendMode]);
                var g = this.tilePosition
                  , h = this.tileScale;
                for (g.x %= this.tilingTexture.baseTexture.width,
                g.y %= this.tilingTexture.baseTexture.height,
                c.scale(h.x, h.y),
                c.translate(g.x, g.y),
                c.fillStyle = this.__tilePattern,
                c.fillRect(-g.x + this.anchor.x * -this._width, -g.y + this.anchor.y * -this._height, this._width / h.x, this._height / h.y),
                c.scale(1 / h.x, 1 / h.y),
                c.translate(-g.x, -g.y),
                this._mask && a.maskManager.popMask(a.context),
                d = 0,
                e = this.children.length; e > d; d++)
                    this.children[d]._renderCanvas(a)
            }
        }
        ,
        b.TilingSprite.prototype.getBounds = function() {
            var a = this._width
              , b = this._height
              , c = a * (1 - this.anchor.x)
              , d = a * -this.anchor.x
              , e = b * (1 - this.anchor.y)
              , f = b * -this.anchor.y
              , g = this.worldTransform
              , h = g.a
              , i = g.c
              , j = g.b
              , k = g.d
              , l = g.tx
              , m = g.ty
              , n = h * d + j * f + l
              , o = k * f + i * d + m
              , p = h * c + j * f + l
              , q = k * f + i * c + m
              , r = h * c + j * e + l
              , s = k * e + i * c + m
              , t = h * d + j * e + l
              , u = k * e + i * d + m
              , v = -1 / 0
              , w = -1 / 0
              , x = 1 / 0
              , y = 1 / 0;
            x = x > n ? n : x,
            x = x > p ? p : x,
            x = x > r ? r : x,
            x = x > t ? t : x,
            y = y > o ? o : y,
            y = y > q ? q : y,
            y = y > s ? s : y,
            y = y > u ? u : y,
            v = n > v ? n : v,
            v = p > v ? p : v,
            v = r > v ? r : v,
            v = t > v ? t : v,
            w = o > w ? o : w,
            w = q > w ? q : w,
            w = s > w ? s : w,
            w = u > w ? u : w;
            var z = this._bounds;
            return z.x = x,
            z.width = v - x,
            z.y = y,
            z.height = w - y,
            this._currentBounds = z,
            z
        }
        ,
        b.TilingSprite.prototype.onTextureUpdate = function() {}
        ,
        b.TilingSprite.prototype.generateTilingTexture = function(a) {
            if (this.texture.baseTexture.hasLoaded) {
                var c, d, e = this.texture, f = e.frame, g = f.width !== e.baseTexture.width || f.height !== e.baseTexture.height, h = !1;
                if (a ? (c = b.getNextPowerOfTwo(f.width),
                d = b.getNextPowerOfTwo(f.height),
                (f.width !== c || f.height !== d) && (h = !0)) : g && (c = f.width,
                d = f.height,
                h = !0),
                h) {
                    var i;
                    this.tilingTexture && this.tilingTexture.isTiling ? (i = this.tilingTexture.canvasBuffer,
                    i.resize(c, d),
                    this.tilingTexture.baseTexture.width = c,
                    this.tilingTexture.baseTexture.height = d,
                    this.tilingTexture.needsUpdate = !0) : (i = new b.CanvasBuffer(c,d),
                    this.tilingTexture = b.Texture.fromCanvas(i.canvas),
                    this.tilingTexture.canvasBuffer = i,
                    this.tilingTexture.isTiling = !0),
                    i.context.drawImage(e.baseTexture.source, e.crop.x, e.crop.y, e.crop.width, e.crop.height, 0, 0, c, d),
                    this.tileScaleOffset.x = f.width / c,
                    this.tileScaleOffset.y = f.height / d
                } else
                    this.tilingTexture && this.tilingTexture.isTiling && this.tilingTexture.destroy(!0),
                    this.tileScaleOffset.x = 1,
                    this.tileScaleOffset.y = 1,
                    this.tilingTexture = e;
                this.refreshTexture = !1,
                this.tilingTexture.baseTexture._powerOf2 = !0
            }
        }
        ;
        var f = {};
        f.BoneData = function(a, b) {
            this.name = a,
            this.parent = b
        }
        ,
        f.BoneData.prototype = {
            length: 0,
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1
        },
        f.SlotData = function(a, b) {
            this.name = a,
            this.boneData = b
        }
        ,
        f.SlotData.prototype = {
            r: 1,
            g: 1,
            b: 1,
            a: 1,
            attachmentName: null
        },
        f.Bone = function(a, b) {
            this.data = a,
            this.parent = b,
            this.setToSetupPose()
        }
        ,
        f.Bone.yDown = !1,
        f.Bone.prototype = {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            m00: 0,
            m01: 0,
            worldX: 0,
            m10: 0,
            m11: 0,
            worldY: 0,
            worldRotation: 0,
            worldScaleX: 1,
            worldScaleY: 1,
            updateWorldTransform: function(a, b) {
                var c = this.parent;
                null != c ? (this.worldX = this.x * c.m00 + this.y * c.m01 + c.worldX,
                this.worldY = this.x * c.m10 + this.y * c.m11 + c.worldY,
                this.worldScaleX = c.worldScaleX * this.scaleX,
                this.worldScaleY = c.worldScaleY * this.scaleY,
                this.worldRotation = c.worldRotation + this.rotation) : (this.worldX = this.x,
                this.worldY = this.y,
                this.worldScaleX = this.scaleX,
                this.worldScaleY = this.scaleY,
                this.worldRotation = this.rotation);
                var d = this.worldRotation * Math.PI / 180
                  , e = Math.cos(d)
                  , g = Math.sin(d);
                this.m00 = e * this.worldScaleX,
                this.m10 = g * this.worldScaleX,
                this.m01 = -g * this.worldScaleY,
                this.m11 = e * this.worldScaleY,
                a && (this.m00 = -this.m00,
                this.m01 = -this.m01),
                b && (this.m10 = -this.m10,
                this.m11 = -this.m11),
                f.Bone.yDown && (this.m10 = -this.m10,
                this.m11 = -this.m11)
            },
            setToSetupPose: function() {
                var a = this.data;
                this.x = a.x,
                this.y = a.y,
                this.rotation = a.rotation,
                this.scaleX = a.scaleX,
                this.scaleY = a.scaleY
            }
        },
        f.Slot = function(a, b, c) {
            this.data = a,
            this.skeleton = b,
            this.bone = c,
            this.setToSetupPose()
        }
        ,
        f.Slot.prototype = {
            r: 1,
            g: 1,
            b: 1,
            a: 1,
            _attachmentTime: 0,
            attachment: null,
            setAttachment: function(a) {
                this.attachment = a,
                this._attachmentTime = this.skeleton.time
            },
            setAttachmentTime: function(a) {
                this._attachmentTime = this.skeleton.time - a
            },
            getAttachmentTime: function() {
                return this.skeleton.time - this._attachmentTime
            },
            setToSetupPose: function() {
                var a = this.data;
                this.r = a.r,
                this.g = a.g,
                this.b = a.b,
                this.a = a.a;
                for (var b = this.skeleton.data.slots, c = 0, d = b.length; d > c; c++)
                    if (b[c] == a) {
                        this.setAttachment(a.attachmentName ? this.skeleton.getAttachmentBySlotIndex(c, a.attachmentName) : null);
                        break
                    }
            }
        },
        f.Skin = function(a) {
            this.name = a,
            this.attachments = {}
        }
        ,
        f.Skin.prototype = {
            addAttachment: function(a, b, c) {
                this.attachments[a + ":" + b] = c
            },
            getAttachment: function(a, b) {
                return this.attachments[a + ":" + b]
            },
            _attachAll: function(a, b) {
                for (var c in b.attachments) {
                    var d = c.indexOf(":")
                      , e = parseInt(c.substring(0, d), 10)
                      , f = c.substring(d + 1)
                      , g = a.slots[e];
                    if (g.attachment && g.attachment.name == f) {
                        var h = this.getAttachment(e, f);
                        h && g.setAttachment(h)
                    }
                }
            }
        },
        f.Animation = function(a, b, c) {
            this.name = a,
            this.timelines = b,
            this.duration = c
        }
        ,
        f.Animation.prototype = {
            apply: function(a, b, c) {
                c && this.duration && (b %= this.duration);
                for (var d = this.timelines, e = 0, f = d.length; f > e; e++)
                    d[e].apply(a, b, 1)
            },
            mix: function(a, b, c, d) {
                c && this.duration && (b %= this.duration);
                for (var e = this.timelines, f = 0, g = e.length; g > f; f++)
                    e[f].apply(a, b, d)
            }
        },
        f.binarySearch = function(a, b, c) {
            var d = 0
              , e = Math.floor(a.length / c) - 2;
            if (!e)
                return c;
            for (var f = e >>> 1; ; ) {
                if (a[(f + 1) * c] <= b ? d = f + 1 : e = f,
                d == e)
                    return (d + 1) * c;
                f = d + e >>> 1
            }
        }
        ,
        f.linearSearch = function(a, b, c) {
            for (var d = 0, e = a.length - c; e >= d; d += c)
                if (a[d] > b)
                    return d;
            return -1
        }
        ,
        f.Curves = function(a) {
            this.curves = [],
            this.curves.length = 6 * (a - 1)
        }
        ,
        f.Curves.prototype = {
            setLinear: function(a) {
                this.curves[6 * a] = 0
            },
            setStepped: function(a) {
                this.curves[6 * a] = -1
            },
            setCurve: function(a, b, c, d, e) {
                var f = .1
                  , g = f * f
                  , h = g * f
                  , i = 3 * f
                  , j = 3 * g
                  , k = 6 * g
                  , l = 6 * h
                  , m = 2 * -b + d
                  , n = 2 * -c + e
                  , o = 3 * (b - d) + 1
                  , p = 3 * (c - e) + 1
                  , q = 6 * a
                  , r = this.curves;
                r[q] = b * i + m * j + o * h,
                r[q + 1] = c * i + n * j + p * h,
                r[q + 2] = m * k + o * l,
                r[q + 3] = n * k + p * l,
                r[q + 4] = o * l,
                r[q + 5] = p * l
            },
            getCurvePercent: function(a, b) {
                b = 0 > b ? 0 : b > 1 ? 1 : b;
                var c = 6 * a
                  , d = this.curves
                  , e = d[c];
                if (!e)
                    return b;
                if (-1 == e)
                    return 0;
                for (var f = d[c + 1], g = d[c + 2], h = d[c + 3], i = d[c + 4], j = d[c + 5], k = e, l = f, m = 8; ; ) {
                    if (k >= b) {
                        var n = k - e
                          , o = l - f;
                        return o + (l - o) * (b - n) / (k - n)
                    }
                    if (!m)
                        break;
                    m--,
                    e += g,
                    f += h,
                    g += i,
                    h += j,
                    k += e,
                    l += f
                }
                return l + (1 - l) * (b - k) / (1 - k)
            }
        },
        f.RotateTimeline = function(a) {
            this.curves = new f.Curves(a),
            this.frames = [],
            this.frames.length = 2 * a
        }
        ,
        f.RotateTimeline.prototype = {
            boneIndex: 0,
            getFrameCount: function() {
                return this.frames.length / 2
            },
            setFrame: function(a, b, c) {
                a *= 2,
                this.frames[a] = b,
                this.frames[a + 1] = c
            },
            apply: function(a, b, c) {
                var d, e = this.frames;
                if (!(b < e[0])) {
                    var g = a.bones[this.boneIndex];
                    if (b >= e[e.length - 2]) {
                        for (d = g.data.rotation + e[e.length - 1] - g.rotation; d > 180; )
                            d -= 360;
                        for (; -180 > d; )
                            d += 360;
                        return g.rotation += d * c,
                        void 0
                    }
                    var h = f.binarySearch(e, b, 2)
                      , i = e[h - 1]
                      , j = e[h]
                      , k = 1 - (b - j) / (e[h - 2] - j);
                    for (k = this.curves.getCurvePercent(h / 2 - 1, k),
                    d = e[h + 1] - i; d > 180; )
                        d -= 360;
                    for (; -180 > d; )
                        d += 360;
                    for (d = g.data.rotation + (i + d * k) - g.rotation; d > 180; )
                        d -= 360;
                    for (; -180 > d; )
                        d += 360;
                    g.rotation += d * c
                }
            }
        },
        f.TranslateTimeline = function(a) {
            this.curves = new f.Curves(a),
            this.frames = [],
            this.frames.length = 3 * a
        }
        ,
        f.TranslateTimeline.prototype = {
            boneIndex: 0,
            getFrameCount: function() {
                return this.frames.length / 3
            },
            setFrame: function(a, b, c, d) {
                a *= 3,
                this.frames[a] = b,
                this.frames[a + 1] = c,
                this.frames[a + 2] = d
            },
            apply: function(a, b, c) {
                var d = this.frames;
                if (!(b < d[0])) {
                    var e = a.bones[this.boneIndex];
                    if (b >= d[d.length - 3])
                        return e.x += (e.data.x + d[d.length - 2] - e.x) * c,
                        e.y += (e.data.y + d[d.length - 1] - e.y) * c,
                        void 0;
                    var g = f.binarySearch(d, b, 3)
                      , h = d[g - 2]
                      , i = d[g - 1]
                      , j = d[g]
                      , k = 1 - (b - j) / (d[g + -3] - j);
                    k = this.curves.getCurvePercent(g / 3 - 1, k),
                    e.x += (e.data.x + h + (d[g + 1] - h) * k - e.x) * c,
                    e.y += (e.data.y + i + (d[g + 2] - i) * k - e.y) * c
                }
            }
        },
        f.ScaleTimeline = function(a) {
            this.curves = new f.Curves(a),
            this.frames = [],
            this.frames.length = 3 * a
        }
        ,
        f.ScaleTimeline.prototype = {
            boneIndex: 0,
            getFrameCount: function() {
                return this.frames.length / 3
            },
            setFrame: function(a, b, c, d) {
                a *= 3,
                this.frames[a] = b,
                this.frames[a + 1] = c,
                this.frames[a + 2] = d
            },
            apply: function(a, b, c) {
                var d = this.frames;
                if (!(b < d[0])) {
                    var e = a.bones[this.boneIndex];
                    if (b >= d[d.length - 3])
                        return e.scaleX += (e.data.scaleX - 1 + d[d.length - 2] - e.scaleX) * c,
                        e.scaleY += (e.data.scaleY - 1 + d[d.length - 1] - e.scaleY) * c,
                        void 0;
                    var g = f.binarySearch(d, b, 3)
                      , h = d[g - 2]
                      , i = d[g - 1]
                      , j = d[g]
                      , k = 1 - (b - j) / (d[g + -3] - j);
                    k = this.curves.getCurvePercent(g / 3 - 1, k),
                    e.scaleX += (e.data.scaleX - 1 + h + (d[g + 1] - h) * k - e.scaleX) * c,
                    e.scaleY += (e.data.scaleY - 1 + i + (d[g + 2] - i) * k - e.scaleY) * c
                }
            }
        },
        f.ColorTimeline = function(a) {
            this.curves = new f.Curves(a),
            this.frames = [],
            this.frames.length = 5 * a
        }
        ,
        f.ColorTimeline.prototype = {
            slotIndex: 0,
            getFrameCount: function() {
                return this.frames.length / 5
            },
            setFrame: function(a, b, c, d, e, f) {
                a *= 5,
                this.frames[a] = b,
                this.frames[a + 1] = c,
                this.frames[a + 2] = d,
                this.frames[a + 3] = e,
                this.frames[a + 4] = f
            },
            apply: function(a, b, c) {
                var d = this.frames;
                if (!(b < d[0])) {
                    var e = a.slots[this.slotIndex];
                    if (b >= d[d.length - 5]) {
                        var g = d.length - 1;
                        return e.r = d[g - 3],
                        e.g = d[g - 2],
                        e.b = d[g - 1],
                        e.a = d[g],
                        void 0
                    }
                    var h = f.binarySearch(d, b, 5)
                      , i = d[h - 4]
                      , j = d[h - 3]
                      , k = d[h - 2]
                      , l = d[h - 1]
                      , m = d[h]
                      , n = 1 - (b - m) / (d[h - 5] - m);
                    n = this.curves.getCurvePercent(h / 5 - 1, n);
                    var o = i + (d[h + 1] - i) * n
                      , p = j + (d[h + 2] - j) * n
                      , q = k + (d[h + 3] - k) * n
                      , r = l + (d[h + 4] - l) * n;
                    1 > c ? (e.r += (o - e.r) * c,
                    e.g += (p - e.g) * c,
                    e.b += (q - e.b) * c,
                    e.a += (r - e.a) * c) : (e.r = o,
                    e.g = p,
                    e.b = q,
                    e.a = r)
                }
            }
        },
        f.AttachmentTimeline = function(a) {
            this.curves = new f.Curves(a),
            this.frames = [],
            this.frames.length = a,
            this.attachmentNames = [],
            this.attachmentNames.length = a
        }
        ,
        f.AttachmentTimeline.prototype = {
            slotIndex: 0,
            getFrameCount: function() {
                return this.frames.length
            },
            setFrame: function(a, b, c) {
                this.frames[a] = b,
                this.attachmentNames[a] = c
            },
            apply: function(a, b) {
                var c = this.frames;
                if (!(b < c[0])) {
                    var d;
                    d = b >= c[c.length - 1] ? c.length - 1 : f.binarySearch(c, b, 1) - 1;
                    var e = this.attachmentNames[d];
                    a.slots[this.slotIndex].setAttachment(e ? a.getAttachmentBySlotIndex(this.slotIndex, e) : null)
                }
            }
        },
        f.SkeletonData = function() {
            this.bones = [],
            this.slots = [],
            this.skins = [],
            this.animations = []
        }
        ,
        f.SkeletonData.prototype = {
            defaultSkin: null,
            findBone: function(a) {
                for (var b = this.bones, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return b[c];
                return null
            },
            findBoneIndex: function(a) {
                for (var b = this.bones, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return c;
                return -1
            },
            findSlot: function(a) {
                for (var b = this.slots, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return slot[c];
                return null
            },
            findSlotIndex: function(a) {
                for (var b = this.slots, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return c;
                return -1
            },
            findSkin: function(a) {
                for (var b = this.skins, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return b[c];
                return null
            },
            findAnimation: function(a) {
                for (var b = this.animations, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return b[c];
                return null
            }
        },
        f.Skeleton = function(a) {
            this.data = a,
            this.bones = [];
            for (var b = 0, c = a.bones.length; c > b; b++) {
                var d = a.bones[b]
                  , e = d.parent ? this.bones[a.bones.indexOf(d.parent)] : null;
                this.bones.push(new f.Bone(d,e))
            }
            for (this.slots = [],
            this.drawOrder = [],
            b = 0,
            c = a.slots.length; c > b; b++) {
                var g = a.slots[b]
                  , h = this.bones[a.bones.indexOf(g.boneData)]
                  , i = new f.Slot(g,this,h);
                this.slots.push(i),
                this.drawOrder.push(i)
            }
        }
        ,
        f.Skeleton.prototype = {
            x: 0,
            y: 0,
            skin: null,
            r: 1,
            g: 1,
            b: 1,
            a: 1,
            time: 0,
            flipX: !1,
            flipY: !1,
            updateWorldTransform: function() {
                for (var a = this.flipX, b = this.flipY, c = this.bones, d = 0, e = c.length; e > d; d++)
                    c[d].updateWorldTransform(a, b)
            },
            setToSetupPose: function() {
                this.setBonesToSetupPose(),
                this.setSlotsToSetupPose()
            },
            setBonesToSetupPose: function() {
                for (var a = this.bones, b = 0, c = a.length; c > b; b++)
                    a[b].setToSetupPose()
            },
            setSlotsToSetupPose: function() {
                for (var a = this.slots, b = 0, c = a.length; c > b; b++)
                    a[b].setToSetupPose(b)
            },
            getRootBone: function() {
                return this.bones.length ? this.bones[0] : null
            },
            findBone: function(a) {
                for (var b = this.bones, c = 0, d = b.length; d > c; c++)
                    if (b[c].data.name == a)
                        return b[c];
                return null
            },
            findBoneIndex: function(a) {
                for (var b = this.bones, c = 0, d = b.length; d > c; c++)
                    if (b[c].data.name == a)
                        return c;
                return -1
            },
            findSlot: function(a) {
                for (var b = this.slots, c = 0, d = b.length; d > c; c++)
                    if (b[c].data.name == a)
                        return b[c];
                return null
            },
            findSlotIndex: function(a) {
                for (var b = this.slots, c = 0, d = b.length; d > c; c++)
                    if (b[c].data.name == a)
                        return c;
                return -1
            },
            setSkinByName: function(a) {
                var b = this.data.findSkin(a);
                if (!b)
                    throw "Skin not found: " + a;
                this.setSkin(b)
            },
            setSkin: function(a) {
                this.skin && a && a._attachAll(this, this.skin),
                this.skin = a
            },
            getAttachmentBySlotName: function(a, b) {
                return this.getAttachmentBySlotIndex(this.data.findSlotIndex(a), b)
            },
            getAttachmentBySlotIndex: function(a, b) {
                if (this.skin) {
                    var c = this.skin.getAttachment(a, b);
                    if (c)
                        return c
                }
                return this.data.defaultSkin ? this.data.defaultSkin.getAttachment(a, b) : null
            },
            setAttachment: function(a, b) {
                for (var c = this.slots, d = 0, e = c.size; e > d; d++) {
                    var f = c[d];
                    if (f.data.name == a) {
                        var g = null;
                        if (b && (g = this.getAttachment(d, b),
                        null == g))
                            throw "Attachment not found: " + b + ", for slot: " + a;
                        return f.setAttachment(g),
                        void 0
                    }
                }
                throw "Slot not found: " + a
            },
            update: function(a) {
                time += a
            }
        },
        f.AttachmentType = {
            region: 0
        },
        f.RegionAttachment = function() {
            this.offset = [],
            this.offset.length = 8,
            this.uvs = [],
            this.uvs.length = 8
        }
        ,
        f.RegionAttachment.prototype = {
            x: 0,
            y: 0,
            rotation: 0,
            scaleX: 1,
            scaleY: 1,
            width: 0,
            height: 0,
            rendererObject: null,
            regionOffsetX: 0,
            regionOffsetY: 0,
            regionWidth: 0,
            regionHeight: 0,
            regionOriginalWidth: 0,
            regionOriginalHeight: 0,
            setUVs: function(a, b, c, d, e) {
                var f = this.uvs;
                e ? (f[2] = a,
                f[3] = d,
                f[4] = a,
                f[5] = b,
                f[6] = c,
                f[7] = b,
                f[0] = c,
                f[1] = d) : (f[0] = a,
                f[1] = d,
                f[2] = a,
                f[3] = b,
                f[4] = c,
                f[5] = b,
                f[6] = c,
                f[7] = d)
            },
            updateOffset: function() {
                var a = this.width / this.regionOriginalWidth * this.scaleX
                  , b = this.height / this.regionOriginalHeight * this.scaleY
                  , c = -this.width / 2 * this.scaleX + this.regionOffsetX * a
                  , d = -this.height / 2 * this.scaleY + this.regionOffsetY * b
                  , e = c + this.regionWidth * a
                  , f = d + this.regionHeight * b
                  , g = this.rotation * Math.PI / 180
                  , h = Math.cos(g)
                  , i = Math.sin(g)
                  , j = c * h + this.x
                  , k = c * i
                  , l = d * h + this.y
                  , m = d * i
                  , n = e * h + this.x
                  , o = e * i
                  , p = f * h + this.y
                  , q = f * i
                  , r = this.offset;
                r[0] = j - m,
                r[1] = l + k,
                r[2] = j - q,
                r[3] = p + k,
                r[4] = n - q,
                r[5] = p + o,
                r[6] = n - m,
                r[7] = l + o
            },
            computeVertices: function(a, b, c, d) {
                a += c.worldX,
                b += c.worldY;
                var e = c.m00
                  , f = c.m01
                  , g = c.m10
                  , h = c.m11
                  , i = this.offset;
                d[0] = i[0] * e + i[1] * f + a,
                d[1] = i[0] * g + i[1] * h + b,
                d[2] = i[2] * e + i[3] * f + a,
                d[3] = i[2] * g + i[3] * h + b,
                d[4] = i[4] * e + i[5] * f + a,
                d[5] = i[4] * g + i[5] * h + b,
                d[6] = i[6] * e + i[7] * f + a,
                d[7] = i[6] * g + i[7] * h + b
            }
        },
        f.AnimationStateData = function(a) {
            this.skeletonData = a,
            this.animationToMixTime = {}
        }
        ,
        f.AnimationStateData.prototype = {
            defaultMix: 0,
            setMixByName: function(a, b, c) {
                var d = this.skeletonData.findAnimation(a);
                if (!d)
                    throw "Animation not found: " + a;
                var e = this.skeletonData.findAnimation(b);
                if (!e)
                    throw "Animation not found: " + b;
                this.setMix(d, e, c)
            },
            setMix: function(a, b, c) {
                this.animationToMixTime[a.name + ":" + b.name] = c
            },
            getMix: function(a, b) {
                var c = this.animationToMixTime[a.name + ":" + b.name];
                return c ? c : this.defaultMix
            }
        },
        f.AnimationState = function(a) {
            this.data = a,
            this.queue = []
        }
        ,
        f.AnimationState.prototype = {
            animationSpeed: 1,
            current: null,
            previous: null,
            currentTime: 0,
            previousTime: 0,
            currentLoop: !1,
            previousLoop: !1,
            mixTime: 0,
            mixDuration: 0,
            update: function(a) {
                if (this.currentTime += a * this.animationSpeed,
                this.previousTime += a,
                this.mixTime += a,
                this.queue.length > 0) {
                    var b = this.queue[0];
                    this.currentTime >= b.delay && (this._setAnimation(b.animation, b.loop),
                    this.queue.shift())
                }
            },
            apply: function(a) {
                if (this.current)
                    if (this.previous) {
                        this.previous.apply(a, this.previousTime, this.previousLoop);
                        var b = this.mixTime / this.mixDuration;
                        b >= 1 && (b = 1,
                        this.previous = null),
                        this.current.mix(a, this.currentTime, this.currentLoop, b)
                    } else
                        this.current.apply(a, this.currentTime, this.currentLoop)
            },
            clearAnimation: function() {
                this.previous = null,
                this.current = null,
                this.queue.length = 0
            },
            _setAnimation: function(a, b) {
                this.previous = null,
                a && this.current && (this.mixDuration = this.data.getMix(this.current, a),
                this.mixDuration > 0 && (this.mixTime = 0,
                this.previous = this.current,
                this.previousTime = this.currentTime,
                this.previousLoop = this.currentLoop)),
                this.current = a,
                this.currentLoop = b,
                this.currentTime = 0
            },
            setAnimationByName: function(a, b) {
                var c = this.data.skeletonData.findAnimation(a);
                if (!c)
                    throw "Animation not found: " + a;
                this.setAnimation(c, b)
            },
            setAnimation: function(a, b) {
                this.queue.length = 0,
                this._setAnimation(a, b)
            },
            addAnimationByName: function(a, b, c) {
                var d = this.data.skeletonData.findAnimation(a);
                if (!d)
                    throw "Animation not found: " + a;
                this.addAnimation(d, b, c)
            },
            addAnimation: function(a, b, c) {
                var d = {};
                if (d.animation = a,
                d.loop = b,
                !c || 0 >= c) {
                    var e = this.queue.length ? this.queue[this.queue.length - 1].animation : this.current;
                    c = null != e ? e.duration - this.data.getMix(e, a) + (c || 0) : 0
                }
                d.delay = c,
                this.queue.push(d)
            },
            isComplete: function() {
                return !this.current || this.currentTime >= this.current.duration
            }
        },
        f.SkeletonJson = function(a) {
            this.attachmentLoader = a
        }
        ,
        f.SkeletonJson.prototype = {
            scale: 1,
            readSkeletonData: function(a) {
                for (var b, c = new f.SkeletonData, d = a.bones, e = 0, g = d.length; g > e; e++) {
                    var h = d[e]
                      , i = null;
                    if (h.parent && (i = c.findBone(h.parent),
                    !i))
                        throw "Parent bone not found: " + h.parent;
                    b = new f.BoneData(h.name,i),
                    b.length = (h.length || 0) * this.scale,
                    b.x = (h.x || 0) * this.scale,
                    b.y = (h.y || 0) * this.scale,
                    b.rotation = h.rotation || 0,
                    b.scaleX = h.scaleX || 1,
                    b.scaleY = h.scaleY || 1,
                    c.bones.push(b)
                }
                var j = a.slots;
                for (e = 0,
                g = j.length; g > e; e++) {
                    var k = j[e];
                    if (b = c.findBone(k.bone),
                    !b)
                        throw "Slot bone not found: " + k.bone;
                    var l = new f.SlotData(k.name,b)
                      , m = k.color;
                    m && (l.r = f.SkeletonJson.toColor(m, 0),
                    l.g = f.SkeletonJson.toColor(m, 1),
                    l.b = f.SkeletonJson.toColor(m, 2),
                    l.a = f.SkeletonJson.toColor(m, 3)),
                    l.attachmentName = k.attachment,
                    c.slots.push(l)
                }
                var n = a.skins;
                for (var o in n)
                    if (n.hasOwnProperty(o)) {
                        var p = n[o]
                          , q = new f.Skin(o);
                        for (var r in p)
                            if (p.hasOwnProperty(r)) {
                                var s = c.findSlotIndex(r)
                                  , t = p[r];
                                for (var u in t)
                                    if (t.hasOwnProperty(u)) {
                                        var v = this.readAttachment(q, u, t[u]);
                                        null != v && q.addAttachment(s, u, v)
                                    }
                            }
                        c.skins.push(q),
                        "default" == q.name && (c.defaultSkin = q)
                    }
                var w = a.animations;
                for (var x in w)
                    w.hasOwnProperty(x) && this.readAnimation(x, w[x], c);
                return c
            },
            readAttachment: function(a, b, c) {
                b = c.name || b;
                var d = f.AttachmentType[c.type || "region"];
                if (d == f.AttachmentType.region) {
                    var e = new f.RegionAttachment;
                    return e.x = (c.x || 0) * this.scale,
                    e.y = (c.y || 0) * this.scale,
                    e.scaleX = c.scaleX || 1,
                    e.scaleY = c.scaleY || 1,
                    e.rotation = c.rotation || 0,
                    e.width = (c.width || 32) * this.scale,
                    e.height = (c.height || 32) * this.scale,
                    e.updateOffset(),
                    e.rendererObject = {},
                    e.rendererObject.name = b,
                    e.rendererObject.scale = {},
                    e.rendererObject.scale.x = e.scaleX,
                    e.rendererObject.scale.y = e.scaleY,
                    e.rendererObject.rotation = -e.rotation * Math.PI / 180,
                    e
                }
                throw "Unknown attachment type: " + d
            },
            readAnimation: function(a, b, c) {
                var d, e, g, h, i, j, k, l = [], m = 0, n = b.bones;
                for (var o in n)
                    if (n.hasOwnProperty(o)) {
                        var p = c.findBoneIndex(o);
                        if (-1 == p)
                            throw "Bone not found: " + o;
                        var q = n[o];
                        for (g in q)
                            if (q.hasOwnProperty(g))
                                if (i = q[g],
                                "rotate" == g) {
                                    for (e = new f.RotateTimeline(i.length),
                                    e.boneIndex = p,
                                    d = 0,
                                    j = 0,
                                    k = i.length; k > j; j++)
                                        h = i[j],
                                        e.setFrame(d, h.time, h.angle),
                                        f.SkeletonJson.readCurve(e, d, h),
                                        d++;
                                    l.push(e),
                                    m = Math.max(m, e.frames[2 * e.getFrameCount() - 2])
                                } else {
                                    if ("translate" != g && "scale" != g)
                                        throw "Invalid timeline type for a bone: " + g + " (" + o + ")";
                                    var r = 1;
                                    for ("scale" == g ? e = new f.ScaleTimeline(i.length) : (e = new f.TranslateTimeline(i.length),
                                    r = this.scale),
                                    e.boneIndex = p,
                                    d = 0,
                                    j = 0,
                                    k = i.length; k > j; j++) {
                                        h = i[j];
                                        var s = (h.x || 0) * r
                                          , t = (h.y || 0) * r;
                                        e.setFrame(d, h.time, s, t),
                                        f.SkeletonJson.readCurve(e, d, h),
                                        d++
                                    }
                                    l.push(e),
                                    m = Math.max(m, e.frames[3 * e.getFrameCount() - 3])
                                }
                    }
                var u = b.slots;
                for (var v in u)
                    if (u.hasOwnProperty(v)) {
                        var w = u[v]
                          , x = c.findSlotIndex(v);
                        for (g in w)
                            if (w.hasOwnProperty(g))
                                if (i = w[g],
                                "color" == g) {
                                    for (e = new f.ColorTimeline(i.length),
                                    e.slotIndex = x,
                                    d = 0,
                                    j = 0,
                                    k = i.length; k > j; j++) {
                                        h = i[j];
                                        var y = h.color
                                          , z = f.SkeletonJson.toColor(y, 0)
                                          , A = f.SkeletonJson.toColor(y, 1)
                                          , B = f.SkeletonJson.toColor(y, 2)
                                          , C = f.SkeletonJson.toColor(y, 3);
                                        e.setFrame(d, h.time, z, A, B, C),
                                        f.SkeletonJson.readCurve(e, d, h),
                                        d++
                                    }
                                    l.push(e),
                                    m = Math.max(m, e.frames[5 * e.getFrameCount() - 5])
                                } else {
                                    if ("attachment" != g)
                                        throw "Invalid timeline type for a slot: " + g + " (" + v + ")";
                                    for (e = new f.AttachmentTimeline(i.length),
                                    e.slotIndex = x,
                                    d = 0,
                                    j = 0,
                                    k = i.length; k > j; j++)
                                        h = i[j],
                                        e.setFrame(d++, h.time, h.name);
                                    l.push(e),
                                    m = Math.max(m, e.frames[e.getFrameCount() - 1])
                                }
                    }
                c.animations.push(new f.Animation(a,l,m))
            }
        },
        f.SkeletonJson.readCurve = function(a, b, c) {
            var d = c.curve;
            d && ("stepped" == d ? a.curves.setStepped(b) : d instanceof Array && a.curves.setCurve(b, d[0], d[1], d[2], d[3]))
        }
        ,
        f.SkeletonJson.toColor = function(a, b) {
            if (8 != a.length)
                throw "Color hexidecimal length must be 8, recieved: " + a;
            return parseInt(a.substr(2 * b, 2), 16) / 255
        }
        ,
        f.Atlas = function(a, b) {
            this.textureLoader = b,
            this.pages = [],
            this.regions = [];
            var c = new f.AtlasReader(a)
              , d = [];
            d.length = 4;
            for (var e = null; ; ) {
                var g = c.readLine();
                if (null == g)
                    break;
                if (g = c.trim(g),
                g.length)
                    if (e) {
                        var h = new f.AtlasRegion;
                        h.name = g,
                        h.page = e,
                        h.rotate = "true" == c.readValue(),
                        c.readTuple(d);
                        var i = parseInt(d[0], 10)
                          , j = parseInt(d[1], 10);
                        c.readTuple(d);
                        var k = parseInt(d[0], 10)
                          , l = parseInt(d[1], 10);
                        h.u = i / e.width,
                        h.v = j / e.height,
                        h.rotate ? (h.u2 = (i + l) / e.width,
                        h.v2 = (j + k) / e.height) : (h.u2 = (i + k) / e.width,
                        h.v2 = (j + l) / e.height),
                        h.x = i,
                        h.y = j,
                        h.width = Math.abs(k),
                        h.height = Math.abs(l),
                        4 == c.readTuple(d) && (h.splits = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)],
                        4 == c.readTuple(d) && (h.pads = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10), parseInt(d[3], 10)],
                        c.readTuple(d))),
                        h.originalWidth = parseInt(d[0], 10),
                        h.originalHeight = parseInt(d[1], 10),
                        c.readTuple(d),
                        h.offsetX = parseInt(d[0], 10),
                        h.offsetY = parseInt(d[1], 10),
                        h.index = parseInt(c.readValue(), 10),
                        this.regions.push(h)
                    } else {
                        e = new f.AtlasPage,
                        e.name = g,
                        e.format = f.Atlas.Format[c.readValue()],
                        c.readTuple(d),
                        e.minFilter = f.Atlas.TextureFilter[d[0]],
                        e.magFilter = f.Atlas.TextureFilter[d[1]];
                        var m = c.readValue();
                        e.uWrap = f.Atlas.TextureWrap.clampToEdge,
                        e.vWrap = f.Atlas.TextureWrap.clampToEdge,
                        "x" == m ? e.uWrap = f.Atlas.TextureWrap.repeat : "y" == m ? e.vWrap = f.Atlas.TextureWrap.repeat : "xy" == m && (e.uWrap = e.vWrap = f.Atlas.TextureWrap.repeat),
                        b.load(e, g),
                        this.pages.push(e)
                    }
                else
                    e = null
            }
        }
        ,
        f.Atlas.prototype = {
            findRegion: function(a) {
                for (var b = this.regions, c = 0, d = b.length; d > c; c++)
                    if (b[c].name == a)
                        return b[c];
                return null
            },
            dispose: function() {
                for (var a = this.pages, b = 0, c = a.length; c > b; b++)
                    this.textureLoader.unload(a[b].rendererObject)
            },
            updateUVs: function(a) {
                for (var b = this.regions, c = 0, d = b.length; d > c; c++) {
                    var e = b[c];
                    e.page == a && (e.u = e.x / a.width,
                    e.v = e.y / a.height,
                    e.rotate ? (e.u2 = (e.x + e.height) / a.width,
                    e.v2 = (e.y + e.width) / a.height) : (e.u2 = (e.x + e.width) / a.width,
                    e.v2 = (e.y + e.height) / a.height))
                }
            }
        },
        f.Atlas.Format = {
            alpha: 0,
            intensity: 1,
            luminanceAlpha: 2,
            rgb565: 3,
            rgba4444: 4,
            rgb888: 5,
            rgba8888: 6
        },
        f.Atlas.TextureFilter = {
            nearest: 0,
            linear: 1,
            mipMap: 2,
            mipMapNearestNearest: 3,
            mipMapLinearNearest: 4,
            mipMapNearestLinear: 5,
            mipMapLinearLinear: 6
        },
        f.Atlas.TextureWrap = {
            mirroredRepeat: 0,
            clampToEdge: 1,
            repeat: 2
        },
        f.AtlasPage = function() {}
        ,
        f.AtlasPage.prototype = {
            name: null,
            format: null,
            minFilter: null,
            magFilter: null,
            uWrap: null,
            vWrap: null,
            rendererObject: null,
            width: 0,
            height: 0
        },
        f.AtlasRegion = function() {}
        ,
        f.AtlasRegion.prototype = {
            page: null,
            name: null,
            x: 0,
            y: 0,
            width: 0,
            height: 0,
            u: 0,
            v: 0,
            u2: 0,
            v2: 0,
            offsetX: 0,
            offsetY: 0,
            originalWidth: 0,
            originalHeight: 0,
            index: 0,
            rotate: !1,
            splits: null,
            pads: null
        },
        f.AtlasReader = function(a) {
            this.lines = a.split(/\r\n|\r|\n/)
        }
        ,
        f.AtlasReader.prototype = {
            index: 0,
            trim: function(a) {
                return a.replace(/^\s+|\s+$/g, "")
            },
            readLine: function() {
                return this.index >= this.lines.length ? null : this.lines[this.index++]
            },
            readValue: function() {
                var a = this.readLine()
                  , b = a.indexOf(":");
                if (-1 == b)
                    throw "Invalid line: " + a;
                return this.trim(a.substring(b + 1))
            },
            readTuple: function(a) {
                var b = this.readLine()
                  , c = b.indexOf(":");
                if (-1 == c)
                    throw "Invalid line: " + b;
                for (var d = 0, e = c + 1; 3 > d; d++) {
                    var f = b.indexOf(",", e);
                    if (-1 == f) {
                        if (!d)
                            throw "Invalid line: " + b;
                        break
                    }
                    a[d] = this.trim(b.substr(e, f - e)),
                    e = f + 1
                }
                return a[d] = this.trim(b.substring(e)),
                d + 1
            }
        },
        f.AtlasAttachmentLoader = function(a) {
            this.atlas = a
        }
        ,
        f.AtlasAttachmentLoader.prototype = {
            newAttachment: function(a, b, c) {
                switch (b) {
                case f.AttachmentType.region:
                    var d = this.atlas.findRegion(c);
                    if (!d)
                        throw "Region not found in atlas: " + c + " (" + b + ")";
                    var e = new f.RegionAttachment(c);
                    return e.rendererObject = d,
                    e.setUVs(d.u, d.v, d.u2, d.v2, d.rotate),
                    e.regionOffsetX = d.offsetX,
                    e.regionOffsetY = d.offsetY,
                    e.regionWidth = d.width,
                    e.regionHeight = d.height,
                    e.regionOriginalWidth = d.originalWidth,
                    e.regionOriginalHeight = d.originalHeight,
                    e
                }
                throw "Unknown attachment type: " + b
            }
        },
        f.Bone.yDown = !0,
        b.AnimCache = {},
        b.Spine = function(a) {
            if (b.DisplayObjectContainer.call(this),
            this.spineData = b.AnimCache[a],
            !this.spineData)
                throw new Error("Spine data must be preloaded using PIXI.SpineLoader or PIXI.AssetLoader: " + a);
            this.skeleton = new f.Skeleton(this.spineData),
            this.skeleton.updateWorldTransform(),
            this.stateData = new f.AnimationStateData(this.spineData),
            this.state = new f.AnimationState(this.stateData),
            this.slotContainers = [];
            for (var c = 0, d = this.skeleton.drawOrder.length; d > c; c++) {
                var e = this.skeleton.drawOrder[c]
                  , g = e.attachment
                  , h = new b.DisplayObjectContainer;
                if (this.slotContainers.push(h),
                this.addChild(h),
                g instanceof f.RegionAttachment) {
                    var i = g.rendererObject.name
                      , j = this.createSprite(e, g.rendererObject);
                    e.currentSprite = j,
                    e.currentSpriteName = i,
                    h.addChild(j)
                }
            }
        }
        ,
        b.Spine.prototype = Object.create(b.DisplayObjectContainer.prototype),
        b.Spine.prototype.constructor = b.Spine,
        b.Spine.prototype.updateTransform = function() {
            this.lastTime = this.lastTime || Date.now();
            var a = .001 * (Date.now() - this.lastTime);
            this.lastTime = Date.now(),
            this.state.update(a),
            this.state.apply(this.skeleton),
            this.skeleton.updateWorldTransform();
            for (var c = this.skeleton.drawOrder, d = 0, e = c.length; e > d; d++) {
                var g = c[d]
                  , h = g.attachment
                  , i = this.slotContainers[d];
                if (h instanceof f.RegionAttachment) {
                    if (h.rendererObject && (!g.currentSpriteName || g.currentSpriteName != h.name)) {
                        var j = h.rendererObject.name;
                        if (void 0 !== g.currentSprite && (g.currentSprite.visible = !1),
                        g.sprites = g.sprites || {},
                        void 0 !== g.sprites[j])
                            g.sprites[j].visible = !0;
                        else {
                            var k = this.createSprite(g, h.rendererObject);
                            i.addChild(k)
                        }
                        g.currentSprite = g.sprites[j],
                        g.currentSpriteName = j
                    }
                    i.visible = !0;
                    var l = g.bone;
                    i.position.x = l.worldX + h.x * l.m00 + h.y * l.m01,
                    i.position.y = l.worldY + h.x * l.m10 + h.y * l.m11,
                    i.scale.x = l.worldScaleX,
                    i.scale.y = l.worldScaleY,
                    i.rotation = -(g.bone.worldRotation * Math.PI / 180),
                    i.alpha = g.a,
                    g.currentSprite.tint = b.rgb2hex([g.r, g.g, g.b])
                } else
                    i.visible = !1
            }
            b.DisplayObjectContainer.prototype.updateTransform.call(this)
        }
        ,
        b.Spine.prototype.createSprite = function(a, c) {
            var d = b.TextureCache[c.name] ? c.name : c.name + ".png"
              , e = new b.Sprite(b.Texture.fromFrame(d));
            return e.scale = c.scale,
            e.rotation = c.rotation,
            e.anchor.x = e.anchor.y = .5,
            a.sprites = a.sprites || {},
            a.sprites[c.name] = e,
            e
        }
        ,
        b.BaseTextureCache = {},
        b.texturesToUpdate = [],
        b.texturesToDestroy = [],
        b.BaseTextureCacheIdGenerator = 0,
        b.BaseTexture = function(a, c) {
            if (b.EventTarget.call(this),
            this.width = 100,
            this.height = 100,
            this.scaleMode = c || b.scaleModes.DEFAULT,
            this.hasLoaded = !1,
            this.source = a,
            this.id = b.BaseTextureCacheIdGenerator++,
            this.premultipliedAlpha = !0,
            this._glTextures = [],
            this._dirty = [],
            a) {
                if ((this.source.complete || this.source.getContext) && this.source.width && this.source.height)
                    this.hasLoaded = !0,
                    this.width = this.source.width,
                    this.height = this.source.height,
                    b.texturesToUpdate.push(this);
                else {
                    var d = this;
                    this.source.onload = function() {
                        d.hasLoaded = !0,
                        d.width = d.source.width,
                        d.height = d.source.height;
                        for (var a = 0; a < d._glTextures.length; a++)
                            d._dirty[a] = !0;
                        d.dispatchEvent({
                            type: "loaded",
                            content: d
                        })
                    }
                    ,
                    this.source.onerror = function() {
                        d.dispatchEvent({
                            type: "error",
                            content: d
                        })
                    }
                }
                this.imageUrl = null,
                this._powerOf2 = !1
            }
        }
        ,
        b.BaseTexture.prototype.constructor = b.BaseTexture,
        b.BaseTexture.prototype.destroy = function() {
            this.imageUrl ? (delete b.BaseTextureCache[this.imageUrl],
            delete b.TextureCache[this.imageUrl],
            this.imageUrl = null,
            this.source.src = null) : this.source && this.source._pixiId && delete b.BaseTextureCache[this.source._pixiId],
            this.source = null,
            b.texturesToDestroy.push(this)
        }
        ,
        b.BaseTexture.prototype.updateSourceImage = function(a) {
            this.hasLoaded = !1,
            this.source.src = null,
            this.source.src = a
        }
        ,
        b.BaseTexture.fromImage = function(a, c, d) {
            var e = b.BaseTextureCache[a];
            if (void 0 === c && -1 === a.indexOf("data:") && (c = !0),
            !e) {
                var f = new Image;
                c && (f.crossOrigin = ""),
                f.src = a,
                e = new b.BaseTexture(f,d),
                e.imageUrl = a,
                b.BaseTextureCache[a] = e
            }
            return e
        }
        ,
        b.BaseTexture.fromCanvas = function(a, c) {
            a._pixiId || (a._pixiId = "canvas_" + b.TextureCacheIdGenerator++);
            var d = b.BaseTextureCache[a._pixiId];
            return d || (d = new b.BaseTexture(a,c),
            b.BaseTextureCache[a._pixiId] = d),
            d
        }
        ,
        b.TextureCache = {},
        b.FrameCache = {},
        b.TextureCacheIdGenerator = 0,
        b.Texture = function(a, c) {
            if (b.EventTarget.call(this),
            this.noFrame = !1,
            c || (this.noFrame = !0,
            c = new b.Rectangle(0,0,1,1)),
            a instanceof b.Texture && (a = a.baseTexture),
            this.baseTexture = a,
            this.frame = c,
            this.trim = null,
            this.valid = !1,
            this.scope = this,
            this._uvs = null,
            this.width = 0,
            this.height = 0,
            this.crop = new b.Rectangle(0,0,1,1),
            a.hasLoaded)
                this.noFrame && (c = new b.Rectangle(0,0,a.width,a.height)),
                this.setFrame(c);
            else {
                var d = this;
                a.addEventListener("loaded", function() {
                    d.onBaseTextureLoaded()
                })
            }
        }
        ,
        b.Texture.prototype.constructor = b.Texture,
        b.Texture.prototype.onBaseTextureLoaded = function() {
            var a = this.baseTexture;
            a.removeEventListener("loaded", this.onLoaded),
            this.noFrame && (this.frame = new b.Rectangle(0,0,a.width,a.height)),
            this.setFrame(this.frame),
            this.scope.dispatchEvent({
                type: "update",
                content: this
            })
        }
        ,
        b.Texture.prototype.destroy = function(a) {
            a && this.baseTexture.destroy(),
            this.valid = !1
        }
        ,
        b.Texture.prototype.setFrame = function(a) {
            if (this.noFrame = !1,
            this.frame = a,
            this.width = a.width,
            this.height = a.height,
            this.crop.x = a.x,
            this.crop.y = a.y,
            this.crop.width = a.width,
            this.crop.height = a.height,
            !this.trim && (a.x + a.width > this.baseTexture.width || a.y + a.height > this.baseTexture.height))
                throw new Error("Texture Error: frame does not fit inside the base Texture dimensions " + this);
            this.valid = a && a.width && a.height && this.baseTexture.source && this.baseTexture.hasLoaded,
            this.trim && (this.width = this.trim.width,
            this.height = this.trim.height,
            this.frame.width = this.trim.width,
            this.frame.height = this.trim.height),
            this.valid && b.Texture.frameUpdates.push(this)
        }
        ,
        b.Texture.prototype._updateWebGLuvs = function() {
            this._uvs || (this._uvs = new b.TextureUvs);
            var a = this.crop
              , c = this.baseTexture.width
              , d = this.baseTexture.height;
            this._uvs.x0 = a.x / c,
            this._uvs.y0 = a.y / d,
            this._uvs.x1 = (a.x + a.width) / c,
            this._uvs.y1 = a.y / d,
            this._uvs.x2 = (a.x + a.width) / c,
            this._uvs.y2 = (a.y + a.height) / d,
            this._uvs.x3 = a.x / c,
            this._uvs.y3 = (a.y + a.height) / d
        }
        ,
        b.Texture.fromImage = function(a, c, d) {
            var e = b.TextureCache[a];
            return e || (e = new b.Texture(b.BaseTexture.fromImage(a, c, d)),
            b.TextureCache[a] = e),
            e
        }
        ,
        b.Texture.fromFrame = function(a) {
            var c = b.TextureCache[a];
            if (!c)
                throw new Error('The frameId "' + a + '" does not exist in the texture cache ');
            return c
        }
        ,
        b.Texture.fromCanvas = function(a, c) {
            var d = b.BaseTexture.fromCanvas(a, c);
            return new b.Texture(d)
        }
        ,
        b.Texture.addTextureToCache = function(a, c) {
            b.TextureCache[c] = a
        }
        ,
        b.Texture.removeTextureFromCache = function(a) {
            var c = b.TextureCache[a];
            return delete b.TextureCache[a],
            delete b.BaseTextureCache[a],
            c
        }
        ,
        b.Texture.frameUpdates = [],
        b.TextureUvs = function() {
            this.x0 = 0,
            this.y0 = 0,
            this.x1 = 0,
            this.y1 = 0,
            this.x2 = 0,
            this.y2 = 0,
            this.x3 = 0,
            this.y3 = 0
        }
        ,
        b.RenderTexture = function(a, c, d, e) {
            if (b.EventTarget.call(this),
            this.width = a || 100,
            this.height = c || 100,
            this.frame = new b.Rectangle(0,0,this.width,this.height),
            this.crop = new b.Rectangle(0,0,this.width,this.height),
            this.baseTexture = new b.BaseTexture,
            this.baseTexture.width = this.width,
            this.baseTexture.height = this.height,
            this.baseTexture._glTextures = [],
            this.baseTexture.scaleMode = e || b.scaleModes.DEFAULT,
            this.baseTexture.hasLoaded = !0,
            this.renderer = d || b.defaultRenderer,
            this.renderer.type === b.WEBGL_RENDERER) {
                var f = this.renderer.gl;
                this.textureBuffer = new b.FilterTexture(f,this.width,this.height,this.baseTexture.scaleMode),
                this.baseTexture._glTextures[f.id] = this.textureBuffer.texture,
                this.render = this.renderWebGL,
                this.projection = new b.Point(this.width / 2,-this.height / 2)
            } else
                this.render = this.renderCanvas,
                this.textureBuffer = new b.CanvasBuffer(this.width,this.height),
                this.baseTexture.source = this.textureBuffer.canvas;
            this.valid = !0,
            b.Texture.frameUpdates.push(this)
        }
        ,
        b.RenderTexture.prototype = Object.create(b.Texture.prototype),
        b.RenderTexture.prototype.constructor = b.RenderTexture,
        b.RenderTexture.prototype.resize = function(a, c, d) {
            (a !== this.width || c !== this.height) && (this.width = this.frame.width = this.crop.width = a,
            this.height = this.frame.height = this.crop.height = c,
            d && (this.baseTexture.width = this.width,
            this.baseTexture.height = this.height),
            this.renderer.type === b.WEBGL_RENDERER && (this.projection.x = this.width / 2,
            this.projection.y = -this.height / 2),
            this.textureBuffer.resize(this.width, this.height))
        }
        ,
        b.RenderTexture.prototype.clear = function() {
            this.renderer.type === b.WEBGL_RENDERER && this.renderer.gl.bindFramebuffer(this.renderer.gl.FRAMEBUFFER, this.textureBuffer.frameBuffer),
            this.textureBuffer.clear()
        }
        ,
        b.RenderTexture.prototype.renderWebGL = function(a, c, d) {
            var e = this.renderer.gl;
            e.colorMask(!0, !0, !0, !0),
            e.viewport(0, 0, this.width, this.height),
            e.bindFramebuffer(e.FRAMEBUFFER, this.textureBuffer.frameBuffer),
            d && this.textureBuffer.clear();
            var f = a.children
              , g = a.worldTransform;
            a.worldTransform = b.RenderTexture.tempMatrix,
            a.worldTransform.d = -1,
            a.worldTransform.ty = -2 * this.projection.y,
            c && (a.worldTransform.tx = c.x,
            a.worldTransform.ty -= c.y);
            for (var h = 0, i = f.length; i > h; h++)
                f[h].updateTransform();
            b.WebGLRenderer.updateTextures(),
            this.renderer.spriteBatch.dirty = !0,
            this.renderer.renderDisplayObject(a, this.projection, this.textureBuffer.frameBuffer),
            a.worldTransform = g,
            this.renderer.spriteBatch.dirty = !0
        }
        ,
        b.RenderTexture.prototype.renderCanvas = function(a, c, d) {
            var e = a.children
              , f = a.worldTransform;
            a.worldTransform = b.RenderTexture.tempMatrix,
            c ? (a.worldTransform.tx = c.x,
            a.worldTransform.ty = c.y) : (a.worldTransform.tx = 0,
            a.worldTransform.ty = 0);
            for (var g = 0, h = e.length; h > g; g++)
                e[g].updateTransform();
            d && this.textureBuffer.clear();
            var i = this.textureBuffer.context;
            this.renderer.renderDisplayObject(a, i),
            i.setTransform(1, 0, 0, 1, 0, 0),
            a.worldTransform = f
        }
        ,
        b.RenderTexture.tempMatrix = new b.Matrix,
        b.AssetLoader = function(a, c) {
            b.EventTarget.call(this),
            this.assetURLs = a,
            this.crossorigin = c,
            this.loadersByType = {
                jpg: b.ImageLoader,
                jpeg: b.ImageLoader,
                png: b.ImageLoader,
                gif: b.ImageLoader,
                webp: b.ImageLoader,
                json: b.JsonLoader,
                atlas: b.AtlasLoader,
                anim: b.SpineLoader,
                xml: b.BitmapFontLoader,
                fnt: b.BitmapFontLoader
            }
        }
        ,
        b.AssetLoader.prototype.constructor = b.AssetLoader,
        b.AssetLoader.prototype._getDataType = function(a) {
            var b = "data:"
              , c = a.slice(0, b.length).toLowerCase();
            if (c === b) {
                var d = a.slice(b.length)
                  , e = d.indexOf(",");
                if (-1 === e)
                    return null;
                var f = d.slice(0, e).split(";")[0];
                return f && "text/plain" !== f.toLowerCase() ? f.split("/").pop().toLowerCase() : "txt"
            }
            return null
        }
        ,
        b.AssetLoader.prototype.load = function() {
            function a(a) {
                b.onAssetLoaded(a.content)
            }
            var b = this;
            this.loadCount = this.assetURLs.length;
            for (var c = 0; c < this.assetURLs.length; c++) {
                var d = this.assetURLs[c]
                  , e = this._getDataType(d);
                e || (e = d.split("?").shift().split(".").pop().toLowerCase());
                var f = this.loadersByType[e];
                if (!f)
                    throw new Error(e + " is an unsupported file type");
                var g = new f(d,this.crossorigin);
                g.addEventListener("loaded", a),
                g.load()
            }
        }
        ,
        b.AssetLoader.prototype.onAssetLoaded = function(a) {
            this.loadCount--,
            this.dispatchEvent({
                type: "onProgress",
                content: this,
                loader: a
            }),
            this.onProgress && this.onProgress(a),
            this.loadCount || (this.dispatchEvent({
                type: "onComplete",
                content: this
            }),
            this.onComplete && this.onComplete())
        }
        ,
        b.JsonLoader = function(a, c) {
            b.EventTarget.call(this),
            this.url = a,
            this.crossorigin = c,
            this.baseUrl = a.replace(/[^\/]*$/, ""),
            this.loaded = !1
        }
        ,
        b.JsonLoader.prototype.constructor = b.JsonLoader,
        b.JsonLoader.prototype.load = function() {
            var a = this;
            window.XDomainRequest && a.crossorigin ? (this.ajaxRequest = new window.XDomainRequest,
            this.ajaxRequest.timeout = 3e3,
            this.ajaxRequest.onerror = function() {
                a.onError()
            }
            ,
            this.ajaxRequest.ontimeout = function() {
                a.onError()
            }
            ,
            this.ajaxRequest.onprogress = function() {}
            ) : this.ajaxRequest = window.XMLHttpRequest ? new window.XMLHttpRequest : new window.ActiveXObject("Microsoft.XMLHTTP"),
            this.ajaxRequest.onload = function() {
                a.onJSONLoaded()
            }
            ,
            this.ajaxRequest.open("GET", this.url, !0),
            this.ajaxRequest.send()
        }
        ,
        b.JsonLoader.prototype.onJSONLoaded = function() {
            if (!this.ajaxRequest.responseText)
                return this.onError(),
                void 0;
            if (this.json = JSON.parse(this.ajaxRequest.responseText),
            this.json.frames) {
                var a = this
                  , c = this.baseUrl + this.json.meta.image
                  , d = new b.ImageLoader(c,this.crossorigin)
                  , e = this.json.frames;
                this.texture = d.texture.baseTexture,
                d.addEventListener("loaded", function() {
                    a.onLoaded()
                });
                for (var g in e) {
                    var h = e[g].frame;
                    if (h && (b.TextureCache[g] = new b.Texture(this.texture,{
                        x: h.x,
                        y: h.y,
                        width: h.w,
                        height: h.h
                    }),
                    b.TextureCache[g].crop = new b.Rectangle(h.x,h.y,h.w,h.h),
                    e[g].trimmed)) {
                        var i = e[g].sourceSize
                          , j = e[g].spriteSourceSize;
                        b.TextureCache[g].trim = new b.Rectangle(j.x,j.y,i.w,i.h)
                    }
                }
                d.load()
            } else if (this.json.bones) {
                var k = new f.SkeletonJson
                  , l = k.readSkeletonData(this.json);
                b.AnimCache[this.url] = l,
                this.onLoaded()
            } else
                this.onLoaded()
        }
        ,
        b.JsonLoader.prototype.onLoaded = function() {
            this.loaded = !0,
            this.dispatchEvent({
                type: "loaded",
                content: this
            })
        }
        ,
        b.JsonLoader.prototype.onError = function() {
            this.dispatchEvent({
                type: "error",
                content: this
            })
        }
        ,
        b.AtlasLoader = function(a, c) {
            b.EventTarget.call(this),
            this.url = a,
            this.baseUrl = a.replace(/[^\/]*$/, ""),
            this.crossorigin = c,
            this.loaded = !1
        }
        ,
        b.AtlasLoader.constructor = b.AtlasLoader,
        b.AtlasLoader.prototype.load = function() {
            this.ajaxRequest = new b.AjaxRequest,
            this.ajaxRequest.onreadystatechange = this.onAtlasLoaded.bind(this),
            this.ajaxRequest.open("GET", this.url, !0),
            this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/json"),
            this.ajaxRequest.send(null)
        }
        ,
        b.AtlasLoader.prototype.onAtlasLoaded = function() {
            if (4 === this.ajaxRequest.readyState)
                if (200 === this.ajaxRequest.status || -1 === window.location.href.indexOf("http")) {
                    this.atlas = {
                        meta: {
                            image: []
                        },
                        frames: []
                    };
                    var a = this.ajaxRequest.responseText.split(/\r?\n/)
                      , c = -3
                      , d = 0
                      , e = null
                      , f = !1
                      , g = 0
                      , h = 0
                      , i = this.onLoaded.bind(this);
                    for (g = 0; g < a.length; g++)
                        if (a[g] = a[g].replace(/^\s+|\s+$/g, ""),
                        "" === a[g] && (f = g + 1),
                        a[g].length > 0) {
                            if (f === g)
                                this.atlas.meta.image.push(a[g]),
                                d = this.atlas.meta.image.length - 1,
                                this.atlas.frames.push({}),
                                c = -3;
                            else if (c > 0)
                                if (c % 7 === 1)
                                    null != e && (this.atlas.frames[d][e.name] = e),
                                    e = {
                                        name: a[g],
                                        frame: {}
                                    };
                                else {
                                    var j = a[g].split(" ");
                                    if (c % 7 === 3)
                                        e.frame.x = Number(j[1].replace(",", "")),
                                        e.frame.y = Number(j[2]);
                                    else if (c % 7 === 4)
                                        e.frame.w = Number(j[1].replace(",", "")),
                                        e.frame.h = Number(j[2]);
                                    else if (c % 7 === 5) {
                                        var k = {
                                            x: 0,
                                            y: 0,
                                            w: Number(j[1].replace(",", "")),
                                            h: Number(j[2])
                                        };
                                        k.w > e.frame.w || k.h > e.frame.h ? (e.trimmed = !0,
                                        e.realSize = k) : e.trimmed = !1
                                    }
                                }
                            c++
                        }
                    if (null != e && (this.atlas.frames[d][e.name] = e),
                    this.atlas.meta.image.length > 0) {
                        for (this.images = [],
                        h = 0; h < this.atlas.meta.image.length; h++) {
                            var l = this.baseUrl + this.atlas.meta.image[h]
                              , m = this.atlas.frames[h];
                            this.images.push(new b.ImageLoader(l,this.crossorigin));
                            for (g in m) {
                                var n = m[g].frame;
                                n && (b.TextureCache[g] = new b.Texture(this.images[h].texture.baseTexture,{
                                    x: n.x,
                                    y: n.y,
                                    width: n.w,
                                    height: n.h
                                }),
                                m[g].trimmed && (b.TextureCache[g].realSize = m[g].realSize,
                                b.TextureCache[g].trim.x = 0,
                                b.TextureCache[g].trim.y = 0))
                            }
                        }
                        for (this.currentImageId = 0,
                        h = 0; h < this.images.length; h++)
                            this.images[h].addEventListener("loaded", i);
                        this.images[this.currentImageId].load()
                    } else
                        this.onLoaded()
                } else
                    this.onError()
        }
        ,
        b.AtlasLoader.prototype.onLoaded = function() {
            this.images.length - 1 > this.currentImageId ? (this.currentImageId++,
            this.images[this.currentImageId].load()) : (this.loaded = !0,
            this.dispatchEvent({
                type: "loaded",
                content: this
            }))
        }
        ,
        b.AtlasLoader.prototype.onError = function() {
            this.dispatchEvent({
                type: "error",
                content: this
            })
        }
        ,
        b.SpriteSheetLoader = function(a, c) {
            b.EventTarget.call(this),
            this.url = a,
            this.crossorigin = c,
            this.baseUrl = a.replace(/[^\/]*$/, ""),
            this.texture = null,
            this.frames = {}
        }
        ,
        b.SpriteSheetLoader.prototype.constructor = b.SpriteSheetLoader,
        b.SpriteSheetLoader.prototype.load = function() {
            var a = this
              , c = new b.JsonLoader(this.url,this.crossorigin);
            c.addEventListener("loaded", function(b) {
                a.json = b.content.json,
                a.onLoaded()
            }),
            c.load()
        }
        ,
        b.SpriteSheetLoader.prototype.onLoaded = function() {
            this.dispatchEvent({
                type: "loaded",
                content: this
            })
        }
        ,
        b.ImageLoader = function(a, c) {
            b.EventTarget.call(this),
            this.texture = b.Texture.fromImage(a, c),
            this.frames = []
        }
        ,
        b.ImageLoader.prototype.constructor = b.ImageLoader,
        b.ImageLoader.prototype.load = function() {
            if (this.texture.baseTexture.hasLoaded)
                this.onLoaded();
            else {
                var a = this;
                this.texture.baseTexture.addEventListener("loaded", function() {
                    a.onLoaded()
                })
            }
        }
        ,
        b.ImageLoader.prototype.onLoaded = function() {
            this.dispatchEvent({
                type: "loaded",
                content: this
            })
        }
        ,
        b.ImageLoader.prototype.loadFramedSpriteSheet = function(a, c, d) {
            this.frames = [];
            for (var e = Math.floor(this.texture.width / a), f = Math.floor(this.texture.height / c), g = 0, h = 0; f > h; h++)
                for (var i = 0; e > i; i++,
                g++) {
                    var j = new b.Texture(this.texture,{
                        x: i * a,
                        y: h * c,
                        width: a,
                        height: c
                    });
                    this.frames.push(j),
                    d && (b.TextureCache[d + "-" + g] = j)
                }
            if (this.texture.baseTexture.hasLoaded)
                this.onLoaded();
            else {
                var k = this;
                this.texture.baseTexture.addEventListener("loaded", function() {
                    k.onLoaded()
                })
            }
        }
        ,
        b.BitmapFontLoader = function(a, c) {
            b.EventTarget.call(this),
            this.url = a,
            this.crossorigin = c,
            this.baseUrl = a.replace(/[^\/]*$/, ""),
            this.texture = null
        }
        ,
        b.BitmapFontLoader.prototype.constructor = b.BitmapFontLoader,
        b.BitmapFontLoader.prototype.load = function() {
            this.ajaxRequest = new b.AjaxRequest;
            var a = this;
            this.ajaxRequest.onreadystatechange = function() {
                a.onXMLLoaded()
            }
            ,
            this.ajaxRequest.open("GET", this.url, !0),
            this.ajaxRequest.overrideMimeType && this.ajaxRequest.overrideMimeType("application/xml"),
            this.ajaxRequest.send(null)
        }
        ,
        b.BitmapFontLoader.prototype.onXMLLoaded = function() {
            if (4 === this.ajaxRequest.readyState && (200 === this.ajaxRequest.status || -1 === window.location.protocol.indexOf("http"))) {
                var a = this.ajaxRequest.responseXML;
                if (!a || /MSIE 9/i.test(navigator.userAgent) || navigator.isCocoonJS)
                    if ("function" == typeof window.DOMParser) {
                        var c = new DOMParser;
                        a = c.parseFromString(this.ajaxRequest.responseText, "text/xml")
                    } else {
                        var d = document.createElement("div");
                        d.innerHTML = this.ajaxRequest.responseText,
                        a = d
                    }
                var e = this.baseUrl + a.getElementsByTagName("page")[0].getAttribute("file")
                  , f = new b.ImageLoader(e,this.crossorigin);
                this.texture = f.texture.baseTexture;
                var g = {}
                  , h = a.getElementsByTagName("info")[0]
                  , i = a.getElementsByTagName("common")[0];
                g.font = h.getAttribute("face"),
                g.size = parseInt(h.getAttribute("size"), 10),
                g.lineHeight = parseInt(i.getAttribute("lineHeight"), 10),
                g.chars = {};
                for (var j = a.getElementsByTagName("char"), k = 0; k < j.length; k++) {
                    var l = parseInt(j[k].getAttribute("id"), 10)
                      , m = new b.Rectangle(parseInt(j[k].getAttribute("x"), 10),parseInt(j[k].getAttribute("y"), 10),parseInt(j[k].getAttribute("width"), 10),parseInt(j[k].getAttribute("height"), 10));
                    g.chars[l] = {
                        xOffset: parseInt(j[k].getAttribute("xoffset"), 10),
                        yOffset: parseInt(j[k].getAttribute("yoffset"), 10),
                        xAdvance: parseInt(j[k].getAttribute("xadvance"), 10),
                        kerning: {},
                        texture: b.TextureCache[l] = new b.Texture(this.texture,m)
                    }
                }
                var n = a.getElementsByTagName("kerning");
                for (k = 0; k < n.length; k++) {
                    var o = parseInt(n[k].getAttribute("first"), 10)
                      , p = parseInt(n[k].getAttribute("second"), 10)
                      , q = parseInt(n[k].getAttribute("amount"), 10);
                    g.chars[p].kerning[o] = q
                }
                b.BitmapText.fonts[g.font] = g;
                var r = this;
                f.addEventListener("loaded", function() {
                    r.onLoaded()
                }),
                f.load()
            }
        }
        ,
        b.BitmapFontLoader.prototype.onLoaded = function() {
            this.dispatchEvent({
                type: "loaded",
                content: this
            })
        }
        ,
        b.SpineLoader = function(a, c) {
            b.EventTarget.call(this),
            this.url = a,
            this.crossorigin = c,
            this.loaded = !1
        }
        ,
        b.SpineLoader.prototype.constructor = b.SpineLoader,
        b.SpineLoader.prototype.load = function() {
            var a = this
              , c = new b.JsonLoader(this.url,this.crossorigin);
            c.addEventListener("loaded", function(b) {
                a.json = b.content.json,
                a.onLoaded()
            }),
            c.load()
        }
        ,
        b.SpineLoader.prototype.onLoaded = function() {
            this.loaded = !0,
            this.dispatchEvent({
                type: "loaded",
                content: this
            })
        }
        ,
        b.AbstractFilter = function(a, b) {
            this.passes = [this],
            this.shaders = [],
            this.dirty = !0,
            this.padding = 0,
            this.uniforms = b || {},
            this.fragmentSrc = a || []
        }
        ,
        b.AlphaMaskFilter = function(a) {
            b.AbstractFilter.call(this),
            this.passes = [this],
            a.baseTexture._powerOf2 = !0,
            this.uniforms = {
                mask: {
                    type: "sampler2D",
                    value: a
                },
                mapDimensions: {
                    type: "2f",
                    value: {
                        x: 1,
                        y: 5112
                    }
                },
                dimensions: {
                    type: "4fv",
                    value: [0, 0, 0, 0]
                }
            },
            a.baseTexture.hasLoaded ? (this.uniforms.mask.value.x = a.width,
            this.uniforms.mask.value.y = a.height) : (this.boundLoadedFunction = this.onTextureLoaded.bind(this),
            a.baseTexture.on("loaded", this.boundLoadedFunction)),
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D mask;", "uniform sampler2D uSampler;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   mapCords *= dimensions.xy / mapDimensions;", "   vec4 original =  texture2D(uSampler, vTextureCoord);", "   float maskAlpha =  texture2D(mask, mapCords).r;", "   original *= maskAlpha;", "   gl_FragColor =  original;", "}"]
        }
        ,
        b.AlphaMaskFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.AlphaMaskFilter.prototype.constructor = b.AlphaMaskFilter,
        b.AlphaMaskFilter.prototype.onTextureLoaded = function() {
            this.uniforms.mapDimensions.value.x = this.uniforms.mask.value.width,
            this.uniforms.mapDimensions.value.y = this.uniforms.mask.value.height,
            this.uniforms.mask.value.baseTexture.off("loaded", this.boundLoadedFunction)
        }
        ,
        Object.defineProperty(b.AlphaMaskFilter.prototype, "map", {
            get: function() {
                return this.uniforms.mask.value
            },
            set: function(a) {
                this.uniforms.mask.value = a
            }
        }),
        b.ColorMatrixFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                matrix: {
                    type: "mat4",
                    value: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform mat4 matrix;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord) * matrix;", "}"]
        }
        ,
        b.ColorMatrixFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.ColorMatrixFilter.prototype.constructor = b.ColorMatrixFilter,
        Object.defineProperty(b.ColorMatrixFilter.prototype, "matrix", {
            get: function() {
                return this.uniforms.matrix.value
            },
            set: function(a) {
                this.uniforms.matrix.value = a
            }
        }),
        b.GrayFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                gray: {
                    type: "1f",
                    value: 1
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float gray;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.2126*gl_FragColor.r + 0.7152*gl_FragColor.g + 0.0722*gl_FragColor.b), gray);", "}"]
        }
        ,
        b.GrayFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.GrayFilter.prototype.constructor = b.GrayFilter,
        Object.defineProperty(b.GrayFilter.prototype, "gray", {
            get: function() {
                return this.uniforms.gray.value
            },
            set: function(a) {
                this.uniforms.gray.value = a
            }
        }),
        b.DisplacementFilter = function(a) {
            b.AbstractFilter.call(this),
            this.passes = [this],
            a.baseTexture._powerOf2 = !0,
            this.uniforms = {
                displacementMap: {
                    type: "sampler2D",
                    value: a
                },
                scale: {
                    type: "2f",
                    value: {
                        x: 30,
                        y: 30
                    }
                },
                offset: {
                    type: "2f",
                    value: {
                        x: 0,
                        y: 0
                    }
                },
                mapDimensions: {
                    type: "2f",
                    value: {
                        x: 1,
                        y: 5112
                    }
                },
                dimensions: {
                    type: "4fv",
                    value: [0, 0, 0, 0]
                }
            },
            a.baseTexture.hasLoaded ? (this.uniforms.mapDimensions.value.x = a.width,
            this.uniforms.mapDimensions.value.y = a.height) : (this.boundLoadedFunction = this.onTextureLoaded.bind(this),
            a.baseTexture.on("loaded", this.boundLoadedFunction)),
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D displacementMap;", "uniform sampler2D uSampler;", "uniform vec2 scale;", "uniform vec2 offset;", "uniform vec4 dimensions;", "uniform vec2 mapDimensions;", "void main(void) {", "   vec2 mapCords = vTextureCoord.xy;", "   mapCords += (dimensions.zw + offset)/ dimensions.xy ;", "   mapCords.y *= -1.0;", "   mapCords.y += 1.0;", "   vec2 matSample = texture2D(displacementMap, mapCords).xy;", "   matSample -= 0.5;", "   matSample *= scale;", "   matSample /= mapDimensions;", "   gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.x + matSample.x, vTextureCoord.y + matSample.y));", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb, 1.0);", "   vec2 cord = vTextureCoord;", "}"]
        }
        ,
        b.DisplacementFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.DisplacementFilter.prototype.constructor = b.DisplacementFilter,
        b.DisplacementFilter.prototype.onTextureLoaded = function() {
            this.uniforms.mapDimensions.value.x = this.uniforms.displacementMap.value.width,
            this.uniforms.mapDimensions.value.y = this.uniforms.displacementMap.value.height,
            this.uniforms.displacementMap.value.baseTexture.off("loaded", this.boundLoadedFunction)
        }
        ,
        Object.defineProperty(b.DisplacementFilter.prototype, "map", {
            get: function() {
                return this.uniforms.displacementMap.value
            },
            set: function(a) {
                this.uniforms.displacementMap.value = a
            }
        }),
        Object.defineProperty(b.DisplacementFilter.prototype, "scale", {
            get: function() {
                return this.uniforms.scale.value
            },
            set: function(a) {
                this.uniforms.scale.value = a
            }
        }),
        Object.defineProperty(b.DisplacementFilter.prototype, "offset", {
            get: function() {
                return this.uniforms.offset.value
            },
            set: function(a) {
                this.uniforms.offset.value = a
            }
        }),
        b.PixelateFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                invert: {
                    type: "1f",
                    value: 0
                },
                dimensions: {
                    type: "4fv",
                    value: new Float32Array([1e4, 100, 10, 10])
                },
                pixelSize: {
                    type: "2f",
                    value: {
                        x: 10,
                        y: 10
                    }
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 testDim;", "uniform vec4 dimensions;", "uniform vec2 pixelSize;", "uniform sampler2D uSampler;", "void main(void) {", "   vec2 coord = vTextureCoord;", "   vec2 size = dimensions.xy/pixelSize;", "   vec2 color = floor( ( vTextureCoord * size ) ) / size + pixelSize/dimensions.xy * 0.5;", "   gl_FragColor = texture2D(uSampler, color);", "}"]
        }
        ,
        b.PixelateFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.PixelateFilter.prototype.constructor = b.PixelateFilter,
        Object.defineProperty(b.PixelateFilter.prototype, "size", {
            get: function() {
                return this.uniforms.pixelSize.value
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.pixelSize.value = a
            }
        }),
        b.BlurXFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                blur: {
                    type: "1f",
                    value: 1 / 512
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 4.0*blur, vTextureCoord.y)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x - blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + blur, vTextureCoord.y)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 2.0*blur, vTextureCoord.y)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 3.0*blur, vTextureCoord.y)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x + 4.0*blur, vTextureCoord.y)) * 0.05;", "   gl_FragColor = sum;", "}"]
        }
        ,
        b.BlurXFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.BlurXFilter.prototype.constructor = b.BlurXFilter,
        Object.defineProperty(b.BlurXFilter.prototype, "blur", {
            get: function() {
                return this.uniforms.blur.value / (1 / 7e3)
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.blur.value = 1 / 7e3 * a
            }
        }),
        b.BlurYFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                blur: {
                    type: "1f",
                    value: 1 / 512
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "   vec4 sum = vec4(0.0);", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 4.0*blur)) * 0.05;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y)) * 0.16;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + blur)) * 0.15;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 2.0*blur)) * 0.12;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 3.0*blur)) * 0.09;", "   sum += texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + 4.0*blur)) * 0.05;", "   gl_FragColor = sum;", "}"]
        }
        ,
        b.BlurYFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.BlurYFilter.prototype.constructor = b.BlurYFilter,
        Object.defineProperty(b.BlurYFilter.prototype, "blur", {
            get: function() {
                return this.uniforms.blur.value / (1 / 7e3)
            },
            set: function(a) {
                this.uniforms.blur.value = 1 / 7e3 * a
            }
        }),
        b.BlurFilter = function() {
            this.blurXFilter = new b.BlurXFilter,
            this.blurYFilter = new b.BlurYFilter,
            this.passes = [this.blurXFilter, this.blurYFilter]
        }
        ,
        Object.defineProperty(b.BlurFilter.prototype, "blur", {
            get: function() {
                return this.blurXFilter.blur
            },
            set: function(a) {
                this.blurXFilter.blur = this.blurYFilter.blur = a
            }
        }),
        Object.defineProperty(b.BlurFilter.prototype, "blurX", {
            get: function() {
                return this.blurXFilter.blur
            },
            set: function(a) {
                this.blurXFilter.blur = a
            }
        }),
        Object.defineProperty(b.BlurFilter.prototype, "blurY", {
            get: function() {
                return this.blurYFilter.blur
            },
            set: function(a) {
                this.blurYFilter.blur = a
            }
        }),
        b.InvertFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                invert: {
                    type: "1f",
                    value: 1
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float invert;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( (vec3(1)-gl_FragColor.rgb) * gl_FragColor.a, gl_FragColor.rgb, 1.0 - invert);", "}"]
        }
        ,
        b.InvertFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.InvertFilter.prototype.constructor = b.InvertFilter,
        Object.defineProperty(b.InvertFilter.prototype, "invert", {
            get: function() {
                return this.uniforms.invert.value
            },
            set: function(a) {
                this.uniforms.invert.value = a
            }
        }),
        b.SepiaFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                sepia: {
                    type: "1f",
                    value: 1
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float sepia;", "uniform sampler2D uSampler;", "const mat3 sepiaMatrix = mat3(0.3588, 0.7044, 0.1368, 0.2990, 0.5870, 0.1140, 0.2392, 0.4696, 0.0912);", "void main(void) {", "   gl_FragColor = texture2D(uSampler, vTextureCoord);", "   gl_FragColor.rgb = mix( gl_FragColor.rgb, gl_FragColor.rgb * sepiaMatrix, sepia);", "}"]
        }
        ,
        b.SepiaFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.SepiaFilter.prototype.constructor = b.SepiaFilter,
        Object.defineProperty(b.SepiaFilter.prototype, "sepia", {
            get: function() {
                return this.uniforms.sepia.value
            },
            set: function(a) {
                this.uniforms.sepia.value = a
            }
        }),
        b.TwistFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                radius: {
                    type: "1f",
                    value: .5
                },
                angle: {
                    type: "1f",
                    value: 5
                },
                offset: {
                    type: "2f",
                    value: {
                        x: .5,
                        y: .5
                    }
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float radius;", "uniform float angle;", "uniform vec2 offset;", "void main(void) {", "   vec2 coord = vTextureCoord - offset;", "   float distance = length(coord);", "   if (distance < radius) {", "       float ratio = (radius - distance) / radius;", "       float angleMod = ratio * ratio * angle;", "       float s = sin(angleMod);", "       float c = cos(angleMod);", "       coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);", "   }", "   gl_FragColor = texture2D(uSampler, coord+offset);", "}"]
        }
        ,
        b.TwistFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.TwistFilter.prototype.constructor = b.TwistFilter,
        Object.defineProperty(b.TwistFilter.prototype, "offset", {
            get: function() {
                return this.uniforms.offset.value
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.offset.value = a
            }
        }),
        Object.defineProperty(b.TwistFilter.prototype, "radius", {
            get: function() {
                return this.uniforms.radius.value
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.radius.value = a
            }
        }),
        Object.defineProperty(b.TwistFilter.prototype, "angle", {
            get: function() {
                return this.uniforms.angle.value
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.angle.value = a
            }
        }),
        b.ColorStepFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                step: {
                    type: "1f",
                    value: 5
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform sampler2D uSampler;", "uniform float step;", "void main(void) {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   color = floor(color * step) / step;", "   gl_FragColor = color;", "}"]
        }
        ,
        b.ColorStepFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.ColorStepFilter.prototype.constructor = b.ColorStepFilter,
        Object.defineProperty(b.ColorStepFilter.prototype, "step", {
            get: function() {
                return this.uniforms.step.value
            },
            set: function(a) {
                this.uniforms.step.value = a
            }
        }),
        b.DotScreenFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                scale: {
                    type: "1f",
                    value: 1
                },
                angle: {
                    type: "1f",
                    value: 5
                },
                dimensions: {
                    type: "4fv",
                    value: [0, 0, 0, 0]
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "uniform float angle;", "uniform float scale;", "float pattern() {", "   float s = sin(angle), c = cos(angle);", "   vec2 tex = vTextureCoord * dimensions.xy;", "   vec2 point = vec2(", "       c * tex.x - s * tex.y,", "       s * tex.x + c * tex.y", "   ) * scale;", "   return (sin(point.x) * sin(point.y)) * 4.0;", "}", "void main() {", "   vec4 color = texture2D(uSampler, vTextureCoord);", "   float average = (color.r + color.g + color.b) / 3.0;", "   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);", "}"]
        }
        ,
        b.DotScreenFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.DotScreenFilter.prototype.constructor = b.DotScreenFilter,
        Object.defineProperty(b.DotScreenFilter.prototype, "scale", {
            get: function() {
                return this.uniforms.scale.value
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.scale.value = a
            }
        }),
        Object.defineProperty(b.DotScreenFilter.prototype, "angle", {
            get: function() {
                return this.uniforms.angle.value
            },
            set: function(a) {
                this.dirty = !0,
                this.uniforms.angle.value = a
            }
        }),
        b.CrossHatchFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                blur: {
                    type: "1f",
                    value: 1 / 512
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform float blur;", "uniform sampler2D uSampler;", "void main(void) {", "    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);", "    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);", "    if (lum < 1.00) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.75) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.50) {", "        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "    if (lum < 0.3) {", "        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0) {", "            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);", "        }", "    }", "}"]
        }
        ,
        b.CrossHatchFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.CrossHatchFilter.prototype.constructor = b.BlurYFilter,
        Object.defineProperty(b.CrossHatchFilter.prototype, "blur", {
            get: function() {
                return this.uniforms.blur.value / (1 / 7e3)
            },
            set: function(a) {
                this.uniforms.blur.value = 1 / 7e3 * a
            }
        }),
        b.RGBSplitFilter = function() {
            b.AbstractFilter.call(this),
            this.passes = [this],
            this.uniforms = {
                red: {
                    type: "2f",
                    value: {
                        x: 20,
                        y: 20
                    }
                },
                green: {
                    type: "2f",
                    value: {
                        x: -20,
                        y: 20
                    }
                },
                blue: {
                    type: "2f",
                    value: {
                        x: 20,
                        y: -20
                    }
                },
                dimensions: {
                    type: "4fv",
                    value: [0, 0, 0, 0]
                }
            },
            this.fragmentSrc = ["precision mediump float;", "varying vec2 vTextureCoord;", "varying vec4 vColor;", "uniform vec2 red;", "uniform vec2 green;", "uniform vec2 blue;", "uniform vec4 dimensions;", "uniform sampler2D uSampler;", "void main(void) {", "   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/dimensions.xy).r;", "   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/dimensions.xy).g;", "   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/dimensions.xy).b;", "   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;", "}"]
        }
        ,
        b.RGBSplitFilter.prototype = Object.create(b.AbstractFilter.prototype),
        b.RGBSplitFilter.prototype.constructor = b.RGBSplitFilter,
        Object.defineProperty(b.RGBSplitFilter.prototype, "angle", {
            get: function() {
                return this.uniforms.blur.value / (1 / 7e3)
            },
            set: function(a) {
                this.uniforms.blur.value = 1 / 7e3 * a
            }
        }),
        "undefined" != typeof exports ? ("undefined" != typeof module && module.exports && (exports = module.exports = b),
        exports.PIXI = b) : "undefined" != typeof define && define.amd ? define(b) : a.PIXI = b
    }
    ).call(this);
    ;(function() {
        var $jscomp = {
            scope: {}
        };
        $jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
            if (c.get || c.set)
                throw new TypeError("ES3 does not support getters and setters.");
            a != Array.prototype && a != Object.prototype && (a[b] = c.value)
        }
        ;
        $jscomp.getGlobal = function(a) {
            return "undefined" != typeof window && window === a ? a : "undefined" != typeof global ? global : a
        }
        ;
        $jscomp.global = $jscomp.getGlobal(this);
        $jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
        $jscomp.initSymbol = function() {
            $jscomp.initSymbol = function() {}
            ;
            $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol)
        }
        ;
        $jscomp.symbolCounter_ = 0;
        $jscomp.Symbol = function(a) {
            return $jscomp.SYMBOL_PREFIX + (a || "") + $jscomp.symbolCounter_++
        }
        ;
        $jscomp.initSymbolIterator = function() {
            $jscomp.initSymbol();
            var a = $jscomp.global.Symbol.iterator;
            a || (a = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
            "function" != typeof Array.prototype[a] && $jscomp.defineProperty(Array.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return $jscomp.arrayIterator(this)
                }
            });
            $jscomp.initSymbolIterator = function() {}
        }
        ;
        $jscomp.arrayIterator = function(a) {
            var b = 0;
            return $jscomp.iteratorPrototype(function() {
                return b < a.length ? {
                    done: !1,
                    value: a[b++]
                } : {
                    done: !0
                }
            })
        }
        ;
        $jscomp.iteratorPrototype = function(a) {
            $jscomp.initSymbolIterator();
            a = {
                next: a
            };
            a[$jscomp.global.Symbol.iterator] = function() {
                return this
            }
            ;
            return a
        }
        ;
        $jscomp.makeIterator = function(a) {
            $jscomp.initSymbolIterator();
            var b = a[Symbol.iterator];
            return b ? b.call(a) : $jscomp.arrayIterator(a)
        }
        ;
        $jscomp.arrayFromIterator = function(a) {
            for (var b, c = []; !(b = a.next()).done; )
                c.push(b.value);
            return c
        }
        ;
        $jscomp.arrayFromIterable = function(a) {
            return a instanceof Array ? a : $jscomp.arrayFromIterator($jscomp.makeIterator(a))
        }
        ;
        $jscomp.findInternal = function(a, b, c) {
            a instanceof String && (a = String(a));
            for (var d = a.length, e = 0; e < d; e++) {
                var f = a[e];
                if (b.call(c, f, e, a))
                    return {
                        i: e,
                        v: f
                    }
            }
            return {
                i: -1,
                v: void 0
            }
        }
        ;
        $jscomp.polyfill = function(a, b, c, d) {
            if (b) {
                c = $jscomp.global;
                a = a.split(".");
                for (d = 0; d < a.length - 1; d++) {
                    var e = a[d];
                    e in c || (c[e] = {});
                    c = c[e]
                }
                a = a[a.length - 1];
                d = c[a];
                b = b(d);
                b != d && null != b && $jscomp.defineProperty(c, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
        }
        ;
        $jscomp.polyfill("Array.prototype.find", function(a) {
            return a ? a : function(a, c) {
                return $jscomp.findInternal(this, a, c).v
            }
        }, "es6-impl", "es3");
        $jscomp.polyfill("Math.hypot", function(a) {
            return a ? a : function(a, c, d) {
                a = Number(a);
                c = Number(c);
                var b, f, h, k = Math.max(Math.abs(a), Math.abs(c));
                for (b = 2; b < arguments.length; b++)
                    k = Math.max(k, Math.abs(arguments[b]));
                if (1E100 < k || 1E-100 > k) {
                    a /= k;
                    c /= k;
                    h = a * a + c * c;
                    for (b = 2; b < arguments.length; b++)
                        f = Number(arguments[b]) / k,
                        h += f * f;
                    return Math.sqrt(h) * k
                }
                h = a * a + c * c;
                for (b = 2; b < arguments.length; b++)
                    f = Number(arguments[b]),
                    h += f * f;
                return Math.sqrt(h)
            }
        }, "es6-impl", "es3");
        $jscomp.checkStringArgs = function(a, b, c) {
            if (null == a)
                throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
            if (b instanceof RegExp)
                throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
            return a + ""
        }
        ;
        $jscomp.polyfill("String.prototype.includes", function(a) {
            return a ? a : function(a, c) {
                return -1 !== $jscomp.checkStringArgs(this, a, "includes").indexOf(a, c || 0)
            }
        }, "es6-impl", "es3");
        $jscomp.owns = function(a, b) {
            return Object.prototype.hasOwnProperty.call(a, b)
        }
        ;
        $jscomp.polyfill("Object.assign", function(a) {
            return a ? a : function(a, c) {
                for (var b = 1; b < arguments.length; b++) {
                    var e = arguments[b];
                    if (e)
                        for (var f in e)
                            $jscomp.owns(e, f) && (a[f] = e[f])
                }
                return a
            }
        }, "es6-impl", "es3");
        $jscomp.polyfill("String.prototype.startsWith", function(a) {
            return a ? a : function(a, c) {
                var b = $jscomp.checkStringArgs(this, a, "startsWith");
                a += "";
                for (var e = b.length, f = a.length, h = Math.max(0, Math.min(c | 0, b.length)), k = 0; k < f && h < e; )
                    if (b[h++] != a[k++])
                        return !1;
                return k >= f
            }
        }, "es6-impl", "es3");
        $jscomp.polyfill("String.prototype.endsWith", function(a) {
            return a ? a : function(a, c) {
                var b = $jscomp.checkStringArgs(this, a, "endsWith");
                a += "";
                void 0 === c && (c = b.length);
                for (var e = Math.max(0, Math.min(c | 0, b.length)), f = a.length; 0 < f && 0 < e; )
                    if (b[--e] != a[--f])
                        return !1;
                return 0 >= f
            }
        }, "es6-impl", "es3");
        $jscomp.polyfill("Array.prototype.fill", function(a) {
            return a ? a : function(a, c, d) {
                var b = this.length || 0;
                0 > c && (c = Math.max(0, b + c));
                if (null == d || d > b)
                    d = b;
                d = Number(d);
                0 > d && (d = Math.max(0, b + d));
                for (c = Number(c || 0); c < d; c++)
                    this[c] = a;
                return this
            }
        }, "es6-impl", "es3");
        $jscomp.array = $jscomp.array || {};
        $jscomp.iteratorFromArray = function(a, b) {
            $jscomp.initSymbolIterator();
            a instanceof String && (a += "");
            var c = 0
              , d = {
                next: function() {
                    if (c < a.length) {
                        var e = c++;
                        return {
                            value: b(e, a[e]),
                            done: !1
                        }
                    }
                    d.next = function() {
                        return {
                            done: !0,
                            value: void 0
                        }
                    }
                    ;
                    return d.next()
                }
            };
            d[Symbol.iterator] = function() {
                return d
            }
            ;
            return d
        }
        ;
        $jscomp.polyfill("Array.prototype.keys", function(a) {
            return a ? a : function() {
                return $jscomp.iteratorFromArray(this, function(a) {
                    return a
                })
            }
        }, "es6-impl", "es3");
        (function(a) {
            function b(a) {
                a = a.split(/\s/);
                return {
                    X: a[0],
                    Y: a[1]
                }
            }
            var c = a('<div style="background-position: 3px 5px">');
            a.support.backgroundPosition = "3px 5px" === c.css("backgroundPosition") ? !0 : !1;
            a.support.backgroundPositionXY = "3px" === c.css("backgroundPositionX") ? !0 : !1;
            var c = null
              , d = ["X", "Y"];
            !a.support.backgroundPosition && a.support.backgroundPositionXY && (a.cssHooks.backgroundPosition = {
                get: function(b, c, h) {
                    return a.map(d, function(c, d) {
                        return a.css(b, "backgroundPosition" + c)
                    }).join(" ")
                },
                set: function(c, f) {
                    a.each(d, function(a, d) {
                        var e = b(f);
                        c.style["backgroundPosition" + d] = e[d]
                    })
                }
            });
            a.support.backgroundPosition && !a.support.backgroundPositionXY && a.each(d, function(c, d) {
                a.cssHooks["backgroundPosition" + d] = {
                    get: function(c, e, f) {
                        return b(a.css(c, "backgroundPosition"))[d]
                    },
                    set: function(c, e) {
                        var f = b(a.css(c, "backgroundPosition"))
                          , h = "X" === d;
                        c.style.backgroundPosition = (h ? e : f.X) + " " + (h ? f.Y : e)
                    }
                };
                a.fx.step["backgroundPosition" + d] = function(b) {
                    a.cssHooks["backgroundPosition" + d].set(b.elem, b.now + b.unit)
                }
            })
        }
        )(jQuery);
        (function(a) {
            function b(b) {
                var c, d, e, f;
                a(b.style[a.cssProps.transform].replace(/(?:\,\s|\)|\()/g, "|").split(" ")).each(function(a, b) {
                    "" !== b && (void 0 === c && (c = {}),
                    d = b.split("|"),
                    e = d.shift(),
                    f = /.*[^XY]/.exec(e)[0],
                    c[f] || (c[f] = "     ".split(" ")),
                    /Y/.test(e) || (c[f][0] = d[0]),
                    /X/.test(e) || (c[f][1] = d[1]),
                    6 == d.length && (c[f][2] = d[2],
                    c[f][3] = d[3],
                    c[f][4] = d[4],
                    c[f][5] = d[5]))
                });
                return void 0 !== c ? c : null
            }
            function c(a) {
                if ("number" === typeof a)
                    return parseFloat(a);
                if (-1 != a.indexOf("deg"))
                    return parseInt(a, 10) * (2 * Math.PI / 360);
                if (-1 != a.indexOf("grad"))
                    return parseInt(a, 10) * (Math.PI / 200)
            }
            function d(b, d) {
                var e, f, h = "matrixFilter" === a.cssProps.transformOrigin ? !0 : !1;
                e = [a.cssHooks.scaleX.get(b), c(a.cssHooks.skewY.get(b)), c(a.cssHooks.skewX.get(b)), a.cssHooks.scaleY.get(b), a.cssHooks.translateX.get(b), a.cssHooks.translateY.get(b)];
                if (h) {
                    b.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=1,M12=0,M21=0,M22=1,SizingMethod='auto expand')";
                    var k = a.cssHooks.transformOriginX.get(b)
                      , r = a.cssHooks.transformOriginY.get(b)
                      , k = 0 < k.indexOf("%") ? /[\d]*/.exec(k) / 100 : k
                      , r = 0 < r.indexOf("%") ? /[\d]*/.exec(r) / 100 : r
                      , t = b.offsetWidth
                      , u = b.offsetHeight
                }
                d = "array" !== typeof d || 6 !== d.length ? e : [e[0] * d[0] + e[1] * d[2], e[0] * d[1] + e[1] * d[3], e[2] * d[0] + e[3] * d[2], e[2] * d[1] + e[3] * d[3], d[4], d[5]];
                if (f = a.data(b, "rotate"))
                    f = c(f),
                    e = Math.cos(f),
                    f = Math.sin(f),
                    f = [e, -f, f, e],
                    d = [d[0] * f[0] + d[1] * f[2], d[0] * f[1] + d[1] * f[3], d[2] * f[0] + d[3] * f[2], d[2] * f[1] + d[3] * f[3], d[4], d[5]];
                b.style.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=" + d[0] + ", ", "M12=" + d[1] + ", ", "M21=" + d[2] + ", ", "M22=" + d[3] + ", ", "SizingMethod='auto expand')"].join("");
                h && (h = b.offsetWidth,
                e = b.offsetHeight,
                b.style.position = "relative",
                b.style.left = k * (t - h) + (parseInt(d[4]) || 0),
                b.style.top = r * (u - e) + (parseInt(d[5]) || 0))
            }
            var e = document.createElement("div")
              , e = e.style;
            a.cssProps.transform = "" === e.MozTransform ? "MozTransform" : "" === e.msTransform ? "msTransform" : "" === e.WebkitTransform ? "WebkitTransform" : "" === e.OTransform ? "OTransform" : "" === e.Transform ? "Transform" : !1;
            a.cssProps.transformOrigin = "" === e.MozTransformOrigin ? "MozTransformOrigin" : "" === e.msTransformOrigin ? "msTransformOrigin" : "" === e.WebkitTransformOrigin ? "WebkitTransformOrigin" : "" === e.OTransformOrigin ? "OTransformOrigin" : "" === e.TransformOrigin ? "TransformOrigin" : !1;
            a.support.transform = !1 !== a.cssProps.transform || "" === e.filter ? !0 : !1;
            a.support.transformOrigin = !1 !== a.cssProps.transformOrigin ? !0 : !1;
            a.support.matrixFilter = "" === e.filter && !1 === a.cssProps.transform ? !0 : !1;
            e = null;
            if (!1 !== a.support.transform) {
                a.cssNumber.skew = a.cssNumber.skewX = a.cssNumber.skewY = a.cssNumber.scale = a.cssNumber.scaleX = a.cssNumber.scaleY = a.cssNumber.rotate = a.cssNumber.matrix = !0;
                a.cssNumber.transformOrigin = a.cssNumber.transformOriginX = a.cssNumber.transformOriginY = !0;
                a.support.matrixFilter && (a.cssNumber.transformOrigin = a.cssNumber.transformOriginX = a.cssNumber.transformOriginY = !0,
                a.cssProps.transformOrigin = "matrixFilter");
                a.cssHooks.transform = {
                    set: function(b, c, d) {
                        a.support.matrixFilter ? b.style.filter = "" + c : b.style[a.cssProps.transform] = c + "%"
                    },
                    get: function(b, c) {
                        return a.support.matrixFilter ? b.style.filter : b.style[a.cssProps.transform]
                    }
                };
                a.cssHooks.transformOrigin = {
                    set: function(b, c, d) {
                        a.support.matrixFilter ? (c = c.split(","),
                        a.cssHooks.transformOriginX.set(b, c[0]),
                        1 < c.length && a.cssHooks.transformOriginY.set(b, c[1])) : b.style[a.cssProps.transformOrigin] = "string" === typeof c ? c : c + (d || "%")
                    },
                    get: function(b, c) {
                        if (a.support.matrixFilter) {
                            var d = a.data(b, "transformOriginX")
                              , e = a.data(b, "transformOriginY");
                            return d && e && d === e ? d : "50%"
                        }
                        return b.style[a.cssProps.transformOrigin]
                    }
                };
                a.fx.step.transformOrigin = function(b) {
                    a.cssHooks.transformOrigin.set(b.elem, b.now, b.unit)
                }
                ;
                a.cssHooks.transformOriginX = {
                    set: function(b, c, e) {
                        a.support.matrixFilter ? (a.data(b, "transformOriginX", e ? c + e : c),
                        d(b)) : b.style[a.cssProps.transformOrigin + "X"] = "string" === typeof c ? c : c + (e || "%")
                    },
                    get: function(b, c) {
                        if (a.support.matrixFilter) {
                            var d = a.data(b, "transformOriginX");
                            switch (d) {
                            case "left":
                                return "0%";
                            case "center":
                                return "50%";
                            case "right":
                                return "100%"
                            }
                            return d ? d : "50%"
                        }
                        return b.style[a.cssProps.transformOrigin + "X"]
                    }
                };
                a.fx.step.transformOriginX = function(b) {
                    a.cssHooks.transformOriginX.set(b.elem, b.now, b.unit)
                }
                ;
                a.cssHooks.transformOriginY = {
                    set: function(b, c, e) {
                        a.support.matrixFilter ? (a.data(b, "transformOriginY", e ? c + e : c),
                        d(b)) : b.style[a.cssProps.transformOrigin + "Y"] = "string" === typeof c ? c : c + (e || "%")
                    },
                    get: function(b, c) {
                        if (a.support.matrixFilter) {
                            var d = a.data(b, "transformOriginY");
                            switch (d) {
                            case "top":
                                return "0%";
                            case "center":
                                return "50%";
                            case "bottom":
                                return "100%"
                            }
                            return d ? d : "50%"
                        }
                        return b.style[a.cssProps.transformOrigin + "Y"]
                    }
                };
                a.fx.step.transformOriginY = function(b) {
                    a.cssHooks.transformOriginY.set(b.elem, b.now, b.unit)
                }
                ;
                var e = function(a) {
                    return a
                }
                  , f = [["X", "Y"], "X", "Y"];
                jQuery.each([{
                    prop: "rotate",
                    matrix: [function(a) {
                        return Math.cos(a)
                    }
                    , function(a) {
                        return -Math.sin(a)
                    }
                    , function(a) {
                        return Math.sin(a)
                    }
                    , function(a) {
                        return Math.cos(a)
                    }
                    ],
                    unit: "rad",
                    subProps: [""],
                    fnc: c
                }, {
                    prop: "scale",
                    matrix: [[e, 0, 0, e], [e, 0, 0, 1], [1, 0, 0, e]],
                    unit: "",
                    subProps: f,
                    fnc: parseFloat,
                    _default: 1
                }, {
                    prop: "skew",
                    matrix: [[1, e, e, 1], [1, e, 0, 1], [1, 0, e, 1]],
                    unit: "rad",
                    subProps: f,
                    fnc: c
                }, {
                    prop: "translate",
                    matrix: [[1, 0, 0, 1, e, e], [1, 0, 0, 1, e, 0], [1, 0, 0, 1, 0, e]],
                    standardUnit: "px",
                    subProps: f,
                    fnc: parseFloat
                }, {
                    prop: "matrix",
                    matrix: [[e, e, e, e, e, e], [e, 0, 0, 1, 0, 0], [1, e, 0, 1, 0, 0], [1, 0, e, 1, 0, 0], [1, 0, 0, e, 0, 0], [1, 0, 0, 1, 0, e]],
                    subProps: ["ABCDXY".split(""), "A", "B", "C", "D", "X", "Y"],
                    fnc: parseFloat
                }], function(c, e) {
                    jQuery.each(e.subProps, function(c, f) {
                        var h;
                        a.isArray(f) ? (h = e.prop,
                        a.cssHooks[h] = {
                            set: function(b, c, d) {
                                jQuery.each(f, function(e, f) {
                                    a.cssHooks[h + f].set(b, c, d)
                                })
                            },
                            get: function(b, c) {
                                var d = [];
                                jQuery.each(f, function(c, e) {
                                    d.push(a.cssHooks[h + e].get(b, d))
                                });
                                return d[0] || d[1]
                            }
                        }) : (h = e.prop + f,
                        a.cssHooks[h] = {
                            set: function(c, f, k) {
                                a.data(c, h, k ? f + k : f);
                                f = e.fnc(k ? f + k : f);
                                var m = h;
                                k = e.unit || k || e.standardUnit;
                                if (a.support.matrixFilter)
                                    d(c, f);
                                else {
                                    var n = b(c)
                                      , p = /[X|Y]/.exec(m)
                                      , p = null === p ? "" : p[0] ? p[0] : p
                                      , m = /.*[^XY]/.exec(m)[0];
                                    k = void 0 === k ? "" : k;
                                    var q = "", r = !1, t;
                                    if (null !== n)
                                        for (var z in n)
                                            if (t = n[z],
                                            m === z)
                                                "matrix" !== m ? (q += m + "(",
                                                q += "X" === p || "" === p ? f + k : "" !== t[0] ? t[0] : a.cssHooks[m + "X"].get(c) + k,
                                                q += "Y" === p ? ", " + f + k : "" !== t[1] ? ", " + t[1] : m + "Y"in a.cssHooks ? ", " + a.cssHooks[m + "Y"].get(c) + k : "",
                                                q += ") ") : q += f + " ",
                                                r = !0;
                                            else {
                                                for (var q = q + (z + "("), B = 0; B < t.length; B++)
                                                    if (q += t[B],
                                                    B < t.length - 1 && "" !== t[B + 1])
                                                        q += ", ";
                                                    else
                                                        break;
                                                q += ") "
                                            }
                                    r || (q += m + p + "(" + f + k + ") ");
                                    c.style[a.cssProps.transform] = q
                                }
                            },
                            get: function(b, c) {
                                var d = a.data(b, h);
                                return d && void 0 !== d ? d : e._default || 0
                            }
                        });
                        a.fx.step[h] = function(b) {
                            b.unit = "px" === b.unit && a.cssNumber[h] ? e.standardUnit : b.unit;
                            a.cssHooks[h].set(b.elem, b.now, b.unit)
                        }
                    })
                });
                a.rotate = {
                    radToDeg: function(a) {
                        return 180 * a / Math.PI
                    }
                }
            }
        }
        )(jQuery);
        (function(a) {
            function b(b, d) {
                var c, f;
                function h(b) {
                    A.start = x ? b.pageX : b.pageY;
                    b = parseInt(u.obj.css(w));
                    c = "auto" == b ? 0 : b;
                    a(document).bind("mousemove", n);
                    document.ontouchmove = function(b) {
                        a(document).unbind("mousemove");
                        n(b.touches[0])
                    }
                    ;
                    a(document).bind("mouseup", m);
                    u.obj.bind("mouseup", m);
                    u.obj[0].ontouchend = document.ontouchend = function(b) {
                        a(document).unbind("mouseup");
                        u.obj.unbind("mouseup");
                        m(b.touches[0])
                    }
                    ;
                    return !1
                }
                function k(a) {
                    1 <= q.ratio || (y -= (a.wheelDelta ? a.wheelDelta / 120 : -a.detail / 3) * d.wheel,
                    y = Math.min(q[d.axis] - p[d.axis], Math.max(0, y)),
                    u.obj.css(w, y / r.ratio),
                    q.obj.css(w, -y),
                    a.preventDefault())
                }
                function m(b) {
                    a(document).unbind("mousemove", n);
                    a(document).unbind("mouseup", m);
                    u.obj.unbind("mouseup", m);
                    document.ontouchmove = u.obj[0].ontouchend = document.ontouchend = null;
                    return !1
                }
                function n(a) {
                    if (!(1 <= q.ratio)) {
                        var b = t[d.axis] / t.obj[0].getBoundingClientRect()[x ? "width" : "height"];
                        f = Math.min(t[d.axis] - u[d.axis], Math.max(0, c + b * ((x ? a.pageX : a.pageY) - A.start)));
                        y = f * r.ratio;
                        q.obj.css(w, -y);
                        u.obj.css(w, f)
                    }
                    return !1
                }
                var p = {
                    obj: a(".viewport", b)
                }, q = {
                    obj: a(".overview", b)
                }, r = {
                    obj: a(".scrollbar", b)
                }, t = {
                    obj: a(".track", r.obj)
                }, u = {
                    obj: a(".thumb", r.obj)
                }, x = "x" == d.axis, w = x ? "left" : "top", v = x ? "Width" : "Height", y;
                f = c = 0;
                var A = {};
                this.update = function(a) {
                    p[d.axis] = p.obj[0]["offset" + v];
                    q[d.axis] = q.obj[0]["scroll" + v];
                    q.ratio = p[d.axis] / q[d.axis];
                    r.obj.toggleClass("disable", 1 <= q.ratio);
                    t[d.axis] = "auto" == d.size ? p[d.axis] : d.size;
                    u[d.axis] = Math.min(t[d.axis], Math.max(d.min_thumb_size, "auto" == d.sizethumb ? t[d.axis] * q.ratio : d.sizethumb));
                    r.ratio = (q[d.axis] - p[d.axis]) / (t[d.axis] - u[d.axis]);
                    y = "relative" == a && 1 >= q.ratio ? Math.min(q[d.axis] - p[d.axis], Math.max(0, y)) : 0;
                    y = "bottom" == a && 1 >= q.ratio ? q[d.axis] - p[d.axis] : isNaN(parseInt(a)) ? y : parseInt(a);
                    u.obj.css(w, y / r.ratio);
                    q.obj.css(w, -y);
                    A.start = u.obj.offset()[w];
                    a = v.toLowerCase();
                    r.obj.css(a, t[d.axis]);
                    t.obj.css(a, t[d.axis]);
                    u.obj.css(a, u[d.axis]);
                    Number(q.obj.css("height").slice(0, -2)) > Number(p.obj.css("height").slice(0, -2)) ? r.obj.show() : r.obj.hide()
                }
                ;
                this.isAtLastScrollLine = function() {
                    return 1 <= q.ratio || y == q.obj[0]["scroll" + v] - p.obj[0]["offset" + v]
                }
                ;
                this.update();
                (function() {
                    u.obj.bind("mousedown", h);
                    u.obj[0].ontouchstart = function(a) {
                        a.preventDefault();
                        u.obj.unbind("mousedown");
                        h(a.touches[0]);
                        return !1
                    }
                    ;
                    t.obj.bind("mouseup", n);
                    t.obj.bind("mouseup", m);
                    d.scroll && this.addEventListener ? (b[0].addEventListener("DOMMouseScroll", k, !1),
                    b[0].addEventListener("mousewheel", k, !1)) : d.scroll && (b[0].onmousewheel = k)
                }
                )();
                return this
            }
            a.tiny = a.tiny || {};
            a.tiny.scrollbar = {
                options: {
                    axis: "y",
                    wheel: 40,
                    scroll: !0,
                    size: "auto",
                    sizethumb: "auto",
                    min_thumb_size: 35
                }
            };
            a.fn.tinyscrollbar = function(c) {
                c = a.extend({}, a.tiny.scrollbar.options, c);
                this.each(function() {
                    a(this).data("tsb", new b(a(this),c))
                });
                return this
            }
            ;
            a.fn.tinyscrollbar_update = function(b) {
                return a(this).data("tsb").update(b)
            }
            ;
            a.fn.tinyscrollbar_isAtLastScrollLine = function() {
                return a(this).data("tsb").isAtLastScrollLine()
            }
        }
        )(jQuery);
        (function(a) {
            function b(a, b) {
                return "function" == typeof a ? a.call(b) : a
            }
            function c(b, c) {
                this.$element = a(b);
                this.options = c;
                this.enabled = !0;
                this.fixTitle()
            }
            c.prototype = {
                show: function() {
                    var c = this.getTitle();
                    if (c && this.enabled) {
                        var e = this.tip()
                          , c = e.find(".tipsy-inner")[this.options.html ? "html" : "text"](c);
                        this.options["max-width"] && c.css("max-width", this.options["max-width"]);
                        e[0].className = "tipsy";
                        e.remove().css({
                            top: 0,
                            left: 0,
                            visibility: "hidden",
                            display: "block"
                        }).prependTo(document.body);
                        var c = a.extend({}, this.$element.offset(), {
                            width: this.$element[0].offsetWidth,
                            height: this.$element[0].offsetHeight
                        }), f = e[0].offsetWidth, h = e[0].offsetHeight, k = b(this.options.gravity, this.$element[0]), m;
                        switch (k.charAt(0)) {
                        case "n":
                            m = {
                                top: c.top + c.height + this.options.offset,
                                left: c.left + c.width / 2 - f / 2
                            };
                            break;
                        case "s":
                            m = {
                                top: c.top - h - this.options.offset,
                                left: c.left + c.width / 2 - f / 2
                            };
                            break;
                        case "e":
                            m = {
                                top: c.top + c.height / 2 - h / 2,
                                left: c.left - f - this.options.offset
                            };
                            break;
                        case "w":
                            m = {
                                top: c.top + c.height / 2 - h / 2,
                                left: c.left + c.width + this.options.offset
                            }
                        }
                        2 == k.length && ("w" == k.charAt(1) ? m.left = c.left + c.width / 2 - 15 : m.left = c.left + c.width / 2 - f + 15);
                        e.css(m).addClass("tipsy-" + k);
                        e.find(".tipsy-arrow")[0].className = "tipsy-arrow tipsy-arrow-" + k.charAt(0);
                        this.options.className && e.addClass(b(this.options.className, this.$element[0]));
                        this.options.fade ? e.stop().css({
                            opacity: 0,
                            display: "block",
                            visibility: "visible"
                        }).animate({
                            opacity: this.options.opacity
                        }) : e.css({
                            visibility: "visible",
                            opacity: this.options.opacity
                        })
                    }
                },
                hide: function() {
                    this.options.fade ? this.tip().stop().fadeOut(function() {
                        a(this).remove()
                    }) : this.tip().remove()
                },
                fixTitle: function() {
                    var a = this.$element;
                    (a.attr("title") || "string" != typeof a.attr("original-title")) && a.attr("original-title", a.attr("title") || "").removeAttr("title")
                },
                getTitle: function() {
                    var a, b = this.$element, c;
                    this.fixTitle();
                    c = this.options;
                    "string" == typeof c.title ? a = b.attr("title" == c.title ? "original-title" : c.title) : "function" == typeof c.title && (a = c.title.call(b[0]));
                    return (a = ("" + a).replace(/(^\s*|\s*$)/, "")) || c.fallback
                },
                tip: function() {
                    this.$tip || (this.$tip = a('<div class="tipsy"></div>').html('<div class="tipsy-arrow"></div><div class="tipsy-inner"></div>'),
                    this.$tip.data("tipsy-pointee", this.$element[0]));
                    return this.$tip
                },
                validate: function() {
                    this.$element[0].parentNode || (this.hide(),
                    this.options = this.$element = null)
                },
                enable: function() {
                    this.enabled = !0
                },
                disable: function() {
                    this.enabled = !1
                },
                toggleEnabled: function() {
                    this.enabled = !this.enabled
                }
            };
            a.fn.tipsy = function(b) {
                function d(d) {
                    var e = a.data(d, "tipsy");
                    e || (e = new c(d,a.fn.tipsy.elementOptions(d, b)),
                    a.data(d, "tipsy", e));
                    return e
                }
                function f() {
                    var a = d(this);
                    a.hoverState = "in";
                    0 == b.delayIn ? a.show() : (a.fixTitle(),
                    setTimeout(function() {
                        "in" == a.hoverState && a.show()
                    }, b.delayIn))
                }
                function h() {
                    var a = d(this);
                    a.hoverState = "out";
                    0 == b.delayOut ? a.hide() : setTimeout(function() {
                        "out" == a.hoverState && a.hide()
                    }, b.delayOut)
                }
                if (!0 === b)
                    return this.data("tipsy");
                if ("string" == typeof b) {
                    var k = this.data("tipsy");
                    if (k)
                        k[b]();
                    return this
                }
                b = a.extend({}, a.fn.tipsy.defaults, b);
                b.live || this.each(function() {
                    d(this)
                });
                if ("manual" != b.trigger) {
                    var k = b.live ? "live" : "bind"
                      , m = "hover" == b.trigger ? "mouseleave" : "blur";
                    this[k]("hover" == b.trigger ? "mouseenter" : "focus", f)[k](m, h)[k]("touchend", h)
                }
                return this
            }
            ;
            a.fn.tipsy.defaults = {
                className: null,
                delayIn: 0,
                delayOut: 0,
                fade: !1,
                fallback: "",
                gravity: "n",
                html: !1,
                live: !1,
                offset: 0,
                opacity: .8,
                title: "title",
                trigger: "hover"
            };
            a.fn.tipsy.revalidate = function() {
                a(".tipsy").each(function() {
                    var b = a.data(this, "tipsy-pointee"), c;
                    if (!(c = !b)) {
                        a: {
                            for (; b = b.parentNode; )
                                if (b == document) {
                                    b = !0;
                                    break a
                                }
                            b = !1
                        }
                        c = !b
                    }
                    c && a(this).remove()
                })
            }
            ;
            a.fn.tipsy.elementOptions = function(b, c) {
                return a.metadata ? a.extend({}, c, a(b).metadata()) : c
            }
            ;
            a.fn.tipsy.autoNS = function() {
                return a(this).offset().top > a(document).scrollTop() + a(window).height() / 2 ? "s" : "n"
            }
            ;
            a.fn.tipsy.autoWE = function() {
                return a(this).offset().left > a(document).scrollLeft() + a(window).width() / 2 ? "e" : "w"
            }
            ;
            a.fn.tipsy.autoBounds = function(b, c) {
                return function() {
                    var d = c[0]
                      , e = 1 < c.length ? c[1] : !1
                      , k = a(document).scrollTop() + b
                      , m = a(document).scrollLeft() + b
                      , n = a(this);
                    n.offset().top < k && (d = "n");
                    n.offset().left < m && (e = "w");
                    a(window).width() + a(document).scrollLeft() - n.offset().left < b && (e = "e");
                    a(window).height() + a(document).scrollTop() - n.offset().top < b && (d = "s");
                    return d + (e ? e : "")
                }
            }
        }
        )(jQuery);
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
        window.AudioContext = window.AudioContext || window.webkitAudioContext;
        window.URL = window.URL || window.webkitURL;
        window["debugger"] = 0;
        Object.freeze || (Object.freeze = function(a) {
            return a
        }
        );
        "function" !== typeof Object.create && (Object.create = function(a) {
            function b() {}
            b.prototype = a;
            return new b
        }
        );
        window.console || (console = {
            log: function() {},
            info: function() {},
            warn: function() {},
            error: function() {}
        });
        Math.hypot || (Math.hypot = function() {
            for (var a = 0, b = arguments.length; b--; )
                a += arguments[b] * arguments[b];
            return Math.sqrt(a)
        }
        );
        String.prototype.includes || Object.defineProperty(String.prototype, "includes", {
            value: function(a, b) {
                "number" !== typeof b && (b = 0);
                return b + a.length > this.length ? !1 : -1 !== this.indexOf(a, b)
            }
        });
        Array.prototype.includes || Object.defineProperty(Array.prototype, "includes", {
            value: function(a, b) {
                if (null == this)
                    throw new TypeError('"this" is null or not defined');
                var c = Object(this)
                  , d = c.length >>> 0;
                if (0 === d)
                    return !1;
                for (var e = b | 0, e = Math.max(0 <= e ? e : d - Math.abs(e), 0); e < d; ) {
                    var f = c[e]
                      , h = a;
                    if (f === h || "number" === typeof f && "number" === typeof h && isNaN(f) && isNaN(h))
                        return !0;
                    e++
                }
                return !1
            }
        });
        
