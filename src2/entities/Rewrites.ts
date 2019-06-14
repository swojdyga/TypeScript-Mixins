export default class RewritesCollection {
    private static readonly rewrites: {[key: string]: Array<{}>} = {};

    public add(target: {}, property: string): void {
        this.createPropertyTargetsCollectionIfShould(property);
        this.rewritesCollection[property].push(target);
    }

    public getByTarget<T extends {}>(target: T): Array<keyof T & string> {
        const targetProperties: Array<keyof T & string> = [];

        for(const property in this.rewritesCollection) {
            if(!!~this.rewritesCollection[property].indexOf(target)
                && this.isPropertyInTarget(property, target)) {
                targetProperties.push(property);
            }
        }

        return targetProperties;
    }

    private isPropertyInTarget<T extends {}>(property: string | number | symbol, target: T): property is keyof T {
        return typeof target[property] !== "undefined";
    }

    private createPropertyTargetsCollectionIfShould(property: string): void {
        if(!this.rewritesCollection.hasOwnProperty(property)) {
            this.rewritesCollection[property] = [];
        }
    }

    private get rewritesCollection(): {[key: string]: Array<{}>} {
        return RewritesCollection.rewrites;
    }
}
