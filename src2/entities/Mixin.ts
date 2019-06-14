import Class from "../interfaces/Class";
import MixinI from "../interfaces/Mixin";
import Rewrites from "./Rewrites";

export default class Mixin {
    public constructor(public rewrites: Rewrites) {

    }

    public appendMixin<Owner extends {}, T extends Class>(constructor: T, mixinConstructor: Class<MixinI<Owner>>): T {
        const mixin = new mixinConstructor();
        mixin.owner = constructor.prototype;

        const extendedConstructor = class extends constructor {};
        for(const methodToRewrite of this.rewrites.getByTarget(mixinConstructor.prototype)) {
            extendedConstructor.prototype[methodToRewrite] = mixin[methodToRewrite].bind(mixin);
        }

        return extendedConstructor;
    }
}
