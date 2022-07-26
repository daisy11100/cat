#!/usr/bin/env node

// 请求commander库
const program =require('commander');
const updateChk=require('../lib/update');
const setMirror =require('../lib/mirror');
const dlTemplate = require('../lib/download');
const initProject = require('../lib/init');

//从package.json中请求version字段的值。
program.version(require('../package.json').version,'-v,--version');

//检查更新
program
    //声明命令
    .command('upgrade')
    .description('check the cat version.')
    .action(()=>{
        //执行/lib/update里面的操作
        updateChk()
    })

// 设置mirror链接
program
    .command('mirror <tempalte_mirror>')
    .description('set template mirror')
    .action((tplMirror)=>{
        setMirror(tplMirror)
    })

// 下载模版
program
    .command('template')
    .description('download template from mirror')
    .action(()=>{
        dlTemplate();
    })

// 初始化
program
    .name('cat')
    .usage('<commands> [options]')
    .command('init <project_name')
    .action(project=>{
        initProject(project)
    })

// 解析命令行参数
program.parse(process.argv);