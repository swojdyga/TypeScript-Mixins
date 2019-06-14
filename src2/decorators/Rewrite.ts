import Rewrites from "../resolvers/Rewrites";

const rewritesResolver = new Rewrites();

export default function Rewrite() {
    return <T extends {}>(target: T, property: keyof T & string) =>
        rewritesResolver.add(target, property);
}
