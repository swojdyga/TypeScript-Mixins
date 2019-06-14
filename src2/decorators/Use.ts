import Mixin from "../resolvers/Mixin";
import Class from "../interfaces/Class";
import MixinI from "../interfaces/Mixin";
import Rewrites from "../resolvers/Rewrites";

const mixinResolver = new Mixin(new Rewrites());

export default function Use<Owner>(mixin: Class<MixinI<Owner>>) {
    return <T extends Class<Owner>>(constructor: T) => mixinResolver.appendMixin(constructor, mixin);
}
