/*! @name @fanhero/analytics @version 1.0.0 @license MIT */
'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var videojs = _interopDefault(require('video.js'));
var window$1 = _interopDefault(require('global/window'));

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

var version = "1.0.0";

var ActionModel = {
  name: "",
  method: "",
  url: ""
};

var config = {
  APP_TYPE: "WEB",
  APP_VERSION: version,
  KAFKA_TOPIC: "player",
  REQUEST_TYPE: "player"
};

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var uaParser = createCommonjsModule(function (module, exports) {
/////////////////////////////////////////////////////////////////////////////////
/* UAParser.js v1.0.2
   Copyright © 2012-2021 Faisal Salman <f@faisalman.com>
   MIT License *//*
   Detect Browser, Engine, OS, CPU, and Device type/model from User-Agent data.
   Supports browser & node.js environment. 
   Demo   : https://faisalman.github.io/ua-parser-js
   Source : https://github.com/faisalman/ua-parser-js */
/////////////////////////////////////////////////////////////////////////////////

(function (window, undefined$1) {

    //////////////
    // Constants
    /////////////


    var LIBVERSION  = '1.0.2',
        EMPTY       = '',
        UNKNOWN     = '?',
        FUNC_TYPE   = 'function',
        UNDEF_TYPE  = 'undefined',
        OBJ_TYPE    = 'object',
        STR_TYPE    = 'string',
        MAJOR       = 'major',
        MODEL       = 'model',
        NAME        = 'name',
        TYPE        = 'type',
        VENDOR      = 'vendor',
        VERSION     = 'version',
        ARCHITECTURE= 'architecture',
        CONSOLE     = 'console',
        MOBILE      = 'mobile',
        TABLET      = 'tablet',
        SMARTTV     = 'smarttv',
        WEARABLE    = 'wearable',
        EMBEDDED    = 'embedded',
        UA_MAX_LENGTH = 255;

    var AMAZON  = 'Amazon',
        APPLE   = 'Apple',
        ASUS    = 'ASUS',
        BLACKBERRY = 'BlackBerry',
        BROWSER = 'Browser',
        CHROME  = 'Chrome',
        EDGE    = 'Edge',
        FIREFOX = 'Firefox',
        GOOGLE  = 'Google',
        HUAWEI  = 'Huawei',
        LG      = 'LG',
        MICROSOFT = 'Microsoft',
        MOTOROLA  = 'Motorola',
        OPERA   = 'Opera',
        SAMSUNG = 'Samsung',
        SONY    = 'Sony',
        XIAOMI  = 'Xiaomi',
        ZEBRA   = 'Zebra',
        FACEBOOK   = 'Facebook';

    ///////////
    // Helper
    //////////

    var extend = function (regexes, extensions) {
            var mergedRegexes = {};
            for (var i in regexes) {
                if (extensions[i] && extensions[i].length % 2 === 0) {
                    mergedRegexes[i] = extensions[i].concat(regexes[i]);
                } else {
                    mergedRegexes[i] = regexes[i];
                }
            }
            return mergedRegexes;
        },
        enumerize = function (arr) {
            var enums = {};
            for (var i=0; i<arr.length; i++) {
                enums[arr[i].toUpperCase()] = arr[i];
            }
            return enums;
        },
        has = function (str1, str2) {
            return typeof str1 === STR_TYPE ? lowerize(str2).indexOf(lowerize(str1)) !== -1 : false;
        },
        lowerize = function (str) {
            return str.toLowerCase();
        },
        majorize = function (version) {
            return typeof(version) === STR_TYPE ? version.replace(/[^\d\.]/g, EMPTY).split('.')[0] : undefined$1;
        },
        trim = function (str, len) {
            if (typeof(str) === STR_TYPE) {
                str = str.replace(/^\s\s*/, EMPTY).replace(/\s\s*$/, EMPTY);
                return typeof(len) === UNDEF_TYPE ? str : str.substring(0, UA_MAX_LENGTH);
            }
    };

    ///////////////
    // Map helper
    //////////////

    var rgxMapper = function (ua, arrays) {

            var i = 0, j, k, p, q, matches, match;

            // loop through all regexes maps
            while (i < arrays.length && !matches) {

                var regex = arrays[i],       // even sequence (0,2,4,..)
                    props = arrays[i + 1];   // odd sequence (1,3,5,..)
                j = k = 0;

                // try matching uastring with regexes
                while (j < regex.length && !matches) {

                    matches = regex[j++].exec(ua);

                    if (!!matches) {
                        for (p = 0; p < props.length; p++) {
                            match = matches[++k];
                            q = props[p];
                            // check if given property is actually array
                            if (typeof q === OBJ_TYPE && q.length > 0) {
                                if (q.length === 2) {
                                    if (typeof q[1] == FUNC_TYPE) {
                                        // assign modified match
                                        this[q[0]] = q[1].call(this, match);
                                    } else {
                                        // assign given value, ignore regex match
                                        this[q[0]] = q[1];
                                    }
                                } else if (q.length === 3) {
                                    // check whether function or regex
                                    if (typeof q[1] === FUNC_TYPE && !(q[1].exec && q[1].test)) {
                                        // call function (usually string mapper)
                                        this[q[0]] = match ? q[1].call(this, match, q[2]) : undefined$1;
                                    } else {
                                        // sanitize match using given regex
                                        this[q[0]] = match ? match.replace(q[1], q[2]) : undefined$1;
                                    }
                                } else if (q.length === 4) {
                                        this[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined$1;
                                }
                            } else {
                                this[q] = match ? match : undefined$1;
                            }
                        }
                    }
                }
                i += 2;
            }
        },

        strMapper = function (str, map) {

            for (var i in map) {
                // check if current value is array
                if (typeof map[i] === OBJ_TYPE && map[i].length > 0) {
                    for (var j = 0; j < map[i].length; j++) {
                        if (has(map[i][j], str)) {
                            return (i === UNKNOWN) ? undefined$1 : i;
                        }
                    }
                } else if (has(map[i], str)) {
                    return (i === UNKNOWN) ? undefined$1 : i;
                }
            }
            return str;
    };

    ///////////////
    // String map
    //////////////

    // Safari < 3.0
    var oldSafariMap = {
            '1.0'   : '/8',
            '1.2'   : '/1',
            '1.3'   : '/3',
            '2.0'   : '/412',
            '2.0.2' : '/416',
            '2.0.3' : '/417',
            '2.0.4' : '/419',
            '?'     : '/'
        },
        windowsVersionMap = {
            'ME'        : '4.90',
            'NT 3.11'   : 'NT3.51',
            'NT 4.0'    : 'NT4.0',
            '2000'      : 'NT 5.0',
            'XP'        : ['NT 5.1', 'NT 5.2'],
            'Vista'     : 'NT 6.0',
            '7'         : 'NT 6.1',
            '8'         : 'NT 6.2',
            '8.1'       : 'NT 6.3',
            '10'        : ['NT 6.4', 'NT 10.0'],
            'RT'        : 'ARM'
    };

    //////////////
    // Regex map
    /////////////

    var regexes = {

        browser : [[

            /\b(?:crmo|crios)\/([\w\.]+)/i                                      // Chrome for Android/iOS
            ], [VERSION, [NAME, 'Chrome']], [
            /edg(?:e|ios|a)?\/([\w\.]+)/i                                       // Microsoft Edge
            ], [VERSION, [NAME, 'Edge']], [

            // Presto based
            /(opera mini)\/([-\w\.]+)/i,                                        // Opera Mini
            /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,                 // Opera Mobi/Tablet
            /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i                           // Opera
            ], [NAME, VERSION], [
            /opios[\/ ]+([\w\.]+)/i                                             // Opera mini on iphone >= 8.0
            ], [VERSION, [NAME, OPERA+' Mini']], [
            /\bopr\/([\w\.]+)/i                                                 // Opera Webkit
            ], [VERSION, [NAME, OPERA]], [

            // Mixed
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,      // Lunascape/Maxthon/Netfront/Jasmine/Blazer
            // Trident based
            /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,               // Avant/IEMobile/SlimBrowser
            /(ba?idubrowser)[\/ ]?([\w\.]+)/i,                                  // Baidu Browser
            /(?:ms|\()(ie) ([\w\.]+)/i,                                         // Internet Explorer

            // Webkit/KHTML based                                               // Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron/Iridium/PhantomJS/Bowser/QupZilla/Falkon
            /(flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale|qqbrowserlite|qq)\/([-\w\.]+)/i,
                                                                                // Rekonq/Puffin/Brave/Whale/QQBrowserLite/QQ, aka ShouQ
            /(weibo)__([\d\.]+)/i                                               // Weibo
            ], [NAME, VERSION], [
            /(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i                 // UCBrowser
            ], [VERSION, [NAME, 'UC'+BROWSER]], [
            /\bqbcore\/([\w\.]+)/i                                              // WeChat Desktop for Windows Built-in Browser
            ], [VERSION, [NAME, 'WeChat(Win) Desktop']], [
            /micromessenger\/([\w\.]+)/i                                        // WeChat
            ], [VERSION, [NAME, 'WeChat']], [
            /konqueror\/([\w\.]+)/i                                             // Konqueror
            ], [VERSION, [NAME, 'Konqueror']], [
            /trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i                       // IE11
            ], [VERSION, [NAME, 'IE']], [
            /yabrowser\/([\w\.]+)/i                                             // Yandex
            ], [VERSION, [NAME, 'Yandex']], [
            /(avast|avg)\/([\w\.]+)/i                                           // Avast/AVG Secure Browser
            ], [[NAME, /(.+)/, '$1 Secure '+BROWSER], VERSION], [
            /\bfocus\/([\w\.]+)/i                                               // Firefox Focus
            ], [VERSION, [NAME, FIREFOX+' Focus']], [
            /\bopt\/([\w\.]+)/i                                                 // Opera Touch
            ], [VERSION, [NAME, OPERA+' Touch']], [
            /coc_coc\w+\/([\w\.]+)/i                                            // Coc Coc Browser
            ], [VERSION, [NAME, 'Coc Coc']], [
            /dolfin\/([\w\.]+)/i                                                // Dolphin
            ], [VERSION, [NAME, 'Dolphin']], [
            /coast\/([\w\.]+)/i                                                 // Opera Coast
            ], [VERSION, [NAME, OPERA+' Coast']], [
            /miuibrowser\/([\w\.]+)/i                                           // MIUI Browser
            ], [VERSION, [NAME, 'MIUI '+BROWSER]], [
            /fxios\/([-\w\.]+)/i                                                // Firefox for iOS
            ], [VERSION, [NAME, FIREFOX]], [
            /\bqihu|(qi?ho?o?|360)browser/i                                     // 360
            ], [[NAME, '360 '+BROWSER]], [
            /(oculus|samsung|sailfish)browser\/([\w\.]+)/i
            ], [[NAME, /(.+)/, '$1 '+BROWSER], VERSION], [                      // Oculus/Samsung/Sailfish Browser
            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
            ], [[NAME, /_/g, ' '], VERSION], [
            /(electron)\/([\w\.]+) safari/i,                                    // Electron-based App
            /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,                   // Tesla
            /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i            // QQBrowser/Baidu App/2345 Browser
            ], [NAME, VERSION], [
            /(metasr)[\/ ]?([\w\.]+)/i,                                         // SouGouBrowser
            /(lbbrowser)/i                                                      // LieBao Browser
            ], [NAME], [

            // WebView
            /((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i       // Facebook App for iOS & Android
            ], [[NAME, FACEBOOK], VERSION], [
            /safari (line)\/([\w\.]+)/i,                                        // Line App for iOS
            /\b(line)\/([\w\.]+)\/iab/i,                                        // Line App for Android
            /(chromium|instagram)[\/ ]([-\w\.]+)/i                              // Chromium/Instagram
            ], [NAME, VERSION], [
            /\bgsa\/([\w\.]+) .*safari\//i                                      // Google Search Appliance on iOS
            ], [VERSION, [NAME, 'GSA']], [

            /headlesschrome(?:\/([\w\.]+)| )/i                                  // Chrome Headless
            ], [VERSION, [NAME, CHROME+' Headless']], [

            / wv\).+(chrome)\/([\w\.]+)/i                                       // Chrome WebView
            ], [[NAME, CHROME+' WebView'], VERSION], [

            /droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i           // Android Browser
            ], [VERSION, [NAME, 'Android '+BROWSER]], [

            /(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i       // Chrome/OmniWeb/Arora/Tizen/Nokia
            ], [NAME, VERSION], [

            /version\/([\w\.]+) .*mobile\/\w+ (safari)/i                        // Mobile Safari
            ], [VERSION, [NAME, 'Mobile Safari']], [
            /version\/([\w\.]+) .*(mobile ?safari|safari)/i                     // Safari & Safari Mobile
            ], [VERSION, NAME], [
            /webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i                      // Safari < 3.0
            ], [NAME, [VERSION, strMapper, oldSafariMap]], [

            /(webkit|khtml)\/([\w\.]+)/i
            ], [NAME, VERSION], [

            // Gecko based
            /(navigator|netscape\d?)\/([-\w\.]+)/i                              // Netscape
            ], [[NAME, 'Netscape'], VERSION], [
            /mobile vr; rv:([\w\.]+)\).+firefox/i                               // Firefox Reality
            ], [VERSION, [NAME, FIREFOX+' Reality']], [
            /ekiohf.+(flow)\/([\w\.]+)/i,                                       // Flow
            /(swiftfox)/i,                                                      // Swiftfox
            /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,
                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror/Klar
            /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,
                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
            /(firefox)\/([\w\.]+)/i,                                            // Other Firefox-based
            /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,                         // Mozilla

            // Other
            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,
                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf/Sleipnir/Obigo/Mosaic/Go/ICE/UP.Browser
            /(links) \(([\w\.]+)/i                                              // Links
            ], [NAME, VERSION]
        ],

        cpu : [[

            /(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i                     // AMD64 (x64)
            ], [[ARCHITECTURE, 'amd64']], [

            /(ia32(?=;))/i                                                      // IA32 (quicktime)
            ], [[ARCHITECTURE, lowerize]], [

            /((?:i[346]|x)86)[;\)]/i                                            // IA32 (x86)
            ], [[ARCHITECTURE, 'ia32']], [

            /\b(aarch64|arm(v?8e?l?|_?64))\b/i                                 // ARM64
            ], [[ARCHITECTURE, 'arm64']], [

            /\b(arm(?:v[67])?ht?n?[fl]p?)\b/i                                   // ARMHF
            ], [[ARCHITECTURE, 'armhf']], [

            // PocketPC mistakenly identified as PowerPC
            /windows (ce|mobile); ppc;/i
            ], [[ARCHITECTURE, 'arm']], [

            /((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i                            // PowerPC
            ], [[ARCHITECTURE, /ower/, EMPTY, lowerize]], [

            /(sun4\w)[;\)]/i                                                    // SPARC
            ], [[ARCHITECTURE, 'sparc']], [

            /((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i
                                                                                // IA64, 68K, ARM/64, AVR/32, IRIX/64, MIPS/64, SPARC/64, PA-RISC
            ], [[ARCHITECTURE, lowerize]]
        ],

        device : [[

            //////////////////////////
            // MOBILES & TABLETS
            // Ordered by popularity
            /////////////////////////

            // Samsung
            /\b(sch-i[89]0\d|shw-m380s|sm-[pt]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, TABLET]], [
            /\b((?:s[cgp]h|gt|sm)-\w+|galaxy nexus)/i,
            /samsung[- ]([-\w]+)/i,
            /sec-(sgh\w+)/i
            ], [MODEL, [VENDOR, SAMSUNG], [TYPE, MOBILE]], [

            // Apple
            /\((ip(?:hone|od)[\w ]*);/i                                         // iPod/iPhone
            ], [MODEL, [VENDOR, APPLE], [TYPE, MOBILE]], [
            /\((ipad);[-\w\),; ]+apple/i,                                       // iPad
            /applecoremedia\/[\w\.]+ \((ipad)/i,
            /\b(ipad)\d\d?,\d\d?[;\]].+ios/i
            ], [MODEL, [VENDOR, APPLE], [TYPE, TABLET]], [

            // Huawei
            /\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, TABLET]], [
            /(?:huawei|honor)([-\w ]+)[;\)]/i,
            /\b(nexus 6p|\w{2,4}-[atu]?[ln][01259x][012359][an]?)\b(?!.+d\/s)/i
            ], [MODEL, [VENDOR, HUAWEI], [TYPE, MOBILE]], [

            // Xiaomi
            /\b(poco[\w ]+)(?: bui|\))/i,                                       // Xiaomi POCO
            /\b; (\w+) build\/hm\1/i,                                           // Xiaomi Hongmi 'numeric' models
            /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,                             // Xiaomi Hongmi
            /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,                   // Xiaomi Redmi
            /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i // Xiaomi Mi
            ], [[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, MOBILE]], [
            /\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i                        // Mi Pad tablets
            ],[[MODEL, /_/g, ' '], [VENDOR, XIAOMI], [TYPE, TABLET]], [

            // OPPO
            /; (\w+) bui.+ oppo/i,
            /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i
            ], [MODEL, [VENDOR, 'OPPO'], [TYPE, MOBILE]], [

            // Vivo
            /vivo (\w+)(?: bui|\))/i,
            /\b(v[12]\d{3}\w?[at])(?: bui|;)/i
            ], [MODEL, [VENDOR, 'Vivo'], [TYPE, MOBILE]], [

            // Realme
            /\b(rmx[12]\d{3})(?: bui|;|\))/i
            ], [MODEL, [VENDOR, 'Realme'], [TYPE, MOBILE]], [

            // Motorola
            /\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,
            /\bmot(?:orola)?[- ](\w*)/i,
            /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, MOBILE]], [
            /\b(mz60\d|xoom[2 ]{0,2}) build\//i
            ], [MODEL, [VENDOR, MOTOROLA], [TYPE, TABLET]], [

            // LG
            /((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i
            ], [MODEL, [VENDOR, LG], [TYPE, TABLET]], [
            /(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,
            /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,
            /\blg-?([\d\w]+) bui/i
            ], [MODEL, [VENDOR, LG], [TYPE, MOBILE]], [

            // Lenovo
            /(ideatab[-\w ]+)/i,
            /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i
            ], [MODEL, [VENDOR, 'Lenovo'], [TYPE, TABLET]], [

            // Nokia
            /(?:maemo|nokia).*(n900|lumia \d+)/i,
            /nokia[-_ ]?([-\w\.]*)/i
            ], [[MODEL, /_/g, ' '], [VENDOR, 'Nokia'], [TYPE, MOBILE]], [

            // Google
            /(pixel c)\b/i                                                      // Google Pixel C
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, TABLET]], [
            /droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i                         // Google Pixel
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, MOBILE]], [

            // Sony
            /droid.+ ([c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i
            ], [MODEL, [VENDOR, SONY], [TYPE, MOBILE]], [
            /sony tablet [ps]/i,
            /\b(?:sony)?sgp\w+(?: bui|\))/i
            ], [[MODEL, 'Xperia Tablet'], [VENDOR, SONY], [TYPE, TABLET]], [

            // OnePlus
            / (kb2005|in20[12]5|be20[12][59])\b/i,
            /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i
            ], [MODEL, [VENDOR, 'OnePlus'], [TYPE, MOBILE]], [

            // Amazon
            /(alexa)webm/i,
            /(kf[a-z]{2}wi)( bui|\))/i,                                         // Kindle Fire without Silk
            /(kf[a-z]+)( bui|\)).+silk\//i                                      // Kindle Fire HD
            ], [MODEL, [VENDOR, AMAZON], [TYPE, TABLET]], [
            /((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i                     // Fire Phone
            ], [[MODEL, /(.+)/g, 'Fire Phone $1'], [VENDOR, AMAZON], [TYPE, MOBILE]], [

            // BlackBerry
            /(playbook);[-\w\),; ]+(rim)/i                                      // BlackBerry PlayBook
            ], [MODEL, VENDOR, [TYPE, TABLET]], [
            /\b((?:bb[a-f]|st[hv])100-\d)/i,
            /\(bb10; (\w+)/i                                                    // BlackBerry 10
            ], [MODEL, [VENDOR, BLACKBERRY], [TYPE, MOBILE]], [

            // Asus
            /(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, TABLET]], [
            / (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i
            ], [MODEL, [VENDOR, ASUS], [TYPE, MOBILE]], [

            // HTC
            /(nexus 9)/i                                                        // HTC Nexus 9
            ], [MODEL, [VENDOR, 'HTC'], [TYPE, TABLET]], [
            /(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,                         // HTC

            // ZTE
            /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,
            /(alcatel|geeksphone|nexian|panasonic|sony)[-_ ]?([-\w]*)/i         // Alcatel/GeeksPhone/Nexian/Panasonic/Sony
            ], [VENDOR, [MODEL, /_/g, ' '], [TYPE, MOBILE]], [

            // Acer
            /droid.+; ([ab][1-7]-?[0178a]\d\d?)/i
            ], [MODEL, [VENDOR, 'Acer'], [TYPE, TABLET]], [

            // Meizu
            /droid.+; (m[1-5] note) bui/i,
            /\bmz-([-\w]{2,})/i
            ], [MODEL, [VENDOR, 'Meizu'], [TYPE, MOBILE]], [

            // Sharp
            /\b(sh-?[altvz]?\d\d[a-ekm]?)/i
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, MOBILE]], [

            // MIXED
            /(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,
                                                                                // BlackBerry/BenQ/Palm/Sony-Ericsson/Acer/Asus/Dell/Meizu/Motorola/Polytron
            /(hp) ([\w ]+\w)/i,                                                 // HP iPAQ
            /(asus)-?(\w+)/i,                                                   // Asus
            /(microsoft); (lumia[\w ]+)/i,                                      // Microsoft Lumia
            /(lenovo)[-_ ]?([-\w]+)/i,                                          // Lenovo
            /(jolla)/i,                                                         // Jolla
            /(oppo) ?([\w ]+) bui/i                                             // OPPO
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [

            /(archos) (gamepad2?)/i,                                            // Archos
            /(hp).+(touchpad(?!.+tablet)|tablet)/i,                             // HP TouchPad
            /(kindle)\/([\w\.]+)/i,                                             // Kindle
            /(nook)[\w ]+build\/(\w+)/i,                                        // Nook
            /(dell) (strea[kpr\d ]*[\dko])/i,                                   // Dell Streak
            /(le[- ]+pan)[- ]+(\w{1,9}) bui/i,                                  // Le Pan Tablets
            /(trinity)[- ]*(t\d{3}) bui/i,                                      // Trinity Tablets
            /(gigaset)[- ]+(q\w{1,9}) bui/i,                                    // Gigaset Tablets
            /(vodafone) ([\w ]+)(?:\)| bui)/i                                   // Vodafone
            ], [VENDOR, MODEL, [TYPE, TABLET]], [

            /(surface duo)/i                                                    // Surface Duo
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, TABLET]], [
            /droid [\d\.]+; (fp\du?)(?: b|\))/i                                 // Fairphone
            ], [MODEL, [VENDOR, 'Fairphone'], [TYPE, MOBILE]], [
            /(u304aa)/i                                                         // AT&T
            ], [MODEL, [VENDOR, 'AT&T'], [TYPE, MOBILE]], [
            /\bsie-(\w*)/i                                                      // Siemens
            ], [MODEL, [VENDOR, 'Siemens'], [TYPE, MOBILE]], [
            /\b(rct\w+) b/i                                                     // RCA Tablets
            ], [MODEL, [VENDOR, 'RCA'], [TYPE, TABLET]], [
            /\b(venue[\d ]{2,7}) b/i                                            // Dell Venue Tablets
            ], [MODEL, [VENDOR, 'Dell'], [TYPE, TABLET]], [
            /\b(q(?:mv|ta)\w+) b/i                                              // Verizon Tablet
            ], [MODEL, [VENDOR, 'Verizon'], [TYPE, TABLET]], [
            /\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i                       // Barnes & Noble Tablet
            ], [MODEL, [VENDOR, 'Barnes & Noble'], [TYPE, TABLET]], [
            /\b(tm\d{3}\w+) b/i
            ], [MODEL, [VENDOR, 'NuVision'], [TYPE, TABLET]], [
            /\b(k88) b/i                                                        // ZTE K Series Tablet
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, TABLET]], [
            /\b(nx\d{3}j) b/i                                                   // ZTE Nubia
            ], [MODEL, [VENDOR, 'ZTE'], [TYPE, MOBILE]], [
            /\b(gen\d{3}) b.+49h/i                                              // Swiss GEN Mobile
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, MOBILE]], [
            /\b(zur\d{3}) b/i                                                   // Swiss ZUR Tablet
            ], [MODEL, [VENDOR, 'Swiss'], [TYPE, TABLET]], [
            /\b((zeki)?tb.*\b) b/i                                              // Zeki Tablets
            ], [MODEL, [VENDOR, 'Zeki'], [TYPE, TABLET]], [
            /\b([yr]\d{2}) b/i,
            /\b(dragon[- ]+touch |dt)(\w{5}) b/i                                // Dragon Touch Tablet
            ], [[VENDOR, 'Dragon Touch'], MODEL, [TYPE, TABLET]], [
            /\b(ns-?\w{0,9}) b/i                                                // Insignia Tablets
            ], [MODEL, [VENDOR, 'Insignia'], [TYPE, TABLET]], [
            /\b((nxa|next)-?\w{0,9}) b/i                                        // NextBook Tablets
            ], [MODEL, [VENDOR, 'NextBook'], [TYPE, TABLET]], [
            /\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i                  // Voice Xtreme Phones
            ], [[VENDOR, 'Voice'], MODEL, [TYPE, MOBILE]], [
            /\b(lvtel\-)?(v1[12]) b/i                                           // LvTel Phones
            ], [[VENDOR, 'LvTel'], MODEL, [TYPE, MOBILE]], [
            /\b(ph-1) /i                                                        // Essential PH-1
            ], [MODEL, [VENDOR, 'Essential'], [TYPE, MOBILE]], [
            /\b(v(100md|700na|7011|917g).*\b) b/i                               // Envizen Tablets
            ], [MODEL, [VENDOR, 'Envizen'], [TYPE, TABLET]], [
            /\b(trio[-\w\. ]+) b/i                                              // MachSpeed Tablets
            ], [MODEL, [VENDOR, 'MachSpeed'], [TYPE, TABLET]], [
            /\btu_(1491) b/i                                                    // Rotor Tablets
            ], [MODEL, [VENDOR, 'Rotor'], [TYPE, TABLET]], [
            /(shield[\w ]+) b/i                                                 // Nvidia Shield Tablets
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, TABLET]], [
            /(sprint) (\w+)/i                                                   // Sprint Phones
            ], [VENDOR, MODEL, [TYPE, MOBILE]], [
            /(kin\.[onetw]{3})/i                                                // Microsoft Kin
            ], [[MODEL, /\./g, ' '], [VENDOR, MICROSOFT], [TYPE, MOBILE]], [
            /droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i             // Zebra
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, TABLET]], [
            /droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, MOBILE]], [

            ///////////////////
            // CONSOLES
            ///////////////////

            /(ouya)/i,                                                          // Ouya
            /(nintendo) ([wids3utch]+)/i                                        // Nintendo
            ], [VENDOR, MODEL, [TYPE, CONSOLE]], [
            /droid.+; (shield) bui/i                                            // Nvidia
            ], [MODEL, [VENDOR, 'Nvidia'], [TYPE, CONSOLE]], [
            /(playstation [345portablevi]+)/i                                   // Playstation
            ], [MODEL, [VENDOR, SONY], [TYPE, CONSOLE]], [
            /\b(xbox(?: one)?(?!; xbox))[\); ]/i                                // Microsoft Xbox
            ], [MODEL, [VENDOR, MICROSOFT], [TYPE, CONSOLE]], [

            ///////////////////
            // SMARTTVS
            ///////////////////

            /smart-tv.+(samsung)/i                                              // Samsung
            ], [VENDOR, [TYPE, SMARTTV]], [
            /hbbtv.+maple;(\d+)/i
            ], [[MODEL, /^/, 'SmartTV'], [VENDOR, SAMSUNG], [TYPE, SMARTTV]], [
            /(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i        // LG SmartTV
            ], [[VENDOR, LG], [TYPE, SMARTTV]], [
            /(apple) ?tv/i                                                      // Apple TV
            ], [VENDOR, [MODEL, APPLE+' TV'], [TYPE, SMARTTV]], [
            /crkey/i                                                            // Google Chromecast
            ], [[MODEL, CHROME+'cast'], [VENDOR, GOOGLE], [TYPE, SMARTTV]], [
            /droid.+aft(\w)( bui|\))/i                                          // Fire TV
            ], [MODEL, [VENDOR, AMAZON], [TYPE, SMARTTV]], [
            /\(dtv[\);].+(aquos)/i                                              // Sharp
            ], [MODEL, [VENDOR, 'Sharp'], [TYPE, SMARTTV]], [
            /\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,                          // Roku
            /hbbtv\/\d+\.\d+\.\d+ +\([\w ]*; *(\w[^;]*);([^;]*)/i               // HbbTV devices
            ], [[VENDOR, trim], [MODEL, trim], [TYPE, SMARTTV]], [
            /\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i                   // SmartTV from Unidentified Vendors
            ], [[TYPE, SMARTTV]], [

            ///////////////////
            // WEARABLES
            ///////////////////

            /((pebble))app/i                                                    // Pebble
            ], [VENDOR, MODEL, [TYPE, WEARABLE]], [
            /droid.+; (glass) \d/i                                              // Google Glass
            ], [MODEL, [VENDOR, GOOGLE], [TYPE, WEARABLE]], [
            /droid.+; (wt63?0{2,3})\)/i
            ], [MODEL, [VENDOR, ZEBRA], [TYPE, WEARABLE]], [
            /(quest( 2)?)/i                                                     // Oculus Quest
            ], [MODEL, [VENDOR, FACEBOOK], [TYPE, WEARABLE]], [

            ///////////////////
            // EMBEDDED
            ///////////////////

            /(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i                              // Tesla
            ], [VENDOR, [TYPE, EMBEDDED]], [

            ////////////////////
            // MIXED (GENERIC)
            ///////////////////

            /droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i           // Android Phones from Unidentified Vendors
            ], [MODEL, [TYPE, MOBILE]], [
            /droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i       // Android Tablets from Unidentified Vendors
            ], [MODEL, [TYPE, TABLET]], [
            /\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i                      // Unidentifiable Tablet
            ], [[TYPE, TABLET]], [
            /(phone|mobile(?:[;\/]| safari)|pda(?=.+windows ce))/i              // Unidentifiable Mobile
            ], [[TYPE, MOBILE]], [
            /(android[-\w\. ]{0,9});.+buil/i                                    // Generic Android Device
            ], [MODEL, [VENDOR, 'Generic']]
        ],

        engine : [[

            /windows.+ edge\/([\w\.]+)/i                                       // EdgeHTML
            ], [VERSION, [NAME, EDGE+'HTML']], [

            /webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i                         // Blink
            ], [VERSION, [NAME, 'Blink']], [

            /(presto)\/([\w\.]+)/i,                                             // Presto
            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m/Goanna
            /ekioh(flow)\/([\w\.]+)/i,                                          // Flow
            /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,                           // KHTML/Tasman/Links
            /(icab)[\/ ]([23]\.[\d\.]+)/i                                       // iCab
            ], [NAME, VERSION], [

            /rv\:([\w\.]{1,9})\b.+(gecko)/i                                     // Gecko
            ], [VERSION, NAME]
        ],

        os : [[

            // Windows
            /microsoft (windows) (vista|xp)/i                                   // Windows (iTunes)
            ], [NAME, VERSION], [
            /(windows) nt 6\.2; (arm)/i,                                        // Windows RT
            /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,            // Windows Phone
            /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i
            ], [NAME, [VERSION, strMapper, windowsVersionMap]], [
            /(win(?=3|9|n)|win 9x )([nt\d\.]+)/i
            ], [[NAME, 'Windows'], [VERSION, strMapper, windowsVersionMap]], [

            // iOS/macOS
            /ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,              // iOS
            /cfnetwork\/.+darwin/i
            ], [[VERSION, /_/g, '.'], [NAME, 'iOS']], [
            /(mac os x) ?([\w\. ]*)/i,
            /(macintosh|mac_powerpc\b)(?!.+haiku)/i                             // Mac OS
            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

            // Mobile OSes
            /droid ([\w\.]+)\b.+(android[- ]x86)/i                              // Android-x86
            ], [VERSION, NAME], [                                               // Android/WebOS/QNX/Bada/RIM/Maemo/MeeGo/Sailfish OS
            /(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,
            /(blackberry)\w*\/([\w\.]*)/i,                                      // Blackberry
            /(tizen|kaios)[\/ ]([\w\.]+)/i,                                     // Tizen/KaiOS
            /\((series40);/i                                                    // Series 40
            ], [NAME, VERSION], [
            /\(bb(10);/i                                                        // BlackBerry 10
            ], [VERSION, [NAME, BLACKBERRY]], [
            /(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i         // Symbian
            ], [VERSION, [NAME, 'Symbian']], [
            /mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i // Firefox OS
            ], [VERSION, [NAME, FIREFOX+' OS']], [
            /web0s;.+rt(tv)/i,
            /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i                              // WebOS
            ], [VERSION, [NAME, 'webOS']], [

            // Google Chromecast
            /crkey\/([\d\.]+)/i                                                 // Google Chromecast
            ], [VERSION, [NAME, CHROME+'cast']], [
            /(cros) [\w]+ ([\w\.]+\w)/i                                         // Chromium OS
            ], [[NAME, 'Chromium OS'], VERSION],[

            // Console
            /(nintendo|playstation) ([wids345portablevuch]+)/i,                 // Nintendo/Playstation
            /(xbox); +xbox ([^\);]+)/i,                                         // Microsoft Xbox (360, One, X, S, Series X, Series S)

            // Other
            /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,                            // Joli/Palm
            /(mint)[\/\(\) ]?(\w*)/i,                                           // Mint
            /(mageia|vectorlinux)[; ]/i,                                        // Mageia/VectorLinux
            /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,
                                                                                // Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware/Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus/Raspbian/Plan9/Minix/RISCOS/Contiki/Deepin/Manjaro/elementary/Sabayon/Linspire
            /(hurd|linux) ?([\w\.]*)/i,                                         // Hurd/Linux
            /(gnu) ?([\w\.]*)/i,                                                // GNU
            /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, // FreeBSD/NetBSD/OpenBSD/PC-BSD/GhostBSD/DragonFly
            /(haiku) (\w+)/i                                                    // Haiku
            ], [NAME, VERSION], [
            /(sunos) ?([\w\.\d]*)/i                                             // Solaris
            ], [[NAME, 'Solaris'], VERSION], [
            /((?:open)?solaris)[-\/ ]?([\w\.]*)/i,                              // Solaris
            /(aix) ((\d)(?=\.|\)| )[\w\.])*/i,                                  // AIX
            /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux)/i,            // BeOS/OS2/AmigaOS/MorphOS/OpenVMS/Fuchsia/HP-UX
            /(unix) ?([\w\.]*)/i                                                // UNIX
            ], [NAME, VERSION]
        ]
    };

    /////////////////
    // Constructor
    ////////////////

    var UAParser = function (ua, extensions) {

        if (typeof ua === OBJ_TYPE) {
            extensions = ua;
            ua = undefined$1;
        }

        if (!(this instanceof UAParser)) {
            return new UAParser(ua, extensions).getResult();
        }

        var _ua = ua || ((typeof window !== UNDEF_TYPE && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);
        var _rgxmap = extensions ? extend(regexes, extensions) : regexes;

        this.getBrowser = function () {
            var _browser = {};
            _browser[NAME] = undefined$1;
            _browser[VERSION] = undefined$1;
            rgxMapper.call(_browser, _ua, _rgxmap.browser);
            _browser.major = majorize(_browser.version);
            return _browser;
        };
        this.getCPU = function () {
            var _cpu = {};
            _cpu[ARCHITECTURE] = undefined$1;
            rgxMapper.call(_cpu, _ua, _rgxmap.cpu);
            return _cpu;
        };
        this.getDevice = function () {
            var _device = {};
            _device[VENDOR] = undefined$1;
            _device[MODEL] = undefined$1;
            _device[TYPE] = undefined$1;
            rgxMapper.call(_device, _ua, _rgxmap.device);
            return _device;
        };
        this.getEngine = function () {
            var _engine = {};
            _engine[NAME] = undefined$1;
            _engine[VERSION] = undefined$1;
            rgxMapper.call(_engine, _ua, _rgxmap.engine);
            return _engine;
        };
        this.getOS = function () {
            var _os = {};
            _os[NAME] = undefined$1;
            _os[VERSION] = undefined$1;
            rgxMapper.call(_os, _ua, _rgxmap.os);
            return _os;
        };
        this.getResult = function () {
            return {
                ua      : this.getUA(),
                browser : this.getBrowser(),
                engine  : this.getEngine(),
                os      : this.getOS(),
                device  : this.getDevice(),
                cpu     : this.getCPU()
            };
        };
        this.getUA = function () {
            return _ua;
        };
        this.setUA = function (ua) {
            _ua = (typeof ua === STR_TYPE && ua.length > UA_MAX_LENGTH) ? trim(ua, UA_MAX_LENGTH) : ua;
            return this;
        };
        this.setUA(_ua);
        return this;
    };

    UAParser.VERSION = LIBVERSION;
    UAParser.BROWSER =  enumerize([NAME, VERSION, MAJOR]);
    UAParser.CPU = enumerize([ARCHITECTURE]);
    UAParser.DEVICE = enumerize([MODEL, VENDOR, TYPE, CONSOLE, MOBILE, SMARTTV, TABLET, WEARABLE, EMBEDDED]);
    UAParser.ENGINE = UAParser.OS = enumerize([NAME, VERSION]);

    ///////////
    // Export
    //////////

    // check js environment
    {
        // nodejs env
        if ( module.exports) {
            exports = module.exports = UAParser;
        }
        exports.UAParser = UAParser;
    }

    // jQuery/Zepto specific (optional)
    // Note:
    //   In AMD env the global scope should be kept clean, but jQuery is an exception.
    //   jQuery always exports to global scope, unless jQuery.noConflict(true) is used,
    //   and we should catch that.
    var $ = typeof window !== UNDEF_TYPE && (window.jQuery || window.Zepto);
    if ($ && !$.ua) {
        var parser = new UAParser();
        $.ua = parser.getResult();
        $.ua.get = function () {
            return parser.getUA();
        };
        $.ua.set = function (ua) {
            parser.setUA(ua);
            var result = parser.getResult();
            for (var prop in result) {
                $.ua[prop] = result[prop];
            }
        };
    }

})(typeof window === 'object' ? window : commonjsGlobal);
});
var uaParser_1 = uaParser.UAParser;

/**
 * An advanced Client info.
 *
 */

var Client = /*#__PURE__*/function () {
  /**
   * create ClientJs instance.
   */
  function Client() {
    var _window = typeof window$1 === "undefined" ? null : window$1;

    if (_window) {
      try {
        this.result = uaParser();
      } catch (e) {// console.log('Client: constructor : ' + e);
      }
    }
  }
  /**
   * Get user OS.
   * ------------------
   *
   * @function getOS
   * @return {Object} return user OS object { name:@string , version:@string }
   * @example
   * const client = new Client();
   * client.getOS();
   * return os: { name: 'Windows', version: '10' }
   *
   */


  var _proto = Client.prototype;

  _proto.getOS = function getOS() {
    if (this.result) {
      return this.result.os;
    }

    return null;
  }
  /**
   * Get user OS name.
   * ------------------
   *
   * @function getOSName
   * @return {string} return OS name
   * @example
   * const client = new Client();
   * client.getOSName();
   * return 'Linux'
   *
   */
  ;

  _proto.getOSName = function getOSName() {
    if (this.result) {
      if (this.result.os) {
        return this.result.os.name;
      }
    }

    return "";
  }
  /**
   * Get user OS version.
   * ------------------
   *
   * @function getOSVersion
   * @return {string} return user OS version
   * @example
   * const client = new Client();
   * client.getOSVersion();
   * return '10.0'
   */
  ;

  _proto.getOSVersion = function getOSVersion() {
    if (this.result) {
      if (this.result.os) {
        return this.result.os.version;
      }
    }

    return "";
  }
  /**
   * Get user browser info.
   * ------------------
   *
   * @function getBrowser
   * @return {Object} return browser info object { browser:@string , browserVersion:@string }
   * @example
   * const client = new Client();
   * client.getBrowser();
   * return browser: { name: 'Chrome', version: '58.0.3029.110' }
   *
   */
  ;

  _proto.getBrowser = function getBrowser() {
    if (this.result) {
      return this.result.browser;
    }

    return null;
  }
  /**
   * Get user browser name.
   * ------------------
   *
   * @function getBrowser
   * @return {Object} return browser name browser:@string
   * @example
   * const client = new Client();
   * client.getBrowserName();
   * return browser: 'Chrome'
   */
  ;

  _proto.getBrowserName = function getBrowserName() {
    if (this.result) {
      if (this.result.browser) {
        return this.result.browser.name;
      }
    }

    return "";
  }
  /**
   * Get user browser version.
   * ------------------
   *
   * @function getBrowserVersion
   * @return {string} return browser version browserVersion:@string
   * @example
   * const client = new Client();
   * client.getBrowserVersion();
   * return browserVersion: '58.0.3029.110'
   */
  ;

  _proto.getBrowserVersion = function getBrowserVersion() {
    if (this.result) {
      if (this.result.browser) {
        return this.result.browser.version;
      }
    }

    return "";
  }
  /**
   * Get user device resolution.
   * ------------------
   *
   * @function getDeviceResolution
   * @return {string} return device resolution
   * @example
   * const client = new Client();
   * client.getDeviceResolution();
   * return '1920x1080'
   */
  ;

  _proto.getDeviceResolution = function getDeviceResolution() {
    if (typeof window$1 !== "undefined") {
      var screen = window$1.screen;
      return screen.width + "x" + screen.height;
    }

    return "";
  };

  _proto.get = function get(methodName) {
    if (this) {
      if (this[methodName]) {
        return this[methodName]();
      } // console.log(methodName + ' is not a method of ClientJs');

    }
  }
  /**
   * Get user basic info.
   * ------------------
   *
   * @function getBasicInfo
   *
   * @return {Object} return client info object { os:@int , osVersion:@int , market:@string , marketVersion:@string }
   */
  ;

  _proto.getBasicInfo = function getBasicInfo() {
    if (this) {
      return {
        os: this.getOSName(),
        osVersion: this.getOSVersion(),
        market: config.APP_TYPE,
        marketVersion: config.APP_VERSION
      };
    }
  };

  return Client;
}();

var client = new Client();
/**
 * This class have extra utils function on object's
 * ------------------------
 */

var FgObject = /*#__PURE__*/function () {
  /**
   * Create Instance of FgObject
   *
   * @param {*} player instance of video.js player
   *
   */
  function FgObject(player) {
    this.player = player;
    this.hasIntialRequest = false;
  }
  /**
   * Set intial flag for handle custom first request
   *
   * @param { boolean } status true|false
   */


  var _proto = FgObject.prototype;

  _proto.setInitRequest = function setInitRequest(status) {
    if (status === void 0) {
      status = false;
    }

    this.hasIntialRequest = status;
  }
  /**
   * System variable's
   *
   * @return {*} some system variable's function
   */
  ;

  _proto.getSystemVariables = function getSystemVariables() {
    var _this = this;

    var _player = this.player;
    return {
      CURRENT_TIME: function CURRENT_TIME() {
        var value;

        try {
          if (_this.hasIntialRequest) {
            value = 9999;
          } else {
            value = Math.floor(_player.currentTime() / 60);
          }
        } catch (e) {
          value = 9999;
        }

        return value;
      },
      HALF_TIME: function HALF_TIME() {
        var value;

        try {
          if (_this.hasIntialRequest) {
            value = 7777;
          } else {
            value = Math.floor(Math.floor(_player.duration() / 60) / 2);
          }
        } catch (e) {
          value = 7777;
        }

        return value;
      },
      RESOLUTION: function RESOLUTION() {
        return client.getDeviceResolution();
      },
      MIN_TO_NOW: function MIN_TO_NOW() {
        if (_player.options_.liveui) {
          return Math.round(Math.floor(_player.liveTracker.liveCurrentTime() - _player.currentTime()) / 60);
        }

        return 0;
      }
    };
  }
  /**
   * Get system variable's
   *
   * @param {*} propertyName system property name
   *
   * @return {*} value of system variable's
   */
  ;

  _proto.getSystemProperty = function getSystemProperty(propertyName) {
    if (propertyName && propertyName.length > 0) {
      if (this.getSystemVariables()[propertyName]) {
        return this.getSystemVariables()[propertyName]();
      }
    }

    return null;
  }
  /**
   * Get param from parameters
   *
   * @param {string} param param name
   * @param {*} parameters object of parameters
   *
   * @return {*} value of param
   *
   */
  ;

  _proto.getFromParams = function getFromParams(param, parameters) {
    var _this2 = this;

    var value = "";

    if (param) {
      Object.keys(parameters).map(function (property) {
        if (property === param) {
          value = parameters[property];

          if (typeof value === "string") {
            value = "\"" + value + "\"";
          }

          return value;
        }

        if (typeof property === "object") {
          value = _this2.getFromParams(param, property);
        }
      });
    }

    return value;
  }
  /**
   * This method extract FG-METHOD(x) argument.
   *
   * @param {*} str The method sentences. i.e: FG-METHOD(${x} + ${y})
   *
   * @return {string} return FG-METHOD(x) argument. i.e : x
   */
  ;

  _proto.getFormula = function getFormula(str) {
    var m = null;
    var methodPatternRegex = new RegExp(/FG-METHOD\((.*?)\)/g);

    while ((m = methodPatternRegex.exec(str)) !== null) {
      return m[1];
    }
  }
  /**
   * This method extract parameters used in FG-METHOD(x) argument.
   *
   * @param {*} str The method argument sentences. i.e: ${x} + ${y}
   *
   * @return {Array} return Array of parameter used inside the argument. i.e: [["${x}","x"], ["${y}","y"]]
   */
  ;

  _proto.getParameters = function getParameters(str) {
    return Array.from(str.matchAll(/\$\{(.*?)\}/g));
  }
  /**
   * By passing a string to the Function constructor, you are requiring the engine to parse that string much in the way it has to when you call the eval function.
   *
   * @param {*} str
   *
   * @return {*} result
   */
  ;

  _proto.parse = function parse(str) {
    /* eslint no-new-func: 0 */
    return Function("'use strict'; return (" + str + ")")();
  }
  /**
   * Calculate value of FG-* parameter.
   *
   * @param {string} property property value with 'FG-*' template.
   * @param {*} params params of request body
   *
   * @return {*} value of property
   */
  ;

  _proto.calculateParam = function calculateParam(property, params) {
    var _this3 = this;

    if (property.indexOf("FG-") === 0) {
      var propertyName = "";

      if (property.indexOf("FG-VIDEO_") === 0 || property.indexOf("FG-DEVICE_") === 0) {
        propertyName = property.replace("FG-VIDEO_", "").replace("FG-DEVICE_", "");
      } else if (property.indexOf("FG-METHOD") === 0) {
        var formula = this.getFormula(property);
        var parameterArray = this.getParameters(formula);

        if (formula) {
          if (parameterArray.length > 0) {
            parameterArray.map(function (prameter) {
              formula = formula.replace(prameter[0], _this3.getFromParams(prameter[1], params));
            });
            return this.parse(formula);
          }
        }
      }

      return this.getSystemProperty(propertyName);
    }

    return property;
  };

  return FgObject;
}();
/**
 * This function equal object with model.
 * eqaul each field of object with model field's.
 *
 * @param {Object} obj the object with data.
 * @param {Object} model the object with data.
 *
 * @return {boolean} This result is 'true' or 'false'.
 *
 */


var equal = function equal(obj, model) {
  var isOk = true;

  if (obj && model) {
    if (Array.isArray(obj)) {
      throw new Error("require object instead of array for equal with model...!");
    }

    Object.keys(model).map(function (key) {
      if (!obj[key]) {
        isOk = false;
      }
    });
  }

  return isOk;
};
/**
 * This function equal array of object with model.
 * check each object inside a array and
 * eqaul each field of object with model field's.
 *
 * @param {Array} array the array list of object with data.
 * @param {Object} model the object with data.
 *
 * @return {boolean} This result is 'true' or 'false'.
 *
 */


var equalArray = function equalArray(array, model) {
  var isOk = true;

  if (array && model) {
    if (Array.isArray(array)) {
      array.map(function (item) {
        if (!equal(item, model)) {
          isOk = false;
        }
      });
    }
  }

  return isOk;
};

FgObject.equal = equal;
FgObject.equalArray = equalArray;

var client$1 = new Client();
/**
 * Handler player event.
 * --------------
 * @description This class generate for handler player event for player.
 * @class Handler
 */

var Handler = /*#__PURE__*/function () {
  /**
   * Create a Handler class instance.
   *
   * @param {*} player video.js player instance
   */
  function Handler(player) {
    this.player = player;
    this.isPaused = true;
    this.options = {
      action: ActionModel,
      altAction: []
    };
    this.intervalId = -1;
    this.fgObject = new FgObject(player);
  }

  var _proto = Handler.prototype;

  _proto.setIntervalId = function setIntervalId(id) {
    if (id === "undefined" || id === null) {
      throw new TypeError("Interval id is not valid.");
    }

    this.intervalId = id;
  };

  _proto.getIntervalId = function getIntervalId() {
    return this.intervalId;
  }
  /**
   * This get clone object from options
   *
   * @return {*} clone object of options
   */
  ;

  _proto.getOptions = function getOptions() {
    var options = _extends({}, this.options);

    return options;
  }
  /**
   * This method set plugin options in Handler properties
   *
   * @param {*} options CollectData option for initialize.
   *
   */
  ;

  _proto.setOptions = function setOptions(options) {
    if (!options.intervalTime) {
      videojs.log("intervalTime is optional param in initialize 'CollectData' plugin. defaul value is '1000ms'");
    } // if (!options.movieId) {
    //   throw new TypeError("movieId is require for initialize 'CollectData' plugin.");
    // }
    // if (!options.userId) {
    //   throw new TypeError("userId is require for initialize 'CollectData' plugin.");
    // }


    if (!options.action && !Object.isObject(options.action)) {
      throw new TypeError("action is require for initialize 'CollectData' plugin.");
    }

    if (!FgObject.equal(options.action, ActionModel)) {
      throw new TypeError("action is not valid model for initialize 'CollectData' plugin.");
    }

    if (!options.altAction && !Array.isArray(options.altAction)) {
      throw new TypeError("altAction object is require for initialize 'CollectData' plugin.");
    }

    if (!FgObject.equalArray(options.altAction, ActionModel)) {
      throw new TypeError("action is not valid model for initialize 'CollectData' plugin.");
    }

    this.options = options;
  }
  /**
   * Check player instance
   *
   * @return {boolean} boolean value
   */
  ;

  _proto.hasPlayer = function hasPlayer() {
    if (this.player) {
      return true;
    }

    return false;
  } // #region Utils Function

  /**
   * Add client info to params object.
   * if exist targetParamName in config client info append to this param.
   *
   * @param {*} params params of request body
   * @param {string} targetParamName the name of destination property to add clientInfo
   *
   * @return {*} new object of params
   */
  ;

  _proto.addClientInfo = function addClientInfo(params, targetParamName) {
    try {
      var clientInfo = client$1.getBasicInfo();

      if (targetParamName) {
        _extends(params[targetParamName], clientInfo);
      } else {
        _extends(params, clientInfo);
      }
    } catch (e) {
      videojs.log("Some error on add ClientInfo.");
    }

    return params;
  }
  /**
   * Assign required params to params.
   * if @targetParamName is exist, @requiredParams assign to this property.
   *
   * @param {*} params params of request body
   * @param {*} requiredParams public parameter to assign params
   * @param {string} targetParamName the name of destination property to add requiredParams
   *
   * @return {*} new params object with required Parameters
   */
  ;

  _proto.addRequiredParams = function addRequiredParams(params, requiredParams, targetParamName) {
    var requiredParameter = {};

    try {
      if (requiredParams && requiredParams.length > 0) {
        requiredParams.map(function (param) {
          requiredParameter[param.modelName || param.name] = param.value;
        });
      }

      if (targetParamName) {
        _extends(params[targetParamName], requiredParameter);
      } else {
        _extends(params, requiredParameter);
      }
    } catch (e) {
      videojs.log("Some error on add RequiredParams.");
    }

    return params;
  }
  /**
   * Add extra header request to xhr headers property
   *
   * @param {*} headers object of extra http headers
   *
   * @return {*} object of http header
   *
   */
  ;

  _proto.getHeaders = function getHeaders(headers) {
    if (headers === void 0) {
      headers = {};
    }

    var _headers = {
      "Content-Type": "application/json"
    };

    if (headers) {
      _extends(headers, _headers);
    }

    return headers;
  }
  /**
   * Calculate value
   *
   * @param {*} propertyValue propertyValue
   * @param {*} params params
   *
   * @return {*} calculated value
   */
  ;

  _proto.calculateValue = function calculateValue(propertyValue, params) {
    var value = propertyValue;
    value = this.fgObject.calculateParam(value, params);
    return value;
  }
  /**
   * Calculate FG-* variable and fill properties
   *
   * @param {*} params params of request body
   *
   * @return {*} filled property with true value
   */
  ;

  _proto.getParamsValue = function getParamsValue(params) {
    var _this = this;

    var _params = _extends({}, params);

    Object.keys(_params).map(function (property) {
      var _type = typeof _params[property];

      if (_type === "object") {
        _params[property] = _this.getParamsValue(_params[property]);
      } else if (_type === "string") {
        _params[property] = _this.calculateValue(_params[property], _params);
      }
    });
    return _params;
  }
  /**
   * Create request body from option's config and requiredParams property
   * also add client Information to this model if you want ignore this property must be add "clientInfo:false" in each action block.
   *
   * @param {*} action action model
   *
   * @return {*} return new body object.
   */
  ;

  _proto.getBody = function getBody(action) {
    var body = action.body;

    var _this$getOptions = this.getOptions(),
        requiredParameter = _this$getOptions.requiredParameter;

    if (body && body.params) {
      var opt = {
        ignoreClientInfo: false,
        ignoreRequireParameter: false,
        hasTargetParam: false,
        targetParamName: null
      };

      if (body.config) {
        var config = body.config;

        if (config.targetParam) {
          opt.hasTargetParam = true;
          opt.targetParamName = config.targetParam;
        }

        if (config.ignore && config.ignore.requiredParameter) {
          opt.ignoreRequireParameter = true;
        }

        if (config.ignore && config.ignore.clientInfo) {
          opt.ignoreClientInfo = true;
        }
      } // clone params object


      var _params = _extends({}, body.params);

      var targetParamName = null;

      if (opt.hasTargetParam) {
        targetParamName = opt.targetParamName;
      }

      if (!opt.ignoreClientInfo) {
        _params = this.addClientInfo(_params, targetParamName);
      }

      if (requiredParameter && requiredParameter.length > 0 && !opt.ignoreRequireParameter) {
        _params = this.addRequiredParams(_params, requiredParameter, targetParamName);
      }

      _params = this.getParamsValue(_params);
      return _params;
    }
  }
  /**
   * Register multi fuction on player and call same function
   *
   * @param {Array} eventNames array of string include event name's to bind player listener.
   * @param {Function} _function function
   */
  ;

  _proto.multiEvent = function multiEvent(eventNames, _function) {
    var _this2 = this;

    if (eventNames === void 0) {
      eventNames = [];
    }

    if (this.hasPlayer()) {
      if (eventNames && eventNames.length > 0) {
        eventNames.map(function (eventName) {
          _this2.player.on(eventName, function (props) {
            _function(props);
          });
        });
      }
    }
  } // #endregion
  // #region Main_Action

  /**
   * This method request to distination server with information come from 'altAction' parameter on option.
   *
   * @param {*} body body of request
   */
  ;

  _proto.callAltAction = function callAltAction() {
    var _this3 = this;

    var _this$getOptions2 = this.getOptions(),
        altAction = _this$getOptions2.altAction;

    try {
      if (altAction && altAction.length > 0) {
        altAction.map(function (action) {
          try {
            if (action) {
              var config = {
                url: action.url,
                method: action.method,
                headers: _this3.getHeaders(action.headers),
                body: JSON.stringify(action.body ? _this3.getBody(action) : {})
              };

              if (action.call && typeof action.call === "function") {
                action.call(config);
              } else {
                videojs.xhr(config, function (err, resp, _body) {
                  if (resp.statusCode !== 200 || resp.statusCode !== 201) {
                    if (err) {
                      videojs.log("Some error on call action method");
                    } else {
                      videojs.log("Some error on call action method");
                    }
                  }
                });
              }
            }
          } catch (e) {
            videojs.log("failed on call " + action.name + " request.");
          }
        });
      }
    } catch (e) {
      videojs.log("Some error on call alternative action's.");
    }
  }
  /**
   * This method request to distination server with information come from 'action' parameter on option.
   *
   */
  ;

  _proto.callAction = function callAction() {
    var _this$getOptions3 = this.getOptions(),
        action = _this$getOptions3.action;

    var that = this;

    try {
      if (action) {
        var config = {
          url: action.url,
          method: action.method,
          headers: this.getHeaders(action.headers),
          body: JSON.stringify(action.body ? this.getBody(action) : {})
        };

        if (action.call && typeof action.call === "function") {
          try {
            action.call(config).catch(function (e) {
              that.callAltAction();
            });
          } catch (e) {
            action.call(config);
          }
        } else {
          videojs.xhr(config, function (err, resp, _body) {
            if (resp.statusCode !== 200) {
              that.callAltAction();

              if (err) {
                videojs.log("Some error on call action method");
              }
            }
          });
        }
      }
    } catch (e) {
      this.callAltAction();
    }
  } // #endregion

  /**
   * Pause send data
   * ----------------------
   */
  ;

  _proto.pauseSend = function pauseSend() {
    this.isPaused = true;
  }
  /**
   * Resume send data
   * ----------------------
   */
  ;

  _proto.resumeSend = function resumeSend() {
    this.isPaused = false;
  }
  /**
   * on Load meta data
   * ----------------------
   */
  ;

  _proto.onLoadedMetaData = function onLoadedMetaData() {
    var _this4 = this;

    this.player.one("loadedmetadata", function () {
      _this4.fgObject.setInitRequest(true);

      _this4.callAction();
    });
  }
  /**
   * on Playing
   * ----------------------
   */
  ;

  _proto.onPlaying = function onPlaying() {
    var _this5 = this;

    this.player.one("play", function () {
      var time = 0;
      var that = _this5;
      var intervalId = window$1.setInterval(function () {
        if (!that.isPaused) {
          time++;

          if (time % 60 === 0) {
            if (that.fgObject.hasIntialRequest) {
              that.fgObject.setInitRequest(false);
            }

            time = 0;
            that.callAction();
          }
        }
      }, _this5.options.intervalTime);

      _this5.setIntervalId(intervalId);
    });
    this.player.on("dispose", function () {
      window$1.clearInterval(_this5.getIntervalId());

      _this5.setIntervalId(-1);
    });
  }
  /**
   * Same Function Events
   * ----------------------
   */
  ;

  _proto.sameFunctionEvents = function sameFunctionEvents() {
    var _this6 = this;

    this.multiEvent(["ended", "waiting"], function (props) {
      if (props.type === "ended") {
        // show extra details
        _this6.pauseSend();
      }

      props.preventDefault();
    });
    this.multiEvent(["play", "adplay"], function (props) {
      _this6.resumeSend(); //  noSleep active

    });
    this.multiEvent(["pause", "adpause"], function (props) {
      _this6.pauseSend(); //  noSleep disable

    });
  }
  /**
   * Initialize Handler class for player.
   * ----------------------
   */
  ;

  _proto.init = function init() {
    if (this.player) {
      this.sameFunctionEvents();
      this.onLoadedMetaData();
      this.onPlaying();
    }
  };

  return Handler;
}();

var Plugin = videojs.getPlugin("plugin"); // Default options for the plugin.

var defaults = {};
/**
 * An advanced Video.js plugin. For more information on the API
 *
 * See: https://blog.videojs.com/feature-spotlight-advanced-plugins/
 */

var Analytics = /*#__PURE__*/function (_Plugin) {
  _inheritsLoose(Analytics, _Plugin);

  /**
   * Create a CollectData plugin instance.
   *
   * @param  {Player} player
   *         A Video.js Player instance.
   *
   * @param  {Object} [options]
   *         An optional options object.
   *
   *         While not a core part of the Video.js plugin architecture, a
   *         second argument of options is a convenient way to accept inputs
   *         from your plugin's caller.
   */
  function Analytics(player, options) {
    var _this;

    // the parent class will add player under this.player
    _this = _Plugin.call(this, player) || this;
    _this.options = videojs.mergeOptions(defaults, options);
    var handler = new Handler(player);
    handler.setOptions(options);

    _this.player.ready(function () {
      _this.player.addClass("vjs-analytics");

      handler.init();
    });

    return _this;
  }

  return Analytics;
}(Plugin); // Define default values for the plugin's `state` object here.


Analytics.defaultState = {}; // Include the version number.

Analytics.VERSION = version; // Register the plugin with video.js.

videojs.registerPlugin("Analytics", Analytics);

module.exports = Analytics;
