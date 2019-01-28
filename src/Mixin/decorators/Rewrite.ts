import Mixin from "../Mixin";
import Collection from "../../Collection/Collection";
import MixinI from "../interfaces/Mixin";

const mixinResolver = new Mixin(new Collection());

export default function Rewrite() {
    return <Rewrites, T extends MixinI<Rewrites>>(target: T, property: keyof Rewrites & string) =>
        mixinResolver.rewrite(target, property);
}
