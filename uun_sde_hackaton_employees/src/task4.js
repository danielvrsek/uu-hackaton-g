const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;

const { dtoIn, console, session } = scriptContext;

/*@@viewOn:dtoIn*/
const dtoInSchema = `const sdeExamTask04DtoInSchemaType = array(
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
  ERROR_PREFIX: "ucl/sdeExamTask04/",

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
  let validationResult = dtoInValidator.validate("sdeExamTask04DtoInSchemaType", dtoIn);
  uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, `${Errors.ERROR_PREFIX}unsupportedKeys`, Errors.InvalidDtoIn);
  //2.1.3
  return uuAppErrorMap;
}

function _getBarChart(headerText, valueLabel, data) {
  return `<UU5.Bricks.Section header="${headerText}">
    <UU5.SimpleChart.BarChart
      displayLegend
      series='<uu5json/>[
        {
          "valueKey": "value",
          "name": "${valueLabel}",
          "colorSchema": "blue-rich"
        }
      ]'>
      ${JSON.stringify(data)}
    </UU5.SimpleChart.BarChart>
  </UU5.Bricks.Section>`;
}
/*@@viewOff:helpers*/

/*@@viewOn:customHelpers*/
function getFirstNameFrequencyGraphData(employees) {
  let counts = {};

  employees.forEach(employee => {
    counts[employee.name] = counts[employee.name] ? counts[employee.name] + 1 : 1;
  });

  return Object.entries(counts).map(([k, v]) => ({"label":k,"value":v})).sort((a,b) => b.value - a.value);  
}
/*@@viewOff:customHelpers*/

async function main() {
  //1
  let uuAppErrorMap = {};

  //2
  await _validateDtoIn(dtoIn, uuAppErrorMap);

  /*@@viewOn:sourceCode*/

  // všech zaměstnanců
  console.log(_getBarChart("Histogram jmen všech zaměstnanců", "Zaměstnanci", getFirstNameFrequencyGraphData(dtoIn)));
  // žen
  console.log(_getBarChart("Histogram jmen všech žen", "Zaměstnanci", getFirstNameFrequencyGraphData(dtoIn.filter(e => e.gender === "female"))));
  // mužů
  console.log(_getBarChart("Histogram jmen všech mužů", "Zaměstnanci", getFirstNameFrequencyGraphData(dtoIn.filter(e => e.gender === "male"))));
  // žen na zkrácený úvazek (tj. 10, 20 či 30h/týdně)
  console.log(_getBarChart("Histogram jmen všech žen na zkrácený úvazek", "Zaměstnanci", getFirstNameFrequencyGraphData(dtoIn.filter(e => e.gender === "female" && e.workload < 40))));
  // mužů na plný pracovní úvazek (tj. 40h/týdně)
  console.log(_getBarChart("Histogram jmen všech mužů na plný pracovní úvazek", "Zaměstnanci", getFirstNameFrequencyGraphData(dtoIn.filter(e => e.gender === "male" && e.workload === 40))));

  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();