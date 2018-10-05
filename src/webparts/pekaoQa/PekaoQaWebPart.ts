import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'pekaoQaStrings';
import PekaoQa from './components/PekaoQa';
import { IPekaoQaProps } from './components/IPekaoQaProps';
import { IPekaoQaWebPartProps } from './IPekaoQaWebPartProps';
//dodawanie customowych styli
import { SPComponentLoader } from '@microsoft/sp-loader';


export default class PekaoQaWebPart extends BaseClientSideWebPart<IPekaoQaWebPartProps> {
  //dodanie customowego cssa
  protected onInit(): Promise<void> {
    if (document.location.href.indexOf('/_layouts/15/workbench.aspx') != -1) {
      SPComponentLoader.loadCss('/_layouts/15/1045/styles/Pekao.Intranet.UI/bootstrap.min.css');
    }
    return super.onInit();
  }
  //zmiana widoczności opcji w menu w zależności od ustawienia
  // protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
  //   if (propertyPath === 'showPager') {
  //       console.log("showPager:"+newValue);

  //     // refresh the item selector control by repainting the property pane
  //     this.context.propertyPane.refresh();
  //   }
  //   else {
  //     super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  //   }
  // }
  private validateIsEmpty(value: string): string {
    if (value === null ||
      value.trim().length === 0) {
      return strings.FieldRequired;
    }
    return '';
  }
  public render(): void {
    const element: React.ReactElement<IPekaoQaProps> = React.createElement(
      PekaoQa,
      {
        listName: this.properties.listName,
        categoryField: this.properties.categoryField,
        orderField: this.properties.orderField,
        questionField: this.properties.questionField,
        answerField: this.properties.answerField,
        activeField: this.properties.activeField,
        pageLength: this.properties.pageLength,
        showSearchBox: this.properties.showSearchBox,
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        displayMode: this.displayMode,
        showPager: this.properties.showPager,
        itemsExpanded: this.properties.itemsExpanded,
        toggleCloseRemining: this.properties.toggleCloseRemining,
        contentSourceType: this.properties.contentSourceType ? 1 : 0,
        searchQuery: this.properties.searchQuery,
        searchRowLimit: this.properties.searchRowLimit,
        cssStyles:this.properties.cssStyles
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },

          groups: [
            {
              groupName: strings.WebConfigGroupName,
              groupFields: [
                PropertyPaneToggle('contentSourceType', {
                  label: strings.ContentSourceTypeLabel,
                  offText: strings.ContentSourceTypeLabelWeb,
                  onText: strings.ContentSourceTypeLabelSearch
                }),
                PropertyPaneTextField('listName', {
                  label: strings.ListNameLabel,
                  disabled: this.properties.contentSourceType
                }),
                PropertyPaneTextField('searchQuery', {
                  label: strings.SearchQueryLabel,
                  disabled: !this.properties.contentSourceType
                }),
                PropertyPaneTextField('searchRowLimit', {
                  label: strings.SearchRowLimit,
                  disabled: !this.properties.contentSourceType
                })
              ]
            },
            {
              groupName: strings.ListConfigGroupName,
              groupFields: [
                PropertyPaneTextField('categoryField', {
                  label: strings.CategoryFieldLabel
                }),
                PropertyPaneTextField('orderField', {
                  label: strings.OrderNoFieldLabel
                }),
                PropertyPaneTextField('questionField', {
                  label: strings.QuestionFieldLabel,
                  onGetErrorMessage: this.validateIsEmpty.bind(this)
                }),
                PropertyPaneTextField('answerField', {
                  label: strings.AnswerFieldLabel,
                  onGetErrorMessage: this.validateIsEmpty.bind(this)
                }),
                PropertyPaneTextField('activeField', {
                  label: strings.ActiveFieldLabel
                }),

              ]
            },
            {
              groupName: strings.DisplaySettingsGroupName,
              groupFields: [
                PropertyPaneToggle('showPager', {
                  label: strings.ShowPagerLabel,
                  offText: strings.ShowPagerLabelNo,
                  onText: strings.ShowPagerLabelYes
                }),
                PropertyPaneSlider('pageLength', {
                  min: 0,
                  max: 20,
                  step: 5,
                  showValue: true,
                  label: strings.PageLengthLabel,
                  disabled: !this.properties.showPager
                }),
                PropertyPaneToggle('showSearchBox', {
                  label: strings.ShowSearchBoxLabel,
                  offText: strings.ShowSearchBoxLabelNo,
                  onText: strings.ShowSearchBoxLabelYes
                }),
                PropertyPaneTextField('cssStyles', {
                  label: strings.CssStylesLabel
                })
              ]
            },
            {
              groupName: strings.ToggleGroupName,
              groupFields: [
                PropertyPaneToggle('itemsExpanded', {
                  label: strings.ItmesExpandedLabel,
                  offText: strings.ItmesExpandedLabelNo,
                  onText: strings.ItmesExpandedLabelYes
                }),
                PropertyPaneToggle('toggleCloseRemining', {
                  label: strings.ToggleBehaviorAfterOpenLabel,
                  offText: strings.ToggleBehaviorAfterOpenLabelNo,
                  onText: strings.ToggleBehaviorAfterOpenLabelYes
                })

              ]
            }
          ]
        }
      ]
    };
  }
}
