const ipjson = document.querySelector(".ipjson");
const opjson = document.querySelector(".opjson");
const fmtbtn = document.querySelector(".fmt_btn");

let ans = "{\n";

let spaceCnt = 0;

const formatJson = (parentObj, obj, spaceCnt) => {
  spaceCnt = spaceCnt + 2;

  //! Check if the parentObj is an object or an array

  if (obj instanceof Array) {
    obj.forEach((item, i) => {
      //*hrr input se pehle daalni hogi & hr recursive iteration mein increase krni hoga spaceCnt ko 1 se

      for (let i = 0; i < spaceCnt; i++) {
        parentObj = parentObj + " ";
      }

      if (item !== Object(item)) {
        if (typeof item == "boolean" || typeof item == "number") {
          parentObj = parentObj + `${item}`;
        } else if (typeof item == "string") {
          parentObj = parentObj + `"${item}"`;
        } else {
          parentObj = parentObj + `"${item}"`;
        }
      } else if (item instanceof Array) {
        // go into recursive loop into array
        // * value -> Array

        parentObj = parentObj + `"${key}": [\n`;

        item.forEach((el, index) => {
          // * here parentObj of each el is obj

          for (let i = 0; i < spaceCnt + 2; i++) {
            parentObj = parentObj + " ";
          }

          if (el !== Object(el)) {
            if (typeof el == "boolean" || typeof el == "number") {
              parentObj = parentObj + `${el}`;
            } else if (typeof el == "string") {
              parentObj = parentObj + `"${el}"`;
            } else {
              parentObj = parentObj + `"${el}"`;
              // temp.push(formatJson(obj, el, spaceCnt));
            }
          } else if (el instanceof Array || el instanceof Object) {
            const recValue = formatJson(obj, el, spaceCnt);
            parentObj = parentObj + recValue;
          }

          if (index != item.length - 1) {
            parentObj = parentObj + `,`;
          }
          parentObj = parentObj + `\n`;
        });

        for (let j = 0; j < spaceCnt; j++) {
          parentObj = parentObj + " ";
        }

        parentObj = parentObj + `]`;
      } else if (item instanceof Object) {
        parentObj = parentObj + `"${key}":"${JSON.stringify(item)}"`;
      }

      parentObj =
        i !== Object.entries(obj).length - 1
          ? parentObj + ",\n"
          : parentObj + "\n";
    });
    parentObj = parentObj + "}";
  } else if (obj instanceof Object) {
    Object.entries(obj).forEach(([key, value], i) => {
      //*hrr input se pehle daalni hogi & hr recursive iteration mein increase krni hoga spaceCnt ko 1 se

      for (let i = 0; i < spaceCnt; i++) {
        parentObj = parentObj + " ";
      }

      if (value !== Object(value)) {
        if (typeof value == "boolean") {
          parentObj = parentObj + `"${key}":${value}`;
        } else if (typeof value == "number") {
          parentObj = parentObj + `"${key}":${value}`;
        } else if (typeof value == "string") {
          parentObj = parentObj + `"${key}":"${value}"`;
        } else {
          parentObj = parentObj + `"${key}":"${value}"`;
        }
      } else if (value instanceof Array) {
        // go into recursive loop into array
        // * value -> Array

        parentObj = parentObj + `"${key}": [\n`;

        value.forEach((el, index) => {
          // * here parentObj of each el is obj

          for (let i = 0; i < spaceCnt + 2; i++) {
            parentObj = parentObj + " ";
          }

          if (el !== Object(el)) {
            if (typeof el == "boolean" || typeof el == "number") {
              parentObj = parentObj + `${el}`;
            } else if (typeof el == "string") {
              parentObj = parentObj + `"${el}"`;
            } else {
              parentObj = parentObj + `"${el}"`;
              // temp.push(formatJson(obj, el, spaceCnt));
            }
          } else if (el instanceof Array || el instanceof Object) {
            const recValue = formatJson("", el, spaceCnt);
            // const recValue = formatJson(obj, el, spaceCnt);
            console.log("orgValue: ", el);
            console.log("recValue: ", recValue);
            parentObj = parentObj + recValue;
          }

          if (index != value.length - 1) {
            parentObj = parentObj + `,`;
          }
          parentObj = parentObj + `\n`;
        });

        for (let j = 0; j < spaceCnt; j++) {
          parentObj = parentObj + " ";
        }

        parentObj = parentObj + `]`;
      } else if (value instanceof Object) {
        parentObj = parentObj + `"${key}":"${JSON.stringify(value)}"`;
      }

      parentObj =
        i !== Object.entries(obj).length - 1
          ? parentObj + ",\n"
          : parentObj + "\n";
    });
    parentObj = parentObj + "}";
  }

  return parentObj;
};

fmtbtn.addEventListener("click", () => {
  try {
    let obj = JSON.parse(ipjson.value);

    const finalAns = formatJson(ans, obj, spaceCnt);

    opjson.value = finalAns;
  } catch (error) {
    opjson.value = error.message;
  }
});
