import BaseExtend from "./Extend";
import { Mixin } from "../interfaces";
import { Class } from "typescript-class-types";

type MixinRewrites<T extends Mixin<{}>> = T extends Mixin<infer U> ? U : never;

export default function ExtendWithMixin<T extends Mixin<{}>, U = {}>(superClass?: Class<U>) {
    return BaseExtend<MixinRewrites<T>, U>(superClass);
}
