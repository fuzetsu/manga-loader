// METADATA
// name: chuixue
// match: ^https?://www.chuixue.com/manhua/[0-9]+/[0-9]+.html

var impl_src = {
  img: '#qTcms_pic',
  next: '#qTcms_pic',
  curpage: '#qTcms_select_i',
  numpages: '#qTcms_select_i',
  pages: function(url, num, cb, ex) {
    if(!this._pages) {
      this._pages = W.qTcms_S_m_murl.split('$qingtiandy$');
    }
    cb(this._pages[num - 1], num);
  },
  nextchap: function() {
    return W.qTcms_Pic_nextArr;
  },
  wait: '#qTcms_pic'
}