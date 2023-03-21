import exp from 'constants';
import SocialLoginService, {LoginErrors} from '../src/services/SocialLoginService';
import { render, screen, userEvent } from './test-utils';

describe('SocialLoginService', () => {
  it('should login through kakao', async () => {
    const service = new SocialLoginService({provider:"kakao"})
    const result = await service.login();
    const mockResponse = {"providerId":"be35f10d-1214-46af-af06-916429eaf77d","provider":"kakao","user":{"id":"be35f10d-1214-46af-af06-916429eaf77d"},"scopes":["email","name"],"email":"test@example.com"}
    expect(result).toEqual(mockResponse);
  
  });
  it('should login through naver',() => {
    const service = new SocialLoginService({provider:"naver"})
    const mockResponse = {"providerId":"be35f10d-1214-46af-af06-916429eaf77d","provider":"naver","user":{"id":"test"},"scopes":["email","name"],"email":"test@example.com"}
    service.login().then(result =>  expect(result).toEqual(mockResponse) )
  });
  it('should alert an error message if the login provider is invalid',async () => {
    const service = new SocialLoginService({provider: "google"})
    const result = await service.login()
    expect(result).toEqual(LoginErrors.LoginProviderError)
  })
});
