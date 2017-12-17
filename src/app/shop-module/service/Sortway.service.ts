import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class SortwayService{

    //定义一个排序方式数据源
    private sortedWay = new Subject<string>();

    //转化为被观察对象
    sortedWay$ = this.sortedWay.asObservable();

    //触发数据发射
    announceCurrentSortway(srotWay: string) {
        this.sortedWay.next(srotWay);
    }

}