import { describe, test, expect } from "vitest";
import { calcularMontosSubtotales } from "../src/calcularMontosSubtotales.js";
import { calcularMontosSubtotalesModificado } from "../src/calcularMontosSubtotalesModificado.js";
import { testCases } from "../data/testCases.js";

describe("Comparación Original vs Modificada", () => {
  // Test individual para cada caso
  test.each(testCases)("$title", (testCase) => {
    const originalOutput = calcularMontosSubtotales(testCase);
    const modifiedOutput = calcularMontosSubtotalesModificado(testCase);

    expect(modifiedOutput).toEqual(originalOutput);
  });

  // Test adicional para ver diferencias detalladas cuando fallan
  describe("Análisis detallado de diferencias", () => {
    testCases.forEach((testCase, index) => {
      test(`Caso ${index + 1}: ${testCase.title}`, () => {
        const originalOutput = calcularMontosSubtotales(testCase);
        const modifiedOutput = calcularMontosSubtotalesModificado(testCase);

        // Compara cada propiedad individualmente para mejor debugging
        expect(modifiedOutput.neto_linea).toBeCloseTo(
          originalOutput.neto_linea,
          6,
        );
        expect(modifiedOutput.subtotal_impuesto).toBeCloseTo(
          originalOutput.subtotal_impuesto,
          6,
        );
        expect(modifiedOutput.subtotal_linea).toBeCloseTo(
          originalOutput.subtotal_linea,
          6,
        );
        expect(modifiedOutput.valor_unitario_sd).toBeCloseTo(
          originalOutput.valor_unitario_sd,
          6,
        );
        expect(modifiedOutput.bruto_linea).toBeCloseTo(
          originalOutput.bruto_linea,
          6,
        );
        expect(modifiedOutput.subtotal_neto).toBeCloseTo(
          originalOutput.subtotal_neto,
          6,
        );
        expect(modifiedOutput.min_value).toBeCloseTo(
          originalOutput.min_value,
          6,
        );
      });
    });
  });
});
