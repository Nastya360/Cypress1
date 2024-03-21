describe("template spec", () => {

  beforeEach(() => {
    cy.visit("/");
  });

  it("Should successfully login", () => {
    cy.login('bropet@mail.ru','123');
    cy.contains("Добро пожаловать bropet@mail.ru").should("be.visible");
    cy.logOut();
  });

  it("Should't successfully login without a mail ", () => {
    cy.contains('Log in').click();
    cy.get('#mail').clear();
    cy.get('#pass').type('123');
    cy.contains('Submit');
    cy.get("#mail").then(
      (elements) => expect(elements[0].checkValidity()).to.be.false
    );
  
  });

  it("Should't successfully login without a password", () => {
    cy.contains('Log in').click();
    cy.get('#mail').type("bropet@mail.ru");
    cy.get('#pass').clear();
    cy.get("#pass").then(
      (elements) => expect(elements[0].checkValidity()).to.be.false
    )
  });

  it("Should add to favorite",()=>{
    cy.login('bropet@mail.ru','123');
    cy.addBook("Властелин Колец","Роман-эпопея английского писателя Дж.Р.Р.Толкина");
    cy.addToFavorite();
    cy.contains("Delete from favorite").should("be.visible");
    cy.logOut();
  });

  it("Should delete to favorite",()=>{
    cy.login('bropet@mail.ru','123');
    cy.contains("Delete from favorite").should("be.visible");
    cy.contains("Delete from favorite").click();
    cy.contains("Add to favorite").should("be.visible");
    cy.logOut();
  })
  
  it.only("Selected books should appear in 'Favorite'",()=>{
    cy.login('bropet@mail.ru','123');
    cy.addToFavorite();
    cy.contains("Favorites").click();
    cy.contains("Delete from favorite").should("be.visible");
    cy.logOut();
  })
});
