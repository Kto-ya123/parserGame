import {templateGame} from './legendsParse/legendOfGame';
import {elementOfSearch} from '../assets/elementOfSearch';
import {Parser} from './parser';
import {ParsedGame} from './parsedGame';

export class ParserComputerGameFromURL {
  private parser: Parser;
  private decoder;


  constructor(private legendOfParse: any) {
    this.decoder = new TextDecoder('utf-8');
    this.parser = new Parser(legendOfParse);
  }

  getParsedDocument(value: any): ParsedGame {
    const data: elementOfSearch[] = this.parser.parseDocumentByLegend(this.decoder.decode(value));
    const parsedGame: ParsedGame = new ParsedGame(this.legendOfParse.prependFileName, templateGame);

    data.forEach((element) => {
      if (element.name === 'nameGame') {
        element.value = element.value.toLowerCase();
        parsedGame.fileName += element.value;
      }

      if (element.name === 'imageGame') {
        parsedGame.imageUrl = element.value;
        element.value = 'file://' + element.value.substring(element.value.lastIndexOf('/') + 1);
      }

      parsedGame.fileContent = parsedGame.fileContent.split(element.name).join(element.value);
    });

    return parsedGame;
  }
}
