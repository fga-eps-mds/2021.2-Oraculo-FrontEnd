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
import DivSelectSetor from "./Components/DropDownButton/DivSelectSetor";
import { StyledBigButton, StyledBody, StyledSearchBar } from "./Pages/HomePage/styles";
import { StyledFilterButton } from "./Components/FilterButton/styles";
import { StyledFilterDiv } from "./Components/Filters/styles";
import { StyledSmallButton } from "./Components/FieldsGroup/styles";
import { StyledBlueButton } from "./Components/GenericBlueButton/styles";
import { StyledRedButton } from "./Components/GenericRedButton/styles";
import { StyledWhiteButton } from "./Components/GenericWhiteButton/styles";
import { Head, StyledDropDown, StyledHeaderImage, StyledOrganizeButtons } from "./Components/HeaderWithButtons/styles";
import { DivInput } from "./Components/LoginInput/style";
import { StyledButton } from "./Components/MainButton/style";
import { StyledContainerModal } from "./Components/ModalDoubleCheck/styles";
import { StyledNavigation, StyledPagination } from "./Components/Pagination/style";
import { StyledBigDiv } from "./Components/PocketDocument/styles";
import { DivMovBlock, DivNodeBlock } from "./Components/SectionMovBlock/styles";


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

test("renders genericWhiteButton component", () => {
  render(<GenericWhiteButton/>)
});

test("renders modal component", () => {
  render(<Modal/>)
});

test("renders checkbox component", () => {
  render(<Checkbox/>)
});

test("renders TagList component", () => {
  render(<TagList/>)
});

test("renders styledbluerectangle component", () => {
  render(<StyledBlueRectangle/>)
});

test("renders styledwhiterectangle component", () => {
  render(<StyledWhiteRectangle/>)
});

test("renders styledListGroup component", () => {
  render(<StyledListGroup/>)
});

test("renders divselectsetor component", () => {
  render(<DivSelectSetor/>)
})

test("renders styledbody component", () => {
  render(<StyledBody/>)
})

test("renders styledbigbutton component", () => {
  render(<StyledBigButton/>)
})

test("renders styledsmallbutton component", () => {
  render(<StyledSmallButton/>)
})

test("renders styledfilterbutton component", () => {
  render(<StyledFilterButton/>)
})

test("renders styledfilterdiv component", () => {
  render(<StyledFilterDiv/>)
})

test("renders styledsearchbar component", () => {
  render(<StyledSearchBar/>)
})

test("renders styledbluebuttpn component", () => {
  render(<StyledBlueButton/>)
})

test("renders styledredbutton component", () => {
  render(<StyledRedButton/>)
})

test("renders styledwhitebutton component", () => {
  render(<StyledWhiteButton/>)
})

test("renders divselectsetor component", () => {
  render(<StyledBigButton/>)
})

test("renders head component", () => {
  render(<Head/>)
})

test("renders Styledheaderimage component", () => {
  render(<StyledHeaderImage/>)
})

test("renders styledorganizeButtons component", () => {
  render(<StyledOrganizeButtons/>)
})

test("renders styleddropdown component", () => {
  render(<StyledDropDown/>)
})

test("renders divinput component", () => {
  render(<DivInput/>)
})

test("renders styledbutton component", () => {
  render(<StyledButton/>)
})

test("renders styledcontainer component", () => {
  render(<StyledContainerModal/>)
})

test("renders divselectsetor component", () => {
  render(<StyledBigButton/>)
})

test("renders stylednavigation component", () => {
  render(<StyledNavigation/>)
})

test("renders styledpagination component", () => {
  render(<StyledPagination/>)
})

test("renders styledbigdiv component", () => {
  render(<StyledBigDiv/>)
})

test("renders divnodeblock component", () => {
  render(<DivNodeBlock/>)
})

test("renders divmovblock component", () => {
  render(<DivMovBlock/>)
})