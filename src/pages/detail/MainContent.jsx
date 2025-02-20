import React from "react";
import styled from "styled-components";
import PerformanceDetails from "../../components/detail/PerformanceDetails";
import Info from "../../components/detail/Info";
import Calendar from "../../components/Calendar2";
import EventContent from "../../components/eventcheck/EventContent";
import { RatingStars } from './../../components/detail/RatingStars';
import ChevronRight from "../../assets/icons/ChevronRight.svg";
import { useState } from "react";
import HeartButton from "../../components/HeartButton";
import useMoveScroll from "../../hooks/useMoveScroll";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("accessToken");


function MainContent({data,loading, error}) {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(data?.result?.isLike);
  console.log(data?.result);

  const { data: event} = useFetch(`/events/${data?.result?.id}`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  },);
  //console.log("이벤트:", event?.result?.eventResultListDTO);
  

  if (loading) return <div>Loading...</div>;
  if (error || !data.isSuccess) return <div>데이터를 불러오지 못했습니다.</div>;

  const musical = data.result;
  const name = musical.name;
  const poster = musical.posterUrl || "";
  const score = musical.score;

  const priceInfoArray = musical.priceInfo[0].split(", ");

  const parsedPriceInfo = priceInfoArray.map(item => {
    const [seat, price] = item.split(" "); // 띄어쓰기로 분리
    return { seat, price };
  });
  
  console.log(parsedPriceInfo);

  const details = [
    { label: "장소", value: musical.place },
    { label: "공연 기간", value: `${musical.perFrom} ~ ${musical.perTo}` },
    { label: "공연 시간", value: musical.runTime },
    { label: "관람 연령", value: musical.ageLimit },
    { label: "출연", value: musical.actorPreview.join(", ") },
    { label: "가격", value: parsedPriceInfo },
  ];

  const {element, onMoveToElement} = useMoveScroll();



  return (
    <>
      <Wrapper>
        <div style={{margin:'60px 100px', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
           {/* 공연 상세 정보, 예매 버튼, 캐스팅 정보 등 구현 예정 */}
        <LeftSection>

        <TitleWrapper>
          <h1>{name}</h1>
          <HeartButton 
            setLiked={setLiked} liked={liked} 
            musicalId={musical.id}
          />
        </TitleWrapper>
        <div>반별 test용으로 별점을 4.6 고정으로 해둠</div>
        <RatingWrapper>
          
          <RatingStars rating={score} />
          <Rating>{score}</Rating>
        </RatingWrapper>
        

        <Info image={poster} alt='포스터 이미지' height='430px' details={details} />

        {/*하단 nav bar */}
        <PerformanceDetails data={data} score={score}/>
        </LeftSection>

        <RightSection>

          <CalendarWrapper >
            <div style={{ transform: "scale(0.5)", transformOrigin: "top left" }}>
              <Calendar
                  variant="compact"
              />
            </div>
            {/*<hr />
            티켓 오픈 컴포넌트*/}
          </CalendarWrapper>

          <EventLink style={{ transform: "scale(0.8)", transformOrigin: "top left" }}>
              {event?.result?.eventResultListDTO?.map((musical, index, arr) => {
                const isLast = index === arr.length - 1;
                return (
                  <EventContent
                    key={musical.id}
                    content={musical.name}
                    startAt={musical.evFrom}
                    finishAt={musical.evTo}
                    duration={musical.duration}
                    isLast={isLast}
                  />
                );
              })}


            <Text onClick={() => navigate(`/event-check/${data?.result?.id}`)}>
              <p>이벤트 확인하기</p><img src={ChevronRight} />
            </Text>
          </EventLink>
        </RightSection>

        </div>
      </Wrapper>
   </>
    
  );
}

export default MainContent;

const Wrapper = styled.div`
  font-family: Arial, sans-serif;
  
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  h1 {
    color: #000;
    /* Headline-md-ko */
    font-family: Pretendard;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: -0.72px;
    margin: 0px;
  }

  button {
    width: 120px;
    height: 28px;
    padding: auto;
    cursor: pointer;
    background-color: #A00000; /* 사용자 선호 색상 반영 */
    border: none;
    border-radius: 2px;
    color: white;
    color: #FFF;

    /* Body-tiny-md */
    font-family: Pretendard;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
  }
`;


const Rating = styled.div`
color: #000;

/* Body-tiny-md */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 36px; /* 150% */
margin-left: 4px;
`

const LeftSection = styled.div`
`;

const RightSection = styled.div`
  margin-top: 83px;
`;

const RatingWrapper = styled.div`
  display:flex; 
  flexDirection: row;
  margin-bottom: 20px;
  position: relative;
  left: -6px;
`;

const GroupPurchaseButton = styled.button`
  width: 300px;
  height: 40px;
  margin-top: 24px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Muit-Red-main, #A00000);
  background: var(--Muit-Red-main, #A00000);
  color: #FFF;

  /* Body-bold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`

const CalendarWrapper = styled.div`
  width: 300px;
  height: 400px;

  border: 1px solid #E6E6E6;
  
  hr {
    border: none;
    border-top: 1px solid #E6E6E6;
    width: 90%;
    margin: 0px 16px;
  }
`
const Text = styled.div`
  color: #000;

  display: flex;
  align-items: center;
  justify-content: right;

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`
const EventLink = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-end;
  margin-top: 16px;
  gap: 4px;
`