import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function GoogleRedirect() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    console.log('useEffect실행확인');
    if (code && window.opener) {
      console.log("GoogleRedirect 받은 코드:", code);
      window.opener.postMessage({ type: "GOOGLE_AUTH_CODE", code }, window.location.origin);
      setTimeout(() => window.close(), 100);
    }
  }, [code]);

  return <div>로그인 처리 중...</div>;
}

export default GoogleRedirect;