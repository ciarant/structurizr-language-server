import {expect} from "chai";
import { computeTokenPosition, getSuggestions } from "../src";

const suite = function() {
    it("are suggested",
        function() {
            const code = `workspace {
 
}`;
            let suggestions = getSuggestions(code, { line: 2, column: 1 }, computeTokenPosition);
            expect(suggestions.length).to.equal(1);
            expect(suggestions.indexOf('model')).to.be.greaterThan(-1);
        });
    it("are suggested with partial match",
        function() {
            const code = `workspace {
    mo
}`;
            let suggestions = getSuggestions(code, { line: 2, column: 6 }, computeTokenPosition);
            expect(suggestions.indexOf('model')).to.be.greaterThan(-1);
        });
}

describe('Keywords', suite);
