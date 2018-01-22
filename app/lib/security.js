import forge from 'node-forge';
let Security = {};
let defaultSettings = {
    prefix  : '8!9HA3D6GB2A4mb2',                         // 前缀
    suffix  : '9Cx8BB@A41B59658',                         // 后缀
    iv      : '7O0(B7#2T7F04f4p',                         // aes iv
    key     : '9FA0EC4F37A4437cA65F4C4D4BEE56D3',         // aes key
    aes_type: "AES-CFB"
};
Security.forge = forge;
// AES 加密/解密
Security.aes = {
	/**
	 * 加密
	 * @param opts
	 *  opts{
		 *    target: 被加密字符串
		 *    key： aes key
		 *    iv: aes iv
		 *  }
	 * @returns {*}
	 */
    encode: function(opts){
        let target = opts.target || "",
            key = opts.key || defaultSettings.key,
            iv = opts.iv || defaultSettings.iv,
            cipher = forge.cipher.createCipher(defaultSettings.aes_type, key);
        cipher.start({iv: iv});
        cipher.update(forge.util.createBuffer(target));
        cipher.finish();
        // console.log(forge.util.binary.base64.encode(cipher.output.bytes(), 2))
        return cipher.output.getBytes();
	},
    /**
     * 解密
     * opts{
		 *    target: 被解密字符串
		 *    key： aes key
		 *    iv: aes iv
		 *  }
     * @param opts
     */
    decode: function(opts){
        let target = opts.target || "",
            key = opts.key || defaultSettings.key,
            iv = opts.iv || defaultSettings.iv,
            bytes = forge.util.hexToBytes(target),
            buffer = forge.util.createBuffer(bytes),
            decipher = forge.cipher.createDecipher(defaultSettings.aes_type, key);
        decipher.start({iv: iv});
        decipher.update(buffer);
        decipher.finish();
        return decipher.output.getBytes();
    }
};

// md5
Security.md5 = {
    encode: function(str){
        str = str || "";
        let md = forge.md.md5.create();
        md.update(str);
        return md.digest().toHex().toUpperCase();
    }
};

//Base64
Security.base64 = {
    encode: function(str){
        str = str || "";
        return forge.util.encode64(str);
    },
    decode: function(hex){
        hex = hex || "";
        return forge.util.decode64(hex);
    }
};

// 获得当前时间 格式：yyyyMMddhhmmss
Security.now = function(){
    let arr = [],
        date = new Date();
    arr[0] = date.getFullYear();
    arr[1] = (date.getMonth() + 1);
    arr[2] = date.getDate();
    arr[3] = date.getHours();
    arr[4] = date.getMinutes();
    arr[5] = date.getSeconds();

    let i = 0;
    while ( i < arr.length){
        if(arr[i] < 10){
            arr[i] = "0" + arr[i];
        }
        i++;
    }
    return arr.join("");
};

// 32Byte随机密钥
Security.random = function(size){
    size = size || 16;
    let bytes = forge.random.getBytesSync(size);
    return forge.util.bytesToHex(bytes).toUpperCase();
};

/**
 * 变换后的密码
 * @param pwd
 * @returns {*}
 */
Security.convertedPassword = function(pwd){
    pwd = pwd || "";
    let arr = [];
    arr[0] = defaultSettings.prefix;
    arr[1] = pwd;
    arr[2] = defaultSettings.suffix;
    return Security.md5.encode(arr.join(""));
};

/**
 * 传输密码
 * @param pwd
 * @returns {null}
 */
Security.transferPassword = function(pwd) {
    pwd = pwd || "";
    let convertedPassword = Security.convertedPassword(pwd);
    let aesStr = Security.aes.encode({target: convertedPassword});

    let base64Str = Security.base64.encode(aesStr);
    return base64Str;
};


/**
 * 认证字符串
 * @param opts
 *  opts{
	 *    randomCode: 32Byte随机密钥
	 *    username: 登录名
	 *    passowrd: 变换后的密码
	 *    date		: 当前日期
	 *  }
 * @returns {string}
 */
Security.authStr = function(opts){
    let arr = [];
    arr[0] = opts.randomCode || Security.random();
    arr[1] = opts.username || "";
    arr[2] = opts.date || Security.now();
    let aesStr = Security.aes.encode({
        target: arr.join(""),
        key: opts.passowrd || ""
    });
    let base64Str = Security.base64.encode(aesStr);
    return base64Str;
};

/**
 * 解密认证结果
 * @param opts
 * opts{
	 *  target: 认证结果,
	 *  key: aes key
	 * }
 * @returns [randomCode(32Byte传输密钥), username(登录名), date(时间)]
 */
Security.deAuthResultStr = function(opts){
    let target = opts.target || "",
        key = opts.key || defaultSettings.key;
    let deBase64Str = forge.util.bytesToHex(Security.base64.decode(target));
    let deAesStr = Security.aes.decode({
        target: deBase64Str,
        key: key
    });
    let randomCode = deAesStr.slice(0, 32);
    let date = deAesStr.slice(-14);
    let username = deAesStr.replace(randomCode, "").replace(date, "");
    return [randomCode, username, date];
};

/**
 * 通信认证字串
 * @param opts
 * {
	 *  username: 登录名,
	 *  key: 32Byte传输密钥
	 * }
 * @returns {*}
 */
Security.communicationCertification = function(opts){
    let username = opts.username || "",
        date = Security.now(),
        key = opts.key || Security.random();
    let aesStr = Security.aes.encode({
        target: username + date,
        key: key
    });
    let base64Str = Security.base64.encode(aesStr);
    return base64Str;
};
export default Security;