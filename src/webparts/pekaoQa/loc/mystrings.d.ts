declare interface IPekaoQaStrings {
  PropertyPaneDescription: string;
  WebConfigGroupName: string;
  ListConfigGroupName:string
  DescriptionFieldLabel: string;
  ListNameLabel: string;
  SearchQueryLabel:string;
  SearchRowLimit:string;
  ContentSourceTypeLabel:string;
  ContentSourceTypeLabelWeb:string;
  ContentSourceTypeLabelSearch:string;
  CategoryFieldLabel: string;
  OrderNoFieldLabel: string;
  QuestionFieldLabel: string;
  AnswerFieldLabel: string;
  ActiveFieldLabel: string;
  DisplaySettingsGroupName: string;
  PageLengthLabel: string;
  ShowSearchBoxLabel: string;
  ShowSearchBoxLabelYes: string;
  ShowSearchBoxLabelNo: string;
  FieldRequired: string;
  ShowPagerLabel: string;
  ShowPagerLabelYes: string;
  ShowPagerLabelNo: string;
  ToggleGroupName: string;
  ItmesExpandedLabel:string;
  ItmesExpandedLabelYes:string;
  ItmesExpandedLabelNo:string;
  ToggleBehaviorAfterOpenLabel:string;
  ToggleBehaviorAfterOpenLabelYes:string;
  ToggleBehaviorAfterOpenLabelNo:string;
  CssStylesLabel:string;
}

declare module 'pekaoQaStrings' {
  const strings: IPekaoQaStrings;
  export = strings;
}
