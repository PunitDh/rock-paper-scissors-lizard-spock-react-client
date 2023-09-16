import { evaluateExpression } from "./utils";

describe(evaluateExpression, () => {
  const state = {
    // input: "4sin(90)+8cos(10)+9tan(80)+4log(4)+2.5ln(5)+24atan(4)+14Ans+14E-4π-2√3",
    input: [],
    output: 0,
    evaled: false,
    degrees: false,
    inverse: false,
    answer: 0,
    parsedInput: "",
    memory: {
      M1: { value: 0, filled: false },
      M2: { value: 0, filled: false },
      M3: { value: 0, filled: false },
      M4: { value: 0, filled: false },
      M5: { value: 0, filled: false },
      M6: { value: 0, filled: false },
      M7: { value: 0, filled: false },
      M8: { value: 0, filled: false },
    },
    history: [],
  };

  it("should add correctly", () => {
    const output = evaluateExpression({ ...state, input: ["1", "+", "1"] });
    expect(output.parsedInput).toEqual("1+1");
    expect(output.value).toEqual(2);
  });

  it("should subtract correctly", () => {
    const output = evaluateExpression({ ...state, input: ["1", "-", "1"] });
    expect(output.parsedInput).toEqual("1-1");
    expect(output.value).toEqual(0);
  });

  it("should multiply correctly", () => {
    const output = evaluateExpression({ ...state, input: ["2", "×", "3"] });
    expect(output.parsedInput).toEqual("2*3");
    expect(output.value).toEqual(6);
  });

  it("should divide correctly", () => {
    const output = evaluateExpression({ ...state, input: ["10", "÷", "5"] });
    expect(output.parsedInput).toEqual("10/5");
    expect(output.value).toEqual(2);
  });

  it("should exponent correctly", () => {
    const output = evaluateExpression({ ...state, input: ["10", "^", "3"] });
    expect(output.parsedInput).toEqual("10**3");
    expect(output.value).toEqual(1000);
  });

  it("should square correctly", () => {
    const output = evaluateExpression({ ...state, input: ["10", "²"] });
    expect(output.parsedInput).toEqual("10**2");
    expect(output.value).toEqual(100);
  });

  it("should calculate sin correctly for radians", () => {
    const output = evaluateExpression({
      ...state,
      input: [" sin ", "π", "÷", "6"],
    });
    expect(output.parsedInput).toEqual("Math.sin((Math.PI)/6)");
    expect(output.value).toEqual(0.5);
  });

  it("should calculate sin correctly for degrees", () => {
    const output = evaluateExpression({
      ...state,
      degrees: true,
      input: [" sin ", "3", "0"],
    });
    expect(output.parsedInput).toEqual("Math.sin(Math.PI/180*30)");
    expect(output.value).toEqual(0.5);
  });
});
