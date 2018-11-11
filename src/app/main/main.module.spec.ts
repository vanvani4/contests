import { MainModule } from './main.module';

describe('HeaderModule', () => {
  let mainModule: MainModule;

  beforeEach(() => {
    mainModule = new MainModule();
  });

  it('should create an instance', () => {
    expect(mainModule).toBeTruthy();
  });
});
