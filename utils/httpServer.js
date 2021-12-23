
const request = require('request');

/**
 * request网络请求封装
 * @param {string} config 请求头
 * @returns
 */
function requestGet(config={}) {
    console.log('===================requestGet=====================');
     return new Promise( (resolve, reject)=>{
        request(config, (erro,response, body)=>{
            if (response && response.statusCode == 200) {
                console.log('请求成功！')
                resolve({
                    code:200,
                    data:body
                });
            }else{
                console.log('请求失败！')
                reject({
                    code:500,
                    data:'网络异常'
                })
            }
        })
    });
}

module.exports = {
    requestGet
};