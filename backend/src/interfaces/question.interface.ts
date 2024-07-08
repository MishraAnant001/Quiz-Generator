export interface IQuestion{
    _id?:string,
    text:string,
    options:Array<string>
    answer:string,
    difficulty:number
}