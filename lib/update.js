//引入 update-notifier库 ，检查更新
const updateNotifier=require('update-notifier');

//引入chalk库，检查控制台字样
const chalk=require('chalk');

//引入pakeage.json，用于update-notifier库读取相关信息
const pkg=require('../package-lock.json');

const notifier=updateNotifier({
    //从package中检查version和name是否更新
    pkg,
    //检查周期设置为1s，默认一天
    updateCheckInterval:1000
})

function updateChk(){
    //当检测到更新时，notifier.update会返回object
    //notifier.update.latest最新版本号
    if(notifier.update){
        console.log(`New version available:${chalk.cyan(notifier.update.latest)},it's recommended that you update before using`)
        notifier.notify()
    }else{
        console.log('No new version is available.')
    }
}

module.exports=updateChk;