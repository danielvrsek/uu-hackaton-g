const { TestHelper } = require("uu_script_devkitg01");

describe("Task1", () => {
  test("HDS", async () => {
    const session = await TestHelper.login();

    const dtoIn = {
      "count": 100,
      "age": {
        "min": 18,
        "max": 50
      }
    };

    const result = await TestHelper.runScript("task1.js", dtoIn, session);
    expect(result.isError).toEqual(false);
  });
});
