import Mixin from "./interfaces/Mixin";
import Rewrite from "./decorators/Rewrite";
import Use from "./decorators/Use";
import Extender from './methods/Extender';
import Class from './interfaces/Class';
import ClassOrAbstractClass from './interfaces/ClassOrAbstractClass';
import Extend from './methods/Extend';

export {
    Rewrite,
    Use,
    Mixin,
    Extend,
};
// ts-node -O '{""module"": ""commonjs""}' src/index.ts

// abstract class Class1 {
//     abstract public test1(): void;
// }

// interface Mixin1Owner {
//     test3(): void;
// }

// class Mixin1 implements Mixin<Mixin1Owner> {
//     owner: Mixin1Owner;
//     // test3: () => void;
// }

// interface Mixin2Owner {
//     test2(): void;
// }

// class Mixin2 implements Mixin<Mixin2Owner> {
//     owner: Mixin2Owner;
// }

// class class6 extends (Class1 as Class<Class1 & Mixin1 & Mixin2>) {

// }

// //tslint:disable
// class class5 extends Extend<Mixin1 & Mixin2, Class1>(Class1) {

// }

// class class7 extends Extend<Mixin1 & Mixin2>() {

// }

// const c5 = new class7();
// c5.

// //class Class4 extends Extend(BaseClass, Mixin(Mixin1).Mixin(Mixin2).final())
// //class Class4 extends Extend<Owner<Mixin1> & Owner<Mixin2>>(BaseClass)

// // cls.test1


// /**
//  * Przypadki:
//  * 1. Rozszerzenie po innej klasie - Extender(Class1)
//  * 2. Rozszerzenie po innej klasie wraz z dodaniem mixinów - Extender(Class1).Mixin(Mixin1).Mixin(Mixin2)
//  * 3. Dodanie mixinów bez rozszerzania innych klas - Extender().Mixin(Mixin1).Mixin(Mixin2)
//  * 
//  * @Use(Mixin1)
//  * @Use(Mixin2)
//  * class MainClass extends BaseClass {
//  * 
//  * }
//  */

// interface A {
//     test1(): void;
// }

// interface B {
//     test2(): void;
// }

// type test<T extends Array> = T extends (infer R)[] ? R : never;
// type test2<T extends Array> = T[keyof T] & T[keyof T];
// type test3<T extends unknown[]> = {
//     [testtt in keyof T]: T[testtt];
// };

// let a: test3<[A, B]> = {
//      test1: () => {},
//     //  test3: () => {},
//  };