import React from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import useCustomFetch from "../../hooks/useCustomFetch";

const token = localStorage.getItem("accessToken");

function CastList() {
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
  const castings = data.result.castings;

  return (
    <ActorsWrapper>
      {castings.map((casting, index) => (
        <Actor key={index}>
          <ProfileWrapper>
            <img src={casting.imgUrl} alt={casting.actorName} />
          </ProfileWrapper>
          <ActorName>{casting.actorName}</ActorName>
          <ActorInfo>{casting.castingName}</ActorInfo>
        </Actor>
      ))}
    </ActorsWrapper>
  );
}

export default CastList;

const ProfileWrapper = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 70%;
  border-bottom-right-radius: 10%;
  overflow: hidden;
  margin-top:40px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Actor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
`;

const ActorName = styled.div`
  font-family: Pretendard;
  font-size: 16px;
  font-weight: 500;
  color: #000;
`;

const ActorInfo = styled.div`
  font-family: Pretendard;
  font-size: 14px;
  font-weight: 500;
  color: #989898;
`;

const ActorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px; /* 간격을 더 좁게 조정 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 수직 방향으로도 정렬 */
  padding: 0; /* 여백을 없애기 */

  > div {
    flex: 0 0 calc(25% - 10px); /* 한 줄에 4개 배치 */
    box-sizing: border-box;
  }
`;

