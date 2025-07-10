import { describe, test, expect } from "vitest";
import { calcularMontosSubtotales } from "../src/calcularMontosSubtotales.js";
import { calcularMontosSubtotalesModificado } from "../src/calcularMontosSubtotalesModificado.js";
import { testCases } from "../data/testCases.js";

describe("Original vs Modified", () => {
  testCases.forEach((testCase, index) => {
    test(`Caso ${index + 1}: ${testCase.title}`, () => {
      const originalOutput = calcularMontosSubtotales(testCase);
      const modifiedOutput = calcularMontosSubtotalesModificado(testCase);

      console.log(`\nEjecutando: ${testCase.title}`);
      console.log("Input:", testCase);

      expect(JSON.stringify(modifiedOutput)).toEqual(JSON.stringify(originalOutput));
    });
  });
});
