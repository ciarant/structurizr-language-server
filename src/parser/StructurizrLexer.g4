/**
 * Structurizr Grammar for ANTLR v4
 *
 * Based on:
 * https://github.com/structurizr/dsl/blob/master/docs/language-reference.md
 */
lexer grammar StructurizrLexer;

// Keywords
WORKSPACE: 'workspace';
MODEL: 'model';

LBRACE: '{';
RBRACE: '}';

ID:
    LETTER_OR_NUM+
    ;

fragment LETTER_OR_NUM
    : [a-zA-Z0-9]
    ;

NL: [\r\n\u000C];
WS: [ \t] -> skip;

