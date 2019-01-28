export default class Collection {
    private static readonly collection: any[][] = [];
    private static readonly collectionKeys: any[][] = [];

    public add(key: any, value: any[]): void {
        const collectionKey = this.getCollectionKeyByKey(key);
        this.createCollectionIfShould(collectionKey);
        this.collection[collectionKey].push(...value);
    }

    public getByKey(key: any): any[] {
        const collectionKey = this.getCollectionKeyByKey(key);
        const value = this.collection[collectionKey];

        if(typeof value === "undefined") {
            return [];
        }

        return value;
    }

    private getCollectionKeyByKey(key: any): number {
        for(const collectionKey in this.collectionKeys) {
            if(this.collectionKeys[collectionKey] === key) {
                // I do not why collectionKey is typeof "string",
                // when declaration of collectionKeys is just two-dimensional array...
                return collectionKey as unknown as number;
            }
        }

        this.collectionKeys.push(key);
        return this.collectionKeys.length - 1;
    }

    private get collectionKeys() {
        return Collection.collectionKeys;
    }

    private createCollectionIfShould(collectionKey: number): void {
        if(typeof this.collection[collectionKey] === "undefined") {
            this.collection[collectionKey] = [];
        }
    }

    private get collection() {
        return Collection.collection;
    }
}
