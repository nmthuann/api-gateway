export class OrderDto{
    public id: number;
    public customerID: string;
    public jobPostID: number;
    public FreelancerID: string;
    public createTime: Date;
    public deliveryTime: number;
    public totalPrice: number;
    public status: string;
    public packageDetailID: number;
    // public timeStart: Date;
    // public timeEnd: Date;
}