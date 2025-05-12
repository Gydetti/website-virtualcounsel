/* Partytown 0.11.0 - MIT QwikDev */
((e) => {
	let [t, n, r, o, i, s, a, c, u] = e.g;
	e.g = undefined;
	const d = Symbol();
	const l = Symbol();
	const f = Symbol();
	const h = Symbol();
	const g = Symbol();
	const m = Symbol();
	const p = [];
	const S = (e, t, n) => (e[t] = k(t, n));
	const k = (e, t) => Object.defineProperty(t, "name", { value: e });
	let b;
	let y;
	let v;
	let B;
	let E;
	let N;
	let T;
	let L;
	let R;
	!((e) => {
		(e[(e.MainDataRequestFromWorker = 0)] = "MainDataRequestFromWorker"),
			(e[(e.MainDataResponseToWorker = 1)] = "MainDataResponseToWorker"),
			(e[(e.MainInterfacesRequestFromWorker = 2)] =
				"MainInterfacesRequestFromWorker"),
			(e[(e.MainInterfacesResponseToWorker = 3)] =
				"MainInterfacesResponseToWorker"),
			(e[(e.InitializedWebWorker = 4)] = "InitializedWebWorker"),
			(e[(e.InitializeEnvironment = 5)] = "InitializeEnvironment"),
			(e[(e.InitializedEnvironmentScript = 6)] =
				"InitializedEnvironmentScript"),
			(e[(e.InitializeNextScript = 7)] = "InitializeNextScript"),
			(e[(e.InitializedScripts = 8)] = "InitializedScripts"),
			(e[(e.RefHandlerCallback = 9)] = "RefHandlerCallback"),
			(e[(e.ForwardMainTrigger = 10)] = "ForwardMainTrigger"),
			(e[(e.ForwardWorkerAccessRequest = 11)] = "ForwardWorkerAccessRequest"),
			(e[(e.AsyncAccessRequest = 12)] = "AsyncAccessRequest"),
			(e[(e.LocationUpdate = 13)] = "LocationUpdate"),
			(e[(e.DocumentVisibilityState = 14)] = "DocumentVisibilityState"),
			(e[(e.CustomElementCallback = 15)] = "CustomElementCallback");
	})(b || (b = {})),
		((e) => {
			(e[(e.PushState = 0)] = "PushState"),
				(e[(e.ReplaceState = 1)] = "ReplaceState"),
				(e[(e.PopState = 2)] = "PopState"),
				(e[(e.HashChange = 3)] = "HashChange");
		})(y || (y = {})),
		((e) => {
			(e[(e.Window = 0)] = "Window"),
				(e[(e.Element = 1)] = "Element"),
				(e[(e.AttributeNode = 2)] = "AttributeNode"),
				(e[(e.TextNode = 3)] = "TextNode"),
				(e[(e.CDataSectionNode = 4)] = "CDataSectionNode"),
				(e[(e.Function = 5)] = "Function"),
				(e[(e.Property = 6)] = "Property"),
				(e[(e.ProcessingInstructionNode = 7)] = "ProcessingInstructionNode"),
				(e[(e.CommentNode = 8)] = "CommentNode"),
				(e[(e.Document = 9)] = "Document"),
				(e[(e.DocumentTypeNode = 10)] = "DocumentTypeNode"),
				(e[(e.DocumentFragmentNode = 11)] = "DocumentFragmentNode"),
				(e[(e.EnvGlobalConstructor = 12)] = "EnvGlobalConstructor");
		})(v || (v = {})),
		((e) => {
			(e.document = "d"),
				(e.documentElement = "e"),
				(e.head = "h"),
				(e.body = "b");
		})(B || (B = {})),
		((e) => {
			(e[(e.SetValue = 0)] = "SetValue"),
				(e[(e.GlobalConstructor = 1)] = "GlobalConstructor");
		})(E || (E = {})),
		((e) => {
			(e[(e.Primitive = 0)] = "Primitive"),
				(e[(e.Array = 1)] = "Array"),
				(e[(e.Object = 2)] = "Object"),
				(e[(e.Instance = 3)] = "Instance"),
				(e[(e.Ref = 4)] = "Ref"),
				(e[(e.Event = 5)] = "Event"),
				(e[(e.Function = 6)] = "Function"),
				(e[(e.NodeList = 7)] = "NodeList"),
				(e[(e.ArrayBuffer = 8)] = "ArrayBuffer"),
				(e[(e.ArrayBufferView = 9)] = "ArrayBufferView"),
				(e[(e.Attr = 10)] = "Attr"),
				(e[(e.CSSRule = 11)] = "CSSRule"),
				(e[(e.CSSRuleList = 12)] = "CSSRuleList"),
				(e[(e.CSSStyleDeclaration = 13)] = "CSSStyleDeclaration"),
				(e[(e.Error = 14)] = "Error");
		})(N || (N = {})),
		((e) => {
			(e.Body = "BODY"),
				(e.Comment = "#comment"),
				(e.Document = "#document"),
				(e.DocumentElement = "HTML"),
				(e.DocumentTypeNode = "html"),
				(e.DocumentFragment = "#document-fragment"),
				(e.IFrame = "IFRAME"),
				(e.Head = "HEAD"),
				(e.Script = "SCRIPT"),
				(e.Text = "#text");
		})(T || (T = {})),
		((e) => {
			(e.errorHandlers = "error"),
				(e.loadHandlers = "load"),
				(e[(e.src = 0)] = "src"),
				(e[(e.loadErrorStatus = 1)] = "loadErrorStatus"),
				(e[(e.cssRules = 2)] = "cssRules"),
				(e[(e.innerHTML = 3)] = "innerHTML"),
				(e[(e.url = 4)] = "url"),
				(e[(e.type = 5)] = "type");
		})(L || (L = {})),
		((e) => {
			(e[(e.Blocking = 1)] = "Blocking"),
				(e[(e.NonBlocking = 2)] = "NonBlocking"),
				(e[(e.NonBlockingNoSideEffect = 3)] = "NonBlockingNoSideEffect");
		})(R || (R = {}));
	const C = (e, t) => {
		const o = {
			getContext: {
				value(e, t) {
					return (
						this[d] || (this[d] = (e.includes("webgl") ? g : h)(this, e, t)),
						this[d]
					);
				},
			},
		};
		const l = S(
			t,
			"CanvasGradient",
			class extends e {
				addColorStop(...e) {
					r(this, ["addColorStop"], e, R.NonBlocking);
				}
			},
		);
		const f = S(
			t,
			"CanvasPattern",
			class extends e {
				setTransform(...e) {
					r(this, ["setTransform"], e, R.NonBlocking);
				}
			},
		);
		const h = (e, t, o) => {
			const i = e[a];
			const d = s();
			const f = { [a]: i, [c]: d, [u]: [] };
			const h = r(e, ["getContext"], [t, o], R.Blocking, d);
			const g =
				"getContextAttributes,getImageData,getLineDash,getTransform,isPointInPath,isPointInStroke,measureText".split(
					",",
				);
			const m = {
				get: (e, t) =>
					"string" === typeof t && t in h
						? "function" === typeof h[t]
							? (...e) => {
									if (t.startsWith("create")) {
										const o = s();
										return (
											r(f, [t], e, R.NonBlocking, o),
											"createImageData" === t || "createPattern" === t
												? ((n = `${t}()`),
													console.warn(`${n} not implemented`),
													{ setTransform: () => {} })
												: new l(i, o)
										);
									}
									let n;
									const o = g.includes(t) ? R.Blocking : R.NonBlocking;
									return r(f, [t], e, o);
								}
							: h[t]
						: e[t],
				set: (e, t, r) => (
					"string" === typeof t && t in h
						? (h[t] !== r && "function" !== typeof r && n(f, [t], r),
							(h[t] = r))
						: (e[t] = r),
					!0
				),
			};
			return new Proxy(h, m);
		};
		const g = (e, t, o) => {
			const i = e[a];
			const d = s();
			const l = { [a]: i, [c]: d, [u]: [] };
			const f = r(e, ["getContext"], [t, o], R.Blocking, d);
			const h = {
				get: (e, t) =>
					"string" === typeof t
						? "function" !== typeof f[t]
							? f[t]
							: (...e) => r(l, [t], e, p(t))
						: e[t],
				set: (e, t, r) => (
					"string" === typeof t && t in f
						? (f[t] !== r && "function" !== typeof r && n(l, [t], r),
							(f[t] = r))
						: (e[t] = r),
					!0
				),
			};
			return new Proxy(f, h);
		};
		const m = "checkFramebufferStatus,makeXRCompatible".split(",");
		const p = (e) =>
			e.startsWith("create") ||
			e.startsWith("get") ||
			e.startsWith("is") ||
			m.includes(e)
				? R.Blocking
				: R.NonBlocking;
		S(t, "CanvasGradient", l),
			S(t, "CanvasPattern", f),
			i(t.HTMLCanvasElement, o);
	};
	const w = (e, u, d, b) => {
		let y;
		let v;
		b.Audio = k(
			"HTMLAudioElement",
			class {
				constructor(e) {
					const t = d.k("audio", s());
					return (t.src = e), t;
				}
			},
		);
		const B = class extends e {
			get enabled() {
				return t(this, ["enabled"]);
			}
			set enabled(e) {
				n(this, ["enabled"], e);
			}
			get id() {
				return t(this, ["id"]);
			}
			get kind() {
				return t(this, ["kind"]);
			}
			get label() {
				return t(this, ["label"]);
			}
			get language() {
				return t(this, ["language"]);
			}
			get sourceBuffer() {
				return new T(this);
			}
		};
		const E = class {
			constructor(e) {
				const n = "audioTracks";
				const o = e[a];
				const i = e[c];
				return new Proxy(
					{
						addEventListener(...t) {
							r(e, [n, "addEventListener"], t, R.NonBlockingNoSideEffect);
						},
						getTrackById: (...t) => r(e, [n, "getTrackById"], t),
						get length() {
							return t(e, [n, "length"]);
						},
						removeEventListener(...t) {
							r(e, [n, "removeEventListener"], t, R.NonBlockingNoSideEffect);
						},
					},
					{
						get: (e, t) => ("number" === typeof t ? new B(o, i, [n, t]) : e[t]),
					},
				);
			}
		};
		const N = S(
			b,
			"SourceBufferList",
			class extends Array {
				constructor(e) {
					super(), (this[l] = e);
				}
				addEventListener(...e) {
					r(
						this[l],
						["sourceBuffers", "addEventListener"],
						e,
						R.NonBlockingNoSideEffect,
					);
				}
				removeEventListener(...e) {
					r(
						this[l],
						["sourceBuffers", "removeEventListener"],
						e,
						R.NonBlockingNoSideEffect,
					);
				}
			},
		);
		const T = S(
			b,
			"SourceBuffer",
			((v = class extends u {
				constructor(e) {
					super(e[a], e[c], ["sourceBuffers"]), (this[y] = []), (this[l] = e);
				}
				abort() {
					const e = C(this);
					r(this, [e, "appendWindowStart"], p, R.Blocking);
				}
				addEventListener(...e) {
					const t = C(this);
					r(this, [t, "addEventListener"], e, R.NonBlockingNoSideEffect);
				}
				appendBuffer(e) {
					this[g].push(["appendBuffer", [e], e]), w(this);
				}
				get appendWindowStart() {
					const e = C(this);
					return t(this, [e, "appendWindowStart"]);
				}
				set appendWindowStart(e) {
					const t = C(this);
					n(this, [t, "appendWindowStart"], e);
				}
				get appendWindowEnd() {
					const e = C(this);
					return t(this, [e, "appendWindowEnd"]);
				}
				set appendWindowEnd(e) {
					const t = C(this);
					n(this, [t, "appendWindowEnd"], e);
				}
				get buffered() {
					const e = this[l];
					const t = C(this);
					return new L(e[a], e[c], ["sourceBuffers", t, "buffered"]);
				}
				changeType(e) {
					const t = C(this);
					r(this, [t, "changeType"], [e], R.NonBlocking);
				}
				get mode() {
					const e = C(this);
					return t(this, [e, "mode"]);
				}
				set mode(e) {
					const t = C(this);
					n(this, [t, "mode"], e);
				}
				remove(e, t) {
					this[g].push(["remove", [e, t]]), w(this);
				}
				removeEventListener(...e) {
					const t = C(this);
					r(this, [t, "removeEventListener"], e, R.NonBlockingNoSideEffect);
				}
				get timestampOffset() {
					const e = C(this);
					return t(this, [e, "timestampOffset"]);
				}
				set timestampOffset(e) {
					const t = C(this);
					n(this, [t, "timestampOffset"], e);
				}
				get updating() {
					const e = C(this);
					return t(this, [e, "updating"]);
				}
			}),
			(y = g),
			v),
		);
		const L = S(
			b,
			"TimeRanges",
			class extends e {
				start(...e) {
					return r(this, ["start"], e);
				}
				end(...e) {
					return r(this, ["end"], e);
				}
				get length() {
					return t(this, ["length"]);
				}
			},
		);
		const C = (e) => (e ? e[l][h].indexOf(e) : -1);
		const w = (e) => {
			if (e[g].length) {
				if (!e.updating) {
					const t = e[g].shift();
					if (t) {
						const n = C(e);
						r(e, [n, t[0]], t[1], R.NonBlockingNoSideEffect, void 0, t[2]);
					}
				}
				setTimeout(() => w(e), 50);
			}
		};
		const I = {
			buffered: {
				get() {
					return (
						this[m] ||
							((this[m] = new L(this[a], this[c], ["buffered"])),
							setTimeout(() => {
								this[m] = void 0;
							}, 5e3)),
						this[m]
					);
				},
			},
			readyState: {
				get() {
					return 4 === this[f]
						? 4
						: ("number" !== typeof this[f] &&
								((this[f] = t(this, ["readyState"])),
								setTimeout(() => {
									this[f] = void 0;
								}, 1e3)),
							this[f]);
				},
			},
		};
		S(
			b,
			"MediaSource",
			class extends u {
				constructor() {
					super(d.V), (this[h] = new N(this)), o(this, "MediaSource", p);
				}
				get activeSourceBuffers() {
					return [];
				}
				addSourceBuffer(e) {
					const t = new T(this);
					return this[h].push(t), r(this, ["addSourceBuffer"], [e]), t;
				}
				clearLiveSeekableRange() {
					r(this, ["clearLiveSeekableRange"], p, R.NonBlocking);
				}
				get duration() {
					return t(this, ["duration"]);
				}
				set duration(e) {
					n(this, ["duration"], e);
				}
				endOfStream(e) {
					r(this, ["endOfStream"], [e], R.NonBlockingNoSideEffect);
				}
				get readyState() {
					return t(this, ["readyState"]);
				}
				removeSourceBuffer(e) {
					const t = C(e);
					t > -1 &&
						(this[h].splice(t, 1),
						r(this, ["removeSourceBuffer"], [t], R.Blocking));
				}
				setLiveSeekableRange(e, t) {
					r(this, ["setLiveSeekableRange"], [e, t], R.NonBlocking);
				}
				get sourceBuffers() {
					return this[h];
				}
				static isTypeSupported(e) {
					if (!W.has(e)) {
						const t = r(b, ["MediaSource", "isTypeSupported"], [e]);
						W.set(e, t);
					}
					return W.get(e);
				}
			},
		);
		const M = (b.URL = k("URL", class extends URL {}));
		"audioTracks" in b.HTMLMediaElement.prototype &&
			(S(b, "AudioTrackList", E),
			S(b, "AudioTrack", B),
			(I.audioTracks = {
				get() {
					return new E(this);
				},
			})),
			i(b.HTMLMediaElement, I),
			(M.createObjectURL = (e) => r(b, ["URL", "createObjectURL"], [e])),
			(M.revokeObjectURL = (e) => r(b, ["URL", "revokeObjectURL"], [e]));
	};
	const W = new Map();
	e.f = (e, t, n, r, o) => {
		o.map((e) => {
			delete r[e];
		}),
			C(e, r),
			w(e, t, n, r);
	};
})(self);
