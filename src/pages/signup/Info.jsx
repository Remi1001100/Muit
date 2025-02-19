import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import styled from "styled-components";

import DaumPostcode from "react-daum-postcode";
import AddressInput from '../../components/signup/addressInput';
import MuitLogo from "../../components/signup/muitLogo";
import SeePassword from '../../assets/icons/SeePassword.svg';
import SearchRed from "../../assets/icons/SearchRed.svg";
import ConditionCheck from "../../assets/icons/ConditionCheck.svg";
import ConditionX from "../../assets/icons/ConditionX.svg";
import useCustomFetch from '../../hooks/fetchWithAxios';
import useFetch from '../../hooks/useFetch';


const COLOR_MUIT_RED = "#A00000";
const COLOR_SUCCESS_BLUE = "#029DF3";

function Info() {
    const { fetchData } = useCustomFetch();
    const [isShowPWChecked, setIsShowPWChecked] = useState(false);
    const [ageCheck, setAgeCheck] = useState(false);
    const [selectedGender, setSelectedGender] = useState(null);
    const [address, setAddress] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [isVerified, setIsVerified] = useState(false);

    const schema = yup.object().shape({
        name: yup.string().required(),
        id: yup.string()
            .matches(/^[a-zA-Z0-9]+$/, "6~20자 영문, 숫자 입력")
            .min(6, "6~20자 영문, 숫자 입력")
            .max(20, "6~20자 영문, 숫자 입력")
            .required("아이디를 입력해주세요."),
        password: yup.string()
            .min(8, "8~20자 이상 입력")
            .max(20, "8~20자 이상 입력")
            .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "영문, 숫자, 특수문자 포함")
            .required("비밀번호를 입력해주세요."),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password"), null], "동일한 비밀번호 입력")
            .required(),
        email: yup.string()
            .email()
            .required(),
        gender: yup.string().oneOf(["MALE", "FEMALE"]).required(),
        phone: yup.string().required(),
        address: yup.string().required(),
        verificationCode: yup.string(),
    });

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
        mode: "onChange",
        resolver: yupResolver(schema),
    });

    const passwordRef = useRef(null);

    const handleShowPWChecked = async () => {
        setIsShowPWChecked(!isShowPWChecked);
    };

    const sendVerificationCode = async () => {
        try {
            const email = watch('email');
            if (!email) {
                alert('이메일을 입력해주세요.');
                return;
            }
            fetchData('/sendCode', 'POST', { email });
            alert('인증번호가 전송되었습니다.');
            setIsCodeSent(true);
        } catch (error) {
            alert('인증번호 전송에 실패했습니다.');
            console.log(error);
        }
    };
    const verifyCode = async () => {
        try {
            const email = watch('email');
            const [username, domain] = email.split("@");
            const verificationCode = watch('verificationCode');
            const url = `/verify?email=${username}%40${domain}&code=${verificationCode}`
            
            if (!verificationCode) {
                alert('인증번호를 입력해주세요.');
                return;
            }
            const response = await fetchData(url, 'POST', { 
                email, 
                code: String(verificationCode) }
            );
            console.log('response:', response);

            if (response?.isSuccess) {
                alert('이메일 인증이 완료되었습니다.');
                setIsVerified(true);
            } else {
                alert(response?.message);
            }
        } catch (error) {
            console.error("이메일 인증 실패:", error);
            alert('이메일 인증에 실패했습니다.');
        }
    };
      
    const handleAddress = () => {
        setIsOpen(true);
    };
    
    const handleComplete = (data) => {
        let fullAddress = data.address;
        let extraAddress = "";
    
        if (data.addressType === "R") {
          if (data.bname) extraAddress += data.bname;
          if (data.buildingName) extraAddress += extraAddress ? `, ${data.buildingName}` : data.buildingName;
          fullAddress += extraAddress ? ` (${extraAddress})` : "";
        }
    
        setAddress(fullAddress);
        setIsOpen(false); 
      };
    

    const onSubmit = async () => {
        const name = watch('name');
        const username = watch('id');
        const pw = watch('password');
        const pw_check = watch('confirmPassword');
        const email = watch('email');
        const gender = watch('gender');
        const phone = watch('phone');
        const address = watch('address');    
        try {
            const response = await fetchData('/member/register', 'POST', {
                name, username, pw, pw_check, email, gender, phone, address
            });
            console.log("서버 응답:", response);
            if (response?.isSuccess) {
                navigate('/signup/complete');
            } else {
                alert("회원가입 실패: " + response?.message);
            }
        } catch (error) {
            console.error("API 요청 실패:", error);
            alert("회원가입 중 오류 발생: " + error.message);
        }
    };

    const handleGenderSelect = (gender) => {
        setSelectedGender(gender);
        setValue("gender", gender);
        register(gender);
        console.log('선택성별:', gender);
    };

    const navigate = useNavigate();
    const EndSignUp = () => {
        navigate('/signup/complete');
    };
    

    return (
        <Page>
            <MuitLogo />
            <Container>
                <SideMenu>
                    <div> 01 약관 동의 </div>
                    <div className="nowHere"> 02 정보 입력 </div>
                </SideMenu>

                <InfoArea>
                    <h2 className="Title-B-600">회원가입</h2>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <InputArea>
                            <p className="body-B-600">이름</p>
                            <Input>
                                <input placeholder="이름을 입력하세요"
                                {...register("name")} />
                            </Input>
                        </InputArea>

                        {[{ field: 'id', label: '아이디', messages: ["6~20자 영문, 숫자 입력", "이미 사용 중이거나 탈퇴한 아이디입니다."] },
                        { field: 'password', label: '비밀번호', messages: ["8~20자 이상 입력", "영문, 숫자, 특수문자 포함"] },
                        { field: 'confirmPassword', label: '비밀번호 확인', messages: ["동일한 비밀번호 입력"] }
                        ].map(({ field, label, messages }) => (
                            <InputArea key={field}>
                                <p className="body-B-600">{label}</p>
                                <div className='inputError'>
                                    <Input>
                                        <input
                                            placeholder={`${label}를 입력하세요`}
                                            type={
                                                field === 'password' || field === 'confirmPassword' ?
                                                    (isShowPWChecked ? "text" : "password") :
                                                    "text"
                                            }
                                            {...register(field)}
                                        />
                                        {field === 'password' || field === 'confirmPassword' ? <img src={SeePassword} onClick={handleShowPWChecked} /> : null}
                                    </Input>
                                    {watch(field) && messages.map((msg, index) => (
                                        <ValidationMessage key={index} isValid={!errors[field]}>
                                            <ValidationIcon
                                                src={!errors[field] ? ConditionCheck : ConditionX}
                                                alt="Validation Icon"
                                            />
                                            {msg}
                                        </ValidationMessage>
                                    ))}
                                </div>
                            </InputArea>
                        ))}

                        <InputArea>
                            <p className="body-B-600">이메일</p>
                            <Input>
                                <input placeholder="예: muit1234@gmail.com" type={'email'}
                                    {...register("email")} />
                                <button className='passkey-btn'
                                onClick={sendVerificationCode}>인증번호 받기</button>
                            </Input>
                        </InputArea>
                        {isCodeSent && (
                            <InputArea>
                                <p className="body-B-600">인증번호</p>
                                <Input>
                                    <input
                                        placeholder='인증번호 8자리 입력'
                                        type='text'
                                        {...register('verificationCode')}
                                    />
                                    <button className='passkey-btn'
                                    onClick={verifyCode}> 인증번호 확인</button>
                                </Input>
                            </InputArea>
                        )}

                        <InputArea>
                            <p className="body-B-600">성별</p>
                            <GenderSelectBtn>
                                <button
                                    className={`gender-select ${selectedGender === "MALE" ? "selected" : ""}`}
                                    onClick={(e) => { e.preventDefault(); handleGenderSelect("MALE"); }}> 남성</button>
                                <button
                                    className={`gender-select ${selectedGender === "FEMALE" ? "selected" : ""}`}
                                    onClick={(e) => { e.preventDefault(); handleGenderSelect("FEMALE"); }}>여성</button>
                            </GenderSelectBtn>
                        </InputArea>

                        <InputArea>
                            <p className="body-B-600">휴대폰 번호</p>
                            <Input>
                                <input placeholder="숫자를 입력하세요"
                                    {...register("phone")} />
                            </Input>
                        </InputArea>

                        <>
                            <InputArea>
                                <p className="body-B-600">주소</p>
                                <div className="address-search" onClick={handleAddress}>
                                    <img src={SearchRed} alt="주소 검색" /> 주소 검색
                                </div>
                            </InputArea>

                            {isOpen && (
                                <ModalBackground onClick={() => setIsOpen(false)}>
                                    <ModalContent onClick={(e) => e.stopPropagation()}>
                                        <DaumPostcode onComplete={handleComplete} />
                                        <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
                                    </ModalContent>
                                </ModalBackground>
                            )}

                            {address && (
                                <>
                                    <InputArea>
                                        <p className="body-B-600">도로명 주소</p>
                                        <Input>
                                            <input value={address} readOnly placeholder="주소를 선택해주세요."
                                            {...register("address")} />
                                        </Input>
                                    </InputArea>

                                </>
                            )}
                        </>


                        <Check>
                            <div className='ageCheck'>
                                <CheckBox type='checkbox'
                                    id="ageCheck"
                                    checked={ageCheck}
                                    onChange={(e) => setAgeCheck(e.target.checked)} />
                                <div>
                                    <label htmlFor="ageCheck">14세 이상입니다</label>
                                    <p>만 14세 미만 회원은 회원가입이 불가능합니다.</p>
                                </div>
                            </div>
                            <div className='eventCheck'>
                                <CheckBox type='checkbox' id='eventCheck' />
                                <label htmlFor='eventCheck'>SMS, 이메일로 상품 및 이벤트 정보를 받겠습니다. (선택)</label>
                            </div>

                        </Check>

                        <BtnArea>
                            <Button className="previous"
                                onClick={() => navigate(-1)}>이전</Button>
                            <Button className="next"
                                disabled={!ageCheck}
                                type='submit'
                                onClick={onSubmit}>가입하기</Button>
                        </BtnArea>
                    </Form>
                </InfoArea>
            </Container>
        </Page>
    )
}


const Page = styled.div`
    font-family: Pretendard;
    padding: 120px 100px 0 100px;

    display: flex;
    flex-direction: column;
`
const Container = styled.div`
    display: flex;
    gap: 116px;
    padding-top: 80px;
`
const SideMenu = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    div{
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        color: #919191;

        display:flex;
        align-items: center;

        box-sizing: border-box;
        width: 200px;
        height: 40px;
        padding: 8px 20px;
        border-radius: 3px;
        border: 1px solid #E6E6E6;
    }
    .nowHere{
        border: 1px solid #A00000;
        background: #A00000;
        color: #FFF;
    }
`
const InfoArea = styled.div`
  h2{margin:0px}
  .Title-B-600{
    margin-bottom: 10px;
  }
`
const Form = styled.form`
    display: flex;
  flex-direction: column;
  gap: 40px; 
`
const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  p{margin:0px;}
  .body-B-600{
    width: 90px;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
    .address-search{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;

    width: 104px;
    height: 32px;
    border-radius: 3px;

    border: 1px solid var(--Muit-Red-main, #A00000);
    background: var(--Gray-white-bg, #FFF);

    color: var(--Muit-Red-main, #A00000);
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }

  .address-search:hover {
    background: #FFECEC;
  }
  position: relative;
`
const Input = styled.div`
  display: flex;
  justify-content: space-between;

  font-family: Pretendard;

  height: 32px;
  width: 716px;

  border-style:none;
  border-bottom:solid 1px #E6E6E6;
  outline: none;

  input{
    border: none;
    flex: 1;

    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
  }
  input::placeholder{
    color: #919191;
    /* Body-tiny-md */
    font-family: "Pretendard Variable";
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  input:focus{
    outline : none;
  }

  .passkey-btn{
    margin-bottom: 4px;
    height: 28px;    
    display: flex;
    padding: 4px 12px;
    align-items: center;
    border-radius: 2px; 
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-white-bg, #FFF);

    color: #919191;
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;

  }
`
const ValidationMessage = styled.p`
    color: ${({ isValid }) => (isValid ? COLOR_SUCCESS_BLUE : "#FF1E00")};
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
`
const ValidationIcon = styled.img`
    width: 24px;
    height: 24px;
`
const GenderSelectBtn = styled.div`
    display: flex;
    gap: 20px;

    .gender-select{
        display: flex;
        width: 72px;
        height: 28px;
        padding: 4px 12px;
        align-items: center;
        justify-content: center;

        border-radius: 2px;
        border: 1px solid var(--Gray-sub, #919191);
        background: var(--Gray-white-bg, #FFF);

        color: #000;
        font-family: "Pretendard Variable";
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
    }

    .gender-select.selected{
        color: var(--Muit-Red-main, #A00000);
        border: 1px solid var(--Muit-Red-main, #A00000);
    }
`
const Check = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  label{
    color: var(--Gray-maintext, #000);
    /* Body-me */
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
  }
  p{
    margin: 0px;
    color: var(--Gray-sub, #919191);
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    margin-top: 8px;
  }
  .ageCheck{
    display: flex;
  }
  .eventCheck{
    display: flex;
  }
`
const CheckBox = styled.input`
    appearance: none;

    box-sizing: border-box;
    width: 20px;
    height: 20px;
    margin-right: 8px;

    border-radius: 3px;
    border: 1px solid #898989;

    &:checked{
        background: ${COLOR_MUIT_RED};
        border: none;
    }
`
const BtnArea = styled.div`
    display: flex;
    gap: 20px;
    margin: 64px 0 64px 0;
    .previous{
        border: 1px solid  #E6E6E6;
        background:#FFF;
        
        color: #000;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    .next{
        border: 1px solid  #A00000;
        background:  #A00000;
        
        color: #FFF;
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
    }
    .next:disabled {
        border: 1px solid  #919191;
        background:  #919191;
        color: #FFF;
        cursor: not-allowed;
    }
`
const Button = styled.button`
    box-sizing: border-box;
    font-family: Pretendard;
    display: flex;
    width: 400px;
    height: 40px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
`
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`
const CloseButton = styled.button`
  margin-top: 10px;
  padding: 5px 10px;
  font-size: 14px;
  background: #A00000;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
`
export default Info;