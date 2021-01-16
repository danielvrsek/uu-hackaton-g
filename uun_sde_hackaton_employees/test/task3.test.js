const { TestHelper } = require("uu_script_devkitg01");

describe("Task3", () => {
  test("HDS", async () => {
    const session = await TestHelper.login();

    const dtoIn = [];

    const result = await TestHelper.runScript("task3.js", dtoIn, session);
    expect(result.isError).toEqual(false);
  });
});
