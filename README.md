#### 功能
1、查看版本号
```
cat -v
```
2、查看更新
```
cat upgrade
```
3、mirror镜像切换
```
cat mirror 镜像链接
```
4、模版下载
```
cat template
```
#### 实现
1、命令声明  
```
// ./bin/index.js中做命令的声明匹配
program.command('upgrade')  //检查更新命令
program.command('mirror <tempalte_mirror>') //设置镜像
program.name('cat') //初始化
···
```

2、命令实现  
在./lib文件夹下，每个文件实现具体的命令操作

3、用到的第三方库
```
chalk 控制台字符样式
commander 实现nodejs命令行
download 实现文件远程下载
fs-extra 增强的基础文件操作库
handlebars 模版字符替换
inquirer 命令行之间的交互
log-symbols 为各种日志级别提供着色符号
ora 优雅终端spaining动画
update-notify 版本检查
```


