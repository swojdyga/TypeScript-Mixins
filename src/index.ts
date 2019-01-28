import Rewrite from "./Mixin/decorators/Rewrite";
import Use from "./Mixin/decorators/Use";
import Mixin from "./Mixin/interfaces/Mixin";
import Extend from "./ExtendWithMixin/Extend";
// ts-node -O '{""module"": ""commonjs""}' src/index.ts
export {
    Extend,
    Mixin,
    Rewrite,
    Use,
};


// interface Mixin6Rewrites {
//     rewriteMethod1(): void;
// }

// interface Mixin6Requirements {
//     requireMethod1(): void;
// }

// class Mixin6 implements Mixin<Mixin6Rewrites, Mixin6Requirements> implements Mixin6Rewrites {
//     public rewrites: Mixin6Rewrites;
//     public owner: Mixin6Requirements;


// }
// //tslint:disable
// @Use(Mixin6)
// class Class6 extends Extend<Mixin6>() {
//     public requireMethod1(): void {

//     }
// }

// const class6 = new Class6;

// class6.

// interface BaseMixinRewrites<Rewrites> {
//     readonly rewrites: Rewrites;
// }

// class BaseMixin<Rewrites> implements Mixin, BaseMixinRewrites<Rewrites> {
//     public owner: {};

//     @Rewrite()
//     public readonly rewrites!: Rewrites & {rewrites: Rewrites};
// }

// interface Mixin1Rewrites {
//     method2(): void;
// }

// interface Mixin1Requirements {
//     method1();
// }

// // tslint:disable
// @Use(BaseMixin)
// class Mixin1 extends Extend<BaseMixin<Mixin1Rewrites>>() implements Mixin<Mixin1Requirements> {
//     public owner!: Mixin1Requirements;

//     // public setRewrites(rewrites: Mixin1Rewrites): never {
//     //     throw Error();
//     // }

//     @Rewrite()
//     public method2(): void {
//         return;
//     }
// }
// //tslint:disable
// @Use(Mixin1)
// class Class1 extends Extend<Mixin1>() {
//     // public test(): void {
//     //     this.
//     // }
//     public method1(): void {
//         return;
//     }
// }

// //class Mixin1 extends Extend<MixinRequirements<Mixin1Requirements> & MixinRewrites<Mixin1Rewrites>>() {
// //
// //}

// /*

// class Mixin1 extends BaseClass impelements Mixin<Requirements, Rewrites> {
//     public target!: Requirements;
//     public rewrites!: Rewrites;
// }

// */


// const class1 = new Class1();
// //tutaj się nie pokazują przepisane rzeczy :/
// class1.