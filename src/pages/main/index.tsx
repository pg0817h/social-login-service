import SocialLoginService, {
  LoginErrors,
  SocialLoginProviders,
  SocialLoginResponse,
} from '@/services/SocialLoginService';

function isSocialLoginResponse(resp: Awaited<ReturnType<SocialLoginService['login']>>): resp is SocialLoginResponse {
  return !!(resp as SocialLoginResponse).providerId;
}

const Main = () => {
  const onClick = async (provider: SocialLoginProviders) => {
    const service = new SocialLoginService({ provider });
    const resp = await service.login();

    if (isSocialLoginResponse(resp)) {
      alert(resp);
    } else {
      alert('error');
    }
  };

  return (
    <>
      <button onClick={() => onClick('kakao')}>카카오 로그인</button>
      <button onClick={() => onClick('naver')}>네이버 로그인</button>
    </>
  );
};

export default Main;
