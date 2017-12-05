import { Injectable } from '@angular/core';
import { Headers,Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ShopListService{
    private baseUrl = 'https://easy-mock.com/mock/59edac831243b440c293a4cc/fortnight_ajax';

    //获取商店列表的接口URL
    private getShopListUrl = this.baseUrl + '/getShopes';

    //在此声明需要使用的内置对象，框架会自动注入
    constructor(
        private http: Http
    ){}


    //编写获取数据的方法
    getShopList(): Promise<object[]> {
        
        return this.http
                .get(this.getShopListUrl)  //调用http内置的各个类型的获取方法，get/post/put/delete等
                .toPromise()  //http方法返回的是observable对象，所以将其转换为Promise对象，也可以不转换直接用Observable对象，看你自己需求，因为两个都要现学
                .then( response => response.json().shopes as object[])  //Promise技术的then方法，当请求成功时会进入这一个方法，调用你传入的处理方法，这里用了箭头表达式，不用这个也可以直接用普通的函数模式，
                                                                        //response就是返回的信息，将它转换为JSON对象，然后取出对应的数据，这里我返回的格式是这样的：{shopes:{...}}
                                                                        //后面的那个as没啥特别的意义，就是表示这个返回的值是个对象数组，让编辑器能知道
                .catch(this.handleError)    //当请求出现错误的时候，会被catch捕获，它会调用你传入的错误处理方法。这里的错误处理会返回了Promise.reject，告诉调用service的方法请求失败了。
    }

    private handleError(error: any): Promise<any>{
        console.error('发生了错误', error);
        return Promise.reject(error.message || error);
    }

}