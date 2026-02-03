//THIS IS CODE IS USED TO TEST YOUR FUNCTION...DO NOT MODIFY IN ANY WAY
function testCode() {
    const passColor = '#00FF00'
    const failColor = '#FF0000'
    const fontSize = '20px'
    const tests = [
        { input: '1-800-HOLIDAY', expected: '18004654329' },
        { input: 'GIMMEPIZZA', expected: '4466374992' },
        { input: '(902)Lottery', expected: '9025688379' },
        { input: '!@#$%^&', expected: '' },
        { input: '', expected: '' },
        { input: null, expected: '' },
        { input: undefined, expected: '' }
    ]

    tests.forEach(test => {
        const displayInput = test.input === '' ? "''" : test.input
        const displayExpected = test.expected === '' ? "''" : test.expected

        try {
            const result = convertPhoneWord(test.input)
            const displayResult = result === '' ? "''" : result
            result === test.expected
                ? console.log(`%c TEST PASSED for ${displayInput}`, `color: ${passColor}; font-size: ${fontSize};`)
                : console.log(`%c TEST FAILED for ${displayInput}\n\tExpected ${displayExpected} as result but got ${displayResult} instead`,`color: ${failColor}; font-size: ${fontSize};`)
            console.log('')
        } catch(err) {
            if(err.message.includes(test.input)){
                console.log(`%c TEST FAILED for ${displayInput} - Expected ${displayExpected} as result but got an error instead\n\t${err.message}`,`color: ${failColor}; font-size: ${fontSize};`)
                console.log('')
            }
        }
    })
}
