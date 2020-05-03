import {parsingMode} from './parsingMode';


export const legendOfGame = {
    mode: parsingMode.non_reapitable.valueOf(),
    pages: 1,
    templateUrl: '',
    prefix: '',
    legend:
      [{
          name: 'nameGame',
          search: ['"og:title"', 'content', '"'],
          end: '"',
          separator: '_'
        },
        {
          name: 'fullName',
          search: ['"og:title"', 'content', '"'],
          end: '"',
          separator: ' '
        },
        {
          name: 'releaseDate',
          search: ['>Дата', 'выхода<', '<div', '>'],
          end: '<',
          separator: '.'
        },
        {
          name: 'descriptionGame',
          search: ['gameShortDescr', '>'],
          end: '<',
          separator: ' '
        },
        {
          name: 'imageGame',
          search: ['og:image', 'content', '"'],
          end: '"',
          separator: ''
        },
        {
          name: 'companyGame',
          search: ['Разработчик', '<a', '>'],
          end: '<',
          separator: '_'
        },
        {
          name: 'operationSystem',
          search: ['>Минимальные', '>Операционная', '<div', '>'],
          end: '<',
          separator: '_'
        },
        {
          name: 'minProcessor',
          search: ['>Минимальные', '>Процессор', '<div', '>'],
          end: '<'
        },
        {
          name: 'minVideoCard',
          search: ['>Минимальные', '>Видеокарта:', '<div', '>'],
          end: '<'
        },
        {
          name: 'minRAM',
          search: ['>Минимальные', '>Оперативная', '<div', '>'],
          end: '<'
        },
        {
          name: 'maxProcessor',
          search: ['>Рекомендуемые', '>Процессор', '<div', '>'],
          end: '<'
        },
        {
          name: 'maxVideoCard',
          search: ['>Рекомендуемые', '>Видеокарта:', '<div', '>'],
          end: '<'
        },
        {
          name: 'maxRAM',
          search: ['>Рекомендуемые', '>Оперативная', '<div', '>'],
          end: '<'
        }
      ]
  };

export const templateGame: string = 'concept_computer_game_nameGame\n' +
  '\n' +
  '=> nrel_main_idtf:\n' +
  '[fullName] (*<-lang_ru;;*);\n' +
  '[fullName] (*<-lang_en;;*);\n' +
  '\n' +
  '<-concept_computer_game;\n' +
  '<-sc_node_not_relation;\n' +
  '<-concept_shooter;\n' +
  '<-concept_action_RPG;\n' +
  '<-concept_open_word;\n' +
  '<-concept_setting_nowadays;\n' +
  '\n' +
  '=>nrel_game_mode: concept_singleplayer_game;\n' +
  '=>nrel_game_mode: concept_multiplayer_game;\n' +
  '=>nrel_publication_date: date_releaseDate;\n' +
  '=>nrel_publisher: company_companyGame;\n' +
  '=>nrel_platform: {\n' +
  'concept_windows;\n' +
  'concept_xbox_360;\n' +
  'concept_xbox_one;\n' +
  'concept_playstation_4;\n' +
  'concept_playstation_3\n' +
  '};\n' +
  '\n' +
  '<- rrel_key_sc_element: ... (*\n' +
  '<- definition;;\n' +
  '=> nrel_main_idtf:\n' +
  '[Опр. (fullName)] (* <- lang_ru;; *);;\n' +
  '=> nrel_using_constants: {\n' +
  'concept_multiplatform_game\n' +
  '};;\n' +
  '<= nrel_sc_text_translation: ... (*\n' +
  '-> rrel_example:\n' +
  '[descriptionGame](*<-lang_ru;; => nrel_format: format_html;;*);;\n' +
  '*);;\n' +
  '*);\n' +
  '\n' +
  '<- rrel_key_sc_element: ... (*\n' +
  '<- illustration;;\n' +
  '<= nrel_sc_text_translation: ...\n' +
  '(*\n' +
  '-> rrel_example: "imageGame"\n' +
  '(*\n' +
  '=> nrel_format: format_jpg;;\n' +
  '*);;\n' +
  '*);;\n' +
  '*);\n' +
  '\n' +
  '<- rrel_key_sc_element: ... (*\n' +
  '<- explanation;;\n' +
  '=> nrel_main_idtf:\n' +
  '[Утв. (fullName)] (* <- lang_ru;; *);;\n' +
  '<= nrel_sc_text_translation: ... (*\n' +
  '-> rrel_example:\n' +
  '[descriptionGame](*<-lang_ru;; => nrel_format: format_html;;*);;\n' +
  '*);;\n' +
  '*);;';
