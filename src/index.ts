import { MixinsResolver } from "./helpers/index";
import { Mixin } from "./interfaces/index";
import { RewriteDecoratorFactory, UseDecoratorFactory } from "./decorators/index";

const mixinsResolverInstance = new MixinsResolver(
    new WeakMap<
        Mixin<any, any>,
        string[]
    >(),
);

const Rewrite = RewriteDecoratorFactory(mixinsResolverInstance);
const Use = UseDecoratorFactory(mixinsResolverInstance);

export {
    mixinsResolverInstance,
    Rewrite,
    Use,
};

export * from "./decorators/index";
export * from "./interfaces/index";
export * from "./helpers/index";
