function shape(canvas,canvas1,cobj,xpobj,selectobj){
    this.canvas=canvas;
    this.canvas1=canvas1;
    this.cobj=cobj;
    this.bgcolor="#fff";
    this.borderColor="#fff";
    this.lineWidth=1;
    this.type="stroke";
    this.shapes="line";
    this.history=[];
}
shape.prototype= {
    init: function () {
        this.cobj.fillStyle = this.bgcolor;
        this.cobj.strokeStyle = this.borderColor;
        this.cobj.lineWidth = this.lineWidth;
    },
    line: function (x, y, x1, y1) {
        var that = this;
        that.init();
        that.cobj.beginPath();
        that.cobj.moveTo(x, y);
        that.cobj.lineTo(x1, y1);
        that.cobj.stroke();
        that.cobj.closePath();
    },
    rect: function (x, y, x1, y1) {
        var that = this;
        that.init();
        that.cobj.beginPath();
        that.cobj.rect(x, y, x1 - x, y1 - y);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    arc: function (x, y, x1, y1) {
        var that = this;
        var r = Math.sqrt((x1 - x) * (x1 - x1) + (y1 - y) * (y1 - y));
        that.init();
        that.cobj.beginPath();
        that.cobj.arc(x, y, r, 0, Math.PI * 2);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    pen: function (){
        var that = this;
        that.canvas.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.init();
            that.cobj.beginPath();
            that.cobj.moveTo(startx,starty);
            that.canvas.onmousemove = function (e) {
                if (that.history.length > 0) {
                    that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that.cobj.lineTo(endx, endy);
                that.cobj.stroke();
                that[that.shapes](startx,starty,endx,endy);
            }
            that.canvas.onmouseup = function () {
                that.cobj.closePath()
                //that.history.push(that.cobj.getImageData(0, 0, that.canvas1.width, that.canvas1.height))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }

        }
    },
    five: function (x, y, x1, y1) {
        var that = this;
        that.init();
        that.cobj.beginPath();
        //that.cobj.moveTo(x, y);
        var r = Math.sqrt((x1 - x) * (x1 - x) + (y1 - y) * (y1 - y));
        var r1=r/3;
        that.cobj.moveTo(x+r,y);
        for(var i=1;i<10;i++){
            if(i%2==0){
                that.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r,y+Math.sin(i*36*Math.PI/180)*r)
            }else{
                that.cobj.lineTo(x+Math.cos(i*36*Math.PI/180)*r1,y+Math.sin(i*36*Math.PI/180)*r1)
            }

        }
        that.cobj.closePath();
        that.cobj[that.type]();
        //var m1 = r * sin(Math.PI() * 72 / 360);
        //var n1 = r * cos(Math.PI() * 72 / 360);
        //var m2 = r * cos(Math.PI() * 72 / 180);
        //var n2 = r * cos(Math.PI() * 72 / 180);
    },
//     roler:function(x,y,x1,y1){
        
//          var that = this;
//         var r = Math.sqrt((x1 - x) * (x1 - x1) + (y1 - y) * (y1 - y));
//         with (that.cobj){
//         that.init();
//         that.cobj.beginPath();
//         that.cobj.arc(x, y, r, 0, Math.PI * 2);
//         that.cobj.closePath();
//         that.cobj[that.type]();
        
//         }
        
//       that.cobj.translate(200,100);

//     for(var i=0;i<500;i++) 
//     {
//         that.cobj.beginPath();
//         that.cobj.scale(0.95,0.95);  
//         that.cobj.rotate(Math.PI/10);  
//         that.cobj.translate(70,-25);
//         that.cobj.closePath();
//     }
// },
   xp:function(objxp,w){
        var that =this;
        that.canvas.onmousemove = function(e){
            var left = e.offsetX-w/2;
            var top = e.offsetY-w/2;
            if(left<=0){
                left = 0;
            }
            if(left>=that.canvas.width-w){
                left = that.canvas.width;
            }
            if(top<=0){
                left = 0;
            }
            if(top>=that.canvas.height-w){
                top = that.that.canvas.height;
            }
            objxp.css({
                left:left+"px",
                top:top+"px"
            })
        }
        that.canvas.onmousedown = function(e){
            objxp.css({
                display:"block",
                width:w+"px",
                height:w+"px"
            })
            that.canvas.onmousemove = function(e){
                var left = e.offsetX-w/2;
                var top = e.offsetY-w/2;
                if(left<=0){
                    left = 0;
                }
                if(left>=that.canvas.width-w){
                    left = that.canvas.width;
                }
                if(top<=0){
                    left = 0;
                }
                if(top>=that.canvas.height-w){
                    top = that.that.canvas.height;
                }
                objxp.css({
                    left:left+"px",
                    top:top+"px",
                    display:"block"
                })
                that.cobj.clearRect(left,top,w,w);
            }
            objxp[0].onmouseup=function(){
                that.history.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height));
                objxp.css({
                    display:"none"
                })
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    select:function(selectareaobj){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY,minx,miny, w,h;
            that.init();
            that.canvas.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectareaobj.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h

                })

            }
            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.temp=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.history.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height));
                that.cobj.putImageData(that.temp,minx,miny);
                that.drag(minx,miny,w,h,selectareaobj);

            }
        }

    },
    drag:function(x,y,w,h,selectareaobj){
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
            }
        }

        that.canvas.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var cx=ox-x;
            var cy=oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
                return;
            }

            that.canvas.onmousemove=function(e){

                that.cobj.clearRect(0,0,that.canvas1.width,that.canvas1.height);
                if(that.history.length!==0){
                    that.cobj.putImageData(that.history[that.history.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.canvas1.width-w){
                    lefts=that.canvas1.width-w
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.canvas1.height-h){
                    tops=that.canvas1.height-h
                }
                selectareaobj.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.temp,lefts,tops);


            }

            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.drag(x,y,w,h,selectareaobj)

            }
        }


    },

    draw: function () {
        var that = this;
        that.canvas.onmousedown = function (e) {
            var startx = e.offsetX;
            var starty = e.offsetY;
            that.canvas.onmousemove = function (e) {
                that.cobj.clearRect(0, 0, that.canvas1.width, that.canvas1.height);
                if (that.history.length > 0) {
                    that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
                }
                var endx = e.offsetX;
                var endy = e.offsetY;
                that[that.shapes](startx, starty, endx, endy);
            }
            that.canvas.onmouseup = function () {
                that.history.push(that.cobj.getImageData(0, 0, that.canvas1.width, that.canvas1.height))
                that.canvas.onmousemove = null;
                that.canvas.onmouseup = null;
            }
        }
    }
}
