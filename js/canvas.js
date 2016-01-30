$(function(){
    var box = $('.box');
    var copy = $(".copy");
    var canvas = $("canvas");
    var cobj =canvas[0].getContext("2d");
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })
    $(".hasson").hover(function(){
        $(this).find(".son").finish();
        $(this).find(".son").fadeIn(200);
    },function(){
        $(this).find(".son").finish();
        $(this).find(".son").fadeOut(200);
    })

    var obj= new shape(copy[0],canvas[0],cobj,$(".xp"),$(".selectarea"));
    $(".hasson:eq(1)").find(".son li").click(function(){
        obj.shapes = $(this).attr("data-role");
        $(this).parent().slideUp();
        $(".hasson:eq(1) .choose").css("display","block");
        $(".hasson:eq(1) .choose").val($(this).text());
        if(obj.shapes=="pen"){
            obj.pen();
        }
        else{
            obj.draw();
        }

    })
    $(".color").click(function(){
        $(this).find("input").show();
    })


    $(".hasson:eq(2)").find("li").click(function(){
        obj.type=$(this).attr("data-role")
        $(this).parent().slideUp();
        $(".hasson:eq(2) .choose").css("display","block");
        $(".hasson:eq(2) .choose").val($(this).text());
        //$(".hasson").html($(this).html())
    })
    $(".hasson:eq(3)").find("li").click(function(){
        console.log($(".hasson:eq(3) div"));
        //$(".hasson:eq(3) div").html("+线条宽度:"+$(this).text());
        $(".hasson:eq(3) .choose").css("display","block");
        $(".hasson:eq(3) .choose").val($(this).text());
        obj.lineWidth=$(this).attr("data-role");
        $(this).parent().slideUp();

    })
    $(".line-color input").change(function(){
        obj.borderColor=$(this).val();
    })
    $(".fill-color input").change(function(){
        obj.bgcolor=$(this).val();
    })
    //橡皮
    var objxp=$(".eraser")
    $(".xpsize li").click(function(){
    $(this).parent().slideUp();
     var w=$(this).attr("data-role");
        var el=$(".hasson:eq(4) .choose");
        el.css("display","block");
        el.val($(this).text());
        //if(el.val=""){
        //    el.css("display","none")
        //}
        objxp.css({
            width:w,
            heigth:w
        })
        obj.xp(objxp,w);
    })
    //文件

    $(".hasson:eq(0) .son").find("li").click(function(){
        var index = $(this).index("li");
        console.log(index);

        if(index== 1){
            if(obj.history.length>0){
                if(confirm("确认保存?")){
                    location.href=canvas[0].toDataURL().replace("data:image/png","data:steam/octet");
                }
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
        }else if(index==2){
            cobj.clearRect(0,0,canvas[0].width,canvas[0].height);
            if(obj.history.length==0){
                alert("can not go");
                return;
            }
            obj.history.pop();
            var data =obj.history[obj.history.length-1];
            if(data){
                cobj.putImageData(data,0,0);
            }else{
                return;
            }


        }else if(index==3){
            //data:stream/octet   data:image
            location.href=canvas[0].toDataURL().replace("data:image/png","data:steam/octet");
        }
    })

    $(".select").click(function(){
        obj.select($(".selectarea"));
    })

})