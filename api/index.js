import { createRequire as __createRequireForEsbuildCjsInterop } from 'module'; const require = __createRequireForEsbuildCjsInterop(import.meta.url);
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js
var util, objectUtil, ZodParsedType, getParsedType;
var init_util = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/util.js"() {
    (function(util2) {
      util2.assertEqual = (_) => {
      };
      function assertIs(_arg) {
      }
      util2.assertIs = assertIs;
      function assertNever(_x) {
        throw new Error();
      }
      util2.assertNever = assertNever;
      util2.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
          obj[item] = item;
        }
        return obj;
      };
      util2.getValidEnumValues = (obj) => {
        const validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
          filtered[k] = obj[k];
        }
        return util2.objectValues(filtered);
      };
      util2.objectValues = (obj) => {
        return util2.objectKeys(obj).map(function(e) {
          return obj[e];
        });
      };
      util2.objectKeys = typeof Object.keys === "function" ? (obj) => Object.keys(obj) : (object) => {
        const keys = [];
        for (const key in object) {
          if (Object.prototype.hasOwnProperty.call(object, key)) {
            keys.push(key);
          }
        }
        return keys;
      };
      util2.find = (arr, checker) => {
        for (const item of arr) {
          if (checker(item))
            return item;
        }
        return void 0;
      };
      util2.isInteger = typeof Number.isInteger === "function" ? (val) => Number.isInteger(val) : (val) => typeof val === "number" && Number.isFinite(val) && Math.floor(val) === val;
      function joinValues(array, separator = " | ") {
        return array.map((val) => typeof val === "string" ? `'${val}'` : val).join(separator);
      }
      util2.joinValues = joinValues;
      util2.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
          return value.toString();
        }
        return value;
      };
    })(util || (util = {}));
    (function(objectUtil2) {
      objectUtil2.mergeShapes = (first, second) => {
        return {
          ...first,
          ...second
          // second overwrites first
        };
      };
    })(objectUtil || (objectUtil = {}));
    ZodParsedType = util.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set"
    ]);
    getParsedType = (data) => {
      const t = typeof data;
      switch (t) {
        case "undefined":
          return ZodParsedType.undefined;
        case "string":
          return ZodParsedType.string;
        case "number":
          return Number.isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
          return ZodParsedType.boolean;
        case "function":
          return ZodParsedType.function;
        case "bigint":
          return ZodParsedType.bigint;
        case "symbol":
          return ZodParsedType.symbol;
        case "object":
          if (Array.isArray(data)) {
            return ZodParsedType.array;
          }
          if (data === null) {
            return ZodParsedType.null;
          }
          if (data.then && typeof data.then === "function" && data.catch && typeof data.catch === "function") {
            return ZodParsedType.promise;
          }
          if (typeof Map !== "undefined" && data instanceof Map) {
            return ZodParsedType.map;
          }
          if (typeof Set !== "undefined" && data instanceof Set) {
            return ZodParsedType.set;
          }
          if (typeof Date !== "undefined" && data instanceof Date) {
            return ZodParsedType.date;
          }
          return ZodParsedType.object;
        default:
          return ZodParsedType.unknown;
      }
    };
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js
var ZodIssueCode, quotelessJson, ZodError;
var init_ZodError = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/ZodError.js"() {
    init_util();
    ZodIssueCode = util.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite"
    ]);
    quotelessJson = (obj) => {
      const json = JSON.stringify(obj, null, 2);
      return json.replace(/"([^"]+)":/g, "$1:");
    };
    ZodError = class _ZodError extends Error {
      get errors() {
        return this.issues;
      }
      constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
          this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
          this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(this, actualProto);
        } else {
          this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
      }
      format(_mapper) {
        const mapper = _mapper || function(issue) {
          return issue.message;
        };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
          for (const issue of error.issues) {
            if (issue.code === "invalid_union") {
              issue.unionErrors.map(processError);
            } else if (issue.code === "invalid_return_type") {
              processError(issue.returnTypeError);
            } else if (issue.code === "invalid_arguments") {
              processError(issue.argumentsError);
            } else if (issue.path.length === 0) {
              fieldErrors._errors.push(mapper(issue));
            } else {
              let curr = fieldErrors;
              let i = 0;
              while (i < issue.path.length) {
                const el = issue.path[i];
                const terminal = i === issue.path.length - 1;
                if (!terminal) {
                  curr[el] = curr[el] || { _errors: [] };
                } else {
                  curr[el] = curr[el] || { _errors: [] };
                  curr[el]._errors.push(mapper(issue));
                }
                curr = curr[el];
                i++;
              }
            }
          }
        };
        processError(this);
        return fieldErrors;
      }
      static assert(value) {
        if (!(value instanceof _ZodError)) {
          throw new Error(`Not a ZodError: ${value}`);
        }
      }
      toString() {
        return this.message;
      }
      get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
      }
      get isEmpty() {
        return this.issues.length === 0;
      }
      flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
          if (sub.path.length > 0) {
            const firstEl = sub.path[0];
            fieldErrors[firstEl] = fieldErrors[firstEl] || [];
            fieldErrors[firstEl].push(mapper(sub));
          } else {
            formErrors.push(mapper(sub));
          }
        }
        return { formErrors, fieldErrors };
      }
      get formErrors() {
        return this.flatten();
      }
    };
    ZodError.create = (issues) => {
      const error = new ZodError(issues);
      return error;
    };
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js
var errorMap, en_default;
var init_en = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/locales/en.js"() {
    init_ZodError();
    init_util();
    errorMap = (issue, _ctx) => {
      let message;
      switch (issue.code) {
        case ZodIssueCode.invalid_type:
          if (issue.received === ZodParsedType.undefined) {
            message = "Required";
          } else {
            message = `Expected ${issue.expected}, received ${issue.received}`;
          }
          break;
        case ZodIssueCode.invalid_literal:
          message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
          break;
        case ZodIssueCode.unrecognized_keys:
          message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
          break;
        case ZodIssueCode.invalid_union:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_union_discriminator:
          message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
          break;
        case ZodIssueCode.invalid_enum_value:
          message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
          break;
        case ZodIssueCode.invalid_arguments:
          message = `Invalid function arguments`;
          break;
        case ZodIssueCode.invalid_return_type:
          message = `Invalid function return type`;
          break;
        case ZodIssueCode.invalid_date:
          message = `Invalid date`;
          break;
        case ZodIssueCode.invalid_string:
          if (typeof issue.validation === "object") {
            if ("includes" in issue.validation) {
              message = `Invalid input: must include "${issue.validation.includes}"`;
              if (typeof issue.validation.position === "number") {
                message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
              }
            } else if ("startsWith" in issue.validation) {
              message = `Invalid input: must start with "${issue.validation.startsWith}"`;
            } else if ("endsWith" in issue.validation) {
              message = `Invalid input: must end with "${issue.validation.endsWith}"`;
            } else {
              util.assertNever(issue.validation);
            }
          } else if (issue.validation !== "regex") {
            message = `Invalid ${issue.validation}`;
          } else {
            message = "Invalid";
          }
          break;
        case ZodIssueCode.too_small:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "bigint")
            message = `Number must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${issue.minimum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly equal to ` : issue.inclusive ? `greater than or equal to ` : `greater than `}${new Date(Number(issue.minimum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.too_big:
          if (issue.type === "array")
            message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
          else if (issue.type === "string")
            message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
          else if (issue.type === "number")
            message = `Number must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "bigint")
            message = `BigInt must be ${issue.exact ? `exactly` : issue.inclusive ? `less than or equal to` : `less than`} ${issue.maximum}`;
          else if (issue.type === "date")
            message = `Date must be ${issue.exact ? `exactly` : issue.inclusive ? `smaller than or equal to` : `smaller than`} ${new Date(Number(issue.maximum))}`;
          else
            message = "Invalid input";
          break;
        case ZodIssueCode.custom:
          message = `Invalid input`;
          break;
        case ZodIssueCode.invalid_intersection_types:
          message = `Intersection results could not be merged`;
          break;
        case ZodIssueCode.not_multiple_of:
          message = `Number must be a multiple of ${issue.multipleOf}`;
          break;
        case ZodIssueCode.not_finite:
          message = "Number must be finite";
          break;
        default:
          message = _ctx.defaultError;
          util.assertNever(issue);
      }
      return { message };
    };
    en_default = errorMap;
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js
function setErrorMap(map) {
  overrideErrorMap = map;
}
function getErrorMap() {
  return overrideErrorMap;
}
var overrideErrorMap;
var init_errors = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/errors.js"() {
    init_en();
    overrideErrorMap = en_default;
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js
function addIssueToContext(ctx, issueData) {
  const overrideMap = getErrorMap();
  const issue = makeIssue({
    issueData,
    data: ctx.data,
    path: ctx.path,
    errorMaps: [
      ctx.common.contextualErrorMap,
      // contextual error map is first priority
      ctx.schemaErrorMap,
      // then schema-bound map if available
      overrideMap,
      // then global override map
      overrideMap === en_default ? void 0 : en_default
      // then global default map
    ].filter((x) => !!x)
  });
  ctx.common.issues.push(issue);
}
var makeIssue, EMPTY_PATH, ParseStatus, INVALID, DIRTY, OK, isAborted, isDirty, isValid, isAsync;
var init_parseUtil = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/parseUtil.js"() {
    init_errors();
    init_en();
    makeIssue = (params) => {
      const { data, path: path3, errorMaps, issueData } = params;
      const fullPath = [...path3, ...issueData.path || []];
      const fullIssue = {
        ...issueData,
        path: fullPath
      };
      if (issueData.message !== void 0) {
        return {
          ...issueData,
          path: fullPath,
          message: issueData.message
        };
      }
      let errorMessage = "";
      const maps = errorMaps.filter((m) => !!m).slice().reverse();
      for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
      }
      return {
        ...issueData,
        path: fullPath,
        message: errorMessage
      };
    };
    EMPTY_PATH = [];
    ParseStatus = class _ParseStatus {
      constructor() {
        this.value = "valid";
      }
      dirty() {
        if (this.value === "valid")
          this.value = "dirty";
      }
      abort() {
        if (this.value !== "aborted")
          this.value = "aborted";
      }
      static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
          if (s.status === "aborted")
            return INVALID;
          if (s.status === "dirty")
            status.dirty();
          arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
      }
      static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
          const key = await pair.key;
          const value = await pair.value;
          syncPairs.push({
            key,
            value
          });
        }
        return _ParseStatus.mergeObjectSync(status, syncPairs);
      }
      static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
          const { key, value } = pair;
          if (key.status === "aborted")
            return INVALID;
          if (value.status === "aborted")
            return INVALID;
          if (key.status === "dirty")
            status.dirty();
          if (value.status === "dirty")
            status.dirty();
          if (key.value !== "__proto__" && (typeof value.value !== "undefined" || pair.alwaysSet)) {
            finalObject[key.value] = value.value;
          }
        }
        return { status: status.value, value: finalObject };
      }
    };
    INVALID = Object.freeze({
      status: "aborted"
    });
    DIRTY = (value) => ({ status: "dirty", value });
    OK = (value) => ({ status: "valid", value });
    isAborted = (x) => x.status === "aborted";
    isDirty = (x) => x.status === "dirty";
    isValid = (x) => x.status === "valid";
    isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/typeAliases.js
var init_typeAliases = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/typeAliases.js"() {
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js
var errorUtil;
var init_errorUtil = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/helpers/errorUtil.js"() {
    (function(errorUtil2) {
      errorUtil2.errToObj = (message) => typeof message === "string" ? { message } : message || {};
      errorUtil2.toString = (message) => typeof message === "string" ? message : message?.message;
    })(errorUtil || (errorUtil = {}));
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js
function processCreateParams(params) {
  if (!params)
    return {};
  const { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
  if (errorMap2 && (invalid_type_error || required_error)) {
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  }
  if (errorMap2)
    return { errorMap: errorMap2, description };
  const customMap = (iss, ctx) => {
    const { message } = params;
    if (iss.code === "invalid_enum_value") {
      return { message: message ?? ctx.defaultError };
    }
    if (typeof ctx.data === "undefined") {
      return { message: message ?? required_error ?? ctx.defaultError };
    }
    if (iss.code !== "invalid_type")
      return { message: ctx.defaultError };
    return { message: message ?? invalid_type_error ?? ctx.defaultError };
  };
  return { errorMap: customMap, description };
}
function timeRegexSource(args) {
  let secondsRegexSource = `[0-5]\\d`;
  if (args.precision) {
    secondsRegexSource = `${secondsRegexSource}\\.\\d{${args.precision}}`;
  } else if (args.precision == null) {
    secondsRegexSource = `${secondsRegexSource}(\\.\\d+)?`;
  }
  const secondsQuantifier = args.precision ? "+" : "?";
  return `([01]\\d|2[0-3]):[0-5]\\d(:${secondsRegexSource})${secondsQuantifier}`;
}
function timeRegex(args) {
  return new RegExp(`^${timeRegexSource(args)}$`);
}
function datetimeRegex(args) {
  let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
  const opts = [];
  opts.push(args.local ? `Z?` : `Z`);
  if (args.offset)
    opts.push(`([+-]\\d{2}:?\\d{2})`);
  regex = `${regex}(${opts.join("|")})`;
  return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
  if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
    return true;
  }
  return false;
}
function isValidJWT(jwt2, alg) {
  if (!jwtRegex.test(jwt2))
    return false;
  try {
    const [header] = jwt2.split(".");
    if (!header)
      return false;
    const base64 = header.replace(/-/g, "+").replace(/_/g, "/").padEnd(header.length + (4 - header.length % 4) % 4, "=");
    const decoded = JSON.parse(atob(base64));
    if (typeof decoded !== "object" || decoded === null)
      return false;
    if ("typ" in decoded && decoded?.typ !== "JWT")
      return false;
    if (!decoded.alg)
      return false;
    if (alg && decoded.alg !== alg)
      return false;
    return true;
  } catch {
    return false;
  }
}
function isValidCidr(ip, version) {
  if ((version === "v4" || !version) && ipv4CidrRegex.test(ip)) {
    return true;
  }
  if ((version === "v6" || !version) && ipv6CidrRegex.test(ip)) {
    return true;
  }
  return false;
}
function floatSafeRemainder(val, step) {
  const valDecCount = (val.toString().split(".")[1] || "").length;
  const stepDecCount = (step.toString().split(".")[1] || "").length;
  const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
  const valInt = Number.parseInt(val.toFixed(decCount).replace(".", ""));
  const stepInt = Number.parseInt(step.toFixed(decCount).replace(".", ""));
  return valInt % stepInt / 10 ** decCount;
}
function deepPartialify(schema) {
  if (schema instanceof ZodObject) {
    const newShape = {};
    for (const key in schema.shape) {
      const fieldSchema = schema.shape[key];
      newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
    }
    return new ZodObject({
      ...schema._def,
      shape: () => newShape
    });
  } else if (schema instanceof ZodArray) {
    return new ZodArray({
      ...schema._def,
      type: deepPartialify(schema.element)
    });
  } else if (schema instanceof ZodOptional) {
    return ZodOptional.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodNullable) {
    return ZodNullable.create(deepPartialify(schema.unwrap()));
  } else if (schema instanceof ZodTuple) {
    return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
  } else {
    return schema;
  }
}
function mergeValues(a, b) {
  const aType = getParsedType(a);
  const bType = getParsedType(b);
  if (a === b) {
    return { valid: true, data: a };
  } else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
    const bKeys = util.objectKeys(b);
    const sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1);
    const newObj = { ...a, ...b };
    for (const key of sharedKeys) {
      const sharedValue = mergeValues(a[key], b[key]);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newObj[key] = sharedValue.data;
    }
    return { valid: true, data: newObj };
  } else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
    if (a.length !== b.length) {
      return { valid: false };
    }
    const newArray = [];
    for (let index = 0; index < a.length; index++) {
      const itemA = a[index];
      const itemB = b[index];
      const sharedValue = mergeValues(itemA, itemB);
      if (!sharedValue.valid) {
        return { valid: false };
      }
      newArray.push(sharedValue.data);
    }
    return { valid: true, data: newArray };
  } else if (aType === ZodParsedType.date && bType === ZodParsedType.date && +a === +b) {
    return { valid: true, data: a };
  } else {
    return { valid: false };
  }
}
function createZodEnum(values, params) {
  return new ZodEnum({
    values,
    typeName: ZodFirstPartyTypeKind.ZodEnum,
    ...processCreateParams(params)
  });
}
function cleanParams(params, data) {
  const p = typeof params === "function" ? params(data) : typeof params === "string" ? { message: params } : params;
  const p2 = typeof p === "string" ? { message: p } : p;
  return p2;
}
function custom(check, _params = {}, fatal) {
  if (check)
    return ZodAny.create().superRefine((data, ctx) => {
      const r = check(data);
      if (r instanceof Promise) {
        return r.then((r2) => {
          if (!r2) {
            const params = cleanParams(_params, data);
            const _fatal = params.fatal ?? fatal ?? true;
            ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
          }
        });
      }
      if (!r) {
        const params = cleanParams(_params, data);
        const _fatal = params.fatal ?? fatal ?? true;
        ctx.addIssue({ code: "custom", ...params, fatal: _fatal });
      }
      return;
    });
  return ZodAny.create();
}
var ParseInputLazyPath, handleResult, ZodType, cuidRegex, cuid2Regex, ulidRegex, uuidRegex, nanoidRegex, jwtRegex, durationRegex, emailRegex, _emojiRegex, emojiRegex, ipv4Regex, ipv4CidrRegex, ipv6Regex, ipv6CidrRegex, base64Regex, base64urlRegex, dateRegexSource, dateRegex, ZodString, ZodNumber, ZodBigInt, ZodBoolean, ZodDate, ZodSymbol, ZodUndefined, ZodNull, ZodAny, ZodUnknown, ZodNever, ZodVoid, ZodArray, ZodObject, ZodUnion, getDiscriminator, ZodDiscriminatedUnion, ZodIntersection, ZodTuple, ZodRecord, ZodMap, ZodSet, ZodFunction, ZodLazy, ZodLiteral, ZodEnum, ZodNativeEnum, ZodPromise, ZodEffects, ZodOptional, ZodNullable, ZodDefault, ZodCatch, ZodNaN, BRAND, ZodBranded, ZodPipeline, ZodReadonly, late, ZodFirstPartyTypeKind, instanceOfType, stringType, numberType, nanType, bigIntType, booleanType, dateType, symbolType, undefinedType, nullType, anyType, unknownType, neverType, voidType, arrayType, objectType, strictObjectType, unionType, discriminatedUnionType, intersectionType, tupleType, recordType, mapType, setType, functionType, lazyType, literalType, enumType, nativeEnumType, promiseType, effectsType, optionalType, nullableType, preprocessType, pipelineType, ostring, onumber, oboolean, coerce, NEVER;
var init_types = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/types.js"() {
    init_ZodError();
    init_errors();
    init_errorUtil();
    init_parseUtil();
    init_util();
    ParseInputLazyPath = class {
      constructor(parent, value, path3, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path3;
        this._key = key;
      }
      get path() {
        if (!this._cachedPath.length) {
          if (Array.isArray(this._key)) {
            this._cachedPath.push(...this._path, ...this._key);
          } else {
            this._cachedPath.push(...this._path, this._key);
          }
        }
        return this._cachedPath;
      }
    };
    handleResult = (ctx, result) => {
      if (isValid(result)) {
        return { success: true, data: result.value };
      } else {
        if (!ctx.common.issues.length) {
          throw new Error("Validation failed but no issues detected.");
        }
        return {
          success: false,
          get error() {
            if (this._error)
              return this._error;
            const error = new ZodError(ctx.common.issues);
            this._error = error;
            return this._error;
          }
        };
      }
    };
    ZodType = class {
      get description() {
        return this._def.description;
      }
      _getType(input) {
        return getParsedType(input.data);
      }
      _getOrReturnCtx(input, ctx) {
        return ctx || {
          common: input.parent.common,
          data: input.data,
          parsedType: getParsedType(input.data),
          schemaErrorMap: this._def.errorMap,
          path: input.path,
          parent: input.parent
        };
      }
      _processInputParams(input) {
        return {
          status: new ParseStatus(),
          ctx: {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent
          }
        };
      }
      _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
          throw new Error("Synchronous parse encountered promise.");
        }
        return result;
      }
      _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
      }
      parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      safeParse(data, params) {
        const ctx = {
          common: {
            issues: [],
            async: params?.async ?? false,
            contextualErrorMap: params?.errorMap
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
      }
      "~validate"(data) {
        const ctx = {
          common: {
            issues: [],
            async: !!this["~standard"].async
          },
          path: [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        if (!this["~standard"].async) {
          try {
            const result = this._parseSync({ data, path: [], parent: ctx });
            return isValid(result) ? {
              value: result.value
            } : {
              issues: ctx.common.issues
            };
          } catch (err) {
            if (err?.message?.toLowerCase()?.includes("encountered")) {
              this["~standard"].async = true;
            }
            ctx.common = {
              issues: [],
              async: true
            };
          }
        }
        return this._parseAsync({ data, path: [], parent: ctx }).then((result) => isValid(result) ? {
          value: result.value
        } : {
          issues: ctx.common.issues
        });
      }
      async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
          return result.data;
        throw result.error;
      }
      async safeParseAsync(data, params) {
        const ctx = {
          common: {
            issues: [],
            contextualErrorMap: params?.errorMap,
            async: true
          },
          path: params?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data,
          parsedType: getParsedType(data)
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult) ? maybeAsyncResult : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
      }
      refine(check, message) {
        const getIssueProperties = (val) => {
          if (typeof message === "string" || typeof message === "undefined") {
            return { message };
          } else if (typeof message === "function") {
            return message(val);
          } else {
            return message;
          }
        };
        return this._refinement((val, ctx) => {
          const result = check(val);
          const setError = () => ctx.addIssue({
            code: ZodIssueCode.custom,
            ...getIssueProperties(val)
          });
          if (typeof Promise !== "undefined" && result instanceof Promise) {
            return result.then((data) => {
              if (!data) {
                setError();
                return false;
              } else {
                return true;
              }
            });
          }
          if (!result) {
            setError();
            return false;
          } else {
            return true;
          }
        });
      }
      refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
          if (!check(val)) {
            ctx.addIssue(typeof refinementData === "function" ? refinementData(val, ctx) : refinementData);
            return false;
          } else {
            return true;
          }
        });
      }
      _refinement(refinement) {
        return new ZodEffects({
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "refinement", refinement }
        });
      }
      superRefine(refinement) {
        return this._refinement(refinement);
      }
      constructor(def) {
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
        this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: (data) => this["~validate"](data)
        };
      }
      optional() {
        return ZodOptional.create(this, this._def);
      }
      nullable() {
        return ZodNullable.create(this, this._def);
      }
      nullish() {
        return this.nullable().optional();
      }
      array() {
        return ZodArray.create(this);
      }
      promise() {
        return ZodPromise.create(this, this._def);
      }
      or(option) {
        return ZodUnion.create([this, option], this._def);
      }
      and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
      }
      transform(transform) {
        return new ZodEffects({
          ...processCreateParams(this._def),
          schema: this,
          typeName: ZodFirstPartyTypeKind.ZodEffects,
          effect: { type: "transform", transform }
        });
      }
      default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
          ...processCreateParams(this._def),
          innerType: this,
          defaultValue: defaultValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodDefault
        });
      }
      brand() {
        return new ZodBranded({
          typeName: ZodFirstPartyTypeKind.ZodBranded,
          type: this,
          ...processCreateParams(this._def)
        });
      }
      catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
          ...processCreateParams(this._def),
          innerType: this,
          catchValue: catchValueFunc,
          typeName: ZodFirstPartyTypeKind.ZodCatch
        });
      }
      describe(description) {
        const This = this.constructor;
        return new This({
          ...this._def,
          description
        });
      }
      pipe(target) {
        return ZodPipeline.create(this, target);
      }
      readonly() {
        return ZodReadonly.create(this);
      }
      isOptional() {
        return this.safeParse(void 0).success;
      }
      isNullable() {
        return this.safeParse(null).success;
      }
    };
    cuidRegex = /^c[^\s-]{8,}$/i;
    cuid2Regex = /^[0-9a-z]+$/;
    ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/i;
    uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
    nanoidRegex = /^[a-z0-9_-]{21}$/i;
    jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
    durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
    emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
    _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
    ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
    ipv4CidrRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/;
    ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
    ipv6CidrRegex = /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/;
    base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
    base64urlRegex = /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/;
    dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
    dateRegex = new RegExp(`^${dateRegexSource}$`);
    ZodString = class _ZodString extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.string,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.length < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.length > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "string",
                inclusive: true,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "length") {
            const tooBig = input.data.length > check.value;
            const tooSmall = input.data.length < check.value;
            if (tooBig || tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              if (tooBig) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_big,
                  maximum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              } else if (tooSmall) {
                addIssueToContext(ctx, {
                  code: ZodIssueCode.too_small,
                  minimum: check.value,
                  type: "string",
                  inclusive: true,
                  exact: true,
                  message: check.message
                });
              }
              status.dirty();
            }
          } else if (check.kind === "email") {
            if (!emailRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "email",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "emoji") {
            if (!emojiRegex) {
              emojiRegex = new RegExp(_emojiRegex, "u");
            }
            if (!emojiRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "emoji",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "uuid") {
            if (!uuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "uuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "nanoid") {
            if (!nanoidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "nanoid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid") {
            if (!cuidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cuid2") {
            if (!cuid2Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cuid2",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ulid") {
            if (!ulidRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ulid",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "url") {
            try {
              new URL(input.data);
            } catch {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "regex") {
            check.regex.lastIndex = 0;
            const testResult = check.regex.test(input.data);
            if (!testResult) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "regex",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "trim") {
            input.data = input.data.trim();
          } else if (check.kind === "includes") {
            if (!input.data.includes(check.value, check.position)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { includes: check.value, position: check.position },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "toLowerCase") {
            input.data = input.data.toLowerCase();
          } else if (check.kind === "toUpperCase") {
            input.data = input.data.toUpperCase();
          } else if (check.kind === "startsWith") {
            if (!input.data.startsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { startsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "endsWith") {
            if (!input.data.endsWith(check.value)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: { endsWith: check.value },
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "datetime") {
            const regex = datetimeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "datetime",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "date") {
            const regex = dateRegex;
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "date",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "time") {
            const regex = timeRegex(check);
            if (!regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_string,
                validation: "time",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "duration") {
            if (!durationRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "duration",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "ip") {
            if (!isValidIP(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "ip",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "jwt") {
            if (!isValidJWT(input.data, check.alg)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "jwt",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "cidr") {
            if (!isValidCidr(input.data, check.version)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "cidr",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64") {
            if (!base64Regex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "base64url") {
            if (!base64urlRegex.test(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                validation: "base64url",
                code: ZodIssueCode.invalid_string,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
          validation,
          code: ZodIssueCode.invalid_string,
          ...errorUtil.errToObj(message)
        });
      }
      _addCheck(check) {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
      }
      url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
      }
      emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
      }
      uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
      }
      nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
      }
      cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
      }
      cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
      }
      ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
      }
      base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
      }
      base64url(message) {
        return this._addCheck({
          kind: "base64url",
          ...errorUtil.errToObj(message)
        });
      }
      jwt(options) {
        return this._addCheck({ kind: "jwt", ...errorUtil.errToObj(options) });
      }
      ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
      }
      cidr(options) {
        return this._addCheck({ kind: "cidr", ...errorUtil.errToObj(options) });
      }
      datetime(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "datetime",
            precision: null,
            offset: false,
            local: false,
            message: options
          });
        }
        return this._addCheck({
          kind: "datetime",
          precision: typeof options?.precision === "undefined" ? null : options?.precision,
          offset: options?.offset ?? false,
          local: options?.local ?? false,
          ...errorUtil.errToObj(options?.message)
        });
      }
      date(message) {
        return this._addCheck({ kind: "date", message });
      }
      time(options) {
        if (typeof options === "string") {
          return this._addCheck({
            kind: "time",
            precision: null,
            message: options
          });
        }
        return this._addCheck({
          kind: "time",
          precision: typeof options?.precision === "undefined" ? null : options?.precision,
          ...errorUtil.errToObj(options?.message)
        });
      }
      duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
      }
      regex(regex, message) {
        return this._addCheck({
          kind: "regex",
          regex,
          ...errorUtil.errToObj(message)
        });
      }
      includes(value, options) {
        return this._addCheck({
          kind: "includes",
          value,
          position: options?.position,
          ...errorUtil.errToObj(options?.message)
        });
      }
      startsWith(value, message) {
        return this._addCheck({
          kind: "startsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      endsWith(value, message) {
        return this._addCheck({
          kind: "endsWith",
          value,
          ...errorUtil.errToObj(message)
        });
      }
      min(minLength, message) {
        return this._addCheck({
          kind: "min",
          value: minLength,
          ...errorUtil.errToObj(message)
        });
      }
      max(maxLength, message) {
        return this._addCheck({
          kind: "max",
          value: maxLength,
          ...errorUtil.errToObj(message)
        });
      }
      length(len, message) {
        return this._addCheck({
          kind: "length",
          value: len,
          ...errorUtil.errToObj(message)
        });
      }
      /**
       * Equivalent to `.min(1)`
       */
      nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
      }
      trim() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "trim" }]
        });
      }
      toLowerCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toLowerCase" }]
        });
      }
      toUpperCase() {
        return new _ZodString({
          ...this._def,
          checks: [...this._def.checks, { kind: "toUpperCase" }]
        });
      }
      get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
      }
      get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
      }
      get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
      }
      get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
      }
      get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
      }
      get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
      }
      get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
      }
      get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
      }
      get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
      }
      get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
      }
      get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
      }
      get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
      }
      get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
      }
      get isCIDR() {
        return !!this._def.checks.find((ch) => ch.kind === "cidr");
      }
      get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
      }
      get isBase64url() {
        return !!this._def.checks.find((ch) => ch.kind === "base64url");
      }
      get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodString.create = (params) => {
      return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params)
      });
    };
    ZodNumber = class _ZodNumber extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
      }
      _parse(input) {
        if (this._def.coerce) {
          input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.number,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "int") {
            if (!util.isInteger(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: "integer",
                received: "float",
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: check.value,
                type: "number",
                inclusive: check.inclusive,
                exact: false,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (floatSafeRemainder(input.data, check.value) !== 0) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "finite") {
            if (!Number.isFinite(input.data)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_finite,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodNumber({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodNumber({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      int(message) {
        return this._addCheck({
          kind: "int",
          message: errorUtil.toString(message)
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: 0,
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      finite(message) {
        return this._addCheck({
          kind: "finite",
          message: errorUtil.toString(message)
        });
      }
      safe(message) {
        return this._addCheck({
          kind: "min",
          inclusive: true,
          value: Number.MIN_SAFE_INTEGER,
          message: errorUtil.toString(message)
        })._addCheck({
          kind: "max",
          inclusive: true,
          value: Number.MAX_SAFE_INTEGER,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
      get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" || ch.kind === "multipleOf" && util.isInteger(ch.value));
      }
      get isFinite() {
        let max = null;
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") {
            return true;
          } else if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          } else if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return Number.isFinite(min) && Number.isFinite(max);
      }
    };
    ZodNumber.create = (params) => {
      return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: params?.coerce || false,
        ...processCreateParams(params)
      });
    };
    ZodBigInt = class _ZodBigInt extends ZodType {
      constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
      }
      _parse(input) {
        if (this._def.coerce) {
          try {
            input.data = BigInt(input.data);
          } catch {
            return this._getInvalidInput(input);
          }
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
          return this._getInvalidInput(input);
        }
        let ctx = void 0;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            const tooSmall = check.inclusive ? input.data < check.value : input.data <= check.value;
            if (tooSmall) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                type: "bigint",
                minimum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            const tooBig = check.inclusive ? input.data > check.value : input.data >= check.value;
            if (tooBig) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                type: "bigint",
                maximum: check.value,
                inclusive: check.inclusive,
                message: check.message
              });
              status.dirty();
            }
          } else if (check.kind === "multipleOf") {
            if (input.data % check.value !== BigInt(0)) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.not_multiple_of,
                multipleOf: check.value,
                message: check.message
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return { status: status.value, value: input.data };
      }
      _getInvalidInput(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.bigint,
          received: ctx.parsedType
        });
        return INVALID;
      }
      gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
      }
      gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
      }
      lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
      }
      lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
      }
      setLimit(kind, value, inclusive, message) {
        return new _ZodBigInt({
          ...this._def,
          checks: [
            ...this._def.checks,
            {
              kind,
              value,
              inclusive,
              message: errorUtil.toString(message)
            }
          ]
        });
      }
      _addCheck(check) {
        return new _ZodBigInt({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      positive(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      negative(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: false,
          message: errorUtil.toString(message)
        });
      }
      nonpositive(message) {
        return this._addCheck({
          kind: "max",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      nonnegative(message) {
        return this._addCheck({
          kind: "min",
          value: BigInt(0),
          inclusive: true,
          message: errorUtil.toString(message)
        });
      }
      multipleOf(value, message) {
        return this._addCheck({
          kind: "multipleOf",
          value,
          message: errorUtil.toString(message)
        });
      }
      get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min;
      }
      get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max;
      }
    };
    ZodBigInt.create = (params) => {
      return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: params?.coerce ?? false,
        ...processCreateParams(params)
      });
    };
    ZodBoolean = class extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.boolean,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodBoolean.create = (params) => {
      return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: params?.coerce || false,
        ...processCreateParams(params)
      });
    };
    ZodDate = class _ZodDate extends ZodType {
      _parse(input) {
        if (this._def.coerce) {
          input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.date,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        if (Number.isNaN(input.data.getTime())) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_date
          });
          return INVALID;
        }
        const status = new ParseStatus();
        let ctx = void 0;
        for (const check of this._def.checks) {
          if (check.kind === "min") {
            if (input.data.getTime() < check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                message: check.message,
                inclusive: true,
                exact: false,
                minimum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else if (check.kind === "max") {
            if (input.data.getTime() > check.value) {
              ctx = this._getOrReturnCtx(input, ctx);
              addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                message: check.message,
                inclusive: true,
                exact: false,
                maximum: check.value,
                type: "date"
              });
              status.dirty();
            }
          } else {
            util.assertNever(check);
          }
        }
        return {
          status: status.value,
          value: new Date(input.data.getTime())
        };
      }
      _addCheck(check) {
        return new _ZodDate({
          ...this._def,
          checks: [...this._def.checks, check]
        });
      }
      min(minDate, message) {
        return this._addCheck({
          kind: "min",
          value: minDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      max(maxDate, message) {
        return this._addCheck({
          kind: "max",
          value: maxDate.getTime(),
          message: errorUtil.toString(message)
        });
      }
      get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "min") {
            if (min === null || ch.value > min)
              min = ch.value;
          }
        }
        return min != null ? new Date(min) : null;
      }
      get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
          if (ch.kind === "max") {
            if (max === null || ch.value < max)
              max = ch.value;
          }
        }
        return max != null ? new Date(max) : null;
      }
    };
    ZodDate.create = (params) => {
      return new ZodDate({
        checks: [],
        coerce: params?.coerce || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params)
      });
    };
    ZodSymbol = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.symbol,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodSymbol.create = (params) => {
      return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params)
      });
    };
    ZodUndefined = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.undefined,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodUndefined.create = (params) => {
      return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params)
      });
    };
    ZodNull = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.null,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodNull.create = (params) => {
      return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params)
      });
    };
    ZodAny = class extends ZodType {
      constructor() {
        super(...arguments);
        this._any = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodAny.create = (params) => {
      return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params)
      });
    };
    ZodUnknown = class extends ZodType {
      constructor() {
        super(...arguments);
        this._unknown = true;
      }
      _parse(input) {
        return OK(input.data);
      }
    };
    ZodUnknown.create = (params) => {
      return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params)
      });
    };
    ZodNever = class extends ZodType {
      _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
          code: ZodIssueCode.invalid_type,
          expected: ZodParsedType.never,
          received: ctx.parsedType
        });
        return INVALID;
      }
    };
    ZodNever.create = (params) => {
      return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params)
      });
    };
    ZodVoid = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.void,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return OK(input.data);
      }
    };
    ZodVoid.create = (params) => {
      return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params)
      });
    };
    ZodArray = class _ZodArray extends ZodType {
      _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (def.exactLength !== null) {
          const tooBig = ctx.data.length > def.exactLength.value;
          const tooSmall = ctx.data.length < def.exactLength.value;
          if (tooBig || tooSmall) {
            addIssueToContext(ctx, {
              code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
              minimum: tooSmall ? def.exactLength.value : void 0,
              maximum: tooBig ? def.exactLength.value : void 0,
              type: "array",
              inclusive: true,
              exact: true,
              message: def.exactLength.message
            });
            status.dirty();
          }
        }
        if (def.minLength !== null) {
          if (ctx.data.length < def.minLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.minLength.message
            });
            status.dirty();
          }
        }
        if (def.maxLength !== null) {
          if (ctx.data.length > def.maxLength.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxLength.value,
              type: "array",
              inclusive: true,
              exact: false,
              message: def.maxLength.message
            });
            status.dirty();
          }
        }
        if (ctx.common.async) {
          return Promise.all([...ctx.data].map((item, i) => {
            return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
          })).then((result2) => {
            return ParseStatus.mergeArray(status, result2);
          });
        }
        const result = [...ctx.data].map((item, i) => {
          return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
      }
      get element() {
        return this._def.type;
      }
      min(minLength, message) {
        return new _ZodArray({
          ...this._def,
          minLength: { value: minLength, message: errorUtil.toString(message) }
        });
      }
      max(maxLength, message) {
        return new _ZodArray({
          ...this._def,
          maxLength: { value: maxLength, message: errorUtil.toString(message) }
        });
      }
      length(len, message) {
        return new _ZodArray({
          ...this._def,
          exactLength: { value: len, message: errorUtil.toString(message) }
        });
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodArray.create = (schema, params) => {
      return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params)
      });
    };
    ZodObject = class _ZodObject extends ZodType {
      constructor() {
        super(...arguments);
        this._cached = null;
        this.nonstrict = this.passthrough;
        this.augment = this.extend;
      }
      _getCached() {
        if (this._cached !== null)
          return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        this._cached = { shape, keys };
        return this._cached;
      }
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
          const ctx2 = this._getOrReturnCtx(input);
          addIssueToContext(ctx2, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx2.parsedType
          });
          return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip")) {
          for (const key in ctx.data) {
            if (!shapeKeys.includes(key)) {
              extraKeys.push(key);
            }
          }
        }
        const pairs = [];
        for (const key of shapeKeys) {
          const keyValidator = shape[key];
          const value = ctx.data[key];
          pairs.push({
            key: { status: "valid", value: key },
            value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (this._def.catchall instanceof ZodNever) {
          const unknownKeys = this._def.unknownKeys;
          if (unknownKeys === "passthrough") {
            for (const key of extraKeys) {
              pairs.push({
                key: { status: "valid", value: key },
                value: { status: "valid", value: ctx.data[key] }
              });
            }
          } else if (unknownKeys === "strict") {
            if (extraKeys.length > 0) {
              addIssueToContext(ctx, {
                code: ZodIssueCode.unrecognized_keys,
                keys: extraKeys
              });
              status.dirty();
            }
          } else if (unknownKeys === "strip") {
          } else {
            throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
          }
        } else {
          const catchall = this._def.catchall;
          for (const key of extraKeys) {
            const value = ctx.data[key];
            pairs.push({
              key: { status: "valid", value: key },
              value: catchall._parse(
                new ParseInputLazyPath(ctx, value, ctx.path, key)
                //, ctx.child(key), value, getParsedType(value)
              ),
              alwaysSet: key in ctx.data
            });
          }
        }
        if (ctx.common.async) {
          return Promise.resolve().then(async () => {
            const syncPairs = [];
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              syncPairs.push({
                key,
                value,
                alwaysSet: pair.alwaysSet
              });
            }
            return syncPairs;
          }).then((syncPairs) => {
            return ParseStatus.mergeObjectSync(status, syncPairs);
          });
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get shape() {
        return this._def.shape();
      }
      strict(message) {
        errorUtil.errToObj;
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strict",
          ...message !== void 0 ? {
            errorMap: (issue, ctx) => {
              const defaultError = this._def.errorMap?.(issue, ctx).message ?? ctx.defaultError;
              if (issue.code === "unrecognized_keys")
                return {
                  message: errorUtil.errToObj(message).message ?? defaultError
                };
              return {
                message: defaultError
              };
            }
          } : {}
        });
      }
      strip() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "strip"
        });
      }
      passthrough() {
        return new _ZodObject({
          ...this._def,
          unknownKeys: "passthrough"
        });
      }
      // const AugmentFactory =
      //   <Def extends ZodObjectDef>(def: Def) =>
      //   <Augmentation extends ZodRawShape>(
      //     augmentation: Augmentation
      //   ): ZodObject<
      //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
      //     Def["unknownKeys"],
      //     Def["catchall"]
      //   > => {
      //     return new ZodObject({
      //       ...def,
      //       shape: () => ({
      //         ...def.shape(),
      //         ...augmentation,
      //       }),
      //     }) as any;
      //   };
      extend(augmentation) {
        return new _ZodObject({
          ...this._def,
          shape: () => ({
            ...this._def.shape(),
            ...augmentation
          })
        });
      }
      /**
       * Prior to zod@1.0.12 there was a bug in the
       * inferred type of merged objects. Please
       * upgrade if you are experiencing issues.
       */
      merge(merging) {
        const merged = new _ZodObject({
          unknownKeys: merging._def.unknownKeys,
          catchall: merging._def.catchall,
          shape: () => ({
            ...this._def.shape(),
            ...merging._def.shape()
          }),
          typeName: ZodFirstPartyTypeKind.ZodObject
        });
        return merged;
      }
      // merge<
      //   Incoming extends AnyZodObject,
      //   Augmentation extends Incoming["shape"],
      //   NewOutput extends {
      //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
      //       ? Augmentation[k]["_output"]
      //       : k extends keyof Output
      //       ? Output[k]
      //       : never;
      //   },
      //   NewInput extends {
      //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
      //       ? Augmentation[k]["_input"]
      //       : k extends keyof Input
      //       ? Input[k]
      //       : never;
      //   }
      // >(
      //   merging: Incoming
      // ): ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"],
      //   NewOutput,
      //   NewInput
      // > {
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      setKey(key, schema) {
        return this.augment({ [key]: schema });
      }
      // merge<Incoming extends AnyZodObject>(
      //   merging: Incoming
      // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
      // ZodObject<
      //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
      //   Incoming["_def"]["unknownKeys"],
      //   Incoming["_def"]["catchall"]
      // > {
      //   // const mergedShape = objectUtil.mergeShapes(
      //   //   this._def.shape(),
      //   //   merging._def.shape()
      //   // );
      //   const merged: any = new ZodObject({
      //     unknownKeys: merging._def.unknownKeys,
      //     catchall: merging._def.catchall,
      //     shape: () =>
      //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
      //     typeName: ZodFirstPartyTypeKind.ZodObject,
      //   }) as any;
      //   return merged;
      // }
      catchall(index) {
        return new _ZodObject({
          ...this._def,
          catchall: index
        });
      }
      pick(mask) {
        const shape = {};
        for (const key of util.objectKeys(mask)) {
          if (mask[key] && this.shape[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      omit(mask) {
        const shape = {};
        for (const key of util.objectKeys(this.shape)) {
          if (!mask[key]) {
            shape[key] = this.shape[key];
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => shape
        });
      }
      /**
       * @deprecated
       */
      deepPartial() {
        return deepPartialify(this);
      }
      partial(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
          const fieldSchema = this.shape[key];
          if (mask && !mask[key]) {
            newShape[key] = fieldSchema;
          } else {
            newShape[key] = fieldSchema.optional();
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      required(mask) {
        const newShape = {};
        for (const key of util.objectKeys(this.shape)) {
          if (mask && !mask[key]) {
            newShape[key] = this.shape[key];
          } else {
            const fieldSchema = this.shape[key];
            let newField = fieldSchema;
            while (newField instanceof ZodOptional) {
              newField = newField._def.innerType;
            }
            newShape[key] = newField;
          }
        }
        return new _ZodObject({
          ...this._def,
          shape: () => newShape
        });
      }
      keyof() {
        return createZodEnum(util.objectKeys(this.shape));
      }
    };
    ZodObject.create = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.strictCreate = (shape, params) => {
      return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodObject.lazycreate = (shape, params) => {
      return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params)
      });
    };
    ZodUnion = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
          for (const result of results) {
            if (result.result.status === "valid") {
              return result.result;
            }
          }
          for (const result of results) {
            if (result.result.status === "dirty") {
              ctx.common.issues.push(...result.ctx.common.issues);
              return result.result;
            }
          }
          const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return Promise.all(options.map(async (option) => {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            return {
              result: await option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: childCtx
              }),
              ctx: childCtx
            };
          })).then(handleResults);
        } else {
          let dirty = void 0;
          const issues = [];
          for (const option of options) {
            const childCtx = {
              ...ctx,
              common: {
                ...ctx.common,
                issues: []
              },
              parent: null
            };
            const result = option._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: childCtx
            });
            if (result.status === "valid") {
              return result;
            } else if (result.status === "dirty" && !dirty) {
              dirty = { result, ctx: childCtx };
            }
            if (childCtx.common.issues.length) {
              issues.push(childCtx.common.issues);
            }
          }
          if (dirty) {
            ctx.common.issues.push(...dirty.ctx.common.issues);
            return dirty.result;
          }
          const unionErrors = issues.map((issues2) => new ZodError(issues2));
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union,
            unionErrors
          });
          return INVALID;
        }
      }
      get options() {
        return this._def.options;
      }
    };
    ZodUnion.create = (types, params) => {
      return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params)
      });
    };
    getDiscriminator = (type) => {
      if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
      } else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
      } else if (type instanceof ZodLiteral) {
        return [type.value];
      } else if (type instanceof ZodEnum) {
        return type.options;
      } else if (type instanceof ZodNativeEnum) {
        return util.objectValues(type.enum);
      } else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
      } else if (type instanceof ZodUndefined) {
        return [void 0];
      } else if (type instanceof ZodNull) {
        return [null];
      } else if (type instanceof ZodOptional) {
        return [void 0, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
      } else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
      } else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
      } else {
        return [];
      }
    };
    ZodDiscriminatedUnion = class _ZodDiscriminatedUnion extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [discriminator]
          });
          return INVALID;
        }
        if (ctx.common.async) {
          return option._parseAsync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        } else {
          return option._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
        }
      }
      get discriminator() {
        return this._def.discriminator;
      }
      get options() {
        return this._def.options;
      }
      get optionsMap() {
        return this._def.optionsMap;
      }
      /**
       * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
       * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
       * have a different value for each object in the union.
       * @param discriminator the name of the discriminator property
       * @param types an array of object schemas
       * @param params
       */
      static create(discriminator, options, params) {
        const optionsMap = /* @__PURE__ */ new Map();
        for (const type of options) {
          const discriminatorValues = getDiscriminator(type.shape[discriminator]);
          if (!discriminatorValues.length) {
            throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
          }
          for (const value of discriminatorValues) {
            if (optionsMap.has(value)) {
              throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
            }
            optionsMap.set(value, type);
          }
        }
        return new _ZodDiscriminatedUnion({
          typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
          discriminator,
          options,
          optionsMap,
          ...processCreateParams(params)
        });
      }
    };
    ZodIntersection = class extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
          if (isAborted(parsedLeft) || isAborted(parsedRight)) {
            return INVALID;
          }
          const merged = mergeValues(parsedLeft.value, parsedRight.value);
          if (!merged.valid) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.invalid_intersection_types
            });
            return INVALID;
          }
          if (isDirty(parsedLeft) || isDirty(parsedRight)) {
            status.dirty();
          }
          return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
          return Promise.all([
            this._def.left._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            }),
            this._def.right._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            })
          ]).then(([left, right]) => handleParsed(left, right));
        } else {
          return handleParsed(this._def.left._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }), this._def.right._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          }));
        }
      }
    };
    ZodIntersection.create = (left, right, params) => {
      return new ZodIntersection({
        left,
        right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params)
      });
    };
    ZodTuple = class _ZodTuple extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.array,
            received: ctx.parsedType
          });
          return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_small,
            minimum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.too_big,
            maximum: this._def.items.length,
            inclusive: true,
            exact: false,
            type: "array"
          });
          status.dirty();
        }
        const items = [...ctx.data].map((item, itemIndex) => {
          const schema = this._def.items[itemIndex] || this._def.rest;
          if (!schema)
            return null;
          return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        }).filter((x) => !!x);
        if (ctx.common.async) {
          return Promise.all(items).then((results) => {
            return ParseStatus.mergeArray(status, results);
          });
        } else {
          return ParseStatus.mergeArray(status, items);
        }
      }
      get items() {
        return this._def.items;
      }
      rest(rest) {
        return new _ZodTuple({
          ...this._def,
          rest
        });
      }
    };
    ZodTuple.create = (schemas, params) => {
      if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
      }
      return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params)
      });
    };
    ZodRecord = class _ZodRecord extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.object,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
          pairs.push({
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
            value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
            alwaysSet: key in ctx.data
          });
        }
        if (ctx.common.async) {
          return ParseStatus.mergeObjectAsync(status, pairs);
        } else {
          return ParseStatus.mergeObjectSync(status, pairs);
        }
      }
      get element() {
        return this._def.valueType;
      }
      static create(first, second, third) {
        if (second instanceof ZodType) {
          return new _ZodRecord({
            keyType: first,
            valueType: second,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(third)
          });
        }
        return new _ZodRecord({
          keyType: ZodString.create(),
          valueType: first,
          typeName: ZodFirstPartyTypeKind.ZodRecord,
          ...processCreateParams(second)
        });
      }
    };
    ZodMap = class extends ZodType {
      get keySchema() {
        return this._def.keyType;
      }
      get valueSchema() {
        return this._def.valueType;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.map,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
          return {
            key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
            value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]))
          };
        });
        if (ctx.common.async) {
          const finalMap = /* @__PURE__ */ new Map();
          return Promise.resolve().then(async () => {
            for (const pair of pairs) {
              const key = await pair.key;
              const value = await pair.value;
              if (key.status === "aborted" || value.status === "aborted") {
                return INVALID;
              }
              if (key.status === "dirty" || value.status === "dirty") {
                status.dirty();
              }
              finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
          });
        } else {
          const finalMap = /* @__PURE__ */ new Map();
          for (const pair of pairs) {
            const key = pair.key;
            const value = pair.value;
            if (key.status === "aborted" || value.status === "aborted") {
              return INVALID;
            }
            if (key.status === "dirty" || value.status === "dirty") {
              status.dirty();
            }
            finalMap.set(key.value, value.value);
          }
          return { status: status.value, value: finalMap };
        }
      }
    };
    ZodMap.create = (keyType, valueType, params) => {
      return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params)
      });
    };
    ZodSet = class _ZodSet extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.set,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
          if (ctx.data.size < def.minSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_small,
              minimum: def.minSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.minSize.message
            });
            status.dirty();
          }
        }
        if (def.maxSize !== null) {
          if (ctx.data.size > def.maxSize.value) {
            addIssueToContext(ctx, {
              code: ZodIssueCode.too_big,
              maximum: def.maxSize.value,
              type: "set",
              inclusive: true,
              exact: false,
              message: def.maxSize.message
            });
            status.dirty();
          }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements2) {
          const parsedSet = /* @__PURE__ */ new Set();
          for (const element of elements2) {
            if (element.status === "aborted")
              return INVALID;
            if (element.status === "dirty")
              status.dirty();
            parsedSet.add(element.value);
          }
          return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
          return Promise.all(elements).then((elements2) => finalizeSet(elements2));
        } else {
          return finalizeSet(elements);
        }
      }
      min(minSize, message) {
        return new _ZodSet({
          ...this._def,
          minSize: { value: minSize, message: errorUtil.toString(message) }
        });
      }
      max(maxSize, message) {
        return new _ZodSet({
          ...this._def,
          maxSize: { value: maxSize, message: errorUtil.toString(message) }
        });
      }
      size(size, message) {
        return this.min(size, message).max(size, message);
      }
      nonempty(message) {
        return this.min(1, message);
      }
    };
    ZodSet.create = (valueType, params) => {
      return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params)
      });
    };
    ZodFunction = class _ZodFunction extends ZodType {
      constructor() {
        super(...arguments);
        this.validate = this.implement;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.function,
            received: ctx.parsedType
          });
          return INVALID;
        }
        function makeArgsIssue(args, error) {
          return makeIssue({
            data: args,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_arguments,
              argumentsError: error
            }
          });
        }
        function makeReturnsIssue(returns, error) {
          return makeIssue({
            data: returns,
            path: ctx.path,
            errorMaps: [ctx.common.contextualErrorMap, ctx.schemaErrorMap, getErrorMap(), en_default].filter((x) => !!x),
            issueData: {
              code: ZodIssueCode.invalid_return_type,
              returnTypeError: error
            }
          });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
          const me = this;
          return OK(async function(...args) {
            const error = new ZodError([]);
            const parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
              error.addIssue(makeArgsIssue(args, e));
              throw error;
            });
            const result = await Reflect.apply(fn, this, parsedArgs);
            const parsedReturns = await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
              error.addIssue(makeReturnsIssue(result, e));
              throw error;
            });
            return parsedReturns;
          });
        } else {
          const me = this;
          return OK(function(...args) {
            const parsedArgs = me._def.args.safeParse(args, params);
            if (!parsedArgs.success) {
              throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
            }
            const result = Reflect.apply(fn, this, parsedArgs.data);
            const parsedReturns = me._def.returns.safeParse(result, params);
            if (!parsedReturns.success) {
              throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
            }
            return parsedReturns.data;
          });
        }
      }
      parameters() {
        return this._def.args;
      }
      returnType() {
        return this._def.returns;
      }
      args(...items) {
        return new _ZodFunction({
          ...this._def,
          args: ZodTuple.create(items).rest(ZodUnknown.create())
        });
      }
      returns(returnType) {
        return new _ZodFunction({
          ...this._def,
          returns: returnType
        });
      }
      implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
      }
      static create(args, returns, params) {
        return new _ZodFunction({
          args: args ? args : ZodTuple.create([]).rest(ZodUnknown.create()),
          returns: returns || ZodUnknown.create(),
          typeName: ZodFirstPartyTypeKind.ZodFunction,
          ...processCreateParams(params)
        });
      }
    };
    ZodLazy = class extends ZodType {
      get schema() {
        return this._def.getter();
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
      }
    };
    ZodLazy.create = (getter, params) => {
      return new ZodLazy({
        getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params)
      });
    };
    ZodLiteral = class extends ZodType {
      _parse(input) {
        if (input.data !== this._def.value) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_literal,
            expected: this._def.value
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
      get value() {
        return this._def.value;
      }
    };
    ZodLiteral.create = (value, params) => {
      return new ZodLiteral({
        value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params)
      });
    };
    ZodEnum = class _ZodEnum extends ZodType {
      _parse(input) {
        if (typeof input.data !== "string") {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(this._def.values);
        }
        if (!this._cache.has(input.data)) {
          const ctx = this._getOrReturnCtx(input);
          const expectedValues = this._def.values;
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get options() {
        return this._def.values;
      }
      get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
          enumValues[val] = val;
        }
        return enumValues;
      }
      extract(values, newDef = this._def) {
        return _ZodEnum.create(values, {
          ...this._def,
          ...newDef
        });
      }
      exclude(values, newDef = this._def) {
        return _ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
          ...this._def,
          ...newDef
        });
      }
    };
    ZodEnum.create = createZodEnum;
    ZodNativeEnum = class extends ZodType {
      _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            expected: util.joinValues(expectedValues),
            received: ctx.parsedType,
            code: ZodIssueCode.invalid_type
          });
          return INVALID;
        }
        if (!this._cache) {
          this._cache = new Set(util.getValidEnumValues(this._def.values));
        }
        if (!this._cache.has(input.data)) {
          const expectedValues = util.objectValues(nativeEnumValues);
          addIssueToContext(ctx, {
            received: ctx.data,
            code: ZodIssueCode.invalid_enum_value,
            options: expectedValues
          });
          return INVALID;
        }
        return OK(input.data);
      }
      get enum() {
        return this._def.values;
      }
    };
    ZodNativeEnum.create = (values, params) => {
      return new ZodNativeEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params)
      });
    };
    ZodPromise = class extends ZodType {
      unwrap() {
        return this._def.type;
      }
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === false) {
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.promise,
            received: ctx.parsedType
          });
          return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
          return this._def.type.parseAsync(data, {
            path: ctx.path,
            errorMap: ctx.common.contextualErrorMap
          });
        }));
      }
    };
    ZodPromise.create = (schema, params) => {
      return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params)
      });
    };
    ZodEffects = class extends ZodType {
      innerType() {
        return this._def.schema;
      }
      sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
      }
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
          addIssue: (arg) => {
            addIssueToContext(ctx, arg);
            if (arg.fatal) {
              status.abort();
            } else {
              status.dirty();
            }
          },
          get path() {
            return ctx.path;
          }
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
          const processed = effect.transform(ctx.data, checkCtx);
          if (ctx.common.async) {
            return Promise.resolve(processed).then(async (processed2) => {
              if (status.value === "aborted")
                return INVALID;
              const result = await this._def.schema._parseAsync({
                data: processed2,
                path: ctx.path,
                parent: ctx
              });
              if (result.status === "aborted")
                return INVALID;
              if (result.status === "dirty")
                return DIRTY(result.value);
              if (status.value === "dirty")
                return DIRTY(result.value);
              return result;
            });
          } else {
            if (status.value === "aborted")
              return INVALID;
            const result = this._def.schema._parseSync({
              data: processed,
              path: ctx.path,
              parent: ctx
            });
            if (result.status === "aborted")
              return INVALID;
            if (result.status === "dirty")
              return DIRTY(result.value);
            if (status.value === "dirty")
              return DIRTY(result.value);
            return result;
          }
        }
        if (effect.type === "refinement") {
          const executeRefinement = (acc) => {
            const result = effect.refinement(acc, checkCtx);
            if (ctx.common.async) {
              return Promise.resolve(result);
            }
            if (result instanceof Promise) {
              throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
            }
            return acc;
          };
          if (ctx.common.async === false) {
            const inner = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inner.status === "aborted")
              return INVALID;
            if (inner.status === "dirty")
              status.dirty();
            executeRefinement(inner.value);
            return { status: status.value, value: inner.value };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((inner) => {
              if (inner.status === "aborted")
                return INVALID;
              if (inner.status === "dirty")
                status.dirty();
              return executeRefinement(inner.value).then(() => {
                return { status: status.value, value: inner.value };
              });
            });
          }
        }
        if (effect.type === "transform") {
          if (ctx.common.async === false) {
            const base = this._def.schema._parseSync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (!isValid(base))
              return INVALID;
            const result = effect.transform(base.value, checkCtx);
            if (result instanceof Promise) {
              throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
            }
            return { status: status.value, value: result };
          } else {
            return this._def.schema._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx }).then((base) => {
              if (!isValid(base))
                return INVALID;
              return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({
                status: status.value,
                value: result
              }));
            });
          }
        }
        util.assertNever(effect);
      }
    };
    ZodEffects.create = (schema, effect, params) => {
      return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params)
      });
    };
    ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
      return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params)
      });
    };
    ZodOptional = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
          return OK(void 0);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodOptional.create = (type, params) => {
      return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params)
      });
    };
    ZodNullable = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
          return OK(null);
        }
        return this._def.innerType._parse(input);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodNullable.create = (type, params) => {
      return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params)
      });
    };
    ZodDefault = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
          data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      removeDefault() {
        return this._def.innerType;
      }
    };
    ZodDefault.create = (type, params) => {
      return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function" ? params.default : () => params.default,
        ...processCreateParams(params)
      });
    };
    ZodCatch = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const newCtx = {
          ...ctx,
          common: {
            ...ctx.common,
            issues: []
          }
        };
        const result = this._def.innerType._parse({
          data: newCtx.data,
          path: newCtx.path,
          parent: {
            ...newCtx
          }
        });
        if (isAsync(result)) {
          return result.then((result2) => {
            return {
              status: "valid",
              value: result2.status === "valid" ? result2.value : this._def.catchValue({
                get error() {
                  return new ZodError(newCtx.common.issues);
                },
                input: newCtx.data
              })
            };
          });
        } else {
          return {
            status: "valid",
            value: result.status === "valid" ? result.value : this._def.catchValue({
              get error() {
                return new ZodError(newCtx.common.issues);
              },
              input: newCtx.data
            })
          };
        }
      }
      removeCatch() {
        return this._def.innerType;
      }
    };
    ZodCatch.create = (type, params) => {
      return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params)
      });
    };
    ZodNaN = class extends ZodType {
      _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
          const ctx = this._getOrReturnCtx(input);
          addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.nan,
            received: ctx.parsedType
          });
          return INVALID;
        }
        return { status: "valid", value: input.data };
      }
    };
    ZodNaN.create = (params) => {
      return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params)
      });
    };
    BRAND = Symbol("zod_brand");
    ZodBranded = class extends ZodType {
      _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
          data,
          path: ctx.path,
          parent: ctx
        });
      }
      unwrap() {
        return this._def.type;
      }
    };
    ZodPipeline = class _ZodPipeline extends ZodType {
      _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
          const handleAsync = async () => {
            const inResult = await this._def.in._parseAsync({
              data: ctx.data,
              path: ctx.path,
              parent: ctx
            });
            if (inResult.status === "aborted")
              return INVALID;
            if (inResult.status === "dirty") {
              status.dirty();
              return DIRTY(inResult.value);
            } else {
              return this._def.out._parseAsync({
                data: inResult.value,
                path: ctx.path,
                parent: ctx
              });
            }
          };
          return handleAsync();
        } else {
          const inResult = this._def.in._parseSync({
            data: ctx.data,
            path: ctx.path,
            parent: ctx
          });
          if (inResult.status === "aborted")
            return INVALID;
          if (inResult.status === "dirty") {
            status.dirty();
            return {
              status: "dirty",
              value: inResult.value
            };
          } else {
            return this._def.out._parseSync({
              data: inResult.value,
              path: ctx.path,
              parent: ctx
            });
          }
        }
      }
      static create(a, b) {
        return new _ZodPipeline({
          in: a,
          out: b,
          typeName: ZodFirstPartyTypeKind.ZodPipeline
        });
      }
    };
    ZodReadonly = class extends ZodType {
      _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
          if (isValid(data)) {
            data.value = Object.freeze(data.value);
          }
          return data;
        };
        return isAsync(result) ? result.then((data) => freeze(data)) : freeze(result);
      }
      unwrap() {
        return this._def.innerType;
      }
    };
    ZodReadonly.create = (type, params) => {
      return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params)
      });
    };
    late = {
      object: ZodObject.lazycreate
    };
    (function(ZodFirstPartyTypeKind2) {
      ZodFirstPartyTypeKind2["ZodString"] = "ZodString";
      ZodFirstPartyTypeKind2["ZodNumber"] = "ZodNumber";
      ZodFirstPartyTypeKind2["ZodNaN"] = "ZodNaN";
      ZodFirstPartyTypeKind2["ZodBigInt"] = "ZodBigInt";
      ZodFirstPartyTypeKind2["ZodBoolean"] = "ZodBoolean";
      ZodFirstPartyTypeKind2["ZodDate"] = "ZodDate";
      ZodFirstPartyTypeKind2["ZodSymbol"] = "ZodSymbol";
      ZodFirstPartyTypeKind2["ZodUndefined"] = "ZodUndefined";
      ZodFirstPartyTypeKind2["ZodNull"] = "ZodNull";
      ZodFirstPartyTypeKind2["ZodAny"] = "ZodAny";
      ZodFirstPartyTypeKind2["ZodUnknown"] = "ZodUnknown";
      ZodFirstPartyTypeKind2["ZodNever"] = "ZodNever";
      ZodFirstPartyTypeKind2["ZodVoid"] = "ZodVoid";
      ZodFirstPartyTypeKind2["ZodArray"] = "ZodArray";
      ZodFirstPartyTypeKind2["ZodObject"] = "ZodObject";
      ZodFirstPartyTypeKind2["ZodUnion"] = "ZodUnion";
      ZodFirstPartyTypeKind2["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
      ZodFirstPartyTypeKind2["ZodIntersection"] = "ZodIntersection";
      ZodFirstPartyTypeKind2["ZodTuple"] = "ZodTuple";
      ZodFirstPartyTypeKind2["ZodRecord"] = "ZodRecord";
      ZodFirstPartyTypeKind2["ZodMap"] = "ZodMap";
      ZodFirstPartyTypeKind2["ZodSet"] = "ZodSet";
      ZodFirstPartyTypeKind2["ZodFunction"] = "ZodFunction";
      ZodFirstPartyTypeKind2["ZodLazy"] = "ZodLazy";
      ZodFirstPartyTypeKind2["ZodLiteral"] = "ZodLiteral";
      ZodFirstPartyTypeKind2["ZodEnum"] = "ZodEnum";
      ZodFirstPartyTypeKind2["ZodEffects"] = "ZodEffects";
      ZodFirstPartyTypeKind2["ZodNativeEnum"] = "ZodNativeEnum";
      ZodFirstPartyTypeKind2["ZodOptional"] = "ZodOptional";
      ZodFirstPartyTypeKind2["ZodNullable"] = "ZodNullable";
      ZodFirstPartyTypeKind2["ZodDefault"] = "ZodDefault";
      ZodFirstPartyTypeKind2["ZodCatch"] = "ZodCatch";
      ZodFirstPartyTypeKind2["ZodPromise"] = "ZodPromise";
      ZodFirstPartyTypeKind2["ZodBranded"] = "ZodBranded";
      ZodFirstPartyTypeKind2["ZodPipeline"] = "ZodPipeline";
      ZodFirstPartyTypeKind2["ZodReadonly"] = "ZodReadonly";
    })(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
    instanceOfType = (cls, params = {
      message: `Input not instance of ${cls.name}`
    }) => custom((data) => data instanceof cls, params);
    stringType = ZodString.create;
    numberType = ZodNumber.create;
    nanType = ZodNaN.create;
    bigIntType = ZodBigInt.create;
    booleanType = ZodBoolean.create;
    dateType = ZodDate.create;
    symbolType = ZodSymbol.create;
    undefinedType = ZodUndefined.create;
    nullType = ZodNull.create;
    anyType = ZodAny.create;
    unknownType = ZodUnknown.create;
    neverType = ZodNever.create;
    voidType = ZodVoid.create;
    arrayType = ZodArray.create;
    objectType = ZodObject.create;
    strictObjectType = ZodObject.strictCreate;
    unionType = ZodUnion.create;
    discriminatedUnionType = ZodDiscriminatedUnion.create;
    intersectionType = ZodIntersection.create;
    tupleType = ZodTuple.create;
    recordType = ZodRecord.create;
    mapType = ZodMap.create;
    setType = ZodSet.create;
    functionType = ZodFunction.create;
    lazyType = ZodLazy.create;
    literalType = ZodLiteral.create;
    enumType = ZodEnum.create;
    nativeEnumType = ZodNativeEnum.create;
    promiseType = ZodPromise.create;
    effectsType = ZodEffects.create;
    optionalType = ZodOptional.create;
    nullableType = ZodNullable.create;
    preprocessType = ZodEffects.createWithPreprocess;
    pipelineType = ZodPipeline.create;
    ostring = () => stringType().optional();
    onumber = () => numberType().optional();
    oboolean = () => booleanType().optional();
    coerce = {
      string: (arg) => ZodString.create({ ...arg, coerce: true }),
      number: (arg) => ZodNumber.create({ ...arg, coerce: true }),
      boolean: (arg) => ZodBoolean.create({
        ...arg,
        coerce: true
      }),
      bigint: (arg) => ZodBigInt.create({ ...arg, coerce: true }),
      date: (arg) => ZodDate.create({ ...arg, coerce: true })
    };
    NEVER = INVALID;
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js
var external_exports = {};
__export(external_exports, {
  BRAND: () => BRAND,
  DIRTY: () => DIRTY,
  EMPTY_PATH: () => EMPTY_PATH,
  INVALID: () => INVALID,
  NEVER: () => NEVER,
  OK: () => OK,
  ParseStatus: () => ParseStatus,
  Schema: () => ZodType,
  ZodAny: () => ZodAny,
  ZodArray: () => ZodArray,
  ZodBigInt: () => ZodBigInt,
  ZodBoolean: () => ZodBoolean,
  ZodBranded: () => ZodBranded,
  ZodCatch: () => ZodCatch,
  ZodDate: () => ZodDate,
  ZodDefault: () => ZodDefault,
  ZodDiscriminatedUnion: () => ZodDiscriminatedUnion,
  ZodEffects: () => ZodEffects,
  ZodEnum: () => ZodEnum,
  ZodError: () => ZodError,
  ZodFirstPartyTypeKind: () => ZodFirstPartyTypeKind,
  ZodFunction: () => ZodFunction,
  ZodIntersection: () => ZodIntersection,
  ZodIssueCode: () => ZodIssueCode,
  ZodLazy: () => ZodLazy,
  ZodLiteral: () => ZodLiteral,
  ZodMap: () => ZodMap,
  ZodNaN: () => ZodNaN,
  ZodNativeEnum: () => ZodNativeEnum,
  ZodNever: () => ZodNever,
  ZodNull: () => ZodNull,
  ZodNullable: () => ZodNullable,
  ZodNumber: () => ZodNumber,
  ZodObject: () => ZodObject,
  ZodOptional: () => ZodOptional,
  ZodParsedType: () => ZodParsedType,
  ZodPipeline: () => ZodPipeline,
  ZodPromise: () => ZodPromise,
  ZodReadonly: () => ZodReadonly,
  ZodRecord: () => ZodRecord,
  ZodSchema: () => ZodType,
  ZodSet: () => ZodSet,
  ZodString: () => ZodString,
  ZodSymbol: () => ZodSymbol,
  ZodTransformer: () => ZodEffects,
  ZodTuple: () => ZodTuple,
  ZodType: () => ZodType,
  ZodUndefined: () => ZodUndefined,
  ZodUnion: () => ZodUnion,
  ZodUnknown: () => ZodUnknown,
  ZodVoid: () => ZodVoid,
  addIssueToContext: () => addIssueToContext,
  any: () => anyType,
  array: () => arrayType,
  bigint: () => bigIntType,
  boolean: () => booleanType,
  coerce: () => coerce,
  custom: () => custom,
  date: () => dateType,
  datetimeRegex: () => datetimeRegex,
  defaultErrorMap: () => en_default,
  discriminatedUnion: () => discriminatedUnionType,
  effect: () => effectsType,
  enum: () => enumType,
  function: () => functionType,
  getErrorMap: () => getErrorMap,
  getParsedType: () => getParsedType,
  instanceof: () => instanceOfType,
  intersection: () => intersectionType,
  isAborted: () => isAborted,
  isAsync: () => isAsync,
  isDirty: () => isDirty,
  isValid: () => isValid,
  late: () => late,
  lazy: () => lazyType,
  literal: () => literalType,
  makeIssue: () => makeIssue,
  map: () => mapType,
  nan: () => nanType,
  nativeEnum: () => nativeEnumType,
  never: () => neverType,
  null: () => nullType,
  nullable: () => nullableType,
  number: () => numberType,
  object: () => objectType,
  objectUtil: () => objectUtil,
  oboolean: () => oboolean,
  onumber: () => onumber,
  optional: () => optionalType,
  ostring: () => ostring,
  pipeline: () => pipelineType,
  preprocess: () => preprocessType,
  promise: () => promiseType,
  quotelessJson: () => quotelessJson,
  record: () => recordType,
  set: () => setType,
  setErrorMap: () => setErrorMap,
  strictObject: () => strictObjectType,
  string: () => stringType,
  symbol: () => symbolType,
  transformer: () => effectsType,
  tuple: () => tupleType,
  undefined: () => undefinedType,
  union: () => unionType,
  unknown: () => unknownType,
  util: () => util,
  void: () => voidType
});
var init_external = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/v3/external.js"() {
    init_errors();
    init_parseUtil();
    init_typeAliases();
    init_util();
    init_types();
    init_ZodError();
  }
});

// node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.js
var init_zod = __esm({
  "node_modules/.pnpm/zod@3.25.76/node_modules/zod/index.js"() {
    init_external();
    init_external();
  }
});

// node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js
var require_safe_buffer = __commonJS({
  "node_modules/.pnpm/safe-buffer@5.2.1/node_modules/safe-buffer/index.js"(exports, module) {
    var buffer = __require("buffer");
    var Buffer2 = buffer.Buffer;
    function copyProps(src, dst) {
      for (var key in src) {
        dst[key] = src[key];
      }
    }
    if (Buffer2.from && Buffer2.alloc && Buffer2.allocUnsafe && Buffer2.allocUnsafeSlow) {
      module.exports = buffer;
    } else {
      copyProps(buffer, exports);
      exports.Buffer = SafeBuffer;
    }
    function SafeBuffer(arg, encodingOrOffset, length) {
      return Buffer2(arg, encodingOrOffset, length);
    }
    SafeBuffer.prototype = Object.create(Buffer2.prototype);
    copyProps(Buffer2, SafeBuffer);
    SafeBuffer.from = function(arg, encodingOrOffset, length) {
      if (typeof arg === "number") {
        throw new TypeError("Argument must not be a number");
      }
      return Buffer2(arg, encodingOrOffset, length);
    };
    SafeBuffer.alloc = function(size, fill, encoding) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      var buf = Buffer2(size);
      if (fill !== void 0) {
        if (typeof encoding === "string") {
          buf.fill(fill, encoding);
        } else {
          buf.fill(fill);
        }
      } else {
        buf.fill(0);
      }
      return buf;
    };
    SafeBuffer.allocUnsafe = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return Buffer2(size);
    };
    SafeBuffer.allocUnsafeSlow = function(size) {
      if (typeof size !== "number") {
        throw new TypeError("Argument must be a number");
      }
      return buffer.SlowBuffer(size);
    };
  }
});

// node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/data-stream.js
var require_data_stream = __commonJS({
  "node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/data-stream.js"(exports, module) {
    var Buffer2 = require_safe_buffer().Buffer;
    var Stream = __require("stream");
    var util2 = __require("util");
    function DataStream(data) {
      this.buffer = null;
      this.writable = true;
      this.readable = true;
      if (!data) {
        this.buffer = Buffer2.alloc(0);
        return this;
      }
      if (typeof data.pipe === "function") {
        this.buffer = Buffer2.alloc(0);
        data.pipe(this);
        return this;
      }
      if (data.length || typeof data === "object") {
        this.buffer = data;
        this.writable = false;
        process.nextTick(function() {
          this.emit("end", data);
          this.readable = false;
          this.emit("close");
        }.bind(this));
        return this;
      }
      throw new TypeError("Unexpected data type (" + typeof data + ")");
    }
    util2.inherits(DataStream, Stream);
    DataStream.prototype.write = function write(data) {
      this.buffer = Buffer2.concat([this.buffer, Buffer2.from(data)]);
      this.emit("data", data);
    };
    DataStream.prototype.end = function end(data) {
      if (data)
        this.write(data);
      this.emit("end", data);
      this.emit("close");
      this.writable = false;
      this.readable = false;
    };
    module.exports = DataStream;
  }
});

// node_modules/.pnpm/ecdsa-sig-formatter@1.0.11/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js
var require_param_bytes_for_alg = __commonJS({
  "node_modules/.pnpm/ecdsa-sig-formatter@1.0.11/node_modules/ecdsa-sig-formatter/src/param-bytes-for-alg.js"(exports, module) {
    "use strict";
    function getParamSize(keySize) {
      var result = (keySize / 8 | 0) + (keySize % 8 === 0 ? 0 : 1);
      return result;
    }
    var paramBytesForAlg = {
      ES256: getParamSize(256),
      ES384: getParamSize(384),
      ES512: getParamSize(521)
    };
    function getParamBytesForAlg(alg) {
      var paramBytes = paramBytesForAlg[alg];
      if (paramBytes) {
        return paramBytes;
      }
      throw new Error('Unknown algorithm "' + alg + '"');
    }
    module.exports = getParamBytesForAlg;
  }
});

// node_modules/.pnpm/ecdsa-sig-formatter@1.0.11/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js
var require_ecdsa_sig_formatter = __commonJS({
  "node_modules/.pnpm/ecdsa-sig-formatter@1.0.11/node_modules/ecdsa-sig-formatter/src/ecdsa-sig-formatter.js"(exports, module) {
    "use strict";
    var Buffer2 = require_safe_buffer().Buffer;
    var getParamBytesForAlg = require_param_bytes_for_alg();
    var MAX_OCTET = 128;
    var CLASS_UNIVERSAL = 0;
    var PRIMITIVE_BIT = 32;
    var TAG_SEQ = 16;
    var TAG_INT = 2;
    var ENCODED_TAG_SEQ = TAG_SEQ | PRIMITIVE_BIT | CLASS_UNIVERSAL << 6;
    var ENCODED_TAG_INT = TAG_INT | CLASS_UNIVERSAL << 6;
    function base64Url(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function signatureAsBuffer(signature) {
      if (Buffer2.isBuffer(signature)) {
        return signature;
      } else if ("string" === typeof signature) {
        return Buffer2.from(signature, "base64");
      }
      throw new TypeError("ECDSA signature must be a Base64 string or a Buffer");
    }
    function derToJose(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var maxEncodedParamLength = paramBytes + 1;
      var inputLength = signature.length;
      var offset = 0;
      if (signature[offset++] !== ENCODED_TAG_SEQ) {
        throw new Error('Could not find expected "seq"');
      }
      var seqLength = signature[offset++];
      if (seqLength === (MAX_OCTET | 1)) {
        seqLength = signature[offset++];
      }
      if (inputLength - offset < seqLength) {
        throw new Error('"seq" specified length of "' + seqLength + '", only "' + (inputLength - offset) + '" remaining');
      }
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "r"');
      }
      var rLength = signature[offset++];
      if (inputLength - offset - 2 < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", only "' + (inputLength - offset - 2) + '" available');
      }
      if (maxEncodedParamLength < rLength) {
        throw new Error('"r" specified length of "' + rLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var rOffset = offset;
      offset += rLength;
      if (signature[offset++] !== ENCODED_TAG_INT) {
        throw new Error('Could not find expected "int" for "s"');
      }
      var sLength = signature[offset++];
      if (inputLength - offset !== sLength) {
        throw new Error('"s" specified length of "' + sLength + '", expected "' + (inputLength - offset) + '"');
      }
      if (maxEncodedParamLength < sLength) {
        throw new Error('"s" specified length of "' + sLength + '", max of "' + maxEncodedParamLength + '" is acceptable');
      }
      var sOffset = offset;
      offset += sLength;
      if (offset !== inputLength) {
        throw new Error('Expected to consume entire buffer, but "' + (inputLength - offset) + '" bytes remain');
      }
      var rPadding = paramBytes - rLength, sPadding = paramBytes - sLength;
      var dst = Buffer2.allocUnsafe(rPadding + rLength + sPadding + sLength);
      for (offset = 0; offset < rPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, rOffset + Math.max(-rPadding, 0), rOffset + rLength);
      offset = paramBytes;
      for (var o = offset; offset < o + sPadding; ++offset) {
        dst[offset] = 0;
      }
      signature.copy(dst, offset, sOffset + Math.max(-sPadding, 0), sOffset + sLength);
      dst = dst.toString("base64");
      dst = base64Url(dst);
      return dst;
    }
    function countPadding(buf, start, stop) {
      var padding = 0;
      while (start + padding < stop && buf[start + padding] === 0) {
        ++padding;
      }
      var needsSign = buf[start + padding] >= MAX_OCTET;
      if (needsSign) {
        --padding;
      }
      return padding;
    }
    function joseToDer(signature, alg) {
      signature = signatureAsBuffer(signature);
      var paramBytes = getParamBytesForAlg(alg);
      var signatureBytes = signature.length;
      if (signatureBytes !== paramBytes * 2) {
        throw new TypeError('"' + alg + '" signatures must be "' + paramBytes * 2 + '" bytes, saw "' + signatureBytes + '"');
      }
      var rPadding = countPadding(signature, 0, paramBytes);
      var sPadding = countPadding(signature, paramBytes, signature.length);
      var rLength = paramBytes - rPadding;
      var sLength = paramBytes - sPadding;
      var rsBytes = 1 + 1 + rLength + 1 + 1 + sLength;
      var shortLength = rsBytes < MAX_OCTET;
      var dst = Buffer2.allocUnsafe((shortLength ? 2 : 3) + rsBytes);
      var offset = 0;
      dst[offset++] = ENCODED_TAG_SEQ;
      if (shortLength) {
        dst[offset++] = rsBytes;
      } else {
        dst[offset++] = MAX_OCTET | 1;
        dst[offset++] = rsBytes & 255;
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = rLength;
      if (rPadding < 0) {
        dst[offset++] = 0;
        offset += signature.copy(dst, offset, 0, paramBytes);
      } else {
        offset += signature.copy(dst, offset, rPadding, paramBytes);
      }
      dst[offset++] = ENCODED_TAG_INT;
      dst[offset++] = sLength;
      if (sPadding < 0) {
        dst[offset++] = 0;
        signature.copy(dst, offset, paramBytes);
      } else {
        signature.copy(dst, offset, paramBytes + sPadding);
      }
      return dst;
    }
    module.exports = {
      derToJose,
      joseToDer
    };
  }
});

// node_modules/.pnpm/buffer-equal-constant-time@1.0.1/node_modules/buffer-equal-constant-time/index.js
var require_buffer_equal_constant_time = __commonJS({
  "node_modules/.pnpm/buffer-equal-constant-time@1.0.1/node_modules/buffer-equal-constant-time/index.js"(exports, module) {
    "use strict";
    var Buffer2 = __require("buffer").Buffer;
    var SlowBuffer = __require("buffer").SlowBuffer;
    module.exports = bufferEq;
    function bufferEq(a, b) {
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        return false;
      }
      if (a.length !== b.length) {
        return false;
      }
      var c = 0;
      for (var i = 0; i < a.length; i++) {
        c |= a[i] ^ b[i];
      }
      return c === 0;
    }
    bufferEq.install = function() {
      Buffer2.prototype.equal = SlowBuffer.prototype.equal = function equal(that) {
        return bufferEq(this, that);
      };
    };
    var origBufEqual = Buffer2.prototype.equal;
    var origSlowBufEqual = SlowBuffer.prototype.equal;
    bufferEq.restore = function() {
      Buffer2.prototype.equal = origBufEqual;
      SlowBuffer.prototype.equal = origSlowBufEqual;
    };
  }
});

// node_modules/.pnpm/jwa@2.0.1/node_modules/jwa/index.js
var require_jwa = __commonJS({
  "node_modules/.pnpm/jwa@2.0.1/node_modules/jwa/index.js"(exports, module) {
    var Buffer2 = require_safe_buffer().Buffer;
    var crypto5 = __require("crypto");
    var formatEcdsa = require_ecdsa_sig_formatter();
    var util2 = __require("util");
    var MSG_INVALID_ALGORITHM = '"%s" is not a valid algorithm.\n  Supported algorithms are:\n  "HS256", "HS384", "HS512", "RS256", "RS384", "RS512", "PS256", "PS384", "PS512", "ES256", "ES384", "ES512" and "none".';
    var MSG_INVALID_SECRET = "secret must be a string or buffer";
    var MSG_INVALID_VERIFIER_KEY = "key must be a string or a buffer";
    var MSG_INVALID_SIGNER_KEY = "key must be a string, a buffer or an object";
    var supportsKeyObjects = typeof crypto5.createPublicKey === "function";
    if (supportsKeyObjects) {
      MSG_INVALID_VERIFIER_KEY += " or a KeyObject";
      MSG_INVALID_SECRET += "or a KeyObject";
    }
    function checkIsPublicKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.type !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.asymmetricKeyType !== "string") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_VERIFIER_KEY);
      }
    }
    function checkIsPrivateKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return;
      }
      if (typeof key === "object") {
        return;
      }
      throw typeError(MSG_INVALID_SIGNER_KEY);
    }
    function checkIsSecretKey(key) {
      if (Buffer2.isBuffer(key)) {
        return;
      }
      if (typeof key === "string") {
        return key;
      }
      if (!supportsKeyObjects) {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key !== "object") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (key.type !== "secret") {
        throw typeError(MSG_INVALID_SECRET);
      }
      if (typeof key.export !== "function") {
        throw typeError(MSG_INVALID_SECRET);
      }
    }
    function fromBase64(base64) {
      return base64.replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function toBase64(base64url) {
      base64url = base64url.toString();
      var padding = 4 - base64url.length % 4;
      if (padding !== 4) {
        for (var i = 0; i < padding; ++i) {
          base64url += "=";
        }
      }
      return base64url.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function typeError(template) {
      var args = [].slice.call(arguments, 1);
      var errMsg = util2.format.bind(util2, template).apply(null, args);
      return new TypeError(errMsg);
    }
    function bufferOrString(obj) {
      return Buffer2.isBuffer(obj) || typeof obj === "string";
    }
    function normalizeInput(thing) {
      if (!bufferOrString(thing))
        thing = JSON.stringify(thing);
      return thing;
    }
    function createHmacSigner(bits) {
      return function sign(thing, secret) {
        checkIsSecretKey(secret);
        thing = normalizeInput(thing);
        var hmac = crypto5.createHmac("sha" + bits, secret);
        var sig = (hmac.update(thing), hmac.digest("base64"));
        return fromBase64(sig);
      };
    }
    var bufferEqual;
    var timingSafeEqual = "timingSafeEqual" in crypto5 ? function timingSafeEqual2(a, b) {
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      return crypto5.timingSafeEqual(a, b);
    } : function timingSafeEqual2(a, b) {
      if (!bufferEqual) {
        bufferEqual = require_buffer_equal_constant_time();
      }
      return bufferEqual(a, b);
    };
    function createHmacVerifier(bits) {
      return function verify(thing, signature, secret) {
        var computedSig = createHmacSigner(bits)(thing, secret);
        return timingSafeEqual(Buffer2.from(signature), Buffer2.from(computedSig));
      };
    }
    function createKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto5.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign(privateKey, "base64"));
        return fromBase64(sig);
      };
    }
    function createKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto5.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify(publicKey, signature, "base64");
      };
    }
    function createPSSKeySigner(bits) {
      return function sign(thing, privateKey) {
        checkIsPrivateKey(privateKey);
        thing = normalizeInput(thing);
        var signer = crypto5.createSign("RSA-SHA" + bits);
        var sig = (signer.update(thing), signer.sign({
          key: privateKey,
          padding: crypto5.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto5.constants.RSA_PSS_SALTLEN_DIGEST
        }, "base64"));
        return fromBase64(sig);
      };
    }
    function createPSSKeyVerifier(bits) {
      return function verify(thing, signature, publicKey) {
        checkIsPublicKey(publicKey);
        thing = normalizeInput(thing);
        signature = toBase64(signature);
        var verifier = crypto5.createVerify("RSA-SHA" + bits);
        verifier.update(thing);
        return verifier.verify({
          key: publicKey,
          padding: crypto5.constants.RSA_PKCS1_PSS_PADDING,
          saltLength: crypto5.constants.RSA_PSS_SALTLEN_DIGEST
        }, signature, "base64");
      };
    }
    function createECDSASigner(bits) {
      var inner = createKeySigner(bits);
      return function sign() {
        var signature = inner.apply(null, arguments);
        signature = formatEcdsa.derToJose(signature, "ES" + bits);
        return signature;
      };
    }
    function createECDSAVerifer(bits) {
      var inner = createKeyVerifier(bits);
      return function verify(thing, signature, publicKey) {
        signature = formatEcdsa.joseToDer(signature, "ES" + bits).toString("base64");
        var result = inner(thing, signature, publicKey);
        return result;
      };
    }
    function createNoneSigner() {
      return function sign() {
        return "";
      };
    }
    function createNoneVerifier() {
      return function verify(thing, signature) {
        return signature === "";
      };
    }
    module.exports = function jwa(algorithm) {
      var signerFactories = {
        hs: createHmacSigner,
        rs: createKeySigner,
        ps: createPSSKeySigner,
        es: createECDSASigner,
        none: createNoneSigner
      };
      var verifierFactories = {
        hs: createHmacVerifier,
        rs: createKeyVerifier,
        ps: createPSSKeyVerifier,
        es: createECDSAVerifer,
        none: createNoneVerifier
      };
      var match2 = algorithm.match(/^(RS|PS|ES|HS)(256|384|512)$|^(none)$/);
      if (!match2)
        throw typeError(MSG_INVALID_ALGORITHM, algorithm);
      var algo = (match2[1] || match2[3]).toLowerCase();
      var bits = match2[2];
      return {
        sign: signerFactories[algo](bits),
        verify: verifierFactories[algo](bits)
      };
    };
  }
});

// node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/tostring.js
var require_tostring = __commonJS({
  "node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/tostring.js"(exports, module) {
    var Buffer2 = __require("buffer").Buffer;
    module.exports = function toString(obj) {
      if (typeof obj === "string")
        return obj;
      if (typeof obj === "number" || Buffer2.isBuffer(obj))
        return obj.toString();
      return JSON.stringify(obj);
    };
  }
});

// node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/sign-stream.js
var require_sign_stream = __commonJS({
  "node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/sign-stream.js"(exports, module) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = __require("stream");
    var toString = require_tostring();
    var util2 = __require("util");
    function base64url(string, encoding) {
      return Buffer2.from(string, encoding).toString("base64").replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
    }
    function jwsSecuredInput(header, payload, encoding) {
      encoding = encoding || "utf8";
      var encodedHeader = base64url(toString(header), "binary");
      var encodedPayload = base64url(toString(payload), encoding);
      return util2.format("%s.%s", encodedHeader, encodedPayload);
    }
    function jwsSign(opts) {
      var header = opts.header;
      var payload = opts.payload;
      var secretOrKey = opts.secret || opts.privateKey;
      var encoding = opts.encoding;
      var algo = jwa(header.alg);
      var securedInput = jwsSecuredInput(header, payload, encoding);
      var signature = algo.sign(securedInput, secretOrKey);
      return util2.format("%s.%s", securedInput, signature);
    }
    function SignStream(opts) {
      var secret = opts.secret;
      secret = secret == null ? opts.privateKey : secret;
      secret = secret == null ? opts.key : secret;
      if (/^hs/i.test(opts.header.alg) === true && secret == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secret);
      this.readable = true;
      this.header = opts.header;
      this.encoding = opts.encoding;
      this.secret = this.privateKey = this.key = secretStream;
      this.payload = new DataStream(opts.payload);
      this.secret.once("close", function() {
        if (!this.payload.writable && this.readable)
          this.sign();
      }.bind(this));
      this.payload.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.sign();
      }.bind(this));
    }
    util2.inherits(SignStream, Stream);
    SignStream.prototype.sign = function sign() {
      try {
        var signature = jwsSign({
          header: this.header,
          payload: this.payload.buffer,
          secret: this.secret.buffer,
          encoding: this.encoding
        });
        this.emit("done", signature);
        this.emit("data", signature);
        this.emit("end");
        this.readable = false;
        return signature;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    SignStream.sign = jwsSign;
    module.exports = SignStream;
  }
});

// node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/verify-stream.js
var require_verify_stream = __commonJS({
  "node_modules/.pnpm/jws@4.0.1/node_modules/jws/lib/verify-stream.js"(exports, module) {
    var Buffer2 = require_safe_buffer().Buffer;
    var DataStream = require_data_stream();
    var jwa = require_jwa();
    var Stream = __require("stream");
    var toString = require_tostring();
    var util2 = __require("util");
    var JWS_REGEX = /^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/;
    function isObject(thing) {
      return Object.prototype.toString.call(thing) === "[object Object]";
    }
    function safeJsonParse(thing) {
      if (isObject(thing))
        return thing;
      try {
        return JSON.parse(thing);
      } catch (e) {
        return void 0;
      }
    }
    function headerFromJWS(jwsSig) {
      var encodedHeader = jwsSig.split(".", 1)[0];
      return safeJsonParse(Buffer2.from(encodedHeader, "base64").toString("binary"));
    }
    function securedInputFromJWS(jwsSig) {
      return jwsSig.split(".", 2).join(".");
    }
    function signatureFromJWS(jwsSig) {
      return jwsSig.split(".")[2];
    }
    function payloadFromJWS(jwsSig, encoding) {
      encoding = encoding || "utf8";
      var payload = jwsSig.split(".")[1];
      return Buffer2.from(payload, "base64").toString(encoding);
    }
    function isValidJws(string) {
      return JWS_REGEX.test(string) && !!headerFromJWS(string);
    }
    function jwsVerify(jwsSig, algorithm, secretOrKey) {
      if (!algorithm) {
        var err = new Error("Missing algorithm parameter for jws.verify");
        err.code = "MISSING_ALGORITHM";
        throw err;
      }
      jwsSig = toString(jwsSig);
      var signature = signatureFromJWS(jwsSig);
      var securedInput = securedInputFromJWS(jwsSig);
      var algo = jwa(algorithm);
      return algo.verify(securedInput, signature, secretOrKey);
    }
    function jwsDecode(jwsSig, opts) {
      opts = opts || {};
      jwsSig = toString(jwsSig);
      if (!isValidJws(jwsSig))
        return null;
      var header = headerFromJWS(jwsSig);
      if (!header)
        return null;
      var payload = payloadFromJWS(jwsSig);
      if (header.typ === "JWT" || opts.json)
        payload = JSON.parse(payload, opts.encoding);
      return {
        header,
        payload,
        signature: signatureFromJWS(jwsSig)
      };
    }
    function VerifyStream(opts) {
      opts = opts || {};
      var secretOrKey = opts.secret;
      secretOrKey = secretOrKey == null ? opts.publicKey : secretOrKey;
      secretOrKey = secretOrKey == null ? opts.key : secretOrKey;
      if (/^hs/i.test(opts.algorithm) === true && secretOrKey == null) {
        throw new TypeError("secret must be a string or buffer or a KeyObject");
      }
      var secretStream = new DataStream(secretOrKey);
      this.readable = true;
      this.algorithm = opts.algorithm;
      this.encoding = opts.encoding;
      this.secret = this.publicKey = this.key = secretStream;
      this.signature = new DataStream(opts.signature);
      this.secret.once("close", function() {
        if (!this.signature.writable && this.readable)
          this.verify();
      }.bind(this));
      this.signature.once("close", function() {
        if (!this.secret.writable && this.readable)
          this.verify();
      }.bind(this));
    }
    util2.inherits(VerifyStream, Stream);
    VerifyStream.prototype.verify = function verify() {
      try {
        var valid = jwsVerify(this.signature.buffer, this.algorithm, this.key.buffer);
        var obj = jwsDecode(this.signature.buffer, this.encoding);
        this.emit("done", valid, obj);
        this.emit("data", valid);
        this.emit("end");
        this.readable = false;
        return valid;
      } catch (e) {
        this.readable = false;
        this.emit("error", e);
        this.emit("close");
      }
    };
    VerifyStream.decode = jwsDecode;
    VerifyStream.isValid = isValidJws;
    VerifyStream.verify = jwsVerify;
    module.exports = VerifyStream;
  }
});

// node_modules/.pnpm/jws@4.0.1/node_modules/jws/index.js
var require_jws = __commonJS({
  "node_modules/.pnpm/jws@4.0.1/node_modules/jws/index.js"(exports) {
    var SignStream = require_sign_stream();
    var VerifyStream = require_verify_stream();
    var ALGORITHMS = [
      "HS256",
      "HS384",
      "HS512",
      "RS256",
      "RS384",
      "RS512",
      "PS256",
      "PS384",
      "PS512",
      "ES256",
      "ES384",
      "ES512"
    ];
    exports.ALGORITHMS = ALGORITHMS;
    exports.sign = SignStream.sign;
    exports.verify = VerifyStream.verify;
    exports.decode = VerifyStream.decode;
    exports.isValid = VerifyStream.isValid;
    exports.createSign = function createSign(opts) {
      return new SignStream(opts);
    };
    exports.createVerify = function createVerify(opts) {
      return new VerifyStream(opts);
    };
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/decode.js
var require_decode = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/decode.js"(exports, module) {
    var jws = require_jws();
    module.exports = function(jwt2, options) {
      options = options || {};
      var decoded = jws.decode(jwt2, options);
      if (!decoded) {
        return null;
      }
      var payload = decoded.payload;
      if (typeof payload === "string") {
        try {
          var obj = JSON.parse(payload);
          if (obj !== null && typeof obj === "object") {
            payload = obj;
          }
        } catch (e) {
        }
      }
      if (options.complete === true) {
        return {
          header: decoded.header,
          payload,
          signature: decoded.signature
        };
      }
      return payload;
    };
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/JsonWebTokenError.js
var require_JsonWebTokenError = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/JsonWebTokenError.js"(exports, module) {
    var JsonWebTokenError = function(message, error) {
      Error.call(this, message);
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
      this.name = "JsonWebTokenError";
      this.message = message;
      if (error) this.inner = error;
    };
    JsonWebTokenError.prototype = Object.create(Error.prototype);
    JsonWebTokenError.prototype.constructor = JsonWebTokenError;
    module.exports = JsonWebTokenError;
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/NotBeforeError.js
var require_NotBeforeError = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/NotBeforeError.js"(exports, module) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = function(message, date) {
      JsonWebTokenError.call(this, message);
      this.name = "NotBeforeError";
      this.date = date;
    };
    NotBeforeError.prototype = Object.create(JsonWebTokenError.prototype);
    NotBeforeError.prototype.constructor = NotBeforeError;
    module.exports = NotBeforeError;
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/TokenExpiredError.js
var require_TokenExpiredError = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/TokenExpiredError.js"(exports, module) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var TokenExpiredError = function(message, expiredAt) {
      JsonWebTokenError.call(this, message);
      this.name = "TokenExpiredError";
      this.expiredAt = expiredAt;
    };
    TokenExpiredError.prototype = Object.create(JsonWebTokenError.prototype);
    TokenExpiredError.prototype.constructor = TokenExpiredError;
    module.exports = TokenExpiredError;
  }
});

// node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js
var require_ms = __commonJS({
  "node_modules/.pnpm/ms@2.1.3/node_modules/ms/index.js"(exports, module) {
    var s = 1e3;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse2(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error(
        "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
      );
    };
    function parse2(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match2 = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        str
      );
      if (!match2) {
        return;
      }
      var n = parseFloat(match2[1]);
      var type = (match2[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return void 0;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/timespan.js
var require_timespan = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/timespan.js"(exports, module) {
    var ms = require_ms();
    module.exports = function(time2, iat) {
      var timestamp = iat || Math.floor(Date.now() / 1e3);
      if (typeof time2 === "string") {
        var milliseconds = ms(time2);
        if (typeof milliseconds === "undefined") {
          return;
        }
        return Math.floor(timestamp + milliseconds / 1e3);
      } else if (typeof time2 === "number") {
        return timestamp + time2;
      } else {
        return;
      }
    };
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/constants.js
var require_constants = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/constants.js"(exports, module) {
    "use strict";
    var SEMVER_SPEC_VERSION = "2.0.0";
    var MAX_LENGTH = 256;
    var MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
    9007199254740991;
    var MAX_SAFE_COMPONENT_LENGTH = 16;
    var MAX_SAFE_BUILD_LENGTH = MAX_LENGTH - 6;
    var RELEASE_TYPES = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease"
    ];
    module.exports = {
      MAX_LENGTH,
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_SAFE_INTEGER,
      RELEASE_TYPES,
      SEMVER_SPEC_VERSION,
      FLAG_INCLUDE_PRERELEASE: 1,
      FLAG_LOOSE: 2
    };
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/debug.js
var require_debug = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/debug.js"(exports, module) {
    "use strict";
    var debug = typeof process === "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
    };
    module.exports = debug;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/re.js
var require_re = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/re.js"(exports, module) {
    "use strict";
    var {
      MAX_SAFE_COMPONENT_LENGTH,
      MAX_SAFE_BUILD_LENGTH,
      MAX_LENGTH
    } = require_constants();
    var debug = require_debug();
    exports = module.exports = {};
    var re = exports.re = [];
    var safeRe = exports.safeRe = [];
    var src = exports.src = [];
    var safeSrc = exports.safeSrc = [];
    var t = exports.t = {};
    var R = 0;
    var LETTERDASHNUMBER = "[a-zA-Z0-9-]";
    var safeRegexReplacements = [
      ["\\s", 1],
      ["\\d", MAX_LENGTH],
      [LETTERDASHNUMBER, MAX_SAFE_BUILD_LENGTH]
    ];
    var makeSafeRegex = (value) => {
      for (const [token, max] of safeRegexReplacements) {
        value = value.split(`${token}*`).join(`${token}{0,${max}}`).split(`${token}+`).join(`${token}{1,${max}}`);
      }
      return value;
    };
    var createToken = (name, value, isGlobal) => {
      const safe = makeSafeRegex(value);
      const index = R++;
      debug(name, index, value);
      t[name] = index;
      src[index] = value;
      safeSrc[index] = safe;
      re[index] = new RegExp(value, isGlobal ? "g" : void 0);
      safeRe[index] = new RegExp(safe, isGlobal ? "g" : void 0);
    };
    createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
    createToken("NUMERICIDENTIFIERLOOSE", "\\d+");
    createToken("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${LETTERDASHNUMBER}*`);
    createToken("MAINVERSION", `(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})\\.(${src[t.NUMERICIDENTIFIER]})`);
    createToken("MAINVERSIONLOOSE", `(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})\\.(${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASEIDENTIFIER", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIER]})`);
    createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t.NONNUMERICIDENTIFIER]}|${src[t.NUMERICIDENTIFIERLOOSE]})`);
    createToken("PRERELEASE", `(?:-(${src[t.PRERELEASEIDENTIFIER]}(?:\\.${src[t.PRERELEASEIDENTIFIER]})*))`);
    createToken("PRERELEASELOOSE", `(?:-?(${src[t.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t.PRERELEASEIDENTIFIERLOOSE]})*))`);
    createToken("BUILDIDENTIFIER", `${LETTERDASHNUMBER}+`);
    createToken("BUILD", `(?:\\+(${src[t.BUILDIDENTIFIER]}(?:\\.${src[t.BUILDIDENTIFIER]})*))`);
    createToken("FULLPLAIN", `v?${src[t.MAINVERSION]}${src[t.PRERELEASE]}?${src[t.BUILD]}?`);
    createToken("FULL", `^${src[t.FULLPLAIN]}$`);
    createToken("LOOSEPLAIN", `[v=\\s]*${src[t.MAINVERSIONLOOSE]}${src[t.PRERELEASELOOSE]}?${src[t.BUILD]}?`);
    createToken("LOOSE", `^${src[t.LOOSEPLAIN]}$`);
    createToken("GTLT", "((?:<|>)?=?)");
    createToken("XRANGEIDENTIFIERLOOSE", `${src[t.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
    createToken("XRANGEIDENTIFIER", `${src[t.NUMERICIDENTIFIER]}|x|X|\\*`);
    createToken("XRANGEPLAIN", `[v=\\s]*(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:\\.(${src[t.XRANGEIDENTIFIER]})(?:${src[t.PRERELEASE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t.XRANGEIDENTIFIERLOOSE]})(?:${src[t.PRERELEASELOOSE]})?${src[t.BUILD]}?)?)?`);
    createToken("XRANGE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAIN]}$`);
    createToken("XRANGELOOSE", `^${src[t.GTLT]}\\s*${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COERCEPLAIN", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH}}))?`);
    createToken("COERCE", `${src[t.COERCEPLAIN]}(?:$|[^\\d])`);
    createToken("COERCEFULL", src[t.COERCEPLAIN] + `(?:${src[t.PRERELEASE]})?(?:${src[t.BUILD]})?(?:$|[^\\d])`);
    createToken("COERCERTL", src[t.COERCE], true);
    createToken("COERCERTLFULL", src[t.COERCEFULL], true);
    createToken("LONETILDE", "(?:~>?)");
    createToken("TILDETRIM", `(\\s*)${src[t.LONETILDE]}\\s+`, true);
    exports.tildeTrimReplace = "$1~";
    createToken("TILDE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAIN]}$`);
    createToken("TILDELOOSE", `^${src[t.LONETILDE]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("LONECARET", "(?:\\^)");
    createToken("CARETTRIM", `(\\s*)${src[t.LONECARET]}\\s+`, true);
    exports.caretTrimReplace = "$1^";
    createToken("CARET", `^${src[t.LONECARET]}${src[t.XRANGEPLAIN]}$`);
    createToken("CARETLOOSE", `^${src[t.LONECARET]}${src[t.XRANGEPLAINLOOSE]}$`);
    createToken("COMPARATORLOOSE", `^${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]})$|^$`);
    createToken("COMPARATOR", `^${src[t.GTLT]}\\s*(${src[t.FULLPLAIN]})$|^$`);
    createToken("COMPARATORTRIM", `(\\s*)${src[t.GTLT]}\\s*(${src[t.LOOSEPLAIN]}|${src[t.XRANGEPLAIN]})`, true);
    exports.comparatorTrimReplace = "$1$2$3";
    createToken("HYPHENRANGE", `^\\s*(${src[t.XRANGEPLAIN]})\\s+-\\s+(${src[t.XRANGEPLAIN]})\\s*$`);
    createToken("HYPHENRANGELOOSE", `^\\s*(${src[t.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t.XRANGEPLAINLOOSE]})\\s*$`);
    createToken("STAR", "(<|>)?=?\\s*\\*");
    createToken("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
    createToken("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/parse-options.js
var require_parse_options = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/parse-options.js"(exports, module) {
    "use strict";
    var looseOption = Object.freeze({ loose: true });
    var emptyOpts = Object.freeze({});
    var parseOptions = (options) => {
      if (!options) {
        return emptyOpts;
      }
      if (typeof options !== "object") {
        return looseOption;
      }
      return options;
    };
    module.exports = parseOptions;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/identifiers.js
var require_identifiers = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/identifiers.js"(exports, module) {
    "use strict";
    var numeric = /^[0-9]+$/;
    var compareIdentifiers = (a, b) => {
      if (typeof a === "number" && typeof b === "number") {
        return a === b ? 0 : a < b ? -1 : 1;
      }
      const anum = numeric.test(a);
      const bnum = numeric.test(b);
      if (anum && bnum) {
        a = +a;
        b = +b;
      }
      return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
    };
    var rcompareIdentifiers = (a, b) => compareIdentifiers(b, a);
    module.exports = {
      compareIdentifiers,
      rcompareIdentifiers
    };
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/semver.js
var require_semver = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/semver.js"(exports, module) {
    "use strict";
    var debug = require_debug();
    var { MAX_LENGTH, MAX_SAFE_INTEGER } = require_constants();
    var { safeRe: re, t } = require_re();
    var parseOptions = require_parse_options();
    var { compareIdentifiers } = require_identifiers();
    var isPrereleaseIdentifier = (prerelease, identifier) => {
      const identifiers = identifier.split(".");
      if (identifiers.length > prerelease.length) {
        return false;
      }
      for (let i = 0; i < identifiers.length; i++) {
        if (compareIdentifiers(prerelease[i], identifiers[i]) !== 0) {
          return false;
        }
      }
      return true;
    };
    var SemVer = class _SemVer {
      constructor(version, options) {
        options = parseOptions(options);
        if (version instanceof _SemVer) {
          if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
            return version;
          } else {
            version = version.version;
          }
        } else if (typeof version !== "string") {
          throw new TypeError(`Invalid version. Must be a string. Got type "${typeof version}".`);
        }
        if (version.length > MAX_LENGTH) {
          throw new TypeError(
            `version is longer than ${MAX_LENGTH} characters`
          );
        }
        debug("SemVer", version, options);
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        const m = version.trim().match(options.loose ? re[t.LOOSE] : re[t.FULL]);
        if (!m) {
          throw new TypeError(`Invalid Version: ${version}`);
        }
        this.raw = version;
        this.major = +m[1];
        this.minor = +m[2];
        this.patch = +m[3];
        if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
          throw new TypeError("Invalid major version");
        }
        if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
          throw new TypeError("Invalid minor version");
        }
        if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
          throw new TypeError("Invalid patch version");
        }
        if (!m[4]) {
          this.prerelease = [];
        } else {
          this.prerelease = m[4].split(".").map((id) => {
            if (/^[0-9]+$/.test(id)) {
              const num = +id;
              if (num >= 0 && num < MAX_SAFE_INTEGER) {
                return num;
              }
            }
            return id;
          });
        }
        this.build = m[5] ? m[5].split(".") : [];
        this.format();
      }
      format() {
        this.version = `${this.major}.${this.minor}.${this.patch}`;
        if (this.prerelease.length) {
          this.version += `-${this.prerelease.join(".")}`;
        }
        return this.version;
      }
      toString() {
        return this.version;
      }
      compare(other) {
        debug("SemVer.compare", this.version, this.options, other);
        if (!(other instanceof _SemVer)) {
          if (typeof other === "string" && other === this.version) {
            return 0;
          }
          other = new _SemVer(other, this.options);
        }
        if (other.version === this.version) {
          return 0;
        }
        return this.compareMain(other) || this.comparePre(other);
      }
      compareMain(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.major < other.major) {
          return -1;
        }
        if (this.major > other.major) {
          return 1;
        }
        if (this.minor < other.minor) {
          return -1;
        }
        if (this.minor > other.minor) {
          return 1;
        }
        if (this.patch < other.patch) {
          return -1;
        }
        if (this.patch > other.patch) {
          return 1;
        }
        return 0;
      }
      comparePre(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        if (this.prerelease.length && !other.prerelease.length) {
          return -1;
        } else if (!this.prerelease.length && other.prerelease.length) {
          return 1;
        } else if (!this.prerelease.length && !other.prerelease.length) {
          return 0;
        }
        let i = 0;
        do {
          const a = this.prerelease[i];
          const b = other.prerelease[i];
          debug("prerelease compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      compareBuild(other) {
        if (!(other instanceof _SemVer)) {
          other = new _SemVer(other, this.options);
        }
        let i = 0;
        do {
          const a = this.build[i];
          const b = other.build[i];
          debug("build compare", i, a, b);
          if (a === void 0 && b === void 0) {
            return 0;
          } else if (b === void 0) {
            return 1;
          } else if (a === void 0) {
            return -1;
          } else if (a === b) {
            continue;
          } else {
            return compareIdentifiers(a, b);
          }
        } while (++i);
      }
      // preminor will bump the version up to the next minor release, and immediately
      // down to pre-release. premajor and prepatch work the same way.
      inc(release, identifier, identifierBase) {
        if (release.startsWith("pre")) {
          if (!identifier && identifierBase === false) {
            throw new Error("invalid increment argument: identifier is empty");
          }
          if (identifier) {
            const match2 = `-${identifier}`.match(this.options.loose ? re[t.PRERELEASELOOSE] : re[t.PRERELEASE]);
            if (!match2 || match2[1] !== identifier) {
              throw new Error(`invalid identifier: ${identifier}`);
            }
          }
        }
        switch (release) {
          case "premajor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor = 0;
            this.major++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "preminor":
            this.prerelease.length = 0;
            this.patch = 0;
            this.minor++;
            this.inc("pre", identifier, identifierBase);
            break;
          case "prepatch":
            this.prerelease.length = 0;
            this.inc("patch", identifier, identifierBase);
            this.inc("pre", identifier, identifierBase);
            break;
          // If the input is a non-prerelease version, this acts the same as
          // prepatch.
          case "prerelease":
            if (this.prerelease.length === 0) {
              this.inc("patch", identifier, identifierBase);
            }
            this.inc("pre", identifier, identifierBase);
            break;
          case "release":
            if (this.prerelease.length === 0) {
              throw new Error(`version ${this.raw} is not a prerelease`);
            }
            this.prerelease.length = 0;
            break;
          case "major":
            if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
              this.major++;
            }
            this.minor = 0;
            this.patch = 0;
            this.prerelease = [];
            break;
          case "minor":
            if (this.patch !== 0 || this.prerelease.length === 0) {
              this.minor++;
            }
            this.patch = 0;
            this.prerelease = [];
            break;
          case "patch":
            if (this.prerelease.length === 0) {
              this.patch++;
            }
            this.prerelease = [];
            break;
          // This probably shouldn't be used publicly.
          // 1.0.0 'pre' would become 1.0.0-0 which is the wrong direction.
          case "pre": {
            const base = Number(identifierBase) ? 1 : 0;
            if (this.prerelease.length === 0) {
              this.prerelease = [base];
            } else {
              let i = this.prerelease.length;
              while (--i >= 0) {
                if (typeof this.prerelease[i] === "number") {
                  this.prerelease[i]++;
                  i = -2;
                }
              }
              if (i === -1) {
                if (identifier === this.prerelease.join(".") && identifierBase === false) {
                  throw new Error("invalid increment argument: identifier already exists");
                }
                this.prerelease.push(base);
              }
            }
            if (identifier) {
              let prerelease = [identifier, base];
              if (identifierBase === false) {
                prerelease = [identifier];
              }
              if (isPrereleaseIdentifier(this.prerelease, identifier)) {
                const prereleaseBase = this.prerelease[identifier.split(".").length];
                if (isNaN(prereleaseBase)) {
                  this.prerelease = prerelease;
                }
              } else {
                this.prerelease = prerelease;
              }
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${release}`);
        }
        this.raw = this.format();
        if (this.build.length) {
          this.raw += `+${this.build.join(".")}`;
        }
        return this;
      }
    };
    module.exports = SemVer;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/parse.js
var require_parse = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/parse.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var parse2 = (version, options, throwErrors = false) => {
      if (version instanceof SemVer) {
        return version;
      }
      try {
        return new SemVer(version, options);
      } catch (er) {
        if (!throwErrors) {
          return null;
        }
        throw er;
      }
    };
    module.exports = parse2;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/valid.js
var require_valid = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/valid.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var valid = (version, options) => {
      const v = parse2(version, options);
      return v ? v.version : null;
    };
    module.exports = valid;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/clean.js
var require_clean = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/clean.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var clean = (version, options) => {
      const s = parse2(version.trim().replace(/^[=v]+/, ""), options);
      return s ? s.version : null;
    };
    module.exports = clean;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/inc.js
var require_inc = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/inc.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var inc = (version, release, options, identifier, identifierBase) => {
      if (typeof options === "string") {
        identifierBase = identifier;
        identifier = options;
        options = void 0;
      }
      try {
        return new SemVer(
          version instanceof SemVer ? version.version : version,
          options
        ).inc(release, identifier, identifierBase).version;
      } catch (er) {
        return null;
      }
    };
    module.exports = inc;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/diff.js
var require_diff = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/diff.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var diff = (version1, version2) => {
      const v1 = parse2(version1, null, true);
      const v2 = parse2(version2, null, true);
      const comparison = v1.compare(v2);
      if (comparison === 0) {
        return null;
      }
      const v1Higher = comparison > 0;
      const highVersion = v1Higher ? v1 : v2;
      const lowVersion = v1Higher ? v2 : v1;
      const highHasPre = !!highVersion.prerelease.length;
      const lowHasPre = !!lowVersion.prerelease.length;
      if (lowHasPre && !highHasPre) {
        if (!lowVersion.patch && !lowVersion.minor) {
          return "major";
        }
        if (lowVersion.compareMain(highVersion) === 0) {
          if (lowVersion.minor && !lowVersion.patch) {
            return "minor";
          }
          return "patch";
        }
      }
      const prefix = highHasPre ? "pre" : "";
      if (v1.major !== v2.major) {
        return prefix + "major";
      }
      if (v1.minor !== v2.minor) {
        return prefix + "minor";
      }
      if (v1.patch !== v2.patch) {
        return prefix + "patch";
      }
      return "prerelease";
    };
    module.exports = diff;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/major.js
var require_major = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/major.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var major = (a, loose) => new SemVer(a, loose).major;
    module.exports = major;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/minor.js
var require_minor = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/minor.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var minor = (a, loose) => new SemVer(a, loose).minor;
    module.exports = minor;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/patch.js
var require_patch = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/patch.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var patch = (a, loose) => new SemVer(a, loose).patch;
    module.exports = patch;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/prerelease.js
var require_prerelease = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/prerelease.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var prerelease = (version, options) => {
      const parsed = parse2(version, options);
      return parsed && parsed.prerelease.length ? parsed.prerelease : null;
    };
    module.exports = prerelease;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare.js
var require_compare = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var compare = (a, b, loose) => new SemVer(a, loose).compare(new SemVer(b, loose));
    module.exports = compare;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/rcompare.js
var require_rcompare = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/rcompare.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var rcompare = (a, b, loose) => compare(b, a, loose);
    module.exports = rcompare;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare-loose.js
var require_compare_loose = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare-loose.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var compareLoose = (a, b) => compare(a, b, true);
    module.exports = compareLoose;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare-build.js
var require_compare_build = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/compare-build.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var compareBuild = (a, b, loose) => {
      const versionA = new SemVer(a, loose);
      const versionB = new SemVer(b, loose);
      return versionA.compare(versionB) || versionA.compareBuild(versionB);
    };
    module.exports = compareBuild;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/sort.js
var require_sort = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/sort.js"(exports, module) {
    "use strict";
    var compareBuild = require_compare_build();
    var sort = (list, loose) => list.sort((a, b) => compareBuild(a, b, loose));
    module.exports = sort;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/rsort.js
var require_rsort = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/rsort.js"(exports, module) {
    "use strict";
    var compareBuild = require_compare_build();
    var rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
    module.exports = rsort;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/gt.js
var require_gt = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/gt.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var gt = (a, b, loose) => compare(a, b, loose) > 0;
    module.exports = gt;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/lt.js
var require_lt = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/lt.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var lt = (a, b, loose) => compare(a, b, loose) < 0;
    module.exports = lt;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/eq.js
var require_eq = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/eq.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var eq = (a, b, loose) => compare(a, b, loose) === 0;
    module.exports = eq;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/neq.js
var require_neq = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/neq.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var neq = (a, b, loose) => compare(a, b, loose) !== 0;
    module.exports = neq;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/gte.js
var require_gte = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/gte.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var gte = (a, b, loose) => compare(a, b, loose) >= 0;
    module.exports = gte;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/lte.js
var require_lte = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/lte.js"(exports, module) {
    "use strict";
    var compare = require_compare();
    var lte = (a, b, loose) => compare(a, b, loose) <= 0;
    module.exports = lte;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/cmp.js
var require_cmp = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/cmp.js"(exports, module) {
    "use strict";
    var eq = require_eq();
    var neq = require_neq();
    var gt = require_gt();
    var gte = require_gte();
    var lt = require_lt();
    var lte = require_lte();
    var cmp = (a, op, b, loose) => {
      switch (op) {
        case "===":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a === b;
        case "!==":
          if (typeof a === "object") {
            a = a.version;
          }
          if (typeof b === "object") {
            b = b.version;
          }
          return a !== b;
        case "":
        case "=":
        case "==":
          return eq(a, b, loose);
        case "!=":
          return neq(a, b, loose);
        case ">":
          return gt(a, b, loose);
        case ">=":
          return gte(a, b, loose);
        case "<":
          return lt(a, b, loose);
        case "<=":
          return lte(a, b, loose);
        default:
          throw new TypeError(`Invalid operator: ${op}`);
      }
    };
    module.exports = cmp;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/coerce.js
var require_coerce = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/coerce.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var parse2 = require_parse();
    var { safeRe: re, t } = require_re();
    var coerce2 = (version, options) => {
      if (version instanceof SemVer) {
        return version;
      }
      if (typeof version === "number") {
        version = String(version);
      }
      if (typeof version !== "string") {
        return null;
      }
      options = options || {};
      let match2 = null;
      if (!options.rtl) {
        match2 = version.match(options.includePrerelease ? re[t.COERCEFULL] : re[t.COERCE]);
      } else {
        const coerceRtlRegex = options.includePrerelease ? re[t.COERCERTLFULL] : re[t.COERCERTL];
        let next2;
        while ((next2 = coerceRtlRegex.exec(version)) && (!match2 || match2.index + match2[0].length !== version.length)) {
          if (!match2 || next2.index + next2[0].length !== match2.index + match2[0].length) {
            match2 = next2;
          }
          coerceRtlRegex.lastIndex = next2.index + next2[1].length + next2[2].length;
        }
        coerceRtlRegex.lastIndex = -1;
      }
      if (match2 === null) {
        return null;
      }
      const major = match2[2];
      const minor = match2[3] || "0";
      const patch = match2[4] || "0";
      const prerelease = options.includePrerelease && match2[5] ? `-${match2[5]}` : "";
      const build = options.includePrerelease && match2[6] ? `+${match2[6]}` : "";
      return parse2(`${major}.${minor}.${patch}${prerelease}${build}`, options);
    };
    module.exports = coerce2;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/truncate.js
var require_truncate = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/truncate.js"(exports, module) {
    "use strict";
    var parse2 = require_parse();
    var constants = require_constants();
    var SemVer = require_semver();
    var truncate = (version, truncation, options) => {
      if (!constants.RELEASE_TYPES.includes(truncation)) {
        return null;
      }
      const clonedVersion = cloneInputVersion(version, options);
      return clonedVersion && doTruncation(clonedVersion, truncation);
    };
    var cloneInputVersion = (version, options) => {
      const versionStringToParse = version instanceof SemVer ? version.version : version;
      return parse2(versionStringToParse, options);
    };
    var doTruncation = (version, truncation) => {
      if (isPrerelease(truncation)) {
        return version.version;
      }
      version.prerelease = [];
      switch (truncation) {
        case "major":
          version.minor = 0;
          version.patch = 0;
          break;
        case "minor":
          version.patch = 0;
          break;
      }
      return version.format();
    };
    var isPrerelease = (type) => {
      return type.startsWith("pre");
    };
    module.exports = truncate;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/lrucache.js
var require_lrucache = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/internal/lrucache.js"(exports, module) {
    "use strict";
    var LRUCache = class {
      constructor() {
        this.max = 1e3;
        this.map = /* @__PURE__ */ new Map();
      }
      get(key) {
        const value = this.map.get(key);
        if (value === void 0) {
          return void 0;
        } else {
          this.map.delete(key);
          this.map.set(key, value);
          return value;
        }
      }
      delete(key) {
        return this.map.delete(key);
      }
      set(key, value) {
        const deleted = this.delete(key);
        if (!deleted && value !== void 0) {
          if (this.map.size >= this.max) {
            const firstKey = this.map.keys().next().value;
            this.delete(firstKey);
          }
          this.map.set(key, value);
        }
        return this;
      }
    };
    module.exports = LRUCache;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/range.js
var require_range = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/range.js"(exports, module) {
    "use strict";
    var SPACE_CHARACTERS = /\s+/g;
    var Range = class _Range {
      constructor(range, options) {
        options = parseOptions(options);
        if (range instanceof _Range) {
          if (range.loose === !!options.loose && range.includePrerelease === !!options.includePrerelease) {
            return range;
          } else {
            return new _Range(range.raw, options);
          }
        }
        if (range instanceof Comparator) {
          this.raw = range.value;
          this.set = [[range]];
          this.formatted = void 0;
          return this;
        }
        this.options = options;
        this.loose = !!options.loose;
        this.includePrerelease = !!options.includePrerelease;
        this.raw = range.trim().replace(SPACE_CHARACTERS, " ");
        this.set = this.raw.split("||").map((r) => this.parseRange(r.trim())).filter((c) => c.length);
        if (!this.set.length) {
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        }
        if (this.set.length > 1) {
          const first = this.set[0];
          this.set = this.set.filter((c) => !isNullSet(c[0]));
          if (this.set.length === 0) {
            this.set = [first];
          } else if (this.set.length > 1) {
            for (const c of this.set) {
              if (c.length === 1 && isAny(c[0])) {
                this.set = [c];
                break;
              }
            }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let i = 0; i < this.set.length; i++) {
            if (i > 0) {
              this.formatted += "||";
            }
            const comps = this.set[i];
            for (let k = 0; k < comps.length; k++) {
              if (k > 0) {
                this.formatted += " ";
              }
              this.formatted += comps[k].toString().trim();
            }
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(range) {
        range = range.replace(BUILDSTRIPRE, "");
        const memoOpts = (this.options.includePrerelease && FLAG_INCLUDE_PRERELEASE) | (this.options.loose && FLAG_LOOSE);
        const memoKey = memoOpts + ":" + range;
        const cached = cache.get(memoKey);
        if (cached) {
          return cached;
        }
        const loose = this.options.loose;
        const hr = loose ? re[t.HYPHENRANGELOOSE] : re[t.HYPHENRANGE];
        range = range.replace(hr, hyphenReplace(this.options.includePrerelease));
        debug("hyphen replace", range);
        range = range.replace(re[t.COMPARATORTRIM], comparatorTrimReplace);
        debug("comparator trim", range);
        range = range.replace(re[t.TILDETRIM], tildeTrimReplace);
        debug("tilde trim", range);
        range = range.replace(re[t.CARETTRIM], caretTrimReplace);
        debug("caret trim", range);
        let rangeList = range.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options));
        if (loose) {
          rangeList = rangeList.filter((comp) => {
            debug("loose invalid filter", comp, this.options);
            return !!comp.match(re[t.COMPARATORLOOSE]);
          });
        }
        debug("range list", rangeList);
        const rangeMap = /* @__PURE__ */ new Map();
        const comparators = rangeList.map((comp) => new Comparator(comp, this.options));
        for (const comp of comparators) {
          if (isNullSet(comp)) {
            return [comp];
          }
          rangeMap.set(comp.value, comp);
        }
        if (rangeMap.size > 1 && rangeMap.has("")) {
          rangeMap.delete("");
        }
        const result = [...rangeMap.values()];
        cache.set(memoKey, result);
        return result;
      }
      intersects(range, options) {
        if (!(range instanceof _Range)) {
          throw new TypeError("a Range is required");
        }
        return this.set.some((thisComparators) => {
          return isSatisfiable(thisComparators, options) && range.set.some((rangeComparators) => {
            return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
              return rangeComparators.every((rangeComparator) => {
                return thisComparator.intersects(rangeComparator, options);
              });
            });
          });
        });
      }
      // if ANY of the sets match ALL of its comparators, then pass
      test(version) {
        if (!version) {
          return false;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        for (let i = 0; i < this.set.length; i++) {
          if (testSet(this.set[i], version, this.options)) {
            return true;
          }
        }
        return false;
      }
    };
    module.exports = Range;
    var LRU = require_lrucache();
    var cache = new LRU();
    var parseOptions = require_parse_options();
    var Comparator = require_comparator();
    var debug = require_debug();
    var SemVer = require_semver();
    var {
      safeRe: re,
      src,
      t,
      comparatorTrimReplace,
      tildeTrimReplace,
      caretTrimReplace
    } = require_re();
    var { FLAG_INCLUDE_PRERELEASE, FLAG_LOOSE } = require_constants();
    var BUILDSTRIPRE = new RegExp(src[t.BUILD], "g");
    var isNullSet = (c) => c.value === "<0.0.0-0";
    var isAny = (c) => c.value === "";
    var isSatisfiable = (comparators, options) => {
      let result = true;
      const remainingComparators = comparators.slice();
      let testComparator = remainingComparators.pop();
      while (result && remainingComparators.length) {
        result = remainingComparators.every((otherComparator) => {
          return testComparator.intersects(otherComparator, options);
        });
        testComparator = remainingComparators.pop();
      }
      return result;
    };
    var parseComparator = (comp, options) => {
      comp = comp.replace(re[t.BUILD], "");
      debug("comp", comp, options);
      comp = replaceCarets(comp, options);
      debug("caret", comp);
      comp = replaceTildes(comp, options);
      debug("tildes", comp);
      comp = replaceXRanges(comp, options);
      debug("xrange", comp);
      comp = replaceStars(comp, options);
      debug("stars", comp);
      return comp;
    };
    var isX = (id) => !id || id.toLowerCase() === "x" || id === "*";
    var invalidXRangeOrder = (M, m, p) => isX(M) && !isX(m) || isX(m) && p && !isX(p);
    var replaceTildes = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceTilde(c, options)).join(" ");
    };
    var replaceTilde = (comp, options) => {
      const r = options.loose ? re[t.TILDELOOSE] : re[t.TILDE];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("tilde", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
        } else if (pr) {
          debug("replaceTilde pr", pr);
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        } else {
          ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
        }
        debug("tilde return", ret);
        return ret;
      });
    };
    var replaceCarets = (comp, options) => {
      return comp.trim().split(/\s+/).map((c) => replaceCaret(c, options)).join(" ");
    };
    var replaceCaret = (comp, options) => {
      debug("caret", comp, options);
      const r = options.loose ? re[t.CARETLOOSE] : re[t.CARET];
      const z = options.includePrerelease ? "-0" : "";
      return comp.replace(r, (_, M, m, p, pr) => {
        debug("caret", comp, _, M, m, p, pr);
        let ret;
        if (isX(M)) {
          ret = "";
        } else if (isX(m)) {
          ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
        } else if (isX(p)) {
          if (M === "0") {
            ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
          } else {
            ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
          }
        } else if (pr) {
          debug("replaceCaret pr", pr);
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
          }
        } else {
          debug("no pr");
          if (M === "0") {
            if (m === "0") {
              ret = `>=${M}.${m}.${p} <${M}.${m}.${+p + 1}-0`;
            } else {
              ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
            }
          } else {
            ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
          }
        }
        debug("caret return", ret);
        return ret;
      });
    };
    var replaceXRanges = (comp, options) => {
      debug("replaceXRanges", comp, options);
      return comp.split(/\s+/).map((c) => replaceXRange(c, options)).join(" ");
    };
    var replaceXRange = (comp, options) => {
      comp = comp.trim();
      const r = options.loose ? re[t.XRANGELOOSE] : re[t.XRANGE];
      return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
        debug("xRange", comp, ret, gtlt, M, m, p, pr);
        if (invalidXRangeOrder(M, m, p)) {
          return comp;
        }
        const xM = isX(M);
        const xm = xM || isX(m);
        const xp = xm || isX(p);
        const anyX = xp;
        if (gtlt === "=" && anyX) {
          gtlt = "";
        }
        pr = options.includePrerelease ? "-0" : "";
        if (xM) {
          if (gtlt === ">" || gtlt === "<") {
            ret = "<0.0.0-0";
          } else {
            ret = "*";
          }
        } else if (gtlt && anyX) {
          if (xm) {
            m = 0;
          }
          p = 0;
          if (gtlt === ">") {
            gtlt = ">=";
            if (xm) {
              M = +M + 1;
              m = 0;
              p = 0;
            } else {
              m = +m + 1;
              p = 0;
            }
          } else if (gtlt === "<=") {
            gtlt = "<";
            if (xm) {
              M = +M + 1;
            } else {
              m = +m + 1;
            }
          }
          if (gtlt === "<") {
            pr = "-0";
          }
          ret = `${gtlt + M}.${m}.${p}${pr}`;
        } else if (xm) {
          ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
        } else if (xp) {
          ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
        }
        debug("xRange return", ret);
        return ret;
      });
    };
    var replaceStars = (comp, options) => {
      debug("replaceStars", comp, options);
      return comp.trim().replace(re[t.STAR], "");
    };
    var replaceGTE0 = (comp, options) => {
      debug("replaceGTE0", comp, options);
      return comp.trim().replace(re[options.includePrerelease ? t.GTE0PRE : t.GTE0], "");
    };
    var hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr) => {
      if (isX(fM)) {
        from = "";
      } else if (isX(fm)) {
        from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
      } else if (isX(fp)) {
        from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
      } else if (fpr) {
        from = `>=${from}`;
      } else {
        from = `>=${from}${incPr ? "-0" : ""}`;
      }
      if (isX(tM)) {
        to = "";
      } else if (isX(tm)) {
        to = `<${+tM + 1}.0.0-0`;
      } else if (isX(tp)) {
        to = `<${tM}.${+tm + 1}.0-0`;
      } else if (tpr) {
        to = `<=${tM}.${tm}.${tp}-${tpr}`;
      } else if (incPr) {
        to = `<${tM}.${tm}.${+tp + 1}-0`;
      } else {
        to = `<=${to}`;
      }
      return `${from} ${to}`.trim();
    };
    var testSet = (set, version, options) => {
      for (let i = 0; i < set.length; i++) {
        if (!set[i].test(version)) {
          return false;
        }
      }
      if (version.prerelease.length && !options.includePrerelease) {
        for (let i = 0; i < set.length; i++) {
          debug(set[i].semver);
          if (set[i].semver === Comparator.ANY) {
            continue;
          }
          if (set[i].semver.prerelease.length > 0) {
            const allowed = set[i].semver;
            if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
              return true;
            }
          }
        }
        return false;
      }
      return true;
    };
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/comparator.js
var require_comparator = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/classes/comparator.js"(exports, module) {
    "use strict";
    var ANY = Symbol("SemVer ANY");
    var Comparator = class _Comparator {
      static get ANY() {
        return ANY;
      }
      constructor(comp, options) {
        options = parseOptions(options);
        if (comp instanceof _Comparator) {
          if (comp.loose === !!options.loose) {
            return comp;
          } else {
            comp = comp.value;
          }
        }
        comp = comp.trim().split(/\s+/).join(" ");
        debug("comparator", comp, options);
        this.options = options;
        this.loose = !!options.loose;
        this.parse(comp);
        if (this.semver === ANY) {
          this.value = "";
        } else {
          this.value = this.operator + this.semver.version;
        }
        debug("comp", this);
      }
      parse(comp) {
        const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
        const m = comp.match(r);
        if (!m) {
          throw new TypeError(`Invalid comparator: ${comp}`);
        }
        this.operator = m[1] !== void 0 ? m[1] : "";
        if (this.operator === "=") {
          this.operator = "";
        }
        if (!m[2]) {
          this.semver = ANY;
        } else {
          this.semver = new SemVer(m[2], this.options.loose);
        }
      }
      toString() {
        return this.value;
      }
      test(version) {
        debug("Comparator.test", version, this.options.loose);
        if (this.semver === ANY || version === ANY) {
          return true;
        }
        if (typeof version === "string") {
          try {
            version = new SemVer(version, this.options);
          } catch (er) {
            return false;
          }
        }
        return cmp(version, this.operator, this.semver, this.options);
      }
      intersects(comp, options) {
        if (!(comp instanceof _Comparator)) {
          throw new TypeError("a Comparator is required");
        }
        if (this.operator === "") {
          if (this.value === "") {
            return true;
          }
          return new Range(comp.value, options).test(this.value);
        } else if (comp.operator === "") {
          if (comp.value === "") {
            return true;
          }
          return new Range(this.value, options).test(comp.semver);
        }
        options = parseOptions(options);
        if (options.includePrerelease && (this.value === "<0.0.0-0" || comp.value === "<0.0.0-0")) {
          return false;
        }
        if (!options.includePrerelease && (this.value.startsWith("<0.0.0") || comp.value.startsWith("<0.0.0"))) {
          return false;
        }
        if (this.operator.startsWith(">") && comp.operator.startsWith(">")) {
          return true;
        }
        if (this.operator.startsWith("<") && comp.operator.startsWith("<")) {
          return true;
        }
        if (this.semver.version === comp.semver.version && this.operator.includes("=") && comp.operator.includes("=")) {
          return true;
        }
        if (cmp(this.semver, "<", comp.semver, options) && this.operator.startsWith(">") && comp.operator.startsWith("<")) {
          return true;
        }
        if (cmp(this.semver, ">", comp.semver, options) && this.operator.startsWith("<") && comp.operator.startsWith(">")) {
          return true;
        }
        return false;
      }
    };
    module.exports = Comparator;
    var parseOptions = require_parse_options();
    var { safeRe: re, t } = require_re();
    var cmp = require_cmp();
    var debug = require_debug();
    var SemVer = require_semver();
    var Range = require_range();
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/satisfies.js
var require_satisfies = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/functions/satisfies.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var satisfies = (version, range, options) => {
      try {
        range = new Range(range, options);
      } catch (er) {
        return false;
      }
      return range.test(version);
    };
    module.exports = satisfies;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/to-comparators.js
var require_to_comparators = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/to-comparators.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var toComparators = (range, options) => new Range(range, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
    module.exports = toComparators;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/max-satisfying.js
var require_max_satisfying = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/max-satisfying.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var maxSatisfying = (versions, range, options) => {
      let max = null;
      let maxSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!max || maxSV.compare(v) === -1) {
            max = v;
            maxSV = new SemVer(max, options);
          }
        }
      });
      return max;
    };
    module.exports = maxSatisfying;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/min-satisfying.js
var require_min_satisfying = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/min-satisfying.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var minSatisfying = (versions, range, options) => {
      let min = null;
      let minSV = null;
      let rangeObj = null;
      try {
        rangeObj = new Range(range, options);
      } catch (er) {
        return null;
      }
      versions.forEach((v) => {
        if (rangeObj.test(v)) {
          if (!min || minSV.compare(v) === 1) {
            min = v;
            minSV = new SemVer(min, options);
          }
        }
      });
      return min;
    };
    module.exports = minSatisfying;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/min-version.js
var require_min_version = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/min-version.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Range = require_range();
    var gt = require_gt();
    var minVersion = (range, loose) => {
      range = new Range(range, loose);
      let minver = new SemVer("0.0.0");
      if (range.test(minver)) {
        return minver;
      }
      minver = new SemVer("0.0.0-0");
      if (range.test(minver)) {
        return minver;
      }
      minver = null;
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let setMin = null;
        comparators.forEach((comparator) => {
          const compver = new SemVer(comparator.semver.version);
          switch (comparator.operator) {
            case ">":
              if (compver.prerelease.length === 0) {
                compver.patch++;
              } else {
                compver.prerelease.push(0);
              }
              compver.raw = compver.format();
            /* fallthrough */
            case "":
            case ">=":
              if (!setMin || gt(compver, setMin)) {
                setMin = compver;
              }
              break;
            case "<":
            case "<=":
              break;
            /* istanbul ignore next */
            default:
              throw new Error(`Unexpected operation: ${comparator.operator}`);
          }
        });
        if (setMin && (!minver || gt(minver, setMin))) {
          minver = setMin;
        }
      }
      if (minver && range.test(minver)) {
        return minver;
      }
      return null;
    };
    module.exports = minVersion;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/valid.js
var require_valid2 = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/valid.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var validRange = (range, options) => {
      try {
        return new Range(range, options).range || "*";
      } catch (er) {
        return null;
      }
    };
    module.exports = validRange;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/outside.js
var require_outside = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/outside.js"(exports, module) {
    "use strict";
    var SemVer = require_semver();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var Range = require_range();
    var satisfies = require_satisfies();
    var gt = require_gt();
    var lt = require_lt();
    var lte = require_lte();
    var gte = require_gte();
    var outside = (version, range, hilo, options) => {
      version = new SemVer(version, options);
      range = new Range(range, options);
      let gtfn, ltefn, ltfn, comp, ecomp;
      switch (hilo) {
        case ">":
          gtfn = gt;
          ltefn = lte;
          ltfn = lt;
          comp = ">";
          ecomp = ">=";
          break;
        case "<":
          gtfn = lt;
          ltefn = gte;
          ltfn = gt;
          comp = "<";
          ecomp = "<=";
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (satisfies(version, range, options)) {
        return false;
      }
      for (let i = 0; i < range.set.length; ++i) {
        const comparators = range.set[i];
        let high = null;
        let low = null;
        comparators.forEach((comparator) => {
          if (comparator.semver === ANY) {
            comparator = new Comparator(">=0.0.0");
          }
          high = high || comparator;
          low = low || comparator;
          if (gtfn(comparator.semver, high.semver, options)) {
            high = comparator;
          } else if (ltfn(comparator.semver, low.semver, options)) {
            low = comparator;
          }
        });
        if (high.operator === comp || high.operator === ecomp) {
          return false;
        }
        if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
          return false;
        } else if (low.operator === ecomp && ltfn(version, low.semver)) {
          return false;
        }
      }
      return true;
    };
    module.exports = outside;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/gtr.js
var require_gtr = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/gtr.js"(exports, module) {
    "use strict";
    var outside = require_outside();
    var gtr = (version, range, options) => outside(version, range, ">", options);
    module.exports = gtr;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/ltr.js
var require_ltr = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/ltr.js"(exports, module) {
    "use strict";
    var outside = require_outside();
    var ltr = (version, range, options) => outside(version, range, "<", options);
    module.exports = ltr;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/intersects.js
var require_intersects = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/intersects.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var intersects = (r1, r2, options) => {
      r1 = new Range(r1, options);
      r2 = new Range(r2, options);
      return r1.intersects(r2, options);
    };
    module.exports = intersects;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/simplify.js
var require_simplify = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/simplify.js"(exports, module) {
    "use strict";
    var satisfies = require_satisfies();
    var compare = require_compare();
    module.exports = (versions, range, options) => {
      const set = [];
      let first = null;
      let prev = null;
      const v = versions.sort((a, b) => compare(a, b, options));
      for (const version of v) {
        const included = satisfies(version, range, options);
        if (included) {
          prev = version;
          if (!first) {
            first = version;
          }
        } else {
          if (prev) {
            set.push([first, prev]);
          }
          prev = null;
          first = null;
        }
      }
      if (first) {
        set.push([first, null]);
      }
      const ranges = [];
      for (const [min, max] of set) {
        if (min === max) {
          ranges.push(min);
        } else if (!max && min === v[0]) {
          ranges.push("*");
        } else if (!max) {
          ranges.push(`>=${min}`);
        } else if (min === v[0]) {
          ranges.push(`<=${max}`);
        } else {
          ranges.push(`${min} - ${max}`);
        }
      }
      const simplified = ranges.join(" || ");
      const original = typeof range.raw === "string" ? range.raw : String(range);
      return simplified.length < original.length ? simplified : range;
    };
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/subset.js
var require_subset = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/ranges/subset.js"(exports, module) {
    "use strict";
    var Range = require_range();
    var Comparator = require_comparator();
    var { ANY } = Comparator;
    var satisfies = require_satisfies();
    var compare = require_compare();
    var subset = (sub, dom, options = {}) => {
      if (sub === dom) {
        return true;
      }
      sub = new Range(sub, options);
      dom = new Range(dom, options);
      let sawNonNull = false;
      OUTER: for (const simpleSub of sub.set) {
        for (const simpleDom of dom.set) {
          const isSub = simpleSubset(simpleSub, simpleDom, options);
          sawNonNull = sawNonNull || isSub !== null;
          if (isSub) {
            continue OUTER;
          }
        }
        if (sawNonNull) {
          return false;
        }
      }
      return true;
    };
    var minimumVersionWithPreRelease = [new Comparator(">=0.0.0-0")];
    var minimumVersion = [new Comparator(">=0.0.0")];
    var simpleSubset = (sub, dom, options) => {
      if (sub === dom) {
        return true;
      }
      if (sub.length === 1 && sub[0].semver === ANY) {
        if (dom.length === 1 && dom[0].semver === ANY) {
          return true;
        } else if (options.includePrerelease) {
          sub = minimumVersionWithPreRelease;
        } else {
          sub = minimumVersion;
        }
      }
      if (dom.length === 1 && dom[0].semver === ANY) {
        if (options.includePrerelease) {
          return true;
        } else {
          dom = minimumVersion;
        }
      }
      const eqSet = /* @__PURE__ */ new Set();
      let gt, lt;
      for (const c of sub) {
        if (c.operator === ">" || c.operator === ">=") {
          gt = higherGT(gt, c, options);
        } else if (c.operator === "<" || c.operator === "<=") {
          lt = lowerLT(lt, c, options);
        } else {
          eqSet.add(c.semver);
        }
      }
      if (eqSet.size > 1) {
        return null;
      }
      let gtltComp;
      if (gt && lt) {
        gtltComp = compare(gt.semver, lt.semver, options);
        if (gtltComp > 0) {
          return null;
        } else if (gtltComp === 0 && (gt.operator !== ">=" || lt.operator !== "<=")) {
          return null;
        }
      }
      for (const eq of eqSet) {
        if (gt && !satisfies(eq, String(gt), options)) {
          return null;
        }
        if (lt && !satisfies(eq, String(lt), options)) {
          return null;
        }
        for (const c of dom) {
          if (!satisfies(eq, String(c), options)) {
            return false;
          }
        }
        return true;
      }
      let higher, lower;
      let hasDomLT, hasDomGT;
      let needDomLTPre = lt && !options.includePrerelease && lt.semver.prerelease.length ? lt.semver : false;
      let needDomGTPre = gt && !options.includePrerelease && gt.semver.prerelease.length ? gt.semver : false;
      if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt.operator === "<" && needDomLTPre.prerelease[0] === 0) {
        needDomLTPre = false;
      }
      for (const c of dom) {
        hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
        hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
        if (gt) {
          if (needDomGTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
              needDomGTPre = false;
            }
          }
          if (c.operator === ">" || c.operator === ">=") {
            higher = higherGT(gt, c, options);
            if (higher === c && higher !== gt) {
              return false;
            }
          } else if (gt.operator === ">=" && !c.test(gt.semver)) {
            return false;
          }
        }
        if (lt) {
          if (needDomLTPre) {
            if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
              needDomLTPre = false;
            }
          }
          if (c.operator === "<" || c.operator === "<=") {
            lower = lowerLT(lt, c, options);
            if (lower === c && lower !== lt) {
              return false;
            }
          } else if (lt.operator === "<=" && !c.test(lt.semver)) {
            return false;
          }
        }
        if (!c.operator && (lt || gt) && gtltComp !== 0) {
          return false;
        }
      }
      if (gt && hasDomLT && !lt && gtltComp !== 0) {
        return false;
      }
      if (lt && hasDomGT && !gt && gtltComp !== 0) {
        return false;
      }
      if (needDomGTPre || needDomLTPre) {
        return false;
      }
      return true;
    };
    var higherGT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
    };
    var lowerLT = (a, b, options) => {
      if (!a) {
        return b;
      }
      const comp = compare(a.semver, b.semver, options);
      return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
    };
    module.exports = subset;
  }
});

// node_modules/.pnpm/semver@7.8.5/node_modules/semver/index.js
var require_semver2 = __commonJS({
  "node_modules/.pnpm/semver@7.8.5/node_modules/semver/index.js"(exports, module) {
    "use strict";
    var internalRe = require_re();
    var constants = require_constants();
    var SemVer = require_semver();
    var identifiers = require_identifiers();
    var parse2 = require_parse();
    var valid = require_valid();
    var clean = require_clean();
    var inc = require_inc();
    var diff = require_diff();
    var major = require_major();
    var minor = require_minor();
    var patch = require_patch();
    var prerelease = require_prerelease();
    var compare = require_compare();
    var rcompare = require_rcompare();
    var compareLoose = require_compare_loose();
    var compareBuild = require_compare_build();
    var sort = require_sort();
    var rsort = require_rsort();
    var gt = require_gt();
    var lt = require_lt();
    var eq = require_eq();
    var neq = require_neq();
    var gte = require_gte();
    var lte = require_lte();
    var cmp = require_cmp();
    var coerce2 = require_coerce();
    var truncate = require_truncate();
    var Comparator = require_comparator();
    var Range = require_range();
    var satisfies = require_satisfies();
    var toComparators = require_to_comparators();
    var maxSatisfying = require_max_satisfying();
    var minSatisfying = require_min_satisfying();
    var minVersion = require_min_version();
    var validRange = require_valid2();
    var outside = require_outside();
    var gtr = require_gtr();
    var ltr = require_ltr();
    var intersects = require_intersects();
    var simplifyRange = require_simplify();
    var subset = require_subset();
    module.exports = {
      parse: parse2,
      valid,
      clean,
      inc,
      diff,
      major,
      minor,
      patch,
      prerelease,
      compare,
      rcompare,
      compareLoose,
      compareBuild,
      sort,
      rsort,
      gt,
      lt,
      eq,
      neq,
      gte,
      lte,
      cmp,
      coerce: coerce2,
      truncate,
      Comparator,
      Range,
      satisfies,
      toComparators,
      maxSatisfying,
      minSatisfying,
      minVersion,
      validRange,
      outside,
      gtr,
      ltr,
      intersects,
      simplifyRange,
      subset,
      SemVer,
      re: internalRe.re,
      src: internalRe.src,
      tokens: internalRe.t,
      SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
      RELEASE_TYPES: constants.RELEASE_TYPES,
      compareIdentifiers: identifiers.compareIdentifiers,
      rcompareIdentifiers: identifiers.rcompareIdentifiers
    };
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js
var require_asymmetricKeyDetailsSupported = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/asymmetricKeyDetailsSupported.js"(exports, module) {
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=15.7.0");
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js
var require_rsaPssKeyDetailsSupported = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/rsaPssKeyDetailsSupported.js"(exports, module) {
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, ">=16.9.0");
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js
var require_validateAsymmetricKey = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/validateAsymmetricKey.js"(exports, module) {
    var ASYMMETRIC_KEY_DETAILS_SUPPORTED = require_asymmetricKeyDetailsSupported();
    var RSA_PSS_KEY_DETAILS_SUPPORTED = require_rsaPssKeyDetailsSupported();
    var allowedAlgorithmsForKeys = {
      "ec": ["ES256", "ES384", "ES512"],
      "rsa": ["RS256", "PS256", "RS384", "PS384", "RS512", "PS512"],
      "rsa-pss": ["PS256", "PS384", "PS512"]
    };
    var allowedCurves = {
      ES256: "prime256v1",
      ES384: "secp384r1",
      ES512: "secp521r1"
    };
    module.exports = function(algorithm, key) {
      if (!algorithm || !key) return;
      const keyType = key.asymmetricKeyType;
      if (!keyType) return;
      const allowedAlgorithms = allowedAlgorithmsForKeys[keyType];
      if (!allowedAlgorithms) {
        throw new Error(`Unknown key type "${keyType}".`);
      }
      if (!allowedAlgorithms.includes(algorithm)) {
        throw new Error(`"alg" parameter for "${keyType}" key type must be one of: ${allowedAlgorithms.join(", ")}.`);
      }
      if (ASYMMETRIC_KEY_DETAILS_SUPPORTED) {
        switch (keyType) {
          case "ec":
            const keyCurve = key.asymmetricKeyDetails.namedCurve;
            const allowedCurve = allowedCurves[algorithm];
            if (keyCurve !== allowedCurve) {
              throw new Error(`"alg" parameter "${algorithm}" requires curve "${allowedCurve}".`);
            }
            break;
          case "rsa-pss":
            if (RSA_PSS_KEY_DETAILS_SUPPORTED) {
              const length = parseInt(algorithm.slice(-3), 10);
              const { hashAlgorithm, mgf1HashAlgorithm, saltLength } = key.asymmetricKeyDetails;
              if (hashAlgorithm !== `sha${length}` || mgf1HashAlgorithm !== hashAlgorithm) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameters do not meet the requirements of "alg" ${algorithm}.`);
              }
              if (saltLength !== void 0 && saltLength > length >> 3) {
                throw new Error(`Invalid key for this operation, its RSA-PSS parameter saltLength does not meet the requirements of "alg" ${algorithm}.`);
              }
            }
            break;
        }
      }
    };
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/psSupported.js
var require_psSupported = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/lib/psSupported.js"(exports, module) {
    var semver = require_semver2();
    module.exports = semver.satisfies(process.version, "^6.12.0 || >=8.0.0");
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/verify.js
var require_verify = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/verify.js"(exports, module) {
    var JsonWebTokenError = require_JsonWebTokenError();
    var NotBeforeError = require_NotBeforeError();
    var TokenExpiredError = require_TokenExpiredError();
    var decode = require_decode();
    var timespan = require_timespan();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var PS_SUPPORTED = require_psSupported();
    var jws = require_jws();
    var { KeyObject, createSecretKey, createPublicKey } = __require("crypto");
    var PUB_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var EC_KEY_ALGS = ["ES256", "ES384", "ES512"];
    var RSA_KEY_ALGS = ["RS256", "RS384", "RS512"];
    var HS_ALGS = ["HS256", "HS384", "HS512"];
    if (PS_SUPPORTED) {
      PUB_KEY_ALGS.splice(PUB_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
      RSA_KEY_ALGS.splice(RSA_KEY_ALGS.length, 0, "PS256", "PS384", "PS512");
    }
    module.exports = function(jwtString, secretOrPublicKey, options, callback) {
      if (typeof options === "function" && !callback) {
        callback = options;
        options = {};
      }
      if (!options) {
        options = {};
      }
      options = Object.assign({}, options);
      let done;
      if (callback) {
        done = callback;
      } else {
        done = function(err, data) {
          if (err) throw err;
          return data;
        };
      }
      if (options.clockTimestamp && typeof options.clockTimestamp !== "number") {
        return done(new JsonWebTokenError("clockTimestamp must be a number"));
      }
      if (options.nonce !== void 0 && (typeof options.nonce !== "string" || options.nonce.trim() === "")) {
        return done(new JsonWebTokenError("nonce must be a non-empty string"));
      }
      if (options.allowInvalidAsymmetricKeyTypes !== void 0 && typeof options.allowInvalidAsymmetricKeyTypes !== "boolean") {
        return done(new JsonWebTokenError("allowInvalidAsymmetricKeyTypes must be a boolean"));
      }
      const clockTimestamp = options.clockTimestamp || Math.floor(Date.now() / 1e3);
      if (!jwtString) {
        return done(new JsonWebTokenError("jwt must be provided"));
      }
      if (typeof jwtString !== "string") {
        return done(new JsonWebTokenError("jwt must be a string"));
      }
      const parts = jwtString.split(".");
      if (parts.length !== 3) {
        return done(new JsonWebTokenError("jwt malformed"));
      }
      let decodedToken;
      try {
        decodedToken = decode(jwtString, { complete: true });
      } catch (err) {
        return done(err);
      }
      if (!decodedToken) {
        return done(new JsonWebTokenError("invalid token"));
      }
      const header = decodedToken.header;
      let getSecret;
      if (typeof secretOrPublicKey === "function") {
        if (!callback) {
          return done(new JsonWebTokenError("verify must be called asynchronous if secret or public key is provided as a callback"));
        }
        getSecret = secretOrPublicKey;
      } else {
        getSecret = function(header2, secretCallback) {
          return secretCallback(null, secretOrPublicKey);
        };
      }
      return getSecret(header, function(err, secretOrPublicKey2) {
        if (err) {
          return done(new JsonWebTokenError("error in secret or public key callback: " + err.message));
        }
        const hasSignature = parts[2].trim() !== "";
        if (!hasSignature && secretOrPublicKey2) {
          return done(new JsonWebTokenError("jwt signature is required"));
        }
        if (hasSignature && !secretOrPublicKey2) {
          return done(new JsonWebTokenError("secret or public key must be provided"));
        }
        if (!hasSignature && !options.algorithms) {
          return done(new JsonWebTokenError('please specify "none" in "algorithms" to verify unsigned tokens'));
        }
        if (secretOrPublicKey2 != null && !(secretOrPublicKey2 instanceof KeyObject)) {
          try {
            secretOrPublicKey2 = createPublicKey(secretOrPublicKey2);
          } catch (_) {
            try {
              secretOrPublicKey2 = createSecretKey(typeof secretOrPublicKey2 === "string" ? Buffer.from(secretOrPublicKey2) : secretOrPublicKey2);
            } catch (_2) {
              return done(new JsonWebTokenError("secretOrPublicKey is not valid key material"));
            }
          }
        }
        if (!options.algorithms) {
          if (secretOrPublicKey2.type === "secret") {
            options.algorithms = HS_ALGS;
          } else if (["rsa", "rsa-pss"].includes(secretOrPublicKey2.asymmetricKeyType)) {
            options.algorithms = RSA_KEY_ALGS;
          } else if (secretOrPublicKey2.asymmetricKeyType === "ec") {
            options.algorithms = EC_KEY_ALGS;
          } else {
            options.algorithms = PUB_KEY_ALGS;
          }
        }
        if (options.algorithms.indexOf(decodedToken.header.alg) === -1) {
          return done(new JsonWebTokenError("invalid algorithm"));
        }
        if (header.alg.startsWith("HS") && secretOrPublicKey2.type !== "secret") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be a symmetric key when using ${header.alg}`));
        } else if (/^(?:RS|PS|ES)/.test(header.alg) && secretOrPublicKey2.type !== "public") {
          return done(new JsonWebTokenError(`secretOrPublicKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInvalidAsymmetricKeyTypes) {
          try {
            validateAsymmetricKey(header.alg, secretOrPublicKey2);
          } catch (e) {
            return done(e);
          }
        }
        let valid;
        try {
          valid = jws.verify(jwtString, decodedToken.header.alg, secretOrPublicKey2);
        } catch (e) {
          return done(e);
        }
        if (!valid) {
          return done(new JsonWebTokenError("invalid signature"));
        }
        const payload = decodedToken.payload;
        if (typeof payload.nbf !== "undefined" && !options.ignoreNotBefore) {
          if (typeof payload.nbf !== "number") {
            return done(new JsonWebTokenError("invalid nbf value"));
          }
          if (payload.nbf > clockTimestamp + (options.clockTolerance || 0)) {
            return done(new NotBeforeError("jwt not active", new Date(payload.nbf * 1e3)));
          }
        }
        if (typeof payload.exp !== "undefined" && !options.ignoreExpiration) {
          if (typeof payload.exp !== "number") {
            return done(new JsonWebTokenError("invalid exp value"));
          }
          if (clockTimestamp >= payload.exp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("jwt expired", new Date(payload.exp * 1e3)));
          }
        }
        if (options.audience) {
          const audiences = Array.isArray(options.audience) ? options.audience : [options.audience];
          const target = Array.isArray(payload.aud) ? payload.aud : [payload.aud];
          const match2 = target.some(function(targetAudience) {
            return audiences.some(function(audience) {
              return audience instanceof RegExp ? audience.test(targetAudience) : audience === targetAudience;
            });
          });
          if (!match2) {
            return done(new JsonWebTokenError("jwt audience invalid. expected: " + audiences.join(" or ")));
          }
        }
        if (options.issuer) {
          const invalid_issuer = typeof options.issuer === "string" && payload.iss !== options.issuer || Array.isArray(options.issuer) && options.issuer.indexOf(payload.iss) === -1;
          if (invalid_issuer) {
            return done(new JsonWebTokenError("jwt issuer invalid. expected: " + options.issuer));
          }
        }
        if (options.subject) {
          if (payload.sub !== options.subject) {
            return done(new JsonWebTokenError("jwt subject invalid. expected: " + options.subject));
          }
        }
        if (options.jwtid) {
          if (payload.jti !== options.jwtid) {
            return done(new JsonWebTokenError("jwt jwtid invalid. expected: " + options.jwtid));
          }
        }
        if (options.nonce) {
          if (payload.nonce !== options.nonce) {
            return done(new JsonWebTokenError("jwt nonce invalid. expected: " + options.nonce));
          }
        }
        if (options.maxAge) {
          if (typeof payload.iat !== "number") {
            return done(new JsonWebTokenError("iat required when maxAge is specified"));
          }
          const maxAgeTimestamp = timespan(options.maxAge, payload.iat);
          if (typeof maxAgeTimestamp === "undefined") {
            return done(new JsonWebTokenError('"maxAge" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
          }
          if (clockTimestamp >= maxAgeTimestamp + (options.clockTolerance || 0)) {
            return done(new TokenExpiredError("maxAge exceeded", new Date(maxAgeTimestamp * 1e3)));
          }
        }
        if (options.complete === true) {
          const signature = decodedToken.signature;
          return done(null, {
            header,
            payload,
            signature
          });
        }
        return done(null, payload);
      });
    };
  }
});

// node_modules/.pnpm/lodash.includes@4.3.0/node_modules/lodash.includes/index.js
var require_lodash = __commonJS({
  "node_modules/.pnpm/lodash.includes@4.3.0/node_modules/lodash.includes/index.js"(exports, module) {
    var INFINITY = 1 / 0;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var argsTag = "[object Arguments]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var freeParseInt = parseInt;
    function arrayMap(array, iteratee) {
      var index = -1, length = array ? array.length : 0, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length, index = fromIndex + (fromRight ? 1 : -1);
      while (fromRight ? index-- : ++index < length) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseIndexOf(array, value, fromIndex) {
      if (value !== value) {
        return baseFindIndex(array, baseIsNaN, fromIndex);
      }
      var index = fromIndex - 1, length = array.length;
      while (++index < length) {
        if (array[index] === value) {
          return index;
        }
      }
      return -1;
    }
    function baseIsNaN(value) {
      return value !== value;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseValues(object, props) {
      return arrayMap(props, function(key) {
        return object[key];
      });
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectToString = objectProto.toString;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeKeys = overArg(Object.keys, Object);
    var nativeMax = Math.max;
    function arrayLikeKeys(value, inherited) {
      var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
      var length = result.length, skipIndexes = !!length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function includes(collection, value, fromIndex, guard) {
      collection = isArrayLike(collection) ? collection : values(collection);
      fromIndex = fromIndex && !guard ? toInteger(fromIndex) : 0;
      var length = collection.length;
      if (fromIndex < 0) {
        fromIndex = nativeMax(length + fromIndex, 0);
      }
      return isString(collection) ? fromIndex <= length && collection.indexOf(value, fromIndex) > -1 : !!length && baseIndexOf(collection, value, fromIndex) > -1;
    }
    function isArguments(value) {
      return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
    }
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isArrayLikeObject(value) {
      return isObjectLike(value) && isArrayLike(value);
    }
    function isFunction(value) {
      var tag = isObject(value) ? objectToString.call(value) : "";
      return tag == funcTag || tag == genTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function values(object) {
      return object ? baseValues(object, keys(object)) : [];
    }
    module.exports = includes;
  }
});

// node_modules/.pnpm/lodash.isboolean@3.0.3/node_modules/lodash.isboolean/index.js
var require_lodash2 = __commonJS({
  "node_modules/.pnpm/lodash.isboolean@3.0.3/node_modules/lodash.isboolean/index.js"(exports, module) {
    var boolTag = "[object Boolean]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isBoolean(value) {
      return value === true || value === false || isObjectLike(value) && objectToString.call(value) == boolTag;
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    module.exports = isBoolean;
  }
});

// node_modules/.pnpm/lodash.isinteger@4.0.4/node_modules/lodash.isinteger/index.js
var require_lodash3 = __commonJS({
  "node_modules/.pnpm/lodash.isinteger@4.0.4/node_modules/lodash.isinteger/index.js"(exports, module) {
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isInteger(value) {
      return typeof value == "number" && value == toInteger(value);
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = isInteger;
  }
});

// node_modules/.pnpm/lodash.isnumber@3.0.3/node_modules/lodash.isnumber/index.js
var require_lodash4 = __commonJS({
  "node_modules/.pnpm/lodash.isnumber@3.0.3/node_modules/lodash.isnumber/index.js"(exports, module) {
    var numberTag = "[object Number]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isNumber(value) {
      return typeof value == "number" || isObjectLike(value) && objectToString.call(value) == numberTag;
    }
    module.exports = isNumber;
  }
});

// node_modules/.pnpm/lodash.isplainobject@4.0.6/node_modules/lodash.isplainobject/index.js
var require_lodash5 = __commonJS({
  "node_modules/.pnpm/lodash.isplainobject@4.0.6/node_modules/lodash.isplainobject/index.js"(exports, module) {
    var objectTag = "[object Object]";
    function isHostObject(value) {
      var result = false;
      if (value != null && typeof value.toString != "function") {
        try {
          result = !!(value + "");
        } catch (e) {
        }
      }
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var objectCtorString = funcToString.call(Object);
    var objectToString = objectProto.toString;
    var getPrototype = overArg(Object.getPrototypeOf, Object);
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isPlainObject(value) {
      if (!isObjectLike(value) || objectToString.call(value) != objectTag || isHostObject(value)) {
        return false;
      }
      var proto = getPrototype(value);
      if (proto === null) {
        return true;
      }
      var Ctor = hasOwnProperty.call(proto, "constructor") && proto.constructor;
      return typeof Ctor == "function" && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
    }
    module.exports = isPlainObject;
  }
});

// node_modules/.pnpm/lodash.isstring@4.0.1/node_modules/lodash.isstring/index.js
var require_lodash6 = __commonJS({
  "node_modules/.pnpm/lodash.isstring@4.0.1/node_modules/lodash.isstring/index.js"(exports, module) {
    var stringTag = "[object String]";
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    var isArray = Array.isArray;
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isString(value) {
      return typeof value == "string" || !isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag;
    }
    module.exports = isString;
  }
});

// node_modules/.pnpm/lodash.once@4.1.1/node_modules/lodash.once/index.js
var require_lodash7 = __commonJS({
  "node_modules/.pnpm/lodash.once@4.1.1/node_modules/lodash.once/index.js"(exports, module) {
    var FUNC_ERROR_TEXT = "Expected a function";
    var INFINITY = 1 / 0;
    var MAX_INTEGER = 17976931348623157e292;
    var NAN = 0 / 0;
    var symbolTag = "[object Symbol]";
    var reTrim = /^\s+|\s+$/g;
    var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
    var reIsBinary = /^0b[01]+$/i;
    var reIsOctal = /^0o[0-7]+$/i;
    var freeParseInt = parseInt;
    var objectProto = Object.prototype;
    var objectToString = objectProto.toString;
    function before(n, func) {
      var result;
      if (typeof func != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = void 0;
        }
        return result;
      };
    }
    function once(func) {
      return before(2, func);
    }
    function isObject(value) {
      var type = typeof value;
      return !!value && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return !!value && typeof value == "object";
    }
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && objectToString.call(value) == symbolTag;
    }
    function toFinite(value) {
      if (!value) {
        return value === 0 ? value : 0;
      }
      value = toNumber(value);
      if (value === INFINITY || value === -INFINITY) {
        var sign = value < 0 ? -1 : 1;
        return sign * MAX_INTEGER;
      }
      return value === value ? value : 0;
    }
    function toInteger(value) {
      var result = toFinite(value), remainder = result % 1;
      return result === result ? remainder ? result - remainder : result : 0;
    }
    function toNumber(value) {
      if (typeof value == "number") {
        return value;
      }
      if (isSymbol(value)) {
        return NAN;
      }
      if (isObject(value)) {
        var other = typeof value.valueOf == "function" ? value.valueOf() : value;
        value = isObject(other) ? other + "" : other;
      }
      if (typeof value != "string") {
        return value === 0 ? value : +value;
      }
      value = value.replace(reTrim, "");
      var isBinary = reIsBinary.test(value);
      return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
    }
    module.exports = once;
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/sign.js
var require_sign = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/sign.js"(exports, module) {
    var timespan = require_timespan();
    var PS_SUPPORTED = require_psSupported();
    var validateAsymmetricKey = require_validateAsymmetricKey();
    var jws = require_jws();
    var includes = require_lodash();
    var isBoolean = require_lodash2();
    var isInteger = require_lodash3();
    var isNumber = require_lodash4();
    var isPlainObject = require_lodash5();
    var isString = require_lodash6();
    var once = require_lodash7();
    var { KeyObject, createSecretKey, createPrivateKey } = __require("crypto");
    var SUPPORTED_ALGS = ["RS256", "RS384", "RS512", "ES256", "ES384", "ES512", "HS256", "HS384", "HS512", "none"];
    if (PS_SUPPORTED) {
      SUPPORTED_ALGS.splice(3, 0, "PS256", "PS384", "PS512");
    }
    var sign_options_schema = {
      expiresIn: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"expiresIn" should be a number of seconds or string representing a timespan' },
      notBefore: { isValid: function(value) {
        return isInteger(value) || isString(value) && value;
      }, message: '"notBefore" should be a number of seconds or string representing a timespan' },
      audience: { isValid: function(value) {
        return isString(value) || Array.isArray(value);
      }, message: '"audience" must be a string or array' },
      algorithm: { isValid: includes.bind(null, SUPPORTED_ALGS), message: '"algorithm" must be a valid string enum value' },
      header: { isValid: isPlainObject, message: '"header" must be an object' },
      encoding: { isValid: isString, message: '"encoding" must be a string' },
      issuer: { isValid: isString, message: '"issuer" must be a string' },
      subject: { isValid: isString, message: '"subject" must be a string' },
      jwtid: { isValid: isString, message: '"jwtid" must be a string' },
      noTimestamp: { isValid: isBoolean, message: '"noTimestamp" must be a boolean' },
      keyid: { isValid: isString, message: '"keyid" must be a string' },
      mutatePayload: { isValid: isBoolean, message: '"mutatePayload" must be a boolean' },
      allowInsecureKeySizes: { isValid: isBoolean, message: '"allowInsecureKeySizes" must be a boolean' },
      allowInvalidAsymmetricKeyTypes: { isValid: isBoolean, message: '"allowInvalidAsymmetricKeyTypes" must be a boolean' }
    };
    var registered_claims_schema = {
      iat: { isValid: isNumber, message: '"iat" should be a number of seconds' },
      exp: { isValid: isNumber, message: '"exp" should be a number of seconds' },
      nbf: { isValid: isNumber, message: '"nbf" should be a number of seconds' }
    };
    function validate(schema, allowUnknown, object, parameterName) {
      if (!isPlainObject(object)) {
        throw new Error('Expected "' + parameterName + '" to be a plain object.');
      }
      Object.keys(object).forEach(function(key) {
        const validator2 = schema[key];
        if (!validator2) {
          if (!allowUnknown) {
            throw new Error('"' + key + '" is not allowed in "' + parameterName + '"');
          }
          return;
        }
        if (!validator2.isValid(object[key])) {
          throw new Error(validator2.message);
        }
      });
    }
    function validateOptions(options) {
      return validate(sign_options_schema, false, options, "options");
    }
    function validatePayload(payload) {
      return validate(registered_claims_schema, true, payload, "payload");
    }
    var options_to_payload = {
      "audience": "aud",
      "issuer": "iss",
      "subject": "sub",
      "jwtid": "jti"
    };
    var options_for_objects = [
      "expiresIn",
      "notBefore",
      "noTimestamp",
      "audience",
      "issuer",
      "subject",
      "jwtid"
    ];
    module.exports = function(payload, secretOrPrivateKey, options, callback) {
      if (typeof options === "function") {
        callback = options;
        options = {};
      } else {
        options = options || {};
      }
      const isObjectPayload = typeof payload === "object" && !Buffer.isBuffer(payload);
      const header = Object.assign({
        alg: options.algorithm || "HS256",
        typ: isObjectPayload ? "JWT" : void 0,
        kid: options.keyid
      }, options.header);
      function failure(err) {
        if (callback) {
          return callback(err);
        }
        throw err;
      }
      if (!secretOrPrivateKey && options.algorithm !== "none") {
        return failure(new Error("secretOrPrivateKey must have a value"));
      }
      if (secretOrPrivateKey != null && !(secretOrPrivateKey instanceof KeyObject)) {
        try {
          secretOrPrivateKey = createPrivateKey(secretOrPrivateKey);
        } catch (_) {
          try {
            secretOrPrivateKey = createSecretKey(typeof secretOrPrivateKey === "string" ? Buffer.from(secretOrPrivateKey) : secretOrPrivateKey);
          } catch (_2) {
            return failure(new Error("secretOrPrivateKey is not valid key material"));
          }
        }
      }
      if (header.alg.startsWith("HS") && secretOrPrivateKey.type !== "secret") {
        return failure(new Error(`secretOrPrivateKey must be a symmetric key when using ${header.alg}`));
      } else if (/^(?:RS|PS|ES)/.test(header.alg)) {
        if (secretOrPrivateKey.type !== "private") {
          return failure(new Error(`secretOrPrivateKey must be an asymmetric key when using ${header.alg}`));
        }
        if (!options.allowInsecureKeySizes && !header.alg.startsWith("ES") && secretOrPrivateKey.asymmetricKeyDetails !== void 0 && //KeyObject.asymmetricKeyDetails is supported in Node 15+
        secretOrPrivateKey.asymmetricKeyDetails.modulusLength < 2048) {
          return failure(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
        }
      }
      if (typeof payload === "undefined") {
        return failure(new Error("payload is required"));
      } else if (isObjectPayload) {
        try {
          validatePayload(payload);
        } catch (error) {
          return failure(error);
        }
        if (!options.mutatePayload) {
          payload = Object.assign({}, payload);
        }
      } else {
        const invalid_options = options_for_objects.filter(function(opt) {
          return typeof options[opt] !== "undefined";
        });
        if (invalid_options.length > 0) {
          return failure(new Error("invalid " + invalid_options.join(",") + " option for " + typeof payload + " payload"));
        }
      }
      if (typeof payload.exp !== "undefined" && typeof options.expiresIn !== "undefined") {
        return failure(new Error('Bad "options.expiresIn" option the payload already has an "exp" property.'));
      }
      if (typeof payload.nbf !== "undefined" && typeof options.notBefore !== "undefined") {
        return failure(new Error('Bad "options.notBefore" option the payload already has an "nbf" property.'));
      }
      try {
        validateOptions(options);
      } catch (error) {
        return failure(error);
      }
      if (!options.allowInvalidAsymmetricKeyTypes) {
        try {
          validateAsymmetricKey(header.alg, secretOrPrivateKey);
        } catch (error) {
          return failure(error);
        }
      }
      const timestamp = payload.iat || Math.floor(Date.now() / 1e3);
      if (options.noTimestamp) {
        delete payload.iat;
      } else if (isObjectPayload) {
        payload.iat = timestamp;
      }
      if (typeof options.notBefore !== "undefined") {
        try {
          payload.nbf = timespan(options.notBefore, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.nbf === "undefined") {
          return failure(new Error('"notBefore" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      if (typeof options.expiresIn !== "undefined" && typeof payload === "object") {
        try {
          payload.exp = timespan(options.expiresIn, timestamp);
        } catch (err) {
          return failure(err);
        }
        if (typeof payload.exp === "undefined") {
          return failure(new Error('"expiresIn" should be a number of seconds or string representing a timespan eg: "1d", "20h", 60'));
        }
      }
      Object.keys(options_to_payload).forEach(function(key) {
        const claim = options_to_payload[key];
        if (typeof options[key] !== "undefined") {
          if (typeof payload[claim] !== "undefined") {
            return failure(new Error('Bad "options.' + key + '" option. The payload already has an "' + claim + '" property.'));
          }
          payload[claim] = options[key];
        }
      });
      const encoding = options.encoding || "utf8";
      if (typeof callback === "function") {
        callback = callback && once(callback);
        jws.createSign({
          header,
          privateKey: secretOrPrivateKey,
          payload,
          encoding
        }).once("error", callback).once("done", function(signature) {
          if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
            return callback(new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`));
          }
          callback(null, signature);
        });
      } else {
        let signature = jws.sign({ header, payload, secret: secretOrPrivateKey, encoding });
        if (!options.allowInsecureKeySizes && /^(?:RS|PS)/.test(header.alg) && signature.length < 256) {
          throw new Error(`secretOrPrivateKey has a minimum key size of 2048 bits for ${header.alg}`);
        }
        return signature;
      }
    };
  }
});

// node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/index.js
var require_jsonwebtoken = __commonJS({
  "node_modules/.pnpm/jsonwebtoken@9.0.3/node_modules/jsonwebtoken/index.js"(exports, module) {
    module.exports = {
      decode: require_decode(),
      verify: require_verify(),
      sign: require_sign(),
      JsonWebTokenError: require_JsonWebTokenError(),
      NotBeforeError: require_NotBeforeError(),
      TokenExpiredError: require_TokenExpiredError()
    };
  }
});

// apps/api/src/env.ts
var envSchema, env;
var init_env = __esm({
  "apps/api/src/env.ts"() {
    "use strict";
    init_zod();
    envSchema = external_exports.object({
      PORT: external_exports.coerce.number().default(8787),
      JWT_SECRET: external_exports.string().min(8).default("dev-jwt-secret-change-me"),
      JWT_REFRESH_SECRET: external_exports.string().min(8).default("dev-refresh-secret-change-me"),
      ENABLE_DEV_TOOLS: external_exports.string().default("true").transform((v) => v === "true"),
      /**
       * `sqlite` keeps a file on disk for local dev; `memory` is required on Vercel,
       * where the filesystem is read-only and native modules cannot load. Defaults to
       * memory whenever a Vercel runtime is detected so a deploy never needs the flag.
       */
      PERSIST: external_exports.enum(["sqlite", "memory"]).default(process.env.VERCEL ? "memory" : "sqlite"),
      DATA_DIR: external_exports.string().default("./data"),
      /**
       * Origin used to build certificate verification links and family SMS links.
       * On Vercel this is derived from VERCEL_URL when not set explicitly.
       */
      PUBLIC_BASE_URL: external_exports.string().default(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5173"),
      HUMAN_MODEL_PATH: external_exports.string().default("https://vladmandic.github.io/human-models/models/"),
      /**
       * `real` runs the face pipeline; `simulate` short-circuits it so a hardware
       * failure on stage cannot block a walkthrough.
       */
      VERIFICATION_MODE: external_exports.enum(["real", "simulate"]).default("real"),
      /**
       * Where face descriptors are computed. On serverless the TensorFlow models are far
       * too large for a function bundle, so the browser extracts the descriptor and the
       * server still does the comparison and all scoring. See services/verification.ts.
       */
      FACE_ENGINE: external_exports.enum(["server", "client"]).default(process.env.VERCEL ? "client" : "server")
    });
    env = envSchema.parse(process.env);
  }
});

// apps/api/src/services/humanEngine.ts
var humanEngine_exports = {};
__export(humanEngine_exports, {
  analyzeFace: () => analyzeFace,
  isHumanReady: () => isHumanReady,
  warmUpHuman: () => warmUpHuman
});
import { createRequire as createRequire2 } from "node:module";
import path2 from "node:path";
function loadHumanConstructor() {
  const distDir = path2.dirname(require2.resolve("@vladmandic/human"));
  const wasm = require2("@tensorflow/tfjs-backend-wasm");
  const wasmDir = path2.dirname(require2.resolve("@tensorflow/tfjs-backend-wasm")) + path2.sep;
  wasm.setWasmPaths(wasmDir);
  const mod = require2(path2.join(distDir, "human.node-wasm.js"));
  return { Human: mod.Human, wasmDir };
}
async function getHuman() {
  if (instance) return instance;
  if (loading) return loading;
  loading = (async () => {
    const { Human, wasmDir } = loadHumanConstructor();
    const human = new Human({
      backend: "wasm",
      wasmPath: wasmDir,
      modelBasePath: env.HUMAN_MODEL_PATH,
      cacheSensitivity: 0,
      face: {
        enabled: true,
        detector: { enabled: true, maxDetected: 1 },
        mesh: { enabled: true },
        description: { enabled: true },
        antispoof: { enabled: true },
        liveness: { enabled: true },
        iris: { enabled: false },
        emotion: { enabled: false }
      },
      body: { enabled: false },
      hand: { enabled: false },
      object: { enabled: false },
      gesture: { enabled: false },
      filter: { enabled: false }
    });
    await human.load();
    await human.tf.ready();
    console.log("[human] face models loaded (wasm backend)");
    instance = human;
    return human;
  })();
  return loading;
}
async function warmUpHuman() {
  try {
    await getHuman();
    return true;
  } catch (err) {
    console.warn("[human] model load failed \u2014 face verification will report unavailable:", err.message);
    return false;
  }
}
function decodeJpeg(dataUrl) {
  const jpeg = require2("jpeg-js");
  const base64 = dataUrl.includes(",") ? dataUrl.slice(dataUrl.indexOf(",") + 1) : dataUrl;
  const buf = Buffer.from(base64, "base64");
  const raw2 = jpeg.decode(buf, { useTArray: true, formatAsRGBA: false });
  return { data: raw2.data, width: raw2.width, height: raw2.height };
}
async function analyzeFace(jpegDataUrl) {
  const human = await getHuman();
  const { data, width, height } = decodeJpeg(jpegDataUrl);
  const tensor = human.tf.tensor3d(data, [height, width, 3], "float32");
  try {
    const result = await human.detect(tensor, { face: { enabled: true } });
    const face = result.face[0];
    if (!face?.embedding || face.embedding.length === 0) return null;
    return {
      embedding: face.embedding,
      live: face.live ?? 0,
      real: face.real ?? 0,
      faceScore: face.faceScore ?? 0,
      box: face.box ?? [0, 0, 0, 0]
    };
  } finally {
    human.tf.dispose(tensor);
  }
}
function isHumanReady() {
  return instance !== null;
}
var require2, instance, loading;
var init_humanEngine = __esm({
  "apps/api/src/services/humanEngine.ts"() {
    "use strict";
    init_env();
    require2 = createRequire2(path2.join(process.cwd(), "noop.cjs"));
    instance = null;
    loading = null;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js
var require_can_promise = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/can-promise.js"(exports, module) {
    module.exports = function() {
      return typeof Promise === "function" && Promise.prototype && Promise.prototype.then;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/utils.js"(exports) {
    var toSJISFunction;
    var CODEWORDS_COUNT = [
      0,
      // Not used
      26,
      44,
      70,
      100,
      134,
      172,
      196,
      242,
      292,
      346,
      404,
      466,
      532,
      581,
      655,
      733,
      815,
      901,
      991,
      1085,
      1156,
      1258,
      1364,
      1474,
      1588,
      1706,
      1828,
      1921,
      2051,
      2185,
      2323,
      2465,
      2611,
      2761,
      2876,
      3034,
      3196,
      3362,
      3532,
      3706
    ];
    exports.getSymbolSize = function getSymbolSize(version) {
      if (!version) throw new Error('"version" cannot be null or undefined');
      if (version < 1 || version > 40) throw new Error('"version" should be in range from 1 to 40');
      return version * 4 + 17;
    };
    exports.getSymbolTotalCodewords = function getSymbolTotalCodewords(version) {
      return CODEWORDS_COUNT[version];
    };
    exports.getBCHDigit = function(data) {
      let digit = 0;
      while (data !== 0) {
        digit++;
        data >>>= 1;
      }
      return digit;
    };
    exports.setToSJISFunction = function setToSJISFunction(f) {
      if (typeof f !== "function") {
        throw new Error('"toSJISFunc" is not a valid function.');
      }
      toSJISFunction = f;
    };
    exports.isKanjiModeEnabled = function() {
      return typeof toSJISFunction !== "undefined";
    };
    exports.toSJIS = function toSJIS(kanji) {
      return toSJISFunction(kanji);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js
var require_error_correction_level = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-level.js"(exports) {
    exports.L = { bit: 1 };
    exports.M = { bit: 0 };
    exports.Q = { bit: 3 };
    exports.H = { bit: 2 };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "l":
        case "low":
          return exports.L;
        case "m":
        case "medium":
          return exports.M;
        case "q":
        case "quartile":
          return exports.Q;
        case "h":
        case "high":
          return exports.H;
        default:
          throw new Error("Unknown EC Level: " + string);
      }
    }
    exports.isValid = function isValid2(level) {
      return level && typeof level.bit !== "undefined" && level.bit >= 0 && level.bit < 4;
    };
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js
var require_bit_buffer = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-buffer.js"(exports, module) {
    function BitBuffer() {
      this.buffer = [];
      this.length = 0;
    }
    BitBuffer.prototype = {
      get: function(index) {
        const bufIndex = Math.floor(index / 8);
        return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
      },
      put: function(num, length) {
        for (let i = 0; i < length; i++) {
          this.putBit((num >>> length - i - 1 & 1) === 1);
        }
      },
      getLengthInBits: function() {
        return this.length;
      },
      putBit: function(bit) {
        const bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
          this.buffer.push(0);
        }
        if (bit) {
          this.buffer[bufIndex] |= 128 >>> this.length % 8;
        }
        this.length++;
      }
    };
    module.exports = BitBuffer;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js
var require_bit_matrix = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/bit-matrix.js"(exports, module) {
    function BitMatrix(size) {
      if (!size || size < 1) {
        throw new Error("BitMatrix size must be defined and greater than 0");
      }
      this.size = size;
      this.data = new Uint8Array(size * size);
      this.reservedBit = new Uint8Array(size * size);
    }
    BitMatrix.prototype.set = function(row, col, value, reserved) {
      const index = row * this.size + col;
      this.data[index] = value;
      if (reserved) this.reservedBit[index] = true;
    };
    BitMatrix.prototype.get = function(row, col) {
      return this.data[row * this.size + col];
    };
    BitMatrix.prototype.xor = function(row, col, value) {
      this.data[row * this.size + col] ^= value;
    };
    BitMatrix.prototype.isReserved = function(row, col) {
      return this.reservedBit[row * this.size + col];
    };
    module.exports = BitMatrix;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js
var require_alignment_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alignment-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    exports.getRowColCoords = function getRowColCoords(version) {
      if (version === 1) return [];
      const posCount = Math.floor(version / 7) + 2;
      const size = getSymbolSize(version);
      const intervals = size === 145 ? 26 : Math.ceil((size - 13) / (2 * posCount - 2)) * 2;
      const positions = [size - 7];
      for (let i = 1; i < posCount - 1; i++) {
        positions[i] = positions[i - 1] - intervals;
      }
      positions.push(6);
      return positions.reverse();
    };
    exports.getPositions = function getPositions(version) {
      const coords = [];
      const pos = exports.getRowColCoords(version);
      const posLength = pos.length;
      for (let i = 0; i < posLength; i++) {
        for (let j = 0; j < posLength; j++) {
          if (i === 0 && j === 0 || // top-left
          i === 0 && j === posLength - 1 || // bottom-left
          i === posLength - 1 && j === 0) {
            continue;
          }
          coords.push([pos[i], pos[j]]);
        }
      }
      return coords;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js
var require_finder_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/finder-pattern.js"(exports) {
    var getSymbolSize = require_utils().getSymbolSize;
    var FINDER_PATTERN_SIZE = 7;
    exports.getPositions = function getPositions(version) {
      const size = getSymbolSize(version);
      return [
        // top-left
        [0, 0],
        // top-right
        [size - FINDER_PATTERN_SIZE, 0],
        // bottom-left
        [0, size - FINDER_PATTERN_SIZE]
      ];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js
var require_mask_pattern = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mask-pattern.js"(exports) {
    exports.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    var PenaltyScores = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    exports.isValid = function isValid2(mask) {
      return mask != null && mask !== "" && !isNaN(mask) && mask >= 0 && mask <= 7;
    };
    exports.from = function from(value) {
      return exports.isValid(value) ? parseInt(value, 10) : void 0;
    };
    exports.getPenaltyN1 = function getPenaltyN1(data) {
      const size = data.size;
      let points = 0;
      let sameCountCol = 0;
      let sameCountRow = 0;
      let lastCol = null;
      let lastRow = null;
      for (let row = 0; row < size; row++) {
        sameCountCol = sameCountRow = 0;
        lastCol = lastRow = null;
        for (let col = 0; col < size; col++) {
          let module2 = data.get(row, col);
          if (module2 === lastCol) {
            sameCountCol++;
          } else {
            if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
            lastCol = module2;
            sameCountCol = 1;
          }
          module2 = data.get(col, row);
          if (module2 === lastRow) {
            sameCountRow++;
          } else {
            if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
            lastRow = module2;
            sameCountRow = 1;
          }
        }
        if (sameCountCol >= 5) points += PenaltyScores.N1 + (sameCountCol - 5);
        if (sameCountRow >= 5) points += PenaltyScores.N1 + (sameCountRow - 5);
      }
      return points;
    };
    exports.getPenaltyN2 = function getPenaltyN2(data) {
      const size = data.size;
      let points = 0;
      for (let row = 0; row < size - 1; row++) {
        for (let col = 0; col < size - 1; col++) {
          const last = data.get(row, col) + data.get(row, col + 1) + data.get(row + 1, col) + data.get(row + 1, col + 1);
          if (last === 4 || last === 0) points++;
        }
      }
      return points * PenaltyScores.N2;
    };
    exports.getPenaltyN3 = function getPenaltyN3(data) {
      const size = data.size;
      let points = 0;
      let bitsCol = 0;
      let bitsRow = 0;
      for (let row = 0; row < size; row++) {
        bitsCol = bitsRow = 0;
        for (let col = 0; col < size; col++) {
          bitsCol = bitsCol << 1 & 2047 | data.get(row, col);
          if (col >= 10 && (bitsCol === 1488 || bitsCol === 93)) points++;
          bitsRow = bitsRow << 1 & 2047 | data.get(col, row);
          if (col >= 10 && (bitsRow === 1488 || bitsRow === 93)) points++;
        }
      }
      return points * PenaltyScores.N3;
    };
    exports.getPenaltyN4 = function getPenaltyN4(data) {
      let darkCount = 0;
      const modulesCount = data.data.length;
      for (let i = 0; i < modulesCount; i++) darkCount += data.data[i];
      const k = Math.abs(Math.ceil(darkCount * 100 / modulesCount / 5) - 10);
      return k * PenaltyScores.N4;
    };
    function getMaskAt(maskPattern, i, j) {
      switch (maskPattern) {
        case exports.Patterns.PATTERN000:
          return (i + j) % 2 === 0;
        case exports.Patterns.PATTERN001:
          return i % 2 === 0;
        case exports.Patterns.PATTERN010:
          return j % 3 === 0;
        case exports.Patterns.PATTERN011:
          return (i + j) % 3 === 0;
        case exports.Patterns.PATTERN100:
          return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;
        case exports.Patterns.PATTERN101:
          return i * j % 2 + i * j % 3 === 0;
        case exports.Patterns.PATTERN110:
          return (i * j % 2 + i * j % 3) % 2 === 0;
        case exports.Patterns.PATTERN111:
          return (i * j % 3 + (i + j) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + maskPattern);
      }
    }
    exports.applyMask = function applyMask(pattern, data) {
      const size = data.size;
      for (let col = 0; col < size; col++) {
        for (let row = 0; row < size; row++) {
          if (data.isReserved(row, col)) continue;
          data.xor(row, col, getMaskAt(pattern, row, col));
        }
      }
    };
    exports.getBestMask = function getBestMask(data, setupFormatFunc) {
      const numPatterns = Object.keys(exports.Patterns).length;
      let bestPattern = 0;
      let lowerPenalty = Infinity;
      for (let p = 0; p < numPatterns; p++) {
        setupFormatFunc(p);
        exports.applyMask(p, data);
        const penalty = exports.getPenaltyN1(data) + exports.getPenaltyN2(data) + exports.getPenaltyN3(data) + exports.getPenaltyN4(data);
        exports.applyMask(p, data);
        if (penalty < lowerPenalty) {
          lowerPenalty = penalty;
          bestPattern = p;
        }
      }
      return bestPattern;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js
var require_error_correction_code = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/error-correction-code.js"(exports) {
    var ECLevel = require_error_correction_level();
    var EC_BLOCKS_TABLE = [
      // L  M  Q  H
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      1,
      2,
      2,
      1,
      2,
      2,
      4,
      1,
      2,
      4,
      4,
      2,
      4,
      4,
      4,
      2,
      4,
      6,
      5,
      2,
      4,
      6,
      6,
      2,
      5,
      8,
      8,
      4,
      5,
      8,
      8,
      4,
      5,
      8,
      11,
      4,
      8,
      10,
      11,
      4,
      9,
      12,
      16,
      4,
      9,
      16,
      16,
      6,
      10,
      12,
      18,
      6,
      10,
      17,
      16,
      6,
      11,
      16,
      19,
      6,
      13,
      18,
      21,
      7,
      14,
      21,
      25,
      8,
      16,
      20,
      25,
      8,
      17,
      23,
      25,
      9,
      17,
      23,
      34,
      9,
      18,
      25,
      30,
      10,
      20,
      27,
      32,
      12,
      21,
      29,
      35,
      12,
      23,
      34,
      37,
      12,
      25,
      34,
      40,
      13,
      26,
      35,
      42,
      14,
      28,
      38,
      45,
      15,
      29,
      40,
      48,
      16,
      31,
      43,
      51,
      17,
      33,
      45,
      54,
      18,
      35,
      48,
      57,
      19,
      37,
      51,
      60,
      19,
      38,
      53,
      63,
      20,
      40,
      56,
      66,
      21,
      43,
      59,
      70,
      22,
      45,
      62,
      74,
      24,
      47,
      65,
      77,
      25,
      49,
      68,
      81
    ];
    var EC_CODEWORDS_TABLE = [
      // L  M  Q  H
      7,
      10,
      13,
      17,
      10,
      16,
      22,
      28,
      15,
      26,
      36,
      44,
      20,
      36,
      52,
      64,
      26,
      48,
      72,
      88,
      36,
      64,
      96,
      112,
      40,
      72,
      108,
      130,
      48,
      88,
      132,
      156,
      60,
      110,
      160,
      192,
      72,
      130,
      192,
      224,
      80,
      150,
      224,
      264,
      96,
      176,
      260,
      308,
      104,
      198,
      288,
      352,
      120,
      216,
      320,
      384,
      132,
      240,
      360,
      432,
      144,
      280,
      408,
      480,
      168,
      308,
      448,
      532,
      180,
      338,
      504,
      588,
      196,
      364,
      546,
      650,
      224,
      416,
      600,
      700,
      224,
      442,
      644,
      750,
      252,
      476,
      690,
      816,
      270,
      504,
      750,
      900,
      300,
      560,
      810,
      960,
      312,
      588,
      870,
      1050,
      336,
      644,
      952,
      1110,
      360,
      700,
      1020,
      1200,
      390,
      728,
      1050,
      1260,
      420,
      784,
      1140,
      1350,
      450,
      812,
      1200,
      1440,
      480,
      868,
      1290,
      1530,
      510,
      924,
      1350,
      1620,
      540,
      980,
      1440,
      1710,
      570,
      1036,
      1530,
      1800,
      570,
      1064,
      1590,
      1890,
      600,
      1120,
      1680,
      1980,
      630,
      1204,
      1770,
      2100,
      660,
      1260,
      1860,
      2220,
      720,
      1316,
      1950,
      2310,
      750,
      1372,
      2040,
      2430
    ];
    exports.getBlocksCount = function getBlocksCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_BLOCKS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
    exports.getTotalCodewordsCount = function getTotalCodewordsCount(version, errorCorrectionLevel) {
      switch (errorCorrectionLevel) {
        case ECLevel.L:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 0];
        case ECLevel.M:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 1];
        case ECLevel.Q:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 2];
        case ECLevel.H:
          return EC_CODEWORDS_TABLE[(version - 1) * 4 + 3];
        default:
          return void 0;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js
var require_galois_field = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/galois-field.js"(exports) {
    var EXP_TABLE = new Uint8Array(512);
    var LOG_TABLE = new Uint8Array(256);
    (function initTables() {
      let x = 1;
      for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x <<= 1;
        if (x & 256) {
          x ^= 285;
        }
      }
      for (let i = 255; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
      }
    })();
    exports.log = function log2(n) {
      if (n < 1) throw new Error("log(" + n + ")");
      return LOG_TABLE[n];
    };
    exports.exp = function exp(n) {
      return EXP_TABLE[n];
    };
    exports.mul = function mul(x, y) {
      if (x === 0 || y === 0) return 0;
      return EXP_TABLE[LOG_TABLE[x] + LOG_TABLE[y]];
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js
var require_polynomial = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/polynomial.js"(exports) {
    var GF = require_galois_field();
    exports.mul = function mul(p1, p2) {
      const coeff = new Uint8Array(p1.length + p2.length - 1);
      for (let i = 0; i < p1.length; i++) {
        for (let j = 0; j < p2.length; j++) {
          coeff[i + j] ^= GF.mul(p1[i], p2[j]);
        }
      }
      return coeff;
    };
    exports.mod = function mod(divident, divisor) {
      let result = new Uint8Array(divident);
      while (result.length - divisor.length >= 0) {
        const coeff = result[0];
        for (let i = 0; i < divisor.length; i++) {
          result[i] ^= GF.mul(divisor[i], coeff);
        }
        let offset = 0;
        while (offset < result.length && result[offset] === 0) offset++;
        result = result.slice(offset);
      }
      return result;
    };
    exports.generateECPolynomial = function generateECPolynomial(degree) {
      let poly = new Uint8Array([1]);
      for (let i = 0; i < degree; i++) {
        poly = exports.mul(poly, new Uint8Array([1, GF.exp(i)]));
      }
      return poly;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js
var require_reed_solomon_encoder = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/reed-solomon-encoder.js"(exports, module) {
    var Polynomial = require_polynomial();
    function ReedSolomonEncoder(degree) {
      this.genPoly = void 0;
      this.degree = degree;
      if (this.degree) this.initialize(this.degree);
    }
    ReedSolomonEncoder.prototype.initialize = function initialize(degree) {
      this.degree = degree;
      this.genPoly = Polynomial.generateECPolynomial(this.degree);
    };
    ReedSolomonEncoder.prototype.encode = function encode(data) {
      if (!this.genPoly) {
        throw new Error("Encoder not initialized");
      }
      const paddedData = new Uint8Array(data.length + this.degree);
      paddedData.set(data);
      const remainder = Polynomial.mod(paddedData, this.genPoly);
      const start = this.degree - remainder.length;
      if (start > 0) {
        const buff = new Uint8Array(this.degree);
        buff.set(remainder, start);
        return buff;
      }
      return remainder;
    };
    module.exports = ReedSolomonEncoder;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js
var require_version_check = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version-check.js"(exports) {
    exports.isValid = function isValid2(version) {
      return !isNaN(version) && version >= 1 && version <= 40;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js
var require_regex = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/regex.js"(exports) {
    var numeric = "[0-9]+";
    var alphanumeric = "[A-Z $%*+\\-./:]+";
    var kanji = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    kanji = kanji.replace(/u/g, "\\u");
    var byte = "(?:(?![A-Z0-9 $%*+\\-./:]|" + kanji + ")(?:.|[\r\n]))+";
    exports.KANJI = new RegExp(kanji, "g");
    exports.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g");
    exports.BYTE = new RegExp(byte, "g");
    exports.NUMERIC = new RegExp(numeric, "g");
    exports.ALPHANUMERIC = new RegExp(alphanumeric, "g");
    var TEST_KANJI = new RegExp("^" + kanji + "$");
    var TEST_NUMERIC = new RegExp("^" + numeric + "$");
    var TEST_ALPHANUMERIC = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    exports.testKanji = function testKanji(str) {
      return TEST_KANJI.test(str);
    };
    exports.testNumeric = function testNumeric(str) {
      return TEST_NUMERIC.test(str);
    };
    exports.testAlphanumeric = function testAlphanumeric(str) {
      return TEST_ALPHANUMERIC.test(str);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js
var require_mode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/mode.js"(exports) {
    var VersionCheck = require_version_check();
    var Regex = require_regex();
    exports.NUMERIC = {
      id: "Numeric",
      bit: 1 << 0,
      ccBits: [10, 12, 14]
    };
    exports.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 1 << 1,
      ccBits: [9, 11, 13]
    };
    exports.BYTE = {
      id: "Byte",
      bit: 1 << 2,
      ccBits: [8, 16, 16]
    };
    exports.KANJI = {
      id: "Kanji",
      bit: 1 << 3,
      ccBits: [8, 10, 12]
    };
    exports.MIXED = {
      bit: -1
    };
    exports.getCharCountIndicator = function getCharCountIndicator(mode, version) {
      if (!mode.ccBits) throw new Error("Invalid mode: " + mode);
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid version: " + version);
      }
      if (version >= 1 && version < 10) return mode.ccBits[0];
      else if (version < 27) return mode.ccBits[1];
      return mode.ccBits[2];
    };
    exports.getBestModeForData = function getBestModeForData(dataStr) {
      if (Regex.testNumeric(dataStr)) return exports.NUMERIC;
      else if (Regex.testAlphanumeric(dataStr)) return exports.ALPHANUMERIC;
      else if (Regex.testKanji(dataStr)) return exports.KANJI;
      else return exports.BYTE;
    };
    exports.toString = function toString(mode) {
      if (mode && mode.id) return mode.id;
      throw new Error("Invalid mode");
    };
    exports.isValid = function isValid2(mode) {
      return mode && mode.bit && mode.ccBits;
    };
    function fromString(string) {
      if (typeof string !== "string") {
        throw new Error("Param is not a string");
      }
      const lcStr = string.toLowerCase();
      switch (lcStr) {
        case "numeric":
          return exports.NUMERIC;
        case "alphanumeric":
          return exports.ALPHANUMERIC;
        case "kanji":
          return exports.KANJI;
        case "byte":
          return exports.BYTE;
        default:
          throw new Error("Unknown mode: " + string);
      }
    }
    exports.from = function from(value, defaultValue) {
      if (exports.isValid(value)) {
        return value;
      }
      try {
        return fromString(value);
      } catch (e) {
        return defaultValue;
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js
var require_version = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/version.js"(exports) {
    var Utils = require_utils();
    var ECCode = require_error_correction_code();
    var ECLevel = require_error_correction_level();
    var Mode = require_mode();
    var VersionCheck = require_version_check();
    var G18 = 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0;
    var G18_BCH = Utils.getBCHDigit(G18);
    function getBestVersionForDataLength(mode, length, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, mode)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    function getReservedBitsCount(mode, version) {
      return Mode.getCharCountIndicator(mode, version) + 4;
    }
    function getTotalBitsFromDataArray(segments, version) {
      let totalBits = 0;
      segments.forEach(function(data) {
        const reservedBits = getReservedBitsCount(data.mode, version);
        totalBits += reservedBits + data.getBitsLength();
      });
      return totalBits;
    }
    function getBestVersionForMixedData(segments, errorCorrectionLevel) {
      for (let currentVersion = 1; currentVersion <= 40; currentVersion++) {
        const length = getTotalBitsFromDataArray(segments, currentVersion);
        if (length <= exports.getCapacity(currentVersion, errorCorrectionLevel, Mode.MIXED)) {
          return currentVersion;
        }
      }
      return void 0;
    }
    exports.from = function from(value, defaultValue) {
      if (VersionCheck.isValid(value)) {
        return parseInt(value, 10);
      }
      return defaultValue;
    };
    exports.getCapacity = function getCapacity(version, errorCorrectionLevel, mode) {
      if (!VersionCheck.isValid(version)) {
        throw new Error("Invalid QR Code version");
      }
      if (typeof mode === "undefined") mode = Mode.BYTE;
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (mode === Mode.MIXED) return dataTotalCodewordsBits;
      const usableBits = dataTotalCodewordsBits - getReservedBitsCount(mode, version);
      switch (mode) {
        case Mode.NUMERIC:
          return Math.floor(usableBits / 10 * 3);
        case Mode.ALPHANUMERIC:
          return Math.floor(usableBits / 11 * 2);
        case Mode.KANJI:
          return Math.floor(usableBits / 13);
        case Mode.BYTE:
        default:
          return Math.floor(usableBits / 8);
      }
    };
    exports.getBestVersionForData = function getBestVersionForData(data, errorCorrectionLevel) {
      let seg;
      const ecl = ECLevel.from(errorCorrectionLevel, ECLevel.M);
      if (Array.isArray(data)) {
        if (data.length > 1) {
          return getBestVersionForMixedData(data, ecl);
        }
        if (data.length === 0) {
          return 1;
        }
        seg = data[0];
      } else {
        seg = data;
      }
      return getBestVersionForDataLength(seg.mode, seg.getLength(), ecl);
    };
    exports.getEncodedBits = function getEncodedBits(version) {
      if (!VersionCheck.isValid(version) || version < 7) {
        throw new Error("Invalid QR Code version");
      }
      let d = version << 12;
      while (Utils.getBCHDigit(d) - G18_BCH >= 0) {
        d ^= G18 << Utils.getBCHDigit(d) - G18_BCH;
      }
      return version << 12 | d;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js
var require_format_info = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/format-info.js"(exports) {
    var Utils = require_utils();
    var G15 = 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0;
    var G15_MASK = 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1;
    var G15_BCH = Utils.getBCHDigit(G15);
    exports.getEncodedBits = function getEncodedBits(errorCorrectionLevel, mask) {
      const data = errorCorrectionLevel.bit << 3 | mask;
      let d = data << 10;
      while (Utils.getBCHDigit(d) - G15_BCH >= 0) {
        d ^= G15 << Utils.getBCHDigit(d) - G15_BCH;
      }
      return (data << 10 | d) ^ G15_MASK;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js
var require_numeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/numeric-data.js"(exports, module) {
    var Mode = require_mode();
    function NumericData(data) {
      this.mode = Mode.NUMERIC;
      this.data = data.toString();
    }
    NumericData.getBitsLength = function getBitsLength(length) {
      return 10 * Math.floor(length / 3) + (length % 3 ? length % 3 * 3 + 1 : 0);
    };
    NumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    NumericData.prototype.getBitsLength = function getBitsLength() {
      return NumericData.getBitsLength(this.data.length);
    };
    NumericData.prototype.write = function write(bitBuffer) {
      let i, group, value;
      for (i = 0; i + 3 <= this.data.length; i += 3) {
        group = this.data.substr(i, 3);
        value = parseInt(group, 10);
        bitBuffer.put(value, 10);
      }
      const remainingNum = this.data.length - i;
      if (remainingNum > 0) {
        group = this.data.substr(i);
        value = parseInt(group, 10);
        bitBuffer.put(value, remainingNum * 3 + 1);
      }
    };
    module.exports = NumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js
var require_alphanumeric_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/alphanumeric-data.js"(exports, module) {
    var Mode = require_mode();
    var ALPHA_NUM_CHARS = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      " ",
      "$",
      "%",
      "*",
      "+",
      "-",
      ".",
      "/",
      ":"
    ];
    function AlphanumericData(data) {
      this.mode = Mode.ALPHANUMERIC;
      this.data = data;
    }
    AlphanumericData.getBitsLength = function getBitsLength(length) {
      return 11 * Math.floor(length / 2) + 6 * (length % 2);
    };
    AlphanumericData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    AlphanumericData.prototype.getBitsLength = function getBitsLength() {
      return AlphanumericData.getBitsLength(this.data.length);
    };
    AlphanumericData.prototype.write = function write(bitBuffer) {
      let i;
      for (i = 0; i + 2 <= this.data.length; i += 2) {
        let value = ALPHA_NUM_CHARS.indexOf(this.data[i]) * 45;
        value += ALPHA_NUM_CHARS.indexOf(this.data[i + 1]);
        bitBuffer.put(value, 11);
      }
      if (this.data.length % 2) {
        bitBuffer.put(ALPHA_NUM_CHARS.indexOf(this.data[i]), 6);
      }
    };
    module.exports = AlphanumericData;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js
var require_byte_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/byte-data.js"(exports, module) {
    var Mode = require_mode();
    function ByteData(data) {
      this.mode = Mode.BYTE;
      if (typeof data === "string") {
        this.data = new TextEncoder().encode(data);
      } else {
        this.data = new Uint8Array(data);
      }
    }
    ByteData.getBitsLength = function getBitsLength(length) {
      return length * 8;
    };
    ByteData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    ByteData.prototype.getBitsLength = function getBitsLength() {
      return ByteData.getBitsLength(this.data.length);
    };
    ByteData.prototype.write = function(bitBuffer) {
      for (let i = 0, l = this.data.length; i < l; i++) {
        bitBuffer.put(this.data[i], 8);
      }
    };
    module.exports = ByteData;
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js
var require_kanji_data = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/kanji-data.js"(exports, module) {
    var Mode = require_mode();
    var Utils = require_utils();
    function KanjiData(data) {
      this.mode = Mode.KANJI;
      this.data = data;
    }
    KanjiData.getBitsLength = function getBitsLength(length) {
      return length * 13;
    };
    KanjiData.prototype.getLength = function getLength() {
      return this.data.length;
    };
    KanjiData.prototype.getBitsLength = function getBitsLength() {
      return KanjiData.getBitsLength(this.data.length);
    };
    KanjiData.prototype.write = function(bitBuffer) {
      let i;
      for (i = 0; i < this.data.length; i++) {
        let value = Utils.toSJIS(this.data[i]);
        if (value >= 33088 && value <= 40956) {
          value -= 33088;
        } else if (value >= 57408 && value <= 60351) {
          value -= 49472;
        } else {
          throw new Error(
            "Invalid SJIS character: " + this.data[i] + "\nMake sure your charset is UTF-8"
          );
        }
        value = (value >>> 8 & 255) * 192 + (value & 255);
        bitBuffer.put(value, 13);
      }
    };
    module.exports = KanjiData;
  }
});

// node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js
var require_dijkstra = __commonJS({
  "node_modules/.pnpm/dijkstrajs@1.0.3/node_modules/dijkstrajs/dijkstra.js"(exports, module) {
    "use strict";
    var dijkstra = {
      single_source_shortest_paths: function(graph, s, d) {
        var predecessors = {};
        var costs = {};
        costs[s] = 0;
        var open = dijkstra.PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;
        while (!open.empty()) {
          closest = open.pop();
          u = closest.value;
          cost_of_s_to_u = closest.cost;
          adjacent_nodes = graph[u] || {};
          for (v in adjacent_nodes) {
            if (adjacent_nodes.hasOwnProperty(v)) {
              cost_of_e = adjacent_nodes[v];
              cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;
              cost_of_s_to_v = costs[v];
              first_visit = typeof costs[v] === "undefined";
              if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                costs[v] = cost_of_s_to_u_plus_cost_of_e;
                open.push(v, cost_of_s_to_u_plus_cost_of_e);
                predecessors[v] = u;
              }
            }
          }
        }
        if (typeof d !== "undefined" && typeof costs[d] === "undefined") {
          var msg = ["Could not find a path from ", s, " to ", d, "."].join("");
          throw new Error(msg);
        }
        return predecessors;
      },
      extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
          nodes.push(u);
          predecessor = predecessors[u];
          u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
      },
      find_path: function(graph, s, d) {
        var predecessors = dijkstra.single_source_shortest_paths(graph, s, d);
        return dijkstra.extract_shortest_path_from_predecessor_list(
          predecessors,
          d
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(opts) {
          var T = dijkstra.PriorityQueue, t = {}, key;
          opts = opts || {};
          for (key in T) {
            if (T.hasOwnProperty(key)) {
              t[key] = T[key];
            }
          }
          t.queue = [];
          t.sorter = opts.sorter || T.default_sorter;
          return t;
        },
        default_sorter: function(a, b) {
          return a.cost - b.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(value, cost) {
          var item = { value, cost };
          this.queue.push(item);
          this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    if (typeof module !== "undefined") {
      module.exports = dijkstra;
    }
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js
var require_segments = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/segments.js"(exports) {
    var Mode = require_mode();
    var NumericData = require_numeric_data();
    var AlphanumericData = require_alphanumeric_data();
    var ByteData = require_byte_data();
    var KanjiData = require_kanji_data();
    var Regex = require_regex();
    var Utils = require_utils();
    var dijkstra = require_dijkstra();
    function getStringByteLength(str) {
      return unescape(encodeURIComponent(str)).length;
    }
    function getSegments(regex, mode, str) {
      const segments = [];
      let result;
      while ((result = regex.exec(str)) !== null) {
        segments.push({
          data: result[0],
          index: result.index,
          mode,
          length: result[0].length
        });
      }
      return segments;
    }
    function getSegmentsFromString(dataStr) {
      const numSegs = getSegments(Regex.NUMERIC, Mode.NUMERIC, dataStr);
      const alphaNumSegs = getSegments(Regex.ALPHANUMERIC, Mode.ALPHANUMERIC, dataStr);
      let byteSegs;
      let kanjiSegs;
      if (Utils.isKanjiModeEnabled()) {
        byteSegs = getSegments(Regex.BYTE, Mode.BYTE, dataStr);
        kanjiSegs = getSegments(Regex.KANJI, Mode.KANJI, dataStr);
      } else {
        byteSegs = getSegments(Regex.BYTE_KANJI, Mode.BYTE, dataStr);
        kanjiSegs = [];
      }
      const segs = numSegs.concat(alphaNumSegs, byteSegs, kanjiSegs);
      return segs.sort(function(s1, s2) {
        return s1.index - s2.index;
      }).map(function(obj) {
        return {
          data: obj.data,
          mode: obj.mode,
          length: obj.length
        };
      });
    }
    function getSegmentBitsLength(length, mode) {
      switch (mode) {
        case Mode.NUMERIC:
          return NumericData.getBitsLength(length);
        case Mode.ALPHANUMERIC:
          return AlphanumericData.getBitsLength(length);
        case Mode.KANJI:
          return KanjiData.getBitsLength(length);
        case Mode.BYTE:
          return ByteData.getBitsLength(length);
      }
    }
    function mergeSegments(segs) {
      return segs.reduce(function(acc, curr) {
        const prevSeg = acc.length - 1 >= 0 ? acc[acc.length - 1] : null;
        if (prevSeg && prevSeg.mode === curr.mode) {
          acc[acc.length - 1].data += curr.data;
          return acc;
        }
        acc.push(curr);
        return acc;
      }, []);
    }
    function buildNodes(segs) {
      const nodes = [];
      for (let i = 0; i < segs.length; i++) {
        const seg = segs[i];
        switch (seg.mode) {
          case Mode.NUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.ALPHANUMERIC, length: seg.length },
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.ALPHANUMERIC:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: seg.length }
            ]);
            break;
          case Mode.KANJI:
            nodes.push([
              seg,
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
            break;
          case Mode.BYTE:
            nodes.push([
              { data: seg.data, mode: Mode.BYTE, length: getStringByteLength(seg.data) }
            ]);
        }
      }
      return nodes;
    }
    function buildGraph(nodes, version) {
      const table = {};
      const graph = { start: {} };
      let prevNodeIds = ["start"];
      for (let i = 0; i < nodes.length; i++) {
        const nodeGroup = nodes[i];
        const currentNodeIds = [];
        for (let j = 0; j < nodeGroup.length; j++) {
          const node = nodeGroup[j];
          const key = "" + i + j;
          currentNodeIds.push(key);
          table[key] = { node, lastCount: 0 };
          graph[key] = {};
          for (let n = 0; n < prevNodeIds.length; n++) {
            const prevNodeId = prevNodeIds[n];
            if (table[prevNodeId] && table[prevNodeId].node.mode === node.mode) {
              graph[prevNodeId][key] = getSegmentBitsLength(table[prevNodeId].lastCount + node.length, node.mode) - getSegmentBitsLength(table[prevNodeId].lastCount, node.mode);
              table[prevNodeId].lastCount += node.length;
            } else {
              if (table[prevNodeId]) table[prevNodeId].lastCount = node.length;
              graph[prevNodeId][key] = getSegmentBitsLength(node.length, node.mode) + 4 + Mode.getCharCountIndicator(node.mode, version);
            }
          }
        }
        prevNodeIds = currentNodeIds;
      }
      for (let n = 0; n < prevNodeIds.length; n++) {
        graph[prevNodeIds[n]].end = 0;
      }
      return { map: graph, table };
    }
    function buildSingleSegment(data, modesHint) {
      let mode;
      const bestMode = Mode.getBestModeForData(data);
      mode = Mode.from(modesHint, bestMode);
      if (mode !== Mode.BYTE && mode.bit < bestMode.bit) {
        throw new Error('"' + data + '" cannot be encoded with mode ' + Mode.toString(mode) + ".\n Suggested mode is: " + Mode.toString(bestMode));
      }
      if (mode === Mode.KANJI && !Utils.isKanjiModeEnabled()) {
        mode = Mode.BYTE;
      }
      switch (mode) {
        case Mode.NUMERIC:
          return new NumericData(data);
        case Mode.ALPHANUMERIC:
          return new AlphanumericData(data);
        case Mode.KANJI:
          return new KanjiData(data);
        case Mode.BYTE:
          return new ByteData(data);
      }
    }
    exports.fromArray = function fromArray(array) {
      return array.reduce(function(acc, seg) {
        if (typeof seg === "string") {
          acc.push(buildSingleSegment(seg, null));
        } else if (seg.data) {
          acc.push(buildSingleSegment(seg.data, seg.mode));
        }
        return acc;
      }, []);
    };
    exports.fromString = function fromString(data, version) {
      const segs = getSegmentsFromString(data, Utils.isKanjiModeEnabled());
      const nodes = buildNodes(segs);
      const graph = buildGraph(nodes, version);
      const path3 = dijkstra.find_path(graph.map, "start", "end");
      const optimizedSegs = [];
      for (let i = 1; i < path3.length - 1; i++) {
        optimizedSegs.push(graph.table[path3[i]].node);
      }
      return exports.fromArray(mergeSegments(optimizedSegs));
    };
    exports.rawSplit = function rawSplit(data) {
      return exports.fromArray(
        getSegmentsFromString(data, Utils.isKanjiModeEnabled())
      );
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js
var require_qrcode = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/core/qrcode.js"(exports) {
    var Utils = require_utils();
    var ECLevel = require_error_correction_level();
    var BitBuffer = require_bit_buffer();
    var BitMatrix = require_bit_matrix();
    var AlignmentPattern = require_alignment_pattern();
    var FinderPattern = require_finder_pattern();
    var MaskPattern = require_mask_pattern();
    var ECCode = require_error_correction_code();
    var ReedSolomonEncoder = require_reed_solomon_encoder();
    var Version = require_version();
    var FormatInfo = require_format_info();
    var Mode = require_mode();
    var Segments = require_segments();
    function setupFinderPattern(matrix, version) {
      const size = matrix.size;
      const pos = FinderPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -1; r <= 7; r++) {
          if (row + r <= -1 || size <= row + r) continue;
          for (let c = -1; c <= 7; c++) {
            if (col + c <= -1 || size <= col + c) continue;
            if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupTimingPattern(matrix) {
      const size = matrix.size;
      for (let r = 8; r < size - 8; r++) {
        const value = r % 2 === 0;
        matrix.set(r, 6, value, true);
        matrix.set(6, r, value, true);
      }
    }
    function setupAlignmentPattern(matrix, version) {
      const pos = AlignmentPattern.getPositions(version);
      for (let i = 0; i < pos.length; i++) {
        const row = pos[i][0];
        const col = pos[i][1];
        for (let r = -2; r <= 2; r++) {
          for (let c = -2; c <= 2; c++) {
            if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
              matrix.set(row + r, col + c, true, true);
            } else {
              matrix.set(row + r, col + c, false, true);
            }
          }
        }
      }
    }
    function setupVersionInfo(matrix, version) {
      const size = matrix.size;
      const bits = Version.getEncodedBits(version);
      let row, col, mod;
      for (let i = 0; i < 18; i++) {
        row = Math.floor(i / 3);
        col = i % 3 + size - 8 - 3;
        mod = (bits >> i & 1) === 1;
        matrix.set(row, col, mod, true);
        matrix.set(col, row, mod, true);
      }
    }
    function setupFormatInfo(matrix, errorCorrectionLevel, maskPattern) {
      const size = matrix.size;
      const bits = FormatInfo.getEncodedBits(errorCorrectionLevel, maskPattern);
      let i, mod;
      for (i = 0; i < 15; i++) {
        mod = (bits >> i & 1) === 1;
        if (i < 6) {
          matrix.set(i, 8, mod, true);
        } else if (i < 8) {
          matrix.set(i + 1, 8, mod, true);
        } else {
          matrix.set(size - 15 + i, 8, mod, true);
        }
        if (i < 8) {
          matrix.set(8, size - i - 1, mod, true);
        } else if (i < 9) {
          matrix.set(8, 15 - i - 1 + 1, mod, true);
        } else {
          matrix.set(8, 15 - i - 1, mod, true);
        }
      }
      matrix.set(size - 8, 8, 1, true);
    }
    function setupData(matrix, data) {
      const size = matrix.size;
      let inc = -1;
      let row = size - 1;
      let bitIndex = 7;
      let byteIndex = 0;
      for (let col = size - 1; col > 0; col -= 2) {
        if (col === 6) col--;
        while (true) {
          for (let c = 0; c < 2; c++) {
            if (!matrix.isReserved(row, col - c)) {
              let dark = false;
              if (byteIndex < data.length) {
                dark = (data[byteIndex] >>> bitIndex & 1) === 1;
              }
              matrix.set(row, col - c, dark);
              bitIndex--;
              if (bitIndex === -1) {
                byteIndex++;
                bitIndex = 7;
              }
            }
          }
          row += inc;
          if (row < 0 || size <= row) {
            row -= inc;
            inc = -inc;
            break;
          }
        }
      }
    }
    function createData(version, errorCorrectionLevel, segments) {
      const buffer = new BitBuffer();
      segments.forEach(function(data) {
        buffer.put(data.mode.bit, 4);
        buffer.put(data.getLength(), Mode.getCharCountIndicator(data.mode, version));
        data.write(buffer);
      });
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewordsBits = (totalCodewords - ecTotalCodewords) * 8;
      if (buffer.getLengthInBits() + 4 <= dataTotalCodewordsBits) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 !== 0) {
        buffer.putBit(0);
      }
      const remainingByte = (dataTotalCodewordsBits - buffer.getLengthInBits()) / 8;
      for (let i = 0; i < remainingByte; i++) {
        buffer.put(i % 2 ? 17 : 236, 8);
      }
      return createCodewords(buffer, version, errorCorrectionLevel);
    }
    function createCodewords(bitBuffer, version, errorCorrectionLevel) {
      const totalCodewords = Utils.getSymbolTotalCodewords(version);
      const ecTotalCodewords = ECCode.getTotalCodewordsCount(version, errorCorrectionLevel);
      const dataTotalCodewords = totalCodewords - ecTotalCodewords;
      const ecTotalBlocks = ECCode.getBlocksCount(version, errorCorrectionLevel);
      const blocksInGroup2 = totalCodewords % ecTotalBlocks;
      const blocksInGroup1 = ecTotalBlocks - blocksInGroup2;
      const totalCodewordsInGroup1 = Math.floor(totalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup1 = Math.floor(dataTotalCodewords / ecTotalBlocks);
      const dataCodewordsInGroup2 = dataCodewordsInGroup1 + 1;
      const ecCount = totalCodewordsInGroup1 - dataCodewordsInGroup1;
      const rs = new ReedSolomonEncoder(ecCount);
      let offset = 0;
      const dcData = new Array(ecTotalBlocks);
      const ecData = new Array(ecTotalBlocks);
      let maxDataSize = 0;
      const buffer = new Uint8Array(bitBuffer.buffer);
      for (let b = 0; b < ecTotalBlocks; b++) {
        const dataSize = b < blocksInGroup1 ? dataCodewordsInGroup1 : dataCodewordsInGroup2;
        dcData[b] = buffer.slice(offset, offset + dataSize);
        ecData[b] = rs.encode(dcData[b]);
        offset += dataSize;
        maxDataSize = Math.max(maxDataSize, dataSize);
      }
      const data = new Uint8Array(totalCodewords);
      let index = 0;
      let i, r;
      for (i = 0; i < maxDataSize; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          if (i < dcData[r].length) {
            data[index++] = dcData[r][i];
          }
        }
      }
      for (i = 0; i < ecCount; i++) {
        for (r = 0; r < ecTotalBlocks; r++) {
          data[index++] = ecData[r][i];
        }
      }
      return data;
    }
    function createSymbol(data, version, errorCorrectionLevel, maskPattern) {
      let segments;
      if (Array.isArray(data)) {
        segments = Segments.fromArray(data);
      } else if (typeof data === "string") {
        let estimatedVersion = version;
        if (!estimatedVersion) {
          const rawSegments = Segments.rawSplit(data);
          estimatedVersion = Version.getBestVersionForData(rawSegments, errorCorrectionLevel);
        }
        segments = Segments.fromString(data, estimatedVersion || 40);
      } else {
        throw new Error("Invalid data");
      }
      const bestVersion = Version.getBestVersionForData(segments, errorCorrectionLevel);
      if (!bestVersion) {
        throw new Error("The amount of data is too big to be stored in a QR Code");
      }
      if (!version) {
        version = bestVersion;
      } else if (version < bestVersion) {
        throw new Error(
          "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " + bestVersion + ".\n"
        );
      }
      const dataBits = createData(version, errorCorrectionLevel, segments);
      const moduleCount = Utils.getSymbolSize(version);
      const modules = new BitMatrix(moduleCount);
      setupFinderPattern(modules, version);
      setupTimingPattern(modules);
      setupAlignmentPattern(modules, version);
      setupFormatInfo(modules, errorCorrectionLevel, 0);
      if (version >= 7) {
        setupVersionInfo(modules, version);
      }
      setupData(modules, dataBits);
      if (isNaN(maskPattern)) {
        maskPattern = MaskPattern.getBestMask(
          modules,
          setupFormatInfo.bind(null, modules, errorCorrectionLevel)
        );
      }
      MaskPattern.applyMask(maskPattern, modules);
      setupFormatInfo(modules, errorCorrectionLevel, maskPattern);
      return {
        modules,
        version,
        errorCorrectionLevel,
        maskPattern,
        segments
      };
    }
    exports.create = function create(data, options) {
      if (typeof data === "undefined" || data === "") {
        throw new Error("No input text");
      }
      let errorCorrectionLevel = ECLevel.M;
      let version;
      let mask;
      if (typeof options !== "undefined") {
        errorCorrectionLevel = ECLevel.from(options.errorCorrectionLevel, ECLevel.M);
        version = Version.from(options.version);
        mask = MaskPattern.from(options.maskPattern);
        if (options.toSJISFunc) {
          Utils.setToSJISFunction(options.toSJISFunc);
        }
      }
      return createSymbol(data, version, errorCorrectionLevel, mask);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/chunkstream.js
var require_chunkstream = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/chunkstream.js"(exports, module) {
    "use strict";
    var util2 = __require("util");
    var Stream = __require("stream");
    var ChunkStream = module.exports = function() {
      Stream.call(this);
      this._buffers = [];
      this._buffered = 0;
      this._reads = [];
      this._paused = false;
      this._encoding = "utf8";
      this.writable = true;
    };
    util2.inherits(ChunkStream, Stream);
    ChunkStream.prototype.read = function(length, callback) {
      this._reads.push({
        length: Math.abs(length),
        // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
      process.nextTick(
        function() {
          this._process();
          if (this._paused && this._reads && this._reads.length > 0) {
            this._paused = false;
            this.emit("drain");
          }
        }.bind(this)
      );
    };
    ChunkStream.prototype.write = function(data, encoding) {
      if (!this.writable) {
        this.emit("error", new Error("Stream not writable"));
        return false;
      }
      let dataBuffer;
      if (Buffer.isBuffer(data)) {
        dataBuffer = data;
      } else {
        dataBuffer = Buffer.from(data, encoding || this._encoding);
      }
      this._buffers.push(dataBuffer);
      this._buffered += dataBuffer.length;
      this._process();
      if (this._reads && this._reads.length === 0) {
        this._paused = true;
      }
      return this.writable && !this._paused;
    };
    ChunkStream.prototype.end = function(data, encoding) {
      if (data) {
        this.write(data, encoding);
      }
      this.writable = false;
      if (!this._buffers) {
        return;
      }
      if (this._buffers.length === 0) {
        this._end();
      } else {
        this._buffers.push(null);
        this._process();
      }
    };
    ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;
    ChunkStream.prototype._end = function() {
      if (this._reads.length > 0) {
        this.emit("error", new Error("Unexpected end of input"));
      }
      this.destroy();
    };
    ChunkStream.prototype.destroy = function() {
      if (!this._buffers) {
        return;
      }
      this.writable = false;
      this._reads = null;
      this._buffers = null;
      this.emit("close");
    };
    ChunkStream.prototype._processReadAllowingLess = function(read) {
      this._reads.shift();
      let smallerBuf = this._buffers[0];
      if (smallerBuf.length > read.length) {
        this._buffered -= read.length;
        this._buffers[0] = smallerBuf.slice(read.length);
        read.func.call(this, smallerBuf.slice(0, read.length));
      } else {
        this._buffered -= smallerBuf.length;
        this._buffers.shift();
        read.func.call(this, smallerBuf);
      }
    };
    ChunkStream.prototype._processRead = function(read) {
      this._reads.shift();
      let pos = 0;
      let count = 0;
      let data = Buffer.alloc(read.length);
      while (pos < read.length) {
        let buf = this._buffers[count++];
        let len = Math.min(buf.length, read.length - pos);
        buf.copy(data, pos, 0, len);
        pos += len;
        if (len !== buf.length) {
          this._buffers[--count] = buf.slice(len);
        }
      }
      if (count > 0) {
        this._buffers.splice(0, count);
      }
      this._buffered -= read.length;
      read.func.call(this, data);
    };
    ChunkStream.prototype._process = function() {
      try {
        while (this._buffered > 0 && this._reads && this._reads.length > 0) {
          let read = this._reads[0];
          if (read.allowLess) {
            this._processReadAllowingLess(read);
          } else if (this._buffered >= read.length) {
            this._processRead(read);
          } else {
            break;
          }
        }
        if (this._buffers && !this.writable) {
          this._end();
        }
      } catch (ex) {
        this.emit("error", ex);
      }
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/interlace.js
var require_interlace = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/interlace.js"(exports) {
    "use strict";
    var imagePasses = [
      {
        // pass 1 - 1px
        x: [0],
        y: [0]
      },
      {
        // pass 2 - 1px
        x: [4],
        y: [0]
      },
      {
        // pass 3 - 2px
        x: [0, 4],
        y: [4]
      },
      {
        // pass 4 - 4px
        x: [2, 6],
        y: [0, 4]
      },
      {
        // pass 5 - 8px
        x: [0, 2, 4, 6],
        y: [2, 6]
      },
      {
        // pass 6 - 16px
        x: [1, 3, 5, 7],
        y: [0, 2, 4, 6]
      },
      {
        // pass 7 - 32px
        x: [0, 1, 2, 3, 4, 5, 6, 7],
        y: [1, 3, 5, 7]
      }
    ];
    exports.getImagePasses = function(width, height) {
      let images = [];
      let xLeftOver = width % 8;
      let yLeftOver = height % 8;
      let xRepeats = (width - xLeftOver) / 8;
      let yRepeats = (height - yLeftOver) / 8;
      for (let i = 0; i < imagePasses.length; i++) {
        let pass = imagePasses[i];
        let passWidth = xRepeats * pass.x.length;
        let passHeight = yRepeats * pass.y.length;
        for (let j = 0; j < pass.x.length; j++) {
          if (pass.x[j] < xLeftOver) {
            passWidth++;
          } else {
            break;
          }
        }
        for (let j = 0; j < pass.y.length; j++) {
          if (pass.y[j] < yLeftOver) {
            passHeight++;
          } else {
            break;
          }
        }
        if (passWidth > 0 && passHeight > 0) {
          images.push({ width: passWidth, height: passHeight, index: i });
        }
      }
      return images;
    };
    exports.getInterlaceIterator = function(width) {
      return function(x, y, pass) {
        let outerXLeftOver = x % imagePasses[pass].x.length;
        let outerX = (x - outerXLeftOver) / imagePasses[pass].x.length * 8 + imagePasses[pass].x[outerXLeftOver];
        let outerYLeftOver = y % imagePasses[pass].y.length;
        let outerY = (y - outerYLeftOver) / imagePasses[pass].y.length * 8 + imagePasses[pass].y[outerYLeftOver];
        return outerX * 4 + outerY * width * 4;
      };
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/paeth-predictor.js
var require_paeth_predictor = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/paeth-predictor.js"(exports, module) {
    "use strict";
    module.exports = function paethPredictor(left, above, upLeft) {
      let paeth = left + above - upLeft;
      let pLeft = Math.abs(paeth - left);
      let pAbove = Math.abs(paeth - above);
      let pUpLeft = Math.abs(paeth - upLeft);
      if (pLeft <= pAbove && pLeft <= pUpLeft) {
        return left;
      }
      if (pAbove <= pUpLeft) {
        return above;
      }
      return upLeft;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-parse.js
var require_filter_parse = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-parse.js"(exports, module) {
    "use strict";
    var interlaceUtils = require_interlace();
    var paethPredictor = require_paeth_predictor();
    function getByteWidth(width, bpp, depth) {
      let byteWidth = width * bpp;
      if (depth !== 8) {
        byteWidth = Math.ceil(byteWidth / (8 / depth));
      }
      return byteWidth;
    }
    var Filter = module.exports = function(bitmapInfo, dependencies) {
      let width = bitmapInfo.width;
      let height = bitmapInfo.height;
      let interlace = bitmapInfo.interlace;
      let bpp = bitmapInfo.bpp;
      let depth = bitmapInfo.depth;
      this.read = dependencies.read;
      this.write = dependencies.write;
      this.complete = dependencies.complete;
      this._imageIndex = 0;
      this._images = [];
      if (interlace) {
        let passes = interlaceUtils.getImagePasses(width, height);
        for (let i = 0; i < passes.length; i++) {
          this._images.push({
            byteWidth: getByteWidth(passes[i].width, bpp, depth),
            height: passes[i].height,
            lineIndex: 0
          });
        }
      } else {
        this._images.push({
          byteWidth: getByteWidth(width, bpp, depth),
          height,
          lineIndex: 0
        });
      }
      if (depth === 8) {
        this._xComparison = bpp;
      } else if (depth === 16) {
        this._xComparison = bpp * 2;
      } else {
        this._xComparison = 1;
      }
    };
    Filter.prototype.start = function() {
      this.read(
        this._images[this._imageIndex].byteWidth + 1,
        this._reverseFilterLine.bind(this)
      );
    };
    Filter.prototype._unFilterType1 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        unfilteredLine[x] = rawByte + f1Left;
      }
    };
    Filter.prototype._unFilterType2 = function(rawData, unfilteredLine, byteWidth) {
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f2Up = lastLine ? lastLine[x] : 0;
        unfilteredLine[x] = rawByte + f2Up;
      }
    };
    Filter.prototype._unFilterType3 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f3Up = lastLine ? lastLine[x] : 0;
        let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f3Add = Math.floor((f3Left + f3Up) / 2);
        unfilteredLine[x] = rawByte + f3Add;
      }
    };
    Filter.prototype._unFilterType4 = function(rawData, unfilteredLine, byteWidth) {
      let xComparison = this._xComparison;
      let xBiggerThan = xComparison - 1;
      let lastLine = this._lastLine;
      for (let x = 0; x < byteWidth; x++) {
        let rawByte = rawData[1 + x];
        let f4Up = lastLine ? lastLine[x] : 0;
        let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
        let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
        let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
        unfilteredLine[x] = rawByte + f4Add;
      }
    };
    Filter.prototype._reverseFilterLine = function(rawData) {
      let filter = rawData[0];
      let unfilteredLine;
      let currentImage = this._images[this._imageIndex];
      let byteWidth = currentImage.byteWidth;
      if (filter === 0) {
        unfilteredLine = rawData.slice(1, byteWidth + 1);
      } else {
        unfilteredLine = Buffer.alloc(byteWidth);
        switch (filter) {
          case 1:
            this._unFilterType1(rawData, unfilteredLine, byteWidth);
            break;
          case 2:
            this._unFilterType2(rawData, unfilteredLine, byteWidth);
            break;
          case 3:
            this._unFilterType3(rawData, unfilteredLine, byteWidth);
            break;
          case 4:
            this._unFilterType4(rawData, unfilteredLine, byteWidth);
            break;
          default:
            throw new Error("Unrecognised filter type - " + filter);
        }
      }
      this.write(unfilteredLine);
      currentImage.lineIndex++;
      if (currentImage.lineIndex >= currentImage.height) {
        this._lastLine = null;
        this._imageIndex++;
        currentImage = this._images[this._imageIndex];
      } else {
        this._lastLine = unfilteredLine;
      }
      if (currentImage) {
        this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
      } else {
        this._lastLine = null;
        this.complete();
      }
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-parse-async.js
var require_filter_parse_async = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-parse-async.js"(exports, module) {
    "use strict";
    var util2 = __require("util");
    var ChunkStream = require_chunkstream();
    var Filter = require_filter_parse();
    var FilterAsync = module.exports = function(bitmapInfo) {
      ChunkStream.call(this);
      let buffers = [];
      let that = this;
      this._filter = new Filter(bitmapInfo, {
        read: this.read.bind(this),
        write: function(buffer) {
          buffers.push(buffer);
        },
        complete: function() {
          that.emit("complete", Buffer.concat(buffers));
        }
      });
      this._filter.start();
    };
    util2.inherits(FilterAsync, ChunkStream);
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/constants.js
var require_constants2 = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/constants.js"(exports, module) {
    "use strict";
    module.exports = {
      PNG_SIGNATURE: [137, 80, 78, 71, 13, 10, 26, 10],
      TYPE_IHDR: 1229472850,
      TYPE_IEND: 1229278788,
      TYPE_IDAT: 1229209940,
      TYPE_PLTE: 1347179589,
      TYPE_tRNS: 1951551059,
      // eslint-disable-line camelcase
      TYPE_gAMA: 1732332865,
      // eslint-disable-line camelcase
      // color-type bits
      COLORTYPE_GRAYSCALE: 0,
      COLORTYPE_PALETTE: 1,
      COLORTYPE_COLOR: 2,
      COLORTYPE_ALPHA: 4,
      // e.g. grayscale and alpha
      // color-type combinations
      COLORTYPE_PALETTE_COLOR: 3,
      COLORTYPE_COLOR_ALPHA: 6,
      COLORTYPE_TO_BPP_MAP: {
        0: 1,
        2: 3,
        3: 1,
        4: 2,
        6: 4
      },
      GAMMA_DIVISION: 1e5
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/crc.js
var require_crc = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/crc.js"(exports, module) {
    "use strict";
    var crcTable = [];
    (function() {
      for (let i = 0; i < 256; i++) {
        let currentCrc = i;
        for (let j = 0; j < 8; j++) {
          if (currentCrc & 1) {
            currentCrc = 3988292384 ^ currentCrc >>> 1;
          } else {
            currentCrc = currentCrc >>> 1;
          }
        }
        crcTable[i] = currentCrc;
      }
    })();
    var CrcCalculator = module.exports = function() {
      this._crc = -1;
    };
    CrcCalculator.prototype.write = function(data) {
      for (let i = 0; i < data.length; i++) {
        this._crc = crcTable[(this._crc ^ data[i]) & 255] ^ this._crc >>> 8;
      }
      return true;
    };
    CrcCalculator.prototype.crc32 = function() {
      return this._crc ^ -1;
    };
    CrcCalculator.crc32 = function(buf) {
      let crc = -1;
      for (let i = 0; i < buf.length; i++) {
        crc = crcTable[(crc ^ buf[i]) & 255] ^ crc >>> 8;
      }
      return crc ^ -1;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/parser.js
var require_parser = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/parser.js"(exports, module) {
    "use strict";
    var constants = require_constants2();
    var CrcCalculator = require_crc();
    var Parser = module.exports = function(options, dependencies) {
      this._options = options;
      options.checkCRC = options.checkCRC !== false;
      this._hasIHDR = false;
      this._hasIEND = false;
      this._emittedHeadersFinished = false;
      this._palette = [];
      this._colorType = 0;
      this._chunks = {};
      this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
      this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
      this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
      this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
      this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
      this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);
      this.read = dependencies.read;
      this.error = dependencies.error;
      this.metadata = dependencies.metadata;
      this.gamma = dependencies.gamma;
      this.transColor = dependencies.transColor;
      this.palette = dependencies.palette;
      this.parsed = dependencies.parsed;
      this.inflateData = dependencies.inflateData;
      this.finished = dependencies.finished;
      this.simpleTransparency = dependencies.simpleTransparency;
      this.headersFinished = dependencies.headersFinished || function() {
      };
    };
    Parser.prototype.start = function() {
      this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
    };
    Parser.prototype._parseSignature = function(data) {
      let signature = constants.PNG_SIGNATURE;
      for (let i = 0; i < signature.length; i++) {
        if (data[i] !== signature[i]) {
          this.error(new Error("Invalid file signature"));
          return;
        }
      }
      this.read(8, this._parseChunkBegin.bind(this));
    };
    Parser.prototype._parseChunkBegin = function(data) {
      let length = data.readUInt32BE(0);
      let type = data.readUInt32BE(4);
      let name = "";
      for (let i = 4; i < 8; i++) {
        name += String.fromCharCode(data[i]);
      }
      let ancillary = Boolean(data[4] & 32);
      if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
        this.error(new Error("Expected IHDR on beggining"));
        return;
      }
      this._crc = new CrcCalculator();
      this._crc.write(Buffer.from(name));
      if (this._chunks[type]) {
        return this._chunks[type](length);
      }
      if (!ancillary) {
        this.error(new Error("Unsupported critical chunk type " + name));
        return;
      }
      this.read(length + 4, this._skipChunk.bind(this));
    };
    Parser.prototype._skipChunk = function() {
      this.read(8, this._parseChunkBegin.bind(this));
    };
    Parser.prototype._handleChunkEnd = function() {
      this.read(4, this._parseChunkEnd.bind(this));
    };
    Parser.prototype._parseChunkEnd = function(data) {
      let fileCrc = data.readInt32BE(0);
      let calcCrc = this._crc.crc32();
      if (this._options.checkCRC && calcCrc !== fileCrc) {
        this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
        return;
      }
      if (!this._hasIEND) {
        this.read(8, this._parseChunkBegin.bind(this));
      }
    };
    Parser.prototype._handleIHDR = function(length) {
      this.read(length, this._parseIHDR.bind(this));
    };
    Parser.prototype._parseIHDR = function(data) {
      this._crc.write(data);
      let width = data.readUInt32BE(0);
      let height = data.readUInt32BE(4);
      let depth = data[8];
      let colorType = data[9];
      let compr = data[10];
      let filter = data[11];
      let interlace = data[12];
      if (depth !== 8 && depth !== 4 && depth !== 2 && depth !== 1 && depth !== 16) {
        this.error(new Error("Unsupported bit depth " + depth));
        return;
      }
      if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
        this.error(new Error("Unsupported color type"));
        return;
      }
      if (compr !== 0) {
        this.error(new Error("Unsupported compression method"));
        return;
      }
      if (filter !== 0) {
        this.error(new Error("Unsupported filter method"));
        return;
      }
      if (interlace !== 0 && interlace !== 1) {
        this.error(new Error("Unsupported interlace method"));
        return;
      }
      this._colorType = colorType;
      let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];
      this._hasIHDR = true;
      this.metadata({
        width,
        height,
        depth,
        interlace: Boolean(interlace),
        palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
        color: Boolean(colorType & constants.COLORTYPE_COLOR),
        alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
        bpp,
        colorType
      });
      this._handleChunkEnd();
    };
    Parser.prototype._handlePLTE = function(length) {
      this.read(length, this._parsePLTE.bind(this));
    };
    Parser.prototype._parsePLTE = function(data) {
      this._crc.write(data);
      let entries = Math.floor(data.length / 3);
      for (let i = 0; i < entries; i++) {
        this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 255]);
      }
      this.palette(this._palette);
      this._handleChunkEnd();
    };
    Parser.prototype._handleTRNS = function(length) {
      this.simpleTransparency();
      this.read(length, this._parseTRNS.bind(this));
    };
    Parser.prototype._parseTRNS = function(data) {
      this._crc.write(data);
      if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
        if (this._palette.length === 0) {
          this.error(new Error("Transparency chunk must be after palette"));
          return;
        }
        if (data.length > this._palette.length) {
          this.error(new Error("More transparent colors than palette size"));
          return;
        }
        for (let i = 0; i < data.length; i++) {
          this._palette[i][3] = data[i];
        }
        this.palette(this._palette);
      }
      if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
        this.transColor([data.readUInt16BE(0)]);
      }
      if (this._colorType === constants.COLORTYPE_COLOR) {
        this.transColor([
          data.readUInt16BE(0),
          data.readUInt16BE(2),
          data.readUInt16BE(4)
        ]);
      }
      this._handleChunkEnd();
    };
    Parser.prototype._handleGAMA = function(length) {
      this.read(length, this._parseGAMA.bind(this));
    };
    Parser.prototype._parseGAMA = function(data) {
      this._crc.write(data);
      this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);
      this._handleChunkEnd();
    };
    Parser.prototype._handleIDAT = function(length) {
      if (!this._emittedHeadersFinished) {
        this._emittedHeadersFinished = true;
        this.headersFinished();
      }
      this.read(-length, this._parseIDAT.bind(this, length));
    };
    Parser.prototype._parseIDAT = function(length, data) {
      this._crc.write(data);
      if (this._colorType === constants.COLORTYPE_PALETTE_COLOR && this._palette.length === 0) {
        throw new Error("Expected palette not found");
      }
      this.inflateData(data);
      let leftOverLength = length - data.length;
      if (leftOverLength > 0) {
        this._handleIDAT(leftOverLength);
      } else {
        this._handleChunkEnd();
      }
    };
    Parser.prototype._handleIEND = function(length) {
      this.read(length, this._parseIEND.bind(this));
    };
    Parser.prototype._parseIEND = function(data) {
      this._crc.write(data);
      this._hasIEND = true;
      this._handleChunkEnd();
      if (this.finished) {
        this.finished();
      }
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/bitmapper.js
var require_bitmapper = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/bitmapper.js"(exports) {
    "use strict";
    var interlaceUtils = require_interlace();
    var pixelBppMapper = [
      // 0 - dummy entry
      function() {
      },
      // 1 - L
      // 0: 0, 1: 0, 2: 0, 3: 0xff
      function(pxData, data, pxPos, rawPos) {
        if (rawPos === data.length) {
          throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = 255;
      },
      // 2 - LA
      // 0: 0, 1: 0, 2: 0, 3: 1
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 1 >= data.length) {
          throw new Error("Ran out of data");
        }
        let pixel = data[rawPos];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = data[rawPos + 1];
      },
      // 3 - RGB
      // 0: 0, 1: 1, 2: 2, 3: 0xff
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 2 >= data.length) {
          throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = 255;
      },
      // 4 - RGBA
      // 0: 0, 1: 1, 2: 2, 3: 3
      function(pxData, data, pxPos, rawPos) {
        if (rawPos + 3 >= data.length) {
          throw new Error("Ran out of data");
        }
        pxData[pxPos] = data[rawPos];
        pxData[pxPos + 1] = data[rawPos + 1];
        pxData[pxPos + 2] = data[rawPos + 2];
        pxData[pxPos + 3] = data[rawPos + 3];
      }
    ];
    var pixelBppCustomMapper = [
      // 0 - dummy entry
      function() {
      },
      // 1 - L
      // 0: 0, 1: 0, 2: 0, 3: 0xff
      function(pxData, pixelData, pxPos, maxBit) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = maxBit;
      },
      // 2 - LA
      // 0: 0, 1: 0, 2: 0, 3: 1
      function(pxData, pixelData, pxPos) {
        let pixel = pixelData[0];
        pxData[pxPos] = pixel;
        pxData[pxPos + 1] = pixel;
        pxData[pxPos + 2] = pixel;
        pxData[pxPos + 3] = pixelData[1];
      },
      // 3 - RGB
      // 0: 0, 1: 1, 2: 2, 3: 0xff
      function(pxData, pixelData, pxPos, maxBit) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = maxBit;
      },
      // 4 - RGBA
      // 0: 0, 1: 1, 2: 2, 3: 3
      function(pxData, pixelData, pxPos) {
        pxData[pxPos] = pixelData[0];
        pxData[pxPos + 1] = pixelData[1];
        pxData[pxPos + 2] = pixelData[2];
        pxData[pxPos + 3] = pixelData[3];
      }
    ];
    function bitRetriever(data, depth) {
      let leftOver = [];
      let i = 0;
      function split() {
        if (i === data.length) {
          throw new Error("Ran out of data");
        }
        let byte = data[i];
        i++;
        let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
        switch (depth) {
          default:
            throw new Error("unrecognised depth");
          case 16:
            byte2 = data[i];
            i++;
            leftOver.push((byte << 8) + byte2);
            break;
          case 4:
            byte2 = byte & 15;
            byte1 = byte >> 4;
            leftOver.push(byte1, byte2);
            break;
          case 2:
            byte4 = byte & 3;
            byte3 = byte >> 2 & 3;
            byte2 = byte >> 4 & 3;
            byte1 = byte >> 6 & 3;
            leftOver.push(byte1, byte2, byte3, byte4);
            break;
          case 1:
            byte8 = byte & 1;
            byte7 = byte >> 1 & 1;
            byte6 = byte >> 2 & 1;
            byte5 = byte >> 3 & 1;
            byte4 = byte >> 4 & 1;
            byte3 = byte >> 5 & 1;
            byte2 = byte >> 6 & 1;
            byte1 = byte >> 7 & 1;
            leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
            break;
        }
      }
      return {
        get: function(count) {
          while (leftOver.length < count) {
            split();
          }
          let returner = leftOver.slice(0, count);
          leftOver = leftOver.slice(count);
          return returner;
        },
        resetAfterLine: function() {
          leftOver.length = 0;
        },
        end: function() {
          if (i !== data.length) {
            throw new Error("extra data found");
          }
        }
      };
    }
    function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
      let imageWidth = image.width;
      let imageHeight = image.height;
      let imagePass = image.index;
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          let pxPos = getPxPos(x, y, imagePass);
          pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
          rawPos += bpp;
        }
      }
      return rawPos;
    }
    function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
      let imageWidth = image.width;
      let imageHeight = image.height;
      let imagePass = image.index;
      for (let y = 0; y < imageHeight; y++) {
        for (let x = 0; x < imageWidth; x++) {
          let pixelData = bits.get(bpp);
          let pxPos = getPxPos(x, y, imagePass);
          pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
        }
        bits.resetAfterLine();
      }
    }
    exports.dataToBitMap = function(data, bitmapInfo) {
      let width = bitmapInfo.width;
      let height = bitmapInfo.height;
      let depth = bitmapInfo.depth;
      let bpp = bitmapInfo.bpp;
      let interlace = bitmapInfo.interlace;
      let bits;
      if (depth !== 8) {
        bits = bitRetriever(data, depth);
      }
      let pxData;
      if (depth <= 8) {
        pxData = Buffer.alloc(width * height * 4);
      } else {
        pxData = new Uint16Array(width * height * 4);
      }
      let maxBit = Math.pow(2, depth) - 1;
      let rawPos = 0;
      let images;
      let getPxPos;
      if (interlace) {
        images = interlaceUtils.getImagePasses(width, height);
        getPxPos = interlaceUtils.getInterlaceIterator(width, height);
      } else {
        let nonInterlacedPxPos = 0;
        getPxPos = function() {
          let returner = nonInterlacedPxPos;
          nonInterlacedPxPos += 4;
          return returner;
        };
        images = [{ width, height }];
      }
      for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
        if (depth === 8) {
          rawPos = mapImage8Bit(
            images[imageIndex],
            pxData,
            getPxPos,
            bpp,
            data,
            rawPos
          );
        } else {
          mapImageCustomBit(
            images[imageIndex],
            pxData,
            getPxPos,
            bpp,
            bits,
            maxBit
          );
        }
      }
      if (depth === 8) {
        if (rawPos !== data.length) {
          throw new Error("extra data found");
        }
      } else {
        bits.end();
      }
      return pxData;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/format-normaliser.js
var require_format_normaliser = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/format-normaliser.js"(exports, module) {
    "use strict";
    function dePalette(indata, outdata, width, height, palette) {
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let color = palette[indata[pxPos]];
          if (!color) {
            throw new Error("index " + indata[pxPos] + " not in palette");
          }
          for (let i = 0; i < 4; i++) {
            outdata[pxPos + i] = color[i];
          }
          pxPos += 4;
        }
      }
    }
    function replaceTransparentColor(indata, outdata, width, height, transColor) {
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let makeTrans = false;
          if (transColor.length === 1) {
            if (transColor[0] === indata[pxPos]) {
              makeTrans = true;
            }
          } else if (transColor[0] === indata[pxPos] && transColor[1] === indata[pxPos + 1] && transColor[2] === indata[pxPos + 2]) {
            makeTrans = true;
          }
          if (makeTrans) {
            for (let i = 0; i < 4; i++) {
              outdata[pxPos + i] = 0;
            }
          }
          pxPos += 4;
        }
      }
    }
    function scaleDepth(indata, outdata, width, height, depth) {
      let maxOutSample = 255;
      let maxInSample = Math.pow(2, depth) - 1;
      let pxPos = 0;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          for (let i = 0; i < 4; i++) {
            outdata[pxPos + i] = Math.floor(
              indata[pxPos + i] * maxOutSample / maxInSample + 0.5
            );
          }
          pxPos += 4;
        }
      }
    }
    module.exports = function(indata, imageData) {
      let depth = imageData.depth;
      let width = imageData.width;
      let height = imageData.height;
      let colorType = imageData.colorType;
      let transColor = imageData.transColor;
      let palette = imageData.palette;
      let outdata = indata;
      if (colorType === 3) {
        dePalette(indata, outdata, width, height, palette);
      } else {
        if (transColor) {
          replaceTransparentColor(indata, outdata, width, height, transColor);
        }
        if (depth !== 8) {
          if (depth === 16) {
            outdata = Buffer.alloc(width * height * 4);
          }
          scaleDepth(indata, outdata, width, height, depth);
        }
      }
      return outdata;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/parser-async.js
var require_parser_async = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/parser-async.js"(exports, module) {
    "use strict";
    var util2 = __require("util");
    var zlib = __require("zlib");
    var ChunkStream = require_chunkstream();
    var FilterAsync = require_filter_parse_async();
    var Parser = require_parser();
    var bitmapper = require_bitmapper();
    var formatNormaliser = require_format_normaliser();
    var ParserAsync = module.exports = function(options) {
      ChunkStream.call(this);
      this._parser = new Parser(options, {
        read: this.read.bind(this),
        error: this._handleError.bind(this),
        metadata: this._handleMetaData.bind(this),
        gamma: this.emit.bind(this, "gamma"),
        palette: this._handlePalette.bind(this),
        transColor: this._handleTransColor.bind(this),
        finished: this._finished.bind(this),
        inflateData: this._inflateData.bind(this),
        simpleTransparency: this._simpleTransparency.bind(this),
        headersFinished: this._headersFinished.bind(this)
      });
      this._options = options;
      this.writable = true;
      this._parser.start();
    };
    util2.inherits(ParserAsync, ChunkStream);
    ParserAsync.prototype._handleError = function(err) {
      this.emit("error", err);
      this.writable = false;
      this.destroy();
      if (this._inflate && this._inflate.destroy) {
        this._inflate.destroy();
      }
      if (this._filter) {
        this._filter.destroy();
        this._filter.on("error", function() {
        });
      }
      this.errord = true;
    };
    ParserAsync.prototype._inflateData = function(data) {
      if (!this._inflate) {
        if (this._bitmapInfo.interlace) {
          this._inflate = zlib.createInflate();
          this._inflate.on("error", this.emit.bind(this, "error"));
          this._filter.on("complete", this._complete.bind(this));
          this._inflate.pipe(this._filter);
        } else {
          let rowSize = (this._bitmapInfo.width * this._bitmapInfo.bpp * this._bitmapInfo.depth + 7 >> 3) + 1;
          let imageSize = rowSize * this._bitmapInfo.height;
          let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);
          this._inflate = zlib.createInflate({ chunkSize });
          let leftToInflate = imageSize;
          let emitError = this.emit.bind(this, "error");
          this._inflate.on("error", function(err) {
            if (!leftToInflate) {
              return;
            }
            emitError(err);
          });
          this._filter.on("complete", this._complete.bind(this));
          let filterWrite = this._filter.write.bind(this._filter);
          this._inflate.on("data", function(chunk) {
            if (!leftToInflate) {
              return;
            }
            if (chunk.length > leftToInflate) {
              chunk = chunk.slice(0, leftToInflate);
            }
            leftToInflate -= chunk.length;
            filterWrite(chunk);
          });
          this._inflate.on("end", this._filter.end.bind(this._filter));
        }
      }
      this._inflate.write(data);
    };
    ParserAsync.prototype._handleMetaData = function(metaData) {
      this._metaData = metaData;
      this._bitmapInfo = Object.create(metaData);
      this._filter = new FilterAsync(this._bitmapInfo);
    };
    ParserAsync.prototype._handleTransColor = function(transColor) {
      this._bitmapInfo.transColor = transColor;
    };
    ParserAsync.prototype._handlePalette = function(palette) {
      this._bitmapInfo.palette = palette;
    };
    ParserAsync.prototype._simpleTransparency = function() {
      this._metaData.alpha = true;
    };
    ParserAsync.prototype._headersFinished = function() {
      this.emit("metadata", this._metaData);
    };
    ParserAsync.prototype._finished = function() {
      if (this.errord) {
        return;
      }
      if (!this._inflate) {
        this.emit("error", "No Inflate block");
      } else {
        this._inflate.end();
      }
    };
    ParserAsync.prototype._complete = function(filteredData) {
      if (this.errord) {
        return;
      }
      let normalisedBitmapData;
      try {
        let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);
        normalisedBitmapData = formatNormaliser(bitmapData, this._bitmapInfo);
        bitmapData = null;
      } catch (ex) {
        this._handleError(ex);
        return;
      }
      this.emit("parsed", normalisedBitmapData);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/bitpacker.js
var require_bitpacker = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/bitpacker.js"(exports, module) {
    "use strict";
    var constants = require_constants2();
    module.exports = function(dataIn, width, height, options) {
      let outHasAlpha = [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(
        options.colorType
      ) !== -1;
      if (options.colorType === options.inputColorType) {
        let bigEndian = function() {
          let buffer = new ArrayBuffer(2);
          new DataView(buffer).setInt16(
            0,
            256,
            true
            /* littleEndian */
          );
          return new Int16Array(buffer)[0] !== 256;
        }();
        if (options.bitDepth === 8 || options.bitDepth === 16 && bigEndian) {
          return dataIn;
        }
      }
      let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);
      let maxValue = 255;
      let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
      if (inBpp === 4 && !options.inputHasAlpha) {
        inBpp = 3;
      }
      let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
      if (options.bitDepth === 16) {
        maxValue = 65535;
        outBpp *= 2;
      }
      let outData = Buffer.alloc(width * height * outBpp);
      let inIndex = 0;
      let outIndex = 0;
      let bgColor = options.bgColor || {};
      if (bgColor.red === void 0) {
        bgColor.red = maxValue;
      }
      if (bgColor.green === void 0) {
        bgColor.green = maxValue;
      }
      if (bgColor.blue === void 0) {
        bgColor.blue = maxValue;
      }
      function getRGBA() {
        let red;
        let green;
        let blue;
        let alpha = maxValue;
        switch (options.inputColorType) {
          case constants.COLORTYPE_COLOR_ALPHA:
            alpha = data[inIndex + 3];
            red = data[inIndex];
            green = data[inIndex + 1];
            blue = data[inIndex + 2];
            break;
          case constants.COLORTYPE_COLOR:
            red = data[inIndex];
            green = data[inIndex + 1];
            blue = data[inIndex + 2];
            break;
          case constants.COLORTYPE_ALPHA:
            alpha = data[inIndex + 1];
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          case constants.COLORTYPE_GRAYSCALE:
            red = data[inIndex];
            green = red;
            blue = red;
            break;
          default:
            throw new Error(
              "input color type:" + options.inputColorType + " is not supported at present"
            );
        }
        if (options.inputHasAlpha) {
          if (!outHasAlpha) {
            alpha /= maxValue;
            red = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0),
              maxValue
            );
            green = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0),
              maxValue
            );
            blue = Math.min(
              Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0),
              maxValue
            );
          }
        }
        return { red, green, blue, alpha };
      }
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let rgba = getRGBA(data, inIndex);
          switch (options.colorType) {
            case constants.COLORTYPE_COLOR_ALPHA:
            case constants.COLORTYPE_COLOR:
              if (options.bitDepth === 8) {
                outData[outIndex] = rgba.red;
                outData[outIndex + 1] = rgba.green;
                outData[outIndex + 2] = rgba.blue;
                if (outHasAlpha) {
                  outData[outIndex + 3] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(rgba.red, outIndex);
                outData.writeUInt16BE(rgba.green, outIndex + 2);
                outData.writeUInt16BE(rgba.blue, outIndex + 4);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 6);
                }
              }
              break;
            case constants.COLORTYPE_ALPHA:
            case constants.COLORTYPE_GRAYSCALE: {
              let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
              if (options.bitDepth === 8) {
                outData[outIndex] = grayscale;
                if (outHasAlpha) {
                  outData[outIndex + 1] = rgba.alpha;
                }
              } else {
                outData.writeUInt16BE(grayscale, outIndex);
                if (outHasAlpha) {
                  outData.writeUInt16BE(rgba.alpha, outIndex + 2);
                }
              }
              break;
            }
            default:
              throw new Error("unrecognised color Type " + options.colorType);
          }
          inIndex += inBpp;
          outIndex += outBpp;
        }
      }
      return outData;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-pack.js
var require_filter_pack = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-pack.js"(exports, module) {
    "use strict";
    var paethPredictor = require_paeth_predictor();
    function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
      for (let x = 0; x < byteWidth; x++) {
        rawData[rawPos + x] = pxData[pxPos + x];
      }
    }
    function filterSumNone(pxData, pxPos, byteWidth) {
      let sum = 0;
      let length = pxPos + byteWidth;
      for (let i = pxPos; i < length; i++) {
        sum += Math.abs(pxData[i]);
      }
      return sum;
    }
    function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        rawData[rawPos + x] = val;
      }
    }
    function filterSumSub(pxData, pxPos, byteWidth, bpp) {
      let sum = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let val = pxData[pxPos + x] - left;
        sum += Math.abs(val);
      }
      return sum;
    }
    function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
      for (let x = 0; x < byteWidth; x++) {
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - up;
        rawData[rawPos + x] = val;
      }
    }
    function filterSumUp(pxData, pxPos, byteWidth) {
      let sum = 0;
      let length = pxPos + byteWidth;
      for (let x = pxPos; x < length; x++) {
        let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
        let val = pxData[x] - up;
        sum += Math.abs(val);
      }
      return sum;
    }
    function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        rawData[rawPos + x] = val;
      }
    }
    function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
      let sum = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let val = pxData[pxPos + x] - (left + up >> 1);
        sum += Math.abs(val);
      }
      return sum;
    }
    function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        rawData[rawPos + x] = val;
      }
    }
    function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
      let sum = 0;
      for (let x = 0; x < byteWidth; x++) {
        let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
        let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
        let upleft = pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
        let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);
        sum += Math.abs(val);
      }
      return sum;
    }
    var filters = {
      0: filterNone,
      1: filterSub,
      2: filterUp,
      3: filterAvg,
      4: filterPaeth
    };
    var filterSums = {
      0: filterSumNone,
      1: filterSumSub,
      2: filterSumUp,
      3: filterSumAvg,
      4: filterSumPaeth
    };
    module.exports = function(pxData, width, height, options, bpp) {
      let filterTypes;
      if (!("filterType" in options) || options.filterType === -1) {
        filterTypes = [0, 1, 2, 3, 4];
      } else if (typeof options.filterType === "number") {
        filterTypes = [options.filterType];
      } else {
        throw new Error("unrecognised filter types");
      }
      if (options.bitDepth === 16) {
        bpp *= 2;
      }
      let byteWidth = width * bpp;
      let rawPos = 0;
      let pxPos = 0;
      let rawData = Buffer.alloc((byteWidth + 1) * height);
      let sel = filterTypes[0];
      for (let y = 0; y < height; y++) {
        if (filterTypes.length > 1) {
          let min = Infinity;
          for (let i = 0; i < filterTypes.length; i++) {
            let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
            if (sum < min) {
              sel = filterTypes[i];
              min = sum;
            }
          }
        }
        rawData[rawPos] = sel;
        rawPos++;
        filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
        rawPos += byteWidth;
        pxPos += byteWidth;
      }
      return rawData;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/packer.js
var require_packer = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/packer.js"(exports, module) {
    "use strict";
    var constants = require_constants2();
    var CrcStream = require_crc();
    var bitPacker = require_bitpacker();
    var filter = require_filter_pack();
    var zlib = __require("zlib");
    var Packer = module.exports = function(options) {
      this._options = options;
      options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
      options.deflateLevel = options.deflateLevel != null ? options.deflateLevel : 9;
      options.deflateStrategy = options.deflateStrategy != null ? options.deflateStrategy : 3;
      options.inputHasAlpha = options.inputHasAlpha != null ? options.inputHasAlpha : true;
      options.deflateFactory = options.deflateFactory || zlib.createDeflate;
      options.bitDepth = options.bitDepth || 8;
      options.colorType = typeof options.colorType === "number" ? options.colorType : constants.COLORTYPE_COLOR_ALPHA;
      options.inputColorType = typeof options.inputColorType === "number" ? options.inputColorType : constants.COLORTYPE_COLOR_ALPHA;
      if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
      ].indexOf(options.colorType) === -1) {
        throw new Error(
          "option color type:" + options.colorType + " is not supported at present"
        );
      }
      if ([
        constants.COLORTYPE_GRAYSCALE,
        constants.COLORTYPE_COLOR,
        constants.COLORTYPE_COLOR_ALPHA,
        constants.COLORTYPE_ALPHA
      ].indexOf(options.inputColorType) === -1) {
        throw new Error(
          "option input color type:" + options.inputColorType + " is not supported at present"
        );
      }
      if (options.bitDepth !== 8 && options.bitDepth !== 16) {
        throw new Error(
          "option bit depth:" + options.bitDepth + " is not supported at present"
        );
      }
    };
    Packer.prototype.getDeflateOptions = function() {
      return {
        chunkSize: this._options.deflateChunkSize,
        level: this._options.deflateLevel,
        strategy: this._options.deflateStrategy
      };
    };
    Packer.prototype.createDeflate = function() {
      return this._options.deflateFactory(this.getDeflateOptions());
    };
    Packer.prototype.filterData = function(data, width, height) {
      let packedData = bitPacker(data, width, height, this._options);
      let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
      let filteredData = filter(packedData, width, height, this._options, bpp);
      return filteredData;
    };
    Packer.prototype._packChunk = function(type, data) {
      let len = data ? data.length : 0;
      let buf = Buffer.alloc(len + 12);
      buf.writeUInt32BE(len, 0);
      buf.writeUInt32BE(type, 4);
      if (data) {
        data.copy(buf, 8);
      }
      buf.writeInt32BE(
        CrcStream.crc32(buf.slice(4, buf.length - 4)),
        buf.length - 4
      );
      return buf;
    };
    Packer.prototype.packGAMA = function(gamma) {
      let buf = Buffer.alloc(4);
      buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
      return this._packChunk(constants.TYPE_gAMA, buf);
    };
    Packer.prototype.packIHDR = function(width, height) {
      let buf = Buffer.alloc(13);
      buf.writeUInt32BE(width, 0);
      buf.writeUInt32BE(height, 4);
      buf[8] = this._options.bitDepth;
      buf[9] = this._options.colorType;
      buf[10] = 0;
      buf[11] = 0;
      buf[12] = 0;
      return this._packChunk(constants.TYPE_IHDR, buf);
    };
    Packer.prototype.packIDAT = function(data) {
      return this._packChunk(constants.TYPE_IDAT, data);
    };
    Packer.prototype.packIEND = function() {
      return this._packChunk(constants.TYPE_IEND, null);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/packer-async.js
var require_packer_async = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/packer-async.js"(exports, module) {
    "use strict";
    var util2 = __require("util");
    var Stream = __require("stream");
    var constants = require_constants2();
    var Packer = require_packer();
    var PackerAsync = module.exports = function(opt) {
      Stream.call(this);
      let options = opt || {};
      this._packer = new Packer(options);
      this._deflate = this._packer.createDeflate();
      this.readable = true;
    };
    util2.inherits(PackerAsync, Stream);
    PackerAsync.prototype.pack = function(data, width, height, gamma) {
      this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
      this.emit("data", this._packer.packIHDR(width, height));
      if (gamma) {
        this.emit("data", this._packer.packGAMA(gamma));
      }
      let filteredData = this._packer.filterData(data, width, height);
      this._deflate.on("error", this.emit.bind(this, "error"));
      this._deflate.on(
        "data",
        function(compressedData) {
          this.emit("data", this._packer.packIDAT(compressedData));
        }.bind(this)
      );
      this._deflate.on(
        "end",
        function() {
          this.emit("data", this._packer.packIEND());
          this.emit("end");
        }.bind(this)
      );
      this._deflate.end(filteredData);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/sync-inflate.js
var require_sync_inflate = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/sync-inflate.js"(exports, module) {
    "use strict";
    var assert = __require("assert").ok;
    var zlib = __require("zlib");
    var util2 = __require("util");
    var kMaxLength = __require("buffer").kMaxLength;
    function Inflate(opts) {
      if (!(this instanceof Inflate)) {
        return new Inflate(opts);
      }
      if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
        opts.chunkSize = zlib.Z_MIN_CHUNK;
      }
      zlib.Inflate.call(this, opts);
      this._offset = this._offset === void 0 ? this._outOffset : this._offset;
      this._buffer = this._buffer || this._outBuffer;
      if (opts && opts.maxLength != null) {
        this._maxLength = opts.maxLength;
      }
    }
    function createInflate(opts) {
      return new Inflate(opts);
    }
    function _close(engine, callback) {
      if (callback) {
        process.nextTick(callback);
      }
      if (!engine._handle) {
        return;
      }
      engine._handle.close();
      engine._handle = null;
    }
    Inflate.prototype._processChunk = function(chunk, flushFlag, asyncCb) {
      if (typeof asyncCb === "function") {
        return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
      }
      let self = this;
      let availInBefore = chunk && chunk.length;
      let availOutBefore = this._chunkSize - this._offset;
      let leftToInflate = this._maxLength;
      let inOff = 0;
      let buffers = [];
      let nread = 0;
      let error;
      this.on("error", function(err) {
        error = err;
      });
      function handleChunk(availInAfter, availOutAfter) {
        if (self._hadError) {
          return;
        }
        let have = availOutBefore - availOutAfter;
        assert(have >= 0, "have should not go down");
        if (have > 0) {
          let out = self._buffer.slice(self._offset, self._offset + have);
          self._offset += have;
          if (out.length > leftToInflate) {
            out = out.slice(0, leftToInflate);
          }
          buffers.push(out);
          nread += out.length;
          leftToInflate -= out.length;
          if (leftToInflate === 0) {
            return false;
          }
        }
        if (availOutAfter === 0 || self._offset >= self._chunkSize) {
          availOutBefore = self._chunkSize;
          self._offset = 0;
          self._buffer = Buffer.allocUnsafe(self._chunkSize);
        }
        if (availOutAfter === 0) {
          inOff += availInBefore - availInAfter;
          availInBefore = availInAfter;
          return true;
        }
        return false;
      }
      assert(this._handle, "zlib binding closed");
      let res;
      do {
        res = this._handle.writeSync(
          flushFlag,
          chunk,
          // in
          inOff,
          // in_off
          availInBefore,
          // in_len
          this._buffer,
          // out
          this._offset,
          //out_off
          availOutBefore
        );
        res = res || this._writeState;
      } while (!this._hadError && handleChunk(res[0], res[1]));
      if (this._hadError) {
        throw error;
      }
      if (nread >= kMaxLength) {
        _close(this);
        throw new RangeError(
          "Cannot create final Buffer. It would be larger than 0x" + kMaxLength.toString(16) + " bytes"
        );
      }
      let buf = Buffer.concat(buffers, nread);
      _close(this);
      return buf;
    };
    util2.inherits(Inflate, zlib.Inflate);
    function zlibBufferSync(engine, buffer) {
      if (typeof buffer === "string") {
        buffer = Buffer.from(buffer);
      }
      if (!(buffer instanceof Buffer)) {
        throw new TypeError("Not a string or buffer");
      }
      let flushFlag = engine._finishFlushFlag;
      if (flushFlag == null) {
        flushFlag = zlib.Z_FINISH;
      }
      return engine._processChunk(buffer, flushFlag);
    }
    function inflateSync(buffer, opts) {
      return zlibBufferSync(new Inflate(opts), buffer);
    }
    module.exports = exports = inflateSync;
    exports.Inflate = Inflate;
    exports.createInflate = createInflate;
    exports.inflateSync = inflateSync;
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/sync-reader.js
var require_sync_reader = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/sync-reader.js"(exports, module) {
    "use strict";
    var SyncReader = module.exports = function(buffer) {
      this._buffer = buffer;
      this._reads = [];
    };
    SyncReader.prototype.read = function(length, callback) {
      this._reads.push({
        length: Math.abs(length),
        // if length < 0 then at most this length
        allowLess: length < 0,
        func: callback
      });
    };
    SyncReader.prototype.process = function() {
      while (this._reads.length > 0 && this._buffer.length) {
        let read = this._reads[0];
        if (this._buffer.length && (this._buffer.length >= read.length || read.allowLess)) {
          this._reads.shift();
          let buf = this._buffer;
          this._buffer = buf.slice(read.length);
          read.func.call(this, buf.slice(0, read.length));
        } else {
          break;
        }
      }
      if (this._reads.length > 0) {
        return new Error("There are some read requests waitng on finished stream");
      }
      if (this._buffer.length > 0) {
        return new Error("unrecognised content at end of stream");
      }
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-parse-sync.js
var require_filter_parse_sync = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/filter-parse-sync.js"(exports) {
    "use strict";
    var SyncReader = require_sync_reader();
    var Filter = require_filter_parse();
    exports.process = function(inBuffer, bitmapInfo) {
      let outBuffers = [];
      let reader = new SyncReader(inBuffer);
      let filter = new Filter(bitmapInfo, {
        read: reader.read.bind(reader),
        write: function(bufferPart) {
          outBuffers.push(bufferPart);
        },
        complete: function() {
        }
      });
      filter.start();
      reader.process();
      return Buffer.concat(outBuffers);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/parser-sync.js
var require_parser_sync = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/parser-sync.js"(exports, module) {
    "use strict";
    var hasSyncZlib = true;
    var zlib = __require("zlib");
    var inflateSync = require_sync_inflate();
    if (!zlib.deflateSync) {
      hasSyncZlib = false;
    }
    var SyncReader = require_sync_reader();
    var FilterSync = require_filter_parse_sync();
    var Parser = require_parser();
    var bitmapper = require_bitmapper();
    var formatNormaliser = require_format_normaliser();
    module.exports = function(buffer, options) {
      if (!hasSyncZlib) {
        throw new Error(
          "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
        );
      }
      let err;
      function handleError2(_err_) {
        err = _err_;
      }
      let metaData;
      function handleMetaData(_metaData_) {
        metaData = _metaData_;
      }
      function handleTransColor(transColor) {
        metaData.transColor = transColor;
      }
      function handlePalette(palette) {
        metaData.palette = palette;
      }
      function handleSimpleTransparency() {
        metaData.alpha = true;
      }
      let gamma;
      function handleGamma(_gamma_) {
        gamma = _gamma_;
      }
      let inflateDataList = [];
      function handleInflateData(inflatedData2) {
        inflateDataList.push(inflatedData2);
      }
      let reader = new SyncReader(buffer);
      let parser = new Parser(options, {
        read: reader.read.bind(reader),
        error: handleError2,
        metadata: handleMetaData,
        gamma: handleGamma,
        palette: handlePalette,
        transColor: handleTransColor,
        inflateData: handleInflateData,
        simpleTransparency: handleSimpleTransparency
      });
      parser.start();
      reader.process();
      if (err) {
        throw err;
      }
      let inflateData = Buffer.concat(inflateDataList);
      inflateDataList.length = 0;
      let inflatedData;
      if (metaData.interlace) {
        inflatedData = zlib.inflateSync(inflateData);
      } else {
        let rowSize = (metaData.width * metaData.bpp * metaData.depth + 7 >> 3) + 1;
        let imageSize = rowSize * metaData.height;
        inflatedData = inflateSync(inflateData, {
          chunkSize: imageSize,
          maxLength: imageSize
        });
      }
      inflateData = null;
      if (!inflatedData || !inflatedData.length) {
        throw new Error("bad png - invalid inflate data response");
      }
      let unfilteredData = FilterSync.process(inflatedData, metaData);
      inflateData = null;
      let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
      unfilteredData = null;
      let normalisedBitmapData = formatNormaliser(bitmapData, metaData);
      metaData.data = normalisedBitmapData;
      metaData.gamma = gamma || 0;
      return metaData;
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/packer-sync.js
var require_packer_sync = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/packer-sync.js"(exports, module) {
    "use strict";
    var hasSyncZlib = true;
    var zlib = __require("zlib");
    if (!zlib.deflateSync) {
      hasSyncZlib = false;
    }
    var constants = require_constants2();
    var Packer = require_packer();
    module.exports = function(metaData, opt) {
      if (!hasSyncZlib) {
        throw new Error(
          "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
        );
      }
      let options = opt || {};
      let packer = new Packer(options);
      let chunks = [];
      chunks.push(Buffer.from(constants.PNG_SIGNATURE));
      chunks.push(packer.packIHDR(metaData.width, metaData.height));
      if (metaData.gamma) {
        chunks.push(packer.packGAMA(metaData.gamma));
      }
      let filteredData = packer.filterData(
        metaData.data,
        metaData.width,
        metaData.height
      );
      let compressedData = zlib.deflateSync(
        filteredData,
        packer.getDeflateOptions()
      );
      filteredData = null;
      if (!compressedData || !compressedData.length) {
        throw new Error("bad png - invalid compressed data response");
      }
      chunks.push(packer.packIDAT(compressedData));
      chunks.push(packer.packIEND());
      return Buffer.concat(chunks);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/png-sync.js
var require_png_sync = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/png-sync.js"(exports) {
    "use strict";
    var parse2 = require_parser_sync();
    var pack = require_packer_sync();
    exports.read = function(buffer, options) {
      return parse2(buffer, options || {});
    };
    exports.write = function(png, options) {
      return pack(png, options);
    };
  }
});

// node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/png.js
var require_png = __commonJS({
  "node_modules/.pnpm/pngjs@5.0.0/node_modules/pngjs/lib/png.js"(exports) {
    "use strict";
    var util2 = __require("util");
    var Stream = __require("stream");
    var Parser = require_parser_async();
    var Packer = require_packer_async();
    var PNGSync = require_png_sync();
    var PNG = exports.PNG = function(options) {
      Stream.call(this);
      options = options || {};
      this.width = options.width | 0;
      this.height = options.height | 0;
      this.data = this.width > 0 && this.height > 0 ? Buffer.alloc(4 * this.width * this.height) : null;
      if (options.fill && this.data) {
        this.data.fill(0);
      }
      this.gamma = 0;
      this.readable = this.writable = true;
      this._parser = new Parser(options);
      this._parser.on("error", this.emit.bind(this, "error"));
      this._parser.on("close", this._handleClose.bind(this));
      this._parser.on("metadata", this._metadata.bind(this));
      this._parser.on("gamma", this._gamma.bind(this));
      this._parser.on(
        "parsed",
        function(data) {
          this.data = data;
          this.emit("parsed", data);
        }.bind(this)
      );
      this._packer = new Packer(options);
      this._packer.on("data", this.emit.bind(this, "data"));
      this._packer.on("end", this.emit.bind(this, "end"));
      this._parser.on("close", this._handleClose.bind(this));
      this._packer.on("error", this.emit.bind(this, "error"));
    };
    util2.inherits(PNG, Stream);
    PNG.sync = PNGSync;
    PNG.prototype.pack = function() {
      if (!this.data || !this.data.length) {
        this.emit("error", "No data provided");
        return this;
      }
      process.nextTick(
        function() {
          this._packer.pack(this.data, this.width, this.height, this.gamma);
        }.bind(this)
      );
      return this;
    };
    PNG.prototype.parse = function(data, callback) {
      if (callback) {
        let onParsed, onError;
        onParsed = function(parsedData) {
          this.removeListener("error", onError);
          this.data = parsedData;
          callback(null, this);
        }.bind(this);
        onError = function(err) {
          this.removeListener("parsed", onParsed);
          callback(err, null);
        }.bind(this);
        this.once("parsed", onParsed);
        this.once("error", onError);
      }
      this.end(data);
      return this;
    };
    PNG.prototype.write = function(data) {
      this._parser.write(data);
      return true;
    };
    PNG.prototype.end = function(data) {
      this._parser.end(data);
    };
    PNG.prototype._metadata = function(metadata) {
      this.width = metadata.width;
      this.height = metadata.height;
      this.emit("metadata", metadata);
    };
    PNG.prototype._gamma = function(gamma) {
      this.gamma = gamma;
    };
    PNG.prototype._handleClose = function() {
      if (!this._parser.writable && !this._packer.readable) {
        this.emit("close");
      }
    };
    PNG.bitblt = function(src, dst, srcX, srcY, width, height, deltaX, deltaY) {
      srcX |= 0;
      srcY |= 0;
      width |= 0;
      height |= 0;
      deltaX |= 0;
      deltaY |= 0;
      if (srcX > src.width || srcY > src.height || srcX + width > src.width || srcY + height > src.height) {
        throw new Error("bitblt reading outside image");
      }
      if (deltaX > dst.width || deltaY > dst.height || deltaX + width > dst.width || deltaY + height > dst.height) {
        throw new Error("bitblt writing outside image");
      }
      for (let y = 0; y < height; y++) {
        src.data.copy(
          dst.data,
          (deltaY + y) * dst.width + deltaX << 2,
          (srcY + y) * src.width + srcX << 2,
          (srcY + y) * src.width + srcX + width << 2
        );
      }
    };
    PNG.prototype.bitblt = function(dst, srcX, srcY, width, height, deltaX, deltaY) {
      PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
      return this;
    };
    PNG.adjustGamma = function(src) {
      if (src.gamma) {
        for (let y = 0; y < src.height; y++) {
          for (let x = 0; x < src.width; x++) {
            let idx = src.width * y + x << 2;
            for (let i = 0; i < 3; i++) {
              let sample = src.data[idx + i] / 255;
              sample = Math.pow(sample, 1 / 2.2 / src.gamma);
              src.data[idx + i] = Math.round(sample * 255);
            }
          }
        }
        src.gamma = 0;
      }
    };
    PNG.prototype.adjustGamma = function() {
      PNG.adjustGamma(this);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utils.js"(exports) {
    function hex2rgba(hex) {
      if (typeof hex === "number") {
        hex = hex.toString();
      }
      if (typeof hex !== "string") {
        throw new Error("Color should be defined as hex string");
      }
      let hexCode = hex.slice().replace("#", "").split("");
      if (hexCode.length < 3 || hexCode.length === 5 || hexCode.length > 8) {
        throw new Error("Invalid hex color: " + hex);
      }
      if (hexCode.length === 3 || hexCode.length === 4) {
        hexCode = Array.prototype.concat.apply([], hexCode.map(function(c) {
          return [c, c];
        }));
      }
      if (hexCode.length === 6) hexCode.push("F", "F");
      const hexValue = parseInt(hexCode.join(""), 16);
      return {
        r: hexValue >> 24 & 255,
        g: hexValue >> 16 & 255,
        b: hexValue >> 8 & 255,
        a: hexValue & 255,
        hex: "#" + hexCode.slice(0, 6).join("")
      };
    }
    exports.getOptions = function getOptions(options) {
      if (!options) options = {};
      if (!options.color) options.color = {};
      const margin = typeof options.margin === "undefined" || options.margin === null || options.margin < 0 ? 4 : options.margin;
      const width = options.width && options.width >= 21 ? options.width : void 0;
      const scale = options.scale || 4;
      return {
        width,
        scale: width ? 4 : scale,
        margin,
        color: {
          dark: hex2rgba(options.color.dark || "#000000ff"),
          light: hex2rgba(options.color.light || "#ffffffff")
        },
        type: options.type,
        rendererOpts: options.rendererOpts || {}
      };
    };
    exports.getScale = function getScale(qrSize, opts) {
      return opts.width && opts.width >= qrSize + opts.margin * 2 ? opts.width / (qrSize + opts.margin * 2) : opts.scale;
    };
    exports.getImageWidth = function getImageWidth(qrSize, opts) {
      const scale = exports.getScale(qrSize, opts);
      return Math.floor((qrSize + opts.margin * 2) * scale);
    };
    exports.qrToImageData = function qrToImageData(imgData, qr, opts) {
      const size = qr.modules.size;
      const data = qr.modules.data;
      const scale = exports.getScale(size, opts);
      const symbolSize = Math.floor((size + opts.margin * 2) * scale);
      const scaledMargin = opts.margin * scale;
      const palette = [opts.color.light, opts.color.dark];
      for (let i = 0; i < symbolSize; i++) {
        for (let j = 0; j < symbolSize; j++) {
          let posDst = (i * symbolSize + j) * 4;
          let pxColor = opts.color.light;
          if (i >= scaledMargin && j >= scaledMargin && i < symbolSize - scaledMargin && j < symbolSize - scaledMargin) {
            const iSrc = Math.floor((i - scaledMargin) / scale);
            const jSrc = Math.floor((j - scaledMargin) / scale);
            pxColor = palette[data[iSrc * size + jSrc] ? 1 : 0];
          }
          imgData[posDst++] = pxColor.r;
          imgData[posDst++] = pxColor.g;
          imgData[posDst++] = pxColor.b;
          imgData[posDst] = pxColor.a;
        }
      }
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/png.js
var require_png2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/png.js"(exports) {
    var fs2 = __require("fs");
    var PNG = require_png().PNG;
    var Utils = require_utils2();
    exports.render = function render(qrData, options) {
      const opts = Utils.getOptions(options);
      const pngOpts = opts.rendererOpts;
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      pngOpts.width = size;
      pngOpts.height = size;
      const pngImage = new PNG(pngOpts);
      Utils.qrToImageData(pngImage.data, qrData, opts);
      return pngImage;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      exports.renderToBuffer(qrData, options, function(err, output) {
        if (err) cb(err);
        let url = "data:image/png;base64,";
        url += output.toString("base64");
        cb(null, url);
      });
    };
    exports.renderToBuffer = function renderToBuffer(qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      const png = exports.render(qrData, options);
      const buffer = [];
      png.on("error", cb);
      png.on("data", function(data) {
        buffer.push(data);
      });
      png.on("end", function() {
        cb(null, Buffer.concat(buffer));
      });
      png.pack();
    };
    exports.renderToFile = function renderToFile(path3, qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      let called = false;
      const done = (...args) => {
        if (called) return;
        called = true;
        cb.apply(null, args);
      };
      const stream = fs2.createWriteStream(path3);
      stream.on("error", done);
      stream.on("close", done);
      exports.renderToFileStream(stream, qrData, options);
    };
    exports.renderToFileStream = function renderToFileStream(stream, qrData, options) {
      const png = exports.render(qrData, options);
      png.pack().pipe(stream);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utf8.js
var require_utf8 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/utf8.js"(exports) {
    var Utils = require_utils2();
    var BLOCK_CHAR = {
      WW: " ",
      WB: "\u2584",
      BB: "\u2588",
      BW: "\u2580"
    };
    var INVERTED_BLOCK_CHAR = {
      BB: " ",
      BW: "\u2584",
      WW: "\u2588",
      WB: "\u2580"
    };
    function getBlockChar(top, bottom, blocks) {
      if (top && bottom) return blocks.BB;
      if (top && !bottom) return blocks.BW;
      if (!top && bottom) return blocks.WB;
      return blocks.WW;
    }
    exports.render = function(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      let blocks = BLOCK_CHAR;
      if (opts.color.dark.hex === "#ffffff" || opts.color.light.hex === "#000000") {
        blocks = INVERTED_BLOCK_CHAR;
      }
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      let output = "";
      let hMargin = Array(size + opts.margin * 2 + 1).join(blocks.WW);
      hMargin = Array(opts.margin / 2 + 1).join(hMargin + "\n");
      const vMargin = Array(opts.margin + 1).join(blocks.WW);
      output += hMargin;
      for (let i = 0; i < size; i += 2) {
        output += vMargin;
        for (let j = 0; j < size; j++) {
          const topModule = data[i * size + j];
          const bottomModule = data[(i + 1) * size + j];
          output += getBlockChar(topModule, bottomModule, blocks);
        }
        output += vMargin + "\n";
      }
      output += hMargin.slice(0, -1);
      if (typeof cb === "function") {
        cb(null, output);
      }
      return output;
    };
    exports.renderToFile = function renderToFile(path3, qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      const fs2 = __require("fs");
      const utf8 = exports.render(qrData, options);
      fs2.writeFile(path3, utf8, cb);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/terminal/terminal.js
var require_terminal = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/terminal/terminal.js"(exports) {
    exports.render = function(qrData, options, cb) {
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const black = "\x1B[40m  \x1B[0m";
      const white = "\x1B[47m  \x1B[0m";
      let output = "";
      const hMargin = Array(size + 3).join(white);
      const vMargin = Array(2).join(white);
      output += hMargin + "\n";
      for (let i = 0; i < size; ++i) {
        output += white;
        for (let j = 0; j < size; j++) {
          output += data[i * size + j] ? black : white;
        }
        output += vMargin + "\n";
      }
      output += hMargin + "\n";
      if (typeof cb === "function") {
        cb(null, output);
      }
      return output;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/terminal/terminal-small.js
var require_terminal_small = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/terminal/terminal-small.js"(exports) {
    var backgroundWhite = "\x1B[47m";
    var backgroundBlack = "\x1B[40m";
    var foregroundWhite = "\x1B[37m";
    var foregroundBlack = "\x1B[30m";
    var reset = "\x1B[0m";
    var lineSetupNormal = backgroundWhite + foregroundBlack;
    var lineSetupInverse = backgroundBlack + foregroundWhite;
    var createPalette = function(lineSetup, foregroundWhite2, foregroundBlack2) {
      return {
        // 1 ... white, 2 ... black, 0 ... transparent (default)
        "00": reset + " " + lineSetup,
        "01": reset + foregroundWhite2 + "\u2584" + lineSetup,
        "02": reset + foregroundBlack2 + "\u2584" + lineSetup,
        10: reset + foregroundWhite2 + "\u2580" + lineSetup,
        11: " ",
        12: "\u2584",
        20: reset + foregroundBlack2 + "\u2580" + lineSetup,
        21: "\u2580",
        22: "\u2588"
      };
    };
    var mkCodePixel = function(modules, size, x, y) {
      const sizePlus = size + 1;
      if (x >= sizePlus || y >= sizePlus || y < -1 || x < -1) return "0";
      if (x >= size || y >= size || y < 0 || x < 0) return "1";
      const idx = y * size + x;
      return modules[idx] ? "2" : "1";
    };
    var mkCode = function(modules, size, x, y) {
      return mkCodePixel(modules, size, x, y) + mkCodePixel(modules, size, x, y + 1);
    };
    exports.render = function(qrData, options, cb) {
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const inverse = !!(options && options.inverse);
      const lineSetup = options && options.inverse ? lineSetupInverse : lineSetupNormal;
      const white = inverse ? foregroundBlack : foregroundWhite;
      const black = inverse ? foregroundWhite : foregroundBlack;
      const palette = createPalette(lineSetup, white, black);
      const newLine = reset + "\n" + lineSetup;
      let output = lineSetup;
      for (let y = -1; y < size + 1; y += 2) {
        for (let x = -1; x < size; x++) {
          output += palette[mkCode(data, size, x, y)];
        }
        output += palette[mkCode(data, size, size, y)] + newLine;
      }
      output += reset;
      if (typeof cb === "function") {
        cb(null, output);
      }
      return output;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/terminal.js
var require_terminal2 = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/terminal.js"(exports) {
    var big = require_terminal();
    var small = require_terminal_small();
    exports.render = function(qrData, options, cb) {
      if (options && options.small) {
        return small.render(qrData, options, cb);
      }
      return big.render(qrData, options, cb);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js
var require_svg_tag = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg-tag.js"(exports) {
    var Utils = require_utils2();
    function getColorAttrib(color, attrib) {
      const alpha = color.a / 255;
      const str = attrib + '="' + color.hex + '"';
      return alpha < 1 ? str + " " + attrib + '-opacity="' + alpha.toFixed(2).slice(1) + '"' : str;
    }
    function svgCmd(cmd, x, y) {
      let str = cmd + x;
      if (typeof y !== "undefined") str += " " + y;
      return str;
    }
    function qrToPath(data, size, margin) {
      let path3 = "";
      let moveBy = 0;
      let newRow = false;
      let lineLength = 0;
      for (let i = 0; i < data.length; i++) {
        const col = Math.floor(i % size);
        const row = Math.floor(i / size);
        if (!col && !newRow) newRow = true;
        if (data[i]) {
          lineLength++;
          if (!(i > 0 && col > 0 && data[i - 1])) {
            path3 += newRow ? svgCmd("M", col + margin, 0.5 + row + margin) : svgCmd("m", moveBy, 0);
            moveBy = 0;
            newRow = false;
          }
          if (!(col + 1 < size && data[i + 1])) {
            path3 += svgCmd("h", lineLength);
            lineLength = 0;
          }
        } else {
          moveBy++;
        }
      }
      return path3;
    }
    exports.render = function render(qrData, options, cb) {
      const opts = Utils.getOptions(options);
      const size = qrData.modules.size;
      const data = qrData.modules.data;
      const qrcodesize = size + opts.margin * 2;
      const bg = !opts.color.light.a ? "" : "<path " + getColorAttrib(opts.color.light, "fill") + ' d="M0 0h' + qrcodesize + "v" + qrcodesize + 'H0z"/>';
      const path3 = "<path " + getColorAttrib(opts.color.dark, "stroke") + ' d="' + qrToPath(data, size, opts.margin) + '"/>';
      const viewBox = 'viewBox="0 0 ' + qrcodesize + " " + qrcodesize + '"';
      const width = !opts.width ? "" : 'width="' + opts.width + '" height="' + opts.width + '" ';
      const svgTag = '<svg xmlns="http://www.w3.org/2000/svg" ' + width + viewBox + ' shape-rendering="crispEdges">' + bg + path3 + "</svg>\n";
      if (typeof cb === "function") {
        cb(null, svgTag);
      }
      return svgTag;
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg.js
var require_svg = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/svg.js"(exports) {
    var svgTagRenderer = require_svg_tag();
    exports.render = svgTagRenderer.render;
    exports.renderToFile = function renderToFile(path3, qrData, options, cb) {
      if (typeof cb === "undefined") {
        cb = options;
        options = void 0;
      }
      const fs2 = __require("fs");
      const svgTag = exports.render(qrData, options);
      const xmlStr = '<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' + svgTag;
      fs2.writeFile(path3, xmlStr, cb);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js
var require_canvas = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/renderer/canvas.js"(exports) {
    var Utils = require_utils2();
    function clearCanvas(ctx, canvas, size) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (!canvas.style) canvas.style = {};
      canvas.height = size;
      canvas.width = size;
      canvas.style.height = size + "px";
      canvas.style.width = size + "px";
    }
    function getCanvasElement() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    exports.render = function render(qrData, canvas, options) {
      let opts = options;
      let canvasEl = canvas;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!canvas) {
        canvasEl = getCanvasElement();
      }
      opts = Utils.getOptions(opts);
      const size = Utils.getImageWidth(qrData.modules.size, opts);
      const ctx = canvasEl.getContext("2d");
      const image = ctx.createImageData(size, size);
      Utils.qrToImageData(image.data, qrData, opts);
      clearCanvas(ctx, canvasEl, size);
      ctx.putImageData(image, 0, 0);
      return canvasEl;
    };
    exports.renderToDataURL = function renderToDataURL(qrData, canvas, options) {
      let opts = options;
      if (typeof opts === "undefined" && (!canvas || !canvas.getContext)) {
        opts = canvas;
        canvas = void 0;
      }
      if (!opts) opts = {};
      const canvasEl = exports.render(qrData, canvas, opts);
      const type = opts.type || "image/png";
      const rendererOpts = opts.rendererOpts || {};
      return canvasEl.toDataURL(type, rendererOpts.quality);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js
var require_browser = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/browser.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var CanvasRenderer = require_canvas();
    var SvgRenderer = require_svg_tag();
    function renderCanvas(renderFunc, canvas, text, opts, cb) {
      const args = [].slice.call(arguments, 1);
      const argsNum = args.length;
      const isLastArgCb = typeof args[argsNum - 1] === "function";
      if (!isLastArgCb && !canPromise()) {
        throw new Error("Callback required as last argument");
      }
      if (isLastArgCb) {
        if (argsNum < 2) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 2) {
          cb = text;
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 3) {
          if (canvas.getContext && typeof cb === "undefined") {
            cb = opts;
            opts = void 0;
          } else {
            cb = opts;
            opts = text;
            text = canvas;
            canvas = void 0;
          }
        }
      } else {
        if (argsNum < 1) {
          throw new Error("Too few arguments provided");
        }
        if (argsNum === 1) {
          text = canvas;
          canvas = opts = void 0;
        } else if (argsNum === 2 && !canvas.getContext) {
          opts = text;
          text = canvas;
          canvas = void 0;
        }
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, opts);
            resolve(renderFunc(data, canvas, opts));
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, opts);
        cb(null, renderFunc(data, canvas, opts));
      } catch (e) {
        cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = renderCanvas.bind(null, CanvasRenderer.render);
    exports.toDataURL = renderCanvas.bind(null, CanvasRenderer.renderToDataURL);
    exports.toString = renderCanvas.bind(null, function(data, _, opts) {
      return SvgRenderer.render(data, opts);
    });
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/server.js
var require_server = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/server.js"(exports) {
    var canPromise = require_can_promise();
    var QRCode2 = require_qrcode();
    var PngRenderer = require_png2();
    var Utf8Renderer = require_utf8();
    var TerminalRenderer = require_terminal2();
    var SvgRenderer = require_svg();
    function checkParams(text, opts, cb) {
      if (typeof text === "undefined") {
        throw new Error("String required as first argument");
      }
      if (typeof cb === "undefined") {
        cb = opts;
        opts = {};
      }
      if (typeof cb !== "function") {
        if (!canPromise()) {
          throw new Error("Callback required as last argument");
        } else {
          opts = cb || {};
          cb = null;
        }
      }
      return {
        opts,
        cb
      };
    }
    function getTypeFromFilename(path3) {
      return path3.slice((path3.lastIndexOf(".") - 1 >>> 0) + 2).toLowerCase();
    }
    function getRendererFromType(type) {
      switch (type) {
        case "svg":
          return SvgRenderer;
        case "txt":
        case "utf8":
          return Utf8Renderer;
        case "png":
        case "image/png":
        default:
          return PngRenderer;
      }
    }
    function getStringRendererFromType(type) {
      switch (type) {
        case "svg":
          return SvgRenderer;
        case "terminal":
          return TerminalRenderer;
        case "utf8":
        default:
          return Utf8Renderer;
      }
    }
    function render(renderFunc, text, params) {
      if (!params.cb) {
        return new Promise(function(resolve, reject) {
          try {
            const data = QRCode2.create(text, params.opts);
            return renderFunc(data, params.opts, function(err, data2) {
              return err ? reject(err) : resolve(data2);
            });
          } catch (e) {
            reject(e);
          }
        });
      }
      try {
        const data = QRCode2.create(text, params.opts);
        return renderFunc(data, params.opts, params.cb);
      } catch (e) {
        params.cb(e);
      }
    }
    exports.create = QRCode2.create;
    exports.toCanvas = require_browser().toCanvas;
    exports.toString = function toString(text, opts, cb) {
      const params = checkParams(text, opts, cb);
      const type = params.opts ? params.opts.type : void 0;
      const renderer = getStringRendererFromType(type);
      return render(renderer.render, text, params);
    };
    exports.toDataURL = function toDataURL(text, opts, cb) {
      const params = checkParams(text, opts, cb);
      const renderer = getRendererFromType(params.opts.type);
      return render(renderer.renderToDataURL, text, params);
    };
    exports.toBuffer = function toBuffer(text, opts, cb) {
      const params = checkParams(text, opts, cb);
      const renderer = getRendererFromType(params.opts.type);
      return render(renderer.renderToBuffer, text, params);
    };
    exports.toFile = function toFile(path3, text, opts, cb) {
      if (typeof path3 !== "string" || !(typeof text === "string" || typeof text === "object")) {
        throw new Error("Invalid argument");
      }
      if (arguments.length < 3 && !canPromise()) {
        throw new Error("Too few arguments provided");
      }
      const params = checkParams(text, opts, cb);
      const type = params.opts.type || getTypeFromFilename(path3);
      const renderer = getRendererFromType(type);
      const renderToFile = renderer.renderToFile.bind(null, path3);
      return render(renderToFile, text, params);
    };
    exports.toFileStream = function toFileStream(stream, text, opts) {
      if (arguments.length < 2) {
        throw new Error("Too few arguments provided");
      }
      const params = checkParams(text, opts, stream.emit.bind(stream, "error"));
      const renderer = getRendererFromType("png");
      const renderToFileStream = renderer.renderToFileStream.bind(null, stream);
      render(renderToFileStream, text, params);
    };
  }
});

// node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/qrcode@1.5.4/node_modules/qrcode/lib/index.js"(exports, module) {
    module.exports = require_server();
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/headers.js
var require_headers = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/headers.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var headers_exports = {};
    __export2(headers_exports, {
      CITY_HEADER_NAME: () => CITY_HEADER_NAME,
      COUNTRY_HEADER_NAME: () => COUNTRY_HEADER_NAME,
      EMOJI_FLAG_UNICODE_STARTING_POSITION: () => EMOJI_FLAG_UNICODE_STARTING_POSITION,
      IP_HEADER_NAME: () => IP_HEADER_NAME,
      LATITUDE_HEADER_NAME: () => LATITUDE_HEADER_NAME,
      LONGITUDE_HEADER_NAME: () => LONGITUDE_HEADER_NAME,
      POSTAL_CODE_HEADER_NAME: () => POSTAL_CODE_HEADER_NAME,
      REGION_HEADER_NAME: () => REGION_HEADER_NAME,
      REQUEST_ID_HEADER_NAME: () => REQUEST_ID_HEADER_NAME,
      geolocation: () => geolocation2,
      ipAddress: () => ipAddress2
    });
    module.exports = __toCommonJS(headers_exports);
    var CITY_HEADER_NAME = "x-vercel-ip-city";
    var COUNTRY_HEADER_NAME = "x-vercel-ip-country";
    var IP_HEADER_NAME = "x-real-ip";
    var LATITUDE_HEADER_NAME = "x-vercel-ip-latitude";
    var LONGITUDE_HEADER_NAME = "x-vercel-ip-longitude";
    var REGION_HEADER_NAME = "x-vercel-ip-country-region";
    var POSTAL_CODE_HEADER_NAME = "x-vercel-ip-postal-code";
    var REQUEST_ID_HEADER_NAME = "x-vercel-id";
    var EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397;
    function getHeader(headers, key) {
      return headers.get(key) ?? void 0;
    }
    function getHeaderWithDecode(request, key) {
      const header = getHeader(request.headers, key);
      return header ? decodeURIComponent(header) : void 0;
    }
    function getFlag(countryCode) {
      const regex = new RegExp("^[A-Z]{2}$").test(countryCode);
      if (!countryCode || !regex)
        return void 0;
      return String.fromCodePoint(
        ...countryCode.split("").map((char) => EMOJI_FLAG_UNICODE_STARTING_POSITION + char.charCodeAt(0))
      );
    }
    function ipAddress2(input) {
      const headers = "headers" in input ? input.headers : input;
      return getHeader(headers, IP_HEADER_NAME);
    }
    function getRegionFromRequestId(requestId) {
      if (!requestId) {
        return "dev1";
      }
      return requestId.split(":")[0];
    }
    function geolocation2(request) {
      return {
        // city name may be encoded to support multi-byte characters
        city: getHeaderWithDecode(request, CITY_HEADER_NAME),
        country: getHeader(request.headers, COUNTRY_HEADER_NAME),
        flag: getFlag(getHeader(request.headers, COUNTRY_HEADER_NAME)),
        countryRegion: getHeader(request.headers, REGION_HEADER_NAME),
        region: getRegionFromRequestId(
          getHeader(request.headers, REQUEST_ID_HEADER_NAME)
        ),
        latitude: getHeader(request.headers, LATITUDE_HEADER_NAME),
        longitude: getHeader(request.headers, LONGITUDE_HEADER_NAME),
        postalCode: getHeader(request.headers, POSTAL_CODE_HEADER_NAME)
      };
    }
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/get-env.js
var require_get_env = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/get-env.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var get_env_exports = {};
    __export2(get_env_exports, {
      getEnv: () => getEnv2
    });
    module.exports = __toCommonJS(get_env_exports);
    var getEnv2 = (env2 = process.env) => ({
      /**
       * An indicator to show that System Environment Variables have been exposed to your project's Deployments.
       * @example "1"
       */
      VERCEL: get(env2, "VERCEL"),
      /**
       * An indicator that the code is running in a Continuous Integration environment.
       * @example "1"
       */
      CI: get(env2, "CI"),
      /**
       * The Environment that the app is deployed and running on.
       * @example "production"
       */
      VERCEL_ENV: get(env2, "VERCEL_ENV"),
      /**
       * The domain name of the generated deployment URL. The value does not include the protocol scheme https://.
       * NOTE: This Variable cannot be used in conjunction with Standard Deployment Protection.
       * @example "*.vercel.app"
       */
      VERCEL_URL: get(env2, "VERCEL_URL"),
      /**
       * The domain name of the generated Git branch URL. The value does not include the protocol scheme https://.
       * @example "*-git-*.vercel.app"
       */
      VERCEL_BRANCH_URL: get(env2, "VERCEL_BRANCH_URL"),
      /**
       * A production domain name of the project. This is useful to reliably generate links that point to production such as OG-image URLs.
       * The value does not include the protocol scheme https://.
       * @example "myproject.vercel.app"
       */
      VERCEL_PROJECT_PRODUCTION_URL: get(env2, "VERCEL_PROJECT_PRODUCTION_URL"),
      /**
       * The ID of the Region where the app is running.
       *
       * Possible values:
       * - arn1 (Stockholm, Sweden)
       * - bom1 (Mumbai, India)
       * - cdg1 (Paris, France)
       * - cle1 (Cleveland, USA)
       * - cpt1 (Cape Town, South Africa)
       * - dub1 (Dublin, Ireland)
       * - fra1 (Frankfurt, Germany)
       * - gru1 (São Paulo, Brazil)
       * - hkg1 (Hong Kong)
       * - hnd1 (Tokyo, Japan)
       * - iad1 (Washington, D.C., USA)
       * - icn1 (Seoul, South Korea)
       * - kix1 (Osaka, Japan)
       * - lhr1 (London, United Kingdom)
       * - pdx1 (Portland, USA)
       * - sfo1 (San Francisco, USA)
       * - sin1 (Singapore)
       * - syd1 (Sydney, Australia)
       * - dev1 (Development Region)
       *
       * @example "iad1"
       */
      VERCEL_REGION: get(env2, "VERCEL_REGION"),
      /**
       * The unique identifier for the deployment, which can be used to implement Skew Protection.
       * @example "dpl_7Gw5ZMBpQA8h9GF832KGp7nwbuh3"
       */
      VERCEL_DEPLOYMENT_ID: get(env2, "VERCEL_DEPLOYMENT_ID"),
      /**
       * When Skew Protection is enabled in Project Settings, this value is set to 1.
       * @example "1"
       */
      VERCEL_SKEW_PROTECTION_ENABLED: get(env2, "VERCEL_SKEW_PROTECTION_ENABLED"),
      /**
       * The Protection Bypass for Automation value, if the secret has been generated in the project's Deployment Protection settings.
       */
      VERCEL_AUTOMATION_BYPASS_SECRET: get(env2, "VERCEL_AUTOMATION_BYPASS_SECRET"),
      /**
       * The Git Provider the deployment is triggered from.
       * @example "github"
       */
      VERCEL_GIT_PROVIDER: get(env2, "VERCEL_GIT_PROVIDER"),
      /**
       * The origin repository the deployment is triggered from.
       * @example "my-site"
       */
      VERCEL_GIT_REPO_SLUG: get(env2, "VERCEL_GIT_REPO_SLUG"),
      /**
       * The account that owns the repository the deployment is triggered from.
       * @example "acme"
       */
      VERCEL_GIT_REPO_OWNER: get(env2, "VERCEL_GIT_REPO_OWNER"),
      /**
       * The ID of the repository the deployment is triggered from.
       * @example "117716146"
       */
      VERCEL_GIT_REPO_ID: get(env2, "VERCEL_GIT_REPO_ID"),
      /**
       * The git branch of the commit the deployment was triggered by.
       * @example "improve-about-page"
       */
      VERCEL_GIT_COMMIT_REF: get(env2, "VERCEL_GIT_COMMIT_REF"),
      /**
       * The git SHA of the commit the deployment was triggered by.
       * @example "fa1eade47b73733d6312d5abfad33ce9e4068081"
       */
      VERCEL_GIT_COMMIT_SHA: get(env2, "VERCEL_GIT_COMMIT_SHA"),
      /**
       * The message attached to the commit the deployment was triggered by.
       * @example "Update about page"
       */
      VERCEL_GIT_COMMIT_MESSAGE: get(env2, "VERCEL_GIT_COMMIT_MESSAGE"),
      /**
       * The username attached to the author of the commit that the project was deployed by.
       * @example "johndoe"
       */
      VERCEL_GIT_COMMIT_AUTHOR_LOGIN: get(env2, "VERCEL_GIT_COMMIT_AUTHOR_LOGIN"),
      /**
       * The name attached to the author of the commit that the project was deployed by.
       * @example "John Doe"
       */
      VERCEL_GIT_COMMIT_AUTHOR_NAME: get(env2, "VERCEL_GIT_COMMIT_AUTHOR_NAME"),
      /**
       * The git SHA of the last successful deployment for the project and branch.
       * NOTE: This Variable is only exposed when an Ignored Build Step is provided.
       * @example "fa1eade47b73733d6312d5abfad33ce9e4068080"
       */
      VERCEL_GIT_PREVIOUS_SHA: get(env2, "VERCEL_GIT_PREVIOUS_SHA"),
      /**
       * The pull request id the deployment was triggered by. If a deployment is created on a branch before a pull request is made, this value will be an empty string.
       * @example "23"
       */
      VERCEL_GIT_PULL_REQUEST_ID: get(env2, "VERCEL_GIT_PULL_REQUEST_ID")
    });
    var get = (env2, key) => {
      const value = env2[key];
      return value === "" ? void 0 : value;
    };
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/get-context.js
var require_get_context = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/get-context.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var get_context_exports = {};
    __export2(get_context_exports, {
      SYMBOL_FOR_REQ_CONTEXT: () => SYMBOL_FOR_REQ_CONTEXT,
      getContext: () => getContext
    });
    module.exports = __toCommonJS(get_context_exports);
    var SYMBOL_FOR_REQ_CONTEXT = Symbol.for("@vercel/request-context");
    function getContext() {
      const fromSymbol = globalThis;
      return fromSymbol[SYMBOL_FOR_REQ_CONTEXT]?.get?.() ?? {};
    }
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/deadline.js
var require_deadline = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/deadline.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var deadline_exports = {};
    __export2(deadline_exports, {
      getDeadline: () => getDeadline2
    });
    module.exports = __toCommonJS(deadline_exports);
    var import_get_context = require_get_context();
    function getDeadline2() {
      const deadline = (0, import_get_context.getContext)().deadline;
      if (deadline === void 0) {
        return void 0;
      }
      const date = new Date(deadline);
      if (isNaN(date.getTime())) {
        return void 0;
      }
      return date;
    }
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/wait-until.js
var require_wait_until = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/wait-until.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var wait_until_exports = {};
    __export2(wait_until_exports, {
      waitUntil: () => waitUntil2
    });
    module.exports = __toCommonJS(wait_until_exports);
    var import_get_context = require_get_context();
    var waitUntil2 = (promise) => {
      if (promise === null || typeof promise !== "object" || typeof promise.then !== "function") {
        throw new TypeError(
          `waitUntil can only be called with a Promise, got ${typeof promise}`
        );
      }
      return (0, import_get_context.getContext)().waitUntil?.(promise);
    };
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/metric.js
var require_metric = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/metric.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var metric_exports = {};
    __export2(metric_exports, {
      metric: () => metric2
    });
    module.exports = __toCommonJS(metric_exports);
    var RUSTY_RUNTIME_IPC_SYMBOL = Symbol.for("@vercel/rusty-runtime-ipc");
    function metric2(name, value, tags) {
      const ipc = globalThis[RUSTY_RUNTIME_IPC_SYMBOL];
      ipc?.sendMetric?.(name, value, tags);
    }
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/middleware.js
var require_middleware = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/middleware.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var middleware_exports = {};
    __export2(middleware_exports, {
      next: () => next2,
      rewrite: () => rewrite2
    });
    module.exports = __toCommonJS(middleware_exports);
    function handleMiddlewareField(init, headers) {
      if (init?.request?.headers) {
        if (!(init.request.headers instanceof Headers)) {
          throw new Error("request.headers must be an instance of Headers");
        }
        const keys = [];
        for (const [key, value] of init.request.headers) {
          headers.set("x-middleware-request-" + key, value);
          keys.push(key);
        }
        headers.set("x-middleware-override-headers", keys.join(","));
      }
    }
    function rewrite2(destination, init) {
      const headers = new Headers(init?.headers ?? {});
      headers.set("x-middleware-rewrite", String(destination));
      handleMiddlewareField(init, headers);
      return new Response(null, {
        ...init,
        headers
      });
    }
    function next2(init) {
      const headers = new Headers(init?.headers ?? {});
      headers.set("x-middleware-next", "1");
      handleMiddlewareField(init, headers);
      return new Response(null, {
        ...init,
        headers
      });
    }
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/cache/in-memory-cache.js
var require_in_memory_cache = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/cache/in-memory-cache.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var in_memory_cache_exports = {};
    __export2(in_memory_cache_exports, {
      InMemoryCache: () => InMemoryCache
    });
    module.exports = __toCommonJS(in_memory_cache_exports);
    var InMemoryCache = class {
      constructor() {
        this.cache = {};
      }
      async get(key) {
        const entry = this.cache[key];
        if (entry) {
          if (entry.ttl && entry.lastModified + entry.ttl * 1e3 < Date.now()) {
            await this.delete(key);
            return null;
          }
          return JSON.parse(entry.value);
        }
        return null;
      }
      async set(key, value, options) {
        const serialized = JSON.stringify(value ?? null);
        this.cache[key] = {
          value: serialized,
          lastModified: Date.now(),
          ttl: options?.ttl,
          tags: new Set(options?.tags || [])
        };
      }
      async delete(key) {
        delete this.cache[key];
      }
      async expireTag(tag) {
        const tags = Array.isArray(tag) ? tag : [tag];
        for (const key in this.cache) {
          if (Object.prototype.hasOwnProperty.call(this.cache, key)) {
            const entry = this.cache[key];
            if (tags.some((t) => entry.tags.has(t))) {
              delete this.cache[key];
            }
          }
        }
      }
    };
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/cache/build-client.js
var require_build_client = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/cache/build-client.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var build_client_exports = {};
    __export2(build_client_exports, {
      BuildCache: () => BuildCache
    });
    module.exports = __toCommonJS(build_client_exports);
    var import_index = require_cache();
    var BuildCache = class {
      constructor({
        endpoint,
        headers,
        onError,
        timeout = 500
      }) {
        this.get = async (key) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), this.timeout);
          try {
            const res = await fetch(`${this.endpoint}${key}`, {
              headers: this.headers,
              method: "GET",
              signal: controller.signal
            });
            if (res.status === 404) {
              clearTimeout(timeoutId);
              return null;
            }
            if (res.status === 200) {
              const cacheState = res.headers.get(
                import_index.HEADERS_VERCEL_CACHE_STATE
              );
              if (cacheState !== import_index.PkgCacheState.Fresh) {
                res.body?.cancel?.();
                clearTimeout(timeoutId);
                return null;
              }
              const result = await res.json();
              clearTimeout(timeoutId);
              return result;
            } else {
              clearTimeout(timeoutId);
              throw new Error(`Failed to get cache: ${res.statusText}`);
            }
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
              const timeoutError = new Error(
                `Cache request timed out after ${this.timeout}ms`
              );
              timeoutError.stack = error.stack;
              this.onError?.(timeoutError);
            } else {
              this.onError?.(error);
            }
            return null;
          }
        };
        this.set = async (key, value, options) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), this.timeout);
          try {
            const optionalHeaders = {};
            if (options?.ttl) {
              optionalHeaders[import_index.HEADERS_VERCEL_REVALIDATE] = options.ttl.toString();
            }
            if (options?.tags && options.tags.length > 0) {
              optionalHeaders[import_index.HEADERS_VERCEL_CACHE_TAGS] = options.tags.join(",");
            }
            if (options?.name) {
              optionalHeaders[import_index.HEADERS_VERCEL_CACHE_ITEM_NAME] = options.name;
            }
            const res = await fetch(`${this.endpoint}${key}`, {
              method: "POST",
              headers: {
                ...this.headers,
                ...optionalHeaders
              },
              body: JSON.stringify(value),
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (res.status !== 200) {
              throw new Error(`Failed to set cache: ${res.status} ${res.statusText}`);
            }
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
              const timeoutError = new Error(
                `Cache request timed out after ${this.timeout}ms`
              );
              timeoutError.stack = error.stack;
              this.onError?.(timeoutError);
            } else {
              this.onError?.(error);
            }
          }
        };
        this.delete = async (key) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), this.timeout);
          try {
            const res = await fetch(`${this.endpoint}${key}`, {
              method: "DELETE",
              headers: this.headers,
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (res.status !== 200) {
              throw new Error(`Failed to delete cache: ${res.statusText}`);
            }
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
              const timeoutError = new Error(
                `Cache request timed out after ${this.timeout}ms`
              );
              timeoutError.stack = error.stack;
              this.onError?.(timeoutError);
            } else {
              this.onError?.(error);
            }
          }
        };
        this.expireTag = async (tag) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), this.timeout);
          try {
            if (Array.isArray(tag)) {
              tag = tag.join(",");
            }
            const res = await fetch(`${this.endpoint}revalidate?tags=${tag}`, {
              method: "POST",
              headers: this.headers,
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (res.status !== 200) {
              throw new Error(`Failed to revalidate tag: ${res.statusText}`);
            }
          } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === "AbortError") {
              const timeoutError = new Error(
                `Cache request timed out after ${this.timeout}ms`
              );
              timeoutError.stack = error.stack;
              this.onError?.(timeoutError);
            } else {
              this.onError?.(error);
            }
          }
        };
        this.endpoint = endpoint;
        this.headers = headers;
        this.onError = onError;
        this.timeout = timeout;
      }
    };
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/cache/index.js
var require_cache = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/cache/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var cache_exports = {};
    __export2(cache_exports, {
      HEADERS_VERCEL_CACHE_ITEM_NAME: () => HEADERS_VERCEL_CACHE_ITEM_NAME,
      HEADERS_VERCEL_CACHE_STATE: () => HEADERS_VERCEL_CACHE_STATE,
      HEADERS_VERCEL_CACHE_TAGS: () => HEADERS_VERCEL_CACHE_TAGS,
      HEADERS_VERCEL_REVALIDATE: () => HEADERS_VERCEL_REVALIDATE,
      PkgCacheState: () => PkgCacheState,
      getCache: () => getCache2
    });
    module.exports = __toCommonJS(cache_exports);
    var import_get_context = require_get_context();
    var import_in_memory_cache = require_in_memory_cache();
    var import_build_client = require_build_client();
    var defaultKeyHashFunction = (key) => {
      let hash2 = 5381;
      for (let i = 0; i < key.length; i++) {
        hash2 = hash2 * 33 ^ key.charCodeAt(i);
      }
      return (hash2 >>> 0).toString(16);
    };
    var defaultNamespaceSeparator = "$";
    var inMemoryCacheInstance = null;
    var buildCacheInstance = null;
    var getCache2 = (cacheOptions) => {
      const resolveCache = () => {
        let cache;
        if ((0, import_get_context.getContext)().cache) {
          cache = (0, import_get_context.getContext)().cache;
        } else {
          cache = getCacheImplementation(
            process.env.SUSPENSE_CACHE_DEBUG === "true"
          );
        }
        return cache;
      };
      return wrapWithKeyTransformation(
        resolveCache,
        createKeyTransformer(cacheOptions)
      );
    };
    function createKeyTransformer(cacheOptions) {
      const hashFunction = cacheOptions?.keyHashFunction || defaultKeyHashFunction;
      return (key) => {
        if (!cacheOptions?.namespace)
          return hashFunction(key);
        const separator = cacheOptions.namespaceSeparator || defaultNamespaceSeparator;
        return `${cacheOptions.namespace}${separator}${hashFunction(key)}`;
      };
    }
    function wrapWithKeyTransformation(resolveCache, makeKey) {
      return {
        get: (key) => {
          return resolveCache().get(makeKey(key));
        },
        set: (key, value, options) => {
          return resolveCache().set(makeKey(key), value, {
            ...options,
            name: options?.name ?? key
          });
        },
        delete: (key) => {
          return resolveCache().delete(makeKey(key));
        },
        expireTag: (tag) => {
          return resolveCache().expireTag(tag);
        }
      };
    }
    var warnedCacheUnavailable = false;
    function getCacheImplementation(debug) {
      if (!inMemoryCacheInstance) {
        inMemoryCacheInstance = new import_in_memory_cache.InMemoryCache();
      }
      if (process.env.RUNTIME_CACHE_DISABLE_BUILD_CACHE === "true") {
        debug && console.log("Using InMemoryCache as build cache is disabled");
        return inMemoryCacheInstance;
      }
      const { RUNTIME_CACHE_ENDPOINT, RUNTIME_CACHE_HEADERS } = process.env;
      if (debug) {
        console.log("Runtime cache environment variables:", {
          RUNTIME_CACHE_ENDPOINT,
          RUNTIME_CACHE_HEADERS
        });
      }
      if (!RUNTIME_CACHE_ENDPOINT || !RUNTIME_CACHE_HEADERS) {
        if (!warnedCacheUnavailable) {
          console.warn(
            "Runtime Cache unavailable in this environment. Falling back to in-memory cache."
          );
          warnedCacheUnavailable = true;
        }
        return inMemoryCacheInstance;
      }
      if (!buildCacheInstance) {
        let parsedHeaders = {};
        try {
          parsedHeaders = JSON.parse(RUNTIME_CACHE_HEADERS);
        } catch (e) {
          console.error("Failed to parse RUNTIME_CACHE_HEADERS:", e);
          return inMemoryCacheInstance;
        }
        let timeout = 500;
        if (process.env.RUNTIME_CACHE_TIMEOUT) {
          const parsed = parseInt(process.env.RUNTIME_CACHE_TIMEOUT, 10);
          if (!isNaN(parsed) && parsed > 0) {
            timeout = parsed;
          } else {
            console.warn(
              `Invalid RUNTIME_CACHE_TIMEOUT value: "${process.env.RUNTIME_CACHE_TIMEOUT}". Using default: ${timeout}ms`
            );
          }
        }
        buildCacheInstance = new import_build_client.BuildCache({
          endpoint: RUNTIME_CACHE_ENDPOINT,
          headers: parsedHeaders,
          onError: (error) => console.error(error),
          timeout
        });
      }
      return buildCacheInstance;
    }
    var PkgCacheState = /* @__PURE__ */ ((PkgCacheState2) => {
      PkgCacheState2["Fresh"] = "fresh";
      PkgCacheState2["Stale"] = "stale";
      PkgCacheState2["Expired"] = "expired";
      PkgCacheState2["NotFound"] = "notFound";
      PkgCacheState2["Error"] = "error";
      return PkgCacheState2;
    })(PkgCacheState || {});
    var HEADERS_VERCEL_CACHE_STATE = "x-vercel-cache-state";
    var HEADERS_VERCEL_REVALIDATE = "x-vercel-revalidate";
    var HEADERS_VERCEL_CACHE_TAGS = "x-vercel-cache-tags";
    var HEADERS_VERCEL_CACHE_ITEM_NAME = "x-vercel-cache-item-name";
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/db-connections/index.js
var require_db_connections = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/db-connections/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var db_connections_exports = {};
    __export2(db_connections_exports, {
      attachDatabasePool: () => attachDatabasePool2,
      experimental_attachDatabasePool: () => experimental_attachDatabasePool2
    });
    module.exports = __toCommonJS(db_connections_exports);
    var import_get_context = require_get_context();
    var import_deadline = require_deadline();
    var DEBUG = !!process.env.DEBUG;
    function getIdleTimeout(dbPool) {
      if ("options" in dbPool && dbPool.options) {
        if ("idleTimeoutMillis" in dbPool.options) {
          return typeof dbPool.options.idleTimeoutMillis === "number" ? dbPool.options.idleTimeoutMillis : 1e4;
        }
        if ("maxIdleTimeMS" in dbPool.options) {
          return typeof dbPool.options.maxIdleTimeMS === "number" ? dbPool.options.maxIdleTimeMS : 0;
        }
        if ("status" in dbPool) {
          return 5e3;
        }
        if ("connect" in dbPool && "execute" in dbPool) {
          return 3e4;
        }
      }
      if ("config" in dbPool && dbPool.config) {
        if ("connectionConfig" in dbPool.config && dbPool.config.connectionConfig) {
          return dbPool.config.connectionConfig.idleTimeout || 6e4;
        }
        if ("idleTimeout" in dbPool.config) {
          return typeof dbPool.config.idleTimeout === "number" ? dbPool.config.idleTimeout : 6e4;
        }
      }
      if ("poolTimeout" in dbPool) {
        return typeof dbPool.poolTimeout === "number" ? dbPool.poolTimeout : 6e4;
      }
      if ("idleTimeout" in dbPool) {
        return typeof dbPool.idleTimeout === "number" ? dbPool.idleTimeout : 0;
      }
      return 1e4;
    }
    var idleTimeout = null;
    var idleTimeoutResolve = () => {
    };
    var maximumDuration = 15 * 60 * 1e3 - 1e3;
    function waitUntilIdleTimeout(dbPool) {
      if (!process.env.VERCEL_URL || // This is not set during builds where we don't need to wait for idle connections using the mechanism
      !process.env.VERCEL_REGION) {
        return;
      }
      if (idleTimeout) {
        clearTimeout(idleTimeout);
        idleTimeoutResolve();
      }
      const promise = new Promise((resolve) => {
        idleTimeoutResolve = resolve;
      });
      const deadline = (0, import_deadline.getDeadline)();
      const remainingDuration = deadline ? deadline.getTime() - Date.now() - 1e3 : maximumDuration;
      const waitTime = Math.min(
        getIdleTimeout(dbPool) + 100,
        Math.max(100, remainingDuration)
      );
      idleTimeout = setTimeout(() => {
        idleTimeoutResolve?.();
        if (DEBUG) {
          console.log("Database pool idle timeout reached. Releasing connections.");
        }
      }, waitTime);
      const requestContext = (0, import_get_context.getContext)();
      if (requestContext?.waitUntil) {
        requestContext.waitUntil(promise);
      } else {
        console.warn("Pool release event triggered outside of request scope.");
      }
    }
    function attachDatabasePool2(dbPool) {
      if (idleTimeout) {
        idleTimeoutResolve?.();
        clearTimeout(idleTimeout);
      }
      if ("on" in dbPool && dbPool.on && "options" in dbPool && "idleTimeoutMillis" in dbPool.options) {
        const pgPool = dbPool;
        pgPool.on("release", () => {
          if (DEBUG) {
            console.log("Client released from pool");
          }
          waitUntilIdleTimeout(dbPool);
        });
        return;
      } else if ("on" in dbPool && dbPool.on && "config" in dbPool && dbPool.config && "connectionConfig" in dbPool.config) {
        const mysqlPool = dbPool;
        mysqlPool.on("release", () => {
          if (DEBUG) {
            console.log("MySQL client released from pool");
          }
          waitUntilIdleTimeout(dbPool);
        });
        return;
      } else if ("on" in dbPool && dbPool.on && "config" in dbPool && dbPool.config && "idleTimeout" in dbPool.config) {
        const mysql2Pool = dbPool;
        mysql2Pool.on("release", () => {
          if (DEBUG) {
            console.log("MySQL2/MariaDB client released from pool");
          }
          waitUntilIdleTimeout(dbPool);
        });
        return;
      }
      if ("on" in dbPool && dbPool.on && "options" in dbPool && dbPool.options && "maxIdleTimeMS" in dbPool.options) {
        const mongoPool = dbPool;
        mongoPool.on("connectionCheckedOut", () => {
          if (DEBUG) {
            console.log("MongoDB connection checked out");
          }
          waitUntilIdleTimeout(dbPool);
        });
        return;
      }
      if ("on" in dbPool && dbPool.on && "options" in dbPool && dbPool.options && "socket" in dbPool.options) {
        const redisPool = dbPool;
        redisPool.on("end", () => {
          if (DEBUG) {
            console.log("Redis connection ended");
          }
          waitUntilIdleTimeout(dbPool);
        });
        return;
      }
      throw new Error("Unsupported database pool type");
    }
    var experimental_attachDatabasePool2 = attachDatabasePool2;
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/purge/index.js
var require_purge = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/purge/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var purge_exports = {};
    __export2(purge_exports, {
      dangerouslyDeleteBySrcImage: () => dangerouslyDeleteBySrcImage2,
      dangerouslyDeleteByTag: () => dangerouslyDeleteByTag2,
      invalidateBySrcImage: () => invalidateBySrcImage2,
      invalidateByTag: () => invalidateByTag2
    });
    module.exports = __toCommonJS(purge_exports);
    var import_get_context = require_get_context();
    var invalidateByTag2 = (tag) => {
      const api = (0, import_get_context.getContext)().purge;
      if (api) {
        return api.invalidateByTag(tag);
      }
      return Promise.resolve();
    };
    var dangerouslyDeleteByTag2 = (tag, options) => {
      const api = (0, import_get_context.getContext)().purge;
      if (api) {
        return api.dangerouslyDeleteByTag(tag, options);
      }
      return Promise.resolve();
    };
    var invalidateBySrcImage2 = (src) => {
      const api = (0, import_get_context.getContext)().purge;
      return api ? api.invalidateBySrcImage(src) : Promise.resolve();
    };
    var dangerouslyDeleteBySrcImage2 = (src, options) => {
      const api = (0, import_get_context.getContext)().purge;
      return api ? api.dangerouslyDeleteBySrcImage(src, options) : Promise.resolve();
    };
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/addcachetag/index.js
var require_addcachetag = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/addcachetag/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var addcachetag_exports = {};
    __export2(addcachetag_exports, {
      addCacheTag: () => addCacheTag2
    });
    module.exports = __toCommonJS(addcachetag_exports);
    var import_get_context = require_get_context();
    var addCacheTag2 = (tag) => {
      const addCacheTag22 = (0, import_get_context.getContext)().addCacheTag;
      if (addCacheTag22) {
        return addCacheTag22(tag);
      }
      return Promise.resolve();
    };
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/websocket/index.js
var require_websocket = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/websocket/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var websocket_exports = {};
    __export2(websocket_exports, {
      experimental_upgradeWebSocket: () => experimental_upgradeWebSocket2
    });
    module.exports = __toCommonJS(websocket_exports);
    var import_get_context = require_get_context();
    var DEFAULT_MAX_PAYLOAD = 256 * 1024;
    async function loadWebSocketServer() {
      try {
        const ws = await import("ws");
        return ws.WebSocketServer;
      } catch {
        throw new Error(
          'The "ws" package is required for experimental_upgradeWebSocket(). Install it with: npm install ws'
        );
      }
    }
    async function experimental_upgradeWebSocket2(handler, options = {}) {
      const ctx = (0, import_get_context.getContext)();
      if (typeof ctx.upgradeWebSocket !== "function") {
        throw new Error(
          "experimental_upgradeWebSocket is not available in the current runtime environment. This feature requires a Vercel runtime that supports WebSocket upgrades."
        );
      }
      const WebSocketServer = await loadWebSocketServer();
      const { req, socket, head } = ctx.upgradeWebSocket();
      const wss = new WebSocketServer({
        noServer: true,
        maxPayload: options.maxPayload ?? DEFAULT_MAX_PAYLOAD
      });
      const ws = await new Promise((resolve, reject) => {
        const cleanup = () => {
          socket.removeListener("error", onError);
          socket.removeListener("close", onClose);
        };
        const rejectUpgrade = (err) => {
          cleanup();
          if (err instanceof Error) {
            reject(err);
            return;
          }
          const error = new Error("WebSocket upgrade failed");
          error.cause = err;
          reject(error);
        };
        const resolveUpgrade = (ws2) => {
          cleanup();
          resolve(ws2);
        };
        const onError = (err) => rejectUpgrade(err);
        const onClose = () => rejectUpgrade(
          new Error("socket closed before the WebSocket upgrade completed")
        );
        socket.once("error", onError);
        socket.once("close", onClose);
        try {
          wss.handleUpgrade(req, socket, head, resolveUpgrade);
        } catch (err) {
          rejectUpgrade(err);
        }
      });
      try {
        await handler(ws);
      } catch (err) {
        ws.close(1011, "WebSocket handler failed");
        throw err;
      }
      return new Response(null, { status: 204 });
    }
  }
});

// node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/index.js
var require_functions = __commonJS({
  "node_modules/.pnpm/@vercel+functions@3.9.5/node_modules/@vercel/functions/index.js"(exports, module) {
    "use strict";
    var __defProp2 = Object.defineProperty;
    var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
    var __getOwnPropNames2 = Object.getOwnPropertyNames;
    var __hasOwnProp2 = Object.prototype.hasOwnProperty;
    var __export2 = (target, all) => {
      for (var name in all)
        __defProp2(target, name, { get: all[name], enumerable: true });
    };
    var __copyProps2 = (to, from, except, desc) => {
      if (from && typeof from === "object" || typeof from === "function") {
        for (let key of __getOwnPropNames2(from))
          if (!__hasOwnProp2.call(to, key) && key !== except)
            __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
      }
      return to;
    };
    var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
    var src_exports = {};
    __export2(src_exports, {
      addCacheTag: () => import_addcachetag.addCacheTag,
      attachDatabasePool: () => import_db_connections.attachDatabasePool,
      dangerouslyDeleteBySrcImage: () => import_purge.dangerouslyDeleteBySrcImage,
      dangerouslyDeleteByTag: () => import_purge.dangerouslyDeleteByTag,
      experimental_attachDatabasePool: () => import_db_connections.experimental_attachDatabasePool,
      experimental_upgradeWebSocket: () => import_websocket.experimental_upgradeWebSocket,
      geolocation: () => import_headers.geolocation,
      getCache: () => import_cache.getCache,
      getDeadline: () => import_deadline.getDeadline,
      getEnv: () => import_get_env.getEnv,
      invalidateBySrcImage: () => import_purge.invalidateBySrcImage,
      invalidateByTag: () => import_purge.invalidateByTag,
      ipAddress: () => import_headers.ipAddress,
      metric: () => import_metric.metric,
      next: () => import_middleware.next,
      rewrite: () => import_middleware.rewrite,
      waitUntil: () => import_wait_until.waitUntil
    });
    module.exports = __toCommonJS(src_exports);
    var import_headers = require_headers();
    var import_get_env = require_get_env();
    var import_deadline = require_deadline();
    var import_wait_until = require_wait_until();
    var import_metric = require_metric();
    var import_middleware = require_middleware();
    var import_cache = require_cache();
    var import_db_connections = require_db_connections();
    var import_purge = require_purge();
    var import_addcachetag = require_addcachetag();
    var import_websocket = require_websocket();
  }
});

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/compose.js
var compose = (middleware, onError, onNotFound) => {
  return (context, next2) => {
    let index = -1;
    return dispatch(0);
    async function dispatch(i) {
      if (i <= index) {
        throw new Error("next() called multiple times");
      }
      index = i;
      let res;
      let isError = false;
      let handler;
      if (middleware[i]) {
        handler = middleware[i][0][0];
        context.req.routeIndex = i;
      } else {
        handler = i === middleware.length && next2 || void 0;
      }
      if (handler) {
        try {
          res = await handler(context, () => dispatch(i + 1));
        } catch (err) {
          if (err instanceof Error && onError) {
            context.error = err;
            res = await onError(err, context);
            isError = true;
          } else {
            throw err;
          }
        }
      } else {
        if (context.finalized === false && onNotFound) {
          res = await onNotFound(context);
        }
      }
      if (res && (context.finalized === false || isError)) {
        context.res = res;
      }
      return context;
    }
  };
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/http-exception.js
var HTTPException = class extends Error {
  res;
  status;
  /**
   * Creates an instance of `HTTPException`.
   * @param status - HTTP status code for the exception. Defaults to 500.
   * @param options - Additional options for the exception.
   */
  constructor(status = 500, options) {
    super(options?.message, { cause: options?.cause });
    this.res = options?.res;
    this.status = status;
  }
  /**
   * Returns the response object associated with the exception.
   * If a response object is not provided, a new response is created with the error message and status code.
   * @returns The response object.
   */
  getResponse() {
    if (this.res) {
      const newResponse = new Response(this.res.body, {
        status: this.status,
        headers: this.res.headers
      });
      return newResponse;
    }
    return new Response(this.message, {
      status: this.status
    });
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/request/constants.js
var GET_MATCH_RESULT = /* @__PURE__ */ Symbol();

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/buffer.js
var bufferToFormData = (arrayBuffer, contentType) => {
  const response = new Response(arrayBuffer, {
    headers: {
      // Normalize the media type (case-insensitive) while keeping parameters like the boundary
      "Content-Type": contentType.replace(/^[^;]+/, (mediaType) => mediaType.toLowerCase())
    }
  });
  return response.formData();
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/body.js
var isRawRequest = (request) => "headers" in request;
var parseBody = async (request, options = /* @__PURE__ */ Object.create(null)) => {
  const { all = false, dot = false } = options;
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const contentType = headers.get("Content-Type");
  const mediaType = contentType?.split(";")[0].trim().toLowerCase();
  if (mediaType === "multipart/form-data" || mediaType === "application/x-www-form-urlencoded") {
    return parseFormData(request, { all, dot });
  }
  return {};
};
async function parseFormData(request, options) {
  if (!isRawRequest(request) && request.bodyCache.formData) {
    return convertFormDataToBodyData(
      await request.bodyCache.formData,
      options
    );
  }
  const headers = isRawRequest(request) ? request.headers : request.raw.headers;
  const arrayBuffer = await request.arrayBuffer();
  const formDataPromise = bufferToFormData(arrayBuffer, headers.get("Content-Type") || "");
  if (!isRawRequest(request)) {
    request.bodyCache.formData = formDataPromise;
  }
  const formData = await formDataPromise;
  if (formData) {
    return convertFormDataToBodyData(formData, options);
  }
  return {};
}
function convertFormDataToBodyData(formData, options) {
  const form = /* @__PURE__ */ Object.create(null);
  formData.forEach((value, key) => {
    const shouldParseAllValues = options.all || key.endsWith("[]");
    if (!shouldParseAllValues) {
      form[key] = value;
    } else {
      handleParsingAllValues(form, key, value);
    }
  });
  if (options.dot) {
    Object.entries(form).forEach(([key, value]) => {
      const shouldParseDotValues = key.includes(".");
      if (shouldParseDotValues) {
        handleParsingNestedValues(form, key, value);
        delete form[key];
      }
    });
  }
  return form;
}
var handleParsingAllValues = (form, key, value) => {
  if (form[key] !== void 0) {
    if (Array.isArray(form[key])) {
      ;
      form[key].push(value);
    } else {
      form[key] = [form[key], value];
    }
  } else {
    if (!key.endsWith("[]")) {
      form[key] = value;
    } else {
      form[key] = [value];
    }
  }
};
var handleParsingNestedValues = (form, key, value) => {
  if (/(?:^|\.)__proto__\./.test(key)) {
    return;
  }
  let nestedForm = form;
  const keys = key.split(".");
  keys.forEach((key2, index) => {
    if (index === keys.length - 1) {
      nestedForm[key2] = value;
    } else {
      if (!nestedForm[key2] || typeof nestedForm[key2] !== "object" || Array.isArray(nestedForm[key2]) || nestedForm[key2] instanceof File) {
        nestedForm[key2] = /* @__PURE__ */ Object.create(null);
      }
      nestedForm = nestedForm[key2];
    }
  });
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/url.js
var splitPath = (path3) => {
  const paths = path3.split("/");
  if (paths[0] === "") {
    paths.shift();
  }
  return paths;
};
var splitRoutingPath = (routePath) => {
  const { groups, path: path3 } = extractGroupsFromPath(routePath);
  const paths = splitPath(path3);
  return replaceGroupMarks(paths, groups);
};
var extractGroupsFromPath = (path3) => {
  const groups = [];
  path3 = path3.replace(/\{[^}]+\}/g, (match2, index) => {
    const mark = `@${index}`;
    groups.push([mark, match2]);
    return mark;
  });
  return { groups, path: path3 };
};
var replaceGroupMarks = (paths, groups) => {
  for (let i = groups.length - 1; i >= 0; i--) {
    const [mark] = groups[i];
    for (let j = paths.length - 1; j >= 0; j--) {
      if (paths[j].includes(mark)) {
        paths[j] = paths[j].replace(mark, groups[i][1]);
        break;
      }
    }
  }
  return paths;
};
var patternCache = {};
var getPattern = (label, next2) => {
  if (label === "*") {
    return "*";
  }
  const match2 = label.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (match2) {
    const cacheKey = `${label}#${next2}`;
    if (!patternCache[cacheKey]) {
      if (match2[2]) {
        patternCache[cacheKey] = next2 && next2[0] !== ":" && next2[0] !== "*" ? [cacheKey, match2[1], new RegExp(`^${match2[2]}(?=/${next2})`)] : [label, match2[1], new RegExp(`^${match2[2]}$`)];
      } else {
        patternCache[cacheKey] = [label, match2[1], true];
      }
    }
    return patternCache[cacheKey];
  }
  return null;
};
var tryDecode = (str, decoder) => {
  try {
    return decoder(str);
  } catch {
    return str.replace(/(?:%[0-9A-Fa-f]{2})+/g, (match2) => {
      try {
        return decoder(match2);
      } catch {
        return match2;
      }
    });
  }
};
var tryDecodeURI = (str) => tryDecode(str, decodeURI);
var getPath = (request) => {
  const url = request.url;
  const start = url.indexOf("/", url.indexOf(":") + 4);
  let i = start;
  for (; i < url.length; i++) {
    const charCode = url.charCodeAt(i);
    if (charCode === 37) {
      const queryIndex = url.indexOf("?", i);
      const hashIndex = url.indexOf("#", i);
      const end = queryIndex === -1 ? hashIndex === -1 ? void 0 : hashIndex : hashIndex === -1 ? queryIndex : Math.min(queryIndex, hashIndex);
      const path3 = url.slice(start, end);
      return tryDecodeURI(path3.includes("%25") ? path3.replace(/%25/g, "%2525") : path3);
    } else if (charCode === 63 || charCode === 35) {
      break;
    }
  }
  return url.slice(start, i);
};
var getPathNoStrict = (request) => {
  const result = getPath(request);
  return result.length > 1 && result.at(-1) === "/" ? result.slice(0, -1) : result;
};
var mergePath = (base, sub, ...rest) => {
  if (rest.length) {
    sub = mergePath(sub, ...rest);
  }
  return `${base?.[0] === "/" ? "" : "/"}${base}${sub === "/" ? "" : `${base?.at(-1) === "/" ? "" : "/"}${sub?.[0] === "/" ? sub.slice(1) : sub}`}`;
};
var checkOptionalParameter = (path3) => {
  if (path3.charCodeAt(path3.length - 1) !== 63 || !path3.includes(":")) {
    return null;
  }
  const segments = path3.split("/");
  const results = [];
  let basePath = "";
  segments.forEach((segment) => {
    if (segment !== "" && !/\:/.test(segment)) {
      basePath += "/" + segment;
    } else if (/\:/.test(segment)) {
      if (segment.charCodeAt(segment.length - 1) === 63) {
        if (results.length === 0 && basePath === "") {
          results.push("/");
        } else {
          results.push(basePath);
        }
        const optionalSegment = segment.slice(0, -1);
        basePath += "/" + optionalSegment;
        results.push(basePath);
      } else {
        basePath += "/" + segment;
      }
    }
  });
  return results.filter((v, i, a) => a.indexOf(v) === i);
};
var tryDecodeURIComponent = (str) => str.indexOf("%") !== -1 ? tryDecode(str, decodeURIComponent_) : str;
var _decodeURI = (value) => {
  if (value.indexOf("+") !== -1) {
    value = value.replace(/\+/g, " ");
  }
  return tryDecodeURIComponent(value);
};
var _getQueryParam = (url, key, multiple) => {
  let encoded;
  if (!multiple && key && key.indexOf("%") === -1 && key.indexOf("+") === -1) {
    let keyIndex2 = url.indexOf("?", 8);
    if (keyIndex2 === -1) {
      return void 0;
    }
    if (!url.startsWith(key, keyIndex2 + 1)) {
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    while (keyIndex2 !== -1) {
      const trailingKeyCode = url.charCodeAt(keyIndex2 + key.length + 1);
      if (trailingKeyCode === 61) {
        const valueIndex = keyIndex2 + key.length + 2;
        const endIndex = url.indexOf("&", valueIndex);
        return _decodeURI(url.slice(valueIndex, endIndex === -1 ? void 0 : endIndex));
      } else if (trailingKeyCode == 38 || isNaN(trailingKeyCode)) {
        return "";
      }
      keyIndex2 = url.indexOf(`&${key}`, keyIndex2 + 1);
    }
    encoded = /[%+]/.test(url);
    if (!encoded) {
      return void 0;
    }
  }
  const results = /* @__PURE__ */ Object.create(null);
  encoded ??= /[%+]/.test(url);
  let keyIndex = url.indexOf("?", 8);
  while (keyIndex !== -1) {
    const nextKeyIndex = url.indexOf("&", keyIndex + 1);
    let valueIndex = url.indexOf("=", keyIndex);
    if (valueIndex > nextKeyIndex && nextKeyIndex !== -1) {
      valueIndex = -1;
    }
    let name = url.slice(
      keyIndex + 1,
      valueIndex === -1 ? nextKeyIndex === -1 ? void 0 : nextKeyIndex : valueIndex
    );
    if (encoded) {
      name = _decodeURI(name);
    }
    keyIndex = nextKeyIndex;
    if (name === "") {
      continue;
    }
    let value;
    if (valueIndex === -1) {
      value = "";
    } else {
      value = url.slice(valueIndex + 1, nextKeyIndex === -1 ? void 0 : nextKeyIndex);
      if (encoded) {
        value = _decodeURI(value);
      }
    }
    if (multiple) {
      if (!(results[name] && Array.isArray(results[name]))) {
        results[name] = [];
      }
      ;
      results[name].push(value);
    } else {
      results[name] ??= value;
    }
  }
  return key ? results[key] : results;
};
var getQueryParam = _getQueryParam;
var getQueryParams = (url, key) => {
  return _getQueryParam(url, key, true);
};
var decodeURIComponent_ = decodeURIComponent;

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/request.js
var HonoRequest = class {
  /**
   * `.raw` can get the raw Request object.
   *
   * @see {@link https://hono.dev/docs/api/request#raw}
   *
   * @example
   * ```ts
   * // For Cloudflare Workers
   * app.post('/', async (c) => {
   *   const metadata = c.req.raw.cf?.hostMetadata?
   *   ...
   * })
   * ```
   */
  raw;
  #validatedData;
  // Short name of validatedData
  #matchResult;
  routeIndex = 0;
  /**
   * `.path` can get the pathname of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#path}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const pathname = c.req.path // `/about/me`
   * })
   * ```
   */
  path;
  bodyCache = {};
  constructor(request, path3 = "/", matchResult = [[]]) {
    this.raw = request;
    this.path = path3;
    this.#matchResult = matchResult;
  }
  param(key) {
    return key ? this.#getDecodedParam(key) : this.#getAllDecodedParams();
  }
  #getDecodedParam(key) {
    const paramKey = this.#matchResult[0][this.routeIndex]?.[1][key];
    const param = this.#getParamValue(paramKey);
    return param && tryDecodeURIComponent(param);
  }
  #getAllDecodedParams() {
    const decoded = {};
    const keys = Object.keys(this.#matchResult[0][this.routeIndex]?.[1] ?? {});
    for (const key of keys) {
      const value = this.#getParamValue(this.#matchResult[0][this.routeIndex][1][key]);
      if (value !== void 0) {
        decoded[key] = tryDecodeURIComponent(value);
      }
    }
    return decoded;
  }
  #getParamValue(paramKey) {
    return this.#matchResult[1] ? this.#matchResult[1][paramKey] : paramKey;
  }
  query(key) {
    return getQueryParam(this.url, key);
  }
  queries(key) {
    return getQueryParams(this.url, key);
  }
  header(name) {
    if (name) {
      return this.raw.headers.get(name) ?? void 0;
    }
    const headerData = /* @__PURE__ */ Object.create(null);
    this.raw.headers.forEach((value, key) => {
      headerData[key] = value;
    });
    return headerData;
  }
  async parseBody(options) {
    return parseBody(this, options);
  }
  #cachedBody = (key) => {
    const { bodyCache, raw: raw2 } = this;
    const cachedBody = bodyCache[key];
    if (cachedBody) {
      return cachedBody;
    }
    for (const anyCachedKey in bodyCache) {
      return bodyCache[anyCachedKey].then((body) => {
        if (anyCachedKey === "json") {
          body = JSON.stringify(body);
        }
        return new Response(body)[key]();
      });
    }
    return bodyCache[key] = raw2[key]();
  };
  /**
   * `.json()` can parse Request body of type `application/json`
   *
   * @see {@link https://hono.dev/docs/api/request#json}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.json()
   * })
   * ```
   */
  json() {
    return this.#cachedBody("text").then((text) => JSON.parse(text));
  }
  /**
   * `.text()` can parse Request body of type `text/plain`
   *
   * @see {@link https://hono.dev/docs/api/request#text}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.text()
   * })
   * ```
   */
  text() {
    return this.#cachedBody("text");
  }
  /**
   * `.arrayBuffer()` parse Request body as an `ArrayBuffer`
   *
   * @see {@link https://hono.dev/docs/api/request#arraybuffer}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.arrayBuffer()
   * })
   * ```
   */
  arrayBuffer() {
    return this.#cachedBody("arrayBuffer");
  }
  /**
   * `.bytes()` parses the request body as a `Uint8Array`.
   *
   * @see {@link https://hono.dev/docs/api/request#bytes}
   *
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.bytes()
   * })
   * ```
   */
  bytes() {
    return this.#cachedBody("arrayBuffer").then((buffer) => new Uint8Array(buffer));
  }
  /**
   * Parses the request body as a `Blob`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.blob();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#blob
   */
  blob() {
    return this.#cachedBody("blob");
  }
  /**
   * Parses the request body as `FormData`.
   * @example
   * ```ts
   * app.post('/entry', async (c) => {
   *   const body = await c.req.formData();
   * });
   * ```
   * @see https://hono.dev/docs/api/request#formdata
   */
  formData() {
    return this.#cachedBody("formData");
  }
  /**
   * Adds validated data to the request.
   *
   * @param target - The target of the validation.
   * @param data - The validated data to add.
   */
  addValidatedData(target, data) {
    ;
    (this.#validatedData ??= {})[target] = data;
  }
  valid(target) {
    return this.#validatedData?.[target];
  }
  /**
   * `.url()` can get the request url strings.
   *
   * @see {@link https://hono.dev/docs/api/request#url}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const url = c.req.url // `http://localhost:8787/about/me`
   *   ...
   * })
   * ```
   */
  get url() {
    return this.raw.url;
  }
  /**
   * `.method()` can get the method name of the request.
   *
   * @see {@link https://hono.dev/docs/api/request#method}
   *
   * @example
   * ```ts
   * app.get('/about/me', (c) => {
   *   const method = c.req.method // `GET`
   * })
   * ```
   */
  get method() {
    return this.raw.method;
  }
  get [GET_MATCH_RESULT]() {
    return this.#matchResult;
  }
  /**
   * `.matchedRoutes()` can return a matched route in the handler
   *
   * @deprecated
   *
   * Use matchedRoutes helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#matchedroutes}
   *
   * @example
   * ```ts
   * app.use('*', async function logger(c, next) {
   *   await next()
   *   c.req.matchedRoutes.forEach(({ handler, method, path }, i) => {
   *     const name = handler.name || (handler.length < 2 ? '[handler]' : '[middleware]')
   *     console.log(
   *       method,
   *       ' ',
   *       path,
   *       ' '.repeat(Math.max(10 - path.length, 0)),
   *       name,
   *       i === c.req.routeIndex ? '<- respond from here' : ''
   *     )
   *   })
   * })
   * ```
   */
  get matchedRoutes() {
    return this.#matchResult[0].map(([[, route]]) => route);
  }
  /**
   * `routePath()` can retrieve the path registered within the handler
   *
   * @deprecated
   *
   * Use routePath helper defined in "hono/route" instead.
   *
   * @see {@link https://hono.dev/docs/api/request#routepath}
   *
   * @example
   * ```ts
   * app.get('/posts/:id', (c) => {
   *   return c.json({ path: c.req.routePath })
   * })
   * ```
   */
  get routePath() {
    return this.#matchResult[0].map(([[, route]]) => route)[this.routeIndex].path;
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/html.js
var HtmlEscapedCallbackPhase = {
  Stringify: 1,
  BeforeStream: 2,
  Stream: 3
};
var raw = (value, callbacks) => {
  const escapedString = new String(value);
  escapedString.isEscaped = true;
  escapedString.callbacks = callbacks;
  return escapedString;
};
var resolveCallback = async (str, phase, preserveCallbacks, context, buffer) => {
  if (typeof str === "object" && !(str instanceof String)) {
    if (!(str instanceof Promise)) {
      str = str.toString();
    }
    if (str instanceof Promise) {
      str = await str;
    }
  }
  const callbacks = str.callbacks;
  if (!callbacks?.length) {
    return Promise.resolve(str);
  }
  if (buffer) {
    buffer[0] += str;
  } else {
    buffer = [str];
  }
  const resStr = Promise.all(callbacks.map((c) => c({ phase, buffer, context }))).then(
    (res) => Promise.all(
      res.filter(Boolean).map((str2) => resolveCallback(str2, phase, false, context, buffer))
    ).then(() => buffer[0])
  );
  if (preserveCallbacks) {
    return raw(await resStr, callbacks);
  } else {
    return resStr;
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/context.js
var TEXT_PLAIN = "text/plain; charset=UTF-8";
var setDefaultContentType = (contentType, headers) => {
  return {
    "Content-Type": contentType,
    ...headers
  };
};
var createResponseInstance = (body, init) => new Response(body, init);
var Context = class {
  #rawRequest;
  #req;
  /**
   * `.env` can get bindings (environment variables, secrets, KV namespaces, D1 database, R2 bucket etc.) in Cloudflare Workers.
   *
   * @see {@link https://hono.dev/docs/api/context#env}
   *
   * @example
   * ```ts
   * // Environment object for Cloudflare Workers
   * app.get('*', async c => {
   *   const counter = c.env.COUNTER
   * })
   * ```
   */
  env = {};
  #var;
  finalized = false;
  /**
   * `.error` can get the error object from the middleware if the Handler throws an error.
   *
   * @see {@link https://hono.dev/docs/api/context#error}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   await next()
   *   if (c.error) {
   *     // do something...
   *   }
   * })
   * ```
   */
  error;
  #status;
  #executionCtx;
  #res;
  #layout;
  #renderer;
  #notFoundHandler;
  #preparedHeaders;
  #matchResult;
  #path;
  /**
   * Creates an instance of the Context class.
   *
   * @param req - The Request object.
   * @param options - Optional configuration options for the context.
   */
  constructor(req, options) {
    this.#rawRequest = req;
    if (options) {
      this.#executionCtx = options.executionCtx;
      this.env = options.env;
      this.#notFoundHandler = options.notFoundHandler;
      this.#path = options.path;
      this.#matchResult = options.matchResult;
    }
  }
  /**
   * `.req` is the instance of {@link HonoRequest}.
   */
  get req() {
    this.#req ??= new HonoRequest(this.#rawRequest, this.#path, this.#matchResult);
    return this.#req;
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#event}
   * The FetchEvent associated with the current request.
   *
   * @throws Will throw an error if the context does not have a FetchEvent.
   */
  get event() {
    if (this.#executionCtx && "respondWith" in this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no FetchEvent");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#executionctx}
   * The ExecutionContext associated with the current request.
   *
   * @throws Will throw an error if the context does not have an ExecutionContext.
   */
  get executionCtx() {
    if (this.#executionCtx) {
      return this.#executionCtx;
    } else {
      throw Error("This context has no ExecutionContext");
    }
  }
  /**
   * @see {@link https://hono.dev/docs/api/context#res}
   * The Response object for the current request.
   */
  get res() {
    return this.#res ||= createResponseInstance(null, {
      headers: this.#preparedHeaders ??= new Headers()
    });
  }
  /**
   * Sets the Response object for the current request.
   *
   * @param _res - The Response object to set.
   */
  set res(_res) {
    if (this.#res && _res) {
      _res = createResponseInstance(_res.body, _res);
      for (const [k, v] of this.#res.headers.entries()) {
        if (k === "content-type") {
          continue;
        }
        if (k === "set-cookie") {
          const cookies = this.#res.headers.getSetCookie();
          _res.headers.delete("set-cookie");
          for (const cookie of cookies) {
            _res.headers.append("set-cookie", cookie);
          }
        } else {
          _res.headers.set(k, v);
        }
      }
    }
    this.#res = _res;
    this.finalized = true;
  }
  /**
   * `.render()` can create a response within a layout.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   return c.render('Hello!')
   * })
   * ```
   */
  render = (...args) => {
    this.#renderer ??= (content) => this.html(content);
    return this.#renderer(...args);
  };
  /**
   * Sets the layout for the response.
   *
   * @param layout - The layout to set.
   * @returns The layout function.
   */
  setLayout = (layout) => this.#layout = layout;
  /**
   * Gets the current layout for the response.
   *
   * @returns The current layout function.
   */
  getLayout = () => this.#layout;
  /**
   * `.setRenderer()` can set the layout in the custom middleware.
   *
   * @see {@link https://hono.dev/docs/api/context#render-setrenderer}
   *
   * @example
   * ```tsx
   * app.use('*', async (c, next) => {
   *   c.setRenderer((content) => {
   *     return c.html(
   *       <html>
   *         <body>
   *           <p>{content}</p>
   *         </body>
   *       </html>
   *     )
   *   })
   *   await next()
   * })
   * ```
   */
  setRenderer = (renderer) => {
    this.#renderer = renderer;
  };
  /**
   * `.header()` can set headers.
   *
   * @see {@link https://hono.dev/docs/api/context#header}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *
   *   // Append multiple headers using the append option (e.g. Vary)
   *   c.header('Vary', 'Accept-Encoding', { append: true })
   *   c.header('Vary', 'User-Agent', { append: true })
   *
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  header = (name, value, options) => {
    if (this.finalized) {
      this.#res = createResponseInstance(this.#res.body, this.#res);
    }
    const headers = this.#res ? this.#res.headers : this.#preparedHeaders ??= new Headers();
    if (value === void 0) {
      headers.delete(name);
    } else if (options?.append) {
      headers.append(name, value);
    } else {
      headers.set(name, value);
    }
  };
  status = (status) => {
    this.#status = status;
  };
  /**
   * `.set()` can set the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.use('*', async (c, next) => {
   *   c.set('message', 'Hono is hot!!')
   *   await next()
   * })
   * ```
   */
  set = (key, value) => {
    this.#var ??= /* @__PURE__ */ new Map();
    this.#var.set(key, value);
  };
  /**
   * `.get()` can use the value specified by the key.
   *
   * @see {@link https://hono.dev/docs/api/context#set-get}
   *
   * @example
   * ```ts
   * app.get('/', (c) => {
   *   const message = c.get('message')
   *   return c.text(`The message is "${message}"`)
   * })
   * ```
   */
  get = (key) => {
    return this.#var ? this.#var.get(key) : void 0;
  };
  /**
   * `.var` can access the value of a variable.
   *
   * @see {@link https://hono.dev/docs/api/context#var}
   *
   * @example
   * ```ts
   * const result = c.var.client.oneMethod()
   * ```
   */
  // c.var.propName is a read-only
  get var() {
    if (!this.#var) {
      return {};
    }
    return Object.fromEntries(this.#var);
  }
  #newResponse(data, arg, headers) {
    let responseHeaders = this.#res ? new Headers(this.#res.headers) : this.#preparedHeaders;
    if (typeof arg === "object" && arg.headers) {
      responseHeaders ??= new Headers();
      for (const [key, value] of new Headers(arg.headers)) {
        if (key === "set-cookie") {
          responseHeaders.append(key, value);
        } else {
          responseHeaders.set(key, value);
        }
      }
    }
    if (headers) {
      if (!responseHeaders) {
        let count = 0;
        for (const k in headers) {
          if (++count > 1 || typeof headers[k] !== "string") {
            responseHeaders = new Headers();
            break;
          }
        }
      }
      if (responseHeaders) {
        for (const k in headers) {
          const v = headers[k];
          if (typeof v === "string") {
            responseHeaders.set(k, v);
          } else {
            responseHeaders.delete(k);
            for (const v2 of v) {
              responseHeaders.append(k, v2);
            }
          }
        }
      }
    }
    const status = typeof arg === "number" ? arg : arg?.status ?? this.#status;
    return createResponseInstance(data, {
      status,
      headers: responseHeaders ?? headers
    });
  }
  newResponse = (...args) => this.#newResponse(...args);
  /**
   * `.body()` can return the HTTP response.
   * You can set headers with `.header()` and set HTTP status code with `.status`.
   * This can also be set in `.text()`, `.json()` and so on.
   *
   * @see {@link https://hono.dev/docs/api/context#body}
   *
   * @example
   * ```ts
   * app.get('/welcome', (c) => {
   *   // Set headers
   *   c.header('X-Message', 'Hello!')
   *   c.header('Content-Type', 'text/plain')
   *   // Set HTTP status code
   *   c.status(201)
   *
   *   // Return the response body
   *   return c.body('Thank you for coming')
   * })
   * ```
   */
  body = (data, arg, headers) => this.#newResponse(data, arg, headers);
  /**
   * `.text()` can render text as `Content-Type:text/plain`.
   *
   * @see {@link https://hono.dev/docs/api/context#text}
   *
   * @example
   * ```ts
   * app.get('/say', (c) => {
   *   return c.text('Hello!')
   * })
   * ```
   */
  text = (text, arg, headers) => {
    return !this.#preparedHeaders && !this.#status && !arg && !headers && !this.finalized ? new Response(text) : this.#newResponse(
      text,
      arg,
      setDefaultContentType(TEXT_PLAIN, headers)
    );
  };
  /**
   * `.json()` can render JSON as `Content-Type:application/json`.
   *
   * @see {@link https://hono.dev/docs/api/context#json}
   *
   * @example
   * ```ts
   * app.get('/api', (c) => {
   *   return c.json({ message: 'Hello!' })
   * })
   * ```
   */
  json = (object, arg, headers) => {
    return this.#newResponse(
      JSON.stringify(object),
      arg,
      setDefaultContentType("application/json", headers)
    );
  };
  html = (html, arg, headers) => {
    const res = (html2) => this.#newResponse(html2, arg, setDefaultContentType("text/html; charset=UTF-8", headers));
    return typeof html === "object" ? resolveCallback(html, HtmlEscapedCallbackPhase.Stringify, false, {}).then(res) : res(html);
  };
  /**
   * `.redirect()` can Redirect, default status code is 302.
   *
   * @see {@link https://hono.dev/docs/api/context#redirect}
   *
   * @example
   * ```ts
   * app.get('/redirect', (c) => {
   *   return c.redirect('/')
   * })
   * app.get('/redirect-permanently', (c) => {
   *   return c.redirect('/', 301)
   * })
   * ```
   */
  redirect = (location, status) => {
    const locationString = String(location);
    this.header(
      "Location",
      // Multibyes should be encoded
      // eslint-disable-next-line no-control-regex
      !/[^\x00-\xFF]/.test(locationString) ? locationString : encodeURI(locationString)
    );
    return this.newResponse(null, status ?? 302);
  };
  /**
   * `.notFound()` can return the Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/context#notfound}
   *
   * @example
   * ```ts
   * app.get('/notfound', (c) => {
   *   return c.notFound()
   * })
   * ```
   */
  notFound = () => {
    this.#notFoundHandler ??= () => createResponseInstance();
    return this.#notFoundHandler(this);
  };
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router.js
var METHOD_NAME_ALL = "ALL";
var METHOD_NAME_ALL_LOWERCASE = "all";
var METHODS = ["get", "post", "put", "delete", "options", "patch", "query"];
var MESSAGE_MATCHER_IS_ALREADY_BUILT = "Can not add a route since the matcher is already built.";
var UnsupportedPathError = class extends Error {
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/constants.js
var COMPOSED_HANDLER = "__COMPOSED_HANDLER";

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/hono-base.js
var notFoundHandler = (c) => {
  return c.text("404 Not Found", 404);
};
var errorHandler = (err, c) => {
  if ("getResponse" in err) {
    const res = err.getResponse();
    return c.newResponse(res.body, res);
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
};
var Hono = class _Hono {
  get;
  post;
  put;
  delete;
  options;
  patch;
  query;
  all;
  on;
  use;
  /*
    This class is like an abstract class and does not have a router.
    To use it, inherit the class and implement router in the constructor.
  */
  router;
  getPath;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  _basePath = "/";
  #path = "/";
  routes = [];
  constructor(options = {}) {
    const allMethods = [...METHODS, METHOD_NAME_ALL_LOWERCASE];
    allMethods.forEach((method) => {
      this[method] = (args1, ...args) => {
        if (typeof args1 === "string") {
          this.#path = args1;
        } else {
          this.#addRoute(method, this.#path, args1);
        }
        args.forEach((handler) => {
          this.#addRoute(method, this.#path, handler);
        });
        return this;
      };
    });
    this.on = (method, path3, ...handlers) => {
      for (const p of [path3].flat()) {
        this.#path = p;
        for (const m of [method].flat()) {
          handlers.map((handler) => {
            this.#addRoute(m.toUpperCase(), this.#path, handler);
          });
        }
      }
      return this;
    };
    this.use = (arg1, ...handlers) => {
      if (typeof arg1 === "string") {
        this.#path = arg1;
      } else {
        this.#path = "*";
        handlers.unshift(arg1);
      }
      handlers.forEach((handler) => {
        this.#addRoute(METHOD_NAME_ALL, this.#path, handler);
      });
      return this;
    };
    const { strict, ...optionsWithoutStrict } = options;
    Object.assign(this, optionsWithoutStrict);
    this.getPath = strict ?? true ? options.getPath ?? getPath : getPathNoStrict;
  }
  #clone() {
    const clone = new _Hono({
      router: this.router,
      getPath: this.getPath
    });
    clone.errorHandler = this.errorHandler;
    clone.#notFoundHandler = this.#notFoundHandler;
    clone.routes = this.routes;
    return clone;
  }
  #notFoundHandler = notFoundHandler;
  // Cannot use `#` because it requires visibility at JavaScript runtime.
  errorHandler = errorHandler;
  /**
   * `.route()` allows grouping other Hono instance in routes.
   *
   * @see {@link https://hono.dev/docs/api/routing#grouping}
   *
   * @param {string} path - base Path
   * @param {Hono} app - other Hono instance
   * @returns {Hono} routed Hono instance
   *
   * @example
   * ```ts
   * const app = new Hono()
   * const app2 = new Hono()
   *
   * app2.get("/user", (c) => c.text("user"))
   * app.route("/api", app2) // GET /api/user
   * ```
   */
  route(path3, app2) {
    const subApp = this.basePath(path3);
    app2.routes.map((r) => {
      let handler;
      if (app2.errorHandler === errorHandler) {
        handler = r.handler;
      } else {
        handler = async (c, next2) => (await compose([], app2.errorHandler)(c, () => r.handler(c, next2))).res;
        handler[COMPOSED_HANDLER] = r.handler;
      }
      subApp.#addRoute(r.method, r.path, handler, r.basePath);
    });
    return this;
  }
  /**
   * `.basePath()` allows base paths to be specified.
   *
   * @see {@link https://hono.dev/docs/api/routing#base-path}
   *
   * @param {string} path - base Path
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * const api = new Hono().basePath('/api')
   * ```
   */
  basePath(path3) {
    const subApp = this.#clone();
    subApp._basePath = mergePath(this._basePath, path3);
    return subApp;
  }
  /**
   * `.onError()` handles an error and returns a customized Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#error-handling}
   *
   * @param {ErrorHandler} handler - request Handler for error
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.onError((err, c) => {
   *   console.error(`${err}`)
   *   return c.text('Custom Error Message', 500)
   * })
   * ```
   */
  onError = (handler) => {
    this.errorHandler = handler;
    return this;
  };
  /**
   * `.notFound()` allows you to customize a Not Found Response.
   *
   * @see {@link https://hono.dev/docs/api/hono#not-found}
   *
   * @param {NotFoundHandler} handler - request handler for not-found
   * @returns {Hono} changed Hono instance
   *
   * @example
   * ```ts
   * app.notFound((c) => {
   *   return c.text('Custom 404 Message', 404)
   * })
   * ```
   */
  notFound = (handler) => {
    this.#notFoundHandler = handler;
    return this;
  };
  /**
   * `.mount()` allows you to mount applications built with other frameworks into your Hono application.
   *
   * @see {@link https://hono.dev/docs/api/hono#mount}
   *
   * @param {string} path - base Path
   * @param {Function} applicationHandler - other Request Handler
   * @param {MountOptions} [options] - options of `.mount()`
   * @returns {Hono} mounted Hono instance
   *
   * @example
   * ```ts
   * import { Router as IttyRouter } from 'itty-router'
   * import { Hono } from 'hono'
   * // Create itty-router application
   * const ittyRouter = IttyRouter()
   * // GET /itty-router/hello
   * ittyRouter.get('/hello', () => new Response('Hello from itty-router'))
   *
   * const app = new Hono()
   * app.mount('/itty-router', ittyRouter.handle)
   * ```
   *
   * @example
   * ```ts
   * const app = new Hono()
   * // Send the request to another application without modification.
   * app.mount('/app', anotherApp, {
   *   replaceRequest: (req) => req,
   * })
   * ```
   */
  mount(path3, applicationHandler, options) {
    let replaceRequest;
    let optionHandler;
    if (options) {
      if (typeof options === "function") {
        optionHandler = options;
      } else {
        optionHandler = options.optionHandler;
        if (options.replaceRequest === false) {
          replaceRequest = (request) => request;
        } else {
          replaceRequest = options.replaceRequest;
        }
      }
    }
    const getOptions = optionHandler ? (c) => {
      const options2 = optionHandler(c);
      return Array.isArray(options2) ? options2 : [options2];
    } : (c) => {
      let executionContext = void 0;
      try {
        executionContext = c.executionCtx;
      } catch {
      }
      return [c.env, executionContext];
    };
    replaceRequest ||= (() => {
      const mergedPath = mergePath(this._basePath, path3);
      const pathPrefixLength = mergedPath === "/" ? 0 : mergedPath.length;
      return (request) => {
        const url = new URL(request.url);
        url.pathname = this.getPath(request).slice(pathPrefixLength) || "/";
        return new Request(url, request);
      };
    })();
    const handler = async (c, next2) => {
      const res = await applicationHandler(replaceRequest(c.req.raw), ...getOptions(c));
      if (res) {
        return res;
      }
      await next2();
    };
    this.#addRoute(METHOD_NAME_ALL, mergePath(path3, "*"), handler);
    return this;
  }
  #addRoute(method, path3, handler, baseRoutePath) {
    method = method.toUpperCase();
    path3 = mergePath(this._basePath, path3);
    const r = {
      basePath: baseRoutePath !== void 0 ? mergePath(this._basePath, baseRoutePath) : this._basePath,
      path: path3,
      method,
      handler
    };
    this.router.add(method, path3, [handler, r]);
    this.routes.push(r);
  }
  #handleError(err, c) {
    if (err instanceof Error) {
      return this.errorHandler(err, c);
    }
    throw err;
  }
  #dispatch(request, executionCtx, env2, method) {
    if (method === "HEAD") {
      return (async () => new Response(null, await this.#dispatch(request, executionCtx, env2, "GET")))();
    }
    const path3 = this.getPath(request, { env: env2 });
    const matchResult = this.router.match(method, path3);
    const c = new Context(request, {
      path: path3,
      matchResult,
      env: env2,
      executionCtx,
      notFoundHandler: this.#notFoundHandler
    });
    if (matchResult[0].length === 1) {
      let res;
      try {
        res = matchResult[0][0][0][0](c, async () => {
          c.res = await this.#notFoundHandler(c);
        });
      } catch (err) {
        return this.#handleError(err, c);
      }
      return res instanceof Promise ? res.then(
        (resolved2) => resolved2 || (c.finalized ? c.res : this.#notFoundHandler(c))
      ).catch((err) => this.#handleError(err, c)) : res ?? this.#notFoundHandler(c);
    }
    const composed = compose(matchResult[0], this.errorHandler, this.#notFoundHandler);
    return (async () => {
      try {
        const context = await composed(c);
        if (!context.finalized) {
          throw new Error(
            "Context is not finalized. Did you forget to return a Response object or `await next()`?"
          );
        }
        return context.res;
      } catch (err) {
        return this.#handleError(err, c);
      }
    })();
  }
  /**
   * `.fetch()` will be entry point of your app.
   *
   * @see {@link https://hono.dev/docs/api/hono#fetch}
   *
   * @param {Request} request - request Object of request
   * @param {Env} env - env Object
   * @param {ExecutionContext} executionCtx - context of execution
   * @returns {Response | Promise<Response>} response of request
   *
   */
  fetch = (request, ...rest) => {
    return this.#dispatch(request, rest[1], rest[0], request.method);
  };
  /**
   * `.request()` is a useful method for testing.
   * You can pass a URL or pathname to send a GET request.
   * app will return a Response object.
   * ```ts
   * test('GET /hello is ok', async () => {
   *   const res = await app.request('/hello')
   *   expect(res.status).toBe(200)
   * })
   * ```
   * @see https://hono.dev/docs/api/hono#request
   */
  request = (input, requestInit, Env, executionCtx) => {
    if (input instanceof Request) {
      return this.fetch(requestInit ? new Request(input, requestInit) : input, Env, executionCtx);
    }
    input = input.toString();
    return this.fetch(
      new Request(
        /^https?:\/\//.test(input) ? input : `http://localhost${mergePath("/", input)}`,
        requestInit
      ),
      Env,
      executionCtx
    );
  };
  /**
   * `.fire()` automatically adds a global fetch event listener.
   * This can be useful for environments that adhere to the Service Worker API, such as non-ES module Cloudflare Workers.
   * @deprecated
   * Use `fire` from `hono/service-worker` instead.
   * ```ts
   * import { Hono } from 'hono'
   * import { fire } from 'hono/service-worker'
   *
   * const app = new Hono()
   * // ...
   * fire(app)
   * ```
   * @see https://hono.dev/docs/api/hono#fire
   * @see https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
   * @see https://developers.cloudflare.com/workers/reference/migrate-to-module-workers/
   */
  fire = () => {
    addEventListener("fetch", (event) => {
      event.respondWith(this.#dispatch(event.request, event, void 0, event.request.method));
    });
  };
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/utils.js
var createNullObject = () => /* @__PURE__ */ Object.create(null);

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/reg-exp-router/matcher.js
var emptyParam = [];
function match(method, path3) {
  const matchers = this.buildAllMatchers();
  const match2 = (method2, path22) => {
    const matcher = matchers[method2] || matchers[METHOD_NAME_ALL];
    const staticMatch = matcher[2][path22];
    if (staticMatch) {
      return staticMatch;
    }
    const match3 = path22.match(matcher[0]);
    if (!match3) {
      return [[], emptyParam];
    }
    const index = match3.indexOf("", 1);
    return [matcher[1][index], match3];
  };
  this.match = match2;
  return match2(method, path3);
}

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/reg-exp-router/node.js
var LABEL_REG_EXP_STR = "[^/]+";
var ONLY_WILDCARD_REG_EXP_STR = ".*";
var TAIL_WILDCARD_REG_EXP_STR = "(?:|/.*)";
var PATH_ERROR = /* @__PURE__ */ Symbol();
var regExpMetaChars = new Set(".\\+*[^]$()");
function compareKey(a, b) {
  if (a.length === 1) {
    return b.length === 1 ? a < b ? -1 : 1 : -1;
  }
  if (b.length === 1) {
    return 1;
  }
  if (a === ONLY_WILDCARD_REG_EXP_STR || a === TAIL_WILDCARD_REG_EXP_STR) {
    return b === TAIL_WILDCARD_REG_EXP_STR ? -1 : 1;
  } else if (b === ONLY_WILDCARD_REG_EXP_STR || b === TAIL_WILDCARD_REG_EXP_STR) {
    return -1;
  }
  if (a === LABEL_REG_EXP_STR) {
    return 1;
  } else if (b === LABEL_REG_EXP_STR) {
    return -1;
  }
  return a.length === b.length ? a < b ? -1 : 1 : b.length - a.length;
}
var Node = class _Node {
  // handler index of a dynamic path, or -1 for a static path terminal
  #index;
  #varIndex;
  #children = createNullObject();
  insert(tokens, index, paramMap, context, isStatic) {
    let node = this;
    for (let i = 0, len = tokens.length; i < len; i++) {
      const token = tokens[i];
      const pattern = token.length === 1 ? token === "*" ? i === len - 1 ? ["", "", ONLY_WILDCARD_REG_EXP_STR] : ["", "", LABEL_REG_EXP_STR] : null : token === "/*" ? ["", "", TAIL_WILDCARD_REG_EXP_STR] : token.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
      let nextNode;
      if (pattern) {
        const name = pattern[1];
        let regexpStr = pattern[2] || LABEL_REG_EXP_STR;
        if (name && pattern[2]) {
          if (regexpStr === ".*") {
            throw PATH_ERROR;
          }
          regexpStr = regexpStr.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:");
          if (/\((?!\?:)/.test(regexpStr)) {
            throw PATH_ERROR;
          }
          if (regexpStr.length === 1 && regExpMetaChars.has(regexpStr)) {
            throw PATH_ERROR;
          }
        }
        nextNode = node.#children[regexpStr];
        if (!nextNode) {
          if (regexpStr !== ONLY_WILDCARD_REG_EXP_STR && regexpStr !== TAIL_WILDCARD_REG_EXP_STR) {
            for (const k in node.#children) {
              if (
                // a single-char pattern coexists with single-char literals as a literal does
                (regexpStr.length > 1 || k.length > 1) && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR
              ) {
                throw PATH_ERROR;
              }
            }
          }
          nextNode = node.#children[regexpStr] = new _Node();
        }
        if (name !== "") {
          nextNode.#varIndex ??= context.varIndex++;
          paramMap.push([name, nextNode.#varIndex]);
        }
      } else {
        nextNode = node.#children[token];
        if (!nextNode) {
          for (const k in node.#children) {
            if (k.length > 1 && k !== ONLY_WILDCARD_REG_EXP_STR && k !== TAIL_WILDCARD_REG_EXP_STR) {
              throw PATH_ERROR;
            }
          }
          nextNode = node.#children[token] = new _Node();
        }
      }
      node = nextNode;
    }
    if (node.#index !== void 0) {
      throw PATH_ERROR;
    }
    node.#index = isStatic ? -1 : index;
  }
  buildRegExpStr() {
    const childKeys = Object.keys(this.#children).sort(compareKey);
    const strList = childKeys.map((k) => {
      const c = this.#children[k];
      const childStr = c.buildRegExpStr();
      return childStr === "" ? "" : (typeof c.#varIndex === "number" ? `(${k})@${c.#varIndex}` : regExpMetaChars.has(k) ? `\\${k}` : k) + childStr;
    }).filter(Boolean);
    if (typeof this.#index === "number" && this.#index !== -1) {
      strList.unshift(`#${this.#index}`);
    }
    if (strList.length === 0) {
      return "";
    }
    if (strList.length === 1) {
      return strList[0];
    }
    return "(?:" + strList.join("|") + ")";
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/reg-exp-router/trie.js
var Trie = class {
  #context = { varIndex: 0 };
  #root = new Node();
  #index = 0;
  // dynamic path -> [handler index, param assoc]; static paths are not registered
  paths = createNullObject();
  insert(path3, isStatic) {
    if (isStatic) {
      this.#root.insert(path3.split(""), 0, [], this.#context, true);
      return;
    }
    const paramAssoc = [];
    const groups = [];
    let markedPath = path3;
    for (let i = 0; ; ) {
      let replaced = false;
      markedPath = markedPath.replace(/\{[^}]+\}/g, (m) => {
        const mark = `@\\${i}`;
        groups[i] = [mark, m];
        i++;
        replaced = true;
        return mark;
      });
      if (!replaced) {
        break;
      }
    }
    const tokens = markedPath.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = groups.length - 1; i >= 0; i--) {
      const [mark] = groups[i];
      for (let j = tokens.length - 1; j >= 0; j--) {
        if (tokens[j].indexOf(mark) !== -1) {
          tokens[j] = tokens[j].replace(mark, groups[i][1]);
          break;
        }
      }
    }
    this.#root.insert(tokens, this.#index, paramAssoc, this.#context, false);
    this.paths[path3] = [this.#index++, paramAssoc];
  }
  buildRegExp() {
    let regexp = this.#root.buildRegExpStr();
    if (regexp === "") {
      return [/^$/, [], []];
    }
    let captureIndex = 0;
    const indexReplacementMap = [];
    const paramReplacementMap = [];
    regexp = regexp.replace(/#(\d+)|@(\d+)|\.\*\$/g, (_, handlerIndex, paramIndex) => {
      if (handlerIndex !== void 0) {
        indexReplacementMap[++captureIndex] = Number(handlerIndex);
        return "$()";
      }
      if (paramIndex !== void 0) {
        paramReplacementMap[Number(paramIndex)] = ++captureIndex;
        return "";
      }
      return "";
    });
    return [new RegExp(`^${regexp}`), indexReplacementMap, paramReplacementMap];
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/reg-exp-router/router.js
var wildcardRegExpCache = createNullObject();
function buildWildcardRegExp(path3) {
  return wildcardRegExpCache[path3] ??= new RegExp(
    `^${path3.replace(
      /\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,
      (match2, metaChar) => metaChar ? `\\${metaChar}` : match2 === "/*" ? TAIL_WILDCARD_REG_EXP_STR : match2 === "*" ? ONLY_WILDCARD_REG_EXP_STR : `/:${LABEL_REG_EXP_STR}`
    )}$`
  );
}
function findMiddleware(middleware, path3) {
  for (const k of Object.keys(middleware).sort((a, b) => b.length - a.length)) {
    if (buildWildcardRegExp(k).test(path3)) {
      return [...middleware[k]];
    }
  }
  return void 0;
}
var RegExpRouter = class {
  name = "RegExpRouter";
  #middleware;
  #routes;
  #tries;
  constructor() {
    this.#middleware = { [METHOD_NAME_ALL]: createNullObject() };
    this.#routes = { [METHOD_NAME_ALL]: createNullObject() };
    this.#tries = { [METHOD_NAME_ALL]: new Trie() };
  }
  #insertPath(method, path3) {
    try {
      this.#tries[method].insert(path3, !/\*|\/:/.test(path3));
    } catch (e) {
      throw e === PATH_ERROR ? new UnsupportedPathError(path3) : e;
    }
  }
  add(method, path3, handler) {
    const middleware = this.#middleware;
    const routes = this.#routes;
    if (!middleware) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    if (!middleware[method]) {
      this.#tries[method] = new Trie();
      for (const handlerMap of [middleware, routes]) {
        handlerMap[method] = createNullObject();
        for (const p in handlerMap[METHOD_NAME_ALL]) {
          handlerMap[method][p] = [...handlerMap[METHOD_NAME_ALL][p]];
          this.#insertPath(method, p);
        }
      }
    }
    if (path3 === "/*") {
      path3 = "*";
    }
    const methods = method === METHOD_NAME_ALL ? Object.keys(middleware) : [method];
    if (/\*$/.test(path3)) {
      const re = buildWildcardRegExp(path3);
      for (const m of methods) {
        if (!middleware[m][path3]) {
          this.#insertPath(m, path3);
          middleware[m][path3] = findMiddleware(middleware[m], path3) || findMiddleware(middleware[METHOD_NAME_ALL], path3) || [];
        }
      }
      for (const handlerMap of [middleware, routes]) {
        for (const m of methods) {
          for (const p in handlerMap[m]) {
            re.test(p) && handlerMap[m][p].push([handler, path3]);
          }
        }
      }
      return;
    }
    const paths = checkOptionalParameter(path3) || [path3];
    for (const path22 of paths) {
      for (const m of methods) {
        if (!routes[m][path22]) {
          this.#insertPath(m, path22);
          routes[m][path22] = findMiddleware(middleware[m], path22) || findMiddleware(middleware[METHOD_NAME_ALL], path22) || [];
        }
        routes[m][path22].push([handler, path22]);
      }
    }
  }
  match = match;
  buildAllMatchers() {
    const matchers = createNullObject();
    for (const method of Object.keys(this.#routes)) {
      matchers[method] = this.#buildMatcher(method);
    }
    this.#middleware = this.#routes = this.#tries = void 0;
    wildcardRegExpCache = createNullObject();
    return matchers;
  }
  #buildMatcher(method) {
    const middleware = this.#middleware[method];
    const routes = this.#routes[method];
    const trie = this.#tries[method];
    const staticMap = createNullObject();
    const handlerData = [];
    const [regexp, indexReplacementMap, paramReplacementMap] = trie.buildRegExp();
    for (const r of [middleware, routes]) {
      for (const path3 in r) {
        const handlers = r[path3];
        const pathData = trie.paths[path3];
        if (!pathData) {
          staticMap[path3] = [handlers.map(([h]) => [h, createNullObject()]), emptyParam];
          continue;
        }
        handlerData[pathData[0]] = handlers.map(([h, handlerPath]) => [
          h,
          trie.paths[handlerPath][1].reduceRight((map, [key], i) => {
            map[key] = paramReplacementMap[pathData[1][i][1]];
            return map;
          }, createNullObject())
        ]);
      }
    }
    return [regexp, indexReplacementMap.map((i) => handlerData[i]), staticMap];
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/smart-router/router.js
var SmartRouter = class {
  name = "SmartRouter";
  #routers = [];
  #routes = [];
  constructor(init) {
    this.#routers = init.routers;
  }
  add(method, path3, handler) {
    if (!this.#routes) {
      throw new Error(MESSAGE_MATCHER_IS_ALREADY_BUILT);
    }
    this.#routes.push([method, path3, handler]);
  }
  match(method, path3) {
    if (!this.#routes) {
      throw new Error("Fatal error");
    }
    const routers = this.#routers;
    const routes = this.#routes;
    const len = routers.length;
    let i = 0;
    let res;
    for (; i < len; i++) {
      const router = routers[i];
      try {
        for (let i2 = 0, len2 = routes.length; i2 < len2; i2++) {
          router.add(...routes[i2]);
        }
        res = router.match(method, path3);
      } catch (e) {
        if (e instanceof UnsupportedPathError) {
          continue;
        }
        throw e;
      }
      this.match = router.match.bind(router);
      this.#routers = [router];
      this.#routes = void 0;
      break;
    }
    if (i === len) {
      throw new Error("Fatal error");
    }
    this.name = `SmartRouter + ${this.activeRouter.name}`;
    return res;
  }
  get activeRouter() {
    if (this.#routes || this.#routers.length !== 1) {
      throw new Error("No active router has been determined yet.");
    }
    return this.#routers[0];
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/trie-router/node.js
var emptyParams = createNullObject();
var order = 0;
var Node2 = class _Node2 {
  #methods = [];
  #children = createNullObject();
  #patterns = [];
  #pattern;
  #params = emptyParams;
  insert(method, path3, handler) {
    let curNode = this;
    const parts = splitRoutingPath(path3);
    const possibleKeys = /* @__PURE__ */ new Set();
    let i = 0;
    for (const p of parts) {
      const nextP = parts[++i];
      const pattern = getPattern(p, nextP) || (nextP === void 0 && p && p.indexOf("*") === p.length - 1 ? p : null);
      const isParam = Array.isArray(pattern);
      const key = isParam ? pattern[0] : pattern || p;
      const child = curNode.#children[key] ||= new _Node2();
      if (pattern && !child.#pattern) {
        child.#pattern = pattern;
        curNode.#patterns.push(child);
      }
      curNode = child;
      if (isParam) {
        possibleKeys.add(pattern[1]);
      }
    }
    curNode.#methods.push({
      [method]: {
        handler,
        possibleKeys: [...possibleKeys],
        score: ++order
      }
    });
  }
  #pushHandlerSets(handlerSets, node, method, nodeParams, params) {
    for (let i = 0, len = node.#methods.length; i < len; i++) {
      const m = node.#methods[i];
      const handlerSet = m[method] || m[METHOD_NAME_ALL];
      if (handlerSet) {
        handlerSet.params = createNullObject();
        handlerSets.push(handlerSet);
        for (let i2 = 0, len2 = handlerSet.possibleKeys.length; i2 < len2; i2++) {
          const key = handlerSet.possibleKeys[i2];
          handlerSet.params[key] = params?.[key] && !i2 ? params[key] : nodeParams[key] ?? params?.[key];
        }
      }
    }
  }
  search(method, path3) {
    const handlerSets = [];
    this.#params = emptyParams;
    const curNode = this;
    let curNodes = [curNode];
    const parts = splitPath(path3);
    const curNodesQueue = [];
    const len = parts.length;
    let partOffsets = null;
    for (let i = 0; i < len; i++) {
      const part = parts[i];
      const isLast = i === len - 1;
      const tempNodes = [];
      for (let j = 0, len2 = curNodes.length; j < len2; j++) {
        const node = curNodes[j];
        const nextNode = node.#children[part];
        if (nextNode) {
          nextNode.#params = node.#params;
          if (isLast) {
            if (nextNode.#children["*"]) {
              this.#pushHandlerSets(handlerSets, nextNode.#children["*"], method, node.#params);
            }
            this.#pushHandlerSets(handlerSets, nextNode, method, node.#params);
          } else {
            tempNodes.push(nextNode);
          }
        }
        for (const child of node.#patterns) {
          const pattern = child.#pattern;
          const params = node.#params === emptyParams ? {} : { ...node.#params };
          if (typeof pattern === "string") {
            if (pattern === "*" || part.startsWith(pattern.slice(0, -1))) {
              this.#pushHandlerSets(handlerSets, child, method, node.#params);
              if (pattern === "*") {
                child.#params = params;
                tempNodes.push(child);
              }
            }
            continue;
          }
          const [, name, matcher] = pattern;
          if (!part && matcher === true) {
            continue;
          }
          if (matcher !== true) {
            if (!partOffsets) {
              partOffsets = [];
              let offset = path3[0] === "/" ? 1 : 0;
              for (let p = 0; p < len; p++) {
                partOffsets[p] = offset;
                offset += parts[p].length + 1;
              }
            }
            const restPathString = path3.slice(partOffsets[i]);
            const m = matcher.exec(restPathString);
            if (m) {
              params[name] = m[0];
              this.#pushHandlerSets(handlerSets, child, method, node.#params, params);
              if (m[0].length === restPathString.length && child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  node.#params,
                  params
                );
              }
              for (const _ in child.#children) {
                child.#params = params;
                const componentCount = m[0].match(/\//g)?.length ?? 0;
                const targetCurNodes = curNodesQueue[componentCount] ||= [];
                targetCurNodes.push(child);
                break;
              }
              continue;
            }
          }
          if (matcher === true || matcher.test(part)) {
            params[name] = part;
            if (isLast) {
              this.#pushHandlerSets(handlerSets, child, method, params, node.#params);
              if (child.#children["*"]) {
                this.#pushHandlerSets(
                  handlerSets,
                  child.#children["*"],
                  method,
                  params,
                  node.#params
                );
              }
            } else {
              child.#params = params;
              tempNodes.push(child);
            }
          }
        }
      }
      const shifted = curNodesQueue.shift();
      curNodes = shifted ? tempNodes.concat(shifted) : tempNodes;
    }
    if (handlerSets[1]) {
      handlerSets.sort((a, b) => {
        return a.score - b.score;
      });
    }
    return [handlerSets.map(({ handler, params }) => [handler, params])];
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/router/trie-router/router.js
var TrieRouter = class {
  name = "TrieRouter";
  #node = new Node2();
  add(method, path3, handler) {
    for (const result of checkOptionalParameter(path3) || [path3]) {
      this.#node.insert(method, result, handler);
    }
  }
  match(method, path3) {
    return this.#node.search(method, path3);
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/hono.js
var Hono2 = class extends Hono {
  /**
   * Creates an instance of the Hono class.
   *
   * @param options - Optional configuration options for the Hono instance.
   */
  constructor(options = {}) {
    super(options);
    this.router = options.router ?? new SmartRouter({
      routers: [new RegExpRouter(), new TrieRouter()]
    });
  }
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/middleware/cors/index.js
var cors = (options) => {
  const opts = {
    origin: "*",
    allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH", "QUERY"],
    allowHeaders: [],
    exposeHeaders: [],
    ...options
  };
  const exposeHeadersStr = opts.exposeHeaders?.length ? opts.exposeHeaders.join(",") : void 0;
  const allowHeadersStr = opts.allowHeaders?.length ? opts.allowHeaders.join(",") : void 0;
  const findAllowOrigin = ((optsOrigin) => {
    if (typeof optsOrigin === "string") {
      if (optsOrigin === "*") {
        return () => optsOrigin;
      } else {
        return (origin) => optsOrigin === origin ? origin : null;
      }
    } else if (typeof optsOrigin === "function") {
      return optsOrigin;
    } else {
      return (origin) => optsOrigin.includes(origin) ? origin : null;
    }
  })(opts.origin);
  const findAllowMethods = ((optsAllowMethods) => {
    if (typeof optsAllowMethods === "function") {
      return async (origin, c) => (await optsAllowMethods(origin, c)).join(",");
    } else if (Array.isArray(optsAllowMethods)) {
      const methodsStr = optsAllowMethods.join(",");
      return () => methodsStr;
    } else {
      return () => "";
    }
  })(opts.allowMethods);
  return async function cors2(c, next2) {
    function set(key, value) {
      c.res.headers.set(key, value);
    }
    const allowOrigin = await findAllowOrigin(c.req.header("origin") || "", c);
    if (allowOrigin) {
      set("Access-Control-Allow-Origin", allowOrigin);
    }
    if (opts.credentials) {
      set("Access-Control-Allow-Credentials", "true");
    }
    if (exposeHeadersStr) {
      set("Access-Control-Expose-Headers", exposeHeadersStr);
    }
    if (c.req.method === "OPTIONS") {
      if (opts.origin !== "*") {
        c.res.headers.append("Vary", "Origin");
      }
      if (opts.maxAge != null) {
        set("Access-Control-Max-Age", opts.maxAge.toString());
      }
      const allowMethods = await findAllowMethods(c.req.header("origin") || "", c);
      if (allowMethods) {
        set("Access-Control-Allow-Methods", allowMethods);
      }
      let headersStr = allowHeadersStr;
      if (!headersStr) {
        const requestHeaders = c.req.header("Access-Control-Request-Headers");
        if (requestHeaders) {
          headersStr = requestHeaders.split(",").map((h) => h.trim()).join(",");
        }
      }
      if (headersStr) {
        set("Access-Control-Allow-Headers", headersStr);
        c.res.headers.append("Vary", "Access-Control-Request-Headers");
      }
      c.res.headers.delete("Content-Length");
      c.res.headers.delete("Content-Type");
      return new Response(null, {
        headers: c.res.headers,
        status: 204,
        statusText: "No Content"
      });
    }
    await next2();
    if (opts.origin !== "*") {
      c.header("Vary", "Origin", { append: true });
    }
  };
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/color.js
function getColorEnabled() {
  const { process: process2, Deno } = globalThis;
  const isNoColor = typeof Deno?.noColor === "boolean" ? Deno.noColor : process2 !== void 0 ? (
    // eslint-disable-next-line no-unsafe-optional-chaining
    "NO_COLOR" in process2?.env
  ) : false;
  return !isNoColor;
}
async function getColorEnabledAsync() {
  const { navigator } = globalThis;
  const cfWorkers = "cloudflare:workers";
  const isNoColor = navigator !== void 0 && navigator.userAgent === "Cloudflare-Workers" ? await (async () => {
    try {
      return "NO_COLOR" in ((await import(cfWorkers)).env ?? {});
    } catch {
      return false;
    }
  })() : !getColorEnabled();
  return !isNoColor;
}

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/middleware/logger/index.js
var humanize = (times) => {
  const [delimiter, separator] = [",", "."];
  const orderTimes = times.map((v) => v.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + delimiter));
  return orderTimes.join(separator);
};
var time = (start) => {
  const delta = Date.now() - start;
  return humanize([delta < 1e3 ? delta + "ms" : Math.round(delta / 1e3) + "s"]);
};
var colorStatus = async (status) => {
  const colorEnabled = await getColorEnabledAsync();
  if (colorEnabled) {
    switch (status / 100 | 0) {
      case 5:
        return `\x1B[31m${status}\x1B[0m`;
      case 4:
        return `\x1B[33m${status}\x1B[0m`;
      case 3:
        return `\x1B[36m${status}\x1B[0m`;
      case 2:
        return `\x1B[32m${status}\x1B[0m`;
    }
  }
  return `${status}`;
};
async function log(fn, prefix, method, path3, status = 0, elapsed) {
  const out = prefix === "<--" ? `${prefix} ${method} ${path3}` : `${prefix} ${method} ${path3} ${await colorStatus(status)} ${elapsed}`;
  fn(out);
}
var logger = (fn = console.log) => {
  return async function logger2(c, next2) {
    const { method, url } = c.req;
    const path3 = url.slice(url.indexOf("/", 8));
    await log(fn, "<--", method, path3);
    const start = Date.now();
    await next2();
    await log(fn, "-->", method, path3, c.res.status, time(start));
  };
};

// apps/api/src/routes/health.ts
var healthRoutes = new Hono2();
healthRoutes.get("/", (c) => c.json({ status: "ok", service: "jeevansetu-api", time: (/* @__PURE__ */ new Date()).toISOString() }));

// apps/api/src/routes/aadhaar.ts
init_zod();

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/utils/cookie.js
var relaxedCookieNameRegEx = /^[!#-:<>-[\]-~]+$/;
var validCookieValueRegEx = /^[ !#-:<-[\]-~]*$/;
var trimCookieWhitespace = (value) => {
  let start = 0;
  let end = value.length;
  while (start < end) {
    const charCode = value.charCodeAt(start);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    start++;
  }
  while (end > start) {
    const charCode = value.charCodeAt(end - 1);
    if (charCode !== 32 && charCode !== 9) {
      break;
    }
    end--;
  }
  return start === 0 && end === value.length ? value : value.slice(start, end);
};
var parse = (cookie, name) => {
  if (name && cookie.indexOf(name) === -1) {
    return {};
  }
  const pairs = cookie.split(";");
  const parsedCookie = /* @__PURE__ */ Object.create(null);
  for (const pairStr of pairs) {
    const valueStartPos = pairStr.indexOf("=");
    if (valueStartPos === -1) {
      continue;
    }
    const cookieName = trimCookieWhitespace(pairStr.substring(0, valueStartPos));
    if (name && name !== cookieName || !relaxedCookieNameRegEx.test(cookieName) || cookieName in parsedCookie) {
      continue;
    }
    let cookieValue = trimCookieWhitespace(pairStr.substring(valueStartPos + 1));
    if (cookieValue.startsWith('"') && cookieValue.endsWith('"')) {
      cookieValue = cookieValue.slice(1, -1);
    }
    if (validCookieValueRegEx.test(cookieValue)) {
      parsedCookie[cookieName] = tryDecodeURIComponent(cookieValue);
      if (name) {
        break;
      }
    }
  }
  return parsedCookie;
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/helper/cookie/index.js
var getCookie = (c, key, prefix) => {
  const cookie = c.req.raw.headers.get("Cookie");
  if (typeof key === "string") {
    if (!cookie) {
      return void 0;
    }
    let finalKey = key;
    if (prefix === "secure") {
      finalKey = "__Secure-" + key;
    } else if (prefix === "host") {
      finalKey = "__Host-" + key;
    }
    const obj2 = parse(cookie, finalKey);
    return obj2[finalKey];
  }
  if (!cookie) {
    return {};
  }
  const obj = parse(cookie);
  return obj;
};

// node_modules/.pnpm/hono@4.13.4/node_modules/hono/dist/validator/validator.js
var jsonRegex = /^application\/([a-z-\.]+\+)?json(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/i;
var multipartRegex = /^multipart\/form-data(;\s?boundary=[a-zA-Z0-9'"()+_,\-./:=?]+)?$/i;
var urlencodedRegex = /^application\/x-www-form-urlencoded(;\s*[a-zA-Z0-9\-]+\=([^;]+))*$/i;
var validator = (target, validationFunc) => {
  return async (c, next2) => {
    let value = {};
    const contentType = c.req.header("Content-Type");
    switch (target) {
      case "json":
        if (!contentType || !jsonRegex.test(contentType)) {
          break;
        }
        try {
          value = await c.req.json();
        } catch {
          const message = "Malformed JSON in request body";
          throw new HTTPException(400, { message });
        }
        break;
      case "form": {
        if (!contentType || !(multipartRegex.test(contentType) || urlencodedRegex.test(contentType))) {
          break;
        }
        let formData;
        if (c.req.bodyCache.formData) {
          formData = await c.req.bodyCache.formData;
        } else {
          try {
            const arrayBuffer = await c.req.arrayBuffer();
            formData = await bufferToFormData(arrayBuffer, contentType);
            c.req.bodyCache.formData = formData;
          } catch (e) {
            let message = "Malformed FormData request.";
            message += e instanceof Error ? ` ${e.message}` : ` ${String(e)}`;
            throw new HTTPException(400, { message });
          }
        }
        const form = /* @__PURE__ */ Object.create(null);
        formData.forEach((value2, key) => {
          if (key.endsWith("[]")) {
            ;
            (form[key] ??= []).push(value2);
          } else if (Array.isArray(form[key])) {
            ;
            form[key].push(value2);
          } else if (Object.hasOwn(form, key)) {
            form[key] = [form[key], value2];
          } else {
            form[key] = value2;
          }
        });
        value = form;
        break;
      }
      case "query":
        value = Object.fromEntries(
          Object.entries(c.req.queries()).map(([k, v]) => {
            return v.length === 1 ? [k, v[0]] : [k, v];
          })
        );
        break;
      case "param":
        value = c.req.param();
        break;
      case "header":
        value = c.req.header();
        break;
      case "cookie":
        value = getCookie(c);
        break;
    }
    const res = await validationFunc(value, c);
    if (res instanceof Response) {
      return res;
    }
    c.req.addValidatedData(target, res);
    return await next2();
  };
};

// node_modules/.pnpm/@hono+zod-validator@0.4.3_hono@4.13.4_zod@3.25.76/node_modules/@hono/zod-validator/dist/index.js
init_zod();
var zValidator = (target, schema, hook) => (
  // @ts-expect-error not typed well
  validator(target, async (value, c) => {
    let validatorValue = value;
    if (target === "header" && schema instanceof ZodObject) {
      const schemaKeys = Object.keys(schema.shape);
      const caseInsensitiveKeymap = Object.fromEntries(
        schemaKeys.map((key) => [key.toLowerCase(), key])
      );
      validatorValue = Object.fromEntries(
        Object.entries(value).map(([key, value2]) => [caseInsensitiveKeymap[key] || key, value2])
      );
    }
    const result = await schema.safeParseAsync(validatorValue);
    if (hook) {
      const hookResult = await hook({ data: validatorValue, ...result, target }, c);
      if (hookResult) {
        if (hookResult instanceof Response) {
          return hookResult;
        }
        if ("response" in hookResult) {
          return hookResult.response;
        }
      }
    }
    if (!result.success) {
      return c.json(result, 400);
    }
    return result.data;
  })
);

// packages/shared/src/enums.ts
var SIGNAL_TYPES = [
  "phone_otp",
  "trusted_device",
  "location_consistency",
  "pension_record_match",
  "face_match",
  "liveness_challenge",
  "voice_phrase",
  "document_upload",
  "family_confirmation",
  "video_verification",
  "manual_review",
  "continuity_history"
];
var SIGNAL_CATEGORIES = [
  "otp",
  "biometric",
  "social",
  "documentary",
  "passive"
];
var TIERS = ["started", "building", "provisional", "verified"];
var EVENT_STATUSES = [
  "awarded",
  "partial",
  "no_credit",
  "capped",
  "expired",
  "revoked"
];
var LOCALES = ["en", "hi"];
var CERTIFICATE_KINDS = ["provisional", "full"];
var CERTIFICATE_STATUSES = ["active", "expired", "superseded"];
var MOCK_OUTCOMES = ["strong", "weak", "fail", "timeout"];
var FAMILY_CONFIRMATION_STATUSES = [
  "pending",
  "confirmed",
  "declined",
  "expired"
];
var VERIFICATION_STATUSES = [
  /** The person is not drawing a pension, so no life certificate is due at all. */
  "not_required",
  "not_started",
  "in_progress",
  "awaiting_review",
  "awaiting_call",
  "completed",
  "rejected",
  "expired"
];
var ASSISTED_REVIEW_STATUSES = [
  "submitted",
  "in_review",
  "approved",
  "rejected",
  "more_info_needed",
  "cancelled"
];
var APPOINTMENT_STATUSES = [
  "scheduled",
  "in_call",
  "completed",
  "failed",
  "cancelled",
  "no_show"
];
var CALL_CHECK_TYPES = [
  "show_aadhaar",
  "show_pan",
  "sign_on_camera",
  "read_phrase",
  "turn_head"
];
var CALL_CHECK_STATUSES = ["pending", "active", "passed", "failed"];
var PENSION_STATUSES = ["active", "stopped", "not_eligible"];
var TRANSACTION_MODES = ["NEFT", "RTGS", "IMPS", "UPI"];
var AADHAAR_CONSENT_SCOPES = [
  "demographics",
  "address",
  "family",
  "photo",
  "face_authentication"
];

// packages/shared/src/config/weights.ts
var SIGNAL_DEFINITIONS = [
  { signal: "phone_otp", category: "otp", weight: 20, effort: "low", labelKey: "signal.phone_otp.label", descriptionKey: "signal.phone_otp.description", automatic: true },
  { signal: "trusted_device", category: "passive", weight: 8, effort: "none", labelKey: "signal.trusted_device.label", descriptionKey: "signal.trusted_device.description", automatic: true },
  { signal: "location_consistency", category: "passive", weight: 5, effort: "none", labelKey: "signal.location_consistency.label", descriptionKey: "signal.location_consistency.description", automatic: true },
  { signal: "continuity_history", category: "passive", weight: 5, effort: "none", labelKey: "signal.continuity_history.label", descriptionKey: "signal.continuity_history.description", automatic: true },
  { signal: "pension_record_match", category: "documentary", weight: 10, effort: "low", labelKey: "signal.pension_record_match.label", descriptionKey: "signal.pension_record_match.description", automatic: true },
  { signal: "face_match", category: "biometric", weight: 25, effort: "medium", labelKey: "signal.face_match.label", descriptionKey: "signal.face_match.description", automatic: false },
  { signal: "liveness_challenge", category: "biometric", weight: 15, effort: "medium", labelKey: "signal.liveness_challenge.label", descriptionKey: "signal.liveness_challenge.description", automatic: false },
  { signal: "voice_phrase", category: "biometric", weight: 12, effort: "medium", labelKey: "signal.voice_phrase.label", descriptionKey: "signal.voice_phrase.description", automatic: false },
  { signal: "document_upload", category: "documentary", weight: 10, effort: "medium", labelKey: "signal.document_upload.label", descriptionKey: "signal.document_upload.description", automatic: false },
  { signal: "family_confirmation", category: "social", weight: 18, effort: "low", labelKey: "signal.family_confirmation.label", descriptionKey: "signal.family_confirmation.description", automatic: false },
  { signal: "video_verification", category: "social", weight: 30, effort: "high", labelKey: "signal.video_verification.label", descriptionKey: "signal.video_verification.description", automatic: false },
  { signal: "manual_review", category: "social", weight: 40, effort: "high", labelKey: "signal.manual_review.label", descriptionKey: "signal.manual_review.description", automatic: false }
];
function getSignalDefinition(signal) {
  const def = SIGNAL_DEFINITIONS.find((s) => s.signal === signal);
  if (!def) throw new Error(`Unknown signal: ${signal}`);
  return def;
}
var CATEGORY_CAPS = {
  otp: 20,
  biometric: 45,
  social: 40,
  documentary: 25,
  passive: 15
};
var RETRY_DECAY_FACTOR = 0.85;
var RETRY_DECAY_FLOOR = 0.5;
var MAX_SCORE = 100;
function retryDecay(attemptIndex) {
  if (attemptIndex <= 1) return 1;
  return Math.max(RETRY_DECAY_FLOOR, Math.pow(RETRY_DECAY_FACTOR, attemptIndex - 1));
}

// packages/shared/src/config/tiers.ts
var TIER_DEFINITIONS = [
  {
    tier: "started",
    min: 0,
    max: 39,
    labelKey: "tier.started.label",
    descriptionKey: "tier.started.description",
    issuesCertificate: false,
    certificateValidityDays: null
  },
  {
    tier: "building",
    min: 40,
    max: 69,
    labelKey: "tier.building.label",
    descriptionKey: "tier.building.description",
    issuesCertificate: false,
    certificateValidityDays: null
  },
  {
    tier: "provisional",
    min: 70,
    max: 89,
    labelKey: "tier.provisional.label",
    descriptionKey: "tier.provisional.description",
    issuesCertificate: true,
    certificateValidityDays: 30
  },
  {
    tier: "verified",
    min: 90,
    max: 100,
    labelKey: "tier.verified.label",
    descriptionKey: "tier.verified.description",
    issuesCertificate: true,
    certificateValidityDays: 365
  }
];
function resolveTier(score) {
  const clamped = Math.max(0, Math.min(100, score));
  const found = TIER_DEFINITIONS.find((t) => clamped >= t.min && clamped <= t.max);
  return found ?? TIER_DEFINITIONS[0];
}

// packages/shared/src/schemas/auth.ts
init_zod();
var requestOtpSchema = external_exports.object({
  mobile: external_exports.string().regex(/^\d{10}$/, "Enter a 10-digit mobile number")
});
var verifyOtpSchema = external_exports.object({
  mobile: external_exports.string().regex(/^\d{10}$/),
  code: external_exports.string().length(6),
  deviceLabel: external_exports.string().max(120).optional()
});
var refreshSchema = external_exports.object({
  refreshToken: external_exports.string().min(10)
});
var authTokensSchema = external_exports.object({
  accessToken: external_exports.string(),
  refreshToken: external_exports.string(),
  expiresIn: external_exports.number()
});

// packages/shared/src/schemas/user.ts
init_zod();
var bilingualTextSchema = external_exports.object({
  en: external_exports.string(),
  hi: external_exports.string()
});
var addressSchema = external_exports.object({
  line1: external_exports.string(),
  district: external_exports.string(),
  state: external_exports.string(),
  pincode: external_exports.string()
});
var pensionInfoSchema = external_exports.object({
  /** The number printed on the pensioner's passbook. Replaces the old "pension ID". */
  passbookNumber: external_exports.string(),
  sanctioningAuthority: external_exports.string(),
  disbursingAgency: external_exports.string(),
  monthlyAmount: external_exports.number(),
  status: external_exports.enum(PENSION_STATUSES),
  lastCreditedAt: external_exports.string().nullable(),
  /** When the current life certificate lapses and disbursement would stop. */
  nextRenewalDueAt: external_exports.string().nullable(),
  /** Consecutive months with no credit — drives the "pension stopped" messaging. */
  monthsUnpaid: external_exports.number(),
  /** Set when status is not_eligible, e.g. below the qualifying age. */
  ineligibleReason: bilingualTextSchema.nullable()
});
var pensionTransactionSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  /** Value date of the credit. */
  date: external_exports.string(),
  amount: external_exports.number(),
  /** Never store or transmit a full account number to the client. */
  maskedAccount: external_exports.string(),
  transactionId: external_exports.string(),
  mode: external_exports.enum(TRANSACTION_MODES),
  status: external_exports.enum(["credited", "failed", "on_hold"]),
  /** Present when a payment was withheld — e.g. life certificate expired. */
  remark: bilingualTextSchema.nullable()
});
var bankInfoSchema = external_exports.object({
  maskedAccount: external_exports.string(),
  ifsc: external_exports.string(),
  branch: external_exports.string()
});
var userPrefsSchema = external_exports.object({
  fontScale: external_exports.number().min(1).max(1.6).default(1),
  highContrast: external_exports.boolean().default(false),
  reducedMotion: external_exports.boolean().default(false),
  preferredChannel: external_exports.enum(["sms", "whatsapp", "ivr"]).default("sms"),
  /** Cleared when the user replays the guided tour from Settings. */
  onboardingCompletedAt: external_exports.string().nullable().default(null)
});
var userSchema = external_exports.object({
  id: external_exports.string(),
  mobile: external_exports.string(),
  /**
   * Personal fields below are PROJECTIONS of the mock Aadhaar record, refreshed on
   * login. They are never edited in this app — Aadhaar is the only writer. See
   * apps/api/src/services/aadhaar.ts.
   */
  aadhaarUid: external_exports.string(),
  maskedAadhaar: external_exports.string(),
  aadhaarVerifiedAt: external_exports.string().nullable(),
  name: bilingualTextSchema,
  dob: external_exports.string(),
  gender: external_exports.enum(["male", "female", "other"]),
  photoInitials: external_exports.string(),
  address: addressSchema,
  locale: external_exports.enum(LOCALES),
  pension: pensionInfoSchema,
  bank: bankInfoSchema,
  prefs: userPrefsSchema,
  createdAt: external_exports.string(),
  lastLoginAt: external_exports.string().nullable(),
  isDemo: external_exports.boolean()
});
var updatePreferencesSchema = userPrefsSchema.partial().extend({
  locale: external_exports.enum(LOCALES).optional()
});
var familyContactSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  /** The relative's own Aadhaar UID, masked for display. */
  maskedUid: external_exports.string(),
  name: bilingualTextSchema,
  relation: external_exports.string(),
  maskedMobile: external_exports.string(),
  /** True when UIDAI has a verified mobile on file for them. */
  isVerified: external_exports.boolean(),
  /** Only verified adults in the Aadhaar record may attest. */
  canAttest: external_exports.boolean(),
  source: external_exports.literal("aadhaar"),
  fetchedAt: external_exports.string()
});

// packages/shared/src/schemas/aadhaar.ts
init_zod();
var aadhaarAddressSchema = external_exports.object({
  house: external_exports.string(),
  street: external_exports.string(),
  district: external_exports.string(),
  state: external_exports.string(),
  pincode: external_exports.string()
});
var aadhaarFamilyMemberSchema = external_exports.object({
  uid: external_exports.string(),
  maskedUid: external_exports.string(),
  name: bilingualTextSchema,
  relation: external_exports.string(),
  dob: external_exports.string(),
  gender: external_exports.enum(["male", "female", "other"]),
  /** Masked in listings; the full number is only used server-side to send the SMS. */
  maskedMobile: external_exports.string(),
  mobile: external_exports.string(),
  /** UIDAI marks a linked mobile as verified; only those may attest. */
  mobileVerified: external_exports.boolean()
});
var aadhaarRecordSchema = external_exports.object({
  uid: external_exports.string(),
  maskedUid: external_exports.string(),
  name: bilingualTextSchema,
  careOf: external_exports.string(),
  dob: external_exports.string(),
  gender: external_exports.enum(["male", "female", "other"]),
  photoInitials: external_exports.string(),
  address: aadhaarAddressSchema,
  registeredMobile: external_exports.string(),
  maskedMobile: external_exports.string(),
  email: external_exports.string().nullable(),
  locale: external_exports.enum(LOCALES),
  family: external_exports.array(aadhaarFamilyMemberSchema)
});
var aadhaarConsentSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  uid: external_exports.string(),
  /** UIDAI-style transaction reference, shown to the user for their records. */
  txnId: external_exports.string(),
  purpose: external_exports.string(),
  scopes: external_exports.array(external_exports.enum(AADHAAR_CONSENT_SCOPES)),
  grantedAt: external_exports.string(),
  expiresAt: external_exports.string(),
  revokedAt: external_exports.string().nullable()
});
var aadhaarOtpRequestSchema = external_exports.object({
  /** The mobile number registered with Aadhaar — not any mobile the user owns. */
  mobile: external_exports.string().regex(/^\d{10}$/, "Enter the 10-digit mobile number linked to your Aadhaar")
});
var aadhaarOtpVerifySchema = external_exports.object({
  txnId: external_exports.string().min(6),
  code: external_exports.string().length(6),
  deviceLabel: external_exports.string().max(120).optional()
});
var aadhaarConsentGrantSchema = external_exports.object({
  txnId: external_exports.string().min(6),
  scopes: external_exports.array(external_exports.enum(AADHAAR_CONSENT_SCOPES)).min(1),
  agreed: external_exports.literal(true)
});
var aadhaarFaceIdSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  uid: external_exports.string(),
  consentId: external_exports.string(),
  txnId: external_exports.string(),
  source: external_exports.enum(["selfie", "document"]),
  quality: external_exports.number(),
  status: external_exports.enum(["pending_consent", "active", "revoked"]),
  createdAt: external_exports.string()
});

// packages/shared/src/schemas/confidence.ts
init_zod();
var riskFlagSchema = external_exports.object({
  code: external_exports.string(),
  severity: external_exports.enum(["low", "medium", "high"])
});
var nextBestActionSchema = external_exports.object({
  signal: external_exports.enum(SIGNAL_TYPES),
  estimatedPoints: external_exports.number(),
  effort: external_exports.enum(["none", "low", "medium", "high", "assisted"]),
  labelKey: external_exports.string(),
  reason: external_exports.string().optional(),
  isRetry: external_exports.boolean().optional(),
  alwaysAvailable: external_exports.boolean().optional()
});
var categorySubtotalsSchema = external_exports.object({
  otp: external_exports.number(),
  biometric: external_exports.number(),
  social: external_exports.number(),
  documentary: external_exports.number(),
  passive: external_exports.number()
});
var confidenceEventSchema = external_exports.object({
  id: external_exports.string(),
  sessionId: external_exports.string(),
  userId: external_exports.string(),
  seq: external_exports.number(),
  signal: external_exports.enum(SIGNAL_TYPES),
  category: external_exports.enum(SIGNAL_CATEGORIES),
  attemptIndex: external_exports.number(),
  status: external_exports.enum(EVENT_STATUSES),
  raw: external_exports.record(external_exports.string(), external_exports.union([external_exports.number(), external_exports.string(), external_exports.boolean()])),
  quality: external_exports.number(),
  weight: external_exports.number(),
  retryDecay: external_exports.number(),
  rawPoints: external_exports.number(),
  cappedPoints: external_exports.number(),
  capReason: external_exports.string().nullable(),
  scoreBefore: external_exports.number(),
  scoreAfter: external_exports.number(),
  tierBefore: external_exports.enum(TIERS),
  tierAfter: external_exports.enum(TIERS),
  categorySubtotals: categorySubtotalsSchema,
  riskFlags: external_exports.array(riskFlagSchema),
  narrative: external_exports.object({
    en: external_exports.object({ title: external_exports.string(), body: external_exports.string(), tone: external_exports.string() }),
    hi: external_exports.object({ title: external_exports.string(), body: external_exports.string(), tone: external_exports.string() })
  }),
  nextBestActions: external_exports.array(nextBestActionSchema),
  createdAt: external_exports.string()
});
var verificationSessionSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  status: external_exports.enum(["active", "completed", "abandoned", "expired"]),
  startedAt: external_exports.string(),
  completedAt: external_exports.string().nullable(),
  expiresAt: external_exports.string(),
  currentScore: external_exports.number(),
  currentTier: external_exports.enum(TIERS),
  categorySubtotals: categorySubtotalsSchema,
  completedSignals: external_exports.array(external_exports.enum(SIGNAL_TYPES)),
  locale: external_exports.enum(["en", "hi"]),
  certificateId: external_exports.string().nullable()
});
var submitSignalSchema = external_exports.object({
  raw: external_exports.record(external_exports.string(), external_exports.union([external_exports.number(), external_exports.string(), external_exports.boolean()])).default({})
});

// packages/shared/src/schemas/certificate.ts
init_zod();
var certificateSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  sessionId: external_exports.string(),
  kind: external_exports.enum(CERTIFICATE_KINDS),
  certificateNumber: external_exports.string(),
  verificationCode: external_exports.string(),
  confidenceScore: external_exports.number(),
  tier: external_exports.enum(TIERS),
  signalsUsed: external_exports.array(external_exports.enum(SIGNAL_TYPES)),
  issuedAt: external_exports.string(),
  validFrom: external_exports.string(),
  validUntil: external_exports.string(),
  status: external_exports.enum(CERTIFICATE_STATUSES),
  aiSummary: bilingualTextSchema.nullable()
});

// packages/shared/src/schemas/family.ts
init_zod();
var familyConfirmationRequestSchema = external_exports.object({
  id: external_exports.string(),
  sessionId: external_exports.string(),
  userId: external_exports.string(),
  familyContactId: external_exports.string(),
  token: external_exports.string(),
  status: external_exports.enum(FAMILY_CONFIRMATION_STATUSES),
  sentAt: external_exports.string(),
  respondedAt: external_exports.string().nullable(),
  expiresAt: external_exports.string()
});
var respondFamilyConfirmationSchema = external_exports.object({
  action: external_exports.enum(["confirm", "decline"]),
  statement: external_exports.string().max(500).optional()
});

// packages/shared/src/schemas/review.ts
init_zod();
var ASSISTED_REVIEW_COOLDOWN_DAYS = 3;
var ASSISTED_REVIEW_SLA_DAYS = 5;
var assistedReviewNoteSchema = external_exports.object({
  at: external_exports.string(),
  author: external_exports.enum(["pensioner", "reviewer", "system"]),
  body: bilingualTextSchema
});
var assistedReviewRequestSchema = external_exports.object({
  id: external_exports.string(),
  /** Short human-quotable reference, e.g. AR-4F2K9Q. */
  ticketNumber: external_exports.string(),
  userId: external_exports.string(),
  sessionId: external_exports.string(),
  status: external_exports.enum(ASSISTED_REVIEW_STATUSES),
  reason: external_exports.string(),
  /** Free-text context the pensioner typed when raising the request. */
  message: external_exports.string().nullable(),
  submittedAt: external_exports.string(),
  updatedAt: external_exports.string(),
  /** Working-day target shown on the tracker. */
  slaDueAt: external_exports.string(),
  /** Blocks a second request until this timestamp passes. */
  nextRequestAllowedAt: external_exports.string(),
  reviewerName: external_exports.string().nullable(),
  decisionNote: bilingualTextSchema.nullable(),
  decidedAt: external_exports.string().nullable(),
  notes: external_exports.array(assistedReviewNoteSchema)
});
var createAssistedReviewSchema = external_exports.object({
  message: external_exports.string().max(1e3).optional()
});
function isAssistedReviewOpen(r) {
  return r.status === "submitted" || r.status === "in_review" || r.status === "more_info_needed";
}

// packages/shared/src/schemas/appointment.ts
init_zod();
var callCheckSchema = external_exports.object({
  type: external_exports.enum(CALL_CHECK_TYPES),
  status: external_exports.enum(CALL_CHECK_STATUSES),
  prompt: bilingualTextSchema,
  /** Set once the officer (or the simulation) resolves the step. */
  completedAt: external_exports.string().nullable(),
  note: external_exports.string().nullable()
});
var callIntegritySchema = external_exports.object({
  /** Distinct gaze positions seen — a still image yields almost none. */
  gazeSamples: external_exports.number(),
  /** Off-screen glances; a script driving the page produces zero. */
  gazeAwayEvents: external_exports.number(),
  /** Mouse path length in pixels; bots jump, humans drift. */
  mouseTravel: external_exports.number(),
  /** Variance in inter-keystroke timing; machine input is unnaturally regular. */
  keystrokeJitterMs: external_exports.number(),
  blinkCount: external_exports.number(),
  headMovementScore: external_exports.number(),
  /** 0..1 — how confident we are that a live person was present. */
  livePresenceScore: external_exports.number(),
  flags: external_exports.array(external_exports.string())
});
var verificationAppointmentSchema = external_exports.object({
  id: external_exports.string(),
  userId: external_exports.string(),
  sessionId: external_exports.string(),
  status: external_exports.enum(APPOINTMENT_STATUSES),
  slotStart: external_exports.string(),
  slotEnd: external_exports.string(),
  /** Quoted to the pensioner so they can rejoin the same call. */
  joinCode: external_exports.string(),
  officerName: external_exports.string().nullable(),
  checks: external_exports.array(callCheckSchema),
  integrity: callIntegritySchema.nullable(),
  createdAt: external_exports.string(),
  startedAt: external_exports.string().nullable(),
  completedAt: external_exports.string().nullable(),
  outcomeNote: bilingualTextSchema.nullable()
});
var scheduleAppointmentSchema = external_exports.object({
  slotStart: external_exports.string()
});
var completeAppointmentSchema = external_exports.object({
  integrity: callIntegritySchema
});
var appointmentSlotSchema = external_exports.object({
  start: external_exports.string(),
  end: external_exports.string(),
  available: external_exports.boolean()
});

// packages/shared/src/schemas/status.ts
init_zod();
var verificationStatusDetailSchema = external_exports.object({
  status: external_exports.enum(VERIFICATION_STATUSES),
  headline: bilingualTextSchema,
  detail: bilingualTextSchema,
  /** What the pensioner should do next, or null when the ball is in our court. */
  nextStep: bilingualTextSchema.nullable(),
  score: external_exports.number(),
  tier: external_exports.enum(TIERS),
  sessionId: external_exports.string().nullable(),
  certificateId: external_exports.string().nullable(),
  /** Set when the certificate cannot be issued until a human acts. */
  waitingOn: external_exports.enum(["assisted_review", "verification_call", "family_confirmation"]).nullable(),
  openReviewTicket: external_exports.string().nullable(),
  appointmentId: external_exports.string().nullable(),
  /**
   * True once every automated signal is done and only the scheduled call remains.
   * The call is always the final gate before a full certificate is issued.
   */
  callRequired: external_exports.boolean(),
  updatedAt: external_exports.string()
});

// packages/shared/src/config/calibration.ts
var SIGNAL_CALIBRATION = {
  face_match: { floor: 0.42, ceiling: 0.75 },
  liveness_challenge: { floor: 0.35, ceiling: 0.85 },
  voice_phrase: { floor: 0.4, ceiling: 0.85 },
  document_upload: { floor: 0.3, ceiling: 0.85 },
  video_verification: { floor: 0.4, ceiling: 0.85 },
  family_confirmation: { floor: 0.5, ceiling: 0.95 },
  manual_review: { floor: 0.5, ceiling: 0.95 },
  phone_otp: { floor: 0.5, ceiling: 1 },
  trusted_device: { floor: 0.5, ceiling: 1 },
  location_consistency: { floor: 0.45, ceiling: 0.92 },
  pension_record_match: { floor: 0.45, ceiling: 0.92 },
  continuity_history: { floor: 0.45, ceiling: 0.92 }
};
function qualityFor(signal, measurement) {
  const { floor, ceiling } = SIGNAL_CALIBRATION[signal];
  if (measurement <= floor) return 0;
  if (measurement >= ceiling) return 1;
  return (measurement - floor) / (ceiling - floor);
}
function cosineSimilarity(a, b) {
  if (a.length !== b.length || a.length === 0) return 0;
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i];
    const y = b[i];
    dot += x * y;
    normA += x * x;
    normB += y * y;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}
function textSimilarity(a, b) {
  const s = a.trim().toLowerCase().replace(/\s+/g, " ");
  const t = b.trim().toLowerCase().replace(/\s+/g, " ");
  if (!s || !t) return 0;
  if (s === t) return 1;
  const m = s.length;
  const n = t.length;
  let prev = Array.from({ length: n + 1 }, (_, i) => i);
  let cur = new Array(n + 1).fill(0);
  for (let i = 1; i <= m; i++) {
    cur[0] = i;
    for (let j = 1; j <= n; j++) {
      const cost = s[i - 1] === t[j - 1] ? 0 : 1;
      cur[j] = Math.min(cur[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, cur] = [cur, prev];
  }
  const distance = prev[n];
  return 1 - distance / Math.max(m, n);
}

// node_modules/.pnpm/nanoid@5.1.16/node_modules/nanoid/index.js
import { webcrypto as crypto2 } from "node:crypto";

// node_modules/.pnpm/nanoid@5.1.16/node_modules/nanoid/url-alphabet/index.js
var urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";

// node_modules/.pnpm/nanoid@5.1.16/node_modules/nanoid/index.js
var POOL_SIZE_MULTIPLIER = 128;
var pool;
var poolOffset;
function fillPool(bytes) {
  if (bytes < 0) throw new RangeError("Wrong ID size");
  try {
    if (!pool || pool.length < bytes) {
      pool = Buffer.allocUnsafe(bytes * POOL_SIZE_MULTIPLIER);
      crypto2.getRandomValues(pool);
      poolOffset = 0;
    } else if (poolOffset + bytes > pool.length) {
      crypto2.getRandomValues(pool);
      poolOffset = 0;
    }
  } catch (e) {
    pool = void 0;
    throw e;
  }
  poolOffset += bytes;
}
function nanoid(size = 21) {
  fillPool(size |= 0);
  let id = "";
  for (let i = poolOffset - size; i < poolOffset; i++) {
    id += urlAlphabet[pool[i] & 63];
  }
  return id;
}

// apps/api/src/services/tokens.ts
var import_jsonwebtoken = __toESM(require_jsonwebtoken(), 1);
import crypto3 from "node:crypto";
init_env();

// apps/api/src/db/store.ts
init_env();
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
var TABLES = [
  "users",
  "aadhaar_consents",
  "aadhaar_txns",
  "family_contacts",
  "pension_transactions",
  "trusted_devices",
  "otp_challenges",
  "refresh_tokens",
  "verification_sessions",
  "confidence_events",
  "certificates",
  "family_confirmations",
  "outbox",
  "mock_controls",
  "assisted_reviews",
  "appointments",
  "face_enrollments"
];
var INDEXED = {
  users: ["mobile", "aadhaarUid"],
  aadhaar_consents: ["userId", "uid"],
  aadhaar_txns: ["mobile"],
  family_contacts: ["userId"],
  pension_transactions: ["userId"],
  trusted_devices: ["userId", "fingerprint"],
  otp_challenges: ["mobile"],
  refresh_tokens: ["userId", "tokenHash"],
  verification_sessions: ["userId", "status"],
  confidence_events: ["sessionId", "seq"],
  certificates: ["userId", "sessionId", "verificationCode"],
  family_confirmations: ["token", "sessionId"],
  outbox: ["userId"],
  mock_controls: [],
  assisted_reviews: ["userId", "sessionId", "ticketNumber"],
  appointments: ["userId", "sessionId"],
  face_enrollments: ["userId"]
};
function createMemoryDriver() {
  const data = /* @__PURE__ */ new Map();
  const meta = /* @__PURE__ */ new Map();
  for (const t of TABLES) data.set(t, /* @__PURE__ */ new Map());
  const tbl = (name) => {
    let m = data.get(name);
    if (!m) {
      m = /* @__PURE__ */ new Map();
      data.set(name, m);
    }
    return m;
  };
  return {
    insert: (table, id, row) => void tbl(table).set(id, row),
    update: (table, id, row) => void tbl(table).set(id, row),
    getById: (table, id) => tbl(table).get(id) ?? null,
    // Indexed columns always mirror a field of the same name on the document, so a
    // straight field read matches what the SQLite driver does with real columns.
    findBy: (table, column, value) => [...tbl(table).values()].filter(
      (r) => String(r[column]) === String(value)
    ),
    all: (table) => [...tbl(table).values()],
    deleteById: (table, id) => void tbl(table).delete(id),
    count: (table) => tbl(table).size,
    clear: () => {
      for (const m of data.values()) m.clear();
      meta.clear();
    },
    getMeta: (key) => meta.get(key) ?? null,
    setMeta: (key, value) => void meta.set(key, value),
    snapshot: () => ({
      tables: Object.fromEntries(
        [...data.entries()].map(([table, rows]) => [table, Object.fromEntries(rows)])
      ),
      meta: Object.fromEntries(meta)
    }),
    restore: (snap) => {
      for (const m of data.values()) m.clear();
      meta.clear();
      for (const [table, rows] of Object.entries(snap.tables ?? {})) {
        tbl(table);
        for (const [id, row] of Object.entries(rows)) tbl(table).set(id, row);
      }
      for (const [k, v] of Object.entries(snap.meta ?? {})) meta.set(k, v);
    }
  };
}
function createSqliteDriver() {
  const moduleName = ["better", "sqlite3"].join("-");
  const require_ = createRequire(path.join(process.cwd(), "noop.cjs"));
  const Database = require_(moduleName);
  fs.mkdirSync(env.DATA_DIR, { recursive: true });
  const sqlite = new Database(path.join(env.DATA_DIR, "jeevansetu.db"));
  sqlite.pragma("journal_mode = WAL");
  sqlite.exec("CREATE TABLE IF NOT EXISTS meta (key TEXT PRIMARY KEY, value TEXT);");
  for (const table of TABLES) {
    const cols = (INDEXED[table] ?? []).map((c) => ", " + c + " TEXT").join("");
    sqlite.exec(
      "CREATE TABLE IF NOT EXISTS " + table + " (id TEXT PRIMARY KEY, data TEXT NOT NULL" + cols + ");"
    );
    for (const c of INDEXED[table] ?? []) {
      sqlite.exec("CREATE INDEX IF NOT EXISTS idx_" + table + "_" + c + " ON " + table + "(" + c + ");");
    }
  }
  return {
    insert: (table, id, row, extra) => {
      const cols = ["id", "data", ...Object.keys(extra)];
      const placeholders = cols.map((c) => "@" + c).join(", ");
      sqlite.prepare("INSERT INTO " + table + " (" + cols.join(", ") + ") VALUES (" + placeholders + ")").run({ id, data: JSON.stringify(row), ...extra });
    },
    update: (table, id, row) => {
      sqlite.prepare("UPDATE " + table + " SET data = @data WHERE id = @id").run({ id, data: JSON.stringify(row) });
    },
    getById: (table, id) => {
      const r = sqlite.prepare("SELECT data FROM " + table + " WHERE id = ?").get(id);
      return r ? JSON.parse(r.data) : null;
    },
    findBy: (table, column, value) => {
      if ((INDEXED[table] ?? []).includes(column)) {
        const rows2 = sqlite.prepare("SELECT data FROM " + table + " WHERE " + column + " = ?").all(value);
        return rows2.map((r) => JSON.parse(r.data));
      }
      const rows = sqlite.prepare("SELECT data FROM " + table).all();
      return rows.map((r) => JSON.parse(r.data)).filter((r) => String(r[column]) === String(value));
    },
    all: (table) => {
      const rows = sqlite.prepare("SELECT data FROM " + table).all();
      return rows.map((r) => JSON.parse(r.data));
    },
    deleteById: (table, id) => void sqlite.prepare("DELETE FROM " + table + " WHERE id = ?").run(id),
    count: (table) => sqlite.prepare("SELECT COUNT(*) as c FROM " + table).get().c,
    clear: () => {
      for (const t of TABLES) sqlite.exec("DELETE FROM " + t + ";");
      sqlite.exec("DELETE FROM meta;");
    },
    getMeta: (key) => {
      const r = sqlite.prepare("SELECT value FROM meta WHERE key = ?").get(key);
      return r?.value ?? null;
    },
    setMeta: (key, value) => {
      sqlite.prepare(
        "INSERT INTO meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value"
      ).run(key, value);
    },
    // A file on disk is already shared by every request in local dev; there is
    // nothing to park elsewhere and nothing to reload.
    snapshot: () => ({ tables: {}, meta: {} }),
    restore: () => {
    }
  };
}
function resolveDriver() {
  if (env.PERSIST === "memory") return { driver: createMemoryDriver(), kind: "memory" };
  try {
    return { driver: createSqliteDriver(), kind: "sqlite" };
  } catch (err) {
    console.warn("[store] SQLite unavailable (" + err.message + "); using in-memory storage.");
    return { driver: createMemoryDriver(), kind: "memory" };
  }
}
var resolved = resolveDriver();
var persistDriver = resolved.kind;
var driver = resolved.driver;
var Table = class {
  constructor(tableName) {
    this.tableName = tableName;
  }
  insert(row, extraColumns = {}) {
    driver.insert(this.tableName, row.id, row, extraColumns);
  }
  update(id, row) {
    driver.update(this.tableName, id, row);
  }
  getById(id) {
    return driver.getById(this.tableName, id);
  }
  findBy(column, value) {
    return driver.findBy(this.tableName, column, value);
  }
  findOneBy(column, value) {
    return this.findBy(column, value)[0] ?? null;
  }
  all() {
    return driver.all(this.tableName);
  }
  deleteById(id) {
    driver.deleteById(this.tableName, id);
  }
  count() {
    return driver.count(this.tableName);
  }
};
var getMeta = (key) => driver.getMeta(key);
var setMeta = (key, value) => driver.setMeta(key, value);
var resetDatabase = () => driver.clear();
var snapshotStore = () => driver.snapshot();
var restoreStore = (snap) => driver.restore(snap);

// apps/api/src/db/repo.ts
var usersTable = new Table("users");
var aadhaarConsentsTable = new Table("aadhaar_consents");
var aadhaarTxnsTable = new Table("aadhaar_txns");
var familyContactsTable = new Table("family_contacts");
var pensionTransactionsTable = new Table("pension_transactions");
var trustedDevicesTable = new Table("trusted_devices");
var otpChallengesTable = new Table("otp_challenges");
var refreshTokensTable = new Table("refresh_tokens");
var sessionsTable = new Table("verification_sessions");
var eventsTable = new Table("confidence_events");
var certificatesTable = new Table("certificates");
var familyConfirmationsTable = new Table("family_confirmations");
var outboxTable = new Table("outbox");
var assistedReviewsTable = new Table("assisted_reviews");
var appointmentsTable = new Table("appointments");
var faceEnrollmentsTable = new Table("face_enrollments");
var mockControlsTable = new Table("mock_controls");
function insertUser(u) {
  usersTable.insert(u, { mobile: u.mobile, aadhaarUid: u.aadhaarUid });
}
function findUserByMobile(mobile) {
  return usersTable.findOneBy("mobile", mobile);
}
function findUserByAadhaarUid(uid) {
  return usersTable.findOneBy("aadhaarUid", uid);
}
function insertRefreshToken(t) {
  refreshTokensTable.insert(t, { userId: t.userId, tokenHash: t.tokenHash });
}
function findRefreshTokenByHash(hash2) {
  return refreshTokensTable.findOneBy("tokenHash", hash2);
}
function insertDevice(d) {
  trustedDevicesTable.insert(d, { userId: d.userId, fingerprint: d.fingerprint });
}
function findDeviceByFingerprint(userId, fingerprint) {
  return trustedDevicesTable.findBy("userId", userId).find((d) => d.fingerprint === fingerprint) ?? null;
}
function insertSession(s) {
  sessionsTable.insert(s, { userId: s.userId, status: s.status });
}
function findActiveSessionForUser(userId) {
  return sessionsTable.findBy("userId", userId).find((s) => s.status === "active") ?? null;
}
function insertEvent(e) {
  eventsTable.insert(e, { sessionId: e.sessionId, seq: e.seq });
}
function eventsForSession(sessionId) {
  return eventsTable.findBy("sessionId", sessionId).sort((a, b) => a.seq - b.seq);
}
function insertCertificate(c) {
  certificatesTable.insert(c, {
    userId: c.userId,
    sessionId: c.sessionId,
    verificationCode: c.verificationCode
  });
}
function findCertificateByCode(code) {
  return certificatesTable.findOneBy("verificationCode", code);
}
function certificatesForUser(userId) {
  return certificatesTable.findBy("userId", userId).sort((a, b) => a.issuedAt < b.issuedAt ? 1 : -1);
}
function insertFamilyConfirmation(f) {
  familyConfirmationsTable.insert(f, { token: f.token, sessionId: f.sessionId });
}
function findFamilyConfirmationByToken(token) {
  return familyConfirmationsTable.findOneBy("token", token);
}
function insertOutbox(m) {
  outboxTable.insert(m, { userId: m.userId });
}
function getMockControl(userId) {
  return mockControlsTable.getById(userId);
}
function upsertMockControl(c) {
  if (mockControlsTable.getById(c.userId)) mockControlsTable.update(c.userId, c);
  else mockControlsTable.insert(c);
}
function insertAssistedReview(r) {
  assistedReviewsTable.insert(r, {
    userId: r.userId,
    sessionId: r.sessionId,
    ticketNumber: r.ticketNumber
  });
}
function reviewsForUser(userId) {
  return assistedReviewsTable.findBy("userId", userId).sort((a, b) => a.submittedAt < b.submittedAt ? 1 : -1);
}
function insertAppointment(a) {
  appointmentsTable.insert(a, { userId: a.userId, sessionId: a.sessionId });
}
function appointmentsForUser(userId) {
  return appointmentsTable.findBy("userId", userId).sort((a, b) => a.slotStart < b.slotStart ? 1 : -1);
}
function getFaceEnrollment(userId) {
  return faceEnrollmentsTable.findBy("userId", userId).filter((e) => e.status === "active").sort((a, b) => a.createdAt < b.createdAt ? 1 : -1)[0] ?? null;
}
function saveFaceEnrollment(enrollment) {
  for (const old of faceEnrollmentsTable.findBy("userId", enrollment.userId)) {
    faceEnrollmentsTable.deleteById(old.id);
  }
  faceEnrollmentsTable.insert(enrollment, { userId: enrollment.userId });
}
function revokeFaceEnrollmentsForConsent(consentId) {
  for (const e of faceEnrollmentsTable.all()) {
    if (e.consentId === consentId && e.status === "active") {
      faceEnrollmentsTable.update(e.id, { ...e, status: "revoked" });
    }
  }
}
function pensionHistoryForUser(userId) {
  return pensionTransactionsTable.findBy("userId", userId).sort((a, b) => a.date < b.date ? 1 : -1);
}

// apps/api/src/services/tokens.ts
var ACCESS_TOKEN_TTL_SECONDS = 15 * 60;
var REFRESH_TOKEN_TTL_DAYS = 30;
function signAccessToken(claims) {
  return import_jsonwebtoken.default.sign(claims, env.JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL_SECONDS });
}
function verifyAccessToken(token) {
  return import_jsonwebtoken.default.verify(token, env.JWT_SECRET);
}
function hashToken(token) {
  return crypto3.createHash("sha256").update(token).digest("hex");
}
function issueRefreshToken(userId, deviceId) {
  const raw2 = `${nanoid(32)}.${import_jsonwebtoken.default.sign({ sub: userId }, env.JWT_REFRESH_SECRET, {
    expiresIn: `${REFRESH_TOKEN_TTL_DAYS}d`
  })}`;
  const expiresAt = new Date(Date.now() + REFRESH_TOKEN_TTL_DAYS * 24 * 60 * 60 * 1e3).toISOString();
  insertRefreshToken({
    id: `rt_${nanoid(8)}`,
    userId,
    tokenHash: hashToken(raw2),
    deviceId,
    expiresAt,
    revokedAt: null
  });
  return raw2;
}
function rotateRefreshToken(rawToken) {
  const hash2 = hashToken(rawToken);
  const record = findRefreshTokenByHash(hash2);
  if (!record || record.revokedAt || new Date(record.expiresAt) < /* @__PURE__ */ new Date()) return null;
  try {
    import_jsonwebtoken.default.verify(rawToken.split(".").slice(1).join("."), env.JWT_REFRESH_SECRET);
  } catch {
    return null;
  }
  refreshTokensTable.update(record.id, { ...record, revokedAt: (/* @__PURE__ */ new Date()).toISOString() });
  const newToken = issueRefreshToken(record.userId, record.deviceId);
  return { userId: record.userId, newToken };
}
function issueTokenPair(userId, mobile, deviceId) {
  return {
    accessToken: signAccessToken({ sub: userId, mobile }),
    refreshToken: issueRefreshToken(userId, deviceId),
    expiresIn: ACCESS_TOKEN_TTL_SECONDS
  };
}

// apps/api/src/middleware/auth.ts
async function requireAuth(c, next2) {
  const header = c.req.header("authorization");
  const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) {
    return c.json({ error: { code: "UNAUTHENTICATED", message: "Missing access token" } }, 401);
  }
  try {
    const claims = verifyAccessToken(token);
    c.set("userId", claims.sub);
    c.set("mobile", claims.mobile);
    await next2();
  } catch {
    return c.json({ error: { code: "TOKEN_EXPIRED", message: "Access token is invalid or expired" } }, 401);
  }
}

// apps/api/src/middleware/error.ts
init_zod();
var ApiError = class extends Error {
  constructor(status, code, message) {
    super(message);
    this.status = status;
    this.code = code;
  }
};
function handleError(err, c) {
  if (err instanceof ApiError) {
    return c.json({ error: { code: err.code, message: err.message } }, err.status);
  }
  if (err instanceof ZodError) {
    return c.json(
      { error: { code: "VALIDATION_ERROR", message: "Invalid request", issues: err.issues } },
      422
    );
  }
  console.error(err);
  return c.json({ error: { code: "INTERNAL_ERROR", message: "Something went wrong. Please try again." } }, 500);
}

// apps/api/src/middleware/rateLimit.ts
var buckets = /* @__PURE__ */ new Map();
function rateLimit(key, max, windowMs) {
  return async (c, next2) => {
    const bucketKey = key(c);
    const now = Date.now();
    const bucket = buckets.get(bucketKey);
    if (!bucket || bucket.resetAt < now) {
      buckets.set(bucketKey, { count: 1, resetAt: now + windowMs });
    } else {
      bucket.count += 1;
      if (bucket.count > max) {
        c.header("Retry-After", String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1e3))));
        throw new ApiError(429, "RATE_LIMITED", "Too many attempts. Please wait a moment and try again.");
      }
    }
    await next2();
  };
}

// apps/api/src/services/aadhaar.ts
import crypto4 from "node:crypto";

// apps/api/src/mocks/aadhaar.ts
function maskUid(uid) {
  const digits = uid.replace(/\D/g, "");
  return `XXXX XXXX ${digits.slice(-4)}`;
}
function maskMobile(mobile) {
  return `XXXXXX${mobile.slice(-4)}`;
}
function member(uid, nameEn, nameHi, relation, dob, gender, mobile, mobileVerified) {
  return {
    uid,
    maskedUid: maskUid(uid),
    name: { en: nameEn, hi: nameHi },
    relation,
    dob,
    gender,
    mobile,
    maskedMobile: maskMobile(mobile),
    mobileVerified
  };
}
var AADHAAR_RECORDS = [
  {
    uid: "784239015566",
    maskedUid: maskUid("784239015566"),
    name: { en: "Ram Prasad Sharma", hi: "\u0930\u093E\u092E \u092A\u094D\u0930\u0938\u093E\u0926 \u0936\u0930\u094D\u092E\u093E" },
    careOf: "S/O Bhairav Prasad Sharma",
    dob: "1958-04-12",
    gender: "male",
    photoInitials: "RS",
    address: {
      house: "H.No. 24",
      street: "Gomti Nagar, Vibhuti Khand",
      district: "Lucknow",
      state: "Uttar Pradesh",
      pincode: "226010"
    },
    registeredMobile: "9876543210",
    maskedMobile: maskMobile("9876543210"),
    email: "r.sharma@example.invalid",
    locale: "hi",
    family: [
      member("445120983371", "Anita Sharma", "\u0905\u0928\u0940\u0924\u093E \u0936\u0930\u094D\u092E\u093E", "Daughter", "1985-06-21", "female", "9811100011", true),
      member("445120983372", "Suresh Sharma", "\u0938\u0941\u0930\u0947\u0936 \u0936\u0930\u094D\u092E\u093E", "Son", "1982-03-09", "male", "9811100012", true)
    ]
  },
  {
    uid: "552177348890",
    maskedUid: maskUid("552177348890"),
    name: { en: "Kamla Devi", hi: "\u0915\u092E\u0932\u093E \u0926\u0947\u0935\u0940" },
    careOf: "W/O Late Ram Naresh Prasad",
    dob: "1949-11-02",
    gender: "female",
    photoInitials: "KD",
    address: {
      house: "H.No. 8/3",
      street: "Kankarbagh Colony",
      district: "Patna",
      state: "Bihar",
      pincode: "800020"
    },
    registeredMobile: "9876543211",
    maskedMobile: maskMobile("9876543211"),
    email: null,
    locale: "hi",
    family: [
      member("662301447789", "Suresh Kumar", "\u0938\u0941\u0930\u0947\u0936 \u0915\u0941\u092E\u093E\u0930", "Son", "1974-01-14", "male", "9822200022", true),
      // Linked in the Aadhaar record but with no verified mobile, so she cannot attest.
      member("662301447790", "Meena Devi", "\u092E\u0940\u0928\u093E \u0926\u0947\u0935\u0940", "Daughter-in-law", "1979-08-30", "female", "9822200023", false)
    ]
  },
  {
    uid: "669044123378",
    maskedUid: maskUid("669044123378"),
    name: { en: "George Mathew", hi: "\u091C\u0949\u0930\u094D\u091C \u092E\u0948\u0925\u094D\u092F\u0942" },
    careOf: "S/O Mathew Varghese",
    dob: "1955-07-19",
    gender: "male",
    photoInitials: "GM",
    address: {
      house: "Puthenpurayil House",
      street: "Panampilly Nagar",
      district: "Ernakulam",
      state: "Kerala",
      pincode: "682036"
    },
    registeredMobile: "9876543212",
    maskedMobile: maskMobile("9876543212"),
    email: "g.mathew@example.invalid",
    locale: "en",
    // Deliberately empty: the hardest real case is a pensioner living alone with
    // nobody on record to vouch for them. This persona must still be able to finish.
    family: []
  },
  {
    uid: "331288765401",
    maskedUid: maskUid("331288765401"),
    name: { en: "Aarav Menon", hi: "\u0906\u0930\u0935 \u092E\u0947\u0928\u0928" },
    careOf: "S/O Rajeev Menon",
    dob: "2001-02-17",
    gender: "male",
    photoInitials: "AM",
    address: {
      house: "Flat 402, Sobha Orion",
      street: "Indiranagar 100ft Road",
      district: "Bengaluru Urban",
      state: "Karnataka",
      pincode: "560038"
    },
    registeredMobile: "9876543213",
    maskedMobile: maskMobile("9876543213"),
    email: "aarav.menon@example.invalid",
    locale: "en",
    family: [
      member("778450112264", "Latha Menon", "\u0932\u0924\u093E \u092E\u0947\u0928\u0928", "Mother", "1972-12-05", "female", "9844400044", true)
    ]
  }
];
function findAadhaarByMobile(mobile) {
  return AADHAAR_RECORDS.find((r) => r.registeredMobile === mobile) ?? null;
}
function findAadhaarByUid(uid) {
  return AADHAAR_RECORDS.find((r) => r.uid === uid) ?? null;
}
function canAttest(m, asOf = /* @__PURE__ */ new Date()) {
  const age = (asOf.getTime() - new Date(m.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1e3);
  return m.mobileVerified && age >= 18;
}

// apps/api/src/mocks/pensionRegistry.ts
var MODES = ["NEFT", "RTGS", "IMPS", "UPI"];
var PENSION_PROFILES = {
  // Ram Prasad Sharma — everything in order, renewed recently.
  "784239015566": {
    passbookNumber: "UP-PPO-4471902",
    sanctioningAuthority: "Directorate of Pension, Uttar Pradesh (mock)",
    disbursingAgency: "State Bank of Bharat \u2014 Pension Cell (mock)",
    monthlyAmount: 9200,
    status: "active",
    bank: { maskedAccount: "XXXX XXXX 8841", ifsc: "SBBM0004471", branch: "Gomti Nagar, Lucknow" },
    paidMonths: 14,
    withheldMonths: 0,
    renewalDueInDays: 271,
    ineligibleReason: null
  },
  // Kamla Devi — paid up to date, but the certificate lapses in under a fortnight.
  "552177348890": {
    passbookNumber: "BR-PPO-2298641",
    sanctioningAuthority: "Bihar Pension Directorate (mock)",
    disbursingAgency: "Demo Public Bank \u2014 Patna Regional (mock)",
    monthlyAmount: 7500,
    status: "active",
    bank: { maskedAccount: "XXXX XXXX 3092", ifsc: "DPBM0002298", branch: "Kankarbagh, Patna" },
    paidMonths: 12,
    withheldMonths: 0,
    renewalDueInDays: 11,
    ineligibleReason: null
  },
  // George Mathew — certificate expired, three months of payments withheld since.
  "669044123378": {
    passbookNumber: "KL-PPO-7730155",
    sanctioningAuthority: "Kerala Treasury Pension Wing (mock)",
    disbursingAgency: "Demo Public Bank \u2014 Ernakulam (mock)",
    monthlyAmount: 12400,
    status: "stopped",
    bank: { maskedAccount: "XXXX XXXX 5517", ifsc: "DPBM0007730", branch: "Panampilly Nagar, Kochi" },
    paidMonths: 11,
    withheldMonths: 3,
    renewalDueInDays: -96,
    ineligibleReason: null
  },
  // Aarav Menon — 25 years old, drawing no pension. The app must not pretend otherwise.
  "331288765401": {
    passbookNumber: "\u2014",
    sanctioningAuthority: "\u2014",
    disbursingAgency: "\u2014",
    monthlyAmount: 0,
    status: "not_eligible",
    bank: { maskedAccount: "\u2014", ifsc: "\u2014", branch: "\u2014" },
    paidMonths: 0,
    withheldMonths: 0,
    renewalDueInDays: null,
    ineligibleReason: {
      en: "No pension account is linked to this Aadhaar number. A life certificate is only needed once you are drawing a pension.",
      hi: "\u0907\u0938 \u0906\u0927\u093E\u0930 \u0938\u0902\u0916\u094D\u092F\u093E \u0938\u0947 \u0915\u094B\u0908 \u092A\u0947\u0902\u0936\u0928 \u0916\u093E\u0924\u093E \u0928\u0939\u0940\u0902 \u091C\u0941\u0921\u093C\u093E \u0939\u0948\u0964 \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0924\u092D\u0940 \u0906\u0935\u0936\u094D\u092F\u0915 \u0939\u0948 \u091C\u092C \u0906\u092A \u092A\u0947\u0902\u0936\u0928 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0915\u0930 \u0930\u0939\u0947 \u0939\u094B\u0902\u0964"
    }
  }
};
function addDays(base, days) {
  return new Date(base.getTime() + days * 24 * 60 * 60 * 1e3);
}
function seededInt(seed, index, max) {
  let h = 2166136261;
  const s = `${seed}:${index}`;
  for (let i = 0; i < s.length; i += 1) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h) % max;
}
function buildPensionInfo(uid, now = /* @__PURE__ */ new Date()) {
  const p = PENSION_PROFILES[uid];
  if (!p) throw new Error(`No pension profile for uid ${uid}`);
  const lastCreditedAt = p.paidMonths === 0 ? null : monthlyDate(now, p.withheldMonths === 0 ? 0 : p.withheldMonths).toISOString();
  return {
    passbookNumber: p.passbookNumber,
    sanctioningAuthority: p.sanctioningAuthority,
    disbursingAgency: p.disbursingAgency,
    monthlyAmount: p.monthlyAmount,
    status: p.status,
    lastCreditedAt,
    nextRenewalDueAt: p.renewalDueInDays === null ? null : addDays(now, p.renewalDueInDays).toISOString(),
    monthsUnpaid: p.withheldMonths,
    ineligibleReason: p.ineligibleReason
  };
}
function monthlyDate(now, back) {
  const d = new Date(now.getFullYear(), now.getMonth() - back, 1, 10, 30, 0);
  return d;
}
function buildPensionTransactions(uid, userId, now = /* @__PURE__ */ new Date()) {
  const p = PENSION_PROFILES[uid];
  if (!p) return [];
  const rows = [];
  const total = p.paidMonths + p.withheldMonths;
  for (let i = 0; i < total; i += 1) {
    const withheld = i < p.withheldMonths;
    const date = monthlyDate(now, i);
    const mode = MODES[seededInt(uid, i, MODES.length)];
    const serial = String(seededInt(uid, i + 100, 9e5) + 1e5);
    rows.push({
      id: `ptx_${uid.slice(-4)}_${i}`,
      userId,
      date: date.toISOString(),
      amount: p.monthlyAmount,
      maskedAccount: p.bank.maskedAccount,
      // Real UTR references are 16 characters and carry the bank code and date.
      transactionId: `${mode === "UPI" ? "UPI" : "UTR"}${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${serial}`,
      mode,
      status: withheld ? "on_hold" : "credited",
      remark: withheld ? {
        en: "Payment withheld \u2014 life certificate expired. Complete your verification to release this amount.",
        hi: "\u092D\u0941\u0917\u0924\u093E\u0928 \u0930\u094B\u0915\u093E \u0917\u092F\u093E \u2014 \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964 \u092F\u0939 \u0930\u093E\u0936\u093F \u091C\u093E\u0930\u0940 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u092A\u0928\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u092A\u0942\u0930\u093E \u0915\u0930\u0947\u0902\u0964"
      } : null
    });
  }
  return rows;
}

// apps/api/src/services/aadhaar.ts
var AADHAAR_DEMO_OTP = "123456";
var OTP_TTL_MS = 5 * 6e4;
var CONSENT_VALIDITY_DAYS = 365;
var DEFAULT_CONSENT_SCOPES = [
  "demographics",
  "address",
  "family",
  "photo",
  "face_authentication"
];
function hash(value) {
  return crypto4.createHash("sha256").update(value).digest("hex");
}
function deriveUserId(uid) {
  return `usr_${hash(`user:${uid}`).slice(0, 16)}`;
}
var AadhaarNotFoundError = class extends ApiError {
  constructor() {
    super(
      404,
      "AADHAAR_MOBILE_NOT_FOUND",
      "That number is not registered with any Aadhaar record we hold. Please enter the mobile number linked to your Aadhaar."
    );
  }
};
function startAadhaarAuth(mobile) {
  const record = findAadhaarByMobile(mobile);
  if (!record) throw new AadhaarNotFoundError();
  const now = /* @__PURE__ */ new Date();
  const txn = {
    id: `aadhaar_txn_${nanoid(12)}`,
    mobile,
    uid: record.uid,
    codeHash: hash(AADHAAR_DEMO_OTP),
    demoCode: AADHAAR_DEMO_OTP,
    attempts: 0,
    maxAttempts: 5,
    createdAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + OTP_TTL_MS).toISOString(),
    otpVerifiedAt: null,
    consentGrantedAt: null
  };
  aadhaarTxnsTable.insert(txn, { mobile });
  return {
    txnId: txn.id,
    maskedUid: record.maskedUid,
    maskedMobile: record.maskedMobile,
    holderName: record.name,
    expiresInSeconds: OTP_TTL_MS / 1e3,
    demoCode: AADHAAR_DEMO_OTP
  };
}
function loadTxn(txnId) {
  const txn = aadhaarTxnsTable.getById(txnId);
  if (!txn) {
    throw new ApiError(404, "AADHAAR_TXN_NOT_FOUND", "This Aadhaar session has ended. Please start again.");
  }
  return txn;
}
function verifyAadhaarOtp(txnId, code) {
  const txn = loadTxn(txnId);
  if (new Date(txn.expiresAt) < /* @__PURE__ */ new Date()) {
    throw new ApiError(400, "AADHAAR_OTP_EXPIRED", "That code has expired. Please request a new one.");
  }
  if (txn.attempts >= txn.maxAttempts) {
    throw new ApiError(429, "AADHAAR_OTP_LOCKED", "Too many incorrect attempts. Please start again.");
  }
  if (hash(code) !== txn.codeHash) {
    aadhaarTxnsTable.update(txn.id, { ...txn, attempts: txn.attempts + 1 });
    throw new ApiError(
      400,
      "AADHAAR_OTP_INCORRECT",
      `That code doesn't match. You have ${txn.maxAttempts - txn.attempts - 1} attempts left.`
    );
  }
  const verified = { ...txn, otpVerifiedAt: (/* @__PURE__ */ new Date()).toISOString() };
  aadhaarTxnsTable.update(txn.id, verified);
  const record = findAadhaarByUid(txn.uid);
  const existing = findUserByAadhaarUid(record.uid);
  return {
    txn: verified,
    record,
    /** A returning user with live consent skips the consent screen. */
    requiresConsent: !existing || !hasLiveConsent(existing.id)
  };
}
function hasLiveConsent(userId) {
  const now = /* @__PURE__ */ new Date();
  return aadhaarConsentsTable.findBy("userId", userId).some((c) => !c.revokedAt && new Date(c.expiresAt) > now);
}
function liveConsentFor(userId) {
  const now = /* @__PURE__ */ new Date();
  return aadhaarConsentsTable.findBy("userId", userId).filter((c) => !c.revokedAt && new Date(c.expiresAt) > now).sort((a, b) => a.grantedAt < b.grantedAt ? 1 : -1)[0] ?? null;
}
function grantConsentAndSync(txnId, scopes) {
  const txn = loadTxn(txnId);
  if (!txn.otpVerifiedAt) {
    throw new ApiError(403, "AADHAAR_OTP_REQUIRED", "Please verify the Aadhaar OTP before giving consent.");
  }
  const record = findAadhaarByUid(txn.uid);
  if (!record) throw new AadhaarNotFoundError();
  const user = upsertUserFromAadhaar(record);
  const now = /* @__PURE__ */ new Date();
  const consent = {
    id: `consent_${nanoid(10)}`,
    userId: user.id,
    uid: record.uid,
    txnId: txn.id,
    purpose: "Digital life certificate issuance and periodic identity verification",
    scopes,
    grantedAt: now.toISOString(),
    expiresAt: new Date(now.getTime() + CONSENT_VALIDITY_DAYS * 24 * 60 * 60 * 1e3).toISOString(),
    revokedAt: null
  };
  aadhaarConsentsTable.insert(consent, { userId: user.id, uid: record.uid });
  aadhaarTxnsTable.update(txn.id, { ...txn, consentGrantedAt: now.toISOString() });
  syncFamilyFromAadhaar(user, record);
  syncPensionHistory(user);
  return { user, consent };
}
function upsertUserFromAadhaar(record, now = /* @__PURE__ */ new Date()) {
  const existing = findUserByAadhaarUid(record.uid);
  const pension = buildPensionInfo(record.uid, now);
  const profileBank = pensionBankFor(record.uid);
  const projected = {
    id: existing?.id ?? deriveUserId(record.uid),
    mobile: record.registeredMobile,
    aadhaarUid: record.uid,
    maskedAadhaar: maskUid(record.uid),
    aadhaarVerifiedAt: now.toISOString(),
    name: record.name,
    dob: record.dob,
    gender: record.gender,
    photoInitials: record.photoInitials,
    address: {
      line1: `${record.address.house}, ${record.address.street}`,
      district: record.address.district,
      state: record.address.state,
      pincode: record.address.pincode
    },
    // Language is the one field the pensioner owns; keep their choice over Aadhaar's.
    locale: existing?.locale ?? record.locale,
    pension,
    bank: profileBank,
    prefs: existing?.prefs ?? {
      fontScale: 1,
      highContrast: false,
      reducedMotion: false,
      preferredChannel: "sms",
      onboardingCompletedAt: null
    },
    createdAt: existing?.createdAt ?? now.toISOString(),
    lastLoginAt: existing?.lastLoginAt ?? null,
    isDemo: true
  };
  if (existing) usersTable.update(existing.id, projected);
  else insertUser(projected);
  return projected;
}
function pensionBankFor(uid) {
  return PENSION_PROFILES[uid].bank;
}
function syncFamilyFromAadhaar(user, record, now = /* @__PURE__ */ new Date()) {
  const source = record ?? findAadhaarByUid(user.aadhaarUid);
  if (!source) return [];
  for (const old of familyContactsTable.findBy("userId", user.id)) {
    familyContactsTable.deleteById(old.id);
  }
  const contacts = source.family.map((m) => ({
    id: `fam_${m.uid.slice(-8)}`,
    userId: user.id,
    maskedUid: m.maskedUid,
    name: m.name,
    relation: m.relation,
    maskedMobile: m.maskedMobile,
    isVerified: m.mobileVerified,
    canAttest: canAttest(m, now),
    source: "aadhaar",
    fetchedAt: now.toISOString()
  }));
  for (const c of contacts) familyContactsTable.insert(c, { userId: user.id });
  return contacts;
}
function syncPensionHistory(user, now = /* @__PURE__ */ new Date()) {
  for (const old of pensionTransactionsTable.findBy("userId", user.id)) {
    pensionTransactionsTable.deleteById(old.id);
  }
  const rows = buildPensionTransactions(user.aadhaarUid, user.id, now);
  for (const r of rows) pensionTransactionsTable.insert(r, { userId: user.id });
  return rows;
}
function attesterMobile(user, familyContactId) {
  const record = findAadhaarByUid(user.aadhaarUid);
  if (!record) return null;
  const member2 = record.family.find((m) => `fam_${m.uid.slice(-8)}` === familyContactId);
  return member2?.mobile ?? null;
}

// apps/api/src/db/seed.ts
var SEED_VERSION = "2026-08-25.2-aadhaar";
var DEMO_OTP = AADHAAR_DEMO_OTP;
var PERSONAS = [
  {
    // Everything done, plenty of runway. The "nothing is wrong" baseline.
    uid: "784239015566",
    scenario: {
      en: "Fully verified \u2014 pension paid, renewal not due for months",
      hi: "\u092A\u0942\u0930\u094D\u0923 \u0938\u0924\u094D\u092F\u093E\u092A\u093F\u0924 \u2014 \u092A\u0947\u0902\u0936\u0928 \u091C\u093E\u0930\u0940, \u0928\u0935\u0940\u0928\u0940\u0915\u0930\u0923 \u0905\u092D\u0940 \u0926\u0942\u0930"
    },
    trustedDevice: true,
    faceEnrolled: true,
    onboardingDone: true,
    certificate: { issuedDaysAgo: 94, validityDays: 365, score: 96 }
  },
  {
    // The deadline case: still being paid, but the clock is visibly running out.
    uid: "552177348890",
    scenario: {
      en: "Renewal due in 11 days \u2014 pension still being paid",
      hi: "11 \u0926\u093F\u0928\u094B\u0902 \u092E\u0947\u0902 \u0928\u0935\u0940\u0928\u0940\u0915\u0930\u0923 \u0926\u0947\u092F \u2014 \u092A\u0947\u0902\u0936\u0928 \u0905\u092D\u0940 \u091C\u093E\u0930\u0940 \u0939\u0948"
    },
    trustedDevice: false,
    faceEnrolled: true,
    onboardingDone: false,
    certificate: { issuedDaysAgo: 354, validityDays: 365, score: 91 }
  },
  {
    // The reason this product exists: payments already stopped, nobody to vouch.
    uid: "669044123378",
    scenario: {
      en: "Pension stopped 3 months ago \u2014 certificate expired, no family on record",
      hi: "3 \u092E\u0939\u0940\u0928\u0947 \u0938\u0947 \u092A\u0947\u0902\u0936\u0928 \u092C\u0902\u0926 \u2014 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0938\u092E\u093E\u092A\u094D\u0924, \u0930\u093F\u0915\u0949\u0930\u094D\u0921 \u092E\u0947\u0902 \u0915\u094B\u0908 \u092A\u0930\u093F\u0935\u093E\u0930 \u0928\u0939\u0940\u0902"
    },
    trustedDevice: false,
    faceEnrolled: false,
    onboardingDone: false,
    certificate: { issuedDaysAgo: 461, validityDays: 365, score: 88 }
  },
  {
    // Not a pensioner at all. The app has to say so instead of starting a journey.
    uid: "331288765401",
    scenario: {
      en: "Not eligible \u2014 25 years old, no pension account linked",
      hi: "\u092A\u093E\u0924\u094D\u0930 \u0928\u0939\u0940\u0902 \u2014 \u0906\u092F\u0941 25 \u0935\u0930\u094D\u0937, \u0915\u094B\u0908 \u092A\u0947\u0902\u0936\u0928 \u0916\u093E\u0924\u093E \u0928\u0939\u0940\u0902"
    },
    trustedDevice: false,
    faceEnrolled: false,
    onboardingDone: false,
    certificate: null
  }
];
function buildCertificate(user, spec) {
  const issuedAt = new Date(Date.now() - spec.issuedDaysAgo * 24 * 60 * 60 * 1e3);
  const validUntil = new Date(issuedAt.getTime() + spec.validityDays * 24 * 60 * 60 * 1e3);
  const expired = validUntil < /* @__PURE__ */ new Date();
  return {
    id: `cert_${nanoid(8)}`,
    userId: user.id,
    sessionId: `ses_seed_${nanoid(6)}`,
    kind: "full",
    certificateNumber: `JS-${issuedAt.getFullYear()}-${nanoid(6).toUpperCase()}`,
    verificationCode: nanoid(10).toUpperCase(),
    confidenceScore: spec.score,
    tier: "verified",
    signalsUsed: ["phone_otp", "face_match", "liveness_challenge", "video_verification"],
    issuedAt: issuedAt.toISOString(),
    validFrom: issuedAt.toISOString(),
    validUntil: validUntil.toISOString(),
    status: expired ? "expired" : "active",
    aiSummary: null
  };
}
function ensureSeeded() {
  if (getMeta("seedVersion") === SEED_VERSION) return;
  resetDatabase();
  const now = /* @__PURE__ */ new Date();
  for (const persona of PERSONAS) {
    const record = AADHAAR_RECORDS.find((r) => r.uid === persona.uid);
    if (!record) throw new Error(`Seed persona references unknown Aadhaar uid ${persona.uid}`);
    const user = upsertUserFromAadhaar(record, now);
    const consent = {
      id: `consent_${nanoid(10)}`,
      userId: user.id,
      uid: record.uid,
      txnId: `SEED${nanoid(10).toUpperCase()}`,
      purpose: "Digital life certificate issuance and periodic identity verification",
      scopes: DEFAULT_CONSENT_SCOPES,
      grantedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1e3).toISOString(),
      revokedAt: null
    };
    aadhaarConsentsTable.insert(consent, { userId: user.id, uid: record.uid });
    if (persona.onboardingDone) {
      usersTable.update(user.id, {
        ...user,
        prefs: { ...user.prefs, onboardingCompletedAt: now.toISOString() }
      });
    }
    syncFamilyFromAadhaar(user, record, now);
    syncPensionHistory(user, now);
    if (persona.trustedDevice) {
      insertDevice({
        id: `dev_${nanoid(8)}`,
        userId: user.id,
        fingerprint: `seed-device-${user.id}`,
        label: "Family tablet (seeded)",
        firstSeenAt: now.toISOString(),
        lastSeenAt: now.toISOString(),
        isTrusted: true
      });
    }
    if (persona.certificate) insertCertificate(buildCertificate(user, persona.certificate));
  }
  setMeta("seedVersion", SEED_VERSION);
  console.log(
    `[seed] ${PERSONAS.length} demo personas ready (${SEED_VERSION}, store=${persistDriver}). Aadhaar OTP: ${DEMO_OTP}`
  );
}

// apps/api/src/routes/aadhaar.ts
var aadhaarRoutes = new Hono2();
aadhaarRoutes.get("/directory", (c) => {
  const now = /* @__PURE__ */ new Date();
  const entries = PERSONAS.map((persona) => {
    const record = findAadhaarByUid(persona.uid);
    const profile = PENSION_PROFILES[persona.uid];
    const age = Math.floor(
      (now.getTime() - new Date(record.dob).getTime()) / (365.25 * 24 * 60 * 60 * 1e3)
    );
    return {
      maskedUid: record.maskedUid,
      name: record.name,
      /** The Aadhaar-registered mobile — this is what the user must type to log in. */
      registeredMobile: record.registeredMobile,
      maskedMobile: record.maskedMobile,
      age,
      district: record.address.district,
      state: record.address.state,
      scenario: persona.scenario,
      pensionStatus: profile.status,
      eligible: profile.status !== "not_eligible"
    };
  });
  return c.json({ entries, demoOtp: AADHAAR_DEMO_OTP });
});
aadhaarRoutes.post(
  "/auth/start",
  rateLimit((c) => `aadhaar:${c.req.header("x-forwarded-for") ?? "local"}`, 8, 6e4),
  zValidator("json", aadhaarOtpRequestSchema),
  async (c) => {
    const { mobile } = c.req.valid("json");
    return c.json(startAadhaarAuth(mobile));
  }
);
aadhaarRoutes.post("/auth/otp/verify", zValidator("json", aadhaarOtpVerifySchema), async (c) => {
  const { txnId, code } = c.req.valid("json");
  const { record, requiresConsent } = verifyAadhaarOtp(txnId, code);
  return c.json({
    verified: true,
    requiresConsent,
    txnId,
    // A preview of exactly what the app is about to receive, so the consent screen
    // can show the real values rather than a vague list of field names.
    preview: {
      maskedUid: record.maskedUid,
      name: record.name,
      dob: record.dob,
      gender: record.gender,
      careOf: record.careOf,
      address: record.address,
      maskedMobile: record.maskedMobile,
      familyCount: record.family.length
    },
    scopes: DEFAULT_CONSENT_SCOPES
  });
});
aadhaarRoutes.post("/auth/consent", zValidator("json", aadhaarConsentGrantSchema), async (c) => {
  const { txnId, scopes } = c.req.valid("json");
  const { user, consent } = grantConsentAndSync(txnId, scopes);
  const fingerprint = c.req.header("x-device-fingerprint") ?? `unlabeled-${nanoid(6)}`;
  let device = findDeviceByFingerprint(user.id, fingerprint);
  if (!device) {
    device = {
      id: `dev_${nanoid(8)}`,
      userId: user.id,
      fingerprint,
      label: "This device",
      firstSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
      lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
      isTrusted: false
    };
    insertDevice(device);
  }
  const refreshed = { ...user, lastLoginAt: (/* @__PURE__ */ new Date()).toISOString() };
  usersTable.update(user.id, refreshed);
  return c.json({
    tokens: issueTokenPair(user.id, user.mobile, device.id),
    user: refreshed,
    consent
  });
});
aadhaarRoutes.post(
  "/auth/complete",
  zValidator("json", external_exports.object({ txnId: external_exports.string().min(6) })),
  async (c) => {
    const { txnId } = c.req.valid("json");
    const txn = aadhaarTxnsTable.getById(txnId);
    if (!txn) throw new ApiError(404, "AADHAAR_TXN_NOT_FOUND", "This Aadhaar session has ended. Please start again.");
    if (!txn.otpVerifiedAt) {
      throw new ApiError(403, "AADHAAR_OTP_REQUIRED", "Please verify the Aadhaar OTP first.");
    }
    const record = findAadhaarByUid(txn.uid);
    if (!record) throw new ApiError(404, "AADHAAR_MOBILE_NOT_FOUND", "Aadhaar record not found.");
    const user = upsertUserFromAadhaar(record);
    if (!liveConsentFor(user.id)) {
      throw new ApiError(403, "AADHAAR_CONSENT_REQUIRED", "Please give consent to continue.");
    }
    syncFamilyFromAadhaar(user, record);
    syncPensionHistory(user);
    const fingerprint = c.req.header("x-device-fingerprint") ?? `unlabeled-${nanoid(6)}`;
    let device = findDeviceByFingerprint(user.id, fingerprint);
    if (!device) {
      device = {
        id: `dev_${nanoid(8)}`,
        userId: user.id,
        fingerprint,
        label: "This device",
        firstSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
        lastSeenAt: (/* @__PURE__ */ new Date()).toISOString(),
        isTrusted: false
      };
      insertDevice(device);
    }
    const refreshed = { ...user, lastLoginAt: (/* @__PURE__ */ new Date()).toISOString() };
    usersTable.update(user.id, refreshed);
    return c.json({ tokens: issueTokenPair(user.id, user.mobile, device.id), user: refreshed });
  }
);
aadhaarRoutes.get("/consent", requireAuth, async (c) => {
  const userId = c.get("userId");
  const consent = liveConsentFor(userId);
  const user = usersTable.getById(userId);
  return c.json({
    consent,
    maskedUid: user?.maskedAadhaar ?? null,
    availableScopes: DEFAULT_CONSENT_SCOPES
  });
});
aadhaarRoutes.post("/consent/revoke", requireAuth, async (c) => {
  const consent = liveConsentFor(c.get("userId"));
  if (!consent) throw new ApiError(404, "NOT_FOUND", "There is no active Aadhaar consent to withdraw.");
  const revoked = { ...consent, revokedAt: (/* @__PURE__ */ new Date()).toISOString() };
  aadhaarConsentsTable.update(consent.id, revoked);
  revokeFaceEnrollmentsForConsent(consent.id);
  return c.json({ consent: revoked });
});
aadhaarRoutes.post("/face/start", requireAuth, async (c) => {
  const user = usersTable.getById(c.get("userId"));
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const started = startAadhaarAuth(user.mobile);
  return c.json({ ...started, purpose: "face_authentication" });
});
aadhaarRoutes.post(
  "/face/otp/verify",
  requireAuth,
  zValidator("json", external_exports.object({ txnId: external_exports.string().min(6), code: external_exports.string().length(6) })),
  async (c) => {
    const { txnId, code } = c.req.valid("json");
    const { record } = verifyAadhaarOtp(txnId, code);
    return c.json({ verified: true, txnId, maskedUid: record.maskedUid, name: record.name });
  }
);
aadhaarRoutes.post(
  "/face/consent",
  requireAuth,
  zValidator("json", external_exports.object({ txnId: external_exports.string().min(6), agreed: external_exports.literal(true) })),
  async (c) => {
    const userId = c.get("userId");
    const user = usersTable.getById(userId);
    if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
    const { txnId } = c.req.valid("json");
    const txn = aadhaarTxnsTable.getById(txnId);
    if (!txn || !txn.otpVerifiedAt) {
      throw new ApiError(403, "AADHAAR_OTP_REQUIRED", "Please verify the Aadhaar OTP before giving consent.");
    }
    if (txn.uid !== user.aadhaarUid) {
      throw new ApiError(403, "AADHAAR_MISMATCH", "This Aadhaar session belongs to a different person.");
    }
    const now = /* @__PURE__ */ new Date();
    const consent = {
      id: `consent_${nanoid(10)}`,
      userId,
      uid: user.aadhaarUid,
      txnId: txn.id,
      purpose: "Face authentication for life certificate verification",
      scopes: ["face_authentication", "photo"],
      grantedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + 365 * 24 * 60 * 60 * 1e3).toISOString(),
      revokedAt: null
    };
    aadhaarConsentsTable.insert(consent, { userId, uid: user.aadhaarUid });
    aadhaarTxnsTable.update(txn.id, { ...txn, consentGrantedAt: now.toISOString() });
    return c.json({ consentId: consent.id, txnId: txn.id, expiresAt: consent.expiresAt });
  }
);
aadhaarRoutes.get("/family", requireAuth, async (c) => {
  const user = usersTable.getById(c.get("userId"));
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const contacts = syncFamilyFromAadhaar(user);
  return c.json({
    contacts,
    source: "aadhaar",
    maskedUid: user.maskedAadhaar,
    note: "Family members are read from your Aadhaar record and cannot be added here."
  });
});
aadhaarRoutes.get("/records", (c) => {
  return c.json({
    records: AADHAAR_RECORDS.map((r) => ({
      maskedUid: r.maskedUid,
      name: r.name,
      dob: r.dob,
      gender: r.gender,
      district: r.address.district,
      state: r.address.state,
      maskedMobile: r.maskedMobile,
      family: r.family.map((m) => ({
        maskedUid: m.maskedUid,
        name: m.name,
        relation: m.relation,
        mobileVerified: m.mobileVerified
      }))
    }))
  });
});

// apps/api/src/routes/auth.ts
var authRoutes = new Hono2();
authRoutes.post("/refresh", zValidator("json", refreshSchema), async (c) => {
  const { refreshToken } = c.req.valid("json");
  const rotated = rotateRefreshToken(refreshToken);
  if (!rotated) throw new ApiError(401, "INVALID_REFRESH_TOKEN", "Please sign in again.");
  const user = usersTable.getById(rotated.userId);
  if (!user) throw new ApiError(401, "INVALID_REFRESH_TOKEN", "Please sign in again.");
  const tokens = issueTokenPair(user.id, user.mobile, null);
  return c.json({ ...tokens, refreshToken: rotated.newToken });
});
authRoutes.post("/logout", requireAuth, async (c) => {
  for (const token of refreshTokensTable.findBy("userId", c.get("userId"))) {
    if (!token.revokedAt) {
      refreshTokensTable.update(token.id, { ...token, revokedAt: (/* @__PURE__ */ new Date()).toISOString() });
    }
  }
  return c.json({ loggedOut: true });
});
authRoutes.get("/me", requireAuth, async (c) => {
  const user = usersTable.getById(c.get("userId"));
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  return c.json({ user });
});

// apps/api/src/routes/users.ts
var userRoutes = new Hono2();
userRoutes.use("*", requireAuth);
function loadUser(userId) {
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  return user;
}
userRoutes.get("/me", async (c) => {
  return c.json({ user: loadUser(c.get("userId")) });
});
userRoutes.patch("/me/preferences", zValidator("json", updatePreferencesSchema), async (c) => {
  const user = loadUser(c.get("userId"));
  const patch = c.req.valid("json");
  const updated = {
    ...user,
    locale: patch.locale ?? user.locale,
    prefs: { ...user.prefs, ...patch }
  };
  usersTable.update(user.id, updated);
  return c.json({ user: updated });
});
userRoutes.get("/me/timeline", async (c) => {
  const userId = c.get("userId");
  return c.json({
    sessions: sessionsTable.findBy("userId", userId),
    certificates: certificatesForUser(userId)
  });
});
userRoutes.get("/me/pension/history", async (c) => {
  const user = loadUser(c.get("userId"));
  let rows = pensionHistoryForUser(user.id);
  if (rows.length === 0 && user.pension.status !== "not_eligible") {
    rows = syncPensionHistory(user);
  }
  const credited = rows.filter((r) => r.status === "credited");
  return c.json({
    transactions: rows,
    summary: {
      status: user.pension.status,
      monthlyAmount: user.pension.monthlyAmount,
      lastCreditedAt: user.pension.lastCreditedAt,
      nextRenewalDueAt: user.pension.nextRenewalDueAt,
      monthsUnpaid: user.pension.monthsUnpaid,
      withheldAmount: rows.filter((r) => r.status === "on_hold").reduce((sum, r) => sum + r.amount, 0),
      creditedCount: credited.length
    }
  });
});
userRoutes.get("/me/family-contacts", async (c) => {
  const user = loadUser(c.get("userId"));
  let contacts = familyContactsTable.findBy("userId", user.id);
  if (contacts.length === 0) contacts = syncFamilyFromAadhaar(user);
  return c.json({ contacts, source: "aadhaar", readOnly: true });
});
userRoutes.get("/me/devices", async (c) => {
  return c.json({ devices: trustedDevicesTable.findBy("userId", c.get("userId")) });
});
userRoutes.post("/me/devices/trust", async (c) => {
  const fingerprint = c.req.header("x-device-fingerprint");
  if (!fingerprint) throw new ApiError(400, "MISSING_DEVICE", "No device fingerprint provided.");
  const device = trustedDevicesTable.findBy("userId", c.get("userId")).find((d) => d.fingerprint === fingerprint);
  if (!device) throw new ApiError(404, "NOT_FOUND", "Device not found.");
  const updated = { ...device, isTrusted: true, lastSeenAt: (/* @__PURE__ */ new Date()).toISOString() };
  trustedDevicesTable.update(device.id, updated);
  return c.json({ device: updated });
});

// apps/api/src/engine/recommender.ts
var EFFORT_COST = { none: 0.1, low: 1, medium: 2, high: 3.5, assisted: 4 };
function computeNextBestActions(session, ctx) {
  const candidates = [];
  for (const def of SIGNAL_DEFINITIONS) {
    if (def.automatic) continue;
    if (def.signal === "face_match" || def.signal === "liveness_challenge") {
      if (!ctx.hasCamera) continue;
    }
    if (def.signal === "voice_phrase" && !ctx.hasMic) continue;
    if (def.signal === "family_confirmation" && !ctx.hasFamilyContact) continue;
    if (def.signal === "manual_review") continue;
    const cap2 = CATEGORY_CAPS[def.category];
    const subtotal = session.categorySubtotals[def.category] ?? 0;
    const headroom = cap2 === null ? def.weight : Math.max(0, cap2 - subtotal);
    if (headroom <= 0) continue;
    const isRetry = session.completedSignals.includes(def.signal);
    const estimatedPoints = Math.min(def.weight, headroom) * (isRetry ? 0.6 : 1);
    if (estimatedPoints < 1) continue;
    candidates.push({
      signal: def.signal,
      estimatedPoints: Math.round(estimatedPoints),
      effort: def.effort,
      labelKey: isRetry ? `action.retry.${def.signal}` : `action.${def.signal}`,
      reason: isRetry ? "retry" : "fastest_remaining",
      isRetry
    });
  }
  candidates.sort((a, b) => b.estimatedPoints / EFFORT_COST[b.effort] - a.estimatedPoints / EFFORT_COST[a.effort]);
  const top = candidates.slice(0, 3);
  top.push({
    signal: "manual_review",
    estimatedPoints: 40,
    effort: "assisted",
    labelKey: "action.manual_review",
    reason: "always_available",
    alwaysAvailable: true
  });
  return top;
}

// apps/api/src/engine/context.ts
function buildRecommenderContext(userId) {
  return {
    hasCamera: true,
    hasMic: true,
    hasFamilyContact: familyContactsTable.findBy("userId", userId).some((f) => f.canAttest)
  };
}

// apps/api/src/engine/narrative.ts
var SIGNAL_LABEL = {
  phone_otp: { en: "phone verification", hi: "\u092B\u093C\u094B\u0928 \u0938\u0924\u094D\u092F\u093E\u092A\u0928" },
  trusted_device: { en: "trusted device check", hi: "\u0935\u093F\u0936\u094D\u0935\u0938\u0928\u0940\u092F \u0921\u093F\u0935\u093E\u0907\u0938 \u091C\u093E\u0902\u091A" },
  location_consistency: { en: "location check", hi: "\u0938\u094D\u0925\u093E\u0928 \u091C\u093E\u0902\u091A" },
  pension_record_match: {
    en: "pension record match",
    hi: "\u092A\u0947\u0902\u0936\u0928 \u0930\u093F\u0915\u0949\u0930\u094D\u0921 \u092E\u093F\u0932\u093E\u0928"
  },
  face_match: { en: "photo match", hi: "\u092B\u093C\u094B\u091F\u094B \u092E\u093F\u0932\u093E\u0928" },
  liveness_challenge: { en: "liveness check", hi: "\u091C\u0940\u0935\u0902\u0924\u0924\u093E \u091C\u093E\u0902\u091A" },
  voice_phrase: { en: "voice check", hi: "\u0906\u0935\u093E\u091C\u093C \u091C\u093E\u0902\u091A" },
  document_upload: { en: "document upload", hi: "\u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C \u0905\u092A\u0932\u094B\u0921" },
  family_confirmation: { en: "family confirmation", hi: "\u092A\u0930\u093F\u0935\u093E\u0930 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F" },
  video_verification: { en: "video verification", hi: "\u0935\u0940\u0921\u093F\u092F\u094B \u0938\u0924\u094D\u092F\u093E\u092A\u0928" },
  manual_review: { en: "assisted review", hi: "\u0938\u0939\u093E\u092F\u0915 \u0938\u092E\u0940\u0915\u094D\u0937\u093E" },
  continuity_history: { en: "verification history", hi: "\u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0907\u0924\u093F\u0939\u093E\u0938" }
};
function narrativeFor(signal, status, pointsAwarded) {
  const label = SIGNAL_LABEL[signal];
  if (status === "awarded") {
    return {
      en: {
        title: `${cap(label.en)} confirmed`,
        body: `Great \u2014 your ${label.en} was confirmed and added ${pointsAwarded} points to your trust score.`,
        tone: "celebratory"
      },
      hi: {
        title: `${label.hi} \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0939\u0941\u0908`,
        body: `\u092C\u0939\u0941\u0924 \u092C\u0922\u093C\u093F\u092F\u093E \u2014 \u0906\u092A\u0915\u093E ${label.hi} \u0938\u092B\u0932 \u0930\u0939\u093E \u0914\u0930 \u0906\u092A\u0915\u0947 \u092D\u0930\u094B\u0938\u0947 \u0915\u0947 \u0938\u094D\u0915\u094B\u0930 \u092E\u0947\u0902 ${pointsAwarded} \u0905\u0902\u0915 \u091C\u0941\u0921\u093C \u0917\u090F\u0964`,
        tone: "celebratory"
      }
    };
  }
  if (status === "partial") {
    return {
      en: {
        title: `Partial match on ${label.en}`,
        body: `We could only partly confirm your ${label.en}, but you still earned ${pointsAwarded} points. No problem \u2014 you can try again or use another method.`,
        tone: "reassuring"
      },
      hi: {
        title: `${label.hi} \u0906\u0902\u0936\u093F\u0915 \u0930\u0942\u092A \u0938\u0947 \u0938\u092B\u0932`,
        body: `\u0906\u092A\u0915\u093E ${label.hi} \u092A\u0942\u0930\u0940 \u0924\u0930\u0939 \u0938\u0947 \u0928\u0939\u0940\u0902 \u0939\u094B \u092A\u093E\u092F\u093E, \u0932\u0947\u0915\u093F\u0928 \u092B\u093F\u0930 \u092D\u0940 \u0906\u092A\u0915\u094B ${pointsAwarded} \u0905\u0902\u0915 \u092E\u093F\u0932\u0947\u0964 \u0915\u094B\u0908 \u092C\u093E\u0924 \u0928\u0939\u0940\u0902 \u2014 \u0906\u092A \u092B\u093F\u0930 \u0915\u094B\u0936\u093F\u0936 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u092F\u093E \u0915\u094B\u0908 \u0914\u0930 \u0924\u0930\u0940\u0915\u093E \u0905\u092A\u0928\u093E \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964`,
        tone: "reassuring"
      }
    };
  }
  if (status === "capped") {
    return {
      en: {
        title: `${cap(label.en)} recorded`,
        body: `Your ${label.en} was recorded. You've already earned the maximum points possible for this type of check \u2014 try a different method to keep building your score.`,
        tone: "informative"
      },
      hi: {
        title: `${label.hi} \u0926\u0930\u094D\u091C \u0939\u0941\u0906`,
        body: `\u0906\u092A\u0915\u093E ${label.hi} \u0926\u0930\u094D\u091C \u0939\u094B \u0917\u092F\u093E \u0939\u0948\u0964 \u0907\u0938 \u092A\u094D\u0930\u0915\u093E\u0930 \u0915\u0940 \u091C\u093E\u0902\u091A \u0915\u0947 \u0932\u093F\u090F \u0906\u092A\u0928\u0947 \u092A\u0939\u0932\u0947 \u0939\u0940 \u0905\u0927\u093F\u0915\u0924\u092E \u0905\u0902\u0915 \u0905\u0930\u094D\u091C\u093F\u0924 \u0915\u0930 \u0932\u093F\u090F \u0939\u0948\u0902 \u2014 \u0905\u092A\u0928\u093E \u0938\u094D\u0915\u094B\u0930 \u092C\u0922\u093C\u093E\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0915\u094B\u0908 \u0914\u0930 \u0924\u0930\u0940\u0915\u093E \u0906\u091C\u093C\u092E\u093E\u090F\u0902\u0964`,
        tone: "informative"
      }
    };
  }
  return {
    en: {
      title: `${cap(label.en)} didn't come through this time`,
      body: `That's alright \u2014 it happens. Let's try another way to confirm it's you.`,
      tone: "reassuring"
    },
    hi: {
      title: `${label.hi} \u0907\u0938 \u092C\u093E\u0930 \u092A\u0942\u0930\u093E \u0928\u0939\u0940\u0902 \u0939\u094B \u0938\u0915\u093E`,
      body: `\u0915\u094B\u0908 \u092C\u093E\u0924 \u0928\u0939\u0940\u0902 \u2014 \u0910\u0938\u093E \u0939\u094B\u0924\u093E \u0939\u0948\u0964 \u091A\u0932\u093F\u090F \u092F\u0939 \u0938\u093E\u092C\u093F\u0924 \u0915\u0930\u0928\u0947 \u0915\u093E \u0915\u094B\u0908 \u0914\u0930 \u0924\u0930\u0940\u0915\u093E \u0906\u091C\u093C\u092E\u093E\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u092F\u0939 \u0906\u092A \u0939\u0940 \u0939\u0948\u0902\u0964`,
      tone: "reassuring"
    }
  };
}
function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// apps/api/src/engine/scoring.ts
function qualityFromSimilarity(signal, measurement) {
  return qualityFor(signal, measurement);
}
function statusFor(quality, cappedPoints, rawPoints) {
  if (quality <= 0) return "no_credit";
  if (cappedPoints === 0 && rawPoints > 0) return "capped";
  if (quality < 0.75) return "partial";
  return "awarded";
}
function recordSignalEvent(params) {
  const { session, signal, similarity, raw: raw2 } = params;
  const def = getSignalDefinition(signal);
  const priorEvents = eventsForSession(session.id).filter((e) => e.signal === signal);
  const attemptIndex = priorEvents.length + 1;
  const decay = retryDecay(attemptIndex);
  const quality = qualityFromSimilarity(signal, similarity);
  const rawPoints = Math.round(def.weight * quality * decay);
  const cap2 = CATEGORY_CAPS[def.category];
  const currentSubtotal = session.categorySubtotals[def.category] ?? 0;
  const newSubtotal = cap2 === null ? currentSubtotal + rawPoints : Math.min(cap2, currentSubtotal + rawPoints);
  const cappedPoints = newSubtotal - currentSubtotal;
  const capReason = cap2 !== null && cappedPoints < rawPoints ? `${def.category}_cap_reached` : null;
  const newCategorySubtotals = {
    ...session.categorySubtotals,
    [def.category]: newSubtotal
  };
  const scoreBefore = session.currentScore;
  const scoreAfterRaw = Object.values(newCategorySubtotals).reduce((a, b) => a + b, 0);
  const scoreAfter = Math.min(MAX_SCORE, Math.max(scoreBefore, scoreAfterRaw));
  const tierBefore = resolveTier(scoreBefore).tier;
  const tierAfter = resolveTier(scoreAfter).tier;
  const status = statusFor(quality, cappedPoints, rawPoints);
  const riskFlags = quality < 0.3 && rawPoints > 0 ? [{ code: "low_quality_signal", severity: "low" }] : [];
  const completedSignals = session.completedSignals.includes(signal) ? session.completedSignals : [...session.completedSignals, signal];
  const updatedSession = {
    ...session,
    currentScore: scoreAfter,
    currentTier: tierAfter,
    categorySubtotals: newCategorySubtotals,
    completedSignals
  };
  const nextBestActions = computeNextBestActions(updatedSession, buildRecommenderContext(session.userId));
  const event = {
    id: `evt_${nanoid(8)}`,
    sessionId: session.id,
    userId: session.userId,
    seq: eventsForSession(session.id).length + 1,
    signal,
    category: def.category,
    attemptIndex,
    status,
    raw: raw2,
    quality,
    weight: def.weight,
    retryDecay: decay,
    rawPoints,
    cappedPoints,
    capReason,
    scoreBefore,
    scoreAfter,
    tierBefore,
    tierAfter,
    categorySubtotals: newCategorySubtotals,
    riskFlags,
    narrative: narrativeFor(signal, status, cappedPoints),
    nextBestActions,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  insertEvent(event);
  sessionsTable.update(session.id, updatedSession);
  return { session: updatedSession, event };
}

// apps/api/src/mocks/prng.ts
function hashString(s) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(h ^ s.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return h >>> 0;
}
function mulberry32(seed) {
  let a = seed;
  return function() {
    a |= 0;
    a = a + 1831565813 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function seededRandom(key) {
  return mulberry32(hashString(key));
}
function seededFloat(key, min, max) {
  const r = seededRandom(key)();
  return min + r * (max - min);
}

// apps/api/src/mocks/signalMocks.ts
function outcomeToRange(outcome) {
  switch (outcome) {
    case "strong":
      return [0.88, 0.99];
    case "weak":
      return [0.35, 0.55];
    case "fail":
      return [0, 0.15];
    case "timeout":
      return [0, 0];
    default:
      return [0.55, 0.95];
  }
}
function mockFaceMatch(key, forced) {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: {
      similarity: Number(similarity.toFixed(3)),
      blurScore: Number(seededFloat(key + ":blur", 0.1, 0.6).toFixed(2)),
      lightingScore: Number(seededFloat(key + ":light", 0.3, 0.9).toFixed(2))
    }
  };
}
function mockLiveness(key, forced) {
  const [min, max] = outcomeToRange(forced);
  const challenges = ["blink twice", "turn head left", "smile"];
  const idx = Math.floor(seededFloat(key + ":challenge", 0, challenges.length));
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: { challenge: challenges[idx] ?? "blink twice", passScore: Number(similarity.toFixed(3)) }
  };
}
function mockVoicePhrase(key, forced) {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: { phraseMatchScore: Number(similarity.toFixed(3)), backgroundNoise: Number(seededFloat(key + ":noise", 0, 0.4).toFixed(2)) }
  };
}
function mockDocumentOcr(key, forced) {
  const [min, max] = outcomeToRange(forced);
  const similarity = seededFloat(key, min, max);
  return {
    similarity,
    raw: { fieldsExtracted: Math.round(similarity * 6), fieldsExpected: 6 }
  };
}
function mockPensionRecordMatch(key) {
  const similarity = seededFloat(key, 0.85, 1);
  return { similarity, raw: { matched: true } };
}
function mockLocationConsistency(key) {
  const similarity = seededFloat(key, 0.7, 1);
  return { similarity, raw: { withinExpectedDistrict: similarity > 0.6 } };
}

// apps/api/src/engine/sessionInit.ts
var SESSION_TTL_DAYS = 7;
function startVerificationSession(user, deviceFingerprint) {
  const now = /* @__PURE__ */ new Date();
  let session = {
    id: `ses_${nanoid(10)}`,
    userId: user.id,
    status: "active",
    startedAt: now.toISOString(),
    completedAt: null,
    expiresAt: new Date(now.getTime() + SESSION_TTL_DAYS * 24 * 60 * 60 * 1e3).toISOString(),
    currentScore: 0,
    currentTier: "started",
    categorySubtotals: { otp: 0, biometric: 0, social: 0, documentary: 0, passive: 0 },
    completedSignals: [],
    locale: user.locale,
    certificateId: null
  };
  insertSession(session);
  ({ session } = recordSignalEvent({
    session,
    signal: "phone_otp",
    similarity: 1,
    raw: { verifiedVia: "otp" }
  }));
  const devices = trustedDevicesTable.findBy("userId", user.id);
  const matchedDevice = deviceFingerprint ? devices.find((d) => d.fingerprint === deviceFingerprint) : void 0;
  if (matchedDevice?.isTrusted) {
    ({ session } = recordSignalEvent({
      session,
      signal: "trusted_device",
      similarity: 1,
      raw: { deviceId: matchedDevice.id }
    }));
  }
  const loc = mockPensionRecordMatch(`${user.id}:pension`);
  ({ session } = recordSignalEvent({ session, signal: "pension_record_match", similarity: loc.similarity, raw: loc.raw }));
  const locConsistency = mockLocationConsistency(`${user.id}:location`);
  ({ session } = recordSignalEvent({
    session,
    signal: "location_consistency",
    similarity: locConsistency.similarity,
    raw: locConsistency.raw
  }));
  const priorCertificates = certificatesTable.findBy("userId", user.id);
  if (priorCertificates.length > 0) {
    ({ session } = recordSignalEvent({
      session,
      signal: "continuity_history",
      similarity: 0.9,
      raw: { priorCertificateCount: priorCertificates.length }
    }));
  }
  return session;
}

// apps/api/src/routes/signals.ts
init_zod();

// apps/api/src/services/verification.ts
async function analyzeFace2(jpegDataUrl) {
  const engine = await Promise.resolve().then(() => (init_humanEngine(), humanEngine_exports));
  return engine.analyzeFace(jpegDataUrl);
}
var NoFaceDetectedError = class extends ApiError {
  constructor() {
    super(422, "NO_FACE_DETECTED", "We couldn't find a face in that photo. Try again with more light, or use another method.");
  }
};
var NotEnrolledError = class extends ApiError {
  constructor() {
    super(409, "NOT_ENROLLED", "We don't have a reference photo for you yet. Set up Face ID first, or use another method.");
  }
};
async function verifyFaceMatch(userId, jpegDataUrl) {
  const enrollment = getFaceEnrollment(userId);
  if (!enrollment) throw new NotEnrolledError();
  const analysis = await analyzeFace2(jpegDataUrl);
  if (!analysis) throw new NoFaceDetectedError();
  const similarity = cosineSimilarity(analysis.embedding, enrollment.descriptor);
  const spoofPenalty = penaltyFor(analysis);
  const measurement = Math.max(0, similarity - spoofPenalty);
  return {
    measurement,
    raw: {
      cosineSimilarity: round(similarity),
      liveScore: round(analysis.live),
      antispoofScore: round(analysis.real),
      faceScore: round(analysis.faceScore),
      spoofPenalty: round(spoofPenalty),
      enrollmentSource: enrollment.source
    }
  };
}
function penaltyFor(a) {
  let penalty = 0;
  if (a.real < 0.35) penalty += 0.1;
  if (a.live < 0.35) penalty += 0.06;
  return penalty;
}
async function verifyLiveness(jpegDataUrl, challengePassed, gestureConfidence) {
  const analysis = await analyzeFace2(jpegDataUrl);
  if (!analysis) throw new NoFaceDetectedError();
  const modelScore = (analysis.live + analysis.real) / 2;
  const gesture = challengePassed ? clamp01(gestureConfidence) : 0;
  const measurement = challengePassed ? modelScore * 0.5 + gesture * 0.5 : modelScore * 0.35;
  return {
    measurement,
    raw: {
      liveScore: round(analysis.live),
      antispoofScore: round(analysis.real),
      challengePassed,
      gestureConfidence: round(gesture)
    }
  };
}
function verifyVoicePhrase(transcript, expectedPhrase) {
  const similarity = textSimilarity(transcript, expectedPhrase);
  return {
    measurement: similarity,
    raw: {
      transcript: transcript.slice(0, 200),
      expectedPhrase,
      transcriptSimilarity: round(similarity)
    }
  };
}
function verifyVoiceAudioOnly(durationMs, peakLevel) {
  const durationOk = durationMs >= 1200 && durationMs <= 15e3 ? 1 : 0.4;
  const measurement = clamp01(durationOk * 0.5 + clamp01(peakLevel) * 0.5) * 0.7;
  return {
    measurement,
    raw: { durationMs, peakLevel: round(peakLevel), mode: "audio_only_fallback" }
  };
}
function verifyDocument(ocrText, user) {
  const haystack = ocrText.toLowerCase().replace(/\s+/g, " ");
  const checks = [];
  const passbook = user.pension.passbookNumber.toLowerCase();
  checks.push({
    field: "passbookNumber",
    hit: haystack.includes(passbook) || bestTokenSimilarity(haystack, passbook) > 0.85
  });
  const nameParts = user.name.en.toLowerCase().split(/\s+/).filter((p) => p.length > 2);
  const nameHits = nameParts.filter((p) => haystack.includes(p) || bestTokenSimilarity(haystack, p) > 0.85);
  checks.push({ field: "name", hit: nameHits.length >= Math.ceil(nameParts.length / 2) });
  checks.push({ field: "district", hit: haystack.includes(user.address.district.toLowerCase()) });
  checks.push({ field: "bank", hit: haystack.includes(user.bank.ifsc.toLowerCase()) || haystack.includes("pension") });
  const hits = checks.filter((c) => c.hit).length;
  const measurement = hits / checks.length;
  return {
    measurement,
    raw: {
      fieldsMatched: hits,
      fieldsChecked: checks.length,
      matchedFields: checks.filter((c) => c.hit).map((c) => c.field).join(",") || "none",
      textLength: ocrText.length
    }
  };
}
function bestTokenSimilarity(haystack, needle) {
  let best = 0;
  for (const token of haystack.split(" ")) {
    if (Math.abs(token.length - needle.length) > 3) continue;
    best = Math.max(best, textSimilarity(token, needle));
    if (best === 1) break;
  }
  return best;
}
async function buildEnrollmentDescriptor(jpegDataUrl) {
  const analysis = await analyzeFace2(jpegDataUrl);
  if (!analysis) throw new NoFaceDetectedError();
  return analysis;
}
function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}
function round(v) {
  return Math.round(v * 1e3) / 1e3;
}
var DESCRIPTOR_LENGTH = 1024;
function assertDescriptor(descriptor) {
  if (descriptor.length !== DESCRIPTOR_LENGTH || descriptor.some((n) => !Number.isFinite(n))) {
    throw new ApiError(
      422,
      "BAD_DESCRIPTOR",
      "We could not read that face capture. Please try again, or use another method."
    );
  }
}
function verifyFaceMatchFromDescriptor(userId, reading) {
  const enrollment = getFaceEnrollment(userId);
  if (!enrollment) throw new NotEnrolledError();
  assertDescriptor(reading.descriptor);
  const similarity = cosineSimilarity(reading.descriptor, enrollment.descriptor);
  const spoofPenalty = penaltyFor({
    embedding: reading.descriptor,
    faceScore: reading.faceScore,
    live: reading.live,
    real: reading.real,
    box: [0, 0, 0, 0]
  });
  const measurement = Math.max(0, similarity - spoofPenalty);
  return {
    measurement,
    raw: {
      cosineSimilarity: round(similarity),
      liveScore: round(reading.live),
      antispoofScore: round(reading.real),
      faceScore: round(reading.faceScore),
      spoofPenalty: round(spoofPenalty),
      enrollmentSource: enrollment.source,
      engine: "client"
    }
  };
}
function livenessFromClientReading(reading, challengePassed, gestureConfidence) {
  const modelScore = (reading.live + reading.real) / 2;
  const gesture = challengePassed ? clamp01(gestureConfidence) : 0;
  const measurement = challengePassed ? modelScore * 0.5 + gesture * 0.5 : modelScore * 0.35;
  return {
    measurement,
    raw: {
      liveScore: round(reading.live),
      antispoofScore: round(reading.real),
      challengePassed,
      gestureConfidence: round(gesture),
      engine: "client"
    }
  };
}
function enrollmentFromClientReading(reading) {
  assertDescriptor(reading.descriptor);
  if (reading.faceScore < 0.4) throw new NoFaceDetectedError();
  return {
    embedding: reading.descriptor,
    faceScore: reading.faceScore,
    live: reading.live,
    real: reading.real,
    box: [0, 0, 0, 0]
  };
}

// apps/api/src/mocks/sms.ts
function sendMockSms(userId, toMobile, body, relatedTo) {
  const msg = {
    id: `msg_${nanoid(8)}`,
    userId,
    channel: "sms",
    toMobile,
    body,
    relatedTo,
    sentAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  insertOutbox(msg);
  return msg;
}

// apps/api/src/routes/signals.ts
init_env();

// apps/api/src/services/phrases.ts
var VOICE_PHRASES = {
  en: [
    "My pension keeps me independent",
    "I am well and living at home",
    "Today I confirm I am alive"
  ],
  hi: [
    "\u092E\u0947\u0930\u0940 \u092A\u0947\u0902\u0936\u0928 \u092E\u0941\u091D\u0947 \u0906\u0924\u094D\u092E\u0928\u093F\u0930\u094D\u092D\u0930 \u092C\u0928\u093E\u0924\u0940 \u0939\u0948",
    "\u092E\u0948\u0902 \u0938\u094D\u0935\u0938\u094D\u0925 \u0939\u0942\u0902 \u0914\u0930 \u0918\u0930 \u092A\u0930 \u0930\u0939\u0924\u093E \u0939\u0942\u0902",
    "\u0906\u091C \u092E\u0948\u0902 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0924\u093E \u0939\u0942\u0902 \u0915\u093F \u092E\u0948\u0902 \u091C\u0940\u0935\u093F\u0924 \u0939\u0942\u0902"
  ]
};

// apps/api/src/routes/signals.ts
var signalRoutes = new Hono2();
var jpegSchema = external_exports.string().min(64).max(8e6);
var clientReadingSchema = external_exports.object({
  descriptor: external_exports.array(external_exports.number()).min(64).max(4096),
  faceScore: external_exports.number().min(0).max(1),
  live: external_exports.number().min(0).max(1),
  real: external_exports.number().min(0).max(1)
});
function ownedActiveSession(userId, sessionId) {
  const session = sessionsTable.getById(sessionId);
  if (!session || session.userId !== userId) {
    throw new ApiError(404, "SESSION_NOT_FOUND", "Verification session not found.");
  }
  if (session.status !== "active") {
    throw new ApiError(409, "SESSION_NOT_ACTIVE", "This verification session is no longer active.");
  }
  return session;
}
function simulating(userId) {
  if (env.VERIFICATION_MODE === "simulate") return true;
  return getMockControl(userId)?.overrides.simulate === "strong";
}
function attemptKey(sessionId, signal) {
  return `${sessionId}:${signal}:${Date.now()}:${nanoid(4)}`;
}
var faceSchema = external_exports.object({ image: jpegSchema.optional(), reading: clientReadingSchema.optional() }).refine((v) => !!v.image || !!v.reading, { message: "Provide an image or a face reading" });
signalRoutes.post("/face-match", zValidator("json", faceSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id"));
  const body = c.req.valid("json");
  let outcome;
  if (simulating(session.userId)) {
    const m = mockFaceMatch(attemptKey(session.id, "face_match"), getMockControl(session.userId)?.overrides.face_match);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else if (body.reading) {
    outcome = verifyFaceMatchFromDescriptor(session.userId, body.reading);
  } else {
    outcome = await verifyFaceMatch(session.userId, body.image);
  }
  const { event } = recordSignalEvent({
    session,
    signal: "face_match",
    similarity: outcome.measurement,
    raw: outcome.raw
  });
  return c.json({ event });
});
var LIVENESS_CHALLENGES = ["blink", "turn_left", "turn_right", "smile"];
signalRoutes.get("/liveness/challenge", async (c) => {
  const challenge = LIVENESS_CHALLENGES[Math.floor(Math.random() * LIVENESS_CHALLENGES.length)];
  return c.json({ challenge, timeoutMs: 15e3 });
});
var livenessSchema = external_exports.object({
  image: jpegSchema.optional(),
  reading: clientReadingSchema.optional(),
  challenge: external_exports.enum(LIVENESS_CHALLENGES),
  challengePassed: external_exports.boolean(),
  gestureConfidence: external_exports.number().min(0).max(1)
}).refine((v) => !!v.image || !!v.reading, { message: "Provide an image or a face reading" });
signalRoutes.post("/liveness", zValidator("json", livenessSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id"));
  const body = c.req.valid("json");
  let outcome;
  if (simulating(session.userId)) {
    const m = mockLiveness(attemptKey(session.id, "liveness"), getMockControl(session.userId)?.overrides.liveness_challenge);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else if (body.reading) {
    outcome = livenessFromClientReading(body.reading, body.challengePassed, body.gestureConfidence);
  } else {
    outcome = await verifyLiveness(body.image, body.challengePassed, body.gestureConfidence);
  }
  outcome.raw.challenge = body.challenge;
  const { event } = recordSignalEvent({
    session,
    signal: "liveness_challenge",
    similarity: outcome.measurement,
    raw: outcome.raw
  });
  return c.json({ event });
});
signalRoutes.get("/voice/phrase", async (c) => {
  const session = sessionsTable.getById(c.req.param("id"));
  const locale = session?.locale ?? "en";
  const list = VOICE_PHRASES[locale];
  const phrase = list[Math.floor(Math.random() * list.length)];
  return c.json({ phrase, locale });
});
var voiceSchema = external_exports.object({
  expectedPhrase: external_exports.string().min(3),
  transcript: external_exports.string().optional(),
  durationMs: external_exports.number().min(0).optional(),
  peakLevel: external_exports.number().min(0).max(1).optional()
});
signalRoutes.post("/voice", zValidator("json", voiceSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id"));
  const body = c.req.valid("json");
  let outcome;
  if (simulating(session.userId)) {
    const m = mockVoicePhrase(attemptKey(session.id, "voice"), getMockControl(session.userId)?.overrides.voice_phrase);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else if (body.transcript && body.transcript.trim().length > 0) {
    outcome = verifyVoicePhrase(body.transcript, body.expectedPhrase);
  } else {
    outcome = verifyVoiceAudioOnly(body.durationMs ?? 0, body.peakLevel ?? 0);
  }
  const { event } = recordSignalEvent({
    session,
    signal: "voice_phrase",
    similarity: outcome.measurement,
    raw: outcome.raw
  });
  return c.json({ event });
});
var documentSchema = external_exports.object({
  ocrText: external_exports.string().max(2e4),
  ocrConfidence: external_exports.number().min(0).max(100).optional()
});
signalRoutes.post("/document", zValidator("json", documentSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id"));
  const user = usersTable.getById(session.userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const body = c.req.valid("json");
  let outcome;
  if (simulating(session.userId)) {
    const m = mockDocumentOcr(attemptKey(session.id, "document"), getMockControl(session.userId)?.overrides.document_upload);
    outcome = { measurement: m.similarity, raw: { ...m.raw, mode: "simulated" } };
  } else {
    outcome = verifyDocument(body.ocrText, user);
    if (body.ocrConfidence !== void 0) outcome.raw.ocrConfidence = Math.round(body.ocrConfidence);
  }
  const { event } = recordSignalEvent({
    session,
    signal: "document_upload",
    similarity: outcome.measurement,
    raw: outcome.raw
  });
  return c.json({ event });
});
var familyRequestSchema = external_exports.object({ familyContactId: external_exports.string().min(1) });
signalRoutes.post("/family-request", zValidator("json", familyRequestSchema), async (c) => {
  const session = ownedActiveSession(c.get("userId"), c.req.param("id"));
  const { familyContactId } = c.req.valid("json");
  const contact = familyContactsTable.getById(familyContactId);
  if (!contact || contact.userId !== session.userId) {
    throw new ApiError(404, "NOT_FOUND", "That family member is not on your Aadhaar record.");
  }
  if (!contact.canAttest) {
    throw new ApiError(
      409,
      "CANNOT_ATTEST",
      "This relative cannot confirm your identity: Aadhaar does not have a verified mobile number for them."
    );
  }
  const user = usersTable.getById(session.userId);
  const mobile = attesterMobile(user, contact.id);
  if (!mobile) {
    throw new ApiError(409, "NO_MOBILE", "Aadhaar has no mobile number on file for this relative.");
  }
  const token = nanoid(24);
  const request = {
    id: `fcr_${nanoid(8)}`,
    sessionId: session.id,
    userId: session.userId,
    familyContactId: contact.id,
    token,
    status: "pending",
    sentAt: (/* @__PURE__ */ new Date()).toISOString(),
    respondedAt: null,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1e3).toISOString()
  };
  insertFamilyConfirmation(request);
  const link = `${env.PUBLIC_BASE_URL}/family/confirm/${token}`;
  sendMockSms(
    session.userId,
    mobile,
    {
      en: `${user.name.en} needs your help confirming their pension life certificate on JeevanSetu. Open: ${link}`,
      hi: `${user.name.hi} \u0915\u094B \u0905\u092A\u0928\u0947 \u092A\u0947\u0902\u0936\u0928 \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0947 \u0932\u093F\u090F \u0906\u092A\u0915\u0940 \u092E\u0926\u0926 \u091A\u093E\u0939\u093F\u090F\u0964 \u0916\u094B\u0932\u0947\u0902: ${link}`
    },
    { type: "family_confirmation", id: request.id }
  );
  return c.json({ request, link, sentTo: contact.maskedMobile });
});

// apps/api/src/routes/sessions.ts
var sessionRoutes = new Hono2();
sessionRoutes.use("*", requireAuth);
function ownedSession(userId, sessionId) {
  const session = sessionsTable.getById(sessionId);
  if (!session || session.userId !== userId) {
    throw new ApiError(404, "SESSION_NOT_FOUND", "Verification session not found.");
  }
  return session;
}
sessionRoutes.post("/", async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const existing = findActiveSessionForUser(userId);
  if (existing) return c.json({ session: existing }, 200);
  const fingerprint = c.req.header("x-device-fingerprint") ?? null;
  const session = startVerificationSession(user, fingerprint);
  return c.json({ session }, 201);
});
sessionRoutes.get("/active", async (c) => {
  const session = findActiveSessionForUser(c.get("userId"));
  return c.json({ session });
});
sessionRoutes.get("/:id", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id"));
  return c.json({ session });
});
sessionRoutes.get("/:id/events", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id"));
  return c.json({ events: eventsForSession(session.id) });
});
sessionRoutes.get("/:id/next-actions", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id"));
  return c.json({ actions: computeNextBestActions(session, buildRecommenderContext(session.userId)) });
});
sessionRoutes.post("/:id/abandon", async (c) => {
  const session = ownedSession(c.get("userId"), c.req.param("id"));
  const updated = { ...session, status: "abandoned", completedAt: (/* @__PURE__ */ new Date()).toISOString() };
  sessionsTable.update(session.id, updated);
  return c.json({ session: updated });
});
sessionRoutes.route("/:id/signals", signalRoutes);

// apps/api/src/services/appointments.ts
var DAY_MS = 24 * 60 * 60 * 1e3;
var SLOT_MINUTES = 20;
var SLOT_HOURS = [10, 12, 15, 17];
var SLOT_DAYS = 5;
function listSlots(userId, now = /* @__PURE__ */ new Date()) {
  const taken = new Set(
    appointmentsForUser(userId).filter((a) => a.status === "scheduled" || a.status === "in_call").map((a) => a.slotStart)
  );
  const slots = [];
  for (let d = 0; d < SLOT_DAYS; d += 1) {
    const day = new Date(now.getTime() + d * DAY_MS);
    for (const hour of SLOT_HOURS) {
      const start = new Date(day.getFullYear(), day.getMonth(), day.getDate(), hour, 0, 0);
      if (start.getTime() < now.getTime() + 60 * 60 * 1e3) continue;
      const end = new Date(start.getTime() + SLOT_MINUTES * 60 * 1e3);
      slots.push({
        start: start.toISOString(),
        end: end.toISOString(),
        available: !taken.has(start.toISOString())
      });
    }
  }
  return slots;
}
var CHECK_SEQUENCE = [
  {
    type: "show_aadhaar",
    prompt: {
      en: "Please hold your Aadhaar card up to the camera, with the photo side facing me.",
      hi: "\u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u093E \u0906\u0927\u093E\u0930 \u0915\u093E\u0930\u094D\u0921 \u0915\u0948\u092E\u0930\u0947 \u0915\u0947 \u0938\u093E\u092E\u0928\u0947 \u0930\u0916\u0947\u0902, \u092B\u094B\u091F\u094B \u0935\u093E\u0932\u093E \u0939\u093F\u0938\u094D\u0938\u093E \u092E\u0947\u0930\u0940 \u0913\u0930\u0964"
    }
  },
  {
    type: "turn_head",
    prompt: {
      en: "Now please turn your head slowly to the left, then back to the centre.",
      hi: "\u0905\u092C \u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u093E \u0938\u093F\u0930 \u0927\u0940\u0930\u0947-\u0927\u0940\u0930\u0947 \u092C\u093E\u0908\u0902 \u0913\u0930 \u0918\u0941\u092E\u093E\u090F\u0901, \u092B\u093F\u0930 \u0935\u093E\u092A\u0938 \u092C\u0940\u091A \u092E\u0947\u0902 \u0932\u093E\u090F\u0901\u0964"
    }
  },
  {
    type: "read_phrase",
    prompt: {
      en: "Please read the sentence shown on your screen out loud.",
      hi: "\u0915\u0943\u092A\u092F\u093E \u0905\u092A\u0928\u0940 \u0938\u094D\u0915\u094D\u0930\u0940\u0928 \u092A\u0930 \u0926\u093F\u0916\u093E\u092F\u093E \u0917\u092F\u093E \u0935\u093E\u0915\u094D\u092F \u091C\u093C\u094B\u0930 \u0938\u0947 \u092A\u0922\u093C\u0947\u0902\u0964"
    }
  },
  {
    type: "sign_on_camera",
    prompt: {
      en: "Please sign your name on a piece of paper and hold it up to the camera.",
      hi: "\u0915\u0943\u092A\u092F\u093E \u0915\u093E\u0917\u091C\u093C \u092A\u0930 \u0905\u092A\u0928\u093E \u0928\u093E\u092E \u0932\u093F\u0916\u0947\u0902 \u0914\u0930 \u0909\u0938\u0947 \u0915\u0948\u092E\u0930\u0947 \u0915\u0947 \u0938\u093E\u092E\u0928\u0947 \u0926\u093F\u0916\u093E\u090F\u0901\u0964"
    }
  }
];
function freshChecks() {
  return CHECK_SEQUENCE.map((c, i) => ({
    type: c.type,
    status: i === 0 ? "active" : "pending",
    prompt: c.prompt,
    completedAt: null,
    note: null
  }));
}
function scheduleAppointment(session, slotStart, now = /* @__PURE__ */ new Date()) {
  const start = new Date(slotStart);
  if (Number.isNaN(start.getTime())) {
    throw new ApiError(422, "BAD_SLOT", "That appointment time could not be read.");
  }
  if (start.getTime() < now.getTime()) {
    throw new ApiError(409, "SLOT_IN_PAST", "That slot has already passed. Please choose another time.");
  }
  const existing = appointmentsForUser(session.userId).find(
    (a) => a.status === "scheduled" || a.status === "in_call"
  );
  if (existing) {
    throw new ApiError(
      409,
      "APPOINTMENT_EXISTS",
      "You already have a verification call booked. Please cancel it before booking another."
    );
  }
  const appointment = {
    id: `apt_${nanoid(10)}`,
    userId: session.userId,
    sessionId: session.id,
    status: "scheduled",
    slotStart: start.toISOString(),
    slotEnd: new Date(start.getTime() + SLOT_MINUTES * 60 * 1e3).toISOString(),
    joinCode: nanoid(8).toUpperCase(),
    officerName: null,
    checks: freshChecks(),
    integrity: null,
    createdAt: now.toISOString(),
    startedAt: null,
    completedAt: null,
    outcomeNote: null
  };
  insertAppointment(appointment);
  return appointment;
}
function loadAppointment(userId, id) {
  const appointment = appointmentsTable.getById(id);
  if (!appointment || appointment.userId !== userId) {
    throw new ApiError(404, "NOT_FOUND", "We could not find that verification call.");
  }
  return appointment;
}
function cancelAppointment(userId, id, now = /* @__PURE__ */ new Date()) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status !== "scheduled") {
    throw new ApiError(409, "NOT_CANCELLABLE", "This call can no longer be cancelled.");
  }
  const updated = { ...appointment, status: "cancelled", completedAt: now.toISOString() };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}
function joinAppointment(userId, id, now = /* @__PURE__ */ new Date()) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status === "completed") return appointment;
  if (appointment.status !== "scheduled" && appointment.status !== "in_call") {
    throw new ApiError(409, "NOT_JOINABLE", "This call is no longer open.");
  }
  const updated = {
    ...appointment,
    status: "in_call",
    startedAt: appointment.startedAt ?? now.toISOString(),
    officerName: appointment.officerName ?? "Officer R. Nair (simulated)",
    checks: appointment.startedAt ? appointment.checks : freshChecks()
  };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}
function resolveCheck(userId, id, type, passed, note, now = /* @__PURE__ */ new Date()) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status !== "in_call") {
    throw new ApiError(409, "NOT_IN_CALL", "This call is not currently running.");
  }
  const checks = appointment.checks.map(
    (c) => c.type === type ? { ...c, status: passed ? "passed" : "failed", completedAt: now.toISOString(), note } : c
  );
  const nextPending = checks.find((c) => c.status === "pending");
  if (nextPending) nextPending.status = "active";
  const updated = { ...appointment, checks };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}
function scoreIntegrity(raw2) {
  const flags = [];
  const gaze = Math.min(1, raw2.gazeSamples / 40);
  if (raw2.gazeSamples < 8) flags.push("low_gaze_variation");
  const mouse = Math.min(1, raw2.mouseTravel / 2500);
  if (raw2.mouseTravel < 150) flags.push("no_pointer_movement");
  const jitter = Math.min(1, raw2.keystrokeJitterMs / 90);
  if (raw2.keystrokeJitterMs > 0 && raw2.keystrokeJitterMs < 12) flags.push("machine_like_keystrokes");
  const blink = Math.min(1, raw2.blinkCount / 6);
  if (raw2.blinkCount === 0) flags.push("no_blink_detected");
  const head = Math.min(1, raw2.headMovementScore);
  if (raw2.headMovementScore < 0.05) flags.push("static_head_pose");
  const livePresenceScore = gaze * 0.25 + mouse * 0.15 + jitter * 0.15 + blink * 0.25 + head * 0.2;
  return {
    ...raw2,
    livePresenceScore: Math.round(livePresenceScore * 1e3) / 1e3,
    flags
  };
}
function submitCallEvidence(userId, id, rawIntegrity, now = /* @__PURE__ */ new Date()) {
  const appointment = loadAppointment(userId, id);
  if (appointment.status !== "in_call") {
    throw new ApiError(409, "NOT_IN_CALL", "This call is not currently running.");
  }
  const integrity = scoreIntegrity(rawIntegrity);
  const updated = { ...appointment, integrity, startedAt: appointment.startedAt ?? now.toISOString() };
  appointmentsTable.update(appointment.id, updated);
  return updated;
}
function officerDecision(appointmentId, outcome, session, officerName = "Officer R. Nair (simulated)", now = /* @__PURE__ */ new Date()) {
  const appointment = appointmentsTable.getById(appointmentId);
  if (!appointment) throw new ApiError(404, "NOT_FOUND", "Verification call not found.");
  let updated = {
    ...appointment,
    status: outcome,
    officerName,
    completedAt: now.toISOString(),
    outcomeNote: outcome === "completed" ? {
      en: "I have seen you on the call and confirmed your documents. Your life certificate can now be issued.",
      hi: "\u092E\u0948\u0902\u0928\u0947 \u0906\u092A\u0915\u094B \u0915\u0949\u0932 \u092A\u0930 \u0926\u0947\u0916\u093E \u0914\u0930 \u0906\u092A\u0915\u0947 \u0926\u0938\u094D\u0924\u093E\u0935\u0947\u091C\u093C\u094B\u0902 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0940\u0964 \u0905\u092C \u0906\u092A\u0915\u093E \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u091C\u093E\u0930\u0940 \u0915\u093F\u092F\u093E \u091C\u093E \u0938\u0915\u0924\u093E \u0939\u0948\u0964"
    } : outcome === "no_show" ? {
      en: "You did not join this call. You can book another slot whenever you are ready.",
      hi: "\u0906\u092A \u0907\u0938 \u0915\u0949\u0932 \u092E\u0947\u0902 \u0936\u093E\u092E\u093F\u0932 \u0928\u0939\u0940\u0902 \u0939\u0941\u090F\u0964 \u0906\u092A \u091C\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u094B\u0902, \u0926\u0942\u0938\u0930\u093E \u0938\u092E\u092F \u092C\u0941\u0915 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
    } : {
      en: "We could not complete the verification on this call. Please book another slot, and keep your Aadhaar card with you.",
      hi: "\u0939\u092E \u0907\u0938 \u0915\u0949\u0932 \u092A\u0930 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u092A\u0942\u0930\u093E \u0928\u0939\u0940\u0902 \u0915\u0930 \u0938\u0915\u0947\u0964 \u0915\u0943\u092A\u092F\u093E \u0926\u0942\u0938\u0930\u093E \u0938\u092E\u092F \u092C\u0941\u0915 \u0915\u0930\u0947\u0902 \u0914\u0930 \u0905\u092A\u0928\u093E \u0906\u0927\u093E\u0930 \u0915\u093E\u0930\u094D\u0921 \u0938\u093E\u0925 \u0930\u0916\u0947\u0902\u0964"
    }
  };
  if (outcome === "completed" && session) {
    const presence = appointment.integrity?.livePresenceScore ?? 0.7;
    const { event } = recordSignalEvent({
      session,
      signal: "video_verification",
      similarity: Math.max(0.75, Math.min(0.98, 0.75 + presence * 0.23)),
      raw: {
        channel: "scheduled_call",
        officerConfirmed: true,
        livePresenceScore: presence,
        integrityFlags: appointment.integrity?.flags.join(",") || "none",
        checksPassed: appointment.checks.filter((c) => c.status === "passed").length
      }
    });
    updated = { ...updated, id: appointment.id };
  }
  appointmentsTable.update(appointment.id, updated);
  return updated;
}
function hasCompletedCall(userId, sessionId) {
  return appointmentsForUser(userId).some(
    (a) => a.sessionId === sessionId && a.status === "completed"
  );
}
function activeAppointment(userId) {
  return appointmentsForUser(userId).find((a) => a.status === "scheduled" || a.status === "in_call") ?? null;
}

// apps/api/src/services/status.ts
function fmt(date, locale) {
  return new Date(date).toLocaleDateString(locale, { day: "numeric", month: "long", year: "numeric" });
}
function computeVerificationStatus(user, now = /* @__PURE__ */ new Date()) {
  const session = findActiveSessionForUser(user.id);
  const certificates = certificatesForUser(user.id);
  const latest = certificates[0] ?? null;
  const liveCertificate = latest && latest.status === "active" && new Date(latest.validUntil) > now ? latest : null;
  const reviews = reviewsForUser(user.id);
  const openReview = reviews.find(isAssistedReviewOpen) ?? null;
  const lastReview = reviews[0] ?? null;
  const appointment = activeAppointment(user.id);
  const score = session?.currentScore ?? liveCertificate?.confidenceScore ?? 0;
  const tier = resolveTier(score).tier;
  const base = {
    score,
    tier,
    sessionId: session?.id ?? null,
    certificateId: liveCertificate?.id ?? latest?.id ?? null,
    openReviewTicket: openReview?.ticketNumber ?? null,
    appointmentId: appointment?.id ?? null,
    updatedAt: now.toISOString()
  };
  const callDone = session ? hasCompletedCall(user.id, session.id) : false;
  const callRequired = !!session && !callDone && resolveTier(score).issuesCertificate;
  if (user.pension.status === "not_eligible") {
    return {
      ...base,
      status: "not_required",
      callRequired: false,
      waitingOn: null,
      headline: {
        en: "No life certificate is needed for this Aadhaar number",
        hi: "\u0907\u0938 \u0906\u0927\u093E\u0930 \u0938\u0902\u0916\u094D\u092F\u093E \u0915\u0947 \u0932\u093F\u090F \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0906\u0935\u0936\u094D\u092F\u0915 \u0928\u0939\u0940\u0902 \u0939\u0948"
      },
      detail: user.pension.ineligibleReason ?? {
        en: "You are not currently drawing a pension.",
        hi: "\u0906\u092A \u0935\u0930\u094D\u0924\u092E\u093E\u0928 \u092E\u0947\u0902 \u092A\u0947\u0902\u0936\u0928 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0928\u0939\u0940\u0902 \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964"
      },
      nextStep: null
    };
  }
  if (openReview) {
    return {
      ...base,
      status: "awaiting_review",
      callRequired,
      waitingOn: "assisted_review",
      headline: {
        en: `Your request ${openReview.ticketNumber} is with our team`,
        hi: `\u0906\u092A\u0915\u093E \u0905\u0928\u0941\u0930\u094B\u0927 ${openReview.ticketNumber} \u0939\u092E\u093E\u0930\u0940 \u091F\u0940\u092E \u0915\u0947 \u092A\u093E\u0938 \u0939\u0948`
      },
      detail: {
        en: `A verification officer will review your details and get back to you by ${fmt(openReview.slaDueAt, "en-IN")}. Nobody is reviewing it at this exact moment \u2014 you do not need to stay on this page.`,
        hi: `\u090F\u0915 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0906\u092A\u0915\u0947 \u0935\u093F\u0935\u0930\u0923 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0947\u0902\u0917\u0947 \u0914\u0930 ${fmt(openReview.slaDueAt, "hi-IN")} \u0924\u0915 \u0906\u092A\u0938\u0947 \u0938\u0902\u092A\u0930\u094D\u0915 \u0915\u0930\u0947\u0902\u0917\u0947\u0964 \u0907\u0938 \u0938\u092E\u092F \u0915\u094B\u0908 \u0907\u0938\u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0928\u0939\u0940\u0902 \u0915\u0930 \u0930\u0939\u093E \u0939\u0948 \u2014 \u0906\u092A\u0915\u094B \u0907\u0938 \u092A\u0943\u0937\u094D\u0920 \u092A\u0930 \u0930\u0941\u0915\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0928\u0939\u0940\u0902 \u0939\u0948\u0964`
      },
      nextStep: openReview.status === "more_info_needed" ? {
        en: "The officer has asked you for one more thing. Open your request to see what is needed.",
        hi: "\u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0928\u0947 \u0906\u092A\u0938\u0947 \u090F\u0915 \u0914\u0930 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u092E\u093E\u0901\u0917\u0940 \u0939\u0948\u0964 \u0926\u0947\u0916\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0905\u092A\u0928\u093E \u0905\u0928\u0941\u0930\u094B\u0927 \u0916\u094B\u0932\u0947\u0902\u0964"
      } : null
    };
  }
  if (appointment) {
    return {
      ...base,
      status: "awaiting_call",
      callRequired: true,
      waitingOn: "verification_call",
      headline: {
        en: `Verification call booked for ${fmt(appointment.slotStart, "en-IN")}`,
        hi: `${fmt(appointment.slotStart, "hi-IN")} \u0915\u0947 \u0932\u093F\u090F \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0915\u0949\u0932 \u092C\u0941\u0915 \u0939\u0948`
      },
      detail: {
        en: "This call is the last step. Once the officer confirms it is you, your life certificate is issued and your pension continues.",
        hi: "\u092F\u0939 \u0915\u0949\u0932 \u0905\u0902\u0924\u093F\u092E \u091A\u0930\u0923 \u0939\u0948\u0964 \u091C\u0948\u0938\u0947 \u0939\u0940 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0924\u0947 \u0939\u0948\u0902 \u0915\u093F \u092F\u0939 \u0906\u092A \u0939\u0948\u0902, \u0906\u092A\u0915\u093E \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u091C\u093E\u0930\u0940 \u0939\u094B \u091C\u093E\u0924\u093E \u0939\u0948 \u0914\u0930 \u0906\u092A\u0915\u0940 \u092A\u0947\u0902\u0936\u0928 \u091C\u093E\u0930\u0940 \u0930\u0939\u0924\u0940 \u0939\u0948\u0964"
      },
      nextStep: {
        en: "Keep your Aadhaar card with you and join the call at the booked time.",
        hi: "\u0905\u092A\u0928\u093E \u0906\u0927\u093E\u0930 \u0915\u093E\u0930\u094D\u0921 \u0938\u093E\u0925 \u0930\u0916\u0947\u0902 \u0914\u0930 \u092C\u0941\u0915 \u0915\u093F\u090F \u0917\u090F \u0938\u092E\u092F \u092A\u0930 \u0915\u0949\u0932 \u092E\u0947\u0902 \u0936\u093E\u092E\u093F\u0932 \u0939\u094B\u0902\u0964"
      }
    };
  }
  if (lastReview?.status === "rejected" && !liveCertificate) {
    return {
      ...base,
      status: "rejected",
      callRequired,
      waitingOn: null,
      headline: {
        en: "We could not confirm your identity from your last request",
        hi: "\u0906\u092A\u0915\u0947 \u092A\u093F\u091B\u0932\u0947 \u0905\u0928\u0941\u0930\u094B\u0927 \u0938\u0947 \u0939\u092E \u0906\u092A\u0915\u0940 \u092A\u0939\u091A\u093E\u0928 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0928\u0939\u0940\u0902 \u0915\u0930 \u0938\u0915\u0947"
      },
      detail: lastReview.decisionNote ?? {
        en: "A verification officer reviewed your request and could not confirm it from the information available.",
        hi: "\u090F\u0915 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0928\u0947 \u0906\u092A\u0915\u0947 \u0905\u0928\u0941\u0930\u094B\u0927 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0940 \u0914\u0930 \u0909\u092A\u0932\u092C\u094D\u0927 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0938\u0947 \u092A\u0941\u0937\u094D\u091F\u093F \u0928\u0939\u0940\u0902 \u0915\u0930 \u0938\u0915\u0947\u0964"
      },
      nextStep: {
        en: "Book a verification call \u2014 an officer can confirm your identity with you directly.",
        hi: "\u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0915\u0949\u0932 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902 \u2014 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0938\u0940\u0927\u0947 \u0906\u092A\u0915\u0947 \u0938\u093E\u0925 \u0906\u092A\u0915\u0940 \u092A\u0939\u091A\u093E\u0928 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
      }
    };
  }
  if (liveCertificate) {
    const dueSoon = new Date(liveCertificate.validUntil).getTime() - now.getTime() < 30 * 24 * 60 * 60 * 1e3;
    return {
      ...base,
      status: "completed",
      callRequired: false,
      waitingOn: null,
      certificateId: liveCertificate.id,
      headline: {
        en: dueSoon ? "Your certificate expires soon" : "Your life certificate is active",
        hi: dueSoon ? "\u0906\u092A\u0915\u093E \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u091C\u0932\u094D\u0926 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B \u0930\u0939\u093E \u0939\u0948" : "\u0906\u092A\u0915\u093E \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948"
      },
      detail: {
        en: `Valid until ${fmt(liveCertificate.validUntil, "en-IN")}. Your pension continues without interruption.`,
        hi: `${fmt(liveCertificate.validUntil, "hi-IN")} \u0924\u0915 \u092E\u093E\u0928\u094D\u092F\u0964 \u0906\u092A\u0915\u0940 \u092A\u0947\u0902\u0936\u0928 \u092C\u093F\u0928\u093E \u0930\u0941\u0915\u093E\u0935\u091F \u091C\u093E\u0930\u0940 \u0930\u0939\u0947\u0917\u0940\u0964`
      },
      nextStep: dueSoon ? {
        en: "You can renew now \u2014 it takes a few minutes and there is no need to wait for the last day.",
        hi: "\u0906\u092A \u0905\u092D\u0940 \u0928\u0935\u0940\u0928\u0940\u0915\u0930\u0923 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902 \u2014 \u0907\u0938\u092E\u0947\u0902 \u0915\u0941\u091B \u092E\u093F\u0928\u091F \u0932\u0917\u0924\u0947 \u0939\u0948\u0902, \u0905\u0902\u0924\u093F\u092E \u0926\u093F\u0928 \u0924\u0915 \u092A\u094D\u0930\u0924\u0940\u0915\u094D\u0937\u093E \u0915\u0930\u0928\u0947 \u0915\u0940 \u0906\u0935\u0936\u094D\u092F\u0915\u0924\u093E \u0928\u0939\u0940\u0902\u0964"
      } : null
    };
  }
  if (user.pension.status === "stopped" || latest && latest.status === "expired") {
    return {
      ...base,
      status: "expired",
      callRequired,
      waitingOn: null,
      headline: {
        en: user.pension.monthsUnpaid > 0 ? `Your pension has been on hold for ${user.pension.monthsUnpaid} month${user.pension.monthsUnpaid === 1 ? "" : "s"}` : "Your life certificate has expired",
        hi: user.pension.monthsUnpaid > 0 ? `\u0906\u092A\u0915\u0940 \u092A\u0947\u0902\u0936\u0928 ${user.pension.monthsUnpaid} \u092E\u093E\u0939 \u0938\u0947 \u0930\u094B\u0915\u0940 \u0917\u0908 \u0939\u0948` : "\u0906\u092A\u0915\u093E \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0938\u092E\u093E\u092A\u094D\u0924 \u0939\u094B \u0917\u092F\u093E \u0939\u0948"
      },
      detail: {
        en: "Completing your verification releases the withheld payments and restarts your monthly pension.",
        hi: "\u0905\u092A\u0928\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u092A\u0942\u0930\u093E \u0915\u0930\u0928\u0947 \u092A\u0930 \u0930\u094B\u0915\u0940 \u0917\u0908 \u0930\u093E\u0936\u093F \u091C\u093E\u0930\u0940 \u0939\u094B \u091C\u093E\u090F\u0917\u0940 \u0914\u0930 \u092E\u093E\u0938\u093F\u0915 \u092A\u0947\u0902\u0936\u0928 \u092B\u093F\u0930 \u0936\u0941\u0930\u0942 \u0939\u094B \u091C\u093E\u090F\u0917\u0940\u0964"
      },
      nextStep: {
        en: "Start your verification \u2014 most people finish in under five minutes.",
        hi: "\u0905\u092A\u0928\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902 \u2014 \u0905\u0927\u093F\u0915\u093E\u0902\u0936 \u0932\u094B\u0917 \u092A\u093E\u0901\u091A \u092E\u093F\u0928\u091F \u0938\u0947 \u0915\u092E \u092E\u0947\u0902 \u092A\u0942\u0930\u093E \u0915\u0930 \u0932\u0947\u0924\u0947 \u0939\u0948\u0902\u0964"
      }
    };
  }
  if (session && score > 0) {
    return {
      ...base,
      status: "in_progress",
      callRequired,
      waitingOn: null,
      headline: {
        en: "Your verification is in progress",
        hi: "\u0906\u092A\u0915\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u091C\u093E\u0930\u0940 \u0939\u0948"
      },
      detail: {
        en: `You are at ${Math.round(score)}% confidence. Each step you complete adds to it, and you can stop and come back at any time.`,
        hi: `\u0906\u092A ${Math.round(score)}% \u0935\u093F\u0936\u094D\u0935\u093E\u0938 \u092A\u0930 \u0939\u0948\u0902\u0964 \u0939\u0930 \u092A\u0942\u0930\u093E \u0915\u093F\u092F\u093E \u0917\u092F\u093E \u091A\u0930\u0923 \u0907\u0938\u092E\u0947\u0902 \u091C\u0941\u0921\u093C\u0924\u093E \u0939\u0948, \u0914\u0930 \u0906\u092A \u0915\u092D\u0940 \u092D\u0940 \u0930\u0941\u0915\u0915\u0930 \u0935\u093E\u092A\u0938 \u0906 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964`
      },
      nextStep: callRequired ? {
        en: "Book your verification call \u2014 it is the last step before your certificate is issued.",
        hi: "\u0905\u092A\u0928\u0940 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0915\u0949\u0932 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902 \u2014 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u091C\u093E\u0930\u0940 \u0939\u094B\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u092F\u0939 \u0905\u0902\u0924\u093F\u092E \u091A\u0930\u0923 \u0939\u0948\u0964"
      } : {
        en: "Continue with the next suggested step.",
        hi: "\u0905\u0917\u0932\u0947 \u0938\u0941\u091D\u093E\u090F \u0917\u090F \u091A\u0930\u0923 \u0915\u0947 \u0938\u093E\u0925 \u091C\u093E\u0930\u0940 \u0930\u0916\u0947\u0902\u0964"
      }
    };
  }
  return {
    ...base,
    status: "not_started",
    callRequired: false,
    waitingOn: null,
    headline: {
      en: "You have not started your life certificate yet",
      hi: "\u0906\u092A\u0928\u0947 \u0905\u092D\u0940 \u0924\u0915 \u0905\u092A\u0928\u093E \u091C\u0940\u0935\u0928 \u092A\u094D\u0930\u092E\u093E\u0923 \u092A\u0924\u094D\u0930 \u0936\u0941\u0930\u0942 \u0928\u0939\u0940\u0902 \u0915\u093F\u092F\u093E \u0939\u0948"
    },
    detail: {
      en: user.pension.nextRenewalDueAt ? `Your next renewal is due by ${fmt(user.pension.nextRenewalDueAt, "en-IN")}.` : "You can complete it from home whenever you are ready.",
      hi: user.pension.nextRenewalDueAt ? `\u0906\u092A\u0915\u093E \u0905\u0917\u0932\u093E \u0928\u0935\u0940\u0928\u0940\u0915\u0930\u0923 ${fmt(user.pension.nextRenewalDueAt, "hi-IN")} \u0924\u0915 \u0926\u0947\u092F \u0939\u0948\u0964` : "\u0906\u092A \u091C\u092C \u0924\u0948\u092F\u093E\u0930 \u0939\u094B\u0902, \u0907\u0938\u0947 \u0918\u0930 \u0938\u0947 \u092A\u0942\u0930\u093E \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902\u0964"
    },
    nextStep: {
      en: "Start your verification \u2014 it takes a few minutes.",
      hi: "\u0905\u092A\u0928\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0936\u0941\u0930\u0942 \u0915\u0930\u0947\u0902 \u2014 \u0907\u0938\u092E\u0947\u0902 \u0915\u0941\u091B \u092E\u093F\u0928\u091F \u0932\u0917\u0924\u0947 \u0939\u0948\u0902\u0964"
    }
  };
}

// apps/api/src/services/assistedReview.ts
var DAY_MS2 = 24 * 60 * 60 * 1e3;
function ticket() {
  return `AR-${nanoid(6).toUpperCase()}`;
}
function checkEligibility(userId, now = /* @__PURE__ */ new Date()) {
  const all = reviewsForUser(userId);
  const open = all.find(isAssistedReviewOpen) ?? null;
  if (open) {
    return {
      canRequest: false,
      reason: "already_open",
      openRequest: open,
      nextAllowedAt: open.nextRequestAllowedAt,
      cooldownDays: ASSISTED_REVIEW_COOLDOWN_DAYS
    };
  }
  const latest = all[0] ?? null;
  if (latest && new Date(latest.nextRequestAllowedAt) > now) {
    return {
      canRequest: false,
      reason: "cooldown",
      openRequest: null,
      nextAllowedAt: latest.nextRequestAllowedAt,
      cooldownDays: ASSISTED_REVIEW_COOLDOWN_DAYS
    };
  }
  return {
    canRequest: true,
    reason: "ok",
    openRequest: null,
    nextAllowedAt: null,
    cooldownDays: ASSISTED_REVIEW_COOLDOWN_DAYS
  };
}
function createReview(session, message, now = /* @__PURE__ */ new Date()) {
  const eligibility = checkEligibility(session.userId, now);
  if (!eligibility.canRequest) {
    const when = eligibility.nextAllowedAt ? new Date(eligibility.nextAllowedAt).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }) : "later";
    throw new ApiError(
      409,
      eligibility.reason === "already_open" ? "REVIEW_ALREADY_OPEN" : "REVIEW_COOLDOWN",
      eligibility.reason === "already_open" ? `You already have a review request open (${eligibility.openRequest?.ticketNumber}). Our team will get back to you on it \u2014 you can follow its progress on this page.` : `You can raise another review request from ${when}. Requests are spaced ${ASSISTED_REVIEW_COOLDOWN_DAYS} days apart so the team can work through them properly.`
    );
  }
  const request = {
    id: `rev_${nanoid(10)}`,
    ticketNumber: ticket(),
    userId: session.userId,
    sessionId: session.id,
    status: "submitted",
    reason: "Pensioner requested assisted human review",
    message: message?.trim() ? message.trim() : null,
    submittedAt: now.toISOString(),
    updatedAt: now.toISOString(),
    slaDueAt: new Date(now.getTime() + ASSISTED_REVIEW_SLA_DAYS * DAY_MS2).toISOString(),
    nextRequestAllowedAt: new Date(now.getTime() + ASSISTED_REVIEW_COOLDOWN_DAYS * DAY_MS2).toISOString(),
    reviewerName: null,
    decisionNote: null,
    decidedAt: null,
    notes: [
      {
        at: now.toISOString(),
        author: "system",
        body: {
          en: "Request received. It is in the queue for a verification officer to pick up.",
          hi: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0939\u0941\u0906\u0964 \u092F\u0939 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0926\u094D\u0935\u093E\u0930\u093E \u0909\u0920\u093E\u090F \u091C\u093E\u0928\u0947 \u0915\u0940 \u0915\u0924\u093E\u0930 \u092E\u0947\u0902 \u0939\u0948\u0964"
        }
      }
    ]
  };
  insertAssistedReview(request);
  return request;
}
function getReview(userId, reviewId) {
  const review = assistedReviewsTable.getById(reviewId);
  if (!review || review.userId !== userId) {
    throw new ApiError(404, "NOT_FOUND", "We could not find that review request.");
  }
  return review;
}
function cancelReview(userId, reviewId, now = /* @__PURE__ */ new Date()) {
  const review = getReview(userId, reviewId);
  if (!isAssistedReviewOpen(review)) {
    throw new ApiError(409, "REVIEW_CLOSED", "That request has already been closed.");
  }
  const updated = {
    ...review,
    status: "cancelled",
    updatedAt: now.toISOString(),
    notes: [
      ...review.notes,
      {
        at: now.toISOString(),
        author: "pensioner",
        body: { en: "Request withdrawn by the pensioner.", hi: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092A\u0947\u0902\u0936\u0928\u092D\u094B\u0917\u0940 \u0926\u094D\u0935\u093E\u0930\u093E \u0935\u093E\u092A\u0938 \u0932\u093F\u092F\u093E \u0917\u092F\u093E\u0964" }
      }
    ]
  };
  assistedReviewsTable.update(review.id, updated);
  return updated;
}
function applyReviewerDecision(reviewId, status, reviewerName, note, session, now = /* @__PURE__ */ new Date()) {
  const review = assistedReviewsTable.getById(reviewId);
  if (!review) throw new ApiError(404, "NOT_FOUND", "Review request not found.");
  let updated = {
    ...review,
    status,
    reviewerName,
    updatedAt: now.toISOString(),
    decisionNote: note ?? review.decisionNote,
    decidedAt: status === "approved" || status === "rejected" ? now.toISOString() : review.decidedAt,
    notes: [
      ...review.notes,
      {
        at: now.toISOString(),
        author: "reviewer",
        body: note ?? DEFAULT_NOTES[status]
      }
    ]
  };
  if (status === "approved" && session) {
    const { event } = recordSignalEvent({
      session,
      signal: "manual_review",
      similarity: 0.95,
      raw: { officerDecision: "approved", channel: "assisted_review", ticket: review.ticketNumber }
    });
    updated = {
      ...updated,
      notes: [
        ...updated.notes,
        {
          at: now.toISOString(),
          author: "system",
          body: {
            en: `Confidence updated following the officer's decision (event ${event.id}).`,
            hi: `\u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0915\u0947 \u0928\u093F\u0930\u094D\u0923\u092F \u0915\u0947 \u092C\u093E\u0926 \u0935\u093F\u0936\u094D\u0935\u093E\u0938 \u0938\u094D\u0915\u094B\u0930 \u0905\u0926\u094D\u092F\u0924\u0928 \u0915\u093F\u092F\u093E \u0917\u092F\u093E (\u0918\u091F\u0928\u093E ${event.id})\u0964`
          }
        }
      ]
    };
  }
  assistedReviewsTable.update(review.id, updated);
  return updated;
}
var DEFAULT_NOTES = {
  submitted: {
    en: "Request received and queued.",
    hi: "\u0905\u0928\u0941\u0930\u094B\u0927 \u092A\u094D\u0930\u093E\u092A\u094D\u0924 \u0914\u0930 \u0915\u0924\u093E\u0930\u092C\u0926\u094D\u0927\u0964"
  },
  in_review: {
    en: "A verification officer has picked up your request and is looking at it.",
    hi: "\u090F\u0915 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0928\u0947 \u0906\u092A\u0915\u093E \u0905\u0928\u0941\u0930\u094B\u0927 \u0932\u093F\u092F\u093E \u0939\u0948 \u0914\u0930 \u0909\u0938\u0915\u0940 \u091C\u093E\u0901\u091A \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902\u0964"
  },
  approved: {
    en: "Your identity has been confirmed by a verification officer.",
    hi: "\u0906\u092A\u0915\u0940 \u092A\u0939\u091A\u093E\u0928 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0926\u094D\u0935\u093E\u0930\u093E \u092A\u0941\u0937\u094D\u091F \u0915\u0930 \u0926\u0940 \u0917\u0908 \u0939\u0948\u0964"
  },
  rejected: {
    en: "We could not confirm your identity from what was submitted. Please book a verification call so we can help you directly.",
    hi: "\u092A\u094D\u0930\u0938\u094D\u0924\u0941\u0924 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0938\u0947 \u0939\u092E \u0906\u092A\u0915\u0940 \u092A\u0939\u091A\u093E\u0928 \u0915\u0940 \u092A\u0941\u0937\u094D\u091F\u093F \u0928\u0939\u0940\u0902 \u0915\u0930 \u0938\u0915\u0947\u0964 \u0915\u0943\u092A\u092F\u093E \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0915\u0949\u0932 \u092C\u0941\u0915 \u0915\u0930\u0947\u0902 \u0924\u093E\u0915\u093F \u0939\u092E \u0938\u0940\u0927\u0947 \u0906\u092A\u0915\u0940 \u0938\u0939\u093E\u092F\u0924\u093E \u0915\u0930 \u0938\u0915\u0947\u0902\u0964"
  },
  more_info_needed: {
    en: "The officer needs one more thing from you before they can decide.",
    hi: "\u0928\u093F\u0930\u094D\u0923\u092F \u0932\u0947\u0928\u0947 \u0938\u0947 \u092A\u0939\u0932\u0947 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0915\u094B \u0906\u092A\u0938\u0947 \u090F\u0915 \u0914\u0930 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u091A\u093E\u0939\u093F\u090F\u0964"
  },
  cancelled: {
    en: "Request withdrawn.",
    hi: "\u0905\u0928\u0941\u0930\u094B\u0927 \u0935\u093E\u092A\u0938 \u0932\u093F\u092F\u093E \u0917\u092F\u093E\u0964"
  }
};

// apps/api/src/routes/status.ts
var statusRoutes = new Hono2();
statusRoutes.use("*", requireAuth);
statusRoutes.get("/", async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  return c.json({
    status: computeVerificationStatus(user),
    reviewEligibility: checkEligibility(userId),
    appointment: activeAppointment(userId)
  });
});

// apps/api/src/routes/family.ts
var familyRoutes = new Hono2();
function loadRequest(token) {
  const request = findFamilyConfirmationByToken(token);
  if (!request) throw new ApiError(404, "NOT_FOUND", "This confirmation link is invalid or has expired.");
  return request;
}
familyRoutes.get("/confirmations/:token", async (c) => {
  const request = loadRequest(c.req.param("token"));
  const user = usersTable.getById(request.userId);
  const contact = familyContactsTable.getById(request.familyContactId);
  if (!user || !contact) throw new ApiError(404, "NOT_FOUND", "This confirmation link is invalid or has expired.");
  return c.json({
    request,
    pensioner: { name: user.name, photoInitials: user.photoInitials, district: user.address.district },
    // Both names come from the Aadhaar record, so both are bilingual.
    contact: { name: contact.name, relation: contact.relation, maskedUid: contact.maskedUid },
    expired: new Date(request.expiresAt) < /* @__PURE__ */ new Date() || request.status !== "pending"
  });
});
familyRoutes.post(
  "/confirmations/:token/respond",
  zValidator("json", respondFamilyConfirmationSchema),
  async (c) => {
    const request = loadRequest(c.req.param("token"));
    if (request.status !== "pending") {
      throw new ApiError(409, "ALREADY_RESPONDED", "This request has already been responded to.");
    }
    if (new Date(request.expiresAt) < /* @__PURE__ */ new Date()) {
      throw new ApiError(410, "EXPIRED", "This confirmation link has expired.");
    }
    const { action } = c.req.valid("json");
    const session = sessionsTable.getById(request.sessionId);
    if (!session) throw new ApiError(404, "SESSION_NOT_FOUND", "The related verification session was not found.");
    if (action === "decline") {
      const updated2 = { ...request, status: "declined", respondedAt: (/* @__PURE__ */ new Date()).toISOString() };
      familyConfirmationsTable.update(request.id, updated2);
      return c.json({ request: updated2 });
    }
    const { event } = recordSignalEvent({
      session,
      signal: "family_confirmation",
      similarity: 0.95,
      raw: { familyContactId: request.familyContactId }
    });
    const updated = {
      ...request,
      status: "confirmed",
      respondedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    familyConfirmationsTable.update(request.id, updated);
    return c.json({ request: updated, event });
  }
);

// apps/api/src/routes/certificates.ts
init_zod();

// apps/api/src/services/certificates.ts
function issueCertificateForSession(session, user) {
  if (user.pension.status === "not_eligible") {
    throw new ApiError(
      409,
      "NOT_ELIGIBLE",
      "No pension account is linked to this Aadhaar number, so no life certificate is required."
    );
  }
  const tierDef = resolveTier(session.currentScore);
  if (!tierDef.issuesCertificate) {
    throw new ApiError(
      409,
      "NOT_ELIGIBLE_YET",
      "Your confidence score isn't high enough yet to issue a certificate. Keep going \u2014 you're building toward it."
    );
  }
  const callDone = hasCompletedCall(user.id, session.id);
  const kind = tierDef.tier === "verified" && callDone ? "full" : "provisional";
  const validityDays = kind === "full" ? 365 : 30;
  const now = /* @__PURE__ */ new Date();
  const validUntil = new Date(now.getTime() + validityDays * 24 * 60 * 60 * 1e3);
  const certificate = {
    id: `cert_${nanoid(8)}`,
    userId: user.id,
    sessionId: session.id,
    kind,
    certificateNumber: `JS-${now.getFullYear()}-${nanoid(6).toUpperCase()}`,
    verificationCode: nanoid(10).toUpperCase(),
    confidenceScore: session.currentScore,
    tier: tierDef.tier,
    signalsUsed: session.completedSignals,
    issuedAt: now.toISOString(),
    validFrom: now.toISOString(),
    validUntil: validUntil.toISOString(),
    status: "active",
    aiSummary: null
  };
  insertCertificate(certificate);
  const updatedSession = kind === "full" ? { ...session, status: "completed", completedAt: now.toISOString(), certificateId: certificate.id } : { ...session, certificateId: certificate.id };
  sessionsTable.update(session.id, updatedSession);
  return certificate;
}

// apps/api/src/services/pdf.ts
var import_qrcode = __toESM(require_lib(), 1);
init_env();
import PDFDocument from "pdfkit";
var INK = "#1A1A1A";
var MUTED = "#5B6B66";
var BRAND2 = "#1E5F4A";
var RULE = "#D5E2DC";
function certificateVerifyUrl(certificate) {
  return `${env.PUBLIC_BASE_URL}/check/${certificate.verificationCode}`;
}
function certificateFileName(certificate, user) {
  const slug = user.name.en.normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/\s+/g, "-");
  const issued = new Date(certificate.issuedAt).toISOString().slice(0, 10);
  return `${slug}-life-certificate-${issued}.pdf`;
}
async function renderCertificatePdf(certificate, user) {
  const verifyUrl = certificateVerifyUrl(certificate);
  const qrDataUrl = await import_qrcode.default.toDataURL(verifyUrl, { margin: 1, width: 320 });
  const qrBuffer = Buffer.from(qrDataUrl.split(",")[1] ?? "", "base64");
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ size: "A4", margin: 56 });
    const chunks = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);
    doc.rect(0, 0, doc.page.width, 128).fill(BRAND2);
    doc.fillColor("#FFFFFF").fontSize(22).text("JeevanSetu \u2014 Digital Life Certificate", 56, 42, { width: 420 });
    doc.fontSize(10).fillColor("#D8ECE3").text("Demo prototype \u2014 not a government-issued document", 56, 74, { width: 420 });
    doc.fontSize(10).fillColor("#D8ECE3").text(certificate.kind === "full" ? "Full certificate \xB7 valid 12 months" : "Provisional certificate \xB7 valid 30 days", 56, 92, {
      width: 420
    });
    const colX = 372;
    const colWidth = 168;
    let vy = 158;
    doc.fontSize(8).fillColor(MUTED).text("VERIFICATION CODE", colX, vy, { width: colWidth, align: "center" });
    vy += 12;
    doc.fontSize(15).fillColor(INK).text(certificate.verificationCode, colX, vy, { width: colWidth, align: "center", characterSpacing: 1.5 });
    vy += 24;
    doc.image(qrBuffer, colX + (colWidth - 132) / 2, vy, { width: 132 });
    vy += 142;
    doc.fontSize(8).fillColor(MUTED).text("Verify this certificate at", colX, vy, { width: colWidth, align: "center" });
    vy += 11;
    doc.fontSize(8).fillColor(BRAND2).text(verifyUrl, colX, vy, { width: colWidth, align: "center", link: verifyUrl, underline: false });
    let y = 158;
    const labelled = (label, value) => {
      doc.fontSize(8).fillColor(MUTED).text(label.toUpperCase(), 56, y, { width: 290 });
      y += 12;
      doc.fontSize(12).fillColor(INK).text(value, 56, y, { width: 290 });
      y += 22;
    };
    labelled("Certificate number", certificate.certificateNumber);
    labelled("Issued to", user.name.en);
    labelled("Aadhaar number", user.maskedAadhaar);
    labelled("Passbook number", user.pension.passbookNumber);
    labelled("Date of birth", new Date(user.dob).toLocaleDateString("en-IN"));
    labelled("Pension disbursing agency", user.pension.disbursingAgency);
    labelled("Bank account", user.bank.maskedAccount);
    y += 6;
    doc.moveTo(56, y).lineTo(346, y).strokeColor(RULE).stroke();
    y += 16;
    labelled("Issued on", new Date(certificate.issuedAt).toLocaleDateString("en-IN"));
    labelled("Valid until", new Date(certificate.validUntil).toLocaleDateString("en-IN"));
    labelled(
      "Trust confidence score",
      `${certificate.confidenceScore}%  \xB7  ${certificate.tier.replace(/^\w/, (m) => m.toUpperCase())}`
    );
    y = Math.max(y, 560);
    doc.moveTo(56, y).lineTo(doc.page.width - 56, y).strokeColor(RULE).stroke();
    y += 16;
    doc.fontSize(8).fillColor(MUTED).text("HOW THIS IDENTITY WAS CONFIRMED", 56, y, { width: 480 });
    y += 13;
    doc.fontSize(10).fillColor(INK).text(certificate.signalsUsed.map(readableSignal).join(" \xB7 "), 56, y, { width: 480 });
    doc.fontSize(8).fillColor("#8A9A95").text(
      "This is a demonstration certificate generated by a hackathon prototype. No government system was involved in its issuance, and it confers no entitlement. Personal details shown here were read from a mocked Aadhaar service with the holder's consent.",
      56,
      752,
      { width: doc.page.width - 112 }
    );
    doc.end();
  });
}
function readableSignal(signal) {
  return signal.split("_").map((w) => w.replace(/^\w/, (m) => m.toUpperCase())).join(" ");
}

// apps/api/src/routes/certificates.ts
var certificateRoutes = new Hono2();
var issueSchema = external_exports.object({ sessionId: external_exports.string() });
function certificateView(certificate, user, full) {
  const expired = new Date(certificate.validUntil) < /* @__PURE__ */ new Date();
  const shared = {
    certificateNumber: certificate.certificateNumber,
    verificationCode: certificate.verificationCode,
    verifyUrl: certificateVerifyUrl(certificate),
    kind: certificate.kind,
    tier: certificate.tier,
    confidenceScore: certificate.confidenceScore,
    signalsUsed: certificate.signalsUsed,
    issuedAt: certificate.issuedAt,
    validFrom: certificate.validFrom,
    validUntil: certificate.validUntil,
    status: expired ? "expired" : certificate.status,
    valid: certificate.status === "active" && !expired
  };
  if (!full) {
    return {
      ...shared,
      redacted: true,
      holder: {
        name: { en: maskName(user.name.en), hi: maskName(user.name.hi) },
        maskedAadhaar: user.maskedAadhaar,
        district: user.address.district,
        state: user.address.state
      }
    };
  }
  return {
    ...shared,
    redacted: false,
    holder: {
      name: user.name,
      maskedAadhaar: user.maskedAadhaar,
      dob: user.dob,
      passbookNumber: user.pension.passbookNumber,
      disbursingAgency: user.pension.disbursingAgency,
      sanctioningAuthority: user.pension.sanctioningAuthority,
      maskedAccount: user.bank.maskedAccount,
      district: user.address.district,
      state: user.address.state
    }
  };
}
function maskName(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0];
  return [parts[0], ...parts.slice(1).map((p) => `${p[0]}.`)].join(" ");
}
certificateRoutes.post("/issue", requireAuth, zValidator("json", issueSchema), async (c) => {
  const userId = c.get("userId");
  const session = sessionsTable.getById(c.req.valid("json").sessionId);
  if (!session || session.userId !== userId) {
    throw new ApiError(404, "SESSION_NOT_FOUND", "Session not found.");
  }
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const certificate = issueCertificateForSession(session, user);
  return c.json({ certificate, view: certificateView(certificate, user, true) }, 201);
});
certificateRoutes.get("/:id", requireAuth, async (c) => {
  const certificate = certificatesTable.getById(c.req.param("id"));
  if (!certificate || certificate.userId !== c.get("userId")) {
    throw new ApiError(404, "NOT_FOUND", "Certificate not found.");
  }
  const user = usersTable.getById(certificate.userId);
  return c.json({ certificate, view: certificateView(certificate, user, true) });
});
certificateRoutes.get("/:id/download", requireAuth, async (c) => {
  const certificate = certificatesTable.getById(c.req.param("id"));
  if (!certificate || certificate.userId !== c.get("userId")) {
    throw new ApiError(404, "NOT_FOUND", "Certificate not found.");
  }
  const user = usersTable.getById(certificate.userId);
  const pdf = await renderCertificatePdf(certificate, user);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${certificateFileName(certificate, user)}"`,
      // Lets the browser read the filename back off a fetch()-driven download.
      "Access-Control-Expose-Headers": "Content-Disposition"
    }
  });
});
certificateRoutes.get("/verify/:code", async (c) => {
  const certificate = findCertificateByCode(c.req.param("code"));
  if (!certificate) {
    return c.json({ found: false, valid: false, reason: "not_found" }, 404);
  }
  const user = usersTable.getById(certificate.userId);
  if (!user) {
    return c.json({ found: false, valid: false, reason: "not_found" }, 404);
  }
  let isOwner = false;
  const header = c.req.header("authorization");
  if (header?.startsWith("Bearer ")) {
    try {
      isOwner = verifyAccessToken(header.slice(7)).sub === certificate.userId;
    } catch {
      isOwner = false;
    }
  }
  const view = certificateView(certificate, user, isOwner);
  return c.json({ found: true, valid: view.valid, isOwner, certificate: view });
});

// apps/api/src/routes/reviews.ts
var reviewRoutes = new Hono2();
reviewRoutes.use("*", requireAuth);
reviewRoutes.get("/", async (c) => {
  const userId = c.get("userId");
  return c.json({
    requests: reviewsForUser(userId),
    eligibility: checkEligibility(userId)
  });
});
reviewRoutes.get("/:id", async (c) => {
  return c.json({ request: getReview(c.get("userId"), c.req.param("id")) });
});
reviewRoutes.post("/", zValidator("json", createAssistedReviewSchema), async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const session = findActiveSessionForUser(userId) ?? startVerificationSession(user, c.req.header("x-device-fingerprint") ?? null);
  const request = createReview(session, c.req.valid("json").message ?? null);
  return c.json({ request, eligibility: checkEligibility(userId) }, 201);
});
reviewRoutes.post("/:id/cancel", async (c) => {
  const userId = c.get("userId");
  const request = cancelReview(userId, c.req.param("id"));
  return c.json({ request, eligibility: checkEligibility(userId) });
});
reviewRoutes.get("/:id/session", async (c) => {
  const review = getReview(c.get("userId"), c.req.param("id"));
  return c.json({ session: sessionsTable.getById(review.sessionId) });
});

// apps/api/src/routes/appointments.ts
init_zod();
var appointmentRoutes = new Hono2();
appointmentRoutes.use("*", requireAuth);
appointmentRoutes.get("/slots", async (c) => {
  return c.json({ slots: listSlots(c.get("userId")) });
});
appointmentRoutes.get("/", async (c) => {
  return c.json({ appointments: appointmentsForUser(c.get("userId")) });
});
appointmentRoutes.post("/", zValidator("json", scheduleAppointmentSchema), async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  if (user.pension.status === "not_eligible") {
    throw new ApiError(
      409,
      "NOT_ELIGIBLE",
      "No pension account is linked to this Aadhaar number, so no verification call is needed."
    );
  }
  const session = findActiveSessionForUser(userId) ?? startVerificationSession(user, c.req.header("x-device-fingerprint") ?? null);
  const appointment = scheduleAppointment(session, c.req.valid("json").slotStart);
  return c.json({ appointment }, 201);
});
appointmentRoutes.get("/:id", async (c) => {
  return c.json({ appointment: loadAppointment(c.get("userId"), c.req.param("id")) });
});
appointmentRoutes.post("/:id/cancel", async (c) => {
  return c.json({ appointment: cancelAppointment(c.get("userId"), c.req.param("id")) });
});
appointmentRoutes.post("/:id/join", async (c) => {
  const userId = c.get("userId");
  const appointment = joinAppointment(userId, c.req.param("id"));
  const user = usersTable.getById(userId);
  const phrases = VOICE_PHRASES[user?.locale ?? "en"];
  return c.json({
    appointment,
    /** The sentence the officer asks the pensioner to read during the call. */
    readPhrase: phrases[Math.floor(Math.random() * phrases.length)],
    officerScript: {
      greeting: {
        en: "Hello, thank you for joining. I will ask you to do a few short things so I can confirm it is really you.",
        hi: "\u0928\u092E\u0938\u094D\u0924\u0947, \u0936\u093E\u092E\u093F\u0932 \u0939\u094B\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0964 \u092E\u0948\u0902 \u0906\u092A\u0938\u0947 \u0915\u0941\u091B \u091B\u094B\u091F\u0947 \u0915\u093E\u0930\u094D\u092F \u0915\u0930\u093E\u090A\u0901\u0917\u093E \u0924\u093E\u0915\u093F \u092A\u0941\u0937\u094D\u091F\u093F \u0939\u094B \u0938\u0915\u0947 \u0915\u093F \u092F\u0939 \u0935\u093E\u0938\u094D\u0924\u0935 \u092E\u0947\u0902 \u0906\u092A \u0939\u0948\u0902\u0964"
      }
    }
  });
});
var checkSchema = external_exports.object({
  type: external_exports.enum(CALL_CHECK_TYPES),
  passed: external_exports.boolean(),
  note: external_exports.string().max(300).nullable().optional()
});
appointmentRoutes.post("/:id/checks", zValidator("json", checkSchema), async (c) => {
  const { type, passed, note } = c.req.valid("json");
  const appointment = resolveCheck(c.get("userId"), c.req.param("id"), type, passed, note ?? null);
  return c.json({ appointment });
});
appointmentRoutes.post(
  "/:id/submit",
  zValidator(
    "json",
    external_exports.object({ integrity: callIntegritySchema.omit({ livePresenceScore: true, flags: true }) })
  ),
  async (c) => {
    const appointment = submitCallEvidence(
      c.get("userId"),
      c.req.param("id"),
      c.req.valid("json").integrity
    );
    return c.json({
      appointment,
      awaitingOfficer: true,
      message: {
        en: "Thank you. The verification officer is reviewing what you showed on the call and will confirm shortly.",
        hi: "\u0927\u0928\u094D\u092F\u0935\u093E\u0926\u0964 \u0938\u0924\u094D\u092F\u093E\u092A\u0928 \u0905\u0927\u093F\u0915\u093E\u0930\u0940 \u0915\u0949\u0932 \u092A\u0930 \u0926\u093F\u0916\u093E\u0908 \u0917\u0908 \u091C\u093E\u0928\u0915\u093E\u0930\u0940 \u0915\u0940 \u0938\u092E\u0940\u0915\u094D\u0937\u093E \u0915\u0930 \u0930\u0939\u0947 \u0939\u0948\u0902 \u0914\u0930 \u0936\u0940\u0918\u094D\u0930 \u092A\u0941\u0937\u094D\u091F\u093F \u0915\u0930\u0947\u0902\u0917\u0947\u0964"
      }
    });
  }
);

// apps/api/src/routes/dev.ts
init_zod();

// apps/api/src/middleware/devOnly.ts
init_env();
async function devOnly(c, next2) {
  if (!env.ENABLE_DEV_TOOLS) {
    return c.json({ error: { code: "NOT_FOUND", message: "Not found" } }, 404);
  }
  await next2();
}

// apps/api/src/routes/dev.ts
var devRoutes = new Hono2();
devRoutes.use("*", devOnly);
devRoutes.get("/users", (c) => {
  const users = usersTable.all().map((u) => ({
    id: u.id,
    mobile: u.mobile,
    maskedAadhaar: u.maskedAadhaar,
    name: u.name,
    locale: u.locale,
    pensionStatus: u.pension.status,
    isDemo: u.isDemo
  }));
  return c.json({ users, personas: PERSONAS, demoOtp: DEMO_OTP, store: persistDriver });
});
devRoutes.post("/reset", (c) => {
  resetDatabase();
  setMeta("seedVersion", "");
  ensureSeeded();
  return c.json({ reset: true, seedVersion: SEED_VERSION });
});
devRoutes.post("/reset-user/:id", (c) => {
  const user = usersTable.getById(c.req.param("id"));
  if (!user) throw new ApiError(404, "NOT_FOUND", "User not found.");
  for (const s of sessionsTable.findBy("userId", user.id)) sessionsTable.deleteById(s.id);
  for (const r of assistedReviewsTable.findBy("userId", user.id)) assistedReviewsTable.deleteById(r.id);
  for (const a of appointmentsTable.findBy("userId", user.id)) appointmentsTable.deleteById(a.id);
  return c.json({ reset: true, userId: user.id });
});
devRoutes.get("/otp", (c) => {
  const mobile = c.req.query("mobile");
  if (!mobile) throw new ApiError(422, "MISSING_MOBILE", "mobile query param required.");
  if (!findUserByMobile(mobile)) throw new ApiError(404, "NOT_FOUND", "No demo user for this mobile.");
  return c.json({ code: DEMO_OTP });
});
devRoutes.get("/outbox", (c) => {
  const userId = c.req.query("userId");
  const all = outboxTable.all().sort((a, b) => a.sentAt < b.sentAt ? 1 : -1);
  return c.json({ messages: userId ? all.filter((m) => m.userId === userId) : all });
});
devRoutes.get("/reviews", (c) => {
  return c.json({
    reviews: assistedReviewsTable.all().sort((a, b) => a.submittedAt < b.submittedAt ? 1 : -1)
  });
});
var decisionSchema = external_exports.object({
  status: external_exports.enum(ASSISTED_REVIEW_STATUSES),
  reviewerName: external_exports.string().min(1).default("Officer R. Nair (simulated)"),
  note: external_exports.object({ en: external_exports.string(), hi: external_exports.string() }).nullable().optional()
});
devRoutes.post("/reviews/:id/decide", zValidator("json", decisionSchema), async (c) => {
  const { status, reviewerName, note } = c.req.valid("json");
  const review = assistedReviewsTable.getById(c.req.param("id"));
  if (!review) throw new ApiError(404, "NOT_FOUND", "Review request not found.");
  const session = sessionsTable.getById(review.sessionId);
  return c.json({
    review: applyReviewerDecision(review.id, status, reviewerName, note ?? null, session)
  });
});
devRoutes.get("/appointments", (c) => {
  return c.json({
    appointments: appointmentsTable.all().sort((a, b) => a.slotStart < b.slotStart ? 1 : -1)
  });
});
var callDecisionSchema = external_exports.object({
  outcome: external_exports.enum(["completed", "failed", "no_show"]),
  officerName: external_exports.string().min(1).default("Officer R. Nair (simulated)")
});
devRoutes.post("/appointments/:id/decide", zValidator("json", callDecisionSchema), async (c) => {
  const { outcome, officerName } = c.req.valid("json");
  const appointment = appointmentsTable.getById(c.req.param("id"));
  if (!appointment) throw new ApiError(404, "NOT_FOUND", "Verification call not found.");
  const session = sessionsTable.getById(appointment.sessionId);
  return c.json({ appointment: officerDecision(appointment.id, outcome, session, officerName) });
});
var mockControlSchema = external_exports.object({
  overrides: external_exports.record(external_exports.enum(SIGNAL_TYPES), external_exports.enum(MOCK_OUTCOMES).nullable()).default({}),
  latencyMs: external_exports.number().min(0).max(5e3).default(900)
});
devRoutes.get("/mock-controls/:userId", (c) => {
  const userId = c.req.param("userId");
  const control = getMockControl(userId);
  return c.json({
    control: control ?? { id: userId, userId, overrides: {}, latencyMs: 900, updatedAt: (/* @__PURE__ */ new Date()).toISOString() }
  });
});
devRoutes.patch("/mock-controls/:userId", zValidator("json", mockControlSchema), async (c) => {
  const userId = c.req.param("userId");
  const input = c.req.valid("json");
  upsertMockControl({
    id: userId,
    userId,
    overrides: input.overrides,
    latencyMs: input.latencyMs,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return c.json({ control: getMockControl(userId) });
});

// apps/api/src/routes/enrollment.ts
init_zod();
init_humanEngine();
init_env();
var enrollmentRoutes = new Hono2();
enrollmentRoutes.use("*", requireAuth);
var clientReadingSchema2 = external_exports.object({
  descriptor: external_exports.array(external_exports.number()).min(64).max(4096),
  faceScore: external_exports.number().min(0).max(1),
  live: external_exports.number().min(0).max(1),
  real: external_exports.number().min(0).max(1)
});
var enrollSchema = external_exports.object({
  image: external_exports.string().min(64).max(8e6).optional(),
  reading: clientReadingSchema2.optional(),
  source: external_exports.enum(["selfie", "document"]),
  /** Both issued by the mocked Aadhaar face-authentication consent step. */
  consentId: external_exports.string().min(6),
  txnId: external_exports.string().min(6)
}).refine((v) => !!v.image || !!v.reading, {
  message: "Provide either an image or a client face reading"
});
enrollmentRoutes.get("/face", async (c) => {
  const userId = c.get("userId");
  const enrollment = getFaceEnrollment(userId);
  return c.json({
    enrolled: !!enrollment,
    engineReady: env.FACE_ENGINE === "client" ? true : isHumanReady(),
    faceEngine: env.FACE_ENGINE,
    enrollment: enrollment ? {
      source: enrollment.source,
      quality: enrollment.quality,
      createdAt: enrollment.createdAt,
      /** Shown on the profile so the user can see it is Aadhaar-backed. */
      aadhaarTxnId: enrollment.txnId,
      maskedAadhaar: usersTable.getById(userId)?.maskedAadhaar ?? null
    } : null
  });
});
enrollmentRoutes.post("/face", zValidator("json", enrollSchema), async (c) => {
  const userId = c.get("userId");
  const user = usersTable.getById(userId);
  if (!user) throw new ApiError(404, "USER_NOT_FOUND", "User not found.");
  const { image, reading, source, consentId, txnId } = c.req.valid("json");
  const consent = aadhaarConsentsTable.getById(consentId);
  if (!consent || consent.userId !== userId || consent.revokedAt) {
    throw new ApiError(
      403,
      "AADHAAR_CONSENT_REQUIRED",
      "Face ID must be registered through Aadhaar. Please complete the Aadhaar consent step first."
    );
  }
  if (new Date(consent.expiresAt) < /* @__PURE__ */ new Date()) {
    throw new ApiError(403, "AADHAAR_CONSENT_EXPIRED", "That Aadhaar consent has expired. Please give consent again.");
  }
  if (!consent.scopes.includes("face_authentication")) {
    throw new ApiError(403, "AADHAAR_SCOPE_MISSING", "This Aadhaar consent does not cover face authentication.");
  }
  if (consent.txnId !== txnId) {
    throw new ApiError(403, "AADHAAR_TXN_MISMATCH", "This capture does not match the Aadhaar consent transaction.");
  }
  const analysis = reading ? enrollmentFromClientReading(reading) : await buildEnrollmentDescriptor(image);
  saveFaceEnrollment({
    id: `enr_${nanoid(8)}`,
    userId,
    descriptor: analysis.embedding,
    source,
    quality: analysis.faceScore,
    consentId: consent.id,
    aadhaarUid: user.aadhaarUid,
    txnId: consent.txnId,
    status: "active",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  });
  return c.json({
    enrolled: true,
    quality: Math.round(analysis.faceScore * 100) / 100,
    liveScore: Math.round(analysis.live * 100) / 100,
    antispoofScore: Math.round(analysis.real * 100) / 100,
    source,
    aadhaarTxnId: consent.txnId,
    maskedAadhaar: user.maskedAadhaar
  });
});

// apps/api/src/db/sharedState.ts
var CACHE_KEY = `jeevansetu:store:${SEED_VERSION}`;
var TTL_SECONDS = 60 * 60 * 12;
var enabled = persistDriver === "memory" && Boolean(process.env.VERCEL);
var cachePromise = null;
async function getCacheClient() {
  if (!enabled) return null;
  cachePromise ??= Promise.resolve().then(() => __toESM(require_functions(), 1)).then((mod) => typeof mod.getCache === "function" ? mod.getCache() : null).catch(() => null);
  return cachePromise;
}
async function hydrateFromShared() {
  const cache = await getCacheClient();
  if (!cache) return;
  try {
    const snap = await cache.get(CACHE_KEY);
    if (snap?.tables && snap.meta?.seedVersion === SEED_VERSION) restoreStore(snap);
  } catch {
  }
}
async function flushToShared() {
  const cache = await getCacheClient();
  if (!cache) return;
  try {
    if (getMeta("seedVersion") !== SEED_VERSION) return;
    await cache.set(CACHE_KEY, snapshotStore(), {
      ttl: TTL_SECONDS,
      tags: ["jeevansetu-store"]
    });
  } catch {
  }
}

// apps/api/src/app.ts
var app = new Hono2();
app.use("*", logger());
app.use("*", async (c, next2) => {
  await hydrateFromShared();
  ensureSeeded();
  try {
    await next2();
  } finally {
    await flushToShared();
  }
});
app.use(
  "/api/*",
  cors({
    origin: (origin) => origin ?? "*",
    credentials: true
  })
);
app.onError(handleError);
var PUBLIC_CACHEABLE = /* @__PURE__ */ new Set(["/api/health", "/api/aadhaar/directory"]);
app.use("/api/*", async (c, next2) => {
  await next2();
  if (c.res.headers.has("Cache-Control")) return;
  const cacheable = c.req.method === "GET" && PUBLIC_CACHEABLE.has(new URL(c.req.url).pathname);
  c.res.headers.set(
    "Cache-Control",
    cacheable ? "public, max-age=60, stale-while-revalidate=300" : "private, no-store"
  );
});
app.route("/api/health", healthRoutes);
app.route("/api/aadhaar", aadhaarRoutes);
app.route("/api/auth", authRoutes);
app.route("/api/users", userRoutes);
app.route("/api/verification/status", statusRoutes);
app.route("/api/verification/sessions", sessionRoutes);
app.route("/api/family", familyRoutes);
app.route("/api/certificates", certificateRoutes);
app.route("/api/reviews", reviewRoutes);
app.route("/api/appointments", appointmentRoutes);
app.route("/api/enrollment", enrollmentRoutes);
app.route("/api/dev", devRoutes);
var app_default = app;

// vercel-entry.ts
ensureSeeded();
var vercel_entry_default = app_default;
export {
  vercel_entry_default as default
};
/*! Bundled license information:

safe-buffer/index.js:
  (*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> *)
*/
