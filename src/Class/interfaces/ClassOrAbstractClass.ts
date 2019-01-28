import Class from "./Class";
import AbstractClass from "./AbstractClass";

type ClassOrAbstractClass<T extends {} = {}> = Class<T> | AbstractClass<T>;
export default ClassOrAbstractClass;
