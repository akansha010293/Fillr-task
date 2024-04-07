const assert = require("assert");

describe("extractFields", () => {
  it("should return an empty array if no form controls are found", () => {
    // Arrange
    document.body.innerHTML = "";

    // Act
    const result = extractFields();

    // Assert
    assert.deepStrictEqual(result, []);
  });

  it("should extract fields with name and label from form controls", () => {
    // Arrange
    document.body.innerHTML = `
      <form>
        <input type="text" name="firstName" />
        <label for="firstName">First Name</label>
        <input type="text" name="lastName" />
        <label for="lastName">Last Name</label>
        <select name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label for="gender">Gender</label>
        <textarea name="message"></textarea>
        <label for="message">Message</label>
      </form>
    `;

    // Act
    const result = extractFields();

    // Assert
    assert.deepStrictEqual(result, [
      { name: "firstName", label: "First Name" },
      { name: "lastName", label: "Last Name" },
      { name: "gender", label: "Gender" },
      { name: "message", label: "Message" },
    ]);
  });

  it("should handle form controls without labels", () => {
    // Arrange
    document.body.innerHTML = `
      <form>
        <input type="text" name="firstName" />
        <input type="text" name="lastName" />
        <select name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <textarea name="message"></textarea>
      </form>
    `;

    // Act
    const result = extractFields();

    // Assert
    assert.deepStrictEqual(result, [
      { name: "firstName", label: "" },
      { name: "lastName", label: "" },
      { name: "gender", label: "" },
      { name: "message", label: "" },
    ]);
  });
});
