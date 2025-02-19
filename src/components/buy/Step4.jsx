import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from 'react-router-dom';


// const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");

const Step4 = () => {
  const navigate = useNavigate();
  const { amateurId } = useParams();
  const [accountName, setAccountName] = useState("");
  const [quantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isButtonActive = accountName.trim().length > 0;

  const handleSubmit = async () => {
    if (!isButtonActive || isSubmitting) return;

    setIsSubmitting(true);

    const url = `${import.meta.env.VITE_APP_SERVER_URL}/tickets/purchase/${amateurId}`;
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          accountName,
          quantity: 1,
        }),
      });
  

      const responseData = await response.json();

      if (response.ok && responseData.isSuccess) {
        alert("결제가 성공적으로 완료되었습니다.");
        navigate(`../step5`);
      } else {
        alert(responseData.message || "결제 처리 중 문제가 발생했습니다.");
      }
    } catch (error) {
      alert("서버와의 통신 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Sidebar>
        <Step>01 관람일/회차 선택</Step>
        <Step>02 할인 선택</Step>
        <Step>03 배송 선택/주문자 확인</Step>
        <Step $active>04 결제하기</Step>
      </Sidebar>
      <Content>
        <LeftContent>
          <Title>실종</Title>
          <Subtitle>홍익대학교 학생회관 3층 소극장</Subtitle>
          <DateRange>2024.10.03~2024.10.05</DateRange>
          <DiscountBox>
            <DiscountTitle>결제수단</DiscountTitle>
            <Options>
              <Option>
                <RadioButton type="radio" name="discount" defaultChecked /> 입금
              </Option>
              <Account>국민은행: 00112233445566745 (주)홍익극연구회</Account>
              <AccountName
                type="text"
                placeholder="입금자명 (미입력시 예매자명)"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
              />
              <Detail>주문 후 24시간 동안 미입금시 자동 취소됩니다.</Detail>
            </Options>
          </DiscountBox>
        </LeftContent>
        <Summary>
          <Row>
            <Label>일시</Label>
            <Value>2024.10.03 (목) 19:00</Value>
          </Row>
          <Row>
            <Label>인원</Label>
            <Value>1</Value>
          </Row>
          <Row>
            <Label>티켓 금액</Label>
            <Value>10,000원</Value>
          </Row>
          <Row>
            <Label>할인</Label>
            <Value $active>-3000원</Value>
          </Row>
          <Row>
            <Label>배송료</Label>
            <Value>0원 (현장수령)</Value>
          </Row>
          <TotalRow>
            <TotalLabel>총 결제 금액</TotalLabel>
            <TotalValue>7,000원</TotalValue>
          </TotalRow>
          <Button onClick={handleSubmit} $active={isButtonActive && !isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? '결제 처리 중...' : '다음'}
          </Button>
          <PreButton onClick={() => navigate('../step3')}>이전</PreButton>
        </Summary>
      </Content>
    </Container>
  );
};

export default Step4;

// 스타일 컴포넌트

const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  display: flex;
    margin: 0 auto;
  position: relative;
  padding: 40px;
  font-family: "Pretendard", sans-serif;
 gap: 80px;
`;

const Sidebar = styled.div`
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Step = styled.div`
display: flex;
width: 180px;
height: 24px;
align-items: center;
padding: 8px 20px;
gap: 20px;
flex-shrink: 0;
border-radius: 3px;
margin-left: 60px;
  border: 1px solid ${({ active }) => (active ? "#A00000" : "#E6E6E6")};
  background-color: ${({ active }) => (active ? "#A00000" : "#fffff")};
  color: ${({ active }) => (active ? "#FFFFFF" : "#919191")};

  /* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Content = styled.div`
    display: flex;
  flex: 1;
  gap:80px;
`;
const LeftContent = styled.div`
margin-top:-40px;
      flex-direction: column;
        padding-left: 85px;
`;

const Title = styled.h1`
  color: #000;

/* Headline-md-ko */
font-family: Pretendard;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.72px;
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
 color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
  margin-bottom: 3px;
`;

const DateRange = styled.div`
 color: #919191;

/* Body-tiny-md */
font-family: Inter;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
  margin-bottom: 20px;
`;

const DiscountBox = styled.div`
display: flex;
width: 376px;
height: 215px;
padding: 20px;
flex-direction: column;
align-items: flex-start;
gap: 20px;
flex-shrink: 0;
border-radius: 3px;
border: 1px solid var(--Gray-outline, #E6E6E6);
  margin-bottom: 20px;
`;

const DiscountTitle = styled.div`
  color: #000;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #000;
  margin-bottom:10px;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const Account=styled.div`
width: 100%;
flex-shrink: 0;
  border: none;
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
   padding-bottom: 5px; 
color: #000;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const AccountName=styled.input`
flex-shrink: 0; 
  border: none;
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
  padding-bottom: 8px;
  color:rgb(0, 0, 0);
  width: 320px;
  margin-top:20px;
 
  &::placeholder {
    color: #919191; /* 플레이스홀더 색상 */
 font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
  
`;
const Detail=styled.div`
color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`

const RadioButton = styled.input`
width: 20px;
height: 20px;
flex-shrink: 0;
fill: var(--gray-white-bg, #FFF);
stroke-width: 5px;
  accent-color: #A00000;
`;

const Summary = styled.div`
  padding: 20px;
  margin-top:90px;
`;

const Row = styled.div`
  display: flex;;
  margin-bottom: 20px;
  font-size: 16px;
gap:40px;
`;


const Label = styled.div`
  color: #000;
width: 80px; 
/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Value = styled.div`
  color: ${({ active }) => (active ? "#A00000" : "#000")};
  width: 100%

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;

const TotalRow = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: bold;
  margin-top: 140px;
  gap: 40px;
  flex-direction: row;
  margin-bottom: 40px;
`;

const TotalLabel = styled.div`
color: #000;
margin-top: 10px;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;`;

const TotalValue = styled.div`
  color: var(--Muit-Red-main, #A00000);
6
/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const Button = styled.button`
border-radius: 3px;
border: 1px solid  ${({ active }) => (active ? "#A00000" : "#919191")};
background: ${({ active }) => (active ? "#A00000" : "#919191")};
display: flex;
width: 400px;
height: 40px;
padding: 10px 172px;
justify-content: center;
align-items: center;
gap: 10px;
cursor: pointer;
color: #FFF;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom:18px;
`;
const PreButton = styled.button`
border-radius: 3px;
border: 1px solid #E6E6E6;
background: #FFF;
display: flex;
width: 400px;
height: 40px;
padding: 10px 172px;
justify-content: center;
align-items: center;
gap: 10px;
cursor: pointer;
color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom:18px;
`;

