import { Viwitester2Page } from './app.po';

describe('viwitester2 App', function() {
  let page: Viwitester2Page;

  beforeEach(() => {
    page = new Viwitester2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
