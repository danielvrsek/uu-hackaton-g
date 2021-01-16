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
  const FEMALE_FIRSTNAMES = ["Marcela", "Petra", "Alice", "Helena", "Veronika", "Irena", "Olga", "Alena", "Marie", "Michaela", "Eva", "Jana", "Kristýna", "Lucie", "Lenka", "Jindra", "Vlasta", "Zdenka", "Dana", "Martina", "Věra", "Viera", "Marika", "Jaroslava", "Drahomíra", "Hana", "Anna", "Ludmila", "Barbora", "Jiřina", "Božena", "Diana", "Zdeňka", "Gabriela", "Dagmar", "Soňa", "Jitka", "Kateřina", "Zuzana", "Tereza", "Natálie", "Markéta", "Andrea", "Jarmila", "Daniela", "Vladimíra", "Dita", "Šárka", "Ivana", "Monika"];
  const MALE_FIRSTNAMES = ["Vlastimil", "Roman", "Ladislav", "Josef", "Jan", "Miroslav", "Tomáš", "Jaroslav", "Jiří", "Václav", "Oldřich", "Karel", "Petr", "Zdeněk", "Leonardus Franciscus", "František", "Milan", "Pavel", "Lukáš", "Radek", "Rolf Harri", "Martin", "Vlastislav", "Daniel", "Bohuslav", "Lubomír", "Illya", "Ivan", "Michal", "Vladimír", "Vojtěch", "David", "Patrik", "Jaromír", "Aleš", "Bohdan", "Stanislav", "Radislav", "Antonín", "Leoš", "Ondřej", "Jakub", "Marek", "Vittorio", "Arnošt", "Robert", "Vítězslav", "Radomír", "Richard", "Vladislav"];
  const FEMALE_LASTNAMES = ["Hubáčková", "Veselá", "Všetulová", "Šímová", "Beránková", "Jarolímková", "Šimková", "Kaňoková", "Horáková", "Gregárková", "Prchalová", "Blahová", "Melicharová", "Trutnovská", "Bulisová", "Lachmanová", "Kremlová", "Čejková", "Matušková", "Kolovecká", "Banasinská", "Kusáková", "Kitzbergerová", "Polívková", "Suchá", "Tomsová", "Šimáková", "Štěpánková", "Vlková", "Venclíčková", "Bartošová", "Ivanochko", "Kuzniková", "Bednaříková", "Gregorová", "Milerová", "Konečná", "Valešová", "Káčerková", "Culková", "Vebrová", "Rajmová", "Slaninová", "Kostomlatská", "Kašová", "Filipová", "Klodová", "Nováková", "Chrastinová", "Marková"];
  const MALE_LASTNAMES = ["Stránský", "Bílek", "Preuss", "Kolečář", "Štuchal", "Šindelář", "Kindl", "Novotný", "Mžourek", "Chrastina", "Všetečka", "Bajaja", "Srnec", "Chrt", "Crhonek", "Šnajdr", "Pawlas", "Macela", "Bičiště", "Kos", "Maksimov", "Poula", "Andrlík", "Handl", "Janoušek", "Hýbl", "Havel", "Tichý", "Přikryl", "Kučera", "Vaško", "Fuksa", "Šandera", "Diviš", "Sedlák", "Pavlů", "Suk", "Foks", "Wiedermann", "Zvelebil", "Stráňka", "Zadražil", "Maděra", "Rýdl", "Staník", "Batlička", "Pavel", "Burian", "Beran", "Malyjurek"];


  let employees = [];

  let gendercode = 0;
  for (let i = 0; i < dtoIn.count; i++) {
    gendercode = _getRandom(0, 1);
    employees.push({
      gender: gendercode == 0 ? "male" : "female",
      birthdate: 
      name: gendercode == 0 ? MALE_FIRSTNAMES[_getRandom(0, MALE_FIRSTNAMES.length - 1)] : FEMALE_FIRSTNAMES[_getRandom(0, FEMALE_FIRSTNAMES.length - 1)],
      surname: gendercode == 0 ? MALE_LASTNAMES[_getRandom(0, MALE_LASTNAMES.length - 1)] : FEMALE_LASTNAMES[_getRandom(0, FEMALE_LASTNAMES.length - 1)],
      workload: _getRandom(1, 4) * 10
    });
  }

  employees.forEach(e => {
    _getCard(e.name, e.surname, e.birthdate, e.gender);
  });


  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();
