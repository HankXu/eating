import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

    setMenuIndex: any;

    constructor(
    ) { }

    setMenuIndexMethod(setMenuIndex: any) {
        this.setMenuIndex = setMenuIndex;
    }

    sethMenuIndex(menuIndex?: number) {
        if (this.setMenuIndex != null) {
            this.setMenuIndex(menuIndex);
        }
    }

}
