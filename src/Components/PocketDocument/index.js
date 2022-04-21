import React, { useEffect, useState } from "react";
import { TagsList } from "../../Pages/ViewRecord/tags";
import { getRecordTagColors } from "../../Services/Axios/tagsService";
import { BsClockHistory } from "react-icons/bs";

import { StyledBigDiv } from "./styles";

const PocketDocument = ({
  registerNumber,
  city,
  state,
  requester,
  inclusionDate,
  seiNumber,
  registerId,
  situation,
  deadline,
}) => {
  const [tags, setTags] = useState([]);
  const [hasTags, sethasTags] = useState(false);
  const [strDifferenceTime, setStrDifferenceTime] = useState("");
  const [msDifferenceTime] = useState(Date.parse(deadline) - Date.now());

  useEffect(() => {
    async function fetchTags() {
      const [status, tagsList] = await getRecordTagColors(registerId);
      if (status === 200 && tagsList.length > 0) {
        setTags(tagsList);
        console.error(tags);
      }
    }

    setStrDifferenceTime(msToTime(msDifferenceTime));

    fetchTags();
  }, [registerId]);

  useEffect(() => {
    sethasTags(true);
  }, [tags]);

  function msToTime(ms) {
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Sec";
    else if (minutes < 60) return minutes + " Min";
    else if (hours < 24) return hours + " Hrs";
    else return days + " Dias";
  }

  const compareDate = () => {
    const day = 24 * 60 * 60 * 1000;
    if (msDifferenceTime < day)
      return <BsClockHistory style={{ color: "red" }} size={40} />;
    if (msDifferenceTime < 3 * day && msDifferenceTime > day)
      return <BsClockHistory style={{ color: "orange" }} size={40} />;
    if (msDifferenceTime > 3 * day)
      return <BsClockHistory style={{ color: "green" }} size={40} />;
  };

  return (
    <StyledBigDiv>
      <a href={`/ver-registro/${registerId}`} class="registerNumber">
        {registerNumber}
      </a>
      <a href={`/ver-registro/${registerId}`} class="city">
        {city}
      </a>
      <a href={`/ver-registro/${registerId}`} class="state">
        {state}
      </a>
      <a href={`/ver-registro/${registerId}`} class="requester">
        {requester}
      </a>
      <a href={`/ver-registro/${registerId}`} class="inclusionDate">
        {inclusionDate}
      </a>
      <a
        style={{ marginRight: "2rem" }}
        href={`/ver-registro/${registerId}`}
        class="seiNumber"
      >
        {seiNumber}
      </a>
      {!hasTags ? (
        <p>-</p>
      ) : (
        tags.map((item, index) => {
          return (
            index <= 2 && (
              <a
                title={item.name}
                href={`/ver-registro/${registerId}`}
                style={{
                  cursor: "pointer",
                  borderRadius: "50%",
                  width: "2.5rem",
                  height: "2.5rem",
                  margin: "1rem 0.5rem",
                  background: item.color ? item.color : "",
                }}
              ></a>
            )
          );
        })
      )}
      {deadline && situation == "pending" && (
        <a
          href={`/ver-registro/${registerId}`}
          style={{
            width: "2.5rem",
            height: "2.5rem",
            margin: "1rem 0.5rem",
          }}
          className="tooltip"
        >
          {compareDate()}
          <span className="tooltiptext">
            <p>
              Faltam: {strDifferenceTime} Prazo:{" "}
              {new Date(deadline).toLocaleDateString("pt-br")}
            </p>
          </span>
        </a>
      )}
    </StyledBigDiv>
  );
};

export default PocketDocument;
