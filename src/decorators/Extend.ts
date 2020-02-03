import { Class } from "typescript-class-types";

export default function Extend<T, U = {}>(superClass?: Class<U>): Class<T & U> {
    if(typeof superClass === "undefined") {
        return class {} as Class<T & U>;
    }

    return superClass as Class<T & U>;
}
