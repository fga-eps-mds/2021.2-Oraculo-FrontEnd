import { render } from "@testing-library/react";
import RegistrationScreen from "./Pages/RegistrationScreen"
import ViewAllFields from "./Pages/ViewAllFields"
import App from "./App";
import MainButton from "./Components/MainButton";
import HeaderWithButtons from "./Components/HeaderWithButtons";
import { StyledAlertDialog, TagList } from "./Components/AddTagDialog/styles";
import GenericBlueButton from "./Components/GenericBlueButton";
import { Checkbox, Modal } from "antd";
import GenericWhiteButton from "./Components/GenericWhiteButton";
import { StyledBlueRectangle, StyledWhiteRectangle } from "./Pages/CreateRecord/styles";
import { StyledListGroup } from "./Components/Departments/style";


test("renders main app component", () => {
  render(<App />);
});

test("renders main button component", () => {
  render(<MainButton />);
});

test("renders header with buttons component", () => {
  render(<HeaderWithButtons/>);
});


describe("RegistrationScreen test", () => {
  test("Should render RegistrationScreen ",  () => {
    render(<RegistrationScreen/>)
  });
})

describe("ViewAllFields test", () => {
  test("Should render ViewAllFields ",  () => {
    render(<ViewAllFields/>)
  });
})

describe("ViewAllTags test", () => {
  test("Should render ViewAllTags ",  () => {
    render(<ViewAllFields/>)
  });
})


test("renders styyledalert buttons component", () => {
  render(<StyledAlertDialog/>)
});

test("renders genericbluebutton buttons component", () => {
  render(<GenericBlueButton/>)
});

test("renders genericWhiteButton compenent", () => {
  render(<GenericWhiteButton/>)
});

test("renders modal component", () => {
  render(<Modal/>)
});

test("renders checkbox compenent", () => {
  render(<Checkbox/>)
});

test("renders TagList compenent", () => {
  render(<TagList/>)
});

test("renders styledbluerectangle compenent", () => {
  render(<StyledBlueRectangle/>)
});

test("renders styledwhiterectangle compenent", () => {
  render(<StyledWhiteRectangle/>)
});

test("renders styledListGroup compenent", () => {
  render(<StyledListGroup/>)
});
