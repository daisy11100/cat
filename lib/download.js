const download=require('download-git-repo');
//ora用于实现等待动画
const ora=require('ora');
const chalk=require('chalk');
const fse=require('fs-extra');
const path=require('path');

const tplPath=path.resolve(__dirname,'../tempalte/');

// 清除模版文件夹的相关内容
async function dlTemplate(){
    try{
        await fse.remove(tplPath)
    }catch(err){
        console.log(err);
        process.exit() 
    }
    //等待动画
    const dlSpinner=ora(chalk.cyan('Downloading template...'))

    dlSpinner.start();
    download('github.com:daisy11100/cat-template', path.resolve(__dirname,'../template/'),{ clone: true },(err)=>{
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


