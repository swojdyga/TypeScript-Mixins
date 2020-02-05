import "mocha";
import { expect } from "chai";
import Extend from "./Extend";

describe(`Extend Helper`, () => {
    it(`Should can extends class via Extend helper.`, () => {
        class BaseClass {
            public someProperty: string;
        }

        class MainClass extends Extend(BaseClass) {

        }

        const result = MainClass;
        expect(result).to.be.instanceOf(Function);
    });

    it(`Should can extends abstract class via Extend helper.`, () => {
        abstract class BaseClass {
            public abstract someProperty: string;
        }

        class MainClass extends Extend(BaseClass) {
            public someProperty: string;
        }

        const result = MainClass;
        expect(result).to.be.instanceOf(Function);
    });
});
