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
            public owner!: {} & MixinRewrites;

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

    it(`Should have access mixin to main class methods.`, () => {
        interface MixinOwnerRequirements {
            ownerMethod(): string;
        }

        interface MixinOwnerRewrites {
            mixinMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites, MixinOwnerRequirements>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: MixinOwnerRequirements & MixinOwnerRewrites;

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
    
    it(`Should be able to overwrite method in main class, which was added by mixin.`, () => {
        interface MixinOwnerRewrites {
            someMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;

            @Rewrite()
            public someMethod(): string {
                return `Hello`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {
            public someMethod(): string {
                return `${super.someMethod()} World!`;
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
            public owner!: {} & MixinOwnerRewrites;

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

    it(`Should have access mixin to method from child class, when than method was overwritten and mixin was use in super class.`, () => {
        interface MixinOwnerRewrites {
            mainMethod(): string;
        }

        interface MixinOwnerRequirements {
            requireMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites, MixinOwnerRequirements>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: MixinOwnerRequirements & MixinOwnerRewrites;

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

    it(`Should have access mixin to method from main class, which was rewrite from another mixin.`, () => {
        interface MainMixinRewrites {
            mainMethod(): string;
        }

        class MainMixin implements Mixin<MainMixinRewrites>, MainMixinRewrites {
            public rewrites!: MainMixinRewrites;
            public owner!: {} & MainMixinRewrites;

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
            public owner!: SecondMixinRequirements & SecondMixinRewrites;

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

    it(`Should return true, when checking main class is instance of super class.`, () => {
        interface MixinOwnerRewrites {
            someMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;
            
            @Rewrite()
            public someMethod(): string {
                return `Hello World`;
            }
        }

        class SuperClass {

        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>(SuperClass) {

        }

        const result = new MainClass() instanceof SuperClass;
        expect(result).to.be.true;
    });

    it(`Should return false, when checking main class is instance of main mixin class.`, () => {
        interface MixinOwnerRewrites {
            someMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;
            
            @Rewrite()
            public someMethod(): string {
                return `Hello World!`;
            }
        }

        class SuperClass {

        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>(SuperClass) {

        }

        const result = new MainClass() instanceof MainMixin;
        expect(result).to.be.false;
    });

    //recursive call mixin method + czy this.owner.method === this.method?

    it(``, () => {
        interface MixinOwnerRewrites {
            someProperty: string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;
            
            @Rewrite()
            public someProperty = `Hello World!`;
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const result = new MainClass().someProperty;
        expect(result).to.be.equals(`Hello World!`);
    });

    it(``, () => {
        interface MixinOwnerRewrites {
            someProperty: string;
            changeSomeProperty(): void;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;
            
            @Rewrite()
            public someProperty = `Bye bye World :(`;

            @Rewrite()
            public changeSomeProperty(): void {
                this.someProperty = `Hello World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const mainClass = new MainClass();
        mainClass.changeSomeProperty();
        const result = mainClass.someProperty;
        expect(result).to.be.equals(`Hello World!`);
    });

    it(``, () => {
        interface MixinOwnerRewrites {
            someProperty: string;
            changeSomeProperty(): void;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;
            
            @Rewrite()
            public someProperty = `Bye bye World :(`;

            @Rewrite()
            public changeSomeProperty(): void {
                this.owner.someProperty = `Hello World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const mainClass = new MainClass();
        mainClass.changeSomeProperty();
        const result = mainClass.someProperty;
        expect(result).to.be.equals(`Hello World!`);
    });

    //properties
    //properties as setters/getters
    //dynamic rewrites
});
