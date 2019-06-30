import "mocha";
import { expect } from "chai";
import Collection from "./Collection";

describe(`Collection`, () => {
    it(`Should return the same value that was set when set the collection element by the same string key.`, () => {
        const collection = new Collection();
        collection.set(`key`, `Hello World!`);

        const result = collection.get('key');
        expect(result).to.be.equals(`Hello World!`);
    });

    it(``, () => {
        const collection = new Collection();

        const result = collection.get('key');
        expect(result).to.be.equals(false);
    });

    it(`Should return the same value that was set when set the collection element by the exactly same object key.`, () => {
        const key = {};

        const collection = new Collection();
        collection.set(key, `Hello World!`);

        const result = collection.get(key);
        expect(result).to.be.equals(`Hello World!`);
    });

    it(``, () => {
        const collection = new Collection();
        collection.set({}, `Hello World!`);

        const result = collection.get({});
        expect(result).to.be.equals(`Hello World!`);
    });

    it(``, () => {
        const keyA = {};
        const keyB = {};

        const collection = new Collection();
        collection.set([keyA, keyB], `Hello World!`);

        const result = collection.get([keyA, keyB]);
        expect(result).to.be.equals(`Hello World!`);
    });

    // it(``, () => {
    //     const collection = new Collection();
    //     collection.set(`key`, []);

    //     collection.get(`key`).push('test');
    //     collection.get(`key`).push('test');
    //     collection.get(`key`).push('test');

    //     console.log(collection.get(`key`));

    //     const result = collection.get('key');
    //     expect(result).to.be.equals(`Hello World!`);
    // });
});
