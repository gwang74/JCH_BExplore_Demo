import api from './api'
import { formatUnixTime, formatUSATime } from './utils'

//创建钱包
// secret	井通钱包私钥
// address	井通钱包地址
export const createWallet = async() => {
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
export const getAccountBalance = async(address) => {
    try {
        let res = await api.get_account_balance(address);
        let data;
        if (res.success) {
            data = res.balances
        }
        return data;
    } catch (error) {
        return error;
    }
}

//获取账号挂单
// type	挂单的类型，sell或buy
// pair	交易的货币对
// amount	挂单的数量
// price	挂单的价格
// sequence	交易序列号
export const getAccountOrders = async(address) => {
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
        return error;
    }
}

//根据hash查询交易信息
// date	交易时间，UNIXTIME
// hash	交易hash
// type	交易类型（见下备注）
// fee	交易费用，井通计价
// result	交易结果
// counterparty	交易对家
// amount	交易金额
// effects	详见effects解释
export const getTransactionsByHash = async(hash) => {
    try {
        let res = await api.get_transactions_by_hash(hash);
        let datas;
        if (res.success) {
            datas = res.transaction
        }
        datas.date = formatUnixTime(datas.date)
        if (datas.pair) {
            datas.pair = datas.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
            datas.pair = datas.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
        }
        if (datas.effects.length > 0) {
            for (let effect of datas.effects) {
                effect.pair = effect.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
                effect.pair = effect.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
            }
        }
        return datas;
    } catch (error) {
        return error;
    }
}

//根据钱包地址查询交易记录
// date	交易时间，UNIXTIME
// hash	交易hash
// type	交易类型（见下备注）
// fee	交易费用，井通计价
// result	交易结果
// memos	交易备注
// counterparty	交易对家，支付交易才有
// amount	交易金额/挂单数量，支付交易或者挂单交易才有
// offertype	挂单类型，sell或者buy，挂单交易才有
// pair	交易的货币对，挂单交易才有
// price	挂单的价格，挂单交易才有
// effects	详见effects解释
export const getTransactionsByaddress = async(address) => {
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
            if (data.effects && data.effects.length > 0) {
                for (let effect of data.effects) {
                    effect.pair = effect.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
                    effect.pair = effect.pair.replace(":jGa9J9TkqtBcUoHe2zqhVFFbgUVED6o9or", "")
                }
            }
        }
        return datas;
    } catch (error) {
        return error;
    }
}


// 获得最新账本号
// success	请求结果
// ledger_hash	账本hash
// ledger_index	账本号/区块高度
export const getLedgerIndex = async() => {
    try {
        let res = await api.get_ledger_index();
        return res;
    } catch (error) {
        return error;
    }
}

// 通过账本号获得某一账本信息及交易信息
// success	请求结果
// accepted	区块是否已经产生
// account_hash	状态hash树根
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
// transactionLength 交易数
export const getLedgerInformationByIndex = async(index) => {
    try {
        let res = await api.get_ledger_information_by_index(index);
        if (res.transactions) {
            res.transactionLength = res.transactions.length;
        }
        if (res.close_time_human) {
            res.close_time_human = formatUSATime(res.close_time_human);
        }
        return res;
    } catch (error) {
        return error;
    }
}

// 通过账本hash获得某一账本信息及交易信息
// success	请求结果
// accepted	区块是否已经产生
// account_hash	状态hash树根
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
<<
<< << < HEAD
export const getLedgerInformationByHash = async(hash) => { ===
        === =
        // transactionLength 交易数
        export const getLedgerInformationByHash = async(hash) => { >>>
            >>> > zcZhang
            try {
                let res = await api.get_ledger_information_by_hash(hash);
                if (res.transactions) {
                    res.transactionLength = res.transactions.length;
                }
                if (res.close_time_human) {
                    res.close_time_human = formatUSATime(res.close_time_human);
                }
                return res;
            } catch (error) {
                return error;
            }
        }

        //获取最新区块高度
        // hash 哈希
        // ledger_index 高度
        // transactionLength 交易数
        // close_time_human 时间
        export const getLedgerNew = async() => {
            let ledger = await getLedgerIndex();
            let ledgerNewData = [];
            for (let i = 0; i < 6; i++) {
                let data = await getLedgerInformationByIndex(ledger.ledger_index * 1 - i)
                ledgerNewData.push(data)
            }
            return ledgerNewData;
        }

        //获取最新数据
        // account 交易发起方
        // amount 交易内容 {currency 币种名称， value 金额}
        // counterparty 交易对家
        // date 时间
        // effects: []
        // fee 燃料费用
        // hash 哈希
        // ledger 账本号
        // memos 备注
        // result 交易结果
        // type 交易类型（见下备注）
        export const getHomeData = async() => {
            let ledger = await getLedgerIndex();
            let ledgerData = await getLedgerInformationByIndex(ledger.ledger_index)
            let hashDatas = ledgerData.transactions
            let homeDatas = [];
            if (hashDatas && hashDatas.length > 0) {
                for (let hash of hashDatas) {
                    homeDatas.push(await getTransactionsByHash(hash))
                }
            }
            return homeDatas
        }


        // 关于交易类型
        // type有如下几种：

        // 1.sent，用户进行支付（转账）操作，交易信息中包含的信息有：
        // counterparty	支付对家，即接收方
        // amount	交易记录标记
        // value	金额
        // currency	货币
        // issuer	货币发行方，SWT为空
        // effects	详见effects解释


        // 2.received，用户接受支付，在交易信息中包含的信息有：
        // counterparty	支付对家，即接收方
        // amount	交易记录标记
        // value	金额
        // currency	货币
        // issuer	货币发行方，SWT为空
        // effects	详见effects解释


        // 3.convert，用户进行兑换操作，在交易信息中包含的信息有：
        // spent	兑换支付的金额
        // value	金额
        // currency	货币
        // issuer	货币发行方，SWT为空
        // amount	交易记录标记
        // value	金额
        // currency	货币
        // issuer	货币发行方，SWT为空
        // effects	详见effects解释


        // 4.offernew，用户进行挂单操作，在交易信息中包含的信息有：
        // offertype	挂单类型，sell或buy
        // pair	交易的货币对
        // amount	挂单的数量
        // price	挂单的价格
        // effects	详见effects解释

        // 5.offercancel，用户进行取消挂单操作，在交易信息中包含的信息有：
        // type	挂单的类型，sell或buy
        // pair	交易的货币对
        // amount	挂单的数量
        // price	挂单的价格
        // effects	详见effects解释

        // 6.offereffect，挂单成交情况，即被动成交的情况，在交易信息中包含的信息有：
        // effects	详见effects解释