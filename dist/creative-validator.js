var l = Object.defineProperty;
var o = (t, a, e) => a in t ? l(t, a, { enumerable: !0, configurable: !0, writable: !0, value: e }) : t[a] = e;
var r = (t, a, e) => o(t, typeof a != "symbol" ? a + "" : a, e);
class d {
  async validate(a) {
    return console.log("Backend", a), !0;
  }
}
class n {
  async validate(a) {
    return console.log("FrontendValidatorStrategy", a), !0;
  }
}
class s {
  constructor(a) {
    r(this, "validatorStrategy");
    this.validatorStrategy = a === "backend" ? new d() : new n();
  }
  validate(a) {
    this.validatorStrategy.validate(a);
  }
}
export {
  s as CreativeValidator
};
