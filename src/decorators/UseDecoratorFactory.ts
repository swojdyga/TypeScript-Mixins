import Class from "../Class/interfaces/Class";
import MixinsResolver from "../MixinsResolver";
import { Mixin } from "../interfaces";

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
