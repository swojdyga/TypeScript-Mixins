import "mocha";
import { expect } from "chai";
import { Rewrite, Use, Mixin, Extend } from "./index";

describe(`TypeScript Mixins`, () => {
    it(`Should rewrite method from mixin to main class.`, () => {
        interface MixinOwner {
            mainMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwner> {
            public owner!: MixinOwner;

            @Rewrite()
            public mainMethod(): string {
                return `Hello World!`;
            }
        }

        @Use(MainMixin)
        class MainClass implements MixinOwner {
            public mainMethod!: () => string;
        }

        const result = new MainClass().mainMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should have mixin access to main class methods.`, () => {
        interface MixinOwnerRequirements {
            ownerMethod(): string;
        }

        interface MixinOwner {
            mixinMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwner> {
            public owner!: MixinOwner & MixinOwnerRequirements;

            @Rewrite()
            public mixinMethod(): string {
                return `Hello ${this.owner.ownerMethod()}`;
            }
        }

        @Use(MainMixin)
        class MainClass implements MixinOwner, MixinOwnerRequirements {
            mixinMethod: () => string;

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

        interface MixinOwner {
            someMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwner> {
            owner!: MixinOwner & MixinOwnerRequirements;

            @Rewrite()
            public someMethod(): string {
                return `${this.owner.someMethod()} World!`;
            }
        }

        @Use(MainMixin)
        class MainClass implements MixinOwner, MixinOwnerRequirements {
            public someMethod(): string {
                return `Hello`;
            }
        }

        const result = new MainClass().someMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should be able to extends method in child class, which was rewrite from mixin in main class.`, () => {
        interface MixinOwner {
            mainMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwner> {
            public owner!: MixinOwner;

            @Rewrite()
            public mainMethod(): string {
                return `Hello`;
            }
        }

        @Use(MainMixin)
        class ParentClass extends Extend<MainMixin>() {
            // public mainMethod(): string;
            // public mainMethod!: () => string;
        }

        class MainClass extends ParentClass {
            public mainMethod(): string {
                return `${super.mainMethod()} World!`;
            }
        }

        const result = new MainClass().mainMethod();
        expect(result).to.be.equals(`Hello World!`);
    });

    //dostanie metody dziecka klasy głównej klasy
    //https://stackoverflow.com/questions/43912168/typescript-decorators-with-inheritance

    //properties
    //properties as setters/getters
    //dynamic rewrites
});
