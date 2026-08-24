window.__ModuleLoader__.load({ id: "dsh-custom-skin", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.ts
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/locales.ts
var en = {
  nav: "Wallpaper",
  title: "Wallpaper & skin",
  intro: "Use your own images behind DSH Web. Images stay in this browser and are never uploaded to the server.",
  upload: "Add wallpapers",
  uploadHint: "Choose or drop JPG, PNG, WebP, GIF, or AVIF images (up to 20 MB each).",
  empty: "No wallpapers yet. Add an image to get started.",
  active: "Active",
  use: "Use",
  remove: "Remove",
  enabled: "Show wallpaper",
  enabledHint: "Temporarily hide the image without deleting it.",
  fit: "Image fit",
  cover: "Fill screen",
  contain: "Show full image",
  stretch: "Stretch",
  position: "Position",
  center: "Center",
  top: "Top",
  bottom: "Bottom",
  dim: "Image shading",
  blur: "Image blur",
  surface: "Panel opacity",
  reset: "Reset appearance",
  clear: "Delete all wallpapers",
  loading: "Loading local wallpapers\u2026",
  storageError: "This browser could not open local image storage.",
  invalidFile: "Some files were skipped because they were not supported images or exceeded 20 MB.",
  uploadError: "The image could not be saved. Browser storage may be full."
};
var zh = {
  nav: "\u4E2A\u6027\u5316",
  title: "\u58C1\u7EB8\u4E0E\u76AE\u80A4",
  intro: "\u7528\u81EA\u5DF1\u7684\u56FE\u7247\u88C5\u9970 DSH Web\u3002\u56FE\u7247\u53EA\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\uFF0C\u4E0D\u4F1A\u4E0A\u4F20\u5230\u670D\u52A1\u7AEF\u3002",
  upload: "\u6DFB\u52A0\u58C1\u7EB8",
  uploadHint: "\u9009\u62E9\u6216\u62D6\u5165 JPG\u3001PNG\u3001WebP\u3001GIF\u3001AVIF \u56FE\u7247\uFF08\u6BCF\u5F20\u6700\u5927 20 MB\uFF09\u3002",
  empty: "\u8FD8\u6CA1\u6709\u58C1\u7EB8\uFF0C\u5148\u6DFB\u52A0\u4E00\u5F20\u56FE\u7247\u5427\u3002",
  active: "\u4F7F\u7528\u4E2D",
  use: "\u4F7F\u7528",
  remove: "\u5220\u9664",
  enabled: "\u663E\u793A\u58C1\u7EB8",
  enabledHint: "\u4E34\u65F6\u9690\u85CF\u56FE\u7247\uFF0C\u4E0D\u4F1A\u5220\u9664\u5DF2\u7ECF\u4FDD\u5B58\u7684\u58C1\u7EB8\u3002",
  fit: "\u56FE\u7247\u586B\u5145",
  cover: "\u94FA\u6EE1\u5C4F\u5E55",
  contain: "\u5B8C\u6574\u663E\u793A",
  stretch: "\u62C9\u4F38",
  position: "\u56FE\u7247\u4F4D\u7F6E",
  center: "\u5C45\u4E2D",
  top: "\u9876\u90E8",
  bottom: "\u5E95\u90E8",
  dim: "\u58C1\u7EB8\u906E\u7F69",
  blur: "\u58C1\u7EB8\u6A21\u7CCA",
  surface: "\u9762\u677F\u900F\u660E\u5EA6",
  reset: "\u6062\u590D\u9ED8\u8BA4\u5916\u89C2",
  clear: "\u5220\u9664\u5168\u90E8\u58C1\u7EB8",
  loading: "\u6B63\u5728\u8BFB\u53D6\u672C\u5730\u58C1\u7EB8\u2026",
  storageError: "\u5F53\u524D\u6D4F\u89C8\u5668\u65E0\u6CD5\u6253\u5F00\u672C\u5730\u56FE\u7247\u5B58\u50A8\u3002",
  invalidFile: "\u90E8\u5206\u6587\u4EF6\u4E0D\u662F\u652F\u6301\u7684\u56FE\u7247\u683C\u5F0F\u6216\u8D85\u8FC7 20 MB\uFF0C\u5DF2\u8DF3\u8FC7\u3002",
  uploadError: "\u56FE\u7247\u4FDD\u5B58\u5931\u8D25\uFF0C\u6D4F\u89C8\u5668\u5B58\u50A8\u7A7A\u95F4\u53EF\u80FD\u5DF2\u6EE1\u3002"
};

// src/client/skin-controller.ts
var DB_NAME = "dsh-custom-skin";
var DB_VERSION = 1;
var STORE = "wallpapers";
var PREFS_KEY = "dsh-custom-skin.preferences.v1";
var MAX_IMAGE_BYTES = 20 * 1024 * 1024;
var MAX_IMAGES = 24;
var IMAGE_TYPES = /* @__PURE__ */ new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);
var DEFAULTS = {
  enabled: true,
  fit: "cover",
  position: "center",
  dim: 12,
  blur: 0,
  surface: 44
};
var TOKENS = [
  "--dsw-alias-bg-base",
  "--dsw-alias-bg-layer-1",
  "--dsw-alias-bg-layer-2",
  "--dsw-alias-bg-layer-3",
  "--dsw-alias-bg-module-platform",
  "--dsw-alias-bg-overlay",
  "--dsw-specific-input-major",
  "--dsw-specific-sidebar-fill",
  "--dsw-specific-selector",
  "--dsw-specific-sidebar-nav-item-active",
  "--dsw-specific-sidebar-nav-item-hover"
];
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}
function parsePreferences() {
  try {
    const value = JSON.parse(localStorage.getItem(PREFS_KEY) ?? "{}");
    return {
      activeId: typeof value.activeId === "string" ? value.activeId : void 0,
      enabled: typeof value.enabled === "boolean" ? value.enabled : DEFAULTS.enabled,
      fit: value.fit === "contain" || value.fit === "fill" ? value.fit : DEFAULTS.fit,
      position: value.position === "top" || value.position === "bottom" ? value.position : DEFAULTS.position,
      dim: clamp(Number(value.dim ?? DEFAULTS.dim), 0, 75),
      blur: clamp(Number(value.blur ?? DEFAULTS.blur), 0, 24),
      surface: clamp(Number(value.surface ?? DEFAULTS.surface), 10, 96)
    };
  } catch {
    return { ...DEFAULTS };
  }
}
function requestResult(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error ?? new Error("IndexedDB request failed"));
    };
  });
}
function transactionDone(transaction) {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => {
      resolve();
    };
    transaction.onabort = () => {
      reject(transaction.error ?? new Error("IndexedDB transaction aborted"));
    };
    transaction.onerror = () => {
      reject(transaction.error ?? new Error("IndexedDB transaction failed"));
    };
  });
}
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) {
        request.result.createObjectStore(STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onerror = () => {
      reject(request.error ?? new Error("IndexedDB open failed"));
    };
  });
}
function makeId() {
  return typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
var SkinController = class {
  snapshot = { ...parsePreferences(), ready: false, wallpapers: [] };
  listeners = /* @__PURE__ */ new Set();
  objectUrls = /* @__PURE__ */ new Map();
  originalTokens = /* @__PURE__ */ new Map();
  writtenTokens = /* @__PURE__ */ new Map();
  database;
  queue = Promise.resolve();
  disposed = false;
  observer;
  constructor() {
    this.observer = new MutationObserver(() => {
      this.applyPresentation();
    });
    this.observer.observe(document.body, { attributes: true, attributeFilter: ["data-ds-dark-theme"] });
  }
  /** Return the immutable current snapshot. */
  getSnapshot = () => this.snapshot;
  /** Subscribe to state changes. */
  subscribe = (listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  /** Load the local wallpaper library and apply the saved choice. */
  async initialize() {
    try {
      this.database = await openDatabase();
      const transaction = this.database.transaction(STORE, "readonly");
      const records = await requestResult(transaction.objectStore(STORE).getAll());
      const wallpapers = records.sort((left, right) => right.createdAt - left.createdAt).map((record) => ({
        id: record.id,
        name: record.name,
        createdAt: record.createdAt,
        url: this.createUrl(record.id, record.blob)
      }));
      const activeId = wallpapers.some((item) => item.id === this.snapshot.activeId) ? this.snapshot.activeId : wallpapers[0]?.id;
      this.publish({ ...this.snapshot, activeId, ready: true, wallpapers });
      this.persist();
    } catch {
      this.publish({ ...this.snapshot, ready: true, error: "storage" });
    }
  }
  /** Add supported images to the local library. */
  addFiles(files) {
    const valid = files.filter((file) => IMAGE_TYPES.has(file.type) && file.size > 0 && file.size <= MAX_IMAGE_BYTES);
    const skipped = valid.length !== files.length;
    this.queue = this.queue.then(async () => {
      if (this.database === void 0 || valid.length === 0) {
        if (skipped) this.publish({ ...this.snapshot, error: "invalid-file" });
        return;
      }
      try {
        const capacity = Math.max(0, MAX_IMAGES - this.snapshot.wallpapers.length);
        const accepted = valid.slice(0, capacity);
        const transaction = this.database.transaction(STORE, "readwrite");
        const records = accepted.map((file, index) => ({
          id: makeId(),
          name: file.name,
          type: file.type,
          blob: file,
          createdAt: Date.now() + index
        }));
        for (const record of records) transaction.objectStore(STORE).put(record);
        await transactionDone(transaction);
        const added = records.map((record) => ({
          id: record.id,
          name: record.name,
          createdAt: record.createdAt,
          url: this.createUrl(record.id, record.blob)
        })).reverse();
        this.publish({
          ...this.snapshot,
          activeId: this.snapshot.activeId ?? added[0]?.id,
          error: skipped || accepted.length !== valid.length ? "invalid-file" : void 0,
          wallpapers: [...added, ...this.snapshot.wallpapers]
        });
        this.persist();
      } catch {
        this.publish({ ...this.snapshot, error: "upload" });
      }
    });
    return this.queue;
  }
  /** Select one saved image. */
  select(id) {
    if (!this.snapshot.wallpapers.some((item) => item.id === id)) return;
    this.update({ activeId: id, enabled: true, error: void 0 });
  }
  /** Delete one saved image. */
  remove(id) {
    this.queue = this.queue.then(async () => {
      if (this.database === void 0) return;
      const transaction = this.database.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).delete(id);
      await transactionDone(transaction);
      const wallpapers = this.snapshot.wallpapers.filter((item) => item.id !== id);
      const url = this.objectUrls.get(id);
      if (url !== void 0) URL.revokeObjectURL(url);
      this.objectUrls.delete(id);
      this.publish({
        ...this.snapshot,
        activeId: this.snapshot.activeId === id ? wallpapers[0]?.id : this.snapshot.activeId,
        wallpapers,
        error: void 0
      });
      this.persist();
    });
    return this.queue;
  }
  /** Delete the complete local image library. */
  clear() {
    this.queue = this.queue.then(async () => {
      if (this.database === void 0) return;
      const transaction = this.database.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).clear();
      await transactionDone(transaction);
      for (const url of this.objectUrls.values()) URL.revokeObjectURL(url);
      this.objectUrls.clear();
      this.publish({ ...this.snapshot, activeId: void 0, wallpapers: [], error: void 0 });
      this.persist();
    });
    return this.queue;
  }
  setEnabled(enabled) {
    this.update({ enabled });
  }
  setFit(fit) {
    this.update({ fit });
  }
  setPosition(position) {
    this.update({ position });
  }
  setDim(dim) {
    this.update({ dim: clamp(dim, 0, 75) });
  }
  setBlur(blur) {
    this.update({ blur: clamp(blur, 0, 24) });
  }
  setSurface(surface) {
    this.update({ surface: clamp(surface, 10, 96) });
  }
  /** Restore presentation defaults without deleting images. */
  reset() {
    this.publish({ ...this.snapshot, ...DEFAULTS, error: void 0 });
    this.persist();
  }
  /** Release DOM state and browser resources. */
  dispose() {
    this.disposed = true;
    this.observer.disconnect();
    this.database?.close();
    for (const url of this.objectUrls.values()) URL.revokeObjectURL(url);
    this.objectUrls.clear();
    this.clearPresentation();
    this.listeners.clear();
  }
  update(patch) {
    this.publish({ ...this.snapshot, ...patch });
    this.persist();
  }
  publish(snapshot) {
    if (this.disposed) return;
    this.snapshot = Object.freeze({ ...snapshot, wallpapers: Object.freeze([...snapshot.wallpapers]) });
    this.applyPresentation();
    for (const listener of this.listeners) listener();
  }
  persist() {
    const { activeId, enabled, fit, position, dim, blur, surface } = this.snapshot;
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify({ activeId, enabled, fit, position, dim, blur, surface }));
    } catch {
    }
  }
  createUrl(id, blob) {
    const url = URL.createObjectURL(blob);
    this.objectUrls.set(id, url);
    return url;
  }
  applyPresentation() {
    const active = this.snapshot.wallpapers.find((item) => item.id === this.snapshot.activeId);
    if (!this.snapshot.enabled || active === void 0) {
      this.clearPresentation();
      return;
    }
    const body = document.body;
    const dark = body.hasAttribute("data-ds-dark-theme");
    const alpha = this.snapshot.surface / 100;
    const raised = clamp(alpha + 0.12, 0, 0.98);
    const subtle = clamp(alpha - 0.08, 0, 0.9);
    const rgb = dark ? "18 22 30" : "255 255 255";
    this.captureThemeTokens(body);
    body.dataset.dshCustomSkin = "on";
    body.style.setProperty("--dsh-skin-image", `url("${active.url}")`);
    body.style.setProperty("--dsh-skin-fit", this.snapshot.fit);
    body.style.setProperty("--dsh-skin-position", this.snapshot.position);
    body.style.setProperty("--dsh-skin-dim", String(this.snapshot.dim / 100));
    body.style.setProperty("--dsh-skin-blur", `${this.snapshot.blur}px`);
    body.style.setProperty("--dsh-skin-fallback", dark ? "#11151d" : "#dce7f1");
    this.writeToken(body, "--dsw-alias-bg-base", `rgb(${rgb} / ${subtle})`);
    this.writeToken(body, "--dsw-alias-bg-layer-1", `rgb(${rgb} / ${alpha})`);
    this.writeToken(body, "--dsw-alias-bg-layer-2", `rgb(${rgb} / ${raised})`);
    this.writeToken(body, "--dsw-alias-bg-layer-3", `rgb(${rgb} / ${raised})`);
    this.writeToken(body, "--dsw-alias-bg-module-platform", `rgb(${rgb} / ${clamp(alpha + 0.08, 0, 0.98)})`);
    this.writeToken(body, "--dsw-alias-bg-overlay", `rgb(${rgb} / ${clamp(alpha + 0.2, 0, 0.99)})`);
    this.writeToken(body, "--dsw-specific-input-major", `rgb(${rgb} / ${raised})`);
    this.writeToken(body, "--dsw-specific-sidebar-fill", `rgb(${rgb} / ${alpha})`);
    this.writeToken(body, "--dsw-specific-selector", `rgb(${rgb} / ${raised})`);
    this.writeToken(body, "--dsw-specific-sidebar-nav-item-active", `rgb(${rgb} / ${clamp(alpha + 0.18, 0, 0.99)})`);
    this.writeToken(body, "--dsw-specific-sidebar-nav-item-hover", `rgb(${rgb} / ${clamp(alpha + 0.1, 0, 0.99)})`);
  }
  captureThemeTokens(body) {
    for (const name of TOKENS) {
      const current = body.style.getPropertyValue(name);
      if (this.writtenTokens.get(name) === current) continue;
      this.originalTokens.set(name, { value: current, priority: body.style.getPropertyPriority(name) });
    }
  }
  writeToken(body, name, value) {
    body.style.setProperty(name, value);
    this.writtenTokens.set(name, value);
  }
  clearPresentation() {
    const body = document.body;
    delete body.dataset.dshCustomSkin;
    for (const name of [
      "--dsh-skin-image",
      "--dsh-skin-fit",
      "--dsh-skin-position",
      "--dsh-skin-dim",
      "--dsh-skin-blur",
      "--dsh-skin-fallback"
    ]) body.style.removeProperty(name);
    for (const name of TOKENS) {
      const original = this.originalTokens.get(name);
      if (original === void 0 || original.value === "") body.style.removeProperty(name);
      else body.style.setProperty(name, original.value, original.priority);
    }
    this.writtenTokens.clear();
  }
};

// src/client/SkinSection.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
function SkinSection({ t, useSkin, controller }) {
  const state = useSkin((snapshot) => snapshot);
  const [dragging, setDragging] = (0, import_react.useState)(false);
  const add = (files) => {
    if (files === null) return;
    void controller.addFiles([...files]);
  };
  const onInput = (event) => {
    add(event.target.files);
    event.target.value = "";
  };
  const onDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    add(event.dataTransfer.files);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "dsh-skin-section", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: t("title") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsh-skin-intro", children: t("intro") })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "label",
      {
        className: "dsh-skin-drop",
        "data-dragging": dragging || void 0,
        onDragEnter: () => {
          setDragging(true);
        },
        onDragLeave: () => {
          setDragging(false);
        },
        onDragOver: (event) => {
          event.preventDefault();
        },
        onDrop,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: t("upload") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-skin-hint", children: t("uploadHint") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "file", accept: "image/jpeg,image/png,image/webp,image/gif,image/avif", multiple: true, onChange: onInput })
        ]
      }
    ),
    state.error !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsh-skin-error", role: "alert", children: t(state.error === "storage" ? "storageError" : state.error === "invalid-file" ? "invalidFile" : "uploadError") }),
    !state.ready ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsh-skin-hint", children: t("loading") }) : state.wallpapers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "dsh-skin-hint", children: t("empty") }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-skin-grid", children: state.wallpapers.map((item) => {
      const active = item.id === state.activeId;
      return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "dsh-skin-card", "data-active": active || void 0, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { className: "dsh-skin-thumb", src: item.url, alt: item.name }),
        active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-skin-badge", children: t("active") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-skin-card-body", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-skin-name", title: item.name, children: item.name }),
          !active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-skin-button", type: "button", onClick: () => {
            controller.select(item.id);
          }, children: t("use") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-skin-button dsh-skin-button-danger", type: "button", onClick: () => {
            void controller.remove(item.id);
          }, children: t("remove") })
        ] })
      ] }, item.id);
    }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsh-skin-toggle", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: state.enabled, onChange: (event) => {
        controller.setEnabled(event.target.checked);
      } }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dsh-skin-toggle-copy", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("enabled") }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { className: "dsh-skin-hint", children: t("enabledHint") })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-skin-controls", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsh-skin-control", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-skin-control-head", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("fit") }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: state.fit, onChange: (event) => {
          controller.setFit(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "cover", children: t("cover") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "contain", children: t("contain") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "fill", children: t("stretch") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsh-skin-control", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-skin-control-head", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("position") }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", { value: state.position, onChange: (event) => {
          controller.setPosition(event.target.value);
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "center", children: t("center") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "top", children: t("top") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { value: "bottom", children: t("bottom") })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsh-skin-control", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dsh-skin-control-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("dim") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [
            state.dim,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "range", min: "0", max: "75", value: state.dim, onChange: (event) => {
          controller.setDim(event.target.valueAsNumber);
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsh-skin-control", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dsh-skin-control-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("blur") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [
            state.blur,
            "px"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "range", min: "0", max: "24", value: state.blur, onChange: (event) => {
          controller.setBlur(event.target.valueAsNumber);
        } })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { className: "dsh-skin-control", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dsh-skin-control-head", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("surface") }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("output", { children: [
            state.surface,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "range", min: "10", max: "96", value: state.surface, onChange: (event) => {
          controller.setSurface(event.target.valueAsNumber);
        } })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-skin-actions", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-skin-button", type: "button", onClick: () => {
        controller.reset();
      }, children: t("reset") }),
      state.wallpapers.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { className: "dsh-skin-button dsh-skin-button-danger", type: "button", onClick: () => {
        void controller.clear();
      }, children: t("clear") })
    ] })
  ] });
}

// src/client/styles.ts
var GLOBAL_STYLES = String.raw`
body[data-dsh-custom-skin='on'] {
  background: var(--dsh-skin-fallback, #dce7f1);
}

body[data-dsh-custom-skin='on']::before,
body[data-dsh-custom-skin='on']::after {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  content: '';
}

body[data-dsh-custom-skin='on']::before {
  inset: calc(var(--dsh-skin-blur, 0px) * -1.5);
  background-image: var(--dsh-skin-image);
  background-position: var(--dsh-skin-position, center);
  background-repeat: no-repeat;
  background-size: var(--dsh-skin-fit, cover);
  filter: blur(var(--dsh-skin-blur, 0px));
  transform: scale(1.015);
}

body[data-dsh-custom-skin='on']::after {
  background: rgb(0 0 0 / var(--dsh-skin-dim, 0.12));
}

body[data-dsh-custom-skin='on'] #root {
  position: relative;
  z-index: 1;
  background: transparent;
}

.dsh-skin-section {
  display: flex;
  max-width: 760px;
  flex-direction: column;
  gap: 20px;
  color: var(--dsw-alias-label-primary);
}

.dsh-skin-section h2,
.dsh-skin-section p { margin: 0; }
.dsh-skin-section h2 { font-size: 18px; font-weight: 600; }
.dsh-skin-intro, .dsh-skin-hint { color: var(--dsw-alias-label-tertiary); font-size: 13px; line-height: 1.55; }
.dsh-skin-error { color: var(--dsw-alias-state-error-primary); font-size: 13px; }

.dsh-skin-drop {
  display: flex;
  min-height: 96px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 7px;
  padding: 18px;
  border: 1px dashed var(--dsw-alias-border-l3);
  border-radius: 16px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-3) 70%, transparent);
  cursor: pointer;
  text-align: center;
}
.dsh-skin-drop:hover, .dsh-skin-drop[data-dragging='true'] { border-color: var(--dsw-alias-brand-primary); background: var(--dsw-alias-interactive-bg-hover); }
.dsh-skin-drop strong { font-size: 14px; font-weight: 550; }
.dsh-skin-drop input { display: none; }

.dsh-skin-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}
.dsh-skin-card {
  position: relative;
  overflow: hidden;
  min-width: 0;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 14px;
  background: color-mix(in srgb, var(--dsw-alias-bg-layer-2) 75%, transparent);
}
.dsh-skin-card[data-active='true'] { border-color: var(--dsw-alias-brand-primary); box-shadow: 0 0 0 1px var(--dsw-alias-brand-primary); }
.dsh-skin-thumb { display: block; width: 100%; aspect-ratio: 16 / 10; object-fit: cover; background: var(--dsw-alias-bg-module-platform); }
.dsh-skin-card-body { display: flex; align-items: center; gap: 6px; padding: 8px; }
.dsh-skin-name { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 12px; }
.dsh-skin-badge { position: absolute; top: 8px; left: 8px; padding: 3px 8px; border-radius: 999px; background: rgb(0 0 0 / 0.62); color: white; font-size: 11px; }

.dsh-skin-button {
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  padding: 5px 9px;
  background: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.dsh-skin-button:hover { background: var(--dsw-alias-interactive-bg-hover-solid); }
.dsh-skin-button-danger { color: var(--dsw-alias-state-error-primary); }

.dsh-skin-controls { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px 24px; }
.dsh-skin-control { display: flex; min-width: 0; flex-direction: column; gap: 7px; }
.dsh-skin-control-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 13px; }
.dsh-skin-control output { color: var(--dsw-alias-label-tertiary); font-variant-numeric: tabular-nums; }
.dsh-skin-control select {
  height: 34px;
  border: 1px solid var(--dsw-alias-border-l2);
  border-radius: 8px;
  padding: 0 10px;
  background: var(--dsw-alias-bg-layer-3);
  color: var(--dsw-alias-label-primary);
  font: inherit;
}
.dsh-skin-control input[type='range'] { width: 100%; accent-color: var(--dsw-alias-brand-primary); }
.dsh-skin-toggle { display: flex; align-items: center; gap: 10px; }
.dsh-skin-toggle input { width: 18px; height: 18px; accent-color: var(--dsw-alias-brand-primary); }
.dsh-skin-toggle-copy { display: flex; flex-direction: column; gap: 2px; }
.dsh-skin-toggle-copy span { font-size: 13px; }

.dsh-skin-actions { display: flex; flex-wrap: wrap; gap: 8px; padding-top: 4px; border-top: 1px solid var(--dsw-alias-border-l2); }

@media (max-width: 700px) {
  .dsh-skin-controls { grid-template-columns: 1fr; }
  .dsh-skin-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (prefers-reduced-motion: reduce) {
  body[data-dsh-custom-skin='on']::before { filter: none; }
}
`;
function installStyles() {
  const tag = document.createElement("style");
  tag.dataset.plugin = "dsh-custom-skin";
  tag.textContent = GLOBAL_STYLES;
  document.head.append(tag);
  return () => {
    tag.remove();
  };
}

// src/client/index.ts
var NS = "dsh.custom-skin";
var inject = ["slots", "locale"];
function apply(ctx) {
  const controller = new SkinController();
  const t = ctx.locale.bind(NS);
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), "dsh-custom-skin: dictionaries");
  ctx.effect(() => installStyles(), "dsh-custom-skin: global styles");
  ctx.effect(() => {
    void controller.initialize();
    return () => {
      controller.dispose();
    };
  }, "dsh-custom-skin: local wallpaper runtime");
  ctx.slots.inject("settings.section", () => ctx.slots.register({
    name: "settings.section",
    id: "custom-skin",
    order: 12,
    label: () => t("nav"),
    locale: NS,
    inject: () => ({ controller, hooks: { skin: controller } })
  }, SkinSection));
}
return module.exports; } });
//# sourceMappingURL=client.js.map
