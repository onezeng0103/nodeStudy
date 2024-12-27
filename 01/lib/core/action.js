const inquirer = require('inquirer')
const { framwork, framworkUrl } = require('../../config.js')
const mySimple = require('./simple.js')
/**
 * 处理create命令回调函数
 * @param {string} project 项目名称
 * @param {string[]} others 其他参数
 */
function myAction(project, others) {
    inquirer
        .prompt([
            /**
             * 询问用户输入项目名称的交互式命令行选项
             * @type {string} - 选项类型为输入框
             * @name {string} - 用户输入的项目名称将存储在 'name' 中
             * @message {string} - 提示用户输入项目名称的消息
             */
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称：',
            },
            /**
             * 询问用户选择语言的交互式命令行选项
             * @type {list} - 选项类型为列表
             * @name {string} - 用户选择的语言将存储在 'framwork' 中
             * @message {string} - 提示用户请选择框架的消息
             * @choices {array} - 用户可选择的框架列表
             */
            {
                type: 'list',
                name: 'framwork',
                message: '请选择框架：',
                choices: framwork,
            },
            /**
             * 询问用户确认安装的交互式命令行选项
             * @type {confirm} - 选项类型为确认框
             * @name {string} - 用户的确认结果将存储在 'confirm' 中
             * @message {string} - 提示用户确认安装的消息
             */
            {
                type: 'confirm',
                name: 'confirm',
                message: '您确定要安装吗？',
            },
        ])
        .then(answers => {
            if (!answers.confirm) return
            mySimple(framworkUrl[answers.framwork], `${answers.name}`)
        })
}
module.exports = myAction
