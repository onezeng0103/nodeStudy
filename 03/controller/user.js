const fs = require('fs')
const { promisify } = require('util')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
exports.getUser = async (req, res) => {
    let data = await readFile('db.json', 'utf-8')
    console.log(data)
    res.send({
        code: 200,
        msg: 'success',
        // data: JSON.parse(data).user,
    })
}
exports.getUserId = async (req, res) => {
    let data = readFile('../../db.json', 'utf-8')
    res.send({
        code: 200,
        msg: 'success',
        data: JSON.parse(data).user.find(item => item.id === Number(req.params.id)),
    })
}
exports.postUser = async (req, res) => {
    if (!req.body) return res.status(403)
    let data = JSON.parse(await readFile('../../db.json', 'utf-8'))
    req.body.id = data.user[data.user.length - 1].id + 1
    data.user.push(req.body)
    await writeFile('../../db.json', JSON.stringify(data))
    res.send({
        code: 200,
        msg: '新增成功',
    })
}
exports.putUser = async (req, res) => {
    let data = JSON.parse(await readFile('../../db.json', 'utf-8'))
    let user = data.user.find(user => user.id === Number(req.params.id))
    user.username = req.body.username
    user.age = req.body.age
    await writeFile('../../db.json', JSON.stringify(data))
    res.send({
        code: 200,
        msg: '修改成功',
    })
}
exports.deleteUser = async (req, res) => {
    let data = JSON.parse(await readFile('../../db.json', 'utf-8'))
    data.user = data.user.filter(user => user.id !== Number(req.params.id))
    await writeFile('../../db.json', JSON.stringify(data))
    res.status({
        code: 200,
        msg: '删除成功',
    })
}
