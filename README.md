# Eating

Eating项目是广东海洋大学14级软件工程系的校内企业实训项目——吃货宝点餐系统，而本仓库的项目是Eating的用户前端项目，项目基于Angular 5开发，使用了阿里前端团队维护的NG-ZORRO组件库。

## 基本说明

这是我用Angular 5以及阿里团队的组件库NG-ZORRO完成的首页静态页面。阿里这个组件库比饿了么的好用，但是对我们这些不熟悉NG的人来说其实还是存在一些“坑”的。只是使用一些布局、按钮等组件的话还是很容易上手的，如果用到了一些比较麻烦的组件的时候你们就要多注意一下，如果有问题可以去组件库的github上看看有没有Issue提到了相关问题。我用了一下，感觉常出现的问题就是该导入的模块没导入，比如使用form表单、ngModel时需要导入ng的formMoudle，原因还是出在我们不熟NG，所以遇到问题多百度一下吧，边用边学。

另外一个要注意的就是自定义样式的问题，这个组件自定义样式算是比较简单的，直接给要添加样式的组件加上你自己定义的CSS类名就OK，但是有些组件编译后标签结构跟开发的时候是不一样的，所以遇到这种就麻烦点，目前我找到的解决办法就是直接看chrome的控制台，找到编译后真正需要修改样式的那个标签，然后看它的类名是什么，你直接在src目录下的styles.css里用这个类名写你自己的样式，这样就会覆盖了。

下面是NG-ZORRO的官方文档以及项目地址：

[NG-ZORRO](https://ng.ant.design/#/docs/angular/introduce)

[GitHub of NG-ZORRO](https://github.com/NG-ZORRO/ng-zorro-antd)

这个是Angular CLI 的项目地址，有啥不会的可以上去看： [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

## 命名规范

模块文件夹命名的时候在后面加个“-module”,命名的时候也是用“-“连接两个单词，例如：点餐模块的文件夹命名为：order-module

组件命名的时候我想都在前面加个“e-”，命名的时候使用 “-” 连接两个单词，示例：

`ng g component components/e-shop-list`

自定义的类名我想都在前面加个“cus-”，例如你对组件库的按钮的样式不满意，你就给它加个自己的CSS类，名字为"cus-xxx"，同样，两个单词直接也是用"-"连接，示例：

```html
<button nz-button [nzType]="'primary'" class="cus-search-btn" type="submit">
    搜索
</button>
```

## 项目目录

我的项目都是使用Angular CLI生成的，包括新建组件也是通过CLI，所以我想大家都这样操作吧。

目前修改后的项目目录是这样的

|-app

|---|-app-module

|---|-app-routing.module

|---|-app.component

|---|-...（html/css）

|---|-core-module（核心模块，内部存放一些全局的对象或者只被根模块组件使用一次的组件,在这个项目里主要是放全局的service）

|---|-shared-module（共享模块，内部存放那些会被多个模块使用的组件）

|---|-order-module（自定义的模块）

|---------------|-order-module

|---------------|-order-routing.module

|---------------|-order.component

|---------------|-...(html/css)

|---------------|-components

|-----------------------|-e-footer(组件文件夹)

|-----------------------|-home(组件文件夹)

|-----------------------|-navigation(组件文件夹)
|---------------|-service

|-----------------------|-service1(服务1)


项目的目录基本就是目前的样子，也就是说，将整个项目的不同部分切分成不同的模块，每个模块放在一个自己的模块文件夹里，然后模块内的自定义组件都放在这个模块文件夹下的components文件夹下。至于那些全局service就放在core-module下的service文件夹下，全局服务是指那些在整个应用中都会用的服务，比如处理用户信息的服务，只需要在根模块引入core-module.forRoot()，子模块就不用在自己的providers数组里再写上这个全局service(但是还是要在用到它的component里引入一下这个service的类)。那些只在某个模块内使用的服务就放在模块目录下的service文件夹里。

之所以要分模块是因为路由的缘故，比如，我们登陆、注册页面的业务跟点餐页面的业务没啥关联，甚至页面结构都不一样，比如导航栏就不再登陆注册页面里出现，因此我把它划分开。用这种方式分开，甚至在这个项目里再写商家端、管理端的页面，都不会有问题，不过我们分了项目，应该不会这样写。

在项目根目录下使用命令：ng g component components/xxx 就可以生成一个新组件，components/xxx的components对应的就是我们的components文件夹，XXX是组件名

在项目根目录下使用命令：ng g module xxx 就可以生成一个新模块

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
