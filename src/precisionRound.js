export function precisionRound(num, decimals) {
  num = parseFloat(num);
  if (parseInt(decimals) == 0) {
    return num.toFixed(decimals);
  } else {
    var tmp_num = num;
    var new_num;
    if (!("" + num).includes("e")) {
      new_num = parseFloat(
        +(Math.round(num + "e+" + decimals) + "e-" + decimals),
      );
    } else {
      var arr = ("" + num).split("e");
      var sig = "";
      if (+arr[1] + decimals > 0) {
        sig = "+";
      }
      new_num = parseFloat(
        +(
          Math.round(+arr[0] + "e" + sig + (+arr[1] + decimals)) +
          "e-" +
          decimals
        ),
      );
    }
    new_num = new_num.toFixed(decimals);
    if (isNaN(new_num)) {
      new_num = parseFloat(tmp_num);
    }
    return parseFloat(new_num).toFixed(decimals);
  }
}
