function initializeAppInsights() {
    var n, r;
    if (typeof window != "undefined" && typeof JSON != "undefined")
        if (n = "appInsights", window[n] === undefined) Microsoft.ApplicationInsights.AppInsights.defaultConfig = Microsoft.ApplicationInsights.Initialization.getDefaultConfig();
        else {
            var u = window[n] || {},
                t = new Microsoft.ApplicationInsights.Initialization(u),
                i = t.loadAppInsights();
            for (r in i) u[r] = i[r];
            t.emptyQueue();
            t.pollInteralLogs(i)
        }
}
var __extends, AI, Microsoft;
(function (n) {
    var t;
    (function (n) {
        (function (n) {
            n[n.CRITICAL = 0] = "CRITICAL";
            n[n.WARNING = 1] = "WARNING"
        })(n.LoggingSeverity || (n.LoggingSeverity = {}));
        var i = n.LoggingSeverity,
            t = function () {
                function n() {}
                return n.throwInternalNonUserActionable = function (n, t) {
                    if (this.enableDebugExceptions()) throw t;
                    else this.warnToConsole(t), this.logInternalMessage(n, this.AiNonUserActionablePrefix + t)
                }, n.throwInternalUserActionable = function (n, t) {
                    if (this.enableDebugExceptions()) throw t;
                    else this.warnToConsole(t), this.logInternalMessage(n, this.AiUserActionablePrefix + t)
                }, n.warnToConsole = function (n) {
                    typeof console == "undefined" || !console || (typeof console.warn == "function" ? console.warn(n) : typeof console.log == "function" && console.log(n))
                }, n.resetInternalMessageCount = function () {
                    this._messageCount = 0
                }, n.setMaxInternalMessageLimit = function (n) {
                    if (!n) throw new Error("limit cannot be undefined.");
                    this.MAX_INTERNAL_MESSAGE_LIMIT = n
                }, n.logInternalMessage = function (n, t) {
                    if (!this._areInternalMessagesThrottled() && ((this.verboseLogging() || n === 0) && (this.queue.push(t), this._messageCount++), this._messageCount == this.MAX_INTERNAL_MESSAGE_LIMIT)) {
                        var i = this.AiNonUserActionablePrefix + "Internal events throttle limit per PageView reached for this app.";
                        this.queue.push(i);
                        this.warnToConsole(i)
                    }
                }, n._areInternalMessagesThrottled = function () {
                    return this._messageCount >= this.MAX_INTERNAL_MESSAGE_LIMIT
                }, n.AiUserActionablePrefix = "AI: ", n.AiNonUserActionablePrefix = "AI (Internal): ", n.enableDebugExceptions = function () {
                    return !1
                }, n.verboseLogging = function () {
                    return !1
                }, n.queue = [], n.MAX_INTERNAL_MESSAGE_LIMIT = 25, n._messageCount = 0, n
            }();
        n._InternalLogging = t
    })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
})(Microsoft || (Microsoft = {})),
function (n) {
    var t;
    (function (n) {
        var t = function () {
            function n() {}
            return n.setCookie = function (t, i) {
                n.document.cookie = t + "=" + i + ";path=/"
            }, n.stringToBoolOrDefault = function (n) {
                return n ? n.toString().toLowerCase() === "true" : !1
            }, n.getCookie = function (t) {
                var e = "",
                    f, u, r, i;
                if (t && t.length)
                    for (f = t + "=", u = n.document.cookie.split(";"), r = 0; r < u.length; r++)
                        if (i = u[r], i = n.trim(i), i && i.indexOf(f) === 0) {
                            e = i.substring(f.length, u[r].length);
                            break
                        }
                return e
            }, n.trim = function (n) {
                return typeof n != "string" ? n : n.replace(/^\s+|\s+$/g, "")
            }, n.newGuid = function () {
                for (var u, n = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"], i = "", t, r = 0; r < 4; r++) t = 4294967296 * Math.random() | 0, i += n[t & 15] + n[t >> 4 & 15] + n[t >> 8 & 15] + n[t >> 12 & 15] + n[t >> 16 & 15] + n[t >> 20 & 15] + n[t >> 24 & 15] + n[t >> 28 & 15];
                return u = n[8 + Math.random() * 4 | 0], i.substr(0, 8) + "-" + i.substr(9, 4) + "-4" + i.substr(13, 3) + "-" + u + i.substr(16, 3) + "-" + i.substr(19, 12)
            }, n.isArray = function (n) {
                return Object.prototype.toString.call(n) === "[object Array]"
            }, n.isError = function (n) {
                return Object.prototype.toString.call(n) === "[object Error]"
            }, n.isDate = function (n) {
                return Object.prototype.toString.call(n) === "[object Date]"
            }, n.toISOStringForIE8 = function (t) {
                if (n.isDate(t)) {
                    function i(n) {
                        var t = String(n);
                        return t.length === 1 && (t = "0" + t), t
                    }
                    return Date.prototype.toISOString ? t.toISOString() : t.getUTCFullYear() + "-" + i(t.getUTCMonth() + 1) + "-" + i(t.getUTCDate()) + "T" + i(t.getUTCHours()) + ":" + i(t.getUTCMinutes()) + ":" + i(t.getUTCSeconds()) + "." + String((t.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z"
                }
            }, n.msToTimeSpan = function (n) {
                (isNaN(n) || n < 0) && (n = 0);
                var t = "" + n % 1e3,
                    i = "" + Math.floor(n / 1e3) % 60,
                    r = "" + Math.floor(n / 6e4) % 60,
                    u = "" + Math.floor(n / 36e5) % 24;
                return t = t.length === 1 ? "00" + t : t.length === 2 ? "0" + t : t, i = i.length < 2 ? "0" + i : i, r = r.length < 2 ? "0" + r : r, u = u.length < 2 ? "0" + u : u, u + ":" + r + ":" + i + "." + t
            }, n.isCrossOriginError = function (n, t, i, r, u) {
                return (n == "Script error." || n == "Script error") && t == "" && i == 0 && r == 0 && u == null
            }, n.dump = function (n) {
                var t = Object.prototype.toString.call(n),
                    i = JSON.stringify(n);
                return t + i
            }, n.document = typeof document != "undefined" ? document : {}, n.NotSpecified = "not_specified", n
        }();
        n.Util = t
    })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
}(Microsoft || (Microsoft = {})),
function (n) {
    var t;
    (function (n) {
        "use strict";
        var t = function () {
            function t() {}
            return t.serialize = function (n) {
                var i = t._serializeObject(n, "root");
                return JSON.stringify(i)
            }, t._serializeObject = function (i, r) {
                var e = "__aiCircularRefCheck",
                    f = {},
                    u, s;
                if (!i) return n._InternalLogging.throwInternalUserActionable(0, "cannot serialize " + r + " because it is null or undefined"), f;
                if (i[e]) return n._InternalLogging.throwInternalUserActionable(1, "Circular reference detected while serializing: '" + r), f;
                if (!i.aiDataContract) {
                    if (r === "measurements") f = t._serializeStringMap(i, "number", r);
                    else if (r === "properties") f = t._serializeStringMap(i, "string", r);
                    else if (r === "tags") f = t._serializeStringMap(i, "string", r);
                    else if (n.Util.isArray(i)) f = t._serializeArray(i, r);
                    else {
                        n._InternalLogging.throwInternalUserActionable(1, "Attempting to serialize an object which does not implement ISerializable: " + r);
                        try {
                            JSON.stringify(i);
                            f = i
                        } catch (o) {
                            n._InternalLogging.throwInternalUserActionable(0, o && typeof o.toString == "function" ? o.toString() : "Error serializing object")
                        }
                    }
                    return f
                }
                i[e] = !0;
                for (u in i.aiDataContract) {
                    var h = i.aiDataContract[u],
                        c = typeof h != "boolean",
                        l = i[u] !== undefined,
                        a = typeof i[u] == "object" && i[u] !== null;
                    if (h && !l && !c) {
                        n._InternalLogging.throwInternalNonUserActionable(0, "Missing required field specification: The field '" + u + "' on '" + r + "' is required but not present on source");
                        continue
                    }
                    s = a ? c ? t._serializeArray(i[u], u) : t._serializeObject(i[u], u) : i[u];
                    s !== undefined && (f[u] = s)
                }
                return delete i[e], f
            }, t._serializeArray = function (i, r) {
                var f = undefined,
                    u, e, o;
                if (!!i)
                    if (n.Util.isArray(i))
                        for (f = [], u = 0; u < i.length; u++) e = i[u], o = t._serializeObject(e, r + "[" + u + "]"), f.push(o);
                    else n._InternalLogging.throwInternalUserActionable(0, "This field was specified as an array in the contract but the item is not an array.\r\n" + r);
                return f
            }, t._serializeStringMap = function (t, i, r) {
                var u = undefined,
                    f, e, o;
                if (t) {
                    u = {};
                    for (f in t) e = t[f], i === "string" ? u[f] = e === undefined ? "undefined" : e === null ? "null" : e.toString ? e.toString() : "invalid field: toString() is not defined." : i === "number" ? e === undefined ? u[f] = "undefined" : e === null ? u[f] = "null" : (o = parseFloat(e), u[f] = isNaN(o) ? "NaN" : o) : (u[f] = "invalid field: " + r + " is of unknown type.", n._InternalLogging.throwInternalUserActionable(0, u[f]))
                }
                return u
            }, t
        }();
        n.Serializer = t
    })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
}(Microsoft || (Microsoft = {})),
function (n) {
    var t;
    (function (n) {
        "use strict";
        var t = function () {
            function n() {}
            return n
        }();
        n.Base = t
    })(t = n.Telemetry || (n.Telemetry = {}))
}(Microsoft || (Microsoft = {})),
function (n) {
    var t;
    (function (n) {
        "use strict";
        var t = function () {
            function n() {
                this.ver = 1;
                this.sampleRate = 100;
                this.tags = {}
            }
            return n
        }();
        n.Envelope = t
    })(t = n.Telemetry || (n.Telemetry = {}))
}(Microsoft || (Microsoft = {}));
__extends = this.__extends || function (n, t) {
        function r() {
            this.constructor = n
        }
        for (var i in t) t.hasOwnProperty(i) && (n[i] = t[i]);
        r.prototype = t.prototype;
        n.prototype = new r
    },
    function (n) {
        var t;
        (function (t) {
            var i;
            (function (i) {
                var r;
                (function (i) {
                    "use strict";
                    var r = function (n) {
                        function i(i, r) {
                            n.call(this);
                            this.name = r;
                            this.data = i;
                            this.time = t.Util.toISOStringForIE8(new Date);
                            this.aiDataContract = {
                                time: !0,
                                iKey: !0,
                                name: !0,
                                tags: !0,
                                data: !0
                            }
                        }
                        return __extends(i, n), i
                    }(n.Telemetry.Envelope);
                    i.Envelope = r
                })(r = i.Common || (i.Common = {}))
            })(i = t.Telemetry || (t.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (t) {
            var i;
            (function (t) {
                var i;
                (function (t) {
                    "use strict";
                    var i = function (n) {
                        function t() {
                            n.apply(this, arguments);
                            this.aiDataContract = {}
                        }
                        return __extends(t, n), t
                    }(n.Telemetry.Base);
                    t.Base = i
                })(i = t.Common || (t.Common = {}))
            })(i = t.Telemetry || (t.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function () {
            function n() {
                this.applicationVersion = "ai.application.ver";
                this.applicationBuild = "ai.application.build";
                this.deviceId = "ai.device.id";
                this.deviceIp = "ai.device.ip";
                this.deviceLanguage = "ai.device.language";
                this.deviceLocale = "ai.device.locale";
                this.deviceModel = "ai.device.model";
                this.deviceNetwork = "ai.device.network";
                this.deviceOEMName = "ai.device.oemName";
                this.deviceOS = "ai.device.os";
                this.deviceOSVersion = "ai.device.osVersion";
                this.deviceRoleInstance = "ai.device.roleInstance";
                this.deviceRoleName = "ai.device.roleName";
                this.deviceScreenResolution = "ai.device.screenResolution";
                this.deviceType = "ai.device.type";
                this.deviceMachineName = "ai.device.machineName";
                this.locationIp = "ai.location.ip";
                this.operationId = "ai.operation.id";
                this.operationName = "ai.operation.name";
                this.operationParentId = "ai.operation.parentId";
                this.operationRootId = "ai.operation.rootId";
                this.operationSyntheticSource = "ai.operation.syntheticSource";
                this.operationIsSynthetic = "ai.operation.isSynthetic";
                this.sessionId = "ai.session.id";
                this.sessionIsFirst = "ai.session.isFirst";
                this.sessionIsNew = "ai.session.isNew";
                this.userAccountAcquisitionDate = "ai.user.accountAcquisitionDate";
                this.userAccountId = "ai.user.accountId";
                this.userAgent = "ai.user.userAgent";
                this.userId = "ai.user.id";
                this.userStoreRegion = "ai.user.storeRegion";
                this.sampleRate = "ai.sample.sampleRate";
                this.internalSdkVersion = "ai.internal.sdkVersion";
                this.internalAgentVersion = "ai.internal.agentVersion"
            }
            return n
        }();
        n.ContextTagKeys = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (n) {
                "use strict";
                var t = function () {
                    function n() {}
                    return n
                }();
                n.Application = t
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (n) {
                "use strict";
                var t = function () {
                    function n() {
                        this.id = "browser";
                        typeof screen != "undefined" && screen.width && screen.height && (this.resolution = screen.width + "X" + screen.height);
                        this.locale = typeof screen != "undefined" && navigator.browserLanguage ? navigator.browserLanguage : "unknown"
                    }
                    return n
                }();
                n.Device = t
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function () {
                    function t() {
                        this.sdkVersion = "JavaScript:" + n.Version
                    }
                    return t
                }();
                t.Internal = i
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (n) {
                "use strict";
                var t = function () {
                    function n() {}
                    return n
                }();
                n.Location = t
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function () {
                    function t() {
                        this.id = n.Util.newGuid()
                    }
                    return t
                }();
                t.Operation = i
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (n) {
                "use strict";
                var t = function () {
                    function n() {}
                    return n
                }();
                n.Sample = t
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        (function (n) {
            n[n.Start = 0] = "Start";
            n[n.End = 1] = "End"
        })(n.SessionState || (n.SessionState = {}));
        var t = n.SessionState
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function () {
                        function n() {}
                        return n
                    }(),
                    r;
                t.Session = i;
                r = function () {
                    function t(n, r) {
                        n || (n = {});
                        typeof n.sessionExpirationMs == "function" || (n.sessionExpirationMs = function () {
                            return t.acquisitionSpan
                        });
                        typeof n.sessionRenewalMs == "function" || (n.sessionRenewalMs = function () {
                            return t.renewalSpan
                        });
                        this.config = n;
                        this._sessionHandler = r;
                        this.automaticSession = new i
                    }
                    return t.prototype.update = function () {
                        this.automaticSession.id || this.initializeAutomaticSession();
                        var n = +new Date,
                            t = n - this.automaticSession.acquisitionDate > this.config.sessionExpirationMs(),
                            i = n - this.automaticSession.renewalDate > this.config.sessionRenewalMs();
                        t || i ? (typeof this._sessionHandler == "function" && this._sessionHandler(1, this.automaticSession.renewalDate), this.automaticSession.isFirst = undefined, this.renew()) : (this.automaticSession.renewalDate = +new Date, this.setCookie(this.automaticSession.id, this.automaticSession.acquisitionDate, this.automaticSession.renewalDate))
                    }, t.prototype.initializeAutomaticSession = function () {
                        var i = n.Util.getCookie("ai_session"),
                            t, r, u;
                        if (i && typeof i.split == "function") {
                            t = i.split("|");
                            t.length > 0 && (this.automaticSession.id = t[0]);
                            try {
                                t.length > 1 && (r = +t[1], this.automaticSession.acquisitionDate = +new Date(r), this.automaticSession.acquisitionDate = this.automaticSession.acquisitionDate > 0 ? this.automaticSession.acquisitionDate : 0);
                                t.length > 2 && (u = +t[2], this.automaticSession.renewalDate = +new Date(u), this.automaticSession.renewalDate = this.automaticSession.renewalDate > 0 ? this.automaticSession.renewalDate : 0)
                            } catch (f) {
                                n._InternalLogging.throwInternalNonUserActionable(1, "Error parsing ai_session cookie, session will be reset: " + JSON.stringify(f))
                            }
                            this.automaticSession.renewalDate == 0 && n._InternalLogging.throwInternalNonUserActionable(1, "AI sessoin renewal date is 0, session will be reset.")
                        }
                        this.automaticSession.id || (this.automaticSession.isFirst = !0, this.renew())
                    }, t.prototype.renew = function () {
                        var t = +new Date;
                        this.automaticSession.id = n.Util.newGuid();
                        this.automaticSession.acquisitionDate = t;
                        this.automaticSession.renewalDate = t;
                        this.setCookie(this.automaticSession.id, this.automaticSession.acquisitionDate, this.automaticSession.renewalDate);
                        typeof this._sessionHandler == "function" && this._sessionHandler(0, t)
                    }, t.prototype.setCookie = function (t, i, r) {
                        var u = new Date(i),
                            f = [t, i, r];
                        u.setTime(u.getTime() + 31536e6);
                        n.Util.setCookie("ai_session", f.join("|") + ";expires=" + u.toUTCString())
                    }, t.acquisitionSpan = 864e5, t.renewalSpan = 18e5, t
                }();
                t._SessionManager = r
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function () {
                    function t(t) {
                        var f = n.Util.getCookie("ai_user"),
                            r, i, u, e;
                        f && (r = f.split("|"), r.length > 0 && (this.id = r[0]));
                        this.id || (this.id = n.Util.newGuid(), i = new Date, u = n.Util.toISOStringForIE8(i), this.accountAcquisitionDate = u, i.setTime(i.getTime() + 31536e6), e = [this.id, u], n.Util.setCookie("ai_user", e.join("|") + ";expires=" + i.toUTCString()));
                        this.accountId = t
                    }
                    return t
                }();
                t.User = i
            })(t = n.Context || (n.Context = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            "use strict";
            var t = function () {
                function t(n) {
                    if (this._buffer = [], this._lastSend = 0, this._config = n, this._sender = null, typeof XMLHttpRequest != "undefined") {
                        var t = new XMLHttpRequest;
                        "withCredentials" in t ? this._sender = this._xhrSender : typeof XDomainRequest != "undefined" && (this._sender = this._xdrSender)
                    }
                }
                return t.prototype.send = function (t) {
                    var r = this,
                        i;
                    try {
                        if (this._config.disableTelemetry()) return;
                        if (!t) {
                            n._InternalLogging.throwInternalNonUserActionable(0, "Cannot send empty telemetry");
                            return
                        }
                        if (!this._sender) {
                            n._InternalLogging.throwInternalNonUserActionable(0, "Sender was not initialized");
                            return
                        }
                        i = n.Serializer.serialize(t);
                        this._getSizeInBytes(this._buffer) + i.length > this._config.maxBatchSizeInBytes() && this.triggerSend();
                        this._buffer.push(i);
                        this._timeoutHandle || (this._timeoutHandle = setTimeout(function () {
                            r._timeoutHandle = null;
                            r.triggerSend()
                        }, this._config.maxBatchInterval()))
                    } catch (u) {
                        n._InternalLogging.throwInternalNonUserActionable(0, "trackPageView failed: " + JSON.stringify(u))
                    }
                }, t.prototype._getSizeInBytes = function (n) {
                    var r = 0,
                        t, i;
                    if (n && n.length)
                        for (t = 0; t < n.length; t++) i = n[t], i && i.length && (r += i.length);
                    return r
                }, t.prototype.triggerSend = function () {
                    try {
                        if (!this._config.disableTelemetry()) {
                            if (this._buffer.length) {
                                var t = this._config.emitLineDelimitedJson() ? this._buffer.join("\n") : "[" + this._buffer.join(",") + "]";
                                this._sender(t)
                            }
                            this._lastSend = +new Date
                        }
                        this._buffer.length = 0;
                        clearTimeout(this._timeoutHandle);
                        this._timeoutHandle = null
                    } catch (i) {
                        n._InternalLogging.throwInternalNonUserActionable(0, "trackPageView failed: " + JSON.stringify(i))
                    }
                }, t.prototype._xhrSender = function (n) {
                    var i = new XMLHttpRequest;
                    i.open("POST", this._config.endpointUrl(), !0);
                    i.setRequestHeader("Content-type", "application/json");
                    i.onreadystatechange = function () {
                        return t._xhrReadyStateChange(i, n)
                    };
                    i.onerror = function (r) {
                        return t._onError(n, i.responseText || i.response || "", r)
                    };
                    i.send(n)
                }, t.prototype._xdrSender = function (n) {
                    var i = new XDomainRequest;
                    i.onload = function () {
                        return t._xdrOnLoad(i, n)
                    };
                    i.onerror = function (r) {
                        return t._onError(n, i.responseText || "", r)
                    };
                    i.open("POST", this._config.endpointUrl());
                    i.send(n)
                }, t._xhrReadyStateChange = function (n, i) {
                    n.readyState === 4 && ((n.status < 200 || n.status >= 300) && n.status !== 0 ? t._onError(i, n.responseText || n.response || "") : t._onSuccess(i))
                }, t._xdrOnLoad = function (n, i) {
                    n && (n.responseText + "" == "200" || n.responseText === "") ? t._onSuccess(i) : t._onError(i, n && n.responseText || "")
                }, t._onError = function (t, i) {
                    n._InternalLogging.throwInternalNonUserActionable(1, "Failed to send telemetry:\n" + i)
                }, t._onSuccess = function () {}, t
            }();
            n.Sender = t
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            "use strict";
            var t = function () {
                function n() {}
                return n
            }();
            n.Domain = t
        })(t = n.Telemetry || (n.Telemetry = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        (function (n) {
            n[n.Verbose = 0] = "Verbose";
            n[n.Information = 1] = "Information";
            n[n.Warning = 2] = "Warning";
            n[n.Error = 3] = "Error";
            n[n.Critical = 4] = "Critical"
        })(n.SeverityLevel || (n.SeverityLevel = {}));
        var t = n.SeverityLevel
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.properties = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.MessageData = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                var i;
                (function (t) {
                    "use strict";
                    var i = function () {
                        function t() {}
                        return t.sanitizeKeyAndAddUniqueness = function (n, i) {
                            var e = n.length,
                                r = t.sanitizeKey(n),
                                f, u;
                            if (r.length !== e) {
                                for (f = 0, u = r; i[u] !== undefined;) f++, u = r.substring(0, t.MAX_NAME_LENGTH - 3) + t.padNumber(f);
                                r = u
                            }
                            return r
                        }, t.sanitizeKey = function (i) {
                            return i && (i = n.Util.trim(i.toString()), i.search(/[^0-9a-zA-Z-._()\/ ]/g) >= 0 && (i = i.replace(/[^0-9a-zA-Z-._()\/ ]/g, "_"), n._InternalLogging.throwInternalUserActionable(1, "name contains illegal characters. Illgeal character have been replaced with '_'. new name: " + i)), i.length > t.MAX_NAME_LENGTH && (i = i.substring(0, t.MAX_NAME_LENGTH), n._InternalLogging.throwInternalUserActionable(1, "name is too long.  It has been truncated to " + t.MAX_NAME_LENGTH + " characters.  name: " + i))), i
                        }, t.sanitizeString = function (i) {
                            return i && (i = n.Util.trim(i), i.toString().length > t.MAX_STRING_LENGTH && (i = i.substring(0, t.MAX_STRING_LENGTH), n._InternalLogging.throwInternalUserActionable(1, "string value is too long. It has been truncated to " + t.MAX_STRING_LENGTH + " characters. value: " + i))), i
                        }, t.sanitizeUrl = function (i) {
                            return i && i.length > t.MAX_URL_LENGTH && (i = i.substring(0, t.MAX_URL_LENGTH), n._InternalLogging.throwInternalUserActionable(1, "url is too long, it has been trucated to " + t.MAX_URL_LENGTH + " characters. url: " + i)), i
                        }, t.sanitizeMessage = function (i) {
                            return i && i.length > t.MAX_MESSAGE_LENGTH && (i = i.substring(0, t.MAX_MESSAGE_LENGTH), n._InternalLogging.throwInternalUserActionable(1, "message is too long, it has been trucated to " + t.MAX_MESSAGE_LENGTH + " characters.  message: " + i)), i
                        }, t.sanitizeException = function (i) {
                            return i && i.length > t.MAX_EXCEPTION_LENGTH && (i = i.substring(0, t.MAX_EXCEPTION_LENGTH), n._InternalLogging.throwInternalUserActionable(1, "exception is too long, iit has been trucated to " + t.MAX_EXCEPTION_LENGTH + " characters.  exception: " + i)), i
                        }, t.sanitizeProperties = function (n) {
                            var r, i, u;
                            if (n) {
                                r = {};
                                for (i in n) u = t.sanitizeString(n[i]), i = t.sanitizeKeyAndAddUniqueness(i, r), r[i] = u;
                                n = r
                            }
                            return n
                        }, t.sanitizeMeasurements = function (n) {
                            var r, i, u;
                            if (n) {
                                r = {};
                                for (i in n) u = n[i], i = t.sanitizeKeyAndAddUniqueness(i, r), r[i] = u;
                                n = r
                            }
                            return n
                        }, t.padNumber = function (n) {
                            var t = "00" + n;
                            return t.substr(t.length - 3)
                        }, t.MAX_NAME_LENGTH = 150, t.MAX_STRING_LENGTH = 1024, t.MAX_URL_LENGTH = 2048, t.MAX_MESSAGE_LENGTH = 32768, t.MAX_EXCEPTION_LENGTH = 32768, t
                    }();
                    t.DataSanitizer = i
                })(i = t.Common || (t.Common = {}))
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function (i) {
                    function r(r, u) {
                        i.call(this);
                        this.aiDataContract = {
                            ver: !0,
                            message: !0,
                            severityLevel: !1,
                            measurements: !1,
                            properties: !1
                        };
                        r = r || n.Util.NotSpecified;
                        this.message = t.Common.DataSanitizer.sanitizeMessage(r);
                        this.properties = t.Common.DataSanitizer.sanitizeProperties(u)
                    }
                    return __extends(r, i), r.envelopeType = "Microsoft.ApplicationInsights.Message", r.dataType = "MessageData", r
                }(AI.MessageData);
                t.Trace = i
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.properties = {};
                this.measurements = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.EventData = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function (t) {
                    function i(i, r, u) {
                        t.call(this);
                        this.aiDataContract = {
                            ver: !0,
                            name: !0,
                            properties: !1,
                            measurements: !1
                        };
                        this.name = n.Telemetry.Common.DataSanitizer.sanitizeString(i);
                        this.properties = n.Telemetry.Common.DataSanitizer.sanitizeProperties(r);
                        this.measurements = n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(u)
                    }
                    return __extends(i, t), i.envelopeType = "Microsoft.ApplicationInsights.Event", i.dataType = "EventData", i
                }(AI.EventData);
                t.Event = i
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function () {
            function n() {
                this.hasFullStack = !0;
                this.parsedStack = []
            }
            return n
        }();
        n.ExceptionDetails = t
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.exceptions = [];
                this.properties = {};
                this.measurements = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.ExceptionData = t
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        var t = function () {
            function n() {}
            return n
        }();
        n.StackFrame = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var u = function (i) {
                        function u(t, u, f, e) {
                            i.call(this);
                            this.aiDataContract = {
                                ver: !0,
                                handledAt: !0,
                                exceptions: !0,
                                severityLevel: !1,
                                properties: !1,
                                measurements: !1
                            };
                            this.properties = n.Telemetry.Common.DataSanitizer.sanitizeProperties(f);
                            this.measurements = n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(e);
                            this.handledAt = u || "unhandled";
                            this.exceptions = [new r(t)]
                        }
                        return __extends(u, i), u.CreateSimpleException = function (n, i, r, u, f, e, o) {
                            var c, s, h;
                            try {
                                throw new Error;
                            } catch (l) {
                                c = new t.Exception(l)
                            }
                            return s = c.exceptions[0].parsedStack[0], s.assembly = r, s.fileName = u, s.level = 0, s.line = e, s.method = "unknown", h = c.exceptions[0], h.hasFullStack = !0, h.message = n, h.parsedStack = null, h.stack = f, h.typeName = i, c.handledAt = o || "unhandled", c
                        }, u.envelopeType = "Microsoft.ApplicationInsights.Exception", u.dataType = "ExceptionData", u
                    }(AI.ExceptionData),
                    r, i;
                t.Exception = u;
                r = function (r) {
                    function u(i) {
                        r.call(this);
                        this.aiDataContract = {
                            id: !1,
                            outerId: !1,
                            typeName: !0,
                            message: !0,
                            hasFullStack: !1,
                            stack: !1,
                            parsedStack: []
                        };
                        this.typeName = t.Common.DataSanitizer.sanitizeString(i.name || n.Util.NotSpecified);
                        this.message = t.Common.DataSanitizer.sanitizeMessage(i.message || n.Util.NotSpecified);
                        var u = i.stack;
                        this.parsedStack = this.parseStack(u);
                        this.stack = t.Common.DataSanitizer.sanitizeException(u);
                        this.hasFullStack = n.Util.isArray(this.parsedStack) && this.parsedStack.length > 0
                    }
                    return __extends(u, r), u.prototype.parseStack = function (n) {
                        var t = undefined,
                            e, l, o, r, a, s, h, p, w, b;
                        if (typeof n == "string") {
                            for (e = n.split("\n"), t = [], l = 0, o = 0, r = 0; r <= e.length; r++) a = e[r], i.regex.test(a) && (s = new i(e[r], l++), o += s.sizeInBytes, t.push(s));
                            if (h = 32768, o > h)
                                for (var u = 0, f = t.length - 1, v = 0, c = u, y = f; u < f;) {
                                    if (p = t[u].sizeInBytes, w = t[f].sizeInBytes, v += p + w, v > h) {
                                        b = y - c + 1;
                                        t.splice(c, b);
                                        break
                                    }
                                    c = u;
                                    y = f;
                                    u++;
                                    f--
                                }
                        }
                        return t
                    }, u
                }(AI.ExceptionDetails);
                i = function (t) {
                    function i(r, u) {
                        t.call(this);
                        this.sizeInBytes = 0;
                        this.aiDataContract = {
                            level: !0,
                            method: !0,
                            assembly: !1,
                            fileName: !1,
                            line: !1
                        };
                        this.level = u;
                        this.method = "unavailable";
                        this.assembly = n.Util.trim(r);
                        var f = r.match(i.regex);
                        f && f.length >= 5 && (this.method = n.Util.trim(f[2]), this.fileName = n.Util.trim(f[4]), this.line = parseInt(f[5]) || 0);
                        this.sizeInBytes += this.method.length;
                        this.sizeInBytes += this.fileName.length;
                        this.sizeInBytes += this.assembly.length;
                        this.sizeInBytes += i.baseSize;
                        this.sizeInBytes += this.level.toString().length;
                        this.sizeInBytes += this.line.toString().length
                    }
                    return __extends(i, t), i.regex = /^([\s]+at)?(.*?)(\@|\s\(|\s)([^\(\@\n]+):([0-9]+):([0-9]+)(\)?)$/, i.baseSize = 58, i
                }(AI.StackFrame)
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.metrics = [];
                this.properties = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.MetricData = t
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        (function (n) {
            n[n.Measurement = 0] = "Measurement";
            n[n.Aggregation = 1] = "Aggregation"
        })(n.DataPointType || (n.DataPointType = {}));
        var t = n.DataPointType
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        var t = function () {
            function n() {
                this.kind = 0
            }
            return n
        }();
        n.DataPoint = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (n) {
                var t;
                (function (n) {
                    "use strict";
                    var t = function (n) {
                        function t() {
                            n.apply(this, arguments);
                            this.aiDataContract = {
                                name: !0,
                                kind: !1,
                                value: !0,
                                count: !1,
                                min: !1,
                                max: !1,
                                stdDev: !1
                            }
                        }
                        return __extends(t, n), t
                    }(AI.DataPoint);
                    n.DataPoint = t
                })(t = n.Common || (n.Common = {}))
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (t) {
            var i;
            (function (t) {
                "use strict";
                var i = function (i) {
                    function r(r, u, f, e, o) {
                        i.call(this);
                        this.aiDataContract = {
                            ver: !0,
                            metrics: !0,
                            properties: !1
                        };
                        var s = new n.ApplicationInsights.Telemetry.Common.DataPoint;
                        s.count = f > 0 ? f : undefined;
                        s.max = isNaN(o) || o === null ? undefined : o;
                        s.min = isNaN(e) || e === null ? undefined : e;
                        s.name = t.Common.DataSanitizer.sanitizeString(r);
                        s.value = u;
                        this.metrics = [s]
                    }
                    return __extends(r, i), r.envelopeType = "Microsoft.ApplicationInsights.Metric", r.dataType = "MetricData", r
                }(AI.MetricData);
                t.Metric = i
            })(i = t.Telemetry || (t.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.properties = {};
                this.measurements = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(n.EventData);
        n.PageViewData = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function (i) {
                    function r(r, u, f, e, o) {
                        i.call(this);
                        this.aiDataContract = {
                            ver: !0,
                            name: !1,
                            url: !1,
                            duration: !1,
                            properties: !1,
                            measurement: !1
                        };
                        this.url = t.Common.DataSanitizer.sanitizeUrl(u);
                        this.name = t.Common.DataSanitizer.sanitizeString(r || n.Util.NotSpecified);
                        isNaN(f) || (this.duration = n.Util.msToTimeSpan(f));
                        this.properties = n.Telemetry.Common.DataSanitizer.sanitizeProperties(e);
                        this.measurements = n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(o)
                    }
                    return __extends(r, i), r.envelopeType = "Microsoft.ApplicationInsights.Pageview", r.dataType = "PageviewData", r
                }(AI.PageViewData);
                t.PageView = i
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.properties = {};
                this.measurements = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(n.PageViewData);
        n.PageViewPerfData = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (t) {
                "use strict";
                var i = function (i) {
                    function r(u, f, e, o, s) {
                        var h;
                        if (i.call(this), this.aiDataContract = {
                                ver: !0,
                                name: !1,
                                url: !1,
                                duration: !1,
                                perfTotal: !1,
                                networkConnect: !1,
                                sentRequest: !1,
                                receivedResponse: !1,
                                domProcessing: !1,
                                properties: !1,
                                measurement: !1
                            }, this.isValid = !1, h = r.getPerformanceTiming(), h) {
                            var c = r.getDuration(h.navigationStart, h.loadEventEnd),
                                l = r.getDuration(h.navigationStart, h.connectEnd),
                                a = r.getDuration(h.requestStart, h.responseStart),
                                v = r.getDuration(h.responseStart, h.responseEnd),
                                y = r.getDuration(h.domLoading, h.loadEventEnd);
                            c == 0 ? n._InternalLogging.throwInternalNonUserActionable(1, "error calculating page view performance: total='" + c + "', network='" + l + "', request='" + a + "', response='" + v + "', dom='" + y + "'") : c < Math.floor(l) + Math.floor(a) + Math.floor(v) + Math.floor(y) ? n._InternalLogging.throwInternalNonUserActionable(1, "client performance math error:" + c + " < " + l + " + " + a + " + " + v + " + " + y) : (e = c, this.perfTotal = n.Util.msToTimeSpan(c), this.networkConnect = n.Util.msToTimeSpan(l), this.sentRequest = n.Util.msToTimeSpan(a), this.receivedResponse = n.Util.msToTimeSpan(v), this.domProcessing = n.Util.msToTimeSpan(y), this.isValid = !0)
                        }
                        this.url = t.Common.DataSanitizer.sanitizeUrl(f);
                        this.name = t.Common.DataSanitizer.sanitizeString(u || n.Util.NotSpecified);
                        isNaN(e) || (this.duration = n.Util.msToTimeSpan(e));
                        this.properties = n.Telemetry.Common.DataSanitizer.sanitizeProperties(o);
                        this.measurements = n.Telemetry.Common.DataSanitizer.sanitizeMeasurements(s)
                    }
                    return __extends(r, i), r.getPerformanceTiming = function () {
                        return typeof window != "undefined" && window.performance && window.performance.timing ? window.performance.timing : null
                    }, r.checkPageLoad = function () {
                        var t = undefined,
                            n;
                        return typeof window != "undefined" && window.performance && window.performance.timing && (n = window.performance.timing, t = n.domainLookupStart > 0 && n.navigationStart > 0 && n.responseStart > 0 && n.requestStart > 0 && n.loadEventEnd > 0 && n.responseEnd > 0 && n.connectEnd > 0 && n.domLoading > 0), t
                    }, r.getDuration = function (n, t) {
                        var i = 0;
                        return isNaN(n) || isNaN(t) || n === 0 || t === 0 || (i = Math.max(t - n, 0)), i
                    }, r.envelopeType = "Microsoft.ApplicationInsights.PageviewPerformance", r.dataType = "PageviewPerformanceData", r
                }(AI.PageViewPerfData);
                t.PageViewPerformance = i
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.state = 0;
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.SessionStateData = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (n) {
            var t;
            (function (n) {
                "use strict";
                var t = function (n) {
                    function t(t) {
                        n.call(this);
                        this.aiDataContract = {
                            ver: !0,
                            state: !0
                        };
                        this.state = t
                    }
                    return __extends(t, n), t.envelopeType = "Microsoft.ApplicationInsights.SessionState", t.dataType = "SessionStateData", t
                }(AI.SessionStateData);
                n.SessionTelemetry = t
            })(t = n.Telemetry || (n.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (n) {
            "use strict";
            var t = function () {
                function t(i) {
                    var r = this;
                    this._config = i;
                    this._sender = new n.Sender(i);
                    typeof window != "undefined" && (this._sessionManager = new n.Context._SessionManager(i, function (n, i) {
                        return t._sessionHandler(r, n, i)
                    }), this.application = new n.Context.Application, this.device = new n.Context.Device, this.internal = new n.Context.Internal, this.location = new n.Context.Location, this.user = new n.Context.User(i.accountId()), this.operation = new n.Context.Operation, this.session = new n.Context.Session, this.sample = new n.Context.Sample)
                }
                return t.prototype.track = function (t) {
                    return t ? (t.name === n.Telemetry.PageView.envelopeType && n._InternalLogging.resetInternalMessageCount(), this.session && typeof this.session.id != "string" && this._sessionManager.update(), this._track(t)) : n._InternalLogging.throwInternalUserActionable(0, "cannot call .track() with a null or undefined argument"), t
                }, t.prototype._track = function (n) {
                    this.session && (typeof this.session.id == "string" ? this._applySessionContext(n, this.session) : this._applySessionContext(n, this._sessionManager.automaticSession));
                    this._applyApplicationContext(n, this.application);
                    this._applyDeviceContext(n, this.device);
                    this._applyInternalContext(n, this.internal);
                    this._applyLocationContext(n, this.location);
                    this._applyOperationContext(n, this.operation);
                    this._applySampleContext(n, this.sample);
                    this._applyUserContext(n, this.user);
                    n.iKey = this._config.instrumentationKey();
                    this._sender.send(n)
                }, t._sessionHandler = function (t, i, r) {
                    var f = new n.Telemetry.SessionTelemetry(i),
                        e = new n.Telemetry.Common.Data(n.Telemetry.SessionTelemetry.dataType, f),
                        u = new n.Telemetry.Common.Envelope(e, n.Telemetry.SessionTelemetry.envelopeType);
                    u.time = n.Util.toISOStringForIE8(new Date(r));
                    t._track(u)
                }, t.prototype._applyApplicationContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.ver == "string" && (n.tags[i.applicationVersion] = t.ver);
                        typeof t.build == "string" && (n.tags[i.applicationBuild] = t.build)
                    }
                }, t.prototype._applyDeviceContext = function (n, t) {
                    var i = new AI.ContextTagKeys;
                    t && (typeof t.id == "string" && (n.tags[i.deviceId] = t.id), typeof t.ip == "string" && (n.tags[i.deviceIp] = t.ip), typeof t.language == "string" && (n.tags[i.deviceLanguage] = t.language), typeof t.locale == "string" && (n.tags[i.deviceLocale] = t.locale), typeof t.model == "string" && (n.tags[i.deviceModel] = t.model), typeof t.network != "undefined" && (n.tags[i.deviceNetwork] = t.network), typeof t.oemName == "string" && (n.tags[i.deviceOEMName] = t.oemName), typeof t.os == "string" && (n.tags[i.deviceOS] = t.os), typeof t.osversion == "string" && (n.tags[i.deviceOSVersion] = t.osversion), typeof t.resolution == "string" && (n.tags[i.deviceScreenResolution] = t.resolution), typeof t.type == "string" && (n.tags[i.deviceType] = t.type))
                }, t.prototype._applyInternalContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.agentVersion == "string" && (n.tags[i.internalAgentVersion] = t.agentVersion);
                        typeof t.sdkVersion == "string" && (n.tags[i.internalSdkVersion] = t.sdkVersion)
                    }
                }, t.prototype._applyLocationContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.ip == "string" && (n.tags[i.locationIp] = t.ip)
                    }
                }, t.prototype._applyOperationContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.id == "string" && (n.tags[i.operationId] = t.id);
                        typeof t.name == "string" && (n.tags[i.operationName] = t.name);
                        typeof t.parentId == "string" && (n.tags[i.operationParentId] = t.parentId);
                        typeof t.rootId == "string" && (n.tags[i.operationRootId] = t.rootId);
                        typeof t.syntheticSource == "string" && (n.tags[i.operationSyntheticSource] = t.syntheticSource)
                    }
                }, t.prototype._applySampleContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.sampleRate == "string" && (n.tags[i.sampleRate] = t.sampleRate)
                    }
                }, t.prototype._applySessionContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.id == "string" && (n.tags[i.sessionId] = t.id);
                        typeof t.isFirst != "undefined" && (n.tags[i.sessionIsFirst] = t.isFirst)
                    }
                }, t.prototype._applyUserContext = function (n, t) {
                    if (t) {
                        var i = new AI.ContextTagKeys;
                        typeof t.accountAcquisitionDate == "string" && (n.tags[i.userAccountAcquisitionDate] = t.accountAcquisitionDate);
                        typeof t.accountId == "string" && (n.tags[i.userAccountId] = t.accountId);
                        typeof t.agent == "string" && (n.tags[i.userAgent] = t.agent);
                        typeof t.id == "string" && (n.tags[i.userId] = t.id);
                        typeof t.storeRegion == "string" && (n.tags[i.userStoreRegion] = t.storeRegion)
                    }
                }, t
            }();
            n.TelemetryContext = t
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (t) {
            "use strict";
            var i = function (n) {
                function t() {
                    n.call(this)
                }
                return __extends(t, n), t
            }(n.Telemetry.Base);
            t.Data = i
        })(t = n.Telemetry || (n.Telemetry = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (t) {
            var i;
            (function (t) {
                var i;
                (function (t) {
                    "use strict";
                    var i = function (n) {
                        function t(t, i) {
                            n.call(this);
                            this.aiDataContract = {
                                baseType: !0,
                                baseData: !0
                            };
                            this.baseType = t;
                            this.baseData = i
                        }
                        return __extends(t, n), t
                    }(n.Telemetry.Data);
                    t.Data = i
                })(i = t.Common || (t.Common = {}))
            })(i = t.Telemetry || (t.Telemetry = {}))
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        var t;
        (function (t) {
            "use strict";
            var r, i;
            t.Version = "0.15.20150630.5";
            r = function () {
                function r(n) {
                    var u = this,
                        f, e, o;
                    if (this.config = n || {}, f = r.defaultConfig, f !== undefined)
                        for (e in f) this.config[e] === undefined && (this.config[e] = f[e]);
                    t._InternalLogging.verboseLogging = function () {
                        return u.config.verboseLogging
                    };
                    t._InternalLogging.enableDebugExceptions = function () {
                        return u.config.enableDebug
                    };
                    o = {
                        instrumentationKey: function () {
                            return u.config.instrumentationKey
                        },
                        accountId: function () {
                            return u.config.accountId
                        },
                        appUserId: function () {
                            return u.config.appUserId
                        },
                        sessionRenewalMs: function () {
                            return u.config.sessionRenewalMs
                        },
                        sessionExpirationMs: function () {
                            return u.config.sessionExpirationMs
                        },
                        endpointUrl: function () {
                            return u.config.endpointUrl
                        },
                        emitLineDelimitedJson: function () {
                            return u.config.emitLineDelimitedJson
                        },
                        maxBatchSizeInBytes: function () {
                            return u.config.maxBatchSizeInBytes
                        },
                        maxBatchInterval: function () {
                            return u.config.maxBatchInterval
                        },
                        disableTelemetry: function () {
                            return u.config.disableTelemetry
                        }
                    };
                    this.context = new t.TelemetryContext(o);
                    this._eventTracking = new i("trackEvent");
                    this._eventTracking.action = function (n, i, r, f, e) {
                        var o = new t.Telemetry.Event(n, f, e),
                            s = new t.Telemetry.Common.Data(t.Telemetry.Event.dataType, o),
                            h = new t.Telemetry.Common.Envelope(s, t.Telemetry.Event.envelopeType);
                        u.context.track(h)
                    };
                    this._pageTracking = new i("trackPageView");
                    this._pageTracking.action = function (n, i, r, f, e) {
                        var o = new t.Telemetry.PageView(n, i, r, f, e),
                            s = new t.Telemetry.Common.Data(t.Telemetry.PageView.dataType, o),
                            h = new t.Telemetry.Common.Envelope(s, t.Telemetry.PageView.envelopeType);
                        u.context.track(h)
                    }
                }
                return r.prototype.startTrackPage = function (n) {
                    try {
                        typeof n != "string" && (n = window.document && window.document.title || "");
                        this._pageTracking.start(n)
                    } catch (i) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "startTrackPage failed: " + JSON.stringify(i))
                    }
                }, r.prototype.stopTrackPage = function (n, i, r, u) {
                    try {
                        typeof n != "string" && (n = window.document && window.document.title || "");
                        typeof i != "string" && (i = window.location && window.location.href || "");
                        this._pageTracking.stop(n, i, r, u)
                    } catch (f) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "stopTrackPage failed, page view will not be collected: " + JSON.stringify(f))
                    }
                }, r.prototype.trackPageView = function (n, i, r, u) {
                    var o = this,
                        f, e, s;
                    try {
                        typeof n != "string" && (n = window.document && window.document.title || "");
                        typeof i != "string" && (i = window.location && window.location.href || "");
                        f = 0;
                        t.Telemetry.PageViewPerformance.checkPageLoad() !== undefined && (e = window.performance.timing.navigationStart, f = t.Telemetry.PageViewPerformance.getDuration(e, +new Date), s = setInterval(function () {
                            var c, l, h, a, v;
                            try {
                                f = t.Telemetry.PageViewPerformance.getDuration(e, +new Date);
                                c = t.Telemetry.PageViewPerformance.checkPageLoad();
                                l = f > 6e4;
                                (l || c) && (clearInterval(s), f = t.Telemetry.PageViewPerformance.getDuration(e, +new Date), h = new t.Telemetry.PageViewPerformance(n, i, f, r, u), h.isValid && (a = new t.Telemetry.Common.Data(t.Telemetry.PageViewPerformance.dataType, h), v = new t.Telemetry.Common.Envelope(a, t.Telemetry.PageViewPerformance.envelopeType), o.context.track(v), o.context._sender.triggerSend()))
                            } catch (y) {
                                t._InternalLogging.throwInternalNonUserActionable(0, "trackPageView failed on page load calculation: " + JSON.stringify(y))
                            }
                        }, 100));
                        var h = new t.Telemetry.PageView(n, i, f, r, u),
                            c = new t.Telemetry.Common.Data(t.Telemetry.PageView.dataType, h),
                            l = new t.Telemetry.Common.Envelope(c, t.Telemetry.PageView.envelopeType);
                        this.context.track(l);
                        setTimeout(function () {
                            o.context._sender.triggerSend()
                        }, 100)
                    } catch (a) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "trackPageView failed, page view will not be collected: " + JSON.stringify(a))
                    }
                }, r.prototype.startTrackEvent = function (n) {
                    try {
                        this._eventTracking.start(n)
                    } catch (i) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "startTrackEvent failed, event will not be collected: " + JSON.stringify(i))
                    }
                }, r.prototype.stopTrackEvent = function (n, i, r) {
                    try {
                        this._eventTracking.stop(n, undefined, i, r)
                    } catch (u) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "stopTrackEvent failed, event will not be collected: " + JSON.stringify(u))
                    }
                }, r.prototype.trackEvent = function (n, i, r) {
                    try {
                        var u = new t.Telemetry.Event(n, i, r),
                            f = new t.Telemetry.Common.Data(t.Telemetry.Event.dataType, u),
                            e = new t.Telemetry.Common.Envelope(f, t.Telemetry.Event.envelopeType);
                        this.context.track(e)
                    } catch (o) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "trackEvent failed, event will not be collected: " + JSON.stringify(o))
                    }
                }, r.prototype.trackException = function (n, i, r, u) {
                    try {
                        if (!t.Util.isError(n)) try {
                            throw new Error(n);
                        } catch (f) {
                            n = f
                        }
                        var e = new t.Telemetry.Exception(n, i, r, u),
                            o = new t.Telemetry.Common.Data(t.Telemetry.Exception.dataType, e),
                            s = new t.Telemetry.Common.Envelope(o, t.Telemetry.Exception.envelopeType);
                        this.context.track(s)
                    } catch (h) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "trackException failed, exception will not be collected: " + JSON.stringify(h))
                    }
                }, r.prototype.trackMetric = function (n, i, r, u, f) {
                    try {
                        var e = new t.Telemetry.Metric(n, i, r, u, f),
                            o = new t.Telemetry.Common.Data(t.Telemetry.Metric.dataType, e),
                            s = new t.Telemetry.Common.Envelope(o, t.Telemetry.Metric.envelopeType);
                        this.context.track(s)
                    } catch (h) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "trackMetric failed, metric will not be collected: " + JSON.stringify(h))
                    }
                }, r.prototype.trackTrace = function (n, i) {
                    try {
                        var r = new t.Telemetry.Trace(n, i),
                            u = new t.Telemetry.Common.Data(t.Telemetry.Trace.dataType, r),
                            f = new t.Telemetry.Common.Envelope(u, t.Telemetry.Trace.envelopeType);
                        this.context.track(f)
                    } catch (e) {
                        t._InternalLogging.warnToConsole("trackTrace failed, trace will not be collected: " + JSON.stringify(e))
                    }
                }, r.prototype.flush = function () {
                    try {
                        this.context._sender.triggerSend()
                    } catch (n) {
                        t._InternalLogging.throwInternalNonUserActionable(0, "flush failed, telemetry will not be collected: " + JSON.stringify(n))
                    }
                }, r.prototype.SendCORSException = function () {
                    var i = n.ApplicationInsights.Telemetry.Exception.CreateSimpleException("Script error.", "Error", "unknown", "unknown", "The browsers same-origin policy prevents us from getting the details of this exception. The exception occurred in a script loaded from an origin different than the web page. For cross-domain error reporting you can use crossorigin attribute together with appropriate CORS HTTP headers. For more information please see http://www.w3.org/TR/cors/.", 0, null),
                        r = new t.Telemetry.Common.Data(t.Telemetry.Exception.dataType, i),
                        u = new t.Telemetry.Common.Envelope(r, t.Telemetry.Exception.envelopeType);
                    this.context.track(u)
                }, r.prototype._onerror = function (n, i, r, u, f) {
                    try {
                        if (t.Util.isCrossOriginError(n, i, r, u, f)) this.SendCORSException();
                        else {
                            if (!t.Util.isError(f)) try {
                                throw new Error(n);
                            } catch (e) {
                                f = e;
                                f.stack || (f.stack = "@" + i + ":" + r + ":" + (u || 0))
                            }
                            this.trackException(f)
                        }
                    } catch (e) {
                        var o = f ? f.name + ", " + f.message : "null",
                            s = t.Util.dump(e);
                        t._InternalLogging.throwInternalNonUserActionable(0, "_onerror threw " + s + " while logging error, error will not be collected: " + o)
                    }
                }, r
            }();
            t.AppInsights = r;
            i = function () {
                function n(n) {
                    this._name = n;
                    this._events = {}
                }
                return n.prototype.start = function (n) {
                    typeof this._events[n] != "undefined" && t._InternalLogging.throwInternalUserActionable(1, "start" + this._name + " was called more than once for this event without calling stop" + this._name + ". key is '" + n + "'");
                    this._events[n] = +new Date
                }, n.prototype.stop = function (n, i, r, u) {
                    var f = this._events[n],
                        e, o;
                    f ? (e = +new Date, o = t.Telemetry.PageViewPerformance.getDuration(f, e), this.action(n, i, o, r, u)) : t._InternalLogging.throwInternalUserActionable(1, "stop" + this._name + " was called without a corresponding start" + this._name + " . Event name is '" + n + "'");
                    delete this._events[n];
                    this._events[n] = undefined
                }, n
            }()
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.properties = {};
                this.measurements = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(n.PageViewData);
        n.AjaxCallData = t
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        (function (n) {
            n[n.SQL = 0] = "SQL";
            n[n.Http = 1] = "Http";
            n[n.Other = 2] = "Other"
        })(n.DependencyKind || (n.DependencyKind = {}));
        var t = n.DependencyKind
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        (function (n) {
            n[n.Undefined = 0] = "Undefined";
            n[n.Aic = 1] = "Aic";
            n[n.Apmc = 2] = "Apmc"
        })(n.DependencySourceType || (n.DependencySourceType = {}));
        var t = n.DependencySourceType
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.kind = 0;
                this.dependencyKind = 2;
                this.success = !0;
                this.dependencySource = 0;
                this.properties = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.RemoteDependencyData = t
    }(AI || (AI = {})),
    function (n) {
        "use strict";
        var t = function (n) {
            function t() {
                this.ver = 2;
                this.properties = {};
                this.measurements = {};
                n.call(this)
            }
            return __extends(t, n), t
        }(Microsoft.Telemetry.Domain);
        n.RequestData = t
    }(AI || (AI = {})),
    function (n) {
        var t;
        (function (t) {
            "use strict";
            var i = function () {
                function i(t) {
                    t.queue = t.queue || [];
                    var r = t.config || {};
                    if (r && !r.instrumentationKey)
                        if (r = t, r.iKey) n.ApplicationInsights.Version = "0.10.0.0", r.instrumentationKey = r.iKey;
                        else if (r.applicationInsightsId) n.ApplicationInsights.Version = "0.7.2.0", r.instrumentationKey = r.applicationInsightsId;
                    else throw new Error("Cannot load Application Insights SDK, no instrumentationKey was provided.");
                    r = i.getDefaultConfig(r);
                    this.snippet = t;
                    this.config = r
                }
                return i.prototype.loadAppInsights = function () {
                    var t = new n.ApplicationInsights.AppInsights(this.config),
                        u, i, r;
                    return this.config.iKey && (u = t.trackPageView, t.trackPageView = function (n, i, r) {
                        u.apply(t, [null, n, i, r])
                    }), i = "logPageView", typeof this.snippet[i] == "function" && (t[i] = function (n, i, r) {
                        t.trackPageView(null, n, i, r)
                    }), r = "logEvent", typeof this.snippet[r] == "function" && (t[r] = function (n, i, r) {
                        t.trackEvent(n, i, r)
                    }), t
                }, i.prototype.emptyQueue = function () {
                    var u, t, f, r;
                    try {
                        if (n.ApplicationInsights.Util.isArray(this.snippet.queue)) {
                            for (u = this.snippet.queue.length, t = 0; t < u; t++) f = this.snippet.queue[t], f();
                            this.snippet.queue = undefined;
                            delete this.snippet.queue
                        }
                    } catch (i) {
                        r = "Failed to send queued telemetry";
                        i && typeof i.toString == "function" && (r += ": " + i.toString());
                        n.ApplicationInsights._InternalLogging.throwInternalNonUserActionable(1, r)
                    }
                }, i.prototype.pollInteralLogs = function (t) {
                    return setInterval(function () {
                        for (var i = n.ApplicationInsights._InternalLogging.queue, u = i.length, r = 0; r < u; r++) t.trackTrace(i[r]);
                        i.length = 0
                    }, this.config.diagnosticLogInterval)
                }, i.getDefaultConfig = function (n) {
                    return n || (n = {}), n.endpointUrl = n.endpointUrl || "http://dc.services.visualstudio.com/v2/track", n.accountId = n.accountId, n.appUserId = n.appUserId, n.sessionRenewalMs = 18e5, n.sessionExpirationMs = 864e5, n.maxBatchSizeInBytes = n.maxBatchSizeInBytes > 0 ? n.maxBatchSizeInBytes : 1e6, n.maxBatchInterval = isNaN(n.maxBatchInterval) ? 15e3 : n.maxBatchInterval, n.enableDebug = t.Util.stringToBoolOrDefault(n.enableDebug), n.autoCollectErrors = n.autoCollectErrors !== undefined && n.autoCollectErrors !== null ? t.Util.stringToBoolOrDefault(n.autoCollectErrors) : !0, n.disableTelemetry = t.Util.stringToBoolOrDefault(n.disableTelemetry), n.verboseLogging = t.Util.stringToBoolOrDefault(n.verboseLogging), n.emitLineDelimitedJson = t.Util.stringToBoolOrDefault(n.emitLineDelimitedJson), n.diagnosticLogInterval = n.diagnosticLogInterval || 1e4, n
                }, i
            }();
            t.Initialization = i
        })(t = n.ApplicationInsights || (n.ApplicationInsights = {}))
    }(Microsoft || (Microsoft = {}));
initializeAppInsights()