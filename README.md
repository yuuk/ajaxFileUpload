# ajaxFileUpload
原生JS formData 文件异步上传，不支持IE10及以下版本浏览器，仅供学习交流使用~
# 用法
```javascript
<script type="text/javascript">
    new ajaxFileUpload({
        url: './upload.php',
        fileInput: document.getElementById('pic'),
        isMultiple: true,
        autoUpload: true,
        uploadSuccess: function(data){
            data = JSON.parse(data);
            if(data.status == 1){            
                for(var i=0; i<data.files.length; i++){
                    var img = new Image();
                    img.src = data.files[i];
                    document.getElementById('js-imgHolder').appendChild(img);
                }
            }   
        }
    }).init();
</script>
```

#参数
| 参数名         | 说明          | 
| ------------- |:-------------:|
| url      | 上传接口地址 |
| fileInput      |   文件域DOM元素    |
| formData | 上传时的附加参数 |
| isMultiple | 是否开启多文件上传 |
| autoUpload | 是否支持自动上传 |
| uploadSuccess | 上传完毕的回调 |
