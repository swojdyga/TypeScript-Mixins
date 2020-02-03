import { MixinsResolver } from "./helpers";
import { Mixin } from "./interfaces";
import { RewriteDecoratorFactory, UseDecoratorFactory } from "./decorators";

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

export * from "./decorators";
export * from "./interfaces";
export * from "./helpers";
