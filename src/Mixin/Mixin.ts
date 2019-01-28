import Collection from "./interfaces/Collection";
import Class from "../Class/interfaces/Class";
import MixinI from "./interfaces/Mixin";

export default class Use {
    public constructor(public rewritesCollection: Collection) {

    }

    public use<Requirements, T extends Class>(
                constructor: T,
                mixinConstructor: Class<MixinI<unknown, Requirements>>):
            T & Class<Requirements> {
        const mixin = new mixinConstructor();
        mixin.super = constructor.prototype;

        // mixin powinien wejść przed główną klasę
        const extendedConstructor = class extends constructor {
            constructor(...args: any[]) {
                super(args);

                mixin.owner = this.constructor.prototype;
            }
        };

        for(const methodToRewrite of this.rewritesCollection.getByKey(mixinConstructor.prototype)) {
            extendedConstructor.prototype[methodToRewrite] = mixin[methodToRewrite].bind(mixin);
        }

        return extendedConstructor as T & Class<Requirements>;
    }

    public rewrite<Rewrites, T extends MixinI<Rewrites>>(target: T, property: keyof Rewrites & string): void {
        return this.rewritesCollection.add(target, [property]);
    }
}
