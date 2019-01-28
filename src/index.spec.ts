import "mocha";
import { expect } from "chai";
import { Rewrite, Use, Mixin, Extend } from "./index";

describe(`TypeScript Mixins`, () => {
    it(`Should rewrite method from mixin to main class.`, () => {
        interface MixinRewrites {
            mainMethod(): string;
        }

        class MainMixin implements Mixin<MixinRewrites>, MixinRewrites {
            public rewrites!: MixinRewrites;
            public owner!: {};
            public super!: {};

            @Rewrite()
            public mainMethod(): string {
                return `Hello World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const result = new MainClass().mainMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should have mixin access to main class methods.`, () => {
        interface MixinOwnerRequirements {
            ownerMethod(): string;
        }

        interface MixinOwnerRewrites {
            mixinMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites, MixinOwnerRequirements>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: MixinOwnerRequirements;
            public super!: MixinOwnerRequirements;

            @Rewrite()
            public mixinMethod(): string {
                return `Hello ${this.owner.ownerMethod()}`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {
            public ownerMethod(): string {
                return `World!`;
            }
        }

        const result = new MainClass().mixinMethod();
        expect(result).to.be.equals(`Hello World!`);
    });
    
    it(`Should have mixin access to main class methods, which will be overwritten by that mixin.`, () => {
        interface MixinOwnerRequirements {
            someMethod(): string;
        }

        interface MixinOwnerRewrites {
            someMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites, MixinOwnerRequirements>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: MixinOwnerRequirements;
            public super!: MixinOwnerRequirements;

            @Rewrite()
            public someMethod(): string {
                return `${this.super.someMethod()} World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {
            public someMethod(): string {
                return `Hello`;
            }
        }

        const result = new MainClass().someMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should be able to extends method in child class, which was rewrite from mixin in main class.`, () => {
        interface MixinOwnerRewrites {
            mainMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {};
            public super!: {};

            @Rewrite()
            public mainMethod(): string {
                return `Hello`;
            }
        }

        @Use(MainMixin)
        class SuperClass extends Extend<MainMixin>() {

        }

        class MainClass extends Extend(SuperClass) {
            public mainMethod(): string {
                return `${super.mainMethod()} World!`;
            }
        }

        const result = new MainClass().mainMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should mixin get method from child class, when than method was overwritten and mixin was use in super class.`, () => {
        interface MixinOwnerRewrites {
            mainMethod(): string;
        }

        interface MixinOwnerRequirements {
            requireMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites, MixinOwnerRequirements>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: MixinOwnerRequirements;
            public super!: MixinOwnerRequirements;

            @Rewrite()
            public mainMethod(): string {
                return `${this.owner.requireMethod()} World!`;
            }
        }

        @Use(MainMixin)
        class SuperClass extends Extend<MainMixin>() {
            public requireMethod(): string {
                return `Hel`;
            }
        }

        class MainClass extends Extend(SuperClass) {
            public requireMethod(): string {
                return `${super.requireMethod()}lo`;
            }
        }

        const result = new MainClass().mainMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(``, () => {
        interface MainMixinRewrites {
            mainMethod(): string;
        }

        class MainMixin implements Mixin<MainMixinRewrites>, MainMixinRewrites {
            public rewrites!: MainMixinRewrites;
            public owner!: {};
            public super!: {};

            @Rewrite()
            public mainMethod(): string {
                return `Hello`;
            }
        }

        interface SecondMixinRewrites {
            secondMethod(): string;
        }

        interface SecondMixinRequirements extends MainMixinRewrites {

        }

        class SecondMixin implements Mixin<SecondMixinRewrites, SecondMixinRequirements>, SecondMixinRewrites {
            public rewrites!: SecondMixinRewrites;
            public owner!: SecondMixinRequirements;
            public super!: SecondMixinRequirements;

            @Rewrite()
            public secondMethod(): string {
                return `${this.owner.mainMethod()} World!`;
            }
        }

        @Use(MainMixin)
        @Use(SecondMixin)
        class MainClass extends Extend<MainMixin & SecondMixin>() {

        }

        const result = new MainClass().secondMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    //recursive call mixin method

    //properties
    //properties as setters/getters
    //dynamic rewrites
});
