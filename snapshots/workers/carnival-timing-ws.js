var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process4 extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process4.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// worker.js
import { Writable as Writable2 } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
import { Writable as Writable22 } from "node:stream";
import { EventEmitter as EventEmitter22 } from "node:events";
import { Writable as Writable222 } from "node:stream";
import { EventEmitter as EventEmitter222 } from "node:events";
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
__name2(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
__name2(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass2(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass2, "notImplementedClass");
__name2(notImplementedClass2, "notImplementedClass");
var _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
var nodeTiming2 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry2 = class {
  static {
    __name(this, "PerformanceEntry");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow2();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow2() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark3 = class PerformanceMark22 extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMark2");
  }
  static {
    __name2(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMeasure");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList2 = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance2 = class {
  static {
    __name(this, "Performance");
  }
  static {
    __name2(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin2;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming2;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming2("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin2) {
      return _performanceNow2();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark3(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure2(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver2 = class {
  static {
    __name(this, "PerformanceObserver");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
if (!("__unenv__" in performance2)) {
  const proto = Performance2.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance2)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance2, key, desc);
      }
    }
  }
}
globalThis.performance = performance2;
globalThis.Performance = Performance2;
globalThis.PerformanceEntry = PerformanceEntry2;
globalThis.PerformanceMark = PerformanceMark3;
globalThis.PerformanceMeasure = PerformanceMeasure2;
globalThis.PerformanceObserver = PerformanceObserver2;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
var noop_default2 = Object.assign(() => {
}, { __unenv__: true });
var _console2 = globalThis.console;
var _ignoreErrors2 = true;
var _stderr2 = new Writable2();
var _stdout2 = new Writable2();
var log3 = _console2?.log ?? noop_default2;
var info3 = _console2?.info ?? log3;
var trace3 = _console2?.trace ?? info3;
var debug3 = _console2?.debug ?? log3;
var table3 = _console2?.table ?? log3;
var error3 = _console2?.error ?? log3;
var warn3 = _console2?.warn ?? error3;
var createTask3 = _console2?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
var clear3 = _console2?.clear ?? noop_default2;
var count3 = _console2?.count ?? noop_default2;
var countReset3 = _console2?.countReset ?? noop_default2;
var dir3 = _console2?.dir ?? noop_default2;
var dirxml3 = _console2?.dirxml ?? noop_default2;
var group3 = _console2?.group ?? noop_default2;
var groupEnd3 = _console2?.groupEnd ?? noop_default2;
var groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
var profile3 = _console2?.profile ?? noop_default2;
var profileEnd3 = _console2?.profileEnd ?? noop_default2;
var time3 = _console2?.time ?? noop_default2;
var timeEnd3 = _console2?.timeEnd ?? noop_default2;
var timeLog3 = _console2?.timeLog ?? noop_default2;
var timeStamp3 = _console2?.timeStamp ?? noop_default2;
var Console2 = _console2?.Console ?? /* @__PURE__ */ notImplementedClass2("console.Console");
var _times2 = /* @__PURE__ */ new Map();
var _stdoutErrorHandler2 = noop_default2;
var _stderrErrorHandler2 = noop_default2;
var workerdConsole2 = globalThis["console"];
var {
  assert: assert3,
  clear: clear22,
  // @ts-expect-error undocumented public API
  context: context2,
  count: count22,
  countReset: countReset22,
  // @ts-expect-error undocumented public API
  createTask: createTask22,
  debug: debug22,
  dir: dir22,
  dirxml: dirxml22,
  error: error22,
  group: group22,
  groupCollapsed: groupCollapsed22,
  groupEnd: groupEnd22,
  info: info22,
  log: log22,
  profile: profile22,
  profileEnd: profileEnd22,
  table: table22,
  time: time22,
  timeEnd: timeEnd22,
  timeLog: timeLog22,
  timeStamp: timeStamp22,
  trace: trace22,
  warn: warn22
} = workerdConsole2;
Object.assign(workerdConsole2, {
  Console: Console2,
  _ignoreErrors: _ignoreErrors2,
  _stderr: _stderr2,
  _stderrErrorHandler: _stderrErrorHandler2,
  _stdout: _stdout2,
  _stdoutErrorHandler: _stdoutErrorHandler2,
  _times: _times2
});
var console_default2 = workerdConsole2;
globalThis.console = console_default2;
var hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
  return BigInt(Date.now() * 1e6);
}, "bigint"), "bigint") });
var ReadStream2 = class {
  static {
    __name(this, "ReadStream");
  }
  static {
    __name2(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var WriteStream2 = class {
  static {
    __name(this, "WriteStream");
  }
  static {
    __name2(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var NODE_VERSION2 = "22.14.0";
var Process2 = class _Process3 extends EventEmitter2 {
  static {
    __name(this, "_Process3");
  }
  static {
    __name2(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process3.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream2(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream2(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream2(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION2}`;
  }
  get versions() {
    return { node: NODE_VERSION2 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError2("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError2("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError2("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError2("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError2("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess2 = globalThis["process"];
var getBuiltinModule2 = globalProcess2.getBuiltinModule;
var workerdProcess2 = getBuiltinModule2("node:process");
var unenvProcess2 = new Process2({
  env: globalProcess2.env,
  hrtime: hrtime4,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess2.nextTick
});
var { exit: exit2, features: features2, platform: platform2 } = workerdProcess2;
var {
  _channel: _channel2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _disconnect: _disconnect2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _handleQueue: _handleQueue2,
  _kill: _kill2,
  _linkedBinding: _linkedBinding2,
  _maxListeners: _maxListeners2,
  _pendingMessage: _pendingMessage2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _send: _send2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  assert: assert22,
  availableMemory: availableMemory2,
  binding: binding2,
  channel: channel2,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  disconnect: disconnect2,
  dlopen: dlopen2,
  domain: domain2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exitCode: exitCode2,
  finalization: finalization2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getMaxListeners: getMaxListeners2,
  getuid: getuid2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  hrtime: hrtime32,
  initgroups: initgroups2,
  kill: kill2,
  listenerCount: listenerCount2,
  listeners: listeners2,
  loadEnvFile: loadEnvFile2,
  mainModule: mainModule2,
  memoryUsage: memoryUsage2,
  moduleLoadList: moduleLoadList2,
  nextTick: nextTick2,
  off: off2,
  on: on2,
  once: once2,
  openStdin: openStdin2,
  permission: permission2,
  pid: pid2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  reallyExit: reallyExit2,
  ref: ref2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  send: send2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  setuid: setuid2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  sourceMapsEnabled: sourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  throwDeprecation: throwDeprecation2,
  title: title2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  unref: unref2,
  uptime: uptime2,
  version: version2,
  versions: versions2
} = unenvProcess2;
var _process2 = {
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exit: exit2,
  finalization: finalization2,
  features: features2,
  getBuiltinModule: getBuiltinModule2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime32,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  nextTick: nextTick2,
  on: on2,
  off: off2,
  once: once2,
  pid: pid2,
  platform: platform2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  throwDeprecation: throwDeprecation2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  // @ts-expect-error old API
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  openStdin: openStdin2,
  assert: assert22,
  binding: binding2,
  send: send2,
  exitCode: exitCode2,
  channel: channel2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getuid: getuid2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  permission: permission2,
  mainModule: mainModule2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  _disconnect: _disconnect2,
  _handleQueue: _handleQueue2,
  _pendingMessage: _pendingMessage2,
  _channel: _channel2,
  _send: _send2,
  _linkedBinding: _linkedBinding2
};
var process_default2 = _process2;
globalThis.process = process_default2;
var __defProp22 = Object.defineProperty;
var __name22 = /* @__PURE__ */ __name2((target, value) => __defProp22(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError22(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError22, "createNotImplementedError2");
__name2(createNotImplementedError22, "createNotImplementedError");
__name22(createNotImplementedError22, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented22(name) {
  const fn = /* @__PURE__ */ __name22(() => {
    throw /* @__PURE__ */ createNotImplementedError22(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented22, "notImplemented2");
__name2(notImplemented22, "notImplemented");
__name22(notImplemented22, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass22(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass22, "notImplementedClass2");
__name2(notImplementedClass22, "notImplementedClass");
__name22(notImplementedClass22, "notImplementedClass");
var _timeOrigin22 = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow22 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin22;
var nodeTiming22 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry22 = class {
  static {
    __name(this, "PerformanceEntry2");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  static {
    __name22(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow22();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow22() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark32 = class PerformanceMark222 extends PerformanceEntry22 {
  static {
    __name(this, "PerformanceMark22");
  }
  static {
    __name2(this, "PerformanceMark2");
  }
  static {
    __name22(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure22 = class extends PerformanceEntry22 {
  static {
    __name(this, "PerformanceMeasure2");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  static {
    __name22(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming22 = class extends PerformanceEntry22 {
  static {
    __name(this, "PerformanceResourceTiming2");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  static {
    __name22(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList22 = class {
  static {
    __name(this, "PerformanceObserverEntryList2");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  static {
    __name22(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance22 = class {
  static {
    __name(this, "Performance2");
  }
  static {
    __name2(this, "Performance");
  }
  static {
    __name22(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin22;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError22("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming22;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming22("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin22) {
      return _performanceNow22();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark32(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure22(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError22("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError22("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError22("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver22 = class {
  static {
    __name(this, "PerformanceObserver2");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  static {
    __name22(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError22("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError22("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance22 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance22();
if (!("__unenv__" in performance22)) {
  const proto = Performance22.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance22)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance22, key, desc);
      }
    }
  }
}
globalThis.performance = performance22;
globalThis.Performance = Performance22;
globalThis.PerformanceEntry = PerformanceEntry22;
globalThis.PerformanceMark = PerformanceMark32;
globalThis.PerformanceMeasure = PerformanceMeasure22;
globalThis.PerformanceObserver = PerformanceObserver22;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList22;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming22;
var noop_default22 = Object.assign(() => {
}, { __unenv__: true });
var _console22 = globalThis.console;
var _ignoreErrors22 = true;
var _stderr22 = new Writable22();
var _stdout22 = new Writable22();
var log32 = _console22?.log ?? noop_default22;
var info32 = _console22?.info ?? log32;
var trace32 = _console22?.trace ?? info32;
var debug32 = _console22?.debug ?? log32;
var table32 = _console22?.table ?? log32;
var error32 = _console22?.error ?? log32;
var warn32 = _console22?.warn ?? error32;
var createTask32 = _console22?.createTask ?? /* @__PURE__ */ notImplemented22("console.createTask");
var clear32 = _console22?.clear ?? noop_default22;
var count32 = _console22?.count ?? noop_default22;
var countReset32 = _console22?.countReset ?? noop_default22;
var dir32 = _console22?.dir ?? noop_default22;
var dirxml32 = _console22?.dirxml ?? noop_default22;
var group32 = _console22?.group ?? noop_default22;
var groupEnd32 = _console22?.groupEnd ?? noop_default22;
var groupCollapsed32 = _console22?.groupCollapsed ?? noop_default22;
var profile32 = _console22?.profile ?? noop_default22;
var profileEnd32 = _console22?.profileEnd ?? noop_default22;
var time32 = _console22?.time ?? noop_default22;
var timeEnd32 = _console22?.timeEnd ?? noop_default22;
var timeLog32 = _console22?.timeLog ?? noop_default22;
var timeStamp32 = _console22?.timeStamp ?? noop_default22;
var Console22 = _console22?.Console ?? /* @__PURE__ */ notImplementedClass22("console.Console");
var _times22 = /* @__PURE__ */ new Map();
var _stdoutErrorHandler22 = noop_default22;
var _stderrErrorHandler22 = noop_default22;
var workerdConsole22 = globalThis["console"];
var {
  assert: assert32,
  clear: clear222,
  // @ts-expect-error undocumented public API
  context: context22,
  count: count222,
  countReset: countReset222,
  // @ts-expect-error undocumented public API
  createTask: createTask222,
  debug: debug222,
  dir: dir222,
  dirxml: dirxml222,
  error: error222,
  group: group222,
  groupCollapsed: groupCollapsed222,
  groupEnd: groupEnd222,
  info: info222,
  log: log222,
  profile: profile222,
  profileEnd: profileEnd222,
  table: table222,
  time: time222,
  timeEnd: timeEnd222,
  timeLog: timeLog222,
  timeStamp: timeStamp222,
  trace: trace222,
  warn: warn222
} = workerdConsole22;
Object.assign(workerdConsole22, {
  Console: Console22,
  _ignoreErrors: _ignoreErrors22,
  _stderr: _stderr22,
  _stderrErrorHandler: _stderrErrorHandler22,
  _stdout: _stdout22,
  _stdoutErrorHandler: _stdoutErrorHandler22,
  _times: _times22
});
var console_default22 = workerdConsole22;
globalThis.console = console_default22;
var hrtime42 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name22(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime222(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime22"), "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name22(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint22() {
  return BigInt(Date.now() * 1e6);
}, "bigint2"), "bigint"), "bigint") });
var ReadStream22 = class {
  static {
    __name(this, "ReadStream2");
  }
  static {
    __name2(this, "ReadStream");
  }
  static {
    __name22(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var WriteStream22 = class {
  static {
    __name(this, "WriteStream2");
  }
  static {
    __name2(this, "WriteStream");
  }
  static {
    __name22(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var NODE_VERSION22 = "22.14.0";
var Process22 = class _Process2 extends EventEmitter22 {
  static {
    __name(this, "_Process2");
  }
  static {
    __name2(this, "_Process2");
  }
  static {
    __name22(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process2.prototype), ...Object.getOwnPropertyNames(EventEmitter22.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream22(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream22(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream22(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION22}`;
  }
  get versions() {
    return { node: NODE_VERSION22 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError22("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError22("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError22("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError22("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError22("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError22("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError22("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError22("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError22("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError22("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError22("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError22("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError22("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError22("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError22("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError22("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError22("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented22("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented22("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented22("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented22("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented22("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented22("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name22(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess22 = globalThis["process"];
var getBuiltinModule22 = globalProcess22.getBuiltinModule;
var workerdProcess22 = getBuiltinModule22("node:process");
var unenvProcess22 = new Process22({
  env: globalProcess22.env,
  hrtime: hrtime42,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess22.nextTick
});
var { exit: exit22, features: features22, platform: platform22 } = workerdProcess22;
var {
  _channel: _channel22,
  _debugEnd: _debugEnd22,
  _debugProcess: _debugProcess22,
  _disconnect: _disconnect22,
  _events: _events22,
  _eventsCount: _eventsCount22,
  _exiting: _exiting22,
  _fatalException: _fatalException22,
  _getActiveHandles: _getActiveHandles22,
  _getActiveRequests: _getActiveRequests22,
  _handleQueue: _handleQueue22,
  _kill: _kill22,
  _linkedBinding: _linkedBinding22,
  _maxListeners: _maxListeners22,
  _pendingMessage: _pendingMessage22,
  _preload_modules: _preload_modules22,
  _rawDebug: _rawDebug22,
  _send: _send22,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier22,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier22,
  _tickCallback: _tickCallback22,
  abort: abort22,
  addListener: addListener22,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags22,
  arch: arch22,
  argv: argv22,
  argv0: argv022,
  assert: assert222,
  availableMemory: availableMemory22,
  binding: binding22,
  channel: channel22,
  chdir: chdir22,
  config: config22,
  connected: connected22,
  constrainedMemory: constrainedMemory22,
  cpuUsage: cpuUsage22,
  cwd: cwd22,
  debugPort: debugPort22,
  disconnect: disconnect22,
  dlopen: dlopen22,
  domain: domain22,
  emit: emit22,
  emitWarning: emitWarning22,
  env: env22,
  eventNames: eventNames22,
  execArgv: execArgv22,
  execPath: execPath22,
  exitCode: exitCode22,
  finalization: finalization22,
  getActiveResourcesInfo: getActiveResourcesInfo22,
  getegid: getegid22,
  geteuid: geteuid22,
  getgid: getgid22,
  getgroups: getgroups22,
  getMaxListeners: getMaxListeners22,
  getuid: getuid22,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback22,
  hrtime: hrtime322,
  initgroups: initgroups22,
  kill: kill22,
  listenerCount: listenerCount22,
  listeners: listeners22,
  loadEnvFile: loadEnvFile22,
  mainModule: mainModule22,
  memoryUsage: memoryUsage22,
  moduleLoadList: moduleLoadList22,
  nextTick: nextTick22,
  off: off22,
  on: on22,
  once: once22,
  openStdin: openStdin22,
  permission: permission22,
  pid: pid22,
  ppid: ppid22,
  prependListener: prependListener22,
  prependOnceListener: prependOnceListener22,
  rawListeners: rawListeners22,
  reallyExit: reallyExit22,
  ref: ref22,
  release: release22,
  removeAllListeners: removeAllListeners22,
  removeListener: removeListener22,
  report: report22,
  resourceUsage: resourceUsage22,
  send: send22,
  setegid: setegid22,
  seteuid: seteuid22,
  setgid: setgid22,
  setgroups: setgroups22,
  setMaxListeners: setMaxListeners22,
  setSourceMapsEnabled: setSourceMapsEnabled22,
  setuid: setuid22,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback22,
  sourceMapsEnabled: sourceMapsEnabled22,
  stderr: stderr22,
  stdin: stdin22,
  stdout: stdout22,
  throwDeprecation: throwDeprecation22,
  title: title22,
  traceDeprecation: traceDeprecation22,
  umask: umask22,
  unref: unref22,
  uptime: uptime22,
  version: version22,
  versions: versions22
} = unenvProcess22;
var _process22 = {
  abort: abort22,
  addListener: addListener22,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags22,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback22,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback22,
  loadEnvFile: loadEnvFile22,
  sourceMapsEnabled: sourceMapsEnabled22,
  arch: arch22,
  argv: argv22,
  argv0: argv022,
  chdir: chdir22,
  config: config22,
  connected: connected22,
  constrainedMemory: constrainedMemory22,
  availableMemory: availableMemory22,
  cpuUsage: cpuUsage22,
  cwd: cwd22,
  debugPort: debugPort22,
  dlopen: dlopen22,
  disconnect: disconnect22,
  emit: emit22,
  emitWarning: emitWarning22,
  env: env22,
  eventNames: eventNames22,
  execArgv: execArgv22,
  execPath: execPath22,
  exit: exit22,
  finalization: finalization22,
  features: features22,
  getBuiltinModule: getBuiltinModule22,
  getActiveResourcesInfo: getActiveResourcesInfo22,
  getMaxListeners: getMaxListeners22,
  hrtime: hrtime322,
  kill: kill22,
  listeners: listeners22,
  listenerCount: listenerCount22,
  memoryUsage: memoryUsage22,
  nextTick: nextTick22,
  on: on22,
  off: off22,
  once: once22,
  pid: pid22,
  platform: platform22,
  ppid: ppid22,
  prependListener: prependListener22,
  prependOnceListener: prependOnceListener22,
  rawListeners: rawListeners22,
  release: release22,
  removeAllListeners: removeAllListeners22,
  removeListener: removeListener22,
  report: report22,
  resourceUsage: resourceUsage22,
  setMaxListeners: setMaxListeners22,
  setSourceMapsEnabled: setSourceMapsEnabled22,
  stderr: stderr22,
  stdin: stdin22,
  stdout: stdout22,
  title: title22,
  throwDeprecation: throwDeprecation22,
  traceDeprecation: traceDeprecation22,
  umask: umask22,
  uptime: uptime22,
  version: version22,
  versions: versions22,
  // @ts-expect-error old API
  domain: domain22,
  initgroups: initgroups22,
  moduleLoadList: moduleLoadList22,
  reallyExit: reallyExit22,
  openStdin: openStdin22,
  assert: assert222,
  binding: binding22,
  send: send22,
  exitCode: exitCode22,
  channel: channel22,
  getegid: getegid22,
  geteuid: geteuid22,
  getgid: getgid22,
  getgroups: getgroups22,
  getuid: getuid22,
  setegid: setegid22,
  seteuid: seteuid22,
  setgid: setgid22,
  setgroups: setgroups22,
  setuid: setuid22,
  permission: permission22,
  mainModule: mainModule22,
  _events: _events22,
  _eventsCount: _eventsCount22,
  _exiting: _exiting22,
  _maxListeners: _maxListeners22,
  _debugEnd: _debugEnd22,
  _debugProcess: _debugProcess22,
  _fatalException: _fatalException22,
  _getActiveHandles: _getActiveHandles22,
  _getActiveRequests: _getActiveRequests22,
  _kill: _kill22,
  _preload_modules: _preload_modules22,
  _rawDebug: _rawDebug22,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier22,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier22,
  _tickCallback: _tickCallback22,
  _disconnect: _disconnect22,
  _handleQueue: _handleQueue22,
  _pendingMessage: _pendingMessage22,
  _channel: _channel22,
  _send: _send22,
  _linkedBinding: _linkedBinding22
};
var process_default22 = _process22;
globalThis.process = process_default22;
var __defProp222 = Object.defineProperty;
var __name222 = /* @__PURE__ */ __name22((target, value) => __defProp222(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError222(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError222, "createNotImplementedError22");
__name2(createNotImplementedError222, "createNotImplementedError2");
__name22(createNotImplementedError222, "createNotImplementedError");
__name222(createNotImplementedError222, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented222(name) {
  const fn = /* @__PURE__ */ __name222(() => {
    throw /* @__PURE__ */ createNotImplementedError222(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented222, "notImplemented22");
__name2(notImplemented222, "notImplemented2");
__name22(notImplemented222, "notImplemented");
__name222(notImplemented222, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass222(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass222, "notImplementedClass22");
__name2(notImplementedClass222, "notImplementedClass2");
__name22(notImplementedClass222, "notImplementedClass");
__name222(notImplementedClass222, "notImplementedClass");
var _timeOrigin222 = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow222 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin222;
var nodeTiming222 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry222 = class {
  static {
    __name(this, "PerformanceEntry22");
  }
  static {
    __name2(this, "PerformanceEntry2");
  }
  static {
    __name22(this, "PerformanceEntry");
  }
  static {
    __name222(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow222();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow222() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark322 = class PerformanceMark2222 extends PerformanceEntry222 {
  static {
    __name(this, "PerformanceMark222");
  }
  static {
    __name2(this, "PerformanceMark22");
  }
  static {
    __name22(this, "PerformanceMark2");
  }
  static {
    __name222(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure222 = class extends PerformanceEntry222 {
  static {
    __name(this, "PerformanceMeasure22");
  }
  static {
    __name2(this, "PerformanceMeasure2");
  }
  static {
    __name22(this, "PerformanceMeasure");
  }
  static {
    __name222(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming222 = class extends PerformanceEntry222 {
  static {
    __name(this, "PerformanceResourceTiming22");
  }
  static {
    __name2(this, "PerformanceResourceTiming2");
  }
  static {
    __name22(this, "PerformanceResourceTiming");
  }
  static {
    __name222(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList222 = class {
  static {
    __name(this, "PerformanceObserverEntryList22");
  }
  static {
    __name2(this, "PerformanceObserverEntryList2");
  }
  static {
    __name22(this, "PerformanceObserverEntryList");
  }
  static {
    __name222(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance222 = class {
  static {
    __name(this, "Performance22");
  }
  static {
    __name2(this, "Performance2");
  }
  static {
    __name22(this, "Performance");
  }
  static {
    __name222(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin222;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError222("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming222;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming222("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin222) {
      return _performanceNow222();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark322(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure222(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError222("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError222("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError222("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver222 = class {
  static {
    __name(this, "PerformanceObserver22");
  }
  static {
    __name2(this, "PerformanceObserver2");
  }
  static {
    __name22(this, "PerformanceObserver");
  }
  static {
    __name222(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError222("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError222("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance222 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance222();
if (!("__unenv__" in performance222)) {
  const proto = Performance222.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance222)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance222, key, desc);
      }
    }
  }
}
globalThis.performance = performance222;
globalThis.Performance = Performance222;
globalThis.PerformanceEntry = PerformanceEntry222;
globalThis.PerformanceMark = PerformanceMark322;
globalThis.PerformanceMeasure = PerformanceMeasure222;
globalThis.PerformanceObserver = PerformanceObserver222;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList222;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming222;
var noop_default222 = Object.assign(() => {
}, { __unenv__: true });
var _console222 = globalThis.console;
var _ignoreErrors222 = true;
var _stderr222 = new Writable222();
var _stdout222 = new Writable222();
var log322 = _console222?.log ?? noop_default222;
var info322 = _console222?.info ?? log322;
var trace322 = _console222?.trace ?? info322;
var debug322 = _console222?.debug ?? log322;
var table322 = _console222?.table ?? log322;
var error322 = _console222?.error ?? log322;
var warn322 = _console222?.warn ?? error322;
var createTask322 = _console222?.createTask ?? /* @__PURE__ */ notImplemented222("console.createTask");
var clear322 = _console222?.clear ?? noop_default222;
var count322 = _console222?.count ?? noop_default222;
var countReset322 = _console222?.countReset ?? noop_default222;
var dir322 = _console222?.dir ?? noop_default222;
var dirxml322 = _console222?.dirxml ?? noop_default222;
var group322 = _console222?.group ?? noop_default222;
var groupEnd322 = _console222?.groupEnd ?? noop_default222;
var groupCollapsed322 = _console222?.groupCollapsed ?? noop_default222;
var profile322 = _console222?.profile ?? noop_default222;
var profileEnd322 = _console222?.profileEnd ?? noop_default222;
var time322 = _console222?.time ?? noop_default222;
var timeEnd322 = _console222?.timeEnd ?? noop_default222;
var timeLog322 = _console222?.timeLog ?? noop_default222;
var timeStamp322 = _console222?.timeStamp ?? noop_default222;
var Console222 = _console222?.Console ?? /* @__PURE__ */ notImplementedClass222("console.Console");
var _times222 = /* @__PURE__ */ new Map();
var _stdoutErrorHandler222 = noop_default222;
var _stderrErrorHandler222 = noop_default222;
var workerdConsole222 = globalThis["console"];
var {
  assert: assert322,
  clear: clear2222,
  // @ts-expect-error undocumented public API
  context: context222,
  count: count2222,
  countReset: countReset2222,
  // @ts-expect-error undocumented public API
  createTask: createTask2222,
  debug: debug2222,
  dir: dir2222,
  dirxml: dirxml2222,
  error: error2222,
  group: group2222,
  groupCollapsed: groupCollapsed2222,
  groupEnd: groupEnd2222,
  info: info2222,
  log: log2222,
  profile: profile2222,
  profileEnd: profileEnd2222,
  table: table2222,
  time: time2222,
  timeEnd: timeEnd2222,
  timeLog: timeLog2222,
  timeStamp: timeStamp2222,
  trace: trace2222,
  warn: warn2222
} = workerdConsole222;
Object.assign(workerdConsole222, {
  Console: Console222,
  _ignoreErrors: _ignoreErrors222,
  _stderr: _stderr222,
  _stderrErrorHandler: _stderrErrorHandler222,
  _stdout: _stdout222,
  _stdoutErrorHandler: _stdoutErrorHandler222,
  _times: _times222
});
var console_default222 = workerdConsole222;
globalThis.console = console_default222;
var hrtime422 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name222(/* @__PURE__ */ __name22(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime2222(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime222"), "hrtime22"), "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name222(/* @__PURE__ */ __name22(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint222() {
  return BigInt(Date.now() * 1e6);
}, "bigint22"), "bigint2"), "bigint"), "bigint") });
var ReadStream222 = class {
  static {
    __name(this, "ReadStream22");
  }
  static {
    __name2(this, "ReadStream2");
  }
  static {
    __name22(this, "ReadStream");
  }
  static {
    __name222(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var WriteStream222 = class {
  static {
    __name(this, "WriteStream22");
  }
  static {
    __name2(this, "WriteStream2");
  }
  static {
    __name22(this, "WriteStream");
  }
  static {
    __name222(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3222, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2222) {
    return 1;
  }
  hasColors(count3222, env2222) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var NODE_VERSION222 = "22.14.0";
var Process222 = class _Process extends EventEmitter222 {
  static {
    __name(this, "_Process");
  }
  static {
    __name2(this, "_Process");
  }
  static {
    __name22(this, "_Process");
  }
  static {
    __name222(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter222.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream222(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream222(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream222(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2222) {
    this.#cwd = cwd2222;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION222}`;
  }
  get versions() {
    return { node: NODE_VERSION222 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError222("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError222("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError222("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError222("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError222("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError222("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError222("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError222("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError222("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError222("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError222("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError222("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError222("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError222("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError222("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError222("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError222("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented222("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented222("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented222("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented222("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented222("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented222("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name222(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess222 = globalThis["process"];
var getBuiltinModule222 = globalProcess222.getBuiltinModule;
var workerdProcess222 = getBuiltinModule222("node:process");
var unenvProcess222 = new Process222({
  env: globalProcess222.env,
  hrtime: hrtime422,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess222.nextTick
});
var { exit: exit222, features: features222, platform: platform222 } = workerdProcess222;
var {
  _channel: _channel222,
  _debugEnd: _debugEnd222,
  _debugProcess: _debugProcess222,
  _disconnect: _disconnect222,
  _events: _events222,
  _eventsCount: _eventsCount222,
  _exiting: _exiting222,
  _fatalException: _fatalException222,
  _getActiveHandles: _getActiveHandles222,
  _getActiveRequests: _getActiveRequests222,
  _handleQueue: _handleQueue222,
  _kill: _kill222,
  _linkedBinding: _linkedBinding222,
  _maxListeners: _maxListeners222,
  _pendingMessage: _pendingMessage222,
  _preload_modules: _preload_modules222,
  _rawDebug: _rawDebug222,
  _send: _send222,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier222,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier222,
  _tickCallback: _tickCallback222,
  abort: abort222,
  addListener: addListener222,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags222,
  arch: arch222,
  argv: argv222,
  argv0: argv0222,
  assert: assert2222,
  availableMemory: availableMemory222,
  binding: binding222,
  channel: channel222,
  chdir: chdir222,
  config: config222,
  connected: connected222,
  constrainedMemory: constrainedMemory222,
  cpuUsage: cpuUsage222,
  cwd: cwd222,
  debugPort: debugPort222,
  disconnect: disconnect222,
  dlopen: dlopen222,
  domain: domain222,
  emit: emit222,
  emitWarning: emitWarning222,
  env: env222,
  eventNames: eventNames222,
  execArgv: execArgv222,
  execPath: execPath222,
  exitCode: exitCode222,
  finalization: finalization222,
  getActiveResourcesInfo: getActiveResourcesInfo222,
  getegid: getegid222,
  geteuid: geteuid222,
  getgid: getgid222,
  getgroups: getgroups222,
  getMaxListeners: getMaxListeners222,
  getuid: getuid222,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback222,
  hrtime: hrtime3222,
  initgroups: initgroups222,
  kill: kill222,
  listenerCount: listenerCount222,
  listeners: listeners222,
  loadEnvFile: loadEnvFile222,
  mainModule: mainModule222,
  memoryUsage: memoryUsage222,
  moduleLoadList: moduleLoadList222,
  nextTick: nextTick222,
  off: off222,
  on: on222,
  once: once222,
  openStdin: openStdin222,
  permission: permission222,
  pid: pid222,
  ppid: ppid222,
  prependListener: prependListener222,
  prependOnceListener: prependOnceListener222,
  rawListeners: rawListeners222,
  reallyExit: reallyExit222,
  ref: ref222,
  release: release222,
  removeAllListeners: removeAllListeners222,
  removeListener: removeListener222,
  report: report222,
  resourceUsage: resourceUsage222,
  send: send222,
  setegid: setegid222,
  seteuid: seteuid222,
  setgid: setgid222,
  setgroups: setgroups222,
  setMaxListeners: setMaxListeners222,
  setSourceMapsEnabled: setSourceMapsEnabled222,
  setuid: setuid222,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback222,
  sourceMapsEnabled: sourceMapsEnabled222,
  stderr: stderr222,
  stdin: stdin222,
  stdout: stdout222,
  throwDeprecation: throwDeprecation222,
  title: title222,
  traceDeprecation: traceDeprecation222,
  umask: umask222,
  unref: unref222,
  uptime: uptime222,
  version: version222,
  versions: versions222
} = unenvProcess222;
var _process222 = {
  abort: abort222,
  addListener: addListener222,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags222,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback222,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback222,
  loadEnvFile: loadEnvFile222,
  sourceMapsEnabled: sourceMapsEnabled222,
  arch: arch222,
  argv: argv222,
  argv0: argv0222,
  chdir: chdir222,
  config: config222,
  connected: connected222,
  constrainedMemory: constrainedMemory222,
  availableMemory: availableMemory222,
  cpuUsage: cpuUsage222,
  cwd: cwd222,
  debugPort: debugPort222,
  dlopen: dlopen222,
  disconnect: disconnect222,
  emit: emit222,
  emitWarning: emitWarning222,
  env: env222,
  eventNames: eventNames222,
  execArgv: execArgv222,
  execPath: execPath222,
  exit: exit222,
  finalization: finalization222,
  features: features222,
  getBuiltinModule: getBuiltinModule222,
  getActiveResourcesInfo: getActiveResourcesInfo222,
  getMaxListeners: getMaxListeners222,
  hrtime: hrtime3222,
  kill: kill222,
  listeners: listeners222,
  listenerCount: listenerCount222,
  memoryUsage: memoryUsage222,
  nextTick: nextTick222,
  on: on222,
  off: off222,
  once: once222,
  pid: pid222,
  platform: platform222,
  ppid: ppid222,
  prependListener: prependListener222,
  prependOnceListener: prependOnceListener222,
  rawListeners: rawListeners222,
  release: release222,
  removeAllListeners: removeAllListeners222,
  removeListener: removeListener222,
  report: report222,
  resourceUsage: resourceUsage222,
  setMaxListeners: setMaxListeners222,
  setSourceMapsEnabled: setSourceMapsEnabled222,
  stderr: stderr222,
  stdin: stdin222,
  stdout: stdout222,
  title: title222,
  throwDeprecation: throwDeprecation222,
  traceDeprecation: traceDeprecation222,
  umask: umask222,
  uptime: uptime222,
  version: version222,
  versions: versions222,
  // @ts-expect-error old API
  domain: domain222,
  initgroups: initgroups222,
  moduleLoadList: moduleLoadList222,
  reallyExit: reallyExit222,
  openStdin: openStdin222,
  assert: assert2222,
  binding: binding222,
  send: send222,
  exitCode: exitCode222,
  channel: channel222,
  getegid: getegid222,
  geteuid: geteuid222,
  getgid: getgid222,
  getgroups: getgroups222,
  getuid: getuid222,
  setegid: setegid222,
  seteuid: seteuid222,
  setgid: setgid222,
  setgroups: setgroups222,
  setuid: setuid222,
  permission: permission222,
  mainModule: mainModule222,
  _events: _events222,
  _eventsCount: _eventsCount222,
  _exiting: _exiting222,
  _maxListeners: _maxListeners222,
  _debugEnd: _debugEnd222,
  _debugProcess: _debugProcess222,
  _fatalException: _fatalException222,
  _getActiveHandles: _getActiveHandles222,
  _getActiveRequests: _getActiveRequests222,
  _kill: _kill222,
  _preload_modules: _preload_modules222,
  _rawDebug: _rawDebug222,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier222,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier222,
  _tickCallback: _tickCallback222,
  _disconnect: _disconnect222,
  _handleQueue: _handleQueue222,
  _pendingMessage: _pendingMessage222,
  _channel: _channel222,
  _send: _send222,
  _linkedBinding: _linkedBinding222
};
var process_default222 = _process222;
globalThis.process = process_default222;
var CarnivalRoom = class {
  static {
    __name(this, "CarnivalRoom");
  }
  static {
    __name2(this, "CarnivalRoom");
  }
  static {
    __name22(this, "CarnivalRoom");
  }
  static {
    __name222(this, "CarnivalRoom");
  }
  constructor(state, env2222) {
    this.state = state;
    this.env = env2222;
  }
  async fetch(request) {
    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket upgrade", { status: 426 });
    }
    const [client, server] = Object.values(new WebSocketPair());
    this.state.acceptWebSocket(server);
    return new Response(null, { status: 101, webSocket: client });
  }
  async webSocketMessage(ws, raw) {
    let msg;
    try {
      msg = JSON.parse(raw);
    } catch {
      return;
    }
    const data = await this.state.storage.get("data") || {};
    const seq = await this.state.storage.get("seq") || 0;
    const id = msg.id;
    const _att = ws.deserializeAttachment() || {};
    const _isAdmin = _att.isAdmin === true;
    const _writeTyes = ["set", "update", "push", "remove"];
    if (_writeTyes.includes(msg.type)) {
      const _storedPin = getAt(data, "meta")?.adminPin;
      if (_storedPin && !_isAdmin) {
        ws.send(j({ type: "error", id, message: "unauthorized" }));
        return;
      }
    }
    switch (msg.type) {
      case "servertime":
        ws.send(j({ type: "servertime", id, ts: Date.now() }));
        break;
      case "create": {
        const existing = await this.state.storage.get("data");
        if (existing?.meta?.createdAt) {
          ws.send(j({ type: "error", id, message: "code_taken" }));
          break;
        }
        const meta = stamp(msg.meta);
        const expiresAt = meta.expiresAt || Date.now() + 7 * 24 * 60 * 60 * 1e3;
        meta.expiresAt = expiresAt;
        await this.state.storage.put("data", { meta });
        await this.state.storage.setAlarm(expiresAt);
        ws.send(j({ type: "created", id }));
        break;
      }
      case "get": {
        const val = getAt(data, msg.path);
        ws.send(j({ type: "snapshot", id, path: msg.path, data: val, seq }));
        break;
      }
      case "auth": {
        const storedPin = getAt(data, "meta")?.adminPin;
        if (!storedPin) {
          ws.serializeAttachment({ ..._att, isAdmin: true, authFails: 0 });
          ws.send(j({ type: "auth_ok", id }));
          break;
        }
        const fails = _att.authFails || 0;
        if (fails >= 5) {
          ws.send(j({ type: "auth_fail", id, message: "too_many_attempts" }));
          break;
        }
        if (String(msg.pin) === String(storedPin)) {
          ws.serializeAttachment({ ..._att, isAdmin: true, authFails: 0 });
          ws.send(j({ type: "auth_ok", id }));
        } else {
          ws.serializeAttachment({ ..._att, isAdmin: false, authFails: fails + 1 });
          ws.send(j({ type: "auth_fail", id, message: "wrong_pin" }));
        }
        break;
      }
      case "set": {
        const processed = stamp(msg.data);
        const next = setAt(data, msg.path, processed);
        const newSeq = seq + 1;
        await this.state.storage.put("data", next);
        await this.state.storage.put("seq", newSeq);
        ws.send(j({ type: "ack", id }));
        this.broadcast(msg.path, processed, newSeq);
        if (msg.path && msg.path.startsWith("results/")) {
          this.pushToFirebase(next, msg.path.slice(8), processed).catch(() => {
          });
        }
        break;
      }
      case "update": {
        const existing = getAt(data, msg.path) || {};
        const merged = { ...existing, ...stamp(msg.data) };
        const next = setAt(data, msg.path, merged);
        const newSeq = seq + 1;
        await this.state.storage.put("data", next);
        await this.state.storage.put("seq", newSeq);
        ws.send(j({ type: "ack", id }));
        this.broadcast(msg.path, merged, newSeq);
        if (msg.path && msg.path.startsWith("results/")) {
          this.pushToFirebase(next, msg.path.slice(8), merged).catch(() => {
          });
        }
        break;
      }
      case "push": {
        const existing = getAt(data, msg.path) || {};
        const key = "-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
        existing[key] = stamp(msg.data);
        const next = setAt(data, msg.path, existing);
        const newSeq = seq + 1;
        await this.state.storage.put("data", next);
        await this.state.storage.put("seq", newSeq);
        ws.send(j({ type: "pushed", id, key }));
        this.broadcast(msg.path, existing, newSeq);
        break;
      }
      case "remove": {
        const parts = msg.path.split("/");
        const leaf = parts.pop();
        const parent = getAt(data, parts.join("/"));
        if (parent && typeof parent === "object") {
          delete parent[leaf];
          const newSeq = seq + 1;
          await this.state.storage.put("data", data);
          await this.state.storage.put("seq", newSeq);
          this.broadcast(parts.join("/"), parent, newSeq);
        }
        ws.send(j({ type: "ack", id }));
        break;
      }
      case "subscribe": {
        const att = ws.deserializeAttachment() || {};
        const subs = new Set(att.subs || []);
        subs.add(msg.path);
        ws.serializeAttachment({ ...att, subs: [...subs] });
        const val = getAt(data, msg.path);
        ws.send(j({ type: "snapshot", path: msg.path, data: val, seq }));
        break;
      }
      case "unsubscribe": {
        const att = ws.deserializeAttachment() || {};
        const subs = new Set(att.subs || []);
        subs.delete(msg.path);
        ws.serializeAttachment({ ...att, subs: [...subs] });
        break;
      }
    }
  }
  // ── Firebase bridge: mirror published results to RTDB ──────────
  async pushToFirebase(stateData, resultKey, resultData) {
    const FB_API_KEY = "AIzaSyA-bNl8XqvZ7DQ6YftL9teXbqxYICBlPF8";
    const FB_DB_URL = "https://willy-district-sport-default-rtdb.asia-southeast1.firebasedatabase.app";
    const meta = stateData && stateData.meta ? stateData.meta : {};
    const school = meta.school || "";
    const sport = meta.sport || "";
    const name = meta.name || "";
    const carnivalCode = this.state.id && this.state.id.name ? this.state.id.name : "unknown";
    const authResp = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" + FB_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ returnSecureToken: true })
      }
    );
    if (!authResp.ok) return;
    const { idToken } = await authResp.json();
    await fetch(
      FB_DB_URL + "/carnivalResults/" + carnivalCode + "/meta.json?auth=" + idToken,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ school, sport, name, carnivalCode, updatedAt: Date.now() })
      }
    );
    await fetch(
      FB_DB_URL + "/carnivalResults/" + carnivalCode + "/results/" + resultKey + ".json?auth=" + idToken,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...resultData, _school: school, _carnivalCode: carnivalCode })
      }
    );
  }
  // ── DO alarm: fires at expiresAt, wipes everything ────────────
  async alarm() {
    await this.state.storage.deleteAll();
    for (const ws of this.state.getWebSockets()) {
      try {
        ws.close(1001, "Carnival expired");
      } catch {
      }
    }
  }
  async webSocketClose(ws) {
    try {
      ws.close();
    } catch {
    }
  }
  async webSocketError(ws) {
    try {
      ws.close();
    } catch {
    }
  }
  broadcast(changedPath, newValue, seq) {
    for (const session of this.state.getWebSockets()) {
      const att = session.deserializeAttachment() || {};
      const subs = att.subs || [];
      for (const sub of subs) {
        if (changedPath.startsWith(sub) || sub.startsWith(changedPath)) {
          try {
            session.send(j({ type: "snapshot", path: sub, data: newValue, seq }));
          } catch {
          }
          break;
        }
      }
    }
  }
};
var worker_default = {
  async fetch(request, env2222) {
    const url = new URL(request.url);
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, OPTIONS"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    const m = url.pathname.match(/^\/ws\/([A-Z0-9]{4,8})$/i);
    if (m) {
      const room = env2222.CARNIVAL_ROOM.get(env2222.CARNIVAL_ROOM.idFromName(m[1].toUpperCase()));
      return room.fetch(request);
    }
    if (url.pathname === "/ping") return new Response("pong", { headers: cors });
    const INDEX_HTML_B64 = "PCFET0NUWVBFIGh0bWw+CjxodG1sIGxhbmc9ImVuLUFVIj4KPGhlYWQ+CiAgPG1ldGEgY2hhcnNldD0iVVRGLTgiPgogIDxtZXRhIG5hbWU9InZpZXdwb3J0IiBjb250ZW50PSJ3aWR0aD1kZXZpY2Utd2lkdGgsIGluaXRpYWwtc2NhbGU9MSwgbWF4aW11bS1zY2FsZT0xLCB1c2VyLXNjYWxhYmxlPW5vIj4KICA8bWV0YSBuYW1lPSJhcHBsZS1tb2JpbGUtd2ViLWFwcC1jYXBhYmxlIiBjb250ZW50PSJ5ZXMiPgogIDxtZXRhIG5hbWU9ImFwcGxlLW1vYmlsZS13ZWItYXBwLXN0YXR1cy1iYXItc3R5bGUiIGNvbnRlbnQ9ImJsYWNrLXRyYW5zbHVjZW50Ij4KICA8bWV0YSBuYW1lPSJ0aGVtZS1jb2xvciIgY29udGVudD0iIzBkMTExNyI+CiAgPHRpdGxlPkNhcm5pdmFsIFRpbWluZzwvdGl0bGU+CiAgPHN0eWxlPgogICAgKiwgKjo6YmVmb3JlLCAqOjphZnRlciB7IGJveC1zaXppbmc6IGJvcmRlci1ib3g7IG1hcmdpbjogMDsgcGFkZGluZzogMDsgfQoKICAgIDpyb290IHsKICAgICAgLS1iZzogIzBkMTExNzsKICAgICAgLS1zdXJmYWNlOiAjMTYxYjIyOwogICAgICAtLXN1cmZhY2UyOiAjMjEyNjJkOwogICAgICAtLXN1cmZhY2UzOiAjMzAzNjNkOwogICAgICAtLWFjY2VudDogIzE0YjhhNjsKICAgICAgLS1hY2NlbnQyOiAjMDg5MWIyOwogICAgICAtLXRleHQ6ICNmMGY2ZmM7CiAgICAgIC0tbXV0ZWQ6ICM4Yjk0OWU7CiAgICAgIC0tc3VjY2VzczogIzNmYjk1MDsKICAgICAgLS13YXJuOiAjZDI5OTIyOwogICAgICAtLWRhbmdlcjogI2Y4NTE0OTsKICAgICAgLS1ib3JkZXI6ICMzMDM2M2Q7CiAgICB9CgogICAgaHRtbCwgYm9keSB7CiAgICAgIGhlaWdodDogMTAwJTsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tYmcpOwogICAgICBjb2xvcjogdmFyKC0tdGV4dCk7CiAgICAgIGZvbnQtZmFtaWx5OiAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsIHN5c3RlbS11aSwgc2Fucy1zZXJpZjsKICAgICAgZm9udC1zaXplOiAxNnB4OwogICAgICBsaW5lLWhlaWdodDogMS41OwogICAgICBvdmVyZmxvdy14OiBoaWRkZW47CiAgICB9CgogICAgLyog4pSA4pSAIFNjcmVlbnMg4pSA4pSAICovCiAgICAuc2NyZWVuIHsgZGlzcGxheTogbm9uZTsgbWluLWhlaWdodDogMTAwdmg7IH0KICAgIC5zY3JlZW4uYWN0aXZlIHsgZGlzcGxheTogYmxvY2s7IH0KCiAgICAvKiDilIDilIAgSGVhZGVyIOKUgOKUgCAqLwogICAgLmhlYWRlciB7CiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UpOwogICAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgdmFyKC0tc3VyZmFjZTMpOwogICAgICBwYWRkaW5nOiAxMnB4IDE2cHg7CiAgICAgIGRpc3BsYXk6IGZsZXg7CiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgIGdhcDogMTBweDsKICAgICAgcG9zaXRpb246IHN0aWNreTsKICAgICAgdG9wOiAwOwogICAgICB6LWluZGV4OiAxMDA7CiAgICB9CiAgICAubG9nby1iYWRnZSB7CiAgICAgIHdpZHRoOiAzMHB4OyBoZWlnaHQ6IDMwcHg7CiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWFjY2VudCk7CiAgICAgIGJvcmRlci1yYWRpdXM6IDdweDsKICAgICAgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgIGZvbnQtc2l6ZTogMTNweDsgZm9udC13ZWlnaHQ6IDkwMDsgY29sb3I6ICMwMDA7CiAgICAgIGZsZXgtc2hyaW5rOiAwOwogICAgICBsZXR0ZXItc3BhY2luZzogLTFweDsKICAgIH0KICAgIC5oZWFkZXItdGl0bGUgeyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDFyZW07IH0KICAgIC5oZWFkZXItc3ViIHsgZm9udC1zaXplOiAwLjc1cmVtOyBjb2xvcjogdmFyKC0tbXV0ZWQpOyB9CiAgICAuaGVhZGVyLXJpZ2h0IHsgbWFyZ2luLWxlZnQ6IGF1dG87IGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogOHB4OyB9CiAgICAuY29ubi1kb3QgewogICAgICB3aWR0aDogOHB4OyBoZWlnaHQ6IDhweDsgYm9yZGVyLXJhZGl1czogNTAlOwogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1tdXRlZCk7IGZsZXgtc2hyaW5rOiAwOwogICAgfQogICAgLmNvbm4tZG90LmxpdmUgeyBiYWNrZ3JvdW5kOiB2YXIoLS1zdWNjZXNzKTsgYm94LXNoYWRvdzogMCAwIDZweCB2YXIoLS1zdWNjZXNzKTsgfQoKICAgIC8qIOKUgOKUgCBDb250ZW50IOKUgOKUgCAqLwogICAgLmNvbnRlbnQgeyBwYWRkaW5nOiAxNnB4OyB9CgogICAgLyog4pSA4pSAIEhvbWUgU2NyZWVuIOKUgOKUgCAqLwogICAgLmhvbWUtaGVybyB7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsKICAgICAgcGFkZGluZzogNTJweCAyNHB4IDMycHg7CiAgICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsIHJnYmEoMjAsMTg0LDE2NiwwLjA1KSAwJSwgdHJhbnNwYXJlbnQgMTAwJSk7CiAgICB9CiAgICAuaG9tZS1sb2dvIHsKICAgICAgd2lkdGg6IDgwcHg7IGhlaWdodDogODBweDsKICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50KSAwJSwgdmFyKC0tYWNjZW50MikgMTAwJSk7CiAgICAgIGJvcmRlci1yYWRpdXM6IDIycHg7CiAgICAgIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBmb250LXNpemU6IDM0cHg7IGZvbnQtd2VpZ2h0OiA5MDA7IGNvbG9yOiAjMDAwOwogICAgICBtYXJnaW46IDAgYXV0byAyNHB4OwogICAgICBib3gtc2hhZG93OiAwIDEycHggNDBweCByZ2JhKDIwLDE4NCwxNjYsMC4zNSk7CiAgICAgIGxldHRlci1zcGFjaW5nOiAtMnB4OwogICAgfQogICAgLmhvbWUtdGl0bGUgewogICAgICBmb250LXNpemU6IDIuMnJlbTsgZm9udC13ZWlnaHQ6IDkwMDsKICAgICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50KSAwJSwgIzY3ZThmOSAxMDAlKTsKICAgICAgLXdlYmtpdC1iYWNrZ3JvdW5kLWNsaXA6IHRleHQ7IC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDsKICAgICAgYmFja2dyb3VuZC1jbGlwOiB0ZXh0OwogICAgICBtYXJnaW4tYm90dG9tOiA4cHg7IGxldHRlci1zcGFjaW5nOiAtMXB4OwogICAgfQogICAgLmhvbWUtdGFnbGluZSB7IGNvbG9yOiB2YXIoLS1tdXRlZCk7IGZvbnQtc2l6ZTogMXJlbTsgbWFyZ2luLWJvdHRvbTogMTJweDsgfQogICAgLmhvbWUtc3BvcnRzIHsKICAgICAgZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IGdhcDogMTBweDsgZmxleC13cmFwOiB3cmFwOwogICAgICBtYXJnaW4tYm90dG9tOiAzNnB4OwogICAgfQogICAgLmhvbWUtc3BvcnQtcGlsbCB7CiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UyKTsKICAgICAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tc3VyZmFjZTMpOwogICAgICBib3JkZXItcmFkaXVzOiAyMHB4OwogICAgICBwYWRkaW5nOiA1cHggMTJweDsKICAgICAgZm9udC1zaXplOiAwLjhyZW07CiAgICAgIGNvbG9yOiB2YXIoLS1tdXRlZCk7CiAgICB9CiAgICAuaG9tZS1zcG9ydC1waWxsIHNwYW4geyBtYXJnaW4tcmlnaHQ6IDVweDsgfQoKICAgIC8qIOKUgOKUgCBCdXR0b25zIOKUgOKUgCAqLwogICAgLmJ0biB7CiAgICAgIGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsKICAgICAgcGFkZGluZzogMTRweCAyMHB4OwogICAgICBib3JkZXI6IG5vbmU7IGJvcmRlci1yYWRpdXM6IDEwcHg7CiAgICAgIGZvbnQtc2l6ZTogMXJlbTsgZm9udC13ZWlnaHQ6IDYwMDsKICAgICAgY3Vyc29yOiBwb2ludGVyOyB0cmFuc2l0aW9uOiBhbGwgMC4xNXM7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OwogICAgICBmb250LWZhbWlseTogaW5oZXJpdDsKICAgIH0KICAgIC5idG46YWN0aXZlIHsgdHJhbnNmb3JtOiBzY2FsZSgwLjk3KTsgfQogICAgLmJ0bi1wcmltYXJ5IHsgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50KTsgY29sb3I6ICMwMDA7IH0KICAgIC5idG4tcHJpbWFyeTpob3ZlciB7IGZpbHRlcjogYnJpZ2h0bmVzcygwLjkpOyB9CiAgICAuYnRuLXNlY29uZGFyeSB7CiAgICAgIGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UyKTsgY29sb3I6IHZhcigtLXRleHQpOwogICAgICBib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1zdXJmYWNlMyk7CiAgICB9CiAgICAuYnRuLXNlY29uZGFyeTpob3ZlciB7IGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UzKTsgfQogICAgLmJ0bi1kYW5nZXIgeyBiYWNrZ3JvdW5kOiB2YXIoLS1kYW5nZXIpOyBjb2xvcjogI2ZmZjsgfQogICAgLmJ0bi1zdWNjZXNzIHsgYmFja2dyb3VuZDogdmFyKC0tc3VjY2Vzcyk7IGNvbG9yOiAjMDAwOyB9CiAgICAuYnRuLWdvIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VjY2Vzcyk7IGNvbG9yOiAjMDAwOwogICAgICBmb250LXNpemU6IDEuNXJlbTsgZm9udC13ZWlnaHQ6IDkwMDsKICAgICAgcGFkZGluZzogMjJweDsKICAgIH0KICAgIC5idG4tc3RvcCB7CiAgICAgIGJhY2tncm91bmQ6IHZhcigtLWRhbmdlcik7IGNvbG9yOiAjZmZmOwogICAgICBmb250LXNpemU6IDEuNnJlbTsgZm9udC13ZWlnaHQ6IDkwMDsKICAgICAgcGFkZGluZzogMDsgbWluLWhlaWdodDogMTMwcHg7CiAgICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7IGJvcmRlcjogbm9uZTsKICAgICAgY3Vyc29yOiBwb2ludGVyOyB3aWR0aDogMTAwJTsKICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsKICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMXM7CiAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0OwogICAgfQogICAgLmJ0bi1zdG9wOmFjdGl2ZSB7IHRyYW5zZm9ybTogc2NhbGUoMC45Nyk7IH0KICAgIC5idG4tdGFwIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tYWNjZW50KTsgY29sb3I6ICMwMDA7CiAgICAgIGZvbnQtd2VpZ2h0OiA5MDA7IHBhZGRpbmc6IDA7CiAgICAgIG1pbi1oZWlnaHQ6IDIyMHB4OyBib3JkZXItcmFkaXVzOiAxOHB4OwogICAgICBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogY29sdW1uOwogICAgICBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgICAgZ2FwOiA2cHg7IHdpZHRoOiAxMDAlOyBib3JkZXI6IG5vbmU7CiAgICAgIGN1cnNvcjogcG9pbnRlcjsgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsKICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMDhzOyB1c2VyLXNlbGVjdDogbm9uZTsKICAgICAgZm9udC1mYW1pbHk6IGluaGVyaXQ7CiAgICB9CiAgICAuYnRuLXRhcDphY3RpdmUgeyB0cmFuc2Zvcm06IHNjYWxlKDAuOTYpOyBmaWx0ZXI6IGJyaWdodG5lc3MoMC44NSk7IH0KICAgIC5idG4tdGFwIC50YXAtbWFpbiB7IGZvbnQtc2l6ZTogMi40cmVtOyBmb250LXdlaWdodDogOTAwOyBsaW5lLWhlaWdodDogMTsgfQogICAgLmJ0bi10YXAgLnRhcC1zdWIgeyBmb250LXNpemU6IDFyZW07IGZvbnQtZmFtaWx5OiAnTWVubG8nLCdTRiBNb25vJyxtb25vc3BhY2U7IG9wYWNpdHk6IDAuNzU7IH0KICAgIC5idG4tc20geyBwYWRkaW5nOiA4cHggMTRweDsgZm9udC1zaXplOiAwLjg1cmVtOyB3aWR0aDogYXV0bzsgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9CiAgICAuYnRuLWljb24gewogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlMik7IGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXN1cmZhY2UzKTsKICAgICAgY29sb3I6IHZhcigtLXRleHQpOyBwYWRkaW5nOiA4cHggMTJweDsKICAgICAgd2lkdGg6IGF1dG87IGRpc3BsYXk6IGlubGluZS1mbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBnYXA6IDVweDsKICAgICAgZm9udC1zaXplOiAwLjgycmVtOyBib3JkZXItcmFkaXVzOiA4cHg7CiAgICAgIGZvbnQtZmFtaWx5OiBpbmhlcml0OwogICAgfQogICAgLmJ0bltkaXNhYmxlZF0geyBvcGFjaXR5OiAwLjM4OyBwb2ludGVyLWV2ZW50czogbm9uZTsgfQoKICAgIC8qIOKUgOKUgCBGb3JtIOKUgOKUgCAqLwogICAgLmZvcm0tZ3JvdXAgeyBtYXJnaW4tYm90dG9tOiAxNnB4OyB9CiAgICBsYWJlbCB7CiAgICAgIGRpc3BsYXk6IGJsb2NrOyBmb250LXNpemU6IDAuNzhyZW07IGZvbnQtd2VpZ2h0OiA2MDA7CiAgICAgIGNvbG9yOiB2YXIoLS1tdXRlZCk7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7CiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjA2ZW07IG1hcmdpbi1ib3R0b206IDZweDsKICAgIH0KICAgIGlucHV0W3R5cGU9dGV4dF0sIGlucHV0W3R5cGU9bnVtYmVyXSwgc2VsZWN0LCB0ZXh0YXJlYSB7CiAgICAgIHdpZHRoOiAxMDAlOyBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlMik7CiAgICAgIGJvcmRlcjogMS41cHggc29saWQgdmFyKC0tc3VyZmFjZTMpOyBib3JkZXItcmFkaXVzOiA4cHg7CiAgICAgIGNvbG9yOiB2YXIoLS10ZXh0KTsgcGFkZGluZzogMTJweCAxNHB4OwogICAgICBmb250LXNpemU6IDFyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0OwogICAgICBvdXRsaW5lOiBub25lOyB0cmFuc2l0aW9uOiBib3JkZXItY29sb3IgMC4xNXM7CiAgICB9CiAgICBpbnB1dDpmb2N1cywgc2VsZWN0OmZvY3VzIHsgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQpOyB9CiAgICBzZWxlY3Qgb3B0aW9uIHsgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZTIpOyB9CgogICAgLyog4pSA4pSAIFNwb3J0IFBpY2tlciDilIDilIAgKi8KICAgIC5zcG9ydC1ncmlkIHsgZGlzcGxheTogZ3JpZDsgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAxZnIgMWZyOyBnYXA6IDEwcHg7IG1hcmdpbi1ib3R0b206IDE2cHg7IH0KICAgIC5zcG9ydC1idG4gewogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlMik7IGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLXN1cmZhY2UzKTsKICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgcGFkZGluZzogMTZweCAxMnB4OwogICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7IGN1cnNvcjogcG9pbnRlcjsKICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMTVzOyAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OwogICAgfQogICAgLnNwb3J0LWJ0bi5hY3RpdmUgeyBib3JkZXItY29sb3I6IHZhcigtLWFjY2VudCk7IGJhY2tncm91bmQ6IHJnYmEoMjAsMTg0LDE2NiwwLjEpOyB9CiAgICAuc3BvcnQtYnRuIC5zLWljb24geyBmb250LXNpemU6IDIuMnJlbTsgbWFyZ2luLWJvdHRvbTogNnB4OyB9CiAgICAuc3BvcnQtYnRuIC5zLWxhYmVsIHsgZm9udC1zaXplOiAwLjg1cmVtOyBmb250LXdlaWdodDogNzAwOyB9CiAgICAuc3BvcnQtYnRuIC5zLWRlc2MgeyBmb250LXNpemU6IDAuNzJyZW07IGNvbG9yOiB2YXIoLS1tdXRlZCk7IG1hcmdpbi10b3A6IDJweDsgfQoKICAgIC8qIOKUgOKUgCBUaWVyIFBpbGxzIOKUgOKUgCAqLwogICAgLnBpbGwtcm93IHsgZGlzcGxheTogZmxleDsgZ2FwOiA4cHg7IGZsZXgtd3JhcDogd3JhcDsgfQogICAgLnBpbGwgewogICAgICBwYWRkaW5nOiA2cHggMTRweDsgYm9yZGVyLXJhZGl1czogMjBweDsKICAgICAgYm9yZGVyOiAxLjVweCBzb2xpZCB2YXIoLS1zdXJmYWNlMyk7IGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UyKTsKICAgICAgZm9udC1zaXplOiAwLjhyZW07IGZvbnQtd2VpZ2h0OiA2MDA7CiAgICAgIGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogYWxsIDAuMTVzOwogICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OwogICAgfQogICAgLnBpbGwuYWN0aXZlIHsgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQpOyBjb2xvcjogdmFyKC0tYWNjZW50KTsgYmFja2dyb3VuZDogcmdiYSgyMCwxODQsMTY2LDAuMSk7IH0KCiAgICAvKiDilIDilIAgQ2FyZCDilIDilIAgKi8KICAgIC5jYXJkIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7IGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLXN1cmZhY2UzKTsKICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgcGFkZGluZzogMTZweDsgbWFyZ2luLWJvdHRvbTogMTJweDsKICAgIH0KICAgIC5jYXJkLXRpdGxlIHsKICAgICAgZm9udC1zaXplOiAwLjczcmVtOyBmb250LXdlaWdodDogNzAwOyBjb2xvcjogdmFyKC0tbXV0ZWQpOwogICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC4wN2VtOyBtYXJnaW4tYm90dG9tOiAxMHB4OwogICAgfQoKICAgIC8qIOKUgOKUgCBCYWRnZSDilIDilIAgKi8KICAgIC5iYWRnZSB7CiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jazsgcGFkZGluZzogM3B4IDlweDsKICAgICAgYm9yZGVyLXJhZGl1czogMjBweDsgZm9udC1zaXplOiAwLjdyZW07CiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7IHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7IGxldHRlci1zcGFjaW5nOiAwLjA1ZW07CiAgICB9CiAgICAuYmFkZ2UtbGl2ZSB7IGJhY2tncm91bmQ6IHJnYmEoNjMsMTg1LDgwLDAuMTUpOyBjb2xvcjogdmFyKC0tc3VjY2Vzcyk7IGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoNjMsMTg1LDgwLDAuMyk7IH0KICAgIC5iYWRnZS1hcm1lZCB7IGJhY2tncm91bmQ6IHJnYmEoMjEwLDE1MywzNCwwLjE1KTsgY29sb3I6IHZhcigtLXdhcm4pOyBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDIxMCwxNTMsMzQsMC4zKTsgfQogICAgLmJhZGdlLWlkbGUgeyBiYWNrZ3JvdW5kOiByZ2JhKDEzOSwxNDgsMTU4LDAuMTUpOyBjb2xvcjogdmFyKC0tbXV0ZWQpOyBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDEzOSwxNDgsMTU4LDAuMik7IH0KICAgIC5iYWRnZS1kb25lIHsgYmFja2dyb3VuZDogcmdiYSgyMCwxODQsMTY2LDAuMTUpOyBjb2xvcjogdmFyKC0tYWNjZW50KTsgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyMCwxODQsMTY2LDAuMyk7IH0KCiAgICAvKiDilIDilIAgQ2xvY2sg4pSA4pSAICovCiAgICAuY2xvY2sgewogICAgICBmb250LWZhbWlseTogJ01lbmxvJywnU0YgTW9ubycsJ0NvdXJpZXIgTmV3Jyxtb25vc3BhY2U7CiAgICAgIGZvbnQtc2l6ZTogNC4ycmVtOyBmb250LXdlaWdodDogNzAwOwogICAgICBsZXR0ZXItc3BhY2luZzogLTNweDsgY29sb3I6IHZhcigtLWFjY2VudCk7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgbGluZS1oZWlnaHQ6IDE7IHBhZGRpbmc6IDE0cHggMDsKICAgIH0KICAgIC5jbG9jay5zdG9wcGVkIHsgY29sb3I6IHZhcigtLW11dGVkKTsgfQoKICAgIC8qIOKUgOKUgCBMYW5lIFJvdyDilIDilIAgKi8KICAgIC5sYW5lLXJvdyB7CiAgICAgIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICAgIHBhZGRpbmc6IDEwcHggMTJweDsgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZTIpOwogICAgICBib3JkZXItcmFkaXVzOiA4cHg7IG1hcmdpbi1ib3R0b206IDZweDsgZ2FwOiAxMHB4OwogICAgfQogICAgLmxhbmUtbnVtIHsKICAgICAgd2lkdGg6IDI4cHg7IGhlaWdodDogMjhweDsgYm9yZGVyLXJhZGl1czogNTAlOwogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlMyk7CiAgICAgIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGp1c3RpZnktY29udGVudDogY2VudGVyOwogICAgICBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDAuODVyZW07IGZsZXgtc2hyaW5rOiAwOwogICAgfQogICAgLmxhbmUtbmFtZSB7IGZsZXg6IDE7IGZvbnQtd2VpZ2h0OiA1MDA7IH0KICAgIC5sYW5lLXRpbWUgeyBmb250LWZhbWlseTogJ01lbmxvJyxtb25vc3BhY2U7IGZvbnQtd2VpZ2h0OiA3MDA7IGZvbnQtc2l6ZTogMS4wNXJlbTsgfQogICAgLmNvbmYtSElHSCB7IGNvbG9yOiB2YXIoLS1zdWNjZXNzKTsgZm9udC1zaXplOiAwLjdyZW07IH0KICAgIC5jb25mLU9LIHsgY29sb3I6IHZhcigtLWFjY2VudCk7IGZvbnQtc2l6ZTogMC43cmVtOyB9CiAgICAuY29uZi1DSEVDSyB7IGNvbG9yOiB2YXIoLS13YXJuKTsgZm9udC1zaXplOiAwLjdyZW07IH0KICAgIC5jb25mLUxPVyB7IGNvbG9yOiB2YXIoLS1kYW5nZXIpOyBmb250LXNpemU6IDAuN3JlbTsgfQoKICAgIC8qIOKUgOKUgCBQbGFjZSBSb3cgKFhDKSDilIDilIAgKi8KICAgIC5wbGFjZS1yb3cgewogICAgICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBwYWRkaW5nOiAxMHB4IDEycHg7IGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UyKTsKICAgICAgYm9yZGVyLXJhZGl1czogOHB4OyBtYXJnaW4tYm90dG9tOiA2cHg7IGdhcDogMTBweDsKICAgIH0KICAgIC5tZWRhbCB7CiAgICAgIHdpZHRoOiAzMnB4OyBoZWlnaHQ6IDMycHg7IGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7IGZvbnQtc2l6ZTogMC45cmVtOyBmbGV4LXNocmluazogMDsKICAgIH0KICAgIC5tZWRhbC5wMSB7IGJhY2tncm91bmQ6ICNGRkQ3MDA7IGNvbG9yOiAjMDAwOyB9CiAgICAubWVkYWwucDIgeyBiYWNrZ3JvdW5kOiAjQzBDMEMwOyBjb2xvcjogIzAwMDsgfQogICAgLm1lZGFsLnAzIHsgYmFja2dyb3VuZDogI0NEN0YzMjsgY29sb3I6ICNmZmY7IH0KICAgIC5tZWRhbC5wTiB7IGJhY2tncm91bmQ6IHZhcigtLXN1cmZhY2UzKTsgY29sb3I6IHZhcigtLW11dGVkKTsgfQoKICAgIC8qIOKUgOKUgCBUYXAgQ291bnRlciDilIDilIAgKi8KICAgIC50YXAtY291bnRlciB7IHRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZzogMTZweCAwIDhweDsgfQogICAgLnRhcC1wbGFjZSB7CiAgICAgIGZvbnQtc2l6ZTogNS41cmVtOyBmb250LXdlaWdodDogOTAwOyBsaW5lLWhlaWdodDogMTsKICAgICAgY29sb3I6IHZhcigtLWFjY2VudCk7CiAgICAgIGZvbnQtZmFtaWx5OiAnTWVubG8nLCdTRiBNb25vJyxtb25vc3BhY2U7CiAgICB9CiAgICAudGFwLWxhYmVsIHsgZm9udC1zaXplOiAwLjc4cmVtOyBjb2xvcjogdmFyKC0tbXV0ZWQpOyB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlOyBsZXR0ZXItc3BhY2luZzogMC4xZW07IH0KCiAgICAvKiDilIDilIAgUm9sZSBHcmlkIOKUgOKUgCAqLwogICAgLnJvbGUtZ3JpZCB7IGRpc3BsYXk6IGdyaWQ7IGdyaWQtdGVtcGxhdGUtY29sdW1uczogMWZyIDFmcjsgZ2FwOiAxMHB4OyB9CiAgICAucm9sZS1jYXJkIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZTIpOyBib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1zdXJmYWNlMyk7CiAgICAgIGJvcmRlci1yYWRpdXM6IDEycHg7IHBhZGRpbmc6IDIwcHggMTJweDsgdGV4dC1hbGlnbjogY2VudGVyOwogICAgICBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IGFsbCAwLjE1czsKICAgICAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDsKICAgIH0KICAgIC5yb2xlLWNhcmQ6aG92ZXIsIC5yb2xlLWNhcmQ6YWN0aXZlIHsgYm9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQpOyBiYWNrZ3JvdW5kOiByZ2JhKDIwLDE4NCwxNjYsMC4wOCk7IH0KICAgIC5yb2xlLWNhcmQgLnItaWNvbiB7IGZvbnQtc2l6ZTogMi4ycmVtOyBtYXJnaW4tYm90dG9tOiA4cHg7IH0KICAgIC5yb2xlLWNhcmQgLnItbGFiZWwgeyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDAuOXJlbTsgfQogICAgLnJvbGUtY2FyZCAuci1kZXNjIHsgZm9udC1zaXplOiAwLjczcmVtOyBjb2xvcjogdmFyKC0tbXV0ZWQpOyBtYXJnaW4tdG9wOiAzcHg7IH0KICAgIC5yb2xlLWNhcmQuZnVsbCB7IGdyaWQtY29sdW1uOiAxIC8gLTE7IH0KCiAgICAvKiDilIDilIAgVmlkZW8gRmluaXNoIOKUgOKUgCAqLwogICAgLnZmLXByZXZpZXcgeyB3aWR0aDoxMDAlOyBhc3BlY3QtcmF0aW86MTYvOTsgYmFja2dyb3VuZDojMDAwOyBib3JkZXItcmFkaXVzOjEycHg7IG9iamVjdC1maXQ6Y292ZXI7IGRpc3BsYXk6YmxvY2s7IH0KICAgIC52Zi1jYW52YXMgIHsgd2lkdGg6MTAwJTsgYXNwZWN0LXJhdGlvOjE2Lzk7IGJhY2tncm91bmQ6IzExMTsgYm9yZGVyLXJhZGl1czoxMnB4OyBkaXNwbGF5OmJsb2NrOyB0b3VjaC1hY3Rpb246bm9uZTsgfQogICAgLnZmLXRpbWUtYmlnIHsgZm9udC1zaXplOjIuOHJlbTsgZm9udC13ZWlnaHQ6ODAwOyBmb250LWZhbWlseTonTWVubG8nLCdDb3VyaWVyIE5ldycsbW9ub3NwYWNlOyB0ZXh0LWFsaWduOmNlbnRlcjsgbGV0dGVyLXNwYWNpbmc6LTFweDsgbGluZS1oZWlnaHQ6MTsgfQogICAgLnZmLXRpbWUtc3ViIHsgZm9udC1zaXplOjAuNzhyZW07IGNvbG9yOnZhcigtLW11dGVkKTsgdGV4dC1hbGlnbjpjZW50ZXI7IG1hcmdpbi10b3A6NHB4OyB9CiAgICAudmYtZnJhbWUtcm93IHsgZGlzcGxheTpmbGV4OyBnYXA6MTBweDsgYWxpZ24taXRlbXM6Y2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyBtYXJnaW46MTBweCAwOyB9Ci52Zi1sYW5lLWJ0biB7IHBhZGRpbmc6NnB4IDEycHg7Ym9yZGVyLXJhZGl1czo2cHg7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZS0yKTtjb2xvcjp2YXIoLS10ZXh0KTtmb250LXNpemU6MC44NXJlbTtjdXJzb3I6cG9pbnRlcjsgfQoudmYtbGFuZS1idG4uYWN0aXZlIHsgYmFja2dyb3VuZDp2YXIoLS1hY2NlbnQpO2NvbG9yOiMwMDA7Ym9yZGVyLWNvbG9yOnZhcigtLWFjY2VudCk7Zm9udC13ZWlnaHQ6NzAwOyB9CiAgICAudmYtc3RlcCB7IHdpZHRoOjU2cHg7IGhlaWdodDo1NnB4OyBib3JkZXItcmFkaXVzOjUwJTsgZm9udC1zaXplOjEuNHJlbTsgZm9udC13ZWlnaHQ6NzAwOyBiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpOyBib3JkZXI6MnB4IHNvbGlkIHZhcigtLWJvcmRlcik7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyBjdXJzb3I6cG9pbnRlcjsgdXNlci1zZWxlY3Q6bm9uZTsgLXdlYmtpdC11c2VyLXNlbGVjdDpub25lOyB9CiAgICAudmYtc3RlcDphY3RpdmUgeyBiYWNrZ3JvdW5kOnZhcigtLWFjY2VudCk7IGNvbG9yOiNmZmY7IH0KICAgIC52Zi1zY3J1YmJlciB7IGZsZXg6MTsgYWNjZW50LWNvbG9yOnZhcigtLWFjY2VudCk7IH0KICAgIC52Zi1tYXJrLXJvdyB7IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBnYXA6MTBweDsgcGFkZGluZzoxMHB4IDA7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7IH0KICAgIC52Zi1tYXJrLXJvdzpsYXN0LWNoaWxkIHsgYm9yZGVyLWJvdHRvbTpub25lOyB9CiAgICAudmYtbWFyay1wb3MgIHsgd2lkdGg6MjhweDsgaGVpZ2h0OjI4cHg7IGJvcmRlci1yYWRpdXM6NTAlOyBiYWNrZ3JvdW5kOnZhcigtLWFjY2VudCk7IGNvbG9yOiNmZmY7IGZvbnQtd2VpZ2h0OjcwMDsgZm9udC1zaXplOjAuODJyZW07IGRpc3BsYXk6ZmxleDsgYWxpZ24taXRlbXM6Y2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyBmbGV4LXNocmluazowOyB9CiAgICAudmYtbWFyay1wb3MuZW1wdHkgeyBiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpOyBjb2xvcjp2YXIoLS1tdXRlZCk7IGJvcmRlcjoycHggc29saWQgdmFyKC0tYm9yZGVyKTsgfQogICAgLnZmLW1hcmstbmFtZSB7IGZsZXg6MTsgZm9udC13ZWlnaHQ6NjAwOyBmb250LXNpemU6MC45cmVtOyB9CiAgICAudmYtbWFyay10aW1lIHsgZm9udC1mYW1pbHk6J01lbmxvJyxtb25vc3BhY2U7IGZvbnQtc2l6ZTowLjlyZW07IGNvbG9yOnZhcigtLWFjY2VudCk7IGZvbnQtd2VpZ2h0OjcwMDsgbWluLXdpZHRoOjU4cHg7IHRleHQtYWxpZ246cmlnaHQ7IH0KICAgIC52Zi1tYXJrLWJ0biAgeyBwYWRkaW5nOjZweCAxNHB4OyBmb250LXNpemU6MC44cmVtOyBib3JkZXItcmFkaXVzOjhweDsgYmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTsgYm9yZGVyOjEuNXB4IHNvbGlkIHZhcigtLWJvcmRlcik7IGZvbnQtd2VpZ2h0OjYwMDsgY3Vyc29yOnBvaW50ZXI7IH0KICAgIC52Zi1tYXJrLWJ0bjphY3RpdmUgeyBiYWNrZ3JvdW5kOnZhcigtLWFjY2VudCk7IGNvbG9yOiNmZmY7IGJvcmRlci1jb2xvcjp2YXIoLS1hY2NlbnQpOyB9CiAgICAudmYtbWFyay1idG4uZG9uZSB7IGJhY2tncm91bmQ6cmdiYSgyMCwxODQsMTY2LDAuMTIpOyBib3JkZXItY29sb3I6dmFyKC0tYWNjZW50KTsgY29sb3I6dmFyKC0tYWNjZW50KTsgfQogICAgLnZmLXJlYyB7IGRpc3BsYXk6aW5saW5lLWZsZXg7IGFsaWduLWl0ZW1zOmNlbnRlcjsgZ2FwOjZweDsgZm9udC1zaXplOjAuODJyZW07IGZvbnQtd2VpZ2h0OjcwMDsgY29sb3I6I2VmNDQ0NDsgfQogICAgLnZmLXJlYy1kb3QgeyB3aWR0aDoxMHB4OyBoZWlnaHQ6MTBweDsgYm9yZGVyLXJhZGl1czo1MCU7IGJhY2tncm91bmQ6I2VmNDQ0NDsgYW5pbWF0aW9uOnZmLXB1bHNlIDFzIGluZmluaXRlOyB9CiAgICBAa2V5ZnJhbWVzIHZmLXB1bHNlIHsgMCUsMTAwJXtvcGFjaXR5OjF9IDUwJXtvcGFjaXR5OjAuM30gfQoKICAgIC8qIOKUgOKUgCBDb3VudGRvd24gT3ZlcmxheSDilIDilIAgKi8KICAgICNjb3VudGRvd24tb3ZlcmxheSB7CiAgICAgIGRpc3BsYXk6IG5vbmU7IHBvc2l0aW9uOiBmaXhlZDsgaW5zZXQ6IDA7CiAgICAgIGJhY2tncm91bmQ6IHJnYmEoMTMsMTcsMjMsMC45Nyk7IHotaW5kZXg6IDIwMDsKICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7CiAgICB9CiAgICAjY291bnRkb3duLW92ZXJsYXkuYWN0aXZlIHsgZGlzcGxheTogZmxleDsgfQogICAgI2NvdW50ZG93bi1udW0gewogICAgICBmb250LXNpemU6IDExcmVtOyBmb250LXdlaWdodDogOTAwOwogICAgICBmb250LWZhbWlseTogJ01lbmxvJywnU0YgTW9ubycsbW9ub3NwYWNlOwogICAgICBsaW5lLWhlaWdodDogMTsgdHJhbnNpdGlvbjogY29sb3IgMC4xczsKICAgIH0KICAgICNjb3VudGRvd24tbGFiZWwgewogICAgICBmb250LXNpemU6IDEuMXJlbTsgY29sb3I6IHZhcigtLW11dGVkKTsKICAgICAgbWFyZ2luLXRvcDogMTZweDsgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTsgbGV0dGVyLXNwYWNpbmc6IDAuMTVlbTsKICAgIH0KCiAgICAvKiDilIDilIAgRmxhc2ggT3ZlcmxheSDilIDilIAgKi8KICAgICNmbGFzaC1vdmVybGF5IHsKICAgICAgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGZpeGVkOyBpbnNldDogMDsKICAgICAgei1pbmRleDogMjUwOyBwb2ludGVyLWV2ZW50czogbm9uZTsKICAgIH0KICAgICNmbGFzaC1vdmVybGF5LnJlY2FsbCB7IGJhY2tncm91bmQ6IHJnYmEoMjQ4LDgxLDczLDAuODIpOyBkaXNwbGF5OiBibG9jazsgfQogICAgI2ZsYXNoLW92ZXJsYXkuZ28geyBiYWNrZ3JvdW5kOiByZ2JhKDYzLDE4NSw4MCwwLjQ1KTsgZGlzcGxheTogYmxvY2s7IH0KICAgICN0YXAtZmxhc2ggewogICAgICBkaXNwbGF5OiBub25lOyBwb3NpdGlvbjogZml4ZWQ7IGluc2V0OiAwOwogICAgICBiYWNrZ3JvdW5kOiByZ2JhKDIwLDE4NCwxNjYsMC4yOCk7IHotaW5kZXg6IDE5OTsgcG9pbnRlci1ldmVudHM6IG5vbmU7CiAgICB9CiAgICAjdGFwLWZsYXNoLnNob3cgeyBkaXNwbGF5OiBibG9jazsgfQoKICAgIC8qIOKUgOKUgCBKb2luIENvZGUg4pSA4pSAICovCiAgICAuam9pbi1jb2RlIHsKICAgICAgZm9udC1zaXplOiAzLjJyZW07IGZvbnQtZmFtaWx5OiAnTWVubG8nLG1vbm9zcGFjZTsKICAgICAgZm9udC13ZWlnaHQ6IDkwMDsgY29sb3I6IHZhcigtLWFjY2VudCk7CiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjsgbGV0dGVyLXNwYWNpbmc6IDEycHg7IHBhZGRpbmc6IDIwcHg7CiAgICB9CiAgICAucXItd3JhcCB7IHRleHQtYWxpZ246IGNlbnRlcjsgcGFkZGluZzogMTJweCAwOyB9CiAgICAucXItd3JhcCBpbWcgeyBib3JkZXItcmFkaXVzOiAxMHB4OyBtYXgtd2lkdGg6IDE4MHB4OyB9CgogICAgLyog4pSA4pSAIE1vZGFsIOKUgOKUgCAqLwogICAgLm1vZGFsLWJhY2tkcm9wIHsKICAgICAgZGlzcGxheTogbm9uZTsgcG9zaXRpb246IGZpeGVkOyBpbnNldDogMDsKICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjcyKTsgei1pbmRleDogNDAwOwogICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7CiAgICB9CiAgICAubW9kYWwtYmFja2Ryb3AuYWN0aXZlIHsgZGlzcGxheTogZmxleDsgfQogICAgLm1vZGFsIHsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZSk7IGJvcmRlci1yYWRpdXM6IDIwcHggMjBweCAwIDA7CiAgICAgIHBhZGRpbmc6IDI0cHggMjBweCA0NHB4OyB3aWR0aDogMTAwJTsKICAgICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkIHZhcigtLXN1cmZhY2UzKTsKICAgIH0KICAgIC5tb2RhbC10aXRsZSB7IGZvbnQtc2l6ZTogMS4xcmVtOyBmb250LXdlaWdodDogNzAwOyBtYXJnaW4tYm90dG9tOiAxMHB4OyB9CiAgICAubW9kYWwtYm9keSB7IGNvbG9yOiB2YXIoLS1tdXRlZCk7IG1hcmdpbi1ib3R0b206IDIwcHg7IGZvbnQtc2l6ZTogMC45NXJlbTsgfQoKICAgIC8qIOKUgOKUgCBUb2FzdCDilIDilIAgKi8KICAgICN0b2FzdCB7CiAgICAgIHBvc2l0aW9uOiBmaXhlZDsgYm90dG9tOiAyOHB4OyBsZWZ0OiA1MCU7CiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKSB0cmFuc2xhdGVZKDgwcHgpOwogICAgICBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlKTsgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tc3VyZmFjZTMpOwogICAgICBib3JkZXItcmFkaXVzOiAyNHB4OyBwYWRkaW5nOiAxMHB4IDIwcHg7CiAgICAgIGZvbnQtc2l6ZTogMC45cmVtOyBmb250LXdlaWdodDogNTAwOwogICAgICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC4yOHMgY3ViaWMtYmV6aWVyKDAuMzQsMS41NiwwLjY0LDEpOwogICAgICB6LWluZGV4OiAzNTA7IHdoaXRlLXNwYWNlOiBub3dyYXA7CiAgICAgIGJveC1zaGFkb3c6IDAgOHB4IDMycHggcmdiYSgwLDAsMCwwLjUpOwogICAgfQogICAgI3RvYXN0LnNob3cgeyB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSkgdHJhbnNsYXRlWSgwKTsgfQoKICAgIC8qIOKUgOKUgCBVdGlsaXR5IOKUgOKUgCAqLwogICAgLnN0YWNrIHsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IGNvbHVtbjsgZ2FwOiAxMHB4OyB9CiAgICAucm93IHsgZGlzcGxheTogZmxleDsgZ2FwOiAxMHB4OyB9CiAgICAucm93ID4gLmJ0biB7IGZsZXg6IDE7IH0KICAgIC5kaXZpZGVyIHsgYm9yZGVyOiBub25lOyBib3JkZXItdG9wOiAxcHggc29saWQgdmFyKC0tc3VyZmFjZTMpOyBtYXJnaW46IDE2cHggMDsgfQogICAgLnRleHQtY2VudGVyIHsgdGV4dC1hbGlnbjogY2VudGVyOyB9CiAgICAudGV4dC1tdXRlZCB7IGNvbG9yOiB2YXIoLS1tdXRlZCk7IH0KICAgIC50ZXh0LXNtIHsgZm9udC1zaXplOiAwLjg1cmVtOyB9CiAgICAudGV4dC14cyB7IGZvbnQtc2l6ZTogMC43NXJlbTsgfQogICAgLmZvbnQtbW9ubyB7IGZvbnQtZmFtaWx5OiAnTWVubG8nLCdTRiBNb25vJyxtb25vc3BhY2U7IH0KICAgIC5tdC04IHsgbWFyZ2luLXRvcDogOHB4OyB9CiAgICAubXQtMTYgeyBtYXJnaW4tdG9wOiAxNnB4OyB9CiAgICAubXQtMjQgeyBtYXJnaW4tdG9wOiAyNHB4OyB9CiAgICAubXQtMzIgeyBtYXJnaW4tdG9wOiAzMnB4OyB9CiAgICAuaGlkZGVuIHsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9CiAgICAuZmxleCB7IGRpc3BsYXk6IGZsZXg7IH0KICAgIC5pdGVtcy1jZW50ZXIgeyBhbGlnbi1pdGVtczogY2VudGVyOyB9CiAgICAuZ2FwLTggeyBnYXA6IDhweDsgfQoKICAgIC8qIOKUgOKUgCBYQyBuYW1lIGlucHV0IGlubGluZSDilIDilIAgKi8KICAgIC54Yy1uYW1lLWlucHV0IHsKICAgICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IGJvcmRlcjogbm9uZTsKICAgICAgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCB2YXIoLS1zdXJmYWNlMyk7CiAgICAgIGJvcmRlci1yYWRpdXM6IDA7IHBhZGRpbmc6IDJweCAwOwogICAgICBmb250LXNpemU6IDAuOTVyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0OwogICAgICBjb2xvcjogdmFyKC0tdGV4dCk7IHdpZHRoOiAxMDAlOyBvdXRsaW5lOiBub25lOwogICAgfQogICAgLnhjLW5hbWUtaW5wdXQ6Zm9jdXMgeyBib3JkZXItYm90dG9tLWNvbG9yOiB2YXIoLS1hY2NlbnQpOyB9CgogICAgLyog4pSA4pSAIEFkbWluIExhbmUgSW5wdXQgUm93IOKUgOKUgCAqLwogICAgLnN0YXR1cy1idG4gewogIHBhZGRpbmc6IDNweCA3cHg7IGJvcmRlci1yYWRpdXM6IDZweDsgZm9udC1zaXplOiAuNzJyZW07IGZvbnQtd2VpZ2h0OiA3MDA7CiAgYm9yZGVyOiAxLjVweCBzb2xpZCB2YXIoLS1ib3JkZXIpOyBiYWNrZ3JvdW5kOiB2YXIoLS1zdXJmYWNlMik7IGNvbG9yOiB2YXIoLS1tdXRlZCk7CiAgY3Vyc29yOiBwb2ludGVyOyBsZXR0ZXItc3BhY2luZzogLjA0ZW07IHRyYW5zaXRpb246IGFsbCAuMTVzOwp9Ci5zdGF0dXMtYnRuLmFjdGl2ZS1kbnMgeyBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwxNTgsMTEsLjE4KTsgY29sb3I6ICNmNTllMGI7IGJvcmRlci1jb2xvcjogI2Y1OWUwYjsgfQouc3RhdHVzLWJ0bi5hY3RpdmUtZG5mIHsgYmFja2dyb3VuZDogcmdiYSgyMzksNjgsNjgsLjE4KTsgY29sb3I6ICNlZjQ0NDQ7IGJvcmRlci1jb2xvcjogI2VmNDQ0NDsgfQouYWRtaW4tbGFuZS1yb3cgewogICAgICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOwogICAgICBnYXA6IDhweDsgcGFkZGluZzogNnB4IDA7CiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCB2YXIoLS1zdXJmYWNlMyk7CiAgICB9CiAgICAuYWRtaW4tbGFuZS1yb3c6bGFzdC1jaGlsZCB7IGJvcmRlci1ib3R0b206IG5vbmU7IH0KICAgIC5hZG1pbi1sYW5lLW51bSB7CiAgICAgIHdpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7IGJvcmRlci1yYWRpdXM6IDUwJTsKICAgICAgYmFja2dyb3VuZDogdmFyKC0tc3VyZmFjZTMpOwogICAgICBkaXNwbGF5OiBmbGV4OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgICAgZm9udC13ZWlnaHQ6IDcwMDsgZm9udC1zaXplOiAwLjhyZW07IGZsZXgtc2hyaW5rOiAwOwogICAgICBjb2xvcjogdmFyKC0tbXV0ZWQpOwogICAgfQogICAgLmFkbWluLWxhbmUtbmFtZS1pbnB1dCB7CiAgICAgIGZsZXg6IDE7IGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyBib3JkZXI6IG5vbmU7CiAgICAgIGJvcmRlci1yYWRpdXM6IDA7IHBhZGRpbmc6IDZweCAwOwogICAgICBmb250LXNpemU6IDAuOTVyZW07IGZvbnQtZmFtaWx5OiBpbmhlcml0OwogICAgICBjb2xvcjogdmFyKC0tdGV4dCk7IG91dGxpbmU6IG5vbmU7CiAgICB9CgogICAgQG1lZGlhIChtYXgtd2lkdGg6IDM4MHB4KSB7CiAgICAgIC5jbG9jayB7IGZvbnQtc2l6ZTogMy40cmVtOyB9CiAgICAgIC50YXAtcGxhY2UgeyBmb250LXNpemU6IDQuNXJlbTsgfQogICAgICAjY291bnRkb3duLW51bSB7IGZvbnQtc2l6ZTogOXJlbTsgfQogICAgfQoKICAgIC8qIOKUgOKUgCBEZW1vIENhcmQg4pSA4pSAICovCiAgICAuZGVtby1jYXJkIHsKICAgICAgZGlzcGxheTogZmxleDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgZ2FwOiAxNHB4OwogICAgICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDI0NSwxNTgsMTEsMC4xMikgMCUsIHJnYmEoMjQ1LDE1OCwxMSwwLjA2KSAxMDAlKTsKICAgICAgYm9yZGVyOiAxLjVweCBzb2xpZCByZ2JhKDI0NSwxNTgsMTEsMC4zNSk7CiAgICAgIGJvcmRlci1yYWRpdXM6IDE0cHg7IHBhZGRpbmc6IDE2cHg7CiAgICAgIGN1cnNvcjogcG9pbnRlcjsgdHJhbnNpdGlvbjogYWxsIDAuMTVzOwogICAgICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6IHRyYW5zcGFyZW50OwogICAgICBtYXJnaW4tdG9wOiAyMHB4OwogICAgfQogICAgLmRlbW8tY2FyZDphY3RpdmUgeyB0cmFuc2Zvcm06IHNjYWxlKDAuOTgpOyBmaWx0ZXI6IGJyaWdodG5lc3MoMC45Myk7IH0KICAgIC5kZW1vLWNhcmQtaWNvbiB7IGZvbnQtc2l6ZTogMnJlbTsgZmxleC1zaHJpbms6IDA7IH0KICAgIC5kZW1vLWNhcmQtdGl0bGUgeyBmb250LXdlaWdodDogNzAwOyBmb250LXNpemU6IDAuOTVyZW07IGNvbG9yOiAjZjU5ZTBiOyB9CiAgICAuZGVtby1jYXJkLWRlc2MgeyBmb250LXNpemU6IDAuNzhyZW07IGNvbG9yOiB2YXIoLS1tdXRlZCk7IG1hcmdpbi10b3A6IDJweDsgfQogICAgLmRlbW8tY2FyZC1hcnJvdyB7IG1hcmdpbi1sZWZ0OiBhdXRvOyBmb250LXNpemU6IDEuM3JlbTsgY29sb3I6ICNmNTllMGI7IGZsZXgtc2hyaW5rOiAwOyB9CgogICAgLyog4pSA4pSAIERlbW8gQmFubmVyIChhZG1pbiBzY3JlZW4pIOKUgOKUgCAqLwogICAgLmRlbW8tYmFubmVyIHsKICAgICAgYmFja2dyb3VuZDogcmdiYSgyNDUsMTU4LDExLDAuMTApOwogICAgICBib3JkZXI6IDEuNXB4IHNvbGlkIHJnYmEoMjQ1LDE1OCwxMSwwLjMwKTsKICAgICAgYm9yZGVyLXJhZGl1czogMTJweDsgcGFkZGluZzogMTRweCAxNnB4OwogICAgICBtYXJnaW4tYm90dG9tOiAxNHB4OwogICAgfQogICAgLmRlbW8tYmFubmVyLXRvcCB7CiAgICAgIGRpc3BsYXk6IGZsZXg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGdhcDogMTBweDsgbWFyZ2luLWJvdHRvbTogMTBweDsKICAgIH0KICAgIC5kZW1vLWNvZGUtcGlsbCB7CiAgICAgIGZvbnQtZmFtaWx5OiAnTWVubG8nLCdTRiBNb25vJyxtb25vc3BhY2U7CiAgICAgIGZvbnQtc2l6ZTogMS42cmVtOyBmb250LXdlaWdodDogOTAwOyBsZXR0ZXItc3BhY2luZzogNHB4OwogICAgICBjb2xvcjogI2Y1OWUwYjsgYmFja2dyb3VuZDogcmdiYSgyNDUsMTU4LDExLDAuMTIpOwogICAgICBib3JkZXI6IDEuNXB4IHNvbGlkIHJnYmEoMjQ1LDE1OCwxMSwwLjMpOwogICAgICBib3JkZXItcmFkaXVzOiA4cHg7IHBhZGRpbmc6IDRweCAxNHB4OwogICAgICBjdXJzb3I6IHBvaW50ZXI7IHRyYW5zaXRpb246IGFsbCAwLjE1czsgZGlzcGxheTogaW5saW5lLWJsb2NrOwogICAgfQogICAgLmRlbW8tY29kZS1waWxsOmFjdGl2ZSB7IHRyYW5zZm9ybTogc2NhbGUoMC45Nik7IH0KICAgIC5kZW1vLWJhbm5lci1oaW50IHsgZm9udC1zaXplOiAwLjc4cmVtOyBjb2xvcjogdmFyKC0tbXV0ZWQpOyB9CiAgICAuZGVtby1iYW5uZXItaGludCBzdHJvbmcgeyBjb2xvcjogdmFyKC0tdGV4dCk7IH0KICAgIC5kZW1vLXFyIHsgbWFyZ2luLXRvcDogMTBweDsgfQogIAogICAgLyog4pSA4pSAIFhDIFBob3RvIEJ1cnN0ICsgRmluaXNoIENhcmQg4pSA4pSAICovCiAgICAuZmluaXNoLXBob3RvLXdyYXAgewogICAgICB3aWR0aDoxMDAlO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTMpO2JvcmRlci1yYWRpdXM6MTBweDsKICAgICAgb3ZlcmZsb3c6aGlkZGVuO21hcmdpbi1ib3R0b206OHB4O3Bvc2l0aW9uOnJlbGF0aXZlOwogICAgICBhc3BlY3QtcmF0aW86NC8zO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjsKICAgIH0KICAgIC5maW5pc2gtcGhvdG8td3JhcCBpbWcgeyB3aWR0aDoxMDAlO2hlaWdodDoxMDAlO29iamVjdC1maXQ6Y292ZXI7ZGlzcGxheTpibG9jazsgfQogICAgLmZpbmlzaC1waG90by1jYXB0dXJpbmcgewogICAgICBjb2xvcjp2YXIoLS1tdXRlZCk7Zm9udC1zaXplOjAuOHJlbTt0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjE2cHg7CiAgICB9CiAgICAuZmluaXNoLXBob3RvLXdyYXAgLm9jci1iYWRnZSB7CiAgICAgIHBvc2l0aW9uOmFic29sdXRlO3RvcDo2cHg7cmlnaHQ6NnB4OwogICAgICBiYWNrZ3JvdW5kOnJnYmEoMjAsMTg0LDE2NiwwLjkpO2NvbG9yOiNmZmY7CiAgICAgIGZvbnQtc2l6ZTowLjdyZW07Zm9udC13ZWlnaHQ6NzAwO3BhZGRpbmc6M3B4IDdweDtib3JkZXItcmFkaXVzOjIwcHg7CiAgICB9CiAgICAuYmliLXNjYW4tcm93IHsgZGlzcGxheTpmbGV4O2dhcDo2cHg7bWFyZ2luLWJvdHRvbTo4cHg7IH0KICAgIC8qIFF1YWxpZmllciBiYWRnZSAqLwogICAgLnF1YWxpZmllci1jaGlwIHsKICAgICAgZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjRweDsKICAgICAgYmFja2dyb3VuZDpyZ2JhKDIzNCwxNzksOCwwLjIpO2NvbG9yOiNlYWIzMDg7CiAgICAgIGZvbnQtc2l6ZTowLjY1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjJweCA3cHg7Ym9yZGVyLXJhZGl1czoyMHB4OwogICAgICBib3JkZXI6MXB4IHNvbGlkIHJnYmEoMjM0LDE3OSw4LDAuNCk7CiAgICB9CiAgICAvKiBGaW5pc2ggY2FyZCBzaGFyZSBvdmVybGF5ICovCiAgICAjZmluaXNoLWNhcmQtb3ZlcmxheSB7CiAgICAgIHBvc2l0aW9uOmZpeGVkO2luc2V0OjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC44NSk7ei1pbmRleDo5OTkwOwogICAgICBkaXNwbGF5OmZsZXg7ZmxleC1kaXJlY3Rpb246Y29sdW1uO2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOwogICAgICBwYWRkaW5nOjE2cHg7Z2FwOjEycHg7CiAgICB9CiAgICAjZmluaXNoLWNhcmQtb3ZlcmxheSBjYW52YXMsCiAgICAjZmluaXNoLWNhcmQtb3ZlcmxheSBpbWcgeyBtYXgtd2lkdGg6bWluKDMyMHB4LDg1dncpO2JvcmRlci1yYWRpdXM6MTJweDsgfQogICAgI2ZpbmlzaC1jYXJkLW92ZXJsYXkgLmNhcmQtYWN0aW9ucyB7IGRpc3BsYXk6ZmxleDtnYXA6MTBweDtmbGV4LXdyYXA6d3JhcDtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyOyB9CgogIAogICAgLyogdjguNS4wIOKAlCBhdXRvLWRldGVjdCAqLwogICAgI3hjLWxpbmUtc2V0dXAtb3ZlcmxheSB7CiAgICAgIGRpc3BsYXk6bm9uZTtwb3NpdGlvbjpmaXhlZDtpbnNldDowO3otaW5kZXg6OTk5NjtiYWNrZ3JvdW5kOiMwMDA7CiAgICAgIGZsZXgtZGlyZWN0aW9uOmNvbHVtbjsKICAgIH0KICAgICN4Yy1saW5lLXNldHVwLW92ZXJsYXkgdmlkZW8gewogICAgICB3aWR0aDoxMDAlO2hlaWdodDoxMDAlO29iamVjdC1maXQ6Y292ZXI7cG9zaXRpb246YWJzb2x1dGU7aW5zZXQ6MDsKICAgIH0KICAgICN4Yy1saW5lLWNhbnZhcy1vdmVybGF5IHsKICAgICAgcG9zaXRpb246YWJzb2x1dGU7aW5zZXQ6MDt3aWR0aDoxMDAlO2hlaWdodDoxMDAlO3RvdWNoLWFjdGlvbjpub25lOwogICAgfQogICAgI3hjLWxpbmUtaW5zdHJ1Y3Rpb24gewogICAgICBwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MTZweDtsZWZ0OjA7cmlnaHQ6MDt0ZXh0LWFsaWduOmNlbnRlcjsKICAgICAgY29sb3I6I2ZmZjtmb250LXNpemU6MXJlbTtmb250LXdlaWdodDo2MDA7CiAgICAgIGJhY2tncm91bmQ6cmdiYSgwLDAsMCwuNjUpO3BhZGRpbmc6MTBweDtwb2ludGVyLWV2ZW50czpub25lOwogICAgfQogICAgI3hjLWxpbmUtc2V0dXAtYnRucyB7CiAgICAgIHBvc2l0aW9uOmFic29sdXRlO2JvdHRvbTowO2xlZnQ6MDtyaWdodDowOwogICAgICBkaXNwbGF5OmZsZXg7Z2FwOjEwcHg7cGFkZGluZzoxNnB4O2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNyk7CiAgICB9CiAgICAueGMtZGV0ZWN0LWJhciB7CiAgICAgIGRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjEwcHg7CiAgICAgIHBhZGRpbmc6OHB4IDE0cHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlLTIpO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7CiAgICB9CiAgICAueGMtZGV0ZWN0LXB1bHNlIHsKICAgICAgd2lkdGg6MTJweDtoZWlnaHQ6MTJweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kOiNlZjQ0NDQ7ZmxleC1zaHJpbms6MDsKICAgICAgYW5pbWF0aW9uOnhjcHVsc2UgMXMgaW5maW5pdGU7CiAgICB9CiAgICBAa2V5ZnJhbWVzIHhjcHVsc2UgewogICAgICAwJSwxMDAle29wYWNpdHk6MTt0cmFuc2Zvcm06c2NhbGUoMSl9CiAgICAgIDUwJXtvcGFjaXR5Oi40O3RyYW5zZm9ybTpzY2FsZSguOCl9CiAgICB9CiAgICAueGMtYXV0by1jb3VudGRvd24gewogICAgICBkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoyOHB4O2hlaWdodDoyOHB4O2JvcmRlci1yYWRpdXM6NTAlOwogICAgICBiYWNrZ3JvdW5kOnZhcigtLWFjY2VudCk7Y29sb3I6I2ZmZjtmb250LXNpemU6Ljc1cmVtO2ZvbnQtd2VpZ2h0OjcwMDsKICAgICAgdGV4dC1hbGlnbjpjZW50ZXI7bGluZS1oZWlnaHQ6MjhweDtmbGV4LXNocmluazowOwogICAgfQoKICAgIDwvc3R5bGU+CjxsaW5rIHJlbD0iaWNvbiIgdHlwZT0iaW1hZ2Uvc3ZnK3htbCIgaHJlZj0iZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSclMjMxYTU2ZGInIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJz48Y2lyY2xlIGN4PScxMicgY3k9JzgnIHI9JzYnLz48cGF0aCBkPSdNMTUuNDc3IDEyLjg5IDE3IDIybC01LTMtNSAzIDEuNTIzLTkuMTEnLz48L3N2Zz4iPjxtZXRhIG5hbWU9InJvYm90cyIgY29udGVudD0iaW5kZXgsIGZvbGxvdyI+CjxsaW5rIHJlbD0iY2Fub25pY2FsIiBocmVmPSJodHRwczovL2Nhcm5pdmFsdGltaW5nLmNvbS8iPjxtZXRhIHByb3BlcnR5PSJvZzp0aXRsZSIgY29udGVudD0iQ2Fybml2YWwgVGltaW5nIOKAlCBMaXZlIFJhY2UgTWFuYWdlbWVudCBmb3IgU2Nob29sIENhcm5pdmFscyI+PG1ldGEgcHJvcGVydHk9Im9nOmRlc2NyaXB0aW9uIiBjb250ZW50PSJSZWFsLXRpbWUgcmFjZSB0aW1pbmcgZm9yIHNjaG9vbCBhdGhsZXRpY3MsIHN3aW1taW5nIGFuZCBjcm9zcyBjb3VudHJ5IGNhcm5pdmFscy4gTXVsdGktZGV2aWNlLCBsaXZlIHJlc3VsdHMsIFFSIHBhaXJpbmcuIEZyZWUgdG8gdXNlLiI+PG1ldGEgcHJvcGVydHk9Im9nOnVybCIgY29udGVudD0iaHR0cHM6Ly9jYXJuaXZhbHRpbWluZy5jb20vIj48bWV0YSBwcm9wZXJ0eT0ib2c6dHlwZSIgY29udGVudD0id2Vic2l0ZSI+PG1ldGEgcHJvcGVydHk9Im9nOmxvY2FsZSIgY29udGVudD0iZW5fQVUiPjxtZXRhIHByb3BlcnR5PSJvZzpzaXRlX25hbWUiIGNvbnRlbnQ9IkNhcm5pdmFsIFRpbWluZyI+PG1ldGEgbmFtZT0idHdpdHRlcjpjYXJkIiBjb250ZW50PSJzdW1tYXJ5X2xhcmdlX2ltYWdlIj48bWV0YSBuYW1lPSJ0d2l0dGVyOnRpdGxlIiBjb250ZW50PSJDYXJuaXZhbCBUaW1pbmcg4oCUIExpdmUgUmFjZSBNYW5hZ2VtZW50IGZvciBTY2hvb2wgQ2Fybml2YWxzIj48bWV0YSBuYW1lPSJ0d2l0dGVyOmRlc2NyaXB0aW9uIiBjb250ZW50PSJSZWFsLXRpbWUgcmFjZSB0aW1pbmcgZm9yIHNjaG9vbCBhdGhsZXRpY3MsIHN3aW1taW5nIGFuZCBjcm9zcyBjb3VudHJ5IGNhcm5pdmFscy4gTXVsdGktZGV2aWNlLCBsaXZlIHJlc3VsdHMsIFFSIHBhaXJpbmcuIEZyZWUgdG8gdXNlLiI+PHNjcmlwdCB0eXBlPSJhcHBsaWNhdGlvbi9sZCtqc29uIj57CiAgIkBjb250ZXh0IjogImh0dHBzOi8vc2NoZW1hLm9yZyIsCiAgIkB0eXBlIjogIk9yZ2FuaXphdGlvbiIsCiAgIm5hbWUiOiAiQ2Fybml2YWwgVGltaW5nIiwKICAiYWx0ZXJuYXRlTmFtZSI6ICJTcG9ydCBQb3J0YWwiLAogICJ1cmwiOiAiaHR0cHM6Ly9jYXJuaXZhbHRpbWluZy5jb20iLAogICJsb2dvIjogImh0dHBzOi8vY2Fybml2YWx0aW1pbmcuY29tL2Zhdmljb24uc3ZnIiwKICAiZGVzY3JpcHRpb24iOiAiU2Nob29sIHNwb3J0IG1hbmFnZW1lbnQgcGxhdGZvcm0g4oCUIGNhcm5pdmFscywgbGl2ZSB0aW1pbmcsIGRpc3RyaWN0IGh1YiwgcGFyZW50LWZhY2luZyByZXN1bHRzLiIsCiAgImFkZHJlc3MiOiB7IkB0eXBlIjogIlBvc3RhbEFkZHJlc3MiLCAiYWRkcmVzc0NvdW50cnkiOiAiQVUiLCAiYWRkcmVzc1JlZ2lvbiI6ICJWSUMifSwKICAiZm91bmRlciI6IHsiQHR5cGUiOiAiUGVyc29uIiwgIm5hbWUiOiAiUGFkZHkgR2FsbGl2YW4ifSwKICAibGVnYWxOYW1lIjogIkx1Y2sgRHJhZ29uIFB0eSBMdGQiLAogICJ0YXhJRCI6ICJBQk4gNjQgNjk3IDQzNCA4OTgiLAogICJlbWFpbCI6ICJpbmZvQHNwb3J0cG9ydGFsLmNvbS5hdSIsCiAgImFyZWFTZXJ2ZWQiOiB7IkB0eXBlIjogIkNvdW50cnkiLCAibmFtZSI6ICJBdXN0cmFsaWEifSwKICAia25vd3NBYm91dCI6IFsiU2Nob29sIHNwb3J0IiwgIkF0aGxldGljcyBjYXJuaXZhbHMiLCAiU3dpbW1pbmcgY2Fybml2YWxzIiwgIkNyb3NzIGNvdW50cnkiLCAiTGl2ZSBldmVudCB0aW1pbmciXQp9PC9zY3JpcHQ+PHNjcmlwdCBzcmM9Imh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vdGVzc2VyYWN0LmpzQDUvZGlzdC90ZXNzZXJhY3QubWluLmpzIj48L3NjcmlwdD4KPC9oZWFkPgo8Ym9keT4KCjwhLS0gWEMgcGhvdG8gYnVyc3QgY2FtZXJhIGVsZW1lbnRzIC0tPgo8dmlkZW8gaWQ9InhjLWNhbSIgYXV0b3BsYXkgcGxheXNpbmxpbmUgbXV0ZWQgc3R5bGU9ImRpc3BsYXk6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDoxcHg7aGVpZ2h0OjFweCI+PC92aWRlbz4KPGNhbnZhcyBpZD0ieGMtY2FwIiBzdHlsZT0iZGlzcGxheTpub25lIj48L2NhbnZhcz4KCjxkaXYgaWQ9InJlY29ubmVjdC1iYW5uZXIiIHN0eWxlPSJkaXNwbGF5Om5vbmU7cG9zaXRpb246Zml4ZWQ7dG9wOjA7bGVmdDowO3JpZ2h0OjA7ei1pbmRleDo5OTk5O2JhY2tncm91bmQ6I2Y1OWUwYjtjb2xvcjojMDAwO3RleHQtYWxpZ246Y2VudGVyO3BhZGRpbmc6OHB4IDE2cHg7Zm9udC1zaXplOi45cmVtO2ZvbnQtd2VpZ2h0OjYwMDtsZXR0ZXItc3BhY2luZzouMDJlbTsiPgogIOKaoSBSZWNvbm5lY3RpbmfigKYKPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIFNDUkVFTjogSE9NRQrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxkaXYgaWQ9InNjcmVlbi1ob21lIiBjbGFzcz0ic2NyZWVuIGFjdGl2ZSI+CiAgPGRpdiBjbGFzcz0iaG9tZS1oZXJvIj4KICAgIDxkaXYgY2xhc3M9ImhvbWUtbG9nbyI+Q1Q8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhvbWUtdGl0bGUiPkNhcm5pdmFsIFRpbWluZzwvZGl2PgogICAgPGRpdiBjbGFzcz0iaG9tZS10YWdsaW5lIj5SZWFsLXRpbWUgdGltaW5nIGZvciBzY2hvb2wgYXRobGV0aWNzLCBzd2ltbWluZyAmYW1wOyBjcm9zcyBjb3VudHJ5PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJob21lLXNwb3J0cyI+CiAgICAgIDxkaXYgY2xhc3M9ImhvbWUtc3BvcnQtcGlsbCI+PHNwYW4+PHN2ZyB3aWR0aD0nMjInIGhlaWdodD0nMjInIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBhcmlhLWhpZGRlbj0ndHJ1ZScgc3R5bGU9J3ZlcnRpY2FsLWFsaWduOm1pZGRsZSc+PHBvbHlsaW5lIHBvaW50cz0nMjIgMTIgMTggMTIgMTUgMjEgOSAzIDYgMTIgMiAxMicvPjwvc3ZnPjwvc3Bhbj5UcmFjayAmIEZpZWxkPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImhvbWUtc3BvcnQtcGlsbCI+PHNwYW4+PHN2ZyB3aWR0aD0nMjInIGhlaWdodD0nMjInIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBhcmlhLWhpZGRlbj0ndHJ1ZScgc3R5bGU9J3ZlcnRpY2FsLWFsaWduOm1pZGRsZSc+PHBhdGggZD0nTTIgMjBzMi0yIDUtMiA1IDIgNyAyIDUtMiA3LTIgMyAxIDMgMU0yIDE2czItMiA1LTIgNSAyIDcgMiA1LTIgNy0yIDMgMSAzIDEnLz48Y2lyY2xlIGN4PScxNCcgY3k9JzUnIHI9JzInLz48L3N2Zz48L3NwYW4+U3dpbW1pbmc8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iaG9tZS1zcG9ydC1waWxsIj48c3Bhbj48c3ZnIHdpZHRoPScyMicgaGVpZ2h0PScyMicgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGFyaWEtaGlkZGVuPSd0cnVlJyBzdHlsZT0ndmVydGljYWwtYWxpZ246bWlkZGxlJz48cGF0aCBkPSdNMTIgMjJWOE01IDhsNy02IDcgNk0zIDIyaDE4TTkgMjJWMTZoNnY2Jy8+PC9zdmc+PC9zcGFuPkNyb3NzIENvdW50cnk8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9ImNvbnRlbnQiPgogICAgPGRpdiBjbGFzcz0ic3RhY2siPgogICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiIG9uY2xpY2s9InNob3dTY3JlZW4oJ3NldHVwJykiPjxzdmcgd2lkdGg9JzIyJyBoZWlnaHQ9JzIyJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgYXJpYS1oaWRkZW49J3RydWUnIHN0eWxlPSd2ZXJ0aWNhbC1hbGlnbjptaWRkbGUnPjxyZWN0IHdpZHRoPScyMCcgaGVpZ2h0PScxNCcgeD0nMicgeT0nNicgcng9JzInLz48bGluZSB4MT0nMicgeDI9JzIyJyB5MT0nMTAnIHkyPScxMCcvPjxwYXRoIGQ9J005IDZWMmg2djQnLz48L3N2Zz4gTmV3IENhcm5pdmFsPC9idXR0b24+CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJzaG93U2NyZWVuKCdqb2luLXNjcmVlbicpIj48c3ZnIHdpZHRoPScyMicgaGVpZ2h0PScyMicgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGFyaWEtaGlkZGVuPSd0cnVlJyBzdHlsZT0ndmVydGljYWwtYWxpZ246bWlkZGxlJz48cmVjdCB4PSc1JyB5PScyJyB3aWR0aD0nMTQnIGhlaWdodD0nMjAnIHJ4PScyJy8+PHBhdGggZD0nTTEyIDE4aC4wMScvPjwvc3ZnPiBKb2luIENhcm5pdmFsPC9idXR0b24+CiAgICA8L2Rpdj4KCiAgICA8YSBocmVmPSJodHRwczovL3Nwb3J0Y2Fybml2YWwuY29tLmF1L3dkMjYiIHRhcmdldD0iX2JsYW5rIiByZWw9Im5vb3BlbmVyIiBjbGFzcz0id2QyNi1saW5rLWJhbm5lciI+CiAgICAgIDxzdmcgd2lkdGg9JzIwJyBoZWlnaHQ9JzIwJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgYXJpYS1oaWRkZW49J3RydWUnPjxwYXRoIGQ9J00xNCAySDZhMiAyIDAgMCAwLTIgMnYxNmEyIDIgMCAwIDAgMiAyaDEyYTIgMiAwIDAgMCAyLTJWOHonLz48cG9seWxpbmUgcG9pbnRzPScxNCAyIDE0IDggMjAgOCcvPjxsaW5lIHgxPScxNicgeTE9JzEzJyB4Mj0nOCcgeTI9JzEzJy8+PGxpbmUgeDE9JzE2JyB5MT0nMTcnIHgyPSc4JyB5Mj0nMTcnLz48cG9seWxpbmUgcG9pbnRzPScxMCA5IDkgOSA4IDknLz48L3N2Zz4KICAgICAgPHNwYW4+V0QyNiBEcmF3ICZhbXA7IFJlc3VsdHM8L3NwYW4+CiAgICAgIDxzdmcgd2lkdGg9JzE2JyBoZWlnaHQ9JzE2JyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgYXJpYS1oaWRkZW49J3RydWUnPjxsaW5lIHgxPSc1JyB5MT0nMTInIHgyPScxOScgeTI9JzEyJy8+PHBvbHlsaW5lIHBvaW50cz0nMTIgNSAxOSAxMiAxMiAxOScvPjwvc3ZnPgogICAgPC9hPgoKICAgIDxkaXYgY2xhc3M9ImRlbW8tY2FyZCIgb25jbGljaz0ic3RhcnREZW1vKCkiPgogICAgICA8ZGl2IGNsYXNzPSJkZW1vLWNhcmQtaWNvbiI+PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjU5ZTBiIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48cG9seWxpbmUgcG9pbnRzPSIxMiA2IDEyIDEyIDE2IDE0Ii8+PC9zdmc+PC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9ImZsZXg6MSI+CiAgICAgICAgPGRpdiBjbGFzcz0iZGVtby1jYXJkLXRpdGxlIj5MaXZlIGRlbW88L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJkZW1vLWNhcmQtZGVzYyI+UnVucyBhIHJlYWwgY2Fybml2YWwgd2l0aCA4IGF0aGxldGVzLiBObyBzaWduLXVwLjwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iZGVtby1jYXJkLWFycm93Ij7ihpI8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDwhLS0g4pSA4pSAIEhvdyBpdCB3b3JrcyDilIDilIAgLS0+CiAgICA8ZGl2IHN0eWxlPSJtYXJnaW4tdG9wOjMycHgiPgogICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MC44cmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzowLjA4ZW07dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2NvbG9yOnZhcigtLW11dGVkKTttYXJnaW4tYm90dG9tOjE0cHg7dGV4dC1hbGlnbjpjZW50ZXIiPkhvdyBpdCB3b3JrczwvZGl2PgoKICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtnYXA6MTBweCI+CiAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7Z2FwOjEycHgiPgogICAgICAgICAgPGRpdiBzdHlsZT0id2lkdGg6MjZweDtoZWlnaHQ6MjZweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kOnZhcigtLWFjY2VudCk7Y29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjAuOHJlbTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7ZmxleC1zaHJpbms6MCI+MTwvZGl2PgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZTowLjlyZW0iPlJhY2UgQ29udHJvbCBjcmVhdGVzIGEgY2Fybml2YWw8L2Rpdj4KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjAuNzhyZW07Y29sb3I6dmFyKC0tbXV0ZWQpO21hcmdpbi10b3A6MnB4Ij5UYWtlcyAxMCBzZWNvbmRzLiBZb3UgZ2V0IGEgNC1sZXR0ZXIgY29kZS48L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2dhcDoxMnB4Ij4KICAgICAgICAgIDxkaXYgc3R5bGU9IndpZHRoOjI2cHg7aGVpZ2h0OjI2cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZDp2YXIoLS1hY2NlbnQpO2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZTowLjhyZW07ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZsZXgtc2hyaW5rOjAiPjI8L2Rpdj4KICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MC45cmVtIj5FdmVyeW9uZSBqb2lucyBvbiB0aGVpciBwaG9uZTwvZGl2PgogICAgICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MC43OHJlbTtjb2xvcjp2YXIoLS1tdXRlZCk7bWFyZ2luLXRvcDoycHgiPk9wZW4gY2Fybml2YWx0aW1pbmcuY29tLCB0YXAgSm9pbiBDYXJuaXZhbCwgZW50ZXIgdGhlIGNvZGUuIFBpY2sgYSByb2xlIOKAlCBUaW1lciwgT2JzZXJ2ZXIsIFN0YXJ0ZXIgb3IgWEMgTWFyc2hhbC48L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpmbGV4LXN0YXJ0O2dhcDoxMnB4Ij4KICAgICAgICAgIDxkaXYgc3R5bGU9IndpZHRoOjI2cHg7aGVpZ2h0OjI2cHg7Ym9yZGVyLXJhZGl1czo1MCU7YmFja2dyb3VuZDp2YXIoLS1hY2NlbnQpO2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZTowLjhyZW07ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO2ZsZXgtc2hyaW5rOjAiPjM8L2Rpdj4KICAgICAgICAgIDxkaXY+CiAgICAgICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtd2VpZ2h0OjYwMDtmb250LXNpemU6MC45cmVtIj5SYWNlIENvbnRyb2wgYXJtcyAmYW1wOyBmaXJlcyBHTzwvZGl2PgogICAgICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MC43OHJlbTtjb2xvcjp2YXIoLS1tdXRlZCk7bWFyZ2luLXRvcDoycHgiPkFsbCB0aW1lcnMgc3RhcnQgc2ltdWx0YW5lb3VzbHkuIFRhcCBTVE9QIHdoZW4geW91ciBhdGhsZXRlIGZpbmlzaGVzLjwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmZsZXgtc3RhcnQ7Z2FwOjEycHgiPgogICAgICAgICAgPGRpdiBzdHlsZT0id2lkdGg6MjZweDtoZWlnaHQ6MjZweDtib3JkZXItcmFkaXVzOjUwJTtiYWNrZ3JvdW5kOnZhcigtLWFjY2VudCk7Y29sb3I6I2ZmZjtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjAuOHJlbTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7ZmxleC1zaHJpbms6MCI+NDwvZGl2PgogICAgICAgICAgPGRpdj4KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZm9udC13ZWlnaHQ6NjAwO2ZvbnQtc2l6ZTowLjlyZW0iPlRpbWVzIHN5bmMgaW5zdGFudGx5IOKAlCBwdWJsaXNoIHdoZW4gcmVhZHk8L2Rpdj4KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjAuNzhyZW07Y29sb3I6dmFyKC0tbXV0ZWQpO21hcmdpbi10b3A6MnB4Ij5SYWNlIENvbnRyb2wgc2VlcyBhbGwgc3BsaXRzIGxpdmUgYW5kIHB1Ymxpc2hlcyB0aGUgYXZlcmFnZWQgcmVzdWx0LjwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPCEtLSBSb2xlcyAtLT4KICAgICAgPGRpdiBzdHlsZT0ibWFyZ2luLXRvcDoyMHB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZSk7Ym9yZGVyLXJhZGl1czoxMnB4O3BhZGRpbmc6MTRweCAxNnB4Ij4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MC43OHJlbTtmb250LXdlaWdodDo3MDA7bWFyZ2luLWJvdHRvbToxMHB4O2NvbG9yOnZhcigtLW11dGVkKTt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGV0dGVyLXNwYWNpbmc6MC4wNmVtIj5Sb2xlczwvZGl2PgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjdweDtmb250LXNpemU6MC44MnJlbSI+CiAgICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweCI+PHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OjcwMDttaW4td2lkdGg6MTEwcHgiPlJhY2UgQ29udHJvbDwvc3Bhbj48c3BhbiBzdHlsZT0iY29sb3I6dmFyKC0tbXV0ZWQpIj5Bcm1zIHJhY2VzLCBmaXJlcyBHTy9SRUNBTEwsIHB1Ymxpc2hlcyByZXN1bHRzLiBPbmUgcGVyIGNhcm5pdmFsLjwvc3Bhbj48L2Rpdj4KICAgICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6OHB4Ij48c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6NzAwO21pbi13aWR0aDoxMTBweCI+VGltZXI8L3NwYW4+PHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKSI+VGFwcyBTVE9QIGZvciBvbmUgbGFuZS4gQnJpbmcgMuKAkzMgcGVyIGxhbmUgZm9yIGFjY3VyYWN5Ljwvc3Bhbj48L2Rpdj4KICAgICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6OHB4Ij48c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6NzAwO21pbi13aWR0aDoxMTBweCI+U3RhcnRlcjwvc3Bhbj48c3BhbiBzdHlsZT0iY29sb3I6dmFyKC0tbXV0ZWQpIj5GaXJlcyBHTyBmcm9tIHRoZSBzdGFydCBsaW5lIChvcHRpb25hbCDigJQgUmFjZSBDb250cm9sIGNhbiBkbyBpdCkuPC9zcGFuPjwvZGl2PgogICAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo4cHgiPjxzcGFuIHN0eWxlPSJmb250LXdlaWdodDo3MDA7bWluLXdpZHRoOjExMHB4Ij5PYnNlcnZlcjwvc3Bhbj48c3BhbiBzdHlsZT0iY29sb3I6dmFyKC0tbXV0ZWQpIj5XYXRjaGVzIGxpdmUgc3BsaXRzIG9uIGFueSBkZXZpY2UuIFJlYWQtb25seS48L3NwYW4+PC9kaXY+CiAgICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweCI+PHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OjcwMDttaW4td2lkdGg6MTEwcHgiPlhDIE1hcnNoYWw8L3NwYW4+PHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKSI+VGFwcyBmaW5pc2hlcnMgaW4gb3JkZXIgYXQgdGhlIGNyb3NzIGNvdW50cnkgZmluaXNoIGNodXRlLjwvc3Bhbj48L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8IS0tIFRpbWVyIGFjY3VyYWN5IC0tPgogICAgICA8ZGl2IHN0eWxlPSJtYXJnaW4tdG9wOjEwcHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXItcmFkaXVzOjEycHg7cGFkZGluZzoxNHB4IDE2cHgiPgogICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZTowLjc4cmVtO2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tYm90dG9tOjhweDtjb2xvcjp2YXIoLS1tdXRlZCk7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOjAuMDZlbSI+SG93IG1hbnkgdGltZXJzIHBlciBsYW5lPzwvZGl2PgogICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZTowLjgycmVtO2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjVweCI+CiAgICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweCI+PHNwYW4gc3R5bGU9Im1pbi13aWR0aDo3MHB4O2ZvbnQtd2VpZ2h0OjcwMCI+MSB0aW1lcjwvc3Bhbj48c3BhbiBzdHlsZT0iY29sb3I6dmFyKC0tbXV0ZWQpIj5UaGF0IHRpbWUgaXMgdXNlZCBkaXJlY3RseS48L3NwYW4+PC9kaXY+CiAgICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweCI+PHNwYW4gc3R5bGU9Im1pbi13aWR0aDo3MHB4O2ZvbnQtd2VpZ2h0OjcwMCI+MiB0aW1lcnM8L3NwYW4+PHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKSI+QXZlcmFnZSBvZiBib3RoLjwvc3Bhbj48L2Rpdj4KICAgICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6OHB4Ij48c3BhbiBzdHlsZT0ibWluLXdpZHRoOjcwcHg7Zm9udC13ZWlnaHQ6NzAwIj4zKyB0aW1lcnM8L3NwYW4+PHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKSI+VHJpbW1lZCBtZWFuIOKAlCBmYXN0ZXN0IGFuZCBzbG93ZXN0IGRyb3BwZWQsIHJlc3QgYXZlcmFnZWQuIDxzdHJvbmc+UmVjb21tZW5kZWQgZm9yIGFjY3VyYWN5Ljwvc3Ryb25nPjwvc3Bhbj48L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJtYXJnaW4tdG9wOjhweDtmb250LXNpemU6MC43OHJlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPk5vIGhhcmQgbGltaXQgb24gdGltZXJzLiBNb3JlIHRpbWVycyBwZXIgbGFuZSA9IG1vcmUgYWNjdXJhdGUgcmVzdWx0LjwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKCiAgICA8IS0tIOKUgOKUgCBTY2hvb2wgU3BvcnQgUG9ydGFsIHVwc2VsbCDilIDilIAgLS0+CiAgICA8ZGl2IHN0eWxlPSJtYXJnaW4tdG9wOjI0cHg7YmFja2dyb3VuZDpsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCMwZDFiM2UgMCUsIzFhM2E2ZSA2MCUsIzFhNTZkYiAxMDAlKTtib3JkZXItcmFkaXVzOjE0cHg7cGFkZGluZzoxOHB4IDIwcHg7Y29sb3I6I2ZmZiI+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDttYXJnaW4tYm90dG9tOjZweCI+CiAgICAgICAgPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZToxLjFyZW0iPvCfj4U8L3NwYW4+CiAgICAgICAgPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZTowLjhyZW07Zm9udC13ZWlnaHQ6NzAwO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzowLjA2ZW07Y29sb3I6I2ZjZDM0ZCI+U2Nob29sIFNwb3J0IFBvcnRhbDwvc3Bhbj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZTowLjk4cmVtO2ZvbnQtd2VpZ2h0OjcwMDttYXJnaW4tYm90dG9tOjZweDtsaW5lLWhlaWdodDoxLjMiPldhbnQgcGVyc2lzdGVudCByZXN1bHRzLCBob3VzZSBwb2ludHMgJmFtcDsgZGlzdHJpY3QgcXVhbGlmaWVycz88L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjAuODJyZW07Y29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjc1KTttYXJnaW4tYm90dG9tOjE0cHg7bGluZS1oZWlnaHQ6MS41Ij5DYXJuaXZhbCBUaW1pbmcgaXMgZnJlZSBhbmQgYWx3YXlzIHdpbGwgYmUuIFNjaG9vbCBTcG9ydCBQb3J0YWwgYWRkcyBhdXRvbWF0aWMgaG91c2UgcG9pbnQgdGFsbGllcywgZXZlbnQgcHJvZ3JhbSBidWlsZGVyLCBkaXN0cmljdCBxdWFsaWZpZXIgdHJhY2tpbmcgYW5kIHBlcm1hbmVudCBwdWJsaWMgcmVzdWx0cyBwYWdlcyDigJQgZm9yICQxL3N0dWRlbnQveWVhci48L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDoxMHB4O2ZsZXgtd3JhcDp3cmFwIj4KICAgICAgICA8YSBocmVmPSJodHRwczovL3NjaG9vbHNwb3J0cG9ydGFsLmNvbS5hdSIgdGFyZ2V0PSJfYmxhbmsiIHN0eWxlPSJiYWNrZ3JvdW5kOiNmNTllMGI7Y29sb3I6IzBkMWIzZTtwYWRkaW5nOjlweCAxOHB4O2JvcmRlci1yYWRpdXM6N3B4O2ZvbnQtc2l6ZTowLjg1cmVtO2ZvbnQtd2VpZ2h0OjcwMDt0ZXh0LWRlY29yYXRpb246bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jayI+U2VlIFNjaG9vbCBTcG9ydCBQb3J0YWwg4oaSPC9hPgogICAgICAgIDxhIGhyZWY9Imh0dHBzOi8vc2Nob29sc3BvcnRwb3J0YWwuY29tLmF1I2RlbW8iIHRhcmdldD0iX2JsYW5rIiBzdHlsZT0iYm9yZGVyOjEuNXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4zKTtjb2xvcjojZmZmO3BhZGRpbmc6OHB4IDE2cHg7Ym9yZGVyLXJhZGl1czo3cHg7Zm9udC1zaXplOjAuODVyZW07Zm9udC13ZWlnaHQ6NjAwO3RleHQtZGVjb3JhdGlvbjpub25lO2Rpc3BsYXk6aW5saW5lLWJsb2NrIj5MaXZlIGRlbW88L2E+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBjbGFzcz0idGV4dC1jZW50ZXIgdGV4dC1tdXRlZCB0ZXh0LXhzIG10LTMyIj4KICAgICAgV29ya3Mgb2ZmbGluZSDCtyBObyBhcHAgaW5zdGFsbCDCtyBGcmVlIHRvIHVzZTxicj4KICAgICAgPHNwYW4gc3R5bGU9Im9wYWNpdHk6MC41Ij5DYXJuaXZhbCBUaW1pbmcgwrcgY2Fybml2YWx0aW1pbmcuY29tPC9zcGFuPgogICAgPC9kaXY+CiAgPC9kaXY+CjwvZGl2PgoKPCEtLSDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKICAgICBTQ1JFRU46IFNFVFVQIChOZXcgQ2Fybml2YWwpCuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0ic2NyZWVuLXNldHVwIiBjbGFzcz0ic2NyZWVuIj4KICA8ZGl2IGNsYXNzPSJoZWFkZXIiPgogICAgPGRpdiBjbGFzcz0ibG9nby1iYWRnZSI+U1A8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSI+TmV3IENhcm5pdmFsPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItcmlnaHQiPgogICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLWljb24gYnRuLXNtIiBvbmNsaWNrPSJzaG93U2NyZWVuKCdob21lJykiPuKGkCBCYWNrPC9idXR0b24+CiAgICA8L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJjb250ZW50Ij4KICAgIDxkaXYgY2xhc3M9ImZvcm0tZ3JvdXAiPgogICAgICA8bGFiZWw+U2Nob29sIE5hbWU8L2xhYmVsPgogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9InNldHVwLXNjaG9vbCIgcGxhY2Vob2xkZXI9ImUuZy4gV2lsbGlhbXN0b3duIFByaW1hcnkgU2Nob29sIj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgIDxsYWJlbD5DYXJuaXZhbCAvIEV2ZW50IE5hbWU8L2xhYmVsPgogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9InNldHVwLW5hbWUiIHBsYWNlaG9sZGVyPSJlLmcuIFdpbnRlciBTcG9ydCAyMDI2Ij4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgIDxsYWJlbD5TcG9ydCBUeXBlPC9sYWJlbD4KICAgICAgPGRpdiBjbGFzcz0ic3BvcnQtZ3JpZCI+CiAgICAgICAgPGRpdiBjbGFzcz0ic3BvcnQtYnRuIGFjdGl2ZSIgZGF0YS1zcG9ydD0idHJhY2siIG9uY2xpY2s9InNlbGVjdFNwb3J0KCd0cmFjaycpIj4KICAgICAgICAgIDxkaXYgY2xhc3M9InMtaWNvbiI+PHN2ZyB3aWR0aD0nMjInIGhlaWdodD0nMjInIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBhcmlhLWhpZGRlbj0ndHJ1ZScgc3R5bGU9J3ZlcnRpY2FsLWFsaWduOm1pZGRsZSc+PHBvbHlsaW5lIHBvaW50cz0nMjIgMTIgMTggMTIgMTUgMjEgOSAzIDYgMTIgMiAxMicvPjwvc3ZnPjwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0icy1sYWJlbCI+VHJhY2sgJiBGaWVsZDwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0icy1kZXNjIj5MYW5lIHRpbWluZzwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InNwb3J0LWJ0biIgZGF0YS1zcG9ydD0ic3dpbSIgb25jbGljaz0ic2VsZWN0U3BvcnQoJ3N3aW0nKSI+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJzLWljb24iPjxzdmcgd2lkdGg9JzIyJyBoZWlnaHQ9JzIyJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgYXJpYS1oaWRkZW49J3RydWUnIHN0eWxlPSd2ZXJ0aWNhbC1hbGlnbjptaWRkbGUnPjxwYXRoIGQ9J00yIDIwczItMiA1LTIgNSAyIDcgMiA1LTIgNy0yIDMgMSAzIDFNMiAxNnMyLTIgNS0yIDUgMiA3IDIgNS0yIDctMiAzIDEgMyAxJy8+PGNpcmNsZSBjeD0nMTQnIGN5PSc1JyByPScyJy8+PC9zdmc+PC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJzLWxhYmVsIj5Td2ltbWluZzwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0icy1kZXNjIj5MYW5lIHRpbWluZzwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InNwb3J0LWJ0biIgZGF0YS1zcG9ydD0ieGMiIG9uY2xpY2s9InNlbGVjdFNwb3J0KCd4YycpIj4KICAgICAgICAgIDxkaXYgY2xhc3M9InMtaWNvbiI+PHN2ZyB3aWR0aD0nMjInIGhlaWdodD0nMjInIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBhcmlhLWhpZGRlbj0ndHJ1ZScgc3R5bGU9J3ZlcnRpY2FsLWFsaWduOm1pZGRsZSc+PHBhdGggZD0nTTEyIDIyVjhNNSA4bDctNiA3IDZNMyAyMmgxOE05IDIyVjE2aDZ2NicvPjwvc3ZnPjwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0icy1sYWJlbCI+Q3Jvc3MgQ291bnRyeTwvZGl2PgogICAgICAgICAgPGRpdiBjbGFzcz0icy1kZXNjIj5GaW5pc2ggb3JkZXIgdGFwPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ic3BvcnQtYnRuIiBkYXRhLXNwb3J0PSJtaXhlZCIgb25jbGljaz0ic2VsZWN0U3BvcnQoJ21peGVkJykiPgogICAgICAgICAgPGRpdiBjbGFzcz0icy1pY29uIj48c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSI3IiBoZWlnaHQ9IjciLz48cmVjdCB4PSIxNCIgeT0iMyIgd2lkdGg9IjciIGhlaWdodD0iNyIvPjxyZWN0IHg9IjMiIHk9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ii8+PHJlY3QgeD0iMTQiIHk9IjE0IiB3aWR0aD0iNyIgaGVpZ2h0PSI3Ii8+PC9zdmc+PC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJzLWxhYmVsIj5NaXhlZCBFdmVudHM8L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9InMtZGVzYyI+QWxsIG1vZGVzPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgPGxhYmVsPkNvbXBldGl0aW9uIFRpZXI8L2xhYmVsPgogICAgICA8ZGl2IGNsYXNzPSJwaWxsLXJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0icGlsbCBhY3RpdmUiIGRhdGEtdGllcj0ic2Nob29sIiBvbmNsaWNrPSJzZWxlY3RUaWVyKCdzY2hvb2wnKSI+U2Nob29sPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0icGlsbCIgZGF0YS10aWVyPSJkaXN0cmljdCIgb25jbGljaz0ic2VsZWN0VGllcignZGlzdHJpY3QnKSI+RGlzdHJpY3Q8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJwaWxsIiBkYXRhLXRpZXI9InJlZ2lvbiIgb25jbGljaz0ic2VsZWN0VGllcigncmVnaW9uJykiPlJlZ2lvbjwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InBpbGwiIGRhdGEtdGllcj0ic3RhdGUiIG9uY2xpY2s9InNlbGVjdFRpZXIoJ3N0YXRlJykiPlN0YXRlPC9kaXY+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgPGxhYmVsPkFjY2VudCBDb2xvdXIgPHNwYW4gc3R5bGU9ImZvbnQtd2VpZ2h0OjQwMDt0ZXh0LXRyYW5zZm9ybTpub25lO2ZvbnQtc2l6ZTowLjg1ZW0iPihvcHRpb25hbCk8L3NwYW4+PC9sYWJlbD4KICAgICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJzZXR1cC1jb2xvdXIiIHBsYWNlaG9sZGVyPSIjMTRiOGE2IOKAlCBsZWF2ZSBibGFuayBmb3IgdGVhbCI+CiAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgPGxhYmVsPkhvdXNlcyA8c3BhbiBzdHlsZT0iY29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtc2l6ZTouOHJlbTtmb250LXdlaWdodDo0MDAiPihvcHRpb25hbCDigJQgZm9yIHBvaW50cyB0YWxseSk8L3NwYW4+PC9sYWJlbD4KICAgICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJzZXR1cC1ob3VzZXMiIHBsYWNlaG9sZGVyPSJSZWQsIEJsdWUsIEdyZWVuLCBZZWxsb3ciPgogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjp2YXIoLS1tdXRlZCk7Zm9udC1zaXplOi43NXJlbTttYXJnaW4tdG9wOjRweCI+Q29tbWEtc2VwYXJhdGVkLiBMZWF2ZSBibGFuayB0byBza2lwIGhvdXNlIHBvaW50cy48L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47bWFyZ2luLWJvdHRvbTo4cHgiPgogICAgICAgIDxsYWJlbCBzdHlsZT0ibWFyZ2luOjAiPkV2ZW50IFByb2dyYW0gPHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKTtmb250LXNpemU6LjhyZW07Zm9udC13ZWlnaHQ6NDAwIj4ob3B0aW9uYWwpPC9zcGFuPjwvbGFiZWw+CiAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9InBhZGRpbmc6NHB4IDEwcHg7Zm9udC1zaXplOi44cmVtIiBvbmNsaWNrPSJhZGRQcm9ncmFtUm93KCkiPisgQWRkIEV2ZW50PC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGlkPSJwcm9ncmFtLXJvd3MiIHN0eWxlPSJtYXgtaGVpZ2h0OjI0MHB4O292ZXJmbG93LXk6YXV0byI+PC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKTtmb250LXNpemU6Ljc1cmVtO21hcmdpbi10b3A6NHB4Ij5QcmUtbG9hZCB5b3VyIGRheSdzIHNjaGVkdWxlLiBVc2UgIk5leHQgRXZlbnQg4oaSIiBpbiBSYWNlIENvbnRyb2wgdG8gYXV0by1hZHZhbmNlLjwvZGl2PgogICAgPC9kaXY+CiAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkgbXQtOCIgb25jbGljaz0iY3JlYXRlQ2Fybml2YWwoKSI+Q3JlYXRlIENhcm5pdmFsIOKGkjwvYnV0dG9uPgogIDwvZGl2Pgo8L2Rpdj4KCjwhLS0g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCiAgICAgU0NSRUVOOiBKT0lOCuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0ic2NyZWVuLWpvaW4tc2NyZWVuIiBjbGFzcz0ic2NyZWVuIj4KICA8ZGl2IGNsYXNzPSJoZWFkZXIiPgogICAgPGRpdiBjbGFzcz0ibG9nby1iYWRnZSI+U1A8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSI+Sm9pbiBDYXJuaXZhbDwvZGl2PgogICAgPGRpdiBjbGFzcz0iaGVhZGVyLXJpZ2h0Ij4KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1pY29uIGJ0bi1zbSIgb25jbGljaz0ic2hvd1NjcmVlbignaG9tZScpIj7ihpAgQmFjazwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCI+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgPGxhYmVsPjQtTGV0dGVyIENvZGU8L2xhYmVsPgogICAgICA8aW5wdXQgdHlwZT0idGV4dCIgaWQ9ImpvaW4tY29kZS1pbnB1dCIgcGxhY2Vob2xkZXI9IkFCQ0QiCiAgICAgICAgbWF4bGVuZ3RoPSI2IgogICAgICAgIHN0eWxlPSJmb250LWZhbWlseTonTWVubG8nLG1vbm9zcGFjZTtmb250LXNpemU6MS44cmVtO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzo4cHg7dGV4dC1hbGlnbjpjZW50ZXIiPgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgPGxhYmVsPllvdXIgTmFtZTwvbGFiZWw+CiAgICAgIDxpbnB1dCB0eXBlPSJ0ZXh0IiBpZD0iam9pbi1uYW1lLWlucHV0IiBwbGFjZWhvbGRlcj0iZS5nLiBBbGV4Ij4KICAgIDwvZGl2PgogICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5IiBvbmNsaWNrPSJqb2luQ2Fybml2YWwoKSI+Sm9pbiDihpI8L2J1dHRvbj4KICAgIDxkaXYgaWQ9ImpvaW4tZXJyb3IiIGNsYXNzPSJ0ZXh0LWNlbnRlciB0ZXh0LW11dGVkIG10LTE2IGhpZGRlbiIgc3R5bGU9ImNvbG9yOnZhcigtLWRhbmdlcikiPjwvZGl2PgogIDwvZGl2Pgo8L2Rpdj4KCjwhLS0g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCiAgICAgU0NSRUVOOiBST0xFIFBJQ0tFUgrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxkaXYgaWQ9InNjcmVlbi1yb2xlIiBjbGFzcz0ic2NyZWVuIj4KICA8ZGl2IGNsYXNzPSJoZWFkZXIiPgogICAgPGRpdiBjbGFzcz0ibG9nby1iYWRnZSI+U1A8L2Rpdj4KICAgIDxkaXY+CiAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSIgaWQ9InJvbGUtc2Nob29sLW5hbWUiPkNob29zZSBSb2xlPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci1zdWIiIGlkPSJyb2xlLWNhcm5pdmFsLW5hbWUiPjwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCI+CiAgICA8ZGl2IGNsYXNzPSJjYXJkIj4KICAgICAgPGRpdiBjbGFzcz0iY2FyZC10aXRsZSI+Q2Fybml2YWw8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjFyZW07Zm9udC13ZWlnaHQ6NzAwIiBpZD0icm9sZS1qb2luZWQtbmFtZSI+PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InRleHQteHMgdGV4dC1tdXRlZCBtdC04IGZvbnQtbW9ubyIgaWQ9InJvbGUtam9pbmVkLWNvZGUiPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJ0ZXh0LXhzIHRleHQtbXV0ZWQgbXQtNCIgaWQ9InJvbGUtZXhwaXJlcy1ub3RlIiBzdHlsZT0iZGlzcGxheTpub25lIj48L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBpZD0icm9sZS1ncmlkIiBjbGFzcz0icm9sZS1ncmlkIj48L2Rpdj4KICAgIDxkaXYgaWQ9InJvbGUtbGFuZS1waWNrZXIiIGNsYXNzPSJoaWRkZW4gbXQtMTYiPgogICAgICA8bGFiZWwgc3R5bGU9ImZvbnQtc2l6ZToxLjFyZW07Zm9udC13ZWlnaHQ6NzAwO2Rpc3BsYXk6YmxvY2s7bWFyZ2luLWJvdHRvbToxMnB4Ij5XaGljaCBsYW5lIGFyZSB5b3UgdGltaW5nPzwvbGFiZWw+CiAgICAgIDxkaXYgaWQ9ImxhbmUtcGljay1idG5zIiBzdHlsZT0iZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwO2dhcDo4cHg7bWFyZ2luLXRvcDo4cHgiPjwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CjwvZGl2PgoKPCEtLSDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKICAgICBTQ1JFRU46IFRJTUVSIChMYW5lKQrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxkaXYgaWQ9InNjcmVlbi10aW1lciIgY2xhc3M9InNjcmVlbiI+CiAgPGRpdiBjbGFzcz0iaGVhZGVyIj4KICAgIDxkaXYgY2xhc3M9ImNvbm4tZG90IiBpZD0idGltZXItZG90Ij48L2Rpdj48c3BhbiBpZD0idGltZXItZG90LWxibCIgc3R5bGU9ImZvbnQtc2l6ZTowLjY1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzouMDVlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPjwvc3Bhbj4KICAgIDxkaXY+CiAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSIgaWQ9InRpbWVyLWxhbmUtbGFiZWwiPkxhbmUgMTwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJoZWFkZXItc3ViIiBpZD0idGltZXItZXZlbnQtbGFiZWwiPjwvZGl2PgogICAgPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItcmlnaHQiIGlkPSJ0aW1lci1iYWRnZS13cmFwIj48L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJjb250ZW50Ij4KICAgIDxkaXYgY2xhc3M9ImNhcmQiIGlkPSJ0aW1lci1hdGhsZXRlLWNhcmQiPgogICAgICA8ZGl2IGNsYXNzPSJjYXJkLXRpdGxlIiBpZD0idGltZXItYXRobGV0ZS1ldmVudCI+RXZlbnQ8L2Rpdj4KICAgICAgPGRpdiBpZD0idGltZXItYXRobGV0ZS1uYW1lIiBzdHlsZT0iZm9udC1zaXplOjEuNXJlbTtmb250LXdlaWdodDo3MDAiPuKAlDwvZGl2PgogICAgICA8ZGl2IGlkPSJ0aW1lci1hdGhsZXRlLW5vdGUiIGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQtc20iPjwvZGl2PgogICAgPC9kaXY+CgogICAgPGRpdiBpZD0idGltZXItcmVjYWxsLWJhbm5lciIgY2xhc3M9ImhpZGRlbiIgc3R5bGU9ImJhY2tncm91bmQ6IzdmMWQxZDtjb2xvcjojZmNhNWE1O2JvcmRlci1yYWRpdXM6MTBweDtwYWRkaW5nOjEwcHggMTRweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEuMDVyZW07bWFyZ2luLWJvdHRvbTo4cHg7Ij5GQUxTRSBTVEFSVCDigJQgUmFjZSBSZWNhbGxlZDwvZGl2PgoKICAgIDxkaXYgY2xhc3M9ImNsb2NrIiBpZD0idGltZXItY2xvY2siPjA6MDAuMDA8L2Rpdj4KCiAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIiBpZD0idGltZXItbmFtZS1nYXRlIj4KICAgICAgPGxhYmVsPllvdXIgbmFtZSAobmVlZGVkIHRvIHN0b3ApPC9sYWJlbD4KICAgICAgPGlucHV0IHR5cGU9InRleHQiIGlkPSJ0aW1lci1uYW1lLWlucHV0IiBwbGFjZWhvbGRlcj0iZS5nLiBBbGV4Ij4KICAgIDwvZGl2PgoKICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc3RvcCIgaWQ9InRpbWVyLXN0b3AtYnRuIiBvbmNsaWNrPSJ0aW1lclN0b3AoKSIgZGlzYWJsZWQ+U1RPUDwvYnV0dG9uPgoKICAgIDxkaXYgaWQ9InRpbWVyLW15LXNwbGl0IiBjbGFzcz0iaGlkZGVuIG10LTE2Ij4KICAgICAgPGRpdiBjbGFzcz0iY2FyZCI+CiAgICAgICAgPGRpdiBjbGFzcz0iY2FyZC10aXRsZSI+WW91ciB0aW1lPC9kaXY+CiAgICAgICAgPGRpdiBpZD0idGltZXItbXktdGltZSIgY2xhc3M9ImZvbnQtbW9ubyIgc3R5bGU9ImZvbnQtc2l6ZToyLjJyZW07Zm9udC13ZWlnaHQ6NzAwO2NvbG9yOnZhcigtLWFjY2VudCkiPjwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgaWQ9InRpbWVyLXNwbGl0cy1jYXJkIiBjbGFzcz0iY2FyZCBtdC04IGhpZGRlbiI+CiAgICAgIDxkaXYgY2xhc3M9ImNhcmQtdGl0bGUiPkFsbCB0aW1lcnMgdGhpcyBsYW5lPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InRleHQteHMgdGV4dC1tdXRlZCIgc3R5bGU9InBhZGRpbmc6MCA0cHggNnB4O2xpbmUtaGVpZ2h0OjEuNDsiPlJhY2UgQ29udHJvbCBwdWJsaXNoZXMgYSA8c3Ryb25nPnRyaW1tZWQgbWVhbjwvc3Ryb25nPiDigJQgd2l0aCAzKyB0aW1lcnMgdGhlIGZhc3Rlc3QgYW5kIHNsb3dlc3QgYXJlIGRyb3BwZWQuPC9kaXY+CiAgICAgIDxkaXYgaWQ9InRpbWVyLXNwbGl0cy1saXN0Ij48L2Rpdj4KICAgIDwvZGl2PgoKICAgIDxkaXYgaWQ9InRpbWVyLXdhaXRpbmctbXNnIiBjbGFzcz0idGV4dC1jZW50ZXIgdGV4dC1tdXRlZCBtdC0zMiI+CiAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZToyLjVyZW0iPjxzdmcgd2lkdGg9JzI4JyBoZWlnaHQ9JzI4JyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgYXJpYS1oaWRkZW49J3RydWUnIHN0eWxlPSd2ZXJ0aWNhbC1hbGlnbjptaWRkbGUnPjxjaXJjbGUgY3g9JzEyJyBjeT0nMTMnIHI9JzgnLz48cGF0aCBkPSdNMTIgOXY0bDIgMk05IDJoNicvPjwvc3ZnPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJtdC04Ij5XYWl0aW5nIGZvciByYWNlIHRvIGJlIGFybWVkLi4uPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIFNDUkVFTjogQURNSU4gKExhbmUgUmFjZSkK4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQIC0tPgo8ZGl2IGlkPSJzY3JlZW4tYWRtaW4iIGNsYXNzPSJzY3JlZW4iPgogIDxkaXYgY2xhc3M9ImhlYWRlciI+CiAgICA8ZGl2IGNsYXNzPSJjb25uLWRvdCIgaWQ9ImFkbWluLWRvdCI+PC9kaXY+PHNwYW4gaWQ9ImFkbWluLWRvdC1sYmwiIHN0eWxlPSJmb250LXNpemU6MC42NXJlbTtmb250LXdlaWdodDo3MDA7bGV0dGVyLXNwYWNpbmc6LjA1ZW07Y29sb3I6dmFyKC0tbXV0ZWQpIj48L3NwYW4+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItdGl0bGUiPlJhY2UgQ29udHJvbDwvZGl2PgogICAgPGRpdiBjbGFzcz0iaGVhZGVyLXJpZ2h0Ij48c3BhbiBjbGFzcz0idGV4dC1tdXRlZCB0ZXh0LXhzIiBpZD0iYWRtaW4tc2Nob29sLWxibCI+PC9zcGFuPjwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9ImNvbnRlbnQiPgoKICAgIDwhLS0gRGVtbyBiYW5uZXIgKHNob3duIHdoZW4gaXNEZW1vPXRydWUpIC0tPgogICAgPGRpdiBpZD0iYWRtaW4tZGVtby1iYW5uZXIiIGNsYXNzPSJkZW1vLWJhbm5lciBoaWRkZW4iPgogICAgICA8ZGl2IGNsYXNzPSJkZW1vLWJhbm5lci10b3AiPgogICAgICAgIDxzcGFuIHN0eWxlPSJmb250LXNpemU6MS4xcmVtO2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjojZjU5ZTBiIj5EZW1vIENhcm5pdmFsPC9zcGFuPgogICAgICAgIDxzcGFuIGNsYXNzPSJiYWRnZSIgc3R5bGU9ImJhY2tncm91bmQ6cmdiYSgyNDUsMTU4LDExLDAuMTUpO2NvbG9yOiNmNTllMGI7Ym9yZGVyLWNvbG9yOnJnYmEoMjQ1LDE1OCwxMSwwLjMpIj5ERU1PPC9zcGFuPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iZGVtby1iYW5uZXItaGludCIgc3R5bGU9Im1hcmdpbi1ib3R0b206MTBweCI+CiAgICAgICAgPHN0cm9uZz5TaGFyZSB0aGlzIGNvZGU8L3N0cm9uZz4g4oCUIG9wZW4gY2Fybml2YWx0aW1pbmcuY29tIG9uIGFub3RoZXIgZGV2aWNlIGFuZCB0YXAgIkpvaW4gQ2Fybml2YWwiCiAgICAgIDwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDoxMnB4O2ZsZXgtd3JhcDp3cmFwIj4KICAgICAgICA8c3BhbiBjbGFzcz0iZGVtby1jb2RlLXBpbGwiIGlkPSJkZW1vLWNvZGUtZGlzcGxheSIgb25jbGljaz0iY29weURlbW9Db2RlKCkiIHRpdGxlPSJUYXAgdG8gY29weSI+Pz8/Pzwvc3Bhbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLWljb24gYnRuLXNtIiBvbmNsaWNrPSJjb3B5RGVtb0NvZGUoKSI+PHN2ZyB3aWR0aD0iMTMiIGhlaWdodD0iMTMiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHlsZT0idmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1yaWdodDo0cHgiPjxyZWN0IHg9IjkiIHk9IjkiIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMyIgcng9IjIiIHJ5PSIyIi8+PHBhdGggZD0iTTUgMTVINGEyIDIgMCAwIDEtMi0yVjRhMiAyIDAgMCAxIDItMmg5YTIgMiAwIDAgMSAyIDJ2MSIvPjwvc3ZnPiBDb3B5IGNvZGU8L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImRlbW8tcXIiPgogICAgICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZTowLjcycmVtO2NvbG9yOnZhcigtLW11dGVkKTttYXJnaW4tYm90dG9tOjZweCI+T3Igc2NhbiB0byBqb2luIGZyb20gcGhvbmU6PC9kaXY+CiAgICAgICAgPGRpdiBpZD0iZGVtby1xci1jYW52YXMiIHN0eWxlPSJkaXNwbGF5OmlubGluZS1ibG9jaztiYWNrZ3JvdW5kOiNmZmY7cGFkZGluZzo2cHg7Ym9yZGVyLXJhZGl1czo2cHgiPjwvZGl2PgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDwhLS0gU2V0dXAgcGFuZWwgLS0+CiAgICA8ZGl2IGlkPSJhZG1pbi1zZXR1cC1wYW5lbCI+CiAgICAgIDxkaXYgY2xhc3M9ImNhcmQiPgogICAgICAgIDxkaXYgY2xhc3M9ImNhcmQtdGl0bGUiPlJhY2UgU2V0dXA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIj4KICAgICAgICAgIDxsYWJlbD5BZ2UgR3JvdXA8L2xhYmVsPgogICAgICAgICAgPHNlbGVjdCBpZD0iYWRtaW4tYWdlLXNlbCI+PC9zZWxlY3Q+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgICA8bGFiZWw+R2VuZGVyPC9sYWJlbD4KICAgICAgICAgIDxkaXYgY2xhc3M9InBpbGwtcm93Ij4KICAgICAgICAgICAgPGRpdiBjbGFzcz0icGlsbCBhY3RpdmUiIGRhdGEtYWc9ImJveXMiIG9uY2xpY2s9InNlbGVjdEFkbWluR2VuZGVyKCdib3lzJykiPkJveXM8L2Rpdj4KICAgICAgICAgICAgPGRpdiBjbGFzcz0icGlsbCIgZGF0YS1hZz0iZ2lybHMiIG9uY2xpY2s9InNlbGVjdEFkbWluR2VuZGVyKCdnaXJscycpIj5HaXJsczwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJwaWxsIiBkYXRhLWFnPSJtaXhlZCIgb25jbGljaz0ic2VsZWN0QWRtaW5HZW5kZXIoJ21peGVkJykiPk1peGVkPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IGNsYXNzPSJmb3JtLWdyb3VwIG1iLTAiPgogICAgICAgICAgPGxhYmVsPkV2ZW50PC9sYWJlbD4KICAgICAgICAgIDxzZWxlY3QgaWQ9ImFkbWluLWV2ZW50LXNlbCI+PC9zZWxlY3Q+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJjYXJkLXRpdGxlIj5MYW5lIEFzc2lnbm1lbnRzPC9kaXY+CiAgICAgICAgPGRpdiBpZD0iYWRtaW4tbGFuZS1pbnB1dHMiPjwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0iY2FyZCIgaWQ9ImFkbWluLWhvdXNlLWNhcmQiIHN0eWxlPSJkaXNwbGF5Om5vbmUiPgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47bWFyZ2luLWJvdHRvbTo4cHgiPgogICAgICAgICAgPGRpdiBjbGFzcz0iY2FyZC10aXRsZSIgc3R5bGU9Im1hcmdpbjowIj5Ib3VzZSBQb2ludHM8L2Rpdj4KICAgICAgICAgIDxidXR0b24gdHlwZT0iYnV0dG9uIiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJwYWRkaW5nOjRweCAxMHB4O2ZvbnQtc2l6ZTouNzhyZW07Y29sb3I6I2VmNDQ0NDtib3JkZXItY29sb3I6I2VmNDQ0NCIgb25jbGljaz0iYWRtaW5SZXNldEhvdXNlUG9pbnRzKCkiPlJlc2V0PC9idXR0b24+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBpZD0iYWRtaW4taG91c2Utc3RhbmRpbmdzIj48L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6OHB4O2ZsZXgtd3JhcDp3cmFwIj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiIG9uY2xpY2s9ImFkbWluQXJtKCkiIHN0eWxlPSJmbGV4OjEiPkFSTSBSQUNFIOKGkjwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBpZD0iYWRtaW4tbmV4dC1ldmVudC1idG4iIG9uY2xpY2s9ImFkbWluTmV4dEV2ZW50KCkiIHN0eWxlPSJmbGV4OjE7ZGlzcGxheTpub25lIj5OZXh0IEV2ZW50IOKGkjwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgoKICAgIDwhLS0gTGl2ZSBwYW5lbCAtLT4KICAgIDxkaXYgaWQ9ImFkbWluLWxpdmUtcGFuZWwiIGNsYXNzPSJoaWRkZW4iPgogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtOCIgc3R5bGU9Im1hcmdpbi1ib3R0b206NnB4Ij4KICAgICAgICAgIDxkaXYgaWQ9ImFkbWluLXJhY2UtbGJsIiBzdHlsZT0iZm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxLjA1cmVtO2ZsZXg6MSI+PC9kaXY+CiAgICAgICAgICA8c3BhbiBpZD0iYWRtaW4tc3RhdGUtYmFkZ2UiIGNsYXNzPSJiYWRnZSBiYWRnZS1hcm1lZCI+QVJNRUQ8L3NwYW4+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY2xvY2siIGlkPSJhZG1pbi1saXZlLWNsb2NrIiBzdHlsZT0iZm9udC1zaXplOjNyZW07cGFkZGluZzo4cHggMCI+MDowMC4wMDwvZGl2PgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLWdvIiBpZD0iYWRtaW4tZ28tYnRuIiBvbmNsaWNrPSJhZG1pbkdvKCkiPkdPPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIG9uY2xpY2s9ImFkbWluUmVjYWxsKCkiPlJFQ0FMTDwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93IG10LTgiPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJhZG1pbkNsZWFyKCkiPkNMRUFSIFNQTElUUzwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJhZG1pbkFiYW5kb24oKSI+QUJBTkRPTjwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0icm93IG10LTgiPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJhZG1pblJlbmFtZUxhbmVzKCkiIHN0eWxlPSJmbGV4OjEiPjxzdmcgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tcmlnaHQ6NHB4Ij48cGF0aCBkPSJNMTEgNEg0YTIgMiAwIDAgMC0yIDJ2MTRhMiAyIDAgMCAwIDIgMmgxNGEyIDIgMCAwIDAgMi0ydi03Ii8+PHBhdGggZD0iTTE4LjUgMi41YTIuMTIxIDIuMTIxIDAgMCAxIDMgM0wxMiAxNWwtNCAxIDEtNCA5LjUtOS41eiIvPjwvc3ZnPiBFZGl0IE5hbWVzPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgICA8aHIgY2xhc3M9ImRpdmlkZXIiPgogICAgICA8ZGl2IGNsYXNzPSJjYXJkLXRpdGxlIj5MaXZlIFNwbGl0czwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJ0ZXh0LXhzIHRleHQtbXV0ZWQiIHN0eWxlPSJwYWRkaW5nOjAgNHB4IDhweDtsaW5lLWhlaWdodDoxLjQ7Ij5QdWJsaXNoZWQgdGltZSA9IDxzdHJvbmc+dHJpbW1lZCBtZWFuPC9zdHJvbmc+LiAzKyB0aW1lcnM6IGRyb3AgZmFzdGVzdCAmYW1wOyBzbG93ZXN0LCBtZWFuIHRoZSByZXN0LiAyIHRpbWVyczogcGxhaW4gbWVhbi4gMSB0aW1lcjogdGhhdCB2YWx1ZS48L2Rpdj4KICAgICAgPGRpdiBpZD0iYWRtaW4tc3BsaXRzLWxpc3QiPjwvZGl2PgogICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkgbXQtMTYgaGlkZGVuIiBpZD0iYWRtaW4tcHVibGlzaC1idG4iIG9uY2xpY2s9ImFkbWluUHVibGlzaCgpIj48c3ZnIHdpZHRoPScyMicgaGVpZ2h0PScyMicgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGFyaWEtaGlkZGVuPSd0cnVlJyBzdHlsZT0ndmVydGljYWwtYWxpZ246bWlkZGxlJz48cmVjdCB4PSc4JyB5PScyJyB3aWR0aD0nOCcgaGVpZ2h0PSc0JyByeD0nMScgcnk9JzEnLz48cGF0aCBkPSdNMTYgNGgyYTIgMiAwIDAgMSAyIDJ2MTRhMiAyIDAgMCAxLTIgMkg2YTIgMiAwIDAgMS0yLTJWNmEyIDIgMCAwIDEgMi0yaDInLz48L3N2Zz4gUHVibGlzaCBSZXN1bHRzPC9idXR0b24+CiAgICAgIDxkaXYgaWQ9ImFkbWluLWV4cG9ydC1idG5zIiBjbGFzcz0iaGlkZGVuIiBzdHlsZT0iZGlzcGxheTpub25lO2dhcDo4cHg7bWFyZ2luLXRvcDo4cHgiPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0iZmxleDoxIiBvbmNsaWNrPSJhZG1pbkV4cG9ydENTVigpIj7irIcgRXhwb3J0IENTVjwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0iZmxleDoxIiBvbmNsaWNrPSJhZG1pblByaW50UmVzdWx0cygpIj7wn5aoIFByaW50PC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogICAgPCEtLSBEb25lIHBhbmVsIC0tPgogICAgPGRpdiBpZD0iYWRtaW4tZG9uZS1wYW5lbCIgY2xhc3M9ImhpZGRlbiI+CiAgICAgIDxkaXYgY2xhc3M9ImNhcmQiPgogICAgICAgIDxkaXYgY2xhc3M9ImNhcmQtdGl0bGUiPlB1Ymxpc2hlZCBSZXN1bHRzPC9kaXY+CiAgICAgICAgPGRpdiBpZD0iYWRtaW4tcmVzdWx0cy1saXN0Ij48L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyBtdC04Ij4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiIGlkPSJhZG1pbi1kb25lLXB1Ymxpc2gtYnRuIiBvbmNsaWNrPSJhZG1pblB1Ymxpc2hGcm9tRG9uZSgpIj5QdWJsaXNoIFJlc3VsdHM8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgb25jbGljaz0iYWRtaW5OZXdSYWNlKCkiPisgTmV3IFJhY2U8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgb25jbGljaz0iZXhwb3J0Q1NWKCkiPjxzdmcgd2lkdGg9IjE1IiBoZWlnaHQ9IjE1IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZTttYXJnaW4tcmlnaHQ6NHB4Ij48cGF0aCBkPSJNMjEgMTV2NGEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnYtNCIvPjxwb2x5bGluZSBwb2ludHM9IjcgMTAgMTIgMTUgMTcgMTAiLz48bGluZSB4MT0iMTIiIHkxPSIxNSIgeDI9IjEyIiB5Mj0iMyIvPjwvc3ZnPiBFeHBvcnQgQ1NWPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CjwvZGl2PgoKPCEtLSDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKICAgICBTQ1JFRU46IFNUQVJURVIK4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQIC0tPgo8ZGl2IGlkPSJzY3JlZW4tc3RhcnRlciIgY2xhc3M9InNjcmVlbiI+CiAgPGRpdiBjbGFzcz0iaGVhZGVyIj4KICAgIDxkaXYgY2xhc3M9ImNvbm4tZG90IiBpZD0ic3RhcnRlci1kb3QiPjwvZGl2PjxzcGFuIGlkPSJzdGFydGVyLWRvdC1sYmwiIHN0eWxlPSJmb250LXNpemU6MC42NXJlbTtmb250LXdlaWdodDo3MDA7bGV0dGVyLXNwYWNpbmc6LjA1ZW07Y29sb3I6dmFyKC0tbXV0ZWQpIj48L3NwYW4+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItdGl0bGUiPlN0YXJ0ZXI8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci1yaWdodCI+PHNwYW4gaWQ9InN0YXJ0ZXItZXZlbnQtbGJsIiBjbGFzcz0idGV4dC1tdXRlZCB0ZXh0LXhzIj48L3NwYW4+PC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCI+CiAgICA8ZGl2IGlkPSJzdGFydGVyLXdhaXRpbmciIGNsYXNzPSJ0ZXh0LWNlbnRlciIgc3R5bGU9InBhZGRpbmctdG9wOjYwcHgiPgogICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6My41cmVtIj48c3ZnIHdpZHRoPScyMicgaGVpZ2h0PScyMicgdmlld0JveD0nMCAwIDI0IDI0JyBmaWxsPSdub25lJyBzdHJva2U9J2N1cnJlbnRDb2xvcicgc3Ryb2tlLXdpZHRoPScyJyBzdHJva2UtbGluZWNhcD0ncm91bmQnIHN0cm9rZS1saW5lam9pbj0ncm91bmQnIGFyaWEtaGlkZGVuPSd0cnVlJyBzdHlsZT0ndmVydGljYWwtYWxpZ246bWlkZGxlJz48cGF0aCBkPSdNNiA4YTYgNiAwIDAgMSAxMiAwYzAgNyAzIDkgMyA5SDNzMy0yIDMtOScvPjxwYXRoIGQ9J00xMC4zIDIxYTEuOTQgMS45NCAwIDAgMCAzLjQgMCcvPjwvc3ZnPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJ0ZXh0LW11dGVkIG10LTE2Ij5XYWl0aW5nIGZvciBSYWNlIENvbnRyb2wgdG8gYXJtLi4uPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgaWQ9InN0YXJ0ZXItYXJtZWQiIGNsYXNzPSJoaWRkZW4iPgogICAgICA8ZGl2IGNsYXNzPSJjYXJkIHRleHQtY2VudGVyIj4KICAgICAgICA8ZGl2IGlkPSJzdGFydGVyLXJhY2UtaW5mbyIgY2xhc3M9InRleHQtbXV0ZWQgdGV4dC1zbSI+PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY2xvY2sgbXQtOCIgaWQ9InN0YXJ0ZXItY2xvY2siPjA6MDAuMDA8L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8IS0tIEd1biBkZXRlY3Rpb24gcGFuZWwgLS0+CiAgICAgIDxkaXYgc3R5bGU9Im1hcmdpbi10b3A6MTZweDtwYWRkaW5nOjE2cHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlLTIpO2JvcmRlci1yYWRpdXM6MTJweCI+CiAgICAgICAgPCEtLSBJZGxlIHN0YXRlIC0tPgogICAgICAgIDxkaXYgaWQ9InN0YXJ0ZXItbGlzdGVuLWlkbGUiPgogICAgICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjAuOHJlbTtjb2xvcjp2YXIoLS1tdXRlZCk7dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLWJvdHRvbToxMnB4Ij5Qb2ludCBtaWMgdG93YXJkIHRoZSBzdGFydGluZyBwaXN0b2w8L2Rpdj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgc3R5bGU9IndpZHRoOjEwMCU7Zm9udC1zaXplOjEuMXJlbTtwYWRkaW5nOjE2cHgiIG9uY2xpY2s9InN0YXJ0ZXJMaXN0ZW5TdGFydCgpIj4KICAgICAgICAgICAg8J+Ome+4jyBMaXN0ZW4gZm9yIEd1bgogICAgICAgICAgPC9idXR0b24+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPCEtLSBMaXN0ZW5pbmcgc3RhdGUgLS0+CiAgICAgICAgPGRpdiBpZD0ic3RhcnRlci1saXN0ZW4tYWN0aXZlIiBjbGFzcz0iaGlkZGVuIj4KICAgICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDttYXJnaW4tYm90dG9tOjEwcHgiPgogICAgICAgICAgICA8ZGl2IHN0eWxlPSJ3aWR0aDoxMHB4O2hlaWdodDoxMHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQ6I2VmNDQ0NDthbmltYXRpb246dmYtcHVsc2UgMC44cyBpbmZpbml0ZTtmbGV4LXNocmluazowIj48L2Rpdj4KICAgICAgICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjAuOXJlbTtmb250LXdlaWdodDo3MDA7Y29sb3I6I2VmNDQ0NDtmbGV4OjEiPkxpc3RlbmluZ+KApjwvZGl2PgogICAgICAgICAgICA8ZGl2IGlkPSJzdGFydGVyLWNhbC1sYmwiIHN0eWxlPSJmb250LXNpemU6MC43MnJlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPkNhbGlicmF0aW5nPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KICAgICAgICAgIDwhLS0gVm9sdW1lIGJhciAtLT4KICAgICAgICAgIDxkaXYgc3R5bGU9ImJhY2tncm91bmQ6dmFyKC0tc3VyZmFjZSk7Ym9yZGVyLXJhZGl1czo0cHg7aGVpZ2h0OjE0cHg7b3ZlcmZsb3c6aGlkZGVuO21hcmdpbi1ib3R0b206MTBweCI+CiAgICAgICAgICAgIDxkaXYgaWQ9InN0YXJ0ZXItdm9sLWJhciIgc3R5bGU9ImhlaWdodDoxMDAlO3dpZHRoOjAlO2JhY2tncm91bmQ6dmFyKC0tYWNjZW50KTtib3JkZXItcmFkaXVzOjRweDt0cmFuc2l0aW9uOndpZHRoIDAuMDRzIj48L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPCEtLSBTZW5zaXRpdml0eSAtLT4KICAgICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjZweDttYXJnaW4tYm90dG9tOjEycHgiPgogICAgICAgICAgICA8c3BhbiBzdHlsZT0iZm9udC1zaXplOjAuNzVyZW07Y29sb3I6dmFyKC0tbXV0ZWQpIj5TZW5zaXRpdml0eTo8L3NwYW4+CiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0iZm9udC1zaXplOjAuNzVyZW07cGFkZGluZzo0cHggMTBweCIgZGF0YS1zZW5zPSJoaWdoIiBvbmNsaWNrPSJzdGFydGVyU2V0U2VucygnaGlnaCcpIj5IaWdoPC9idXR0b24+CiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgICBzdHlsZT0iZm9udC1zaXplOjAuNzVyZW07cGFkZGluZzo0cHggMTBweCIgZGF0YS1zZW5zPSJtZWQiICBvbmNsaWNrPSJzdGFydGVyU2V0U2VucygnbWVkJykiPk1lZDwvYnV0dG9uPgogICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZvbnQtc2l6ZTowLjc1cmVtO3BhZGRpbmc6NHB4IDEwcHgiIGRhdGEtc2Vucz0ibG93IiAgb25jbGljaz0ic3RhcnRlclNldFNlbnMoJ2xvdycpIj5Mb3c8L2J1dHRvbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2dhcDo4cHgiPgogICAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZsZXg6MTtmb250LXNpemU6MC44NXJlbSIgb25jbGljaz0ic3RhcnRlckxpc3RlblN0b3AoKSI+U3RvcCBMaXN0ZW5pbmc8L2J1dHRvbj4KICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJmb250LXNpemU6MC44NXJlbTtwYWRkaW5nOjhweCAxMnB4IiB0aXRsZT0iUmVjYWxpYnJhdGUgbm9pc2UgZmxvb3IiIG9uY2xpY2s9InN0YXJ0ZXJSZWNhbGlicmF0ZSgpIj7ihrogUmVjYWw8L2J1dHRvbj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDwhLS0gTWFudWFsIGZhbGxiYWNrICsgcmVjYWxsIC0tPgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweDttYXJnaW4tdG9wOjEycHgiPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0iZmxleDoxO2ZvbnQtc2l6ZTowLjg1cmVtIiBpZD0ic3RhcnRlci1nby1idG4iIG9uY2xpY2s9InN0YXJ0ZXJHbygpIj5NYW51YWwgR088L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZsZXg6MTtmb250LXNpemU6MC44NXJlbTtjb2xvcjp2YXIoLS1kYW5nZXIpO2JvcmRlci1jb2xvcjp2YXIoLS1kYW5nZXIpIiBvbmNsaWNrPSJzdGFydGVyUmVjYWxsKCkiPlJFQ0FMTDwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PgogIDwvZGl2Pgo8L2Rpdj4KCjwhLS0g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCiAgICAgU0NSRUVOOiBPQlNFUlZFUiAoTGFuZSBSYWNlKQrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxkaXYgaWQ9InNjcmVlbi1vYnNlcnZlciIgY2xhc3M9InNjcmVlbiI+CiAgPGRpdiBjbGFzcz0iaGVhZGVyIj4KICAgIDxkaXYgY2xhc3M9ImNvbm4tZG90IiBpZD0ib2JzZXJ2ZXItZG90Ij48L2Rpdj48c3BhbiBpZD0ib2JzZXJ2ZXItZG90LWxibCIgc3R5bGU9ImZvbnQtc2l6ZTowLjY1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzouMDVlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPjwvc3Bhbj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSI+TGl2ZSBSZXN1bHRzPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItcmlnaHQiPjxzcGFuIGlkPSJvYnNlcnZlci1ldmVudC1sYmwiIGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQteHMiPjwvc3Bhbj48L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJjb250ZW50Ij4KICAgIDxkaXYgY2xhc3M9ImNsb2NrIiBpZD0ib2JzZXJ2ZXItY2xvY2siIHN0eWxlPSJmb250LXNpemU6Mi44cmVtIj4wOjAwLjAwPC9kaXY+CiAgICA8ZGl2IGlkPSJvYnNlcnZlci1sYW5lcy1saXN0Ij48L2Rpdj4KICAgIDxkaXYgaWQ9Im9ic2VydmVyLXdhaXRpbmciIGNsYXNzPSJ0ZXh0LWNlbnRlciB0ZXh0LW11dGVkIG10LTMyIj4KICAgICAgPGRpdiBzdHlsZT0ib3BhY2l0eTowLjM1O21hcmdpbi1ib3R0b206OHB4Ij48c3ZnIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUgMTIuNTVhMTEgMTEgMCAwIDEgMTQuMDggMCIvPjxwYXRoIGQ9Ik0xLjQyIDlhMTYgMTYgMCAwIDEgMjEuMTYgMCIvPjxwYXRoIGQ9Ik04LjUzIDE2LjExYTYgNiAwIDAgMSA2Ljk1IDAiLz48bGluZSB4MT0iMTIiIHkxPSIyMCIgeDI9IjEyIiB5Mj0iMjAiLz48L3N2Zz48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0ibXQtOCI+V2FpdGluZyBmb3IgbmV4dCByYWNlLi4uPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIFNDUkVFTjogWEMgTUFSU0hBTArilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxkaXYgaWQ9InNjcmVlbi1tYXJzaGFsIiBjbGFzcz0ic2NyZWVuIj4KICA8ZGl2IGNsYXNzPSJoZWFkZXIiPgogICAgPGRpdiBjbGFzcz0iY29ubi1kb3QiIGlkPSJtYXJzaGFsLWRvdCI+PC9kaXY+PHNwYW4gaWQ9Im1hcnNoYWwtZG90LWxibCIgc3R5bGU9ImZvbnQtc2l6ZTowLjY1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzouMDVlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPjwvc3Bhbj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSI+RmluaXNoIE1hcnNoYWw8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci1yaWdodCI+PHNwYW4gaWQ9Im1hcnNoYWwtZXZlbnQtbGJsIiBjbGFzcz0idGV4dC14cyB0ZXh0LW11dGVkIj48L3NwYW4+PC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCIgc3R5bGU9InBhZGRpbmc6MCI+CiAgICA8IS0tIFdBSVRJTkcgLS0+CiAgICA8ZGl2IGlkPSJtYXJzaGFsLXdhaXRpbmciIGNsYXNzPSJ0ZXh0LWNlbnRlciIgc3R5bGU9InBhZGRpbmc6NjBweCAyMHB4IDAiPgogICAgICA8ZGl2IGlkPSJtYXJzaGFsLXdhaXQtbXNnIiBjbGFzcz0idGV4dC1tdXRlZCBtdC0xNiI+V2FpdGluZyBmb3IgcmFjZSB0byBzdGFydC4uLjwvZGl2PgogICAgPC9kaXY+CgogICAgPCEtLSBMSVZFIC0tPgogICAgPGRpdiBpZD0ibWFyc2hhbC1saXZlIiBjbGFzcz0iaGlkZGVuIiBzdHlsZT0iZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjtoZWlnaHQ6MTAwJSI+CiAgICAgIAogICAgICA8IS0tIEF1dG8tZGV0ZWN0IHRvZ2dsZSBiYXIgLS0+CiAgICAgIDxkaXYgaWQ9InhjLWF1dG8tYmFyIiBzdHlsZT0iZGlzcGxheTpub25lIiBjbGFzcz0ieGMtZGV0ZWN0LWJhciI+CiAgICAgICAgPGRpdiBjbGFzcz0ieGMtZGV0ZWN0LXB1bHNlIj48L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJmbGV4OjE7Zm9udC1zaXplOi44NXJlbTtmb250LXdlaWdodDo2MDA7Y29sb3I6dmFyKC0tdGV4dCkiIGlkPSJ4Yy1kZXRlY3Qtc3RhdHVzIj5TZXR0aW5nIHVw4oCmPC9kaXY+CiAgICAgICAgPGlucHV0IHR5cGU9InJhbmdlIiBpZD0ieGMtc2Vuc2l0aXZpdHkiIG1pbj0iOCIgbWF4PSI1NSIgdmFsdWU9IjIyIgogICAgICAgICAgc3R5bGU9IndpZHRoOjcwcHgiIHRpdGxlPSJTZW5zaXRpdml0eSIKICAgICAgICAgIG9uaW5wdXQ9InhjRGlmZlRocmVzaG9sZD0rdGhpcy52YWx1ZTtkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtc2Vucy12YWwnKS50ZXh0Q29udGVudD10aGlzLnZhbHVlIgogICAgICAgICAgPgogICAgICAgIDxzcGFuIGlkPSJ4Yy1zZW5zLXZhbCIgc3R5bGU9ImZvbnQtc2l6ZTouN3JlbTtjb2xvcjp2YXIoLS1tdXRlZCk7bWluLXdpZHRoOjE4cHgiPjIyPC9zcGFuPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbSIgb25jbGljaz0ieGNTdG9wQXV0b01vZGUoKSIgc3R5bGU9ImZvbnQtc2l6ZTouN3JlbSI+4pyVIE9mZjwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPCEtLSBBdXRvLWRldGVjdCBtb2RlIGJ1dHRvbiAtLT4KICAgICAgPGJ1dHRvbiBpZD0ieGMtYXV0by1tb2RlLWJ0biIgY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbSIKICAgICAgICBzdHlsZT0id2lkdGg6MTAwJTtib3JkZXItcmFkaXVzOjA7Ym9yZGVyLWxlZnQ6bm9uZTtib3JkZXItcmlnaHQ6bm9uZTtib3JkZXItdG9wOm5vbmU7cGFkZGluZzo4cHg7Zm9udC1zaXplOi44cmVtIgogICAgICAgIG9uY2xpY2s9InhjU3RhcnRBdXRvTW9kZSgpIj7wn46vIFN3aXRjaCB0byBBdXRvLURldGVjdCAobm8gdGFwcGluZyk8L2J1dHRvbj4KICAgICAgPCEtLSBCaWcgdGFwIGJ1dHRvbiDigJQgYWx3YXlzIHZpc2libGUsIGFsd2F5cyB0YXBwYWJsZSAtLT4KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuLXRhcCIgaWQ9Im1hcnNoYWwtdGFwLWJ0biIgb25jbGljaz0ibWFyc2hhbFRhcCgpIgogICAgICAgIHN0eWxlPSJmbGV4LXNocmluazowO2JvcmRlci1yYWRpdXM6MDttYXJnaW46MDt3aWR0aDoxMDAlIj4KICAgICAgICA8c3BhbiBjbGFzcz0idGFwLW1haW4iIGlkPSJtYXJzaGFsLWNsb2NrLW1pbmkiPjA6MDAuMDA8L3NwYW4+CiAgICAgICAgPHNwYW4gY2xhc3M9InRhcC1zdWIiPlRBUCBGSU5JU0g8L3NwYW4+CiAgICAgIDwvYnV0dG9uPgoKICAgICAgPCEtLSBGaW5pc2hlciBsaXN0IC0tPgogICAgICA8ZGl2IHN0eWxlPSJmbGV4OjE7b3ZlcmZsb3cteTphdXRvO3BhZGRpbmc6MTBweCAxNnB4IiBpZD0ibWFyc2hhbC1maW5pc2hlcy13cmFwIj4KICAgICAgICA8ZGl2IGlkPSJtYXJzaGFsLWZpbmlzaGVzLWxpc3QiPjwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9InRleHQtY2VudGVyIG10LTgiPgogICAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1pY29uIGJ0bi1zbSIgb25jbGljaz0ibWFyc2hhbFVuZG8oKSI+4oapIFVuZG8gbGFzdDwvYnV0dG9uPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDwhLS0gSW5saW5lIGJpYiBudW1wYWQgLS0+CiAgICAgIDxkaXYgaWQ9Im1hcnNoYWwtYmliLXBhZCIgY2xhc3M9ImhpZGRlbiIKICAgICAgICBzdHlsZT0iZmxleC1zaHJpbms6MDtwYWRkaW5nOjE0cHggMTZweCAxNnB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZS0yKTtib3JkZXItdG9wOjJweCBzb2xpZCB2YXIoLS1hY2NlbnQpIj4KICAgICAgICA8IS0tIEZpbmlzaCBwaG90byBwcmV2aWV3IC0tPgogICAgICAgIDxkaXYgY2xhc3M9ImZpbmlzaC1waG90by13cmFwIiBpZD0iZmluaXNoLXBob3RvLXdyYXAiPgogICAgICAgICAgPGRpdiBjbGFzcz0iZmluaXNoLXBob3RvLWNhcHR1cmluZyIgaWQ9ImZpbmlzaC1waG90by1zdGF0dXMiPvCfk7cgQ2FwdHVyaW5n4oCmPC9kaXY+CiAgICAgICAgICA8aW1nIGlkPSJmaW5pc2gtcGhvdG8taW1nIiBzcmM9IiIgc3R5bGU9ImRpc3BsYXk6bm9uZSI+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPCEtLSBCaWIgbGFiZWwgKyBPQ1Igcm93IC0tPgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDttYXJnaW4tYm90dG9tOjRweCI+CiAgICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MC44MnJlbTtmb250LXdlaWdodDo3MDA7Y29sb3I6dmFyKC0tdGV4dCk7ZmxleDoxIgogICAgICAgICAgICBpZD0ibWFyc2hhbC1iaWItZm9yIj5FbnRlciBiaWIgZm9yIDFzdCBwbGFjZTwvZGl2PgogICAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtIiBpZD0ib2NyLWJ0biIgb25jbGljaz0icnVuQmliT0NSKCkiIHN0eWxlPSJmbGV4LXNocmluazowO2ZvbnQtc2l6ZTowLjcycmVtIj7wn5SNIEF1dG88L2J1dHRvbj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6Mi4ycmVtO2ZvbnQtd2VpZ2h0OjcwMDtjb2xvcjp2YXIoLS1hY2NlbnQpO2xldHRlci1zcGFjaW5nOjAuMTJlbTttaW4taGVpZ2h0OjIuNnJlbTttYXJnaW4tYm90dG9tOjhweCIKICAgICAgICAgIGlkPSJtYXJzaGFsLWJpYi1kaXNwbGF5Ij5fPC9kaXY+CiAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczpyZXBlYXQoMywxZnIpO2dhcDo2cHg7bWF4LXdpZHRoOjI4MHB4Ij4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCcxJykiPjE8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCcyJykiPjI8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCczJykiPjM8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCc0JykiPjQ8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCc1JykiPjU8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCc2JykiPjY8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCc3JykiPjc8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCc4JykiPjg8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCc5JykiPjk8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW07Y29sb3I6dmFyKC0tZGFuZ2VyKSIgb25jbGljaz0iYmliQmFjaygpIj7ijKs8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0icGFkZGluZzoxNHB4O2ZvbnQtc2l6ZToxLjFyZW0iIG9uY2xpY2s9ImJpYkRpZ2l0KCcwJykiPjA8L2J1dHRvbj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgc3R5bGU9InBhZGRpbmc6MTRweDtmb250LXNpemU6MS4xcmVtIiBvbmNsaWNrPSJiaWJDb25maXJtKCkiPuKckzwvYnV0dG9uPgogICAgICAgIDwvZGl2PgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbSIgc3R5bGU9IndpZHRoOjEwMCU7bWF4LXdpZHRoOjI4MHB4O21hcmdpbi10b3A6OHB4IiBvbmNsaWNrPSJiaWJTa2lwKCkiPlNraXAg4oCUIGJpYiB1bmtub3duPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CiAgPC9kaXY+CjwvZGl2PgoKPCEtLSDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKICAgICBTQ1JFRU46IFhDIEFETUlOCuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0ic2NyZWVuLWFkbWluLXhjIiBjbGFzcz0ic2NyZWVuIj4KICA8ZGl2IGNsYXNzPSJoZWFkZXIiPgogICAgPGRpdiBjbGFzcz0iY29ubi1kb3QiIGlkPSJ4Yy1hZG1pbi1kb3QiPjwvZGl2PjxzcGFuIGlkPSJ4Yy1hZG1pbi1kb3QtbGJsIiBzdHlsZT0iZm9udC1zaXplOjAuNjVyZW07Zm9udC13ZWlnaHQ6NzAwO2xldHRlci1zcGFjaW5nOi4wNWVtO2NvbG9yOnZhcigtLW11dGVkKSI+PC9zcGFuPgogICAgPGRpdiBjbGFzcz0iaGVhZGVyLXRpdGxlIj5YQyBSYWNlIENvbnRyb2w8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci1yaWdodCI+PHNwYW4gY2xhc3M9InRleHQteHMgdGV4dC1tdXRlZCIgaWQ9InhjLWFkbWluLXNjaG9vbC1sYmwiPjwvc3Bhbj48L2Rpdj4KICA8L2Rpdj4KICA8ZGl2IGNsYXNzPSJjb250ZW50Ij4KCiAgICA8IS0tIFNldHVwIC0tPgogICAgPGRpdiBpZD0ieGMtc2V0dXAtcGFuZWwiPgogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJjYXJkLXRpdGxlIj5SYWNlIFNldHVwPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCI+CiAgICAgICAgICA8bGFiZWw+QWdlIEdyb3VwPC9sYWJlbD4KICAgICAgICAgIDxzZWxlY3QgaWQ9InhjLWFnZS1zZWwiPjwvc2VsZWN0PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImZvcm0tZ3JvdXAiPgogICAgICAgICAgPGxhYmVsPkdlbmRlcjwvbGFiZWw+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJwaWxsLXJvdyI+CiAgICAgICAgICAgIDxkaXYgY2xhc3M9InBpbGwgYWN0aXZlIiBkYXRhLXhjZz0iYm95cyIgb25jbGljaz0ic2VsZWN0WENHZW5kZXIoJ2JveXMnKSI+Qm95czwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJwaWxsIiBkYXRhLXhjZz0iZ2lybHMiIG9uY2xpY2s9InNlbGVjdFhDR2VuZGVyKCdnaXJscycpIj5HaXJsczwvZGl2PgogICAgICAgICAgICA8ZGl2IGNsYXNzPSJwaWxsIiBkYXRhLXhjZz0ibWl4ZWQiIG9uY2xpY2s9InNlbGVjdFhDR2VuZGVyKCdtaXhlZCcpIj5NaXhlZDwvZGl2PgogICAgICAgICAgPC9kaXY+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iZm9ybS1ncm91cCBtYi0wIj4KICAgICAgICAgIDxsYWJlbD5SYWNlIC8gRGlzdGFuY2U8L2xhYmVsPgogICAgICAgICAgPHNlbGVjdCBpZD0ieGMtZXZlbnQtc2VsIj48L3NlbGVjdD4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgb25jbGljaz0ieGNBZG1pbkFybSgpIj5BUk0gUkFDRSDihpI8L2J1dHRvbj4KICAgIDwvZGl2PgoKICAgIDwhLS0gTGl2ZSAtLT4KICAgIDxkaXYgaWQ9InhjLWxpdmUtcGFuZWwiIGNsYXNzPSJoaWRkZW4iPgogICAgICA8ZGl2IGNsYXNzPSJjYXJkIj4KICAgICAgICA8ZGl2IGNsYXNzPSJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtOCIgc3R5bGU9Im1hcmdpbi1ib3R0b206NnB4Ij4KICAgICAgICAgIDxkaXYgaWQ9InhjLXJhY2UtbGJsIiBzdHlsZT0iZm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxLjA1cmVtO2ZsZXg6MSI+PC9kaXY+CiAgICAgICAgICA8c3BhbiBpZD0ieGMtc3RhdGUtYmFkZ2UiIGNsYXNzPSJiYWRnZSBiYWRnZS1hcm1lZCI+QVJNRUQ8L3NwYW4+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY2xvY2siIGlkPSJ4Yy1hZG1pbi1jbG9jayIgc3R5bGU9ImZvbnQtc2l6ZTozcmVtO3BhZGRpbmc6OHB4IDAiPjA6MDAuMDA8L2Rpdj4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1nbyIgaWQ9InhjLWdvLWJ0biIgb25jbGljaz0ieGNBZG1pbkdvKCkiPkdPPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIG9uY2xpY2s9InhjQWRtaW5SZWNhbGwoKSI+UkVDQUxMPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyb3cgbXQtOCI+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIG9uY2xpY2s9InhjQWRtaW5BYmFuZG9uKCkiPkFCQU5ET048L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkgaGlkZGVuIiBpZD0ieGMtcHVibGlzaC1idG4iIG9uY2xpY2s9InhjQWRtaW5QdWJsaXNoKCkiPjxzdmcgd2lkdGg9JzIyJyBoZWlnaHQ9JzIyJyB2aWV3Qm94PScwIDAgMjQgMjQnIGZpbGw9J25vbmUnIHN0cm9rZT0nY3VycmVudENvbG9yJyBzdHJva2Utd2lkdGg9JzInIHN0cm9rZS1saW5lY2FwPSdyb3VuZCcgc3Ryb2tlLWxpbmVqb2luPSdyb3VuZCcgYXJpYS1oaWRkZW49J3RydWUnIHN0eWxlPSd2ZXJ0aWNhbC1hbGlnbjptaWRkbGUnPjxyZWN0IHg9JzgnIHk9JzInIHdpZHRoPSc4JyBoZWlnaHQ9JzQnIHJ4PScxJyByeT0nMScvPjxwYXRoIGQ9J00xNiA0aDJhMiAyIDAgMCAxIDIgMnYxNGEyIDIgMCAwIDEtMiAySDZhMiAyIDAgMCAxLTItMlY2YTIgMiAwIDAgMSAyLTJoMicvPjwvc3ZnPiBQdWJsaXNoIFJlc3VsdHM8L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICAgIDxociBjbGFzcz0iZGl2aWRlciI+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjEwcHg7bWFyZ2luLWJvdHRvbToxMHB4Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjYXJkLXRpdGxlIiBzdHlsZT0ibWFyZ2luLWJvdHRvbTowO2ZsZXg6MSI+RmluaXNoZXJzIDxzcGFuIGlkPSJ4Yy1jb3VudC1sYmwiIGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQteHMiPjwvc3Bhbj48L2Rpdj4KICAgICAgICA8bGFiZWwgc3R5bGU9ImZvbnQtc2l6ZTowLjc4cmVtO2NvbG9yOnZhcigtLW11dGVkKTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo2cHgiPgogICAgICAgICAg8J+PhSBRdWFsIHNwb3RzCiAgICAgICAgICA8aW5wdXQgdHlwZT0ibnVtYmVyIiBpZD0ieGMtcXVhbC1zcG90cyIgdmFsdWU9IjEwIiBtaW49IjAiIG1heD0iOTkiCiAgICAgICAgICAgIHN0eWxlPSJ3aWR0aDo1MnB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTMpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjZweDtjb2xvcjp2YXIoLS10ZXh0KTtwYWRkaW5nOjNweCA2cHg7Zm9udC1zaXplOjAuODJyZW07dGV4dC1hbGlnbjpjZW50ZXIiPgogICAgICAgIDwvbGFiZWw+CiAgICAgIDwvZGl2PgogICAgICA8ZGl2IGlkPSJ4Yy1maW5pc2hlcnMtbGlzdCI+PC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIFNDUkVFTjogWEMgT0JTRVJWRVIK4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQIC0tPgo8ZGl2IGlkPSJzY3JlZW4tb2JzZXJ2ZXIteGMiIGNsYXNzPSJzY3JlZW4iPgogIDxkaXYgY2xhc3M9ImhlYWRlciI+CiAgICA8ZGl2IGNsYXNzPSJjb25uLWRvdCIgaWQ9InhjLW9ic2VydmVyLWRvdCI+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItdGl0bGUiPlhDIExpdmUgUmVzdWx0czwvZGl2PgogICAgPGRpdiBjbGFzcz0iaGVhZGVyLXJpZ2h0Ij48c3BhbiBpZD0ieGMtb2JzZXJ2ZXItZXZlbnQtbGJsIiBjbGFzcz0idGV4dC14cyB0ZXh0LW11dGVkIj48L3NwYW4+PC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCI+CiAgICA8ZGl2IGNsYXNzPSJjbG9jayIgaWQ9InhjLW9ic2VydmVyLWNsb2NrIiBzdHlsZT0iZm9udC1zaXplOjIuOHJlbSI+MDowMC4wMDwvZGl2PgogICAgPGRpdiBpZD0ieGMtb2JzZXJ2ZXItcGxhY2VzIj48L2Rpdj4KICAgIDxkaXYgaWQ9InhjLW9ic2VydmVyLXdhaXRpbmciIGNsYXNzPSJ0ZXh0LWNlbnRlciB0ZXh0LW11dGVkIG10LTMyIj4KICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjIuNXJlbSI+PHN2ZyB3aWR0aD0nMjInIGhlaWdodD0nMjInIHZpZXdCb3g9JzAgMCAyNCAyNCcgZmlsbD0nbm9uZScgc3Ryb2tlPSdjdXJyZW50Q29sb3InIHN0cm9rZS13aWR0aD0nMicgc3Ryb2tlLWxpbmVjYXA9J3JvdW5kJyBzdHJva2UtbGluZWpvaW49J3JvdW5kJyBhcmlhLWhpZGRlbj0ndHJ1ZScgc3R5bGU9J3ZlcnRpY2FsLWFsaWduOm1pZGRsZSc+PHBhdGggZD0nTTEyIDIyVjhNNSA4bDctNiA3IDZNMyAyMmgxOE05IDIyVjE2aDZ2NicvPjwvc3ZnPjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJtdC04Ij5XYWl0aW5nIGZvciByYWNlIHRvIHN0YXJ0Li4uPC9kaXY+CiAgICA8L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIFNDUkVFTjogVklERU8gRklOSVNICuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0ic2NyZWVuLXZpZGVvLWZpbmlzaCIgY2xhc3M9InNjcmVlbiI+CiAgPGRpdiBjbGFzcz0iaGVhZGVyIj4KICAgIDxkaXYgY2xhc3M9ImNvbm4tZG90IiBpZD0idmYtZG90Ij48L2Rpdj48c3BhbiBpZD0idmYtZG90LWxibCIgc3R5bGU9ImZvbnQtc2l6ZTowLjY1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzouMDVlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPjwvc3Bhbj4KICAgIDxkaXY+CiAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci10aXRsZSI+VmlkZW8gRmluaXNoPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImhlYWRlci1zdWIiIGlkPSJ2Zi1oZWFkZXItc3ViIj5XYWl0aW5nIGZvciByYWNl4oCmPC9kaXY+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImhlYWRlci1yaWdodCI+CiAgICAgIDxzcGFuIGlkPSJ2Zi1iYWRnZSIgY2xhc3M9ImJhZGdlIiBzdHlsZT0iZGlzcGxheTpub25lIj48L3NwYW4+CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4taWNvbiBidG4tc20iIG9uY2xpY2s9InZmRXhpdCgpIj7ihpAgQmFjazwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCI+CgogICAgPCEtLSBMSVZFIERFVEVDVElPTiAtLT4KICAgIDxkaXYgaWQ9InZmLWNhcHR1cmUtcGFuZWwiPgogICAgICA8IS0tIENhbnZhcyBzaG93cyBsaXZlIGNhbWVyYSArIGxhbmUtc3RyaXAgb3ZlcmxheSAtLT4KICAgICAgPGNhbnZhcyBpZD0idmYtbGl2ZS1jYW52YXMiIGNsYXNzPSJ2Zi1jYW52YXMiPjwvY2FudmFzPgogICAgICA8dmlkZW8gaWQ9InZmLXZpZGVvLXByZXZpZXciIHN0eWxlPSJkaXNwbGF5Om5vbmUiIGF1dG9wbGF5IG11dGVkIHBsYXlzaW5saW5lPjwvdmlkZW8+CgogICAgICA8IS0tIFN0YXR1cyBiYXIgLS0+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDttYXJnaW4tdG9wOjEwcHgiPgogICAgICAgIDxkaXYgaWQ9InZmLXN0YXR1cy1kb3QiIHN0eWxlPSJ3aWR0aDoxMHB4O2hlaWdodDoxMHB4O2JvcmRlci1yYWRpdXM6NTAlO2JhY2tncm91bmQ6dmFyKC0tbXV0ZWQpO2ZsZXgtc2hyaW5rOjAiPjwvZGl2PgogICAgICAgIDxkaXYgaWQ9InZmLXJhY2Utc3RhdHVzIiBzdHlsZT0iZm9udC1zaXplOjAuODVyZW07Zm9udC13ZWlnaHQ6NjAwO2NvbG9yOnZhcigtLXRleHQpO2ZsZXg6MSI+U3RhcnRpbmcgY2FtZXJh4oCmPC9kaXY+CiAgICAgICAgPGRpdiBpZD0idmYtZGV0ZWN0LWNvdW50IiBzdHlsZT0iZm9udC1zaXplOjAuNzhyZW07Y29sb3I6dmFyKC0tbXV0ZWQpIj48L2Rpdj4KICAgICAgPC9kaXY+CgogICAgICA8IS0tIFNldHRpbmdzIC0tPgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweDttYXJnaW4tdG9wOjEycHg7ZmxleC13cmFwOndyYXA7YWxpZ24taXRlbXM6Y2VudGVyIj4KICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjRweCI+CiAgICAgICAgICA8YnV0dG9uIGlkPSJ2Zi1tb2RlLXN3aW0tYnRuIiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5IiAgICBzdHlsZT0iZm9udC1zaXplOjAuOHJlbTtwYWRkaW5nOjZweCAxMnB4IiBvbmNsaWNrPSJ2ZlNldE1vZGUoJ3N3aW0nKSI+U3dpbTwvYnV0dG9uPgogICAgICAgICAgPGJ1dHRvbiBpZD0idmYtbW9kZS10cmFjay1idG4iIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZvbnQtc2l6ZTowLjhyZW07cGFkZGluZzo2cHggMTJweCIgb25jbGljaz0idmZTZXRNb2RlKCd0cmFjaycpIj5UcmFjazwvYnV0dG9uPgogICAgICAgICAgPGJ1dHRvbiBpZD0idmYtY2FtLWZsaXAtYnRuIiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJmb250LXNpemU6MC44cmVtO3BhZGRpbmc6NnB4IDEwcHgiIHRpdGxlPSJTd2l0Y2ggZnJvbnQvYmFjayBjYW1lcmEiIG9uY2xpY2s9InZmRmxpcENhbWVyYSgpIj7wn5O34oaVPC9idXR0b24+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBpZD0idmYtbGFuZS1yb3ciIHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjRweDthbGlnbi1pdGVtczpjZW50ZXIiPgogICAgICAgICAgPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZTowLjc4cmVtO2NvbG9yOnZhcigtLW11dGVkKSI+TGFuZXM6PC9zcGFuPgogICAgICAgICAgPGJ1dHRvbiBjbGFzcz0idmYtbGFuZS1idG4gYWN0aXZlIiBkYXRhLWxhbmVzPSI0IiBvbmNsaWNrPSJ2ZlNldExhbmVzKDQpIj40PC9idXR0b24+CiAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJ2Zi1sYW5lLWJ0biIgZGF0YS1sYW5lcz0iNiIgb25jbGljaz0idmZTZXRMYW5lcyg2KSI+NjwvYnV0dG9uPgogICAgICAgICAgPGJ1dHRvbiBjbGFzcz0idmYtbGFuZS1idG4iIGRhdGEtbGFuZXM9IjgiIG9uY2xpY2s9InZmU2V0TGFuZXMoOCkiPjg8L2J1dHRvbj4KICAgICAgICA8L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2dhcDo2cHgiPgogICAgICAgICAgPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZTowLjc4cmVtO2NvbG9yOnZhcigtLW11dGVkKSI+UHJvZ3Jlc3MgdG9wPC9zcGFuPgogICAgICAgICAgPGlucHV0IHR5cGU9Im51bWJlciIgaWQ9InZmLXByb2dyZXNzLWlucHV0IiB2YWx1ZT0iMiIgbWluPSIxIiBtYXg9IjgiCiAgICAgICAgICAgIHN0eWxlPSJ3aWR0aDo0MnB4O3BhZGRpbmc6NHB4IDZweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjZweDtjb2xvcjp2YXIoLS10ZXh0KTtmb250LXNpemU6MC44NXJlbTt0ZXh0LWFsaWduOmNlbnRlciI+CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPCEtLSBPZmZzZXQgLS0+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDttYXJnaW4tdG9wOjEwcHg7cGFkZGluZzo4cHggMTBweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UtMik7Ym9yZGVyLXJhZGl1czo4cHgiPgogICAgICAgIDxkaXYgc3R5bGU9ImZsZXg6MTtmb250LXNpemU6MC43NnJlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPkNhbWVyYSBsYWcgb2Zmc2V0IChtcyBzdWJ0cmFjdGVkIGZvciBHT+KGkmRldGVjdCBsYWcpPC9kaXY+CiAgICAgICAgPGlucHV0IHR5cGU9Im51bWJlciIgaWQ9InZmLW9mZnNldC1pbnB1dCIgdmFsdWU9Ijc1IiBtaW49IjAiIG1heD0iOTk5IgogICAgICAgICAgc3R5bGU9IndpZHRoOjUycHg7cGFkZGluZzo0cHggNnB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZSk7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JvcmRlci1yYWRpdXM6NnB4O2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtc2l6ZTowLjg1cmVtO3RleHQtYWxpZ246Y2VudGVyIj4KICAgICAgPC9kaXY+CgogICAgICA8IS0tIFJlc3VsdHMgLS0+CiAgICAgIDxkaXYgc3R5bGU9Im1hcmdpbi10b3A6MTRweCI+CiAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjttYXJnaW4tYm90dG9tOjhweCI+CiAgICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXNpemU6MC43OHJlbTtmb250LXdlaWdodDo3MDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4wNmVtO2NvbG9yOnZhcigtLW11dGVkKSI+RmluaXNoZXM8L2Rpdj4KICAgICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0iZm9udC1zaXplOjAuNzJyZW07cGFkZGluZzo0cHggMTBweCIgb25jbGljaz0idmZNYW51YWxBZGQoKSI+KyBBZGQgTWFudWFsPC9idXR0b24+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBpZD0idmYtbWFyay1saXN0Ij48ZGl2IGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQtc20gdGV4dC1jZW50ZXIgbXQtOCI+V2FpdGluZyBmb3IgcmFjZeKApjwvZGl2PjwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDwhLS0gUHVibGlzaCAtLT4KICAgICAgPGRpdiBzdHlsZT0ibWFyZ2luLXRvcDoxNnB4Ij4KICAgICAgICA8YnV0dG9uIGlkPSJ2Zi1wdWJsaXNoLWJ0biIgY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgc3R5bGU9IndpZHRoOjEwMCUiIG9uY2xpY2s9InZmUHVibGlzaCgpIj4KICAgICAgICAgIFB1Ymxpc2ggVGltZXMg4oaSCiAgICAgICAgPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+CgogIDwvZGl2Pgo8L2Rpdj4KCjwhLS0g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCiAgICAgU0NSRUVOOiBKT0lOIFBBR0UgKFFSKQrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxkaXYgaWQ9InNjcmVlbi1zaGFyZSIgY2xhc3M9InNjcmVlbiI+CiAgPGRpdiBjbGFzcz0iaGVhZGVyIj4KICAgIDxkaXYgY2xhc3M9ImxvZ28tYmFkZ2UiPlNQPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItdGl0bGUiIGlkPSJzaGFyZS1zY2hvb2wtbmFtZSI+Sm9pbiBQYWdlPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItcmlnaHQiPgogICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLWljb24gYnRuLXNtIiBvbmNsaWNrPSJlbnRlclJvbGUoJ3JvbGUnKSI+4oaQIEJhY2s8L2J1dHRvbj4KICAgIDwvZGl2PgogIDwvZGl2PgogIDxkaXYgY2xhc3M9ImNvbnRlbnQgdGV4dC1jZW50ZXIiPgogICAgPGRpdiBjbGFzcz0iY2FyZCI+CiAgICAgIDxkaXYgY2xhc3M9ImNhcmQtdGl0bGUiPlNjYW4gdG8gSm9pbjwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJxci13cmFwIj48ZGl2IGlkPSJzaGFyZS1xciIgc3R5bGU9IndpZHRoOjE4MHB4O2hlaWdodDoxODBweDtwYWRkaW5nOjhweDtiYWNrZ3JvdW5kOiMxNjFiMjI7Ym9yZGVyLXJhZGl1czo2cHg7Ij48L2Rpdj48L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0idGV4dC1tdXRlZCB0ZXh0LXNtIG10LTgiIGlkPSJzaGFyZS1jYXJuaXZhbC1uYW1lIj48L2Rpdj4KICAgIDwvZGl2PgogICAgPGRpdiBjbGFzcz0iY2FyZC10aXRsZSB0ZXh0LW11dGVkIG10LTgiPk9yIGVudGVyIHRoaXMgY29kZTwvZGl2PgogICAgPGRpdiBjbGFzcz0iam9pbi1jb2RlIiBpZD0ic2hhcmUtam9pbi1jb2RlIj48L2Rpdj4KICAgIDxkaXYgY2xhc3M9InRleHQtbXV0ZWQgdGV4dC14cyBtdC04Ij5PcGVuIGNhcm5pdmFsdGltaW5nLmNvbSBhbmQgdGFwICJKb2luIENhcm5pdmFsIjwvZGl2PgogIDwvZGl2Pgo8L2Rpdj4KCjwhLS0g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCiAgICAgU0NSRUVOOiBSRVNVTFRTCuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0ic2NyZWVuLXJlc3VsdHMiIGNsYXNzPSJzY3JlZW4iPgogIDxkaXYgY2xhc3M9ImhlYWRlciI+CiAgICA8ZGl2IGNsYXNzPSJsb2dvLWJhZGdlIj5TUDwvZGl2PgogICAgPGRpdiBjbGFzcz0iaGVhZGVyLXRpdGxlIj5SZXN1bHRzPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJoZWFkZXItcmlnaHQiPgogICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLWljb24gYnRuLXNtIiBvbmNsaWNrPSJleHBvcnRDU1YoKSI+PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHlsZT0idmVydGljYWwtYWxpZ246bWlkZGxlO21hcmdpbi1yaWdodDo0cHgiPjxwYXRoIGQ9Ik0yMSAxNXY0YTIgMiAwIDAgMS0yIDJINWEyIDIgMCAwIDEtMi0ydi00Ii8+PHBvbHlsaW5lIHBvaW50cz0iNyAxMCAxMiAxNSAxNyAxMCIvPjxsaW5lIHgxPSIxMiIgeTE9IjE1IiB4Mj0iMTIiIHkyPSIzIi8+PC9zdmc+IENTVjwvYnV0dG9uPgogICAgPC9kaXY+CiAgPC9kaXY+CiAgPGRpdiBjbGFzcz0iY29udGVudCI+CiAgICA8ZGl2IGlkPSJyZXN1bHRzLWFsbCIgY2xhc3M9InRleHQtbXV0ZWQgdGV4dC1jZW50ZXIgbXQtMzIiPkxvYWRpbmcuLi48L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIE9WRVJMQVlTCuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0iY291bnRkb3duLW92ZXJsYXkiPgogIDxkaXYgaWQ9ImNvdW50ZG93bi1udW0iIHN0eWxlPSJjb2xvcjp2YXIoLS10ZXh0KSI+MzwvZGl2PgogIDxkaXYgaWQ9ImNvdW50ZG93bi1sYWJlbCI+R2V0IHNldC4uLjwvZGl2Pgo8L2Rpdj4KCjxkaXYgaWQ9ImZsYXNoLW92ZXJsYXkiPjwvZGl2Pgo8ZGl2IGlkPSJ0YXAtZmxhc2giPjwvZGl2Pgo8ZGl2IGlkPSJ0b2FzdCI+PC9kaXY+Cgo8ZGl2IGNsYXNzPSJtb2RhbC1iYWNrZHJvcCIgaWQ9Im1vZGFsLWJkIj4KICA8ZGl2IGNsYXNzPSJtb2RhbCI+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC10aXRsZSIgaWQ9Im1vZGFsLXR0bCI+PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJtb2RhbC1ib2R5IiBpZD0ibW9kYWwtYmR5Ij48L2Rpdj4KICAgIDxkaXYgY2xhc3M9InN0YWNrIiBpZD0ibW9kYWwtYnRucy13cmFwIj48L2Rpdj4KICA8L2Rpdj4KPC9kaXY+Cgo8IS0tIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAogICAgIEZJUkVCQVNFIFNESwrilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAgLS0+CjxzY3JpcHQ+CiAgICAvLyBJbmxpbmVkIFFSQ29kZSBnZW5lcmF0b3IgKGRhdmlkc2hpbWpzL3FyY29kZWpzIDEuMC4wKSDigJQgbm8gZXh0ZXJuYWwgZGVwZW5kZW5jeQogICAgdmFyIFFSQ29kZTshZnVuY3Rpb24oKXtmdW5jdGlvbiBhKGEpe3RoaXMubW9kZT1jLk1PREVfOEJJVF9CWVRFLHRoaXMuZGF0YT1hLHRoaXMucGFyc2VkRGF0YT1bXTtmb3IodmFyIGI9W10sZD0wLGU9dGhpcy5kYXRhLmxlbmd0aDtlPmQ7ZCsrKXt2YXIgZj10aGlzLmRhdGEuY2hhckNvZGVBdChkKTtmPjY1NTM2PyhiWzBdPTI0MHwoMTgzNTAwOCZmKT4+PjE4LGJbMV09MTI4fCgyNTgwNDgmZik+Pj4xMixiWzJdPTEyOHwoNDAzMiZmKT4+PjYsYlszXT0xMjh8NjMmZik6Zj4yMDQ4PyhiWzBdPTIyNHwoNjE0NDAmZik+Pj4xMixiWzFdPTEyOHwoNDAzMiZmKT4+PjYsYlsyXT0xMjh8NjMmZik6Zj4xMjg/KGJbMF09MTkyfCgxOTg0JmYpPj4+NixiWzFdPTEyOHw2MyZmKTpiWzBdPWYsdGhpcy5wYXJzZWREYXRhPXRoaXMucGFyc2VkRGF0YS5jb25jYXQoYil9dGhpcy5wYXJzZWREYXRhLmxlbmd0aCE9dGhpcy5kYXRhLmxlbmd0aCYmKHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDE5MSksdGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMTg3KSx0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgyMzkpKX1mdW5jdGlvbiBiKGEsYil7dGhpcy50eXBlTnVtYmVyPWEsdGhpcy5lcnJvckNvcnJlY3RMZXZlbD1iLHRoaXMubW9kdWxlcz1udWxsLHRoaXMubW9kdWxlQ291bnQ9MCx0aGlzLmRhdGFDYWNoZT1udWxsLHRoaXMuZGF0YUxpc3Q9W119ZnVuY3Rpb24gaShhLGIpe2lmKHZvaWQgMD09YS5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKGEubGVuZ3RoKyIvIitiKTtmb3IodmFyIGM9MDtjPGEubGVuZ3RoJiYwPT1hW2NdOyljKys7dGhpcy5udW09bmV3IEFycmF5KGEubGVuZ3RoLWMrYik7Zm9yKHZhciBkPTA7ZDxhLmxlbmd0aC1jO2QrKyl0aGlzLm51bVtkXT1hW2QrY119ZnVuY3Rpb24gaihhLGIpe3RoaXMudG90YWxDb3VudD1hLHRoaXMuZGF0YUNvdW50PWJ9ZnVuY3Rpb24gaygpe3RoaXMuYnVmZmVyPVtdLHRoaXMubGVuZ3RoPTB9ZnVuY3Rpb24gbSgpe3JldHVybiJ1bmRlZmluZWQiIT10eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfWZ1bmN0aW9uIG4oKXt2YXIgYT0hMSxiPW5hdmlnYXRvci51c2VyQWdlbnQ7cmV0dXJuL2FuZHJvaWQvaS50ZXN0KGIpJiYoYT0hMCxhTWF0PWIudG9TdHJpbmcoKS5tYXRjaCgvYW5kcm9pZCAoWzAtOV1cLlswLTldKS9pKSxhTWF0JiZhTWF0WzFdJiYoYT1wYXJzZUZsb2F0KGFNYXRbMV0pKSksYX1mdW5jdGlvbiByKGEsYil7Zm9yKHZhciBjPTEsZT1zKGEpLGY9MCxnPWwubGVuZ3RoO2c+PWY7ZisrKXt2YXIgaD0wO3N3aXRjaChiKXtjYXNlIGQuTDpoPWxbZl1bMF07YnJlYWs7Y2FzZSBkLk06aD1sW2ZdWzFdO2JyZWFrO2Nhc2UgZC5ROmg9bFtmXVsyXTticmVhaztjYXNlIGQuSDpoPWxbZl1bM119aWYoaD49ZSlicmVhaztjKyt9aWYoYz5sLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoIlRvbyBsb25nIGRhdGEiKTtyZXR1cm4gY31mdW5jdGlvbiBzKGEpe3ZhciBiPWVuY29kZVVSSShhKS50b1N0cmluZygpLnJlcGxhY2UoL1wlWzAtOWEtZkEtRl17Mn0vZywiYSIpO3JldHVybiBiLmxlbmd0aCsoYi5sZW5ndGghPWE/MzowKX1hLnByb3RvdHlwZT17Z2V0TGVuZ3RoOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMucGFyc2VkRGF0YS5sZW5ndGh9LHdyaXRlOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0wLGM9dGhpcy5wYXJzZWREYXRhLmxlbmd0aDtjPmI7YisrKWEucHV0KHRoaXMucGFyc2VkRGF0YVtiXSw4KX19LGIucHJvdG90eXBlPXthZGREYXRhOmZ1bmN0aW9uKGIpe3ZhciBjPW5ldyBhKGIpO3RoaXMuZGF0YUxpc3QucHVzaChjKSx0aGlzLmRhdGFDYWNoZT1udWxsfSxpc0Rhcms6ZnVuY3Rpb24oYSxiKXtpZigwPmF8fHRoaXMubW9kdWxlQ291bnQ8PWF8fDA+Ynx8dGhpcy5tb2R1bGVDb3VudDw9Yil0aHJvdyBuZXcgRXJyb3IoYSsiLCIrYik7cmV0dXJuIHRoaXMubW9kdWxlc1thXVtiXX0sZ2V0TW9kdWxlQ291bnQ6ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5tb2R1bGVDb3VudH0sbWFrZTpmdW5jdGlvbigpe3RoaXMubWFrZUltcGwoITEsdGhpcy5nZXRCZXN0TWFza1BhdHRlcm4oKSl9LG1ha2VJbXBsOmZ1bmN0aW9uKGEsYyl7dGhpcy5tb2R1bGVDb3VudD00KnRoaXMudHlwZU51bWJlcisxNyx0aGlzLm1vZHVsZXM9bmV3IEFycmF5KHRoaXMubW9kdWxlQ291bnQpO2Zvcih2YXIgZD0wO2Q8dGhpcy5tb2R1bGVDb3VudDtkKyspe3RoaXMubW9kdWxlc1tkXT1uZXcgQXJyYXkodGhpcy5tb2R1bGVDb3VudCk7Zm9yKHZhciBlPTA7ZTx0aGlzLm1vZHVsZUNvdW50O2UrKyl0aGlzLm1vZHVsZXNbZF1bZV09bnVsbH10aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwwKSx0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4odGhpcy5tb2R1bGVDb3VudC03LDApLHRoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybigwLHRoaXMubW9kdWxlQ291bnQtNyksdGhpcy5zZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybigpLHRoaXMuc2V0dXBUaW1pbmdQYXR0ZXJuKCksdGhpcy5zZXR1cFR5cGVJbmZvKGEsYyksdGhpcy50eXBlTnVtYmVyPj03JiZ0aGlzLnNldHVwVHlwZU51bWJlcihhKSxudWxsPT10aGlzLmRhdGFDYWNoZSYmKHRoaXMuZGF0YUNhY2hlPWIuY3JlYXRlRGF0YSh0aGlzLnR5cGVOdW1iZXIsdGhpcy5lcnJvckNvcnJlY3RMZXZlbCx0aGlzLmRhdGFMaXN0KSksdGhpcy5tYXBEYXRhKHRoaXMuZGF0YUNhY2hlLGMpfSxzZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuOmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPS0xOzc+PWM7YysrKWlmKCEoLTE+PWErY3x8dGhpcy5tb2R1bGVDb3VudDw9YStjKSlmb3IodmFyIGQ9LTE7Nz49ZDtkKyspLTE+PWIrZHx8dGhpcy5tb2R1bGVDb3VudDw9YitkfHwodGhpcy5tb2R1bGVzW2ErY11bYitkXT1jPj0wJiY2Pj1jJiYoMD09ZHx8Nj09ZCl8fGQ+PTAmJjY+PWQmJigwPT1jfHw2PT1jKXx8Yz49MiYmND49YyYmZD49MiYmND49ZD8hMDohMSl9LGdldEJlc3RNYXNrUGF0dGVybjpmdW5jdGlvbigpe2Zvcih2YXIgYT0wLGI9MCxjPTA7OD5jO2MrKyl7dGhpcy5tYWtlSW1wbCghMCxjKTt2YXIgZD1mLmdldExvc3RQb2ludCh0aGlzKTsoMD09Y3x8YT5kKSYmKGE9ZCxiPWMpfXJldHVybiBifSxjcmVhdGVNb3ZpZUNsaXA6ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWEuY3JlYXRlRW1wdHlNb3ZpZUNsaXAoYixjKSxlPTE7dGhpcy5tYWtlKCk7Zm9yKHZhciBmPTA7Zjx0aGlzLm1vZHVsZXMubGVuZ3RoO2YrKylmb3IodmFyIGc9ZiplLGg9MDtoPHRoaXMubW9kdWxlc1tmXS5sZW5ndGg7aCsrKXt2YXIgaT1oKmUsaj10aGlzLm1vZHVsZXNbZl1baF07aiYmKGQuYmVnaW5GaWxsKDAsMTAwKSxkLm1vdmVUbyhpLGcpLGQubGluZVRvKGkrZSxnKSxkLmxpbmVUbyhpK2UsZytlKSxkLmxpbmVUbyhpLGcrZSksZC5lbmRGaWxsKCkpfXJldHVybiBkfSxzZXR1cFRpbWluZ1BhdHRlcm46ZnVuY3Rpb24oKXtmb3IodmFyIGE9ODthPHRoaXMubW9kdWxlQ291bnQtODthKyspbnVsbD09dGhpcy5tb2R1bGVzW2FdWzZdJiYodGhpcy5tb2R1bGVzW2FdWzZdPTA9PWElMik7Zm9yKHZhciBiPTg7Yjx0aGlzLm1vZHVsZUNvdW50LTg7YisrKW51bGw9PXRoaXMubW9kdWxlc1s2XVtiXSYmKHRoaXMubW9kdWxlc1s2XVtiXT0wPT1iJTIpfSxzZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybjpmdW5jdGlvbigpe2Zvcih2YXIgYT1mLmdldFBhdHRlcm5Qb3NpdGlvbih0aGlzLnR5cGVOdW1iZXIpLGI9MDtiPGEubGVuZ3RoO2IrKylmb3IodmFyIGM9MDtjPGEubGVuZ3RoO2MrKyl7dmFyIGQ9YVtiXSxlPWFbY107aWYobnVsbD09dGhpcy5tb2R1bGVzW2RdW2VdKWZvcih2YXIgZz0tMjsyPj1nO2crKylmb3IodmFyIGg9LTI7Mj49aDtoKyspdGhpcy5tb2R1bGVzW2QrZ11bZStoXT0tMj09Z3x8Mj09Z3x8LTI9PWh8fDI9PWh8fDA9PWcmJjA9PWg/ITA6ITF9fSxzZXR1cFR5cGVOdW1iZXI6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPWYuZ2V0QkNIVHlwZU51bWJlcih0aGlzLnR5cGVOdW1iZXIpLGM9MDsxOD5jO2MrKyl7dmFyIGQ9IWEmJjE9PSgxJmI+PmMpO3RoaXMubW9kdWxlc1tNYXRoLmZsb29yKGMvMyldW2MlMyt0aGlzLm1vZHVsZUNvdW50LTgtM109ZH1mb3IodmFyIGM9MDsxOD5jO2MrKyl7dmFyIGQ9IWEmJjE9PSgxJmI+PmMpO3RoaXMubW9kdWxlc1tjJTMrdGhpcy5tb2R1bGVDb3VudC04LTNdW01hdGguZmxvb3IoYy8zKV09ZH19LHNldHVwVHlwZUluZm86ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9dGhpcy5lcnJvckNvcnJlY3RMZXZlbDw8M3xiLGQ9Zi5nZXRCQ0hUeXBlSW5mbyhjKSxlPTA7MTU+ZTtlKyspe3ZhciBnPSFhJiYxPT0oMSZkPj5lKTs2PmU/dGhpcy5tb2R1bGVzW2VdWzhdPWc6OD5lP3RoaXMubW9kdWxlc1tlKzFdWzhdPWc6dGhpcy5tb2R1bGVzW3RoaXMubW9kdWxlQ291bnQtMTUrZV1bOF09Z31mb3IodmFyIGU9MDsxNT5lO2UrKyl7dmFyIGc9IWEmJjE9PSgxJmQ+PmUpOzg+ZT90aGlzLm1vZHVsZXNbOF1bdGhpcy5tb2R1bGVDb3VudC1lLTFdPWc6OT5lP3RoaXMubW9kdWxlc1s4XVsxNS1lLTErMV09Zzp0aGlzLm1vZHVsZXNbOF1bMTUtZS0xXT1nfXRoaXMubW9kdWxlc1t0aGlzLm1vZHVsZUNvdW50LThdWzhdPSFhfSxtYXBEYXRhOmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPS0xLGQ9dGhpcy5tb2R1bGVDb3VudC0xLGU9NyxnPTAsaD10aGlzLm1vZHVsZUNvdW50LTE7aD4wO2gtPTIpZm9yKDY9PWgmJmgtLTs7KXtmb3IodmFyIGk9MDsyPmk7aSsrKWlmKG51bGw9PXRoaXMubW9kdWxlc1tkXVtoLWldKXt2YXIgaj0hMTtnPGEubGVuZ3RoJiYoaj0xPT0oMSZhW2ddPj4+ZSkpO3ZhciBrPWYuZ2V0TWFzayhiLGQsaC1pKTtrJiYoaj0haiksdGhpcy5tb2R1bGVzW2RdW2gtaV09aixlLS0sLTE9PWUmJihnKyssZT03KX1pZihkKz1jLDA+ZHx8dGhpcy5tb2R1bGVDb3VudDw9ZCl7ZC09YyxjPS1jO2JyZWFrfX19fSxiLlBBRDA9MjM2LGIuUEFEMT0xNyxiLmNyZWF0ZURhdGE9ZnVuY3Rpb24oYSxjLGQpe2Zvcih2YXIgZT1qLmdldFJTQmxvY2tzKGEsYyksZz1uZXcgayxoPTA7aDxkLmxlbmd0aDtoKyspe3ZhciBpPWRbaF07Zy5wdXQoaS5tb2RlLDQpLGcucHV0KGkuZ2V0TGVuZ3RoKCksZi5nZXRMZW5ndGhJbkJpdHMoaS5tb2RlLGEpKSxpLndyaXRlKGcpfWZvcih2YXIgbD0wLGg9MDtoPGUubGVuZ3RoO2grKylsKz1lW2hdLmRhdGFDb3VudDtpZihnLmdldExlbmd0aEluQml0cygpPjgqbCl0aHJvdyBuZXcgRXJyb3IoImNvZGUgbGVuZ3RoIG92ZXJmbG93LiAoIitnLmdldExlbmd0aEluQml0cygpKyI+Iis4KmwrIikiKTtmb3IoZy5nZXRMZW5ndGhJbkJpdHMoKSs0PD04KmwmJmcucHV0KDAsNCk7MCE9Zy5nZXRMZW5ndGhJbkJpdHMoKSU4OylnLnB1dEJpdCghMSk7Zm9yKDs7KXtpZihnLmdldExlbmd0aEluQml0cygpPj04KmwpYnJlYWs7aWYoZy5wdXQoYi5QQUQwLDgpLGcuZ2V0TGVuZ3RoSW5CaXRzKCk+PTgqbClicmVhaztnLnB1dChiLlBBRDEsOCl9cmV0dXJuIGIuY3JlYXRlQnl0ZXMoZyxlKX0sYi5jcmVhdGVCeXRlcz1mdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0wLGQ9MCxlPTAsZz1uZXcgQXJyYXkoYi5sZW5ndGgpLGg9bmV3IEFycmF5KGIubGVuZ3RoKSxqPTA7ajxiLmxlbmd0aDtqKyspe3ZhciBrPWJbal0uZGF0YUNvdW50LGw9YltqXS50b3RhbENvdW50LWs7ZD1NYXRoLm1heChkLGspLGU9TWF0aC5tYXgoZSxsKSxnW2pdPW5ldyBBcnJheShrKTtmb3IodmFyIG09MDttPGdbal0ubGVuZ3RoO20rKylnW2pdW21dPTI1NSZhLmJ1ZmZlclttK2NdO2MrPWs7dmFyIG49Zi5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsKGwpLG89bmV3IGkoZ1tqXSxuLmdldExlbmd0aCgpLTEpLHA9by5tb2Qobik7aFtqXT1uZXcgQXJyYXkobi5nZXRMZW5ndGgoKS0xKTtmb3IodmFyIG09MDttPGhbal0ubGVuZ3RoO20rKyl7dmFyIHE9bStwLmdldExlbmd0aCgpLWhbal0ubGVuZ3RoO2hbal1bbV09cT49MD9wLmdldChxKTowfX1mb3IodmFyIHI9MCxtPTA7bTxiLmxlbmd0aDttKyspcis9YlttXS50b3RhbENvdW50O2Zvcih2YXIgcz1uZXcgQXJyYXkociksdD0wLG09MDtkPm07bSsrKWZvcih2YXIgaj0wO2o8Yi5sZW5ndGg7aisrKW08Z1tqXS5sZW5ndGgmJihzW3QrK109Z1tqXVttXSk7Zm9yKHZhciBtPTA7ZT5tO20rKylmb3IodmFyIGo9MDtqPGIubGVuZ3RoO2orKyltPGhbal0ubGVuZ3RoJiYoc1t0KytdPWhbal1bbV0pO3JldHVybiBzfTtmb3IodmFyIGM9e01PREVfTlVNQkVSOjEsTU9ERV9BTFBIQV9OVU06MixNT0RFXzhCSVRfQllURTo0LE1PREVfS0FOSkk6OH0sZD17TDoxLE06MCxROjMsSDoyfSxlPXtQQVRURVJOMDAwOjAsUEFUVEVSTjAwMToxLFBBVFRFUk4wMTA6MixQQVRURVJOMDExOjMsUEFUVEVSTjEwMDo0LFBBVFRFUk4xMDE6NSxQQVRURVJOMTEwOjYsUEFUVEVSTjExMTo3fSxmPXtQQVRURVJOX1BPU0lUSU9OX1RBQkxFOltbXSxbNiwxOF0sWzYsMjJdLFs2LDI2XSxbNiwzMF0sWzYsMzRdLFs2LDIyLDM4XSxbNiwyNCw0Ml0sWzYsMjYsNDZdLFs2LDI4LDUwXSxbNiwzMCw1NF0sWzYsMzIsNThdLFs2LDM0LDYyXSxbNiwyNiw0Niw2Nl0sWzYsMjYsNDgsNzBdLFs2LDI2LDUwLDc0XSxbNiwzMCw1NCw3OF0sWzYsMzAsNTYsODJdLFs2LDMwLDU4LDg2XSxbNiwzNCw2Miw5MF0sWzYsMjgsNTAsNzIsOTRdLFs2LDI2LDUwLDc0LDk4XSxbNiwzMCw1NCw3OCwxMDJdLFs2LDI4LDU0LDgwLDEwNl0sWzYsMzIsNTgsODQsMTEwXSxbNiwzMCw1OCw4NiwxMTRdLFs2LDM0LDYyLDkwLDExOF0sWzYsMjYsNTAsNzQsOTgsMTIyXSxbNiwzMCw1NCw3OCwxMDIsMTI2XSxbNiwyNiw1Miw3OCwxMDQsMTMwXSxbNiwzMCw1Niw4MiwxMDgsMTM0XSxbNiwzNCw2MCw4NiwxMTIsMTM4XSxbNiwzMCw1OCw4NiwxMTQsMTQyXSxbNiwzNCw2Miw5MCwxMTgsMTQ2XSxbNiwzMCw1NCw3OCwxMDIsMTI2LDE1MF0sWzYsMjQsNTAsNzYsMTAyLDEyOCwxNTRdLFs2LDI4LDU0LDgwLDEwNiwxMzIsMTU4XSxbNiwzMiw1OCw4NCwxMTAsMTM2LDE2Ml0sWzYsMjYsNTQsODIsMTEwLDEzOCwxNjZdLFs2LDMwLDU4LDg2LDExNCwxNDIsMTcwXV0sRzE1OjEzMzUsRzE4Ojc5NzMsRzE1X01BU0s6MjE1MjIsZ2V0QkNIVHlwZUluZm86ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPWE8PDEwO2YuZ2V0QkNIRGlnaXQoYiktZi5nZXRCQ0hEaWdpdChmLkcxNSk+PTA7KWJePWYuRzE1PDxmLmdldEJDSERpZ2l0KGIpLWYuZ2V0QkNIRGlnaXQoZi5HMTUpO3JldHVybihhPDwxMHxiKV5mLkcxNV9NQVNLfSxnZXRCQ0hUeXBlTnVtYmVyOmZ1bmN0aW9uKGEpe2Zvcih2YXIgYj1hPDwxMjtmLmdldEJDSERpZ2l0KGIpLWYuZ2V0QkNIRGlnaXQoZi5HMTgpPj0wOyliXj1mLkcxODw8Zi5nZXRCQ0hEaWdpdChiKS1mLmdldEJDSERpZ2l0KGYuRzE4KTtyZXR1cm4gYTw8MTJ8Yn0sZ2V0QkNIRGlnaXQ6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTA7MCE9YTspYisrLGE+Pj49MTtyZXR1cm4gYn0sZ2V0UGF0dGVyblBvc2l0aW9uOmZ1bmN0aW9uKGEpe3JldHVybiBmLlBBVFRFUk5fUE9TSVRJT05fVEFCTEVbYS0xXX0sZ2V0TWFzazpmdW5jdGlvbihhLGIsYyl7c3dpdGNoKGEpe2Nhc2UgZS5QQVRURVJOMDAwOnJldHVybiAwPT0oYitjKSUyO2Nhc2UgZS5QQVRURVJOMDAxOnJldHVybiAwPT1iJTI7Y2FzZSBlLlBBVFRFUk4wMTA6cmV0dXJuIDA9PWMlMztjYXNlIGUuUEFUVEVSTjAxMTpyZXR1cm4gMD09KGIrYyklMztjYXNlIGUuUEFUVEVSTjEwMDpyZXR1cm4gMD09KE1hdGguZmxvb3IoYi8yKStNYXRoLmZsb29yKGMvMykpJTI7Y2FzZSBlLlBBVFRFUk4xMDE6cmV0dXJuIDA9PWIqYyUyK2IqYyUzO2Nhc2UgZS5QQVRURVJOMTEwOnJldHVybiAwPT0oYipjJTIrYipjJTMpJTI7Y2FzZSBlLlBBVFRFUk4xMTE6cmV0dXJuIDA9PShiKmMlMysoYitjKSUyKSUyO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJiYWQgbWFza1BhdHRlcm46IithKX19LGdldEVycm9yQ29ycmVjdFBvbHlub21pYWw6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPW5ldyBpKFsxXSwwKSxjPTA7YT5jO2MrKyliPWIubXVsdGlwbHkobmV3IGkoWzEsZy5nZXhwKGMpXSwwKSk7cmV0dXJuIGJ9LGdldExlbmd0aEluQml0czpmdW5jdGlvbihhLGIpe2lmKGI+PTEmJjEwPmIpc3dpdGNoKGEpe2Nhc2UgYy5NT0RFX05VTUJFUjpyZXR1cm4gMTA7Y2FzZSBjLk1PREVfQUxQSEFfTlVNOnJldHVybiA5O2Nhc2UgYy5NT0RFXzhCSVRfQllURTpyZXR1cm4gODtjYXNlIGMuTU9ERV9LQU5KSTpyZXR1cm4gODtkZWZhdWx0OnRocm93IG5ldyBFcnJvcigibW9kZToiK2EpfWVsc2UgaWYoMjc+Yilzd2l0Y2goYSl7Y2FzZSBjLk1PREVfTlVNQkVSOnJldHVybiAxMjtjYXNlIGMuTU9ERV9BTFBIQV9OVU06cmV0dXJuIDExO2Nhc2UgYy5NT0RFXzhCSVRfQllURTpyZXR1cm4gMTY7Y2FzZSBjLk1PREVfS0FOSkk6cmV0dXJuIDEwO2RlZmF1bHQ6dGhyb3cgbmV3IEVycm9yKCJtb2RlOiIrYSl9ZWxzZXtpZighKDQxPmIpKXRocm93IG5ldyBFcnJvcigidHlwZToiK2IpO3N3aXRjaChhKXtjYXNlIGMuTU9ERV9OVU1CRVI6cmV0dXJuIDE0O2Nhc2UgYy5NT0RFX0FMUEhBX05VTTpyZXR1cm4gMTM7Y2FzZSBjLk1PREVfOEJJVF9CWVRFOnJldHVybiAxNjtjYXNlIGMuTU9ERV9LQU5KSTpyZXR1cm4gMTI7ZGVmYXVsdDp0aHJvdyBuZXcgRXJyb3IoIm1vZGU6IithKX19fSxnZXRMb3N0UG9pbnQ6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPWEuZ2V0TW9kdWxlQ291bnQoKSxjPTAsZD0wO2I+ZDtkKyspZm9yKHZhciBlPTA7Yj5lO2UrKyl7Zm9yKHZhciBmPTAsZz1hLmlzRGFyayhkLGUpLGg9LTE7MT49aDtoKyspaWYoISgwPmQraHx8ZCtoPj1iKSlmb3IodmFyIGk9LTE7MT49aTtpKyspMD5lK2l8fGUraT49Ynx8KDAhPWh8fDAhPWkpJiZnPT1hLmlzRGFyayhkK2gsZStpKSYmZisrO2Y+NSYmKGMrPTMrZi01KX1mb3IodmFyIGQ9MDtiLTE+ZDtkKyspZm9yKHZhciBlPTA7Yi0xPmU7ZSsrKXt2YXIgaj0wO2EuaXNEYXJrKGQsZSkmJmorKyxhLmlzRGFyayhkKzEsZSkmJmorKyxhLmlzRGFyayhkLGUrMSkmJmorKyxhLmlzRGFyayhkKzEsZSsxKSYmaisrLCgwPT1qfHw0PT1qKSYmKGMrPTMpfWZvcih2YXIgZD0wO2I+ZDtkKyspZm9yKHZhciBlPTA7Yi02PmU7ZSsrKWEuaXNEYXJrKGQsZSkmJiFhLmlzRGFyayhkLGUrMSkmJmEuaXNEYXJrKGQsZSsyKSYmYS5pc0RhcmsoZCxlKzMpJiZhLmlzRGFyayhkLGUrNCkmJiFhLmlzRGFyayhkLGUrNSkmJmEuaXNEYXJrKGQsZSs2KSYmKGMrPTQwKTtmb3IodmFyIGU9MDtiPmU7ZSsrKWZvcih2YXIgZD0wO2ItNj5kO2QrKylhLmlzRGFyayhkLGUpJiYhYS5pc0RhcmsoZCsxLGUpJiZhLmlzRGFyayhkKzIsZSkmJmEuaXNEYXJrKGQrMyxlKSYmYS5pc0RhcmsoZCs0LGUpJiYhYS5pc0RhcmsoZCs1LGUpJiZhLmlzRGFyayhkKzYsZSkmJihjKz00MCk7Zm9yKHZhciBrPTAsZT0wO2I+ZTtlKyspZm9yKHZhciBkPTA7Yj5kO2QrKylhLmlzRGFyayhkLGUpJiZrKys7dmFyIGw9TWF0aC5hYnMoMTAwKmsvYi9iLTUwKS81O3JldHVybiBjKz0xMCpsfX0sZz17Z2xvZzpmdW5jdGlvbihhKXtpZigxPmEpdGhyb3cgbmV3IEVycm9yKCJnbG9nKCIrYSsiKSIpO3JldHVybiBnLkxPR19UQUJMRVthXX0sZ2V4cDpmdW5jdGlvbihhKXtmb3IoOzA+YTspYSs9MjU1O2Zvcig7YT49MjU2OylhLT0yNTU7cmV0dXJuIGcuRVhQX1RBQkxFW2FdfSxFWFBfVEFCTEU6bmV3IEFycmF5KDI1NiksTE9HX1RBQkxFOm5ldyBBcnJheSgyNTYpfSxoPTA7OD5oO2grKylnLkVYUF9UQUJMRVtoXT0xPDxoO2Zvcih2YXIgaD04OzI1Nj5oO2grKylnLkVYUF9UQUJMRVtoXT1nLkVYUF9UQUJMRVtoLTRdXmcuRVhQX1RBQkxFW2gtNV1eZy5FWFBfVEFCTEVbaC02XV5nLkVYUF9UQUJMRVtoLThdO2Zvcih2YXIgaD0wOzI1NT5oO2grKylnLkxPR19UQUJMRVtnLkVYUF9UQUJMRVtoXV09aDtpLnByb3RvdHlwZT17Z2V0OmZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm51bVthXX0sZ2V0TGVuZ3RoOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubnVtLmxlbmd0aH0sbXVsdGlwbHk6ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPW5ldyBBcnJheSh0aGlzLmdldExlbmd0aCgpK2EuZ2V0TGVuZ3RoKCktMSksYz0wO2M8dGhpcy5nZXRMZW5ndGgoKTtjKyspZm9yKHZhciBkPTA7ZDxhLmdldExlbmd0aCgpO2QrKyliW2MrZF1ePWcuZ2V4cChnLmdsb2codGhpcy5nZXQoYykpK2cuZ2xvZyhhLmdldChkKSkpO3JldHVybiBuZXcgaShiLDApfSxtb2Q6ZnVuY3Rpb24oYSl7aWYodGhpcy5nZXRMZW5ndGgoKS1hLmdldExlbmd0aCgpPDApcmV0dXJuIHRoaXM7Zm9yKHZhciBiPWcuZ2xvZyh0aGlzLmdldCgwKSktZy5nbG9nKGEuZ2V0KDApKSxjPW5ldyBBcnJheSh0aGlzLmdldExlbmd0aCgpKSxkPTA7ZDx0aGlzLmdldExlbmd0aCgpO2QrKyljW2RdPXRoaXMuZ2V0KGQpO2Zvcih2YXIgZD0wO2Q8YS5nZXRMZW5ndGgoKTtkKyspY1tkXV49Zy5nZXhwKGcuZ2xvZyhhLmdldChkKSkrYik7cmV0dXJuIG5ldyBpKGMsMCkubW9kKGEpfX0sai5SU19CTE9DS19UQUJMRT1bWzEsMjYsMTldLFsxLDI2LDE2XSxbMSwyNiwxM10sWzEsMjYsOV0sWzEsNDQsMzRdLFsxLDQ0LDI4XSxbMSw0NCwyMl0sWzEsNDQsMTZdLFsxLDcwLDU1XSxbMSw3MCw0NF0sWzIsMzUsMTddLFsyLDM1LDEzXSxbMSwxMDAsODBdLFsyLDUwLDMyXSxbMiw1MCwyNF0sWzQsMjUsOV0sWzEsMTM0LDEwOF0sWzIsNjcsNDNdLFsyLDMzLDE1LDIsMzQsMTZdLFsyLDMzLDExLDIsMzQsMTJdLFsyLDg2LDY4XSxbNCw0MywyN10sWzQsNDMsMTldLFs0LDQzLDE1XSxbMiw5OCw3OF0sWzQsNDksMzFdLFsyLDMyLDE0LDQsMzMsMTVdLFs0LDM5LDEzLDEsNDAsMTRdLFsyLDEyMSw5N10sWzIsNjAsMzgsMiw2MSwzOV0sWzQsNDAsMTgsMiw0MSwxOV0sWzQsNDAsMTQsMiw0MSwxNV0sWzIsMTQ2LDExNl0sWzMsNTgsMzYsMiw1OSwzN10sWzQsMzYsMTYsNCwzNywxN10sWzQsMzYsMTIsNCwzNywxM10sWzIsODYsNjgsMiw4Nyw2OV0sWzQsNjksNDMsMSw3MCw0NF0sWzYsNDMsMTksMiw0NCwyMF0sWzYsNDMsMTUsMiw0NCwxNl0sWzQsMTAxLDgxXSxbMSw4MCw1MCw0LDgxLDUxXSxbNCw1MCwyMiw0LDUxLDIzXSxbMywzNiwxMiw4LDM3LDEzXSxbMiwxMTYsOTIsMiwxMTcsOTNdLFs2LDU4LDM2LDIsNTksMzddLFs0LDQ2LDIwLDYsNDcsMjFdLFs3LDQyLDE0LDQsNDMsMTVdLFs0LDEzMywxMDddLFs4LDU5LDM3LDEsNjAsMzhdLFs4LDQ0LDIwLDQsNDUsMjFdLFsxMiwzMywxMSw0LDM0LDEyXSxbMywxNDUsMTE1LDEsMTQ2LDExNl0sWzQsNjQsNDAsNSw2NSw0MV0sWzExLDM2LDE2LDUsMzcsMTddLFsxMSwzNiwxMiw1LDM3LDEzXSxbNSwxMDksODcsMSwxMTAsODhdLFs1LDY1LDQxLDUsNjYsNDJdLFs1LDU0LDI0LDcsNTUsMjVdLFsxMSwzNiwxMl0sWzUsMTIyLDk4LDEsMTIzLDk5XSxbNyw3Myw0NSwzLDc0LDQ2XSxbMTUsNDMsMTksMiw0NCwyMF0sWzMsNDUsMTUsMTMsNDYsMTZdLFsxLDEzNSwxMDcsNSwxMzYsMTA4XSxbMTAsNzQsNDYsMSw3NSw0N10sWzEsNTAsMjIsMTUsNTEsMjNdLFsyLDQyLDE0LDE3LDQzLDE1XSxbNSwxNTAsMTIwLDEsMTUxLDEyMV0sWzksNjksNDMsNCw3MCw0NF0sWzE3LDUwLDIyLDEsNTEsMjNdLFsyLDQyLDE0LDE5LDQzLDE1XSxbMywxNDEsMTEzLDQsMTQyLDExNF0sWzMsNzAsNDQsMTEsNzEsNDVdLFsxNyw0NywyMSw0LDQ4LDIyXSxbOSwzOSwxMywxNiw0MCwxNF0sWzMsMTM1LDEwNyw1LDEzNiwxMDhdLFszLDY3LDQxLDEzLDY4LDQyXSxbMTUsNTQsMjQsNSw1NSwyNV0sWzE1LDQzLDE1LDEwLDQ0LDE2XSxbNCwxNDQsMTE2LDQsMTQ1LDExN10sWzE3LDY4LDQyXSxbMTcsNTAsMjIsNiw1MSwyM10sWzE5LDQ2LDE2LDYsNDcsMTddLFsyLDEzOSwxMTEsNywxNDAsMTEyXSxbMTcsNzQsNDZdLFs3LDU0LDI0LDE2LDU1LDI1XSxbMzQsMzcsMTNdLFs0LDE1MSwxMjEsNSwxNTIsMTIyXSxbNCw3NSw0NywxNCw3Niw0OF0sWzExLDU0LDI0LDE0LDU1LDI1XSxbMTYsNDUsMTUsMTQsNDYsMTZdLFs2LDE0NywxMTcsNCwxNDgsMTE4XSxbNiw3Myw0NSwxNCw3NCw0Nl0sWzExLDU0LDI0LDE2LDU1LDI1XSxbMzAsNDYsMTYsMiw0NywxN10sWzgsMTMyLDEwNiw0LDEzMywxMDddLFs4LDc1LDQ3LDEzLDc2LDQ4XSxbNyw1NCwyNCwyMiw1NSwyNV0sWzIyLDQ1LDE1LDEzLDQ2LDE2XSxbMTAsMTQyLDExNCwyLDE0MywxMTVdLFsxOSw3NCw0Niw0LDc1LDQ3XSxbMjgsNTAsMjIsNiw1MSwyM10sWzMzLDQ2LDE2LDQsNDcsMTddLFs4LDE1MiwxMjIsNCwxNTMsMTIzXSxbMjIsNzMsNDUsMyw3NCw0Nl0sWzgsNTMsMjMsMjYsNTQsMjRdLFsxMiw0NSwxNSwyOCw0NiwxNl0sWzMsMTQ3LDExNywxMCwxNDgsMTE4XSxbMyw3Myw0NSwyMyw3NCw0Nl0sWzQsNTQsMjQsMzEsNTUsMjVdLFsxMSw0NSwxNSwzMSw0NiwxNl0sWzcsMTQ2LDExNiw3LDE0NywxMTddLFsyMSw3Myw0NSw3LDc0LDQ2XSxbMSw1MywyMywzNyw1NCwyNF0sWzE5LDQ1LDE1LDI2LDQ2LDE2XSxbNSwxNDUsMTE1LDEwLDE0NiwxMTZdLFsxOSw3NSw0NywxMCw3Niw0OF0sWzE1LDU0LDI0LDI1LDU1LDI1XSxbMjMsNDUsMTUsMjUsNDYsMTZdLFsxMywxNDUsMTE1LDMsMTQ2LDExNl0sWzIsNzQsNDYsMjksNzUsNDddLFs0Miw1NCwyNCwxLDU1LDI1XSxbMjMsNDUsMTUsMjgsNDYsMTZdLFsxNywxNDUsMTE1XSxbMTAsNzQsNDYsMjMsNzUsNDddLFsxMCw1NCwyNCwzNSw1NSwyNV0sWzE5LDQ1LDE1LDM1LDQ2LDE2XSxbMTcsMTQ1LDExNSwxLDE0NiwxMTZdLFsxNCw3NCw0NiwyMSw3NSw0N10sWzI5LDU0LDI0LDE5LDU1LDI1XSxbMTEsNDUsMTUsNDYsNDYsMTZdLFsxMywxNDUsMTE1LDYsMTQ2LDExNl0sWzE0LDc0LDQ2LDIzLDc1LDQ3XSxbNDQsNTQsMjQsNyw1NSwyNV0sWzU5LDQ2LDE2LDEsNDcsMTddLFsxMiwxNTEsMTIxLDcsMTUyLDEyMl0sWzEyLDc1LDQ3LDI2LDc2LDQ4XSxbMzksNTQsMjQsMTQsNTUsMjVdLFsyMiw0NSwxNSw0MSw0NiwxNl0sWzYsMTUxLDEyMSwxNCwxNTIsMTIyXSxbNiw3NSw0NywzNCw3Niw0OF0sWzQ2LDU0LDI0LDEwLDU1LDI1XSxbMiw0NSwxNSw2NCw0NiwxNl0sWzE3LDE1MiwxMjIsNCwxNTMsMTIzXSxbMjksNzQsNDYsMTQsNzUsNDddLFs0OSw1NCwyNCwxMCw1NSwyNV0sWzI0LDQ1LDE1LDQ2LDQ2LDE2XSxbNCwxNTIsMTIyLDE4LDE1MywxMjNdLFsxMyw3NCw0NiwzMiw3NSw0N10sWzQ4LDU0LDI0LDE0LDU1LDI1XSxbNDIsNDUsMTUsMzIsNDYsMTZdLFsyMCwxNDcsMTE3LDQsMTQ4LDExOF0sWzQwLDc1LDQ3LDcsNzYsNDhdLFs0Myw1NCwyNCwyMiw1NSwyNV0sWzEwLDQ1LDE1LDY3LDQ2LDE2XSxbMTksMTQ4LDExOCw2LDE0OSwxMTldLFsxOCw3NSw0NywzMSw3Niw0OF0sWzM0LDU0LDI0LDM0LDU1LDI1XSxbMjAsNDUsMTUsNjEsNDYsMTZdXSxqLmdldFJTQmxvY2tzPWZ1bmN0aW9uKGEsYil7dmFyIGM9ai5nZXRSc0Jsb2NrVGFibGUoYSxiKTtpZih2b2lkIDA9PWMpdGhyb3cgbmV3IEVycm9yKCJiYWQgcnMgYmxvY2sgQCB0eXBlTnVtYmVyOiIrYSsiL2Vycm9yQ29ycmVjdExldmVsOiIrYik7Zm9yKHZhciBkPWMubGVuZ3RoLzMsZT1bXSxmPTA7ZD5mO2YrKylmb3IodmFyIGc9Y1szKmYrMF0saD1jWzMqZisxXSxpPWNbMypmKzJdLGs9MDtnPms7aysrKWUucHVzaChuZXcgaihoLGkpKTtyZXR1cm4gZX0sai5nZXRSc0Jsb2NrVGFibGU9ZnVuY3Rpb24oYSxiKXtzd2l0Y2goYil7Y2FzZSBkLkw6cmV0dXJuIGouUlNfQkxPQ0tfVEFCTEVbNCooYS0xKSswXTtjYXNlIGQuTTpyZXR1cm4gai5SU19CTE9DS19UQUJMRVs0KihhLTEpKzFdO2Nhc2UgZC5ROnJldHVybiBqLlJTX0JMT0NLX1RBQkxFWzQqKGEtMSkrMl07Y2FzZSBkLkg6cmV0dXJuIGouUlNfQkxPQ0tfVEFCTEVbNCooYS0xKSszXTtkZWZhdWx0OnJldHVybiB2b2lkIDB9fSxrLnByb3RvdHlwZT17Z2V0OmZ1bmN0aW9uKGEpe3ZhciBiPU1hdGguZmxvb3IoYS84KTtyZXR1cm4gMT09KDEmdGhpcy5idWZmZXJbYl0+Pj43LWElOCl9LHB1dDpmdW5jdGlvbihhLGIpe2Zvcih2YXIgYz0wO2I+YztjKyspdGhpcy5wdXRCaXQoMT09KDEmYT4+PmItYy0xKSl9LGdldExlbmd0aEluQml0czpmdW5jdGlvbigpe3JldHVybiB0aGlzLmxlbmd0aH0scHV0Qml0OmZ1bmN0aW9uKGEpe3ZhciBiPU1hdGguZmxvb3IodGhpcy5sZW5ndGgvOCk7dGhpcy5idWZmZXIubGVuZ3RoPD1iJiZ0aGlzLmJ1ZmZlci5wdXNoKDApLGEmJih0aGlzLmJ1ZmZlcltiXXw9MTI4Pj4+dGhpcy5sZW5ndGglOCksdGhpcy5sZW5ndGgrK319O3ZhciBsPVtbMTcsMTQsMTEsN10sWzMyLDI2LDIwLDE0XSxbNTMsNDIsMzIsMjRdLFs3OCw2Miw0NiwzNF0sWzEwNiw4NCw2MCw0NF0sWzEzNCwxMDYsNzQsNThdLFsxNTQsMTIyLDg2LDY0XSxbMTkyLDE1MiwxMDgsODRdLFsyMzAsMTgwLDEzMCw5OF0sWzI3MSwyMTMsMTUxLDExOV0sWzMyMSwyNTEsMTc3LDEzN10sWzM2NywyODcsMjAzLDE1NV0sWzQyNSwzMzEsMjQxLDE3N10sWzQ1OCwzNjIsMjU4LDE5NF0sWzUyMCw0MTIsMjkyLDIyMF0sWzU4Niw0NTAsMzIyLDI1MF0sWzY0NCw1MDQsMzY0LDI4MF0sWzcxOCw1NjAsMzk0LDMxMF0sWzc5Miw2MjQsNDQyLDMzOF0sWzg1OCw2NjYsNDgyLDM4Ml0sWzkyOSw3MTEsNTA5LDQwM10sWzEwMDMsNzc5LDU2NSw0MzldLFsxMDkxLDg1Nyw2MTEsNDYxXSxbMTE3MSw5MTEsNjYxLDUxMV0sWzEyNzMsOTk3LDcxNSw1MzVdLFsxMzY3LDEwNTksNzUxLDU5M10sWzE0NjUsMTEyNSw4MDUsNjI1XSxbMTUyOCwxMTkwLDg2OCw2NThdLFsxNjI4LDEyNjQsOTA4LDY5OF0sWzE3MzIsMTM3MCw5ODIsNzQyXSxbMTg0MCwxNDUyLDEwMzAsNzkwXSxbMTk1MiwxNTM4LDExMTIsODQyXSxbMjA2OCwxNjI4LDExNjgsODk4XSxbMjE4OCwxNzIyLDEyMjgsOTU4XSxbMjMwMywxODA5LDEyODMsOTgzXSxbMjQzMSwxOTExLDEzNTEsMTA1MV0sWzI1NjMsMTk4OSwxNDIzLDEwOTNdLFsyNjk5LDIwOTksMTQ5OSwxMTM5XSxbMjgwOSwyMjEzLDE1NzksMTIxOV0sWzI5NTMsMjMzMSwxNjYzLDEyNzNdXSxvPWZ1bmN0aW9uKCl7dmFyIGE9ZnVuY3Rpb24oYSxiKXt0aGlzLl9lbD1hLHRoaXMuX2h0T3B0aW9uPWJ9O3JldHVybiBhLnByb3RvdHlwZS5kcmF3PWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGcoYSxiKXt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIixhKTtmb3IodmFyIGQgaW4gYiliLmhhc093blByb3BlcnR5KGQpJiZjLnNldEF0dHJpYnV0ZShkLGJbZF0pO3JldHVybiBjfXZhciBiPXRoaXMuX2h0T3B0aW9uLGM9dGhpcy5fZWwsZD1hLmdldE1vZHVsZUNvdW50KCk7TWF0aC5mbG9vcihiLndpZHRoL2QpLE1hdGguZmxvb3IoYi5oZWlnaHQvZCksdGhpcy5jbGVhcigpO3ZhciBoPWcoInN2ZyIse3ZpZXdCb3g6IjAgMCAiK1N0cmluZyhkKSsiICIrU3RyaW5nKGQpLHdpZHRoOiIxMDAlIixoZWlnaHQ6IjEwMCUiLGZpbGw6Yi5jb2xvckxpZ2h0fSk7aC5zZXRBdHRyaWJ1dGVOUygiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8iLCJ4bWxuczp4bGluayIsImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiKSxjLmFwcGVuZENoaWxkKGgpLGguYXBwZW5kQ2hpbGQoZygicmVjdCIse2ZpbGw6Yi5jb2xvckRhcmssd2lkdGg6IjEiLGhlaWdodDoiMSIsaWQ6InRlbXBsYXRlIn0pKTtmb3IodmFyIGk9MDtkPmk7aSsrKWZvcih2YXIgaj0wO2Q+ajtqKyspaWYoYS5pc0RhcmsoaSxqKSl7dmFyIGs9ZygidXNlIix7eDpTdHJpbmcoaSkseTpTdHJpbmcoail9KTtrLnNldEF0dHJpYnV0ZU5TKCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiwiaHJlZiIsIiN0ZW1wbGF0ZSIpLGguYXBwZW5kQ2hpbGQoayl9fSxhLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe2Zvcig7dGhpcy5fZWwuaGFzQ2hpbGROb2RlcygpOyl0aGlzLl9lbC5yZW1vdmVDaGlsZCh0aGlzLl9lbC5sYXN0Q2hpbGQpfSxhfSgpLHA9InN2ZyI9PT1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQudGFnTmFtZS50b0xvd2VyQ2FzZSgpLHE9cD9vOm0oKT9mdW5jdGlvbigpe2Z1bmN0aW9uIGEoKXt0aGlzLl9lbEltYWdlLnNyYz10aGlzLl9lbENhbnZhcy50b0RhdGFVUkwoImltYWdlL3BuZyIpLHRoaXMuX2VsSW1hZ2Uuc3R5bGUuZGlzcGxheT0iYmxvY2siLHRoaXMuX2VsQ2FudmFzLnN0eWxlLmRpc3BsYXk9Im5vbmUifWZ1bmN0aW9uIGQoYSxiKXt2YXIgYz10aGlzO2lmKGMuX2ZGYWlsPWIsYy5fZlN1Y2Nlc3M9YSxudWxsPT09Yy5fYlN1cHBvcnREYXRhVVJJKXt2YXIgZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpbWciKSxlPWZ1bmN0aW9uKCl7Yy5fYlN1cHBvcnREYXRhVVJJPSExLGMuX2ZGYWlsJiZfZkZhaWwuY2FsbChjKX0sZj1mdW5jdGlvbigpe2MuX2JTdXBwb3J0RGF0YVVSST0hMCxjLl9mU3VjY2VzcyYmYy5fZlN1Y2Nlc3MuY2FsbChjKX07cmV0dXJuIGQub25hYm9ydD1lLGQub25lcnJvcj1lLGQub25sb2FkPWYsZC5zcmM9ImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVVBQUFBRkNBWUFBQUNOYnlibEFBQUFIRWxFUVZRSTEyUDQvLzgvdzM4R0lBWERJQktFMERIeGdsak5CQUFPOVRYTDBZNE9Id0FBQUFCSlJVNUVya0pnZ2c9PSIsdm9pZCAwfWMuX2JTdXBwb3J0RGF0YVVSST09PSEwJiZjLl9mU3VjY2Vzcz9jLl9mU3VjY2Vzcy5jYWxsKGMpOmMuX2JTdXBwb3J0RGF0YVVSST09PSExJiZjLl9mRmFpbCYmYy5fZkZhaWwuY2FsbChjKX1pZih0aGlzLl9hbmRyb2lkJiZ0aGlzLl9hbmRyb2lkPD0yLjEpe3ZhciBiPTEvd2luZG93LmRldmljZVBpeGVsUmF0aW8sYz1DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZTtDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQucHJvdG90eXBlLmRyYXdJbWFnZT1mdW5jdGlvbihhLGQsZSxmLGcsaCxpLGope2lmKCJub2RlTmFtZSJpbiBhJiYvaW1nL2kudGVzdChhLm5vZGVOYW1lKSlmb3IodmFyIGw9YXJndW1lbnRzLmxlbmd0aC0xO2w+PTE7bC0tKWFyZ3VtZW50c1tsXT1hcmd1bWVudHNbbF0qYjtlbHNlInVuZGVmaW5lZCI9PXR5cGVvZiBqJiYoYXJndW1lbnRzWzFdKj1iLGFyZ3VtZW50c1syXSo9Yixhcmd1bWVudHNbM10qPWIsYXJndW1lbnRzWzRdKj1iKTtjLmFwcGx5KHRoaXMsYXJndW1lbnRzKX19dmFyIGU9ZnVuY3Rpb24oYSxiKXt0aGlzLl9iSXNQYWludGVkPSExLHRoaXMuX2FuZHJvaWQ9bigpLHRoaXMuX2h0T3B0aW9uPWIsdGhpcy5fZWxDYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgiY2FudmFzIiksdGhpcy5fZWxDYW52YXMud2lkdGg9Yi53aWR0aCx0aGlzLl9lbENhbnZhcy5oZWlnaHQ9Yi5oZWlnaHQsYS5hcHBlbmRDaGlsZCh0aGlzLl9lbENhbnZhcyksdGhpcy5fZWw9YSx0aGlzLl9vQ29udGV4dD10aGlzLl9lbENhbnZhcy5nZXRDb250ZXh0KCIyZCIpLHRoaXMuX2JJc1BhaW50ZWQ9ITEsdGhpcy5fZWxJbWFnZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCJpbWciKSx0aGlzLl9lbEltYWdlLnN0eWxlLmRpc3BsYXk9Im5vbmUiLHRoaXMuX2VsLmFwcGVuZENoaWxkKHRoaXMuX2VsSW1hZ2UpLHRoaXMuX2JTdXBwb3J0RGF0YVVSST1udWxsfTtyZXR1cm4gZS5wcm90b3R5cGUuZHJhdz1mdW5jdGlvbihhKXt2YXIgYj10aGlzLl9lbEltYWdlLGM9dGhpcy5fb0NvbnRleHQsZD10aGlzLl9odE9wdGlvbixlPWEuZ2V0TW9kdWxlQ291bnQoKSxmPWQud2lkdGgvZSxnPWQuaGVpZ2h0L2UsaD1NYXRoLnJvdW5kKGYpLGk9TWF0aC5yb3VuZChnKTtiLnN0eWxlLmRpc3BsYXk9Im5vbmUiLHRoaXMuY2xlYXIoKTtmb3IodmFyIGo9MDtlPmo7aisrKWZvcih2YXIgaz0wO2U+aztrKyspe3ZhciBsPWEuaXNEYXJrKGosayksbT1rKmYsbj1qKmc7Yy5zdHJva2VTdHlsZT1sP2QuY29sb3JEYXJrOmQuY29sb3JMaWdodCxjLmxpbmVXaWR0aD0xLGMuZmlsbFN0eWxlPWw/ZC5jb2xvckRhcms6ZC5jb2xvckxpZ2h0LGMuZmlsbFJlY3QobSxuLGYsZyksYy5zdHJva2VSZWN0KE1hdGguZmxvb3IobSkrLjUsTWF0aC5mbG9vcihuKSsuNSxoLGkpLGMuc3Ryb2tlUmVjdChNYXRoLmNlaWwobSktLjUsTWF0aC5jZWlsKG4pLS41LGgsaSl9dGhpcy5fYklzUGFpbnRlZD0hMH0sZS5wcm90b3R5cGUubWFrZUltYWdlPWZ1bmN0aW9uKCl7dGhpcy5fYklzUGFpbnRlZCYmZC5jYWxsKHRoaXMsYSl9LGUucHJvdG90eXBlLmlzUGFpbnRlZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLl9iSXNQYWludGVkfSxlLnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuX29Db250ZXh0LmNsZWFyUmVjdCgwLDAsdGhpcy5fZWxDYW52YXMud2lkdGgsdGhpcy5fZWxDYW52YXMuaGVpZ2h0KSx0aGlzLl9iSXNQYWludGVkPSExfSxlLnByb3RvdHlwZS5yb3VuZD1mdW5jdGlvbihhKXtyZXR1cm4gYT9NYXRoLmZsb29yKDFlMyphKS8xZTM6YX0sZX0oKTpmdW5jdGlvbigpe3ZhciBhPWZ1bmN0aW9uKGEsYil7dGhpcy5fZWw9YSx0aGlzLl9odE9wdGlvbj1ifTtyZXR1cm4gYS5wcm90b3R5cGUuZHJhdz1mdW5jdGlvbihhKXtmb3IodmFyIGI9dGhpcy5faHRPcHRpb24sYz10aGlzLl9lbCxkPWEuZ2V0TW9kdWxlQ291bnQoKSxlPU1hdGguZmxvb3IoYi53aWR0aC9kKSxmPU1hdGguZmxvb3IoYi5oZWlnaHQvZCksZz1bJzx0YWJsZSBzdHlsZT0iYm9yZGVyOjA7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlOyI+J10saD0wO2Q+aDtoKyspe2cucHVzaCgiPHRyPiIpO2Zvcih2YXIgaT0wO2Q+aTtpKyspZy5wdXNoKCc8dGQgc3R5bGU9ImJvcmRlcjowO2JvcmRlci1jb2xsYXBzZTpjb2xsYXBzZTtwYWRkaW5nOjA7bWFyZ2luOjA7d2lkdGg6JytlKyJweDtoZWlnaHQ6IitmKyJweDtiYWNrZ3JvdW5kLWNvbG9yOiIrKGEuaXNEYXJrKGgsaSk/Yi5jb2xvckRhcms6Yi5jb2xvckxpZ2h0KSsnOyI+PC90ZD4nKTtnLnB1c2goIjwvdHI+Iil9Zy5wdXNoKCI8L3RhYmxlPiIpLGMuaW5uZXJIVE1MPWcuam9pbigiIik7dmFyIGo9Yy5jaGlsZE5vZGVzWzBdLGs9KGIud2lkdGgtai5vZmZzZXRXaWR0aCkvMixsPShiLmhlaWdodC1qLm9mZnNldEhlaWdodCkvMjtrPjAmJmw+MCYmKGouc3R5bGUubWFyZ2luPWwrInB4ICIraysicHgiKX0sYS5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLl9lbC5pbm5lckhUTUw9IiJ9LGF9KCk7UVJDb2RlPWZ1bmN0aW9uKGEsYil7aWYodGhpcy5faHRPcHRpb249e3dpZHRoOjI1NixoZWlnaHQ6MjU2LHR5cGVOdW1iZXI6NCxjb2xvckRhcms6IiMwMDAwMDAiLGNvbG9yTGlnaHQ6IiNmZmZmZmYiLGNvcnJlY3RMZXZlbDpkLkh9LCJzdHJpbmciPT10eXBlb2YgYiYmKGI9e3RleHQ6Yn0pLGIpZm9yKHZhciBjIGluIGIpdGhpcy5faHRPcHRpb25bY109YltjXTsic3RyaW5nIj09dHlwZW9mIGEmJihhPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGEpKSx0aGlzLl9hbmRyb2lkPW4oKSx0aGlzLl9lbD1hLHRoaXMuX29RUkNvZGU9bnVsbCx0aGlzLl9vRHJhd2luZz1uZXcgcSh0aGlzLl9lbCx0aGlzLl9odE9wdGlvbiksdGhpcy5faHRPcHRpb24udGV4dCYmdGhpcy5tYWtlQ29kZSh0aGlzLl9odE9wdGlvbi50ZXh0KX0sUVJDb2RlLnByb3RvdHlwZS5tYWtlQ29kZT1mdW5jdGlvbihhKXt0aGlzLl9vUVJDb2RlPW5ldyBiKHIoYSx0aGlzLl9odE9wdGlvbi5jb3JyZWN0TGV2ZWwpLHRoaXMuX2h0T3B0aW9uLmNvcnJlY3RMZXZlbCksdGhpcy5fb1FSQ29kZS5hZGREYXRhKGEpLHRoaXMuX29RUkNvZGUubWFrZSgpLHRoaXMuX2VsLnRpdGxlPWEsdGhpcy5fb0RyYXdpbmcuZHJhdyh0aGlzLl9vUVJDb2RlKSx0aGlzLm1ha2VJbWFnZSgpfSxRUkNvZGUucHJvdG90eXBlLm1ha2VJbWFnZT1mdW5jdGlvbigpeyJmdW5jdGlvbiI9PXR5cGVvZiB0aGlzLl9vRHJhd2luZy5tYWtlSW1hZ2UmJighdGhpcy5fYW5kcm9pZHx8dGhpcy5fYW5kcm9pZD49MykmJnRoaXMuX29EcmF3aW5nLm1ha2VJbWFnZSgpfSxRUkNvZGUucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy5fb0RyYXdpbmcuY2xlYXIoKX0sUVJDb2RlLkNvcnJlY3RMZXZlbD1kfSgpOwogIDwvc2NyaXB0PgoKPCEtLSDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKICAgICBBUFAgU0NSSVBUCuKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkCAtLT4KPHNjcmlwdD4KJ3VzZSBzdHJpY3QnOwoKLy8g4pSA4pSAIFdlYlNvY2tldCBzaGltIChyZXBsYWNlcyBGaXJlYmFzZSArIFJlYWx0aW1lIERCKSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKLy8g4pSA4pSAIFdlYlNvY2tldCBzaGltIChyZXBsYWNlcyBGaXJlYmFzZSBSZWFsdGltZSBEYXRhYmFzZSkg4pSA4pSA4pSA4pSA4pSA4pSACi8vIHY0OiBoaWJlcm5hdGFibGUgRE8gYmFja2VuZCArIHNlcS1iYXNlZCBnYXAgZGV0ZWN0aW9uCmNvbnN0IFdTX0hPU1QgPSAnY2Fybml2YWwtdGltaW5nLXdzLnBnYWxsaXZhbi53b3JrZXJzLmRldic7CmxldCBfd3M9bnVsbCxfd3NDb2RlPW51bGwsX3dzUmVhZHk9ZmFsc2UsX3JlcUlkPTAsX21zZ0J1Zj1bXTsKbGV0IF9wZW5kaW5nUmVxcz1uZXcgTWFwKCksIF9zdWJzY3JpcHRpb25zPW5ldyBNYXAoKSwgX3JlY29ublRpbWVyPW51bGw7Ci8vIHNlcSB0cmFja2luZzogbGFzdCBzZXEgc2VlbiBwZXIgcGF0aDsgaWYgaW5jb21pbmcgc2VxID4gbGFzdFNlcSsxIHdlIG1pc3NlZAovLyB1cGRhdGVzIOKAlCByZS1zdWJzY3JpYmUgdG8gZm9yY2UgYSBmcmVzaCBzbmFwc2hvdCBmcm9tIHRoZSBETy4KY29uc3QgX2xhc3RTZXE9bmV3IE1hcCgpOwoKZnVuY3Rpb24gX25leHRJZCgpeyByZXR1cm4gU3RyaW5nKCsrX3JlcUlkKTsgfQoKLy8g4pSA4pSAIFBlbmRpbmctc3BsaXQgc2FmZXR5IG5ldCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKZnVuY3Rpb24gX3NhdmVQZW5kaW5nU3BsaXQobGFuZSwga2V5LCBwYXlsb2FkKSB7CiAgdHJ5IHsKICAgIGNvbnN0IHEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfcGVuZGluZ1NwbGl0cycpIHx8ICdbXScpOwogICAgaWYgKCFxLmZpbmQoZSA9PiBlLmtleSA9PT0ga2V5KSkgcS5wdXNoKHsgbGFuZSwga2V5LCBwYXlsb2FkLCBjYXJuaXZhbENvZGUgfSk7CiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnX3BlbmRpbmdTcGxpdHMnLCBKU09OLnN0cmluZ2lmeShxKSk7CiAgfSBjYXRjaChlKSB7fQp9CmZ1bmN0aW9uIF9jbGVhclBlbmRpbmdTcGxpdChrZXkpIHsKICB0cnkgewogICAgY29uc3QgcSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ19wZW5kaW5nU3BsaXRzJykgfHwgJ1tdJyk7CiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnX3BlbmRpbmdTcGxpdHMnLCBKU09OLnN0cmluZ2lmeShxLmZpbHRlcihlID0+IGUua2V5ICE9PSBrZXkpKSk7CiAgfSBjYXRjaChlKSB7fQp9CmFzeW5jIGZ1bmN0aW9uIF9yZXRyeVBlbmRpbmdTcGxpdHMoKSB7CiAgdHJ5IHsKICAgIGNvbnN0IHEgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdfcGVuZGluZ1NwbGl0cycpIHx8ICdbXScpOwogICAgaWYgKCFxLmxlbmd0aCkgcmV0dXJuOwogICAgZm9yIChjb25zdCBlIG9mIHEpIHsKICAgICAgaWYgKGUuY2Fybml2YWxDb2RlICE9PSBjYXJuaXZhbENvZGUpIGNvbnRpbnVlOwogICAgICB0cnkgewogICAgICAgIGF3YWl0IGNSZWYoYHJhY2UvY3VycmVudC9zcGxpdHMvJHtlLmxhbmV9LyR7ZS5rZXl9YCkuc2V0KGUucGF5bG9hZCk7CiAgICAgICAgX2NsZWFyUGVuZGluZ1NwbGl0KGUua2V5KTsKICAgICAgICB0b2FzdCgnU2F2ZWQgc3BsaXQgc2VudCDinJMnKTsKICAgICAgfSBjYXRjaChlcnIpIHt9CiAgICB9CiAgfSBjYXRjaChlKSB7fQp9CgpmdW5jdGlvbiBfd3NDb25uZWN0VG8oY29kZSl7CiAgaWYoX3dzICYmIF93c0NvZGU9PT1jb2RlICYmIChfd3MucmVhZHlTdGF0ZT09PTB8fF93cy5yZWFkeVN0YXRlPT09MSkpIHJldHVybjsKICBpZihfd3Mpe3RyeXtfd3Mub25jbG9zZT1udWxsO193cy5jbG9zZSgpO31jYXRjaHt9fQogIF93c0NvZGU9Y29kZTsgX3dzUmVhZHk9ZmFsc2U7CiAgX3dzPW5ldyBXZWJTb2NrZXQoYHdzczovLyR7V1NfSE9TVH0vd3MvJHtjb2RlfWApOwogIF93cy5vbm9wZW49KCk9PnsKICAgIF93c1JlYWR5PXRydWU7IGNsZWFyVGltZW91dChfcmVjb25uVGltZXIpOwogICAgLy8gUmVwbGF5IGFueSB3cml0ZXMgYnVmZmVyZWQgd2hpbGUgZGlzY29ubmVjdGVkCiAgICBfbXNnQnVmLnNwbGljZSgwKS5mb3JFYWNoKG09Pl93cy5zZW5kKG0pKTsKICAgIC8vIFJldHJ5IGFueSBzcGxpdHMgdGhhdCB3ZXJlIGxvc3QgZHVyaW5nIGEgcHJldmlvdXMgZGlzY29ubmVjdAogICAgc2V0VGltZW91dChfcmV0cnlQZW5kaW5nU3BsaXRzLCAzMDApOwogICAgLy8gUmUtc3Vic2NyaWJlIHRvIGFsbCBwYXRocyDigJQgRE8gc2VuZHMgYSBmcmVzaCBzbmFwc2hvdCBmb3IgZWFjaCwKICAgIC8vIHdoaWNoIGhhbmRsZXMgYW55IGdhcCBhY2N1bXVsYXRlZCBkdXJpbmcgdGhlIGRpc2Nvbm5lY3Rpb24uCiAgICBmb3IoY29uc3QgcCBvZiBfc3Vic2NyaXB0aW9ucy5rZXlzKCkpIGlmKCFwLnN0YXJ0c1dpdGgoJ19fJykpCiAgICAgIF93cy5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOidzdWJzY3JpYmUnLHBhdGg6cH0pKTsKICAgIF9ub3RpZnlDb25uKHRydWUpOwogIH07CiAgX3dzLm9uY2xvc2U9X3dzLm9uZXJyb3I9KCk9PnsKICAgIF93c1JlYWR5PWZhbHNlOyBfbm90aWZ5Q29ubihmYWxzZSk7CiAgICBmb3IoY29uc3QgWyxyXSBvZiBfcGVuZGluZ1JlcXMpe2NsZWFyVGltZW91dChyLnRpbWVyKTtyLnJlamVjdChuZXcgRXJyb3IoJ3dzIGNsb3NlZCcpKTt9CiAgICBfcGVuZGluZ1JlcXMuY2xlYXIoKTsKICAgIGlmKF93c0NvZGUpIF9yZWNvbm5UaW1lcj1zZXRUaW1lb3V0KCgpPT5fd3NDb25uZWN0VG8oX3dzQ29kZSksMjUwMCk7CiAgfTsKICBfd3Mub25tZXNzYWdlPSh7ZGF0YX0pPT57CiAgICBjb25zdCBtc2c9SlNPTi5wYXJzZShkYXRhKTsKICAgIC8vIFJlc29sdmUgcGVuZGluZyByZXF1ZXN0IChnZXQvc2V0L3VwZGF0ZS9wdXNoL2V0Yy4pCiAgICBpZihtc2cuaWQgJiYgX3BlbmRpbmdSZXFzLmhhcyhtc2cuaWQpKXsKICAgICAgY29uc3Qgcj1fcGVuZGluZ1JlcXMuZ2V0KG1zZy5pZCk7CiAgICAgIGNsZWFyVGltZW91dChyLnRpbWVyKTtfcGVuZGluZ1JlcXMuZGVsZXRlKG1zZy5pZCk7ci5yZXNvbHZlKG1zZyk7CiAgICB9CiAgICBpZihtc2cudHlwZT09PSdzbmFwc2hvdCcgJiYgbXNnLnBhdGghPW51bGwpewogICAgICAvLyBHYXAgZGV0ZWN0aW9uOiBpZiBzZXEganVtcGVkLCB3ZSByZS1zdWJzY3JpYmUgdG8gZ2V0IGF1dGhvcml0YXRpdmUgc3RhdGUuCiAgICAgIC8vIChTbmFwc2hvdHMgYWxyZWFkeSBjYXJyeSBmdWxsIHN0YXRlIHNvIHRoZSByZS1zdWJzY3JpYmUgc25hcHNob3QgZml4ZXMgaXQuKQogICAgICBpZihtc2cuc2VxIT1udWxsKXsKICAgICAgICBjb25zdCBsYXN0PV9sYXN0U2VxLmdldChtc2cucGF0aCk7CiAgICAgICAgaWYobGFzdCE9bnVsbCAmJiBtc2cuc2VxID4gbGFzdCsxICYmIF93c1JlYWR5KXsKICAgICAgICAgIC8vIEdhcCBkZXRlY3RlZCDigJQgcmUtc3Vic2NyaWJlIGltbWVkaWF0ZWx5IGZvciBhIGd1YXJhbnRlZWQgZnJlc2ggc25hcHNob3QKICAgICAgICAgIF93cy5zZW5kKEpTT04uc3RyaW5naWZ5KHt0eXBlOidzdWJzY3JpYmUnLHBhdGg6bXNnLnBhdGh9KSk7CiAgICAgICAgfQogICAgICAgIF9sYXN0U2VxLnNldChtc2cucGF0aCwgbXNnLnNlcSk7CiAgICAgIH0KICAgICAgY29uc3QgY2JzPV9zdWJzY3JpcHRpb25zLmdldChtc2cucGF0aCk7CiAgICAgIGlmKGNicyl7Y29uc3Qgcz1fc25hcChtc2cucGF0aCxtc2cuZGF0YSk7Y2JzLmZvckVhY2goYz0+YyhzKSk7fQogICAgfQogIH07Cn0KZnVuY3Rpb24gX3dzUmVhZHkyKCl7IHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PnsgaWYoX3dzUmVhZHkpcmV0dXJuIHJlcygpOyBjb25zdCB0PXNldFRpbWVvdXQoKCk9PnJlaihuZXcgRXJyb3IoJ3dzIHRpbWVvdXQnKSksODAwMCk7IGNvbnN0IGl2PXNldEludGVydmFsKCgpPT57aWYoX3dzUmVhZHkpe2NsZWFyVGltZW91dCh0KTtjbGVhckludGVydmFsKGl2KTtyZXMoKTt9fSw1MCk7IH0pOyB9CmZ1bmN0aW9uIF9ub3RpZnlDb25uKHYpewogIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZWNvbm5lY3QtYmFubmVyJyk7CiAgaWYgKGJhbm5lcikgYmFubmVyLnN0eWxlLmRpc3BsYXkgPSB2ID8gJ25vbmUnIDogJ2Jsb2NrJzsKICBjb25zdCBjYnM9X3N1YnNjcmlwdGlvbnMuZ2V0KCdfX2Nvbm5lY3RlZF9fJyk7aWYoY2JzKXtjb25zdCBzPV9zbmFwKCdjb25uZWN0ZWQnLHYpO2Nicy5mb3JFYWNoKGM9PmMocykpO30KfQpmdW5jdGlvbiBfc25hcChwYXRoLGRhdGEpeyByZXR1cm4ge3ZhbDooKT0+ZGF0YSwgZXhpc3RzOigpPT5kYXRhIT1udWxsLCBrZXk6cGF0aC5zcGxpdCgnLycpLnBvcCgpfTsgfQpmdW5jdGlvbiBfc2VuZChtc2cpeyByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57IGNvbnN0IGlkPV9uZXh0SWQoKTttc2cuaWQ9aWQ7Y29uc3Qgc3RyPUpTT04uc3RyaW5naWZ5KG1zZyk7Y29uc3QgdGltZXI9c2V0VGltZW91dCgoKT0+e19wZW5kaW5nUmVxcy5kZWxldGUoaWQpO3JlaihuZXcgRXJyb3IoJ3dzIHRpbWVvdXQnKSk7fSwxMDAwMCk7X3BlbmRpbmdSZXFzLnNldChpZCx7cmVzb2x2ZTpyZXMscmVqZWN0OnJlaix0aW1lcn0pOyBpZihfd3NSZWFkeSlfd3Muc2VuZChzdHIpO2Vsc2UgX21zZ0J1Zi5wdXNoKHN0cik7IH0pOyB9CmZ1bmN0aW9uIF9yZWYocGF0aCl7IHJldHVybiB7IG9uY2U6KCk9Pl9zZW5kKHt0eXBlOidnZXQnLHBhdGh9KS50aGVuKHI9Pl9zbmFwKHBhdGgsci5kYXRhKSksIHNldDoodik9Pl9zZW5kKHt0eXBlOidzZXQnLHBhdGgsZGF0YTp2fSksIHVwZGF0ZToodik9Pl9zZW5kKHt0eXBlOid1cGRhdGUnLHBhdGgsZGF0YTp2fSksIHB1c2g6KHYpPT5fc2VuZCh7dHlwZToncHVzaCcscGF0aCxkYXRhOnZ9KS50aGVuKHI9Pih7a2V5OnIua2V5fSkpLCByZW1vdmU6KCk9Pl9zZW5kKHt0eXBlOidyZW1vdmUnLHBhdGh9KSwgb246KGV2LGNiKT0+eyBpZighX3N1YnNjcmlwdGlvbnMuaGFzKHBhdGgpKV9zdWJzY3JpcHRpb25zLnNldChwYXRoLG5ldyBTZXQoKSk7IF9zdWJzY3JpcHRpb25zLmdldChwYXRoKS5hZGQoY2IpOyBpZihfd3NSZWFkeSlfd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTonc3Vic2NyaWJlJyxwYXRofSkpOyBfc2VuZCh7dHlwZTonZ2V0JyxwYXRofSkudGhlbihyPT5jYihfc25hcChwYXRoLHIuZGF0YSkpKS5jYXRjaCgoKT0+e30pOyB9LCBvZmY6KCk9PnsgX3N1YnNjcmlwdGlvbnMuZGVsZXRlKHBhdGgpOyBpZihfd3NSZWFkeSlfd3Muc2VuZChKU09OLnN0cmluZ2lmeSh7dHlwZTondW5zdWJzY3JpYmUnLHBhdGh9KSk7IH0gfTsgfQpjb25zdCBmaXJlYmFzZT17ZGF0YWJhc2U6e1NlcnZlclZhbHVlOntUSU1FU1RBTVA6eycuc3YnOid0aW1lc3RhbXAnfX19fTsKY29uc3QgZGI9e3JlZjoocGF0aCk9PnsKICBpZihwYXRoPT09Jy5pbmZvL3NlcnZlclRpbWVPZmZzZXQnKSByZXR1cm4ge29uY2U6YXN5bmMoKT0+e2NvbnN0IHI9YXdhaXQgX3NlbmQoe3R5cGU6J3NlcnZlcnRpbWUnfSk7cmV0dXJuIF9zbmFwKHBhdGgsci50cy1EYXRlLm5vdygpKTt9fTsKICBpZihwYXRoPT09Jy5pbmZvL2Nvbm5lY3RlZCcpIHJldHVybiB7b246KGV2LGNiKT0+eyBpZighX3N1YnNjcmlwdGlvbnMuaGFzKCdfX2Nvbm5lY3RlZF9fJykpX3N1YnNjcmlwdGlvbnMuc2V0KCdfX2Nvbm5lY3RlZF9fJyxuZXcgU2V0KCkpOyBfc3Vic2NyaXB0aW9ucy5nZXQoJ19fY29ubmVjdGVkX18nKS5hZGQoY2IpOyBjYihfc25hcChwYXRoLF93c1JlYWR5KSk7IH19OwogIHJldHVybiBfcmVmKHBhdGgpOwp9fTsKY29uc3QgX19mYkF1dGhSZWFkeSA9IFByb21pc2UucmVzb2x2ZSgpOwoKLy8g4pSA4pSAIFN0YXRlIOKUgOKUgApsZXQgX2Nhcm5pdmFsQ29kZVZhbCA9ICcnOwpPYmplY3QuZGVmaW5lUHJvcGVydHkod2luZG93LCAnY2Fybml2YWxDb2RlJywgewogIGdldDogKCkgPT4gX2Nhcm5pdmFsQ29kZVZhbCwKICBzZXQ6ICh2KSA9PiB7IF9jYXJuaXZhbENvZGVWYWwgPSB2OyBpZih2KSBfd3NDb25uZWN0VG8odik7IH0KfSk7CmxldCBjYXJuaXZhbE1ldGEgPSBudWxsOwpsZXQgbXlOYW1lID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2ZsX25hbWUnKSB8fCAnJzsKbGV0IG15SWQgICA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmbF9pZCcpIHx8IGdlbklkKDgpOwpsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmxfaWQnLCBteUlkKTsKbGV0IG15TGFuZSA9IDA7CmxldCBzZXJ2ZXJPZmZzZXQgPSAwOwpsZXQgd2FrZUxvY2sgPSBudWxsOwpsZXQgcmFmSWQgPSBudWxsOwpsZXQgcmFjZVN0YXRlID0gbnVsbDsKbGV0IHhjU3RhdGUgICA9IG51bGw7CmxldCBhZG1pbkdlbmRlciA9ICdib3lzJzsKbGV0IHhjR2VuZGVyICAgID0gJ2JveXMnOwpsZXQgc2VsU3BvcnQgPSAndHJhY2snOwpsZXQgc2VsVGllciAgPSAnc2Nob29sJzsKbGV0IGFjdGl2ZUxpc3RlbmVycyA9IFtdOwpsZXQgY291bnRkb3duUnVubmluZyA9IGZhbHNlOwpsZXQgZHFTZXQgPSBuZXcgU2V0KCk7CmxldCBkbnNTZXQgPSBuZXcgU2V0KCk7CmxldCBkbmZTZXQgPSBuZXcgU2V0KCk7CmxldCBwcm9ncmFtSW5kZXggPSAwOwovLyBQcm9ncmFtIGJ1aWxkZXIgcm93cwpjb25zdCBwcm9ncmFtUm93cyA9IFtdOwpmdW5jdGlvbiBhZGRQcm9ncmFtUm93KGFnZT0nJywgZ2VuZGVyPSdib3lzJywgZXZlbnQ9JycpIHsKICBjb25zdCBpZCA9IERhdGUubm93KCkgKyBNYXRoLnJhbmRvbSgpOwogIHByb2dyYW1Sb3dzLnB1c2goaWQpOwogIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9ncmFtLXJvd3MnKTsKICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuOwogIGNvbnN0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIHJvdy5pZCA9IGBwcm9nLXJvdy0ke2lkfWA7CiAgcm93LnN0eWxlLmNzc1RleHQgPSAnZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgOTBweCAxZnIgMjhweDtnYXA6NXB4O21hcmdpbi1ib3R0b206NnB4O2FsaWduLWl0ZW1zOmNlbnRlcic7CiAgcm93LmlubmVySFRNTCA9IGA8aW5wdXQgY2xhc3M9InByb2ctYWdlIiBkYXRhLXBpZD0iJHtpZH0iIHBsYWNlaG9sZGVyPSI5IFllYXJzIiB2YWx1ZT0iJHthZ2V9IgogICAgICBzdHlsZT0icGFkZGluZzo3cHggOHB4O2JvcmRlci1yYWRpdXM6OHB4O2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UyKTtjb2xvcjp2YXIoLS10ZXh0KTtmb250LXNpemU6LjgycmVtO3dpZHRoOjEwMCUiPgogICAgPHNlbGVjdCBjbGFzcz0icHJvZy1nZW5kZXIiIGRhdGEtcGlkPSIke2lkfSIKICAgICAgc3R5bGU9InBhZGRpbmc6N3B4IDZweDtib3JkZXItcmFkaXVzOjhweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlMik7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC1zaXplOi44MnJlbTt3aWR0aDoxMDAlIj4KICAgICAgPG9wdGlvbiB2YWx1ZT0iYm95cyIgJHtnZW5kZXI9PT0nYm95cyc/J3NlbGVjdGVkJzonJ30+Qm95czwvb3B0aW9uPgogICAgICA8b3B0aW9uIHZhbHVlPSJnaXJscyIgJHtnZW5kZXI9PT0nZ2lybHMnPydzZWxlY3RlZCc6Jyd9PkdpcmxzPC9vcHRpb24+CiAgICAgIDxvcHRpb24gdmFsdWU9Im1peGVkIiAke2dlbmRlcj09PSdtaXhlZCc/J3NlbGVjdGVkJzonJ30+TWl4ZWQ8L29wdGlvbj4KICAgIDwvc2VsZWN0PgogICAgPGlucHV0IGNsYXNzPSJwcm9nLWV2ZW50IiBkYXRhLXBpZD0iJHtpZH0iIHBsYWNlaG9sZGVyPSIxMDBtIiB2YWx1ZT0iJHtldmVudH0iCiAgICAgIHN0eWxlPSJwYWRkaW5nOjdweCA4cHg7Ym9yZGVyLXJhZGl1czo4cHg7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtc2l6ZTouODJyZW07d2lkdGg6MTAwJSI+CiAgICA8YnV0dG9uIHR5cGU9ImJ1dHRvbiIgb25jbGljaz0icmVtb3ZlUHJvZ3JhbVJvdygke2lkfSkiCiAgICAgIHN0eWxlPSJiYWNrZ3JvdW5kOm5vbmU7Ym9yZGVyOm5vbmU7Y29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtc2l6ZToxcmVtO2N1cnNvcjpwb2ludGVyO3BhZGRpbmc6NHB4O2JvcmRlci1yYWRpdXM6NnB4Ij7inJU8L2J1dHRvbj5gOwogIGNvbnRhaW5lci5hcHBlbmRDaGlsZChyb3cpOwp9CmZ1bmN0aW9uIHJlbW92ZVByb2dyYW1Sb3coaWQpIHsKICBjb25zdCBpZHggPSBwcm9ncmFtUm93cy5pbmRleE9mKGlkKTsKICBpZiAoaWR4ID4gLTEpIHByb2dyYW1Sb3dzLnNwbGljZShpZHgsIDEpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGBwcm9nLXJvdy0ke2lkfWApPy5yZW1vdmUoKTsKfQpmdW5jdGlvbiBnZXRQcm9ncmFtRGF0YSgpIHsKICByZXR1cm4gcHJvZ3JhbVJvd3MubWFwKGlkID0+ICh7CiAgICBhZ2U6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5wcm9nLWFnZVtkYXRhLXBpZD0iJHtpZH0iXWApPy52YWx1ZS50cmltKCl8fCcnLAogICAgZ2VuZGVyOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvZy1nZW5kZXJbZGF0YS1waWQ9IiR7aWR9Il1gKT8udmFsdWV8fCdib3lzJywKICAgIGV2ZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAucHJvZy1ldmVudFtkYXRhLXBpZD0iJHtpZH0iXWApPy52YWx1ZS50cmltKCl8fCcnCiAgfSkpLmZpbHRlcihyID0+IHIuYWdlICYmIHIuZXZlbnQpOwp9IC8vIGxhbmVzIERRJ2QgaW4gY3VycmVudCBkb25lIHBhbmVsCgovLyDilIDilIAgRXZlbnQgTGlzdHMg4pSA4pSACmNvbnN0IEVWRU5UUyA9IHsKICB0cmFjazogWycxMDBtIFNwcmludCcsJzIwMG0gU3ByaW50JywnNDAwbScsJzgwMG0nLCcxNTAwbScsJzTDlzEwMG0gUmVsYXknLCdMb25nIEp1bXAnLCdUcmlwbGUgSnVtcCcsJ0hpZ2ggSnVtcCcsJ1Nob3QgUHV0JywnRGlzY3VzJywnSmF2ZWxpbiddLAogIHN3aW06ICBbJzUwbSBGcmVlc3R5bGUnLCc1MG0gQmFja3N0cm9rZScsJzUwbSBCcmVhc3RzdHJva2UnLCc1MG0gQnV0dGVyZmx5JywnMTAwbSBGcmVlc3R5bGUnLCcxMDBtIEJhY2tzdHJva2UnLCcxMDBtIEJyZWFzdHN0cm9rZScsJzIwMG0gRnJlZXN0eWxlJywnNMOXNTBtIEZyZWVzdHlsZSBSZWxheScsJzTDlzUwbSBNZWRsZXkgUmVsYXknXSwKICB4YzogICAgWydDcm9zcyBDb3VudHJ5IDJrbScsJ0Nyb3NzIENvdW50cnkgM2ttJywnQ3Jvc3MgQ291bnRyeSA0a20nLCdDcm9zcyBDb3VudHJ5IDVrbScsJ0Z1biBSdW4gMWttJywnRnVuIFJ1biAya20nLCdGdW4gUnVuIDNrbSddLAogIG1peGVkOiBbJzEwMG0gU3ByaW50JywnMjAwbSBTcHJpbnQnLCc0MDBtJywnODAwbScsJzUwbSBGcmVlc3R5bGUnLCc1MG0gQmFja3N0cm9rZScsJ0Nyb3NzIENvdW50cnkgMmttJywnQ3Jvc3MgQ291bnRyeSAza20nLCdMb25nIEp1bXAnLCdIaWdoIEp1bXAnXQp9Owpjb25zdCBBR0VfR1JPVVBTID0gWyc5IFllYXJzJywnMTAgWWVhcnMnLCcxMSBZZWFycycsJzEyLzEzIFllYXJzJywnT3BlbicsJ1llYXIgMy80JywnWWVhciA1LzYnLCdZZWFyIDPigJM2J107CmNvbnN0IExBTkVfQ09VTlQgPSA4OwoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIFVUSUxJVElFUwovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKZnVuY3Rpb24gZ2VuSWQobj04KSB7CiAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cmluZygyLCAyK24pLnRvVXBwZXJDYXNlKCk7Cn0KCmZ1bmN0aW9uIGdlbkNvZGUoKSB7CiAgY29uc3QgY2hhcnMgPSAnQUJDREVGR0hKS0xNTlBRUlNUVVZXWFlaJzsKICBsZXQgYyA9ICcnOwogIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSBjICs9IGNoYXJzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNoYXJzLmxlbmd0aCldOwogIHJldHVybiBjOwp9CgpmdW5jdGlvbiBmbXRNcyhtcykgewogIGlmIChtcyA9PSBudWxsIHx8IG1zIDwgMCkgcmV0dXJuICfigJQnOwogIGNvbnN0IHRvdGFsQ3MgPSBNYXRoLmZsb29yKG1zIC8gMTApOwogIGNvbnN0IGNzICA9IHRvdGFsQ3MgJSAxMDA7CiAgY29uc3QgdG90YWxTZWMgPSBNYXRoLmZsb29yKHRvdGFsQ3MgLyAxMDApOwogIGNvbnN0IHNlYyA9IHRvdGFsU2VjICUgNjA7CiAgY29uc3QgbWluID0gTWF0aC5mbG9vcih0b3RhbFNlYyAvIDYwKTsKICBpZiAobWluID4gMCkgcmV0dXJuIGAke21pbn06JHtwYWQoc2VjKX0uJHtwYWQoY3MpfWA7CiAgcmV0dXJuIGAke3NlY30uJHtwYWQoY3MpfWA7Cn0KCmZ1bmN0aW9uIGZtdFNlYyhtcykgewogIGlmIChtcyA9PSBudWxsKSByZXR1cm4gJ+KAlCc7CiAgcmV0dXJuIChtcyAvIDEwMDApLnRvRml4ZWQoMikgKyAncyc7Cn0KCmZ1bmN0aW9uIHBhZChuKSB7IHJldHVybiBTdHJpbmcobikucGFkU3RhcnQoMiwnMCcpOyB9CgpmdW5jdGlvbiBub3dTZXJ2ZXIoKSB7IHJldHVybiBEYXRlLm5vdygpICsgc2VydmVyT2Zmc2V0OyB9CgpmdW5jdGlvbiBvcmRpbmFsKG4pIHsKICBjb25zdCBzID0gWyd0aCcsJ3N0JywnbmQnLCdyZCddOwogIGNvbnN0IHYgPSBuICUgMTAwOwogIHJldHVybiBuICsgKHNbKHYgLSAyMCkgJSAxMF0gfHwgc1t2XSB8fCBzWzBdKTsKfQoKZnVuY3Rpb24gdHJpbW1lZE1lYW4odmFsdWVzKSB7CiAgaWYgKCF2YWx1ZXMgfHwgdmFsdWVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIG51bGw7CiAgaWYgKHZhbHVlcy5sZW5ndGggPD0gMikgcmV0dXJuIHZhbHVlcy5yZWR1Y2UoKGEsYik9PmErYiwwKS92YWx1ZXMubGVuZ3RoOwogIGNvbnN0IHNvcnRlZCA9IFsuLi52YWx1ZXNdLnNvcnQoKGEsYik9PmEtYik7CiAgY29uc3QgaW5uZXIgPSBzb3J0ZWQuc2xpY2UoMSwtMSk7CiAgcmV0dXJuIGlubmVyLnJlZHVjZSgoYSxiKT0+YStiLDApL2lubmVyLmxlbmd0aDsKfQoKZnVuY3Rpb24gY29uZmlkZW5jZUZvcihzcGxpdHNPYmopIHsKICBjb25zdCB2YWxzID0gT2JqZWN0LnZhbHVlcyhzcGxpdHNPYmp8fHt9KS5tYXAocz0+cy5lbGFwc2VkTXMpLmZpbHRlcihCb29sZWFuKTsKICBpZiAodmFscy5sZW5ndGggPT09IDApIHJldHVybiB7IGNsczonTE9XJywgbGFiZWw6J05vIHRpbWVycycgfTsKICBpZiAodmFscy5sZW5ndGggPT09IDEpIHJldHVybiB7IGNsczonQ0hFQ0snLCBsYWJlbDonMSB0aW1lcicgfTsKICBjb25zdCBzcHJlYWQgPSBNYXRoLm1heCguLi52YWxzKSAtIE1hdGgubWluKC4uLnZhbHMpOwogIGlmICh2YWxzLmxlbmd0aCA+PSAzICYmIHNwcmVhZCA8IDMwMCkgcmV0dXJuIHsgY2xzOidISUdIJywgbGFiZWw6J0hJR0gnIH07CiAgaWYgKHZhbHMubGVuZ3RoID49IDIgJiYgc3ByZWFkIDwgNjAwKSByZXR1cm4geyBjbHM6J09LJywgbGFiZWw6J09LJyB9OwogIGlmIChzcHJlYWQgPCAxNTAwKSByZXR1cm4geyBjbHM6J0NIRUNLJywgbGFiZWw6J0NIRUNLJyB9OwogIHJldHVybiB7IGNsczonTE9XJywgbGFiZWw6J0RJU0FHUkVFJyB9Owp9CgpmdW5jdGlvbiBmYkVuYyhzKSB7CiAgcmV0dXJuIFN0cmluZyhzKS5yZXBsYWNlKC9cLi9nLCdfX0RfXycpLnJlcGxhY2UoL1wvL2csJ19fU19fJykKICAgIC5yZXBsYWNlKC9cWy9nLCdfX0xCX18nKS5yZXBsYWNlKC9cXS9nLCdfX1JCX18nKQogICAgLnJlcGxhY2UoLyMvZywnX19IX18nKS5yZXBsYWNlKC9cJC9nLCdfXyRfXycpOwp9CgovLyDilIDilIAgVUkgaGVscGVycyDilIDilIAKZnVuY3Rpb24gc2hvd1NjcmVlbihpZCkgewogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zY3JlZW4nKS5mb3JFYWNoKHMgPT4gcy5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7CiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NyZWVuLScgKyBpZCk7CiAgaWYgKGVsKSB7IGVsLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOyB3aW5kb3cuc2Nyb2xsVG8oMCwwKTsgfQp9CgpmdW5jdGlvbiB0b2FzdChtc2csIGR1cj0yMjAwKSB7CiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndG9hc3QnKTsKICBlbC50ZXh0Q29udGVudCA9IG1zZzsKICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7CiAgY2xlYXJUaW1lb3V0KGVsLl90KTsKICBlbC5fdCA9IHNldFRpbWVvdXQoKCk9PmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKSwgZHVyKTsKfQoKZnVuY3Rpb24gbW9kYWwodGl0bGUsIGJvZHksIGJ1dHRvbnMpIHsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtdHRsJykudGV4dENvbnRlbnQgPSB0aXRsZTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtYmR5JykudGV4dENvbnRlbnQgPSBib2R5OwogIGNvbnN0IHdyYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW9kYWwtYnRucy13cmFwJyk7CiAgd3JhcC5pbm5lckhUTUwgPSAnJzsKICBidXR0b25zLmZvckVhY2goYiA9PiB7CiAgICBjb25zdCBidG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTsKICAgIGJ0bi5jbGFzc05hbWUgPSAnYnRuICcgKyAoYi5jbHN8fCdidG4tc2Vjb25kYXJ5Jyk7CiAgICBidG4udGV4dENvbnRlbnQgPSBiLmxhYmVsOwogICAgYnRuLm9uY2xpY2sgPSAoKSA9PiB7IGNsb3NlTW9kYWwoKTsgYi5mbiAmJiBiLmZuKCk7IH07CiAgICB3cmFwLmFwcGVuZENoaWxkKGJ0bik7CiAgfSk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWJkJykuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7Cn0KCmZ1bmN0aW9uIGNsb3NlTW9kYWwoKSB7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vZGFsLWJkJykuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7Cn0KCmZ1bmN0aW9uIHZpYnJhdGUocGF0KSB7IHRyeSB7IG5hdmlnYXRvci52aWJyYXRlICYmIG5hdmlnYXRvci52aWJyYXRlKHBhdCk7IH0gY2F0Y2goZSl7fSB9CgpmdW5jdGlvbiBmbGFzaCh0eXBlLCBkdXI9NDUwKSB7CiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmxhc2gtb3ZlcmxheScpOwogIGVsLmNsYXNzTmFtZSA9IHR5cGU7CiAgc2V0VGltZW91dCgoKT0+ZWwuY2xhc3NOYW1lPScnLCBkdXIpOwp9CgpmdW5jdGlvbiB0YXBGbGFzaCgpIHsKICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXAtZmxhc2gnKTsKICBlbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7CiAgc2V0VGltZW91dCgoKT0+ZWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpLCAxODApOwp9CgovLyDilIDilIAgQ2xvY2sgc3luYyDilIDilIAKYXN5bmMgZnVuY3Rpb24gc3luY0Nsb2NrKCkgewogIGNvbnN0IHNuYXAgPSBhd2FpdCBkYi5yZWYoJy5pbmZvL3NlcnZlclRpbWVPZmZzZXQnKS5vbmNlKCd2YWx1ZScpOwogIHNlcnZlck9mZnNldCA9IHNuYXAudmFsKCkgfHwgMDsKfQoKYXN5bmMgZnVuY3Rpb24gZ2V0U2VydmVyVGltZSgpIHsKICBjb25zdCBzbmFwID0gYXdhaXQgZGIucmVmKCcuaW5mby9zZXJ2ZXJUaW1lT2Zmc2V0Jykub25jZSgndmFsdWUnKTsKICByZXR1cm4gRGF0ZS5ub3coKSArIChzbmFwLnZhbCgpIHx8IDApOwp9CgovLyDilIDilIAgV2FrZSBsb2NrIOKUgOKUgAphc3luYyBmdW5jdGlvbiByZXF1ZXN0V2FrZUxvY2soKSB7CiAgdHJ5IHsgaWYgKCd3YWtlTG9jaycgaW4gbmF2aWdhdG9yKSB3YWtlTG9jayA9IGF3YWl0IG5hdmlnYXRvci53YWtlTG9jay5yZXF1ZXN0KCdzY3JlZW4nKTsgfQogIGNhdGNoKGUpe30KfQoKLy8gUmUtYWNxdWlyZSB3YWtlIGxvY2sgd2hlbiB0YWIgY29tZXMgYmFjayB0byBmb3JlZ3JvdW5kCmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCAoKSA9PiB7CiAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSByZXF1ZXN0V2FrZUxvY2soKTsKfSk7CgovLyBXYXJuIGJlZm9yZSBjbG9zaW5nIGlmIHJhY2UgaXMgbGl2ZQp3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZSA9PiB7CiAgaWYgKHJhY2VTdGF0ZT8uc3RhdGUgPT09ICdsaXZlJykgewogICAgZS5wcmV2ZW50RGVmYXVsdCgpOwogICAgZS5yZXR1cm5WYWx1ZSA9ICdBIHJhY2UgaXMgY3VycmVudGx5IGxpdmUg4oCUIHRpbWluZyBkYXRhIG1heSBiZSBsb3N0IGlmIHlvdSBsZWF2ZS4nOwogIH0KfSk7CgovLyDilIDilIAgRmlyZWJhc2UgaGVscGVycyDilIDilIAKZnVuY3Rpb24gY1JlZihwYXRoKSB7IHJldHVybiBkYi5yZWYocGF0aCk7IH0KCmZ1bmN0aW9uIGNsZWFuTGlzdGVuZXJzKCkgewogIGFjdGl2ZUxpc3RlbmVycy5mb3JFYWNoKGZuPT5mbigpKTsKICBhY3RpdmVMaXN0ZW5lcnMgPSBbXTsKICBpZiAocmFmSWQpIHsgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmSWQpOyByYWZJZCA9IG51bGw7IH0KfQoKZnVuY3Rpb24gd2F0Y2hDb25uKGRvdElkKSB7CiAgZGIucmVmKCcuaW5mby9jb25uZWN0ZWQnKS5vbigndmFsdWUnLCBzbmFwID0+IHsKICAgIGNvbnN0IGVsICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvdElkKTsKICAgIGNvbnN0IHR4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGRvdElkICsgJy1sYmwnKTsKICAgIGNvbnN0IGxpdmUgPSBzbmFwLnZhbCgpID09PSB0cnVlOwogICAgaWYgKGVsKSAgZWwuY2xhc3NMaXN0LnRvZ2dsZSgnbGl2ZScsIGxpdmUpOwogICAgaWYgKHR4dCkgeyB0eHQudGV4dENvbnRlbnQgPSBsaXZlID8gJ0xJVkUnIDogJ09GRkxJTkUnOyB0eHQuc3R5bGUuY29sb3IgPSBsaXZlID8gJ3ZhcigtLXN1Y2Nlc3MpJyA6ICd2YXIoLS1kYW5nZXIpJzsgfQogIH0pOwp9CgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKLy8gU0VUVVAgU0NSRUVOCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkApmdW5jdGlvbiBzZWxlY3RTcG9ydChzKSB7CiAgc2VsU3BvcnQgPSBzOwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zcG9ydC1idG4nKS5mb3JFYWNoKGI9PmIuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpOwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zcG9ydC1idG5bZGF0YS1zcG9ydD0iJHtzfSJdYCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7Cn0KCmZ1bmN0aW9uIHNlbGVjdFRpZXIodCkgewogIHNlbFRpZXIgPSB0OwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waWxsW2RhdGEtdGllcl0nKS5mb3JFYWNoKHA9PnAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpOwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5waWxsW2RhdGEtdGllcj0iJHt0fSJdYCkuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7Cn0KCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyBERU1PIE1PREUKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCmNvbnN0IERFTU9fQVRITEVURVMgPSBbJ0FpZGVuIFNtaXRoJywnQmVuIENhcnRlcicsJ0NocmlzIExlZScsJ0RhbmEgUGFyaycsJ0VtbWEgV2hpdGUnLCdGaW5uIFRheWxvcicsJ0d1cyBCcm93bicsJ0hhcnBlciBKb25lcyddOwoKYXN5bmMgZnVuY3Rpb24gc3RhcnREZW1vKCkgewogIHRvYXN0KCdTZXR0aW5nIHVwIGRlbW/igKYnKTsKICBsZXQgY29kZSwgc25hcDsKICBkbyB7CiAgICBjb2RlID0gZ2VuQ29kZSgpOwogICAgY2Fybml2YWxDb2RlID0gY29kZTsgYXdhaXQgX3dzUmVhZHkyKCk7IHNuYXAgPSBhd2FpdCBkYi5yZWYoJ21ldGEnKS5vbmNlKCd2YWx1ZScpOwogIH0gd2hpbGUgKHNuYXAuZXhpc3RzKCkpOwoKICBjYXJuaXZhbENvZGUgPSBjb2RlOwogIGNhcm5pdmFsTWV0YSA9IHsKICAgIHNjaG9vbDogJ0RlbW8gQ2Fybml2YWwnLAogICAgbmFtZTogJzEwMG0gU3ByaW50IERlbW8nLAogICAgc3BvcnQ6ICd0cmFjaycsCiAgICB0aWVyOiAnc2Nob29sJywKICAgIGNvbG91cjogJyNmNTllMGInLAogICAgaXNEZW1vOiB0cnVlLAogICAgY3JlYXRlZEF0OiBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAKICB9OwogIGFwcGx5QWNjZW50KCcjZjU5ZTBiJyk7CiAgYXdhaXQgZGIucmVmKCdtZXRhJykuc2V0KGNhcm5pdmFsTWV0YSk7CiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZsX2xhc3RfY29kZScsIGNvZGUpOwoKICBzaG93U2NyZWVuKCdhZG1pbicpOwogIGluaXRBZG1pblZpZXcoKTsKCiAgLy8gUHJlLWZpbGwgYXRobGV0ZSBuYW1lcyBhbmQgc2Nyb2xsIGRlbW8gYmFubmVyIGludG8gdmlldwogIHNldFRpbWVvdXQoKCkgPT4gewogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkbWluLWxhbmUtbmFtZS1pbnB1dCcpLmZvckVhY2goKGlucCwgaSkgPT4gewogICAgICBpZiAoREVNT19BVEhMRVRFU1tpXSkgaW5wLnZhbHVlID0gREVNT19BVEhMRVRFU1tpXTsKICAgIH0pOwogICAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWRlbW8tYmFubmVyJyk7CiAgICBpZiAoYmFubmVyKSBiYW5uZXIuc2Nyb2xsSW50b1ZpZXcoe2JlaGF2aW9yOidzbW9vdGgnLCBibG9jazonc3RhcnQnfSk7CiAgICB0b2FzdChgRGVtbyByZWFkeSDigJQgJHtjb2RlfS4gU2hhcmUgdGhlIGNvZGUgb3IgUVIgd2l0aCB5b3VyIHRpbWVycywgdGhlbiBhcm0gdGhlIHJhY2UuYCk7CiAgfSwgMzAwKTsKfQoKZnVuY3Rpb24gY29weURlbW9Db2RlKCkgewogIGNvbnN0IGNvZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtby1jb2RlLWRpc3BsYXknKS50ZXh0Q29udGVudDsKICBpZiAobmF2aWdhdG9yLmNsaXBib2FyZCkgewogICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoY29kZSkudGhlbigoKSA9PiB0b2FzdCgnQ29kZSBjb3BpZWQnKSk7CiAgfSBlbHNlIHsKICAgIC8vIGZhbGxiYWNrCiAgICBjb25zdCB0YSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJyk7CiAgICB0YS52YWx1ZSA9IGNvZGU7IGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGEpOwogICAgdGEuc2VsZWN0KCk7IGRvY3VtZW50LmV4ZWNDb21tYW5kKCdjb3B5Jyk7IGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGEpOwogICAgdG9hc3QoJ0NvZGUgY29waWVkJyk7CiAgfQp9CgpmdW5jdGlvbiBpbml0RGVtb0Jhbm5lcigpIHsKICBpZiAoIWNhcm5pdmFsTWV0YT8uaXNEZW1vKSByZXR1cm47CiAgY29uc3QgYmFubmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWRlbW8tYmFubmVyJyk7CiAgaWYgKCFiYW5uZXIpIHJldHVybjsKICBiYW5uZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7CgogIGNvbnN0IGNvZGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkZW1vLWNvZGUtZGlzcGxheScpOwogIGlmIChjb2RlRWwpIGNvZGVFbC50ZXh0Q29udGVudCA9IGNhcm5pdmFsQ29kZTsKCiAgY29uc3Qgam9pblVybCA9IGBodHRwczovL2Nhcm5pdmFsdGltaW5nLmNvbS8/am9pbj0ke2Nhcm5pdmFsQ29kZX1gOwogIGNvbnN0IHFyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZGVtby1xci1jYW52YXMnKTsKICBpZiAocXJFbCAmJiB0eXBlb2YgUVJDb2RlICE9PSAndW5kZWZpbmVkJykgewogICAgcXJFbC5pbm5lckhUTUwgPSAnJzsKICAgIG5ldyBRUkNvZGUocXJFbCwgeyB0ZXh0OiBqb2luVXJsLCB3aWR0aDogMTI4LCBoZWlnaHQ6IDEyOCwKICAgICAgY29sb3JEYXJrOiAnIzAwMDAwMCcsIGNvbG9yTGlnaHQ6ICcjZmZmZmZmJyB9KTsKICB9Cn0KCmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUNhcm5pdmFsKCkgewogIGNvbnN0IHNjaG9vbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR1cC1zY2hvb2wnKS52YWx1ZS50cmltKCk7CiAgY29uc3QgbmFtZSAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHVwLW5hbWUnKS52YWx1ZS50cmltKCk7CiAgaWYgKCFzY2hvb2wgfHwgIW5hbWUpIHsgdG9hc3QoJ0VudGVyIHNjaG9vbCBuYW1lIGFuZCBldmVudCBuYW1lJyk7IHJldHVybjsgfQoKICBjb25zdCBjb2xvdXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dXAtY29sb3VyJykudmFsdWUudHJpbSgpIHx8ICcjMTRiOGE2JzsKICBhcHBseUFjY2VudChjb2xvdXIpOwoKICAvLyBGaW5kIHVuaXF1ZSBjb2RlCiAgbGV0IGNvZGUsIHNuYXA7CiAgZG8gewogICAgY29kZSA9IGdlbkNvZGUoKTsKICAgIGNhcm5pdmFsQ29kZSA9IGNvZGU7IGF3YWl0IF93c1JlYWR5MigpOyBzbmFwID0gYXdhaXQgZGIucmVmKCdtZXRhJykub25jZSgndmFsdWUnKTsKICB9IHdoaWxlIChzbmFwLmV4aXN0cygpKTsKCiAgY2Fybml2YWxDb2RlID0gY29kZTsKICBjb25zdCBob3VzZXNSYXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dXAtaG91c2VzJyk/LnZhbHVlLnRyaW0oKXx8Jyc7CiAgY29uc3QgaG91c2VzID0gaG91c2VzUmF3ID8gaG91c2VzUmF3LnNwbGl0KCcsJykubWFwKGg9PmgudHJpbSgpKS5maWx0ZXIoQm9vbGVhbikgOiBbXTsKICBjb25zdCBwcm9ncmFtID0gZ2V0UHJvZ3JhbURhdGEoKTsKICBjYXJuaXZhbE1ldGEgPSB7IHNjaG9vbCwgbmFtZSwgc3BvcnQ6c2VsU3BvcnQsIHRpZXI6c2VsVGllciwgY29sb3VyLAogICAgaG91c2VzLCBwcm9ncmFtLAogICAgY3JlYXRlZEF0OiBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAgfTsKCiAgYXdhaXQgZGIucmVmKCdtZXRhJykuc2V0KGNhcm5pdmFsTWV0YSk7CiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZsX2xhc3RfY29kZScsIGNvZGUpOwoKICB0b2FzdChgQ2Fybml2YWwgY3JlYXRlZCDigJQgJHtjb2RlfWApOwogIHNob3dSb2xlUGlja2VyKCk7CiAgLy8gQWRtaW4gYXV0by1uYXZpZ2F0ZXMgdG8gdGhlaXIgY29udHJvbCBwYW5lbAogIHNldFRpbWVvdXQoKCkgPT4gZW50ZXJSb2xlKHNlbFNwb3J0ID09PSAneGMnID8gJ2FkbWluLXhjJyA6ICdhZG1pbicpLCA2MDApOwp9CgpmdW5jdGlvbiBhcHBseUFjY2VudChjb2xvdXIpIHsKICBpZiAoIWNvbG91ciB8fCAhL14jWzAtOWEtZkEtRl17Myw2fSQvLnRlc3QoY29sb3VyKSkgcmV0dXJuOwogIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1hY2NlbnQnLCBjb2xvdXIpOwp9CgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKLy8gSk9JTgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKYXN5bmMgZnVuY3Rpb24gam9pbkNhcm5pdmFsKHJvbGVIaW50KSB7CiAgY29uc3QgY29kZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqb2luLWNvZGUtaW5wdXQnKS52YWx1ZS50cmltKCkudG9VcHBlckNhc2UoKTsKICBjb25zdCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pvaW4tbmFtZS1pbnB1dCcpLnZhbHVlLnRyaW0oKTsKICBjb25zdCBpc09ic2VydmVyID0gcm9sZUhpbnQgPT09ICdvYnNlcnZlcic7CiAgaWYgKGNvZGUubGVuZ3RoIDwgNCkgeyB0b2FzdCgnRW50ZXIgNC1sZXR0ZXIgY29kZScpOyByZXR1cm47IH0KICBpZiAoIW5hbWUgJiYgIWlzT2JzZXJ2ZXIpIHsgdG9hc3QoJ0VudGVyIHlvdXIgbmFtZScpOyByZXR1cm47IH0KCiAgY2Fybml2YWxDb2RlID0gY29kZTsgYXdhaXQgX3dzUmVhZHkyKCk7IGNvbnN0IHNuYXAgPSBhd2FpdCBkYi5yZWYoJ21ldGEnKS5vbmNlKCd2YWx1ZScpOwogIGNvbnN0IGVyckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pvaW4tZXJyb3InKTsKICBpZiAoIXNuYXAuZXhpc3RzKCkpIHsKICAgIGVyckVsLnRleHRDb250ZW50ID0gJ0Nhcm5pdmFsIG5vdCBmb3VuZCDigJQgY2hlY2sgdGhlIGNvZGUnOwogICAgZXJyRWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7CiAgICByZXR1cm47CiAgfQogIGVyckVsLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOwoKICBjYXJuaXZhbENvZGUgPSBjb2RlOwogIGNhcm5pdmFsTWV0YSA9IHNuYXAudmFsKCk7CiAgbXlOYW1lID0gbmFtZTsKICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmxfbmFtZScsIG5hbWUpOwogIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmbF9sYXN0X2NvZGUnLCBjb2RlKTsKICBpZiAoY2Fybml2YWxNZXRhLmNvbG91cikgYXBwbHlBY2NlbnQoY2Fybml2YWxNZXRhLmNvbG91cik7CgogIGlmIChpc09ic2VydmVyKSB7IGVudGVyUm9sZSgnb2JzZXJ2ZXInKTsgcmV0dXJuOyB9CiAgc2hvd1JvbGVQaWNrZXIoKTsKfQoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIFJPTEUgUElDS0VSCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkApmdW5jdGlvbiBzaG93Um9sZVBpY2tlcigpIHsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sZS1zY2hvb2wtbmFtZScpLnRleHRDb250ZW50ID0gY2Fybml2YWxNZXRhPy5zY2hvb2wgfHwgJ0Nhcm5pdmFsIFRpbWluZyc7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGUtY2Fybml2YWwtbmFtZScpLnRleHRDb250ZW50ID0gY2Fybml2YWxNZXRhPy5uYW1lIHx8ICcnOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlLWpvaW5lZC1uYW1lJykudGV4dENvbnRlbnQgPSBjYXJuaXZhbE1ldGE/Lm5hbWUgfHwgJyc7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGUtam9pbmVkLWNvZGUnKS50ZXh0Q29udGVudCA9IGBDb2RlOiAke2Nhcm5pdmFsQ29kZX1gOwogIGNvbnN0IGV4cGlyZXNOb3RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGUtZXhwaXJlcy1ub3RlJyk7CiAgaWYgKGV4cGlyZXNOb3RlICYmIGNhcm5pdmFsTWV0YT8uZXhwaXJlc0F0KSB7CiAgICBjb25zdCBkYXlzTGVmdCA9IE1hdGguY2VpbCgoY2Fybml2YWxNZXRhLmV4cGlyZXNBdCAtIERhdGUubm93KCkpIC8gODY0MDAwMDApOwogICAgaWYgKGRheXNMZWZ0ID4gMCkgewogICAgICBleHBpcmVzTm90ZS50ZXh0Q29udGVudCA9IGBFeHBpcmVzIGluICR7ZGF5c0xlZnR9IGRheSR7ZGF5c0xlZnQ9PT0xPycnOidzJ31gOwogICAgICBleHBpcmVzTm90ZS5zdHlsZS5kaXNwbGF5ID0gJyc7CiAgICB9IGVsc2UgewogICAgICBleHBpcmVzTm90ZS50ZXh0Q29udGVudCA9ICdUaGlzIGNhcm5pdmFsIGhhcyBleHBpcmVkJzsKICAgICAgZXhwaXJlc05vdGUuc3R5bGUuY29sb3IgPSAndmFyKC0td2FybiknOwogICAgICBleHBpcmVzTm90ZS5zdHlsZS5kaXNwbGF5ID0gJyc7CiAgICB9CiAgfQoKICBjb25zdCBzcG9ydCA9IGNhcm5pdmFsTWV0YT8uc3BvcnQgfHwgJ3RyYWNrJzsKICBjb25zdCBncmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3JvbGUtZ3JpZCcpOwogIGNvbnN0IHJvbGVzID0gW107CgogIGlmIChbJ3RyYWNrJywnc3dpbScsJ21peGVkJ10uaW5jbHVkZXMoc3BvcnQpKSB7CiAgICByb2xlcy5wdXNoKHsgaWQ6J3RpbWVyJywgICAgaWNvbjonPHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMyIgcj0iOCIvPjxwYXRoIGQ9Ik0xMiA5djRsMiAyTTkgMmg2Ii8+PC9zdmc+JywgbGFiZWw6J1RpbWVyJywgICAgICAgIGRlc2M6J1RpbWUgYSBsYW5lJyB9KTsKICAgIHJvbGVzLnB1c2goeyBpZDonYWRtaW4nLCAgICBpY29uOic8c3ZnIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGFyaWEtaGlkZGVuPSJ0cnVlIiBzdHlsZT0idmVydGljYWwtYWxpZ246bWlkZGxlIj48bGluZSB4MT0iNCIgeTE9IjIxIiB4Mj0iNCIgeTI9IjE0Ii8+PGxpbmUgeDE9IjQiIHkxPSIxMCIgeDI9IjQiIHkyPSIzIi8+PGxpbmUgeDE9IjEyIiB5MT0iMjEiIHgyPSIxMiIgeTI9IjEyIi8+PGxpbmUgeDE9IjEyIiB5MT0iOCIgeDI9IjEyIiB5Mj0iMyIvPjxsaW5lIHgxPSIyMCIgeTE9IjIxIiB4Mj0iMjAiIHkyPSIxNiIvPjxsaW5lIHgxPSIyMCIgeTE9IjEyIiB4Mj0iMjAiIHkyPSIzIi8+PGxpbmUgeDE9IjEiIHkxPSIxNCIgeDI9IjciIHkyPSIxNCIvPjxsaW5lIHgxPSI5IiB5MT0iOCIgeDI9IjE1IiB5Mj0iOCIvPjxsaW5lIHgxPSIxNyIgeTE9IjE2IiB4Mj0iMjMiIHkyPSIxNiIvPjwvc3ZnPicsIGxhYmVsOidSYWNlIENvbnRyb2wnLCBkZXNjOidBcm0gJiBtYW5hZ2UgcmFjZXMnIH0pOwogICAgcm9sZXMucHVzaCh7IGlkOidzdGFydGVyJywgIGljb246Jzxzdmcgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgYXJpYS1oaWRkZW49InRydWUiIHN0eWxlPSJ2ZXJ0aWNhbC1hbGlnbjptaWRkbGUiPjxwYXRoIGQ9Ik02IDhhNiA2IDAgMCAxIDEyIDBjMCA3IDMgOSAzIDlIM3MzLTIgMy05Ii8+PHBhdGggZD0iTTEwLjMgMjFhMS45NCAxLjk0IDAgMCAwIDMuNCAwIi8+PC9zdmc+JywgbGFiZWw6J1N0YXJ0ZXInLCAgICAgIGRlc2M6J0ZpcmUgdGhlIGd1bicgfSk7CiAgICByb2xlcy5wdXNoKHsgaWQ6J29ic2VydmVyJywgaWNvbjonPHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PHBhdGggZD0iTTEgMTJzNC04IDExLTggMTEgOCAxMSA4LTQgOC0xMSA4LTExLTgtMTEtOHoiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIzIi8+PC9zdmc+JywgbGFiZWw6J09ic2VydmVyJywgICAgIGRlc2M6J1dhdGNoIGxpdmUgcmVzdWx0cycgfSk7CiAgfQogIGlmIChbJ3hjJywnbWl4ZWQnXS5pbmNsdWRlcyhzcG9ydCkpIHsKICAgIHJvbGVzLnB1c2goeyBpZDonbWFyc2hhbCcsICAgaWNvbjonPHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PHBhdGggZD0iTTEyIDIyVjhNNSA4bDctNiA3IDZNMyAyMmgxOE05IDIyVjE2aDZ2NiIvPjwvc3ZnPicsIGxhYmVsOidGaW5pc2ggTWFyc2hhbCcsIGRlc2M6J1RhcCBlYWNoIGZpbmlzaGVyJywgICAgIGZ1bGw6IHNwb3J0PT09InhjIiB9KTsKICAgIHJvbGVzLnB1c2goeyBpZDonYWRtaW4teGMnLCAgaWNvbjonPHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PGxpbmUgeDE9IjQiIHkxPSIyMSIgeDI9IjQiIHkyPSIxNCIvPjxsaW5lIHgxPSI0IiB5MT0iMTAiIHgyPSI0IiB5Mj0iMyIvPjxsaW5lIHgxPSIxMiIgeTE9IjIxIiB4Mj0iMTIiIHkyPSIxMiIvPjxsaW5lIHgxPSIxMiIgeTE9IjgiIHgyPSIxMiIgeTI9IjMiLz48bGluZSB4MT0iMjAiIHkxPSIyMSIgeDI9IjIwIiB5Mj0iMTYiLz48bGluZSB4MT0iMjAiIHkxPSIxMiIgeDI9IjIwIiB5Mj0iMyIvPjxsaW5lIHgxPSIxIiB5MT0iMTQiIHgyPSI3IiB5Mj0iMTQiLz48bGluZSB4MT0iOSIgeTE9IjgiIHgyPSIxNSIgeTI9IjgiLz48bGluZSB4MT0iMTciIHkxPSIxNiIgeDI9IjIzIiB5Mj0iMTYiLz48L3N2Zz4nLCBsYWJlbDonWEMgQ29udHJvbCcsICAgIGRlc2M6J0FybSAmIG1hbmFnZSBYQyByYWNlcycsIGZ1bGw6IHNwb3J0PT09J3hjJyB9KTsKICAgIHJvbGVzLnB1c2goeyBpZDonb2JzZXJ2ZXIteGMnLGljb246Jzxzdmcgd2lkdGg9IjI4IiBoZWlnaHQ9IjI4IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgYXJpYS1oaWRkZW49InRydWUiIHN0eWxlPSJ2ZXJ0aWNhbC1hbGlnbjptaWRkbGUiPjxwYXRoIGQ9Ik0xIDEyczQtOCAxMS04IDExIDggMTEgOC00IDgtMTEgOC0xMS04LTExLTh6Ii8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMyIvPjwvc3ZnPicsbGFiZWw6J1hDIE9ic2VydmVyJywgICBkZXNjOidXYXRjaCBmaW5pc2ggb3JkZXInLCAgICBmdWxsOiBzcG9ydD09PSd4YycgfSk7CiAgfQogIGlmIChbJ3RyYWNrJywnc3dpbScsJ21peGVkJ10uaW5jbHVkZXMoc3BvcnQpKSB7CiAgICByb2xlcy5wdXNoKHsgaWQ6J3ZpZGVvLWZpbmlzaCcsIGljb246Jzxzdmcgd2lkdGg9IjI2IiBoZWlnaHQ9IjI2IiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgYXJpYS1oaWRkZW49InRydWUiIHN0eWxlPSJ2ZXJ0aWNhbC1hbGlnbjptaWRkbGUiPjxwYXRoIGQ9Ik0yMyA3bC03IDUgNyA1Vjd6Ii8+PHJlY3QgeD0iMSIgeT0iNSIgd2lkdGg9IjE1IiBoZWlnaHQ9IjE0IiByeD0iMiIvPjwvc3ZnPicsIGxhYmVsOidWaWRlbyBGaW5pc2gnLCBkZXNjOidGcmFtZS1hY2N1cmF0ZSBhdXRvLXRpbWluZycsIGZ1bGw6dHJ1ZSB9KTsKICB9CiAgcm9sZXMucHVzaCh7IGlkOidzaGFyZScsICAgaWNvbjonPHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PHJlY3QgeD0iNSIgeT0iMiIgd2lkdGg9IjE0IiBoZWlnaHQ9IjIwIiByeD0iMiIvPjxwYXRoIGQ9Ik0xMiAxOGguMDEiLz48L3N2Zz4nLCBsYWJlbDonSm9pbiBQYWdlJywgIGRlc2M6J1FSIGNvZGUgZm9yIHBhcnRpY2lwYW50cycsIGZ1bGw6dHJ1ZSB9KTsKICByb2xlcy5wdXNoKHsgaWQ6J3Jlc3VsdHMnLCBpY29uOic8c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGFyaWEtaGlkZGVuPSJ0cnVlIiBzdHlsZT0idmVydGljYWwtYWxpZ246bWlkZGxlIj48bGluZSB4MT0iMTgiIHkxPSIyMCIgeDI9IjE4IiB5Mj0iMTAiLz48bGluZSB4MT0iMTIiIHkxPSIyMCIgeDI9IjEyIiB5Mj0iNCIvPjxsaW5lIHgxPSI2IiB5MT0iMjAiIHgyPSI2IiB5Mj0iMTQiLz48L3N2Zz4nLCBsYWJlbDonUmVzdWx0cycsICAgIGRlc2M6J1ZpZXcgYWxsIHJlc3VsdHMnLCAgICAgICAgICBmdWxsOnRydWUgfSk7CgogIGdyaWQuaW5uZXJIVE1MID0gcm9sZXMubWFwKHIgPT4gYAogICAgPGRpdiBjbGFzcz0icm9sZS1jYXJkJHtyLmZ1bGw/JyBmdWxsJzonJ30iIG9uY2xpY2s9ImVudGVyUm9sZSgnJHtyLmlkfScpIj4KICAgICAgPGRpdiBjbGFzcz0ici1pY29uIj4ke3IuaWNvbn08L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0ici1sYWJlbCI+JHtyLmxhYmVsfTwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJyLWRlc2MiPiR7ci5kZXNjfTwvZGl2PgogICAgPC9kaXY+YCkuam9pbignJyk7CgogIHNob3dTY3JlZW4oJ3JvbGUnKTsKfQoKCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyBBRE1JTiBQSU4KLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCmZ1bmN0aW9uIF9jaGVja0FkbWluUGluKG9uU3VjY2VzcykgewogIGNvbnN0IHN0b3JlZFBpbiA9IGNhcm5pdmFsTWV0YT8uYWRtaW5QaW47CiAgaWYgKCFzdG9yZWRQaW4pIHsKICAgIC8vIE5vIFBJTiBzZXQg4oCUIGxldCB0aGVtIGluLCBvZmZlciB0byBzZXQgb25lCiAgICBvblN1Y2Nlc3MoKTsKICAgIF9vZmZlclNldFBpbigpOwogICAgcmV0dXJuOwogIH0KICBfcGluTW9kYWwoJ0VudGVyIEFkbWluIFBJTicsIChlbnRlcmVkKSA9PiB7CiAgICBpZiAoZW50ZXJlZCA9PT0gbnVsbCkgcmV0dXJuOyAvLyBjYW5jZWxsZWQKICAgIGlmIChTdHJpbmcoZW50ZXJlZCkgPT09IFN0cmluZyhzdG9yZWRQaW4pKSB7CiAgICAgIG9uU3VjY2VzcygpOwogICAgfSBlbHNlIHsKICAgICAgdG9hc3QoJ0luY29ycmVjdCBQSU4nKTsKICAgIH0KICB9KTsKfQoKYXN5bmMgZnVuY3Rpb24gX29mZmVyU2V0UGluKCkgewogIC8vIE5vbi1ibG9ja2luZyBudWRnZSDigJQgc2hvd24gYWZ0ZXIgYWRtaW4gbG9hZHMsIHVzZXMgY3VzdG9tIG1vZGFsIChubyBjb25maXJtKCkpCiAgc2V0VGltZW91dCgoKSA9PiB7CiAgICBpZiAoY2Fybml2YWxNZXRhPy5hZG1pblBpbikgcmV0dXJuOyAvLyBhbHJlYWR5IHNldCBieSBub3cKICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICBlbC5pZCA9ICdvZmZlci1waW4tbW9kYWwnOwogICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDtpbnNldDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNjUpO3otaW5kZXg6OTk5OTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzoxNnB4JzsKICAgIGVsLmlubmVySFRNTCA9IGAKICAgICAgPGRpdiBzdHlsZT0iYmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXItcmFkaXVzOjE2cHg7cGFkZGluZzoyMHB4O21heC13aWR0aDozMDBweDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyIj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjFyZW07bWFyZ2luLWJvdHRvbTo4cHgiPlByb3RlY3QgUmFjZSBDb250cm9sPzwvZGl2PgogICAgICAgIDxkaXYgc3R5bGU9ImNvbG9yOnZhcigtLW11dGVkKTtmb250LXNpemU6Ljg1cmVtO21hcmdpbi1ib3R0b206MTZweCI+U2V0IGEgNC1kaWdpdCBQSU4gc28gb25seSB5b3UgY2FuIGFjY2VzcyBSYWNlIENvbnRyb2wgb24gdGhpcyBjYXJuaXZhbC48L2Rpdj4KICAgICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjhweCI+CiAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZsZXg6MSIgb25jbGljaz0iZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29mZmVyLXBpbi1tb2RhbCcpPy5yZW1vdmUoKSI+U2tpcDwvYnV0dG9uPgogICAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1wcmltYXJ5IiBzdHlsZT0iZmxleDoxIiBvbmNsaWNrPSJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2ZmZXItcGluLW1vZGFsJyk/LnJlbW92ZSgpO19waW5Nb2RhbCgnQ2hvb3NlIGEgNC1kaWdpdCBQSU4nLGFzeW5jKHBpbik9PntpZihwaW49PT1udWxsfHxwaW4ubGVuZ3RoPDEpcmV0dXJuO2Nhcm5pdmFsTWV0YT17Li4uKGNhcm5pdmFsTWV0YXx8e30pLGFkbWluUGluOlN0cmluZyhwaW4pfTthd2FpdCBjUmVmKCdtZXRhJykudXBkYXRlKHthZG1pblBpbjpTdHJpbmcocGluKX0pO3RvYXN0KCdQSU4gc2V0IOKckycpO30sdHJ1ZSkiPlNldCBQSU48L2J1dHRvbj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+YDsKICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpOwogIH0sIDgwMCk7Cn0KCmZ1bmN0aW9uIF9waW5Nb2RhbCh0aXRsZSwgY2FsbGJhY2ssIGlzTmV3KSB7CiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBlbC5pZCA9ICdwaW4tbW9kYWwnOwogIGVsLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7aW5zZXQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjcpO3otaW5kZXg6OTk5OTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzoxNnB4JzsKICBlbC5pbm5lckhUTUwgPSBgCiAgICA8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpO2JvcmRlci1yYWRpdXM6MTZweDtwYWRkaW5nOjIwcHg7bWF4LXdpZHRoOjI4MHB4O3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXIiPgogICAgICA8ZGl2IHN0eWxlPSJmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjFyZW07bWFyZ2luLWJvdHRvbToxMnB4Ij4ke3RpdGxlfTwvZGl2PgogICAgICA8ZGl2IGlkPSJwaW4tZGlzcGxheSIgc3R5bGU9ImZvbnQtc2l6ZToycmVtO2xldHRlci1zcGFjaW5nOi40ZW07Zm9udC1mYW1pbHk6bW9ub3NwYWNlO21pbi1oZWlnaHQ6Mi41cmVtO21hcmdpbi1ib3R0b206MTJweCI+X19fXzwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmdyaWQ7Z3JpZC10ZW1wbGF0ZS1jb2x1bW5zOnJlcGVhdCgzLDFmcik7Z2FwOjhweDttYXJnaW4tYm90dG9tOjhweCI+CiAgICAgICAgJHtbMSwyLDMsNCw1LDYsNyw4LDldLm1hcChuPT5gPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJmb250LXNpemU6MS4ycmVtO3BhZGRpbmc6MTJweCAwIiBvbmNsaWNrPSJfcGluS2V5KCcke259JykiPiR7bn08L2J1dHRvbj5gKS5qb2luKCcnKX0KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZvbnQtc2l6ZToxcmVtO3BhZGRpbmc6MTJweCAwIiBvbmNsaWNrPSJfcGluS2V5KCdkZWwnKSI+4oyrPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJmb250LXNpemU6MS4ycmVtO3BhZGRpbmc6MTJweCAwIiBvbmNsaWNrPSJfcGluS2V5KCcwJykiPjA8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZvbnQtc2l6ZToxcmVtO3BhZGRpbmc6MTJweCAwIiBvbmNsaWNrPSJfcGluS2V5KCdvaycpIj5PSzwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJ3aWR0aDoxMDAlO21hcmdpbi10b3A6NHB4IiBvbmNsaWNrPSJfcGluS2V5KCdjYW5jZWwnKSI+Q2FuY2VsPC9idXR0b24+CiAgICA8L2Rpdj5gOwogIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpOwogIGxldCBwaW5WYWwgPSAnJzsKICBmdW5jdGlvbiByZWZyZXNoKCkgewogICAgY29uc3QgZGlzcCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwaW4tZGlzcGxheScpOwogICAgaWYgKGRpc3ApIGRpc3AudGV4dENvbnRlbnQgPSBwaW5WYWwuc3BsaXQoJycpLm1hcCgoKT0+J+KXjycpLmpvaW4oJyAnKS5wYWRFbmQoNywnXycpLnJlcGxhY2UoLyBfIC9nLCcgXyAnKSB8fCAnX19fXyc7CiAgfQogIHdpbmRvdy5fcGluS2V5ID0gKGspID0+IHsKICAgIGlmIChrID09PSAnY2FuY2VsJykgeyBlbC5yZW1vdmUoKTsgZGVsZXRlIHdpbmRvdy5fcGluS2V5OyBjYWxsYmFjayhudWxsKTsgcmV0dXJuOyB9CiAgICBpZiAoayA9PT0gJ2RlbCcpIHsgcGluVmFsID0gcGluVmFsLnNsaWNlKDAsLTEpOyByZWZyZXNoKCk7IHJldHVybjsgfQogICAgaWYgKGsgPT09ICdvaycpIHsKICAgICAgaWYgKHBpblZhbC5sZW5ndGggPT09IDApIHJldHVybjsKICAgICAgZWwucmVtb3ZlKCk7IGRlbGV0ZSB3aW5kb3cuX3BpbktleTsgY2FsbGJhY2socGluVmFsKTsgcmV0dXJuOwogICAgfQogICAgaWYgKHBpblZhbC5sZW5ndGggPCA4KSB7IHBpblZhbCArPSBrOyByZWZyZXNoKCk7IH0KICAgIGlmIChwaW5WYWwubGVuZ3RoID09PSA0ICYmICFpc05ldykgeyBlbC5yZW1vdmUoKTsgZGVsZXRlIHdpbmRvdy5fcGluS2V5OyBjYWxsYmFjayhwaW5WYWwpOyB9CiAgfTsKfQoKZnVuY3Rpb24gZW50ZXJSb2xlKHJvbGUpIHsKICBjbGVhbkxpc3RlbmVycygpOwogIGlmIChyb2xlID09PSAndGltZXInKSB7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncm9sZS1ncmlkJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgIGNvbnN0IHBpY2tlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb2xlLWxhbmUtcGlja2VyJyk7CiAgICBwaWNrZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7CiAgICBwaWNrZXIuc3R5bGUubWFyZ2luVG9wID0gJzAnOwogICAgY29uc3QgYnRucyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsYW5lLXBpY2stYnRucycpOwogICAgYnRucy5pbm5lckhUTUwgPQogICAgICBgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJ3aWR0aDoxMDAlO21hcmdpbi1ib3R0b206MTJweDtmb250LXNpemU6MC45cmVtIiBvbmNsaWNrPSJzaG93Um9sZVBpY2tlcigpIj7ihpAgQmFjayB0byByb2xlczwvYnV0dG9uPmAgKwogICAgICBBcnJheS5mcm9tKHtsZW5ndGg6TEFORV9DT1VOVH0sKF8saSk9PmkrMSkKICAgICAgICAubWFwKG49PmA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiIHN0eWxlPSJtaW4taGVpZ2h0OjY0cHg7Zm9udC1zaXplOjEuMnJlbTtmb250LXdlaWdodDo3MDA7ZmxleDoxO21pbi13aWR0aDo4MHB4IiBvbmNsaWNrPSJlbnRlclRpbWVyTGFuZSgke259KSI+TGFuZSAke259PC9idXR0b24+YCkKICAgICAgICAuam9pbignJyk7CiAgICBzZXRUaW1lb3V0KCgpID0+IHBpY2tlci5zY3JvbGxJbnRvVmlldyh7YmVoYXZpb3I6J3Ntb290aCcsIGJsb2NrOidzdGFydCd9KSwgNTApOwogICAgcmV0dXJuOwogIH0KICBpZiAocm9sZSA9PT0gJ3NoYXJlJykgICB7IHNob3dTaGFyZVBhZ2UoKTsgcmV0dXJuOyB9CiAgaWYgKHJvbGUgPT09ICdhZG1pbicpICAgeyBfY2hlY2tBZG1pblBpbigoKSA9PiB7IHNob3dTY3JlZW4oJ2FkbWluJyk7IGluaXRBZG1pblZpZXcoKTsgfSk7IHJldHVybjsgfQogIGlmIChyb2xlID09PSAnc3RhcnRlcicpIHsgc2hvd1NjcmVlbignc3RhcnRlcicpOyAgICAgaW5pdFN0YXJ0ZXJWaWV3KCk7ICAgIHJldHVybjsgfQogIGlmIChyb2xlID09PSAnb2JzZXJ2ZXInKXsgc2hvd1NjcmVlbignb2JzZXJ2ZXInKTsgICAgaW5pdE9ic2VydmVyVmlldygpOyAgIHJldHVybjsgfQogIGlmIChyb2xlID09PSAnbWFyc2hhbCcpIHsgc2hvd1NjcmVlbignbWFyc2hhbCcpOyAgICAgaW5pdE1hcnNoYWxWaWV3KCk7ICAgIHJldHVybjsgfQogIGlmIChyb2xlID09PSAnYWRtaW4teGMnKXsgc2hvd1NjcmVlbignYWRtaW4teGMnKTsgICBpbml0WENBZG1pblZpZXcoKTsgICAgcmV0dXJuOyB9CiAgaWYgKHJvbGUgPT09ICdvYnNlcnZlci14YycpeyBzaG93U2NyZWVuKCdvYnNlcnZlci14YycpOyBpbml0WENPYnNlcnZlclZpZXcoKTsgcmV0dXJuOyB9CiAgaWYgKHJvbGUgPT09ICdyZXN1bHRzJykgICAgICB7IHNob3dTY3JlZW4oJ3Jlc3VsdHMnKTsgICAgICBpbml0UmVzdWx0c1ZpZXcoKTsgICByZXR1cm47IH0KICBpZiAocm9sZSA9PT0gJ3ZpZGVvLWZpbmlzaCcpIHsgc2hvd1NjcmVlbigndmlkZW8tZmluaXNoJyk7IGluaXRWaWRlb0ZpbmlzaCgpOyAgIHJldHVybjsgfQogIGlmIChyb2xlID09PSAncm9sZScpICAgICAgICAgeyBzaG93Um9sZVBpY2tlcigpOyAgICAgICAgICAgIHJldHVybjsgfQp9CgpmdW5jdGlvbiBlbnRlclRpbWVyTGFuZShuKSB7CiAgbXlMYW5lID0gbjsKICBjbGVhbkxpc3RlbmVycygpOwogIHNob3dTY3JlZW4oJ3RpbWVyJyk7CiAgaW5pdFRpbWVyVmlldyhuKTsKfQoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIFRJTUVSIFZJRVcgKExhbmUgUmFjZSkKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCmZ1bmN0aW9uIGluaXRUaW1lclZpZXcobGFuZSkgewogIHJlcXVlc3RXYWtlTG9jaygpOwogIHN5bmNDbG9jaygpOwogIHdhdGNoQ29ubigndGltZXItZG90Jyk7CgogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1sYW5lLWxhYmVsJykudGV4dENvbnRlbnQgPSBgTGFuZSAke2xhbmV9YDsKCiAgLy8gTmFtZSBnYXRlCiAgY29uc3QgbmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLW5hbWUtaW5wdXQnKTsKICBjb25zdCBzdG9wQnRuICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItc3RvcC1idG4nKTsKICBpZiAobXlOYW1lKSB7IG5hbWVJbnB1dC52YWx1ZSA9IG15TmFtZTsgc3RvcEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1uYW1lLWdhdGUnKS5zdHlsZS5kaXNwbGF5PSdub25lJzsgfQogIG5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpPT57CiAgICBteU5hbWUgPSBuYW1lSW5wdXQudmFsdWUudHJpbSgpOwogICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2ZsX25hbWUnLCBteU5hbWUpOwogICAgbXlOYW1lID8gc3RvcEJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgOiBzdG9wQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTsKICB9KTsKCiAgY29uc3QgcmFjZVJlZiA9IGNSZWYoJ3JhY2UvY3VycmVudCcpOwogIHJhY2VSZWYub24oJ3ZhbHVlJywgc25hcCA9PiB7IHJhY2VTdGF0ZSA9IHNuYXAudmFsKCk7IHJlbmRlclRpbWVyVmlldyhsYW5lLCByYWNlU3RhdGUpOyB9KTsKICBhY3RpdmVMaXN0ZW5lcnMucHVzaCgoKT0+cmFjZVJlZi5vZmYoKSk7CgogIGNSZWYoJ3JlY2FsbCcpLm9uKCd2YWx1ZScsIHNuYXAgPT4geyBpZiAoc25hcC52YWwoKT8uYWN0aXZlKSBmbGFzaFJlY2FsbCgpOyB9KTsKICBhY3RpdmVMaXN0ZW5lcnMucHVzaCgoKT0+Y1JlZigncmVjYWxsJykub2ZmKCkpOwoKICBmdW5jdGlvbiB0aWNrKCkgewogICAgaWYgKHJhY2VTdGF0ZT8uc3RhdGU9PT0nbGl2ZScgJiYgcmFjZVN0YXRlLnN0YXJ0ZWRBdFNlcnZlcikgewogICAgICBjb25zdCBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1jbG9jaycpOwogICAgICBpZiAoZWwpIGVsLnRleHRDb250ZW50ID0gZm10TXMobm93U2VydmVyKCkgLSByYWNlU3RhdGUuc3RhcnRlZEF0U2VydmVyKTsKICAgIH0KICAgIHJhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spOwogIH0KICByYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTsKfQoKZnVuY3Rpb24gcmVuZGVyVGltZXJWaWV3KGxhbmUsIHJhY2UpIHsKICBjb25zdCB3YWl0aW5nICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci13YWl0aW5nLW1zZycpOwogIGNvbnN0IG15U3BsaXQgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLW15LXNwbGl0Jyk7CiAgY29uc3Qgc3BsaXRzQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1zcGxpdHMtY2FyZCcpOwogIGNvbnN0IHN0b3BCdG4gID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLXN0b3AtYnRuJyk7CiAgY29uc3QgYmFkZ2UgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItYmFkZ2Utd3JhcCcpOwoKICBjb25zdCByZWNhbGxCYW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItcmVjYWxsLWJhbm5lcicpOwoKICBpZiAoIXJhY2UgfHwgcmFjZS5zdGF0ZT09PSdpZGxlJykgewogICAgd2FpdGluZy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKICAgIG15U3BsaXQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgICBzcGxpdHNDYXJkLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOwogICAgaWYgKHJlY2FsbEJhbm5lcikgcmVjYWxsQmFubmVyLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOwogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLWNsb2NrJykudGV4dENvbnRlbnQgPSAnMDowMC4wMCc7CiAgICBiYWRnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9ImJhZGdlIGJhZGdlLWlkbGUiPklETEU8L3NwYW4+YDsKICAgIHJldHVybjsKICB9CiAgd2FpdGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKCiAgaWYgKHJlY2FsbEJhbm5lcikgewogICAgcmFjZS5yZWNhbGxlZCA/IHJlY2FsbEJhbm5lci5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKSA6IHJlY2FsbEJhbm5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICB9CgogIGNvbnN0IHNwb3J0TGFiZWwgPSBjYXJuaXZhbE1ldGE/LnNwb3J0PT09InN3aW0iID8gJzxzdmcgd2lkdGg9IjIyIiBoZWlnaHQ9IjIyIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgYXJpYS1oaWRkZW49InRydWUiIHN0eWxlPSJ2ZXJ0aWNhbC1hbGlnbjptaWRkbGUiPjxwYXRoIGQ9Ik0yIDIwczItMiA1LTIgNSAyIDcgMiA1LTIgNy0yIDMgMSAzIDFNMiAxNnMyLTIgNS0yIDUgMiA3IDIgNS0yIDctMiAzIDEgMyAxIi8+PGNpcmNsZSBjeD0iMTQiIGN5PSI1IiByPSIyIi8+PC9zdmc+JyA6ICc8c3ZnIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMiIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGFyaWEtaGlkZGVuPSJ0cnVlIiBzdHlsZT0idmVydGljYWwtYWxpZ246bWlkZGxlIj48cG9seWxpbmUgcG9pbnRzPSIyMiAxMiAxOCAxMiAxNSAyMSA5IDMgNiAxMiAyIDEyIi8+PC9zdmc+JzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZXItYXRobGV0ZS1ldmVudCcpLmlubmVySFRNTCA9CiAgICBgJHtzcG9ydExhYmVsfSAke3JhY2UuYWdlfHwnJ30gJHtyYWNlLmdlbmRlcnx8Jyd9IMK3ICR7cmFjZS5ldmVudHx8Jyd9YDsKCiAgY29uc3QgbGFuZURhdGEgPSByYWNlLmxhbmVzPy5bbGFuZV07CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLWF0aGxldGUtbmFtZScpLnRleHRDb250ZW50ID0gbGFuZURhdGE/Lm5hbWUgfHwgYExhbmUgJHtsYW5lfWA7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLWF0aGxldGUtbm90ZScpLnRleHRDb250ZW50ID0gbGFuZURhdGE/Lm5vdGUgfHwgJyc7CgogIGlmIChyYWNlLnN0YXRlPT09J2FybWVkJykgewogICAgYmFkZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPSJiYWRnZSBiYWRnZS1hcm1lZCI+QVJNRUQ8L3NwYW4+YDsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1jbG9jaycpLnRleHRDb250ZW50ID0gJzA6MDAuMDAnOwogIH0gZWxzZSBpZiAocmFjZS5zdGF0ZT09PSdsaXZlJykgewogICAgYmFkZ2UuaW5uZXJIVE1MID0gYDxzcGFuIGNsYXNzPSJiYWRnZSBiYWRnZS1saXZlIj5MSVZFPC9zcGFuPmA7CiAgfSBlbHNlIGlmIChyYWNlLnN0YXRlPT09J2RvbmUnKSB7CiAgICBiYWRnZS5pbm5lckhUTUwgPSBgPHNwYW4gY2xhc3M9ImJhZGdlIGJhZGdlLWRvbmUiPkRPTkU8L3NwYW4+YDsKICB9CgogIC8vIE15IHNwbGl0CiAgY29uc3QgbXlSZWMgPSByYWNlLnNwbGl0cz8uW2xhbmVdPy5bZmJFbmMobXlJZCldOwogIGlmIChteVJlYykgewogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWVyLW15LXRpbWUnKS50ZXh0Q29udGVudCA9IGZtdFNlYyhteVJlYy5lbGFwc2VkTXMpOwogICAgbXlTcGxpdC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKICAgIHN0b3BCdG4udGV4dENvbnRlbnQgPSAnU3RvcHBlZCc7CiAgICBzdG9wQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTsKICB9IGVsc2UgewogICAgbXlTcGxpdC5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICAgIGlmIChyYWNlLnN0YXRlPT09J2xpdmUnKSB7IHN0b3BCdG4udGV4dENvbnRlbnQgPSAnU1RPUCc7IHN0b3BCdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpOyB9CiAgICBjb25zdCBleHBCdG5zID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWV4cG9ydC1idG5zJyk7CiAgICBpZiAoZXhwQnRucykgeyBpZiAocmFjZS5zdGF0ZT09PSdkb25lJykgeyBleHBCdG5zLnN0eWxlLmRpc3BsYXk9J2ZsZXgnOyBleHBCdG5zLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOyB9IGVsc2UgeyBleHBCdG5zLnN0eWxlLmRpc3BsYXk9J25vbmUnOyB9IH0KICB9CgogIC8vIEFsbCBzcGxpdHMgdGhpcyBsYW5lCiAgY29uc3QgbGFuZVNwbGl0cyA9IHJhY2Uuc3BsaXRzPy5bbGFuZV0gfHwge307CiAgY29uc3Qgc3BsaXRWYWxzID0gT2JqZWN0LnZhbHVlcyhsYW5lU3BsaXRzKTsKICBpZiAoc3BsaXRWYWxzLmxlbmd0aCkgewogICAgc3BsaXRzQ2FyZC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1zcGxpdHMtbGlzdCcpLmlubmVySFRNTCA9IHNwbGl0VmFscy5tYXAocz0+YAogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OnNwYWNlLWJldHdlZW47cGFkZGluZzo3cHggMDtib3JkZXItYm90dG9tOjFweCBzb2xpZCB2YXIoLS1zdXJmYWNlMykiPgogICAgICAgIDxzcGFuIGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQtc20iPiR7cy5uYW1lfHwnPyd9PC9zcGFuPgogICAgICAgIDxzcGFuIGNsYXNzPSJmb250LW1vbm8iIHN0eWxlPSJmb250LXdlaWdodDo3MDAiPiR7Zm10U2VjKHMuZWxhcHNlZE1zKX08L3NwYW4+CiAgICAgIDwvZGl2PmApLmpvaW4oJycpOwogIH0gZWxzZSB7IHNwbGl0c0NhcmQuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7IH0KfQoKYXN5bmMgZnVuY3Rpb24gdGltZXJTdG9wKCkgewogIGlmICghcmFjZVN0YXRlIHx8IHJhY2VTdGF0ZS5zdGF0ZSE9PSdsaXZlJykgeyB0b2FzdCgnUmFjZSBub3QgbGl2ZScpOyByZXR1cm47IH0KICBpZiAoIW15TmFtZSkgeyB0b2FzdCgnRW50ZXIgeW91ciBuYW1lIGZpcnN0Jyk7IHJldHVybjsgfQogIGNvbnN0IGVsYXBzZWQgPSBub3dTZXJ2ZXIoKSAtIHJhY2VTdGF0ZS5zdGFydGVkQXRTZXJ2ZXI7CiAgaWYgKGVsYXBzZWQgPCA1MDApIHsgdG9hc3QoJ1RvbyBxdWljayDigJQgY2hlY2sgc3RhcnQnKTsgcmV0dXJuOyB9CiAgY29uc3Qga2V5ID0gZmJFbmMobXlJZCk7CiAgY29uc3Qgc3BsaXRQYXlsb2FkID0geyBuYW1lOiBteU5hbWUsIGVsYXBzZWRNczogZWxhcHNlZCwgc3RvcEF0OiBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAgfTsKICBfc2F2ZVBlbmRpbmdTcGxpdChteUxhbmUsIGtleSwgc3BsaXRQYXlsb2FkKTsKICBjb25zdCBzcGxpdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1zdG9wLWJ0bicpOwogIGlmIChzcGxpdEJ0bikgeyBzcGxpdEJ0bi50ZXh0Q29udGVudCA9ICdTZW5kaW5n4oCmJzsgc3BsaXRCdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpOyB9CiAgdHJ5IHsKICAgIGF3YWl0IGNSZWYoYHJhY2UvY3VycmVudC9zcGxpdHMvJHtteUxhbmV9LyR7a2V5fWApLnNldChzcGxpdFBheWxvYWQpOwogICAgX2NsZWFyUGVuZGluZ1NwbGl0KGtleSk7CiAgICBpZiAoc3BsaXRCdG4pIHsgc3BsaXRCdG4udGV4dENvbnRlbnQgPSAnU2VudCDinJMnOyB9CiAgfSBjYXRjaChlcnIpIHsKICAgIGlmIChzcGxpdEJ0bikgeyBzcGxpdEJ0bi50ZXh0Q29udGVudCA9ICfimqAgUXVldWVkJzsgfQogICAgdG9hc3QoJ1dpRmkgaXNzdWUg4oCUIHNwbGl0IHNhdmVkLCB3aWxsIHJldHJ5Jyk7CiAgfQogIHZpYnJhdGUoWzEwMF0pOwogIGZsYXNoKCdnbycsIDMwMCk7CiAgdG9hc3QoYFN0b3BwZWQg4oCUICR7Zm10U2VjKGVsYXBzZWQpfWApOwogIC8vIDMtc2Vjb25kIHVuZG8gd2luZG93CiAgX3Nob3dUaW1lclVuZG8obXlMYW5lLCBrZXksIGVsYXBzZWQpOwp9CgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKLy8gQURNSU4gVklFVyAoTGFuZSBSYWNlKQovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKZnVuY3Rpb24gaW5pdEFkbWluVmlldygpIHsKICByZXF1ZXN0V2FrZUxvY2soKTsgc3luY0Nsb2NrKCk7CiAgd2F0Y2hDb25uKCdhZG1pbi1kb3QnKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tc2Nob29sLWxibCcpLnRleHRDb250ZW50ID0gY2Fybml2YWxNZXRhPy5zY2hvb2x8fCcnOwoKICAvLyBTaG93IGNhcm5pdmFsIGNvZGUgaW4gaGVhZGVyICsgU2hhcmUgYnV0dG9uCiAgY29uc3QgY29kZUVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWNvZGUtbGJsJyk7CiAgaWYgKGNvZGVFbCkgewogICAgY29kZUVsLnRleHRDb250ZW50ID0gY2Fybml2YWxDb2RlOwogICAgY29kZUVsLm9uY2xpY2sgPSAoKSA9PiB7IHRyeSB7IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KGNhcm5pdmFsQ29kZSk7IHRvYXN0KCdDb2RlIGNvcGllZCEnKTsgfSBjYXRjaChlKXt9IH07CiAgfQoKICAvLyBEZW1vIGJhbm5lcgogIGNvbnN0IGJhbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1kZW1vLWJhbm5lcicpOwogIGlmIChiYW5uZXIpIGJhbm5lci5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICBpZiAoY2Fybml2YWxNZXRhPy5pc0RlbW8pIGluaXREZW1vQmFubmVyKCk7CgogIC8vIFBvcHVsYXRlIGRyb3Bkb3ducwogIGNvbnN0IGFnZVNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1hZ2Utc2VsJyk7CiAgYWdlU2VsLmlubmVySFRNTCA9IEFHRV9HUk9VUFMubWFwKGE9PmA8b3B0aW9uPiR7YX08L29wdGlvbj5gKS5qb2luKCcnKTsKICBjb25zdCBldlNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1ldmVudC1zZWwnKTsKICBjb25zdCBzcG9ydCA9IGNhcm5pdmFsTWV0YT8uc3BvcnR8fCd0cmFjayc7CiAgY29uc3QgZXZMaXN0ID0gRVZFTlRTW3Nwb3J0XSB8fCBFVkVOVFMudHJhY2s7CiAgZXZTZWwuaW5uZXJIVE1MID0gZXZMaXN0Lm1hcChlPT5gPG9wdGlvbj4ke2V9PC9vcHRpb24+YCkuam9pbignJyk7CgogIC8vIExhbmUgaW5wdXRzCiAgY29uc3QgaG91c2VzID0gY2Fybml2YWxNZXRhPy5ob3VzZXN8fFtdOwogIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1sYW5lLWlucHV0cycpOwogIGNvbnRhaW5lci5pbm5lckhUTUwgPSBBcnJheS5mcm9tKHtsZW5ndGg6TEFORV9DT1VOVH0sKF8saSk9PmkrMSkubWFwKG49PmAKICAgIDxkaXYgY2xhc3M9ImFkbWluLWxhbmUtcm93IiBpZD0iYWxyLSR7bn0iPgogICAgICA8ZGl2IGNsYXNzPSJhZG1pbi1sYW5lLW51bSI+JHtufTwvZGl2PgogICAgICA8aW5wdXQgY2xhc3M9ImFkbWluLWxhbmUtbmFtZS1pbnB1dCIgZGF0YS1sYW5lPSIke259IgogICAgICAgIHBsYWNlaG9sZGVyPSJOYW1lIG9yIEJpYiAjIiB0eXBlPSJ0ZXh0IiBzdHlsZT0iZmxleDoxIj4KICAgICAgJHtob3VzZXMubGVuZ3RoID8gYDxzZWxlY3QgY2xhc3M9ImFkbWluLWxhbmUtaG91c2UiIGRhdGEtbGFuZT0iJHtufSIKICAgICAgICAgIHN0eWxlPSJwYWRkaW5nOjZweCA4cHg7Ym9yZGVyLXJhZGl1czo4cHg7Ym9yZGVyOjFweCBzb2xpZCB2YXIoLS1ib3JkZXIpO2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZTIpO2NvbG9yOnZhcigtLXRleHQpO2ZvbnQtc2l6ZTouODJyZW07bWF4LXdpZHRoOjkwcHgiPgogICAgICAgICAgPG9wdGlvbiB2YWx1ZT0iIj5Ib3VzZTwvb3B0aW9uPgogICAgICAgICAgJHtob3VzZXMubWFwKGg9PmA8b3B0aW9uIHZhbHVlPSIke2h9Ij4ke2h9PC9vcHRpb24+YCkuam9pbignJyl9CiAgICAgICAgPC9zZWxlY3Q+YCA6ICcnfQogICAgICA8ZGl2IHN0eWxlPSJkaXNwbGF5OmZsZXg7Z2FwOjRweCI+CiAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJzdGF0dXMtYnRuIiBkYXRhLWxhbmU9IiR7bn0iIGRhdGEtc3R5cGU9ImRucyIgb25jbGljaz0idG9nZ2xlTGFuZVN0YXR1cygke259LCdkbnMnKSI+RE5TPC9idXR0b24+CiAgICAgICAgPGJ1dHRvbiB0eXBlPSJidXR0b24iIGNsYXNzPSJzdGF0dXMtYnRuIiBkYXRhLWxhbmU9IiR7bn0iIGRhdGEtc3R5cGU9ImRuZiIgb25jbGljaz0idG9nZ2xlTGFuZVN0YXR1cygke259LCdkbmYnKSI+RE5GPC9idXR0b24+CiAgICAgIDwvZGl2PgogICAgPC9kaXY+YCkuam9pbignJyk7CiAgZG5zU2V0LmNsZWFyKCk7IGRuZlNldC5jbGVhcigpOwogIC8vIEhvdXNlIHN0YW5kaW5ncwogIGNvbnN0IGhvdXNlQ2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1ob3VzZS1jYXJkJyk7CiAgaWYgKGhvdXNlcy5sZW5ndGggJiYgaG91c2VDYXJkKSB7CiAgICBob3VzZUNhcmQuc3R5bGUuZGlzcGxheSA9ICcnOwogICAgY29uc3QgaHBSZWYgPSBjUmVmKCdob3VzZVBvaW50cycpOwogICAgaHBSZWYub24oJ3ZhbHVlJywgc25hcCA9PiB7CiAgICAgIGNvbnN0IHB0cyA9IHNuYXAudmFsKCl8fHt9OwogICAgICBjb25zdCBzb3J0ZWQgPSBbLi4uaG91c2VzXS5tYXAoaD0+KHtoLCBwdHM6cHRzW2hdfHwwfSkpLnNvcnQoKGEsYik9PmIucHRzLWEucHRzKTsKICAgICAgY29uc3QgdG90YWwgPSBzb3J0ZWQucmVkdWNlKChzLHIpPT5zK3IucHRzLDApOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4taG91c2Utc3RhbmRpbmdzJykuaW5uZXJIVE1MID0gc29ydGVkLm1hcCgocixpKT0+YAogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjdweCAwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcikiPgogICAgICAgICAgPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZTouOXJlbTttaW4td2lkdGg6MThweCI+JHtpPT09MCYmdG90YWw+MD8n8J+lhyc6aT09PTEmJnRvdGFsPjA/J/CfpYgnOmk9PT0yJiZ0b3RhbD4wPyfwn6WJJzonJ308L3NwYW4+CiAgICAgICAgICA8c3BhbiBzdHlsZT0iZmxleDoxO2ZvbnQtd2VpZ2h0OiR7aT09PTAmJnRvdGFsPjA/JzcwMCc6JzQwMCd9Ij4ke3IuaH08L3NwYW4+CiAgICAgICAgICA8c3BhbiBzdHlsZT0iZm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxLjA1cmVtO2NvbG9yOiR7aT09PTAmJnRvdGFsPjA/J3ZhcigtLWFjY2VudCknOid2YXIoLS10ZXh0KSd9Ij4ke3IucHRzfTwvc3Bhbj4KICAgICAgICA8L2Rpdj5gKS5qb2luKCcnKTsKICAgIH0pOwogICAgYWN0aXZlTGlzdGVuZXJzLnB1c2goKCk9PmhwUmVmLm9mZigpKTsKICB9IGVsc2UgaWYgKGhvdXNlQ2FyZCkgeyBob3VzZUNhcmQuc3R5bGUuZGlzcGxheSA9ICdub25lJzsgfQogIC8vIFByb2dyYW0gIk5leHQgRXZlbnQiIGJ1dHRvbgogIGNvbnN0IHByb2cgPSBjYXJuaXZhbE1ldGE/LnByb2dyYW18fFtdOwogIGNvbnN0IG5leHRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tbmV4dC1ldmVudC1idG4nKTsKICBpZiAocHJvZy5sZW5ndGggJiYgbmV4dEJ0bikgeyBuZXh0QnRuLnN0eWxlLmRpc3BsYXkgPSAnJzsgcHJvZ3JhbUluZGV4ID0gMDsgfQogIGVsc2UgaWYgKG5leHRCdG4pIHsgbmV4dEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOyB9CgogIGNvbnN0IHJhY2VSZWYgPSBjUmVmKCdyYWNlL2N1cnJlbnQnKTsKICByYWNlUmVmLm9uKCd2YWx1ZScsIHNuYXA9PntyYWNlU3RhdGU9c25hcC52YWwoKTsgcmVuZGVyQWRtaW5WaWV3KHJhY2VTdGF0ZSk7fSk7CiAgYWN0aXZlTGlzdGVuZXJzLnB1c2goKCk9PnJhY2VSZWYub2ZmKCkpOwoKICBmdW5jdGlvbiB0aWNrKCkgewogICAgaWYgKHJhY2VTdGF0ZT8uc3RhdGU9PT0nbGl2ZScgJiYgcmFjZVN0YXRlLnN0YXJ0ZWRBdFNlcnZlcikgewogICAgICBjb25zdCBlbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tbGl2ZS1jbG9jaycpOwogICAgICBpZihlbCkgZWwudGV4dENvbnRlbnQ9Zm10TXMobm93U2VydmVyKCktcmFjZVN0YXRlLnN0YXJ0ZWRBdFNlcnZlcik7CiAgICB9CiAgICByYWZJZD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7CiAgfQogIHJhZklkPXJlcXVlc3RBbmltYXRpb25GcmFtZSh0aWNrKTsKfQoKZnVuY3Rpb24gc2VsZWN0QWRtaW5HZW5kZXIoZykgewogIGFkbWluR2VuZGVyID0gZzsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZ10nKS5mb3JFYWNoKHA9PnAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpOwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLWFnPSIke2d9Il1gKS5mb3JFYWNoKHA9PnAuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJykpOwp9CgpmdW5jdGlvbiByZW5kZXJBZG1pblZpZXcocmFjZSkgewogIGNvbnN0IHNldHVwID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLXNldHVwLXBhbmVsJyk7CiAgY29uc3QgbGl2ZSAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tbGl2ZS1wYW5lbCcpOwogIGNvbnN0IGRvbmUgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWRvbmUtcGFuZWwnKTsKCiAgaWYgKCFyYWNlIHx8IHJhY2Uuc3RhdGU9PT0naWRsZScpIHsKICAgIHNldHVwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOyBsaXZlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyBkb25lLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyByZXR1cm47CiAgfQogIHNldHVwLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOwoKICBpZiAocmFjZS5zdGF0ZT09PSdkb25lJykgewogICAgbGl2ZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsgZG9uZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKICAgIHJlbmRlckFkbWluRG9uZShyYWNlKTsgcmV0dXJuOwogIH0KCiAgbGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsgZG9uZS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tcmFjZS1sYmwnKS50ZXh0Q29udGVudCA9IGAke3JhY2UuYWdlfSAke3JhY2UuZ2VuZGVyfSDCtyAke3JhY2UuZXZlbnR9YDsKCiAgY29uc3QgYmFkZ2UgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLXN0YXRlLWJhZGdlJyk7CiAgY29uc3QgZ29CdG4gID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWdvLWJ0bicpOwogIGNvbnN0IHB1YkJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1wdWJsaXNoLWJ0bicpOwoKICBpZiAocmFjZS5zdGF0ZT09PSdhcm1lZCcpIHsKICAgIGJhZGdlLmNsYXNzTmFtZT0nYmFkZ2UgYmFkZ2UtYXJtZWQnOyBiYWRnZS50ZXh0Q29udGVudD0nQVJNRUQnOwogICAgZ29CdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpOyBwdWJCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tbGl2ZS1jbG9jaycpLnRleHRDb250ZW50PScwOjAwLjAwJzsKICB9IGVsc2UgaWYgKHJhY2Uuc3RhdGU9PT0nbGl2ZScpIHsKICAgIGJhZGdlLmNsYXNzTmFtZT0nYmFkZ2UgYmFkZ2UtbGl2ZSc7IGJhZGdlLnRleHRDb250ZW50PSdMSVZFJzsKICAgIGdvQnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTsKICB9CgogIC8vIFNwbGl0cwogIGNvbnN0IGxhbmVzID0gcmFjZS5sYW5lc3x8e307CiAgY29uc3Qgc3BsaXRzID0gcmFjZS5zcGxpdHN8fHt9OwogIGxldCBhbGxUaW1lZCA9IE9iamVjdC5rZXlzKGxhbmVzKS5sZW5ndGg+MDsKCiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLXNwbGl0cy1saXN0JykuaW5uZXJIVE1MID0gQXJyYXkuZnJvbSh7bGVuZ3RoOkxBTkVfQ09VTlR9LChfLGkpPT5pKzEpLm1hcChuPT57CiAgICBpZiAoIWxhbmVzW25dKSByZXR1cm4gJyc7CiAgICBjb25zdCBsYW5lU3BsaXRzID0gc3BsaXRzW25dfHx7fTsKICAgIGNvbnN0IHZhbHMgPSBPYmplY3QudmFsdWVzKGxhbmVTcGxpdHMpLm1hcChzPT5zLmVsYXBzZWRNcykuZmlsdGVyKEJvb2xlYW4pOwogICAgY29uc3QgbWVhbiA9IHZhbHMubGVuZ3RoID8gdHJpbW1lZE1lYW4odmFscykgOiBudWxsOwogICAgY29uc3QgY29uZiA9IGNvbmZpZGVuY2VGb3IobGFuZVNwbGl0cyk7CiAgICBpZiAoIW1lYW4pIGFsbFRpbWVkID0gZmFsc2U7CiAgICByZXR1cm4gYDxkaXYgY2xhc3M9ImxhbmUtcm93Ij4KICAgICAgPGRpdiBjbGFzcz0ibGFuZS1udW0iPiR7bn08L2Rpdj4KICAgICAgPGRpdiBjbGFzcz0ibGFuZS1uYW1lIj4ke2xhbmVzW25dPy5uYW1lfHxgTGFuZSAke259YH08L2Rpdj4KICAgICAgJHttZWFuID8gYDxkaXY+PHNwYW4gY2xhc3M9ImxhbmUtdGltZSI+JHtmbXRTZWMobWVhbil9PC9zcGFuPiA8c3BhbiBjbGFzcz0iY29uZi0ke2NvbmYuY2xzfSI+JHtjb25mLmxhYmVsfTwvc3Bhbj48L2Rpdj5gCiAgICAgICAgICAgICA6IGA8c3BhbiBjbGFzcz0idGV4dC1tdXRlZCB0ZXh0LXhzIj4ke3JhY2Uuc3RhdGU9PT0nbGl2ZSc/J3dhaXRpbmfigKYnOifigJQnfTwvc3Bhbj5gfQogICAgPC9kaXY+YDsKICB9KS5qb2luKCcnKTsKCiAgaWYgKHJhY2Uuc3RhdGU9PT0nbGl2ZScgJiYgYWxsVGltZWQpIHB1YkJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKfQoKZnVuY3Rpb24gdG9nZ2xlTGFuZVN0YXR1cyhsYW5lLCB0eXBlKSB7CiAgY29uc3QgbCA9IFN0cmluZyhsYW5lKTsKICBjb25zdCBzZXRBID0gdHlwZT09PSdkbnMnID8gZG5zU2V0IDogZG5mU2V0OwogIGNvbnN0IHNldEIgPSB0eXBlPT09J2RucycgPyBkbmZTZXQgOiBkbnNTZXQ7CiAgaWYgKHNldEEuaGFzKGwpKSB7IHNldEEuZGVsZXRlKGwpOyB9IGVsc2UgeyBzZXRBLmFkZChsKTsgc2V0Qi5kZWxldGUobCk7IH0KICAvLyBVcGRhdGUgYnV0dG9uIHN0eWxlcwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5zdGF0dXMtYnRuW2RhdGEtbGFuZT0iJHtsYW5lfSJdYCkuZm9yRWFjaChidG4gPT4gewogICAgY29uc3QgdCA9IGJ0bi5kYXRhc2V0LnN0eXBlOwogICAgYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZS1kbnMnLCdhY3RpdmUtZG5mJyk7CiAgICBpZiAodD09PSdkbnMnICYmIGRuc1NldC5oYXMobCkpIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtZG5zJyk7CiAgICBpZiAodD09PSdkbmYnICYmIGRuZlNldC5oYXMobCkpIGJ0bi5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtZG5mJyk7CiAgfSk7Cn0KZnVuY3Rpb24gYWRtaW5OZXh0RXZlbnQoKSB7CiAgY29uc3QgcHJvZyA9IGNhcm5pdmFsTWV0YT8ucHJvZ3JhbXx8W107CiAgaWYgKCFwcm9nLmxlbmd0aCkgcmV0dXJuOwogIGlmIChwcm9ncmFtSW5kZXggPj0gcHJvZy5sZW5ndGgpIHsgdG9hc3QoJ/Cfj4EgUHJvZ3JhbSBjb21wbGV0ZSEnKTsgcmV0dXJuOyB9CiAgY29uc3QgZXYgPSBwcm9nW3Byb2dyYW1JbmRleF07CiAgLy8gU2V0IGFnZQogIGNvbnN0IGFnZVNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1hZ2Utc2VsJyk7CiAgaWYgKGFnZVNlbCkgYWdlU2VsLnZhbHVlID0gZXYuYWdlOwogIHNlbGVjdEFkbWluR2VuZGVyKGV2LmdlbmRlcnx8J2JveXMnKTsKICAvLyBTZXQgZXZlbnQKICBjb25zdCBldlNlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1ldmVudC1zZWwnKTsKICBpZiAoZXZTZWwpIGV2U2VsLnZhbHVlID0gZXYuZXZlbnQ7CiAgLy8gTG9hZCBzYXZlZCBsYW5lIG5hbWVzCiAgX2xvYWRMYW5lTmFtZXMoZXYuYWdlLCBldi5nZW5kZXJ8fCdib3lzJywgZXYuZXZlbnQpOwogIGNvbnN0IG51bSA9IHByb2dyYW1JbmRleCArIDE7CiAgcHJvZ3JhbUluZGV4Kys7CiAgY29uc3QgcmVtYWluaW5nID0gcHJvZy5sZW5ndGggLSBwcm9ncmFtSW5kZXg7CiAgY29uc3QgbmV4dEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1uZXh0LWV2ZW50LWJ0bicpOwogIGlmIChuZXh0QnRuKSBuZXh0QnRuLnRleHRDb250ZW50ID0gcmVtYWluaW5nID4gMCA/IGBOZXh0IEV2ZW50ICgke3JlbWFpbmluZ30gbGVmdCkg4oaSYCA6ICdQcm9ncmFtIERvbmUnOwogIHRvYXN0KGBFdmVudCAke251bX0vJHtwcm9nLmxlbmd0aH06ICR7ZXYuYWdlfSAke2V2LmdlbmRlcn0g4oCUICR7ZXYuZXZlbnR9YCk7Cn0KYXN5bmMgZnVuY3Rpb24gYWRtaW5SZXNldEhvdXNlUG9pbnRzKCkgewogIGlmICghYXdhaXQgX2NvbmZpcm1Nb2RhbCgnUmVzZXQgaG91c2UgcG9pbnRzPycsICdUaGlzIHdpbGwgY2xlYXIgYWxsIGFjY3VtdWxhdGVkIGhvdXNlIHBvaW50cyBmb3IgdGhpcyBjYXJuaXZhbC4nLCAnUmVzZXQnKSkgcmV0dXJuOwogIGF3YWl0IGNSZWYoJ2hvdXNlUG9pbnRzJykucmVtb3ZlKCk7CiAgdG9hc3QoJ0hvdXNlIHBvaW50cyByZXNldCcpOwp9CmFzeW5jIGZ1bmN0aW9uIGFkbWluQXJtKCkgewogIGlmICghYXdhaXQgX2NvbmZpcm1Nb2RhbCgnQXJtIHRoaXMgcmFjZT8nLCAnQWxsIGNvbm5lY3RlZCB0aW1lcnMgYW5kIHRoZSBTdGFydGVyIHdpbGwgYmUgbm90aWZpZWQuJywgJ0FSTSBSQUNFIOKGkicpKSByZXR1cm47CiAgY29uc3QgYWdlICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tYWdlLXNlbCcpLnZhbHVlOwogIGNvbnN0IGV2ZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkbWluLWV2ZW50LXNlbCcpLnZhbHVlOwogIGNvbnN0IGxhbmVzID0ge307CiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkbWluLWxhbmUtbmFtZS1pbnB1dCcpLmZvckVhY2goaW5wPT57CiAgICBjb25zdCBuID0gaW5wLmRhdGFzZXQubGFuZTsKICAgIGNvbnN0IHYgPSBpbnAudmFsdWUudHJpbSgpOwogICAgaWYgKCF2KSByZXR1cm47CiAgICBjb25zdCBob3VzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5hZG1pbi1sYW5lLWhvdXNlW2RhdGEtbGFuZT0iJHtufSJdYCk/LnZhbHVlfHwnJzsKICAgIGNvbnN0IHN0YXR1cyA9IGRuc1NldC5oYXMobikgPyAnZG5zJyA6IGRuZlNldC5oYXMobikgPyAnZG5mJyA6ICcnOwogICAgbGFuZXNbbl0gPSB7IG5hbWU6diwgLi4uKGhvdXNlP3tob3VzZX06e30pLCAuLi4oc3RhdHVzP3tzdGF0dXN9Ont9KSB9OwogIH0pOwogIGRuc1NldC5jbGVhcigpOyBkbmZTZXQuY2xlYXIoKTsKICAvLyBQZXJzaXN0IGxhbmUgbmFtZXMgZm9yIHRoaXMgYWdlL2dlbmRlci9ldmVudAogIF9zYXZlTGFuZU5hbWVzKGFnZSwgYWRtaW5HZW5kZXIsIGV2ZW50LCBsYW5lcyk7CiAgYXdhaXQgY1JlZigncmFjZS9jdXJyZW50Jykuc2V0KHsKICAgIHJhY2VJZDogZ2VuSWQoNiksIGFnZSwgZ2VuZGVyOmFkbWluR2VuZGVyLCBldmVudCwKICAgIHN0YXRlOidhcm1lZCcsIGxhbmVzLCBzcGxpdHM6e30sCiAgICBhcm1lZEF0OiBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAKICB9KTsKICB0b2FzdCgnUmFjZSBhcm1lZCcpOwp9Cgphc3luYyBmdW5jdGlvbiBhZG1pbkdvKCkgewogIGlmICghcmFjZVN0YXRlIHx8IHJhY2VTdGF0ZS5zdGF0ZSE9PSdhcm1lZCcpIHJldHVybjsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tZ28tYnRuJykuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpOwogIHNob3dDb3VudGRvd24oYXN5bmMgKCk9PnsKICAgIGF3YWl0IGNSZWYoJ3JhY2UvY3VycmVudCcpLnVwZGF0ZSh7IHN0YXRlOidsaXZlJywgc3RhcnRlZEF0U2VydmVyOmZpcmViYXNlLmRhdGFiYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUCB9KTsKICB9KTsKfQoKYXN5bmMgZnVuY3Rpb24gYWRtaW5SZWNhbGwoKSB7CiAgYXdhaXQgY1JlZigncmFjZS9jdXJyZW50JykudXBkYXRlKHsgc3RhdGU6J2FybWVkJywgc3RhcnRlZEF0U2VydmVyOm51bGwgfSk7CiAgYnJvYWRjYXN0UmVjYWxsKCk7Cn0KCmZ1bmN0aW9uIGJyb2FkY2FzdFJlY2FsbCgpIHsKICBjUmVmKCdyZWNhbGwnKS5zZXQoeyBhY3RpdmU6dHJ1ZSwgYXQ6ZmlyZWJhc2UuZGF0YWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QIH0pOwogIHNldFRpbWVvdXQoKCk9PmNSZWYoJ3JlY2FsbCcpLnNldCh7YWN0aXZlOmZhbHNlfSksIDI1MDApOwogIGZsYXNoUmVjYWxsKCk7Cn0KCmFzeW5jIGZ1bmN0aW9uIGFkbWluQ2xlYXIoKSB7CiAgbW9kYWwoJ0NsZWFyIFNwbGl0cycsJ1JlbW92ZSBhbGwgdGltZXIgc3BsaXRzIGZvciB0aGlzIHJhY2U/JyxbCiAgICB7IGxhYmVsOidDbGVhcicsIGNsczonYnRuLWRhbmdlcicsIGZuOiBhc3luYyAoKT0+ewogICAgICBhd2FpdCBjUmVmKCdyYWNlL2N1cnJlbnQvc3BsaXRzJykuc2V0KHt9KTsKICAgICAgdG9hc3QoJ1NwbGl0cyBjbGVhcmVkJyk7CiAgICB9fSwKICAgIHsgbGFiZWw6J0NhbmNlbCcgfQogIF0pOwp9Cgphc3luYyBmdW5jdGlvbiBhZG1pbkFiYW5kb24oKSB7CiAgbW9kYWwoJ0FiYW5kb24gUmFjZScsJ1JldHVybiB0byBzZXR1cCBhbmQgZGlzY2FyZCB0aGlzIHJhY2U/JyxbCiAgICB7IGxhYmVsOidBYmFuZG9uJywgY2xzOididG4tZGFuZ2VyJywgZm46IGFzeW5jICgpPT57CiAgICAgIGF3YWl0IGNSZWYoJ3JhY2UvY3VycmVudCcpLnNldCh7c3RhdGU6J2lkbGUnfSk7CiAgICB9fSwKICAgIHsgbGFiZWw6J0NhbmNlbCcgfQogIF0pOwp9Cgphc3luYyBmdW5jdGlvbiBhZG1pblB1Ymxpc2goKSB7CiAgaWYgKCFyYWNlU3RhdGUpIHJldHVybjsKICAvLyBIZWF0IHBpY2tlcgogIF9wcm9tcHRIZWF0KGFzeW5jIChoZWF0U3VmZml4KSA9PiB7CiAgICBjb25zdCBsYW5lcyAgPSByYWNlU3RhdGUubGFuZXN8fHt9OwogICAgY29uc3Qgc3BsaXRzID0gcmFjZVN0YXRlLnNwbGl0c3x8e307CiAgICBjb25zdCByZXN1bHRzID0gW107CiAgICBsZXQgcGxhY2UgPSAxOwogICAgLy8gQnVpbGQgc29ydGVkIG5vbi1EUSBmaXJzdCB0byBhc3NpZ24gcGxhY2VzCiAgICBjb25zdCBhbGxSb3dzID0gW107CiAgICBPYmplY3Qua2V5cyhsYW5lcykuZm9yRWFjaChsYW5lPT57CiAgICAgIGNvbnN0IGxhbmVEYXRhID0gbGFuZXNbbGFuZV07CiAgICAgIGNvbnN0IHN0YXR1cyA9IGxhbmVEYXRhPy5zdGF0dXM7CiAgICAgIGNvbnN0IGhvdXNlICA9IGxhbmVEYXRhPy5ob3VzZXx8Jyc7CiAgICAgIGlmIChzdGF0dXMgPT09ICdkbnMnIHx8IHN0YXR1cyA9PT0gJ2RuZicpIHsKICAgICAgICBhbGxSb3dzLnB1c2goeyBsYW5lOnBhcnNlSW50KGxhbmUpLCBuYW1lOmxhbmVEYXRhPy5uYW1lfHxgTGFuZSAke2xhbmV9YCwKICAgICAgICAgIHRpbWVNczpudWxsLCBkcTpmYWxzZSwgc3RhdHVzLCBob3VzZSB9KTsKICAgICAgICByZXR1cm47CiAgICAgIH0KICAgICAgY29uc3QgdmFscyA9IE9iamVjdC52YWx1ZXMoc3BsaXRzW2xhbmVdfHx7fSkubWFwKHM9PnMuZWxhcHNlZE1zKS5maWx0ZXIoQm9vbGVhbik7CiAgICAgIGNvbnN0IG1lYW4gPSB2YWxzLmxlbmd0aCA/IHRyaW1tZWRNZWFuKHZhbHMpIDogbnVsbDsKICAgICAgaWYgKG1lYW4hPW51bGwpIGFsbFJvd3MucHVzaCh7IGxhbmU6cGFyc2VJbnQobGFuZSksIG5hbWU6bGFuZURhdGE/Lm5hbWV8fGBMYW5lICR7bGFuZX1gLAogICAgICAgIHRpbWVNczptZWFuLCBkcTogZHFTZXQuaGFzKFN0cmluZyhsYW5lKSksIGhvdXNlLCBzdGF0dXM6JycgfSk7CiAgICB9KTsKICAgIGFsbFJvd3Muc29ydCgoYSxiKT0+IHsKICAgICAgY29uc3Qgb3JkID0gciA9PiByLnN0YXR1cz09PSdkbnMnID8gNCA6IHIuc3RhdHVzPT09J2RuZicgPyAzIDogci5kcSA/IDIgOiAwOwogICAgICBpZiAob3JkKGEpICE9PSBvcmQoYikpIHJldHVybiBvcmQoYSkgLSBvcmQoYik7CiAgICAgIHJldHVybiAoYS50aW1lTXN8fDApIC0gKGIudGltZU1zfHwwKTsKICAgIH0pOwogICAgY29uc3QgUFRTID0gWzgsNiw1LDQsMywyLDFdOwogICAgY29uc3QgaG91c2VEZWx0YXMgPSB7fTsKICAgIGFsbFJvd3MuZm9yRWFjaChyID0+IHsKICAgICAgaWYgKCFyLmRxICYmICFyLnN0YXR1cykgewogICAgICAgIHIucGxhY2UgPSBwbGFjZSsrOwogICAgICAgIGlmIChyLmhvdXNlKSBob3VzZURlbHRhc1tyLmhvdXNlXSA9IChob3VzZURlbHRhc1tyLmhvdXNlXXx8MCkgKyAoUFRTW3IucGxhY2UtMV18fDApOwogICAgICB9CiAgICB9KTsKICAgIGNvbnN0IGV2ZW50TmFtZSA9IHJhY2VTdGF0ZS5ldmVudCArIGhlYXRTdWZmaXg7CiAgICBjb25zdCBrZXkgPSBmYkVuYyhgJHtyYWNlU3RhdGUuYWdlfS0ke3JhY2VTdGF0ZS5nZW5kZXJ9LSR7ZXZlbnROYW1lfS0ke3JhY2VTdGF0ZS5yYWNlSWR9YCk7CiAgICBhd2FpdCBjUmVmKGByZXN1bHRzLyR7a2V5fWApLnNldCh7CiAgICAgIHR5cGU6J2xhbmUnLCBhZ2U6cmFjZVN0YXRlLmFnZSwgZ2VuZGVyOnJhY2VTdGF0ZS5nZW5kZXIsIGV2ZW50OmV2ZW50TmFtZSwKICAgICAgcmFjZUlkOnJhY2VTdGF0ZS5yYWNlSWQsIHJlc3VsdHM6YWxsUm93cywKICAgICAgcHVibGlzaGVkQXQ6ZmlyZWJhc2UuZGF0YWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QCiAgICB9KTsKICAgIC8vIEFjY3VtdWxhdGUgaG91c2UgcG9pbnRzCiAgICBpZiAoT2JqZWN0LmtleXMoaG91c2VEZWx0YXMpLmxlbmd0aCkgewogICAgICBjb25zdCBocFJlZiA9IGNSZWYoJ2hvdXNlUG9pbnRzJyk7CiAgICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBocFJlZi5vbmNlKCd2YWx1ZScpOwogICAgICBjb25zdCBleGlzdGluZyA9IHNuYXAudmFsKCl8fHt9OwogICAgICBjb25zdCBtZXJnZWQgPSB7Li4uZXhpc3Rpbmd9OwogICAgICBPYmplY3QuZW50cmllcyhob3VzZURlbHRhcykuZm9yRWFjaCgoW2gscHRzXSkgPT4geyBtZXJnZWRbaF0gPSAobWVyZ2VkW2hdfHwwKSArIHB0czsgfSk7CiAgICAgIGF3YWl0IGhwUmVmLnNldChtZXJnZWQpOwogICAgfQogICAgYXdhaXQgY1JlZigncmFjZS9jdXJyZW50JykudXBkYXRlKHtzdGF0ZTonZG9uZSd9KTsKICAgIGRxU2V0LmNsZWFyKCk7CiAgICB0b2FzdCgnPHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJjdXJyZW50Q29sb3IiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBhcmlhLWhpZGRlbj0idHJ1ZSIgc3R5bGU9InZlcnRpY2FsLWFsaWduOm1pZGRsZSI+PHJlY3QgeD0iOCIgeT0iMiIgd2lkdGg9IjgiIGhlaWdodD0iNCIgcng9IjEiIHJ5PSIxIi8+PHBhdGggZD0iTTE2IDRoMmEyIDIgMCAwIDEgMiAydjE0YTIgMiAwIDAgMS0yIDJINmEyIDIgMCAwIDEtMi0yVjZhMiAyIDAgMCAxIDItMmgyIi8+PC9zdmc+IFJlc3VsdHMgcHVibGlzaGVkIScpOwogIH0pOwp9CgpmdW5jdGlvbiBfcHJvbXB0SGVhdChjYWxsYmFjaykgewogIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgZWwuaWQgPSAnaGVhdC1tb2RhbCc7CiAgZWwuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDtpbnNldDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNjUpO3otaW5kZXg6OTk5OTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzoxNnB4JzsKICBlbC5pbm5lckhUTUwgPSBgCiAgICA8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpO2JvcmRlci1yYWRpdXM6MTZweDtwYWRkaW5nOjIwcHg7bWF4LXdpZHRoOjMwMHB4O3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXIiPgogICAgICA8ZGl2IHN0eWxlPSJmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjFyZW07bWFyZ2luLWJvdHRvbTo0cHgiPkhlYXQgLyBSb3VuZDwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjp2YXIoLS1tdXRlZCk7Zm9udC1zaXplOi44MnJlbTttYXJnaW4tYm90dG9tOjE0cHgiPkxhYmVsIHRoaXMgcmVzdWx0IChvcHRpb25hbCk8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpncmlkO2dyaWQtdGVtcGxhdGUtY29sdW1uczoxZnIgMWZyO2dhcDo4cHg7bWFyZ2luLWJvdHRvbTo4cHgiPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJfaGVhdFBpY2soJyDigJQgSGVhdCAxJykiPkhlYXQgMTwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJfaGVhdFBpY2soJyDigJQgSGVhdCAyJykiPkhlYXQgMjwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJfaGVhdFBpY2soJyDigJQgSGVhdCAzJykiPkhlYXQgMzwvYnV0dG9uPgogICAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBvbmNsaWNrPSJfaGVhdFBpY2soJyDigJQgRmluYWwnKSI+RmluYWw8L2J1dHRvbj4KICAgICAgPC9kaXY+CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgc3R5bGU9IndpZHRoOjEwMCUiIG9uY2xpY2s9Il9oZWF0UGljaygnJykiPk5vIGxhYmVsIOKAlCBwdWJsaXNoIGFzLWlzPC9idXR0b24+CiAgICA8L2Rpdj5gOwogIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpOwogIHdpbmRvdy5faGVhdFBpY2sgPSAoc3VmZml4KSA9PiB7IGVsLnJlbW92ZSgpOyBkZWxldGUgd2luZG93Ll9oZWF0UGljazsgY2FsbGJhY2soc3VmZml4KTsgfTsKfQoKYXN5bmMgZnVuY3Rpb24gYWRtaW5FZGl0VGltZShpZHgpIHsKICAvLyBMb2FkIGN1cnJlbnQgcHVibGlzaGVkIHJlc3VsdHMgZm9yIHRoaXMgcmFjZSBhbmQgbGV0IGFkbWluIGNvcnJlY3QgYSBzaW5nbGUgdGltZS4KICBjb25zdCByYWNlSWQgPSByYWNlU3RhdGUgJiYgcmFjZVN0YXRlLnJhY2VJZDsKICBpZiAoIXJhY2VJZCkgeyB0b2FzdCgnTm8gcmFjZSBsb2FkZWQnKTsgcmV0dXJuOyB9CiAgY29uc3Qga2V5ID0gZmJFbmMoYCR7cmFjZVN0YXRlLmFnZX0tJHtyYWNlU3RhdGUuZ2VuZGVyfS0ke3JhY2VTdGF0ZS5ldmVudH0tJHtyYWNlU3RhdGUucmFjZUlkfWApOwogIGNvbnN0IHNuYXAgPSBhd2FpdCBjUmVmKGByZXN1bHRzLyR7a2V5fWApLm9uY2UoJ3ZhbHVlJyk7CiAgY29uc3QgcHViID0gc25hcC52YWwoKTsKICBpZiAoIXB1YiB8fCAhQXJyYXkuaXNBcnJheShwdWIucmVzdWx0cykgfHwgIXB1Yi5yZXN1bHRzW2lkeF0pIHsgdG9hc3QoJ0Nhbm5vdCBlZGl0OiByZXN1bHQgbm90IGZvdW5kJyk7IHJldHVybjsgfQogIGNvbnN0IHJvdyA9IHB1Yi5yZXN1bHRzW2lkeF07CiAgY29uc3QgY3VycmVudFNlYyA9IChyb3cudGltZU1zLzEwMDApLnRvRml4ZWQoMik7CiAgY29uc3QgbmV3U3RyID0gcHJvbXB0KGBFZGl0IHRpbWUgZm9yICR7cm93Lm5hbWV8fCdMYW5lICcrcm93LmxhbmV9IChzZWNvbmRzLCBlLmcuIDE0LjgyKTpgLCBjdXJyZW50U2VjKTsKICBpZiAobmV3U3RyPT09bnVsbCkgcmV0dXJuOwogIGNvbnN0IG5ld1NlYyA9IHBhcnNlRmxvYXQobmV3U3RyKTsKICBpZiAoIWlzRmluaXRlKG5ld1NlYykgfHwgbmV3U2VjPD0wKSB7IHRvYXN0KCdJbnZhbGlkIHRpbWUnKTsgcmV0dXJuOyB9CiAgcHViLnJlc3VsdHNbaWR4XS50aW1lTXMgPSBNYXRoLnJvdW5kKG5ld1NlYyoxMDAwKTsKICBwdWIucmVzdWx0c1tpZHhdLmVkaXRlZCA9IHRydWU7CiAgcHViLnJlc3VsdHNbaWR4XS5lZGl0ZWRBdCA9IERhdGUubm93KCk7CiAgLy8gUmUtc29ydCArIHJlLXBsYWNlCiAgcHViLnJlc3VsdHMuc29ydCgoYSxiKT0+YS50aW1lTXMtYi50aW1lTXMpOwogIHB1Yi5yZXN1bHRzLmZvckVhY2goKHIsaSk9PnIucGxhY2U9aSsxKTsKICBwdWIuZWRpdGVkQXQgPSBmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVA7CiAgYXdhaXQgY1JlZihgcmVzdWx0cy8ke2tleX1gKS5zZXQocHViKTsKICB0b2FzdCgnVGltZSB1cGRhdGVkJyk7Cn0KCmZ1bmN0aW9uIGFkbWluTmV3UmFjZSgpIHsKICBkcVNldC5jbGVhcigpOwogIGNSZWYoJ3JhY2UvY3VycmVudCcpLnNldCh7c3RhdGU6J2lkbGUnfSk7CiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmFkbWluLWxhbmUtbmFtZS1pbnB1dCcpLmZvckVhY2goaW5wPT5pbnAudmFsdWU9JycpOwogIC8vIFRyeSB0byByZWxvYWQgc2F2ZWQgbmFtZXMgZm9yIGN1cnJlbnQgc2VsZWN0aW9uCiAgY29uc3QgYWdlICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tYWdlLXNlbCcpPy52YWx1ZTsKICBjb25zdCBldmVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1ldmVudC1zZWwnKT8udmFsdWU7CiAgaWYgKGFnZSAmJiBldmVudCkgX2xvYWRMYW5lTmFtZXMoYWdlLCBhZG1pbkdlbmRlciwgZXZlbnQpOwp9Cgphc3luYyBmdW5jdGlvbiBhZG1pblB1Ymxpc2hGcm9tRG9uZSgpIHsKICBpZiAoIXJhY2VTdGF0ZSB8fCByYWNlU3RhdGUuc3RhdGUgIT09ICdkb25lJykgcmV0dXJuOwogIGNvbnN0IGJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1kb25lLXB1Ymxpc2gtYnRuJyk7CiAgaWYgKGJ0bikgeyBidG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpOyBidG4udGV4dENvbnRlbnQgPSAnUHVibGlzaGluZ+KApic7IH0KICBhd2FpdCBhZG1pblB1Ymxpc2goKTsKICBpZiAoYnRuKSB7IGJ0bi5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7IGJ0bi50ZXh0Q29udGVudCA9ICdQdWJsaXNoIFJlc3VsdHMnOyB9Cn0KCmZ1bmN0aW9uIHJlbmRlckFkbWluRG9uZShyYWNlKSB7CiAgY29uc3Qgc3BsaXRzID0gcmFjZS5zcGxpdHN8fHt9OwogIGNvbnN0IGxhbmVzICA9IHJhY2UubGFuZXN8fHt9OwogIGNvbnN0IHJlc3VsdHMgPSBbXTsKICBPYmplY3Qua2V5cyhsYW5lcykuZm9yRWFjaChsYW5lPT57CiAgICBjb25zdCBsYW5lRGF0YSA9IGxhbmVzW2xhbmVdOwogICAgY29uc3Qgc3RhdHVzID0gbGFuZURhdGE/LnN0YXR1czsKICAgIGlmIChzdGF0dXMgPT09ICdkbnMnIHx8IHN0YXR1cyA9PT0gJ2RuZicpIHsKICAgICAgcmVzdWx0cy5wdXNoKHsgbGFuZSwgbmFtZTpsYW5lRGF0YT8ubmFtZSwgdGltZU1zOm51bGwsIHN0YXR1cyB9KTsKICAgICAgcmV0dXJuOwogICAgfQogICAgY29uc3QgdmFscyA9IE9iamVjdC52YWx1ZXMoc3BsaXRzW2xhbmVdfHx7fSkubWFwKHM9PnMuZWxhcHNlZE1zKS5maWx0ZXIoQm9vbGVhbik7CiAgICBjb25zdCBtZWFuID0gdmFscy5sZW5ndGggPyB0cmltbWVkTWVhbih2YWxzKSA6IG51bGw7CiAgICBpZiAobWVhbikgcmVzdWx0cy5wdXNoKHsgbGFuZSwgbmFtZTpsYW5lRGF0YT8ubmFtZSwgdGltZU1zOm1lYW4sIHN0YXR1czonJyB9KTsKICB9KTsKICByZXN1bHRzLnNvcnQoKGEsYik9PnsKICAgIGNvbnN0IG9yZCA9IHIgPT4gci5zdGF0dXM9PT0nZG5zJyA/IDQgOiByLnN0YXR1cz09PSdkbmYnID8gMyA6IDA7CiAgICBpZiAob3JkKGEpIT09b3JkKGIpKSByZXR1cm4gb3JkKGEpLW9yZChiKTsKICAgIHJldHVybiAoYS50aW1lTXN8fDApLShiLnRpbWVNc3x8MCk7CiAgfSk7CiAgLy8gUmUtbnVtYmVyIG5vbi1EUSBwbGFjZXMKICBsZXQgcGxhY2UgPSAxOwogIGNvbnN0IHBsYWNlZCA9IHJlc3VsdHMubWFwKHIgPT4gewogICAgY29uc3QgaXNEUSA9IGRxU2V0LmhhcyhTdHJpbmcoci5sYW5lKSk7CiAgICBjb25zdCBpc1NwZWMgPSBpc0RRIHx8IHIuc3RhdHVzPT09J2RucycgfHwgci5zdGF0dXM9PT0nZG5mJzsKICAgIHJldHVybiB7IC4uLnIsIGlzRFEsIHBsYWNlOiBpc1NwZWMgPyBudWxsIDogcGxhY2UrKyB9OwogIH0pOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1yZXN1bHRzLWxpc3QnKS5pbm5lckhUTUwgPSBwbGFjZWQubWFwKChyLGkpPT5gCiAgICA8ZGl2IGNsYXNzPSJsYW5lLXJvdyIgc3R5bGU9Im9wYWNpdHk6JHtyLmlzRFE/MC40NToxfTt0cmFuc2l0aW9uOm9wYWNpdHkgLjE1cyI+CiAgICAgIDxkaXYgY2xhc3M9Im1lZGFsICR7ci5pc0RRPydwTic6ci5zdGF0dXM9PT0nZG5zJz8ncE4nOnIuc3RhdHVzPT09J2RuZic/J3BOJzptZWRhbENscyhyLnBsYWNlKX0iIHN0eWxlPSIke3IuaXNEUT8nYmFja2dyb3VuZDp2YXIoLS13YXJuKTtjb2xvcjojZmZmJzpyLnN0YXR1cz8nYmFja2dyb3VuZDp2YXIoLS1tdXRlZCk7Y29sb3I6I2ZmZic6Jyd9Ij4ke3IuaXNEUT8nRFEnOnIuc3RhdHVzP3Iuc3RhdHVzLnRvVXBwZXJDYXNlKCk6KHIucGxhY2UpfTwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJsYW5lLW5hbWUiIG9uY2xpY2s9IiR7IXIuc3RhdHVzP2BhZG1pbkVkaXRUaW1lKCR7aX0pYDonJ30iIHN0eWxlPSJmbGV4OjE7JHshci5zdGF0dXM/J2N1cnNvcjpwb2ludGVyJzonJ30iICR7IXIuc3RhdHVzPyd0aXRsZT0iVGFwIHRvIGVkaXQgdGltZSInOicnfT4ke3IubmFtZXx8YExhbmUgJHtyLmxhbmV9YH0ke3IuaXNEUT8nPHNwYW4gc3R5bGU9ImZvbnQtc2l6ZTouN3JlbTtjb2xvcjp2YXIoLS13YXJuKTttYXJnaW4tbGVmdDo2cHgiPkRRPC9zcGFuPic6ci5zdGF0dXM/YDxzcGFuIHN0eWxlPSJmb250LXNpemU6LjdyZW07Y29sb3I6dmFyKC0tbXV0ZWQpO21hcmdpbi1sZWZ0OjZweCI+JHtyLnN0YXR1cy50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5gOicnfTwvZGl2PgogICAgICA8ZGl2IGNsYXNzPSJsYW5lLXRpbWUgZm9udC1tb25vIiBvbmNsaWNrPSJhZG1pbkVkaXRUaW1lKCR7aX0pIiBzdHlsZT0iY3Vyc29yOnBvaW50ZXIiPiR7ci5pc0RRPyfigJQnOmZtdFNlYyhyLnRpbWVNcyl9PC9kaXY+CiAgICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc20iIHN0eWxlPSJtYXJnaW4tbGVmdDo2cHg7cGFkZGluZzoycHggOHB4O2ZvbnQtc2l6ZTouN3JlbTtib3JkZXI6MXB4IHNvbGlkICR7ci5pc0RRPyd2YXIoLS13YXJuKSc6J3ZhcigtLWJvcmRlciknfTtjb2xvcjoke3IuaXNEUT8ndmFyKC0td2FybiknOid2YXIoLS1tdXRlZCknfTtiYWNrZ3JvdW5kOnRyYW5zcGFyZW50O2JvcmRlci1yYWRpdXM6NnB4IiBvbmNsaWNrPSJhZG1pblRvZ2dsZURRKCcke3IubGFuZX0nKSI+JHtyLmlzRFE/J+KclSBEUSc6J0RRJ308L2J1dHRvbj4KICAgIDwvZGl2PmApLmpvaW4oJycpIHx8ICc8ZGl2IGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQtc20iPk5vIHRpbWVkIGF0aGxldGVzPC9kaXY+JzsKfQoKZnVuY3Rpb24gYWRtaW5Ub2dnbGVEUShsYW5lKSB7CiAgY29uc3QgayA9IFN0cmluZyhsYW5lKTsKICBpZiAoZHFTZXQuaGFzKGspKSBkcVNldC5kZWxldGUoayk7IGVsc2UgZHFTZXQuYWRkKGspOwogIGlmIChyYWNlU3RhdGUpIHJlbmRlckFkbWluRG9uZShyYWNlU3RhdGUpOwp9CgpmdW5jdGlvbiBtZWRhbENscyhwKSB7IHJldHVybiBwPT09MT8ncDEnOnA9PT0yPydwMic6cD09PTM/J3AzJzoncE4nOyB9CgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKLy8gU1RBUlRFUiBWSUVXCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyDilIDilIAgU3RhcnRlciBhdWRpbyBzdGF0ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKbGV0IHN0YXJ0ZXJBdWRpb0N0eCAgICA9IG51bGw7CmxldCBzdGFydGVyQW5hbHlzZXIgICAgPSBudWxsOwpsZXQgc3RhcnRlck1pY1N0cmVhbSAgID0gbnVsbDsKbGV0IHN0YXJ0ZXJMaXN0ZW5pbmcgICA9IGZhbHNlOwpsZXQgc3RhcnRlck5vaXNlRmxvb3IgID0gMDsKbGV0IHN0YXJ0ZXJOb2lzZUNvdW50ICA9IDA7CmxldCBzdGFydGVyU2Vuc2l0aXZpdHkgPSAnbWVkJzsKbGV0IHN0YXJ0ZXJMaXN0ZW5SYWZJZCA9IG51bGw7CmNvbnN0IFNUQVJURVJfU0VOU19NVUxUID0geyBoaWdoOjMsIG1lZDo1LCBsb3c6OSB9OwoKZnVuY3Rpb24gaW5pdFN0YXJ0ZXJWaWV3KCkgewogIHdhdGNoQ29ubignc3RhcnRlci1kb3QnKTsKICBjb25zdCByYWNlUmVmID0gY1JlZigncmFjZS9jdXJyZW50Jyk7CiAgcmFjZVJlZi5vbigndmFsdWUnLCBzbmFwPT57CiAgICBjb25zdCByYWNlID0gc25hcC52YWwoKTsKICAgIGNvbnN0IHcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRlci13YWl0aW5nJyk7CiAgICBjb25zdCBhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0ZXItYXJtZWQnKTsKICAgIGlmICghcmFjZSB8fCByYWNlLnN0YXRlPT09J2lkbGUnKSB7CiAgICAgIHcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7IGEuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgICAgIHN0YXJ0ZXJMaXN0ZW5TdG9wKCk7IHJldHVybjsKICAgIH0KICAgIGlmIChyYWNlLnN0YXRlPT09J2FybWVkJykgewogICAgICB3LmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyBhLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRlci1yYWNlLWluZm8nKS50ZXh0Q29udGVudCA9CiAgICAgICAgYCR7cmFjZS5hZ2V9ICR7cmFjZS5nZW5kZXJ9IMK3ICR7cmFjZS5ldmVudH1gOwogICAgfSBlbHNlIHsKICAgICAgdy5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsgYS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICAgICAgc3RhcnRlckxpc3RlblN0b3AoKTsKICAgIH0KICB9KTsKICBhY3RpdmVMaXN0ZW5lcnMucHVzaCgoKT0+cmFjZVJlZi5vZmYoKSk7Cn0KCi8vIOKUgOKUgCBNYW51YWwgR08gKHdpdGggY291bnRkb3duKSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKZnVuY3Rpb24gc3RhcnRlckdvKCkgewogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydGVyLWdvLWJ0bicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTsKICBzaG93Q291bnRkb3duKGFzeW5jICgpPT57CiAgICBhd2FpdCBjUmVmKCdyYWNlL2N1cnJlbnQnKS51cGRhdGUoeyBzdGF0ZTonbGl2ZScsIHN0YXJ0ZWRBdFNlcnZlcjpmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAgfSk7CiAgfSk7Cn0KZnVuY3Rpb24gc3RhcnRlclJlY2FsbCgpIHsgc3RhcnRlckxpc3RlblN0b3AoKTsgYnJvYWRjYXN0UmVjYWxsKCk7IH0KCi8vIOKUgOKUgCBHdW4gZGV0ZWN0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApmdW5jdGlvbiBzdGFydGVyU2V0U2VucyhzKSB7CiAgc3RhcnRlclNlbnNpdGl2aXR5ID0gczsKICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1zZW5zXScpLmZvckVhY2goYiA9PiB7CiAgICBjb25zdCBhY3RpdmUgPSBiLmRhdGFzZXQuc2VucyA9PT0gczsKICAgIGIuY2xhc3NOYW1lID0gYWN0aXZlID8gJ2J0biBidG4tcHJpbWFyeScgOiAnYnRuIGJ0bi1zZWNvbmRhcnknOwogICAgYi5zdHlsZS5mb250U2l6ZSA9ICcwLjc1cmVtJzsgYi5zdHlsZS5wYWRkaW5nID0gJzRweCAxMHB4JzsKICB9KTsKfQoKYXN5bmMgZnVuY3Rpb24gc3RhcnRlckxpc3RlblN0YXJ0KCkgewogIHRyeSB7CiAgICBzdGFydGVyTWljU3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe2F1ZGlvOnRydWUsIHZpZGVvOmZhbHNlfSk7CiAgICBzdGFydGVyQXVkaW9DdHggID0gbmV3ICh3aW5kb3cuQXVkaW9Db250ZXh0fHx3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpOwogICAgY29uc3Qgc291cmNlID0gc3RhcnRlckF1ZGlvQ3R4LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHN0YXJ0ZXJNaWNTdHJlYW0pOwogICAgc3RhcnRlckFuYWx5c2VyICA9IHN0YXJ0ZXJBdWRpb0N0eC5jcmVhdGVBbmFseXNlcigpOwogICAgc3RhcnRlckFuYWx5c2VyLmZmdFNpemUgPSAyNTY7CiAgICBzb3VyY2UuY29ubmVjdChzdGFydGVyQW5hbHlzZXIpOwogICAgc3RhcnRlckxpc3RlbmluZyAgPSB0cnVlOwogICAgc3RhcnRlck5vaXNlRmxvb3IgPSAwOwogICAgc3RhcnRlck5vaXNlQ291bnQgPSAwOwogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0ZXItbGlzdGVuLWlkbGUnKS5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydGVyLWxpc3Rlbi1hY3RpdmUnKS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydGVyLWNhbC1sYmwnKS50ZXh0Q29udGVudCA9ICdDYWxpYnJhdGluZ+KApic7CiAgICBzdGFydGVyTGlzdGVuUmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc3RhcnRlckxpc3Rlbkxvb3ApOwogIH0gY2F0Y2goZSkgewogICAgdG9hc3QoJ01pY3JvcGhvbmUgYWNjZXNzIGRlbmllZCcpOwogIH0KfQoKZnVuY3Rpb24gc3RhcnRlckxpc3RlblN0b3AoKSB7CiAgc3RhcnRlckxpc3RlbmluZyA9IGZhbHNlOwogIGlmIChzdGFydGVyTGlzdGVuUmFmSWQpIHsgY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3RhcnRlckxpc3RlblJhZklkKTsgc3RhcnRlckxpc3RlblJhZklkPW51bGw7IH0KICBpZiAoc3RhcnRlck1pY1N0cmVhbSkgICB7IHN0YXJ0ZXJNaWNTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCh0PT50LnN0b3AoKSk7IHN0YXJ0ZXJNaWNTdHJlYW09bnVsbDsgfQogIGlmIChzdGFydGVyQXVkaW9DdHgpICAgIHsgc3RhcnRlckF1ZGlvQ3R4LmNsb3NlKCkuY2F0Y2goKCk9Pnt9KTsgc3RhcnRlckF1ZGlvQ3R4PW51bGw7IH0KICBjb25zdCBpZGxlICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRlci1saXN0ZW4taWRsZScpOwogIGNvbnN0IGFjdGl2ZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydGVyLWxpc3Rlbi1hY3RpdmUnKTsKICBjb25zdCBiYXIgICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRlci12b2wtYmFyJyk7CiAgaWYgKGlkbGUpICAgaWRsZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsKICBpZiAoYWN0aXZlKSBhY3RpdmUuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgaWYgKGJhcikgICAgYmFyLnN0eWxlLndpZHRoID0gJzAlJzsKfQoKZnVuY3Rpb24gc3RhcnRlckxpc3Rlbkxvb3AoKSB7CiAgc3RhcnRlckxpc3RlblJhZklkID0gbnVsbDsKICBpZiAoIXN0YXJ0ZXJMaXN0ZW5pbmcgfHwgIXN0YXJ0ZXJBbmFseXNlcikgcmV0dXJuOwoKICBjb25zdCBkYXRhID0gbmV3IFVpbnQ4QXJyYXkoc3RhcnRlckFuYWx5c2VyLmZyZXF1ZW5jeUJpbkNvdW50KTsKICBzdGFydGVyQW5hbHlzZXIuZ2V0Qnl0ZVRpbWVEb21haW5EYXRhKGRhdGEpOwoKICAvLyBSTVMKICBsZXQgc3VtID0gMDsKICBmb3IgKGxldCBpPTA7IGk8ZGF0YS5sZW5ndGg7IGkrKykgeyBjb25zdCB2PShkYXRhW2ldLTEyOCkvMTI4OyBzdW0rPXYqdjsgfQogIGNvbnN0IHJtcyA9IE1hdGguc3FydChzdW0gLyBkYXRhLmxlbmd0aCk7CgogIC8vIFZvbHVtZSBiYXIgKDAtMTAwJSkKICBjb25zdCBiYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnRlci12b2wtYmFyJyk7CiAgaWYgKGJhcikgYmFyLnN0eWxlLndpZHRoID0gTWF0aC5taW4oMTAwLCBNYXRoLnJvdW5kKHJtcyo1MDApKSArICclJzsKCiAgaWYgKHN0YXJ0ZXJOb2lzZUNvdW50IDwgNDApIHsKICAgIC8vIEZpcnN0IH4wLjdzOiBjYWxpYnJhdGUgbm9pc2UgZmxvb3IKICAgIHN0YXJ0ZXJOb2lzZUZsb29yID0gKHN0YXJ0ZXJOb2lzZUZsb29yICogc3RhcnRlck5vaXNlQ291bnQgKyBybXMpIC8gKHN0YXJ0ZXJOb2lzZUNvdW50ICsgMSk7CiAgICBzdGFydGVyTm9pc2VDb3VudCsrOwogICAgaWYgKHN0YXJ0ZXJOb2lzZUNvdW50ID49IDQwKSB7CiAgICAgIGNvbnN0IGNhbExibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydGVyLWNhbC1sYmwnKTsKICAgICAgY29uc3QgbmZQY3QgID0gTWF0aC5yb3VuZChNYXRoLm1pbigxMDAsIHN0YXJ0ZXJOb2lzZUZsb29yICogMjAwMCkpOwogICAgICBpZiAoY2FsTGJsKSBjYWxMYmwudGV4dENvbnRlbnQgPSBgUmVhZHkgKG5vaXNlOiAke25mUGN0fSUpYDsKICAgIH0KICB9IGVsc2UgewogICAgY29uc3QgbXVsdCAgICAgID0gU1RBUlRFUl9TRU5TX01VTFRbc3RhcnRlclNlbnNpdGl2aXR5XSB8fCA1OwogICAgY29uc3QgdGhyZXNob2xkID0gTWF0aC5tYXgoMC4wNiwgc3RhcnRlck5vaXNlRmxvb3IgKiBtdWx0KTsKICAgIGlmIChybXMgPiB0aHJlc2hvbGQpIHsKICAgICAgLy8gR1VOIERFVEVDVEVEIOKAlCBzaG93IDEtc2Vjb25kIGNhbmNlbGxhYmxlIGNvdW50ZG93bgogICAgICBzdGFydGVyTGlzdGVuU3RvcCgpOwogICAgICBzdGFydGVyR3VuQ291bnRkb3duKCk7CiAgICAgIHJldHVybjsKICAgIH0KICB9CgogIHN0YXJ0ZXJMaXN0ZW5SYWZJZCA9IHJlcXVlc3RBbmltYXRpb25GcmFtZShzdGFydGVyTGlzdGVuTG9vcCk7Cn0KCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyBPQlNFUlZFUiBWSUVXIChMYW5lIFJhY2UpCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkApmdW5jdGlvbiByZW5kZXJPYnNlcnZlclJlc3VsdHMoZGF0YSkgewogIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29ic2VydmVyLXJlc3VsdHMtYm9hcmQnKTsKICBjb25zdCBsaXN0ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvYnNlcnZlci1yZXN1bHRzLWxpc3QnKTsKICBpZiAoIWJvYXJkIHx8ICFsaXN0KSByZXR1cm47CiAgaWYgKCFkYXRhIHx8ICFPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGgpIHsgYm9hcmQuc3R5bGUuZGlzcGxheT0nbm9uZSc7IHJldHVybjsgfQogIGJvYXJkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snOwoKICBjb25zdCBldmVudHMgPSBPYmplY3QudmFsdWVzKGRhdGEpLnNvcnQoKGEsYikgPT4gKGIucHVibGlzaGVkQXR8fDApIC0gKGEucHVibGlzaGVkQXR8fDApKTsKICBsaXN0LmlubmVySFRNTCA9IGV2ZW50cy5tYXAoZXYgPT4gewogICAgY29uc3QgaXNYQyA9IGV2LnR5cGUgPT09ICd4Yyc7CiAgICBjb25zdCBwbGFjZXMgPSBpc1hDID8gKGV2LnBsYWNlc3x8W10pIDogKGV2LnJlc3VsdHN8fFtdKTsKICAgIGNvbnN0IHJvd3MgPSBwbGFjZXMuc2xpY2UoMCw2KS5tYXAoKHIsaSkgPT4gewogICAgICBjb25zdCBpc0RRID0gIWlzWEMgJiYgci5kcTsKICAgICAgY29uc3QgcG9zICA9IGlzWEMgPyByLnBsYWNlIDogKGlzRFEgPyBudWxsIDogKGkrMSkpOwogICAgICBjb25zdCBuYW1lID0gci5uYW1lIHx8IChpc1hDID8gJycgOiBgTGFuZSAke3IubGFuZX1gKTsKICAgICAgY29uc3QgdGltZSA9IGZtdFNlYyhpc1hDID8gci5lbGFwc2VkTXMgOiByLnRpbWVNcyk7CiAgICAgIHJldHVybiBgPGRpdiBjbGFzcz0ibGFuZS1yb3ciIHN0eWxlPSJwYWRkaW5nOjZweCA0cHg7JHtpc0RRPydvcGFjaXR5Oi40NSc6Jyd9IiA+CiAgICAgICAgPGRpdiBjbGFzcz0ibWVkYWwgJHtpc0RRPydwTic6bWVkYWxDbHMocG9zKX0iIHN0eWxlPSJmb250LXNpemU6LjhyZW07JHtpc0RRPydiYWNrZ3JvdW5kOnZhcigtLXdhcm4pO2NvbG9yOiNmZmYnOicnfSI+JHtpc0RRPydEUSc6KHBvcyl9PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGFuZS1uYW1lIiBzdHlsZT0iZm9udC1zaXplOi45cmVtIj4ke25hbWV9PC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0ibGFuZS10aW1lIGZvbnQtbW9ubyIgc3R5bGU9ImZvbnQtc2l6ZTouOXJlbSI+JHtpc0RRPyfigJQnOnRpbWV9PC9kaXY+CiAgICAgIDwvZGl2PmA7CiAgICB9KS5qb2luKCcnKTsKICAgIHJldHVybiBgPGRpdiBjbGFzcz0iY2FyZCIgc3R5bGU9Im1hcmdpbi1ib3R0b206OHB4O3BhZGRpbmc6MTBweCAxMnB4Ij4KICAgICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOi43NXJlbTtmb250LXdlaWdodDo3MDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2xldHRlci1zcGFjaW5nOi4wNmVtO2NvbG9yOnZhcigtLW11dGVkKTttYXJnaW4tYm90dG9tOjZweCI+JHtldi5hZ2V8fCcnfSAke2V2LmdlbmRlcnx8Jyd9IMK3ICR7ZXYuZXZlbnR8fCcnfTwvZGl2PgogICAgICAke3Jvd3N9CiAgICA8L2Rpdj5gOwogIH0pLmpvaW4oJycpOwp9CgpmdW5jdGlvbiBpbml0T2JzZXJ2ZXJWaWV3KCkgewogIHdhdGNoQ29ubignb2JzZXJ2ZXItZG90Jyk7CiAgY29uc3QgcmFjZVJlZiA9IGNSZWYoJ3JhY2UvY3VycmVudCcpOwogIHJhY2VSZWYub24oJ3ZhbHVlJywgc25hcD0+eyByYWNlU3RhdGU9c25hcC52YWwoKTsgcmVuZGVyT2JzZXJ2ZXJWaWV3KHJhY2VTdGF0ZSk7IH0pOwogIGFjdGl2ZUxpc3RlbmVycy5wdXNoKCgpPT5yYWNlUmVmLm9mZigpKTsKCiAgLy8gUHVibGlzaGVkIHJlc3VsdHMgYm9hcmQKICBjb25zdCByZXNSZWYgPSBjUmVmKCdyZXN1bHRzJyk7CiAgcmVzUmVmLm9uKCd2YWx1ZScsIHNuYXAgPT4geyByZW5kZXJPYnNlcnZlclJlc3VsdHMoc25hcC52YWwoKSk7IH0pOwogIGFjdGl2ZUxpc3RlbmVycy5wdXNoKCgpPT5yZXNSZWYub2ZmKCkpOwoKICBmdW5jdGlvbiB0aWNrKCkgewogICAgaWYgKHJhY2VTdGF0ZT8uc3RhdGU9PT0nbGl2ZScgJiYgcmFjZVN0YXRlLnN0YXJ0ZWRBdFNlcnZlcikgewogICAgICBjb25zdCBlbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2JzZXJ2ZXItY2xvY2snKTsKICAgICAgaWYoZWwpIGVsLnRleHRDb250ZW50PWZtdE1zKG5vd1NlcnZlcigpLXJhY2VTdGF0ZS5zdGFydGVkQXRTZXJ2ZXIpOwogICAgfQogICAgcmFmSWQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spOwogIH0KICByYWZJZD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7Cn0KCmZ1bmN0aW9uIHJlbmRlck9ic2VydmVyVmlldyhyYWNlKSB7CiAgY29uc3Qgd2FpdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvYnNlcnZlci13YWl0aW5nJyk7CiAgY29uc3QgbGlzdCAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvYnNlcnZlci1sYW5lcy1saXN0Jyk7CiAgaWYgKCFyYWNlIHx8IHJhY2Uuc3RhdGU9PT0naWRsZScpIHsKICAgIHdhaXRpbmcuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7IGxpc3QuaW5uZXJIVE1MPScnOwogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29ic2VydmVyLWV2ZW50LWxibCcpLnRleHRDb250ZW50PScnOyByZXR1cm47CiAgfQogIHdhaXRpbmcuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29ic2VydmVyLWV2ZW50LWxibCcpLnRleHRDb250ZW50PQogICAgYCR7cmFjZS5hZ2V8fCcnfSAke3JhY2UuZ2VuZGVyfHwnJ30gwrcgJHtyYWNlLmV2ZW50fHwnJ31gOwoKICBjb25zdCBsYW5lcyAgPSByYWNlLmxhbmVzfHx7fTsKICBjb25zdCBzcGxpdHMgPSByYWNlLnNwbGl0c3x8e307CiAgY29uc3QgZGF0YSA9IE9iamVjdC5rZXlzKGxhbmVzKS5tYXAobj0+ewogICAgY29uc3QgdmFscyA9IE9iamVjdC52YWx1ZXMoc3BsaXRzW25dfHx7fSkubWFwKHM9PnMuZWxhcHNlZE1zKS5maWx0ZXIoQm9vbGVhbik7CiAgICBjb25zdCBtZWFuID0gdmFscy5sZW5ndGggPyB0cmltbWVkTWVhbih2YWxzKSA6IG51bGw7CiAgICBjb25zdCBjb25mID0gY29uZmlkZW5jZUZvcihzcGxpdHNbbl18fHt9KTsKICAgIHJldHVybiB7IG46cGFyc2VJbnQobiksIG5hbWU6bGFuZXNbbl0/Lm5hbWV8fGBMYW5lICR7bn1gLCBtZWFuLCBjb25mIH07CiAgfSk7CiAgY29uc3QgcmFua2VkID0gWy4uLmRhdGFdLmZpbHRlcihkPT5kLm1lYW4hPW51bGwpLnNvcnQoKGEsYik9PmEubWVhbi1iLm1lYW4pOwogIGNvbnN0IHJhbmtNYXA9e307CiAgcmFua2VkLmZvckVhY2goKGQsaSk9PnJhbmtNYXBbZC5uXT1pKzEpOwoKICBsaXN0LmlubmVySFRNTCA9IGRhdGEuc29ydCgoYSxiKT0+YS5uLWIubikubWFwKGQ9PnsKICAgIGNvbnN0IHBsYWNlID0gcmFua01hcFtkLm5dOwogICAgY29uc3QgbnVtU3R5bGUgPSBwbGFjZT09PTE/J2JhY2tncm91bmQ6I0ZGRDcwMDtjb2xvcjojMDAwJzpwbGFjZT09PTI/J2JhY2tncm91bmQ6I0MwQzBDMDtjb2xvcjojMDAwJzpwbGFjZT09PTM/J2JhY2tncm91bmQ6I0NEN0YzMjtjb2xvcjojZmZmJzonJzsKICAgIHJldHVybiBgPGRpdiBjbGFzcz0ibGFuZS1yb3ciPgogICAgICA8ZGl2IGNsYXNzPSJsYW5lLW51bSIgc3R5bGU9IiR7bnVtU3R5bGV9Ij4ke3BsYWNlfHxkLm59PC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImxhbmUtbmFtZSI+JHtkLm5hbWV9PC9kaXY+CiAgICAgICR7ZC5tZWFuCiAgICAgICAgPyBgPGRpdj48c3BhbiBjbGFzcz0ibGFuZS10aW1lIGZvbnQtbW9ubyI+JHtmbXRTZWMoZC5tZWFuKX08L3NwYW4+IDxzcGFuIGNsYXNzPSJjb25mLSR7ZC5jb25mLmNsc30iPiR7ZC5jb25mLmxhYmVsfTwvc3Bhbj48L2Rpdj5gCiAgICAgICAgOiBgPHNwYW4gY2xhc3M9InRleHQtbXV0ZWQgdGV4dC14cyI+JHtyYWNlLnN0YXRlPT09J2xpdmUnPyfigKYnOifigJQnfTwvc3Bhbj5gfQogICAgPC9kaXY+YDsKICB9KS5qb2luKCcnKTsKfQoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIENPVU5URE9XTgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKZnVuY3Rpb24gc2hvd0NvdW50ZG93bihvbkdvKSB7CiAgaWYgKGNvdW50ZG93blJ1bm5pbmcpIHJldHVybjsKICBjb3VudGRvd25SdW5uaW5nID0gdHJ1ZTsKICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZG93bi1vdmVybGF5Jyk7CiAgY29uc3QgbnVtRWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGRvd24tbnVtJyk7CiAgY29uc3QgbGJsRWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGRvd24tbGFiZWwnKTsKICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOwoKICBbCiAgICB7IG46JzMnLCBsOidHZXQgc2V04oCmJywgICAgICBkOjAgfSwKICAgIHsgbjonMicsIGw6J1JlYWR54oCmJywgICAgICAgIGQ6MTAwMCB9LAogICAgeyBuOicxJywgbDonT24geW91ciBtYXJrc+KApicsZDoyMDAwIH0sCiAgICB7IG46J0dPJyxsOicnLCAgICAgICAgICAgICAgZDozMDAwLCBnbzp0cnVlIH0KICBdLmZvckVhY2goKHtuLGwsZCxnb30pPT57CiAgICBzZXRUaW1lb3V0KCgpPT57CiAgICAgIG51bUVsLnRleHRDb250ZW50ID0gbjsKICAgICAgbnVtRWwuc3R5bGUuY29sb3IgPSBnbyA/ICd2YXIoLS1zdWNjZXNzKScgOiAndmFyKC0tdGV4dCknOwogICAgICBsYmxFbC50ZXh0Q29udGVudCA9IGw7CiAgICAgIHZpYnJhdGUoZ28gPyBbMjAwLDYwLDIwMF0gOiBbNDBdKTsKICAgICAgaWYgKGdvKSB7IGZsYXNoKCdnbycsNjAwKTsgb25HbyAmJiBvbkdvKCk7IH0KICAgIH0sIGQpOwogIH0pOwoKICBzZXRUaW1lb3V0KCgpPT57IG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7IGNvdW50ZG93blJ1bm5pbmc9ZmFsc2U7IH0sIDM5MDApOwp9CgpmdW5jdGlvbiBmbGFzaFJlY2FsbCgpIHsKICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZG93bi1vdmVybGF5Jyk7CiAgY29uc3QgbnVtRWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGRvd24tbnVtJyk7CiAgY29uc3QgbGJsRWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb3VudGRvd24tbGFiZWwnKTsKICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpOwogIG51bUVsLmlubmVySFRNTCA9ICc8c3BhbiBzdHlsZT0iZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MC44ZW07aGVpZ2h0OjAuOGVtO2JhY2tncm91bmQ6dmFyKC0tZGFuZ2VyKTtib3JkZXItcmFkaXVzOjUwJTt2ZXJ0aWNhbC1hbGlnbjptaWRkbGUiPjwvc3Bhbj4nOwogIG51bUVsLnN0eWxlLmNvbG9yICA9ICd2YXIoLS1kYW5nZXIpJzsKICBsYmxFbC50ZXh0Q29udGVudCAgPSAnRkFMU0UgU1RBUlQg4oCUIFJFQ0FMTCc7CiAgdmlicmF0ZShbMjAwLDgwLDIwMCw4MCwyMDBdKTsKICBmbGFzaCgncmVjYWxsJywgMTgwMCk7CiAgc2V0VGltZW91dCgoKT0+b3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSwgMjAwMCk7Cn0KCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyBDUk9TUyBDT1VOVFJZIOKAlCBNQVJTSEFMIFZJRVcKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCmxldCBiaWJQZW5kaW5nS2V5ICAgPSBudWxsOwpsZXQgYmliUGVuZGluZ1F1ZXVlID0gW107ICAgIC8vIFt7a2V5LCBwbGFjZSwgZWxhcHNlZH1dCmxldCBiaWJWYWx1ZSAgICAgICAgPSAnJzsKbGV0IHhjQ2FtU3RyZWFtICAgICA9IG51bGw7ICAvLyBhY3RpdmUgZ2V0VXNlck1lZGlhIHN0cmVhbQpjb25zdCB4Y1Bob3RvcyAgICAgID0gbmV3IE1hcCgpOyAvLyBrZXkg4oaSIGRhdGFVUkwgb2YgYmVzdCBidXJzdCBmcmFtZQpsZXQgX29jcldvcmtlciAgICAgID0gbnVsbDsgIC8vIHJldXNhYmxlIFRlc3NlcmFjdCB3b3JrZXIKCmFzeW5jIGZ1bmN0aW9uIHhjSW5pdENhbWVyYSgpIHsKICBpZiAoeGNDYW1TdHJlYW0pIHJldHVybjsKICB0cnkgewogICAgeGNDYW1TdHJlYW0gPSBhd2FpdCBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7CiAgICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6ICdlbnZpcm9ubWVudCcsIHdpZHRoOiB7IGlkZWFsOiA2NDAgfSwgaGVpZ2h0OiB7IGlkZWFsOiA0ODAgfSB9LAogICAgICBhdWRpbzogZmFsc2UKICAgIH0pOwogICAgY29uc3QgdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1jYW0nKTsKICAgIHYuc3JjT2JqZWN0ID0geGNDYW1TdHJlYW07CiAgICBhd2FpdCB2LnBsYXkoKS5jYXRjaCgoKT0+e30pOwogIH0gY2F0Y2goZSkgewogICAgeGNDYW1TdHJlYW0gPSBudWxsOyAvLyBjYW1lcmEgdW5hdmFpbGFibGUgKGRlbnkgb3Igbm8gY2FtZXJhKSDigJQgc2lsZW50bHkgZGVncmFkZQogIH0KfQoKYXN5bmMgZnVuY3Rpb24geGNDYXB0dXJlUGhvdG8oa2V5KSB7CiAgLy8gU3RhcnQgY2FtZXJhIGlmIG5vdCBydW5uaW5nCiAgaWYgKCF4Y0NhbVN0cmVhbSkgeGNJbml0Q2FtZXJhKCk7IC8vIGZpcmUgYW5kIGZvcmdldCDigJQgZmlyc3QgdGFwIG1heSBtaXNzCiAgeGNQaG90b3Muc2V0KGtleSwgbnVsbCk7IC8vIHBsYWNlaG9sZGVyCgogIGNvbnN0IHZpZGVvICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1jYW0nKTsKICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtY2FwJyk7CiAgY29uc3QgY3R4ICAgID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7CgogIC8vIEdpdmUgdmlkZW8gYSBtb21lbnQsIHRoZW4gYnVyc3QgMyBmcmFtZXMKICBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgODApKTsKICBjb25zdCBmcmFtZXMgPSBbXTsKICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykgewogICAgaWYgKGkgPiAwKSBhd2FpdCBuZXcgUHJvbWlzZShyID0+IHNldFRpbWVvdXQociwgMTgwKSk7CiAgICBpZiAodmlkZW8ucmVhZHlTdGF0ZSA+PSAyICYmIHhjQ2FtU3RyZWFtKSB7CiAgICAgIGNhbnZhcy53aWR0aCA9IDQwMDsgY2FudmFzLmhlaWdodCA9IDMwMDsKICAgICAgY3R4LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgNDAwLCAzMDApOwogICAgICBmcmFtZXMucHVzaChjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9qcGVnJywgMC41NSkpOwogICAgfQogIH0KICAvLyBVc2UgbGFzdCBmcmFtZSAocnVubmVyIG1vc3QgbGlrZWx5IGNsZWFyZWQgdGhlIGxpbmUpCiAgaWYgKGZyYW1lcy5sZW5ndGgpIHhjUGhvdG9zLnNldChrZXksIGZyYW1lc1tmcmFtZXMubGVuZ3RoLTFdKTsKfQoKYXN5bmMgZnVuY3Rpb24gcnVuQmliT0NSKCkgewogIGNvbnN0IHBob3RvRGF0YVVybCA9IHhjUGhvdG9zLmdldChiaWJQZW5kaW5nS2V5KTsKICBpZiAoIXBob3RvRGF0YVVybCkgeyB0b2FzdCgnTm8gcGhvdG8gY2FwdHVyZWQnKTsgcmV0dXJuOyB9CiAgY29uc3QgYnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29jci1idG4nKTsKICBpZiAoYnRuKSBidG4udGV4dENvbnRlbnQgPSAn4o+zJzsKICB0cnkgewogICAgaWYgKCFfb2NyV29ya2VyKSB7CiAgICAgIF9vY3JXb3JrZXIgPSBhd2FpdCBUZXNzZXJhY3QuY3JlYXRlV29ya2VyKCdlbmcnKTsKICAgICAgYXdhaXQgX29jcldvcmtlci5zZXRQYXJhbWV0ZXJzKHsgdGVzc2VkaXRfY2hhcl93aGl0ZWxpc3Q6ICcwMTIzNDU2Nzg5JyB9KTsKICAgIH0KICAgIGNvbnN0IHsgZGF0YTogeyB0ZXh0LCBjb25maWRlbmNlIH0gfSA9IGF3YWl0IF9vY3JXb3JrZXIucmVjb2duaXplKHBob3RvRGF0YVVybCk7CiAgICBjb25zdCBkaWdpdHMgPSB0ZXh0LnJlcGxhY2UoL1xEL2csJycpLnNsaWNlKDAsNCk7CiAgICBpZiAoZGlnaXRzICYmIGNvbmZpZGVuY2UgPiA1NSkgewogICAgICBiaWJWYWx1ZSA9IGRpZ2l0czsKICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtYmliLWRpc3BsYXknKS50ZXh0Q29udGVudCA9IGJpYlZhbHVlOwogICAgICBpZiAoYnRuKSBidG4udGV4dENvbnRlbnQgPSAn4pyTICcgKyBkaWdpdHM7CiAgICAgIHRvYXN0KCdCaWIgJyArIGRpZ2l0cyArICcgZGV0ZWN0ZWQgKCcgKyBNYXRoLnJvdW5kKGNvbmZpZGVuY2UpICsgJyUgY29uZiknKTsKICAgIH0gZWxzZSB7CiAgICAgIGlmIChidG4pIGJ0bi50ZXh0Q29udGVudCA9ICfwn5SNIEF1dG8nOwogICAgICB0b2FzdCgnQ291bGQgbm90IHJlYWQgYmliIOKAlCBlbnRlciBtYW51YWxseScpOwogICAgfQogIH0gY2F0Y2goZSkgewogICAgaWYgKGJ0bikgYnRuLnRleHRDb250ZW50ID0gJ/CflI0gQXV0byc7CiAgICB0b2FzdCgnT0NSIGVycm9yJyk7CiAgfQp9CgpmdW5jdGlvbiBpbml0TWFyc2hhbFZpZXcoKSB7CiAgcmVxdWVzdFdha2VMb2NrKCk7IHN5bmNDbG9jaygpOwogIHdhdGNoQ29ubignbWFyc2hhbC1kb3QnKTsKICB4Y0luaXRDYW1lcmEoKTsgLy8gd2FybSB1cCBjYW1lcmEgaW4gYmFja2dyb3VuZAoKICBjb25zdCB4Y1JlZiA9IGNSZWYoJ3hjL2N1cnJlbnQnKTsKICB4Y1JlZi5vbigndmFsdWUnLCBzbmFwID0+IHsgeGNTdGF0ZT1zbmFwLnZhbCgpOyByZW5kZXJNYXJzaGFsVmlldyh4Y1N0YXRlKTsgfSk7CiAgYWN0aXZlTGlzdGVuZXJzLnB1c2goKCkgPT4geGNSZWYub2ZmKCkpOwoKICBjUmVmKCdyZWNhbGwnKS5vbigndmFsdWUnLCBzbmFwID0+IHsgaWYoc25hcC52YWwoKT8uYWN0aXZlKSBmbGFzaFJlY2FsbCgpOyB9KTsKICBhY3RpdmVMaXN0ZW5lcnMucHVzaCgoKSA9PiBjUmVmKCdyZWNhbGwnKS5vZmYoKSk7CgogIGZ1bmN0aW9uIHRpY2soKSB7CiAgICBpZiAoeGNTdGF0ZT8uc3RhdGU9PT0nbGl2ZScgJiYgeGNTdGF0ZS5zdGFydGVkQXRTZXJ2ZXIpIHsKICAgICAgY29uc3QgdCA9IGZtdE1zKG5vd1NlcnZlcigpLXhjU3RhdGUuc3RhcnRlZEF0U2VydmVyKTsKICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFyc2hhbC1jbG9jay1taW5pJyk7CiAgICAgIGlmIChlbCkgZWwudGV4dENvbnRlbnQgPSB0OwogICAgfQogICAgcmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7CiAgfQogIHJhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spOwp9CgpmdW5jdGlvbiByZW5kZXJNYXJzaGFsVmlldyh4YykgewogIGNvbnN0IHdhaXRpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFyc2hhbC13YWl0aW5nJyk7CiAgY29uc3QgbGl2ZSAgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJzaGFsLWxpdmUnKTsKICBpZiAoIXhjIHx8IHhjLnN0YXRlIT09J2xpdmUnKSB7CiAgICBsaXZlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyB3YWl0aW5nLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOwogICAgY29uc3QgbXNnID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtd2FpdC1tc2cnKTsKICAgIGlmICh4Yz8uc3RhdGU9PT0nYXJtZWQnKSB7CiAgICAgIG1zZy5pbm5lckhUTUwgPSBgUmFjZSBhcm1lZCDigJQgd2FpdGluZyBmb3IgR088YnI+CiAgICAgICAgPHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLWFjY2VudCk7Zm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxLjFyZW0iPiR7eGMuYWdlfHwnJ30gJHt4Yy5nZW5kZXJ8fCcnfSDCtyAke3hjLmV2ZW50fHwnJ308L3NwYW4+YDsKICAgIH0gZWxzZSB7IG1zZy50ZXh0Q29udGVudD0nV2FpdGluZyBmb3IgcmFjZSB0byBzdGFydC4uLic7IH0KICAgIHJldHVybjsKICB9CiAgbGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTsgd2FpdGluZy5jbGFzc0xpc3QuYWRkKCdoaWRkZW4nKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFyc2hhbC1ldmVudC1sYmwnKS50ZXh0Q29udGVudCA9IGAke3hjLmFnZXx8Jyd9ICR7eGMuZ2VuZGVyfHwnJ30gwrcgJHt4Yy5ldmVudHx8Jyd9YDsKICByZW5kZXJNYXJzaGFsRmluaXNoZXMoeGMpOwp9CgpmdW5jdGlvbiByZW5kZXJNYXJzaGFsRmluaXNoZXMoeGMpIHsKICBjb25zdCBsaXN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtZmluaXNoZXMtbGlzdCcpOwogIGNvbnN0IGZpbmlzaGVzID0geGM/LmZpbmlzaGVzIHx8IHt9OwogIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyhmaW5pc2hlcykKICAgIC5zb3J0KChhLGIpPT4oYVsxXS50YXBBdHx8MCktKGJbMV0udGFwQXR8fDApKTsKCiAgaWYgKCFlbnRyaWVzLmxlbmd0aCkgewogICAgbGlzdC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz0idGV4dC1tdXRlZCB0ZXh0LXNtIHRleHQtY2VudGVyIiBzdHlsZT0icGFkZGluZzoxMnB4IDAiPk5vIGZpbmlzaGVzIHlldCDigJQgdGFwIGFib3ZlPC9kaXY+JzsKICAgIHJldHVybjsKICB9CgogIGxpc3QuaW5uZXJIVE1MID0gZW50cmllcy5tYXAoKFtrLGZdLGkpID0+IGAKICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjhweDtwYWRkaW5nOjhweCAwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcikiPgogICAgICA8c3BhbiBjbGFzcz0icGxhY2UtYmFkZ2UiIHN0eWxlPSJmbGV4LXNocmluazowIj4ke29yZGluYWwoaSsxKX08L3NwYW4+CiAgICAgIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDo3MDA7bWluLXdpZHRoOjcycHgiPiR7Zm10TXMoZi5lbGFwc2VkTXMpfTwvc3Bhbj4KICAgICAgJHtmLmJpYgogICAgICAgID8gYDxzcGFuIHN0eWxlPSJjb2xvcjp2YXIoLS1hY2NlbnQpO2ZvbnQtd2VpZ2h0OjcwMDtmb250LXNpemU6MC45cmVtIj5CaWIgJHtmLmJpYn08L3NwYW4+YAogICAgICAgIDogYDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbSIgb25jbGljaz0ibWFyc2hhbEVkaXRCaWIoJyR7a30nLCR7aSsxfSwke2YuZWxhcHNlZE1zfSkiPisgQmliPC9idXR0b24+YH0KICAgICAgPHNwYW4gc3R5bGU9ImZsZXg6MTtmb250LXNpemU6MC43NXJlbTtjb2xvcjp2YXIoLS1tdXRlZCk7dGV4dC1hbGlnbjpyaWdodCI+JHtmLm1hcnNoYWxOYW1lfHwnJ308L3NwYW4+CiAgICA8L2Rpdj5gKS5qb2luKCcnKTsKfQoKYXN5bmMgZnVuY3Rpb24gbWFyc2hhbFRhcCgpIHsKICBpZiAoIXhjU3RhdGUgfHwgeGNTdGF0ZS5zdGF0ZSE9PSdsaXZlJykgeyB0b2FzdCgnUmFjZSBub3QgbGl2ZScpOyByZXR1cm47IH0KICBjb25zdCBlbGFwc2VkID0gbm93U2VydmVyKCkgLSB4Y1N0YXRlLnN0YXJ0ZWRBdFNlcnZlcjsKICBjb25zdCBjb3VudCAgID0gT2JqZWN0LmtleXMoeGNTdGF0ZS5maW5pc2hlc3x8e30pLmxlbmd0aDsKICBjb25zdCBwbGFjZSAgID0gY291bnQgKyAxOwoKICB0YXBGbGFzaCgpOyB2aWJyYXRlKFs3MF0pOwoKICAvLyBDbGllbnQtc2lkZSBrZXkKICBjb25zdCBrZXkgPSBteUlkLnNsaWNlKDAsNCkgKyAnLScgKyBEYXRlLm5vdygpLnRvU3RyaW5nKDM2KTsKICB4Y0NhcHR1cmVQaG90byhrZXkpOyAvLyBmaXJlLWFuZC1mb3JnZXQgcGhvdG8gYnVyc3QKCiAgYXdhaXQgY1JlZihgeGMvY3VycmVudC9maW5pc2hlcy8ke2tleX1gKS5zZXQoewogICAgbWFyc2hhbElkOiAgIG15SWQsCiAgICBtYXJzaGFsTmFtZTogbXlOYW1lIHx8ICdNYXJzaGFsJywKICAgIGJpYjogICAgICAgICAnJywKICAgIG5hbWU6ICAgICAgICAnJywKICAgIGVsYXBzZWRNczogICBlbGFwc2VkLAogICAgdGFwQXQ6ICAgICAgIGZpcmViYXNlLmRhdGFiYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUAogIH0pOwoKICB0b2FzdChgJHtvcmRpbmFsKHBsYWNlKX0g4oCUICR7Zm10TXMoZWxhcHNlZCl9YCk7CgogIC8vIFF1ZXVlIGJpYiBlbnRyeQogIGJpYlBlbmRpbmdRdWV1ZS5wdXNoKHsga2V5LCBwbGFjZSwgZWxhcHNlZCB9KTsKICBpZiAoIWJpYlBlbmRpbmdLZXkpIHNob3dOZXh0QmliKCk7Cn0KCmZ1bmN0aW9uIHNob3dOZXh0QmliKCkgewogIGlmICghYmliUGVuZGluZ1F1ZXVlLmxlbmd0aCkgeyBoaWRlQmliUGFkKCk7IHJldHVybjsgfQogIGNvbnN0IHsga2V5LCBwbGFjZSwgZWxhcHNlZCB9ID0gYmliUGVuZGluZ1F1ZXVlWzBdOwogIGJpYlBlbmRpbmdLZXkgPSBrZXk7CiAgYmliVmFsdWUgICAgICA9ICcnOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJzaGFsLWJpYi1mb3InKS50ZXh0Q29udGVudCAgICAgPSBgQmliIGZvciAke29yZGluYWwocGxhY2UpfSDigJQgJHtmbXRNcyhlbGFwc2VkKX1gOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJzaGFsLWJpYi1kaXNwbGF5JykudGV4dENvbnRlbnQgPSAnXyc7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtYmliLXBhZCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtYXJzaGFsLWZpbmlzaGVzLXdyYXAnKS5zdHlsZS5wYWRkaW5nQm90dG9tID0gJzAnOwoKICAvLyBTaG93IHBob3RvIChtYXkgYXJyaXZlIGFzeW5jKQogIGNvbnN0IHVwZGF0ZVBob3RvID0gKCkgPT4gewogICAgY29uc3QgcGhvdG8gPSB4Y1Bob3Rvcy5nZXQoa2V5KTsKICAgIGNvbnN0IGltZyAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmlzaC1waG90by1pbWcnKTsKICAgIGNvbnN0IHBoICAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmlzaC1waG90by1zdGF0dXMnKTsKICAgIGlmICghaW1nKSByZXR1cm47CiAgICBpZiAocGhvdG8pIHsKICAgICAgaW1nLnNyYyA9IHBob3RvOyBpbWcuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7CiAgICAgIGlmIChwaCkgcGguc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgICAgLy8gUmVzZXQgT0NSIGJ1dHRvbgogICAgICBjb25zdCBidG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2NyLWJ0bicpOwogICAgICBpZiAoYnRuKSBidG4udGV4dENvbnRlbnQgPSAn8J+UjSBBdXRvJzsKICAgIH0gZWxzZSBpZiAocGhvdG8gPT09IG51bGwpIHsKICAgICAgLy8gU3RpbGwgY2FwdHVyaW5nCiAgICAgIGlmIChwaCkgeyBwaC5zdHlsZS5kaXNwbGF5PScnOyBwaC50ZXh0Q29udGVudD0n8J+TtyBDYXB0dXJpbmfigKYnOyB9CiAgICAgIGltZy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogICAgICBzZXRUaW1lb3V0KHVwZGF0ZVBob3RvLCAzNTApOwogICAgfSBlbHNlIHsKICAgICAgLy8gTm8gY2FtZXJhCiAgICAgIGlmIChwaCkgeyBwaC5zdHlsZS5kaXNwbGF5PScnOyBwaC50ZXh0Q29udGVudD0nTm8gY2FtZXJhJzsgfQogICAgICBpbWcuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgIH0KICB9OwogIHVwZGF0ZVBob3RvKCk7Cn0KCmZ1bmN0aW9uIGhpZGVCaWJQYWQoKSB7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtYmliLXBhZCcpLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOwogIGJpYlBlbmRpbmdLZXkgPSBudWxsOwp9CgpmdW5jdGlvbiBiaWJEaWdpdChkKSB7CiAgaWYgKGJpYlZhbHVlLmxlbmd0aCA+PSA0KSByZXR1cm47CiAgYmliVmFsdWUgKz0gZDsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFyc2hhbC1iaWItZGlzcGxheScpLnRleHRDb250ZW50ID0gYmliVmFsdWUgfHwgJ18nOwp9CgpmdW5jdGlvbiBiaWJCYWNrKCkgewogIGJpYlZhbHVlID0gYmliVmFsdWUuc2xpY2UoMCwtMSk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtYmliLWRpc3BsYXknKS50ZXh0Q29udGVudCA9IGJpYlZhbHVlIHx8ICdfJzsKfQoKYXN5bmMgZnVuY3Rpb24gYmliQ29uZmlybSgpIHsKICBpZiAoYmliUGVuZGluZ0tleSkgewogICAgY29uc3QgdXBkYXRlcyA9IHt9OwogICAgaWYgKGJpYlZhbHVlKSB1cGRhdGVzLmJpYiA9IGJpYlZhbHVlOwogICAgLy8gU2F2ZSBjb21wcmVzc2VkIHBob3RvIHRvIEZpcmViYXNlIChiYXNlNjQgSlBFRyB+MTUtMjBLQikKICAgIGNvbnN0IHBob3RvID0geGNQaG90b3MuZ2V0KGJpYlBlbmRpbmdLZXkpOwogICAgaWYgKHBob3RvKSB1cGRhdGVzLnBob3RvID0gcGhvdG87CiAgICBpZiAoT2JqZWN0LmtleXModXBkYXRlcykubGVuZ3RoKSB7CiAgICAgIGF3YWl0IGNSZWYoYHhjL2N1cnJlbnQvZmluaXNoZXMvJHtiaWJQZW5kaW5nS2V5fWApLnVwZGF0ZSh1cGRhdGVzKTsKICAgIH0KICB9CiAgYmliUGVuZGluZ1F1ZXVlLnNoaWZ0KCk7CiAgYmliUGVuZGluZ0tleSA9IG51bGw7CiAgc2hvd05leHRCaWIoKTsKfQoKZnVuY3Rpb24gYmliU2tpcCgpIHsKICBiaWJQZW5kaW5nUXVldWUuc2hpZnQoKTsKICBiaWJQZW5kaW5nS2V5ID0gbnVsbDsKICBzaG93TmV4dEJpYigpOwp9CgpmdW5jdGlvbiBtYXJzaGFsRWRpdEJpYihrZXksIHBsYWNlLCBlbGFwc2VkKSB7CiAgLy8gRWRpdCBiaWIgZm9yIGFuIGFscmVhZHktdGFwcGVkIGZpbmlzaGVyCiAgYmliUGVuZGluZ1F1ZXVlLnVuc2hpZnQoeyBrZXksIHBsYWNlLCBlbGFwc2VkIH0pOwogIGlmICghYmliUGVuZGluZ0tleSkgc2hvd05leHRCaWIoKTsKfQoKYXN5bmMgZnVuY3Rpb24gbWFyc2hhbFVuZG8oKSB7CiAgaWYgKCF4Y1N0YXRlKSByZXR1cm47CiAgY29uc3QgZmluaXNoZXMgPSB4Y1N0YXRlLmZpbmlzaGVzfHx7fTsKICBjb25zdCBtaW5lID0gT2JqZWN0LmVudHJpZXMoZmluaXNoZXMpCiAgICAuZmlsdGVyKChbayxmXSk9PmYubWFyc2hhbElkPT09bXlJZCkKICAgIC5zb3J0KChhLGIpPT4oYlsxXS50YXBBdHx8MCktKGFbMV0udGFwQXR8fDApKTsKICBpZiAoIW1pbmUubGVuZ3RoKSB7IHRvYXN0KCdOb3RoaW5nIHRvIHVuZG8nKTsgcmV0dXJuOyB9CiAgY29uc3QgW2tleSwgbGFzdF0gPSBtaW5lWzBdOwogIGNvbnN0IHRvdGFsID0gT2JqZWN0LmtleXMoZmluaXNoZXMpLmxlbmd0aDsKICBtb2RhbCgnVW5kbyBsYXN0IHRhcCcsCiAgICBgUmVtb3ZlIHRhcCBhdCAke2ZtdE1zKGxhc3QuZWxhcHNlZE1zKX0/ICgke3RvdGFsfSB0b3RhbCBmaW5pc2hlcnMpYCwKICAgIFsKICAgICAgeyBsYWJlbDonVW5kbycsIGNsczonYnRuLWRhbmdlcicsIGZuOiBhc3luYyAoKT0+ewogICAgICAgIGF3YWl0IGNSZWYoYHhjL2N1cnJlbnQvZmluaXNoZXMvJHtrZXl9YCkucmVtb3ZlKCk7CiAgICAgICAgLy8gUmVtb3ZlIGZyb20gYmliIHF1ZXVlIGlmIHBlbmRpbmcKICAgICAgICBiaWJQZW5kaW5nUXVldWUgPSBiaWJQZW5kaW5nUXVldWUuZmlsdGVyKHE9PnEua2V5IT09a2V5KTsKICAgICAgICBpZiAoYmliUGVuZGluZ0tleT09PWtleSkgeyBiaWJQZW5kaW5nS2V5PW51bGw7IHNob3dOZXh0QmliKCk7IH0KICAgICAgICB0b2FzdCgnUmVtb3ZlZCcpOwogICAgICB9fSwKICAgICAgeyBsYWJlbDonQ2FuY2VsJyB9CiAgICBdKTsKfQoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIENST1NTIENPVU5UUlkg4oCUIEFETUlOIFZJRVcKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCmZ1bmN0aW9uIGluaXRYQ0FkbWluVmlldygpIHsKICByZXF1ZXN0V2FrZUxvY2soKTsgc3luY0Nsb2NrKCk7CiAgd2F0Y2hDb25uKCd4Yy1hZG1pbi1kb3QnKTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtYWRtaW4tc2Nob29sLWxibCcpLnRleHRDb250ZW50ID0gY2Fybml2YWxNZXRhPy5zY2hvb2x8fCcnOwoKICBjb25zdCBhZ2VTZWw9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLWFnZS1zZWwnKTsKICBhZ2VTZWwuaW5uZXJIVE1MPUFHRV9HUk9VUFMubWFwKGE9PmA8b3B0aW9uPiR7YX08L29wdGlvbj5gKS5qb2luKCcnKTsKICBjb25zdCBldlNlbD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZXZlbnQtc2VsJyk7CiAgZXZTZWwuaW5uZXJIVE1MPUVWRU5UUy54Yy5tYXAoZT0+YDxvcHRpb24+JHtlfTwvb3B0aW9uPmApLmpvaW4oJycpOwoKICBjb25zdCB4Y1JlZj1jUmVmKCd4Yy9jdXJyZW50Jyk7CiAgeGNSZWYub24oJ3ZhbHVlJywgc25hcD0+eyB4Y1N0YXRlPXNuYXAudmFsKCk7IHJlbmRlclhDQWRtaW5WaWV3KHhjU3RhdGUpOyB9KTsKICBhY3RpdmVMaXN0ZW5lcnMucHVzaCgoKT0+eGNSZWYub2ZmKCkpOwoKICBmdW5jdGlvbiB0aWNrKCkgewogICAgaWYgKHhjU3RhdGU/LnN0YXRlPT09J2xpdmUnICYmIHhjU3RhdGUuc3RhcnRlZEF0U2VydmVyKSB7CiAgICAgIGNvbnN0IGVsPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1hZG1pbi1jbG9jaycpOwogICAgICBpZihlbCkgZWwudGV4dENvbnRlbnQ9Zm10TXMobm93U2VydmVyKCkteGNTdGF0ZS5zdGFydGVkQXRTZXJ2ZXIpOwogICAgfQogICAgcmFmSWQ9cmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRpY2spOwogIH0KICByYWZJZD1yZXF1ZXN0QW5pbWF0aW9uRnJhbWUodGljayk7Cn0KCmZ1bmN0aW9uIHNlbGVjdFhDR2VuZGVyKGcpIHsKICB4Y0dlbmRlcj1nOwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXhjZ10nKS5mb3JFYWNoKHA9PnAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpOwogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYFtkYXRhLXhjZz0iJHtnfSJdYCkuZm9yRWFjaChwPT5wLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpKTsKfQoKYXN5bmMgZnVuY3Rpb24geGNBZG1pbkFybSgpIHsKICBpZiAoIWF3YWl0IF9jb25maXJtTW9kYWwoJ0FybSB0aGlzIFhDIHJhY2U/JywgJ0FsbCBjb25uZWN0ZWQgdGltZXJzIGFuZCB0aGUgU3RhcnRlciB3aWxsIGJlIG5vdGlmaWVkLicsICdBUk0gUkFDRSDihpInKSkgcmV0dXJuOwogIGNvbnN0IGFnZSAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtYWdlLXNlbCcpLnZhbHVlOwogIGNvbnN0IGV2ZW50PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZXZlbnQtc2VsJykudmFsdWU7CiAgYXdhaXQgY1JlZigneGMvY3VycmVudCcpLnNldCh7CiAgICByYWNlSWQ6Z2VuSWQoNiksIGFnZSwgZ2VuZGVyOnhjR2VuZGVyLCBldmVudCwKICAgIHN0YXRlOidhcm1lZCcsIGZpbmlzaGVzOnt9LAogICAgYXJtZWRBdDpmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVAKICB9KTsKICB0b2FzdCgnWEMgUmFjZSBhcm1lZCcpOwp9Cgphc3luYyBmdW5jdGlvbiB4Y0FkbWluR28oKSB7CiAgaWYgKCF4Y1N0YXRlIHx8IHhjU3RhdGUuc3RhdGUhPT0nYXJtZWQnKSByZXR1cm47CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLWdvLWJ0bicpLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTsKICBzaG93Q291bnRkb3duKGFzeW5jICgpPT57CiAgICBhd2FpdCBjUmVmKCd4Yy9jdXJyZW50JykudXBkYXRlKHtzdGF0ZTonbGl2ZScsIHN0YXJ0ZWRBdFNlcnZlcjpmaXJlYmFzZS5kYXRhYmFzZS5TZXJ2ZXJWYWx1ZS5USU1FU1RBTVB9KTsKICB9KTsKfQoKYXN5bmMgZnVuY3Rpb24geGNBZG1pblJlY2FsbCgpIHsKICBhd2FpdCBjUmVmKCd4Yy9jdXJyZW50JykudXBkYXRlKHtzdGF0ZTonYXJtZWQnLCBzdGFydGVkQXRTZXJ2ZXI6bnVsbH0pOwogIGJyb2FkY2FzdFJlY2FsbCgpOwp9Cgphc3luYyBmdW5jdGlvbiB4Y0FkbWluQWJhbmRvbigpIHsKICBtb2RhbCgnQWJhbmRvbiBSYWNlJywnUmV0dXJuIHRvIHNldHVwPycsWwogICAgeyBsYWJlbDonQWJhbmRvbicsIGNsczonYnRuLWRhbmdlcicsIGZuOmFzeW5jKCk9PnsKICAgICAgYXdhaXQgY1JlZigneGMvY3VycmVudCcpLnNldCh7c3RhdGU6J2lkbGUnfSk7CiAgICB9fSwKICAgIHsgbGFiZWw6J0NhbmNlbCcgfQogIF0pOwp9Cgphc3luYyBmdW5jdGlvbiB4Y0FkbWluUHVibGlzaCgpIHsKICBpZiAoIXhjU3RhdGUpIHJldHVybjsKICBjb25zdCBmaW5pc2hlcyA9IHhjU3RhdGUuZmluaXNoZXN8fHt9OwogIGNvbnN0IHNvcnRlZCAgID0gT2JqZWN0LmVudHJpZXMoZmluaXNoZXMpLnNvcnQoKGEsYik9PihhWzFdLnRhcEF0fHwwKS0oYlsxXS50YXBBdHx8MCkpOwoKICBjb25zdCBudW1RdWFsID0gcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLXF1YWwtc3BvdHMnKT8udmFsdWUpfHwwOwoKICBpZiAoIWF3YWl0IF9jb25maXJtTW9kYWwoCiAgICAnUHVibGlzaCBYQyBSZXN1bHRzJywKICAgIGAke3NvcnRlZC5sZW5ndGh9IGZpbmlzaGVyJHtzb3J0ZWQubGVuZ3RoIT09MT8ncyc6Jyd9IMK3ICR7bnVtUXVhbH0gcXVhbGlmaWVyIHNwb3Qke251bVF1YWwhPT0xPydzJzonJ31gLAogICAgJ1BVQkxJU0gg4oaSJwogICkpIHJldHVybjsKCiAgdG9hc3QoJ1B1Ymxpc2hpbmcgJiBnZW5lcmF0aW5nIGNhcmRz4oCmJyk7CgogIC8vIEdlbmVyYXRlIGZpbmlzaCBjYXJkcyBmb3IgZmluaXNoZXJzIHdpdGggcGhvdG9zCiAgY29uc3QgY2FyZHMgPSB7fTsKICBmb3IgKGxldCBpID0gMDsgaSA8IHNvcnRlZC5sZW5ndGg7IGkrKykgewogICAgY29uc3QgW2ssIGZdID0gc29ydGVkW2ldOwogICAgY29uc3QgcGxhY2UgPSBpICsgMTsKICAgIHRyeSB7CiAgICAgIGNhcmRzW3BsYWNlXSA9IGF3YWl0IGdlbmVyYXRlRmluaXNoQ2FyZCh7CiAgICAgICAgcGxhY2UsIG5hbWU6IGYubmFtZSB8fCAoZi5iaWIgPyAnQmliICcgKyBmLmJpYiA6ICdGaW5pc2hlciAnICsgcGxhY2UpLAogICAgICAgIGVsYXBzZWRNczogZi5lbGFwc2VkTXMsIHBob3RvOiBmLnBob3RvfHxudWxsLAogICAgICAgIGFnZTogeGNTdGF0ZS5hZ2UsIGdlbmRlcjogeGNTdGF0ZS5nZW5kZXIsCiAgICAgICAgZXZlbnQ6IHhjU3RhdGUuZXZlbnQsIHNjaG9vbDogY2Fybml2YWxNZXRhPy5zY2hvb2x8fCcnCiAgICAgIH0pOwogICAgfSBjYXRjaChlKSB7IC8qIHNraXAgYmFkIGZyYW1lcyAqLyB9CiAgfQoKICBjb25zdCBrZXkgPSBmYkVuYyhgeGMtJHt4Y1N0YXRlLmFnZX0tJHt4Y1N0YXRlLmdlbmRlcn0tJHt4Y1N0YXRlLmV2ZW50fS0ke3hjU3RhdGUucmFjZUlkfWApOwogIGF3YWl0IGNSZWYoYHJlc3VsdHMvJHtrZXl9YCkuc2V0KHsKICAgIHR5cGU6J3hjJywgYWdlOnhjU3RhdGUuYWdlLCBnZW5kZXI6eGNTdGF0ZS5nZW5kZXIsIGV2ZW50OnhjU3RhdGUuZXZlbnQsCiAgICByYWNlSWQ6eGNTdGF0ZS5yYWNlSWQsCiAgICBxdWFsaWZpZXJTcG90czogbnVtUXVhbCwKICAgIHBsYWNlczogc29ydGVkLm1hcCgoW2ssZl0saSkgPT4gKHsKICAgICAgcGxhY2U6ICAgICAgIGkgKyAxLAogICAgICBiaWI6ICAgICAgICAgZi5iaWJ8fCcnLAogICAgICBuYW1lOiAgICAgICAgZi5uYW1lfHwnJywKICAgICAgZWxhcHNlZE1zOiAgIGYuZWxhcHNlZE1zLAogICAgICBxdWFsaWZpZXI6ICAgbnVtUXVhbCA+IDAgJiYgKGkrMSkgPD0gbnVtUXVhbCwKICAgICAgLi4uKGNhcmRzW2krMV0gPyB7IGNhcmQ6IGNhcmRzW2krMV0gfSA6IHt9KQogICAgfSkpLAogICAgcHVibGlzaGVkQXQ6IGZpcmViYXNlLmRhdGFiYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUAogIH0pOwogIGF3YWl0IGNSZWYoJ3hjL2N1cnJlbnQnKS51cGRhdGUoe3N0YXRlOidkb25lJ30pOwoKICBjb25zdCBxdWFsTXNnID0gbnVtUXVhbCA/IGAgwrcgJHtNYXRoLm1pbihudW1RdWFsLCBzb3J0ZWQubGVuZ3RoKX0gcXVhbGlmaWVyJHtudW1RdWFsIT09MT8ncyc6Jyd9IGZsYWdnZWRgIDogJyc7CiAgdG9hc3QoJ1hDIHB1Ymxpc2hlZCEnICsgcXVhbE1zZyk7CgogIC8vIE9mZmVyIHRvIHZpZXcgZmluaXNoIGNhcmRzIGlmIGFueSB3ZXJlIGdlbmVyYXRlZAogIGNvbnN0IGNhcmRDb3VudCA9IE9iamVjdC5rZXlzKGNhcmRzKS5sZW5ndGg7CiAgaWYgKGNhcmRDb3VudCA+IDApIHsKICAgIHNldFRpbWVvdXQoKCkgPT4gc2hvd0ZpbmlzaENhcmRzKGNhcmRzLCBzb3J0ZWQsIHhjU3RhdGUpLCAxMjAwKTsKICB9Cn0KCi8vIOKUgOKUgCBGaW5pc2ggY2FyZCBnZW5lcmF0b3Ig4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlRmluaXNoQ2FyZCh7IHBsYWNlLCBuYW1lLCBlbGFwc2VkTXMsIHBob3RvLCBhZ2UsIGdlbmRlciwgZXZlbnQsIHNjaG9vbCB9KSB7CiAgY29uc3QgVyA9IDQwMCwgSCA9IDYyMDsKICBjb25zdCBjICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsKICBjLndpZHRoID0gVzsgYy5oZWlnaHQgPSBIOwogIGNvbnN0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTsKCiAgLy8gQmFja2dyb3VuZAogIGN0eC5maWxsU3R5bGUgPSAnIzBkMTExNyc7CiAgY3R4LmZpbGxSZWN0KDAsIDAsIFcsIEgpOwoKICBpZiAocGhvdG8pIHsKICAgIHRyeSB7CiAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXMsIHJlaikgPT4gewogICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpOwogICAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7CiAgICAgICAgICAvLyBGaWxsIHRvcCA2MiUgd2l0aCBmaW5pc2ggcGhvdG8KICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBXLCBNYXRoLnJvdW5kKEggKiAwLjYyKSk7CiAgICAgICAgICByZXMoKTsKICAgICAgICB9OwogICAgICAgIGltZy5vbmVycm9yID0gcmVqOwogICAgICAgIGltZy5zcmMgPSBwaG90bzsKICAgICAgfSk7CiAgICAgIC8vIEdyYWRpZW50IGZhZGUgZnJvbSBwaG90byB0byBkYXJrCiAgICAgIGNvbnN0IGcgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgSCowLjM4LCAwLCBIKjAuNjIpOwogICAgICBnLmFkZENvbG9yU3RvcCgwLCAncmdiYSgxMywxNywyMywwKScpOwogICAgICBnLmFkZENvbG9yU3RvcCgxLCAncmdiYSgxMywxNywyMywxKScpOwogICAgICBjdHguZmlsbFN0eWxlID0gZzsKICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIFcsIEgpOwogICAgfSBjYXRjaChlKSB7CiAgICAgIC8vIE5vIHBob3RvIGZhbGxiYWNrIOKAlCB0ZWFsIGdyYWRpZW50IGJhY2tncm91bmQKICAgICAgY29uc3QgZzIgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoMCwgMCwgVywgSCowLjUpOwogICAgICBnMi5hZGRDb2xvclN0b3AoMCwgJyMwZDExMTcnKTsgZzIuYWRkQ29sb3JTdG9wKDEsICcjMGQ0MDQwJyk7CiAgICAgIGN0eC5maWxsU3R5bGUgPSBnMjsKICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIFcsIEgqMC42Mik7CiAgICB9CiAgfSBlbHNlIHsKICAgIGNvbnN0IGcyID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KDAsIDAsIFcsIEgqMC41KTsKICAgIGcyLmFkZENvbG9yU3RvcCgwLCAnIzBkMTExNycpOyBnMi5hZGRDb2xvclN0b3AoMSwgJyMwZDMwMzAnKTsKICAgIGN0eC5maWxsU3R5bGUgPSBnMjsKICAgIGN0eC5maWxsUmVjdCgwLCAwLCBXLCBIKjAuNjIpOwogICAgLy8gQ2FtZXJhIGljb24gcGxhY2Vob2xkZXIKICAgIGN0eC5maWxsU3R5bGUgPSAnIzMwMzYzZCc7CiAgICBjdHguZm9udCA9ICc2NHB4IEFyaWFsJzsKICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsKICAgIGN0eC5maWxsVGV4dCgn8J+PgycsIFcvMiwgSCowLjMyKTsKICB9CgogIGNvbnN0IGJhc2VZID0gSCAqIDAuNjQ7CgogIC8vIEFjY2VudCBzdHJpcGUKICBjdHguZmlsbFN0eWxlID0gJyMxNGI4YTYnOwogIGN0eC5maWxsUmVjdCgwLCBiYXNlWSAtIDQsIFcsIDQpOwoKICAvLyBQbGFjZSB0ZXh0IOKAlCBnb2xkIC8gc2lsdmVyIC8gYnJvbnplIC8gdGVhbAogIGNvbnN0IHBsYWNlQ29sb3JzID0gWycjRkZENzAwJywnI0MwQzBDMCcsJyNDRDdGMzInXTsKICBjb25zdCBwbGFjZVRleHQgICA9IFsnMVNUJywnMk5EJywnM1JEJ11bcGxhY2UtMV0gfHwgKHBsYWNlICsgJ1RIJyk7CiAgY3R4LmZpbGxTdHlsZSAgPSBwbGFjZUNvbG9yc1twbGFjZS0xXSB8fCAnIzE0YjhhNic7CiAgY3R4LmZvbnQgICAgICAgPSBgOTAwICR7cGxhY2U8PTM/ODA6NjR9cHggQXJpYWxgOwogIGN0eC50ZXh0QWxpZ24gID0gJ2NlbnRlcic7CiAgY3R4LnNoYWRvd0NvbG9yID0gJ3JnYmEoMCwwLDAsMC42KSc7CiAgY3R4LnNoYWRvd0JsdXIgID0gODsKICBjdHguZmlsbFRleHQocGxhY2VUZXh0LCBXLzIsIGJhc2VZICsgNzIpOwogIGN0eC5zaGFkb3dCbHVyID0gMDsKCiAgLy8gTmFtZQogIGN0eC5maWxsU3R5bGUgPSAnI2YwZjZmYyc7CiAgY3R4LmZvbnQgICAgICA9ICdib2xkIDM0cHggQXJpYWwnOwogIGNvbnN0IGRpc3BsYXlOYW1lID0gbmFtZS5sZW5ndGggPiAyMCA/IG5hbWUuc2xpY2UoMCwxOSkgKyAn4oCmJyA6IG5hbWU7CiAgY3R4LmZpbGxUZXh0KGRpc3BsYXlOYW1lLCBXLzIsIGJhc2VZICsgMTIwKTsKCiAgLy8gVGltZQogIGN0eC5maWxsU3R5bGUgPSAnIzE0YjhhNic7CiAgY3R4LmZvbnQgICAgICA9ICdib2xkIDI2cHggQXJpYWwnOwogIGN0eC5maWxsVGV4dChmbXRNcyhlbGFwc2VkTXMpLCBXLzIsIGJhc2VZICsgMTU4KTsKCiAgLy8gRXZlbnQgaW5mbwogIGN0eC5maWxsU3R5bGUgPSAnIzhiOTQ5ZSc7CiAgY3R4LmZvbnQgICAgICA9ICcxN3B4IEFyaWFsJzsKICBjdHguZmlsbFRleHQoYCR7YWdlfSAke2dlbmRlcn0gIMK3ICAke2V2ZW50fWAsIFcvMiwgYmFzZVkgKyAxODYpOwoKICAvLyBTY2hvb2wKICBpZiAoc2Nob29sKSB7CiAgICBjdHguZmlsbFN0eWxlID0gJyM4Yjk0OWUnOwogICAgY3R4LmZvbnQgICAgICA9ICcxNXB4IEFyaWFsJzsKICAgIGN0eC5maWxsVGV4dChzY2hvb2wsIFcvMiwgYmFzZVkgKyAyMDcpOwogIH0KCiAgLy8gRm9vdGVyIGJyYW5kaW5nIGJhcgogIGN0eC5maWxsU3R5bGUgPSAnIzE2MWIyMic7CiAgY3R4LmZpbGxSZWN0KDAsIEggLSAzOCwgVywgMzgpOwogIGN0eC5maWxsU3R5bGUgPSAnIzMwMzYzZCc7CiAgY3R4LmZpbGxSZWN0KDAsIEggLSAzOCwgVywgMSk7CiAgY3R4LmZpbGxTdHlsZSA9ICcjOGI5NDllJzsKICBjdHguZm9udCAgICAgID0gJzEzcHggQXJpYWwnOwogIGN0eC5maWxsVGV4dCgnY2Fybml2YWx0aW1pbmcuY29tJywgVy8yLCBIIC0gMTMpOwoKICByZXR1cm4gYy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnLCAwLjgyKTsKfQoKLy8g4pSA4pSAIFNob3cgZmluaXNoIGNhcmRzIHNsaWRlc2hvdyBhZnRlciBwdWJsaXNoIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApmdW5jdGlvbiBzaG93RmluaXNoQ2FyZHMoY2FyZHMsIHNvcnRlZCwgeGMpIHsKICBsZXQgaWR4ID0gMDsKICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY2FyZHMpLm1hcChOdW1iZXIpLnNvcnQoKGEsYik9PmEtYik7CiAgaWYgKCFrZXlzLmxlbmd0aCkgcmV0dXJuOwoKICBjb25zdCBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgb3ZlcmxheS5pZCA9ICdmaW5pc2gtY2FyZC1vdmVybGF5JzsKCiAgY29uc3QgcmVuZGVyID0gKCkgPT4gewogICAgY29uc3QgcGxhY2UgPSBrZXlzW2lkeF07CiAgICBjb25zdCBbLCBmXSA9IHNvcnRlZFtwbGFjZS0xXSB8fCBzb3J0ZWRbMF07CiAgICBvdmVybGF5LmlubmVySFRNTCA9IGAKICAgICAgPGltZyBzcmM9IiR7Y2FyZHNbcGxhY2VdfSIgc3R5bGU9Im1heC13aWR0aDptaW4oMzIwcHgsODV2dyk7Ym9yZGVyLXJhZGl1czoxMnB4O2JveC1zaGFkb3c6MCA4cHggMzJweCByZ2JhKDAsMCwwLC42KSI+CiAgICAgIDxkaXYgc3R5bGU9ImNvbG9yOiNmMGY2ZmM7Zm9udC1zaXplOjAuOXJlbTt0ZXh0LWFsaWduOmNlbnRlcjtvcGFjaXR5OjAuNyI+JHtwbGFjZX0gb2YgJHtrZXlzLmxlbmd0aH0gwrcgdGFwIHRvIHNoYXJlPC9kaXY+CiAgICAgIDxkaXYgY2xhc3M9ImNhcmQtYWN0aW9ucyI+CiAgICAgICAgJHtpZHggPiAwID8gJzxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbSIgaWQ9Il9mYy1wcmV2Ij7ihpAgUHJldjwvYnV0dG9uPicgOiAnJ30KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkgYnRuLXNtIiBpZD0iX2ZjLXNoYXJlIj5TaGFyZSDwn5OkPC9idXR0b24+CiAgICAgICAgJHtpZHggPCBrZXlzLmxlbmd0aC0xID8gJzxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbSIgaWQ9Il9mYy1uZXh0Ij5OZXh0IOKGkjwvYnV0dG9uPicgOiAnJ30KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSBidG4tc20iIGlkPSJfZmMtY2xvc2UiPuKclSBDbG9zZTwvYnV0dG9uPgogICAgICA8L2Rpdj5gOwoKICAgIC8vIEJpbmQgYnV0dG9ucwogICAgb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjX2ZjLWNsb3NlJykub25jbGljayA9ICgpID0+IGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQob3ZlcmxheSk7CiAgICBjb25zdCBwcmV2QnRuID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcjX2ZjLXByZXYnKTsKICAgIGNvbnN0IG5leHRCdG4gPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNfZmMtbmV4dCcpOwogICAgY29uc3Qgc2hhcmVCdG4gPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJyNfZmMtc2hhcmUnKTsKICAgIGlmIChwcmV2QnRuKSBwcmV2QnRuLm9uY2xpY2sgPSAoKSA9PiB7IGlkeC0tOyByZW5kZXIoKTsgfTsKICAgIGlmIChuZXh0QnRuKSBuZXh0QnRuLm9uY2xpY2sgPSAoKSA9PiB7IGlkeCsrOyByZW5kZXIoKTsgfTsKICAgIHNoYXJlQnRuLm9uY2xpY2sgPSBhc3luYyAoKSA9PiB7CiAgICAgIGNvbnN0IGRhdGFVcmwgID0gY2FyZHNbcGxhY2VdOwogICAgICBjb25zdCBibG9iICAgICA9IGF3YWl0IChhd2FpdCBmZXRjaChkYXRhVXJsKSkuYmxvYigpOwogICAgICBjb25zdCBmaWxlICAgICA9IG5ldyBGaWxlKFtibG9iXSwgYGZpbmlzaC0ke3hjLmFnZX0tJHt4Yy5nZW5kZXJ9LXBsYWNlJHtwbGFjZX0uanBnYCwge3R5cGU6J2ltYWdlL2pwZWcnfSk7CiAgICAgIGlmIChuYXZpZ2F0b3IuY2FuU2hhcmUgJiYgbmF2aWdhdG9yLmNhblNoYXJlKHtmaWxlczpbZmlsZV19KSkgewogICAgICAgIG5hdmlnYXRvci5zaGFyZSh7IGZpbGVzOltmaWxlXSwgdGl0bGU6IGAke29yZGluYWwocGxhY2UpfSBQbGFjZSDigJQgJHt4Yy5hZ2V9ICR7eGMuZ2VuZGVyfWAgfSkuY2F0Y2goKCk9Pnt9KTsKICAgICAgfSBlbHNlIHsKICAgICAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpOwogICAgICAgIGEuaHJlZiA9IGRhdGFVcmw7IGEuZG93bmxvYWQgPSBmaWxlLm5hbWU7IGEuY2xpY2soKTsKICAgICAgfQogICAgfTsKICB9OwoKICByZW5kZXIoKTsKICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKG92ZXJsYXkpOwp9CgpmdW5jdGlvbiByZW5kZXJYQ0FkbWluVmlldyh4YykgewogIGNvbnN0IHNldHVwPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1zZXR1cC1wYW5lbCcpOwogIGNvbnN0IGxpdmUgPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1saXZlLXBhbmVsJyk7CgogIGlmICgheGMgfHwgeGMuc3RhdGU9PT0naWRsZScpIHsKICAgIHNldHVwLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOyBsaXZlLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyByZXR1cm47CiAgfQogIHNldHVwLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOyBsaXZlLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOwoKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtcmFjZS1sYmwnKS50ZXh0Q29udGVudCA9IGAke3hjLmFnZX0gJHt4Yy5nZW5kZXJ9IMK3ICR7eGMuZXZlbnR9YDsKICBjb25zdCBiYWRnZSAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtc3RhdGUtYmFkZ2UnKTsKICBjb25zdCBnb0J0biAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZ28tYnRuJyk7CiAgY29uc3QgcHViQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLXB1Ymxpc2gtYnRuJyk7CgogIGlmICh4Yy5zdGF0ZT09PSdhcm1lZCcpIHsKICAgIGJhZGdlLmNsYXNzTmFtZT0nYmFkZ2UgYmFkZ2UtYXJtZWQnOyBiYWRnZS50ZXh0Q29udGVudD0nQVJNRUQnOwogICAgZ29CdG4ucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpOyBwdWJCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtYWRtaW4tY2xvY2snKS50ZXh0Q29udGVudD0nMDowMC4wMCc7CiAgfSBlbHNlIGlmICh4Yy5zdGF0ZT09PSdsaXZlJykgewogICAgYmFkZ2UuY2xhc3NOYW1lPSdiYWRnZSBiYWRnZS1saXZlJzsgYmFkZ2UudGV4dENvbnRlbnQ9J0xJVkUnOwogICAgZ29CdG4uc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsJycpOyBwdWJCdG4uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZGVuJyk7CiAgfSBlbHNlIGlmICh4Yy5zdGF0ZT09PSdkb25lJykgewogICAgYmFkZ2UuY2xhc3NOYW1lPSdiYWRnZSBiYWRnZS1kb25lJzsgYmFkZ2UudGV4dENvbnRlbnQ9J0RPTkUnOwogICAgcHViQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpOwogIH0KCiAgY29uc3QgZmluaXNoZXMgPSB4Yy5maW5pc2hlc3x8e307CiAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGZpbmlzaGVzKQogICAgLnNvcnQoKGEsYik9PihhWzFdLnRhcEF0fHwwKS0oYlsxXS50YXBBdHx8MCkpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1jb3VudC1sYmwnKS50ZXh0Q29udGVudCA9IGVudHJpZXMubGVuZ3RoID8gYCR7ZW50cmllcy5sZW5ndGh9IGZpbmlzaGVyc2AgOiAnJzsKCiAgY29uc3QgcXVhbE4gPSBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtcXVhbC1zcG90cycpPy52YWx1ZSl8fDA7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLWZpbmlzaGVycy1saXN0JykuaW5uZXJIVE1MID0gZW50cmllcy5tYXAoKFtrLGZdLGkpPT5gCiAgICA8ZGl2IGNsYXNzPSJyZXN1bHQtcm93IiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6NnB4Ij4KICAgICAgPHNwYW4gY2xhc3M9InBsYWNlLWJhZGdlIj4ke29yZGluYWwoaSsxKX08L3NwYW4+CiAgICAgICR7Zi5waG90byA/ICc8c3BhbiBzdHlsZT0iZm9udC1zaXplOjAuOHJlbSIgdGl0bGU9IlBob3RvIGNhcHR1cmVkIj7wn5O3PC9zcGFuPicgOiAnJ30KICAgICAgPHNwYW4gY2xhc3M9InJlc3VsdC1uYW1lIiBzdHlsZT0iZmxleDoxIj4ke2YubmFtZXx8KGYuYmliPydCaWIgJytmLmJpYjon4oCUJyl9PC9zcGFuPgogICAgICAke3F1YWxOID4gMCAmJiAoaSsxKSA8PSBxdWFsTiA/ICc8c3BhbiBjbGFzcz0icXVhbGlmaWVyLWNoaXAiPvCfj4UgUVVBTDwvc3Bhbj4nIDogJyd9CiAgICAgIDxzcGFuIGNsYXNzPSJyZXN1bHQtdGltZSI+JHtmbXRNcyhmLmVsYXBzZWRNcyl9PC9zcGFuPgogICAgPC9kaXY+YCkuam9pbignJyk7Cn0KCmFzeW5jIGZ1bmN0aW9uIGV4cG9ydENTVigpIHsKICBjb25zdCBidG4gPSBldmVudCAmJiBldmVudC5jdXJyZW50VGFyZ2V0OwogIGlmIChidG4pIHsgYnRuLnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCcnKTsgYnRuLnRleHRDb250ZW50PSdFeHBvcnRpbmfigKYnOyB9CiAgdHJ5IHsKICAgIGNvbnN0IHNuYXAgPSBhd2FpdCBjUmVmKCdyZXN1bHRzJykub25jZSgndmFsdWUnKTsKICAgIGNvbnN0IHJlc3VsdHMgPSBzbmFwLnZhbCgpIHx8IHt9OwogICAgY29uc3Qgcm93cyA9IFtbJ1R5cGUnLCdBZ2UnLCdHZW5kZXInLCdFdmVudCcsJ1BsYWNlJywnTmFtZScsJ1RpbWUgKHMpJywnRFEnXV07CiAgICBPYmplY3QudmFsdWVzKHJlc3VsdHMpCiAgICAgIC5zb3J0KChhLGIpPT4oYS5wdWJsaXNoZWRBdHx8MCktKGIucHVibGlzaGVkQXR8fDApKQogICAgICAuZm9yRWFjaChyID0+IHsKICAgICAgICBpZiAoci50eXBlPT09J3hjJykgewogICAgICAgICAgKHIucGxhY2VzfHxbXSkuZm9yRWFjaChwID0+IHsKICAgICAgICAgICAgcm93cy5wdXNoKFsnWEMnLHIuYWdlfHwnJyxyLmdlbmRlcnx8Jycsci5ldmVudHx8JycscC5wbGFjZXx8JycscC5uYW1lfHwnJywocC5lbGFwc2VkTXMvMTAwMCkudG9GaXhlZCgyKSwnJ10pOwogICAgICAgICAgfSk7CiAgICAgICAgfSBlbHNlIHsKICAgICAgICAgIChyLnJlc3VsdHN8fFtdKS5mb3JFYWNoKGwgPT4gewogICAgICAgICAgICBjb25zdCBkcUZsYWcgPSBsLmRxID8gJ1knIDogJyc7CiAgICAgICAgICAgIHJvd3MucHVzaChbJ0xhbmUnLHIuYWdlfHwnJyxyLmdlbmRlcnx8Jycsci5ldmVudHx8JycsbC5kcT8nRFEnOihsLnBsYWNlfHwnJyksbC5uYW1lfHxgTGFuZSAke2wubGFuZX1gLGwuZHE/Jyc6KGwudGltZU1zLzEwMDApLnRvRml4ZWQoMiksZHFGbGFnXSk7CiAgICAgICAgICB9KTsKICAgICAgICB9CiAgICAgIH0pOwogICAgY29uc3QgY3N2ID0gcm93cy5tYXAocj0+ci5tYXAoYz0+YCIke1N0cmluZyhjKS5yZXBsYWNlKC8iL2csJ1wiJyl9ImApICAuam9pbignLCcpKS5qb2luKCdcbicpOwogICAgY29uc3QgYmxvYiA9IG5ldyBCbG9iKFtjc3ZdLCB7dHlwZTondGV4dC9jc3YnfSk7CiAgICBjb25zdCBhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpOwogICAgYS5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTsKICAgIGEuZG93bmxvYWQgPSBgcmVzdWx0cy0ke2Nhcm5pdmFsQ29kZXx8J2Nhcm5pdmFsJ30tJHtuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc2xpY2UoMCwxMCl9LmNzdmA7CiAgICBhLmNsaWNrKCk7CiAgfSBjYXRjaChlKSB7IHRvYXN0KCdFeHBvcnQgZmFpbGVkOiAnICsgZS5tZXNzYWdlKTsgfQogIGlmIChidG4pIHsgYnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTsgYnRuLnRleHRDb250ZW50PSdFeHBvcnQgQ1NWJzsgfQp9CgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKLy8g4pSA4pSAIFZJREVPIEZJTklTSCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKLy8gU1RBVEUKbGV0IHZmU3RyZWFtICAgICAgICAgICA9IG51bGw7CmxldCB2ZlJhY2VTdGFydE1zICAgICAgPSAwOwpsZXQgdmZPZmZsaW5lTW9kZSAgICAgID0gZmFsc2U7CmxldCB2Zk1vZGUgICAgICAgICAgICAgPSAnc3dpbSc7ICAgIC8vICdzd2ltJyB8ICd0cmFjaycKbGV0IHZmTGFuZUNvdW50ICAgICAgICA9IDQ7CmxldCB2ZkRldGVjdGlvbnMgICAgICAgPSBbXTsKbGV0IHZmTGl2ZVJhZklkICAgICAgICA9IG51bGw7CmxldCB2ZkxpdmVPZmZzY3IgICAgICAgPSBudWxsOwpsZXQgdmZMaXZlU3RhdGUgICAgICAgID0gJ2lkbGUnOyAgICAvLyAnY2FsaWJyYXRpbmcnfCdyZWFkeSd8J2RldGVjdGluZyd8J2RvbmUnCmxldCB2ZkxpdmVUaHJlc2hvbGRzICAgPSBudWxsOwpsZXQgdmZMaXZlUHJldiAgICAgICAgID0gbnVsbDsKbGV0IHZmTGFuZUZvdW5kICAgICAgICA9IFtdOwpsZXQgdmZDYWxEYXRhICAgICAgICAgID0gbnVsbDsKCmZ1bmN0aW9uIHZmR2V0T2Zmc2V0KCkgICB7IHJldHVybiBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmYtb2Zmc2V0LWlucHV0Jyk/LnZhbHVlfHw3NSwxMCl8fDA7IH0KZnVuY3Rpb24gdmZHZXRQcm9ncmVzcygpIHsgcmV0dXJuIHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1wcm9ncmVzcy1pbnB1dCcpPy52YWx1ZXx8MiwxMCl8fDI7IH0KCi8vIOKUgOKUgCBNb2RlIC8gbGFuZSBVSSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKZnVuY3Rpb24gdmZTZXRNb2RlKG1vZGUpIHsKICB2Zk1vZGUgPSBtb2RlOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1tb2RlLXN3aW0tYnRuJykuY2xhc3NOYW1lICA9IG1vZGU9PT0nc3dpbScgID8gJ2J0biBidG4tcHJpbWFyeScgICA6ICdidG4gYnRuLXNlY29uZGFyeSc7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZmLW1vZGUtdHJhY2stYnRuJykuY2xhc3NOYW1lID0gbW9kZT09PSd0cmFjaycgPyAnYnRuIGJ0bi1wcmltYXJ5JyAgIDogJ2J0biBidG4tc2Vjb25kYXJ5JzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmYtbGFuZS1yb3cnKS5zdHlsZS5kaXNwbGF5ICAgPSBtb2RlPT09J3N3aW0nICA/ICdmbGV4JyA6ICdub25lJzsKICBpZiAodmZMaXZlU3RhdGUgIT09ICdpZGxlJykgdmZSZXN0YXJ0Q2FsaWJyYXRpb24oKTsKfQpmdW5jdGlvbiB2ZlNldExhbmVzKG4pIHsKICB2ZkxhbmVDb3VudCA9IG47CiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnZmLWxhbmUtYnRuJykuZm9yRWFjaChiID0+IGIuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJywgcGFyc2VJbnQoYi5kYXRhc2V0LmxhbmVzKT09PW4pKTsKICBpZiAodmZMaXZlU3RhdGUgIT09ICdpZGxlJykgdmZSZXN0YXJ0Q2FsaWJyYXRpb24oKTsKfQoKLy8g4pSA4pSAIEluaXQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIGluaXRWaWRlb0ZpbmlzaCgpIHsKICByZXF1ZXN0V2FrZUxvY2soKTsgc3luY0Nsb2NrKCk7CiAgdmZTZXRNb2RlKCdzd2ltJyk7CgogIC8vIFdhdGNoIHJhY2Ugc3RhdGUgZnJvbSBGaXJlYmFzZQogIGNvbnN0IHJlZiA9IGNSZWYoJ3JhY2UvY3VycmVudCcpOwogIHJlZi5vbigndmFsdWUnLCBzbmFwID0+IHsKICAgIGNvbnN0IHJjID0gc25hcC52YWwoKTsKICAgIGlmICghcmMpIHJldHVybjsKICAgIGlmIChyYy5zdGF0ZT09PSdsaXZlJyAmJiByYy5zdGFydGVkQXRTZXJ2ZXIpIHsKICAgICAgdmZSYWNlU3RhcnRNcyA9IHJjLnN0YXJ0ZWRBdFNlcnZlcjsKICAgICAgdmZPZmZsaW5lTW9kZSA9IGZhbHNlOwogICAgICBpZiAodmZMaXZlU3RhdGUgPT09ICdyZWFkeScpIHsKICAgICAgICB2ZkxpdmVTdGF0ZSA9ICdkZXRlY3RpbmcnOwogICAgICAgIHZmTGl2ZVByZXYgID0gbmV3IEFycmF5KHZmTGFuZUNvdW50KS5maWxsKG51bGwpOwogICAgICAgIHZmTGFuZUZvdW5kID0gbmV3IEFycmF5KHZmTGFuZUNvdW50KS5maWxsKGZhbHNlKTsKICAgICAgICB2ZlNldFN0YXR1cygnXHVEODNEXHVERDM0IERldGVjdGluZ+KApicsICcjZWY0NDQ0Jyk7CiAgICAgIH0KICAgICAgLy8gaWYgc3RpbGwgY2FsaWJyYXRpbmcgaXQgd2lsbCBzd2l0Y2ggYXV0b21hdGljYWxseSB3aGVuIGNhbCBmaW5pc2hlcwogICAgfSBlbHNlIGlmIChyYy5zdGF0ZT09PSdhcm1lZCcpIHsKICAgICAgdmZTZXRTdGF0dXMoJ1x1MjZBMSBSZWFkeSDigJQgd2FpdGluZyBmb3IgR08nLCAnI2VhYjMwOCcpOwogICAgfQogIH0pOwogIGFjdGl2ZUxpc3RlbmVycy5wdXNoKCgpID0+IHJlZi5vZmYoKSk7CgogIC8vIFN0YXJ0IGNhbWVyYQogIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsKICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6J2Vudmlyb25tZW50Jywgd2lkdGg6e2lkZWFsOjE5MjB9LCBoZWlnaHQ6e2lkZWFsOjEwODB9IH0sCiAgICBhdWRpbzogZmFsc2UKICB9KS50aGVuKHN0cmVhbSA9PiB7CiAgICB2ZlN0cmVhbSA9IHN0cmVhbTsKICAgIGNvbnN0IHZpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi12aWRlby1wcmV2aWV3Jyk7CiAgICB2aWQuc3JjT2JqZWN0ID0gc3RyZWFtOyB2aWQucGxheSgpOwogICAgdmlkLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCAoKSA9PiB7CiAgICAgIHZmU3RhcnRDYWxpYnJhdGlvbigpOwogICAgICB0b2FzdCgnQ2FtZXJhIHJlYWR5IOKAlCBjYWxpYnJhdGluZ+KApicpOwogICAgfSwge29uY2U6dHJ1ZX0pOwogIH0pLmNhdGNoKGVyciA9PiB7CiAgICBjb25zdCBtc2cgPSBlcnIgJiYgZXJyLm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJwogICAgICA/ICdObyBjYW1lcmEgZm91bmQgb24gdGhpcyBkZXZpY2UnCiAgICAgIDogZXJyICYmIGVyci5uYW1lID09PSAnTm90QWxsb3dlZEVycm9yJwogICAgICAgID8gJ0NhbWVyYSBhY2Nlc3MgZGVuaWVkIOKAlCBjaGVjayBicm93c2VyIHBlcm1pc3Npb25zJwogICAgICAgIDogJ0NhbWVyYSBlcnJvcjogJyArIChlcnI/Lm1lc3NhZ2UgfHwgZXJyKTsKICAgIHRvYXN0KG1zZyk7CiAgICB2ZlNldFN0YXR1cygn4pqgICcgKyBtc2csICcjZWY0NDQ0Jyk7CiAgICAvLyBTaG93IHJldHJ5IGJ1dHRvbiBvbiB0aGUgY2FudmFzIGFyZWEKICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1saXZlLWNhbnZhcycpOwogICAgaWYgKGNhbnZhcykgewogICAgICBjYW52YXMuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICAgICAgY29uc3QgZXJyRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7CiAgICAgIGVyckRpdi5pZCA9ICd2Zi1jYW0tZXJyb3InOwogICAgICBlcnJEaXYuc3R5bGUuY3NzVGV4dCA9ICd0ZXh0LWFsaWduOmNlbnRlcjtwYWRkaW5nOjMycHggMTZweDtiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UtMik7Ym9yZGVyLXJhZGl1czoxMnB4O21hcmdpbi1ib3R0b206MTBweCc7CiAgICAgIGVyckRpdi5pbm5lckhUTUwgPSBgPGRpdiBzdHlsZT0iZm9udC1zaXplOjJyZW07bWFyZ2luLWJvdHRvbTo4cHgiPvCfk7c8L2Rpdj48ZGl2IHN0eWxlPSJjb2xvcjp2YXIoLS1kYW5nZXIpO2ZvbnQtd2VpZ2h0OjYwMDttYXJnaW4tYm90dG9tOjE2cHgiPiR7bXNnfTwvZGl2PjxidXR0b24gY2xhc3M9ImJ0biBidG4tcHJpbWFyeSIgb25jbGljaz0idmZSZXRyeUNhbWVyYSgpIj5SZXRyeSBDYW1lcmE8L2J1dHRvbj5gOwogICAgICBjYW52YXMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZXJyRGl2LCBjYW52YXMpOwogICAgfQogIH0pOwp9CgpmdW5jdGlvbiB2ZlNldFN0YXR1cyh0ZXh0LCBkb3RDb2xvcikgewogIGNvbnN0IGVsICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1yYWNlLXN0YXR1cycpOwogIGNvbnN0IGRvdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1zdGF0dXMtZG90Jyk7CiAgaWYgKGVsKSAgZWwudGV4dENvbnRlbnQgPSB0ZXh0OwogIGlmIChkb3QpIGRvdC5zdHlsZS5iYWNrZ3JvdW5kID0gZG90Q29sb3IgfHwgJ3ZhcigtLW11dGVkKSc7Cn0KZnVuY3Rpb24gdmZTdGFydENhbGlicmF0aW9uKCkgewogIHZmTGl2ZVN0YXRlID0gJ2NhbGlicmF0aW5nJzsKICB2ZkNhbERhdGEgPSB7CiAgICBiYXNlbGluZXM6IG5ldyBBcnJheSh2ZkxhbmVDb3VudCkuZmlsbCgwKSwKICAgIGNvdW50czogICAgbmV3IEFycmF5KHZmTGFuZUNvdW50KS5maWxsKDApLAogICAgcHJldjogICAgICBuZXcgQXJyYXkodmZMYW5lQ291bnQpLmZpbGwobnVsbCksCiAgICBzdGFydE1zOiAgIERhdGUubm93KCkKICB9OwogIHZmU2V0U3RhdHVzKCdDYWxpYnJhdGluZ+KApicsICcjNmI3MjgwJyk7CiAgaWYgKCF2ZkxpdmVSYWZJZCkgdmZMaXZlUmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodmZMaXZlRnJhbWUpOwp9CmZ1bmN0aW9uIHZmUmVzdGFydENhbGlicmF0aW9uKCkgewogIHZmRGV0ZWN0aW9ucyA9IFtdOyB2ZlJlbmRlckRldGVjdGlvbnMoKTsKICB2ZkxpdmVTdGF0ZSA9ICdpZGxlJzsKICB2ZlN0YXJ0Q2FsaWJyYXRpb24oKTsKfQoKLy8g4pSA4pSAIExpdmUgZGV0ZWN0aW9uIGxvb3Ag4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIHZmTGl2ZUZyYW1lKCkgewogIHZmTGl2ZVJhZklkID0gbnVsbDsKICBpZiAodmZMaXZlU3RhdGUgPT09ICdpZGxlJyB8fCB2ZkxpdmVTdGF0ZSA9PT0gJ2RvbmUnKSByZXR1cm47CgogIGNvbnN0IHZpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi12aWRlby1wcmV2aWV3Jyk7CiAgaWYgKCF2aWQgfHwgIXZpZC52aWRlb1dpZHRoKSB7IHZmTGl2ZVJhZklkID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHZmTGl2ZUZyYW1lKTsgcmV0dXJuOyB9CgogIGlmICghdmZMaXZlT2Zmc2NyKSB2ZkxpdmVPZmZzY3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTsKICBjb25zdCBvYyA9IHZmTGl2ZU9mZnNjcjsKICBvYy53aWR0aCA9IHZpZC52aWRlb1dpZHRoOyBvYy5oZWlnaHQgPSB2aWQudmlkZW9IZWlnaHQ7CiAgY29uc3QgY3R4ID0gb2MuZ2V0Q29udGV4dCgnMmQnKTsKICBjdHguZHJhd0ltYWdlKHZpZCwgMCwgMCk7CgogIC8vIFB1c2ggZnJhbWUgdG8gdmlzaWJsZSBjYW52YXMgd2l0aCBvdmVybGF5CiAgdmZEcmF3T3ZlcmxheShvYywgY3R4KTsKCiAgY29uc3QgTiA9IHZmTGFuZUNvdW50OwogIGNvbnN0IHNhbXBsZSA9IGkgPT4gdmZNb2RlPT09J3N3aW0nCiAgICA/IHZmU2FtcGxlU3RyaXAoY3R4LCBvYy53aWR0aCwgb2MuaGVpZ2h0LCBpLCBOKQogICAgOiB2ZlNhbXBsZUhTdHJpcChjdHgsIG9jLndpZHRoLCBvYy5oZWlnaHQsIGksIE4pOwoKICBpZiAodmZMaXZlU3RhdGUgPT09ICdjYWxpYnJhdGluZycpIHsKICAgIGNvbnN0IGNhbCA9IHZmQ2FsRGF0YTsKICAgIGZvciAobGV0IGk9MDsgaTxOOyBpKyspIHsKICAgICAgY29uc3QgcyA9IHNhbXBsZShpKTsKICAgICAgaWYgKGNhbC5wcmV2W2ldKSB7IGNhbC5iYXNlbGluZXNbaV0gKz0gdmZQaXhlbERpZmYocywgY2FsLnByZXZbaV0pOyBjYWwuY291bnRzW2ldKys7IH0KICAgICAgY2FsLnByZXZbaV0gPSBzOwogICAgfQogICAgaWYgKERhdGUubm93KCkgLSBjYWwuc3RhcnRNcyA+PSAyMDAwKSB7CiAgICAgIHZmTGl2ZVRocmVzaG9sZHMgPSBjYWwuYmFzZWxpbmVzLm1hcCgoYixpKSA9PgogICAgICAgIE1hdGgubWF4KDYsIGNhbC5jb3VudHNbaV0+MCA/IChiL2NhbC5jb3VudHNbaV0pKjQgOiAxMCkKICAgICAgKTsKICAgICAgdmZMaXZlUHJldiAgPSBuZXcgQXJyYXkoTikuZmlsbChudWxsKTsKICAgICAgdmZMYW5lRm91bmQgPSBuZXcgQXJyYXkoTikuZmlsbChmYWxzZSk7CiAgICAgIGlmICh2ZlJhY2VTdGFydE1zICYmIG5vd1NlcnZlcigpID4gdmZSYWNlU3RhcnRNcykgewogICAgICAgIHZmTGl2ZVN0YXRlID0gJ2RldGVjdGluZyc7CiAgICAgICAgdmZTZXRTdGF0dXMoJ1x1RDgzRFx1REQzNCBEZXRlY3RpbmfigKYnLCAnI2VmNDQ0NCcpOwogICAgICB9IGVsc2UgewogICAgICAgIHZmTGl2ZVN0YXRlID0gJ3JlYWR5JzsKICAgICAgICB2ZlNldFN0YXR1cygnXHUyNzEzIFJlYWR5IOKAlCB3YWl0aW5nIGZvciBHTycsICcjMjJjNTVlJyk7CiAgICAgIH0KICAgIH0KICB9IGVsc2UgaWYgKHZmTGl2ZVN0YXRlID09PSAnZGV0ZWN0aW5nJykgewogICAgY29uc3Qgbm93TXMgPSBub3dTZXJ2ZXIoKTsKICAgIGZvciAobGV0IGk9MDsgaTxOOyBpKyspIHsKICAgICAgaWYgKHZmTGFuZUZvdW5kW2ldKSBjb250aW51ZTsKICAgICAgY29uc3QgcyA9IHNhbXBsZShpKTsKICAgICAgaWYgKHZmTGl2ZVByZXZbaV0gJiYgdmZQaXhlbERpZmYocywgdmZMaXZlUHJldltpXSkgPiB2ZkxpdmVUaHJlc2hvbGRzW2ldKSB7CiAgICAgICAgY29uc3QgZWxhcHNlZE1zID0gbm93TXMgLSB2ZlJhY2VTdGFydE1zIC0gdmZHZXRPZmZzZXQoKTsKICAgICAgICBpZiAoZWxhcHNlZE1zID4gMTAwKSB7CiAgICAgICAgICBjb25zdCBzdGlsbCA9IG9jLnRvRGF0YVVSTCgnaW1hZ2UvanBlZycsIDAuOCk7CiAgICAgICAgICB2ZkRldGVjdGlvbnMucHVzaCh7IGxhbmU6aSsxLCBlbGFwc2VkTXMsIHN0aWxsIH0pOwogICAgICAgICAgdmZEZXRlY3Rpb25zLnNvcnQoKGEsYikgPT4gYS5lbGFwc2VkTXMgLSBiLmVsYXBzZWRNcyk7CiAgICAgICAgICB2ZkRldGVjdGlvbnMuZm9yRWFjaCgoZCxqKSA9PiBkLnBsYWNlID0gaisxKTsKICAgICAgICAgIHZmTGFuZUZvdW5kW2ldID0gdHJ1ZTsKICAgICAgICAgIHZmUmVuZGVyRGV0ZWN0aW9ucygpOwogICAgICAgICAgY29uc3QgbGJsID0gdmZNb2RlPT09J3RyYWNrJyA/IGBMYW5lICR7aSsxfWAgOiBgU3RyaXAgJHtpKzF9YDsKICAgICAgICAgIHRvYXN0KGAke2xibH06ICR7Zm10TXMoZWxhcHNlZE1zKX1gKTsKICAgICAgICAgIGNvbnN0IGRjID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZmLWRldGVjdC1jb3VudCcpOwogICAgICAgICAgaWYgKGRjKSBkYy50ZXh0Q29udGVudCA9IGAke3ZmRGV0ZWN0aW9ucy5sZW5ndGh9LyR7Tn1gOwogICAgICAgIH0KICAgICAgfQogICAgICB2ZkxpdmVQcmV2W2ldID0gczsKICAgIH0KICAgIGlmICh2ZkxhbmVGb3VuZC5ldmVyeShCb29sZWFuKSkgewogICAgICB2ZkxpdmVTdGF0ZSA9ICdkb25lJzsKICAgICAgdmZTZXRTdGF0dXMoJ1x1MjcxMyBBbGwgZG9uZScsICcjMjJjNTVlJyk7CiAgICAgIHJldHVybjsKICAgIH0KICB9CiAgdmZMaXZlUmFmSWQgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUodmZMaXZlRnJhbWUpOwp9CgovLyBEcmF3IGNhbWVyYSBmcmFtZSArIGxhbmUgZGl2aWRlcnMgb250byB2aXNpYmxlIGNhbnZhcwpmdW5jdGlvbiB2ZkRyYXdPdmVybGF5KG9mZnNjciwgc3JjQ3R4KSB7CiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZmLWxpdmUtY2FudmFzJyk7CiAgaWYgKCFjYW52YXMpIHJldHVybjsKICBjYW52YXMud2lkdGggPSBvZmZzY3Iud2lkdGg7IGNhbnZhcy5oZWlnaHQgPSBvZmZzY3IuaGVpZ2h0OwogIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpOwogIGN0eC5kcmF3SW1hZ2Uob2Zmc2NyLCAwLCAwKTsKICBjb25zdCBOID0gdmZMYW5lQ291bnQsIHcgPSBjYW52YXMud2lkdGgsIGggPSBjYW52YXMuaGVpZ2h0OwogIGN0eC5zYXZlKCk7CiAgY3R4LmxpbmVXaWR0aCA9IDI7CiAgY3R4LmZvbnQgPSBgYm9sZCAke01hdGgubWF4KDEyLCBNYXRoLmZsb29yKGgvMjApKX1weCBzYW5zLXNlcmlmYDsKICBmb3IgKGxldCBpPTA7IGk8TjsgaSsrKSB7CiAgICBjb25zdCBmb3VuZCA9IHZmTGFuZUZvdW5kW2ldOwogICAgY3R4LnN0cm9rZVN0eWxlID0gZm91bmQgPyAncmdiYSgzNCwxOTcsOTQsMC44KScgOiAncmdiYSgyMCwxODQsMTY2LDAuNiknOwogICAgY3R4LmZpbGxTdHlsZSAgID0gZm91bmQgPyAncmdiYSgzNCwxOTcsOTQsMC45NSknOiAncmdiYSgyMCwxODQsMTY2LDAuOSknOwogICAgaWYgKHZmTW9kZSA9PT0gJ3N3aW0nKSB7CiAgICAgIGNvbnN0IHggPSBNYXRoLnJvdW5kKGkgKiB3IC8gTik7CiAgICAgIGlmIChpPjApIHsgY3R4LmJlZ2luUGF0aCgpOyBjdHgubW92ZVRvKHgsMCk7IGN0eC5saW5lVG8oeCxoKTsgY3R4LnN0cm9rZSgpOyB9CiAgICAgIGN0eC5maWxsVGV4dChgTCR7aSsxfWAsIHgrNCwgMjIpOwogICAgfSBlbHNlIHsKICAgICAgY29uc3QgeSA9IE1hdGgucm91bmQoaSAqIGggLyBOKTsKICAgICAgaWYgKGk+MCkgeyBjdHguYmVnaW5QYXRoKCk7IGN0eC5tb3ZlVG8oMCx5KTsgY3R4LmxpbmVUbyh3LHkpOyBjdHguc3Ryb2tlKCk7IH0KICAgICAgY3R4LmZpbGxUZXh0KGBMJHtpKzF9YCwgNiwgeSsyMik7CiAgICB9CiAgfQogIGN0eC5yZXN0b3JlKCk7Cn0KCi8vIOKUgOKUgCBQaXhlbCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAovLyBTYW1wbGUgYSB2ZXJ0aWNhbCBzdHJpcCAoc3dpbTogY2FtZXJhIGF0IGVuZCB3YWxsKQpmdW5jdGlvbiB2ZlNhbXBsZVN0cmlwKGN0eCwgY2FudmFzVywgY2FudmFzSCwgc3RyaXBJZHgsIG51bVN0cmlwcykgewogIGNvbnN0IHN3ID0gTWF0aC5tYXgoMSwgTWF0aC5mbG9vcihjYW52YXNXIC8gbnVtU3RyaXBzKSk7CiAgY29uc3QgeCAgPSBNYXRoLm1pbihzdHJpcElkeCAqIHN3LCBjYW52YXNXIC0gMSk7CiAgY29uc3QgZGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoeCwgMCwgc3csIGNhbnZhc0gpLmRhdGE7CiAgY29uc3Qgb3V0ID0gW107CiAgZm9yIChsZXQgaT0wO2k8ZGF0YS5sZW5ndGg7aSs9MjApIG91dC5wdXNoKChkYXRhW2ldKjc3K2RhdGFbaSsxXSoxNTArZGF0YVtpKzJdKjI5KT4+OCk7CiAgcmV0dXJuIG91dDsKfQovLyBTYW1wbGUgYSBob3Jpem9udGFsIGJhbmQgKHRyYWNrOiBjYW1lcmEgYXQgc2lkZSBvZiBmaW5pc2ggbGluZSkKZnVuY3Rpb24gdmZTYW1wbGVIU3RyaXAoY3R4LCBjYW52YXNXLCBjYW52YXNILCBzdHJpcElkeCwgbnVtU3RyaXBzKSB7CiAgY29uc3Qgc2ggPSBNYXRoLm1heCgxLCBNYXRoLmZsb29yKGNhbnZhc0ggLyBudW1TdHJpcHMpKTsKICBjb25zdCB5ICA9IE1hdGgubWluKHN0cmlwSWR4ICogc2gsIGNhbnZhc0ggLSAxKTsKICBjb25zdCBkYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCB5LCBjYW52YXNXLCBzaCkuZGF0YTsKICBjb25zdCBvdXQgPSBbXTsKICBmb3IgKGxldCBpPTA7aTxkYXRhLmxlbmd0aDtpKz0yMCkgb3V0LnB1c2goKGRhdGFbaV0qNzcrZGF0YVtpKzFdKjE1MCtkYXRhW2krMl0qMjkpPj44KTsKICByZXR1cm4gb3V0Owp9CmZ1bmN0aW9uIHZmUGl4ZWxEaWZmKGEsYikgewogIGlmICghYXx8IWJ8fGEubGVuZ3RoIT09Yi5sZW5ndGgpIHJldHVybiAwOwogIGxldCBzPTA7IGZvciAobGV0IGk9MDtpPGEubGVuZ3RoO2krKykgcys9TWF0aC5hYnMoYVtpXS1iW2ldKTsKICByZXR1cm4gcy9hLmxlbmd0aDsKfQoKLy8g4pSA4pSAIFJlc3VsdHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIHZmUmVuZGVyRGV0ZWN0aW9ucygpIHsKICBjb25zdCBsaXN0ICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1tYXJrLWxpc3QnKTsKICBpZiAoIXZmRGV0ZWN0aW9ucy5sZW5ndGgpIHsKICAgIGxpc3QuaW5uZXJIVE1MPSc8ZGl2IGNsYXNzPSJ0ZXh0LW11dGVkIHRleHQtc20gdGV4dC1jZW50ZXIgbXQtOCI+Tm8gZmluaXNoZXMgeWV0PC9kaXY+JzsgcmV0dXJuOwogIH0KICBjb25zdCBwcm9nTiA9IHZmR2V0UHJvZ3Jlc3MoKTsKICBsaXN0LmlubmVySFRNTCA9IHZmRGV0ZWN0aW9ucy5tYXAoKGQsaSkgPT4gYAogICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtnYXA6OHB4O3BhZGRpbmc6MTBweCAwO2JvcmRlci1ib3R0b206MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7ZmxleC13cmFwOndyYXAiPgogICAgICA8c3BhbiBjbGFzcz0icGxhY2UtYmFkZ2UiPiR7b3JkaW5hbChkLnBsYWNlfHxpKzEpfTwvc3Bhbj4KICAgICAgJHtkLmxhbmUgPyBgPHNwYW4gc3R5bGU9ImNvbG9yOnZhcigtLWFjY2VudCk7Zm9udC13ZWlnaHQ6NzAwO21pbi13aWR0aDo1MnB4Ij5MYW5lICR7ZC5sYW5lfTwvc3Bhbj5gIDogJyd9CiAgICAgIDxzcGFuIHN0eWxlPSJmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjFyZW07bWluLXdpZHRoOjc2cHg7Zm9udC1mYW1pbHk6bW9ub3NwYWNlIj4ke2ZtdE1zKGQuZWxhcHNlZE1zKX08L3NwYW4+CiAgICAgICR7KGQucGxhY2V8fGkrMSkgPD0gcHJvZ04gPyAnPHNwYW4gc3R5bGU9ImJhY2tncm91bmQ6IzE2YTM0YTtjb2xvcjojZmZmO3BhZGRpbmc6MnB4IDhweDtib3JkZXItcmFkaXVzOjRweDtmb250LXNpemU6MC43cmVtO2ZvbnQtd2VpZ2h0OjcwMCI+UFJPR1JFU1NFUzwvc3Bhbj4nIDogJyd9CiAgICAgICR7ZC5zdGlsbCA/IGA8aW1nIHNyYz0iJHtkLnN0aWxsfSIgc3R5bGU9IndpZHRoOjYwcHg7aGVpZ2h0OjM0cHg7b2JqZWN0LWZpdDpjb3Zlcjtib3JkZXItcmFkaXVzOjRweDtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcikiPmAgOiAnJ30KICAgICAgPGJ1dHRvbiBjbGFzcz0idmYtbWFyay1idG4iIHN0eWxlPSJjb2xvcjp2YXIoLS1kYW5nZXIpO21hcmdpbi1sZWZ0OmF1dG8iIG9uY2xpY2s9InZmUmVtb3ZlKCR7aX0pIj4mI3gyNzE1OzwvYnV0dG9uPgogICAgPC9kaXY+YCkuam9pbignJyk7Cn0KZnVuY3Rpb24gdmZSZW1vdmUoaSkgewogIHZmRGV0ZWN0aW9ucy5zcGxpY2UoaSwxKTsKICB2ZkRldGVjdGlvbnMuZm9yRWFjaCgoZCxqKSA9PiBkLnBsYWNlPWorMSk7CiAgdmZSZW5kZXJEZXRlY3Rpb25zKCk7Cn0KCi8vIOKUgOKUgCBQdWJsaXNoIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAphc3luYyBmdW5jdGlvbiB2ZlB1Ymxpc2goKSB7CiAgaWYgKCF2ZkRldGVjdGlvbnMubGVuZ3RoKSB7IHRvYXN0KCdOb3RoaW5nIHRvIHB1Ymxpc2gnKTsgcmV0dXJuOyB9CiAgY29uc3QgcGF5bG9hZCA9IHt9OwogIHZmRGV0ZWN0aW9ucy5mb3JFYWNoKChkLGkpID0+IHsKICAgIGNvbnN0IGsgPSBkLmxhbmUgPyBTdHJpbmcoZC5sYW5lKSA6IGBwbGFjZV8ke2krMX1gOwogICAgcGF5bG9hZFtrXSA9IHsgcGxhY2U6ZC5wbGFjZXx8aSsxLCBlbGFwc2VkTXM6ZC5lbGFwc2VkTXMsIC4uLihkLmxhbmU/e2xhbmU6ZC5sYW5lfTp7fSkgfTsKICB9KTsKICBhd2FpdCBjUmVmKCdyYWNlL2N1cnJlbnQvdmlkZW9GaW5pc2gnKS5zZXQoewogICAgbWFya3M6cGF5bG9hZCwgbW9kZTp2Zk1vZGUsIGxhbmVzOnZmTGFuZUNvdW50LAogICAgb2Zmc2V0TXM6dmZHZXRPZmZzZXQoKSwgb2ZmbGluZU1vZGU6dmZPZmZsaW5lTW9kZSwKICAgIHJlY29yZGVkQnk6bXlOYW1lfHwnVmlkZW8gRmluaXNoJywKICAgIHB1Ymxpc2hlZEF0OmZpcmViYXNlLmRhdGFiYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUAogIH0pOwogIHRvYXN0KCdWaWRlbyBmaW5pc2ggdGltZXMgcHVibGlzaGVkIScpOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1wdWJsaXNoLWJ0bicpLmRpc2FibGVkID0gdHJ1ZTsKfQoKLy8g4pSA4pSAIENsZWFudXAg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIHZmRXhpdCgpIHsKICBpZiAodmZMaXZlUmFmSWQpIHsgY2FuY2VsQW5pbWF0aW9uRnJhbWUodmZMaXZlUmFmSWQpOyB2ZkxpdmVSYWZJZD1udWxsOyB9CiAgaWYgKHZmU3RyZWFtKSAgICB7IHZmU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2godD0+dC5zdG9wKCkpOyB2ZlN0cmVhbT1udWxsOyB9CiAgdmZMaXZlU3RhdGU9J2lkbGUnOyB2ZkRldGVjdGlvbnM9W107CiAgZW50ZXJSb2xlKCdyb2xlJyk7Cn0KLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIERFTU8gLyBTRUVECi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAphc3luYyBmdW5jdGlvbiBfc2VlZFRlc3RDYXJuaXZhbCgpIHsKICBjb25zdCBub3cgPSBEYXRlLm5vdygpOwoKICAvLyBQcmUtc2VlZCAzIHB1Ymxpc2hlZCByZXN1bHRzIHNvIFJlc3VsdHMgQm9hcmQgc2hvd3MgY29udGVudCBpbW1lZGlhdGVseQogIGFzeW5jIGZ1bmN0aW9uIHB1YihrZXksIG9iaikgewogICAgdHJ5IHsgYXdhaXQgY1JlZigncmVzdWx0cy8nICsgZmJFbmMoa2V5KSkuc2V0KG9iaik7IH0gY2F0Y2goZSkge30KICB9CgogIGF3YWl0IHB1YignMTIvMTMgWWVhcnMtQm95cy0xMDBtIFNwcmludC1zZWVkMDAxJywgewogICAgdHlwZTonbGFuZScsIGFnZTonMTIvMTMgWWVhcnMnLCBnZW5kZXI6J0JveXMnLCBldmVudDonMTAwbSBTcHJpbnQnLAogICAgcmFjZUlkOidzZWVkMDAxJywKICAgIHJlc3VsdHM6WwogICAgICB7cGxhY2U6MSwgbGFuZTozLCBuYW1lOidUb20gQnJhZHknLCAgICB0aW1lTXM6MTIzNDB9LAogICAgICB7cGxhY2U6MiwgbGFuZToxLCBuYW1lOidKYWtlIE1pbGxzJywgICB0aW1lTXM6MTI1ODB9LAogICAgICB7cGxhY2U6MywgbGFuZTo1LCBuYW1lOidBbGV4IENhcnRlcicsICB0aW1lTXM6MTI3OTB9LAogICAgICB7cGxhY2U6NCwgbGFuZToyLCBuYW1lOidSeWFuIFNtaXRoJywgICB0aW1lTXM6MTMwMjB9LAogICAgICB7cGxhY2U6NSwgbGFuZTo0LCBuYW1lOidDaHJpcyBMZWUnLCAgICB0aW1lTXM6MTM0NTB9CiAgICBdLAogICAgcHVibGlzaGVkQXQ6IG5vdyAtIDYwMDAwMAogIH0pOwoKICBhd2FpdCBwdWIoJzEwIFllYXJzLUdpcmxzLTUwbSBGcmVlc3R5bGUtc2VlZDAwMicsIHsKICAgIHR5cGU6J2xhbmUnLCBhZ2U6JzEwIFllYXJzJywgZ2VuZGVyOidHaXJscycsIGV2ZW50Oic1MG0gRnJlZXN0eWxlJywKICAgIHJhY2VJZDonc2VlZDAwMicsCiAgICByZXN1bHRzOlsKICAgICAge3BsYWNlOjEsIGxhbmU6NCwgbmFtZTonRW1tYSBXaWxzb24nLCAgIHRpbWVNczozNDIxMH0sCiAgICAgIHtwbGFjZToyLCBsYW5lOjIsIG5hbWU6J1NvcGhpZSBDaGVuJywgICB0aW1lTXM6MzQ4OTB9LAogICAgICB7cGxhY2U6MywgbGFuZTo1LCBuYW1lOidMaWx5IFRob21wc29uJywgdGltZU1zOjM1NDIwfSwKICAgICAge3BsYWNlOjQsIGxhbmU6MSwgbmFtZTonQXZhIFJvYmVydHMnLCAgIHRpbWVNczozNjEwMH0KICAgIF0sCiAgICBwdWJsaXNoZWRBdDogbm93IC0gMzAwMDAwCiAgfSk7CgogIGF3YWl0IHB1YigneGMtT3Blbi1NaXhlZC0za20gQ3Jvc3MgQ291bnRyeS1zZWVkMDAzJywgewogICAgdHlwZToneGMnLCBhZ2U6J09wZW4nLCBnZW5kZXI6J01peGVkJywgZXZlbnQ6JzNrbSBDcm9zcyBDb3VudHJ5JywKICAgIHJhY2VJZDonc2VlZDAwMycsCiAgICBwbGFjZXM6WwogICAgICB7cGxhY2U6MSwgbmFtZTonSm9yZGFuIEJsYWtlJywgIGVsYXBzZWRNczo3NDIwMDB9LAogICAgICB7cGxhY2U6MiwgbmFtZTonU2FtIEFobWVkJywgICAgIGVsYXBzZWRNczo3NTQwMDB9LAogICAgICB7cGxhY2U6MywgbmFtZTonQ2FzZXkgTW9yZ2FuJywgIGVsYXBzZWRNczo3NjEwMDB9LAogICAgICB7cGxhY2U6NCwgbmFtZTonUmlsZXkgSm9obnNvbicsIGVsYXBzZWRNczo3NzgwMDB9LAogICAgICB7cGxhY2U6NSwgbmFtZTonVGF5bG9yIFdoaXRlJywgIGVsYXBzZWRNczo3OTUwMDB9CiAgICBdLAogICAgcHVibGlzaGVkQXQ6IG5vdyAtIDEyMDAwMAogIH0pOwoKICAvLyBBcm1lZCB0cmFjayByYWNlICgyMDBtIFNwcmludCkgd2l0aCBnaG9zdCBzcGxpdHMgZnJvbSAyIHZpcnR1YWwgdGltZXJzCiAgLy8g4oaSIGFkbWluIHNlZXMgbXVsdGktdGltZXIgYXZlcmFnaW5nIGluIFJhY2UgQ29udHJvbCBkb25lIHBhbmVsIEFORCBSZXN1bHRzIEJvYXJkCiAgY29uc3Qgc2VlZDAwNFNwbGl0cyA9IHsKICAgIDE6eyB0X2dob3N0MTp7ZWxhcHNlZE1zOjI3NDUwfSwgdF9naG9zdDI6e2VsYXBzZWRNczoyNzQ4MH0gfSwKICAgIDI6eyB0X2dob3N0MTp7ZWxhcHNlZE1zOjI3ODIwfSwgdF9naG9zdDI6e2VsYXBzZWRNczoyNzg1MH0gfSwKICAgIDM6eyB0X2dob3N0MTp7ZWxhcHNlZE1zOjI4MTAwfSwgdF9naG9zdDI6e2VsYXBzZWRNczoyODEzMH0gfSwKICAgIDQ6eyB0X2dob3N0MTp7ZWxhcHNlZE1zOjI4NDUwfSwgdF9naG9zdDI6e2VsYXBzZWRNczoyODQ3MH0gfSwKICAgIDU6eyB0X2dob3N0MTp7ZWxhcHNlZE1zOjI4OTAwfSwgdF9naG9zdDI6e2VsYXBzZWRNczoyODkyMH0gfSwKICAgIDY6eyB0X2dob3N0MTp7ZWxhcHNlZE1zOjI5MjAwfSwgdF9naG9zdDI6e2VsYXBzZWRNczoyOTIzMH0gfQogIH07CiAgY29uc3Qgc2VlZDAwNExhbmVzID0gewogICAgMTp7bmFtZTonU2FtIEFobWVkJ30sICAgMjp7bmFtZTonSm9yZGFuIEJsYWtlJ30sCiAgICAzOntuYW1lOidDYXNleSBNb3JnYW4nfSw0OntuYW1lOidSaWxleSBKb2huc29uJ30sCiAgICA1OntuYW1lOidUYXlsb3IgV2hpdGUnfSw2OntuYW1lOidBbGV4IENhcnRlcid9CiAgfTsKICBhd2FpdCBjUmVmKCdyYWNlL2N1cnJlbnQnKS5zZXQoewogICAgcmFjZUlkOidzZWVkMDA0JywgYWdlOicxMSBZZWFycycsIGdlbmRlcjonTWl4ZWQnLCBldmVudDonMjAwbSBTcHJpbnQnLAogICAgc3RhdGU6J2RvbmUnLCBhcm1lZEF0OiBub3cgLSA5MDAwMCwgc3RhcnRlZEF0U2VydmVyOiBub3cgLSAzMDAwMCwKICAgIGxhbmVzOiBzZWVkMDA0TGFuZXMsIHNwbGl0czogc2VlZDAwNFNwbGl0cwogIH0pOwogIC8vIEFsc28gcHVibGlzaCBhdmVyYWdlZCB0aW1lcyB0byByZXN1bHRzLyBzbyBSZXN1bHRzIEJvYXJkIHNob3dzIHRoZW0KICBjb25zdCBzZWVkMDA0UmVzdWx0cyA9IE9iamVjdC5lbnRyaWVzKHNlZWQwMDRTcGxpdHMpLm1hcCgoW2xhbmUsIHRpbWVyU3BsaXRzXSkgPT4gewogICAgY29uc3QgdmFscyA9IE9iamVjdC52YWx1ZXModGltZXJTcGxpdHMpLm1hcChzID0+IHMuZWxhcHNlZE1zKTsKICAgIGNvbnN0IG1lYW4gPSB2YWxzLnJlZHVjZSgoYSxiKSA9PiBhK2IsIDApIC8gdmFscy5sZW5ndGg7CiAgICByZXR1cm4geyBsYW5lOiBwYXJzZUludChsYW5lKSwgbmFtZTogc2VlZDAwNExhbmVzW2xhbmVdPy5uYW1lIHx8ICgnTGFuZSAnK2xhbmUpLCB0aW1lTXM6IE1hdGgucm91bmQobWVhbikgfTsKICB9KS5zb3J0KChhLGIpID0+IGEudGltZU1zIC0gYi50aW1lTXMpLm1hcCgocixpKSA9PiAoey4uLnIsIHBsYWNlOiBpKzF9KSk7CiAgYXdhaXQgcHViKCcxMSBZZWFycy1NaXhlZC0yMDBtIFNwcmludC1zZWVkMDA0JywgewogICAgdHlwZTonbGFuZScsIGFnZTonMTEgWWVhcnMnLCBnZW5kZXI6J01peGVkJywgZXZlbnQ6JzIwMG0gU3ByaW50JywKICAgIHJhY2VJZDonc2VlZDAwNCcsIHJlc3VsdHM6IHNlZWQwMDRSZXN1bHRzLCBwdWJsaXNoZWRBdDogbm93IC0gMjUwMDAKICB9KTsKCiAgLy8gQXJtZWQgWEMgcmFjZSByZWFkeSB0byB1c2UgaW1tZWRpYXRlbHkKICBhd2FpdCBjUmVmKCd4Yy9jdXJyZW50Jykuc2V0KHsKICAgIHJhY2VJZDonc2VlZDAwNScsIGFnZTonMTIvMTMgWWVhcnMnLCBnZW5kZXI6J01peGVkJywgZXZlbnQ6J0Nyb3NzIENvdW50cnkgMmttJywKICAgIHN0YXRlOidhcm1lZCcsIGZpbmlzaGVzOnt9LCBhcm1lZEF0OiBub3cKICB9KTsKfQoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIFVSTCBERUVQLUxJTksgSU5JVAovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKKGFzeW5jIGZ1bmN0aW9uIGluaXRGcm9tVVJMKCkgewogIGNvbnN0IHAgICAgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7CiAgY29uc3QgY29kZSA9IChwLmdldCgnY29kZScpIHx8ICcnKS50cmltKCkudG9VcHBlckNhc2UoKTsKICBjb25zdCBuYW1lID0gKHAuZ2V0KCduYW1lJykgfHwgJycpLnRyaW0oKTsKICBjb25zdCByb2xlID0gKHAuZ2V0KCdyb2xlJykgfHwgJycpLnRyaW0oKTsKICBjb25zdCBzZWVkID0gcC5nZXQoJ3NlZWQnKSA9PT0gJzEnOwogIGlmICghY29kZSB8fCBjb2RlLmxlbmd0aCA8IDQpIHJldHVybjsKCiAgY2Fybml2YWxDb2RlID0gY29kZTsKICB0cnkgeyBhd2FpdCBfd3NSZWFkeTIoKTsgfSBjYXRjaChlKSB7fQoKICBjb25zdCBzbmFwID0gYXdhaXQgY1JlZignbWV0YScpLm9uY2UoJ3ZhbHVlJyk7CiAgbGV0IGlzTmV3ID0gZmFsc2U7CiAgaWYgKCFzbmFwLmV4aXN0cygpKSB7CiAgICBpZiAoc2VlZCB8fCBjb2RlLnN0YXJ0c1dpdGgoJ0RFTU8nKSkgewogICAgICBjYXJuaXZhbE1ldGEgPSB7CiAgICAgICAgc2Nob29sOidXZXN0c2lkZSBBdGhsZXRpY3MnLCBuYW1lOidUZXN0IENhcm5pdmFsIDIwMjYnLAogICAgICAgIHNwb3J0OidtaXhlZCcsIGNyZWF0ZWRBdDogRGF0ZS5ub3coKSwKICAgICAgICBleHBpcmVzQXQ6IERhdGUubm93KCkgKyA3KjI0KjM2MDAqMTAwMAogICAgICB9OwogICAgICBhd2FpdCBjUmVmKCdtZXRhJykuc2V0KGNhcm5pdmFsTWV0YSk7CiAgICAgIGlzTmV3ID0gdHJ1ZTsKICAgIH0KICB9IGVsc2UgewogICAgY2Fybml2YWxNZXRhID0gc25hcC52YWwoKTsKICB9CgogIGlmIChpc05ldyAmJiBzZWVkKSB7CiAgICB0cnkgeyBhd2FpdCBfc2VlZFRlc3RDYXJuaXZhbCgpOyB9IGNhdGNoKGUpIHsgY29uc29sZS53YXJuKCdTZWVkIGZhaWxlZDonLCBlKTsgfQogIH0KCiAgbXlOYW1lID0gbmFtZTsKICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmxfbmFtZScsIG5hbWUpOyB9IGNhdGNoKGUpe30KICB0cnkgeyBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZmxfbGFzdF9jb2RlJywgY29kZSk7IH0gY2F0Y2goZSl7fQoKICAvLyBJZiByb2xlPW9ic2VydmVyLCBnbyBzdHJhaWdodCBpbiDigJQgbm8gbmFtZSBuZWVkZWQKICBpZiAocm9sZSA9PT0gJ29ic2VydmVyJykgewogICAgZW50ZXJSb2xlKCdvYnNlcnZlcicpOwogICAgcmV0dXJuOwogIH0KICBzaG93Um9sZVBpY2tlcigpOwoKICBpZiAocm9sZSkgewogICAgc2V0VGltZW91dCgoKSA9PiB7CiAgICAgIGlmIChyb2xlID09PSAndGltZXInKSB7CiAgICAgICAgZW50ZXJSb2xlKCd0aW1lcicpOwogICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyB0cnkgeyBlbnRlclRpbWVyTGFuZSgxKTsgfSBjYXRjaChlKXt9IH0sIDIwMCk7CiAgICAgIH0gZWxzZSB7CiAgICAgICAgdHJ5IHsgZW50ZXJSb2xlKHJvbGUpOyB9IGNhdGNoKGUpIHt9CiAgICAgIH0KICAgIH0sIDIwMCk7CiAgfQp9KSgpOwoKLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIFNIQVJFIE1PREFMCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkApmdW5jdGlvbiBpbml0UmVzdWx0c1ZpZXcoKSB7CiAgd2F0Y2hDb25uKCdvYnNlcnZlci1kb3QnKTsgIC8vIHJldXNlIG9ic2VydmVyIGRvdCBpZiBwcmVzZW50CiAgY29uc3QgcmVzUmVmID0gY1JlZigncmVzdWx0cycpOwogIHJlc1JlZi5vbigndmFsdWUnLCBzbmFwID0+IHsKICAgIGNvbnN0IGRhdGEgPSBzbmFwLnZhbCgpOwogICAgY29uc3QgZWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN1bHRzLWFsbCcpOwogICAgaWYgKCFlbCkgcmV0dXJuOwogICAgaWYgKCFkYXRhIHx8ICFPYmplY3Qua2V5cyhkYXRhKS5sZW5ndGgpIHsKICAgICAgZWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9InRleHQtbXV0ZWQgdGV4dC1jZW50ZXIgbXQtMzIiPk5vIHJlc3VsdHMgcHVibGlzaGVkIHlldC48L2Rpdj4nOwogICAgICByZXR1cm47CiAgICB9CiAgICBjb25zdCBldmVudHMgPSBPYmplY3QudmFsdWVzKGRhdGEpLnNvcnQoKGEsYikgPT4gKGIucHVibGlzaGVkQXR8fDApIC0gKGEucHVibGlzaGVkQXR8fDApKTsKICAgIGVsLmlubmVySFRNTCA9IGV2ZW50cy5tYXAoZXYgPT4gewogICAgICBjb25zdCBpc1hDICA9IGV2LnR5cGUgPT09ICd4Yyc7CiAgICAgIGNvbnN0IHBsYWNlcyA9IGlzWEMgPyAoZXYucGxhY2VzfHxbXSkgOiAoZXYucmVzdWx0c3x8W10pOwogICAgICBjb25zdCByb3dzICAgPSBwbGFjZXMubWFwKChyLGkpID0+IHsKICAgICAgICBjb25zdCBpc0RRID0gIWlzWEMgJiYgci5kcTsKICAgICAgICBjb25zdCBwb3MgID0gaXNYQyA/IHIucGxhY2UgOiAoaXNEUSA/IG51bGwgOiAoaSsxKSk7CiAgICAgICAgY29uc3QgbmFtZSA9IHIubmFtZSB8fCAoaXNYQyA/ICcnIDogYExhbmUgJHtyLmxhbmV9YCk7CiAgICAgICAgY29uc3QgdGltZSA9IGZtdFNlYyhpc1hDID8gci5lbGFwc2VkTXMgOiByLnRpbWVNcyk7CiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPSJsYW5lLXJvdyIgc3R5bGU9InBhZGRpbmc6NnB4IDRweDske2lzRFE/J29wYWNpdHk6LjQ1JzonJ30iID4KICAgICAgICAgIDxkaXYgY2xhc3M9Im1lZGFsICR7aXNEUT8ncE4nOm1lZGFsQ2xzKHBvcyl9IiBzdHlsZT0iJHtpc0RRPydiYWNrZ3JvdW5kOnZhcigtLXdhcm4pO2NvbG9yOiNmZmYnOicnfSI+JHtpc0RRPydEUSc6KHBvcyl9PC9kaXY+CiAgICAgICAgICA8ZGl2IGNsYXNzPSJsYW5lLW5hbWUiPiR7bmFtZX08L2Rpdj4KICAgICAgICAgIDxkaXYgY2xhc3M9ImxhbmUtdGltZSBmb250LW1vbm8iPiR7aXNEUT8n4oCUJzp0aW1lfTwvZGl2PgogICAgICAgIDwvZGl2PmA7CiAgICAgIH0pLmpvaW4oJycpOwogICAgICByZXR1cm4gYDxkaXYgY2xhc3M9ImNhcmQiIHN0eWxlPSJtYXJnaW4tYm90dG9tOjhweCI+CiAgICAgICAgPGRpdiBjbGFzcz0iY2FyZC10aXRsZSIgc3R5bGU9ImZvbnQtc2l6ZTouOHJlbTtjb2xvcjp2YXIoLS1tdXRlZCkiPgogICAgICAgICAgJHtldi5hZ2V8fCcnfSAke2V2LmdlbmRlcnx8Jyd9IMK3ICR7ZXYuZXZlbnR8fCcnfQogICAgICAgIDwvZGl2PgogICAgICAgICR7cm93cyB8fCAnPGRpdiBjbGFzcz0idGV4dC1tdXRlZCB0ZXh0LXNtIj5ObyB0aW1lcyByZWNvcmRlZDwvZGl2Pid9CiAgICAgIDwvZGl2PmA7CiAgICB9KS5qb2luKCcnKTsKICB9KTsKICBhY3RpdmVMaXN0ZW5lcnMucHVzaCgoKT0+cmVzUmVmLm9mZigpKTsKfQoKZnVuY3Rpb24gc2hvd1NoYXJlUGFnZSgpIHsKICAvLyBQb3B1bGF0ZSBzaGFyZSBzY3JlZW4gKGpvaW4gUVIgZm9yIHBhcnRpY2lwYW50cykKICBjb25zdCBqb2luVXJsID0gYCR7bG9jYXRpb24ub3JpZ2lufS8/Y29kZT0ke2Nhcm5pdmFsQ29kZX1gOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZS1zY2hvb2wtbmFtZScpLnRleHRDb250ZW50ID0KICAgIGNhcm5pdmFsTWV0YT8uc2Nob29sIHx8ICdKb2luIFBhZ2UnOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZS1jYXJuaXZhbC1uYW1lJykudGV4dENvbnRlbnQgPQogICAgY2Fybml2YWxNZXRhPy5uYW1lIHx8ICcnOwogIGNvbnN0IGNvZGVFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaGFyZS1qb2luLWNvZGUnKTsKICBpZiAoY29kZUVsKSBjb2RlRWwudGV4dENvbnRlbnQgPSBjYXJuaXZhbENvZGU7CgogIHNob3dTY3JlZW4oJ3NoYXJlJyk7CgogIGNvbnN0IHFyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUtcXInKTsKICBpZiAocXJFbCAmJiB0eXBlb2YgUVJDb2RlICE9PSAndW5kZWZpbmVkJykgewogICAgcXJFbC5pbm5lckhUTUwgPSAnJzsKICAgIG5ldyBRUkNvZGUocXJFbCwgeyB0ZXh0OiBqb2luVXJsLCB3aWR0aDogMTY0LCBoZWlnaHQ6IDE2NCwKICAgICAgY29sb3JEYXJrOiAnIzAwMDAwMCcsIGNvbG9yTGlnaHQ6ICcjZmZmZmZmJyB9KTsKICB9Cn0KCmZ1bmN0aW9uIHNob3dTaGFyZU1vZGFsKCkgewogIGNvbnN0IHVybCA9IGAke2xvY2F0aW9uLm9yaWdpbn0vP2NvZGU9JHtjYXJuaXZhbENvZGV9JnJvbGU9b2JzZXJ2ZXJgOwogIGNvbnN0IGV4aXN0aW5nID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NoYXJlLW1vZGFsJyk7CiAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKTsKCiAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTsKICBtb2RhbC5pZCA9ICdzaGFyZS1tb2RhbCc7CiAgbW9kYWwuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDtpbnNldDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNyk7ei1pbmRleDoxMDAwMDtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzoxNnB4JzsKICBtb2RhbC5pbm5lckhUTUwgPSBgCiAgICA8ZGl2IHN0eWxlPSJiYWNrZ3JvdW5kOnZhcigtLXN1cmZhY2UpO2JvcmRlci1yYWRpdXM6MTZweDtwYWRkaW5nOjI0cHg7bWF4LXdpZHRoOjM0MHB4O3dpZHRoOjEwMCU7dGV4dC1hbGlnbjpjZW50ZXIiPgogICAgICA8ZGl2IHN0eWxlPSJmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEuMXJlbTttYXJnaW4tYm90dG9tOjRweCI+U2hhcmUgUmVzdWx0czwvZGl2PgogICAgICA8ZGl2IHN0eWxlPSJjb2xvcjp2YXIoLS1tdXRlZCk7Zm9udC1zaXplOi44NXJlbTttYXJnaW4tYm90dG9tOjE2cHgiPlBhcmVudHMgc2NhbiB0byBmb2xsb3cgbGl2ZSByZXN1bHRzPC9kaXY+CiAgICAgIDxkaXYgaWQ9InNoYXJlLXFyIiBzdHlsZT0iZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpjZW50ZXI7bWFyZ2luLWJvdHRvbToxNnB4Ij48L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0iZm9udC1mYW1pbHk6bW9ub3NwYWNlO2ZvbnQtc2l6ZTouNzVyZW07d29yZC1icmVhazpicmVhay1hbGw7YmFja2dyb3VuZDp2YXIoLS1iZyk7cGFkZGluZzo4cHggMTBweDtib3JkZXItcmFkaXVzOjhweDttYXJnaW4tYm90dG9tOjEycHg7Y3Vyc29yOnBvaW50ZXIiCiAgICAgICAgICAgb25jbGljaz0ibmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoJyR7dXJsfScpLnRoZW4oKCk9PnRvYXN0KCdMaW5rIGNvcGllZCEnKSkiPiR7dXJsfTwvZGl2PgogICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9IndpZHRoOjEwMCU7bWFyZ2luLWJvdHRvbTo4cHgiCiAgICAgICAgb25jbGljaz0ibmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoJyR7dXJsfScpLnRoZW4oKCk9PnRvYXN0KCdDb3BpZWQhJykpIj5Db3B5IExpbms8L2J1dHRvbj4KICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJ3aWR0aDoxMDAlIiBvbmNsaWNrPSJkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUtbW9kYWwnKS5yZW1vdmUoKSI+Q2xvc2U8L2J1dHRvbj4KICAgIDwvZGl2PmA7CiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChtb2RhbCk7CiAgbW9kYWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHsgaWYgKGUudGFyZ2V0ID09PSBtb2RhbCkgbW9kYWwucmVtb3ZlKCk7IH0pOwoKICAvLyBHZW5lcmF0ZSBRUgogIGNvbnN0IHFyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2hhcmUtcXInKTsKICBpZiAocXJFbCAmJiB0eXBlb2YgUVJDb2RlICE9PSAndW5kZWZpbmVkJykgewogICAgbmV3IFFSQ29kZShxckVsLCB7IHRleHQ6IHVybCwgd2lkdGg6IDE2MCwgaGVpZ2h0OiAxNjAsIGNvbG9yRGFyazonIzAwMCcsIGNvbG9yTGlnaHQ6JyNmZmYnIH0pOwogIH0KfQoKPC9zY3JpcHQ+Cgo8ZGl2IGlkPSJjdC1mb290ZXIiIHN0eWxlPSJwb3NpdGlvbjpmaXhlZDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMTMsMjcsNjIsMC45Mik7YmFja2Ryb3AtZmlsdGVyOmJsdXIoNnB4KTtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNSk7Zm9udC1zaXplOjExcHg7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo2cHggMTZweDt6LWluZGV4OjEwMDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjtnYXA6MTZweDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC13cmFwOndyYXA7Ij4KICA8c3Bhbj7CqSAyMDI2IEx1Y2sgRHJhZ29uIFB0eSBMdGQ8L3NwYW4+CiAgPHNwYW4+wrc8L3NwYW4+CiAgPGEgaHJlZj0iaHR0cHM6Ly9zY2hvb2xzcG9ydHBvcnRhbC5jb20uYXUvcHJpdmFjeSIgc3R5bGU9ImNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC41KTt0ZXh0LWRlY29yYXRpb246bm9uZTsiIHRhcmdldD0iX2JsYW5rIj5Qcml2YWN5PC9hPgogIDxzcGFuPsK3PC9zcGFuPgogIDxhIGhyZWY9Imh0dHBzOi8vc2Nob29sc3BvcnRwb3J0YWwuY29tLmF1IiBzdHlsZT0iY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjUpO3RleHQtZGVjb3JhdGlvbjpub25lOyIgdGFyZ2V0PSJfYmxhbmsiPlNjaG9vbCBTcG9ydCBQb3J0YWw8L2E+CiAgPHNwYW4+wrc8L3NwYW4+CiAgPGEgaHJlZj0iaHR0cHM6Ly9zcG9ydGNhcm5pdmFsLmNvbS5hdS93ZDI2IiBzdHlsZT0iY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjUpO3RleHQtZGVjb3JhdGlvbjpub25lOyIgdGFyZ2V0PSJfYmxhbmsiPkNhcm5pdmFsIFBsYW5uZXI8L2E+CjwvZGl2Pgo8c2NyaXB0IGRlZmVyIHNyYz0iaHR0cHM6Ly9zdGF0aWMuY2xvdWRmbGFyZWluc2lnaHRzLmNvbS9iZWFjb24ubWluLmpzL3Y4Yzc4ZGY3YzdjMGY0ODQ0OTdlY2JjYTcwNDY2NDRkYTE3NzE1MjMxMjQ1MTYiIGludGVncml0eT0ic2hhNTEyLThEUzdyZ0lyQW1naEJGd29PVHVqY2Y2RDlyWHZIOHhtOEpRMUphMDFoOVFYOEV6WGxkaXN6dWZZYTRJRmZLZExVS1RUcm5TRlhMRGtVRU9UclpROFFnPT0iIGRhdGEtY2YtYmVhY29uPSd7InZlcnNpb24iOiIyMDI0LjExLjAiLCJ0b2tlbiI6IjZjZjhkMmUyOWMwZDQwYjc4ODRkZTNkMWE2MzJiMWM1IiwiciI6MSwic2VydmVyX3RpbWluZyI6eyJuYW1lIjp7ImNmQ2FjaGVTdGF0dXMiOnRydWUsImNmRWRnZSI6dHJ1ZSwiY2ZFeHRQcmkiOnRydWUsImNmTDQiOnRydWUsImNmT3JpZ2luIjp0cnVlLCJjZlNwZWVkQnJhaW4iOnRydWV9LCJsb2NhdGlvbl9zdGFydHN3aXRoIjpudWxsfX0nIGNyb3Nzb3JpZ2luPSJhbm9ueW1vdXMiPjwvc2NyaXB0PgoKPCEtLSDilZDilZDilZDilZAgWEMgQVVUTy1ERVRFQ1QgTElORSBTRVRVUCBPVkVSTEFZIOKVkOKVkOKVkOKVkCAtLT4KPGRpdiBpZD0ieGMtbGluZS1zZXR1cC1vdmVybGF5Ij4KICA8dmlkZW8gaWQ9InhjLXNldHVwLXZpZCIgYXV0b3BsYXkgcGxheXNpbmxpbmUgbXV0ZWQ+PC92aWRlbz4KICA8Y2FudmFzIGlkPSJ4Yy1saW5lLWNhbnZhcy1vdmVybGF5Ij48L2NhbnZhcz4KICA8ZGl2IGlkPSJ4Yy1saW5lLWluc3RydWN0aW9uIj5UYXAgdGhlIExFRlQgZWRnZSBvZiB5b3VyIGZpbmlzaCBsaW5lPC9kaXY+CiAgPGRpdiBpZD0ieGMtbGluZS1zZXR1cC1idG5zIj4KICAgIDxidXR0b24gY2xhc3M9ImJ0biBidG4tc2Vjb25kYXJ5IiBzdHlsZT0iZmxleDoxIiBvbmNsaWNrPSJ4Y1Jlc2V0TGluZSgpIj7ihrogUmVzZXQ8L2J1dHRvbj4KICAgIDxidXR0b24gaWQ9InhjLXN0YXJ0LWRldGVjdC1idG4iIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiIHN0eWxlPSJmbGV4OjI7ZGlzcGxheTpub25lIiBvbmNsaWNrPSJ4Y1N0YXJ0RGV0ZWN0KCkiPuKWtiBTdGFydCBBdXRvLURldGVjdDwvYnV0dG9uPgogICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJmbGV4OjEiIG9uY2xpY2s9InhjQ2xvc2VMaW5lU2V0dXAoKSI+4pyVPC9idXR0b24+CiAgPC9kaXY+CjwvZGl2PgoKPHNjcmlwdCBzcmM9Imh0dHBzOi8vZmFsa29yLXdpZGdldC5sdWNrZHJhZ29uLmlvL3dpZGdldC5qcyIgZGF0YS1wcm9kdWN0PSJDYXJuaXZhbCBUaW1pbmciPjwvc2NyaXB0Pgo8L2JvZHk+CjwvaHRtbD48IS0tIHY4LjUuMCBuZXcgaGVscGVyIGZ1bmN0aW9ucyBpbmplY3RlZCBiZWxvdyA8L3NjcmlwdD4gdG8ga2VlcCBwYXRjaCBjbGVhbiAtLT4KPHNjcmlwdD4KLy8g4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQ4pWQCi8vIHY4LjUuMCBIRUxQRVJTCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAoKLy8g4pSA4pSAIFRBU0sgNTogR2VuZXJpYyBjb25maXJtIG1vZGFsIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApmdW5jdGlvbiBfY29uZmlybU1vZGFsKHRpdGxlLCBib2R5LCBjb25maXJtTGFiZWwpIHsKICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7CiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogICAgZWwuc3R5bGUuY3NzVGV4dCA9ICdwb3NpdGlvbjpmaXhlZDtpbnNldDowO2JhY2tncm91bmQ6cmdiYSgwLDAsMCwuNjUpO3otaW5kZXg6OTk5OTtkaXNwbGF5OmZsZXg7YWxpZ24taXRlbXM6Y2VudGVyO2p1c3RpZnktY29udGVudDpjZW50ZXI7cGFkZGluZzoxNnB4JzsKICAgIGVsLmlubmVySFRNTCA9IGAKICAgICAgPGRpdiBzdHlsZT0iYmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXItcmFkaXVzOjE2cHg7cGFkZGluZzoyNHB4O21heC13aWR0aDozMjBweDt3aWR0aDoxMDAlO3RleHQtYWxpZ246Y2VudGVyIj4KICAgICAgICA8ZGl2IHN0eWxlPSJmb250LXdlaWdodDo3MDA7Zm9udC1zaXplOjEuMDVyZW07bWFyZ2luLWJvdHRvbTo4cHgiPiR7dGl0bGV9PC9kaXY+CiAgICAgICAgPGRpdiBzdHlsZT0iY29sb3I6dmFyKC0tbXV0ZWQpO2ZvbnQtc2l6ZTowLjg1cmVtO21hcmdpbi1ib3R0b206MjBweCI+JHtib2R5fTwvZGl2PgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6MTBweCI+CiAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZsZXg6MSIgaWQ9Il9jb25mLWNhbmNlbCI+Q2FuY2VsPC9idXR0b24+CiAgICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiICAgc3R5bGU9ImZsZXg6MSIgaWQ9Il9jb25mLW9rIj4ke2NvbmZpcm1MYWJlbH08L2J1dHRvbj4KICAgICAgICA8L2Rpdj4KICAgICAgPC9kaXY+YDsKICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpOwogICAgZWwucXVlcnlTZWxlY3RvcignI19jb25mLWNhbmNlbCcpLm9uY2xpY2sgPSAoKSA9PiB7IGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWwpOyByZXNvbHZlKGZhbHNlKTsgfTsKICAgIGVsLnF1ZXJ5U2VsZWN0b3IoJyNfY29uZi1vaycpLm9uY2xpY2sgICAgID0gKCkgPT4geyBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsKTsgcmVzb2x2ZSh0cnVlKTsgIH07CiAgfSk7Cn0KCi8vIOKUgOKUgCBUQVNLIDY6IEd1biBjb3VudGRvd24gKyByZWNhbGlicmF0ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKbGV0IF9zdGFydGVyQ291bnRkb3duVGltZXIgPSBudWxsOwoKZnVuY3Rpb24gc3RhcnRlckd1bkNvdW50ZG93bigpIHsKICAvLyBDYW5jZWwgYW55IGV4aXN0aW5nCiAgaWYgKF9zdGFydGVyQ291bnRkb3duVGltZXIpIHsgY2xlYXJUaW1lb3V0KF9zdGFydGVyQ291bnRkb3duVGltZXIpOyBfc3RhcnRlckNvdW50ZG93blRpbWVyID0gbnVsbDsgfQoKICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGVsLmlkID0gJ3N0YXJ0ZXItZ3VuLW92ZXJsYXknOwogIGVsLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7aW5zZXQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjc1KTt6LWluZGV4Ojk5OTg7ZGlzcGxheTpmbGV4O2ZsZXgtZGlyZWN0aW9uOmNvbHVtbjthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtnYXA6MjBweCc7CiAgZWwuaW5uZXJIVE1MID0gYAogICAgPGRpdiBzdHlsZT0iZm9udC1zaXplOjVyZW07YW5pbWF0aW9uOnZmLXB1bHNlIDAuNXMgaW5maW5pdGUiPvCflKs8L2Rpdj4KICAgIDxkaXYgc3R5bGU9ImZvbnQtc2l6ZToxLjhyZW07Zm9udC13ZWlnaHQ6OTAwO2NvbG9yOiNlZjQ0NDQ7bGV0dGVyLXNwYWNpbmc6LjAyZW0iIGlkPSJfZ2NkLWxibCI+RklSSU5HIElOIDFz4oCmPC9kaXY+CiAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXNlY29uZGFyeSIgc3R5bGU9ImZvbnQtc2l6ZToxLjFyZW07cGFkZGluZzoxNHB4IDM2cHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKSIgaWQ9Il9nY2QtY2FuY2VsIj5UQVAgVE8gQ0FOQ0VMPC9idXR0b24+YDsKICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGVsKTsKCiAgbGV0IGNhbmNlbGxlZCA9IGZhbHNlOwogIGVsLnF1ZXJ5U2VsZWN0b3IoJyNfZ2NkLWNhbmNlbCcpLm9uY2xpY2sgPSAoKSA9PiB7CiAgICBjYW5jZWxsZWQgPSB0cnVlOwogICAgY2xlYXJUaW1lb3V0KF9zdGFydGVyQ291bnRkb3duVGltZXIpOwogICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbCk7CiAgICB0b2FzdCgnR08gY2FuY2VsbGVkJyk7CiAgICAvLyBSZXN0YXJ0IGxpc3RlbmluZwogICAgc3RhcnRlckxpc3RlblN0YXJ0KCk7CiAgfTsKCiAgX3N0YXJ0ZXJDb3VudGRvd25UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gewogICAgaWYgKGNhbmNlbGxlZCkgcmV0dXJuOwogICAgaWYgKGRvY3VtZW50LmJvZHkuY29udGFpbnMoZWwpKSBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsKTsKICAgIC8vIEZJUkUgR08KICAgIHRvYXN0KCfwn5SrIEd1biBkZXRlY3RlZCDigJQgR08hJyk7CiAgICB2aWJyYXRlKFsyMDAsNjAsMjAwXSk7CiAgICBmbGFzaCgnZ28nLCA2MDApOwogICAgY1JlZigncmFjZS9jdXJyZW50JykudXBkYXRlKHsKICAgICAgc3RhdGU6J2xpdmUnLAogICAgICBzdGFydGVkQXRTZXJ2ZXI6IGZpcmViYXNlLmRhdGFiYXNlLlNlcnZlclZhbHVlLlRJTUVTVEFNUAogICAgfSk7CiAgfSwgMTAwMCk7Cn0KCmZ1bmN0aW9uIHN0YXJ0ZXJSZWNhbGlicmF0ZSgpIHsKICBzdGFydGVyTm9pc2VGbG9vciA9IDA7CiAgc3RhcnRlck5vaXNlQ291bnQgPSAwOwogIGNvbnN0IGNhbExibCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydGVyLWNhbC1sYmwnKTsKICBpZiAoY2FsTGJsKSBjYWxMYmwudGV4dENvbnRlbnQgPSAnQ2FsaWJyYXRpbmfigKYnOwogIHRvYXN0KCdSZWNhbGlicmF0aW5nIG5vaXNlIGZsb29y4oCmJyk7Cn0KCi8vIOKUgOKUgCBUQVNLIDc6IFZGIGNhbWVyYSBmbGlwICsgcmV0cnkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmxldCB2ZkZhY2luZ01vZGUgPSAnZW52aXJvbm1lbnQnOwoKZnVuY3Rpb24gdmZGbGlwQ2FtZXJhKCkgewogIHZmRmFjaW5nTW9kZSA9ICh2ZkZhY2luZ01vZGUgPT09ICdlbnZpcm9ubWVudCcpID8gJ3VzZXInIDogJ2Vudmlyb25tZW50JzsKICB0b2FzdChgU3dpdGNoaW5nIHRvICR7dmZGYWNpbmdNb2RlID09PSAndXNlcicgPyAnZnJvbnQnIDogJ2JhY2snfSBjYW1lcmHigKZgKTsKICAvLyBSZW1vdmUgZXhpc3RpbmcgZXJyb3IgZGl2IGlmIHByZXNlbnQKICBjb25zdCBlcnJEaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmYtY2FtLWVycm9yJyk7CiAgaWYgKGVyckRpdikgZXJyRGl2LnJlbW92ZSgpOwogIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1saXZlLWNhbnZhcycpOwogIGlmIChjYW52YXMpIGNhbnZhcy5zdHlsZS5kaXNwbGF5ID0gJyc7CiAgLy8gU3RvcCBleGlzdGluZyBzdHJlYW0KICBpZiAodHlwZW9mIHZmU3RyZWFtICE9PSAndW5kZWZpbmVkJyAmJiB2ZlN0cmVhbSkgewogICAgdmZTdHJlYW0uZ2V0VHJhY2tzKCkuZm9yRWFjaCh0ID0+IHQuc3RvcCgpKTsKICAgIHZmU3RyZWFtID0gbnVsbDsKICB9CiAgLy8gUmVzdGFydCBjYW1lcmEgd2l0aCBuZXcgZmFjaW5nIG1vZGUKICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7CiAgICB2aWRlbzogeyBmYWNpbmdNb2RlOiB2ZkZhY2luZ01vZGUsIHdpZHRoOntpZGVhbDoxOTIwfSwgaGVpZ2h0OntpZGVhbDoxMDgwfSB9LAogICAgYXVkaW86IGZhbHNlCiAgfSkudGhlbihzdHJlYW0gPT4gewogICAgdmZTdHJlYW0gPSBzdHJlYW07CiAgICBjb25zdCB2aWQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmYtdmlkZW8tcHJldmlldycpOwogICAgdmlkLnNyY09iamVjdCA9IHN0cmVhbTsgdmlkLnBsYXkoKTsKICAgIHZpZC5hZGRFdmVudExpc3RlbmVyKCdwbGF5aW5nJywgKCkgPT4gewogICAgICB2ZlJlc3RhcnRDYWxpYnJhdGlvbigpOwogICAgICB0b2FzdCgnQ2FtZXJhIHN3aXRjaGVkIOKAlCBjYWxpYnJhdGluZ+KApicpOwogICAgfSwge29uY2U6dHJ1ZX0pOwogIH0pLmNhdGNoKGVyciA9PiB7CiAgICB0b2FzdCgnQ2FtZXJhIHN3aXRjaCBmYWlsZWQ6ICcgKyAoZXJyPy5tZXNzYWdlIHx8IGVycikpOwogICAgdmZTZXRTdGF0dXMoJ+KaoCBDYW1lcmEgZXJyb3InLCAnI2VmNDQ0NCcpOwogIH0pOwp9CgpmdW5jdGlvbiB2ZlJldHJ5Q2FtZXJhKCkgewogIGNvbnN0IGVyckRpdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi1jYW0tZXJyb3InKTsKICBpZiAoZXJyRGl2KSBlcnJEaXYucmVtb3ZlKCk7CiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ZmLWxpdmUtY2FudmFzJyk7CiAgaWYgKGNhbnZhcykgY2FudmFzLnN0eWxlLmRpc3BsYXkgPSAnJzsKICB2ZlNldFN0YXR1cygnU3RhcnRpbmcgY2FtZXJh4oCmJywgJ3ZhcigtLW11dGVkKScpOwogIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHsKICAgIHZpZGVvOiB7IGZhY2luZ01vZGU6IHZmRmFjaW5nTW9kZSwgd2lkdGg6e2lkZWFsOjE5MjB9LCBoZWlnaHQ6e2lkZWFsOjEwODB9IH0sCiAgICBhdWRpbzogZmFsc2UKICB9KS50aGVuKHN0cmVhbSA9PiB7CiAgICB2ZlN0cmVhbSA9IHN0cmVhbTsKICAgIGNvbnN0IHZpZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2Zi12aWRlby1wcmV2aWV3Jyk7CiAgICB2aWQuc3JjT2JqZWN0ID0gc3RyZWFtOyB2aWQucGxheSgpOwogICAgdmlkLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCAoKSA9PiB7CiAgICAgIHZmU3RhcnRDYWxpYnJhdGlvbigpOwogICAgICB0b2FzdCgnQ2FtZXJhIHJlYWR5IOKAlCBjYWxpYnJhdGluZ+KApicpOwogICAgfSwge29uY2U6dHJ1ZX0pOwogIH0pLmNhdGNoKGVyciA9PiB7CiAgICBjb25zdCBtc2cgPSBlcnI/Lm5hbWUgPT09ICdOb3RGb3VuZEVycm9yJyA/ICdObyBjYW1lcmEgZm91bmQnIDogJ0NhbWVyYSBlcnJvcjogJyArIChlcnI/Lm1lc3NhZ2UgfHwgZXJyKTsKICAgIHRvYXN0KG1zZyk7CiAgICB2ZlNldFN0YXR1cygn4pqgICcgKyBtc2csICcjZWY0NDQ0Jyk7CiAgfSk7Cn0KCi8vIOKUgOKUgCBUQVNLIDg6IFZGIG1hbnVhbCBhZGQgZmluaXNoIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApmdW5jdGlvbiB2Zk1hbnVhbEFkZCgpIHsKICBjb25zdCBtYXhMYW5lID0gdHlwZW9mIHZmTGFuZUNvdW50ICE9PSAndW5kZWZpbmVkJyA/IHZmTGFuZUNvdW50IDogODsKICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGVsLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7aW5zZXQ6MDtiYWNrZ3JvdW5kOnJnYmEoMCwwLDAsLjY1KTt6LWluZGV4Ojk5OTk7ZGlzcGxheTpmbGV4O2FsaWduLWl0ZW1zOmNlbnRlcjtqdXN0aWZ5LWNvbnRlbnQ6Y2VudGVyO3BhZGRpbmc6MTZweCc7CiAgZWwuaW5uZXJIVE1MID0gYAogICAgPGRpdiBzdHlsZT0iYmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXItcmFkaXVzOjE2cHg7cGFkZGluZzoyNHB4O21heC13aWR0aDozMjBweDt3aWR0aDoxMDAlIj4KICAgICAgPGRpdiBzdHlsZT0iZm9udC13ZWlnaHQ6NzAwO2ZvbnQtc2l6ZToxcmVtO21hcmdpbi1ib3R0b206MTZweCI+QWRkIE1hbnVhbCBGaW5pc2g8L2Rpdj4KICAgICAgPGRpdiBzdHlsZT0ibWFyZ2luLWJvdHRvbToxMnB4Ij4KICAgICAgICA8bGFiZWwgc3R5bGU9ImZvbnQtc2l6ZTowLjhyZW07Y29sb3I6dmFyKC0tbXV0ZWQpIj5MYW5lPC9sYWJlbD4KICAgICAgICA8c2VsZWN0IGlkPSJfbWYtbGFuZSIgc3R5bGU9IndpZHRoOjEwMCU7bWFyZ2luLXRvcDo0cHg7cGFkZGluZzo4cHg7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlLTIpO2JvcmRlcjoxcHggc29saWQgdmFyKC0tYm9yZGVyKTtib3JkZXItcmFkaXVzOjhweDtjb2xvcjp2YXIoLS10ZXh0KTtmb250LXNpemU6MXJlbSI+CiAgICAgICAgICAke0FycmF5LmZyb20oe2xlbmd0aDptYXhMYW5lfSwoXyxpKT0+YDxvcHRpb24gdmFsdWU9IiR7aSsxfSI+TGFuZSAke2krMX08L29wdGlvbj5gKS5qb2luKCcnKX0KICAgICAgICA8L3NlbGVjdD4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9Im1hcmdpbi1ib3R0b206MjBweCI+CiAgICAgICAgPGxhYmVsIHN0eWxlPSJmb250LXNpemU6MC44cmVtO2NvbG9yOnZhcigtLW11dGVkKSI+VGltZSAoc2Vjb25kcywgZS5nLiAxMi40NSk8L2xhYmVsPgogICAgICAgIDxpbnB1dCB0eXBlPSJudW1iZXIiIGlkPSJfbWYtdGltZSIgc3RlcD0iMC4wMSIgbWluPSIwIiBwbGFjZWhvbGRlcj0iMC4wMCIKICAgICAgICAgIHN0eWxlPSJ3aWR0aDoxMDAlO21hcmdpbi10b3A6NHB4O3BhZGRpbmc6OHB4O2JhY2tncm91bmQ6dmFyKC0tc3VyZmFjZS0yKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czo4cHg7Y29sb3I6dmFyKC0tdGV4dCk7Zm9udC1zaXplOjFyZW07Ym94LXNpemluZzpib3JkZXItYm94Ij4KICAgICAgPC9kaXY+CiAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtnYXA6MTBweCI+CiAgICAgICAgPGJ1dHRvbiBjbGFzcz0iYnRuIGJ0bi1zZWNvbmRhcnkiIHN0eWxlPSJmbGV4OjEiIGlkPSJfbWYtY2FuY2VsIj5DYW5jZWw8L2J1dHRvbj4KICAgICAgICA8YnV0dG9uIGNsYXNzPSJidG4gYnRuLXByaW1hcnkiICAgc3R5bGU9ImZsZXg6MSIgaWQ9Il9tZi1vayI+QWRkIEZpbmlzaDwvYnV0dG9uPgogICAgICA8L2Rpdj4KICAgIDwvZGl2PmA7CiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7CiAgZWwucXVlcnlTZWxlY3RvcignI19tZi1jYW5jZWwnKS5vbmNsaWNrID0gKCkgPT4gZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbCk7CiAgZWwucXVlcnlTZWxlY3RvcignI19tZi1vaycpLm9uY2xpY2sgPSAoKSA9PiB7CiAgICBjb25zdCBsYW5lICA9IHBhcnNlSW50KGVsLnF1ZXJ5U2VsZWN0b3IoJyNfbWYtbGFuZScpLnZhbHVlKTsKICAgIGNvbnN0IHRpbWVTZWMgPSBwYXJzZUZsb2F0KGVsLnF1ZXJ5U2VsZWN0b3IoJyNfbWYtdGltZScpLnZhbHVlKTsKICAgIGlmICghaXNGaW5pdGUodGltZVNlYykgfHwgdGltZVNlYyA8PSAwKSB7IHRvYXN0KCdFbnRlciBhIHZhbGlkIHRpbWUnKTsgcmV0dXJuOyB9CiAgICBjb25zdCBlbGFwc2VkTXMgPSBNYXRoLnJvdW5kKHRpbWVTZWMgKiAxMDAwKTsKICAgIGlmICh0eXBlb2YgdmZEZXRlY3Rpb25zICE9PSAndW5kZWZpbmVkJykgewogICAgICB2ZkRldGVjdGlvbnMucHVzaCh7IGxhbmUsIGVsYXBzZWRNcywgbWFudWFsOiB0cnVlIH0pOwogICAgICBpZiAodHlwZW9mIHZmUmVuZGVyRGV0ZWN0aW9ucyA9PT0gJ2Z1bmN0aW9uJykgdmZSZW5kZXJEZXRlY3Rpb25zKCk7CiAgICB9CiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsKTsKICAgIHRvYXN0KGBMYW5lICR7bGFuZX0gbWFudWFsbHkgYWRkZWQg4oCUICR7dGltZVNlYy50b0ZpeGVkKDIpfXNgKTsKICB9OwogIHNldFRpbWVvdXQoKCkgPT4gZWwucXVlcnlTZWxlY3RvcignI19tZi10aW1lJykuZm9jdXMoKSwgMTAwKTsKfQoKLy8g4pSA4pSAIFRBU0sgOTogQXRobGV0ZSBuYW1lIHBlcnNpc3RlbmNlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApmdW5jdGlvbiBfbGFuZUtleShhZ2UsIGdlbmRlciwgZXZlbnQpIHsKICByZXR1cm4gYGN0X2xhbmVzXyR7YWdlfV8ke2dlbmRlcn1fJHtldmVudH1gLnJlcGxhY2UoL1xzKy9nLCdfJyk7Cn0KZnVuY3Rpb24gX3NhdmVMYW5lTmFtZXMoYWdlLCBnZW5kZXIsIGV2ZW50LCBsYW5lcykgewogIHRyeSB7IGxvY2FsU3RvcmFnZS5zZXRJdGVtKF9sYW5lS2V5KGFnZSwgZ2VuZGVyLCBldmVudCksIEpTT04uc3RyaW5naWZ5KGxhbmVzKSk7IH0gY2F0Y2goZSl7fQp9CmZ1bmN0aW9uIF9sb2FkTGFuZU5hbWVzKGFnZSwgZ2VuZGVyLCBldmVudCkgewogIHRyeSB7CiAgICBjb25zdCBzYXZlZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKF9sYW5lS2V5KGFnZSwgZ2VuZGVyLCBldmVudCkpOwogICAgaWYgKCFzYXZlZCkgcmV0dXJuOwogICAgY29uc3QgbGFuZXMgPSBKU09OLnBhcnNlKHNhdmVkKTsKICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hZG1pbi1sYW5lLW5hbWUtaW5wdXQnKS5mb3JFYWNoKGlucCA9PiB7CiAgICAgIGNvbnN0IG4gPSBpbnAuZGF0YXNldC5sYW5lOwogICAgICBpZiAobGFuZXNbbl0/Lm5hbWUpIGlucC52YWx1ZSA9IGxhbmVzW25dLm5hbWU7CiAgICB9KTsKICAgIHRvYXN0KCdOYW1lcyBsb2FkZWQgZnJvbSBsYXN0IGhlYXQg4oaRJyk7CiAgfSBjYXRjaChlKXt9Cn0KCi8vIEF1dG8tbG9hZCBuYW1lcyB3aGVuIGRyb3Bkb3ducyBjaGFuZ2UgKGF0dGFjaCBhZnRlciBhZG1pbiB2aWV3IGluaXRzKQpmdW5jdGlvbiBfYXR0YWNoTGFuZU5hbWVBdXRvTG9hZCgpIHsKICBjb25zdCBhZ2VTZWwgICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZG1pbi1hZ2Utc2VsJyk7CiAgY29uc3QgZXZlbnRTZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRtaW4tZXZlbnQtc2VsJyk7CiAgY29uc3QgbG9hZCA9ICgpID0+IHsKICAgIGNvbnN0IGFnZSAgID0gYWdlU2VsPy52YWx1ZTsKICAgIGNvbnN0IGV2ZW50ID0gZXZlbnRTZWw/LnZhbHVlOwogICAgaWYgKGFnZSAmJiBldmVudCAmJiB0eXBlb2YgYWRtaW5HZW5kZXIgIT09ICd1bmRlZmluZWQnKSBfbG9hZExhbmVOYW1lcyhhZ2UsIGFkbWluR2VuZGVyLCBldmVudCk7CiAgfTsKICBpZiAoYWdlU2VsKSAgIGFnZVNlbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBsb2FkKTsKICBpZiAoZXZlbnRTZWwpIGV2ZW50U2VsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGxvYWQpOwp9Ci8vIENhbGwgYWZ0ZXIgYSBzaG9ydCBkZWxheSBzbyBpbml0QWRtaW5WaWV3IGhhcyBydW4KY29uc3QgX29yaWdJbml0QWRtaW5WaWV3ID0gdHlwZW9mIGluaXRBZG1pblZpZXcgPT09ICdmdW5jdGlvbicgPyBpbml0QWRtaW5WaWV3IDogbnVsbDsKCi8vIOKUgOKUgCBUQVNLIDEwOiBUaW1lciB1bmRvIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApsZXQgX3RpbWVyVW5kb1RpbWVyID0gbnVsbDsKCmZ1bmN0aW9uIF9zaG93VGltZXJVbmRvKGxhbmUsIHNwbGl0S2V5LCBlbGFwc2VkTXMpIHsKICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgdW5kbwogIGlmIChfdGltZXJVbmRvVGltZXIpIHsgY2xlYXJUaW1lb3V0KF90aW1lclVuZG9UaW1lcik7IF90aW1lclVuZG9UaW1lciA9IG51bGw7IH0KICBjb25zdCBleGlzdGluZyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci11bmRvLWJhcicpOwogIGlmIChleGlzdGluZykgZXhpc3RpbmcucmVtb3ZlKCk7CgogIGNvbnN0IGJhciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGJhci5pZCA9ICd0aW1lci11bmRvLWJhcic7CiAgYmFyLnN0eWxlLmNzc1RleHQgPSAncG9zaXRpb246Zml4ZWQ7Ym90dG9tOjI0cHg7bGVmdDo1MCU7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTUwJSk7YmFja2dyb3VuZDp2YXIoLS1zdXJmYWNlKTtib3JkZXI6MXB4IHNvbGlkIHZhcigtLWJvcmRlcik7Ym9yZGVyLXJhZGl1czoxMnB4O3BhZGRpbmc6MTJweCAyMHB4O2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjE2cHg7ei1pbmRleDo5OTk3O2JveC1zaGFkb3c6MCA0cHggMjRweCByZ2JhKDAsMCwwLC40KSc7CiAgY29uc3QgdGltZUxlZnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7CiAgdGltZUxlZnQuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MC44NXJlbTtjb2xvcjp2YXIoLS1tdXRlZCknOwogIHRpbWVMZWZ0LnRleHRDb250ZW50ID0gJ1VuZG8gc3RvcCAoM3MpJzsKICBjb25zdCB1bmRvQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7CiAgdW5kb0J0bi5jbGFzc05hbWUgPSAnYnRuIGJ0bi1zZWNvbmRhcnknOwogIHVuZG9CdG4uc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MC44NXJlbTtwYWRkaW5nOjZweCAxNnB4O2NvbG9yOnZhcigtLWFjY2VudCk7Ym9yZGVyLWNvbG9yOnZhcigtLWFjY2VudCknOwogIHVuZG9CdG4udGV4dENvbnRlbnQgPSAn4oapIFVuZG8nOwogIGJhci5hcHBlbmRDaGlsZCh0aW1lTGVmdCk7CiAgYmFyLmFwcGVuZENoaWxkKHVuZG9CdG4pOwogIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYmFyKTsKCiAgbGV0IHNlY3MgPSAzOwogIGNvbnN0IHRpY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7CiAgICBzZWNzLS07CiAgICBpZiAoc2VjcyA8PSAwKSB7IGNsZWFySW50ZXJ2YWwodGljayk7IGJhci5yZW1vdmUoKTsgfQogICAgZWxzZSB0aW1lTGVmdC50ZXh0Q29udGVudCA9IGBVbmRvIHN0b3AgKCR7c2Vjc31zKWA7CiAgfSwgMTAwMCk7CgogIHVuZG9CdG4ub25jbGljayA9IGFzeW5jICgpID0+IHsKICAgIGNsZWFySW50ZXJ2YWwodGljayk7CiAgICBjbGVhclRpbWVvdXQoX3RpbWVyVW5kb1RpbWVyKTsKICAgIGJhci5yZW1vdmUoKTsKICAgIHRyeSB7CiAgICAgIGF3YWl0IGNSZWYoYHJhY2UvY3VycmVudC9zcGxpdHMvJHtsYW5lfS8ke3NwbGl0S2V5fWApLnJlbW92ZSgpOwogICAgICBjb25zdCBzcGxpdEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lci1zdG9wLWJ0bicpOwogICAgICBpZiAoc3BsaXRCdG4pIHsgc3BsaXRCdG4udGV4dENvbnRlbnQgPSAnU1RPUCc7IHNwbGl0QnRuLnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTsgfQogICAgICB0b2FzdCgn4oapIFN0b3AgdW5kb25lIOKAlCB0YXAgU1RPUCBhZ2FpbiB3aGVuIHJlYWR5Jyk7CiAgICB9IGNhdGNoKGUpIHsKICAgICAgdG9hc3QoJ0NvdWxkIG5vdCB1bmRvIOKAlCBzcGxpdCBhbHJlYWR5IHN5bmNlZCcpOwogICAgfQogIH07CgogIF90aW1lclVuZG9UaW1lciA9IHNldFRpbWVvdXQoKCkgPT4geyBjbGVhckludGVydmFsKHRpY2spOyBiYXIucmVtb3ZlKCk7IH0sIDMwMDApOwp9CgovLyDilIDilIAgVEFTSyAxMjogUmVzdWx0cyBleHBvcnQg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIGFkbWluRXhwb3J0Q1NWKCkgewogIGlmICghcmFjZVN0YXRlKSB7IHRvYXN0KCdObyByYWNlIGRhdGEnKTsgcmV0dXJuOyB9CiAgY29uc3QgbGFuZXMgID0gcmFjZVN0YXRlLmxhbmVzICB8fCB7fTsKICBjb25zdCBzcGxpdHMgPSByYWNlU3RhdGUuc3BsaXRzIHx8IHt9OwogIGNvbnN0IHJlc3VsdHMgPSBbXTsKICBPYmplY3Qua2V5cyhsYW5lcykuZm9yRWFjaChsYW5lID0+IHsKICAgIGNvbnN0IHZhbHMgPSBPYmplY3QudmFsdWVzKHNwbGl0c1tsYW5lXXx8e30pLm1hcChzPT5zLmVsYXBzZWRNcykuZmlsdGVyKEJvb2xlYW4pOwogICAgY29uc3QgbWVhbiA9IHZhbHMubGVuZ3RoID8gdHJpbW1lZE1lYW4odmFscykgOiBudWxsOwogICAgaWYgKG1lYW4gIT0gbnVsbCkgcmVzdWx0cy5wdXNoKHsgbGFuZSwgbmFtZTogbGFuZXNbbGFuZV0/Lm5hbWUgfHwgYExhbmUgJHtsYW5lfWAsIHRpbWVNczogbWVhbiB9KTsKICB9KTsKICByZXN1bHRzLnNvcnQoKGEsYikgPT4gYS50aW1lTXMgLSBiLnRpbWVNcyk7CiAgbGV0IHBsYWNlID0gMTsKICByZXN1bHRzLmZvckVhY2gociA9PiB7IHIucGxhY2UgPSBwbGFjZSsrOyB9KTsKCiAgY29uc3QgZXZlbnQgICA9IHJhY2VTdGF0ZS5ldmVudCAgIHx8ICcnOwogIGNvbnN0IGFnZSAgICAgPSByYWNlU3RhdGUuYWdlICAgICB8fCAnJzsKICBjb25zdCBnZW5kZXIgID0gcmFjZVN0YXRlLmdlbmRlciAgfHwgJyc7CiAgY29uc3QgaGVhZGVyICA9ICdQbGFjZSxMYW5lLE5hbWUsVGltZVxyXG4nOwogIGNvbnN0IHJvd3MgICAgPSByZXN1bHRzLm1hcChyID0+IGAke3IucGxhY2V9LCR7ci5sYW5lfSwiJHtyLm5hbWV9Iiwke2ZtdFNlYyhyLnRpbWVNcyl9YCkuam9pbignXHJcbicpOwogIGNvbnN0IGNzdiAgICAgPSBoZWFkZXIgKyByb3dzOwogIGNvbnN0IGJsb2IgICAgPSBuZXcgQmxvYihbY3N2XSwge3R5cGU6J3RleHQvY3N2J30pOwogIGNvbnN0IHVybCAgICAgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpOwogIGNvbnN0IGEgICAgICAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7CiAgYS5ocmVmID0gdXJsOwogIGEuZG93bmxvYWQgPSBgJHthZ2V9LSR7Z2VuZGVyfS0ke2V2ZW50fS1yZXN1bHRzLmNzdmAucmVwbGFjZSgvXHMrL2csJ18nKTsKICBhLmNsaWNrKCk7CiAgVVJMLnJldm9rZU9iamVjdFVSTCh1cmwpOwogIHRvYXN0KCdDU1YgZG93bmxvYWRlZCcpOwp9CgpmdW5jdGlvbiBhZG1pblByaW50UmVzdWx0cygpIHsKICBpZiAoIXJhY2VTdGF0ZSkgeyB0b2FzdCgnTm8gcmFjZSBkYXRhJyk7IHJldHVybjsgfQogIGNvbnN0IGxhbmVzICA9IHJhY2VTdGF0ZS5sYW5lcyAgfHwge307CiAgY29uc3Qgc3BsaXRzID0gcmFjZVN0YXRlLnNwbGl0cyB8fCB7fTsKICBjb25zdCByZXN1bHRzID0gW107CiAgT2JqZWN0LmtleXMobGFuZXMpLmZvckVhY2gobGFuZSA9PiB7CiAgICBjb25zdCB2YWxzID0gT2JqZWN0LnZhbHVlcyhzcGxpdHNbbGFuZV18fHt9KS5tYXAocz0+cy5lbGFwc2VkTXMpLmZpbHRlcihCb29sZWFuKTsKICAgIGNvbnN0IG1lYW4gPSB2YWxzLmxlbmd0aCA/IHRyaW1tZWRNZWFuKHZhbHMpIDogbnVsbDsKICAgIGlmIChtZWFuICE9IG51bGwpIHJlc3VsdHMucHVzaCh7IGxhbmUsIG5hbWU6IGxhbmVzW2xhbmVdPy5uYW1lIHx8IGBMYW5lICR7bGFuZX1gLCB0aW1lTXM6IG1lYW4gfSk7CiAgfSk7CiAgcmVzdWx0cy5zb3J0KChhLGIpID0+IGEudGltZU1zIC0gYi50aW1lTXMpOwogIGxldCBwbGFjZSA9IDE7CiAgcmVzdWx0cy5mb3JFYWNoKHIgPT4geyByLnBsYWNlID0gcGxhY2UrKzsgfSk7CgogIGNvbnN0IG1lZGFscyA9IFsn8J+lhycsJ/CfpYgnLCfwn6WJJ107CiAgY29uc3Qgcm93cyAgID0gcmVzdWx0cy5tYXAociA9PgogICAgYDx0cj48dGQgc3R5bGU9InRleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZToxLjRyZW0iPiR7bWVkYWxzW3IucGxhY2UtMV18fHIucGxhY2V9PC90ZD48dGQ+JHtyLmxhbmV9PC90ZD48dGQgc3R5bGU9ImZvbnQtd2VpZ2h0OjYwMCI+JHtyLm5hbWV9PC90ZD48dGQgc3R5bGU9ImZvbnQtZmFtaWx5Om1vbm9zcGFjZTtmb250LXNpemU6MS4xcmVtIj4ke2ZtdFNlYyhyLnRpbWVNcyl9PC90ZD48L3RyPmAKICApLmpvaW4oJycpOwoKICBjb25zdCB3aW4gPSB3aW5kb3cub3BlbignJywnX2JsYW5rJyk7CiAgd2luLmRvY3VtZW50LndyaXRlKGA8IURPQ1RZUEUgaHRtbD48aHRtbD48aGVhZD48dGl0bGU+UmVzdWx0czwvdGl0bGU+CiAgPHN0eWxlPmJvZHl7Zm9udC1mYW1pbHk6c2Fucy1zZXJpZjtwYWRkaW5nOjMycHg7bWF4LXdpZHRoOjYwMHB4O21hcmdpbjphdXRvfWgxe2ZvbnQtc2l6ZToxLjRyZW07bWFyZ2luLWJvdHRvbTo0cHh9aDJ7Zm9udC1zaXplOjFyZW07Y29sb3I6IzY2NjttYXJnaW4tYm90dG9tOjI0cHg7Zm9udC13ZWlnaHQ6NDAwfXRhYmxle3dpZHRoOjEwMCU7Ym9yZGVyLWNvbGxhcHNlOmNvbGxhcHNlfXRoe3RleHQtYWxpZ246bGVmdDtib3JkZXItYm90dG9tOjJweCBzb2xpZCAjZGRkO3BhZGRpbmc6OHB4IDEycHg7Zm9udC1zaXplOi44NXJlbTt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Y29sb3I6Izg4OH10ZHtwYWRkaW5nOjEwcHggMTJweDtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjZWVlfUBtZWRpYSBwcmludHtidXR0b257ZGlzcGxheTpub25lfX0KLyog4pSA4pSAIENUIEFjY2VzcyBQYXl3YWxsIOKUgOKUgCAqLwouY3QtcGF5d2FsbC1vdmVybGF5e3Bvc2l0aW9uOmZpeGVkO2luc2V0OjA7YmFja2dyb3VuZDpyZ2JhKDAsMCwwLC43Mik7ei1pbmRleDo5MDAwO2Rpc3BsYXk6ZmxleDthbGlnbi1pdGVtczpjZW50ZXI7anVzdGlmeS1jb250ZW50OmNlbnRlcjtwYWRkaW5nOjE2cHh9Ci5jdC1wYXl3YWxsLW92ZXJsYXkuaGlkZGVue2Rpc3BsYXk6bm9uZX0KLmN0LXBheXdhbGwtYm94e2JhY2tncm91bmQ6I2ZmZjtib3JkZXItcmFkaXVzOjE4cHg7cGFkZGluZzoyOHB4IDI0cHg7bWF4LXdpZHRoOjM4MHB4O3dpZHRoOjEwMCU7Ym94LXNoYWRvdzowIDIwcHggNjBweCByZ2JhKDAsMCwwLC4zNSl9Ci5jdC1wYXl3YWxsLWxvZ297Zm9udC1zaXplOjJyZW07dGV4dC1hbGlnbjpjZW50ZXI7bWFyZ2luLWJvdHRvbTo2cHh9Ci5jdC1wYXl3YWxsLXRpdGxle2ZvbnQtc2l6ZToxLjE1cmVtO2ZvbnQtd2VpZ2h0OjgwMDt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojMGQxYjNlO21hcmdpbi1ib3R0b206NHB4fQouY3QtcGF5d2FsbC1zdWJ7Zm9udC1zaXplOi44NXJlbTt0ZXh0LWFsaWduOmNlbnRlcjtjb2xvcjojNjQ3NDhiO21hcmdpbi1ib3R0b206MjBweH0KLmN0LXBsYW4tcm93e2Rpc3BsYXk6ZmxleDtmbGV4LWRpcmVjdGlvbjpjb2x1bW47Z2FwOjEwcHg7bWFyZ2luLWJvdHRvbToyMHB4fQouY3QtcGxhbi1idG57ZGlzcGxheTpibG9jaztwYWRkaW5nOjE0cHggMThweDtib3JkZXItcmFkaXVzOjEwcHg7dGV4dC1kZWNvcmF0aW9uOm5vbmU7Ym9yZGVyOjJweCBzb2xpZCAjZTJlOGYwO2N1cnNvcjpwb2ludGVyO3RyYW5zaXRpb246Ym9yZGVyLWNvbG9yIC4xNXMsYmFja2dyb3VuZCAuMTVzO3RleHQtYWxpZ246bGVmdH0KLmN0LXBsYW4tYnRuOmhvdmVye2JvcmRlci1jb2xvcjojMWE1NmRiO2JhY2tncm91bmQ6I2YwZjVmZn0KLmN0LXBsYW4tYnRuLnByaW1hcnl7YmFja2dyb3VuZDojMGQxYjNlO2JvcmRlci1jb2xvcjojMGQxYjNlO2NvbG9yOiNmZmZ9Ci5jdC1wbGFuLWJ0bi5wcmltYXJ5OmhvdmVye2JhY2tncm91bmQ6IzFhM2E2ZTtib3JkZXItY29sb3I6IzFhM2E2ZX0KLmN0LXBsYW4tbGFiZWx7Zm9udC1zaXplOi45NXJlbTtmb250LXdlaWdodDo3MDB9Ci5jdC1wbGFuLXByaWNle2ZvbnQtc2l6ZToxLjFyZW07Zm9udC13ZWlnaHQ6OTAwfQouY3QtcGxhbi1kZXNje2ZvbnQtc2l6ZTouNzhyZW07b3BhY2l0eTouNzU7bWFyZ2luLXRvcDoycHh9Ci5jdC1kaXZpZGVye3RleHQtYWxpZ246Y2VudGVyO2ZvbnQtc2l6ZTouOHJlbTtjb2xvcjojOTRhM2I4O21hcmdpbjo0cHggMCAxMnB4fQouY3QtY29kZS1yb3d7ZGlzcGxheTpmbGV4O2dhcDo4cHh9Ci5jdC1jb2RlLWlucHV0e2ZsZXg6MTtwYWRkaW5nOjExcHggMTRweDtib3JkZXI6MnB4IHNvbGlkICNlMmU4ZjA7Ym9yZGVyLXJhZGl1czo4cHg7Zm9udC1zaXplOjFyZW07Zm9udC1mYW1pbHk6bW9ub3NwYWNlO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsZXR0ZXItc3BhY2luZzouMWVtO291dGxpbmU6bm9uZX0KLmN0LWNvZGUtaW5wdXQ6Zm9jdXN7Ym9yZGVyLWNvbG9yOiMxYTU2ZGJ9Ci5jdC1jb2RlLXN1Ym1pdHtwYWRkaW5nOjExcHggMThweDtiYWNrZ3JvdW5kOiMxYTU2ZGI7Y29sb3I6I2ZmZjtib3JkZXI6bm9uZTtib3JkZXItcmFkaXVzOjhweDtmb250LXNpemU6LjlyZW07Zm9udC13ZWlnaHQ6NzAwO2N1cnNvcjpwb2ludGVyO3doaXRlLXNwYWNlOm5vd3JhcH0KLmN0LWNvZGUtc3VibWl0OmRpc2FibGVke29wYWNpdHk6LjU7Y3Vyc29yOmRlZmF1bHR9Ci5jdC1jb2RlLWVycm9ye2ZvbnQtc2l6ZTouODJyZW07Y29sb3I6I2RjMjYyNjttYXJnaW4tdG9wOjZweDttaW4taGVpZ2h0OjE4cHh9Ci5jdC1hY2Nlc3MtYmFkZ2V7ZGlzcGxheTppbmxpbmUtZmxleDthbGlnbi1pdGVtczpjZW50ZXI7Z2FwOjVweDtiYWNrZ3JvdW5kOiNkY2ZjZTc7Y29sb3I6IzE1ODAzZDtib3JkZXItcmFkaXVzOjZweDtmb250LXNpemU6Ljc1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtwYWRkaW5nOjNweCA4cHh9CgogIC8qIFdEMjYgRHJhdyAmIFJlc3VsdHMgYmFubmVyICovCiAgLndkMjYtbGluay1iYW5uZXIgewogICAgZGlzcGxheTogZmxleDsKICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7CiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsKICAgIGdhcDogMTBweDsKICAgIHBhZGRpbmc6IDE0cHggMjBweDsKICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsICNmNTllMGIgMCUsICNkOTc3MDYgMTAwJSk7CiAgICBjb2xvcjogIzAwMDsKICAgIGZvbnQtd2VpZ2h0OiA3MDA7CiAgICBmb250LXNpemU6IDFyZW07CiAgICBib3JkZXItcmFkaXVzOiAxMnB4OwogICAgdGV4dC1kZWNvcmF0aW9uOiBub25lOwogICAgYm94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDI0NSwxNTgsMTEsMC40KTsKICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAwLjE1cywgYm94LXNoYWRvdyAwLjE1czsKICAgIG1hcmdpbi10b3A6IDhweDsKICB9CiAgLndkMjYtbGluay1iYW5uZXI6aG92ZXIgewogICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpOwogICAgYm94LXNoYWRvdzogMCA2cHggMThweCByZ2JhKDI0NSwxNTgsMTEsMC41KTsKICB9CiAgLndkMjYtbGluay1iYW5uZXIgc3BhbiB7CiAgICBsZXR0ZXItc3BhY2luZzogMC4wMmVtOwogIH0KCjwvc3R5bGU+CiAgPC9oZWFkPjxib2R5PgogIDxoMT4ke3JhY2VTdGF0ZS5ldmVudHx8J1JhY2UgUmVzdWx0cyd9PC9oMT4KICA8aDI+JHtyYWNlU3RhdGUuYWdlfHwnJ30gJHtyYWNlU3RhdGUuZ2VuZGVyfHwnJ30gJm1kYXNoOyAke25ldyBEYXRlKCkudG9Mb2NhbGVEYXRlU3RyaW5nKCdlbi1BVScpfTwvaDI+CiAgPHRhYmxlPjx0aGVhZD48dHI+PHRoPlBsYWNlPC90aD48dGg+TGFuZTwvdGg+PHRoPkF0aGxldGU8L3RoPjx0aD5UaW1lPC90aD48L3RyPjwvdGhlYWQ+PHRib2R5PiR7cm93c308L3Rib2R5PjwvdGFibGU+CiAgPHAgc3R5bGU9Im1hcmdpbi10b3A6MzJweDtmb250LXNpemU6Ljc1cmVtO2NvbG9yOiNhYWEiPkdlbmVyYXRlZCBieSBDYXJuaXZhbCBUaW1pbmcgJm1kYXNoOyBjYXJuaXZhbHRpbWluZy5jb208L3A+CiAgPGJ1dHRvbiBvbmNsaWNrPSJ3aW5kb3cucHJpbnQoKSIgc3R5bGU9Im1hcmdpbi10b3A6MTZweDtwYWRkaW5nOjEwcHggMjRweDtmb250LXNpemU6MXJlbTtjdXJzb3I6cG9pbnRlciI+8J+WqCBQcmludDwvYnV0dG9uPgogIAo8ZGl2IGlkPSJjdC1mb290ZXIiIHN0eWxlPSJwb3NpdGlvbjpmaXhlZDtib3R0b206MDtsZWZ0OjA7cmlnaHQ6MDtiYWNrZ3JvdW5kOnJnYmEoMTMsMjcsNjIsMC45Mik7YmFja2Ryb3AtZmlsdGVyOmJsdXIoNnB4KTtjb2xvcjpyZ2JhKDI1NSwyNTUsMjU1LDAuNSk7Zm9udC1zaXplOjExcHg7dGV4dC1hbGlnbjpjZW50ZXI7cGFkZGluZzo2cHggMTZweDt6LWluZGV4OjEwMDtkaXNwbGF5OmZsZXg7anVzdGlmeS1jb250ZW50OmNlbnRlcjtnYXA6MTZweDthbGlnbi1pdGVtczpjZW50ZXI7ZmxleC13cmFwOndyYXA7Ij4KICA8c3Bhbj7CqSAyMDI2IEx1Y2sgRHJhZ29uIFB0eSBMdGQ8L3NwYW4+CiAgPHNwYW4+wrc8L3NwYW4+CiAgPGEgaHJlZj0iaHR0cHM6Ly9zY2hvb2xzcG9ydHBvcnRhbC5jb20uYXUvcHJpdmFjeSIgc3R5bGU9ImNvbG9yOnJnYmEoMjU1LDI1NSwyNTUsMC41KTt0ZXh0LWRlY29yYXRpb246bm9uZTsiIHRhcmdldD0iX2JsYW5rIj5Qcml2YWN5PC9hPgogIDxzcGFuPsK3PC9zcGFuPgogIDxhIGhyZWY9Imh0dHBzOi8vc2Nob29sc3BvcnRwb3J0YWwuY29tLmF1IiBzdHlsZT0iY29sb3I6cmdiYSgyNTUsMjU1LDI1NSwwLjUpO3RleHQtZGVjb3JhdGlvbjpub25lOyIgdGFyZ2V0PSJfYmxhbmsiPlNjaG9vbCBTcG9ydCBQb3J0YWw8L2E+CjwvZGl2PgoKPGRpdiBpZD0iY3QtcGF5d2FsbC1vdmVybGF5IiBjbGFzcz0iY3QtcGF5d2FsbC1vdmVybGF5IGhpZGRlbiI+CiAgPGRpdiBjbGFzcz0iY3QtcGF5d2FsbC1ib3giPgogICAgPGRpdiBjbGFzcz0iY3QtcGF5d2FsbC1sb2dvIj7wn4+BPC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJjdC1wYXl3YWxsLXRpdGxlIj5DYXJuaXZhbCBUaW1pbmc8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImN0LXBheXdhbGwtc3ViIj5SYWNlIENvbnRyb2wgcmVxdWlyZXMgYW4gYWNjZXNzIGNvZGUuPGJyPkpvaW4gQ2Fybml2YWwgJmFtcDsgZGVtb3MgYXJlIGFsd2F5cyBmcmVlLjwvZGl2PgogICAgPGRpdiBjbGFzcz0iY3QtcGxhbi1yb3ciPgogICAgICA8YSBocmVmPSJodHRwczovL2J1eS5zdHJpcGUuY29tLzh4MjZvR2d1eDlJVDN3UWNrbTlJUTA1IiB0YXJnZXQ9Il9ibGFuayIgY2xhc3M9ImN0LXBsYW4tYnRuIHByaW1hcnkiIG9uY2xpY2s9ImN0VHJhY2tDbGljaygnc2luZ2xlJykiPgogICAgICAgIDxkaXYgc3R5bGU9ImRpc3BsYXk6ZmxleDtqdXN0aWZ5LWNvbnRlbnQ6c3BhY2UtYmV0d2VlbjthbGlnbi1pdGVtczpjZW50ZXIiPgogICAgICAgICAgPHNwYW4gY2xhc3M9ImN0LXBsYW4tbGFiZWwiPlNpbmdsZSBDYXJuaXZhbDwvc3Bhbj4KICAgICAgICAgIDxzcGFuIGNsYXNzPSJjdC1wbGFuLXByaWNlIj4kNDk8L3NwYW4+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY3QtcGxhbi1kZXNjIj5PbmUgY29kZSwgb25lIGNhcm5pdmFsLiBQZXJmZWN0IGZvciBhdGhsZXRpY3MgY2x1YnMgJmFtcDsgb25lLW9mZiBldmVudHMuPC9kaXY+CiAgICAgIDwvYT4KICAgICAgPGEgaHJlZj0iaHR0cHM6Ly9idXkuc3RyaXBlLmNvbS83c1kzY3UzSEw4RVA0QVVlc3U5SVEwNiIgdGFyZ2V0PSJfYmxhbmsiIGNsYXNzPSJjdC1wbGFuLWJ0biIgb25jbGljaz0iY3RUcmFja0NsaWNrKCdhbm51YWwnKSI+CiAgICAgICAgPGRpdiBzdHlsZT0iZGlzcGxheTpmbGV4O2p1c3RpZnktY29udGVudDpzcGFjZS1iZXR3ZWVuO2FsaWduLWl0ZW1zOmNlbnRlciI+CiAgICAgICAgICA8c3BhbiBjbGFzcz0iY3QtcGxhbi1sYWJlbCI+QW5udWFsIFVubGltaXRlZDwvc3Bhbj4KICAgICAgICAgIDxzcGFuIGNsYXNzPSJjdC1wbGFuLXByaWNlIj4kMTQ5PC9zcGFuPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImN0LXBsYW4tZGVzYyI+VW5saW1pdGVkIGNhcm5pdmFscyBmb3IgMTIgbW9udGhzLiBCZXN0IGZvciBzY2hvb2xzICZhbXA7IHJlZ3VsYXIgZXZlbnRzLjwvZGl2PgogICAgICA8L2E+CiAgICA8L2Rpdj4KICAgIDxkaXYgY2xhc3M9ImN0LWRpdmlkZXIiPkFscmVhZHkgaGF2ZSBhIGNvZGU/PC9kaXY+CiAgICA8ZGl2IGNsYXNzPSJjdC1jb2RlLXJvdyI+CiAgICAgIDxpbnB1dCBpZD0iY3QtY29kZS1pbnB1dCIgY2xhc3M9ImN0LWNvZGUtaW5wdXQiIHR5cGU9InRleHQiIHBsYWNlaG9sZGVyPSJlLmcuIEFCQy0xMjM0IiBtYXhsZW5ndGg9IjEwIiBhdXRvY29tcGxldGU9Im9mZiIgc3BlbGxjaGVjaz0iZmFsc2UiPgogICAgICA8YnV0dG9uIGlkPSJjdC1jb2RlLXN1Ym1pdCIgY2xhc3M9ImN0LWNvZGUtc3VibWl0IiBvbmNsaWNrPSJjdFN1Ym1pdENvZGUoKSI+VW5sb2NrPC9idXR0b24+CiAgICA8L2Rpdj4KICAgIDxkaXYgaWQ9ImN0LWNvZGUtZXJyb3IiIGNsYXNzPSJjdC1jb2RlLWVycm9yIj48L2Rpdj4KICAgIDxkaXYgc3R5bGU9Im1hcmdpbi10b3A6MTZweDt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXNpemU6Ljc4cmVtO2NvbG9yOiM5NGEzYjgiPgogICAgICBTY2hvb2wgU3BvcnQgUG9ydGFsIHN1YnNjcmliZXJzOiBlbnRlciB5b3VyIHNjaG9vbCBjb2RlIGFib3ZlLjxicj4KICAgICAgPGEgaHJlZj0iaHR0cHM6Ly9zY2hvb2xzcG9ydHBvcnRhbC5jb20uYXUiIHRhcmdldD0iX2JsYW5rIiBzdHlsZT0iY29sb3I6IzFhNTZkYiI+R2V0IFNjaG9vbCBTcG9ydCBQb3J0YWwg4oaSPC9hPgogICAgPC9kaXY+CiAgPC9kaXY+CjwvZGl2Pgo8L2JvZHk+PC9odG1sPmApOwogIHdpbi5kb2N1bWVudC5jbG9zZSgpOwp9CgovLyBBdHRhY2ggbGFuZS1uYW1lIGF1dG9sb2FkIGFmdGVyIERPTSBpcyByZWFkeQpzZXRUaW1lb3V0KF9hdHRhY2hMYW5lTmFtZUF1dG9Mb2FkLCAxNTAwKTsKCi8vIOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkOKVkAovLyAgQ1QgdjguNS4wIOKAlCBBdXRvIEZpbmlzaCBMaW5lIERldGVjdGlvbgovLyDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZDilZAKbGV0IHhjQXV0b0RldGVjdE1vZGUgPSBmYWxzZTsKbGV0IHhjTGluZVAxICAgICAgICAgPSBudWxsOyAgIC8vIHt4LHl9IG5vcm1hbGlzZWQgMC0xCmxldCB4Y0xpbmVQMiAgICAgICAgID0gbnVsbDsKbGV0IHhjUHJldlNhbXBsZXMgICAgPSBudWxsOwpsZXQgeGNEZXRlY3RJbnRlcnZhbCA9IG51bGw7CmxldCB4Y0xhc3RUcmlnZ2VyICAgID0gMDsKbGV0IHhjRGlmZlRocmVzaG9sZCAgPSAyMjsgICAgIC8vIGNvbnRyb2xsZWQgYnkgc2Vuc2l0aXZpdHkgc2xpZGVyCmNvbnN0IFhDX0NPT0xET1dOX01TID0gMjgwMDsgICAvLyBtaW4gbXMgYmV0d2VlbiBhdXRvLWRldGVjdGlvbnMKY29uc3QgWENfU0FNUExFUyAgICAgPSA4MDsgICAgIC8vIHBpeGVscyBzYW1wbGVkIGFsb25nIGZpbmlzaCBsaW5lCgovLyDilIDilIAgTW9kZSB0b2dnbGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSACmZ1bmN0aW9uIHhjU3RhcnRBdXRvTW9kZSgpIHsKICB4Y0F1dG9EZXRlY3RNb2RlID0gdHJ1ZTsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFyc2hhbC10YXAtYnRuJykuc3R5bGUuZGlzcGxheSAgICA9ICdub25lJzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtYXV0by1tb2RlLWJ0bicpLnN0eWxlLmRpc3BsYXkgICA9ICdub25lJzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtYXV0by1iYXInKS5zdHlsZS5kaXNwbGF5ICAgICAgICA9ICdmbGV4JzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZGV0ZWN0LXN0YXR1cycpLnRleHRDb250ZW50ICAgICA9ICdEcmF3IHlvdXIgZmluaXNoIGxpbmUgdG8gYmVnaW4nOwogIHhjSW5pdENhbWVyYSgpLnRoZW4oKCkgPT4geGNTaG93TGluZVNldHVwKCkpOwp9CgpmdW5jdGlvbiB4Y1N0b3BBdXRvTW9kZSgpIHsKICB4Y0F1dG9EZXRlY3RNb2RlID0gZmFsc2U7CiAgeGNTdG9wRGV0ZWN0KCk7CiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21hcnNoYWwtdGFwLWJ0bicpLnN0eWxlLmRpc3BsYXkgICAgPSAnJzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtYXV0by1tb2RlLWJ0bicpLnN0eWxlLmRpc3BsYXkgICA9ICcnOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1hdXRvLWJhcicpLnN0eWxlLmRpc3BsYXkgICAgICAgID0gJ25vbmUnOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1saW5lLXNldHVwLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwp9CgovLyDilIDilIAgTGluZSBzZXR1cCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKZnVuY3Rpb24geGNTaG93TGluZVNldHVwKCkgewogIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtbGluZS1zZXR1cC1vdmVybGF5Jyk7CiAgb3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnOwogIHhjTGluZVAxID0gbnVsbDsgeGNMaW5lUDIgPSBudWxsOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1zdGFydC1kZXRlY3QtYnRuJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtbGluZS1pbnN0cnVjdGlvbicpLnRleHRDb250ZW50ICAgPSAnVGFwIHRoZSBMRUZUIGVkZ2Ugb2YgeW91ciBmaW5pc2ggbGluZSc7CgogIC8vIFdpcmUgdXAgdGhlIGNhbWVyYSBzdHJlYW0gdG8gdGhlIHNldHVwIHZpZGVvCiAgY29uc3QgdmlkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLXNldHVwLXZpZCcpOwogIGlmICh4Y0NhbVN0cmVhbSkgeyB2aWQuc3JjT2JqZWN0ID0geGNDYW1TdHJlYW07IHZpZC5wbGF5KCkuY2F0Y2goKCk9Pnt9KTsgfQoKICAvLyBSZXNpemUgY2FudmFzIHRvIG1hdGNoIG92ZXJsYXkKICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtbGluZS1jYW52YXMtb3ZlcmxheScpOwogIGNvbnN0IHJlc2l6ZSA9ICgpID0+IHsgY2FudmFzLndpZHRoID0gb3ZlcmxheS5jbGllbnRXaWR0aDsgY2FudmFzLmhlaWdodCA9IG92ZXJsYXkuY2xpZW50SGVpZ2h0OyB4Y0RyYXdMaW5lKCk7IH07CiAgcmVzaXplKCk7CiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZSk7CgogIC8vIFRhcCBoYW5kbGVyIG9uIHRoZSBjYW52YXMKICBjYW52YXMub250b3VjaHN0YXJ0ID0gKGUpID0+IHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB4Y0xpbmVTZXR1cFRhcChlLnRvdWNoZXNbMF0sIGNhbnZhcyk7IH07CiAgY2FudmFzLm9ubW91c2Vkb3duICA9IChlKSA9PiB4Y0xpbmVTZXR1cFRhcChlLCBjYW52YXMpOwp9CgpmdW5jdGlvbiB4Y0Nsb3NlTGluZVNldHVwKCkgewogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1saW5lLXNldHVwLW92ZXJsYXknKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnOwogIGlmICgheGNEZXRlY3RJbnRlcnZhbCkgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLWRldGVjdC1zdGF0dXMnKS50ZXh0Q29udGVudCA9ICdEcmF3IHlvdXIgZmluaXNoIGxpbmUgdG8gYmVnaW4nOwp9CgpmdW5jdGlvbiB4Y0xpbmVTZXR1cFRhcChlLCBjYW52YXMpIHsKICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOwogIGNvbnN0IHggPSAoZS5jbGllbnRYIC0gcmVjdC5sZWZ0KSAvIHJlY3Qud2lkdGg7CiAgY29uc3QgeSA9IChlLmNsaWVudFkgLSByZWN0LnRvcCkgIC8gcmVjdC5oZWlnaHQ7CgogIGlmICgheGNMaW5lUDEpIHsKICAgIHhjTGluZVAxID0ge3gsIHl9OwogICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3hjLWxpbmUtaW5zdHJ1Y3Rpb24nKS50ZXh0Q29udGVudCA9ICdOb3cgdGFwIHRoZSBSSUdIVCBlZGdlJzsKICB9IGVsc2UgaWYgKCF4Y0xpbmVQMikgewogICAgeGNMaW5lUDIgPSB7eCwgeX07CiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtbGluZS1pbnN0cnVjdGlvbicpLnRleHRDb250ZW50ID0gJ+KchSBMaW5lIHNldCDigJQgcmVhZHkgdG8gZGV0ZWN0JzsKICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1zdGFydC1kZXRlY3QtYnRuJykuc3R5bGUuZGlzcGxheSA9ICcnOwogIH0KICB4Y0RyYXdMaW5lKCk7Cn0KCmZ1bmN0aW9uIHhjUmVzZXRMaW5lKCkgewogIHhjTGluZVAxID0geGNMaW5lUDIgPSBudWxsOwogIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1zdGFydC1kZXRlY3QtYnRuJykuc3R5bGUuZGlzcGxheSA9ICdub25lJzsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtbGluZS1pbnN0cnVjdGlvbicpLnRleHRDb250ZW50ICAgPSAnVGFwIHRoZSBMRUZUIGVkZ2Ugb2YgeW91ciBmaW5pc2ggbGluZSc7CiAgeGNEcmF3TGluZSgpOwp9CgpmdW5jdGlvbiB4Y0RyYXdMaW5lKCkgewogIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd4Yy1saW5lLWNhbnZhcy1vdmVybGF5Jyk7CiAgY29uc3QgY3R4ICAgID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7CiAgY3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpOwogIGNvbnN0IFcgPSBjYW52YXMud2lkdGgsIEggPSBjYW52YXMuaGVpZ2h0OwoKICBpZiAoeGNMaW5lUDEpIHsKICAgIGN0eC5maWxsU3R5bGUgPSAnIzIyYzU1ZSc7CiAgICBjdHguYmVnaW5QYXRoKCk7CiAgICBjdHguYXJjKHhjTGluZVAxLnggKiBXLCB4Y0xpbmVQMS55ICogSCwgMTQsIDAsIE1hdGguUEkqMik7CiAgICBjdHguZmlsbCgpOwogICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsKICAgIGN0eC5mb250ID0gJ2JvbGQgMTJweCBzYW5zLXNlcmlmJzsKICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsKICAgIGN0eC5maWxsVGV4dCgnTCcsIHhjTGluZVAxLnggKiBXLCB4Y0xpbmVQMS55ICogSCArIDQpOwogIH0KICBpZiAoeGNMaW5lUDIpIHsKICAgIGN0eC5maWxsU3R5bGUgPSAnIzIyYzU1ZSc7CiAgICBjdHguYmVnaW5QYXRoKCk7CiAgICBjdHguYXJjKHhjTGluZVAyLnggKiBXLCB4Y0xpbmVQMi55ICogSCwgMTQsIDAsIE1hdGguUEkqMik7CiAgICBjdHguZmlsbCgpOwogICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJzsKICAgIGN0eC5mb250ID0gJ2JvbGQgMTJweCBzYW5zLXNlcmlmJzsKICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJzsKICAgIGN0eC5maWxsVGV4dCgnUicsIHhjTGluZVAyLnggKiBXLCB4Y0xpbmVQMi55ICogSCArIDQpOwogIH0KICBpZiAoeGNMaW5lUDEgJiYgeGNMaW5lUDIpIHsKICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZWY0NDQ0JzsKICAgIGN0eC5saW5lV2lkdGggICA9IDQ7CiAgICBjdHguc2V0TGluZURhc2goWzE0LCA3XSk7CiAgICBjdHguc2hhZG93Q29sb3IgPSAnI2VmNDQ0NCc7CiAgICBjdHguc2hhZG93Qmx1ciAgPSA4OwogICAgY3R4LmJlZ2luUGF0aCgpOwogICAgY3R4Lm1vdmVUbyh4Y0xpbmVQMS54ICogVywgeGNMaW5lUDEueSAqIEgpOwogICAgY3R4LmxpbmVUbyh4Y0xpbmVQMi54ICogVywgeGNMaW5lUDIueSAqIEgpOwogICAgY3R4LnN0cm9rZSgpOwogICAgY3R4LnNoYWRvd0JsdXIgPSAwOwogICAgY3R4LnNldExpbmVEYXNoKFtdKTsKICB9Cn0KCi8vIOKUgOKUgCBEZXRlY3Rpb24gbG9vcCDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIAKZnVuY3Rpb24geGNTdGFydERldGVjdCgpIHsKICBpZiAoIXhjTGluZVAxIHx8ICF4Y0xpbmVQMikgcmV0dXJuOwogIHhjQ2xvc2VMaW5lU2V0dXAoKTsKICB4Y1ByZXZTYW1wbGVzICAgID0gbnVsbDsKICB4Y0xhc3RUcmlnZ2VyICAgID0gMDsKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZGV0ZWN0LXN0YXR1cycpLnRleHRDb250ZW50ID0gJ/CflLQgRGV0ZWN0aW5nIOKAlCBydW5uZXJzIGF1dG8tcmVjb3JkZWQnOwogIHhjRGV0ZWN0SW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh4Y0FuYWx5c2VGcmFtZSwgMTEwKTsgLy8gfjkgZnBzCn0KCmZ1bmN0aW9uIHhjU3RvcERldGVjdCgpIHsKICBjbGVhckludGVydmFsKHhjRGV0ZWN0SW50ZXJ2YWwpOwogIHhjRGV0ZWN0SW50ZXJ2YWwgPSBudWxsOwogIHhjUHJldlNhbXBsZXMgICAgPSBudWxsOwp9CgpmdW5jdGlvbiB4Y0FuYWx5c2VGcmFtZSgpIHsKICBpZiAoIXhjQ2FtU3RyZWFtKSByZXR1cm47CiAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtY2FtJyk7CiAgY29uc3QgY2FwICAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtY2FwJyk7CiAgaWYgKCF2aWRlbyB8fCB2aWRlby5yZWFkeVN0YXRlIDwgMikgcmV0dXJuOwoKICBjb25zdCBXID0gMzIwLCBIID0gMjQwOwogIGNhcC53aWR0aCA9IFc7IGNhcC5oZWlnaHQgPSBIOwogIGNvbnN0IGN0eCA9IGNhcC5nZXRDb250ZXh0KCcyZCcpOwogIGN0eC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIFcsIEgpOwoKICBjb25zdCBpbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLCAwLCBXLCBIKTsKICBjb25zdCBzYW1wbGVzID0geGNTYW1wbGVMaW5lKGltZ0RhdGEsIHhjTGluZVAxLCB4Y0xpbmVQMiwgWENfU0FNUExFUyk7CgogIGlmICh4Y1ByZXZTYW1wbGVzKSB7CiAgICBjb25zdCBkaWZmID0geGNMaW5lRGlmZihzYW1wbGVzLCB4Y1ByZXZTYW1wbGVzKTsKICAgIGNvbnN0IG5vdyAgPSBEYXRlLm5vdygpOwogICAgaWYgKGRpZmYgPiB4Y0RpZmZUaHJlc2hvbGQgJiYgKG5vdyAtIHhjTGFzdFRyaWdnZXIpID4gWENfQ09PTERPV05fTVMpIHsKICAgICAgeGNMYXN0VHJpZ2dlciA9IG5vdzsKICAgICAgeGNBdXRvRmluaXNoKCk7CiAgICB9CiAgfQogIHhjUHJldlNhbXBsZXMgPSBzYW1wbGVzOwp9CgpmdW5jdGlvbiB4Y1NhbXBsZUxpbmUoaW1nRGF0YSwgcDEsIHAyLCBuKSB7CiAgY29uc3QgeyBkYXRhLCB3aWR0aCwgaGVpZ2h0IH0gPSBpbWdEYXRhOwogIGNvbnN0IG91dCA9IFtdOwogIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7CiAgICBjb25zdCB0ICA9IGkgLyAobiAtIDEpOwogICAgY29uc3QgcHggPSBNYXRoLm1pbih3aWR0aCAgLSAxLCBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKHAxLnggKiB3aWR0aCAgKyB0ICogKHAyLnggLSBwMS54KSAqIHdpZHRoKSkpOwogICAgY29uc3QgcHkgPSBNYXRoLm1pbihoZWlnaHQgLSAxLCBNYXRoLm1heCgwLCBNYXRoLnJvdW5kKHAxLnkgKiBoZWlnaHQgKyB0ICogKHAyLnkgLSBwMS55KSAqIGhlaWdodCkpKTsKICAgIGNvbnN0IGlkeCA9IChweSAqIHdpZHRoICsgcHgpICogNDsKICAgIG91dC5wdXNoKChkYXRhW2lkeF0gKyBkYXRhW2lkeCsxXSArIGRhdGFbaWR4KzJdKSAvIDMpOwogIH0KICByZXR1cm4gb3V0Owp9CgpmdW5jdGlvbiB4Y0xpbmVEaWZmKGEsIGIpIHsKICBsZXQgcyA9IDA7CiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSBzICs9IE1hdGguYWJzKGFbaV0gLSBiW2ldKTsKICByZXR1cm4gcyAvIGEubGVuZ3RoOwp9CgovLyDilIDilIAgQXV0by10cmlnZ2VyIGEgZmluaXNoIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgAphc3luYyBmdW5jdGlvbiB4Y0F1dG9GaW5pc2goKSB7CiAgaWYgKCF4Y1N0YXRlIHx8IHhjU3RhdGUuc3RhdGUgIT09ICdsaXZlJykgcmV0dXJuOwoKICBjb25zdCBlbGFwc2VkID0gbm93U2VydmVyKCkgLSB4Y1N0YXRlLnN0YXJ0ZWRBdFNlcnZlcjsKICBjb25zdCBjb3VudCAgID0gT2JqZWN0LmtleXMoeGNTdGF0ZS5maW5pc2hlcyB8fCB7fSkubGVuZ3RoOwogIGNvbnN0IHBsYWNlICAgPSBjb3VudCArIDE7CgogIC8vIEF1ZGlvICsgaGFwdGljIGZlZWRiYWNrCiAgeGNEZXRlY3RCZWVwKCk7CiAgdmlicmF0ZShbODAsIDQwLCA4MF0pOwoKICBjb25zdCBrZXkgPSBteUlkLnNsaWNlKDAsIDQpICsgJy0nICsgRGF0ZS5ub3coKS50b1N0cmluZygzNik7CiAgeGNDYXB0dXJlUGhvdG8oa2V5KTsgLy8gYnVyc3QgY2FwdHVyZQoKICAvLyBXcml0ZSB0byBGaXJlYmFzZSAoc2FtZSBzdHJ1Y3R1cmUgYXMgbWFyc2hhbFRhcCkKICBhd2FpdCBjUmVmKGB4Yy9jdXJyZW50L2ZpbmlzaGVzLyR7a2V5fWApLnNldCh7CiAgICBtYXJzaGFsSWQ6ICAgbXlJZCwKICAgIG1hcnNoYWxOYW1lOiBteU5hbWUgfHwgJ0F1dG8nLAogICAgYmliOiAgICAgICAgICcnLAogICAgbmFtZTogICAgICAgICcnLAogICAgZWxhcHNlZE1zOiAgIGVsYXBzZWQsCiAgICB0YXBBdDogICAgICAgZmlyZWJhc2UuZGF0YWJhc2UuU2VydmVyVmFsdWUuVElNRVNUQU1QLAogICAgYXV0b0RldGVjdGVkOiB0cnVlLAogIH0pOwoKICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZGV0ZWN0LXN0YXR1cycpLnRleHRDb250ZW50ID0gYOKaoSAjJHtwbGFjZX0gZGV0ZWN0ZWQg4oCUICR7Zm10TXMoZWxhcHNlZCl9YDsKICBzZXRUaW1lb3V0KCgpID0+IHsKICAgIGlmICh4Y0RldGVjdEludGVydmFsKSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgneGMtZGV0ZWN0LXN0YXR1cycpLnRleHRDb250ZW50ID0gJ/CflLQgRGV0ZWN0aW5nIOKAlCBydW5uZXJzIGF1dG8tcmVjb3JkZWQnOwogIH0sIDIwMDApOwoKICAvLyBRdWV1ZSBiaWIgZW50cnkg4oCUIGJ1dCB0cnkgT0NSIGZpcnN0IHdpdGggYXV0by1jb25maXJtCiAgYmliUGVuZGluZ1F1ZXVlLnB1c2goeyBrZXksIHBsYWNlLCBlbGFwc2VkLCBhdXRvRGV0ZWN0ZWQ6IHRydWUgfSk7CiAgaWYgKCFiaWJQZW5kaW5nS2V5KSBzaG93TmV4dEJpYigpOwp9CgpmdW5jdGlvbiB4Y0RldGVjdEJlZXAoKSB7CiAgdHJ5IHsKICAgIGNvbnN0IGFjICA9IG5ldyAod2luZG93LkF1ZGlvQ29udGV4dCB8fCB3aW5kb3cud2Via2l0QXVkaW9Db250ZXh0KSgpOwogICAgY29uc3Qgb3NjID0gYWMuY3JlYXRlT3NjaWxsYXRvcigpOwogICAgY29uc3QgZyAgID0gYWMuY3JlYXRlR2FpbigpOwogICAgb3NjLmNvbm5lY3QoZyk7IGcuY29ubmVjdChhYy5kZXN0aW5hdGlvbik7CiAgICBvc2MuZnJlcXVlbmN5LnZhbHVlID0gOTIwOwogICAgb3NjLnR5cGUgPSAnc2luZSc7CiAgICBnLmdhaW4uc2V0VmFsdWVBdFRpbWUoMC4zNSwgYWMuY3VycmVudFRpbWUpOwogICAgZy5nYWluLmV4cG9uZW50aWFsUmFtcFRvVmFsdWVBdFRpbWUoMC4wMDEsIGFjLmN1cnJlbnRUaW1lICsgMC4yNSk7CiAgICBvc2Muc3RhcnQoKTsgb3NjLnN0b3AoYWMuY3VycmVudFRpbWUgKyAwLjI1KTsKICB9IGNhdGNoKGUpIHt9Cn0KCgoKLy8g4pSA4pSAIENUIEFjY2VzcyBHYXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgApjb25zdCBDVF9BQ0NFU1NfQVBJID0gJ2h0dHBzOi8vY3QtYWNjZXNzLmx1Y2tkcmFnb24uaW8nOwpjb25zdCBDVF9BQ0NFU1NfS0VZID0gJ2N0X2FjY2Vzc192MSc7CgpmdW5jdGlvbiBjdEdldEFjY2VzcygpIHsKICB0cnkgewogICAgY29uc3QgcmF3ID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0oQ1RfQUNDRVNTX0tFWSk7CiAgICBpZiAoIXJhdykgcmV0dXJuIG51bGw7CiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShyYXcpOwogICAgaWYgKGRhdGEuZXhwaXJlcyAmJiBEYXRlLm5vdygpID4gZGF0YS5leHBpcmVzKSB7CiAgICAgIGxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKENUX0FDQ0VTU19LRVkpOwogICAgICByZXR1cm4gbnVsbDsKICAgIH0KICAgIHJldHVybiBkYXRhOwogIH0gY2F0Y2goZSkgeyByZXR1cm4gbnVsbDsgfQp9CgpmdW5jdGlvbiBjdFNldEFjY2VzcyhkYXRhKSB7CiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oQ1RfQUNDRVNTX0tFWSwgSlNPTi5zdHJpbmdpZnkoZGF0YSkpOwp9CgpmdW5jdGlvbiBjdFNob3dBY2Nlc3NCYWRnZShkYXRhKSB7CiAgY29uc3QgZXhpc3RpbmcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3QtYWNjZXNzLWJhZGdlJyk7CiAgaWYgKGV4aXN0aW5nKSBleGlzdGluZy5yZW1vdmUoKTsKICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpOwogIGJhZGdlLmlkID0gJ2N0LWFjY2Vzcy1iYWRnZSc7CiAgYmFkZ2Uuc3R5bGUuY3NzVGV4dCA9ICd0ZXh0LWFsaWduOmNlbnRlcjttYXJnaW4tdG9wOjZweDttYXJnaW4tYm90dG9tOi00cHgnOwogIGNvbnN0IGxhYmVsID0gZGF0YS50eXBlID09PSAnc3NwJyA/ICfinJMgJyArIChkYXRhLnNjaG9vbCB8fCAnU2Nob29sIFNwb3J0IFBvcnRhbCcpCiAgICA6IGRhdGEudHlwZSA9PT0gJ2FubnVhbCcgPyAn4pyTIEFubnVhbCB1bmxpbWl0ZWQgYWNjZXNzJwogICAgOiAn4pyTIFNpbmdsZSBjYXJuaXZhbCBhY2Nlc3MnOwogIGJhZGdlLmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz0iY3QtYWNjZXNzLWJhZGdlIj4nICsgbGFiZWwgKyAnPC9zcGFuPic7CiAgY29uc3QgYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3NjcmVlbi1ob21lIC5zdGFjayAuYnRuLXByaW1hcnknKTsKICBpZiAoYnRuKSBidG4uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdhZnRlcmVuZCcsIGJhZGdlKTsKfQoKY29uc3QgX2N0T3JpZ1Nob3dTY3JlZW4gPSB0eXBlb2Ygc2hvd1NjcmVlbiA9PT0gJ2Z1bmN0aW9uJyA/IHNob3dTY3JlZW4gOiBudWxsOwpjb25zdCBfY3RPcmlnUmVmID0gd2luZG93LnNob3dTY3JlZW47CgovLyBXcmFwIHNob3dTY3JlZW4gdG8gaW50ZXJjZXB0ICdzZXR1cCcKKGZ1bmN0aW9uKCkgewogIGNvbnN0IG9yaWcgPSB3aW5kb3cuc2hvd1NjcmVlbjsKICB3aW5kb3cuc2hvd1NjcmVlbiA9IGZ1bmN0aW9uKG5hbWUsIC4uLmFyZ3MpIHsKICAgIGlmIChuYW1lID09PSAnc2V0dXAnKSB7CiAgICAgIGNvbnN0IGFjY2VzcyA9IGN0R2V0QWNjZXNzKCk7CiAgICAgIGlmICghYWNjZXNzKSB7CiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N0LXBheXdhbGwtb3ZlcmxheScpLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpOwogICAgICAgIHJldHVybjsKICAgICAgfQogICAgfQogICAgcmV0dXJuIG9yaWcuY2FsbCh0aGlzLCBuYW1lLCAuLi5hcmdzKTsKICB9Owp9KSgpOwoKYXN5bmMgZnVuY3Rpb24gY3RTdWJtaXRDb2RlKCkgewogIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N0LWNvZGUtaW5wdXQnKTsKICBjb25zdCBidG4gICA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdC1jb2RlLXN1Ym1pdCcpOwogIGNvbnN0IGVyciAgID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N0LWNvZGUtZXJyb3InKTsKICBjb25zdCBjb2RlICA9IChpbnB1dC52YWx1ZSB8fCAnJykudHJpbSgpLnRvVXBwZXJDYXNlKCk7CiAgaWYgKCFjb2RlKSB7IGVyci50ZXh0Q29udGVudCA9ICdQbGVhc2UgZW50ZXIgeW91ciBjb2RlLic7IHJldHVybjsgfQogIGJ0bi5kaXNhYmxlZCA9IHRydWU7IGJ0bi50ZXh0Q29udGVudCA9ICdDaGVja2luZy4uLic7IGVyci50ZXh0Q29udGVudCA9ICcnOwogIHRyeSB7CiAgICBjb25zdCByZXNwID0gYXdhaXQgZmV0Y2goQ1RfQUNDRVNTX0FQSSArICcvdmFsaWRhdGUnLCB7CiAgICAgIG1ldGhvZDogJ1BPU1QnLAogICAgICBoZWFkZXJzOiB7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSwKICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb2RlIH0pCiAgICB9KTsKICAgIGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwLmpzb24oKTsKICAgIGlmIChkYXRhLnZhbGlkKSB7CiAgICAgIGN0U2V0QWNjZXNzKHsgY29kZSwgdHlwZTogZGF0YS50eXBlLCBzY2hvb2w6IGRhdGEuc2Nob29sLCBleHBpcmVzOiBkYXRhLmV4cGlyZXMsIHVubG9ja2VkOiBEYXRlLm5vdygpIH0pOwogICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3QtcGF5d2FsbC1vdmVybGF5JykuY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7CiAgICAgIGN0U2hvd0FjY2Vzc0JhZGdlKGRhdGEpOwogICAgICBzaG93U2NyZWVuKCdzZXR1cCcpOwogICAgfSBlbHNlIHsKICAgICAgZXJyLnRleHRDb250ZW50ID0gZGF0YS5lcnJvciB8fCAnSW52YWxpZCBjb2RlLiBQbGVhc2UgdHJ5IGFnYWluLic7CiAgICB9CiAgfSBjYXRjaChlKSB7CiAgICBlcnIudGV4dENvbnRlbnQgPSAnQ29ubmVjdGlvbiBlcnJvci4gUGxlYXNlIHRyeSBhZ2Fpbi4nOwogIH0gZmluYWxseSB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyBidG4udGV4dENvbnRlbnQgPSAnVW5sb2NrJzsgfQp9CgpmdW5jdGlvbiBjdFRyYWNrQ2xpY2sodHlwZSkgeyBjb25zb2xlLmxvZygnQ1QgcHVyY2hhc2UgY2xpY2s6JywgdHlwZSk7IH0KCmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbigpIHsKICBjb25zdCBhY2Nlc3MgPSBjdEdldEFjY2VzcygpOwogIGlmIChhY2Nlc3MpIGN0U2hvd0FjY2Vzc0JhZGdlKGFjY2Vzcyk7CiAgY29uc3QgaW5wID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N0LWNvZGUtaW5wdXQnKTsKICBpZiAoaW5wKSB7CiAgICBpbnAuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGZ1bmN0aW9uKGUpIHsgaWYgKGUua2V5ID09PSAnRW50ZXInKSBjdFN1Ym1pdENvZGUoKTsgfSk7CiAgICBpbnAuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCBmdW5jdGlvbigpIHsKICAgICAgY29uc3QgcG9zID0gdGhpcy5zZWxlY3Rpb25TdGFydDsKICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUudG9VcHBlckNhc2UoKS5yZXBsYWNlKC9bXkEtWjAtOS1dL2csICcnKTsKICAgICAgdGhpcy5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIHBvcyk7CiAgICB9KTsKICB9Cn0pOwoKPC9zY3JpcHQ+Cg==";
    if (request.method === "GET") {
      const html = new TextDecoder().decode(Uint8Array.from(atob(INDEX_HTML_B64), (c) => c.charCodeAt(0)));
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, max-age=300",
          "X-Frame-Options": "DENY",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }
    return new Response("Not found", { status: 404, headers: cors });
  }
};
function j(obj) {
  return JSON.stringify(obj);
}
__name(j, "j");
__name2(j, "j");
__name22(j, "j");
__name222(j, "j");
function getAt(obj, path) {
  if (!path) return obj;
  return path.split("/").reduce((o, k) => o == null ? void 0 : o[k], obj);
}
__name(getAt, "getAt");
__name2(getAt, "getAt");
__name22(getAt, "getAt");
__name222(getAt, "getAt");
function setAt(obj, path, value) {
  if (!path) return value;
  const keys = path.split("/");
  const result = deepClone(obj) || {};
  let curr = result;
  for (let i = 0; i < keys.length - 1; i++) {
    curr[keys[i]] = deepClone(curr[keys[i]]) || {};
    curr = curr[keys[i]];
  }
  curr[keys[keys.length - 1]] = value;
  return result;
}
__name(setAt, "setAt");
__name2(setAt, "setAt");
__name22(setAt, "setAt");
__name222(setAt, "setAt");
function stamp(val) {
  if (val == null || typeof val !== "object") return val;
  if (val[".sv"] === "timestamp") return Date.now();
  const out = Array.isArray(val) ? [] : {};
  for (const [k, v] of Object.entries(val)) out[k] = stamp(v);
  return out;
}
__name(stamp, "stamp");
__name2(stamp, "stamp");
__name22(stamp, "stamp");
__name222(stamp, "stamp");
function deepClone(val) {
  if (val == null || typeof val !== "object") return val;
  return JSON.parse(JSON.stringify(val));
}
__name(deepClone, "deepClone");
__name2(deepClone, "deepClone");
__name22(deepClone, "deepClone");
__name222(deepClone, "deepClone");
export {
  CarnivalRoom,
  worker_default as default
};
//# sourceMappingURL=worker.js.map
