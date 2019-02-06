import Collection from "./interfaces/Collection";
import Class from "../Class/interfaces/Class";
import MixinI from "./interfaces/Mixin";

export default class Use {
    public constructor(public rewritesCollection: Collection) {

    }

    public use<Requirements, T extends Class<Requirements>>(constructor: T, mixinClass: Class<MixinI<Requirements>>) {
        const mixin = new mixinClass();

        const mixinRewrites = class extends Object.getPrototypeOf(constructor) {
            constructor(...args: any[]) {
                super(...args);
                mixin.owner = this as unknown as Requirements;
            }
        };

        for(const methodToRewrite of this.rewritesCollection.getByKey(mixinClass.prototype)) {
            mixinRewrites.prototype[methodToRewrite] = mixin[methodToRewrite].bind(mixin);
        }

        Object.setPrototypeOf(constructor, mixinRewrites);
        Object.setPrototypeOf(constructor.prototype, mixinRewrites.prototype);
    }

    public rewrite<Rewrites, T extends MixinI<Rewrites>>(target: T, property: keyof Rewrites & string): void {
        return this.rewritesCollection.add(target, [property]);
    }
}
