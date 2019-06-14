import Mixin from "../interfaces/Mixin";
import ClassOrAbstractClass from "../interfaces/ClassOrAbstractClass";
import Class from "../interfaces/Class";
import Owner from "../interfaces/Owner";

export default function Extend<T extends Mixin<unknown>, U = unknown>(superClass?: ClassOrAbstractClass<U>): Class<Owner<T> & (U extends unknown ? {} : U)> {
    if(typeof superClass === "undefined") {
        return class {} as Class<Owner<T> & (U extends unknown ? {} : U)>;
    }

    return superClass as Class<Owner<T> & (U extends unknown ? {} : U)>;
}

export default function Extend2<T, U = unknown>(superClass?: ClassOrAbstractClass<U>): Class<T & (U extends unknown ? {} : U) {
    
}