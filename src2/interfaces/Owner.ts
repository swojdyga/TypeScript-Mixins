import Mixin from "./Mixin";

type Owner<T> = T extends Mixin<infer U> ? U : never;

export default Owner;
