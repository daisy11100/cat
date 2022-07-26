const fse=require('fs-extra');
const ora=require('ora');
const chalk=require('chalk');
const symbols=require('log-symbols');
const inquirer=require('inquirer');
const handlebars=require('handlebars');
const path=require('path');

const dlTemplate=require('./download');

async function initProject(projectName){
    try{
        const exists=await fse.pathExists(projectName);
        if(exists){
            console.log(symbols.error,chalk.red('The project already exists'));
        }else{
            inquirer
                .prompt([
                    {
                        type:'input',
                        name:'name',
                        message:'Set a global name for javascript plugin?',
                        default:"Default"
                    },
                ])
                .then(async (answers)=>{
                    const initSpinner =ora(chalk.cyan('Initalizing project...'));
                    initSpinner.start();
                    const tempaltePath = path.resolve(__dirname,'../template/');
                    const processPath=process.cwd();
                    const LCProjectName=projectName.toLowerCase();
                    const targetPath=`${processPath}/${LCProjectName}`;
                    const exists=await fse.pathExists(tempaltePath);
                    if(!exists){
                        await dlTemplate()
                    }

                    try{
                        await fse.copy(tempaltePath,targetPath)
                    }catch(err){
                        console.log(symbols.error,chalk.red(`Copy template failed.${err}`));
                        process.exit();
                    }

                    const multiMeta={
                        project_name:LCProjectName,
                        global_name:answers.name
                    }

                    const multiFiles=[
                        `${targetPath}/package.json`,
                        `${targetPath}/gulpfile.js`,
                        `${targetPath}/test/index.html`,
                        `${targetPath}/src/index.js`
                    ]

                    for(let i=0;i<multiFiles.length;i++){
                        try{
                            const multiFilesContent =await fse.readFile(multiFiles[i],'utf8');
                            const multiFilesResult=await handlebars.compile(multiFilesContent)(multiMeta);
                            await fse.outputFile(multiFiles[i],multiFilesResult);
                        }catch(err){
                            initSpinner.text=chalk.red(`Initalize project failed.${err}`);
                            initSpinner.fail();
                            process.exit();
                        }
                    }
                    initSpinner.text='Initalize project successful';
                    initSpinner.succeed();
                    console.log(`
                        to get started:
                        cd ${chalk.yellow(LCProjectName)}
                        ${chalk.yellow('npm install')} or ${chalk.yellow('yarn install')}
                        ${chalk.yellow('npm run dev')} or ${chalk.yellow('yarn run dev')}
                    `)
                })
                .catch((err)=>{
                    if(err.isTtyError){
                        console.log(symbols.err,chalk.red("Prompt couldn't be rendered in the current environment."))
                    }else{
                        console.log(symbols.err,chalk.red(err))
                    }
                })
        }
    }catch(err){
        console.log(err)
        process.exit()
    }
}

module.exports=initProject