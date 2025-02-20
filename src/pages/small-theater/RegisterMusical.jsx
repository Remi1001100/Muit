import React, { useState} from "react";
import styled from "styled-components";
import CameraIcon from '../../assets/icons/Camera.svg';
import CastingPictureIcon from '../../assets/icons/CastingPicture.svg';
import PlusIcon from '../../assets/icons/plus.svg'
import { useNavigate } from "react-router-dom"; 
import IntermissionIcon1 from "../../assets/icons/Check.svg"
import IntermissionIcon2 from "../../assets/icons/Check.svg"
import CheckIntermissionIcon from "../../assets/icons/CheckRed.svg"

const RegisterMusical = () => {
  const navigate = useNavigate();
  const [intermission, setIntermission] = useState(null);
  const [posterImage, setPosterImage] = useState(null);
  const [castingImages, setCastingImages] = useState([]);
  const [noticeImages, setNoticeImages] = useState([]);
  const [castings, setCastings] = useState([
    { name: '', role: ''},
  ]);  
  const [formData, setFormData] = useState({
    name: "",
    place: "",
    schedule: "",
    age: "",
    starring: "",
    totalTicket: 0,
    timeInfo: "",
    account: "",
    contact: "",
    hashtag: "",
    runtime: "",
    noticeContent:"",
    summaryContent:"",
    staff: [
      { position: "", name: "" }
    ],
    tickets: [
        { ticketName: "일반 예매", price: "" },
        { ticketName: "홍대생 할인", price: "" },
      ],

  });
  console.log(formData);
  const handleIntermissionClick = (type) => {
    setIntermission(type);
  };
  const handleTicketPriceChange = (e, index) => {
    const newTickets = [...formData.tickets];
    newTickets[index].price = e.target.value;
    setFormData((prev) => ({ ...prev, tickets: newTickets }));
  };
  

  /*이미지 추가*/
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPosterImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    document.getElementById("imageUploadInput").click();
  };
  
  /*캐스팅 이미지 추가*/
  const handleCastingImageUpload = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const newImages = [...castingImages];
    newImages[index] = file;
    setCastingImages(newImages);
  };
  
  
  const handleCastingImageClick = (index) => {
    document.getElementById(`castingImageUploadInput-${index}`).click();
  };
  
  /*캐스팅 정보 추가하기*/
  const handleAddCasting = () => {
    setCastings([...castings, { name: '', role: '' }]);
    setCastingImages([...castingImages, null]);
  };
  
  
  const handleCastingChange = (index, field, value) => {
    const updatedCastings = [...castings];
    updatedCastings[index][field] = value;
    setCastings(updatedCastings);
  };
  /* 공지사항 이미지 추가 */
  const handleNoticeImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newImages = [...noticeImages, file];
    setNoticeImages(newImages);
  };
  /*스태프 추가 */
  const handleStaffChange = (index, field, value) => {
    const updatedStaff = [...formData.staff];
    updatedStaff[index][field] = value;
    setFormData((prev) => ({ ...prev, staff: updatedStaff }));
  };
  
  const handleAddStaff = () => {
    setFormData((prev) => ({
      ...prev,
      staff: [...prev.staff, { position: "", name: "" }],
    }));
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextClick = () => {
    navigate("/register-musical/check", {
      state: {
        formData,
        posterImage,
        noticeImages,
        castingImages,
        castings,
      },
    });
  };

  return (
    <RegisterWrapper>
      <Title
       type="text" 
       name="name"
       placeholder="공연 이름을 입력하세요"
       value={formData.name}
       onChange={handleInputChange}
       />
      <Form>
        <LeftSection>

        <ImageUpload onClick={handleImageClick}>
        <Preview>
        {posterImage ? (
  <img src={URL.createObjectURL(posterImage)} alt="Uploaded" />
) : (
  <img src={CameraIcon} alt="Camera Icon" className="icon" />
)}

  </Preview>
  <input
    id="imageUploadInput"
    type="file"
    accept="image/*"
    style={{ display: "none" }}
    onChange={handleImageUpload}
  />
</ImageUpload>
        </LeftSection>
        <RightSection>
          <InputWrapper>
            <Label>장소</Label>
            <Input
              type="text"
              name="place"
              placeholder="공연할 장소를 입력하세요"
              value={formData.place}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>공연 기간</Label>
            <Input
              type="text"
              name="schedule"
              placeholder="공연 기간을 입력하세요"
              value={formData.schedule}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>공연 시간</Label>
            <Input
              type="text"
              name="runtime"
              placeholder="공연 시간을 입력하세요"
              value={formData.runtime}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <IntermissionWrapper>
          <IntermissionOption 
    selected={intermission === "include"} 
    onClick={() => handleIntermissionClick("include")}>
    <img 
      src={intermission === "include" ? CheckIntermissionIcon : IntermissionIcon1} 
      alt="인터미션 포함" 
    />
    <span>인터미션 포함</span>
  </IntermissionOption>
  <IntermissionOption 
    selected={intermission === "none"} 
    onClick={() => handleIntermissionClick("none")}>
    <img 
      src={intermission === "none" ? CheckIntermissionIcon : IntermissionIcon2} 
      alt="인터미션 없음" 
    />
    <span>인터미션 없음</span>
  </IntermissionOption>
          </IntermissionWrapper>
          <InputWrapper>
            <Label>관람 연령</Label>
            <Input
              type="text"
              name="age"
              placeholder="관람 연령을 입력하세요"
              value={formData.age}
              onChange={handleInputChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>출연</Label>
            <Input
             type="text"
             name="starring"
            placeholder="출연하는 배우의 이름을 입력하세요"
            value={formData.starring}
            onChange={handleInputChange} />
          </InputWrapper>
 
  <InputWrapper>
  <Label>가격</Label>
  <PriceInputWrapper>
    {formData.tickets.map((ticket, index) => (
      <PriceRow key={ticket.ticketName}>
        <PriceLabel>{ticket.ticketName}</PriceLabel>
        <PriceInput
          type="text"
          placeholder="가격을 입력하세요"
          value={ticket.price}
          onChange={(e) => handleTicketPriceChange(e, index)}
        />
      </PriceRow>
    ))}
  </PriceInputWrapper>
</InputWrapper>

          <InputWrapper>
            <Label>티켓 수</Label>
            <Input
             type="text" 
             name="totalTicket"
             placeholder="총 입장할 수 있는 티켓 수를 입력하세요"
             value={formData.totalTicket}
             onChange={handleInputChange}
              />
          </InputWrapper>
        </RightSection>
        <NextButtonWrapper>
    <NextButton onClick={handleNextClick} >다음</NextButton>
  </NextButtonWrapper>
      </Form>
      <BottomSection>
      <Border></Border>
  <Section>
    <SectionTitle>⚠️ 참고사항</SectionTitle>
    <SectionText>
      1. 기본 수수료는 5000원입니다.<br/>
      2. 등록 후, 관리자가 확인 후 페이지에 올라가게 됩니다.<br/>
      3. 대학생, 아마추어 연극/뮤지컬 모두 가능합니다. <br/>
      4. 환불은 저희가 해드리지 않습니다. 자신의 인스타그램으로 환불 or 현장에서 하시길 바랍니다.
      </SectionText>
   </Section>
    <Border></Border>
    <Section>  
    <InputWrapper2>
      <Label>해시태그</Label>
      <Input2
       type="text" 
       name="hashtag"
       placeholder="예: #극중극 #드라마"
       value={formData.hashtag}
       onChange={handleInputChange} />
    </InputWrapper2>
    <InputWrapper2>
      <Label>줄거리</Label>
      <TextArea
         name="summaryContent"   
        placeholder={`공연의 줄거리를 입력하세요
사진을 추가할 경우 미리보기 포스터로 올라갑니다`}
       value={formData.summaryContent}
  onChange={handleInputChange }
      />
    </InputWrapper2>
  </Section>

  <Section>
    <SectionTitle>공연정보</SectionTitle>
    <InputWrapper2>
      <Label>공연시간 정보</Label>
      <TextArea 
        name="timeInfo"
        placeholder="예매 가능시간이나 공연시간에 대해 자유롭게 입력하세요"
        value={formData.timeInfo}
        onChange={handleInputChange}
       />
    </InputWrapper2>
    <InputWrapper2>
      <Label>공지사항</Label>
      <NoticeTextAreaContainer>
      <TextArea 
       name="noticeContent"
       placeholder={`공지 사항에 대해 자유롭게 입력하세요
예: 예매시에 공연 관리자가 안내하는 입금계좌로 입금하시고, 공연 관리자의 입금 확인을 통해 티켓 예매 확인을 받을 수 있습니다. 
공연 관리자가 입금을 확인해야 하므로 티켓 확인까지 시간이 걸릴 수 있습니다.`} 
      value={formData.noticeContent}
      onChange={handleInputChange}/>
       <ImageUploadButton onClick={() => document.getElementById('noticeImageUploadInput').click()}>
                <img src={CameraIcon} alt="이미지 업로드" />
              </ImageUploadButton>
              <input
                id="noticeImageUploadInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleNoticeImageUpload}
              />
            </NoticeTextAreaContainer>
            <ImagePreviewContainer>
              {noticeImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt="Uploaded" width="100" height="100" />
              ))}
            </ImagePreviewContainer>
    </InputWrapper2>
  </Section>

  <Section>
  <SectionTitle>캐스팅정보</SectionTitle>
  <CastingWrapperContainer>
  {castings.map((casting, index) => (
  <CastingWrapper key={index}>
    <Left>
      <img
        src={
          castingImages[index]
            ? URL.createObjectURL(castingImages[index])
            : CastingPictureIcon
        }
        alt="Casting Icon"
        width="140"
        height="140"
        onClick={() => handleCastingImageClick(index)}
        style={{ cursor: 'pointer' }}
      />
      <input
        type="file"
        id={`castingImageUploadInput-${index}`}
        style={{ display: 'none' }}
        accept="image/*"
        onChange={(e) => handleCastingImageUpload(e, index)}
      />
      <CastingInfo
        type="text"
        placeholder="이름"
        value={casting.name}
        onChange={(e) =>
          handleCastingChange(index, 'name', e.target.value)
        }
      />
      <CastingInfo
        type="text"
        placeholder="역할"
        value={casting.role}
        onChange={(e) =>
          handleCastingChange(index, 'role', e.target.value)
        }
      />
    </Left>
  </CastingWrapper>
))}


  <AddCastingButtonWrapper>
    <AddCastingButton onClick={handleAddCasting}>
      <img src={PlusIcon} alt="추가 아이콘" />
      <span>추가하기</span>
    </AddCastingButton>
  </AddCastingButtonWrapper>
</CastingWrapperContainer>
    <InputWrapper2>
      <Label>감독 및 스태프</Label>
      {formData.staff.map((staff, index) => (
    <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '8px' }}>
      <Input3
        type="text"
        placeholder="역할을 입력하세요"
        value={staff.position}
        onChange={(e) => handleStaffChange(index, 'position', e.target.value)}
      />
      <Input3
        type="text"
        placeholder="이름을 입력하세요"
        value={staff.name}
        onChange={(e) => handleStaffChange(index, 'name', e.target.value)}
      />
    </div>
  ))}
    </InputWrapper2>
    <AddStaffButton onClick={handleAddStaff}>
      <img src={PlusIcon} alt="추가 아이콘" />
      <span>추가하기</span>
    </AddStaffButton>

  </Section>

  <Section>
    <SectionTitle>결제정보</SectionTitle>
    <InputWrapper2>
      <Label>계좌번호</Label>
      <Input2 
        type="text"
        name="account"
        placeholder="공연에 쓰일 계좌번호를 입력하세요 (입금주명)"
        value={formData.account}
        onChange={handleInputChange} />
    </InputWrapper2>
    <InputWrapper2>
      <Label>환불문의</Label>
      <Input2 
      type="text"
      name="contact"
      placeholder="환불 문의에 쓰일 SNS 또는 전화번호를 입력하세요"
      value={formData.contact}
      onChange={handleInputChange} />
    </InputWrapper2>
  </Section>
</BottomSection>

    </RegisterWrapper>
  );
};

export default RegisterMusical;



const RegisterWrapper = styled.div`
  max-width: 1440px;
  height: 864px;
  margin: 0 auto;
  position: relative;
  
`;

const Title = styled.input`
color: black;
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
&::placeholder {
  color: var(--Gray-sub, #919191);
/* Title-semibo */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
}
margin-top: 87px;
margin-left: 99px;
border:none;
outline: none;
`;

const Form = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
`;

const LeftSection = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 99px;
`;

const RightSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const NextButtonWrapper = styled.div`
  display: flex;
margin-right:100px;
`;

const NextButton = styled.button`
  width: 300px;
height: 40px;
flex-shrink: 0;
border-radius: 3px;
border: 1px solid var(--Gray-sub, #919191);
background: var(--Gray-sub, #919191);
color: #FFF;
cursor: pointer;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;


const ImageUpload = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const Preview = styled.div`
width: 320px;
height: 450px;
flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top:-30px;

  background-color: #F5F5F5;

  .icon {
    width: 24px;
height: 24px;
flex-shrink: 0;
    object-fit: cover;
  }
  img{
     width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

// const FileInput = styled.input`
//   margin-top: 10px;
// `;

const InputWrapper = styled.div`
  display: flex;
  align-items: center; /* 텍스트와 인풋을 수평 정렬 */
`;

const Label = styled.label`
  color: #000;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
  text-align: left; /* 오른쪽 정렬 */
`;

const Input = styled.input`
  border: none;
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  padding: 4px 0;
  color:rgb(0, 0, 0);
  width: 300px;
  margin-left: auto; /* 요소를 오른쪽으로 최대한 밀어붙임 */
  margin-right:120px;/* 오른쪽에서 560px 떨어지게 함 */
 
  &::placeholder {
    color: #919191; /* 플레이스홀더 색상 */
    /* body-14-medium */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
  }

  &:focus {
    border-bottom: 1px solid #333; /* 포커스 시 밑줄 색상 변경 */
  }
`;
const PriceInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 300px;
  margin-left: auto;
  margin-right: 120px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const PriceLabel = styled.span`
  color: var(--Gray-maintext, #000);

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 400;
line-height: 18px; /* 128.571% */;
`;

const PriceInput = styled.input`
  border: none;
  border-bottom: 1px solid #E6E6E6;
  outline: none;
  padding: 4px 0;
  color: rgb(0, 0, 0);
  width: 70%;

  &::placeholder {
    color: #919191;
    font-family: Pretendard;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
  }

  &:focus {
    border-bottom: 1px solid #333;
  }
`;

// IntermissionWrapper: 옵션들을 감싸는 컨테이너
const IntermissionWrapper = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top:-20px;
  margin-left:-60px;
`;

// IntermissionOption: 개별 옵션
const IntermissionOption = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

/* body-14-medium */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */

  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

`;


const Border=styled.div`
 border: none;
border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
width: 924px;
flex-direction: column;
margin-bottom:32px;
`
const SectionText=styled.div`
color: #000;
margin-bottom:32px;

/* body-16-medium */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`

const BottomSection = styled.div`
  padding: 5px 100px;
`;

const Section = styled.div`
  margin-bottom: 32px;
`;

const SectionTitle = styled.h2`
height: 30.858px;
flex-direction: column;
justify-content: center;
flex-shrink: 0;
color: var(--Muit-Red-main, #A00000);
/* title-24-bold */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;
const InputWrapper2 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Input2 = styled.input`
  border: none;
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  padding: 4px 0;
  color:rgb(0, 0, 0);
  width: 924px;
  flex-direction: column;
  margin-bottom: 28px;
 
  &::placeholder {
    color: #919191; /* 플레이스홀더 색상 */
    /* body-14-medium */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
  }

  &:focus {
    border-bottom: 1px solid #333; /* 포커스 시 밑줄 색상 변경 */
  }
  `
const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 4px;
display: flex;
width: 924px;
height: 116px;
padding: 12px;
flex-direction: column;
align-items: flex-start;
gap: 42px;
flex-shrink: 0;
margin-top: 5px;
margin-bottom: 28px;

  &::placeholder {
  color:#919191;
    /* Body-me */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
 white-space: pre-wrap;
  }

  &:focus {
    border: 1px solid #333;
  }
`;

const NoticeTextAreaContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ImageUploadButton = styled.button`
  position: absolute;
  left: 10px;
  bottom: 30px;
  background: none;
  border: none;
  cursor: pointer;
`;

const ImagePreviewContainer = styled.div`
  img {
    width: 350px;
    height: 600px;
    object-fit: cover;
  }
  margin-top: 10px;
`;

const CastingWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 20px; /* 아이콘, 이름, 역할 간의 간격 */
    flex-direction: column;
    margin-bottom:20px;
`;

const CastingInfo = styled.input`

border: none;
  border-bottom: 1px solid #e6e6e6;
  outline: none;
  padding: 4px 0;
  color: rgb(0, 0, 0);
  width: 140px;
  text-align: center;

  &::placeholder {
    color: #919191;
    font-family: Pretendard;
    font-size: 16px;
    font-weight: 500;
    line-height: 18px;
  }

  &:focus {
    border-bottom: 1px solid #333;
  }
`;



const CastingWrapperContainer = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
`;

const AddCastingButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const AddCastingButton = styled.button`
 display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 4px; /* 아이콘과 글자 사이 간격 */
  margin-top: 16px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
    background-color: transparent; /* 배경 제거 */
  cursor: pointer;
  color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Pretended;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`;
const Input3 = styled.input`
  border: none;
  border-bottom: 1px solid #E6E6E6; /* 밑줄만 표시 */
  outline: none; /* 포커스 시 기본 테두리 제거 */
  padding: 4px 0;
  color:rgb(0, 0, 0);
  width: 250px;
  flex-direction: column;
  margin-bottom: 5px;
 
  &::placeholder {
    color: #919191; /* 플레이스홀더 색상 */
    /* body-14-medium */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
  }

  &:focus {
    border-bottom: 1px solid #333; /* 포커스 시 밑줄 색상 변경 */
  }
  `
  const AddStaffButton = styled.button`
   display: flex;
  align-items: center; /* 수직 중앙 정렬 */
  gap: 4px; /* 아이콘과 글자 사이 간격 */
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
    background-color: transparent; /* 배경 제거 */
  cursor: pointer;
  color: var(--Gray-sub, #919191);

/* Body-tiny-md */
font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
`;