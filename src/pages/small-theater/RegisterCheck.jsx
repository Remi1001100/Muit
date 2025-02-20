import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate,useLocation  } from 'react-router-dom'; 
// const token = import.meta.env.VITE_APP_ACCESS_TOKEN; 
const token = localStorage.getItem("accessToken");
import axios from "axios";


const RegisterCheck = () => {
  const [password, setPassword] = useState("");
  const [isPasswordEntered, setIsPasswordEntered] = useState(false);
  const [message, setMessage] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 추가
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [isLoading, setIsLoading] = useState(false);
  

  // RegisterMusical에서 전달한 데이터 받기

  const {
    formData,
    posterImage,
    castingImages,
    castings,
    noticeImages,
  } = location.state || {};
  
  useEffect(() => {
    // RegisterMusical에서 전달한 데이터를 콘솔에 출력
    console.log('RegisterMusical에서 전달된 데이터:', location.state);
  }, [location]);

  const handleRegister = async () => {
    setIsLoading(true);
  
    const dataToSend = new FormData();
  
    const payload = {
      name: formData.name || "",
      place: formData.place || "",
      schedule: formData.schedule || "",
      age: formData.age || "",
      starring: formData.starring || "",
      totalTicket: String(formData.totalTicket) || "0",
      timeInfo: formData.timeInfo || "",
      account: formData.account || "",
      contact: formData.contact || "",
      hashtag: formData.hashtag || "",
      runtime: formData.runtime || "",
      castings: castings
        ? castings.map((casting) => ({
            actorName: casting.name || "",
            castingName: casting.role || "",
          }))
        : [],
      noticeContent: formData.noticeContent || "",
      tickets: formData.tickets
        ? formData.tickets.map((ticket) => ({
            ticketName: ticket.ticketName || "",
            price: String(ticket.price) || "",
          }))
        : [],
      staff: formData.staff
        ? formData.staff.map((staff) => ({
            position: staff.position || "",
            name: staff.name || "",
          }))
        : [],
      summaryContent: formData.summaryContent || "",
    };
  
    // FormData에 payload의 각 필드를 추가
    dataToSend.append("data", JSON.stringify(payload));
    if (posterImage) {
      dataToSend.append("posterImage", posterImage);
    }
  
    if (castingImages && castingImages.length > 0) {
      castingImages.forEach((image) => {
        dataToSend.append("castingImages", image);
      });
    }
  
    if (noticeImages && noticeImages.length > 0) {
      noticeImages.forEach((image) => {
        dataToSend.append("noticeImages", image);
      });
    }
  
    const url = `${import.meta.env.VITE_APP_SERVER_URL}/amateurs/enroll`;
  
    try {
      const response = await axios.post(url, dataToSend, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("등록 성공:", response.data);
      setMessage("🎉 공연이 성공적으로 등록되었습니다!");
      setIsRegistered(true);
    } catch (error) {
      console.error("서버 오류:", error);
      setMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordEntered(e.target.value.trim() !== "");
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked); // 체크박스 상태 변경
  };


  const handleCancel = () => {
    navigate("/register-musical"); // "register-musical" 페이지로 돌아가기
  };

  return (
    <Container>
      <Card>
        <CardContent>
          {isRegistered ? (
            <Message>{message}</Message>
          ) : (
            <>
              <Title>소극장 연극 등록</Title>
              <Text>공연을 등록하기 위해서는 사용중인 비밀번호를 입력하세요</Text>
              <InputWrapper>
                <Label htmlFor="password">비밀번호</Label>
                <StyledInput
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="   비밀번호를 입력하세요"
                />
              </InputWrapper>
              <Text>참고사항에 대해 동의하십니까?</Text>
              <CheckboxWrapper>
                <Checkbox
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <Label>동의합니다</Label>
              </CheckboxWrapper>
              <StyledButton
                onClick={handleRegister}
                disabled={!isPasswordEntered || !isChecked}
              >
                등록하기
              </StyledButton>
              <CancelButton onClick={handleCancel}>취소</CancelButton> {/* 취소 버튼 추가 */}
            </>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default RegisterCheck;

// 스타일링

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
  max-width: 1440px;
  height: 864px;
  margin-top:-60px;
`;

const Card = styled.div`
  width: 24rem;
  padding: 2rem;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  margin-bottom: 8px;
  text-align: left;
  color: #000;

  font-family: Pretendard;
  font-size: 24px;
  font-weight: 700;
  line-height: normal;
`;

const Text = styled.div`
  color: #000;

  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin-bottom: 38px;
  display: flex;
  align-items: center;
  gap: 48px;
  margin-top: 55px;
`;

const Label = styled.label`
  display: inline-block;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;
  width: 100px;
`;

const StyledInput = styled.input`
  width: 400px;
  height: 40px;
  color: var(--Gray-sub, #919191);
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, #E6E6E6);
  background: #FFF;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: 25px;

  &:focus {
    border-color: rgb(0, 0, 0);
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 16px;
  gap: 6px;
  color: var(--Gray-maintext, #000);

  font-family: Pretendard;
  font-size: 10px;
  font-weight: 500;
  line-height: 18px;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 40px;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid #919191;
  background:${(props) => (props.disabled ? '#919191' : '#A00000')};
  color: #FFF;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 700;
  line-height: normal;

  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) => (!props.disabled ? '#A00000' : '#d1d5db')};
  }
`;
const CancelButton = styled.button`
  display: flex;
  width: 400px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 1px solid #e6e6e6;
  background-color: #FFF;
  color: #000;
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  margin-top: 12px;
  cursor: pointer;
  
  &:hover {
    background-color: #dcdcdc;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
const Message = styled.p`
color: #A00000;
text-align: center;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

