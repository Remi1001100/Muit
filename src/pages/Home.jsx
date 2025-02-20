
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import axios from 'axios';

import ArrowPrevIcon from '../assets/icons/ArrowPrev.svg';
import ArrowNextIcon from '../assets/icons/ArrowNext.svg';
import useCustomFetch from "../hooks/fetchWithAxios";
import Upcoming from "./Upcoming";

// 색상, 폰트 상수, 레이아웃 (디자인 가이드)
const COLOR_MUIT_RED = "#A00000";
const COLOR_GRAY_MAINTEXT = "000000";
const COLOR_GRAY_SUB = "#919191";   
const COLOR_WHITE = "#FFFFFF";
const COLOR_GRAY_OUTLINE = "#E6E6E6";

const MAX_WIDTH = 1440;
const SIDE_MARGIN = 100; // 좌우 마진
const COLUMN_GAP = 20;   // column 간격

const baseURL = import.meta.env.VITE_APP_SERVER_URL;
// const token = localStorage.getItem("accessToken"); 로그인 구현되면 이렇게
// 그전 까지 임시
const token = import.meta.env.VITE_APP_ACCESS_TOKEN;

function Home() {

  // 데이터를 저장할 state들
  const [hotNowData, setHotNowData] = useState([]);
  const [ticketOpenData, setTicketOpenData] = useState([]);
  const [rankingData, setRankingData] = useState([]);

  // 왼쪽 옵션 스테이트, default = hotnow
  const [selectedOption, setSelectedOption] = useState("hotNow");

  useEffect(() => {
    fetchHotNow();
    fetchTicketOpen();
    fetchRanking();
  }, []);

  //Hot Now
  const fetchHotNow = async () => {
    try {
      const response = await axios.get(`${baseURL}/musicals/hot`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dataArr = response.data.result.musicalHomeList; 
      const refined = dataArr.map(item => ({
        musicalId: item.id,
        poster: item.posterUrl,
        title: item.name,
        locate: item.place,
        date: item.duration
      }));
      setHotNowData(refined);
    } catch (error) {
      console.error("HOT NOW fetch error:", error);
    }
  };
  // 오픈예정 
  const fetchTicketOpen = async () => {
    try {
      const response = await useCustomFetch(`${baseURL}/musicals/open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dataArr = response.data.result;
      const refined = dataArr.map(item => ({
        musicalId: item.id,
        poster: item.posterUrl,
        title: item.name,
        locate: item.place,
        date: item.duration,
        Dday: item.dday
      }));
      setTicketOpenData(refined);
    } catch (error) {
      console.error("TICKET OPEN fetch error:", error);
    }
  };
  // 랭킹5
  const fetchRanking = async () => {
    try {
      const response = await axios.get(`${baseURL}/musicals/rank`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      const dataArr = response.data.result.musicalHomeList; 
      const refined = dataArr.map((item, idx) => ({
        musicalId: item.id,
        poster: item.posterUrl,
        title: item.name,
        locate: item.place,
        date: item.duration,
        Ranking: (idx+1).toString() //인덱스 이용용
      }));
      setRankingData(refined);
    } catch (error) {
      console.error("RANKING fetch error:", error);
    }
  };

  // 선택된 옵션에 따른 슬라이드 데이터
  const getSlidesData = () => {
    switch (selectedOption) {
      case "hotNow":
        return hotNowData;
      case "ticketOpen":
        return ticketOpenData;
      case "ranking":
        return rankingData;
      default:
        return hotNowData;
    }
  };
  const slidesData = getSlidesData();

  // 슬라이드데이터 스테이트
  const [currentSlide, setCurrentSlide] = useState(0);

  //옵션이 바뀔때 초기화
  useEffect(() => {
    setCurrentSlide(0);
  }, [selectedOption]);

  // 자동으로 슬라이드 전환
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slidesData.length); // 다음 슬라이드로 전환
    }, 5000); // 5초
    return () => clearInterval(interval); 
  }, [slidesData.length]); 

  // 포스터카드 좌우 버튼 핸들러
  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slidesData.length - 1 : prev - 1
    );
  };
  const handleNext = () => {
    setCurrentSlide((prev) =>
      (prev + 1) % slidesData.length
    );
  };

  // 점 클릭 핸들러 (인디케이터)
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // 현재 카드 정보
  const slide = slidesData[currentSlide];

  return(
    <HomeContainer>
      <GridBox>
        {/* 왼쪽영역 - 옵션 3개 */}
        <LeftArea>

          {/* HOT NOW */}
          <Option
            $isActive={selectedOption === "hotNow"}
            onClick={() => setSelectedOption("hotNow")}
          >
            <OptionTitle $isActive={selectedOption === "hotNow"}>
              HOT NOW
              {selectedOption === "hotNow" && (
                <OptionSubTitle>
                  지금 핫한 뮤지컬
                </OptionSubTitle>
              )}  
            </OptionTitle>
          </Option>

          {/* TICKET OPEN */}
          <Option
            $isActive={selectedOption === "ticketOpen"}
            onClick={() => setSelectedOption("ticketOpen")}
          >
            <OptionTitle $isActive={selectedOption === "ticketOpen"}>
              TICKET OPEN
              {selectedOption === "ticketOpen" && (
                <OptionSubTitle>
                  오픈 예정 뮤지컬
                </OptionSubTitle>
              )}
            </OptionTitle>
          </Option>

          {/* RANKING */}
          <Option
            $isActive={selectedOption === "ranking"}
            onClick={() => setSelectedOption("ranking")}
          >
            <OptionTitle $isActive={selectedOption === "ranking"}>
              RANKING
              {selectedOption === "ranking" && (
                <OptionSubTitle>
                  랭킹
                </OptionSubTitle>
              )}
            </OptionTitle>
          </Option>
        </LeftArea>

        {/* 오른쪽영역 - 옵션선택에 따른 포스터카드 */}
        <RightArea>
          <Poster $isRanking={selectedOption === "ranking"}>
            <TextBox>
              {/*티켓오픈 -> Dday표시*/}
              { selectedOption === "ticketOpen" && ( <DdayText>{slide?.Dday}</DdayText> )}
              <TitleText>{slide?.title}</TitleText>
              <LocateText>{slide?.locate}</LocateText>
              <DateText>{slide?.date}</DateText>
            </TextBox>
              {selectedOption === "ranking" && (
                <RankingBox>
                  {slide?.Ranking}
                </RankingBox>
              )}
            <ArrowButtons>
              <ArrowButton onClick={handlePrev}>
                <ArrowIcon><img src={ArrowPrevIcon} alt="Arrow Icon" /></ArrowIcon>
              </ArrowButton>
              <CardBox>
                <PosterImage to={slide ? `/detail/${slide.musicalId}` : "#"}>
                  <img style={{ width: '416px', height: '584px' }} src={slide?.poster} alt="포스터 이미지" />
                </PosterImage>
                {/* 점(인디케이터) */}
                <DotWrapper>
                  {slidesData.map((_, i) => (
                    <Dot
                      key={i}
                      $active={i === currentSlide}
                      onClick={() => handleDotClick(i)}
                    />
                  ))}
                </DotWrapper>
                { selectedOption === "ticketOpen" && (<UpcomingLink to="/upcoming">오픈 예정 전체보기</UpcomingLink>) }
                { selectedOption === "ranking" && (<RankingLink to="/ranking">랭킹 전체보기</RankingLink>) }
              </CardBox>
              <ArrowButton onClick={handleNext}>
                <ArrowIcon><img src={ArrowNextIcon} alt="Arrow Icon" /></ArrowIcon>
              </ArrowButton>
            </ArrowButtons>
          </Poster>
        </RightArea>
      </GridBox>
    </HomeContainer>
  )
}


export default Home;

/* ------------------- Styled Components ------------------- */

const HomeContainer = styled.header`
  max-width: ${MAX_WIDTH}px;
  height: 864px;  /* 1024 - 160(상단바) */
  margin: 0 auto;
  position: relative;
  background-color: ${COLOR_WHITE};
`;

const GridBox = styled.div`
  max-width: ${MAX_WIDTH}px;
  height: 864px;  /* 1024 - 160(상단바) */

  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12열 그리드 */
  column-gap: ${COLUMN_GAP}px;  /* Gutter */
  padding: 0 ${SIDE_MARGIN}px; /* 좌우 margin */
`;

const LeftArea = styled.div`
  grid-column: 1 / 6; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-evenly; /*혹은 space-around*/
`;

const Option = styled.div`
  cursor: pointer;
`;

const OptionTitle = styled.div`
  font-family: "BelgianoSerif";
  font-weight: 400;
  font-size: ${({ $isActive }) => ($isActive ? "80px" : "60px")};
  color: ${({ $isActive }) => ($isActive ? COLOR_MUIT_RED : COLOR_GRAY_SUB)};
  transition: all 0.3s ease;

  display:  inline-block;
  position: relative;
`;

const OptionSubTitle = styled.div`
  position: absolute;
  bottom: -28px;
  left: 0;
  width: 100%;
  height: 28px;
  background-color: ${COLOR_MUIT_RED};
  color: ${COLOR_WHITE};
  border-radius: 0; /* 직사각형 */

  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  line-height: 28px;
  text-align: left;
  padding: 0 8px;
  box-sizing: border-box;
`;

const RightArea = styled.div`
  grid-column: 6 / 13;
  display: flex;
  justify-content: center; 
  align-items: center;
`;

const Poster = styled.div`
  display:  flex;
  justify-content:  flex-end;
  align-items:  flex-end;
  gap:  ${({ $isRanking }) => ($isRanking ? "107px" : "56px")};
  width: 100%;
  position: relative;
`;

const DdayText = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size:  24px;
  margin: 0 0 4px 0;
  height: 29px;
  color:  ${COLOR_MUIT_RED};
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position:  relative;
`;

const TitleText = styled.div`
  font-family: "Pretendard";
  font-weight: 700;
  font-size: 24px;
  margin: 0 0 28px 0;
  height: 29px;
  color: ${COLOR_GRAY_MAINTEXT};

  /* 텍스트길어져도 한줄에 표시되게 */
  white-space: nowrap;
  overflow: visible; 
`;

const LocateText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  margin: 0 0 4px 0;
  height: 25px;
  color: ${COLOR_GRAY_MAINTEXT};

  /* 텍스트길어져도 한줄에 표시되게 */
  white-space: nowrap;
  overflow: visible; 
`;

const DateText = styled.div`
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 16px;
  margin: 0;
  height: 25px;
  color: ${COLOR_GRAY_SUB};

  /* 텍스트길어져도 한줄에 표시되게 */
  white-space: nowrap;
  overflow: visible; 
`;

const RankingBox = styled.div`
  font-family: "BelgianoSerif";
  font-weight: 400;
  font-size: 263px;
  color:  ${COLOR_MUIT_RED};

  position: absolute;
  right:  420px;
  bottom: -79px;
`;

const ArrowButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
`;

const ArrowButton = styled.button`
  cursor: pointer;
  width: 10px;
  height: 20px;
  background: none;
  border: none;
  padding: 0;
  position: relative;
`;

const ArrowIcon = styled.span`
  width:  10px;
  height: 20px;
  cursor: pointer;
  align-self: center;
  color: ${COLOR_MUIT_RED};
`;

const CardBox = styled.div`
  width: 416px;
  height: 584px;
  background-color: ${COLOR_WHITE}; 
  position: relative;
  /* 실제 이미지는 PosterImage에 표시, 여긴 frame만 */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PosterImage = styled(Link)`
  width: 416px;
  height: 584px;
  object-fit: cover;
  cursor: pointer;
`;

const DotWrapper = styled.div`
  position: absolute;
  bottom: -28px;
  width: 136px; 
  display: flex;
  justify-content: center;
  gap: 24px;
  align-items: center;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  background-color: ${({ $active }) => ($active ? COLOR_MUIT_RED : COLOR_GRAY_OUTLINE)};
  cursor: pointer;
`;

const UpcomingLink = styled(Link)`
  position: absolute;
  right:  0px;
  top:  -46px;
  cursor: pointer;
  text-decoration: none;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 14px;
  color:  ${COLOR_MUIT_RED};

  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 2px;
  padding:  4px 12px 4px 12px;
`;

const RankingLink = styled(Link)`
  position: absolute;
  right:  0px;
  top:  -46px;
  cursor: pointer;
  text-decoration: none;
  font-family: "Pretendard";
  font-weight: 500;
  font-size: 14px;
  color:  ${COLOR_MUIT_RED};

  border: 1px solid ${COLOR_MUIT_RED};
  border-radius: 2px;
  padding:  4px 12px 4px 12px;
`;