const ipjson = document.querySelector(".ipjson");
const opjson = document.querySelector(".opjson");
const fmtbtn = document.querySelector(".fmt_btn");

//Setting default value of the JSON
ipjson.value = JSON.stringify({
  name: "Rudransh Aggarwal",
  isActive: true,
  skills: ["JavaScript", "React", "Node.js", { insideKey: "MongoDB" }],
  education: {
    undergraduate: { degree: "B.Tech", field: "Computer Science", year: 2022 },
    postgraduate: {
      degree: "M.Tech",
      field: "Software Engineering",
      year: 2024,
    },
  },
  preferences: { newsletter: false, notifications: ["email", "push"] },
});

let ans = "";
// let ans = "{\n";

let spaceCnt = 0;

const formatJson = (parentObj, obj, spaceCnt) => {
  spaceCnt = spaceCnt + 2;

  parentObj = parentObj + "{\n";

  if (obj instanceof Array) {
    parentObj = arrayLogic(parentObj, obj, spaceCnt);
  } else if (obj instanceof Object) {
    parentObj = objectLogic(parentObj, obj, spaceCnt);
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

// * Make it modular :
// - Array vale ko ek function bna do
// - object vale ke liye ek function bna do

const arrayLogic = (parentObj, obj, spaceCnt) => {
  obj.forEach(([key, value], i) => {
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
      parentObj = parentObj + `"${key}": [\n`;

      value.forEach((el, index) => {
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
          }
        } else if (el instanceof Array || el instanceof Object) {
          const recValue = formatJson("", el, spaceCnt);
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
      const newJSON = formatJson(parentObj, value, spaceCnt + 2);

      parentObj = parentObj + `"${key}": ${newJSON}`;
    }

    parentObj =
      i !== Object.entries(obj).length - 1
        ? parentObj + ",\n"
        : parentObj + "\n";
  });
  parentObj = parentObj + "}";

  return parentObj;
};

const objectLogic = (parentObj, obj, spaceCnt) => {
  Object.entries(obj).forEach(([key, value], i) => {
    for (let i = 0; i < spaceCnt; i++) {
      parentObj = parentObj + " ";
    }

    if (value !== Object(value)) {
      if (typeof value == "boolean") {
        parentObj = parentObj + `"${key}":${value}`;
      } else if (typeof value == "number") {
        parentObj = parentObj + `"${key}":${value}`;
      } else {
        parentObj = parentObj + `"${key}":"${value}"`;
      }
    } else if (value instanceof Array) {
      parentObj = parentObj + `"${key}": [\n`;

      value.forEach((el, index) => {
        for (let i = 0; i < spaceCnt + 2; i++) {
          parentObj = parentObj + " ";
        }

        if (el !== Object(el)) {
          if (typeof el == "boolean" || typeof el == "number") {
            parentObj = parentObj + `${el}`;
          } else {
            parentObj = parentObj + `"${el}"`;
          }
        } else if (el instanceof Array || el instanceof Object) {
          const recValue = formatJson("", el, spaceCnt);
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
      const newJSON = formatJson(parentObj, value, spaceCnt + 2);

      parentObj = parentObj + `"${key}": ${newJSON}`;
    }

    parentObj =
      i !== Object.entries(obj).length - 1
        ? parentObj + ",\n"
        : parentObj + "\n";
  });

  for (let i = 0; i < spaceCnt; i++) {
    parentObj = parentObj + " ";
  }
  parentObj = parentObj + "}";

  return parentObj;
};
