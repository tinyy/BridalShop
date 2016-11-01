import { BridalShopPage } from './app.po';

describe('bridal-shop App', function() {
  let page: BridalShopPage;

  beforeEach(() => {
    page = new BridalShopPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
