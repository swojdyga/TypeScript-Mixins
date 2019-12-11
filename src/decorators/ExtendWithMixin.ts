import BaseExtend from "./Extend";
import ClassOrAbstractClass from "../Class/interfaces/ClassOrAbstractClass";
import { Mixin } from "../interfaces";

type MixinRewrites<T extends Mixin<{}>> = T extends Mixin<infer U> ? U : never;

export default function ExtendWithMixin<T extends Mixin<{}>, U = {}>(superClass?: ClassOrAbstractClass<U>) {
    return BaseExtend<MixinRewrites<T>, U>(superClass);
}
