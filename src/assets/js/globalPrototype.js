/* eslint-disable prettier/prettier */
// 全局注册方法
import fetch from "./fetch";
import routes from "@/router";
import store from "@/store";

export default {
  install(Vue) {
    (Vue.prototype.elLoading = null),
      (Vue.prototype.axiosPost = function(url, data, call, timeout = 10000) {
        return fetch({
          url: url,
          method: "post",
          data: data || {},
          callback: call || "",
          timeout
        });
      });
    // data 为obj类型
    Vue.prototype.axiosGet = function(url, data, call, timeout = 10000) {
      let params = "";
      if (data) {
        params = Vue.prototype.setParams(data);
        url = url + "?" + params;
      }
      return fetch({
        url: url,
        method: "get",
        callback: call || "",
        timeout
      });
    };
    // put  --> /workflow/{state}/{code}
    Vue.prototype.axiosPut = function(url, call) {
      return fetch({
        url: url,
        method: "put",
        callback: call || ""
      });
    };
    // 返回当前环境网关链接
    Vue.prototype.gatewayUrl = function() {
      console.log(fetch.defaults.baseURL);
      return fetch.defaults.baseURL;
    };
    //统一按钮级页面返回列表页面方法
    Vue.prototype.routeBack = function(path, isRefresh) {
      store.dispatch("removeTabsMenue", {
        path: window.location.href,
        isJump: "notJump"
      });
      let aimsUrl = "";
      if ((typeof path).toLowerCase() == "string") {
        aimsUrl = window.location.origin + path;
      }
      if ((typeof path).toLowerCase() == "object") {
        if (path.hasOwnProperty("query")) {
          aimsUrl =
            window.location.origin +
            path.path +
            Vue.prototype.setParams(path.query);
        } else if (path.hasOwnProperty("params")) {
          aimsUrl =
            window.location.origin +
            path.path +
            Vue.prototype.setParams(path.params);
        } else {
          aimsUrl = window.location.origin + path.path;
        }
      }
      // console.log('aimsUrl---------->',aimsUrl)
      store.dispatch("removeCache", {
        cachePath: window.location.href,
        aimsUrl: aimsUrl,
        isRefresh: isRefresh ? true : false
      });
      routes.push(path);
    };
    Vue.prototype.getActiveTabsWidth = function() {
      let tabsActiveLocal = store.getters.tabsActiveLocal;
      // console.log('tabsActiveLocal---'+tabsActiveLocal)
      let tabs = document.getElementById("tabs-container");
      let pathWidth = 0;
      if (tabs) {
        for (let i = 0; i <= tabsActiveLocal; i++) {
          let citeView = tabs.getElementsByTagName("cite")[i];
          let spanView = null;
          if (citeView) {
            spanView = citeView.getElementsByTagName("span")[0];
            if (spanView) {
              pathWidth += Number(spanView.offsetWidth);
            }
          }
          // console.log(spanMenu.offsetWidth)
        }
      }
      return pathWidth + 40;
    };
    Vue.prototype.setParams = function(params) {
      //http://stackoverflow.com/questions/22678346/convert-javascript-object-to-url-parameters/22678423
      return Object.keys(params)
        .map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        })
        .join("&");
    };
    Vue.prototype.resetUrl = function(path) {
      if (path.indexOf("=") > -1) {
        let urlObj = path.split("=");
        path = "";
        urlObj.map((item, index) => {
          if (item.indexOf("&") > -1) {
            let reset =
              urlObj.length - Number(index) == 1
                ? ""
                : "&" + item.split("&")[1] + "=*";
            path += reset;
          } else if (index == 0) {
            path += item + "=*";
          }
        });
      }
      return path;
    };

    // 验证中文名称
    Vue.prototype.isChinaName = function(name) {
      const pattern = /^[\u4E00-\u9FA5]{1,6}$/;
      // console.log(pattern.test(name))
      return pattern.test(name);
    };

    // 验证手机号
    Vue.prototype.isPhoneNo = function(phone) {
      const pattern = /^1\d{10}$/;
      console.log(pattern.test(phone));
      return pattern.test(phone);
    };

    // 验证身份证
    Vue.prototype.isCardNo = function(card) {
      const pattern = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return pattern.test(card);
    };
    // 验证密码为 字母加数字
    Vue.prototype.isPassword = function(password) {
      const pattern = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,18}$/;
      return pattern.test(password);
    };
    // 验证 纯数字
    Vue.prototype.isInumber = function(number) {
      const pattern = /^[0-9]*$/;
      return pattern.test(number);
    };
    // 验证 纯数字
    Vue.prototype.isDecimal = function(number, digit) {
      //默认为 1位小数
      digit = digit || 1;
      let pattern = /^[0-9]+(?:\.[0-9]{1})?$/;
      if (digit == 1) {
        pattern = /^[0-9]+(?:\.[0-9]{1})?$/;
      } else if (digit == 2) {
        pattern = /^[0-9]+(?:\.[0-9]{1,2})?$/;
      } else if (digit == 3) {
        pattern = /^[0-9]+(?:\.[0-9]{1,3})?$/;
      } else {
        pattern = /^[0-9]+(?:\.[0-9]{1,4})?$/;
      }
      return pattern.test(number);
    };
    // 邮箱检验
    Vue.prototype.isEmail = function(email) {
      const pattern = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
      return pattern.test(email);
    };
    // 字母或数字
    Vue.prototype.isNumbOrEn = function(str) {
      const pattern = /^[a-zA-Z\d]+$/;
      return pattern.test(str);
    };
    // 中文或字母或数字
    Vue.prototype.isCnOrNumbOrEn = function(str) {
      const pattern = /^[\u4E00-\u9FA5a-zA-Z\d]+$/;
      return pattern.test(str);
    };
    // 中文或字母
    Vue.prototype.isCnOrEn = function(str) {
      const pattern = /^[\u4E00-\u9FA5a-zA-Z]+$/;
      return pattern.test(str);
    };
    //纯字母
    Vue.prototype.isLetter = function(str) {
      const reg = /^[a-zA-Z]*$/;
      return reg.test(str);
    };
    //纯大写字母
    Vue.prototype.isCapitalLetter = function(str) {
      const reg = /^[A-Z]*$/;
      return reg.test(str);
    };
    //小写字母校验 + 数字
    Vue.prototype.isLowerEnNum = function(str) {
      const reg = /^[a-z0-9]*$/;
      return reg.test(str);
    };
    //小写字母校验 + 数字
    Vue.prototype.isLowerEn = function(str) {
      const reg = /^[a-z]*$/;
      return reg.test(str);
    };
    //字母大小写 + 数字
    Vue.prototype.isLetterNumb = function(str) {
      // const reg= /^[a-zA-Z][a-zA-Z0-9]*$/;
      const reg = /^[A-Z]+\d+$/;
      // console.log(reg.test(str))
      return reg.test(str);
    };
    //非符号
    Vue.prototype.isNoSign = function(str) {
      const reg = /^[\u4E00-\u9FA50-9A-Za-z]*$/;
      return reg.test(str);
    };
    //非字母
    Vue.prototype.isNoLetter = function(str) {
      const reg = /^[\u4E00-\u9FA50-9`~!@#$^&*()=+-|{}':;',\\[\\\].·<>/?~！～@#￥……&*（）——|{}【】‘；：”“'。，、？]*$/;
      return reg.test(str);
    };
    //不包含特殊表情符号
    Vue.prototype.isNoEmoji = function(str) {
      // eslint-disable-next-line no-useless-escape
      const reg = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;
      ///^[\u4E00-\u9FA50-9a-zA-Z`~!@#$^&*()+=\\-|{}':;',\\[\\\].·<>/?~！～@#￥……&*（）——|{}【】‘；：""”“'。，、？]*$/;
      return !reg.test(str);
    };
    // url
    Vue.prototype.isUrl = function(url) {
      const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?*'\\+&%$#=~_-]+))*$/;
      return reg.test(url);
    };
    //校验码 生成
    Vue.prototype.generateCode = function (length) {
         let selectChar = new Array(2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z');
         let code = ''; // 验证码载体
        for(let i=0;i<length;i++){
            let charIndex = Math.floor(Math.random()*32);
            code +=selectChar[charIndex];
        }
        return code;
    },
    Vue.prototype.numbCapital = function(str) {
      str = str + "";
      let len = str.length - 1;
      let idxs = [
        "",
        "十",
        "百",
        "千",
        "万",
        "十",
        "百",
        "千",
        "亿",
        "十",
        "百",
        "千",
        "万",
        "十",
        "百",
        "千",
        "亿"
      ];
      let num = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
      return str.replace(/([1-9]|0+)/g, function($, $1, idx) {
        // console.log('$---------------------')
        // console.log($)
        // console.log($1)
        // console.log(idx)
        // console.log(idxs[len-idx])
        let pos = 0;
        if ($1[0] != "0") {
          pos = len - idx;
          if (idx == 0 && $1[0] == 1 && idxs[len - idx] == "十") {
            return idxs[len - idx];
          }
          return num[$1[0]] + idxs[len - idx];
        } else {
          let left = len - idx;
          let right = len - idx + $1.length;
          if (Math.floor(right / 4) - Math.floor(left / 4) > 0) {
            pos = left - (left % 4);
          }
          if (pos) {
            return idxs[pos] + num[$1[0]];
          } else if (idx + $1.length >= len) {
            return "";
          } else {
            return num[$1[0]];
          }
        }
      });
    };

    Vue.prototype.getObjKey = function(obj) {
      // console.log('按钮权限--------');
      // console.log(obj)
      let list = [];
      for (let i in obj) {
        list.push(i);
      }
      // console.log('按钮权限--------');
      // console.log(list)
      return list;
    };
    // 对比两个时间相差天数 精确到秒
    // starTime ：开始时间  , endTime ： 结束时间   , quiteDay ： 相差天数
    (Vue.prototype.differTwoTime = function(starTime, endTime, quiteDay) {
      if (typeof quiteDay == "undefined") {
        quiteDay = 31;
      }
      console.log(starTime, endTime, quiteDay);
      let time = Vue.prototype.timeSubtraction(starTime, endTime);
      console.log(time);
      let starTime1 = starTime.split(" ")[1];
      let endTime1 = endTime.split(" ")[1];
      console.log(starTime1, endTime1);
      if (time.days >= quiteDay && time.seconds > 0) {
        return false;
      } else {
        return true;
      }
    }),
      
      (Vue.prototype.handleCheckCount = function(array, str) {
        let ObjOrArry = JSON.stringify(array);
        let keyStr = str; // 要计算的字符
        let regex = new RegExp(keyStr, "g"); // 使用g表示整个字符串都要匹配
        let result = ObjOrArry.match(regex);
        let keycount = !result ? 0 : result.length; // 获取key= 个数
        return keycount;
      }),
      (Vue.prototype.timeSubtraction = function(starTime, endTime) {
        let startDate = new Date(starTime.replace(/-/g, "/"));
        let endDate = new Date(endTime.replace(/-/g, "/"));
        let date = endDate.getTime() - startDate.getTime();
        let days = Math.floor(date / (24 * 3600 * 1000));
        // console.log('dateDiff-----'+dateDiff)
        //计算出小时数

        let leave1 = date % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
        let hours = Math.floor(leave1 / (3600 * 1000)) * 60 * 60;
        //计算相差分钟数
        let leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
        let minutes = Math.floor(leave2 / (60 * 1000)) * 60;
        //计算相差秒数
        let leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
        let seconds = Math.round(leave3 / 1000);
        seconds = seconds + hours + minutes;
        // console.log(" 相差 " + days + "天 " + ' 相差 ' + seconds + '秒')
        return { days: days, seconds: seconds };
      }),
      // 日期格式化 2018-08-08 08:08:08
      Vue.prototype.dateTImeReset = function (timeStamp) {
        if (timeStamp === '') {
            return
        }
        // let timestamp = Date.parse(new Date(stringTime));
        // let time = timestamp.getFullYear()+timestamp.getMonth()+timestamp.getDate()+" "+timestamp.getHours()+":"+timestamp.getMinutes()+":"+timestamp.getSeconds();
        let date = new Date(timeStamp.replace(/-/g, "/"));
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },
    // 日期格式化 2018-08-08 08:08:08
    Vue.prototype.nowDateTime = function () {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let minute = date.getMinutes();
      let second = date.getSeconds();
      minute = minute < 10 ? ('0' + minute) : minute;
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
  },
      Vue.prototype.formatDate = function(date) {
        let myyear = date.getFullYear();
        let mymonth = date.getMonth() + 1;
        let myday = date.getDate();
        if (mymonth < 10) {
            mymonth = "0" + mymonth;
        }
        if (myday < 10) {
          myday = "0" + myday;
        }
        return (myyear + "-" + mymonth + "-" + myday);
    },
      //拼接时间
      (Vue.prototype.timeForMat = function(count, type, haveToday) {
        // 拼接时间
        let time1 = new Date();
        if (!haveToday) {
          time1.setTime(time1.getTime() - 24 * 60 * 60 * 1000);
        } else {
          time1.setTime(time1.getTime());
        }
        let Y1 = time1.getFullYear();
        let M1 =
          time1.getMonth() + 1 >= 10
            ? time1.getMonth() + 1
            : "0" + (time1.getMonth() + 1);
        let D1 =
          time1.getDate() >= 10 ? time1.getDate() : "0" + time1.getDate();
        let timer1 = Y1 + "-" + M1 + "-" + D1; // 当前时间
        let time2 = new Date();
        if (!haveToday) {
          time2.setTime(time2.getTime() - 24 * 60 * 60 * 1000 * count);
        } else {
          time2.setTime(time2.getTime() - 24 * 60 * 60 * 1000 * (count - 1));
        }
        let Y2 = time2.getFullYear();
        let M2 =
          time2.getMonth() + 1 >= 10
            ? time2.getMonth() + 1
            : "0" + (time2.getMonth() + 1);
        let D2 =
          time2.getDate() >= 10 ? time2.getDate() : "0" + time2.getDate();
        let timer2 = Y2 + "-" + M2 + "-" + D2; // 之前的7天或者30天
        if (type == "date") {
          return [timer2, timer1];
        } else if (type == "dateTime") {
          return [timer2 + " 00:00:00", timer1 + " 23:59:59"];
        }
      }),
      (Vue.prototype.createDownloadUrl = function(url) {
        // //获得id为downLoadListFrame的frame
        let divFrame = window.parent.document.getElementById(
          "downLoadListFrame"
        );
        //判断是否存在，如果存在先移除，再重新创建
        if (divFrame != null) {
          window.parent.document.body.removeChild(divFrame);
        }
        //重新创建
        let iframe = document.createElement("iframe");
        iframe.setAttribute("id", "downLoadListFrame");
        addEvent("load", iframe, function() {});
        iframe.src = url;
        // iframe.src= "about:blank";
        document.body.appendChild(iframe);
        setTimeout(function() {
          iframe.src = "";
          divFrame = window.parent.document.getElementById("downLoadListFrame");
          divFrame.style.display = "none";
        }, 1000);
      });
    function addEvent(eventName, element, fn) {
      if (element.attachEvent) element.attachEvent("on" + eventName, fn);
      else element.addEventListener(eventName, fn, false);
    }
  }
};
