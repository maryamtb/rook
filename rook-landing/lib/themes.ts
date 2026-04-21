export type ThemeColors = {
  name: string;
  bg: string;
  panel: string;
  surface: string;
  accent: string;
  text: string;
  subtext: string;
  codeBg: string;
  codeText: string;
  border: string;
  keyword: string;
  func: string;
  variable: string;
  type: string;
  string: string;
};

export const themes: ThemeColors[] = [
  {
    name: "Dark",
    bg: "#262626",
    panel: "#1E1E1E",
    surface: "#333333",
    accent: "#E8962E",
    text: "#CCCCCC",
    subtext: "#9D9D9D",
    codeBg: "#1E1E1E",
    codeText: "#E0E0E0",
    border: "#3C3C3C",
    keyword: "#C678DD",
    func: "#61AEEE",
    variable: "#E6C07B",
    type: "#56B6C2",
    string: "#98C379",
  },
  {
    name: "Light",
    bg: "#FFFFFF",
    panel: "#F8F8F8",
    surface: "#F1F1F1",
    accent: "#C4654A",
    text: "#343434",
    subtext: "#838383",
    codeBg: "#F5F5F7",
    codeText: "#383A42",
    border: "#E5E5E5",
    keyword: "#A626A4",
    func: "#4078F2",
    variable: "#C18401",
    type: "#0184BB",
    string: "#50A14F",
  },
  {
    name: "Terminal",
    bg: "#0D1117",
    panel: "#161B22",
    surface: "#1C2128",
    accent: "#3FB950",
    text: "#C9D1D9",
    subtext: "#8B949E",
    codeBg: "#161B22",
    codeText: "#E0E8F0",
    border: "#30363D",
    keyword: "#FF7B72",
    func: "#D2A8FF",
    variable: "#79C0FF",
    type: "#7EE787",
    string: "#A5D6FF",
  },
  {
    name: "Paper",
    bg: "#F7F6F3",
    panel: "#FAFAF9",
    surface: "#EEDED9",
    accent: "#C47035",
    text: "#343434",
    subtext: "#838383",
    codeBg: "#EEECE7",
    codeText: "#3A3530",
    border: "#E5E3DE",
    keyword: "#A626A4",
    func: "#4078F2",
    variable: "#C18401",
    type: "#0184BB",
    string: "#50A14F",
  },
  {
    name: "Midnight",
    bg: "#1E1E2E",
    panel: "#24243A",
    surface: "#2A2A44",
    accent: "#89B4FA",
    text: "#CDD6F4",
    subtext: "#A6ADC8",
    codeBg: "#2C2C44",
    codeText: "#D8E0F8",
    border: "#313244",
    keyword: "#CBA6F7",
    func: "#89B4FA",
    variable: "#94E2D5",
    type: "#F9E2AF",
    string: "#A6E3A1",
  },
];
