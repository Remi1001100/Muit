import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useCustomFetch from "../../../hooks/fetchWithAxios";

import Plus from "../../../assets/icons/Plus.svg"
import Authenticate from "../../../components/mypage/account/Authenticate";


function AddressManagement() {
  const memberId = localStorage.getItem("userId");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const {data: info, error, loading} = useCustomFetch(`/member/${memberId}`);
  console.log(info?.result);

  const handleAddAddress = () => {
    navigate("/mypage/account/address/add-address");
  };

  return (
    <Container>
      {isAuthenticated ? (
        <>
        {/*배송지는 회원 정보를 받아와서 변경경*/}
          <InputArea>
            <p className="body-B-600">기본 배송지</p>
            <Input>
              <div className="address">
                <span>집</span>
                <span>|</span>
                <span>{info?.result?.address}</span>
              </div>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600">주소록</p>
            <Input>
              <div className="address">
                <span>회사</span>
                <span>|</span>
                <span>{info?.result?.address}</span>
              </div>
              <EditButton>기본 배송지로 등록</EditButton>
            </Input>
          </InputArea>

          <InputArea>
            <p className="body-B-600"></p>
            <Input>
              <div className="addAddress" onClick={handleAddAddress}>
                <img src={Plus}/>
                <span className="body-M-500">배송지 추가하기</span>                
              </div>
            </Input>
          </InputArea>
        </>
      ) : (
        <Authenticate setIsAuthenticated={setIsAuthenticated} /> 
      )}
    </Container>
  );
}

const Container = styled.div`
  font-family: Pretendard;
  padding: 16px 0px;
  
`
const InputArea = styled.div`
  display: flex;
  gap: 64px;
  align-items: center;

  .body-B-600{
    width: 75px;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  position: relative;
`
const Input = styled.div`
  display: flex;
  justify-content: space-between;

  height: 32px;
  width: 716px;

  border-style:none;
  border-bottom:solid 1px #E6E6E6;
  outline: none;

  span{margin: 0px;}
  .address{
    display: flex;
    gap: 4px;
    align-items: center;

    color: var(--Gray-maintext, #000);
    /* Body-tiny-md */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
  .addAddress{
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .body-M-500{
    color: var(--Gray-sub, #919191);
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
  }
`
const EditButton = styled.button`
  font-family: Pretendard;
  width: 136px;
  height: 28px;
  padding: 4px 12px;
  align-items: center;

  border-radius: 2px;
  border: 1px solid #919191;
  background: #FFF;

  color: #919191;
  /* Body-tiny-md */
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
`

export default AddressManagement;