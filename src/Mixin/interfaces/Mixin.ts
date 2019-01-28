export default interface Mixin<Rewrites, Requirements = {}> {
    readonly rewrites: Rewrites; //nie można przepisywać metod, które są wymagane
    owner: Requirements; //czy tutaj nie powinno się zawierać metod również z rewrites??
    super: Requirements;
}
