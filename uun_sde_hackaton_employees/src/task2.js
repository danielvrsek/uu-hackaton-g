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

/*@@viewOff:customHelpers*/

async function main() {
  //1
  let uuAppErrorMap = {};

  //2
  await _validateDtoIn(dtoIn, uuAppErrorMap);

  /*@@viewOn:sourceCode*/

  if (dtoIn.length === 0) {
    console.error("There are no employees present.");
    return { uuAppErrorMap };
  }

  let empByAge = dtoIn.map(p => { return { ...p, age: getAge(new Date(p.birthdate)) }; }).sort((a, b) => a.age - b.age);
  let ageMin = empByAge[0].age;
  let ageMax = empByAge[empByAge.length - 1].age;

  let ageSum = 0;
  let womenWorkloadSum = 0;
  let womenCount = 0;
  for (let i = 0; i < empByAge.length; i++) {
    let emp = empByAge[i];

    ageSum += emp.age;
    if (emp.gender === "female") {
      womenCount++;
      womenWorkloadSum += emp.workload;
    }
  }

  let ageMedian = calculateMedian(empByAge.map(x => x.age));
  let workflowMedian = calculateMedian(empByAge.map(x => x.workload));

  console.log(`Number of employees: ${empByAge.length}`);
  console.log(`Minimum age: ${ageMin} years`);
  console.log(`Maximum age: ${ageMax} years`);
  console.log(`Average age: ${(ageSum / empByAge.length).toFixed(1)} years`);
  console.log(`Median of age: ${ageMedian} years`)
  console.log(`Median of workload: ${workflowMedian} hrs`)
  console.log("Overview by workload: " + empByAge.sort((a, b) => a.workload - b.workload).map(x => `${x.name} ${x.surname} - ${x.workload} hrs\n`));
  console.log(`Average women workload: ${womenCount > 0 ? (womenWorkloadSum / womenCount).toFixed(1) : 0}`);

  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();
