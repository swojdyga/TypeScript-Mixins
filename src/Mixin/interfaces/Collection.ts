export default interface Collection {
    add(key: any, value: any[]): void;
    getByKey(key: any): any[];
}
