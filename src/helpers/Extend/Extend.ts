import { Class, AbstractClass } from "typescript-class-types";

export default function Extend<T, U = {}>(superClass?: Class<U> | AbstractClass<U>): Class<T & U> {
    if(typeof superClass === "undefined") {
        return class {} as Class<T & U>;
    }

    return superClass as Class<T & U>;
}
