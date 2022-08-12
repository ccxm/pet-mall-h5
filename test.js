// const arr = [{
//     'name': 'ZX',
//     'age': 12
// }, {
//     'name': 'ZX',
//     'age': 12
// }, {
//     'name': 'ZY',
//     'age': 14
// }]
//
// function isEqual(obj1, obj2) {
//     return JSON.stringify(obj1) === JSON.stringify(obj2)
// }
//
// function fun(arr = []) {
//     for (let i = arr.length - 1; i >= 0; i--) {
//         for (let j = 0; j < i; j++) {
//             if (isEqual(arr[i], arr[j])) {
//                 arr.splice(i, 1)
//                 break
//             }
//         }
//     }
//     return arr
// }
//
// console.log(fun(arr))

function run(fun) {
    const gen = fun()

    const next = (...args) => {
        const result = gen.next(...args)
        console.log(result)
        if (result.done) {
            return result.value
        }
        return next(result.value)
    }

    return next()
}

function fetch(data) {
    return new Promise(resolve => {
        resolve(data)
    })
}

function * foo() {
    const response1 = yield fetch('response1') // 返回promise对象
    console.log(response1)
    const response2 = yield fetch('response2') // 返回promise对象
    console.log(response2)
}

function * helloWorldGenerator() {
    const data1 = yield 'hello'
    console.log(data1)
    const data2 = yield 'world'
    console.log(data2)
    return 'ending'
}

// console.log(run(helloWorldGenerator))

function runPromise(promise, ...args) {
    const gen = promise.apply(this, args)
    return new Promise(resolve => {
        function next(...args) {
            const { value, done } = gen.next(...args)
            if (done) {
                return resolve(value)
            }
            return Promise.resolve(value).then(res => {
                next(res)
            })
        }
        next()
    })
}

// console.log(runPromise(foo))
runPromise(foo).then(res => {
    console.log(res)
})

// token无感刷新的过程

