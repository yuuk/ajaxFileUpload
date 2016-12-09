/**
 * [ajaxFileUpload 图片上传]
 * @data: 2016-12-09
 * @author: yuuk
 */
(function(win){
    function ajaxFileUpload(options){
        options = options || {};
        this.url = options.url || ''; //上传地址
        this.fileInput = options.fileInput || ''; //文件域元素
        this.formData = options.formData || {}; //自定义上传参数
        this.isMultiple = options.isMultiple || false; //是否支持多文件上传(默认false)
        this.autoUpload = options.autoUpload || false; //是否自动上传
        this.uploadSuccess = options.uploadSuccess || function(){}; //上传成功回调
    }
    //简易ajax
    ajaxFileUpload.prototype.ajax = function(opts){
        //参数
        opts = opts || {};
        opts.url = opts.url || '';
        opts.method = opts.method.toUpperCase() || 'POST';
        opts.async = opts.async || true; 
        opts.data = opts.data || null;
        opts.beforeSend = opts.beforeSend || function () {};
        opts.success = opts.success || function () {};
        opts.fail = opts.fail || function () {};
        //创建XHR
        var xhr = new XMLHttpRequest();        
        xhr.open(opts.method, opts.url, opts.async);
        xhr.onreadystatechange = function(){     
            if(xhr.readyState == 4) {
                //请求成功
                if(xhr.status == 200){
                    opts.success(xhr.responseText);
                }
                //请求失败
                else{
                    opts.fail(xhr.statusText);
                }
            }
            else{
                opts.beforeSend(xhr);
            }
        };
        //发送数据
        xhr.send(opts.data);
    }
    //上传
    ajaxFileUpload.prototype.upload = function(){
        var _this = this,
            fileInput = this.fileInput,
            formData = new FormData(), // 初始化FormData对象
            fileArr = fileInput.files,
            fileInputName = fileInput.name; //获取name名
        
        //append图片数据
        if(fileInputName && fileArr.length){
            for(var i = 0; i < fileArr.length; i++){
                formData.append(fileInputName,fileArr[i]);
            }
        }

        //append额外参数
        if(_this.formData){
            for(var key in _this.formData){
                formData.append(key, _this.formData[key]);
            }
        }

        //上传接口
        _this.ajax({
            url: _this.url,
            method: "post",
            data: formData,
            success: function(data){
                _this.uploadSuccess(data);
            }
        });       
    }
    //事件绑定
    ajaxFileUpload.prototype.bindEvent = function(){
        var _this = this,
            _fileInput = this.fileInput;

        //判断是否支持多图上传
        if(this.isMultiple == true){
            _fileInput.setAttribute('multiple',true);
        }
        else{
            _fileInput.removeAttribute('multiple');
        }
        //触发change事件
        _fileInput.onchange = function(){
            //是否自动上传
            if(_this.autoUpload){
                _this.upload();
            }
        }
    }
    //初始化
    ajaxFileUpload.prototype.init = function(){
        this.bindEvent();
        return this;
    }

    win.ajaxFileUpload = ajaxFileUpload;
})(window);