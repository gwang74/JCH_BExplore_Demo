import api from './api'
import { formatUnixTime } from './utils'

//创建钱包
// secret	井通钱包私钥
// address	井通钱包地址
export const createWallet = async () => {
    try {
        let res = await api.create_wallet();
        let data;
        if (res.success) {
            data = res.wallet
        }
        return data;
    } catch (error) {
        return '创建钱包失败';
    }
}

//获取钱包余额
// value    账户余额
// currency 币种名称
// issuer   发行方
// freezed  冻结
export const getAccountBalance = async (address) => {
    try {
        let res = await api.get_account_balance(address);
        let data;
        if (res.success) {
            data = res.balances
        }
        return data;
    } catch (error) {
        return '';
    }
}

//获取账号挂单
// type	挂单的类型，sell或buy
// pair	交易的货币对
// amount	挂单的数量
// price	挂单的价格
// sequence	交易序列号
export const getAccountOrders = async (address) => {
    try {
        let res = await api.get_account_orders(address);
        let datas;
        if (res.success) {
            datas = res.orders
        }
        for (let data of datas) {
            data.pair = data.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
            data.pair = data.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
        }
        return datas;
    } catch (error) {
        return '';
    }
}

//根据hash查询交易信息
// date	交易时间，UNIXTIME
// hash	交易hash
// type	交易类型
// fee	交易费用，井通计价
// result	交易结果
// counterparty	交易对家
// amount	交易金额
export const getTransactionsByHash = async (hash) => {
    try {
        let res = await api.get_transactions_by_hash(hash);
        let datas;
        if (res.success) {
            datas = res.transaction
        }
        datas.date = formatUnixTime(datas.date)
        return datas;
    } catch (error) {
        return '';
    }
}

//根据钱包地址查询交易记录
// date	交易时间，UNIXTIME
// hash	交易hash
// type	交易类型
// fee	交易费用，井通计价
// result	交易结果
// memos	交易备注
// counterparty	交易对家，支付交易才有
// amount	交易金额/挂单数量，支付交易或者挂单交易才有
// offertype	挂单类型，sell或者buy，挂单交易才有
// pair	交易的货币对，挂单交易才有
// price	挂单的价格，挂单交易才有
export const getTransactionsByaddress = async (address) => {
    try {
        let res = await api.get_transactions_by_address(address);
        let datas;
        if (res.success) {
            datas = res.transactions
        }
        for (let data of datas) {
            data.date = formatUnixTime(data.date)
            if (data.pair) {
                data.pair = data.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
                data.pair = data.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
            }
        }
        return datas;
    } catch (error) {
        return '';
    }
}


// 获得最新账本号
// success	请求结果
// ledger_hash	账本hash
// ledger_index	账本号/区块高度
export const getLedgerIndex = async () => {
    try {
        let res = await api.get_ledger_index();
        return res;
    } catch (error) {
        return '';
    }
}

// 通过账本号获得某一账本信息及交易信息
// success	请求结果
// accepted	区块是否已经产生
// account_hash	状态hash树根
// close_time	关闭时间
// close_time_human	关闭时间
// close_time_resolution	关闭周期
// closed	账本是否已经关闭
// hash	账本hash
// ledger_hash	账本hash
// ledger_index	账本高度/区块高度
// parent_hash	上一区块hash值
// seqNum	账本高度/区块高度
// totalCoins	swt总量
// total_coins	swt总量
// transaction_hash	交易hash树根
// transactions	该账本里的交易列表
export const getLedgerInformationByIndex = async (index) => {
    try {
        let res = await api.get_ledger_information_by_index(index);
        return res;
    } catch (error) {
        return '';
    }
}

// 通过账本hash获得某一账本信息及交易信息
// success	请求结果
// accepted	区块是否已经产生
// account_hash	状态hash树根
// close_time	关闭时间
// close_time_human	关闭时间
// close_time_resolution	关闭周期
// closed	账本是否已经关闭
// hash	账本hash
// ledger_hash	账本hash
// ledger_index	账本高度/区块高度
// parent_hash	上一区块hash值
// seqNum	账本高度/区块高度
// totalCoins	swt总量
// total_coins	swt总量
// transaction_hash	交易hash树根
// transactions	该账本里的交易列表
export const getLedgerInformationByHash = async (hash) => {
    try {
        let res = await api.get_ledger_information_by_hash(hash);
        return res;
    } catch (error) {
        return '';
    }
}

