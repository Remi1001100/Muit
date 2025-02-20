import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";

const token = localStorage.getItem("accessToken");


function CreditInfo() {

  const { amateurId } = useParams();
  
  const url = `/amateurs/${amateurId}`;

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  // 캐스팅 정보 추출
  const staffs = data.result.staff;

    return(
      <CreditsWrapper>
      {staffs.map((staff, index) => (
        <CreditRow key={index}>
          <CreditLabel>{staff.position}</CreditLabel>
          <CreditValue>{staff.name}</CreditValue>
        </CreditRow>
      ))}
    </CreditsWrapper>
    );
}
export default CreditInfo;

const CreditsWrapper = styled.div`
  margin-top: 23px;
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;
const CreditRow = styled.div`
  display: grid;
  grid-template-columns: auto 1fr; /* Two columns for position and name */
  column-gap: 35px; /* Gap between position and name */
  align-items: center;
`;
const CreditLabel = styled.div`
  text-align: left; /* 텍스트 왼쪽 정렬 */
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;

const CreditValue = styled.div`
  text-align: left; /* 텍스트 왼쪽 정렬 */
  color: #000;

/* Body-me */
font-family: Inter;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`;