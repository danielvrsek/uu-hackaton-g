const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;

const { dtoIn, console, session } = scriptContext;

/*@@viewOn:dtoIn*/
const dtoInSchema = `const sdeExamTask01DtoInSchemaType = shape({
  count: integer(2000).isRequired(),
  age: shape({
    min: integer(0, 100).isRequired(),
    max: integer(0, 100).isRequired()
  })
})`;
/*@@viewOff:dtoIn*/

/*@@viewOn:errors*/
const Errors = {
  ERROR_PREFIX: "ucl/sdeExamTask01/",

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
function _getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function _validateDtoIn(dtoIn, uuAppErrorMap) {
  //2.1.1
  let dtoInValidator = new Validator(dtoInSchema, true);
  //2.1.2
  let validationResult = dtoInValidator.validate("sdeExamTask01DtoInSchemaType", dtoIn);
  uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, `${Errors.ERROR_PREFIX}unsupportedKeys`, Errors.InvalidDtoIn);
  //2.1.3
  return uuAppErrorMap;
}

function _getCard(name, surname, birthdate, gender) {
  return `<UU5.Bricks.Card elevation=1 className="uu5-common-padding-m">
    <UU5.Bricks.Block colorSchema="${gender === "male" ? "blue" : "pink"}">
      <UU5.Bricks.Header style="margin-top: 0" level=2>
        <UU5.Bricks.Icon icon="${gender === "male" ? "mdi-gender-male" : "mdi-gender-female"}"/> ${name} ${surname} 
      </UU5.Bricks.Header>
      <UU5.Bricks.DateTime dateOnly value="${birthdate}" />
    </UU5.Bricks.Block>
  </UU5.Bricks.Card>`;
}

function _getData(data) {
  return `<UuApp.DesignKit.EmbeddedText codeStyle=javascript showLineNumbers=false codeStyle="javascript">${JSON.stringify(data)}</UuApp.DesignKit.EmbeddedText>`;
}
/*@@viewOff:helpers*/

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
