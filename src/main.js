const $siteList = $('.siteList')
const x = localStorage.getItem('x')
const xObj = JSON.parse(x) || [] //把x变回对象
const hashMap = xObj || [{ logo: '', url: '' },]
// hashMap.splice(0, 1)//测试用
const simplifyUrl = (url) => {
  return url.replace('https://', '')
    .replace('http://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')  //删除/开头内容
}
const render = function () {
  $siteList.find('li:not(.last)').remove()
  hashMap.forEach((node, index) => {
    const $li = $(
      `<li>
          <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
            <div class="close">
              <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-close"></use></svg>
            </div>
          </div>      
      </li>`).insertBefore('li.last')
    $li.on('click', () => {
      window.open(node.url)
    })
    $li.on('click', '.close', (e) => { //停止冒泡并删除这个网站
      e.stopPropagation()
      hashMap.splice(index, 1)
      render()
    })
  });
}
render();
$('.addButton')
  .on('click', () => {
    let url = window.prompt('请输入需要添加的网址')
    if (url.indexOf('http') !== 0) {
      url = 'https://' + url
    }
    hashMap.push({
      logo: simplifyUrl(url)[0],
      url: url
    })
    render();
  });

window.onbeforeunload = () => { //页面关闭前触发
  const string = JSON.stringify(hashMap)  //把对象变字符串
  localStorage.setItem('x', string) //在本地存储中设置一个x，值为string
}

$(document).on('keypress', (e) => { //键盘事件：按下首字母打开网页
  const key = e.key
  for (i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url)
    }
  }
})