const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;

const { dtoIn, console, session } = scriptContext;

/*@@viewOn:dtoIn*/
const dtoInSchema = `const sdeExamTask02DtoInSchemaType = array(
  shape({
    gender: oneOf("male","female").isRequired(),
    birthdate: date().isRequired(),
    name: string().isRequired(),
    surname: string().isRequired(),
    workload: oneOf(40,30,20,10).isRequired()
  }), 2000)`;
/*@@viewOff:dtoIn*/

/*@@viewOn:errors*/
const Errors = {
  ERROR_PREFIX: "ucl/sdeExamTask02/",

  InvalidDtoIn: class extends UseCaseError {
    constructor(dtoOut, paramMap) {
      super({ dtoOut, paramMap, status: 400 });
      this.message = `DtoIn is not valid.`;
      this.code = `${Errors.ERROR_PREFIX}invalidDtoIn`;
    }
  }
};
/*@@viewOff:errors*/

/*@@viewOn:helpers*/
async function _validateDtoIn(dtoIn, uuAppErrorMap) {
  //2.1.1
  let dtoInValidator = new Validator(dtoInSchema, true);
  //2.1.2
  let validationResult = dtoInValidator.validate("sdeExamTask02DtoInSchemaType", dtoIn);
  uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, `${Errors.ERROR_PREFIX}unsupportedKeys`, Errors.InvalidDtoIn);
  //2.1.3
  return uuAppErrorMap;
}
/*@@viewOff:helpers*/

/*@@viewOn:customHelpers*/
/*@@viewOff:customHelpers*/

async function main() {
  //1
  let uuAppErrorMap = {};

  //2
  await _validateDtoIn(dtoIn, uuAppErrorMap);

  /*@@viewOn:sourceCode*/

  function getAge(birthDate) {
    let today = new Date();
    today.setFullYear(birthDate.getFullYear());

    if (today > birthDate) {
      return new Date().getFullYear() - birthDate.getFullYear();
    }

    return new Date().getFullYear() - birthDate.getFullYear() - 1;
  }

  function calculateMedian(arr) {
    let middle = Math.floor(arr.length / 2);
      arr = [...arr].sort((a, b) => a - b);
      if (arr.length % 2 !== 0) {
         return arr[middle];
      } else {
         return (arr[middle - 1] + arr[middle]) / 2;
      }
  }

  if (dtoIn.length === 0) {
    console.error("There are no employees present.");
    return { uuAppErrorMap };
  }

  let womenWorkloadSum = 0;
  let womenCount = 0;

  let ageSum = 0;
  let ageMin = Number.MAX_SAFE_INTEGER;
  let ageMax = Number.MIN_SAFE_INTEGER;

  let arr = dtoIn.map(p => { return { ...p, age: getAge(new Date(p.birthdate)) }; });

  for (let i = 0; i < dtoIn.length; i++) {
    let person = arr[i];

    ageSum += person.age;
    if (person.gender === "female") {
      womenCount++;
      womenWorkloadSum += person.workload;
    }

    if (ageMin > person.age) {
      ageMin = person.age;
    }
    if (ageMax < person.age) {
      ageMax = person.age;
    }
  }

  let ageMedian = calculateMedian(arr.map(x => x.age));
  let workflowMedian = calculateMedian(arr.map(x => x.workload));

  console.log(`Number of employees: ${arr.length}`);
  console.log(`Minimum age: ${ageMin} years`);
  console.log(`Maximum age: ${ageMax} years`);
  console.log(`Average age: ${(ageSum / arr.length).toFixed(1)} years`);
  console.log(`Median of age: ${ageMedian} years`)
  console.log(`Median of workload: ${workflowMedian} hrs`)
  console.log("Overview by workload: " + arr.sort((a, b) => a.workload - b.workload).map(x => `${x.name} ${x.surname} - ${x.workload} hrs\n`));
  console.log(`Average women workload: ${womenCount > 0 ? (womenWorkloadSum / womenCount).toFixed(1) : 0}`);

  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();
