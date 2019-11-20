import originJSONP from "jsonp";

/**
 * 封装jsonp
 * @param {*} url 原始的jsonp第一个参数是url，第二个参数是option，这里为了比较好写参数做了下封装
 * @param {obj} data 参数
 * @param {*} option jsonp的option
 */
function jsonp(url, data, option) {
  // 如果url没有？就加一个？拼接
  url += (url.indexOf("?") < 0 ? "?" : "&") + param(data);

  return new Promise((resolve, reject) => {
    // 原始jsonp的三个参数，url、option、回调函数
    originJSONP(url, option, (err, data) => {
      // 类似node的设计，如果err是null，表示成功，data是后端返回的数据
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    });
  });
}

export function param(data) {
  let url = "";
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : "";
    url += "&" + k + "=" + encodeURIComponent(value);
  }
  return url ? url.substring(1) : "";
}

export function feach(url, data) {
  // 这里返回一个promise对象
  return jsonp(url, data || {});
}
