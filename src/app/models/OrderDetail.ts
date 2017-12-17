import { OrderItem } from "./OrderItem";

export class OrderDetail {
    orderid:String;
    shopname:String;
    ordernum:String;
    status:String;
    amounts:String;
    createtime:String;
    shopimg: String;

    orderitemVoList:OrderItem[];

    reachtime: String;
    custaddr: String;
    custname: String;
    custphone: String;
    payway: String;
    remark: String;
}


