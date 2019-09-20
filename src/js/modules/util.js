
// console.log(baseUrl, pdfUrl, showLog);
let util = {
    query: query => { //url查找对应字段数据
        var subUrl = location.href.slice(location.href.indexOf('?') + 1),
            subArr = subUrl.split('&') || [],
            querystr = '';
        //console.log(subArr, "")

        return subArr.forEach(v => {
            v.indexOf(query + '=') === 0 && (querystr = v.slice(query.length + 1))
        }), querystr;
    },
    isNull: v => { //判断是否为空
        return (v == '' || v == undefined || v == null);
    },
    reg: {
        email: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[a-zA-Z]{2,3}$/,
        // phone: /^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/,
        phone: /^1\d{10}$/,
        number: /^\d+$/,
        pwd: /^[\d\w\x21-\x7e]{6,18}$/
    },
    error_msg: {
        signError: '网络超时，请退出重新进入'
    },
    // verifyID: cid => {
    //     var arrExp = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // 加权因子
    //         var arrValid = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]; // 校验码
    //         if (/^\d{17}\d|x$/i.test(cid)) {
    //             var sum = 0,
    //             idx;
    //             for (var i = 0; i < cid.length - 1; i++) {
    //                 // 对前17位数字与权值乘积求和
    //                 sum += parseInt(cid.substr(i, 1), 10) * arrExp[i];
    //             }
    //         // 计算模（固定算法）
    //         idx = sum % 11;
    //         // 检验第18为是否与校验码相等
    //         return arrValid[idx] == cid.substr(17, 1).toUpperCase();
    //         } else {
    //             return false;
    //         }
    // },
    verifyID: cid => {
        // var regId = /^[0-9]{14,17}([0-9]|X|x)$/;
        var regId = /^([0-9]{14}|[0-9]{17})([0-9]|X|x)$/;
         if(regId.test(cid)){
            return true;
         }else{
            return false;
         }
    },
    verifyBankID: str => {
        var strArr = str.split('').reverse(),
            oddArr = [],
            evenArr = [],
            oddRes = 0,
            evenRes = 0;

        $.each(strArr, function(i) {
            if ((i + 1) % 2 == 0) {
              evenArr.push(strArr[i] * 2)
            } else {
              oddArr.push(strArr[i] * 1);
            }
        });

        $.each(oddArr.join('').split(''), function() {
            oddRes += this * 1;
        });
        $.each(evenArr.join('').split(''), function() {
            evenRes += this * 1;
        });
        if ((oddRes + evenRes) % 10 == 0) {
            return 1;
        } else {
            return 0;
        }
    },
    verifyCusName: cna =>{//姓名长度校验
        let len = cna.length;
        if(len < 129){
            return true;
        }else{
            return false;
        }
    },    
    verifyVerNo: vno =>{//版本号长度校验
        let len = vno.length;
        if(len < 5){
            return true;
        }else{
            return false;
        }
    },
    verifyChUserId: cno =>{//p2p平台用户号长度校验
        let len = cno.length;
        if(len < 65){
            return true;
        }else{
            return false;
        }
    },
    verifyOrderId: ono =>{//订单号长度校验
        let len = ono.length;
        if(len < 33){
            return true;
        }else{
            return false;
        }
    }, 
    verifyAmount: amt =>{//金额长度校验
        let len = amt.length;
        if(len < 38){
            return true;
        }else{
            return false;
        }
    },     
    verifyUserRole: uro =>{//角色号长度校验
        let len = uro.length;
        if(len < 2){
            return true;
        }else{
            return false;
        }
    }, 
    verifyTranType: ttp =>{//角色号长度校验
        if(ttp == "01" || ttp == "02"){
            return true;
        }else{
            return false;
        }
    },     
    verifyrReturnUrl: rurl =>{//同步调整地址长度校验
        let len = rurl.length;
        if(len > 0){
            return true;
        }else{
            return false;
        }
    },
    verifyNotifyUrl: nurl =>{//异步通知地址长度校验
        let len = nurl.length;
        if(len > 0){
            return true;
        }else{
            return false;
        }
    }, 
    verifySendTime: stm =>{//提交时间长度校验
        let len = stm.length;
        if(len < 15){
            return true;
        }else{
            return false;
        }
    },              
    escapeHtml: val => {
        val = val + '' || '';
        var c = '',
            i = 0,
            arr = val.split('');

        while (i < arr.length) {
            switch (arr[i]) {
                case '<':
                    arr[i] = '&lt;';
                    break;
                case '>':
                    arr[i] = '&gt;';
                    break;
            }
            c += arr[i];
            i++;
        }
        return c;
    },
    /**
     * 如果url中带有表单项需要的值，则设置为只读
     * @param $input：表单项input的dom
     * @param val：url里的值
     */
    setInputItemReadonly: function($input, val){
        if(!util.isNull(val)){
            $input.val(val);
            $input.siblings(".input_read").html(val);
            $input.closest(".form_item").addClass("readonly");
        }
    },
    /**
     * 表单验证时，没有通过的input框变红
     * @param $input：表单项input的dom
     * @param flag：是否要加红框
     */
    setInputItemError: function ($input,flag) {
        if (flag) {
            $input.closest(".form_item").addClass("error");
        } else {
            $input.closest(".form_item").removeClass("error");
        }
    },

    ajaxAuth: function(opt){
        let _this = this;

        //加密
        let msgId = _this.ek();
        let key = _this.dk(msgId);
        let msg = des3.encrypt(key, JSON.stringify(opt.params.data|| {}))|| {};
        if(showLog){
            // console.log(opt.params.data.servicePath, "未加密的请求参数：",JSON.stringify(opt.params.data));
        }
        var ajax = $.ajax({
            url: opt.url || '',
            data: {
                signInfo : msgId,
                merchId: _this.query("merchId"),
                msg: msg
            },
            // }),
            timeout : 180000,
            type: 'get',
            dataType: 'json',
            //卡bin查询时，error的处理会不一样，会连续发三次请求，与平时的error不同
            cardBinFlag: false,
            // contentType: "application/json",
            beforeSend(){
                opt.before && opt.before();
            },
            success (res) {
                codeMap(res);
            },
            error (res, state) {
                if(opt.cardBinFlag){
                    opt.cardBinError && opt.cardBinError();
                }else{
                    if (state == 'timeout') {
                        _this.popTips("网络超时，请检查您的网络！");
                    } else {
                        _this.popTips("请求出错，请检查您的网络！");
                        // _this.goErrorPage();
                    }
                }
            },
            complete (){
                opt.complete && opt.complete();
            }
        });

        function codeMap (res) {
            if(res.retCode != '0000'){
                _this.popTips("停留时间过长，请刷新！");
                return;
            }
            res = JSON.parse(des3.decrypt(_this.dk(res.data.signInfo), res.data.result));
            // console.log("已解密的回调参数：",JSON.stringify(res));
            if(showLog){
                // console.log(opt.params.data.servicePath, "已解密的回调参数：",JSON.stringify(res));
            }
            let res_data = res.data;
            switch (res_data.respCode) {
                //成功
                case "0000":
                    if(_this.isNull(res.data)){
                        opt.success && opt.success(null);
                    }else{
                        opt.success && opt.success(res_data);
                    }
                    break;
                default :
                    // util.goResulePage({
                    //     pageName: "fail",
                    //     message: res_data.respMsg,
                    //     code: res_data.respCode
                    // });
                    break;
            }
        }

        return ajax;
    },
    ajax: function(opt){
        let _this = this;

        //加密
        let msgId = _this.ek();
        let key = _this.dk(msgId);
        let msg = des3.encrypt(key, JSON.stringify(opt.params.data|| {}))|| {};
        // console.log(JSON.stringify(opt.params.data|| {}));
        // console.log("-------------------------------------");
        // console.log(msgId);
        // console.log("-------------------------------------");
        // console.log(msg);
        // console.log("未加密的请求参数：",JSON.stringify(opt.params.data));
        if(showLog){
            // console.log(opt.params.data.servicePath, "未加密的请求参数：",JSON.stringify(opt.params.data));
        }
        var ajax = $.ajax({
            url: opt.url || '',
            // data: JSON.stringify({
            data: {
                signInfo : msgId,
                merchId: _this.query("merchId"),
                msg: msg
            },
            // }),
            timeout : 180000,
            type: 'get',
            dataType: 'json',
            //卡bin查询时，error的处理会不一样，会连续发三次请求，与平时的error不同
            cardBinFlag: false,
            // contentType: "application/json",
            beforeSend(){
                opt.before && opt.before();
            },
            success (res) {
                codeMap(res);
            },
            error (res, state) {
                if(opt.cardBinFlag){
                    opt.cardBinError && opt.cardBinError();
                }else{
                    if (state == 'timeout') {
                        _this.popTips("网络超时，请检查您的网络！");
                    } else {
                        _this.popTips("请求出错，请检查您的网络！");
                        // _this.goErrorPage();
                    }
                }
            },
            complete (){
                opt.complete && opt.complete();
            }
        });

        function codeMap (res) {
            if(res.retCode != '0000'){
                _this.popTips("停留时间过长，请刷新！");
                return;
            }
            res = JSON.parse(des3.decrypt(_this.dk(res.data.signInfo), res.data.result));
            // console.log("已解密的回调参数：",JSON.stringify(res));
            if(showLog){
                // console.log(opt.params.data.servicePath, "已解密的回调参数：",JSON.stringify(res));
            }
            let res_data = res.data;
            switch (res_data.respCode) {
                //成功
                case "0000":
                    if(_this.isNull(res.data)){
                        opt.success && opt.success(null);
                    }else{
                        // let res_data = JSON.parse(des3.decrypt(_this.dk(res.messageId), res.data));
                        opt.success && opt.success(res_data);
                    }
                    break;
                case "0210":
                    if(_this.isNull(res.data)){
                        opt.process && opt.process(null);
                    }else{
                        // let res_data = JSON.parse(des3.decrypt(_this.dk(res.messageId), res.data));
                        opt.process && opt.process(res_data);
                    }
                    break;                
                // case "0302":
                //     // if(res_data.accStatus == "02"){
                //     //     opt.success && opt.success(res_data);
                //     // }else{
                //     //     _this.popTips(res_data.respMsg);
                //     // }
                //     opt.success && opt.success(res_data);
                //     break;

                //失败
                default:
                    if(opt.cardBinFlag){
                        opt.cardBinError && opt.cardBinError();
                    }else if(opt.errorPhone){
                        _this.popTips(res_data.respMsg);
                        opt.errorPhone();
                    }else{
                        if (res_data.isRedirect == "Y") {
                            opt.error && opt.error(res_data);
                        }else{
                            _this.popTips(res_data.respMsg);
                        }
                        // if(_this.isNull(res.data)){
                        //     opt.error && opt.error(null,res);
                        // }else{
                        //     // let res_data = JSON.parse(des3.decrypt(_this.dk(res.messageId), res.data));
                        //     let res_data = res.data;
                        //     opt.error && opt.error(res_data, res);
                        // }
                    }
                    break;
            }
        }

        return ajax;
    },
    /**
     * 正常的ajax请求，不需要加密
     */
    ajaxNormal: function (opt) {
        let _this = this;
        let msg = JSON.stringify(opt.data);
        var ajax = $.ajax({
            url: opt.url || '',
            data: {
                merchId: _this.query("merchId"),
                msg: msg
            },
            timeout: 180000,
            type: opt.type || "get",
            dataType: 'json',
            // contentType: "application/json",
            beforeSend(){
                opt.beforeSend && opt.beforeSend();
            },
            success (res) {
                codeMap(res);
            },
            error (res, state) {
                if (state == 'timeout') {
                    _this.popTips("网络超时，请检查您的网络！");
                } else {
                    _this.popTips("请求出错，请检查您的网络！");
                    // _this.goErrorPage();
                }
            },
            complete (){
                opt.complete && opt.complete();
            }
        });

        function codeMap (res) {
            if(res.retCode != '0000'){
                _this.popTips("停留时间过长，请刷新！");
                return;
            }
            let res_data = res.data;
            switch (res_data.respCode) {
                //成功
                case "0000":
                    if(_this.isNull(res.data)){
                        opt.success && opt.success(null);
                    }else{
                        // let res_data = JSON.parse(des3.decrypt(_this.dk(res.messageId), res.data));
                        opt.success && opt.success(res_data);
                    }
                    break;
                // case "0302":
                //     if(res_data.accStatus == "02"){
                //         opt.success && opt.success(res_data);
                //     }else{
                //         _this.popTips(res_data.respMsg);
                //     }
                //     break;

                //失败
                default:
                    _this.popTips(res_data.respMsg);
                    break;
            }
        }

        return ajax;
    },
    /**
     * 验签功能，基本上所有页面都会用的到
     * @param opt：参数对象，具体参数面函数体内注释
     */
    verifySign: function (opt) {
        var _this = this;
        $.ajax({
            url: baseUrl + "/verify_sign",
            data: {
                //加签内容
                msg: JSON.stringify(opt.msg)||'',
                //merchid
                merchId: opt.merchId||'',
                //签名
                signInfo: opt.signInfo||''
            },
            timeout: 180000,
            type: 'get',
            dataType: 'json',
            // contentType: "application/json",
            beforeSend(){
            },
            success (res) {

                switch (res.retCode) {
                    //成功
                    case "0000":
                        // signFlag = true;
                        //验签成功的回调
                        opt.success && opt.success(res.data);
                        break;
                    //失败
                    default:
                        //验签失败的回调
                        util.goResulePage({
                            pageName: "fail",
                            message: res.retInfo,
                            code: res.retCode,
                            signInfo: res.data.signInfo
                        });
                        // opt.error && opt.error(res.data);
                        // signFlag = false;
                        // util.popTips(error_msg.signError);
                        // util.popTips("网络超时，请退出重新进入");
                        break;
                }
            },
            error (res, state) {
                //验签失败的回调
                opt.error && opt.error(res.data);
                // signFlag = false;
                // util.popTips(error_msg.signError);
                // util.popTips("网络超时，请退出重新进入");
                util.goResulePage({
                    pageName: "fail",
                    message: res.retInfo,
                    code: res.retCode,
                    signInfo: res.data.signInfo
                });                
            }
        });
    },
    /**
     * 充值,提现验签
     * 
     */
    verifyRechargeSign: function (opt) {
        var _this = this;
        $.ajax({
            url: baseUrl + (opt.url || "/verify_rechargesign"),
            data: {
                //加签内容
                msg: JSON.stringify(opt.msg)||'',
                //merchid
                merchId: opt.merchId||'',
                //签名
                signInfo: opt.signInfo||''
            },
            timeout: 180000,
            type: 'get',
            dataType: 'json',
            // contentType: "application/json",
            beforeSend(){
            },
            success (res) {

                switch (res.retCode) {
                    //成功
                    case "0000":
                        // signFlag = true;
                        //验签成功的回调
                        opt.success && opt.success(res.data);
                        break;
                    //失败
                    default:
                        //验签失败的回调
                        util.goResulePage({
                            pageName: "fail",
                            message: res.retInfo,
                            code: res.retCode,
                            signInfo: res.data.signInfo
                        });
                        // opt.error && opt.error(res.data);
                        // signFlag = false;
                        // util.popTips(error_msg.signError);
                        // util.popTips("网络超时，请退出重新进入");
                        break;
                }
            },
            error (res, state) {
                //验签失败的回调
                opt.error && opt.error(res.data);
                // signFlag = false;
                // util.popTips(error_msg.signError);
                // util.popTips("网络超时，请退出重新进入");
                util.goResulePage({
                    pageName: "fail",
                    message: res.retInfo,
                    code: res.retCode,
                    signInfo: res.data.signInfo
                });                
            }
        });
    },    
    goResulePage: function (opt) {
        let _this = this,url,$chuserid;
        let url_msg = JSON.parse(decodeURIComponent(util.query('msg')));
        // console.log("==========",url_msg.returnUrl);
        if(opt.chUserId){
            $chuserid = opt.chUserId; 
            if(url_msg.returnUrl.indexOf("?") == -1){
                url = url_msg.returnUrl +"?signInfo="+ encodeURIComponent(opt.signInfo) +"&respCode="+opt.code+"&respMsg="+opt.message+"&chUserId="+$chuserid;
            }else{
                url = url_msg.returnUrl +"&signInfo="+ encodeURIComponent(opt.signInfo) +"&respCode="+opt.code+"&respMsg="+opt.message+"&chUserId="+$chuserid;
            }
        }else{
            if(url_msg.returnUrl.indexOf("?") == -1){
                url = url_msg.returnUrl +"?signInfo="+ encodeURIComponent(opt.signInfo) +"&orderId="+url_msg.orderId+"&respCode="+opt.code+"&respMsg="+opt.message;
            }else{
                url = url_msg.returnUrl +"&signInfo="+ encodeURIComponent(opt.signInfo) +"&orderId="+url_msg.orderId+"&respCode="+opt.code+"&respMsg="+opt.message;
            }
        }
        
        // console.log("==========",url);
        // return;
        let page_msg = {
            merchName: $(".main_header .merchName").html(),
            returnUrl: url,
            message: opt.message||'',
            btnTxt: opt.btnTxt || '',
            rechargeTxt: opt.rechargeTxt||''
        };
        location.href = opt.pageName + ".html?msg=" + encodeURIComponent(JSON.stringify(page_msg));
    },
    popTiptimeout: null,
    removePopTips: function(){
        //console.log("remove =====");
        let _this = this;
        let popTips = document.querySelector('#tips');
        if (popTips) {
            popTips.parentNode.removeChild(popTips);
        }
        if(_this.popTiptimeout){
            clearTimeout(_this.popTiptimeout);
        }
        document.body.removeEventListener('touchend', _this.removePopTips, true);
    },
    popTips: function(str, time){
        //console.log("tips =====");
        let _this = this,
            popTips = document.createElement('div');

        popTips.id = 'tips';

        if (!document.querySelector('#tips')) {
            popTips.innerHTML = util.escapeHtml(str);

            document.body.appendChild(popTips);
            document.body.addEventListener('touchend', _this.removePopTips, true);

            _this.popTiptimeout = setTimeout(function() {
                // popTips.parentNode.removeChild(popTips);
                _this.removePopTips();
            }, time || 3000);
        }
    },
    //密码本
    t : 'MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDIAuGmpyZPfS9YXzhTmZkExMcnvMM0hzpRxxvpxAC2YooXECpPcI4HTROuH2OckLosFWzzc8ud7NCOiQ3ZEjNexoH7+0Gpqiu/ygRUiWNstwb7wAYoZHsVFzcA/HXcNAIrjaKHQKbQdYJeg8k0XzI8SKJd0t6UWgtc48QERxrpDf+nAGQtZuPCuB/YXKzIZ/eF8tuAkkGg16zHbJVLWYkWKq/tjOv5UK+BiroN7osVzO2LYNj6jcFKxRaxmGqBCaOydcUJMQ4ZBx/KqE0TKHR08TY4lmS1TSu5uitFfSG+/WKI7w/Iicq/1V4VFdXnL5ezJK8+hAD1hzJGH3Px4tk/AgMBAAECggEARfbkElTUDOhAgIxGes/2+/kNpXPdYOmQ1/xrYjmC+km7/ldURZecxycKJFWslZ720ObpxruR1Xt6dPGyW2WHfLa5z3hTvtLdHOjA3QV2NxhLJBNG1ChZ+cW2Iu0tGUtEGxIfcWqHL9J7OS6mWmCWhQnvahySaZiZ8vNlpQ1ud2kjumAbhCrgxG8LAATsNOm9wamNM3R5PEnKvJlcsWXoS4VkanpVRbDLLXhL6DTsjJKeN8gpjfteTO/gGrc4OQJMuabSVcTOb+M0cz776HhG0Jem5ESZ95zFKtT5hNLuKOsZZ8T/TQp/5dkZ2oDBJr8kLsL6eBP0/t1IwOF+G2jcQQKBgQD/IYyeT5fhRTxhcaloU4K5duaRoKdU0bKw5LJAQQBVsLZYznOWBQ6t093hmoZTD5LTHC4yxsTdwVfJvnKz7M/l+NYKR2oHFJRzmd9r9DXFdgz27vn/9PApvUlUDTybhMuJ+2KktKGiKONyLlw+YPYmGjM0btciAMKoH+Fc6CC/YQKBgQDIsUXVbhGZLu09HzMly1awq7oDREFktdQz4g6G5zBBX1ao14iPc7RP1+oAi5uIgmlf90L7iaid',
    //排列本
    n : '123123123123123123123123',
    //生成msgId this问题用es5
    ek: function () {

        //生成随机数
        function a (min, max) {
            if (arguments.length == '1') {
                return parseInt(Math.random() * min + 1); 
            } else {
                return parseInt(Math.random() * (max - min + 1) + min);
            }
        }

        //返回随机数
        function b (x, y) {
            var y = y || 10, min, max;
            //如果是1位最小数减1(0-9) (10-99) (100-999)
            min = x == '1' ? Math.pow(y, (x - 1)) - 1 : Math.pow(y, (x - 1));
            //传入最小数最大数
            return a(min, (Math.pow(y, x) - 1)) ;
        }

        var arr = [], listNum = this.n.split('');

        //拼接随机数组
        listNum.forEach(function (o, i) {
            arr.push( b(listNum[i]) );
        });

        return arr.join('');
    },
    //通过msgId生成秘钥
    dk: function (msgId) {

        var _this = this;
        
        //返回每个数字对应的字母
        function d (index) {
            return _this.t.substr(index, 1);
        }

        var listNum = _this.n.split(''), index, j = 0, key = '';

        //拼接秘钥
        listNum.forEach(function (o ,i) {
            index = msgId.substr( j, parseInt(listNum[i]));
            key += d(index);
            j += parseInt(listNum[i]);
        });

        return key;
    },
    /**
     * 银行卡号格式化
     * @param card：卡号
     * @param last：是否只显示后4位
     * @returns {string}
     */
    cardFormat(card,last){
        card += '';
        let str = last ? '' : '**** **** **** ',
            lastNumber = card.substr(card.length - 4,4);
        return str+lastNumber
    },
    /**
     * 数值格式化为金额
     * @param number: 需要格式化的数值
     * @param n: 保留几位小数
     * @returns {string}
     */
    fmoney: function (number, n) {
        var result = "";

        n = n >= 0 && n <= 20 ? n : 2;
        number = parseFloat((number + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = number.split(".")[0].split("").reverse(),
            r = number.split(".")[1],
            t = "";

        for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }

        result = t.split("").reverse().join("");

        if(!this.isNull(r)){
            result = result + "." + r;
        }

        return result;
    },
    /**
     * 将带逗号的金额字符串转为数值
     * @param moneyStr: 金额字符串
     * @returns {Number}
     */
    rmoney : function (moneyStr) {
        return parseFloat(moneyStr.replace(/[^\d\.-]/g, ""));
    },
    //兼容微信设置页面的title
    setDocumentTitle (title) {
        document.title = title; 
        var iframe = document.createElement('iframe');
        iframe.style.visibility = 'hidden'; 
        iframe.style.width = '1px'; 
        iframe.style.height = '1px'; 
        iframe.onload = function () { 
            setTimeout(function () {
                document.body.removeChild(iframe); 
            }, 0); 
        }; 
        document.body.appendChild(iframe);
    },
    //url参数加密
    tob : obj => window.btoa( unescape(encodeURIComponent(JSON.stringify(obj)))),
    //url参数解密
    too : str => JSON.parse( decodeURIComponent(escape(window.atob(str)))),
    //购买正则判断
    bugVerify (price) {
        let re = /^[0-9]*[1-9][0-9]*$/;
        return re.test(price) && (price.indexOf('.') < 0);
    },
    //placeholder 兼容
    placeholder: function () {
        var JPlaceHolder = {
            //检测
            _check: function () {
                return 'placeholder' in document.createElement('input');
            },
            //初始化
            init: function () {
                if (!this._check()) {
                    this.fix();
                }
            },
            //修复
            fix: function () {
                $(':input[placeholder]').each(function (index, element) {
                    var self = $(this), txt = self.attr('placeholder');
                    self.wrap($('<div></div>').css({
                        position: 'relative',
                        zoom: '1',
                        border: 'none',
                        background: 'none',
                        padding: 'none',
                        margin: 'none'
                    }));
                    var pos = self.position(), h = 20, paddingleft = self.css('padding-left');
                    var holder = $('<span></span>').text(txt).css({
                        'fontSize': '14px',
                        position: 'absolute',
                        left: pos.left + 20,
                        top: pos.top + 15,
                        height: h,
                        lienHeight: h,
                        color: '#aaa'
                    }).appendTo(self.parent());
                    self.focusin(function (e) {
                        holder.hide();
                    }).focusout(function (e) {
                        if (!self.val()) {
                            holder.show();
                        }
                    });
                    holder.click(function (e) {
                        holder.hide();
                        self.focus();
                    });
                });
            }
        };
        JPlaceHolder.init();
    },
    IEVersion: function () {
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;//IE版本<=7
            }
        } else if (isEdge) {
            return 'edge';//edge
        } else if (isIE11) {
            return 11; //IE11
        } else {
            return null;//不是ie浏览器
        }
    },
    //提现正则判断
    wdCash (price) {
        let re = /^\d+(\.\d{1,2})?$/;
        return re.test(price);
    },
    /**
     * 对输入的金额进行处理，最多n位小数
     * @param val: 新值
     * @param oldVal: 原值
     * @param n: 最多几位小数
     */
    amtInput: function (val, oldVal, n) {
        let _this = this,
            //回调结果
            result = val,
            Reg = /^\d+(\.\d{0,2})?$/,
            //按小数点进行拆分
            valList = (val + '').split('.');
        //console.log("oldVal: ", oldVal, " --- val: ", val, " --- list: ", valList);
        //默认两位小数
        n = _this.isNull(n)? 0 : 2;

        switch (valList.length){
            case 0:
                //一般不会用到，只要split最少都会有一个数组下标
                break;
            case 1:
                //如果只有一个数组项，则证明没有输入内容或者没有输入小数点
                //如果输入的是非数值，即为非法则使用原值，否则先设置为新值
                let numStr = isNaN(valList[0]) ? oldVal : val + '';
                //再对新值进行判断，如果非空则转为数字(例如02会转为2)，如果是空则使用当前值
                numStr = util.isNull(numStr) ? "" : Number(numStr);
                result = numStr;
                break;
            case 2:
                //如果有两个数组项，输入内容有小数点（即使只输入一个小数点也会生成两个下标）
                if(isNaN(valList[0]) || isNaN(valList[1])){
                    //如果小数点前后有任何一项输入了非数值，则认为输入非法，返回原值，即认为不可输入
                    result = oldVal;
                }else{
                    //如果第一项为空，即先输入一个点，则使用在前面自动加一个0
                    valList[0] = util.isNull(valList[0]) ? "0" : valList[0];
                    //把第一项处理为数值(例如02会转为2)
                    valList[0] = Number(valList[0]);
                    //如果第二项没有输入，则为空串，否则不处理
                    valList[1] = util.isNull(valList[1]) ? "" : valList[1];
                    //最多保留n个小数，n默认为2
                    valList[1] = valList[1].length > n ? valList[1].substr(0, n) : valList[1];
                    //把整数部分（第一项）和小数部分（第二项）进行拼接
                    result = valList.join(".");
                }
                break;
            default:
                //如果输入两个小数点，则使用原值
                result = oldVal;
                break;
        }

        return result;
    }
};

export default util;