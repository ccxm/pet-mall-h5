const pluginName = 'RecordPlugin'
const fs = require('fs')
class RecordPlugin {
    constructor(tag) {
        this.tag = tag
    }
    apply(compiler) {
        compiler.hooks.entryOption.tap(pluginName, () => {
            this.startTime = +new Date()
        })
        compiler.hooks.done.tap(pluginName, () => {
            const endTime = (+new Date() - this.startTime) / 1000
            this.record(this.tag, endTime)
        })
    }

    record(tag, second) {
        const json = require('../record.json')
        const obj = json[tag] || { speeds: [], avgSpeed: 0 }
        obj.speeds.push(second)
        const sum = obj.speeds.reduce((a, b) => a + b)
        obj.avgSpeed = sum / obj.speeds.length
        json[tag] = obj
        fs.writeFileSync('./record.json', JSON.stringify(json, '', 2))
        // console.log(json)
        // console.log(obj)
    }
}

module.exports = RecordPlugin
