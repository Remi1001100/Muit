import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Step5=()=>{
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/mypage/my/tickets");
  };

return(
<Container>
    <Booked>예약 신청이 완료되었습니다!</Booked>
    <BookedState onClick={handleNavigate} >예약현황 보러가기</BookedState>
</Container>
);
}

export default Step5;

const Container = styled.div`
  max-width: 1440px;
  height: 864px;
  display: flex;
    margin: 0 auto;
  position: relative;
  flex-direction: column;
  padding: 40px;
  font-family: "Pretendard", sans-serif;
`; 

const Booked=styled.div`
color: #A00000;
text-align: center;
margin-top: 300px;

/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`

const BookedState=styled.div`
color: #000;
display: flex;
width: 400px;
height: 40px;
margin-top: 40px;
margin-left: 480px;
justify-content: center;
align-items: center;
gap: 10px;
border-radius: 3px;
border: 1px solid var(--Gray-outline, #E6E6E6);
background: var(--Gray-white-bg, #FFF);
cursor:pointer;

/* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`