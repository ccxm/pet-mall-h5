import * as user from './user'
import * as publicRequest from './public'
import * as account from './account'
import * as cart from './cart'
import * as comment from './comment'
import * as order from './order'
import * as goods from './goods'
import * as address from './address'

const api = {
    user,
    account,
    cart,
    comment,
    order,
    goods,
    address,
    public: publicRequest
}

export default api

export function CreateDto(obj) {
    return () => {
        if (typeof obj !== 'object' || obj === null) {
            return {}
        }
        return {
            ...obj
        }
    }
}
