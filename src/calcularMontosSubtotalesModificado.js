import { precisionRound } from "./precisionRound";

/** Función modificada a testear */
export function calcularMontosSubtotalesModificado(valores) {
  let min_value = 0;
  let bruto_linea = 0;
  let neto_linea = 0;
  let valor_unitario_sd = 0;
  let subtotal_impuesto = 0;
  let subtotal_linea = 0;
  let subtotal_neto = 0;

  let tipo_cambio_moneda =
    valores.tipo_cambio_moneda && valores.tipo_cambio_moneda > 0
      ? valores.tipo_cambio_moneda
      : 1;
  //let unitario_linea_sd = valores.desglosa_tax==0 ? valores.neto_linea_sd : precisionRound(valores.neto_linea_sd, valores.decimales)
  //let unitario_linea_sd = precisionRound(valores.neto_linea_sd, valores.decimales)
  //let valor_unitario_cd = unitario_linea_sd * (1 - (valores.descuento / 100))
  let unitario_linea_sd = valores.neto_linea_sd;
  valores.neto_linea = unitario_linea_sd * tipo_cambio_moneda;

  subtotal_neto =
    precisionRound(valores.neto_linea, valores.decimales) *
    (1 - valores.descuento / 100) *
    parseFloat(valores.cantidad);
  if (valores.desglosa_tax == 0) {
    min_value =
      parseFloat(valores.min_value) +
      parseFloat(min_value * valores.sumatoria_impuesto);
    min_value = precisionRound(min_value, valores.decimales);
    bruto_linea =
      parseFloat(valores.neto_linea) +
      parseFloat(valores.neto_linea * valores.sumatoria_impuesto);

    if (valores.descuento < 100) {
      bruto_linea =
        parseFloat(bruto_linea) + parseFloat(valores.sumatoria_amount_tax);
    }

    bruto_linea =
      parseFloat(bruto_linea) +
      parseFloat(bruto_linea * valores.sumatoria_over_tax);
    //bruto_linea = precisionRound(bruto_linea, fallback_decimals);
    bruto_linea = precisionRound(bruto_linea, valores.decimales);
    bruto_linea = bruto_linea * (1 - valores.descuento / 100);

    valor_unitario_sd =
      parseFloat(valores.neto_linea_sd) +
      parseFloat(valores.neto_linea_sd * valores.sumatoria_impuesto);

    valor_unitario_sd =
      parseFloat(valor_unitario_sd) + parseFloat(valores.sumatoria_amount_tax);
    valor_unitario_sd =
      parseFloat(valor_unitario_sd) +
      parseFloat(valor_unitario_sd * valores.sumatoria_over_tax);
    valor_unitario_sd = precisionRound(valor_unitario_sd, valores.decimales);

    var st_impuesto_over =
      bruto_linea - bruto_linea / (1 + valores.sumatoria_over_tax);
    var bruto_clear = bruto_linea - st_impuesto_over;

    if (valores.descuento < 100) {
      bruto_clear = bruto_clear - valores.sumatoria_amount_tax;
    }

    subtotal_impuesto =
      bruto_clear -
      bruto_clear / (1 + valores.sumatoria_impuesto) +
      st_impuesto_over;

    if (valores.descuento < 100) {
      subtotal_impuesto += valores.sumatoria_amount_tax;
    }

    subtotal_impuesto = subtotal_impuesto * valores.cantidad;
    subtotal_linea = bruto_linea * valores.cantidad;
    bruto_linea = precisionRound(bruto_linea, valores.decimales);
  } else {
    neto_linea = precisionRound(valores.neto_linea, valores.decimales);
    //neto_linea = valores.neto_linea
    neto_linea = neto_linea * (1 - valores.descuento / 100);
    min_value = precisionRound(valores.min_value, valores.decimales);
    valor_unitario_sd = precisionRound(
      valores.neto_linea_sd,
      valores.decimales,
    );
    subtotal_impuesto = neto_linea * valores.sumatoria_impuesto;

    if (valores.descuento < 100) {
      subtotal_impuesto += valores.sumatoria_amount_tax;
    }
    subtotal_impuesto +=
      (parseFloat(neto_linea) + subtotal_impuesto) * valores.sumatoria_over_tax;
    subtotal_impuesto = subtotal_impuesto * valores.cantidad;
    subtotal_linea = neto_linea * valores.cantidad;
    //neto_linea = precisionRound(valores.neto_linea, fallback_decimals);
  }
  return {
    neto_linea,
    subtotal_impuesto,
    subtotal_linea,
    valor_unitario_sd,
    bruto_linea,
    subtotal_neto,
    min_value,
  };
}
