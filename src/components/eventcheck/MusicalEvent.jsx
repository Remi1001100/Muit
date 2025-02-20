import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useCustomFetch from "../../hooks/fetchWithAxios";

import EventContent from "./EventContent";
import formatDate from "../../utils/formatDate";
import { useEffect, useState } from "react";
import HeartButton from "../HeartButton";

const MusicalEvent = (props) => {
  const navigate = useNavigate();
  const { fetchData } = useCustomFetch();
  const [isLike, setIsLike] = useState(false);

  const cardClick = () => {
    navigate("/event-check/" + props.id, {
      replace: false,
      state: { musicalId: props.id },
    });
  };

  const { data: musicals, error, loading } = useCustomFetch(`/musicals/${props.id}`);

  console.log("이벤트개수:", props?.count);
  useEffect(() => {
    if (musicals?.result) {
      setIsLike(musicals.result.isLike);
    }
  }, [musicals]);

  return (
    <Card>
      <MusicalInfo>
        <img src={musicals?.result?.posterUrl} className="poster" onClick={cardClick} />
        <MusicalDetail>
          <div className="detail-text">
            <h3 className="title-B-600">{props.title}</h3>
            <div>
              <p className="body-M-600">{props.place}</p>
              <p className="body-M-500">
                {formatDate(props.begin)}~{formatDate(props.end)}
              </p>
            </div>
          </div>
          <HeartButton setLiked={setIsLike} liked={isLike} musicalId={props.id} width="36px" />
        </MusicalDetail>
      </MusicalInfo>
      <EventArea>
        {props?.event.map((musical, index, arr) => {
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
      </EventArea>
    </Card>
  );
};

const Card = styled.div`
  font-family: Pretendard;
  width: 330px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`

const MusicalInfo = styled.div`
  display: flex;
  height: 200px;
  gap: 20px;
  .poster {
    width: 140px;
    height: 200px;
  }
`

const MusicalDetail = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  .detail-text {
    display: flex;
    flex-direction: column;
    gap: 26px;
  }
  h3 {
    margin: 0px;
  }
  p {
    margin: 0px;
  }
  .title-B-600 {
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    color: #000;
  }
  .body-M-600 {
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    color: #000;
  }
  .body-M-500 {
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    color: #919191;
  }
  .heart-icon {
    width: 36px;
    position: relative;
    left: 0%;
    bottom: 0%;
    cursor: pointer;
  }
`

const EventArea = styled.div`
  width: 320px;
  display: flex;
  flex-direction: column;
  //gap: 20px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  padding: 8px 12px;
`

export default MusicalEvent;
