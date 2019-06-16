import Collection from "./interfaces/Collection";
import Class from "../Class/interfaces/Class";
import MixinI from "./interfaces/Mixin";

export default class Use {
    public constructor(public rewritesCollection: Collection) {

    }

    public use<Rewrites, Requirements, T extends Class<Requirements>>(constructor: T, mixinClass: Class<MixinI<Rewrites, Requirements>>) {
        const mixin = new mixinClass();

        const mixinRewrites = class extends Object.getPrototypeOf(constructor) {
            constructor(...args: any[]) {
                super(...args);
                mixin.owner = this as unknown as Rewrites & Requirements;
            }
        };

        for(const thingNameToRewrite of this.rewritesCollection.getByKey(mixinClass.prototype)) {
            Object.defineProperty(mixinRewrites.prototype, thingNameToRewrite, {
                get: () => {
                    if(typeof mixin[thingNameToRewrite] === "function") {
                        return (...args: Array<unknown>) => {
                            return mixin[thingNameToRewrite](args);
                        };
                    } else {
                        return mixin[thingNameToRewrite];
                    }
                },
                set: (value: unknown) => {
                    mixin[thingNameToRewrite] = value;
                },
            });
        }

        Object.setPrototypeOf(constructor, mixinRewrites);
        Object.setPrototypeOf(constructor.prototype, mixinRewrites.prototype);
    }

    public rewrite<Rewrites, T extends MixinI<Rewrites>>(target: T, property: keyof Rewrites & string): void {
        return this.rewritesCollection.add(target, [property]);
    }
}
