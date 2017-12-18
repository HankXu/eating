import { Shop } from "./Shop";
import { InnerCartGoods } from "./InnerCartGoods";

export class PlaceOrderInfo{
    shopinfo: Shop;
    innerCartGoodsList: InnerCartGoods[];
    totalcount: number;
}