const download=require('download-git-repo');
//ora用于实现等待动画
const ora=require('ora');
const chalk=require('chalk');
const fse=require('fs-extra');
const path=require('path');

const defConfig=require('./config');

const cfgPath=path.resolve(__dirname,'../config.json');

const tplPath=path.resolve(__dirname,'../tempalte');

async function dlTemplate(){
    const exists=await fse.pathExists(cfgPath);
    //判断是否存在配置
    if(exists){
        await dlAction();
    }else{
        await defConfig();
        await dlAction();
    }
}

// 清除模版文件夹的相关内容
async function dlAction(){
    try{
        await fse.remove(tplPath)
    }catch(err){
        console.log(err);
        process.exit() 
    }
    // 读取config，获取mirror链接
    const jsonConfig=await fse.readJson(cfgPath);
    //等待动画
    const dlSpinner=ora(chalk.cyan('Downloading template...'))

    dlSpinner.start();
        // 'direct:http://10.128.128.128:8092/HTML5/miniProgram'
        download(`github:daisy11100/cat-template`,'./template',(err)=>{
            if(err){
                dlSpinner.text=chalk.red(`Download template failed.${err}`);
                dlSpinner.fail();
                process.exit();
            }else{
                dlSpinner.text='Download template successful.'
                dlSpinner.succeed()
            }
        });
}

module.exports=dlTemplate;


