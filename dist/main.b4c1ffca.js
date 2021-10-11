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
})({"epB2":[function(require,module,exports) {
var html = document.querySelector("#html");
var style = document.querySelector("#style"); //同时把这个代码写入html和css当中

var string = "/* \u4F60\u597D,\u6211\u53EB\u5C0F\u5F90\n * \u63A5\u4E0B\u6765\u6211\u8981\u6F14\u793A\u4E00\u4E0B\u6211\u7684\u524D\u7AEF\u529F\u5E95\n * \u9996\u5148\u6211\u5F97\u51C6\u5907\u4E00\u4E2Adiv\n * */ \n#div1{\n    \n    border: 1px solid red;\n    height: 200px;\n    width: 200px;\n}\n/* \u63A5\u4E0B\u6765\u6211\u628Adiv\u53D8\u6210\u4E00\u4E2A\u516B\u5366\u56FE\n * \u6CE8\u610F\u5566\u5566\u5566\u5566\n * \u9996\u5148\uFF0C\u628Adiv\u53D8\u6210\u4E00\u4E2A\u5706\n */\n#div1{\n    border-radius: 50%;\n    box-shadow: 0 0 3px rgba(0,0,0,0.5);\n    border:none;\n}\n/* \u516B\u5366\u662F\u9634\u9633\u5F62\u6210\u7684\n * \u4E00\u9ED1\u4E00\u767E\n * */\n#div1{\n    background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(0,0,0,1) 50%, rgba(0,0,0,1) 100%);\n}\n/* \u4E0B\u9762\u52A0\u4E24\u4E2A\u98CE\u706B\u8F6E */\n#div1::before{\n    width: 100px;\n    height: 100px;\n    top: 0;\n    left: 50%;\n    transform: translateX(-50%);\n    background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 25%, rgba(0,0,0,1) 25%, rgba(0,0,0,1) 100%);\n    border-radius: 50%;\n}\n#div1::after{\n    width: 100px;\n    height: 100px;\n    bottom: 0;\n    left: 50%;\n    transform: translateX(-50%);\n    background: radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 25%, rgba(255,255,255,1) 25%, rgba(255,255,255,1) 100%);\n    border-radius: 50%;\n}\n";
var string2 = '';
var n = 0;

var step = function step() {
  setTimeout(function () {
    // console.log(string[n])
    // console.log(n) //length不-1，53的时候就undefined了
    // console.log(string.length) //54
    //如果是回车 
    //如果不是回车就照搬
    // string2 += (string[n] === '\n' ? "<br>" : string[n])
    if (string[n] === "\n") {
      string2 += "<br>";
    } else if (string[n] === " ") {
      //改缩进 在html里，无数个空格也会被改成一个空格
      string2 += "&nbsp;";
    } else {
      string2 += string[n];
    }

    html.innerHTML = string2; // style.innerHTML = string2 直接style里加内容，会把nbsp这些html标签写入css,变通一下用subString()

    style.innerHTML = string.substring(0, n); //直接这样写还是有一些问题，html的文字可能对样式有些影响，所以给文字加注释

    window.scrollTo(0, 99999); //写完就滚一下

    html.scrollTo(0, 99999);

    if (n < string.length - 1) {
      //如果不是最后一个就继续
      n += 1;
      step();
    } else {
      console.log('好啦，调完了');
    }
  }, 50);
};

step(); // 有个问题，也没如果没有足够大去容纳我们的代码，用户不拖拽就看不到效果，该怎么解决？ window.scrollTo(0,99999);
// 怎么设置换行,到了页面自动折行 word-break:break-all;
// 手机页面会出现八卦图被挡的情况，使用媒体查询 
// 手机很窄但手机很长，可以使用上下结构 
// style的innerHtml是可以被改写的,如以下代码

/* setTimeout(()=>{
    style.innerHTML = `
    body{
      color:red;
    }
    `
},1000)*/
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.b4c1ffca.js.map