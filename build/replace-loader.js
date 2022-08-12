module.exports = function(source) {
    // console.log('hello loader')
    // console.log(source)
    let isMatch = false
    const reg = /(<!--<replace-loader>-->)([\s]+[\d\D]*?)(<!--<\/replace-loader>-->)/m
    console.log(reg.test(source))
    isMatch = reg.test(source)
    source = source.replace(reg, (_, $1, $2, $3) => {
        console.log(_)
        return $1 + '\n        <h2>Hello Loader</h2>\n        ' + $3
    })
    if (isMatch) {
        console.log(source)
    }
    return source
}

const str = `
    <!--<replace-loader>-->
        <banner />
    <!--</replace-loader>-->
`

// const reg = /<upload(.*)\/>/
// console.log(str.match(reg)[1])
// const attrStr = str.match(reg)[1]
// const attrs = attrStr.trim().match(/(v-for|:?\w+?)=(".+?")/g)
// console.log(attrs)
// const reg = /(<!--<replace-loader>-->)([\s]+[\d\D]*?)(<!--<\/replace-loader>-->)/m
// const temp = str.replace(reg, (_, $1, $2, $3) => {
//     console.log([$2])
//     return $1 + '\n   <h2>Hello Loader</h2>\n    ' + $3
// })
//
// console.log(temp)

