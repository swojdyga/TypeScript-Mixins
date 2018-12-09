import "mocha";
import { HelloWorld } from "./index";
import { expect } from "chai";

describe(`Hello function`, () => {
    it(`Should return 'Hello World!'`, () => {
        const result = HelloWorld();
        expect(result).to.equal(`Hello World!`);
    });
});
