function myHelp(program) {
    /**
     * 添加命令
     * @option <选项> <选项描述>
     * @option -f 命令简写
     * @option --framwork 完整命令
     * @option <framwork> 是否必填
     * @option 设置框架 选项描述
     * @option false 默认值
     */
    program.option('-f, --framwork <framwork>', '设置框架')
    program.option('-d, --debug', '是否开启调试模式', false)
}
module.exports = myHelp
