import { MixinsResolver } from "../helpers/MixinsResolver";
import { Mixin } from "../interfaces";

export default function RewriteDecoratorFactory(factory: MixinsResolver) {
    return function Rewrite() {
        return <
            Rewrites extends {},
            T extends Mixin<Rewrites>,
        >(
            target: T,
            property: keyof Rewrites & string,
        ): void => factory.rewrite<Rewrites, T>(target, property);
    };
}
