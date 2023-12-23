import styled from "styled-components";

const Wrapper = styled.nav`
border-bottom: 5px solid #dc3545;
background: #141416;
img {
    border-radius: 50%;
    width: 24px;
    height: 24px;
    object-fit: cover;
}
.profileBtn {
    border: 2px solid #dc3545;
    background: #141416;
}
.profileBtn:hover {
    border: 2px solid #dc3545;
    background: #212529;
}
`

export default Wrapper