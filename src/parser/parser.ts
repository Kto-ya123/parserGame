import {elementOfSearch} from '../assets/elementOfSearch';
import {parsingMode} from './parsingMode';

export class Parser {

  legendOfParse: any;
  private indexParse = 0;


  constructor(legendOfParse: any) {
    this.legendOfParse = legendOfParse;
  }

  public parseDocumentByLegend(document: string): elementOfSearch[] {
    const data: elementOfSearch[] = [];
    this.legendOfParse.legend.forEach((legendElement) => {
      data.push(...this.addPrefixAndReplaceSymbol(
        this.parseElement(document, legendElement, this.legendOfParse.mode === parsingMode.reapitable.valueOf()),
        legendElement));
    });
    return data;
  }

  addPrefixAndReplaceSymbol(elements: elementOfSearch[], legendOfElement): elementOfSearch[] {
    elements.forEach((element) => {
      element.value = this.legendOfParse.prefix + element.value.replace(/ /g, legendOfElement.separator);
    });
    return elements;
  }

  private parseElement(document: string, legendElement: any, reapitable: boolean, indexOfStart = 0): elementOfSearch[] {
    const elements: elementOfSearch[] = [];
    do {
      legendElement.search.forEach((searchElement) => {
        indexOfStart = document.indexOf(searchElement, indexOfStart + 1);
      });

      if (indexOfStart !== -1) {
        const indexOfEnd = document.indexOf(legendElement.end, indexOfStart + 1);
        console.log(indexOfStart);
        console.log(indexOfEnd);
        console.log(document.substring(indexOfStart + 1, indexOfEnd));
        elements.push(new elementOfSearch(legendElement.name, document.substring(indexOfStart + 1, indexOfEnd)));
      }
    }while (indexOfStart !== -1 && reapitable);
    return elements;
  }
}
