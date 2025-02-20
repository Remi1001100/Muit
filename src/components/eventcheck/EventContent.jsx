import styled from "styled-components";
import formatDateWithDay from "../../utils/formatDateWithDay";

const EventContent = ({ content, startAt, finishAt, isSelected, isLast, duration }) => {
  return (
    <Container isSelected={isSelected}>
      <Left isSelected={isSelected}>
        <div className="circle" />
        {!isLast && <VerticalLine />}
      </Left>
      <EventCard isSelected={isSelected} isLast={isLast}>
        <p className="body-M-600">{duration}</p>
        <p className="S-body-M-600">{content}</p>
      </EventCard>
    </Container>
  );
};

const Container = styled.div`
  font-family: Pretendard;
  display: flex;
  justify-content: start;
  gap: 25px;
  height: 74px;
  padding-top: 12px;
`
const Left = styled.div`
  .circle {
    margin-top: 5px;
    box-sizing: border-box;
    width: ${({ isSelected }) => (isSelected ? "24px" : "20px")};
    height: ${({ isSelected }) => (isSelected ? "24px" : "20px")};
    backgrond: #FFF;
    border: ${({ isSelected }) => (isSelected ? "5px solid #A00000" : "1px solid #919191")};
    border-radius: 50%;
  }
`
const VerticalLine = styled.div`
  width: 1px;
  height: 65px;
  background-color: #919191;
  margin: 0 auto;
`

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80%;

  border-bottom: ${({ isLast }) => (isLast ? "none" : "1px solid #E6E6E6")};
  padding: 0 0 12px 0;

  p {
    margin: 0;
  }
  
  .body-M-600 {
    font-size: 16px;
    font-weight: 500;
    color: ${({ isSelected }) => (isSelected ? "#A00000" : "#000")};
  }
  
  .S-body-M-600 {
    font-size: 14px;
    font-weight: 500;
    color: ${({ isSelected }) => (isSelected ? "#A00000" : "#000")};
  }
`

export default EventContent;
