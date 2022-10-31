import {expect} from "chai";
import {computeTokenPosition, getSuggestionsK} from "../src";
import {it} from "mocha";

const localVariablesSuite = function() {
    it("are suggested",
        function() {
            const code =
                `fun test() {
    val v = 1
    val z = 
}`;
            let suggestions = getSuggestionsK(code, { line: 3, column: 13 }, computeTokenPosition);
            expect(suggestions.indexOf("v")).to.not.equal(-1);
            expect(suggestions.indexOf("some random name")).to.equal(-1);
        });

    it("are suggested respecting function scope",
        function() {
            const code =
                `fun test1() {
    val k = 'a'
}

fun test2() {
    val v = 1
    val z = 
}`;
            let suggestions = getSuggestionsK(code, { line: 7, column: 13 }, computeTokenPosition);
            expect(suggestions.indexOf("v")).to.not.equal(-1);
            expect(suggestions.indexOf("k")).to.equal(-1);
        });

    it("are suggested with partial match",
        function() {
            const code =
`fun test() {
    val someVariable = 1
    val anotherVariable = 2
    val z = so
}`;
            let suggestions = getSuggestionsK(code, { line: 4, column: 14 }, computeTokenPosition);
            expect(suggestions.indexOf("someVariable")).to.not.equal(-1);
            expect(suggestions.indexOf("anotherVariable")).to.equal(-1);
        });
};
describe('Local variables', localVariablesSuite);
