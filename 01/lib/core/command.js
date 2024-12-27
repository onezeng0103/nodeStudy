const myAction = require('./action')
function myCommand(program) {
    program
        /**
         * 创建命令
         * @command 命令<必须接收参数>[剩余参数]
         * @description 添加描述
         * @alias crt //create的别名
         */
        .command('create')
        .description('创建项目')
        .alias('crt')
        .action(myAction)
}
module.exports = myCommand
