/**
 * Structurizr Grammar for ANTLR v4
 *
 * Based on:
 * https://github.com/structurizr/dsl/blob/master/docs/language-reference.md
 */
parser grammar StructurizrParser;

options { tokenVocab=StructurizrLexer; }

structurizrFile
    : NL* workspaceDeclaration EOF
    ;

workspaceDeclaration
    : WORKSPACE workspaceBody
    ;

workspaceBody
    : LBRACE NL+ workspaceBodyDeclaration* NL+ RBRACE NL*
    ;

workspaceBodyDeclaration
    : modelDeclaration
    ;

modelDeclaration
    : MODEL modelBody
    ;

modelBody
    : LBRACE NL+ ID NL+ RBRACE
    ;

