import Mixin from "../Mixin";
import Collection from "../../Collection/Collection";
import Class from "../../Class/interfaces/Class";
import MixinI from "../interfaces/Mixin";

const mixinResolver = new Mixin(new Collection());

export default function Use<Rewrites, Requirements>(mixin: Class<MixinI<Rewrites, Requirements>>) {
    return <T extends Class<Requirements>>(constructor: T) => mixinResolver.use(constructor, mixin);
}
