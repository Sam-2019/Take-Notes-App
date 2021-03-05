import React from "react";
import styled from "styled-components";

import Nav from "./Nav";
import Link from "./Link";
import View from "./View";

const NoteWrapper = styled.div`
background: tomato;
  left:0;
  right: 0;
  bottom: 0,
  top: 0;
  margin: 0 auto;
  height: 100vh;
`;

const DesktopView = styled.div`
left:0;
right: 0;
bottom: 0,
top: 0;
display: flex;
justify-content: center;
  @media (max-width: 560px) {
    display: none;
  }
`;

const MobileView = styled.div`
  @media (min-width: 560px) {
    display: none;
  }
`;

const LinkWrapper = styled.div`
  margin: 0 auto;
  width: 80%;
`;

const Note = () => {
  return (
    <NoteWrapper>
      <DesktopView>
        <span role="img" aria-label="String">
          📱
        </span>
        <span className="font-italic">only</span>
      </DesktopView>

      <MobileView>
        <Nav />
        <LinkWrapper>
          <Link />
        </LinkWrapper>
      </MobileView>
    </NoteWrapper>
  );
};

export default Note;
