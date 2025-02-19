import React, { useEffect, useState } from "react";
import styled from "styled-components";
import VisionDetailMain from "../../VisionDetail";
import useCustomFetch from "../../../hooks/fetchWithAxios";

function Seats({ musicalId }) {
  const { fetchData } = useCustomFetch();
  const { data: musical, loading: musicalLoading } = useCustomFetch(`/musicals/${musicalId}`);
  console.log(musical?.result?.theatreId);

  return (
    <Container style={{ transform: "scale(0.7)", transformOrigin: "top left" }}>
      <VisionDetailMain theatreId={musical?.result?.theatreId} />
    </Container>
  );
}
const Container = styled.div`

`

export default Seats;
