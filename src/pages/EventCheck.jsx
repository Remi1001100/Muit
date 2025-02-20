import React from "react";
import styled from "styled-components";
import { useEffect, useState } from "react";
import useCustomFetch from "../hooks/fetchWithAxios";

import EventSearchBar from "../components/eventcheck/EventSearchBar";
import MusicalEvent from "../components/eventcheck/MusicalEvent";
import EventContent from "../components/eventcheck/EventContent";
import MeList from "../components/Skeleton/ME-list";
import CustomSelect from "../components/eventcheck/CustomSelect";

import ChevronLeft from "../assets/icons/ChevronLeft.svg";
import ChevronRight from "../assets/icons/ChevronRight.svg";

const COLOR_MUIT_RED = "#A00000";

function EventCheck() {
  const [page, setPage] = useState(0); 

  const { data: events, error, loading } = useCustomFetch(`/events?page=${page}`);

  const ArrayOptions = [
    { value: "DailyLank", label: "일간 랭킹 순" },
    { value: "Latest", label: "최신순" },
    { value: "NearDeadline", label: "마감일순" }
  ];
  const PlaceOptions = [
    { value: "all", label: "지역 전체" },
    { value: "SeoulKyeonggi", label: "수도권" },
    { value: "PKTK", label: "경상권" }
  ]

  const handleSelectChange = (value) => {
    console.log("선택된 값:", value);
  };

  const handlePrevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  
  const handleNextPage = () => {
    if (page + 1 < events?.result?.totalPages) setPage(page + 1);
  };
  
  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  console.log('총 페이지 수:', events?.result?.totalPages);

  return (
    <Container>
      <h2 className="Title-B-500">뮤지컬의 <span className="color-txt">이벤트 일정</span>을 확인해보세요!</h2>
      <EventSearchBar/>

      <NowShowing>
        <h1 className="B-Title-B-500">현재 진행중인 뮤지컬 이벤트</h1>

        <div className="select-area">
          <CustomSelect options={ArrayOptions} 
          defaultValue="DailyLank" 
          onChange={handleSelectChange} 
          width={115}/>

          <CustomSelect options={PlaceOptions} 
          defaultValue="all" 
          onChange={handleSelectChange}
          width={100}/>
        </div>

        
        <EventListArea>
          {loading ? (
            <MeList />
          ) : (
            <>
              {events?.result?.content.map((musical) => (
                <MusicalEvent
                  key={musical.musicalId}
                  id={musical.musicalId}
                  title={musical.musicalName}
                  place={musical.place}
                  begin={musical.perFrom}
                  end={musical.perTo}
                  event={musical.eventResultListDTO}
                  count={musical.eventResultListDTO.length+1}
                />
              ))}
            </>

          )}
        </EventListArea>

        <Pagination>
          <PageButton onClick={handlePrevPage} disabled={page === 0}>
            <img src={ChevronLeft} alt="Previous" />
          </PageButton>

          {Array.from({ length: events?.result?.totalPages }, (_, index) => (
            <PageNumber
              key={index}
              onClick={() => handlePageClick(index)}
              isActive={page === index}
            >
              {index + 1}
            </PageNumber>
          ))}

          <PageButton
            onClick={handleNextPage}
            disabled={page + 1 === events?.result?.totalPages}
          >
            <img src={ChevronRight} alt="Next" />
          </PageButton>
        </Pagination>
      </NowShowing>
    </Container>
  );
}

const Container = styled.div`
  font-family: Pretendard;
  padding: 100px;

  display: flex;
  align-items: center;
  flex-direction: column;

  h2{
    margin-bottom: 140px;
  }
  .Title-B-500{
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: #000;
  }
  .color-txt{
    color: ${COLOR_MUIT_RED}
  }
`
const NowShowing = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;

  margin-top: 120px;

  h1{
    margin: 0px;
  }
  .B-Title-B-500{
    color: #000;
    font-size: 36px;
    font-style: normal;
    font-weight: 700;

    margin-bottom: 32px;
  }
  .select-area{
    display: flex;
    gap: 20px;
  }
`
const EventListArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding-top: 60px;
  gap: 100px;
`
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`
const PageButton = styled.button`
  background: none;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  padding: 5px;
`
const PageNumber = styled.span`
  cursor: pointer;
  padding: 0px 2.5px;
  font-size: 16px;
  font-style: normal;
  font-weight: ${({ isActive }) => (isActive ? "700" : "500")};
  color: ${({ isActive }) => (isActive ? "#A00000" : "#919191")};
`
export default EventCheck;
