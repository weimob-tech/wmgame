
var wmGame=wmGame||{};
(function (wmGame) {
    wmGame.init=function (cid,comp,that){
        
         var game=new ddGame(cid,that,function (canvas){
             comp(game,canvas);
         });
         
        
        
    }
    function ddGame(cid,that2,fun2){
    var _that2=that2;
    var _that=this;
    var _num=0;
    var _fps=60;
    var _realFps;
    var _ticks;
    var _ticks2;
    this.create=function (arr){
        if(!Array.isArray(arr)){
            console.log("create传入数据必须是数组");
            return false;
        }
        var con=new scg.contain();
        con.mcs={};
        function crat(cc,ar){
            for(var i=ar.length-1;i>=0;i--){
                var a=ar[i];
                if(Array.isArray(a)){
                    var b=new scg.contain();
                    cc.addChild(b);
                    crat(b,a);
                }else if(isObj(a)){
                    if(!isCanUse(a)) return false;
                    else{
                        if(a.t=="s"){
                            var m=_that.createShape(a.v);
                        }else if(a.t=="i"){
                            m=_that.creatImg(a.v);
                        }else if(a.t=="t"){
                            m=_that.createTxt(a.v);
                        }
                        if(a.t!="c"){
                            if (a.s != undefined) {
                                var s = a.s;
                                if (s.x != undefined) m.x = s.x;
                                if (s.y != undefined) m.y = s.y;
                                if (s.a != undefined) m.alpha = s.a;
                                if (s.sx != undefined) m.scaleX = s.sx;
                                if (s.sy != undefined) m.scaleY = s.sy;
                                if (s.r != undefined) m.rotate = s.r;
                            }
                            cc.addChild(m);
                            if(a.z!=undefined){
                                con.mcs[a.z]=m;
                            }
                        }else{
                            if (a.s != undefined) {
                                var s = a.s;
                                if (s.x != undefined) cc.x = s.x;
                                if (s.y != undefined) cc.y = s.y;
                                if (s.a != undefined) cc.alpha = s.a;
                                if (s.sx != undefined) cc.scaleX = s.sx;
                                if (s.sy != undefined) cc.scaleY = s.sy;
                                if (s.r != undefined) cc.rotate = s.r;
                            }
                            con.mcs[a.z]=cc;
                        }
                    }
                }else{
                    return false;
                }
            }
        }
        crat(con,arr);
        function isCanUse(val){
            if(val&&val.t!="s"&&val.t!="i"&&val.t!="t"&&val.t!="c"){
                console.log(val,"对象的t是无效变量");
                return false;
            }
            if(val.s==undefined||val.s==null){
                val.s={};
            }
            return true;
        }


        return  con
    }

    this.contain=function (){
        return new scg.contain();
    }

    this.creatImg=function (a){
        if(!isObj(a)){
            console.log(a,"图片创建参数必须是对象");
            return;
        }
        
        
         if(typeof a.s === 'string'){
        var img=scg.canvas.createImage();
        img.src=a.s;
        }else{
            img=a.s;
        }
         
        

        return new scg.createImage(img,a.x,a.y);
    }

    this.createShape=function (a){
        if(!isObj(a)){
            console.log(a,"图形创建参数必须是对象");
            return;
        }
        a.d.width=a.d.w;
        a.d.height=a.d.h;
        a.d.color=a.d.c;
        return new scg.createShape(a.t,a.d);
    }

    this.createTxt=function (a){
        if(!isObj(a)){
            console.log(a,"文本创建参数必须是对象");
            return;
        }
        if(a.t==undefined) a.t=" ";
        return new scg.createTxt(a.t,a.s+" "+a.ty,a.c,"left",a.x,a.y);
    }

    this.update=function (l){
        // scg.openRepick();
        if(l==undefined){
            scg.openRepick(undefined,false);
        }else if(l=="loop"){
            scg.openRepick();
        }else if(l=="stop"){
            scg.opening=false;
            scg.removeTime();
        }
    }

    this.addAct=function (mc,obj,time,...org){
        var callBackFun;
        var hDong;
        var loop;
        for(var i=0;i<org.length;i++){
            if(callBackFun==undefined&&typeof org[i]=="function"&&i==0){
                callBackFun=org[i];
            }else if(loop==undefined&&typeof org[i]=="boolean"&&i<=1){
                loop=org[i];
            }else if(loop==undefined&&typeof org[i]=="boolean"&&i<=2&&i>0){
                hDong=org[i];
            }

        }
        _num++;
        scg.tweenCreate('m'+_num,mc,obj,time,hDong,loop,callBackFun);
        return 'm'+_num;
    }

    this.removeAct=function (name){
        scg.tweenRemove(name);
    }

    this.setFps=function (num){
        if(num!=_fps){
            _fps=num;
            if(scg._time!=undefined){
                scg.removeTime();
                var rfun=scg.repickFun;
                scg.openRepick(undefined,scg.opening,scg.noClear);
            }
        }else{
            _fps=num;
        }
    }

    this.on=function (tick,func){
        if(tick=="tick"){
            if(_ticks==undefined) _ticks=[];
            _ticks.push(func);
        }else if(tick=="tickDown"){
            if(_ticks2==undefined) _ticks2=[];
            _ticks2.push(func);
        }
    }

    this.off=function (tick,func){
        if(tick=="tick"){
            if(func==undefined) _ticks=undefined;
            else{
                if(_ticks!=undefined){
                    for(var i=0;i<_ticks.length;i++){
                        if(_ticks[i]==func){
                            _ticks.splice(i,1);
                            return;
                        }
                    }
                }
            }
        }else if(tick=="tickDown"){
            if(func==undefined) _ticks2=undefined;
            else{
                if(_ticks2!=undefined){
                    for(var i=0;i<_ticks2.length;i++){
                        if(_ticks2[i]==func){
                            _ticks2.splice(i,1);
                            return;
                        }
                    }
                }
            }
        }
    }
        function isObj(val){
            return  val !== null && !Array.isArray(val) && typeof val === 'object';
        }
    
    

     function addEventListener(mc,type,onCompvare,type2,shuX){
        mc._eventType=type2;
        mc._eventSX=shuX;
        var event={
            mc:mc,
            type:type,
            fun:onCompvare
        }
        events.push(event);
    }

     function removeEventListener(_this,type){
        for(var i=0;i<events.length;i++){
            if(events[i].mc==_this&&events[i].type==type){
                events.splice(i,1);
            }
        }
    }
     


        
    function MaxSize(str,leng,fdd) {
        var len = str.length, tlen = len, nlen = 0;
        for(var x = 0; x < len; x++){
            if(str.charCodeAt(x) > 128){
                if(nlen + 2 <=leng){
                    nlen += 2;
                }else{
                    tlen = x;
                    break;
                }
            }else{
                if(nlen + 1 <= leng){
                    nlen += 1;
                }else{
                    tlen = x;
                    break;
                }
            }
        }
        if(fdd==-1) return str.substr(0, tlen)+'...';
        else if(len==tlen) return str;
        else if(fdd==1) return str.substr(0, tlen);
        else if(fdd==0) return str.substr(0, tlen)+'...';
    }


    function MaxSize2(str,ctx,width,fonSize) {
        var len = str.length;
        var s=0;
        var f=0;
        var out="";
        for(var x = 0; x < len; x++){
            if(fonSize!=undefined) ctx.font=fonSize;
            var han=ctx.measureText(str[x]).width;
            s+=han;
            if(s>=width){
                if(x!=len-1) out=out+str.slice(f,x+1)+"\n";
                else out=out+str.slice(f,x+1);
                f=x+1;
                s=0;
            }
        }
        out=out+str.slice(f);
        return out;
    }

    function inite(){

        
        const query = wx.createSelectorQuery();

         query.select('#'+cid)
            .fields({node: true, size: true})
            .exec((res) => {
                let canvas = res[0].node;
                canvas.width=_that2.width;
                canvas.height=_that2.height;
                canvas.realWidth=res[0].width;
                canvas.realHeight=res[0].height;
                scg.inite(canvas);
                _that.stage=scg.stage;
                fun2(scg.canvas);
            });

         

        
        
    }

    

        var events=[];
        var _tweenMc=[];
        var scg={
            inite:function (id,enba,enbaFW) {
                
                

                 var ctx,canvas;
                 canvas = id;
                 if(canvas.getContext==undefined) ctx=canvas
                 else{
                 ctx = canvas.getContext('2d');
                }
                 ctx.scale(1, 1);
                 scg.ctx=ctx;
                 scg.canvas=canvas;
                 scg.stage=new scg.contain();
                 if(scg.fps==undefined) scg.fps=60;

                 if(canvas.requestAnimationFrame==undefined){
                canvas.timesp=-1;
                canvas.requestAnimationFrame=function (fun) {
                    canvas.timesp=setTimeout(function () {
                        fun();
                        canvas.requestAnimationFrame(fun);
                    },1000/60)
                }
            }


                _that2.that[_that2.touchstart]=onEventHandle;
                _that2.that[_that2.touchmove]=onEventHandle;
                _that2.that[_that2.touchend]=onEventHandle;
                _that2.that[_that2.touchcancel]=onEventHandle;

                 function onEventHandle(e){
                    scg.events(e);
                 }

                 function onNoneHandle(e){
                 }

                 scg.remove=function () {
                     _that2.that[_that2.touchstart]=onNoneHandle;
                 }

                 

                
            },
            createImage:function (img,x,y,regX,regY,scaleX,scaleY) {
                var _this=this;
                _this.type="img";
                _this.img=img;
                _this.x=x!=undefined ? x:0;
                _this.y=y!=undefined ? y:0;
                _this.regX=regX!=undefined ? regX:0;
                _this.regY=regY!=undefined ? regY:0;
                _this.scaleX=scaleX!=undefined ? scaleX:1;
                _this.scaleY=scaleY!=undefined ? scaleY:1;
                _this.rotate=0;
                _this.alpha=1;
                _this.on=function(event,onCompvareHandle,type,shuX) {
                    addEventListener(_this,event,onCompvareHandle,type,shuX);
                };
                _this.off=function (event,onCompvareHandle) {
                    removeEventListener(_this,event,onCompvareHandle)
                };
            },
            createImage2:function (img,x,y,sx,sy) {
                if(sy==undefined){
                    sy=sx/img.width;
                    sx=sy;
                }else if(sx==undefined){
                    sy=sy/img.height;
                    sx=sy;
                }else{
                    sx=sx/img.width;
                    sy=sy/img.height;
                }
                let m=new scg.createImage(img,x,y,img.width/2,img.height/2,sx,sy);
                return m;
            },
            createTxt:function(saying,size,color,align,x,y,maxWith,maxHeight){
                var _this=this;
                _this.type="txt";
                _this.text=saying!=undefined ? saying:"".toString();
                _this.size=size!=undefined ? size:"20px Microsoft Yahei";
                _this.color=color!=undefined ? color:"#ffffff";
                _this.align=align!=undefined ? align:"center";
                _this.x=x!=undefined ? x:0;
                _this.y=y!=undefined ? y:0;
                _this.maxWith=maxWith;
                _this.maxHeight=maxHeight;
                _this.alpha=1;

                var ctx=scg.ctx;
                ctx.font=_this.size;
                _this.text=_this.text.toString();
                var lis=_this.text.split("\n");
                if(lis.length==1) _this.width=ctx.measureText(_this.text).width;
                else{
                    for(var i=0;i<lis.length;i++){
                        if(i==0) _this.width=ctx.measureText(lis[i]).width;
                        else if(_this.width<ctx.measureText(lis[i]).width) _this.width=ctx.measureText(lis[i]).width;
                    }
                }


                _this.on=function(event,onCompvareHandle,type,shuX) {
                    addEventListener(_this,event,onCompvareHandle,type,shuX);
                };
                _this.off=function (event,onCompvareHandle) {
                    removeEventListener(_this,event,onCompvareHandle)
                };
            },
            createTxt2:function(saying,size,align,x,y,maxWith,maxHeight){
                return new scg.createTxt(saying,size.size,size.color,align,x,y,maxWith,maxHeight);
            },
            /**
             *
             * @param type  1.长方形，2，圆(椭圆) 3.圆角矩形 4.多边形
             * @param data
             */
            createShape:function(type,data){
                var _this=this;
                _this.type="shape";
                if(data.scx!=undefined) _this.scx=data.scx;
                else _this.scx=1;
                if(data.scy!=undefined) _this.scy=data.scy;
                else _this.scy=1;
                if(type==1){
                    _this.width=data.width;
                    _this.height=data.height;
                }else if(type==2){
                    _this.r=data.r;
                }else if(type==3){
                    _this.width=data.width;
                    _this.height=data.height;
                    _this.r=data.r;
                }else if(type==4){
                    _this.points=data.points;
                }else if(type==-1){
                    _this.drawOther=data.drawOther;
                }
                _this.x=data.x||0;
                _this.y=data.y||0;
                _this.color=data.color;
                _this.typeSp=type;
                _this.alpha=1;

                _this.on=function(event,onCompvareHandle,type2,shuX) {
                    addEventListener(_this,event,onCompvareHandle,type2,shuX);
                };
                _this.off=function (event,onCompvareHandle) {
                    removeEventListener(_this,event,onCompvareHandle)
                };
            },
            contain:function () {
                var _this=this;
                _this.type="cons";
                _this._childs=[];
                _this.x=0;
                _this.y=0;
                _this.rotate=0;
                _this.alpha=1;
                _this.addChild=function (mc) {
                    _this._childs.push(mc);
                    mc._daddy=_this;
                };
                _this.addChild2=function (mc) {
                    _this._childs.unshift(mc);
                    mc._daddy=_this;
                };

                _this.removeChild=function (mc) {
                    var a=_this._childs;
                    for(var i=0;i<a.length;i++){
                        if(a[i]==mc){
                            mc._daddy=undefined;
                            a.splice(i,1);
                            return;
                        }
                    }
                };

                _this.on=function(event,onCompvareHandle,type2,shuX) {
                    addEventListener(_this,event,onCompvareHandle,type2,shuX);
                };
                _this.off=function (event,onCompvareHandle) {
                    removeEventListener(_this,event,onCompvareHandle)
                };

            },
            openRepick:function (opening,noClear) {
                if(scg._time!=undefined) return;
                var c=scg.canvas;
                var ctx=scg.ctx;
                if(opening==undefined) scg.opening=true;
                else scg.opening=opening;
                scg.noClear=noClear;
                var tjg=1000/_fps;
                var t0=Date.now();
                var t1;
                var fps=1;
                onFrameHandle();
                scg._showPage=_showPage;
                scg.onFrameHandle=function (){
                    
                    

                     if(scg._time==undefined) scg._time=c.requestAnimationFrame(onFrameHandle);
                     
                    
                };


                function onFrameHandle() {
                    t1=Date.now();
                    if((t1-t0)<tjg*fps){
                        
                        

                         if(scg.opening) scg._time=c.requestAnimationFrame(onFrameHandle);
                         
                        
                        return;
                    }
                    _realFps=((t1-t0)/tjg)/fps*_fps;
                    // console.log("真实帧数",_realFps);
                    fps++;
                    if(fps>=_fps){
                        fps=1;
                        t0=t1;
                    }
                    
                    

                     if(scg.opening) scg._time=c.requestAnimationFrame(onFrameHandle);
                     
                    
                    else scg._time=undefined;
                    if(_ticks!=undefined){
                        for(var i=0;i<_ticks.length;i++){
                            _ticks[i]();
                        }
                    }
                    if(_tweenMc!=undefined&&_tweenMc.length!=0){
                        for(var k=0;k<_tweenMc.length;k++){
                            var m=_tweenMc[k];
                            var over=false;
                            var j=m.sm.i++;
                            for( var i in m.obj) {
                                m.mc[i]=m.sm[i][j];
                                // if(m.sm[i][j]==undefined) console.log(j)
                                if(j==m.sm[i].length-1){
                                    over=true;
                                }
                            }
                            if(over){
                                if(m.loop==false){
                                    _tweenMc.splice(k,1);
                                    if(m.callBack!=undefined) m.callBack();
                                    k--;
                                }else{
                                    if(m.loop<0) m.loop++;
                                    m.sm.i=0;
                                }

                            }
                        }
                    }
                    if(noClear==undefined) ctx.clearRect(0, 0, c.width, c.height);
                    _showPage(scg.stage);
                    if(_ticks2!=undefined){
                        for(var i=0;i<_ticks2.length;i++){
                            _ticks2[i]();
                        }
                    }
                }

                function _showPage(mcs) {
                    ctx.save();
                    pushMask(mcs);
                    // ctx.clearRect(0,0,scg.width,scg.height);
                    ctx.translate(mcs.x,mcs.y);
                    if(mcs.rotate==undefined) mcs.rotate=0;
                    var r=mcs.rotate * Math.PI / 180;
                    // console.log(r)
                    ctx.globalAlpha*=mcs.alpha;
                    ctx.rotate(r);
                    if(mcs.scaleX!=undefined||mcs.scaleY!=undefined){
                        if(mcs.scaleX==undefined) var a=1,b=mcs.scaleY;
                        else if(mcs.scaleY==undefined) var b=1,a=mcs.scaleX;
                        else a=mcs.scaleX,b=mcs.scaleY;
                        ctx.scale(a,b);
                    }

                    if(mcs.transform!=undefined){
                        var a=mcs.transform;
                        ctx.transform(a[0],a[1],a[2],a[3],a[4],a[5])
                    }
                    // ctx.moveTo(mcs.x,mcs.y);
                    for(var i=0;i<mcs._childs.length;i++){
                        if(mcs._childs[i].type=="img"){
                            drawImage(mcs._childs[i]);
                        }else if(mcs._childs[i].type=="cons"){
                            _showPage(mcs._childs[i]);
                        }else if(mcs._childs[i].type=="txt"){
                            drawTxt(mcs._childs[i]);
                        }else if(mcs._childs[i].type=="shape"){
                            drawShape(mcs._childs[i]);
                        }
                    }
                    addEvent(mcs);
                    ctx.restore();
                    if(ctx==scg.canvas){
                        ctx.draw();
                    }
                }


                function drawImage(mc) {
                    ctx.save();
                    pushMask(mc);
                    var w=mc.img.width;
                    var h=mc.img.height;
                    var rx=mc.regX;
                    var ry=mc.regY;
                    if(mc.rotate==undefined) mc.rotate=0;
                    var r=mc.rotate * Math.PI / 180;
                    ctx.globalAlpha*=mc.alpha;
                    ctx.scale(mc.scaleX,mc.scaleY);
                    ctx.translate(mc.x,mc.y);
                    ctx.rotate(r);
                    if(mc.transform!=undefined){
                        var a=mc.transform;
                        ctx.transform(a[0],a[1],a[2],a[3],a[4],a[5])
                    }
                    ctx.imageSmoothingEnabled=true;
                    ctx.drawImage(mc.img,0,0,mc.img.width,mc.img.height,-rx,-ry,w,h);
                    addEvent(mc);
                    ctx.restore();
                }

                function drawTxt(mc){
                    mc.text=mc.text.toString();
                    ctx.save();
                    pushMask(mc);
                    ctx.textAlign=mc.align;
                    ctx.font=mc.size;
                    ctx.fillStyle=mc.color;
                    ctx.globalAlpha*=mc.alpha;
                    ctx.translate(mc.x,mc.y);
                    ctx.scale(mc.scaleX,mc.scaleY);
                    if(mc.rotate==undefined) mc.rotate=0;
                    var r=mc.rotate * Math.PI / 180;
                    ctx.rotate(r);
                    var lsr=mc.text;
                    var str=lsr.split('\n');
                    if(mc.lineHeight==undefined) mc.lineHeight=0;

                    for(var i=0;i<str.length;i++){
                        var sr=str[i];
                        var skip=false;
                        if(mc.maxWith!=undefined){
                            if(mc.maxHeight!=undefined&&i==mc.maxHeight-1){
                                if(str.length>mc.maxHeight){
                                    sr=MaxSize(sr,mc.maxWith-3,-1);
                                }else{
                                    sr=MaxSize(sr,mc.maxWith-3,0);
                                }
                                skip=true;
                            }else{
                                sr=MaxSize(sr,mc.maxWith,1);
                                var sr2=str[i].replace(sr,"");
                                if(sr2!="") str.splice(i+1,0,sr2);
                            }
                            ctx.fillText(sr, 0, mc.lineHeight*i,mc.maxWidth);
                        }else{
                            if(i==0) mc.width=ctx.measureText(sr).width;
                            else if(mc.width<ctx.measureText(sr).width) mc.width=ctx.measureText(sr).width;
                            ctx.fillText(sr, 0, mc.lineHeight*i);
                        }
                        if(skip) break;
                    }
                    ctx.restore();
                    addEvent(mc);
                }

                function drawShape(mc) {
                    ctx.save();
                    pushMask(mc);
                    ctx.fillStyle=mc.color;
                    ctx.strokeStyle=mc.color;
                    ctx.globalAlpha*=mc.alpha;
                    ctx.translate(mc.x,mc.y);
                    ctx.scale(mc.scaleX,mc.scaleY);
                    if(mc.rotate==undefined) mc.rotate=0;
                    var r=mc.rotate * Math.PI / 180;
                    ctx.rotate(r);
                    ctx.beginPath();
                    if(mc.transform!=undefined){
                        var a=mc.transform;
                        ctx.transform(a[0],a[1],a[2],a[3],a[4],a[5])
                    }
                    if(mc.typeSp==1){
                        ctx.fillRect(0,0,mc.width,mc.height);
                        addEvent(mc);
                    }else if(mc.typeSp==2){
                        ctx.scale(mc.scx, mc.scy);
                        ctx.moveTo(mc.r,mc.r);
                        ctx.arc(0,0, mc.r, 0, 2 * Math.PI);
                        // ctx.stroke();
                        addEvent(mc);
                        ctx.fill();
                        // ctx.scale(1/mc.scx, 1/mc.scy);
                    }else if(mc.typeSp==3){
                        ctx.scale(mc.scx, mc.scy);
                        drawYuanJiao(ctx,mc);
                        addEvent(mc);
                        ctx.fill();
                    }else if(mc.typeSp==4){
                        ctx.scale(mc.scx, mc.scy);
                        drawDPX(ctx,mc);
                        addEvent(mc);
                        ctx.fill();
                    }else if(mc.typeSp==-1){
                        ctx.scale(mc.scx, mc.scy);
                        mc.drawOther();
                        addEvent(mc);
                    }
                    ctx.restore();

                }

                function pushMask(mc) {
                    // ctx.save();
                    if(mc.mask!=undefined){
                        var mask=mc.mask;
                        ctx.beginPath();
                        if(mask.typeSp==1){
                            ctx.rect(mask.x,mask.y,mask.width,mask.height);
                        }else if(mask.typeSp==2){
                            ctx.scale(mask.scx, mask.scy);
                            ctx.moveTo(mask.x+mask.r,mask.y);
                            ctx.arc(mask.x, mask.y, mask.r, 0, 2 * Math.PI);
                            ctx.scale(1/mask.scx, 1/mask.scy);
                        }else if(mask.typeSp==3){
                            drawYuanJiao(ctx,mask);
                        }else if(mc.typeSp==4){
                            drawDPX(ctx,mc);
                        }else if(mc.typeSp==-1){
                            mc.drawOther();
                        }
                        ctx.clip();
                    }
                    // ctx.restore();

                }
                function addEvent(mc) {
                    if(mc._eventType==undefined||mc._event==undefined) return;
                    else{
                        var sx=mc._eventSX;
                        ctx.save();
                        if(mc._eventType==1){
                            ctx.beginPath();
                            // ctx.fillStyle="#ffff00";
                            ctx.rect(sx.x, sx.y, sx.width,sx.height);
                            // ctx.fillRect(sx.x, sx.y, sx.width,sx.height);
                        }else if(mc._eventType==2){
                            if(sx.scx==undefined) sx.scx=1;
                            if(sx.scy==undefined) sx.scy=1;
                            ctx.beginPath();
                            ctx.scale(sx.scx, sx.scy);
                            ctx.moveTo(sx.x+sx.r,sx.y);
                            ctx.arc(sx.x, sx.y, sx.r, 0, 2 * Math.PI);
                        }
                        ctx.closePath();
                        
                        
                         var myCl=ctx.isPointInPath(mc._event.x,mc._event.y);
                         let pxp=[Number(mc.x),Number(mc.y)];
                         getMcs6(mc);
                         function getMcs6(mc){
                      if(mc._daddy!=undefined){
                         pxp[0]+=Number(mc._daddy.x);
                         pxp[1]+=Number(mc._daddy.y);
                         getMcs6(mc._daddy);
                      }
                     }
                         if(myCl==undefined){
                      if(mc._eventType==1){
                          if(mc._event.x>=sx.x+pxp[0]&&mc._event.x<=sx.x+pxp[0]+sx.width&&
                            mc._event.y>=sx.y+pxp[1]&&mc._event.y<=sx.y+pxp[1]+sx.height){
                              mc._event.fun({x:mc._event.x,y:mc._event.y});
                            }
                      }else if(mc._eventType==2){
                        var p=[pxp[0]+sx.x,pxp[1]+sx.y];
                        var r=Math.sqrt((p[0]-mc._event.x)*(p[0]-mc._event.x)+(p[1]-mc._event.y)*(p[1]-mc._event.y));
                        if(r<=sx.r){
                          mc._event.fun({x:mc._event.x,y:mc._event.y});
                        }
                      }
                     }else if(myCl){
                        mc._event.fun({x:mc._event.x,y:mc._event.y});
                    }
                         


                        
                        ctx.restore();
                        mc._event=undefined;
                    }
                }

                /**
                 * 绘制圆角矩形
                 */
                function drawYuanJiao(ctx,mc) {
                    // ctx.translate(mc.x, mc.y);
                    ctx.beginPath();
                    var a=mc.x;
                    var b=mc.y;
                    ctx.moveTo(a+mc.width - mc.r,b+mc.height - mc.r);
                    ctx.arc(a+mc.width - mc.r, b+mc.height - mc.r, mc.r, 0, Math.PI / 2);
                    ctx.lineTo(a+mc.r, b+mc.height);
                    ctx.arc(a+mc.r, b+mc.height - mc.r, mc.r, Math.PI / 2, Math.PI);
                    ctx.lineTo(a, b+mc.r);
                    ctx.arc(a+mc.r, b+mc.r, mc.r, Math.PI, Math.PI * 3 / 2);
                    ctx.lineTo(a+mc.width - mc.r, b);
                    ctx.arc(a+mc.width - mc.r, b+mc.r, mc.r, Math.PI * 3 / 2, Math.PI * 2);
                    ctx.lineTo(a+mc.width, b+mc.height - mc.r);
                    ctx.closePath();
                    ctx.stroke();
                    // ctx.fill();
                }

                /**
                 * 绘制多边形
                 */
                function drawDPX(ctx,mc) {
                    // ctx.translate(mc.x, mc.y);
                    ctx.beginPath();
                    var a=mc.x;
                    var b=mc.y;
                    for(var i=0;i<mc.points.length;i++){
                        if(i==0) ctx.moveTo(a+mc.points[i].x,b+mc.points[i].y);
                        else ctx.lineTo(a+mc.points[i].x,b+mc.points[i].y);
                    }
                    i=0;
                    ctx.lineTo(a+mc.points[i].x,b+mc.points[i].y);
                    ctx.closePath();
                    ctx.stroke();
                }

            },
            removeTime:function(){
                
                

                 if(scg._time!=undefined){
                scg.canvas.cancelAnimationFrame(scg._time);
                scg._time=undefined;
            }
                 
                

            },
            removeRepickFun:function(d){
                for(var i=0;i<scg.repickFun.length;i++){
                    if(d==scg.repickFun[i]){
                        scg.repickFun.splice(i,1);
                    }
                }
            },
            events:function (e,fun) {
                
                
                 if(e.changedTouches.length==0&&e.touches.length==0) return;
                 else if(e.changedTouches.length==0&&e.touches.length!=0) e.changedTouches=e.touches;
                 let da={x:e.changedTouches[0].x,y:e.changedTouches[0].y};
                 if(da.x==undefined&&e.changedTouches[0].pageX!=undefined){
                da.x=e.changedTouches[0].pageX;
                da.y=e.changedTouches[0].pageY;
             }else if(da.x==undefined&&e.changedTouches[0].clientX!=undefined){
                da.x=e.changedTouches[0].clientX;
                da.y=e.changedTouches[0].clientY;
             }
                 let blx=scg.canvas.width/scg.canvas.realWidth;
                 let bly=scg.canvas.height/scg.canvas.realHeight;
                 var _x=(da.x)*blx;
                 var _y=(da.y)*bly;
                 for(var i=0;i<events.length;i++){
                if(events[i].type==e.type){
                    events[i].mc._event={x: _x,y:_y,fun:events[i].fun};
                }
            }
                 
                
            },
            tweenCreate:function (name,mc,obj,time,fun,loop,callBack) {
                var m={};
                m.name=name;
                m.mc=mc;
                m.obj=obj;
                m.time=time;
                m.sm={};
                m.callBack=callBack;
                for( var i in obj){
                    var f=mc[i];
                    var l=obj[i];
                    var sm=[];
                    if(l.length!=undefined&&l.length!=0){
                        var lar=[];
                        var tar=[];
                        var far=[];
                        var ls=0;
                        for(var k=0;k<l.length;k++){
                            if(k==0){
                                lar.push(l[k]-f);
                                far.push(f);
                            }else{
                                lar.push(l[k]-l[k-1]);
                                far.push(l[k-1]);
                            }
                            ls+=Math.abs(lar[k]);

                        }

                        for(var k=0;k<lar.length;k++){
                            if(ls==0){
                                tar.push(parseInt(time*_fps/(1000*lar.length)));
                            }else{
                                tar.push(parseInt(Math.abs(lar[k])*time*_fps/(1000*ls)));
                            }
                            for(var j=0;j<tar[k];j++) {
                                if(ls==0){
                                    sm.push(f);
                                    continue;
                                }
                                var x = (j+1) / tar[k];
                                if(fun!=undefined&&fun!=-1){
                                    y=fun(x)* (l[k] - far[k]) + far[k];
                                }else{
                                    var y = x * (l[k] - far[k]) + far[k];
                                }
                                sm.push(y);
                            }
                        }
                    }else{
                        var t=parseInt(time*_fps/1000);
                        for(var j=0;j<t;j++) {
                            var x = (j+1) / t;
                            if(fun!=undefined&&fun!=-1){
                                y=fun(x)* (l - f) + f;
                            }else{
                                var y = x * (l - f) + f;
                            }
                            sm.push(y);
                        }
                    }
                    m.sm[i]=sm;
                    m.sm.i=0;
                }
                if(loop==undefined||loop==false) m.loop=false;
                else{
                    if(loop>1) m.loop=-loop;
                    else m.loop=loop;
                }
                _tweenMc.push(m);
                return m.name;
            },
            tweenRemove:function (name) {
                for(var i=0;i<_tweenMc.length;i++){
                    if(_tweenMc[i].name==name){
                        _tweenMc.splice(i,1);
                        break;
                    }
                }
            },
            removeMc:function () {
                _tweenMc=[];
                events=[];
                scg.stage._childs=[];
                scg.clearEnd=true;
                this.removeTime();
            }
        };


        scg.getLineTxt=function (text,ctx,widthRule,fonSize) {
            if(text==undefined||text=="") return "";
            text=text.toString();
            var str=text.split('\n');
            var lsr="";
            for(var i=0;i<str.length;i++){
                var sr=str[i];
                sr=MaxSize2(sr,ctx,widthRule,fonSize);
                if(i!=0) lsr+="\n"+sr;
                else lsr+=sr;
            }
            return lsr;
        };

        inite();
    }
})(wmGame);



 export default wmGame;
 




