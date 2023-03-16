import KakaoLogin from './KakaoLogin';
import NaverLogin from './NaverLogin';

export type SocialLoginProviders = 'kakao' | 'naver';

interface User {
  id: number | string;
}

export enum LoginErrors {
  // naver, kakao 이외의 다른 provider가 넘어왔을 경우 발생하는 에러
  LoginProviderError,
}

export interface SocialLoginResponse {
  providerId: string;
  provider: string;
  user?: User;
  scopes?: string[];
  email?: string | null;
}

class SocialLoginService {
  private readonly provider: SocialLoginProviders;

  constructor({ provider }: { provider: SocialLoginProviders }) {
    this.provider = provider;
  }

  async login(): Promise<LoginErrors | SocialLoginResponse> {
    const provider = this.provider;
    switch (provider) {
      case 'kakao': {
        const kakaoLogin = new KakaoLogin();
        try{
          const response = await kakaoLogin.login();
          const {provider_id, profile: {user :{id,email}, scopes}} = response
  
          const result: SocialLoginResponse = {
            providerId: provider_id,
            provider: this.provider,
            user: { id: id },
            scopes: scopes,
            email: email,
          };
          return result;
        } catch(error){
          return LoginErrors.LoginProviderError;
        }
       
      }
      case 'naver': {
        const naverLogin = new NaverLogin();
        
        try {
          const response = await naverLogin.login();
          const {provider: {id}, profile: {user_name, scopes,email}} = response
          const result: SocialLoginResponse = {
            providerId: id,
            provider: this.provider,
            user: { id: user_name },
            scopes: scopes,
            email: email,
          };
          return result;
        
        } catch(error){
          return LoginErrors.LoginProviderError;
        }
        
      } 
      default:
        return LoginErrors.LoginProviderError;
    }
  }
}

export default SocialLoginService;
