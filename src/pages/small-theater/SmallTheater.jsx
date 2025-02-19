import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FormattedDate from "../../components/date/FormattedDate";
import { useNavigate } from "react-router-dom";
//import useFetch from "../../hooks/useFetch";
import useCustomFetch from "../../hooks/useCustomFetch";
//const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");


const SmallTheater = () => {
  const [SmallMusicals, setSmallMusicals] = useState([]);
  const navigate = useNavigate();
  
  const url = `/amateurs/list`;
  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

   console.log('데이터', data);

  useEffect(() => {
    if (data && data.result) {
      const formattedMusicals = data.result.map((musical) => ({
        id: musical.id,
        name: musical.name,
        image: musical.posterImgUrl,
        place: musical.place,
        schedule: musical.schedule,
      }));
      setSmallMusicals(formattedMusicals);
    }
  }, [data]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>데이터를 불러오는 데 문제가 발생했습니다.</div>;
  if (!data || !data.result) return <div>데이터가 없습니다.</div>;

  return (
    <>
      <TicketListWrapper>
        <Container>
          <TicketListTitle>현재 진행중인 소극장 공연</TicketListTitle>
          <TicketListEnroll onClick={() => navigate("/register-musical")}>
            공연 등록하기
          </TicketListEnroll>
        </Container>
        <DropdownWrapper>
          <Dropdown name="region">
            <option value="">지역 선택</option>
            <option value="seoul">서울</option>
            <option value="busan">부산</option>
            <option value="daegu">대구</option>
            <option value="incheon">인천</option>
            <option value="gwangju">광주</option>
            <option value="daejeon">대전</option>
          </Dropdown>
        </DropdownWrapper>
        <TicketList>
          {SmallMusicals.map((musical) => (
            <MusicalItem key={musical.id} onClick={() => navigate(`/small-detail/${musical.id}`)}>
              <img src={musical.image} alt={musical.name} />
              <div className="details">
                <div className="title">{musical.name}</div>
                <div className="info">{musical.place}</div>
                <div className="datetime">{musical.schedule}</div>
              </div>
            </MusicalItem>
          ))}
        </TicketList>
      </TicketListWrapper>
    </>
  );
};

export default SmallTheater;



const TicketListWrapper = styled.div`
  position: relative; /* 자식 요소 위치를 조정하기 위해 설정 */
max-width: 1440px;
  height: 864px;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  align-items: center; /* 세로 정렬을 중앙으로 */
  margin-top: 100px;
  gap: 740px; /* Title과 Enroll 사이 간격 */
`;

const TicketListTitle = styled.div`
  margin-left: 100px;
  font-family: Pretendard;
font-size: 36px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: -0.72px;
`;

const TicketListEnroll = styled.div`
margin-right: 100px;
 font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; 
color: #FFF; /* 적절한 색상 선택 */

background-color: #A00000;
display: flex;
width: 100px;
height: 28px;
padding: 4px 12px;
justify-content: center;
align-items: center;
gap: 10px;
flex-shrink: 0;
border-radius: 3px;
  cursor: pointer; /* 커서 변경 */
`;


const TicketList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 한 행에 4개씩 배치 */
  gap: 80px; /* 각 사진 간의 간격 */
  justify-content: center; /* 그리드가 중앙 정렬되도록 설정 */
  margin-left: 135px;
  margin-right: 135px;
  margin-top: 93px;
  margin-bottom: 45px;

  }
`;

const MusicalItem = styled.div`
  text-align: left;
  font-family: Pretendard;
  margin-bottom: -25px;
  cursor:pointer;
 
  img {
    height: 320px;
    width: 228.571px;
    object-fit: cover; /* 이미지가 박스를 가득 채우고 비율을 유지하도록 설정 */
    margin: 0; /* 이미지 간의 마진을 없앰 */
  }

  .details {
    margin-top: 15px;
    font-size: 0.9rem;

    .title {
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
margin-bottom: 18px;

      }

      .datetime {
color: #919191;

/* body-16-medium */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
    
      }

      .info {
        color: #000;

      /* body-16-medium */
      font-family: Pretendard;
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: 25px; 
    margin-bottom: 4px;
      }
  }
`;

const DropdownWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-left: 100px;
  margin-top: 32px;
`;

const Dropdown = styled.select`
  color: var(--Gray-sub, #919191);

font-family: Pretendard;
font-size: 14px;
font-style: normal;
font-weight: 500;
line-height: 18px; /* 128.571% */
display: flex;
width: 104px;
height: 28px;
padding: 4px 12px;
align-items: center;
gap: 4px;
position: absolute;
border-radius: 2px;
border: 1px solid var(--Gray-sub, #919191);
background: var(--Gray-white-bg, #FFF);
cursor: pointer
`;