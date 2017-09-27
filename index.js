window.onload = function() {
  waterFall('main', 'colbox');
  var dataInt = {
    dataImg: [
      {'src': '0.jpg'},
      {'src': '1.jpg'},
      {'src': '2.jpg'},
      {'src': '3.jpg'},
      {'src': '4.jpg'},
      {'src': '5.jpg'}
    ]
  }
  window.onscroll = function() {
    var oParent = document.getElementById('main');
    if(checkScrollSlide('main', 'colbox')) {
      for (var i = 0; i < dataInt.dataImg.length; i++) {
        var ocolBox = document.createElement('div');
        ocolBox.className = 'colbox';
        oParent.appendChild(ocolBox);
        var oPic = document.createElement('div');
        oPic.className = 'pic';
        ocolBox.appendChild(oPic);
        var oImg = document.createElement('img');
        oImg.src = 'images/' + dataInt.dataImg[i].src;
        oPic.appendChild(oImg)
      }
      waterFall('main','colbox')
    }
  }
}
// 瀑布流 固定宽度不固定高度
function waterFall(parent, box) {
  // 瀑布流最大父元素
  var oParent = document.getElementById(parent);
  // 每一个单独的盒子
  var oBox = getByClass(oParent, box);
  var oBoxW = oBox[0].offsetWidth;
  var docW = document.documentElement.clientWidth;
  // 瀑布流的列数
  var cols = Math.floor(docW/oBoxW);
  // 设置main的宽度
  oParent.style.cssText = 'width:' + oBoxW * cols + 'px;margin: 0 auto;' ;
  // 存放每一行高度的数组
  var hArr = [];
  for (var i=0; i<oBox.length; i++) {
    if (i < cols) {
      hArr.push(oBox[i].offsetHeight);
    } else {
      // 第二行第一个box应该存放在第一行高度最小的box下方
      // 这一行中高度的最小值
      var minH = Math.min.apply(null, hArr);
      // 最小高度box的索引
      var index = getMinhIndex(hArr, minH);
      // 最小高度box距离父元素左侧的距离 即下一张图片的left值
      var minHleft = oBoxW * index;
      // var minHleft = oBox[index].offsetLeft;
      // 第二行第一张图片应该存放的位置
      oBox[i].style.cssText = 'position:absolute;top:' + minH + 'px; left:' + minHleft + 'px;';
      // 更新这一列数组的高度 最小高度box的新高度 = 原高 + 新加box的高
      hArr[index] += oBox[i].offsetHeight;
    }
  }
}
// 根据class获取元素
function getByClass(parent, clsName) {
  var clsArr = [];
  var oEle = parent.getElementsByTagName('*');
  for (var i=0; i<oEle.length; i++) {
    if (oEle[i].className == clsName) {
      clsArr.push(oEle[i]);
    }
  }
  return clsArr;
}
// 获取数组中最小高度图片的索引值
function getMinhIndex(arr, val) {
  for (var i in arr) {
    if (arr[i] === val) {
      return i;
    }
  }
}
// 检测是否具备了滚动条加载数据块的条件
function checkScrollSlide (parent, box) {
  // 通过最后一个box来判段
  // 当滚动条高度 + 窗口高度 >= 最后box到父元素顶部距离 + 最后box自身的一半时 开始加载新的数据块
  var oParent = document.getElementById(parent);
  var oBox = getByClass(oParent, box);
  // 获取最后box块距父元素顶部的距离 + 自身高度的一半
  var lastBoxH = oBox[oBox.length-1].offsetTop + Math.floor(oBox[oBox.length-1].offsetHeight);
  // 获取 滚动高度
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  // 获取 window窗口高度
  var winH = document.body.clientHeight || document.documentElement.clientHeight;
  return (lastBoxH <= scrollTop + winH) ? true : false;
}