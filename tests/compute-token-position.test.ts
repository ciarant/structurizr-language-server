import {expect} from "chai";
import {CharStreams, CommonTokenStream} from "antlr4ts";
import {KotlinLexer, KotlinParser, StructurizrLexer, StructurizrParser, computeTokenPosition} from "../src";

describe('Token position (Structurizr)', function() {
    const code =
        `workspace {

}`;
    it("has the right index",
        function () {
            let input = CharStreams.fromString(code);
            let lexer = new StructurizrLexer(input);
            let tokenStream = new CommonTokenStream(lexer);
            let parser = new StructurizrParser(tokenStream);
            let parseTree = parser.structurizrFile();
            expect(parser.numberOfSyntaxErrors).to.equal(0);
            expect(input.index).to.equal(input.size);
            const tokenPosition = computeTokenPosition(parseTree, tokenStream, {line: 2, column: 0});
            expect(tokenPosition).to.not.be.undefined;
            expect(tokenPosition.index).to.equal(3);
        });
    it("includes partial text match ('workspace' keyword)",
        function() {
            let input = CharStreams.fromString(code);
            let lexer = new StructurizrLexer(input);
            let tokenStream = new CommonTokenStream(lexer);
            let parser = new StructurizrParser(tokenStream);
            let parseTree = parser.structurizrFile();
            expect(parser.numberOfSyntaxErrors).to.equal(0);
            expect(input.index).to.equal(input.size);
            const tokenPosition = computeTokenPosition(parseTree, tokenStream, { line: 1, column: 2 });
            expect(tokenPosition).to.not.be.undefined;
            expect(tokenPosition.index).to.equal(0);
            expect(tokenPosition.text).to.equal("wo");
        });
    it("is correctly computed even in stream with errors",
        function() {
            let input = CharStreams.fromString(`workspace {

`);
            let lexer = new StructurizrLexer(input);
            let tokenStream = new CommonTokenStream(lexer);
            let parser = new StructurizrParser(tokenStream);
            let parseTree = parser.structurizrFile();
            expect(parser.numberOfSyntaxErrors).to.equal(1);
            expect(input.index).to.equal(input.size);
            const tokenPosition = computeTokenPosition(parseTree, tokenStream,{ line: 2, column: 0 });
            expect(tokenPosition).to.not.be.undefined;
            expect(tokenPosition.index).to.equal(3);
        });

});

describe('Token position', function() {
    const code =
`fun test() {
    try {
        doSomething()
    } 
}`;
    it("includes partial text match (function name)",
        function() {
            let input = CharStreams.fromString(code);
            let lexer = new KotlinLexer(input);
            let tokenStream = new CommonTokenStream(lexer);
            let parser = new KotlinParser(tokenStream);
            let parseTree = parser.kotlinFile();
            expect(parser.numberOfSyntaxErrors).to.equal(0);
            expect(input.index).to.equal(input.size);
            const tokenPosition = computeTokenPosition(parseTree, tokenStream, { line: 1, column: 7 });
            expect(tokenPosition).to.not.be.undefined;
            expect(tokenPosition.index).to.equal(2);
            expect(tokenPosition.text).to.equal("tes");
        });
        it("is correctly computed even in stream with errors",
            function() {
                    let input = CharStreams.fromString(`fun test() {
    for(i on foo) {
        doSomething()
    } 
}`);
                    let lexer = new KotlinLexer(input);
                    let tokenStream = new CommonTokenStream(lexer);
                    let parser = new KotlinParser(tokenStream);
                    let parseTree = parser.kotlinFile();
                    expect(parser.numberOfSyntaxErrors).to.equal(3);
                    expect(input.index).to.equal(input.size);
                    const tokenPosition = computeTokenPosition(parseTree, tokenStream,{ line: 4, column: 7 });
                    expect(tokenPosition).to.not.be.undefined;
                    expect(tokenPosition.index).to.equal(41);
            });
});