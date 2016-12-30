//获取图片素材
define(function(require,exports,module){
    var allObj = require('./objConfig');
    var ifun   = require('./ifunction');
    var params = ifun.getParams('parmes');

    var uploadImgs = function(){
        
        var $imgResourcesBox = $(".imgResourcesBox");
        
        $("#upResources").zyUpload({
            width            :   "100%",                 // 宽度
            height           :   "auto",                 // 高度
            itemWidth        :   "120px",                 // 文件项的宽度
            itemHeight       :   "100px",                 // 文件项的高度
            url              :   "/loushus/upload/source?appId="+params.aid+"&sourceTypeId=1",  // 上传文件的路径
            multiple         :   true,                    // 是否可以多个文件上传
            dragDrop         :   true,                    // 是否可以拖动上传文件
            del              :   true,                    // 是否可以删除文件
            finishDel        :   true,                    // 是否在上传文件完成后删除预览
            /* 外部获得的回调接口 */
            onSelect: function(files, allFiles){                    // 选择文件的回调方法
//                console.log("当前选择了以下文件：");
//                console.log(files);
                for(a in files){
                    console.log(files[a].size);    
                    if(files[a].size > 1024*2000){
                        alert("您上传的图片大于2M，请修改");    
                    }
                }
    //            console.log("之前没上传的文件：");
    //            console.log(allFiles);
            },
            onDelete: function(file, surplusFiles){                     // 删除一个文件的回调方法
    //            console.log("当前删除了此文件：");
    //            console.log(file);
    //            console.log("当前剩余的文件：");
    //            console.log(surplusFiles);
            },
            onSuccess: function(file,response){                    // 文件上传成功的回调方法
                //console.info("此文件上传成功：");
                //console.log(file);
                //console.log("上传的路径是：",response);
                response = eval("("+response+")");
                //console.log(response);
                $imgResourcesBox.append('<li><a href="javascript:void(0)" class="del" data-id="'+response[0].id+'"><i class="fa fa-close"></i></a><img realsize="'+response[0].width+','+response[0].height+'" _src="'+response[0].filePath+'" src="'+response[0].cutPath+'"></li>');
                    
            },
            onFailure: function(file){                    // 文件上传失败的回调方法
                //console.log("此文件上传失败：");
    //            console.log(file);
            },
            onComplete: function(responseInfo){           // 上传完成的回调方法
                //console.log("文件上传完成");
                //console.log(responseInfo);
                
            }
        });
        
    }
    
    //暴露接口
    exports.uploadImgs = function(){
        uploadImgs();
    }
    
});