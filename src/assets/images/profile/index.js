const fs = require("fs");

const files = fs.readdirSync("./");

const createImportStatement = (filename) =>
  `import ${
    filename.split(".")[0]
  } from "../assets/images/profile/${filename}"`;

const imports = files.map(createImportStatement);

console.log(imports);