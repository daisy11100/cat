const symbols=require('log-symbols');
const fse=require('fs-extra');
const path=require('path');
const cfgPath=path.resolve(__dirname,"../config.json");
const chalk = require('chalk');
//请求默认的配置文件
const defConfig=require('./config');
//拼接config.json的完整路径

async function mirrorAction(link){
    try{
        //读取config.json文件
        const jsonConfig=await fse.readJson(cfgPath);
        //将link写入config文件
        jsonConfig.mirror=link
        //再写入config.json
        await fse.writeJson(cfgPath,jsonConfig);
        console.log(symbols.success,'set the mirror successful');
    }catch(err){
        console.log(symbols.error,chalk.red(`set the mirror failed.${err}`));
        process.exit();
    }
}

async function setMirror(link){
    const exists=await fse.pathExists(cfgPath);
    // 判断是否存在config.json文件
    if(exists){
        //存在直接写入配置
        mirrorAction(link);
    }else{
        //否则读取默认配置，然后写入
        await defConfig();
        mirrorAction(link)
    }
}

module.exports=setMirror;