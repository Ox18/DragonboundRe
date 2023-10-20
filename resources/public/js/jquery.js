! function(e) {
    function o(o, t) {
        function a(e) {
            return ed.preferFlash && ei && !ed.ignoreFlash && void 0 !== ed.flash[e] && ed.flash[e]
        }

        function n(e) {
            return function(o) {
                var t = this._t;
                return t && t._a ? e.call(this, o) : null
            }
        }
        this.setupOptions = {
            url: o || null,
            flashVersion: 8,
            debugMode: !0,
            debugFlash: !1,
            useConsole: !0,
            consoleOnly: !0,
            waitForWindowLoad: !1,
            bgColor: "#ffffff",
            useHighPerformance: !1,
            flashPollingInterval: null,
            html5PollingInterval: null,
            flashLoadTimeout: 1e3,
            wmode: null,
            allowScriptAccess: "always",
            useFlashBlock: !1,
            useHTML5Audio: !0,
            html5Test: /^(probably|maybe)$/i,
            preferFlash: !0,
            noSWFCache: !1
        }, this.defaultOptions = {
            autoLoad: !1,
            autoPlay: !1,
            from: null,
            loops: 1,
            onid3: null,
            onload: null,
            whileloading: null,
            onplay: null,
            onpause: null,
            onresume: null,
            whileplaying: null,
            onposition: null,
            onstop: null,
            onfailure: null,
            onfinish: null,
            multiShot: !0,
            multiShotEvents: !1,
            position: null,
            pan: 0,
            stream: !0,
            to: null,
            type: null,
            usePolicyFile: !1,
            volume: 100
        }, this.flash9Options = {
            isMovieStar: null,
            usePeakData: !1,
            useWaveformData: !1,
            useEQData: !1,
            onbufferchange: null,
            ondataerror: null
        }, this.movieStarOptions = {
            bufferTime: 3,
            serverURL: null,
            onconnect: null,
            duration: null
        }, this.audioFormats = {
            mp3: {
                type: ['audio/mpeg; codecs="mp3"', "audio/mpeg", "audio/mp3", "audio/MPA", "audio/mpa-robust"],
                required: !0
            },
            mp4: {
                related: ["aac", "m4a"],
                type: ['audio/mp4; codecs="mp4a.40.2"', "audio/aac", "audio/x-m4a", "audio/MP4A-LATM", "audio/mpeg4-generic"],
                required: !1
            },
            ogg: {
                type: ["audio/ogg; codecs=vorbis"],
                required: !1
            },
            wav: {
                type: ['audio/wav; codecs="1"', "audio/wav", "audio/wave", "audio/x-wav"],
                required: !1
            }
        }, this.movieID = "sm2-container", this.id = t || "sm2movie", this.debugID = "soundmanager-debug", this.debugURLParam = /([#?&])debug=1/i, this.versionNumber = "V2.97a.20120624", this.altURL = this.movieURL = this.version = null, this.enabled = this.swfLoaded = !1, this.oMC = null, this.sounds = {}, this.soundIDs = [], this.didFlashBlock = this.muted = !1, this.filePattern = null, this.filePatterns = {
            flash8: /\.mp3(\?.*)?$/i,
            flash9: /\.mp3(\?.*)?$/i
        }, this.features = {
            buffering: !1,
            peakData: !1,
            waveformData: !1,
            eqData: !1,
            movieStar: !1
        }, this.sandbox = {};
        try {
            s = "undefined" != typeof Audio && void 0 !== (new Audio).canPlayType
        } catch (r) {
            s = !1
        }
        this.hasHTML5 = s, this.html5 = {
            usingFlash: null
        }, this.flash = {}, this.ignoreFlash = this.html5Only = !1;
        var s, d, u, _, c, h, p, m, f, y, b, E, v, A, T, S, O, D, C, k, R, I, L, P, N, w, M, G, B, U, x, F, Y, j, H, V, X, K, q, W, J, z, Z, Q, ee, eo, et, ea, en, ei, er, es, e$, el, ed = this,
            eu = null,
            e_ = navigator.userAgent,
            ec = e,
            eh = ec.location.href.toString(),
            eg = document,
            ep = [],
            em = !1,
            e8 = !1,
            ef = !1,
            e0 = !1,
            e1 = !1,
            ey = null,
            eb = null,
            eE = !1,
            ev = !1,
            e2 = 0,
            eA = null,
            eT = null,
            eS = Array.prototype.slice,
            eO = !1,
            eD = e_.match(/(ipad|iphone|ipod)/i),
            eC = e_.match(/msie/i),
            e3 = e_.match(/webkit/i),
            ek = e_.match(/safari/i) && !e_.match(/chrome/i),
            eR = e_.match(/opera/i),
            eI = e_.match(/(mobile|pre\/|xoom)/i) || eD,
            eL = !eh.match(/usehtml5audio/i) && !eh.match(/sm2\-ignorebadua/i) && ek && !e_.match(/silk/i) && e_.match(/OS X 10_6_([3-7])/i),
            eP = void 0 !== eg.hasFocus ? eg.hasFocus() : null,
            eN = ek && (void 0 === eg.hasFocus || !eg.hasFocus()),
            e4 = !eN,
            ew = /(mp3|mp4|mpa|m4a)/i,
            eM = eg.location ? eg.location.protocol.match(/http/i) : null,
            e6 = eM ? "" : "http://",
            e7 = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|mp4v|3gp|3g2)\s*(?:$|;)/i,
            eG = "mpeg4 aac flv mov mp4 m4v f4v m4a mp4v 3gp 3g2".split(" "),
            eB = RegExp("\\.(" + eG.join("|") + ")(\\?.*)?$", "i");
        this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i, this.useAltURL = !eM, this._global_a = null, eI && (ed.useHTML5Audio = !0, ed.preferFlash = !1, eD) && (eO = ed.ignoreFlash = !0), this.setup = function(e) {
            return void 0 !== e && ef && eT && ed.ok() && (void 0 !== e.flashVersion || void 0 !== e.url) && V(x("setupLate")), y(e), ed
        }, this.supported = this.ok = function() {
            return eT ? ef && !e0 : ed.useHTML5Audio && ed.hasHTML5
        }, this.getMovie = function(e) {
            return u(e) || eg[e] || ec[e]
        }, this.createSound = function(e, o) {
            function t() {
                return a = j(a), ed.sounds[r.id] = new d(r), ed.soundIDs.push(r.id), ed.sounds[r.id]
            }
            var a = null,
                n = null,
                r = null;
            return ef && ed.ok() ? (void 0 !== o && (e = {
                id: e,
                url: o
            }), (a = f(e)).url = J(a.url), X((r = a).id, !0)) ? ed.sounds[r.id] : (Z(r) ? (n = t())._setup_html5(r) : (8 < p && null === r.isMovieStar && (r.isMovieStar = !(!r.serverURL && !(r.type && r.type.match(e7) || r.url.match(eB)))), r = H(r, void 0), n = t(), 8 === p ? eu._createSound(r.id, r.loops || 1, r.usePolicyFile) : (eu._createSound(r.id, r.url, r.usePeakData, r.useWaveformData, r.useEQData, r.isMovieStar, !!r.isMovieStar && r.bufferTime, r.loops || 1, r.serverURL, r.duration || null, r.autoPlay, !0, r.autoLoad, r.usePolicyFile), !r.serverURL && (n.connected = !0, r.onconnect && r.onconnect.apply(n))), !r.serverURL && (r.autoLoad || r.autoPlay) && n.load(r)), !r.serverURL && r.autoPlay && n.play(), n) : (V(void 0), !1)
        }, this.destroySound = function(e, o) {
            if (!X(e)) return !1;
            var t, a = ed.sounds[e];
            for (a._iO = {}, a.stop(), a.unload(), t = 0; t < ed.soundIDs.length; t++)
                if (ed.soundIDs[t] === e) {
                    ed.soundIDs.splice(t, 1);
                    break
                } return o || a.destruct(!0), delete ed.sounds[e], !0
        }, this.load = function(e, o) {
            return !!X(e) && ed.sounds[e].load(o)
        }, this.unload = function(e) {
            return !!X(e) && ed.sounds[e].unload()
        }, this.onposition = this.onPosition = function(e, o, t, a) {
            return !!X(e) && ed.sounds[e].onposition(o, t, a)
        }, this.clearOnPosition = function(e, o, t) {
            return !!X(e) && ed.sounds[e].clearOnPosition(o, t)
        }, this.start = this.play = function(e, o) {
            var t = !1;
            return ef && ed.ok() ? X(e) ? ed.sounds[e].play(o) : (o instanceof Object || (o = {
                url: o
            }), o && o.url && (o.id = e, t = ed.createSound(o).play()), t) : (V("soundManager.play(): " + x(ef ? "notOK" : "notReady")), t)
        }, this.setPosition = function(e, o) {
            return !!X(e) && ed.sounds[e].setPosition(o)
        }, this.stop = function(e) {
            return !!X(e) && ed.sounds[e].stop()
        }, this.stopAll = function() {
            for (var e in ed.sounds) ed.sounds.hasOwnProperty(e) && ed.sounds[e].stop()
        }, this.pause = function(e) {
            return !!X(e) && ed.sounds[e].pause()
        }, this.pauseAll = function() {
            var e;
            for (e = ed.soundIDs.length - 1; 0 <= e; e--) ed.sounds[ed.soundIDs[e]].pause()
        }, this.resume = function(e) {
            return !!X(e) && ed.sounds[e].resume()
        }, this.resumeAll = function() {
            var e;
            for (e = ed.soundIDs.length - 1; 0 <= e; e--) ed.sounds[ed.soundIDs[e]].resume()
        }, this.togglePause = function(e) {
            return !!X(e) && ed.sounds[e].togglePause()
        }, this.setPan = function(e, o) {
            return !!X(e) && ed.sounds[e].setPan(o)
        }, this.setVolume = function(e, o) {
            return !!X(e) && ed.sounds[e].setVolume(o)
        }, this.mute = function(e) {
            var o = 0;
            if ("string" != typeof e && (e = null), e) return !!X(e) && ed.sounds[e].mute();
            for (o = ed.soundIDs.length - 1; 0 <= o; o--) ed.sounds[ed.soundIDs[o]].mute();
            return ed.muted = !0
        }, this.muteAll = function() {
            ed.mute()
        }, this.unmute = function(e) {
            if ("string" != typeof e && (e = null), e) return !!X(e) && ed.sounds[e].unmute();
            for (e = ed.soundIDs.length - 1; 0 <= e; e--) ed.sounds[ed.soundIDs[e]].unmute();
            return ed.muted = !1, !0
        }, this.unmuteAll = function() {
            ed.unmute()
        }, this.toggleMute = function(e) {
            return !!X(e) && ed.sounds[e].toggleMute()
        }, this.getMemoryUse = function() {
            var e = 0;
            return eu && 8 !== p && (e = parseInt(eu._getMemoryUse(), 10)), e
        }, this.disable = function(e) {
            var o;
            if (void 0 === e && (e = !1), e0) return !1;
            for (e0 = !0, o = ed.soundIDs.length - 1; 0 <= o; o--) G(ed.sounds[ed.soundIDs[o]]);
            return m(e), en.remove(ec, "load", A), !0
        }, this.canPlayMIME = function(e) {
            var o;
            return ed.hasHTML5 && (o = Q({
                type: e
            })), !o && eT && (o = e && ed.ok() ? !!(8 < p && e.match(e7) || e.match(ed.mimePattern)) : null), o
        }, this.canPlayURL = function(e) {
            var o;
            return ed.hasHTML5 && (o = Q({
                url: e
            })), !o && eT && (o = e && ed.ok() ? !!e.match(ed.filePattern) : null), o
        }, this.canPlayLink = function(e) {
            return !!(void 0 !== e.type && e.type && ed.canPlayMIME(e.type)) || ed.canPlayURL(e.href)
        }, this.getSoundById = function(e) {
            if (!e) throw Error("soundManager.getSoundById(): sID is null/undefined");
            return ed.sounds[e]
        }, this.onready = function(e, o) {
            if ("function" == typeof e) o || (o = ec), E("onready", e, o), v();
            else throw x("needFunction", "onready");
            return !0
        }, this.ontimeout = function(e, o) {
            if ("function" == typeof e) o || (o = ec), E("ontimeout", e, o), v({
                type: "ontimeout"
            });
            else throw x("needFunction", "ontimeout");
            return !0
        }, this._wD = this._writeDebug = function() {
            return !0
        }, this._debug = function() {}, this.reboot = function() {
            var e, o;
            for (e = ed.soundIDs.length - 1; 0 <= e; e--) ed.sounds[ed.soundIDs[e]].destruct();
            if (eu) try {
                eC && (eb = eu.innerHTML), ey = eu.parentNode.removeChild(eu)
            } catch (t) {}
            for (e in eb = ey = eT = null, ed.enabled = I = ef = eE = ev = em = e8 = e0 = ed.swfLoaded = !1, ed.soundIDs = [], ed.sounds = {}, eu = null, ep)
                if (ep.hasOwnProperty(e))
                    for (o = ep[e].length - 1; 0 <= o; o--) ep[e][o].fired = !1;
            ec.setTimeout(ed.beginDelayedInit, 20)
        }, this.getMoviePercent = function() {
            return eu && void 0 !== eu.PercentLoaded ? eu.PercentLoaded() : null
        }, this.beginDelayedInit = function() {
            e1 = !0, k(), setTimeout(function() {
                return !ev && (P(), C(), ev = !0)
            }, 20), T()
        }, this.destruct = function() {
            ed.disable(!0)
        }, d = function(e) {
            var o, t, a, n, r, s, d, u, _, c, h = this,
                m = !1,
                y = [],
                b = 0,
                E = null;
            t = o = null, this.sID = this.id = e.id, this.url = e.url, this._iO = this.instanceOptions = this.options = f(e), this.pan = this.options.pan, this.volume = this.options.volume, this.isHTML5 = !1, this._a = null, this.id3 = {}, this._debug = function() {}, this.load = function(e) {
                var o = null;
                if (void 0 !== e ? (h._iO = f(e, h.options), h.instanceOptions = h._iO) : (e = h.options, h._iO = e, h.instanceOptions = h._iO, E && E !== h.url && (h._iO.url = h.url, h.url = null)), h._iO.url || (h._iO.url = h.url), h._iO.url = J(h._iO.url), h._iO.url === h.url && 0 !== h.readyState && 2 !== h.readyState) return 3 === h.readyState && h._iO.onload && h._iO.onload.apply(h, [!!h.duration]), h;
                if (e = h._iO, E = h.url, h.loaded = !1, h.readyState = 1, h.playState = 0, h.id3 = {}, Z(e)) !(o = h._setup_html5(e))._called_load && (h._html5_canplay = !1, h._a.src !== e.url && (h._a.src = e.url, h.setPosition(0)), h._a.autobuffer = "auto", h._a.preload = "auto", o._called_load = !0, e.autoPlay && h.play());
                else try {
                    h.isHTML5 = !1, h._iO = H(j(e)), e = h._iO, 8 === p ? eu._load(h.id, e.url, e.stream, e.autoPlay, e.whileloading ? 1 : 0, e.loops || 1, e.usePolicyFile) : eu._load(h.id, e.url, !!e.stream, !!e.autoPlay, e.loops || 1, !!e.autoLoad, e.usePolicyFile)
                } catch (t) {
                    N({
                        type: "SMSOUND_LOAD_JS_EXCEPTION",
                        fatal: !0
                    })
                }
                return h
            }, this.unload = function() {
                return 0 !== h.readyState && (h.isHTML5 ? (s(), h._a && (h._a.pause(), eo(h._a, "about:blank"), h.url = "about:blank")) : 8 === p ? eu._unload(h.id, "about:blank") : eu._unload(h.id), a()), h
            }, this.destruct = function(e) {
                h.isHTML5 ? (s(), h._a && (h._a.pause(), eo(h._a), eO || r(), h._a._t = null, h._a = null)) : (h._iO.onfailure = null, eu._destroySound(h.id)), e || ed.destroySound(h.id, !0)
            }, this.start = this.play = function(e, o) {
                var t, a;
                if (a = !0, a = null, o = void 0 === o || o, e || (e = {}), h._iO = f(e, h._iO), h._iO = f(h._iO, h.options), h._iO.url = J(h._iO.url), h.instanceOptions = h._iO, h._iO.serverURL && !h.connected) return h.getAutoPlay() || h.setAutoPlay(!0), h;
                if (Z(h._iO) && (h._setup_html5(h._iO), d()), 1 === h.playState && !h.paused && ((t = h._iO.multiShot) || (a = h)), null !== a || (h.loaded || (0 === h.readyState ? (h.isHTML5 || (h._iO.autoPlay = !0), h.load(h._iO)) : 2 === h.readyState && (a = h)), null !== a)) return a;
                if (!h.isHTML5 && 9 === p && 0 < h.position && h.position === h.duration && (e.position = 0), h.paused && h.position && 0 < h.position) h.resume();
                else {
                    if (h._iO = f(e, h._iO), null !== h._iO.from && null !== h._iO.to && 0 === h.instanceCount && 0 === h.playState && !h._iO.serverURL) {
                        if (t = function() {
                                h._iO = f(e, h._iO), h.play(h._iO)
                            }, h.isHTML5 && !h._html5_canplay ? (h.load({
                                _oncanplay: t
                            }), a = !1) : h.isHTML5 || h.loaded || h.readyState && 2 === h.readyState || (h.load({
                                onload: t
                            }), a = !1), null !== a) return a;
                        h._iO = c()
                    }(!h.instanceCount || h._iO.multiShotEvents || !h.isHTML5 && 8 < p && !h.getAutoPlay()) && h.instanceCount++, h._iO.onposition && 0 === h.playState && u(h), h.playState = 1, h.paused = !1, h.position = void 0 === h._iO.position || isNaN(h._iO.position) ? 0 : h._iO.position, h.isHTML5 || (h._iO = H(j(h._iO))), h._iO.onplay && o && (h._iO.onplay.apply(h), m = !0), h.setVolume(h._iO.volume, !0), h.setPan(h._iO.pan, !0), h.isHTML5 ? (d(), a = h._setup_html5(), h.setPosition(h._iO.position), a.play()) : (a = eu._start(h.id, h._iO.loops || 1, 9 === p ? h._iO.position : h._iO.position / 1e3, h._iO.multiShot), 9 === p && !a && h._iO.onplayerror && h._iO.onplayerror.apply(h))
                }
                return h
            }, this.stop = function(e) {
                var o = h._iO;
                return 1 === h.playState && (h._onbufferchange(0), h._resetOnPosition(0), h.paused = !1, h.isHTML5 || (h.playState = 0), _(), o.to && h.clearOnPosition(o.to), h.isHTML5 ? h._a && (e = h.position, h.setPosition(0), h.position = e, h._a.pause(), h.playState = 0, h._onTimer(), s()) : (eu._stop(h.id, e), o.serverURL && h.unload()), h.instanceCount = 0, h._iO = {}, o.onstop && o.onstop.apply(h)), h
            }, this.setAutoPlay = function(e) {
                h._iO.autoPlay = e, h.isHTML5 || (eu._setAutoPlay(h.id, e), e && !h.instanceCount && 1 === h.readyState && h.instanceCount++)
            }, this.getAutoPlay = function() {
                return h._iO.autoPlay
            }, this.setPosition = function(e) {
                void 0 === e && (e = 0);
                var o = h.isHTML5 ? Math.max(e, 0) : Math.min(h.duration || h._iO.duration, Math.max(e, 0));
                if (h.position = o, e = h.position / 1e3, h._resetOnPosition(h.position), h._iO.position = o, h.isHTML5) {
                    if (h._a && h._html5_canplay && h._a.currentTime !== e) try {
                        h._a.currentTime = e, (0 === h.playState || h.paused) && h._a.pause()
                    } catch (t) {}
                } else e = 9 === p ? h.position : e, h.readyState && 2 !== h.readyState && eu._setPosition(h.id, e, h.paused || !h.playState, h._iO.multiShot);
                return h.isHTML5 && h.paused && h._onTimer(!0), h
            }, this.pause = function(e) {
                return h.paused || 0 === h.playState && 1 !== h.readyState || (h.paused = !0, h.isHTML5 ? (h._setup_html5().pause(), s()) : (e || void 0 === e) && eu._pause(h.id, h._iO.multiShot), h._iO.onpause && h._iO.onpause.apply(h)), h
            }, this.resume = function() {
                var e = h._iO;
                return h.paused && (h.paused = !1, h.playState = 1, h.isHTML5 ? (h._setup_html5().play(), d()) : (e.isMovieStar && !e.serverURL && h.setPosition(h.position), eu._pause(h.id, e.multiShot)), !m && e.onplay ? (e.onplay.apply(h), m = !0) : e.onresume && e.onresume.apply(h)), h
            }, this.togglePause = function() {
                return 0 === h.playState ? (h.play({
                    position: 9 !== p || h.isHTML5 ? h.position / 1e3 : h.position
                }), h) : (h.paused ? h.resume() : h.pause(), h)
            }, this.setPan = function(e, o) {
                return void 0 === e && (e = 0), void 0 === o && (o = !1), h.isHTML5 || eu._setPan(h.id, e), h._iO.pan = e, o || (h.pan = e, h.options.pan = e), h
            }, this.setVolume = function(e, o) {
                return void 0 === e && (e = 100), void 0 === o && (o = !1), h.isHTML5 ? h._a && (h._a.volume = Math.max(0, Math.min(1, e / 100))) : eu._setVolume(h.id, ed.muted && !h.muted || h.muted ? 0 : e), h._iO.volume = e, o || (h.volume = e, h.options.volume = e), h
            }, this.mute = function() {
                return h.muted = !0, h.isHTML5 ? h._a && (h._a.muted = !0) : eu._setVolume(h.id, 0), h
            }, this.unmute = function() {
                h.muted = !1;
                var e = void 0 !== h._iO.volume;
                return h.isHTML5 ? h._a && (h._a.muted = !1) : eu._setVolume(h.id, e ? h._iO.volume : h.options.volume), h
            }, this.toggleMute = function() {
                return h.muted ? h.unmute() : h.mute()
            }, this.onposition = this.onPosition = function(e, o, t) {
                return y.push({
                    position: parseInt(e, 10),
                    method: o,
                    scope: void 0 !== t ? t : h,
                    fired: !1
                }), h
            }, this.clearOnPosition = function(e, o) {
                var t, e = parseInt(e, 10);
                if (isNaN(e)) return !1;
                for (t = 0; t < y.length; t++) e !== y[t].position || o && o !== y[t].method || (y[t].fired && b--, y.splice(t, 1))
            }, this._processOnPosition = function() {
                var e, o;
                if (!(e = y.length) || !h.playState || b >= e) return !1;
                for (e -= 1; 0 <= e; e--) !(o = y[e]).fired && h.position >= o.position && (o.fired = !0, b++, o.method.apply(o.scope, [o.position]));
                return !0
            }, this._resetOnPosition = function(e) {
                var o, t;
                if (!(o = y.length)) return !1;
                for (o -= 1; 0 <= o; o--)(t = y[o]).fired && e <= t.position && (t.fired = !1, b--);
                return !0
            }, c = function() {
                var e, o, t = h._iO,
                    a = t.from,
                    n = t.to;
                return o = function() {
                    h.clearOnPosition(n, o), h.stop()
                }, e = function() {
                    null === n || isNaN(n) || h.onPosition(n, o)
                }, null === a || isNaN(a) || (t.position = a, t.multiShot = !1, e()), t
            }, u = function() {
                var e, o = h._iO.onposition;
                if (o)
                    for (e in o) o.hasOwnProperty(e) && h.onPosition(parseInt(e, 10), o[e])
            }, _ = function() {
                var e, o = h._iO.onposition;
                if (o)
                    for (e in o) o.hasOwnProperty(e) && h.clearOnPosition(parseInt(e, 10))
            }, d = function() {
                h.isHTML5 && K(h)
            }, s = function() {
                h.isHTML5 && q(h)
            }, (a = function(e) {
                e || (y = [], b = 0), m = !1, h._hasTimer = null, h._a = null, h._html5_canplay = !1, h.bytesLoaded = null, h.bytesTotal = null, h.duration = h._iO && h._iO.duration ? h._iO.duration : null, h.durationEstimate = null, h.buffered = [], h.eqData = [], h.eqData.left = [], h.eqData.right = [], h.failures = 0, h.isBuffering = !1, h.instanceOptions = {}, h.instanceCount = 0, h.loaded = !1, h.metadata = {}, h.readyState = 0, h.muted = !1, h.paused = !1, h.peakData = {
                    left: 0,
                    right: 0
                }, h.waveformData = {
                    left: [],
                    right: []
                }, h.playState = 0, h.position = null, h.id3 = {}
            })(), this._onTimer = function(e) {
                var a, n = !1,
                    r = {};
                if (h._hasTimer || e) return h._a && (e || (0 < h.playState || 1 === h.readyState) && !h.paused) && ((a = h._get_html5_duration()) !== o && (o = a, h.duration = a, n = !0), h.durationEstimate = h.duration, (a = 1e3 * h._a.currentTime || 0) !== t && (t = a, n = !0), (n || e) && h._whileplaying(a, r, r, r, r)), n
            }, this._get_html5_duration = function() {
                var e = h._iO,
                    o = h._a ? 1e3 * h._a.duration : e ? e.duration : void 0;
                return o && !isNaN(o) && 1 / 0 !== o ? o : e ? e.duration : null
            }, this._apply_loop = function(e, o) {
                e.loop = 1 < o ? "loop" : ""
            }, this._setup_html5 = function(e) {
                var o, e = f(h._iO, e),
                    t = decodeURI,
                    r = eO ? ed._global_a : h._a,
                    s = t(e.url),
                    d = r && r._t ? r._t.instanceOptions : null;
                if (r) {
                    if (r._t && (eO || s !== t(E) ? eO && d.url === e.url && (!E || E === d.url) && (o = r) : o = r, o)) return h._apply_loop(r, e.loops), o;
                    eO && r._t && r._t.playState && e.url !== d.url && r._t.stop(), a(d && d.url ? e.url === d.url : !!E && E === e.url), r.src = e.url, E = h.url = e.url, r._called_load = !1
                } else h._a = e.autoLoad || e.autoPlay ? new Audio(e.url) : eR ? new Audio(null) : new Audio, (r = h._a)._called_load = !1, eO && (ed._global_a = r);
                return h.isHTML5 = !0, h._a = r, r._t = h, n(), h._apply_loop(r, e.loops), e.autoLoad || e.autoPlay ? h.load() : (r.autobuffer = !1, r.preload = "auto"), r
            }, n = function() {
                var e;
                if (h._a._added_events) return !1;
                for (e in h._a._added_events = !0, e$) e$.hasOwnProperty(e) && h._a && h._a.addEventListener(e, e$[e], !1);
                return !0
            }, r = function() {
                var e;
                for (e in h._a._added_events = !1, e$) e$.hasOwnProperty(e) && h._a && h._a.removeEventListener(e, e$[e], !1)
            }, this._onload = function(e) {
                return e = !!e || !h.isHTML5 && 8 === p && h.duration, h.loaded = e, h.readyState = e ? 3 : 2, h._onbufferchange(0), h._iO.onload && h._iO.onload.apply(h, [e]), !0
            }, this._onbufferchange = function(e) {
                return 0 !== h.playState && (!e || !h.isBuffering) && (!!e || !!h.isBuffering) && (h.isBuffering = 1 === e, h._iO.onbufferchange && h._iO.onbufferchange.apply(h), !0)
            }, this._onsuspend = function() {
                return h._iO.onsuspend && h._iO.onsuspend.apply(h), !0
            }, this._onfailure = function(e, o, t) {
                h.failures++, h._iO.onfailure && 1 === h.failures && h._iO.onfailure(h, e, o, t)
            }, this._onfinish = function() {
                var e = h._iO.onfinish;
                h._onbufferchange(0), h._resetOnPosition(0), h.instanceCount && (h.instanceCount--, !h.instanceCount && (_(), h.playState = 0, h.paused = !1, h.instanceCount = 0, h.instanceOptions = {}, h._iO = {}, s(), h.isHTML5) && (h.position = 0), (!h.instanceCount || h._iO.multiShotEvents) && e && e.apply(h))
            }, this._whileloading = function(e, o, t, a) {
                var n = h._iO;
                h.bytesLoaded = e, h.bytesTotal = o, h.duration = Math.floor(t), h.bufferLength = a, n.isMovieStar ? h.durationEstimate = h.duration : (h.durationEstimate = n.duration ? h.duration > n.duration ? h.duration : n.duration : parseInt(h.bytesTotal / h.bytesLoaded * h.duration, 10), void 0 === h.durationEstimate && (h.durationEstimate = h.duration)), h.isHTML5 || (h.buffered = [{
                    start: 0,
                    end: h.duration
                }]), (3 !== h.readyState || h.isHTML5) && n.whileloading && n.whileloading.apply(h)
            }, this._whileplaying = function(e, o, t, a, n) {
                var r = h._iO;
                return !isNaN(e) && null !== e && (h.position = Math.max(0, e), h._processOnPosition(), !h.isHTML5 && 8 < p && (r.usePeakData && void 0 !== o && o && (h.peakData = {
                    left: o.leftPeak,
                    right: o.rightPeak
                }), r.useWaveformData && void 0 !== t && t && (h.waveformData = {
                    left: t.split(","),
                    right: a.split(",")
                }), r.useEQData && void 0 !== n && n && n.leftEQ && (e = n.leftEQ.split(","), h.eqData = e, h.eqData.left = e, void 0 !== n.rightEQ && n.rightEQ)) && (h.eqData.right = n.rightEQ.split(",")), 1 === h.playState && (h.isHTML5 || 8 !== p || h.position || !h.isBuffering || h._onbufferchange(0), r.whileplaying && r.whileplaying.apply(h)), !0)
            }, this._oncaptiondata = function(e) {
                h.captiondata = e, h._iO.oncaptiondata && h._iO.oncaptiondata.apply(h)
            }, this._onmetadata = function(e, o) {
                var t, a, n = {};
                for (t = 0, a = e.length; t < a; t++) n[e[t]] = o[t];
                h.metadata = n, h._iO.onmetadata && h._iO.onmetadata.apply(h)
            }, this._onid3 = function(e, o) {
                var t, a, n = [];
                for (t = 0, a = e.length; t < a; t++) n[e[t]] = o[t];
                h.id3 = f(h.id3, n), h._iO.onid3 && h._iO.onid3.apply(h)
            }, this._onconnect = function(e) {
                e = 1 === e, (h.connected = e) && (h.failures = 0, X(h.id) && (h.getAutoPlay() ? h.play(void 0, h.getAutoPlay()) : h._iO.autoLoad && h.load()), h._iO.onconnect && h._iO.onconnect.apply(h, [e]))
            }, this._ondataerror = function() {
                0 < h.playState && h._iO.ondataerror && h._iO.ondataerror.apply(h)
            }
        }, L = function() {
            return eg.body || eg._docElement || eg.getElementsByTagName("div")[0]
        }, u = function(e) {
            return eg.getElementById(e)
        }, f = function(e, o) {
            var t, a, n = e || {};
            for (a in t = void 0 === o ? ed.defaultOptions : o) t.hasOwnProperty(a) && void 0 === n[a] && (n[a] = "object" != typeof t[a] || null === t[a] ? t[a] : f(n[a], t[a]));
            return n
        }, b = {
            onready: 1,
            ontimeout: 1,
            defaultOptions: 1,
            flash9Options: 1,
            movieStarOptions: 1
        }, y = function(e, o) {
            var t, a = !0,
                n = void 0 !== o,
                r = ed.setupOptions;
            for (t in e)
                if (e.hasOwnProperty(t)) {
                    if ("object" != typeof e[t] || null === e[t] || e[t] instanceof Array) n && void 0 !== b[o] ? ed[o][t] = e[t] : void 0 !== r[t] ? (ed.setupOptions[t] = e[t], ed[t] = e[t]) : void 0 === b[t] ? (V(x(void 0 === ed[t] ? "setupUndef" : "setupError", t), 2), a = !1) : ed[t] instanceof Function ? ed[t].apply(ed, e[t] instanceof Array ? e[t] : [e[t]]) : ed[t] = e[t];
                    else {
                        if (void 0 !== b[t]) return y(e[t], t);
                        V(x(void 0 === ed[t] ? "setupUndef" : "setupError", t), 2), a = !1
                    }
                } return a
        };
        var e5 = function(e) {
                var e = eS.call(e),
                    o = e.length;
                return ex ? (e[1] = "on" + e[1], 3 < o && e.pop()) : 3 === o && e.push(!1), e
            },
            eU = function(e, o) {
                var t = e.shift(),
                    a = [eF[o]];
                ex ? t[a](e[0], e[1]) : t[a].apply(t, e)
            },
            ex = ec.attachEvent,
            eF = {
                add: ex ? "attachEvent" : "addEventListener",
                remove: ex ? "detachEvent" : "removeEventListener"
            };
        en = {
            add: function() {
                eU(e5(arguments), "add")
            },
            remove: function() {
                eU(e5(arguments), "remove")
            }
        }, e$ = {
            abort: n(function() {}),
            canplay: n(function() {
                var e, o = this._t;
                if (o._html5_canplay) return !0;
                if (o._html5_canplay = !0, o._onbufferchange(0), e = void 0 === o._iO.position || isNaN(o._iO.position) ? null : o._iO.position / 1e3, o.position && this.currentTime !== e) try {
                    this.currentTime = e
                } catch (t) {}
                o._iO._oncanplay && o._iO._oncanplay()
            }),
            canplaythrough: n(function() {
                var e = this._t;
                e.loaded || (e._onbufferchange(0), e._whileloading(e.bytesLoaded, e.bytesTotal, e._get_html5_duration()), e._onload(!0))
            }),
            ended: n(function() {
                this._t._onfinish()
            }),
            error: n(function() {
                this._t._onload(!1)
            }),
            loadeddata: n(function() {
                var e = this._t;
                e._loaded || ek || (e.duration = e._get_html5_duration())
            }),
            loadedmetadata: n(function() {}),
            loadstart: n(function() {
                this._t._onbufferchange(1)
            }),
            play: n(function() {
                this._t._onbufferchange(0)
            }),
            playing: n(function() {
                this._t._onbufferchange(0)
            }),
            progress: n(function(e) {
                var o, t, a = this._t,
                    n = 0,
                    n = e.target.buffered;
                o = e.loaded || 0;
                var r = e.total || 1;
                if (a.buffered = [], n && n.length) {
                    for (o = 0, t = n.length; o < t; o++) a.buffered.push({
                        start: n.start(o),
                        end: n.end(o)
                    });
                    o = (n = n.end(0) - n.start(0)) / e.target.duration
                }
                isNaN(o) || (a._onbufferchange(0), a._whileloading(o, r, a._get_html5_duration()), o && r && o === r && e$.canplaythrough.call(this, e))
            }),
            ratechange: n(function() {}),
            suspend: n(function(e) {
                var o = this._t;
                e$.progress.call(this, e), o._onsuspend()
            }),
            stalled: n(function() {}),
            timeupdate: n(function() {
                this._t._onTimer()
            }),
            waiting: n(function() {
                this._t._onbufferchange(1)
            })
        }, Z = function(e) {
            return !(e.serverURL || e.type && a(e.type)) && (e.type ? Q({
                type: e.type
            }) : Q({
                url: e.url
            }) || ed.html5Only)
        }, eo = function(e, o) {
            e && (e.src = o)
        }, Q = function(e) {
            if (!ed.useHTML5Audio || !ed.hasHTML5) return !1;
            var o, t = e.url || null,
                e = e.type || null,
                n = ed.audioFormats;
            if (e && void 0 !== ed.html5[e]) return ed.html5[e] && !a(e);
            if (!ee) {
                for (o in ee = [], n) n.hasOwnProperty(o) && (ee.push(o), n[o].related && (ee = ee.concat(n[o].related)));
                ee = RegExp("\\.(" + ee.join("|") + ")(\\?.*)?$", "i")
            }
            return (o = t ? t.toLowerCase().match(ee) : null) && o.length ? o = o[1] : e && (o = (-1 !== (t = e.indexOf(";")) ? e.substr(0, t) : e).substr(6)), o && void 0 !== ed.html5[o] ? t = ed.html5[o] && !a(o) : (e = "audio/" + o, t = ed.html5.canPlayType({
                type: e
            }), t = (ed.html5[o] = t) && ed.html5[e] && !a(e)), t
        }, ea = function() {
            function e(e) {
                var o, t, a = o = !1;
                if (!n || "function" != typeof n.canPlayType) return o;
                if (e instanceof Array) {
                    for (o = 0, t = e.length; o < t && !a; o++)(ed.html5[e[o]] || n.canPlayType(e[o]).match(ed.html5Test)) && (a = !0, ed.html5[e[o]] = !0, ed.flash[e[o]] = !!e[o].match(ew));
                    o = a
                } else o = !(!(e = !!n && "function" == typeof n.canPlayType && n.canPlayType(e)) || !e.match(ed.html5Test));
                return o
            }
            if (!ed.useHTML5Audio || "undefined" == typeof Audio) return !1;
            var o, t, a, n = "undefined" != typeof Audio ? eR ? new Audio(null) : new Audio : null,
                r = {};
            for (o in a = ed.audioFormats)
                if (a.hasOwnProperty(o) && (t = "audio/" + o, r[o] = e(a[o].type), r[t] = r[o], o.match(ew) ? (ed.flash[o] = !0, ed.flash[t] = !0) : (ed.flash[o] = !1, ed.flash[t] = !1), a[o] && a[o].related))
                    for (t = a[o].related.length - 1; 0 <= t; t--) r["audio/" + a[o].related[t]] = r[o], ed.html5[a[o].related[t]] = r[o], ed.flash[a[o].related[t]] = r[o];
            return r.canPlayType = n ? e : null, ed.html5 = f(ed.html5, r), !0
        }, x = function() {}, j = function(e) {
            return 8 === p && 1 < e.loops && e.stream && (e.stream = !1), e
        }, H = function(e) {
            return e && !e.usePolicyFile && (e.onid3 || e.usePeakData || e.useWaveformData || e.useEQData) && (e.usePolicyFile = !0), e
        }, V = function() {}, _ = function() {
            return !1
        }, G = function(e) {
            for (var o in e) e.hasOwnProperty(o) && "function" == typeof e[o] && (e[o] = _)
        }, B = function(e) {
            void 0 === e && (e = !1), (e0 || e) && ed.disable(e)
        }, U = function(e) {
            if (e) {
                if (e.match(/\.swf(\?.*)?$/i)) {
                    if (e.substr(e.toLowerCase().lastIndexOf(".swf?") + 4)) return e
                } else e.lastIndexOf("/") !== e.length - 1 && (e += "/")
            }
            return e = (e && -1 !== e.lastIndexOf("/") ? e.substr(0, e.lastIndexOf("/") + 1) : "./") + ed.movieURL, ed.noSWFCache && (e += "?ts=" + (new Date).getTime()), e
        }, O = function() {
            8 !== (p = parseInt(ed.flashVersion, 10)) && 9 !== p && (ed.flashVersion = p = 8);
            var e = ed.debugMode || ed.debugFlash ? "_debug.swf" : ".swf";
            ed.useHTML5Audio && !ed.html5Only && ed.audioFormats.mp4.required && 9 > p && (ed.flashVersion = p = 9), ed.version = ed.versionNumber + (ed.html5Only ? " (HTML5-only mode)" : 9 === p ? " (AS3/Flash 9)" : " (AS2/Flash 8)"), 8 < p ? (ed.defaultOptions = f(ed.defaultOptions, ed.flash9Options), ed.features.buffering = !0, ed.defaultOptions = f(ed.defaultOptions, ed.movieStarOptions), ed.filePatterns.flash9 = RegExp("\\.(mp3|" + eG.join("|") + ")(\\?.*)?$", "i"), ed.features.movieStar = !0) : ed.features.movieStar = !1, ed.filePattern = ed.filePatterns[8 !== p ? "flash9" : "flash8"], ed.movieURL = (8 === p ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", e), ed.features.peakData = ed.features.waveformData = ed.features.eqData = 8 < p
        }, w = function(e, o) {
            if (!eu) return !1;
            eu._setPolling(e, o)
        }, M = function() {
            ed.debugURLParam.test(eh) && (ed.debugMode = !0)
        }, X = this.getSoundById, Y = function() {
            var e = [];
            return ed.debugMode && e.push("sm2_debug"), ed.debugFlash && e.push("flash_debug"), ed.useHighPerformance && e.push("high_performance"), e.join(" ")
        }, F = function() {
            x("fbHandler");
            var e = ed.getMoviePercent(),
                o = {
                    type: "FLASHBLOCK"
                };
            if (ed.html5Only) return !1;
            ed.ok() ? ed.oMC && (ed.oMC.className = [Y(), "movieContainer", "swf_loaded" + (ed.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (eT && (ed.oMC.className = Y() + " movieContainer " + (null === e ? "swf_timedout" : "swf_error")), ed.didFlashBlock = !0, v({
                type: "ontimeout",
                ignoreInit: !0,
                error: o
            }), N(o))
        }, E = function(e, o, t) {
            void 0 === ep[e] && (ep[e] = []), ep[e].push({
                method: o,
                scope: t || null,
                fired: !1
            })
        }, v = function(e) {
            if (e || (e = {
                    type: ed.ok() ? "onready" : "ontimeout"
                }), !ef && e && !e.ignoreInit || "ontimeout" === e.type && (ed.ok() || e0 && !e.ignoreInit)) return !1;
            var o, t = {
                    success: e && e.ignoreInit ? ed.ok() : !e0
                },
                a = e && e.type && ep[e.type] || [],
                n = [],
                t = [t],
                r = eT && ed.useFlashBlock && !ed.ok();
            for (e.error && (t[0].error = e.error), e = 0, o = a.length; e < o; e++) !0 !== a[e].fired && n.push(a[e]);
            if (n.length)
                for (e = 0, o = n.length; e < o; e++) n[e].scope ? n[e].method.apply(n[e].scope, t) : n[e].method.apply(this, t), r || (n[e].fired = !0);
            return !0
        }, A = function() {
            ec.setTimeout(function() {
                ed.useFlashBlock && F(), v(), "function" == typeof ed.onload && ed.onload.apply(ec), ed.waitForWindowLoad && en.add(ec, "load", A)
            }, 1)
        }, er = function() {
            if (void 0 !== ei) return ei;
            var e, o = !1,
                t = navigator,
                a = t.plugins,
                n = ec.ActiveXObject;
            if (a && a.length)(t = t.mimeTypes) && t["application/x-shockwave-flash"] && t["application/x-shockwave-flash"].enabledPlugin && t["application/x-shockwave-flash"].enabledPlugin.description && (o = !0);
            else if (void 0 !== n) {
                try {
                    e = new n("ShockwaveFlash.ShockwaveFlash")
                } catch (r) {}
                o = !!e
            }
            return ei = o
        }, z = function() {
            var e, o, t = ed.audioFormats;
            if (eD && e_.match(/os (1|2|3_0|3_1)/i) ? (ed.hasHTML5 = !1, ed.html5Only = !0, ed.oMC && (ed.oMC.style.display = "none")) : ed.useHTML5Audio && (ed.hasHTML5 = !!ed.html5 && !!ed.html5.canPlayType), ed.useHTML5Audio && ed.hasHTML5)
                for (o in t) t.hasOwnProperty(o) && (t[o].required && !ed.html5.canPlayType(t[o].type) || ed.preferFlash && (ed.flash[o] || ed.flash[t[o].type])) && (e = !0);
            return ed.ignoreFlash && (e = !1), ed.html5Only = ed.hasHTML5 && ed.useHTML5Audio && !e, !ed.html5Only
        }, J = function(e) {
            var o, t, a = 0;
            if (e instanceof Array) {
                for (o = 0, t = e.length; o < t; o++)
                    if (e[o] instanceof Object) {
                        if (ed.canPlayMIME(e[o].type)) {
                            a = o;
                            break
                        }
                    } else if (ed.canPlayURL(e[o])) {
                    a = o;
                    break
                }
                e[a].url && (e[a] = e[a].url), e = e[a]
            }
            return e
        }, K = function(e) {
            e._hasTimer || (e._hasTimer = !0, !eI && ed.html5PollingInterval && (null === eA && 0 === e2 && (eA = ec.setInterval(W, ed.html5PollingInterval)), e2++))
        }, q = function(e) {
            e._hasTimer && (e._hasTimer = !1, !eI && ed.html5PollingInterval && e2--)
        }, W = function() {
            var e;
            if (null !== eA && !e2) return ec.clearInterval(eA), eA = null, !1;
            for (e = ed.soundIDs.length - 1; 0 <= e; e--) ed.sounds[ed.soundIDs[e]].isHTML5 && ed.sounds[ed.soundIDs[e]]._hasTimer && ed.sounds[ed.soundIDs[e]]._onTimer()
        }, N = function(e) {
            e = void 0 !== e ? e : {}, "function" == typeof ed.onerror && ed.onerror.apply(ec, [{
                type: void 0 !== e.type ? e.type : null
            }]), void 0 !== e.fatal && e.fatal && ed.disable()
        }, es = function() {
            if (!eL || !er()) return !1;
            var e, o, t = ed.audioFormats;
            for (o in t)
                if (t.hasOwnProperty(o) && ("mp3" === o || "mp4" === o) && (ed.html5[o] = !1, t[o] && t[o].related))
                    for (e = t[o].related.length - 1; 0 <= e; e--) ed.html5[t[o].related[e]] = !1
        }, this._setSandboxType = function() {}, this._externalInterfaceOK = function() {
            if (ed.swfLoaded) return !1;
            (new Date).getTime(), ed.swfLoaded = !0, eN = !1, eL && es(), setTimeout(h, eC ? 100 : 1)
        }, P = function(e, o) {
            function t(e, o) {
                return '<param name="' + e + '" value="' + o + '" />'
            }
            if (em && e8) return !1;
            if (ed.html5Only) return O(), ed.oMC = u(ed.movieID), h(), e8 = em = !0, !1;
            var a, n = o || ed.url,
                r = ed.altURL || n;
            a = L();
            var s, d, _, c = Y(),
                p = null,
                p = (p = eg.getElementsByTagName("html")[0]) && p.dir && p.dir.match(/rtl/i),
                e = void 0 === e ? ed.id : e;
            if (O(), ed.url = U(eM ? n : r), o = ed.url, ed.wmode = !ed.wmode && ed.useHighPerformance ? "transparent" : ed.wmode, null !== ed.wmode && (e_.match(/msie 8/i) || !eC && !ed.useHighPerformance) && navigator.platform.match(/win32|win64/i) && (ed.wmode = null), a = {
                    name: e,
                    id: e,
                    src: o,
                    quality: "high",
                    allowScriptAccess: ed.allowScriptAccess,
                    bgcolor: ed.bgColor,
                    pluginspage: e6 + "www.macromedia.com/go/getflashplayer",
                    title: "JS/Flash audio component (SoundManager 2)",
                    type: "application/x-shockwave-flash",
                    wmode: ed.wmode,
                    hasPriority: "true"
                }, ed.debugFlash && (a.FlashVars = "debug=1"), ed.wmode || delete a.wmode, eC) n = eg.createElement("div"), d = ['<object id="' + e + '" data="' + o + '" type="' + a.type + '" title="' + a.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + e6 + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', t("movie", o), t("AllowScriptAccess", ed.allowScriptAccess), t("quality", a.quality), ed.wmode ? t("wmode", ed.wmode) : "", t("bgcolor", ed.bgColor), t("hasPriority", "true"), ed.debugFlash ? t("FlashVars", a.FlashVars) : "", "</object>"].join("");
            else
                for (s in n = eg.createElement("embed"), a) a.hasOwnProperty(s) && n.setAttribute(s, a[s]);
            if (M(), c = Y(), a = L()) {
                if (ed.oMC = u(ed.movieID) || eg.createElement("div"), ed.oMC.id) _ = ed.oMC.className, ed.oMC.className = (_ ? _ + " " : "movieContainer") + (c ? " " + c : ""), ed.oMC.appendChild(n), eC && ((s = ed.oMC.appendChild(eg.createElement("div"))).className = "sm2-object-box", s.innerHTML = d), e8 = !0;
                else {
                    if (ed.oMC.id = ed.movieID, ed.oMC.className = "movieContainer " + c, s = c = null, !ed.useFlashBlock && (ed.useHighPerformance ? c = {
                            position: "fixed",
                            width: "8px",
                            height: "8px",
                            bottom: "0px",
                            left: "0px",
                            overflow: "hidden"
                        } : (c = {
                            position: "absolute",
                            width: "6px",
                            height: "6px",
                            top: "-9999px",
                            left: "-9999px"
                        }, p && (c.left = Math.abs(parseInt(c.left, 10)) + "px"))), e3 && (ed.oMC.style.zIndex = 1e4), !ed.debugFlash)
                        for (_ in c) c.hasOwnProperty(_) && (ed.oMC.style[_] = c[_]);
                    try {
                        eC || ed.oMC.appendChild(n), a.appendChild(ed.oMC), eC && ((s = ed.oMC.appendChild(eg.createElement("div"))).className = "sm2-object-box", s.innerHTML = d), e8 = !0
                    } catch (m) {
                        throw Error(x("domError") + " \n" + m.toString())
                    }
                }
            }
            return em = !0
        }, C = function() {
            return ed.html5Only ? (P(), !1) : !eu && ((eu = ed.getMovie(ed.id)) || (ey ? (eC ? ed.oMC.innerHTML = eb : ed.oMC.appendChild(ey), ey = null, em = !0) : P(ed.id, ed.url), eu = ed.getMovie(ed.id)), "function" == typeof ed.oninitmovie && setTimeout(ed.oninitmovie, 1), !0)
        }, T = function() {
            setTimeout(S, 1e3)
        }, S = function() {
            var e, o = !1;
            return !eE && (eE = !0, en.remove(ec, "load", T), (!eN || !!eP) && void(ef || 0 < (e = ed.getMoviePercent()) && 100 > e && (o = !0), setTimeout(function() {
                if (e = ed.getMoviePercent(), o) return eE = !1, ec.setTimeout(T, 1), !1;
                !ef && e4 && (null === e ? ed.useFlashBlock || 0 === ed.flashLoadTimeout ? ed.useFlashBlock && F() : B(!0) : 0 !== ed.flashLoadTimeout && B(!0))
            }, ed.flashLoadTimeout)))
        }, D = function() {
            return eP || !eN ? (en.remove(ec, "focus", D), !0) : (eP = e4 = !0, eE = !1, T(), en.remove(ec, "focus", D), !0)
        }, el = function() {
            var e, o = [];
            if (ed.useHTML5Audio && ed.hasHTML5)
                for (e in ed.audioFormats) ed.audioFormats.hasOwnProperty(e) && o.push(e + ": " + ed.html5[e] + (!ed.html5[e] && ei && ed.flash[e] ? " (using flash)" : ed.preferFlash && ed.flash[e] && ei ? " (preferring flash)" : ed.html5[e] ? "" : " (" + (ed.audioFormats[e].required ? "required, " : "") + "and no flash support)"))
        }, m = function(e) {
            if (ef) return !1;
            if (ed.html5Only) return ef = !0, A(), !0;
            var o, t = !0;
            return (!ed.useFlashBlock || !ed.flashLoadTimeout || ed.getMoviePercent()) && (ef = !0, e0 && (o = {
                type: !ei && eT ? "NO_FLASH" : "INIT_TIMEOUT"
            })), (e0 || e) && (ed.useFlashBlock && ed.oMC && (ed.oMC.className = Y() + " " + (null === ed.getMoviePercent() ? "swf_timedout" : "swf_error")), v({
                type: "ontimeout",
                error: o,
                ignoreInit: !0
            }), N(o), t = !1), e0 || (ed.waitForWindowLoad && !e1 ? en.add(ec, "load", A) : A()), t
        }, c = function() {
            var e, o = ed.setupOptions;
            for (e in o) o.hasOwnProperty(e) && (void 0 === ed[e] ? ed[e] = o[e] : ed[e] !== o[e] && (ed.setupOptions[e] = ed[e]))
        }, h = function() {
            if (ef) return !1;
            if (ed.html5Only) return ef || (en.remove(ec, "load", ed.beginDelayedInit), ed.enabled = !0, m()), !0;
            C();
            try {
                eu._externalInterfaceTest(!1), w(!0, ed.flashPollingInterval || (ed.useHighPerformance ? 10 : 50)), ed.debugMode || eu._disableDebug(), ed.enabled = !0, ed.html5Only || en.add(ec, "unload", _)
            } catch (e) {
                return N({
                    type: "JS_TO_FLASH_EXCEPTION",
                    fatal: !0
                }), B(!0), m(), !1
            }
            return m(), en.remove(ec, "load", ed.beginDelayedInit), !0
        }, k = function() {
            return !I && (I = !0, c(), M(), !ei && ed.hasHTML5 && ed.setup({
                useHTML5Audio: !0,
                preferFlash: !1
            }), ea(), ed.html5.usingFlash = z(), eT = ed.html5.usingFlash, el(), !ei && eT && ed.setup({
                flashLoadTimeout: 1
            }), eg.removeEventListener && eg.removeEventListener("DOMContentLoaded", k, !1), C(), !0)
        }, et = function() {
            return "complete" === eg.readyState && (k(), eg.detachEvent("onreadystatechange", et)), !0
        }, R = function() {
            e1 = !0, en.remove(ec, "load", R)
        }, er(), en.add(ec, "focus", D), en.add(ec, "load", T), en.add(ec, "load", R), eg.addEventListener ? eg.addEventListener("DOMContentLoaded", k, !1) : eg.attachEvent ? eg.attachEvent("onreadystatechange", et) : N({
            type: "NO_DOM2_EVENTS",
            fatal: !0
        }), "complete" === eg.readyState && setTimeout(k, 100)
    }
    var t = null;
    "undefined" != typeof SM2_DEFER && SM2_DEFER || (t = new o), e.SoundManager = o, e.soundManager = t
}(window),
function(e) {
    function o(e) {
        return {
            X: (e = e.split(/\s/))[0],
            Y: e[1]
        }
    }
    var t = e('<div style="background-position: 3px 5px">');
    e.support.backgroundPosition = "3px 5px" === t.css("backgroundPosition"), e.support.backgroundPositionXY = "3px" === t.css("backgroundPositionX");
    var t = null,
        a = ["X", "Y"];
    !e.support.backgroundPosition && e.support.backgroundPositionXY && (e.cssHooks.backgroundPosition = {
        get: function(o) {
            return e.map(a, function(t) {
                return e.css(o, "backgroundPosition" + t)
            }).join(" ")
        },
        set: function(t, n) {
            e.each(a, function(e, a) {
                var r = o(n);
                t.style["backgroundPosition" + a] = r[a]
            })
        }
    }), e.support.backgroundPosition && !e.support.backgroundPositionXY && e.each(a, function(t, a) {
        e.cssHooks["backgroundPosition" + a] = {
            get: function(t) {
                return o(e.css(t, "backgroundPosition"))[a]
            },
            set: function(t, n) {
                var r = o(e.css(t, "backgroundPosition")),
                    s = "X" === a;
                t.style.backgroundPosition = (s ? n : r.X) + " " + (s ? r.Y : n)
            }
        }, e.fx.step["backgroundPosition" + a] = function(o) {
            e.cssHooks["backgroundPosition" + a].set(o.elem, o.now + o.unit)
        }
    })
}(jQuery),
function(e) {
    function o(e) {
        return "number" == typeof e ? parseFloat(e) : -1 != e.indexOf("deg") ? parseInt(e, 10) * (2 * Math.PI / 360) : -1 != e.indexOf("grad") ? parseInt(e, 10) * (Math.PI / 200) : void 0
    }

    function t(t, a) {
        var n, r, s = "matrixFilter" === e.cssProps.transformOrigin;
        if (n = [e.cssHooks.scaleX.get(t), o(e.cssHooks.skewY.get(t)), o(e.cssHooks.skewX.get(t)), e.cssHooks.scaleY.get(t), e.cssHooks.translateX.get(t), e.cssHooks.translateY.get(t)], s) {
            t.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=1,M12=0,M21=0,M22=1,SizingMethod='auto expand')";
            var d = e.cssHooks.transformOriginX.get(t),
                u = e.cssHooks.transformOriginY.get(t),
                d = 0 < d.indexOf("%") ? /[\d]*/.exec(d) / 100 : d,
                u = 0 < u.indexOf("%") ? /[\d]*/.exec(u) / 100 : u,
                _ = t.offsetWidth,
                c = t.offsetHeight
        }
        a = "array" != typeof a || 6 !== a.length ? n : [n[0] * a[0] + n[1] * a[2], n[0] * a[1] + n[1] * a[3], n[2] * a[0] + n[3] * a[2], n[2] * a[1] + n[3] * a[3], a[4], a[5]], (r = e.data(t, "rotate")) && (r = [n = Math.cos(r = o(r)), -(r = Math.sin(r)), r, n], a = [a[0] * r[0] + a[1] * r[2], a[0] * r[1] + a[1] * r[3], a[2] * r[0] + a[3] * r[2], a[2] * r[1] + a[3] * r[3], a[4], a[5]]), t.style.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=" + a[0] + ", ", "M12=" + a[1] + ", ", "M21=" + a[2] + ", ", "M22=" + a[3] + ", ", "SizingMethod='auto expand')"].join(""), s && (s = t.offsetWidth, n = t.offsetHeight, t.style.position = "relative", t.style.left = d * (_ - s) + (parseInt(a[4]) || 0), t.style.top = u * (c - n) + (parseInt(a[5]) || 0))
    }
    var a = document.createElement("div"),
        a = a.style;
    if (e.cssProps.transform = "" === a.MozTransform ? "MozTransform" : "" === a.msTransform ? "msTransform" : "" === a.WebkitTransform ? "WebkitTransform" : "" === a.OTransform ? "OTransform" : "" === a.Transform && "Transform", e.cssProps.transformOrigin = "" === a.MozTransformOrigin ? "MozTransformOrigin" : "" === a.msTransformOrigin ? "msTransformOrigin" : "" === a.WebkitTransformOrigin ? "WebkitTransformOrigin" : "" === a.OTransformOrigin ? "OTransformOrigin" : "" === a.TransformOrigin && "TransformOrigin", e.support.transform = !1 !== e.cssProps.transform || "" === a.filter, e.support.transformOrigin = !1 !== e.cssProps.transformOrigin, e.support.matrixFilter = "" === a.filter && !1 === e.cssProps.transform, a = null, !1 !== e.support.transform) {
        e.cssNumber.skew = e.cssNumber.skewX = e.cssNumber.skewY = e.cssNumber.scale = e.cssNumber.scaleX = e.cssNumber.scaleY = e.cssNumber.rotate = e.cssNumber.matrix = !0, e.cssNumber.transformOrigin = e.cssNumber.transformOriginX = e.cssNumber.transformOriginY = !0, e.support.matrixFilter && (e.cssNumber.transformOrigin = e.cssNumber.transformOriginX = e.cssNumber.transformOriginY = !0, e.cssProps.transformOrigin = "matrixFilter"), e.cssHooks.transform = {
            set: function(o, t) {
                e.support.matrixFilter ? o.style.filter = "" + t : o.style[e.cssProps.transform] = t + "%"
            },
            get: function(o) {
                return e.support.matrixFilter ? o.style.filter : o.style[e.cssProps.transform]
            }
        }, e.cssHooks.transformOrigin = {
            set: function(o, t, a) {
                e.support.matrixFilter ? (t = t.split(","), e.cssHooks.transformOriginX.set(o, t[0]), t.length > 1 && e.cssHooks.transformOriginY.set(o, t[1])) : o.style[e.cssProps.transformOrigin] = "string" == typeof t ? t : t + (a || "%")
            },
            get: function(o) {
                if (e.support.matrixFilter) {
                    var t = e.data(o, "transformOriginX"),
                        o = e.data(o, "transformOriginY");
                    return t && o && t === o ? t : "50%"
                }
                return o.style[e.cssProps.transformOrigin]
            }
        }, e.fx.step.transformOrigin = function(o) {
            e.cssHooks.transformOrigin.set(o.elem, o.now, o.unit)
        }, e.cssHooks.transformOriginX = {
            set: function(o, a, n) {
                e.support.matrixFilter ? (e.data(o, "transformOriginX", n ? a + n : a), t(o)) : o.style[e.cssProps.transformOrigin + "X"] = "string" == typeof a ? a : a + (n || "%")
            },
            get: function(o) {
                if (e.support.matrixFilter) {
                    switch (o = e.data(o, "transformOriginX")) {
                        case "left":
                            return "0%";
                        case "center":
                            return "50%";
                        case "right":
                            return "100%"
                    }
                    return o || "50%"
                }
                return o.style[e.cssProps.transformOrigin + "X"]
            }
        }, e.fx.step.transformOriginX = function(o) {
            e.cssHooks.transformOriginX.set(o.elem, o.now, o.unit)
        }, e.cssHooks.transformOriginY = {
            set: function(o, a, n) {
                e.support.matrixFilter ? (e.data(o, "transformOriginY", n ? a + n : a), t(o)) : o.style[e.cssProps.transformOrigin + "Y"] = "string" == typeof a ? a : a + (n || "%")
            },
            get: function(o) {
                if (e.support.matrixFilter) {
                    switch (o = e.data(o, "transformOriginY")) {
                        case "top":
                            return "0%";
                        case "center":
                            return "50%";
                        case "bottom":
                            return "100%"
                    }
                    return o || "50%"
                }
                return o.style[e.cssProps.transformOrigin + "Y"]
            }
        }, e.fx.step.transformOriginY = function(o) {
            e.cssHooks.transformOriginY.set(o.elem, o.now, o.unit)
        };
        var a = function(e) {
                return e
            },
            n = [
                ["X", "Y"], "X", "Y"
            ];
        jQuery.each([{
            prop: "rotate",
            matrix: [function(e) {
                return Math.cos(e)
            }, function(e) {
                return -Math.sin(e)
            }, function(e) {
                return Math.sin(e)
            }, function(e) {
                return Math.cos(e)
            }],
            unit: "rad",
            subProps: [""],
            fnc: o
        }, {
            prop: "scale",
            matrix: [
                [a, 0, 0, a],
                [a, 0, 0, 1],
                [1, 0, 0, a]
            ],
            unit: "",
            subProps: n,
            fnc: parseFloat,
            _default: 1
        }, {
            prop: "skew",
            matrix: [
                [1, a, a, 1],
                [1, a, 0, 1],
                [1, 0, a, 1]
            ],
            unit: "rad",
            subProps: n,
            fnc: o
        }, {
            prop: "translate",
            matrix: [
                [1, 0, 0, 1, a, a],
                [1, 0, 0, 1, a, 0],
                [1, 0, 0, 1, 0, a]
            ],
            standardUnit: "px",
            subProps: n,
            fnc: parseFloat
        }, {
            prop: "matrix",
            matrix: [
                [a, a, a, a, a, a],
                [a, 0, 0, 1, 0, 0],
                [1, a, 0, 1, 0, 0],
                [1, 0, a, 1, 0, 0],
                [1, 0, 0, a, 0, 0],
                [1, 0, 0, 1, 0, a]
            ],
            subProps: ["ABCDXY".split(""), "A", "B", "C", "D", "X", "Y"],
            fnc: parseFloat
        }], function(o, a) {
            jQuery.each(a.subProps, function(o, n) {
                var r;
                e.isArray(n) ? (r = a.prop, e.cssHooks[r] = {
                    set: function(o, t, a) {
                        jQuery.each(n, function(n, s) {
                            e.cssHooks[r + s].set(o, t, a)
                        })
                    },
                    get: function(o) {
                        var t = [];
                        return jQuery.each(n, function(a, n) {
                            t.push(e.cssHooks[r + n].get(o, t))
                        }), t[0] || t[1]
                    }
                }) : (r = a.prop + n, e.cssHooks[r] = {
                    set: function(o, n, s) {
                        e.data(o, r, s ? n + s : n);
                        var n = a.fnc(s ? n + s : n),
                            d = r,
                            s = a.unit || s || a.standardUnit;
                        if (e.support.matrixFilter) t(o, n);
                        else {
                            e(o.style[e.cssProps.transform].replace(/(?:\,\s|\)|\()/g, "|").split(" ")).each(function(e, o) {
                                "" !== o && (void 0 === _ && (_ = {}), h = (c = o.split("|")).shift(), _[p = /.*[^XY]/.exec(h)[0]] || (_[p] = ["", "", "", "", "", ""]), /Y/.test(h) || (_[p][0] = c[0]), /X/.test(h) || (_[p][1] = c[1]), 6 == c.length && (_[p][2] = c[2], _[p][3] = c[3], _[p][4] = c[4], _[p][5] = c[5]))
                            }), u = void 0 !== _ ? _ : null;
                            var u, _, c, h, p, m, f = /[X|Y]/.exec(d),
                                f = null === f ? "" : f[0] ? f[0] : f,
                                d = /.*[^XY]/.exec(d)[0],
                                s = void 0 === s ? "" : s,
                                y = "",
                                b = !1;
                            if (null !== u)
                                for (var E in u)
                                    if (m = u[E], d === E) "matrix" !== d ? (y += d + "(", y += "X" === f || "" === f ? n + s : "" !== m[0] ? m[0] : e.cssHooks[d + "X"].get(o) + s, y += "Y" === f ? ", " + n + s : "" !== m[1] ? ", " + m[1] : d + "Y" in e.cssHooks ? ", " + e.cssHooks[d + "Y"].get(o) + s : "", y += ") ") : y += n + " ", b = !0;
                                    else {
                                        for (var y = y + (E + "("), v = 0; v < m.length; v++)
                                            if (y += m[v], v < m.length - 1 && "" !== m[v + 1]) y += ", ";
                                            else break;
                                        y += ") "
                                    } b || (y = y + (d + f + "(" + n) + s + ") "), o.style[e.cssProps.transform] = y
                        }
                    },
                    get: function(o) {
                        return (o = e.data(o, r)) && void 0 !== o ? o : a._default || 0
                    }
                }), e.fx.step[r] = function(o) {
                    o.unit = "px" === o.unit && e.cssNumber[r] ? a.standardUnit : o.unit, e.cssHooks[r].set(o.elem, o.now, o.unit)
                }
            })
        }), e.rotate = {
            radToDeg: function(e) {
                return 180 * e / Math.PI
            }
        }
    }
}(jQuery),
function(e) {
    function o(o, t) {
        function a(o) {
            return v.start = y ? o.pageX : o.pageY, d = "auto" == (o = parseInt(f.obj.css(b))) ? 0 : o, e(document).bind("mousemove", s), document.ontouchmove = function(o) {
                e(document).unbind("mousemove"), s(o.touches[0])
            }, e(document).bind("mouseup", r), f.obj.bind("mouseup", r), f.obj[0].ontouchend = document.ontouchend = function(o) {
                e(document).unbind("mouseup"), f.obj.unbind("mouseup"), r(o.touches[0])
            }, !1
        }

        function n(e) {
            1 <= h.ratio || (_ -= (e.wheelDelta ? e.wheelDelta / 120 : -e.detail / 3) * t.wheel, _ = Math.min(h[t.axis] - c[t.axis], Math.max(0, _)), f.obj.css(b, _ / p.ratio), h.obj.css(b, -_), e.preventDefault())
        }

        function r() {
            return e(document).unbind("mousemove", s), e(document).unbind("mouseup", r), f.obj.unbind("mouseup", r), document.ontouchmove = f.obj[0].ontouchend = document.ontouchend = null, !1
        }

        function s(e) {
            return 1 <= h.ratio || (_ = (u = Math.min(m[t.axis] - f[t.axis], Math.max(0, d + ((y ? e.pageX : e.pageY) - v.start)))) * p.ratio, h.obj.css(b, -_), f.obj.css(b, u)), !1
        }
        var d, u, _, c = {
                obj: e(".viewport", o)
            },
            h = {
                obj: e(".overview", o)
            },
            p = {
                obj: e(".scrollbar", o)
            },
            m = {
                obj: e(".track", p.obj)
            },
            f = {
                obj: e(".thumb", p.obj)
            },
            y = "x" == t.axis,
            b = y ? "left" : "top",
            E = y ? "Width" : "Height";
        u = d = 0;
        var v = {};
        return this.update = function(e) {
                c[t.axis] = c.obj[0]["offset" + E], h[t.axis] = h.obj[0]["scroll" + E], h.ratio = c[t.axis] / h[t.axis], p.obj.toggleClass("disable", 1 <= h.ratio), m[t.axis] = "auto" == t.size ? c[t.axis] : t.size, f[t.axis] = Math.min(m[t.axis], Math.max(0, "auto" == t.sizethumb ? m[t.axis] * h.ratio : t.sizethumb)), p.ratio = "auto" == t.sizethumb ? h[t.axis] / m[t.axis] : (h[t.axis] - c[t.axis]) / (m[t.axis] - f[t.axis]), _ = "relative" == e && 1 >= h.ratio ? Math.min(h[t.axis] - c[t.axis], Math.max(0, _)) : 0, _ = "bottom" == e && 1 >= h.ratio ? h[t.axis] - c[t.axis] : isNaN(parseInt(e)) ? _ : parseInt(e), f.obj.css(b, _ / p.ratio), h.obj.css(b, -_), v.start = f.obj.offset()[b], e = E.toLowerCase(), p.obj.css(e, m[t.axis]), m.obj.css(e, m[t.axis]), f.obj.css(e, f[t.axis]), Number(h.obj.css("height").slice(0, -2)) > Number(c.obj.css("height").slice(0, -2)) ? p.obj.show() : p.obj.hide()
            }, this.update(),
            function() {
                f.obj.bind("mousedown", a), f.obj[0].ontouchstart = function(e) {
                    return e.preventDefault(), f.obj.unbind("mousedown"), a(e.touches[0]), !1
                }, m.obj.bind("mouseup", s), t.scroll && this.addEventListener ? (o[0].addEventListener("DOMMouseScroll", n, !1), o[0].addEventListener("mousewheel", n, !1)) : t.scroll && (o[0].onmousewheel = n)
            }(), this
    }
    e.tiny = e.tiny || {}, e.tiny.scrollbar = {
        options: {
            axis: "y",
            wheel: 40,
            scroll: !0,
            size: "auto",
            sizethumb: "auto"
        }
    }, e.fn.tinyscrollbar = function(t) {
        return t = e.extend({}, e.tiny.scrollbar.options, t), this.each(function() {
            e(this).data("tsb", new o(e(this), t))
        }), this
    }, e.fn.tinyscrollbar_update = function(o) {
        return e(this).data("tsb").update(o)
    }
}(jQuery);