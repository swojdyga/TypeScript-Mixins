import "mocha";
import { expect } from "chai";
import Rewrite from "./decorators/Rewrite";
import Use from "./decorators/Use";
import Mixin from "./interfaces/Mixin";
import Extend from "../ExtendWithMixin/Extend";

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
            requiredMethod(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites, MixinOwnerRequirements>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: MixinOwnerRequirements & MixinOwnerRewrites;

            @Rewrite()
            public mainMethod(): string {
                return `${this.owner.requiredMethod()} World!`;
            }
        }

        @Use(MainMixin)
        class SuperClass extends Extend<MainMixin>() {
            public requiredMethod(): string {
                return `Hel`;
            }
        }

        class MainClass extends Extend(SuperClass) {
            public requiredMethod(): string {
                return `${super.requiredMethod()}lo`;
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

    it(`Should rewrite property from mixin to main class.`, () => {
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

    it(`Should can change property value in main class, which was rewrite from mixin.`, () => {
        interface MainMixinRewrites {
            propertyFromMainMixin: string;
            changePropertyInMainMixin(): void;
        }

        class MainMixin implements Mixin<MainMixinRewrites>, MainMixinRewrites {
            public rewrites!: MainMixinRewrites;
            public owner!: {} & MainMixinRewrites;

            @Rewrite()
            public propertyFromMainMixin: string = `Bye bye World :(`;

            @Rewrite()
            public changePropertyInMainMixin(): void {
                this.propertyFromMainMixin = `Hello World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const mainClass = new MainClass();
        mainClass.changePropertyInMainMixin();

        const result = mainClass.propertyFromMainMixin;
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should change property value in main class, when change it value in mixin.`, () => {
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

    it(`Should change rewrites from mixin property value in mixin, when change it property value in main class.`, () => {
        interface MainMixinRewrites {
            propertyFromMainMixin: string;
            getPropertyFromMainMixin: () => string;
        }

        class MainMixin implements Mixin<MainMixinRewrites>, MainMixinRewrites {
            public rewrites!: MainMixinRewrites;
            public owner!: {} & MainMixinRewrites;

            @Rewrite()
            public propertyFromMainMixin: string = `Bye bye World :(`;

            @Rewrite()
            public getPropertyFromMainMixin(): string {
                return this.propertyFromMainMixin;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {
            public changePropertyInMainClass(): void {
                this.propertyFromMainMixin = `Hello World!`;
            }
        }

        const mainClass = new MainClass();
        mainClass.changePropertyInMainClass();

        const result = mainClass.getPropertyFromMainMixin();
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

    it(``, () => {
        interface MixinOwnerRewrites {
            setContent(content: string);
            getContent(): string;
        }

        class MainMixin implements Mixin<MixinOwnerRewrites>, MixinOwnerRewrites {
            public rewrites!: MixinOwnerRewrites;
            public owner!: {} & MixinOwnerRewrites;

            private content: string = "";

            @Rewrite()
            public setContent(content: string) {
                this.content = content;
            }

            @Rewrite()
            public getContent(): string {
                return this.content;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const firstMainClass = new MainClass();
        const secondMainClass = new MainClass();

        firstMainClass.setContent(`Hello World!`);
        secondMainClass.setContent(`Bye bye World :(`);

        const result = firstMainClass.getContent();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should main class have access to method from main mixin parent class.`, () => {
        interface BaseMixinRewrites {
            methodFromBaseMixin(): string;
        }

        class BaseMixin implements Mixin<BaseMixinRewrites>, BaseMixinRewrites {
            public rewrites!: BaseMixinRewrites;
            public owner!: {} & BaseMixinRewrites;

            @Rewrite()
            public methodFromBaseMixin(): string {
                return `Hello World!`;
            }
        }

        interface MainMixinRewrites extends BaseMixinRewrites {
            methodFromMainMixin(): string;
        }

        class MainMixin extends Extend(BaseMixin) implements Mixin<MainMixinRewrites>, MainMixinRewrites {
            public rewrites!: MainMixinRewrites;
            public owner!: & {} & MainMixinRewrites;

            @Rewrite()
            public methodFromMainMixin(): string {
                return `Hello World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const mainClass = new MainClass();
        const result = mainClass.methodFromBaseMixin();
        expect(result).to.be.equals(`Hello World!`);
    });

    it(`Should main mixin have access to other mixin, which it use.`, () => {
        interface BaseMixinRewrites {
            methodFromBaseMixin(): string;
        }

        class BaseMixin implements Mixin<BaseMixinRewrites>, BaseMixinRewrites {
            public rewrites!: BaseMixinRewrites;
            public owner!: {} & BaseMixinRewrites;

            @Rewrite()
            public methodFromBaseMixin(): string {
                return `Hello`;
            }
        }

        interface MainMixinRewrites {
            methodFromMainMixin(): string;
        }

        @Use(BaseMixin)
        class MainMixin extends Extend<BaseMixin>() implements Mixin<MainMixinRewrites>, MainMixinRewrites {
            public rewrites!: MainMixinRewrites;
            public owner!: {} & MainMixinRewrites;

            @Rewrite()
            public methodFromMainMixin(): string {
                return `${this.methodFromBaseMixin()} World!`;
            }
        }

        @Use(MainMixin)
        class MainClass extends Extend<MainMixin>() {

        }

        const mainClass = new MainClass();
        const result = mainClass.methodFromMainMixin();
        expect(result).to.be.equals(`Hello World!`);
    });

    //properties as setters/getters
    //dynamic rewrites?
});
