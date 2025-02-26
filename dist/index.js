var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/tsup/assets/esm_shims.js
import { fileURLToPath } from "url";
import path from "path";
var getFilename, getDirname, __dirname;
var init_esm_shims = __esm({
  "node_modules/tsup/assets/esm_shims.js"() {
    "use strict";
    getFilename = () => fileURLToPath(import.meta.url);
    getDirname = () => path.dirname(getFilename());
    __dirname = /* @__PURE__ */ getDirname();
  }
});

// node_modules/fluent-ffmpeg/lib/utils.js
var require_utils = __commonJS({
  "node_modules/fluent-ffmpeg/lib/utils.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var exec = __require("child_process").exec;
    var isWindows = __require("os").platform().match(/win(32|64)/);
    var which = __require("which");
    var nlRegexp = /\r\n|\r|\n/g;
    var streamRegexp = /^\[?(.*?)\]?$/;
    var filterEscapeRegexp = /[,]/;
    var whichCache = {};
    function parseProgressLine(line) {
      var progress = {};
      line = line.replace(/=\s+/g, "=").trim();
      var progressParts = line.split(" ");
      for (var i = 0; i < progressParts.length; i++) {
        var progressSplit = progressParts[i].split("=", 2);
        var key = progressSplit[0];
        var value = progressSplit[1];
        if (typeof value === "undefined")
          return null;
        progress[key] = value;
      }
      return progress;
    }
    var utils = module.exports = {
      isWindows,
      streamRegexp,
      /**
       * Copy an object keys into another one
       *
       * @param {Object} source source object
       * @param {Object} dest destination object
       * @private
       */
      copy: function(source, dest) {
        Object.keys(source).forEach(function(key) {
          dest[key] = source[key];
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
        var list = [];
        var argfunc = function() {
          if (arguments.length === 1 && Array.isArray(arguments[0])) {
            list = list.concat(arguments[0]);
          } else {
            list = list.concat([].slice.call(arguments));
          }
        };
        argfunc.clear = function() {
          list = [];
        };
        argfunc.get = function() {
          return list;
        };
        argfunc.find = function(arg, count) {
          var index = list.indexOf(arg);
          if (index !== -1) {
            return list.slice(index + 1, index + 1 + (count || 0));
          }
        };
        argfunc.remove = function(arg, count) {
          var index = list.indexOf(arg);
          if (index !== -1) {
            list.splice(index, (count || 0) + 1);
          }
        };
        argfunc.clone = function() {
          var cloned = utils.args();
          cloned(list);
          return cloned;
        };
        return argfunc;
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
      makeFilterStrings: function(filters) {
        return filters.map(function(filterSpec) {
          if (typeof filterSpec === "string") {
            return filterSpec;
          }
          var filterString = "";
          if (Array.isArray(filterSpec.inputs)) {
            filterString += filterSpec.inputs.map(function(streamSpec) {
              return streamSpec.replace(streamRegexp, "[$1]");
            }).join("");
          } else if (typeof filterSpec.inputs === "string") {
            filterString += filterSpec.inputs.replace(streamRegexp, "[$1]");
          }
          filterString += filterSpec.filter;
          if (filterSpec.options) {
            if (typeof filterSpec.options === "string" || typeof filterSpec.options === "number") {
              filterString += "=" + filterSpec.options;
            } else if (Array.isArray(filterSpec.options)) {
              filterString += "=" + filterSpec.options.map(function(option) {
                if (typeof option === "string" && option.match(filterEscapeRegexp)) {
                  return "'" + option + "'";
                } else {
                  return option;
                }
              }).join(":");
            } else if (Object.keys(filterSpec.options).length) {
              filterString += "=" + Object.keys(filterSpec.options).map(function(option) {
                var value = filterSpec.options[option];
                if (typeof value === "string" && value.match(filterEscapeRegexp)) {
                  value = "'" + value + "'";
                }
                return option + "=" + value;
              }).join(":");
            }
          }
          if (Array.isArray(filterSpec.outputs)) {
            filterString += filterSpec.outputs.map(function(streamSpec) {
              return streamSpec.replace(streamRegexp, "[$1]");
            }).join("");
          } else if (typeof filterSpec.outputs === "string") {
            filterString += filterSpec.outputs.replace(streamRegexp, "[$1]");
          }
          return filterString;
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
      which: function(name, callback) {
        if (name in whichCache) {
          return callback(null, whichCache[name]);
        }
        which(name, function(err, result) {
          if (err) {
            return callback(null, whichCache[name] = "");
          }
          callback(null, whichCache[name] = result);
        });
      },
      /**
       * Convert a [[hh:]mm:]ss[.xxx] timemark into seconds
       *
       * @param {String} timemark timemark string
       * @return Number
       * @private
       */
      timemarkToSeconds: function(timemark) {
        if (typeof timemark === "number") {
          return timemark;
        }
        if (timemark.indexOf(":") === -1 && timemark.indexOf(".") >= 0) {
          return Number(timemark);
        }
        var parts = timemark.split(":");
        var secs = Number(parts.pop());
        if (parts.length) {
          secs += Number(parts.pop()) * 60;
        }
        if (parts.length) {
          secs += Number(parts.pop()) * 3600;
        }
        return secs;
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
      extractCodecData: function(command, stderrLine, codecsObject) {
        var inputPattern = /Input #[0-9]+, ([^ ]+),/;
        var durPattern = /Duration\: ([^,]+)/;
        var audioPattern = /Audio\: (.*)/;
        var videoPattern = /Video\: (.*)/;
        if (!("inputStack" in codecsObject)) {
          codecsObject.inputStack = [];
          codecsObject.inputIndex = -1;
          codecsObject.inInput = false;
        }
        var inputStack = codecsObject.inputStack;
        var inputIndex = codecsObject.inputIndex;
        var inInput = codecsObject.inInput;
        var format, dur, audio, video;
        if (format = stderrLine.match(inputPattern)) {
          inInput = codecsObject.inInput = true;
          inputIndex = codecsObject.inputIndex = codecsObject.inputIndex + 1;
          inputStack[inputIndex] = { format: format[1], audio: "", video: "", duration: "" };
        } else if (inInput && (dur = stderrLine.match(durPattern))) {
          inputStack[inputIndex].duration = dur[1];
        } else if (inInput && (audio = stderrLine.match(audioPattern))) {
          audio = audio[1].split(", ");
          inputStack[inputIndex].audio = audio[0];
          inputStack[inputIndex].audio_details = audio;
        } else if (inInput && (video = stderrLine.match(videoPattern))) {
          video = video[1].split(", ");
          inputStack[inputIndex].video = video[0];
          inputStack[inputIndex].video_details = video;
        } else if (/Output #\d+/.test(stderrLine)) {
          inInput = codecsObject.inInput = false;
        } else if (/Stream mapping:|Press (\[q\]|ctrl-c) to stop/.test(stderrLine)) {
          command.emit.apply(command, ["codecData"].concat(inputStack));
          return true;
        }
        return false;
      },
      /**
       * Extract progress data from ffmpeg stderr and emit 'progress' event if appropriate
       *
       * @param {FfmpegCommand} command event emitter
       * @param {String} stderrLine ffmpeg stderr data
       * @private
       */
      extractProgress: function(command, stderrLine) {
        var progress = parseProgressLine(stderrLine);
        if (progress) {
          var ret = {
            frames: parseInt(progress.frame, 10),
            currentFps: parseInt(progress.fps, 10),
            currentKbps: progress.bitrate ? parseFloat(progress.bitrate.replace("kbits/s", "")) : 0,
            targetSize: parseInt(progress.size || progress.Lsize, 10),
            timemark: progress.time
          };
          if (command._ffprobeData && command._ffprobeData.format && command._ffprobeData.format.duration) {
            var duration = Number(command._ffprobeData.format.duration);
            if (!isNaN(duration))
              ret.percent = utils.timemarkToSeconds(ret.timemark) / duration * 100;
          }
          command.emit("progress", ret);
        }
      },
      /**
       * Extract error message(s) from ffmpeg stderr
       *
       * @param {String} stderr ffmpeg stderr data
       * @return {String}
       * @private
       */
      extractError: function(stderr) {
        return stderr.split(nlRegexp).reduce(function(messages, message) {
          if (message.charAt(0) === " " || message.charAt(0) === "[") {
            return [];
          } else {
            messages.push(message);
            return messages;
          }
        }, []).join("\n");
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
      linesRing: function(maxLines) {
        var cbs = [];
        var lines = [];
        var current = null;
        var closed = false;
        var max = maxLines - 1;
        function emit(line) {
          cbs.forEach(function(cb) {
            cb(line);
          });
        }
        return {
          callback: function(cb) {
            lines.forEach(function(l) {
              cb(l);
            });
            cbs.push(cb);
          },
          append: function(str) {
            if (closed) return;
            if (str instanceof Buffer) str = "" + str;
            if (!str || str.length === 0) return;
            var newLines = str.split(nlRegexp);
            if (newLines.length === 1) {
              if (current !== null) {
                current = current + newLines.shift();
              } else {
                current = newLines.shift();
              }
            } else {
              if (current !== null) {
                current = current + newLines.shift();
                emit(current);
                lines.push(current);
              }
              current = newLines.pop();
              newLines.forEach(function(l) {
                emit(l);
                lines.push(l);
              });
              if (max > -1 && lines.length > max) {
                lines.splice(0, lines.length - max);
              }
            }
          },
          get: function() {
            if (current !== null) {
              return lines.concat([current]).join("\n");
            } else {
              return lines.join("\n");
            }
          },
          close: function() {
            if (closed) return;
            if (current !== null) {
              emit(current);
              lines.push(current);
              if (max > -1 && lines.length > max) {
                lines.shift();
              }
              current = null;
            }
            closed = true;
          }
        };
      }
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/inputs.js
var require_inputs = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/inputs.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var utils = require_utils();
    module.exports = function(proto) {
      proto.mergeAdd = proto.addInput = proto.input = function(source) {
        var isFile = false;
        var isStream = false;
        if (typeof source !== "string") {
          if (!("readable" in source) || !source.readable) {
            throw new Error("Invalid input");
          }
          var hasInputStream = this._inputs.some(function(input) {
            return input.isStream;
          });
          if (hasInputStream) {
            throw new Error("Only one input stream is supported");
          }
          isStream = true;
          source.pause();
        } else {
          var protocol = source.match(/^([a-z]{2,}):/i);
          isFile = !protocol || protocol[0] === "file";
        }
        this._inputs.push(this._currentInput = {
          source,
          isFile,
          isStream,
          options: utils.args()
        });
        return this;
      };
      proto.withInputFormat = proto.inputFormat = proto.fromFormat = function(format) {
        if (!this._currentInput) {
          throw new Error("No input specified");
        }
        this._currentInput.options("-f", format);
        return this;
      };
      proto.withInputFps = proto.withInputFPS = proto.withFpsInput = proto.withFPSInput = proto.inputFPS = proto.inputFps = proto.fpsInput = proto.FPSInput = function(fps) {
        if (!this._currentInput) {
          throw new Error("No input specified");
        }
        this._currentInput.options("-r", fps);
        return this;
      };
      proto.nativeFramerate = proto.withNativeFramerate = proto.native = function() {
        if (!this._currentInput) {
          throw new Error("No input specified");
        }
        this._currentInput.options("-re");
        return this;
      };
      proto.setStartTime = proto.seekInput = function(seek) {
        if (!this._currentInput) {
          throw new Error("No input specified");
        }
        this._currentInput.options("-ss", seek);
        return this;
      };
      proto.loop = function(duration) {
        if (!this._currentInput) {
          throw new Error("No input specified");
        }
        this._currentInput.options("-loop", "1");
        if (typeof duration !== "undefined") {
          this.duration(duration);
        }
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/audio.js
var require_audio = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/audio.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var utils = require_utils();
    module.exports = function(proto) {
      proto.withNoAudio = proto.noAudio = function() {
        this._currentOutput.audio.clear();
        this._currentOutput.audioFilters.clear();
        this._currentOutput.audio("-an");
        return this;
      };
      proto.withAudioCodec = proto.audioCodec = function(codec) {
        this._currentOutput.audio("-acodec", codec);
        return this;
      };
      proto.withAudioBitrate = proto.audioBitrate = function(bitrate) {
        this._currentOutput.audio("-b:a", ("" + bitrate).replace(/k?$/, "k"));
        return this;
      };
      proto.withAudioChannels = proto.audioChannels = function(channels) {
        this._currentOutput.audio("-ac", channels);
        return this;
      };
      proto.withAudioFrequency = proto.audioFrequency = function(freq) {
        this._currentOutput.audio("-ar", freq);
        return this;
      };
      proto.withAudioQuality = proto.audioQuality = function(quality) {
        this._currentOutput.audio("-aq", quality);
        return this;
      };
      proto.withAudioFilter = proto.withAudioFilters = proto.audioFilter = proto.audioFilters = function(filters) {
        if (arguments.length > 1) {
          filters = [].slice.call(arguments);
        }
        if (!Array.isArray(filters)) {
          filters = [filters];
        }
        this._currentOutput.audioFilters(utils.makeFilterStrings(filters));
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/video.js
var require_video = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/video.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var utils = require_utils();
    module.exports = function(proto) {
      proto.withNoVideo = proto.noVideo = function() {
        this._currentOutput.video.clear();
        this._currentOutput.videoFilters.clear();
        this._currentOutput.video("-vn");
        return this;
      };
      proto.withVideoCodec = proto.videoCodec = function(codec) {
        this._currentOutput.video("-vcodec", codec);
        return this;
      };
      proto.withVideoBitrate = proto.videoBitrate = function(bitrate, constant) {
        bitrate = ("" + bitrate).replace(/k?$/, "k");
        this._currentOutput.video("-b:v", bitrate);
        if (constant) {
          this._currentOutput.video(
            "-maxrate",
            bitrate,
            "-minrate",
            bitrate,
            "-bufsize",
            "3M"
          );
        }
        return this;
      };
      proto.withVideoFilter = proto.withVideoFilters = proto.videoFilter = proto.videoFilters = function(filters) {
        if (arguments.length > 1) {
          filters = [].slice.call(arguments);
        }
        if (!Array.isArray(filters)) {
          filters = [filters];
        }
        this._currentOutput.videoFilters(utils.makeFilterStrings(filters));
        return this;
      };
      proto.withOutputFps = proto.withOutputFPS = proto.withFpsOutput = proto.withFPSOutput = proto.withFps = proto.withFPS = proto.outputFPS = proto.outputFps = proto.fpsOutput = proto.FPSOutput = proto.fps = proto.FPS = function(fps) {
        this._currentOutput.video("-r", fps);
        return this;
      };
      proto.takeFrames = proto.withFrames = proto.frames = function(frames) {
        this._currentOutput.video("-vframes", frames);
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/videosize.js
var require_videosize = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/videosize.js"(exports, module) {
    "use strict";
    init_esm_shims();
    function getScalePadFilters(width, height, aspect, color) {
      return [
        /*
          In both cases, we first have to scale the input to match the requested size.
          When using computed width/height, we truncate them to multiples of 2
         */
        {
          filter: "scale",
          options: {
            w: "if(gt(a," + aspect + ")," + width + ",trunc(" + height + "*a/2)*2)",
            h: "if(lt(a," + aspect + ")," + height + ",trunc(" + width + "/a/2)*2)"
          }
        },
        /*
          Then we pad the scaled input to match the target size
          (here iw and ih refer to the padding input, i.e the scaled output)
         */
        {
          filter: "pad",
          options: {
            w: width,
            h: height,
            x: "if(gt(a," + aspect + "),0,(" + width + "-iw)/2)",
            y: "if(lt(a," + aspect + "),0,(" + height + "-ih)/2)",
            color
          }
        }
      ];
    }
    function createSizeFilters(output, key, value) {
      var data = output.sizeData = output.sizeData || {};
      data[key] = value;
      if (!("size" in data)) {
        return [];
      }
      var fixedSize = data.size.match(/([0-9]+)x([0-9]+)/);
      var fixedWidth = data.size.match(/([0-9]+)x\?/);
      var fixedHeight = data.size.match(/\?x([0-9]+)/);
      var percentRatio = data.size.match(/\b([0-9]{1,3})%/);
      var width, height, aspect;
      if (percentRatio) {
        var ratio = Number(percentRatio[1]) / 100;
        return [{
          filter: "scale",
          options: {
            w: "trunc(iw*" + ratio + "/2)*2",
            h: "trunc(ih*" + ratio + "/2)*2"
          }
        }];
      } else if (fixedSize) {
        width = Math.round(Number(fixedSize[1]) / 2) * 2;
        height = Math.round(Number(fixedSize[2]) / 2) * 2;
        aspect = width / height;
        if (data.pad) {
          return getScalePadFilters(width, height, aspect, data.pad);
        } else {
          return [{ filter: "scale", options: { w: width, h: height } }];
        }
      } else if (fixedWidth || fixedHeight) {
        if ("aspect" in data) {
          width = fixedWidth ? fixedWidth[1] : Math.round(Number(fixedHeight[1]) * data.aspect);
          height = fixedHeight ? fixedHeight[1] : Math.round(Number(fixedWidth[1]) / data.aspect);
          width = Math.round(width / 2) * 2;
          height = Math.round(height / 2) * 2;
          if (data.pad) {
            return getScalePadFilters(width, height, data.aspect, data.pad);
          } else {
            return [{ filter: "scale", options: { w: width, h: height } }];
          }
        } else {
          if (fixedWidth) {
            return [{
              filter: "scale",
              options: {
                w: Math.round(Number(fixedWidth[1]) / 2) * 2,
                h: "trunc(ow/a/2)*2"
              }
            }];
          } else {
            return [{
              filter: "scale",
              options: {
                w: "trunc(oh*a/2)*2",
                h: Math.round(Number(fixedHeight[1]) / 2) * 2
              }
            }];
          }
        }
      } else {
        throw new Error("Invalid size specified: " + data.size);
      }
    }
    module.exports = function(proto) {
      proto.keepPixelAspect = // Only for compatibility, this is not about keeping _pixel_ aspect ratio
      proto.keepDisplayAspect = proto.keepDisplayAspectRatio = proto.keepDAR = function() {
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
      };
      proto.withSize = proto.setSize = proto.size = function(size) {
        var filters = createSizeFilters(this._currentOutput, "size", size);
        this._currentOutput.sizeFilters.clear();
        this._currentOutput.sizeFilters(filters);
        return this;
      };
      proto.withAspect = proto.withAspectRatio = proto.setAspect = proto.setAspectRatio = proto.aspect = proto.aspectRatio = function(aspect) {
        var a = Number(aspect);
        if (isNaN(a)) {
          var match = aspect.match(/^(\d+):(\d+)$/);
          if (match) {
            a = Number(match[1]) / Number(match[2]);
          } else {
            throw new Error("Invalid aspect ratio: " + aspect);
          }
        }
        var filters = createSizeFilters(this._currentOutput, "aspect", a);
        this._currentOutput.sizeFilters.clear();
        this._currentOutput.sizeFilters(filters);
        return this;
      };
      proto.applyAutopadding = proto.applyAutoPadding = proto.applyAutopad = proto.applyAutoPad = proto.withAutopadding = proto.withAutoPadding = proto.withAutopad = proto.withAutoPad = proto.autoPad = proto.autopad = function(pad, color) {
        if (typeof pad === "string") {
          color = pad;
          pad = true;
        }
        if (typeof pad === "undefined") {
          pad = true;
        }
        var filters = createSizeFilters(this._currentOutput, "pad", pad ? color || "black" : false);
        this._currentOutput.sizeFilters.clear();
        this._currentOutput.sizeFilters(filters);
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/output.js
var require_output = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/output.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var utils = require_utils();
    module.exports = function(proto) {
      proto.addOutput = proto.output = function(target, pipeopts) {
        var isFile = false;
        if (!target && this._currentOutput) {
          throw new Error("Invalid output");
        }
        if (target && typeof target !== "string") {
          if (!("writable" in target) || !target.writable) {
            throw new Error("Invalid output");
          }
        } else if (typeof target === "string") {
          var protocol = target.match(/^([a-z]{2,}):/i);
          isFile = !protocol || protocol[0] === "file";
        }
        if (target && !("target" in this._currentOutput)) {
          this._currentOutput.target = target;
          this._currentOutput.isFile = isFile;
          this._currentOutput.pipeopts = pipeopts || {};
        } else {
          if (target && typeof target !== "string") {
            var hasOutputStream = this._outputs.some(function(output) {
              return typeof output.target !== "string";
            });
            if (hasOutputStream) {
              throw new Error("Only one output stream is supported");
            }
          }
          this._outputs.push(this._currentOutput = {
            target,
            isFile,
            flags: {},
            pipeopts: pipeopts || {}
          });
          var self = this;
          ["audio", "audioFilters", "video", "videoFilters", "sizeFilters", "options"].forEach(function(key) {
            self._currentOutput[key] = utils.args();
          });
          if (!target) {
            delete this._currentOutput.target;
          }
        }
        return this;
      };
      proto.seekOutput = proto.seek = function(seek) {
        this._currentOutput.options("-ss", seek);
        return this;
      };
      proto.withDuration = proto.setDuration = proto.duration = function(duration) {
        this._currentOutput.options("-t", duration);
        return this;
      };
      proto.toFormat = proto.withOutputFormat = proto.outputFormat = proto.format = function(format) {
        this._currentOutput.options("-f", format);
        return this;
      };
      proto.map = function(spec) {
        this._currentOutput.options("-map", spec.replace(utils.streamRegexp, "[$1]"));
        return this;
      };
      proto.updateFlvMetadata = proto.flvmeta = function() {
        this._currentOutput.flags.flvmeta = true;
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/custom.js
var require_custom = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/custom.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var utils = require_utils();
    module.exports = function(proto) {
      proto.addInputOption = proto.addInputOptions = proto.withInputOption = proto.withInputOptions = proto.inputOption = proto.inputOptions = function(options) {
        if (!this._currentInput) {
          throw new Error("No input specified");
        }
        var doSplit = true;
        if (arguments.length > 1) {
          options = [].slice.call(arguments);
          doSplit = false;
        }
        if (!Array.isArray(options)) {
          options = [options];
        }
        this._currentInput.options(options.reduce(function(options2, option) {
          var split = String(option).split(" ");
          if (doSplit && split.length === 2) {
            options2.push(split[0], split[1]);
          } else {
            options2.push(option);
          }
          return options2;
        }, []));
        return this;
      };
      proto.addOutputOption = proto.addOutputOptions = proto.addOption = proto.addOptions = proto.withOutputOption = proto.withOutputOptions = proto.withOption = proto.withOptions = proto.outputOption = proto.outputOptions = function(options) {
        var doSplit = true;
        if (arguments.length > 1) {
          options = [].slice.call(arguments);
          doSplit = false;
        }
        if (!Array.isArray(options)) {
          options = [options];
        }
        this._currentOutput.options(options.reduce(function(options2, option) {
          var split = String(option).split(" ");
          if (doSplit && split.length === 2) {
            options2.push(split[0], split[1]);
          } else {
            options2.push(option);
          }
          return options2;
        }, []));
        return this;
      };
      proto.filterGraph = proto.complexFilter = function(spec, map) {
        this._complexFilters.clear();
        if (!Array.isArray(spec)) {
          spec = [spec];
        }
        this._complexFilters("-filter_complex", utils.makeFilterStrings(spec).join(";"));
        if (Array.isArray(map)) {
          var self = this;
          map.forEach(function(streamSpec) {
            self._complexFilters("-map", streamSpec.replace(utils.streamRegexp, "[$1]"));
          });
        } else if (typeof map === "string") {
          this._complexFilters("-map", map.replace(utils.streamRegexp, "[$1]"));
        }
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/options/misc.js
var require_misc = __commonJS({
  "node_modules/fluent-ffmpeg/lib/options/misc.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var path3 = __require("path");
    module.exports = function(proto) {
      proto.usingPreset = proto.preset = function(preset) {
        if (typeof preset === "function") {
          preset(this);
        } else {
          try {
            var modulePath = path3.join(this.options.presets, preset);
            var module2 = __require(modulePath);
            if (typeof module2.load === "function") {
              module2.load(this);
            } else {
              throw new Error("preset " + modulePath + " has no load() function");
            }
          } catch (err) {
            throw new Error("preset " + modulePath + " could not be loaded: " + err.message);
          }
        }
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/processor.js
var require_processor = __commonJS({
  "node_modules/fluent-ffmpeg/lib/processor.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var spawn = __require("child_process").spawn;
    var path3 = __require("path");
    var fs2 = __require("fs");
    var async = __require("async");
    var utils = require_utils();
    function runFfprobe(command) {
      const inputProbeIndex = 0;
      if (command._inputs[inputProbeIndex].isStream) {
        return;
      }
      command.ffprobe(inputProbeIndex, function(err, data) {
        command._ffprobeData = data;
      });
    }
    module.exports = function(proto) {
      proto._spawnFfmpeg = function(args, options, processCB, endCB) {
        if (typeof options === "function") {
          endCB = processCB;
          processCB = options;
          options = {};
        }
        if (typeof endCB === "undefined") {
          endCB = processCB;
          processCB = function() {
          };
        }
        var maxLines = "stdoutLines" in options ? options.stdoutLines : this.options.stdoutLines;
        this._getFfmpegPath(function(err, command) {
          if (err) {
            return endCB(err);
          } else if (!command || command.length === 0) {
            return endCB(new Error("Cannot find ffmpeg"));
          }
          if (options.niceness && options.niceness !== 0 && !utils.isWindows) {
            args.unshift("-n", options.niceness, command);
            command = "nice";
          }
          var stdoutRing = utils.linesRing(maxLines);
          var stdoutClosed = false;
          var stderrRing = utils.linesRing(maxLines);
          var stderrClosed = false;
          var ffmpegProc = spawn(command, args, options);
          if (ffmpegProc.stderr) {
            ffmpegProc.stderr.setEncoding("utf8");
          }
          ffmpegProc.on("error", function(err2) {
            endCB(err2);
          });
          var exitError = null;
          function handleExit(err2) {
            if (err2) {
              exitError = err2;
            }
            if (processExited && (stdoutClosed || !options.captureStdout) && stderrClosed) {
              endCB(exitError, stdoutRing, stderrRing);
            }
          }
          var processExited = false;
          ffmpegProc.on("exit", function(code, signal) {
            processExited = true;
            if (signal) {
              handleExit(new Error("ffmpeg was killed with signal " + signal));
            } else if (code) {
              handleExit(new Error("ffmpeg exited with code " + code));
            } else {
              handleExit();
            }
          });
          if (options.captureStdout) {
            ffmpegProc.stdout.on("data", function(data) {
              stdoutRing.append(data);
            });
            ffmpegProc.stdout.on("close", function() {
              stdoutRing.close();
              stdoutClosed = true;
              handleExit();
            });
          }
          ffmpegProc.stderr.on("data", function(data) {
            stderrRing.append(data);
          });
          ffmpegProc.stderr.on("close", function() {
            stderrRing.close();
            stderrClosed = true;
            handleExit();
          });
          processCB(ffmpegProc, stdoutRing, stderrRing);
        });
      };
      proto._getArguments = function() {
        var complexFilters = this._complexFilters.get();
        var fileOutput = this._outputs.some(function(output) {
          return output.isFile;
        });
        return [].concat(
          // Inputs and input options
          this._inputs.reduce(function(args, input) {
            var source = typeof input.source === "string" ? input.source : "pipe:0";
            return args.concat(
              input.options.get(),
              ["-i", source]
            );
          }, []),
          // Global options
          this._global.get(),
          // Overwrite if we have file outputs
          fileOutput ? ["-y"] : [],
          // Complex filters
          complexFilters,
          // Outputs, filters and output options
          this._outputs.reduce(function(args, output) {
            var sizeFilters = utils.makeFilterStrings(output.sizeFilters.get());
            var audioFilters = output.audioFilters.get();
            var videoFilters = output.videoFilters.get().concat(sizeFilters);
            var outputArg;
            if (!output.target) {
              outputArg = [];
            } else if (typeof output.target === "string") {
              outputArg = [output.target];
            } else {
              outputArg = ["pipe:1"];
            }
            return args.concat(
              output.audio.get(),
              audioFilters.length ? ["-filter:a", audioFilters.join(",")] : [],
              output.video.get(),
              videoFilters.length ? ["-filter:v", videoFilters.join(",")] : [],
              output.options.get(),
              outputArg
            );
          }, [])
        );
      };
      proto._prepare = function(callback, readMetadata) {
        var self = this;
        async.waterfall([
          // Check codecs and formats
          function(cb) {
            self._checkCapabilities(cb);
          },
          // Read metadata if required
          function(cb) {
            if (!readMetadata) {
              return cb();
            }
            self.ffprobe(0, function(err, data) {
              if (!err) {
                self._ffprobeData = data;
              }
              cb();
            });
          },
          // Check for flvtool2/flvmeta if necessary
          function(cb) {
            var flvmeta = self._outputs.some(function(output) {
              if (output.flags.flvmeta && !output.isFile) {
                self.logger.warn("Updating flv metadata is only supported for files");
                output.flags.flvmeta = false;
              }
              return output.flags.flvmeta;
            });
            if (flvmeta) {
              self._getFlvtoolPath(function(err) {
                cb(err);
              });
            } else {
              cb();
            }
          },
          // Build argument list
          function(cb) {
            var args;
            try {
              args = self._getArguments();
            } catch (e) {
              return cb(e);
            }
            cb(null, args);
          },
          // Add "-strict experimental" option where needed
          function(args, cb) {
            self.availableEncoders(function(err, encoders) {
              for (var i = 0; i < args.length; i++) {
                if (args[i] === "-acodec" || args[i] === "-vcodec") {
                  i++;
                  if (args[i] in encoders && encoders[args[i]].experimental) {
                    args.splice(i + 1, 0, "-strict", "experimental");
                    i += 2;
                  }
                }
              }
              cb(null, args);
            });
          }
        ], callback);
        if (!readMetadata) {
          if (this.listeners("progress").length > 0) {
            runFfprobe(this);
          } else {
            this.once("newListener", function(event) {
              if (event === "progress") {
                runFfprobe(this);
              }
            });
          }
        }
      };
      proto.exec = proto.execute = proto.run = function() {
        var self = this;
        var outputPresent = this._outputs.some(function(output) {
          return "target" in output;
        });
        if (!outputPresent) {
          throw new Error("No output specified");
        }
        var outputStream = this._outputs.filter(function(output) {
          return typeof output.target !== "string";
        })[0];
        var inputStream = this._inputs.filter(function(input) {
          return typeof input.source !== "string";
        })[0];
        var ended = false;
        function emitEnd(err, stdout, stderr) {
          if (!ended) {
            ended = true;
            if (err) {
              self.emit("error", err, stdout, stderr);
            } else {
              self.emit("end", stdout, stderr);
            }
          }
        }
        self._prepare(function(err, args) {
          if (err) {
            return emitEnd(err);
          }
          self._spawnFfmpeg(
            args,
            {
              captureStdout: !outputStream,
              niceness: self.options.niceness,
              cwd: self.options.cwd,
              windowsHide: true
            },
            function processCB(ffmpegProc, stdoutRing, stderrRing) {
              self.ffmpegProc = ffmpegProc;
              self.emit("start", "ffmpeg " + args.join(" "));
              if (inputStream) {
                inputStream.source.on("error", function(err2) {
                  var reportingErr = new Error("Input stream error: " + err2.message);
                  reportingErr.inputStreamError = err2;
                  emitEnd(reportingErr);
                  ffmpegProc.kill();
                });
                inputStream.source.resume();
                inputStream.source.pipe(ffmpegProc.stdin);
                ffmpegProc.stdin.on("error", function() {
                });
              }
              if (self.options.timeout) {
                self.processTimer = setTimeout(function() {
                  var msg = "process ran into a timeout (" + self.options.timeout + "s)";
                  emitEnd(new Error(msg), stdoutRing.get(), stderrRing.get());
                  ffmpegProc.kill();
                }, self.options.timeout * 1e3);
              }
              if (outputStream) {
                ffmpegProc.stdout.pipe(outputStream.target, outputStream.pipeopts);
                outputStream.target.on("close", function() {
                  self.logger.debug("Output stream closed, scheduling kill for ffmpeg process");
                  setTimeout(function() {
                    emitEnd(new Error("Output stream closed"));
                    ffmpegProc.kill();
                  }, 20);
                });
                outputStream.target.on("error", function(err2) {
                  self.logger.debug("Output stream error, killing ffmpeg process");
                  var reportingErr = new Error("Output stream error: " + err2.message);
                  reportingErr.outputStreamError = err2;
                  emitEnd(reportingErr, stdoutRing.get(), stderrRing.get());
                  ffmpegProc.kill("SIGKILL");
                });
              }
              if (stderrRing) {
                if (self.listeners("stderr").length) {
                  stderrRing.callback(function(line) {
                    self.emit("stderr", line);
                  });
                }
                if (self.listeners("codecData").length) {
                  var codecDataSent = false;
                  var codecObject = {};
                  stderrRing.callback(function(line) {
                    if (!codecDataSent)
                      codecDataSent = utils.extractCodecData(self, line, codecObject);
                  });
                }
                if (self.listeners("progress").length) {
                  stderrRing.callback(function(line) {
                    utils.extractProgress(self, line);
                  });
                }
              }
            },
            function endCB(err2, stdoutRing, stderrRing) {
              clearTimeout(self.processTimer);
              delete self.ffmpegProc;
              if (err2) {
                if (err2.message.match(/ffmpeg exited with code/)) {
                  err2.message += ": " + utils.extractError(stderrRing.get());
                }
                emitEnd(err2, stdoutRing.get(), stderrRing.get());
              } else {
                var flvmeta = self._outputs.filter(function(output) {
                  return output.flags.flvmeta;
                });
                if (flvmeta.length) {
                  self._getFlvtoolPath(function(err3, flvtool) {
                    if (err3) {
                      return emitEnd(err3);
                    }
                    async.each(
                      flvmeta,
                      function(output, cb) {
                        spawn(flvtool, ["-U", output.target], { windowsHide: true }).on("error", function(err4) {
                          cb(new Error("Error running " + flvtool + " on " + output.target + ": " + err4.message));
                        }).on("exit", function(code, signal) {
                          if (code !== 0 || signal) {
                            cb(
                              new Error(flvtool + " " + (signal ? "received signal " + signal : "exited with code " + code)) + " when running on " + output.target
                            );
                          } else {
                            cb();
                          }
                        });
                      },
                      function(err4) {
                        if (err4) {
                          emitEnd(err4);
                        } else {
                          emitEnd(null, stdoutRing.get(), stderrRing.get());
                        }
                      }
                    );
                  });
                } else {
                  emitEnd(null, stdoutRing.get(), stderrRing.get());
                }
              }
            }
          );
        });
        return this;
      };
      proto.renice = function(niceness) {
        if (!utils.isWindows) {
          niceness = niceness || 0;
          if (niceness < -20 || niceness > 20) {
            this.logger.warn("Invalid niceness value: " + niceness + ", must be between -20 and 20");
          }
          niceness = Math.min(20, Math.max(-20, niceness));
          this.options.niceness = niceness;
          if (this.ffmpegProc) {
            var logger = this.logger;
            var pid = this.ffmpegProc.pid;
            var renice = spawn("renice", [niceness, "-p", pid], { windowsHide: true });
            renice.on("error", function(err) {
              logger.warn("could not renice process " + pid + ": " + err.message);
            });
            renice.on("exit", function(code, signal) {
              if (signal) {
                logger.warn("could not renice process " + pid + ": renice was killed by signal " + signal);
              } else if (code) {
                logger.warn("could not renice process " + pid + ": renice exited with " + code);
              } else {
                logger.info("successfully reniced process " + pid + " to " + niceness + " niceness");
              }
            });
          }
        }
        return this;
      };
      proto.kill = function(signal) {
        if (!this.ffmpegProc) {
          this.logger.warn("No running ffmpeg process, cannot send signal");
        } else {
          this.ffmpegProc.kill(signal || "SIGKILL");
        }
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/capabilities.js
var require_capabilities = __commonJS({
  "node_modules/fluent-ffmpeg/lib/capabilities.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var fs2 = __require("fs");
    var path3 = __require("path");
    var async = __require("async");
    var utils = require_utils();
    var avCodecRegexp = /^\s*([D ])([E ])([VAS])([S ])([D ])([T ]) ([^ ]+) +(.*)$/;
    var ffCodecRegexp = /^\s*([D\.])([E\.])([VAS])([I\.])([L\.])([S\.]) ([^ ]+) +(.*)$/;
    var ffEncodersRegexp = /\(encoders:([^\)]+)\)/;
    var ffDecodersRegexp = /\(decoders:([^\)]+)\)/;
    var encodersRegexp = /^\s*([VAS\.])([F\.])([S\.])([X\.])([B\.])([D\.]) ([^ ]+) +(.*)$/;
    var formatRegexp = /^\s*([D ])([E ])\s+([^ ]+)\s+(.*)$/;
    var lineBreakRegexp = /\r\n|\r|\n/;
    var filterRegexp = /^(?: [T\.][S\.][C\.] )?([^ ]+) +(AA?|VV?|\|)->(AA?|VV?|\|) +(.*)$/;
    var cache = {};
    module.exports = function(proto) {
      proto.setFfmpegPath = function(ffmpegPath) {
        cache.ffmpegPath = ffmpegPath;
        return this;
      };
      proto.setFfprobePath = function(ffprobePath) {
        cache.ffprobePath = ffprobePath;
        return this;
      };
      proto.setFlvtoolPath = function(flvtool) {
        cache.flvtoolPath = flvtool;
        return this;
      };
      proto._forgetPaths = function() {
        delete cache.ffmpegPath;
        delete cache.ffprobePath;
        delete cache.flvtoolPath;
      };
      proto._getFfmpegPath = function(callback) {
        if ("ffmpegPath" in cache) {
          return callback(null, cache.ffmpegPath);
        }
        async.waterfall([
          // Try FFMPEG_PATH
          function(cb) {
            if (process.env.FFMPEG_PATH) {
              fs2.exists(process.env.FFMPEG_PATH, function(exists) {
                if (exists) {
                  cb(null, process.env.FFMPEG_PATH);
                } else {
                  cb(null, "");
                }
              });
            } else {
              cb(null, "");
            }
          },
          // Search in the PATH
          function(ffmpeg2, cb) {
            if (ffmpeg2.length) {
              return cb(null, ffmpeg2);
            }
            utils.which("ffmpeg", function(err, ffmpeg3) {
              cb(err, ffmpeg3);
            });
          }
        ], function(err, ffmpeg2) {
          if (err) {
            callback(err);
          } else {
            callback(null, cache.ffmpegPath = ffmpeg2 || "");
          }
        });
      };
      proto._getFfprobePath = function(callback) {
        var self = this;
        if ("ffprobePath" in cache) {
          return callback(null, cache.ffprobePath);
        }
        async.waterfall([
          // Try FFPROBE_PATH
          function(cb) {
            if (process.env.FFPROBE_PATH) {
              fs2.exists(process.env.FFPROBE_PATH, function(exists) {
                cb(null, exists ? process.env.FFPROBE_PATH : "");
              });
            } else {
              cb(null, "");
            }
          },
          // Search in the PATH
          function(ffprobe, cb) {
            if (ffprobe.length) {
              return cb(null, ffprobe);
            }
            utils.which("ffprobe", function(err, ffprobe2) {
              cb(err, ffprobe2);
            });
          },
          // Search in the same directory as ffmpeg
          function(ffprobe, cb) {
            if (ffprobe.length) {
              return cb(null, ffprobe);
            }
            self._getFfmpegPath(function(err, ffmpeg2) {
              if (err) {
                cb(err);
              } else if (ffmpeg2.length) {
                var name = utils.isWindows ? "ffprobe.exe" : "ffprobe";
                var ffprobe2 = path3.join(path3.dirname(ffmpeg2), name);
                fs2.exists(ffprobe2, function(exists) {
                  cb(null, exists ? ffprobe2 : "");
                });
              } else {
                cb(null, "");
              }
            });
          }
        ], function(err, ffprobe) {
          if (err) {
            callback(err);
          } else {
            callback(null, cache.ffprobePath = ffprobe || "");
          }
        });
      };
      proto._getFlvtoolPath = function(callback) {
        if ("flvtoolPath" in cache) {
          return callback(null, cache.flvtoolPath);
        }
        async.waterfall([
          // Try FLVMETA_PATH
          function(cb) {
            if (process.env.FLVMETA_PATH) {
              fs2.exists(process.env.FLVMETA_PATH, function(exists) {
                cb(null, exists ? process.env.FLVMETA_PATH : "");
              });
            } else {
              cb(null, "");
            }
          },
          // Try FLVTOOL2_PATH
          function(flvtool, cb) {
            if (flvtool.length) {
              return cb(null, flvtool);
            }
            if (process.env.FLVTOOL2_PATH) {
              fs2.exists(process.env.FLVTOOL2_PATH, function(exists) {
                cb(null, exists ? process.env.FLVTOOL2_PATH : "");
              });
            } else {
              cb(null, "");
            }
          },
          // Search for flvmeta in the PATH
          function(flvtool, cb) {
            if (flvtool.length) {
              return cb(null, flvtool);
            }
            utils.which("flvmeta", function(err, flvmeta) {
              cb(err, flvmeta);
            });
          },
          // Search for flvtool2 in the PATH
          function(flvtool, cb) {
            if (flvtool.length) {
              return cb(null, flvtool);
            }
            utils.which("flvtool2", function(err, flvtool2) {
              cb(err, flvtool2);
            });
          }
        ], function(err, flvtool) {
          if (err) {
            callback(err);
          } else {
            callback(null, cache.flvtoolPath = flvtool || "");
          }
        });
      };
      proto.availableFilters = proto.getAvailableFilters = function(callback) {
        if ("filters" in cache) {
          return callback(null, cache.filters);
        }
        this._spawnFfmpeg(["-filters"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
          if (err) {
            return callback(err);
          }
          var stdout = stdoutRing.get();
          var lines = stdout.split("\n");
          var data = {};
          var types = { A: "audio", V: "video", "|": "none" };
          lines.forEach(function(line) {
            var match = line.match(filterRegexp);
            if (match) {
              data[match[1]] = {
                description: match[4],
                input: types[match[2].charAt(0)],
                multipleInputs: match[2].length > 1,
                output: types[match[3].charAt(0)],
                multipleOutputs: match[3].length > 1
              };
            }
          });
          callback(null, cache.filters = data);
        });
      };
      proto.availableCodecs = proto.getAvailableCodecs = function(callback) {
        if ("codecs" in cache) {
          return callback(null, cache.codecs);
        }
        this._spawnFfmpeg(["-codecs"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
          if (err) {
            return callback(err);
          }
          var stdout = stdoutRing.get();
          var lines = stdout.split(lineBreakRegexp);
          var data = {};
          lines.forEach(function(line) {
            var match = line.match(avCodecRegexp);
            if (match && match[7] !== "=") {
              data[match[7]] = {
                type: { "V": "video", "A": "audio", "S": "subtitle" }[match[3]],
                description: match[8],
                canDecode: match[1] === "D",
                canEncode: match[2] === "E",
                drawHorizBand: match[4] === "S",
                directRendering: match[5] === "D",
                weirdFrameTruncation: match[6] === "T"
              };
            }
            match = line.match(ffCodecRegexp);
            if (match && match[7] !== "=") {
              var codecData = data[match[7]] = {
                type: { "V": "video", "A": "audio", "S": "subtitle" }[match[3]],
                description: match[8],
                canDecode: match[1] === "D",
                canEncode: match[2] === "E",
                intraFrameOnly: match[4] === "I",
                isLossy: match[5] === "L",
                isLossless: match[6] === "S"
              };
              var encoders = codecData.description.match(ffEncodersRegexp);
              encoders = encoders ? encoders[1].trim().split(" ") : [];
              var decoders = codecData.description.match(ffDecodersRegexp);
              decoders = decoders ? decoders[1].trim().split(" ") : [];
              if (encoders.length || decoders.length) {
                var coderData = {};
                utils.copy(codecData, coderData);
                delete coderData.canEncode;
                delete coderData.canDecode;
                encoders.forEach(function(name) {
                  data[name] = {};
                  utils.copy(coderData, data[name]);
                  data[name].canEncode = true;
                });
                decoders.forEach(function(name) {
                  if (name in data) {
                    data[name].canDecode = true;
                  } else {
                    data[name] = {};
                    utils.copy(coderData, data[name]);
                    data[name].canDecode = true;
                  }
                });
              }
            }
          });
          callback(null, cache.codecs = data);
        });
      };
      proto.availableEncoders = proto.getAvailableEncoders = function(callback) {
        if ("encoders" in cache) {
          return callback(null, cache.encoders);
        }
        this._spawnFfmpeg(["-encoders"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
          if (err) {
            return callback(err);
          }
          var stdout = stdoutRing.get();
          var lines = stdout.split(lineBreakRegexp);
          var data = {};
          lines.forEach(function(line) {
            var match = line.match(encodersRegexp);
            if (match && match[7] !== "=") {
              data[match[7]] = {
                type: { "V": "video", "A": "audio", "S": "subtitle" }[match[1]],
                description: match[8],
                frameMT: match[2] === "F",
                sliceMT: match[3] === "S",
                experimental: match[4] === "X",
                drawHorizBand: match[5] === "B",
                directRendering: match[6] === "D"
              };
            }
          });
          callback(null, cache.encoders = data);
        });
      };
      proto.availableFormats = proto.getAvailableFormats = function(callback) {
        if ("formats" in cache) {
          return callback(null, cache.formats);
        }
        this._spawnFfmpeg(["-formats"], { captureStdout: true, stdoutLines: 0 }, function(err, stdoutRing) {
          if (err) {
            return callback(err);
          }
          var stdout = stdoutRing.get();
          var lines = stdout.split(lineBreakRegexp);
          var data = {};
          lines.forEach(function(line) {
            var match = line.match(formatRegexp);
            if (match) {
              match[3].split(",").forEach(function(format) {
                if (!(format in data)) {
                  data[format] = {
                    description: match[4],
                    canDemux: false,
                    canMux: false
                  };
                }
                if (match[1] === "D") {
                  data[format].canDemux = true;
                }
                if (match[2] === "E") {
                  data[format].canMux = true;
                }
              });
            }
          });
          callback(null, cache.formats = data);
        });
      };
      proto._checkCapabilities = function(callback) {
        var self = this;
        async.waterfall([
          // Get available formats
          function(cb) {
            self.availableFormats(cb);
          },
          // Check whether specified formats are available
          function(formats, cb) {
            var unavailable;
            unavailable = self._outputs.reduce(function(fmts, output) {
              var format = output.options.find("-f", 1);
              if (format) {
                if (!(format[0] in formats) || !formats[format[0]].canMux) {
                  fmts.push(format);
                }
              }
              return fmts;
            }, []);
            if (unavailable.length === 1) {
              return cb(new Error("Output format " + unavailable[0] + " is not available"));
            } else if (unavailable.length > 1) {
              return cb(new Error("Output formats " + unavailable.join(", ") + " are not available"));
            }
            unavailable = self._inputs.reduce(function(fmts, input) {
              var format = input.options.find("-f", 1);
              if (format) {
                if (!(format[0] in formats) || !formats[format[0]].canDemux) {
                  fmts.push(format[0]);
                }
              }
              return fmts;
            }, []);
            if (unavailable.length === 1) {
              return cb(new Error("Input format " + unavailable[0] + " is not available"));
            } else if (unavailable.length > 1) {
              return cb(new Error("Input formats " + unavailable.join(", ") + " are not available"));
            }
            cb();
          },
          // Get available codecs
          function(cb) {
            self.availableEncoders(cb);
          },
          // Check whether specified codecs are available and add strict experimental options if needed
          function(encoders, cb) {
            var unavailable;
            unavailable = self._outputs.reduce(function(cdcs, output) {
              var acodec = output.audio.find("-acodec", 1);
              if (acodec && acodec[0] !== "copy") {
                if (!(acodec[0] in encoders) || encoders[acodec[0]].type !== "audio") {
                  cdcs.push(acodec[0]);
                }
              }
              return cdcs;
            }, []);
            if (unavailable.length === 1) {
              return cb(new Error("Audio codec " + unavailable[0] + " is not available"));
            } else if (unavailable.length > 1) {
              return cb(new Error("Audio codecs " + unavailable.join(", ") + " are not available"));
            }
            unavailable = self._outputs.reduce(function(cdcs, output) {
              var vcodec = output.video.find("-vcodec", 1);
              if (vcodec && vcodec[0] !== "copy") {
                if (!(vcodec[0] in encoders) || encoders[vcodec[0]].type !== "video") {
                  cdcs.push(vcodec[0]);
                }
              }
              return cdcs;
            }, []);
            if (unavailable.length === 1) {
              return cb(new Error("Video codec " + unavailable[0] + " is not available"));
            } else if (unavailable.length > 1) {
              return cb(new Error("Video codecs " + unavailable.join(", ") + " are not available"));
            }
            cb();
          }
        ], callback);
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/ffprobe.js
var require_ffprobe = __commonJS({
  "node_modules/fluent-ffmpeg/lib/ffprobe.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var spawn = __require("child_process").spawn;
    function legacyTag(key) {
      return key.match(/^TAG:/);
    }
    function legacyDisposition(key) {
      return key.match(/^DISPOSITION:/);
    }
    function parseFfprobeOutput(out) {
      var lines = out.split(/\r\n|\r|\n/);
      lines = lines.filter(function(line2) {
        return line2.length > 0;
      });
      var data = {
        streams: [],
        format: {},
        chapters: []
      };
      function parseBlock(name) {
        var data2 = {};
        var line2 = lines.shift();
        while (typeof line2 !== "undefined") {
          if (line2.toLowerCase() == "[/" + name + "]") {
            return data2;
          } else if (line2.match(/^\[/)) {
            line2 = lines.shift();
            continue;
          }
          var kv = line2.match(/^([^=]+)=(.*)$/);
          if (kv) {
            if (!kv[1].match(/^TAG:/) && kv[2].match(/^[0-9]+(\.[0-9]+)?$/)) {
              data2[kv[1]] = Number(kv[2]);
            } else {
              data2[kv[1]] = kv[2];
            }
          }
          line2 = lines.shift();
        }
        return data2;
      }
      var line = lines.shift();
      while (typeof line !== "undefined") {
        if (line.match(/^\[stream/i)) {
          var stream = parseBlock("stream");
          data.streams.push(stream);
        } else if (line.match(/^\[chapter/i)) {
          var chapter = parseBlock("chapter");
          data.chapters.push(chapter);
        } else if (line.toLowerCase() === "[format]") {
          data.format = parseBlock("format");
        }
        line = lines.shift();
      }
      return data;
    }
    module.exports = function(proto) {
      proto.ffprobe = function() {
        var input, index = null, options = [], callback;
        var callback = arguments[arguments.length - 1];
        var ended = false;
        function handleCallback(err, data) {
          if (!ended) {
            ended = true;
            callback(err, data);
          }
        }
        ;
        switch (arguments.length) {
          case 3:
            index = arguments[0];
            options = arguments[1];
            break;
          case 2:
            if (typeof arguments[0] === "number") {
              index = arguments[0];
            } else if (Array.isArray(arguments[0])) {
              options = arguments[0];
            }
            break;
        }
        if (index === null) {
          if (!this._currentInput) {
            return handleCallback(new Error("No input specified"));
          }
          input = this._currentInput;
        } else {
          input = this._inputs[index];
          if (!input) {
            return handleCallback(new Error("Invalid input index"));
          }
        }
        this._getFfprobePath(function(err, path3) {
          if (err) {
            return handleCallback(err);
          } else if (!path3) {
            return handleCallback(new Error("Cannot find ffprobe"));
          }
          var stdout = "";
          var stdoutClosed = false;
          var stderr = "";
          var stderrClosed = false;
          var src = input.isStream ? "pipe:0" : input.source;
          var ffprobe = spawn(path3, ["-show_streams", "-show_format"].concat(options, src), { windowsHide: true });
          if (input.isStream) {
            ffprobe.stdin.on("error", function(err2) {
              if (["ECONNRESET", "EPIPE", "EOF"].indexOf(err2.code) >= 0) {
                return;
              }
              handleCallback(err2);
            });
            ffprobe.stdin.on("close", function() {
              input.source.pause();
              input.source.unpipe(ffprobe.stdin);
            });
            input.source.pipe(ffprobe.stdin);
          }
          ffprobe.on("error", callback);
          var exitError = null;
          function handleExit(err2) {
            if (err2) {
              exitError = err2;
            }
            if (processExited && stdoutClosed && stderrClosed) {
              if (exitError) {
                if (stderr) {
                  exitError.message += "\n" + stderr;
                }
                return handleCallback(exitError);
              }
              var data = parseFfprobeOutput(stdout);
              [data.format].concat(data.streams).forEach(function(target) {
                if (target) {
                  var legacyTagKeys = Object.keys(target).filter(legacyTag);
                  if (legacyTagKeys.length) {
                    target.tags = target.tags || {};
                    legacyTagKeys.forEach(function(tagKey) {
                      target.tags[tagKey.substr(4)] = target[tagKey];
                      delete target[tagKey];
                    });
                  }
                  var legacyDispositionKeys = Object.keys(target).filter(legacyDisposition);
                  if (legacyDispositionKeys.length) {
                    target.disposition = target.disposition || {};
                    legacyDispositionKeys.forEach(function(dispositionKey) {
                      target.disposition[dispositionKey.substr(12)] = target[dispositionKey];
                      delete target[dispositionKey];
                    });
                  }
                }
              });
              handleCallback(null, data);
            }
          }
          var processExited = false;
          ffprobe.on("exit", function(code, signal) {
            processExited = true;
            if (code) {
              handleExit(new Error("ffprobe exited with code " + code));
            } else if (signal) {
              handleExit(new Error("ffprobe was killed with signal " + signal));
            } else {
              handleExit();
            }
          });
          ffprobe.stdout.on("data", function(data) {
            stdout += data;
          });
          ffprobe.stdout.on("close", function() {
            stdoutClosed = true;
            handleExit();
          });
          ffprobe.stderr.on("data", function(data) {
            stderr += data;
          });
          ffprobe.stderr.on("close", function() {
            stderrClosed = true;
            handleExit();
          });
        });
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/recipes.js
var require_recipes = __commonJS({
  "node_modules/fluent-ffmpeg/lib/recipes.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var fs2 = __require("fs");
    var path3 = __require("path");
    var PassThrough = __require("stream").PassThrough;
    var async = __require("async");
    var utils = require_utils();
    module.exports = function recipes(proto) {
      proto.saveToFile = proto.save = function(output) {
        this.output(output).run();
        return this;
      };
      proto.writeToStream = proto.pipe = proto.stream = function(stream, options) {
        if (stream && !("writable" in stream)) {
          options = stream;
          stream = void 0;
        }
        if (!stream) {
          if (process.version.match(/v0\.8\./)) {
            throw new Error("PassThrough stream is not supported on node v0.8");
          }
          stream = new PassThrough();
        }
        this.output(stream, options).run();
        return stream;
      };
      proto.takeScreenshots = proto.thumbnail = proto.thumbnails = proto.screenshot = proto.screenshots = function(config, folder) {
        var self = this;
        var source = this._currentInput.source;
        config = config || { count: 1 };
        if (typeof config === "number") {
          config = {
            count: config
          };
        }
        if (!("folder" in config)) {
          config.folder = folder || ".";
        }
        if ("timestamps" in config) {
          config.timemarks = config.timestamps;
        }
        if (!("timemarks" in config)) {
          if (!config.count) {
            throw new Error("Cannot take screenshots: neither a count nor a timemark list are specified");
          }
          var interval = 100 / (1 + config.count);
          config.timemarks = [];
          for (var i = 0; i < config.count; i++) {
            config.timemarks.push(interval * (i + 1) + "%");
          }
        }
        if ("size" in config) {
          var fixedSize = config.size.match(/^(\d+)x(\d+)$/);
          var fixedWidth = config.size.match(/^(\d+)x\?$/);
          var fixedHeight = config.size.match(/^\?x(\d+)$/);
          var percentSize = config.size.match(/^(\d+)%$/);
          if (!fixedSize && !fixedWidth && !fixedHeight && !percentSize) {
            throw new Error("Invalid size parameter: " + config.size);
          }
        }
        var metadata;
        function getMetadata(cb) {
          if (metadata) {
            cb(null, metadata);
          } else {
            self.ffprobe(function(err, meta) {
              metadata = meta;
              cb(err, meta);
            });
          }
        }
        async.waterfall([
          // Compute percent timemarks if any
          function computeTimemarks(next) {
            if (config.timemarks.some(function(t) {
              return ("" + t).match(/^[\d.]+%$/);
            })) {
              if (typeof source !== "string") {
                return next(new Error("Cannot compute screenshot timemarks with an input stream, please specify fixed timemarks"));
              }
              getMetadata(function(err, meta) {
                if (err) {
                  next(err);
                } else {
                  var vstream = meta.streams.reduce(function(biggest, stream) {
                    if (stream.codec_type === "video" && stream.width * stream.height > biggest.width * biggest.height) {
                      return stream;
                    } else {
                      return biggest;
                    }
                  }, { width: 0, height: 0 });
                  if (vstream.width === 0) {
                    return next(new Error("No video stream in input, cannot take screenshots"));
                  }
                  var duration = Number(vstream.duration);
                  if (isNaN(duration)) {
                    duration = Number(meta.format.duration);
                  }
                  if (isNaN(duration)) {
                    return next(new Error("Could not get input duration, please specify fixed timemarks"));
                  }
                  config.timemarks = config.timemarks.map(function(mark) {
                    if (("" + mark).match(/^([\d.]+)%$/)) {
                      return duration * parseFloat(mark) / 100;
                    } else {
                      return mark;
                    }
                  });
                  next();
                }
              });
            } else {
              next();
            }
          },
          // Turn all timemarks into numbers and sort them
          function normalizeTimemarks(next) {
            config.timemarks = config.timemarks.map(function(mark) {
              return utils.timemarkToSeconds(mark);
            }).sort(function(a, b) {
              return a - b;
            });
            next();
          },
          // Add '_%i' to pattern when requesting multiple screenshots and no variable token is present
          function fixPattern(next) {
            var pattern = config.filename || "tn.png";
            if (pattern.indexOf(".") === -1) {
              pattern += ".png";
            }
            if (config.timemarks.length > 1 && !pattern.match(/%(s|0*i)/)) {
              var ext = path3.extname(pattern);
              pattern = path3.join(path3.dirname(pattern), path3.basename(pattern, ext) + "_%i" + ext);
            }
            next(null, pattern);
          },
          // Replace filename tokens (%f, %b) in pattern
          function replaceFilenameTokens(pattern, next) {
            if (pattern.match(/%[bf]/)) {
              if (typeof source !== "string") {
                return next(new Error("Cannot replace %f or %b when using an input stream"));
              }
              pattern = pattern.replace(/%f/g, path3.basename(source)).replace(/%b/g, path3.basename(source, path3.extname(source)));
            }
            next(null, pattern);
          },
          // Compute size if needed
          function getSize(pattern, next) {
            if (pattern.match(/%[whr]/)) {
              if (fixedSize) {
                return next(null, pattern, fixedSize[1], fixedSize[2]);
              }
              getMetadata(function(err, meta) {
                if (err) {
                  return next(new Error("Could not determine video resolution to replace %w, %h or %r"));
                }
                var vstream = meta.streams.reduce(function(biggest, stream) {
                  if (stream.codec_type === "video" && stream.width * stream.height > biggest.width * biggest.height) {
                    return stream;
                  } else {
                    return biggest;
                  }
                }, { width: 0, height: 0 });
                if (vstream.width === 0) {
                  return next(new Error("No video stream in input, cannot replace %w, %h or %r"));
                }
                var width = vstream.width;
                var height = vstream.height;
                if (fixedWidth) {
                  height = height * Number(fixedWidth[1]) / width;
                  width = Number(fixedWidth[1]);
                } else if (fixedHeight) {
                  width = width * Number(fixedHeight[1]) / height;
                  height = Number(fixedHeight[1]);
                } else if (percentSize) {
                  width = width * Number(percentSize[1]) / 100;
                  height = height * Number(percentSize[1]) / 100;
                }
                next(null, pattern, Math.round(width / 2) * 2, Math.round(height / 2) * 2);
              });
            } else {
              next(null, pattern, -1, -1);
            }
          },
          // Replace size tokens (%w, %h, %r) in pattern
          function replaceSizeTokens(pattern, width, height, next) {
            pattern = pattern.replace(/%r/g, "%wx%h").replace(/%w/g, width).replace(/%h/g, height);
            next(null, pattern);
          },
          // Replace variable tokens in pattern (%s, %i) and generate filename list
          function replaceVariableTokens(pattern, next) {
            var filenames = config.timemarks.map(function(t, i2) {
              return pattern.replace(/%s/g, utils.timemarkToSeconds(t)).replace(/%(0*)i/g, function(match, padding) {
                var idx = "" + (i2 + 1);
                return padding.substr(0, Math.max(0, padding.length + 1 - idx.length)) + idx;
              });
            });
            self.emit("filenames", filenames);
            next(null, filenames);
          },
          // Create output directory
          function createDirectory(filenames, next) {
            fs2.exists(config.folder, function(exists) {
              if (!exists) {
                fs2.mkdir(config.folder, function(err) {
                  if (err) {
                    next(err);
                  } else {
                    next(null, filenames);
                  }
                });
              } else {
                next(null, filenames);
              }
            });
          }
        ], function runCommand(err, filenames) {
          if (err) {
            return self.emit("error", err);
          }
          var count = config.timemarks.length;
          var split;
          var filters = [split = {
            filter: "split",
            options: count,
            outputs: []
          }];
          if ("size" in config) {
            self.size(config.size);
            var sizeFilters = self._currentOutput.sizeFilters.get().map(function(f, i3) {
              if (i3 > 0) {
                f.inputs = "size" + (i3 - 1);
              }
              f.outputs = "size" + i3;
              return f;
            });
            split.inputs = "size" + (sizeFilters.length - 1);
            filters = sizeFilters.concat(filters);
            self._currentOutput.sizeFilters.clear();
          }
          var first = 0;
          for (var i2 = 0; i2 < count; i2++) {
            var stream = "screen" + i2;
            split.outputs.push(stream);
            if (i2 === 0) {
              first = config.timemarks[i2];
              self.seekInput(first);
            }
            self.output(path3.join(config.folder, filenames[i2])).frames(1).map(stream);
            if (i2 > 0) {
              self.seek(config.timemarks[i2] - first);
            }
          }
          self.complexFilter(filters);
          self.run();
        });
        return this;
      };
      proto.mergeToFile = proto.concatenate = proto.concat = function(target, options) {
        var fileInput = this._inputs.filter(function(input) {
          return !input.isStream;
        })[0];
        var self = this;
        this.ffprobe(this._inputs.indexOf(fileInput), function(err, data) {
          if (err) {
            return self.emit("error", err);
          }
          var hasAudioStreams = data.streams.some(function(stream) {
            return stream.codec_type === "audio";
          });
          var hasVideoStreams = data.streams.some(function(stream) {
            return stream.codec_type === "video";
          });
          self.output(target, options).complexFilter({
            filter: "concat",
            options: {
              n: self._inputs.length,
              v: hasVideoStreams ? 1 : 0,
              a: hasAudioStreams ? 1 : 0
            }
          }).run();
        });
        return this;
      };
    };
  }
});

// node_modules/fluent-ffmpeg/lib/fluent-ffmpeg.js
var require_fluent_ffmpeg = __commonJS({
  "node_modules/fluent-ffmpeg/lib/fluent-ffmpeg.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var path3 = __require("path");
    var util = __require("util");
    var EventEmitter = __require("events").EventEmitter;
    var utils = require_utils();
    function FfmpegCommand(input, options) {
      if (!(this instanceof FfmpegCommand)) {
        return new FfmpegCommand(input, options);
      }
      EventEmitter.call(this);
      if (typeof input === "object" && !("readable" in input)) {
        options = input;
      } else {
        options = options || {};
        options.source = input;
      }
      this._inputs = [];
      if (options.source) {
        this.input(options.source);
      }
      this._outputs = [];
      this.output();
      var self = this;
      ["_global", "_complexFilters"].forEach(function(prop) {
        self[prop] = utils.args();
      });
      options.stdoutLines = "stdoutLines" in options ? options.stdoutLines : 100;
      options.presets = options.presets || options.preset || path3.join(__dirname, "presets");
      options.niceness = options.niceness || options.priority || 0;
      this.options = options;
      this.logger = options.logger || {
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
    util.inherits(FfmpegCommand, EventEmitter);
    module.exports = FfmpegCommand;
    FfmpegCommand.prototype.clone = function() {
      var clone = new FfmpegCommand();
      var self = this;
      clone.options = this.options;
      clone.logger = this.logger;
      clone._inputs = this._inputs.map(function(input) {
        return {
          source: input.source,
          options: input.options.clone()
        };
      });
      if ("target" in this._outputs[0]) {
        clone._outputs = [];
        clone.output();
      } else {
        clone._outputs = [
          clone._currentOutput = {
            flags: {}
          }
        ];
        ["audio", "audioFilters", "video", "videoFilters", "sizeFilters", "options"].forEach(function(key) {
          clone._currentOutput[key] = self._currentOutput[key].clone();
        });
        if (this._currentOutput.sizeData) {
          clone._currentOutput.sizeData = {};
          utils.copy(this._currentOutput.sizeData, clone._currentOutput.sizeData);
        }
        utils.copy(this._currentOutput.flags, clone._currentOutput.flags);
      }
      ["_global", "_complexFilters"].forEach(function(prop) {
        clone[prop] = self[prop].clone();
      });
      return clone;
    };
    require_inputs()(FfmpegCommand.prototype);
    require_audio()(FfmpegCommand.prototype);
    require_video()(FfmpegCommand.prototype);
    require_videosize()(FfmpegCommand.prototype);
    require_output()(FfmpegCommand.prototype);
    require_custom()(FfmpegCommand.prototype);
    require_misc()(FfmpegCommand.prototype);
    require_processor()(FfmpegCommand.prototype);
    require_capabilities()(FfmpegCommand.prototype);
    FfmpegCommand.setFfmpegPath = function(path4) {
      new FfmpegCommand().setFfmpegPath(path4);
    };
    FfmpegCommand.setFfprobePath = function(path4) {
      new FfmpegCommand().setFfprobePath(path4);
    };
    FfmpegCommand.setFlvtoolPath = function(path4) {
      new FfmpegCommand().setFlvtoolPath(path4);
    };
    FfmpegCommand.availableFilters = FfmpegCommand.getAvailableFilters = function(callback) {
      new FfmpegCommand().availableFilters(callback);
    };
    FfmpegCommand.availableCodecs = FfmpegCommand.getAvailableCodecs = function(callback) {
      new FfmpegCommand().availableCodecs(callback);
    };
    FfmpegCommand.availableFormats = FfmpegCommand.getAvailableFormats = function(callback) {
      new FfmpegCommand().availableFormats(callback);
    };
    FfmpegCommand.availableEncoders = FfmpegCommand.getAvailableEncoders = function(callback) {
      new FfmpegCommand().availableEncoders(callback);
    };
    require_ffprobe()(FfmpegCommand.prototype);
    FfmpegCommand.ffprobe = function(file) {
      var instance = new FfmpegCommand(file);
      instance.ffprobe.apply(instance, Array.prototype.slice.call(arguments, 1));
    };
    require_recipes()(FfmpegCommand.prototype);
  }
});

// node_modules/fluent-ffmpeg/index.js
var require_fluent_ffmpeg2 = __commonJS({
  "node_modules/fluent-ffmpeg/index.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = require_fluent_ffmpeg();
  }
});

// node_modules/stream-buffers/lib/constants.js
var require_constants = __commonJS({
  "node_modules/stream-buffers/lib/constants.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = {
      DEFAULT_INITIAL_SIZE: 8 * 1024,
      DEFAULT_INCREMENT_AMOUNT: 8 * 1024,
      DEFAULT_FREQUENCY: 1,
      DEFAULT_CHUNK_SIZE: 1024
    };
  }
});

// node_modules/stream-buffers/lib/readable_streambuffer.js
var require_readable_streambuffer = __commonJS({
  "node_modules/stream-buffers/lib/readable_streambuffer.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var stream = __require("stream");
    var constants = require_constants();
    var util = __require("util");
    var ReadableStreamBuffer = module.exports = function(opts) {
      var that = this;
      opts = opts || {};
      stream.Readable.call(this, opts);
      this.stopped = false;
      var frequency = opts.hasOwnProperty("frequency") ? opts.frequency : constants.DEFAULT_FREQUENCY;
      var chunkSize = opts.chunkSize || constants.DEFAULT_CHUNK_SIZE;
      var initialSize = opts.initialSize || constants.DEFAULT_INITIAL_SIZE;
      var incrementAmount = opts.incrementAmount || constants.DEFAULT_INCREMENT_AMOUNT;
      var size = 0;
      var buffer = new Buffer(initialSize);
      var allowPush = false;
      var sendData = function() {
        var amount = Math.min(chunkSize, size);
        var sendMore = false;
        if (amount > 0) {
          var chunk = null;
          chunk = new Buffer(amount);
          buffer.copy(chunk, 0, 0, amount);
          sendMore = that.push(chunk) !== false;
          allowPush = sendMore;
          buffer.copy(buffer, 0, amount, size);
          size -= amount;
        }
        if (size === 0 && that.stopped) {
          that.push(null);
        }
        if (sendMore) {
          sendData.timeout = setTimeout(sendData, frequency);
        } else {
          sendData.timeout = null;
        }
      };
      this.stop = function() {
        if (this.stopped) {
          throw new Error("stop() called on already stopped ReadableStreamBuffer");
        }
        this.stopped = true;
        if (size === 0) {
          this.push(null);
        }
      };
      this.size = function() {
        return size;
      };
      this.maxSize = function() {
        return buffer.length;
      };
      var increaseBufferIfNecessary = function(incomingDataSize) {
        if (buffer.length - size < incomingDataSize) {
          var factor = Math.ceil((incomingDataSize - (buffer.length - size)) / incrementAmount);
          var newBuffer = new Buffer(buffer.length + incrementAmount * factor);
          buffer.copy(newBuffer, 0, 0, size);
          buffer = newBuffer;
        }
      };
      var kickSendDataTask = function() {
        if (!sendData.timeout && allowPush) {
          sendData.timeout = setTimeout(sendData, frequency);
        }
      };
      this.put = function(data, encoding) {
        if (that.stopped) {
          throw new Error("Tried to write data to a stopped ReadableStreamBuffer");
        }
        if (Buffer.isBuffer(data)) {
          increaseBufferIfNecessary(data.length);
          data.copy(buffer, size, 0);
          size += data.length;
        } else {
          data = data + "";
          var dataSizeInBytes = Buffer.byteLength(data);
          increaseBufferIfNecessary(dataSizeInBytes);
          buffer.write(data, size, encoding || "utf8");
          size += dataSizeInBytes;
        }
        kickSendDataTask();
      };
      this._read = function() {
        allowPush = true;
        kickSendDataTask();
      };
    };
    util.inherits(ReadableStreamBuffer, stream.Readable);
  }
});

// node_modules/stream-buffers/lib/writable_streambuffer.js
var require_writable_streambuffer = __commonJS({
  "node_modules/stream-buffers/lib/writable_streambuffer.js"(exports, module) {
    "use strict";
    init_esm_shims();
    var util = __require("util");
    var stream = __require("stream");
    var constants = require_constants();
    var WritableStreamBuffer = module.exports = function(opts) {
      opts = opts || {};
      opts.decodeStrings = true;
      stream.Writable.call(this, opts);
      var initialSize = opts.initialSize || constants.DEFAULT_INITIAL_SIZE;
      var incrementAmount = opts.incrementAmount || constants.DEFAULT_INCREMENT_AMOUNT;
      var buffer = new Buffer(initialSize);
      var size = 0;
      this.size = function() {
        return size;
      };
      this.maxSize = function() {
        return buffer.length;
      };
      this.getContents = function(length) {
        if (!size) return false;
        var data = new Buffer(Math.min(length || size, size));
        buffer.copy(data, 0, 0, data.length);
        if (data.length < size)
          buffer.copy(buffer, 0, data.length);
        size -= data.length;
        return data;
      };
      this.getContentsAsString = function(encoding, length) {
        if (!size) return false;
        var data = buffer.toString(encoding || "utf8", 0, Math.min(length || size, size));
        var dataLength = Buffer.byteLength(data);
        if (dataLength < size)
          buffer.copy(buffer, 0, dataLength);
        size -= dataLength;
        return data;
      };
      var increaseBufferIfNecessary = function(incomingDataSize) {
        if (buffer.length - size < incomingDataSize) {
          var factor = Math.ceil((incomingDataSize - (buffer.length - size)) / incrementAmount);
          var newBuffer = new Buffer(buffer.length + incrementAmount * factor);
          buffer.copy(newBuffer, 0, 0, size);
          buffer = newBuffer;
        }
      };
      this._write = function(chunk, encoding, callback) {
        increaseBufferIfNecessary(chunk.length);
        chunk.copy(buffer, size, 0);
        size += chunk.length;
        callback();
      };
    };
    util.inherits(WritableStreamBuffer, stream.Writable);
  }
});

// node_modules/stream-buffers/lib/streambuffer.js
var require_streambuffer = __commonJS({
  "node_modules/stream-buffers/lib/streambuffer.js"(exports, module) {
    "use strict";
    init_esm_shims();
    module.exports = require_constants();
    module.exports.ReadableStreamBuffer = require_readable_streambuffer();
    module.exports.WritableStreamBuffer = require_writable_streambuffer();
  }
});

// src/index.ts
init_esm_shims();

// src/main/creative-validator.ts
init_esm_shims();

// src/strategies/backend/backend.strategy.ts
init_esm_shims();

// src/strategies/backend/backend-image-validator.ts
init_esm_shims();
var BackendImageValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    return true;
  }
};

// src/strategies/backend/backend-vast-validator.ts
init_esm_shims();
var BackendVastValidator = class {
  constructor(url) {
    this.url = url;
  }
  async validate() {
    console.log(this.url);
    return true;
  }
};

// src/strategies/backend/backend-video-validator.ts
init_esm_shims();

// src/utils/backend-video-analyser.ts
init_esm_shims();
var import_fluent_ffmpeg = __toESM(require_fluent_ffmpeg2(), 1);
var import_stream_buffers = __toESM(require_streambuffer(), 1);
import { promises as fs } from "fs";
import path2 from "path";
var BackendVideoAnalyser = class {
  constructor() {
  }
  getResolutionQuality(width, height) {
    if (width >= 3840 && height >= 2160) return "4K";
    if (width >= 2048 && height >= 1080) return "2K";
    if (width >= 1920 && height >= 1080) return "Full HD";
    if (width >= 1280 && height >= 720) return "HD";
    return "SD";
  }
  test() {
    console.log("test from here");
    console.log(fs);
  }
  /**
   * Generates a screenshot from the middle of a video.
   * @param {Object} file - Express file object containing video data.
   * @returns {Promise<Buffer>} - A buffer of the generated screenshot.
   */
  async generateThumbnail(file) {
    const tempDir = path2.join(__dirname, "tmp");
    const tempInputPath = path2.join(tempDir, `temp_${Date.now()}`);
    const tempOutputPath = path2.join(tempDir, `screenshot_${Date.now()}.png`);
    await fs.mkdir(tempDir, { recursive: true });
    await fs.writeFile(tempInputPath, file.buffer);
    return new Promise((resolve, reject) => {
      (0, import_fluent_ffmpeg.default)(tempInputPath).on("error", async (err) => {
        console.error("Error generating screenshot:", err);
        reject(err);
      }).on("end", async () => {
        try {
          const screenshotBuffer = await fs.readFile(tempOutputPath);
          await fs.unlink(tempInputPath).catch(() => {
          });
          await fs.unlink(tempOutputPath).catch(() => {
          });
          resolve(screenshotBuffer);
        } catch (readError) {
          reject(readError);
        }
      }).screenshots({
        timestamps: ["50%"],
        filename: path2.basename(tempOutputPath),
        folder: tempDir
      });
    });
  }
  async analyzeMediaBuffer(file) {
    return new Promise((resolve, reject) => {
      const readableStreamBuffer = new import_stream_buffers.default.ReadableStreamBuffer({
        frequency: 10,
        chunkSize: 2048
      });
      readableStreamBuffer.put(file.buffer);
      readableStreamBuffer.stop();
      (0, import_fluent_ffmpeg.default)(readableStreamBuffer).ffprobe(async (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        const videoOrImageStream = data.streams.find(
          (stream) => stream.codec_type === "video" || stream.codec_type === "image"
        );
        if (!videoOrImageStream) {
          reject(new Error("No video or image stream found"));
          return;
        }
        const result = {
          type: videoOrImageStream.codec_type + "",
          resolution: {
            width: videoOrImageStream.width,
            height: videoOrImageStream.height
          },
          format: data.format.format_name + ""
        };
        if (file.mimetype.startsWith("video")) {
          result.durationInSeconds = videoOrImageStream.duration ? Math.floor(parseFloat(videoOrImageStream.duration)) : void 0;
          result.bitRate = Math.floor(
            parseInt(videoOrImageStream.bit_rate + "") / 1024
          );
          result.resolution.quality = this.getResolutionQuality(
            parseInt(videoOrImageStream.width + ""),
            parseInt(videoOrImageStream.height + "")
          );
          const thumbnailBuffer = await this.generateThumbnail(file);
          result.thumbnail = thumbnailBuffer;
        }
        resolve(result);
      });
    });
  }
};

// src/strategies/backend/backend-video-validator.ts
var BackendVideoValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    const backendVideoAnalyser = new BackendVideoAnalyser();
    const result = await backendVideoAnalyser.analyzeMediaBuffer(this.file);
    return true;
  }
};

// src/strategies/backend/backend.strategy.ts
var BackendValidatorStrategy = class {
  async validate(type, file) {
    if ((type === "image" || type === "video") && !this.isMulterFile(file)) {
      throw new Error("Invalid type for backend validation.");
    }
    if (type === "vast" && !(file instanceof String)) {
      throw new Error("Invalid type for backend validation.");
    }
    switch (type) {
      case "image":
        return await this.validateImage(file);
      case "video":
        return await this.validateVideo(file);
      case "vast":
        return await this.validateVast(file);
    }
  }
  isMulterFile(object) {
    return "buffer" in object && "originalname" in object && "mimetype" in object && "size" in object;
  }
  async validateVideo(file) {
    const backendVideoValidator = new BackendVideoValidator(file);
    return await backendVideoValidator.validate();
  }
  async validateImage(file) {
    const backendImageValidator = new BackendImageValidator(file);
    return await backendImageValidator.validate();
  }
  async validateVast(url) {
    const backendVastValidator = new BackendVastValidator(url);
    return await backendVastValidator.validate();
  }
};

// src/strategies/frontend/frontend.strategy.ts
init_esm_shims();

// src/strategies/frontend/frontend-image-validator.ts
init_esm_shims();

// src/constants/image.constants.ts
init_esm_shims();
var MIN_HEIGHT = 50;
var MAX_HEIGHT = 2e3;
var MIN_WIDTH = 50;
var MAX_WIDTH = 2e3;
var ALLOWED_IMAGE_FORMATS = ["JPEG", "JPG", "PNG", "GIF"];
var MAX_SIZE = 1e8;

// src/utils/utils.ts
init_esm_shims();
function normalizeFileType(type) {
  return (type.includes("/") ? type.split("/")[1] : type).toUpperCase();
}

// src/strategies/frontend/frontend-image-validator.ts
var FrontendImageValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    const img = await this.getImageFromFile(this.file);
    console.log(img.width, img.height);
    return true;
  }
  validateSize() {
    return this.file.size > MAX_SIZE;
  }
  async validateResolution() {
    const image = await this.getImageFromFile(this.file);
    return image.width > MAX_WIDTH || image.width < MIN_WIDTH || image.height > MAX_HEIGHT || image.height < MIN_HEIGHT;
  }
  validateType() {
    return ALLOWED_IMAGE_FORMATS.includes(normalizeFileType(this.file.type));
  }
  async getImageFromFile(file) {
    return new Promise((resolve, reject) => {
      file.arrayBuffer().then((arrayB) => {
        const blob = new Blob([arrayB], { type: file.type });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    });
  }
};

// src/strategies/frontend/frontend-vast-validator.ts
init_esm_shims();
var FrontendVastValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    return true;
  }
};

// src/strategies/frontend/frontend-video-validator.ts
init_esm_shims();
var FrontendVideoValidator = class {
  constructor(file) {
    this.file = file;
  }
  async validate() {
    console.log(this.file);
    return true;
  }
};

// src/strategies/frontend/frontend.strategy.ts
var FrontendValidatorStrategy = class {
  async validate(type, file) {
    if ((type === "image" || type === "video") && !this.isFile(file)) {
      throw new Error("Invalid type for frontend validation.");
    }
    if (type === "vast" && !(file instanceof String)) {
      throw new Error("Invalid type for frontend validation.");
    }
    switch (type) {
      case "image":
        return await this.validateImage(file);
      case "video":
        return await this.validateVideo(file);
      case "vast":
        return await this.validateVast(file);
    }
  }
  isFile(object) {
    return "name" in object && "size" in object && "type" in object;
  }
  async validateVideo(file) {
    const frontendVideoValidator = new FrontendVideoValidator(file);
    return await frontendVideoValidator.validate();
  }
  async validateImage(file) {
    const frontendImageValidator = new FrontendImageValidator(file);
    return await frontendImageValidator.validate();
  }
  async validateVast(url) {
    const frontendVastValidator = new FrontendVastValidator(url);
    return await frontendVastValidator.validate();
  }
};

// src/main/creative-validator.ts
var CreativeValidator = class {
  validatorStrategy;
  constructor(validationType) {
    this.validatorStrategy = validationType === "backend" ? new BackendValidatorStrategy() : new FrontendValidatorStrategy();
  }
  async validate(type, file) {
    return await this.validatorStrategy.validate(type, file);
  }
};
export {
  CreativeValidator
};
//# sourceMappingURL=index.js.map