type AbstractClass<T extends {} = {}> = Function & {prototype: T};

export default AbstractClass;
