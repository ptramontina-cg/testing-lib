var ke = Object.defineProperty;
var Be = (x, e, t) => e in x ? ke(x, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : x[e] = t;
var q = (x, e, t) => Be(x, typeof e != "symbol" ? e + "" : e, t);
class $e {
  constructor(e) {
    this.file = e;
  }
  async validate() {
    return console.log(this.file), !0;
  }
}
class He {
  constructor(e) {
    this.url = e;
  }
  async validate() {
    return console.log(this.url), !0;
  }
}
var je = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ce(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x.default : x;
}
function Ue(x) {
  if (x.__esModule) return x;
  var e = x.default;
  if (typeof e == "function") {
    var t = function y() {
      return this instanceof y ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    t.prototype = e.prototype;
  } else t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(x).forEach(function(y) {
    var l = Object.getOwnPropertyDescriptor(x, y);
    Object.defineProperty(t, y, l.get ? l : {
      enumerable: !0,
      get: function() {
        return x[y];
      }
    });
  }), t;
}
const z = {}, We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: z
}, Symbol.toStringTag, { value: "Module" })), V = /* @__PURE__ */ Ue(We);
var B = { exports: {} }, $, de;
function Ge() {
  if (de) return $;
  de = 1, $ = y, y.sync = l;
  var x = V;
  function e(n, h) {
    var u = h.pathExt !== void 0 ? h.pathExt : process.env.PATHEXT;
    if (!u || (u = u.split(";"), u.indexOf("") !== -1))
      return !0;
    for (var i = 0; i < u.length; i++) {
      var c = u[i].toLowerCase();
      if (c && n.substr(-c.length).toLowerCase() === c)
        return !0;
    }
    return !1;
  }
  function t(n, h, u) {
    return !n.isSymbolicLink() && !n.isFile() ? !1 : e(h, u);
  }
  function y(n, h, u) {
    x.stat(n, function(i, c) {
      u(i, i ? !1 : t(c, n, h));
    });
  }
  function l(n, h) {
    return t(x.statSync(n), n, h);
  }
  return $;
}
var H, ve;
function Xe() {
  if (ve) return H;
  ve = 1, H = e, e.sync = t;
  var x = V;
  function e(n, h, u) {
    x.stat(n, function(i, c) {
      u(i, i ? !1 : y(c, h));
    });
  }
  function t(n, h) {
    return y(x.statSync(n), h);
  }
  function y(n, h) {
    return n.isFile() && l(n, h);
  }
  function l(n, h) {
    var u = n.mode, i = n.uid, c = n.gid, a = h.uid !== void 0 ? h.uid : process.getuid && process.getuid(), d = h.gid !== void 0 ? h.gid : process.getgid && process.getgid(), v = parseInt("100", 8), S = parseInt("010", 8), F = parseInt("001", 8), _ = v | S, m = u & F || u & S && c === d || u & v && i === a || u & _ && a === 0;
    return m;
  }
  return H;
}
var j, me;
function Qe() {
  if (me) return j;
  me = 1;
  var x;
  process.platform === "win32" || je.TESTING_WINDOWS ? x = Ge() : x = Xe(), j = e, e.sync = t;
  function e(y, l, n) {
    if (typeof l == "function" && (n = l, l = {}), !n) {
      if (typeof Promise != "function")
        throw new TypeError("callback not provided");
      return new Promise(function(h, u) {
        e(y, l || {}, function(i, c) {
          i ? u(i) : h(c);
        });
      });
    }
    x(y, l || {}, function(h, u) {
      h && (h.code === "EACCES" || l && l.ignoreErrors) && (h = null, u = !1), n(h, u);
    });
  }
  function t(y, l) {
    try {
      return x.sync(y, l || {});
    } catch (n) {
      if (l && l.ignoreErrors || n.code === "EACCES")
        return !1;
      throw n;
    }
  }
  return j;
}
var U, ge;
function Ze() {
  if (ge) return U;
  ge = 1, U = h, h.sync = u;
  var x = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", e = V, t = x ? ";" : ":", y = Qe();
  function l(i) {
    var c = new Error("not found: " + i);
    return c.code = "ENOENT", c;
  }
  function n(i, c) {
    var a = c.colon || t, d = c.path || process.env.PATH || "", v = [""];
    d = d.split(a);
    var S = "";
    return x && (d.unshift(process.cwd()), S = c.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM", v = S.split(a), i.indexOf(".") !== -1 && v[0] !== "" && v.unshift("")), (i.match(/\//) || x && i.match(/\\/)) && (d = [""]), {
      env: d,
      ext: v,
      extExe: S
    };
  }
  function h(i, c, a) {
    typeof c == "function" && (a = c, c = {});
    var d = n(i, c), v = d.env, S = d.ext, F = d.extExe, _ = [];
    (function m(b, I) {
      if (b === I)
        return c.all && _.length ? a(null, _) : a(l(i));
      var A = v[b];
      A.charAt(0) === '"' && A.slice(-1) === '"' && (A = A.slice(1, -1));
      var E = e.join(A, i);
      !A && /^\.[\\\/]/.test(i) && (E = i.slice(0, 2) + E), function g(r, s) {
        if (r === s) return m(b + 1, I);
        var o = S[r];
        y(E + o, { pathExt: F }, function(f, p) {
          if (!f && p)
            if (c.all)
              _.push(E + o);
            else
              return a(null, E + o);
          return g(r + 1, s);
        });
      }(0, S.length);
    })(0, v.length);
  }
  function u(i, c) {
    c = c || {};
    for (var a = n(i, c), d = a.env, v = a.ext, S = a.extExe, F = [], _ = 0, m = d.length; _ < m; _++) {
      var b = d[_];
      b.charAt(0) === '"' && b.slice(-1) === '"' && (b = b.slice(1, -1));
      var I = e.join(b, i);
      !b && /^\.[\\\/]/.test(i) && (I = i.slice(0, 2) + I);
      for (var A = 0, E = v.length; A < E; A++) {
        var g = I + v[A], r;
        try {
          if (r = y.sync(g, { pathExt: S }), r)
            if (c.all)
              F.push(g);
            else
              return g;
        } catch {
        }
      }
    }
    if (c.all && F.length)
      return F;
    if (c.nothrow)
      return null;
    throw l(i);
  }
  return U;
}
var we;
function R() {
  if (we) return B.exports;
  we = 1, V.exec;
  var x = V.platform().match(/win(32|64)/), e = Ze(), t = /\r\n|\r|\n/g, y = /^\[?(.*?)\]?$/, l = /[,]/, n = {};
  function h(i) {
    var c = {};
    i = i.replace(/=\s+/g, "=").trim();
    for (var a = i.split(" "), d = 0; d < a.length; d++) {
      var v = a[d].split("=", 2), S = v[0], F = v[1];
      if (typeof F > "u")
        return null;
      c[S] = F;
    }
    return c;
  }
  var u = B.exports = {
    isWindows: x,
    streamRegexp: y,
    /**
     * Copy an object keys into another one
     *
     * @param {Object} source source object
     * @param {Object} dest destination object
     * @private
     */
    copy: function(i, c) {
      Object.keys(i).forEach(function(a) {
        c[a] = i[a];
      });
    },
    /**
     * Create an argument list
     *
     * Returns a function that adds new arguments to the list.
     * It also has the following methods:
     * - clear() empties the argument list
     * - get() returns the argument list
     * - find(arg, count) finds 'arg' in the list and return the following 'count' items, or undefined if not found
     * - remove(arg, count) remove 'arg' in the list as well as the following 'count' items
     *
     * @private
     */
    args: function() {
      var i = [], c = function() {
        arguments.length === 1 && Array.isArray(arguments[0]) ? i = i.concat(arguments[0]) : i = i.concat([].slice.call(arguments));
      };
      return c.clear = function() {
        i = [];
      }, c.get = function() {
        return i;
      }, c.find = function(a, d) {
        var v = i.indexOf(a);
        if (v !== -1)
          return i.slice(v + 1, v + 1 + (d || 0));
      }, c.remove = function(a, d) {
        var v = i.indexOf(a);
        v !== -1 && i.splice(v, (d || 0) + 1);
      }, c.clone = function() {
        var a = u.args();
        return a(i), a;
      }, c;
    },
    /**
     * Generate filter strings
     *
     * @param {String[]|Object[]} filters filter specifications. When using objects,
     *   each must have the following properties:
     * @param {String} filters.filter filter name
     * @param {String|Array} [filters.inputs] (array of) input stream specifier(s) for the filter,
     *   defaults to ffmpeg automatically choosing the first unused matching streams
     * @param {String|Array} [filters.outputs] (array of) output stream specifier(s) for the filter,
     *   defaults to ffmpeg automatically assigning the output to the output file
     * @param {Object|String|Array} [filters.options] filter options, can be omitted to not set any options
     * @return String[]
     * @private
     */
    makeFilterStrings: function(i) {
      return i.map(function(c) {
        if (typeof c == "string")
          return c;
        var a = "";
        return Array.isArray(c.inputs) ? a += c.inputs.map(function(d) {
          return d.replace(y, "[$1]");
        }).join("") : typeof c.inputs == "string" && (a += c.inputs.replace(y, "[$1]")), a += c.filter, c.options && (typeof c.options == "string" || typeof c.options == "number" ? a += "=" + c.options : Array.isArray(c.options) ? a += "=" + c.options.map(function(d) {
          return typeof d == "string" && d.match(l) ? "'" + d + "'" : d;
        }).join(":") : Object.keys(c.options).length && (a += "=" + Object.keys(c.options).map(function(d) {
          var v = c.options[d];
          return typeof v == "string" && v.match(l) && (v = "'" + v + "'"), d + "=" + v;
        }).join(":"))), Array.isArray(c.outputs) ? a += c.outputs.map(function(d) {
          return d.replace(y, "[$1]");
        }).join("") : typeof c.outputs == "string" && (a += c.outputs.replace(y, "[$1]")), a;
      });
    },
    /**
     * Search for an executable
     *
     * Uses 'which' or 'where' depending on platform
     *
     * @param {String} name executable name
     * @param {Function} callback callback with signature (err, path)
     * @private
     */
    which: function(i, c) {
      if (i in n)
        return c(null, n[i]);
      e(i, function(a, d) {
        if (a)
          return c(null, n[i] = "");
        c(null, n[i] = d);
      });
    },
    /**
     * Convert a [[hh:]mm:]ss[.xxx] timemark into seconds
     *
     * @param {String} timemark timemark string
     * @return Number
     * @private
     */
    timemarkToSeconds: function(i) {
      if (typeof i == "number")
        return i;
      if (i.indexOf(":") === -1 && i.indexOf(".") >= 0)
        return Number(i);
      var c = i.split(":"), a = Number(c.pop());
      return c.length && (a += Number(c.pop()) * 60), c.length && (a += Number(c.pop()) * 3600), a;
    },
    /**
     * Extract codec data from ffmpeg stderr and emit 'codecData' event if appropriate
     * Call it with an initially empty codec object once with each line of stderr output until it returns true
     *
     * @param {FfmpegCommand} command event emitter
     * @param {String} stderrLine ffmpeg stderr output line
     * @param {Object} codecObject object used to accumulate codec data between calls
     * @return {Boolean} true if codec data is complete (and event was emitted), false otherwise
     * @private
     */
    extractCodecData: function(i, c, a) {
      var d = /Input #[0-9]+, ([^ ]+),/, v = /Duration\: ([^,]+)/, S = /Audio\: (.*)/, F = /Video\: (.*)/;
      "inputStack" in a || (a.inputStack = [], a.inputIndex = -1, a.inInput = !1);
      var _ = a.inputStack, m = a.inputIndex, b = a.inInput, I, A, E, g;
      if (I = c.match(d))
        b = a.inInput = !0, m = a.inputIndex = a.inputIndex + 1, _[m] = { format: I[1], audio: "", video: "", duration: "" };
      else if (b && (A = c.match(v)))
        _[m].duration = A[1];
      else if (b && (E = c.match(S)))
        E = E[1].split(", "), _[m].audio = E[0], _[m].audio_details = E;
      else if (b && (g = c.match(F)))
        g = g[1].split(", "), _[m].video = g[0], _[m].video_details = g;
      else if (/Output #\d+/.test(c))
        b = a.inInput = !1;
      else if (/Stream mapping:|Press (\[q\]|ctrl-c) to stop/.test(c))
        return i.emit.apply(i, ["codecData"].concat(_)), !0;
      return !1;
    },
    /**
     * Extract progress data from ffmpeg stderr and emit 'progress' event if appropriate
     *
     * @param {FfmpegCommand} command event emitter
     * @param {String} stderrLine ffmpeg stderr data
     * @private
     */
    extractProgress: function(i, c) {
      var a = h(c);
      if (a) {
        var d = {
          frames: parseInt(a.frame, 10),
          currentFps: parseInt(a.fps, 10),
          currentKbps: a.bitrate ? parseFloat(a.bitrate.replace("kbits/s", "")) : 0,
          targetSize: parseInt(a.size || a.Lsize, 10),
          timemark: a.time
        };
        if (i._ffprobeData && i._ffprobeData.format && i._ffprobeData.format.duration) {
          var v = Number(i._ffprobeData.format.duration);
          isNaN(v) || (d.percent = u.timemarkToSeconds(d.timemark) / v * 100);
        }
        i.emit("progress", d);
      }
    },
    /**
     * Extract error message(s) from ffmpeg stderr
     *
     * @param {String} stderr ffmpeg stderr data
     * @return {String}
     * @private
     */
    extractError: function(i) {
      return i.split(t).reduce(function(c, a) {
        return a.charAt(0) === " " || a.charAt(0) === "[" ? [] : (c.push(a), c);
      }, []).join(`
`);
    },
    /**
     * Creates a line ring buffer object with the following methods:
     * - append(str) : appends a string or buffer
     * - get() : returns the whole string
     * - close() : prevents further append() calls and does a last call to callbacks
     * - callback(cb) : calls cb for each line (incl. those already in the ring)
     *
     * @param {Number} maxLines maximum number of lines to store (<= 0 for unlimited)
     */
    linesRing: function(i) {
      var c = [], a = [], d = null, v = !1, S = i - 1;
      function F(_) {
        c.forEach(function(m) {
          m(_);
        });
      }
      return {
        callback: function(_) {
          a.forEach(function(m) {
            _(m);
          }), c.push(_);
        },
        append: function(_) {
          if (!v && (_ instanceof Buffer && (_ = "" + _), !(!_ || _.length === 0))) {
            var m = _.split(t);
            m.length === 1 ? d !== null ? d = d + m.shift() : d = m.shift() : (d !== null && (d = d + m.shift(), F(d), a.push(d)), d = m.pop(), m.forEach(function(b) {
              F(b), a.push(b);
            }), S > -1 && a.length > S && a.splice(0, a.length - S));
          }
        },
        get: function() {
          return d !== null ? a.concat([d]).join(`
`) : a.join(`
`);
        },
        close: function() {
          v || (d !== null && (F(d), a.push(d), S > -1 && a.length > S && a.shift(), d = null), v = !0);
        }
      };
    }
  };
  return B.exports;
}
var W, ye;
function Ye() {
  if (ye) return W;
  ye = 1;
  var x = R();
  return W = function(e) {
    e.mergeAdd = e.addInput = e.input = function(t) {
      var y = !1, l = !1;
      if (typeof t != "string") {
        if (!("readable" in t) || !t.readable)
          throw new Error("Invalid input");
        var n = this._inputs.some(function(u) {
          return u.isStream;
        });
        if (n)
          throw new Error("Only one input stream is supported");
        l = !0, t.pause();
      } else {
        var h = t.match(/^([a-z]{2,}):/i);
        y = !h || h[0] === "file";
      }
      return this._inputs.push(this._currentInput = {
        source: t,
        isFile: y,
        isStream: l,
        options: x.args()
      }), this;
    }, e.withInputFormat = e.inputFormat = e.fromFormat = function(t) {
      if (!this._currentInput)
        throw new Error("No input specified");
      return this._currentInput.options("-f", t), this;
    }, e.withInputFps = e.withInputFPS = e.withFpsInput = e.withFPSInput = e.inputFPS = e.inputFps = e.fpsInput = e.FPSInput = function(t) {
      if (!this._currentInput)
        throw new Error("No input specified");
      return this._currentInput.options("-r", t), this;
    }, e.nativeFramerate = e.withNativeFramerate = e.native = function() {
      if (!this._currentInput)
        throw new Error("No input specified");
      return this._currentInput.options("-re"), this;
    }, e.setStartTime = e.seekInput = function(t) {
      if (!this._currentInput)
        throw new Error("No input specified");
      return this._currentInput.options("-ss", t), this;
    }, e.loop = function(t) {
      if (!this._currentInput)
        throw new Error("No input specified");
      return this._currentInput.options("-loop", "1"), typeof t < "u" && this.duration(t), this;
    };
  }, W;
}
var G, _e;
function Je() {
  if (_e) return G;
  _e = 1;
  var x = R();
  return G = function(e) {
    e.withNoAudio = e.noAudio = function() {
      return this._currentOutput.audio.clear(), this._currentOutput.audioFilters.clear(), this._currentOutput.audio("-an"), this;
    }, e.withAudioCodec = e.audioCodec = function(t) {
      return this._currentOutput.audio("-acodec", t), this;
    }, e.withAudioBitrate = e.audioBitrate = function(t) {
      return this._currentOutput.audio("-b:a", ("" + t).replace(/k?$/, "k")), this;
    }, e.withAudioChannels = e.audioChannels = function(t) {
      return this._currentOutput.audio("-ac", t), this;
    }, e.withAudioFrequency = e.audioFrequency = function(t) {
      return this._currentOutput.audio("-ar", t), this;
    }, e.withAudioQuality = e.audioQuality = function(t) {
      return this._currentOutput.audio("-aq", t), this;
    }, e.withAudioFilter = e.withAudioFilters = e.audioFilter = e.audioFilters = function(t) {
      return arguments.length > 1 && (t = [].slice.call(arguments)), Array.isArray(t) || (t = [t]), this._currentOutput.audioFilters(x.makeFilterStrings(t)), this;
    };
  }, G;
}
var X, Ee;
function Ke() {
  if (Ee) return X;
  Ee = 1;
  var x = R();
  return X = function(e) {
    e.withNoVideo = e.noVideo = function() {
      return this._currentOutput.video.clear(), this._currentOutput.videoFilters.clear(), this._currentOutput.video("-vn"), this;
    }, e.withVideoCodec = e.videoCodec = function(t) {
      return this._currentOutput.video("-vcodec", t), this;
    }, e.withVideoBitrate = e.videoBitrate = function(t, y) {
      return t = ("" + t).replace(/k?$/, "k"), this._currentOutput.video("-b:v", t), y && this._currentOutput.video(
        "-maxrate",
        t,
        "-minrate",
        t,
        "-bufsize",
        "3M"
      ), this;
    }, e.withVideoFilter = e.withVideoFilters = e.videoFilter = e.videoFilters = function(t) {
      return arguments.length > 1 && (t = [].slice.call(arguments)), Array.isArray(t) || (t = [t]), this._currentOutput.videoFilters(x.makeFilterStrings(t)), this;
    }, e.withOutputFps = e.withOutputFPS = e.withFpsOutput = e.withFPSOutput = e.withFps = e.withFPS = e.outputFPS = e.outputFps = e.fpsOutput = e.FPSOutput = e.fps = e.FPS = function(t) {
      return this._currentOutput.video("-r", t), this;
    }, e.takeFrames = e.withFrames = e.frames = function(t) {
      return this._currentOutput.video("-vframes", t), this;
    };
  }, X;
}
var Q, Fe;
function et() {
  if (Fe) return Q;
  Fe = 1;
  function x(t, y, l, n) {
    return [
      /*
        In both cases, we first have to scale the input to match the requested size.
        When using computed width/height, we truncate them to multiples of 2
       */
      {
        filter: "scale",
        options: {
          w: "if(gt(a," + l + ")," + t + ",trunc(" + y + "*a/2)*2)",
          h: "if(lt(a," + l + ")," + y + ",trunc(" + t + "/a/2)*2)"
        }
      },
      /*
        Then we pad the scaled input to match the target size
        (here iw and ih refer to the padding input, i.e the scaled output)
       */
      {
        filter: "pad",
        options: {
          w: t,
          h: y,
          x: "if(gt(a," + l + "),0,(" + t + "-iw)/2)",
          y: "if(lt(a," + l + "),0,(" + y + "-ih)/2)",
          color: n
        }
      }
    ];
  }
  function e(t, y, l) {
    var n = t.sizeData = t.sizeData || {};
    if (n[y] = l, !("size" in n))
      return [];
    var h = n.size.match(/([0-9]+)x([0-9]+)/), u = n.size.match(/([0-9]+)x\?/), i = n.size.match(/\?x([0-9]+)/), c = n.size.match(/\b([0-9]{1,3})%/), a, d, v;
    if (c) {
      var S = Number(c[1]) / 100;
      return [{
        filter: "scale",
        options: {
          w: "trunc(iw*" + S + "/2)*2",
          h: "trunc(ih*" + S + "/2)*2"
        }
      }];
    } else {
      if (h)
        return a = Math.round(Number(h[1]) / 2) * 2, d = Math.round(Number(h[2]) / 2) * 2, v = a / d, n.pad ? x(a, d, v, n.pad) : [{ filter: "scale", options: { w: a, h: d } }];
      if (u || i)
        return "aspect" in n ? (a = u ? u[1] : Math.round(Number(i[1]) * n.aspect), d = i ? i[1] : Math.round(Number(u[1]) / n.aspect), a = Math.round(a / 2) * 2, d = Math.round(d / 2) * 2, n.pad ? x(a, d, n.aspect, n.pad) : [{ filter: "scale", options: { w: a, h: d } }]) : u ? [{
          filter: "scale",
          options: {
            w: Math.round(Number(u[1]) / 2) * 2,
            h: "trunc(ow/a/2)*2"
          }
        }] : [{
          filter: "scale",
          options: {
            w: "trunc(oh*a/2)*2",
            h: Math.round(Number(i[1]) / 2) * 2
          }
        }];
      throw new Error("Invalid size specified: " + n.size);
    }
  }
  return Q = function(t) {
    t.keepPixelAspect = // Only for compatibility, this is not about keeping _pixel_ aspect ratio
    t.keepDisplayAspect = t.keepDisplayAspectRatio = t.keepDAR = function() {
      return this.videoFilters([
        {
          filter: "scale",
          options: {
            w: "if(gt(sar,1),iw*sar,iw)",
            h: "if(lt(sar,1),ih/sar,ih)"
          }
        },
        {
          filter: "setsar",
          options: "1"
        }
      ]);
    }, t.withSize = t.setSize = t.size = function(y) {
      var l = e(this._currentOutput, "size", y);
      return this._currentOutput.sizeFilters.clear(), this._currentOutput.sizeFilters(l), this;
    }, t.withAspect = t.withAspectRatio = t.setAspect = t.setAspectRatio = t.aspect = t.aspectRatio = function(y) {
      var l = Number(y);
      if (isNaN(l)) {
        var n = y.match(/^(\d+):(\d+)$/);
        if (n)
          l = Number(n[1]) / Number(n[2]);
        else
          throw new Error("Invalid aspect ratio: " + y);
      }
      var h = e(this._currentOutput, "aspect", l);
      return this._currentOutput.sizeFilters.clear(), this._currentOutput.sizeFilters(h), this;
    }, t.applyAutopadding = t.applyAutoPadding = t.applyAutopad = t.applyAutoPad = t.withAutopadding = t.withAutoPadding = t.withAutopad = t.withAutoPad = t.autoPad = t.autopad = function(y, l) {
      typeof y == "string" && (l = y, y = !0), typeof y > "u" && (y = !0);
      var n = e(this._currentOutput, "pad", y ? l || "black" : !1);
      return this._currentOutput.sizeFilters.clear(), this._currentOutput.sizeFilters(n), this;
    };
  }, Q;
}
var Z, Ae;
function tt() {
  if (Ae) return Z;
  Ae = 1;
  var x = R();
  return Z = function(e) {
    e.addOutput = e.output = function(t, y) {
      var l = !1;
      if (!t && this._currentOutput)
        throw new Error("Invalid output");
      if (t && typeof t != "string") {
        if (!("writable" in t) || !t.writable)
          throw new Error("Invalid output");
      } else if (typeof t == "string") {
        var n = t.match(/^([a-z]{2,}):/i);
        l = !n || n[0] === "file";
      }
      if (t && !("target" in this._currentOutput))
        this._currentOutput.target = t, this._currentOutput.isFile = l, this._currentOutput.pipeopts = y || {};
      else {
        if (t && typeof t != "string") {
          var h = this._outputs.some(function(i) {
            return typeof i.target != "string";
          });
          if (h)
            throw new Error("Only one output stream is supported");
        }
        this._outputs.push(this._currentOutput = {
          target: t,
          isFile: l,
          flags: {},
          pipeopts: y || {}
        });
        var u = this;
        ["audio", "audioFilters", "video", "videoFilters", "sizeFilters", "options"].forEach(function(i) {
          u._currentOutput[i] = x.args();
        }), t || delete this._currentOutput.target;
      }
      return this;
    }, e.seekOutput = e.seek = function(t) {
      return this._currentOutput.options("-ss", t), this;
    }, e.withDuration = e.setDuration = e.duration = function(t) {
      return this._currentOutput.options("-t", t), this;
    }, e.toFormat = e.withOutputFormat = e.outputFormat = e.format = function(t) {
      return this._currentOutput.options("-f", t), this;
    }, e.map = function(t) {
      return this._currentOutput.options("-map", t.replace(x.streamRegexp, "[$1]")), this;
    }, e.updateFlvMetadata = e.flvmeta = function() {
      return this._currentOutput.flags.flvmeta = !0, this;
    };
  }, Z;
}
var Y, xe;
function nt() {
  if (xe) return Y;
  xe = 1;
  var x = R();
  return Y = function(e) {
    e.addInputOption = e.addInputOptions = e.withInputOption = e.withInputOptions = e.inputOption = e.inputOptions = function(t) {
      if (!this._currentInput)
        throw new Error("No input specified");
      var y = !0;
      return arguments.length > 1 && (t = [].slice.call(arguments), y = !1), Array.isArray(t) || (t = [t]), this._currentInput.options(t.reduce(function(l, n) {
        var h = String(n).split(" ");
        return y && h.length === 2 ? l.push(h[0], h[1]) : l.push(n), l;
      }, [])), this;
    }, e.addOutputOption = e.addOutputOptions = e.addOption = e.addOptions = e.withOutputOption = e.withOutputOptions = e.withOption = e.withOptions = e.outputOption = e.outputOptions = function(t) {
      var y = !0;
      return arguments.length > 1 && (t = [].slice.call(arguments), y = !1), Array.isArray(t) || (t = [t]), this._currentOutput.options(t.reduce(function(l, n) {
        var h = String(n).split(" ");
        return y && h.length === 2 ? l.push(h[0], h[1]) : l.push(n), l;
      }, [])), this;
    }, e.filterGraph = e.complexFilter = function(t, y) {
      if (this._complexFilters.clear(), Array.isArray(t) || (t = [t]), this._complexFilters("-filter_complex", x.makeFilterStrings(t).join(";")), Array.isArray(y)) {
        var l = this;
        y.forEach(function(n) {
          l._complexFilters("-map", n.replace(x.streamRegexp, "[$1]"));
        });
      } else typeof y == "string" && this._complexFilters("-map", y.replace(x.streamRegexp, "[$1]"));
      return this;
    };
  }, Y;
}
function rt(x) {
  throw new Error('Could not dynamically require "' + x + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var J, Ie;
function it() {
  if (Ie) return J;
  Ie = 1;
  var x = V;
  return J = function(e) {
    e.usingPreset = e.preset = function(t) {
      if (typeof t == "function")
        t(this);
      else
        try {
          var y = x.join(this.options.presets, t), l = rt(y);
          if (typeof l.load == "function")
            l.load(this);
          else
            throw new Error("preset " + y + " has no load() function");
        } catch (n) {
          throw new Error("preset " + y + " could not be loaded: " + n.message);
        }
      return this;
    };
  }, J;
}
var K = { exports: {} }, Oe;
function fe() {
  return Oe || (Oe = 1, function(x) {
    (function() {
      var e = {}, t, y;
      t = this, t != null && (y = t.async), e.noConflict = function() {
        return t.async = y, e;
      };
      function l(r) {
        var s = !1;
        return function() {
          if (s) throw new Error("Callback was already called.");
          s = !0, r.apply(t, arguments);
        };
      }
      var n = function(r, s) {
        if (r.forEach)
          return r.forEach(s);
        for (var o = 0; o < r.length; o += 1)
          s(r[o], o, r);
      }, h = function(r, s) {
        if (r.map)
          return r.map(s);
        var o = [];
        return n(r, function(f, p, w) {
          o.push(s(f, p, w));
        }), o;
      }, u = function(r, s, o) {
        return r.reduce ? r.reduce(s, o) : (n(r, function(f, p, w) {
          o = s(o, f, p, w);
        }), o);
      }, i = function(r) {
        if (Object.keys)
          return Object.keys(r);
        var s = [];
        for (var o in r)
          r.hasOwnProperty(o) && s.push(o);
        return s;
      };
      typeof process > "u" || !process.nextTick ? typeof setImmediate == "function" ? (e.nextTick = function(r) {
        setImmediate(r);
      }, e.setImmediate = e.nextTick) : (e.nextTick = function(r) {
        setTimeout(r, 0);
      }, e.setImmediate = e.nextTick) : (e.nextTick = process.nextTick, typeof setImmediate < "u" ? e.setImmediate = function(r) {
        setImmediate(r);
      } : e.setImmediate = e.nextTick), e.each = function(r, s, o) {
        if (o = o || function() {
        }, !r.length)
          return o();
        var f = 0;
        n(r, function(p) {
          s(p, l(function(w) {
            w ? (o(w), o = function() {
            }) : (f += 1, f >= r.length && o(null));
          }));
        });
      }, e.forEach = e.each, e.eachSeries = function(r, s, o) {
        if (o = o || function() {
        }, !r.length)
          return o();
        var f = 0, p = function() {
          s(r[f], function(w) {
            w ? (o(w), o = function() {
            }) : (f += 1, f >= r.length ? o(null) : p());
          });
        };
        p();
      }, e.forEachSeries = e.eachSeries, e.eachLimit = function(r, s, o, f) {
        var p = c(s);
        p.apply(null, [r, o, f]);
      }, e.forEachLimit = e.eachLimit;
      var c = function(r) {
        return function(s, o, f) {
          if (f = f || function() {
          }, !s.length || r <= 0)
            return f();
          var p = 0, w = 0, O = 0;
          (function P() {
            if (p >= s.length)
              return f();
            for (; O < r && w < s.length; )
              w += 1, O += 1, o(s[w - 1], function(T) {
                T ? (f(T), f = function() {
                }) : (p += 1, O -= 1, p >= s.length ? f() : P());
              });
          })();
        };
      }, a = function(r) {
        return function() {
          var s = Array.prototype.slice.call(arguments);
          return r.apply(null, [e.each].concat(s));
        };
      }, d = function(r, s) {
        return function() {
          var o = Array.prototype.slice.call(arguments);
          return s.apply(null, [c(r)].concat(o));
        };
      }, v = function(r) {
        return function() {
          var s = Array.prototype.slice.call(arguments);
          return r.apply(null, [e.eachSeries].concat(s));
        };
      }, S = function(r, s, o, f) {
        var p = [];
        s = h(s, function(w, O) {
          return { index: O, value: w };
        }), r(s, function(w, O) {
          o(w.value, function(P, T) {
            p[w.index] = T, O(P);
          });
        }, function(w) {
          f(w, p);
        });
      };
      e.map = a(S), e.mapSeries = v(S), e.mapLimit = function(r, s, o, f) {
        return F(s)(r, o, f);
      };
      var F = function(r) {
        return d(r, S);
      };
      e.reduce = function(r, s, o, f) {
        e.eachSeries(r, function(p, w) {
          o(s, p, function(O, P) {
            s = P, w(O);
          });
        }, function(p) {
          f(p, s);
        });
      }, e.inject = e.reduce, e.foldl = e.reduce, e.reduceRight = function(r, s, o, f) {
        var p = h(r, function(w) {
          return w;
        }).reverse();
        e.reduce(p, s, o, f);
      }, e.foldr = e.reduceRight;
      var _ = function(r, s, o, f) {
        var p = [];
        s = h(s, function(w, O) {
          return { index: O, value: w };
        }), r(s, function(w, O) {
          o(w.value, function(P) {
            P && p.push(w), O();
          });
        }, function(w) {
          f(h(p.sort(function(O, P) {
            return O.index - P.index;
          }), function(O) {
            return O.value;
          }));
        });
      };
      e.filter = a(_), e.filterSeries = v(_), e.select = e.filter, e.selectSeries = e.filterSeries;
      var m = function(r, s, o, f) {
        var p = [];
        s = h(s, function(w, O) {
          return { index: O, value: w };
        }), r(s, function(w, O) {
          o(w.value, function(P) {
            P || p.push(w), O();
          });
        }, function(w) {
          f(h(p.sort(function(O, P) {
            return O.index - P.index;
          }), function(O) {
            return O.value;
          }));
        });
      };
      e.reject = a(m), e.rejectSeries = v(m);
      var b = function(r, s, o, f) {
        r(s, function(p, w) {
          o(p, function(O) {
            O ? (f(p), f = function() {
            }) : w();
          });
        }, function(p) {
          f();
        });
      };
      e.detect = a(b), e.detectSeries = v(b), e.some = function(r, s, o) {
        e.each(r, function(f, p) {
          s(f, function(w) {
            w && (o(!0), o = function() {
            }), p();
          });
        }, function(f) {
          o(!1);
        });
      }, e.any = e.some, e.every = function(r, s, o) {
        e.each(r, function(f, p) {
          s(f, function(w) {
            w || (o(!1), o = function() {
            }), p();
          });
        }, function(f) {
          o(!0);
        });
      }, e.all = e.every, e.sortBy = function(r, s, o) {
        e.map(r, function(f, p) {
          s(f, function(w, O) {
            w ? p(w) : p(null, { value: f, criteria: O });
          });
        }, function(f, p) {
          if (f)
            return o(f);
          var w = function(O, P) {
            var T = O.criteria, N = P.criteria;
            return T < N ? -1 : T > N ? 1 : 0;
          };
          o(null, h(p.sort(w), function(O) {
            return O.value;
          }));
        });
      }, e.auto = function(r, s) {
        s = s || function() {
        };
        var o = i(r);
        if (!o.length)
          return s(null);
        var f = {}, p = [], w = function(T) {
          p.unshift(T);
        }, O = function(T) {
          for (var N = 0; N < p.length; N += 1)
            if (p[N] === T) {
              p.splice(N, 1);
              return;
            }
        }, P = function() {
          n(p.slice(0), function(T) {
            T();
          });
        };
        w(function() {
          i(f).length === o.length && (s(null, f), s = function() {
          });
        }), n(o, function(T) {
          var N = r[T] instanceof Function ? [r[T]] : r[T], M = function(D) {
            var L = Array.prototype.slice.call(arguments, 1);
            if (L.length <= 1 && (L = L[0]), D) {
              var k = {};
              n(i(f), function(pe) {
                k[pe] = f[pe];
              }), k[T] = L, s(D, k), s = function() {
              };
            } else
              f[T] = L, e.setImmediate(P);
          }, De = N.slice(0, Math.abs(N.length - 1)) || [], ce = function() {
            return u(De, function(D, L) {
              return D && f.hasOwnProperty(L);
            }, !0) && !f.hasOwnProperty(T);
          };
          if (ce())
            N[N.length - 1](M, f);
          else {
            var he = function() {
              ce() && (O(he), N[N.length - 1](M, f));
            };
            w(he);
          }
        });
      }, e.waterfall = function(r, s) {
        if (s = s || function() {
        }, r.constructor !== Array) {
          var o = new Error("First argument to waterfall must be an array of functions");
          return s(o);
        }
        if (!r.length)
          return s();
        var f = function(p) {
          return function(w) {
            if (w)
              s.apply(null, arguments), s = function() {
              };
            else {
              var O = Array.prototype.slice.call(arguments, 1), P = p.next();
              P ? O.push(f(P)) : O.push(s), e.setImmediate(function() {
                p.apply(null, O);
              });
            }
          };
        };
        f(e.iterator(r))();
      };
      var I = function(r, s, o) {
        if (o = o || function() {
        }, s.constructor === Array)
          r.map(s, function(p, w) {
            p && p(function(O) {
              var P = Array.prototype.slice.call(arguments, 1);
              P.length <= 1 && (P = P[0]), w.call(null, O, P);
            });
          }, o);
        else {
          var f = {};
          r.each(i(s), function(p, w) {
            s[p](function(O) {
              var P = Array.prototype.slice.call(arguments, 1);
              P.length <= 1 && (P = P[0]), f[p] = P, w(O);
            });
          }, function(p) {
            o(p, f);
          });
        }
      };
      e.parallel = function(r, s) {
        I({ map: e.map, each: e.each }, r, s);
      }, e.parallelLimit = function(r, s, o) {
        I({ map: F(s), each: c(s) }, r, o);
      }, e.series = function(r, s) {
        if (s = s || function() {
        }, r.constructor === Array)
          e.mapSeries(r, function(f, p) {
            f && f(function(w) {
              var O = Array.prototype.slice.call(arguments, 1);
              O.length <= 1 && (O = O[0]), p.call(null, w, O);
            });
          }, s);
        else {
          var o = {};
          e.eachSeries(i(r), function(f, p) {
            r[f](function(w) {
              var O = Array.prototype.slice.call(arguments, 1);
              O.length <= 1 && (O = O[0]), o[f] = O, p(w);
            });
          }, function(f) {
            s(f, o);
          });
        }
      }, e.iterator = function(r) {
        var s = function(o) {
          var f = function() {
            return r.length && r[o].apply(null, arguments), f.next();
          };
          return f.next = function() {
            return o < r.length - 1 ? s(o + 1) : null;
          }, f;
        };
        return s(0);
      }, e.apply = function(r) {
        var s = Array.prototype.slice.call(arguments, 1);
        return function() {
          return r.apply(
            null,
            s.concat(Array.prototype.slice.call(arguments))
          );
        };
      };
      var A = function(r, s, o, f) {
        var p = [];
        r(s, function(w, O) {
          o(w, function(P, T) {
            p = p.concat(T || []), O(P);
          });
        }, function(w) {
          f(w, p);
        });
      };
      e.concat = a(A), e.concatSeries = v(A), e.whilst = function(r, s, o) {
        r() ? s(function(f) {
          if (f)
            return o(f);
          e.whilst(r, s, o);
        }) : o();
      }, e.doWhilst = function(r, s, o) {
        r(function(f) {
          if (f)
            return o(f);
          s() ? e.doWhilst(r, s, o) : o();
        });
      }, e.until = function(r, s, o) {
        r() ? o() : s(function(f) {
          if (f)
            return o(f);
          e.until(r, s, o);
        });
      }, e.doUntil = function(r, s, o) {
        r(function(f) {
          if (f)
            return o(f);
          s() ? o() : e.doUntil(r, s, o);
        });
      }, e.queue = function(r, s) {
        s === void 0 && (s = 1);
        function o(w, O, P, T) {
          O.constructor !== Array && (O = [O]), n(O, function(N) {
            var M = {
              data: N,
              callback: typeof T == "function" ? T : null
            };
            P ? w.tasks.unshift(M) : w.tasks.push(M), w.saturated && w.tasks.length === s && w.saturated(), e.setImmediate(w.process);
          });
        }
        var f = 0, p = {
          tasks: [],
          concurrency: s,
          saturated: null,
          empty: null,
          drain: null,
          push: function(w, O) {
            o(p, w, !1, O);
          },
          unshift: function(w, O) {
            o(p, w, !0, O);
          },
          process: function() {
            if (f < p.concurrency && p.tasks.length) {
              var w = p.tasks.shift();
              p.empty && p.tasks.length === 0 && p.empty(), f += 1;
              var O = function() {
                f -= 1, w.callback && w.callback.apply(w, arguments), p.drain && p.tasks.length + f === 0 && p.drain(), p.process();
              }, P = l(O);
              r(w.data, P);
            }
          },
          length: function() {
            return p.tasks.length;
          },
          running: function() {
            return f;
          }
        };
        return p;
      }, e.cargo = function(r, s) {
        var o = !1, f = [], p = {
          tasks: f,
          payload: s,
          saturated: null,
          empty: null,
          drain: null,
          push: function(w, O) {
            w.constructor !== Array && (w = [w]), n(w, function(P) {
              f.push({
                data: P,
                callback: typeof O == "function" ? O : null
              }), p.saturated && f.length === s && p.saturated();
            }), e.setImmediate(p.process);
          },
          process: function w() {
            if (!o) {
              if (f.length === 0) {
                p.drain && p.drain();
                return;
              }
              var O = typeof s == "number" ? f.splice(0, s) : f.splice(0), P = h(O, function(T) {
                return T.data;
              });
              p.empty && p.empty(), o = !0, r(P, function() {
                o = !1;
                var T = arguments;
                n(O, function(N) {
                  N.callback && N.callback.apply(null, T);
                }), w();
              });
            }
          },
          length: function() {
            return f.length;
          },
          running: function() {
            return o;
          }
        };
        return p;
      };
      var E = function(r) {
        return function(s) {
          var o = Array.prototype.slice.call(arguments, 1);
          s.apply(null, o.concat([function(f) {
            var p = Array.prototype.slice.call(arguments, 1);
            typeof console < "u" && (f ? console.error && console.error(f) : console[r] && n(p, function(w) {
              console[r](w);
            }));
          }]));
        };
      };
      e.log = E("log"), e.dir = E("dir"), e.memoize = function(r, s) {
        var o = {}, f = {};
        s = s || function(w) {
          return w;
        };
        var p = function() {
          var w = Array.prototype.slice.call(arguments), O = w.pop(), P = s.apply(null, w);
          P in o ? O.apply(null, o[P]) : P in f ? f[P].push(O) : (f[P] = [O], r.apply(null, w.concat([function() {
            o[P] = arguments;
            var T = f[P];
            delete f[P];
            for (var N = 0, M = T.length; N < M; N++)
              T[N].apply(null, arguments);
          }])));
        };
        return p.memo = o, p.unmemoized = r, p;
      }, e.unmemoize = function(r) {
        return function() {
          return (r.unmemoized || r).apply(null, arguments);
        };
      }, e.times = function(r, s, o) {
        for (var f = [], p = 0; p < r; p++)
          f.push(p);
        return e.map(f, s, o);
      }, e.timesSeries = function(r, s, o) {
        for (var f = [], p = 0; p < r; p++)
          f.push(p);
        return e.mapSeries(f, s, o);
      }, e.compose = function() {
        var r = Array.prototype.reverse.call(arguments);
        return function() {
          var s = this, o = Array.prototype.slice.call(arguments), f = o.pop();
          e.reduce(
            r,
            o,
            function(p, w, O) {
              w.apply(s, p.concat([function() {
                var P = arguments[0], T = Array.prototype.slice.call(arguments, 1);
                O(P, T);
              }]));
            },
            function(p, w) {
              f.apply(s, [p].concat(w));
            }
          );
        };
      };
      var g = function(r, s) {
        var o = function() {
          var p = this, w = Array.prototype.slice.call(arguments), O = w.pop();
          return r(
            s,
            function(P, T) {
              P.apply(p, w.concat([T]));
            },
            O
          );
        };
        if (arguments.length > 2) {
          var f = Array.prototype.slice.call(arguments, 2);
          return o.apply(this, f);
        } else
          return o;
      };
      e.applyEach = a(g), e.applyEachSeries = v(g), e.forever = function(r, s) {
        function o(f) {
          if (f) {
            if (s)
              return s(f);
            throw f;
          }
          r(o);
        }
        o();
      }, x.exports ? x.exports = e : t.async = e;
    })();
  }(K)), K.exports;
}
var ee, be;
function ut() {
  if (be) return ee;
  be = 1;
  var x = V.spawn, e = fe(), t = R();
  function y(l) {
    l._inputs[0].isStream || l.ffprobe(0, function(h, u) {
      l._ffprobeData = u;
    });
  }
  return ee = function(l) {
    l._spawnFfmpeg = function(n, h, u, i) {
      typeof h == "function" && (i = u, u = h, h = {}), typeof i > "u" && (i = u, u = function() {
      });
      var c = "stdoutLines" in h ? h.stdoutLines : this.options.stdoutLines;
      this._getFfmpegPath(function(a, d) {
        if (a)
          return i(a);
        if (!d || d.length === 0)
          return i(new Error("Cannot find ffmpeg"));
        h.niceness && h.niceness !== 0 && !t.isWindows && (n.unshift("-n", h.niceness, d), d = "nice");
        var v = t.linesRing(c), S = !1, F = t.linesRing(c), _ = !1, m = x(d, n, h);
        m.stderr && m.stderr.setEncoding("utf8"), m.on("error", function(E) {
          i(E);
        });
        var b = null;
        function I(E) {
          E && (b = E), A && (S || !h.captureStdout) && _ && i(b, v, F);
        }
        var A = !1;
        m.on("exit", function(E, g) {
          A = !0, g ? I(new Error("ffmpeg was killed with signal " + g)) : E ? I(new Error("ffmpeg exited with code " + E)) : I();
        }), h.captureStdout && (m.stdout.on("data", function(E) {
          v.append(E);
        }), m.stdout.on("close", function() {
          v.close(), S = !0, I();
        })), m.stderr.on("data", function(E) {
          F.append(E);
        }), m.stderr.on("close", function() {
          F.close(), _ = !0, I();
        }), u(m, v, F);
      });
    }, l._getArguments = function() {
      var n = this._complexFilters.get(), h = this._outputs.some(function(u) {
        return u.isFile;
      });
      return [].concat(
        // Inputs and input options
        this._inputs.reduce(function(u, i) {
          var c = typeof i.source == "string" ? i.source : "pipe:0";
          return u.concat(
            i.options.get(),
            ["-i", c]
          );
        }, []),
        // Global options
        this._global.get(),
        // Overwrite if we have file outputs
        h ? ["-y"] : [],
        // Complex filters
        n,
        // Outputs, filters and output options
        this._outputs.reduce(function(u, i) {
          var c = t.makeFilterStrings(i.sizeFilters.get()), a = i.audioFilters.get(), d = i.videoFilters.get().concat(c), v;
          return i.target ? typeof i.target == "string" ? v = [i.target] : v = ["pipe:1"] : v = [], u.concat(
            i.audio.get(),
            a.length ? ["-filter:a", a.join(",")] : [],
            i.video.get(),
            d.length ? ["-filter:v", d.join(",")] : [],
            i.options.get(),
            v
          );
        }, [])
      );
    }, l._prepare = function(n, h) {
      var u = this;
      e.waterfall([
        // Check codecs and formats
        function(i) {
          u._checkCapabilities(i);
        },
        // Read metadata if required
        function(i) {
          if (!h)
            return i();
          u.ffprobe(0, function(c, a) {
            c || (u._ffprobeData = a), i();
          });
        },
        // Check for flvtool2/flvmeta if necessary
        function(i) {
          var c = u._outputs.some(function(a) {
            return a.flags.flvmeta && !a.isFile && (u.logger.warn("Updating flv metadata is only supported for files"), a.flags.flvmeta = !1), a.flags.flvmeta;
          });
          c ? u._getFlvtoolPath(function(a) {
            i(a);
          }) : i();
        },
        // Build argument list
        function(i) {
          var c;
          try {
            c = u._getArguments();
          } catch (a) {
            return i(a);
          }
          i(null, c);
        },
        // Add "-strict experimental" option where needed
        function(i, c) {
          u.availableEncoders(function(a, d) {
            for (var v = 0; v < i.length; v++)
              (i[v] === "-acodec" || i[v] === "-vcodec") && (v++, i[v] in d && d[i[v]].experimental && (i.splice(v + 1, 0, "-strict", "experimental"), v += 2));
            c(null, i);
          });
        }
      ], n), h || (this.listeners("progress").length > 0 ? y(this) : this.once("newListener", function(i) {
        i === "progress" && y(this);
      }));
    }, l.exec = l.execute = l.run = function() {
      var n = this, h = this._outputs.some(function(d) {
        return "target" in d;
      });
      if (!h)
        throw new Error("No output specified");
      var u = this._outputs.filter(function(d) {
        return typeof d.target != "string";
      })[0], i = this._inputs.filter(function(d) {
        return typeof d.source != "string";
      })[0], c = !1;
      function a(d, v, S) {
        c || (c = !0, d ? n.emit("error", d, v, S) : n.emit("end", v, S));
      }
      return n._prepare(function(d, v) {
        if (d)
          return a(d);
        n._spawnFfmpeg(
          v,
          {
            captureStdout: !u,
            niceness: n.options.niceness,
            cwd: n.options.cwd,
            windowsHide: !0
          },
          function(F, _, m) {
            if (n.ffmpegProc = F, n.emit("start", "ffmpeg " + v.join(" ")), i && (i.source.on("error", function(A) {
              var E = new Error("Input stream error: " + A.message);
              E.inputStreamError = A, a(E), F.kill();
            }), i.source.resume(), i.source.pipe(F.stdin), F.stdin.on("error", function() {
            })), n.options.timeout && (n.processTimer = setTimeout(function() {
              var A = "process ran into a timeout (" + n.options.timeout + "s)";
              a(new Error(A), _.get(), m.get()), F.kill();
            }, n.options.timeout * 1e3)), u && (F.stdout.pipe(u.target, u.pipeopts), u.target.on("close", function() {
              n.logger.debug("Output stream closed, scheduling kill for ffmpeg process"), setTimeout(function() {
                a(new Error("Output stream closed")), F.kill();
              }, 20);
            }), u.target.on("error", function(A) {
              n.logger.debug("Output stream error, killing ffmpeg process");
              var E = new Error("Output stream error: " + A.message);
              E.outputStreamError = A, a(E, _.get(), m.get()), F.kill("SIGKILL");
            })), m) {
              if (n.listeners("stderr").length && m.callback(function(A) {
                n.emit("stderr", A);
              }), n.listeners("codecData").length) {
                var b = !1, I = {};
                m.callback(function(A) {
                  b || (b = t.extractCodecData(n, A, I));
                });
              }
              n.listeners("progress").length && m.callback(function(A) {
                t.extractProgress(n, A);
              });
            }
          },
          function(F, _, m) {
            if (clearTimeout(n.processTimer), delete n.ffmpegProc, F)
              F.message.match(/ffmpeg exited with code/) && (F.message += ": " + t.extractError(m.get())), a(F, _.get(), m.get());
            else {
              var b = n._outputs.filter(function(I) {
                return I.flags.flvmeta;
              });
              b.length ? n._getFlvtoolPath(function(I, A) {
                if (I)
                  return a(I);
                e.each(
                  b,
                  function(E, g) {
                    x(A, ["-U", E.target], { windowsHide: !0 }).on("error", function(r) {
                      g(new Error("Error running " + A + " on " + E.target + ": " + r.message));
                    }).on("exit", function(r, s) {
                      r !== 0 || s ? g(
                        new Error(A + " " + (s ? "received signal " + s : "exited with code " + r)) + " when running on " + E.target
                      ) : g();
                    });
                  },
                  function(E) {
                    E ? a(E) : a(null, _.get(), m.get());
                  }
                );
              }) : a(null, _.get(), m.get());
            }
          }
        );
      }), this;
    }, l.renice = function(n) {
      if (!t.isWindows && (n = n || 0, (n < -20 || n > 20) && this.logger.warn("Invalid niceness value: " + n + ", must be between -20 and 20"), n = Math.min(20, Math.max(-20, n)), this.options.niceness = n, this.ffmpegProc)) {
        var h = this.logger, u = this.ffmpegProc.pid, i = x("renice", [n, "-p", u], { windowsHide: !0 });
        i.on("error", function(c) {
          h.warn("could not renice process " + u + ": " + c.message);
        }), i.on("exit", function(c, a) {
          a ? h.warn("could not renice process " + u + ": renice was killed by signal " + a) : c ? h.warn("could not renice process " + u + ": renice exited with " + c) : h.info("successfully reniced process " + u + " to " + n + " niceness");
        });
      }
      return this;
    }, l.kill = function(n) {
      return this.ffmpegProc ? this.ffmpegProc.kill(n || "SIGKILL") : this.logger.warn("No running ffmpeg process, cannot send signal"), this;
    };
  }, ee;
}
var te, Se;
function at() {
  if (Se) return te;
  Se = 1;
  var x = V, e = V, t = fe(), y = R(), l = /^\s*([D ])([E ])([VAS])([S ])([D ])([T ]) ([^ ]+) +(.*)$/, n = /^\s*([D\.])([E\.])([VAS])([I\.])([L\.])([S\.]) ([^ ]+) +(.*)$/, h = /\(encoders:([^\)]+)\)/, u = /\(decoders:([^\)]+)\)/, i = /^\s*([VAS\.])([F\.])([S\.])([X\.])([B\.])([D\.]) ([^ ]+) +(.*)$/, c = /^\s*([D ])([E ])\s+([^ ]+)\s+(.*)$/, a = /\r\n|\r|\n/, d = /^(?: [T\.][S\.][C\.] )?([^ ]+) +(AA?|VV?|\|)->(AA?|VV?|\|) +(.*)$/, v = {};
  return te = function(S) {
    S.setFfmpegPath = function(F) {
      return v.ffmpegPath = F, this;
    }, S.setFfprobePath = function(F) {
      return v.ffprobePath = F, this;
    }, S.setFlvtoolPath = function(F) {
      return v.flvtoolPath = F, this;
    }, S._forgetPaths = function() {
      delete v.ffmpegPath, delete v.ffprobePath, delete v.flvtoolPath;
    }, S._getFfmpegPath = function(F) {
      if ("ffmpegPath" in v)
        return F(null, v.ffmpegPath);
      t.waterfall([
        // Try FFMPEG_PATH
        function(_) {
          process.env.FFMPEG_PATH ? x.exists(process.env.FFMPEG_PATH, function(m) {
            m ? _(null, process.env.FFMPEG_PATH) : _(null, "");
          }) : _(null, "");
        },
        // Search in the PATH
        function(_, m) {
          if (_.length)
            return m(null, _);
          y.which("ffmpeg", function(b, I) {
            m(b, I);
          });
        }
      ], function(_, m) {
        _ ? F(_) : F(null, v.ffmpegPath = m || "");
      });
    }, S._getFfprobePath = function(F) {
      var _ = this;
      if ("ffprobePath" in v)
        return F(null, v.ffprobePath);
      t.waterfall([
        // Try FFPROBE_PATH
        function(m) {
          process.env.FFPROBE_PATH ? x.exists(process.env.FFPROBE_PATH, function(b) {
            m(null, b ? process.env.FFPROBE_PATH : "");
          }) : m(null, "");
        },
        // Search in the PATH
        function(m, b) {
          if (m.length)
            return b(null, m);
          y.which("ffprobe", function(I, A) {
            b(I, A);
          });
        },
        // Search in the same directory as ffmpeg
        function(m, b) {
          if (m.length)
            return b(null, m);
          _._getFfmpegPath(function(I, A) {
            if (I)
              b(I);
            else if (A.length) {
              var E = y.isWindows ? "ffprobe.exe" : "ffprobe", g = e.join(e.dirname(A), E);
              x.exists(g, function(r) {
                b(null, r ? g : "");
              });
            } else
              b(null, "");
          });
        }
      ], function(m, b) {
        m ? F(m) : F(null, v.ffprobePath = b || "");
      });
    }, S._getFlvtoolPath = function(F) {
      if ("flvtoolPath" in v)
        return F(null, v.flvtoolPath);
      t.waterfall([
        // Try FLVMETA_PATH
        function(_) {
          process.env.FLVMETA_PATH ? x.exists(process.env.FLVMETA_PATH, function(m) {
            _(null, m ? process.env.FLVMETA_PATH : "");
          }) : _(null, "");
        },
        // Try FLVTOOL2_PATH
        function(_, m) {
          if (_.length)
            return m(null, _);
          process.env.FLVTOOL2_PATH ? x.exists(process.env.FLVTOOL2_PATH, function(b) {
            m(null, b ? process.env.FLVTOOL2_PATH : "");
          }) : m(null, "");
        },
        // Search for flvmeta in the PATH
        function(_, m) {
          if (_.length)
            return m(null, _);
          y.which("flvmeta", function(b, I) {
            m(b, I);
          });
        },
        // Search for flvtool2 in the PATH
        function(_, m) {
          if (_.length)
            return m(null, _);
          y.which("flvtool2", function(b, I) {
            m(b, I);
          });
        }
      ], function(_, m) {
        _ ? F(_) : F(null, v.flvtoolPath = m || "");
      });
    }, S.availableFilters = S.getAvailableFilters = function(F) {
      if ("filters" in v)
        return F(null, v.filters);
      this._spawnFfmpeg(["-filters"], { captureStdout: !0, stdoutLines: 0 }, function(_, m) {
        if (_)
          return F(_);
        var b = m.get(), I = b.split(`
`), A = {}, E = { A: "audio", V: "video", "|": "none" };
        I.forEach(function(g) {
          var r = g.match(d);
          r && (A[r[1]] = {
            description: r[4],
            input: E[r[2].charAt(0)],
            multipleInputs: r[2].length > 1,
            output: E[r[3].charAt(0)],
            multipleOutputs: r[3].length > 1
          });
        }), F(null, v.filters = A);
      });
    }, S.availableCodecs = S.getAvailableCodecs = function(F) {
      if ("codecs" in v)
        return F(null, v.codecs);
      this._spawnFfmpeg(["-codecs"], { captureStdout: !0, stdoutLines: 0 }, function(_, m) {
        if (_)
          return F(_);
        var b = m.get(), I = b.split(a), A = {};
        I.forEach(function(E) {
          var g = E.match(l);
          if (g && g[7] !== "=" && (A[g[7]] = {
            type: { V: "video", A: "audio", S: "subtitle" }[g[3]],
            description: g[8],
            canDecode: g[1] === "D",
            canEncode: g[2] === "E",
            drawHorizBand: g[4] === "S",
            directRendering: g[5] === "D",
            weirdFrameTruncation: g[6] === "T"
          }), g = E.match(n), g && g[7] !== "=") {
            var r = A[g[7]] = {
              type: { V: "video", A: "audio", S: "subtitle" }[g[3]],
              description: g[8],
              canDecode: g[1] === "D",
              canEncode: g[2] === "E",
              intraFrameOnly: g[4] === "I",
              isLossy: g[5] === "L",
              isLossless: g[6] === "S"
            }, s = r.description.match(h);
            s = s ? s[1].trim().split(" ") : [];
            var o = r.description.match(u);
            if (o = o ? o[1].trim().split(" ") : [], s.length || o.length) {
              var f = {};
              y.copy(r, f), delete f.canEncode, delete f.canDecode, s.forEach(function(p) {
                A[p] = {}, y.copy(f, A[p]), A[p].canEncode = !0;
              }), o.forEach(function(p) {
                p in A || (A[p] = {}, y.copy(f, A[p])), A[p].canDecode = !0;
              });
            }
          }
        }), F(null, v.codecs = A);
      });
    }, S.availableEncoders = S.getAvailableEncoders = function(F) {
      if ("encoders" in v)
        return F(null, v.encoders);
      this._spawnFfmpeg(["-encoders"], { captureStdout: !0, stdoutLines: 0 }, function(_, m) {
        if (_)
          return F(_);
        var b = m.get(), I = b.split(a), A = {};
        I.forEach(function(E) {
          var g = E.match(i);
          g && g[7] !== "=" && (A[g[7]] = {
            type: { V: "video", A: "audio", S: "subtitle" }[g[1]],
            description: g[8],
            frameMT: g[2] === "F",
            sliceMT: g[3] === "S",
            experimental: g[4] === "X",
            drawHorizBand: g[5] === "B",
            directRendering: g[6] === "D"
          });
        }), F(null, v.encoders = A);
      });
    }, S.availableFormats = S.getAvailableFormats = function(F) {
      if ("formats" in v)
        return F(null, v.formats);
      this._spawnFfmpeg(["-formats"], { captureStdout: !0, stdoutLines: 0 }, function(_, m) {
        if (_)
          return F(_);
        var b = m.get(), I = b.split(a), A = {};
        I.forEach(function(E) {
          var g = E.match(c);
          g && g[3].split(",").forEach(function(r) {
            r in A || (A[r] = {
              description: g[4],
              canDemux: !1,
              canMux: !1
            }), g[1] === "D" && (A[r].canDemux = !0), g[2] === "E" && (A[r].canMux = !0);
          });
        }), F(null, v.formats = A);
      });
    }, S._checkCapabilities = function(F) {
      var _ = this;
      t.waterfall([
        // Get available formats
        function(m) {
          _.availableFormats(m);
        },
        // Check whether specified formats are available
        function(m, b) {
          var I;
          if (I = _._outputs.reduce(function(A, E) {
            var g = E.options.find("-f", 1);
            return g && (!(g[0] in m) || !m[g[0]].canMux) && A.push(g), A;
          }, []), I.length === 1)
            return b(new Error("Output format " + I[0] + " is not available"));
          if (I.length > 1)
            return b(new Error("Output formats " + I.join(", ") + " are not available"));
          if (I = _._inputs.reduce(function(A, E) {
            var g = E.options.find("-f", 1);
            return g && (!(g[0] in m) || !m[g[0]].canDemux) && A.push(g[0]), A;
          }, []), I.length === 1)
            return b(new Error("Input format " + I[0] + " is not available"));
          if (I.length > 1)
            return b(new Error("Input formats " + I.join(", ") + " are not available"));
          b();
        },
        // Get available codecs
        function(m) {
          _.availableEncoders(m);
        },
        // Check whether specified codecs are available and add strict experimental options if needed
        function(m, b) {
          var I;
          if (I = _._outputs.reduce(function(A, E) {
            var g = E.audio.find("-acodec", 1);
            return g && g[0] !== "copy" && (!(g[0] in m) || m[g[0]].type !== "audio") && A.push(g[0]), A;
          }, []), I.length === 1)
            return b(new Error("Audio codec " + I[0] + " is not available"));
          if (I.length > 1)
            return b(new Error("Audio codecs " + I.join(", ") + " are not available"));
          if (I = _._outputs.reduce(function(A, E) {
            var g = E.video.find("-vcodec", 1);
            return g && g[0] !== "copy" && (!(g[0] in m) || m[g[0]].type !== "video") && A.push(g[0]), A;
          }, []), I.length === 1)
            return b(new Error("Video codec " + I[0] + " is not available"));
          if (I.length > 1)
            return b(new Error("Video codecs " + I.join(", ") + " are not available"));
          b();
        }
      ], F);
    };
  }, te;
}
var ne, Pe;
function st() {
  if (Pe) return ne;
  Pe = 1;
  var x = V.spawn;
  function e(l) {
    return l.match(/^TAG:/);
  }
  function t(l) {
    return l.match(/^DISPOSITION:/);
  }
  function y(l) {
    var n = l.split(/\r\n|\r|\n/);
    n = n.filter(function(d) {
      return d.length > 0;
    });
    var h = {
      streams: [],
      format: {},
      chapters: []
    };
    function u(d) {
      for (var v = {}, S = n.shift(); typeof S < "u"; ) {
        if (S.toLowerCase() == "[/" + d + "]")
          return v;
        if (S.match(/^\[/)) {
          S = n.shift();
          continue;
        }
        var F = S.match(/^([^=]+)=(.*)$/);
        F && (!F[1].match(/^TAG:/) && F[2].match(/^[0-9]+(\.[0-9]+)?$/) ? v[F[1]] = Number(F[2]) : v[F[1]] = F[2]), S = n.shift();
      }
      return v;
    }
    for (var i = n.shift(); typeof i < "u"; ) {
      if (i.match(/^\[stream/i)) {
        var c = u("stream");
        h.streams.push(c);
      } else if (i.match(/^\[chapter/i)) {
        var a = u("chapter");
        h.chapters.push(a);
      } else i.toLowerCase() === "[format]" && (h.format = u("format"));
      i = n.shift();
    }
    return h;
  }
  return ne = function(l) {
    l.ffprobe = function() {
      var n, h = null, u = [], i, i = arguments[arguments.length - 1], c = !1;
      function a(d, v) {
        c || (c = !0, i(d, v));
      }
      switch (arguments.length) {
        case 3:
          h = arguments[0], u = arguments[1];
          break;
        case 2:
          typeof arguments[0] == "number" ? h = arguments[0] : Array.isArray(arguments[0]) && (u = arguments[0]);
          break;
      }
      if (h === null) {
        if (!this._currentInput)
          return a(new Error("No input specified"));
        n = this._currentInput;
      } else if (n = this._inputs[h], !n)
        return a(new Error("Invalid input index"));
      this._getFfprobePath(function(d, v) {
        if (d)
          return a(d);
        if (!v)
          return a(new Error("Cannot find ffprobe"));
        var S = "", F = !1, _ = "", m = !1, b = n.isStream ? "pipe:0" : n.source, I = x(v, ["-show_streams", "-show_format"].concat(u, b), { windowsHide: !0 });
        n.isStream && (I.stdin.on("error", function(r) {
          ["ECONNRESET", "EPIPE", "EOF"].indexOf(r.code) >= 0 || a(r);
        }), I.stdin.on("close", function() {
          n.source.pause(), n.source.unpipe(I.stdin);
        }), n.source.pipe(I.stdin)), I.on("error", i);
        var A = null;
        function E(r) {
          if (r && (A = r), g && F && m) {
            if (A)
              return _ && (A.message += `
` + _), a(A);
            var s = y(S);
            [s.format].concat(s.streams).forEach(function(o) {
              if (o) {
                var f = Object.keys(o).filter(e);
                f.length && (o.tags = o.tags || {}, f.forEach(function(w) {
                  o.tags[w.substr(4)] = o[w], delete o[w];
                }));
                var p = Object.keys(o).filter(t);
                p.length && (o.disposition = o.disposition || {}, p.forEach(function(w) {
                  o.disposition[w.substr(12)] = o[w], delete o[w];
                }));
              }
            }), a(null, s);
          }
        }
        var g = !1;
        I.on("exit", function(r, s) {
          g = !0, r ? E(new Error("ffprobe exited with code " + r)) : s ? E(new Error("ffprobe was killed with signal " + s)) : E();
        }), I.stdout.on("data", function(r) {
          S += r;
        }), I.stdout.on("close", function() {
          F = !0, E();
        }), I.stderr.on("data", function(r) {
          _ += r;
        }), I.stderr.on("close", function() {
          m = !0, E();
        });
      });
    };
  }, ne;
}
var re, Te;
function ot() {
  if (Te) return re;
  Te = 1;
  var x = V, e = V, t = V.PassThrough, y = fe(), l = R();
  return re = function(h) {
    h.saveToFile = h.save = function(u) {
      return this.output(u).run(), this;
    }, h.writeToStream = h.pipe = h.stream = function(u, i) {
      if (u && !("writable" in u) && (i = u, u = void 0), !u) {
        if (process.version.match(/v0\.8\./))
          throw new Error("PassThrough stream is not supported on node v0.8");
        u = new t();
      }
      return this.output(u, i).run(), u;
    }, h.takeScreenshots = h.thumbnail = h.thumbnails = h.screenshot = h.screenshots = function(u, i) {
      var c = this, a = this._currentInput.source;
      if (u = u || { count: 1 }, typeof u == "number" && (u = {
        count: u
      }), "folder" in u || (u.folder = i || "."), "timestamps" in u && (u.timemarks = u.timestamps), !("timemarks" in u)) {
        if (!u.count)
          throw new Error("Cannot take screenshots: neither a count nor a timemark list are specified");
        var d = 100 / (1 + u.count);
        u.timemarks = [];
        for (var v = 0; v < u.count; v++)
          u.timemarks.push(d * (v + 1) + "%");
      }
      if ("size" in u) {
        var S = u.size.match(/^(\d+)x(\d+)$/), F = u.size.match(/^(\d+)x\?$/), _ = u.size.match(/^\?x(\d+)$/), m = u.size.match(/^(\d+)%$/);
        if (!S && !F && !_ && !m)
          throw new Error("Invalid size parameter: " + u.size);
      }
      var b;
      function I(A) {
        b ? A(null, b) : c.ffprobe(function(E, g) {
          b = g, A(E, g);
        });
      }
      return y.waterfall([
        // Compute percent timemarks if any
        function(E) {
          if (u.timemarks.some(function(g) {
            return ("" + g).match(/^[\d.]+%$/);
          })) {
            if (typeof a != "string")
              return E(new Error("Cannot compute screenshot timemarks with an input stream, please specify fixed timemarks"));
            I(function(g, r) {
              if (g)
                E(g);
              else {
                var s = r.streams.reduce(function(f, p) {
                  return p.codec_type === "video" && p.width * p.height > f.width * f.height ? p : f;
                }, { width: 0, height: 0 });
                if (s.width === 0)
                  return E(new Error("No video stream in input, cannot take screenshots"));
                var o = Number(s.duration);
                if (isNaN(o) && (o = Number(r.format.duration)), isNaN(o))
                  return E(new Error("Could not get input duration, please specify fixed timemarks"));
                u.timemarks = u.timemarks.map(function(f) {
                  return ("" + f).match(/^([\d.]+)%$/) ? o * parseFloat(f) / 100 : f;
                }), E();
              }
            });
          } else
            E();
        },
        // Turn all timemarks into numbers and sort them
        function(E) {
          u.timemarks = u.timemarks.map(function(g) {
            return l.timemarkToSeconds(g);
          }).sort(function(g, r) {
            return g - r;
          }), E();
        },
        // Add '_%i' to pattern when requesting multiple screenshots and no variable token is present
        function(E) {
          var g = u.filename || "tn.png";
          if (g.indexOf(".") === -1 && (g += ".png"), u.timemarks.length > 1 && !g.match(/%(s|0*i)/)) {
            var r = e.extname(g);
            g = e.join(e.dirname(g), e.basename(g, r) + "_%i" + r);
          }
          E(null, g);
        },
        // Replace filename tokens (%f, %b) in pattern
        function(E, g) {
          if (E.match(/%[bf]/)) {
            if (typeof a != "string")
              return g(new Error("Cannot replace %f or %b when using an input stream"));
            E = E.replace(/%f/g, e.basename(a)).replace(/%b/g, e.basename(a, e.extname(a)));
          }
          g(null, E);
        },
        // Compute size if needed
        function(E, g) {
          if (E.match(/%[whr]/)) {
            if (S)
              return g(null, E, S[1], S[2]);
            I(function(r, s) {
              if (r)
                return g(new Error("Could not determine video resolution to replace %w, %h or %r"));
              var o = s.streams.reduce(function(w, O) {
                return O.codec_type === "video" && O.width * O.height > w.width * w.height ? O : w;
              }, { width: 0, height: 0 });
              if (o.width === 0)
                return g(new Error("No video stream in input, cannot replace %w, %h or %r"));
              var f = o.width, p = o.height;
              F ? (p = p * Number(F[1]) / f, f = Number(F[1])) : _ ? (f = f * Number(_[1]) / p, p = Number(_[1])) : m && (f = f * Number(m[1]) / 100, p = p * Number(m[1]) / 100), g(null, E, Math.round(f / 2) * 2, Math.round(p / 2) * 2);
            });
          } else
            g(null, E, -1, -1);
        },
        // Replace size tokens (%w, %h, %r) in pattern
        function(E, g, r, s) {
          E = E.replace(/%r/g, "%wx%h").replace(/%w/g, g).replace(/%h/g, r), s(null, E);
        },
        // Replace variable tokens in pattern (%s, %i) and generate filename list
        function(E, g) {
          var r = u.timemarks.map(function(s, o) {
            return E.replace(/%s/g, l.timemarkToSeconds(s)).replace(/%(0*)i/g, function(f, p) {
              var w = "" + (o + 1);
              return p.substr(0, Math.max(0, p.length + 1 - w.length)) + w;
            });
          });
          c.emit("filenames", r), g(null, r);
        },
        // Create output directory
        function(E, g) {
          x.exists(u.folder, function(r) {
            r ? g(null, E) : x.mkdir(u.folder, function(s) {
              s ? g(s) : g(null, E);
            });
          });
        }
      ], function(E, g) {
        if (E)
          return c.emit("error", E);
        var r = u.timemarks.length, s, o = [s = {
          filter: "split",
          options: r,
          outputs: []
        }];
        if ("size" in u) {
          c.size(u.size);
          var f = c._currentOutput.sizeFilters.get().map(function(P, T) {
            return T > 0 && (P.inputs = "size" + (T - 1)), P.outputs = "size" + T, P;
          });
          s.inputs = "size" + (f.length - 1), o = f.concat(o), c._currentOutput.sizeFilters.clear();
        }
        for (var p = 0, w = 0; w < r; w++) {
          var O = "screen" + w;
          s.outputs.push(O), w === 0 && (p = u.timemarks[w], c.seekInput(p)), c.output(e.join(u.folder, g[w])).frames(1).map(O), w > 0 && c.seek(u.timemarks[w] - p);
        }
        c.complexFilter(o), c.run();
      }), this;
    }, h.mergeToFile = h.concatenate = h.concat = function(u, i) {
      var c = this._inputs.filter(function(d) {
        return !d.isStream;
      })[0], a = this;
      return this.ffprobe(this._inputs.indexOf(c), function(d, v) {
        if (d)
          return a.emit("error", d);
        var S = v.streams.some(function(_) {
          return _.codec_type === "audio";
        }), F = v.streams.some(function(_) {
          return _.codec_type === "video";
        });
        a.output(u, i).complexFilter({
          filter: "concat",
          options: {
            n: a._inputs.length,
            v: F ? 1 : 0,
            a: S ? 1 : 0
          }
        }).run();
      }), this;
    };
  }, re;
}
var ie, Ne;
function ft() {
  if (Ne) return ie;
  Ne = 1;
  var x = V, e = V, t = V.EventEmitter, y = R();
  function l(n, h) {
    if (!(this instanceof l))
      return new l(n, h);
    t.call(this), typeof n == "object" && !("readable" in n) ? h = n : (h = h || {}, h.source = n), this._inputs = [], h.source && this.input(h.source), this._outputs = [], this.output();
    var u = this;
    ["_global", "_complexFilters"].forEach(function(i) {
      u[i] = y.args();
    }), h.stdoutLines = "stdoutLines" in h ? h.stdoutLines : 100, h.presets = h.presets || h.preset || x.join(__dirname, "presets"), h.niceness = h.niceness || h.priority || 0, this.options = h, this.logger = h.logger || {
      debug: function() {
      },
      info: function() {
      },
      warn: function() {
      },
      error: function() {
      }
    };
  }
  return e.inherits(l, t), ie = l, l.prototype.clone = function() {
    var n = new l(), h = this;
    return n.options = this.options, n.logger = this.logger, n._inputs = this._inputs.map(function(u) {
      return {
        source: u.source,
        options: u.options.clone()
      };
    }), "target" in this._outputs[0] ? (n._outputs = [], n.output()) : (n._outputs = [
      n._currentOutput = {
        flags: {}
      }
    ], ["audio", "audioFilters", "video", "videoFilters", "sizeFilters", "options"].forEach(function(u) {
      n._currentOutput[u] = h._currentOutput[u].clone();
    }), this._currentOutput.sizeData && (n._currentOutput.sizeData = {}, y.copy(this._currentOutput.sizeData, n._currentOutput.sizeData)), y.copy(this._currentOutput.flags, n._currentOutput.flags)), ["_global", "_complexFilters"].forEach(function(u) {
      n[u] = h[u].clone();
    }), n;
  }, Ye()(l.prototype), Je()(l.prototype), Ke()(l.prototype), et()(l.prototype), tt()(l.prototype), nt()(l.prototype), it()(l.prototype), ut()(l.prototype), at()(l.prototype), l.setFfmpegPath = function(n) {
    new l().setFfmpegPath(n);
  }, l.setFfprobePath = function(n) {
    new l().setFfprobePath(n);
  }, l.setFlvtoolPath = function(n) {
    new l().setFlvtoolPath(n);
  }, l.availableFilters = l.getAvailableFilters = function(n) {
    new l().availableFilters(n);
  }, l.availableCodecs = l.getAvailableCodecs = function(n) {
    new l().availableCodecs(n);
  }, l.availableFormats = l.getAvailableFormats = function(n) {
    new l().availableFormats(n);
  }, l.availableEncoders = l.getAvailableEncoders = function(n) {
    new l().availableEncoders(n);
  }, st()(l.prototype), l.ffprobe = function(n) {
    var h = new l(n);
    h.ffprobe.apply(h, Array.prototype.slice.call(arguments, 1));
  }, ot()(l.prototype), ie;
}
var ue, Ve;
function lt() {
  return Ve || (Ve = 1, ue = ft()), ue;
}
var ct = lt();
const ze = /* @__PURE__ */ Ce(ct);
var C = { exports: {} }, ae, Re;
function le() {
  return Re || (Re = 1, ae = {
    DEFAULT_INITIAL_SIZE: 8 * 1024,
    DEFAULT_INCREMENT_AMOUNT: 8 * 1024,
    DEFAULT_FREQUENCY: 1,
    DEFAULT_CHUNK_SIZE: 1024
  }), ae;
}
var se = { exports: {} }, Me;
function ht() {
  if (Me) return se.exports;
  Me = 1;
  var x = V, e = le(), t = V, y = se.exports = function(l) {
    var n = this;
    l = l || {}, x.Readable.call(this, l), this.stopped = !1;
    var h = l.hasOwnProperty("frequency") ? l.frequency : e.DEFAULT_FREQUENCY, u = l.chunkSize || e.DEFAULT_CHUNK_SIZE, i = l.initialSize || e.DEFAULT_INITIAL_SIZE, c = l.incrementAmount || e.DEFAULT_INCREMENT_AMOUNT, a = 0, d = new Buffer(i), v = !1, S = function() {
      var m = Math.min(u, a), b = !1;
      if (m > 0) {
        var I = null;
        I = new Buffer(m), d.copy(I, 0, 0, m), b = n.push(I) !== !1, v = b, d.copy(d, 0, m, a), a -= m;
      }
      a === 0 && n.stopped && n.push(null), b ? S.timeout = setTimeout(S, h) : S.timeout = null;
    };
    this.stop = function() {
      if (this.stopped)
        throw new Error("stop() called on already stopped ReadableStreamBuffer");
      this.stopped = !0, a === 0 && this.push(null);
    }, this.size = function() {
      return a;
    }, this.maxSize = function() {
      return d.length;
    };
    var F = function(m) {
      if (d.length - a < m) {
        var b = Math.ceil((m - (d.length - a)) / c), I = new Buffer(d.length + c * b);
        d.copy(I, 0, 0, a), d = I;
      }
    }, _ = function() {
      !S.timeout && v && (S.timeout = setTimeout(S, h));
    };
    this.put = function(m, b) {
      if (n.stopped)
        throw new Error("Tried to write data to a stopped ReadableStreamBuffer");
      if (Buffer.isBuffer(m))
        F(m.length), m.copy(d, a, 0), a += m.length;
      else {
        m = m + "";
        var I = Buffer.byteLength(m);
        F(I), d.write(m, a, b || "utf8"), a += I;
      }
      _();
    }, this._read = function() {
      v = !0, _();
    };
  };
  return t.inherits(y, x.Readable), se.exports;
}
var oe = { exports: {} }, Le;
function pt() {
  if (Le) return oe.exports;
  Le = 1;
  var x = V, e = V, t = le(), y = oe.exports = function(l) {
    l = l || {}, l.decodeStrings = !0, e.Writable.call(this, l);
    var n = l.initialSize || t.DEFAULT_INITIAL_SIZE, h = l.incrementAmount || t.DEFAULT_INCREMENT_AMOUNT, u = new Buffer(n), i = 0;
    this.size = function() {
      return i;
    }, this.maxSize = function() {
      return u.length;
    }, this.getContents = function(a) {
      if (!i) return !1;
      var d = new Buffer(Math.min(a || i, i));
      return u.copy(d, 0, 0, d.length), d.length < i && u.copy(u, 0, d.length), i -= d.length, d;
    }, this.getContentsAsString = function(a, d) {
      if (!i) return !1;
      var v = u.toString(a || "utf8", 0, Math.min(d || i, i)), S = Buffer.byteLength(v);
      return S < i && u.copy(u, 0, S), i -= S, v;
    };
    var c = function(a) {
      if (u.length - i < a) {
        var d = Math.ceil((a - (u.length - i)) / h), v = new Buffer(u.length + h * d);
        u.copy(v, 0, 0, i), u = v;
      }
    };
    this._write = function(a, d, v) {
      c(a.length), a.copy(u, i, 0), i += a.length, v();
    };
  };
  return x.inherits(y, e.Writable), oe.exports;
}
var qe;
function dt() {
  return qe || (qe = 1, C.exports = le(), C.exports.ReadableStreamBuffer = ht(), C.exports.WritableStreamBuffer = pt()), C.exports;
}
var vt = dt();
const mt = /* @__PURE__ */ Ce(vt);
class gt {
  constructor() {
    q(this, "getResolutionQuality", (e, t) => e >= 3840 && t >= 2160 ? "4K" : e >= 2048 && t >= 1080 ? "2K" : e >= 1920 && t >= 1080 ? "Full HD" : e >= 1280 && t >= 720 ? "HD" : "SD");
    /**
     * Generates a screenshot from the middle of a video.
     * @param {Object} file - Express file object containing video data.
     * @returns {Promise<Buffer>} - A buffer of the generated screenshot.
     */
    q(this, "generateThumbnail", async (e) => {
      const t = z.join(__dirname, "tmp"), y = z.join(t, `temp_${Date.now()}`), l = z.join(t, `screenshot_${Date.now()}.png`);
      return await z.mkdir(t, { recursive: !0 }), await z.writeFile(y, e.buffer), new Promise((n, h) => {
        ze(y).on("error", async (u) => {
          console.error("Error generating screenshot:", u), h(u);
        }).on("end", async () => {
          try {
            const u = await z.readFile(l);
            await z.unlink(y).catch(() => {
            }), await z.unlink(l).catch(() => {
            }), n(u);
          } catch (u) {
            h(u);
          }
        }).screenshots({
          timestamps: ["50%"],
          filename: z.basename(l),
          folder: t
        });
      });
    });
    q(this, "analyzeMediaBuffer", async (e) => new Promise((t, y) => {
      const l = new mt.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 2048
      });
      l.put(e.buffer), l.stop(), ze(l).ffprobe(async (n, h) => {
        if (n) {
          y(n);
          return;
        }
        const u = h.streams.find(
          (c) => c.codec_type === "video" || c.codec_type === "image"
        );
        if (!u) {
          y(new Error("No video or image stream found"));
          return;
        }
        const i = {
          type: u.codec_type + "",
          resolution: {
            width: u.width,
            height: u.height
          },
          format: h.format.format_name + ""
        };
        if (e.mimetype.startsWith("video")) {
          i.durationInSeconds = u.duration ? Math.floor(parseFloat(u.duration)) : void 0, i.bitRate = Math.floor(
            parseInt(u.bit_rate + "") / 1024
          ), i.resolution.quality = this.getResolutionQuality(
            parseInt(u.width + ""),
            parseInt(u.height + "")
          );
          const c = await this.generateThumbnail(e);
          i.thumbnail = c;
        }
        t(i);
      });
    }));
  }
}
class wt {
  constructor(e) {
    this.file = e;
  }
  async validate() {
    const t = await new gt().analyzeMediaBuffer(this.file);
    return console.log(t), !0;
  }
}
class yt {
  async validate(e, t) {
    if ((e === "image" || e === "video") && !this.isMulterFile(t))
      throw new Error("Invalid type for backend validation.");
    if (e === "vast" && !(t instanceof String))
      throw new Error("Invalid type for backend validation.");
    switch (e) {
      case "image":
        return await this.validateImage(t);
      case "video":
        return await this.validateVideo(t);
      case "vast":
        return await this.validateVast(t);
    }
  }
  isMulterFile(e) {
    return "buffer" in e && "originalname" in e && "mimetype" in e && "size" in e;
  }
  async validateVideo(e) {
    return await new wt(e).validate();
  }
  async validateImage(e) {
    return await new $e(e).validate();
  }
  async validateVast(e) {
    return await new He(e).validate();
  }
}
const _t = 50, Et = 2e3, Ft = 50, At = 2e3, xt = ["JPEG", "JPG", "PNG", "GIF"], It = 1e8;
function Ot(x) {
  return (x.includes("/") ? x.split("/")[1] : x).toUpperCase();
}
class bt {
  constructor(e) {
    this.file = e;
  }
  async validate() {
    console.log(this.file);
    const e = await this.getImageFromFile(this.file);
    return console.log(e.width, e.height), !0;
  }
  validateSize() {
    return this.file.size > It;
  }
  async validateResolution() {
    const e = await this.getImageFromFile(this.file);
    return e.width > At || e.width < Ft || e.height > Et || e.height < _t;
  }
  validateType() {
    return xt.includes(Ot(this.file.type));
  }
  async getImageFromFile(e) {
    return new Promise((t, y) => {
      e.arrayBuffer().then((l) => {
        const n = new Blob([l], { type: e.type }), h = URL.createObjectURL(n), u = new Image();
        u.src = h, u.onload = () => t(u), u.onerror = y;
      });
    });
  }
}
class St {
  constructor(e) {
    this.file = e;
  }
  async validate() {
    return console.log(this.file), !0;
  }
}
class Pt {
  constructor(e) {
    this.file = e;
  }
  async validate() {
    return console.log(this.file), !0;
  }
}
class Tt {
  async validate(e, t) {
    if ((e === "image" || e === "video") && !this.isFile(t))
      throw new Error("Invalid type for backend validation.");
    if (e === "vast" && !(t instanceof String))
      throw new Error("Invalid type for backend validation.");
    switch (e) {
      case "image":
        return await this.validateImage(t);
      case "video":
        return await this.validateVideo(t);
      case "vast":
        return await this.validateVast(t);
    }
  }
  isFile(e) {
    return "fileBits" in e && "fileName" in e && "options" in e;
  }
  async validateVideo(e) {
    return await new Pt(e).validate();
  }
  async validateImage(e) {
    return await new bt(e).validate();
  }
  async validateVast(e) {
    return await new St(e).validate();
  }
}
class Vt {
  constructor(e) {
    q(this, "validatorStrategy");
    this.validatorStrategy = e === "backend" ? new yt() : new Tt();
  }
  validate(e, t) {
    this.validatorStrategy.validate(e, t);
  }
}
export {
  Vt as CreativeValidator
};
