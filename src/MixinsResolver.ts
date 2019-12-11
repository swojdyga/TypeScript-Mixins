import Class from "./Class/interfaces/Class";
import { Mixin } from "./interfaces";

export default class MixinsResolver {
    public constructor(public rewritesCollection: WeakMap<Mixin<any, any>, string[]>) {

    }

    public use<
        Rewrites extends {},
        Requirements,
        T extends Rewrites & Requirements,
    >(
        constructor: Class<T>,
        mixinClass: Class<Mixin<Rewrites, Requirements>>,
    ) {
        const mixinCollection = new WeakMap<T, Mixin<Rewrites, Requirements>>();

        const mixinRewrites = class extends Object.getPrototypeOf(constructor) {
            constructor(...args: any[]) {
                super(...args);

                const mixin = new mixinClass();
                mixin.owner = this as unknown as T;

                mixinCollection.set(this as unknown as T, mixin);
            }
        };

        for(const thingNameToRewrite of this.getRewritesByMixinClass(mixinClass)) {
            Object.defineProperty(mixinRewrites.prototype, thingNameToRewrite, {
                get: function() {
                    const mixin = mixinCollection.get(this);
                    if(!mixin) {
                        throw new Error("Failed to get mixin instance.");
                    }

                    if(typeof mixin[thingNameToRewrite] === "function") {
                        return (...args: unknown[]) => {
                            return mixin[thingNameToRewrite](...args);
                        };
                    } else {
                        return mixin[thingNameToRewrite];
                    }
                },
                set: function(value: unknown) {
                    const mixin = mixinCollection.get(this);
                    if(!mixin) {
                        throw new Error("Failed to get mixin instance.");
                    }

                    mixin[thingNameToRewrite] = value;
                },
            });
        }

        Object.setPrototypeOf(constructor, mixinRewrites);
        Object.setPrototypeOf(constructor.prototype, mixinRewrites.prototype);
    }

    public rewrite<
        Rewrites extends {},
        T extends Mixin<Rewrites>,
    >(
        target: T,
        property: keyof Rewrites & string,
    ): void {
        const rewritesCollection = this.getOrSet(target);
        rewritesCollection.push(property);
    }

    protected getRewritesByMixinClass<
        Rewrites extends {},
        Requirements,
    >(
        mixinClass: Class<Mixin<Rewrites, Requirements>>,
    ): string[] {
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

    protected getOrSet<Rewrites extends {}, T extends Mixin<Rewrites>>(target: T): string[] {
        const issetRewritesCollection = this.rewritesCollection.get(target);
        if(issetRewritesCollection === undefined) {
            const rewritesCollection = [];
            this.rewritesCollection.set(target, rewritesCollection);
            return rewritesCollection;
        }

        return issetRewritesCollection;
    }
}
