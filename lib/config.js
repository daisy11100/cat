const fse=require('fs-extra');
const path=require('path');
//生成默认的配置文件


//声明配置文件内容
const jsonConfig={
    'name':'cat',
    'mirror':'github.com:daisy11100/cat-template'
}

// 拼接config.json完整路径
const configPath=path.resolve(__dirname,'../config.json');

async function defConfig(){
    try{
        //利用fs-extra将jsonConfig封装成json文件
        await fse.outputJson(configPath,jsonConfig)
    }catch(err){
        console.log(err);
        process.exit();
    }
}

module.exports=defConfig;