declare interface IReactSpfxWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  bgcolor:Array
}

declare module 'ReactSpfxWebPartStrings' {
  const strings: IReactSpfxWebPartStrings;
  export = strings;
}
