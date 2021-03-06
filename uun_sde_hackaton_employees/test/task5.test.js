const { TestHelper } = require("uu_script_devkitg01");

describe("Task5", () => {
  test("HDS", async () => {
    const session = await TestHelper.login();

    const dtoIn = [
      {
         "gender":"female",
         "birthdate":"1991-06-03",
         "name":"Anna",
         "surname":"Všetulová",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1987-01-04",
         "name":"Daniel",
         "surname":"Maděra",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"2000-08-27",
         "name":"Martina",
         "surname":"Jarolímková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1979-10-20",
         "name":"Soňa",
         "surname":"Bulisová",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1977-02-19",
         "name":"Leonardus Franciscus",
         "surname":"Chrt",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1972-10-01",
         "name":"Vladislav",
         "surname":"Hýbl",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1993-06-03",
         "name":"Bohuslav",
         "surname":"Kindl",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"2002-04-12",
         "name":"Ludmila",
         "surname":"Venclíčková",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1996-02-13",
         "name":"Markéta",
         "surname":"Šimková",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1991-02-04",
         "name":"Vítězslav",
         "surname":"Preuss",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1992-09-06",
         "name":"Ludmila",
         "surname":"Všetulová",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1971-08-30",
         "name":"Rolf Harri",
         "surname":"Tichý",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1981-06-06",
         "name":"Aleš",
         "surname":"Staník",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"1991-06-19",
         "name":"Jan",
         "surname":"Bičiště",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1988-09-12",
         "name":"Vladimír",
         "surname":"Šindelář",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1984-10-08",
         "name":"Pavel",
         "surname":"Beran",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1999-07-14",
         "name":"Lucie",
         "surname":"Vlková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1990-12-24",
         "name":"Daniela",
         "surname":"Klodová",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1992-04-21",
         "name":"Zuzana",
         "surname":"Vlková",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"2000-10-03",
         "name":"Marcela",
         "surname":"Lachmanová",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1983-04-07",
         "name":"Ivana",
         "surname":"Kostomlatská",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1986-01-01",
         "name":"Vlasta",
         "surname":"Hubáčková",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1988-11-20",
         "name":"Vlasta",
         "surname":"Beránková",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"2001-11-06",
         "name":"Jaromír",
         "surname":"Maděra",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1975-10-27",
         "name":"Jan",
         "surname":"Andrlík",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1989-01-17",
         "name":"Ivan",
         "surname":"Šnajdr",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1999-08-10",
         "name":"Irena",
         "surname":"Trutnovská",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1985-03-22",
         "name":"Leonardus Franciscus",
         "surname":"Srnec",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1983-11-28",
         "name":"Leoš",
         "surname":"Crhonek",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"1979-05-12",
         "name":"Radek",
         "surname":"Srnec",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1989-03-26",
         "name":"Kateřina",
         "surname":"Suchá",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1971-03-19",
         "name":"Vítězslav",
         "surname":"Kučera",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1992-02-05",
         "name":"Irena",
         "surname":"Kuzniková",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1976-06-23",
         "name":"Vojtěch",
         "surname":"Poula",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1995-05-14",
         "name":"Zdenka",
         "surname":"Suchá",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1995-05-02",
         "name":"Daniela",
         "surname":"Kašová",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1984-01-19",
         "name":"Šárka",
         "surname":"Kaňoková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1991-05-12",
         "name":"Jarmila",
         "surname":"Vlková",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1980-01-10",
         "name":"Barbora",
         "surname":"Milerová",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1983-08-03",
         "name":"Tomáš",
         "surname":"Rýdl",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"1985-06-06",
         "name":"František",
         "surname":"Diviš",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"2001-12-26",
         "name":"Soňa",
         "surname":"Kostomlatská",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1992-06-26",
         "name":"Lucie",
         "surname":"Veselá",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1978-03-02",
         "name":"Marika",
         "surname":"Kaňoková",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1985-04-07",
         "name":"Jakub",
         "surname":"Janoušek",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1980-01-01",
         "name":"Marcela",
         "surname":"Bartošová",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1995-03-04",
         "name":"Jan",
         "surname":"Havel",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"2001-12-27",
         "name":"Dita",
         "surname":"Hubáčková",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1971-11-11",
         "name":"Dagmar",
         "surname":"Kitzbergerová",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"2000-04-17",
         "name":"Hana",
         "surname":"Jarolímková",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"2000-08-03",
         "name":"Lubomír",
         "surname":"Sedlák",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1972-07-02",
         "name":"Vladimíra",
         "surname":"Filipová",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1975-09-26",
         "name":"Zdenka",
         "surname":"Káčerková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1974-09-08",
         "name":"Natálie",
         "surname":"Ivanochko",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1977-12-20",
         "name":"Olga",
         "surname":"Hubáčková",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1971-07-16",
         "name":"Gabriela",
         "surname":"Gregorová",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1975-05-06",
         "name":"Martin",
         "surname":"Bičiště",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1993-03-16",
         "name":"Gabriela",
         "surname":"Gregárková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1991-06-11",
         "name":"Olga",
         "surname":"Beránková",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1981-09-26",
         "name":"Leonardus Franciscus",
         "surname":"Handl",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1977-10-19",
         "name":"Illya",
         "surname":"Stráňka",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1984-06-05",
         "name":"Marcela",
         "surname":"Štěpánková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"2000-05-18",
         "name":"Hana",
         "surname":"Polívková",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1986-05-27",
         "name":"Petr",
         "surname":"Rýdl",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1974-06-24",
         "name":"Jiří",
         "surname":"Kolečář",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1986-07-09",
         "name":"Martina",
         "surname":"Kolovecká",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"2001-09-11",
         "name":"Roman",
         "surname":"Poula",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"2001-03-17",
         "name":"David",
         "surname":"Kindl",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1975-04-17",
         "name":"Arnošt",
         "surname":"Kos",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1981-02-18",
         "name":"Božena",
         "surname":"Vebrová",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"2000-12-18",
         "name":"Radek",
         "surname":"Handl",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"2002-11-25",
         "name":"Radek",
         "surname":"Hýbl",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"2001-03-14",
         "name":"Arnošt",
         "surname":"Diviš",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1999-01-30",
         "name":"Petr",
         "surname":"Šnajdr",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1989-03-08",
         "name":"Vladislav",
         "surname":"Maděra",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1993-05-09",
         "name":"Barbora",
         "surname":"Bulisová",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1991-11-08",
         "name":"Ivan",
         "surname":"Šnajdr",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1984-05-02",
         "name":"Zuzana",
         "surname":"Marková",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1994-01-06",
         "name":"Patrik",
         "surname":"Maksimov",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"1977-12-29",
         "name":"Bohdan",
         "surname":"Maksimov",
         "workload":30
      },
      {
         "gender":"male",
         "birthdate":"1994-05-25",
         "name":"Leoš",
         "surname":"Havel",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1973-11-02",
         "name":"Ivana",
         "surname":"Veselá",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1986-03-21",
         "name":"Gabriela",
         "surname":"Šimková",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1989-04-22",
         "name":"Václav",
         "surname":"Wiedermann",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1985-05-27",
         "name":"Veronika",
         "surname":"Prchalová",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1981-02-15",
         "name":"Ludmila",
         "surname":"Hubáčková",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1986-04-09",
         "name":"Alice",
         "surname":"Šimáková",
         "workload":10
      },
      {
         "gender":"female",
         "birthdate":"1989-07-18",
         "name":"Anna",
         "surname":"Slaninová",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1990-05-07",
         "name":"František",
         "surname":"Kindl",
         "workload":20
      },
      {
         "gender":"female",
         "birthdate":"1976-05-12",
         "name":"Olga",
         "surname":"Bulisová",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1997-10-11",
         "name":"Ludmila",
         "surname":"Trutnovská",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1982-05-27",
         "name":"Aleš",
         "surname":"Suk",
         "workload":20
      },
      {
         "gender":"male",
         "birthdate":"1993-07-27",
         "name":"Lukáš",
         "surname":"Andrlík",
         "workload":30
      },
      {
         "gender":"female",
         "birthdate":"1977-12-28",
         "name":"Alena",
         "surname":"Káčerková",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"1982-08-03",
         "name":"Daniela",
         "surname":"Hubáčková",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1999-05-23",
         "name":"Zdeněk",
         "surname":"Šindelář",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1976-07-21",
         "name":"Lukáš",
         "surname":"Kučera",
         "workload":10
      },
      {
         "gender":"male",
         "birthdate":"1984-06-01",
         "name":"Bohdan",
         "surname":"Suk",
         "workload":40
      },
      {
         "gender":"female",
         "birthdate":"2001-11-09",
         "name":"Martina",
         "surname":"Milerová",
         "workload":40
      },
      {
         "gender":"male",
         "birthdate":"1988-12-09",
         "name":"Michal",
         "surname":"Kolečář",
         "workload":30
      }
   ];

    const result = await TestHelper.runScript("task5.js", dtoIn, session);
    expect(result.isError).toEqual(false);
  });
});
