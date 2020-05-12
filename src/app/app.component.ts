import {Component} from '@angular/core';
import {elementOfSearch} from '../assets/elementOfSearch';
import {legendOfGame} from '../parser/legendsParse/legendOfGame';
import {ParserComputerGameFromURL} from '../parser/parserComputerGame';
import {ParsedGame} from '../parser/parsedGame';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'parserComputerGame';
  url: string;
  data: elementOfSearch[] = [];
  legendOfParse;
  decoder: TextDecoder;
  parser: ParserComputerGameFromURL

  constructor() {
    this.legendOfParse = legendOfGame;
    this.parser = new ParserComputerGameFromURL(legendOfGame);
  }

  public downloadParsedFiles(): void {
    for (let currentPage = 1; currentPage <= this.legendOfParse.pages; currentPage++) {
      fetch(this.url + this.legendOfParse.templateUrl)
        .then((response) => {
          response.body.getReader()
            .read()
            .then(({value, done}) => {
              const parsedGame: ParsedGame = this.parser.getParsedDocument(value);
              this.downloadImage(parsedGame.imageUrl);
              this.writeContents(parsedGame.fileContent, parsedGame.fileName + '.scs', 'text/plain');
            });
        })
        .then(data => console.log(data));
    }
  }


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
}
