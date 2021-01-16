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
/*@@viewOff:customHelpers*/

async function main() {
  //1
  let uuAppErrorMap = {};

  //2
  await _validateDtoIn(dtoIn, uuAppErrorMap);

  /*@@viewOn:sourceCode*/

  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();