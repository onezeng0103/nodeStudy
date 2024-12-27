const fs = require('fs')
const url = require('url')
const querystring = require('querystring') // 将字符串转为对象
const { promisify } = require('util')
const readFile = promisify(fs.readFile) // 将readFile变成promise
const writeFile = promisify(fs.writeFile) // 将writeFile变成promise
module.exports = async (req, res) => {
    //获取请求路径
    const pathname = url.parse(req.url).pathname
    //获取请求参数
    const query = url.parse(req.url, true).query
    if (req.method === 'GET') {
        if (pathname === '/') {
            try {
                let data = await readFile('./index.html')
                res.end(data)
            } catch (err) {
                console.log(err)
            }
        } else if (pathname === '/bg.png') {
            let data = await readFile('./bg.png')
            try {
                res.end(data)
            } catch (err) {
                console.log(err)
            }
        } else if (pathname === '/user') {
            console.log(query.id)
            let data = await readFile('./user.json')
            try {
                const users = JSON.parse(data)
                const user = users.find(user => user.id === Number(query.id))
                res.end(JSON.stringify({ code: 200, msg: 'success', data: user }))
            } catch (err) {
                console.log(err)
            }
        }
    } else if (req.method === 'POST') {
        let str = ''
        // 监听数据
        req.on('data', chunk => {
            str += chunk
        })
        if (pathname === '/user') {
            // 监听结束
            req.on('end', async () => {
                let data = await readFile('./user.json')
                try {
                    const users = JSON.parse(data)
                    const parsedData = querystring.parse(str)
                    parsedData.id = users[users.length - 1].id + 1
                    users.push(parsedData)
                    await writeFile('./user.json', JSON.stringify(users))
                    res.end(JSON.stringify({ code: 200, msg: 'success' }))
                } catch (error) {
                    console.log(error)
                }
            })
        }
    } else if (req.method === 'PUT') {
        let str = ''
        req.on('data', chunk => {
            str += chunk
        })
        if (pathname === '/user') {
            req.on('end', async () => {
                let data = await readFile('./user.json')
                try {
                    const users = JSON.parse(data)
                    const parsedData = querystring.parse(str)
                    const user = users.find(user => user.id === Number(parsedData.id))
                    if (user) {
                        user.username = parsedData.username
                        user.age = parsedData.age
                        await writeFile('./user.json', JSON.stringify(users))
                        res.end(JSON.stringify({ code: 200, msg: 'success' }))
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }
}
