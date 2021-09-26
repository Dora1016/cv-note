// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"main.js":[function(require,module,exports) {
// 通过css选择器找到元素
var demo = document.querySelector("#demo");
var string = "\n\u4F60\u597D\u5440\uFF0C\u6211\u662F\u524D\u7AEF\u5C0F\u767D\u767D\n\u63A5\u4E0B\u6765\u6211\u8981\u52A0\u6837\u5F0F\u5566\n\u6211\u8981\u52A0\u7684\u6837\u5F0F\u662F\nbody{\n    color:red;\n}\n"; // 解决换行符出现的问题
// 那能不能不在这里替换呢？去计时器函数看当前的字符是什么，发现一个回车就立即变成html标签，也就是一下子就变成4个字符
// string.substring(0,n)我就不能再是0-n了，因为顺序变了，之前是12345...现在就要1对4啦，那这个顺序就不一致了，
// 我们需要一个字符串来容纳我们要展示的字符串，所以有了字符串2

var string2 = ''; // 注意回车在html里会变成空格，我们要把回车变成html里面的回车string.replace('把啥'，'变啥')
// 但是replace之后把第一个回车变成br,需要使用正则表达式//g
// string = string.replace(/\n/g, '<br>')  
// 当换行还是没有出现时，就打印那个字符出了问题string[n]
// 然鹅换行时出现了，但是！！！因为我们用的是innerHtml,就一定会出现html标签<b会被用户看到，等加了r html才发现这是个换行符，为时已晚吖
// console.log(string.length)   打印方便看问题
// charCodeAt可以得出一个Unicode字符编码
// demo.innerHTML=string[n] //初始值
// substring接受两个参数，从哪到哪
// let n = 0  //用一个变量等于0 0的好处是可以当作下标
// 这一句话是有问题的，我们做的所有操作只能影响后面的，如果第一句话里面有回车，
// 我是不是就不能做一遍，除非我在外面再判断一下是不是回车，代码就重复了，
// 所以我们得想办法把下面一句代码放在计时器里面，怎么放呢？先直接删掉，那么n就不从0开始，从-1开始
// demo.innerHTML=string.substring(0,n)
// 为什么从-1开始呢？最开始你自己写n是0，那么计时器里n+1，就是从1开始了。然而0那就是没人做了
// 是-1的话，计时器就是从0开始

var n = -1; // 把1变成2 demo.innerHTML = 2（setTimeout只有变一次效果）
// 不停的变 |1、用一个变量等于1 |2、初始值就是n |3、setInterval可以一直变

/* setInterval(()=>{
     n+=1
     demo.innerHTML=n
},1000)*/
//老手不用interval，老手用setTimeout递归能够实现同样的效果，好处是可以随时停止

var step = function step() {
  /* console.log('1秒钟之后显示加1')   打印一下帮助理解
     setTimeout( ()=>{
         console.log(n)  //n=10 直接写n>=string.length，n为10之后还是会往下走，n就是11了，内容还是undefined,
         这时候要打印看问题了,打印一个n和字符长度
         写出n就会出现问题.一种写出n+1就能解决问题了,第二种挪位置，
         看下面代码如果你不知道是n还是n+1，两个都试一试
         
         n+=1
         demo.innerHTML=string.substring(0,n) 
         if(n>=string.length){   
              return
         }  
         
         //如果是n+1，为什么写n+1呢，是为了解决一开始demo.innerHTML=string[n]依次打印最后结果是n为11时，出现undefined,
         所以下面两行代码你不能在这里待着吖，如果是substring就没这个问题，不过n是会走到11
          n+=1
          demo.innerHTML=string.substring(0,n) 
         //
          
         step()
      
          // if(n<string.length){
              step() 
             }else{
              console.log('我累了，调不动自己了')  
             }     //委婉写法，不过会往下走，内容就是undefined // 
      
     },1000)
  */
  //优化一下代码，上面的太复杂了，当作自己笔记看
  setTimeout(function () {
    console.log(n);
    n += 1; // console.log(string[n])

    if (string[n] === '\n') {
      //如果是回车
      string2 = string2 + "<br>";
    } else {
      //如果不是回车就照搬
      string2 = string2 + string[n];
    }

    demo.innerHTML = string2; // demo.innerHTML=string.substring(0,n)  不这么写了
    //console.log(string2)

    if (n < string.length) {
      step();
    } else {
      console.log('好啦，调完了');
    }
  }, 100);
};

step(); // 为啥是递归呢 自己调用自己，看下面代码

/*  setTimeout( ()=>{
       n+=1
       demo.innerHTML=n
       step()
    
        setTimeout( ()=>{
        
            step()
    
        },1000)
            setTimeout( ()=>{
            
                step() 
        
            },1000)
                setTimeout( ()=>{n
               
                   step()
            
                },1000)
    },1000) */
// 如果多写两次次step() 结果为1 3  2不见了

/*  let step = () => {
        console.log('1秒钟之后显示加1')
        setTimeout( ()=>{
            n+=1
            demo.innerHTML=n
        
        },1000)
    }
step() =>1变2
step() =>2不会变3 
因为时间是错的，由于你两次设置setTimeout都是1s之后，
就好像你在睡觉之前跟手机说给我定一个6小时之后的闹钟，
然后你马上又说了一句给我定一个6小时后的闹钟
结果手机会在6小时之后响两次闹钟
这个也一样，你第一次说我在1s之后把1变成2，
然后你第二次又说我要在1s之后把2变成3
所以最后的结果是1变成2马上变成3，中间没有那个过程
不能step再step,除非你是第一次step() 1000,第二次是step() 2000才可能
*/
},{}],"../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "1674" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../AppData/Local/Yarn/Data/global/node_modules/parcel/src/builtins/hmr-runtime.js","main.js"], null)
//# sourceMappingURL=/main.1f19ae8e.js.map