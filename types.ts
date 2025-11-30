export interface SlideProps {
  isActive: boolean;
  step: number; // Internal animation step within the slide
}

export interface ChartData {
  name: string;
  value: number;
  secondaryValue?: number;
  label?: string;
}

export enum SlideSection {
  Intro = "Intro",
  Insight = "Insight",
  Model = "Model",
  Result = "Result"
}
