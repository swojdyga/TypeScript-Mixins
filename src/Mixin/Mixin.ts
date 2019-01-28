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

        /**
         * 
         * constructor.prototype
         * 
         * constructor.prototype.prototype
         * 
         */


        // const a = constructor.prototype.constructor.prototype;
        // constructor.prototype.constructor.prototype.constructor.prototype = a;
        // constructor.prototype.constructor.prototype = {};
// console.log(constructor.prototype);



            
        // mixin powinien wejść przed główną klasę
        let extendedConstructor;
        // if(constructor === constructor.prototype.constructor) {
            extendedConstructor = class {
                constructor(...args: any[]) {
                    (mixin as any).owner = this;
                }
            };
        // } else {
        //     extendedConstructor = class extends constructor.prototype.constructor {
        //         constructor(...args: any[]) {
        //             super(args);

        //             (mixin as any).owner = this;
        //         }
        //     };
        // }

        // Object.defineProperties(extendedConstructor.prototype.constructor.prototype, constructor.prototype);
        // extendedConstructor.prototype = constructor.prototype;

        for(const methodToRewrite of this.rewritesCollection.getByKey(mixinConstructor.prototype)) {
            extendedConstructor.prototype[methodToRewrite] = mixin[methodToRewrite].bind(mixin);
        }

        const a = class extends extendedConstructor {

        };

        Object.defineProperties(a.prototype, constructor.prototype);

        return a as T & Class<Requirements>;
    }

    public rewrite<Rewrites, T extends MixinI<Rewrites>>(target: T, property: keyof Rewrites & string): void {
        return this.rewritesCollection.add(target, [property]);
    }
}
