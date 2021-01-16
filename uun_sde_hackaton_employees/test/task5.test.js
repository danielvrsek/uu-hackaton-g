const { TestHelper } = require("uu_script_devkitg01");

describe("Task5", () => {
  test("HDS", async () => {
    const session = await TestHelper.login();

    const dtoIn = [];

    const result = await TestHelper.runScript("task5.js", dtoIn, session);
    expect(result.isError).toEqual(false);
  });
});
