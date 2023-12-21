import styled from "styled-components";

const Wrapper = styled.div`
max-width: 700px;

.diceContainer {
  min-width: 520px;
  min-height: 220px;
  padding: 20px;
  margin: auto;
  //margin-top: 50px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
}

.die {
  background-color: yellow;
  height: 80px;
  width: 80px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-weight: 800;
  font-size: 2.5rem;
  box-shadow: 0px 2px 2px 0px #00000026;
}
.timeDisplay {
  min-width: 200px;
}

svg {
   
}


@media screen and (max-width: 991px) {
   // height: 100vh;
  .mainContainer {
    width: 100%;
  }  
  .diceContainer {
  min-width: 420px;
  min-height: 180px;
  padding: 10px;
  margin: auto;
  //margin-top: 150px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
}
.die {
  height: 60px;
  width: 60px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  font-weight: 800;
  font-size: 2.5rem;
  box-shadow: 0px 2px 2px 0px #00000026;
}
}
`

export default Wrapper