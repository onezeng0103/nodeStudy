#! /usr/bin/env node
const { program } = require('commander')
const myHelp = require('../lib/core/help.js')
const myCommand = require('../lib/core/command.js')
// 可以通过process.argv获取命令行参数
if (process.argv[2] === '--help') {
    console.log('是help')
}
myHelp(program)
myCommand(program)
program.parse(process.argv) //接收命令行参数
