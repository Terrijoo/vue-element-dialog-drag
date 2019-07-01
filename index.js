"use strict";
var vueElementDialogDraggable = {}
vueElementDialogDraggable.install = function(Vue, options){

  Vue.directive('draggable', {

    bind : function(el, binding, vnode) {
      console.log(el);
      if (binding.value) {
        var dlg = el.getElementsByClassName("el-dialog")[0];
        var title = el.getElementsByClassName("el-dialog__title")[0];
        title.style.userSelect="none";
        title.style["-ms-user-select"] = "none";
        title.style["-moz-user-select"] = "none";
        title.style.cursor="default";

        dlg.offsetX = 0;
        dlg.offsetY = 0;

        var move = function(e){
          dlg.style.marginLeft = '0px';
          dlg.style.marginTop = '0px';
          if (e.pageX - dlg.offsetX >= 0 && window.innerWidth >= (e.pageX + dlg.clientWidth - dlg.offsetX)) {
            dlg.style.left = (e.pageX - dlg.offsetX) + 'px';
          } else if (e.pageX - dlg.offsetX < 0) {
            dlg.style.left = 0;
          } else {
            dlg.style.left = dlg.clientWidth + 'px';
          }
          if (e.pageY >= 0 && window.innerHeight >= (e.pageY + dlg.clientHeight - dlg.offsetY)) {
            dlg.style.top = (e.pageY - dlg.offsetY) + 'px';
          } else if (e.pageY < 0) {
            dlg.style.top = 0;
          } else {
            dlg.style.top = (window.innerHeight - dlg.clientHeight) + 'px';
            dlg.style.marginBottom = 0;
          }
          dlg.style.bottom = 'auto';
        }

        var up = function() {
          removeEventListener('mousemove', move);
          removeEventListener('mouseup', up);
        }

        var down = function(e){
          if (
            e.path[0] &&
            ['el-dialog__header', 'el-dialog__title'].includes(e.path[0].className)
          ) {
            dlg.offsetX = (e.pageX - dlg.offsetLeft);
            dlg.offsetY = (e.pageY - dlg.offsetTop );

            addEventListener('mousemove', move);
            addEventListener('mouseup', up);
          } else {
            return false;
          }
        }

        var header = el.getElementsByClassName("el-dialog")[0];
        header.addEventListener('mousedown', down);
      }
    }
  });
}

module.exports = vueElementDialogDraggable;
