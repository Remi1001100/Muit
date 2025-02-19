import styled from "styled-components";
import useCustomFetch from "../../../hooks/fetchWithAxios";

const SeatView = (props) => {
    const { data, error, loading } = useCustomFetch(
        `/theatres/${props.theatreId}/sectionType?sectionType=${props.area}`
    );
    console.log(data);

    return (
        <View>
            <p className="body-B-600">{data?.result?.seatRange}</p>
            <div className="feature">
                <span className="body-M-600">{data?.result?.viewDetail}</span>
            </div>
            <ImageContainer>
                {data?.result?.viewPic ? (
                    <img src={data.result.viewPic} alt="좌석 뷰" className="view-img" />
                ) : (
                    <GrayBox/>
                )}
            </ImageContainer>
            {/*<p className="body-M-500">F구역 5열 1번</p>*/}

        </View>
    )
}

const View = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;

    .view-img{
        width: 400px;
        margin-top: 8px;
    }
    .feature{
        display: flex;
        gap: 10px;
    }
    .body-B-600{
        font-size: 16px;
        font-weight: 700;
        color: #000000;      
    }
    .body-M-600{
        color: var(--Gray-maintext, #000);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
    }
    .body-M-500{
        color: var(--Gray-maintext, #919191);
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
    }
`
const ImageContainer = styled.div`
    img{
        width: 400px;
        height: 250px;
        object-fit: cover;
    }
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GrayBox = styled.div`
    width: 100%;
    height: 100%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 16px;
    font-weight: bold;
`;


export default SeatView;