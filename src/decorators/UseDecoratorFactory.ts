import MixinsResolver from "../helpers/MixinsResolver";
import { Mixin } from "../interfaces";
import { Class } from "typescript-class-types";

export default function UseDecoratorFactory(factory: MixinsResolver) {
    return function Use<
        Rewrites extends {},
        Requirements,
    >(
        mixinClass: Class<Mixin<Rewrites, Requirements>>,
    ) {
        return <
            T extends Rewrites & Requirements,
        >(
            constructor: Class<T>,
        ): void => factory.use(constructor, mixinClass);
    };
}
