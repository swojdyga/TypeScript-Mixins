export default interface Mixin<Rewrites extends {}, Requirements = {}> {
    readonly rewrites: Rewrites;
    owner: Requirements & Rewrites;
}
