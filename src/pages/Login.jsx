import styled from "styled-components";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCustomFetch from "../hooks/fetchWithAxios";
import { useForm } from "react-hook-form";
import axios from "axios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import googleLogin from "../utils/googleSignUp";

import MuitElement from "../assets/logos/MuitElement.png";
import Google from "../assets/logos/google.png";
import Kakao from "../assets/logos/kakao.png";
import Naver from "../assets/logos/naver.png";
import SeePassword from "../assets/icons/SeePassword.svg";
import { useEffect, useRef, useState } from "react";

const muit_server = import.meta.env.VITE_APP_SERVER_URL;


const COLOR_MUIT_RED = "#A00000";

function Login() {
    const { fetchData } = useCustomFetch();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        id: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
    });

    const navigateToSignUp = () => {
        navigate("/signup");
    };

    const [isShowPWChecked, setIsShowPWChecked] = useState(false);
    const passwordRef = useRef(null);

    const handleShowPWChecked = () => {
        if (!passwordRef.current) return;

        setIsShowPWChecked((prev) => !prev);
        passwordRef.current.type = isShowPWChecked ? "password" : "text";
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const onSubmit = async () => {
        try {
            const email = watch('email');
            const pw = watch('password');
            const response = await axios.post(`${muit_server}/member/email/login`, { email, pw });
            console.log(email, pw);
            console.log("응답:", response);

            localStorage.setItem("accessToken", response?.data?.result?.accessToken);
            localStorage.setItem("refreshToken", response?.data?.result?.refreshToken);
            localStorage.setItem("userName", response?.data?.result?.username);
            localStorage.setItem("userId", response?.data?.result?.id);
            navigate("/", {});
        } catch (error) {
            console.error("로그인 실패:", error);
            alert("로그인에 실패했습니다.");
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authCode = urlParams.get("code");
    
        if (authCode) {
            fetchData("/login/oauth2/code/google", "POST", { code: authCode })
                .then((response) => {
                    if (response?.result) {
                        console.log("구글 로그인 성공:", response);
                        localStorage.setItem("accessToken", response.result.accessToken);
                        localStorage.setItem("refreshToken", response.result.refreshToken);
                        navigate("/");
                    }
                })
                .catch((error) => console.error("구글 로그인 실패:", error));
        }
    }, [fetchData, navigate]);



    return (
        <Container>
            <img src={MuitElement} className="MuitElement" alt="Muit Logo" />
            <LogoLink>MUIT</LogoLink>

            <LoginForm onSubmit={handleSubmit(onSubmit)}>
                <Input>
                    <input
                        type="text"
                        placeholder="이메일"
                        {...register("email")}
                    />
                </Input>
                <Input>
                    <input
                        type="password"
                        ref={passwordRef}
                        placeholder="비밀번호"
                        {...register("password")}
                    />
                    <img src={SeePassword} onClick={handleShowPWChecked} alt="비밀번호 보기" />
                </Input>

                <OptionArea>
                    <div className="keepLogin">
                        <input type="checkbox" className="LoginCheck" id="LoginCheck" />
                        <label htmlFor="LoginCheck">로그인 상태 유지</label>
                    </div>
                    <FindInfo>
                        <span>아이디 찾기</span>
                        <span> | </span>
                        <span>비밀번호 찾기</span>
                    </FindInfo>
                </OptionArea>

                <BtnArea>
                    <LoginBtn type="submit" onClick={onSubmit}>로그인</LoginBtn>
                    <SignUpBtn type="button" onClick={navigateToSignUp}>
                        회원가입
                    </SignUpBtn>
                </BtnArea>
            </LoginForm>

            <SocialLogin>
                <SocialIcon src={Kakao} />
                <SocialIcon src={Naver} />
                <SocialIcon src={Google} border="#E6E6E6" onClick={() => googleLogin()} />
            </SocialLogin>
        </Container>
    );
}


const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    font-family: Pretendard;

    padding: 100px 100px 0px 100px;

    .MuitElement{
        width: 90px;
        margin-bottom: 32px;
    }
`
const LogoLink = styled.div`
  font-family:  "BelgianoSerif";
  font-size: 80px;
  font-weight: 400;

  margin-bottom: 60px;

  text-decoration: none;
  color: ${COLOR_MUIT_RED};
`
const LoginForm = styled.form`
    margin-bottom: 20px;    
`
const Input = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 500px;
    height: 60px;

    border: 1px solid #C1C1C1;
    border-radius: 3px;
    background: #FFF;

    padding: 8px 20px 8px 20px;

    input::placeholder{
        color: #919191; 
    }
    input{
        border: none;
        flex: 1;

        font-family: Pretendard;
        font-size: 16px;
        font-weight: 500;
    }
    input:focus{
        outline : none;
    }
`
const OptionArea = styled.div`
    margin-top: 16px;
    width: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #989898;
    font-size: 14px;
    font-weight: 500;

    .keepLogin{
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .LoginCheck{
        appearance: none;
        width: 20px;
        height: 20px;

        border-radius: 3px;
        border: 1px solid #898989;
    }
    .LoginCheck:checked{
        background: ${COLOR_MUIT_RED};
        border: none;
    }
`
const FindInfo = styled.div`

`
const BtnArea = styled.div`
    margin-top: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
`
const LoginBtn = styled.button`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    border-radius: 3px;

    border: 1px solid #A00000;
    background: ${COLOR_MUIT_RED};

    color: #FFF;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    cursor:pointer;
`
const SignUpBtn = styled.button`
    box-sizing: border-box;
    width: 400px;
    height: 40px;
    border-radius: 3px;

    border: 1px solid #E6E6E6;
    background: #FFF;

    color: #000;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 700;
    cursor:pointer;
`
const SocialLogin = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    gap: 60px;    
`
const SocialIcon = styled.button`
    box-sizing: border-box;
    height: 40px;
    width: 40px;
    border: 1px solid ${(props) => props.border || '#00000000'};
    border-radius: 50%;
    cursor: pointer;
    background: url('${(props) => props.src}');

    background-size: cover;
    cursor:pointer;
`
export default Login;