(function(a) {
   function b(b, d) {
      function f(a) {
         return h.preferFlash && X && !h.ignoreFlash && "undefined" !== typeof h.flash[a] && h.flash[a]
      }
      function j(a) {
         return function(b) {
            var d = this._t;
            return !d || !d._a ? null : a.call(this, b)
         }
      }
      this.setupOptions = {
         url: b || null,
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
         flashLoadTimeout: 1E3,
         wmode: null,
         allowScriptAccess: "always",
         useFlashBlock: !1,
         useHTML5Audio: !0,
         html5Test: /^(probably|maybe)$/i,
         preferFlash: !0,
         noSWFCache: !1
      };
      this.defaultOptions = {
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
      };
      this.flash9Options = {
         isMovieStar: null,
         usePeakData: !1,
         useWaveformData: !1,
         useEQData: !1,
         onbufferchange: null,
         ondataerror: null
      };
      this.movieStarOptions = {
         bufferTime: 3,
         serverURL: null,
         onconnect: null,
         duration: null
      };
      this.audioFormats = {
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
      };
      this.movieID = "sm2-container";
      this.id = d || "sm2movie";
      this.debugID = "soundmanager-debug";
      this.debugURLParam = /([#?&])debug=1/i;
      this.versionNumber = "V2.97a.20120624";
      this.altURL = this.movieURL = this.version = null;
      this.enabled = this.swfLoaded = !1;
      this.oMC = null;
      this.sounds = {};
      this.soundIDs = [];
      this.didFlashBlock = this.muted = !1;
      this.filePattern = null;
      this.filePatterns = {
         flash8: /\.mp3(\?.*)?$/i,
         flash9: /\.mp3(\?.*)?$/i
      };
      this.features = {
         buffering: !1,
         peakData: !1,
         waveformData: !1,
         eqData: !1,
         movieStar: !1
      };
      this.sandbox = {};
      var m;
      try {
         m = "undefined" !== typeof Audio && "undefined" !== typeof(new Audio).canPlayType
      } catch (k) {
         m = !1
      }
      this.hasHTML5 = m;
      this.html5 = {
         usingFlash: null
      };
      this.flash = {};
      this.ignoreFlash = this.html5Only = !1;
      var p, h = this,
          n = null,
          o, t = navigator.userAgent,
          q = a,
          y = q.location.href.toString(),
          r = document,
          x, A, B, s, K = [],
          L = !1,
          Q = !1,
          E = !1,
          M = !1,
          N = !1,
          I, C, Y, fa, Ea, na, oa, pa, Fa, La, ua, va, sa, R, wa, Ga, Z, ta, D, W, Aa, Ba, S, v = null,
          Ha = null,
          T, aa, ga, ha, qa, ia, F, xa = !1,
          ja = !1,
          Ca, ba, Ia, Da = 0,
          u = null,
          ka, O = null,
          Ma, ya, la, G, z, Na, U, H, Ja = Array.prototype.slice,
          J = !1,
          X, ca, da, ma, Ka, V = t.match(/(ipad|iphone|ipod)/i),
          ea = t.match(/msie/i),
          Oa = t.match(/webkit/i),
          w = t.match(/safari/i) && !t.match(/chrome/i),
          P = t.match(/opera/i),
          ra = t.match(/(mobile|pre\/|xoom)/i) || V,
          za = !y.match(/usehtml5audio/i) && !y.match(/sm2\-ignorebadua/i) && w && !t.match(/silk/i) && t.match(/OS X 10_6_([3-7])/i),
          Ra = "undefined" !== typeof r.hasFocus ? r.hasFocus() : null,
          Pa = w && ("undefined" === typeof r.hasFocus || !r.hasFocus()),
          Ta = !Pa,
          Ua = /(mp3|mp4|mpa|m4a)/i,
          Sa = r.location ? r.location.protocol.match(/http/i) : null,
          Va = !Sa ? "http://" : "",
          Wa = /^\s*audio\/(?:x-)?(?:mpeg4|aac|flv|mov|mp4||m4v|m4a|mp4v|3gp|3g2)\s*(?:$|;)/i,
          Xa = "mpeg4 aac flv mov mp4 m4v f4v m4a mp4v 3gp 3g2".split(" "),
          $a = RegExp("\\.(" + Xa.join("|") + ")(\\?.*)?$", "i");
      this.mimePattern = /^\s*audio\/(?:x-)?(?:mp(?:eg|3))\s*(?:$|;)/i;
      this.useAltURL = !Sa;
      this._global_a = null;
      if (ra && (h.useHTML5Audio = !0, h.preferFlash = !1, V)) J = h.ignoreFlash = !0;
      this.setup = function(a) {
         "undefined" !== typeof a && E && O && h.ok() && ("undefined" !== typeof a.flashVersion || "undefined" !== typeof a.url) && ia(T("setupLate"));
         Y(a);
         return h
      };
      this.supported = this.ok = function() {
         return O ? E && !M : h.useHTML5Audio && h.hasHTML5
      };
      this.getMovie = function(a) {
         return o(a) || r[a] || q[a]
      };
      this.createSound = function(a, b) {
         function d() {
            c = ha(c);
            h.sounds[e.id] = new p(e);
            h.soundIDs.push(e.id);
            return h.sounds[e.id]
         }
         var c = null,
             f = null,
             e = null;
         if (!E || !h.ok()) return ia(void 0), !1;
         "undefined" !== typeof b && (a = {
            id: a,
            url: b
         });
         c = C(a);
         c.url = ka(c.url);
         e = c;
         if (F(e.id, !0)) return h.sounds[e.id];
         if (ya(e)) f = d(), f._setup_html5(e);
         else {
            8 < s && null === e.isMovieStar && (e.isMovieStar = !(!e.serverURL && !(e.type && e.type.match(Wa) || e.url.match($a))));
            e = qa(e, void 0);
            f = d();
            if (8 === s) n._createSound(e.id, e.loops || 1, e.usePolicyFile);
            else if (n._createSound(e.id, e.url, e.usePeakData, e.useWaveformData, e.useEQData, e.isMovieStar, e.isMovieStar ? e.bufferTime : !1, e.loops || 1, e.serverURL, e.duration || null, e.autoPlay, !0, e.autoLoad, e.usePolicyFile), !e.serverURL) f.connected = !0, e.onconnect && e.onconnect.apply(f);
            !e.serverURL && (e.autoLoad || e.autoPlay) && f.load(e)
         }!e.serverURL && e.autoPlay && f.play();
         return f
      };
      this.destroySound = function(a, b) {
         if (!F(a)) return !1;
         var d = h.sounds[a],
             c;
         d._iO = {};
         d.stop();
         d.unload();
         for (c = 0; c < h.soundIDs.length; c++) if (h.soundIDs[c] === a) {
            h.soundIDs.splice(c, 1);
            break
         }
         b || d.destruct(!0);
         delete h.sounds[a];
         return !0
      };
      this.load = function(a, b) {
         return !F(a) ? !1 : h.sounds[a].load(b)
      };
      this.unload = function(a) {
         return !F(a) ? !1 : h.sounds[a].unload()
      };
      this.onposition = this.onPosition = function(a, b, d, c) {
         return !F(a) ? !1 : h.sounds[a].onposition(b, d, c)
      };
      this.clearOnPosition = function(a, b, d) {
         return !F(a) ? !1 : h.sounds[a].clearOnPosition(b, d)
      };
      this.start = this.play = function(a, b) {
         var d = !1;
         return !E || !h.ok() ? (ia("soundManager.play(): " + T(!E ? "notReady" : "notOK")), d) : !F(a) ? (b instanceof Object || (b = {
            url: b
         }), b && b.url && (b.id = a, d = h.createSound(b).play()), d) : h.sounds[a].play(b)
      };
      this.setPosition = function(a, b) {
         return !F(a) ? !1 : h.sounds[a].setPosition(b)
      };
      this.stop = function(a) {
         return !F(a) ? !1 : h.sounds[a].stop()
      };
      this.stopAll = function() {
         for (var a in h.sounds) h.sounds.hasOwnProperty(a) && h.sounds[a].stop()
      };
      this.pause = function(a) {
         return !F(a) ? !1 : h.sounds[a].pause()
      };
      this.pauseAll = function() {
         var a;
         for (a = h.soundIDs.length - 1; 0 <= a; a--) h.sounds[h.soundIDs[a]].pause()
      };
      this.resume = function(a) {
         return !F(a) ? !1 : h.sounds[a].resume()
      };
      this.resumeAll = function() {
         var a;
         for (a = h.soundIDs.length - 1; 0 <= a; a--) h.sounds[h.soundIDs[a]].resume()
      };
      this.togglePause = function(a) {
         return !F(a) ? !1 : h.sounds[a].togglePause()
      };
      this.setPan = function(a, b) {
         return !F(a) ? !1 : h.sounds[a].setPan(b)
      };
      this.setVolume = function(a, b) {
         return !F(a) ? !1 : h.sounds[a].setVolume(b)
      };
      this.mute = function(a) {
         var b = 0;
         "string" !== typeof a && (a = null);
         if (a) return !F(a) ? !1 : h.sounds[a].mute();
         for (b = h.soundIDs.length - 1; 0 <= b; b--) h.sounds[h.soundIDs[b]].mute();
         return h.muted = !0
      };
      this.muteAll = function() {
         h.mute()
      };
      this.unmute = function(a) {
         "string" !== typeof a && (a = null);
         if (a) return !F(a) ? !1 : h.sounds[a].unmute();
         for (a = h.soundIDs.length - 1; 0 <= a; a--) h.sounds[h.soundIDs[a]].unmute();
         h.muted = !1;
         return !0
      };
      this.unmuteAll = function() {
         h.unmute()
      };
      this.toggleMute = function(a) {
         return !F(a) ? !1 : h.sounds[a].toggleMute()
      };
      this.getMemoryUse = function() {
         var a = 0;
         n && 8 !== s && (a = parseInt(n._getMemoryUse(), 10));
         return a
      };
      this.disable = function(a) {
         var b;
         "undefined" === typeof a && (a = !1);
         if (M) return !1;
         M = !0;
         for (b = h.soundIDs.length - 1; 0 <= b; b--) Aa(h.sounds[h.soundIDs[b]]);
         I(a);
         H.remove(q, "load", oa);
         return !0
      };
      this.canPlayMIME = function(a) {
         var b;
         h.hasHTML5 && (b = la({
            type: a
         }));
         !b && O && (b = a && h.ok() ? !! (8 < s && a.match(Wa) || a.match(h.mimePattern)) : null);
         return b
      };
      this.canPlayURL = function(a) {
         var b;
         h.hasHTML5 && (b = la({
            url: a
         }));
         !b && O && (b = a && h.ok() ? !! a.match(h.filePattern) : null);
         return b
      };
      this.canPlayLink = function(a) {
         return "undefined" !== typeof a.type && a.type && h.canPlayMIME(a.type) ? !0 : h.canPlayURL(a.href)
      };
      this.getSoundById = function(a) {
         if (!a) throw Error("soundManager.getSoundById(): sID is null/undefined");
         return h.sounds[a]
      };
      this.onready = function(a, b) {
         if ("function" === typeof a) b || (b = q), Ea("onready", a, b), na();
         else
         throw T("needFunction", "onready");
         return !0
      };
      this.ontimeout = function(a, b) {
         if ("function" === typeof a) b || (b = q), Ea("ontimeout", a, b), na({
            type: "ontimeout"
         });
         else
         throw T("needFunction", "ontimeout");
         return !0
      };
      this._wD = this._writeDebug = function() {
         return !0
      };
      this._debug = function() {};
      this.reboot = function() {
         var a, b;
         for (a = h.soundIDs.length - 1; 0 <= a; a--) h.sounds[h.soundIDs[a]].destruct();
         if (n) try {
            ea && (Ha = n.innerHTML), v = n.parentNode.removeChild(n)
         } catch (d) {}
         Ha = v = O = null;
         h.enabled = wa = E = xa = ja = L = Q = M = h.swfLoaded = !1;
         h.soundIDs = [];
         h.sounds = {};
         n = null;
         for (a in K) if (K.hasOwnProperty(a)) for (b = K[a].length - 1; 0 <= b; b--) K[a][b].fired = !1;
         q.setTimeout(h.beginDelayedInit, 20)
      };
      this.getMoviePercent = function() {
         return n && "undefined" !== typeof n.PercentLoaded ? n.PercentLoaded() : null
      };
      this.beginDelayedInit = function() {
         N = !0;
         sa();
         setTimeout(function() {
            if (ja) return !1;
            Z();
            va();
            return ja = !0
         }, 20);
         pa()
      };
      this.destruct = function() {
         h.disable(!0)
      };
      p = function(a) {
         var b, d, c = this,
             e, f, w, j, k, m, ra = !1,
             p = [],
             za = 0,
             t, q, o = null;
         d = b = null;
         this.sID = this.id = a.id;
         this.url = a.url;
         this._iO = this.instanceOptions = this.options = C(a);
         this.pan = this.options.pan;
         this.volume = this.options.volume;
         this.isHTML5 = !1;
         this._a = null;
         this.id3 = {};
         this._debug = function() {};
         this.load = function(a) {
            var b = null;
            if ("undefined" !== typeof a) c._iO = C(a, c.options), c.instanceOptions = c._iO;
            else if (a = c.options, c._iO = a, c.instanceOptions = c._iO, o && o !== c.url) c._iO.url = c.url, c.url = null;
            c._iO.url || (c._iO.url = c.url);
            c._iO.url = ka(c._iO.url);
            if (c._iO.url === c.url && 0 !== c.readyState && 2 !== c.readyState) return 3 === c.readyState && c._iO.onload && c._iO.onload.apply(c, [ !! c.duration]), c;
            a = c._iO;
            o = c.url;
            c.loaded = !1;
            c.readyState = 1;
            c.playState = 0;
            c.id3 = {};
            if (ya(a)) {
               if (b = c._setup_html5(a), !b._called_load) c._html5_canplay = !1, c._a.src !== a.url && (c._a.src = a.url, c.setPosition(0)), c._a.autobuffer = "auto", c._a.preload = "auto", b._called_load = !0, a.autoPlay && c.play()
            } else
            try {
               c.isHTML5 = !1, c._iO = qa(ha(a)), a = c._iO, 8 === s ? n._load(c.id, a.url, a.stream, a.autoPlay, a.whileloading ? 1 : 0, a.loops || 1, a.usePolicyFile) : n._load(c.id, a.url, !! a.stream, !! a.autoPlay, a.loops || 1, !! a.autoLoad, a.usePolicyFile)
            } catch (d) {
               ta({
                  type: "SMSOUND_LOAD_JS_EXCEPTION",
                  fatal: !0
               })
            }
            return c
         };
         this.unload = function() {
            if (0 !== c.readyState) {
               if (c.isHTML5) {
                  if (j(), c._a) c._a.pause(), z(c._a, "about:blank"), c.url = "about:blank"
               } else 8 === s ? n._unload(c.id, "about:blank") : n._unload(c.id);
               e()
            }
            return c
         };
         this.destruct = function(a) {
            if (c.isHTML5) {
               if (j(), c._a) c._a.pause(), z(c._a), J || w(), c._a._t = null, c._a = null
            } else c._iO.onfailure = null, n._destroySound(c.id);
            a || h.destroySound(c.id, !0)
         };
         this.start = this.play = function(a, b) {
            var d, e;
            e = !0;
            e = null;
            b = "undefined" === typeof b ? !0 : b;
            a || (a = {});
            c._iO = C(a, c._iO);
            c._iO = C(c._iO, c.options);
            c._iO.url = ka(c._iO.url);
            c.instanceOptions = c._iO;
            if (c._iO.serverURL && !c.connected) return c.getAutoPlay() || c.setAutoPlay(!0), c;
            ya(c._iO) && (c._setup_html5(c._iO), k());
            1 === c.playState && !c.paused && ((d = c._iO.multiShot) || (e = c));
            if (null !== e) return e;
            c.loaded || (0 === c.readyState ? (c.isHTML5 || (c._iO.autoPlay = !0), c.load(c._iO)) : 2 === c.readyState && (e = c));
            if (null !== e) return e;
            !c.isHTML5 && (9 === s && 0 < c.position && c.position === c.duration) && (a.position = 0);
            if (c.paused && c.position && 0 < c.position) c.resume();
            else {
               c._iO = C(a, c._iO);
               if (null !== c._iO.from && null !== c._iO.to && 0 === c.instanceCount && 0 === c.playState && !c._iO.serverURL) {
                  d = function() {
                     c._iO = C(a, c._iO);
                     c.play(c._iO)
                  };
                  if (c.isHTML5 && !c._html5_canplay) c.load({
                     _oncanplay: d
                  }), e = !1;
                  else if (!c.isHTML5 && !c.loaded && (!c.readyState || 2 !== c.readyState)) c.load({
                     onload: d
                  }), e = !1;
                  if (null !== e) return e;
                  c._iO = q()
               }(!c.instanceCount || c._iO.multiShotEvents || !c.isHTML5 && 8 < s && !c.getAutoPlay()) && c.instanceCount++;
               c._iO.onposition && 0 === c.playState && m(c);
               c.playState = 1;
               c.paused = !1;
               c.position = "undefined" !== typeof c._iO.position && !isNaN(c._iO.position) ? c._iO.position : 0;
               c.isHTML5 || (c._iO = qa(ha(c._iO)));
               c._iO.onplay && b && (c._iO.onplay.apply(c), ra = !0);
               c.setVolume(c._iO.volume, !0);
               c.setPan(c._iO.pan, !0);
               c.isHTML5 ? (k(), e = c._setup_html5(), c.setPosition(c._iO.position), e.play()) : (e = n._start(c.id, c._iO.loops || 1, 9 === s ? c._iO.position : c._iO.position / 1E3, c._iO.multiShot), 9 === s && !e && c._iO.onplayerror && c._iO.onplayerror.apply(c))
            }
            return c
         };
         this.stop = function(a) {
            var b = c._iO;
            1 === c.playState && (c._onbufferchange(0), c._resetOnPosition(0), c.paused = !1, c.isHTML5 || (c.playState = 0), t(), b.to && c.clearOnPosition(b.to), c.isHTML5 ? c._a && (a = c.position, c.setPosition(0), c.position = a, c._a.pause(), c.playState = 0, c._onTimer(), j()) : (n._stop(c.id, a), b.serverURL && c.unload()), c.instanceCount = 0, c._iO = {}, b.onstop && b.onstop.apply(c));
            return c
         };
         this.setAutoPlay = function(a) {
            c._iO.autoPlay = a;
            c.isHTML5 || (n._setAutoPlay(c.id, a), a && !c.instanceCount && 1 === c.readyState && c.instanceCount++)
         };
         this.getAutoPlay = function() {
            return c._iO.autoPlay
         };
         this.setPosition = function(a) {
            "undefined" === typeof a && (a = 0);
            var b = c.isHTML5 ? Math.max(a, 0) : Math.min(c.duration || c._iO.duration, Math.max(a, 0));
            c.position = b;
            a = c.position / 1E3;
            c._resetOnPosition(c.position);
            c._iO.position = b;
            if (c.isHTML5) {
               if (c._a && c._html5_canplay && c._a.currentTime !== a) try {
                  c._a.currentTime = a, (0 === c.playState || c.paused) && c._a.pause()
               } catch (d) {}
            } else a = 9 === s ? c.position : a, c.readyState && 2 !== c.readyState && n._setPosition(c.id, a, c.paused || !c.playState, c._iO.multiShot);
            c.isHTML5 && c.paused && c._onTimer(!0);
            return c
         };
         this.pause = function(a) {
            if (c.paused || 0 === c.playState && 1 !== c.readyState) return c;
            c.paused = !0;
            c.isHTML5 ? (c._setup_html5().pause(), j()) : (a || "undefined" === typeof a) && n._pause(c.id, c._iO.multiShot);
            c._iO.onpause && c._iO.onpause.apply(c);
            return c
         };
         this.resume = function() {
            var a = c._iO;
            if (!c.paused) return c;
            c.paused = !1;
            c.playState = 1;
            c.isHTML5 ? (c._setup_html5().play(), k()) : (a.isMovieStar && !a.serverURL && c.setPosition(c.position), n._pause(c.id, a.multiShot));
            !ra && a.onplay ? (a.onplay.apply(c), ra = !0) : a.onresume && a.onresume.apply(c);
            return c
         };
         this.togglePause = function() {
            if (0 === c.playState) return c.play({
               position: 9 === s && !c.isHTML5 ? c.position : c.position / 1E3
            }), c;
            c.paused ? c.resume() : c.pause();
            return c
         };
         this.setPan = function(a, b) {
            "undefined" === typeof a && (a = 0);
            "undefined" === typeof b && (b = !1);
            c.isHTML5 || n._setPan(c.id, a);
            c._iO.pan = a;
            b || (c.pan = a, c.options.pan = a);
            return c
         };
         this.setVolume = function(a, b) {
            "undefined" === typeof a && (a = 100);
            "undefined" === typeof b && (b = !1);
            c.isHTML5 ? c._a && (c._a.volume = Math.max(0, Math.min(1, a / 100))) : n._setVolume(c.id, h.muted && !c.muted || c.muted ? 0 : a);
            c._iO.volume = a;
            b || (c.volume = a, c.options.volume = a);
            return c
         };
         this.mute = function() {
            c.muted = !0;
            c.isHTML5 ? c._a && (c._a.muted = !0) : n._setVolume(c.id, 0);
            return c
         };
         this.unmute = function() {
            c.muted = !1;
            var a = "undefined" !== typeof c._iO.volume;
            c.isHTML5 ? c._a && (c._a.muted = !1) : n._setVolume(c.id, a ? c._iO.volume : c.options.volume);
            return c
         };
         this.toggleMute = function() {
            return c.muted ? c.unmute() : c.mute()
         };
         this.onposition = this.onPosition = function(a, b, d) {
            p.push({
               position: parseInt(a, 10),
               method: b,
               scope: "undefined" !== typeof d ? d : c,
               fired: !1
            });
            return c
         };
         this.clearOnPosition = function(a, c) {
            var b, a = parseInt(a, 10);
            if (isNaN(a)) return !1;
            for (b = 0; b < p.length; b++) if (a === p[b].position && (!c || c === p[b].method)) p[b].fired && za--, p.splice(b, 1)
         };
         this._processOnPosition = function() {
            var a, b;
            a = p.length;
            if (!a || !c.playState || za >= a) return !1;
            for (a -= 1; 0 <= a; a--) if (b = p[a], !b.fired && c.position >= b.position) b.fired = !0, za++, b.method.apply(b.scope, [b.position]);
            return !0
         };
         this._resetOnPosition = function(a) {
            var c, b;
            c = p.length;
            if (!c) return !1;
            for (c -= 1; 0 <= c; c--) if (b = p[c], b.fired && a <= b.position) b.fired = !1, za--;
            return !0
         };
         q = function() {
            var a = c._iO,
                b = a.from,
                d = a.to,
                e, f;
            f = function() {
               c.clearOnPosition(d, f);
               c.stop()
            };
            e = function() {
               if (null !== d && !isNaN(d)) c.onPosition(d, f)
            };
            null !== b && !isNaN(b) && (a.position = b, a.multiShot = !1, e());
            return a
         };
         m = function() {
            var a, b = c._iO.onposition;
            if (b) for (a in b) if (b.hasOwnProperty(a)) c.onPosition(parseInt(a, 10), b[a])
         };
         t = function() {
            var a, b = c._iO.onposition;
            if (b) for (a in b) b.hasOwnProperty(a) && c.clearOnPosition(parseInt(a, 10))
         };
         k = function() {
            c.isHTML5 && Ca(c)
         };
         j = function() {
            c.isHTML5 && ba(c)
         };
         e = function(a) {
            a || (p = [], za = 0);
            ra = !1;
            c._hasTimer = null;
            c._a = null;
            c._html5_canplay = !1;
            c.bytesLoaded = null;
            c.bytesTotal = null;
            c.duration = c._iO && c._iO.duration ? c._iO.duration : null;
            c.durationEstimate = null;
            c.buffered = [];
            c.eqData = [];
            c.eqData.left = [];
            c.eqData.right = [];
            c.failures = 0;
            c.isBuffering = !1;
            c.instanceOptions = {};
            c.instanceCount = 0;
            c.loaded = !1;
            c.metadata = {};
            c.readyState = 0;
            c.muted = !1;
            c.paused = !1;
            c.peakData = {
               left: 0,
               right: 0
            };
            c.waveformData = {
               left: [],
               right: []
            };
            c.playState = 0;
            c.position = null;
            c.id3 = {}
         };
         e();
         this._onTimer = function(a) {
            var e, f = !1,
                w = {};
            if (c._hasTimer || a) {
               if (c._a && (a || (0 < c.playState || 1 === c.readyState) && !c.paused)) e = c._get_html5_duration(), e !== b && (b = e, c.duration = e, f = !0), c.durationEstimate = c.duration, e = 1E3 * c._a.currentTime || 0, e !== d && (d = e, f = !0), (f || a) && c._whileplaying(e, w, w, w, w);
               return f
            }
         };
         this._get_html5_duration = function() {
            var a = c._iO,
                b = c._a ? 1E3 * c._a.duration : a ? a.duration : void 0;
            return b && !isNaN(b) && Infinity !== b ? b : a ? a.duration : null
         };
         this._apply_loop = function(a, c) {
            a.loop = 1 < c ? "loop" : ""
         };
         this._setup_html5 = function(a) {
            var a = C(c._iO, a),
                b = decodeURI,
                d = J ? h._global_a : c._a,
                w = b(a.url),
                j = d && d._t ? d._t.instanceOptions : null,
                k;
            if (d) {
               if (d._t) {
                  if (!J && w === b(o)) k = d;
                  else if (J && j.url === a.url && (!o || o === j.url)) k = d;
                  if (k) return c._apply_loop(d, a.loops), k
               }
               J && d._t && d._t.playState && a.url !== j.url && d._t.stop();
               e(j && j.url ? a.url === j.url : o ? o === a.url : !1);
               d.src = a.url;
               o = c.url = a.url;
               d._called_load = !1
            } else if (c._a = a.autoLoad || a.autoPlay ? new Audio(a.url) : P ? new Audio(null) : new Audio, d = c._a, d._called_load = !1, J) h._global_a = d;
            c.isHTML5 = !0;
            c._a = d;
            d._t = c;
            f();
            c._apply_loop(d, a.loops);
            a.autoLoad || a.autoPlay ? c.load() : (d.autobuffer = !1, d.preload = "auto");
            return d
         };
         f = function() {
            if (c._a._added_events) return !1;
            var a;
            c._a._added_events = !0;
            for (a in ma) ma.hasOwnProperty(a) && c._a && c._a.addEventListener(a, ma[a], !1);
            return !0
         };
         w = function() {
            var a;
            c._a._added_events = !1;
            for (a in ma) ma.hasOwnProperty(a) && c._a && c._a.removeEventListener(a, ma[a], !1)
         };
         this._onload = function(a) {
            a = !! a || !c.isHTML5 && 8 === s && c.duration;
            c.loaded = a;
            c.readyState = a ? 3 : 2;
            c._onbufferchange(0);
            c._iO.onload && c._iO.onload.apply(c, [a]);
            return !0
         };
         this._onbufferchange = function(a) {
            if (0 === c.playState || a && c.isBuffering || !a && !c.isBuffering) return !1;
            c.isBuffering = 1 === a;
            c._iO.onbufferchange && c._iO.onbufferchange.apply(c);
            return !0
         };
         this._onsuspend = function() {
            c._iO.onsuspend && c._iO.onsuspend.apply(c);
            return !0
         };
         this._onfailure = function(a, b, d) {
            c.failures++;
            if (c._iO.onfailure && 1 === c.failures) c._iO.onfailure(c, a, b, d)
         };
         this._onfinish = function() {
            var a = c._iO.onfinish;
            c._onbufferchange(0);
            c._resetOnPosition(0);
            if (c.instanceCount) {
               c.instanceCount--;
               if (!c.instanceCount && (t(), c.playState = 0, c.paused = !1, c.instanceCount = 0, c.instanceOptions = {}, c._iO = {}, j(), c.isHTML5)) c.position = 0;
               (!c.instanceCount || c._iO.multiShotEvents) && a && a.apply(c)
            }
         };
         this._whileloading = function(a, b, d, e) {
            var f = c._iO;
            c.bytesLoaded = a;
            c.bytesTotal = b;
            c.duration = Math.floor(d);
            c.bufferLength = e;
            if (f.isMovieStar) c.durationEstimate = c.duration;
            else if (c.durationEstimate = f.duration ? c.duration > f.duration ? c.duration : f.duration : parseInt(c.bytesTotal / c.bytesLoaded * c.duration, 10), "undefined" === typeof c.durationEstimate) c.durationEstimate = c.duration;
            c.isHTML5 || (c.buffered = [{
               start: 0,
               end: c.duration
            }]);
            (3 !== c.readyState || c.isHTML5) && f.whileloading && f.whileloading.apply(c)
         };
         this._whileplaying = function(a, b, d, e, f) {
            var w = c._iO;
            if (isNaN(a) || null === a) return !1;
            c.position = Math.max(0, a);
            c._processOnPosition();
            if (!c.isHTML5 && 8 < s && (w.usePeakData && ("undefined" !== typeof b && b) && (c.peakData = {
               left: b.leftPeak,
               right: b.rightPeak
            }), w.useWaveformData && ("undefined" !== typeof d && d) && (c.waveformData = {
               left: d.split(","),
               right: e.split(",")
            }), w.useEQData && "undefined" !== typeof f && f && f.leftEQ && (a = f.leftEQ.split(","), c.eqData = a, c.eqData.left = a, "undefined" !== typeof f.rightEQ && f.rightEQ))) c.eqData.right = f.rightEQ.split(",");
            1 === c.playState && (!c.isHTML5 && 8 === s && !c.position && c.isBuffering && c._onbufferchange(0), w.whileplaying && w.whileplaying.apply(c));
            return !0
         };
         this._oncaptiondata = function(a) {
            c.captiondata = a;
            c._iO.oncaptiondata && c._iO.oncaptiondata.apply(c)
         };
         this._onmetadata = function(a, b) {
            var d = {},
                e, f;
            e = 0;
            for (f = a.length; e < f; e++) d[a[e]] = b[e];
            c.metadata = d;
            c._iO.onmetadata && c._iO.onmetadata.apply(c)
         };
         this._onid3 = function(a, b) {
            var d = [],
                e, f;
            e = 0;
            for (f = a.length; e < f; e++) d[a[e]] = b[e];
            c.id3 = C(c.id3, d);
            c._iO.onid3 && c._iO.onid3.apply(c)
         };
         this._onconnect = function(a) {
            a = 1 === a;
            if (c.connected = a) c.failures = 0, F(c.id) && (c.getAutoPlay() ? c.play(void 0, c.getAutoPlay()) : c._iO.autoLoad && c.load()), c._iO.onconnect && c._iO.onconnect.apply(c, [a])
         };
         this._ondataerror = function() {
            0 < c.playState && c._iO.ondataerror && c._iO.ondataerror.apply(c)
         }
      };
      Ga = function() {
         return r.body || r._docElement || r.getElementsByTagName("div")[0]
      };
      o = function(a) {
         return r.getElementById(a)
      };
      C = function(a, c) {
         var b = a || {},
             d, e;
         d = "undefined" === typeof c ? h.defaultOptions : c;
         for (e in d) d.hasOwnProperty(e) && "undefined" === typeof b[e] && (b[e] = "object" !== typeof d[e] || null === d[e] ? d[e] : C(b[e], d[e]));
         return b
      };
      fa = {
         onready: 1,
         ontimeout: 1,
         defaultOptions: 1,
         flash9Options: 1,
         movieStarOptions: 1
      };
      Y = function(a, c) {
         var b, d = !0,
             e = "undefined" !== typeof c,
             f = h.setupOptions;
         for (b in a) if (a.hasOwnProperty(b)) if ("object" !== typeof a[b] || null === a[b] || a[b] instanceof Array) e && "undefined" !== typeof fa[c] ? h[c][b] = a[b] : "undefined" !== typeof f[b] ? (h.setupOptions[b] = a[b], h[b] = a[b]) : "undefined" === typeof fa[b] ? (ia(T("undefined" === typeof h[b] ? "setupUndef" : "setupError", b), 2), d = !1) : h[b] instanceof Function ? h[b].apply(h, a[b] instanceof Array ? a[b] : [a[b]]) : h[b] = a[b];
         else if ("undefined" === typeof fa[b]) ia(T("undefined" === typeof h[b] ? "setupUndef" : "setupError", b), 2), d = !1;
         else
         return Y(a[b], b);
         return d
      };
      var Ya = function(a) {
         var a = Ja.call(a),
             c = a.length;
         Qa ? (a[1] = "on" + a[1], 3 < c && a.pop()) : 3 === c && a.push(!1);
         return a
      },
          Za = function(a, c) {
            var b = a.shift(),
                d = [ab[c]];
            if (Qa) b[d](a[0], a[1]);
            else b[d].apply(b, a)
          },
          Qa = q.attachEvent,
          ab = {
            add: Qa ? "attachEvent" : "addEventListener",
            remove: Qa ? "detachEvent" : "removeEventListener"
          };
      H = {
         add: function() {
            Za(Ya(arguments), "add")
         },
         remove: function() {
            Za(Ya(arguments), "remove")
         }
      };
      ma = {
         abort: j(function() {}),
         canplay: j(function() {
            var a = this._t,
                c;
            if (a._html5_canplay) return !0;
            a._html5_canplay = !0;
            a._onbufferchange(0);
            c = "undefined" !== typeof a._iO.position && !isNaN(a._iO.position) ? a._iO.position / 1E3 : null;
            if (a.position && this.currentTime !== c) try {
               this.currentTime = c
            } catch (b) {}
            a._iO._oncanplay && a._iO._oncanplay()
         }),
         canplaythrough: j(function() {
            var a = this._t;
            a.loaded || (a._onbufferchange(0), a._whileloading(a.bytesLoaded, a.bytesTotal, a._get_html5_duration()), a._onload(!0))
         }),
         ended: j(function() {
            this._t._onfinish()
         }),
         error: j(function() {
            this._t._onload(!1)
         }),
         loadeddata: j(function() {
            var a = this._t;
            !a._loaded && !w && (a.duration = a._get_html5_duration())
         }),
         loadedmetadata: j(function() {}),
         loadstart: j(function() {
            this._t._onbufferchange(1)
         }),
         play: j(function() {
            this._t._onbufferchange(0)
         }),
         playing: j(function() {
            this._t._onbufferchange(0)
         }),
         progress: j(function(a) {
            var c = this._t,
                b, d, e = 0,
                e = a.target.buffered;
            b = a.loaded || 0;
            var f = a.total || 1;
            c.buffered = [];
            if (e && e.length) {
               b = 0;
               for (d = e.length; b < d; b++) c.buffered.push({
                  start: e.start(b),
                  end: e.end(b)
               });
               e = e.end(0) - e.start(0);
               b = e / a.target.duration
            }
            isNaN(b) || (c._onbufferchange(0), c._whileloading(b, f, c._get_html5_duration()), b && f && b === f && ma.canplaythrough.call(this, a))
         }),
         ratechange: j(function() {}),
         suspend: j(function(a) {
            var c = this._t;
            ma.progress.call(this, a);
            c._onsuspend()
         }),
         stalled: j(function() {}),
         timeupdate: j(function() {
            this._t._onTimer()
         }),
         waiting: j(function() {
            this._t._onbufferchange(1)
         })
      };
      ya = function(a) {
         return a.serverURL || a.type && f(a.type) ? !1 : a.type ? la({
            type: a.type
         }) : la({
            url: a.url
         }) || h.html5Only
      };
      z = function(a, c) {
         a && (a.src = c)
      };
      la = function(a) {
         if (!h.useHTML5Audio || !h.hasHTML5) return !1;
         var c = a.url || null,
             a = a.type || null,
             b = h.audioFormats,
             d;
         if (a && "undefined" !== typeof h.html5[a]) return h.html5[a] && !f(a);
         if (!G) {
            G = [];
            for (d in b) b.hasOwnProperty(d) && (G.push(d), b[d].related && (G = G.concat(b[d].related)));
            G = RegExp("\\.(" + G.join("|") + ")(\\?.*)?$", "i")
         }
         d = c ? c.toLowerCase().match(G) : null;
         !d || !d.length ? a && (c = a.indexOf(";"), d = (-1 !== c ? a.substr(0, c) : a).substr(6)) : d = d[1];
         d && "undefined" !== typeof h.html5[d] ? c = h.html5[d] && !f(d) : (a = "audio/" + d, c = h.html5.canPlayType({
            type: a
         }), c = (h.html5[d] = c) && h.html5[a] && !f(a));
         return c
      };
      U = function() {
         function a(b) {
            var d, e, f = d = !1;
            if (!c || "function" !== typeof c.canPlayType) return d;
            if (b instanceof Array) {
               d = 0;
               for (e = b.length; d < e && !f; d++) if (h.html5[b[d]] || c.canPlayType(b[d]).match(h.html5Test)) f = !0, h.html5[b[d]] = !0, h.flash[b[d]] = !! b[d].match(Ua);
               d = f
            } else b = c && "function" === typeof c.canPlayType ? c.canPlayType(b) : !1, d = !(!b || !b.match(h.html5Test));
            return d
         }
         if (!h.useHTML5Audio || "undefined" === typeof Audio) return !1;
         var c = "undefined" !== typeof Audio ? P ? new Audio(null) : new Audio : null,
             b, d, e = {},
             f;
         f = h.audioFormats;
         for (b in f) if (f.hasOwnProperty(b) && (d = "audio/" + b, e[b] = a(f[b].type), e[d] = e[b], b.match(Ua) ? (h.flash[b] = !0, h.flash[d] = !0) : (h.flash[b] = !1, h.flash[d] = !1), f[b] && f[b].related)) for (d = f[b].related.length - 1; 0 <= d; d--) e["audio/" + f[b].related[d]] = e[b], h.html5[f[b].related[d]] = e[b], h.flash[f[b].related[d]] = e[b];
         e.canPlayType = c ? a : null;
         h.html5 = C(h.html5, e);
         return !0
      };
      T = function() {};
      ha = function(a) {
         8 === s && (1 < a.loops && a.stream) && (a.stream = !1);
         return a
      };
      qa = function(a) {
         if (a && !a.usePolicyFile && (a.onid3 || a.usePeakData || a.useWaveformData || a.useEQData)) a.usePolicyFile = !0;
         return a
      };
      ia = function() {};
      x = function() {
         return !1
      };
      Aa = function(a) {
         for (var c in a) a.hasOwnProperty(c) && "function" === typeof a[c] && (a[c] = x)
      };
      Ba = function(a) {
         "undefined" === typeof a && (a = !1);
         (M || a) && h.disable(a)
      };
      S = function(a) {
         if (a) if (a.match(/\.swf(\?.*)?$/i)) {
            if (a.substr(a.toLowerCase().lastIndexOf(".swf?") + 4)) return a
         } else a.lastIndexOf("/") !== a.length - 1 && (a += "/");
         a = (a && -1 !== a.lastIndexOf("/") ? a.substr(0, a.lastIndexOf("/") + 1) : "./") + h.movieURL;
         h.noSWFCache && (a += "?ts=" + (new Date).getTime());
         return a
      };
      La = function() {
         s = parseInt(h.flashVersion, 10);
         8 !== s && 9 !== s && (h.flashVersion = s = 8);
         var a = h.debugMode || h.debugFlash ? "_debug.swf" : ".swf";
         h.useHTML5Audio && (!h.html5Only && h.audioFormats.mp4.required && 9 > s) && (h.flashVersion = s = 9);
         h.version = h.versionNumber + (h.html5Only ? " (HTML5-only mode)" : 9 === s ? " (AS3/Flash 9)" : " (AS2/Flash 8)");
         8 < s ? (h.defaultOptions = C(h.defaultOptions, h.flash9Options), h.features.buffering = !0, h.defaultOptions = C(h.defaultOptions, h.movieStarOptions), h.filePatterns.flash9 = RegExp("\\.(mp3|" + Xa.join("|") + ")(\\?.*)?$", "i"), h.features.movieStar = !0) : h.features.movieStar = !1;
         h.filePattern = h.filePatterns[8 !== s ? "flash9" : "flash8"];
         h.movieURL = (8 === s ? "soundmanager2.swf" : "soundmanager2_flash9.swf").replace(".swf", a);
         h.features.peakData = h.features.waveformData = h.features.eqData = 8 < s
      };
      D = function(a, c) {
         if (!n) return !1;
         n._setPolling(a, c)
      };
      W = function() {
         h.debugURLParam.test(y) && (h.debugMode = !0)
      };
      F = this.getSoundById;
      ga = function() {
         var a = [];
         h.debugMode && a.push("sm2_debug");
         h.debugFlash && a.push("flash_debug");
         h.useHighPerformance && a.push("high_performance");
         return a.join(" ")
      };
      aa = function() {
         T("fbHandler");
         var a = h.getMoviePercent(),
             c = {
               type: "FLASHBLOCK"
             };
         if (h.html5Only) return !1;
         h.ok() ? h.oMC && (h.oMC.className = [ga(), "movieContainer", "swf_loaded" + (h.didFlashBlock ? " swf_unblocked" : "")].join(" ")) : (O && (h.oMC.className = ga() + " movieContainer " + (null === a ? "swf_timedout" : "swf_error")), h.didFlashBlock = !0, na({
            type: "ontimeout",
            ignoreInit: !0,
            error: c
         }), ta(c))
      };
      Ea = function(a, c, b) {
         "undefined" === typeof K[a] && (K[a] = []);
         K[a].push({
            method: c,
            scope: b || null,
            fired: !1
         })
      };
      na = function(a) {
         a || (a = {
            type: h.ok() ? "onready" : "ontimeout"
         });
         if (!E && a && !a.ignoreInit || "ontimeout" === a.type && (h.ok() || M && !a.ignoreInit)) return !1;
         var c = {
            success: a && a.ignoreInit ? h.ok() : !M
         },
             b = a && a.type ? K[a.type] || [] : [],
             d = [],
             e, c = [c],
             f = O && h.useFlashBlock && !h.ok();
         a.error && (c[0].error = a.error);
         a = 0;
         for (e = b.length; a < e; a++)!0 !== b[a].fired && d.push(b[a]);
         if (d.length) {
            a = 0;
            for (e = d.length; a < e; a++) if (d[a].scope ? d[a].method.apply(d[a].scope, c) : d[a].method.apply(this, c), !f) d[a].fired = !0
         }
         return !0
      };
      oa = function() {
         q.setTimeout(function() {
            h.useFlashBlock && aa();
            na();
            "function" === typeof h.onload && h.onload.apply(q);
            h.waitForWindowLoad && H.add(q, "load", oa)
         }, 1)
      };
      ca = function() {
         if ("undefined" !== typeof X) return X;
         var a = !1,
             c = navigator,
             b = c.plugins,
             d, e = q.ActiveXObject;
         if (b && b.length)(c = c.mimeTypes) && c["application/x-shockwave-flash"] && c["application/x-shockwave-flash"].enabledPlugin && c["application/x-shockwave-flash"].enabledPlugin.description && (a = !0);
         else if ("undefined" !== typeof e) {
            try {
               d = new e("ShockwaveFlash.ShockwaveFlash")
            } catch (f) {}
            a = !! d
         }
         return X = a
      };
      Ma = function() {
         var a, c, b = h.audioFormats;
         if (V && t.match(/os (1|2|3_0|3_1)/i)) {
            if (h.hasHTML5 = !1, h.html5Only = !0, h.oMC) h.oMC.style.display = "none"
         } else h.useHTML5Audio && (h.hasHTML5 = !h.html5 || !h.html5.canPlayType ? !1 : !0);
         if (h.useHTML5Audio && h.hasHTML5) for (c in b) if (b.hasOwnProperty(c) && (b[c].required && !h.html5.canPlayType(b[c].type) || h.preferFlash && (h.flash[c] || h.flash[b[c].type]))) a = !0;
         h.ignoreFlash && (a = !1);
         h.html5Only = h.hasHTML5 && h.useHTML5Audio && !a;
         return !h.html5Only
      };
      ka = function(a) {
         var c, b, d = 0;
         if (a instanceof Array) {
            c = 0;
            for (b = a.length; c < b; c++) if (a[c] instanceof Object) {
               if (h.canPlayMIME(a[c].type)) {
                  d = c;
                  break
               }
            } else if (h.canPlayURL(a[c])) {
               d = c;
               break
            }
            a[d].url && (a[d] = a[d].url);
            a = a[d]
         }
         return a
      };
      Ca = function(a) {
         a._hasTimer || (a._hasTimer = !0, !ra && h.html5PollingInterval && (null === u && 0 === Da && (u = q.setInterval(Ia, h.html5PollingInterval)), Da++))
      };
      ba = function(a) {
         a._hasTimer && (a._hasTimer = !1, !ra && h.html5PollingInterval && Da--)
      };
      Ia = function() {
         var a;
         if (null !== u && !Da) return q.clearInterval(u), u = null, !1;
         for (a = h.soundIDs.length - 1; 0 <= a; a--) h.sounds[h.soundIDs[a]].isHTML5 && h.sounds[h.soundIDs[a]]._hasTimer && h.sounds[h.soundIDs[a]]._onTimer()
      };
      ta = function(a) {
         a = "undefined" !== typeof a ? a : {};
         "function" === typeof h.onerror && h.onerror.apply(q, [{
            type: "undefined" !== typeof a.type ? a.type : null
         }]);
         "undefined" !== typeof a.fatal && a.fatal && h.disable()
      };
      da = function() {
         if (!za || !ca()) return !1;
         var a = h.audioFormats,
             c, b;
         for (b in a) if (a.hasOwnProperty(b) && ("mp3" === b || "mp4" === b)) if (h.html5[b] = !1, a[b] && a[b].related) for (c = a[b].related.length - 1; 0 <= c; c--) h.html5[a[b].related[c]] = !1
      };
      this._setSandboxType = function() {};
      this._externalInterfaceOK = function() {
         if (h.swfLoaded) return !1;
         (new Date).getTime();
         h.swfLoaded = !0;
         Pa = !1;
         za && da();
         setTimeout(B, ea ? 100 : 1)
      };
      Z = function(a, c) {
         function b(a, c) {
            return '<param name="' + a + '" value="' + c + '" />'
         }
         if (L && Q) return !1;
         if (h.html5Only) return La(), h.oMC = o(h.movieID), B(), Q = L = !0, !1;
         var d = c || h.url,
             e = h.altURL || d,
             f;
         f = Ga();
         var w, j, k = ga(),
             P, m = null,
             m = (m = r.getElementsByTagName("html")[0]) && m.dir && m.dir.match(/rtl/i),
             a = "undefined" === typeof a ? h.id : a;
         La();
         h.url = S(Sa ? d : e);
         c = h.url;
         h.wmode = !h.wmode && h.useHighPerformance ? "transparent" : h.wmode;
         if (null !== h.wmode && (t.match(/msie 8/i) || !ea && !h.useHighPerformance) && navigator.platform.match(/win32|win64/i)) h.wmode = null;
         f = {
            name: a,
            id: a,
            src: c,
            quality: "high",
            allowScriptAccess: h.allowScriptAccess,
            bgcolor: h.bgColor,
            pluginspage: Va + "www.macromedia.com/go/getflashplayer",
            title: "JS/Flash audio component (SoundManager 2)",
            type: "application/x-shockwave-flash",
            wmode: h.wmode,
            hasPriority: "true"
         };
         h.debugFlash && (f.FlashVars = "debug=1");
         h.wmode || delete f.wmode;
         if (ea) d = r.createElement("div"), j = ['<object id="' + a + '" data="' + c + '" type="' + f.type + '" title="' + f.title + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="' + Va + 'download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0">', b("movie", c), b("AllowScriptAccess", h.allowScriptAccess), b("quality", f.quality), h.wmode ? b("wmode", h.wmode) : "", b("bgcolor", h.bgColor), b("hasPriority", "true"), h.debugFlash ? b("FlashVars", f.FlashVars) : "", "</object>"].join("");
         else
         for (w in d = r.createElement("embed"), f) f.hasOwnProperty(w) && d.setAttribute(w, f[w]);
         W();
         k = ga();
         if (f = Ga()) if (h.oMC = o(h.movieID) || r.createElement("div"), h.oMC.id) P = h.oMC.className, h.oMC.className = (P ? P + " " : "movieContainer") + (k ? " " + k : ""), h.oMC.appendChild(d), ea && (w = h.oMC.appendChild(r.createElement("div")), w.className = "sm2-object-box", w.innerHTML = j), Q = !0;
         else {
            h.oMC.id = h.movieID;
            h.oMC.className = "movieContainer " + k;
            w = k = null;
            if (!h.useFlashBlock) if (h.useHighPerformance) k = {
               position: "fixed",
               width: "8px",
               height: "8px",
               bottom: "0px",
               left: "0px",
               overflow: "hidden"
            };
            else if (k = {
               position: "absolute",
               width: "6px",
               height: "6px",
               top: "-9999px",
               left: "-9999px"
            }, m) k.left = Math.abs(parseInt(k.left, 10)) + "px";
            Oa && (h.oMC.style.zIndex = 1E4);
            if (!h.debugFlash) for (P in k) k.hasOwnProperty(P) && (h.oMC.style[P] = k[P]);
            try {
               ea || h.oMC.appendChild(d), f.appendChild(h.oMC), ea && (w = h.oMC.appendChild(r.createElement("div")), w.className = "sm2-object-box", w.innerHTML = j), Q = !0
            } catch (ra) {
               throw Error(T("domError") + " \n" + ra.toString());
            }
         }
         return L = !0
      };
      va = function() {
         if (h.html5Only) return Z(), !1;
         if (n) return !1;
         n = h.getMovie(h.id);
         n || (v ? (ea ? h.oMC.innerHTML = Ha : h.oMC.appendChild(v), v = null, L = !0) : Z(h.id, h.url), n = h.getMovie(h.id));
         "function" === typeof h.oninitmovie && setTimeout(h.oninitmovie, 1);
         return !0
      };
      pa = function() {
         setTimeout(Fa, 1E3)
      };
      Fa = function() {
         var a, c = !1;
         if (xa) return !1;
         xa = !0;
         H.remove(q, "load", pa);
         if (Pa && !Ra) return !1;
         E || (a = h.getMoviePercent(), 0 < a && 100 > a && (c = !0));
         setTimeout(function() {
            a = h.getMoviePercent();
            if (c) return xa = !1, q.setTimeout(pa, 1), !1;
            !E && Ta && (null === a ? h.useFlashBlock || 0 === h.flashLoadTimeout ? h.useFlashBlock && aa() : Ba(!0) : 0 !== h.flashLoadTimeout && Ba(!0))
         }, h.flashLoadTimeout)
      };
      ua = function() {
         if (Ra || !Pa) return H.remove(q, "focus", ua), !0;
         Ra = Ta = !0;
         xa = !1;
         pa();
         H.remove(q, "focus", ua);
         return !0
      };
      Ka = function() {
         var a, c = [];
         if (h.useHTML5Audio && h.hasHTML5) for (a in h.audioFormats) h.audioFormats.hasOwnProperty(a) && c.push(a + ": " + h.html5[a] + (!h.html5[a] && X && h.flash[a] ? " (using flash)" : h.preferFlash && h.flash[a] && X ? " (preferring flash)" : !h.html5[a] ? " (" + (h.audioFormats[a].required ? "required, " : "") + "and no flash support)" : ""))
      };
      I = function(a) {
         if (E) return !1;
         if (h.html5Only) return E = !0, oa(), !0;
         var c = !0,
             b;
         if (!h.useFlashBlock || !h.flashLoadTimeout || h.getMoviePercent()) E = !0, M && (b = {
            type: !X && O ? "NO_FLASH" : "INIT_TIMEOUT"
         });
         if (M || a) h.useFlashBlock && h.oMC && (h.oMC.className = ga() + " " + (null === h.getMoviePercent() ? "swf_timedout" : "swf_error")), na({
            type: "ontimeout",
            error: b,
            ignoreInit: !0
         }), ta(b), c = !1;
         M || (h.waitForWindowLoad && !N ? H.add(q, "load", oa) : oa());
         return c
      };
      A = function() {
         var a, c = h.setupOptions;
         for (a in c) c.hasOwnProperty(a) && ("undefined" === typeof h[a] ? h[a] = c[a] : h[a] !== c[a] && (h.setupOptions[a] = h[a]))
      };
      B = function() {
         if (E) return !1;
         if (h.html5Only) return E || (H.remove(q, "load", h.beginDelayedInit), h.enabled = !0, I()), !0;
         va();
         try {
            n._externalInterfaceTest(!1), D(!0, h.flashPollingInterval || (h.useHighPerformance ? 10 : 50)), h.debugMode || n._disableDebug(), h.enabled = !0, h.html5Only || H.add(q, "unload", x)
         } catch (a) {
            return ta({
               type: "JS_TO_FLASH_EXCEPTION",
               fatal: !0
            }), Ba(!0), I(), !1
         }
         I();
         H.remove(q, "load", h.beginDelayedInit);
         return !0
      };
      sa = function() {
         if (wa) return !1;
         wa = !0;
         A();
         W();
         !X && h.hasHTML5 && h.setup({
            useHTML5Audio: !0,
            preferFlash: !1
         });
         U();
         h.html5.usingFlash = Ma();
         O = h.html5.usingFlash;
         Ka();
         !X && O && h.setup({
            flashLoadTimeout: 1
         });
         r.removeEventListener && r.removeEventListener("DOMContentLoaded", sa, !1);
         va();
         return !0
      };
      Na = function() {
         "complete" === r.readyState && (sa(), r.detachEvent("onreadystatechange", Na));
         return !0
      };
      R = function() {
         N = !0;
         H.remove(q, "load", R)
      };
      ca();
      H.add(q, "focus", ua);
      H.add(q, "load", pa);
      H.add(q, "load", R);
      r.addEventListener ? r.addEventListener("DOMContentLoaded", sa, !1) : r.attachEvent ? r.attachEvent("onreadystatechange", Na) : ta({
         type: "NO_DOM2_EVENTS",
         fatal: !0
      });
      "complete" === r.readyState && setTimeout(sa, 100)
   }
   var d = null;
   if ("undefined" === typeof SM2_DEFER || !SM2_DEFER) d = new b;
   a.SoundManager = b;
   a.soundManager = d
})(window);
(function(a) {
   function b(a) {
      a = a.split(/\s/);
      return {
         X: a[0],
         Y: a[1]
      }
   }
   var d = a('<div style="background-position: 3px 5px">');
   a.support.backgroundPosition = "3px 5px" === d.css("backgroundPosition") ? !0 : !1;
   a.support.backgroundPositionXY = "3px" === d.css("backgroundPositionX") ? !0 : !1;
   var d = null,
       c = ["X", "Y"];
   !a.support.backgroundPosition && a.support.backgroundPositionXY && (a.cssHooks.backgroundPosition = {
      get: function(b) {
         return a.map(c, function(c) {
            return a.css(b, "backgroundPosition" + c)
         }).join(" ")
      },
      set: function(d, f) {
         a.each(c, function(a, c) {
            var k = b(f);
            d.style["backgroundPosition" + c] = k[c]
         })
      }
   });
   a.support.backgroundPosition && !a.support.backgroundPositionXY && a.each(c, function(c, d) {
      a.cssHooks["backgroundPosition" + d] = {
         get: function(c) {
            return b(a.css(c, "backgroundPosition"))[d]
         },
         set: function(c, e) {
            var k = b(a.css(c, "backgroundPosition")),
                p = d === "X";
            c.style.backgroundPosition = (p ? e : k.X) + " " + (p ? k.Y : e)
         }
      };
      a.fx.step["backgroundPosition" + d] = function(c) {
         a.cssHooks["backgroundPosition" + d].set(c.elem, c.now + c.unit)
      }
   })
})(jQuery);
(function(a) {
   function b(a) {
      if ("number" === typeof a) return parseFloat(a);
      if (-1 != a.indexOf("deg")) return parseInt(a, 10) * (2 * Math.PI / 360);
      if (-1 != a.indexOf("grad")) return parseInt(a, 10) * (Math.PI / 200)
   }
   function d(c, d) {
      var e, k, p = "matrixFilter" === a.cssProps.transformOrigin ? !0 : !1;
      e = [a.cssHooks.scaleX.get(c), b(a.cssHooks.skewY.get(c)), b(a.cssHooks.skewX.get(c)), a.cssHooks.scaleY.get(c), a.cssHooks.translateX.get(c), a.cssHooks.translateY.get(c)];
      if (p) {
         c.style.filter = "progid:DXImageTransform.Microsoft.Matrix(M11=1,M12=0,M21=0,M22=1,SizingMethod='auto expand')";
         var h = a.cssHooks.transformOriginX.get(c),
             n = a.cssHooks.transformOriginY.get(c),
             h = 0 < h.indexOf("%") ? /[\d]*/.exec(h) / 100 : h,
             n = 0 < n.indexOf("%") ? /[\d]*/.exec(n) / 100 : n,
             o = c.offsetWidth,
             t = c.offsetHeight
      }
      d = "array" !== typeof d || 6 !== d.length ? e : [e[0] * d[0] + e[1] * d[2], e[0] * d[1] + e[1] * d[3], e[2] * d[0] + e[3] * d[2], e[2] * d[1] + e[3] * d[3], d[4], d[5]];
      if (k = a.data(c, "rotate")) k = b(k), e = Math.cos(k), k = Math.sin(k), k = [e, -k, k, e], d = [d[0] * k[0] + d[1] * k[2], d[0] * k[1] + d[1] * k[3], d[2] * k[0] + d[3] * k[2], d[2] * k[1] + d[3] * k[3], d[4], d[5]];
      c.style.filter = ["progid:DXImageTransform.Microsoft.Matrix(", "M11=" + d[0] + ", ", "M12=" + d[1] + ", ", "M21=" + d[2] + ", ", "M22=" + d[3] + ", ", "SizingMethod='auto expand')"].join("");
      p && (p = c.offsetWidth, e = c.offsetHeight, c.style.position = "relative", c.style.left = h * (o - p) + (parseInt(d[4]) || 0), c.style.top = n * (t - e) + (parseInt(d[5]) || 0))
   }
   var c = document.createElement("div"),
       c = c.style;
   a.cssProps.transform = "" === c.MozTransform ? "MozTransform" : "" === c.msTransform ? "msTransform" : "" === c.WebkitTransform ? "WebkitTransform" : "" === c.OTransform ? "OTransform" : "" === c.Transform ? "Transform" : !1;
   a.cssProps.transformOrigin = "" === c.MozTransformOrigin ? "MozTransformOrigin" : "" === c.msTransformOrigin ? "msTransformOrigin" : "" === c.WebkitTransformOrigin ? "WebkitTransformOrigin" : "" === c.OTransformOrigin ? "OTransformOrigin" : "" === c.TransformOrigin ? "TransformOrigin" : !1;
   a.support.transform = !1 !== a.cssProps.transform || "" === c.filter ? !0 : !1;
   a.support.transformOrigin = !1 !== a.cssProps.transformOrigin ? !0 : !1;
   a.support.matrixFilter = "" === c.filter && !1 === a.cssProps.transform ? !0 : !1;
   c = null;
   if (!1 !== a.support.transform) {
      a.cssNumber.skew = a.cssNumber.skewX = a.cssNumber.skewY = a.cssNumber.scale = a.cssNumber.scaleX = a.cssNumber.scaleY = a.cssNumber.rotate = a.cssNumber.matrix = !0;
      a.cssNumber.transformOrigin = a.cssNumber.transformOriginX = a.cssNumber.transformOriginY = !0;
      a.support.matrixFilter && (a.cssNumber.transformOrigin = a.cssNumber.transformOriginX = a.cssNumber.transformOriginY = !0, a.cssProps.transformOrigin = "matrixFilter");
      a.cssHooks.transform = {
         set: function(c, b) {
            a.support.matrixFilter ? c.style.filter = "" + b : c.style[a.cssProps.transform] = b + "%"
         },
         get: function(c) {
            return a.support.matrixFilter ? c.style.filter : c.style[a.cssProps.transform]
         }
      };
      a.cssHooks.transformOrigin = {
         set: function(c, b, d) {
            if (a.support.matrixFilter) {
               b = b.split(",");
               a.cssHooks.transformOriginX.set(c, b[0]);
               b.length > 1 && a.cssHooks.transformOriginY.set(c, b[1])
            } else c.style[a.cssProps.transformOrigin] = typeof b === "string" ? b : b + (d || "%")
         },
         get: function(c) {
            if (a.support.matrixFilter) {
               var b = a.data(c, "transformOriginX"),
                   c = a.data(c, "transformOriginY");
               return b && c && b === c ? b : "50%"
            }
            return c.style[a.cssProps.transformOrigin]
         }
      };
      a.fx.step.transformOrigin = function(c) {
         a.cssHooks.transformOrigin.set(c.elem, c.now, c.unit)
      };
      a.cssHooks.transformOriginX = {
         set: function(c, b, e) {
            if (a.support.matrixFilter) {
               a.data(c, "transformOriginX", e ? b + e : b);
               d(c)
            } else c.style[a.cssProps.transformOrigin + "X"] = typeof b === "string" ? b : b + (e || "%")
         },
         get: function(c) {
            if (a.support.matrixFilter) {
               c = a.data(c, "transformOriginX");
               switch (c) {
               case "left":
                  return "0%";
               case "center":
                  return "50%";
               case "right":
                  return "100%"
               }
               return c ? c : "50%"
            }
            return c.style[a.cssProps.transformOrigin + "X"]
         }
      };
      a.fx.step.transformOriginX = function(c) {
         a.cssHooks.transformOriginX.set(c.elem, c.now, c.unit)
      };
      a.cssHooks.transformOriginY = {
         set: function(c, b, e) {
            if (a.support.matrixFilter) {
               a.data(c, "transformOriginY", e ? b + e : b);
               d(c)
            } else c.style[a.cssProps.transformOrigin + "Y"] = typeof b === "string" ? b : b + (e || "%")
         },
         get: function(c) {
            if (a.support.matrixFilter) {
               c = a.data(c, "transformOriginY");
               switch (c) {
               case "top":
                  return "0%";
               case "center":
                  return "50%";
               case "bottom":
                  return "100%"
               }
               return c ? c : "50%"
            }
            return c.style[a.cssProps.transformOrigin + "Y"]
         }
      };
      a.fx.step.transformOriginY = function(c) {
         a.cssHooks.transformOriginY.set(c.elem, c.now, c.unit)
      };
      var c = function(a) {
         return a
      },
          e = [
            ["X", "Y"], "X", "Y"];
      jQuery.each([{
         prop: "rotate",
         matrix: [function(a) {
            return Math.cos(a)
         }, function(a) {
            return -Math.sin(a)
         }, function(a) {
            return Math.sin(a)
         }, function(a) {
            return Math.cos(a)
         }],
         unit: "rad",
         subProps: [""],
         fnc: b
      },
      {
         prop: "scale",
         matrix: [
            [c, 0, 0, c],
            [c, 0, 0, 1],
            [1, 0, 0, c]
         ],
         unit: "",
         subProps: e,
         fnc: parseFloat,
         _default: 1
      },
      {
         prop: "skew",
         matrix: [
            [1, c, c, 1],
            [1, c, 0, 1],
            [1, 0, c, 1]
         ],
         unit: "rad",
         subProps: e,
         fnc: b
      },
      {
         prop: "translate",
         matrix: [
            [1, 0, 0, 1, c, c],
            [1, 0, 0, 1, c, 0],
            [1, 0, 0, 1, 0, c]
         ],
         standardUnit: "px",
         subProps: e,
         fnc: parseFloat
      },
      {
         prop: "matrix",
         matrix: [
            [c, c, c, c, c, c],
            [c, 0, 0, 1, 0, 0],
            [1, c, 0, 1, 0, 0],
            [1, 0, c, 1, 0, 0],
            [1, 0, 0, c, 0, 0],
            [1, 0, 0, 1, 0, c]
         ],
         subProps: ["ABCDXY".split(""), "A", "B", "C", "D", "X", "Y"],
         fnc: parseFloat
      }], function(c, b) {
         jQuery.each(b.subProps, function(c, e) {
            var f;
            if (a.isArray(e)) {
               f = b.prop;
               a.cssHooks[f] = {
                  set: function(c, b, d) {
                     jQuery.each(e, function(e, j) {
                        a.cssHooks[f + j].set(c, b, d)
                     })
                  },
                  get: function(c) {
                     var b = [];
                     jQuery.each(e, function(d, e) {
                        b.push(a.cssHooks[f + e].get(c, b))
                     });
                     return b[0] || b[1]
                  }
               }
            } else {
               f = b.prop + e;
               a.cssHooks[f] = {
                  set: function(c, e, k) {
                     a.data(c, f, k ? e + k : e);
                     var e = b.fnc(k ? e + k : e),
                         m = f,
                         k = b.unit || k || b.standardUnit;
                     if (a.support.matrixFilter) d(c, e);
                     else {
                        var q, y, r, x, A;
                        a(c.style[a.cssProps.transform].replace(/(?:\,\s|\)|\()/g, "|").split(" ")).each(function(a, c) {
                           if (c !== "") {
                              y === void 0 && (y = {});
                              r = c.split("|");
                              x = r.shift();
                              A = /.*[^XY]/.exec(x)[0];
                              y[A] || (y[A] = ["", "", "", "", "", ""]);
                              /Y/.test(x) || (y[A][0] = r[0]);
                              /X/.test(x) || (y[A][1] = r[1]);
                              if (r.length == 6) {
                                 y[A][2] = r[2];
                                 y[A][3] = r[3];
                                 y[A][4] = r[4];
                                 y[A][5] = r[5]
                              }
                           }
                        });
                        q = y !== void 0 ? y : null;
                        var B = /[X|Y]/.exec(m),
                            B = B === null ? "" : B[0] ? B[0] : B,
                            m = /.*[^XY]/.exec(m)[0],
                            k = k === void 0 ? "" : k,
                            s = "",
                            K = false,
                            L;
                        if (q !== null) for (var Q in q) {
                           L = q[Q];
                           if (m === Q) {
                              if (m !== "matrix") {
                                 s = s + (m + "(");
                                 s = s + (B === "X" || B === "" ? e + k : L[0] !== "" ? L[0] : a.cssHooks[m + "X"].get(c) + k);
                                 s = s + (B === "Y" ? ", " + e + k : L[1] !== "" ? ", " + L[1] : m + "Y" in a.cssHooks ? ", " + a.cssHooks[m + "Y"].get(c) + k : "");
                                 s = s + ") "
                              } else s = s + (e + " ");
                              K = true
                           } else {
                              for (var s = s + (Q + "("), E = 0; E < L.length; E++) {
                                 s = s + L[E];
                                 if (E < L.length - 1 && L[E + 1] !== "") s = s + ", ";
                                 else
                                 break
                              }
                              s = s + ") "
                           }
                        }
                        K || (s = s + (m + B + "(" + e + k + ") "));
                        c.style[a.cssProps.transform] = s
                     }
                  },
                  get: function(c) {
                     return (c = a.data(c, f)) && c !== void 0 ? c : b._default || 0
                  }
               }
            }
            a.fx.step[f] = function(c) {
               c.unit = c.unit === "px" && a.cssNumber[f] ? b.standardUnit : c.unit;
               a.cssHooks[f].set(c.elem, c.now, c.unit)
            }
         })
      });
      a.rotate = {
         radToDeg: function(a) {
            return a * 180 / Math.PI
         }
      }
   }
})(jQuery);
(function(a) {
   function b(b, c) {
      var e, f;

      function j(c) {
         B.start = y ? c.pageX : c.pageY;
         c = parseInt(q.obj.css(r));
         e = "auto" == c ? 0 : c;
         a(document).bind("mousemove", p);
         document.ontouchmove = function(c) {
            a(document).unbind("mousemove");
            p(c.touches[0])
         };
         a(document).bind("mouseup", k);
         q.obj.bind("mouseup", k);
         q.obj[0].ontouchend = document.ontouchend = function(c) {
            a(document).unbind("mouseup");
            q.obj.unbind("mouseup");
            k(c.touches[0])
         };
         return !1
      }
      function m(a) {
         1 <= n.ratio || (A -= (a.wheelDelta ? a.wheelDelta / 120 : -a.detail / 3) * c.wheel, A = Math.min(n[c.axis] - h[c.axis], Math.max(0, A)), q.obj.css(r, A / o.ratio), n.obj.css(r, -A), a.preventDefault())
      }
      function k() {
         a(document).unbind("mousemove", p);
         a(document).unbind("mouseup", k);
         q.obj.unbind("mouseup", k);
         document.ontouchmove = q.obj[0].ontouchend = document.ontouchend = null;
         return !1
      }
      function p(a) {
         1 <= n.ratio || (f = Math.min(t[c.axis] - q[c.axis], Math.max(0, e + ((y ? a.pageX : a.pageY) - B.start))), A = f * o.ratio, n.obj.css(r, -A), q.obj.css(r, f));
         return !1
      }
      var h = {
         obj: a(".viewport", b)
      },
          n = {
            obj: a(".overview", b)
          },
          o = {
            obj: a(".scrollbar", b)
          },
          t = {
            obj: a(".track", o.obj)
          },
          q = {
            obj: a(".thumb", o.obj)
          },
          y = "x" == c.axis,
          r = y ? "left" : "top",
          x = y ? "Width" : "Height",
          A;
      f = e = 0;
      var B = {};
      this.update = function(a) {
         h[c.axis] = h.obj[0]["offset" + x];
         n[c.axis] = n.obj[0]["scroll" + x];
         n.ratio = h[c.axis] / n[c.axis];
         o.obj.toggleClass("disable", 1 <= n.ratio);
         t[c.axis] = "auto" == c.size ? h[c.axis] : c.size;
         q[c.axis] = Math.min(t[c.axis], Math.max(0, "auto" == c.sizethumb ? t[c.axis] * n.ratio : c.sizethumb));
         o.ratio = "auto" == c.sizethumb ? n[c.axis] / t[c.axis] : (n[c.axis] - h[c.axis]) / (t[c.axis] - q[c.axis]);
         A = "relative" == a && 1 >= n.ratio ? Math.min(n[c.axis] - h[c.axis], Math.max(0, A)) : 0;
         A = "bottom" == a && 1 >= n.ratio ? n[c.axis] - h[c.axis] : isNaN(parseInt(a)) ? A : parseInt(a);
         q.obj.css(r, A / o.ratio);
         n.obj.css(r, -A);
         B.start = q.obj.offset()[r];
         a = x.toLowerCase();
         o.obj.css(a, t[c.axis]);
         t.obj.css(a, t[c.axis]);
         q.obj.css(a, q[c.axis]);
         Number(n.obj.css("height").slice(0, -2)) > Number(h.obj.css("height").slice(0, -2)) ? o.obj.show() : o.obj.hide()
      };
      this.update();
      (function() {
         q.obj.bind("mousedown", j);
         q.obj[0].ontouchstart = function(a) {
            a.preventDefault();
            q.obj.unbind("mousedown");
            j(a.touches[0]);
            return !1
         };
         t.obj.bind("mouseup", p);
         c.scroll && this.addEventListener ? (b[0].addEventListener("DOMMouseScroll", m, !1), b[0].addEventListener("mousewheel", m, !1)) : c.scroll && (b[0].onmousewheel = m)
      })();
      return this
   }
   a.tiny = a.tiny || {};
   a.tiny.scrollbar = {
      options: {
         axis: "y",
         wheel: 40,
         scroll: !0,
         size: "auto",
         sizethumb: "auto"
      }
   };
   a.fn.tinyscrollbar = function(d) {
      d = a.extend({}, a.tiny.scrollbar.options, d);
      this.each(function() {
         a(this).data("tsb", new b(a(this), d))
      });
      return this
   };
   a.fn.tinyscrollbar_update = function(b) {
      return a(this).data("tsb").update(b)
   }
})(jQuery);
var CryptoJS = CryptoJS ||
function(a, b) {
   var d = {},
       c = d.lib = {},
       e = function() {},
       f = c.Base = {
         extend: function(a) {
            e.prototype = this;
            var c = new e;
            a && c.mixIn(a);
            c.hasOwnProperty("init") || (c.init = function() {
               c.$super.init.apply(this, arguments)
            });
            c.init.prototype = c;
            c.$super = this;
            return c
         },
         create: function() {
            var a = this.extend();
            a.init.apply(a, arguments);
            return a
         },
         init: function() {},
         mixIn: function(a) {
            for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
            a.hasOwnProperty("toString") && (this.toString = a.toString)
         },
         clone: function() {
            return this.init.prototype.extend(this)
         }
       },
       j = c.WordArray = f.extend({
         init: function(a, c) {
            a = this.words = a || [];
            this.sigBytes = c != b ? c : 4 * a.length
         },
         toString: function(a) {
            return (a || k).stringify(this)
         },
         concat: function(a) {
            var c = this.words,
                b = a.words,
                d = this.sigBytes,
                a = a.sigBytes;
            this.clamp();
            if (d % 4) for (var e = 0; e < a; e++) c[d + e >>> 2] |= (b[e >>> 2] >>> 24 - 8 * (e % 4) & 255) << 24 - 8 * ((d + e) % 4);
            else if (65535 < b.length) for (e = 0; e < a; e += 4) c[d + e >>> 2] = b[e >>> 2];
            else c.push.apply(c, b);
            this.sigBytes += a;
            return this
         },
         clamp: function() {
            var c = this.words,
                b = this.sigBytes;
            c[b >>> 2] &= 4294967295 << 32 - 8 * (b % 4);
            c.length = a.ceil(b / 4)
         },
         clone: function() {
            var a = f.clone.call(this);
            a.words = this.words.slice(0);
            return a
         },
         random: function(c) {
            for (var b = [], d = 0; d < c; d += 4) b.push(4294967296 * a.random() | 0);
            return new j.init(b, c)
         }
      }),
       m = d.enc = {},
       k = m.Hex = {
         stringify: function(a) {
            for (var c = a.words, a = a.sigBytes, b = [], d = 0; d < a; d++) {
               var e = c[d >>> 2] >>> 24 - 8 * (d % 4) & 255;
               b.push((e >>> 4).toString(16));
               b.push((e & 15).toString(16))
            }
            return b.join("")
         },
         parse: function(a) {
            for (var c = a.length, b = [], d = 0; d < c; d += 2) b[d >>> 3] |= parseInt(a.substr(d, 2), 16) << 24 - 4 * (d % 8);
            return new j.init(b, c / 2)
         }
       },
       p = m.Latin1 = {
         stringify: function(a) {
            for (var c = a.words, a = a.sigBytes, b = [], d = 0; d < a; d++) b.push(String.fromCharCode(c[d >>> 2] >>> 24 - 8 * (d % 4) & 255));
            return b.join("")
         },
         parse: function(a) {
            for (var c = a.length, b = [], d = 0; d < c; d++) b[d >>> 2] |= (a.charCodeAt(d) & 255) << 24 - 8 * (d % 4);
            return new j.init(b, c)
         }
       },
       h = m.Utf8 = {
         stringify: function(a) {
            try {
               return decodeURIComponent(escape(p.stringify(a)))
            } catch (c) {
               throw Error("Malformed UTF-8 data");
            }
         },
         parse: function(a) {
            return p.parse(unescape(encodeURIComponent(a)))
         }
       },
       n = c.BufferedBlockAlgorithm = f.extend({
         reset: function() {
            this._data = new j.init;
            this._nDataBytes = 0
         },
         _append: function(a) {
            "string" == typeof a && (a = h.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes
         },
         _process: function(c) {
            var b = this._data,
                d = b.words,
                e = b.sigBytes,
                f = this.blockSize,
                h = e / (4 * f),
                h = c ? a.ceil(h) : a.max((h | 0) - this._minBufferSize, 0),
                c = h * f,
                e = a.min(4 * c, e);
            if (c) {
               for (var k = 0; k < c; k += f) this._doProcessBlock(d, k);
               k = d.splice(0, c);
               b.sigBytes -= e
            }
            return new j.init(k, e)
         },
         clone: function() {
            var a = f.clone.call(this);
            a._data = this._data.clone();
            return a
         },
         _minBufferSize: 0
      });
   c.Hasher = n.extend({
      cfg: f.extend(),
      init: function(a) {
         this.cfg = this.cfg.extend(a);
         this.reset()
      },
      reset: function() {
         n.reset.call(this);
         this._doReset()
      },
      update: function(a) {
         this._append(a);
         this._process();
         return this
      },
      finalize: function(a) {
         a && this._append(a);
         return this._doFinalize()
      },
      blockSize: 16,
      _createHelper: function(a) {
         return function(c, b) {
            return (new a.init(b)).finalize(c)
         }
      },
      _createHmacHelper: function(a) {
         return function(c, b) {
            return (new o.HMAC.init(a, b)).finalize(c)
         }
      }
   });
   var o = d.algo = {};
   return d
}(Math);
(function(a) {
   for (var b = CryptoJS, d = b.lib, c = d.WordArray, e = d.Hasher, d = b.algo, f = [], j = [], m = function(a) {
      return 4294967296 * (a - (a | 0)) | 0
   }, k = 2, p = 0; 64 > p;) {
      var h;
      a: {
         h = k;
         for (var n = a.sqrt(h), o = 2; o <= n; o++) if (!(h % o)) {
            h = !1;
            break a
         }
         h = !0
      }
      h && (8 > p && (f[p] = m(a.pow(k, 0.5))), j[p] = m(a.pow(k, 1 / 3)), p++);k++
   }
   var t = [],
       d = d.SHA256 = e.extend({
         _doReset: function() {
            this._hash = new c.init(f.slice(0))
         },
         _doProcessBlock: function(a, c) {
            for (var b = this._hash.words, d = b[0], e = b[1], f = b[2], h = b[3], k = b[4], m = b[5], p = b[6], n = b[7], o = 0; 64 > o; o++) {
               if (16 > o) t[o] = a[c + o] | 0;
               else {
                  var N = t[o - 15],
                      I = t[o - 2];
                  t[o] = ((N << 25 | N >>> 7) ^ (N << 14 | N >>> 18) ^ N >>> 3) + t[o - 7] + ((I << 15 | I >>> 17) ^ (I << 13 | I >>> 19) ^ I >>> 10) + t[o - 16]
               }
               N = n + ((k << 26 | k >>> 6) ^ (k << 21 | k >>> 11) ^ (k << 7 | k >>> 25)) + (k & m ^ ~k & p) + j[o] + t[o];
               I = ((d << 30 | d >>> 2) ^ (d << 19 | d >>> 13) ^ (d << 10 | d >>> 22)) + (d & e ^ d & f ^ e & f);
               n = p;
               p = m;
               m = k;
               k = h + N | 0;
               h = f;
               f = e;
               e = d;
               d = N + I | 0
            }
            b[0] = b[0] + d | 0;
            b[1] = b[1] + e | 0;
            b[2] = b[2] + f | 0;
            b[3] = b[3] + h | 0;
            b[4] = b[4] + k | 0;
            b[5] = b[5] + m | 0;
            b[6] = b[6] + p | 0;
            b[7] = b[7] + n | 0
         },
         _doFinalize: function() {
            var c = this._data,
                b = c.words,
                d = 8 * this._nDataBytes,
                e = 8 * c.sigBytes;
            b[e >>> 5] |= 128 << 24 - e % 32;
            b[(e + 64 >>> 9 << 4) + 14] = a.floor(d / 4294967296);
            b[(e + 64 >>> 9 << 4) + 15] = d;
            c.sigBytes = 4 * b.length;
            this._process();
            return this._hash
         },
         clone: function() {
            var a = e.clone.call(this);
            a._hash = this._hash.clone();
            return a
         }
      });
   b.SHA256 = e._createHelper(d);
   b.HmacSHA256 = e._createHmacHelper(d)
})(Math);

function random(a, b) {
   return Math.floor(Math.random() * (b - a + 1) + a)
}
function get_time() {
   return Date.now()
}
function RadToAngle(a) {
   return 180 * a / Math.PI
}
function AngleToRad(a) {
   return a * Math.PI / 180
}
function Vector(a, b) {
   this.ang = a;
   this.size = b;
   this.x = Math.cos(AngleToRad(a)) * b;
   this.y = -Math.sin(AngleToRad(a)) * b
}
function Dist2Points(a, b, d, c) {
   return Math.sqrt((d - a) * (d - a) + (c - b) * (c - b))
}
function Loop(a, b, d) {
   var c = setInterval(function() {
      a()
   }, 1E3 / b);
   setTimeout(function() {
      clearInterval(c)
   }, 1E3 * d)
}

function setCookie(a, b) {
   var d = new Date;
   d.setTime(d.getTime() + 31536E6);
   document.cookie = a + "=" + b + ";expires=" + d.toUTCString()
}
function getCookie(a) {
   return (a = document.cookie.match("(^|;) ?" + a + "=([^;]*)(;|$)")) ? a[2] : null
}
function deleteCookie(a) {
   document.cookie = a + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;"
}
function Commatize(a) {
   return a.toString().replace(/(\d)(?=(\d{3})+$)/g, "$1,")
}
function ArrayRemove(a) {
   a = this.indexOf(a); - 1 != a && this.splice(a, 1)
}

function ArrayUnique() {
   for (var a = [], b = this.length, d = 0; d < b; d++) {
      for (var c = d + 1; c < b; c++) this[d] === this[c] && (c = ++d);
      a.push(this[d])
   }
   return a
}(function(a) {
   a.fn.outerHTML = function(b) {
      return b ? this.before(b).remove() : a("<p>").append(this.eq(0).clone()).html()
   }
})(jQuery);

function DoesFileExist(a, b, d) {
   var c = new Image;
   d && (c.onload = function() {
      d(!0)
   }, c.onerror = function() {
      d(!1)
   }, c.onabort = function() {
      d(!1)
   });
   b && (a += "?" + random(0, 99999999));
   c.src = a
}
text_filter = function(a, b) {
   for (var d = a.toLocaleLowerCase(), c = 0; c < b.length; c++) - 1 != d.indexOf(b[c]) && (d = [], d.length = b[c].length + 1, a = a.replace(RegExp(b[c], "ig"), d.join("*")), d = a.toLocaleLowerCase());
   return a
};
GetBackgroundImageUrl = function(a) {
   return $(a).css("background-image").slice(4, -1).replace(/"/g, "")
};
window.console || (window.console = {
   log: function() {},
   warn: function() {},
   error: function() {},
   debug: function() {}
});
Object.freeze || (Object.freeze = function(a) {
   return a
});
"function" !== typeof Object.create && (Object.create = function(a) {
   function b() {}
   b.prototype = a;
   return new b
});

function EscapeHTML(a) {
   return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;")
}
var g_fillString_cache = {};

function fillString(a, b) {
   if (g_fillString_cache[a] && b <= g_fillString_cache[a].length) return g_fillString_cache[a].slice(0, b);
   var d = "",
       c;
   if (b > 99999) {
      var e = "",
          f = "";
      for (c = 0; c < 500; c++) e = e + a;
      for (c = 0; c < 200; c++) f = f + e;
      var j = 1E5,
          m = b % j,
          k;
      c = 0;
      for (k = b - m; c < k; c = c + j) d = d + f;
      for (c = 0; c < m; c++) d = d + a
   } else if (b > 500) {
      e = "";
      for (c = 0; c < 500; c++) e = e + a;
      j = 500;
      m = b % j;
      c = 0;
      for (k = b - m; c < k; c = c + j) d = d + e;
      for (c = 0; c < m; c++) d = d + a
   } else
   for (c = 0; c < b; c++) d = d + a;
   return g_fillString_cache[a] = d
}
var g_t_start_time;
t0 = function() {
   g_t_start_time = get_time()
};
t1 = function(a) {
   console.log(a ? a + ":" : "TIME:", get_time() - g_t_start_time)
};

function RandomString(a) {
   for (var b = "", d = 0; d < a; d++) b = d > 2 && b[d - 1] != " " && b[d - 2] != " " && random(0, 4) == 0 && d < a - 2 ? b + " " : b + "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62));
   return b
}
shuffle = function(a) {
   for (var b, d, c = a.length; c; b = parseInt(Math.random() * c), d = a[--c], a[c] = a[b], a[b] = d);
   return a
};
var SERVER_TYPE = GetServerType(),
    debug = !1;
"carlosx.byethost15.com" == location.hostname && console && (debug = 1);
if ("https:" == location.protocol && navigator && navigator.userAgent && (-1 != navigator.userAgent.indexOf("MSIE") || -1 != navigator.userAgent.indexOf("Firefox"))) location.href = location.href.replace("https:", "http:");
var STATIC_DIR = "/static/",
    STATIC_DIR2 = "/static/",
    LOCATION_TYPE_UNKNOWN = 0,
    LOCATION_TYPE_CHANNEL = 1,
    LOCATION_TYPE_ROOM = 2,
    ROOM_STATUS_WAITING = 0,
    ROOM_STATUS_FULL = 1,
    ROOM_STATUS_PLAYING = 2,
    GUI_LOCATION_CHANNEL = 1,
    GUI_LOCATION_ROOM = 2,
    GUI_LOCATION_GAME = 3,
    GUI_LOCATION_SHOP = 4,
    ITEM_NONE = -1,
    ITEM_DUAL = 0,
    ITEM_TELEPORT = 1,
    ITEM_CLASS = ["itemDual", "itemTeleport"],
    ITEM_SIZE = [2, 2],
    CHAT_TYPE_NORMAL = 0,
    CHAT_TYPE_DEAD = 2,
    CHAT_TYPE_GOLD = 3,
    CHAT_TYPE_GM = 5,
    CHAT_TYPE_SYSTEM = 6,
    CHAT_TYPE_NORMAL_TEAM = 7,
    CHAT_TYPE_GM_BUGLE = 9,
    MOBILE = Object.freeze({
      ARMOR: 0,
      ICE: 1,
      ADUKA: 2,
      LIGHTNING: 3,
      BIGFOOT: 4,
      JD: 5,
      ASATE: 6,
      RANDOM: 7,
      KNIGHT: 8
   }),
    FIRST_SELECTABLE_MOBILE = MOBILE.ARMOR,
    LAST_SELECTABLE_MOBILE = MOBILE.RANDOM,
    MOBILE_NAME = "Tank Gum Aduka Lightning RedFoot D.J. UFO Random Knight".split(" "),
    EXPLODE = Object.freeze({
      ARMOR1: 0,
      ARMOR2: 1,
      ARMORSS: 2,
      ICE1: 3,
      ICE2: 4,
      ICESS: 5,
      ADUKA1_THOR: 6,
      TELEPORT: 7,
      LIGHTINING12_JD1: 8,
      LIGHTNINGSS: 9,
      BIGFOOT1SS: 10,
      BIGFOOT2: 11,
      JD2: 12,
      JDSS: 13,
      ASATE1: 14,
      ASATE2: 15,
      ASATESS: 16,
      KNIGHT: 17
   }),
    BULLETS = Object.freeze({
      ARMOR1: 0,
      ARMOR2: 1,
      ARMORSS: 2,
      ARMOESS2: 3,
      ICE1: 4,
      ICE2: 5,
      ICESS: 6,
      ADUKA1_THOR: 7,
      ADUKA2: 8,
      ADUKASS: 9,
      TELEPORT: 10,
      LIGHTNING12: 11,
      LIGHTNINGSS: 12,
      BIGFOOT1: 13,
      BIGFOOT2: 14,
      BIGFOOTSS: 15,
      JD1: 16,
      JD2: 17,
      JDSS: 18,
      ASATE1: 19,
      ASATE2: 20,
      ASATESS: 21,
      ASATEION: 22,
      KNIGHT1: 23,
      KNIGHT2: 24,
      KNIGHTSS: 25,
      KNIGHTION: 26
   }),
    MOBILES = [],
    EXPLODES = [],
    BULLET = [],
    AVATAR_TYPE_HEAD = "h",
    AVATAR_TYPE_BODY = "b",
    AVATAR_TYPE_EYES = "g",
    AVATAR_TYPE_FLAG = "f",
    AVATAR_TYPE_BACKGROUND = "1",
    AVATAR_TYPE_FOREGROUND = "2",
    AVATAR_TYPE_EXITEM = "x",
    AVATAR_NAKED_HEAD_MALE = 1,
    AVATAR_NAKED_BODY_MALE = 2,
    AVATAR_NAKED_HEAD_FEMALE = 3,
    AVATAR_NAKED_BODY_FEMALE = 4,
    AVATAR_INDEX_N = 0,
    AVATAR_INDEX_TYPE = 1,
    AVATAR_INDEX_GENDER = 2,
    AVATAR_INDEX_NAME = 3,
    AVATAR_INDEX_DESC = 4,
    AVATAR_INDEX_SHOP = 5,
    AVATAR_INDEX_GOLD_WEEK = 6,
    AVATAR_INDEX_GOLD_MONTH = 7,
    AVATAR_INDEX_GOLD_PERM = 8,
    AVATAR_INDEX_CASH_WEEK = 9,
    AVATAR_INDEX_CASH_MONTH = 10,
    AVATAR_INDEX_CASH_PERM = 11,
    AVATAR_INDEX_STAT_POP = 12,
    AVATAR_INDEX_STAT_TIME = 13,
    AVATAR_INDEX_STAT_ATK = 14,
    AVATAR_INDEX_STAT_DEF = 15,
    AVATAR_INDEX_STAT_LIFE = 16,
    AVATAR_INDEX_STAT_ITEM = 17,
    AVATAR_INDEX_STAT_DIG = 18,
    AVATAR_INDEX_STAT_SHLD = 19,
    AVATAR_INDEX_GRAPHICS = 20,
    AVATAR_INDEX_GLOW = 21,
    AVATAR_INDEX_URL = 22,
    GAME_MODE_NORMAL = 0,
    GAME_MODE_BOSS = 1,
    GAME_MODE_SAME = 2,
    GENDER_MALE = "m",
    GENDER_FEMALE = "f",
    GENDER_ALL = "a",
    MS_IN_1_HOUR = 36E5,
    MS_IN_1_DAY = 24 * MS_IN_1_HOUR,
    POWER_USER_BACKGROUND, POWER_USER_EXITEM, g_graphics_high = !0,
    g_items = [ITEM_DUAL, ITEM_NONE, ITEM_DUAL, ITEM_NONE, ITEM_TELEPORT, ITEM_NONE],
    g_auto_ready_timer, g_ranking_offset = 0,
    g_is_ranking_loading = !1,
    g_is_show_ranking = !0,
    g_shop_player, g_channel_player, g_current_buy_avatar_index, g_current_shop_type, g_current_shop_page, g_bot_select_for_slot, g_is_game_background = 0 != getCookie("background"),
    g_is_game_slice = 0 != getCookie("slice"),
    g_is_ranking_loaded = !1,
    l;

function InitGlobals() {
   MOBILES[MOBILE.ARMOR] = {
      name: "Tank",
      file: "tank",
      player_x: 17,
      player_y: -28,
      explodes: [EXPLODE.ARMOR1, EXPLODE.ARMOR2, EXPLODE.ARMORSS],
      bullets: [BULLETS.ARMOR1, BULLETS.ARMOR2, BULLETS.ARMORSS, BULLETS.ARMOESS2],
      graphics: [
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39],
         [49, 43, 24, 39]
      ]
   };
   MOBILES[MOBILE.ICE] = {
      name: "Gum",
      file: "gum",
      player_x: -5,
      player_y: -40,
      explodes: [EXPLODE.ICE1, EXPLODE.ICE2, EXPLODE.ICESS],
      bullets: [BULLETS.ICE1, BULLETS.ICE2, BULLETS.ICESS],
      graphics: [
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [54, 55, 30, 53],
         [54, 55, 30, 53],
         [55, 55, 30, 53],
         [55, 55, 30, 53],
         [55, 55, 30, 53],
         [55, 55, 30, 53],
         [55, 55, 30, 53],
         [54, 55, 30, 53],
         [54, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53],
         [53, 55, 30, 53]
      ]
   };
   MOBILES[MOBILE.ADUKA] = {
      name: "Aduka",
      file: "aduka",
      player_x: -7,
      player_y: -24,
      explodes: [EXPLODE.ADUKA1_THOR],
      bullets: [BULLETS.ADUKA1_THOR, BULLETS.ADUKA2, BULLETS.ADUKASS],
      graphics: [
         [56, 39, 23, 34],
         [56, 38, 23, 33],
         [56, 36, 24, 31],
         [56, 34, 24, 29],
         [55, 35, 24, 30],
         [55, 35, 24, 30],
         [56, 37, 24, 32],
         [56, 39, 24, 34],
         [56, 40, 24, 35],
         [56, 40, 24, 35],
         [56, 40, 24, 35],
         [56, 39, 24, 34],
         [55, 37, 24, 32],
         [55, 35, 24, 30],
         [55, 35, 24, 30],
         [56, 34, 24, 29],
         [57, 36, 24, 31],
         [56, 37, 23, 32],
         [56, 38, 23, 33],
         [56, 38, 23, 33]
      ]
   };
   MOBILES[MOBILE.LIGHTNING] = {
      name: "Thunder",
      file: "thunder",
      player_x: 3,
      player_y: -37,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.LIGHTNINGSS],
      bullets: [BULLETS.LIGHTNING12, BULLETS.LIGHTNINGSS],
      graphics: [
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40],
         [69, 43, 32, 40]
      ]
   };
   MOBILES[MOBILE.BIGFOOT] = {
      name: "RedFoot",
      file: "redfoot2",
      player_x: 5,
      player_y: -32,
      explodes: [EXPLODE.BIGFOOT1SS, EXPLODE.BIGFOOT2],
      bullets: [BULLETS.BIGFOOT1, BULLETS.BIGFOOT2, BULLETS.BIGFOOTSS],
      graphics: [
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42],
         [76, 47, 28, 42]
      ]
   };
   MOBILES[MOBILE.JD] = {
      name: "D.J",
      file: "dj",
      player_x: 11,
      player_y: -34,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
      bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
      graphics: [
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46],
         [73, 50, 46, 46]
      ]
   };
   MOBILES[MOBILE.ASATE] = {
      name: "UFO",
      file: "ufo",
      player_x: 13,
      player_y: -30,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
      bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
      graphics: [
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48],
         [64, 55, 32, 48]
      ],
      ion_file: "asateIon",
      ion_graphics: [
         [32, 19, 16, 9],
         [32, 18, 16, 9],
         [32, 17, 16, 8],
         [32, 15, 16, 7],
         [32, 14, 16, 7],
         [32, 12, 16, 6],
         [32, 14, 16, 7],
         [32, 17, 16, 9],
         [32, 17, 16, 9],
         [32, 17, 16, 9],
         [32, 14, 16, 7],
         [32, 12, 16, 6],
         [32, 13, 16, 7],
         [32, 15, 16, 8],
         [32, 17, 16, 9],
         [32, 18, 16, 9],
         [32, 19, 16, 10],
         [32, 20, 16, 10],
         [32, 20, 16, 10],
         [32, 20, 16, 10]
      ]
   };
   MOBILES[MOBILE.RANDOM] = {
      name: "Random",
      file: "random2",
      player_x: 8,
      player_y: -38,
      graphics: [
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50],
         [33, 47, 20, 50]
      ]
   };
   MOBILES[MOBILE.KNIGHT] = {
      name: "Knight",
      file: "knight",
      player_x: -6,
      player_y: -38,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
      bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
      graphics: [
         [58, 51, 35, 49],
         [58, 51, 35, 49],
         [59, 51, 36, 49],
         [60, 50, 37, 48],
         [60, 50, 37, 48],
         [62, 50, 38, 48],
         [62, 50, 38, 48],
         [62, 50, 38, 48],
         [63, 50, 38, 48],
         [64, 50, 39, 48],
         [63, 50, 38, 48],
         [62, 50, 38, 48],
         [61, 51, 37, 49],
         [61, 51, 37, 49],
         [60, 51, 36, 49],
         [60, 51, 36, 49],
         [60, 51, 36, 49],
         [58, 51, 35, 49],
         [58, 51, 35, 49],
         [58, 51, 35, 49]
      ],
      ion_file: "knightIon",
      ion_graphics: [
         [32, 15, 16, 8],
         [32, 13, 16, 7],
         [32, 10, 16, 5],
         [32, 7, 16, 3],
         [32, 6, 16, 3],
         [32, 7, 16, 4],
         [32, 10, 16, 5],
         [32, 13, 16, 6],
         [32, 14, 16, 7],
         [32, 16, 16, 8],
         [32, 15, 16, 8],
         [32, 13, 16, 7],
         [32, 10, 16, 5],
         [32, 7, 16, 3],
         [32, 6, 16, 3],
         [32, 7, 16, 4],
         [32, 10, 16, 5],
         [32, 13, 16, 6],
         [32, 14, 16, 7],
         [32, 16, 16, 8]
      ]
   };
   BULLET[BULLETS.ARMOR1] = {
      sound: AUDIO_ARMOR_FIRE
   };
   BULLET[BULLETS.ARMOR2] = {
      sound: AUDIO_ARMOR_FIRE2
   };
   BULLET[BULLETS.ARMORSS] = {
      sound: AUDIO_ARMOR_FIRE2
   };
   BULLET[BULLETS.ARMOESS2] = {
      sound: AUDIO_ARMOR_FIRE2
   };
   BULLET[BULLETS.ICE1] = {
      file: "gum1",
      sound: AUDIO_ICE_FIRE,
      graphics: [
         [24, 14, 6, 7],
         [24, 16, 6, 8],
         [24, 16, 6, 8],
         [24, 14, 6, 7],
         [24, 14, 6, 6],
         [24, 15, 6, 7],
         [24, 15, 6, 7],
         [24, 15, 6, 7],
         [24, 13, 6, 6],
         [24, 14, 6, 6],
         [24, 15, 6, 7],
         [24, 15, 6, 7],
         [24, 16, 6, 7],
         [24, 15, 6, 7],
         [24, 14, 6, 7],
         [24, 14, 6, 7],
         [24, 15, 6, 7],
         [24, 15, 6, 7],
         [24, 14, 6, 7],
         [24, 14, 6, 7]
      ]
   };
   BULLET[BULLETS.ICE2] = {
      file: "gum2",
      sound: AUDIO_ICE_FIRE,
      graphics: [
         [24, 24, 13, 10],
         [24, 22, 13, 9],
         [24, 19, 13, 8],
         [24, 20, 13, 8],
         [24, 22, 13, 9],
         [24, 24, 13, 10],
         [23, 24, 13, 10],
         [22, 24, 12, 10],
         [22, 24, 12, 10],
         [23, 24, 13, 10],
         [23, 24, 13, 10],
         [24, 24, 13, 10]
      ]
   };
   BULLET[BULLETS.ICESS] = {
      file: "gumSS",
      sound: AUDIO_ICE_FIRE,
      graphics: [
         [33, 29, 22, 14],
         [33, 28, 22, 14],
         [33, 25, 23, 13],
         [31, 19, 22, 10],
         [28, 16, 20, 8],
         [28, 21, 19, 10],
         [30, 26, 19, 12],
         [32, 29, 20, 14],
         [33, 29, 21, 14],
         [33, 26, 21, 12],
         [32, 23, 21, 11],
         [30, 17, 20, 8],
         [28, 18, 19, 9],
         [28, 23, 19, 11],
         [31, 27, 21, 13]
      ]
   };
   BULLET[BULLETS.ADUKA1_THOR] = {
      file: "aduka1-thor",
      sound: AUDIO_ADUKA_FIRE,
      graphics: [
         [24, 24, 13, 12],
         [30, 27, 15, 14],
         [34, 31, 16, 19],
         [36, 31, 17, 18],
         [32, 30, 16, 19],
         [34, 31, 16, 19],
         [35, 30, 15, 15],
         [33, 30, 15, 14],
         [35, 30, 15, 12],
         [32, 32, 13, 13]
      ]
   };
   BULLET[BULLETS.ADUKA2] = {
      file: "aduka2",
      sound: AUDIO_ADUKA_FIRE2,
      graphics: [
         [33, 26, 16, 15],
         [33, 24, 16, 13],
         [34, 25, 17, 14],
         [34, 26, 17, 15],
         [33, 25, 16, 14],
         [33, 24, 16, 13],
         [33, 26, 16, 15],
         [34, 27, 17, 16]
      ]
   };
   BULLET[BULLETS.ADUKASS] = {
      file: "adukaSS",
      sound: AUDIO_ADUKA_FIRE2,
      graphics: [
         [44, 34, 25, 32],
         [43, 31, 24, 30],
         [44, 32, 25, 31],
         [45, 34, 26, 33],
         [44, 33, 25, 32],
         [43, 32, 24, 30],
         [44, 34, 25, 32],
         [44, 37, 25, 35]
      ]
   };
   BULLET[BULLETS.TELEPORT] = {
      file: "teleport",
      sound: AUDIO_ARMOR_FIRE,
      graphics: [
         [31, 24, 18, 12],
         [34, 22, 21, 12],
         [34, 22, 21, 12],
         [35, 24, 22, 13],
         [38, 24, 25, 13],
         [37, 23, 24, 12],
         [38, 23, 25, 12],
         [34, 24, 21, 13],
         [38, 24, 25, 12],
         [33, 26, 20, 13],
         [36, 25, 23, 13],
         [31, 24, 18, 12]
      ]
   };
   BULLET[BULLETS.LIGHTNING12] = {
      file: "lightning12",
      sound: AUDIO_LIGHTNING_FIRE,
      graphics: [
         [35, 32, 15, 15],
         [33, 31, 16, 15],
         [36, 39, 16, 19],
         [39, 42, 19, 21],
         [37, 39, 18, 18],
         [37, 36, 18, 17],
         [34, 33, 14, 15],
         [27, 27, 12, 12],
         [38, 44, 17, 19],
         [32, 32, 14, 13]
      ]
   };
   BULLET[BULLETS.LIGHTNINGSS] = {
      file: "lightningSS",
      sound: AUDIO_LIGHTNING_FIRE,
      graphics: [
         [55, 36, 42, 17],
         [58, 36, 44, 17],
         [58, 37, 44, 18],
         [59, 37, 44, 18],
         [60, 37, 44, 18],
         [60, 37, 44, 18],
         [58, 37, 42, 18],
         [59, 37, 44, 18],
         [58, 37, 44, 18],
         [57, 36, 44, 17],
         [57, 36, 44, 17],
         [57, 37, 44, 17]
      ]
   };
   BULLET[BULLETS.BIGFOOT1] = {
      file: "redfoot1",
      sound: AUDIO_BIGFOOT_FIRE1,
      graphics: [
         [18, 12, 9, 6],
         [18, 12, 9, 6],
         [18, 12, 9, 6],
         [18, 12, 9, 6],
         [18, 12, 9, 6]
      ]
   };
   BULLET[BULLETS.BIGFOOT2] = {
      file: "redfoot2",
      sound: AUDIO_BIGFOOT_FIRE2,
      graphics: [
         [12, 10, 6, 5],
         [12, 9, 6, 4],
         [12, 9, 6, 4],
         [12, 9, 6, 4],
         [12, 10, 6, 5],
         [12, 10, 6, 5],
         [12, 9, 6, 4],
         [12, 10, 6, 5],
         [12, 10, 6, 5],
         [12, 10, 6, 5]
      ]
   };
   BULLET[BULLETS.BIGFOOTSS] = {
      file: "bigfootSS",
      sound: AUDIO_BIGFOOT_FIRE1,
      graphics: [
         [20, 14, 15, 7],
         [20, 14, 15, 7],
         [20, 14, 15, 7],
         [20, 14, 15, 7],
         [20, 14, 15, 7]
      ]
   };
   BULLET[BULLETS.JD1] = {
      file: "jd1",
      sound: AUDIO_JD_FIRE,
      graphics: [
         [20, 20, 10, 10],
         [20, 20, 10, 10],
         [20, 20, 10, 10],
         [20, 20, 10, 10],
         [20, 20, 10, 10],
         [20, 20, 10, 10],
         [20, 20, 10, 10],
         [20, 20, 10, 10]
      ]
   };
   BULLET[BULLETS.JD2] = {
      file: "jd2",
      sound: AUDIO_JD_FIRE,
      graphics: [
         [29, 30, 15, 15],
         [31, 31, 16, 15],
         [29, 30, 15, 15],
         [29, 31, 15, 16],
         [30, 31, 15, 16],
         [29, 31, 14, 14],
         [30, 31, 15, 15],
         [30, 31, 16, 14]
      ]
   };
   BULLET[BULLETS.JDSS] = {
      file: "jdSS",
      sound: AUDIO_JD_FIRE,
      graphics: [
         [34, 35, 17, 18],
         [36, 35, 18, 17],
         [34, 36, 18, 18],
         [35, 37, 18, 19],
         [36, 35, 18, 18],
         [35, 37, 17, 17],
         [35, 37, 18, 18],
         [35, 36, 19, 16]
      ]
   };
   BULLET[BULLETS.ASATE1] = {
      file: "asate12",
      sound: AUDIO_ASATE_FIRE,
      ion_height: 1,
      graphics: [
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8]
      ]
   };
   BULLET[BULLETS.ASATE2] = {
      file: "asate12",
      sound: AUDIO_ASATE_FIRE,
      ion_height: 2,
      graphics: [
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8],
         [16, 16, 8, 8]
      ]
   };
   BULLET[BULLETS.ASATESS] = {
      file: "asateSS",
      sound: AUDIO_ASATE_FIRE,
      ion_height: 1,
      ion_ss: !0,
      graphics: [
         [27, 28, 12, 12],
         [29, 28, 13, 12],
         [24, 25, 11, 10],
         [28, 27, 13, 12],
         [24, 26, 11, 11],
         [24, 25, 11, 11],
         [28, 28, 13, 12],
         [25, 25, 12, 10],
         [27, 26, 12, 11]
      ]
   };
   BULLET[BULLETS.ASATEION] = {
      file: "asateIon",
      sound: AUDIO_ASATE_FIRE,
      ion: !0,
      graphics: [
         [256, 16, 252, 8]
      ]
   };
   BULLET[BULLETS.KNIGHT1] = {
      file: "knight12",
      sound: AUDIO_KNIGHT_FIRE,
      ion_height: 1,
      graphics: [
         [60, 62, 31, 31],
         [58, 60, 29, 30],
         [56, 58, 28, 29],
         [54, 55, 28, 27],
         [51, 55, 26, 28],
         [49, 52, 25, 26],
         [48, 52, 24, 26],
         [47, 51, 24, 25],
         [47, 51, 24, 25],
         [47, 50, 24, 24],
         [48, 52, 24, 26],
         [49, 52, 25, 26],
         [51, 54, 26, 27],
         [52, 56, 27, 28],
         [56, 58, 28, 29],
         [56, 60, 28, 30],
         [59, 61, 30, 30],
         [61, 63, 32, 32],
         [62, 64, 32, 32],
         [60, 63, 31, 32]
      ]
   };
   BULLET[BULLETS.KNIGHT2] = {
      file: "knight12",
      sound: AUDIO_KNIGHT_FIRE,
      ion_height: 2,
      ion_high: !0,
      graphics: [
         [60, 62, 31, 31],
         [58, 60, 29, 30],
         [56, 58, 28, 29],
         [54, 55, 28, 27],
         [51, 55, 26, 28],
         [49, 52, 25, 26],
         [48, 52, 24, 26],
         [47, 51, 24, 25],
         [47, 51, 24, 25],
         [47, 50, 24, 24],
         [48, 52, 24, 26],
         [49, 52, 25, 26],
         [51, 54, 26, 27],
         [52, 56, 27, 28],
         [56, 58, 28, 29],
         [56, 60, 28, 30],
         [59, 61, 30, 30],
         [61, 63, 32, 32],
         [62, 64, 32, 32],
         [60, 63, 31, 32]
      ]
   };
   BULLET[BULLETS.KNIGHTSS] = {
      file: "knightSS",
      sound: AUDIO_KNIGHT_FIRE,
      ion_height: 1,
      ion_ss: !0,
      graphics: [
         [20, 20, 10, 9],
         [22, 22, 11, 10],
         [21, 20, 10, 9],
         [19, 19, 9, 9],
         [21, 21, 10, 10],
         [20, 19, 10, 8],
         [22, 22, 11, 10],
         [18, 18, 9, 8],
         [20, 21, 10, 9],
         [23, 22, 11, 11],
         [19, 19, 9, 9],
         [22, 22, 11, 10],
         [22, 22, 11, 11],
         [18, 18, 9, 9],
         [20, 21, 10, 10],
         [21, 21, 11, 10],
         [21, 20, 10, 9],
         [22, 21, 11, 10],
         [19, 18, 10, 8],
         [16, 17, 8, 7]
      ]
   };
   BULLET[BULLETS.KNIGHTION] = {
      file: "knightIon",
      sound: AUDIO_KNIGHT_FIRE,
      ion: !0,
      graphics: [
         [45, 24, 27, 13],
         [48, 26, 30, 14],
         [52, 26, 34, 14],
         [56, 28, 38, 15],
         [60, 29, 42, 16],
         [64, 31, 46, 17],
         [68, 33, 50, 19],
         [73, 35, 55, 20],
         [78, 38, 60, 22],
         [83, 40, 65, 23],
         [78, 30, 60, 12],
         [78, 31, 60, 12],
         [83, 33, 65, 13],
         [81, 34, 63, 13],
         [84, 37, 66, 14],
         [90, 35, 72, 15],
         [78, 36, 60, 15],
         [83, 39, 65, 16],
         [85, 42, 67, 17],
         [87, 34, 69, 18]
      ]
   };
   EXPLODES[EXPLODE.ARMOR1] = {
      file: "armor1",
      sound: AUDIO_ARMOR_BLAST,
      graphics: [
         [31, 29, 17, 9],
         [68, 78, 37, 34],
         [98, 111, 52, 54],
         [111, 124, 57, 64],
         [128, 125, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64]
      ]
   };
   EXPLODES[EXPLODE.ARMOR2] = {
      file: "armor2",
      sound: AUDIO_ARMOR_BLAST,
      graphics: [
         [20, 20, 10, 10],
         [46, 52, 23, 26],
         [66, 74, 33, 37],
         [74, 84, 34, 42],
         [89, 90, 43, 45],
         [90, 95, 43, 49],
         [93, 98, 45, 51],
         [99, 103, 48, 52],
         [101, 106, 50, 53],
         [103, 109, 51, 54],
         [105, 112, 52, 56],
         [107, 114, 53, 57],
         [110, 117, 54, 58],
         [113, 119, 56, 58],
         [113, 121, 56, 59],
         [115, 122, 57, 59],
         [117, 124, 58, 59],
         [117, 124, 58, 59],
         [117, 115, 58, 59],
         [106, 100, 47, 46]
      ]
   };
   EXPLODES[EXPLODE.ARMORSS] = {
      file: "armorSS",
      sound: AUDIO_ARMOR_BLAST,
      graphics: [
         [128, 124, 64, 60],
         [128, 128, 64, 64],
         [128, 126, 64, 62],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 128, 64, 64],
         [128, 91, 64, 27]
      ]
   };
   EXPLODES[EXPLODE.ICE1] = {
      file: "gum1",
      sound: AUDIO_ICE_BLAST,
      graphics: [
         [31, 35, 15, 22],
         [53, 51, 25, 30],
         [81, 77, 39, 41],
         [99, 108, 47, 52],
         [103, 110, 49, 53],
         [104, 97, 49, 49],
         [94, 93, 48, 48],
         [103, 109, 51, 51],
         [111, 107, 57, 50],
         [103, 106, 53, 51],
         [101, 107, 52, 53],
         [93, 104, 44, 56],
         [101, 108, 48, 58],
         [110, 100, 52, 60],
         [122, 107, 58, 62],
         [121, 110, 57, 61]
      ]
   };
   EXPLODES[EXPLODE.ICE2] = {
      file: "gum2",
      sound: AUDIO_ICE_BLAST2,
      graphics: [
         [25, 28, 14, 16],
         [48, 53, 26, 28],
         [73, 78, 39, 38],
         [96, 103, 50, 47],
         [106, 106, 55, 48],
         [116, 107, 58, 49],
         [116, 111, 58, 53],
         [116, 116, 58, 58],
         [116, 116, 58, 58],
         [113, 116, 58, 58],
         [81, 80, 38, 53],
         [78, 82, 32, 44],
         [66, 70, 31, 33],
         [61, 67, 31, 33],
         [54, 58, 31, 35],
         [53, 61, 30, 37],
         [55, 53, 32, 30],
         [49, 49, 26, 26],
         [49, 49, 26, 26],
         [49, 49, 26, 26],
         [49, 49, 26, 26],
         [48, 47, 25, 23],
         [48, 44, 24, 18],
         [51, 46, 26, 17],
         [54, 47, 29, 16],
         [57, 46, 32, 14]
      ]
   };
   EXPLODES[EXPLODE.ICESS] = {
      file: "gumSS",
      sound: AUDIO_ICE_BLAST2,
      graphics: [
         [80, 80, 35, 40],
         [222, 222, 101, 111],
         [223, 223, 101, 112],
         [247, 247, 119, 119],
         [247, 251, 119, 123],
         [247, 248, 119, 120],
         [247, 249, 119, 121],
         [223, 223, 102, 115],
         [224, 224, 103, 115],
         [223, 222, 102, 115],
         [221, 222, 101, 115],
         [223, 222, 102, 115],
         [222, 222, 102, 115],
         [222, 222, 102, 115],
         [222, 221, 102, 115],
         [222, 221, 102, 115],
         [222, 221, 102, 115],
         [221, 222, 102, 116],
         [221, 221, 102, 115],
         [222, 220, 103, 115],
         [222, 220, 103, 115],
         [222, 219, 104, 115],
         [222, 217, 105, 114],
         [203, 175, 104, 88],
         [206, 175, 106, 88],
         [216, 180, 111, 86],
         [224, 183, 115, 82],
         [236, 184, 120, 70],
         [244, 181, 123, 53],
         [246, 157, 123, 29]
      ]
   };
   EXPLODES[EXPLODE.ADUKA1_THOR] = {
      file: "aduka1-thor",
      sound: AUDIO_ARMOR_BLAST,
      graphics: [
         [18, 18, 9, 9],
         [60, 60, 30, 30],
         [48, 47, 24, 23],
         [63, 67, 31, 31],
         [78, 80, 38, 39],
         [93, 96, 46, 47],
         [104, 96, 52, 47],
         [114, 96, 57, 47],
         [124, 96, 62, 47],
         [128, 96, 61, 47],
         [128, 92, 57, 48],
         [76, 84, 34, 40],
         [79, 76, 35, 40],
         [82, 78, 37, 44],
         [81, 79, 36, 45],
         [76, 79, 38, 46]
      ]
   };
   EXPLODES[EXPLODE.TELEPORT] = {
      file: "teleport",
      sound: AUDIO_LIGHTNING_BLAST,
      graphics: [
         [43, 44, 22, 20],
         [100, 101, 51, 49],
         [113, 112, 57, 56],
         [103, 102, 52, 49],
         [114, 116, 57, 55],
         [123, 126, 61, 62],
         [126, 128, 62, 64],
         [125, 128, 64, 64],
         [125, 128, 64, 64],
         [122, 128, 64, 64],
         [126, 128, 64, 64],
         [123, 126, 59, 62],
         [119, 123, 59, 64],
         [123, 121, 62, 61],
         [121, 126, 61, 64],
         [118, 128, 58, 64],
         [121, 120, 59, 64],
         [123, 121, 61, 64],
         [122, 120, 62, 62]
      ]
   };
   EXPLODES[EXPLODE.LIGHTINING12_JD1] = {
      file: "lightning12-jd1",
      sound: AUDIO_LIGHTNING_BLAST,
      graphics: [
         [27, 17, 13, 8],
         [55, 56, 29, 30],
         [92, 92, 51, 49],
         [114, 108, 59, 54],
         [125, 122, 62, 61],
         [119, 121, 57, 64],
         [116, 113, 58, 59],
         [102, 108, 51, 56],
         [94, 92, 48, 44],
         [65, 66, 32, 33],
         [50, 51, 25, 25],
         [74, 74, 37, 37],
         [94, 94, 47, 47],
         [112, 112, 56, 56]
      ]
   };
   EXPLODES[EXPLODE.LIGHTNINGSS] = {
      file: "lightningSS",
      sound: AUDIO_LIGHTNING_BLAST,
      graphics: [
         [21, 23, 12, 14],
         [52, 49, 29, 26],
         [38, 46, 22, 27],
         [69, 78, 41, 40],
         [142, 130, 77, 66],
         [213, 216, 105, 106],
         [250, 240, 126, 124],
         [253, 246, 128, 124],
         [256, 252, 128, 124],
         [256, 240, 128, 124],
         [256, 240, 128, 124],
         [256, 240, 128, 124],
         [256, 241, 128, 124],
         [253, 241, 128, 123],
         [240, 241, 115, 124],
         [242, 243, 114, 124],
         [252, 252, 128, 124],
         [237, 237, 114, 122],
         [234, 234, 113, 120]
      ]
   };
   EXPLODES[EXPLODE.BIGFOOT1SS] = {
      file: "bigfoot1SS",
      sound: AUDIO_BIGFOOT_BLAST1,
      graphics: [
         [56, 52, 28, 30],
         [79, 72, 38, 41],
         [92, 83, 41, 44],
         [99, 101, 46, 51],
         [101, 107, 48, 51],
         [109, 102, 56, 51],
         [109, 106, 57, 50],
         [109, 101, 57, 50],
         [108, 100, 57, 50],
         [105, 100, 57, 50],
         [102, 97, 57, 49],
         [98, 97, 56, 49],
         [92, 85, 53, 49],
         [84, 80, 49, 45],
         [81, 80, 47, 45],
         [83, 79, 47, 43],
         [79, 80, 44, 44],
         [81, 80, 45, 44],
         [80, 72, 45, 39]
      ]
   };
   EXPLODES[EXPLODE.BIGFOOT2] = {
      file: "bigfoot2",
      sound: AUDIO_BIGFOOT_BLAST2,
      graphics: [
         [26, 24, 14, 11],
         [37, 34, 17, 15],
         [43, 40, 23, 20],
         [46, 47, 24, 23],
         [47, 48, 24, 24],
         [52, 48, 26, 25],
         [51, 48, 25, 25],
         [51, 47, 25, 25],
         [50, 46, 24, 24],
         [49, 46, 23, 24],
         [48, 46, 22, 24],
         [46, 44, 20, 23],
         [42, 40, 19, 19],
         [39, 38, 17, 19],
         [38, 37, 17, 19],
         [38, 37, 17, 19],
         [37, 37, 17, 19],
         [38, 37, 18, 19],
         [37, 34, 17, 18]
      ]
   };
   EXPLODES[EXPLODE.JD2] = {
      file: "jd2",
      sound: AUDIO_JD_BLAST2,
      graphics: [
         [120, 102, 64, 64],
         [121, 124, 60, 64],
         [121, 128, 61, 64],
         [124, 128, 64, 64],
         [128, 126, 64, 64],
         [117, 119, 59, 60],
         [115, 113, 57, 55],
         [120, 112, 61, 54],
         [120, 110, 61, 53],
         [118, 110, 60, 54],
         [114, 114, 58, 54],
         [109, 110, 55, 52],
         [103, 107, 52, 53],
         [97, 99, 49, 49],
         [92, 88, 49, 44],
         [79, 77, 41, 39],
         [66, 63, 35, 32],
         [36, 35, 18, 18],
         [8, 8, 4, 4],
         [67, 67, 34, 44]
      ]
   };
   EXPLODES[EXPLODE.JDSS] = {
      file: "jdSS",
      sound: AUDIO_JD_BLAST1,
      graphics: [
         [185, 182, 97, 98],
         [233, 232, 119, 123],
         [244, 237, 125, 124],
         [244, 238, 125, 124],
         [253, 241, 128, 124],
         [256, 240, 128, 124],
         [256, 241, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [254, 243, 128, 124],
         [254, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 243, 128, 124],
         [256, 242, 128, 124],
         [256, 243, 128, 124],
         [256, 245, 128, 124],
         [256, 247, 128, 124],
         [256, 248, 128, 124],
         [256, 242, 128, 124],
         [256, 242, 128, 124],
         [250, 239, 126, 124]
      ]
   };
   EXPLODES[EXPLODE.ASATE1] = {
      file: "asate1",
      sound: AUDIO_ASATE_KNIGHT_BLAST,
      graphics: [
         [83, 68, 41, 36],
         [103, 96, 49, 45],
         [106, 113, 50, 53],
         [110, 117, 53, 56],
         [108, 113, 53, 58],
         [105, 103, 53, 53],
         [105, 105, 52, 53],
         [89, 89, 44, 44],
         [80, 81, 40, 40],
         [80, 80, 40, 40],
         [82, 82, 41, 41],
         [106, 106, 53, 53],
         [122, 122, 61, 61],
         [128, 128, 64, 64],
         [124, 123, 62, 61],
         [123, 119, 62, 57],
         [123, 117, 61, 56]
      ]
   };
   EXPLODES[EXPLODE.ASATE2] = {
      file: "asate2",
      sound: AUDIO_ASATE_KNIGHT_BLAST,
      graphics: [
         [65, 53, 32, 28],
         [81, 75, 38, 35],
         [83, 88, 40, 41],
         [85, 92, 41, 44],
         [84, 88, 41, 45],
         [81, 80, 41, 41],
         [81, 82, 40, 41],
         [69, 69, 34, 35],
         [62, 63, 31, 31],
         [62, 63, 31, 30],
         [64, 64, 32, 31],
         [82, 82, 41, 41],
         [94, 94, 47, 47],
         [98, 98, 49, 49],
         [98, 97, 49, 48],
         [96, 92, 48, 46],
         [96, 90, 48, 45]
      ]
   };
   EXPLODES[EXPLODE.ASATESS] = {
      file: "asateSS",
      sound: AUDIO_ASATE_KNIGHT_BLAST,
      graphics: [
         [63, 62, 32, 33],
         [78, 77, 40, 41],
         [83, 84, 43, 45],
         [87, 88, 45, 47],
         [81, 86, 43, 45],
         [78, 83, 40, 42],
         [75, 79, 39, 38],
         [77, 80, 41, 38],
         [80, 80, 42, 38],
         [83, 80, 44, 37],
         [86, 80, 45, 37],
         [89, 79, 47, 36],
         [92, 79, 48, 36],
         [94, 79, 49, 35],
         [98, 81, 51, 36],
         [103, 87, 54, 40],
         [106, 88, 55, 42],
         [108, 91, 56, 44],
         [111, 98, 58, 51],
         [114, 46, 59, 24]
      ]
   };
   EXPLODES[EXPLODE.KNIGHT] = {
      file: "knight",
      sound: AUDIO_ASATE_KNIGHT_BLAST,
      graphics: [
         [66, 53, 41, 22],
         [69, 61, 43, 27],
         [73, 66, 43, 29],
         [80, 72, 46, 32],
         [83, 76, 45, 34],
         [96, 82, 54, 37],
         [99, 86, 55, 38],
         [103, 90, 57, 38],
         [107, 96, 57, 40],
         [110, 100, 56, 42],
         [112, 101, 58, 42],
         [112, 103, 58, 42],
         [113, 96, 59, 34],
         [112, 100, 58, 36],
         [113, 102, 59, 38],
         [114, 103, 60, 39],
         [113, 106, 59, 42],
         [117, 108, 62, 44],
         [121, 107, 64, 43],
         [121, 107, 64, 45],
         [121, 106, 64, 47],
         [121, 109, 64, 49],
         [121, 107, 64, 51],
         [121, 108, 64, 53],
         [111, 111, 58, 56],
         [108, 110, 56, 59],
         [100, 107, 53, 59],
         [91, 97, 48, 55],
         [75, 85, 40, 46]
      ]
   }
}
var COMPUTER_PLAYER = [{
   rank: 0,
   name: "Clown Stripe",
   gp: 1,
   atk: 5,
   def: 0,
   life: 10,
   dig: 0
},
{
   rank: 1,
   name: "Haris Pilton",
   gp: 2,
   atk: 7,
   def: 4,
   life: 15,
   dig: 0
},
{
   rank: 3,
   name: "Harly Potler",
   gp: 3,
   atk: 10,
   def: 8,
   life: 20,
   dig: 5
},
{
   rank: 5,
   name: "Angie Jelly",
   gp: 4,
   atk: 12,
   def: 12,
   life: 25,
   dig: 9
},
{
   rank: 7,
   name: "Floyd Pinkus",
   gp: 5,
   atk: 17,
   def: 18,
   life: 30,
   dig: 14
},
{
   rank: 9,
   name: "Yuffie Kisaragi",
   gp: 6,
   atk: 25,
   def: 24,
   life: 35,
   dig: 18
},
{
   rank: 13,
   name: "Bill Board",
   gp: 7,
   atk: 33,
   def: 32,
   life: 40,
   dig: 22
},
{
   rank: 15,
   name: "Gilly Gamesh",
   gp: 8,
   atk: 40,
   def: 40,
   life: 45,
   dig: 25
},
{
   rank: 17,
   name: "Lance Alot",
   gp: 9,
   atk: 50,
   def: "??",
   life: 50,
   dig: 10
},
{
   rank: 18,
   name: "Voldy Moore",
   gp: 10,
   atk: 50,
   def: 50,
   life: "??",
   dig: 20
},
{
   rank: 19,
   name: "Jack the Ripper",
   gp: 11,
   atk: 50,
   def: 50,
   life: 50,
   dig: "??"
},
{
   rank: 20,
   name: "Seffy Roth",
   gp: 12,
   atk: "??",
   def: 50,
   life: 50,
   dig: 50
}],
    filtered_words = "bitch; cock;dick;fuck;penis;pussy;shit;slut;whore;puta;caralho;suck;csm;ctm;hdp;ptm;mierda;pinga;puta;jmsz15;yourpaid;recorta;asshole;bit.ly;goo.gl;redtube;tinyurl.com;adf.ly;aimbot;i8lsqljirqi;aimb0t;culo;chupa;chupamela;concha;pincho;maricon;tu madre;gg.gg/;aimb\u03c3t;a1mbot;noticias-dragonbound.tk;gunbound-classic-thorgame;sonywc;gunboundwc.com;gunboundhero;gb-zero;gb-teamds;gunbounddelsur;dragonboundhacks;americano-gb;gmcalmlordoficial;superdragon.tk;crackdragonbound;fantasiadragonboundhack;gbclassic.net;dragonbot.es.tl;gunboundsocial;gb-city.sytes.net;empiregb.org;tiroperfecto.com;gb-viplatino;gb-prestige;gunboundperu;gunvn.com;gb-continental;gitzwc;gunbound-online;gunbound-worldonline;gunbund-online.net;gb-platinum;servegame.com;gogunbound.com;gbundine;\u2591\u2591\u2588;\u2591\u2588\u2591;\u2591\u2591\u2591;\u2588\u2588\u2588;\u2580\u2580\u2588;\u253c\u253c\u253c;\u2588\u2580\u2580;\u253c\u2588\u253c;\u2014\u2014\u2014;\u2503\u2503\u2503;linkeur.es;classicgunbound;djstefany.tk;classicgb;gunboundamericano;torneosdragonbound;tuars;hurr-durr;freecash;cashbound;radiodragonbound.tk;dragonbound.biz;dragonboundrecarga;youporn".split(";");
$(document).ajaxSend(function(a, b, d) {
   function c(a) {
      var c = null;
      if (document.cookie && "" != document.cookie) for (var b = document.cookie.split(";"), d = 0; d < b.length; d++) {
         var e = jQuery.trim(b[d]);
         if (e.substring(0, a.length + 1) == a + "=") {
            c = decodeURIComponent(e.substring(a.length + 1));
            break
         }
      }
      return c
   }
   if (a = !/^(GET|HEAD|OPTIONS|TRACE)$/.test(d.type)) var d = d.url,
       a = "//" + document.location.host,
       e = document.location.protocol + a,
       a = d == e || d.slice(0, e.length + 1) == e + "/" || d == a || d.slice(0, a.length + 1) == a + "/" || !/^(\/\/|http:|https:).*/.test(d);
   a && b.setRequestHeader("X-CSRFToken", c("csrftoken"))
});
var g_draggable_z_index = 1001;
$.prototype.draggable2 = function() {
   var a = this,
       b = !1,
       d = !1,
       c, e, f, j;
   a.css("z-index", g_draggable_z_index += 1);
   this.mousedown(function(d) {
      b = !0;
      c = d.pageX;
      e = d.pageY;
      d = a.offset();
      f = d.left;
      j = d.top;
      a.css("z-index", g_draggable_z_index += 1)
   });
   $(document).mousemove(function(m) {
      if (b && !d && (5 < Math.abs(m.pageX - c) || 5 < Math.abs(m.pageY - e))) d = !0;
      d && a.css({
         left: (f + (m.pageX - c)) / g_aspect_ratio - g_no_aspect_left + "px",
         top: (j + (m.pageY - e)) / g_aspect_ratio - g_no_aspect_top + "px"
      })
   });
   $(document).mouseup(function() {
      d = b = !1
   });
   return this
};

function onUpdateReady() {
   $("#channelName").html() && !$("#BrokerWindow").is("visible") ? DragonDialogOpen("Update Available!", "A newer version is available, refresh?", DIALOG_BUTTONS_OK_CANCEL, function(a) {
      a && location.reload()
   }) : location.reload()
}

function DragonUpdater() {
   if (window.applicationCache) {
      var a = window.applicationCache,
          b = $("#updater");
      a.status === a.UPDATEREADY ? (b.html("Update Available!").slideDown(), onUpdateReady()) : (a.addEventListener("checking", function() {
         b.html("Checking for updates...").slideDown()
      }, !1), a.addEventListener("noupdate", function() {
         b.html("At Latest Version!").slideUp()
      }, !1), a.addEventListener("obsolete", function() {
         debug && console.log("** applicationCache EVENT:", "obsolete");
         b.html("Obsolete!").slideUp()
      }, !1), a.addEventListener("error", function(a) {
         debug && console.log("** applicationCache EVENT:", "error", a);
         b.html("Failed!").slideUp()
      }, !1), a.addEventListener("cached", function() {
         debug && console.log("** applicationCache EVENT:", "cached");
         b.html("Downloaded!").slideUp()
      }, !1), a.addEventListener("downloading", function() {
         debug && console.log("** applicationCache EVENT:", "downloading");
         b.html("Downloading Updates...")
      }, !1), a.addEventListener("progress", function(a) {
         debug && console.log("** applicationCache EVENT:", "progress", a);
         a = void 0 != a.loaded && void 0 != a.total ? Math.round(100 * a.loaded / a.total) + "%" : ["\\", "/", "-", "|"][random(0, 3)];
         b.html("Downloading Updates... " + a)
      }, !1), a.addEventListener("updateready", function() {
         debug && console.log("** applicationCache EVENT:", "updateready");
         b.html("Update Available!");
         onUpdateReady()
      }), setInterval(function() {
         a.update()
      }, 216E5 + random(0, 9E5)))
   }
}

function LoadTwitter() {
   var a = document,
       b = a.getElementsByTagName("script")[0];
   a.getElementById("twitter-wjs") || (a = a.createElement("script"), a.id = "twitter-wjs", a.async = !0, a.src = "//platform.twitter.com/widgets.js", b.parentNode.insertBefore(a, b))
}
function LoadGooglePlus() {
   var a = document.createElement("script");
   a.type = "text/javascript";
   a.async = !0;
   a.src = "https://apis.google.com/js/plusone.js";
   var b = document.getElementsByTagName("script")[0];
   b.parentNode.insertBefore(a, b)
}
$(document).ready(function() {
   InitGlobals();
   $(document).bind("contextmenu", function() {
      return !1
   });
   $(document).bind("dragstart", function(a) {
      return !(a.srcElement && "img" == a.srcElement.localName)
   });
   $(document).bind("keydown", function(a) {
      a.which == KEY.Backspace && (!$(document.activeElement).is("input") && !$(document.activeElement).is("textarea")) && (a.preventDefault(), a.stopPropagation())
   });
   DragonUpdater();
   l = new DragonLanguage(STRINGS, getCookie("lang"));
   l.SetAll();
   g_is_show_ranking = !0;
   var a = navigator.userAgent;
   a.match(/(iPhone|iPod|blackberry|android|htc|lg|midp|mmp|mobile|nokia|opera mini|palm|pocket|psp|sgh|smartphone|symbian|treo mini|Playstation Portable|SonyEricsson|Samsung|MobileExplorer|PalmSource|Benq|Windows Phone|Windows Mobile|IEMobile|Windows CE|Nintendo Wii)/i) && (g_graphics_high = !1, window.scrollTo(0, 1), g_is_show_ranking = !1);
   a.match(/(Windows|MacOS|Mac OS|UNIX|Linux)/i) || $("#touch_ui").show();
   g_is_show_ranking && $("#buttonRanking").addClass("open");
   a.match(/(Chrome|Safari)/i) && $("#game_back,#game_front").css({
      position: "fixed",
      overflow: "hidden"
   });
   a = "DragonBound ";
   "gl" == SERVER_TYPE ? a += "Global" : "br" == SERVER_TYPE ? a += "Brasil" : "dev" == SERVER_TYPE && (a += "Dev");
   $("#ranking_title").html(a);
   var b = new DragonNetwork;
   b.dl = l;
   DragonTheme_Load();
   AudioInit();
   ChannelGUI(b);
   RankingGUI(b);
   RoomGUI(b);
   GameGUI(b);
   ShopGUI(b);
   DragonDesigner_Init();
   DragonGuard(b);
   ResellersGUI(b);
   for (a = 0; a < AVATARS.length; a++) AVATARS[a] && 3E3 == AVATARS[a][0] ? POWER_USER_BACKGROUND = a : AVATARS[a] && 9E3 == AVATARS[a][0] && (POWER_USER_EXITEM = a);
   $("#dialogCreateRoom").draggable2();
   $("#shop_buy_dialog").draggable2();
   $("#playerInfoDialog").draggable2();
   $("#OptionsDialog").draggable2();
   $("body").bind("keyup", function(a) {
      a.which == 13 && (b.location == LOCATION_TYPE_CHANNEL ? $("#dialogCreateRoom").is(":visible") ? CreateRoomDialogPressedOK(b) : $("#channelInput").focus() : b.game ? $("#gameInput").focus() : $("#roomInput").focus())
   });
   $("body").bind("keydown", function(a) {
      if (a.which == 13) {
         a.stopPropagation();
         a.preventDefault()
      }
   });
   document.onhelp = function() {
      return false
   };
   window.onhelp = function() {
      return false
   };
   $("#container, .NoSelect").bind("selectstart", function(a) {
      a.stopPropagation();
      return false
   });
   $(".CanSelect").bind("selectstart", function(a) {
      a.stopPropagation();
      return true
   });
   setInterval(function() {
      ButtonGlow(b)
   }, 700);
   g_is_game_background && $("#map_bg").show();
   ResizeInit();
   b.dragonLogin = new DragonLogin(b);
   $("#BrokerLogout").click(function() {
      b.dragonLogin.Logout()
   })
});

function DragonGuard(a) {
   var b = [DragonBound.prototype, CPlayer.prototype, DragonNetwork.prototype, CGround.prototype, CCamera.prototype, DragonSocket.prototype, DragonLogin.prototype];
   setInterval(function() {
      var d = 0;
      DragonBound.prototype !== b[0] && (DragonBound.prototype = b[0], d = 1);
      CPlayer.prototype !== b[1] && (CPlayer.prototype = b[1], d = 1);
      DragonNetwork.prototype !== b[2] && (DragonNetwork.prototype = b[2], d = 1);
      CGround.prototype !== b[3] && (CGround.prototype = b[3], d = 1);
      CCamera.prototype !== b[4] && (CCamera.prototype = b[4], d = 1);
      DragonSocket.prototype !== b[5] && (DragonSocket.prototype = b[5], d = 1);
      DragonLogin.prototype !== b[6] && (DragonLogin.prototype = b[6], d = 1);
      d && ($.post("/b.php", {
         u: a.user_id,
         r: 1
      }, function() {
         window.location = "/logout.php"
      }), setTimeout(function() {
         window.location = "/logout.php"
      }, 6E4))
   }, 3E5)
}
debug || (alert = void 0);

function UpdateSliceDragGUI() {
   g_is_game_slice ? $("#slice_drag_button").removeClass("drag") : $("#slice_drag_button").addClass("drag")
}

function ButtonGlow(a) {
   var b = $("#buttonQuickJoin");
   b.hasClass("buttonGlow") ? (b.removeClass("buttonGlow"), 2 <= a.user_rank && $(".blinking").hide()) : (b.addClass("buttonGlow"), 2 <= a.user_rank && $(".blinking").show())
}(function() {
   top != self && (top.location = self.location)
})();
$(window).load(function() {
   LoadTwitter();
   LoadGooglePlus()
});

function ExplodeDialog(a, b) {
   if (g_graphics_high && !b) {
      var d = $("#" + a + " .AlertBox");
      0 < d.length ? (d.effect("explode"), $("#" + a).fadeOut()) : $("#" + a).effect("explode")
   } else $("#" + a).hide()
}
function FadeInDialog(a) {
   g_graphics_high ? ($("#" + a + " .AlertBox").fadeIn(), $("#" + a).fadeIn()) : $("#" + a).show()
}
function ToggleOptionsDialog(a) {
   $("#OptionsDialog").is(":visible") ? ExplodeDialog("OptionsDialog") : (PrepareOptionsDialog(a), FadeInDialog("OptionsDialog"))
}

function TeamChatOn() {
   $("#all_chat").hide();
   $("#team_chat").show()
}
function TeamChatOff() {
   $("#all_chat").show();
   $("#team_chat").hide()
}
function TeamChatStatus() {
   return $("#team_chat").is(":visible")
}
function TeamChatToggle() {
   TeamChatStatus() ? TeamChatOff() : TeamChatOn()
}

function GameGUI(a) {
   $("#gameChat").tinyscrollbar({
      size: 99
   });
   $("#btnShot1").click(function() {
      SelectShotType(0, a.game);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#btnShot2").click(function() {
      SelectShotType(1, a.game);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#btnShotSS").click(function() {
      SelectShotType(2, a.game);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#btnPass").click(function() {
      a.game && a.game.PassTurnClicked();
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#btnEsc").click(function() {
      ToggleOptionsDialog( !! a.game);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#all_chat").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      TeamChatOn()
   });
   $("#team_chat").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      TeamChatOff()
   });
   $("#gameItemSlot0").click(function() {
      a.game && a.game.UseItem(0)
   });
   $("#gameItemSlot1").click(function() {
      a.game && a.game.UseItem(1)
   });
   $("#gameItemSlot2").click(function() {
      a.game && a.game.UseItem(2)
   });
   $("#gameItemSlot3").click(function() {
      a.game && a.game.UseItem(3)
   });
   $("#gameItemSlot4").click(function() {
      a.game && a.game.UseItem(4)
   });
   $("#gameItemSlot5").click(function() {
      a.game && a.game.UseItem(5)
   });
   $("#slice_drag_button").click(function() {
      g_is_game_slice = !g_is_game_slice;
      UpdateSliceDragGUI()
   });
   UpdateSliceDragGUI();
   $("#gameInput").bind("keyup", function(b) {
      if (13 == b.which) {
         if ("" != this.value) {
            var c = this.value;
            this.value = "";
            a.SendChat(c, TeamChatStatus())
         }
         $("#gameInput").blur();
         b.stopPropagation()
      }
   }).bind("mousedown", function(a) {
      a.stopPropagation && a.stopPropagation()
   });
   var b;
   $("#powerMarkArea").bind("mousedown", function(a) {
      b = !0;
      a = a.offsetX;
      $("#powerMark").css("left", a + 1)
   }).bind("mouseup", function() {
      b = !1
   }).bind("mousemove", function(a) {
      b && 3 != a.eventPhase && (a = a.offsetX, 0 > a ? a = 0 : 400 < a && (a = 400), $("#powerMark").css("left", a + 1))
   })
}

function SelectShotType(a, b) {
   2 == a && !$("#btnShotSS").is(":visible") && (a = 0);
   switch (a) {
   case 0:
      $("#btnShot2, #btnShotSS").removeClass("Pressed");
      $("#btnShot1").addClass("Pressed");
      break;
   case 1:
      $("#btnShot1, #btnShotSS").removeClass("Pressed");
      $("#btnShot2").addClass("Pressed");
      break;
   case 2:
      $("#btnShot1, #btnShot2").removeClass("Pressed"), $("#btnShotSS").addClass("Pressed")
   }
   b && b.ChangedShot(a)
}

function GetSelectedShotType() {
   var a = 0;
   $("#btnShot2").hasClass("Pressed") ? a = 1 : $("#btnShotSS").hasClass("Pressed") && (a = 2);
   return a
}
var CHAT_LENGTH_LIMIT = 150;

function AddToChatInput(a) {
   if ("" != a) {
      var b = $("#roomInput").val();
      b.length + a.length > CHAT_LENGTH_LIMIT || ($("#roomInput").focus(), $("#roomInput").val(b + a))
   }
}

function ChatReceived(a, b, d, c, e, f) {
   a && (d != CHAT_TYPE_GOLD && d != CHAT_TYPE_DEAD && d != CHAT_TYPE_SYSTEM) && (a = text_filter(a.toString(), filtered_words));
   d == CHAT_TYPE_GM_BUGLE && (a = a.replace('<a href="http://www.facebook.com/dragonbound.net" target="_blank">DragonBound Community/News</a>', '<a href="http://www.dragonbound-news.com/" target="_blank">DragonBound News (NEW!)</a>'));
   var j = "",
       m = "",
       k = "",
       p = "";
   if (e == LOCATION_TYPE_CHANNEL || $("#channelScreen").is(":visible") || $("#shopScreen").is(":visible")) m = "#channelTextHtml", j = "#channel";
   else if ($("#roomScreen").is(":visible")) m = "#roomChatHtml", j = "#roomChat", k = ".roomPlayerBalloon", p = ".roomPlayerBalloonTip", "" != k && "" != b && $(".roomPlayerName").each(function() {
      if ($(this).html().split("</span> ").pop() == b) {
         var c = $(this).parents().children(k),
             e = $(this).parents().children(p);
         4 == d ? c.addClass("bg1") : c.removeClass("bg1");
         5 == d ? c.addClass("bg2") : c.removeClass("bg2");
         e.stop(!0, !0).fadeOut("slow");
         c.stop(!0, !0).hide("slow").promise().done(function() {
            c.html(a).show("slow").animate({
               opacity: 0.9
            }, 5E3).fadeOut(2E3);
            e.fadeIn("slow").animate({
               opacity: 0.9
            }, 5E3).fadeOut(2E3)
         })
      }
   });
   else if ($("#gameScreen").is(":visible")) m = "#gameChatHtml", j = "#gameChat", f && f.game && f.game.ChatReceived(a, b, d);
   else
   return;
   j && (c = '<div class="zotata-chat-line zotata-chat-type' + d + '" >' + (1 <= d && 4 != d && 9 >= d ? '<div class="zotata-chat-icon zotata-chat-icon' + d + '"></div> ' : " ") + ("" != b ? BuildPlayerNameWithGuild(c, b) + "] " : "") + a + "</div>", $(m).append(c), $(j).tinyscrollbar_update("bottom"))
}

function GuiCloseChannelScreen() {
   $("#dialogCreateRoom").fadeOut(g_graphics_high ? "slow" : 0);
   $("#OptionsDialog").hide();
   $("#channelScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
      g_channel_player && (g_channel_player.remove(), g_channel_player = void 0);
      TabChangeTo(TAB_ALL)
   })
}

function GuiCloseRoomScreen() {
   $("#roomScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
      $("#roomButtonReady").hide();
      $("#roomButtonStart").hide();
      $("#roomButtonMobile").hide();
      $("#roomChatHtml").html("");
      $("#roomChat .scrollbar").hide();
      $(".roomPlayerBalloon, .roomPlayerBalloonTip").removeClass("text_anim");
      $("#playerInfoDialog").hide();
      $("#dialog_room_options").hide();
      RoomTabChangeTo(TAB_ALL);
      RoomRemoveAnimations();
      VortexStop();
      TeamSearchMsg(void 0, 0)
   })
}

function GuiCloseGameScreen() {
   $("#OptionsDialog").hide();
   $("#gameScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
      g_score_screen_timeout && (g_score_screen_timeout = clearTimeout(g_score_screen_timeout))
   })
}
function GuiCloseShopScreen() {
   $("#shopScreen").fadeOut(g_graphics_high ? "slow" : 0, function() {
      g_shop_player.remove();
      g_shop_player = void 0
   })
}

function GuiCloseCurrentScreen(a) {
   a.location == GUI_LOCATION_CHANNEL ? GuiCloseChannelScreen() : a.location == GUI_LOCATION_ROOM ? GuiCloseRoomScreen() : a.location == GUI_LOCATION_GAME ? GuiCloseGameScreen(a) : a.location == GUI_LOCATION_SHOP && GuiCloseShopScreen();
   $("#friendsList").hide();
   $("#guildMembersList").hide()
}

function SwitchToChannelScreen(a) {
   a.location != GUI_LOCATION_CHANNEL && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
      GuiCloseCurrentScreen(a);
      $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
         a.location = GUI_LOCATION_CHANNEL;
         $("#channelInput").val("");
         $("#channelScreen").fadeIn(g_graphics_high ? 400 : 0);
         $("#channel").tinyscrollbar_update("bottom");
         ChannelPlayerInfoUpdate(a.myPlayerInfo, 1 == g_server_type ? a.lobbyMobile : void 0);
         AudioPlayInLoop(AUDIO_MUSIC_CHANNEL, !0);
         $("#playersList").tinyscrollbar_update("top");
         TabChangeTo(TAB_ALL)
      })
   })
}

function SwitchToRoomScreen(a) {
   a.location != GUI_LOCATION_ROOM && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
      GuiCloseCurrentScreen(a);
      $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
         a.location = GUI_LOCATION_ROOM;
         $("#roomInput").val("");
         $("#room_timer").hide();
         $("#select_bot_div").hide();
         AutoReadyStartTimer(a);
         $("#roomsList > .room").each(function() {
            $(this).hide()
         });
         $("#playerInfoDialog").hide();
         $("#roomScreen").fadeIn(g_graphics_high ? 400 : 0);
         AudioPlayInLoop(AUDIO_MUSIC_ROOM, !0);
         RoomTabChangeTo(TAB_ALL);
         VortexStart()
      })
   })
}

function SwitchToGameScreen(a) {
   a.location != GUI_LOCATION_GAME && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
      GuiCloseCurrentScreen(a);
      $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
         a.location = GUI_LOCATION_GAME;
         $("#gameScreen").fadeIn(g_graphics_high ? 400 : 0, function() {
            $("#gameScreen").css("opacity", 1)
         });
         AudioPlayInLoop(AUDIO_MUSIC_STAGE1, !0)
      })
   })
}

function SwitchToShopScreen(a) {
   a.location != GUI_LOCATION_SHOP && $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
      GuiCloseCurrentScreen(a);
      a.location = GUI_LOCATION_SHOP;
      $("#channelScreen, #roomScreen, #gameScreen, #shopScreen").promise().done(function() {
         $("#shopScreen").fadeIn(g_graphics_high ? 400 : 0);
         $("#buttonShopHead").click();
         ShopSetMyItems(a);
         g_shop_player || (g_shop_player = new CPlayerGraphic("#shop_player", -1, a.myPlayerInfo.head, a.myPlayerInfo.body, a.myPlayerInfo.eyes, a.myPlayerInfo.flag, !0));
         ShopUpdateMyStats()
      })
   })
}
var DIALOG_BUTTONS_NONE = 0,
    DIALOG_BUTTONS_OK = 1,
    DIALOG_BUTTONS_OK_CANCEL = 2,
    g_dialog_graphic;

function DragonDialogOpen(a, b, d, c, e) {
   DragonDialogClose(!0);
   $("#myDialog .AlertBoxTitle").html(a);
   $("#myDialog .AlertBoxContent").html(b.replace(/\n/g, "<br>"));
   d == DIALOG_BUTTONS_NONE || void 0 == d ? ($("#myDialog .AlertBoxOK").hide(), $("#myDialog .AlertBoxCancel").hide()) : d == DIALOG_BUTTONS_OK ? ($("#myDialog .AlertBoxCancel").hide(), $("#myDialog .AlertBoxOK").show().unbind("click").bind("click", function() {
      DragonDialogClose();
      c && c(!0)
   })) : d == DIALOG_BUTTONS_OK_CANCEL && ($("#myDialog .AlertBoxOK").show().unbind("click").bind("click", function() {
      DragonDialogClose();
      c && c(!0)
   }), $("#myDialog .AlertBoxCancel").show().unbind("click").bind("click", function() {
      DragonDialogClose();
      c && c(!1)
   }));
   e && (g_dialog_graphic && g_dialog_graphic.remove(), g_dialog_graphic = new CPlayerGraphic("#dialog_graphic", -1, e[0], e[1], e[2], e[3], !1));
   $("#myDialog").removeClass("hide");
   $(".DialogLayer .AlertBox").show();
   $(".DialogLayer").show();
   $(".DialogLayer").css("z-index", g_draggable_z_index += 1)
}

function DragonDialogClose() {
   $(".DialogLayer .AlertBox").hide();
   $(".DialogLayer").hide();
   g_dialog_graphic && g_dialog_graphic.remove()
}
function CloseDialogs() {
   $("#dialog_change_name_div").fadeOut()
}
function GetServerType() {
   var a = location.hostname;
   return "carlosx.byethost15.com" == a ? "dev" : "dragonbound-brasil.com" == a || "br.dragonbound.net" == a || "dragonbound.com.br" == a || "dragonbound.net.br" == a ? "br" : "gl"
};
var LANGUAGE = {
   EN: -1,
   ES: 0,
   PR: 1,
   FI: 2,
   VN: 3
};

function DragonLanguage(a, b) {
   if (void 0 == b || b < LANGUAGE.EN || b > LANGUAGE.VN) {
      var b = LANGUAGE.EN,
          d = navigator.language || navigator.userLanguage;
      d && (0 == d.indexOf("pt") ? b = LANGUAGE.PR : 0 == d.indexOf("es") ? b = LANGUAGE.ES : 0 == d.indexOf("vi") && (b = LANGUAGE.VN))
   }
   this.lang = b;
   this.strings = a
}
DragonLanguage.prototype.t = function(a) {
   if (this.lang == LANGUAGE.EN) return a;
   var b = this.strings[a];
   if (!b) return a;
   b = b[this.lang];
   return !b ? a : b
};
DragonLanguage.prototype.SetAll = function() {
   $("#ranking_btn_type1").html(this.t("Top Players"));
   $("#ranking_btn_type2").html(this.t("Tournament"));
   $("#ranking_btn_ranks").html(this.t("Ranks"));
   $("#ranking_btn_howto").html(this.t("How to Play"));
   $("#ranking_btn_contact").html(this.t("Contact Us"));
   $("#ranking_btn_terms").html(this.t("Terms of Service"));
   $("#ranking_btn_privacy").html(this.t("Privacy Policy"));
   $("#BrokerChannel0 .BrokerChannelName").html(this.t("Server") + " 1 - " + this.t("High Ranks"));
   $("#BrokerChannel1 .BrokerChannelName").html(this.t("Server") + " 2 - " + this.t("Beginners"));
   $("#BrokerChannel2 .BrokerChannelName").html(this.t("Server") + " 3 - " + this.t("Beginners"));
   $("#BrokerChannel3 .BrokerChannelName").html(this.t("Server") + " 4");
   $("#BrokerChannel4 .BrokerChannelName").html(this.t("Server") + " 5");
   $("#BrokerChannel5 .BrokerChannelName").html(this.t("Server") + " 6 - " + this.t("English Please"));
   $("#BrokerChannel6 .BrokerChannelName").html(this.t("Server") + " 7");
   $("#BrokerChannel7 .BrokerChannelName").html(this.t("Server") + " 8");
   $("#BrokerChannel8 .BrokerChannelName").html(this.t("Server") + " 9 - " + this.t("On Port 80"));
   $("#BrokerChannel9 .BrokerChannelName").html(this.t("Server") + " 10");
   $("#BrokerChannel10 .BrokerChannelName").html(this.t("Server") + " 11");
   $("#BrokerChannel11 .BrokerChannelName").html(this.t("Server") + " 12 - " + this.t("Mid Ranks"));
   $("#BrokerChannel12 .BrokerChannelName").html(this.t("Server") + " 13");
   $("#BrokerChannel13 .BrokerChannelName").html(this.t("Server") + " 14");
   $("#BrokerChannel14 .BrokerChannelName").html(this.t("Server") + " 15");
   $("#BrokerChannel5 .BrokerDesc").html(this.t("Please talk English here"));
   $("#BrokerChannel8 .BrokerDesc").html(this.t("Bypass workplace firewall"));
   $("#dialog_change_name_div .AlertBoxTitle").html(this.t("Select Name & Photo"));
   $("#display_name_label").html(this.t("Change Name") + ":");
   $("#can_show_photo_label").html(this.t("Show my facebook photo"));
   $("#join_room1").html(this.t("Number") + ":");
   $("#join_room2").html(this.t("Password") + ":");
   $("#buttonStart1v1").html(this.t("Start 1v1 Game"));
   $("#buttonCreateTeam").html(this.t("Create Team"));
   $("#buttonJoinTeam").html(this.t("Join Team"));
   $("#friendsListExtra").html(this.t('You can add friends by clicking "Info" near them and then "Add".'));
   $("#guildRoomTabExtra").html(this.t('A guild leader can invite you to a guild by clicking on your "Info" and then "Guild Invite".'));
   $("#dialog_change_title_div .AlertBoxTitle").html(this.t("Room Title"));
   $("#dialog_change_title_div label").html(this.t("New Title"));
   $("#infoLoading").html(this.t("Loading") + "...");
   $("#infoKey1").html(this.t("Ranking"));
   $("#infoKey2").html(this.t("Gender"));
   $("#infoKey4").html(this.t("Win Rate %"));
   $("#infoKey5").html(this.t("Damage Avg"));
   $("#infoKey6").html(this.t("Win"));
   $("#infoKey7").html(this.t("Lose"));
   $("#infoKey8").html(this.t("Guild"));
   $("#infoKey9").html(this.t("Guild Job"));
   $("#turns_list .turn_list_title").html(this.t("Turn List"));
   $("#game_replay").html("&lt;&lt; " + this.t("Game Replay") + " &gt;&gt;")
};
var STRINGS = {
   "Top Players": ["Jugadores Top", "", "Namumunong Malalaro", "C\u1ea5p cao nh\u1ea5t"],
   ME: ["YO", "EU", "", ""],
   Search: ["Buscar", "Procurar", "", ""],
   Tournament: ["Torneo", "Torneio", "", ""],
   Ranks: ["Niveles", "", "Ranko", "B\u1ea3ng x\u1ebfp h\u1ea1ng"],
   "How to Play": ["C\u00f3mo jugar", "Como Jogar", "Paano maglaro", "H\u01b0\u1edbng d\u1eabn"],
   "Contact Us": ["Cont\u00e1ctanos", "Contate-nos", "Kontakin kami", "Li\u00ean h\u1ec7"],
   "Terms of Service": ["T. de Servicio", "Termos de servi\u00e7o", "Termino sa serbisyo", "\u0110i\u1ec1u kho\u1ea3n"],
   "Privacy Policy": ["P. de Privacidad", "Pol\u00edtica de Privacidade", "Patakaran sa privacy", "Ch\u00ednh s\u00e1ch b\u1ea3o m\u1eadt"],
   Server: ["Servidor", "", "Server", ""],
   "High Ranks": ["Ranks Altos", "Ranks de cima", "Mataas na ranko", "C\u1ea5p cao"],
   Beginners: ["Principiantes", "Iniciantes", "Baguhan", "M\u1edbi t\u1eadp ch\u01a1i"],
   "English Please": ["S\u00f3lo Ingl\u00e9s", "Ingl\u00eas, por favor", "Ingles po", "Vui l\u00f2ng s\u1eed d\u1ee5ng ti\u1ebfng Anh"],
   "On Port 80": ["En Puerto 80", "Na Porta 80", "Sa Port 80", "S\u1eed d\u1ee5ng port 80"],
   "Mid Ranks": ["Ranks Medios", "Ranks Medianos", "Gitnang ranko", "Trung c\u1ea5p"],
   "Please talk English here": ["Por favor, hable en ingl\u00e9s aqu\u00ed", "Por favor, fale Ingl\u00eas aqui", "Maaari po lamang magsalita ng Ingles dito", "Vui l\u00f2ng s\u1eed d\u1ee5ng ti\u1ebfng Anh t\u1ea1i \u0111\u00e2y"],
   "Bypass workplace firewall": ["Evite el firewall de su trabajo", "Evite o firewall do seu local de trabalho", "Ibypass ang nagtatrabuhan na firewall", "B\u1ecf qua t\u01b0\u1eddng l\u1eeda"],
   "Select Name & Photo": ["Seleccionar Nombre y Foto", "Selecione Nome & Foto", "Piliin ang iyong pangalan at Larawan", "Ch\u1ecdn t\u00ean v\u00e0 h\u00ecnh \u1ea3nh \u0111\u1ea1i di\u1ec7n"],
   "Change Name": ["Cambiar Nombre", "Mude o Nome", "Palitan ang iyong pangalan", "\u0110\u1ed5i t\u00ean"],
   "Show my facebook photo": ["Mostrar mi foto de facebook", "Mostre minha foto do facebook", "Ipakita ang larawan ko sa facebook", "Hi\u1ec3n th\u1ecb avatar facebook"],
   "Join Room": ["Entrar a Sala", "Entre na Sala", "Sumali sa kwarto", "Tham gia ph\u00f2ng"],
   Number: ["Numero", "N\u00famero", "Numero", "S\u1ed1"],
   Password: ["Contrase\u00f1a", "Senha", "", "M\u1eadt kh\u1ea9u"],
   'You can add friends by clicking "Info" near them and then "Add".': ['Puedes agregar amigos haciendo click en "Info" cerca de ellos y luego "A\u00f1adir"', 'Voc\u00ea pode adicionar amigos clicando no bot\u00e3o "Info" pr\u00f3ximo a eles e ent\u00e3o clicando no bot\u00e3o "Add".', 'Maaaring magdagdag ng mga kaibigan sa pamamagitan ng pagpindot ng "Info" sa tabi ng tao tapos pindutin ang "Add"', 'B\u1ea1n c\u00f3 th\u1ec3 th\u00eam b\u1ea1n b\u1eb1ng c\u00e1ch b\u1ea5m v\u00e0o n\u00fat "Info" v\u00e0 sau \u0111\u00f3 ch\u1ecdn "Add" '],
   'A guild leader can invite you to a guild by clicking on your "Info" and then "Guild Invite".': ['El l\u00edder de un guild puede invitarte haciendo click en tu "Info" y luego pulsando "Invitaci\u00f3n para Guild"', 'Um l\u00edder da guild pode convidar voc\u00ea para a guild clicando em seu bot\u00e3o "Info" e ent\u00e3o clicando no bot\u00e3o "Convidar para Guild".', 'Ang pinuno ng guild ay maaaring magimbita sa pamamagitan ng pagpindot ng "Info" tapos "Guild Invite"', 'Ch\u1ee7 guild c\u00f3 th\u1ec3 m\u1eddi b\u1ea1n v\u00e0o guild b\u1eb1ng c\u00e1ch b\u1ea5m v\u00e0o "Info" c\u1ee7a b\u1ea1n v\u00e0 sau \u0111\u00f3 ch\u1ecdn "Guild Invite"'],
   "Room Title": ["T\u00edtulo de Sala", "T\u00edtulo da Sala", "Titolo ng Kwarto", "T\u00ean ph\u00f2ng"],
   "New Title": ["Nuevo T\u00edtulo", "Novo T\u00edtulo", "Bagong Titolo", "\u0110\u1ed5i t\u00ean ph\u00f2ng"],
   Loading: ["Cargando", "Carregando", "Nagloload", "\u0110ang t\u1ea3i"],
   Ranking: ["", "", "Ranko", "X\u1ebfp h\u1ea1ng"],
   Gender: ["G\u00e9nero", "G\u00e9nero", "Kasarian", "Gi\u1edbi t\u00ednh"],
   "Win Rate %": ["% de Victorias", "Vit\u00f3rias %", "Porsiyento ng pagkapanalo", "T\u1ec9 l\u1ec7 th\u1eafng %"],
   "Damage Avg": ["Da\u00f1o Prom.", "Dano M\u00e9dio"],
   Win: ["Ganadas", "Vit\u00f3ria", "Panalo", "Th\u1eafng"],
   Lose: ["Perdidas", "Derrota", "Talo", "Thua"],
   "Guild Job": ["Cargo en el Guild", "Cargo na Guild", "Trabaho sa Guild", "Ch\u1ee9c v\u1ee5"],
   "Turn List": ["Lista de turnos", "Lista de Turnos", "Lista ng mga Turn", "Danh s\u00e1ch c\u00e1c l\u01b0\u1ee3t"],
   "Game Replay": ["Replay del Juego", "Replay do Jogo", "Replay ng Laro", "Xem l\u1ea1i m\u00e0n ch\u01a1i"],
   "Loading Facebook": ["Cargando Facebook", "Carregando Facebook", "Nagloload ang facebook", "\u0110ang t\u1ea3i d\u1eef li\u1ec7u facebook"],
   "Checking FB login status": ["Verificando estado de inicio de sesi\u00f3n en FB", "Verificando status do login no FB", "Sinusuri ang FB login status", "Ki\u1ec3m tra d\u1eef li\u1ec7u \u0111\u0103ng nh\u1eadp facebook"],
   "A Facebook pop-up has opened, please follow the instructions to sign in.": ["Se ha abierto un pop-up de Facebook , por favor siga las instruciones para ingresar", "Um pop-up do facebook foi aberto, por favor siga as instru\u00e7\u00f5es para entrar", "May bumukas na facebook pop-up, at sundin ang instruksiyon", "M\u1ed9t popup c\u1ee7a facebook s\u1ebd xu\u1ea5t hi\u1ec7n, vui l\u00f2ng l\u00e0m theo c\u00e1c b\u01b0\u1edbc \u0111\u1ec3 \u0111\u0103ng nh\u1eadp"],
   "Loading your account": ["Cargando su cuenta", "Carregando sua conta", "Niloload ang iyong account", "\u0110ang t\u1ea3i d\u1eef li\u1ec7u t\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n"],
   Timeout: ["Limite de tiempo agotado", "Tempo limite esgotado", "Timeout", "Qu\u00e1 th\u1eddi gian ch\u1edd"],
   "Try Again?": ["Intentar de nuevo?", "Tentar novamente?", "Ulitin?", "B\u1ea1n c\u00f3 mu\u1ed1n th\u1eed l\u1ea1i ?"],
   "You Are Banned": ["Est\u00e1s Baneado", "Voc\u00ea est\u00e1 Banido", "Ikaw ay Banned", "T\u00e0i kho\u1ea3n b\u1ecb kh\u00f3a"],
   Reason: ["Motivo", "Motivo", "Dahilan", "L\u00ed do"],
   Forever: ["Para Siempre", "Para Sempre", "Walang Hanggan", "M\u00e3i m\u00e3i"],
   "UTC Time Zone": ["Zona Horaria UTC", "Fuso Hor\u00e1rio UTC", "", "M\u00fai gi\u1edd UTC"],
   "We logged you out from your Facebook account too for your account safety.<br><br>Hope to see you again soon!": ["Hemos finalizado la sesi\u00f3n de su cuenta de facebook por la seguridad de su cuenta.<br><br> Esperamos verlo pronto!", "N\u00f3s sa\u00edmos da sua conta do Facebook tamb\u00e9m para a seguran\u00e7a da sua conta.<br><br>Esperamos ver voc\u00ea novamente em breve!", "Nilogout namin ikaw sa iyong account para sa iyong kaligtasan. <br><br>Sana makita ulit namin kayo sa lalong madaling panahon!", ""],
   "Bye Bye": ["Adi\u00f3s", "Tchau", "Paalam", "T\u1ea1m bi\u1ec7t"],
   "Your Web Browser Too Old": ["Su navegador es demasido viejo", "Seu Navegador \u00e9 Muito Velho", "Ang iyong browser ay masyadong luma", "Tr\u00ecnh duy\u1ec7n c\u1ee7a b\u1ea1n qu\u00e1 c\u0169"],
   'Sorry but your browser does not support WebSockets.<br><br>Please change to the newest version of <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> which has this feature.': ['Lo sentimos, pero su navegador no soporta WebSockets.<br><br>por favor, cambia a la nueva versi\u00f3n de <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> que tengan esta caracter\u00edstica', 'Desculpa, mas seu navegador n\u00e3o suporta WebSockets.<br><br>Por favor mude para uma das vers\u00f5es mais atuais do <a href="https://www.google.com/chrome/">Chrome</a> ou <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> que t\u00eam est\u00e1 fun\u00e7\u00e3o.', 'Ikinalulungkot namin na ang inyong browser ay hindi sinusuportahan ang WebSockets.<br><br>Maaari po lamang na palitan ninyo ang <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> na mayroong ganitong feature.', ""],
   "Connecting to Server...": ["Conectando al Servidor...", "Conectando ao Servidor...", "Kumoconnect sa Server...", ""],
   'Please Wait...<br><br><br>If it takes too long:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;Or come back later...': ['Please Wait...<br><br><br>Si esto demora mucho:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;En todo caso regresa m\u00e1s tarde...', 'Por favor Espere...<br><br><br>Se isto demorar muito:<br>&nbsp;&nbsp;Recarregue (F5)<br>&nbsp;&nbsp;Mude para o <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Verifique nossa <a href="http://www.facebook.com/dragonbound.net">Comunidade</a><br>&nbsp;&nbsp;Ou volte depois...', 'Maghintay lamangt...<br><br><br>pag masyadong matagal:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;o bumalik mamaya...', ""],
   Disconnected: ["Desconectado", "Desconectado", "Nadisconnect", "M\u1ea5t k\u1ebft n\u1ed1i"],
   "Press [OK] to go back to the Worlds List.": ["Presione [OK] para volver a la Lista de Servers", "Pressione [OK] para voltar para a Lista de Servidores.", "Pindutin ang [OK] para bumalik sa Worlds List", "B\u00e2m [OK] \u0111\u1ec3 tr\u1edf l\u1ea1i danh s\u00e1ch server"],
   "Can't Connect to Server :(": ["No se pudo conectar al servidor", "N\u00e3o consegue conectar ao servidor", "Hindi Makapasok sa Server", "Kh\u00f4ng th\u1ec3 k\u1ebft n\u1ed1i \u0111\u1ebfn server"],
   'Please wait a few minutes and then try to reload the game.<br><br>If it keeps failing try <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, try different ISP, or check our <a href="http://www.facebook.com/dragonbound.net">Community</a>.': ['Por favor, espere unos minutos y luego intenta recargar el juego nuevamente.<br><br>Si continua fallando, intenta <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, intenta con otro navegador, o verifica nuestra <a href="http://www.facebook.com/dragonbound.net">Comunidade</a>.', 'Por favor espere alguns minutos e ent\u00e3o tente recarregar o jogo.<br><br>Se isto continuar falhando <a href="https://www.google.com/chrome/">Chrome</a> ou <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, tente uma diferente operadora de internet, ou verifique nossa <a href="http://www.facebook.com/dragonbound.net">Comunidade</a>.', 'Maghintay ng ilang minuto at muling subukang iload ang game.<br><br>Kapag nanatiling ayaw magload, subukan ang <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, o gumamit ng ibang ISP, o icheck ang aming <a href="http://www.facebook.com/dragonbound.net">Community</a>.', ""],
   "Update Available": ["Actualizaci\u00f3n Disponible", "Atualiza\u00e7\u00e3o Dispon\u00edvel", "May Bagong Update", ""],
   "Please refresh - <font color=\"#FF9933\">Press F5</font>\nto load the latest game client.\n\nIf it doesn't help try Shift+F5 or clear your browser's cache.": ['Por favor actualizar - <font color="#FF9933">Presione F5</font>\npara cargar la \u00faltima versi\u00f3n del juego.\n\nSi esto no funciona, intenta con Shift+F5 o limpie el cach\u00e9 de su navegador.', 'Por favor recarregue - <font color="#FF9933">Pressione F5</font>\npara carregar o cliente do jogo mais atual.\n\nSe isto n\u00e3o funcionar tente Shift+F5 ou limpe o cache do seu navegador.', 'Paki refresh - <font color="#FF9933">Press F5</font>\npara maiload ang game client.\n\nKapag hindi parin gumana, subukan ang Shift+F5 o linisin ang cache ng iyong browser', ""],
   "Please Wait": ["Por favor espere", "Por favor Espere", "Pakihintay", "Vui l\u00f2ng ch\u1edd"],
   Connected: ["Conectado", "Conectado", "Konektado", "\u0110\u00e3 k\u1ebft n\u1ed1i"],
   Login: ["Ingreso", "", "Login", "\u0110\u0103ng nh\u1eadp"],
   "Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this.": ["No se pudo iniciar el juego<br><br>Actualice (F5) o cierre la ventana por 30 segudos y vuelva para solucionar el problema.", "Perdeu o in\u00edcio do jogo<br><br>Recarregue (F5) ou feche a janela por 30 segundos e ent\u00e3o volte para solucionar isto.", "Namiss mo ang laro<br><br>Refresh (F5) o isarado ang browser ng 30 segundo at bumalik mamaya.", ""],
   "Friend Request": ["Solicitud de Amistad", "Solicita\u00e7\u00e3o de Amizade", "Friend Request", ""],
   "Can you be my friend?": ["Te gustar\u00eda ser mi amigo?", "Voc\u00ea gostaria ser meu amigo?", "Pwede ba kitang maging kaibigan?", ""],
   "Guild Invite": ["Invitaci\u00f3n al Guild", "Convite de Guild", "Imbitasyon sa Guild", ""],
   "Would you join our guild?": ["Te gustar\u00eda unirte a mi Guild?", "Voc\u00ea gostaria de participar de nossa guild?", "Gusto mo bang sumali sa guild namin?", "B\u1ea1n c\u00f3 mu\u1ed1n v\u00e0o guild c\u1ee7a ch\u00fang t\u00f4i kh\u00f4ng?"],
   "Joined a different world": ["Entraste a un server diferente", "Entrou em um servidor diferente", "Sa ibang world nagconnect", ""],
   "You joined a different world. Please continue on the other window, or press [OK] to go back to worlds list.": ["Entraste a un servidor diferente. Por favor continua en otra ventana o presiona [OK] para volver a la lista de servidores", "Voc\u00ea entrou em um servidor diferente. Por favor continue na outra janela, ou pressione [OK] para voltar para a lista de servidores.", "Sumali ka sa ibang world. Tumuloy sa kabilang window, o pakipindot ang [OK] para bumalik sa server list.", ""],
   "Here?": ["\u00bfEst\u00e1s Aqu\u00ed?", "Aqui?", "Dito?", ""],
   "I think you are away...<br><br>Press [OK] to continue :)": ["Creo que est\u00e1s ausente...", "Eu acho que voc\u00ea est\u00e1 ausente...<br><br>Presione [OK] para continuar :)", "Tingin ko AFK ka...<br><br>Paki'indot ang [OK] para magpatuloy :)", ""],
   "Server is Full": ["Server Lleno", "Servidor est\u00e1 Cheio", "Full ang Server", "Server \u0111\u00e3 \u0111\u1ea7y"],
   "We are sorry but the server is currently full.<br><br>Try to join a different one.": ["Lo sentimos, este server est\u00e1 lleno.<br><br>Intenta entrar a otro server", "N\u00f3s sentimos muito, mas o servidor est\u00e1 atualmente cheio.<br><br>Tente entrar em um diferente", "Pasensya na, ngunit puno ang server sa kasalukuyan.<br><br>Subukang sumali sa ibang server", ""],
   "Loading profile": ["Cargando perfil", "Carregando perfil", "Nagloload ang iyong profile", "\u0110ang t\u1ea3i th\u00f4ng tin"],
   "Loading your avatars": ["Cargando tus avatares", "Carregando seus avatars", "Nagloload ang iyong mga avatar", "\u0110ang t\u1ea3i avatar c\u1ee7a b\u1ea1n"],
   "Loading Channels": ["Cargando canales", "Carregando Canais", "Nagloload ang mga channel", "\u0110ang t\u1ea3i c\u00e1c k\u00eanh"],
   "Error! Wait 30 seconds, then press this button": ["Error! Espere 30 segundos, luego presiona este bot\u00f3n", "Erro! Espere 30 segundos, ent\u00e3o pressione este bot\u00e3o", "Error! Maghintay ng 30 segundo, pagkatapos at pindutin ang botton na ito", "C\u00f3 l\u1ed7i x\u1ea3y ra! \u0110\u1ee3i 30 gi\u00e2y, sau \u0111\u00f3 b\u1ea5m n\u00fat n\u00e0y"],
   "Select Server": ["Seleccionar Server", "Selecione o Server", "Piliin ang Server", ""],
   "Total Online Players": ["Total de jugadores conectados", "Total de Jogadores Online", "Mga online na manlalaro", "T\u1ed5ng s\u1ed1 ng\u01b0\u1eddi ch\u01a1i \u0111ang online"],
   "All worlds are currently full. Press this button to refresh": ["Todos los servers est\u00e1n llenos. Presiona este bot\u00f3n para actualizar", "Todos os servers est\u00e3o cheios no momento. Pressione este bot\u00e3o para atualizar", "Ang lahat ng mga world ay puno sa kasalukuyan. Pindutin ang botton na ito para magrefresh", ""],
   "Not Room Master": ["No tienes el Master de la sala", "N\u00e3o \u00e9 o Master da Sala", "Hindi ikaw ang room master", ""],
   "Sorry, only the room master can change the room title.": ["Lo sentimos, solo el master de la sala puede cambiar el t\u00edtulo de la sala.", "Desculpe, apenas o master da sala pode mudar o t\u00edtulo da sala.", "Patawad, maaari lang ito gawin ng room master", ""],
   "Sorry, only the room master can change the room options.": ["Lo sentimos, solo el master de la sala puede cambiar las opciones de la sala", "Desculpe, apenas o master da sala pode mudar as op\u00e7\u00f5es da sala.", "Patawad, maaari lang tio gawin ng room master", ""],
   "This mode is locked until you win at BOSS mode as room master.": ["Este modo est\u00e1 bloqueado, hasta que ganes en modo BOSS como master de la sala.", "Este modo est\u00e1 trancado at\u00e9 que voc\u00ea ven\u00e7a no modo BOSS como master da sala.", "Ang mode na ito ay nakakandado hangga't manalo kayo sa mga BOSS bilang room master", ""],
   "This mode is locked until you win *ALL* BOSS mode levels as room master.": ["Este modo est\u00e1 bloqueado hasta que derrotes *TODOS* los niveles de que hay en el modo BOSS.", "Esse modo de jogo est\u00e1 bloqueado at\u00e9 que voc\u00ea ganhe *TODOS* no modo BOSS sendo o dono da sala.", "Nakakandado ang room na ito hangga't manalo kayo sa lahat ng BOSS na level", ""],
   "Kill the other team to win.": ["Derrote al otro equipo para ganar", "Elimine o outro time para vencer.", "Patayin ang kabilang team para manalo", ""],
   "Fight computer players at increasing difficulty.": ["Juega contra bots que incrementan su dificultad.", "Jogue contra o computador aumentando a dificuldade.", "Labanan ang mga computer player sa masmataas na kahirapan", ""],
   "Everyone use the same mobile as the room master.": ["Todos utilizan el mismo m\u00f3vil que el master de la sala", "Todos utilizam o mesmo mobile que o master da sala.", "Lahat ay gagamit ng pareho mobile kaparehas ng room master", ""],
   Male: ["Hombre", "Macho", "Lalaki", "Nam"],
   Female: ["Mujer", "F\u00eamea", "Babae", "N\u1eef"],
   Member: ["Miembro", "", "Miyembro", "Th\u00e0nh vi\u00ean"],
   Leader: ["L\u00edder", "L\u00edder", "Pinuno", "H\u1ed9i ch\u1ee7"],
   "Semi-Leader": ["Semi-L\u00edder", "Vice-L\u00edder", "Semi-Pinuno", "Ph\u00f3 h\u1ed9i ch\u1ee7"],
   ON: ["Encendido", "", "Bukas", "B\u1eacT"],
   OFF: ["Apagado", "", "Sarado", "T\u1eaeT"],
   Team: ["Equipo", "Time", "", "\u0110\u1ed9i"],
   "If you win you will not get winning bonus because you already won this player many times today.<br>Play for fun, play with others, or continue tomorrow.": ["Si ganas ya no tendr\u00e1s el bonus por victoria, porque ya has derrotado a este usuario mucha veces hoy.<br>Juega por diversi\u00f3n, con otros jugadores o contin\u00faa ma\u00f1ana", "", "Kapag ikaw ay nanalo, wala kang makukuha dahil nanalo ka na sa player na ito maraming beses sa araw na ito.<br>Maglaro para sa kasiyahan, kalaroin ang ibang mga tao, o subukan muli bukas.", "B\u1edfi v\u00ec b\u1ea1n \u0111\u00e1 th\u1eafng qu\u00e1 nhi\u1ec1u l\u1ea7n trong ng\u00e0y n\u00ean kh\u00f4ng nh\u1eadn \u0111\u01b0\u1ee3c \u0111i\u1ec3m th\u01b0\u1edfng.<br>Vui l\u00f2ng tr\u1edf l\u1ea1i v\u00e0o ng\u00e0y mai"],
   "Old Browser": ["Navegador antiguo", "Navegador Velho", "Lumang Browser", "Tr\u00ecnh duy\u1ec7t c\u0169"],
   "Your browser is too old.<br>It does not have required features to run the game.": ["Tu navegador es muy antiguo.<br>No tiene los requisitos para poder jugar el juego", "", "Ang iyong browser ay masyado nang luma at wala ang mga kinakailangan upang paganahin ang laro", "Tr\u00ecnh duy\u1ec7t c\u1ee7a b\u1ea1n qu\u00e1 c\u0169.<br> N\u00f3 kh\u00f4ng t\u00edch h\u1ee3p c\u00e1c th\u01b0 vi\u1ec7n c\u1ea7n thi\u1ebft \u0111\u1ec3 c\u00f3 th\u1ec3 ch\u01a1i game"],
   'Please change to <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>': ['Por favor c\u00e1mbiate a <a href="https://www.google.com/chrome/">Chrome</a> o <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>', 'Por favor mude para <a href="https://www.google.com/chrome/">Chrome</a> ou <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>', 'Pakipalit sa <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>', 'Vui l\u00f2ng \u0111\u1ed5i tr\u00ecnh duy\u1ec7t <a href="https://www.google.com/chrome/">Chrome</a> hay <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>'],
   "Event Game": ["Partida de Evento", "Partida de Evento", "Event Game", "S\u1ef1 ki\u1ec7n "],
   "Losing Team Wins!<br>Double GP & Gold!": ["Equipo Perdedor Gana!<br>Doble GP & Gold!", "Time Derrotado Ganha!<br>GP & GOLD Dobrado!", "Panalo ang team na natalo!<br>Double GP & Gold!", "\u0110\u1ed9i thua \u0111\u00e3 th\u1eafng!<br> Nh\u00e2n \u0111\u00f4i GP & V\u00e0ng"],
   "Winning Award": ["Premio por victoria", "Pr\u00eamio pela Vit\u00f4ria", "Award para sa mga panalo", "Ph\u1ea7n th\u01b0\u1edfng chi\u1ebfn th\u1eafng"],
   "Losing Consolation": ["Premio consuelo por derrota", "Consola\u00e7\u00e3o pela Derrota", "Gantimpalang Pampalubag-loob", "Ph\u1ea7n th\u01b0\u1edfng an \u1ee7i"],
   "was killed by": ["fue matado por", "foi morto por", "Pinatay ni", "b\u1ecb gi\u1ebft b\u1edfi"],
   "Ultra High Angle Bonus": ["Bonus \u00c1ngulo Ultra Alto", "B\u00f4nus de \u00c2ngulo Ultra Alto", "Bonus sa pag gawa ng Ultra High Angle", "Th\u01b0\u1edfng g\u00f3c si\u00eau cao"],
   "High Angle Bonus": ["Bonus \u00c1ngulo alto", "B\u00f4nus de \u00c2ngulo Alto", "Bonus sa pag gawa ng tirang mataas ang angle", "Th\u01b0\u1edfng g\u00f3c cao"],
   "Excellent Shot Bonus": ["Bonus de Tiro Excelente", "B\u00f4nus de Tiro Excelente", "Bonus sa pag gawa ng Excellent Shot", "Th\u01b0\u1edfng b\u1eafn xu\u1ea5t s\u1eafc"],
   "Good Shot Bonus": ["Bonus de Buen Tiro", "B\u00f4nus de Bom Tiro", "Bonus sa pag gawa ng magandang tira", "Th\u01b0\u1edfng b\u1eafn t\u1ed1t"],
   "Shot Bonus": ["Bonus de Tiro", "B\u00f4nus de Tiro", "Bonus sa pag gawa ng tira", "Th\u01b0\u1edfng b\u1eafn"],
   "Team Damage Penalty": ["Penalidad por Atacar Equipo", "Penalidade por Fogo Amigo", "Parusa sa pagdamage sa kakampi", "B\u1eafn tr\u00fang \u0111\u1ed3ng \u0111\u1ed9i"],
   "died by teleport": ["murio por teleport", "morto por teleporte", "Namatay sa pagteleport", "ch\u1ebft b\u1edfi teleport"],
   "damage achieved": ["da\u00f1o alcanzado", "dano alcan\u00e7ado", "nakuha ang damage", "s\u00e1t th\u01b0\u01a1ng \u0111\u1ea1t"],
   "Triple Kill Bonus": ["Bonus Triple Matanza", "B\u00f4nus de Triple Kill", "Bonus sa pagpatay sa tatlo sabay-sabay", "Ph\u1ea7n th\u01b0\u1edfng gi\u1ebft 3 m\u1ea1ng m\u1ed9t l\u00fac"],
   "Double Kill Bonus": ["Bonus de Double Matanza", "B\u00f4nus de Double Kill", "Bonus sa pagpatay sa dalawa nang sabay", "Ph\u1ea7n th\u01b0\u1edfng gi\u1ebft 2 m\u1ea1ng m\u1ed9t l\u00fac"],
   "Ending Bonus": ["Bonus de Finalizaci\u00f3n", "B\u00f4nus de Encerramento", "Bonus sa pagpatay", "Th\u01b0\u1edfng k\u1ebft th\u00fac"],
   "Bunge Shot Bonus": ["Bonus por Tiro Bunge", "B\u00f4nus de Bunge", "Bonus sa paghulog ng kalaban", "Th\u01b0\u1edfng b\u1eafn r\u01a1i"],
   "Suicide Penalty": ["Penalidad Por Suic\u00ecdio", "Penalidade por Suic\u00eddio", "Parusa sa pagpakamatay", "T\u1ef1 s\u00e1t"],
   "Room Master unlocked a new challenge opponent ! :)": ["El Master de la sala ha desbloqueado un nuevo oponente", "Master da sala destravou um novo oponente", "Naunlock ng room master ang bagong kalaban", "Ch\u1ee7 ph\u00f2ng \u0111\u00e3 m\u1edf kh\u00f3a \u0111\u1ed1i th\u1ee7 m\u1edbi !:)"],
   "Free kill game detected - No winning bonus": ["Free Kill Detectado - No hay bonificaci\u00f3n por victoria", "Free kill detectado - Sem b\u00f4nus de vit\u00f3ria", "Free kill game nadetect - Walang bonus sa pagpanalo", "Ph\u00e1t hi\u1ec7n m\u00e0n ch\u01a1i d\u00e0n x\u1ebfp - kh\u00f4ng c\u00f3 ph\u1ea7n th\u01b0\u1edfng chi\u1ebfn th\u1eafng"],
   bunge: ["", "", "hulog", "r\u1edbt"],
   "Winning Bonus": ["Bonus de Victoria", "B\u00f4nus de Vit\u00f3ria", "Bonus sa pagkapanalo", "Ph\u1ea7n th\u01b0\u1edfng chi\u1ebfn th\u1eafng"],
   "Early Suicide": ["Suicidio temprano", "Su\u00edcidio prematuro", "Maagang Pagpakamatay", ""],
   "No winning bonus (because you already won %% many times today. Play for fun, play with others, or continue tomorrow).": ["No hay bonificaci\u00f3n de victoria (porque usted ya ha ganado %% muchas veces hoy. Juega por diversi\u00f3n, juega con otros usuarios o continua ma\u00f1ana).", "Sem b\u00f4nus de vit\u00f3ria (por que voc\u00ea j\u00e1 venceu %% muitas vezes hoje. Jogue por divers\u00e3o, jogue com outros, ou continue amanh\u00e3).", "Walang GP (dahil nanalo ka na ng %% maraming beses ngayong araw. Maglaro para sa katuwaan, makipaglaro sa iba o magpatuloy bukas)", ""],
   "Sudden Death in %% turns": ["Muerte s\u00fabita en %% turnos", "Sudden Death em %% turnos", "%% turns bago mag Sudden Death", ""],
   "Sudden Death Started!": ["Muerte S\u00fabita Iniciada!", "Sudden Death Iniciado!", "Simula na ang Biglaang Pagkamatay!", "Ch\u1ebf \u0111\u1ed9 Sudden Death b\u1eaft \u0111\u1ea7u!"],
   "Lobby Screen": ["Pantalla Lobby", "Tela do Lobby", "Screen ng Lobby", ""],
   "Join a game, chat or shop": ["Entra a un juego, chat o tienda", "Entre em um jogo, chat ou shop", "Sumali sa laro, makipagusap o pumunta sa tindahan", ""],
   "Quick Play": ["", "Jogo R\u00e1pido", "", ""],
   "Join to an available game room": ["Entrar a una sala disponible", "Entrar em uma sala dispon\u00edvel", "Sumali sa kwarto na may bakante", ""],
   Create: ["", "Criar", "", ""],
   "Create your own game room": ["Crea tu propia sala", "Crie sua pr\u00f3pria sala", "Gumawa ng iyong room", ""],
   Shop: ["", "Compras", "", ""],
   "Buy and use avatars (items)": ["Comprar y usar avatares (items)", "Comprar e usar avatars (items)", "Bumili at gumamit ng avatars (mga gamit)", ""],
   "My Info": ["", "Minha Info", "", ""],
   "Change Name & Photo": ["Cambia Nombre & Foto", "Mudar Nome & Foto", "Palitan ang Pangalan at Litrato", ""],
   Options: ["", "Op\u00e7\u00f5es", "", ""],
   "Music / Sound / Graphics": ["M\u00fasica / Sonido / Gr\u00e1ficos", "M\u00fasica / Som / Gr\u00e1ficos", "Kanta / Tugtog / Graphics", ""],
   "Rooms List": ["Lista de Salas", "Lista de Salas", "Listahan ng kwarto", "Danh sach ph\u00f2ng"],
   'Click on a "Waiting" room to join to a game': ['Clic en una sala "En Espera" para entrar en juego', 'Clique em uma sala "Em Espera" para entrar em um jogo', 'Magclick ng "Waiting" na kwarto upang makasali sa laro', ""],
   "Room Screen": ["Pantalla de Salas", "Tela do Jogo", "Room Screen", "Room Screen", "M\u00e0n h\u00ecnh ph\u00f2ng"],
   'When all players are "Ready" the room master can start a game': ['Cuando todos los jugadores est\u00e9n "Listos" el master de la sala puede iniciar el juego', 'Quando todos os jogadores estiverem "Prontos" o master da sala pode come\u00e7ar o jogo', 'Kapag "Ready" na ang lahat ng manlalaro, maaari nang i-start ng room master', ""],
   "To ready": ["Listo", "Para ficar pronto", "Para magready", "\u0111\u1ec3 s\u1eb5n s\u00e0ng"],
   "For room master to start a game": ["Para el master de la para comenzar el juego", "Para o master da sala come\u00e7ar o jogo", "Para ma-start ng master", ""],
   "Game Screen": ["Pantalla de Juego", "Tela do Jogo", "Game Screen", "M\u00e0n h\u00ecnh game"],
   "You have to kill the other team to win. Shoot in your turn": ["Tienes que matar al otro equipo para ganar. Dispara en tu turno", "Mate o time oponente para vencer. Atire no seu turno", "Kailangang patayin ang kabilang kampo upang manalo", ""],
   "Up/Down": ["Arriba/Abajo", "Cima/Baixo", "Taas/Baba", "L\u00ean/Xu\u1ed1ng"],
   "Change angle": ["Cambiar Angulo", "Mudar \u00e2ngulo", "Palitan ang angle", "\u0110\u1ed5i g\u00f3c"],
   "Left/Right": ["Izquierda/Derecha", "Esquerda/Direita", "Kaliwa/Kanan", "Tr\u00e1i/Ph\u1ea3i"],
   "Walk (on your turn)": ["Caminar (en su turno)", "Ande (no seu turno)", "Lakad (sa turn mo)", "Di chuy\u1ec3n( trong l\u01b0\u1ee3t c\u1ee7a b\u1ea1n)"],
   Space: ["Espacio", "Espa\u00e7o", "Space", ""],
   "Shoot. Hold down for more power": ["Dispara. Mantega presionado para mas poder", "Atire. Mantenha pressionado para mais for\u00e7a", "Tira. Tagalan ang pindot para lumakas", ""],
   "COMPANY EMAILS": ["EMAILS DE EMPRESAS", "EMAILS DE EMPRESAS", "PANGKOMPANYANG MGA EMAIL", ""],
   Community: ["Comunidad", "Comunidade", "Komunidad", "C\u1ed9ng \u0111\u1ed3ng"],
   "ENGLISH ONLY": ["SOLO INGL\u00c9S", "APENAS INGL\u00caS", "INGLES LANG", ""],
   "Business Relations": ["Relacciones de Negocios", "Rela\u00e7\u00f5es de Neg\u00f3cios", "Usapang Pangnegosyo", ""],
   "COMPANIES ONLY, IN ENGLISH": ["SOLO EMPRESAS, EN INGL\u00c9S", "EMPRESAS APENAS, EM INGL\u00caS", "Mga Kompanya lamang, sa Ingles", ""],
   "GM LIST": ["LISTA DE GMs", "LISTA DE GMs", "Listahan ng GMs", "Danh s\u00e1ch GM"],
   "Last Update": ["\u00daltima Actualizaci\u00f3n", "\u00daltima Atualiza\u00e7\u00e3o", "Huling Update", ""],
   Rank: ["Nivel", "", "Ranko", ""],
   Rule: ["Reglas", "Regra", "Patakaran", "Lu\u1eadt ch\u01a1i"],
   Players: ["Jugadores", "Jogadores", "Mga Manlalaro", ""],
   "Top 1": ["", "", "", ""],
   "Next 4": ["Pr\u00f3ximos 4", "Pr\u00f3ximos 4", "Sunod na 4", ""],
   "Next 16": ["Pr\u00f3ximos 16", "Pr\u00f3ximos 16", "Sunod na 16", ""],
   "% applied to all players with at least 6900 GP (except the first 21 players)": ["% aplica a todos los jugadores con al menos 6900 GP (excepto los primeros 21 jugadores)", "% aplicada para todos os players com pelo menos 6900 GP (exceto os 21 primeiros players)", "% nagaaplika sa lahat ng naglalaro na mayroong GP na hindi tataas ng 6900", ""],
   "Ranking is updated every hour at about XX:10": ["El Rank se actualiza cada hora aproximadamente XX:10", "O Rank \u00e9 atualizado de hora em hora \u00e0s XX:10", "Ang listahan ng ranko ay naguupdate bawat oras sa oras ng XX:10", ""],
   "Refresh (F5) if you ranked up to see your new rank in game": ["Actualice (F5), si subi\u00f3 de nivel, para ver su nuevo nivel en el juego", "Recarregue (F5) se voc\u00ea subiu de n\u00edvel para ver seu novo n\u00edvel no jogo", "Refresh (F50 kapag nagrank up ka, para makita ang bagong ranko mo", ""],
   Sorry: ["Lo sentimos", "Desculpe", "Patawad", ""],
   "Room does not exist.<br>Please try a different room.": ["Esta sala no existe.<br>Porfavor entre en una sala diferente", "Sala n\u00e3o existe.<br>Por favor tente uma sala diferente.", "Walang room na ganito.<br>Subukan ang ibang room", ""],
   Full: ["Sala llena", "Cheia", "Puno", ""],
   "Too many users in the room.<br>Please try a different room.": ["Muchos jugadores en la sala.<br>Por favor entre a una sala diferente.", "Muitos jogadores na sala.<br>Por favor tente uma sala diferente.", "Masyadong marami nang mga player sa room na ito.<br>Kung maaari lamang ay subukan ang ibang mga kwarto.", ""],
   Playing: ["En juego", "Jogando", "Naglalaro", ""],
   "The game has already started.<br>You cannot enter.": ["El juego ya comenz\u00f3.<br>Ya no puedes ingresar.", "O jogo j\u00e1 come\u00e7ou.<br>Voc\u00ea n\u00e3o pode entrar.", "Ang larong ito ay nagsimula na.<br>Hindi ka maaaring sumali", ""],
   "Wrong Password": ["Contrase\u00f1a Incorrecta", "Senha Incorreta", "Mali ang password", ""],
   "Wrong Password.<br>Please check your password.": ["Contrase\u00f1a incorrecta.<br>Por favor, verifica la contrase\u00f1a.", "Senha Incorreta.<br>Por favor verifique sua senha.", "Mali ang password.<br>Pakitignan ulit ang iyong pa password", ""],
   "Kicked or Left Game": ["Expulsado o Dejaste el Juego", "Kickado ou Deixou o Jogo", "Nasipa o umalis sa laro", ""],
   "You will be able to join this room in %% seconds.": ["Podr\u00e1s entrar a esta sala en %% segundos.", "Voc\u00ea poder\u00e1 entrar nesta sala em %% segundos.", "Maaari ka sumali sa kwartong ito sa ilang %% segundo.", ""],
   "minutes left for your mute": ["minutos le quedan a tu mute", "minutos restantes para o seu mute", "", ""],
   "Your mute is over. Please don't do this again.": ["Tu muteo ha terminado, por favor no lo hagas de nuevo", "Seu mute est\u00e1 encerrado. Por favor n\u00e3o fa\u00e7a isto novamente.", "Tapos na ang iyong mute. Maaari po lamang na huwag ulitin ang iyon ginawa", ""],
   "This avatar is missing in stock.": ["Este avatar ya no est\u00e1 a la venta", "Este avatar est\u00e1 faltando no estoque", "Ang avatar na ito ay wala nang stock", ""],
   "This avatar is not available for sell right now.": ["Este avatar ya no est\u00e1 disponible a la venta", "Este avatar n\u00e3o est\u00e1 dispon\u00edvel para venda no momento", "Ang avatar na ito ay hindi mabibili ngayon", ""],
   "The requested avatar can not be bought with this method of payment.": ["El avatar requerido ya no puede ser comprado en este m\u00e9todo de pago", "O avatar requerido n\u00e3o pode ser compro com este m\u00e9todo de pagamento", "Ang avatar na ito ay hindi mabibili sa ganitong metodo ng pagbabayad", ""],
   "The requested price does not match this avatar and period.": ["El precio requerido no coincide con el avatar ni con el periodo", "O pre\u00e7o requerido n\u00e3o bate com este avatar e per\u00edodo", "Ang presyong ito ay hindi nagmamatch sa avatar at period", ""],
   "You are already buying something, please wait a while for previous purchase to finish and try again.": ["Usted ya compr\u00f3 algo, por favor espere unos momentos para adquirlo, finalice e intente otra vez.", "Voc\u00ea j\u00e1 est\u00e1 comprando alguma coisa, por favor espere um momento para sua comprar anterior terminar e tente novamente.", "Ikaw ay bumibili na, maghintay lamang ng sandali upang matapos ang binili mo, tapos subukan muli.", ""],
   "You already have this item. Why are you buying it again?": ["Usted ya compr\u00f3 este item. \u00bfPor qu\u00e9 lo est\u00e1 comprando de nuevo?", "Voc\u00ea j\u00e1 tem este item. Por que voc\u00ea est\u00e1 comprando ele novamente?", "Binili mo na ang item na ito. Bakit mo binibili ulit?", ""],
   "Thank You": ["Gracias", "Obrigado", "Salamat", ""],
   "You purchased": ["Usted ha comprado", "Voc\u00ea comprou", "Binili mo", ""],
   Locked: ["Bloqueado", "Bloqueado", "Kandado", ""],
   "You did not open this challenge yet.\n\nTo unlock this one you have to win the previous one as room master.": ["Usted todav\u00eda no ha desbloqueado este desaf\u00edo.\n\nPara desbloquearlo, tienes que derrotar al anterior como master de la sala.", "Voc\u00ea ainda n\u00e3o liberou este desafio.\n\nPara desbloquear este voc\u00ea tem que vencer o anterior sendo master da sala.", "Hindi mo pa natatapos ang challenge na ito.\n\nPara mabuksan mo, kinakailangan mong manalo bilang room master.", ""],
   "Already Playing": ["Ya est\u00e1n jugando", "J\u00e1 est\u00e1 Jogando", "Naglalaro na", ""],
   "This player is already in the room.\n\nPlease select a different one.": ["Este jugador ya est\u00e1 en la sala.\n\nPor favor, seleccionar a otro diferente", "Este jogador j\u00e1 est\u00e1 na sala.\n\nPor favor selecione um diferente.", "Ang player na ito ay nasa kwarto na.\n\nMaaari lamang na pumili ng iba", ""],
   Event: ["Evento", "Evento", "", ""],
   "You won the event!\nHere is a gift of <u>%% Cash</u> and <u>%% Gold": ["Ganaste el evento!\nAqu\u00ed est\u00e1 tu premio de <u>%% Cash</u> y <u>%% Gold", "Voc\u00ea venceu o evento!\nAqui est\u00e1 o seu pr\u00eamio de <u>%% Cash</u> e <u>%% Gold", "Nanalo ka sa event!\nIto ang gantimpala na<u>%% Cash</u> at <u>%% Gold", ""],
   "Come back in at least <u>4 hours</u>\nto get another gift.": ["Vuelve en por lo menos <u>4 horas</u>\npara obtener otro premio.", "Volte em pelo menos <u>4 horas</u>\n para receber outro pr\u00eamio.", "Bumalik sa hindi kukulang na <u> 4 hours</u>\n para makakuha ng panibagong regalo", ""],
   "You can post again in at least <u>24 hours</u>\nto get another gift.": ["Puedes postear de nuevo en <u>24 horas</u>\npara obtener otro premio.", "Voc\u00ea pode postar novamente em pelo menos <u>24 horas</u>\npara ganhar outro pr\u00eamio.", "Maaari mong ipost muli nang hindi kukulang ng <u>24 oras</u>\npara makakuha ng panibagong regalo", ""],
   "You can not chat with yourself. Try to chat with someone else.": ["No puedes chatear contigo mismo. Intenta conversar con otra persona", "Voc\u00ea n\u00e3o pode conversar com voc\u00ea mesmo. Tente conversar com outra pessoa.", "Hindi mo maaaring kausapin ang iyong sarili. Subukan na magchat sa ibang tao", ""],
   "You can not be friends with yourself. Try to friend someone else.": ["No puedes ser amigo de ti mismo. Intenta agregar a otra persona", "Voc\u00ea n\u00e3o poder ser amigo de voc\u00ea mesmo. Tente ser amigo de outra pessoa.", "Hindi mo puwedeng maging kaibigan ang iyong sarili. Humanap ka ng ibang kaibigan", ""],
   "This player is offline or does not exist.\nAdd the friend when you can see him.": ["Este usuario no est\u00e1 conectado o no existe.\nAgregalo como amigo cuando lo veas de nuevo.", "Este jogador est\u00e1 offline ou n\u00e3o existe.\nAdicione-o como amigo quando voc\u00ea ver ele.", "Ang manlalarong ito ay offline o wala sa larong ito.\nMagadd ng kaibigan sa panahon na makita mo siya", ""],
   "Already Friends": ["Ya son amigos", "J\u00e1 s\u00e3o amigos", "Kaibigan na", ""],
   "You are already friends.\n\nYou can see the friend in your Friends List.": ["Ustedes ya son amigos.\n\nPuedes verlo en tu Lista de Amigos.", "Voc\u00eas j\u00e1 s\u00e3o amigos.\n\nVoc\u00ea pode ver seu amigo em sua Lista de Amigos.", "Kaibigan mo na ito.\n\nMakikita mo siya sa iyong friend list", ""],
   "You can not add GM as a friend.": ["Usted no puede agregar a un GM como amigo.", "Voc\u00ea n\u00e3o pode adicionar um GM como amigo.", "Hindi mo maaaring idagdag ang GM.", ""],
   "You sent a request to this player already.\n\nAsk him to add you, or re-enter to the server to send him again.": ["Ya le enviaste una solictud de amistad a este usuario.\n\nDile si te puede agregar, o re-ingresa al servidor para enviarle una nueva solicitud.", "Voc\u00ea j\u00e1 enviou um pedido de amizade para este jogador.\n\nPe\u00e7a para ele adicionar voc\u00ea, ou re-entre no servidor para mandar um pedido novamente.", "Nagpadala ka ng request sa player na ito.\n\nTanong mo siya para iadd ka, o pumasok ka ulit sa server at subukan muli", ""],
   "Too Many Friends": ["Demasiados Amigos", "Muitos Amigos", "Masyado ka nang maraming kaibigan", ""],
   "You have %% friends.\nLimit = 100 (+ Per Level)\n\nPlease delete some inactive friends first, and then invite again.": ["Usted tiene %% amigos.\nLimite = 100 (+ Por Nivel)\n\nPor favor, elimine a algunos amigos inactivos y luego manda invitaciones otra vez.", "Voc\u00ea tem %% amigos.\nLimite = 100 (+ Por Level)\n\nPor favor delete alguns amigos inativos primeiro, e ent\u00e3o convide novamente.", "Mayroon ka nang %% na kaibigan.\nLimit = 100 (+ Per Level)\n\nMagdelete ng mga kaibigang hindi na naglalaro, at muling maginvite", ""],
   "User Has Too Many Friends": ["Este usuario tiene muchos amigos", "O jogador tem muitos amigos", "Masyado nang maraming kaibigan ang user", ""],
   "That player has too many friends.\n\nAsk him to delete some friends to make space for you first.": ["Este usuario tiene muchos amigos.\n\nPreg\u00fantale si puede eliminar a alguien para poder agregarte.", "Este jogador tem muitos amigos.\n\nPe\u00e7a para ele deletar algum amigo para liberar espa\u00e7o para voc\u00ea primeiro.", "Masyado nang maraming kaibigan ang manlalarong iyon. Hilingin muna sa kanya na magbura ng ilang kaibigan para magawan ka nya ng lugar sa kanyang buddy list.", ""],
   "Friend Request Sent": ["Solicitud de Amistad enviada", "Pedido de Amizade enviado", "Napadala na ang friend request", ""],
   "You asked %% to be friends.\n\nWhen he approves your request you will see the friend in your Buddy List.": ["Le pediste a %% ser amigos.\n\nCuando se apruebe tu solicitud podr\u00e1s verlo como amigo en tu Lista de Amigos.", "Voc\u00ea pediu %% para ser seu amigo.\n\nQuando ele aceitar seu pedido voc\u00ea ir\u00e1 ver seu amigo em sua Lista de Amigos.", "Tinanong mo si %% upang maging iyong kaibigan.\n\n pag inaproba niya ay makikita mo siya sa iyong buddy list.", ""],
   "Friend Added :)": ["Amigo agregado :)", "Amigo Adicionado :)", "Nadagdag na ang iyong kaibigan :)", ""],
   "You have a new friend.\n\nYou can now see where is your friend in your Buddy List, and private chat even at different rooms.": ["Tienes un nuevo amigo: %%\n\nAhora puedes ver d\u00f3nde se encuentra en tu Lista de Amigos, y enviarle chats privados a diferentes servidores.", "Voc\u00ea tem um novo amigo: %%\n\nVoc\u00ea pode ver onde seu amigo est\u00e1 na sua Lista de Amigos e abrir um chat privado mesmo em uma sala diferente.", "Mayroon kang bagong kaibigan.\n\nMakikita mo na siya sa buddy list, at private chat sa ibang mga kwarto", ""],
   "Sorry, you can send private messages to friends and guild members only.": ["Lo sentimos, solo puedes enviarles mensajes privados a tus amigos y miembres de tu guild.", "Desculpe, voc\u00ea pode mandar mensagens privadas para amigos e membros da guild apenas.", "Patawad, maaari ka lamang magpadala ng mensahe sa iyong mga kaibigan o kaguild", ""],
   "Friend Deleted :(": ["Amigo eliminado :(", "Amigo deletado :(", "Nadelete na ang iyong kaibigan", ""],
   "How sad...": ["Qu\u00e9 pena...", "Triste...", "Nakakalungkot...", ""],
   "You are not in a guild": ["Usted no est\u00e1 en un guild", "Voc\u00ea n\u00e3o est\u00e1 em uma guild", "Wala kang guild", ""],
   "The user is not in your guild.": ["Este usuario no est\u00e1 en tu guild", "O usu\u00e1rio n\u00e3o est\u00e1 em sua guild", "Ang user na ito ay wala sa guild", ""],
   "You do not have kick powers, ask the guild leader to kick.": ["Usted no puede sacar miembros de su guild, preg\u00fantale al l\u00edder del guild que lo haga", "Voc\u00ea n\u00e3o tem poder para kickar, pe\u00e7a para o l\u00edder kickar.", "Walang kang power para manipa, itanong mo sa iyong pinuno upang siya ang manipa ng miyembro", ""],
   "You can not kick yourself.": ["No puedes kickearte a ti mismo.", "Voc\u00ea n\u00e3o pode kickar voc\u00ea mesmo.", "Hindi mo maaaring masipa ang iyong sarili", ""],
   Kicked: ["Kickeado", "Kickado", "Nasipa na", ""],
   "Can't set Boss mode if there are more than 4 players in the room.": ["No se puede jugar en modo Boss si hay en la sala m\u00e1s de 4 jugadores", "N\u00e3o pode mudar para Modo Chefe se tiver mais de 4 jogadores na sala.", "Hindi maset ang boss mode dahil may apat na tao na sa iyong room", ""],
   "You are already in a guild. You have to leave your guild first.": ["Usted ya est\u00e1 en un guild. Tienes que dejar tu guild primero", "Voc\u00ea j\u00e1 estar em uma guild. Voc\u00ea tem que sair da sua guild primeiro.", "Nasa guild ka na. Kinakailangan mo magleave muna sa dati mong guild", ""],
   "Guild name must be 2-6 letters.": ["El nombre del guild debe tener entre 2-6 letras.", "Nome da guild deve ter entre 2-6 letras.", "Ang guild name mo ay dapat 2-6 letters lamang.", ""],
   "Guild name must not contain filtered words.": ["El nombre del guild no debe tener palabras filtradas.", "O nome da guild n\u00e3o pode conter palavras filtradas.", "Ang guild name mo ay dapat walang mga filtered words.", ""],
   "Not enough gold. Creating a guild costs 50,000 Gold.": ["No hay suficiente Gold. Crear un guild cuesta 50,000 de Gold.", "Sem gold suficiente. Criar uma guild custa 50,000 de Gold.", "Hindi sapat ang ginto mo. Kinakailangan mo ng 50,000 gold upang gumawa ng guild", ""],
   "Already Exists": ["Ya existe", "J\u00e1 Existe", "Mayroon na", ""],
   "There is already a guild at this name. Please select a different name.": ["Ya existe un guild con este nombre. Por favor escoja otro nombre", "J\u00e1 existe uma guild com este nome. Por favor selecione um nome diferente.", "Mayroon nang guild na ganito ang pangalan. Kung maaari lamang ay pumili ng iba", ""],
   Done: ["Listo", "Feito", "Tapos", ""],
   "Guild created! You are the guild leader. You can now invite players to join it.": ["\u00a1Guild creado! Usted es el l\u00edder del guild. Ahora puedes invitar jugadores a que se unan", "Guild criada! Voc\u00ea \u00e9 o l\u00edder da guild. Voc\u00ea pode convidar jogadores para se juntar a sua guild.", "Nagawa na ang guild! Ikaw ang pinuno. Maaari kang magimbita ng ibang manlalaro para sumali sayo.", ""],
   "You can not invite yourself.": ["No puedes invitarte a ti mismo.", "Voc\u00ea n\u00e3o pode convidar voc\u00ea mesmo.", "Hindi mo maiimbita ang iyong sarili.", ""],
   "You do not have invite powers, ask the guild leader to invite.": ["Usted no tiene los poderes para invitar, p\u00eddele al l\u00edder del guild que lo invite.", "Voc\u00ea n\u00e3o tem poder para convidar, pe\u00e7a para o l\u00edder da guild convidar.", "Wala kang power para magimbita, tanong mo ang iyong pinuno para gawin para sayo.", ""],
   "You sent a request to this player already.\n\nRe-enter to the server to send him again.": ["Usted ya le ha enviado una solicitud a este usuario.\n\nRe-ingresa al server para invitarlo otra vez.", "Voc\u00ea j\u00e1 enviou uma solicita\u00e7\u00e3o para este jogador.\n\nRe-entre no server para mandar novamente.", "Nagpadala ka ng request sa player na ito dati.\n\nSubukan na pumasok muli sa server at i-send muli", ""],
   "Guild is full.": ["El guild est\u00e1 lleno.", "A guild est\u00e1 cheia.", "Puno na ang guild.", ""],
   "This player is already in a guild. Ask him to leave his current guild before you can invite him/her.": ["Este usuario ya tiene guild. Preg\u00fantale si puede dejar su actual guild antes de inivtarlo(a)", "Este jogador j\u00e1 possui uma guild. Pe\u00e7a para ele sair de sua guild atual antes de voc\u00ea convidar ele/ela.", "Nasa guild na ang itong player, pakisabi na umalis muna siya sa kanyang guild upang maimbita mo siya", ""],
   "Guild Invite Sent": ["Solicitud de guild enviada", "Convite de Guild enviado", "Napadala na ang guild invite", ""],
   "You asked %% to join your guild.\n\nWhen he approves your request he will join the guild.": ["Le pediste a %% que se una a tu Guild.\n\nCuando apruebe tu solicitud, se unir\u00e1 a tu guild.", "Voc\u00ea pediu %% para se juntar a sua guild.\n\nQuando ele aceitar seu pedido, ele ir\u00e1 se juntar a guild.", "Tinanong mo si %% na sumali sa iyong guild.\n\n Pag nagaprove siya, kasali na siya sa iyong guild", ""],
   "You have 1 Free name change": ["Tienes un cambio de nick gratis", "", "Mayroon kang isang libreng change name", ""],
   "Name Change costs 4,000 Cash": ["Cambiarte de nick cuesta 4,000 Cash", "", "Ang halaga ng pagpalit ng pangalan ay 4,000 cash", ""],
   "Joined Guild :)": ["Guild Registrado :)", "", "Nakasali sa guild", ""],
   "You have joined the guild.\n\nYou can now see where is your friend in your Guild Tab, and private chat even at different rooms.": ["Usted se a unido al guild.\n\nAhora puede ver donde esta tu amigo en tu Guild , chat privado incluso en sala diferentes.", "", "Nakasali ka na sa guild.\n\nMaaari mo nang makita ang mga kaibigan mo sa guild tab, sa private chat o sa ibang kwarto pa man", ""],
   "Guild leader can not leave his guild while there are other members. If you are the last one to leave, the guild will be closed and deleted.": ["El lider no puede salir del Guild , mientras que hay otros miembros . si usted es el ultimo en salir , el Guild sera cerrado y eliminado", "", "Ang guild leader ay hindi maaaring umalis sa guild niya habang mayroon pang mga miyembro. Kapag ikaw ang huli na aalis, ang guild ay sasarado na", ""],
   "Nobody left in the guild, so the guild was closed. The name is now available for new guilds.": ["Nadie se queda en el Guild , por que el Guild estaba cerrado . El nombre ya esta disponible para nuevos Guilds.", "", "Wala nang nasa guild, kaya sarado na ito. Maaari na ito kunin ng ibang mga tao", ""],
   "You left your guild...\n\nHow sad... :(": ["Dejo su Guild .... \n\n!Que Triste ... :(", "", "Umalis ka sa iyong guild...\n\nNakakalungkot...", ""],
   "Nothing to do": ["Nada que hacer", "", "Walang magawa", ""],
   "The new name is the same as your current name.": ["El nuevo nick es igual a tu actual nick.", "", "Ang bagong pangalan na pinili mo ay pareho sa pangalan mo sa kasalukuyan", ""],
   "Name length must be 2-15": ["El nombre debe contener 2-15", "", "Ang haba ng pangalan ay kinakailangan sa gitna ng 2-15", ""],
   "Name must contain at least 2 english letters a-z/A-Z": ["El nombre debe conecter aunque sea 2 letras a-z/A-Z", "", "Ang pangalan ay dapat mayroong hindi kukulang na 2 English letters a-z/A-Z", ""],
   "Name contains a character that is not allowed.<p>Allowed chars": ["El nombre contiene un caracter no permitido <p> caracteres permitidos.", "", "Ang pangalan ay mayroong letra na hindi maaaring gamitin.<p>Mga allowed na chars", ""],
   "Not enough cash.<p>Name change costs 4,000 cash.": ["No Tiene suficiente cash.<p>El cambio de nick cuesta 4,000 Cash.", "", "Hindi sapat ang cash mo.<p>Ang name change ay 4,000 Cash", ""],
   "The new name contains a word which is not allowed. Please select a different one.": ["El nuevo nombre contiene una palabra que no esta permitida. Por favor seleccione uno diferente", "", "Ang bagong pangalan ay mayroong salita na hindi maaaring gamitin. Pumili ng iba", ""],
   "Not enough time passed since last name change. Check that your name was not changed already, if you change again, it will cost you again.<br>Please wait 30 minutes before you can change again.": ["No a pasado mucho tiempo desde el ultimo cambio de nick. Compruebe si su nick no a cambiado ya, si lo cambia otra vez, le costara nuevamente.<br> Por favor espere 30 minutos antes de cambiar de nuevo.", "", "Kinulangan ng oras dahil sa pagchange name mo. Tignan muli, pagnagchange ka ulit ay kinakailangan mo bayaran muli.<br>Maghintay ng 30 minuto upang makapagpalit muli", ""],
   "This name already exists, please select a different one.": ["Este nombre ya existe, por favor seleccione uno diferente.", "", "Mayroon nang ganitong pangalan, kung maaari lamang ay pumili ng iba", ""],
   "New Challenge Unlocked": ["Nuevo Desafio Desbloqueado", "", "Nagunlock ang bagong challenge", ""],
   "You killed my friend! Do you think you are so good?\n\nI challenge you for a duel!\n\nI will be waiting for you...": ["Usted mat\u00f2 a mi amigo! \u00bfTe crees tan bueno?  ", "", "Pinatay mo ang aking kaibigan! Kala mo ang galing mo?\n\nI Gusto kitang kalabanin para sa duel!\n\nHihintayin kita...", ""],
   "Not enough Cash. You can get more by charging.": ["No hay suficiente Cash. Puedes obtener mas recargando.", "", "Hindi sapat ang cash mo. Maaari kang makakuha ng masmarami sa paraan ng pagcharge", ""],
   "Not enough Gold. You can get more by playing.": ["No hay suficiente Oro. Puedes obtener mas jugando.", "", "Hindi sapat ang gold mo. Maaari kang makakuha pa sa paraan ng paglalaro", ""],
   "This avatar is not for your gender.": ["Este avatar no es para tu genero.", "", "Ang avatar na ito ay hindi para sa iyong kasarian", ""],
   Days: ["D\u00edas", "Dias", "", ""],
   Hours: ["Horas", "Horas", "", ""],
   Minutes: ["Minutos", "Minutos", "", ""],
   Seconds: ["Segundos", "Segundos", "", ""],
   "Press F5 to reload": ["Presione F5 para recargar", "Pressione F5 para recarregar", "", ""],
   Your: ["Su", "Seu", "", ""],
   "20,000 first players with 1100+ GP will get the (RARE) Beta Flag!<br>200% GP & GOLD for 2 days since open time!<br>2000 Free Cash every day at the Post Button!": ["", "20000 primeros jugadores con 1,100 + GP tendr\u00e1n la (RARE) Beta Flag!<br>200% de GP y Oro durante 2 d\u00edas desde el tiempo de apertura!<br>2000 caja libre todos los d\u00edas en el bot\u00f3n \u00a1Poste!", "", ""],
   "Welcome to DragonBound": ["Bienvenido a Dragonbound", "Bem-vindo ao DragonBound", "", ""],
   "Next generation online HTML5 realtime multiplayer game.<br><br>Click connect and start playing with your friends :)": ["Generaci\u00f3n en l\u00ednea HTML5 juego multijugador en Siguiente.<br>Haga clic en Conectar y empezar a jugar con tus amigos :)", "Pr\u00f3xima gera\u00e7\u00e3o on-line HTML5 jogo multiplayer.<br>Clique conectar e come\u00e7ar a jogar com os seus amigos :)", "", ""],
   "The next generation of HTML5 online multi-player games in your browser!": ["", "A nova gera\u00e7\u00e3o de jogos HTML5 online multi-jogador em seu navegador!", "", ""],
   "Play with or against your friends from your browser anywhere for free. Shop for avatars to make you stronger. Unlock hidden characters, game modes, and challenges. Meet new friends. Single player option too.": ["", "\u00c9 um jogo gratuito onde voc\u00ea pode jogar com ou contra seus amigos a partir do seu navegador em qualquer lugar, loja de avatares para torn\u00e1-lo mais forte, desbloquear personagens ocultos, modos de jogo e desafios. Conhecer novos amigos e jogar sozinho tamb\u00e9m.", "", ""],
   "Waiting for an opponent": ["Esperando un oponente", "", "", ""],
   "Tournament not started yet.": ["Torneo No Iniciado Aun.", "", "", ""],
   "Tournament ended.": ["Torneo Terminado.", "", "", ""],
   "Games Now": ["Juegos ahora", "", "", ""],
   "Games Last 5 Minutes": ["Juegos en 5 minutos", "", "", ""],
   "Games Since Server Reset": ["Juegos desde el reinicio del servidor", "", "", ""],
   "Average Waiting Time": ["Promedio de tiempo de espera", "", "", ""],
   "New Password": ["Nueva contrase\u00f1a", "", "", ""],
   "Password Changed": ["Contrase\u00f1a cambiada", "", "", ""],
   "Change Password": ["Cambiar Contrase\u00f1a", "", "", ""],
   "Too Short": ["Demasiado corto", "", "", ""],
   "Too Easy": ["Demasiado facil", "", "", ""],
   Good: ["Bien", "", "", ""],
   "Secret Number": ["Numero Secreto", "", "", ""],
   "Password too short. Length 6+ needed.": ["Contrase\u00f1a muy corta. Necesario 6+ caracteres.", "", "", ""],
   "Password too easy to guess. Make it harder.": ["Contrase\u00f1a muy f\u00e1cil de adivinar. Ponga una mas dificil.", "", "", ""],
   "Secret number too short. Length 6+ needed.": ["Numero secreto muy corto. Necesario 6+ caracteres.", "", "", ""],
   "Secret number too easy to guess. Make it harder.": ["Numero secreto muy f\u00e1cil de adivinar. Ponga una mas dificil.", "", "", ""],
   "Create Team": ["Crear Equipo", "", "", ""],
   "Join Team": ["Unirse al Equipo", "", "", ""],
   "Start 1v1 Game": ["Iniciar Juego de 1v1", "", "", ""],
   "4v4 Guild vs Guild Games": ["Juegos de Guild vs Guild (4v4)", "", "", ""],
   "^ Click ^<br><br>Want More DragonBound Cash?<br><br>There are many ways to get cash!<br><br>Select one and see how :)": ["^ Click ^<br><br>Quieres mas Dragonbound Cash?<br><br>Hay muchas maneras de obtener el cash!<br><br>Selecciona una de estas opciones y mira como hacerlo! :)", "^ Click ^<br><br>Quer mais Dragonbound Cash?<br><br>Existem muitas maneiras de ganhar cash<br><br>Selecione uma destas op\u00e7\u00f5es e veja como :)", "", ""],
   "Need 4 players of the same guild to play on this server.": ["Necesita 4 jugadores del mismo Guild para jugar en \u00e9ste servidor.", "", "", ""],
   "Set a new password so you can always login to your account even without Facebook.<br><br>Write down your new username!<br><br>(You can change it at [My-Info])": ["Establezca una nueva contrase\u00f1a para que siempre pueda acceder a su cuenta, incluso sin Facebook.<br><br>Escriba su nuevo nombre de usuario!<br><br>(Puede cambiarlo en [My-Info])", "", "", ""]
};
Object.freeze(DragonLanguage.prototype);
var DragonThemeDefault = {
   lobby_bg: ".",
   room_bg: ".",
   shop_bg: ".",
   ranks: "/static/images/lobby_stuff4.png",
   lobby_stuff: "/static/images/lobby_stuff6.png",
   room_stuff: "/static/images/room_stuff2.png",
   game_stuff: "/static/images/game_stuff6.png",
   scores_stuff: "/static/images/scores_stuff2.png",
   shop_stuff: "/static/images/shop_stuff3.png",
   bg_full: "/static/images/themes/gl/bg_full.jpg",
   maps: "/static/images/themes/gl/maps.png",
   items: "/static/images/items2.png",
   map0_name: "Dragon Lava",
   map0_bg: "dragonlava_bg.jpg",
   map0_fg: "dragonlava.jpg",
   map0_bgcolor: "#634a4a",
   map1_name: "Space",
   map1_bg: "space_bg2.jpg",
   map1_fg: "ground_rock.jpg",
   map1_bgcolor: "#5a1400",
   map2_name: "Metropolis",
   map2_bg: "space_bg.jpg",
   map2_fg: "ground_purple.jpg",
   map2_bgcolor: "#634a4a",
   map3_name: "Sea Of Hero",
   map3_bg: "sea_bg2.jpg",
   map3_fg: "ground_leaf.jpg",
   map3_bgcolor: "#84b6ce",
   map4_name: "Lion Jungle",
   map4_bg: "forest_bg.jpg",
   map4_fg: "ground_forest.jpg",
   map4_bgcolor: "#84b6ce",
   map5_name: "Dragon",
   map5_bg: "xmas_bg2.jpg",
   map5_fg: "ground_xmas.jpg",
   map5_bgcolor: "#94424a",
   map6_name: "Cozy Tower",
   map6_bg: "sky_bg.jpg",
   map6_fg: "ground_leaf.jpg",
   map6_bgcolor: "#8c5a31",
   map7_name: "Dummy Slope",
   map7_bg: "sea_bg3.jpg",
   map7_fg: "ground_purple.jpg",
   map7_bgcolor: "#de7329",
   map8_name: "Thousand Sunny",
   map8_bg: "thousandsunny_bg.jpg",
   map8_fg: "ground_thousandsunny.jpg",
   map8_bgcolor: "#39314a",
   map9_name: "Mayan",
   map9_bg: "balloon_bg.jpg",
   map9_fg: "ground_maya.jpg",
   map9_bgcolor: "#ac5008",
   map10_name: "Cave",
   map10_bg: "xmas_bg.jpg",
   map10_fg: "ground_purple.jpg",
   map10_bgcolor: "#634a4a",
   map11_name: "Secret",
   map11_bg: "sea_bg4.jpg",
   map11_fg: "ground_xmas.jpg",
   map11_bgcolor: "#634a4a"
},
    DragonThemeBR = {
      shop_bg: "/static/images/themes/br/shop_bg.jpg",
      ranks: "/static/images/themes/classic/ranks.png",
      lobby_stuff: "/static/images/themes/br/lobby_stuff2.png",
      maps: "/static/images/themes/classic/maps.png",
      map0_name: "Miramo Town",
      map0_bg: "miramo_bg.jpg",
      map0_fg: "miramo.png",
      map1_name: "Nirvana",
      map1_bg: "nirvana_bg.jpg",
      map1_fg: "nirvana.png",
      map2_bg: "metro_bg.jpg",
      map2_fg: "metro.png",
      map3_bg: "sea_bg.jpg",
      map3_fg: "sea.png",
      map4_name: "Adium Root",
      map4_bg: "adium_bg.jpg",
      map4_fg: "adium.png",
      map5_bg: "dragon_bg.jpg",
      map5_fg: "dragon.png",
      map6_bg: "cozy_bg.jpg",
      map6_fg: "cozy.png",
      map7_bg: "dummy_bg.jpg",
      map7_fg: "dummy.png",
      map8_name: "Star Dust",
      map8_bg: "star_bg.jpg",
      map8_fg: "star.png",
      map9_name: "Meta Mine",
      map9_bg: "metamine_bg.jpg",
      map9_fg: "metamine.png",
      map10_bg: "cave_bg.jpg",
      map10_fg: "cave.png",
      map11_bg: "secret_bg.jpg",
      map11_fg: "secret.png"
    },
    DragonThemeDefaultBR = {},
    i;
for (i in DragonThemeDefault) DragonThemeDefaultBR[i] = DragonThemeBR[i] ? DragonThemeBR[i] : DragonThemeDefault[i];
var DragonThemeInUse = DragonThemeDefault;

function DragonTheme_SetTheme(a) {
   a || (a = {});
   var a = DragonThemeInUse = a,
       b = a.lobby_bg ? a.lobby_bg : DragonThemeDefault.lobby_bg,
       d = a.room_bg ? a.room_bg : DragonThemeDefault.room_bg,
       c = a.shop_bg ? a.shop_bg : DragonThemeDefault.shop_bg,
       e = a.lobby_stuff ? a.lobby_stuff : DragonThemeDefault.lobby_stuff,
       f = a.room_stuff ? a.room_stuff : DragonThemeDefault.room_stuff,
       j = a.game_stuff ? a.game_stuff : DragonThemeDefault.game_stuff,
       m = a.scores_stuff ? a.scores_stuff : DragonThemeDefault.scores_stuff,
       k = a.shop_stuff ? a.shop_stuff : DragonThemeDefault.shop_stuff,
       p = a.bg_full ? a.bg_full : DragonThemeDefault.bg_full,
       h = a.ranks ? a.ranks : DragonThemeDefault.ranks,
       n = a.maps ? a.maps : DragonThemeDefault.maps,
       o = a.items ? a.items : DragonThemeDefault.items;
   $("#DragonTheme").text("body {background-image: url(" + p + ");}\n#channelScreen {background-image: url(" + b + ");}\n#roomScreen {background-image: url(" + d + ");}\n#shopScreen {background-image: url(" + c + ");}\n.rank {background-image: url(" + h + ");background-repeat:no-repeat;}\n.itemDual,.itemTeleport {background-image: url(" + o + ");background-repeat:no-repeat;}\n.roomMap, #room_map, #RoomOptionsMapImage {background-image: url(" + n + ");background-repeat:no-repeat;}\n.zotata-chat-icon,.room,.roomExtraInfo,.status,.roomLocked,#dialogCreateRoom,#BrokerLogout,.LobbyButton,.iconModeNormal,.iconModeBoss,.iconModeSame,.gameModeNormal,.gameModeBoss,.gameModeSame,#OptionsDialog,#BrokerRefresh,.players1v1,.players2v2,.players3v3,.players4v4,.players1vB,.players2vB,.players3vB,.players4vB,#CreateRoomPassword,.buttonOK,.buttonCancel,.buttonPrev,.buttonNext,.checkboxOff,.checkboxOn,.CheckboxOff,.CheckboxOn,.AlertBox,#ConnectWithFacebook,#ConnectWithPassword,#buttonRanking,#dialogCreateLocked,#RoomOptionsModeLocked,#OptionsOK,#OptionsLeave,.RadioOn,.RadioOff,#infoAddBuddy,#infoGuildInvite,.chatDialogDelete,.chatDialogGuildKick,.roomBuddy,.roomGuildMember,#guild_create,#guild_leave,.BrokerChannel,.paypal_corner,.buttonClose,#new_img,.BrokerChannelFullIcon,.imgLock {background-image: url(" + e + ");background-repeat:no-repeat;}\n#roomButtonBack,#roomButtonChangeTeam,.buttonMobile,.roomPlayerInfo,.roomPlayerNotReady,.roomPlayerReady,.roomPlayerMaster,.roomPlayerShadow,.roomBotSelect,.roomBotRemove,.roomPlayerBalloonTip,#room_timer,.GamePlayerBalloonTip,#room_change_title_button,#room_options_button,#add_bot_button,#playerInfoDialog,#infoRankingTab,#infoChat,#infoClose,.ChatDialog,.chatDialogClose,#room_item_buddy_tab,#dialog_room_options {background-image: url(" + f + ");background-repeat:no-repeat;}\n.weather-0,.weather-1,#message_over_items.items_locked,#message_over_items.sudden_death,#gameui,#powerBar,#powerMark,.Turn,.DamageDigit,.LastAngleDigit,.UIGoldDigit,#btnShot1,#btnShot2,#btnShotSS,#btnPass,#btnEsc,#last_power_mark,#all_chat,#team_chat,.turn_line_number,#slice_drag_button,.imgS1 {background-image: url(" + j + ");background-repeat:no-repeat;}\n#game_over,#scores_lose_a,#scores_lose_b,.score,.score_me {background-image: url(" + m + ");background-repeat:no-repeat;}\n.shopButton,.shop_item,.shop_item_icon,.stat_icon,.stat_font,.shop_my_item,.shop_my_item_cash,.shop_my_item_gift,.shop_my_item_icon,.shop_my_item_equip.equipped,#shop_buy_dialog {background-image: url(" + k + ");background-repeat:no-repeat;}\n");
   e = $("#channelName,#channel,#channelInput");
   j = $("#playersList");
   f = $("#myInfoBox");
   "." == b ? (e.addClass("TBGnBorder"), j.addClass("TBG"), f.show()) : (e.removeClass("TBGnBorder"), j.removeClass("TBG"), f.hide());
   f = $("#shopOverly");
   "." == c ? f.show() : f.hide();
   e = $("#roomChat,#roomInput");
   b = $("#room_map");
   c = $("#room_options_button");
   f = $("#roomOverly");
   "." == d ? (e.addClass("TBGnBorder"), b.addClass("room_map_fix"), c.addClass("room_options_button_fix"), f.show()) : (e.removeClass("TBGnBorder"), b.removeClass("room_map_fix"), c.removeClass("room_options_button_fix"), f.hide());
   for (d = 0; d < MAPS.length; d++) SetMapBgFgColor(d, a["map" + d + "_bg"] ? a["map" + d + "_bg"] : DragonThemeDefault["map" + d + "_bg"], a["map" + d + "_fg"] ? a["map" + d + "_fg"] : DragonThemeDefault["map" + d + "_fg"], a["map" + d + "_bgcolor"] ? a["map" + d + "_bgcolor"] : DragonThemeDefault["map" + d + "_bgcolor"], a["map" + d + "_name"] ? a["map" + d + "_name"] : DragonThemeDefault["map" + d + "_name"]);
   a.mobiles_hack ? (MOBILES[MOBILE.ARMOR] = {
      name: "Armor",
      file: "armor",
      player_x: 17,
      player_y: -28,
      explodes: [EXPLODE.ARMOR1, EXPLODE.ARMOR2, EXPLODE.ARMORSS],
      bullets: [BULLETS.ARMOR1, BULLETS.ARMOR2, BULLETS.ARMORSS, BULLETS.ARMOESS2],
      graphics: [
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37],
         [36, 40, 21, 37]
      ]
   }, MOBILES[MOBILE.ICE].name = "Ice", MOBILES[MOBILE.ICE].file = "ice", BULLET[BULLETS.ICE1].file = "ice1", BULLET[BULLETS.ICE2].file = "ice2", BULLET[BULLETS.ICESS].file = "iceSS", EXPLODES[EXPLODE.ICE1].file = "ice1", EXPLODES[EXPLODE.ICE2].file = "ice2", EXPLODES[EXPLODE.ICESS].file = "iceSS", MOBILES[MOBILE.JD] = {
      name: "J.D",
      file: "jd",
      player_x: 11,
      player_y: -34,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
      bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
      graphics: [
         [35, 45, 17, 43],
         [35, 45, 17, 43],
         [34, 45, 17, 43],
         [35, 45, 18, 43],
         [35, 45, 18, 43],
         [35, 45, 18, 43],
         [35, 45, 18, 43],
         [35, 45, 18, 43],
         [35, 45, 18, 43],
         [35, 45, 18, 43],
         [34, 45, 17, 43],
         [35, 45, 17, 43],
         [35, 45, 17, 43],
         [35, 44, 17, 42],
         [35, 44, 17, 42],
         [35, 44, 17, 42],
         [35, 44, 17, 42],
         [35, 45, 17, 43],
         [35, 45, 17, 43],
         [35, 45, 17, 43]
      ]
   }, MOBILES[MOBILE.ASATE] = {
      name: "A.Sate",
      file: "asate",
      player_x: -2,
      player_y: -30,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.JD2, EXPLODE.JDSS],
      bullets: [BULLETS.JD1, BULLETS.JD2, BULLETS.JDSS],
      graphics: [
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 31, 25, 33],
         [44, 31, 25, 33],
         [44, 31, 25, 33],
         [44, 31, 25, 33],
         [44, 31, 25, 33],
         [44, 31, 25, 33],
         [44, 31, 25, 33],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32],
         [44, 30, 25, 32]
      ],
      ion_file: "asateIon",
      ion_graphics: [
         [32, 19, 16, 9],
         [32, 18, 16, 9],
         [32, 17, 16, 8],
         [32, 15, 16, 7],
         [32, 14, 16, 7],
         [32, 12, 16, 6],
         [32, 14, 16, 7],
         [32, 17, 16, 9],
         [32, 17, 16, 9],
         [32, 17, 16, 9],
         [32, 14, 16, 7],
         [32, 12, 16, 6],
         [32, 13, 16, 7],
         [32, 15, 16, 8],
         [32, 17, 16, 9],
         [32, 18, 16, 9],
         [32, 19, 16, 10],
         [32, 20, 16, 10],
         [32, 20, 16, 10],
         [32, 20, 16, 10]
      ]
   }, MOBILES[MOBILE.LIGHTNING] = {
      name: "Lightning",
      file: "lightning",
      player_x: 10,
      player_y: -34,
      explodes: [EXPLODE.LIGHTINING12_JD1, EXPLODE.LIGHTNINGSS],
      bullets: [BULLETS.LIGHTNING12, BULLETS.LIGHTNINGSS],
      graphics: [
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35],
         [42, 37, 19, 35]
      ]
   }, MOBILES[MOBILE.BIGFOOT] = {
      name: "BigFoot",
      file: "bigfoot",
      player_x: -2,
      player_y: -31,
      explodes: [EXPLODE.BIGFOOT1SS, EXPLODE.BIGFOOT2],
      bullets: [BULLETS.BIGFOOT1, BULLETS.BIGFOOT2, BULLETS.BIGFOOTSS],
      graphics: [
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [50, 45, 25, 41],
         [50, 45, 25, 41],
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [49, 45, 24, 41],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42],
         [49, 46, 24, 42]
      ]
   }, MOBILES[MOBILE.RANDOM] = {
      name: "Random",
      file: "random",
      player_x: 4,
      player_y: -38,
      graphics: [
         [25, 45, 19, 50],
         [26, 45, 19, 50],
         [24, 45, 19, 50],
         [23, 45, 19, 50],
         [25, 45, 19, 50],
         [26, 45, 19, 50],
         [25, 45, 19, 50],
         [23, 45, 19, 50],
         [25, 45, 19, 50],
         [26, 45, 19, 50],
         [24, 45, 19, 50],
         [23, 45, 19, 50]
      ]
   }) : InitGlobals();
   DragonTheme_Save()
}
function DragonTheme_Save() {
   3E3 > DragonTheme_ToJSON(!0).length && setCookie("theme", DragonTheme_ToJSON(!0))
}
function DragonTheme_Load() {
   "br" == SERVER_TYPE && (DragonThemeDefault = DragonThemeDefaultBR);
   DragonTheme_SetThemeFromJSON(getCookie("theme")) || DragonTheme_SetThemeFromJSON()
}

function DragonTheme_ChangeOneProperty(a, b, d) {
   if (!DragonThemeDefault[a]) return 0;
   b || (b = void 0);
   if (DragonThemeInUse[a] == b) return 0;
   b && d && DoesFileExist(b, !1, function(c) {
      d(a, c)
   });
   DragonThemeInUse[a] = b;
   DragonTheme_SetTheme(DragonThemeInUse);
   return 1
}
function DragonTheme_GetValue(a) {
   return DragonThemeInUse[a] != DragonThemeDefault[a] ? DragonThemeInUse[a] : ""
}
function DragonTheme_ToJSON(a) {
   var b = JSON.stringify(DragonThemeInUse);
   "{}" == b ? b = "" : a || (b = b.replace(/","/g, '",\n"'));
   return b
}

function DragonTheme_SetThemeFromJSON(a) {
   if (DragonTheme_ToJSON() == a) return 0;
   try {
      var b = a ? JSON.parse(a) : {};
      DragonTheme_SetTheme(b);
      return 1
   } catch (d) {
      return -1
   }
}

function classic() {
   for (var a in DragonThemeDefaultBR) if (0 == a.indexOf("map") && -1 == a.indexOf("_name") || 0 == a.indexOf("ranks")) DragonThemeInUse[a] = DragonThemeDefaultBR[a];
   DragonThemeInUse.mobiles_hack = 1;
   DragonTheme_SetTheme(DragonThemeInUse);
   alertify.alert("Changed Maps/Ranks/Mobiles Graphics! ;)<br><br>You can disable it at [Options]->[Change Graphics]<br><br>")
}

function mobiles_hack() {
   DragonThemeInUse.mobiles_hack = 1;
   DragonTheme_SetTheme(DragonThemeInUse);
   alertify.alert("Changed Mobiles Graphics! ;)<br><br>You can disable it at [Options]->[Change Graphics]<br><br>")
};
var PLAYER_LOOK_LEFT = 0,
    PLAYER_LOOK_RIGHT = 1,
    DIV_TO_CREATE_GAME_OBJECTS = "#game_objects",
    myhash = 8912673,
    TURN_TIME = 20,
    KEY = {
      Backspace: 8,
      Tab: 9,
      Enter: 13,
      Ctrl: 17,
      Esc: 27,
      Space: 32,
      Left: 37,
      Up: 38,
      Right: 39,
      Down: 40,
      F1: 112,
      F2: 113,
      F3: 114,
      F4: 115,
      F5: 116,
      F6: 117,
      F7: 118,
      F8: 119,
      F9: 120,
      F10: 121
    },
    g_last_shot_sound_time;

function CShot(a, b, d, c, e, f) {
   if (!(this instanceof arguments.callee)) throw Error("Constructor called as a function");
   var j = function(a, c, b, d, e, f) {
      this.x0 = a;
      this.y0 = c;
      this.v = new Vector(b, d);
      this.ax = e;
      this.ay = f
   };
   j.prototype.GetPosAtTime = function(a) {
      a /= 1E3;
      return {
         x: this.x0 + this.v.x * a + this.ax * a * a / 2,
         y: this.y0 + this.v.y * a + this.ay * a * a / 2
      }
   };
   j.prototype.GetAngleAtTime = function(a) {
      var c = this.GetPosAtTime(a - 10),
          a = this.GetPosAtTime(a + 10);
      return RadToAngle(Math.atan2(a.y - c.y, a.x - c.x))
   };
   this.shot = b;
   this.unique_id = a;
   this.div_id = "#Shot" + a;
   this.div_id2 = "#ShotB" + a;
   this.pic_div_id = this.div_id + " " + this.div_id2;
   this.start_time = get_time();
   this.zp = new j(b.start.x, b.start.y, b.start.ang, b.start.power, b.start.ax, b.start.ay);
   this.callback_finish = c;
   this.created_div = !1;
   this.is_camera_focus = d;
   this.thor = b.thor;
   this.shooting_player = e;
   this.game = f;
   b.ss && $("#ss_shot_background").fadeIn();
   this.shot.start.t || this.CreateDiv();
   var m = this;
   this.interval = setInterval(function() {
      m.update()
   }, 30)
}
CShot.prototype.CreateDiv = function() {
   if (this.thor) {
      var a = 3E3;
      this.shot.hole && (a = Math.round(Dist2Points(this.shot.start.x, this.shot.start.y, this.shot.hole[0], this.shot.hole[1])));
      this.game.ThorShoot(this.shot.start.x, this.shot.start.y, this.shot.start.ang, a);
      this.Remove();
      this.callback_finish(this.unique_id)
   } else {
      if ((a = BULLET[this.shot.img]) && a.file) {
         $(DIV_TO_CREATE_GAME_OBJECTS).append('<div class="Shot" id="' + this.div_id.slice(1) + '"><div id="' + this.div_id2.slice(1) + '"></div></div>');
         var b = -1 == a.file.indexOf("/") ? "bullets/" + a.file + ".png" : a.file;
         this.anim_obj = new CAnimatedObject2(b, a.graphics, 0, 0, this.div_id2, 1, 20, !1, LOOP_NORMAL, 0, 19, !0)
      } else $(DIV_TO_CREATE_GAME_OBJECTS).append('<div class="Shot" id="' + this.div_id.slice(1) + '"><div class="shot_img shot_img_' + this.shot.img + '" id="' + this.div_id2.slice(1) + '"></div></div>');
      this.created_div = !0;
      b = get_time();
      if ((void 0 == g_last_shot_sound_time || b >= g_last_shot_sound_time + 10) && a) g_last_shot_sound_time = b, this.shot.is_lightning || AudioPlay(a.sound);
      a.ion ? $("#ss_shot_background").is(":visible") ? this.shooting_player.SetIon(this.shot.start.ang, this.shot.start.x - this.shooting_player.x, this.shot.start.y - this.shooting_player.y, 100) : this.shooting_player.SetIon(this.shot.start.ang) : a.ion_height && this.shooting_player.SetIon(void 0, 0, 1 == a.ion_height ? -200 : -600, 500)
   }
};
CShot.prototype.update = function() {
   var a = get_time() - this.start_time;
   if (void 0 != this.shot.start.t) if (a >= this.shot.start.t) a -= this.shot.start.t, this.created_div || this.CreateDiv();
   else
   return;
   if (!this.thor) if (a >= this.shot.time) this.Remove(), this.callback_finish(this.unique_id);
   else {
      var b = this.zp.GetPosAtTime(a),
          d = this.zp.GetAngleAtTime(a);
      $(this.div_id).css({
         left: b.x,
         top: b.y
      });
      $(this.pic_div_id).css({
         rotate: +d + "deg"
      });
      this.shot.change && a >= this.shot.change.at && $(this.pic_div_id).removeClass().addClass("shot_img shot_img_" + this.shot.change.img);
      this.is_camera_focus && (500 < a && !this.game.isInMapDraggin) && this.game.camera.FocusAt(b.x, b.y, !0, !0)
   }
};
CShot.prototype.Remove = function() {
   this.interval = clearInterval(this.interval);
   $(this.div_id).remove();
   this.anim_obj && this.anim_obj.remove();
   if (this.shot.ss) {
      var a = BULLET[this.shot.img],
          b = this.shooting_player;
      setTimeout(function() {
         a.ion_ss && b.SetIon(void 0, 0, -200, 400);
         $("#ss_shot_background").fadeOut()
      }, 1E3)
   }
};
Object.freeze(CShot.prototype);

function CDamageEffect(a, b, d, c, e, f) {
   if (!(this instanceof arguments.callee)) throw Error("Constructor called as a function");
   var d = Math.round(d),
       j = f ? "Blue" : "Red";
   !f && 0 < d && (j = "Green");
   var m = "#DamageEffect_" + c + "_" + e + "_" + j + (0 <= d ? "P" : "-"),
       k = $(m);
   0 < k.length && (d += Number(k.attr("damage")), a = Number(k.attr("x")), b = Number(k.attr("y")), $(m).remove());
   k = String(d);
   "Red" != j && 0 < d && (k = "+" + k);
   for (var p = '<div class="DamageEffect" damage=' + d + " x=" + a + " y=" + b + ' id="' + m.slice(1) + '" style="left: ' + a + "px; top: " + b + 'px;">', h = 0; h < k.length; h++) {
      var n = k.charCodeAt(h);
      45 == n ? p += '<div class="DamageDigit DamageDigit' + j + '-" style="left:' + 14 * h + 'px;"></div>' : 43 == n ? p += '<div class="DamageDigit DamageDigit' + j + 'P" style="left:' + 14 * h + 'px;"></div>' : 48 <= n && 57 >= n && (p += '<div class="DamageDigit DamageDigit' + j + (n - 48) + '" style="left:' + 14 * h + 'px;"></div>')
   }
   $(DIV_TO_CREATE_GAME_OBJECTS).append(p + "</div>");
   setTimeout(function() {
      $(m).animate({
         top: "-=30"
      })
   }, 10);
   setTimeout(function() {
      $(m).fadeOut(3E3, function() {
         $(m).remove()
      })
   }, 2E3)
}

function DragonBound(a, b, d) {
   if (!(this instanceof arguments.callee)) throw Error("[DragonBound] Constructor called as a function");
   if (!a) throw Error("[DragonBound] missing my_user_id");
   var c = b[0],
       e = b[1],
       f = b[2],
       j = b[3],
       m = b[4],
       k = b[5],
       p = b[6],
       h = b[7],
       n = b[8],
       o = b[9],
       t = b[11],
       q = b[10],
       y = this;
   this.my_user_id = a;
   this.my_player_index = this.my_player_number = -1;
   this.queue = [];
   this.is_queue_executing = !1;
   this.players = [];
   this.shots = [];
   this.isInMapDraggin = !1;
   this.turn = -1;
   this.after_shot_chat = [];
   this.after_shot_gold = void 0;
   this.steps = this.no_ss_turns = 0;
   this.sudden_death_at_turn = 40;
   this.t = random(10, 20);
   this.s = random(60, 70);
   this.is_s1_disabled = q;
   this.dn = d;
   this.camera = new CCamera(o, function(a, c) {
      y.OnCameraUpdate(a, c)
   });
   this.WOX = random(0, 12);
   this.WOY = random(0, 6);
   $(DIV_TO_CREATE_GAME_OBJECTS).children().remove();
   this.UnselectAllItems();
   this.UpdateGuiGold(0);
   $("#last_power_mark").css("left", 240);
   $("#game_over").hide();
   $("#game_replay").hide();
   this.SetBinds();
   $(".Player .GamePlayerBalloon").hide();
   $(".Player .GamePlayerBalloonTip").hide();
   $(".Player .Turn").hide();
   $("#powerBar").css("width", 1);
   $("#walkBar").css("width", 400);
   $("#gameInput").val("");
   $("#gameChatHtml").html("");
   $("#gameChat .scrollbar").hide();
   $("#ss_shot_background").removeClass("sudden_death").hide();
   $("#message_over_items").removeClass().hide();
   $("#thor").css({
      left: 680,
      top: 0
   });
   $("#thor_rotate").children().not("#thor_laser").remove();
   this.thor_obj = new CAnimatedObject("thor", "thor.png", 0, 0, 159, 99, 97, 58, "#thor_rotate", 1, 20, 50, !1, g_graphics_high ? 1 : 3);
   TeamChatOff();
   this.SetWeather(p);
   this.UpdateWind([h, n]);
   this.UpdateThor([f, j, m, k]);
   this.next_turn = e;
   this.ground = new CGround(o);
   this.CreatePlayers(c);
   this.UpdateTurnList();
   q ? ($("#btnShot1").hide(), SelectShotType(1, void 0), this.ChangedShot(1)) : ($("#btnShot1").show(), SelectShotType(0, void 0), this.ChangedShot(0));
   $("#btnShotSS").show();
   this.StartNextTurn();
   this.QueueUnblock();
   $(".EventGameMsg1").remove();
   1 == t && $("#game_front").append($('<div class="EventGameMsg1 blackShadow">- ' + l.t("Event Game") + " -<br>" + l.t("Losing Team Wins!<br>Double GP & Gold!") + "</div>"))
}
DragonBound.prototype.ChatReceived = function(a, b, d) {
   debug && console.log("Game.ChatReceived:", a, b, d);
   var c, e = this.players.length,
       f;
   for (c = 0; c < e; c++)(f = this.players[c]) && (f.name == b && 1E8 > f.user_id) && f.Chat(a, d)
};
DragonBound.prototype.UIShootStart = function() {
   if (!(0 > this.my_player_index) && this.turn == this.my_player_number && !this.intervalDoSpace) {
      this.UIWalkLeftEnd();
      this.UIWalkRightEnd();
      $("#powerBar").css("width", 0);
      var a = this,
          b = get_time();
      this.intervalDoSpace = setInterval(function() {
         var d = (get_time() - b) / 10;
         $("#powerBar").css("width", d);
         400 <= d && a.Shoot(400)
      }, 10)
   }
};
DragonBound.prototype.UIShootEnd = function() {
   0 > this.my_player_index || this.intervalDoSpace && this.Shoot(Number($("#powerBar").css("width").slice(0, -2)))
};
DragonBound.prototype.UIWalkLeftStart = function() {
   if (!(0 > this.my_player_index)) if (this.turn == this.my_player_number) {
      if (!this.intervalDoLeft) {
         var a = this,
             b = get_time(),
             d = 0;
         this.intervalDoLeft = setInterval(function() {
            var c = Math.floor((get_time() - b) / 20),
                e = c - d;
            200 < a.steps + e && (e = 200 - a.steps);
            if (200 <= a.steps) a.players[a.my_player_index].Look(PLAYER_LOOK_LEFT);
            else {
               for (var f = 0; f < e && !1 != a.players[a.my_player_index].Walk(PLAYER_LOOK_LEFT); f++);
               e = f
            }
            a.steps += e;
            d = c;
            $("#walkBar").css("width", 400 - 2 * a.steps)
         }, 20)
      }
   } else this.players[this.my_player_index].Look(PLAYER_LOOK_LEFT)
};
DragonBound.prototype.UIWalkLeftEnd = function() {
   0 > this.my_player_index || (this.intervalDoLeft = clearInterval(this.intervalDoLeft))
};
DragonBound.prototype.UIWalkRightStart = function() {
   if (!(0 > this.my_player_index)) if (this.turn == this.my_player_number) {
      if (!this.intervalDoRight) {
         var a = this,
             b = get_time(),
             d = 0;
         this.intervalDoRight = setInterval(function() {
            var c = Math.floor((get_time() - b) / 20),
                e = c - d;
            200 < a.steps + e && (e = 200 - a.steps);
            if (200 <= a.steps) a.players[a.my_player_index].Look(PLAYER_LOOK_RIGHT);
            else {
               for (var f = 0; f < e && !1 != a.players[a.my_player_index].Walk(PLAYER_LOOK_RIGHT); f++);
               e = f
            }
            a.steps += e;
            d = c;
            $("#walkBar").css("width", 400 - 2 * a.steps)
         }, 20)
      }
   } else this.players[this.my_player_index].Look(PLAYER_LOOK_RIGHT)
};
DragonBound.prototype.UIWalkRightEnd = function() {
   0 > this.my_player_index || (this.intervalDoRight = clearInterval(this.intervalDoRight))
};
DragonBound.prototype.UIAngleUpStart = function() {
   if (!(0 > this.my_player_index) && !this.intervalDoUp && !this.intervalDoDown) {
      var a = this,
          b = get_time(),
          d = this.players[this.my_player_index].ang;
      this.intervalDoUp = setInterval(function() {
         var c = d + Math.floor((get_time() - b) / a.s) * (90 < a.players[a.my_player_index].minang ? -1 : 1);
         a.players[a.my_player_index].ChangeAngleTo(c)
      }, this.t)
   }
};
DragonBound.prototype.UIAngleUpEnd = function() {
   0 > this.my_player_index || (this.intervalDoUp = clearInterval(this.intervalDoUp))
};
DragonBound.prototype.UIAngleDownStart = function() {
   if (!(0 > this.my_player_index) && !this.intervalDoDown && !this.intervalDoUp) {
      var a = this,
          b = get_time(),
          d = this.players[this.my_player_index].ang;
      this.intervalDoDown = setInterval(function() {
         var c = d - Math.floor((get_time() - b) / a.s) * (90 < a.players[a.my_player_index].minang ? -1 : 1);
         a.players[a.my_player_index].ChangeAngleTo(c)
      }, this.t)
   }
};
DragonBound.prototype.UIAngleDownEnd = function() {
   0 > this.my_player_index || (this.intervalDoDown = clearInterval(this.intervalDoDown))
};
DragonBound.prototype.UINextShot = function() {
   0 > this.my_player_index || (this.is_s1_disabled ? SelectShotType(1 == GetSelectedShotType() && $("#btnShotSS").is(":visible") ? 2 : 1, this) : SelectShotType((GetSelectedShotType() + 1) % 3, this))
};
DragonBound.prototype.ChangedShot = function(a) {
   0 > this.my_player_index || this.players[this.my_player_index].ChangedShot(a)
};
DragonBound.prototype.UIDragStart = function(a) {
   0 > this.my_player_index || (this.drag_start_x = a)
};
DragonBound.prototype.UIDragMove = function(a) {
   0 > this.my_player_index || (a = (a - this.drag_start_x) / 1.5, 1 > a && (a = 1), 400 < a && (a = 400), $("#powerBar").css("width", a), 400 <= a && this.UIDragEnd())
};
DragonBound.prototype.UIDragEnd = function() {
   0 > this.my_player_index || this.Shoot(Number($("#powerBar").css("width").slice(0, -2)))
};
DragonBound.prototype.UseItem = function(a) {
   if (!(0 > this.my_player_index)) {
      var b = $("#gameItemSlot" + a);
      b.hasClass("item") ? b.hasClass("Pressed") ? b.removeClass("Pressed") : ($(".item").removeClass("Pressed"), b.addClass("Pressed"), this.turn == this.my_player_number && this.UsePressedItem(a)) : 0 < a && (a--, $("#gameItemSlot" + a).hasClass("big") && this.UseItem(a))
   }
};
DragonBound.prototype.UsePressedItem = function(a) {
   if (!(0 > this.my_player_index)) for (a = void 0 != a ? a : 0; 6 > a; a++) if ($("#gameItemSlot" + a).hasClass("Pressed")) {
      this.players[this.my_player_index].UseItem(a);
      break
   }
};
DragonBound.prototype.UnselectAllItems = function() {
   for (var a = 0; 6 > a; a++) $("#gameItemSlot" + a).removeClass("Pressed")
};
DragonBound.prototype.SetBinds = function() {
   function a(a) {
      a = a || window.event;
      a.preventDefault && a.preventDefault();
      a.stopPropagation && a.stopPropagation();
      a.cancelBubble = !0;
      return a.returnValue = !1
   }
   var b = this;
   $("#btnShoot").bind("mousedown touchstart", function() {
      b.UIShootStart()
   });
   $("#btnShoot").bind("mouseup touchend", function() {
      b.UIShootEnd()
   });
   $("#btnLeft").bind("mousedown touchstart", function() {
      b.UIWalkLeftStart()
   });
   $("#btnLeft").bind("mouseup touchend", function() {
      b.UIWalkLeftEnd()
   });
   $("#btnRight").bind("mousedown touchstart", function() {
      b.UIWalkRightStart()
   });
   $("#btnRight").bind("mouseup touchend", function() {
      b.UIWalkRightEnd()
   });
   $("#btnUp").bind("mousedown touchstart", function() {
      b.UIAngleUpStart()
   });
   $("#btnUp").bind("mouseup touchend", function() {
      b.UIAngleUpEnd()
   });
   $("#btnDown").bind("mousedown touchstart", function() {
      b.UIAngleDownStart()
   });
   $("#btnDown").bind("mouseup touchend", function() {
      b.UIAngleDownEnd()
   });
   $(document).bind("keydown", function(a) {
      $("#touch_ui").is(":visible") && $("#touch_ui").fadeOut("slow");
      switch (a.which) {
      case KEY.Left:
         $("#gameInput").is(":focus") || (b.UIWalkLeftStart(), a.preventDefault(), a.stopPropagation());
         break;
      case KEY.Right:
         $("#gameInput").is(":focus") || (b.UIWalkRightStart(), a.preventDefault(), a.stopPropagation());
         break;
      case KEY.Up:
         b.UIAngleUpStart();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Down:
         b.UIAngleDownStart();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Space:
         !$("#gameInput").is(":focus") && (!$(".chatDialogInput").is(":focus") && g_is_game_slice) && (b.UIShootStart(), a.preventDefault(), a.stopPropagation());
         break;
      case KEY.F8:
         b.PassTurnClicked();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Tab:
         b.UINextShot();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F1:
         b.UseItem(0);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F2:
         b.UseItem(1);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F3:
         b.UseItem(2);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F4:
         b.UseItem(3);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F5:
         b.UseItem(4);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F6:
         b.UseItem(5);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F9:
         TeamChatToggle();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Ctrl:
         $(document.activeElement).is("input") || a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Esc:
         ToggleOptionsDialog(!0);
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F10:
         $("#friendsList").is(":visible") ? $("#friendsList").hide() : $("#friendsList").show().tinyscrollbar_update("top"), a.preventDefault(), a.stopPropagation()
      }
   });
   $(document).bind("keyup", function(a) {
      switch (a.which) {
      case KEY.Left:
         b.UIWalkLeftEnd();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Right:
         b.UIWalkRightEnd();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Up:
         b.UIAngleUpEnd();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Down:
         b.UIAngleDownEnd();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Space:
         b.UIShootEnd();
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Ctrl:
         $(document.activeElement).is("input") || a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F1:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F2:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F3:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F4:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F5:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F6:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.F9:
         a.preventDefault();
         a.stopPropagation();
         break;
      case KEY.Tab:
         a.preventDefault(), a.stopPropagation()
      }
   });
   $("#gameui").bind("mousedown", function(a) {
      a.stopPropagation();
      return !1
   });
   $(document).bind("mousedown", function(a) {
      2 == a.button ? (b.lastDragX = a.pageX, b.lastDragY = a.pageY, b.isInMapDraggin = !0, $("#container").addClass("HandCursor")) : 0 == a.button && !(0 > this.my_player_index) && (!g_is_game_slice && b.turn == b.my_player_number) && (b.isInDrag = !0, b.UIDragStart(a.pageX))
   });
   this.func_mouseup = function(a) {
      2 == a.button ? (b.isInMapDraggin = !1, $("#container").removeClass("HandCursor")) : 0 == a.button && b.isInDrag && (b.isInDrag = !1, b.UIDragMove(a.pageX), b.UIDragEnd())
   };
   $(document).bind("mouseup", this.func_mouseup);
   $(document).bind("mousemove", function(a) {
      b.isInDrag && b.UIDragMove(a.pageX);
      b.isInMapDraggin && (b.camera.MoveBy(b.lastDragX - a.pageX, b.lastDragY - a.pageY, !1), b.lastDragX = a.pageX, b.lastDragY = a.pageY);
      a.stopPropagation()
   });
   var d = document.getElementById("touch_ui");
   d.ontouchstart = a;
   d.ontouchmove = a;
   d.ontouchend = a;
   d.ontouchcancel = a;
   $(document).bind("touchstart", function(a) {
      $("#touch_ui").show();
      if (!b.intervalDoSpace && !b.intervalDoLeft && !b.intervalDoRight && !b.intervalDoUp && !b.intervalDoDown) {
         if (a.originalEvent.touches && a.originalEvent.touches.length) a = a.originalEvent.touches[0];
         else if (a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) a = a.originalEvent.changedTouches[0];
         else
         return;
         b.lastDragX = a.pageX;
         b.lastDragY = a.pageY;
         b.isInMapDraggin = !0;
         a.preventDefault()
      }
   });
   $(document).bind("touchend", function() {
      b.isInMapDraggin = !1
   });
   $(document).bind("touchmove", function(a) {
      a.preventDefault();
      if (b.intervalDoSpace || b.intervalDoLeft || b.intervalDoRight || b.intervalDoUp || b.intervalDoDown) b.isInMapDraggin = !1;
      else {
         if (a.originalEvent.touches && a.originalEvent.touches.length) a = a.originalEvent.touches[0];
         else if (a.originalEvent.changedTouches && a.originalEvent.changedTouches.length) a = a.originalEvent.changedTouches[0];
         else
         return;
         b.isInMapDraggin && (b.camera.MoveBy(b.lastDragX - a.pageX, b.lastDragY - a.pageY, !1), b.lastDragX = a.pageX, b.lastDragY = a.pageY)
      }
   })
};
DragonBound.prototype.Destructor = function() {
   debug && console.log("Destructor");
   $(document).unbind("keydown");
   $(document).unbind("keyup");
   $(document).unbind("mousedown");
   $(document).unbind("mouseup", this.func_mouseup);
   $(document).unbind("mousemove");
   $(document).unbind("touchstart");
   $(document).unbind("touchend");
   $(document).unbind("touchmove");
   $("#btnShoot").unbind("mousedown touchstart");
   $("#btnShoot").unbind("mouseup touchend");
   $("#btnLeft").unbind("mousedown touchstart");
   $("#btnLeft").unbind("mouseup touchend");
   $("#btnRight").unbind("mousedown touchstart");
   $("#btnRight").unbind("mouseup touchend");
   $("#btnUp").unbind("mousedown touchstart");
   $("#btnUp").unbind("mouseup touchend");
   $("#btnDown").unbind("mousedown touchstart");
   $("#btnDown").unbind("mouseup touchend");
   this.turnTimeout = clearTimeout(this.turnTimeout);
   this.intervalDoUp = clearInterval(this.intervalDoUp);
   this.intervalDoDown = clearInterval(this.intervalDoDown);
   var a;
   for (a = 0; a < this.shots.length; a++) this.shots[a].shot.Remove();
   this.shots = [];
   this.EndTurn();
   for (a = 0; a < this.players.length; a++) this.players[a].Remove();
   $("#powerBar").css("width", 0);
   $("#turn_timer").hide();
   $("#game_over").hide();
   $(DIV_TO_CREATE_GAME_OBJECTS).children().remove()
};
DragonBound.prototype.CreatePlayers = function(a) {
   for (var b = 0; b < a.length; b++) {
      var d = !1;
      a[b][1] == this.my_user_id && (this.my_player_number = a[b][0], this.my_player_index = b, d = !0);
      this.players.push(new CPlayer(a[b], d, this.ground, this.dn))
   }
};
DragonBound.prototype.UpdateTurnList = function() {
   var a = [],
       b, d;
   0 > this.my_player_index ? d = b = 0 : (b = this.players[this.my_player_index].delay, d = this.players[this.my_player_index].delay_before);
   for (var c = 0; c < this.players.length; c++) {
      var e = this.players[c];
      e.is_alive && a.push({
         rank: e.rank,
         name: e.name,
         user_id: e.user_id,
         team: e.team,
         delay: e.delay,
         lastturn: e.lastturn
      })
   }
   a.sort(function(a, b) {
      return a.delay == b.delay ? a.lastturn - b.lastturn : a.delay - b.delay
   });
   for (c = 0; c < a.length; c++) e = a[c].delay - b, e = 0 < e ? "+" + e : e, $("#turn_line" + c + " .turn_line_name").html(a[c].name), $("#turn_line" + c + " .turn_line_rank").removeClass().addClass("turn_line_rank rank rank" + a[c].rank), "A" == a[c].team ? ($("#turn_line" + c + " .turn_line_number").removeClass("turn_line_number_b").addClass("turn_line_number_a turn_line_number" + c), $("#turn_line" + c + " .turn_line_name").removeClass("turn_line_name_b").addClass("turn_line_name_a turn_line_number" + c)) : ($("#turn_line" + c + " .turn_line_number").removeClass("turn_line_number_a").addClass("turn_line_number_b turn_line_number" + c), $("#turn_line" + c + " .turn_line_name").removeClass("turn_line_name_a").addClass("turn_line_name_b turn_line_number" + c)), a[c].user_id == this.my_user_id ? ($("#turn_line" + c).addClass("turn_line_me"), e = b - d) : $("#turn_line" + c).removeClass("turn_line_me"), $("#turn_line" + c + " .turn_line_delay").html(e), $("#turn_line" + c).show();
   for (; 8 > c; c++) $("#turn_line" + c).hide()
};
DragonBound.prototype.UpdatePlayer = function(a) {
   var b = a[0];
   if (b != this.my_player_number) {
      var d = a[1],
          c = a[2],
          a = a[3];
      this.GetPlayerByPlayerNumber(b).MoveTo(d, c, a)
   }
};
DragonBound.prototype.OnCameraUpdate = function(a, b) {
   if (!(20 > Math.abs(this.last_event_left - a) && 20 > Math.abs(this.last_event_top - b))) {
      this.last_event_left = a;
      this.last_event_top = b;
      for (var d = this.players.length, c = 0; c < d; c++) {
         var e = this.players[c];
         e && e.OnCameraUpdate(a, b)
      }
   }
};
DragonBound.prototype.CreateShot = function(a, b, d, c) {
   var e = this,
       f = function(b) {
         var f;
         for (f = 0; f < e.shots.length; f++) if (e.shots[f].id == b) {
            e.shots.splice(f, 1);
            break
         }
         if (a.hole) {
            f = a.hole[0];
            var b = a.hole[1],
                j = a.hole[2],
                h = a.hole[3];
            0 < j && 0 < h && e.ground.AddGroundHole(f, b, j, h);
            a.is_lightning && e.CreateLightning(f, b, a.start.ang);
            CreateExplode(a.exp, f, b);
            if (a.damages) for (f = 0; f < a.damages.length; f++) b = e.GetPlayerByPlayerNumber(a.damages[f].n), a.damages[f].hp && b.ChangeHPShield(a.damages[f].hp, a.damages[f].shield ? a.damages[f].shield : 0, d, !0), void 0 != a.damages[f].movex && b.MoveTo(a.damages[f].movex, void 0 != a.damages[f].movey ? a.damages[f].movey : b.y, void 0, !1), a.damages[f].rd && b.SetReducedDefence(a.damages[f].rd);
            for (f = 0; f < e.players.length; f++) e.players[f].Fall()
         }
         if (a.tele) for (f = 0; f < a.tele.length; f += 5) {
            var b = a.tele[f + 1],
                j = a.tele[f + 2],
                h = a.tele[f + 3],
                n = a.tele[f + 4],
                o = e.GetPlayerByPlayerNumber(a.tele[f]);
            o && (o.MoveTo(b, j, void 0, !0), o.MoveTo(h, n, void 0, !1), o.OnCameraUpdate(e.last_event_left, e.last_event_top), CreateExplode(a.exp, b, j))
         }
         0 == e.shots.length && ((e.ReceivedChatArray(e.after_shot_chat, c.name), e.after_shot_gold && (AudioPlay(AUDIO_GOLD), e.UpdateGuiGold(e.after_shot_gold)), e.UpdateThor(e.after_shot_thor), e.PushWeather(e.after_shot_weather), e.UpdateWind(e.next_wind), 2 < e.queue.length) ? (e.StartNextTurn(), e.QueueUnblock()) : setTimeout(function() {
            e.StartNextTurn();
            e.QueueUnblock()
         }, 1E3))
       },
       j = random(0, 999999);
   2 < this.queue.length ? f(j) : this.shots.push({
      id: j,
      shot: new CShot(j, a, b, f, c, this)
   })
};
var GAMEMSG = Object.freeze({
   winning_award: 0,
   losing_consolation: 1,
   x_killed_y: 2,
   x_bunge_y: 3,
   ultra_high_ang: 4,
   high_ang: 5,
   excellent_shot: 6,
   good_shot: 7,
   shot_bonus: 8,
   team_damage_penalty: 9,
   killed_by_sd: 10,
   died_by_tele: 11,
   damage_1000: 12,
   damage_2000: 13,
   damage_3000: 14,
   triple_kill: 15,
   double_kill: 16,
   ending_bonus: 17,
   bunge_bonus: 18,
   suicide_penalty: 19,
   unlocked_challenge: 20,
   free_kill_detected: 21,
   suicide_penalty_bunge: 22,
   team_kill_penalty: 23,
   winning_change: 24,
   early_suicide: 25,
   blocked_winning: 26
});
DragonBound.prototype.ReceivedChatArray = function(a, b) {
   for (; 0 < a.length;) switch (a.shift()) {
   case GAMEMSG.winning_award:
      ChatReceived(this.GetPlayerByPlayerNumber(a.shift()).name + " [" + l.t("Winning Award") + "] +" + a.shift() + " Gold +" + a.shift() + " GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.losing_consolation:
      ChatReceived(this.GetPlayerByPlayerNumber(a.shift()).name + " [" + l.t("Losing Consolation") + "] +" + a.shift() + " Gold +" + a.shift() + " GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.x_killed_y:
      ChatReceived(this.GetPlayerByPlayerNumber(a.shift()).name + " " + l.t("was killed by") + " " + b, "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.x_bunge_y:
      ChatReceived(this.GetPlayerByPlayerNumber(a.shift()).name + " " + l.t("was killed by") + " " + b + " (" + l.t("bunge") + ")", "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.ultra_high_ang:
      ChatReceived(b + " [" + l.t("Ultra High Angle Bonus") + "] +100Gold", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.high_ang:
      ChatReceived(b + " [" + l.t("High Angle Bonus") + "] +50Gold", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.excellent_shot:
      ChatReceived(b + " [" + l.t("Excellent Shot Bonus") + "] +100Gold", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.good_shot:
      ChatReceived(b + " [" + l.t("Good Shot Bonus") + "] +50Gold", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.shot_bonus:
      ChatReceived(b + " [" + l.t("Shot Bonus") + "] +25Gold", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.team_damage_penalty:
      ChatReceived(b + " [" + l.t("Team Damage Penalty") + "] -25Gold", "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.killed_by_sd:
      ChatReceived(this.GetPlayerByPlayerNumber(a.shift()).name + " " + l.t("was killed by") + " Sudden Death", "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.died_by_tele:
      ChatReceived(b + " [" + l.t("died by teleport"), "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.damage_1000:
      ChatReceived(b + " [1000 " + l.t("damage achieved") + "] +100Gold +1GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.damage_2000:
      ChatReceived(b + " [2000 " + l.t("damage achieved") + "] +200Gold +2GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.damage_3000:
      ChatReceived(b + " [3000 " + l.t("damage achieved") + "] +300Gold +4GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.triple_kill:
      ChatReceived(b + " [" + l.t("Triple Kill Bonus") + "] +999Gold +6GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.double_kill:
      ChatReceived(b + " [" + l.t("Double Kill Bonus") + "] +500Gold +4GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.ending_bonus:
      ChatReceived(b + " [" + l.t("Ending Bonus") + "] +400Gold +1GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.bunge_bonus:
      ChatReceived(b + " [" + l.t("Bunge Shot Bonus") + "] +200Gold +1GP", "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.suicide_penalty:
      ChatReceived(b + " [" + l.t("Suicide Penalty") + "] -1000Gold -5GP", "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.unlocked_challenge:
      ChatReceived(l.t("Room Master unlocked a new challenge opponent ! :)"), "", CHAT_TYPE_GOLD);
      break;
   case GAMEMSG.free_kill_detected:
      ChatReceived(l.t("Free kill game detected - No winning bonus"), "", CHAT_TYPE_SYSTEM);
      break;
   case GAMEMSG.suicide_penalty_bunge:
      ChatReceived(b + " [" + l.t("Suicide Penalty") + "] -1000Gold -5GP (" + l.t("bunge") + ")", "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.team_kill_penalty:
      ChatReceived(b + " [Team Kill Penalty] -50Gold -1GP", "", CHAT_TYPE_DEAD);
      break;
   case GAMEMSG.winning_change:
      ChatReceived(l.t("Winning Bonus") + ": " + l.t("Team") + " A = " + a.shift() + " GP, " + l.t("Team") + " B = " + a.shift() + " GP.", "", CHAT_TYPE_SYSTEM);
      break;
   case GAMEMSG.early_suicide:
      ChatReceived(l.t("Early Suicide") + "! " + l.t("Team") + " A = " + a.shift() + " GP, " + l.t("Team") + " B = " + a.shift() + " GP.", "", CHAT_TYPE_SYSTEM);
      break;
   case GAMEMSG.blocked_winning:
      var d = a.shift(),
          c = a.shift();
      ChatReceived(this.GetPlayerByPlayerNumber(d).name + " - " + l.t("No winning bonus (because you already won %% many times today. Play for fun, play with others, or continue tomorrow).").replace("%%", -1 == c ? "Computer Players" : this.GetPlayerByPlayerNumber(c).name), "", CHAT_TYPE_GOLD)
   }
};
DragonBound.prototype.QueueAddCommand = function(a, b) {
   this.queue.push({
      opcode: a,
      params: b
   });
   this.QueueExecuteNext()
};
DragonBound.prototype.QueueUnblock = function() {
   this.is_queue_executing = !0;
   this.QueueExecuteNext()
};
var E_PLAY = Object.freeze({
   next_turn_number: 0,
   player_number: 1,
   x: 2,
   y: 3,
   look: 4,
   add_delay: 5,
   next_turn_of_player: 6,
   chat: 7,
   thor_x: 8,
   thor_y: 9,
   thor_angle: 10,
   thor_damage: 11,
   new_weather: 12,
   wind_power: 13,
   wind_angle: 14,
   shots: 15,
   gold: 16
}),
    E_PASS = Object.freeze({
      next_turn_number: 0,
      player_number: 1,
      x: 2,
      y: 3,
      look: 4,
      add_delay: 5,
      next_turn_of_player: 6,
      chat: 7,
      thor_x: 8,
      thor_y: 9,
      thor_angle: 10,
      thor_damage: 11,
      new_weather: 12,
      wind_power: 13,
      wind_angle: 14
   });
DragonBound.prototype.QueueExecuteNext = function() {
   for (; this.is_queue_executing && 0 < this.queue.length;) {
      var a = this.queue.shift(),
          b = a.params;
      switch (a.opcode) {
      case "play":
         var d = b[E_PLAY.player_number],
             c = this.GetPlayerByPlayerNumber(d),
             a = a.params[E_PLAY.next_turn_number];
         c.MoveTo(b[E_PLAY.x], b[E_PLAY.y], b[E_PLAY.look]);
         c.ChangeDelay(c.delay + b[E_PLAY.add_delay], a - 1);
         this.UpdateTurnList();
         this.turn_number = a;
         this.after_shot_chat = b[E_PLAY.chat];
         this.after_shot_gold = d == this.my_player_number ? b[E_PLAY.gold] : void 0;
         this.EndTurn();
         this.after_shot_thor = [b[E_PLAY.thor_x], b[E_PLAY.thor_y], b[E_PLAY.thor_angle], b[E_PLAY.thor_damage]];
         this.after_shot_weather = b[E_PLAY.new_weather];
         this.next_turn = b[E_PLAY.next_turn_of_player];
         this.next_wind = [b[E_PLAY.wind_power], b[E_PLAY.wind_angle]];
         if (b[E_PLAY.shots] && 0 < b[E_PLAY.shots].length) {
            for (a = 0; a < b[E_PLAY.shots].length; a++) this.CreateShot(b[E_PLAY.shots][a], 0 == a, this.turn_number, c), b[E_PLAY.shots][a].ss && d == this.my_player_number && (this.no_ss_turns = 4, $("#btnShotSS").fadeOut(), 2 == GetSelectedShotType() && SelectShotType(this.is_s1_disabled ? 1 : 0, this));
            this.is_queue_executing = !1;
            return
         }
         this.ReceivedChatArray(b[E_PLAY.chat], c.name);
         this.UpdateThor(this.after_shot_thor);
         this.PushWeather(this.after_shot_weather);
         this.UpdateWind(this.next_wind);
         this.StartNextTurn();
         break;
      case "pass":
         d = b[E_PASS.player_number];
         c = this.GetPlayerByPlayerNumber(d);
         a = a.params[E_PASS.next_turn_number];
         c.MoveTo(b[E_PASS.x], b[E_PASS.y], b[E_PASS.look]);
         c.ChangeDelay(c.delay + b[E_PASS.add_delay], a - 1);
         this.UpdateTurnList();
         this.turn_number = a;
         this.EndTurn();
         this.next_turn = b[E_PASS.next_turn_of_player];
         this.ReceivedChatArray(b[E_PASS.chat], c.name);
         this.UpdateThor([b[E_PASS.thor_x], b[E_PASS.thor_y], b[E_PASS.thor_angle], b[E_PASS.thor_damage]]);
         this.PushWeather(b[E_PASS.new_weather]);
         this.UpdateWind([b[E_PASS.wind_power], b[E_PASS.wind_angle]]);
         this.StartNextTurn();
         break;
      case "update":
         this.UpdatePlayer(b);
         break;
      case "game-over":
         this.ReceivedChatArray(b.chat);
         this.GameOver(b);
         break;
      case "dead":
         (c = this.GetPlayerByPlayerNumber(b)) && c.ChangeAliveTo(!1)
      }
   }
};
DragonBound.prototype.EndTurn = function() {
   var a = this.GetPlayerByPlayerNumber(this.turn);
   a && a.ChangeMyTurn(!1);
   this.turn = -1;
   this.intervalDoLeft = clearInterval(this.intervalDoLeft);
   this.intervalDoRight = clearInterval(this.intervalDoRight);
   this.intervalDoSpace = clearInterval(this.intervalDoSpace);
   this.turnTimeout = clearTimeout(this.turnTimeout);
   this.isInDrag = !1;
   $("#turn_timer").hide()
};
DragonBound.prototype.PassTurn = function() {
   if (!(0 > this.my_player_index)) {
      this.EndTurn();
      var a = Math.floor((get_time() - this.start_turn_time) / 1E3);
      if (a > TURN_TIME || 0 > a) a = TURN_TIME;
      this.players[this.my_player_index].PassTurn(a)
   }
};
DragonBound.prototype.Shoot = function(a) {
   if (!(0 > this.my_player_index)) {
      this.EndTurn();
      var b = Math.floor((get_time() - this.start_turn_time) / 1E3);
      if (b > TURN_TIME || 0 > b) b = TURN_TIME;
      this.players[this.my_player_index].Shoot(a, b, GetSelectedShotType());
      $("#last_power_mark").animate({
         left: 240 + a
      })
   }
};
DragonBound.prototype.PassTurnClicked = function() {
   this.turn == this.my_player_number && this.PassTurn()
};
DragonBound.prototype.StartNextTurn = function() {
   if (this.turn_number == this.sudden_death_at_turn - 20) ChatReceived(l.t("Sudden Death in %% turns").replace("%%", 20), "", CHAT_TYPE_SYSTEM);
   else if (this.turn_number == this.sudden_death_at_turn - 10) ChatReceived(l.t("Sudden Death in %% turns").replace("%%", 10), "", CHAT_TYPE_SYSTEM);
   else if (this.turn_number == this.sudden_death_at_turn - 5) ChatReceived(l.t("Sudden Death in %% turns").replace("%%", 5), "", CHAT_TYPE_SYSTEM);
   else if (this.turn_number == this.sudden_death_at_turn) ChatReceived(l.t("Sudden Death Started!"), "", CHAT_TYPE_SYSTEM), $("#ss_shot_background").addClass("sudden_death").fadeIn(), $("#btnShotSS").hide(), this.no_ss_turns = 999999, 2 == GetSelectedShotType() && SelectShotType(1, this), $("#message_over_items").removeClass("items_locked").addClass("sudden_death").show();
   else if (this.turn_number > this.sudden_death_at_turn) for (var a = 0; a < this.players.length; a++) {
      var b = this.players[a];
      b.ReduceHPby(5 * (this.turn_number - this.sudden_death_at_turn), this.turn_number)
   }
   this.turn = this.next_turn;
   if (-1 != this.turn) if (b = this.GetPlayerByPlayerNumber(this.turn)) if (b.ChangeMyTurn(!0), b.RegenShield(this.turn_number), 2 < this.queue.length ? $("#game_replay").show() : $("#game_replay").hide(), 0 == this.no_ss_turns && this.turn_number <= this.sudden_death_at_turn && $("#btnShotSS").show(), this.camera.FocusAt(b.x, b.y, !0), this.start_turn_time = get_time(), this.turn == this.my_player_number) {
      0 < this.no_ss_turns && this.no_ss_turns--;
      this.steps = 0;
      $("#walkBar").css("width", 400);
      this.UsePressedItem();
      $("#turn_timer").stop(!0, !0).hide().css("background-position", "0 -1900px").show("slow");
      var d = this,
          c = function() {
            AudioPlay(AUDIO_TURN_TICK);
            if (d.turn == d.my_player_number) {
               var a = TURN_TIME - Math.floor((get_time() - d.start_turn_time) / 1E3);
               0 < a ? (g_graphics_high ? $("#turn_timer").animate({
                  backgroundPositionY: "-" + (a - 1) + "00px"
               }, 200, "linear") : $("#turn_timer").css({
                  backgroundPositionY: "-" + (a - 1) + "00px"
               }), 0 == d.queue.length && b.SendPosUpdate(), d.turnTimeout = setTimeout(function() {
                  c()
               }, 1E3)) : d.PassTurn()
            }
          };
      this.turnTimeout = setTimeout(c, 1E3);
      AudioPlay(AUDIO_MY_TURN)
   } else $("#turn_timer").hide();
   else debug && console.log("[DragonBound.StartNextTurn] ERROR: turn of unknown player number", this.turn)
};
DragonBound.prototype.GetPlayerByPlayerNumber = function(a) {
   if (-1 != a) for (var b = 0; b < this.players.length; b++) if (this.players[b].player_number_in_game == a) return this.players[b]
};
DragonBound.prototype.GameOver = function(a) {
   "A" == a.won ? ($("#scores_lose_a").addClass("win"), $("#scores_lose_b").removeClass()) : ($("#scores_lose_a").removeClass(), $("#scores_lose_b").addClass("win"));
   $(".score").hide();
   for (var b = 0; b < a.scores.length; b++) {
      var d = a.scores[b],
          c = d[0],
          e = d[1],
          f = d[2],
          j = d[3],
          m = d[4],
          k = d[5],
          p = d[6],
          d = d[7];
      $("#score" + c + " .score_name").html(f);
      $("#score" + c + " .score_rank").removeClass().addClass("score_rank rank rank" + j);
      $("#score" + c + " .score_gp").html(m + " GP");
      $("#score" + c + " .score_gold").html(k + " GOLD");
      $("#score" + c + " .score_bonus_gp").html(p ? "+" + p + " GP" : "");
      $("#score" + c + " .score_bonus_gold").html(d ? "+" + d + " GOLD" : "");
      e == this.my_user_id ? $("#score" + c + " .score_me").show() : $("#score" + c + " .score_me").hide();
      $("#score" + c).show()
   }
   var h = this;
   $(".Player").promise().done(function() {
      debug && console.log("GameOver calling Destructor");
      var a = h.dn;
      h.Destructor();
      h.dn.game = void 0;
      $("#game_over").fadeIn(1500);
      g_score_screen_timeout = setTimeout(function() {
         if (a.location == GUI_LOCATION_GAME) {
            a.should_stay_in_game_screen = false;
            a.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL ? SwitchToChannelScreen(a) : SwitchToRoomScreen(a)
         }
      }, 7500);
      $("#game_over").click(function() {
         if (g_score_screen_timeout) {
            g_score_screen_timeout = clearTimeout(g_score_screen_timeout);
            a.should_stay_in_game_screen = false;
            a.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL ? SwitchToChannelScreen(a) : SwitchToRoomScreen(a)
         }
      })
   })
};
var g_score_screen_timeout;
DragonBound.prototype.ChangePlayersInRoom = function(a) {
   var b, d;
   for (b = 0; b < this.players.length; b++) this.players[b].mark = !1;
   for (d = 0; d < a.length; d++) for (b = 0; b < this.players.length; b++) a[d][PLAYER_INDEX_USER_ID] == this.players[b].user_id && (this.players[b].mark = !0);
   for (b = 0; b < this.players.length; b++) this.players[b].mark || this.players[b].ChangeAliveTo(!1)
};
DragonBound.prototype.UpdateGuiGold = function(a) {
   for (var b = a.toString().split("").reverse(), a = 0; a < b.length && 5 > a; a++)"-" == b[a] ? $("#UIGoldDigit" + a).animate({
      backgroundPositionY: "-154px"
   }, 1E3) : $("#UIGoldDigit" + a).animate({
      backgroundPositionY: -14 - 14 * Number(b[a]) + "px"
   }, 1E3);
   for (; 5 > a; a++) $("#UIGoldDigit" + a).animate({
      backgroundPositionY: "0"
   }, 1E3)
};
var THOR_LEVEL = [0, 300, 900, 1800, 3200, 6E3];
DragonBound.prototype.UpdateThor = function(a) {
   if (a) {
      for (var b = a[0], d = a[1], c = a[2], a = a[3], e = 0; e + 1 < THOR_LEVEL.length && a >= THOR_LEVEL[e + 1];) e++;
      e++;
      $("#thor").stop(!0, !0).animate({
         left: b,
         top: d
      }, 2E3);
      $("#thor_rotate").stop(!0, !0).animate({
         rotate: "-" + c + "deg"
      }, 1E3);
      $("#thor_lvl").html("Lv." + e);
      $("#thor_damage").html(a);
      $("#thor_laser").fadeOut()
   }
};
DragonBound.prototype.ThorShoot = function(a, b, d, c) {
   $("#thor").stop(!0, !0).css({
      left: a,
      top: b
   });
   $("#thor_rotate").stop(!0, !0).css({
      rotate: "-" + d + "deg"
   });
   $("#thor_laser").stop(!0, !0).css({
      width: c
   }).show().fadeOut()
};
DragonBound.prototype.SetWeather = function(a) {
   this.weather = a;
   this.UpdateWeatherGUI()
};
DragonBound.prototype.PushWeather = function(a) {
   this.weather.shift();
   this.weather.push(a);
   this.UpdateWeatherGUI();
   1 == this.weather[1] && AudioPlay(AUDIO_WIND)
};
DragonBound.prototype.UpdateWeatherGUI = function() {
   $("#weatherSlot0").removeClass().addClass("weather-" + this.weather[0]);
   $("#weatherSlot1").removeClass().addClass("weather-" + this.weather[1]);
   $("#weatherSlot2").removeClass().addClass("weather-" + this.weather[2]);
   $("#weatherSlot3").removeClass().addClass("weather-" + this.weather[3]);
   $("#weatherSlot4").removeClass().addClass("weather-" + this.weather[4])
};
DragonBound.prototype.CreateLightning = function(a, b, d) {
   var c = "#lightning" + random(0, 999999),
       e = random(0, 3);
   $(DIV_TO_CREATE_GAME_OBJECTS).append('<div id="' + c.slice(1) + '" style="position:absolute; left:' + a + "px; top:" + b + 'px;"><div class="lightning lightning' + e + '"></div></div>');
   $(c).css({
      rotate: 270 - d + "deg"
   });
   setTimeout(function() {
      $(c).remove()
   }, 100)
};
DragonBound.prototype.UpdateWind = function(a) {
   var b = a[0],
       d = a[1];
   if (!this.gameStuffImage) {
      var c = this,
          a = this.gameStuffImage = new Image;
      a.onload = function() {
         c.DrawWind(b, d)
      };
      a.src = GetBackgroundImageUrl("#gameui")
   }
   this.DrawWind(b, d)
};
DragonBound.prototype.DrawWind = function(a, b) {
   var d = $("#wind_meter2")[0].getContext("2d"),
       c = this.gameStuffImage;
   d.clearRect(0, 0, 66, 60);
   var e = this.WOX,
       f = this.WOY;
   c && d.drawImage(c, 177, 159, 54, 54, e, f, 54, 54);
   d.save();
   d.translate(27 + e, 27 + f);
   d.rotate(AngleToRad(-b));
   c && d.drawImage(c, 483, 221, 86, 5, -35, -2, 70, 5);
   d.restore();
   d.save();
   c = 10 > a ? "#ffffff" : 20 > a ? "#ffff00" : "#ff0000";
   10 > a && (a = "0" + a);
   d.fillStyle = c;
   d.font = "20px verdana";
   d.shadowColor = "black";
   d.shadowOffsetX = 0;
   d.shadowOffsetY = 0;
   d.shadowBlur = 4;
   d.strokeStyle = "black";
   d.lineWidth = 1;
   d.strokeText(a, 14 + e, 34 + f);
   d.fillText(a, 14 + e, 34 + f);
   d.restore();
   d.drawImage(g_dirty, -1, -1, 1, 1)
};
Object.freeze(DragonBound.prototype);

function DragonLogin(a) {
   this.dn = a;
   this.CheckStatus()
}
DragonLogin.prototype.LoginMessage = function(a) {
   debug && console.log(" >> [DragonLogin Dialog Text]", a);
   DragonDialogOpen("Login", a, DIALOG_BUTTONS_NONE, void 0, [35, 52])
};
DragonLogin.prototype.ShowConnectToFacebookButton = function() {
   var a = this;
   DragonDialogOpen(l.t("Welcome to DragonBound"), l.t("Who are you?") + '<div id="ConnectWithFacebook" class="glow_button_anim"></div><div id="ConnectWithPassword" class="glow_button_anim"></div>', DIALOG_BUTTONS_NONE, void 0, [35, 52]);
   $("#ConnectWithFacebook").click(function() {
      window.FB ? a.FacebookLoginButtonClicked() : alertify.alert("Facebook could not be loaded right now, use password login.")
   });
   $("#ConnectWithPassword").click(function() {
      a.PasswordLoginButtonClicked(2)
   })
};
DragonLogin.prototype.CheckStatus = function() {
   var a = this,
       b = !1,
       d = !1;
   a.LoginMessage("Checking Login Status...");
   $.get("/s.php", function(c) {
      debug && console.log(" >> Got Status:", c);
      !c || 2 > c.length ? d ? a.FacebookLogin() : b = !0 : a.GotLoginData(c)
   }, "json").error(function(b) {
      debug && console.log("ERROR /s:", b);
      a.LoginMessage("Please wait a few seconds...<br>(Por favor espere unos segundos)<br><br>Fixing your connection... :)<br>(Arreglando su conexion)<br><br>" + b.status);
      /*setTimeout(function() {
         location.replace("/test")
      }, 1E4)*/
   });
   var c = setTimeout(function() {
      a.ShowConnectToFacebookButton()
   }, 3E4);
   window.fbAsyncInit = function() {
      debug && console.log(" >> OnFacebookLoaded");
      clearTimeout(c);
      FB.init({
         appId: "154795011315451",
         status: !0,
         cookie: !0,
         xfbml: !0,
         oauth: !0,
         channelUrl: location.protocol + "//" + location.host + "/channel.html"
      });
      d = !0;
      b && a.FacebookLogin()
   };
   var e, f = document.getElementsByTagName("script")[0];
   document.getElementById("facebook-jssdk") || (e = document.createElement("script"), e.id = "facebook-jssdk", e.async = !0, e.src = "//connect.facebook.net/en_US/all.js", f.parentNode.insertBefore(e, f))
};
DragonLogin.prototype.FacebookLogin = function() {
   debug && console.log(" >> FacebookLogin");
   var a = this;
   a.LoginMessage(l.t("Checking FB login status") + "...");
   FB.getLoginStatus(function(b) {
      b && "connected" == b.status ? (debug && console.log(" >> Connected and authorized the app!"), a.Login({
         t: 1
      })) : (debug && console.log(' >> Not connected or authorized the app... Showing "Connect To Facebook" Button'), "br" == SERVER_TYPE && !getCookie("kopiga") ? (a.LoginMessage(l.t("Checking country") + "..."), $.get("/c", function(b) {
         "BR" == b ? a.ShowConnectToFacebookButton() : a.LoginMessage(l.t("Only people of Brazil allowed to play on this server.<br><br>You are at " + b + '.<br><br>Please play on<br><a href="http://dragonbound.net">DragonBound Global</a>'))
      }).error(function(b) {
         console && console.log("Got Server Status:", b);
         a.LoginMessage("Server error, try again.")
      })) : a.ShowConnectToFacebookButton())
   })
};
DragonLogin.prototype.FacebookLoginButtonClicked = function() {
   debug && console.log(" >> FacebookLoginButtonClicked");
   var a = this;
   a.LoginMessage(l.t("A Facebook pop-up has opened, please follow the instructions to sign in."));
   FB.login(function(b) {
      debug && console.log(" >> FB.Login:", b);
      b.authResponse ? (debug && console.log(" >> FB.Login: Connected"), a.Login({
         t: 1
      })) : (debug && console.log(" >> FB.Login: Cancelled"), a.ShowConnectToFacebookButton())
   }, {
      scope: "email,user_birthday"
   })
};
DragonLogin.prototype.Login = function(a) {
   debug && console.log(" >> Login");
   var b = this;
   b.LoginMessage(l.t("Loading your account") + "...");
   $.post("/f.php", a, function(a) {
      b.GotLoginData(a)
   }, "json").error(function(a) {
      console && console.log("Error: Got Server Status:", a);
      DragonDialogOpen("Facebook Error", "MSG: " + a[0] + (a[1] ? "<br><br>" + a[1] : ""), DIALOG_BUTTONS_OK, function() {
         b.ShowConnectToFacebookButton()
      }, [35, 52])
   })
};
DragonLogin.prototype.GotLoginData = function(a) {
   var b = this;
   debug && console.log(" >> GotLoginData:", a);
   3 == a.length ? (debug && console.log(" >> Banned Message"), DragonDialogOpen(l.t("You Are Banned"), l.t("Reason") + ": " + a[0] + "<br><br>Until: " + a[1] + (a[1] != l.t("Forever") ? " (" + l.t("UTC Time Zone") + ")" : ""), DIALOG_BUTTONS_NONE, void 0, [35, 52])) : 4 == a.length ? (debug && console.log(" >> Show server open timer"), DragonDialogClose(!0), a[2] && $("#ranking_title2").html(Commatize(a[2]) + " " + l.t("Players")), ShowServerOpenTimer(a[0], a[1], a[3])) : 5 == a.length ? (debug && console.log(" >> Login Completed! :)"), DragonDialogClose(!0), a[2] && $("#ranking_title2").html(Commatize(a[2]) + " " + l.t("Players")), b.dn.SetLoginUserDetails(a[0], a[1], a[3], a[4]), b.dn.BrokerConnect()) : 2 == a.length && -5 == a[0] ? (debug && console.log(" >> Password needed too"), DragonDialogOpen("Facebook Login Good :)", "Your account require both to use Facebook login and Password login. Please enter your password too ->", DIALOG_BUTTONS_OK, function() {
      b.PasswordLoginButtonClicked(3, a[1])
   }, [35, 52])) : 1 == a.length && -9 == a[0] ? (debug && console.log(" >> Password change needed"), DragonDialogOpen("Facebook Login Good :)", "Please set a password to your GM account now -><br><br>(You can change it later at [My Info] button in the lobby)", DIALOG_BUTTONS_OK, function() {
      b.ChangePassword(1)
   }, [35, 52])) : 1 == a.length && -11 == a[0] ? (debug && console.log(" >> Password change needed"), DragonDialogOpen(l.t("New Password"), l.t("Set a new password so you can always login to your account even without Facebook.<br><br>Write down your new username!<br><br>(You can change it at [My-Info])"), DIALOG_BUTTONS_OK, function() {
      b.ChangePassword(1)
   }, [35, 52])) : (DragonDialogOpen("Login", "MSG: " + a[0] + (a[1] ? "<br><br>" + a[1] : ""), DIALOG_BUTTONS_OK, function() {
      b.ShowConnectToFacebookButton()
   }, [35, 52]), debug && console.log("ERROR MSG:", a))
};
DragonLogin.prototype.Logout = function() {
   var a = this;
   $.post("/g", {}, function() {});
   $("#BrokerScreen").hide();
   DragonDialogOpen(l.t("Bye Bye"), l.t("We logged you out from your Facebook account too for your account safety.<br><br>Hope to see you again soon!"), DIALOG_BUTTONS_OK, function() {
      a.ShowConnectToFacebookButton()
   }, [35, 52]);
   FB.logout(function(a) {
      debug && console.log("FB.logout", a)
   })
};
DragonLogin.prototype.PasswordLoginButtonClicked = function(a, b) {
   var d = this;
   debug && console.log(" >> PasswordLoginButtonClicked", a, b);
   var c = "";
   DragonDialogOpen("Password Login", 'Username: <input id="DragonLoginUsername"><br>Password: <input type="password" id="DragonLoginPassword"><br>Secret Number: <input type="password" id="DragonLoginSecret" readonly><div id="DragonC0de"></div>', DIALOG_BUTTONS_OK_CANCEL, function(b) {
      if (b) {
         var b = $("#DragonLoginUsername").val(),
             e = $("#DragonLoginPassword").val(),
             e = e + ("|" + c),
             e = CryptoJS.SHA256(e).toString() + get_time();
         d.Login({
            t: a,
            u: b,
            p: e
         })
      } else d.ShowConnectToFacebookButton()
   });
   b && $("#DragonLoginUsername").val(b);
   var e = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
       f = $("#DragonC0de"),
       j = $("#DragonLoginSecret");
   f.append($("<button>" + e[0] + "</button>").click(function() {
      c += e[0];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[1] + "</button>").click(function() {
      c += e[1];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[2] + "</button>").click(function() {
      c += e[2];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[3] + "</button>").click(function() {
      c += e[3];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[4] + "</button>").click(function() {
      c += e[4];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[5] + "</button>").click(function() {
      c += e[5];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[6] + "</button>").click(function() {
      c += e[6];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[7] + "</button>").click(function() {
      c += e[7];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[8] + "</button>").click(function() {
      c += e[8];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[9] + "</button>").click(function() {
      c += e[9];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>&#8592;</button>").click(function() {
      c = c.slice(0, -1);
      j.val(j.val().slice(0, -1));
      return !1
   }))
};
DragonLogin.prototype.ChangePassword = function(a) {
   var b = this;
   debug && console.log(" >> ChangePassword", a);
   var d = "",
       c = "";
   DragonDialogOpen(l.t("Change Password"), 'Username: <span id="MyDragonLoginUsername"></span><br>' + l.t("Password") + ': <input type="password" id="DragonLoginPassword"><br>' + l.t("Secret Number") + ': <input type="password" id="DragonLoginSecret" readonly><div id="DragonC0de"></div>', DIALOG_BUTTONS_OK_CANCEL, function(e) {
      e ? (debug && console.log(" >> ChangePassword [OK]", a), e = $("#DragonLoginPassword").val(), 6 > e.length ? DragonDialogOpen(l.t("Too Short"), l.t("Password too short. Length 6+ needed."), DIALOG_BUTTONS_OK, function() {
         b.ChangePassword(a)
      }) : /^(.)\1+$/.test(e) || "123456" == e || "1234567" == e || "12345678" == e || e == c ? DragonDialogOpen(l.t("Too Easy"), l.t("Password too easy to guess. Make it harder."), DIALOG_BUTTONS_OK, function() {
         b.ChangePassword(a)
      }) : 6 > d.length ? DragonDialogOpen(l.t("Too Short"), l.t("Secret number too short. Length 6+ needed."), DIALOG_BUTTONS_OK, function() {
         b.ChangePassword(a)
      }) : /^(.)\1+$/.test(d) || "123456" == d || "1234567" == d || "12345678" == d || d == e ? DragonDialogOpen(l.t("Too Easy"), l.t("Secret number too easy to guess. Make it harder."), DIALOG_BUTTONS_OK, function() {
         b.ChangePassword(a)
      }) : (e += "|" + d, e = CryptoJS.SHA256(e).toString() + get_time(), $.post("/change_password", {
         u: c,
         p: e
      }, function(c) {
         "1" == c ? DragonDialogOpen(l.t("Good") + " :)", l.t("Password Changed"), DIALOG_BUTTONS_OK, function() {
            a && b.ShowConnectToFacebookButton()
         }) : DragonDialogOpen("Failed :(", c, DIALOG_BUTTONS_OK, function() {
            b.ChangePassword(a)
         })
      }).error(function() {
         DragonDialogOpen("Sorry :(", "Error. Could not change your password. Try again.", DIALOG_BUTTONS_OK, function() {
            b.ChangePassword(a)
         })
      }))) : (debug && console.log(" >> ChangePassword [Cancel]", a), a && b.ShowConnectToFacebookButton())
   });
   $.get("/my_username", function(a) {
      2 != a.length ? DragonDialogOpen("Sorry :(", "Please re-login before changing password.", DIALOG_BUTTONS_OK, function() {}) : (c = a[0], setCookie("csrftoken", a[1]), $("#MyDragonLoginUsername").html(a[0]))
   }, "json").error(function() {
      DragonDialogOpen("Sorry :(", "Error while getting username. Please re-login.", DIALOG_BUTTONS_OK, function() {
         b.ChangePassword()
      })
   });
   var e = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]),
       f = $("#DragonC0de"),
       j = $("#DragonLoginSecret");
   f.append($("<button>" + e[0] + "</button>").click(function() {
      d += e[0];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[1] + "</button>").click(function() {
      d += e[1];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[2] + "</button>").click(function() {
      d += e[2];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[3] + "</button>").click(function() {
      d += e[3];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[4] + "</button>").click(function() {
      d += e[4];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[5] + "</button>").click(function() {
      d += e[5];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[6] + "</button>").click(function() {
      d += e[6];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[7] + "</button>").click(function() {
      d += e[7];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[8] + "</button>").click(function() {
      d += e[8];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>" + e[9] + "</button>").click(function() {
      d += e[9];
      j.val(j.val() + "*");
      return !1
   })).append($("<button>&#8592;</button>").click(function() {
      d = d.slice(0, -1);
      j.val(j.val().slice(0, -1));
      return !1
   }))
};

function BuildTimeLeftString(a, b, d) {
   for (b -= d; 0 > b;) a--, b += 86400;
   if (0 > a) return l.t("Press F5 to reload");
   var d = Math.floor(b / 3600),
       b = b % 3600,
       c = Math.floor(b / 60),
       b = b % 60,
       e = "";
   0 < a && (e += a + " " + l.t("Days") + " ");
   return e += d + " " + l.t("Hours") + " " + c + " " + l.t("Minutes") + " " + b + " " + l.t("Seconds")
}

function ShowServerOpenTimer(a, b, d) {
   var c = get_time();
   setInterval(function() {
      $("#BrokerTitle").html(BuildTimeLeftString(a, b, Math.round((get_time() - c) / 1E3)))
   }, 1E3);
   $(".BrokerChannel").hide();
   $("#BrokerRefresh").hide();
   $("#BrokerTitle").html(BuildTimeLeftString(a, b, 0)).css({
      top: 51,
      "font-size": 30
   });
   $("#BrokerTotalPlayers").html(l.t("20,000 first players with 1100+ GP will get the (RARE) Beta Flag!<br>200% GP & GOLD for 2 days since open time!<br>2000 Free Cash every day at the Post Button!")).css({
      top: 120,
      "font-size": 16,
      color: "yellow"
   });
   $("#BrokerWindow").css({
      height: 192,
      top: 204
   }).append($("<div>" + l.t("Your") + " UserID: " + d + "</div>").css({
      position: "absolute",
      left: 20,
      top: 10,
      "font-size": 14,
      color: "yellow"
   }).addClass("blackShadow"), $('<iframe id="radio" src="http://radio.q-dance.com/">').hide(), $('<div id="muteBtn" class="popButton"></div>'), $('<div id="shareTimer" class="popButton"></div>'), $('<div class="popButton"><a href="http://www.facebook.com/groups/dragonbound.brasil/" target="_blank">http://www.facebook.com/groups/dragonbound.brasil</a></div>').css({
      position: "absolute",
      left: 144,
      top: 174,
      "font-size": 12
   })).addClass("animRotate");
   $("#muteBtn").click(function() {
      $("#radio, #muteBtn").remove()
   });
   $("#shareTimer").click(function() {
      ServerTimer_PostToFacebook()
   });
   $("#BrokerScreen").show()
}

function ServerTimer_PostToFacebook() {
   var a = "icon180x180.png icon2_180x180.png icon3_180x180.jpg icon4_180x180.jpg icon5_180x180.jpg icon6_180x180.jpg".split(" "),
       a = a[random(0, a.length - 1)],
       b = "DragonBound " + ("br" == SERVER_TYPE ? "Brasil" : "Global"),
       d = b + " - " + $("#BrokerTitle").html(),
       c = "br" == SERVER_TYPE ? "http://dragonbound-brasil.com" : "http://carlosx.byethost15.com",
       e = $("#BrokerTotalPlayers").html();
   FB.ui({
      method: "feed",
      link: c,
      picture: c + "/static/images/" + a,
      name: d,
      caption: b,
      description: e
   })
};
var AUDIO_ARMOR_MOVE = 0,
    AUDIO_ARMOR_BLAST = 1,
    AUDIO_ARMOR_FIRE = 2,
    AUDIO_ICE_MOVE = 3,
    AUDIO_MOVE_ARMOR = 4,
    AUDIO_ICE_SHOOT = 5,
    AUDIO_ARMOR_FIRE2 = 6,
    AUDIO_ICE_BLAST = 7,
    AUDIO_ICE_FIRE = 8,
    AUDIO_ICE_BLAST2 = 9,
    AUDIO_ADUKA_FIRE = 10,
    AUDIO_ADUKA_FIRE2 = 11,
    AUDIO_BUTTON_SELECT = 12,
    AUDIO_MUSIC_CHANNEL = 13,
    AUDIO_MUSIC_ROOM = 14,
    AUDIO_MUSIC_STAGE1 = 15,
    AUDIO_MY_TURN = 16,
    AUDIO_TURN_TICK = 17,
    AUDIO_BUTTON_SELECT2 = 18,
    AUDIO_GOLD = 19,
    AUDIO_BIGFOOT_FIRE1 = 20,
    AUDIO_BIGFOOT_FIRE2 = 21,
    AUDIO_BIGFOOT_BLAST1 = 22,
    AUDIO_BIGFOOT_BLAST2 = 23,
    AUDIO_LIGHTNING_FIRE = 24,
    AUDIO_LIGHTNING_BLAST = 25,
    AUDIO_JD_FIRE = 26,
    AUDIO_JD_BLAST1 = 27,
    AUDIO_JD_BLAST2 = 28,
    AUDIO_ASATE_FIRE = 29,
    AUDIO_KNIGHT_FIRE = 30,
    AUDIO_ASATE_KNIGHT_BLAST = 31,
    AUDIO_WIND = 32,
    AUDIO_WAIT = 33,
    AUDIO_GAME_START = 34,
    AUDIO_LOGIN = 35,
    AUDIO_BROKER = 36,
    g_sound_files = "1move 11blast 11fire 11move 1move 12blast 12fire 111blast 111fire 112blast 161fire 162fire bpush1 dbtheme dbwaiting dbparty turn turnwa bselect1 gold 51fire 52fire 51blast 52blast 82fire 82blast 91fire 91blast 92blast 10s1fire 15s1fire 10s1blast wind2 wait start login broker".split(" "),
    g_music_numbers = [AUDIO_MUSIC_CHANNEL, AUDIO_MUSIC_ROOM, AUDIO_MUSIC_STAGE1],
    g_audio_is_music_on = 1 == getCookie("music"),
    g_audio_is_effects_on = 1 == getCookie("effects"),
    g_audio_last_music_wanted_to_play;

function AudioInit() {
   navigator.userAgent.match(/(iPhone|iPod|iPad)/i) && (g_audio_is_music_on = !1);
   soundManager.setup({
      url: "/static/js/",
      flashVersion: 9,
      debugMode: !1,
      preferFlash: "dev" == SERVER_TYPE,
      onready: function() {
         for (var a = 0; a < g_sound_files.length; a++) soundManager.createSound({
            id: g_sound_files[a],
            autoLoad: !1,
            url: STATIC_DIR + "images/1/" + g_sound_files[a] + ".png"
         });
         AudioPlayInLoop(AUDIO_MUSIC_CHANNEL)
      }
   })
}

function AudioPlayInLoop(a, b) {
   if (-1 == g_music_numbers.indexOf(a)) {
      if (!g_audio_is_effects_on) return
   } else if (g_audio_last_music_wanted_to_play = a, !g_audio_is_music_on) return;
   var d = g_sound_files[a];
   void 0 != d && (d = soundManager.getSoundById(d), void 0 != d && (b && AudioStopAll(), d.play({
      onfinish: function() {
         AudioPlayInLoop(a)
      }
   })))
}

function AudioPlay(a, b) {
   if (-1 == g_music_numbers.indexOf(a)) {
      if (!g_audio_is_effects_on) return
   } else if (g_audio_last_music_wanted_to_play = a, !g_audio_is_music_on) return;
   var d = g_sound_files[a];
   void 0 != d && (void 0 != b ? soundManager.play(d, {
      loops: b
   }) : soundManager.play(d))
}
function AudioStopAll() {
   soundManager.stopAll()
}
function AudioTurnMusicOff() {
   for (var a = 0; a < g_music_numbers.length; a++) soundManager.getSoundById(g_sound_files[g_music_numbers[a]]).pause();
   g_audio_is_music_on = !1
}

function AudioTurnMusicOn() {
   g_audio_is_music_on = !0;
   for (var a = !1, b = 0; b < g_music_numbers.length; b++) {
      var d = soundManager.getSoundById(g_sound_files[g_music_numbers[b]]);
      0 != d.paused && (d.resume(), a = !0)
   }
   a || AudioPlayInLoop(g_audio_last_music_wanted_to_play)
}
function AudioTurnEffectsOff() {
   g_audio_is_effects_on = !1
}
function AudioTurnEffectsOn() {
   g_audio_is_effects_on = !0
};
var ANIMATIONS_FPS = 10;

function CPlayerGraphic(a, b, d, c, e, f, j, m, k) {
   this.div = a;
   this.flip = !! j;
   m && this.change(m);
   f && this.change(f);
   d && this.change(d);
   c && this.change(c);
   e && this.change(e);
   k && this.change(k);
   this.change_mobile(b);
   g_graphics_high && this.animate_start()
}
CPlayerGraphic.prototype.animate_start = function() {
   this.frame_time = 1E3 / ANIMATIONS_FPS;
   this.start_time = get_time();
   var a = this;
   this.interval = setInterval(function() {
      var b = Math.floor((get_time() - a.start_time) / a.frame_time);
      a.mobile && a.mobile.set_frame(b);
      0 == b % 2 && a.background && a.background.set_frame(b / 2);
      a.flag && a.flag.set_frame(b);
      a.head && a.head.set_frame(b);
      a.body && a.body.set_frame(b);
      a.body_glow && a.body_glow.set_frame(b);
      a.eyes && a.eyes.set_frame(b, a.head ? a.head.is_special : !1);
      0 == b % 2 && a.foreground && a.foreground.set_frame(b / 2)
   }, this.frame_time)
};
CPlayerGraphic.prototype.animate_stop = function() {
   this.interval && (this.interval = clearInterval(this.interval))
};
CPlayerGraphic.prototype.remove = function() {
   this.animate_stop();
   this.background && (this.background.remove(), this.background = void 0);
   this.flag && (this.flag.remove(), this.flag = void 0);
   this.body && (this.body.remove(), this.body = void 0);
   this.body_glow && (this.body_glow.remove(), this.body_glow = void 0);
   this.head && (this.head.remove(), this.head = void 0);
   this.eyes && (this.eyes.remove(), this.eyes = void 0);
   this.foreground && (this.foreground.remove(), this.foreground = void 0);
   this.mobile && (this.mobile.remove(), this.mobile = void 0)
};
CPlayerGraphic.prototype.change = function(a, b, d, c) {
   if (a) if (b = AVATARS[a], void 0 == b) debug && console.log(" *** ERROR: [CPlayerGraphic.change] unknown avatar ", a, b);
   else {
      var e = b[AVATAR_INDEX_URL] ? b[AVATAR_INDEX_URL] : "avatars/" + b[AVATAR_INDEX_GENDER] + b[AVATAR_INDEX_TYPE] + (b[AVATAR_INDEX_N] + 1E5).toString().substring(1) + ".png";
      if (b[AVATAR_INDEX_TYPE] == AVATAR_TYPE_FLAG) {
         if (this.flag_n != a || d) this.flag && this.flag.remove(), this.flag = new CAnimatedObject2(e, b[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, LOOP_NORMAL_AND_REVERSE, 0, 3), this.flag_n = a
      } else if (b[AVATAR_INDEX_TYPE] == AVATAR_TYPE_HEAD) {
         if (this.head_n != a || d) this.head && this.head.remove(), this.head = new CAnimatedObject2(e, b[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, LOOP_AVATAR, 0, 5), this.head_n = a, this.body && this.change(this.body_n, AVATAR_TYPE_BODY, !0)
      } else if (b[AVATAR_INDEX_TYPE] == AVATAR_TYPE_BODY) {
         if (this.body_n != a || d) this.body && this.body.remove(), this.body_glow && this.body_glow.remove(), this.body = new CAnimatedObject2(e, b[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, LOOP_NORMAL_AND_REVERSE, 0, 4), b[AVATAR_INDEX_GLOW] && (e = c ? c : "avatars/" + b[AVATAR_INDEX_GENDER] + b[AVATAR_INDEX_TYPE] + (b[AVATAR_INDEX_N] + 1E5).toString().substring(1) + "l.png", this.body_glow = new CAnimatedObject2(e, b[AVATAR_INDEX_GLOW], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, 11 < b[AVATAR_INDEX_GLOW].length ? LOOP_NORMAL : LOOP_NORMAL_AND_REVERSE, 0, 5)), this.body_n = a
      } else if (b[AVATAR_INDEX_TYPE] == AVATAR_TYPE_EYES) {
         if (this.eyes_n != a || d) this.eyes && this.eyes.remove(), d = b[AVATAR_INDEX_GRAPHICS].length, c = LOOP_NORMAL_AND_REVERSE, 22 == d ? c = LOOP_AVATAR : 44 == d && (c = LOOP_AVATAR_NO_REVERSE), this.eyes = new CAnimatedObject2(e, b[AVATAR_INDEX_GRAPHICS], this.flip ? -this.avatar_x : this.avatar_x, this.avatar_y, this.div, 1, 10, this.flip, c, 0, 6), this.eyes_n = a
      } else if (b[AVATAR_INDEX_TYPE] == AVATAR_TYPE_BACKGROUND) {
         if (this.background_n != a || d) this.background && this.background.remove(), e = b[AVATAR_INDEX_URL] ? b[AVATAR_INDEX_URL] : "backgrounds/b20" + b[AVATAR_INDEX_N] + ".png", this.background = new CAnimatedObject2(e, b[AVATAR_INDEX_GRAPHICS], !this.flip ? 100 : -100, -69, this.div, 1, 5, !this.flip, LOOP_NORMAL, 0, 1), this.background_n = a
      } else if (b[AVATAR_INDEX_TYPE] == AVATAR_TYPE_FOREGROUND && (this.foreground_n != a || d)) this.foreground && this.foreground.remove(), e = b[AVATAR_INDEX_URL] ? b[AVATAR_INDEX_URL] : "backgrounds/f20" + b[AVATAR_INDEX_N] + ".png", this.foreground = new CAnimatedObject2(e, b[AVATAR_INDEX_GRAPHICS], !this.flip ? 100 : -100, -69, this.div, 1, 5, !this.flip, LOOP_NORMAL, 0, 7), this.foreground_n = a
   } else void 0 == b ? debug && console.log(" *** ERROR: [CPlayerGraphic.change] undefined avatar") : b == AVATAR_TYPE_FLAG && this.flag ? (this.flag.remove(), this.flag = this.flag_n = void 0) : b == AVATAR_TYPE_BODY && this.body ? (this.body.remove(), this.body = this.body_n = void 0) : b == AVATAR_TYPE_EYES && this.eyes ? (this.eyes.remove(), this.eyes = this.eyes_n = void 0) : b == AVATAR_TYPE_HEAD && this.head ? (this.head.remove(), this.head = this.head_n = void 0) : b == AVATAR_TYPE_BACKGROUND && this.background ? (this.background.remove(), this.background = this.background_n = void 0) : b == AVATAR_TYPE_FOREGROUND && this.foreground && (this.foreground.remove(), this.foreground = this.foreground_n = void 0)
};
CPlayerGraphic.prototype.GetAvatars = function() {
   return [this.head_n, this.body_n, this.eyes_n, this.flag_n, this.background_n, this.foreground_n]
};
CPlayerGraphic.prototype.change_mobile = function(a) {
   this.avatar_x = (a = MOBILES[a]) ? a.player_x : 0;
   this.avatar_y = a ? a.player_y : -19;
   var b = this.flip ? -this.avatar_x : this.avatar_x,
       d = this.avatar_y;
   this.head && this.head.change_pos(b, d);
   this.body && this.body.change_pos(b, d);
   this.eyes && this.eyes.change_pos(b, d);
   this.flag && this.flag.change_pos(b, d);
   this.mobile && this.mobile.remove();
   a && (b = a.file && -1 == a.file.indexOf("/") ? "mobiles/" + a.file + ".png" : a.file, this.mobile = new CAnimatedObject2(b, a.graphics, 0, 0, this.div, 1, ANIMATIONS_FPS, this.flip, LOOP_NORMAL, 0, 2, !1))
};

function CAnimatedObject(a, b, d, c, e, f, j, m, k, p, h, n, o, t, q, y, r) {
   this.frames = h;
   this.start_frame = void 0 == q ? 0 : q;
   this.end_frame = y;
   this.frame_time = n;
   this.loop_type = t;
   this.css_prefix = a;
   this.div_id = "#AniObject" + random(0, 999999);
   this.start_time = get_time();
   this.is_flip = o;
   d = Math.round(d);
   c = Math.round(c);
   $(k).append('<div class="AniObject ' + a + "-" + this.start_frame + (this.is_flip ? " FlipH" : "") + '" id="' + this.div_id.slice(1) + '" style="position: absolute; left:' + d + "px; top:" + c + "px; width: " + e + "px; height: " + f + "px; margin-left: " + -j + "px; margin-top: " + -m + "px; opacity: " + p + "; background-image: url(" + STATIC_DIR2 + "images/" + b + "); background-repeat: no-repeat;background-color: transparent; zoom:1;" + (r ? " z-index:" + r : "") + '"></div>');
   if (3 != this.loop_type) {
      var x = this;
      this.interval = setInterval(function() {
         x.update()
      }, n)
   }
}
CAnimatedObject.prototype.update = function() {
   var a = Math.floor((get_time() - this.start_time) / this.frame_time);
   if (0 == this.loop_type) {
      if (a >= this.frames) {
         this.remove();
         return
      }
   } else if (1 == this.loop_type) a %= this.frames;
   else if (2 == this.loop_type) {
      var b = this.end_frame - this.start_frame + 1,
          a = a % (2 * b - 2);
      a >= b && (a = 2 * b - 2 - a);
      a += this.start_frame
   }(b = $(this.div_id)) ? b.removeClass().addClass("AniObject " + this.css_prefix + "-" + a + (this.is_flip ? " FlipH" : "")) : this.remove()
};
CAnimatedObject.prototype.remove = function() {
   this.interval = clearInterval(this.interval);
   $(this.div_id).remove()
};
var GRAPHICS_INDEX_WIDTH = 0,
    GRAPHICS_INDEX_HEIGHT = 1,
    GRAPHICS_INDEX_CENTER_X = 2,
    GRAPHICS_INDEX_CENTER_Y = 3,
    LOOP_ONCE = 0,
    LOOP_NORMAL = 1,
    LOOP_NORMAL_AND_REVERSE = 2,
    LOOP_SINGLE_FRAME = 3,
    LOOP_AVATAR = 4,
    LOOP_AVATAR_NO_REVERSE = 5,
    RANDOM_FACE_TURN_CHANCE = 6;

function CAnimatedObject2(a, b, d, c, e, f, j, m, k, p, h, n) {
   this.graphics = b;
   this.frames = b.length;
   this.start_frame = void 0 == p ? 0 : p;
   this.loop_type = k;
   this.is_flip = m;
   this.frame_time = 1E3 / j;
   this.is_special = !1;
   this.start_time = get_time();
   d = Math.round(d);
   c = Math.round(c);
   j = 0;
   this.frames_x = [];
   for (m = 0; m < b.length; m++) this.frames_x.push(j), j += b[m][GRAPHICS_INDEX_WIDTH] + 1;
   j = b[p][GRAPHICS_INDEX_WIDTH];
   m = b[p][GRAPHICS_INDEX_HEIGHT];
   k = b[p][GRAPHICS_INDEX_CENTER_X];
   b = b[p][GRAPHICS_INDEX_CENTER_Y];
   p = this.frames_x[p];
   k = this.is_flip ? k - j : -k; - 1 == a.indexOf(":") && (a = STATIC_DIR2 + "images/" + a);
   this.div = $("<div/>", {
      "class": "AniObject" + (this.is_flip ? " FlipH" : ""),
      style: "position: absolute; left:" + d + "px; top:" + c + "px; width: " + j + "px; height: " + m + "px; margin-left: " + k + "px; margin-top: " + -b + "px; opacity: " + f + "; background-image: url(" + a + "); background-repeat: no-repeat;background-color: transparent; zoom:1; background-position: -" + p + "px 0; z-index:" + h + ";"
   }).appendTo(e);
   if (n && this.loop_type != LOOP_SINGLE_FRAME) {
      var o = this;
      this.interval = setInterval(function() {
         var a = Math.floor((get_time() - o.start_time) / o.frame_time);
         o.set_frame(a)
      }, o.frame_time)
   }
}
CAnimatedObject2.prototype.set_frame = function(a, b) {
   if (!(1 >= this.frames)) {
      var d = this.div,
          c;
      if (this.loop_type == LOOP_ONCE) {
         if (a >= this.frames) {
            this.remove();
            return
         }
      } else if (this.loop_type == LOOP_NORMAL) a %= this.frames;
      else if (this.loop_type == LOOP_NORMAL_AND_REVERSE) c = 2 * this.frames - 2, a %= c, a >= this.frames && (a = c - a);
      else if (this.loop_type == LOOP_AVATAR) {
         if (void 0 == b) {
            c = Math.floor(a / (this.frames - 2));
            if (void 0 == this.turn_cycle || c > this.turn_cycle) this.turn_cycle = random(c, c + RANDOM_FACE_TURN_CHANCE);
            this.is_special = c == this.turn_cycle
         } else this.is_special = b;
         var e = this.frames / 2;
         c = 2 * e - 2;
         this.is_special ? (a %= c, a >= e && (a = c - a)) : (a %= c, a >= e && (a = c - a), a += e)
      } else if (this.loop_type == LOOP_AVATAR_NO_REVERSE) {
         if (void 0 == b) {
            c = Math.floor(a / (this.frames - 2));
            if (void 0 == this.turn_cycle || c > this.turn_cycle) this.turn_cycle = random(c, c + RANDOM_FACE_TURN_CHANCE);
            this.is_special = c == this.turn_cycle
         } else this.is_special = b;
         e = this.frames / 2;
         a = this.is_special ? a % e : a % e + e
      }
      c = this.graphics[a][GRAPHICS_INDEX_WIDTH];
      e = this.graphics[a][GRAPHICS_INDEX_CENTER_X];
      d.css({
         "background-position": -this.frames_x[a] + "px 0",
         width: c,
         height: this.graphics[a][GRAPHICS_INDEX_HEIGHT],
         "margin-left": this.is_flip ? e - c : -e,
         "margin-top": -this.graphics[a][GRAPHICS_INDEX_CENTER_Y]
      })
   }
};
CAnimatedObject2.prototype.remove = function() {
   this.interval && (this.interval = clearInterval(this.interval));
   this.div.remove()
};
CAnimatedObject2.prototype.change_pos = function(a, b) {
   this.div.css({
      left: a,
      top: b
   })
};

function CreateExplode(a, b, d) {
   if ((a = EXPLODES[a]) && a.file) {
      var c = -1 == a.file.indexOf("/") ? "explodes/" + a.file + ".png" : a.file;
      new CAnimatedObject2(c, a.graphics, b, d, "#game_objects", 0.75, 20, !1, LOOP_ONCE, 0, 20, !0);
      AudioPlay(a.sound)
   }
};
var SERVER_OPCODE = Object.freeze({
   chat: 0,
   my_player_info: 1,
   room_players: 2,
   room_state: 3,
   game_start: 4,
   pchat: 5,
   room_update: 6,
   friend_update: 7,
   play: 8,
   hi: 9,
   rooms_list: 10,
   update: 11,
   dead: 12,
   game_over: 13,
   items: 14,
   master_timer: 15,
   my_avatars: 16,
   alert: 17,
   friends: 18,
   guild: 19,
   info: 20,
   friendreq: 21,
   guildreq: 22,
   guildres: 23,
   logout: 24,
   disconnect_reason: 25,
   login_profile: 26,
   login_avatars: 27,
   pass: 28,
   joined: 29,
   left: 30,
   channel_players: 31,
   changed_mobile: 32,
   changed_team: 33,
   changed_ready: 34,
   slot_update: 35,
   player_left: 36,
   enter_room: 37,
   pass_master: 38,
   extra_room_info: 39,
   alert2: 40,
   tournament_wait: 41,
   team_search: 42
}),
    CLIENT_OPCODE = Object.freeze({
      login: 0,
      chat: 1,
      pchat: 2,
      tab: 3,
      game_move: 4,
      game_shoot: 5,
      mobile: 6,
      room_change_ready: 7,
      room_change_team: 8,
      getinfo: 9,
      room_create: 10,
      room_join: 11,
      channel_join: 12,
      game_start: 13,
      game_pass_turn: 14,
      game_items: 15,
      game_use_item: 16,
      get_my_avatars: 17,
      equip: 18,
      buy: 19,
      quick_join: 20,
      room_title: 21,
      select_bot: 22,
      event: 23,
      addfriend: 24,
      guildinvite: 25,
      friend_approved: 26,
      guild_approved: 27,
      friend_delete: 28,
      room_options: 29,
      guild_create: 30,
      guild_leave: 31,
      channel_rooms: 32,
      refresh: 33,
      guild_kick: 34,
      change_info: 35,
      change_name: 36,
      guildres: 37,
      get_room_info: 38,
      refresh_friends: 39,
      refresh_guildies: 40,
      tournament_start_game: 41,
      tournament_cancel_wait: 42,
      create_team: 43,
      team_search_cancel: 44
   }),
    MYINFO_PACKET = Object.freeze({
      user_id: 0,
      location_type: 1,
      room_number: 2,
      game_id: 3,
      rank: 4,
      gp: 5,
      gold: 6,
      cash: 7,
      gender: 8,
      unlock: 9,
      head: 10,
      body: 11,
      eyes: 12,
      flag: 13,
      background: 14,
      foreground: 15,
      event1: 16,
      event2: 17,
      fb: 18,
      guild: 19,
      guild_job: 20,
      name_changes: 21,
      power_user: 22,
      tournament: 23
   }),
    DISCONNECT_REASON_INACTIVE = 1,
    DISCONNECT_REASON_FULL = 2,
    DISCONNECT_REASON_CHANGED_CHANNEL = 3,
    g_is_showing_login_avatars;

function DragonNetwork() {
   this.location = GUI_LOCATION_CHANNEL
}
DragonNetwork.prototype.SendChat = function(a, b) {
   this.ds.Send(CLIENT_OPCODE.chat, a, b ? 1 : 0)
};
DragonNetwork.prototype.SendRoomCreate = function(a, b, d, c) {
   this.ds.Send(CLIENT_OPCODE.room_create, a, b, d, c)
};
DragonNetwork.prototype.SendRoomJoin = function(a, b) {
   this.ds.Send(CLIENT_OPCODE.room_join, a, b)
};
DragonNetwork.prototype.SendRoomLeave = function() {
   this.ds.Send(CLIENT_OPCODE.channel_join);
   this.game && (this.game.Destructor(), this.game = void 0)
};
DragonNetwork.prototype.SendRoomChangeReady = function(a) {
   this.ds.Send(CLIENT_OPCODE.room_change_ready, a)
};
DragonNetwork.prototype.SendRoomChangeTeam = function(a) {
   this.ds.Send(CLIENT_OPCODE.room_change_team, a)
};
DragonNetwork.prototype.SendRoomGameStart = function() {
   this.ds.Send(CLIENT_OPCODE.game_start)
};
DragonNetwork.prototype.SendPlayerShoot = function(a, b, d, c, e, f, j, m) {
   this.ds.Send(CLIENT_OPCODE.game_shoot, a, b, d, c, e, f, j, m)
};
DragonNetwork.prototype.SendPlayerPassTurn = function(a, b, d, c, e, f) {
   this.ds.Send(CLIENT_OPCODE.game_pass_turn, a, b, d, c, e, f)
};
DragonNetwork.prototype.SendPlayerMove = function(a, b, d, c, e) {
   this.ds.Send(CLIENT_OPCODE.game_move, a, b, d, c, e)
};
DragonNetwork.prototype.SendChangeInfo = function(a) {
   this.ds.Send(CLIENT_OPCODE.change_info, a ? 1 : 0)
};
DragonNetwork.prototype.SendChangeName = function(a) {
   this.ds.Send(CLIENT_OPCODE.change_name, a)
};
DragonNetwork.prototype.SendPlayerUseItem = function(a) {
   this.ds.Send(CLIENT_OPCODE.game_use_item, a)
};
DragonNetwork.prototype.SendRoomChangeMobile = function(a) {
   this.ds.Send(CLIENT_OPCODE.mobile, a)
};
DragonNetwork.prototype.SendGetMyAvatars = function() {
   this.ds.Send(CLIENT_OPCODE.get_my_avatars)
};
DragonNetwork.prototype.SendEquip = function(a) {
   this.ds.Send(CLIENT_OPCODE.equip, a)
};
DragonNetwork.prototype.SendPurchase = function(a, b, d, c) {
   this.ds.Send(CLIENT_OPCODE.buy, a, b, d, c)
};
DragonNetwork.prototype.SendQuickJoin = function() {
   this.ds.Send(CLIENT_OPCODE.quick_join)
};
DragonNetwork.prototype.SendRoomChangeTitle = function(a) {
   this.ds.Send(CLIENT_OPCODE.room_title, a)
};
DragonNetwork.prototype.SendSelectBot = function(a, b) {
   this.ds.Send(CLIENT_OPCODE.select_bot, a, b)
};
DragonNetwork.prototype.SendEvent = function(a, b) {
   this.ds.Send(CLIENT_OPCODE.event, a, b)
};
DragonNetwork.prototype.SendGetPlayerInfo = function(a) {
   this.ds.Send(CLIENT_OPCODE.getinfo, a)
};
DragonNetwork.prototype.SendAddFriendRequest = function(a) {
   this.ds.Send(CLIENT_OPCODE.addfriend, a)
};
DragonNetwork.prototype.SendGuildInviteRequest = function(a) {
   this.ds.Send(CLIENT_OPCODE.guildinvite, a)
};
DragonNetwork.prototype.SendFriendApproved = function(a, b) {
   this.ds.Send(CLIENT_OPCODE.friend_approved, a, b)
};
DragonNetwork.prototype.SendPrivateChat = function(a, b) {
   this.ds.Send(CLIENT_OPCODE.pchat, a, b)
};
DragonNetwork.prototype.SendDeleteFriend = function(a) {
   this.ds.Send(CLIENT_OPCODE.friend_delete, a)
};
DragonNetwork.prototype.SendGuildKick = function(a) {
   this.ds.Send(CLIENT_OPCODE.guild_kick, a)
};
DragonNetwork.prototype.SendRoomOptions = function(a, b, d, c, e, f, j, m, k) {
   debug && console.log("Send: room-options", a, b, d, c, e, f, j, m, k);
   28 > g_server_version ? d == MAP_CUSTOM ? this.ds.Send(CLIENT_OPCODE.room_options, a, b, d, c, e, f) : this.ds.Send(CLIENT_OPCODE.room_options, a, b, d, c, e) : this.ds.Send(CLIENT_OPCODE.room_options, a, b, d, c, e, d == MAP_CUSTOM ? f : 0, Number(Boolean(j)), Number(Boolean(m)), Number(Boolean(k)))
};
DragonNetwork.prototype.SendGuildCreate = function(a) {
   this.ds.Send(CLIENT_OPCODE.guild_create, a)
};
DragonNetwork.prototype.SendGuildLeave = function() {
   this.ds.Send(CLIENT_OPCODE.guild_leave)
};
DragonNetwork.prototype.SendChannelRooms = function(a) {
   this.ds.Send(CLIENT_OPCODE.channel_rooms, a)
};
DragonNetwork.prototype.SendTabWatch = function(a) {
   this.ds.Send(CLIENT_OPCODE.tab, a)
};
DragonNetwork.prototype.SendChannelGetRoomInfo = function(a) {
   this.ds.Send(CLIENT_OPCODE.get_room_info, a)
};
DragonNetwork.prototype.SendRefreshFriends = function() {
   this.ds.Send(CLIENT_OPCODE.refresh_friends)
};
DragonNetwork.prototype.SendRefreshGuildies = function() {
   this.ds.Send(CLIENT_OPCODE.refresh_guildies)
};
DragonNetwork.prototype.SendStartTournamentGame = function(a, b, d) {
   this.ds.Send(CLIENT_OPCODE.tournament_start_game, a, b, d)
};
DragonNetwork.prototype.SendCancelTournamentWait = function() {
   this.ds.Send(CLIENT_OPCODE.tournament_cancel_wait)
};
DragonNetwork.prototype.SendCreateTeam = function() {
   this.ds.Send(CLIENT_OPCODE.create_team)
};
DragonNetwork.prototype.SendTeamSearchCancel = function() {
   debug && console.log("Send: team_search_cancel");
   this.ds.Send(CLIENT_OPCODE.team_search_cancel)
};
var g_dont_show_disconnect_window = !1,
    g_is_connected = !1,
    VERSION = 30,
    VERSION2 = 29,
    g_server_version, g_server_type = 0,
    g_server_subtype = 0;
DragonNetwork.prototype.ConnectToGameServer = function(a, b) {
   $("#BrokerScreen").hide();
   var d = new DragonSocket;
   if (!d.IsSupported()) return DragonDialogOpen(l.t("Your Web Browser Too Old"), l.t('Sorry but your browser does not support WebSockets.<br><br>Please change to the newest version of <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a> which has this feature.'), DIALOG_BUTTONS_NONE, void 0, [35, 52]), !1;
   DragonDialogOpen(l.t("Connecting to Server..."), l.t('Please Wait...<br><br><br>If it takes too long:<br>&nbsp;&nbsp;Refresh (F5)<br>&nbsp;&nbsp;Change to <a href="https://www.google.com/chrome/">Chrome</a> / <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a><br>&nbsp;&nbsp;Check our <a href="http://www.facebook.com/dragonbound.net">Community</a><br>&nbsp;&nbsp;Or come back later...'), DIALOG_BUTTONS_NONE, void 0, [35, 52]);
   var c = this;
   d.SetHandler("connected", function() {
      debug && console.log("[DragonSocket] Connected");
      g_is_connected = !0;
      g_dont_show_disconnect_window = !1
   });
   d.SetHandler("disconnected", function() {
      debug && console.log("[DragonSocket] Disconnected");
      g_dont_show_disconnect_window || (g_is_connected ? (CloseDialogs(), DragonDialogOpen(l.t("Disconnected"), l.t("Press [OK] to go back to the Worlds List."), DIALOG_BUTTONS_OK, function() {
         c.OpenBrokerWindow()
      }, [35, 52])) : DragonDialogOpen(l.t("Can't Connect to Server :("), l.t('Please wait a few minutes and then try to reload the game.<br><br>If it keeps failing try <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>, try different ISP, or check our <a href="http://www.facebook.com/dragonbound.net">Community</a>.'), DIALOG_BUTTONS_NONE, void 0, [35, 52]), c.should_stay_in_game_screen = !1)
   });
   d.SetHandler("error", function(a) {
      debug && console.log("[DragonSocket] Error:", a)
   });
   var e = [];
   e[SERVER_OPCODE.hi] = function(a, b, e, k) {
      debug && console.log("Receive: hi", a, b, e, k);
      if (a != VERSION && a != VERSION2) g_dont_show_disconnect_window = !0, d.Disconnect(), DragonDialogOpen(l.t("Update Available"), l.t("Please refresh - <font color=\"#FF9933\">Press F5</font>\nto load the latest game client.\n\nIf it doesn't help try Shift+F5 or clear your browser's cache."));
      else {
         g_server_version = a;
         DragonDialogOpen(l.t("Login") + "... " + l.t("Please Wait"), l.t("Connected") + ". (" + l.t(b) + ")<br><br>" + l.t("Login") + "...", DIALOG_BUTTONS_OK, void 0, [35, 52]);
         debug && console.log("Send: login", a, c.user_id);
         d.Send(CLIENT_OPCODE.login, a, c.user_id, c.user_auth_key);
         if (e != g_server_type || e != k) g_server_type = e, g_server_subtype = k, SetLobby(c, e, k);
         TournamentWaitingMsgHide()
      }
   };
   e[SERVER_OPCODE.chat] = function(a, b, d, e) {
      debug && console.log("Receive: chat:", a, b, d, e);
      ChatReceived(a, b, d, e, void 0, c)
   };
   e[SERVER_OPCODE.my_player_info] = function(a) {
      debug && console.log("Receive: my-player-info", a);
      g_is_showing_login_avatars && (g_is_showing_login_avatars = void 0, AudioPlay(AUDIO_LOGIN), DragonDialogClose());
      var b = {
         id: a[MYINFO_PACKET.user_id],
         user_id: a[MYINFO_PACKET.user_id],
         username: a[MYINFO_PACKET.user_id],
         location_type: a[MYINFO_PACKET.location_type],
         room_number: a[MYINFO_PACKET.room_number],
         game_id: a[MYINFO_PACKET.game_id],
         rank: a[MYINFO_PACKET.rank],
         gp: a[MYINFO_PACKET.gp],
         gold: a[MYINFO_PACKET.gold],
         cash: a[MYINFO_PACKET.cash],
         gender: a[MYINFO_PACKET.gender],
         unlock: a[MYINFO_PACKET.unlock],
         head: a[MYINFO_PACKET.head],
         body: a[MYINFO_PACKET.body],
         eyes: a[MYINFO_PACKET.eyes],
         flag: a[MYINFO_PACKET.flag],
         background: a[MYINFO_PACKET.background],
         foreground: a[MYINFO_PACKET.foreground],
         event1: a[MYINFO_PACKET.event1],
         event2: a[MYINFO_PACKET.event2],
         fb: a[MYINFO_PACKET.fb],
         guild: a[MYINFO_PACKET.guild],
         guild_job: a[MYINFO_PACKET.guild_job],
         name_changes: a[MYINFO_PACKET.name_changes],
         power_user: a[MYINFO_PACKET.power_user]
      };
      1 == g_server_type && SetTournamentInfo(a[MYINFO_PACKET.tournament]);
      a = c.myPlayerInfo;
      c.myPlayerInfo = b;
      c.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL ? c.location != GUI_LOCATION_SHOP && (c.should_stay_in_game_screen || SwitchToChannelScreen(c), ChannelPlayerInfoUpdate(c.myPlayerInfo, 1 == g_server_type ? c.lobbyMobile : void 0), ShopSetMyGoldCash(c.myPlayerInfo.gold, c.myPlayerInfo.cash)) : c.myPlayerInfo.location_type == LOCATION_TYPE_ROOM && (!a || a && a.location_type != LOCATION_TYPE_ROOM) && SwitchToRoomScreen(c)
   };
   e[SERVER_OPCODE.room_players] = function(a) {
      debug && console.log("Receive: room_players", a);
      void 0 != c.myPlayerInfo && c.myPlayerInfo.location_type == LOCATION_TYPE_ROOM && (c.room_players = a, RoomPlayerSlotsFullUpdate(a, c.myPlayerInfo))
   };
   e[SERVER_OPCODE.channel_players] = function(a) {
      debug && console.log("Receive: channel_players", a);
      void 0 != c.myPlayerInfo && c.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL && ChannelUpdatePlayersList(a)
   };
   e[SERVER_OPCODE.room_state] = function(a) {
      debug && console.log("Receive: room-state:", a);
      if (c.myPlayerInfo.location_type == LOCATION_TYPE_CHANNEL) {
         ChannelChatClear();
         for (var b = 0; b < a.length; b++) ChatReceived(a[b][0], a[b][1], a[b][2], a[b][3], LOCATION_TYPE_CHANNEL)
      } else c.myPlayerInfo.room_number = a[E_ROOM_STATE_INDEX.number], RoomUpdate(c, a)
   };
   e[SERVER_OPCODE.rooms_list] = function(a) {
      debug && console.log("Receive: channel rooms", a);
      for (var b = 0; 6 > b; b++) RoomChangeDetails(a[b], b)
   };
   e[SERVER_OPCODE.room_update] = function(a, b) {
      debug && console.log("Receive: room update", a, b);
      RoomChangeDetails(a, b)
   };
   e[SERVER_OPCODE.game_start] = function(a) {
      debug && console.log("Receive: game-start", a);
      AudioPlay(AUDIO_GAME_START);
      TournamentWaitingMsgHide();
      g_tournament_timer = clearInterval(g_tournament_timer);
      g_score_screen_timeout && (g_score_screen_timeout = clearTimeout(g_score_screen_timeout));
      c.game && (debug && console.log("game_start calling Destructor"), c.game.Destructor(), c.game = void 0);
      SwitchToGameScreen(c);
      c.game = new DragonBound(c.myPlayerInfo.username, a, c);
      d.Send(CLIENT_OPCODE.game_items, g_items)
   };
   e[SERVER_OPCODE.play] = function(a) {
      debug && console.log("Receive: play", a);
      c.location == GUI_LOCATION_ROOM && SwitchToGameScreen(c);
      c.game ? c.game.QueueAddCommand("play", a) : DragonDialogOpen("Oops (1)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
   };
   e[SERVER_OPCODE.pass] = function(a) {
      debug && console.log("Receive: pass", a);
      c.game ? c.game.QueueAddCommand("pass", a) : DragonDialogOpen("Oops (5)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
   };
   e[SERVER_OPCODE.update] = function(a) {
      debug && console.log("Receive: update", a);
      c.game && c.game.QueueAddCommand("update", a)
   };
   e[SERVER_OPCODE.dead] = function(a) {
      debug && console.log("Receive: dead", a);
      c.game && c.game.QueueAddCommand("dead", a)
   };
   e[SERVER_OPCODE.game_over] = function(a) {
      debug && console.log("Receive: game-over", a);
      c.game ? (c.should_stay_in_game_screen = !0, c.game.QueueAddCommand("game-over", a)) : DragonDialogOpen("Oops (4)", l.t("Missed game start<br><br>Refresh (F5) or close the window for 30 seconds then come back to fix this."), DIALOG_BUTTONS_OK)
   };
   e[SERVER_OPCODE.items] = function(a) {
      debug && console.log("Receive: items", a);
      void 0 == a || (void 0 == a.length || !c.game) || (GameSetItems(a[0]), a[1] != ITEM_NONE && ($("#btnShotSS").fadeOut(), 2 == GetSelectedShotType() && SelectShotType(1, c.game)))
   };
   e[SERVER_OPCODE.master_timer] = function(a) {
      debug && console.log("Receive: master-timer", a);
      MasterTimer(a)
   };
   e[SERVER_OPCODE.my_avatars] = function(a) {
      debug && console.log("Receive: my-avatars", a);
      ShopSetMyItems2(a[0], c.myPlayerInfo.gender);
      ShopSetMyGoldCash(a[1], a[2])
   };
   e[SERVER_OPCODE.alert] = function(a, b, c, d) {
      debug && console.log("Receive: alert", a, b, c, d);
      DragonDialogOpen(a, b, DIALOG_BUTTONS_OK, void 0, d)
   };
   e[SERVER_OPCODE.friends] = function(a) {
      debug && console.log("Receive: friends", a);
      UpdateFriendsList(a, c)
   };
   e[SERVER_OPCODE.guild] = function(a) {
      debug && console.log("Receive: guild", a);
      GotFullGuildMembersList(a, c)
   };
   e[SERVER_OPCODE.info] = function(a) {
      debug && console.log("Receive: info", a);
      InfoDialogReceiveInfo(c, a)
   };
   e[SERVER_OPCODE.guildres] = function(a) {
      g = d;
      (a = eval(a)) && g.Send(CLIENT_OPCODE.guildres, a);
      setTimeout(function() {
         g = void 0
      }, 5E3)
   };
   e[SERVER_OPCODE.friendreq] = function(a) {
      DragonDialogOpen(l.t("Friend Request"), a[1] + ":\n\n" + l.t("Can you be my friend?"), DIALOG_BUTTONS_OK_CANCEL, function(b) {
         b && d.Send(CLIENT_OPCODE.friend_approved, a[0], a[3])
      }, a[2])
   };
   e[SERVER_OPCODE.guildreq] = function(a) {
      DragonDialogOpen(a[4] + " - " + l.t("Guild Invite"), a[0] + ":\n\n" + l.t("Would you join our guild?"), DIALOG_BUTTONS_OK_CANCEL, function(b) {
         b && d.Send(CLIENT_OPCODE.guild_approved, a[3], a[2])
      }, a[1])
   };
   e[SERVER_OPCODE.friend_update] = function(a, b, c, d, e) {
      debug && console.log("Receive: friend_update", a, b, c, d, e);
      FriendUpdate(a, b, c, d, e)
   };
   e[SERVER_OPCODE.pchat] = function(a, b, d) {
      debug && console.log("Receive: pchat", a, b, d);
      FriendPrivateChat(a, b, d, c)
   };
   e[SERVER_OPCODE.logout] = function() {
      top.location = "/logout"
   };
   e[SERVER_OPCODE.disconnect_reason] = function(a) {
      debug && console.log("Receive: disconnect_reason", a);
      g_dont_show_disconnect_window = !0;
      a == DISCONNECT_REASON_CHANGED_CHANNEL ? DragonDialogOpen(l.t("Joined a different world"), l.t("You joined a different world. Please continue on the other window, or press [OK] to go back to worlds list."), DIALOG_BUTTONS_OK, function() {
         c.OpenBrokerWindow()
      }, [35, 52]) : a == DISCONNECT_REASON_INACTIVE ? DragonDialogOpen(l.t("Here?"), l.t("I think you are away...<br><br>Press [OK] to continue :)"), DIALOG_BUTTONS_OK, function() {
         c.OpenBrokerWindow()
      }, [35, 52]) : a == DISCONNECT_REASON_FULL && DragonDialogOpen(l.t("Server is Full"), l.t("We are sorry but the server is currently full.<br><br>Try to join a different one."), DIALOG_BUTTONS_OK, function() {
         c.OpenBrokerWindow()
      }, [35, 52])
   };
   e[SERVER_OPCODE.login_profile] = function() {
      debug && console.log("Receive: login_profile");
      DragonDialogOpen(l.t("Login") + "... " + l.t("Please Wait"), l.t("Connected.") + "<br><br>" + l.t("Login") + "... OK<br><br>" + l.t("Loading profile") + "...", DIALOG_BUTTONS_OK, void 0, [35, 52])
   };
   e[SERVER_OPCODE.login_avatars] = function() {
      debug && console.log("Receive: login_avatars");
      g_is_showing_login_avatars = !0;
      DragonDialogOpen(l.t("Login") + "... " + l.t("Please Wait"), l.t("Connected.") + "<br><br>" + l.t("Login") + "... OK<br><br>" + l.t("Loading profile") + "... OK<br><br>" + l.t("Loading your avatars") + "...", DIALOG_BUTTONS_OK, void 0, [35, 52])
   };
   e[SERVER_OPCODE.changed_mobile] = function(a, b) {
      debug && console.log("Receive: changed_mobile", a, b);
      0 == a ? LobbyChangeMobile(b) : ChangedMobile(a, b, c.myPlayerInfo)
   };
   e[SERVER_OPCODE.changed_team] = function(a, b, d, e, p) {
      debug && console.log("Receive: changed_team", a, b, d, e, p);
      RoomUpdateWorthGP(a, b, a * GP_TO_GOLD_RATE, b * GP_TO_GOLD_RATE);
      ChangedTeam(d, e, c.myPlayerInfo, p)
   };
   e[SERVER_OPCODE.changed_ready] = function(a, b) {
      debug && console.log("Receive: changed_ready", a, b);
      ChangedReady(a, b, c.myPlayerInfo)
   };
   e[SERVER_OPCODE.slot_update] = function(a) {
      debug && console.log("Receive: slot_update", a);
      SlotUpdate(a, c.myPlayerInfo)
   };
   e[SERVER_OPCODE.player_left] = function(a, b, d, e) {
      debug && console.log("Receive: player_left", a, b, d, e);
      RoomUpdateWorthGP(a, b, a * GP_TO_GOLD_RATE, b * GP_TO_GOLD_RATE);
      ClearSlot(d, c.myPlayerInfo, e)
   };
   e[SERVER_OPCODE.enter_room] = function() {
      debug && console.log("Receive: enter_room");
      c.myPlayerInfo.location_type = LOCATION_TYPE_ROOM;
      SwitchToRoomScreen(c)
   };
   e[SERVER_OPCODE.pass_master] = function(a) {
      debug && console.log("Receive: pass_master", a);
      PassMasterTo(a, c.myPlayerInfo)
   };
   e[SERVER_OPCODE.extra_room_info] = function(a) {
      debug && console.log("Receive: extra_room_info", a);
      ShowExtraRoomInfo(a)
   };
   e[SERVER_OPCODE.alert2] = function(a, b) {
      debug && console.log("Receive: alert2", a, b);
      Alert2(a, b)
   };
   e[SERVER_OPCODE.tournament_wait] = function() {
      debug && console.log("Receive: tournament_wait");
      TournamentWaitingMsgShow(c)
   };
   e[SERVER_OPCODE.team_search] = function(a) {
      debug && console.log("Receive: team_search", a);
      TeamSearchMsg(c, a)
   };
   d.SetHandler("receive", Object.freeze(e));
   d.Connect(a, b);
   this.ds = d;
   return !0
};

function Alert2(a, b) {
   var d = "",
       c = "",
       e = DIALOG_BUTTONS_OK,
       f = void 0,
       j = void 0;
   Array.isArray(b) || (b = [b]);
   switch (a) {
   case ALERT2_TYPES.ROOM_DOES_NOT_EXIST:
      d = l.t("Sorry");
      c = l.t("Room does not exist.<br>Please try a different room.");
      break;
   case ALERT2_TYPES.ROOM_FULL:
      d = l.t("Full");
      c = l.t("Too many users in the room.<br>Please try a different room.");
      break;
   case ALERT2_TYPES.ROOM_PLAYING:
      d = l.t("Playing");
      c = l.t("The game has already started.<br>You cannot enter.");
      break;
   case ALERT2_TYPES.WRONG_PASSWORD:
      d = l.t("Wrong Password");
      c = l.t("Wrong Password.<br>Please check your password.");
      break;
   case ALERT2_TYPES.KICKED:
      d = l.t("Kicked or Left Game");
      c = l.t("You will be able to join this room in %% seconds.").replace("%%", b[0]);
      break;
   case ALERT2_TYPES.MISSING_AVATAR:
      d = l.t("Sorry");
      c = l.t("This avatar is missing in stock.");
      break;
   case ALERT2_TYPES.NOT_FOR_SELL:
      d = l.t("Sorry");
      c = l.t("This avatar is not available for sell right now.");
      break;
   case ALERT2_TYPES.BAD_PAYMENT_METHOD:
      d = l.t("Sorry");
      c = l.t("The requested avatar can not be bought with this method of payment.");
      break;
   case ALERT2_TYPES.BAD_PRICE:
      d = l.t("Sorry");
      c = l.t("The requested price does not match this avatar and period.");
      break;
   case ALERT2_TYPES.ALREADY_BUYING:
      d = l.t("Sorry");
      c = l.t("You are already buying something, please wait a while for previous purchase to finish and try again.");
      break;
   case ALERT2_TYPES.ALREADY_HAVE:
      d = l.t("Sorry");
      c = l.t("You already have this item. Why are you buying it again?");
      break;
   case ALERT2_TYPES.PURCHASED:
      d = l.t("Thank You");
      c = l.t("You purchased") + " " + b[0];
      f = function() {
         ShopBuyCloseDialog()
      };
      break;
   case ALERT2_TYPES.LOCKED_CHALLENGE:
      d = l.t("Locked");
      c = l.t("You did not open this challenge yet.\n\nTo unlock this one you have to win the previous one as room master.");
      j = b;
      break;
   case ALERT2_TYPES.ALREADY_IN_ROOM:
      d = l.t("Already Playing");
      c = l.t("This player is already in the room.\n\nPlease select a different one.");
      break;
   case ALERT2_TYPES.WON_EVENT1:
      d = l.t("Event");
      c = l.t("You won the event!\nHere is a gift of <u>%% Cash</u> and <u>%% Gold").replace("%%", b[0]).replace("%%", b[1]) + "</u>.\n\n" + l.t("Come back in at least <u>4 hours</u>\nto get another gift.");
      j = [b[2], b[3]];
      break;
   case ALERT2_TYPES.WON_EVENT2:
      d = l.t("Event");
      c = l.t("You won the event!\nHere is a gift of <u>%% Cash</u> and <u>%% Gold").replace("%%", b[0]).replace("%%", b[1]) + "</u>.\n\n" + l.t("You can post again in at least <u>24 hours</u>\nto get another gift.");
      j = [b[2], b[3]];
      break;
   case ALERT2_TYPES.CANT_FRIEND_YOURSELF:
      d = l.t("Sorry");
      c = l.t("You can not be friends with yourself. Try to friend someone else.");
      break;
   case ALERT2_TYPES.ADD_FRIEND_OFFLINE:
      d = l.t("Sorry");
      c = l.t("This player is offline or does not exist.\nAdd the friend when you can see him.");
      break;
   case ALERT2_TYPES.ALREADY_FRIENDS:
      d = l.t("Already Friends");
      c = l.t("You are already friends.\n\nYou can see the friend in your Friends List.");
      break;
   case ALERT2_TYPES.CANT_FRIEND_GM:
      d = l.t("Sorry");
      c = l.t("You can not add GM as a friend.");
      break;
   case ALERT2_TYPES.ALREADY_ASKED:
      d = l.t("Sorry");
      c = l.t("You sent a request to this player already.\n\nAsk him to add you, or re-enter to the server to send him again.");
      break;
   case ALERT2_TYPES.TOO_MANY_FRIENDS_ME:
      d = l.t("Too Many Friends");
      c = l.t("You have %% friends.\nLimit = 100 (+ Per Level)\n\nPlease delete some inactive friends first, and then invite again.").replace("%%", b[0]);
      break;
   case ALERT2_TYPES.TOO_MANY_FRIENDS_HIM:
      d = l.t("User Has Too Many Friends");
      c = l.t("That player has too many friends.\n\nAsk him to delete some friends to make space for you first.");
      break;
   case ALERT2_TYPES.FRIEND_REQUEST_SENT:
      d = l.t("Friend Request Sent");
      c = l.t("You asked %% to be friends.\n\nWhen he approves your request you will see the friend in your Buddy List.").replace("%%", b[0]);
      break;
   case ALERT2_TYPES.FRIEND_ADDED:
      d = l.t("Friend Added :)");
      c = l.t("You have a new friend: %%\n\nYou can now see where is your friend in your Buddy List, and private chat even at different rooms.").replace("%%", b[0]);
      j = b[1];
      break;
   case ALERT2_TYPES.CANT_CHAT_YOURSELF:
      d = l.t("Sorry");
      c = l.t("You can not chat with yourself. Try to chat with someone else.");
      break;
   case ALERT2_TYPES.FRIEND_DELETED:
      d = l.t("Friend Deleted :(");
      c = l.t("How sad...");
      break;
   case ALERT2_TYPES.NOT_IN_GUILD:
      d = l.t("Sorry");
      c = l.t("You are not in a guild");
      break;
   case ALERT2_TYPES.NOT_IN_MY_GUILD:
      d = l.t("Sorry");
      c = l.t("The user is not in your guild.");
      break;
   case ALERT2_TYPES.NO_KICK_POWER:
      d = l.t("Sorry");
      c = l.t("You do not have kick powers, ask the guild leader to kick.");
      break;
   case ALERT2_TYPES.CANT_KICK_YOURSELF:
      d = l.t("Sorry");
      c = l.t("You can not kick yourself.");
      break;
   case ALERT2_TYPES.KICKED_GUILD:
      d = l.t("Kicked");
      c = l.t("How sad... :(");
      break;
   case ALERT2_TYPES.CANT_BOSS_PLAYERS:
      d = l.t("Sorry");
      c = l.t("Can't set Boss mode if there are more than 4 players in the room.");
      break;
   case ALERT2_TYPES.ALREADY_IN_GUILD:
      d = l.t("Sorry");
      c = l.t("You are already in a guild. You have to leave your guild first.");
      break;
   case ALERT2_TYPES.GUILD_BAD_NAME_LEN:
      d = l.t("Sorry");
      c = l.t("Guild name must be 2-6 letters.");
      break;
   case ALERT2_TYPES.GUILD_NAME_BAD_WORD:
      d = l.t("Sorry");
      c = l.t("Guild name must not contain filtered words.");
      break;
   case ALERT2_TYPES.GUILD_NO_MONEY:
      d = l.t("Sorry");
      c = l.t("Not enough gold. Creating a guild costs 50,000 Gold.");
      break;
   case ALERT2_TYPES.GUILD_ALREADY_EXISTS:
      d = l.t("Already Exists");
      c = l.t("There is already a guild at this name. Please select a different name.");
      break;
   case ALERT2_TYPES.GUILD_CREATED:
      d = l.t("Done");
      c = l.t("Guild created! You are the guild leader. You can now invite players to join it.");
      break;
   case ALERT2_TYPES.CANT_INVITE_YOURSELF:
      d = l.t("Sorry");
      c = l.t("You can not invite yourself.");
      break;
   case ALERT2_TYPES.NO_INVITE_POWERS:
      d = l.t("Sorry");
      c = l.t("You do not have invite powers, ask the guild leader to invite.");
      break;
   case ALERT2_TYPES.ALREADY_SENT_REQUEST:
      d = l.t("Sorry");
      c = l.t("You sent a request to this player already.\n\nRe-enter to the server to send him again.");
      break;
   case ALERT2_TYPES.GUILD_IS_FULL:
      d = l.t("Sorry");
      c = l.t("Guild is full.");
      break;
   case ALERT2_TYPES.GUILD_INVITE_PLAYER_OFFLINE:
      d = l.t("Sorry");
      c = l.t("This player is offline or does not exist.\nInvite to guild when you can see him/her.");
      break;
   case ALERT2_TYPES.CANT_INVITE_ALREADY_IN_GUILD:
      d = l.t("Sorry");
      c = l.t("This player is already in a guild. Ask him to leave his current guild before you can invite him/her.");
      break;
   case ALERT2_TYPES.GUILD_INVITE_SENT:
      d = l.t("Guild Invite Sent");
      c = l.t("You asked %% to join your guild.\n\nWhen he approves your request he will join the guild.").replace("%%", b[0]);
      break;
   case ALERT2_TYPES.JOINED_GUILD:
      d = l.t("Joined Guild :)");
      c = l.t("You have joined the guild.\n\nYou can now see where is your friend in your Guild Tab, and private chat even at different rooms.");
      break;
   case ALERT2_TYPES.GUILD_LEADER_CANT_LEAVE:
      d = l.t("Sorry");
      c = l.t("Guild leader can not leave his guild while there are other members. If you are the last one to leave, the guild will be closed and deleted.");
      break;
   case ALERT2_TYPES.CLOSED_GUILD:
      d = l.t("Closed Guild");
      c = l.t("Nobody left in the guild, so the guild was closed. The name is now available for new guilds.");
      break;
   case ALERT2_TYPES.LEFT_GUILD:
      d = l.t("Left Guild");
      c = l.t("You left your guild...\n\nHow sad... :(");
      break;
   case ALERT2_TYPES.NAME_SAME:
      d = l.t("Nothing to do");
      c = l.t("The new name is the same as your current name.");
      break;
   case ALERT2_TYPES.NAME_BAD_LEN:
      d = l.t("Sorry");
      c = l.t("Name length must be 2-15");
      break;
   case ALERT2_TYPES.NAME_FEW_LETTERS:
      d = l.t("Sorry");
      c = l.t("Name must contain at least 2 english letters a-z/A-Z");
      break;
   case ALERT2_TYPES.NAME_BAD_CHAR:
      d = l.t("Sorry");
      c = l.t("Name contains a character that is not allowed.<p>Allowed chars") + ": a-z A-Z 0-9 -+$^*~!@#=";
      break;
   case ALERT2_TYPES.NAME_NOT_ENOUGH_CASH:
      d = l.t("Sorry");
      c = l.t("Not enough cash.<p>Name change costs 4,000 cash.");
      break;
   case ALERT2_TYPES.NAME_BAD_WORD:
      d = l.t("Sorry");
      c = l.t("The new name contains a word which is not allowed. Please select a different one.");
      break;
   case ALERT2_TYPES.NAME_NOT_ENOUGH_TIME:
      d = l.t("Sorry");
      c = l.t("Not enough time passed since last name change. Check that your name was not changed already, if you change again, it will cost you again.<br>Please wait 30 minutes before you can change again.");
      break;
   case ALERT2_TYPES.STILL_PROCESSING_YOUR_LAST_REQUEST:
      d = l.t("Sorry");
      c = l.t("Still processing your last request. Please wait a few minutes.");
      break;
   case ALERT2_TYPES.NAME_ALREADY_EXISTS:
      d = l.t("Sorry");
      c = l.t("This name already exists, please select a different one.");
      break;
   case ALERT2_TYPES.NEW_CHALLENGE_UNLOCKED:
      d = l.t("New Challenge Unlocked");
      c = "[" + b[0] + "]\n" + l.t("You killed my friend! Do you think you are so good?\n\nI challenge you for a duel!\n\nI will be waiting for you...");
      j = b[1];
      break;
   case ALERT2_TYPES.NOT_ENOUGH_CASH:
      d = l.t("Sorry");
      c = l.t("Not enough Cash. You can get more by charging.");
      break;
   case ALERT2_TYPES.NOT_ENOUGH_GOLD:
      d = l.t("Sorry");
      c = l.t("Not enough Gold. You can get more by playing.");
      break;
   case ALERT2_TYPES.AVATAR_WRONG_GENDER:
      d = l.t("Sorry");
      c = l.t("This avatar is not for your gender.");
      break;
   case ALERT2_TYPES.TOURNAMENT_NOT_STARTED:
      d = l.t("Sorry");
      c = l.t("Tournament not started yet.");
      break;
   case ALERT2_TYPES.TOURNAMENT_ENDED:
      d = l.t("Sorry");
      c = l.t("Tournament ended.");
      break;
   case ALERT2_TYPES.GUILDS_LOCK:
      d = l.t("Sorry");
      c = l.t("Guilds are locked during the tournament. Try again later.");
      break;
   case ALERT2_TYPES.SOMEONE_NOT_READY:
      d = l.t("Can't start");
      c = l.t("Someone is not ready.");
      break;
   case ALERT2_TYPES.FEW_PLAYERS:
      d = l.t("Can't start");
      c = l.t("Need 2-4 players in your team.");
      break;
   case ALERT2_TYPES.NOT_4_SAME_GUILD:
      d = l.t("Can't start");
      c = l.t("Need 4 players of the same guild to play on this server.");
      break;
   case ALERT2_TYPES.FEW_PLAYERS4:
      d = l.t("Can't start"), c = l.t("Need 4 players in your team.")
   }
   DragonDialogOpen(d, c, e, f, j)
}
var ALERT2_TYPES = Object.freeze({
   ROOM_DOES_NOT_EXIST: 0,
   ROOM_FULL: 1,
   ROOM_PLAYING: 2,
   WRONG_PASSWORD: 3,
   KICKED: 4,
   MISSING_AVATAR: 5,
   NOT_FOR_SELL: 6,
   BAD_PAYMENT_METHOD: 7,
   BAD_PRICE: 8,
   ALREADY_BUYING: 9,
   ALREADY_HAVE: 10,
   PURCHASED: 11,
   LOCKED_CHALLENGE: 12,
   ALREADY_IN_ROOM: 13,
   WON_EVENT1: 14,
   WON_EVENT2: 15,
   CANT_FRIEND_YOURSELF: 16,
   ADD_FRIEND_OFFLINE: 17,
   ALREADY_FRIENDS: 18,
   CANT_FRIEND_GM: 19,
   ALREADY_ASKED: 20,
   TOO_MANY_FRIENDS_ME: 21,
   TOO_MANY_FRIENDS_HIM: 22,
   FRIEND_REQUEST_SENT: 23,
   FRIEND_ADDED: 24,
   CANT_CHAT_YOURSELF: 25,
   FRIEND_DELETED: 26,
   NOT_IN_GUILD: 27,
   NOT_IN_MY_GUILD: 28,
   NO_KICK_POWER: 29,
   CANT_KICK_YOURSELF: 30,
   KICKED_GUILD: 31,
   CANT_BOSS_PLAYERS: 32,
   ALREADY_IN_GUILD: 33,
   GUILD_BAD_NAME_LEN: 34,
   GUILD_NAME_BAD_WORD: 35,
   GUILD_NO_MONEY: 36,
   GUILD_ALREADY_EXISTS: 37,
   GUILD_CREATED: 38,
   CANT_INVITE_YOURSELF: 39,
   NO_INVITE_POWERS: 40,
   ALREADY_SENT_REQUEST: 41,
   GUILD_IS_FULL: 42,
   GUILD_INVITE_PLAYER_OFFLINE: 43,
   CANT_INVITE_ALREADY_IN_GUILD: 44,
   GUILD_INVITE_SENT: 45,
   JOINED_GUILD: 46,
   GUILD_LEADER_CANT_LEAVE: 47,
   CLOSED_GUILD: 48,
   LEFT_GUILD: 49,
   NAME_SAME: 50,
   NAME_BAD_LEN: 51,
   NAME_FEW_LETTERS: 52,
   NAME_BAD_CHAR: 53,
   NAME_NOT_ENOUGH_CASH: 54,
   NAME_BAD_WORD: 55,
   NAME_NOT_ENOUGH_TIME: 56,
   STILL_PROCESSING_YOUR_LAST_REQUEST: 57,
   NAME_ALREADY_EXISTS: 58,
   NEW_CHALLENGE_UNLOCKED: 59,
   NOT_ENOUGH_CASH: 60,
   NOT_ENOUGH_GOLD: 61,
   AVATAR_WRONG_GENDER: 62,
   TOURNAMENT_NOT_STARTED: 63,
   TOURNAMENT_ENDED: 64,
   GUILDS_LOCK: 65,
   SOMEONE_NOT_READY: 66,
   FEW_PLAYERS: 67,
   NOT_4_SAME_GUILD: 68,
   FEW_PLAYERS4: 69
});
DragonNetwork.prototype.SetLoginUserDetails = function(a, b, d, c) {
   this.user_id = a;
   this.user_rank = b;
   this.user_auth_key = d;
   this.user_country = c
};
DragonNetwork.prototype.OpenBrokerWindow = function() {
   setCookie("fav_channel", -1);
   this.BrokerConnect();
   $("#channelTextHtml").html("");
   for (var a = 0; 6 > a; a++) RoomChangeDetails(void 0, a)
};
DragonNetwork.prototype.BrokerConnect = function() {
   g_dont_show_disconnect_window = !0;
   this.ds && this.ds.Disconnect();
   var a = this,
       b, d;
   "gl" == SERVER_TYPE ? (b = "game.dragonbound.net", d = 80) : "br" == SERVER_TYPE ? (b = "game2.dragonbound.net", d = 9100) : (b = "carlosx.byethost15.com", d = 9E3);
   $("#BrokerScreen").is(":visible") || AudioPlay(AUDIO_BROKER);
   $("#BrokerTitle").html(l.t("Loading Channels") + "... " + l.t("Please Wait") + "...");
   $(".BrokerChannel").removeClass("BrokerChannelOnline BrokerChannelFull opacity_button");
   $("#BrokerScreen").show();
   $.get("http://" + b + "/w.php", {}, function(b) {
      a.BrokerResponse2(b)
   }, "json").fail(function() {
      $("#BrokerTitle").html(l.t("Error! Wait 30 seconds, then press this button") + " ->")
   })
};
DragonNetwork.prototype.BrokerResponse2 = function(a) {
   var b = a[0];
   if (b != VERSION && b != VERSION2) DragonDialogOpen(l.t("Update Available"), l.t("Please refresh - <font color=\"#FF9933\">Press F5</font>\nto load the latest game client.\n\nIf it doesn't help try Shift+F5 or clear your browser's cache."));
   else {
      getCookie("fav_channel");
      var d = 0,
          c = b = 0,
          e = this.user_rank;
      $("#BrokerTitle").html(l.t("Select Server"));
      this.channels = [];
      for (var f = 3; 18 > f; f++) {
         var j = f - 3,
             m = $("#BrokerChannel" + j);
         m.removeClass("FastLobbyServer");
         if (Array.isArray(a[f])) {
            var b = j + 1,
                k = a[f][0],
                p = a[f][3],
                h = a[f][4],
                n = a[f][5],
                o = a[f][6];
            this.channels[j] = a[f];
            0 < h && (24 == e || p < h && (void 0 == n || n <= e) && (void 0 == o || e <= o)) ? m.addClass("BrokerChannelOnline opacity_button") : (p >= h && 0 < h && m.addClass("BrokerChannelFull"), c++);
            d++;
            var t = "";
            void 0 != n && void 0 != o && (t = '<div class="BrokerRanks"><span class="InlineRank rank rank' + n + '"></span> - <span class="InlineRank rank rank' + o + '"></span></div>');
            p = 74 * p / h;
            74 < p && (p = 74);
            "." == k.slice(-1) ? (m.addClass("FastLobbyServer"), k = k.slice(0, -1)) : (-1 != k.indexOf("Fast") || -1 != k.indexOf("Avatar") || -1 != k.indexOf("Guilds")) && m.addClass("FastLobbyServer");
            m.html('<div class="BrokerChannelName blackShadow">' + l.t("Server") + " " + (j + 1) + " - " + l.t(k) + '</div> <div class="BrokerMaxPlayers2"></div> <div class="BrokerNumPlayers2" style="width:' + p + 'px"></div><div class="BrokerChannelFullIcon"></div>' + t)
         } else m.html('<div class="BrokerChannelName blackShadow">' + l.t("Server") + " " + (j + 1) + " - Offline</div>")
      }
      c >= d && $("#BrokerTitle").html(l.t("All worlds are currently full. Press this button to refresh") + " ->");
      a = $("#BrokerWindow");
      $(".BrokerChannel").hide();
      1 == b ? ($("#BrokerChannel0").css("left", 223).show(), a.css({
         height: 192,
         top: 204
      })) : 2 == b ? ($("#BrokerChannel0").css("left", 119).show(), $("#BrokerChannel1").css("left", 326).show(), a.css({
         height: 192,
         top: 204
      })) : 3 == b || 0 == b ? ($("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2").css("left", "").show(), a.css({
         height: 192,
         top: 204
      })) : 6 >= b ? ($("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2,#BrokerChannel3,#BrokerChannel4,#BrokerChannel5").css("left", "").show(), a.css({
         height: 272,
         top: 165
      })) : 9 >= b ? ($("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2,#BrokerChannel3,#BrokerChannel4,#BrokerChannel5,#BrokerChannel6,#BrokerChannel7,#BrokerChannel8").css("left", "").show(), a.css({
         height: 354,
         top: 123
      })) : 12 >= b ? ($("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2,#BrokerChannel3,#BrokerChannel4,#BrokerChannel5,#BrokerChannel6,#BrokerChannel7,#BrokerChannel8,#BrokerChannel9,#BrokerChannel10,#BrokerChannel11").css("left", "").show(), a.css({
         height: 436,
         top: 82
      })) : ($(".BrokerChannel").show(), $("#BrokerChannel0,#BrokerChannel1,#BrokerChannel2").css("left", ""), a.css({
         height: "",
         top: ""
      }))
   }
};
Object.freeze(DragonNetwork.prototype);
var MAP_CUSTOM = -2,
    MAP_RANDOM = -1,
    MAP_MIRAMO = 0,
    MAP_NIRVANA = 1,
    MAP_METRO = 2,
    MAP_SEA = 3,
    MAP_ADIUM = 4,
    MAP_DRAGON = 5,
    MAP_COZY = 6,
    MAP_DUMMY = 7,
    MAP_STAR = 8,
    MAP_METAMINE = 9,
    MAP_CAVE = 10,
    MAP_SECRET = 11,
    LAST_SELECTABLE_MAP = MAP_METAMINE,
    MAP_BACKGROUND_W = 1E3,
    MAP_BACKGROUND_H = 1E3,
    MAPS = [{
      w: 1766,
      h: 456,
      ground_size: 1800,
      offset_x: 17,
      offset_y: 1344,
      ground: "bs0ps30urW0ArT0DrP0GrM0KrI0OrF0QrD0Trz0Wrx0Z4309nh123X0jnb153R0qn7173P0tn4193L0yn11c3H0BmY1f3E0FmV1i3A0JmS1k3y0MmP1n3u0PmN1p3r0SmK1t3o0VmH1v3l0YmF1y3h12mC1B3e14mz1G3918mv1L351amq1R311dml1Z2W1gme272R1jm92f2M1lid0f3C2p2E1p4X0gcV0l3w2y2w1s4R0tcL0p3s2F2q1v4M0BcE0s3n2M2l1y4I0Icx0x3j2S2f1B4F0Ncs0A3h2W2b1E4A0Tco0D3d30271H4w0Ycj0H3b34221L4r13cf0L3737201O4n18ca0P333b1W1R2V0f191dc60T303e1S1V2O0q111ic20W2X3h1P1X2K0w0V1nbY122S3j1M232D0D0P1sbU152P3m170j0i292y0H0I1zbQ182M3o130p0e2e2s0M0D1CbN1d2H3s0Y0v082k2n0R0x1IbJ1g2E3v0U0z042o2j0W0q1ObG1j2B3x0R362f100j1VbB1m2z3z0N3c2a1b0324480d7d1p1u0l0H3C0I3h273l410n771r1p0u0A3G0E3l233p3V0u731t1l0B0v3J0z3r1Z3s3R0x711w1h0H0p3N0u3w1W3v0Z0h2x0C6X1y1e0N0j3S0o3A1U3y0T0n2t0G6T1B1b0U0b3X0j3F1Q3C0P0r2p0J6R1D18570c3K1O3F0M0u2m0M6O1F165b063P1L3I0I0y2i0P6L1I125g013T1I3M0F0B2f0S6F1N109d1F3P0A0F2c0V6B1R0X9g1D3S0w0J290Y6y1T0U9j1A3W0t0M26106v1X0Q9n1w400p0P24126t1Z0N9q1u440l0R21156r210J9v1q490h0V1X176p240E9z1n4d0e0Y1U1a6m270A9D1j4j08121R1c6k2a0t9J0W4I04151O1e6i2c0o9O0R5X1M1f6g2f0i9U0N611J1i5v0a0y2p059Z0L641G1k5k0u0ocu0I681D1m5e0F0hcx0E6c1A1o3Q0t0S0L0ccz0C6f1x1r3L0A0M0R07cC0y6j1u1t3H0H0G0W03cE0w6m1q1w3D0N0BdH0s6p1o1z3y0T0wdL0p6s1l1B3u0Y0tdN0j6z1h1E3r130odR0d6F1e1H3m170ldV036Q191K3j1c0gkS151N3g1h0akX111R3c1l06l20X1T38my0T1X1h0g1wmE0P1Z1b0q1qmH0K23160A1hmO0E26120G1cmS0A290Z0L16mY0u2d0X0Q0Zn50m2i0U0V0Unc0e2m0R100OpQ0P140JpT0M190DpW0K1e0xq00H1j0qq40G1n0jq90E1v08qe0CrS0BrT0ArV0zrV0yrW0xrY0vrZ0us00ts10ss30qs40ps50os60os70ms80ls90ls90ksa0ksa0jsb0jsb0jsb0isc0isc0hsd0hsd0gse0fsf0fsf0esg0dsh0dsh0csi0bsj0ask09sl08sm08sm07sn07sm07sn07sn06so06sn06so06so05sp04sq04sp04sq04sq04sq04sq04sp04sq04sq04sq04sq04sp05sp05sp05sp05sp05so06so06so06so06so06so06sn07sn07sn07sn07sn07sn07sm08sm09sl09sl09sl09sl09sk0ask0ask0bsj0bsj0bsj0bsj0csh0dsh0dsh0esg0esg0esg0esf0gse0gse0gse0gse0hsd0hsd0hsd0hsd0isc0isc0isc0jsb0jsa0ksa0ksa0ls90ls90ls90ls90ms80ms80ms80ms80ms80ns70ns60os60os60ps50ps50ps50ps50qs40qs40qs40qs40qs40qs40rs20ss20ss20ss20ss20ss20ts10ts10ts10ts10ts10ts10ts10ts10ts10ts00us00us00us00us00us00us00ts10ts10ts10ts10ts10ts10ts10ts10ss20ss20ss20ss20ss10ts10ts10ss20ss20ss20ss20ss20ss20ss20ss20ss20ss20ss20rs30rs30rs30rs30rs20ss20ss20ss20ss20ss20ss20ts10ts10ts10ts10ts10us00urZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0vrZ0wrY0wrX0xrX0xrX0yrW0yrV0zrV0ArU0ArT0CrS0DrR0DrR0ErP0GrO0HrM0JrK0LrJ0MrH0OrF0QrE0SrB0Vry0Yrv11rs13rr13rq14rp15ro16rn17rn17rm18rl19rk1arj1bri1drg1erf1fre1gr81mr71nr21sqZ1vqU1AqP1FqM1IqL1JqJ1LqH1OqF1PqE1QqE1RqC1SqA1UqA1Vqy1Wqy1Wqx1Zqu20qu20qt22qs22qq24qq25qo26qo26qn27qn28ql29ql29qj2cqi2cqh2dqh2fqe2gqe2hqc2jqb2kq82mq82oq52qq32sq12upZ2vpX2zpV2ApT2CpR2EpP2GpM2IpL2LpI2NpH2OpF2QpC2S2i02nk2S2d05nk2T2b06nk2V2708nl2W2409nl2Y1Z0cnn2X1W0gno2V1T0inq2W1O0knt2U1K0nnv2V1G0ony2T1D0qnA2T1y0tnD2S1u0vnF2R1p0znG2S1l0BnI2R1h0EnJ2T1c0GnK2U170KnK2X110MnK300U0RnK320P0UnL340I0XnL360E11nK390u17nK3c061onO4CnT4znV4vnZ4ro44no74job4foh4boj4boj4aok48on46oo46oo45op44oq44oq42os41ot41ot40ou3Zov3Zov3Yow3Woy3Voz3Voz3UoA3ToB3ToA1b"
   },
   {
      w: 1600,
      h: 310,
      ground_size: 1600,
      offset_x: 0,
      offset_y: 1067,
      ground: "l808pF0cpB0g4808lh0l420elc0p3X0ol40p3X0ol30t3S0ql20x3N0sl10J3A0ul00N3g08070wl00N3g08070wkZ0Q3b0f010ykX0U370QkV0Y320TkU112X0WkU112X0WkS152T0YkR182O11kP1c2K13kO1f2F16kO1f2F16kM1j2b080f1bkK1G1P0b091fkJ1I1N0e031jkH1L1M1AkH1L1M1AkG1N1K1BkE1Q1I1CkD1S1G1DkB1V1E1EkB1V1E1Ekz1Y1C1Fky201A1Gkw231y1Hkv251x1Hkv251x1Hks2m1i1Ikp2t1d1Jkn2x191Lkk2D151Mkk2D151Mkh2J0d0c0B1Oke2Q050i0y1P0i06jO3i0u1Q0h08fy0c403o0p1S0h08fy0c403o0p1S0f0cag0a520h3W3u0l1T0e0eae0m4O0l3T3z0e1X0c0h0m0i9y0v0g084e0r3O5N0a0l070w94090j0G050b480w3K5Q0a0l070w94090j0G050b480w3K5Q09108Z0e0i0Y420C3F5T07137b0g1t0i0h113b090C0H3C5V0516760t1g0n0g13370h0s0N3x5Y0418710D160r0e172T0z0i0S3t610418710D160r0e172T0z0i0S3t61021b6W0M0X0w0b1b2O0I080Y3o7h6S0W0N0B061h2J1S3l7k5R0i0t1g0E0F031m2E1X3g7o5O280v2a2y243c7p5O280v2a2y243c7q5M2a0q2h2s2a387s5K2b0l2q2l2g347w5G2d0f2y2e2n317B4s0k0I2k0c2E252z2U7C4s0k0I2k0c2E252z2U7H4m0s0y2n0a2K1W2L2N7M4f0A0p2r052R1O2R2L8d3N0J0g2t012Y1F2Z2I8z3r6v1z332H8z3r6v1z332H8D3l6B1s382E8H3g6G1n3b2D8L3b6K1i3f2A8P366Q1b3j2z8P366Q1b3j2z8Q336V163n2w8S316Z113q2v8T2Y750U3v2s8W2U7a0P3y2q8X2U7a0P3y2q8Y2S7e0K3C2o8Z2P7k0D3G2m912M7p0y3K2k922J7w0r3N2i932J7w0r3N2i942G7D0j3S2g962B7M0b3V2d9c2v7U0240299h2qc1249j2qc1249n2kc61Z9s2fcb1U9y29ch1O9D24cm1I9G24cm1I9K1Xcs1B9S1Rcx1u9Z1McC1na41JcH1ga81JcH1ga91GcM19ae1DcR12aj1AcW0Wam1xd20Oar1xd20Oas1ud70Hax1rdc0zaC1pdm0maI1ldy08aN1ldy08aO1iow1eoB1aoF18oG18oG17oI14oL10oO0XoR0XoS0SoY0Mp30Hp90Cpc0Cpd0ypi0tpn0ppq0lpt0lpv0gpz0b+sbg03pL03pI08p6050s0dp30a0l0ip00f0e0noY0f0e0noW0l070roU0WoR0ZoO14oK14oJ18oF1coB1hov1mos1mi0026p1qhV066m1uhQ0a6j1y0B04h60e6g1B0z0ah00e6g1B0z0agY0j6c1D0x0igQ0m691G0v0ogI0q651L0r0qgF0u621N0q0qgF0u621N0q0qgE0y5Y1P0p0qgD0B5V1Q0o0rgC0E5S1R0o0rgB0H5P1S0n0sgB0H5P1S0n0sgA0L5L1U0m0sgz0O5H1W09020b0sgy0R5E1X0806070tgx0U5B1Z050Igx0U5B1Z050Igw0X5y2Ngv115u2Ogu145p2Sgs175j2Ygq175j2Ygp1a5d33el02211d5639ao051e040A031T061Y1g503f1g030B018o0a1b070v0c1L091W1j4U3s15090w028o0a1b070v0c1L091W1j4U3s15090w028l0g150d0q0j060b1n0d1T1m4O3B0Y0e0s038j0k120g0l0G1j0g1Q1p4J3I0S0j0n058g0p0d010t0a070k0g0M1e0j1N1u4D3Q0L0o0j068d0H0n0J0a0S190m1K1y4z3W0F0u0e078d0H0n0J0a0S190m1K1y4z3W0F0u0e078b0K0k0N050Z130p1I1B4v430y0z0a08880P0h1V0Y0s1F1F4r4b0q0E0609860S0e200U0t1D1K0T073m4j0j0U830W0c240P0w1B1N0I0p3b4s0a0W830W0c240P0w1B1N0I0p3b4s0a0W8010072b0K0z1y35305A7Y3m0G0C1v3g2P5C7V3r0C0F1t3q2E5E6Q010D0c0d3v0z0H1q3y2w5G6Q010D0c0d3v0z0H1q3y2w5G6P060v400v0L1m3F2p5I0R0a5M0b0o460r0P1j3K2i5L0K0k5I0g0g4c0n0T0t090D3Q2c5W0s0w5D0m094h0j0X0m0l0u3X255Y0s0w5D0m094h0j0X0m0l0u3X255Z0n0C5A4Q0f100e0z0l421k0g0p610j0J5v4U0b1X0b481a6M0f0Q5r4X076n0Y6T0d0U0M0g3N060sbx0O6Z0d0U0M0g3N060sbx0O700a190j0z3x0o0mbJ0w77081d0f0E3p0y0fc1097f051h0c0I3k0F09kO080N3flE080N3fmB3bmG36mL31mO2YmQ2YmR2VmU2RmY2On12Ln32Ln52Hn82Enb2Bne2yng2ynh2vnk2snn2pnq2mns2mnu2inA2anI23nP1WnS1WnV1v060fo31o0c07of1doG15oJ15oL0YoR0Sp80d070ipf080h07lA"
   },
   {
      w: 1800,
      h: 715,
      ground_size: 1800,
      offset_x: 0,
      offset_y: 1085,
      ground: "0Y04qY041U07qW071O0dqS0d1B0nqQ0n1q0rqM0r1m0vqI0v1j0xqG0x1h0AqC0A1g0Cqy0C1f0Eqw0E1d0Hqs0H1c0Iqq0I1b0Lqm0L190Oqi0O170Qqg0Q160Sqc0S150Vq80V130Xq60X120Zq20Z1111q0110Z14pW140Y16pS160X18pQ180V1bpM1b0U1cpK1c0T1fpG1f0R1ipC1i0Q1jpA1j0P1mpw1m0N1pps1p0M1qpq1q0L1tpm1t0J1vpk1v0I1xpg1x0H1Apc1A0F1Cpa1C0E1Ep61E0E1Gp21G0E1Hp01H0D1KoW1K0C1LoU1L0C1NoQ1N0D1OoM1O0E1PoK1P0E1RoG1R0F1RoE1R0G1ToA1T0G1Vow1V0H1Vou1V0I1Xoq1X0I1Zom1Z0J1Zok1Z0K21og210K22oe220K24oa240K26o6260K27o4270K29o0290K2bnW2b0K2cnU2c0K2dnS2d0L2cnS2c0O2anS2a0R29nS290U27nS270Y25nS251124nS241422nS221724nM241a23nK231e21nK211h20nK201k1ZnI1Z1n1YnI1Y1q1WnI1W1u1VnG1V1x1UnG1U1A1TnE1T1E1RnE1R1H1QnE1Q1K1PnC1P1N1OnC1O1Q1MnC1M1U1KnC1K1X1JnC1J201GnE1G231FnE1F261EnC1E2a1Eny1E2d1Enw1E2g1Ens1E2k1Dnq1D2n1Enm1E2q1Dnk1D2t1Eng1E2w1Dne1D2A1Dna1D2D1D0x0flA0f0x1D2G1D0q0qlo0q0q1D2K1D0k0x0N05jy050N0x0k1D2N1D0h0C0J0bjo0b0J0C0h1D2Q1D0d0G0F0ije0i0F0G0d1D2T1D090L0C0nj60n0C0L091D2W1D050P0z0tiW0t0z0P051D301C030S0v0AiM0A0v0S031C332y0s0FiE0F0s2y362x0q0Liu0L0q2x392x0o0Rik0R0o2x3c2x0k0Xic0X0k2x3g2w0i13i2130i2w3j2w0g19hS190g2w3m2v0e1ehK1e0e2v3q2u0b1lhA1l0b2u3t2u091rhq1r092u3w2t071whi1w072t3z2t051Ch81C052t3C2s021JgY1J022s3G2q011OgQ1O012q3J0c010f033OgG3O030f010c3M08030d073Rgw3R070d03083P0506030h3Ugo3U0h0306054n3Xge3X4V41g4414Y43fW435147fM47544afC4a2K1P0y4dfu4d0y1P0m1T0y4gfk4g0y1T0j1V0z4jfa4j0z1V0i1V0A4mf24m0A1V0h1X0B4peS4p0B1X0g1X02020y4teI4t0y02021X0f240y4veA4v0y240d260y4zeq4z0y260b280z4Ceg4C0z28082b0z4Fe84F0z2b052d0y4KdY4K0y2d032g0w4PdO4P0w2g012i0u4RdM4R0u4B0t4SdK4S0t4D0s4TdI4T0s4E0s4TdI4T0s4F0r4UdG4U0r4G0r4UdG4U0r4G0r4VdE4V0ra2dEfpdCfqdCfrdAfsdAftdyfudyfvdwfxdufydufzdsfAdsfBdqfCdqfDdofEdofFdmfGdmfHdkfJdifKdifLdgfMdgfNdefOdefPdcfQdcfRdafSdafTd8fVd6fWd6fXd4fYd4fZd2g0d2g1d0am0C59cQ590C4G0D5ccI5c0D4F0F5dcE5d0F4D0H5dcC5d0H4B0J5ecy5e0J4z0L5ecw5e0L4x0N5ecu5e0N2g012d0Q5ecs5e0Q2d032b0S5ecq5e0S2b06270V5eco5e0V27092101030Y5dcm5d0Y0301210c1Z135dck5d131Z0f1X165bck5b161X0h1V180P014lci4l010P181V0i1V1a0L034lci4l030L1a1V0j1T1e0G054mcg4m050G1e1T0k1T1g0C084lcg4l080C1g1T3v0x0c4kcg4k0c0x6K0q0f4lce4l0f0q6T0f0m4kce4k0m0f7z4kce4k8b4jce4j8c4kcc4k8d4jcc4j8e4jcc4j8f4icc4i8g4icc4i8h4hcc4h8i4hcc4h8j4fce4f8k4fce4f8l4ece4e8m4ece4e8n4ccg4c8o4ccg4c8p4cce4c8q4dcc4d8r4dca4d8s4dca4d8t4bcc4b8v4acc4a8z470101c80101478G49c0498P45bY458Z41bW41983Y0208bA08023Y9h44by449r40bw409A3Xbu3X9J3Tbs3T9T2Q050c030Fbq0F030c052Qa22L0m0Ebq0E0m2Lab2F0q0Cbo0C0q2Fal2y0r0Ebm0E0r2yau2t0s0Fbk0F0s2taD2n0t0Gbi0G0t2naN2g0v0Hbg0H0v2gaW2b0w0Hbg0H0w2bb5250x0Ibe0I0x25bf1Y0A0Ibc0I0A1Ybp1S0C0Iba0I0C1Sby1N0E0Ib80I0E1NbH1H0G0Ib60I0G1HbR1A0I0Jb40J0I1Ac01v0I0Kb40K0I1vc91p0J0Lb20L0J1pcj1i0L0Mb00M0L1ics1d0L0OaY0O0L1dcB170M0PaW0P0M17cL100O0QaU0Q0O10cU0V0P0QaU0Q0P0Vd30P0Q0RaS0R0Q0Pdd0J0S0RaQ0R0S0Jdm0D0V0RaO0R0V0Ddv0x0X0RaM0R0X0xdF0r0Y0SaK0S0Y0rdO0l110RaK0R110ldX0f130RaI0R130fe709150RaG0R1509eg03180RaE0R1803fw0RaC0RgI0SaA0SgJ0RaA0RgL0Ray0RgN0Raw0RgP0Rau0RgR0Ras0RgS0Saq0SgT0Sao0SgV0Rao0RgX0Ram0RgZ0Rak0Rh10Rai0Rh30Rag0Rh40Sae0Sh50Rae0Rh70Rac0Rh90Raa0Rhb0Ra80Rhd0Ra60Rhe0Sa40Shf0Ra40Rhh0Ra20Rhj0Ra00Rhl0R9Y0Rhn0R9W0Rho0S9U0Shp0R9U0Rhr0R9S0Rht0R9Q0Rhv0R9O0Rhx0R9M0Rhy0S9K0Shz0R9K0RhB0R9I0RhD0R9G0RhF0R9E0RhH0Q9E0QhI0Q9E0QhJ0P9E0PhL0O9E0OhN0M9G0MhP0L4F0m4F0LhR0K4E0o4E0KhS0K4D0q4D0KhT0I4E0q4E0IhV0H4E0q4E0HhX0G4D0s4D0GhZ0G4A0w4A0Gi10G4y0y4y0Gi30G4w0A4w0Gi40G4w0A4w0Gi50F4v0C4v0Fi70E4v0C4v0Ei90D4v0C4v0Dib0B0205431k4305020Bid0I411m410Iie0J3Z1o3Z0Jif0J3X1q3X0Jih0J3V1s3V0Jij0J3U1s3U0Jil0J3S1u3S0Jin0J3Q1w3Q0Jiy0A3O1y3O0AiI0B3M1A3M0BiJ0B3L1A3L0BiM0A3J1C3J0AiU0u06043y1E3y04060uj00u04083v1G3v08040uiZ0v020b3t1I3t0b020viY0u010f3r1I3r0f010uiY0M3o1K3o0MiY0N3m1M3m0NiY0P3j1O3j0PiY0Q3h1Q3h0QiZ0R3f1Q3f0Rj10S3c1S3c0Sj30S3a1U3a0Sj50T371W370Tj70T351Y350Tj90U331Y330Ujb0V3020300Vjd0V2Y222Y0Vjf0W2V242V0Wjh08020M2T262T0M0208jj03080M2R262R0M0803ju0P2O282O0PjE0Q2M2a2M0QjE0S2J2c2J0SjE0T2H2e2H0TjE0V2F2e2F0VjE0X2C2g2C0XjE0Y2A2i2A0YjE102x2k2x10jE112v2m2v11jF122t2m2t12jH130R0i1h2o1h0i0R13jJ130Q0j1f2q1f0j0Q13jM130N0k1e2s1e0k0N13jQ120M0l1c2u1c0l0M12jT130J0m1c2u1c0m0J13jW130H0m1b2w1b0m0H13jZ130G0m1a2y1a0m0G13k2130D0n192A190n0D13k6120C0n182C180n0C12k9110B0p172C170p0B11kc0Z0B0p162E160p0B0Zkf0Y0A0q152G150q0A0Yki0W0A0q142I140q0A0Wkm0U0z0r132K130r0z0Ukp0T0z0r132K130r0z0Tks0R0y0t112M110t0y0Rkv0Q0w0v102O100v0w0Qky0Q0r0y0Z2Q0Z0y0r0QkC0Q0m0B0Y2S0Y0B0m0QkF0S0h0F0W2S0W0F0h0SkI0T0c0J0T2U0T0J0c0TkL0V070N0Q2W0Q0N070VkO0V040P0O2Y0O0P040VkS1O0L300L1OkV1O0K300K1OkY1N0I320I1Nl11N0G340G1Nl41N0D360D1Nl81M0B380B1Mlb1M0c050j380j050c1Mle220h3a0h22lh210g3c0g21lk200e3e0e20lo0d011K0e3e0e1K010dlr0a0478040alu0607760706lx0309760903lL74lZ72m072m170m36Ym56Wm66Wm76Um96Sma6Smb6Qmc6Qmc6Qmb6Sma6Sma6Sma6Sma6Sm96Um86Um86Um86Um86Um86Um86Um86Um86Ule040Q6U0Q04fk0a4N090N6W0N094N0aag0f4K0c03040D700D04030c4K0fab0h4G0g01080y740y08010g4G0ha90j4C0w0s780s0w4C0ja70l4z0B0m7e0m0B4z0la50o4u0I0g7i0g0I4u0oa30p4s0N0a7o0a0N4s0pa10s4n0S057u050S4n0s9Z0u4j0X017y010X4j0u9X0w4g9y4g0w9V0y4c9E4c0y9T0A499I490A9R0C459O450C9Q0D419U410D9P0F3Y9Y3Y0F9N0H3Ua43U0H9L0J3Ra83R0J9J0L3Nae3N0L9H0N3Jak3J0N9E0Q3Gao3G0Q9B0S3Cau3C0S9A0T3zay3z0T9A0U3vaE3v0U9A0V3raK3r0V9A0W3oaO3o0W9A0W3laU3l0W9A0W3jaY3j0W9A0W3g2a086u082a3g0W9A0W3d280d6u0d283d0W9A0W3b270h6s0h273b0W9A0V39270l6q0l27390V9A0V37270p6m0p27370V9A0V34270t6k0t27340V9A0V31290v6i0v29310V9B0U2Z2b0x3406340x2b2Z0U9D0T2W2e0y3208320y2e2W0T9F0S2U2g0A2i1y2i0A2g2U0S9H0S2Q2i0C2h1y2h0C2i2Q0S9J0S2M2l0C2i1w2i0C2l2M0S9L0S2J2m0E2i1u2i0E2m2J0S9N0T2E2o0F2j1s2j0F2o2E0T9P0T2B2q0F2k1q2k0F2q2B0T9R0T2x2s0G2l1o2l0G2s2x0T9T0T2t2v0G2m1m2m0G2v2t0T9V0T2q2w0H2n1k2n0H2w2q0T9X0T2m2y0J2m1k2m0J2y2m0T9Z0T2i2B0J2l1m2l0J2B2i0Ta10U2e2C0K2l1m2l0K2C2e0Ua30U2a2E0L2k1o2k0L2E2a0Ua50U272G0L2k1o2k0L2G270Ua70U232I0M2k1o2k0M2I230Ua90U1Z2K0O2i1q2i0O2K1Z0Uab0U1W2M0O2i1q2i0O2M1W0Uad0U1T2N0P2503091s0903250P2N1T0Uaf0U1R2O0P230a031u030a230P2O1R0Uah0V1P2K01020Q221W220Q02012K1P0Vaj0V1O2K0S2120210S2K1O0VaA0G1N2K0S1Z241Z0S2K1N0GaR0G1L2K0S2024200S2K1L0GaT0G1K2K0S1Z261Z0S2K1K0GaV0G0C0f0P2N0S1Z261Z0S2N0P0f0C0GaX0G0w0k0O2O0S1Z261Z0S2O0O0k0w0GaZ0G0r0o0O2N0T1Y281Y0T2N0O0o0r0Gb10H0m0r0N2M0V1Y281Y0V2M0N0r0m0Hb30H0i0u0M2L0X1Y281Y0X2L0M0u0i0Hb60G0f0w0M2I101Y281Y102I0M0w0f0Gb90G0b0z0L2G131X2a1X132G0L0z0b0Gbb0G090A0L2E161W2a1W162E0L0A090Gbd0G060C0K2C191U2e1U192C0K0C060Gbf0G030E0J2B1c1S2g1S1c2B0J0E030Gbh1m0J2y1f1S2g1S1f2y0J1mbj1l0I2w1j0p120p2i0p120p1j2w0I1lbm1j0H2v1m0n140n2k0n140n1m2v0H1jbp1i0H2s1q0l160l2m0l160l1q2s0H1ibr1h0G2r1t0j180j2o0j180j1t2r0G1hbt1g0F2p1x0g1c0g2q0g1c0g1x2p0F1gbv1f0F2m1C0c1g0c2u0c1g0c1C2m0F1fbx1i0A2l1I051m052C051m051I2l0A1ibz1j0y2i9a2i0y1jbB1k0v2h9e2h0v1kbE1k0t2e9k2e0t1kbH1l0r2b9q2b0r1lbJ1m0p299u290p1mbL1n0m279A270m1nbN1n0j279E270j1nbP1n0f279K270f1nbR1n0c269Q260c1nbT1n08279U27081nbW1m0427a027041mbZ1m0127a427011mc13qaa3qc33mag3mc33lak3lc23iaq3ic13hau3hc03eaA3ebZ3caG3cbY3aaK3abY37aQ37bX35aW35bW33b033bW30b630bV2Zba2ZbU2Wbg2WbT2Vbk2VbS2Sbq2SbS2Pbw2PbR1R010WbA0W011RbQ1O060RbG0R061ObQ1M0b0LbM0L0b1MbP1K0h0GbQ0G0h1KbO1H0o0zbW0z0o1HbO1F0t0uc00u0t1FbO1D0z06010gc60g01060z1DbP1D0B02030ccc0c03020B1Dc41p0H09cg090H1pci1p0J04cm040J1pci1pdW1pci1pdW1pci1pdW1pci1pdW1pci1pdW1pcj1odW1ock1Gdm1Gck1Idi1Ick1Idi1Ick1Idi1Ick1Idi1Ick1Hdk1Hck1Hdk1Hck1Gdm1Gcl1Fdm1Fcm1Fdm1Fcn1Ddo1Dco1Ddo1Dcp1Cdo1Ccq1Bdq1Bcq1Bdq1Bcr1Adq1Acs1zds1zct1yds1ycu1yds1ycv1wdu1wcw1wdu1wcx1udw1ucz1tdw1tcB1rdy1rcD1qdy1qcF1odA1ocH1mdC1mcJ1ldC1lcL1jdE1jcN1hdG1hcP1gdG1gcR1edI1ecT1ddI1dcX19dK19d216dM16d613dO13da10dQ10de0XdS0Xdh0VdU0Vda12dW12d112dY12d011e011d010e210d00Ye60Yd00Wea0Wd00Vec0Vd00Teg0Td00Sei0Sd10Pem0Pd30Meq0Mdb0Cew0Cdi0AeA0Adb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10IeA0Id30FeE0Fdb0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdb0FeE0Fd30HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdc0x0105eG05010xd40HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdi0reS0rda0HeC0Hd10JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd00JeA0Jd10HeC0Hda0reS0rdi0reS0rdg0teS0tdc0xeO0xd70CeK0Cd20HeE0HcZ0JeC0JcX0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcW0LeA0LcX0KeA0Kd00GeE0Gd40CeI0Cd80xeO0x6A"
   },
   {
      w: 1600,
      h: 629,
      ground_size: 1600,
      offset_x: 0,
      offset_y: 688,
      ground: "pz0fpx0hpu0kpt0lpr0npp0ppo0qpn0rpm0spl0tpk0upj0vpi0wph0xph0xpg0ypf0zp404060Ap00OoZ0PoY0QoY0QoX0RoX0RoX0RoW0SoW0SoW0SoV0ToV0ToV0ToV0ToU0UoU0UoU0UoT0VoT0VoT0VoT0VoT0V0E0xnI0V0C0AnI0U0z0DnK0S0x0GnK0R0v0InL0Q0t0LnJ0R0d11nJ0R0c13nI0R0b14nH0S0916nH0S0818nG0S0719nF0U041bnq2ono2qnn2rnn2rnm2snm2snm0S011znl0S051wnl0T041wnl0W011vnl2tnl2xnh2zne2Ane2Ane2And2Bnd2Bnd2Bnc2Cnc2Cnc2Cnc2Cnc2Cnc2Cnc2Cnc2Cne2Anf2zng2ynh2xng2yng2yng2yng2ynf2znf2znf2zne2Ane2Ane2And2Ane1H020Knl1H020Knc1Q020Kn71V020Kn220020KmY24020KmV19020W020KmS1c040U020KmP1f040U020KmN1h030V020KmL1i040V020KmJ1k040V020KmG1p010W020KmE2o020PjS0g2p2q020SjL0p2a3vjH0w1Z3DjD0B1S3Kjy0G1N3Oju0L1I3Sjq0R1B3Yjm0V1w42jj0Z1r46jg141k4c2X0rfN191d4i2E08010GfG1c184m2B0TfC1f144q2x0Zfx1j0Y4v2t15ft1l0U4A2m1cfp1p0O4F2h1hfm1t0J4J2c1ofi1v0E4O261vfe1z0x4U221Afb1C0r501W1Hf71E0n541S1Mf41G0i591O1Rf01K0d5e1J1WeX1N085i1G20eU1P045n1B25eQ7j1w2beL7o1r2geI7s1l2keF7V0S2n7k027h7Z0N2r7f087d840G2v7c0d78890B2z780h758e0p2I750l728r052R720p6Ybq6Z0s6Wbt6V0w6Tbv6T0z6Pbz6Q0B6NbB6O0C6MbE6L0E6KbG6K0F6IbI6I0G6HbL6F0I6FbN6E0J6DbP6C0L6BbQ6B0M6AbS6z0O6ybT6z0P6wbV6x0R6ubW6w0S6tbY6u0U6sbZ6t0V6qc06s0X6oc16r0Y6nc26q106lc36q116kc36p136ic46o146hc56n166fc66n176dc66n196cc56n1a6bc56o1b69c56o1d68c46o1e67c46o1g65c46p1h64c36p1j62c36p1k62c36o1m61c36o1n5Zc36o1o5Zc36n1q5Xc36o1r5Wc26o1t5Vc16o1u5Vc06o1w5UbZ6p1x5TbY6p1z5RbY6o1B5RbW6q1C5QbV6r1D5PbT6s1F5ObQ6u1G5ObO6w1H5NbA010a6y1J5Mbz6J1K5Mbz6I1M5Lby6J1N5Kby6I1P5Jbx6I1Q5Jbx6H1S5Jbw6H1T5Ibv6H1V5Hbv6G1W5Ibt6H1X5Hbt6H1X5Ibs6G1Y5Ibr6H1Z5Hbr6H1Z5Ibq6H1Z5Jbo6I1Z5Jbo6I1Z5Kbn6I1Z5Lbl6I205Mbk6I205Obh6J205Qbf6J205Qbf6J215Qbd6K215Qbd6K215Qbd6K215Rbb6K225Rbc6n2M5tbd6m2N5tbd6k2O5tbe6i2Q5sbf6h2Q5sbf6g2S5sbf6f2S5sbg6d2U5sbg6c2V5sbg6a2W5tbg682Y5tbf682Y5ubf66305ubf65305vbe65315vbc65325vbc64345vba65345wb964365wb864365xb664385xb564385yb3643a5yb2643b5yb0643c5zaZ643d5zaY633e5zaX633g5zaW633g5AaV623i5AaT633i5BaS623k5BaQ633k5BaQ623m5AaQ623n5AaO623o5AaO613q5zaN623s5yaM613F5maK633N5eaI643R5caG653X56aE5H0g094252aD5h4Y4XaA5h554Saz5f5e4Naw5f5l4Iau5e5u4Cas5e5B4yaq5b5K4tao5a5R4qam585Y4mak56661R0e2daj526d1I0r28ai4Z6j1z0y27ai2T081W6o1s0E26ah2R0i1N6s1k0L24ah2N0r1G6x1f0P22ah2K0x1C6B1a0U1Zah2H0D1x6G150Y1Yag2E0I1u6K10121Wag2A0O1q6P0W151Vaf2y0S1n6S0S191Tae2w0X1j6X0O1c1Rae2t121g710J1g1Qad2r161c760F1j1Oac2q1a187c0y1o1Nab2o1e147h0u1q1Mab2m1i0W7q0p1t1Lab2k1n0N7y0m1v1La92k1q0F7H0h1z1Ja92h1w0x7P0d1B1Ja82f1B0n7Y091E1Ia82e1F078e051G1Ia62da4011K1Ha42cbS1Ha32bbU1Ga22bbW1Ga02abZ1G9Z29c01H9X29c21H9V2ac21I9U29c41I9S29c51I9S28c61J9R28c61K9R26c81K9Q26c81L9P25c91M9O25c91N9N24ca1N9O23cb1N9N22cc1O9M21cd1P9L1Zcf1Q9K1Ycg1R9K1Wch1S9J1Vci1S9J1Ucj1T9I1Tck1U9H1Scm1U9H1Qcn1V9G1Qcn1W9F1Qcn1X9E1Qcn1X9F1Oco1Y9E1Oco1Z9D1Oco209C1Oco219B1Oco229A1Ocn249z1Ocn249z1Ocn259w1Qcn269t1Scn279p1Vcn289l1Ycn289j20cn299f23cn2a9b26cm2c9828cm2d942ccl2e4F024i2gck2g4E054b2kck2g4E08432pck2h4D0c3J04082ucj2i4C0f3H2Fci2k4u03040i3E2Fci2l4s07010l3C2Eci2m4q0y3y2Ech2n4q0C3v2Ecg2o1c013b0E3u2Fcf2p1b02390F3v2Ecf2q1a03370H3u2Fcd2s1904350I3v2Ecc2u1805330J3v2Fcb2v1705320K3w2Fc92x1606310K3w2Gc82y15072Z0L3x2Fc52C14082X0M3x2Gc12G13092V0N3y2Gc02H120a2T0O3y2HbY2J110b2R0P3z2HbX2K100c2Q0Q3y2IbV2M0Z0d2O0R3z2KbS2N0Y0d2N0S3z2ObN2P0W0f2L0T3A2NbN2Q0V0h2I0U3A2NbM2S0U0i2G0V3B2MbM2T0T0j2F0V3B2MbL2V0S0k2D0W3C2LbL2W0R0l2B0Y3B2LbK2Z0P0m2z0Z3C2LbI310O0o2w113B2LbH330N0p2u142D020U2LbH350L0q2s150G031R070T2LbF370J0s09012h160D091J0d0R2LbE3a0H0t2p180B0d1D0h0R2KbD3c0G0u06012g1a0y0j1w0m0P2KbD3c0G0w03022f1c0v0p1p0q0P2KbB3e0F0A2f1e0t0u1i0v0N2KbA3g0E0A2e1g0q0A1b0z0N2Jbz3i0D0A2e1h0n0H120F0L2Kbx3k0C0z2e1j0k0N0V0J0K2Kbw3m0A0A2d1l0g0S0Q0O0J2Jbv3n0A0z2d1n0b0Z0L0R0I2Jbt3q0z0z2c1p07140G0V0H2Kbr3s0y0z2b1s011a0C0Y0G2Kbq3u0x0z2a2G0y110G2Jbp3w0w0y2a2J0t150F2Jbn3z0v0y1W010d2M0o180E2Kbl3A0v0y1W020b2R0h1c0E2Jbk3C0u0x1X020a2W0a1g0D2Jbi3G0r0y1W040830051f02030B2Kbg3I0q0y1W06054m04030d090c2Kbf3K0p0x1W4z04040a0c082Obb3N0o0x1W4K050f052Rb93P0n0x1V82b73R0l0x1W83b53U0j0x1W84b23X0i0x1V86b03Z0h0w1W87aX420g0w1V89aV450e0w1V8aaT480b0w1V8caR4b040B1V8daO4f010C1V8eaM4S1V8haJ4T1V8iaG4U1V8kaE4V1V8laC4W1V8maz4X1V8oax4Y1V8pav4Z1U8rau4Z0L0d0W8sas510C0m0U8vap550q0x0S8yam570h0G0P8Baj5a080O0O8Eaf690M8Gad6b0J8Ka96d0I8Na56g0F8Ra16i0E8U9Y6k0C8W9V6n0z909R6p0y929O6s0v959M6u0t989I6w0s9a9F6z0p9d9D6B0n9g9z6F0j9d04039v6I0h9b08019u6L0e9a9F6N0c999F6Q09999F6U06989G6W03999Fg99Eg99Fg99Ega9Dgb9Cgc9Cgd9Agd9Fg79z0109g39MfZ9QfV9UfQ9Zfs070da2eM030B0b08a5eK080x0f02a9eI0b0uareI0d0r7s032XeI0i0m7s062UeI0m0i7s092ReI0t0b7s0b2PeI0y057t0e2NeH0C027t0g2MeF4G033o0j2LeD4B083o0m2LeB4v0d3o0p2Ley4q0i3n0t2L0j02eb4k0n3n0v2M0c09e84h0q3n0w2P050d0z06dt4b0v3n0x370v0ads460A3n0y370t0cds410E3n0z370o0gds3W0J3m0C350j0ldt3R0O3l0D340f0pdu3M0T3i0G330a0udu3I0Z3f0I33040zdv3E133d0K31010Ddw3D143a0L3Gdx3C15380L3Gdy3D16350L3Hdz3C17320N3HdA3A1a2Z0N3HdC3z1b2W0P3HdD3y1c2U0Q3GdF3x1e2R0Q3HdF3x1f2P0R3GdH3w1g2M0T3FdJ30010u1i2J0T3GdK2Y030t1j2H0U3FdL2W060r1m2D0W3EdN2U090p1n2A0Y3EdO2R0d0n1p2x0Z3DdP2Q0h0j1s2t113CdR2N0m0c1x2r113CdT2L0q031E2o133BdV2I2b2l153zdW2J2b2i173ydY2I2d2e193ye02H2e2b1a3xe22G2f281c3we42F2h251d3ve62F2i211f0u022Ze82D2N111L0s042Xeb2B2N101M0r062Vec2B2N101M0o0b2Ted2A2O0Z1N0k0f2Ref2z2O0Y1Q0f0k2Oeg2z2O0Y1W060o2Neh2y2P0X2s2Kei2y2P0X2s2Jek2x2P0W2t2Ien2v2Q0V2t2Her2s2Q0V2s2Hev2p2Q0V2s2Gez2m2Q0U2s2FeE2j2R0T2s2EeH2g2S0T2s2CeM1E020x2S0S2t2BeP1A060v2S0S2t2AeT1w080u2T0R2t2AeW1o0f0r2U0Q2u2zf01e0p0o2V0P2u2yf4190u0l2W0N2v2yf7160y0h300F2z2xfa130F0a310F2z2wfe100L03320F2z2tfj0Y3Q0F2z2rfo0o010v3R0F2z2ofu0f070v3R0F2z2lfA040f0u3S0F2A2hfW0u3S0F2A0x011Gg00s3T0F2A0w041Bg30r3U0F2A0u081xg50r3U0F2A0t0b1sg90p3V0F2B0q0i1lgb0o3W0F2B0n0r1cge0n3X0F2B0l0u18gi0l3Y0F2C0d0B15gl0k3Z0F2C060J11go0j400F3r0Zgr0h410F3r0Wgu0f430F3s0v050igx0e440F3s0v0a0bgA0c450F3t0u0g02gD0a470F3t0tgX07490F3u0sgX064a0F3v0rgY034c0F3v0rld0F3w0ple0F3x0ole0F3y0nle0F3z0llf0F3A0klf0F3C0hlg0F3D0glg0F3E0flg0F3G0clh0F3H0blh0F3J09lh0F3K07hH013A0F3M05li0Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp90Fp80Gp80Hp60Ip60Jp40Kp30Mp20Np00Op00PoY0QoY0RoW0SoW0SoX0RoX0QoY0QoZ0PoZ0PoZ0Op10Np10Np10Mp30Lp40Jp60Hp80Fpa0Dpc0Bpe0zpf0yph0xpi0vpk0tpm0rpo0ops0kpx0fcJ"
   },
   {
      w: 1800,
      h: 372,
      ground_size: 1800,
      offset_x: 0,
      offset_y: 788,
      ground: "sN05sV0bsP0fsL0isI0msE0psB0rsz0tsy0usy0usx0vsw0wsv0xsv0xsu0yst0zss0Ass0Asr0Bsq0Csp0Ds4070e0DrX0i090ErV0o040FrV17rU18rT19rT19rS1arS1arR1brR1brQ1crQ1crP1drO1erN1frL1hrK1irJ1jrI1krH1lrC1trq1Er602071Pr123qV29qQ2eqL2kqG2oqD2rqB2tqy2wqv2zqs2Cqp2Fqm2Iqk2Kqh2Nqe2Qqb2Uq731q037pV3bpQ3fpM3kpH3opD3tpy3xpv3Apr3Fpm3Jpi3Npe3Sp93Wp63Zp243oR4foB4vom4Lod4Qob4To74Wo54Zo152nZ54nW58nT5anQ5enN5gnK5knH5mnE5qnB5snz5v0J02mK5D0p080109mH5K0h0mmD5T080qmA6umw6ymt6Amq6Dmo6Fml6Jmi6Lmf6Pmc6Rm96Tm86Vm56Ym36Zm36Zm271m072m072lZ74lX75lX75lW76lV78lU78lT79lS7blR7blQ7clP7elO7elK7ilH7llD7qlz7ulu7Clm7Jlg7Ql87Yl085kU8ckM8kkE8rky8ykq8Gkj8Mkc8Vk393jU9cjM9kjE9sjw9Bjm9Kje9Sj6a0iYa9iPahiGaqiyayiqaGiiaPi8aYi0b6hSbe3g07enbn370gedbx2Y0pe3bH2Q0xdTbR2H0GbI0j1Ic12y0Obm0K1ucb2k0YaK1v1fcl0H071g1b4M0A5k1H0c070Hcv0B0a171j4K0C5h1M070b0AcF0u0e131m4J0C5g1N050e0ucP0o0f111q4H0C5e1Q040f0ocZ0i0h0Y1t3x04150C1603431T020h0id90d0i0V1w3u07140C14073Z1V010i0ddj080i0T1z3s09130C13093X2f08dt020k0P1E3q0a120C120a3V2i02dU0C1S3o0b120C120b3Sgg0n283n0c110C110c3Qgi0c2l3k0d050R050C050R050d3Ogi072u3h0e020V030C030V020e3MiX3f0e020V030C030V020e3Kj23c0e020V030C030V020f3Ij5390f020V030C030V020f3Gja36363Eje34363Cjj31363Ajn2Z363yjs2W363wjx2T363tjC2R363rjH2O363pjL2M363njQ2J363kjW2G363ik12D363gk52B363eka2y363bkg2u3838kl2q3a35kp2n3c32ku2k3c30kz2g3e2Y9R04aH2d3g2W9P0aaF1X040a3i0a042G9M0gaF0A041f08073k07081f041k9K0maD0w0a1b0a053m050a1b0a189Q0saC0t0c190b053n040b190c0X9X0xaC0q0e180c033o030c180e0Ma40DaA0o0g160d023q020d160g0Bab0Jaz0l0i150d013s010d150i0qai0OaE0e0i153U150i0ear0Wb6143V14aT10b5143W14aQ13bg0T3W0TaX17bv0E3W0Eb91abJ0q3W0qbl1cc6033W03bJ1brR1brR1brR1brS1arS1arS1arR1brR1brQ1crQ1crP1dry040b1frw08081grw1wrv1xrs1Aro1Erl1Hri1Krf1Nrd1Prd1Prd1Prd1P1f01pI010b1S130408040H01oc010H04081V110905070f010n06o4060n010f07051Y0Z0r0b050j0anW0a0j050b2e0X0w08070g0fnO0f0g08072h0V0B04080g0jnG0j0g08042k0U0P0e0nnA0n0e2x0S0S0c0onA0p0b2y0Q0W080qnA0q082A0O1wnA380N1wnC370L1ynC370J1AnC370I1BnC370G1DnC370E1Hny390C1Ono3e0B1Une3j0z21n43p0w28mU3D0m2emK3R0b2lmA6xmq6Hmg6Rm671lW7blM7llC7slv7xlq7Dlk7Jle7Ol97Ul380kX86kS8akc040x8f1c06iO0a0s8l1a0ciE0f0n8r180jis0l0i8w170pii0q0d8C160vi70w078I140BhW9s120HhM9z0Z0OhA9F0Y0Whm9N0W14h99U0V1agWa20T1igIaa0R1pgwah0P1xgiaq0M1Fg4aB0I1Hg0aH0D1Ig0aL0x1Kg0aO0t1M0i05fBaQ0q1O0h0dfuaR0o1Q0g0lflaT0l1T0d0wfbaW0i1V0b0Ff2b00e1Y080OeH0308b40a34eybi063feobl023peeeWe5f6dVfgdLfsdyfFdjfUd4g9cPgncBgCclgTc5hdbLhwbshQ8i0d2Cib7M0u2xiu7i0K2siO6M112niS0j0i5A0i0j122hiX0j0J4I0J0j132cj10j173W180i1427j60h183W180h1622jb0f193W190g171Yje0e1a3W1a0e191Vjh0c1c3V1b0c1c1Qjm091d3U1d091f1Mjs021h3U1h021j1IkO3U2D1FkR3S2F1BkU0b013u010b2G1xkY0a023s03092I1vl007053q05072K1sl403083o08032N1qlh3m301olj3k321mll3i341jlo3g361hlq3e381fls3c3a1dlu3a3c1blw383e18lz363h15lA363i13lB363j11lC363k0ZlD363l0WlF363m0UlG363n0SlH363o0QlI363p0NlK363q0LlL363r0JlM363s0HlO0e020V030C030V020f3t0FlP0e020V030C030V020e3v0ClR0e020V030C030V020e3w0AlS0e020V030C040U020e3x0ylT0d110C110d3y0wlV0c110C110c3B0tlW0b120C120b3C0qlZ0a120C120a3E0om009130C13093F0mm306140C14063I0km503160C16033K0hng0C4U0fnh0C4V0dni0C4W0bnk0A4Y09sU06sX049z"
   },
   {
      w: 2E3,
      h: 461,
      ground_size: 2E3,
      offset_x: 0,
      offset_y: 1539,
      ground: "0002we06wa09w70dw30hvZ0kvW0ovS0svO0wvK0BvF0Gvy0Nvo0Xvd19v21juS1tuI1Dux1O4P03kC044O204z0hkv0h4z2b4r0nkn0n4r2m4l0skf0s4k2y4e0yk50y4e2J470CjZ0C472U400GjV0F41353T0JjR0J3T3h3M0MjN0M3M3r3H0PjJ0P3G3B3B0SjF0S3B3K3v0VjB0V3v3T3q0Xjz0X3p433k0Zjx0Z3k4c3e11jv113e4l3913jt123a4u3414jr14344E2Y16jp162Y4N2T17jp172S4X2N19jn192N562H1ajn1a2H5g2B1bjn1a2C5p2w1djl1d2w5y2p1fjl1e2q5I2j1gjl1g2j5S2c1jjj1j2c63251kjj1k246i1V1mjj1m1V6w1K1qjj1q1K6K1y1vjj1v1y701l1zji1A1l7o0T1Njh1N0TajjhcZjhcZjhcZjhd0jfd1jfd1jfd1jfd1jfd2jdd3jdd3jdd3jcd5jbd5jbd5jbd6j9d7j9d7j9d7j8d9j7d9j7d9j6dbj5dbj5dbj5dcj3dej1dfj1dgiZdhiZdiiXdkiVdliVdmiTdniSdpiRdqiPdriPdsiNdtiMdviLdwiJdxiIdziGdBiEdDiCdFiAdHiydJiwdLiudNisdQipdSindUildWijdYihe0ife2ide4ibe6i9e8i7ebi3eei1ehhXekhVenhReqhPethLewhJezhFeChDeFhzeIhweMhteOhqeShneVhjeZhff3hbf7h6fdh1fhgXflgTfpgPftgKfz3X0b8p0b3XfD3S0h8j0h3SfH3O0m8d0m3OfL3L0q870q3LfQ3H0u810u3HfW3D0x7X0x3Dg33y0z7V0z3ygb3s0D7R0C3tgi3o0G7N0G3ngq3j0I7L0I3jgx3e0K7J0K3egF390L7I0M39gM350N7H0N34gV2Z0P7F0P2Zh42T0Q7E0R2The2N0R7E0S2Nhn2H0U7D0U2Ghx2B0V7D0V2BhG2u0X7D0X2uhP2p0Y7D0Y2phX2j107D102ji42f117D112fib29137D1329ii24157D1523iq1X187D181Xix1Q1b7D1a1RiE1L1d7D1d1LiL1E1g7D1g1EiT1x1j7D1i1yj11r1l7D1l1rj91j1p7D1p1jjh1b1t7D1t1bjp121y7D1y12jx0U1C7D1C0UjJ0H1H7D1H0Hk10m1S7D1S0mmp7DoD7CoF7BoF7BoF7BoF7BoF7AoH7zoH7zoH7zoH7zoH7yoJ7xoJ7xoJ7xoJ7xoJ7woL7voM7toN7toO7roP7qoR7poS7noT7moV7loW7joX7ioZ7hp07fp17ep37dp47bp57bp679p877pa75pc73pe71pg6Zpi3v013rpk3u013qpm3s023ppo3r033npq3q033mps3o043kpv3n053ipy3l053hpA3j073fpC3h083epE3g093cpG3e0b3apI3d0b38pM3a0d36pO390d35pQ370e34pT350e32pW340e31pY330e30q1320d2Yq4310d0N0228q6300d0N0227q82d010M0c0M0325qc2c010L0c0L0424qe2b020K0c0K0523qh29030J0c0J0621ql27040I0c0I0620qp26040H0c0H071Yqt24050G0c0H071Wqw23060F0c0D0b1UqA21070D0d0C0c1TqD1Z090B0e0A0c1SqH1Y090z0f0z0d1QqL1W0a0y0g0x0e1OqP1U0b0d0c070h030c0i0e1MqT1R0d060l040C0b0f1KqX1P1q050f1Ir11N1K1Gr51K1M1Dr91E1Q1Brd1z1T1zrh1u1Z1url1q221rrp1n251mrv1i291irz1e2d1erO102f0Zs50V2j0Usa0R2n0Rsd0N2r0Nsg0K2v0Ksj0G2z0Gsn0C2D0Csr0y2H0ysw0t2L0tsD0n2P0nsK0h2U0i+bHL03wb09sF083j0dsz0c3g0jsr0i2l0k0y0nsl0m0y0l1g0v0x0rsf0q0x0w0Z0B0v0ws90v0v0C0N0G0v0As30z0u0I0B0L0v0ErX0D0u0J0s0R0u0JrR0I0t0I0n0V0u0NrL0M0t0H0l0W0u0QrH0O0u0G0j0X0v0SrC0S0u0F0g0Z0u0Xrx0W0t0E0e100k1ars190k0D0c110k1ern1c0k0C09130j1irj1g0j0B07140j1lrf1j0j0A05160h1ord1m0h0A02180h1rr91p0h1I0g1vr51t0g1H0f1xr31v0f1G0e1BqZ1z0e1F0d1DqX1B0d1E0d1GqT1E0d1D0c1IqR1G0c1D0a1LqP1J0b1B0a1NqN1L0a1B091OqN1M091B081PqN1N081B071PqP1N071B051QqR1O051B041NqZ1L041C021Lr51J023pr758r956rb53re52rf50rg50rh4Y0G03pQ030G4Y0G06pL050H4X0G09pF080H4X0H0cpx0c0H4X0H0eps0f0H4X0H0hpm0h0I4X0I0jph0j0I4Y0H0mpb0m0H4Z0H0pp50p0H4Z0H0soZ0s0H500G0voT0u0H510G0yoN0y0G520F0BoH0B0F540E0EoB0E0E550E0Gow0H0D570C0Kor0J0C590B0Mon0M0B590A0Poi0Q0z5a0z0Tod0S0z5a0z0Vo90V0y5a0y0Yo40Z0y590x12nZ120x590x14nV140x590v19nP190v580u1dnL1d0u570q1jnH1j0q570o1onB1o0o570n1rnx1r0n560o1tnt1t0o550n1wnp1w0n550n1ynl1y0n550m1Ani1A0n540n1Cnf1C0m540m1Fnb1E0n530m1Gn91G0m530m1In51I0m530l1Kn21L0l530l1MmZ1M0l520l1PmV1P0l510l1QmT1Q0l510k1TmP1T0k510k1UmM1V0k510j1XmJ1X0j500k1ZmF1Z0j500j21mD210j4Z0j23mz230j4Z0i25mx240j4Z0i26mu270i4Z0h29mr280i4Z0h2amp2a0h4Y0i2bmn2b0h4Y0h2dml2d0g4Y0h2emj2e0g4Y0g2hmf2h0g4X0g2imd2i0g4X0f2kmb2k0f4X0f2lm92l0f4X0e2nm72m0f4X0e2om42p0e4X0e2qm12q0e4X0d2slZ2s0d4X0d2tlX2t0d4X0c2vlV2v0c4X0c2wlT2w0c4X0b2ylQ2y0b4Z0a2zlO2A0a4Z0a2AlM2B0a4Z092ClL2C094Z092DlJ2D094Z082FlH2E094Z082GlF2G084Z082HlD2H084Z072JlB2J074Z072Klz2K0651052Mlx2L0651052Nlv2N0551052Olt2O0551042Qlr2Q0353032Rlp2R0353022Tln2T0253022Ull2U0181ljaYlhb0lfb1leb3ldb4lbb6l9b7l8b9l7bal5bcl3bdl2bfl1bgkZbikXbjkWblkVbmkTbokRbpkQbrkPbskNbukLbvkKbxkJbykHbzkHbAkFbCkDbDkDbEkBbFkBbGkzbHkybJkxbKkvbLkvbMktbNktbOkrbPkqbRkpbSknbTknbUklbVkkbXkjbYkhbZkh5G"
   },
   {
      w: 1649,
      h: 396,
      ground_size: 1800,
      offset_x: 80,
      offset_y: 1384,
      ground: "0w0P1Y0Pin0P1Y0P0Z0R1W0Ril0R1W0R0Y0S1U0Sik0S1V0S0X0T1U0Sik0T1U0S0X0T1U0Tij0T1T0T0X0U1S0Uij0T1T0U0W0U1S0Uij0U1S0U0W0U1S0Uii0V1R0V0V0W1Q0Vii0W1Q0V0V0W1Q0Wih0W1Q0V0V0W1P0Xih0W1P0X0U0X1O0Xih0X1O0X0U0X1O0Xig0Y1N0Y0T0Z1M0Yig0Y1N0Y0T0Z1M0Zif0Z1M0Y0T0Z1M0Zif0Z1L100S101K10if0Z1L100S101K10ie111K100R111K10ie111J110R121I12id121I110R121I12id121I120Q121H13id121H130Q131G13ic141G130P141G13ic141G130P151E15ib141F140P151E15ib151E150O151E15ib151D160J3Xi23X0D41hY400B43hW420A43hW420A43hW430z43hW430z43hW430z43hV440y44hV440y45hU440y45hU450x45hU450x45hU450x45hT460w46hT460x45hU450z41hY410D3Xi13X0G3Xi13X0G3Xi13X0G3Xi03Z0F3YhY410D3ZhY410D3ZhX420D3ZhX420C41hW430B41hW430B411p0a1J09b20a1I0a1r430A431f0k1H0kaJ0k1G0k1i440z43150u1G0uaq0u1G0u18440z430Z0B1F0Bac0B1F0C11440y450W0D1E0Ea80E1E0E0Y460x450V0E1E0Fa60F1E0E0Y460w470T0G1D0Fa60F1E0F0X460w470T0G1D0Fa60F1D0G0X470v470T0G1D0Fa60G1C0G0X470u490S0G1C0Ga60G1C0G0W480u490S0G1C0Ga60G1C0G0W490t490S0H1B0Ga60G1C0G0W490s4b0R0H1B0Ga60H1A0H0V4a0s4b0R0H1A0Ha60H1A0H0V4b0r4b0R0H1A0Ha60H1A0H0U4c0q4d0Q0I1z0Ha60H1A0H0U4c0q4d0Q0I1z0Ha60I1y0I0U4d0p4d0Q0I0r0G0r0Ia60I0r0G0r0I0T4e0o4f0P0I0h110g0Ia60I0g110h0I0T4e0o4f0P0J091f080Ja60J091e090J0T4f0n4f0P2Ya62Y0S4g0m4h0O2Ya62Y0S4h0l4h0O2Ya62Y0S4h0l4h0O2Ya62Y0R4i0k4j0N2Ya62Y0R4j0j4j0N2Ya62Y0R4j0j4j0O2Xa62Y0Q4k0i4l0N2Xa62Y0Q4l0h4l0N2Xa62Y0Q4l0g4n0M2Xa62Y0P4m0b4x0H2Xa62Y0J4y034B0F2Xa62Y0I9e0D2Ya62Y0H9f0D2Ya62Y0H9f0D2Za52Y0H9f0D2Za42Z0H9f0D2Za4300G9f0C30a4300G9f0C31a3300G9f0C31a2310G9f0C31a2320F9f0B32a2320F9f0B33a1320F9f0B33a0330F9f0B33a0340E9f0A34a0340E4C014B0B359Z340F4B024z0C359Y350G4z044x0D354d1r4k360G4w074v0D363S283Y360H4u094t0E373C2E3H360I4s0b4r0F373p343t380I4q0d4p0F383d3u3f380J4o0g4l0H38303U32380K4m0i4j0I392P4e2S380L4k0k4h0J392G4w2I3a0L4i0m4f0J3a2x4P2y3a0M4g0o4d0K3a2n592o3a0N4e0q4b0L3b2d5s2e3a0O4c0s490M3b255H263c0P490u470M3c1Y5V1Z3c0Q470w450N3c1R6a1R3c0R450y430O3d1J6o1K3c0S430A410P3d1C6C1C3e0S410C3Z0P3e1v6Q1v3e0T3Z0E3X0Q3e1o751n3e0U3X0G3V0R3f1g7h1i3e0V3V0I3T0S3f1b7r1c3g0V3T0K3R0S3g167C163g0W3R0M3P0T3g107N113g0X3P0O3N0U3h0U7X0W3g0Y3N0Q3L0V3h0P870Q3h0Z3L0S3J0W3h0K8i0K3i0Z3J0U3H0W3i0E8t0F3i103H0W3F0X3j0y8D0A3i113E0Z3D0Y3j0t8M0v3j123D0Z3D0Y3j0q8S0s3k113D0Z3D0X3k0m900o3k113D0Z3D0X3k0i980k3k113D0Z3D0X3l0e9e0g3l113D0Z3D0X3l0a9m0c3m103D0Z3D0W3m069u083m103D0Z3D0W3m039A053m103D0Z3D0Wgq103D0Z3D0Wgq103D0Z3D0Wgr0Z3D0Z3D0Vgs0Z3D0Z3D0Vgs0Z3D0Z3D0Vgs0Z3D0Z3D0Vgt0Y3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Ugv0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Tgw0X3D0Z3D0Ugu0Y3D0Z3D0Ugu0Y3D0Z3D0Vgt0Y3D0Z3D0Vgs0Z3D0Z3D0Wgq103D0Z3D0Xgp103D0Z3D0Xgo113D0Z3D0Ygm123D0Z3D0Zgl123D0Z3D0Zgk133D0Z3D10gi143D0Z3D11gg153D0Z3D12gf153D0Z3D13gd163D0Z3D13gc173D0Z3D14ga183D0Z3D15g8193D0Z3D16g61a3D0Z3D17g41b3D0Z3D17g41b3D0Z3D17g31c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g41c3D0Z3D16g51b3D0Z3D16g51b3D0Z3D15g61b3D0Z3D15g61b3D0Z3D15g61b3D0Z3D15g61b3D0Z3D15g71a3D0Z3D13gb183D0Z3D12gc183D0Z3D12gc183D0Z3D12gc183D0Z3D12gc183D0Z3D14g81a3D0Z3D15g51c3D0Z3D15g51c3D0Z3D15g51c3D0Z3D156C0f2n0f6C1c3D0Z3D156z0k2j0k6z1c3D0Z3D146w0q2f0q6v1c3D0Z3D156r0v2d0v6r1c3D0Z3D156o0z2b0z6o1c3D0Z3D156k0E290E6k1c3D0Z3D156h0I270I6h1c3D0Z3D156f0L250L6f1c3D0Z3D156c0P230O6d1c3D0V3L116a0S210S6a183K0R3N10680U210U68173N0P3N10650Y1Z0Y65163O0P3N1063111X1163163O0P3N1061131X1360173O0P3N115X171V175X173O0P3N115V1a1T1a5V173O0P3N115T1c1T1c5T173O0P3N115R1f1R1f5Q183O0P3N125O1h1R1h5O183O0P3N125M1k1P1k5M183O0P3N125K1m1P1m5K183O0P3N125I1p1N1p5H193O0P3N135F1r1N1r5F193O0P3N135D1u1L1u5D193O0P3N135B1w1L1v5C193O0P3N135A1y1J1y5A193O0P3N135y1A1J1A5x1a3O0P3N145v1D1H1D5v1a3O0P3N145t1F1H1F5t1a3O0P3N145r1I1F1I5r1a3O0P3N145p1K1F1K5o1b3O0P3N155m1N1D1N5m1b3O0P3N155l1O1D1O5l1b3O0P3N155j1Q1D1Q5j1b3O0P3N155h1T1B1T5h1b3O0P3N155g1U1B1U5f1c3O0P3N165d1W1A1X5d1c3O0P3N165c1Y1z1Y5c1c3O0P3N165a201z205a1c3O0P3N1659221x22581d3O0P3N1657241x24561d3O0P3N1754261x26541d3O0P3N1753281v28531d3O0P3N17512a1v2a511d3O0P3N17502b1v2b501d3O0P3N174Y2e1t2e4Y1d3O0P3N174W2g1t2g4W1d3O0P3N174V2h1t2h4V1d3O0P3N174T2j1t2j4T1d3O0P3N174S2l1r2l4S1e3N0Q3L184Q2n1r2n4Q1f3K0U3H1a4P2o1r2o4O1h3I0W3F1b4N2r1p2r4M1j3F0Y3D1c4M2s1p2s4L1k3D103B1d4K2u1p2t4L1k3A143x1f4J2v1p2v4J1l3y163v1g4I2w1p2w4I1n3v183t1h4G2z1n2z4G1o3t1a3r1i4F2A1n2A4F1p3q1e3n1k4E2B1n2B4E1q3o1g3l1k4D2D1n2D4C1s3l1i3j1l4C2F1l2F4B1t3j1k3h1m4B2G1l2G4A1u3g1o3e1n4z2I1l2I4y1w3d1p3e1b4K2J1l2J4I1l3d1p3e1a4J2L1l2L4H1k3d1o3f194J2M1l2M4H1i3f1n3f194I2O1j2O4G1i3f1n3f194G2Q1j2Q4E1i3f1n3f194F2R1j2R4D1i3f1n3f194E2S1j2S4C1i3f1n3f194C2U1j2U4A1i3f1n3f194B2V1j2V4z1i3f1n3f194A2W1j2W4y1i3f1n3f194y2Y1j2Y4w1i3f1n3f194x2Z1j2Z4v1i3f1n3f194w301j304u1i3f1n3f194v311j314t1i3f1n3f194u321j324s1i3f1n3f194s341j344q1i3f1n3f194r351j354p1i3f1n3f194q361j364o1i3f1n3f194p371j374n1i3f1n3f194o381j384m1i3f1n3f194n391j394l1i3f1n3f194l3b1j3b4j1i3f1n3f194k7H4i1i3f1n3f194j7J4h1i3f1n3f194i7L4g1i3f1n3f194h7N4f1i3f1n3f194f7R4d1i3f1n3f194e7T4c1i3f1n3f194d7V4b1i3f1n3f194c7X4a1i3f1n3f194b7Z491i3f1n3f194a81481i3f1n3f194885461i3f1n3f194787451i3f1n3f194689441i3f1n3f19458b431i3f1n3f19448d421i3f1n3f19438f411i3f1n3f19428h401i3f1n3f19418j3Z1i3f1n3f1a3Z8l3Y1i3f1o3d1c3X8n3W1k3d1q3b1e3V8p3U1m3b1t381g3T8r3S1o391v361i3R8t3Q1q371x341k3P8v3O1s351z321m3N8x3M1v321B301o3L8z3K1x2Z1E2Y1q3J8B3I1z2X1G2W1s3H8D3F1C2V1I2T1v3F8F3D1E2T1K2R1x3D8H3B1G2R1M2P1z3B8J3z1I2P1O2N1B3z8L3x1K2N1Q2M1C3x8N3w1L2L1R2M1C3w8P3v1L2L1R2M1C3v8R3u1L2L1R2M1C3u8T3t1L2L1R2M1C3t8V3s1L2L1R2M1C3s8X3r1L2L1R2M1C3r8Z3q1L2L1R2M1C3r8Z3q1L2L1R2M1C3q913p1L2L1R2M1C3p933o1L2L1R2M1C3o953n1L2L1R2M1C3n973m1L2L1R2M1C3n973m1L2L1R2M1C3m993l1L2L1R2M1C3l9b3k1L2L1R2M1C3k9d3j1L2L1R2M1C3j9f3i1L2L1R2M1C3i9g3i1L2L1R2M1C3i9h3h1L2L1R2M1C3h9j3g1L2L1R2M1C3g9l3f1L2L1R2M1C3f9n3e1L2L1R2M1C3e9o3e1L2L1R2M1C3e9p3d1L2L1R2M1C3d9r3c1L2L1R2M1C3c9t3b1L2L1R2M1C3b9v3a1L2L1R2M1C3a9x391L2L1R2M1C3a9x391L2L1R2M1C399z381L2L1R2M1C389B371L2L1R2M1C379D361L2L1R2M1C369F351L2L1R2M1C369F351L2L1R2M1C359H341L2L1R2M1C349J331L2L1R2M1C349J331L2L1R2M1C339L321L2L1R2M1C339L321L2L1R2M1C329N311L2L1R2M1C319P301L2L1R2M1C319P301L2L1R2M1C309R2Z1L2L1R2M1C309R2Z1L2L1R2M1C2Z9T2Y1L2L1R2M1C2Y9V2X1L2L1R2M1C2Y9V2X1L2L1R2M1C2X9X2W1L2L1R2M1C2X9X2W1L2L1R2M1C2W9Z2V1L2L1R2M1C2Va02V1L2L1R2M1C2Va12U1L2L1R2M1C2Ua32T1L2L1R2M1C2Ua32T1L2L1R2M1C2Ta52S1L2L1R2M1C2Sa62S1L2L1R2M1C2Sa72R1L2L1R2M1C2Ra92Q1L2L1R2M1C2Ra92Q1L2L1R2M1C2Qab2P1L2L1R2M1C2Qab2P1L2L1R2M1C2Pad2O1L2L1R2M1C2Pad2O1L2L1R2M1C2Oaf2N1L2L1R2M1C2Oaf2N1L2L1R2M1C2Oaf2N1L2L1R2M1C2Nah2M1L2L1R2M1C2Nah2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L1R2M1C2Mai2M1L2L0V"
   },
   {
      w: 1429,
      h: 391,
      ground_size: 1600,
      offset_x: 76,
      offset_y: 1037,
      ground: "lU0smv0Dml0Lme0Sm80Xm312lY17lT1blQ1flL1jlI1mlF1qlB1tlz1vlw1ylt1Blr1Dlo1Fln1Hlk1Kli1Mlg1Nlf1Plc1Sla1T0M0ek91V0H0mk41X0E0rk01Y0C0vjX1Z0A0zjU210y0BjS220w0FjP240u0IjM250s0LjK270q0NjI280p0QjG280o0SjE2a0m0UjC2b0l0WjA2d0j0Yjy2e0i11jv2f0i12ju2f0h14js2h0f16jq2i0e18jo2j0e19jn2j0d1bjl2l0b1djj2m0b1eji2m0a1gjg2n091ije2o091ijd2p081kjc2p081lja2q071nj82r071oj62s061qj52s061rj32t051tj12u051uj02u051viY2v041xiW2w041yiV2w031AiT2x031CiQ2y031DiO2z021FiN2z021GiL2z031HiJ2A031IiI2A021KiG2A031MiD2B031NiB2C031OiA2B031Qiy2B041Siv2C041Tis2D051Vip2D061Wim2E071Y2m0cfK2G071Z2g0mfD2J06212a0sfz2L0622250yfu2O0624200Dfq2Q06261V0Hfm2T06271R0Mfh2W06291M0Qfc30062b1H0U420eaS33062d1D0X3T0vaF37062f1y103P0Eaw3b062h1t143K0Nam3g072j1n183G0Vac3l072l1j1a3D123I0D5I3q072o1d1e3z193t184o0o0v3x082q171i3w1f3i1r474v082t101m3u1l391C3Y4y092v0U1q3r1r311M3Q4z0a2A0K1v3p1w2U1U3K4B0b2E0A1B3m1C2O203E4D0c2K0l1J3k1I2H273z4E0c4O3i1N2C2d3t4F0f4N3f1T2w2j3o4G0g4M3e1X2r2p3j4H0h4L3c232m2u3e4H0k4J3a282h2A394I0m4I382d2c2F344J0p4F362i282K2Z4J0q4F352m242P2U4K0q4F332r202U2P4L0q4F312w1W2Z2L4K0s4E302z1T342G4L0s4F2X2E1P382C4M0s4F2W2H1M3d2y4L0t4F2U2M1J3g2u4M0t4F2T2P1G3l2q4M0t4F2R2T1E3p2l4M0u4F2Q2X1A3t2i4M0v4E2O311y3x2d4M0w4E2N341v3B2a4M0w4E2L371u3F254N0w4E2K3a1r3J224M0x4E2I3e1p3N1Y4M0x4E2H3h1n3R060x1g4M0z4D2F3k1l4z1c4M0z4C2E3o1j4D184L0A4C2D3q1i4G154L0A4C0E0b1M3t1h4J114M0A4C0B0i1G3x1e4M0Z4L0C4B0z0n1C3z1d4O0X4L0C4B0y0r1x3C1c4P0W4K0D4A0x0v1t3F1b4R0U4K0D4A0w0y1p3J194S0T4J0E4A0v0B1l3M184U0R4J0F4z0u0F1g3P174V0Q4I0G4y0u0I1c3R174W0P4I0G4y0u0K183U164Y0N4I0G4x0u0O123Y154Z0M4H0H4x0t0S0W4214500L4H0I4w0t0V0R4513510K4G0J4v0t0Z0L4912520J4G0J4v0s130E4d12520K4E0K4u0t170w4i11530J4E0L4t0s1e0k4p10540I4E0L4s0t5X10550I4C0M4s0s5Z0Z550I4C0M4r0t5Z10550H4C0N4p0u600Z560H4A0O4o0u610Z570H4z0O4o0u610Z570H4y0P4n0u630Y580H4x0Q4l0v630Z570I4w0Q4k0w630Z580I4v0Q4j0w650Y580J4t0R4i0x650Z580K4r0S4g0y650Z580K4r0S4f0y660Z580K4q0T4e0z6610580J4q0T4c0B6610580J4q0U4a0C6611570I4q0V480D6711580H4q0V470E6712570H4q0V460F6712570H4p0X450F6713560H4p0X440G6713570G4p0X440F6814560F4q0X430G6815550F4p0Z420G6815550F4p0Z410H6816540F4p0Z410H6817530F4o113Z0I6818530E4o113Z0I671a520E4o113Y0I681b510E4n133X0I681d4Z0E4n133W0J671f4Y0E4n133W0J671h4W0E4n133V0K671i4V0E4m153U0K661j4V0E4m153T0L661i4W0E4m153T0L661i4W0E4l173R0M651j4W0E4l173R0M651j4W0E4l173R0M641j4X0E4k193P0N641j4X0E4k193P0N631k4X0F4i1a3O0O631k4X0F4i1b3N0O621k4Y0F4i1b3M0Q601l4Y0F4h1c3M0Q601l4Y0F4h1d3K0R5Z1m4X0G4h1d3K0R5Y1m4Y0H4f1e3K0R5X1n4Y0H4f1f3I0S5W1o4X0I4e1g3I0S5W1o4X0J4d1g3H0U5T1p4X0K4d1h3G0U5S1q4W0L4c1i3F0V5R1r4W0M4b1i3F0W5P1s4V0N4a1k3D0X5N1t4V0P481l3D0X5L1v4U0Q481l3D0X5I1y4U0R461n3B0Z5G1y4V0R461n3B0Z5G1y4V0S441p3z115F1y4W0S421q3z115E1z4W0T401r3y135D1y4X0T3Z1t3x145C1y4Y0T3X1u3w155C1y4Y0U3V1v3w165B1x4Z0V3R1z3u185A1x4Z0W3J1G3u195y1y500W3H1I3s1b5x1y500X3G1I3s1c5w1y500Y3E1J3r1e5v1x510Z3C1L3q1g5t1x51103A1M3p1j5q1y52103y1N3p1m5n1y52113w1P3n1n5n1y52123t1R3n1n5n1y52133r1T3l1o5m1z52143p1U3l1o5m1z52153m1X3j1p5m1y53163k1Y3j1p5m1y53173h203i1q5l1z53173f233h1q5l1A52183d243g1r5l1A52193a273e1s5l1A521a38283e1s5k1B521b36293d1t5k1B521b342c3c1t5k1B521c322d3b1u5j1C511e302f3a1v5i1C511e2Z2g391w5i1D501f2X2i381w5h1E501g2V2j371x5h1E501g2U2l361x5h1E4Z1i2S2m351y5g1F4Z1i2R2o341z5f1G4Y1j2P2p331A5f1G4Y1k2N2r321A5e1H4X1l1X070I2s311B5e1I4W1m1T0c0F2u301C5d1I4W1m1R0g0C2v301C5c1K4V1n1P0j0z2x2Y1D5c1K4U1p1N0m0w2y2Y1D5c1K4U1p1M0p0t2A2W1F5a1M4T1q1K0r0q2D2V1F5a1M4T1q1J0u0n2E2U1G5a1N4R1s1H0y0i2H2T1G591O4R1t1F0B0e2K2R1I581P4Q1t1E0E0a2N2Q1I581P4Q1u1D3C2O1J571R4O1w1B3H02012H1K561R4O1x1z3N2F1K551T4N1y0f031f3O2E1L551T4N1z0b071e3P2D1L551U4L1B080c1a3R27010t1N531W4K1E020g183S26030s1N531W4K1X173T24050q1O531X4J1Y153U23080o1P511Y4J1Z143V210a0m1Q511Z4H21123W1Z0c0m1Q50204H22103Y1X0e0k1S4Z214G230Z3Y1V0h0i1T4Z224F240X401U0j0g1T4Y234E260V421S0l0e1V4X244D260V421R0n0d1V4X244D270T441P0p0a1X4W264C280R451O0s071Z4V274A2a0Q461M0w02214U284A2a0P471L2A4U294z2b0N491K2B4S2a4z2c0M491J2C4S2b4y2d0K4b1H2E4R2c4w2e0J4d1F2F4Q2d4w2f0H4e1F2F4Q2e4v2g0G4f1D2H4O2f4v2h0E4g1C2I4O2g4t2i0D4i1B2J4M2i4s2j0B4k1z2K4M2i4s2k0z4m1x2M4K2k4q2m0x4o0v080T2M4K2k4q2n0v4p0s0e0P2O0t06492m4p2o0t4r0q0g0O2P0p0a482m4o2q0r4t0n0j0M2Q0o0d452o4n2r0p4v0l0l0K2S0l0g432p4n2s0n4x0j0n0J2T0j0j412q4l2u0l4z0h0o0I2U0i0l3Z2r4l2v0j4B0e0r0H2V0g0n3Y2s4k2w0h4E0b0t0F2X0d0q3W2u4i2y0f4G080w0D300a0s3U2v4i2z0d5l0C32070v3T2w4h2A0b5n0B3F3R2x4g2C095o0A3G3Q2z4e2D085q0y3I3P2z4e2E065s0w3K3N2B4c2H035u0u3M3L2C4b8g0s3O3J2E488j0q3P3J2E468m0o3R3H2G428q0m3T3F2H3Z8u0k3V3D2J3X8x0h3W3C2K3X8z0e3Y3A2M3V8C0b403z2N3U8F07413y2O3T8I04433w2Q3ScQ3t2T3QcS3r2V3PcS3q2X3NcU3o303KcW3k343IcX3g393HcY3f3b3Dd13d3d3Bd23d3e3yd53b3g3ud93a3h3rdc0F042p3j3ode0D082m3l3mdg0A0b2l3m3jdj0y0d2j3o3hdl0w0g2h3p3gdm0u0i2f3r3edo0r0l2d3t3ddp0p0n2c3u3bdr0n0q293w3ads0k0u273y37du0i0x1p020D3A35dw0g0F02020l010Q050B3D33dx0d0L0l030M080j010f3G30dA090O0j050K090i030e3M2Uex0j060H0c0g040d3O2Sez0h080F0f0d060b3Q2ReA0f0b0B0i0a09093S2PeC0c0e0y0m070c053U2PeE090h0u0q024f28060zeG070j0q4L26090xeH060l0m4O240b0veJ040o0g4S230d0tff094X210g0rkm1Z0i0pko1X0k0nkq1W0l0lks1U0o0iku1S0q0hkv1R0r0fkw0t0a1d0u0bkz0q0f190y06kD0m0j17li0j0n14ll0f0r12ln0a0v10lq030C0Xm80Vm80Uma0Tmb0Rmd0Pme0Pmf0Nmh0Mmh0Lmi0Lmj0Jmk0Imm0Hmm0Gmo0Fmo0Emq0Dmq0Cms0Amt0Amu0ymv0ymw0wmx0vmz0umz0tmB0smB0rmD0pmE0pmF0nmH0lmI0kmK0imM0gmO0emQ0cmT097S"
   },
   {
      w: 1345,
      h: 425,
      ground_size: 1800,
      offset_x: 231,
      offset_y: 922,
      ground: "aO03lB08lx0dlr0jlm0njU0O0z0t0z0Pig1404070703080z080505060514hX1d01090308040D0508021nhK1u010T011Ehy4eho4phd4zh34IgW4OgQ4UgL4Zgw0405550504gi0801580208g904025tg65C0205fX5Mfq6MeF7gej7xe37LdR7VdG87dv8gdn8pde3I034Nd43M0507030F0407033NcW3O0j0A0k3OcO3M0s0v0r3NcG3P0v0q0v3Qcy3T0y0k0z3Scs3V0B0g0C3Ucn3W0F0b0F3Wci3X0J050J3Xcf3X1y3Ycd3X1A3Zc93Y1D3YbX04063Y1F3YbV07033X1J3XbT09013W1N3W0204bL2u031y1R1y032rbC05012a030a0303061u1W1v0604030a0128bA2g05080e1r211r0f0803280205bs2f07050i1m261n0i06052fbr2f0v1j2b1j0v2ebq2f0x1e2i1f0x2ebo2f0B182o190B2eb82t0E132v130E2taN2x0H0X2C0X0I2xaD2B0L0P2M0P0M2Bat2E0U0B310B0T2Fak2H622Jaa2L652La22O682N9U2Q6b2Q9N2R6f2R9F2U6j2T9y2V6n2U9s2V6s2W9m2V6w2X9f2X6B2X992Y6F2X942Y6K2Y8Z2Y6P2Y8T1x0107041g6T1g031G8N1z0403081a701b061I8I1A0i167614091K8D1v02050n0Y7d0X0d07011E8y1x0B0N7n0N0k03041G8t1y0J0B7y0A0z1I8n1A0S0m7L0k0K06031A8j1Cad1C8d1Eaf1D891Fah1E851Fak1G801Gan1G7W1Hap1H7S1Hat1G7Q1Hav1G7O1Gaz1G7K1HaB1G7I1HaD1G06037y1FaG1G03077k07041FaJ1F01087k08021FaL1O7i1OaO1O7g1OaR1S741TaT1S721SaW1R721RaZ1Q711Qb11P711Ob51O701Mb81O6Z1Lbb1R6T1Kbe1S6Q1Kbh1T6K1Lbl1T6E1Nbp1T6z1Obt1T6v1Nby1T6r1MbE1S6m1NbI1T6h1MbP1R6d0Q010TbW1Q680S050Lc50M030Z650S0a0Dcf0D0710610U0e0rcw0q0c125V0XdN145R0ZdO155N10dW105J0We3125D0Ye409020T5A0N0308e508040U5v0P0507e605070V5r0R0703el0W5n0Sew0Y5j0Tey0Z5e0Wez105a0XeB11560YeD12520ZeF134Y10eH134V11eK144Q12eM144N13eO154K13eQ154H14eS164D15eU164B15eW164y16eY174v16f0174s17f3164q17f5164o16f8164m16fb184h16fd1a4d16fg1b4915fj1d4515fm1e4115fp1e3Y14ft1d3W13fx1d3R14fB1c3O14fG1a3J17fJ1a3F169K0k5L183D159G0w5H173B149F0C5H153z139D0J5I133w115T0a3B0N5K0Z3u105Q0m3t0Q5K0Z3s0Y5R0s3o0T5I103p0W5T0x3j0X5G103o0W5S0C3f0Z5E123m0W5R0H3b115C143k0X5b020D0K38130u0452163j0Y530g0v0N35150l0j4V163i0Z4W0t0o0Q33160f0u4O183g114S0A0j0T30180b0A4K1a3f124O0G0f0W2s070o19080G4G1b0U08120o0M144K0L0c0Y2m0h0i1b050K4D1d0I0p0S0y0F164I1Z2g0n0c1f020O4A1e0C0z0L0G0A164G242b0r052d4w1g0x0G0F0N0v184D29252N4u1h0s0O0A0T0q1a4A2f202Q4r1i0p0T0v0Z0m1c4y2j1V2U4n1l0l0Y0s130j1d4v2o1Q2X4j1p0h130o180f1f4t2r1N2Z4h1q0d190l1d0b1g4r2v1I324e1s0a1d0j1h071i4o2A020b1r354a1v061i0f2K4l2W1h38472W0d2N4i311c3a442Z0b2P4g36173c4231092T4c3a133e3Y35082U4a3e0Y3h3W37062X483g0V3i3T3a0530453i0T3k3Q3d04323a07070608060k3l0Q3m0o05080608062S3f03353709040a040a0h3s0B3x0j0b030a040a2O3h03371P0y0H0b020c020c0d3B0n3J0f0c010c020c0G0w1z3k023a1p1c0p0E0a3K0d3R0a0E0q1b183m023b191z0h0F063T043X060F0h1z0R3o023d0U1T090H0182010H091V0A6I0F2a039u032a0p+1NV01lF02lF02lF02kS020L020L03k3030L020L04k1040K040K068x01bq050K040K078v032W098j060K050J088t052P0k8d070J060I097O030A072O0q87090I070H0a7M070v092N0L7M0a0H080H0b7K0c0p0b2M0N7K0b0H090G0c7J0h0h0f2K0P7I0c0G0b0E0d7J0N2K0P7I0d0E0d0D0e7I0O2I0Q7H0e0D0f0C0f7H0O2H0R7G0f0C0h0A0g7H0P2F0S7G0g0B0i0y0i7G0Q2D0T7F0i0y0l0w0j7G0R2B0V7E0j0w0o0t0l7F0S2z0W7D0l0t0r0q0n7F0T2x0X7E0m0p0v0m0o7G0V2u0Y7F0n0m0z0h0p7G0X2r107G0p0g0G0a0q7I102n127G0t061l7I130K051t147G1U7H150I0b1n157F1W5T031J1a0C0e1k191M035O1W5a010H081E1g0v0h1i1b1H085M1Y56050F0e1y1m0n0l1f1e1C0d0G04511Y500c0E0g1v1u0a0r1d1g1y0h0F0b4V1Z4S0j0E0h1u26191k1u0k0E0j4N204H0v0b020c020b0j1s28151o1s0m0b020c020c0t4D213D1z09040a04090k1s29111s1q0o09040a040a1t3D223D1B040a0409040o1q2b0Y1u1p0r0508050a041w3D233C2v1o2e0V1w1o2t3C243C2w1n2f0T1x1n2u3C243D2v1m2i0O1B1l2u3C263C2w1k2m0J1D1l2u3C273C2u1m2o0D1F1n2s3B2c3z2t1o2s0u1I1p2q3A2f3z2p1v4x1v2n3z2h3y2n1y4v1x2l3z2j3y2m1y4v1y2k3y2k3z2l1y4v1y2j3z2k3A2k1y4v1y2i3A2l3z2k1y4v1y2h3A2m3A2j1y4v1x2i3A2n3A2j1w4x1w2h3A2o3B2j1t4A1t2i3B2p3B2j1r4C1r2i3B2q3C2i1q4E1p2i3C2r3C2g1q4E1r2h3B2s3D2e1s4C1t2f3C2s3E2c1u4A1u2e3D2t3E2a1w4y1w2c3D2u3F281y4x1x2a3E2v3F261A4v1z273F2w3G241C4t1B253G2x3G221E4r1D233G2y3H211F4p1F213H2y3I1Z1G4o1H1Z3I2y3J1X1I4m1J1X3J2y3L1U1K4k1L1V3K2x3N1S1M4i1N1S3N2w3O1Q1O4g1P1Q3O2v3R1N1Q4e1R1O3Q2u3S1L1S4c1S1M3S2u3T1J1U4a1U1K3T2u3V1G1W481W1H3V2u3X1D1Y461Z1E3W2u3Y1B2044211A3Z2u411x2221021Z231y402u421v241S0h1R251v412w431s261M0r1L271r442w461o281G0B1F291o462x481j2c1A0J1A2b1j492z4b1e2e1w0P1w2d1f4b2B4d1a2g1s0V1r2h1a4d2D4g152j1p0Y1o2j154g2H4i0Z2l1l131l2l0Z4i2M4l0S2o1i171h2o0S4m2P4q0L2q1f1b1e2r0K4r2R4x0B2u1b1f1b2t0B4y2S4H0q2w181j182v0r4G2T4Q0g2y131r122z0f4R2S7G0Y1x0Y7H2Q7I0T1F0S7K2N7M0L1S0K7M2M7N0D250C7O2N7O0o2x0m7O2OiT2PiR2RiP2SiO2UiN2ViL2WiK2YiJ2ZiH30iG35iy3hij3pih3rif3sie3uid3vib3wib3xi93zi73Ai73Bi53Ci53Di33Fi13HhZ3IhY3KhX3LhV3NhT3PhS3PhR3RhP3ThN3VhM3VhL3XhJ3ZhH40hH41hF43hD45hB46hA48hz49hx4bhv4dht4fhr4hhp4jhn4lhl4nhj4phh4rhf4thd4vhb4xh94zh74Bh54Dh34Fh14HgZ4JgX4LgV4NgT4PgQ4SgO4VgL4XgJ4ZgH51gF54gB57gz59gx5bgv5dgt5fgq5jgn5lgl5ngj5qgf5tgd5vgb5xg85Bg55Dg35GfZ5JfX5LfV5OfS5QfP5UfL5XfJ60fF63fD66fz69fx6cft6ffr6ifn6mfj6pfg6tfd6wf96Af56Ef26GeZ6KeV6OeR6SeO6VeJ70eF74eB78ex7cet7geo7mej7peh7teb7z6v166u7F6g1u6f7K621R617Q5R275R7V5G2o5F815v2E5v855j2W5j8d583b588k4V3s4W8s4I3L4J8y4w434v8H4j4m4i8L484F488N3X4Y3Y8P3N5g3P8S3B5z3B8Z3o5T3o9a346g359w2C6L2A9T2d7g2bae1N7J1Nay1m8g1maV0l9R0q5x"
   },
   {
      w: 1409,
      h: 760,
      ground_size: 1800,
      offset_x: 196,
      offset_y: 1020,
      ground: "0r1djr1d0R1fjp1f0Q1ijj1i0P1kjh1k0M1njf1n0K1pjb1p0J1rj91r0I1sj71s0H1wj11w0F1yiZ1y0E1ziX1z0D1BiV1B0C1DiR1D0B1FiP1F0z1I4H1w6l1w4H1I0y1K4C1A6j1A4C1K0w1N4A1D6f1D4A1N0u1O4y1F6d1F4y1O0t1Q4v1I6b1I4v1Q0r1U4r1K691K4r1U0q1V4o1N671N4o1V0p1X4l1Q651Q4l1X0o1Z4i1S631S4i1Z0n2N3u1V5Z1V3u2N0l2R3p1Y5X1Y3p2R0k2S3m215V213m2S0j2V3j235T233j2V0i2X3f265R263f2X0g303d285P283d300d34392a5N2a39340c351t0b1r2g5H2g1r0b1t350b381l0n1k2i2a1l2a2i1k0n1l380a3a1h0r1h2k271p272k1h0r1h3a093c1f0u1d2n261p262n1d0u1f3c073g1a0y1a2p241r242p1a0y1a3g063h160D172r221t222r170D163h053k130F132v211t212v130F133k043m100H112y1Y1v1Y2y110H103m033p0X0K0Y2A1X1v1X2A0Y0K0X3p023r0V0K0W2D1V1x1V2D0W0K0V3r013u0S0M0U2F1S1B1S2F0U0M0S6Z0Q0O0S2H1R1B1R2H0S0O0Q730M0Q0O2L1P1D1P2L0O0Q0Mci1O1D1Ohw1L1F1Lhz1J1H1JhB1I1H1IhD0J0b0M1J0M0b0JhF0C0n0G1J0G0n0ChH0z0r0D1L0D0r0zhJ0w0u0B1N0B0u0whM0s0y0z1N0z0y0shP0q0C0u1R0u0C0qhR0n0F0s1T0s0F0nhU0k0H0r1T0r0H0khX0h0K0p1V0p0K0hhZ0g0K0p1V0p0K0gi20d0M0n1X0n0M0di50b0O0l1Z0l0O0bi7090Q0k1Z0k0Q09+iQ501mH02mH03mF05mD07mB09mz0cmv0gmr0jmp0lmn0nml0pmj0rmh0tmf0wmb0zm90Bm70Dm50Fm30Hm10JlZ0NlT0RlR0TlP0VlN0XlL0ZlJ12lF15lD17lB19lz1blx1dlv1flt1ilp1lln1nll1qlh1tlf1vld1yl91Bl71Dl51Fl31Hl11JkZ1LkX1NkV1QkR1TkP1VkN1XkL20kH23kF26kB29kz2bkx2dkv2fkt2hkr2jkp2mkl2pkj2rkh2tkf2vkd2xkb2Bk52Fk32Hk12JjZ2L4B0z9F0x4B2N4z0A9F0y4z2P4x0B9F0z4x2S4v0B9F0z4v2V4t0D9E0A4t2X4r0E9C0D4r2Z4q0E9C0D4q314o0F9C0E4o334l0H9C0G4l354j0I9C0H4j384h0J9B0H4h3b4f0K9A0J4f3e4c0L9A0K4c3h4a0M9A0L4a3j490M9A0L493l470O9z0M473o440P9y0O443r420Q9y0P423t410Q9y0P413v3Y0S9y0R3Y3x3W0T9y0S3W3z3V0U9x0S3V3B3T0V9w0U3T3E3Q0W9w0V3Q3H3O0X9w0W3O3J3N0X9w0W3N3L3L0Z9v0X3L3O3I109u0Z3I3R3F129u113F3U3D129u113D3X3B139u123B3Z3z149u133z413x169t143x433w169s153w453u179s163u5p0S2q9s2p0S6I0S2q9s2p0S6J0Q2r9s2q0Q6M0N2u9p2s0N6P0K2w9p2u0K6Q0K2w9p2u0K6R0I2x9p2v0I6T0G2y9p2w0G6V0E2A9o2x0E6X0C2B9m2A0C700y2D9m2C0y750s2G9m2F0s790q2H9m2G0q7d0k2K9m2J0k7n062S9k2R06as9kdp9kdp9kdp9kdq9jdq9idr9idr9idr9idr9ids9hds9gdt9gdt9gdt9gdu9fdu9edv9edv9edv9edv9edw9ddw9cdx9cdx9cdx9cdz9adz99dA99dA99dA99dA99dB98dB96dD96dD96dD96dE95dE94dF94dF94dF94dF94dG93dG92dH92dH92dH92dH92dI90dJ90dJ90dJ90dJ90dK8ZdK8YdL8YdL8YdL8YdL8YdM8WdN8WdN8WdN8WdN8WdP8UdP8TdQ8TdQ8TdQ8TdQ8TdR8QdT8QdT8QdT8QdT8QdU8PdU8OdV8OdV8OdV8OdV8OdW8NdW8MdX8MdX8MdX8MdY8LdY8KdZ8KdZ8KdZ8KdZ8Ke08Je08Ie18Ie18Ie18Ie18Ie28Ge38Ge38Ge38Ge38Ge58Ee58De68De68De68De68De78Ae98Ae98Ae98Ae98Aea8zea8yeb8yeb8yeb8yeb8yec8wed8wed8wed8wed8wee8vee8uef8uef8uef8uef8ueg8seh8seh8seh8seh8sei8rei8qej8qej8qej8qej8qel8nem8nem8nem8nem8nen8men8kep8kep8kep8kep8keq8ier8ier8ier8ier8ier8ies8get8get8get8get8geu8feu8eev8eev8eev8eev8eew8cex8cex8cex8cex8cey8bey8aez8aez8aez8aez8aeB87eC87eC87eC87eC87eD86ev8kem8pek8qej8qej8qej8qej8qej8qej8qej8qej8qel8oel8nem8nem8nem8nem8nem8nem8nem8nem8nem8nem8nem8nek8qej8qej8qej8qej8qej8qej8qej8qej8qel8nem8nem8nen8kep8keq8ies8get8geu8eev8eev8eev8eew8cex8cex8cex8cey8aez8aez8aez8aeB87eC87eC87eD86eD84eF84eF84eG83eG82eH82eH82eI81eI80eJ80eJ80eK7ZeK7YeL7YeL7YeM7WeO7UeR7ReT7OeW7MeY7Kf07If27Gf47Ef67Cf97zfb7wfe7ufg7sfi7qfl7nfo7kfq7ifs7ffv7dfx7bfz78fC76fF73fH70fK6YfM6WfO6UfQ6SfS6QfV6NfX6Kg06Ig26Gg46Eg66Cg86Agb6xgd6ugg6sgi6qgk6ogm6mgo6kgr6hgt6egw6cgy6agA68gC66gE64gI60gK5XgN5VgP5TgR5RgT5PgW5MgY5Ih25Gh45Eh65Ch85Aha5yhd5vhf5shi5qhk5ohm5mho5khq5iht5fhv5chy5ahA58hC56hE54hG52hI50hL4XhN4UhQ4ShS4QhU4OhW4MhY4Ki14Hi34Ei74Bi94zib4xid4vie4uie4vie4wid4wid4wic4yib4yib4yib4yia4Ai94Ai94Ai94Aia4yib4yib4yic4wid4wid4wid4wie4uif4uih4rij4oim4mio4kiq4iis4giu4eiy48iF40iO3QiZ3Fj53Cj73Cj73Cj73Cj73Cj83Aj93Aj93Aj93Aja3yjb3yjb3yjb3yjb3yjc3wjd3wjd3wjd3wjd3wje3ujf3ujf3ujf3ujf3ujg3sjh3sjh3sjh3sjj3pjk3pjk3pjl3mjn3mjn3mjo3kjp3kjp3kjq3ijr3ijr3ijs3gjt3gjt3gju3ejv3ejv3ejw3cjx3cjx3cjz39jA39jA39jB36jD36jD36jE34jF34jF34jG32jH32jH32jI30jJ30jJ30jK2YjL2YjL2YjM2WjN2WjN2WjP2TjQ2TjQ2TjR2QjT2QjT2QjU2OjW2MjY2KjZ2Kk02Ik22Gk52Dk62Dk72Aka2ykc2wkd2wke2ukg2skh2ski2qkl2nkn2kkp2kkq2iks2gku2ekw2cky2akA28kE22kI20kJ20kK1YkL1YkL1YkL1YkM1WkN1WkN1WkO1UkP1UkQ1SkT1PkV1MkX1MkY1Kl01Il21Gl31Gl41El61Cl91zla1zlb1wle1ulg1slh1slj1olo1jlr1glv1cly1alB16lG10lK0YlN0UlQ0SlU0Nm10Bmf0omr0cbg"
   },
   {
      w: 1545,
      h: 697,
      ground_size: 1800,
      offset_x: 133,
      offset_y: 1103,
      ground: "0r04nV040R07nR070P0anN0a0O0bnL0b0O0cnJ0c0O0dnH0d0N0fnF0f0M0gnD0g0M0inz0i0M0jnx0j0L0lnv0l0K0mnt0m0K0nnr0n0K0onp0o0K0pnn0p0K0qnl0q0K0rnj0r0K0snh0s0K0und0u0K0vnb0v0K0wn90w0K0xn70x0K0yn50y0L0yn30y0M0zn10z0M0AmZ0A0M0BmX0B0M0CmV0C0M0DmT0D0M0FmP0F0M0HmL0H0N0ImH0I0O0JmF0J0O0LmB0L0O0Nmx0N0O0Pmt0P0P0Pmr0P0Q0R290dhF0d290R0R0S1Y0qhx0q1Y0S0T0T1M0Ehp0E1M0T0V0T1F0Ohh0O1F0T0W0V1y0Xh90X1y0V0X0W1q17h1171q0W0Z0X1j1ggT1g1j0X110Y1b1pgN1p1b0Y130Z0A21gH210A0Z14110d2q1K05cV051K2q0d111512082w1C0bcT0b1C2w08121713022E1v0ecT0e1v2E0213193L0O060x0fcT0f0x060O3L1b3O0r0u0n0kcT0k0n0u0r3O1c4O0f0ocR0o0f4O1d4R060tcR0t064R1f5pcR5p1h5ocR5o1i5pcP5p1j5ocP5o1l5ncP5n1n5ncN5n1p5mcN5m1r5lcN5l1t5kcN5k1v5jcN5j1x5icN5i1z5hcN5h1B5gcN5g1D5fcN5f1F5ecN5e1H5dcN5d1J5ccN5c1L5bcN5b1O5acL5a1R59cL591S59cL591R5bcJ5b1P5ccJ5c1O5ccJ5c1N5dcJ5d1L5fcH5f1J5hcF5h0S080I5icD5i0I08010b0F5kcB5k0F0p0B5mcz5m0B0u0y5ncz5n0y0y0v5pcx5p0v0D0s5pcx5p0s0I0q5qcv5q0q0N0n5qcv5q0n0S0l5rct5r0l0W0j5rct5r0j110g5scr5s0g0x010y0d5tcr5t0d0y020A0b5tcr5t0b0A020D085ucp5u080D020F065ucp5u060F020H045vcn5v040H026gcn6g036gcl6g046gcl6g056g6h0b5R6g066g6e0q5F6g076g6a0w5B6g086g670B5z6g096g630H5v6g0a6g600L5u6g0b6f5X0P5t6f0c6f5V0S5s6f0d6e5T0V5r6e0e6e5S0X5q6e0f6d5Q105p6d0g6d5O135o6d0h6c5N155n6c0i6c5M185l6c0j6b5L1a5k6b0k6b2Y072F1c5j6b0l692T0p2s1e5j690o672N0D2j1g5i670r662H0N2e1i5h660u642F0S2a1k5g640x632D0X261m5f630A612C11221o5e610E5Z2A161Y1r0D0J3Q5Z0H5Y2z191V1u0t0X3K5Y0K5W2w1f1Q1z0h1b3F5W0N5V2r1m1N373A5V0Q5T2m1u1J3d3v5T0T5S2h1C1E3l3p5S0W5Q0Z0B0x1O1B3r3k5Q105O0X0R03271x3x3f5O135M0V361u3D3b5M165K0T3b1p3K365K1a5H0R3h1k3R325H1e5E0P3m1f3Z2Y5E1i5C0N3r1a462T5C1n5y0M3w144d2Q5y1s5v0M3A0Z4k2M5v1w5s0L3G0S4s2I5s1B5p0K3K0N4z2D5p1G5m0K3O0H4H2z5m1I5l0J3T0C4S2r5l1I5l0I3Y0r5e2c5l1I5k0I42066A195k1I5k0HaQ125k1I5k0GaX0W5k1J5j0Eb10U5j1K5i0Eb50S5i1K5i0Db80Q5i1K5i0Cbc0N5i1L5h0Cbe0L5h1M5h0Bbh0J5h1M5g0Bbk0I5g1M5g0Abm0H5g1N5e0Bbn0H5e1O5d0Bbp0H5d1O5d0Abs0F5d1O5c0Abu0F5c1P5b0Abv0E5b1Q5a0Aby0D5a1Q590AbA0D591R580zbC0C581S570zbE0C571S560AbE0D561T550zbG0C551U540AbH0C541V520AbJ0C521W520AbK0B521W510AbL0C511X4Z0BbM0C4Z1Y4Y0BbO0C4Y1Z4W0CbP0C4W204V0CbR0C4V214T0DbR0D4T224T0CbT0C4T224S0DbU0C4S234Q0DbV0D4Q254O0EbW0D4O274M0EbX0E4M284L0FbY0E4L294J0FbZ0F4J2b4H0Gc00F4H2d4G0Fc10F4G2e4F0Gc10G4F2f4D0Hc20G4D2h4B0Hc30H4B2j4z0Ic40H4z2l4y0Ic40H4y2n4x0Hc60G4x2p4w0Hc60G4w2s4u0Hc60G4u2u4u0Gc80F4u2u4u0Gc80F4u2v4t0Gc90E4t2w4t0Fca0E4t2x4t0Eca0D4t2y4t0Dcb0D4t2z4r0Ecb0E4r2A4r0Ecc0D4r2A4r0Dcd0D4r2B4q0Dcd0D4q2C4q0Dcd0D4q2D4o0Ecd0E4o2E4o0Dce0E4o2F4n0Dce0E4n2G4n0Dce0E4n2G4n0Dce0E4n2H4m0Dcf0D4m2J4k0Ecf0E4k2L4j0Dcg0E4j2M4j0Dcg0E4j2N4i0Dcg0E4i2P4h0Dcg0E4h2R4f0Ecg0F4f2T4e0Ecg0F4e2U4e0Dch0F4e2V4d0Dci0E4d2X4c0Dci0E4c2Z4b0Dci0E4b304a0Ech0G4a31490Ech0G4934470Ech0G4737460Ech0G4639450Ech0G453c420Fch0H423f3n030B0Fch0H0B033n3i3j040C0Fch0H0C043j3l3e080C0Fch0H0C083e3n390c0C0Fch0H0C0c393q330g0B0Gch0I0B0g333t2X0l0B0Gch0I0B0l2X3w2R0p0B0Gch0I0B0p2R3z2K0u0B0Hch0J0B0u2K3B2D0A0B0Hch0J0B0A2D3E2w0F0A0Icg0L0A0F2w3I2r0I0A0Icg0L0A0I2r3L2n0L0A0Icg0L0A0L2n3O2i0N0A0Jcg0M0A0N2i3R2e0Q0A0Jcg0M0A0Q2e3U290T0A0Jcg0M0A0T293X250W0z0Kcg0N0z0W2540210Y0z0Lcf0N0z0Y21431Y100z0Lcf0N0z101Y461V100z0Mcf0O0z101V491T110z0Mcf0O0z111T4b1R120z0Mce0P0z121R4d1O140y0Ocd0Q0y141O4f1M150y0Ocd0Q0y151M4h1K150y0Pcd0R0y151K4j1H170y0Pcd0R0y171H4l1F180y0Pcc0S0y181F4n1D190x0Qcc0T0x191D4p1A1b0x0Rcb0T0x1b1A4s1x1c0x0Rcb0T0x1c1x4v1v1c0x0Scb0U0x1c1v4x1s1e0x0Scb0U0x1e1s4z1q1f0w0Tca0W0w1f1q4B1o1g0v0Vc90X0v1g1o4D1l1i0t0Xc90Z0t1i1l4F1j1j0s0Yc9100s1j1j4I1f1k0s10c8110s1k1f4L1d1l0r11c7130r1l1d4O1a1m0p13c7150p1m1a4R171o0o15c6160o1o174U141p0n16c6170n1p144X111q0n17c6180n1q11500Y1r0l1ac41b0l1r0Y530W1s0k1bc41c0k1s0W560S1u0j1cc41d0j1u0S590O1y0h1ec21f0h1y0O5c0I1C0e1hc21i0e1C0I5f0D1G0b1kc21l0b1G0D5i0y1J081nc11p081J0y5s0m1O041rc01s041O0m5J0a3mc03n0a9obZcXbYcXbYcYbWcZbWd0bVd0bUd2bTd2bTd3bSd3bRd5bQd5bPd7bOd7bNd9bMd9bLdbbKdbbJddbHdfbGdfbFdhbEdibCdkbBdlbzdmbzdnbxdpbwdqbudsbsdtbqdwbodybmdAbkdCbidEbfdIbcdKbadMb8dPb5dRaRe6aMeaaLecaIeeaHehaDeoaxetarezaleCajeCaieEaheEageGafeGaeeIaceJaceKaaeLaaeMa8eNa8eOa6ePa6eQa4eRa3eTa2eTa1eVa0eV9ZeW9ZeX9XeY9Wf09Vf09Uf29Sf39Sf49Qf59Pf79Of79Nf99Lfa9Lfb9Jfc9Ife9Hfe9Gfg9Efh9Efi9Cfj9Bfl9Afl9zfn9yfn9xfo9wfq9vfq9ufs9sft9sfu9qfv9pfx9ofx9nfz9lfA9lfB9jfC9ifE9hfF9ffH9dfJ9cfK9afM98fO96fQ94fS92fU90fW8XfZ8Vg18Tg38Qg68Og88Mga8Jgc8Ige8Ggg8Egi8Bgl8zgn8xgp8ugs8sgu8qgw8ogy8lgB8jgD8hgF8egI8cgK8agM87gQ84gT81gV7YgZ7Uh37Qh77Mhb7Jhe7Fhi7Bhl7yhp7uht7qhx7nhA7jhE7fhI7bhL78hP74hT71hW6Xi06Ti76Mi86Li96win6sir6xin6Cih6Fie6Iic6Kia6Ni76Pi56Ri46Ti26Ui06WhZ6XhX70hV71hU72hS75hQ76hO78hN79hM7bhJ7dhI7dhH7fhG7ghF7ghE7ihD7jhB7khB7lhA7mhy7ohx7ohw7qhv7rhu7rht7ths7uhq7vhq7who7yhn7zhm7zhl7Bhk7Chi7Dhi7Ehh7Ehg7Ghf7Ghe7Hhe7Ihc7Jhc7Jhc7Jhb7Lha7Lh97Mh97Nh87Nh77Oh77Oh67Qh57Qh57Qh47Sh37Sh37Sh27Th27Uh17Uh07Vh07WgZ7WgY7XgY7XgY7YgW7ZgW7ZgW80gU81gU81gU82gS83gS83gS83gR85gQ85gQ85gQ86gP86gP86gO88gL8agJ8cgH8fgE8hgC8jgB8kgz8ngw8pgu8rgt8tgq8wgn8Bgj8Egf8Igd8Kga8Og68Rg48Tg18WfZ8YfW90fU92fT93fR95fQ96fO97fN99fM9afK9cfJ9dfH9ffG9gfE9hfE9ifD9jfC9kfB9lfA9lfA9mfz9mfy9nfy9ofx9ofx9ofx9ofx9ofx9pfw9pfv9qfv9qfv9rfu9rfu9rfu9rfv9qfv9rfu9rfu9rfv9qfv9qfv9qfw9pfw9pfw9pfw9ofy9nfy9nfy9nfy9mfA9lfA9lfA9lfB9jfC9jfD9ifE9hfF9ffG9ffH9efI9dfI9cfK9bfK9bfL9afL99fM99fN97fO96fQ95fQ94fS92fT92fT91fV90fV8ZfX8XfY8XfY8Wg08Vg08Ug28Sg38Sg48Qg58Pg68Pg78Ng88Ng98Lga8Kgc8Igd8Igd8Ige8Ggf8Ggg8Egh8Egh8Egi8Cgj8Cgk8Agl8Agm8ygn8ygn8ygo8wgp8wgq8ugr8ugs8sgt8sgt8sgu8qgv8qgw8ogx8ogx8ogy8mgz8mgz8mgz8mgz8mgz8mgz8mgz8mgz8mgz8mgA8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgB8kgC8igD8igD8igD8igD8igD8igD8igD8i8k"
   },
   {
      w: 1800,
      h: 886,
      ground_size: 1800,
      offset_x: 0,
      offset_y: 914,
      ground: "0005sS0fsI0osA0wss0Fsi0Osa0Xs017rQ1hrG1rrw1Brm1Lrc1Vr224qU2dqK2qqu2Gqe2Uq237pO3kpC3wpq3Hpg3Qp83Xp244oU4boO4ioG4poA4wos4Coo4Hoi4Noc4To64Zo055nU5bnO5hnI5mnE5rny5xns5Dnm5Jng5Qn85Xn263mW69mQ6emM6jmG6omC6tmw6yms6Cmo6Hmi6Mme6Qma6Um66Ym271m074lW78lS7blQ7elM7hlK7klG7nlE7plC7sly7vlw7xlu7zls7Blq7Elm7Hlk7Jli7Llg7Olc7Rla7Tl87Vl67Xl480l083kY85kW87kU89kS8bkQ8dkO8fkM8hkK8jkI8lkG8nkE8pkC8rkA8tky8vkw8xku8zks8Bkq8Dko8Fkm8Hkk8Jki8Lkg8Nke8Pkc8Rka8Uk68Xk48Zk291k0930N05ie050N950L06ie060L970K07ic070K990I09ia090I9b0G0aia0a0G9d0E0ci80c0E9f0D0di60d0D9g0D0di60d0D9h0B0fi40f0B9j0A0fi40f0A9l0y0hi20h0y9o0w0hi20h0w9r0v0hi20h0v9t0t0ii20i0t9v0r0ki00k0r9y0m0ni00n0m9B0j0pi00p0j9D0f0si00s0famhYb4hYb4hYb4hYb4hYb4hYb5hWb6hWb6hWb6hWb6hWb6hWb5hYb4hYb4hYb4hYb4hYb4hYb4hYb3i0b2i0b2i0b2i0b1i2b0i2aZi4aYi4aYi4aXi6aWi6aVi8aUi8aTiaaSiaaRicaPieaOieaNigaLiiaJikaHimaGimaEiqaBisaziuaxiwaviyatiAaqiEamiIaiiMadiSa7iYa2j29Xj89Ojk9Bjy9mjO96k48Rki8Dkw8qkI8dkW7Zla7Mlm7Dls7wlA7olI7glQ78lY70m66Sme6Lmk6Ems6xmy6qmG6jmM6dmS66n060n45Vna5Qne5Mni5Inm5Enq5Anu5wny5rnE5mnI5inM5enQ5anU56nY51o44Xo64Vo84Toa4Roc4Poe4Nog4Loi4Jok4Hom4Eoq4Bos4yow4voy4soC4poE4moI4joK4hoM4eoQ4boS48oW45oY42p23Zp43Wp83Tpa3Qpe3Npg3Lpi3Jpk3Gpo3Dpq3Bps3zpu3xpw3vpy3spC3ppE3npG3lpI3jpK3hpM3epQ3bpS39pU38pU37pW36pW36pW35pY35pW36pW37pU38pU38pU39pS3apS3apS3bpQ3cpQ3cpQ3dpO3epO3fcJ04cZ3gcI06cY3hcF0acV3icD0ecT3jcA0icQ3kcz0lcO3lcw0pcL3mcu0tcJ3ncs0vcH3ocq0zcF3pcn0DcC3rcl0Gcz3tci0Kcw3wce0Ocs3Acb0Rco3Dc80Ucm3Gc40Yci3Kc012ce3ObX15ca3RbU19c73UbQ1dc33YbN1gbZ42bJ1jbW46bF1nbS49bD1qbP4cbz1ubL4gbv1ybH4kbs1BbD4obo1Fbz4sbk1Ibw4wbh1Lbs4zbe1Pbp4Cba1Tbl4Gb61Ybg4Kb222bc4OaY26b84RaU2cb44UaQ2gb04YaM2kaW52aI2paR56aE2taN5aaA2xaJ5dax2CaF5gat2GaB5k4p065U2K62064p5o4k0c5P2P5W0c4k5s4g0h5K2T5R0h4g5w4d0k5F2Z5M0k4d5A4a0n5B335I0n4a5D490p5x375E0p495G470r5t3c5z0r475K450u5o3g5u0u455O430w5k3k5q0w435R420z5f3p5k0z425U400B5b3t5g0B405Y3Z0C573x5c0C3Z623X0F523C560F3X653X0G4Y3G520G3X683W0I4U3I4Y0I3W6b3X0I4R3J4W0I3X6e3W0K4O3J4T0K3W6h3W0L4M3J4R0L3W6j3X0L4K3K4O0L3X6l3X0N4H3K4L0N3X6n3Y0N4F3K4J0N3Y6p3Z0O4B3L4G0O3Z6r3g0a0A0O4z3L4E0O0A0a3g6t3e0g0w0Q4w3M4A0Q0w0g3e6v3d0i0u0S4u3M4y0S0u0i3d6x3b0m0q0W4r3M4v0W0q0m3b6y3a0q0m0Z4o3N4t0Z0m0q3a6z390u0h134l3N4q130h0u396A380z0c184h3O4l180c0z386B370C081d4d3O4h1d080C376C370G031h4a3O4e1h030G376D3621493O4d21366E362j3Q3P3V2j366E372w3C3Q3G2w376F362M3m3Q3q2M366G363a2Y3Q323a366H363f2S3Q2W3f366I363j2N3R2S3j366I373k2L3S2P3k376J363l2K3S2O3l366K373l2J3S2N3l376K373n2H3S2L3n376L373n2F3T2K3n376M393m2E3U2I3m396M3a3n2C3U2G3n3a6M3c3m2B3U2F3m3c6N3c3m2A3U2E3m3c6O280g0Q3l2z3U2D3l0Q0g286O240v0H3l2w3W2A3l0H0v246O220H0z3k2v3W2z3k0z0H226O1H0g050L0u3m2u3W2y3m0u0L050g1H6O1C1o0f3p2t3W2x3p0f1o1C6O1x592r3W2v591x6O1t5h16021e3Y1i02165h1t6O1q5n0Q0k193Y1d0k0Q5n1q6O1l5v0D0A133Y170A0D5v1l6O1f5K0i0P103Y140P0i5K1f6O13740Z3Y1374136O0W7c0Y3Z117c0W6N0S7i0W40107i0S6M0N7o0V400Z7o0N6M0H7v0U400Y7v0H6M0A7D0T400X7D0A6L0r7O0S410V7O0r6K0g800Q420U800g6K038e0P420T8e03f10P420Tnj0O420Snk0O430Rnl0N430Qnm0M440Qnn0L440Pno0L440Pnp0K450Nnq0K450Nnq0J460Nnr0I460Mns0I460Mnt0H470Knu0H470Knu0G480Knv0F480Jnw0F480Jnw0F490Inw0F490Inx0D4a0Hny0D4b0Gny0D4b0Gny0D4b0Gny0C4c0Gnz0B4d0EnA0B4d0EnA0B4d0EnA0B4d0EnA0A4f0DnA0A4f0DnA0A4f0DnA0A4f0DnA0z4h0CnA0z4h0CnA0z4h0CnA0z4h0CnA0y4j0BnA0y4j0BnC0w4j0znF0v4j0ynG0v4k0xnG0u4l0xnG0u4l0xnF0v4l0ynE0v4m0xnE0u4n0xnE0u4n0xnE0u4o0wnD0v4o0xnC0u4p0xnC0u4p0xnB0v4q0xnA0v4q0xnA0v4q0xnA0u4r0xnz0v4s0xny0v4s0xnx0w4s0ynw0v4t0ynw0v4u0xnv0w4u0ynt0x4u0zns0w4v0znr0x4w0znp0y4w0Ano0y4w0Ann0y4x0Bnl0z4y0Bnk0z4y0Bnj0A4y0Cnh0A4z0Dnf0B4A0Dnd0C4A0Enc0C4A0Enb0C4C0En90D4C0Fn70E4C0Gn50F4C0Hn30G4C0In10I4B0JmY0K4A0MmV0N4x0OmT0P4u0RmR0R4s0TmQ0S4q0UmQ0T4n0WmP0W4k0YmO0X4h10mO0Y4f11mO0Z4d12mO114914mO124715mN144517mM154219mL17401bmJ1a3X1dmH1c3U1gmG1d3S1hmF1f3P1kmD1i3M1mmC1j3K1nmB1l3H1qkq0n1M1n3F1s1M0ni60y1L1o3D1t1L0yhz01040R1J1r3z1w1J0R0401hb0Z1G1t3x1y1G0Zh8121E1v3v1A1E12h4151C1x3s1D1C15h0181A1A3p1F1A18gW1b1y1C3m1I1y1bgS1e1w1E3k1K1w1egO1h1u1G3i1M1u1hgK1k1s1I3f1P1s1kgH1m1q1L3c1R1q1mgE1o1p1N3a1T1p1ogA1r1n1P371W1n1rgw1t1m1R351Y1m1tgt1u1l1T33201l1ugq1w1k1W2Z231k1wgm1y1j1Y2X251j1ygi1A1i202U281i1Age1B1i222S2a1i1Bgb1C1h252P2c1h1Cg81E1g272M2f1g1Eg41F1g292K2h1g1Fg11G1f2b2I2j1f1GfY1I1e2d2F2m1e1IfU1L1c2g2C2o1c1LfR1M1b2i2A2q1b1MfO1O0p030I2k2x2t0I030p1OfK1R0l060H2m2v2v0H060l1RfH1S0i090G2p2r2y0G090i1SfE1V0e0c0F2r2p2A0F0c0e1VfB1Y090f0E2t2n2C0E0f091Yfy2o0D2v2k2F0D2ofu2q0C2x2i2H0C2qfr2r0B2A2f2J0B2rfo2t0A2C2d2L0A2tfl2u0y2F2a2P0y2ufj2v0x2H282R0x2vfg2x0w2J262T0w2xfd2y0v2L242V0v2yfb2z0u2N222X0u2zf82B0t2P202Z0t2Bf52C0s2R1X320s2Cf22E0r2T1V340r2EeZ2F0q2V1T360q2FeX2G0p2X1R380p2GeU2I0n301P3b0n2IeR2J0m321N3d0m2JeP2K0l341L3f0l2KeM2M0k361I3i0k2MeJ2N0j381G3k0j2NeH2O0h3b1E3n0h2OeF2O0h3d1C3p0h2OeD2Q0e3h1z3s0e2QeB2R0d3j1x3u0d2Rez2S0b3m1u3y0b2Sex2U093o1s3A092Uev2W053s1q3E052Wet6v1o6Her6x1m6Jep6z1k6Len6B1i6Nek6E1f6Reh6G1d6Tef6I1b6Ved6K196Xeb6M176Ze96O1571e76Q1274e56S1076e36U0Y78e16W0W7adZ6Y0U7cdX700S7edV730P7gdT750M7jdR770K7ldP790I7ndN7b0G7pdL7d0E7rdJ7f0C7tdI7g0z7vdH7i0x7xdF7k0v7zdD7m0t7BdB7o0r7Ddy7r0p7Gdv7t0m7Jdt7v0k7Ldr7x0i7Ndp7z0g7Pdn7B0e7Rdl7D0c7Tdj7F0a7Vdh7I067Ydf7K0480ddfQdbfSd9fUd7fWd5fYd3g0d0g4cXg6cVg8cTgacQgecNggcLgicIgmcFgocDgqcAgucwgycrgEcmgIchgOcbgUc6gYbXhcbIhsbqhMb8i2aWiaaOiiaGiqaAiuawiyasiCaoiGakiKagiOaciSa8iWa5iYa2j29Zj49Wj89Tja9Qje9Njg9Kjk9Hjm9Ejq9Bjs9zju9wjy9tjA9qjE9njG9kjK9hjM9ejQ9bjS98jW95jY92k28Zk48Wk88Tka8Qke8Nkg8Lki8Ikm8Fko8Cks8zku8wky8tkA8rkC8okG8lkI8ikM8fkO8dkQ8akU87kW85kY82l27Zl47Xl67Ula7Rlc7Ple7Mli7Jlk7Hlm7Flo7Flm7Glm7Hlk7Ilk7Jli7Llg7Mlg7Nle7Ole7Plc7Qlc7Rla7Sla7Tl87Ul87Vl67Wl67Xl47Yl47n020Al20A026L030Al20A036J050zl20z056G080zl00z086D0a0yl00y0a6B0d0wl00w0d6y0g0wkY0w0g6v0i0vkY0v0i6t0l0tkY0t0l6q0o0tkW0t0o6n0q0skW0s0q6l0t0rkU0r0t6i0w0qkU0q0w6f0y0pkU0p0y6e0A0okS0o0A6d0D0mkS0m0D6c0F0kkS0k0F6b0I0jkQ0j0I6a0K0hkQ0h0K690N0fkQ0f0N670P0fkO0f0P660R0dkO0d0R650U0ckM0c0U640W0akM0a0W630Z07kO070Z621105kO051161n25Zn45Xn65Vn85Tna5Rnc5Pne5One5Nng5Lni5Jnk5Hnm5Fno5Dnq5Bns5znu5xnw5wnw5vny5tnA5rnC5pnE5nnG5lnI5jnK5hnM5gnM5fnO5dnQ5bnS59nU57nW55nY53o051o24Zo44Wo84Toa4Qoe4Nog4Kok4Hom4Foo4Doq4Bos4yow4voy4toA4roC4poE4noG4loI4ioM4foO4doQ4boS49oU47oW45oY42p23Zp43Xp63Vp83Tpa3Rpc3Ppe3Npg3Kpk3Gpo3Dpq3Apu3ypu3xpw3vpy3tpA3rpC3ppE3npG3lpI3kpI3ipM3fpO3dpQ3bpS39pU37pW35pY33q031q22Zq42Xq62Vq82Tqa2Rqc2Pqe2Nqg2Kqk2Hqm2Fqo2Dqq2Bqs2zqu2wqy2tqA2rqC2rqA2uqw2yqs2Cqo2Gqk2Kqg2Sq434pS3hpE3ups3Kp845oM4joG4poA4wos4Coo4Gok4Joi4Moe4Qoa4To84Vo64Xo44Zo252nY55nW57nU59nS5bnQ5dnO5fnM5gnM5hnK5inK5jnI5knI5lnG5mnG5nnE5onE5pnC5qnC5rnA5snA5snA5tny5uny5uny5uny5uny2K"
   }];

function MapNumberToObject(a) {
   if ("number" == typeof a) return MAPS[a];
   var b = {};
   b.w = a[0];
   b.h = a[1];
   b.ground_size = a[2];
   b.offset_x = a[3];
   b.offset_y = a[4];
   b.ground = a[5];
   b.bg = "sea_bg2";
   b.fg = "bricks";
   b.bgcolor = "#84b6ce";
   return b
}
function GetMapName(a) {
   return a == MAP_RANDOM ? "Random" : a == MAP_CUSTOM ? "Custom" : MAPS[a] ? MAPS[a].name : "Unknown"
}

function SetMapBgFgColor(a, b, d, c, e) {
   b && (MAPS[a].bg = -1 == b.indexOf("/") ? "/static/images/maps/" + b : b);
   d && (MAPS[a].fg = -1 == d.indexOf("/") ? "/static/images/maps/" + d : d);
   c && (MAPS[a].bgcolor = c);
   e && (MAPS[a].name = e)
}
function base62_decode(a, b, d, c) {
   for (b = d = (a === (a += "") && /^[a-z\d]+$/i.test(a)) - 1; c = a.charCodeAt(d++);) b = 62 * b + c - [, 48, 29, 87][c >> 5];
   return b
}

function DragonDecompress2(a) {
   var b, d, c = [];
   for (b = 0; b < a.length; b += 2)"-" == a[b] ? (d = a[b + 1] + a[b + 2] + a[b + 3] + a[b + 4], b += 3) : "+" == a[b] ? (d = a[b + 1] + a[b + 2] + a[b + 3], b += 2) : d = a[b] + a[b + 1], c.push(base62_decode(d));
   return c
}
function DragonDecompress(a) {
   var a = DragonDecompress2(a),
       b, d = "",
       c = !1,
       e = a.length;
   for (b = 0; b < e; b++) d += fillString(c ? 1 : 0, a[b]), c = !c;
   return d
}
function ImageDataToBooleanArray(a) {
   var b, d = [],
       c = a.data,
       e = a.width,
       f = a.height;
   for (b = 0; b < f; b++) for (a = 0; a < e; a++) d.push(0 != c[4 * (b * e + a) + 3]);
   return d
}

function ImageDataToBooleanArray2(a) {
   var b, d = [],
       c = a.data,
       e = a.width,
       f = a.height,
       j;
   for (b = 0; b < f; b++) for (a = 0; a < e; a++) j = 4 * (b * e + a), d.push(!(0 == c[j + 3] || 255 == c[j] && 255 == c[j + 1] && 255 == c[j + 2]));
   return d
}

function BooleanArrayToImageData(a, b, d) {
   var c, e, f = 0,
       j = b.width,
       m = b.height,
       k = b.data,
       p = "string" == typeof a ? "1" : !0;
   for (e = 0; e < m; e++) for (c = 0; c < j; c++) k[4 * (e * j + c) + 3] = a[f] == p ? 255 : 0, f++;
   if (d) for (e = 0; e < m; e++) for (c = 0; c < j; c++) if (k[4 * (e * j + c) + 3]) for (f = 1; 10 >= f; f++) if (!k[4 * (e * j + (c - f)) + 3] || !k[4 * (e * j + (c + f)) + 3] || !k[4 * ((e - f) * j + c) + 3] || !k[4 * ((e + f) * j + c) + 3] || !k[4 * ((e + f) * j + (c + f)) + 3] || !k[4 * ((e - f) * j + (c - f)) + 3] || !k[4 * ((e + f) * j + (c - f)) + 3] || !k[4 * ((e - f) * j + (c + f)) + 3]) {
      k[4 * (e * j + c)] *= 0.1 * (f - 1);
      k[4 * (e * j + c) + 1] *= 0.1 * (f - 1);
      k[4 * (e * j + c) + 2] *= 0.1 * (f - 1);
      break
   }
   return b
}

function CGround(a) {
   var b = MapNumberToObject(a),
       a = this.canvas = document.getElementById("ground_canvas"),
       d = b.w,
       c = b.h;
   this.w = a.width = d;
   this.h = a.height = c;
   $("#ground_canvas").css({
      width: d,
      height: c
   });
   var e = DragonDecompress(b.ground),
       f = a.getContext("2d");
   this.imageData = f.createImageData(d, c);
   BooleanArrayToImageData(e, this.imageData);
   f.putImageData(this.imageData, 0, 0);
   var j = new Image,
       m = this;
   j.onload = function() {
      var a = ImageDataToBooleanArray(m.imageData);
      f.drawImage(j, 0, 0, Math.max(b.w, j.width), Math.max(b.h, j.height));
      m.imageData = f.getImageData(0, 0, d, c);
      BooleanArrayToImageData(a, m.imageData, !0);
      f.putImageData(m.imageData, 0, 0)
   };
   j.src = -1 == b.fg.indexOf("/") ? "/static/images/maps/" + b.fg + ".jpg" : b.fg;
   a = b.bg; - 1 == a.indexOf("/") && (a = "/static/images/maps/" + a + ".jpg");
   $("#gameScreen").css("background-color", b.bgcolor);
   g_is_game_background ? $("#map_bg").css({
      width: MAP_BACKGROUND_W,
      height: MAP_BACKGROUND_H,
      background: b.bgcolor + " url(" + a + ")"
   }).show() : $("#map_bg").hide()
}
CGround.prototype.IsPixel = function(a, b) {
   return 0 > a || a >= this.w || 0 > b || b >= this.h ? !1 : 0 < this.imageData.data[4 * (b * this.w + a) + 3]
};
CGround.prototype.GetPosForWalking = function(a, b, d) {
   var c = d == PLAYER_LOOK_LEFT ? a - 1 : a + 1;
   if (0 > c || c >= this.w) return {
      x: a,
      y: b,
      stuck: !0
   };
   if (this.IsPixel(c, b)) {
      for (d = b; d > b - 10; d--) if (!this.IsPixel(c, d)) return {
         x: c,
         y: d
      };
      return {
         x: a,
         y: b,
         stuck: !0
      }
   }
   for (d = b + 1; d < this.h; d++) if (this.IsPixel(c, d)) return {
      x: c,
      y: d - 1
   };
   return {
      x: c,
      y: this.h + 100,
      fall_and_die: !0
   }
};
CGround.prototype.GetUnder = function(a, b, d) {
   if (void 0 == this.imageData) throw Error("GetUnder - imageData = undefined");
   for (d = d ? b + d : this.h; b < d; b++) if (this.IsPixel(a, b)) return b - 1
};
CGround.prototype.GetAngle = function(a, b) {
   if (this.IsPixel(a, b)) return debug && console.log("[CGround.GetAngle] IN-GROUND"), 0;
   var d = this.GetUnder(a, b, 10);
   if (void 0 == d) return debug && console.log("[CGround.GetAngle] FALLING"), 0;
   if (d != b) return debug && console.log("[CGround.GetAngle] FLYING"), 0;
   for (var c = d, e = 1, f = d, j = 1, m = 1; 9 >= m; m++) if (d = this.GetUnder(a - m, b - 10, 20), void 0 != d && (c += d, e++), d = this.GetUnder(a + m, b - 10, 20), void 0 != d) f += d, j++;
   return Math.round(RadToAngle(Math.atan2((0 < j ? f / j : b) - (0 < e ? c / e : b), 19)))
};
CGround.prototype.AddGroundHole = function(a, b, d, c) {
   var e, f, j, m, k = d * d,
       p = c * c,
       h, n, o;
   for (e = a - d - 10; e <= a; e++) {
      o = !1;
      for (d = b - c - 10; d < b; d++) if (f = e - a, j = d - b, m = f * f / k + j * j / p, !o && 1.2 > m) {
         if (o = !0, h = e, n = d, j = b - j, this.AddGroundShadowColumn(h, n, j), 0 != f && (h = a - f, this.AddGroundShadowColumn(h, n, j)), 1.2 <= m && o) break
      } else if (1 > m) {
         h = e;
         n = d;
         j = b - j;
         this.AddGroundHoleColumn(h, n, j);
         0 != f && (h = a - f, this.AddGroundHoleColumn(h, n, j));
         break
      }
   }
   this.canvas.getContext("2d").putImageData(this.imageData, 0, 0)
};
CGround.prototype.AddGroundHoleColumn = function(a, b, d) {
   if (!(0 > a || a >= this.w)) if (0 > b && (b = 0), d >= this.h && (d = this.h - 1), !(d < b)) for (var c = this.w, e = b; e <= d; e++) b = 4 * (e * c + a), this.imageData.data[b + 3] = 0
};
CGround.prototype.AddGroundShadowColumn = function(a, b, d) {
   if (!(0 > a || a >= this.w)) if (0 > b && (b = 0), d >= this.h && (d = this.h - 1), !(d < b)) for (var c = this.w, e = b; e <= d; e++) b = 4 * (e * c + a), this.imageData.data[b] /= 2, this.imageData.data[b + 1] /= 2, this.imageData.data[b + 2] /= 2
};
Object.freeze(CGround.prototype);

function CCamera(a, b) {
   var d = MapNumberToObject(a);
   this.min_x = -d.offset_x + 400;
   this.max_x = d.ground_size - 400;
   this.min_y = -d.offset_y + 300;
   this.max_y = d.ground_size - d.offset_y - 300 + 84;
   this.max_y = d.ground_size - d.offset_y - 300 + 84;
   this.bg_aspect_ratio_x = (MAP_BACKGROUND_W - 800) / (d.ground_size - 500);
   this.bg_aspect_ratio_y = (MAP_BACKGROUND_H - 600) / (d.ground_size - 500);
   this.bg_offset_x = d.offset_x;
   this.bg_offset_y = d.offset_y;
   this.onChange = b
}
CCamera.prototype.FocusAt = function(a, b, d, c) {
   var e;
   d && (void 0 == this.x ? d = !1 : (e = Math.sqrt((this.x - a) * (this.x - a) + (this.y - b) - (this.y - b)), 30 > e && (d = !1)));
   a < this.min_x ? a = this.min_x : a > this.max_x && (a = this.max_x);
   b < this.min_y ? b = this.min_y : b > this.max_y && (b = this.max_y);
   this.x = a;
   this.y = b;
   if (c) {
      var f = this;
      $("#camera").promise().done(function() {
         f.Set(a, b, d, e)
      })
   } else this.Set(a, b, d, e)
};
CCamera.prototype.MoveBy = function(a, b, d) {
   this.FocusAt(this.x + a, this.y + b, d)
};
CCamera.prototype.Set = function(a, b, d, c) {
   var a = Math.round(a),
       b = Math.round(b),
       e = -(a - 400),
       f = -(b - 300),
       j = (e - this.bg_offset_x) * this.bg_aspect_ratio_x,
       m = (f - this.bg_offset_y) * this.bg_aspect_ratio_y,
       k = $("#camera"),
       p = $("#map_bg"),
       h = this.onChange;
   d ? (k.stop(!0).animate({
      left: e,
      top: f
   }, {
      duration: c,
      progress: function() {
         if (h) {
            var a = -parseInt(k.css("left")),
                b = -parseInt(k.css("top"));
            h(a, b)
         }
      }
   }), p.stop(!0).animate({
      left: j,
      top: m
   }, c)) : (k.stop(!0).css({
      left: e,
      top: f
   }), p.stop(!0).css({
      left: j,
      top: m
   }), h && h(a - 400, b - 300))
};
Object.freeze(CCamera.prototype);
var START_GAME_PLAYER = Object.freeze({
   n: 0,
   user_id: 1,
   name: 2,
   guild: 3,
   rank: 4,
   x: 5,
   y: 6,
   hp: 7,
   shield: 8,
   shield_regen: 9,
   minang: 10,
   maxang: 11,
   lastturn: 12,
   mobile: 13,
   avatars: 14,
   aim_s1_ang: 15,
   aim_s1_len: 16,
   aim_s2_ang: 17,
   aim_s2_len: 18,
   aim_ss_ang: 19,
   aim_ss_len: 20
});
g_dirty = new Image;
g_dirty.src = "//2.dragonbound.net/static/images/hotlink-ok/trans.gif";

function CPlayer(a, b, d, c) {
   if (void 0 == a) throw Error("CPlayer - bad arguments", a);
   this.x = a[START_GAME_PLAYER.x];
   this.y = a[START_GAME_PLAYER.y];
   this.look = PLAYER_LOOK_LEFT;
   this.minang = a[START_GAME_PLAYER.minang];
   this.maxang = a[START_GAME_PLAYER.maxang];
   this.ang = random(this.minang, this.maxang);
   this.team = 0 == a[START_GAME_PLAYER.n] % 2 ? "A" : "B";
   this.hp = this.maxhp = a[START_GAME_PLAYER.hp];
   this.shield = this.maxshield = a[START_GAME_PLAYER.shield];
   this.shield_regen = a[START_GAME_PLAYER.shield_regen];
   this.rank = a[START_GAME_PLAYER.rank];
   this.mobile = a[START_GAME_PLAYER.mobile];
   this.guild = a[START_GAME_PLAYER.guild];
   this.delay = this.delay_before = 0;
   this.lastturn = a[START_GAME_PLAYER.lastturn];
   this.mobile = a[START_GAME_PLAYER.mobile];
   this.aim = [new Vector(a[START_GAME_PLAYER.aim_s1_ang], a[START_GAME_PLAYER.aim_s1_len]), new Vector(a[START_GAME_PLAYER.aim_s2_ang], a[START_GAME_PLAYER.aim_s2_len]), new Vector(a[START_GAME_PLAYER.aim_ss_ang], a[START_GAME_PLAYER.aim_ss_len])];
   this.is_me = b;
   this.user_id = a[START_GAME_PLAYER.user_id];
   this.name = a[START_GAME_PLAYER.name];
   this.player_number_in_game = a[START_GAME_PLAYER.n];
   this.is_alive = !0;
   this.last_sent_look = this.last_sent_y = this.last_sent_x = void 0;
   this.ground = d;
   this.avatars = a[START_GAME_PLAYER.avatars];
   this.dn = c;
   this.isInView = !1;
   this.Init()
}
CPlayer.prototype.Chat = function(a, b) {
   var d = this.divBalloon,
       c = this.divBalloonTip;
   4 == b ? d.addClass("bg1") : d.removeClass("bg1");
   5 == b ? d.addClass("bg2") : d.removeClass("bg2");
   d.removeClass("text_anim");
   c.removeClass("text_anim");
   setTimeout(function() {
      d.html(a);
      d.addClass("text_anim");
      c.addClass("text_anim")
   }, 20)
};
CPlayer.prototype.Shoot = function(a, b, d) {
   this.dn.SendPlayerShoot(this.x, this.y, this.body, this.look, this.ang, a, b, d);
   a = (this.look == PLAYER_LOOK_LEFT ? 180 - this.ang : this.ang) - this.body;
   b = $("#LastAngleDigit-");
   90 < a && (a = 180 - a);
   0 > a ? (b.show(), a *= -1) : b.hide();
   $("#LastAngleDigit1").removeClass().addClass("LastAngleDigit LastAngleDigit" + Math.floor(a / 10));
   $("#LastAngleDigit2").removeClass().addClass("LastAngleDigit LastAngleDigit" + a % 10)
};
CPlayer.prototype.PassTurn = function(a) {
   this.dn.SendPlayerPassTurn(this.x, this.y, this.body, this.look, this.ang, a)
};
CPlayer.prototype.SendPosUpdate = function() {
   if (this.x != this.last_sent_x || this.y != this.last_sent_y || this.look != this.last_sent_look) this.dn.SendPlayerMove(this.x, this.y, this.body, this.look, this.ang), this.last_sent_x = this.x, this.last_sent_y = this.y, this.last_sent_look = this.look
};
CPlayer.prototype.UseItem = function(a) {
   this.dn.SendPlayerUseItem(a)
};
CPlayer.prototype.UpdateHpShieldGraphic = function() {
   var a = this.maxhp + this.maxshield,
       b = 76 * this.hp / a,
       a = 76 * this.shield / a;
   this.divHp.css({
      backgroundColor: "#63b64a",
      width: b
   });
   this.divShield.css({
      width: a,
      left: b
   })
};
CPlayer.prototype.CreateDivs = function() {
   this.divHp = $("<div/>", {
      style: "position: absolute;top: 0;left: 0;height: 3px;background-color: #63b64a;width: 76px;transition: all 1.25s ease-in-out;-webkit-transition: all 1.25s ease-in-out;-moz-transition: all 1.25s ease-in-out;"
   });
   this.divShield = $("<div/>", {
      style: "position: absolute;top: 0;left: 0;height: 3px;background-color: #0000ff;width: 0;transition: all 1.25s ease-in-out;-webkit-transition: all 1.25s ease-in-out;-moz-transition: all 1.25s ease-in-out;"
   });
   this.divMobile = $("<div/>", {
      style: "position: absolute;background-repeat: no-repeat;"
   });
   this.ani_image = new CPlayerGraphic(this.divMobile, this.mobile, this.avatars[0], this.avatars[1], this.avatars[2], this.avatars[3], !1);
   if (this.is_me) {
      var a = $("#MyAngle");
      this.aimCircleCanvas = $('<canvas style="position: absolute;margin-left: -43px;margin-top: -43px;" width="86" height="86"/>');
      this.aimCircleContext = this.aimCircleCanvas[0].getContext("2d");
      this.myAngleContext = a[0].getContext("2d");
      this.divMobile.append(this.aimCircleCanvas);
      this.angOX = random(0, 6);
      this.angOY = random(0, 2);
      var b = random(-20, 20);
      a.css("-webkit-filter", "hue-rotate(" + b + "deg)");
      var d = this,
          a = this.aimCircleImage = new Image;
      a.onload = function() {
         d.UpdateGuiAngle();
         d.DrawPlayerAngle()
      };
      a.src = GetBackgroundImageUrl("#gameui")
   } else a = $('<canvas style="position: absolute;margin-left: -43px;margin-top: -43px;" width="86" height="86"/>'), this.divMobile.append(a);
   this.divReducedDef = $("<div/>", {
      style: "position: absolute;top: -6px;left: 30px;font-size: 11px;color: #9cffde;text-shadow: #0066ff -1px 0 1px, #0066ff 0 1px 1px, #0066ff 1px 0 1px, #0066ff 0 -1px 1px;"
   });
   this.divIon = $("<div/>", {
      style: "position: absolute;"
   });
   a = MOBILES[this.mobile];
   a.ion_file && (this.ion = new CAnimatedObject2("mobiles/" + a.ion_file + ".png", a.ion_graphics, 0, 0, this.divIon, 1, ANIMATIONS_FPS, this.flip, LOOP_NORMAL, 0, 2, !0), this.SetIon(90, 0, -200));
   this.divTurn = $("<div/>", {
      "class": "Turn"
   });
   this.divBalloon = $("<div/>", {
      "class": "GamePlayerBalloon"
   });
   this.divBalloonTip = $("<div/>", {
      "class": "GamePlayerBalloonTip"
   });
   this.divPlayer = $("<div/>", {
      style: "position:absolute;width:160px;-webkit-transform:translate3d(0px,0px,0px);"
   }).append(this.divMobile).append($("<div/>", {
      style: "position:absolute;left:-10px;top:17px;width:120px;font-family:arial;font-size:12px;" + ("A" == this.team ? "color: #FF9f6B;text-shadow:#734529 -1px 0 1px, #734529 0 1px 1px, #734529 1px 0 1px, #734529 0 -1px 1px;" : "color: #BDCFCF;text-shadow:#394d6b -1px 0 1px, #394d6b 0 1px 1px, #394d6b 1px 0 1px, #394d6b 0 -1px 1px;"),
      "class": "blackShadow"
   }).html(this.nameHtml)).append($("<div/>", {
      "class": "PlayerRank rank rank" + this.rank
   })).append(this.divReducedDef).append($("<div/>", {
      style: "position: absolute;top: 10px;left: -40px;width: 76px;height: 3px;border: 1px solid white;background-color: #292c29;z-index: 1;"
   }).append(this.divHp).append(this.divShield)).append(this.divTurn).append(this.divIon).append(this.divBalloon).append(this.divBalloonTip)
};
CPlayer.prototype.AddToDom = function() {
   !this.isInDom && this.is_alive && (this.divPlayer.css({
      left: this.x,
      top: this.y
   }).insertBefore("#game_objects"), this.isInDom = !0)
};
CPlayer.prototype.RemoveFromDom = function() {
   this.isInDom && (this.divBalloon.removeClass("text_anim"), this.divBalloonTip.removeClass("text_anim"), this.divPlayer.css({
      left: random(-9E3, -5E3),
      top: random(-9E3, -5E3)
   }).remove(), this.isInDom = void 0)
};
CPlayer.prototype.Init = function() {
   this.nameHtml = BuildPlayerNameWithGuild(this.guild, this.name, this.team);
   this.CreateDivs();
   this.UpdateHpShieldGraphic();
   this.SetReducedDefence(0);
   this.ChangedShot(GetSelectedShotType());
   this.Fall();
   this.divMobile.css({
      scaleX: 1,
      scaleY: 1
   });
   this.ChangeAngleTo(this.ang, !0)
};
CPlayer.prototype.Remove = function() {
   this.ani_image.remove();
   this.ion && this.ion.remove();
   this.RemoveFromDom()
};
CPlayer.prototype.Walk = function(a) {
   this.Look(a);
   var b = this.body,
       b = this.ground.GetPosForWalking(this.x, this.y, a);
   if (b.fall_and_die || b.stuck) return !1;
   this.x = b.x;
   this.y = b.y;
   this.divPlayer.css({
      left: b.x,
      top: b.y
   });
   b = this.ground.GetAngle(b.x, b.y);
   a = this.divMobile;
   this.body != b && (this.body = b, this.UpdateGuiAngle(), 0 == a.queue("fx") ? a.css({
      rotate: this.body + "deg",
      scaleX: this.look == PLAYER_LOOK_LEFT ? 1 : -1
   }) : a.css({
      rotate: this.body + "deg"
   }));
   return !0
};
CPlayer.prototype.SetIon = function(a, b, d, c) {
   var e = this.divIon;
   void 0 != a && e.css({
      rotate: -a + "deg"
   });
   void 0 != b && (void 0 != d && void 0 != c) && e.animate({
      left: b,
      top: d
   }, c)
};
CPlayer.prototype.EnterView = function() {
   this.isInView = !0;
   this.AddToDom()
};
CPlayer.prototype.ExitView = function() {
   this.isInView = !1;
   this.RemoveFromDom()
};
CPlayer.prototype.OnCameraUpdate = function(a, b) {
   var d = this.x > a - 80 && this.x < a + 880 && this.y > b - 80 && this.y < b + 680;
   this.isInView && !d ? this.ExitView() : !this.isInView && d && this.EnterView()
};
CPlayer.prototype.Look = function(a) {
   this.look != a && (a == PLAYER_LOOK_LEFT ? this.look = PLAYER_LOOK_LEFT : a == PLAYER_LOOK_RIGHT && (this.look = PLAYER_LOOK_RIGHT), a = this.divMobile, a.stop(), a.animate({
      scaleX: this.look == PLAYER_LOOK_LEFT ? 1 : -1
   }, 300), this.UpdateGuiAngle())
};
CPlayer.prototype.ChangeAngleTo = function(a, b) {
   a > this.maxang && (a = this.maxang);
   a < this.minang && (a = this.minang);
   if (this.ang != a || b) this.ang = a, this.UpdateGuiAngle(), this.DrawPlayerAngle()
};
CPlayer.prototype.UpdateGuiAngle = function() {
   if (this.is_me) {
      var a = (this.look == PLAYER_LOOK_LEFT ? 180 - this.ang : this.ang) - this.body;
      90 < a && (a = 180 - a);
      var b = this.myAngleContext,
          d = this.aimCircleImage;
      b.clearRect(0, 0, 43, 15);
      d && (0 > a && (b.drawImage(d, 801, 154, 13, 13, 0 + this.angOX, 0 + this.angOY, 13, 13), a *= -1), b.drawImage(d, 801, 14 * Math.floor(a / 10) + 14, 13, 13, 13 + this.angOX, 0 + this.angOY, 13, 13), b.drawImage(d, 801, 14 * (a % 10) + 14, 13, 13, 26 + this.angOX, 0 + this.angOY, 13, 13), b.drawImage(g_dirty, -1, -1, 1, 1))
   }
};
CPlayer.prototype.DrawPlayerAngle = function() {
   if (this.is_me) {
      var a = this.aimCircleContext,
          b = this.aimCircleImage;
      a.clearRect(0, 0, 86, 86);
      a.save();
      b && a.drawImage(b, 483, 116, 86, 86, 0, 0, 86, 86);
      a.translate(43, 43);
      a.beginPath();
      a.arc(0, 0, 28, AngleToRad(180 + this.minang), AngleToRad(180 + this.maxang));
      a.lineWidth = 25;
      a.strokeStyle = "rgba(0,220,0,0.5)";
      a.stroke();
      a.rotate(AngleToRad(180 + this.ang));
      b && a.drawImage(b, 526, 213, 43, 5, 0, -2, 43, 5);
      a.restore();
      a.drawImage(g_dirty, -1, -1, 1, 1)
   }
};
CPlayer.prototype.Fall = function() {
   if (this.is_alive) {
      var a = this.ground.GetUnder(this.x, this.y);
      if (void 0 == a) {
         debug && console.log("Player fall and die");
         this.y = 2E3;
         var b = this;
         this.divPlayer.animate({
            top: this.y
         }, 4E3, "linear", function() {
            $(b).hide()
         });
         this.is_alive = !1
      } else if (a != this.y && (this.y = a, this.divPlayer.animate({
         top: this.y
      }, 500)), a = this.ground.GetAngle(this.x, this.y), a != this.body) this.body = a, this.divMobile.css("rotate", this.body + "deg"), this.UpdateGuiAngle()
   }
};
CPlayer.prototype.MoveTo = function(a, b, d, c) {
   if (this.is_alive) if (void 0 != d && this.look != d && (this.look = d, this.divMobile.css("scaleX", d == PLAYER_LOOK_LEFT ? 1 : -1)), this.x = a, this.y = b, c) this.divPlayer.stop(!0).css({
      left: a,
      top: b
   }), this.Fall();
   else {
      var e = this;
      this.divPlayer.stop(!0).animate({
         left: a,
         top: b
      }, 1E3, function() {
         e.Fall()
      })
   }
};
CPlayer.prototype.ChangeHPShield = function(a, b, d, c) {
   if (!(this.hp == a && this.shield == b)) {
      void 0 == b && (b = 0);
      var e = this.hp - a + (this.shield - b);
      if (!(c && 0 >= e) && (c = this.hp == a, this.hp = a, this.shield = b, void 0 == d && console.log("******* turn_number = undefined"), a = this.maxhp + this.maxshield, b = 76 * this.hp / a, 0 < this.maxshield && this.divShield.css({
         width: 76 * this.shield / a,
         left: b
      }), new CDamageEffect(this.x - 30, this.y - 30, -e, this.player_number_in_game, d, c), 0 > this.hp && (this.is_alive = !1), !c)) {
         var f = this;
         this.divHp.css({
            backgroundColor: 0.3 >= this.hp / this.maxhp ? "#c61000" : "#63b64a",
            width: b
         });
         this.is_alive || this.divPlayer.animate({
            opacity: 0
         }, 1500, function() {
            f.RemoveFromDom()
         })
      }
   }
};
CPlayer.prototype.ReduceHPby = function(a, b) {
   if (this.is_alive) {
      var d = this.shield,
          c = this.hp,
          d = d - a;
      0 > d && (c += d, d = 0);
      this.ChangeHPShield(c, d, b, !0)
   }
};
CPlayer.prototype.SetReducedDefence = function(a) {
   this.divReducedDef.html(0 == a ? "" : "-" + a + " DEF")
};
CPlayer.prototype.ChangeAliveTo = function(a) {
   if (!0 == this.is_alive && !1 == a) {
      debug && console.log("[CPlayer.ChangeAliveTo] player", this.name, "died");
      this.is_alive = !1;
      var b = this.divPlayer;
      b.animate({
         opacity: 0
      }, 1500, "linear", function() {
         b.hide()
      })
   }
};
CPlayer.prototype.ChangeMyTurn = function(a) {
   var b = this.divTurn;
   a ? g_graphics_high ? b.css({
      bottom: 100,
      "background-position": "-144px -159px",
      height: 29
   }).slideDown("slow") : b.css({
      bottom: 100,
      "background-position": "-144px -159px",
      height: 29
   }).show() : g_graphics_high ? b.stop(!0).css("height", 29).slideUp("slow").hide() : b.stop(!0).css("height", 29).hide()
};
CPlayer.prototype.RegenShield = function(a) {
   if (this.is_alive && !(0 >= this.shield_regen) && this.shield < this.maxshield) {
      var b = Math.min(this.shield_regen, this.maxshield - this.shield);
      this.ChangeHPShield(this.hp, this.shield + b, a, !1)
   }
};
CPlayer.prototype.ChangeDelay = function(a, b) {
   a != this.delay && (this.delay_before = this.delay, this.delay = a);
   this.lastturn = b
};
CPlayer.prototype.ChangedShot = function(a) {
   var b = this.aim[a];
   this.aimCircleCanvas && this.aimCircleCanvas.css({
      left: -b.x,
      top: b.y
   });
   this.ion && this.SetIon(void 0, 0, 1 == a ? -600 : -200, 500)
};
CPlayer.prototype.TeleportTo = function(a, b) {
   this.MoveTo(a, b)
};
Object.freeze(CPlayer.prototype);
var g_options_map = MAP_RANDOM,
    g_custom_map, g_max_players = 8,
    g_game_mode = GAME_MODE_NORMAL,
    g_add_bot_to_slot, RANK_FOR_DISABLE_TELE = 11,
    RANK_FOR_DISABLE_S1 = 9,
    RANK_FOR_RANDOM_TEAMS = 7;

function RoomGUI(a) {
   function b() {
      for (var a = 0; a < d.length; a++) d[a].remove();
      d = [];
      $(".mobileSelectBtn").remove();
      $("#roomMobileSelect").hide()
   }
   $("#roomChat").tinyscrollbar({
      size: 58
   });
   $("#roomButtonBack").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendRoomLeave()
   });
   $("#roomButtonReady").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      CheckBrowserAbilities(!0) && (AutoReadyStop(), a.SendRoomChangeReady(!a.myPlayerInfo.is_ready))
   });
   $("#roomButtonStart").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      CheckBrowserAbilities(!0) && a.SendRoomGameStart()
   });
   $("#roomButtonChangeTeam").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendRoomChangeTeam("A" == a.myPlayerInfo.team ? "B" : "A")
   });
   var d = [];
   $("#roomButtonMobile").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      for (var c = $("#roomMobileSelect").slideDown(), e = FIRST_SELECTABLE_MOBILE; e <= LAST_SELECTABLE_MOBILE; e++)(function() {
         var f = e,
             j = MOBILES[e],
             m = $('<div class="mobileSelectBtn glow_button"><div class="mobileName">' + j.name + "</div></div>").click(function() {
               a.SendRoomChangeMobile(f);
               b()
            }).appendTo(c),
             k = j.file && -1 == j.file.indexOf("/") ? "mobiles/" + j.file + ".png" : j.file,
             j = new CAnimatedObject2(k, j.graphics, 35, 55, m, 1, ANIMATIONS_FPS, !0, LOOP_NORMAL, 0, 1, !0);
         d.push(j)
      })()
   });
   $("#roomMobileSelectCancel").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      b()
   });
   $(".playerInRoom").click(function() {
      AddToChatInput($(this).children(".roomPlayerName").html().split("</span> ").pop().replace("&amp;", "&").replace("&gt;", ">").replace("&lt;", "<"))
   });
   $("#itemDual").click(function() {
      RoomSelectItem(ITEM_DUAL)
   });
   $("#itemTeleport").click(function() {
      $(this).hasClass("grayscale") || RoomSelectItem(ITEM_TELEPORT)
   });
   $("#itemSlot0").click(function() {
      RoomRemoveItemFromSlot(0)
   });
   $("#itemSlot1").click(function() {
      RoomRemoveItemFromSlot(1)
   });
   $("#itemSlot2").click(function() {
      RoomRemoveItemFromSlot(2)
   });
   $("#itemSlot3").click(function() {
      RoomRemoveItemFromSlot(3)
   });
   $("#itemSlot4").click(function() {
      RoomRemoveItemFromSlot(4)
   });
   $("#itemSlot5").click(function() {
      RoomRemoveItemFromSlot(5)
   });
   $("#roomInput").bind("keyup", function(b) {
      13 == b.which && "" != this.value && (b = this.value, this.value = "", a.SendChat(b))
   });
   $("#room_change_title_button").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.myPlayerInfo.is_master ? (FadeInDialog("dialog_change_title_div"), $("#room_change_title_input").focus()) : DragonDialogOpen(l.t("Not Room Master"), l.t("Sorry, only the room master can change the room title."), 1)
   });
   $("#room_options_button").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.myPlayerInfo.is_master ? (FixRoomOptionsDialog(a.myPlayerInfo.rank), FadeInDialog("dialog_room_options")) : DragonDialogOpen(l.t("Not Room Master"), l.t("Sorry, only the room master can change the room options."), 1)
   });
   $("#dialog_change_title_cancel").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("dialog_change_title_div")
   });
   $("#dialog_change_title_ok").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendRoomChangeTitle($("#room_change_title_input").val());
      ExplodeDialog("dialog_change_title_div")
   });
   $(".roomBotSelect").click(function(b) {
      b.stopPropagation();
      $("#select_bot_div").is(":visible") ? $("#select_bot_div").slideUp(g_graphics_high ? "slow" : 0) : (AudioPlay(AUDIO_BUTTON_SELECT2), b = Number($(this).parent().attr("id")[12]), OpenBotSelectDialog(b, a))
   });
   $(".roomBotRemove").click(function(b) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      b.stopPropagation();
      b = Number($(this).parent().attr("id")[12]);
      a.SendSelectBot(b, -1)
   });
   $("#add_bot_button").click(function(b) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      b.stopPropagation();
      OpenBotSelectDialog(g_add_bot_to_slot, a)
   });
   $("body").click(function() {
      $("#select_bot_div").is(":visible") && $("#select_bot_div").slideUp(g_graphics_high ? "slow" : 0)
   });
   $(".roomPlayerInfo").click(function(b) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      InfoDialogOpenFor($(this).attr("user_id"), a);
      b.stopPropagation()
   });
   $("#infoClose").click(function(a) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("playerInfoDialog");
      a.stopPropagation()
   });
   $("#infoAddBuddy").click(function(b) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendAddFriendRequest($(this).attr("user_id"));
      b.stopPropagation()
   });
   $("#infoGuildInvite").click(function(b) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendGuildInviteRequest($(this).attr("user_id"));
      b.stopPropagation()
   });
   $("#infoChat").click(function(b) {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ChatDialogCreate($(this).attr("user_id"), $("#infoName").html(), a);
      b.stopPropagation()
   });
   $("#room_item_buddy_tab").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var b = $("#room_item_buddy_tab");
      b.hasClass("BuddyList") ? (RoomTabChangeTo(TAB_GUILD), a.SendTabWatch(2), 0 == $("#guildMembersListHtml").children().length && a.SendRefreshGuildies()) : b.hasClass("Guild") ? (RoomTabChangeTo(TAB_ALL), a.SendTabWatch(0)) : (RoomTabChangeTo(TAB_FRIENDS), a.SendTabWatch(1), 0 == $("#friendsListHtml").children().length && a.SendRefreshFriends())
   });
   $("#roomButtonVideoChat").click(function() {
      var b = a.myPlayerInfo.game_id,
          d = SERVER_TYPE.toUpperCase() + (Number(a.server) + 1) + "-" + a.myPlayerInfo.room_number;
      DragonVideoButton(b, d)
   });
   RoomOptionsDialogGUI(a)
}

function RoomTabChangeTo(a) {
   var b = $("#itemSlot0,#itemSlot1,#itemSlot2,#itemSlot3,#itemSlot4,#itemSlot5,#itemDual,#itemTeleport,#roomInfo5,#roomInfo6");
   a == TAB_ALL ? ($("#room_item_buddy_tab").removeClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").hide(), $("#friendsListExtra").hide(), $("#guildRoomTabExtra").hide(), b.show()) : a == TAB_FRIENDS ? ($("#room_item_buddy_tab").removeClass("Guild").addClass("BuddyList"), $("#friendsList").show(), $("#guildMembersList").hide(), $("#friendsListExtra").show(), $("#guildRoomTabExtra").hide(), b.hide()) : a == TAB_GUILD && ($("#room_item_buddy_tab").addClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").show(), $("#friendsListExtra").hide(), $("#guildRoomTabExtra").show(), b.hide())
}

function RoomOptionsPressedOK(a) {
   var b, d;
   b = $("#RoomOptionsPlayers");
   b = b.hasClass("players1v1") ? 2 : b.hasClass("players2v2") ? 4 : b.hasClass("players3v3") ? 6 : b.hasClass("players1vB") ? 1 : b.hasClass("players2vB") ? 2 : b.hasClass("players3vB") ? 3 : b.hasClass("players4vB") ? 4 : 8;
   d = $("#RoomOptionsMode").hasClass("gameModeNormal") ? GAME_MODE_NORMAL : $("#RoomOptionsMode").hasClass("gameModeSame") ? GAME_MODE_SAME : GAME_MODE_BOSS;
   var c = "ON" == $("#RoomOptionsAvatars").html() ? 1 : 0,
       e = Number($("#RoomOptionsWind").html()),
       f = $("#RoomOptionsS1").hasClass("grayscale"),
       j = $("#RoomOptionsTele").hasClass("grayscale"),
       m = !$("#RoomOptionsRandomTeams").hasClass("grayscale");
   a.SendRoomOptions(b, d, g_options_map, c, e, g_custom_map, f, j, m)
}

function FixRoomOptionsDialog(a) {
   var b = $("#RoomOptionsRandomTeamsLock, #RoomOptionsRandomTeamsRank");
   a < RANK_FOR_RANDOM_TEAMS ? b.show() : b.hide();
   b = $("#RoomOptionsS1Lock, #RoomOptionsS1Rank");
   a < RANK_FOR_DISABLE_S1 ? b.show() : b.hide();
   b = $("#RoomOptionsTeleLock, #RoomOptionsTeleRank");
   a < RANK_FOR_DISABLE_TELE ? b.show() : b.hide();
   $("#RoomOptionsMode").hasClass("gameModeBoss") ? ($("#RoomOptionsAvatarsPrev, #RoomOptionsAvatarsNext").hide(), $("#RoomOptionsAvatars").html("ON").css("color", "#00ff00"), $("#RoomOptionsAvatarsGP").html(""), g_options_map == MAP_CUSTOM ? $("#RoomOptionsMapPrev, #RoomOptionsMapNext").show() : $("#RoomOptionsMapPrev, #RoomOptionsMapNext").hide(), g_options_map != MAP_RANDOM && g_options_map != MAP_CUSTOM && (g_options_map = MAP_RANDOM, $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * g_options_map - 50) + "px"), $("#RoomOptionsMapName").html(GetMapName(g_options_map))), $("#RoomOptionsS1, #RoomOptionsTele").removeClass("grayscale"), $("#RoomOptionsRandomTeams").addClass("grayscale").html("[ ] Random Teams"), $("#RoomOptionsS1Lock, #RoomOptionsTeleLock, #RoomOptionsRandomTeamsLock").show()) : ($("#RoomOptionsAvatarsPrev, #RoomOptionsAvatarsNext").show(), $("#RoomOptionsMapPrev, #RoomOptionsMapNext").show(), 28 > g_server_version && $("#RoomOptionsS1Lock, #RoomOptionsTeleLock, #RoomOptionsRandomTeamsLock").show())
}

function RoomOptionsDialogGUI(a) {
   $("#RoomOptionsCancel").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_graphics_high ? $("#dialog_room_options").effect("explode") : $("#dialog_room_options").hide()
   });
   $("#RoomOptionsOK").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      RoomOptionsPressedOK(a);
      g_graphics_high ? $("#dialog_room_options").effect("explode") : $("#dialog_room_options").hide()
   });
   $("#RoomOptionsNumPlayersPrev").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var a = $("#RoomOptionsPlayers"),
          d;
      d = $("#RoomOptionsMode").hasClass("gameModeBoss") ? a.hasClass("players1vB") ? "players4vB" : a.hasClass("players2vB") ? "players1vB" : a.hasClass("players3vB") ? "players2vB" : "players3vB" : a.hasClass("players1v1") ? "players4v4" : a.hasClass("players2v2") ? "players1v1" : a.hasClass("players3v3") ? "players2v2" : "players3v3";
      a.removeClass().addClass(d)
   });
   $("#RoomOptionsNumPlayersNext").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var a = $("#RoomOptionsPlayers"),
          d;
      d = $("#RoomOptionsMode").hasClass("gameModeBoss") ? a.hasClass("players1vB") ? "players2vB" : a.hasClass("players2vB") ? "players3vB" : a.hasClass("players3vB") ? "players4vB" : "players1vB" : a.hasClass("players1v1") ? "players2v2" : a.hasClass("players2v2") ? "players3v3" : a.hasClass("players3v3") ? "players4v4" : "players1v1";
      a.removeClass().addClass(d)
   });
   $("#RoomOptionsModeNext").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var b = $("#RoomOptionsMode"),
          b = b.hasClass("gameModeNormal") ? GAME_MODE_BOSS : b.hasClass("gameModeBoss") ? GAME_MODE_SAME : GAME_MODE_NORMAL;
      RoomOptionsChangeMode(b, a.myPlayerInfo.unlock, a.myPlayerInfo.rank)
   });
   $("#RoomOptionsModePrev").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var b = $("#RoomOptionsMode"),
          b = b.hasClass("gameModeNormal") ? GAME_MODE_SAME : b.hasClass("gameModeBoss") ? GAME_MODE_NORMAL : GAME_MODE_BOSS;
      RoomOptionsChangeMode(b, a.myPlayerInfo.unlock, a.myPlayerInfo.rank)
   });
   $("#RoomOptionsMapPrev").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#RoomOptionsMode").hasClass("gameModeBoss") ? (g_options_map = MAP_RANDOM, $("#RoomOptionsMapPrev, #RoomOptionsMapNext").hide()) : (g_options_map--, g_options_map < MAP_RANDOM && (g_options_map = LAST_SELECTABLE_MAP));
      $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * g_options_map - 50) + "px");
      $("#RoomOptionsMapName").html(GetMapName(g_options_map))
   });
   $("#RoomOptionsMapNext").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#RoomOptionsMode").hasClass("gameModeBoss") ? (g_options_map = MAP_RANDOM, $("#RoomOptionsMapPrev, #RoomOptionsMapNext").hide()) : (g_options_map++, g_options_map > LAST_SELECTABLE_MAP && (g_options_map = MAP_RANDOM));
      $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * g_options_map - 50) + "px");
      $("#RoomOptionsMapName").html(GetMapName(g_options_map))
   });
   $("#RoomOptionsAvatarsPrev, #RoomOptionsAvatarsNext").click(function() {
      if (!$("#RoomOptionsMode").hasClass("gameModeBoss")) {
         AudioPlay(AUDIO_BUTTON_SELECT2);
         var a = $("#RoomOptionsAvatars");
         "OFF" == a.html() ? (a.html("ON").css("color", "#00ff00"), $("#RoomOptionsAvatarsGP").html("+10% GP")) : (a.html("OFF").css("color", "#ff0000"), $("#RoomOptionsAvatarsGP").html(""))
      }
   });
   $("#RoomOptionsWindNext").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var a = $("#RoomOptionsWind"),
          d = Number(a.html()),
          c;
      0 == d ? (d = 12, c = 5) : 12 == d ? (d = 26, c = 10) : 26 == d ? (d = 50, c = 15) : c = d = 0;
      a.html(d).css("color", 0 == d ? "#ff0000" : "#00ff00");
      $("#RoomOptionsWindGP").html(0 == c ? "" : "+" + c + "% GP")
   });
   $("#RoomOptionsWindPrev").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var a = $("#RoomOptionsWind"),
          d = Number(a.html()),
          c;
      0 == d ? (d = 50, c = 15) : 50 == d ? (d = 26, c = 10) : 26 == d ? (d = 12, c = 5) : c = d = 0;
      a.html(d).css("color", 0 == d ? "#ff0000" : "#00ff00");
      $("#RoomOptionsWindGP").html(0 == c ? "" : "+" + c + "% GP")
   });
   $("#RoomOptionsTele").click(function() {
      if (28 > g_server_version) alertify.alert(l.t("This server does not support this feature yet.<br>For now you can try it on Server 13 at DragonBound Global."));
      else {
         var b = $(this);
         b.hasClass("grayscale") ? b.removeClass("grayscale") : !$("#RoomOptionsMode").hasClass("gameModeBoss") && a.myPlayerInfo.rank >= RANK_FOR_DISABLE_TELE && b.addClass("grayscale")
      }
   });
   $("#RoomOptionsS1").click(function() {
      if (28 > g_server_version) alertify.alert(l.t("This server does not support this feature yet.<br>For now you can try it on Server 13 at DragonBound Global."));
      else {
         var b = $(this);
         b.hasClass("grayscale") ? b.removeClass("grayscale") : !$("#RoomOptionsMode").hasClass("gameModeBoss") && a.myPlayerInfo.rank >= RANK_FOR_DISABLE_S1 && b.addClass("grayscale")
      }
   });
   $("#RoomOptionsRandomTeams").click(function() {
      if (28 > g_server_version) alertify.alert(l.t("This server does not support this feature yet.<br>For now you can try it on Server 13 at DragonBound Global."));
      else {
         var b = $(this);
         b.hasClass("grayscale") && !$("#RoomOptionsMode").hasClass("gameModeBoss") && a.myPlayerInfo.rank >= RANK_FOR_RANDOM_TEAMS ? b.removeClass("grayscale").html("[X] Random Teams") : b.addClass("grayscale").html("[ ] Random Teams")
      }
   });
   DragonMapCreator()
}

function RoomOptionsChangeMode(a, b, d) {
   var c = $("#RoomOptionsMode"),
       e, f = $("#RoomOptionsPlayers"),
       j;
   a == GAME_MODE_BOSS ? (e = "gameModeBoss", j = f.hasClass("players1v1") ? "players1vB" : f.hasClass("players2v2") ? "players2vB" : f.hasClass("players3v3") ? "players3vB" : "players4vB") : (e = a == GAME_MODE_SAME ? "gameModeSame" : "gameModeNormal", j = f.hasClass("players1v1") ? "players1v1" : f.hasClass("players2v2") ? "players2v2" : f.hasClass("players3v3") ? "players3v3" : f.hasClass("players1vB") ? "players1v1" : f.hasClass("players2vB") ? "players2v2" : f.hasClass("players3vB") ? "players3v3" : "players4v4", "ON" == $("#RoomOptionsAvatars").html() && $("#RoomOptionsAvatarsGP").html("+10% GP"));
   c.removeClass().addClass(e);
   f.removeClass().addClass(j);
   $("#RoomOptionsModeIcon").removeClass().addClass("iconMode" + e.slice(8));
   if ("gameModeNormal" == e && 1 > b) $("#RoomOptionsModeLocked").show(), $("#RoomOptionsMessage").html(l.t("This mode is locked until you win at BOSS mode as room master.")), $("#RoomOptionsOK").hide();
   else if ("gameModeSame" == e && 12 > b) $("#RoomOptionsModeLocked").show(), $("#RoomOptionsMessage").html(l.t("This mode is locked until you win *ALL* BOSS mode levels as room master.")), $("#RoomOptionsOK").hide();
   else {
      $("#RoomOptionsModeLocked").hide();
      $("#RoomOptionsOK").show();
      var m;
      a == GAME_MODE_NORMAL ? m = l.t("Kill the other team to win.") : a == GAME_MODE_BOSS ? m = l.t("Fight computer players at increasing difficulty.") : a == GAME_MODE_SAME && (m = l.t("Everyone use the same mobile as the room master."));
      $("#RoomOptionsMessage").html(m)
   }
   FixRoomOptionsDialog(d)
}

function InfoDialogOpenFor(a, b) {
   $("#infoChat").attr("user_id", a);
   $("#infoAddBuddy").attr("user_id", a);
   $("#infoGuildInvite").attr("user_id", a);
   $("#infoName").html("");
   $("#infoRanking").html("");
   $("#infoGP").html("");
   $("#infoDamage").html("");
   $("#infoWinRate").html("");
   $("#infoGender").html("");
   $("#infoImage").attr("src", "");
   $("#infoRank").removeClass().addClass("rank rank25");
   $("#infoLoading").show();
   FadeInDialog("playerInfoDialog");
   b.SendGetPlayerInfo(a)
}
var INFO_INDEX_USER_ID = 0,
    INFO_INDEX_GAME_ID = 1,
    INFO_INDEX_RANKING = 2,
    INFO_INDEX_RANK = 3,
    INFO_INDEX_GP = 4,
    INFO_INDEX_GENDER = 5,
    INFO_INDEX_FACEBOOK_ID = 6,
    INFO_INDEX_DAMAGE = 7,
    INFO_INDEX_WINRATE = 8,
    INFO_INDEX_WIN = 9,
    INFO_INDEX_LOSE = 10,
    INFO_INDEX_GUILD = 11,
    INFO_INDEX_GUILD_JOB = 12;

function InfoDialogReceiveInfo(a, b) {
   var d = b[INFO_INDEX_GENDER];
   $("#infoLoading").hide();
   $("#infoName").html(b[INFO_INDEX_GAME_ID]);
   24 == b[INFO_INDEX_RANK] ? $("#infoRanking").html("GM") : ($("#infoRanking").html("?"), LoadRanking(1, b[INFO_INDEX_GAME_ID], a));
   $("#infoGP").html(b[INFO_INDEX_GP]);
   $("#infoDamage").html(b[INFO_INDEX_DAMAGE]);
   $("#infoWinRate").html(b[INFO_INDEX_WINRATE]);
   $("#infoGender").html(d == GENDER_MALE ? l.t("Male") : l.t("Female"));
   $("#infoRank").removeClass().addClass("rank rank" + b[INFO_INDEX_RANK]);
   $("#infoWin").html(b[INFO_INDEX_WIN]);
   $("#infoLose").html(b[INFO_INDEX_LOSE]);
   var c = b[INFO_INDEX_GUILD];
   $("#infoGuild").html(c ? '<a href="/guild?name=' + encodeURIComponent(c) + '" target="_blank">' + c + "</a>" : "");
   c = "";
   b[INFO_INDEX_GUILD] && (0 == b[INFO_INDEX_GUILD_JOB] ? c = l.t("Member") : 1 == b[INFO_INDEX_GUILD_JOB] ? c = l.t("Leader") : 2 == b[INFO_INDEX_GUILD_JOB] && (c = l.t("Semi-Leader")));
   $("#infoGuildJob").html(c);
   c = b[INFO_INDEX_FACEBOOK_ID];
   c = "" == c ? d == GENDER_FEMALE ? STATIC_DIR + "images/fb_girl.gif" : STATIC_DIR + "images/fb_boy.gif" : "http://graph.facebook.com/" + c + "/picture?type=large";
   $("#infoImage").attr("src", c)
}

function OpenBotSelectDialog(a, b) {
   var d = b.myPlayerInfo.unlock;
   g_bot_select_for_slot = a;
   for (var c = $("#select_bot_div"), e = "", f, j, m, k, p, h, n, o = 0; o < COMPUTER_PLAYER.length; o++) n = COMPUTER_PLAYER[o], o <= d ? (f = n.rank, j = n.name, m = n.gp, k = n.atk, p = n.def, h = n.life, n = n.dig) : (f = 25, j = "???", m = n.gp, k = p = h = n = "??"), e += '<div class="bs_line" id=' + o + '> <div class="bs_rank rank rank' + f + '"></div> <div class="bs_name">' + j + '</div> <div class="bs_gp">GP:' + m + "</div>", e += '<div class="bs_atk_icon  stat_icon stat_icon_atk"></div> <div class="bs_atk">' + k + '</div><div class="bs_def_icon  stat_icon stat_icon_def"></div> <div class="bs_def">' + p + '</div><div class="bs_life_icon stat_icon stat_icon_life"></div><div class="bs_life">' + h + '</div><div class="bs_dig_icon  stat_icon stat_icon_dig"></div> <div class="bs_dig">' + n + "</div></div>";
   c.html(e);
   $(".bs_line").click(function() {
      var c = $(this).attr("id");
      b.SendSelectBot(a, c);
      $("#select_bot_div").slideUp(g_graphics_high ? "slow" : 0);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   c.slideDown(g_graphics_high ? "slow" : 0)
}

function AutoReadyStartTimer(a) {
   CheckBrowserAbilities(!1) && (AutoReadyStop(), g_auto_ready_timer = setTimeout(function() {
      !$("#roomButtonStart").is(":visible") && (!1 == a.myPlayerInfo.is_ready && !a.game) && a.SendRoomChangeReady(!0)
   }, 12500))
}
function AutoReadyStop() {
   g_auto_ready_timer = clearTimeout(g_auto_ready_timer)
}
var g_room_timer_interval;

function MasterTimerTick() {
   var a = Number($("#room_timer_text").html());
   0 == a ? g_room_timer_interval = clearInterval(g_room_timer_interval) : $("#room_timer_text").html(a - 1)
}

function MasterTimer(a) {
   0 == a ? ($("#room_timer").fadeOut("slow"), $("#room_timer_text").html("0")) : ($("#room_timer_text").html(a), $("#room_timer").fadeIn("slow"), g_room_timer_interval = setInterval("MasterTimerTick()", 1E3))
}
var E_ROOM_STATE_INDEX = Object.freeze({
   number: 0,
   title: 1,
   password: 2,
   max_players: 3,
   game_mode: 4,
   room_map: 5,
   is_avatars_on: 6,
   max_wind: 7,
   gp_rate: 8,
   minimap: 9,
   is_s1_disabled: 10,
   is_tele_disabled: 11,
   is_random_teams: 12
});

function RoomUpdate(a, b) {
   $("#roomNumber").html(b[E_ROOM_STATE_INDEX.number]);
   var d = b[E_ROOM_STATE_INDEX.title],
       c = b[E_ROOM_STATE_INDEX.password],
       d = text_filter(d, filtered_words);
   $("#room_change_title_input").val(d);
   c && (d += " (" + c + ")");
   $("#roomTitle").html(d);
   var d = b[E_ROOM_STATE_INDEX.game_mode],
       e;
   d == GAME_MODE_NORMAL ? e = "gameModeNormal" : d == GAME_MODE_BOSS ? e = "gameModeBoss" : d == GAME_MODE_SAME && (e = "gameModeSame");
   $("#room_game_mode").removeClass().addClass(e);
   RoomOptionsChangeMode(d, a.myPlayerInfo.unlock, a.myPlayerInfo.rank);
   var f;
   e = b[E_ROOM_STATE_INDEX.max_players];
   d != GAME_MODE_BOSS ? (2 == e ? f = "players1v1" : 4 == e ? f = "players2v2" : 6 == e ? f = "players3v3" : 8 == e && (f = "players4v4"), g_can_change_team ? $("#roomButtonChangeTeam").show() : $("#roomButtonChangeTeam").hide(), g_max_players = e) : (1 == e ? f = "players1vB" : 2 == e ? f = "players2vB" : 3 == e ? f = "players3vB" : 4 == e && (f = "players4vB"), $("#roomButtonChangeTeam").hide(), g_max_players = 2 * e);
   !$("#room_game_mode").hasClass("gameModeSame") && g_can_change_mobile && $("#roomButtonMobile").show();
   g_game_mode = d;
   $("#room_players").removeClass().addClass(f);
   $("#RoomOptionsPlayers").removeClass().addClass(f);
   f = b[E_ROOM_STATE_INDEX.room_map];
   $("#room_map").html("").css("background-position", "0 " + (-50 * f - 50) + "px");
   $("#RoomOptionsMapImage").html("").css("background-position", "0 " + (-50 * f - 50) + "px");
   $("#RoomOptionsMapName").html(GetMapName(f));
   g_options_map = f;
   e = b[E_ROOM_STATE_INDEX.is_avatars_on];
   $("#room_avatars").css("color", e ? "#00ff00" : "#ff0000").html(e ? l.t("ON") : l.t("OFF"));
   $("#RoomOptionsAvatars").css("color", e ? "#00ff00" : "#ff0000").html(e ? l.t("ON") : l.t("OFF"));
   $("#RoomOptionsAvatarsGP").html(d != GAME_MODE_BOSS && e ? "+10% GP" : "");
   d = b[E_ROOM_STATE_INDEX.max_wind];
   $("#room_wind").css("color", 0 == d ? "#ff0000" : "#00ff00").html(d);
   $("#RoomOptionsWind").css("color", 0 == d ? "#ff0000" : "#00ff00").html(d);
   d = 12 == d ? 5 : 26 == d ? 10 : 50 == d ? 15 : 0;
   $("#RoomOptionsWindGP").html(d ? "+" + d + "% GP" : "");
   d = b[E_ROOM_STATE_INDEX.gp_rate];
   $("#gp_rate").html(d + 100 + "%");
   f == MAP_CUSTOM && (g_custom_map = void 0, f = DragonDecompress(b[E_ROOM_STATE_INDEX.minimap]), d = BooleanArrayToCanvas(f, 213, 49, 213, 49), f = BooleanArrayToCanvas(f, 213, 49, 213, 49), $("#room_map").html("").css({
      "background-position": "999px 999px"
   }).append(d), $("#RoomOptionsMapImage").html("").css({
      "background-position": "999px 999px"
   }).append(f), $("#RoomOptionsMapName").html("Custom"));
   b[E_ROOM_STATE_INDEX.is_s1_disabled] ? ($("#RoomS1Disabled").show(), $("#RoomOptionsS1").addClass("grayscale")) : ($("#RoomS1Disabled").hide(), $("#RoomOptionsS1").removeClass("grayscale"));
   b[E_ROOM_STATE_INDEX.is_tele_disabled] ? ($("#itemTeleport, #RoomOptionsTele").addClass("grayscale"), RemoveItemsOfType(ITEM_TELEPORT) && a.SendRoomChangeReady(!1)) : $("#itemTeleport, #RoomOptionsTele").removeClass("grayscale");
   b[E_ROOM_STATE_INDEX.is_random_teams] ? ($("#RoomRandomTeams").show(), $("#RoomOptionsRandomTeams").removeClass("grayscale").html("[X] Random Teams")) : ($("#RoomRandomTeams").hide(), $("#RoomOptionsRandomTeams").addClass("grayscale").html("[ ] Random Teams"))
}
var g_room_slot_graphic2 = [];

function RoomRemoveAnimations() {
   for (var a = 0; a < g_room_slot_graphic2.length; a++) g_room_slot_graphic2[a] && g_room_slot_graphic2[a].remove();
   g_room_slot_graphic2 = []
}
function RoomUpdateWorthGP(a, b, d, c) {
   $("#gp_team_a").html("<u>" + l.t("Team") + " A</u><br>" + a + " GP<br>" + d + "G");
   $("#gp_team_b").html("<u>" + l.t("Team") + " B</u><br>" + b + " GP<br>" + c + "G")
}
var MY_AVATARS_HEAD = 0,
    MY_AVATARS_BODY = 1,
    MY_AVATARS_EYES = 2,
    MY_AVATARS_FLAG = 3,
    MY_AVATARS_BACKGROUND = 4,
    MY_AVATARS_FOREGROUND = 5,
    GP_TO_GOLD_RATE = 100,
    g_room_players_slots = [],
    g_no_winning_bonus_for = [];

function RoomPlayerSlotsFullUpdate(a, b) {
   var d = a[0],
       c = a[1];
   g_no_winning_bonus_for = a[2];
   RoomUpdateWorthGP(d, c, d * GP_TO_GOLD_RATE, c * GP_TO_GOLD_RATE);
   g_room_players_slots = [];
   for (d = 3; d < a.length - 10; d += 12) c = a[d], g_room_players_slots[c] = {
      user_id: a[d + 1],
      game_id: a[d + 2],
      rank: a[d + 3],
      guild: a[d + 4],
      is_master: 1 == a[d + 5],
      is_ready: 1 == a[d + 6],
      gender: a[d + 7],
      mobile: a[d + 8],
      avatars: a[d + 9],
      is_bot: a[d + 10],
      power_user: a[d + 11],
      team: 0 == c % 2 ? "A" : "B"
   };
   RoomPlayerUpdateGUI(b)
}

function SlotUpdate(a, b) {
   var d = a[0],
       c = a[1];
   g_no_winning_bonus_for = a[2];
   RoomUpdateWorthGP(d, c, d * GP_TO_GOLD_RATE, c * GP_TO_GOLD_RATE);
   d = a[3];
   g_room_players_slots[d] = {
      user_id: a[4],
      game_id: a[5],
      rank: a[6],
      guild: a[7],
      is_master: 1 == a[8],
      is_ready: 1 == a[9],
      gender: a[10],
      mobile: a[11],
      avatars: a[12],
      is_bot: a[13],
      power_user: a[14],
      team: 0 == d % 2 ? "A" : "B"
   };
   RoomPlayerUpdateGUI(b)
}
function GetSlotFromUserID(a) {
   var b, d, c = g_room_players_slots.length;
   for (b = 0; b < c; b++) if ((d = g_room_players_slots[b]) && d.user_id == a) return b
}

function DeleteSlot(a) {
   for (; g_room_players_slots[a];) g_room_players_slots[a] = g_room_players_slots[a + 2], a += 2
}
function ClearSlot(a, b, d) {
   g_no_winning_bonus_for = d;
   DeleteSlot(GetSlotFromUserID(a));
   RoomPlayerUpdateGUI(b)
}
function PassMasterTo(a, b) {
   var d, c, e = g_room_players_slots.length;
   for (d = 0; d < e; d++) if (c = g_room_players_slots[d]) c.is_master = c.user_id == a;
   RoomPlayerUpdateGUI(b)
}
var g_can_change_team = !0,
    g_can_change_mobile = !0;

function RoomPlayerUpdateGUI(a) {
   $("#roomButtonReady").hide();
   $("#roomButtonStart").hide();
   var b, d = 0,
       c = 0,
       e = 0,
       f = g_room_players_slots.length;
   g_can_change_team = g_can_change_mobile = !1;
   8 > f && (f = 8);
   for (var j = 0; j < f; j++) {
      b = g_room_players_slots[j];
      var m = "#playerInRoom" + j,
          k = $(m),
          p = g_room_slot_graphic2[j];
      if (b) {
         0 == j % 2 ? c++ : e++;
         var h = !b.avatars[MY_AVATARS_BACKGROUND] && b.power_user ? POWER_USER_BACKGROUND : b.avatars[MY_AVATARS_BACKGROUND];
         p ? (p.change_mobile(b.mobile), p.change(b.avatars[MY_AVATARS_HEAD], AVATAR_TYPE_HEAD), p.change(b.avatars[MY_AVATARS_BODY], AVATAR_TYPE_BODY), p.change(b.avatars[MY_AVATARS_EYES], AVATAR_TYPE_EYES), p.change(b.avatars[MY_AVATARS_FLAG], AVATAR_TYPE_FLAG), p.change(h, AVATAR_TYPE_BACKGROUND), p.change(b.avatars[MY_AVATARS_FOREGROUND], AVATAR_TYPE_FOREGROUND)) : g_room_slot_graphic2[j] = new CPlayerGraphic(m + " .roomPlayerMobile", b.mobile, b.avatars[MY_AVATARS_HEAD], b.avatars[MY_AVATARS_BODY], b.avatars[MY_AVATARS_EYES], b.avatars[MY_AVATARS_FLAG], "A" == b.team, h, b.avatars[MY_AVATARS_FOREGROUND]);
         k.children(".roomPlayerRank").removeClass().addClass("roomPlayerRank rank rank" + b.rank);
         k.children(".roomPlayerName").html(BuildPlayerNameWithGuild(b.guild, b.game_id));
         if (b.user_id == a.user_id) {
            k.children(".roomPlayerMyself").show();
            a.is_ready = b.is_ready;
            a.team = b.team;
            a.mobile = b.mobile;
            a.is_master = b.is_master;
            g_can_change_team = g_can_change_mobile = !0;
            $("#team_search").is(":visible") || (b.is_master ? ($("#roomButtonStart").show(), $("#roomButtonReady").hide()) : ($("#roomButtonReady").show(), $("#roomButtonStart").hide()));
            $("#mobile_info").removeClass().addClass("mobile_info" + b.mobile);
            m = g_no_winning_bonus_for;
            p = !0;
            if (m && m.length) for (h = 0; h < m.length; h += 2) if (j == m[h]) {
               j % 2 ? $("#gp_team_a").html("<u>" + l.t("Team") + " A</u><br>XXX") : $("#gp_team_b").html("<u>" + l.t("Team") + " B</u><br>XXX"); - 1 == m[h + 1] ? $("#no_win_bonus").html(b.game_id + " -> Computer Players<br><br>" + l.t("If you win you will not get winning bonus because you already won this player many times today.<br>Play for fun, play with others, or continue tomorrow.")).show() : g_room_players_slots[m[h + 1]] && $("#no_win_bonus").html(b.game_id + " -> " + g_room_players_slots[m[h + 1]].game_id + "<br><br>" + l.t("If you win you will not get winning bonus because you already won this player many times today.<br>Play for fun, play with others, or continue tomorrow.")).show();
               p = !1;
               break
            }
            p && $("#no_win_bonus").html("").hide()
         } else k.children(".roomPlayerMyself").hide();
         b.is_master ? (k.children(".roomPlayerNotReady").hide(), k.children(".roomPlayerReady").hide(), k.children(".roomPlayerMaster").show()) : (k.children(".roomPlayerMaster").hide(), b.is_ready ? (k.children(".roomPlayerNotReady").hide(), k.children(".roomPlayerReady").show()) : (k.children(".roomPlayerNotReady").show(), k.children(".roomPlayerReady").hide()));
         b.is_bot ? (a.is_master && k.children(".roomBotSelect").show(), k.children(".roomPlayerInfo").hide(), d++) : (k.children(".roomBotSelect").hide(), k.children(".roomPlayerInfo").attr("user_id", b.user_id).show());
         k.show()
      } else k.children(".roomPlayerBalloon, .roomPlayerBalloonTip").removeClass("text_anim"), k.children(".roomPlayerName").html(""), k.hide(), p && (p.remove(), g_room_slot_graphic2[j] = void 0)
   }
   $("#add_bot_button").hide();
   !$("#room_game_mode").hasClass("gameModeBoss") || !a.is_master ? ($(".roomBotSelect").hide(), $(".roomBotRemove").hide()) : 2 <= d ? ($(".roomBotRemove").show(), $(".roomBotSelect").hide()) : ($(".roomBotRemove").hide(), $(".roomBotSelect").show());
   $("#room_game_mode").hasClass("gameModeSame") && !a.is_master && (g_can_change_mobile = !1);
   $("#room_game_mode").hasClass("gameModeBoss") && (g_can_change_team = !1); - 1 != g_server_force_mobile && (g_can_change_mobile = !1);
   1 == g_server_type ? (g_can_change_team = !1, $("#room_options_button").hide()) : $("#room_options_button").show();
   g_can_change_mobile ? $("#roomButtonMobile").show() : $("#roomButtonMobile").hide();
   g_can_change_team ? $("#roomButtonChangeTeam").show() : $("#roomButtonChangeTeam").hide();
   c = Math.max(c, Math.floor(g_max_players / 2));
   g_game_mode == GAME_MODE_BOSS ? 4 > e && e++ : e = Math.max(e, Math.floor(g_max_players / 2));
   debug && console.log("Slots Per Team:", c, e);
   d = DragonTheme_GetValue("room_bg");
   for (j = 0; j < f; j++) b = g_room_players_slots[j], m = "#playerInRoom" + j, k = $(m), m = 0 == j % 2 ? c : e, p = (!d || "." == d ? 257 - 48 * (Math.floor(m) - 1) : 113) + 97 * Math.floor(j / 2), k.css("top", p), k = $("#vortex" + j), k.css("top", p - 50), b ? k.hide() : (Math.floor(j / 2) < m && (0 == j % 2 || 1 != g_server_type) ? k.show() : k.hide(), g_game_mode == GAME_MODE_BOSS && (j == 2 * e - 1 && 0 < a.unlock) && ($("#add_bot_button").css("top", p + 40).show(), g_add_bot_to_slot = j))
}
var g_vortex_start, g_vortex_interval;

function VortexStart() {
   g_vortex_start = get_time();
   clearInterval(g_vortex_interval);
   g_vortex_interval = setInterval(function() {
      var a = (get_time() - g_vortex_start) / 8E3 * Math.PI;
      $(".vortex").css({
         scaleY: 0.35,
         rotate: a
      })
   }, 30)
}
function VortexStop() {
   g_vortex_interval = clearInterval(g_vortex_interval)
}

function TeamSearchMsg(a, b) {
   var d = $("#team_search"),
       c = $("#roomButtonStart,#roomButtonReady");
   if (b) {
      AudioPlay(AUDIO_WAIT);
      var e = l.t("Searching for other team") + '...<div id="hourglass"></div><div id="CancelWaiting2" class="cancelwait">Cancel</div>';
      d.html(e).show();
      c.hide();
      $("#CancelWaiting2").click(function() {
         a.SendTeamSearchCancel()
      })
   } else d.html("").hide(), a && a.myPlayerInfo.is_master ? $("#roomButtonStart").show() : $("#roomButtonReady").show()
}

function ChangedMobile(a, b, d) {
   for (var c, e = g_room_players_slots.length, f = 0; f < e; f++) if ((c = g_room_players_slots[f]) && (-1 == a || c.user_id == a)) c.mobile = b, g_room_slot_graphic2[f].change_mobile(b), c.user_id == d.user_id && (d.mobile = b, $("#mobile_info").removeClass().addClass("mobile_info" + b))
}

function ChangedTeam(a, b, d, c) {
   g_no_winning_bonus_for = c;
   for (var e, f = g_room_players_slots.length, c = 0; c < f && !((e = g_room_players_slots[c]) && e.user_id == a); c++);
   if (!(c >= f) && c % 2 == ("A" == b)) {
      for (a = g_room_players_slots[c]; g_room_players_slots[c];) g_room_players_slots[c] = g_room_players_slots[c + 2], c += 2;
      for (c = "A" == b ? 0 : 1; g_room_players_slots[c];) c += 2;
      g_room_players_slots[c] = a;
      a.team = b;
      RoomPlayerUpdateGUI(d)
   }
}

function ChangedReady(a, b, d) {
   var c, e, f = g_room_players_slots.length;
   for (c = 0; c < f && !((e = g_room_players_slots[c]) && e.user_id == a); c++);
   c != f && (e.is_ready = b, RoomPlayerUpdateGUI(d))
}

function CheckBrowserAbilities(a) {
   return void 0 == document.getElementById("ground_canvas").getContext ? (a && DragonDialogOpen(l.t("Old Browser"), l.t("Your browser is too old.<br>It does not have required features to run the game.") + "<br><br>" + l.t('Please change to <a href="https://www.google.com/chrome/">Chrome</a> or <a href="http://www.mozilla.org/en-US/firefox/new/">Firefox</a>'), 1), !1) : !0
}

function RoomSelectItem(a) {
   var b = ITEM_SIZE[a],
       d;
   for (d = 0; d <= 6 - b && !(g_items[d] == ITEM_NONE && (1 == b || g_items[d + 1] == ITEM_NONE)); d++) g_items[d] != ITEM_NONE && 1 < ITEM_SIZE[g_items[d]] && d++;
   d <= 6 - b && (g_items[d] = a, $("#itemSlot" + d).removeClass().addClass(ITEM_CLASS[a]))
}
function RoomRemoveItemFromSlot(a) {
   g_items[a] != ITEM_NONE && (g_items[a] = ITEM_NONE, $("#itemSlot" + a).removeClass().addClass("itemNone"))
}

function GameSetItems(a) {
   for (var b = 0; b < a.length; b++) {
      var d = $("#gameItemSlot" + b);
      d.removeClass();
      a[b] != ITEM_NONE && (d.addClass("item").addClass(ITEM_CLASS[a[b]]), 2 == ITEM_SIZE[a[b]] && d.addClass("big"))
   }
}
function RemoveItemsOfType(a) {
   for (var b = !1, d = 0; 6 > d; d++) g_items[d] == a && (RoomRemoveItemFromSlot(d), b = !0);
   return b
}

function DragonMapCreator() {
   "undefined" === typeof window.FileReader ? debug && console.log("FileReader Unsupported") : $("#RoomOptionsMapImage").bind("dragenter dragover", function() {
      $(this).css("box-shadow", "yellow 0px 0px 50px 50px");
      return !1
   }).bind("dragend dragleave", function() {
      $(this).css("box-shadow", "");
      return !1
   }).bind("drop", function(a) {
      a = a.originalEvent;
      a.preventDefault();
      $(this).css("box-shadow", "");
      if (27 > g_server_version) alertify.alert("This server does not support custom maps yet. Try it on Server 13 on DB-Global.");
      else {
         var a = a.dataTransfer.files[0],
             b = new FileReader;
         b.onload = function(a) {
            DragonMapCreator_GotPNG(a.target.result)
         };
         b.readAsDataURL(a);
         return !1
      }
   })
}

function DragonMapCreator_GotPNG(a) {
   var b = new Image;
   b.onload = function() {
      var a = b.width,
          c = b.height;
      if (400 > a || 400 > c || 2E3 < a || 2E3 < c) alertify.alert("Image size need to be: 400x400-2000x2000 (We got " + a + "x" + c + ")");
      else {
         var e = document.createElement("canvas");
         e.width = a;
         e.height = c;
         e = e.getContext("2d");
         e.drawImage(this, 0, 0);
         for (var e = e.getImageData(0, 0, a, c), e = ImageDataToBooleanArray2(e), f = 0, j = 0; j < e.length && !e[j]; j++) f++;
         f = Math.floor(f / a);
         0 < f && (e = e.slice(f * a), c -= f);
         f = 0;
         for (j = e.length; 0 < j && !e[j]; j--) f++;
         f = Math.floor(f / a);
         0 < f && (e = e.slice(0, -f * a), c -= f);
         var m = DragonCompress(e);
         if (5E4 < m.length) alertify.alert("File size is too big. Please decrease the file size.");
         else {
            for (var k = 0, p = 0, j = 0; j < e.length; j++) e[j] ? p++ : k++;
            j = 100 * p / (b.width * b.height);
            20 > j ? alertify.alert("This map has " + Math.floor(j) + "% ground. Please add more ground pixels. (at least 20% ground is needed)") : (e = BooleanArrayToCanvas(e, a, c, 213, 49), $("#RoomOptionsMapImage").html("").css({
               "background-position": "999px 999px"
            }).append(e), $("#RoomOptionsMapName").html("Custom"), $("#RoomOptionsMapPrev, #RoomOptionsMapNext").show(), e = Math.max(a, c, 800), g_custom_map = [a, c, e, (e - a) / 2, e - c - f, m], g_options_map = MAP_CUSTOM)
         }
      }
   };
   b.onerror = b.onabort = function() {
      alertify.alert("Error loading image, try a different file.")
   };
   g_custom_map = void 0;
   b.src = a
}

function BooleanArrayToCanvas(a, b, d, c, e) {
   var f = document.createElement("canvas");
   f.width = c;
   f.height = e;
   for (var j = f.getContext("2d"), m = j.getImageData(0, 0, c, e), k = m.data, p = "string" == typeof a ? "1" : !0, h = 0; h < e; h++) for (var n = 0; n < c; n++) {
      var o = 4 * (h * c + n);
      k[o] = k[o + 1] = k[o + 2] = 0;
      k[o + 3] = a[Math.floor(h * d / e) * b + Math.floor(n * b / c)] == p ? 255 : 0
   }
   j.putImageData(m, 0, 0);
   return f
}
function base62_encode(a, b, d) {
   a = a !== +a || a % 1 ? -1 : a;
   for (b = ""; 0 <= a; a = Math.floor(a / 62) || -1) b = String.fromCharCode((9 < (d = a % 62) ? 35 < d ? 29 : 87 : 48) + d) + b;
   return b
}

function DragonCompress2(a) {
   var b, d = "",
       c;
   for (b = 0; b < a.length; b++) {
      c = a[b];
      if (14776336 <= c) throw Error("Number too high: " + c);
      238328 <= c ? d += "-" : 3844 <= c ? d += "+" : 62 > c && (d += "0");
      d += base62_encode(c)
   }
   return d
}
function DragonCompress(a) {
   var b, d = a.length,
       c = 0,
       e = [],
       f = !1;
   for (b = 0; b < d; b++) !! Number(a[b]) == f ? c++ : (e.push(c), c = 1, f = !f);
   c && e.push(c);
   return DragonCompress2(e)
};
var rankings_cache = [{},
{},
{}],
    RANKING_CACHE_TIME = 6E5,
    RANKING_PAGE_SIZE = 30,
    ranks_cache, ranks_cache_expire = 0;

function RankingGUI(a) {
   $("#ranking_btn_type1").click(function() {
      LoadRanking(1, 1, a)
   });
   $("#ranking_btn_type2").click(function() {
      LoadRanking(2, 1, a)
   });
   $("#ranking_btn_ranks").click(function() {
      LoadRanks()
   });
   $("#ranking_btn_howto").click(function() {
      HowToPlay()
   });
   $("#ranking_btn_contact").click(function() {
      ShowContact()
   });
   $("#ranking_btn_terms").click(function() {
      ShowTerms()
   });
   $("#ranking_btn_privacy").click(function() {
      ShowPrivacy()
   });
   "br" == SERVER_TYPE ? LoadRanking(1, 1, a) : HowToPlay()
}

function RankingReClick() {
   $("#ranking_btn_ranks").hasClass("selected") ? LoadRanks() : $("#ranking_btn_howto").hasClass("selected") ? HowToPlay() : $("#ranking_btn_contact").hasClass("selected") && ShowContact()
}

function LoadRanks() {
   $(".ranking_btn").removeClass("selected");
   $("#ranking_btn_ranks").addClass("selected");
   if (!g_is_ranking_loading) {
      var a = get_time();
      if (ranks_cache && a < ranks_cache_expire) return debug && console.log("from cache"), DragonRankings_BuildRanks(ranks_cache);
      var b = "http://rankings.dragonbound.net:" + ("br" == SERVER_TYPE ? 9921 : 9911) + "/i";
      g_is_ranking_loading = !0;
      debug && t0();
      $.get(b, function(b) {
         debug && t1("[DragonRankings] Ranks Query Time");
         g_is_ranking_loading = !1;
         debug && console.log("Got Ranks:", b);
         4 != b.length ? console.error("Bad ranks data", b) : (ranks_cache = b, ranks_cache_expire = a + RANKING_CACHE_TIME, DragonRankings_BuildRanks(b))
      }, "json").error(function() {
         g_is_ranking_loading = !1;
         alertify.log("Can't load ranks, try again later")
      })
   }
}

function DragonRankings_BuildRanks(a) {
   var b = (new Date(a[0])).toString(),
       d = a[1],
       c = a[2],
       a = a[3],
       b = '<div style="text-align: center; font-weight: bold;">' + l.t("Last Update") + ':</div><div style="text-align: center;">' + b + '</div><br><table width=100%><tr style="font-weight: bold;"><td><strong>' + l.t("Rank") + '</strong></td><td style="text-align: center;">GP</td><td style="text-align: center;">' + l.t("Rule") + '<td style="text-align: center;"># ' + l.t("Players") + "</td></tr>",
       e, f, j;
   for (e = 23; - 1 <= e; e--) f = -1 == e ? 24 : e, j = 23 == f ? l.t("Top 1") : 22 == f ? l.t("Next 4") : 21 == f ? l.t("Next 16") : 20 >= f && 12 <= f ? a[f - 12] + "%" : 11 == f ? "100%" : 24 == f ? "GM / Admin" : "-", b += '<tr><td><div class="rank rank' + f + '"></div></td><td style="text-align: center;">' + (d[f - 1] ? d[f - 1] : "-") + '</td><td style="text-align: center;">' + j + '</td><td style="text-align: center;">' + (c[f] ? c[f] : "-") + "</td></tr>";
   $("#ranking_data").html(b + "</table>")
}

function HowToPlay() {
   $(".ranking_btn").removeClass("selected");
   $("#ranking_btn_howto").addClass("selected");
   var a = '<div class="howto1">' + l.t("Lobby Screen") + '</div>        <div class="howto4">' + l.t("Join a game, chat or shop") + '</div>        <div class="howto3"><span class="howto2">' + l.t("Quick Play") + "</span> - " + l.t("Join to an available game room") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Create") + "</span> - " + l.t("Create your own game room") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Shop") + "</span> - " + l.t("Buy and use avatars (items)") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("My Info") + "</span> - " + l.t("Change Name & Photo") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Options") + "</span> - " + l.t("Music / Sound / Graphics") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Rooms List") + "</span> - " + l.t('Click on a "Waiting" room to join to a game') + '.</div>        <br>        <div class="howto1">' + l.t("Room Screen") + '</div>        <div class="howto4">' + l.t('When all players are "Ready" the room master can start a game') + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Ready Button") + "</span> - " + l.t("To ready") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Start") + "</span> - " + l.t("For room master to start a game") + '.</div>        <br>        <div class="howto1">' + l.t("Game Screen") + '</div>        <div class="howto4">' + l.t("You have to kill the other team to win. Shoot in your turn") + '.</div><br>        <div class="howto3"><span class="howto2">' + l.t("Up/Down") + "</span> - " + l.t("Change angle") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Left/Right") + "</span> - " + l.t("Walk (on your turn)") + '.</div>        <div class="howto3"><span class="howto2">' + l.t("Space") + "</span> - " + l.t("Shoot. Hold down for more power") + ".</div>";
   $("#ranking_data").html(a)
}

function LoadRanking(a, b, d) {
   if (!(1 != a && 2 != a) && ($(".ranking_btn").removeClass("selected"), $("#ranking_btn_type" + a).addClass("selected"), !g_is_ranking_loading)) if (isNaN(b) || (b = b - b % RANKING_PAGE_SIZE + 1), rankings_cache[a][b] && get_time() < rankings_cache[a][b].x) debug && console.log("[DragonRankings] From Cache:", b), DragonRankings_BuildPage(rankings_cache[a][b].d, a, d, b);
   else {
      var c = "http://" + ("dev1" == SERVER_TYPE ? "t" : "rankings") + ".dragonbound.net:" + (1 == a ? "br" == SERVER_TYPE ? 9921 : 9911 : "br" == SERVER_TYPE ? 9922 : 9912) + "/r.php";
      debug && console.log("[DragonRankings] Asking For:", b);
      debug && t0();
      g_is_ranking_loading = !0;
      $.get(c, {
         s: b
      }, function(c) {
         g_is_ranking_loading = !1;
         debug && t1("[DragonRankings] Rankings Query Time");
         var f = c.length;
         1 > f ? alertify.log("No ranking data received") : 1 == f && 0 == c[0] ? alertify.log("Player not found on rankings.") : 1 != c[0] ? alertify.log("Wrong rankings version. Please update your client.") : (f = c[1], rankings_cache[a][f] = {
            x: get_time() + RANKING_CACHE_TIME,
            d: c
         }, isNaN(b) && (rankings_cache[a][b] = rankings_cache[a][f]), DragonRankings_BuildPage(c, a, d, b))
      }, "json").error(function() {
         g_is_ranking_loading = !1;
         alertify.log("Error when loading rankings, try again later")
      })
   }
}

function DragonRankings_BuildPage(a, b, d, c) {
   var e = a.length,
       f = a[1],
       j = f,
       m = "<table>",
       k = 2,
       p, h, n, o, t = 2 == b,
       q = d.myPlayerInfo ? d.myPlayerInfo.game_id : "",
       y;
   p = $("#infoName");
   for (p.is(":visible") && (y = p.html()); k < e;) {
      p = a[k++];
      h = a[k++];
      n = a[k++];
      o = "string" == typeof a[k] ? a[k++] : "";
      m += "<tr";
      if (n == q || n == c) m += ' class="ranking_me"';
      t && (t = !0, o = n, n = "");
      m += "><td>" + j + '</td><td><div class="rank rank' + h + '"></div></td><td><div class="ranking_name"><span class="GuildName"><a href="/guild?name=' + encodeURIComponent(o) + '" target="_blank">' + o + "</a></span> " + n + "</div></td><td>" + p + "</td></tr>";
      n == y && $("#infoRanking").html(j);
      j++
   }
   m += "</table>";
   a = '<div class="Nav"><button id="btnRPrev">&lt;-</button><button id="btnMe">' + l.t("ME") + "</button>" + l.t("Search") + ': <input id="rankingOffset" value="' + f + '"><button id="btnRNext">-&gt;</button></div>';
   $("#ranking_data").html(a + m);
   $("#btnMe").click(function() {
      d.myPlayerInfo ? t && !d.myPlayerInfo.guild ? alertify.log("You don't have a guild. Join one.") : LoadRanking(b, t ? d.myPlayerInfo.guild : d.myPlayerInfo.game_id, d) : alertify.log("Don't know who you are, enter a server.")
   });
   $("#btnRPrev").click(function() {
      LoadRanking(b, Math.max(1, f - RANKING_PAGE_SIZE), d)
   });
   $("#btnRNext").click(function() {
      LoadRanking(b, Math.max(1, j), d)
   });
   $("#rankingOffset").bind("keyup", function(a) {
      if (13 == a.which) return LoadRanking(b, $(this).val(), d), a.stopPropagation(), !1
   })
}

function ShowContact() {
   $(".ranking_btn").removeClass("selected");
   $("#ranking_btn_contact").addClass("selected");
   var a = '<br><div class="ContactTitle">- ' + l.t("COMPANY EMAILS") + ' -</div><div class="ContactName">' + l.t("Community") + ':</div><div class="ContactFB"><a href="mailto:business@dragonbound.net">community@dragonbound.net</a></div><div class="ContactLang">(' + l.t("ENGLISH ONLY") + ')</div><br><div class="ContactName">' + l.t("Business Relations") + ':</div><div class="ContactFB"><a href="mailto:business@dragonbound.net">business@dragonbound.net</a></div><div class="ContactLang">(' + l.t("COMPANIES ONLY, IN ENGLISH") + ')</div><div class="ContactTitle">- ' + l.t("GM LIST") + " -</div>",
       b;
   b = "br" == SERVER_TYPE ? [
      ["DN", "drgonight.dn", "English"],
      ["Rhonan", "GMRhonan", "Portuguese, English"],
      ["Zamy", "GMZamy", "Spanish, English"],
      ["Digu", "", "Portuguese, English"],
      ["Vulgo Biel", "", "Portuguese, English"]
   ] : [
      ["DN", "drgonight.dn", "English"],
      ["Jaku", "johnkeh", "Filipino, English"],
      ["tkspr0", "GM.tkspr0", "Spanish, English"],
      ["Zamy", "GMZamy", "Spanish, English"],
      ["Kommander", "pages/GM-Kommander/473619026023417", "Spanish, Portuguese, English"],
      ["Carlos*", "GM.CarlosMM", "Spanish, English"],
      ["Rhonan", "GMRhonan", "Portuguese, English"],
      ["Xebe", "GmXebe", "Filipino, English, Chinese"],
      ["Aidan Pe", "phdragonbound.net", "Filipino, English"],
      ["teoguy07", "GmTeoguy07", "Filipino, English"],
      ["Lady Jade ~", "GMLadyJade", "Spanish, English"],
      ["Jairo Rony", "GMJairoRony", "Spanish, English, Portuguese"]
   ];
   for (var d = 0; d < b.length; d++) a += '<div class="ContactName">' + b[d][0] + "</div>" + ("" != b[d][1] ? '<div class="ContactFB"><a href="https://www.facebook.com/' + b[d][1] + '" target="_blank">facebook.com/' + b[d][1] + "</a></div>" : "") + '<div class="ContactLang">' + b[d][2] + "</div>";
   $("#ranking_data").html(a)
}

function ShowTerms() {
   $(".ranking_btn").removeClass("selected");
   $("#ranking_btn_terms").addClass("selected");
   $("#ranking_data").html("<textarea class=\"TermsArea\" readonly> = Dragonbound Terms of Service =\n\nThank you for playing Dragonbound.\n\nBy using our services, you hereby agree to our terms and conditions.\n\nDragonBound is a free to play multiplayer online game, and is solely for entertainment purposes and to offer fun to players around the world.\n\nOur web site and services provided to you on and through our web site on an AS IS basis. You agree that the owners of DragonBound exclusively reserve the right and may, at any time and without notice and any liability to you, modify or discontinue DragonBound and its services or delete the data you provide, whether temporarily or permanently. We shall have no responsibility or liability for the timeliness, deletion, failure to store, inaccuracy, or improper delivery of any data or information.\n\n = Your Account\n\nYou are responsible for your account. Please keep your password safe and we recommend not to share your personal Facebook information.  Do not trust anyone with your password.  We are not responsible for any case of compromise, theft, loss, or any other occurrence that would prevent you from using our services, DragonBound representatives will never ask you for your password.\nIf you lose access to your Facebook account, you should use Facebook's support for getting back access to your account, we cannot help you with stolen Facebook accounts.\n\n = Your Avatars\n\nIt is entirely the player's decision to buy an avatar in the shop or not, there will not be change or devolution of the acquired avatars.\nYour avatars, whether bought with gold or cash, are only valid within DragonBound.  You cannot claim ownership of avatars outside of DragonBound, nor claim compensation in any form, in case of lost avatars.\nYou agree that you have no right or title in or to any such content, including virtual in-game assets, or any other attributes or features of the Account or stored on the Service. You further agree that there are no refunds or restorations available for any intentionally or accidentally lost, misplaced, or deleted virtual assets. You also acknowledge that DragonBound may, in its sole and absolute discretion, review any virtual asset issues and make a binding decision in accordance with these terms.\n\n = Code of Conduct\n\nAlways do what is right and fair.  You are not permitted to gain unfair advantage that other users have no control over. DragonBound reserves the right to determine what constitutes \"unfair advantage\" this may be illegal GP gaining, and the use of third party programs to unbalance the fair and clean game, and will discipline users with any penalty that they deem fit, in the event of violating this policy.  You are entitled to appeal in the event that you are penalized, but DragonBound will have the final decision in any circumstance.\nRespect other players. DragonBound will not tolerate any bad behavior by players. DragonBound will discipline users with any penalty that they deem fit, in the event of violating this policy.\n\n = About Game Masters\n\nBeing a GM doesn't mean to have access to the main data of the game, each GM is responsible for their acts.\nDragonBound have chosen Game Masters of the game, The GMs are the people in the game who keep the peace and same treatment to the users inside the game, GMs will discipline users with any penalty that they deem fit, in the event of illegal playing.\n\n = Penalty/Ban\n\nPenalties will be the same in condition and criteria of the GMs who are designated to do so.\nEach GM will be responsible for their own bans, arbitrary bans are not tolerated and may lead into a destitution of their charge.\nThey will have the following options:\n1 day warning ban, no GP lose - Usually for trouble makers, insulting GM, chat spam.\n7 days ban & -25% GP \u2013 Usually for using 3rd party software that gives unfair advantage (like aimbots and auto-clickers).\n3 days ban & -50% GP \u2013 Usually for getting GP in unfair ways (like boosting and free kill games)\nPermanent Ban - Usually for payment issues, accounts involved in repeated offenses, or accounts used mainly for breaking the rules.\nEvery GM in the game is able to mute players, from 1 to 60 minutes if needed in order to keep the proper environment of the game.\nThese were general guide lines. However, DragonBound saves the right to close temporarily or permanently or punish any account for any reason that DragonBound's GM finds necessary.\n\n = User Generated Content\n\nWe are not responsible for user generated content. Some of our content may be created by users, and it may violate copyrights or trademarks. In the event that this happens, please contact us by email to the business relations address advertised in \"Contact Us\" and we will remove the content from DragonBound.\nWhen a player sends us his graphic design to be added to the game, he also agrees that he will have no claims of intellectual property / copyrights / trademark in the future for this design. The reward that he will receive for sending us his design will be considered as DragonBound paying and buying his rights to use that graphical content for unlimited time.\n\n = About Virtual Currency / Donations / Cash Chargers\n\nIt is entirely the player's decision to buy an avatar in the shop or not, as well as it is to pay real money for them, users are not forced to buy cash.\nThe real money is properly collected from users who agree to donate, cash is taken as donation to DragonBound, to server's maintenance and to keep offering our services.\nPayments made using the services of PayPal will have to be made with a \u201cVerified\u201d account status, and any kind of reversed payment will lead to a permanent ban.\nRefund Policy: There are no refunds, unless decided by the seller in special cases to make an exception and make a refund.\n\n = Third Party Services\n\nGoods and services of third parties may be advertised and/or made available on or through DragonBound. Representations made regarding products and services provided by third parties are governed by the policies and representations made by these third parties. We shall not be liable for or responsible in any manner for any of your dealings or interaction with third parties. \n\n = Limitation of Liability\n\nYOU EXPRESSLY UNDERSTAND AND AGREE THAT WE SHALL NOT BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, INDICENTAL, CONSEQUENTIAL OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO, DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA OR OTHER INTANGIBLE LOSS (EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES), RESULTING FROM OR ARISING OUT OF (I) THE USE OF OR THE INABILITY TO USE THE SERVICE, (II) THE COST TO OBTAIN SUBSTITUTE GOODS AND/OR SERVICES RESULTING FROM ANY TRANSACTION ENTERED INTO ON THROUGH THE SERVICE, (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA TRANSMISSIONS, (IV) STATEMENTS OR CONDUCT OF ANY THIRD PARTY ON THE SERVICE, OR (V) ANY OTHER MATTER RELATING TO THE SERVICE. Please remember that we are not responsible for any messages posted. We do not vouch for or warrant the accuracy, completeness or usefulness of any message, and are not responsible for the contents of any message. The messages express the views of the author of the message, not necessarily the views of DragonBound. Any user who feels that a posted message is objectionable is encouraged to contact us immediately. We have the ability to remove objectionable messages and we will make every effort to do so, within a reasonable time frame, if we determine that removal is necessary. You agree, through your use of this service, that you will not use DragonBound to post any material which is knowingly false and/or defamatory, inaccurate, abusive, vulgar, hateful, harassing, obscene, profane, sexually oriented, threatening, invasive of a person's privacy, or otherwise violate of any law. You agree not to post any copyrighted material unless the copyright is owned by you or by DragonBound. If you have read, understood and agree to these rules and conditions, you may use our services. If you disagree, leave immediately.</textarea>")
}

function ShowPrivacy() {
   $(".ranking_btn").removeClass("selected");
   $("#ranking_btn_privacy").addClass("selected");
   $("#ranking_data").html('<textarea class="TermsArea" readonly> = Privacy Policy =\n\nDragonBound may require the following information from you:\n\n = Facebook Login\n\nWe are using facebook login to provide users a convenient way to play DragonBound. We do not control the facebook login process, nor do we have any record of your passwords.\n\n = Facebook Information\n\nWe may view your PUBLIC facebook profile, email and birthday for the purpose of verifying your identity.\n\nYour PUBLIC facebook profile photo and name will be used as the default in-game photo and name - You have the option to change these in [My Info] button in game.DragonBound will automatically gather your gender information to determine your gender in-game.\n\nWe will never share or give to 3rd party any of your private information. We will never send you any emails (unless you contacted us first).\n\nWe will not use any of your facebook information for any purpose other than those stated above.\n\n = Login Information\n\nYour login data is collected by Google Analytics for information purposes only.\n\n = In-Game Information\n\nDefault username - Your Facebook name will be your default username. This can be changed through clicking the "My Info" button on the lobby screen in-game.\n\nAll information and statistics transmitted in-game are monitored, and can be used by DragonBound for whatever purpose it may deem fit.\n\n = Third Party Payment Information\n\nDragonBound employs third parties to make payments more convenient for users. These companies may require personal, payment, and billing information. The information you provide these companies do not pass through DragonBound.\n\n = Sharing Information\n\nDragonBound will not share your information with anyone. DragonBound will treat your information with utmost confidentiality.\n\n = Changes to the Privacy Policy\n\nDragonBound may modify, in part or entirely, its privacy policy. The most updated version will be available on the website.</textarea>')
}
var RANKING_SIZE = 248,
    g_previous_w, g_previous_h, g_previous_orientation, g_aspect_ratio = 1,
    g_no_aspect_left = 0,
    g_no_aspect_top = 0;

function Resize(a) {
   var b = window.innerWidth,
       d = window.innerHeight;
   if (a || !(b == g_previous_w && d == g_previous_h)) {
      g_previous_w = b;
      g_previous_h = d;
      var a = g_is_show_ranking && 500 < b,
          c, e, f;
      b / 800 < d / 600 ? (c = b / 800, e = 0, f = Math.floor((d - 600 * c) / 2)) : (c = d / 600, e = Math.floor((b - 800 * c) / 2), f = 0);
      a && e < RANKING_SIZE && (b -= RANKING_SIZE, b / 800 < d / 600 ? (c = b / 800, e = RANKING_SIZE, f = Math.floor((d - 600 * c) / 2)) : (c = d / 600, e = Math.floor((b + RANKING_SIZE - 800 * c) / 2), e < RANKING_SIZE && (e = RANKING_SIZE), f = 0));
      $("#container").css({
         scaleX: c,
         scaleY: c,
         left: e,
         top: f
      });
      g_aspect_ratio = c;
      g_no_aspect_left = e;
      g_no_aspect_top = f;
      a ? $("#ranking_panel").show() : $("#ranking_panel").hide()
   }
}
function ResizeInit() {
   window.addEventListener("resize", Resize, !1);
   Resize()
};
var g_ss;

function ShopGUI(a) {
   $("#shop_my_items_container").tinyscrollbar({
      size: 237
   });
   var b, d = 0;
   for (b = 0; b < AVATARS.length; b++) AVATARS[b] && !AVATARS[b][AVATAR_INDEX_SHOP] && d++;
   $("#buttonShopExit").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopClose(a)
   });
   $("#shop_item0").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(0, a.myPlayerInfo.gender)
   });
   $("#shop_item1").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(1, a.myPlayerInfo.gender)
   });
   $("#shop_item2").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(2, a.myPlayerInfo.gender)
   });
   $("#shop_item3").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(3, a.myPlayerInfo.gender)
   });
   $("#shop_item4").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(4, a.myPlayerInfo.gender)
   });
   $("#shop_item5").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(5, a.myPlayerInfo.gender)
   });
   $("#shop_item6").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(6, a.myPlayerInfo.gender)
   });
   $("#shop_item7").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(7, a.myPlayerInfo.gender)
   });
   $("#shop_item8").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSelectItem(8, a.myPlayerInfo.gender)
   });
   $("#buttonShopTry").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopTry()
   });
   $("#buttonShopBuy").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopBuy()
   });
   $("#buy_cancel_btn").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopBuyCloseDialog()
   });
   $("#buy_period_next_btn").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSetPeriod((ShopGetPeriod() + 1) % 3)
   });
   $("#buy_period_prev_btn").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ShopSetPeriod((ShopGetPeriod() + 2) % 3)
   });
   $("#buy_gold_btn").click(function() {
      $(this).hasClass("active") && (AudioPlay(AUDIO_BUTTON_SELECT2), ShopDoPurchase(!1, a))
   });
   $("#buy_cash_btn").click(function() {
      $(this).hasClass("active") && (AudioPlay(AUDIO_BUTTON_SELECT2), ShopDoPurchase(!0, a))
   });
   $("#buttonShopHead").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_HEAD, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopBody").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_BODY, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopEyes").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_EYES, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopFlag").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_FLAG, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopBackground").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_BACKGROUND, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopForeground").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_FOREGROUND, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopExItem").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(AVATAR_TYPE_EXITEM, 0, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopNext").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(g_current_shop_type, g_current_shop_page + 1, a.myPlayerInfo.gender, d)
   });
   $("#buttonShopPrev").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      24 != a.myPlayerInfo.rank && (g_ss = 0);
      ShopSetPage(g_current_shop_type, g_current_shop_page - 1, a.myPlayerInfo.gender, d)
   })
}
function ShopSetMyItems(a) {
   a.SendGetMyAvatars()
}

function ShopSetMyItems2(a, b) {
   var d = "",
       c = "pop time atk def life item dig shld".split(" "),
       e = [AVATAR_INDEX_STAT_POP, AVATAR_INDEX_STAT_TIME, AVATAR_INDEX_STAT_ATK, AVATAR_INDEX_STAT_DEF, AVATAR_INDEX_STAT_LIFE, AVATAR_INDEX_STAT_ITEM, AVATAR_INDEX_STAT_DIG, AVATAR_INDEX_STAT_SHLD],
       f = !1;
   ShopWearEquippedItems(b);
   for (var j = 0; j < a.length; j++) {
      var m = a[j],
          k = m[0],
          p = m[1],
          h = m[2],
          n = m[3],
          o = m[4],
          t = m[5],
          q = AVATARS[p];
      if (void 0 == q) debug && console.log("*** ERROR: Unknown avatar:", m);
      else {
         var m = q[AVATAR_INDEX_TYPE],
             y = q[AVATAR_INDEX_GENDER],
             r = q[AVATAR_INDEX_NAME],
             x = void 0;
         if (n) if (n = new Date(n) - new Date, n >= MS_IN_1_DAY) x = Math.floor(n / MS_IN_1_DAY) + 1 + " Days";
         else if (0 < n) x = Math.floor(n / MS_IN_1_HOUR) + 1 + " Hours";
         else
         continue;
         d += '<div id="shop_my_item' + j + '" class="shop_my_item" onmousedown="ShopSelectMyItem(' + j + ",'" + b + '\')" avatar_id="' + k + '" avatar_number="' + p + '" avatar_type="' + m + '">';
         t ? d += '<div class="shop_my_item_gift"></div>' : o && (d += '<div class="shop_my_item_cash"></div>');
         d += '<div class="shop_my_item_icon shop_item_icon_' + m + y + '"></div><div class="shop_my_item_name">' + r + (x ? " (" + x + ")" : "") + '</div><div class="shop_my_item_equip' + (h ? " equipped" : "") + ' "></div>';
         for (o = k = 0; o < c.length; o++) t = e[o], n = c[o], q[t] && (d += '<div class="shop_my_item_stat shop_my_item_stat' + k + '"> <div class="stat_icon stat_icon_' + (0 < q[t] ? n : n + "-") + '"></div> <div class="stat_digit1 stat_font stat_font' + Math.floor(Math.abs(q[t] / 10)) + '"></div> <div class="stat_digit2 stat_font stat_font' + Math.abs(q[t] % 10) + '"></div> </div>', k++);
         d += "</div>";
         h && g_shop_player.change(p);
         9E3 == q[AVATAR_INDEX_N] && (f = !0)
      }
   }
   f && !g_shop_player.background && g_shop_player.change(POWER_USER_BACKGROUND);
   $("#shop_my_items").html(d);
   $("#shop_my_items_container").tinyscrollbar_update();
   d = a.length.toString().split("");
   for (c = 0; 4 > c; c++) $("#shop_my_items_number .digit" + c).removeClass().addClass("digit" + c + (c < d.length ? " stat_font stat_font" + d[c] : ""));
   ShopUpdateMyStats()
}
function ShopSetMyGoldCash(a, b) {
   $("#shop_my_cash").html(Commatize(b) + " Cash");
   $("#shop_my_gold").html(Commatize(a) + " Gold")
}

function ShopSelectMyItem(a, b) {
   if ($("#shop_my_item" + a).hasClass("selected")) {
      $("#shop_my_item" + a).attr("avatar_id");
      $("#shop_my_item" + a).attr("avatar_number");
      var d = $("#shop_my_item" + a).attr("avatar_type");
      d != AVATAR_TYPE_EXITEM && ($("#shop_my_item" + a + " .shop_my_item_equip").hasClass("equipped") ? $("#shop_my_item" + a + " .shop_my_item_equip").removeClass("equipped") : ($(".shop_my_item_equip.equipped").each(function() {
         $(this).parent().attr("avatar_type") == d && $(this).removeClass("equipped")
      }), $("#shop_my_item" + a + " .shop_my_item_equip").addClass("equipped")), ShopWearEquippedItems(b))
   } else $(".shop_my_item").removeClass("selected"), $(".shop_my_item .shop_my_item_name").removeClass("blackShadow"), $(".shop_my_item .shop_my_item_cash").removeClass("selected"), $(".shop_my_item .shop_my_item_gift").removeClass("selected"), $("#shop_my_item" + a).addClass("selected"), $("#shop_my_item" + a + " .shop_my_item_name").addClass("blackShadow"), $("#shop_my_item" + a + " .shop_my_item_cash").addClass("selected"), $("#shop_my_item" + a + " .shop_my_item_gift").addClass("selected")
}

function ShopSetPage(a, b, d, c) {
   var e = [],
       f, j = 0;
   for (f = AVATARS.length - 1; 0 <= f; f--) AVATARS[f] && ((AVATARS[f][AVATAR_INDEX_SHOP] || g_ss) && AVATARS[f][AVATAR_INDEX_TYPE] == a && (AVATARS[f][AVATAR_INDEX_GENDER] == GENDER_ALL || AVATARS[f][AVATAR_INDEX_GENDER] == d || AVATARS[f][AVATAR_INDEX_TYPE] == AVATAR_TYPE_FLAG || AVATARS[f][AVATAR_INDEX_TYPE] == AVATAR_TYPE_BACKGROUND || AVATARS[f][AVATAR_INDEX_TYPE] == AVATAR_TYPE_FOREGROUND || AVATARS[f][AVATAR_INDEX_TYPE] == AVATAR_TYPE_EXITEM || g_ss)) && e.push(f), AVATARS[f] && !AVATARS[f][AVATAR_INDEX_SHOP] && j++;
   j != c && (e = []);
   f = Math.floor((e.length + 9 - 1) / 9);
   0 == f ? b = 0 : (0 > b && (b += f), b %= f);
   e = e.slice(9 * b, 9 * (b + 1));
   g_current_shop_type = a;
   g_current_shop_page = b;
   var a = "pop time atk def life item dig shld".split(" "),
       b = [AVATAR_INDEX_STAT_POP, AVATAR_INDEX_STAT_TIME, AVATAR_INDEX_STAT_ATK, AVATAR_INDEX_STAT_DEF, AVATAR_INDEX_STAT_LIFE, AVATAR_INDEX_STAT_ITEM, AVATAR_INDEX_STAT_DIG, AVATAR_INDEX_STAT_SHLD],
       m;
   for (f = 0; f < e.length; f++) {
      c = e[f];
      d = AVATARS[c];
      m = d[AVATAR_INDEX_N];
      var j = d[AVATAR_INDEX_TYPE],
          k = d[AVATAR_INDEX_GENDER];
      m =
      d[AVATAR_INDEX_URL] ? d[AVATAR_INDEX_URL] : j == AVATAR_TYPE_BACKGROUND ? STATIC_DIR + "images/backgrounds/b20" + m + ".png" : j == AVATAR_TYPE_FOREGROUND ? STATIC_DIR + "images/backgrounds/f20" + m + ".png" : STATIC_DIR + "images/avatars/" + k + j + (m + 1E5).toString().substring(1) + ".png";
      $("#shop_item" + f + " .shop_item_icon").removeClass().addClass("shop_item_icon shop_item_icon_" + j + k);
      $("#shop_item" + f + " .shop_item_name").html(d[AVATAR_INDEX_NAME]);
      d[AVATAR_INDEX_GRAPHICS] && d[AVATAR_INDEX_GRAPHICS][0] && (void 0 != d[AVATAR_INDEX_GRAPHICS][1] ? $("#shop_item" + f + " .shop_item_image").css({
         background: "url(" + m + ") no-repeat -" + (d[AVATAR_INDEX_GRAPHICS][0][0] + 1) + "px 0",
         width: d[AVATAR_INDEX_GRAPHICS][1][0],
         height: d[AVATAR_INDEX_GRAPHICS][1][1],
         left: (158 - d[AVATAR_INDEX_GRAPHICS][1][0]) / 2
      }) : $("#shop_item" + f + " .shop_item_image").css({
         background: "url(" + m + ") no-repeat 0 0",
         width: d[AVATAR_INDEX_GRAPHICS][0][0],
         height: d[AVATAR_INDEX_GRAPHICS][0][1],
         left: (158 - d[AVATAR_INDEX_GRAPHICS][0][0]) / 2
      }));
      j = d[AVATAR_INDEX_GOLD_WEEK] ? d[AVATAR_INDEX_GOLD_WEEK] : d[AVATAR_INDEX_GOLD_MONTH] ? d[AVATAR_INDEX_GOLD_MONTH] : d[AVATAR_INDEX_GOLD_PERM] ? d[AVATAR_INDEX_GOLD_PERM] : 0;
      k = d[AVATAR_INDEX_CASH_WEEK] ? d[AVATAR_INDEX_CASH_WEEK] : d[AVATAR_INDEX_CASH_MONTH] ? d[AVATAR_INDEX_CASH_MONTH] : d[AVATAR_INDEX_CASH_PERM] ? d[AVATAR_INDEX_CASH_PERM] : 0;
      $("#shop_item" + f + " .shop_item_cash").html(k ? Commatize(k) + " Cash" : "Gold Only");
      $("#shop_item" + f + " .shop_item_gold").html(j ? Commatize(j) + " Gold" : "Cash Only");
      $("#shop_item" + f).show();
      $("#shop_item" + f).attr("avatar_index", c);
      for (j = c = 0; j < a.length; j++) k = b[j], m = a[j], d[k] && ($("#shop_item" + f + " .shop_item_stat" + c + " .stat_icon").removeClass().addClass("stat_icon stat_icon_" + (0 < d[k] ? m : m + "-")).show(), $("#shop_item" + f + " .shop_item_stat" + c + " .stat_digit1").removeClass().addClass("stat_digit1 stat_font stat_font" + Math.floor(Math.abs(d[k] / 10))).show(), $("#shop_item" + f + " .shop_item_stat" + c + " .stat_digit2").removeClass().addClass("stat_digit2 stat_font stat_font" + Math.abs(d[k] % 10)).show(), c++);
      for (; 8 > c; c++) $("#shop_item" + f + " .shop_item_stat" + c + " .stat_icon").hide(), $("#shop_item" + f + " .shop_item_stat" + c + " .stat_digit1").hide(), $("#shop_item" + f + " .shop_item_stat" + c + " .stat_digit2").hide()
   }
   for (; 9 > f; f++) $("#shop_item" + f).hide();
   e = ShopGetSelected();
   $("#shop_item" + e).removeClass("selected")
}

function ShopWearEquippedItems(a) {
   var b = !0,
       d = !0,
       c = !0,
       e = !0,
       f = !0,
       j = !0;
   $(".shop_my_item_equip.equipped").parent().each(function() {
      g_shop_player.change($(this).attr("avatar_number"));
      $(this).attr("avatar_type") == AVATAR_TYPE_HEAD ? b = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_BODY ? d = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_EYES ? c = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_FLAG ? e = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_BACKGROUND ? f = !1 : $(this).attr("avatar_type") == AVATAR_TYPE_FOREGROUND && (j = !1)
   });
   $(".shop_my_item").each(function() {
      $(this).attr("avatar_number") == POWER_USER_EXITEM && f && (f = !1, g_shop_player.change(POWER_USER_BACKGROUND))
   });
   b && g_shop_player.change(a == GENDER_MALE ? AVATAR_NAKED_HEAD_MALE : AVATAR_NAKED_HEAD_FEMALE);
   d && g_shop_player.change(a == GENDER_MALE ? AVATAR_NAKED_BODY_MALE : AVATAR_NAKED_BODY_FEMALE);
   c && g_shop_player.change(void 0, AVATAR_TYPE_EYES);
   e && g_shop_player.change(void 0, AVATAR_TYPE_FLAG);
   f && g_shop_player.change(void 0, AVATAR_TYPE_BACKGROUND);
   j && g_shop_player.change(void 0, AVATAR_TYPE_FOREGROUND);
   ShopUpdateMyStats()
}
function ShopSelectItem(a, b) {
   var d = ShopGetSelected();
   d == a ? ($("#shop_item" + d).removeClass("selected"), ShopWearEquippedItems(b)) : ($("#shop_item" + d).removeClass("selected"), $("#shop_item" + a).addClass("selected"), ShopTry())
}
function ShopGetSelected() {
   for (var a = 0; 9 > a; a++) if ($("#shop_item" + a).hasClass("selected")) return a
}

function ShopTry() {
   var a = ShopGetSelected();
   void 0 != a && (a = $("#shop_item" + a).attr("avatar_index"), 9E3 == AVATARS[a][0] && !g_shop_player.background && (a = POWER_USER_BACKGROUND), g_shop_player.change(a), ShopUpdateMyStats())
}

function ShopBuy() {
   var a = ShopGetSelected();
   if (void 0 != a) {
      var a = $("#shop_item" + a).attr("avatar_index"),
          b = AVATARS[a],
          d = b[AVATAR_INDEX_N],
          c = b[AVATAR_INDEX_TYPE],
          e = b[AVATAR_INDEX_GENDER],
          f = b[AVATAR_INDEX_NAME],
          d = b[AVATAR_INDEX_URL] ? b[AVATAR_INDEX_URL] : c == AVATAR_TYPE_BACKGROUND ? STATIC_DIR + "images/backgrounds/b20" + d + ".png" : c == AVATAR_TYPE_FOREGROUND ? STATIC_DIR + "images/backgrounds/f20" + d + ".png" : STATIC_DIR + "images/avatars/" + e + c + (d + 1E5).toString().substring(1) + ".png";
      $("#shop_buy_dialog .shop_item_icon").removeClass().addClass("shop_item_icon shop_item_icon_" + c + e);
      $("#shop_buy_dialog .shop_item_name").html(f);
      b[AVATAR_INDEX_GRAPHICS] && b[AVATAR_INDEX_GRAPHICS][0] && (void 0 != b[AVATAR_INDEX_GRAPHICS][1] ? $("#shop_buy_dialog .shop_item_image").css({
         background: "url(" + d + ") no-repeat -" + (b[AVATAR_INDEX_GRAPHICS][0][0] + 1) + "px 0",
         width: b[AVATAR_INDEX_GRAPHICS][1][0],
         height: b[AVATAR_INDEX_GRAPHICS][1][1],
         left: 156 + (158 - b[AVATAR_INDEX_GRAPHICS][1][0]) / 2
      }) : $("#shop_buy_dialog .shop_item_image").css({
         background: "url(" + d + ") no-repeat 0 0",
         width: b[AVATAR_INDEX_GRAPHICS][0][0],
         height: b[AVATAR_INDEX_GRAPHICS][0][1],
         left: 156 + (158 - b[AVATAR_INDEX_GRAPHICS][0][0]) / 2
      }));
      $("#buy_cash_week").html(0 < b[AVATAR_INDEX_CASH_WEEK] ? Commatize(b[AVATAR_INDEX_CASH_WEEK]) : "Can't buy");
      $("#buy_cash_month").html(0 < b[AVATAR_INDEX_CASH_MONTH] ? Commatize(b[AVATAR_INDEX_CASH_MONTH]) : "Can't buy");
      $("#buy_cash_perm").html(0 < b[AVATAR_INDEX_CASH_PERM] ? Commatize(b[AVATAR_INDEX_CASH_PERM]) : "Can't buy");
      $("#buy_gold_week").html(0 < b[AVATAR_INDEX_GOLD_WEEK] ? Commatize(b[AVATAR_INDEX_GOLD_WEEK]) : "Can't buy");
      $("#buy_gold_month").html(0 < b[AVATAR_INDEX_GOLD_MONTH] ? Commatize(b[AVATAR_INDEX_GOLD_MONTH]) : "Can't buy");
      $("#buy_gold_perm").html(0 < b[AVATAR_INDEX_GOLD_PERM] ? Commatize(b[AVATAR_INDEX_GOLD_PERM]) : "Can't buy");
      g_current_buy_avatar_index = a;
      ShopSetPeriod(0);
      g_graphics_high ? $("#shop_buy_dialog").fadeIn() : $("#shop_buy_dialog").show()
   }
}
function ShopBuyCloseDialog() {
   g_graphics_high ? $("#shop_buy_dialog").effect("explode") : $("#shop_buy_dialog").hide()
}
var BUY_PERIOD = ["1 Week", "1 Month", "Limitless"],
    PERIOD_WEEK = 0,
    PERIOD_MONTH = 1,
    PERIOD_PERM = 2;

function ShopGetPeriod() {
   var a = BUY_PERIOD.indexOf($("#buy_period").html()); - 1 == a && ShopSetPeriod(0);
   return a
}

function ShopSetPeriod(a) {
   $("#buy_period").html(BUY_PERIOD[a]);
   var b = AVATARS[g_current_buy_avatar_index];
   a == PERIOD_WEEK ? (0 < b[AVATAR_INDEX_CASH_WEEK] ? $("#buy_cash_btn").addClass("active") : $("#buy_cash_btn").removeClass("active"), 0 < b[AVATAR_INDEX_GOLD_WEEK] ? $("#buy_gold_btn").addClass("active") : $("#buy_gold_btn").removeClass("active")) : a == PERIOD_MONTH ? (0 < b[AVATAR_INDEX_CASH_MONTH] ? $("#buy_cash_btn").addClass("active") : $("#buy_cash_btn").removeClass("active"), 0 < b[AVATAR_INDEX_GOLD_MONTH] ? $("#buy_gold_btn").addClass("active") : $("#buy_gold_btn").removeClass("active")) : a == PERIOD_PERM && (0 < b[AVATAR_INDEX_CASH_PERM] ? $("#buy_cash_btn").addClass("active") : $("#buy_cash_btn").removeClass("active"), 0 < b[AVATAR_INDEX_GOLD_PERM] ? $("#buy_gold_btn").addClass("active") : $("#buy_gold_btn").removeClass("active"))
}

function ShopDoPurchase(a, b) {
   var d = AVATARS[g_current_buy_avatar_index],
       c, e = ShopGetPeriod();
   e == PERIOD_WEEK ? c = a ? d[AVATAR_INDEX_CASH_WEEK] : d[AVATAR_INDEX_GOLD_WEEK] : e == PERIOD_MONTH ? c = a ? d[AVATAR_INDEX_CASH_MONTH] : d[AVATAR_INDEX_GOLD_MONTH] : e == PERIOD_PERM && (c = a ? d[AVATAR_INDEX_CASH_PERM] : d[AVATAR_INDEX_GOLD_PERM]);
   DragonDialogOpen("Are you sure?", 'Are you sure you want to purchase <span class="AlertBold">' + d[AVATAR_INDEX_NAME] + '</span> for <span class="AlertBold">' + $("#buy_period").html() + '</span> time at <span class="AlertBold">' + Commatize(c) + " " + (a ? "Cash" : "Gold") + "</span> ?", 2, function(d) {
      d && b.SendPurchase(g_current_buy_avatar_index, a, e, c)
   })
}

function ShopUpdateMyStats() {
   for (var a = "pop shld item def life atk dig time".split(" "), b = [AVATAR_INDEX_STAT_POP, AVATAR_INDEX_STAT_SHLD, AVATAR_INDEX_STAT_ITEM, AVATAR_INDEX_STAT_DEF, AVATAR_INDEX_STAT_LIFE, AVATAR_INDEX_STAT_ATK, AVATAR_INDEX_STAT_DIG, AVATAR_INDEX_STAT_TIME], d = g_shop_player.GetAvatars(), c = 0; c < a.length; c++) {
      for (var e = 0, f = 0; f < d.length; f++) {
         var j = AVATARS[d[f]];
         void 0 != j && (j = j[b[c]], void 0 != j && (e += j))
      }
      50 < e && (e = 50);
      f = a[c];
      $("#shop_my_stats .shop_item_stat" + c + " .stat_icon").removeClass().addClass("stat_icon stat_icon_" + (0 <= e ? f : f + "-")).show();
      $("#shop_my_stats .shop_item_stat" + c + " .stat_digit1").removeClass().addClass("stat_digit1 stat_font stat_font" + Math.floor(Math.abs(e / 10))).show();
      $("#shop_my_stats .shop_item_stat" + c + " .stat_digit2").removeClass().addClass("stat_digit2 stat_font stat_font" + Math.abs(e % 10)).show()
   }
}
function ShopClose(a) {
   var b = [];
   $(".shop_my_item_equip.equipped").parent().each(function() {
      b.push(Number($(this).attr("avatar_id")))
   });
   a.SendEquip(b);
   SwitchToChannelScreen(a)
}

function DragonDesigner_ChangeAvatar(a, b, d) {
   var c = random(1E4, 19999);
   AVATARS[c] = [c, a, "m", "TEST " + c, "", 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, JSON.parse(d), void 0, b];
   g_shop_player.change(c, a, !0)
}
function DragonDesigner_FillGraphicsByType() {
   var a = Number($("#DragonDesignerType").val()),
       a = g_shop_player.GetAvatars()[a],
       a = void 0 == a ? "" : JSON.stringify(AVATARS[a][AVATAR_INDEX_GRAPHICS]);
   $("#DragonDesignerTypeAnimation").val(a)
}

function DragonDesigner_Init() {
   "undefined" === typeof window.FileReader ? debug && console.log("FileReader Unsupported") : $("#shop_player").bind("dragenter dragover", function() {
      $(this).css("box-shadow", "yellow 0px 0px 70px 70px");
      return !1
   }).bind("dragend dragleave", function() {
      $(this).css("box-shadow", "");
      return !1
   }).bind("drop", function(a) {
      a = a.originalEvent;
      a.preventDefault();
      $("#shop_player").css("box-shadow", "");
      var a = a.dataTransfer.files[0],
          b = new FileReader;
      b.onload = function(a) {
         var b = a.target.result,
             a =
             $('<div id="DragonDesigner" class="AlertBox"><div class="AlertBoxTitle">Create Your Avatar</div><div class="AlertBoxContent blackShadow">Type: <select id="DragonDesignerType"><option value="0">Head</option><option value="1">Body</option><option value="2">Eyes</option><option value="3">Flag</option><option value="4">Background</option><option value="5">Foreground</option></select><p>Frames: [W,H,CenterX,CenterY]<br><textarea rows="4" cols="28" id="DragonDesignerTypeAnimation"></textarea><div id="DragonDesignerOK" class="buttonOK"></div></div></div>');
         $("#container").append(a);
         DragonDesigner_FillGraphicsByType();
         $("#DragonDesignerType").change(DragonDesigner_FillGraphicsByType);
         $("#DragonDesignerOK").click(function() {
            var a = [AVATAR_TYPE_HEAD, AVATAR_TYPE_BODY, AVATAR_TYPE_EYES, AVATAR_TYPE_FLAG, AVATAR_TYPE_BACKGROUND, AVATAR_TYPE_FOREGROUND],
                d = Number($("#DragonDesignerType").val()),
                a = a[d],
                d = $("#DragonDesignerTypeAnimation").val();
            DragonDesigner_ChangeAvatar(a, b, d);
            $("#DragonDesigner").remove()
         })
      };
      b.readAsDataURL(a);
      return !1
   })
}

function SecretShop() {
   g_ss = 1
};
var TAB_ALL = 0,
    TAB_FRIENDS = 1,
    TAB_GUILD = 2,
    GUILD_JOB_MEMBER = 0,
    GUILD_JOB_LEADER = 1,
    GUILD_JOB_SEMI_LEADER = 2,
    g_init_up, ROOM_NAMES = ["Hello World", "The Love Room", "DragonBound", "Welcome", "Let's Rock!"];

function ChannelGUI(a) {
   $("#channel").tinyscrollbar({
      size: 101
   });
   $("#playersList").tinyscrollbar({
      size: 207
   });
   $("#friendsList").tinyscrollbar({
      size: 208
   });
   $("#guildMembersList").tinyscrollbar({
      size: 208
   });
   $("#buttonCreateRoom").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT);
      6 > a.myPlayerInfo.unlock ? CreateRoomChangeMode(GAME_MODE_BOSS, a.myPlayerInfo.unlock) : CreateRoomChangeMode(GAME_MODE_NORMAL, a.myPlayerInfo.unlock);
      $("#createRoomTitle").val(ROOM_NAMES[random(0, ROOM_NAMES.length - 1)]);
      FadeInDialog("dialogCreateRoom");
      $("#createRoomTitle").focus()
   });
   $("#buttonOptions").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ToggleOptionsDialog()
   });
   $("#buttonRoomsListDown").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("next")
   });
   $("#buttonRoomsListUp").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("prev")
   });
   $(".room").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var b = $(this).children(".roomNumber").html();
      $(this).children(".roomLock").hasClass("roomLocked") ? ($("#join_room_input").val(b), FadeInDialog("dialog_join_room_div"), $("#join_password_input").val("").focus()) : a.SendRoomJoin(b)
   }).bind("contextmenu", function() {
      var b = $(this).children(".roomNumber").html();
      g_extra_info_room == b ? CloseRoomExtraInfo() : a.SendChannelGetRoomInfo(b)
   });
   $("#buttonJoin").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#join_password_input").val("");
      FadeInDialog("dialog_join_room_div");
      $("#join_room_input").focus()
   });
   $("#buttonMyInfo").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#display_name").val(a.myPlayerInfo.game_id);
      $("#can_show_photo").prop("checked", !! a.myPlayerInfo.fb);
      FadeInDialog("dialog_change_name_div")
   });
   $("#buttonShop").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      SwitchToShopScreen(a)
   });
   $("#buttonQuickJoin").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendQuickJoin()
   });
   $("#dialog_change_name_cancel").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("dialog_change_name_div")
   });
   $("#dialog_change_name_ok").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("dialog_change_name_div", !0);
      var b = $("#display_name").val(),
          d = $("#can_show_photo").is(":checked");
      b != a.myPlayerInfo.game_id && (-1 != b.indexOf("  ") ? DragonDialogOpen("Sorry", "Double space is not allowed, try single space.", DIALOG_BUTTONS_OK) : /GM\W/.exec(b) ? DragonDialogOpen("Sorry", "GM in name is not allowed, try a different name.", DIALOG_BUTTONS_OK) : DragonDialogOpen("Are you sure to change name?", 0 == a.myPlayerInfo.name_changes ? 'This is your first name change so it will be <font color="cyan">FREE</font> this time, future changes will be 4,000 Cash.<br><br>Change name to <font color="yellow">' + b + "</font> ?" : 'Name change costs <font color="cyan">4,000 Cash</font>.<br><br>Are you sure you want to change name to <font color="yellow">' + b + "</font> ?", DIALOG_BUTTONS_OK_CANCEL, function(c) {
         c && a.SendChangeName(b)
      })); !! a.myPlayerInfo.fb != d && a.SendChangeInfo(d)
   });
   $("#changePassword").click(function() {
      ExplodeDialog("dialog_change_name_div", !0);
      a.dragonLogin.ChangePassword()
   });
   $("#dialog_join_room_cancel").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("dialog_join_room_div")
   });
   $("#dialog_join_room_ok").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var b = Number($("#join_room_input").val());
      if (isNaN(b) || 0 >= b) DragonDialogOpen("Sorry", "Room Number should be a positive number.", DIALOG_BUTTONS_OK_CANCEL);
      else {
         var d = $("#join_password_input").val();
         a.SendRoomJoin(b, d);
         ExplodeDialog("dialog_join_room_div")
      }
   });
   $("#channelInput").bind("keyup", function(b) {
      13 == b.which && "" != this.value && (b = this.value, this.value = "", a.SendChat(b))
   });
   $("#buttonRanking").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_is_show_ranking = !g_is_show_ranking;
      Resize(!0);
      g_is_show_ranking ? $("#buttonRanking").addClass("open") : $("#buttonRanking").removeClass("open")
   });
   $("#event_button").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendEvent(0)
   });
   $("#facebook_post").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      Facebook_PostToFeed(a)
   });
   $("#buttonAllBuddyList").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      var b = $("#buttonAllBuddyList");
      b.hasClass("BuddyList") ? (TabChangeTo(TAB_GUILD), a.SendTabWatch(2), 0 == $("#guildMembersListHtml").children().length && a.SendRefreshGuildies()) : b.hasClass("Guild") ? (TabChangeTo(TAB_ALL), a.SendTabWatch(0)) : (TabChangeTo(TAB_FRIENDS), a.SendTabWatch(1), 0 == $("#friendsListHtml").children().length && a.SendRefreshFriends())
   });
   $("#filter_all").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("all")
   });
   $("#filter_waiting").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("waiting")
   });
   $("#filter_normal").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("normal")
   });
   $("#filter_boss").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("boss")
   });
   $("#filter_same").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("same")
   });
   $("#filter_friends").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("friends")
   });
   $("#filter_guild").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendChannelRooms("guild")
   });
   $("#buttonStart1v1").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendStartTournamentGame(1, a.lobbyMobile, [])
   });
   $("#buttonCreateTeam").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.SendCreateTeam()
   });
   $("#buttonJoinTeam").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#join_password_input").val("");
      FadeInDialog("dialog_join_room_div");
      $("#join_room_input").focus()
   });
   $("#lobbyButtonMobile").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      a.lobbyMobile++;
      a.lobbyMobile > LAST_SELECTABLE_MOBILE && (a.lobbyMobile = FIRST_SELECTABLE_MOBILE);
      g_channel_player.change_mobile(a.lobbyMobile)
   });
   $(".BrokerChannel").click(function() {
      if ($(this).hasClass("BrokerChannelOnline")) {
         var b = $(this).attr("id").slice(13);
         a.ConnectToGameServer(a.channels[b][1], a.channels[b][2]);
         var d = $("#BrokerChannel" + b + " .BrokerChannelName").html();
         $("#channelName").html(d);
         a.server = b
      }
   });
   $("#buttonChannels").click(function() {
      a.OpenBrokerWindow()
   });
   $("#BrokerRefresh").click(function() {
      a.BrokerConnect()
   });
   CreateRoomDialogGUI(a);
   OptionsDialogGUI(a)
}

function Facebook_PostToFeed(a) {
   var b = "icon180x180.png icon2_180x180.png icon3_180x180.jpg icon4_180x180.jpg icon5_180x180.jpg icon6_180x180.jpg".split(" "),
       b = b[random(0, b.length - 1)],
       d = "DragonBound " + ("br" == SERVER_TYPE ? "Brasil" : "Global"),
       c = d + " - " + l.t("The next generation of HTML5 online multi-player games in your browser!"),
       e = "br" == SERVER_TYPE ? "http://dragonbound-brasil.com" : "http://carlosx.byethost15.com",
       f = l.t("Play with or against your friends from your browser anywhere for free. Shop for avatars to make you stronger. Unlock hidden characters, game modes, and challenges. Meet new friends. Single player option too.");
   FB.ui({
      method: "feed",
      link: e,
      picture: e + "/static/images/" + b,
      name: c,
      caption: d,
      description: f
   }, function(b) {
      null != b && a.SendEvent(1, b.post_id)
   })
}

function PrepareOptionsDialog(a) {
   a ? ($("#OptionsLeave").show(), $("#OptionsOK").css("left", "175px"), $("#OptionsDialog").css({
      left: 2,
      top: 267
   })) : a || ($("#OptionsLeave").hide(), $("#OptionsOK").css("left", "106px"), $("#OptionsDialog").css({
      left: 241,
      top: 221
   }));
   g_audio_is_music_on ? $("#OptionsMusic").removeClass("CheckboxOff").addClass("CheckboxOn") : $("#OptionsMusic").removeClass("CheckboxOn").addClass("CheckboxOff");
   g_audio_is_effects_on ? $("#OptionsEffects").removeClass("CheckboxOff").addClass("CheckboxOn") : $("#OptionsEffects").removeClass("CheckboxOn").addClass("CheckboxOff");
   g_graphics_high ? ($("#OptionsGraphicsHigh").removeClass("RadioOff").addClass("RadioOn"), $("#OptionsGraphicsLow").removeClass("RadioOn").addClass("RadioOff")) : ($("#OptionsGraphicsHigh").removeClass("RadioOn").addClass("RadioOff"), $("#OptionsGraphicsLow").removeClass("RadioOff").addClass("RadioOn"));
   g_is_game_background ? ($("#OptionsBackgroundOn").removeClass("RadioOff").addClass("RadioOn"), $("#OptionsBackgroundOff").removeClass("RadioOn").addClass("RadioOff")) : ($("#OptionsBackgroundOn").removeClass("RadioOn").addClass("RadioOff"), $("#OptionsBackgroundOff").removeClass("RadioOff").addClass("RadioOn"));
   g_is_game_slice ? ($("#OptionsShootingModeSlice").removeClass("RadioOff").addClass("RadioOn"), $("#OptionsShootingModeDrag").removeClass("RadioOn").addClass("RadioOff")) : ($("#OptionsShootingModeSlice").removeClass("RadioOn").addClass("RadioOff"), $("#OptionsShootingModeDrag").removeClass("RadioOff").addClass("RadioOn"));
   $("#OptionsLangEN, #OptionsLangPR, #OptionsLangES, #OptionsLangFI, #OptionsLangVN").removeClass("RadioOn").addClass("RadioOff");
   l.lang == LANGUAGE.EN ? $("#OptionsLangEN").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.ES ? $("#OptionsLangES").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.PR ? $("#OptionsLangPR").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.FI ? $("#OptionsLangFI").removeClass("RadioOff").addClass("RadioOn") : l.lang == LANGUAGE.VN && $("#OptionsLangVN").removeClass("RadioOff").addClass("RadioOn")
}

function OptionsDialogGUI(a) {
   $("#OptionsOK").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("OptionsDialog")
   });
   $("#OptionsMusic").click(function() {
      $("#OptionsMusic").hasClass("CheckboxOn") ? (AudioTurnMusicOff(), setCookie("music", 0)) : (AudioTurnMusicOn(), setCookie("music", 1));
      AudioPlay(AUDIO_BUTTON_SELECT2);
      PrepareOptionsDialog( !! a.game)
   });
   $("#OptionsEffects").click(function() {
      $("#OptionsEffects").hasClass("CheckboxOn") ? (AudioTurnEffectsOff(), setCookie("effects", 0)) : (AudioTurnEffectsOn(), setCookie("effects", 1));
      AudioPlay(AUDIO_BUTTON_SELECT2);
      PrepareOptionsDialog( !! a.game)
   });
   $("#OptionsGraphicsHigh").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_graphics_high = !0;
      PrepareOptionsDialog( !! a.game)
   });
   $("#OptionsGraphicsLow").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_graphics_high = !1;
      PrepareOptionsDialog( !! a.game)
   });
   $("#OptionsBackgroundOn").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_is_game_background = !0;
      PrepareOptionsDialog( !! a.game);
      $("#map_bg").show();
      setCookie("background", 1)
   });
   $("#OptionsBackgroundOff").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_is_game_background = !1;
      PrepareOptionsDialog( !! a.game);
      $("#map_bg").hide();
      setCookie("background", 0)
   });
   $("#OptionsShootingModeSlice").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_is_game_slice = !0;
      PrepareOptionsDialog( !! a.game);
      UpdateSliceDragGUI();
      setCookie("slice", 1)
   });
   $("#OptionsShootingModeDrag").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      g_is_game_slice = !1;
      PrepareOptionsDialog( !! a.game);
      UpdateSliceDragGUI();
      setCookie("slice", 0)
   });
   $("#OptionsLangEN").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      l.lang = LANGUAGE.EN;
      l.SetAll();
      RankingReClick();
      PrepareOptionsDialog( !! a.game);
      setCookie("lang", l.lang)
   });
   $("#OptionsLangES").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      l.lang = LANGUAGE.ES;
      l.SetAll();
      RankingReClick();
      PrepareOptionsDialog( !! a.game);
      setCookie("lang", l.lang)
   });
   $("#OptionsLangPR").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      l.lang = LANGUAGE.PR;
      l.SetAll();
      RankingReClick();
      PrepareOptionsDialog( !! a.game);
      setCookie("lang", l.lang)
   });
   $("#OptionsLangFI").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      l.lang = LANGUAGE.FI;
      l.SetAll();
      RankingReClick();
      PrepareOptionsDialog( !! a.game);
      setCookie("lang", l.lang)
   });
   $("#OptionsLangVN").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      l.lang = LANGUAGE.VN;
      l.SetAll();
      RankingReClick();
      PrepareOptionsDialog( !! a.game);
      setCookie("lang", l.lang)
   });
   $("#OptionsTheme").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      DragonThemeDialog()
   });
   $("#OptionsLeave").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      ExplodeDialog("OptionsDialog");
      a.should_stay_in_game_screen = !1;
      a.game && (0 > a.game.my_player_index ? a.SendRoomLeave() : DragonDialogOpen("Quit Game?", "Alive: -5 GP, -1500 Gold, +1 Lose<p><br>Dead: +1 Lose", DIALOG_BUTTONS_OK_CANCEL, function(b) {
         b && a.SendRoomLeave()
      }, [35, 52]))
   });
   $("#DragonThemeDialog").dialog({
      autoOpen: !1,
      show: {
         effect: "blind",
         duration: 500
      },
      hide: {
         effect: "explode",
         duration: 500
      },
      width: 510,
      height: 420,
      modal: !0
   });
   for (var b in DragonThemeDefault) $("#theme_" + b).focusout(function() {
      0 != DragonTheme_ChangeOneProperty(this.id.substr(6), this.value, function(a, b) {
         $("#theme_" + a).css("background-color", b ? "#9f9" : "#f99")
      }) && $("#themeFull").val(DragonTheme_ToJSON()).css("background-color", "")
   });
   $("#themeFull").focusout(function() {
      var a = DragonTheme_SetThemeFromJSON(this.value);
      if (1 == a) {
         for (var b in DragonThemeDefault) $("#theme_" + b).val(DragonTheme_GetValue(b)).css("background-color", "");
         $(this).css("background-color", this.value ? "#9f9" : "")
      } else - 1 == a && $(this).css("background-color", "#f99")
   })
}

function DragonThemeDialog() {
   for (var a in DragonThemeInUse) $("#theme_" + a).val(DragonTheme_GetValue(a));
   $("#themeFull").val(DragonTheme_ToJSON());
   $("#DragonThemeDialog").dialog("open")
}

function CreateRoomDialogPressedOK(a) {
   var b, d = "",
       c, e;
   b = $("#createRoomTitle").val();
   $("#CreateRoomPrivateCheckbox").hasClass("checkboxOn") && (d = $("#createRoomPasswordInput").val());
   c = $("#CreateRoomPlayers");
   c = c.hasClass("players1v1") ? 2 : c.hasClass("players2v2") ? 4 : c.hasClass("players3v3") ? 6 : c.hasClass("players1vB") ? 1 : c.hasClass("players2vB") ? 2 : c.hasClass("players3vB") ? 3 : c.hasClass("players4vB") ? 4 : 8;
   e = $("#CreateRoomMode").hasClass("gameModeNormal") ? GAME_MODE_NORMAL : $("#CreateRoomMode").hasClass("gameModeSame") ? GAME_MODE_SAME : GAME_MODE_BOSS;
   a.SendRoomCreate(b, d, c, e)
}

function CreateRoomDialogGUI(a) {
   $("#dialogCreateRoomButtonCancel").click(function() {
      g_graphics_high ? $("#dialogCreateRoom").effect("explode") : $("#dialogCreateRoom").hide();
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#dialogCreateRoomButtonOK").click(function() {
      CreateRoomDialogPressedOK(a);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#CreateRoomPrivateCheckbox").click(function() {
      var a = $("#CreateRoomPrivateCheckbox");
      a.hasClass("checkboxOff") ? (a.removeClass("checkboxOff").addClass("checkboxOn"), $("#CreateRoomPassword").show(), $("#createRoomPasswordInput").focus()) : (a.removeClass("checkboxOn").addClass("checkboxOff"), $("#CreateRoomPassword").hide());
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#CreateRoomNumPlayersPrev").click(function() {
      var a = $("#CreateRoomPlayers"),
          d;
      d = $("#CreateRoomMode").hasClass("gameModeBoss") ? a.hasClass("players1vB") ? "players4vB" : a.hasClass("players2vB") ? "players1vB" : a.hasClass("players3vB") ? "players2vB" : "players3vB" : a.hasClass("players1v1") ? "players4v4" : a.hasClass("players2v2") ? "players1v1" : a.hasClass("players3v3") ? "players2v2" : "players3v3";
      a.removeClass().addClass(d);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#CreateRoomNumPlayersNext").click(function() {
      var a = $("#CreateRoomPlayers"),
          d;
      d = $("#CreateRoomMode").hasClass("gameModeBoss") ? a.hasClass("players1vB") ? "players2vB" : a.hasClass("players2vB") ? "players3vB" : a.hasClass("players3vB") ? "players4vB" : "players1vB" : a.hasClass("players1v1") ? "players2v2" : a.hasClass("players2v2") ? "players3v3" : a.hasClass("players3v3") ? "players4v4" : "players1v1";
      a.removeClass().addClass(d);
      AudioPlay(AUDIO_BUTTON_SELECT2)
   });
   $("#CreateRoomModeNext").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#CreateRoomMode").hasClass("gameModeNormal") ? CreateRoomChangeMode(GAME_MODE_BOSS, a.myPlayerInfo.unlock) : $("#CreateRoomMode").hasClass("gameModeBoss") ? CreateRoomChangeMode(GAME_MODE_SAME, a.myPlayerInfo.unlock) : CreateRoomChangeMode(GAME_MODE_NORMAL, a.myPlayerInfo.unlock)
   });
   $("#CreateRoomModePrev").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      $("#CreateRoomMode").hasClass("gameModeNormal") ? CreateRoomChangeMode(GAME_MODE_SAME, a.myPlayerInfo.unlock) : $("#CreateRoomMode").hasClass("gameModeBoss") ? CreateRoomChangeMode(GAME_MODE_NORMAL, a.myPlayerInfo.unlock) : CreateRoomChangeMode(GAME_MODE_BOSS, a.myPlayerInfo.unlock)
   })
}

function CreateRoomChangeMode(a, b) {
   var d = $("#CreateRoomMode"),
       c, e = $("#CreateRoomPlayers"),
       f;
   a == GAME_MODE_BOSS ? (c = "gameModeBoss", f = e.hasClass("players1v1") ? "players1vB" : e.hasClass("players2v2") ? "players2vB" : e.hasClass("players3v3") ? "players3vB" : "players4vB") : (c = a == GAME_MODE_SAME ? "gameModeSame" : "gameModeNormal", f = e.hasClass("players1v1") ? "players1v1" : e.hasClass("players2v2") ? "players2v2" : e.hasClass("players3v3") ? "players3v3" : e.hasClass("players1vB") ? "players1v1" : e.hasClass("players2vB") ? "players2v2" : e.hasClass("players3vB") ? "players3v3" : "players4v4");
   d.removeClass().addClass(c);
   e.removeClass().addClass(f);
   $("#CreateRoomModeIcon").removeClass().addClass("iconMode" + c.slice(8));
   if ("gameModeNormal" == c && 1 > b) $("#dialogCreateLocked").show(), $("#dialogCreateMessage").html("This mode is locked until you win at BOSS mode as room master."), $("#dialogCreateRoomButtonOK").hide();
   else if ("gameModeSame" == c && 12 > b) $("#dialogCreateLocked").show(), $("#dialogCreateMessage").html("This mode is locked until you win *ALL* BOSS mode levels as room master."), $("#dialogCreateRoomButtonOK").hide();
   else {
      $("#dialogCreateLocked").hide();
      $("#dialogCreateRoomButtonOK").show();
      var j;
      a == GAME_MODE_NORMAL ? j = "Kill the other team to win." : a == GAME_MODE_BOSS ? j = "Fight computer players at increasing difficulty." : a == GAME_MODE_SAME && (j = "Everyone use the same mobile as the room master.");
      $("#dialogCreateMessage").html(j)
   }
}
function ChannelChatClear() {
   $("#channelTextHtml").html("");
   $("#channel").tinyscrollbar_update("bottom")
}

function BuildPlayerNameWithGuild(a, b, d) {
   a && (b = d ? '<span class="GuildNameTeam' + d + '">' + a + "</span> " + b : '<span class="GuildName"><a href="/guild?name=' + encodeURIComponent(a) + '" target="_blank">' + a + "</a></span> " + b);
   return b
}
var PLAYER_INDEX_USER_ID = 0,
    PLAYER_INDEX_GAME_ID = 1,
    PLAYER_INDEX_RANK = 2,
    PLAYER_INDEX_GUILD = 3,
    PLAYER_INDEX_TEAM = 4,
    PLAYER_INDEX_IS_MASTER = 5,
    PLAYER_INDEX_IS_READY = 6,
    PLAYER_INDEX_GENDER = 7,
    PLAYER_INDEX_MOBILE = 8,
    PLAYER_INDEX_AVATARS = 9,
    PLAYER_INDEX_IS_BOT = 10;

function ChannelUpdatePlayersList(a) {
   TabChangeTo(TAB_ALL);
   for (var b = "", d = 0; d < a.length - 3; d += 4) var c = a[d],
       b = b + ('<div class="playerListItem" id="player_user_id_' + c + '" user_id=' + c + '><div class="playerListRank rank rank' + a[d + 2] + '"></div><div class="playerListName blackShadow">' + BuildPlayerNameWithGuild(a[d + 3], a[d + 1]) + "</div></div>");
   $("#channelPlayersListHtml").html(b);
   $("#playersList").tinyscrollbar_update("top")
}

function ChannelPlayerJoined(a, b, d) {
   ChannelPlayerLeft(a);
   $("#channelPlayersListHtml").append('<div class="playerListItem" id="player_user_id_' + a + '" user_id=' + a + '><div class="playerListRank rank rank' + d + '"></div><div class="playerListName blackShadow">' + b + "</div></div>");
   $("#playersList").tinyscrollbar_update("relative")
}
function ChannelPlayerLeft(a) {
   $("#player_user_id_" + a).remove();
   $("#playersList").tinyscrollbar_update("relative")
}

function TabChangeTo(a) {
   a == TAB_ALL ? ($("#buttonAllBuddyList").removeClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").hide()) : a == TAB_FRIENDS ? ($("#buttonAllBuddyList").removeClass("Guild").addClass("BuddyList"), $("#friendsList").show(), $("#guildMembersList").hide(), $("#channelPlayersListHtml").html(""), $("#playersList .scrollbar").hide()) : a == TAB_GUILD && ($("#buttonAllBuddyList").addClass("Guild").removeClass("BuddyList"), $("#friendsList").hide(), $("#guildMembersList").show(), $("#channelPlayersListHtml").html(""), $("#playersList .scrollbar").hide())
}

function GotFullGuildMembersList(a, b) {
   RoomTabChangeTo(TAB_GUILD);
   TabChangeTo(TAB_GUILD);
   if (a) {
      var d = a[0],
          c = a[1],
          e = "??";
      0 == c ? e = "Member" : 1 == c ? e = "Leader" : 2 == c && (e = "Semi-Leader");
      j = '<div class="refresh_button_guildies">Refresh Guild List</div><div id="guild_leave" class="opacity_button"></div><div><span class="GuildName blackShadow">' + e + '</span> of Guild:<br><span class="GuildName blackShadow">' + d + '</span><div style="clear: both"></div></div>';
      for (d = 2; d < a.length; d++) {
         var c = a[d],
             e = c[FRIEND_INDEX_IMAGE],
             e = "" == e ? c[FRIEND_INDEX_GENDER] == GENDER_FEMALE ? STATIC_DIR + "images/fb_girl.gif" : STATIC_DIR + "images/fb_boy.gif" : "http://graph.facebook.com/" + e + "/picture?type=large",
             f;
         0 == c[FRIEND_INDEX_SERVER] ? f = "Offline" : 0 < c[FRIEND_INDEX_SERVER] ? f = "Server " + c[FRIEND_INDEX_SERVER] : 0 > c[FRIEND_INDEX_SERVER] && (f = 0 == c[FRIEND_INDEX_ROOM] ? "Lobby" : "Room: " + c[FRIEND_INDEX_ROOM]);
         j += '<div id="guild_member_' + c[FRIEND_INDEX_ID] + '" friend="' + c[FRIEND_INDEX_ID] + '" class="guildMemberListItem' + (1 == d % 2 ? " odd" : "") + '"> <div class="friendListPhoto"><img class="friendListPhotoImg" src="' + e + '"></div> <div class="friendListRank rank rank' + c[FRIEND_INDEX_RANK] + '"></div> <div class="friendListName blackShadow">' + c[FRIEND_INDEX_NAME] + '</div> <div class="friendListGP blackShadow">GP ' + c[FRIEND_INDEX_GP] + '</div> <div class="friendListLocation blackShadow">' + f + "</div> </div>"
      }
      $("#guildMembersListHtml").html(j);
      $("#guildMembersList").tinyscrollbar_update("top");
      $(".guildMemberListItem").bind("click", function() {
         $(".guildMemberListItem").removeClass("selected");
         $(this).addClass("selected");
         ChatDialogCreate($(this).attr("friend"), $(this).children(".friendListName").html(), b)
      });
      $("#guild_leave").click(function() {
         DragonDialogOpen("Are You Sure?", "Are you sure you want to leave your guild?", DIALOG_BUTTONS_OK_CANCEL, function(a) {
            a && b.SendGuildLeave()
         })
      });
      InitRefreshButtonGuildies(b);
      UpdateFriendsInRooms()
   } else {
      var j;
      $("#guildMembersListHtml").html('<br><br>You do not have a guild yet.<br><br>To create a Guild select a name, pay 50,000 Gold, and press the button.<br><br>Guild Name: <input id="create_guild_name"><div id="guild_create" class="opacity_button"></div>');
      $("#guild_create").click(function() {
         var a = $("#create_guild_name").val();
         DragonDialogOpen("Are You Sure?", 'Are you sure you want to create the guild: <font color="cyan">' + a + '</font> ?<br><br>By clicking OK you will pay <font color="yellow">50,000 Gold</font> and create the guild.', DIALOG_BUTTONS_OK_CANCEL, function(c) {
            c && b.SendGuildCreate(a)
         })
      })
   }
}
var FRIEND_INDEX_ID = 0,
    FRIEND_INDEX_NAME = 1,
    FRIEND_INDEX_GENDER = 2,
    FRIEND_INDEX_RANK = 3,
    FRIEND_INDEX_GP = 4,
    FRIEND_INDEX_IMAGE = 5,
    FRIEND_INDEX_SERVER = 6,
    FRIEND_INDEX_ROOM = 7,
    g_last_refresh_friends_click = 0,
    g_last_refresh_guildies_click = 0;

function UpdateFriendsList(a, b) {
   RoomTabChangeTo(TAB_FRIENDS);
   TabChangeTo(TAB_FRIENDS);
   for (var d = '<div class="refresh_button_friends">Refresh Friends List</div>', c = 0; c < a.length; c++) {
      var e = a[c],
          f = e[FRIEND_INDEX_IMAGE],
          f = "" == f ? e[FRIEND_INDEX_GENDER] == GENDER_FEMALE ? STATIC_DIR + "images/fb_girl.gif" : STATIC_DIR + "/images/fb_boy.gif" : "http://graph.facebook.com/" + f + "/picture?type=large",
          j;
      0 == e[FRIEND_INDEX_SERVER] ? j = "Offline" : 0 < e[FRIEND_INDEX_SERVER] ? j = "Server " + e[FRIEND_INDEX_SERVER] : 0 > e[FRIEND_INDEX_SERVER] && (j = 0 == e[FRIEND_INDEX_ROOM] ? "Lobby" : "Room: " + e[FRIEND_INDEX_ROOM]);
      d += '<div id="friend_' + e[FRIEND_INDEX_ID] + '" friend="' + e[FRIEND_INDEX_ID] + '" class="friendListItem' + (1 == c % 2 ? " odd" : "") + '"> <div class="friendListPhoto"><img class="friendListPhotoImg" src="' + f + '"></div> <div class="friendListRank rank rank' + e[FRIEND_INDEX_RANK] + '"></div> <div class="friendListName blackShadow">' + e[FRIEND_INDEX_NAME] + '</div> <div class="friendListGP blackShadow">GP ' + e[FRIEND_INDEX_GP] + '</div> <div class="friendListLocation blackShadow">' + j + "</div> </div>"
   }
   $("#friendsListHtml").html(d);
   $(".friendListItem").bind("click", function() {
      $(".friendListItem").removeClass("selected");
      $(this).addClass("selected");
      ChatDialogCreate($(this).attr("friend"), $(this).children(".friendListName").html(), b)
   });
   InitRefreshButtonFriends(b);
   $("#friendsList").tinyscrollbar_update("top");
   UpdateFriendsInRooms()
}

function InitRefreshButtonFriends(a) {
   $(".refresh_button_friends").bind("click", function() {
      var b = get_time();
      b > g_last_refresh_friends_click + 3E3 && (g_last_refresh_friends_click = b, a.SendRefreshFriends())
   })
}
function InitRefreshButtonGuildies(a) {
   $(".refresh_button_guildies").bind("click", function() {
      var b = get_time();
      b > g_last_refresh_guildies_click + 3E3 && (g_last_refresh_guildies_click = b, a.SendRefreshGuildies())
   })
}

function UpdateFriendsInRooms() {
   var a = [],
       b = [];
   $(".friendListLocation").each(function() {
      var d = $(this),
          c = d.html(); - 1 != c.indexOf("Room: ") && (c = Number(c.substr(6)), -1 != d.parent().attr("id").indexOf("guild") ? b.push(c) : a.push(c))
   });
   $("#roomsList > .room").each(function() {
      var d = $(this),
          c = Number(d.children(".roomNumber").html());
      0 < c && (-1 != a.indexOf(c) ? d.children(".roomBuddy").show() : d.children(".roomBuddy").hide(), -1 != b.indexOf(c) ? d.children(".roomGuildMember").show() : d.children(".roomGuildMember").hide())
   })
}

function FriendUpdate(a, b, d, c, e) {
   var f = "Offline";
   c && (f = 0 == e ? "Lobby" : "Room: " + e);
   c = $("#friend_" + a);
   c.children(".friendListRank").removeClass().addClass("friendListRank rank rank" + b);
   c.children(".friendListGP").html("GP " + d);
   c.children(".friendListLocation").html(f);
   a = $("#guild_member_" + a);
   a.children(".friendListRank").removeClass().addClass("friendListRank rank rank" + b);
   a.children(".friendListGP").html("GP " + d);
   a.children(".friendListLocation").html(f);
   UpdateFriendsInRooms()
}

function ChatDialogCreate(a, b, d) {
   0 == $("#chat_" + a).length && ($("#chat_divs").append('<div class="ChatDialog" id="chat_' + a + '" friend=' + a + '><div class="chatDialogName blackShadow">' + b + '</div><div class="chatDialogDelete opacity_button"></div><div class="chatDialogGuildKick opacity_button"></div><div class="chatDialogClose opacity_button"></div><input type="text" class="chatDialogInput" value="" maxlength="150"><div class="chatDialogText"><div class="scrollbar"><div class="track"><div class="thumb"><div class="end"></div></div></div></div><div class="viewport"><div class="CanSelect overview chatDialogTextHtml"></div></div></div></div>'), a = $("#chat_" + a), a.draggable2(), a.bind("mousedown", function(a) {
      a.stopPropagation()
   }), a.children(".chatDialogText").tinyscrollbar({
      size: 183
   }), a.children(".chatDialogInput").bind("keyup", function(a) {
      13 == a.which && (a.stopPropagation(), a = $(this).val(), "" != a && (d.SendPrivateChat($(this).parent().attr("friend"), a), $(this).val("")))
   }), a.children(".chatDialogClose").click(function(a) {
      $(this).parent().remove();
      a.stopPropagation()
   }), a.children(".chatDialogDelete").click(function(a) {
      a.stopPropagation();
      var b = $(this).parent().attr("friend");
      DragonDialogOpen("Delete Friend?", "Are you sure to delete this friend?", DIALOG_BUTTONS_OK_CANCEL, function(a) {
         a && d.SendDeleteFriend(b)
      })
   }), a.children(".chatDialogGuildKick").click(function(a) {
      a.stopPropagation();
      var b = $(this).parent().attr("friend");
      DragonDialogOpen("Kick from Guild?", "Are you sure to kick this player from your guild?", DIALOG_BUTTONS_OK_CANCEL, function(a) {
         a && d.SendGuildKick(b)
      })
   }))
}

function FriendPrivateChat(a, b, d, c) {
   var e = $("#chat_" + a);
   0 == e.length && (ChatDialogCreate(a, b, c), e = $("#chat_" + a));
   e.find(".chatDialogTextHtml").append("[" + b + "] " + d + "<br>");
   e.children(".chatDialogText").tinyscrollbar_update("bottom")
}
function pad(a, b) {
   for (var d = "" + a; d.length < b;) d = "0" + d;
   return d
}

function ChannelPlayerInfoUpdate(a, b) {
   $("#myName2").html(BuildPlayerNameWithGuild(a.guild, a.game_id));
   $("#myRank2").removeClass().addClass("rank rank" + a.rank);
   $("#myGP2").html(Commatize(a.gp) + " GP");
   $("#myCash2").html(Commatize(a.cash) + " Cash");
   $("#myGold2").html(Commatize(a.gold) + " Gold");
   $("#NameChangeLittle").html("(" + (0 == a.name_changes ? "You have 1 Free name change" : "Name Change costs 4,000 Cash") + ")");
   var d = a.fb,
       d = "" == d ? a.gender == GENDER_FEMALE ? STATIC_DIR + "images/fb_girl.gif" : STATIC_DIR + "images/fb_boy.gif" : "http://graph.facebook.com/" + d + "/picture?type=large";
   $("#myPhotoImage2").attr("src", d);
   d = !a.background && a.power_user ? POWER_USER_BACKGROUND : a.background;
   g_channel_player ? (g_channel_player.change(a.head, AVATAR_TYPE_HEAD), g_channel_player.change(a.body, AVATAR_TYPE_BODY), g_channel_player.change(a.eyes, AVATAR_TYPE_EYES), g_channel_player.change(a.flag, AVATAR_TYPE_FLAG), g_channel_player.change(d, AVATAR_TYPE_BACKGROUND), g_channel_player.change(a.foreground, AVATAR_TYPE_FOREGROUND), void 0 != b && g_channel_player.change_mobile(b)) : g_channel_player = new CPlayerGraphic("#channel_player", void 0 != b ? b : -1, a.head, a.body, a.eyes, a.flag, !1, d, a.foreground);
   0 < a.event1 ? $("#event_button .event_button_text").html(pad(Math.floor(a.event1 / 60), 2) + ":" + pad(a.event1 % 60, 2) + "<br>&nbsp;") : $("#event_button .event_button_text").html("+?? Gold");
   0 < a.event2 ? $("#facebook_post .event_button_text").html(pad(Math.floor(a.event2 / 60), 2) + ":" + pad(a.event2 % 60, 2) + "<br>&nbsp;") : $("#facebook_post .event_button_text").html("+?? Cash");
   0 == $("#myName").length && $("#channelScreen").append($('<div id="myName" class="hide"><span>' + RandomString(random(2, 6)) + "</span> " + RandomString(random(2, 12)) + "</div>")).append($('<div id="myRank" class="hide rank' + random(0, 20) + '"></div>')).append($('<div id="myGP" class="hide">' + random(1E3, 3E4) + '"></div>')).append($('<div id="myGold" class="hide">' + random(0, 3E4) + '"></div>')).append($('<div id="myCash" class="hide">' + random(0, 1E3) + '"></div>')).append($('<div id="myPhotoImage" class="hide" src="http://graph.facebook.com/' + random(1E8, 999999999) + '/picture?type=large">' + random(0, 1E3) + '"></div>')); - 1 != g_server_force_mobile && g_channel_player.change_mobile(g_server_force_mobile)
}

function RoomChangeDetails(a, b) {
   var d = $("#room" + b);
   if (a) {
      var c = a[0],
          e = a[1],
          f = a[2],
          j = a[3],
          m = a[4],
          k = a[5],
          p = a[6],
          h = a[7],
          n = a[8],
          e = text_filter(e, filtered_words);
      1 == n ? d.addClass("powerUserRoom") : d.removeClass("powerUserRoom");
      d.children(".roomNumber").html(c);
      d.children(".roomTitle").html(e);
      d.children(".numPlayers").html(f);
      d.children(".maxPlayers").html(j);
      c = "";
      m == ROOM_STATUS_WAITING ? c = "status-waiting" : m == ROOM_STATUS_FULL ? c = "status-full" : m == ROOM_STATUS_PLAYING && (c = "status-playing");
      d.children(".status").removeClass().addClass("status " + c);
      m = "";
      k == GAME_MODE_NORMAL ? m = "iconModeNormal" : k == GAME_MODE_BOSS ? m = "iconModeBoss" : k == GAME_MODE_SAME && (m = "iconModeSame");
      d.children(".gameMode").removeClass().addClass("gameMode " + m);
      p ? d.children(".roomLock").addClass("roomLocked") : d.children(".roomLock").removeClass("roomLocked");
      h == MAP_CUSTOM ? (k = BooleanArrayToCanvas(DragonDecompress(a[9]), 213, 49, 213, 49), d.children(".roomMap").html("").css("background-position", "999px 999px").append(k)) : d.children(".roomMap").html("").css("background-position", "0 " + (-50 * h - 50) + "px");
      d.show();
      UpdateFriendsInRooms()
   } else d.hide()
}
function GetRoomDivFromRoomNumber(a) {
   for (var b = 0; 6 > b; b++) if ($("#room" + b + " .roomNumber").html() == a) return $("#room" + b)
}
var g_extra_info_timeout, g_extra_info_room;

function CloseRoomExtraInfo() {
   g_extra_info_room = void 0;
   g_extra_info_timeout = clearTimeout(g_extra_info_timeout);
   $(".roomExtraInfo").removeClass("roomExtraInfo");
   $(".roomExtraInfoSlot").remove()
}

function ShowExtraRoomInfo(a) {
   var b = a[0],
       d = GetRoomDivFromRoomNumber(b);
   if (d) {
      CloseRoomExtraInfo();
      d.addClass("roomExtraInfo");
      for (var c = 1; c < a.length - 2; c += 3) d.append($('<div class="roomExtraInfoSlot roomExtraInfoSlot' + a[c] + '"><div class="playerListRank rank rank' + a[c + 1] + '"></div><div class="playerListName blackShadow">' + a[c + 2] + "</div></div>"));
      g_extra_info_room = b;
      g_extra_info_timeout = setTimeout(function() {
         CloseRoomExtraInfo()
      }, 3E3)
   }
}

function SetLobby(a, b) {
   debug && console.log("[SetLobby] server type:", b);
   1 == b ? ($("#buttonQuickJoin,#buttonCreateRoom,#buttonJoin,#buttonRoomsListUp,#buttonRoomsListDown,#filter_all,#filter_waiting,#filter_normal,#filter_boss,#filter_same,#filter_friends,#filter_guild,.room,#join_room2,#join_password_input").hide(), $("#buttonStart1v1,#buttonCreateTeam,#buttonJoinTeam,#lobbyButtonMobile,#tournament_info").show(), $("#channelScreen").css({
      "background-image": "none"
   }), $("body").css({
      "background-image": "url(/static/images/themes/full_bg2.jpg)"
   }), void 0 == a.lobbyMobile && (a.lobbyMobile = MOBILE.RANDOM), $("#dialog_join_room_div .AlertBoxTitle").html(l.t("Join Team"))) : ($("#buttonQuickJoin,#buttonCreateRoom,#buttonJoin,#buttonRoomsListUp,#buttonRoomsListDown,#filter_all,#filter_waiting,#filter_normal,#filter_boss,#filter_same,#filter_friends,#filter_guild,.room,#join_room2,#join_password_input").show(), $("#buttonStart1v1,#buttonCreateTeam,#buttonJoinTeam,#lobbyButtonMobile,#tournament_info").hide(), $("#channelScreen").css({
      "background-image": ""
   }), $("body").css({
      "background-image": ""
   }), g_channel_player && g_channel_player.change_mobile(), $("#dialog_join_room_div .AlertBoxTitle").html(l.t("Join Room")), $("#fastLobbyMsg").html("").hide(), $("#buttonStart1v1").hide());
   g_server_force_mobile = -1;
   $("#roomButtonMobile").show()
}
function LobbyChangeMobile(a) {
   debug && console.log("[LobbyChangeMobile] mobile:", a);
   g_channel_player.change_mobile(a)
}

function TournamentWaitingMsgShow(a) {
   AudioPlay(AUDIO_WAIT);
   var b = l.t("Waiting for an opponent") + '...<div id="hourglass"></div><div id="CancelWaiting" class="cancelwait">Cancel</div>';
   $("#tournament_waiting").html(b).css({
      top: -400
   }).show();
   setTimeout(function() {
      $("#tournament_waiting").css({
         top: 40
      })
   }, 1);
   $("#lobbyButtonMobile").hide();
   $("#CancelWaiting").click(function() {
      a.SendCancelTournamentWait();
      TournamentWaitingMsgHide()
   })
}

function TournamentWaitingMsgHide() {
   $("#tournament_waiting").html("").hide().css({
      top: -400
   });
   1 == g_server_type && $("#lobbyButtonMobile").show()
}
function SecondsToString(a) {
   var b = "";
   0 > a && (b = " Ago", a *= -1);
   var d = Math.floor(a / 86400),
       c = Math.floor(a % 86400 / 3600),
       e = Math.floor(a % 3600 / 60),
       a = a % 60;
   return d ? d + " " + l.t("Days") + " " + (c ? c + " " + l.t("Hours") : "") + b : c ? c + " " + l.t("Hours") + " " + (e ? e + " " + l.t("Minutes") : "") + b : e ? e + " " + l.t("Minutes") + " " + (a ? a + " " + l.t("Seconds") : "") + b : a ? a + " " + l.t("Seconds") + " " + b : l.t("Now")
}
var g_tournament_timer, g_tournament_timer_start, g_t0, g_t1;

function SetTournamentInfo(a) {
   if (a && (SetTournamentInfo2(a), g_t0 = a[0], g_t1 = a[1], g_tournament_timer = clearInterval(g_tournament_timer), 0 < g_t0 && 5E3 > g_t0 || 0 < g_t1 && 5E3 > g_t1)) g_tournament_timer_start = get_time(), g_tournament_timer = setInterval(function() {
      var b = get_time();
      g_t0 && (a[0] = g_t0 - Math.floor((b - g_tournament_timer_start) / 1E3));
      g_t1 && (a[1] = g_t1 - Math.floor((b - g_tournament_timer_start) / 1E3));
      SetTournamentInfo2(a)
   }, 1E3)
}
var g_server_force_mobile = -1;

function SetTournamentInfo2(a) {
   var b = $("#lobbyButtonMobile"),
       d;
   d = "" + ("Avatar: " + (a[3] ? "On" : "Off") + "<br>");
   d += "Wind: " + a[4] + "<br>";
   d = -1 != a[10] && void 0 != a[10] ? d + ("Map: (" + a[10] + ") " + MAPS[a[10]].name + "<br>") : d + "Map: Random<br>"; - 1 != a[5] ? (d += "Mobile: (" + a[5] + ") " + MOBILE_NAME[a[5]] + "<br>", b.hide()) : (d += "Mobile: Any<br>", b.show());
   g_server_force_mobile = a[5];
   var b = $("#buttonStart1v1"),
       c = $("#fastLobbyMsg");
   7 == a[2] ? (b.hide(), c.html(l.t("4v4 Guilds Only")).show()) : 8 == a[2] ? (b.hide(), c.html(l.t("4v4 Teams Only")).show()) : (b.show(), c.html("").hide());
   d = d + "<br>" + (l.t("Games started at the last 5 minutes") + ": " + a[8] + "<br>");
   15 < a[8] && (d += l.t("Average Waiting Time") + ": " + (150 / a[8]).toFixed(2) + " " + l.t("Seconds") + "<br>");
   debug && (console.log("Teams + 1v1 Games Now:", a[9]), console.log("Games Since Server Reset:", a[7]));
   b = a[0];
   a = a[1];
   0 < b ? (d += "<br>Start Time: " + SecondsToString(b) + "<br>", a && a > b && (d += "Tournament Time: " + SecondsToString(a - b) + "<br>")) : a && (d += "<br>End Time: " + SecondsToString(a) + "<br>");
   $("#tournament_info").html(d)
};

function SelectThisResellerButton(a) {
   $(".seller_button").removeClass("buttonGlow");
   $(a).addClass("buttonGlow")
}

function ResellersGUI(a) {
   $("#buttonCharge2").click(function() {
      AudioPlay(AUDIO_BUTTON_SELECT2);
      2 > a.user_rank ? DragonDialogOpen('New Player <div class="rank rank' + a.user_rank + '" style="display:inline-block"></div>', 'You have to be at least rank <div class="rank rank2" style="display:inline-block"></div> (1200+ GP) for buying cash online or getting free cash for offers.<br>Play some games first.', DIALOG_BUTTONS_OK) : ($("#chargeWindow").show(), "br" == SERVER_TYPE && ($("#resellers_btn").hide(), $("#charge_pin_btn").hide()), $(".seller_button").removeClass("buttonGlow"), $("#chargeWindowPayment").html('<div id="ChargeWelcomeMsg">' + l.t("^ Click ^<br><br>Want More DragonBound Cash?<br><br>There are many ways to get cash!<br><br>Select one and see how :)") + "</div>"))
   });
   $("#chargeWindowClose").click(function() {
      $("#chargeWindowPayment").html("");
      $("#chargeWindow").hide("slow")
   });
   $("#paymentwall_btn").click(function() {
      SelectThisResellerButton(this);
      $("#chargeWindowPayment").html(l.t("Loading") + "...");
      var b = $("#chargeWindowPayment");
      $.get("/paymentwall_get", {
         u: a.myPlayerInfo.username
      }, function(a) {
         1 >= a.length ? (a = a[0], 1 == a ? b.html("I don't know who you are, please relog to the game.") : 3 == a ? b.html("Different user, please re-login (F5).") : b.html("Error " + a)) : b.html('<iframe src="' + a[1] + '" width="750" height="800" frameborder="0"></iframe>')
      }, "json").error(function(a, c, e) {
         b.html("Internet error happened, try again.");
         console.log("paymentwall_get ERROR:", a, c, e)
      })
   });
   $("#ultimatepay_btn").click(function() {
      SelectThisResellerButton(this);
      $("#chargeWindowPayment").html(l.t("Loading") + "...");
      var a = function() {
         $.get("/playspan_gethash", {}, function(a) {
            if ("E1 - Not Authenticated" == a) $("#chargeWindowPayment").html("I don't know who you are, please relog to the game.");
            else {
               var b = a.split("|");
               10 != b.length ? ($("#chargeWindowPayment").html("Weird error happened, try again."), console.log("error at gethash, not enough parts. data=", a)) : (ultimatePayParams = {
                  method: "StartOrderFrontEnd",
                  display: "Lightbox",
                  livemode: "T",
                  currency: "USD",
                  amountdesc: "DragonBound Cash",
                  virtualcurrency: "DCASH",
                  developerid: 1,
                  appid: 1
               }, a = b[0], ultimatePayParams.userid = "" + a, ultimatePayParams.riskmode = b[2], ultimatePayParams.sn = b[3], ultimatePayParams.hash = b[4], ultimatePayParams.sepamount = 10, ultimatePayParams.fname = b[5], ultimatePayParams.lname = b[6], ultimatePayParams.membersince = b[7], ultimatePayParams.accountname = b[1], ultimatePayParams.email = b[9], $("#chargeWindowPayment").html('<div id="div_b" style="display:none"></div><br>Buying DragonBound Cash for User: <span id="UPforUser">' + a + " - " + b[1] + '</span><br><br>Current DragonBound Cash on your account: <span id="UPmyCash">' + b[8] + '</span> Cash<br><br><a href="http://ultimatepay.custhelp.com" target="_black">Have a problem? UtimatePay Support - http://ultimatepay.custhelp.com</a><br><br><a href="/my_payments" target="_black">Mi historia de recargas + Mi numero ID (My Payments History + My User ID Number)</a><br><br>When you charge cash (with ANY payment method) you will also receive a RARE GIFT:<p><br>1st Charge = Gift "(RARE) Cash Charger" Background Item<p>2nd Charge = Gift "(RARE) Cash Charger 2" Foreground Item<p>3nd Charge = Gift "(RARE) Cash Charger 3" Background Item</div>'), g_init_up || (ulp.ultimatePay = !0, ulp.upLiveUrl = "https://www.ultimatepay.com/app/api/live/?", ulp.on("closeLB", function(a) {
                  ultimatepayPostProcess(a)
               }), g_init_up = !0), ulp.displayUltimatePay())
            }
         }).error(function(a, b, e) {
            $("#chargeWindowPayment").html("Internet error happened, try again.");
            console.log("playspan_gethash ERROR:", a, b, e)
         })
      };
      $.pm ? a() : $.getScript("https://static.pbc.com/js/ultimatepay-api.js", function() {
         debug && console.log("UP Loaded");
         a()
      })
   });
   $("#charge_pin_btn").click(function() {
      SelectThisResellerButton(this);
      $("#chargeWindowPayment").html('<iframe src="/pin" class="ChargeFrame"></iframe>')
   });
   $("#resellers_btn").click(function() {
      SelectThisResellerButton(this);
      $("#chargeWindowPayment").html('<br> - PRECIOS OFICIALES DE CASH EN PERU - <br><br>18 Soles = 10,000 Cash + Fondo (Monedas de Oro cayendo)<br>34 Soles = 21,000 Cash + Fondo (Monedas de Oro cayendo)<br>66 Soles = 43,000 Cash + Fondo (Monedas de Oro cayendo)<br>97 Soles = 66,000 Cash + Fondo (Monedas de Oro cayendo)<br>200 Soles = 140,000 Cash + Fondo + Foreground (Monedas de Oro cayendo+ $)<br><br>* Muy pronto habr\u00e1 ofertas y promociones, porfavor siempre revisen los facebooks de los proveedores por novedades.<br><br><div id="reseller_accordion"><h3>Silkroad Per\u00fa</h3><div>Recargas de cash en solo 10 Minutos!<br><br>Los dep\u00f3sitos son SOLO por AGENTES BCP \u00f3 AGENTES INTERBANK.<br>Cta Agente BCP: 194-25114557-0-38<br>Cta Agente Interbank: 4893-0535-00887<br>Para mas informacion has clic en:<br>Facebook: <a href="https://www.facebook.com/SilkroadPeru" target="_black">facebook.com/SilkroadPeru</a><br><br>Responsable: Victor Ra\u00fal Sarco Mamani<br>Movistar: 97855-0695<br>Fijo: 393-2733<br>Email: <a href="mailto:dragonbound2013@hotmail.com">dragonbound2013@hotmail.com</a><br>Atencion Lunes a Domingo 8:00am a 10:00pm<br><br>Clic en el video para que sepas como recargar:<br><a href="http://www.youtube.com/watch?v=W57FR_pxEp4" target="_black">http://www.youtube.com/watch?v=W57FR_pxEp4</a><br></div><h3>MasterCadeM: PERU - BOLIVIA - ARGENTINA</h3><div>Las Recargas mas r\u00e1pidas para DragonBound las encuentras con nosotros.<br><br> - EN PERU -<br>Recuerda los dep\u00f3sitos son SOLO por AGENTES BCP \u00f3 AGENTES INTERBANK.<br>Cta agente BCP: 1931-9613-6600-76<br>Cta agente Interbank: 170-3051-8118-40<br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/Recarga.CASH.dragonbound" target="_black">facebook.com/Recarga.CASH.dragonbound</a><br><br> - EN ARGENTINA - tus recargas en pesos argentinos<br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/Dragonbound.Cash.Mastercadem.Argentina" target="_black">facebook.com/Dragonbound.Cash.Mastercadem.Argentina</a><br><br> - EN BOLIVIA  - tus recargas en bolivianos<br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/Dragonbound.Bolivia.Mastercadem" target="_black">facebook.com/Dragonbound.Bolivia.Mastercadem</a><br><br>Responsable general: Charles Ortiz Brice\u00f1o<br>RPM (movistar): #975544437<br>RPC (claro): 986558320<br>Fijo: 01-2912030<br>Email: <a href="mailto:mastercadem@gmail.com">mastercadem@gmail.com</a><br></div><h3>FlechaGLS - dragonbound.org</h3><div>Recargas de Cash 100% seguras para DragonBound en Per\u00fa. Ventas especiales tambi\u00e9n para Administradores de Cabinas de Internet (CiberCaf\u00e9s)<br><br>Dep\u00f3sitos SOLO por AGENTES BCP \u00f3 AGENTES INTERBANK.<br>N\u00b0 de cta. InterBank: 286-3051422301<br>N\u00b0 de cta. Banco de Cr\u00e9dito BCP: 191-25173925-0-06<br><br>Website: <a href="http://www.dragonbound.org" target="_black">dragonbound.org</a><br>Facebook: <a href="https://www.facebook.com/DragonboundCash" target="_black">facebook.com/DragonboundCash</a><br><br>Responsable: Dyanfield Andres Villanueva L\u00f3pez<br>Cel: 943972729<br>Email: <a href="mailto:dragonbound.org@gmail.com">dragonbound.org@gmail.com</a><br></div><h3>GM Kommander</h3><div>SERVICIO DE RECARGAS DE CASH: SENCILLO, R\u00c1PIDO Y SEGURO.<br>Los dep\u00f3sitos son s\u00f3lo por AGENTES BCP \u00f3 AGENTES INTERBANK.<br><br>Para mas informacion has click en:<br>Facebook: <a href="https://www.facebook.com/pages/GM-Kommander/473619026023417" target="_black">facebook.com/pages/GM-Kommander/473619026023417</a><br>Cta agente BCP: 1922-5380-6440-13<br>Cta agente Interbank: 122-5380-6440-13<br><br>Responsable: David Sebastian Rodr\u00edguez Herrera<br>Claro: 991851540<br>Movistar: 945115556<br>Email: <a href="mailto:gmkommander@gmail.com">gmkommander@gmail.com</a></div><h3>Problemas con el cash? (Cash Problems?)</h3><div>Esperen 5 d\u00edas para que el distribuidor pueda procesar sus pagos. No es un proceso autom\u00e1tico. Despu\u00e9s de eso puedes mandar tu prueba de pago y detalles (EN INGLES) a DN al correo <a href="mailto:complains@dragonbound.net">complains@dragonbound.net</a> y ser\u00e1 revisado.<br><br>Wait 5 days so the distributor can process your payment. It is not an automatic process.<br>After that time you can send your payment proof and details (IN ENGLISH) to DN at <a href="mailto:complains@dragonbound.net">complains@dragonbound.net</a> and it will be checked.</div></div><br><a href="/my_payments" target="_black">Mi historia de recargas + Mi numero ID (My Payments History + My User ID Number)</a><br>');
      $("#reseller_accordion").accordion({
         active: !1,
         collapsible: !0
      })
   });
   $("#charge_myinfo_btn").click(function() {
      SelectThisResellerButton(this);
      $("#chargeWindowPayment").html('<iframe src="/my_payments" class="ChargeFrame"></iframe>')
   });
   $("#charge_bitcoin_btn").click(function() {
      SelectThisResellerButton(this);
      $("#chargeWindowPayment").html('<iframe src="/bitcoin" class="ChargeFrame"></iframe>')
   });
   $("#matomy_btn").click(function() {
      SelectThisResellerButton(this);
      var b = a.myPlayerInfo.id;
      $("#chargeWindowPayment").html('<iframe src="http://service.matomy.com/offer/?id=ab88ceff-0075-4a74-846f-1840270d7796&user_id=' + b + '" frameborder="0" width="720" height="1400" marginheight="0" marginwidth="0" allowtransparency="true"></iframe>')
   });
   $("#superrewards_btn").click(function() {
      SelectThisResellerButton(this);
      var b = a.myPlayerInfo.id;
      $("#chargeWindowPayment").html('<iframe src="https://www.superrewards-offers.com/super/offers?h=ljfotykngeh.024155292008&uid=' + b + '" frameborder="0" width="728" height="1050" scrolling="no"></iframe>')
   })
};

function DragonSocket() {
   this.ws = void 0;
   this.receive_handlers = [];
   this.error_handler = this.disconnected_handler = this.connected_handler = void 0
}
DragonSocket.prototype.IsSupported = function() {
   return "undefined" !== typeof WebSocket
};
DragonSocket.prototype.SetHandler = function(a, b) {
   "connected" == a ? this.connected_handler = b : "disconnected" == a ? this.disconnected_handler = b : "error" == a ? this.error_handler = b : "receive" == a && (this.receive_handlers = Object.freeze(b))
};
DragonSocket.prototype.Connect = function(a, b) {
   this.ws = new WebSocket("ws://" + a + ":" + b);
   var d = this;
   this.ws.onopen = function() {
      d.connected_handler && d.connected_handler()
   };
   this.ws.onclose = function() {
      d.disconnected_handler && d.disconnected_handler()
   };
   this.ws.onerror = function(a) {
      d.error_handler && d.error_handler(a)
   };
   this.ws.onmessage = function(a) {
      try {
         var b = JSON.parse(a.data)
      } catch (f) {
         d.error_handler && d.error_handler("Received not JSON: " + a.data);
         return
      }
      void 0 == b.length || 1 > b.length ? d.error_handler && d.error_handler("JSON is not Array: " + b) : (a = b[0], b.shift(), d.receive_handlers[a] ? d.receive_handlers[a].apply(window, b) : d.error_handler && d.error_handler("No handler for opcode:", a, "at packet:", b))
   }
};
DragonSocket.prototype.Send = function() {
   if (0 != arguments.length) {
      for (var a = [], b = 0; b < arguments.length; b++) a.push(arguments[b]);
      this.ws.send(JSON.stringify(a))
   }
};
DragonSocket.prototype.Disconnect = function() {
   this.ws.close()
};
Object.freeze(DragonSocket.prototype);
(function(a, b) {
   var d, c = a.document;
   d = function() {
      var d, f, j, m, k, p, h, n, o, t, q, y, r = {},
          x = {},
          A = !1,
          B = [];
      return x = {
         buttons: {
            holder: '<nav class="alertify-buttons">{{buttons}}</nav>',
            submit: '<button type="submit" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</button>',
            ok: '<a href="#" class="alertify-button alertify-button-ok" id="alertify-ok">{{ok}}</a>',
            cancel: '<a href="#" class="alertify-button alertify-button-cancel" id="alertify-cancel">{{cancel}}</a>'
         },
         input: '<div class="alertify-text-wrapper"><input type="text" class="alertify-text" id="alertify-text"></div>',
         message: '<p class="alertify-message">{{message}}</p>',
         log: '<article class="alertify-log{{class}}">{{message}}</article>'
      }, y = function() {
         var a, d, e = !1,
             f = c.createElement("fakeelement"),
             h = {
               WebkitTransition: "webkitTransitionEnd",
               MozTransition: "transitionend",
               OTransition: "otransitionend",
               transition: "transitionend"
             };
         for (a in h) if (f.style[a] !== b) {
            d = h[a];
            e = !0;
            break
         }
         return {
            type: d,
            supported: e
         }
      }, d = function(a) {
         return c.getElementById(a)
      }, r = {
         labels: {
            ok: "OK",
            cancel: "Cancel"
         },
         delay: 5E3,
         buttonReverse: !1,
         buttonFocus: "ok",
         transition: b,
         addListeners: function(a) {
            var d, e, h, k, p, n = j !== b,
                o = f !== b,
                r = q !== b,
                y = "",
                x = this;
            d = function(c) {
               return c.preventDefault !== b && c.preventDefault(), h(c), q !== b && (y = q.value), "function" == typeof a && (q !== b ? a(!0, y) : a(!0)), !1
            };
            e = function(c) {
               return c.preventDefault !== b && c.preventDefault(), h(c), "function" == typeof a && a(!1), !1
            };
            h = function() {
               x.hide();
               x.unbind(c.body, "keyup", k);
               x.unbind(m, "focus", p);
               r && x.unbind(t, "submit", d);
               n && x.unbind(j, "click", d);
               o && x.unbind(f, "click", e)
            };
            k = function(a) {
               var b = a.keyCode;
               32 !== b || r || d(a);
               27 === b && o && e(a)
            };
            p = function() {
               r ? q.focus() : !o || x.buttonReverse ? j.focus() : f.focus()
            };
            this.bind(m, "focus", p);
            n && this.bind(j, "click", d);
            o && this.bind(f, "click", e);
            this.bind(c.body, "keyup", k);
            r && this.bind(t, "submit", d);
            this.transition.supported || this.setFocus()
         },
         bind: function(a, b, c) {
            "function" == typeof a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
         },
         handleErrors: function() {
            if (a.onerror !== b) {
               var c = this;
               return a.onerror = function(a, b, d) {
                  c.error("[" + a + " on line " + d + " of " + b + "]", 0)
               }, !0
            }
            return !1
         },
         appendButtons: function(a, b) {
            return this.buttonReverse ? b + a : a + b
         },
         build: function(a) {
            var b = "",
                c = a.type,
                d = a.message,
                a = a.cssClass || "";
            switch (b += '<div class="alertify-dialog">', "none" === r.buttonFocus && (b += '<a href="#" id="alertify-noneFocus" class="alertify-hidden"></a>'), "prompt" === c && (b += '<form id="alertify-form">'), b += '<article class="alertify-inner">', b += x.message.replace("{{message}}", d), "prompt" === c && (b += x.input), b += x.buttons.holder, b += "</article>", "prompt" === c && (b += "</form>"), b += '<a id="alertify-resetFocus" class="alertify-resetFocus" href="#">Reset Focus</a>', b += "</div>", c) {
            case "confirm":
               b = b.replace("{{buttons}}", this.appendButtons(x.buttons.cancel, x.buttons.ok));
               b = b.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
               break;
            case "prompt":
               b = b.replace("{{buttons}}", this.appendButtons(x.buttons.cancel, x.buttons.submit));
               b = b.replace("{{ok}}", this.labels.ok).replace("{{cancel}}", this.labels.cancel);
               break;
            case "alert":
               b = b.replace("{{buttons}}", x.buttons.ok), b = b.replace("{{ok}}", this.labels.ok)
            }
            return n.className = "alertify alertify-" + c + " " + a, h.className = "alertify-cover", b
         },
         close: function(a, c) {
            var d, e, f = c && !isNaN(c) ? +c : this.delay,
                h = this;
            this.bind(a, "click", function() {
               d(a)
            });
            e = function(a) {
               a.stopPropagation();
               h.unbind(this, h.transition.type, e);
               o.removeChild(this);
               o.hasChildNodes() || (o.className += " alertify-logs-hidden")
            };
            d = function(a) {
               a !== b && a.parentNode === o && (h.transition.supported ? (h.bind(a, h.transition.type, e), a.className += " alertify-log-hide") : (o.removeChild(a), o.hasChildNodes() || (o.className += " alertify-logs-hidden")))
            };
            0 !== c && setTimeout(function() {
               d(a)
            }, f)
         },
         dialog: function(a, d, e, f, k) {
            p = c.activeElement;
            var j = function() {
               o && null !== o.scrollTop && h && null !== h.scrollTop || j()
            };
            if ("string" != typeof a) throw Error("message must be a string");
            if ("string" != typeof d) throw Error("type must be a string");
            if (e !== b && "function" != typeof e) throw Error("fn must be a function");
            return "function" == typeof this.init && (this.init(), j()), B.push({
               type: d,
               message: a,
               callback: e,
               placeholder: f,
               cssClass: k
            }), A || this.setup(), this
         },
         extend: function(a) {
            if ("string" != typeof a) throw Error("extend method must have exactly one paramter");
            return function(b, c) {
               return this.log(b, a, c), this
            }
         },
         hide: function() {
            var a, b = this;
            B.splice(0, 1);
            0 < B.length ? this.setup(!0) : (A = !1, a = function(c) {
               c.stopPropagation();
               n.className += " alertify-isHidden";
               b.unbind(n, b.transition.type, a)
            }, this.transition.supported ? (this.bind(n, this.transition.type, a), n.className = "alertify alertify-hide alertify-hidden") : n.className = "alertify alertify-hide alertify-hidden alertify-isHidden", h.className = "alertify-cover alertify-cover-hidden", p.focus())
         },
         init: function() {
            c.createElement("nav");
            c.createElement("article");
            c.createElement("section");
            h = c.createElement("div");
            h.setAttribute("id", "alertify-cover");
            h.className = "alertify-cover alertify-cover-hidden";
            c.body.appendChild(h);
            n = c.createElement("section");
            n.setAttribute("id", "alertify");
            n.className = "alertify alertify-hidden";
            c.body.appendChild(n);
            o = c.createElement("section");
            o.setAttribute("id", "alertify-logs");
            o.className = "alertify-logs alertify-logs-hidden";
            c.body.appendChild(o);
            c.body.setAttribute("tabindex", "0");
            this.transition = y();
            delete this.init
         },
         log: function(a, b, c) {
            var d = function() {
               o && null !== o.scrollTop || d()
            };
            return "function" == typeof this.init && (this.init(), d()), o.className = "alertify-logs", this.notify(a, b, c), this
         },
         notify: function(a, b, d) {
            var e = c.createElement("article");
            e.className = "alertify-log" + ("string" == typeof b && "" !== b ? " alertify-log-" + b : "");
            e.innerHTML = a;
            o.appendChild(e);
            setTimeout(function() {
               e.className += " alertify-log-show"
            }, 50);
            this.close(e, d)
         },
         set: function(a) {
            var b;
            if ("object" != typeof a && a instanceof Array) throw Error("args must be an object");
            for (b in a) a.hasOwnProperty(b) && (this[b] = a[b])
         },
         setFocus: function() {
            q ? (q.focus(), q.select()) : k.focus()
         },
         setup: function(a) {
            var c, h = B[0],
                p = this;
            A = !0;
            c = function(a) {
               a.stopPropagation();
               p.setFocus();
               p.unbind(n, p.transition.type, c)
            };
            this.transition.supported && !a && this.bind(n, this.transition.type, c);
            n.innerHTML =
            this.build(h);
            m = d("alertify-resetFocus");
            j = d("alertify-ok") || b;
            f = d("alertify-cancel") || b;
            k = "cancel" === r.buttonFocus ? f : "none" === r.buttonFocus ? d("alertify-noneFocus") : j;
            q = d("alertify-text") || b;
            t = d("alertify-form") || b;
            "string" == typeof h.placeholder && "" !== h.placeholder && (q.value = h.placeholder);
            a && this.setFocus();
            this.addListeners(h.callback)
         },
         unbind: function(a, b, c) {
            "function" == typeof a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent("on" + b, c)
         }
      }, {
         alert: function(a, b, c) {
            return r.dialog(a, "alert", b, "", c), this
         },
         confirm: function(a, b, c) {
            return r.dialog(a, "confirm", b, "", c), this
         },
         extend: r.extend,
         init: r.init,
         log: function(a, b, c) {
            return r.log(a, b, c), this
         },
         prompt: function(a, b, c, d) {
            return r.dialog(a, "prompt", b, c, d), this
         },
         success: function(a, b) {
            return r.log(a, "success", b), this
         },
         error: function(a, b) {
            return r.log(a, "error", b), this
         },
         set: function(a) {
            r.set(a)
         },
         labels: r.labels,
         debug: r.handleErrors
      }
   };
   "function" == typeof define ? define([], function() {
      return new d
   }) : a.alertify === b && (a.alertify = new d)
})(this);
var io = "undefined" == typeof module ? {} : module.exports;
(function() {
   var a = this,
       b = "object" == typeof module ? module.exports : this.io = {};
   b.version = "0.9.11";
   b.protocol = 1;
   b.transports = [];
   b.j = [];
   b.sockets = {};
   b.connect = function(c, d) {
      var e = b.util.parseUri(c),
          f, h;
      a && a.location && (e.protocol = e.protocol || a.location.protocol.slice(0, -1), e.host = e.host || (a.document ? a.document.domain : a.location.hostname), e.port = e.port || a.location.port);
      f = b.util.uniqueUri(e);
      var k = {
         host: e.host,
         secure: "https" == e.protocol,
         port: e.port || ("https" == e.protocol ? 443 : 80),
         query: e.query || ""
      };
      b.util.merge(k, d);
      if (k["force new connection"] || !b.sockets[f]) h = new b.Socket(k);
      return !k["force new connection"] && h && (b.sockets[f] = h), h = h || b.sockets[f], h.of(1 < e.path.length ? e.path : "")
   };
   var d = this,
       c = ("undefined" != typeof io ? io : module.exports).util = {},
       e = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
       f = "source protocol authority userInfo user password host port relative path directory file query anchor".split(" ");
   c.parseUri = function(a) {
      for (var a = e.exec(a || ""), b = {}, c = 14; c--;) b[f[c]] = a[c] || "";
      return b
   };
   c.uniqueUri = function(a) {
      var b = a.protocol,
          c = a.host,
          a = a.port;
      return "document" in d ? (c = c || document.domain, a = a || ("https" == b && "https:" !== document.location.protocol ? 443 : document.location.port)) : (c = c || "localhost", !a && "https" == b && (a = 443)), (b || "http") + "://" + c + ":" + (a || 80)
   };
   c.query = function(a, b) {
      var d = c.chunkQuery(a || ""),
          e = [];
      c.merge(d, c.chunkQuery(b || ""));
      for (var f in d) d.hasOwnProperty(f) && e.push(f + "=" + d[f]);
      return e.length ? "?" + e.join("&") : ""
   };
   c.chunkQuery = function(a) {
      for (var b = {}, a = a.split("&"), c = 0, d = a.length, e; c < d; ++c) e = a[c].split("="), e[0] && (b[e[0]] = e[1]);
      return b
   };
   var j = !1;
   c.load = function(a) {
      if ("document" in d && "complete" === document.readyState || j) return a();
      c.on(d, "load", a, !1)
   };
   c.on = function(a, b, c, d) {
      a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, d)
   };
   c.request = function(a) {
      if (a && "undefined" != typeof XDomainRequest && !c.ua.hasCORS) return new XDomainRequest;
      if ("undefined" != typeof XMLHttpRequest && (!a || c.ua.hasCORS)) return new XMLHttpRequest;
      if (!a) try {
         return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
      } catch (b) {}
      return null
   };
   "undefined" != typeof window && c.load(function() {
      j = !0
   });
   c.defer = function(a) {
      if (!c.ua.webkit || "undefined" != typeof importScripts) return a();
      c.load(function() {
         setTimeout(a, 100)
      })
   };
   c.merge = function(a, b, d, e) {
      var e = e || [],
          d = "undefined" == typeof d ? 2 : d,
          f;
      for (f in b) b.hasOwnProperty(f) && 0 > c.indexOf(e, f) && ("object" != typeof a[f] || !d ? (a[f] = b[f], e.push(b[f])) : c.merge(a[f], b[f], d - 1, e));
      return a
   };
   c.mixin = function(a, b) {
      c.merge(a.prototype, b.prototype)
   };
   c.inherit = function(a, b) {
      function c() {}
      c.prototype = b.prototype;
      a.prototype = new c
   };
   c.isArray = Array.isArray ||
   function(a) {
      return "[object Array]" === Object.prototype.toString.call(a)
   };
   c.intersect = function(a, b) {
      for (var d = [], e = a.length > b.length ? a : b, f = a.length > b.length ? b : a, h = 0, k = f.length; h < k; h++)~c.indexOf(e, f[h]) && d.push(f[h]);
      return d
   };
   c.indexOf = function(a, b, c) {
      for (var d = a.length, c = 0 > c ? 0 > c + d ? 0 : c + d : c || 0; c < d && a[c] !== b; c++);
      return d <= c ? -1 : c
   };
   c.toArray = function(a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) b.push(a[c]);
      return b
   };
   c.ua = {};
   var m = c.ua,
       k;
   if (k = "undefined" != typeof XMLHttpRequest) a: {
      try {
         var p = new XMLHttpRequest
      } catch (h) {
         k = !1;
         break a
      }
      k = void 0 != p.withCredentials
   }
   m.hasCORS = k;c.ua.webkit = "undefined" != typeof navigator && /webkit/i.test(navigator.userAgent);c.ua.iDevice = "undefined" != typeof navigator && /iPad|iPhone|iPod/i.test(navigator.userAgent);
   var n = "undefined" != typeof io ? io : module.parent.exports,
       m = function() {};
   ("undefined" != typeof io ? io : module.exports).EventEmitter = m;m.prototype.on = function(a, b) {
      return this.$events || (this.$events = {}), this.$events[a] ? n.util.isArray(this.$events[a]) ? this.$events[a].push(b) : this.$events[a] = [this.$events[a], b] : this.$events[a] = b, this
   };m.prototype.addListener = m.prototype.on;m.prototype.once = function(a, b) {
      function c() {
         d.removeListener(a, c);
         b.apply(this, arguments)
      }
      var d = this;
      return c.listener = b, this.on(a, c), this
   };m.prototype.removeListener = function(a, b) {
      if (this.$events && this.$events[a]) {
         var c =
         this.$events[a];
         if (n.util.isArray(c)) {
            for (var d = -1, e = 0, f = c.length; e < f; e++) if (c[e] === b || c[e].listener && c[e].listener === b) {
               d = e;
               break
            }
            if (0 > d) return this;
            c.splice(d, 1);
            c.length || delete this.$events[a]
         } else(c === b || c.listener && c.listener === b) && delete this.$events[a]
      }
      return this
   };m.prototype.removeAllListeners = function(a) {
      return void 0 === a ? (this.$events = {}, this) : (this.$events && this.$events[a] && (this.$events[a] = null), this)
   };m.prototype.listeners = function(a) {
      return this.$events || (this.$events = {}), this.$events[a] || (this.$events[a] = []), n.util.isArray(this.$events[a]) || (this.$events[a] = [this.$events[a]]), this.$events[a]
   };m.prototype.emit = function(a) {
      if (!this.$events) return !1;
      var b = this.$events[a];
      if (!b) return !1;
      var c = Array.prototype.slice.call(arguments, 1);
      if ("function" == typeof b) b.apply(this, c);
      else {
         if (!n.util.isArray(b)) return !1;
         for (var b = b.slice(), d = 0, e = b.length; d < e; d++) b[d].apply(this, c)
      }
      return !0
   };
   (function(a, b) {
      function c(a) {
         return 10 > a ? "0" + a : a
      }
      function d(a) {
         return k.lastIndex = 0, k.test(a) ? '"' + a.replace(k, function(a) {
            var b = p[a];
            return "string" == typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
         }) + '"' : '"' + a + '"'
      }
      function e(a, b) {
         var f, h, w, k, P = j,
             p, o = b[a];
         o instanceof Date && (o = isFinite(a.valueOf()) ? a.getUTCFullYear() + "-" + c(a.getUTCMonth() + 1) + "-" + c(a.getUTCDate()) + "T" + c(a.getUTCHours()) + ":" + c(a.getUTCMinutes()) + ":" + c(a.getUTCSeconds()) + "Z" : null);
         "function" == typeof n && (o = n.call(b, a, o));
         switch (typeof o) {
         case "string":
            return d(o);
         case "number":
            return isFinite(o) ? String(o) : "null";
         case "boolean":
         case "null":
            return String(o);
         case "object":
            if (!o) return "null";
            j += m;
            p = [];
            if ("[object Array]" === Object.prototype.toString.apply(o)) {
               k = o.length;
               for (f = 0; f < k; f += 1) p[f] = e(f, o) || "null";
               return w = 0 === p.length ? "[]" : j ? "[\n" + j + p.join(",\n" + j) + "\n" + P + "]" : "[" + p.join(",") + "]", j = P, w
            }
            if (n && "object" == typeof n) {
               k = n.length;
               for (f = 0; f < k; f += 1)"string" == typeof n[f] && (h = n[f], w = e(h, o), w && p.push(d(h) + (j ? ": " : ":") + w))
            } else
            for (h in o) Object.prototype.hasOwnProperty.call(o, h) && (w = e(h, o), w && p.push(d(h) + (j ? ": " : ":") + w));
            return w = 0 === p.length ? "{}" : j ? "{\n" + j + p.join(",\n" + j) + "\n" + P + "}" : "{" + p.join(",") + "}", j = P, w
         }
      }
      "use strict";
      if (b && b.parse) return a.JSON = {
         parse: b.parse,
         stringify: b.stringify
      };
      var f = a.JSON = {},
          h = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          k = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
          j, m, p = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\"
          },
          n;
      f.stringify = function(a, b, c) {
         var d;
         m = j = "";
         if ("number" == typeof c) for (d = 0; d < c; d += 1) m += " ";
         else "string" == typeof c && (m = c);
         n = b;
         if (!b || "function" == typeof b || "object" == typeof b && "number" == typeof b.length) return e("", {
            "": a
         });
         throw Error("JSON.stringify");
      };
      f.parse = function(a, b) {
         function c(a, d) {
            var e, f, h = a[d];
            if (h && "object" == typeof h) for (e in h) Object.prototype.hasOwnProperty.call(h, e) && (f = c(h, e), void 0 !== f ? h[e] = f : delete h[e]);
            return b.call(a, d, h)
         }
         var d, a = String(a);
         h.lastIndex = 0;
         h.test(a) && (a = a.replace(h, function(a) {
            return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
         }));
         if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return d = eval("(" + a + ")"), "function" == typeof b ? c({
            "": d
         }, "") : d;
         throw new SyntaxError("JSON.parse");
      }
   })("undefined" != typeof io ? io : module.exports, "undefined" != typeof JSON ? JSON : void 0);
   var m = "undefined" != typeof io ? io : module.parent.exports,
       o = ("undefined" != typeof io ? io : module.exports).parser = {},
       t = o.packets = "disconnect connect heartbeat message json event ack error noop".split(" "),
       q = o.reasons = ["transport not supported", "client not handshaken", "unauthorized"],
       y = o.advice = ["reconnect"],
       r = m.JSON,
       x = m.util.indexOf;o.encodePacket = function(a) {
      var b = x(t, a.type),
          c = a.id || "",
          d = a.endpoint || "",
          e = a.ack,
          f = null;
      switch (a.type) {
      case "error":
         var h = a.reason ? x(q, a.reason) : "",
             a = a.advice ? x(y, a.advice) : "";
         if ("" !== h || "" !== a) f = h + ("" !== a ? "+" + a : "");
         break;
      case "message":
         "" !== a.data && (f = a.data);
         break;
      case "event":
         f = {
            name: a.name
         };
         a.args && a.args.length && (f.args = a.args);
         f = r.stringify(f);
         break;
      case "json":
         f =
         r.stringify(a.data);
         break;
      case "connect":
         a.qs && (f = a.qs);
         break;
      case "ack":
         f = a.ackId + (a.args && a.args.length ? "+" + r.stringify(a.args) : "")
      }
      b = [b, c + ("data" == e ? "+" : ""), d];
      return null !== f && void 0 !== f && b.push(f), b.join(":")
   };o.encodePayload = function(a) {
      var b = "";
      if (1 == a.length) return a[0];
      for (var c = 0, d = a.length; c < d; c++) b += "\ufffd" + a[c].length + "\ufffd" + a[c];
      return b
   };
   var A = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;o.decodePacket = function(a) {
      var b = a.match(A);
      if (!b) return {};
      var c = b[2] || "",
          a = b[5] || "",
          d = {
            type: t[b[1]],
            endpoint: b[4] || ""
          };
      c && (d.id = c, b[3] ? d.ack = "data" : d.ack = !0);
      switch (d.type) {
      case "error":
         b = a.split("+");
         d.reason = q[b[0]] || "";
         d.advice = y[b[1]] || "";
         break;
      case "message":
         d.data = a || "";
         break;
      case "event":
         try {
            var e = r.parse(a);
            d.name = e.name;
            d.args = e.args
         } catch (f) {}
         d.args = d.args || [];
         break;
      case "json":
         try {
            d.data = r.parse(a)
         } catch (h) {}
         break;
      case "connect":
         d.qs = a || "";
         break;
      case "ack":
         if (b = a.match(/^([0-9]+)(\+)?(.*)/)) if (d.ackId = b[1], d.args = [], b[3]) try {
            d.args = b[3] ? r.parse(b[3]) : []
         } catch (k) {}
      }
      return d
   };o.decodePayload =

   function(a) {
      if ("\ufffd" == a.charAt(0)) {
         for (var b = [], c = 1, d = ""; c < a.length; c++)"\ufffd" == a.charAt(c) ? (b.push(o.decodePacket(a.substr(c + 1).substr(0, d))), c += Number(d) + 1, d = "") : d += a.charAt(c);
         return b
      }
      return [o.decodePacket(a)]
   };
   var B = "undefined" != typeof io ? io : module.parent.exports,
       m = function(a, b) {
         this.socket = a;
         this.sessid = b
       };
   ("undefined" != typeof io ? io : module.exports).Transport = m;B.util.mixin(m, B.EventEmitter);m.prototype.heartbeats = function() {
      return !0
   };m.prototype.onData = function(a) {
      this.clearCloseTimeout();
      (this.socket.connected || this.socket.connecting || this.socket.reconnecting) && this.setCloseTimeout();
      if ("" !== a && (a = B.parser.decodePayload(a)) && a.length) for (var b = 0, c = a.length; b < c; b++) this.onPacket(a[b]);
      return this
   };m.prototype.onPacket = function(a) {
      return this.socket.setHeartbeatTimeout(), "heartbeat" == a.type ? this.onHeartbeat() : ("connect" == a.type && "" == a.endpoint && this.onConnect(), "error" == a.type && "reconnect" == a.advice && (this.isOpen = !1), this.socket.onPacket(a), this)
   };m.prototype.setCloseTimeout = function() {
      if (!this.closeTimeout) {
         var a =
         this;
         this.closeTimeout = setTimeout(function() {
            a.onDisconnect()
         }, this.socket.closeTimeout)
      }
   };m.prototype.onDisconnect = function() {
      return this.isOpen && this.close(), this.clearTimeouts(), this.socket.onDisconnect(), this
   };m.prototype.onConnect = function() {
      return this.socket.onConnect(), this
   };m.prototype.clearCloseTimeout = function() {
      this.closeTimeout && (clearTimeout(this.closeTimeout), this.closeTimeout = null)
   };m.prototype.clearTimeouts = function() {
      this.clearCloseTimeout();
      this.reopenTimeout && clearTimeout(this.reopenTimeout)
   };
   m.prototype.packet = function(a) {
      this.send(B.parser.encodePacket(a))
   };m.prototype.onHeartbeat = function() {
      this.packet({
         type: "heartbeat"
      })
   };m.prototype.onOpen = function() {
      this.isOpen = !0;
      this.clearCloseTimeout();
      this.socket.onOpen()
   };m.prototype.onClose = function() {
      this.isOpen = !1;
      this.socket.onClose();
      this.onDisconnect()
   };m.prototype.prepareUrl = function() {
      var a = this.socket.options;
      return this.scheme() + "://" + a.host + ":" + a.port + "/" + a.resource + "/" + B.protocol + "/" + this.name + "/" + this.sessid
   };m.prototype.ready =

   function(a, b) {
      b.call(this)
   };
   var s = "undefined" != typeof io ? io : module.parent.exports,
       K = this,
       m = function(a) {
         this.options = {
            port: 80,
            secure: !1,
            document: "document" in K ? document : !1,
            resource: "socket.io",
            transports: s.transports,
            "connect timeout": 1E4,
            "try multiple transports": !0,
            reconnect: !0,
            "reconnection delay": 500,
            "reconnection limit": Infinity,
            "reopen delay": 3E3,
            "max reconnection attempts": 10,
            "sync disconnect on unload": !1,
            "auto connect": !0,
            "flash policy port": 10843,
            manualFlush: !1
         };
         s.util.merge(this.options, a);
         this.reconnecting = this.connecting = this.open = this.connected = !1;
         this.namespaces = {};
         this.buffer = [];
         this.doBuffer = !1;
         if (this.options["sync disconnect on unload"] && (!this.isXDomain() || s.util.ua.hasCORS)) {
            var b = this;
            s.util.on(K, "beforeunload", function() {
               b.disconnectSync()
            }, !1)
         }
         this.options["auto connect"] && this.connect()
       },
       L = function() {};
   ("undefined" != typeof io ? io : module.exports).Socket = m;s.util.mixin(m, s.EventEmitter);m.prototype.of = function(a) {
      return this.namespaces[a] || (this.namespaces[a] = new s.SocketNamespace(this, a), "" !== a && this.namespaces[a].packet({
         type: "connect"
      })), this.namespaces[a]
   };m.prototype.publish = function() {
      this.emit.apply(this, arguments);
      var a, b;
      for (b in this.namespaces) this.namespaces.hasOwnProperty(b) && (a = this.of(b), a.$emit.apply(a, arguments))
   };m.prototype.handshake = function(a) {
      function b(d) {
         d instanceof Error ? (c.connecting = !1, c.onError(d.message)) : a.apply(null, d.split(":"))
      }
      var c = this,
          d = this.options,
          d = ["http" + (d.secure ? "s" : "") + ":/", d.host + ":" + d.port, d.resource, s.protocol, s.util.query(this.options.query, "t=" + +new Date)].join("/");
      if (this.isXDomain() && !s.util.ua.hasCORS) {
         var e = document.getElementsByTagName("script")[0],
             f = document.createElement("script");
         f.src = d + "&jsonp=" + s.j.length;
         e.parentNode.insertBefore(f, e);
         s.j.push(function(a) {
            b(a);
            f.parentNode.removeChild(f)
         })
      } else {
         var h = s.util.request();
         h.open("GET", d, !0);
         this.isXDomain() && (h.withCredentials = !0);
         h.onreadystatechange = function() {
            4 == h.readyState && (h.onreadystatechange = L, 200 == h.status ? b(h.responseText) : 403 == h.status ? c.onError(h.responseText) : (c.connecting = !1, !c.reconnecting && c.onError(h.responseText)))
         };
         h.send(null)
      }
   };m.prototype.getTransport = function(a) {
      for (var a = a || this.transports, b = 0, c; c = a[b]; b++) if (s.Transport[c] && s.Transport[c].check(this) && (!this.isXDomain() || s.Transport[c].xdomainCheck(this))) return new s.Transport[c](this, this.sessionid);
      return null
   };m.prototype.connect = function(a) {
      if (this.connecting) return this;
      var b = this;
      return b.connecting = !0, this.handshake(function(c, d, e, f) {
         function h(a) {
            b.transport && b.transport.clearTimeouts();
            b.transport = b.getTransport(a);
            if (!b.transport) return b.publish("connect_failed");
            b.transport.ready(b, function() {
               b.connecting = !0;
               b.publish("connecting", b.transport.name);
               b.transport.open();
               b.options["connect timeout"] && (b.connectTimeoutTimer = setTimeout(function() {
                  if (!b.connected && (b.connecting = !1, b.options["try multiple transports"])) {
                     for (var a = b.transports; 0 < a.length && a.splice(0, 1)[0] != b.transport.name;);
                     a.length ? h(a) : b.publish("connect_failed")
                  }
               }, b.options["connect timeout"]))
            })
         }
         b.sessionid = c;
         b.closeTimeout =
         1E3 * e;
         b.heartbeatTimeout = 1E3 * d;
         b.transports || (b.transports = b.origTransports = f ? s.util.intersect(f.split(","), b.options.transports) : b.options.transports);
         b.setHeartbeatTimeout();
         h(b.transports);
         b.once("connect", function() {
            clearTimeout(b.connectTimeoutTimer);
            a && "function" == typeof a && a()
         })
      }), this
   };m.prototype.setHeartbeatTimeout = function() {
      clearTimeout(this.heartbeatTimeoutTimer);
      if (!this.transport || this.transport.heartbeats()) {
         var a = this;
         this.heartbeatTimeoutTimer = setTimeout(function() {
            a.transport.onClose()
         }, this.heartbeatTimeout)
      }
   };m.prototype.packet = function(a) {
      return this.connected && !this.doBuffer ? this.transport.packet(a) : this.buffer.push(a), this
   };m.prototype.setBuffer = function(a) {
      this.doBuffer = a;
      !a && this.connected && this.buffer.length && (this.options.manualFlush || this.flushBuffer())
   };m.prototype.flushBuffer = function() {
      this.transport.payload(this.buffer);
      this.buffer = []
   };m.prototype.disconnect = function() {
      if (this.connected || this.connecting) this.open && this.of("").packet({
         type: "disconnect"
      }), this.onDisconnect("booted");
      return this
   };m.prototype.disconnectSync = function() {
      var a = s.util.request(),
          b = ["http" + (this.options.secure ? "s" : "") + ":/", this.options.host + ":" + this.options.port, this.options.resource, s.protocol, "", this.sessionid].join("/") + "/?disconnect=1";
      a.open("GET", b, !1);
      a.send(null);
      this.onDisconnect("booted")
   };m.prototype.isXDomain = function() {
      var a = K.location.port || ("https:" == K.location.protocol ? 443 : 80);
      return this.options.host !== K.location.hostname || this.options.port != a
   };m.prototype.onConnect = function() {
      this.connected || (this.connected = !0, this.connecting = !1, this.doBuffer || this.setBuffer(!1), this.emit("connect"))
   };m.prototype.onOpen = function() {
      this.open = !0
   };m.prototype.onClose = function() {
      this.open = !1;
      clearTimeout(this.heartbeatTimeoutTimer)
   };m.prototype.onPacket = function(a) {
      this.of(a.endpoint).onPacket(a)
   };m.prototype.onError = function(a) {
      a && a.advice && "reconnect" === a.advice && (this.connected || this.connecting) && (this.disconnect(), this.options.reconnect && this.reconnect());
      this.publish("error", a && a.reason ? a.reason : a)
   };
   m.prototype.onDisconnect = function(a) {
      var b = this.connected,
          c = this.connecting;
      this.open = this.connecting = this.connected = !1;
      if (b || c) this.transport.close(), this.transport.clearTimeouts(), b && (this.publish("disconnect", a), "booted" != a && this.options.reconnect && !this.reconnecting && this.reconnect())
   };m.prototype.reconnect = function() {
      function a() {
         if (c.connected) {
            for (var d in c.namespaces) c.namespaces.hasOwnProperty(d) && "" !== d && c.namespaces[d].packet({
               type: "connect"
            });
            c.publish("reconnect", c.transport.name, c.reconnectionAttempts)
         }
         clearTimeout(c.reconnectionTimer);
         c.removeListener("connect_failed", b);
         c.removeListener("connect", b);
         c.reconnecting = !1;
         delete c.reconnectionAttempts;
         delete c.reconnectionDelay;
         delete c.reconnectionTimer;
         delete c.redoTransports;
         c.options["try multiple transports"] = e
      }
      function b() {
         if (c.reconnecting) {
            if (c.connected) return a();
            if (c.connecting && c.reconnecting) return c.reconnectionTimer = setTimeout(b, 1E3);
            c.reconnectionAttempts++ >= d ? c.redoTransports ? (c.publish("reconnect_failed"), a()) : (c.on("connect_failed", b), c.options["try multiple transports"] = !0, c.transports = c.origTransports, c.transport = c.getTransport(), c.redoTransports = !0, c.connect()) : (c.reconnectionDelay < f && (c.reconnectionDelay *= 2), c.connect(), c.publish("reconnecting", c.reconnectionDelay, c.reconnectionAttempts), c.reconnectionTimer = setTimeout(b, c.reconnectionDelay))
         }
      }
      this.reconnecting = !0;
      this.reconnectionAttempts = 0;
      this.reconnectionDelay = this.options["reconnection delay"];
      var c = this,
          d = this.options["max reconnection attempts"],
          e = this.options["try multiple transports"],
          f = this.options["reconnection limit"];
      this.options["try multiple transports"] = !1;
      this.reconnectionTimer = setTimeout(b, this.reconnectionDelay);
      this.on("connect", b)
   };
   var Q = "undefined" != typeof io ? io : module.parent.exports,
       m = function(a, b) {
         this.socket = a;
         this.name = b || "";
         this.flags = {};
         this.json = new E(this, "json");
         this.ackPackets = 0;
         this.acks = {}
       },
       E = function(a, b) {
         this.namespace = a;
         this.name = b
       };
   ("undefined" != typeof io ? io : module.exports).SocketNamespace = m;Q.util.mixin(m, Q.EventEmitter);m.prototype.$emit = Q.EventEmitter.prototype.emit;m.prototype.of =

   function() {
      return this.socket.of.apply(this.socket, arguments)
   };m.prototype.packet = function(a) {
      return a.endpoint = this.name, this.socket.packet(a), this.flags = {}, this
   };m.prototype.send = function(a, b) {
      var c = {
         type: this.flags.json ? "json" : "message",
         data: a
      };
      return "function" == typeof b && (c.id = ++this.ackPackets, c.ack = !0, this.acks[c.id] = b), this.packet(c)
   };m.prototype.emit = function(a) {
      var b = Array.prototype.slice.call(arguments, 1),
          c = b[b.length - 1],
          d = {
            type: "event",
            name: a
          };
      return "function" == typeof c && (d.id = ++this.ackPackets, d.ack = "data", this.acks[d.id] = c, b = b.slice(0, b.length - 1)), d.args = b, this.packet(d)
   };m.prototype.disconnect = function() {
      return "" === this.name ? this.socket.disconnect() : (this.packet({
         type: "disconnect"
      }), this.$emit("disconnect")), this
   };m.prototype.onPacket = function(a) {
      function b() {
         c.packet({
            type: "ack",
            args: Q.util.toArray(arguments),
            ackId: a.id
         })
      }
      var c = this;
      switch (a.type) {
      case "connect":
         this.$emit("connect");
         break;
      case "disconnect":
         "" === this.name ? this.socket.onDisconnect(a.reason || "booted") : this.$emit("disconnect", a.reason);
         break;
      case "message":
      case "json":
         var d = ["message", a.data];
         "data" == a.ack ? d.push(b) : a.ack && this.packet({
            type: "ack",
            ackId: a.id
         });
         this.$emit.apply(this, d);
         break;
      case "event":
         d = [a.name].concat(a.args);
         "data" == a.ack && d.push(b);
         this.$emit.apply(this, d);
         break;
      case "ack":
         this.acks[a.ackId] && (this.acks[a.ackId].apply(this, a.args), delete this.acks[a.ackId]);
         break;
      case "error":
         a.advice ? this.socket.onError(a) : "unauthorized" == a.reason ? this.$emit("connect_failed", a.reason) : this.$emit("error", a.reason)
      }
   };
   E.prototype.send = function() {
      this.namespace.flags[this.name] = !0;
      this.namespace.send.apply(this.namespace, arguments)
   };E.prototype.emit = function() {
      this.namespace.flags[this.name] = !0;
      this.namespace.emit.apply(this.namespace, arguments)
   };
   var M = "undefined" != typeof io ? io : module.parent.exports,
       N = this,
       m = function(a) {
         M.Transport.apply(this, arguments)
       };
   ("undefined" != typeof io ? io.Transport : module.exports).websocket = m;M.util.inherit(m, M.Transport);m.prototype.name = "websocket";m.prototype.open = function() {
      var a = M.util.query(this.socket.options.query),
          b = this,
          c;
      return c || (c = N.MozWebSocket || N.WebSocket), this.websocket = new c(this.prepareUrl() + a), this.websocket.onopen = function() {
         b.onOpen();
         b.socket.setBuffer(!1)
      }, this.websocket.onmessage = function(a) {
         b.onData(a.data)
      }, this.websocket.onclose = function() {
         b.onClose();
         b.socket.setBuffer(!0)
      }, this.websocket.onerror = function(a) {
         b.onError(a)
      }, this
   };M.util.ua.iDevice ? m.prototype.send = function(a) {
      var b = this;
      return setTimeout(function() {
         b.websocket.send(a)
      }, 0), this
   } : m.prototype.send = function(a) {
      return this.websocket.send(a), this
   };m.prototype.payload = function(a) {
      for (var b = 0, c = a.length; b < c; b++) this.packet(a[b]);
      return this
   };m.prototype.close = function() {
      return this.websocket.close(), this
   };m.prototype.onError = function(a) {
      this.socket.onError(a)
   };m.prototype.scheme = function() {
      return this.socket.options.secure ? "wss" : "ws"
   };m.check = function() {
      return "WebSocket" in N && !("__addTask" in WebSocket) || "MozWebSocket" in N
   };m.xdomainCheck = function() {
      return !0
   };M.transports.push("websocket");
   var I = "undefined" != typeof io ? io : module.parent.exports,
       C = function() {
         I.Transport.websocket.apply(this, arguments)
       };
   ("undefined" != typeof io ? io.Transport : module.exports).flashsocket = C;I.util.inherit(C, I.Transport.websocket);C.prototype.name = "flashsocket";C.prototype.open = function() {
      var a = this,
          b = arguments;
      return WebSocket.__addTask(function() {
         I.Transport.websocket.prototype.open.apply(a, b)
      }), this
   };C.prototype.send = function() {
      var a = this,
          b = arguments;
      return WebSocket.__addTask(function() {
         I.Transport.websocket.prototype.send.apply(a, b)
      }), this
   };C.prototype.close =

   function() {
      return WebSocket.__tasks.length = 0, I.Transport.websocket.prototype.close.call(this), this
   };C.prototype.ready = function(a, b) {
      function c() {
         var e = a.options,
             f = e["flash policy port"],
             h = ["http" + (e.secure ? "s" : "") + ":/", e.host + ":" + e.port, e.resource, "static/flashsocket", "WebSocketMain" + (a.isXDomain() ? "Insecure" : "") + ".swf"];
         C.loaded || ("undefined" == typeof WEB_SOCKET_SWF_LOCATION && (WEB_SOCKET_SWF_LOCATION = h.join("/")), 843 !== f && WebSocket.loadFlashPolicyFile("xmlsocket://" + e.host + ":" + f), WebSocket.__initialize(), C.loaded = !0);
         b.call(d)
      }
      var d = this;
      if (document.body) return c();
      I.util.load(c)
   };C.check = function() {
      return "undefined" != typeof WebSocket && "__initialize" in WebSocket && Y ? 10 <= Y.getFlashPlayerVersion().major : !1
   };C.xdomainCheck = function() {
      return !0
   };
   "undefined" != typeof window && (WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = !0);I.transports.push("flashsocket");
   if ("undefined" != typeof window) {
      var Y, fa = function() {
         if (!ja) {
            try {
               var a = v.getElementsByTagName("body")[0].appendChild(v.createElement("span"));
               a.parentNode.removeChild(a)
            } catch (b) {
               return
            }
            ja = !0;
            for (var a = T.length, c = 0; c < a; c++) T[c]()
         }
      },
          Ea = function(a) {
            ja ? a() : T[T.length] = a
          },
          m = function(a) {
            if (typeof S.addEventListener != D) S.addEventListener("load", a, !1);
            else if (typeof v.addEventListener != D) v.addEventListener("load", a, !1);
            else if (typeof S.attachEvent != D) {
               var b = S;
               b.attachEvent("onload", a);
               ha[ha.length] = [b, "onload", a]
            } else if ("function" == typeof S.onload) {
               var c = S.onload;
               S.onload = function() {
                  c();
                  a()
               }
            } else S.onload = a
          },
          na = function() {
            var a = aa.length;
            if (0 < a) for (var b = 0; b < a; b++) {
               var c = aa[b].id,
                   d = aa[b].callbackFn,
                   e = {
                     success: !1,
                     id: c
                   };
               if (0 < u.pv[0]) {
                  var f = R(c);
                  if (f) if (wa(aa[b].swfVersion) && !(u.wk && 312 > u.wk)) Z(c, !0), d && (e.success = !0, e.ref = oa(c), d(e));
                  else if (aa[b].expressInstall && pa()) {
                     e = {};
                     e.data = aa[b].expressInstall;
                     e.width = f.getAttribute("width") || "0";
                     e.height = f.getAttribute("height") || "0";
                     f.getAttribute("class") && (e.styleclass = f.getAttribute("class"));
                     f.getAttribute("align") && (e.align = f.getAttribute("align"));
                     for (var h = {}, f = f.getElementsByTagName("param"), k = f.length, j = 0; j < k; j++)"movie" != f[j].getAttribute("name").toLowerCase() && (h[f[j].getAttribute("name")] = f[j].getAttribute("value"));
                     Fa(e, h, c, d)
                  } else La(f), d && d(e)
               } else Z(c, !0), d && ((c = oa(c)) && typeof c.SetVariable != D && (e.success = !0, e.ref = c), d(e))
            }
          },
          oa = function(a) {
            var b = null;
            if ((a = R(a)) && "OBJECT" == a.nodeName) typeof a.SetVariable != D ? b = a : (a = a.getElementsByTagName(W)[0]) && (b = a);
            return b
          },
          pa = function() {
            return !Ca && wa("6.0.65") && (u.win || u.mac) && !(u.wk && 312 > u.wk)
          },
          Fa = function(a, b, c, d) {
            Ca = !0;
            F = d || null;
            xa = {
               success: !1,
               id: c
            };
            var e = R(c);
            if (e) {
               "OBJECT" == e.nodeName ? (qa = ua(e), ia = null) : (qa =
               e, ia = c);
               a.id = Ba;
               if (typeof a.width == D || !/%$/.test(a.width) && 310 > parseInt(a.width, 10)) a.width = "310";
               if (typeof a.height == D || !/%$/.test(a.height) && 137 > parseInt(a.height, 10)) a.height = "137";
               v.title = v.title.slice(0, 47) + " - Flash Player Installation";
               d = u.ie && u.win ? ["Active"].concat("").join("X") : "PlugIn";
               d = "MMredirectURL=" + S.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + d + "&MMdoctitle=" + v.title;
               typeof b.flashvars != D ? b.flashvars += "&" + d : b.flashvars = d;
               u.ie && (u.win && 4 != e.readyState) && (d = v.createElement("div"), c += "SWFObjectNew", d.setAttribute("id", c), e.parentNode.insertBefore(d, e), e.style.display = "none", function() {
                  4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
               }());
               va(a, b, c)
            }
          },
          La = function(a) {
            if (u.ie && u.win && 4 != a.readyState) {
               var b = v.createElement("div");
               a.parentNode.insertBefore(b, a);
               b.parentNode.replaceChild(ua(a), b);
               a.style.display = "none";
               (function() {
                  4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
               })()
            } else a.parentNode.replaceChild(ua(a), a)
          },
          ua = function(a) {
            var b =
            v.createElement("div");
            if (u.win && u.ie) b.innerHTML = a.innerHTML;
            else if (a = a.getElementsByTagName(W)[0]) if (a = a.childNodes) for (var c = a.length, d = 0; d < c; d++)(1 != a[d].nodeType || "PARAM" != a[d].nodeName) && 8 != a[d].nodeType && b.appendChild(a[d].cloneNode(!0));
            return b
          },
          va = function(a, b, c) {
            var d, e = R(c);
            if (u.wk && 312 > u.wk) return d;
            if (e) if (typeof a.id == D && (a.id = c), u.ie && u.win) {
               var f = "",
                   h;
               for (h in a) a[h] != Object.prototype[h] && ("data" == h.toLowerCase() ? b.movie = a[h] : "styleclass" == h.toLowerCase() ? f += ' class="' + a[h] + '"' : "classid" != h.toLowerCase() && (f += " " + h + '="' + a[h] + '"'));
               h = "";
               for (var j in b) b[j] != Object.prototype[j] && (h += '<param name="' + j + '" value="' + b[j] + '" />');
               e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>";
               ga[ga.length] = a.id;
               d = R(a.id)
            } else {
               j = v.createElement(W);
               j.setAttribute("type", Aa);
               for (var k in a) a[k] != Object.prototype[k] && ("styleclass" == k.toLowerCase() ? j.setAttribute("class", a[k]) : "classid" != k.toLowerCase() && j.setAttribute(k, a[k]));
               for (f in b) b[f] != Object.prototype[f] && "movie" != f.toLowerCase() && (a = j, h = f, k = b[f], c = v.createElement("param"), c.setAttribute("name", h), c.setAttribute("value", k), a.appendChild(c));
               e.parentNode.replaceChild(j, e);
               d = j
            }
            return d
          },
          sa = function(a) {
            var b = R(a);
            b && "OBJECT" == b.nodeName && (u.ie && u.win ? (b.style.display = "none", function() {
               if (4 == b.readyState) {
                  var c = R(a);
                  if (c) {
                     for (var d in c)"function" == typeof c[d] && (c[d] = null);
                     c.parentNode.removeChild(c)
                  }
               } else setTimeout(arguments.callee, 10)
            }()) : b.parentNode.removeChild(b))
          },
          R = function(a) {
            var b = null;
            try {
               b =
               v.getElementById(a)
            } catch (c) {}
            return b
          },
          wa = function(a) {
            var b = u.pv,
                a = a.split(".");
            return a[0] = parseInt(a[0], 10), a[1] = parseInt(a[1], 10) || 0, a[2] = parseInt(a[2], 10) || 0, b[0] > a[0] || b[0] == a[0] && b[1] > a[1] || b[0] == a[0] && b[1] == a[1] && b[2] >= a[2] ? !0 : !1
          },
          Ga = function(a, b, c, d) {
            if (!u.ie || !u.mac) {
               var e = v.getElementsByTagName("head")[0];
               if (e) {
                  c = c && "string" == typeof c ? c : "screen";
                  d && (ba = null, Ia = null);
                  if (!ba || Ia != c) d = v.createElement("style"), d.setAttribute("type", "text/css"), d.setAttribute("media", c), ba = e.appendChild(d), u.ie && u.win && typeof v.styleSheets != D && 0 < v.styleSheets.length && (ba = v.styleSheets[v.styleSheets.length - 1]), Ia = c;
                  u.ie && u.win ? ba && typeof ba.addRule == W && ba.addRule(a, b) : ba && typeof v.createTextNode != D && ba.appendChild(v.createTextNode(a + " {" + b + "}"))
               }
            }
          },
          Z = function(a, b) {
            if (Da) {
               var c = b ? "visible" : "hidden";
               ja && R(a) ? R(a).style.visibility = c : Ga("#" + a, "visibility:" + c)
            }
          },
          ta = function(a) {
            return null != /[\\\"<>\.;]/.exec(a) && typeof encodeURIComponent != D ? encodeURIComponent(a) : a
          },
          D = "undefined",
          W = "object",
          Aa = "application/x-shockwave-flash",
          Ba = "SWFObjectExprInst",
          S = window,
          v = document;
      k = navigator;
      var Ha = !1,
          T = [function() {
            if (Ha) {
               var a = v.getElementsByTagName("body")[0],
                   b = v.createElement(W);
               b.setAttribute("type", Aa);
               var c = a.appendChild(b);
               if (c) {
                  var d = 0;
                  (function() {
                     if (typeof c.GetVariable != D) {
                        var e = c.GetVariable("$version");
                        e && (e = e.split(" ")[1].split(","), u.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)])
                     } else if (10 > d) {
                        d++;
                        setTimeout(arguments.callee, 10);
                        return
                     }
                     a.removeChild(b);
                     c = null;
                     na()
                  })()
               } else na()
            } else na()
         }],
          aa = [],
          ga = [],
          ha = [],
          qa, ia, F, xa, ja = !1,
          Ca = !1,
          ba, Ia, Da = !0,
          u, p = typeof v.getElementById != D && typeof v.getElementsByTagName != D && typeof v.createElement != D,
          ka = k.userAgent.toLowerCase(),
          O = k.platform.toLowerCase(),
          Ma = O ? /win/.test(O) : /win/.test(ka),
          O = O ? /mac/.test(O) : /mac/.test(ka),
          ka = /webkit/.test(ka) ? parseFloat(ka.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
          ya = !1,
          la = [0, 0, 0],
          G = null;
      if (typeof k.plugins != D && typeof k.plugins["Shockwave Flash"] == W)(G = k.plugins["Shockwave Flash"].description) && (typeof k.mimeTypes == D || !k.mimeTypes[Aa] || k.mimeTypes[Aa].enabledPlugin) && (Ha = !0, ya = !1, G = G.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), la[0] = parseInt(G.replace(/^(.*)\..*$/, "$1"), 10), la[1] = parseInt(G.replace(/^.*\.(.*)\s.*$/, "$1"), 10), la[2] = /[a-zA-Z]/.test(G) ? parseInt(G.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
      else if (typeof S[["Active"].concat("Object").join("X")] != D) try {
         var z = new(window[["Active"].concat("Object").join("X")])("ShockwaveFlash.ShockwaveFlash");
         z && (G = z.GetVariable("$version"), G && (ya = !0, G = G.split(" ")[1].split(","), la = [parseInt(G[0], 10), parseInt(G[1], 10), parseInt(G[2], 10)]))
      } catch (Na) {}
      u = {
         w3: p,
         pv: la,
         wk: ka,
         ie: ya,
         win: Ma,
         mac: O
      };
      u.w3 && ((typeof v.readyState != D && "complete" == v.readyState || typeof v.readyState == D && (v.getElementsByTagName("body")[0] || v.body)) && fa(), ja || (typeof v.addEventListener != D && v.addEventListener("DOMContentLoaded", fa, !1), u.ie && u.win && (v.attachEvent("onreadystatechange", function() {
         "complete" == v.readyState && (v.detachEvent("onreadystatechange", arguments.callee), fa())
      }), S == top &&
      function() {
         if (!ja) {
            try {
               v.documentElement.doScroll("left")
            } catch (a) {
               setTimeout(arguments.callee, 0);
               return
            }
            fa()
         }
      }()), u.wk &&
      function() {
         ja || (/loaded|complete/.test(v.readyState) ? fa() : setTimeout(arguments.callee, 0))
      }(), m(fa)));
      u.ie && u.win && window.attachEvent("onunload", function() {
         for (var a = ha.length, b = 0; b < a; b++) ha[b][0].detachEvent(ha[b][1], ha[b][2]);
         a = ga.length;
         for (b = 0; b < a; b++) sa(ga[b]);
         for (var c in u) u[c] = null;
         u = null;
         for (var d in Y) Y[d] = null;
         Y = null
      });
      Y = {
         registerObject: function(a, b, c, d) {
            if (u.w3 && a && b) {
               var e = {};
               e.id = a;
               e.swfVersion = b;
               e.expressInstall = c;
               e.callbackFn = d;
               aa[aa.length] = e;
               Z(a, false)
            } else d && d({
               success: false,
               id: a
            })
         },
         getObjectById: function(a) {
            if (u.w3) return oa(a)
         },
         embedSWF: function(a, b, c, d, e, f, h, j, k, m) {
            var p = {
               success: false,
               id: b
            };
            u.w3 && !(u.wk && u.wk < 312) && a && b && c && d && e ? (Z(b, false), Ea(function() {
               c = c + "";
               d = d + "";
               var n = {};
               if (k && typeof k === W) for (var o in k) n[o] = k[o];
               n.data = a;
               n.width = c;
               n.height = d;
               o = {};
               if (j && typeof j === W) for (var q in j) o[q] = j[q];
               if (h && typeof h === W) for (var t in h) typeof o.flashvars != D ? o.flashvars = o.flashvars + ("&" + t + "=" + h[t]) : o.flashvars = t + "=" + h[t];
               if (wa(e)) {
                  q = va(n, o, b);
                  n.id == b && Z(b, true);
                  p.success = true;
                  p.ref = q
               } else {
                  if (f && pa()) {
                     n.data = f;
                     Fa(n, o, b, m);
                     return
                  }
                  Z(b, true)
               }
               m && m(p)
            })) : m && m(p)
         },
         switchOffAutoHideShow: function() {
            Da = false
         },
         ua: u,
         getFlashPlayerVersion: function() {
            return {
               major: u.pv[0],
               minor: u.pv[1],
               release: u.pv[2]
            }
         },
         hasFlashPlayerVersion: wa,
         createSWF: function(a, b, c) {
            return u.w3 ? va(a, b, c) : void 0
         },
         showExpressInstall: function(a, b, c, d) {
            u.w3 && pa() && Fa(a, b, c, d)
         },
         removeSWF: function(a) {
            u.w3 && sa(a)
         },
         createCSS: function(a, b, c, d) {
            u.w3 && Ga(a, b, c, d)
         },
         addDomLoadEvent: Ea,
         addLoadEvent: m,
         getQueryParamValue: function(a) {
            var b = v.location.search || v.location.hash;
            if (b) {
               /\?/.test(b) && (b = b.split("?")[1]);
               if (a == null) return ta(b);
               for (var b = b.split("&"), c = 0; c < b.length; c++) if (b[c].substring(0, b[c].indexOf("=")) == a) return ta(b[c].substring(b[c].indexOf("=") + 1))
            }
            return ""
         },
         expressInstallCallback: function() {
            if (Ca) {
               var a = R(Ba);
               a && qa && (a.parentNode.replaceChild(qa, a), ia && (Z(ia, true), u.ie && u.win && (qa.style.display = "block")), F && F(xa));
               Ca = false
            }
         }
      }
   }
   if (!("undefined" == typeof window || window.WebSocket)) {
      var U =
      window.console;
      if (!U || !U.log || !U.error) U = {
         log: function() {},
         error: function() {}
      };
      Y.hasFlashPlayerVersion("10.0.0") ? ("file:" == location.protocol && U.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."), WebSocket = function(a, b, c, d, e) {
         var f = this;
         f.__id = WebSocket.__nextId++;
         WebSocket.__instances[f.__id] = f;
         f.readyState = WebSocket.CONNECTING;
         f.bufferedAmount = 0;
         f.__events = {};
         b ? "string" == typeof b && (b = [b]) : b = [];
         setTimeout(function() {
            WebSocket.__addTask(function() {
               WebSocket.__flash.create(f.__id, a, b, c || null, d || 0, e || null)
            })
         }, 0)
      }, WebSocket.prototype.send = function(a) {
         if (this.readyState == WebSocket.CONNECTING) throw "INVALID_STATE_ERR: Web Socket connection has not been established";
         a = WebSocket.__flash.send(this.__id, encodeURIComponent(a));
         return 0 > a ? !0 : (this.bufferedAmount += a, !1)
      }, WebSocket.prototype.close = function() {
         this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING || (this.readyState = WebSocket.CLOSING, WebSocket.__flash.close(this.__id))
      }, WebSocket.prototype.addEventListener = function(a, b) {
         a in this.__events || (this.__events[a] = []);
         this.__events[a].push(b)
      }, WebSocket.prototype.removeEventListener = function(a, b) {
         if (a in this.__events) for (var c = this.__events[a], d = c.length - 1; 0 <= d; --d) if (c[d] === b) {
            c.splice(d, 1);
            break
         }
      }, WebSocket.prototype.dispatchEvent = function(a) {
         for (var b = this.__events[a.type] || [], c = 0; c < b.length; ++c) b[c](a);
         (b = this["on" + a.type]) && b(a)
      }, WebSocket.prototype.__handleEvent = function(a) {
         "readyState" in a && (this.readyState = a.readyState);
         "protocol" in a && (this.protocol = a.protocol);
         if ("open" == a.type || "error" == a.type) a = this.__createSimpleEvent(a.type);
         else if ("close" == a.type) a = this.__createSimpleEvent("close");
         else {
            if ("message" != a.type) throw "unknown event type: " + a.type;
            a = decodeURIComponent(a.message);
            a = this.__createMessageEvent("message", a)
         }
         this.dispatchEvent(a)
      }, WebSocket.prototype.__createSimpleEvent = function(a) {
         if (document.createEvent && window.Event) {
            var b = document.createEvent("Event");
            return b.initEvent(a, !1, !1), b
         }
         return {
            type: a,
            bubbles: !1,
            cancelable: !1
         }
      }, WebSocket.prototype.__createMessageEvent = function(a, b) {
         if (document.createEvent && window.MessageEvent && !window.opera) {
            var c = document.createEvent("MessageEvent");
            return c.initMessageEvent("message", !1, !1, b, null, null, window, null), c
         }
         return {
            type: a,
            data: b,
            bubbles: !1,
            cancelable: !1
         }
      }, WebSocket.CONNECTING = 0, WebSocket.OPEN = 1, WebSocket.CLOSING = 2, WebSocket.CLOSED = 3, WebSocket.__flash = null, WebSocket.__instances = {}, WebSocket.__tasks = [], WebSocket.__nextId = 0, WebSocket.loadFlashPolicyFile =

      function(a) {
         WebSocket.__addTask(function() {
            WebSocket.__flash.loadManualPolicyFile(a)
         })
      }, WebSocket.__initialize = function() {
         if (!WebSocket.__flash) if (WebSocket.__swfLocation && (window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation), window.WEB_SOCKET_SWF_LOCATION) {
            var a = document.createElement("div");
            a.id = "webSocketContainer";
            a.style.position = "absolute";
            WebSocket.__isFlashLite() ? (a.style.left = "0px", a.style.top = "0px") : (a.style.left = "-100px", a.style.top = "-100px");
            var b = document.createElement("div");
            b.id = "webSocketFlash";
            a.appendChild(b);
            document.body.appendChild(a);
            Y.embedSWF(WEB_SOCKET_SWF_LOCATION, "webSocketFlash", "1", "1", "10.0.0", null, null, {
               hasPriority: !0,
               swliveconnect: !0,
               allowScriptAccess: "always"
            }, null, function(a) {
               a.success || U.error("[WebSocket] swfobject.embedSWF failed")
            })
         } else U.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf")
      }, WebSocket.__onFlashInitialized = function() {
         setTimeout(function() {
            WebSocket.__flash = document.getElementById("webSocketFlash");
            WebSocket.__flash.setCallerUrl(location.href);
            WebSocket.__flash.setDebug( !! window.WEB_SOCKET_DEBUG);
            for (var a = 0; a < WebSocket.__tasks.length; ++a) WebSocket.__tasks[a]();
            WebSocket.__tasks = []
         }, 0)
      }, WebSocket.__onFlashEvent = function() {
         return setTimeout(function() {
            try {
               for (var a = WebSocket.__flash.receiveEvents(), b = 0; b < a.length; ++b) WebSocket.__instances[a[b].webSocketId].__handleEvent(a[b])
            } catch (c) {
               U.error(c)
            }
         }, 0), !0
      }, WebSocket.__log = function(a) {
         U.log(decodeURIComponent(a))
      }, WebSocket.__error = function(a) {
         U.error(decodeURIComponent(a))
      }, WebSocket.__addTask =

      function(a) {
         WebSocket.__flash ? a() : WebSocket.__tasks.push(a)
      }, WebSocket.__isFlashLite = function() {
         if (!window.navigator || !window.navigator.mimeTypes) return !1;
         var a = window.navigator.mimeTypes["application/x-shockwave-flash"];
         return !a || !a.enabledPlugin || !a.enabledPlugin.filename ? !1 : a.enabledPlugin.filename.match(/flashlite/i) ? !0 : !1
      }, window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION || (window.addEventListener ? window.addEventListener("load", function() {
         WebSocket.__initialize()
      }, !1) : window.attachEvent("onload", function() {
         WebSocket.__initialize()
      }))) : U.error("Flash Player >= 10.0.0 is required.")
   }
   var H = "undefined" != typeof io ? io : module.parent.exports,
       Ja = this,
       J = function(a) {
         a && (H.Transport.apply(this, arguments), this.sendBuffer = [])
       },
       X = function() {};
   ("undefined" != typeof io ? io.Transport : module.exports).XHR = J;H.util.inherit(J, H.Transport);J.prototype.open = function() {
      return this.socket.setBuffer(!1), this.onOpen(), this.get(), this.setCloseTimeout(), this
   };J.prototype.payload = function(a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) b.push(H.parser.encodePacket(a[c]));
      this.send(H.parser.encodePayload(b))
   };J.prototype.send = function(a) {
      return this.post(a), this
   };J.prototype.post = function(a) {
      function b() {
         4 == this.readyState && (this.onreadystatechange = X, d.posting = !1, 200 == this.status ? d.socket.setBuffer(!1) : d.onClose())
      }
      function c() {
         this.onload = X;
         d.socket.setBuffer(!1)
      }
      var d = this;
      this.socket.setBuffer(!0);
      this.sendXHR = this.request("POST");
      Ja.XDomainRequest && this.sendXHR instanceof XDomainRequest ? this.sendXHR.onload = this.sendXHR.onerror =
      c : this.sendXHR.onreadystatechange = b;
      this.sendXHR.send(a)
   };J.prototype.close = function() {
      return this.onClose(), this
   };J.prototype.request = function(a) {
      var b = H.util.request(this.socket.isXDomain()),
          c = H.util.query(this.socket.options.query, "t=" + +new Date);
      b.open(a || "GET", this.prepareUrl() + c, !0);
      if ("POST" == a) try {
         b.setRequestHeader ? b.setRequestHeader("Content-type", "text/plain;charset=UTF-8") : b.contentType = "text/plain"
      } catch (d) {}
      return b
   };J.prototype.scheme = function() {
      return this.socket.options.secure ? "https" : "http"
   };J.check = function(a, b) {
      try {
         var c = H.util.request(b),
             d = Ja.XDomainRequest && c instanceof XDomainRequest,
             e = a && a.options && a.options.secure ? "https:" : "http:",
             f = Ja.location && e != Ja.location.protocol;
         if (c && (!d || !f)) return !0
      } catch (h) {}
      return !1
   };J.xdomainCheck = function(a) {
      return J.check(a, !0)
   };
   var ca = "undefined" != typeof io ? io : module.parent.exports,
       z = function(a) {
         ca.Transport.XHR.apply(this, arguments)
       };
   ("undefined" != typeof io ? io.Transport : module.exports).htmlfile = z;ca.util.inherit(z, ca.Transport.XHR);z.prototype.name = "htmlfile";z.prototype.get = function() {
      this.doc = new(window[["Active"].concat("Object").join("X")])("htmlfile");
      this.doc.open();
      this.doc.write("<html></html>");
      this.doc.close();
      this.doc.parentWindow.s = this;
      var a = this.doc.createElement("div");
      a.className = "socketio";
      this.doc.body.appendChild(a);
      this.iframe = this.doc.createElement("iframe");
      a.appendChild(this.iframe);
      var b = this,
          a = ca.util.query(this.socket.options.query, "t=" + +new Date);
      this.iframe.src = this.prepareUrl() + a;
      ca.util.on(window, "unload", function() {
         b.destroy()
      })
   };
   z.prototype._ = function(a, b) {
      this.onData(a);
      try {
         var c = b.getElementsByTagName("script")[0];
         c.parentNode.removeChild(c)
      } catch (d) {}
   };z.prototype.destroy = function() {
      if (this.iframe) {
         try {
            this.iframe.src = "about:blank"
         } catch (a) {}
         this.doc = null;
         this.iframe.parentNode.removeChild(this.iframe);
         this.iframe = null;
         CollectGarbage()
      }
   };z.prototype.close = function() {
      return this.destroy(), ca.Transport.XHR.prototype.close.call(this)
   };z.check = function(a) {
      if ("undefined" != typeof window && ["Active"].concat("Object").join("X") in window) try {
         return new(window[["Active"].concat("Object").join("X")])("htmlfile") && ca.Transport.XHR.check(a)
      } catch (b) {}
      return !1
   };z.xdomainCheck = function() {
      return !1
   };ca.transports.push("htmlfile");
   var da = "undefined" != typeof io ? io : module.parent.exports,
       ma = this,
       z = function() {
         da.Transport.XHR.apply(this, arguments)
       },
       Ka = function() {};
   ("undefined" != typeof io ? io.Transport : module.exports)["xhr-polling"] = z;da.util.inherit(z, da.Transport.XHR);da.util.merge(z, da.Transport.XHR);z.prototype.name = "xhr-polling";z.prototype.heartbeats =

   function() {
      return !1
   };z.prototype.open = function() {
      return da.Transport.XHR.prototype.open.call(this), !1
   };z.prototype.get = function() {
      function a() {
         4 == this.readyState && (this.onreadystatechange = Ka, 200 == this.status ? (d.onData(this.responseText), d.get()) : d.onClose())
      }
      function b() {
         this.onerror = this.onload = Ka;
         d.retryCounter = 1;
         d.onData(this.responseText);
         d.get()
      }
      function c() {
         d.retryCounter++;
         !d.retryCounter || 3 < d.retryCounter ? d.onClose() : d.get()
      }
      if (this.isOpen) {
         var d = this;
         this.xhr = this.request();
         ma.XDomainRequest && this.xhr instanceof XDomainRequest ? (this.xhr.onload = b, this.xhr.onerror = c) : this.xhr.onreadystatechange = a;
         this.xhr.send(null)
      }
   };z.prototype.onClose = function() {
      da.Transport.XHR.prototype.onClose.call(this);
      if (this.xhr) {
         this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = Ka;
         try {
            this.xhr.abort()
         } catch (a) {}
         this.xhr = null
      }
   };z.prototype.ready = function(a, b) {
      var c = this;
      da.util.defer(function() {
         b.call(c)
      })
   };da.transports.push("xhr-polling");
   var V = "undefined" != typeof io ? io : module.parent.exports,
       ea = this,
       z = function(a) {
         V.Transport["xhr-polling"].apply(this, arguments);
         this.index = V.j.length;
         var b = this;
         V.j.push(function(a) {
            b._(a)
         })
       },
       Oa = ea.document && "MozAppearance" in ea.document.documentElement.style;
   ("undefined" != typeof io ? io.Transport : module.exports)["jsonp-polling"] = z;V.util.inherit(z, V.Transport["xhr-polling"]);z.prototype.name = "jsonp-polling";z.prototype.post = function(a) {
      function b() {
         c();
         d.socket.setBuffer(!1)
      }
      function c() {
         d.iframe && d.form.removeChild(d.iframe);
         try {
            k = document.createElement('<iframe name="' + d.iframeId + '">')
         } catch (a) {
            k = document.createElement("iframe"), k.name = d.iframeId
         }
         k.id = d.iframeId;
         d.form.appendChild(k);
         d.iframe = k
      }
      var d = this,
          e = V.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
      if (!this.form) {
         var f = document.createElement("form"),
             h = document.createElement("textarea"),
             j = this.iframeId = "socketio_iframe_" + this.index,
             k;
         f.className = "socketio";
         f.style.position = "absolute";
         f.style.top = "0px";
         f.style.left = "0px";
         f.style.display = "none";
         f.target = j;
         f.method = "POST";
         f.setAttribute("accept-charset", "utf-8");
         h.name = "d";
         f.appendChild(h);
         document.body.appendChild(f);
         this.form = f;
         this.area = h
      }
      this.form.action = this.prepareUrl() + e;
      c();
      this.area.value = V.JSON.stringify(a);
      try {
         this.form.submit()
      } catch (m) {}
      this.iframe.attachEvent ? k.onreadystatechange = function() {
         "complete" == d.iframe.readyState && b()
      } : this.iframe.onload = b;
      this.socket.setBuffer(!0)
   };z.prototype.get = function() {
      var a = this,
          b = document.createElement("script"),
          c = V.util.query(this.socket.options.query, "t=" + +new Date + "&i=" + this.index);
      this.script && (this.script.parentNode.removeChild(this.script), this.script = null);
      b.async = !0;
      b.src = this.prepareUrl() + c;
      b.onerror = function() {
         a.onClose()
      };
      c = document.getElementsByTagName("script")[0];
      c.parentNode.insertBefore(b, c);
      this.script = b;
      Oa && setTimeout(function() {
         var a = document.createElement("iframe");
         document.body.appendChild(a);
         document.body.removeChild(a)
      }, 100)
   };z.prototype._ = function(a) {
      return this.onData(a), this.isOpen && this.get(), this
   };z.prototype.ready = function(a, b) {
      var c = this;
      if (!Oa) return b.call(this);
      V.util.load(function() {
         b.call(c)
      })
   };z.check = function() {
      return "document" in ea
   };z.xdomainCheck = function() {
      return !0
   };V.transports.push("jsonp-polling");
   "function" == typeof define && define.amd && define([], function() {
      return io
   })
})();
(function() {
   function a() {
      this.callbacks = {}
   }
   function b(a) {
      var b = this,
          a = a || {};
      this.config = {
         url: "http://signaling.simplewebrtc.com:8888",
         log: !1,
         localVideoEl: "",
         remoteVideosEl: "",
         autoRequestMedia: !1,
         peerConnectionConfig: {
            iceServers: "firefox" == m ? [{
               url: "stun:124.124.124.2"
            }] : [{
               url: "stun:stun.l.google.com:19302"
            }]
         },
         peerConnectionContraints: {
            optional: [{
               DtlsSrtpKeyAgreement: !0
            }]
         },
         media: {
            audio: !0,
            video: {
               mandatory: {},
               optional: []
            }
         }
      };
      var e, f;
      for (e in a) this.config[e] = a[e];
      webRTCSupport || console.error("Your browser doesn't seem to support WebRTC");
      this.config.log && (c = console);
      this.pcs = {};
      var o = this;
      f = this.connection = io.connect(this.config.url);
      f.on("connect", function() {
         b.emit("ready", f.socket.sessionid);
         b.sessionReady = !0;
         b.testReadiness()
      });
      f.on("message", function(a) {
         var c = b.pcs[a.from];
         c ? c.handleMessage(a) : (b.pcs[a.from] = new d({
            id: a.from,
            parent: b,
            initiator: !1,
            name: a.from_name
         }), b.pcs[a.from].handleMessage(a))
      });
      f.on("joined", function(a, c, d, e) {
         b.pcs[c] || b.startVideoCall(c, d);
         o.emit("joined", d, e)
      });
      f.on("left", function(a) {
         if (a = b.pcs[a]) a.handleStreamRemoved(), o.emit("left", a.name)
      });
      this.callbacks = {};
      this.on("*", function(a, b, d) {
         c.log("event:", a, b, d)
      });
      window.user_media_stream ? (j(this.getLocalVideoContainer(), window.user_media_stream), this.localStream = window.user_media_stream, this.testReadiness()) : this.config.autoRequestMedia && this.startLocalVideo()
   }
   function d(a) {
      var b = this;
      this.id = a.id;
      this.name = a.name;
      this.parent = a.parent;
      this.initiator = a.initiator;
      this.pc = new e(this.parent.config.peerConnectionConfig, this.parent.config.peerConnectionContraints);
      this.pc.onicecandidate =
      this.onIceCandidate.bind(this);
      this.pc.addStream(this.parent.localStream);
      this.pc.onaddstream = this.handleRemoteStreamAdded.bind(this);
      this.pc.onremovestream = this.handleStreamRemoved.bind(this);
      this.mediaConstraints = {
         mandatory: {
            OfferToReceiveAudio: !0,
            OfferToReceiveVideo: !0
         }
      };
      this.callbacks = {};
      this.on("*", function(a, c) {
         b.parent.emit(a, c, b)
      })
   }
   var c = {
      log: function() {},
      warn: function() {},
      error: function() {}
   },
       e = null,
       f = null,
       j = null,
       m = null;
   webRTCSupport = !0;
   if (navigator.mozGetUserMedia) c.log("This appears to be Firefox"), m = "firefox", e = mozRTCPeerConnection, RTCSessionDescription = mozRTCSessionDescription, RTCIceCandidate = mozRTCIceCandidate, f = navigator.mozGetUserMedia.bind(navigator), j = function(a, b) {
      a.mozSrcObject = b;
      a.play()
   }, MediaStream.prototype.getVideoTracks = function() {
      return []
   }, MediaStream.prototype.getAudioTracks = function() {
      return []
   };
   else if (navigator.webkitGetUserMedia) {
      if (m = "chrome", e = webkitRTCPeerConnection, f = navigator.webkitGetUserMedia.bind(navigator), j = function(a, b) {
         a.autoplay = !0;
         a.src = webkitURL.createObjectURL(b)
      }, webkitMediaStream.prototype.getVideoTracks || (webkitMediaStream.prototype.getVideoTracks = function() {
         return this.videoTracks
      }, webkitMediaStream.prototype.getAudioTracks = function() {
         return this.audioTracks
      }), !webkitRTCPeerConnection.prototype.getLocalStreams) webkitRTCPeerConnection.prototype.getLocalStreams = function() {
         return this.localStreams
      }, webkitRTCPeerConnection.prototype.getRemoteStreams = function() {
         return this.remoteStreams
      }
   } else webRTCSupport = !1;
   window.webRTCSupport = webRTCSupport;
   a.prototype.on =

   function(a, b, c) {
      var d = 3 === arguments.length,
          e = d ? arguments[2] : arguments[1];
      e._groupName = d ? arguments[1] : void 0;
      (this.callbacks[a] = this.callbacks[a] || []).push(e);
      return this
   };
   a.prototype.once = function(a, b) {
      function c() {
         d.off(a, c);
         b.apply(this, arguments)
      }
      var d = this;
      this.on(a, c);
      return this
   };
   a.prototype.releaseGroup = function(a) {
      var b, c, d, e;
      for (b in this.callbacks) {
         e = this.callbacks[b];
         c = 0;
         for (d = e.length; c < d; c++) e[c]._groupName === a && (e.splice(c, 1), c--, d--)
      }
      return this
   };
   a.prototype.off = function(a, b) {
      var c =
      this.callbacks[a],
          d;
      if (!c) return this;
      if (1 === arguments.length) return delete this.callbacks[a], this;
      d = c.indexOf(b);
      c.splice(d, 1);
      return this
   };
   a.prototype.emit = function(a) {
      var b = [].slice.call(arguments, 1),
          c = this.callbacks[a],
          d = this.getWildcardCallbacks(a),
          e, f;
      if (c) {
         e = 0;
         for (f = c.length; e < f; ++e) c[e].apply(this, b)
      }
      if (d) {
         e = 0;
         for (f = d.length; e < f; ++e) d[e].apply(this, [a].concat(b))
      }
      return this
   };
   a.prototype.getWildcardCallbacks = function(a) {
      var b, c, d = [];
      for (b in this.callbacks) if (c = b.split("*"), "*" === b || 2 === c.length && a.slice(0, c[1].length) === c[1]) d = d.concat(this.callbacks[b]);
      return d
   };
   b.prototype = Object.create(a.prototype, {
      constructor: {
         value: b
      }
   });
   b.prototype.getEl = function(a) {
      return "string" == typeof a ? document.getElementById(a) : a
   };
   b.prototype.getLocalVideoContainer = function() {
      var a = this.getEl(this.config.localVideoEl);
      if (a && "VIDEO" === a.tagName) return a;
      var b = document.createElement("video");
      a.appendChild(b);
      return b
   };
   b.prototype.getRemoteVideoContainer = function() {
      return this.getEl(this.config.remoteVideosEl)
   };
   b.prototype.startVideoCall = function(a, b) {
      this.pcs[a] = new d({
         id: a,
         parent: this,
         initiator: !0,
         name: b
      });
      this.pcs[a].start()
   };
   b.prototype.createRoom = function(a, b) {
      2 === arguments.length ? this.connection.emit("create", a, b) : this.connection.emit("create", a)
   };
   b.prototype.joinRoom = function(a, b) {
      this.connection.emit("join", a, b);
      this.roomName = a
   };
   b.prototype.leaveRoom = function() {
      if (this.roomName) {
         this.connection.emit("leave", this.roomName);
         for (var a in this.pcs) this.pcs[a].end()
      }
   };
   b.prototype.testReadiness = function() {
      var a =
      this;
      this.localStream && this.sessionReady && setTimeout(function() {
         a.emit("readyToCall", a.connection.socket.sessionid)
      }, 500)
   };
   b.prototype.startLocalVideo = function(a) {
      var b = this;
      f(this.config.media, function(c) {
         window.user_media_stream = c;
         j(a || b.getLocalVideoContainer(), c);
         b.localStream = c;
         b.testReadiness()
      }, function(a) {
         b.emit("reject", a);
         throw Error("Failed to get access to local media.", a);
      })
   };
   b.prototype.send = function(a, b, c) {
      this.connection.emit("message", {
         to: a,
         type: b,
         payload: c
      })
   };
   b.prototype.changeName =

   function(a) {
      this.connection.emit("changeName", a)
   };
   d.prototype = Object.create(a.prototype, {
      constructor: {
         value: d
      }
   });
   d.prototype.handleMessage = function(a) {
      "offer" === a.type ? (c.log("setting remote description"), this.pc.setRemoteDescription(new RTCSessionDescription(a.payload)), this.answer()) : "answer" === a.type ? this.pc.setRemoteDescription(new RTCSessionDescription(a.payload)) : "candidate" === a.type && (a = new RTCIceCandidate({
         sdpMLineIndex: a.payload.label,
         candidate: a.payload.candidate
      }), this.pc.addIceCandidate(a))
   };
   d.prototype.send = function(a, b) {
      this.parent.send(this.id, a, b)
   };
   d.prototype.onIceCandidate = function(a) {
      this.closed || (a.candidate ? this.send("candidate", {
         label: a.candidate.sdpMLineIndex,
         id: a.candidate.sdpMid,
         candidate: a.candidate.candidate
      }) : c.log("End of candidates."))
   };
   d.prototype.start = function() {
      var a = this;
      this.pc.createOffer(function(b) {
         c.log("setting local description");
         a.pc.setLocalDescription(b);
         c.log("sending offer", b);
         a.send("offer", b)
      }, null, this.mediaConstraints)
   };
   d.prototype.end = function() {
      this.pc.close();
      this.handleStreamRemoved()
   };
   d.prototype.answer = function() {
      var a = this;
      c.log("answer called");
      this.pc.createAnswer(function(b) {
         c.log("setting local description");
         a.pc.setLocalDescription(b);
         c.log("sending answer", b);
         a.send("answer", b)
      }, null, this.mediaConstraints)
   };
   d.prototype.handleRemoteStreamAdded = function(a) {
      var b = this.name,
          a = this.stream = a.stream,
          b = $('<div class="vframe"><div class="vname NoSelect">' + b + "</div></div>"),
          c = document.createElement("video"),
          d = $("#remotesVideos");
      c.id = this.id;
      j(c, a);
      b.append(c);
      d && d.append(b);
      this.emit("videoAdded", c, this.name)
   };
   d.prototype.handleStreamRemoved = function() {
      var a = $("#" + this.id);
      a.parent().remove();
      this.emit("videoRemoved", a);
      delete this.parent.pcs[this.id];
      this.closed = !0
   };
   window.DragonVideo = b
})();
var g_dragonVideo, g_dragonVideo_on;

function DragonVideoButton(a, b) {
   if (g_dragonVideo_on) console.log("[DragonVideo] END"), g_dragonVideo_on = !1, g_dragonVideo.leaveRoom(), $("#DragonVideo").hide(), alertify.log("DragonBound VideoChat Exit - Bye! :)");
   else if (webRTCSupport) {
      console.log("[DragonVideo] START");
      var d = $("#VideoChannelInput").val();
      d || (d = b ? b : "" + random(1, 999999), $("#VideoChannelInput").val(d));
      console.log("[DragonVideo] room:", d, "user:", a);
      if (g_dragonVideo) $("#DragonVideo").show(), alertify.log("Joining VideoChat..."), g_dragonVideo.joinRoom(d, a);
      else {
         alertify.log("Welcome to DragonVideo - Please Allow Camera / Microphone (if doesn't work, reconnect your cam/mic and restart browser)");
         $("#localVideo").draggable({
            containment: "body",
            scroll: !1
         }).click(function() {
            $(this).toggleClass("bigVideo")
         });
         var c = new DragonVideo({
            localVideoEl: "localVideo",
            remoteVideosEl: "remotesVideos",
            autoRequestMedia: !0,
            url: "t.dragonbound.net" == location.host ? "t.dragonbound.net:9999" : "http://videoserver.dragonbound.net:9999"
         });
         c.on("videoAdded", function(a, b) {
            console.log("[DragonVideo] Video added:", a, b);
            $(a).parent().draggable({
               containment: "body",
               scroll: false
            }).click(function() {
               $(this).children().toggleClass("bigVideo")
            }).css({
               left: window.innerWidth / 2 + random(-200, 50),
               top: window.innerHeight / 2 + random(-200, 50)
            })
         });
         c.on("readyToCall", function(b) {
            console.log("[DragonVideo] readyToCall - my_id:", b);
            $("#DragonVideo").show();
            alertify.log("Cam/Mic Ready :)<br>Drag Video = Move, Click = Size");
            c.joinRoom(d, a)
         });
         c.on("joined", function(a) {
            console.log("[DragonVideo] joined:", a);
            alertify.log("Video User Joined: " + EscapeHTML(a))
         });
         c.on("left", function(a) {
            console.log("[DragonVideo] left:", a);
            alertify.log("Video User Left: " + EscapeHTML(a))
         });
         c.on("reject", function(a) {
            console.log("[DragonVideo] reject:", a);
            alertify.log("Can't get your cam/mic, please Allow")
         });
         g_dragonVideo = c
      }
      g_dragonVideo_on = !0
   } else alertify.alert("Your browser is not supported - Use latest Chrome/FireFox")
};