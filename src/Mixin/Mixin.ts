import CollectionI from "./interfaces/Collection";
import Class from "../Class/interfaces/Class";
import MixinI from "./interfaces/Mixin";
import Collection from "../Collection/Collection";

export default class Mixin {
    public constructor(public rewritesCollection: CollectionI) {

    }

    public use<Rewrites, Requirements, T extends Class<Requirements>>(constructor: T, mixinClass: Class<MixinI<Rewrites, Requirements>>) {
        const rewritesCollection = this.rewritesCollection;
        const mixinCollection = new Collection();

        const mixinRewrites = class extends Object.getPrototypeOf(constructor) {
            constructor(...args: any[]) {
                super(...args);

                mixinCollection.set([this, mixinClass], new mixinClass());
                mixinCollection.get([this, mixinClass]).owner = this as unknown as Rewrites & Requirements;
            }
        };

        for(const thingNameToRewrite of this.getRewritesByMixinClass(mixinClass)) {
            Object.defineProperty(mixinRewrites.prototype, thingNameToRewrite, {
                get: function() {
                    if(typeof mixinCollection.get([this, mixinClass])[thingNameToRewrite] === "function") {
                        return (...args: Array<unknown>) => {
                            return mixinCollection.get([this, mixinClass])[thingNameToRewrite](...args);
                        };
                    } else {
                        return mixinCollection.get([this, mixinClass])[thingNameToRewrite];
                    }
                },
                set: function(value: unknown) {
                    mixinCollection.get([this, mixinClass])[thingNameToRewrite] = value;
                },
            });
        }
        
        Object.setPrototypeOf(constructor, mixinRewrites);
        Object.setPrototypeOf(constructor.prototype, mixinRewrites.prototype);
    }

    public rewrite<Rewrites, T extends MixinI<Rewrites>>(target: T, property: keyof Rewrites & string): void {
        if(this.rewritesCollection.get(target) === false) {
            this.rewritesCollection.set(target, []);
        }

        this.rewritesCollection.get(target).push(property);
    }

    protected getRewritesByMixinClass<Rewrites, Requirements>(mixinClass: Class<MixinI<Rewrites, Requirements>>): string[] {
        const rewrites: string[] = [];

        let mixin = mixinClass;
        do {
            const mixinRewrites = this.rewritesCollection.get(mixin.prototype);
            if(Array.isArray(mixinRewrites)) {
                rewrites.push(...mixinRewrites);
            }

            mixin = Object.getPrototypeOf(mixin);
        } while(mixin);

        return rewrites;
    }
}
