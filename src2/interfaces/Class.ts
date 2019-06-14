export default interface Class<T extends {} = {}> extends Function {
    new(...args: any[]): T;
}
