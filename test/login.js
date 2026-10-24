const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("Open Sauce Demo", function () {
this.timeout(30000);
   
    it("Should login and display shopping cart", async function () {
        let options = new chrome.Options();

        options.addArguments("--disable-features=PasswordLeakDetection");

        options.setUserPreferences({
            "credentials_enable_service": false,
            "profile.password_manager_enabled": false,
            "profile.password_manager_leak_detection": false
        });

        let driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();

        await driver.get("https://belajar-bareng.onrender.com/");

          await driver.findElement(By.xpath("//input[@data-testid='username-input']")).sendKeys('admin');
         await driver.findElement(By.xpath("//input[@data-testid='password-input']")).sendKeys('admin');

        let loginButton = await driver.findElement(By.xpath("//button[@data-testid='login-button']"));
      await loginButton.click();

     let addButton = await driver.wait(
                until.elementLocated(By.xpath("//button[contains(text(), 'Add')]")), 
                10000
            );
            await addButton.click();

            await driver.wait(until.urlContains("/add"), 10000);
    let currentUrl = await driver.getCurrentUrl();
    assert.strictEqual(currentUrl, "https://belajar-bareng.onrender.com/add");

    let headerElement = await driver.wait(
      until.elementLocated(By.xpath("//*[contains(text(), 'Add Users')]")),
      5000
    );
    let headerText = await headerElement.getText();
    assert.strictEqual(headerText.trim(), "Add Users");

    })
})
