import { service } from './index.js'

export const book = {
    searchBook: async (searchBook) => {
        await service.get('user/findAllUsers').then(
            res => {
                if (res.status == 200) {
                    return res.data;
                } else {
                    ElMessage.error('连接错误！！')
                }
            })
    }
}