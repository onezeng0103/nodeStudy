const simpleGit = require('simple-git')
const git = simpleGit()
git.clone('https://github.com/onezeng0103/daping.git', './xx')
    .then(() => console.log('Repository cloned successfully!'))
    .catch(err => console.error('Error:', err))
// download('https://github.com/onezeng0103/daping.git', './xx', { clone: true }, function (err) {
//     console.log(err)
// })
