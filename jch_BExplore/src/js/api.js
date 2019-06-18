var http = require('http');

let host = 'http://localhost:3000';

const api = {
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
    }
}

export default api;
