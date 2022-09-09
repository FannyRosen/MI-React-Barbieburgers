import React, { useEffect } from "react";
import Modal from "react-modal";
import { colors } from "./StyledComponents/mixins";
import { StyledButton } from "./StyledComponents/StyledButton";
import { StyledLink, StyledP } from "./StyledComponents/TextElements";
import { FlexDiv } from "./StyledComponents/Wrappers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: colors.LightPink,
    textDecoration: "none",
  },
};

interface IOpen {
  open: boolean;
  setOpen(): void;
}

export const MyModal = (props: IOpen) => {
  Modal.setAppElement("#root");

  return (
    <>
      <FlexDiv background={colors.LightPink}>
        <Modal
          isOpen={props.open}
          onRequestClose={() => props.setOpen()}
          style={customStyles}
        >
          <StyledButton
            onClick={() => props.setOpen()}
            width='50px'
            height='30px'
          >
            Close
          </StyledButton>
          <FlexDiv
            width='90%'
            dir='column'
            tabletdir='column'
            margin='20px'
            gap='30px'
          >
            <h2>We value your privacy</h2>
            <StyledP fontsize='18px'>
              We and our partners are using technologies like Cookies or
              Targeting and process personal data like IP-address or browser
              information in order to personalize the advertisement you see.
              These technologies may access your device and help us to show you
              more relevant ads and improve your internet experience. We also
              use it in order to measure results or align our website content.
              Because we value your privacy, we are herewith asking your
              permission to use the following technologies. You can always
              change/withdraw your consent later by clicking on the settings
              button on the left lower corner of the page.
            </StyledP>
            <FlexDiv gap='10px'>
              <StyledButton
                onClick={() => props.setOpen()}
                width='150px'
                height='30px'
              >
                OK
              </StyledButton>
            </FlexDiv>
          </FlexDiv>
        </Modal>
      </FlexDiv>
    </>
  );
};
