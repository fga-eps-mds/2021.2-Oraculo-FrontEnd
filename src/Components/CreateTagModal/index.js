import { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  CircleColor,
  ColorPickerDiv,
  StyledCreateTag,
} from "./styles";
import GenericBlueButton from "../GenericBlueButton";
import GenericWhiteButton from "../GenericWhiteButton";

import {
  createTag,
} from "../../Services/Axios/processService";
import toast from "react-hot-toast";
import { ChromePicker } from "react-color";

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30vw",
    height: "50vh",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    overflow: "scroll",
  },
};

const CreateTagModal = ({ onAction }) => {
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const [color, setColor] = useState("#FFF");
  const [nameTag, setNameTag] = useState("");
  const [modal] = useState(true);

  const addTag = async ()=> {
    await createTag(nameTag, color, toast)
    onAction();
  }

  useEffect(() => {
    Modal.setAppElement('body');
  }, [onAction]);

  return (
    <div>
      {/* Add new modal to create a new tag */}
      <Modal isOpen={modal} contentLabel="Nova tag" style={modalStyle}>
        <StyledCreateTag>
          <h1>Nova Tag</h1>
          <p>Nome:</p>
          <div className="input-section">
            <input
              type="text"
              value={nameTag}
              onChange={(event) => setNameTag(event.target.value)}
            />
            <div>
              <p>Cor:</p>
              <CircleColor
                style={{ cursor: "pointer", backgroundColor: color }}
                onClick={() => setOpenColorPicker(!openColorPicker)}
              />
            </div>
          </div>
          {openColorPicker ? (
            <ColorPickerDiv>
              <ChromePicker
                color={color}
                onChangeComplete={(c) => setColor(c.hex)}
              />
            </ColorPickerDiv>
          ) : null}
          <div className="endOfPageDiv">
            {/* Button to return to another modal */}
            <GenericWhiteButton
              title="Cancelar"
              onClick={() => {
                setNameTag("");
                setColor("");
                onAction();
              }}
            />
            <GenericBlueButton
              title="Criar"
              onClick={() => {
                addTag();
                setNameTag("");
                setColor("");
              }}
            />
          </div>
        </StyledCreateTag>
      </Modal>
    </div>
  );
};

export default CreateTagModal;
