import styled from "styled-components";

const Wrapper = styled.div`
min-height: 100vh;
background: #141416;
display: flex;
justify-content: space-around;
align-items: center;
img {
    border-radius: 50%;
    width: 50vh;
    height: 50vh;
    object-fit: cover;
}
@media screen and (max-width: 1020px) {
flex-direction: column;
justify-content: center;
img {
    width: 200px;
    height: 200px;
}
.infoContainer > h2 {
    font-size: 1.5rem;
}
}
`

export default Wrapper