import MainPage from '../../app/pages/main-page';

describe('Class MainPage: drawMainPage function', () => {
  document.body.innerHTML = '';
  document.body.append(new MainPage().drawMainPage());
  const mainPage = document.querySelector('.main-page');
  const pages = document.querySelectorAll('.main-page__page');
  const noteForCatalog = document.querySelector('.main-page__pagen-note');

  it('should create mainPage', () => {
    expect(mainPage).not.toBeNull();
  });

  it('should contain all pages from pages array', () => {
    expect(pages).toHaveLength(9);
  });

  it('should create note for catalog item', () => {
    expect(noteForCatalog).not.toBeNull();
    expect(noteForCatalog?.innerHTML).toEqual('note: you can choose the category you need in burger menu');
  });
});
