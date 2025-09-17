if (value instanceof Array) {
  parentObj = parentObj + `"${key}": [\n`;

  value.forEach((el, index) => {
    for (let j = 0; j < spaceCnt + 2; j++) {
      parentObj = parentObj + " ";
    }

    if (el !== Object(el)) {
      if (typeof el == "boolean" || typeof el == "number") {
        parentObj = parentObj + `${el}`;
      } else if (typeof el == "string") {
        parentObj = parentObj + `"${el}"`;
      } else {
        parentObj = parentObj + `"${el}"`;
      }
    } else if (el instanceof Array || el instanceof Object) {
      parentObj = parentObj + formatJson("", el, spaceCnt + 2);
    }

    if (index !== value.length - 1) {
      parentObj = parentObj + ",";
    }
    parentObj = parentObj + "\n";
  });

  for (let j = 0; j < spaceCnt; j++) {
    parentObj = parentObj + " ";
  }
  parentObj = parentObj + "]";
}
