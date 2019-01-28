import BaseExtend from "../Extend/Extend";
import ClassOrAbstractClass from "../Class/interfaces/ClassOrAbstractClass";
import Mixin from "../Mixin/interfaces/Mixin";

type MixinRewrites<T extends Mixin<unknown>> = T extends Mixin<infer U> ? U : never;

// tslint:disable
export default function Extend<T extends Mixin<unknown>, U = {}>(superClass?: ClassOrAbstractClass<U>) {
    return BaseExtend<MixinRewrites<T>, U>(superClass);
}
