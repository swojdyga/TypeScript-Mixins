export default class Collection {
    private static readonly collection: any[] = [];
    private static readonly collectionKeys: any[] = [];

    public set(key: any, value: any): void {
        const collectionKey = this.getCollectionKey(key);
        this.collection[collectionKey] = value;
    }

    public get(key: any): any | false {
        const collectionKey = this.getCollectionKey(key);
        const value = this.collection[collectionKey];

        if(typeof value === "undefined") {
            return false;
        }

        return value;
    }

    private getCollectionKey(key: any): number {
        for(const collectionKey in this.collectionKeys) {
            if(this.isSameKey(this.collectionKeys[collectionKey], key)) {//
                // I do not why collectionKey is typeof "string",
                // when declaration of collectionKeys is just array...
                return collectionKey as unknown as number;
            }
        }

        this.collectionKeys.push(key);
        return this.collectionKeys.length - 1;
    }

    private get collectionKeys() {
        return Collection.collectionKeys;
    }

    private isSameKey(keyA: any, keyB: any): boolean {
        if(Array.isArray(keyA) && Array.isArray(keyB)) {
            for(const key in keyA) {
                if(!this.isSameKey(keyA[key], keyB[key])) {
                    return false;
                }
            }

            return true;
        }

        return keyA === keyB;
    }

    private get collection() {
        return Collection.collection;
    }
}
