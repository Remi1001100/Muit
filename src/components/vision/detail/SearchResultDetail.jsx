import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const SearchResultDetail = ({ id, theatreName, address, theatrePic, onClick }) => {
    const navigate = useNavigate();
    
    const ToVisionDetail = () => {
        navigate(`/vision/${id}`, {
            replace: false,
            state: { theatreId: id },
        });
        onClick();
    };

    return (
        <Container onClick={ToVisionDetail}>
            {theatrePic ? (
                <img src={theatrePic} className="theatrePic" alt={theatreName} />
            ) : (
                <div className="placeholderPic"></div>
            )}
            
            <div className="textArea">
                <h3 className="body-B-600">{theatreName}</h3>
                <p className="body-M-600">{address}</p>
            </div>
        </Container>
    );
};

export default SearchResultDetail;

const Container = styled.div`
    position: absolute;

    margin-bottom: 8px;
    font-family: Pretendard;
    display: flex;
    gap: 12px;

    box-sizing: border-box;
    width: 100%;
    align-items: center;

    background: #FFF;
    cursor: pointer;

    .theatrePic {
        width: 260px;
        height: 150px;
        object-fit: cover;
        border-radius: 4px;
    }

    .placeholderPic {
        width: 260px;
        height: 150px;
        background-color: #ccc;
        border-radius: 4px;
    }
    h3{margin: 0px;}
    p{margin: 0px;}
    .textArea{
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .body-B-600 {
        color: #000;
        font-size: 14px;
        font-weight: 700;    
    }

    .body-M-600 {
        color: #919191;
        font-size: 12px;
        font-weight: 500;
    }
`