import { users } from "../data/users";

class LoginPage {
  constructor(page) {
    this.page = page;
    this.baseURL = process.env.BASE_URL;

    //locators
    this.usernameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("Password");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async open() {
    await this.page.goto(this.baseURL);
  }

  async login() {
    const { username, password } = users.standardUser;
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

export { LoginPage };
