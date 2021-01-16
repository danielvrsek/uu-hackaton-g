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

function calculateMedian(arr) {
  // Zjistíme si "prostřední" prvek pole z proměnné arr a uložíme ho do proměnné middle. 
  // Pro případ, že má pole lichý počet prvků, použijeme metodu Math.floor, která zajistí, že se výsledek zaokrouhlý směrem dolu.
  let middle = Math.floor(arr.length / 2);
  // Vytvoříme kopii pole pomocí spread operátoru a setřídíme od nejmenšího po největší.
  arr = [...arr].sort((a, b) => a - b);
  if (arr.length % 2 !== 0) {
      // V případě, že počet prvků v poli je sudý, vrátíme prostřední prvek, který jsme si uložili do proměnné middle.
      return arr[middle];
  } else {
      // Pokud je počet prvků v poli lichý, vrátíme průměr prostředního a sousedního prvku.
      return (arr[middle - 1] + arr[middle]) / 2;
  }
}

function groupBy(arr, key) {
  return arr.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

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

  /* 
  * Pomocí metody map a spread operátoru vytvoříme kopii jednotlivých prvků s novou vypočítanou vlastností age. 
  * Následně toto pole seřídíme dle vlastnosti age od nejmenšího po největší. 
  * Výsledek uložíme do proměnné empByAge
  */
  let empByAge = dtoIn.map(p => { return { ...p, age: getAge(new Date(p.birthdate)) }; }).sort((a, b) => a.age - b.age);
  /*
  * Využitím seřazeného pole empByAge můžeme pro proměnnou ageMin zvolit první prvek pole, který má nejmenší hodnotu. 
  * Obdobným způsobem můžeme zvolit poslední prvek z pole empByAge pro proměnnou ageMax, který má hodnotu nejvyšší.
  */
  let ageMin = empByAge[0].age;
  let ageMax = empByAge[empByAge.length - 1].age;

  /*
  * Ve scope metody main nadefinujeme pomocné proměnné ageSum, womenWorkloadSum, womenCount, které nám později pomohou při výpočtech.
  */
  let ageSum = 0;
  let womenWorkloadSum = 0;
  let womenCount = 0;

  /*
  * Pomocí cyklu for projedeme všechny prvky a do proměnné ageSum přiteme věk zaměstance.
  * Pokud se jedná o ženu, inkrementujeme proměnnou womenCount a do womenWorkloadSum přičteme její pracovní vytížení.
  * Jeden cyklus for s použitím pomocných proměnných je využit z důvodu performance, abychom nemuseli pole procházet vícekrát, než je třeba (byť pomocí již definovaných metod.)
  */
  for (let i = 0; i < empByAge.length; i++) {
    let emp = empByAge[i];

    ageSum += emp.age;
    if (emp.gender === "female") {
      womenCount++;
      womenWorkloadSum += emp.workload;
    }
  }

  /* 
  * Do proměnných ageMedian a workloadMedian uložíme spočítanou hodnotu mediánu věku, resp. pracovního vytížení zaměstnanců zavoláním metody calculateMedian.
  */
  let ageMedian = calculateMedian(empByAge.map(x => x.age));
  let workflowMedian = calculateMedian(empByAge.map(x => x.workload));

  /*
  * Provedeme groupování pole empByAge klíčem workload. Tímto ušetříme mnohonásobné procházení pole.
  */
  let workloadGrouped = groupBy(empByAge, 'workload');

  /*
  * Spočítáme zbylé hodnoty a vypíšeme do konzole.
  */
  console.log(`Number of employees: ${empByAge.length}`);
  console.log(`Sum of employees by workload 10hrs: ${(workloadGrouped["10"] || []).length}`);
  console.log(`Sum of employees by workload 20hrs: ${(workloadGrouped["20"] || []).length}`);
  console.log(`Sum of employees by workload 30hrs: ${(workloadGrouped["30"] || []).length}`);
  console.log(`Sum of employees by workload 40hrs: ${(workloadGrouped["40"] || []).length}`);
  console.log(`Minimum age: ${ageMin} years`);
  console.log(`Maximum age: ${ageMax} years`);
  console.log(`Average age: ${(ageSum / empByAge.length).toFixed(1)} years`);
  console.log(`Median of age: ${ageMedian} years`);
  console.log(`Median of workload: ${workflowMedian} hrs`);
  console.log("Overview by workload: " + empByAge.sort((a, b) => a.workload - b.workload).map(x => `${x.name} ${x.surname} - ${x.workload} hrs\n`));
  console.log(`Average women workload: ${womenCount > 0 ? (womenWorkloadSum / womenCount).toFixed(1) : 0}`);

  /*@@viewOff:sourceCode*/

  return { uuAppErrorMap };
}

main();
