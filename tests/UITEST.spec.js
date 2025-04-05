const { test } = require('@playwright/test');
import { defineConfig, expect } from '@playwright/test';


test('First PlayWright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.saucedemo.com/');

    console.log(await page.title());
    await page.locator('input#user-name').fill('standard_user');
    await page.waitForTimeout(4000);
    await page.locator("[type='password']").fill('secret_sauce');
    await page.waitForTimeout(4000);
    await page.locator('input#login-button').click();
    await page.waitForTimeout(4000);
});

test('Second PlayWright test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const dlink = page.locator("[href*='documents-request']");
    //const dlink= page.locator("//a[@class='blinkingText']");
    // await page.locator('#username').fill('rahulshetty');
    // await page.locator("[type='password']").fill('learning');
    // await page.locator('#signInBtn').click();
    // console.log(await page.locator("[style*='block']").textContent());
    // await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");
    // await page.locator('#username').fill('');
    // await page.waitForTimeout(4000);
    // await page.locator('#username').fill('rahulshettyacademy');
    // await page.locator('#signInBtn').click();
    await page.waitForTimeout(4000);
    // console.log(await page.locator('//a[text()="iphone X"]').textContent());
    // console.log(await page.locator('.card-body a').first().textContent());
    // console.log(await page.locator('.card-body>h4>a').first().textContent());
    // console.log(await page.locator('.card-body a').nth(1).textContent());
    // console.log(await page.locator('.card-body a').allTextContents());
    await expect(dlink).toHaveAttribute('class', 'blinkingText')


});

test('Third PlayWright test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/client');
    await page.waitForTimeout(4000);
    await page.locator('.text-reset').click();
    await page.waitForTimeout(4000);
    const email = page.locator('//input[@id="userEmail"]');
    const passWord = page.locator("//input[@id='userPassword']");
    // await page.locator('//input[@id="firstName"]').fill('rahul');
    // await page.locator("//input[@id='lastName']").fill('shetty');
    await page.locator('//input[@id="userEmail"]').fill('mok@13233gmail.com');
    // await page.locator("//input[@id='userMobile']").fill('1234567890');
    // await page.locator('//label[text()="Occupation"]/following::select').click();
    //await page.waitForSelector('//label[text()="Occupation"]/following::select/child::option[4]',{ state:'visible'});
    // await page.locator('//label[text()="Occupation"]/following::select/child::option[4]').hover();
    await page.selectOption('//label[text()="Occupation"]/following::select', '3: Engineer');
    // await page.waitForTimeout(4000);
    // await page.waitForSelector('//label[text()="Occupation"]/following::select/child::option[4]',{ state:'visible'});
    // await page.locator('//label[text()="Occupation"]/following::select/child::option[4]').waitFor({state:'visible'});
    // await page.locator("//input[@value='Male']").click();
    // console.log(await page.locator("//input[@value='Male']").isChecked());
    // expect(page.locator("//input[@value='Male']")).toBeChecked();
    // await page.waitForTimeout(4000);
    await page.locator("//input[@id='userPassword']").fill('Ranjan5060!');
    // await page.locator("//input[@id='confirmPassword']").fill('Ranjan5060!');
    // await page.waitForTimeout(4000);
    // await page.locator("//input[@type='checkbox']").click();
    // await page.waitForTimeout(4000);
    // await page.locator("//input[@type='checkbox']").uncheck();
    // expect (await page.locator("//input[@type='checkbox']").isChecked()).toBeFalsy();
    // await page.locator("//input[@id='login']").click();
    await page.waitForTimeout(7000);


    // await expect(page).toHaveTitle("Complicated Page - Ultimate QA")
});

test('Handling child windows in PlayWright test', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const dlink = page.locator("//a[@class='blinkingText']");
    await expect(dlink).toHaveAttribute('class', 'blinkingText');
    // // one method or way
    // await dlink.click();
    // const page2=await context.waitForEvent('page');
    // const textcont=await page2.locator('//p[@class="im-para red"]').textContent();
    // console.log(textcont);
    // // other way
    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        dlink.click(),
    ]);
    console.log(newPage)
    const textcont = await newPage.locator('//p[@class="im-para red"]').textContent();
    console.log(textcont);
    const text = textcont.split("@");
    const txtvalue = text[1].split(" ")[0];
    console.log(txtvalue);
    //await page.waitForTimeout(4000);
    // await page.waitForTimeout(4000);
    // await newPage.close();
    await page.locator('#username').fill(txtvalue);
    await page.waitForTimeout(4000);
    console.log(await page.locator('//input[@id="username"]').textContent());
    console.log(await dlink.textContent());
});

test('Add To Cart', async ({ page }) => {
    const email = "anshika@gmail.com";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("[routerlink*='cart']").click();
    //await page.pause();

    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();

    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");


    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});

test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
 
});

test("Calendar validations",async({page})=>
    {
     
        const monthNumber = "6";
        const date = "15";
        const year = "2027";
        const expectedList = [monthNumber,date,year];
        await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
        await page.locator(".react-date-picker__inputGroup").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.locator(".react-calendar__navigation__label").click();
        await page.getByText(year).click();
        await page.locator(".react-calendar__year-view__months__month").nth(Number(monthNumber)-1).click();
        await page.locator("//abbr[text()='"+date+"']").click();
        const inputs = await page.locator(".react-date-picker__inputGroup input");
        for (let index = 0; index <inputs.length; index++)
        {
            const value =inputs[index].getAttribute("value");
            expect(value).toEqual(expectedList[index]);
        }
     
    });



test("Alerts pop handling", async({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('#hide-textbox').click();
    await expect(page.locator('#displayed-text')).toBeHidden();
    // await page.pause();
    page.on('dialog',dialog=>dialog.accept());
    // await page.waitForTimeout(4000);
    await page.locator('#confirmbtn').click();
    await page.locator('#mousehover').hover();


});


 



