const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;

const { dtoIn, console, session } = scriptContext;

/*@@viewOn:dtoIn*/
const dtoInSchema = `const sdeExamTask03DtoInSchemaType = array(
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
  ERROR_PREFIX: "ucl/sdeExamTask03/",

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
  let validationResult = dtoInValidator.validate("sdeExamTask03DtoInSchemaType", dtoIn);
  uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, `${Errors.ERROR_PREFIX}unsupportedKeys`, Errors.InvalidDtoIn);
  //2.1.3
  return uuAppErrorMap;
}

function _getPieChart(headerText, valueLabel, data) {
  return `<UU5.Bricks.Section header="${headerText}"><UU5.SimpleChart.PieChart
    displayLabelLine
    series='<uu5json/>[
      {
        "labelKey": "label",
        "valueKey": "value",
        "name": "${valueLabel}",
        "colorSchema": [
          "blue-rich",
          "pink-rich"
        ],
        "outerRadius": 90,
        "innerRadius": 70
      }
    ]'>
    ${JSON.stringify(data)}
  </UU5.SimpleChart.PieChart></UU5.Bricks.Section>`;
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

function _getBarChartStacked(headerText, data) {
  return `<UU5.Bricks.Section header="${headerText}">
    <UU5.SimpleChart.BarChart
      displayLegend
      series='<uu5json/>[
        {
          "valueKey": "valueMale",
          "name": "Muži",
          "colorSchema": "blue-rich"
        },
        {
          "valueKey": "valueFemale",
          "name": "Ženy",
          "colorSchema": "pink-rich"
        }
      ]'
      stacked>
      ${JSON.stringify(data)}
    </UU5.SimpleChart.BarChart>
  </UU5.Bricks.Section>`;
}
/*@@viewOff:helpers*/

/*@@viewOn:customHelpers*/
function getAge(employee) {
    let today = new Date();
    let birthDate = new Date(employee.birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

function getWorkloadCount(workload, gender) {
  return gender ? dtoIn.filter((e) => e.workload === workload && e.gender === gender).length : dtoIn.filter((e) => e.workload === workload).length
}
/*@@viewOff:customHelpers*/

async function main() {
  //1
  let uuAppErrorMap = {};

  //2
  await _validateDtoIn(dtoIn, uuAppErrorMap);

  /*@@viewOn:sourceCode*/

  // ********** rozložení pracovních úvazků formou koláčového grafu *****************
  const dataPieChart = [
    { label: "10h/týden", value: getWorkloadCount(10) },
    { label: "20h/týden", value: getWorkloadCount(20) },
    { label: "30h/týden", value: getWorkloadCount(30) },
    { label: "40h/týden", value: getWorkloadCount(40) }
  ];
  console.log(_getPieChart("Rozložení pracovních úvazků", "Zaměstnanci", dataPieChart))

  // *********** četnost věku všech mužů formou sloupcového grafu, *******************
  let counts = {};

  dtoIn.forEach(employee => {
    let age = getAge(employee);
    counts[age] = counts[age] ? counts[age] + 1 : 1;
  });

  const dataBarChart = Object.entries(counts).map(([k, v]) => ({"label":k,"value":v}));  
  console.log(_getBarChart("Histogram věku mužů", "Zaměstnanci", dataBarChart));

  // *********** četnost pracovních úvazků mužů a žen formou složeného sloupcového grafu. *****************
  const dataBarChartStacked = [
    { label: "10h/týden", valueMale: getWorkloadCount(10, "male"), valueFemale: getWorkloadCount(10, "female") },
    { label: "20h/týden", valueMale: getWorkloadCount(20, "male"), valueFemale: getWorkloadCount(20, "female") },
    { label: "30h/týden", valueMale: getWorkloadCount(30, "male"), valueFemale: getWorkloadCount(30, "female") },
    { label: "40h/týden", valueMale: getWorkloadCount(40, "male"), valueFemale: getWorkloadCount(40, "female") }
  ];
  console.log(_getBarChartStacked("Histogram pracovních úvazků zaměstnanců dle pohlaví", dataBarChartStacked));
  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();