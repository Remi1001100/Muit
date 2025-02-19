import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import DaumPostcode from "react-daum-postcode";
import AddressInput from "../../../../components/signup/addressInput";

import SearchRed from "../../../../assets/icons/SearchRed.svg"

function AddAddress() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const isFormValid = name.trim() !== "" && recipient.trim() !== "" && phone.trim() !== "";

  const GoBack = () => {
    navigate(-1);
  };

  const CompleteAddAddress = () => {
    alert("주소가 성공적으로 추가되었습니다.");
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


  return (
    <Container>
      <InputArea>
        <p className="body-B-600">배송지명</p>
        <Input>
          <input
            placeholder="예시: 집, 회사"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Input>
      </InputArea>

      <InputArea>
        <p className="body-B-600">수령인</p>
        <Input>
          <input
            placeholder="수령인을 입력하세요"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Input>
      </InputArea>

      <>
        <InputArea>
          <p className="body-B-600">주소</p>
          {(!address) ? (
            <div className="address-search" onClick={handleAddress}>
            <img src={SearchRed} alt="주소 검색" /> 주소 검색
          </div>
          ) : (
            <Input>
            <input value={address} readOnly placeholder="주소를 선택해주세요."
              /*{...register("address")}*/ />
            </Input>

          ) }
          
        </InputArea>

        {isOpen && (
          <ModalBackground onClick={() => setIsOpen(false)}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
              <DaumPostcode onComplete={handleComplete} />
              <CloseButton onClick={() => setIsOpen(false)}>닫기</CloseButton>
            </ModalContent>
          </ModalBackground>
        )}

      </>

      <InputArea>
        <p className="body-B-600">휴대폰</p>
        <Input>
          <input
            placeholder="휴대폰 번호를 입력하세요"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Input>
      </InputArea>

      <BtnArea>
        <button onClick={GoBack} className="previous">이전</button>
        <button
          onClick={CompleteAddAddress}
          className="confirm"
          disabled={!isFormValid}
        >
          변경
        </button>
      </BtnArea>
    </Container>
  )
}

const Container = styled.div`
    font-family: Pretendard;
    padding: 16px 0px;
`
const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 60px;

  .body-B-600{
    width: 64px;

    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }
  position: relative;

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
`
const Input = styled.div`
  display: flex;
  justify-content: space-between;

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

`
const EditButton = styled.button`
  width: 73px;
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
const BtnArea = styled.div`
  display: flex;
  gap: 20px;

  padding-top: 100px;

  button{
    display: flex;
    width: 400px;
    height: 40px;
    padding: 8px 20px;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    cursor: pointer;

    /* Body-bold */
    font-family: Pretendard;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
  }

  .confirm{
    color: #FFF;
    border: 1px solid var(--Muit-Red-main, #A00000);
    background: var(--Muit-Red-main, #A00000);
  }
  .confirm:disabled{
    border: 1px solid var(--Gray-sub, #919191);
    background: var(--Gray-sub, #919191);
  }

  .previous{
    color: #000;
    border: 1px solid var(--Gray-outline, #E6E6E6);
    background: var(--Gray-white-bg, #FFF);
  }  
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

export default AddAddress;