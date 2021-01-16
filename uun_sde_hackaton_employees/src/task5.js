const AppClient = require("uu_appg01_server").AppClient;
const { Validator } = require("uu_appg01_server").Validation;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const { UseCaseError } = require("uu_appg01_server").AppServer;

const { dtoIn, console, session } = scriptContext;

/*@@viewOn:dtoIn*/
const dtoInSchema = `const sdeExamTask05DtoInSchemaType = array(
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
  ERROR_PREFIX: "ucl/sdeExamTask05/",

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
  let validationResult = dtoInValidator.validate("sdeExamTask05DtoInSchemaType", dtoIn);
  uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, `${Errors.ERROR_PREFIX}unsupportedKeys`, Errors.InvalidDtoIn);
  //2.1.3
  return uuAppErrorMap;
}

function _getBirthdayCard(name, surname, date, age, gender) {
  return `<UU5.Bricks.Card elevation=1 className="uu5-common-padding-m">
    <UU5.Bricks.Text colorSchema="${gender === "male" ? "blue-rich" : "pink-rich"}" style="position: absolute;top:24px;right:24px;font-size:32px">
      <UU5.Bricks.Icon icon="mdi-gift"/>
    </UU5.Bricks.Text>
    <UU5.Bricks.Header style="margin-top: 0" level=2>
      <UU5.Bricks.Icon icon="${gender === "male" ? "mdi-gender-male" : "mdi-gender-female"}"/> ${name} ${surname} 
    </UU5.Bricks.Header>
    <UU5.Bricks.Header level=4>
      <UU5.Bricks.DateTime dateOnly value="${date}"/> slaví ${age} let
    </UU5.Bricks.Header>
  </UU5.Bricks.Card>`;
}
/*@@viewOff:helpers*/

/*@@viewOn:customHelpers*/

/*
* Tato metoda vypočítá na základě parametru a aktuálního datumu počet let.
*/
function getAge(birthDate) {
  /*
  * Do proměnné today uložíme aktuální měsíc a den v roce z parametru birthDate. 
  * Tzn. pokud bude dnešní datum 2021-01-16 a datum v proměnné birthDate bude 2016-05-10, tak v proměnné today bude 2016-01-16
  */ 
  let today = new Date();
  today.setFullYear(birthDate.getFullYear());

  // Pokud je hodnota v proměnné today větší než v proměnné birthDate, tento datum již tento rok proběhl a vrátíme pouze rozdíl mezi rokem 2020 a 2016, tzn. 4.
  if (today > birthDate) {
    return new Date().getFullYear() - birthDate.getFullYear();
  }

  // Pokud je hodnota v proměnné today menší než v proměnné birthDate, tento datum tento rok ještě neproběhl a vrátíme rozdím mezi rokem 2020 a 2016 ponížený o 1, tzn. 3.
  return new Date().getFullYear() - birthDate.getFullYear() - 1;
}

/*@@viewOff:customHelpers*/

async function main() {
  //1
  let uuAppErrorMap = {};

  //2
  await _validateDtoIn(dtoIn, uuAppErrorMap);

  /*@@viewOn:sourceCode*/
  
  let today = new Date();
  let employees = dtoIn.filter(x => new Date(x.birthdate).getMonth() == today.getMonth()).map(x => { return { ...x, age: getAge(new Date(x.birthdate))}; });

  console.log("Employees that celebrate birthday this month: " + employees.map(x => `${x.name} ${x.surname}, age: ${x.age}\n`));

  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();
