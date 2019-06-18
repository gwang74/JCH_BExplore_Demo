import api from './api'

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