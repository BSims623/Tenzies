import styled from "styled-components";

const Wrapper = styled.div`
max-width: 700px;
.diceContainer {
  width: 100%;
  min-height: 41vw;
  max-height: 200px;
  padding: 15px;
  display: grid;
  gap: 15px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.die {
  background-color: yellow;
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20%;
  box-shadow: inset 0 0 0 5px #dc3545;
}

@media screen and (min-width: 700px) {
  margin-top: 5rem;
    .diceContainer {
        min-height: 280px;
    }
}
`

export default Wrapper