import {Component} from '@angular/core';
import {elementOfSearch} from '../assets/elementOfSearch';
import {parsingMode} from './parsingMode';
import {legendOfGame, templateGame} from './legendOfGame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parserComputerGame';
  url: string;
  indexParse: number;
  data: elementOfSearch[] = [];
  legendOfParse: any = legendOfGame;
  currentPage: number;
  allUrlGames = '';


  writeContents(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  downloadImage(url) {
    const a = document.createElement('a');
    a.href = url;
    a.download = url;
    a.click();
  }

  public getPage(): void {
    this.currentPage = 1;
    const decoder = new TextDecoder('utf-8');
    console.log(this.legendOfParse.pages);
    for (; this.currentPage <= this.legendOfParse.pages; this.currentPage++) {
      console.log(this.url + this.legendOfParse.templateUrl + this.currentPage);
      fetch(this.url + this.legendOfParse.templateUrl)
        .then((response) => {
          response.body.getReader()
            .read()
            .then(({value, done}) => {
              this.data = this.parseDocumentbyLegend(decoder.decode(value), this.legendOfParse);
              let fileContent = templateGame;
              let fileName = 'concept_computer_game_'
              this.data.forEach((element) => {
                if (element.name === 'nameGame') {
                  element.value = element.value.toLowerCase();
                  fileName += element.value;

                }
                if (element.name === 'imageGame') {
                  this.downloadImage(element.value);
                  element.value = 'file://' + element.value.substring(element.value.lastIndexOf('/') + 1) + '.jfif';
                }
                fileContent = fileContent.split(element.name).join(element.value);
              })

              this.writeContents(fileContent, fileName+'.scs', 'text/plain');
            });
        })
        .then((data) => {
        });
    }
  }

  private parseDocumentbyLegend(document: string, legendObject: any): elementOfSearch[] {
    const data: elementOfSearch[] = [];
    this.indexParse = 0;
    this.legendOfParse.legend.forEach((legendElement) => {
      do {
        const element = new elementOfSearch(legendElement.name,
          this.legendOfParse.prefix
          + this.parseElement(document, legendElement, this.indexParse).replace(/ /g, legendElement.separator));
        if (this.indexParse !== -1) {
          data.push(element);
          this.allUrlGames += data[data.length - 1].value + '\n';
        } else {
          break;
        }
      } while (this.legendOfParse.mode === parsingMode.reapitable.valueOf());
    });
    return data;
  }

  private parseElement(document: string, legendElement: any, indexOfStart = 0): string {
    legendElement.search.forEach((searchElement) => {
      indexOfStart = document.indexOf(searchElement, indexOfStart + 1);
      if (indexOfStart === -1) {
        this.indexParse = -1;
      }
    });
    const indexOfEnd = document.indexOf(legendElement.end, indexOfStart + 1);
    if (this.legendOfParse.mode === parsingMode.reapitable.valueOf() && this.indexParse !== -1) {
      this.indexParse = indexOfStart;
    }
    return document.substring(indexOfStart + 1, indexOfEnd);
  }
}
