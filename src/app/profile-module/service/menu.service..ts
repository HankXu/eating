import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MenuService {

    private changeMenuSource = new Subject<number>();

    changeMenu$ = this.changeMenuSource.asObservable();

    currentMenu(menuindex: number) {
        this.changeMenuSource.next(menuindex);
    }

};