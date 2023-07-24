const { exec } = require('child_process');
(async () => {
  console.log('开始生成日志。。。')
  exec('npm run build:changelog', (err) => {
    if (err) {
      console.error('生成版本日志出现了错误 ')
    } else {
      console.log('版本日志生成成功，正在提交日志文件。')
      exec('git add . && git commit -m "docs: 提交生成的更新日志。"', (err) => {
        if (err) {
          console.error('提交更新日志文件到 git 出现了错误。', err)
        } else {
          console.log('更新日志已经提交。')
        }
      })
    }
  })
})()
