import {parsingMode} from '../parsingMode';


export const legendOfGames = {
    mode: parsingMode.reapitable.valueOf(),
    pages: 100,
    templateUrl: '?page=',
    prefix: 'https://kanobu.ru/',
    legend:
      [{
        name: 'refGame',
        search: ['itemprop="name"', '<figure>', '<a href', '"'],
        end: '"',
        separator: ' '
      }]
  };
