const express = require('express')
const router = express.Router()
const userController = require('../../controller/user')

// 只要是/xx的路径就都能匹配到
router.all('/xx', (req, res) => {
    res.send({
        code: 200,
        msg: 'success',
    })
})
/**
 * /us?er  表示?前面的字母可以省略
 * /us+er  表示可以有多个+前面的字母
 * /us*er  通配符表示可以在当前位置匹配任意字符
 */
router.get('/user', userController.getUser).get('/user/:id', userController.getUserId)
router.post('/user', userController.postUser)
router.put('/user/:id', userController.putUser)
router.delete('/user/:id', userController.deleteUser)
module.exports = router
