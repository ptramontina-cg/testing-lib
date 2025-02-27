import { CreativeValidator } from "./strategies/frontend/frontend.strategy";

const test: File = {
  name: "test",
  size: 0,
  type: "any",
};

const cv = new CreativeValidator();
cv.validate("image", test);


