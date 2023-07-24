window.onload=function (){
    var _canvas;
    wmGame.init("game",onCompleteHandle,{
        enba:true
    });


    function onCompleteHandle(gdata,canvas){
        console.log(gdata,canvas);
        _canvas=canvas;
        gdata.setFps(60);
        gdata.update("loop");

        var dbg=[
            [
                {
                    t:"t",
                    s:{x:200,y:200},
                    v:{t:"消消乐其乐无穷",s:"60px",c:"#b10263"}
                },
                [
                    {t:"c",z:"mcs2",s:{y:192,x:38}}
                ],
                {t:"c",z:"mcs",s:{y:300}}
            ],
            {
                t:"i",
                s:{y:300},
                v:{s:"image/bg_2.png"}
            },
            {
                t:"i",
                v:{s:"image/bg.png"}
            }
        ];

        var mcs=gdata.create(dbg);
        gdata.stage.addChild(mcs);
        var tt=[];
        var w=228;
        var h=228;
        var m=5;
        var n=6;
        var imgs=[];
        var players=[];
        var chose;
        var tishiA;
        var _gameMcs=mcs.mcs.mcs2;
        var _mask=gdata.createShape({t:1,d:{x:138,y:320,w:1230,h:1500,c:"#223344"}});
        // mcs.mcs.mcs.addChild(_mask);
        // _mask.alpha=0.7;
        _gameMcs.mask=_mask;
        var pointXy=[[38,192],10,10];


        initePic();
        resize(true);

        function initePic(){
            var num=0;
            for(var i=0;i<6;i++){
                tt.push({num:num,mc:"icon_"+num,score:1});
                num++;
            }
        }

        function resize(isremove){
            if(isremove==undefined){
                for(var i=0;i<m;i++) {
                    for (var j = 0; j < n; j++) {
                        imgs[i][j].removeAll();
                    }
                }
            }

            initeOne();
            autoXiao();
            tishiA=findChange();
            if(!tishiA){
                resize(true);
                return;
            }
            showStage();
        }

        function initeOne() {
            for(var i=0;i<m;i++){
                players[i]=[];
                for(var j=0;j<n;j++){
                    players[i][j]=tt[parseInt(Math.random()*tt.length)].num;
                }
            }
        }

        function showStage() {
            for(var i=0;i<m;i++){
                imgs[i]=[];
                for(var j=0;j<n;j++){
                    imgs[i][j]=new cretateOne(tt[players[i][j]].mc,i,j);
                }
            }
        }

        function cretateOne(img,i,j) {
            let _this=this;
            _this.i=i;
            _this.j=j;
            var _w=228;
            var _h=228;
            var mc=gdata.contain();
            mc.x=(m-i)*(w+pointXy[1])-w/2;
            mc.y=(n-j)*(h+pointXy[2])-h/2;
            var aa=gdata.creatImg({s:"image/"+img+".png"});
            var mychose;
            mc.addChild(aa);
            aa.alpha=0;
            aa.img.onload=function (){
                var scl=228/aa.img.width;
                aa.scaleX=scl;
                aa.scaleY=scl;
                aa.alpha=1;
            }
            _gameMcs.addChild(mc);
            mc.on("touchstart",onClickHandle,1,{width:w,height:h,x:0,y:0});
            _this.mc=mc;

            var _choseE;

            function onClickHandle(e) {
                chose=[_this.i,_this.j];
                _choseE=e;
                for(var i=0;i<m;i++){
                    for(var j=0;j<n;j++){
                        imgs[i][j].removeChose();
                    }
                }
                addChose();
                mc.off("touchstart",onClickHandle);
                mc.on("touchmove",onMoveHandle,1,{width:w*3,height:h*3,x:-w*1.5,y:-h*1.5});
                mcs.on("touchend",onEndHandle,1,{width:_canvas.width,height:_canvas.height,x:0,y:0});
            }


            function onMoveHandle(e) {
                if(e.x-_choseE.x<-20){
                    if(_this.i+1<m){
                        changeItem(chose,[_this.i+1,_this.j],undefined,true);
                        onEndHandle();
                        return;
                    }
                }
                if(e.x-_choseE.x>20){
                    if(_this.i-1>=0){
                        changeItem(chose,[_this.i-1,_this.j],undefined,true);
                        onEndHandle();
                        return;
                    }
                }
                if(e.y-_choseE.y<-20){
                    if(_this.j+1<n){
                        changeItem(chose,[_this.i,_this.j+1],undefined,true);
                        onEndHandle();
                        return;
                    }
                }
                if(e.y-_choseE.y>20){
                    if(_this.j-1>=0){
                        changeItem(chose,[_this.i,_this.j-1],undefined,true);
                        onEndHandle();
                        return;
                    }
                }
            }

            function onEndHandle() {
                if(mychose==undefined) return;
                mc.removeChild(mychose);
                mychose=undefined;
                mc.off("touchmove",onMoveHandle);
                mcs.off("touchend",onEndHandle);
                mc.on("touchstart",onClickHandle,1,{width:w,height:h,x:0,y:0});
            }

            function addChose() {
                chose=[_this.i,_this.j];
                mychose=gdata.createShape({t:1,d:{w:w,h:h,c:"FF0022"}});
                // mychose.x=-w/2;
                // mychose.y=-h/2;
                mychose.alpha=0.3;
                mc.addChild(mychose);
            }

            _this.removeChose=function () {
                onEndHandle();
                // mc.removeChild(mychose);
                // mychose=undefined;
            };

            _this.setIJ=function (i,j,act,complete) {
                if(_this!=undefined&&_this.i==i&&_this.j==j) return false;
                if(act!=undefined){
                    _this.i=i;
                    _this.j=j;
                    gdata.addAct(mc,{x:(m-i)*(w+pointXy[1])-w/2,y:(n-j)*(h+pointXy[2])-h/2},150,complete,function (x) {
                        return x*x;
                    });
                    return true;
                }else{
                    _this.i=i;
                    _this.j=j;
                    mc.x=(m-i)*(w+pointXy[1])-w/2;
                    mc.y=(n-j)*(h+pointXy[2])-h/2;
                }
                return false;
            };

            _this.removeAll=function (act,time,complete) {
                mc.off("touchstart");
                if(act!=undefined){

                    gdata.addAct(mc,{alpha:0},time,function () {
                        _gameMcs.removeChild(mc);
                        mc=undefined;
                        if(complete!=undefined) complete();
                    });
                    _this=undefined;
                }else{
                    _gameMcs.removeChild(mc);
                    mc=undefined;
                    _this=undefined;
                }
            }

        }


        function changeItem(l,c,noXiao,act) {
            var ls=players[l[0]][l[1]];
            players[l[0]][l[1]]=players[c[0]][c[1]];
            players[c[0]][c[1]]=ls;

            ls=imgs[l[0]][l[1]];
            imgs[l[0]][l[1]]=imgs[c[0]][c[1]];
            imgs[c[0]][c[1]]=ls;

            if(act==undefined){
                imgs[l[0]][l[1]].setIJ(l[0],l[1]);
                imgs[c[0]][c[1]].setIJ(c[0],c[1]);
                chose=undefined;
                onNextHandle();
            }else if(act){
                imgs[l[0]][l[1]].setIJ(l[0],l[1],act,onNextHandle);
                imgs[c[0]][c[1]].setIJ(c[0],c[1],act);
                chose=undefined;
            }


            function onNextHandle() {
                if(noXiao==undefined){
                    autoXiao(true,function () {
                        changeItem(l,c,true,true);
                    },function () {
                        chose = undefined;
                        tishiA=findChange();
                        if (!tishiA) {
                            // console.log('没了')
                            resize();
                        }
                        // wTime=wTimes;
                        // playing = false;
                        // if(gameover) gameOver();
                    },function () {
                    },function (){});
                }else{
                    chose=undefined;
                    // playing=false;
                    // if(gameover) gameOver();
                }
            }
        }

        function autoXiao(act,onNonChange,onComplete,onPlayAudioHandle,canXiao) {
            var bf=[];
            for(var i=0;i<m;i++){
                bf[i]=[];
                for(var j=0;j<n;j++){
                    bf[i][j]=1;
                }
            }
            for(i=0;i<m;i++){
                for(j=0;j<n-2;j++){
                    if(players[i][j]==players[i][j+1]&&players[i][j]==players[i][j+2]){
                        bf[i][j]=0;
                        bf[i][j+1]=0;
                        bf[i][j+2]=0;
                        for(var k=j+3;k<n;k++){
                            if(players[i][j]==players[i][k]){
                                bf[i][k]=0;
                            }else{
                                break;
                            }
                        }
                    }
                }
            }

            for(j=0;j<n;j++){
                for(i=0;i<m-2;i++){
                    if(players[i][j]==players[i+1][j]&&players[i][j]==players[i+2][j]){
                        bf[i][j]=0;
                        bf[i+1][j]=0;
                        bf[i+2][j]=0;
                        for(var k=i+3;k<m;k++){
                            if(players[i][j]==players[k][j]){
                                bf[k][j]=0;
                            }else{
                                break;
                            }
                        }
                    }
                }
            }

            var num=0;
            for(var i=0;i<m;i++){
                for(var j=0;j<n;j++){
                    if(bf[i][j]==0){
                        num++;
                        players[i][j]=-1;
                    }
                }
            }
            if(act!=undefined&&onNonChange!=undefined&&num==0){
                onNonChange();
                return;
            }else if(act!=undefined&&onNonChange==undefined&&num==0){
                onComplete();
                return;
            }else if(act!=undefined&&onNonChange!=undefined){
                if(canXiao!=undefined) canXiao();
            }

            // if(act!=undefined&&num!=0&&gameover2==false){
            //     score+=num;
            //     scoreMc.text=score.toString();
            //     jisuanchuli();
            // }
            var isfirst=true;

            if(onNonChange==undefined) var time=200;
            else time=400;
            for(var i=0;i<m;i++){
                var k=n;
                for(var j=0;j<n;j++){
                    if(players[i][j]==-1){
                        players[i].splice(j,1);
                        players[i].push(tt[parseInt(Math.random()*tt.length)].num);
                        if(act!=undefined){
                            if(isfirst) imgs[i][j].removeAll(act,time,onPlayOneHandle),isfirst=false;
                            else imgs[i][j].removeAll(act,time);
                            imgs[i].splice(j,1);
                            imgs[i].push(new cretateOne(tt[players[i][players[i].length-1]].mc,i,k));
                            k++;
                        }
                        j--;
                    }
                }
            }

            function onPlayTwoHandle() {
                if(num!=0&&act!=undefined) autoXiao(act,undefined,onComplete,onPlayAudioHandle);
            }


            function onPlayOneHandle() {
                if(act!=undefined&&num!=0){
                    isfirst=true;
                    for(var i=0;i<m;i++) {
                        for (var j = 0; j < n; j++) {
                            if(isfirst){
                                if(imgs[i][j].setIJ(i,j,true,onPlayTwoHandle)){
                                    isfirst=false;
                                }
                            }
                            else imgs[i][j].setIJ(i,j,true);
                        }
                    }
                }
            }

            if(act!=undefined&&onPlayAudioHandle!=undefined) onPlayAudioHandle();
            if(num!=0&&act==undefined) autoXiao(undefined,undefined,onComplete,onPlayAudioHandle);

        }


        function findChange() {
            for(var i=0;i<m;i++) {
                for (var j = 0; j < n; j++) {
                    if(j+3<n&&players[i][j]==players[i][j+2]&&players[i][j]==players[i][j+3]){
                        return [[i,j],[i,j+1],0];
                    }else if(j-3>=0&&players[i][j]==players[i][j-2]&&players[i][j]==players[i][j-3]){
                        return [[i,j],[i,j-1],0];
                    }else if(i+3<m&&players[i][j]==players[i+2][j]&&players[i][j]==players[i+3][j]){
                        return [[i,j],[i+1,j],0];
                    }else if(i-3>=0&&players[i][j]==players[i-2][j]&&players[i][j]==players[i-3][j]){
                        return [[i,j],[i-1,j],0];
                    }else {
                        if (i + 2 < m && j + 1 < n) {
                            if (players[i][j] == players[i + 1][j + 1] && players[i][j] == players[i + 2][j + 1]) return [[i, j], [i, j + 1],0];
                            else if (players[i][j + 1] == players[i + 1][j] && players[i][j + 1] == players[i + 2][j]) return [[i, j], [i, j + 1],1];
                            else if (players[i + 2][j] == players[i][j + 1] && players[i + 2][j] == players[i + 1][j + 1]) return [[i + 2, j], [i + 2, j + 1],0];
                            else if (players[i + 2][j + 1] == players[i][j] && players[i + 2][j + 1] == players[i + 1][j]) return [[i + 2, j], [i + 2, j + 1],1];
                            else if (players[i + 1][j] == players[i][j + 1] && players[i+1][j] == players[i + 2][j + 1]) return [[i + 1, j], [i + 1, j + 1],0];
                            else if (players[i+1][j + 1] == players[i][j] && players[i+1][j + 1] == players[i + 2][j]) return [[i + 1, j], [i + 1, j + 1],1];
                        }
                        if (i + 1 < m && j + 2 < n) {
                            if (players[i][j] == players[i + 1][j + 1] && players[i][j] == players[i + 1][j + 2]) return [[i, j], [i + 1, j],0];
                            else if (players[i + 1][j] == players[i][j + 1] && players[i + 1][j] == players[i][j + 2]) return [[i, j], [i + 1, j],1];
                            else if (players[i + 1][j + 1] == players[i][j] && players[i + 1][j + 1] == players[i][j + 2]) return [[i, j+1], [i + 1, j + 1],1];
                            else if (players[i][j + 1] == players[i + 1][j] && players[i][j + 1] == players[i + 1][j + 2]) return [[i, j+1], [i + 1, j + 1],0];
                            else if (players[i][j + 2] == players[i + 1][j + 1] && players[i][j + 2] == players[i + 1][j]) return [[i + 1, j + 2], [i, j + 2],1];
                            else if (players[i + 1][j + 2] == players[i][j + 1] && players[i + 1][j + 2] == players[i][j]) return [[i + 1, j + 2], [i, j + 2],0];
                        }
                    }
                }
            }

            return false;
        }

    }
}
