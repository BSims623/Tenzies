import styled from "styled-components";

const Wrapper = styled.div`
background: #141416;
.bi {
    font-size: 3rem;
}
img {
    width: 500px;
    object-fit: cover;
}

@media screen and (max-width: 985px) {
    img {
        display: none;
    }
}
`

export default Wrapper