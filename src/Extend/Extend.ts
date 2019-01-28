import ClassOrAbstractClass from "../Class/interfaces/ClassOrAbstractClass";
import Class from "../Class/interfaces/Class";

export default function Extend<T, U = {}>(superClass?: ClassOrAbstractClass<U>): Class<T & U> {
    if(typeof superClass === "undefined") {
        return class {} as Class<T & U>;
    }

    return superClass as Class<T & U>;
}
