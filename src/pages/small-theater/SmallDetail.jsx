import React from "react";
import styled from "styled-components";
import posterImg from "../../assets/images/lost-pic.png";
import Info from "../../components/detail/Info";
import pic from "../../assets/images/lost-pic.png";
import ChevronDown from '../../assets/icons/ChevronDown.svg';
import DetailImg from "../../assets/images/lost-detail.png";
import CastList from "../../components/small-theater/CastList";
import CreditInfo from "../../components/small-theater/CreditInfo";
import { useNavigate, useParams } from "react-router-dom";
//import useFetch from "../../hooks/useFetch";
import useCustomFetch from "../../hooks/useCustomFetch";
//const token = import.meta.env.VITE_APP_ACCESS_TOKEN;
const token = localStorage.getItem("accessToken");


function SmallDetail() {
  const navigate = useNavigate();
  const { amateurId } = useParams();  // amateurId를 URL 파라미터에서 가져옵니다.

  console.log(amateurId);
  const url = `/amateurs/${amateurId}`;

  const { data, error, loading } = useCustomFetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });
  
  // 로딩 상태 처리
  if (loading) return <div>Loading...</div>;
  if (error || !data) return <div>데이터를 불러오지 못했습니다.</div>;

  // API에서 받아온 데이터를 처리합니다.
  const musical = data.result; 
  const name = musical.name;
  const content = musical.summaries.content || ''; // content가 없으면 빈 문자열로 처리
  const [quote, ...descriptionParts] = content.split("\n");
  const description = descriptionParts.join("\n").replace(/\n/g, "<br />");

  const imageUrls = musical.notice.imgUrls; 
  const poster =  musical.posterImgUrl
  const detailImg=DetailImg;
  const details = [
    { label: "장소", value: musical.place},
    { label: "공연 기간", value: musical.schedule },
    { label: "공연 시간", value: musical.runtime },
    { label: "관람 연령", value:musical.age },
    { label: "출연", value: musical.starring },
    { label: "가격", value: <Price>
      <div className="item">
        <div className="type">일반예매</div>
        <div className="price">10,000원</div>
      </div>
      <div className="item">
        <div className="type">지인, 홍대생 할인</div>
        <div className="price">7,000원</div>
      </div>
    </Price> }, // 가격 상세 구현 필요
    { label: "티켓 수", value: "200매 (표가 없을 시 구매 불가)" },
  ];

  return (
    <>
      {/*빨간배너 */}
       <BannerContainer poster={poster}>
                <Header>{name}</Header>
                <TagWrapper>
             {musical.hashtag
            .split(" ")
            .map((tag, index) => <Tag key={index}>{tag.replace("#", "")}</Tag>)}
            </TagWrapper>
            <Quote>{quote}</Quote>
            <Description dangerouslySetInnerHTML={{ __html: description }} />

                <ChevronWrapper>
                  <img src={ChevronDown} style={{ display: 'block', marginTop: '20px' }} />
                </ChevronWrapper>
            </BannerContainer>

      {/* 본문 */}
      <MainContent>
        <div style={{margin:'60px 100px', display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
           {/* 공연 상세 정보, 예매 버튼, 캐스팅 정보 등 구현 예정 */}
        <LeftSection>

        <TitleWrapper>
          <h1>{name}</h1>
        </TitleWrapper>

        <Info image={poster} alt='포스터 이미지' height='430px' details={details} />

        {/*하단 nav bar */}
        </LeftSection>

        <RightSection>
        <PurchaseButton onClick={() => navigate(`/small-detail/buy/${amateurId}`)}>
              예매하러 가기
            </PurchaseButton>
        </RightSection>
        </div>
      </MainContent>
      <BottomSection>
        <Label>공연 정보
        <Title>공연시간 정보</Title>
        <Text>{musical.timeInfo}</Text>
        <Title>공지사항</Title>
        <Text> {musical.notice.content}</Text>
        </Label>
        {imageUrls && imageUrls.length > 0 && (
  <DetailImageWrapper>
    {imageUrls.map((url, index) => (
      <DetailImage key={index}>
        <img src={url} alt={`Detail Image ${index + 1}`} style={{ width: '100%', height: '100%' }} />
      </DetailImage>
    ))}
  </DetailImageWrapper>
)}
        <Label>캐스팅 정보</Label>
        <CastList/>  {/*사진 간격 조정필요 */}
        <Title>감독 및 스태프</Title>
        <CreditInfo/>
      </BottomSection>
   </>
    
  );
}

export default SmallDetail;
/*빨간배너 */
const BannerContainer = styled.div`
  background: linear-gradient(
      var(--Muit-Red-main, #A00000),
      rgba(160, 0, 0, 0.5)
    ),
   url(${(props) => props.poster}) no-repeat center center / cover;
  width: 1250px;
  height:822px;
  padding: 101px 95px;
  position: relative;
`;

const Header = styled.div`
  color: #FFF;
  /* Headline-lg-ko */
  margin:0;
  padding:0;
  margin-bottom:20px;
  font-family: Pretendard;
  font-size: 80px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -1.6px;
`

const ChevronWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  img {
    display: block;
  }
`;

const Quote = styled.blockquote`
  color: #FFF;
  font-family: 'KoPub_Batang_Medium', serif;
  margin: 0px;
  margin-bottom: 28px;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

const Description = styled.div`
  color: #FFF;
  width: 870px;
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  line-height: 30px; /* 156.25% */
`
const Tag = styled.li`
  display: flex;
  width: 120px;
  height: 28px;
  padding: 1px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Gray-outline, rgba(230, 230, 230, 0.7));

  color: #FFF;

  /* Body-me */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
`


const TagWrapper = styled.ul`
  display:flex; 
  flexDirection:row;
  gap:12px;
  padding:0px;
  margin-bottom: 136px;
          
`
/*메인*/
const MainContent = styled.div`
  font-family: Arial, sans-serif;
  
`;

const Price = styled.div`
  /* body-16-medium */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px; /* 156.25% */
  display: flex;
  flex-direction: column; /* 세로 방향 배치 */
  gap: 5px; /* 항목 간 간격 조절 */

  .item {
    display: flex; /* 가로 방향 배치 */
    align-items: center; /* 수직 가운데 정렬 */
  }

  .type {
    color: #919191;
  }

  .price {
    color: black;
    margin-left: 5px; /* 가격과의 간격 조절 */
  }
`;


const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
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


const LeftSection = styled.div`
`;

const RightSection = styled.div`
  margin-top: 63px;
`;

const PurchaseButton = styled.button`
  width: 300px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 3px;
  border: 1px solid var(--Muit-Red-main, #A00000);
  background: var(--Muit-Red-main, #A00000);
  color: #FFF;
  cursor:pointer;

  /* Body-bold */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`
/* 하단 */
const BottomSection=styled.div`
  margin-top: -40px;
  margin-left:100px;
`
const Label=styled.div`
color: var(--Muit-Red-main, #A00000);
flex-direction: column;

/* title-24-bold */
font-family: Pretendard;
font-size: 24px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const Title=styled.div`
color: #000;
flex-direction: column;
margin-top: 28px;

/* Body-bold */
font-family: Pretendard;
font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
`
const Text=styled.div`
color: #000;
flex-direction: column;
margin-top: 15px;
margin-bottom: 20px;

/* Body-me */
font-family: Inter;;
font-size: 16px;
font-style: normal;
font-weight: 500;
line-height: 25px; /* 156.25% */
`
const DetailImageWrapper = styled.div`
  display: flex;
  gap: 20px; /* 이미지 간 간격 */
  margin-bottom: 60px;
`;

const DetailImage = styled.div`
  width: 500px;
  height: 888px;
  flex-shrink: 0;
`;
