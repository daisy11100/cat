#!/usr/bin/env node

// 请求commander库
const program =require('commander');
const updateChk=require('../lib/update');
const setMirror =require('../lib/mirror')
// import { updateChk } from '../lib/update'

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

program
    .command('mirror <tempalte_mirror>')
    .description('set template mirror')
    .action((tplMirror)=>{
        setMirror(tplMirror)
    })


// 解析命令行参数
program.parse(process.argv);