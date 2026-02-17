//DO NOT MODIFY THE CODE BELOW - HOWEVER FEEL FREE TO TAKE A LOOK TO GIVE SOME ADDED HINTS

var tests = {

    fontSize: '15px',
    passColor: '#00FF00',
    failColor: '#FF0000',

    runTests: function(codons, aminos){
        this.testExtractCodonsFromDNAFunction(codons)
        this.testTranslateCodonsToAminosFunction(aminos)
    },

    //THIS IS A FUNCTION TO TEST YOUR extractCodonsFromDNA FUNCTION ... DO NOT MODIFY
    testExtractCodonsFromDNAFunction: function(codons){
        var correctResult = ["GTG", "CCA", "ATG", "TTA", "CTG", "CTA", "AAT", "CTC", "TAT", "ATA", "CAG", "TGG", "CTT", "AAG", "GAT", "GGG", "GGG", "CCC", "AGC", "AGC", "GGC", "CGA", "CCC", "CCC", "CCC", "TCA", "GTG", "TGG", "AAT", "CAA", "CCG", "GAA", "TTG", "AGG"];
        function matchesCorrectResult (codon, index) { 
            return correctResult[index] === codon;
        };
        //confirm that the contents of the codons array matches the contents of the correctResult array.
        if(codons.every(matchesCorrectResult) && codons.length === correctResult.length){
            console.log(`%cFUNCTION extractCodonsFromDNA is CORRECT`, `color: ${this.passColor}; font-size: ${this.fontSize};`);
        } else {
            console.log(`%cFUNCTION extractCodonsFromDNA is INCORRECT - Extracted codon sequence doesn't match the expected result which is...`, `color: ${this.failColor}; font-size: ${this.fontSize};`);
            console.log(correctResult)
        }
        console.log('')
    },

    //THIS IS A FUNCTION TO TEST YOUR translateCodonsToAminos FUNCTION ... DO NOT MODIFY
    testTranslateCodonsToAminosFunction: function(aminos){
        var correctResult = ["Val", "Pro", "Met", "Leu", "Leu", "Leu", "Asn", "Leu", "Tyr", "Ile", "Gln", "Trp", "Leu", "Lys", "Asp", "Gly", "Gly", "Pro", "Ser", "Ser", "Gly", "Arg", "Pro", "Pro", "Pro", "Ser", "Val", "Trp", "Asn", "Gln", "Pro", "Glu", "Leu", "Arg"];
        function matchesCorrectResult (amino, index) { 
            return correctResult[index] === amino; 
        };
        //confirm that the contents of the passed in aminos array matches the contents of the correctResult array.
        if(aminos !== undefined && aminos.every(matchesCorrectResult) && aminos.length === correctResult.length){
            console.log(`%cFUNCTION translateCodonsToAminos is CORRECT`, `color: ${this.passColor}; font-size: ${this.fontSize};`);
            this.displayConvertedAminoSequence(aminos)
        } else {
            console.log(`%cFUNCTION translateCodonsToAminos is INCORRECT - Final Amino array doesn't match the expected result which is...`, `color: ${this.failColor}; font-size: ${this.fontSize};`);
            console.log(correctResult)
        }
    },

    //THIS FUNCTION WILL DISPLAY THE DESIRED AMINO SEQUENCE ON THE WEB PAGE...DO NOT MODIFY
    displayConvertedAminoSequence: function(aminos){
        document.write(aminos.join('-'));
    }
}
