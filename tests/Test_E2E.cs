using System;
using NUnit.Framework;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;


namespace tests
{
    class Test_E2E
    {
        private IWebDriver _driver;
        [SetUp]
        public void SetupDriver()
        {
            _driver = new ChromeDriver("C:\\Users\\julie\\Downloads");
        }

        [TearDown]
        public void CloseBrowser()
        {
            _driver.Close();
        }

        [Test]
        public void UsersCanViewStoryDetails()
        {
            _driver.Url = "http://localhost:4200/stories";

            var wait = new OpenQA.Selenium.Support.UI.WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement detailsLink = wait.Until(drv => drv.FindElement(By.XPath("//ion-icon[@name='chevron-forward-outline']")));
            detailsLink.Click();

            IWebElement title = wait.Until(drv => drv.FindElement(By.XPath("//app-view-story")));
            Assert.Pass();
        }

        [Test]
        public void UsersCanAddStoryComments()
        {
            _driver.Url = "http://localhost:4200/stories";

            var wait = new OpenQA.Selenium.Support.UI.WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement detailsLink = wait.Until(drv => drv.FindElement(By.XPath("//ion-icon[@name='chevron-forward-outline']")));
            detailsLink.Click();

            IWebElement comment = wait.Until(drv => drv.FindElement(By.CssSelector("#newComment")));
            comment.Click();
            comment.SendKeys("A new comment");
            IWebElement button = wait.Until(drv => drv.FindElement(By.CssSelector("#newCommentSave")));
            button.Click();

            Assert.Pass();
        }

        [Test]
        public void LoggedInUserCanEditStory()
        {
            _driver.Url = "http://localhost:4200/login";

            var wait = new OpenQA.Selenium.Support.UI.WebDriverWait(_driver, TimeSpan.FromSeconds(10));
            IWebElement name = wait.Until(drv => drv.FindElement(By.XPath("//input[@name='email']")));
            IWebElement password = wait.Until(drv => drv.FindElement(By.XPath("//input[@name='password']")));
            name.Click();
            name.SendKeys("user@example.com");
            password.Click();
            password.SendKeys("user@example.comA1");
            IWebElement button = wait.Until(drv => drv.FindElement(By.CssSelector(".login")));
            button.Click();

            IWebElement detailsLink = wait.Until(drv => drv.FindElement(By.XPath("//ion-icon[@name='pencil']")));
            detailsLink.Click();

            Assert.Pass();
        }
    }
}
