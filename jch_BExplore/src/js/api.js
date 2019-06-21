var http = require('http');

let host = 'http://localhost:3000';

const api = {
    //创建钱包
    create_wallet() {
        return new Promise(function (resolve, reject) {
            var url = host + "/v2/wallet/new";
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    //获得账号余额
    get_account_balance(address) {
        return new Promise(function (resolve, reject) {
            var url = host + "/v2/accounts/" + address + '/balances';
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    //获取账号挂单
    get_account_orders(address) {
        var url = host + "/v2/accounts/" + address + '/orders';
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    //根据hash查询交易信息
    get_transactions_by_hash(hash) {
        var url = host + "/v2/transactions/" + hash;
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    //根据钱包地址查询交易记录
    get_transactions_by_address(address) {
        var url = host + "/v2/accounts/" + address + '/transactions';
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    // 获得最新账本号
    get_ledger_index() {
        var url = host + "/v2/ledger/index"
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    // 通过账本号获得某一账本信息及交易信息
    get_ledger_information_by_index(index) {
        var url = host + "/v2/ledger/index/" + index
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    // 通过账本hash获得某一账本信息及交易信息
    get_ledger_information_by_hash(hash) {
        var url = host + "/v2/ledger/hash/" + hash
        return new Promise(function (resolve, reject) {
            http.get(url, function (res) {
                var html = '';
                res.on('data', function (data) {
                    html += data
                })
                res.on('end', function () {
                    resolve(JSON.parse(html))
                })
            }).on('error', function (e) {
                reject(e)
            })
        })
    },

    transfer_accounts(address, post_data) {
        var content = JSON.stringify(post_data);
        var options = {
            host : 'localhost',
            port : 3000,
            path : '/v2/accounts/'+ address +'/payments',
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
                'Content-Length' : content.length
            }
        };
        var req = http.request(options, function(res) {
            console.log("statusCode: ", res.statusCode);
            console.log("headers: ", res.headers);
            var _data = '';
            res.on('data', function(chunk) {
                _data += chunk;
            });
            res.on('end', function() {
                console.log("\n--->>\npostresult:", _data)
            });
        });
        req.write(content);
        req.end();
    }
}

export default api;
