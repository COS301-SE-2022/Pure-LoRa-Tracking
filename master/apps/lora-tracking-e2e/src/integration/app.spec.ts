import { getGreeting } from '../support/app.po';


describe("ReservePage",()=>{
    // beforeEach(()=>{
    //     cy.visit("/");
    //     cy.contains("Login");
    //     cy.get("input[formcontrolname='password']").type("reserve")
    //     cy.get("input[formcontrolname='email']").type("reserveadmin@reserve.com")
    //     cy.get(".loginbutton").click();
    // })
    it("Should be able to access the page and see the first reserve",()=>{
        cy.visit("/");
        cy.contains("Login");
        cy.get("input[formcontrolname='password']").type("reserve")
        cy.get("input[formcontrolname='email']").type("reserveadmin@reserve.com")
        cy.get(".loginbutton").click();
        cy.contains("tuks");
    })
    
    it("Should be able to see the list of reserves",()=>{
        cy.get(".reserveselection").click();
        cy.contains("Rietvlei");
    });

    it("User should be able to change reserves",()=>{
        cy.contains("Rietvlei").click();
        cy.contains("Rietvlei");
        cy.contains("tuks").should("not.exist");
    })

    it("User should be able to see the list of sensors",()=>{
        cy.contains("22-22");
    })

    it("Manage page is accessible",()=>{
        cy.get(".managebtn").click();
        cy.contains("Role");
    })

    it("Should be able to access the users page ",()=>{
        cy.get(".usersbtn").click();
    })
})