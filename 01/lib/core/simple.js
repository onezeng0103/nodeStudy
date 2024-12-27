const simpleGit = require('simple-git')
const ora = require('ora')
const chalk = require('chalk') // 用于终端样式

function mySimple(url, dest) {
    const spinner = ora('项目下载中').start() // 开始 loading 动画
    const git = simpleGit()
    git.clone(url, dest)
        .then(() => {
            spinner.succeed(chalk.green('Download successful!')) // 下载成功
            console.log(chalk.blue('cd ' + dest))
            console.log(chalk.blue('npm install'))
            console.log(chalk.blue('npm run dev'))
        })
        .catch(err => {
            spinner.fail(chalk.red(err)) // 下载失败
        })
}
module.exports = mySimple
