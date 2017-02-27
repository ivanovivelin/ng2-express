import { Angular2ExpressPage } from './app.po';

describe('angular2-express App', function() {
  let page: Angular2ExpressPage;

  beforeEach(() => {
    page = new Angular2ExpressPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
