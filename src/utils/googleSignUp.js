const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;
const googleRedirectUri = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

export default function googleLogin() {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}&response_type=code&scope=email profile`;
    
    const loginWindow = window.open(url, "Connect Google Account", "width=700,height=600");

    if (!loginWindow) {
        alert("팝업이 차단되었습니다. 브라우저 팝업 설정을 확인해주세요.");
    }
};